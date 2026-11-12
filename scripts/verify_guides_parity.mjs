import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log(' VERIFYING GUIDES & TOOLS PARITY AUDIT');
console.log('====================================================\n');

let pass = 0;
let fail = 0;

function assert(cond, msg) {
  if (cond) {
    console.log(`[PASS] ${msg}`);
    pass++;
  } else {
    console.error(`[FAIL] ${msg}`);
    fail++;
  }
}

// 1. Verify SVG Posters
const fontPoster = 'social_media_assets/typography_unicode_font_matrix_poster_1200x800.svg';
const finPoster = 'social_media_assets/financial_wealth_growth_matrix_poster_1200x800.svg';
assert(fs.existsSync(fontPoster) && fs.statSync(fontPoster).size > 5000, 'typography_unicode_font_matrix_poster_1200x800.svg exists and >5KB');
assert(fs.existsSync(finPoster) && fs.statSync(finPoster).size > 5000, 'financial_wealth_growth_matrix_poster_1200x800.svg exists and >5KB');

// 2. Check fancy-font-generator.html
const fontHtml = fs.readFileSync('guides/fancy-font-generator.html', 'utf8');
assert(fontHtml.includes('class="container"'), 'fancy-font-generator.html uses canonical class="container"');
assert(fontHtml.includes('live-tool-embed-card'), 'fancy-font-generator.html has live-tool-embed-card');
assert(fontHtml.includes('live-guide-tool-viewport'), 'fancy-font-generator.html has live-guide-tool-viewport');
assert(fontHtml.includes('typography_unicode_font_matrix_poster_1200x800.svg'), 'fancy-font-generator.html embeds SVG poster');
assert(fontHtml.includes('poster-zoom-modal'), 'fancy-font-generator.html has interactive pan-zoom modal');
assert(fontHtml.includes('initPanZoomViewer'), 'fancy-font-generator.html has pan-zoom script');
assert(fontHtml.includes('Step-by-Step Usage Guide'), 'fancy-font-generator.html has Step-by-Step Usage Guide');
assert(fontHtml.includes('info-box'), 'fancy-font-generator.html has info-box Pro-Tip');
assert(fontHtml.includes('related-section'), 'fancy-font-generator.html has related-section');
assert(fontHtml.includes('targetModule = \'fancy-font-generator.js\''), 'fancy-font-generator.html mounts fancy-font-generator.js');

// 3. Check finance-calculator.html
const finHtml = fs.readFileSync('guides/finance-calculator.html', 'utf8');
assert(finHtml.includes('class="container"'), 'finance-calculator.html uses canonical class="container"');
assert(finHtml.includes('live-tool-embed-card'), 'finance-calculator.html has live-tool-embed-card');
assert(finHtml.includes('live-guide-tool-viewport'), 'finance-calculator.html has live-guide-tool-viewport');
assert(finHtml.includes('financial_wealth_growth_matrix_poster_1200x800.svg'), 'finance-calculator.html embeds SVG poster');
assert(finHtml.includes('poster-zoom-modal'), 'finance-calculator.html has interactive pan-zoom modal');
assert(finHtml.includes('initPanZoomViewer'), 'finance-calculator.html has pan-zoom script');
assert(finHtml.includes('Step-by-Step Usage Guide'), 'finance-calculator.html has Step-by-Step Usage Guide');
assert(finHtml.includes('info-box'), 'finance-calculator.html has info-box Pro-Tip');
assert(finHtml.includes('related-section'), 'finance-calculator.html has related-section');
assert(finHtml.includes('targetModule = \'finance-calculator.js\''), 'finance-calculator.html mounts finance-calculator.js');

// 4. Check in-tool guide cards
const fontJs = fs.readFileSync('tools/fancy-font-generator.js', 'utf8');
assert(fontJs.includes('Quick Guide: How to Use Fancy Font') && fontJs.includes('Bio Studio'), 'fancy-font-generator.js has Quick Guide title');
assert(fontJs.includes('Input') && fontJs.includes('Instant 60+ Style Transformation'), 'fancy-font-generator.js has Step 1 input instructions');
assert(fontJs.includes('Filter Categories') && fontJs.includes('One-Click Clipboard Copy'), 'fancy-font-generator.js has Step 2 copy instructions');

const finJs = fs.readFileSync('tools/finance-calculator.js', 'utf8');
assert(finJs.includes('Quick Guide: How to Use Financial') && finJs.includes('Loan Calculator'), 'finance-calculator.js has Quick Guide title');
assert(finJs.includes('Select Engine') && finJs.includes('Global Currency'), 'finance-calculator.js has Step 1 currency & engine instructions');
assert(finJs.includes('Visual Allocation') && finJs.includes('CSV Ledger Export'), 'finance-calculator.js has Step 4 CSV export instructions');

// 5. Check guides/index.html
const indexHtml = fs.readFileSync('guides/index.html', 'utf8');
const cardMatches = indexHtml.match(/class="[^"]*guide-card[^"]*"/g) || [];
assert(cardMatches.length >= 95, `guides/index.html contains all ${cardMatches.length} guide cards (>= 95)`);
assert(indexHtml.includes('/guides/fancy-font-generator') || indexHtml.includes('fancy-font-generator.html'), 'guides/index.html contains fancy-font-generator card');
assert(indexHtml.includes('/guides/finance-calculator') || indexHtml.includes('finance-calculator.html'), 'guides/index.html contains finance-calculator card');
assert(indexHtml.includes('/guides/crop-pdf') || indexHtml.includes('crop-pdf.html'), 'guides/index.html contains crop-pdf card');
assert(indexHtml.includes('"position": 95'), 'guides/index.html contains 95 schema items in JSON-LD');

// 6. Check Android mirror sync
const androidFontGuide = 'omnitool-android-app/app/src/main/assets/web/guides/fancy-font-generator.html';
const androidFinGuide = 'omnitool-android-app/app/src/main/assets/web/guides/finance-calculator.html';
const androidIndex = 'omnitool-android-app/app/src/main/assets/web/guides/index.html';
assert(fs.existsSync(androidFontGuide) && fs.readFileSync(androidFontGuide, 'utf8').includes('live-tool-embed-card'), 'Android mirror has updated fancy-font-generator.html');
assert(fs.existsSync(androidFinGuide) && fs.readFileSync(androidFinGuide, 'utf8').includes('live-tool-embed-card'), 'Android mirror has updated finance-calculator.html');
assert(fs.existsSync('guides/crop-pdf.html'), 'guides/crop-pdf.html exists');
assert(fs.existsSync(androidIndex) && (fs.readFileSync(androidIndex, 'utf8').includes('/guides/crop-pdf') || fs.readFileSync(androidIndex, 'utf8').includes('fancy-font-generator.html')), 'Android mirror has updated guides/index.html');

console.log('\n====================================================');
console.log(`TOTAL AUDIT RESULTS: ${pass} PASSED, ${fail} FAILED`);
console.log('====================================================');

if (fail > 0) process.exit(1);
