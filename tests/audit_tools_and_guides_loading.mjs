import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Provide Browser globals mock for Node.js environment
globalThis.window = globalThis;
globalThis.document = {
  createElement: (tag) => ({
    tagName: tag.toUpperCase(),
    setAttribute: () => {},
    getAttribute: () => null,
    appendChild: () => {},
    removeChild: () => {},
    style: {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {} },
    innerHTML: '',
    textContent: '',
    addEventListener: () => {},
    removeEventListener: () => {}
  }),
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {},
  removeEventListener: () => {},
  body: { appendChild: () => {}, style: {} },
  head: { appendChild: () => {} }
};

if (!globalThis.localStorage) {
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
  };
}

if (!globalThis.location) {
  globalThis.location = {
    hash: '',
    pathname: '/',
    search: '',
    href: 'https://omnitool.worldsneed.com/'
  };
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

console.log('=================================================================');
console.log('🧪 RUNNING COMPREHENSIVE TOOLS & GUIDES DEEP INTEGRITY AUDIT');
console.log('=================================================================\n');

let totalChecks = 0;
let errors = [];
let warnings = [];

// -------------------------------------------------------------
// 1. AUDIT APP TOOLS & MODULE IMPORTS
// -------------------------------------------------------------
console.log('▶ [1/5] Auditing Primary Tools & JavaScript Modules...');

const appJs = fs.readFileSync(path.join(projectRoot, 'app.js'), 'utf8');

// Extract tools from app.js
const toolsMatch = appJs.match(/tools:\s*\[([\s\S]*?)\n\s*\],/);
if (!toolsMatch) {
  errors.push('CRITICAL: Could not find tools array in app.js');
}

const toolIds = [];
const toolRegex = /\{\s*id:\s*["']([a-z0-9-]+)["']/g;
let m;
while ((m = toolRegex.exec(toolsMatch ? toolsMatch[1] : '')) !== null) {
  toolIds.push(m[1]);
}

console.log(`  Found ${toolIds.length} registered tools in app.tools:`, toolIds);

for (const id of toolIds) {
  totalChecks++;
  const toolFilePath = path.join(projectRoot, 'tools', `${id}.js`);
  if (!fs.existsSync(toolFilePath)) {
    errors.push(`Tool module missing on disk: tools/${id}.js for tool ID "${id}"`);
    continue;
  }

  // Try dynamic import
  try {
    const imported = await import(`../tools/${id}.js`);
    const tool = imported.default;
    if (!tool) {
      errors.push(`tools/${id}.js has no default export`);
    } else {
      if (typeof tool.renderUI !== 'function') {
        warnings.push(`tools/${id}.js has no renderUI() method`);
      } else {
        // Test rendering UI without crashing
        try {
          const uiHtml = tool.renderUI();
          if (typeof uiHtml !== 'string' || uiHtml.length < 10) {
            warnings.push(`tools/${id}.js renderUI() returned empty or invalid string`);
          }
        } catch (renderErr) {
          errors.push(`tools/${id}.js renderUI() threw error: ${renderErr.message}`);
        }
      }
      if (typeof tool.init !== 'function') {
        warnings.push(`tools/${id}.js has no init() method`);
      }
    }
  } catch (importErr) {
    errors.push(`Failed to import tools/${id}.js: ${importErr.message}`);
  }
}

// -------------------------------------------------------------
// 2. AUDIT SUBTOOLS REGISTRY & DEEP LINKS
// -------------------------------------------------------------
console.log('\n▶ [2/5] Auditing subtoolsRegistry & Routing Redirects...');

const subtoolsIdx = appJs.indexOf('subtoolsRegistry: {');
const subtoolsEnd = appJs.indexOf('registerTabSwitcher(', subtoolsIdx);
const subtoolsSlice = appJs.slice(subtoolsIdx, subtoolsEnd);

const subtoolSlugs = [];
const subtoolRegex = /"([a-z0-9-]+)":\s*\{/g;
while ((m = subtoolRegex.exec(subtoolsSlice)) !== null) {
  subtoolSlugs.push(m[1]);
}

console.log(`  Found ${subtoolSlugs.length} registered subtools in subtoolsRegistry`);

for (const slug of subtoolSlugs) {
  totalChecks++;
  // Extract entry block
  const entryMatch = subtoolsSlice.match(new RegExp(`"${slug}":\\s*\\{([\\s\\S]*?)\\}(?:,|\\n)`));
  if (entryMatch) {
    const block = entryMatch[1];
    const suiteMatch = block.match(/suiteId:\s*"([^"]+)"/);
    const guideMatch = block.match(/guideUrl:\s*"([^"]+)"/);

    if (suiteMatch) {
      const suiteId = suiteMatch[1];
      if (!toolIds.includes(suiteId)) {
        errors.push(`Subtool "${slug}" points to non-existent suiteId: "${suiteId}"`);
      }
    } else {
      warnings.push(`Subtool "${slug}" has no suiteId`);
    }

    if (guideMatch) {
      const rawGuideUrl = guideMatch[1].split('#')[0];
      const targetGuidePath = path.join(projectRoot, rawGuideUrl);
      if (!fs.existsSync(targetGuidePath)) {
        errors.push(`Subtool "${slug}" guideUrl points to non-existent file: ${rawGuideUrl}`);
      }
    }
  }
}

// -------------------------------------------------------------
// 3. AUDIT ALL GUIDE HTML FILES ON DISK
// -------------------------------------------------------------
console.log('\n▶ [3/5] Auditing All Guide HTML Files on Disk...');

const guidesDir = path.join(projectRoot, 'guides');
const guideFiles = fs.readdirSync(guidesDir).filter(f => f.endsWith('.html'));
console.log(`  Found ${guideFiles.length} HTML files in guides/ directory`);

for (const file of guideFiles) {
  totalChecks++;
  const filePath = path.join(guidesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check valid HTML structure
  if (!content.includes('<!DOCTYPE html>') || !content.includes('</html>')) {
    errors.push(`Guide guides/${file} is missing valid HTML doc tags`);
  }

  // Check title
  if (!content.includes('<title>') || !content.includes('</title>')) {
    errors.push(`Guide guides/${file} is missing <title> tag`);
  }

  // Check canonical
  if (!content.includes('<link rel="canonical"')) {
    warnings.push(`Guide guides/${file} is missing canonical link`);
  }

  // Check JSON-LD schema
  if (!content.includes('application/ld+json')) {
    warnings.push(`Guide guides/${file} is missing application/ld+json`);
  }

  // Check live tool loader targetModule if present
  const targetModuleMatch = content.match(/const targetModule = '([^']+)';/);
  if (targetModuleMatch) {
    const mod = targetModuleMatch[1];
    const modPath = path.join(projectRoot, 'tools', mod);
    if (!fs.existsSync(modPath)) {
      errors.push(`Guide guides/${file} embeds targetModule "${mod}" which does not exist on disk!`);
    }
  }
}

// -------------------------------------------------------------
// 4. AUDIT GUIDES HUB (guides/index.html) CARD LINKS
// -------------------------------------------------------------
console.log('\n▶ [4/5] Auditing Guides Hub (guides/index.html)...');

const guidesIndexContent = fs.readFileSync(path.join(guidesDir, 'index.html'), 'utf8');
const cardLinks = [...guidesIndexContent.matchAll(/<a href="([^"]+\.html)" class="read-guide-btn">/g)].map(m => m[1]);

console.log(`  Found ${cardLinks.length} guide card links in guides/index.html`);

for (const link of cardLinks) {
  totalChecks++;
  const targetPath = path.join(guidesDir, link);
  if (!fs.existsSync(targetPath)) {
    errors.push(`guides/index.html has broken link to guide: guides/${link}`);
  }
}

// -------------------------------------------------------------
// 5. AUDIT HOMEPAGE (index.html) GUIDES SECTION
// -------------------------------------------------------------
console.log('\n▶ [5/5] Auditing Homepage (index.html) Guides Section...');

const homeHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const homeGuideLinks = [...homeHtml.matchAll(/href="(guides\/[a-z0-9-]+\.html)"/g)].map(m => m[1]);

console.log(`  Found ${homeGuideLinks.length} guide links referenced in index.html`);

for (const link of homeGuideLinks) {
  totalChecks++;
  const targetPath = path.join(projectRoot, link);
  if (!fs.existsSync(targetPath)) {
    errors.push(`index.html references non-existent guide: ${link}`);
  }
}

// Check if app.toggleHomeGuides is defined in app.js
if (!appJs.includes('toggleHomeGuides()')) {
  errors.push('app.toggleHomeGuides() is missing from app.js');
}

// -------------------------------------------------------------
// SUMMARY & RESULTS
// -------------------------------------------------------------
console.log('\n=================================================================');
console.log(`🏁 AUDIT COMPLETE: ${totalChecks} INTEGRITY CHECKS PERFORMED`);
console.log(`   Errors:   ${errors.length}`);
console.log(`   Warnings: ${warnings.length}`);
console.log('=================================================================\n');

if (errors.length > 0) {
  console.error('❌ CRITICAL ISSUES DETECTED:');
  errors.forEach((err, i) => console.error(`  ${i + 1}. ${err}`));
  process.exit(1);
} else {
  console.log('🎉 100% SUCCESS: All tools, guides, modules, and routes load and open without error!');
  if (warnings.length > 0) {
    console.log('\nMinor Warnings:');
    warnings.forEach((w, i) => console.log(`  ${i + 1}. ${w}`));
  }
  process.exit(0);
}
