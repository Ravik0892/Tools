# OmniTool Hub - Development & Server Commands

This file lists the commands and batch scripts available to run, build, and maintain the **OmniTool Hub** website project locally.

---

## 1. Local Development Servers

### A. Node.js Local Server (Recommended)
This runs the built-in lightweight local static server on port `8000`:
```bash
# Install dependencies (if needed)
npm install

# Start the Node development server
npm run dev
```
Once started, open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser.

### B. Python Static Server (Alternative)
If you don't have Node.js installed, you can spin up a static server instantly using Python on port `8083`:
```bash
# For Python 3.x
python -m http.server 8083
http://localhost:8083
```
Once started, open [http://127.0.0.1:8083](http://127.0.0.1:8083) in your browser.

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
