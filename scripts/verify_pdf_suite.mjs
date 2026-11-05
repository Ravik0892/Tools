import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..');

console.log('====================================================');
console.log(' forensic verification of the 7 pdf & doc tools');
console.log('====================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

const appJs = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

// 1. Check tool registrations in app.js
const masterTools = [
  'pdf-searcher',
  'pdf-utilities',
  'pdf-converter-hub',
  'pdf-editor-suite',
  'pdf-security-suite',
  'pdf-ai',
  'compare-pdf'
];

masterTools.forEach(t => {
  assert(appJs.includes(`id: "${t}"`), `Master tool "${t}" registered in app.tools`);
});

// 2. Check guideMap in app.js
masterTools.forEach(t => {
  assert(appJs.includes(`"${t}": "${t}.html"`), `"${t}" mapped in app.js guideMap`);
});

// 3. Check guide files on disk
masterTools.forEach(t => {
  const p = path.join(root, 'guides', `${t}.html`);
  const exists = fs.existsSync(p) && fs.statSync(p).size > 1000;
  assert(exists, `Guide file "guides/${t}.html" exists and is non-empty`);
});

// 4. Check subtool registry
const subtools = [
  'word-pdf', 'excel-pdf', 'pptx-pdf', 'images-to-pdf', 'scan-to-pdf', 'html-to-pdf', 'pdf-to-markdown',
  'sign-pdf', 'pdf-annotate', 'pdf-forms', 'pdf-watermark', 'redact-pdf',
  'pdf-security', 'repair-pdf', 'pdf-to-pdfa',
  'pdf-organizer', 'crop-pdf'
];

subtools.forEach(st => {
  assert(appJs.includes(`"${st}": {`), `Sub-tool "${st}" registered in app.subtoolsRegistry`);
});

// 5. Check no remaining tool-render-area in PDF tools
const pdfToolFiles = fs.readdirSync(path.join(root, 'tools')).filter(f => f.includes('pdf') || f.includes('word') || f.includes('excel') || f.includes('pptx') || f.includes('html-to-pdf') || f.includes('scan-to-pdf') || f.includes('crop-pdf') || f.includes('sign-pdf') || f.includes('repair-pdf') || f.includes('images-to-pdf'));

pdfToolFiles.forEach(f => {
  const c = fs.readFileSync(path.join(root, 'tools', f), 'utf8');
  assert(!c.includes('tool-render-area'), `"${f}" free of broken tool-render-area selector`);
  assert(!c.includes('2.16.105'), `"${f}" free of outdated PDF.js 2.16.105 worker collision`);
});

// 6. Check suites have registerTabSwitcher and cleanup
const suites = [
  'pdf-converter-hub.js',
  'pdf-editor-suite.js',
  'pdf-security-suite.js',
  'pdf-utilities.js'
];

suites.forEach(sf => {
  const c = fs.readFileSync(path.join(root, 'tools', sf), 'utf8');
  assert(c.includes('registerTabSwitcher'), `Suite "${sf}" implements registerTabSwitcher`);
  assert(c.includes('cleanup()'), `Suite "${sf}" implements cleanup() lifecycle`);
});

// 7. Check PDFEncryptLite in pdf-security.js
const secCode = fs.readFileSync(path.join(root, 'tools', 'pdf-security.js'), 'utf8');
assert(secCode.includes('PDFEncryptLite.encryptPDF'), 'pdf-security.js uses PDFEncryptLite for real password protection');

// 8. Check compare-pdf.js has cleanup and no alert
const compCode = fs.readFileSync(path.join(root, 'tools', 'compare-pdf.js'), 'utf8');
assert(compCode.includes('cleanup()'), 'compare-pdf.js implements cleanup()');
assert(!compCode.includes('alert('), 'compare-pdf.js uses non-blocking toasts (no raw alert)');

// 9. Check pdf-searcher.js cleanup
const searcherCode = fs.readFileSync(path.join(root, 'tools', 'pdf-searcher.js'), 'utf8');
assert(searcherCode.includes('cleanup()') && searcherCode.includes('ocrWorker.terminate()'), 'pdf-searcher.js cleanly terminates OCR worker on unmount');

console.log('\n====================================================');
console.log(`TOTAL AUDIT RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
console.log('====================================================');

if (failCount > 0) {
  process.exit(1);
}

