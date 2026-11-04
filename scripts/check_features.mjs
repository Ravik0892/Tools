import fs from 'fs';

// Check tools/images-to-pdf.js
console.log('=== images-to-pdf.js ===');
const imgPdf = fs.readFileSync('tools/images-to-pdf.js', 'utf8');
console.log('Keywords in images-to-pdf:', ['margin', 'quality', 'page size', 'watermark', 'page numbers', 'drag'].filter(k => imgPdf.toLowerCase().includes(k)));

// Check tools/image-converter.js
console.log('\n=== image-converter.js ===');
const imgConv = fs.readFileSync('tools/image-converter.js', 'utf8');
console.log('Keywords in image-converter:', ['resize', 'compress', 'batch', 'zip', 'aspect ratio'].filter(k => imgConv.toLowerCase().includes(k)));

// Check tools/uuid-generator.js
console.log('\n=== uuid-generator.js ===');
const uuid = fs.readFileSync('tools/uuid-generator.js', 'utf8');
console.log('Keywords in uuid-generator:', ['v1', 'v4', 'v7', 'nanoid', 'ulid', 'short id', 'inspect', 'decode'].filter(k => uuid.toLowerCase().includes(k)));

// Check tools/lorem-generator.js
console.log('\n=== lorem-generator.js ===');
const lorem = fs.readFileSync('tools/lorem-generator.js', 'utf8');
console.log('Keywords in lorem-generator:', ['hipster', 'pirate', 'corporate', 'techno', 'cyberpunk', 'html', 'markdown', 'json'].filter(k => lorem.toLowerCase().includes(k)));

// Check tools/cron-builder.js
console.log('\n=== cron-builder.js ===');
const cron = fs.readFileSync('tools/cron-builder.js', 'utf8');
console.log('Keywords in cron-builder:', ['next', 'preset', 'cheat sheet', 'human', 'parse'].filter(k => cron.toLowerCase().includes(k)));

// Check tools/calculator.js
console.log('\n=== calculator.js ===');
const calc = fs.readFileSync('tools/calculator.js', 'utf8');
console.log('Keywords in calculator:', ['base', 'binary', 'hex', 'octal', 'radix'].filter(k => calc.toLowerCase().includes(k)));

// Check archive folder
console.log('\n=== tools/archive/ ===');
if (fs.existsSync('tools/archive')) {
  console.log(fs.readdirSync('tools/archive'));
}

