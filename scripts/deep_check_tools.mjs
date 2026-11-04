import fs from 'fs';

const items = [
  { id: 'pdf-to-image', name: 'PDF to Image Pro', slug: 'pdf-to-image', desc: 'Convert PDF pages to PNG, JPEG or WebP with DPI control, page range selection, background color, and quality slider.' },
  { id: 'image-to-pdf', name: 'Image to PDF Pro', slug: 'image-to-pdf', desc: 'Convert images to PDF with margins, quality, page size, watermark, page numbers, background color, and drag-to-reorder.' },
  { id: 'merge-pdf', name: 'Merge PDF Pro', slug: 'merge-pdf', desc: 'Merge multiple PDFs with page range selection per file, blank page insertion, metadata editing, and drag-to-reorder.' },
  { id: 'split-pdf', name: 'Split PDF Pro', slug: 'split-pdf', desc: 'Split PDFs by page range, every N pages, or custom ranges. Includes page rotation and ZIP download.' },
  { id: 'pdf-compressor', name: 'PDF Compressor', slug: 'pdf-compressor', desc: 'Compress PDF files with quality control, strip metadata, and image re-encoding for massive size reduction.' },
  { id: 'image-compressor', name: 'Image Compressor', slug: 'image-compressor', desc: 'Batch compress, resize, and convert images. Output as JPEG, PNG, or WebP with quality control and ZIP download.' },
  { id: 'json-formatter', name: 'JSON Formatter Pro', slug: 'json-formatter', desc: 'Format, minify, validate, sort keys, diff, escape, flatten, generate TypeScript types, and query JSON paths.' },
  { id: 'base64-encoder', name: 'Base64 & Encoder Suite', slug: 'base64-encoder', desc: 'Encode/decode Base64, URL, Hex, and JWT tokens. Convert files to data URIs. All formats, all modes.' },
  { id: 'password-generator', name: 'Password Generator Pro', slug: 'password-generator', desc: 'Generate passwords, passphrases, PINs, and pattern-based secrets with entropy calculation and crack time estimation.' },
  { id: 'uuid-generator', name: 'UUID & ID Generator', slug: 'uuid-generator', desc: 'Generate UUID v4, v1, v7, NanoID, ULID, and Short IDs. Inspect and decode any UUID with timestamp extraction.' },
  { id: 'hash-generator', name: 'Hash Generator Pro', slug: 'hash-generator', desc: 'Hash text and files with MD5, SHA-1/256/384/512, CRC32. HMAC support, hash comparison, and hash identification.' },
  { id: 'qr-code', name: 'QR Code Tool', slug: 'qr-code', desc: 'Generate and read QR codes. Customize size, colors, error correction. Read QR from images with BarcodeDetector.' },
  { id: 'jwt-decoder', name: 'JWT Decoder', slug: 'jwt-decoder', desc: 'Decode and inspect JWT tokens. View header, payload, signature. Check expiration and standard claims.' },
  { id: 'regex-tester', name: 'Regex Tester', slug: 'regex-tester', desc: 'Live regex testing with match highlighting, capture groups, flag toggles, presets, and a cheat sheet.' },
  { id: 'csv-json', name: 'CSV ↔ JSON', slug: 'csv-json', desc: 'Convert CSV to JSON and JSON to CSV. Custom delimiters, headers toggle, pretty print, file upload.' },
  { id: 'unix-timestamp', name: 'Unix Timestamp', slug: 'unix-timestamp', desc: 'Convert between Unix timestamps and dates. Live clock, relative time, quick reference, seconds & milliseconds.' },
  { id: 'color-picker', name: 'Color Picker Pro', slug: 'color-picker', desc: 'Pick colors in HEX, RGB, HSL, HWB, CMYK. Contrast checker, harmonies, tints/shades, gradients, color blindness sim.' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum Pro', slug: 'lorem-ipsum', desc: 'Generate placeholder text in 5 flavors: Classic, Hipster, Pirate, Corporate, Techno. Output as HTML, Markdown, or JSON.' },
  { id: 'markdown-preview', name: 'Markdown Editor Pro', slug: 'markdown-preview', desc: 'Write Markdown with live preview, GFM tables, task lists, strikethrough, table inserter, sync scroll, and fullscreen.' },
  { id: 'word-counter', name: 'Word Counter Pro', slug: 'word-counter', desc: 'Count words with readability scores (Flesch-Kincaid, Gunning Fog), keyword density, text transforms, and find & replace.' },
  { id: 'text-diff', name: 'Text Diff Checker', slug: 'text-diff', desc: 'Compare two texts side-by-side or inline with highlighted additions, deletions, and unchanged lines.' },
  { id: 'case-converter', name: 'Case Converter', slug: 'case-converter', desc: 'Convert text between 14 cases: UPPER, lower, Title, camelCase, PascalCase, snake_case, kebab-case, and more.' },
  { id: 'css-gradient', name: 'CSS Gradient Generator', slug: 'css-gradient', desc: 'Build beautiful CSS gradients visually. Linear, radial, conic types with color stops, presets, and copy CSS.' },
  { id: 'box-shadow', name: 'Box Shadow Generator', slug: 'box-shadow', desc: 'Build CSS box-shadow visually. Adjust offset, blur, spread, color, opacity, and inset with live preview.' },
  { id: 'favicon-gen', name: 'Favicon Generator', slug: 'favicon-gen', desc: 'Generate favicons from text, emoji, or solid colors. Customize size, colors, border radius. Download as PNG.' },
  { id: 'ascii-art', name: 'ASCII Art Generator', slug: 'ascii-art', desc: 'Convert text to ASCII art with multiple font styles: Block, Banner, Small, Shadow, and Dots.' },
  { id: 'url-encoder', name: 'URL Encoder/Decoder', slug: 'url-encoder', desc: 'Encode and decode URLs with encodeURI and encodeURIComponent. Parse URL components and query parameters.' },
  { id: 'number-base', name: 'Number Base Converter', slug: 'number-base', desc: 'Convert numbers between binary, octal, decimal, and hexadecimal. View bit information and live conversion.' },
  { id: 'cron-parser', name: 'Cron Expression Parser', slug: 'cron-parser', desc: 'Parse cron expressions into human-readable format. View next 5 run times, use presets, and reference the cheat sheet.' },
  { id: 'html-entity', name: 'HTML Entity Encoder', slug: 'html-entity', desc: 'Encode and decode HTML entities. Named and numeric entity reference table with click-to-copy. Bulk conversion.' },
  { id: 'meta-tag', name: 'Meta Tag Generator', slug: 'meta-tag', desc: 'Generate SEO meta tags, Open Graph, and Twitter Card tags. Preview Google and social media appearance.' },
  { id: 'svg-optimizer', name: 'SVG Optimizer', slug: 'svg-optimizer', desc: 'Optimize and minify SVG files. Remove comments, metadata, empty attrs. Minify to one line with live preview.' },
  { id: 'yaml-json', name: 'YAML ↔ JSON', slug: 'yaml-json', desc: 'Convert YAML to JSON and JSON to YAML. Validate syntax, diff view, pretty-print, and copy output instantly.' },
  { id: 'sql-formatter', name: 'SQL Formatter', slug: 'sql-formatter', desc: 'Format and beautify SQL queries. Keyword uppercasing, indent control, minify, and syntax highlighting.' },
  { id: 'xml-formatter', name: 'XML Formatter', slug: 'xml-formatter', desc: 'Pretty-print, validate, and minify XML documents. Tree view, attribute sorting, and copy formatted output.' },
  { id: 'js-css-minifier', name: 'JS / CSS Minifier', slug: 'js-css-minifier', desc: 'Minify and beautify JavaScript and CSS. Remove comments, whitespace, and dead code. Instant results.' },
  { id: 'barcode-gen', name: 'Barcode Generator', slug: 'barcode-gen', desc: 'Generate Code128, Code39, EAN-13, UPC-A, and ITF barcodes. Customize size, colors, and download as PNG.' },
  { id: 'image-resizer', name: 'Image Resizer', slug: 'image-resizer', desc: 'Resize images to exact dimensions (px or %). Keep aspect ratio, batch resize, convert format, and download ZIP.' },
  { id: 'timezone', name: 'Timezone Converter', slug: 'timezone', desc: 'Convert time between timezones. World clock with 8 major cities, DST-aware, live seconds tick.' },
  { id: 'pomodoro', name: 'Pomodoro Timer', slug: 'pomodoro', desc: 'Focus productivity timer. Work/break intervals, session tracking, audio alerts, presets (25/5, 50/10, 90/15).' }
];

const toolFiles = fs.readdirSync('tools').filter(f => f.endsWith('.js'));
const allToolContents = {};
for (const f of toolFiles) {
  allToolContents[f] = fs.readFileSync('tools/' + f, 'utf8');
}
const appJs = fs.readFileSync('app.js', 'utf8');

console.log('Total items to check: ' + items.length);

for (const item of items) {
  console.log(`\n========================================`);
  console.log(`CHECKING: ${item.name} (${item.slug})`);
  
  // Search for mentions in app.js
  const inAppJs = appJs.includes(item.slug);
  
  // Search in tool files
  const matchingFiles = [];
  for (const [fname, content] of Object.entries(allToolContents)) {
    if (content.toLowerCase().includes(item.slug.toLowerCase()) || 
        (item.slug.includes('-') && content.toLowerCase().includes(item.slug.replace(/-/g, ' ')))) {
      matchingFiles.push(fname);
    }
  }
  
  console.log(`Mentioned in app.js: ${inAppJs}`);
  console.log(`Mentioned in tool files: ${matchingFiles.join(', ') || 'None'}`);
}

