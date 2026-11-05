# 🚀 Complete Google Play Store Publishing Guide for OmniTool Hub

This guide walks you step-by-step through building, testing, signing, and publishing **OmniTool Hub** to the **Google Play Store**.

---

## 📋 What Was Upgraded & Configured For You

1. **All 48 Tools Registered in Kotlin:**
   [`ToolRepository.kt`](file:///f:/Tools%20website/omnitool-android-app/app/src/main/java/com/omnitool/hub/model/Tool.kt) was generated with all 46 web utility suites + 2 native Android diagnostics tools (`native-logcat`, `native-device-info`).
2. **Modern Secure WebView Bridge:**
   [`WebToolScreen.kt`](file:///f:/Tools%20website/omnitool-android-app/app/src/main/java/com/omnitool/hub/ui/screens/WebToolScreen.kt) now utilizes `androidx.webkit.WebViewAssetLoader` with `https://appassets.androidplatform.net/assets/`. This complies with Google Play security mandates and allows ES module imports (`import()`) without CORS or local file scheme errors.
3. **Hardware Back Button & Gesture Handler:**
   Integrated Jetpack Compose `BackHandler` in [`WebToolScreen.kt`](file:///f:/Tools%20website/omnitool-android-app/app/src/main/java/com/omnitool/hub/ui/screens/WebToolScreen.kt). Pressing the phone's back button navigates web history or returns smoothly to the native dashboard.
4. **Native File Upload Chooser:**
   Implemented Android's `ActivityResultContracts.StartActivityForResult()` inside `WebChromeClient.onShowFileChooser`. Users can upload files to PDF, Image, and Audio tools directly from their Android file manager.
5. **Production Launcher Icons & Drawables:**
   - [`res/values/colors.xml`](file:///f:/Tools%20website/omnitool-android-app/app/src/main/res/values/colors.xml)
   - [`res/drawable/ic_launcher_background.xml`](file:///f:/Tools%20website/omnitool-android-app/app/src/main/res/drawable/ic_launcher_background.xml)
   - [`res/drawable/ic_launcher_foreground.xml`](file:///f:/Tools%20website/omnitool-android-app/app/src/main/res/drawable/ic_launcher_foreground.xml)
   - [`res/mipmap-anydpi-v26/ic_launcher.xml`](file:///f:/Tools%20website/omnitool-android-app/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml)
   - [`res/mipmap-anydpi-v26/ic_launcher_round.xml`](file:///f:/Tools%20website/omnitool-android-app/app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml)
6. **Embedded Seamless UI Mode:**
   When running inside the Android app, [`style.css`](file:///f:/Tools%20website/style.css) automatically hides redundant web headers, desktop sidebars, and desktop navigation, displaying clean edge-to-edge native tool screens.
7. **1-Command Asset Synchronization:**
   Run `npm run sync-android` anytime you modify the website to automatically mirror the latest web code into [`app/src/main/assets/web/`](file:///f:/Tools%20website/omnitool-android-app/app/src/main/assets/web/).

---

## 🛠️ Step 1: Open the Project in Android Studio

1. Download and install [Android Studio](https://developer.android.com/studio) (Hedgehog, Iguana, Jellyfish, or newer).
2. Launch Android Studio and click **Open**.
3. Select the folder: `f:\Tools website\omnitool-android-app`.
4. Wait for Gradle to finish syncing project dependencies.

---

## 📱 Step 2: Test on an Emulator or Physical Phone

1. **Create an Emulator:**
   - In Android Studio, open the **Device Manager** (phone icon on the top right).
   - Click **Create Device**, select **Pixel 8** or **Pixel 7**, and choose **API Level 34 (Android 14)**.
   - Click **Finish**.
2. **Or Use a Physical Android Device:**
   - Enable **Developer Options** and **USB Debugging** on your phone.
   - Connect your phone to your computer via USB.
3. Click the green **Run (Play)** button in Android Studio.
4. Test clicking tools, searching, pinning favorites, and pressing Back.

---

## 🔑 Step 3: Customize App Identity & Package Name

Before publishing, customize your package name in [`app/build.gradle`](file:///f:/Tools%20website/omnitool-android-app/app/build.gradle):

```groovy
android {
    namespace 'com.omnitool.hub'

    defaultConfig {
        applicationId "com.worldsneed.omnitool" // <-- Replace with your company/brand ID
        minSdk 26
        targetSdk 34 // Meets Google Play Android 14 requirement
        versionCode 1
        versionName "1.0.0"
    }
}
```

*Note: In Google Play Store, every app must have a unique `applicationId`.*

---

## 📦 Step 4: Generate a Signed Release Bundle (.aab)

Google Play requires an **Android App Bundle (.aab)** signed with a digital release keystore:

1. In Android Studio, go to the top menu: **Build &rarr; Generate Signed Bundle / APK...**
2. Choose **Android App Bundle** and click **Next**.
3. **Key store path**: Click **Create new...**
   - Choose a safe folder on your computer to save your `release.keystore` file.
   - Set a strong password and save it in a password manager.
   - Key Alias: `omnitool_key`
   - Validity: `25 years`
   - Fill in your Organization or Developer name and click **OK**.
4. Check **Remember passwords**, and select:
   - Build Variant: **release**
5. Click **Create** / **Finish**.
6. Android Studio will generate the signed bundle in:
   `omnitool-android-app/app/release/app-release.aab`.

> [!WARNING]
> Keep a backup of your `release.keystore` file and its password! If you lose this key, Google Play will not allow you to update your app in the future.

---

## 🌐 Step 5: Publish on Google Play Console

1. **Register Google Play Developer Account:**
   - Go to [Google Play Console](https://play.google.com/console).
   - If you do not have one, pay the one-time $25 registration fee.
2. **Create New App:**
   - App Name: `OmniTool Hub - Offline Developer & PDF Utility Suite`
   - Default Language: `English (United States)`
   - App or Game: `App`
   - Free or Paid: `Free`
3. **Set Up Store Listing:**
   - **Short Description (80 chars):** 
     *50+ offline developer utilities, PDF editor, cryptography, and formatting tools.*
   - **Full Description:**
     *OmniTool Hub is an all-in-one private utility suite that runs 100% locally on your device. Includes JSON formatter, Base64 encoder, JWT decoder, AES encryption, PDF merger, page splitter, scientific calculator, QR code generator, and more. Zero server tracking, instant speed, and completely offline-ready.*
   - **App Icon:** 512x512 PNG.
   - **Feature Graphic:** 1024x500 PNG (You can use [`product_hunt_assets/00_omnitool_hero_showcase.png`](file:///f:/Tools%20website/product_hunt_assets/00_omnitool_hero_showcase.png)).
   - **Phone Screenshots:** Capture 2 to 8 screenshots from the Android emulator or prototype.
4. **Complete App Content Policies:**
   - **Privacy Policy:** Link to your live privacy policy: `https://omnitool.worldsneed.com/#privacy` (or `https://worldsneed.com/privacy`).
   - **Data Safety:** State that your app does not collect or share personal user data (since all processing runs locally on the device).
   - **Target Audience:** Set 13+ or General developers/creators.
   - **Content Rating:** Complete the IARC questionnaire (select Utility/Tool, resulting in PEGI 3 / Everyone).
5. **Upload the App Bundle:**
   - Go to **Production &rarr; Releases &rarr; Create new release**.
   - Upload your `app-release.aab` file.
   - Enter release notes (e.g. `Initial release of OmniTool Hub Android Suite`).
   - Click **Save** &rarr; **Review release** &rarr; **Start rollout to Production**!

---

## 💰 Step 6: Google AdMob Integration & app-ads.txt Setup

> [!IMPORTANT]
> **AdSense vs AdMob Notice:**
> Google strictly prohibits displaying web AdSense ads inside mobile WebViews. To monetize on Android, you must use the native **Google Mobile Ads (AdMob) SDK**.

### 1. Host `app-ads.txt` on your website
An [`app-ads.txt`](file:///f:/Tools%20website/app-ads.txt) file has been generated in the project root.
Deploy it to your public domain root:
`https://omnitool.worldsneed.com/app-ads.txt` (or `https://worldsneed.com/app-ads.txt`).
Replace `pub-0000000000000000` with your actual AdMob Publisher ID from your AdMob account settings.

### 2. Add Google Mobile Ads SDK to `app/build.gradle`
When ready to display ads, add to `dependencies { ... }` in `omnitool-android-app/app/build.gradle`:
```groovy
implementation 'com.google.android.gms:play-services-ads:23.0.0'
```

### 3. Register AdMob App ID in `AndroidManifest.xml`
Inside `<application ...>` in `omnitool-android-app/app/src/main/AndroidManifest.xml`:
```xml
<!-- Google AdMob Application ID (Use test ID ca-app-pub-3940256099942544~3347511713 during development) -->
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-YOUR_PUBLISHER_ID~YOUR_APP_ID"/>
```

### 4. Important AdMob Approval Timeline
1. Never test live ads on personal devices (AdMob bans accounts for self-clicking). Always use official test unit IDs during testing:
   - Test Banner ID: `ca-app-pub-3940256099942544/6300978111`
2. AdMob reviews new apps only after they are submitted to Google Play Console. First release your app to Closed Testing / Production, then link it inside the Google AdMob dashboard.

---

## 🧪 Step 7: Fast 5-Tool Hardware Testing Checklist

You **do not** need to test all 48 tools manually because the automated test suite (`npm test`) already verified all 48 tools for syntax, DOM mounting, and JavaScript calculation integrity.

Before publishing, simply test these **5 key hardware & file tools** on your phone:
1. **Camera**: Open `qr-studio` &rarr; Scan tab &rarr; Click "Start Live Camera". (Ensure the camera prompt appears).
2. **Microphone**: Open `voice-recorder` &rarr; Click "Record". (Ensure the microphone prompt appears and the audio waveform moves).
3. **File Upload**: Open `pdf-utilities` &rarr; Click upload and select a PDF from your device storage. (Verifies the Android file picker).
4. **File Download**: Open `image-converter` &rarr; Select an image &rarr; Download as WebP. (Verifies device storage saving).
5. **Back Gesture**: Open any tool &rarr; Use Android's back gesture/button &rarr; Verify it returns to the dashboard without quitting the app.

---

## 🔄 Updating Your App in the Future

Whenever you add new tools or improve styles on the website:
1. Run `npm run sync-android` (mirrors all web files into Android assets).
2. In `app/build.gradle`, increment `versionCode` (e.g. `2`) and `versionName` (e.g. `1.0.1`).
3. Build a new signed bundle (`Build > Generate Signed Bundle / APK`).
4. Upload the new `.aab` to Google Play Console.

