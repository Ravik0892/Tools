import fs from 'fs';

const appJs = fs.readFileSync('app.js', 'utf8');

// Find tools array
const startIdx = appJs.indexOf('tools: [');
const endIdx = appJs.indexOf('\n  ],', startIdx);
const toolsArrayText = appJs.substring(startIdx, endIdx);

const suiteIds = [
  'pdf-converter-hub',
  'pdf-editor-suite',
  'pdf-security-suite',
  'qr-studio',
  'audio-suite',
  'pdf-utilities',
  'color-lab',
  'css-studio',
  'datetime-suite',
  'security-suite',
  'crypto-suite',
  'formatter-suite',
  'text-encoder-suite'
];

for (const id of suiteIds) {
  const inToolsArray = toolsArrayText.includes(`id: "${id}"`) || toolsArrayText.includes(`id: '${id}'`);
  console.log(`${id.padEnd(22)} in app.tools: ${inToolsArray}`);
}
