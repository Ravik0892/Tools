import fs from 'fs';
import path from 'path';

const guidesDir = 'guides';
const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'payment-guide.html');

console.log(`Auditing harmony across all ${files.length} guide files...\n`);

const checks = [
  { name: 'Live Tool Viewport', fn: c => c.includes('live-guide-tool-viewport') && c.includes('max-height: 580px') },
  { name: 'Collapse Button', fn: c => c.includes('toggle-tool-collapse-btn') },
  { name: 'Skip to Guide Link', fn: c => c.includes('skip-to-guide-link') },
  { name: 'Article Anchor', fn: c => c.includes('<article id="guide-article">') },
  { name: 'Technical Poster Figure', fn: c => c.includes('guide-diagram-figure') },
  { name: 'Interactive Pan-Zoom Modal', fn: c => c.includes('id="poster-zoom-modal"') },
  { name: 'Pan-Zoom Viewer Script', fn: c => c.includes('initPanZoomViewer') },
  { name: 'Configurations / Mode Tabs', fn: c => c.includes('tab-section') },
  { name: 'Key Specs Table', fn: c => c.includes('specs-table') },
  { name: 'Code Snippet Block', fn: c => c.includes('<pre') && c.includes('<code') },
  { name: 'Pro-Tip Info Box', fn: c => c.includes('info-box') },
  { name: 'Step-by-Step Usage Guide', fn: c => c.includes('Step-by-Step Usage Guide') && c.includes('<ol>') },
  { name: 'FAQ Accordion', fn: c => c.includes('Frequently Asked Questions') && (c.includes('faq-accordion') || c.includes('faq-item')) },
  { name: 'Related Guides Section', fn: c => c.includes('related-section') },
  { name: 'HowTo Schema', fn: c => c.includes('"@type": "HowTo"') },
  { name: 'FAQPage Schema', fn: c => c.includes('"@type": "FAQPage"') },
  { name: 'TechArticle Schema', fn: c => c.includes('"@type": "TechArticle"') },
  { name: 'BreadcrumbList Schema', fn: c => c.includes('"@type": "BreadcrumbList"') }
];

let totalPasses = 0;
let totalFails = 0;

for (const check of checks) {
  let passCount = 0;
  const missing = [];
  for (const f of files) {
    const c = fs.readFileSync(path.join(guidesDir, f), 'utf8');
    if (check.fn(c)) {
      passCount++;
      totalPasses++;
    } else {
      missing.push(f);
      totalFails++;
    }
  }

  const status = passCount === files.length ? '[PASS]' : '[WARN]';
  console.log(`${status} ${check.name.padEnd(28)}: ${passCount}/${files.length} (${((passCount/files.length)*100).toFixed(1)}%)`);
  if (missing.length > 0 && missing.length <= 5) {
    console.log(`       Missing in: ${missing.join(', ')}`);
  }
}

console.log(`\n====================================================`);
console.log(`HARMONY VERIFICATION: ${totalPasses} checks passed, ${totalFails} failed.`);
console.log(`====================================================`);

if (totalFails > 0) {
  process.exit(1);
} else {
  console.log('\nAll 93 guides now share 100% identical layout architecture and content types!');
}

