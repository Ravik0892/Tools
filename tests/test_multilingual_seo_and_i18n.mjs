import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

console.log("=== TESTING MULTILINGUAL INTERNATIONAL SEO & I18N SYSTEM ===\n");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`PASS: ${message}`);
    passed++;
  } else {
    console.error(`FAIL: ${message}`);
    failed++;
  }
}

// 1. Verify Localized Guide Directories and Files
const esDir = path.join(root, 'guides', 'es');
const ptDir = path.join(root, 'guides', 'pt');

assert(fs.existsSync(esDir), "guides/es directory exists");
assert(fs.existsSync(ptDir), "guides/pt directory exists");

const expectedGuides = [
  'compress-pdf.html',
  'pdf-utilities.html',
  'qr-studio.html',
  'json-formatter.html',
  'password-generator.html',
  'index.html'
];

expectedGuides.forEach(file => {
  const esFile = path.join(esDir, file);
  const ptFile = path.join(ptDir, file);

  assert(fs.existsSync(esFile) && fs.statSync(esFile).size > 1000, `Spanish guide exists and non-empty: guides/es/${file}`);
  assert(fs.existsSync(ptFile) && fs.statSync(ptFile).size > 1000, `Portuguese guide exists and non-empty: guides/pt/${file}`);

  if (fs.existsSync(esFile)) {
    const esContent = fs.readFileSync(esFile, 'utf8');
    assert(esContent.includes('<html lang="es">'), `guides/es/${file} has lang="es"`);
    assert(esContent.includes('hreflang="en"') && esContent.includes('hreflang="es"') && esContent.includes('hreflang="pt"'), `guides/es/${file} has full hreflang links`);
    assert(esContent.includes('canonical'), `guides/es/${file} has canonical tag`);
  }

  if (fs.existsSync(ptFile)) {
    const ptContent = fs.readFileSync(ptFile, 'utf8');
    assert(ptContent.includes('<html lang="pt">'), `guides/pt/${file} has lang="pt"`);
    assert(ptContent.includes('hreflang="en"') && ptContent.includes('hreflang="es"') && ptContent.includes('hreflang="pt"'), `guides/pt/${file} has full hreflang links`);
    assert(ptContent.includes('canonical'), `guides/pt/${file} has canonical tag`);
  }
});

// 2. Verify Reciprocal Hreflang in English counterparts
expectedGuides.filter(f => f !== 'index.html').forEach(file => {
  const enFile = path.join(root, 'guides', file);
  assert(fs.existsSync(enFile), `English guide exists: guides/${file}`);
  const enContent = fs.readFileSync(enFile, 'utf8');
  assert(enContent.includes('hreflang="es"') && enContent.includes('hreflang="pt"'), `guides/${file} has reciprocal hreflang links`);
});

// 3. Verify Master Guides Hub
const masterHub = path.join(root, 'guides', 'index.html');
const hubContent = fs.readFileSync(masterHub, 'utf8');
assert(hubContent.includes('hreflang="es"') && hubContent.includes('hreflang="pt"'), "guides/index.html has reciprocal hreflang tags");

// 4. Verify UI Language Selector in index.html
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
assert(indexHtml.includes('id="header-lang-pills"'), "index.html has #header-lang-pills");
assert(indexHtml.includes('data-lang="es"') && indexHtml.includes('data-lang="pt"'), "index.html has language switcher buttons for ES and PT");
assert(indexHtml.includes('data-i18n="dashboard"') && indexHtml.includes('data-i18n="tools"'), "index.html has data-i18n attributes on navigation elements");

// 5. Verify i18n system in app.js
const appJs = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
assert(appJs.includes('initLanguage()'), "app.js has initLanguage() call");
assert(appJs.includes('applyLanguage(lang'), "app.js has applyLanguage() implementation");
assert(appJs.includes('es:') && appJs.includes('pt:') && appJs.includes('de:') && appJs.includes('fr:'), "app.js has translations for es, pt, de, fr");
assert(appJs.includes('"serverDelay":') && appJs.includes('"clientPrivacy":') && appJs.includes('"surpriseMe":'), "app.js has hero metrics translations");
assert(appJs.includes('"filterAll":') && appJs.includes('"filterSingle":') && appJs.includes('"filterSuites":'), "app.js has filter chip translations");
assert(appJs.includes('"launchTool":') && appJs.includes('"openUtility":'), "app.js has launch action translations");
assert(appJs.includes('"searchPlaceholder":') && appJs.includes('"searchCpPlaceholder":'), "app.js has search placeholder translations");
assert(appJs.includes('"allTools":') && appJs.includes('"catDocs":') && appJs.includes('"catMedia":'), "app.js has category tabs translations");
assert(appJs.includes('toolTranslations: {'), "app.js has toolTranslations dictionary for localized cards");

