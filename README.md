# OmniTool Hub v2 (Masterpiece Edition) - Complete Project Manual

OmniTool Hub is a premium, privacy-focused, 100% client-side web utility hub containing **45 consolidated powerhouse hubs (merging 62+ specialized developer, designer, media, text, and math tools)** organized in smart tabbed suites and standalone engines. By executing all logic directly inside the user's browser, the application runs with absolute privacy, zero latency, and $0 hosting or API costs.

> 📖 **Master Directory**: For an exhaustive, in-depth technical manual of all 45 core powerhouse hubs, 35+ sub-tool tabs, operational inputs/outputs, and backward-compatible route aliases, see [TOOLS_CATALOG.md](file:///f:/Tools%20website/TOOLS_CATALOG.md).
> 🚀 **Roadmap**: For competitor audit comparison and planned feature rollouts, see [EXPANSION_PLAN.md](file:///f:/Tools%20website/EXPANSION_PLAN.md).

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

#### 9. Robots.txt Visual Builder (`robots-generator`)
*   **Description**: Visual crawl directive builder with AI web scraper protection (GPTBot, CCBot), crawl-delay, sitemaps, and live syntax validation.
*   **Sub-tabs**: Visual Rule Editor, AI Bot Shield, Raw Preview, .txt Download.

#### 10. QR Code & Barcode Scanner (`qr-scanner`)
*   **Description**: High-speed offline QR and 1D barcode scanner supporting live webcam/camera streams, image drag-and-drop, and clipboard paste.
*   **Sub-tabs**: Live Camera Scanner, File & Clipboard Upload, Smart Action Parser.

#### 11. Settings & Ad Control Panel (`admin-settings`)
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

#### 18. Smart Lorem Ipsum Generator (`lorem-generator`)
*   **Description**: Flexible dummy text generator featuring classical Latin, Cyberpunk Tech, and Corporate B2B vocabularies in paragraphs, lists, HTML, Markdown, or JSON.
*   **Sub-tabs**: Dummy Text Generator, Scope & Units, HTML/Markdown/JSON Formats.

#### 19. Images to PDF Compiler (`images-to-pdf`)
*   **Description**: Compile multiple JPG, PNG, and WebP images into a single clean PDF with visual thumbnail drag-reorder, rotation, page sizing (A4/Letter/Fit), and margins.
*   **Sub-tabs**: Image Board, Page Layout & Margins, PDF-Lib Assembly.

#### 20. Sign PDF Document (`sign-pdf`) *(Phase 3)*
*   **Description**: Draw hand-written signatures on touch/mouse pad, generate typed cursive signatures, or upload stamp seals, then position and embed them directly onto any PDF page.
*   **Sub-tabs**: Draw Pad, Cursive Type, PNG Seal Upload, Interactive Placement.

#### 21. PDF Security & Password Suite (`pdf-security`) *(Phase 3)*
*   **Description**: Protect PDF documents with AES user passwords and granular printing/copy restrictions, or remove passwords and decrypt documents client-side.
*   **Sub-tabs**: Protect PDF (AES Encryption), Unlock & Decrypt PDF.

#### 22. PDF Watermark & Page Numbers (`pdf-watermark`) *(Phase 3)*
*   **Description**: Stamp semi-transparent angled or horizontal text watermarks across pages, and add dynamic page numbers (Page X of Y) with position, margin, and cover-page skip controls.
*   **Sub-tabs**: Text Watermark, Dynamic Page Numbering, Scope & Opacity.

#### 23. Visual PDF Page Organizer (`pdf-organizer`) *(Phase 3)*
*   **Description**: Visual thumbnail grid to reorder pages with drag-and-drop or order buttons, rotate pages 90° clockwise, and delete unwanted pages before export.
*   **Sub-tabs**: Visual Page Grid, Reorder, 90° Rotate, Page Prune & Recompile.

#### 24. Crop PDF Margins & Trim Box (`crop-pdf`) *(Phase 3)*
*   **Description**: Trim excess white borders or crop documents to custom dimensions with interactive canvas bounding box, millimeter inputs, and all/even/odd page scopes.
*   **Sub-tabs**: Interactive Canvas Box, Margin Coordinates, Scope Engine.

#### 25. PDF Form Filler & AcroForms (`pdf-forms`) *(Phase 3)*
*   **Description**: Ingest fillable PDFs, inspect interactive AcroForm fields (text fields, checkboxes, dropdowns, radio groups), fill values in UI, and optionally flatten fields.
*   **Sub-tabs**: AcroForm Inspector, Field Value Editor, Form Flatten & Export.

#### 26. PDF Redact & Privacy Sanitizer (`redact-pdf`) *(Phase 3)*
*   **Description**: Permanently sanitize PDF documents by burning opaque blackout or whiteout redaction rectangles directly into document coordinate streams.
*   **Sub-tabs**: Coordinate Redaction Overlay, Blackout/Whiteout Boxes, Sanitized Export.

#### 27. Excel to PDF & PDF to Excel (`excel-pdf`) *(Phase 4)*
*   **Description**: Convert multi-sheet workbooks (XLSX, XLS, CSV) into presentation-ready PDF tables, or parse PDF table coordinates into clean Excel spreadsheets.
*   **Sub-tabs**: Excel to PDF (Zebra/Grid Themes), PDF to Excel Table Parser.

#### 28. Word to PDF & PDF to Word (`word-pdf`) *(Phase 4)*
*   **Description**: Convert Word DOCX files into print-styled PDFs with preserved tables and headings, or extract text into editable Microsoft Word (.docx/.doc) files.
*   **Sub-tabs**: DOCX to PDF, PDF to Native Word Export.

#### 29. HTML to PDF Webpage Studio (`html-to-pdf`) *(Phase 4)*
*   **Description**: Convert custom HTML/CSS code or imported webpages into ultra-sharp PDFs with live sandbox editing, commercial invoice presets, and page-break rules.
*   **Sub-tabs**: Live Code Editor, Template Presets, 3x Retina PDF Compiler.

#### 30. PDF to Markdown Converter (`pdf-to-markdown`) *(Phase 4)*
*   **Description**: Convert PDF documents into GitHub Flavored Markdown (GFM) with auto-heading detection, bullet lists, pipe tables, and live side-by-side preview.
*   **Sub-tabs**: Markdown Source Editor, Live GFM Preview, .md Download.

#### 31. AI PDF Summarizer & Translator (`pdf-ai`) *(Phase 4)*
*   **Description**: Extract executive bullet summaries, generate action items and deadlines, chat with documents in Q&A mode, or translate into 15+ languages via Gemini & offline NLP.
*   **Sub-tabs**: Executive Summary, Action Items, 15+ Language Translation, Document Q&A.

#### 32. Camera Scan to PDF (`scan-to-pdf`) *(Phase 4)*
*   **Description**: Capture physical paper documents using your camera or webcam with real-time B&W high-contrast document filters, multi-page tray, and PDF-Lib assembly.
*   **Sub-tabs**: Camera Viewfinder, Contrast Document Filter, Multi-Page Queue.

#### 33. PowerPoint to PDF & PDF to PPTX (`pptx-pdf`) *(Phase 5)*
*   **Description**: Convert OpenXML PowerPoint presentations into landscape PDFs or reverse-convert PDF pages into native editable Microsoft PowerPoint slides via PptxGenJS.
*   **Sub-tabs**: PowerPoint to PDF, PDF to PowerPoint (.pptx).

#### 34. Compare PDF Documents (`compare-pdf`) *(Phase 5)*
*   **Description**: Compare two revisions of a PDF side-by-side with synchronized scrolling, pixel difference heatmap overlay, wipe slider, or text clause diffing.
*   **Sub-tabs**: Visual Diff (Side-by-Side, Heatmap, Wipe Slider), Text & Clause Diff.

#### 35. Annotate & Draw on PDF (`pdf-annotate`) *(Phase 5)*
*   **Description**: Markup and illustrate PDF documents directly with freehand pen, highlighter, custom typography stamps, boxes, and arrows with vector burning.
*   **Sub-tabs**: Freehand Pen, Highlighter, Text Stamp, Rectangles, Arrow Pointers, Vector Burn.

#### 36. Universal Audio Transcoder (`audio-converter`) *(Phase 5)*
*   **Description**: Convert sound files between MP3, WAV, and OGG formats with customizable bitrates (128k-320k), stereo/mono downmix, and 200% volume amplification.
*   **Sub-tabs**: MP3 Transcoder (Lamejs), Studio WAV (PCM), Volume Gain Modulation.

#### 37. PDF Repair & Stream Recovery (`repair-pdf`) *(Phase 5)*
*   **Description**: Inspect damaged PDF files, strip shifted header offsets, append missing EOF markers, reconstruct broken xref tables, and salvage readable pages.
*   **Sub-tabs**: Binary Diagnostics Console, Header Realignment, Xref Rebuild, Permissive Stream Salvage.

#### 38. PDF to PDF/A Archival Converter (`pdf-to-pdfa`) *(Phase 5)*
*   **Description**: Convert documents to ISO 19005 standards (PDF/A-1b, PDF/A-2b, PDF/A-3b) for long-term legal preservation with sRGB OutputIntents and XMP metadata.
*   **Sub-tabs**: ISO Profile Selector, sRGB Color Intent, XMP Conformance Packet.

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

#### 20b. Browser Screen & Window Screenshot Studio (`screenshot-capture`)
*   **Description**: Capture full desktop, windows, or tabs with 3s-10s countdown delay, wrap in macOS/Windows 11 glass frames, pixelate confidential passwords, add step badges, and copy to clipboard in 1 click.
*   **Guide Page**: [graphics-studio.html](file:///f:/Tools%20website/guides/graphics-studio.html)
*   **Hash Routes**: `#tool/screenshot-capture`, `#tool/browser-capture`, `#tool/screenshot`

#### 21. Image Optimizer & Converter (`image-converter`)
*   **Description**: Adjust dimensions, manage quality ratios, and convert image formats (WebP, PNG, JPEG) client-side.
*   **Guide Page**: [image-converter.html](file:///f:/Tools%20website/guides/image-converter.html)

#### 22. SVG Animation Studio (`svg-animator`)
*   **Description**: Import SVG vectors, visualize paths, apply motion keyframe presets (self-drawing, neon pulse, spin), and export animated SVGs.
*   **Guide Page**: [svg-animator.html](file:///f:/Tools%20website/guides/svg-animator.html)

#### 23. Image Color Palette Extractor (`color-extractor`)
*   **Description**: Extract dominant color palettes, test WCAG contrast, and inspect pixels with a zoom eyedropper loupe.
*   **Sub-tabs**: Dominant Palette, Zoom Eyedropper, Contrast Checker, CSS/Tailwind Exports.

#### 24. Favicon & App Icon Suite (`favicon-generator`)
*   **Description**: Generate complete multi-resolution .ico (16/32), iOS Apple Touch, Android PWA icons, and HTML meta tags.
*   **Sub-tabs**: Icon Generator, Tab & Device Previews, ZIP Archive Download.

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

## 🔐 Admin Control Panel & Cryptographic Security

OmniTool Hub incorporates an enterprise-grade security architecture:
- **Serverless API Authentication**: Admin panel protected by IP rate limiting, SHA-256 password hashing, and signed session tokens.
- **Cryptographic License Verification**: License tokens are signed with HMAC-SHA256 master secrets that reject forged or tampered `localStorage` entries.
- **Automated Razorpay Checkout**: Real-time payment verification with HMAC-SHA256 signature validation.
- **Gumroad License Verification**: Real-time license verification against Gumroad's official API (`/api/verify-license`).

*   **Local Admin Access URL**: [http://127.0.0.1:8000/#admin](http://127.0.0.1:8000/#admin) (works directly on local development server)
*   **Hostinger / Live Site Stealth Admin Access**:
    *   **Method 1 (Secret URL)**: `https://yourdomain.com/#admin?key=omni2026` (or `#omni-admin`)
    *   **Method 2 (Keyboard Shortcut)**: Press `Ctrl + Shift + Alt + A` anywhere on the site.
    *   **Method 3 (Stealth Click)**: Click the footer copyright / version text 5 times quickly.
    *   *Note: For all regular public visitors, the Admin Panel is 100% invisible and inaccessible.*
*   **Default Master Passcode**: `OmniAdmin@2026#` (Protected by brute-force lockout after 5 failed attempts)
*   **Cryptographic License Key Generator**: Generate signed keys (`OMNI-PRO-...` / `OMNI-MON-...`) inside `#admin` &rarr; Monetization Tiers.

### Available Configurations in Admin Panel:
1.  **Payment Gateways & Payee Information**:
    *   **Automated Razorpay Integration**: Direct in-app checkout with automated instant verification for cards, NetBanking, and UPI apps.
    *   **UPI ID (VPA)**: Set your payee UPI address (default: `ravik0892@okaxis`).
    *   **Direct Bank Transfer**: Configure your Bank Name, Beneficiary Name, Account Number, and IFSC code for direct IMPS/NEFT transfers.
    *   **Gumroad / PayPal / Ko-fi**: Link your checkout and donation pages.
    *   **Crypto Wallets**: Set deposit addresses for USDT (TRC-20), Bitcoin (BTC), and Ethereum (ETH).
2.  **Monetization & Advertisements**:
    *   Toggle global ads on/off.
    *   Configure Google AdSense Client ID & Slot IDs or AdMob Smart Banners.
    *   Set custom Sponsor brand names, slogans, and affiliate links with per-tool overrides.
3.  **Tool Visibility & Monetization Tiers (On / Off Control)**:
    *   **1-Click On / Off Visibility**: Under `👁️ Tool Visibility`, toggle any individual tool (including all new Phase 1 additions) on or off to hide/show from the main dashboard, command palette, and sidebar menus.
    *   **Tier Customization**: Under `🔒 Monetization Tiers`, set any tool to Free, Ad-Locked (watch video to unlock), or Pro Premium.
4.  **Security & System**:
    *   Generate authentic signed license keys for manual customer orders.
    *   Export configurations to [ad-config.json](file:///f:/Tools%20website/ad-config.json) safely without sensitive secret exposure.

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

---

## 🗺️ Expansion & Feature Parity Plan
For the complete 65-tool competitive gap analysis against [omnitools-hub.vercel.app](https://omnitools-hub.vercel.app/) and our 4-phase technical implementation roadmap for adding all 34 missing tools, see [EXPANSION_PLAN.md](file:///f:/Tools%20website/EXPANSION_PLAN.md).

