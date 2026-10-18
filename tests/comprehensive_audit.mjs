import fs from 'fs';
import path from 'path';

// Extract app.tools from app.js
const appJsContent = fs.readFileSync('app.js', 'utf8');

// Find tools: [ ... ]
const startIdx = appJsContent.indexOf('tools: [');
if (startIdx === -1) {
  console.error("Could not find tools: [ in app.js");
  process.exit(1);
}

// Extract objects
const toolIds = [];
const toolMap = new Map();
const idRegex = /id:\s*["']([^"']+)["']/g;

// Only search within the tools array
let depth = 0;
let arrayStart = appJsContent.indexOf('[', startIdx);
let arrayEnd = -1;
for (let i = arrayStart; i < appJsContent.length; i++) {
  if (appJsContent[i] === '[') depth++;
  else if (appJsContent[i] === ']') {
    depth--;
    if (depth === 0) {
      arrayEnd = i;
      break;
    }
  }
}

const toolsArrayStr = appJsContent.substring(arrayStart, arrayEnd + 1);
let m;
while ((m = idRegex.exec(toolsArrayStr)) !== null) {
  toolIds.push(m[1]);
}

console.log(`=== AUDIT SUMMARY ===`);
console.log(`Found ${toolIds.length} tool entries registered in app.js tools array.`);

// Check for duplicate tool IDs
const seen = new Set();
const duplicates = [];
for (const id of toolIds) {
  if (seen.has(id)) duplicates.push(id);
  seen.add(id);
}
if (duplicates.length > 0) {
  console.error(`[BUG] Duplicate tool IDs found in app.js:`, duplicates);
} else {
  console.log(`[PASS] No duplicate tool IDs in app.js.`);
}

// Check if tool files exist in tools/
const toolsDir = path.resolve('tools');
const toolFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith('.js'));
console.log(`Found ${toolFiles.length} .js files in tools/ directory.`);

const missingFiles = [];
for (const id of toolIds) {
  if (!fs.existsSync(path.join(toolsDir, `${id}.js`))) {
    missingFiles.push(id);
  }
}
if (missingFiles.length > 0) {
  console.error(`[BUG] Registered tools missing their file in tools/:`, missingFiles);
} else {
  console.log(`[PASS] All ${toolIds.length} registered tools have matching files in tools/.`);
}

// Check for orphaned tool files (files in tools/ not in app.js)
const registeredSet = new Set(toolIds);
const unlinkedFiles = toolFiles.filter(f => {
  const base = f.replace('.js', '');
  return base !== 'utils' && !registeredSet.has(base);
});
if (unlinkedFiles.length > 0) {
  console.warn(`[NOTICE] Tool files not explicitly registered in app.tools:`, unlinkedFiles);
}

// Check each tool file exports default with renderUI
let renderUiMissing = [];
for (const file of toolFiles) {
  if (file === 'utils.js') continue;
  const filePath = path.join(toolsDir, file);
  const code = fs.readFileSync(filePath, 'utf8');
  if (!code.includes('renderUI')) {
    renderUiMissing.push(file);
  }
}
if (renderUiMissing.length > 0) {
  console.error(`[BUG] Tool files missing renderUI:`, renderUiMissing);
} else {
  console.log(`[PASS] All ${toolFiles.length - 1} tool modules define renderUI.`);
}

// Check index.html for critical elements
const indexHtml = fs.readFileSync('index.html', 'utf8');
const checks = [
  { id: 'app.js script tag', test: /src=["']app\.js(?:\?[^"']*)?["']/.test(indexHtml) },
  { id: 'style.css link', test: /href=["']style\.css(?:\?[^"']*)?["']/.test(indexHtml) },
  { id: 'active tool viewport container', test: indexHtml.includes('id="active-tool-viewport"') },
  { id: 'tool-container class', test: indexHtml.includes('class="tool-container"') },
  { id: 'sidebar / nav', test: indexHtml.includes('id="tools-list"') || indexHtml.includes('sidebar') || indexHtml.includes('app-sidebar') },
  { id: 'search input', test: indexHtml.includes('id="tool-search"') || indexHtml.includes('search') },
  { id: 'theme toggle', test: indexHtml.includes('theme') }
];

console.log(`\n=== INDEX.HTML INTEGRITY ===`);
checks.forEach(c => {
  if (c.test) {
    console.log(`[PASS] ${c.id}`);
  } else {
    console.warn(`[WARN] Missing or unexpected: ${c.id}`);
  }
});
