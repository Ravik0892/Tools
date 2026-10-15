# OmniTool Hub - Development & Server Commands

This file lists the commands and batch scripts available to run, build, and maintain the **OmniTool Hub** website project locally.

---

## 1. Local Development Servers

> [!IMPORTANT]
> **Why is a local server required?**
> Modern web browsers (Google Chrome, Microsoft Edge, Brave, etc.) enforce strict CORS security policies. Opening `index.html` directly via `file:///` causes the browser to block JavaScript ES Module imports (`import()`), Web Workers, and PWA Service Workers with the error:
> *"Failed to resolve module specifier... The base URL is about:blank because import() is called from a CORS-cross-origin script."*
> Always run via a local server (or our 1-click launcher) so all 26+ offline tools load instantly.

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

### C. Python Static Server (Alternative)
If you don't have Node.js installed, you can spin up a static server instantly using Python on port `8000`:
```bash
# For Python 3.x
python -m http.server 8000
```
Once started, open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.

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

## 4. Admin Access & Master Credentials

| Feature | Access URL | Master Passcode | Description |
| :--- | :--- | :--- | :--- |
| **Admin Control Panel** | [http://127.0.0.1:8000/#admin](http://127.0.0.1:8000/#admin) | `admin123` | Accessible on local server. Configures ads, bank details, UPI ID, and crypto wallets. |
| **Instant PRO Lifetime Unlock** | [http://127.0.0.1:8000/#plans](http://127.0.0.1:8000/#plans) | `admin123` | Enter master passcode into the license/activation field to instantly unlock Lifetime PRO access. |

