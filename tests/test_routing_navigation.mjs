import assert from 'assert';
import fs from 'fs';
import path from 'path';

// Setup DOM Mock environment
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
  appendChild(child) { child.parentElement = this; this.children.push(child); return child; }
  insertBefore(child, ref) {
    child.parentElement = this;
    const idx = this.children.indexOf(ref);
    if (idx !== -1) this.children.splice(idx, 0, child);
    else this.children.push(child);
    return child;
  }
  removeChild(child) { this.children = this.children.filter(c => c !== child); return child; }
  addEventListener(evt, cb) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(cb);
  }
  removeEventListener(evt, cb) {
    if (!this.listeners[evt]) return;
    this.listeners[evt] = this.listeners[evt].filter(c => c !== cb);
  }
  dispatchEvent(evt) {
    const list = this.listeners[evt.type || evt] || [];
    for (const cb of list) cb(evt);
  }
  getContext() {
    return {
      fillRect() {}, clearRect() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, fill() {},
      arc() {}, strokeText() {}, fillText() {}, measureText: () => ({ width: 10 }), setLineDash() {}
    };
  }
  querySelector(sel) {
    if (sel.startsWith('#')) {
      const id = sel.slice(1);
      if (this.id === id) return this;
      for (const c of this.children) {
        if (c.id === id) return c;
        const found = c.querySelector?.(sel);
        if (found) return found;
      }
    }
    const elem = new MockElement('div');
    if (sel.startsWith('.')) elem.classList.add(sel.slice(1));
    return elem;
  }
  querySelectorAll(sel) { return []; }
  remove() { if (this.parentElement) this.parentElement.removeChild(this); }
}

const elements = {};
function getOrCreateElem(id, tag = 'div') {
  if (!elements[id]) {
    elements[id] = new MockElement(tag, id);
  }
  return elements[id];
}

// Global DOM setup
global.window = {
  location: {
    protocol: 'http:',
    hostname: '127.0.0.1',
    pathname: '/',
    hash: '',
    search: '',
    origin: 'http://127.0.0.1:8000'
  },
  history: {
    pushState(state, title, url) {
      if (url.includes('#')) {
        const [path, hash] = url.split('#');
        window.location.pathname = path || '/';
        window.location.hash = '#' + hash;
      } else {
        window.location.pathname = url;
        window.location.hash = '';
      }
    },
    replaceState(state, title, url) {
      if (url.includes('#')) {
        const [path, hash] = url.split('#');
        window.location.pathname = path || '/';
        window.location.hash = '#' + hash;
      } else {
        window.location.pathname = url;
        window.location.hash = '';
      }
    }
  },
  addEventListener(evt, cb) {
    if (!this._listeners) this._listeners = {};
    if (!this._listeners[evt]) this._listeners[evt] = [];
    this._listeners[evt].push(cb);
  },
  triggerEvent(evt) {
    if (this._listeners && this._listeners[evt]) {
      this._listeners[evt].forEach(cb => cb());
    }
  },
  scrollTo() {},
  requestAnimationFrame: (cb) => setTimeout(cb, 0)
};
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);

global.document = {
  documentElement: new MockElement('html'),
  getElementById(id) {
    return getOrCreateElem(id);
  },
  querySelector(sel) {
    if (sel.startsWith('#')) return getOrCreateElem(sel.slice(1));
    return new MockElement('div');
  },
  querySelectorAll(sel) {
    return [];
  },
  createElement(tag) {
    return new MockElement(tag);
  }
};

global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; }
};

global.sessionStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; }
};

console.log("Loading and evaluating app.js for routing test...");
const appCode = fs.readFileSync('app.js', 'utf8');

// Evaluate app in global scope
const evalFunc = new Function(appCode + '; return app;');
const app = evalFunc();
app.getToolsBasePath = () => 'file:///' + path.resolve('tools').replace(/\\/g, '/') + '/';

// Setup required mock elements
const dashView = getOrCreateElem('dashboard-view');
dashView.style.display = 'block';
const viewport = getOrCreateElem('active-tool-viewport');
viewport.style.display = 'none';
const plansView = getOrCreateElem('plans-view');
plansView.style.display = 'none';

console.log("\n=== TEST 1: Open a tool (navigateToTool) ===");
await app.navigateToTool('calculator');
assert.strictEqual(window.location.pathname, '/tool/calculator', 'Pathname should be /tool/calculator');
assert.strictEqual(window.location.hash, '', 'Hash should be empty');
assert.strictEqual(dashView.style.display, 'none', 'Dashboard should be hidden');
console.log("PASS: Tool opened and URL updated to /tool/calculator");

