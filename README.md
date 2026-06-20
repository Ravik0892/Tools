python -m http.server 8000

http://localhost:8000/
http://127.0.0.1:8000/



git checkout dev

feat: add category landing pages, sponsor banners, coffee widget, and SVG & SEO tool overrides


Note: If you want to keep using http-server, run it with the -p 8000 flag to match your existing browser tabs:

powershell
npx http-server -p 8000

But Python is simpler — no install, no deprecation warnings, same result.


powershell
python -m http.server 8000


# OmniTool Hub v2 (Masterpiece Edition) - Complete Project Manual

OmniTool Hub is a premium, privacy-focused, 100% client-side web utility hub containing 16 powerful developer and utility tools. By executing calculations directly inside the user's browser, the application runs with absolute privacy, zero latency, and $0 hosting or API costs.

---

## 🌟 Masterpiece Innovation Features

### 1. "Smart Chain" Pipeline Builder
*   **What it does**: Allows users to stack multiple tools in a sequential chain.
*   **How it works**: The output of the top block automatically becomes the input for the next block down. For example:
    `Input Text` ➔ `Base64 Decode` ➔ `JSON Format` ➔ `Convert to uppercase`.
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

## 🛠️ Complete Tools Reference Catalog

### Developer Tools

#### 1. JSON Formatter & Validator
*   **What it does**: Beautifies unformatted JSON payload strings with custom indentation or minifies them.
*   **How it works**: Uses browser `JSON.parse` for validations. Detailed syntax errors with exact line locations are caught and rendered in a status alert banner.

#### 2. Base64 Encoder & Decoder
*   **What it does**: Encodes plain text strings to Base64 values and decodes them.
*   **How it works**: Employs `btoa` and `atob` with custom `TextEncoder`/`TextDecoder` wrappers to support full Unicode (non-ASCII) characters.

#### 3. JWT Decoder
*   **What it does**: Parses JSON Web Tokens to extract claims and metadata.
*   **How it works**: Splits token by `.` delimiter, translates base64url padding, parses the header and payload objects, and checks claims like expiration (`exp`) against system clocks.

#### 4. Hash Generator
*   **What it does**: Generates cryptographic checksums (MD5, SHA-1, SHA-256, SHA-512) for any string.
*   **How it works**: Integrates a lightweight, custom MD5 JS library and utilizes the browser's built-in Web Crypto API (`crypto.subtle.digest`) for secure SHA checksum generation.

#### 5. URL Encoder & Decoder
*   **What it does**: Converts query string strings into RFC 3986 URL safe characters.
*   **How it works**: Executes JavaScript native `encodeURIComponent` and `decodeURIComponent` wrappers.

#### 6. UUID v4 Generator
*   **What it does**: Bulk-generates cryptographically secure random UUIDs.
*   **How it works**: Uses the secure random number api (`crypto.getRandomValues`) to ensure proper RFC 4122 v4 configurations.

---

### Text & Writing Utilities

#### 7. Text Case Converter & Word Counter
*   **What it does**: Converts text cases and displays live stats (words, lines, reading speed).
*   **How it works**: Uses regex conversions to convert string variables to camelCase, snake_case, kebab-case, Title Case, UPPERCASE, and lowercase.

#### 8. Live Markdown Previewer
*   **What it does**: Formats markdown elements (headings, bold, lists, blockquotes, code blocks) in real-time.
*   **How it works**: A custom, lightweight regex parser converts Markdown formatting rules into standard semantic HTML templates.

#### 9. Text Diff Comparison
*   **What it does**: Compares two blocks of text and highlights visual changes.
*   **How it works**: Employs a line-by-line comparison algorithm, rendering deletions as `.diff-removed` (red highlights) and additions as `.diff-added` (green highlights).

#### 10. Visual Regex Tester
*   **What it does**: Tests regular expressions against string inputs and highlights matches.
*   **How it works**: Dynamically constructs `new RegExp` objects, uses `matchAll` to capture index values, and wraps matched text segments with highlight `<mark>` tags.

---

### Design & Color Tools

#### 11. CSS Gradient Creator
*   **What it does**: Visually creates linear/radial gradients, stop values, angles, and outputs CSS code.
*   **How it works**: Math formulas update backdrops dynamically and output copyable CSS styling properties.

#### 12. Color Palette & Contrast Checker
*   **What it does**: Generates color schemes and checks accessibility contrast ratios.
*   **How it works**: Calculates sRGB relative luminance values under the WCAG standard. Output ratios determine Pass/Fail levels for standard (AA/AAA) and large text.

---

### Math & Crypto Suite

#### 13. Secure Password Generator
*   **What it does**: Generates secure passwords with customizable character set conditions.
*   **How it works**: Maps selected character dictionaries to values generated by secure random numbers. Computes entropy using the formula: $E = L \times \log_2(C)$ where $L$ is length and $C$ is character set size.

#### 14. Epoch Timestamp Converter
*   **What it does**: Converts unix timestamps (seconds/milliseconds) to human-readable datetime formats.
*   **How it works**: Multiplies 10-digit second timestamps to milliseconds and formats values using UTC and local date APIs.

#### 15. Unit Converter
*   **What it does**: Converts bytes, length, weights, and temperatures.
*   **How it works**: Employs linear scaling factor multipliers and temperature offset formulas.

---

## 📈 Monetization & Ad Placements

To make this site profitable, you can add ad spaces using network networks like Google AdSense.

### Where to Place Ad Codes
Open **[index.html](file:///f:/Tools%20website/index.html)** and paste ad units in these 3 optimized locations:
1.  **Sidebar Ad Widget**: Below the "Recent Tools" list in `<aside class="sidebar">`. Great for standard vertical skyscraper ads.
2.  **Dashboard Top Banner**: Below the hero section in `<div id="dashboard-view">`. High visibility banner area.
3.  **Tool Panels Footer**: Inside `<section class="content-area">` placed as a bottom container. Displays ads beneath active tools.

### Example AdSense Integration Code:
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

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
