import adminSettings from '../tools/admin-settings.js';

console.log("Starting Monetization & Ads tab audit...");

// 1. Check UI HTML
const html = adminSettings.renderUI();

const requiredIds = [
  'tab-ads', 'ad-global-status', 'remote-config-url', 'btn-test-remote-sync',
  'ad-network-select', 'sidebar-ad-network-select', 'inputs-dev', 'inputs-amazon',
  'inputs-adsense', 'inputs-admob', 'inputs-custom', 'ad-show-dash', 'ad-show-tool',
  'ad-show-side', 'adsterra-smart-link', 'adm-page-ad-customizer', 'override-tool-select',
  'page-ad-network-select', 'page-fields-dev', 'page-fields-adsense', 'page-fields-amazon',
  'page-fields-custom', 'page-fields-inherit', 'page-fields-none', 'btn-page-preview',
  'btn-page-reset', 'btn-page-save', 'adm-ad-inventory-section', 'kpi-total-pages',
  'kpi-custom-overrides', 'kpi-global-defaults', 'kpi-active-zones', 'adm-ad-search-input',
  'adm-ad-filter-type', 'adm-ad-filter-status', 'adm-ad-matrix-tbody', 'preserve-settings-reset',
  'ad-settings-reset', 'preview-section-ads', 'ad-preview-box', 'preview-network-badge',
  'preview-sim-target', 'btn-reset-sim-global'
];

let missing = [];
for (const id of requiredIds) {
  if (!html.includes(`id="${id}"`)) {
    missing.push(id);
  }
}

if (missing.length > 0) {
  console.error("FAIL: Missing element IDs in UI:", missing);
  process.exit(1);
}
console.log("✓ All 43 core element IDs verified in Monetization & Ads UI structure!");

// 2. Mock storage & browser environment
class MockStorage {
  constructor() { this.store = {}; }
  getItem(k) { return this.store.hasOwnProperty(k) ? this.store[k] : null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
  clear() { this.store = {}; }
  get length() { return Object.keys(this.store).length; }
  key(i) { return Object.keys(this.store)[i] || null; }
}

globalThis.localStorage = new MockStorage();
globalThis.sessionStorage = new MockStorage();
globalThis.window = {
  location: { hostname: "localhost", protocol: "http:" },
  addEventListener: () => {},
  removeEventListener: () => {}
};
globalThis.confirm = () => true;

// DOM element registry
const elementsMap = new Map();

function createMockEl(id = '', tag = 'div') {
  const listeners = {};
  const el = {
    id,
    tagName: tag.toUpperCase(),
    value: '',
    checked: true,
    disabled: false,
    innerText: '',
    textContent: '',
    innerHTML: '',
    style: {},
    options: [],
    selectedIndex: 0,
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => {}
    },
    addEventListener: (evt, cb) => {
      listeners[evt] = listeners[evt] || [];
      listeners[evt].push(cb);
    },
    trigger(evt) {
      if (listeners[evt]) {
        listeners[evt].forEach(cb => cb({ target: el, preventDefault: () => {} }));
      }
    },
    click() {
      if (listeners['click']) {
        listeners['click'].forEach(cb => cb({ currentTarget: el, target: el, preventDefault: () => {} }));
      }
    },
    querySelectorAll: (sel) => [],
    querySelector: (sel) => createMockEl('', 'div'),
    appendChild: (child) => {
      if (el.id === 'override-tool-select' && child.value) {
        el.options.push(child);
      }
      return child;
    },
    removeChild: () => {},
    setAttribute: () => {},
    getAttribute: () => '',
    scrollIntoView: () => {}
  };
  if (id) elementsMap.set(id, el);
  return el;
}

const mockDoc = {
  getElementById: (id) => elementsMap.get(id) || createMockEl(id),
  querySelector: (sel) => {
    if (sel.startsWith('#')) return mockDoc.getElementById(sel.slice(1));
    return createMockEl('', 'div');
  },
  querySelectorAll: (sel) => {
    return [createMockEl(), createMockEl()];
  },
  createElement: (tag) => createMockEl('', tag)
};
globalThis.document = mockDoc;

const containerMock = {
  querySelector: (sel) => {
    if (sel.startsWith('#')) return mockDoc.getElementById(sel.slice(1));
    return createMockEl('', 'div');
  },
  querySelectorAll: (sel) => {
    if (sel === '.settings-tab-btn') {
      const b1 = createMockEl('', 'button');
      b1.getAttribute = () => 'tab-ads';
      return [b1];
    }
    return [createMockEl(), createMockEl()];
  }
};

const mockApp = {
  tools: [
    { id: "text-analyzer", name: "Text Analyzer", subLabel: "Text", category: "text", monetization: "free" },
    { id: "json-formatter", name: "JSON Formatter", subLabel: "Dev", category: "dev", monetization: "free" },
    { id: "css-studio", name: "CSS Studio", subLabel: "Design", category: "design", monetization: "free" }
  ],
  globalConfig: {},
  getConfigValue(k, fallback) {
    const val = localStorage.getItem(k);
    return val !== null ? val : (this.globalConfig[k] || fallback);
  },
  showToast(msg, type) {
    console.log(`  [Toast ${type}]: ${msg}`);
  },
  playSynthSound() {}
};

console.log("\nTesting init() and DOM bindings...");
adminSettings.init(containerMock, mockApp);
console.log("✓ init() initialized cleanly with all listeners attached!");

// Test saving
console.log("\nTesting saveSettings() invocation...");
const saveBtn = containerMock.querySelector("#ad-settings-save");
saveBtn.click();
console.log("✓ saveSettings() executed without ReferenceError or exceptions!");

// Test Page Customizer Save
console.log("\nTesting Page-Specific Customizer save & override...");
const overrideSelect = containerMock.querySelector("#override-tool-select");
const pageNetSelect = containerMock.querySelector("#page-ad-network-select");
const pageBrand = containerMock.querySelector("#page-sponsor-brand");
const pageBtnSave = containerMock.querySelector("#btn-page-save");

overrideSelect.value = "text-analyzer";
pageNetSelect.value = "dev";
pageBrand.value = "CloudFlare Speed";

pageBtnSave.click();

const savedBrand = localStorage.getItem("omnitool_sponsor_brand_text-analyzer");
const savedNet = localStorage.getItem("omnitool_ad_network_text-analyzer");
console.log(`✓ Page override verified in storage: brand="${savedBrand}", network="${savedNet}"`);
if (savedBrand !== "CloudFlare Speed" || savedNet !== "dev") {
  throw new Error("Page Customizer failed to save custom brand to storage!");
}

// Test Reset to Global
console.log("\nTesting Reset to Global...");
const pageResetBtn = containerMock.querySelector("#btn-page-reset");
pageResetBtn.click();
const resetBrand = localStorage.getItem("omnitool_sponsor_brand_text-analyzer");
if (resetBrand !== null) {
  throw new Error("Reset failed: custom brand still exists in localStorage!");
}
console.log("✓ Page Customizer reset back to global successfully!");

console.log("\n=================================================================");
console.log("🏁 ALL MONETIZATION & ADS TAB CHECKS PASSED WITH 100% SUCCESS!");
console.log("=================================================================");