console.log("\n=== TEST 2: Navigate back to Dashboard via selectCategory('all') ===");
app.selectCategory('all');
assert.strictEqual(window.location.pathname, '/', 'Pathname should be reset to /');
assert.strictEqual(window.location.hash, '#dashboard', 'Hash should be #dashboard');
assert.strictEqual(dashView.style.display, 'block', 'Dashboard should now be visible');
assert.strictEqual(viewport.style.display, 'none', 'Tool viewport should now be hidden');
assert.strictEqual(app.activeTool, null, 'Active tool should be cleared to null');
console.log("PASS: selectCategory('all') successfully restores dashboard and resets pathname");

console.log("\n=== TEST 3: Navigate to tool and return via backToDashboard() ===");
await app.navigateToTool('calculator');
assert.strictEqual(dashView.style.display, 'none');
assert.strictEqual(window.location.pathname, '/tool/calculator');

app.backToDashboard(true);
assert.strictEqual(window.location.pathname, '/', 'Pathname should be reset to /');
assert.strictEqual(window.location.hash, '#dashboard', 'Hash should be #dashboard');
assert.strictEqual(dashView.style.display, 'block', 'Dashboard should be visible');
assert.strictEqual(viewport.style.display, 'none', 'Tool viewport should be hidden');
assert.strictEqual(app.activeTool, null, 'Active tool should be cleared to null');
console.log("PASS: backToDashboard() successfully restores dashboard from within tool");

console.log("\n=== TEST 4: When on /tool/xxx and hashchange fires with #dashboard ===");
await app.navigateToTool('calculator');
assert.strictEqual(dashView.style.display, 'none');

// Simulate user clicking a plain link <a href="#dashboard">
window.location.hash = '#dashboard';
app.handleRouting();

assert.strictEqual(dashView.style.display, 'block', 'Dashboard should be visible after handleRouting(#dashboard)');
assert.strictEqual(viewport.style.display, 'none', 'Tool viewport should be hidden');
assert.strictEqual(window.location.pathname, '/', 'Pathname should be cleaned up to /');
console.log("PASS: handleRouting with #dashboard correctly cleans up /tool/ and renders dashboard");

console.log("\n=== TEST 5: When on /tool/xxx and navigating to #favorites ===");
await app.navigateToTool('calculator');
assert.strictEqual(dashView.style.display, 'none');

window.location.hash = '#favorites';
app.handleRouting();

assert.strictEqual(dashView.style.display, 'block', 'Dashboard should be visible for favorites');
assert.strictEqual(app.activeCategory, 'fav', 'Active category should be fav');
assert.strictEqual(window.location.pathname, '/', 'Pathname should be reset to /');
console.log("PASS: handleRouting with #favorites correctly opens favorites from inside tool");

console.log("\n=== TEST 6: When on /tool/xxx and navigating to #plans ===");
await app.navigateToTool('calculator');
assert.strictEqual(dashView.style.display, 'none');

window.location.hash = '#plans';
app.handleRouting();

assert.strictEqual(plansView.style.display, 'block', 'Plans view should be visible');
assert.strictEqual(viewport.style.display, 'none', 'Tool viewport should be hidden');
assert.strictEqual(window.location.pathname, '/', 'Pathname should be reset to /');
console.log("PASS: handleRouting with #plans correctly opens plans from inside tool");

console.log("\n=== TEST 7: When on /tool/calculator and navigating to #tool/unit-converter ===");
await app.navigateToTool('calculator');
assert.strictEqual(app.activeTool, 'calculator');

window.location.hash = '#tool/unit-converter';
app.handleRouting();
// Wait for async import of unit-converter
await new Promise(r => setTimeout(r, 50));

assert.strictEqual(app.activeTool, 'unit-converter', 'Active tool should change to unit-converter');
assert.strictEqual(window.location.pathname, '/tool/unit-converter', 'Pathname should be updated to /tool/unit-converter');
console.log("PASS: Inter-tool navigation works without reloading the old tool");

console.log("\n=== TEST 8: Direct clean URL access /tool/calculator (no hash) ===");
window.location.pathname = '/tool/calculator';
window.location.hash = '';
app.handleRouting();
await new Promise(r => setTimeout(r, 50));
assert.strictEqual(app.activeTool, 'calculator', 'Active tool should be calculator');
console.log("PASS: Direct visit to /tool/calculator loads tool properly");

console.log("\n=== TEST 9: Direct clean URL access /dashboard (no hash) ===");
window.location.pathname = '/dashboard';
window.location.hash = '';
app.handleRouting();
assert.strictEqual(dashView.style.display, 'block', 'Dashboard should be rendered');
console.log("PASS: Direct visit to /dashboard renders dashboard");

console.log("\n========================================================");
console.log("🎉 ALL 9 ROUTING & NAVIGATION TESTS PASSED PERFECTLY! 🎉");
console.log("========================================================");
