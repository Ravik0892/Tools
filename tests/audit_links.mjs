import fs from 'fs';
import path from 'path';

function getHrefs(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /href=["']([^"']+)["']/g;
  const hrefs = [];
  let m;
  while ((m = regex.exec(content)) !== null) {
    hrefs.push(m[1]);
  }
  return hrefs;
}

console.log("=== 1. LINKS IN INDEX.HTML ===");
const indexHrefs = getHrefs('index.html').filter(h => !h.startsWith('http') && !h.startsWith('#') && !h.startsWith('mailto:') && !h.startsWith('data:'));
console.log(indexHrefs);

console.log("\n=== 1.5. LINKS IN LANDING.HTML ===");
const landingHrefs = getHrefs('landing.html').filter(h => !h.startsWith('http') && !h.startsWith('#') && !h.startsWith('mailto:') && !h.startsWith('data:'));
console.log(landingHrefs);
console.log("\n=== 1.6. LINKS IN GUIDES/PAYMENT-GUIDE.HTML ===");
const payHrefs = getHrefs('guides/payment-guide.html').filter(h => !h.startsWith('http') && !h.startsWith('#') && !h.startsWith('mailto:') && !h.startsWith('data:'));
console.log(payHrefs);

console.log("\n=== 2. LINKS IN GUIDES/INDEX.HTML ===");
const guidesHubHrefs = getHrefs('guides/index.html').filter(h => !h.startsWith('http') && !h.startsWith('#'));
const hubWithHtml = guidesHubHrefs.filter(h => h.includes('.html'));
const hubClean = guidesHubHrefs.filter(h => !h.includes('.html'));
console.log(`Total: ${guidesHubHrefs.length} (with .html: ${hubWithHtml.length}, clean: ${hubClean.length})`);
console.log("Sample with .html:", hubWithHtml.slice(0, 8));
console.log("Sample clean:", hubClean.slice(0, 8));

console.log("\n=== 2.1 LINKS IN GUIDES/ES/INDEX.HTML ===");
const esHubHrefs = getHrefs('guides/es/index.html').filter(h => !h.startsWith('http') && !h.startsWith('#'));
console.log(`Total: ${esHubHrefs.length} (with .html: ${esHubHrefs.filter(h => h.includes('.html')).length})`);
console.log("Links:", esHubHrefs);

console.log("\n=== 2.2 LINKS IN GUIDES/PT/INDEX.HTML ===");
const ptHubHrefs = getHrefs('guides/pt/index.html').filter(h => !h.startsWith('http') && !h.startsWith('#'));
console.log(`Total: ${ptHubHrefs.length} (with .html: ${ptHubHrefs.filter(h => h.includes('.html')).length})`);
console.log("Links:", ptHubHrefs);

console.log("\n=== 3. LINKS IN APP.JS ===");
const appJs = fs.readFileSync('app.js', 'utf8');
const guideUrlMatches = [...appJs.matchAll(/guides\/[a-zA-Z0-9_\-\.\/]+/g)].map(m => m[0]);
console.log("Guide references in app.js:", [...new Set(guideUrlMatches)]);

console.log("\n=== 4. CANONICAL & SITEMAP STANDARDS ===");
const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const sitemapWithHtml = sitemapLocs.filter(l => l.includes('.html'));
console.log(`Sitemap locs: ${sitemapLocs.length} total, with .html: ${sitemapWithHtml.length}`);
