import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const appJs = fs.readFileSync(path.join(projectRoot, 'app.js'), 'utf8');

console.log('=== 1. VERIFYING APP.JS ROUTING & SEO ENGINE ===');
const checks = [
  ['subtoolsRegistry present', appJs.includes('subtoolsRegistry: {')],
  ['syncSubtab function present', appJs.includes('syncSubtab(suiteId, tabId, options')],
  ['registerTabSwitcher function present', appJs.includes('registerTabSwitcher(suiteId, switcherFn')],
  ['updateToolSEO function present', appJs.includes('updateToolSEO(toolId, subtoolId')],
  ['handleRouting hash tab switcher check', appJs.includes('this._activeTabSwitchers[redirect.suiteId](redirect.subtab)')],
  ['navigateToTool calls updateToolSEO', appJs.includes('this.updateToolSEO(toolId, this.activeSubtool)')],
];

let allPassed = true;
checks.forEach(([label, pass]) => {
  console.log(`- ${label}: ${pass ? 'PASS' : 'FAIL'}`);
  if (!pass) allPassed = false;
});

console.log('\n=== 2. VERIFYING ALL 16 MULTI-TAB SUITES ===');
const suites = [
  { file: 'css-studio.js', id: 'css-studio', checkSync: 'appInstance.syncSubtab("css-studio"' },
  { file: 'security-suite.js', id: 'security-suite', checkSync: 'appInstance.syncSubtab("security-suite"' },
  { file: 'crypto-suite.js', id: 'crypto-suite', checkSync: 'appInstance.syncSubtab("crypto-suite"' },
  { file: 'formatter-suite.js', id: 'formatter-suite', checkSync: 'appInstance.syncSubtab("formatter-suite"' },
  { file: 'text-encoder-suite.js', id: 'text-encoder-suite', checkSync: 'appInstance.syncSubtab("text-encoder-suite"' },
  { file: 'color-lab.js', id: 'color-lab', checkSync: 'appInstance.syncSubtab("color-lab"' },
  { file: 'datetime-suite.js', id: 'datetime-suite', checkSync: 'appInstance.syncSubtab("datetime-suite"' },
  { file: 'qr-studio.js', id: 'qr-studio', checkSync: 'appInstance.syncSubtab("qr-studio"' },
  { file: 'audio-suite.js', id: 'audio-suite', checkSync: 'appInstance.syncSubtab("audio-suite"' },
  { file: 'pdf-converter-hub.js', id: 'pdf-converter-hub', checkSync: 'appInstance.syncSubtab("pdf-converter-hub"' },
  { file: 'pdf-editor-suite.js', id: 'pdf-editor-suite', checkSync: 'appInstance.syncSubtab("pdf-editor-suite"' },
  { file: 'pdf-security-suite.js', id: 'pdf-security-suite', checkSync: 'appInstance.syncSubtab("pdf-security-suite"' },
  { file: 'pdf-utilities.js', id: 'pdf-utilities', checkSync: 'appInstance.syncSubtab("pdf-utilities"' },
  { file: 'ip-subnet-calculator.js', id: 'ip-subnet-calculator', checkSync: 'appInstance.syncSubtab("ip-subnet-calculator"' },
  { file: 'regex-tester.js', id: 'regex-tester', checkSync: 'appInstance.syncSubtab("regex-tester"' },
  { file: 'svg-animator.js', id: 'svg-animator', checkSync: 'appInstance.syncSubtab("svg-animator"' }
];

suites.forEach(s => {
  const filePath = path.join(projectRoot, 'tools', s.file);
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.error(`- ${s.id}: FILE MISSING (${s.file})`);
    allPassed = false;
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const hasSync = content.includes(s.checkSync);
  const hasReg = content.includes(`appInstance.registerTabSwitcher("${s.id}"`);
  const status = hasSync && hasReg ? 'PASS' : `FAIL (sync: ${hasSync}, reg: ${hasReg})`;
  console.log(`- Suite [${s.id}]: ${status}`);
  if (!hasSync || !hasReg) allPassed = false;
});

console.log('\n=== 3. VERIFYING SITEMAP.XML SUBTOOL COVERAGE ===');
const sitemap = fs.readFileSync(path.join(projectRoot, 'sitemap.xml'), 'utf8');
const targetUrls = [
  'box-shadow', 'gradient-generator', 'glassmorphism-generator', 'clip-path-generator',
  'password-generator', 'uuid-generator',
  'hash-generator', 'aes-crypto', 'rsa-generator',
  'base64', 'url-encoder', 'text-converter',
  'json-formatter', 'sql-beautifier', 'json-yaml-csv',
  'color-palette', 'color-shades', 'color-extractor',
  'epoch-converter', 'date-calculator',
  'qr-generator', 'qr-scanner',
  'audio-converter', 'mp4-to-mp3',
  'word-pdf', 'excel-pdf', 'pptx-pdf', 'images-to-pdf', 'scan-to-pdf', 'html-to-pdf', 'pdf-to-markdown',
  'sign-pdf', 'pdf-annotate', 'pdf-forms', 'pdf-watermark', 'redact-pdf',
  'pdf-security', 'repair-pdf', 'pdf-to-pdfa', 'unlock-pdf', 'protect-pdf',
  'split-pdf', 'merge-pdf', 'rotate-pdf', 'compress-pdf',
  'subnet-calculator', 'mac-lookup',
  'regex-extractor',
  'svg-morph'
];

let missingUrls = 0;
targetUrls.forEach(slug => {
  const url = `https://omnitool.worldsneed.com/tool/${slug}`;
  if (!sitemap.includes(url)) {
    console.warn(`- Missing in sitemap: ${url}`);
    missingUrls++;
  }
});

console.log(`- Checked ${targetUrls.length} high-intent subtools in sitemap: ${targetUrls.length - missingUrls}/${targetUrls.length} present`);
if (missingUrls > 0) allPassed = false;

console.log('\n=== 4. SUMMARY ===');
if (allPassed) {
  console.log('✅ ALL TAB ROUTING, SEO METADATA SYNC & SITEMAP VERIFICATIONS PASSED PERFECTLY!');
} else {
  console.error('❌ SOME VERIFICATION CHECKS FAILED!');
  process.exit(1);
}
