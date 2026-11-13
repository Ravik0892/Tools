import fs from 'fs';
import assert from 'assert';

console.log("=== AUDITING UPGRADED LEGAL & COMPLIANCE PAGES ===");

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
  querySelector(selector) {
    if (selector.startsWith('meta[name="description"]')) return global.metaDescEl;
    if (selector.startsWith('link[rel="canonical"]')) return global.canonicalEl;
    return null;
  }
}

global.metaDescEl = new MockElement('meta');
global.canonicalEl = new MockElement('link');

global.window = {
  location: { hash: '', pathname: '/', protocol: 'https:' },
  sessionStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  scrollTo() {},
  history: { pushState() {} },
  addEventListener() {},
  removeEventListener() {},
  matchMedia() { return { matches: false, addEventListener() {}, removeEventListener() {} }; }
};

const elements = {
  'active-tool-viewport': new MockElement('div', 'active-tool-viewport'),
  'dashboard-view': new MockElement('div', 'dashboard-view'),
  'header-view-title': new MockElement('div', 'header-view-title'),
  'toast-container': new MockElement('div', 'toast-container'),
  'global-search-input': new MockElement('input', 'global-search-input'),
  'tool-count-badge': new MockElement('span', 'tool-count-badge')
};

global.document = {
  title: 'OmniTool Hub',
  getElementById(id) {
    if (!elements[id]) {
      elements[id] = new MockElement('div', id);
    }
    return elements[id];
  },
  querySelector(sel) {
    if (sel.startsWith('meta[name="description"]')) return global.metaDescEl;
    if (sel.startsWith('link[rel="canonical"]')) return global.canonicalEl;
    return null;
  },
  querySelectorAll() { return []; },
  createElement(tag) { return new MockElement(tag); },
  body: new MockElement('body'),
  addEventListener() {},
  removeEventListener() {}
};

// Evaluate app.js
const appCode = fs.readFileSync('app.js', 'utf8');
const fn = new Function('window', 'document', 'navigator', 'location', 'sessionStorage', 'localStorage', appCode + '\nreturn window.app;');
const app = fn(global.window, global.document, {}, global.window.location, global.window.sessionStorage, global.window.localStorage);

if (!app) {
  console.error("[FAIL] app not initialized");
  process.exit(1);
}

const tests = [
  {
    page: "privacy",
    checks: [
      "Privacy Philosophy: Local-First Autonomy with Transparent Architecture",
      "Free Plan",
      "Paid Plan (Upcoming)",
      "End-to-End Encrypted Cloud Storage",
      "temp-mail",
      "pdf-ai",
      "generativelanguage.googleapis.com",
      "Google Analytics 4",
      "Google AdSense",
      "Razorpay, PayPal, Gumroad, and UPI",
      "GDPR",
      "CCPA / CPRA",
      "privacy@omnitool.worldsneed.com"
    ]
  },
  {
    page: "terms",
    checks: [
      "100% User Ownership of Generated Output",
      "14-Day Money-Back Guarantee",
      "Acceptable Use &amp; Prohibited Conduct",
      "Upcoming Cloud Server Terms",
      "Limitation of Liability",
      "support@omnitool.worldsneed.com"
    ]
  },
  {
    page: "refund",
    checks: [
      "14-Day Full Satisfaction Guarantee",
      "billing@omnitool.worldsneed.com",
      "5 to 7 business days",
      "Subscription Cancellation Policy"
    ]
  },
  {
    page: "cookies",
    checks: [
      "localStorage",
      "Performance &amp; Analytics",
      "Google AdSense",
      "Zero-Inspection Policy on Tool Data"
    ]
  },
  {
    page: "about",
    checks: [
      "About OmniTool Hub & WorldsNeed",
      "WorldsNeed",
      "Upcoming Hybrid Architecture Roadmap",
      "The Free Local-First Pillar",
      "The Optional Cloud Server Pillar"
    ]
  },
  {
    page: "contact",
    checks: [
      "Contact Us & Departmental Support",
      "contact@omnitool.worldsneed.com",
      "support@omnitool.worldsneed.com",
      "ads@omnitool.worldsneed.com",
      "billing@omnitool.worldsneed.com",
      "privacy@omnitool.worldsneed.com",
      "Amazon Appstore &amp; Mobile Publishing Compliance",
      "24–48 business hours"
    ]
  }
];

let failed = 0;

for (const t of tests) {
  try {
    app.renderLegalPage(t.page);
    const viewport = elements['active-tool-viewport'];
    const content = viewport.innerHTML;

    for (const term of t.checks) {
      if (!content.includes(term)) {
        console.error(`[FAIL] Page "${t.page}" is missing term: "${term}"`);
        failed++;
      }
    }

    // Check title
    if (!global.document.title.includes("OmniTool Hub")) {
      console.error(`[FAIL] Page "${t.page}" did not set document.title properly: "${global.document.title}"`);
      failed++;
    } else {
      console.log(`[PASS] Page "${t.page}" rendered correctly with title: "${global.document.title}"`);
    }

    // Check canonical
    const canonical = global.canonicalEl.getAttribute("href");
    if (!canonical || !canonical.includes(t.page)) {
      console.error(`[FAIL] Page "${t.page}" canonical link not updated: "${canonical}"`);
      failed++;
    }

  } catch (err) {
    console.error(`[ERROR] Rendering page "${t.page}" crashed:`, err);
    failed++;
  }
}

if (failed === 0) {
  console.log("\n🎉 ALL 6 LEGAL & COMPLIANCE PAGES PASSED VALIDATION WITH 100% INTEGRITY! 🎉\n");
} else {
  console.error(`\n❌ ${failed} checks failed!\n`);
  process.exit(1);
}
