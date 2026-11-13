import fs from 'fs';
import path from 'path';

const toolFiles = [
  'admin-settings.js',
  'audio-converter.js',
  'calculator.js',
  'code-playground.js',
  'color-lab.js',
  'compare-pdf.js',
  'cron-builder.js',
  'crop-pdf.js',
  'crypto-suite.js',
  'css-studio.js',
  'curl-converter.js',
  'datetime-suite.js',
  'excel-pdf.js',
  'fancy-font-generator.js',
  'favicon-generator.js',
  'finance-calculator.js',
  'formatter-suite.js',
  'graphics-studio.js',
  'html-to-pdf.js',
  'image-converter.js',
  'images-to-pdf.js',
  'ip-subnet-calculator.js',
  'json-to-types.js',
  'jwt-decoder.js',
  'lorem-generator.js',
  'markdown-preview.js',
  'mock-data-generator.js',
  'mp4-to-mp3.js',
  'pdf-ai.js',
  'pdf-annotate.js',
  'pdf-forms.js',
  'pdf-organizer.js',
  'pdf-searcher.js',
  'pdf-security.js',
  'pdf-to-markdown.js',
  'pdf-to-pdfa.js',
  'pdf-utilities.js',
  'pdf-watermark.js',
  'pii-anonymizer.js',
  'pipeline-builder.js',
  'pptx-pdf.js',
  'qr-generator.js',
  'qr-scanner.js',
  'redact-pdf.js',
  'regex-tester.js',
  'repair-pdf.js',
  'robots-generator.js',
  'scan-to-pdf.js',
  'screen-recorder.js',
  'screenshot-capture.js',
  'security-suite.js',
  'seo-previewer.js',
  'sign-pdf.js',
  'svg-animator.js',
  'temp-mail.js',
  'text-analyzer.js',
  'text-diff.js',
  'text-encoder-suite.js',
  'unit-converter.js',
  'url-parser.js',
  'video-speed.js',
  'video-to-gif.js',
  'voice-recorder.js',
  'word-pdf.js'
];

console.log(`Checking all ${toolFiles.length} split-view tools...`);

const issues = [];

for (const file of toolFiles) {
  const content = fs.readFileSync(path.join('tools', file), 'utf8');

  // Check split-view
  if (!content.includes('tool-content-layout split-view') && !content.includes('tool-content-layout') && !content.includes('split-view')) {
    issues.push({ file, issue: 'Missing split-view class' });
  }

  // Check guide-card
  if (!content.includes('tool-guide-card')) {
    issues.push({ file, issue: 'Missing tool-guide-card' });
  }

  // Check right panel header
  // To inspect panel headers, let's extract panels
  // A typical tool has panels inside renderUI
  // Let's count occurrences of 'panel-header'
  const headerCount = (content.match(/panel-header/g) || []).length;
  if (headerCount < 2) {
    issues.push({ file, issue: `Only ${headerCount} panel-header(s) found (expected >= 2)` });
  }

  // Check if hardcoded fullscreen or reset button tags exist in HTML markup
  const htmlMatch = content.match(/renderUI\(\)\s*\{[\s\S]*?return\s*`([\s\S]*?)`;/);
  if (htmlMatch) {
    const html = htmlMatch[1];
    if (/<button[^>]*class=["'][^"']*preview-fullscreen-btn[^"']*["']/i.test(html)) {
      issues.push({ file, issue: 'Hardcoded preview-fullscreen-btn button tag inside renderUI template!' });
    }
    if (/<button[^>]*class=["'][^"']*reset-split-btn[^"']*["']/i.test(html)) {
      issues.push({ file, issue: 'Hardcoded reset-split-btn button tag inside renderUI template!' });
    }
  }
}

if (issues.length === 0) {
  console.log('PERFECT! All 64 split-view tools passed with 0 issues!');
} else {
  console.log(`Found ${issues.length} issues:`);
  issues.forEach(i => console.log(`  - ${i.file}: ${i.issue}`));
}
