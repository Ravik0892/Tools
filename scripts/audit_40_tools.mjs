import fs from 'fs';

const toolsDir = 'tools';
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.js'));
const appJs = fs.readFileSync('app.js', 'utf8');

const matchRedirects = appJs.match(/toolRedirects:\s*\{([\s\S]*?)\n\s*\},/);
const redirects = {};
if (matchRedirects) {
  const lines = matchRedirects[1].split('\n');
  for (const line of lines) {
    const m = line.match(/["']([^"']+)["']\s*:\s*\{([^}]+)\}/);
    if (m) redirects[m[1]] = m[2].replace(/\s+/g, ' ').trim();
  }
}

const matchTools = appJs.match(/tools:\s*\[([\s\S]*?)\n\s*\]\s*,/);
const registeredTools = matchTools ? [...matchTools[1].matchAll(/id:\s*["']([^"']+)["']/g)].map(m => m[1]) : [];

const items = [
  { id: 1, slug: 'pdf-to-image', name: 'PDF to Image Pro', desc: 'Convert PDF pages to PNG, JPEG or WebP with DPI control, page range selection, background color, and quality slider.' },
  { id: 2, slug: 'image-to-pdf', name: 'Image to PDF Pro', desc: 'Convert images to PDF with margins, quality, page size, watermark, page numbers, background color, and drag-to-reorder.' },
  { id: 3, slug: 'merge-pdf', name: 'Merge PDF Pro', desc: 'Merge multiple PDFs with page range selection per file, blank page insertion, metadata editing, and drag-to-reorder.' },
  { id: 4, slug: 'split-pdf', name: 'Split PDF Pro', desc: 'Split PDFs by page range, every N pages, or custom ranges. Includes page rotation and ZIP download.' },
  { id: 5, slug: 'pdf-compressor', name: 'PDF Compressor', desc: 'Compress PDF files with quality control, strip metadata, and image re-encoding for massive size reduction.' },
  { id: 6, slug: 'image-compressor', name: 'Image Compressor', desc: 'Batch compress, resize, and convert images. Output as JPEG, PNG, or WebP with quality control and ZIP download.' },
  { id: 7, slug: 'json-formatter', name: 'JSON Formatter Pro', desc: 'Format, minify, validate, sort keys, diff, escape, flatten, generate TypeScript types, and query JSON paths.' },
  { id: 8, slug: 'base64-encoder', name: 'Base64 & Encoder Suite', desc: 'Encode/decode Base64, URL, Hex, and JWT tokens. Convert files to data URIs. All formats, all modes.' },
  { id: 9, slug: 'password-generator', name: 'Password Generator Pro', desc: 'Generate passwords, passphrases, PINs, and pattern-based secrets with entropy calculation and crack time estimation.' },
  { id: 10, slug: 'uuid-generator', name: 'UUID & ID Generator', desc: 'Generate UUID v4, v1, v7, NanoID, ULID, and Short IDs. Inspect and decode any UUID with timestamp extraction.' },
  { id: 11, slug: 'hash-generator', name: 'Hash Generator Pro', desc: 'Hash text and files with MD5, SHA-1/256/384/512, CRC32. HMAC support, hash comparison, and hash identification.' },
  { id: 12, slug: 'qr-code', name: 'QR Code Tool', desc: 'Generate and read QR codes. Customize size, colors, error correction. Read QR from images with BarcodeDetector.' },
  { id: 13, slug: 'jwt-decoder', name: 'JWT Decoder', desc: 'Decode and inspect JWT tokens. View header, payload, signature. Check expiration and standard claims.' },
  { id: 14, slug: 'regex-tester', name: 'Regex Tester', desc: 'Live regex testing with match highlighting, capture groups, flag toggles, presets, and a cheat sheet.' },
  { id: 15, slug: 'csv-json', name: 'CSV ↔ JSON', desc: 'Convert CSV to JSON and JSON to CSV. Custom delimiters, headers toggle, pretty print, file upload.' },
  { id: 16, slug: 'unix-timestamp', name: 'Unix Timestamp', desc: 'Convert between Unix timestamps and dates. Live clock, relative time, quick reference, seconds & milliseconds.' },
  { id: 17, slug: 'color-picker', name: 'Color Picker Pro', desc: 'Pick colors in HEX, RGB, HSL, HWB, CMYK. Contrast checker, harmonies, tints/shades, gradients, color blindness sim.' },
  { id: 18, slug: 'lorem-ipsum', name: 'Lorem Ipsum Pro', desc: 'Generate placeholder text in 5 flavors: Classic, Hipster, Pirate, Corporate, Techno. Output as HTML, Markdown, or JSON.' },
  { id: 19, slug: 'markdown-preview', name: 'Markdown Editor Pro', desc: 'Write Markdown with live preview, GFM tables, task lists, strikethrough, table inserter, sync scroll, and fullscreen.' },
  { id: 20, slug: 'word-counter', name: 'Word Counter Pro', desc: 'Count words with readability scores (Flesch-Kincaid, Gunning Fog), keyword density, text transforms, and find & replace.' },
  { id: 21, slug: 'text-diff', name: 'Text Diff Checker', desc: 'Compare two texts side-by-side or inline with highlighted additions, deletions, and unchanged lines.' },
  { id: 22, slug: 'case-converter', name: 'Case Converter', desc: 'Convert text between 14 cases: UPPER, lower, Title, camelCase, PascalCase, snake_case, kebab-case, and more.' },
  { id: 23, slug: 'css-gradient', name: 'CSS Gradient Generator', desc: 'Build beautiful CSS gradients visually. Linear, radial, conic types with color stops, presets, and copy CSS.' },
  { id: 24, slug: 'box-shadow', name: 'Box Shadow Generator', desc: 'Build CSS box-shadow visually. Adjust offset, blur, spread, color, opacity, and inset with live preview.' },
  { id: 25, slug: 'favicon-gen', name: 'Favicon Generator', desc: 'Generate favicons from text, emoji, or solid colors. Customize size, colors, border radius. Download as PNG.' },
  { id: 26, slug: 'ascii-art', name: 'ASCII Art Generator', desc: 'Convert text to ASCII art with multiple font styles: Block, Banner, Small, Shadow, and Dots.' },
  { id: 27, slug: 'url-encoder', name: 'URL Encoder/Decoder', desc: 'Encode and decode URLs with encodeURI and encodeURIComponent. Parse URL components and query parameters.' },
  { id: 28, slug: 'number-base', name: 'Number Base Converter', desc: 'Convert numbers between binary, octal, decimal, and hexadecimal. View bit information and live conversion.' },
  { id: 29, slug: 'cron-parser', name: 'Cron Expression Parser', desc: 'Parse cron expressions into human-readable format. View next 5 run times, use presets, and reference the cheat sheet.' },
  { id: 30, slug: 'html-entity', name: 'HTML Entity Encoder', desc: 'Encode and decode HTML entities. Named and numeric entity reference table with click-to-copy. Bulk conversion.' },
  { id: 31, slug: 'meta-tag', name: 'Meta Tag Generator', desc: 'Generate SEO meta tags, Open Graph, and Twitter Card tags. Preview Google and social media appearance.' },
  { id: 32, slug: 'svg-optimizer', name: 'SVG Optimizer', desc: 'Optimize and minify SVG files. Remove comments, metadata, empty attrs. Minify to one line with live preview.' },
  { id: 33, slug: 'yaml-json', name: 'YAML ↔ JSON', desc: 'Convert YAML to JSON and JSON to YAML. Validate syntax, diff view, pretty-print, and copy output instantly.' },
  { id: 34, slug: 'sql-formatter', name: 'SQL Formatter', desc: 'Format and beautify SQL queries. Keyword uppercasing, indent control, minify, and syntax highlighting.' },
  { id: 35, slug: 'xml-formatter', name: 'XML Formatter', desc: 'Pretty-print, validate, and minify XML documents. Tree view, attribute sorting, and copy formatted output.' },
  { id: 36, slug: 'js-css-minifier', name: 'JS / CSS Minifier', desc: 'Minify and beautify JavaScript and CSS. Remove comments, whitespace, and dead code. Instant results.' },
  { id: 37, slug: 'barcode-gen', name: 'Barcode Generator', desc: 'Generate Code128, Code39, EAN-13, UPC-A, and ITF barcodes. Customize size, colors, and download as PNG.' },
  { id: 38, slug: 'image-resizer', name: 'Image Resizer', desc: 'Resize images to exact dimensions (px or %). Keep aspect ratio, batch resize, convert format, and download ZIP.' },
  { id: 39, slug: 'timezone', name: 'Timezone Converter', desc: 'Convert time between timezones. World clock with 8 major cities, DST-aware, live seconds tick.' },
  { id: 40, slug: 'pomodoro', name: 'Pomodoro Timer', desc: 'Focus productivity timer. Work/break intervals, session tracking, audio alerts, presets (25/5, 50/10, 90/15).' }
];

console.log('--- AUDITING 40 TOOLS ---');
for (const item of items) {
  const isDirectTool = registeredTools.includes(item.slug);
  const redirectTarget = redirects[item.slug];
  
  console.log(`\n#${item.id} [${item.name}] (${item.slug})`);
  console.log(`- Direct registered tool: ${isDirectTool}`);
  if (redirectTarget) console.log(`- Redirect route: ${redirectTarget}`);
}

