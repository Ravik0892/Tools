// Service Worker for OmniTool Hub PWA (Network-First Core for Instant Updates)
const CACHE_NAME = "omnitool-v88";
const ASSETS_TO_CACHE = [
  "./",
  "index.html",
  "landing.html",
  "style.css",
  "app.js",
  "ga-guard.js",
  "favicon.ico",
  "manifest.json",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon.svg",
  "tools/admin-settings.js",
  "tools/aes-crypto.js",
  "tools/audio-converter.js",
  "tools/audio-suite.js",
  "tools/base64.js",
  "tools/box-shadow.js",
  "tools/calculator.js",
  "tools/code-playground.js",
  "tools/color-extractor.js",
  "tools/color-lab.js",
  "tools/color-palette.js",
  "tools/color-shades.js",
  "tools/compare-pdf.js",
  "tools/cron-builder.js",
  "tools/crop-pdf.js",
  "tools/crypto-suite.js",
  "tools/css-studio.js",
  "tools/curl-converter.js",
  "tools/date-calculator.js",
  "tools/datetime-suite.js",
  "tools/epoch-converter.js",
  "tools/excel-pdf.js",
  "tools/fancy-font-generator.js",
  "tools/favicon-generator.js",
  "tools/finance-calculator.js",
  "tools/formatter-suite.js",
  "tools/glassmorphism-generator.js",
  "tools/gradient-generator.js",
  "tools/graphics-studio.js",
  "tools/hash-generator.js",
  "tools/html-to-pdf.js",
  "tools/image-converter.js",
  "tools/images-to-pdf.js",
  "tools/ip-subnet-calculator.js",
  "tools/json-formatter.js",
  "tools/json-to-types.js",
  "tools/json-yaml-csv.js",
  "tools/jwt-decoder.js",
  "tools/lorem-generator.js",
  "tools/markdown-preview.js",
  "tools/mock-data-generator.js",
  "tools/mp4-to-mp3.js",
  "tools/password-generator.js",
  "tools/pdf-ai.js",
  "tools/pdf-annotate.js",
  "tools/pdf-converter-hub.js",
  "tools/pdf-editor-suite.js",
  "tools/pdf-forms.js",
  "tools/pdf-organizer.js",
  "tools/pdf-searcher.js",
  "tools/pdf-security-suite.js",
  "tools/pdf-security.js",
  "tools/pdf-to-markdown.js",
  "tools/pdf-to-pdfa.js",
  "tools/pdf-utilities.js",
  "tools/pdf-watermark.js",
  "tools/pii-anonymizer.js",
  "tools/pipeline-builder.js",
  "tools/pptx-pdf.js",
  "tools/qr-generator.js",
  "tools/qr-scanner.js",
  "tools/qr-studio.js",
  "tools/redact-pdf.js",
  "tools/repair-pdf.js",
  "tools/robots-generator.js",
  "tools/rsa-generator.js",
  "tools/scan-to-pdf.js",
  "tools/screen-recorder.js",
  "tools/screenshot-capture.js",
  "tools/security-suite.js",
  "tools/seo-previewer.js",
  "tools/sign-pdf.js",
  "tools/sql-beautifier.js",
  "tools/svg-animator.js",
  "tools/temp-mail.js",
  "tools/text-analyzer.js",
  "tools/text-converter.js",
  "tools/text-diff.js",
  "tools/text-encoder-suite.js",
  "tools/unit-converter.js",
  "tools/url-encoder.js",
  "tools/url-parser.js",
  "tools/utils.js",
  "tools/uuid-generator.js",
  "tools/video-speed.js",
  "tools/video-to-gif.js",
  "tools/voice-recorder.js",
  "tools/word-pdf.js"
];

// Install Event - Pre-cache core shell assets and immediately take over
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log(`[Service Worker] Caching App Shell ${CACHE_NAME}`);
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up any old caches and immediately claim clients
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Removing Old Cache", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Developer Privacy State for Google Analytics blocking
let gaTrackingBlocked = false;

// Message listener for manual cache purge, skipWaiting, and developer privacy mode
self.addEventListener("message", (e) => {
  if (e.data && e.data.action === "skipWaiting") {
    self.skipWaiting();
  }
  if (e.data && e.data.action === "clearCache") {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
  if (e.data && e.data.action === "setAnalyticsBlocked") {
    gaTrackingBlocked = Boolean(e.data.blocked);
  }
});

// Fetch Event:
// Network-First for HTML, JS, CSS, JSON & Tools to guarantee instant delivery of new code/styles.
// Falls back to cache seamlessly when offline.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const url = new URL(e.request.url);

  // Developer Privacy Guard: drop telemetry for opted-out developer devices, localhost, or LAN
  const isAnalyticsHost = url.hostname.includes("google-analytics.com") ||
                          url.hostname.includes("googletagmanager.com") ||
                          url.hostname.includes("cloudflareinsights.com");

  if (isAnalyticsHost && (gaTrackingBlocked || url.search.includes("no_track=1") || url.search.includes("optout=1"))) {
    e.respondWith(new Response("", { status: 200, statusText: "OK", headers: { "Content-Type": "text/plain" } }));
    return;
  }

  const isLocal = url.origin === self.location.origin;
  const isCachableExternal = e.request.url.includes("fonts.googleapis.com") ||
    e.request.url.includes("fonts.gstatic.com") ||
    e.request.url.includes("cdnjs.cloudflare.com");

  if (!isLocal && !isCachableExternal) return;

  // Network-First for JS files, CSS stylesheets, JSON configs, and HTML documents to guarantee instant updates
  const isCodeOrDoc = isLocal && (
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".json") ||
    url.pathname.endsWith(".html") ||
    url.pathname.endsWith("/") ||
    url.pathname.includes("/tools/") ||
    url.pathname.startsWith("/guides") ||
    url.pathname === "/landing" ||
    url.pathname === "/welcome" ||
    url.pathname === "/showcase"
  );

  if (isCodeOrDoc) {
    e.respondWith(
      fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        }
        return networkResponse;
      }).catch(async () => {
        if (url.pathname === "/landing" || url.pathname === "/welcome" || url.pathname === "/showcase") {
          return caches.match("landing.html");
        }
        const cached = await caches.match(e.request);
        if (cached) return cached;
        if (url.pathname.startsWith("/guides")) {
          const stripped = url.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
          const cleanHtml = await caches.match(stripped + ".html");
          if (cleanHtml) return cleanHtml;
          const dirIndex = await caches.match(stripped + "/index.html");
          if (dirIndex) return dirIndex;
        }
        return cached;
      })
    );
    return;
  }

  // Static Media / Fonts: Cache-First with Network Fallback
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && (isCachableExternal || isLocal)) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      if (e.request.mode === "navigate") {
        if (url.pathname === "/landing" || url.pathname === "/welcome" || url.pathname === "/showcase") {
          return caches.match("landing.html");
        }
        return caches.match("index.html");
      }
    })
  );
});
