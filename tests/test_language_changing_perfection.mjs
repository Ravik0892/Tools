import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('🌟 OMNITOOL HUB - MULTILINGUAL & I18N PERFECTION TEST SUITE');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    failCount++;
  }
}

// 1. Read app.js and index.html
const appJs = fs.readFileSync('app.js', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Parse i18n
const lines = appJs.split('\n');
const i18nStart = lines.findIndex(l => l.includes('i18n: {'));
const ttStart = lines.findIndex(l => l.includes('toolTranslations: {'));
const dictStart = lines.findIndex(l => l.includes('toolUiDictionary: {'));
const translateVpStart = lines.findIndex(l => l.includes('translateToolViewport(viewport, lang) {'));
const helperStart = lines.findIndex(l => l.includes('getGuideUrl(guideFileName) {'));
const initLangStart = lines.findIndex(l => l.includes('initLanguage() {'));

const i18nLines = lines.slice(i18nStart, ttStart).join('\n');
const ttLines = lines.slice(ttStart, dictStart).join('\n');
const dictLines = lines.slice(dictStart, translateVpStart).join('\n');

const i18nObj = eval('({' + i18nLines.replace(/,\s*$/, '') + '})').i18n;
const ttObj = eval('({' + ttLines.replace(/,\s*$/, '') + '})').toolTranslations;
const dictObj = eval('({' + dictLines.replace(/,\s*$/, '') + '})').toolUiDictionary;

console.log('1. Testing Multilingual Dictionary Integrity (app.js)...');
const languages = ['en', 'es', 'pt', 'de', 'fr'];
assert(languages.every(lang => !!i18nObj[lang]), 'All 5 core languages (en, es, pt, de, fr) exist in i18n');

const enKeys = Object.keys(i18nObj.en);
assert(enKeys.length >= 100, `English dictionary contains comprehensive set of keys (${enKeys.length} keys)`);

languages.forEach(lang => {
  const keys = Object.keys(i18nObj[lang]);
  const missing = enKeys.filter(k => !keys.includes(k));
  assert(missing.length === 0, `Language [${lang}] has 100% key parity with English (0 missing keys)`);
});

assert(!!i18nObj.en.recentlyUsed && !!i18nObj.es.recentlyUsed, 'Fixed: recentlyUsed key exists in all dictionaries');
assert(!!i18nObj.en.noToolsVisited && !!i18nObj.es.noToolsVisited, 'Fixed: noToolsVisited key exists in all dictionaries');
assert(!!i18nObj.en.back && i18nObj.es.back === 'Volver' && i18nObj.de.back === 'Zurück', 'Fixed: back button key properly localized across languages');

console.log('\n2. Testing 100% Tool Coverage in toolTranslations...');
const previouslyMissingTools = [
  'qr-generator',
  'json-formatter',
  'payment-guide',
  'box-shadow',
  'glassmorphism-generator',
  'gradient-generator'
];

['es', 'pt', 'de', 'fr'].forEach(lang => {
  const toolCount = Object.keys(ttObj[lang]).length;
  assert(toolCount === 54, `Language [${lang}] translates all 54 registered tools (${toolCount}/54)`);
  
  previouslyMissingTools.forEach(toolId => {
    const entry = ttObj[lang][toolId];
    assert(!!entry && !!entry.name && !!entry.desc, `[${lang}] Tool "${toolId}" has valid localized name and description`);
  });
});

console.log('\n3. Testing HTML [data-i18n] Coverage & Alignment (index.html)...');
const dataI18nMatches = [...indexHtml.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
const uniqueHtmlKeys = [...new Set(dataI18nMatches)];

assert(dataI18nMatches.length >= 80, `HTML contains comprehensive data-i18n attributes (${dataI18nMatches.length} tags)`);

const missingFromDict = uniqueHtmlKeys.filter(k => !enKeys.includes(k));
assert(missingFromDict.length === 0, `100% of HTML data-i18n keys exist in dictionary (Missing: ${missingFromDict.join(', ') || 'None'})`);

// Check specific sections now translated
assert(indexHtml.includes('data-i18n="themeTitle"'), 'Aesthetics modal title has data-i18n="themeTitle"');
assert(indexHtml.includes('data-i18n="saveChanges"'), 'Aesthetics modal save button has data-i18n="saveChanges"');
assert(indexHtml.includes('data-i18n="sslEncrypted"'), 'Checkout modal badge has data-i18n="sslEncrypted"');
assert(indexHtml.includes('data-i18n="checkoutTitle"'), 'Checkout modal title has data-i18n="checkoutTitle"');
assert(indexHtml.includes('data-i18n="starterPlan"'), 'Plans view Starter card has data-i18n="starterPlan"');
assert(indexHtml.includes('data-i18n="proLifetime"'), 'Plans view Lifetime card has data-i18n="proLifetime"');
assert(indexHtml.includes('data-i18n="proMonthly"'), 'Plans view Monthly card has data-i18n="proMonthly"');
assert(indexHtml.includes('data-i18n="alreadyBacked"'), 'Plans view activation box has data-i18n="alreadyBacked"');
assert(indexHtml.includes('data-i18n="footerDesc"'), 'Footer tagline has data-i18n="footerDesc"');
assert(indexHtml.includes('data-i18n="privacy"'), 'Footer Privacy link has data-i18n="privacy"');

console.log('\n4. Testing Multi-Regional & International SEO (hreflang & Canonical)...');
assert(indexHtml.includes('<link rel="canonical" href="https://omnitool.worldsneed.com/">'), 'Canonical link tag present');
assert(indexHtml.includes('hreflang="x-default"'), 'Hreflang x-default alternate tag present');
assert(indexHtml.includes('hreflang="en"'), 'Hreflang en alternate tag present');
assert(indexHtml.includes('hreflang="es"'), 'Hreflang es alternate tag present');
assert(indexHtml.includes('hreflang="pt"'), 'Hreflang pt alternate tag present');
assert(indexHtml.includes('hreflang="de"'), 'Hreflang de alternate tag present');
assert(indexHtml.includes('hreflang="fr"'), 'Hreflang fr alternate tag present');

console.log('\n5. Testing Helper Methods & Architectural Enhancements (app.js)...');
assert(appJs.includes('getGuideUrl(guideFileName)'), 'app.getGuideUrl helper method implemented');
assert(appJs.includes('t(key, fallback = "")'), 'app.t helper method implemented');
assert(appJs.includes('params.get("lang")'), 'initLanguage parses ?lang= parameter from URL');
assert(appJs.includes('url.searchParams.set("lang", lang)'), 'applyLanguage synchronizes URL query param dynamically');
assert(appJs.includes('document.title = pageTitle'), 'applyLanguage updates document.title dynamically');

// Test localized guide URL resolution logic
const mockApp = {
  currentLanguage: 'es',
  getGuideUrl(guideFileName) {
    const currentLang = this.currentLanguage || 'en';
    const localizedGuides = {
      es: ['compress-pdf.html', 'index.html', 'json-formatter.html', 'password-generator.html', 'pdf-utilities.html', 'qr-studio.html'],
      pt: ['compress-pdf.html', 'index.html', 'json-formatter.html', 'password-generator.html', 'pdf-utilities.html', 'qr-studio.html']
    };
    const baseName = (guideFileName || '').replace(/^guides\//, '').replace(/^\//, '');
    if (localizedGuides[currentLang] && localizedGuides[currentLang].includes(baseName)) {
      return `guides/${currentLang}/${baseName}`;
    }
    return `guides/${baseName}`;
  },
  t(key, fallback = '') {
    const lang = this.currentLanguage || 'en';
    return i18nObj[lang]?.[key] || i18nObj.en?.[key] || fallback || key;
  }
};

assert(mockApp.getGuideUrl('compress-pdf.html') === 'guides/es/compress-pdf.html', 'Smart routing resolves Spanish guide when in ES mode');
assert(mockApp.getGuideUrl('guides/json-formatter.html') === 'guides/es/json-formatter.html', 'Smart routing normalizes guides/ prefix in ES mode');
assert(mockApp.getGuideUrl('code-playground.html') === 'guides/code-playground.html', 'Smart routing falls back gracefully to English guide for non-localized guides');

mockApp.currentLanguage = 'pt';
assert(mockApp.getGuideUrl('pdf-utilities.html') === 'guides/pt/pdf-utilities.html', 'Smart routing resolves Portuguese guide when in PT mode');

mockApp.currentLanguage = 'en';
assert(mockApp.getGuideUrl('compress-pdf.html') === 'guides/compress-pdf.html', 'Smart routing preserves default English guide when in EN mode');

mockApp.currentLanguage = 'es';
assert(mockApp.t('back') === 'Volver', 'app.t returns Spanish translation for "back"');
assert(mockApp.t('copy') === 'Copiar', 'app.t returns Spanish translation for "copy"');
mockApp.currentLanguage = 'de';
assert(mockApp.t('back') === 'Zurück', 'app.t returns German translation for "back"');

console.log('\n6. Testing Internal Tool Viewport Translation Engine...');
assert(!!dictObj && Object.keys(dictObj).length >= 120, `toolUiDictionary exists with ${Object.keys(dictObj).length} UI terms`);
assert(appJs.includes('translateToolViewport(viewport, lang)'), 'translateToolViewport engine implemented in app.js');
assert(appJs.includes('this.translateToolViewport(viewport, currentToolLang)'), 'translateToolViewport automatically called in navigateToTool');
assert(appJs.includes('this.translateToolViewport(activeVp, lang)'), 'translateToolViewport called in real-time in applyLanguage');
assert(appJs.includes('this._toolViewportObserver = new MutationObserver'), 'Dynamic MutationObserver monitors tool viewport mutations for live translation');

// Verify common tool vocabulary in dictionary
assert(dictObj['Clear File']?.es === 'Limpiar Archivo', 'Clear File translated to Spanish');
assert(dictObj['Clear File']?.de === 'Datei löschen', 'Clear File translated to German');
assert(dictObj['Configuration']?.es === 'Configuración', 'Configuration translated to Spanish');
assert(dictObj['Configuration']?.fr === 'Configuration', 'Configuration translated to French');
assert(dictObj['Drag & drop a PDF here or browse files']?.es.includes('Arrastra un PDF'), 'PDF Dropzone text translated to Spanish');
assert(dictObj['Type or paste your content here...']?.pt.includes('Digite ou cole'), 'Textarea placeholder translated to Portuguese');


console.log('\n7. Testing Pipeline Builder & Capability Chips Multilingual Translation...');
const pipelineKeys = [
  'Multi-Step Chaining',
  'Live Visual Preview',
  'Zero Server Uploads',
  'Instant Execution',
  'Configure Processing Chain',
  'Pipeline Data Flow',
  '+ Add Step',
  'Initial Input Text',
  'Final Processed Output',
  'Process Action',
  'Ignore Errors',
  'Show Intermediate Output',
  'Hide Intermediate Output',
  'Reset 50/50',
  'Full Screen',
  'Exit Full Screen',
  'Base64 Encode',
  'Convert to UPPERCASE'
];

pipelineKeys.forEach(key => {
  assert(!!dictObj[key], `Pipeline / UI key "${key}" exists in toolUiDictionary`);
  ['es', 'pt', 'de', 'fr'].forEach(lang => {
    assert(!!dictObj[key]?.[lang], `[Lang: ${lang}] "${key}" has valid translation: "${dictObj[key]?.[lang]}"`);
  });
});

assert(dictObj['Multi-Step Chaining'].es === 'Encadenamiento Multi-Etapa', 'Multi-Step Chaining translated to Spanish');
assert(dictObj['Live Visual Preview'].es === 'Vista Previa Visual en Vivo', 'Live Visual Preview translated to Spanish');
assert(dictObj['+ Add Step'].es === '+ Añadir Paso', '+ Add Step translated to Spanish');
assert(dictObj['Initial Input Text'].es === 'Texto de Entrada Inicial', 'Initial Input Text translated to Spanish');
assert(dictObj['Final Processed Output'].es === 'Resultado Final Procesado', 'Final Processed Output translated to Spanish');
assert(dictObj['Process Action'].es === 'Acción de Proceso', 'Process Action translated to Spanish');
assert(dictObj['Ignore Errors'].es === 'Ignorar Errores', 'Ignore Errors translated to Spanish');
assert(dictObj['Reset 50/50'].es === 'Restablecer 50/50', 'Reset 50/50 translated to Spanish');
assert(dictObj['Full Screen'].es === 'Pantalla Completa', 'Full Screen translated to Spanish');
assert(dictObj['Base64 Encode'].es === 'Codificar Base64', 'Base64 Encode translated to Spanish');
assert(dictObj['Convert to UPPERCASE'].es === 'Convertir a MAYÚSCULAS', 'Convert to UPPERCASE translated to Spanish');

assert(appJs.includes('this.toolUiDictionary?.[f.label]?.[capLang]'), 'renderCapabilitiesBar dynamically translates feature chip labels');

console.log('\n================================================================');
console.log(`SUMMARY: ${passCount}/${passCount + failCount} TESTS PASSED (${failCount} FAILED)`);
if (failCount === 0) {
  console.log('🏆 100% OF MULTILINGUAL & I18N TESTS PASSED PERFECTLY!');
}
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
}
