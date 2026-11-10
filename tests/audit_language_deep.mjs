import fs from 'fs';

const appJs = fs.readFileSync('app.js', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Parse i18n
const lines = appJs.split('\n');
const i18nStart = lines.findIndex(l => l.includes('i18n: {'));
const ttStart = lines.findIndex(l => l.includes('toolTranslations: {'));
const dictStart = lines.findIndex(l => l.includes('toolUiDictionary: {'));
const translateVpStart = lines.findIndex(l => l.includes('translateToolViewport(viewport, lang) {'));

const i18nObj = eval('({' + lines.slice(i18nStart, ttStart).join('\n').replace(/,\s*$/, '') + '})').i18n;
const ttObj = eval('({' + lines.slice(ttStart, dictStart).join('\n').replace(/,\s*$/, '') + '})').toolTranslations;
const dictObj = eval('({' + lines.slice(dictStart, translateVpStart).join('\n').replace(/,\s*$/, '') + '})').toolUiDictionary;

console.log('=== 1. I18N STATS ===');
const langs = Object.keys(i18nObj);
console.log('Registered languages:', langs);
for (const l of langs) {
  console.log(`Lang [${l}]: ${Object.keys(i18nObj[l]).length} keys`);
}

const enKeys = new Set(Object.keys(i18nObj.en));
for (const l of langs) {
  const keys = new Set(Object.keys(i18nObj[l]));
  const missing = [...enKeys].filter(k => !keys.has(k));
  const extra = [...keys].filter(k => !enKeys.has(k));
  if (missing.length) console.log(`[${l}] Missing keys:`, missing);
  if (extra.length) console.log(`[${l}] Extra keys:`, extra);
}

// 2. Check HTML data-i18n tags
console.log('\n=== 2. HTML DATA-I18N COVERAGE ===');
const htmlMatches = [...indexHtml.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
const uniqueHtmlKeys = [...new Set(htmlMatches)];
console.log(`Total data-i18n tags in HTML: ${htmlMatches.length}`);
console.log(`Unique data-i18n keys: ${uniqueHtmlKeys.length}`);
const missingHtmlKeys = uniqueHtmlKeys.filter(k => !enKeys.has(k));
console.log('HTML data-i18n keys missing from i18n.en:', missingHtmlKeys);

// 3. Check toolTranslations
console.log('\n=== 3. TOOL TRANSLATIONS COVERAGE ===');
const toolsBlock = lines.slice(11, 592).join('\n');
const registeredTools = [...toolsBlock.matchAll(/id:\s*"([^"]+)"/g)].map(m => m[1]);
console.log(`Registered tools in app.tools: ${registeredTools.length}`);

for (const l of ['es', 'pt', 'de', 'fr']) {
  const translated = Object.keys(ttObj[l] || {});
  const missing = registeredTools.filter(id => !translated.includes(id));
  console.log(`[${l}] Translated: ${translated.length}/${registeredTools.length}. Missing (${missing.length}):`, missing);
}

// 4. Check UI dictionary
console.log('\n=== 4. TOOL UI DICTIONARY COVERAGE ===');
console.log(`UI Dictionary entries: ${Object.keys(dictObj).length}`);
// Check if all dictionary entries have all languages
let missingLangInDict = 0;
for (const [term, trans] of Object.entries(dictObj)) {
  for (const l of ['es', 'pt', 'de', 'fr']) {
    if (!trans[l]) {
      missingLangInDict++;
      console.log(`Term "${term}" missing [${l}] translation!`);
    }
  }
}
if (missingLangInDict === 0) {
  console.log('All dictionary entries have 100% full translations across all 4 languages (es, pt, de, fr)!');
}
