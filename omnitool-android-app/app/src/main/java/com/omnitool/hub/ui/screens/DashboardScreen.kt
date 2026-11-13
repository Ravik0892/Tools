package com.omnitool.hub.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.focus.focusRequester
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.omnitool.hub.model.Tool
import com.omnitool.hub.model.ToolRepository
import com.omnitool.hub.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun DashboardScreen(
    onToolClick: (Tool) -> Unit,
    favorites: Set<String>,
    onToggleFavorite: (String) -> Unit,
    focusSearchTrigger: Int = 0
) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedCategory by remember { mutableStateOf("all") }
    val searchFocusRequester = remember { FocusRequester() }

    LaunchedEffect(focusSearchTrigger) {
        if (focusSearchTrigger > 0) {
            searchFocusRequester.requestFocus()
        }
    }
    
    // Filter logic
    val filteredTools = remember(searchQuery, selectedCategory, favorites) {
        ToolRepository.tools.filter { tool ->
            val matchesCategory = when (selectedCategory) {
                "all" -> true
                "fav" -> favorites.contains(tool.id)
                else -> tool.category == selectedCategory
            }
            val matchesSearch = tool.name.contains(searchQuery, ignoreCase = true) ||
                    tool.desc.contains(searchQuery, ignoreCase = true)
            matchesCategory && matchesSearch
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgMain)
            .padding(16.dp)
    ) {
        // Welcome Banner Card
        Card(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp),
            shape = RoundedCornerShape(16.dp),
            colors = CardDefaults.cardColors(containerColor = Color.Transparent)
        ) {
            Box(
                modifier = Modifier
                    .background(
                        Brush.linearGradient(
                            colors = listOf(
                                Primary.copy(alpha = 0.25f),
                                AccentCyan.copy(alpha = 0.05f)
                            )
                        )
                    )
                    .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Column {
                    Text(
                        text = "Welcome, Dev!",
                        fontFamily = MaterialTheme.typography.titleLarge.fontFamily,
                        fontSize = 20.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.White
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Calculations execute 100% locally on your phone with zero latency.",
                        fontSize = 13.sp,
                        color = TextMuted
                    )
                }
            }
        }

        // Search Bar
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("Search ${ToolRepository.tools.size} utilities...", color = TextMuted) },
            leadingIcon = {
                Icon(
                    imageVector = Icons.Default.Search,
                    contentDescription = "Search Icon",
                    tint = TextMuted
                )
            },
            modifier = Modifier
                .fillMaxWidth()
                .focusRequester(searchFocusRequester)
                .padding(bottom = 16.dp),
            shape = RoundedCornerShape(12.dp),
            colors = OutlinedTextFieldDefaults.colors(
                focusedTextColor = TextMain,
                unfocusedTextColor = TextMain,
                focusedBorderColor = Primary,
                unfocusedBorderColor = BorderColor,
                focusedContainerColor = Color(0x0AFFFFFF),
                unfocusedContainerColor = Color(0x0AFFFFFF)
            )
        )

        // Category Pills (Horizontal Scroll)
        val categories = listOf(
            "all" to "All",
            "fav" to "⭐ Favorites",
            "guides" to "📚 Guides",
            "dev" to "Developer",
            "text" to "Text & PDF",
            "design" to "Design & Media",
            "math" to "Math & Calc"
        )
        
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 16.dp)
                .horizontalScroll(rememberScrollState()),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            categories.forEach { (catId, catLabel) ->
                val isActive = selectedCategory == catId
                Button(
                    onClick = { selectedCategory = catId },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (isActive) Primary else Color(0x0FFFFFFF),
                        contentColor = if (isActive) Color.White else TextMuted
                    ),
                    shape = RoundedCornerShape(20.dp),
                    contentPadding = PaddingValues(horizontal = 14.dp, vertical = 8.dp),
                    modifier = Modifier.border(
                        1.dp,
                        if (isActive) Primary else BorderColor,
                        RoundedCornerShape(20.dp)
                    )
                ) {
                    Text(text = catLabel, fontSize = 12.sp, fontWeight = FontWeight.SemiBold)
                }
            }
        }

        // Section Title
        Text(
            text = when (selectedCategory) {
                "all" -> "All Utilities"
                "fav" -> "⭐ Favorite Utilities"
                "dev" -> "🛠️ Developer Utilities"
                "text" -> "📝 Text & PDF Utilities"
                "design" -> "🎨 Design & Media Utilities"
                else -> "📐 Math & Calculation Utilities"
            },
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold,
            color = TextMuted,
            modifier = Modifier.padding(bottom = 12.dp)
        )

        // Tools Grid list
        if (filteredTools.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.Info,
                        contentDescription = "Empty list",
                        tint = TextMuted,
                        modifier = Modifier.size(48.dp)
                    )
                    Spacer(modifier = Modifier.height(12.dp))
                    Text("No tools matched your criteria", color = TextMuted, fontSize = 14.sp)
                }
            }
        } else {
            LazyVerticalGrid(
                columns = GridCells.Fixed(2),
                horizontalArrangement = Arrangement.spacedBy(12.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
                modifier = Modifier.weight(1f)
            ) {
                items(filteredTools) { tool ->
                    ToolCard(
                        tool = tool,
                        isFavorite = favorites.contains(tool.id),
                        onFavoriteToggle = { onToggleFavorite(tool.id) },
                        onClick = { onToolClick(tool) }
                    )
                }
            }
        }
    }
}

@Composable
fun ToolCard(
    tool: Tool,
    isFavorite: Boolean,
    onFavoriteToggle: () -> Unit,
    onClick: () -> Unit
) {
    val categoryColor = when (tool.category) {
        "dev" -> AccentCyan
        "text" -> AccentMagenta
        "design" -> AccentGreen
        "guides" -> Primary
        else -> AccentOrange
    }

    val iconVector = when (tool.category) {
        "dev" -> Icons.Default.Build
        "text" -> Icons.Default.Edit
        "design" -> Icons.Default.ShoppingCart // Representative icon
        "guides" -> Icons.Default.Info
        else -> Icons.Default.Refresh
    }

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(BgCard, RoundedCornerShape(16.dp))
            .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
            .clickable(onClick = onClick)
            .padding(14.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Category Icon
                Box(
                    modifier = Modifier
                        .size(38.dp)
                        .background(categoryColor.copy(alpha = 0.1f), RoundedCornerShape(10.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = iconVector,
                        contentDescription = "Tool Category Icon",
                        tint = categoryColor,
                        modifier = Modifier.size(20.dp)
                    )
                }

                // Favorite Toggle Star
                IconButton(
                    onClick = onFavoriteToggle,
                    modifier = Modifier.size(24.dp)
                ) {
                    Icon(
                        imageVector = if (isFavorite) Icons.Default.Star else Icons.Default.Star,
                        contentDescription = "Favorite Toggle",
                        tint = if (isFavorite) AccentOrange else TextMuted
                    )
                }
            }

            Text(
                text = tool.name,
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = Color.White
            )

            Text(
                text = tool.desc,
                fontSize = 11.sp,
                color = TextMuted,
                lineHeight = 15.sp,
                maxLines = 2
            )
        }
    }
}
