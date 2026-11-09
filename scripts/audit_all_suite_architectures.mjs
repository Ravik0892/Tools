import fs from 'fs';

const suites = [
  'tools/css-studio.js',
  'tools/formatter-suite.js',
  'tools/text-encoder-suite.js',
  'tools/crypto-suite.js',
  'tools/datetime-suite.js',
  'tools/security-suite.js',
  'tools/pdf-editor-suite.js',
  'tools/pdf-converter-hub.js',
  'tools/audio-suite.js',
  'tools/qr-studio.js',
  'tools/pdf-security-suite.js'
];

for (const s of suites) {
  const content = fs.readFileSync(s, 'utf8');
  console.log(`=== ${s} ===`);
  const hasDynamicImport = content.includes('import(');
  const hasHost = content.includes('subtool-host') || content.includes('hub-subtool-host');
  const tabsMatch = content.match(/keyboard-tab/g);
  console.log(`Dynamic Import: ${hasDynamicImport}, Uses Host: ${hasHost}, Tab count: ${tabsMatch ? tabsMatch.length : 0}`);
}

