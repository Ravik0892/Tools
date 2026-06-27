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

## 📦 Publishing to Google Play Store or other App Stores

This project is set up to target **Android 14 (API Level 34)**, satisfying the current Google Play Store guidelines.

### Checklist to Publish:
1. **Change App Package Name (Optional)**:
   - If you want a custom developer URL, change `com.omnitool.hub` to your own namespace (e.g., `com.yourcompany.omnitool`) in `app/build.gradle` and `AndroidManifest.xml`.
2. **Set up App Icons**:
   - Right-click the `app/` folder in Android Studio and select **New > Image Asset**.
   - Generate your launcher icons matching your brand.
3. **Generate Signed Bundle**:
   - Go to **Build > Generate Signed Bundle / APK** in Android Studio.
   - Create a Keystore file and input signing credentials.
   - Export an **Android App Bundle (.aab)** and upload it directly onto the Google Play Console!
