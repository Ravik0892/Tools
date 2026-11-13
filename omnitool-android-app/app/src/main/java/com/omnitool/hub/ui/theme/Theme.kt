package com.omnitool.hub.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

private val DarkColorScheme = darkColorScheme(
    primary = Primary,
    secondary = AccentCyan,
    tertiary = AccentMagenta,
    background = BgMain,
    surface = BgCard,
    onPrimary = TextMain,
    onSecondary = BgMain,
    onTertiary = TextMain,
    onBackground = TextMain,
    onSurface = TextMain
)

private val OledBlackColorScheme = darkColorScheme(
    primary = Primary,
    secondary = AccentCyan,
    tertiary = AccentMagenta,
    background = Color.Black,
    surface = Color(0xFF0A0A0A),
    onPrimary = TextMain,
    onSecondary = Color.Black,
    onTertiary = TextMain,
    onBackground = TextMain,
    onSurface = TextMain
)

@Composable
fun OmniToolHubTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    oledBlack: Boolean = false,
    content: @Composable () -> Unit
) {
    val colorScheme = if (oledBlack) OledBlackColorScheme else DarkColorScheme
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = (if (oledBlack) Color.Black else BgMain).toArgb()
            window.navigationBarColor = (if (oledBlack) Color.Black else BgDrawer).toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = false
        }
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
