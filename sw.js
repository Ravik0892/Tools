// Service Worker for OmniTool Hub PWA
const CACHE_NAME = "omnitool-v25";
const ASSETS_TO_CACHE = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "tools/utils.js",
  "tools/pipeline-builder.js",
  "tools/json-formatter.js",
  "tools/base64.js",
  "tools/jwt-decoder.js",
  "tools/hash-generator.js",
  "tools/url-encoder.js",
  "tools/uuid-generator.js",
  "tools/text-converter.js",
  "tools/markdown-preview.js",
  "tools/text-diff.js",
  "tools/regex-tester.js",
  "tools/gradient-generator.js",
  "tools/color-palette.js",
  "tools/password-generator.js",
  "tools/epoch-converter.js",
  "tools/unit-converter.js",
  "tools/graphics-studio.js",
  "tools/calculator.js",
  "tools/glassmorphism-generator.js",
  "tools/image-converter.js",
  "tools/qr-generator.js",
  "tools/seo-previewer.js",
  "tools/svg-animator.js"
];

// Install Event
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching App Shell");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event (Cleanup Old Caches)
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

// Fetch Event (Cache-First, Network Fallback)
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  const url = new URL(e.request.url);
  const isLocal = url.origin === self.location.origin;
  const isCachableExternal = e.request.url.includes("fonts.googleapis.com") ||
                             e.request.url.includes("fonts.gstatic.com") ||
                             e.request.url.includes("icons8.com");

  // Only intercept local requests or specific whitelisted external assets
  if (!isLocal && !isCachableExternal) return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // If resource not in cache, fetch it from network
      return fetch(e.request).then((networkResponse) => {
        // Cache external fonts or icon assets dynamically
        if (isCachableExternal) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      });
    }).catch((err) => {
      // Offline fallback for navigation requests
      if (e.request.mode === "navigate") {
        return caches.match("index.html");
      }
      throw err; // Re-throw to propagate network failure to browser correctly
    })
  );
});
