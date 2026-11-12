package com.omnitool.hub.ui.screens

import android.app.Activity
import android.content.Context
import android.view.WindowManager
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.omnitool.hub.ui.theme.*

@Composable
fun SettingsScreen(
    oledBlackOverride: Boolean = false,
    onOledBlackChange: (Boolean) -> Unit = {}
) {
    val context = LocalContext.current
    val prefs = remember { context.getSharedPreferences("omnitool_prefs", Context.MODE_PRIVATE) }

    var dynamicColorsEnabled by remember { mutableStateOf(prefs.getBoolean("dynamic_colors", true)) }
    var privacyShieldEnabled by remember { mutableStateOf(prefs.getBoolean("privacy_shield", true)) }
    var offlineCacheEnabled by remember { mutableStateOf(prefs.getBoolean("offline_cache", true)) }
    var oledBlackState by remember(oledBlackOverride) {
        mutableStateOf(prefs.getBoolean("oled_black", oledBlackOverride))
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(if (oledBlackState) Color.Black else BgMain)
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        Text(
            text = "App Settings",
            fontSize = 22.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        // Settings items
        SettingsToggleRow(
            label = "Dynamic Wallpaper Material",
            desc = "Enables Google Monet dynamic layout colors on Android 12+",
            checked = dynamicColorsEnabled,
            onCheckedChange = { enabled ->
                dynamicColorsEnabled = enabled
                prefs.edit().putBoolean("dynamic_colors", enabled).apply()
            }
        )

        SettingsToggleRow(
            label = "Privacy Screen Shield",
            desc = "Blurs app preview screen and blocks screenshots in Android Recents",
            checked = privacyShieldEnabled,
            onCheckedChange = { enabled ->
                privacyShieldEnabled = enabled
                prefs.edit().putBoolean("privacy_shield", enabled).apply()
                val window = (context as? Activity)?.window
                if (enabled) {
                    window?.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
                } else {
                    window?.clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
                }
            }
        )

        SettingsToggleRow(
            label = "Offline Service Caching",
            desc = "Locally cache resources for zero network usage",
            checked = offlineCacheEnabled,
            onCheckedChange = { enabled ->
                offlineCacheEnabled = enabled
                prefs.edit().putBoolean("offline_cache", enabled).apply()
            }
        )

        SettingsToggleRow(
            label = "Dark Theme Override",
            desc = "Force pure OLED black mode layout styles",
            checked = oledBlackState,
            onCheckedChange = { enabled ->
                oledBlackState = enabled
                prefs.edit().putBoolean("oled_black", enabled).apply()
                onOledBlackChange(enabled)
            }
        )

        Spacer(modifier = Modifier.height(24.dp))

        // About section
        Text(
            text = "About Developer",
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold,
            color = TextMuted,
            modifier = Modifier.padding(bottom = 12.dp)
        )

        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.Transparent, RoundedCornerShape(12.dp))
                .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                .padding(14.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(
                    text = "OmniTool Hub Native UI",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Text(
                    text = "Compiled with Android SDK 34 Target",
                    fontSize = 12.sp,
                    color = TextMuted
                )
                Text(
                    text = "Jetpack Compose & Material 3 UI Theme",
                    fontSize = 12.sp,
                    color = TextMuted
                )
            }
        }
    }
}

@Composable
fun SettingsToggleRow(
    label: String,
    desc: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit
) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(bottom = 12.dp)
            .background(BgCard, RoundedCornerShape(12.dp))
            .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
            .padding(14.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = label,
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = desc,
                    fontSize = 11.sp,
                    color = TextMuted,
                    lineHeight = 14.sp
                )
            }

            Switch(
                checked = checked,
                onCheckedChange = onCheckedChange,
                colors = SwitchDefaults.colors(
                    checkedThumbColor = Color.White,
                    checkedTrackColor = Primary,
                    uncheckedThumbColor = TextMuted,
                    uncheckedTrackColor = Color(0x1AFFFFFF)
                )
            )
        }
    }
}
