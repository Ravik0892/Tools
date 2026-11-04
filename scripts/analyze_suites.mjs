import fs from 'fs';

// Check pdf-utilities.js
console.log('--- pdf-utilities.js ---');
const pdfUtil = fs.readFileSync('tools/pdf-utilities.js', 'utf8');
console.log('Tabs / subtools:', pdfUtil.match(/id:\s*["'][^"']+["']/g) || 'no id:');
console.log('Keywords in pdf-utilities:', ['merge', 'split', 'compress', 'rotate', 'extract'].filter(k => pdfUtil.toLowerCase().includes(k)));

// Check pdf-converter-hub.js
console.log('\n--- pdf-converter-hub.js ---');
const pdfConv = fs.readFileSync('tools/pdf-converter-hub.js', 'utf8');
console.log('Keywords in pdf-converter-hub:', ['pdf-to-image', 'image-to-pdf', 'images-to-pdf', 'word-pdf', 'excel-pdf', 'pptx-pdf', 'scan-to-pdf', 'html-to-pdf', 'pdf-to-markdown'].filter(k => pdfConv.toLowerCase().includes(k)));

// Check image-converter.js
console.log('\n--- image-converter.js ---');
const imgConv = fs.readFileSync('tools/image-converter.js', 'utf8');
console.log('Keywords in image-converter:', ['compress', 'resize', 'webp', 'jpeg', 'png', 'quality'].filter(k => imgConv.toLowerCase().includes(k)));

// Check text-analyzer.js
console.log('\n--- text-analyzer.js ---');
const textAna = fs.readFileSync('tools/text-analyzer.js', 'utf8');
console.log('Keywords in text-analyzer:', ['word count', 'reading time', 'flesch', 'gunning', 'keyword', 'density', 'syllable'].filter(k => textAna.toLowerCase().includes(k)));

// Check formatter-suite.js
console.log('\n--- formatter-suite.js ---');
const formSuite = fs.readFileSync('tools/formatter-suite.js', 'utf8');
console.log('Keywords in formatter-suite:', ['json', 'sql', 'yaml', 'csv', 'xml', 'minify'].filter(k => formSuite.toLowerCase().includes(k)));

// Check text-encoder-suite.js
console.log('\n--- text-encoder-suite.js ---');
const textEnc = fs.readFileSync('tools/text-encoder-suite.js', 'utf8');
console.log('Keywords in text-encoder-suite:', ['base64', 'url', 'case', 'html', 'hex', 'jwt'].filter(k => textEnc.toLowerCase().includes(k)));

// Check datetime-suite.js
console.log('\n--- datetime-suite.js ---');
const dtSuite = fs.readFileSync('tools/datetime-suite.js', 'utf8');
console.log('Keywords in datetime-suite:', ['epoch', 'unix', 'timestamp', 'timezone', 'world clock', 'calculator'].filter(k => dtSuite.toLowerCase().includes(k)));

// Check css-studio.js
console.log('\n--- css-studio.js ---');
const cssStudio = fs.readFileSync('tools/css-studio.js', 'utf8');
console.log('Keywords in css-studio:', ['gradient', 'box-shadow', 'glassmorphism', 'clip-path'].filter(k => cssStudio.toLowerCase().includes(k)));

// Check qr-studio.js
console.log('\n--- qr-studio.js ---');
const qrStudio = fs.readFileSync('tools/qr-studio.js', 'utf8');
console.log('Keywords in qr-studio:', ['qr', 'barcode', 'barcode-gen', 'generator', 'scanner'].filter(k => qrStudio.toLowerCase().includes(k)));

// Check color-lab.js
console.log('\n--- color-lab.js ---');
const colorLab = fs.readFileSync('tools/color-lab.js', 'utf8');
console.log('Keywords in color-lab:', ['palette', 'shades', 'contrast', 'picker', 'eyedropper', 'cmyk', 'hsl'].filter(k => colorLab.toLowerCase().includes(k)));

// Check cron-builder.js
console.log('\n--- cron-builder.js ---');
const cronBld = fs.readFileSync('tools/cron-builder.js', 'utf8');
console.log('Keywords in cron-builder:', ['cron', 'parse', 'schedule', 'human', 'expression'].filter(k => cronBld.toLowerCase().includes(k)));

// Check seo-previewer.js
console.log('\n--- seo-previewer.js ---');
const seoPrev = fs.readFileSync('tools/seo-previewer.js', 'utf8');
console.log('Keywords in seo-previewer:', ['meta', 'og:', 'twitter', 'tag', 'preview', 'generate'].filter(k => seoPrev.toLowerCase().includes(k)));


