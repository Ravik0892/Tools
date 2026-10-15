# OmniTool Hub v2 (Masterpiece Edition) - Complete Project Manual

OmniTool Hub is a premium, privacy-focused, 100% client-side web utility hub containing **27 powerful developer and utility tools** organized in consolidated suites. By executing calculations directly inside the user's browser, the application runs with absolute privacy, zero latency, and $0 hosting or API costs.

---

## 🌟 Masterpiece Innovation Features

### 1. ["Smart Chain" Pipeline Builder](file:///f:/Tools%20website/guides/pipeline-builder.html)
*   **What it does**: Allows users to stack multiple operations in a sequential chain.
*   **How it works**: The output of the top block automatically becomes the input for the next block down. For example: `Input Text` ➔ `Base64 Decode` ➔ `JSON Format` ➔ `Convert to uppercase`.
*   **Engineering detail**: Custom-bound pure JavaScript transformations run sequentially over the text memory buffer on keypress, handling data streams instantly.

### 2. Global Command Palette (`Ctrl + K`)
*   **What it does**: Provides keyboard-driven navigation across the workspace.
*   **How it works**: Pressing `Ctrl + K` (or `Cmd + K` on Mac) opens a sleek modal search. Navigating with `Up` / `Down` arrows and pressing `Enter` instantly opens a tool.
*   **Engineering detail**: Listeners catch key down events globally, filter the tools catalog in real-time, and shift visual focus elements seamlessly.

### 3. Smart Paste Auto-Detection
*   **What it does**: Auto-scans clipboard values pasted onto the dashboard.
*   **How it works**: The app listens for global `paste` events. If it detects a specific structure (e.g. JSON, Hex, JWT, Timestamp), it shows a toast with a clickable shortcut button to launch the corresponding tool with the prefilled data.
*   **Regex rules**:
    *   *JSON*: `{ ... }` or `[ ... ]` structure.
    *   *JWT*: Three dot-separated base64url strings (`xxxx.yyyy.zzzz`).
    *   *Hex Color*: `#` followed by 3 or 6 valid hexadecimal characters.
    *   *Epoch Timestamp*: A 10-digit or 13-digit numeric string.

### 4. PWA Support (Progressive Web App)
*   **What it does**: Makes the website installable as a standalone app on desktops and mobile devices.
*   **How it works**: Standard `manifest.json` metadata defines theme colors and launcher configurations, while the Service Worker (`sw.js`) caches HTML, CSS, JS, and Google Fonts so the app works entirely offline.

---

## 🛠️ Complete Tools Reference Catalog & Routing Index

