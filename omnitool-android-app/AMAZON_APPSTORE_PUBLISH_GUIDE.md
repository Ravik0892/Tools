# 🚀 Complete Amazon Appstore Publishing Guide for OmniTool Hub

This comprehensive guide details the step-by-step process for publishing **OmniTool Hub** to the **Amazon Appstore** (for Amazon Fire Tablets, Fire Max 11, and Android devices using the Amazon Appstore).

---

## 🌟 Why OmniTool Hub is 100% Amazon Fire OS Ready

1. **Zero Google Mobile Services (GMS) Dependencies:**
   Amazon Fire devices do NOT include Google Play Services. OmniTool Hub does not depend on Firebase, Play Services, or Google Play Billing. It runs purely on AndroidX, Jetpack Compose, and native WebKit.
2. **MinSDK 26 & TargetSDK 34:**
   Compatible with Fire OS 7 (Android 9 Pie), Fire OS 8 (Android 11), and all modern Fire Tablets (Fire 7, Fire HD 8, Fire HD 10, Fire Max 11).
3. **Graceful Hardware Flags:**
   Camera and microphone hardware features are declared with `android:required="false"` in `AndroidManifest.xml`, ensuring seamless installation even on low-end tablets without rear cameras.
4. **Complete Legacy & Adaptive Icon Support:**
   The app includes adaptive icons (`anydpi-v26`) and legacy raster mipmaps (`mdpi` through `xxxhdpi`) required by Amazon Fire OS home screens.

---

## 📁 Pre-Generated Amazon Store Assets

All required graphics and copy are pre-generated and ready in [`omnitool-android-app/store_assets/`](file:///f:/Tools%20website/omnitool-android-app/store_assets/):

| Asset | Specifications | File Location |
| :--- | :--- | :--- |
| **Large App Icon** | 512 x 512 PNG (32-bit PNG) | `store_assets/icon_512x512.png` |
| **Small App Icon** | 114 x 114 PNG (Mandatory for Amazon) | `store_assets/icon_114x114.png` |
| **Promotional Banner** | 1024 x 500 PNG | `store_assets/feature_graphic_1024x500.png` |
| **Featured Showcase Banner** | 1280 x 720 PNG (Optional for Fire OS) | `store_assets/banner_1280x720.png` |
| **Listing Descriptions & Bullets** | JSON Metadata file | `store_assets/amazon_appstore_metadata.json` |

---

## 🛠️ Step 1: Build the Release Package (APK or AAB)

Amazon Appstore accepts either a **Universal APK** (`.apk`) or an **Android App Bundle** (`.aab`).

To generate both release binaries from PowerShell/Terminal:
```powershell
# Set Java Home to Android Studio's bundled JDK 21
$env:JAVA_HOME = "C:\Users\DELL\.gradle\jdks\jetbrains_s_r_o_-21-amd64-windows.2"

# Build both Release APK and Release AAB
cd "F:\Tools website\omnitool-android-app"
.\gradlew.bat assembleRelease bundleRelease
```

Generated Output Files:
- **Release APK**: `app/build/outputs/apk/release/app-release-unsigned.apk`
- **Release App Bundle (AAB)**: `app/build/outputs/bundle/release/app-release.aab`

---

## 🔑 Step 2: Sign Your Release Binary

Amazon Appstore offers **Amazon App Signing** (where Amazon signs your binary with their key, or allows you to upload your own key).

### Option A: Using Android Studio GUI (Recommended)
1. Open `omnitool-android-app` in Android Studio.
2. Select **Build > Generate Signed Bundle / APK...**
3. Choose **APK** (or **Android App Bundle**).
4. Create or select your keystore file (e.g. `release.keystore`).
5. Choose destination folder, select **release** build variant, and click **Finish**.

### Option B: Sign via Command Line (`apksigner`)
```powershell
& "C:\Users\DELL\AppData\Local\Android\Sdk\build-tools\34.0.0\apksigner.bat" sign `
    --ks "your_release.keystore" `
    --ks-key-alias "omnitool_key" `
    --out "app/build/outputs/apk/release/app-release-signed.apk" `
    "app/build/outputs/apk/release/app-release-unsigned.apk"
```

---

## 🌐 Step 3: Register & Submit to Amazon Developer Console

1. **Sign in to Amazon Developer Portal:**
   - Go to [developer.amazon.com](https://developer.amazon.com/).
   - Sign in with your Amazon account (Registration is **FREE**, no $25 fee required).
2. **Add a New App:**
   - Click **Add a New App > Android**.
   - **App Title**: `OmniTool Hub - Offline Developer & PDF Utility Suite`
   - **App SKU**: `omnitool-hub-android`
   - **App Category**: `Utilities`
3. **Target Your Audience:**
   - Select: `All ages` or `13+`.
   - Fire OS Device Support: Check all Fire Tablets (Fire 7, Fire HD 8, Fire HD 10, Fire Max 11).
4. **Upload Store Assets (from `store_assets/`):**
   - **Large Icon**: Upload `store_assets/icon_512x512.png`
   - **Small Icon**: Upload `store_assets/icon_114x114.png`
   - **Promotional Banner**: Upload `store_assets/feature_graphic_1024x500.png`
   - **Screenshots**: Upload 3 to 10 screenshots of the app.
5. **Fill in Product Descriptions (from `store_assets/amazon_appstore_metadata.json`):**
   - **Short Description**:
     *Over 50 offline developer utilities, complete PDF studio, cryptography tools, and converters running 100% locally on device with zero server tracking and complete privacy.*
   - **Product Feature Bullets**:
     1. *100% Client-Side & Private: Zero telemetry, no external server tracking, works offline*
     2. *Comprehensive PDF Suite: Split, merge, reorder, convert, sign, and redact documents*
     3. *Developer Tools: JSON/YAML/CSV formatters, SQL beautifier, cURL converter, Regex tester*
     4. *Cryptography & Security: AES-256 encryption, RSA keygen, Hash calculators, JWT decoder*
     5. *Media & Utilities: SVG animator, audio extractor, QR code generator, and unit converters*
   - **Keywords**:
     `developer tools,pdf editor,json formatter,base64,offline utilities,qr code,regex,calculator,crypto,aes encryption,jwt decoder,svg animator,unit converter,privacy,fire tablet`
6. **Upload Binary & Set Content Rating:**
   - Drag and drop your signed `app-release.apk` (or `app-release.aab`).
   - Under **Amazon DRM**: Choose **No** (standard for utility suites) or **Yes** (if you wish Amazon to apply digital rights management).
   - **Export Compliance**: When asked if your app uses encryption, select **Yes** and indicate it qualifies for standard retail/consumer encryption exemptions under US EAR (uses standard HTTPS / Android crypto library).
   - **Privacy Policy URL**: `https://omnitool.worldsneed.com/#privacy`
7. **Submit App:**
   - Click **Submit App**. Amazon typically reviews and approves submissions within 24 to 48 hours!

---

## 🧪 Step 4: Verification on Amazon Fire Tablets (Live App Testing)

Before public rollout, you can test directly on your physical Fire Tablet or Android device:
1. In the Amazon Developer Console, select **Live App Testing (LAT)**.
2. Add your Amazon email address to the tester list.
3. You will receive an invitation email from Amazon with a one-click link to install the app from the Amazon Appstore on your Fire tablet!
