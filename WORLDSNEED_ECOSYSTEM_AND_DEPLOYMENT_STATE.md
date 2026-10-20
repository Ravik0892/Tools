# 🌐 WorldsNeed & OmniTool Hub — Ecosystem Architecture & Applied State

> **Purpose of this document:**  
> This file acts as the single source of truth for both human developers and future AI assistants. It records the complete architecture, deployed subdomains, applied routing fixes, Cloudflare monorepo settings, and search console configuration for the **`worldsneed.com`** brand.

---

## 🏛️ 1. Multi-Platform Ecosystem Topology

All websites and services are unified under the single parent domain **`worldsneed.com`** using Cloudflare DNS and Cloudflare Pages:

```text
                                  ┌────────────────────────────────────────┐
                                  │       Cloudflare DNS Controller        │
                                  │            (worldsneed.com)            │
                                  └───────────────────┬────────────────────┘
                                                      │
         ┌────────────────────────────────────────────┼────────────────────────────────────────────┐
         │                                            │                                            │
         ▼                                            ▼                                            ▼
┌───────────────────────────────┐            ┌───────────────────────────────┐            ┌───────────────────────────────┐
│     Cloudflare Pages (#1)     │            │     Cloudflare Pages (#2)     │            │         Vercel Cloud          │
│       worldsneed.com          │            │   omnitool.worldsneed.com     │            │   dictionary.worldsneed.com   │
├───────────────────────────────┤            ├───────────────────────────────┤            ├───────────────────────────────┤
│ Source Folder:                │            │ Source Folder:                │            │ Project:                      │
│ /worldsneed-landing-page      │            │ / (Repository Root)           │            │ WordsNeed Dictionary (Next.js)│
│                               │            │                               │            │                               │
│ Purpose:                      │            │ Purpose:                      │            │ Purpose:                      │
│ Main Brand Hub, Showcase of   │            │ 50+ Client-Side Developer &   │            │ Multilingual Word Explorer,   │
│ Live & Future Projects        │            │ Privacy Tools, PDF Studio     │            │ Grammar & Curriculum Hub      │
└───────────────────────────────┘            └───────────────────────────────┘            └───────────────────────────────┘
```

---

## 📦 2. Monorepo & Cloudflare Deployment Configuration

A single GitHub repository (**`https://github.com/Ravik0892/Tools`**) powers multiple independent Cloudflare Pages projects using Cloudflare's **"Root directory"** feature:

### Project 1: Main Brand Portal (`worldsneed.com`)
* **Project Name in Cloudflare:** `worldsneed-portal` (or `worldsneed-home`)
* **Repository:** `Ravik0892/Tools`
* **Production Branch:** `main`
* **Framework Preset:** `None`
* **Build Command:** *(empty)*
* **Build Output Directory:** *(empty)*
* **Root Directory (Advanced):**
  ```text
  worldsneed-landing-page
  ```
* **Custom Domains Assigned:** `worldsneed.com`, `www.worldsneed.com`
* **Files inside `worldsneed-landing-page/`:**
  * `index.html` (Semantic HTML5, ambient aurora, interactive showcase, timeline, Schema.org)
  * `styles.css` (Glassmorphism design system, dark palette `#070c18`, responsive grid)
  * `script.js` (Canvas star particle system, category filter tabs, 3D card tilt)
  * `_redirects` & `_headers` (Cloudflare Pages SPA routing & security headers)

### Project 2: OmniTool Hub (`omnitool.worldsneed.com`)
* **Project Name in Cloudflare:** `omnitool-hub`
* **Repository:** `Ravik0892/Tools`
* **Production Branch:** `main`
* **Framework Preset:** `None`
* **Build Command:** *(empty)*
* **Build Output Directory:** `/` (or empty)
* **Root Directory (Advanced):** `/` (Repository Root)
* **Custom Domain Assigned:** `omnitool.worldsneed.com`

---

## 🛠️ 3. Critical Routing & SPA Fixes Applied

To eliminate **HTTP 404 on page refresh** and ensure maximum Google Search ranking for clean URLs (`/tool/:toolId` without `#`):

