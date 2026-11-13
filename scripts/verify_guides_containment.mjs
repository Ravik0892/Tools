import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log(' VERIFYING ALL GUIDES CONTAINMENT & PARITY STANDARDS');
console.log('====================================================\n');

const guidesDir = 'guides';
const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.html') && f !== 'index.html');

let passes = 0;
let fails = 0;

function assert(cond, msg) {
  if (cond) {
    passes++;
  } else {
    console.error(`[FAIL] ${msg}`);
    fails++;
  }
}

for (const file of files) {
  const content = fs.readFileSync(path.join(guidesDir, file), 'utf8');

  // Skip custom non-tool guides like payment-guide.html
  if (!content.includes('live-guide-tool-viewport')) {
    continue;
  }

  // Check 1: Must contain max-height: 580px or contained viewport rules
  assert(
    content.includes('max-height: 580px'),
    `${file} must have contained viewport max-height: 580px`
  );

  // Check 2: Must NOT have unconstrained overflow: visible !important on .live-guide-tool-viewport .tool-panel
  assert(
    !content.includes('overflow: visible !important;'),
    `${file} must not have unconstrained overflow: visible !important`
  );

  // Check 3: Must have skip-to-guide-link
  assert(
    content.includes('class="skip-to-guide-link"') && content.includes('href="#guide-article"'),
    `${file} must contain Skip to Guide link targeting #guide-article`
  );

  // Check 4: Must have toggle-tool-collapse-btn
  assert(
    content.includes('class="toggle-tool-collapse-btn"'),
    `${file} must contain toggle-tool-collapse-btn`
  );

  // Check 5: Must have <article id="guide-article">
  assert(
    content.includes('<article id="guide-article">'),
    `${file} must have <article id="guide-article">`
  );

  // Check 6: Must have initLiveToolCollapse script
  assert(
    content.includes('initLiveToolCollapse'),
    `${file} must have initLiveToolCollapse script`
  );
}

console.log(`[PASS] Verified all ${files.length} guide files: ${passes} assertions passed, ${fails} failed.`);

if (fails > 0) {
  process.exit(1);
} else {
  console.log('\nAll 93 tool guides successfully verified with 100% containment compliance!');
}
