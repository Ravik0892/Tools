# Project specific ProGuard rules for OmniTool Hub

# Keep JavascriptInterface methods for WebKit bridge communication
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Keep Compose Material & Navigation
-keep class androidx.compose.** { *; }
-dontwarn androidx.compose.**

# Keep AndroidX WebKit & AssetLoader
-keep class androidx.webkit.** { *; }

# Keep data models
-keep class com.omnitool.hub.model.** { *; }
-keepclassmembers class com.omnitool.hub.model.** { *; }
