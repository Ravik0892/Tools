package com.omnitool.hub

import android.content.Context
import android.os.Bundle
import android.view.WindowManager
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import com.omnitool.hub.model.Tool
import com.omnitool.hub.model.ToolRepository
import com.omnitool.hub.ui.screens.*
import com.omnitool.hub.ui.theme.OmniToolHubTheme

class MainActivity : ComponentActivity() {
    @OptIn(ExperimentalMaterial3Api::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val prefs = getSharedPreferences("omnitool_prefs", Context.MODE_PRIVATE)
        if (prefs.getBoolean("privacy_shield", true)) {
            window.addFlags(WindowManager.LayoutParams.FLAG_SECURE)
        }

        val defaultFavorites = setOf("formatter-suite", "text-encoder-suite", "qr-studio")
        val initialFavorites = prefs.getStringSet("favorite_tools", defaultFavorites) ?: defaultFavorites
        val initialOledBlack = prefs.getBoolean("oled_black", false)

        setContent {
            var oledBlackOverride by remember { mutableStateOf(initialOledBlack) }

            OmniToolHubTheme(oledBlack = oledBlackOverride) {
                var currentScreen by remember { mutableStateOf("dashboard") }
                var selectedTool by remember { mutableStateOf<Tool?>(null) }
                var favorites by remember { mutableStateOf(initialFavorites) }
                var focusSearchTrigger by remember { mutableStateOf(0) }

                BackHandler(enabled = currentScreen != "dashboard") {
                    currentScreen = "dashboard"
                }

                Scaffold(
                    topBar = {
                        if (currentScreen != "tool_details") {
                            CenterAlignedTopAppBar(
                                title = { Text("OmniTool Hub") },
                                actions = {
                                    IconButton(onClick = {
                                        currentScreen = "dashboard"
                                        focusSearchTrigger++
                                    }) {
                                        Icon(
                                            imageVector = Icons.Default.Search,
                                            contentDescription = "Search tools"
                                        )
                                    }
                                }
                            )
                        }
                    },
                    bottomBar = {
                        if (currentScreen != "tool_details") {
                            NavigationBar {
                                NavigationBarItem(
                                    selected = currentScreen == "dashboard",
                                    onClick = { currentScreen = "dashboard" },
                                    icon = { Icon(Icons.Default.Home, contentDescription = "Dashboard") },
                                    label = { Text("Dashboard") }
                                )
                                NavigationBarItem(
                                    selected = currentScreen == "pipeline",
                                    onClick = { currentScreen = "pipeline" },
                                    icon = { Icon(Icons.Default.Build, contentDescription = "Smart Chain") },
                                    label = { Text("Smart Chain") }
                                )
                                NavigationBarItem(
                                    selected = currentScreen == "settings",
                                    onClick = { currentScreen = "settings" },
                                    icon = { Icon(Icons.Default.Settings, contentDescription = "Settings") },
                                    label = { Text("Settings") }
                                )
                            }
                        }
                    }
                ) { innerPadding ->
                    Surface(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(innerPadding)
                    ) {
                        when (currentScreen) {
                            "dashboard" -> DashboardScreen(
                                onToolClick = { tool ->
                                    selectedTool = tool
                                    currentScreen = "tool_details"
                                },
                                favorites = favorites,
                                onToggleFavorite = { toolId ->
                                    val updated = if (favorites.contains(toolId)) {
                                        favorites - toolId
                                    } else {
                                        favorites + toolId
                                    }
                                    favorites = updated
                                    prefs.edit().putStringSet("favorite_tools", updated).apply()
                                },
                                focusSearchTrigger = focusSearchTrigger
                            )
                            "pipeline" -> PipelineScreen(
                                onOpenWebPipeline = {
                                    val pipelineTool = ToolRepository.tools.firstOrNull { it.id == "pipeline-builder" }
                                    if (pipelineTool != null) {
                                        selectedTool = pipelineTool
                                        currentScreen = "tool_details"
                                    }
                                }
                            )
                            "settings" -> SettingsScreen(
                                oledBlackOverride = oledBlackOverride,
                                onOledBlackChange = { oledBlackOverride = it }
                            )
                            "tool_details" -> {
                                val tool = selectedTool
                                if (tool != null) {
                                    when (tool.id) {
                                        "native-logcat" -> LogcatScreen(
                                            onBackClick = { currentScreen = "dashboard" }
                                        )
                                        "native-device-info" -> DeviceInfoScreen(
                                            onBackClick = { currentScreen = "dashboard" }
                                        )
                                        else -> WebToolScreen(
                                            tool = tool,
                                            onBackClick = { currentScreen = "dashboard" }
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
