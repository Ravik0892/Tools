import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log("🚀 Starting Clean URL Modernization...");

// 1. Process index.html
const indexHtmlPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  let content = fs.readFileSync(indexHtmlPath, 'utf8');
  const originalLen = content.length;

  content = content.replace(/href=["']landing\.html["']/g, 'href="/landing"');
  content = content.replace(/href=["']guides\/index\.html["']/g, 'href="/guides/"');
  content = content.replace(/href=["']guides\/payment-guide\.html["']/g, 'href="/guides/payment-guide"');
  content = content.replace(/href=["']guides\/([a-zA-Z0-9_\-]+)\.html["']/g, 'href="/guides/$1"');

  fs.writeFileSync(indexHtmlPath, content, 'utf8');
  console.log(`✓ Updated index.html with clean URLs (${originalLen} -> ${content.length} bytes)`);
}

// 2. Process landing.html
const landingHtmlPath = path.join(rootDir, 'landing.html');
if (fs.existsSync(landingHtmlPath)) {
  let content = fs.readFileSync(landingHtmlPath, 'utf8');
  const originalLen = content.length;

  content = content.replace(/href=["']landing\.html["']/g, 'href="/landing"');
  content = content.replace(/href=["']\/?guides\/index\.html["']/g, 'href="/guides/"');
  content = content.replace(/href=["']\/?guides\/payment-guide\.html["']/g, 'href="/guides/payment-guide"');
  content = content.replace(/href=["']\/?guides\/([a-zA-Z0-9_\-]+)\.html["']/g, 'href="/guides/$1"');

  fs.writeFileSync(landingHtmlPath, content, 'utf8');
  console.log(`✓ Updated landing.html with clean URLs (${originalLen} -> ${content.length} bytes)`);
}

// 3. Process guides/payment-guide.html
const paymentGuidePath = path.join(rootDir, 'guides', 'payment-guide.html');
if (fs.existsSync(paymentGuidePath)) {
  let content = fs.readFileSync(paymentGuidePath, 'utf8');
  content = content.replace(/href=["']landing\.html["']/g, 'href="/landing"');
  content = content.replace(/href=["']\/?guides\/index\.html["']/g, 'href="/guides/"');
  content = content.replace(/href=["']\.\.\/index\.html["']/g, 'href="/"');
  fs.writeFileSync(paymentGuidePath, content, 'utf8');
  console.log(`✓ Verified clean URLs in guides/payment-guide.html`);
}

// 4. Process guides/index.html (Master Guides Hub)
const guidesHubPath = path.join(rootDir, 'guides', 'index.html');
if (fs.existsSync(guidesHubPath)) {
  let content = fs.readFileSync(guidesHubPath, 'utf8');
  const originalLen = content.length;

  // Language switcher capsule
  content = content.replace(/href=["']index\.html["']\s+class=["']lang-btn active["']/g, 'href="/guides/" class="lang-btn active"');
  content = content.replace(/href=["']es\/index\.html["']/g, 'href="/guides/es/"');
  content = content.replace(/href=["']pt\/index\.html["']/g, 'href="/guides/pt/"');

  // Navigation and footer links back to main app
  content = content.replace(/href=["']\.\.\/index\.html#dashboard["']/g, 'href="/#dashboard"');
  content = content.replace(/href=["']\.\.\/index\.html#plans["']/g, 'href="/#plans"');
  content = content.replace(/href=["']\.\.\/index\.html#privacy["']/g, 'href="/#privacy"');
  content = content.replace(/href=["']\.\.\/index\.html#terms["']/g, 'href="/#terms"');
  content = content.replace(/href=["']\.\.\/index\.html["']/g, 'href="/"');

  // Card links to individual guides: e.g. href="pipeline-builder.html" -> href="/guides/pipeline-builder"
  content = content.replace(/href=["']([a-zA-Z0-9_\-]+)\.html["']/g, (match, slug) => {
    if (slug === 'index') return 'href="/guides/"';
    return `href="/guides/${slug}"`;
  });

  fs.writeFileSync(guidesHubPath, content, 'utf8');
  console.log(`✓ Updated guides/index.html with clean URLs (${originalLen} -> ${content.length} bytes)`);
}

// 5. Process ctaHref in new-tools-data.mjs and generate-guides.mjs
const scriptFiles = [
  path.join(rootDir, 'scripts', 'new-tools-data.mjs'),
  path.join(rootDir, 'scripts', 'generate-guides.mjs')
];

for (const sf of scriptFiles) {
  if (fs.existsSync(sf)) {
    let content = fs.readFileSync(sf, 'utf8');
    content = content.replace(/"\.\.\/index\.html#/g, '"/#');
    content = content.replace(/'\.\.\/index\.html#/g, "'/#");
    content = content.replace(/"\.\.\/index\.html"/g, '"/"');
    content = content.replace(/'\.\.\/index\.html'/g, "'/'");
    fs.writeFileSync(sf, content, 'utf8');
    console.log(`✓ Cleaned ctaHref in ${path.basename(sf)}`);
  }
}

// 6. Clean individual existing English guides in guides/*.html
const guidesDir = path.join(rootDir, 'guides');
if (fs.existsSync(guidesDir)) {
  const guideFiles = fs.readdirSync(guidesDir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'payment-guide.html');
  let cleanedCount = 0;
  for (const gf of guideFiles) {
    const fullPath = path.join(guidesDir, gf);
    let content = fs.readFileSync(fullPath, 'utf8');
    const orig = content;

    // Navigation and breadcrumb cleanup
    content = content.replace(/href=["']\.\.\/index\.html#dashboard["']/g, 'href="/#dashboard"');
    content = content.replace(/href=["']\.\.\/index\.html#plans["']/g, 'href="/#plans"');
    content = content.replace(/href=["']\.\.\/index\.html#privacy["']/g, 'href="/#privacy"');
    content = content.replace(/href=["']\.\.\/index\.html#terms["']/g, 'href="/#terms"');
    content = content.replace(/href=["']\.\.\/index\.html#refund["']/g, 'href="/#refund"');
    content = content.replace(/href=["']\.\.\/index\.html#cookies["']/g, 'href="/#cookies"');
    content = content.replace(/href=["']\.\.\/index\.html#tool\/([a-zA-Z0-9_\-]+)["']/g, 'href="/#tool/$1"');
    content = content.replace(/href=["']\.\.\/index\.html["']/g, 'href="/"');

    // Guides Hub link cleanup
    content = content.replace(/href=["']index\.html["']/g, 'href="/guides/"');

    // Language switcher cleanup
    content = content.replace(/href=["']([a-zA-Z0-9_\-]+)\.html["']\s+class=["']lang-btn active["']/g, 'href="/guides/$1" class="lang-btn active"');
    content = content.replace(/href=["']es\/([a-zA-Z0-9_\-]+)\.html["']/g, 'href="/guides/es/$1"');
    content = content.replace(/href=["']es\/index\.html["']/g, 'href="/guides/es/"');
    content = content.replace(/href=["']pt\/([a-zA-Z0-9_\-]+)\.html["']/g, 'href="/guides/pt/$1"');
    content = content.replace(/href=["']pt\/index\.html["']/g, 'href="/guides/pt/"');

    // Related guide cards cleanup: href="xyz.html" class="related-card"
    content = content.replace(/href=["']([a-zA-Z0-9_\-]+)\.html["']\s+class=["']related-card["']/g, 'href="/guides/$1" class="related-card"');

    if (content !== orig) {
      fs.writeFileSync(fullPath, content, 'utf8');
      cleanedCount++;
    }
  }
  console.log(`✓ Cleaned links across ${cleanedCount} individual English guide files.`);
}

console.log("🎉 Complete Clean URL Modernization finished successfully!");
