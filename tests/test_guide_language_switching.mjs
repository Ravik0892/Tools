import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

console.log("================================================================");
console.log("🔍 TESTING GUIDE LANGUAGE SWITCHING & ROUTING ARCHITECTURE");
console.log("================================================================\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failed++;
  }
}

// 1. Static file inspections
console.log("1. Inspecting Localized Guides Navigation & Href Parity...");

const esIndex = fs.readFileSync(path.join(root, 'guides', 'es', 'index.html'), 'utf8');
const ptIndex = fs.readFileSync(path.join(root, 'guides', 'pt', 'index.html'), 'utf8');
const enIndex = fs.readFileSync(path.join(root, 'guides', 'index.html'), 'utf8');

const esPtBtnMatch = esIndex.match(/<a[^>]*class="[^"]*lang-btn[^"]*"[^>]*>PT<\/a>/i);
assert(esPtBtnMatch && !esPtBtnMatch[0].includes('https://'), "es/index.html PT button does not hardcode production domain");
assert(esIndex.includes('href="/guides/pt/"'), "es/index.html uses clean URL link for PT button");
assert(esIndex.includes('href="/?lang=es"'), "es/index.html passes ?lang=es back to main app");
assert(esIndex.includes("localStorage.setItem('omnitool_language', 'es')"), "es/index.html persists language preference to localStorage");

const ptEsBtnMatch = ptIndex.match(/<a[^>]*class="[^"]*lang-btn[^"]*"[^>]*>ES<\/a>/i);
assert(ptEsBtnMatch && !ptEsBtnMatch[0].includes('https://'), "pt/index.html ES button does not hardcode production domain");
assert(ptIndex.includes('href="/guides/es/"'), "pt/index.html uses clean URL link for ES button");
assert(ptIndex.includes('href="/?lang=pt"'), "pt/index.html passes ?lang=pt back to main app");
assert(ptIndex.includes("localStorage.setItem('omnitool_language', 'pt')"), "pt/index.html persists language preference to localStorage");

assert(enIndex.includes('class="lang-switch-capsule"'), "guides/index.html contains language switcher capsule");
assert(enIndex.includes('href="/guides/es/"'), "guides/index.html clean links to /guides/es/");
assert(enIndex.includes('href="/guides/pt/"'), "guides/index.html clean links to /guides/pt/");

const esCompress = fs.readFileSync(path.join(root, 'guides', 'es', 'compress-pdf.html'), 'utf8');
const ptCompress = fs.readFileSync(path.join(root, 'guides', 'pt', 'compress-pdf.html'), 'utf8');

assert(esCompress.includes('href="/guides/pt/compress-pdf"'), "es/compress-pdf.html links cleanly to /guides/pt/compress-pdf");
assert(esCompress.includes('href="/guides/compress-pdf"'), "es/compress-pdf.html links cleanly to /guides/compress-pdf");
assert(esCompress.includes('href="/?lang=es#tool/compress-pdf"'), "es/compress-pdf.html passes ?lang=es to launch tool in main suite");

assert(ptCompress.includes('href="/guides/es/compress-pdf"'), "pt/compress-pdf.html links cleanly to /guides/es/compress-pdf");
assert(ptCompress.includes('href="/guides/compress-pdf"'), "pt/compress-pdf.html links cleanly to /guides/compress-pdf");
assert(ptCompress.includes('href="/?lang=pt#tool/compress-pdf"'), "pt/compress-pdf.html passes ?lang=pt to launch tool in main suite");

// 2. Vercel & Cloudflare Rewrites
console.log("\n2. Inspecting Vercel & Cloudflare Rewrites Configuration (vercel.json, _redirects, _headers)...");
const vercel = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const rewrites = vercel.rewrites || [];

const hasEsPtIndexRewrite = rewrites.some(r => r.source.includes('/guides/:lang'));
assert(hasEsPtIndexRewrite, "vercel.json contains explicit rewrite for localized guide folders (/guides/:lang)");

const hasGeneralGuideRewrite = rewrites.some(r => r.source === '/guides/:slug');
assert(hasGeneralGuideRewrite, "vercel.json contains cleanUrl rewrite for guides (/guides/:slug)");

const cfRedirects = fs.readFileSync(path.join(root, '_redirects'), 'utf8');
assert(cfRedirects.includes('/guides/es/      /guides/es/index.html  200'), "_redirects contains explicit routing for /guides/es/");
assert(cfRedirects.includes('/guides/pt/      /guides/pt/index.html  200'), "_redirects contains explicit routing for /guides/pt/");

const cfHeaders = fs.readFileSync(path.join(root, '_headers'), 'utf8');
assert(cfHeaders.includes('/guides/*'), "_headers contains fresh cache control for /guides/*");

// 3. Local Server Directory & Clean URL Simulation
console.log("\n3. Testing Local Static Server Path Resolution Logic...");

function resolveLocalServerPath(pathname) {
  let targetPath = path.normalize(path.join(root, pathname));
  if (fs.existsSync(targetPath)) {
    if (fs.statSync(targetPath).isDirectory()) {
      const dirIndex = path.join(targetPath, "index.html");
      if (fs.existsSync(dirIndex) && fs.statSync(dirIndex).isFile()) {
        targetPath = dirIndex;
      }
    }
  } else if (fs.existsSync(targetPath + ".html") && fs.statSync(targetPath + ".html").isFile()) {
    targetPath = targetPath + ".html";
  }
  return fs.existsSync(targetPath) && fs.statSync(targetPath).isFile() ? targetPath : path.join(root, "index.html");
}

const resGuidesPt = resolveLocalServerPath("/guides/pt/");
assert(resGuidesPt.endsWith(path.join("guides", "pt", "index.html")), "/guides/pt/ resolves to guides/pt/index.html (NOT root index.html)");

const resGuidesEs = resolveLocalServerPath("/guides/es/");
assert(resGuidesEs.endsWith(path.join("guides", "es", "index.html")), "/guides/es/ resolves to guides/es/index.html (NOT root index.html)");

const resGuidesRoot = resolveLocalServerPath("/guides/");
assert(resGuidesRoot.endsWith(path.join("guides", "index.html")), "/guides/ resolves to guides/index.html");

const resCleanCompress = resolveLocalServerPath("/guides/compress-pdf");
assert(resCleanCompress.endsWith(path.join("guides", "compress-pdf.html")), "Clean URL /guides/compress-pdf resolves to guides/compress-pdf.html");

const resCleanPtCompress = resolveLocalServerPath("/guides/pt/compress-pdf");
assert(resCleanPtCompress.endsWith(path.join("guides", "pt", "compress-pdf.html")), "Clean URL /guides/pt/compress-pdf resolves to guides/pt/compress-pdf.html");

const resSpaFallback = resolveLocalServerPath("/tool/pipeline-builder");
assert(resSpaFallback.endsWith("index.html"), "SPA route /tool/pipeline-builder cleanly falls back to root index.html");

console.log("\n================================================================");
console.log(`SUMMARY: ${passed}/${passed + failed} TESTS PASSED (${failed} FAILED)`);
if (failed === 0) {
  console.log("🎉 ALL GUIDE LANGUAGE SWITCHING & ROUTING TESTS PASSED PERFECTLY!");
} else {
  console.error("❌ SOME TESTS FAILED");
  process.exit(1);
}
console.log("================================================================");
