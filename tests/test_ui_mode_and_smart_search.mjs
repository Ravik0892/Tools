import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("=== TESTING DUAL-UI MODE & SMART SEARCH ENGINE ===");

// 1. Verify HTML elements for dual mode switcher
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const expectedElements = [
  'id="ui-mode-capsule"',
  'id="mode-btn-beginner"',
  'id="mode-btn-developer"',
  'id="mobile-ui-mode-capsule"',
  'id="mobile-mode-btn-beginner"',
  'id="mobile-mode-btn-developer"',
  'id="dashboard-hero-badge"',
  'id="hero-badge-text"',
  'id="dashboard-hero-title"',
  'id="dashboard-hero-desc"',
  'id="hero-mode-switch-callout"'
];

let missingHtml = [];
expectedElements.forEach(item => {
  if (!html.includes(item)) missingHtml.push(item);
});

if (missingHtml.length > 0) {
  console.error("FAIL: Missing elements in index.html:", missingHtml);
  process.exit(1);
} else {
  console.log("PASS: All mode switcher and hero elements present in index.html");
}

// 2. Verify CSS styles for dual mode
const css = fs.readFileSync(path.join(__dirname, '../style.css'), 'utf8');
const expectedCss = [
  '.ui-mode-capsule',
  '.ui-mode-pill',
  '.ui-mode-dot',
  '.hero-mode-switch-callout',
  '.hero-mode-banner',
  'body[data-ui-mode="beginner"] #search-filters-bar'
];

let missingCss = [];
expectedCss.forEach(cls => {
  if (!css.includes(cls)) missingCss.push(cls);
});

if (missingCss.length > 0) {
  console.error("FAIL: Missing CSS classes:", missingCss);
  process.exit(1);
} else {
  console.log("PASS: All mode switcher and beginner mode CSS rules present in style.css");
}

// 3. Setup mock environment and evaluate app
const storage = {};
globalThis.localStorage = {
  getItem: (k) => storage[k] || null,
  setItem: (k, v) => { storage[k] = String(v); },
  removeItem: (k) => { delete storage[k]; }
};

globalThis.sessionStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

class MockElement {
  constructor(tagName = 'div', id = '') {
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.children = [];
    this.classList = {
      _classes: new Set(),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      contains: (c) => this.classList._classes.has(c)
    };
    this.style = {};
    this.value = '';
    this.innerText = '';
    this.innerHTML = '';
    this.listeners = {};
    this.attributes = {};
  }
  getAttribute(name) { return this.attributes[name] || null; }
  setAttribute(name, val) { this.attributes[name] = val; }
  removeAttribute(name) { delete this.attributes[name]; }
  appendChild(child) { if (child) child.parentElement = this; this.children.push(child); return child; }
  remove() { if (this.parentElement) this.parentElement.children = this.parentElement.children.filter(c => c !== this); }
  addEventListener(evt, cb) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(cb);
  }
  querySelector(sel) {
    return new MockElement('div');
  }
  querySelectorAll(sel) {
    return [];
  }
}

const domNodes = {};
const getOrCreateMockEl = (id) => {
  if (!domNodes[id]) {
    domNodes[id] = new MockElement('div', id);
  }
  return domNodes[id];
};

globalThis.window = {
  location: { hostname: "localhost", protocol: "http:", hash: "", pathname: "/" },
  addEventListener: () => {},
  history: { pushState: () => {} },
  scrollTo: () => {}
};
globalThis.requestAnimationFrame = (cb) => setTimeout(cb, 0);

globalThis.document = {
  body: new MockElement('body'),
  getElementById: (id) => getOrCreateMockEl(id),
  querySelectorAll: () => [],
  querySelector: (sel) => {
    if (sel.startsWith('#')) return getOrCreateMockEl(sel.slice(1));
    return new MockElement('div');
  },
  createElement: (tag) => new MockElement(tag),
  documentElement: new MockElement('html')
};

const appCode = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
const evalFunc = new Function(appCode + '; return app;');
const app = evalFunc();

// TEST 3.1: Beginner tools configuration
const beginnerToolsCount = Object.keys(app.beginnerToolsConfig).length;
if (beginnerToolsCount !== 20) {
  console.error(`FAIL: Expected 20 beginner tools, found ${beginnerToolsCount}`);
  process.exit(1);
}
console.log(`PASS: beginnerToolsConfig has exactly ${beginnerToolsCount} curated tools`);

// TEST 3.2: Verify isBeginnerTool method
if (!app.isBeginnerTool('pdf-utilities') || !app.isBeginnerTool('qr-studio') || !app.isBeginnerTool('voice-recorder')) {
  console.error("FAIL: isBeginnerTool failed for everyday tools");
  process.exit(1);
}
if (app.isBeginnerTool('jwt-decoder') || app.isBeginnerTool('pipeline-builder') || app.isBeginnerTool('crypto-suite')) {
  console.error("FAIL: isBeginnerTool returned true for dev-only tools");
  process.exit(1);
}
console.log("PASS: isBeginnerTool correctly distinguishes everyday vs developer tools");