### 💻 Developer Tools
*   **Main Category Link**: [All Developer Tools](https://omnitool-hub.vercel.app/#category/dev-all)
*   **Subcategory Filters**:
    *   [Data Pipelines](https://omnitool-hub.vercel.app/#category/dev-pipelines)
    *   [Formatters & Parsers](https://omnitool-hub.vercel.app/#category/dev-formatters)
    *   [Crypto & Security](https://omnitool-hub.vercel.app/#category/dev-crypto)
    *   [Generators](https://omnitool-hub.vercel.app/#category/dev-generators)

#### 1. Smart Chain Pipeline Builder (`pipeline-builder`)
*   **Description**: Connect multiple data operations in series to process text sequentially.
*   **Guide Page**: [pipeline-builder.html](file:///f:/Tools%20website/guides/pipeline-builder.html)
*   **How it works**: Executes inline sequence scripts over input text dynamically in the browser window.

#### 2. Data Formatter & Converter Suite (`formatter-suite`)
*   **Description**: Validate and beautify JSON, format SQL database queries, and convert data bi-directionally between JSON, YAML, and CSV.
*   **Guide Page**: [json-formatter.html](file:///f:/Tools%20website/guides/json-formatter.html)
*   **Sub-tabs**: JSON Formatter, SQL Beautifier, JSON/YAML/CSV Converter.

#### 3. JWT Decoder (`jwt-decoder`)
*   **Description**: Decode JSON Web Tokens (JWT) instantly to view header parameters, claim payloads, and verify expiration dates.
*   **Guide Page**: [jwt-decoder.html](file:///f:/Tools%20website/guides/jwt-decoder.html)

#### 4. Cryptography Suite (`crypto-suite`)
*   **Description**: Generate cryptographic hash checksums, encrypt/decrypt text with symmetric AES-256 GCM, and generate asymmetric RSA private/public key pairs.
*   **Guide Page**: [crypto-suite.html](file:///f:/Tools%20website/guides/crypto-suite.html)
*   **Sub-tabs**: Hash Generator, AES Cipher, RSA Key Generator.

#### 5. Dynamic QR Code Studio (`qr-generator`)
*   **Description**: Generate highly customized art QR codes with linear/radial gradients, custom dots, eye styles, and centered branding logos.
*   **Guide Page**: [qr-generator.html](file:///f:/Tools%20website/guides/qr-generator.html)

#### 6. Meta Tag & SEO Previewer (`seo-previewer`)
*   **Description**: Input page details to design meta tags and view live Google, Facebook, Twitter, and Discord mockup cards.
*   **Guide Page**: [seo-previewer.html](file:///f:/Tools%20website/guides/seo-previewer.html)

#### 7. Private CSV/JSON Mock Data Generator (`mock-data-generator`)
*   **Description**: Define schemas (names, emails, dates, values) and bulk-generate up to 50,000 rows of mock database data client-side.
*   **Guide Page**: [mock-data-generator.html](file:///f:/Tools%20website/guides/mock-data-generator.html)

#### 8. HTML/CSS/JS Live Playground (`code-playground`)
*   **Description**: Write frontend code with live sandboxed preview rendering and a simulated console debugger.
*   **Guide Page**: [code-playground.html](file:///f:/Tools%20website/guides/code-playground.html)

#### 9. Settings & Ad Control Panel (`admin-settings`)
*   **Description**: Toggles banner ad placements, saves global options, and handles application cache purging (available on local hosts).

---

### 📝 Text & Writing Utilities
*   **Main Category Link**: [All Text Utilities](https://omnitool-hub.vercel.app/#category/text-all)
*   **Subcategory Filters**:
    *   [Transformations](https://omnitool-hub.vercel.app/#category/text-case)
    *   [Writers & Parsers](https://omnitool-hub.vercel.app/#category/text-markdown)
    *   [Pattern Analysis](https://omnitool-hub.vercel.app/#category/text-regex)

#### 10. Text Cases & Encoder Suite (`text-encoder-suite`)
*   **Description**: Bulk-convert capitalization cases and run URL or Base64 encoding/decoding operations.
*   **Guide Page**: [text-encoder-suite.html](file:///f:/Tools%20website/guides/text-encoder-suite.html)
*   **Sub-tabs**: Case Converter, Base64 Encoder, URL Encoder.

#### 11. URL Query Parser & Builder (`url-parser`)
*   **Description**: Parses raw web URLs, displays query parameters in an editable grid, and compiles clean campaign links with custom parameters.
*   **Guide Page**: [url-parser.html](file:///f:/Tools%20website/guides/url-parser.html)

#### 12. Live Markdown Previewer (`markdown-preview`)
*   **Description**: Write standard markdown syntax and preview formatting in real-time alongside compiled HTML code outputs.
*   **Guide Page**: [markdown-preview.html](file:///f:/Tools%20website/guides/markdown-preview.html)

#### 13. Text Diff Comparison (`text-diff`)
*   **Description**: Compare two blocks of text side-by-side or line-by-line with red (deleted) and green (added) syntax highlights.
*   **Guide Page**: [text-diff.html](file:///f:/Tools%20website/guides/text-diff.html)

#### 14. Multi-PDF Searcher & OCR (`pdf-searcher`)
*   **Description**: Search through multiple large PDF files simultaneously for keywords and perform optical character recognition (OCR) on scanned pages locally.
*   **Guide Page**: [pdf-searcher.html](file:///f:/Tools%20website/guides/pdf-searcher.html)

#### 15. PDF Toolbox (Split, Merge, Convert & Compress) (`pdf-utilities`)
*   **Description**: Split into PDF/PNG/JPG/WebP/Text, merge multiple PDFs, rotate/reorganize pages, and compress documents 100% client-side.
*   **Guide Page**: [pdf-utilities.html](file:///f:/Tools%20website/guides/pdf-utilities.html)

#### 16. Visual Regex & Extractor Suite (`regex-tester`)
*   **Description**: Test regular expressions visually and batch-extract or replace phone numbers, emails, IPs, and URLs from target text.
*   **Guide Page**: [regex-tester.html](file:///f:/Tools%20website/guides/regex-tester.html)

#### 17. Text Readability & Analyzer (`text-analyzer`)
*   **Description**: Analyzes writing structure for syllables, readability grades (Flesch score), reading time, and keyword densities.
*   **Guide Page**: [text-analyzer.html](file:///f:/Tools%20website/guides/text-analyzer.html)

---

### 🎨 Design & Styling Tools
*   **Main Category Link**: [All Design Tools](https://omnitool-hub.vercel.app/#category/design-all)
*   **Subcategory Filters**:
    *   [CSS Builders](https://omnitool-hub.vercel.app/#category/design-css)
    *   [Color Management](https://omnitool-hub.vercel.app/#category/design-color)
    *   [Graphics & Screens](https://omnitool-hub.vercel.app/#category/design-graphics)

#### 18. CSS Studio Suite (`css-studio`)
*   **Description**: Build multi-stop CSS gradients, complex shadow spreads, and modern frosted glassmorphism elements with responsive CSS output.
*   **Guide Page**: [css-studio.html](file:///f:/Tools%20website/guides/css-studio.html)
*   **Sub-tabs**: Gradient Generator, Box Shadow, Glassmorphism.

#### 19. Color Lab & Contrast Suite (`color-lab`)
*   **Description**: Design WCAG accessibility-compliant color palettes and calculate contrast ratios for large/standard typography.
*   **Guide Page**: [color-lab.html](file:///f:/Tools%20website/guides/color-lab.html)
*   **Sub-tabs**: Color Palette, Shades & Tints, Opacities.

#### 20. Graphics Designer & Screenshot Studio (`graphics-studio`)
*   **Description**: Take webcam snapshots, overlay styled text layers, apply filters, and download or copy images directly.
*   **Guide Page**: [graphics-studio.html](file:///f:/Tools%20website/guides/graphics-studio.html)

#### 21. Image Optimizer & Converter (`image-converter`)
*   **Description**: Adjust dimensions, manage quality ratios, and convert image formats (WebP, PNG, JPEG) client-side.
*   **Guide Page**: [image-converter.html](file:///f:/Tools%20website/guides/image-converter.html)

#### 22. SVG Animation Studio (`svg-animator`)
*   **Description**: Import SVG vectors, visualize paths, apply motion keyframe presets (self-drawing, neon pulse, spin), and export animated SVGs.
*   **Guide Page**: [svg-animator.html](file:///f:/Tools%20website/guides/svg-animator.html)

---

### 🔢 Math & Conversions Suite
*   **Main Category Link**: [All Math Tools](https://omnitool-hub.vercel.app/#category/math-all)
*   **Subcategory Filters**:
    *   [Calculator](https://omnitool-hub.vercel.app/#category/math-calc)
    *   [Conversion](https://omnitool-hub.vercel.app/#category/math-conversion)
    *   [Security & Pass](https://omnitool-hub.vercel.app/#category/math-security)

#### 23. Security & Passwords Suite (`security-suite`)
*   **Description**: Generate cryptographically secure passwords with entropy complexity metrics, and generate bulk RFC 4122 v4 UUIDs.
*   **Guide Page**: [security-suite.html](file:///f:/Tools%20website/guides/security-suite.html)
*   **Sub-tabs**: Password Generator, UUID Generator.

#### 24. Date & Time Suite (`datetime-suite`)
*   **Description**: Convert Unix epoch timestamps, compute durations between dates, and dynamically calculate target calendar schedules.
*   **Guide Page**: [datetime-suite.html](file:///f:/Tools%20website/guides/datetime-suite.html)
*   **Sub-tabs**: Epoch Converter, Date Calculator.

#### 25. Scientific Calculator (`calculator`)
*   **Description**: Run advanced arithmetic, trig, and log equations, and plot 2D functions f(x) visually on a coordinate grid.
*   **Guide Page**: [calculator.html](file:///f:/Tools%20website/guides/calculator.html)

#### 26. IP Subnet & MAC Address Suite (`ip-subnet-calculator`)
*   **Description**: Segment networking domains with binary subnet graphs, format MAC addresses, and perform manufacturers' OUI vendor lookups.
*   **Guide Page**: [ip-subnet-calculator.html](file:///f:/Tools%20website/guides/ip-subnet-calculator.html)

#### 27. Unit Converter (`unit-converter`)
*   **Description**: Convert metrics, weights, temperature indexes, and digital bytes storage dimensions.
*   **Guide Page**: [unit-converter.html](file:///f:/Tools%20website/guides/unit-converter.html)

---

## 🔐 Admin Control Panel & Master Passcode

The built-in Admin Control Panel lets you configure advertisements, branding, payees, and payment gateways client-side.

*   **Admin Access URL**: [http://127.0.0.1:8000/#admin](http://127.0.0.1:8000/#admin) (or `#tool/admin-settings` on local server)
*   **Default Master Passcode**: `admin123`
*   **PRO Master Activation Key**: Entering `admin123` into the License Key / UTR field on the `#plans` page or `#checkout` modal instantly unlocks full Lifetime PRO access!

### Available Configurations in Admin Panel:
1.  **Payment Gateways & Payee Information**:
    *   **UPI ID (VPA)**: Set your payee UPI address (default: `ravik0892@okaxis`).
    *   **Direct Bank Transfer**: Configure your Bank Name (e.g. State Bank of India, Punjab National Bank, Kotak), Beneficiary Name, Account Number, and IFSC code for direct IMPS/NEFT transfers.
    *   **Gumroad / PayPal / Razorpay / Ko-fi**: Link your personal checkout and donation pages.
    *   **Crypto Wallets**: Set deposit addresses for USDT (TRC-20), Bitcoin (BTC), and Ethereum (ETH).
    *   **Custom License Keys**: Distribute comma-separated custom passcodes (e.g. `VIP-2026`, `MONTHLY-PRO`).
2.  **Monetization & Advertisements**:
    *   Toggle global ads on/off.
    *   Configure Google AdSense Client ID & Slot IDs or AdMob Smart Banners.
    *   Set custom Sponsor brand names, slogans, and affiliate links with per-tool overrides.
3.  **Security & System**:
    *   Change the master passcode anytime from the "Admin Access Passcode" field.
    *   Export all configurations to [ad-config.json](file:///f:/Tools%20website/ad-config.json) with 1 click.

---

## 📈 Monetization & Ad Placements

To make this site profitable, you can add ad spaces using network networks like Google AdSense.

### Where to Place Ad Codes
Open **[index.html](file:///f:/Tools%20website/index.html)** and paste ad units in these 3 optimized locations:
1.  **Sidebar Ad Widget**: Below the "Recent Tools" list in `<aside class="sidebar">`. Great for standard vertical skyscraper ads.
2.  **Dashboard Top Banner**: Below the hero section in `<div id="dashboard-view">`. High visibility banner area.
3.  **Tool Panels Footer**: Inside `<section class="content-area">` placed as a bottom container. Displays ads beneath active tools.

---

## 🚀 Deployment Guide (100% Free Hosting)

### Option A: GitHub Pages (Recommended)
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial release"
   ```
2. Create a repository on GitHub, link it, and push:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```
3. Go to Repository **Settings** ➔ **Pages** ➔ set Source to **Deploy from a branch** ➔ select **main** branch ➔ click **Save**.
4. Your site will go live at `https://<your-username>.github.io/<your-repo-name>/` in less than a minute!

### Option B: Netlify / Vercel
1. Create a free account on [Netlify](https://www.netlify.com/) or [Vercel](https://vercel.com/).
2. Drag and drop the `f:\Tools website` directory directly into the Netlify dashboard upload block, or link your GitHub repository.
3. The platform will automatically deploy your static files and provide a secure, HTTPS subdomain instantly.