1. **Local Server SPA Fix (`scripts/local-server.py`):**
   * *Problem:* SPA rewrite was mistakenly placed in `do_OPTIONS`. GET requests threw `404 File Not Found` on refresh.
   * *Fix:* Implemented `do_GET` override so all non-file paths (`/tool/*`, `/category/*`, etc.) automatically serve `/index.html` with HTTP 200.

2. **Protocol-Aware `<base href="/">` (`index.html`):**
   * *Problem:* Deep paths like `/tool/word-counter` resolved relative scripts (`style.css`, `app.js`) from `/tool/style.css`, breaking styles.
   * *Fix:* Injected conditional `<base href="/">` only when `window.location.protocol.startsWith('http')`.
   * *Preservation:* `file:///` protocol (used by Android APK in `omnitool-android-app`) is untouched, preventing broken assets in the mobile app.

3. **Clean URL Preservation in Router (`app.js`):**
   * Direct visits to `/tool/:toolId` keep the clean URL intact without reverting to `/#tool/:toolId`.
   * Hash URLs (`#tool/:toolId`) are upgraded to clean paths via `window.history.replaceState`.
   * Returning to the dashboard resets the URL cleanly to `/`.

4. **Dynamic SEO Tags for Google Search (`app.js`):**
   * Every tool load dynamically updates `document.title`, `<meta name="description">`, `<link rel="canonical">`, and Open Graph tags.
   * Returning to dashboard restores the default site meta tags.

5. **Cloudflare SPA Routing Rules (`_redirects` & `_headers`):**
   * Created in both repository root `/` and `/worldsneed-landing-page/` to ensure Cloudflare Pages routes all clean subpaths to `/index.html` without 404s.

6. **Expanded XML Sitemap (`sitemap.xml`):**
   * Added direct clean `/tool/:toolId` URLs for all 50+ tools and aliases so search crawlers can index every tool individually.

---

## 🔍 4. Search Engine Optimization & Webmaster Setup

### A. Google Search Console (GSC)
* **Property Type:** **Domain Property** (`worldsneed.com`)
* **Why Domain Property:** Automatically covers `worldsneed.com`, `www.worldsneed.com`, `omnitool.worldsneed.com`, `dictionary.worldsneed.com`, and all future subdomains under one account.
* **Verification:** Cloudflare DNS ➔ Add `TXT` record with Name `@` and Value `google-site-verification=...`.
* **Sitemaps Submitted:**
  * `https://omnitool.worldsneed.com/sitemap.xml`
  * `https://dictionary.worldsneed.com/sitemap.xml`

### B. Bing Webmaster Tools — Removing Old Vercel Links
When importing from Google Search Console into Bing Webmaster Tools, old `.vercel.app` URLs may appear:
1. **Removing the Vercel Site Property from Bing Dashboard:**
   * In [Bing Webmaster Tools](https://www.bing.com/webmasters/), click the **Site selector** dropdown at the top-left.
   * Click the settings gear ⚙️ or three dots `...` next to `omnitool-hub.vercel.app`.
   * Select **"Delete site"** / **"Remove site"**.
2. **De-indexing Vercel URLs from Bing Search:**
   * In Bing Webmaster Tools, navigate to **Configuration** ➔ **Block URLs**.
   * Add a block rule for directory `https://omnitool-hub.vercel.app/` so Bing drops it in favor of `omnitool.worldsneed.com`.
3. **Canonical Authority:**
   * Canonical tags on all pages point to `https://omnitool.worldsneed.com/...`, instructing search engines to transfer all search authority to the custom domain.

---

## 🌿 5. Git Branching & Synchronization Workflow

* **Working Branch:** `dev` (all active development happens here).
* **Production Branch:** `main` (Cloudflare Pages automatically triggers builds when `main` receives commits).
* **Sync Pattern:**
  ```powershell
  # 1. Commit and push to dev
  git add .
  git commit -m "feat: description of work"
  git push origin dev

  # 2. Merge into main and push
  git checkout main
  git merge dev -m "merge: sync dev into main"
  git push origin main

  # 3. Return to dev for further work
  git checkout dev
  ```

---

*Last Updated: October 2026*  
*Repository: Ravik0892/Tools*
