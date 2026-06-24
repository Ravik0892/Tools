package com.omnitool.hub.ui.screens

import android.app.ActivityManager
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import android.os.Build
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.omnitool.hub.ui.theme.*

@Composable
fun DeviceInfoScreen(
    onBackClick: () -> Unit
) {
    val context = LocalContext.current
    
    // Memory Diagnostics
    val activityManager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
    val memoryInfo = ActivityManager.MemoryInfo()
    activityManager.getMemoryInfo(memoryInfo)
    
    val totalRamGb = memoryInfo.totalMem / (1024.0 * 1024.0 * 1024.0)
    val availRamGb = memoryInfo.availMem / (1024.0 * 1024.0 * 1024.0)
    val usedRamGb = totalRamGb - availRamGb
    val ramPercentage = if (totalRamGb > 0) (usedRamGb / totalRamGb).toFloat() else 0f

    // Battery Diagnostics
    val batteryIntent = context.registerReceiver(null, IntentFilter(Intent.ACTION_BATTERY_CHANGED))
    val level = batteryIntent?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
    val scale = batteryIntent?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
    val batteryPct = if (level >= 0 && scale > 0) (level * 100 / scale.toFloat()).toInt() else 0
    
    val batteryTemp = (batteryIntent?.getIntExtra(BatteryManager.EXTRA_TEMPERATURE, 0) ?: 0) / 10.0
    val batteryStatusVal = batteryIntent?.getIntExtra(BatteryManager.EXTRA_STATUS, -1) ?: -1
    val isCharging = batteryStatusVal == BatteryManager.BATTERY_STATUS_CHARGING || 
            batteryStatusVal == BatteryManager.BATTERY_STATUS_FULL

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgMain)
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        // Navigation Header Row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
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
            Text(
                text = "Device Diagnostics",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )
        }

        // RAM Usage Card
        Text(
            text = "RAM allocation",
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            color = TextMuted,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(BgCard, RoundedCornerShape(16.dp))
                .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
                .padding(16.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("System RAM Used", color = TextMain, fontSize = 14.sp)
                    Text(String.format("%.2f GB / %.2f GB", usedRamGb, totalRamGb), color = AccentCyan, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                }
                
                LinearProgressIndicator(
                    progress = ramPercentage,
                    modifier = Modifier.fillMaxWidth().height(8.dp),
                    color = AccentCyan,
                    trackColor = Color(0x1AFFFFFF)
                )
                
                if (memoryInfo.lowMemory) {
                    Text(
                        text = "WARNING: System is low on available memory!",
                        color = AccentMagenta,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Battery Diagnostics Card
        Text(
            text = "Battery diagnostics",
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            color = TextMuted,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(BgCard, RoundedCornerShape(16.dp))
                .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
                .padding(16.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Charge Level", color = TextMain, fontSize = 14.sp)
                    Text("$batteryPct%", color = AccentGreen, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                }
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Temperature", color = TextMain, fontSize = 14.sp)
                    Text("$batteryTemp °C", color = AccentOrange, fontSize = 14.sp, fontWeight = FontWeight.Bold)
                }
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("Charging Status", color = TextMain, fontSize = 14.sp)
                    Text(
                        text = if (isCharging) "Charging" else "Discharging",
                        color = if (isCharging) AccentGreen else TextMuted,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Hardware Specifications Card
        Text(
            text = "Hardware Specifications",
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            color = TextMuted,
            modifier = Modifier.padding(bottom = 8.dp)
        )
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(BgCard, RoundedCornerShape(16.dp))
                .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
                .padding(16.dp)
        ) {
            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                InfoItemRow("Device Model", Build.MODEL)
                InfoItemRow("Manufacturer", Build.MANUFACTURER)
                InfoItemRow("Android OS Version", Build.VERSION.RELEASE)
                InfoItemRow("SDK Level", Build.VERSION.SDK_INT.toString())
                InfoItemRow("Supported CPU ABIs", Build.SUPPORTED_ABIS.joinToString(", "))
                InfoItemRow("Board name", Build.BOARD)
            }
        }
    }
}

@Composable
fun InfoItemRow(label: String, value: String) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text(label, color = TextMuted, fontSize = 13.sp)
        Text(value, color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
    }
}
