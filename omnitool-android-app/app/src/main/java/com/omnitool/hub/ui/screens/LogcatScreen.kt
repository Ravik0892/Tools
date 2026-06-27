package com.omnitool.hub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Refresh
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.omnitool.hub.ui.theme.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.BufferedReader
import java.io.InputStreamReader

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LogcatScreen(
    onBackClick: () -> Unit
) {
    var logs by remember { mutableStateOf(listOf<String>()) }
    var filterQuery by remember { mutableStateOf("") }
    var isReading by remember { mutableStateOf(false) }
    val scope = rememberCoroutineScope()
    val listState = rememberLazyListState()

    // Read logs from the system process
    fun refreshLogs() {
        if (isReading) return
        isReading = true
        scope.launch(Dispatchers.IO) {
            val list = mutableListOf<String>()
            try {
                // Execute logcat -d (dump logs and exit)
                val process = Runtime.getRuntime().exec("logcat -d -t 200")
                val bufferedReader = BufferedReader(InputStreamReader(process.inputStream))
                var line: String?
                while (bufferedReader.readLine().also { line = it } != null) {
                    line?.let { list.add(it) }
                }
            } catch (e: Exception) {
                list.add("Error reading logs: ${e.localizedMessage}")
                list.add("Ensure the app has the READ_LOGS permission via ADB: adb shell pm grant com.omnitool.hub android.permission.READ_LOGS")
            }
            withContext(Dispatchers.Main) {
                logs = list
                isReading = false
                // Auto scroll to bottom
                if (list.isNotEmpty()) {
                    scope.launch {
                        listState.animateScrollToItem(list.size - 1)
                    }
                }
            }
        }
    }

    // Auto-read on load
    LaunchedEffect(Unit) {
        refreshLogs()
    }

    val filteredLogs = remember(logs, filterQuery) {
        logs.filter { line ->
            line.contains(filterQuery, ignoreCase = true)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgMain)
            .padding(16.dp)
    ) {
        // Toolbar Row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                IconButton(onClick = onBackClick) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Back",
                        tint = TextMain
                    )
                }
                Spacer(modifier = Modifier.width(4.dp))
                Text(
                    text = "Logcat Viewer",
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
            }

            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                IconButton(onClick = { refreshLogs() }) {
                    Icon(
                        imageVector = Icons.Default.Refresh,
                        contentDescription = "Refresh Logs",
                        tint = AccentCyan
                    )
                }
                IconButton(onClick = { /* Simulated log share */ }) {
                    Icon(
                        imageVector = Icons.Default.Share,
                        contentDescription = "Share Logs",
                        tint = AccentCyan
                    )
                }
            }
        }

        // Search Filter
        OutlinedTextField(
            value = filterQuery,
            onValueChange = { filterQuery = it },
            placeholder = { Text("Filter logs (e.g. Error, System)...", color = TextMuted) },
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 12.dp),
            shape = RoundedCornerShape(10.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = TextMain,
                unfocusedTextColor = TextMain,
                focusedBorderColor = Primary,
                unfocusedBorderColor = BorderColor,
                containerColor = Color(0x05FFFFFF)
            )
        )

        // Log Console
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f)
                .background(Color(0xFF070510), RoundedCornerShape(12.dp))
                .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                .padding(10.dp)
        ) {
            if (isReading && logs.isEmpty()) {
                CircularProgressIndicator(
                    modifier = Modifier.align(Alignment.Center),
                    color = Primary
                )
            } else {
                LazyColumn(
                    state = listState,
                    modifier = Modifier.fillMaxSize(),
                    verticalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    items(filteredLogs) { line ->
                        LogLineItem(line = line)
                    }
                }
            }
        }
    }
}

@Composable
fun LogLineItem(line: String) {
    // Parse log colors dynamically
    val color = when {
        line.startsWith("E/") || line.contains("Error", true) || line.contains("Exception", true) -> AccentMagenta
        line.startsWith("W/") || line.contains("Warning", true) -> AccentOrange
        line.startsWith("I/") || line.contains("Info", true) -> AccentGreen
        line.startsWith("D/") -> AccentCyan
        else -> TextMain
    }

    Text(
        text = line,
        style = TextStyle(
            fontFamily = FontFamily.Monospace,
            fontSize = 11.sp,
            lineHeight = 14.sp
        ),
        color = color
    )
}
