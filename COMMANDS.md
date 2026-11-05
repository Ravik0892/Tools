# OmniTool Hub - Development & Server Commands

This file lists the commands and batch scripts available to run, build, and maintain the **OmniTool Hub** website project locally.

---

## 1. Local Development Servers

> [!IMPORTANT]
> **Why is a local server required?**
> Modern web browsers (Google Chrome, Microsoft Edge, Brave, etc.) enforce strict CORS security policies. Opening `index.html` directly via `file:///` causes the browser to block JavaScript ES Module imports (`import()`), Web Workers, and PWA Service Workers with the error:
> *"Failed to resolve module specifier... The base URL is about:blank because import() is called from a CORS-cross-origin script."*
> Always run via a local server (or our 1-click launcher) so all 50+ offline tools load instantly.

### A. 1-Click Launcher for Windows (Fastest)
Simply double-click:
*   [START_SERVER.bat](file:///f:/Tools%20website/START_SERVER.bat) in the project root directory.

It will automatically check for Node.js (or Python), launch the server on port `8000`, and open [http://127.0.0.1:8000](http://127.0.0.1:8000) directly in your browser.

### B. Node.js Local Server (Recommended via CLI)
This runs the built-in lightweight local static server on port `8000`:
```bash
# Install dependencies (if needed)
npm install

# Start the Node development server
npm run dev
```
Once started, open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.

### C. Python Server (Full API & SPA Support)
If you prefer Python over Node.js, run our custom Python server which includes built-in SPA routing (preventing 404s on page refresh) and all `/api/*` serverless endpoints:
```bash
# Recommended: Full API, POST support, and SPA route fallback (no 404s on refresh)
python scripts/local-server.py 8000

# Basic server: Note that python -m http.server does not support SPA rewrites, so refreshing on /tool/* will return 404
python -m http.server 8000
```
Once started, open [ http://127.0.0.1:8000 ]( http://127.0.0.1:8000 ) in your browser.

---

## 2. Documentation & Guide Generation

When you make changes to tool metadata (like descriptions, tabs, badges, or steps), you need to regenerate the static guides in both the main web folder and the Android assets folder.

### A. Node.js Generator (Recommended)
```bash
npm run generate-guides
```
*(This executes `node scripts/generate-guides.mjs`)*

### B. PowerShell Generator (Alternative)
```powershell
powershell -File scripts/generate-guides.ps1
```

---

## 3. Git Operations & Sync Automation

The repository contains scripts to automate git saving and deployment.

### A. Git Auto-Backup Sync Daemon
Runs a background loop that checks for local modifications every 15 seconds, commits them, and pushes them to the active branch on GitHub:
*   Double-click [scripts/start_auto_sync.bat](file:///f:/Tools%20website/scripts/start_auto_sync.bat) OR run:
```powershell
powershell -File scripts/auto_sync.ps1
```

### B. Committing, Merging, and Deploying
Commits local changes on `dev`, pushes them, checkouts `main`, merges `dev` into `main`, and pushes to GitHub:
*   Double-click [scripts/merge-to-main.bat](file:///f:/Tools%20website/scripts/merge-to-main.bat) OR run in cmd:
```cmd
scripts\merge-to-main.bat
```

### C. Direct Remote Push
Instantly pushes local commits to the current branch:
*   Double-click [scripts/push_to_github.bat](file:///f:/Tools%20website/scripts/push_to_github.bat) OR run in cmd:
```cmd
scripts\push_to_github.bat
```

---

## 4. Security Architecture & Administrative Access

OmniTool Hub implements an **Advanced Enterprise-Grade Cryptographic Security Architecture**:
- **Automated Payment Gateway:** Real-time Razorpay order creation and HMAC-SHA256 signature verification via `/api/create-razorpay-order` and `/api/verify-razorpay-payment`.
- **Gumroad License Verification:** Live verification via the official Gumroad API (`/api/verify-license`).
- **Cryptographic License Tokens:** Digital tokens signed with HMAC-SHA256 master secrets that prevent client-side manipulation or privilege escalation.
- **Client Anti-Tamper Watchdog:** Automatically detects and revokes unauthorized `localStorage` edits without valid signatures.
- **Rate-Limited Admin Security:** Protected against brute-force attacks with IP rate limiting and SHA-256 password hashing.

### A. Administrative Access Credentials

| Feature | Access URL | Default Master Passcode | Description |
| :--- | :--- | :--- | :--- |
| **Admin Control Panel** | [http://127.0.0.1:8000/#admin](http://127.0.0.1:8000/#admin) | `OmniAdmin@2026#` | Protected by serverless rate-limited auth. Includes built-in Cryptographic License Key Generator. |
| **Cryptographic License Generator** | Inside `#admin` &rarr; Monetization Tiers | Admin Token Required | Issues authentic signed license keys (`OMNI-PRO-...` / `OMNI-MON-...`) for manual payments. |

### B. Production Environment Variables (Vercel)

Set these environment variables in your Vercel Project Dashboard for live production payments:

```env
LICENSE_SECRET_KEY=your_private_cryptographic_secret_minimum_32_chars
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
GUMROAD_PRODUCT_PERMALINK=omnitool-pro
ADMIN_PASSWORD_HASH=efb6854ff3cb28f0f3cc0604b481df3eb4ffe5b765361e6d597f7ac5be6ae3a8
```

> [!NOTE]
> ADMIN_PASSWORD_HASH above is the SHA-256 hash of the default master passcode OmniAdmin@2026#. If you choose a custom passcode in production, compute its SHA-256 hash and place it here.
