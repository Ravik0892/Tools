package com.omnitool.hub

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Build
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.omnitool.hub.model.Tool
import com.omnitool.hub.ui.screens.*
import com.omnitool.hub.ui.theme.OmniToolHubTheme
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    @OptIn(ExperimentalMaterial3Api::class)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            OmniToolHubTheme {
                val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
                val scope = rememberCoroutineScope()
                
                var currentScreen by remember { mutableStateOf("dashboard") }
                var selectedTool by remember { mutableStateOf<Tool?>(null) }
                val favorites = remember { mutableStateOf(setOf("json-formatter", "base64", "qr-generator")) }

                ModalNavigationDrawer(
                    drawerState = drawerState,
                    drawerContent = {
                        ModalDrawerSheet {
                            Text(
                                "OmniTool Hub",
                                modifier = Modifier.padding(16.dp),
                                style = MaterialTheme.typography.titleLarge
                            )
                            Divider()
                            NavigationDrawerItem(
                                label = { Text("Dashboard") },
                                selected = currentScreen == "dashboard",
                                onClick = {
                                    currentScreen = "dashboard"
                                    scope.launch { drawerState.close() }
                                }
                            )
                            NavigationDrawerItem(
                                label = { Text("Smart Chain Pipeline") },
                                selected = currentScreen == "pipeline",
                                onClick = {
                                    currentScreen = "pipeline"
                                    scope.launch { drawerState.close() }
                                }
                            )
                            NavigationDrawerItem(
                                label = { Text("Settings") },
                                selected = currentScreen == "settings",
                                onClick = {
                                    currentScreen = "settings"
                                    scope.launch { drawerState.close() }
                                }
                            )
                        }
                    }
                ) {
                    Scaffold(
                        topBar = {
                            if (currentScreen != "tool_details") {
                                CenterAlignedTopAppBar(
                                    title = { Text("OmniTool Hub") },
                                    navigationIcon = {
                                        IconButton(onClick = { scope.launch { drawerState.open() } }) {
                                            Icon(
                                                imageVector = Icons.Default.Menu,
                                                contentDescription = "Menu Navigation"
                                            )
                                        }
                                    },
                                    actions = {
                                        IconButton(onClick = { /* Simulated command palette */ }) {
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
                                    favorites = favorites.value,
                                    onToggleFavorite = { toolId ->
                                        if (favorites.value.contains(toolId)) {
                                            favorites.value = favorites.value - toolId
                                        } else {
                                            favorites.value = favorites.value + toolId
                                        }
                                    }
                                )
                                "pipeline" -> PipelineScreen()
                                "settings" -> SettingsScreen()
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
}
