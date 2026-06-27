package com.omnitool.hub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Info
import androidx.compose.material.icons.filled.Star
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
import com.omnitool.hub.model.Tool
import com.omnitool.hub.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ToolLayoutScreen(
    tool: Tool,
    isFavorite: Boolean,
    onToggleFavorite: () -> Unit,
    onBackClick: () -> Unit
) {
    var inputText by remember(tool.id) {
        mutableStateOf(
            when (tool.id) {
                "json-formatter" -> "{\"project\":\"OmniTool\",\"release\":\"v2\",\"status\":\"premium\",\"layoutOnly\":true}"
                "base64" -> "OmniTool Hub Android App"
                "hash-gen" -> "admin123"
                else -> "Sample input value for ${tool.name}"
            }
        )
    }
    var outputText by remember(tool.id) { mutableStateOf("") }

    val categoryColor = when (tool.category) {
        "dev" -> AccentCyan
        "text" -> AccentMagenta
        "design" -> AccentGreen
        else -> AccentOrange
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgMain)
            .padding(16.dp)
    ) {
        // Navigation Header Row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 14.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onBackClick) {
                Icon(
                    imageVector = Icons.Default.ArrowBack,
                    contentDescription = "Back Navigation",
                    tint = TextMain
                )
            }
            
            // Category Badge
            Box(
                modifier = Modifier
                    .background(categoryColor.copy(alpha = 0.15f), RoundedCornerShape(12.dp))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = tool.category.uppercase(),
                    color = categoryColor,
                    fontSize = 11.sp,
                    fontWeight = FontWeight.Bold
                )
            }

            IconButton(onClick = onToggleFavorite) {
                Icon(
                    imageVector = Icons.Default.Star,
                    contentDescription = "Favorite Toggle",
                    tint = if (isFavorite) AccentOrange else TextMain
                )
            }
        }

        // Title and Description
        Text(
            text = tool.name,
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White,
            modifier = Modifier.padding(bottom = 4.dp)
        )
        Text(
            text = tool.desc,
            fontSize = 13.sp,
            color = TextMuted,
            lineHeight = 18.sp,
            modifier = Modifier.padding(bottom = 16.dp)
        )

        // Preview Reminder Banner
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            shape = RoundedCornerShape(10.dp),
            colors = CardDefaults.cardColors(containerColor = Primary.copy(alpha = 0.1f))
        ) {
            Row(
                modifier = Modifier
                    .border(1.dp, Primary.copy(alpha = 0.3f), RoundedCornerShape(10.dp))
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(
                    imageVector = Icons.Default.Info,
                    contentDescription = "Preview Mode",
                    tint = AccentCyan,
                    modifier = Modifier.size(24.dp)
                )
                Spacer(modifier = Modifier.width(10.dp))
                Text(
                    text = "Layout Prototype Screen: Calculations will execute native Kotlin actions in the final build.",
                    fontSize = 11.sp,
                    color = TextMain,
                    lineHeight = 15.sp
                )
            }
        }

        // Input Field
        Text(
            text = "Input Data",
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            color = TextMuted,
            modifier = Modifier.padding(bottom = 6.dp)
        )
        OutlinedTextField(
            value = inputText,
            onValueChange = { inputText = it },
            modifier = Modifier
                .fillMaxWidth()
                .height(120.dp)
                .padding(bottom = 16.dp),
            shape = RoundedCornerShape(12.dp),
            textStyle = TextStyle(fontFamily = FontFamily.Monospace, fontSize = 13.sp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = TextMain,
                unfocusedTextColor = TextMain,
                focusedBorderColor = Primary,
                unfocusedBorderColor = BorderColor,
                containerColor = Color(0x05FFFFFF)
            )
        )

        // Action Buttons Row
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(10.dp)
        ) {
            Button(
                onClick = {
                    outputText = when (tool.id) {
                        "json-formatter" -> {
                            try {
                                inputText.replace("{", "{\n    ").replace(",", ",\n    ").replace("}", "\n}")
                            } catch (e: Exception) {
                                "Error: Invalid JSON Syntax layout"
                            }
                        }
                        "base64" -> "TW9ja0Jhc2U2NE91dHB1dExheW91dFNrZWxldG9u"
                        else -> "Result mock output for ${tool.name}"
                    }
                },
                modifier = Modifier.weight(1f),
                colors = ButtonDefaults.buttonColors(containerColor = Primary),
                shape = RoundedCornerShape(10.dp)
            ) {
                Text("Run Skeleton", fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
            }
            
            Button(
                onClick = {
                    inputText = ""
                    outputText = ""
                },
                colors = ButtonDefaults.buttonColors(containerColor = Color(0x0DFFFFFF)),
                shape = RoundedCornerShape(10.dp),
                modifier = Modifier.border(1.dp, BorderColor, RoundedCornerShape(10.dp))
            ) {
                Text("Clear", color = TextMain, fontSize = 13.sp)
            }
        }

        // Output Field
        Text(
            text = "Output Layout",
            fontSize = 12.sp,
            fontWeight = FontWeight.Bold,
            color = TextMuted,
            modifier = Modifier.padding(bottom = 6.dp)
        )
        OutlinedTextField(
            value = outputText,
            onValueChange = { },
            readOnly = true,
            placeholder = { Text("Output will appear here...", color = TextMuted) },
            modifier = Modifier
                .fillMaxWidth()
                .weight(1f),
            shape = RoundedCornerShape(12.dp),
            textStyle = TextStyle(fontFamily = FontFamily.Monospace, fontSize = 13.sp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = TextMain,
                unfocusedTextColor = TextMain,
                focusedBorderColor = AccentCyan,
                unfocusedBorderColor = BorderColor,
                containerColor = AccentCyan.copy(alpha = 0.02f)
            )
        )
    }
}
