import fs from 'fs';

console.log('====================================================');
console.log('🔍 LIVE VERIFICATION OF CURRENT CODEBASE (NO SCREENSHOTS)');
console.log('====================================================\n');

const appJs = fs.readFileSync('app.js', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const pipelineJs = fs.readFileSync('tools/pipeline-builder.js', 'utf8');

// 1. Verify URL parameter handling during navigation
console.log('--- TEST 1: URL & ROUTING LANG PRESERVATION ---');
const navStart = appJs.indexOf('async navigateToTool(toolId, updateHash = true) {');
if (navStart !== -1) {
  const code = appJs.slice(navStart, navStart + 600);
  const preservesSearch = code.includes('getLangQueryString');
  console.log(`[navigateToTool] Preserves ?lang= parameter: ${preservesSearch ? '✅ YES' : '❌ NO'}`);
  const pushStateMatch = code.match(/window\.history\.pushState\([^;]+\);/);
  if (pushStateMatch) console.log(`  Actual pushState code: ${pushStateMatch[0]}`);
}

const routingStart = appJs.indexOf('handleRouting() {');
if (routingStart !== -1) {
  const code = appJs.slice(routingStart, routingStart + 1200);
  const replaceStateMatch = code.match(/window\.history\.replaceState\([^;]+\);/);
  if (replaceStateMatch) {
    const preserves = replaceStateMatch[0].includes('getLangQueryString');
    console.log(`[handleRouting #tool/ promote] Preserves ?lang=: ${preserves ? '✅ YES' : '❌ NO'}`);
    console.log(`  Actual replaceState code: ${replaceStateMatch[0]}`);
  }
}

// 2. Verify footer links in current index.html
console.log('\n--- TEST 2: FOOTER LINKS IN CURRENT INDEX.HTML ---');
const footerLinksMatch = indexHtml.match(/<div class="footer-links">([\s\S]*?)<\/div>/);
if (footerLinksMatch) {
  const lines = footerLinksMatch[1].split('\n').filter(l => l.includes('<a '));
  lines.forEach(l => {
    const text = l.replace(/<[^>]+>/g, '').trim();
    const hasI18n = l.includes('data-i18n');
    const i18nVal = hasI18n ? l.match(/data-i18n="([^"]+)"/)?.[1] : 'NONE';
    console.log(`  Link "${text}": data-i18n = ${i18nVal} ${hasI18n ? '✅' : '❌'}`);
  });
}

const pwaBadgeMatch = indexHtml.match(/<div class="footer-status-badge">([\s\S]*?)<\/div>/);
if (pwaBadgeMatch) {
  const hasI18n = pwaBadgeMatch[0].includes('data-i18n');
  console.log(`  PWA Badge: ${pwaBadgeMatch[0].replace(/\s+/g, ' ')} -> data-i18n: ${hasI18n ? '✅ YES' : '❌ NO'}`);
}

// 3. Verify applyLanguage behavior for dynamic tool elements
console.log('\n--- TEST 3: APPLYLANGUAGE DYNAMIC IN-TOOL REFRESH ---');
const applyLangStart = appJs.indexOf('applyLanguage(lang, showToast = false) {');
const applyLangEnd = appJs.indexOf('// Monetization Highlights Registry', applyLangStart);
if (applyLangStart !== -1 && applyLangEnd !== -1) {
  const code = appJs.slice(applyLangStart, applyLangEnd);
  const callsInjectBenefits = code.includes('injectGuideBenefits');
  console.log(`[applyLanguage] Calls injectGuideBenefits when tool is active: ${callsInjectBenefits ? '✅ YES' : '❌ NO'}`);
  
  const callsWorkflowBridges = code.includes('renderWorkflowBridges');
  console.log(`[applyLanguage] Updates workflow bridges: ${callsWorkflowBridges ? '✅ YES' : '❌ NO'}`);
}

// 4. Verify toolBenefits data structure (localized vs English-only)
console.log('\n--- TEST 4: TOOLBENEFITS CONTENT IN CURRENT APP.JS ---');
const hasBenefitsTranslations = appJs.includes('toolBenefitsTranslations: {');
console.log(`  Language support in toolBenefits: ${hasBenefitsTranslations ? '✅ MULTILINGUAL (toolBenefitsTranslations defined)' : '❌ ENGLISH-ONLY'}`);

// 5. Verify renderWorkflowBridges guard and hint localization
console.log('\n--- TEST 5: WORKFLOW BRIDGES LOGIC IN CURRENT APP.JS ---');
const wfStart = appJs.indexOf('renderWorkflowBridges(viewport, toolId) {');
if (wfStart !== -1) {
  const code = appJs.slice(wfStart, wfStart + 500);
  const hasGuard = code.includes('if (viewport.querySelector(".tool-workflow-bridge")) return;');
  console.log(`[renderWorkflowBridges] Has blocking return guard: ${hasGuard ? '❌ YES' : '✅ NO (Replaces cleanly)'}`);
}

// 6. Verify dynamic search placeholder rotation
console.log('\n--- TEST 6: DYNAMIC SEARCH PLACEHOLDER ROTATION ---');
const searchPromptStart = appJs.indexOf('initDynamicSearchPlaceholder() {');
const searchPromptEnd = appJs.indexOf('toggleHomeGuides() {', searchPromptStart);
if (searchPromptStart !== -1 && searchPromptEnd !== -1) {
  const code = appJs.slice(searchPromptStart, searchPromptEnd);
  const usesLang = code.includes('promptsByLang[lang]');
  console.log(`[initDynamicSearchPlaceholder] Localizes rotating prompts by language: ${usesLang ? '✅ YES' : '❌ NO'}`);
}

// 7. Verify trailing colon handling in translateToolViewport
console.log('\n--- TEST 7: TRANSLATETOOLVIEWPORT PUNCTUATION & SELECTORS ---');
const transVpStart = appJs.indexOf('translateToolViewport(viewport, lang) {');
const transVpEnd = appJs.indexOf('getGuideUrl(guideFileName) {', transVpStart);
if (transVpStart !== -1 && transVpEnd !== -1) {
  const code = appJs.slice(transVpStart, transVpEnd);
  const handlesColons = code.includes('orig.endsWith(":")');
  console.log(`[translateToolViewport] Normalizes trailing colons (e.g. "Add Pipeline Steps:"): ${handlesColons ? '✅ YES' : '❌ NO'}`);

  const hasFlowBadge = code.includes('.pipeline-flow-badge');
  console.log(`[translateToolViewport] Contains .pipeline-flow-badge selector: ${hasFlowBadge ? '✅ YES' : '❌ NO'}`);

  const hasFlowOp = code.includes('.pipeline-flow-op');
  console.log(`[translateToolViewport] Contains .pipeline-flow-op selector: ${hasFlowOp ? '✅ YES' : '❌ NO'}`);
}

console.log('\n====================================================');
console.log('🏁 ACTUAL AUDIT COMPLETE');
console.log('====================================================');