// TEST 3.3: Default UI mode initialization
window.location.hash = "";
window.location.pathname = "/";
app.initUiMode();
if (app.uiMode !== "beginner") {
  console.error(`FAIL: Default UI mode should be "beginner", got "${app.uiMode}"`);
  process.exit(1);
}
console.log('PASS: Brand new visitor defaults to "beginner" mode');

// TEST 3.4: Manual mode switching
app.setUiMode("developer");
if (app.uiMode !== "developer" || localStorage.getItem("omnitool_ui_mode") !== "developer") {
  console.error("FAIL: Failed to switch to developer mode");
  process.exit(1);
}
if (document.body.getAttribute("data-ui-mode") !== "developer") {
  console.error("FAIL: document.body data-ui-mode not updated to developer");
  process.exit(1);
}
console.log('PASS: setUiMode("developer") successfully switches mode and persists in localStorage');

app.setUiMode("beginner");
if (app.uiMode !== "beginner" || localStorage.getItem("omnitool_ui_mode") !== "beginner") {
  console.error("FAIL: Failed to switch back to beginner mode");
  process.exit(1);
}
console.log('PASS: setUiMode("beginner") successfully switches back to beginner mode');

// TEST 3.5: Smart Search Auto-Switch to Developer Mode
console.log("Testing Smart Search Auto-Switch...");
app.uiMode = "beginner";
app.filterDashboard("jwt");
if (app.uiMode !== "developer") {
  console.error('FAIL: Searching "jwt" in beginner mode should auto-switch to developer mode');
  process.exit(1);
}
console.log('PASS: Searching "jwt" in beginner mode auto-switches to developer mode');

app.uiMode = "beginner";
app.filterDashboard("regex");
if (app.uiMode !== "developer") {
  console.error('FAIL: Searching "regex" in beginner mode should auto-switch to developer mode');
  process.exit(1);
}
console.log('PASS: Searching "regex" in beginner mode auto-switches to developer mode');

app.uiMode = "beginner";
app.filterDashboard("sha256");
if (app.uiMode !== "developer") {
  console.error('FAIL: Searching "sha256" in beginner mode should auto-switch to developer mode');
  process.exit(1);
}
console.log('PASS: Searching "sha256" in beginner mode auto-switches to developer mode');

// TEST 3.6: Switching back to beginner mode via search keyword
app.filterDashboard("everyday");
if (app.uiMode !== "beginner") {
  console.error('FAIL: Searching "everyday" in developer mode should switch to beginner mode');
  process.exit(1);
}
console.log('PASS: Searching "everyday" switches back to beginner mode');

// TEST 3.7: Beginner search queries match tools
const pdfTool = app.tools.find(t => t.id === "pdf-utilities");
const searchCorpus = app.getToolSearchText(pdfTool).toLowerCase();
if (!searchCorpus.includes("combine") || !searchCorpus.includes("compress") || !searchCorpus.includes("merge")) {
  console.error("FAIL: PDF tool search corpus does not include beginner keywords");
  process.exit(1);
}
console.log('PASS: Everyday search terms ("combine", "merge", "compress") properly indexed in tool search text');

// TEST 3.8: Switching mode while a tool is open should return to dashboard in that mode
app.activeTool = "calculator";
getOrCreateMockEl('dashboard-view').style.display = 'none';
getOrCreateMockEl('active-tool-viewport').style.display = 'flex';

app.setUiMode("developer");
if (app.activeTool !== null) {
  console.error("FAIL: activeTool should be reset to null when switching mode");
  process.exit(1);
}
if (getOrCreateMockEl('dashboard-view').style.display !== 'block') {
  console.error("FAIL: dashboard-view should be restored to display 'block' when switching mode from within tool");
  process.exit(1);
}
if (getOrCreateMockEl('active-tool-viewport').style.display !== 'none') {
  console.error("FAIL: active-tool-viewport should be hidden when switching mode from within tool");
  process.exit(1);
}
console.log("PASS: Switching mode while inside a tool smoothly returns to developer dashboard");

app.activeTool = "jwt-decoder";
getOrCreateMockEl('dashboard-view').style.display = 'none';
getOrCreateMockEl('active-tool-viewport').style.display = 'flex';

app.setUiMode("beginner");
if (app.activeTool !== null) {
  console.error("FAIL: activeTool should be reset to null when switching to beginner mode");
  process.exit(1);
}
if (app.uiMode !== "beginner") {
  console.error("FAIL: uiMode should be 'beginner'");
  process.exit(1);
}
if (getOrCreateMockEl('dashboard-view').style.display !== 'block') {
  console.error("FAIL: dashboard-view should be display 'block' when switching to beginner mode from tool");
  process.exit(1);
}
console.log("PASS: Switching mode while inside a tool smoothly returns to everyday dashboard");

console.log("\n=======================================================");
console.log("🎉 ALL DUAL-UI MODE & SMART SEARCH TESTS PASSED! 🎉");
console.log("=======================================================");
