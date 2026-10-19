# Cloudflare Pages & Google Search Console Migration Guide

> **Important Note on Safety:**  
> **Nothing was removed or deleted.** All original tools, files, Vercel configs, API functions, and Android bundles remain 100% intact. Vercel is set up to automatically 301 redirect all visitors and search bots to your new official custom domain (`https://omnitool.worldsneed.com/`).

---

## 1. Domain Architecture Overview

```
                      +---------------------------------------+
                      |       User / Googlebot Visits         |
                      +---------------------------------------+
                                          |
                   -------------------------------------------------
                  |                                                 |
                  v                                                 v
  https://omnitool-hub.vercel.app/                  https://omnitool.worldsneed.com/
        (Old Vercel Domain)                           (Official Primary Domain)
                  |                                                 |
       +-----------------------+                         +----------------------+
       | Vercel 301 Permanent  |                         |   Cloudflare Pages   |
       | Redirect (vercel.json)|                         |     (Edge CDN)       |
       +-----------------------+                         +----------------------+
                  |                                                 |
                  |=========> Automatically forwards to ============>|
                                                                    |
                                                     +-------------------------------+
                                                     |  • Fast Global Edge Caching   |
                                                     |  • DDOS / Bot Protection      |
                                                     |  • SPA Routing (_redirects)   |
                                                     |  • Security Headers (_headers)|
                                                     +-------------------------------+
```

* **Official Primary Domain:** `https://omnitool.worldsneed.com/` (Hosted on Cloudflare Pages)
* **Preserved Mirror / Redirection:** `https://omnitool-hub.vercel.app/` (Forwards all traffic to your custom domain, keeping `/api/*` serverless functions accessible)

---

## 2. Google Search Console Migration (Step-by-Step)

Do **not** delete the old property in Google Search Console. Follow these 4 steps to transfer your indexing and ranking to your new custom domain:

### Step 1: Add the New Property
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click the top-left property dropdown > **+ Add Property**.
3. Select **URL prefix** and enter:
   ```text
   https://omnitool.worldsneed.com/
   ```
4. Click **Continue**.

### Step 2: Verify Domain Ownership
You can verify instantly using either of these two methods:
* **Option A (Recommended via Cloudflare DNS):**
  1. GSC will give you a **TXT record** (e.g. `google-site-verification=...`).
  2. In your Cloudflare Dashboard, go to **DNS** > **Records** > **Add Record**.
  3. Type: `TXT`, Name: `@` (or `omnitool`), Content: paste the verification string.
  4. Click **Save** in Cloudflare, then click **Verify** in Search Console.
* **Option B (HTML Tag):**
  1. The Google Site Verification meta tag (`BVvuzzw4uiKQl1IbZ3c6dcBsHZo__C0VxV-8mxgne_0`) is already included in your `index.html`.
  2. Click **Verify** under the HTML tag section.

### Step 3: Submit Your New Sitemap
1. Inside your new property (`https://omnitool.worldsneed.com/`), click **Sitemaps** in the left sidebar.
2. Under "Add a new sitemap", type:
   ```text
   sitemap.xml
   ```
3. Click **Submit**.
4. Status should change to **"Success"**. Google will crawl all 86+ tool pages and 28 guide pages with your new domain URLs.

### Step 4: Use the "Change of Address" Tool
1. In the property dropdown, switch to your old property (`https://omnitool-hub.vercel.app`).
2. Go to **Settings** (bottom left) > **Change of address**.
3. Under "Select your new site", pick `https://omnitool.worldsneed.com/`.
4. Click **Validate & Update**.
5. Google will test that the 301 redirect is active and begin transferring your search ranking equity to your custom domain.

---

## 3. Cloudflare Dashboard Settings Best Practices

To ensure maximum performance, security, and uptime on `omnitool.worldsneed.com`, verify these settings in your Cloudflare dashboard:

### 1. SSL/TLS Encryption
* Go to **SSL/TLS** > **Overview**.
* Mode: **Full (strict)**.
* Go to **SSL/TLS** > **Edge Certificates**:
  * Enable **Always Use HTTPS** (On).
  * Enable **Automatic HTTPS Rewrites** (On).
  * Minimum TLS Version: **TLS 1.2**.

### 2. DNS Configuration
* Ensure your DNS record for the subdomain is set to:
  * **Type:** `CNAME`
  * **Name:** `omnitool`
  * **Target:** `<your-project-name>.pages.dev`
  * **Proxy status:** **Proxied (Orange Cloud)**.

### 3. Caching & Instant Purging
* When deploying new updates, Cloudflare edges cache assets for speed.
* If you ever make an update and want users to see it immediately without waiting:
  1. Go to **Caching** > **Configuration**.
  2. Click **Purge Everything**.
* Note: OmniTool Hub's `_headers` file already specifies `Cache-Control: public, max-age=0, must-revalidate` for `app.js`, `style.css`, and `sw.js` so browsers always fetch the freshest code.

### 4. Speed & Optimization
* Go to **Speed** > **Optimization**.
* **Brotli Compression:** **On** (Faster loading than standard Gzip).
* **Early Hints:** **On**.

---

## 4. How Cloudflare Pages Special Files Work in this Project

Your workspace includes two official Cloudflare configuration files at the root level:

### 1. `_redirects` (Single Page Application Router)
```text
/tool/*        /index.html    200
/category/*    /index.html    200
/plans         /index.html    200
/payment-guide /index.html    200
/favorites     /index.html    200
/dashboard     /index.html    200
/privacy       /index.html    200
/about         /index.html    200
/contact       /index.html    200
/terms         /index.html    200
```
* **Purpose:** Ensures that if a user visits or refreshes directly on a clean URL like `https://omnitool.worldsneed.com/tool/pdf-utilities` or `/plans`, Cloudflare Pages serves the page with **HTTP 200** instead of returning a 404 error.

### 2. `_headers` (Security & Caching Rules)
```text
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(self), clipboard-read=(self), clipboard-write=(self)

/sw.js
  Cache-Control: public, max-age=0, must-revalidate
  Service-Worker-Allowed: /

/sitemap.xml
  Cache-Control: public, max-age=3600, must-revalidate
```
* **Purpose:** Injects enterprise HTTP security headers on all responses and configures proper cache validation for the PWA Service Worker.

---

## 5. Summary of Files Updated for the Custom Domain

The following files were updated to replace `omnitool-hub.vercel.app` with `https://omnitool.worldsneed.com/`:
1. `index.html`: Canonical tag, OpenGraph URL, and Schema.org Structured Data.
2. `robots.txt`: Sitemap reference points to `https://omnitool.worldsneed.com/sitemap.xml`.
3. `sitemap.xml`: All tool and guide URLs point to `https://omnitool.worldsneed.com/`.
4. `app.js`: Dynamic client-side routing updates canonical and OpenGraph URLs to `https://omnitool.worldsneed.com/tool/:id`.
5. `scripts/generate-guides.mjs`: Guide generator configured with the new domain.
6. `guides/*.html`: All 28 guides and master index canonical tags updated.
7. `vercel.json`: Permanent 301 redirection added from Vercel to `https://omnitool.worldsneed.com/` while keeping `/api/*` endpoints available.
8. `omnitool-android-app/`: Web assets synchronized with the updated root bundle.
