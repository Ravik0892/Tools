# OmniTool Hub - Android Mobile App Layout (Jetpack Compose)

This directory contains a complete, compile-ready Android Studio project skeleton for **OmniTool Hub**. The project is built using modern **Kotlin** and **Jetpack Compose (Material 3)**, styled with the premium dark theme matching the web utility suite.

As requested, this project includes only the screen layouts, navigation, and dashboard, without the tool-specific calculator/encoder logic inside the Kotlin files. This allows you to inspect the UI and build upon it to publish on Google Play Store.

---

## 📂 Project Structure

```
omnitool-android-app/
├── prototype/
│   └── index.html           <-- Interactive Clickable Mockup (Open in browser)
├── app/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/omnitool/hub/
│   │       │   ├── model/
│   │       │   │   └── Tool.kt            <-- Data models of all 21 tools
│   │       │   ├── ui/
│   │       │   │   ├── theme/
│   │       │   │   │   ├── Color.kt       <-- Custom neon-blue/purple color palette
│   │       │   │   │   ├── Theme.kt       <-- Compose Material 3 Theme wrapper
│   │       │   │   │   └── Type.kt        <-- Modern typography configurations
│   │       │   │   └── screens/
│   │       │   │       ├── DashboardScreen.kt <-- Real-time search grid and categories
│   │       │   │       ├── ToolLayoutScreen.kt <-- Template layout screen for tools
│   │       │   │       ├── PipelineScreen.kt   <-- "Smart Chain" builder layout UI
│   │       │   │       └── SettingsScreen.kt   <-- App configurations layout
│   │       │   └── MainActivity.kt        <-- State router, drawer, and bottom navigation
│   │       ├── res/
│   │       │   └── values/
│   │       │       ├── strings.xml        <-- Android App strings config
│   │       │       └── themes.xml         <-- Base Android system color layout override
│   │       └── AndroidManifest.xml        <-- Android Core manifest definitions
│   └── build.gradle                       <-- App dependencies (Compose Navigation, Material 3)
├── build.gradle                           <-- Top-level Gradle plugins
├── settings.gradle                        <-- Project namespace and repository setup
└── gradle.properties                      <-- JVM memory bounds and AndroidX flags
```

---

## 🖥️ How to Preview the Clickable Mockup

Before opening Android Studio, you can test the layout, search filters, drawer navigation, and settings directly in your browser:
1. Open the [prototype/index.html](file:///f:/Tools%20website/omnitool-android-app/prototype/index.html) file.
2. Double click the file to open it in Chrome, Edge, or Firefox.
3. Click around on the simulated Android screen to test categories, search terms, and screen layouts.

---

## 📂 Setup Web Assets (Required for WebView Bridge)

To run the web tools offline inside the app's WebView container, copy the web project files into the Android assets folder:
1. In Windows File Explorer, create a folder named `web` inside `omnitool-android-app/app/src/main/assets/` (creating `assets/` and `web/` directories if they do not exist).
2. Copy the following files/folders from your website directory (`f:\Tools website`) into that new `web/` folder:
   - `index.html`
   - `style.css`
   - `app.js`
   - `manifest.json`
   - The `/tools/` folder (containing all 46 modular tool script files)

---

## 🛠️ How to Import and Run in Android Studio

1. **Prerequisites**: Ensure you have [Android Studio (Hedgehog or newer)](https://developer.android.com/studio) installed.
2. **Importing the project**:
   - Open Android Studio.
   - Click **File > Open** or select **Open an Existing Project** from the welcome screen.
   - Choose the `omnitool-android-app` folder and click **OK**.
   - Let Gradle sync download the Compose libraries.
3. **Running the App**:
   - Create or select an Android Virtual Device (Emulator) targetting API level 26 to 34.
   - Click the green **Run (Play)** button at the top of Android Studio.

---

## 🚀 Customizing and Adding Tools Logic

To convert this skeleton layout into a fully functioning tool suite in Kotlin:
1. Add custom tool Composable functions in a new folder `com/omnitool/hub/ui/tools/`.
2. In `com/omnitool/hub/ui/screens/ToolLayoutScreen.kt`, check the tool ID and render the custom tool screen instead of the default mock input/output fields. For example:
   ```kotlin
   when (tool.id) {
       "json-formatter" -> JsonFormatterUI()
       "base64" -> Base64EncoderUI()
       else -> GenericToolLayout(tool)
   }
   ```
3. To share JavaScript logic directly between the website and Android, you can also embed a hybrid `WebView` in `ToolLayoutScreen.kt` that resolves the static local script asset files (`F:\Tools website\tools\*.js`).

---

## 📦 Publishing to Google Play Store & Amazon Appstore

This project is fully verified, builds cleanly from source, and is configured for both **Google Play Store** (Android App Bundle `.aab`) and **Amazon Appstore** (Universal APK `.apk` / `.aab`).

### 📚 Official Step-by-Step Publishing Guides:
- **Google Play Store Guide**: [`GOOGLE_PLAY_PUBLISH_GUIDE.md`](file:///f:/Tools%20website/omnitool-android-app/GOOGLE_PLAY_PUBLISH_GUIDE.md)
- **Amazon Appstore Guide**: [`AMAZON_APPSTORE_PUBLISH_GUIDE.md`](file:///f:/Tools%20website/omnitool-android-app/AMAZON_APPSTORE_PUBLISH_GUIDE.md)

### 🎨 Store Graphics & Metadata Directory:
Pre-sized high-resolution assets and listing text are located in [`omnitool-android-app/store_assets/`](file:///f:/Tools%20website/omnitool-android-app/store_assets/):
- `icon_512x512.png` — 512x512 High-Res App Icon (Google Play & Amazon Appstore)
- `icon_114x114.png` — 114x114 Small App Icon (Amazon Appstore required)
- `feature_graphic_1024x500.png` — 1024x500 Promotional Banner (Google Play & Amazon Appstore)
- `banner_1280x720.png` — 1280x720 Promotional Banner (Amazon Fire OS optional)
- `google_play_metadata.json` — Title (<=30 chars), Short description (<=80 chars), Full description, Data Safety specs
- `amazon_appstore_metadata.json` — Title, Short description, Long description, 5 Feature Bullets, Keywords

### ⚡ 1-Command Build (Command Line):
```powershell
$env:JAVA_HOME = "C:\Users\DELL\.gradle\jdks\jetbrains_s_r_o_-21-amd64-windows.2"
cd "F:\Tools website\omnitool-android-app"
.\gradlew.bat assembleRelease bundleRelease
```
- **Google Play Bundle**: `app/build/outputs/bundle/release/app-release.aab`
- **Amazon Appstore APK**: `app/build/outputs/apk/release/app-release-unsigned.apk` (or signed via Android Studio / `apksigner`)

