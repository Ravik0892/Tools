package com.omnitool.hub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material.icons.filled.PlayArrow
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.omnitool.hub.ui.theme.*

data class PipelineStepItem(
    val title: String,
    val desc: String
)

private val AVAILABLE_PIPELINE_OPERATIONS = listOf(
    PipelineStepItem("Base64 Decoder", "Decode Base64 input payload"),
    PipelineStepItem("Base64 Encoder", "Encode payload to Base64"),
    PipelineStepItem("URL Decode", "Unescape URL-encoded characters"),
    PipelineStepItem("JSON Formatter", "Beautify & validate JSON structure"),
    PipelineStepItem("Uppercase Transform", "Convert string output to UPPERCASE"),
    PipelineStepItem("Word Counter", "Count words & characters in output"),
    PipelineStepItem("SHA-256 Hash", "Generate cryptographic SHA-256 digest")
)

@Composable
fun PipelineScreen(
    onOpenWebPipeline: () -> Unit = {}
) {
    val pipelineBlocks = remember {
        mutableStateListOf(
            PipelineStepItem("Base64 Decoder", "Decoding input payload"),
            PipelineStepItem("JSON Formatter", "Beautify decoded payload"),
            PipelineStepItem("Word Counter", "Count words in formatted JSON")
        )
    }
    var showAddDialog by remember { mutableStateOf(false) }

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

        if (pipelineBlocks.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .border(1.dp, BorderColor, RoundedCornerShape(14.dp))
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "No steps configured. Add an operation or open the full interactive builder below.",
                    color = TextMuted,
                    fontSize = 13.sp
                )
            }
        } else {
            pipelineBlocks.forEachIndexed { index, block ->
                PipelineBlockNode(
                    num = "${index + 1}",
                    title = block.title,
                    desc = block.desc,
                    onDeleteClick = { pipelineBlocks.removeAt(index) }
                )

                if (index < pipelineBlocks.size - 1) {
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
        }

        Spacer(modifier = Modifier.height(20.dp))

        Button(
            onClick = { showAddDialog = true },
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

        Spacer(modifier = Modifier.height(12.dp))

        Button(
            onClick = onOpenWebPipeline,
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp),
            colors = ButtonDefaults.buttonColors(containerColor = Primary),
            shape = RoundedCornerShape(12.dp)
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.Center
            ) {
                Icon(
                    imageVector = Icons.Default.PlayArrow,
                    contentDescription = "Open interactive builder",
                    tint = Color.White,
                    modifier = Modifier.size(18.dp)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Text("Launch Interactive Chain Runner", color = Color.White, fontSize = 14.sp, fontWeight = FontWeight.Bold)
            }
        }
    }

    if (showAddDialog) {
        AlertDialog(
            onDismissRequest = { showAddDialog = false },
            containerColor = BgCard,
            title = { Text("Add Chain Operation", color = Color.White, fontWeight = FontWeight.Bold) },
            text = {
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    AVAILABLE_PIPELINE_OPERATIONS.forEach { op ->
                        Column(
                            modifier = Modifier
                                .fillMaxWidth()
                                .border(1.dp, BorderColor, RoundedCornerShape(10.dp))
                                .clickable {
                                    pipelineBlocks.add(op)
                                    showAddDialog = false
                                }
                                .padding(10.dp)
                        ) {
                            Text(op.title, color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                            Text(op.desc, color = TextMuted, fontSize = 11.sp)
                        }
                    }
                }
            },
            confirmButton = {
                TextButton(onClick = { showAddDialog = false }) {
                    Text("Cancel", color = AccentCyan)
                }
            }
        )
    }
}

@Composable
fun PipelineBlockNode(
    num: String,
    title: String,
    desc: String,
    onDeleteClick: () -> Unit
) {
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
            Row(verticalAlignment = Alignment.CenterVertically, modifier = Modifier.weight(1f)) {
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

            IconButton(onClick = onDeleteClick) {
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
