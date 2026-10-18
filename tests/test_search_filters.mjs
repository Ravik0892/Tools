import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("=== TESTING SEARCH FILTER ENGINE ===");

// 1. Verify index.html contains all search filter elements
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const expectedElements = [
  'id="tool-search"',
  'id="tool-search-clear"',
  'id="search-filters-bar"',
  'data-filter="all"',
  'data-filter="tools"',
  'data-filter="suites"',
  'data-filter="features"',
  'data-filter="pro"',
  'data-filter="free"',
  'data-filter="guides"',
  'id="sfc-count-all"',
  'id="sfc-count-tools"',
  'id="sfc-count-suites"',
  'id="sfc-count-features"',
  'id="sfc-count-pro"',
  'id="sfc-count-free"',
  'id="sfc-count-guides"',
  'id="cp-filters-row"',
  'data-cp-filter="all"',
  'data-cp-filter="tools"',
  'data-cp-filter="suites"',
  'data-cp-filter="features"',
  'data-cp-filter="guides"'
];

let missingHtml = [];
expectedElements.forEach(item => {
  if (!html.includes(item)) {
    missingHtml.push(item);
  }
});

if (missingHtml.length > 0) {
  console.error("FAIL: Missing elements in index.html:", missingHtml);
  process.exit(1);
} else {
  console.log("PASS: All filter chips, badges, and Command Palette tabs verified in index.html.");
}

// 2. Verify style.css contains filter chip styling
const css = fs.readFileSync(path.join(__dirname, '../style.css'), 'utf8');
const expectedCss = [
  '.search-filters-bar',
  '.search-filter-chip',
  '.search-clear-btn',
  '.cp-filters-row',
  '.cp-filter-tab',
  '.guide-search-card'
];

let missingCss = [];
expectedCss.forEach(cls => {
  if (!css.includes(cls)) {
    missingCss.push(cls);
  }
});

if (missingCss.length > 0) {
  console.error("FAIL: Missing CSS classes:", missingCss);
  process.exit(1);
} else {
  console.log("PASS: All search filter, chip, and guide card CSS styles verified.");
}

// 3. Test app.js logic via evaluation of app object functions
const appCode = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');

// Mock browser globals
globalThis.window = {
  location: { hostname: "localhost", protocol: "http:" },
  addEventListener: () => {}
};
globalThis.document = {
  getElementById: (id) => ({
    id,
    value: "",
    style: {},
    classList: { add: () => {}, remove: () => {}, contains: () => false },
    addEventListener: () => {},
    querySelectorAll: () => [],
    appendChild: () => {}
  }),
  querySelectorAll: () => [],
  documentElement: {
    getAttribute: () => "dark",
    setAttribute: () => {},
    style: { setProperty: () => {} }
  }
};
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {}
};

// Check syntax of app.js and verify search query matches
try {
  const runner = new Function(`${appCode}; return app;`);
  const appObj = runner();
  console.log("PASS: app.js parsed with zero syntax errors.");

  // Inject keywords
  appObj.tools.forEach(tool => {
    tool.keywords = appObj.toolKeywords[tool.id] || [];
  });

  const cryptoTool = appObj.tools.find(t => t.id === "crypto-suite");
  if (!cryptoTool) {
    throw new Error("crypto-suite not found in app.tools");
  }

  const cryptoText = appObj.getToolSearchText(cryptoTool);

  const testQueries = [
    "SHA-256",
    "sha-256",
    "256",
    "sha 256",
    "calculate sha256 checksum",
    "how to hash password with sha 256",
    "encrypt data with aes 256"
  ];

  testQueries.forEach(query => {
    const matched = appObj.matchSearchQuery(cryptoText, query);
    if (!matched) {
      throw new Error(`Failed to match query "${query}" against Cryptography Suite`);
    }
    console.log(`PASS: Query "${query}" successfully matched Cryptography Suite.`);
  });

} catch (e) {
  console.error("FAIL: Error in app.js search verification:", e.message);
  process.exit(1);
}

console.log("=== ALL SEARCH FILTER VERIFICATIONS PASSED ===");
