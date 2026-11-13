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

console.log(`Checking preview panel headers in all ${toolFiles.length} files...`);

const missingPreviewHeaders = [];

for (const file of toolFiles) {
  const content = fs.readFileSync(path.join('tools', file), 'utf8');

  // Find renderUI function body
  const match = content.match(/renderUI\(\)\s*\{[\s\S]*?return\s*`([\s\S]*?)`;/);
  if (!match) {
    missingPreviewHeaders.push({ file, reason: 'Could not extract renderUI' });
    continue;
  }
  const html = match[1];

  // Split into panels by finding <div class="tool-panel...
  // Let's find panel blocks
  const panelMatches = [...html.matchAll(/<div[^>]*class=["'][^"']*tool-panel(?!\s+tool-guide-card)[^"']*["']/g)];
  if (panelMatches.length < 2) {
    missingPreviewHeaders.push({ file, reason: `Found only ${panelMatches.length} non-guide tool-panels` });
    continue;
  }

  // Find content of Panel 2 (the preview panel)
  // Panel 2 starts at panelMatches[1].index
  const panel2Start = panelMatches[1].index;
  // Let's take the first 1000 characters of panel 2 to find its header
  const panel2Slice = html.slice(panel2Start, panel2Start + 1500);

  const hasPanelHeader = panel2Slice.includes('panel-header');
  const hasViewportHeader = panel2Slice.includes('viewport-header') || panel2Slice.includes('studio-toolbar') || panel2Slice.includes('viewer-toolbar');

  if (!hasPanelHeader && !hasViewportHeader) {
    missingPreviewHeaders.push({ file, reason: 'Panel 2 does NOT have panel-header or valid fallback!' });
  }
}

if (missingPreviewHeaders.length === 0) {
  console.log('ALL 64 TOOLS HAVE VALID PANEL-HEADER IN PANEL 2 (Preview Panel)!');
} else {
  console.log(`Missing preview headers in ${missingPreviewHeaders.length} tools:`);
  missingPreviewHeaders.forEach(m => console.log(`  - ${m.file}: ${m.reason}`));
}

