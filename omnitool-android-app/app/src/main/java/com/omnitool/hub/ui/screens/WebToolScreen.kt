package com.omnitool.hub.ui.screens

import android.annotation.SuppressLint
import android.app.Activity
import android.app.DownloadManager
import android.content.ContentValues
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Environment
import android.os.Handler
import android.os.Looper
import android.provider.MediaStore
import android.util.Base64
import android.util.Log
import android.webkit.*
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.webkit.WebViewAssetLoader
import com.omnitool.hub.model.Tool
import com.omnitool.hub.ui.theme.BgMain
import com.omnitool.hub.ui.theme.TextMain
import org.json.JSONObject
import java.io.File
import java.io.FileOutputStream
import java.io.InputStream

private class AndroidExportBridge(private val context: Context) {
    @JavascriptInterface
    fun saveBase64File(dataUriOrBase64: String, fileName: String, mimeType: String) {
        try {
            val commaIdx = dataUriOrBase64.indexOf(',')
            val pureBase64 = if (commaIdx >= 0) dataUriOrBase64.substring(commaIdx + 1) else dataUriOrBase64
            val bytes = Base64.decode(pureBase64, Base64.DEFAULT)

            val rawName = File(fileName.ifBlank { "omnitool-export.bin" }).name
            val safeName = rawName.replace(Regex("""[\\/:*?"<>|]"""), "_").ifBlank { "omnitool-export.bin" }
            val safeMime = mimeType.ifBlank { "application/octet-stream" }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                val values = ContentValues().apply {
                    put(MediaStore.Downloads.DISPLAY_NAME, safeName)
                    put(MediaStore.Downloads.MIME_TYPE, safeMime)
                    put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
                }
                val uri = context.contentResolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values)
                    ?: throw IllegalStateException("Unable to allocate Downloads MediaStore entry")
                context.contentResolver.openOutputStream(uri)?.use { out ->
                    out.write(bytes)
                }
            } else {
                @Suppress("DEPRECATION")
                val dir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
                if (!dir.exists()) dir.mkdirs()
                val outFile = File(dir, safeName)
                FileOutputStream(outFile).use { it.write(bytes) }
            }

            Handler(Looper.getMainLooper()).post {
                Toast.makeText(context, "Saved $safeName to Downloads", Toast.LENGTH_SHORT).show()
            }
        } catch (e: Exception) {
            Log.e("OmniToolExport", "Failed to save downloaded payload", e)
            Handler(Looper.getMainLooper()).post {
                Toast.makeText(context, "Export failed: ${e.message}", Toast.LENGTH_LONG).show()
            }
        }
    }
}

private fun getAssetMimeType(path: String): String {
    val clean = path.substringBefore('?').substringBefore('#')
    val ext = clean.substringAfterLast('.', "").lowercase()
    return when (ext) {
        "html", "htm" -> "text/html"
        "js", "mjs" -> "application/javascript"
        "css" -> "text/css"
        "json" -> "application/json"
        "svg" -> "image/svg+xml"
        "png" -> "image/png"
        "jpg", "jpeg" -> "image/jpeg"
        "gif" -> "image/gif"
        "webp" -> "image/webp"
        "ico" -> "image/x-icon"
        "wasm" -> "application/wasm"
        "woff" -> "font/woff"
        "woff2" -> "font/woff2"
        "ttf" -> "font/ttf"
        "otf" -> "font/otf"
        "txt" -> "text/plain"
        "xml" -> "application/xml"
        "pdf" -> "application/pdf"
        else -> MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext) ?: "application/octet-stream"
    }
}

private fun isBinaryAsset(mimeType: String): Boolean {
    return mimeType.startsWith("image/") && !mimeType.contains("svg") ||
            mimeType.startsWith("font/") ||
            mimeType.startsWith("audio/") ||
            mimeType.startsWith("video/") ||
            mimeType == "application/wasm" ||
            mimeType == "application/pdf" ||
            mimeType == "application/octet-stream"
}

private fun interceptAppAsset(context: Context, rawPath: String): WebResourceResponse? {
    try {
        val clean = rawPath.substringBefore('?').substringBefore('#').trim().trimStart('/')

        val subPath = when {
            clean.startsWith("assets/web/") -> clean.removePrefix("assets/web/")
            clean.startsWith("web/") -> clean.removePrefix("web/")
            else -> clean
        }

        val targetFile = when {
            subPath.isEmpty() || subPath == "/" -> "index.html"
            subPath.startsWith("tool/") -> "index.html"
            else -> subPath
        }

        val candidatePaths = listOf(
            "web/$targetFile",
            "web/assets/$targetFile",
            targetFile
        )

        var inputStream: InputStream? = null
        var resolvedPath = ""
        for (candidate in candidatePaths) {
            try {
                inputStream = context.assets.open(candidate)
                resolvedPath = candidate
                break
            } catch (_: Exception) {
                // Try next candidate
            }
        }

        if (inputStream == null) {
            Log.w("OmniToolWebView", "Asset not found: $rawPath (tried $candidatePaths)")
            return null
        }

        val mimeType = getAssetMimeType(resolvedPath)
        val encoding = if (isBinaryAsset(mimeType)) null else "UTF-8"
        val contentType = if (encoding != null) "$mimeType; charset=$encoding" else mimeType
        val headers = mapOf(
            "Content-Type" to contentType,
            "Access-Control-Allow-Origin" to "*",
            "Access-Control-Allow-Methods" to "GET, OPTIONS",
            "Access-Control-Allow-Headers" to "*"
        )

        return WebResourceResponse(mimeType, encoding, 200, "OK", headers, inputStream)
    } catch (e: Exception) {
        Log.e("OmniToolWebView", "Error serving asset: $rawPath", e)
        return null
    }
}

