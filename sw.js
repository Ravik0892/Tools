// Service Worker for OmniTool Hub PWA
const CACHE_NAME = "omnitool-v79";
const ASSETS_TO_CACHE = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "favicon.ico",
  "manifest.json",
  "tools/utils.js",
  "tools/pii-anonymizer.js",
  "tools/pipeline-builder.js",
  "tools/pdf-searcher.js",
  "tools/pdf-utilities.js",
  "tools/pdf-ai.js",
  "tools/pdf-converter-hub.js",
  "tools/pdf-editor-suite.js",
  "tools/pdf-security-suite.js",
  "tools/qr-studio.js",
  "tools/audio-suite.js",
  "tools/mock-data-generator.js",
  "tools/jwt-decoder.js",
  "tools/markdown-preview.js",
  "tools/text-diff.js",
  "tools/regex-tester.js",
  "tools/unit-converter.js",
  "tools/graphics-studio.js",
  "tools/calculator.js",
  "tools/image-converter.js",
  "tools/qr-generator.js",
  "tools/seo-previewer.js",
  "tools/svg-animator.js",
  "tools/admin-settings.js",
  "tools/url-parser.js",
  "tools/text-analyzer.js",
  "tools/security-suite.js",
  "tools/crypto-suite.js",
  "tools/text-encoder-suite.js",
  "tools/formatter-suite.js",
  "tools/css-studio.js",
  "tools/color-lab.js",
  "tools/datetime-suite.js",
  "tools/code-playground.js",
  "tools/ip-subnet-calculator.js"
];

// Install Event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching App Shell v74");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event (Cleanup Old Caches immediately)
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

// Message listener for manual cache purge
self.addEventListener("message", (e) => {
  if (e.data && e.data.action === "skipWaiting") {
    self.skipWaiting();
  }
  if (e.data && e.data.action === "clearCache") {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});

// Fetch Event (Network-First for HTML/JS/JSON to ensure zero stale cache, Cache-First for static assets)
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const url = new URL(e.request.url);
  const isLocal = url.origin === self.location.origin;
  const isCachableExternal = e.request.url.includes("fonts.googleapis.com") ||
    e.request.url.includes("fonts.gstatic.com") ||
    e.request.url.includes("icons8.com") ||
    e.request.url.includes("cdnjs.cloudflare.com");

  if (!isLocal && !isCachableExternal) return;

  // Network-First for JS files, JSON configs, and HTML documents to guarantee instant updates
  if (isLocal && (url.pathname.endsWith(".js") || url.pathname.endsWith(".json") || url.pathname.endsWith(".html") || url.pathname.endsWith("/"))) {
    e.respondWith(
      fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const resClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        }
        return networkResponse;
      }).catch(() => caches.match(e.request))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(e.request).then((networkResponse) => {
        if (isCachableExternal) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      });
    }).catch(() => {
      if (e.request.mode === "navigate") {
        return caches.match("index.html");
      }
    })
  );
});

