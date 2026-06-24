package com.omnitool.hub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.omnitool.hub.ui.theme.*

@Composable
fun PipelineScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgMain)
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        // Pipeline Info Banner
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 20.dp),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.Transparent)
        ) {
            Box(
                modifier = Modifier
                    .background(
                        Brush.linearGradient(
                            colors = listOf(
                                AccentMagenta.copy(alpha = 0.2f),
                                Primary.copy(alpha = 0.1f)
                            )
                        )
                    )
                    .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Column {
                    Text(
                        text = "Smart Chain Pipeline",
                        fontSize = 18.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Stack multiple operations sequentially. The output of block 1 feeds into block 2.",
                        fontSize = 12.sp,
                        color = TextMuted,
                        lineHeight = 16.sp
                    )
                }
            }
        }

        // Hardcoded stack of blocks for layout showcase
        val pipelineBlocks = listOf(
            Triple("1", "Base64 Decoder", "Decoding input payload"),
            Triple("2", "JSON Formatter", "Beautify decoded payload"),
            Triple("3", "Word Counter", "Count words in formatted JSON")
        )

        pipelineBlocks.forEachIndexed { index, block ->
            PipelineBlockNode(
                num = block.first,
                title = block.second,
                desc = block.third
            )

            if (index < pipelineBlocks.size - 1) {
                // Connection Arrow
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.KeyboardArrowDown,
                        contentDescription = "Arrow down link",
                        tint = AccentCyan,
                        modifier = Modifier.size(28.dp)
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Add block layout button
        Button(
            onClick = { /* Simulated Palette overlay toggle */ },
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
                .border(1.dp, Primary.copy(alpha = 0.4f), RoundedCornerShape(12.dp)),
            colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
            shape = RoundedCornerShape(12.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = Icons.Default.Add,
                    contentDescription = "Add node",
                    tint = Primary,
                    modifier = Modifier.size(18.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text("Add Chain Operation", color = Primary, fontSize = 14.sp)
            }
        }
    }
}

@Composable
fun PipelineBlockNode(num: String, title: String, desc: String) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(Primary.copy(alpha = 0.08f), RoundedCornerShape(14.dp))
            .border(1.dp, Primary, RoundedCornerShape(14.dp))
            .padding(14.dp)
    ) {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                // Number Badge
                Box(
                    modifier = Modifier
                        .size(24.dp)
                        .background(Primary, RoundedCornerShape(12.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Text(
                        text = num,
                        color = Color.White,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold
                    )
                }
                
                Spacer(modifier = Modifier.width(12.dp))
                
                Column {
                    Text(
                        text = title,
                        fontSize = 14.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Text(
                        text = desc,
                        fontSize = 11.sp,
                        color = TextMuted
                    )
                }
            }

            IconButton(onClick = { /* remove item layout click */ }) {
                Icon(
                    imageVector = Icons.Default.Close,
                    contentDescription = "Delete operation Node",
                    tint = AccentMagenta,
                    modifier = Modifier.size(20.dp)
                )
            }
        }
    }
}