@SuppressLint("SetJavaScriptEnabled")
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun WebToolScreen(
    tool: Tool,
    onBackClick: () -> Unit
) {
    val context = LocalContext.current
    val prefs = remember { context.getSharedPreferences("omnitool_prefs", Context.MODE_PRIVATE) }
    val offlineCacheEnabled = remember { prefs.getBoolean("offline_cache", true) }
    var webViewRef by remember { mutableStateOf<WebView?>(null) }
    var fileUploadCallback by remember { mutableStateOf<ValueCallback<Array<Uri>>?>(null) }

    // System Back Gesture/Button Handler
    BackHandler {
        onBackClick()
    }

    // Modern Android File Chooser Activity Launcher for tool uploads
    val fileChooserLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == Activity.RESULT_OK) {
            val intentData = result.data
            val results: Array<Uri>? = when {
                intentData?.clipData != null -> {
                    val count = intentData.clipData!!.itemCount
                    Array(count) { i -> intentData.clipData!!.getItemAt(i).uri }
                }
                intentData?.data != null -> arrayOf(intentData.data!!)
                else -> null
            }
            fileUploadCallback?.onReceiveValue(results)
        } else {
            fileUploadCallback?.onReceiveValue(null)
        }
        fileUploadCallback = null
    }

    val assetLoader = remember {
        WebViewAssetLoader.Builder()
            .setDomain("appassets.androidplatform.net")
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(context))
            .build()
    }

    val targetUrl = "https://appassets.androidplatform.net/index.html?embed=1#tool/${tool.id}"

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgMain)
    ) {
        // Native Navigation Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 8.dp, vertical = 6.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBackClick) {
                Icon(
                    imageVector = Icons.Default.ArrowBack,
                    contentDescription = "Back",
                    tint = TextMain
                )
            }
            Spacer(modifier = Modifier.width(4.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = tool.name,
                    fontSize = 17.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White,
                    maxLines = 1
                )
                Text(
                    text = tool.type,
                    fontSize = 11.sp,
                    color = TextMain.copy(alpha = 0.6f),
                    maxLines = 1
                )
            }
        }

        // Web view loader
        AndroidView(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            factory = { ctx ->
                WebView(ctx).apply {
                    layoutParams = android.view.ViewGroup.LayoutParams(
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT,
                        android.view.ViewGroup.LayoutParams.MATCH_PARENT
                    )
                    webViewRef = this

                    val exportBridge = AndroidExportBridge(ctx)
                    addJavascriptInterface(exportBridge, "OmniToolAndroidBridge")

                    webViewClient = object : WebViewClient() {
                        override fun shouldInterceptRequest(
                            view: WebView,
                            request: WebResourceRequest
                        ): WebResourceResponse? {
                            val url = request.url
                            if (url.host.equals("appassets.androidplatform.net", ignoreCase = true)) {
                                val localResponse = interceptAppAsset(ctx, url.path ?: "")
                                if (localResponse != null) {
                                    return localResponse
                                }
                            }
                            return assetLoader.shouldInterceptRequest(url)
                        }

                        override fun shouldOverrideUrlLoading(
                            view: WebView?,
                            request: WebResourceRequest?
                        ): Boolean {
                            val reqUrl = request?.url ?: return false
                            if (reqUrl.host == "appassets.androidplatform.net" ||
                                reqUrl.scheme == "blob" ||
                                reqUrl.scheme == "data"
                            ) {
                                return false
                            }
                            if (reqUrl.scheme == "http" || reqUrl.scheme == "https") {
                                return try {
                                    ctx.startActivity(Intent(Intent.ACTION_VIEW, reqUrl))
                                    true
                                } catch (e: Exception) {
                                    Log.w("OmniToolWebView", "Failed to open external URL: $reqUrl", e)
                                    false
                                }
                            }
                            return false
                        }

                        override fun onReceivedError(
                            view: WebView,
                            errorCode: Int,
                            description: String?,
                            failingUrl: String?
                        ) {
                            super.onReceivedError(view, errorCode, description, failingUrl)
                            Log.w("OmniToolWebView", "Resource error: $description at $failingUrl")
                        }

                        override fun onPageFinished(view: WebView?, url: String?) {
                            super.onPageFinished(view, url)
                            view?.evaluateJavascript(
                                """
                                (function() {
                                    function launch() {
                                        if (window.app && typeof window.app.navigateToTool === 'function') {
                                            window.app.navigateToTool('${tool.id}', false);
                                        } else {
                                            setTimeout(launch, 50);
                                        }
                                    }
                                    launch();
                                })();
                                """.trimIndent(),
                                null
                            )
                        }
                    }

                    setDownloadListener { url, userAgent, contentDisposition, mimeType, _ ->
                        val guessedName = URLUtil.guessFileName(
                            url,
                            contentDisposition,
                            mimeType
                        )
                        if (url.startsWith("blob:") || url.startsWith("data:")) {
                            val jsUrl = JSONObject.quote(url)
                            val jsName = JSONObject.quote(guessedName)
                            val jsMime = JSONObject.quote(mimeType ?: "application/octet-stream")
                            val bridgeScript = """
                                (function(){
                                  fetch($jsUrl)
                                    .then(function(r){ return r.blob(); })
                                    .then(function(b){
                                      var reader = new FileReader();
                                      reader.onloadend = function(){
                                        if (window.OmniToolAndroidBridge && reader.result) {
                                          window.OmniToolAndroidBridge.saveBase64File(String(reader.result), $jsName, b.type || $jsMime);
                                        }
                                      };
                                      reader.readAsDataURL(b);
                                    })
                                    .catch(function(err){ console.error('Blob download failed', err); });
                                })();
                            """.trimIndent()
                            evaluateJavascript(bridgeScript, null)
                        } else if (url.startsWith("http://") || url.startsWith("https://")) {
                            try {
                                val dmReq = DownloadManager.Request(Uri.parse(url)).apply {
                                    setMimeType(mimeType)
                                    addRequestHeader("User-Agent", userAgent)
                                    setTitle(guessedName)
                                    setDescription("Downloading from OmniTool Hub")
                                    setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                                    setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, guessedName)
                                }
                                val dm = ctx.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
                                dm.enqueue(dmReq)
                                Toast.makeText(ctx, "Downloading $guessedName...", Toast.LENGTH_SHORT).show()
                            } catch (e: Exception) {
                                Log.e("OmniToolWebView", "DownloadManager error", e)
                                Toast.makeText(ctx, "Download failed: ${e.message}", Toast.LENGTH_LONG).show()
                            }
                        }
                    }

                    webChromeClient = object : WebChromeClient() {
                        override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                            Log.d(
                                "OmniToolJS",
                                "${consoleMessage?.message()} [${consoleMessage?.sourceId()}:${consoleMessage?.lineNumber()}]"
                            )
                            return true
                        }

                        override fun onPermissionRequest(request: PermissionRequest?) {
                            // Grant web permissions (Camera, Mic) requested by tools like QR Scanner & Voice Recorder
                            request?.grant(request.resources)
                        }

                        override fun onShowFileChooser(
                            webView: WebView?,
                            filePathCallback: ValueCallback<Array<Uri>>?,
                            fileChooserParams: FileChooserParams?
                        ): Boolean {
                            fileUploadCallback?.onReceiveValue(null)
                            fileUploadCallback = filePathCallback

                            val intent = fileChooserParams?.createIntent() ?: Intent(Intent.ACTION_GET_CONTENT).apply {
                                type = "*/*"
                                addCategory(Intent.CATEGORY_OPENABLE)
                            }

                            try {
                                fileChooserLauncher.launch(intent)
                            } catch (e: Exception) {
                                Log.e("OmniToolWebView", "Cannot open file chooser", e)
                                fileUploadCallback?.onReceiveValue(null)
                                fileUploadCallback = null
                                return false
                            }
                            return true
                        }
                    }

                    WebView.setWebContentsDebuggingEnabled(true)

                    settings.apply {
                        javaScriptEnabled = true
                        domStorageEnabled = true
                        databaseEnabled = true
                        allowFileAccess = true
                        allowContentAccess = true
                        allowFileAccessFromFileURLs = true
                        allowUniversalAccessFromFileURLs = true
                        mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                        cacheMode = WebSettings.LOAD_NO_CACHE
                        useWideViewPort = true
                        loadWithOverviewMode = true
                        userAgentString = "$userAgentString OmniToolAndroid"
                    }

                    loadUrl(targetUrl)
                }
            },
            update = { webView ->
                val current = webView.url.orEmpty()
                val targetHash = "#tool/${tool.id}"
                val targetPath = "/tool/${tool.id}"
                if (!current.contains(targetHash) && !current.contains(targetPath)) {
                    webView.loadUrl(targetUrl)
                } else {
                    webView.evaluateJavascript(
                        "if (window.app && typeof window.app.navigateToTool === 'function') { window.app.navigateToTool('${tool.id}', false); }",
                        null
                    )
                }
            }
        )
    }
}
