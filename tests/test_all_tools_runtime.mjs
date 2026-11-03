import fs from 'fs';
import path from 'path';

// Pure JS lightweight DOM mock
class MockElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.classList = {
      _classes: new Set(),
      add: (c) => this.classList._classes.add(c),
      remove: (c) => this.classList._classes.delete(c),
      toggle: (c, force) => {
        if (force === undefined) {
          if (this.classList._classes.has(c)) this.classList._classes.delete(c);
          else this.classList._classes.add(c);
        } else if (force) {
          this.classList._classes.add(c);
        } else {
          this.classList._classes.delete(c);
        }
      },
      contains: (c) => this.classList._classes.has(c)
    };
    this.style = {};
    this.dataset = { tab: 'palette' };
    this.value = '#00f2fe';
    this.checked = false;
    this.innerText = '';
    this.innerHTML = '';
    this.listeners = {};
    this.attributes = {};
  }

  getAttribute(name) { return this.attributes[name] || null; }
  setAttribute(name, val) { this.attributes[name] = val; }
  appendChild(child) { this.children.push(child); return child; }
  removeChild(child) { this.children = this.children.filter(c => c !== child); return child; }
  addEventListener(evt, cb) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(cb);
  }
  getBoundingClientRect() { return { top: 0, left: 0, right: 650, bottom: 230, width: 650, height: 230, x: 0, y: 0 }; }
  remove() {
    if (this.parentElement) this.parentElement.removeChild(this);
  }
  toDataURL() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  }
  querySelector(sel) {
    const el = new MockElement('div');
    el.parentElement = this;
    return el;
  }
  querySelectorAll(sel) {
    const el1 = new MockElement('div');
    const el2 = new MockElement('div');
    el1.parentElement = this;
    el2.parentElement = this;
    return [el1, el2];
  }
  getContext() {
    return {
      drawImage: () => {},
      getImageData: () => ({ data: new Uint8ClampedArray(100) }),
      createLinearGradient: () => ({ addColorStop: () => {} }),
      createPattern: () => ({}),
      clearRect: () => {},
      fillRect: () => {},
      strokeRect: () => {},
      beginPath: () => {},
      closePath: () => {},
      stroke: () => {},
      fill: () => {},
      moveTo: () => {},
      lineTo: () => {},
      arc: () => {},
      save: () => {},
      restore: () => {},
      scale: () => {},
      rotate: () => {},
      translate: () => {},
      measureText: () => ({ width: 50 }),
      fillText: () => {},
      strokeText: () => {}
    };
  }
}

class MockDocument {
  constructor() {
    this.body = new MockElement('body');
  }
  createElement(tag) { return new MockElement(tag); }
  querySelector(sel) { return new MockElement('div'); }
  querySelectorAll(sel) { return [new MockElement('div'), new MockElement('div')]; }
  getElementById(id) { return new MockElement('div'); }
  addEventListener(evt, cb) {}
}

global.requestAnimationFrame = (cb) => 1;
global.cancelAnimationFrame = (id) => {};
global.document = new MockDocument();
global.window = {
  document: global.document,
  addEventListener: () => {},
  removeEventListener: () => {},
  location: { hash: '', search: '', pathname: '/', hostname: 'localhost' },
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  sessionStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  navigator: { clipboard: { writeText: async () => {} } }
};
global.Image = class {
  constructor() {
    this.src = '';
    this.onload = () => {};
    this.onerror = () => {};
  }
};
global.fetch = async () => ({
  ok: true,
  status: 200,
  json: async () => ([]),
  text: async () => ""
});
global.localStorage = global.window.localStorage;
global.sessionStorage = global.window.sessionStorage;
try {
  Object.defineProperty(globalThis, 'navigator', {
    value: global.window.navigator,
    writable: true,
    configurable: true
  });
} catch (e) {}

const appInstance = {
  showToast: (m) => {},
  copyText: () => {},
  getConfigValue: (k, def) => def,
  navigateToTool: (id) => {},
  colorLabState: { currentColors: [], useSharedClipPath: false },
  cssStudioState: {},
  tools: []
};

const appContent = fs.readFileSync('app.js', 'utf8');
const toolIdMatches = [...appContent.matchAll(/id:\s*"([a-zA-Z0-9_-]+)"/g)].map(m => m[1]);
const uniqueToolIds = [...new Set(toolIdMatches)].filter(id => fs.existsSync(path.join('tools', `${id}.js`)));

console.log(`Auditing runtime import, renderUI, and init for ${uniqueToolIds.length} tool modules...`);

let passed = 0;
let errors = [];

for (const id of uniqueToolIds) {
  try {
    const mod = await import(`../tools/${id}.js?t=${Date.now()}`);
    const tool = mod.default;
    if (!tool) {
      errors.push(`[${id}] No default export`);
      continue;
    }
    if (typeof tool.renderUI !== 'function') {
      errors.push(`[${id}] Missing renderUI function`);
      continue;
    }

    const html = tool.renderUI();
    if (!html || typeof html !== 'string') {
      errors.push(`[${id}] renderUI did not return a string`);
      continue;
    }

    const container = new MockElement('div');
    if (typeof tool.init === 'function') {
      tool.init(container, appInstance);
    }
    passed++;
  } catch (err) {
    errors.push(`[${id}] ${err.name}: ${err.message}`);
  }
}

console.log(`\nResults: ${passed} passed, ${errors.length} errors.`);
if (errors.length > 0) {
  console.error("FAILURES DETECTED:");
  errors.forEach(e => console.error(" - " + e));
  process.exit(1);
} else {
  console.log("All tools passed runtime import, renderUI, and init checks!"); process.exit(0);
}