// 6. Verify Sitemap.xml indexing
const sitemapXml = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
assert(sitemapXml.includes('https://omnitool.worldsneed.com/guides/es/'), "sitemap.xml contains Spanish guides hub");
assert(sitemapXml.includes('https://omnitool.worldsneed.com/guides/pt/'), "sitemap.xml contains Portuguese guides hub");
assert(sitemapXml.includes('https://omnitool.worldsneed.com/guides/es/compress-pdf'), "sitemap.xml contains Spanish compress-pdf");
assert(sitemapXml.includes('https://omnitool.worldsneed.com/guides/pt/compress-pdf'), "sitemap.xml contains Portuguese compress-pdf");

let capturedApp = null;
class CustomEventMock {
  constructor(type, init) {
    this.type = type;
    this.detail = init?.detail;
  }
}
const mockWindow = {
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() {},
  CustomEvent: CustomEventMock,
  location: { hostname: 'localhost', pathname: '/', hash: '' }
};
const mockDoc = {
  documentElement: { lang: 'en' },
  _elements: [
    { attr: { 'data-i18n': 'dashboard' }, textContent: '', innerHTML: '' },
    { attr: { 'data-i18n': 'serverDelay' }, textContent: '', innerHTML: '' },
    { attr: { 'data-i18n': 'filterSingle' }, textContent: '', innerHTML: '' }
  ],
  addEventListener() {},
  removeEventListener() {},
  querySelector(sel) {
    return {
      setAttribute(k, v) {},
      getAttribute(k) { return ''; }
    };
  },
  querySelectorAll(sel) {
    if (sel === '[data-i18n]') {
      return this._elements.map(el => ({
        getAttribute: k => el.attr[k],
        set textContent(v) { el.textContent = v; },
        get textContent() { return el.textContent; },
        set innerHTML(v) { el.innerHTML = v; },
        get innerHTML() { return el.innerHTML; }
      }));
    }
    return [];
  },
  getElementById(id) {
    if (id === 'tool-search') return { placeholder: '' };
    if (id === 'cp-search-input') return { placeholder: '' };
    if (id === 'header-lang-badge') return { textContent: '' };
    return null;
  }
};
global.CustomEvent = CustomEventMock;
const mockStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = v; }
};

try {
  const sandbox = new Function('window', 'document', 'localStorage', 'navigator', appJs + '; return app;');
  capturedApp = sandbox(mockWindow, mockDoc, mockStorage, { language: 'es-ES' });
} catch (e) {
  console.error("Failed to evaluate app sandbox:", e);
}

assert(capturedApp !== null, "app object successfully evaluated in mock sandbox");
if (capturedApp) {
  capturedApp.applyLanguage('es', false);
  assert(mockDoc.documentElement.lang === 'es', "applyLanguage('es') updates document.documentElement.lang to 'es'");
  assert(mockStorage.getItem('omnitool_language') === 'es', "omnitool_language stored in localStorage as 'es'");
  assert(capturedApp.toolTranslations.es['pdf-utilities'].name === 'Utilidades PDF Offline', "Spanish tool translation correctly registered");
  assert(capturedApp.toolTranslations.pt['pdf-utilities'].name === 'Utilitários PDF Offline', "Portuguese tool translation correctly registered");
  assert(capturedApp.toolTranslations.de['pdf-utilities'].name === 'Offline-PDF-Werkzeuge', "German tool translation correctly registered");
  assert(capturedApp.toolTranslations.fr['pdf-utilities'].name === 'Utilitaires PDF Hors-ligne', "French tool translation correctly registered");
}

console.log("\n=======================================================");
if (failed === 0) {
  console.log(`🎉 ALL ${passed} MULTILINGUAL SEO & I18N TESTS PASSED! 🎉`);
} else {
  console.error(`❌ ${failed} TESTS FAILED, ${passed} PASSED.`);
  process.exit(1);
}
console.log("=======================================================");

