import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '..', 'social_media_assets');

// Helper to escape XML
const escapeXml = (unsafe) => {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Poster specs definition
const posters = [
  {
    fileName: 'pdf_converter_pipeline_poster_1200x800.svg',
    categoryBadge: 'DOCUMENT PROCESSING',
    title: 'Universal Document & PDF Conversion Pipeline',
    subtitle: 'Client-side compilation flow for Office (.docx, .xlsx, .pptx), Images, HTML, and Markdown.',
    theme: {
      accent1: '#38bdf8',
      accent2: '#34d399',
      badgeBg: '#0284c7',
      badgeBorder: '#38bdf8'
    },
    col1: {
      title: 'Conversion Ingestion Engines',
      items: [
        { label: 'Word (.docx)', val: 'XML / Mammoth AST to clean HTML & PDF stream' },
        { label: 'Excel (.xlsx, .csv)', val: 'SheetJS workbook cell matrix with custom grid pagination' },
        { label: 'PowerPoint (.pptx)', val: 'Slide XML extraction, raster canvas shape rendering' },
        { label: 'Image Gallery', val: 'Multi-image auto-orient, DPI preservation, fit/fill geometry' },
        { label: 'Markdown & HTML', val: 'CommonMark AST parsing, custom CSS print styling' }
      ]
    },
    col2: {
      title: 'In-Memory PDF Generation Pipeline',
      items: [
        { label: 'Input Sanitization', val: 'Zero upload; files parsed entirely in browser memory' },
        { label: 'PDF-Lib Assembler', val: 'Vector typography, page geometry, AcroForm initialization' },
        { label: 'Font Embedding', val: 'TrueType (TTF) & OpenType (OTF) subset embedding' },
        { label: 'Compression', val: 'FlateDecode stream compression for minimal file size' },
        { label: 'Export Buffer', val: 'Instant Blob / ArrayBuffer download with zero server lag' }
      ]
    },
    col3: {
      title: 'Format Standards & DPI Matrix',
      items: [
        { label: 'A4 Portrait', val: '595.28 × 841.89 pt (210 × 297 mm)' },
        { label: 'US Letter', val: '612.00 × 792.00 pt (8.5 × 11.0 in)' },
        { label: 'Print Standard', val: '300 DPI high-fidelity rasterization' },
        { label: 'Screen Standard', val: '72/96 DPI optimized vector scaling' },
        { label: 'ISO Standard', val: 'ISO 32000-1 compliant PDF generation' }
      ]
    },
    footerNotes: '✓ 100% Client-Side Sandbox • Zero Server Uploads • Hardware Accelerated Vector Rasterizer'
  },
  {
    fileName: 'pdf_editor_markup_poster_1200x800.svg',
    categoryBadge: 'VECTOR ENGINE',
    title: 'PDF Editor, Vector Markup & E-Signature Architecture',
    subtitle: 'Interactive AcroForm filling, cryptographic e-signing, Bezier annotations, and secure redaction.',
    theme: {
      accent1: '#818cf8',
      accent2: '#c084fc',
      badgeBg: '#4f46e5',
      badgeBorder: '#818cf8'
    },
    col1: {
      title: 'Annotation & Drawing Layer',
      items: [
        { label: 'Freehand Ink', val: 'Smooth Bezier curve interpolation with pressure sensitivity' },
        { label: 'Vector Primitives', val: 'Rectangles, ellipses, callout arrows, lines, and polygons' },
        { label: 'Text Blocks', val: 'Custom font size, line height, color, and background fill' },
        { label: 'Sticky Notes', val: 'Collapsible comment threads and visual pins' },
        { label: 'Z-Index Manager', val: 'Multi-layer ordering, element grouping, and locking' }
      ]
    },
    col2: {
      title: 'Form Filling & E-Sign Engine',
      items: [
        { label: 'AcroForms', val: 'Interactive text inputs, checkboxes, radio groups, and dropdowns' },
        { label: 'Cursive Signatures', val: 'Natural handwriting generator from keyboard text' },
        { label: 'Canvas Draw Sign', val: 'Direct stylus/mouse signature capture with smoothing' },
        { label: 'Image Signature', val: 'Transparent PNG stamp import with aspect ratio lock' },
        { label: 'Form Flattening', val: 'Bake dynamic form fields into permanent vector text' }
      ]
    },
    col3: {
      title: 'Redaction & Watermark Specs',
      items: [
        { label: 'True Redaction', val: 'Destructive vector stripping (not just black overlays)' },
        { label: 'Watermarking', val: 'Diagonal/horizontal text or logo stamps with opacity' },
        { label: 'Bates Numbering', val: 'Sequential legal document numbering and prefixing' },
        { label: 'Page Numbers', val: 'Custom header/footer positioning (Page X of Y)' },
        { label: 'Compliance', val: 'Complies with court-accepted legal redaction rules' }
      ]
    },
    footerNotes: '✓ Client-Side E-Signatures • Destructive PII Removal • Non-Destructive Vector Annotations'
  },
  {
    fileName: 'pdf_security_repair_poster_1200x800.svg',
    categoryBadge: 'SECURITY & ARCHIVAL',
    title: 'PDF Cryptography, Xref Stream Repair & Archival',
    subtitle: 'Standard Security Handler AES-256 encryption, corrupt xref stream recovery, and PDF/A ISO compliance.',
    theme: {
      accent1: '#f59e0b',
      accent2: '#ef4444',
      badgeBg: '#b45309',
      badgeBorder: '#f59e0b'
    },
    col1: {
      title: 'Standard Encryption Engine',
      items: [
        { label: 'AES-256 (Rev 6)', val: 'SASLprep password hashing, SHA-384, AES-256-CBC' },
        { label: 'AES-128 (Rev 4)', val: 'Legacy enterprise compatibility with MD5 / SHA-256' },
        { label: 'User Password', val: 'Required to open and view encrypted document content' },
        { label: 'Owner Password', val: 'Controls printing, copying, editing, and form filling' },
        { label: 'Password Removal', val: 'Instant decryption when authorized owner key provided' }
      ]
    },
    col2: {
      title: 'Corrupt PDF Repair Pipeline',
      items: [
        { label: 'Header Recovery', val: 'Locates `%PDF-1.x` byte offset in damaged files' },
        { label: 'Xref Rebuild', val: 'Scans raw bytes to reconstruct broken cross-reference tables' },
        { label: 'Trailer Recovery', val: 'Re-indexes document root catalog and encryption dictionaries' },
        { label: 'Object Scavenger', val: 'Extracts salvageable page trees, streams, and text nodes' },
        { label: 'Stream Decompress', val: 'Recovers truncated zlib FlateDecode object streams' }
      ]
    },
    col3: {
      title: 'PDF/A ISO Archival Standards',
      items: [
        { label: 'PDF/A-1b', val: 'ISO 19005-1 Level B (visual reproducibility)' },
        { label: 'PDF/A-2b', val: 'ISO 19005-2 (JPEG2000, transparent layers, embedded PDF/A)' },
        { label: 'Color Profiles', val: 'Mandatory DeviceRGB / DeviceCMYK ICC profile embed' },
        { label: 'Font Embedding', val: 'All glyphs and CIDToGIDMap structures 100% embedded' },
        { label: 'Restricted Tags', val: 'Strips prohibited JavaScript, audio, and external links' }
      ]
    },
    footerNotes: '✓ Military-Grade AES-256 Client-Side • Heuristic Byte-Level Repair • ISO 19005 Long-Term Archival'
  },
  {
    fileName: 'pdf_ai_summarizer_poster_1200x800.svg',
    categoryBadge: 'NEURAL PARSING',
    title: 'Client-Side AI Document Summarizer & Translation',
    subtitle: 'Local text tokenization, extractive summarization, multilingual neural translation, and Q&A inference.',
    theme: {
      accent1: '#00f2fe',
      accent2: '#8b5cf6',
      badgeBg: '#0284c7',
      badgeBorder: '#00f2fe'
    },
    col1: {
      title: 'Text Extraction & Ingestion',
      items: [
        { label: 'PDF.js Text Layer', val: 'Decodes font encoding, ligatures, and reading order' },
        { label: 'Multi-Page Chunking', val: 'Smart sentence & paragraph boundary tokenization' },
        { label: 'Section Detection', val: 'Identifies headers, abstracts, tables, and references' },
        { label: 'Boilerplate Stripper', val: 'Removes running headers, footers, and page numbers' },
        { label: 'Memory Limits', val: 'Streams up to 500+ pages without browser memory crash' }
      ]
    },
    col2: {
      title: 'NLP Summarization Engine',
      items: [
        { label: 'Extractive Summary', val: 'TF-IDF & TextRank graph algorithms rank key sentences' },
        { label: 'Executive Brief', val: 'Concise 3-5 bullet point takeaways for rapid review' },
        { label: 'Action Items', val: 'Extracts deadlines, deliverables, tasks, and stakeholders' },
        { label: 'Key Terminology', val: 'Auto-extracts glossaries, acronyms, and technical definitions' },
        { label: 'Sentiment & Tone', val: 'Evaluates document urgency, neutrality, and sentiment' }
      ]
    },
    col3: {
      title: 'Neural Translation & Querying',
      items: [
        { label: '15+ Languages', val: 'Spanish, French, German, Japanese, Chinese, Hindi, etc.' },
        { label: 'Layout Retention', val: 'Side-by-side original vs translated paragraph view' },
        { label: 'Semantic Search', val: 'In-document search powered by localized keyword relevance' },
        { label: 'Export Options', val: 'Export summaries to Markdown, PDF, JSON, or clipboard' },
        { label: 'Zero Cloud Leak', val: 'Runs purely in browser runtime without external AI APIs' }
      ]
    },
    footerNotes: '✓ Private Document Intelligence • 100% In-Browser NLP • No Data Shared With External AI Vendors'
  },
  {
    fileName: 'compare_pdf_diff_poster_1200x800.svg',
    categoryBadge: 'DOCUMENT COMPARISON',
    title: 'Visual & Textual PDF Document Diffing Engine',
    subtitle: 'Side-by-side rendering, pixel-by-pixel RGB heatmap comparison, and swipe-wipe inspection.',
    theme: {
      accent1: '#10b981',
      accent2: '#f43f5e',
      badgeBg: '#065f46',
      badgeBorder: '#10b981'
    },
    col1: {
      title: 'Side-by-Side Dual Canvas',
      items: [
        { label: 'Synchronized Scroll', val: 'Locks page zoom and scroll viewport across both documents' },
        { label: 'Page Pairing', val: 'Compare identical page indices or manually offset chapters' },
        { label: 'High DPI Render', val: '2.0x retina scaling reveals sub-pixel typographic changes' },
        { label: 'Rotation Match', val: 'Independent 90° orientation toggle for misaligned scans' },
        { label: 'Page Overview', val: 'Miniature thumbnail strip indicates which pages have diffs' }
      ]
    },
    col2: {
      title: 'Pixel Diff Heatmap Engine',
      items: [
        { label: 'Pixelmatch Alg', val: 'Detects pixel discrepancies with adjustable tolerance threshold' },
        { label: 'Color Coding', val: 'Red: Deleted / Left only • Green: Added / Right only' },
        { label: 'Anti-Aliasing Filter', val: 'Distinguishes font rendering noise from real content changes' },
        { label: 'Opacity Blend', val: 'Overlay sliders reveal underlying document through the diff' },
        { label: 'Swipe Wipe Slider', val: 'Interactive vertical/horizontal divider wipes between versions' }
      ]
    },
    col3: {
      title: 'Textual Content Comparison',
      items: [
        { label: 'Myers Diff Alg', val: 'Compares extracted word streams line-by-line' },
        { label: 'Inline Highlighting', val: 'Strikethrough deletions, highlighted insertions' },
        { label: 'Whitespace Ignore', val: 'Toggle to overlook formatting spacing and line breaks' },
        { label: 'Stats Counter', val: 'Real-time tally of added words, removed words, and edits' },
        { label: 'Export Report', val: 'Download comprehensive audit diff report as PDF/HTML' }
      ]
    },
    footerNotes: '✓ Sub-Pixel Graphic Accuracy • Myers AST Text Diff • Zero Cloud Transmission for Confidential Contracts'
  },
  {
    fileName: 'lorem_typography_design_poster_1200x800.svg',
    categoryBadge: 'TYPOGRAPHY & DESIGN',
    title: 'Typography Scales, Rhythm & Placeholder Text Architecture',
    subtitle: 'Modular typographic scales, Latin Cicero roots, Cyberpunk lore, and B2B corporate placeholder engines.',
    theme: {
      accent1: '#38bdf8',
      accent2: '#fbbf24',
      badgeBg: '#0369a1',
      badgeBorder: '#38bdf8'
    },
    col1: {
      title: 'Placeholder Generators',
      items: [
        { label: 'Classic Latin', val: 'De Finibus Bonorum et Malorum by Cicero (45 BC)' },
        { label: 'Cyberpunk Lore', val: 'Futuristic sci-fi jargon, neural terms, and neon flavor' },
        { label: 'B2B Corporate', val: 'Enterprise synergy, agile paradigms, and stakeholder fluff' },
        { label: 'Hipster Artisan', val: 'Single-origin cold brew, sustainable, aesthetic filler' },
        { label: 'Custom Wordbank', val: 'Inject your brand keywords into natural language structures' }
      ]
    },
    col2: {
      title: 'Modular Type Scales',
      items: [
        { label: 'Minor Second (1.067)', val: 'Subtle contrast for information-dense dashboards' },
        { label: 'Major Second (1.125)', val: 'Clean, modern typography for desktop web apps' },
        { label: 'Major Third (1.250)', val: 'Harmonious default for blogs, documentation, and news' },
        { label: 'Golden Ratio (1.618)', val: 'Dramatic, editorial scale for luxury marketing sites' },
        { label: 'Vertical Rhythm', val: 'Baseline grid alignment (4px / 8px increments)' }
      ]
    },
    col3: {
      title: 'Export Formats & Controls',
      items: [
        { label: 'Paragraphs & Words', val: 'Exact word counts, sentence lengths, and paragraph tallies' },
        { label: 'HTML Wrappers', val: 'Wrap output in `<p>`, `<li>`, `<blockquote>`, or `<h3>`' },
        { label: 'Markdown Output', val: 'Generates structured markdown with headings and lists' },
        { label: 'JSON Array', val: 'Export structured string arrays for mock database seeding' },
        { label: 'Instant Copy', val: '1-click clipboard copy with byte and character statistics' }
      ]
    },
    footerNotes: '✓ Mathematical Modular Scales • 5 Thematic Wordbanks • HTML/Markdown/JSON Syntax Serialization'
  },
  {
    fileName: 'formatter_data_transform_poster_1200x800.svg',
    categoryBadge: 'DATA SERIALIZATION',
    title: 'Universal Code & Data Formatter AST Pipeline',
    subtitle: 'Abstract syntax tree parsing, pretty printing, minification, and conversion for JSON, SQL, YAML, and CSV.',
    theme: {
      accent1: '#00f2fe',
      accent2: '#34d399',
      badgeBg: '#0f766e',
      badgeBorder: '#00f2fe'
    },
    col1: {
      title: 'JSON Beautifier & Validator',
      items: [
        { label: 'RFC 8259 Compliance', val: 'Strict syntax validation with exact line/column error markers' },
        { label: 'Indentation Control', val: 'Configurable 2-space, 4-space, or tab indentation' },
        { label: 'Key Sorting', val: 'Alphabetical key ordering for deterministic payload comparisons' },
        { label: 'Compact Minify', val: 'Strips all whitespace and newlines for high-efficiency network transfer' },
        { label: 'Schema Inspection', val: 'Tree-view visual explorer for nested objects and arrays' }
      ]
    },
    col2: {
      title: 'SQL Dialect Formatter',
      items: [
        { label: 'ANSI & PostgreSQL', val: 'Standard SQL formatting with case normalization' },
        { label: 'Keyword Uppercase', val: 'Auto-capitalizes `SELECT`, `FROM`, `WHERE`, `JOIN`, `GROUP BY`' },
        { label: 'Clause Indentation', val: 'Subqueries, CTEs, and JOIN conditions aligned hierarchically' },
        { label: 'MySQL & SQLite', val: 'Dialect-aware quoting (backticks, brackets, double quotes)' },
        { label: 'Query Minification', val: 'Compresses multi-line SQL into single-line execution strings' }
      ]
    },
    col3: {
      title: 'CSV, YAML & Cross-Converters',
      items: [
        { label: 'JSON to YAML', val: 'Transforms JSON objects into readable human-friendly YAML' },
        { label: 'YAML to JSON', val: 'Parses complex YAML anchors, lists, and multi-doc streams' },
        { label: 'JSON to CSV', val: 'Flattens nested JSON hierarchies into tabular CSV rows' },
        { label: 'CSV to JSON', val: 'Auto-detects delimiters (comma, tab, semicolon, pipe)' },
        { label: 'Big Data Streaming', val: 'Handles megabyte-scale files without UI freezing' }
      ]
    },
    footerNotes: '✓ Client-Side Parsing • 100% In-Memory Data Pipeline • Zero External Cloud Telemetry'
  },
  {
    fileName: 'qr_barcode_symbologies_poster_1200x800.svg',
    categoryBadge: 'SYMBOLOGY & SCANNING',
    title: '2D Symbology Matrix, QR Code & Barcode Architecture',
    subtitle: 'Reed-Solomon error correction levels, mask patterns, UPC/EAN linear barcodes, and camera decoding.',
    theme: {
      accent1: '#818cf8',
      accent2: '#38bdf8',
      badgeBg: '#3730a3',
      badgeBorder: '#818cf8'
    },
    col1: {
      title: 'QR Code 2D Architecture',
      items: [
        { label: 'Position Detection', val: 'Finder patterns (3 outer corners) define orientation' },
        { label: 'Timing Patterns', val: 'Alternating black/white modules clock the grid pitch' },
        { label: 'Alignment Patterns', val: 'Corrects camera distortion on curved or angled surfaces' },
        { label: 'Format Information', val: 'Stores Error Correction level and masking algorithm ID' },
        { label: 'Quiet Zone', val: 'Mandatory 4-module blank margin surrounding the matrix' }
      ]
    },
    col2: {
      title: 'Reed-Solomon Error Correction',
      items: [
        { label: 'Level L (Low)', val: '~7% data restoration — maximum storage density' },
        { label: 'Level M (Medium)', val: '~15% data restoration — default standard for digital screens' },
        { label: 'Level Q (Quartile)', val: '~25% data restoration — ideal for industrial labels' },
        { label: 'Level H (High)', val: '~30% data restoration — required when embedding logos in center' },
        { label: 'Mask Evaluation', val: '8 penalty-scored mask formulas prevent confusing optical patterns' }
      ]
    },
    col3: {
      title: 'Linear Barcodes & WebRTC Scanner',
      items: [
        { label: 'Code 128 / 39', val: 'High-density alphanumeric barcodes for shipping & inventory' },
        { label: 'EAN-13 / UPC-A', val: 'Global retail item symbologies with modulo-10 checksums' },
        { label: 'Styling & Gradients', val: 'Artistic color gradients, dot styles, and embedded logos' },
        { label: 'Live Camera Scan', val: 'WebRTC video stream scanner powered by BarcodeDetector API' },
        { label: 'Vector SVG Export', val: 'Infinite resolution SVG and high-res 300 DPI PNG export' }
      ]
    },
    footerNotes: '✓ Reed-Solomon Resilience • Linear & 2D Symbologies • Native Browser Camera Scanning'
  },
  {
    fileName: 'curl_api_converter_poster_1200x800.svg',
    categoryBadge: 'API INTEGRATION',
    title: 'HTTP Request Parsing & Multi-Language Code Generation',
    subtitle: 'cURL CLI flag decomposition into JavaScript Fetch, Python Requests, Axios, Go HTTP, and Rust reqwest.',
    theme: {
      accent1: '#f59e0b',
      accent2: '#38bdf8',
      badgeBg: '#78350f',
      badgeBorder: '#f59e0b'
    },
    col1: {
      title: 'cURL Command Flag Decomposition',
      items: [
        { label: '-X, --request', val: 'HTTP Method (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD)' },
        { label: '-H, --header', val: 'Headers (Authorization, Content-Type, Accept, User-Agent)' },
        { label: '-d, --data / -F', val: 'Raw JSON, URL-encoded payload, or multipart form boundary' },
        { label: '-u, --user', val: 'Basic Authentication translated into Base64 Authorization header' },
        { label: '--compressed', val: 'Requests gzip, deflate, or brotli content encodings' }
      ]
    },
    col2: {
      title: 'Multi-Language Target Engines',
      items: [
        { label: 'JavaScript (Fetch)', val: 'Modern async/await native browser API with Promises' },
        { label: 'Node.js (Axios)', val: 'Production-ready Axios configuration with interceptor support' },
        { label: 'Python (Requests)', val: 'Idiomatic Python dictionary headers and `json=` or `data=`' },
        { label: 'Go (net/http)', val: 'Type-safe Go client, `http.NewRequestWithContext` and defer close' },
        { label: 'Rust (reqwest)', val: 'Asynchronous Rust client syntax with serde_json serialization' }
      ]
    },
    col3: {
      title: 'Security & Token Best Practices',
      items: [
        { label: 'Env Var Templating', val: 'Replaces sensitive Bearer tokens with `${API_KEY}` placeholders' },
        { label: 'Sanitized Output', val: 'Escapes quotation marks, newlines, and special shell symbols' },
        { label: 'Zero Network I/O', val: 'Conversion executes completely in browser without sending requests' },
        { label: 'Cookie Parsing', val: 'Extracts `-b, --cookie` into structured headers or cookie jars' },
        { label: '1-Click Copy', val: 'Instant snippet copy for faster developer debugging workflows' }
      ]
    },
    footerNotes: '✓ Zero-Transmission cURL Parser • 6 Idiomatic Code Targets • Environment Variable Secret Shield'
  },
  {
    fileName: 'cron_scheduling_matrix_poster_1200x800.svg',
    categoryBadge: 'TASK SCHEDULING',
    title: '5-Field Cron Scheduling Expression Matrix',
    subtitle: 'Minute, Hour, Day-of-Month, Month, Day-of-Week field standards, wildcards, step values, and next-run calculations.',
    theme: {
      accent1: '#34d399',
      accent2: '#00f2fe',
      badgeBg: '#064e3b',
      badgeBorder: '#34d399'
    },
    col1: {
      title: '5-Field Position Syntax',
      items: [
        { label: 'Field 1: Minute', val: '0 – 59 (or * / , -)' },
        { label: 'Field 2: Hour', val: '0 – 23 (24-hour military time)' },
        { label: 'Field 3: Day of Month', val: '1 – 31 (calendar day of the month)' },
        { label: 'Field 4: Month', val: '1 – 12 (or JAN – DEC)' },
        { label: 'Field 5: Day of Week', val: '0 – 6 (0 = Sunday; or SUN – SAT)' }
      ]
    },
    col2: {
      title: 'Special Characters & Operators',
      items: [
        { label: '* (Wildcard)', val: 'Matches every valid value for that field (e.g. every minute)' },
        { label: ', (Value List)', val: 'Specifies multiple values (e.g. `1,15,30` for minutes)' },
        { label: '- (Value Range)', val: 'Specifies inclusive boundary range (e.g. `9-17` for business hours)' },
        { label: '/ (Step Values)', val: 'Specifies rate increment (e.g. `*/15` for every 15 minutes)' },
        { label: '@reboot, @daily', val: 'Common standard macro aliases for standard task frequencies' }
      ]
    },
    col3: {
      title: 'Human-Readable Translations',
      items: [
        { label: '*/15 * * * *', val: '“Every 15 minutes, every day, all year”' },
        { label: '0 0 * * *', val: '“At midnight (00:00) every day”' },
        { label: '0 9 * * 1-5', val: '“At 09:00 AM, Monday through Friday”' },
        { label: '0 0 1 1 *', val: '“At 00:00 on January 1st (New Year annual run)”' },
        { label: 'Next Run Preview', val: 'Calculates the next 5 upcoming wall-clock execution timestamps' }
      ]
    },
    footerNotes: '✓ POSIX Cron Standard • Natural Language Explainer • Deterministic Next Execution Calculator'
  },
  {
    fileName: 'json_types_schema_poster_1200x800.svg',
    categoryBadge: 'TYPE COMPILATION',
    title: 'JSON Schema Type Inference & Interface Compiler',
    subtitle: 'Automatic recursive type deduction into TypeScript interfaces, Python Pydantic, Go structs, and Rust Serde.',
    theme: {
      accent1: '#38bdf8',
      accent2: '#818cf8',
      badgeBg: '#1e3a8a',
      badgeBorder: '#38bdf8'
    },
    col1: {
      title: 'Recursive Type Inference',
      items: [
        { label: 'Primitive Detection', val: 'Distinguishes strings, numbers (int vs float), booleans, null' },
        { label: 'Homogeneous Arrays', val: 'Infuses array elements to deduce `string[]`, `number[]`, or `Item[]`' },
        { label: 'Union Types', val: 'Detects mixed-type arrays and synthesizes `(string | number)[]`' },
        { label: 'Optional Fields', val: 'Compares multiple sample objects to mark missing keys as `?`' },
        { label: 'Nested Entities', val: 'Recursively creates decoupled sub-interfaces for child objects' }
      ]
    },
    col2: {
      title: 'Multi-Language Target Syntax',
      items: [
        { label: 'TypeScript', val: 'Clean `interface RootObject` with JSDoc annotations' },
        { label: 'Python (Pydantic)', val: 'Class definitions inheriting `BaseModel` with type hints' },
        { label: 'Python (TypedDict)', val: 'Lightweight dictionary schemas with `Optional[T]` support' },
        { label: 'Go Structs', val: 'Strict PascalCase struct fields with `` `json:"key"` `` tags' },
        { label: 'Rust (Serde)', val: 'Strict structs tagged with `#[derive(Serialize, Deserialize)]`' }
      ]
    },
    col3: {
      title: 'Styling & Naming Conventions',
      items: [
        { label: 'PascalCase Types', val: 'Auto-capitalizes interface names from payload keys' },
        { label: 'CamelCase Properties', val: 'Converts snake_case JSON keys to camelCase in TypeScript' },
        { label: 'Readonly Modifiers', val: 'Optional `readonly` flags to prevent mutation bugs' },
        { label: 'Nullability Flags', val: 'Handles `null` fields gracefully with nullable unions' },
        { label: 'Schema Export', val: 'Generates valid draft-07 JSON Schema specifications' }
      ]
    },
    footerNotes: '✓ 100% In-Browser Type Synthesizer • Strict Static Typings • TypeScript, Go, Python & Rust'
  },
  {
    fileName: 'robots_crawler_shield_poster_1200x800.svg',
    categoryBadge: 'SEO & WEB STANDARDS',
    title: 'Search Engine Crawler Directives & AI Bot Shield',
    subtitle: 'Robots Exclusion Protocol standards, User-Agent rules, Crawl-Delay, and generative AI crawler blocking.',
    theme: {
      accent1: '#f43f5e',
      accent2: '#fbbf24',
      badgeBg: '#881337',
      badgeBorder: '#f43f5e'
    },
    col1: {
      title: 'Robots.txt Directive Syntax',
      items: [
        { label: 'User-agent:', val: 'Specifies crawler bot name (e.g. `Googlebot`, `*` for all)' },
        { label: 'Disallow:', val: 'Blocks crawler access to relative path prefix (e.g. `/admin/`)' },
        { label: 'Allow:', val: 'Explicitly permits crawling within a disallowed directory branch' },
        { label: 'Sitemap:', val: 'Absolute URL pointing to XML sitemap index' },
        { label: 'Crawl-delay:', val: 'Rate limits crawler requests (seconds between hits)' }
      ]
    },
    col2: {
      title: 'AI Scraper Shield Matrix',
      items: [
        { label: 'GPTBot (OpenAI)', val: 'Blocks ChatGPT training scraping while permitting search' },
        { label: 'ClaudeBot (Anthropic)', val: 'Restricts Anthropic LLM web crawlers from ingesting content' },
        { label: 'CCBot (Common Crawl)', val: 'Stops automated scraping into open-source training corpuses' },
        { label: 'PerplexityBot', val: 'Controls Perplexity AI answer engine crawler access' },
        { label: 'Google-Extended', val: 'Allows Google Search indexing while opting out of Gemini AI training' }
      ]
    },
    col3: {
      title: 'Security & SEO Rules',
      items: [
        { label: 'Root Placement', val: 'Must reside at `domain.com/robots.txt` (case sensitive)' },
        { label: 'Not Access Control', val: 'Robots.txt is public; never put secret URLs in disallow list' },
        { label: 'Clean Syntax', val: 'Validates line endings, comments (`#`), and wildcard paths' },
        { label: 'End Anchor ($)', val: 'Matches exact string ends (e.g. `Disallow: /*.pdf$` blocks PDFs)' },
        { label: 'Live Syntax Tester', val: 'Tests whether Googlebot can crawl specific URLs on your site' }
      ]
    },
    footerNotes: '✓ RFC 9309 Protocol Standard • Dedicated AI Bot Defense Rules • In-Memory Visual Generator'
  },
  {
    fileName: 'temp_mail_privacy_poster_1200x800.svg',
    categoryBadge: 'PRIVACY & SECURITY',
    title: 'Ephemeral Disposable Email & Anti-Spam Architecture',
    subtitle: 'Zero-persistence mailbox generation, domain rotation, automated sync polling, and client-side sanitization.',
    theme: {
      accent1: '#c084fc',
      accent2: '#38bdf8',
      badgeBg: '#581c87',
      badgeBorder: '#c084fc'
    },
    col1: {
      title: 'Ephemeral Mailbox Engine',
      items: [
        { label: 'Random Address', val: 'Generates cryptographically random user prefixes on demand' },
        { label: 'Domain Rotation', val: 'Dynamic domain pools bypass common disposable email blacklists' },
        { label: 'No Sign-Up Required', val: 'Immediate in-browser mailbox initialization with zero credentials' },
        { label: 'Auto-Expiring', val: 'Mailbox and associated messages expire automatically after session' },
        { label: '1-Click Regeneate', val: 'Instantly trash active address and mint a fresh inbox in 1 click' }
      ]
    },
    col2: {
      title: 'Email Ingestion & Polling',
      items: [
        { label: '10s Auto-Sync', val: 'Periodic background polling checks for incoming verification emails' },
        { label: 'Sound Alerts', val: 'Auditory chime and browser desktop notifications on receipt' },
        { label: 'Subject & Sender', val: 'Displays raw envelope data with SPF/DKIM verification indicators' },
        { label: 'Attachment Scanner', val: 'Lists incoming file attachments with file size indicators' },
        { label: 'OTP Code Callout', val: 'Auto-extracts 4-to-8 digit confirmation codes for rapid copy' }
      ]
    },
    col3: {
      title: 'Sanitization & Privacy Shield',
      items: [
        { label: 'Tracking Pixel Strip', val: 'Neutralizes 1x1 spy pixels and marketing read-receipts' },
        { label: 'HTML Sanitizer', val: 'DOMPurify scrubs dangerous scripts, iframes, and malware' },
        { label: 'External Image Shield', val: 'Blocks automatic remote asset loads to prevent IP leaks' },
        { label: 'No Local Tracking', val: 'Zero cookies, zero analytics, zero cross-site fingerprinting' },
        { label: 'Instant Burn', val: 'Destroys local mailbox cache upon closing the browser tab' }
      ]
    },
    footerNotes: '✓ Zero-Log Ephemeral Architecture • Automatic Tracking Pixel Stripper • Client-Side HTML Sanitizer'
  },
  {
    fileName: 'screenshot_studio_capture_poster_1200x800.svg',
    categoryBadge: 'GRAPHICS & CAPTURE',
    title: 'Screen Capture API, Framing & Annotation Architecture',
    subtitle: 'DisplayMedia stream capture, browser/OS window shadows, pixel redaction callouts, and raster canvas output.',
    theme: {
      accent1: '#00f2fe',
      accent2: '#c084fc',
      badgeBg: '#164e63',
      badgeBorder: '#00f2fe'
    },
    col1: {
      title: 'Screen Capture API Flow',
      items: [
        { label: 'getDisplayMedia()', val: 'Acquires secure browser tab, application window, or monitor stream' },
        { label: 'Hardware Acceleration', val: 'Captures full native display resolution up to 4K 60fps' },
        { label: 'Direct Image Paste', val: 'Paste screenshots directly from OS clipboard (`Ctrl+V`)' },
        { label: 'Local File Drop', val: 'Drag and drop PNG, JPEG, or WebP files for rapid framing' },
        { label: 'No Server Ingestion', val: 'Frames are rendered locally on client-side HTML5 Canvas' }
      ]
    },
    col2: {
      title: 'Aesthetic Mockup Frames',
      items: [
        { label: 'macOS Window Frame', val: 'Photorealistic traffic light buttons (Red, Yellow, Green)' },
        { label: 'Windows 11 Fluent', val: 'Modern acrylic rounded corners with min/max/close controls' },
        { label: 'Browser Chrome', val: 'Realistic address bar with SSL lock icon and custom URL text' },
        { label: 'Glow & Drop Shadows', val: 'Subtle soft multi-layer ambient box shadows for visual depth' },
        { label: 'Gradient Canvas', val: 'Vibrant mesh, linear, or radial gradient background backdrops' }
      ]
    },
    col3: {
      title: 'Annotation & Redaction Studio',
      items: [
        { label: 'Pixel Redact Box', val: 'Destructively pixelates or blurs private credentials and API keys' },
        { label: 'Callout Arrows', val: 'Sleek vector pointers highlight UI buttons and features' },
        { label: 'Numbered Badges', val: 'Sequential step circles (1, 2, 3...) for software tutorials' },
        { label: 'Aspect Ratio Locks', val: 'Preset social crops (Twitter 16:9, LinkedIn, Product Hunt)' },
        { label: 'High-Res PNG Export', val: 'Lossless PNG rasterization with custom 2x/3x retina scaling' }
      ]
    },
    footerNotes: '✓ Native DisplayMedia Streams • Photorealistic OS Mockup Frames • Destructive In-Canvas Redaction'
  },
  {
    fileName: 'screen_recorder_webrtc_poster_1200x800.svg',
    categoryBadge: 'VIDEO RECORDING',
    title: 'WebRTC MediaStream Recording & Container Muxing',
    subtitle: 'Screen capture track acquisition, microphone audio mixing, MediaRecorder API chunks, and WebM container packaging.',
    theme: {
      accent1: '#ef4444',
      accent2: '#f59e0b',
      badgeBg: '#7f1d1d',
      badgeBorder: '#ef4444'
    },
    col1: {
      title: 'MediaStream Track Capture',
      items: [
        { label: 'Display Track', val: 'Captures desktop screen, window, or specific browser tab' },
        { label: 'System Audio Track', val: 'Captures tab audio, sound effects, and meeting output' },
        { label: 'Microphone Input', val: 'Acquires user narration with noise suppression & echo cancel' },
        { label: 'AudioContext Mixer', val: 'Merges system audio and microphone into a unified stereo stream' },
        { label: 'Camera PiP Mode', val: 'Overlay webcam video feed in corner of screen recording' }
      ]
    },
    col2: {
      title: 'MediaRecorder Recording Engine',
      items: [
        { label: 'Blob Chunks', val: 'Streams encoded data packets continuously via `ondataavailable`' },
        { label: 'VP9 & VP8 Codecs', val: 'High-efficiency video compression with variable bitrate (VBR)' },
        { label: 'H.264 / AVC Mode', val: 'Hardware-accelerated encoding for broad platform compatibility' },
        { label: 'Opus Audio Codec', val: 'Crystal clear voice and music compression at 128 kbps' },
        { label: 'Pause & Resume', val: 'Seamless non-destructive recording pause and resume state' }
      ]
    },
    col3: {
      title: 'Packaging & Playback Controls',
      items: [
        { label: 'WebM / MP4 Packaging', val: 'Muxes video and audio tracks into standard playable containers' },
        { label: 'Instant Local Playback', val: 'Review full recording instantly without waiting for cloud encode' },
        { label: 'Duration Counter', val: 'Precise millisecond timer tracking recording length' },
        { label: 'Zero File Size Limits', val: 'Record long presentations without cloud storage restrictions' },
        { label: 'Direct Download', val: 'Saves file directly to computer drive with zero server upload' }
      ]
    },
    footerNotes: '✓ Hardware Accelerated MediaRecorder • Dual-Source Audio Mixer • Unlimited In-Browser Video Recording'
  },
  {
    fileName: 'voice_audio_waveform_poster_1200x800.svg',
    categoryBadge: 'AUDIO ENGINEERING',
    title: 'Web Audio API Waveform Analysis & PCM WAV Encoding',
    subtitle: 'Microphone stream capture, Fast Fourier Transform (FFT) spectrum analysis, and uncompressed 16-bit PCM WAV export.',
    theme: {
      accent1: '#10b981',
      accent2: '#38bdf8',
      badgeBg: '#064e3b',
      badgeBorder: '#10b981'
    },
    col1: {
      title: 'Web Audio Context Ingestion',
      items: [
        { label: 'getUserMedia()', val: 'Requests secure microphone access at native 44.1kHz / 48kHz' },
        { label: 'Echo Cancellation', val: 'Hardware and software acoustic echo neutralization' },
        { label: 'Gain Controller', val: 'Dynamic input level preamp prevents clipping distortion' },
        { label: 'AudioWorklet Engine', val: 'Low-latency background thread buffers raw floating-point samples' },
        { label: 'Mono / Stereo Toggle', val: 'Record single-channel voice or wide stereo instrument audio' }
      ]
    },
    col2: {
      title: 'Real-Time Waveform Visualizer',
      items: [
        { label: 'AnalyserNode', val: 'Calculates real-time audio energy and decibel peaks' },
        { label: 'FFT Frequency Bars', val: 'Fast Fourier Transform breaks signal into frequency spectrum' },
        { label: 'Time-Domain Scope', val: 'Smooth oscilloscope wave traces amplitude variations' },
        { label: 'Peak VU Meter', val: 'Color-coded dBFS meter (Green safe, Yellow hot, Red clip)' },
        { label: '60 FPS Canvas Render', val: 'Hardware-accelerated smooth canvas visualization' }
      ]
    },
    col3: {
      title: '16-Bit PCM WAV Compiler',
      items: [
        { label: 'RIFF Header', val: 'Constructs standard 44-byte canonical WAV header in-memory' },
        { label: 'Linear PCM Encoding', val: 'Converts Float32 audio samples into signed 16-bit integers' },
        { label: 'Lossless Fidelity', val: 'Zero compression artifacts; studio-grade uncompressed audio' },
        { label: 'Immediate Scrubbing', val: 'Integrated HTML5 player with interactive seekable waveform' },
        { label: 'Instant Download', val: 'Exports pristine .wav files ready for DAW or podcast editing' }
      ]
    },
    footerNotes: '✓ Studio-Grade Uncompressed 16-bit PCM • Real-Time 60FPS FFT Spectrum • Zero Cloud Latency'
  },
  {
    fileName: 'audio_transcoding_pipeline_poster_1200x800.svg',
    categoryBadge: 'AUDIO PIPELINE',
    title: 'Audio Transcoding, Spectrum Trimming & Video Demuxing',
    subtitle: 'In-memory decoding of MP3/WAV/OGG, visual waveform non-destructive slicing, and video track demuxing.',
    theme: {
      accent1: '#f59e0b',
      accent2: '#818cf8',
      badgeBg: '#78350f',
      badgeBorder: '#f59e0b'
    },
    col1: {
      title: 'Multi-Codec Transcoding',
      items: [
        { label: 'MP3 Transcoder', val: 'Configurable bitrate encoding (128k, 192k, 256k, 320k CBR)' },
        { label: 'WAV Lossless', val: 'Pristine uncompressed PCM audio preservation' },
        { label: 'OGG Vorbis', val: 'High-efficiency open-source web and gaming audio format' },
        { label: 'Sample Rate Control', val: 'Resample between 22.05 kHz, 44.1 kHz, and 48 kHz' },
        { label: 'Channel Management', val: 'Stereo downmixing to mono or mono expansion' }
      ]
    },
    col2: {
      title: 'Visual Waveform Trimming',
      items: [
        { label: 'Peaks Overview', val: 'Generates full audio visual envelope from start to finish' },
        { label: 'A-B Cue Markers', val: 'Drag start and end handles with millisecond precision' },
        { label: 'Fade In / Fade Out', val: 'Applies smooth exponential volume ramping at cut edges' },
        { label: 'Loop Auditioning', val: 'Quickly preview selected region before exporting' },
        { label: 'Non-Destructive', val: 'Source audio remains untouched in memory until download' }
      ]
    },
    col3: {
      title: 'Video Audio Demuxer',
      items: [
        { label: 'MP4 / WebM Extract', val: 'Strips video frames and extracts underlying soundtrack' },
        { label: 'Zero Quality Loss', val: 'Direct audio stream copying without re-encoding degradation' },
        { label: 'Ringtone Creator', val: 'Snip 30-second clips from favorite videos in seconds' },
        { label: 'ID3 Tag Preservation', val: 'Preserves track metadata, artist, title, and album' },
        { label: 'Private Processing', val: 'Large video files stay 100% on your local machine' }
      ]
    },
    footerNotes: '✓ Client-Side Codec Transcoding • Precision Sub-Second Trimming • Instant Video Audio Extraction'
  },
  {
    fileName: 'video_speed_playback_poster_1200x800.svg',
    categoryBadge: 'VIDEO ENGINE',
    title: 'HTML5 Video Playback Rate & Pitch Correction Matrix',
    subtitle: 'MediaElement playbackRate manipulation, Web Audio pitch preservation algorithms, frame stepping, and A-B looping.',
    theme: {
      accent1: '#38bdf8',
      accent2: '#10b981',
      badgeBg: '#075985',
      badgeBorder: '#38bdf8'
    },
    col1: {
      title: 'Playback Velocity Engine',
      items: [
        { label: 'Fine Step Control', val: 'Granular speed adjustments from 0.1x to 4.0x in 0.05x steps' },
        { label: 'Quick Presets', val: 'Instant 0.5x (Slow-Mo), 1.0x (Normal), 1.5x, 2.0x, 3.0x speed buttons' },
        { label: 'HTML5 MediaElement', val: 'Direct hardware-accelerated video decoding with zero lag' },
        { label: 'Keyboard Shortcuts', val: 'Control speed with `[` (slower), `]` (faster), and `\` (reset)' },
        { label: 'Universal Support', val: 'Compatible with MP4, WebM, Ogg, and MOV local video files' }
      ]
    },
    col2: {
      title: 'Pitch Preservation & Frame Stepping',
      items: [
        { label: 'preservesPitch API', val: 'Prevents chipmunk squeaks or demon groans at extreme speeds' },
        { label: 'WSOLA Time-Stretching', val: 'Waveform Similarity Overlap-Add keeps voice timbre natural' },
        { label: 'Single Frame Step', val: 'Step forward or backward by 1 video frame (1/30s or 1/60s)' },
        { label: 'Motion Analysis', val: 'Examine sports, dance, and animation details frame-by-frame' },
        { label: 'Zero Drift Sync', val: 'Audio and video stay in exact lip-sync lock across all speeds' }
      ]
    },
    col3: {
      title: 'A-B Loop & Frame Snapping',
      items: [
        { label: 'A-B Repeat Loop', val: 'Set point A and point B to loop a specific scene continuously' },
        { label: 'Practice Mode', val: 'Loop musical passages or athletic technique drills at half speed' },
        { label: 'Frame Snapper', val: 'Capture high-res still image snapshot from any video frame' },
        { label: 'Fullscreen Theater', val: 'Distraction-free theater viewing with floating HUD controls' },
        { label: '100% Private', val: 'No video buffering to remote servers; private and offline-ready' }
      ]
    },
    footerNotes: '✓ Hardware Accelerated PlaybackRate • Pitch-Preserving Audio Time-Stretch • Frame-Accurate Scrubbing'
  },
  {
    fileName: 'video_gif_encoder_poster_1200x800.svg',
    categoryBadge: 'GIF COMPRESSION',
    title: 'Video Frame Extraction & LZW GIF Encoding Pipeline',
    subtitle: 'Canvas frame decimation, palette color quantization, Floyd-Steinberg dithering, and LZW byte compression.',
    theme: {
      accent1: '#ec4899',
      accent2: '#8b5cf6',
      badgeBg: '#831843',
      badgeBorder: '#ec4899'
    },
    col1: {
      title: 'Frame Extraction & Timing',
      items: [
        { label: 'FPS Decimation', val: 'Sample video at 10, 15, 24, or 30 FPS to balance quality and file size' },
        { label: 'Time Trimming', val: 'Select exact start and end timestamps to avoid bloated GIF files' },
        { label: 'Canvas Rendering', val: 'Pulls raw video frames into hidden OffscreenCanvas buffers' },
        { label: 'Resolution Scaling', val: 'Downscale 1080p video to 480p or 320p for optimized web avatars' },
        { label: 'Aspect Ratio Crop', val: 'Square 1:1, Landscape 16:9, or custom crop bounds' }
      ]
    },
    col2: {
      title: 'Color Quantization & Dithering',
      items: [
        { label: '256-Color Palette', val: 'Reduces 24-bit TrueColor (16.7M colors) to indexed 8-bit palette' },
        { label: 'NeuQuant Algorithm', val: 'Neural-network based adaptive color palette quantization' },
        { label: 'Floyd-Steinberg Dither', val: 'Diffuses color quantization error across neighboring pixels' },
        { label: 'Banding Prevention', val: 'Smooths gradients in sky, skin tones, and subtle shadows' },
        { label: 'Transparent Color', val: 'Designates transparent background index for badge animations' }
      ]
    },
    col3: {
      title: 'LZW Compression & Export',
      items: [
        { label: 'LZW Encoding', val: 'Lempel-Ziv-Welch lossless dictionary compression on index streams' },
        { label: 'Looping Controls', val: 'Infinite loop standard or finite play counter specification' },
        { label: 'Frame Delay Headers', val: 'Sets millisecond display duration per individual frame' },
        { label: 'Instant Preview', val: 'Interactive playback of generated animated GIF before downloading' },
        { label: '100% In-Browser', val: 'No external APIs, no watermarks, no file size limitations' }
      ]
    },
    footerNotes: '✓ NeuQuant 256-Color Quantization • Floyd-Steinberg Error Diffusion • Pure Client-Side LZW Encoder'
  },
  {
    fileName: 'favicon_app_icon_matrix_poster_1200x800.svg',
    categoryBadge: 'APP BRANDING',
    title: 'Multi-Resolution Favicon & PWA App Icon Standards',
    subtitle: 'Standard ICO multi-directory packaging, Apple Touch 180x180 icons, Android manifest sizes, and maskable SVG.',
    theme: {
      accent1: '#fbbf24',
      accent2: '#38bdf8',
      badgeBg: '#78350f',
      badgeBorder: '#fbbf24'
    },
    col1: {
      title: 'Standard ICO Multi-Size Directory',
      items: [
        { label: '16 × 16 px', val: 'Browser tab icon & desktop file manager list view' },
        { label: '32 × 32 px', val: 'Retina browser tabs, bookmark bars, Windows taskbar' },
        { label: '48 × 48 px', val: 'Windows desktop shortcut & Start Menu tile icon' },
        { label: 'Single .ICO Bundle', val: 'Packages all 3 bitmap sizes into a single binary `.ico` file' },
        { label: 'Binary Header', val: 'Standard `ICONDIR` and `ICONDIRENTRY` byte structures' }
      ]
    },
    col2: {
      title: 'Apple iOS & Mobile Specs',
      items: [
        { label: 'apple-touch-icon', val: '180 × 180 px PNG for iOS Home Screen bookmarking' },
        { label: 'No Gloss Overlay', val: 'Clean square PNG; iOS automatically rounds corners' },
        { label: 'Safari Pinned Tab', val: 'Monochrome SVG mask icon with custom fill color' },
        { label: 'Open Graph Favicon', val: 'Square brand avatar for social link unfurling' },
        { label: 'High DPI Sharpness', val: 'Bilinear downsampling preserves fine logo geometry' }
      ]
    },
    col3: {
      title: 'PWA Manifest & HTML Code Generator',
      items: [
        { label: '192 × 192 px', val: 'Android Chrome PWA home screen icon' },
        { label: '512 × 512 px', val: 'PWA splash screen icon & Google Play Store standard' },
        { label: 'Maskable Icon Safezone', val: 'Inner 80% safe zone ensures logo isn’t clipped by circular masks' },
        { label: 'Ready-to-Paste HTML', val: 'Generates `<link rel="icon">` tags for your `<head>` section' },
        { label: 'manifest.json Bundle', val: 'Auto-generates complete Web App Manifest JSON schema' }
      ]
    },
    footerNotes: '✓ Standard Multi-Resolution ICO • iOS Apple Touch • PWA Manifest 192/512px • Safezone Masking'
  },
  {
    fileName: 'typography_unicode_font_matrix_poster_1200x800.svg',
    categoryBadge: 'TYPOGRAPHY & UNICODE ENGINE',
    title: 'Unicode Typography, Glyph Planes & Aesthetic Font Architecture',
    subtitle: 'Mathematical alphanumeric blocks, gothic blackletter, enclosed badges, and social media bio matrix.',
    theme: {
      accent1: '#9d4edd',
      accent2: '#00f2fe',
      badgeBg: '#7b2cbf',
      badgeBorder: '#9d4edd'
    },
    col1: {
      title: 'Unicode Character Planes',
      items: [
        { label: 'Gothic & Fraktur', val: 'U+1D504-1D537 Math Fraktur & bold gothic blackletter glyphs' },
        { label: 'Cursive Script', val: 'U+1D49C-1D4CF Math Script & Calligraphy glyph mapping' },
        { label: 'Enclosed Symbols', val: 'U+2460-24FF Circled numbers, bubbles, square box letters' },
        { label: 'Small Capitals', val: 'Phonetic & Latin small cap letter substitutions (ᴀ-ᴢ)' },
        { label: 'Zalgo Glitch Marks', val: 'U+0300-036F Stacking diacritics & glitch character chaos' }
      ]
    },
    col2: {
      title: 'Cross-Platform Compatibility',
      items: [
        { label: 'Instagram & TikTok', val: 'Natively parsed in bios, captions, reels, and direct messages' },
        { label: 'Discord & Reddit', val: '100% supported in usernames, custom roles, and channel names' },
        { label: 'Gaming Nicknames', val: 'Steam, Roblox, Fortnite, and Minecraft gamer tags' },
        { label: 'Zero Font Files', val: 'No .ttf/.woff downloads; 100% native OS font rasterization' },
        { label: 'Fallback Resilience', val: 'Graceful system fallback across iOS, Android, and Windows' }
      ]
    },
    col3: {
      title: 'Bio Studio & Aesthetic Symbols',
      items: [
        { label: 'Sparkles & Stars', val: '✦ ✧ ⋆ ★ ☾ ☀ ☁ Star, moon, and celestial symbols' },
        { label: 'Curated Dividers', val: '─ ═ ⋆｡°✩ ── Curated bio section delimiters and accents' },
        { label: 'Cute Kaomoji', val: '(｡♥‿♥｡) (⁄ ⁄•⁄ω⁄•⁄ ⁄) Japanese expressive text emoticons' },
        { label: 'Superscript & Sub', val: 'ᵗⁱⁿʸ ˢᵘᵖᵉʳˢᶜʳⁱᵖᵗ and high/low metric indicators' },
        { label: 'One-Click Clipboard', val: 'Instant async navigator.clipboard copying with zero latency' }
      ]
    },
    footerNotes: '✓ 100% Client-Side Engine • Universal Unicode Standard • Zero Data Transmission'
  },
  {
    fileName: 'financial_wealth_growth_matrix_poster_1200x800.svg',
    categoryBadge: 'FINANCIAL MATHEMATICS & WEALTH ENGINE',
    title: 'SIP Wealth Compounding & Loan Amortization Architecture',
    subtitle: 'Exponential interest calculus, reducing balance amortization, step-up accelerators, and inflation parity.',
    theme: {
      accent1: '#10b981',
      accent2: '#00f2fe',
      badgeBg: '#059669',
      badgeBorder: '#10b981'
    },
    col1: {
      title: 'Wealth Growth & SIP Calculus',
      items: [
        { label: 'Monthly SIP Annuity', val: 'M = P × [(1 + i)ⁿ - 1] / i × (1 + i) compounding future value' },
        { label: 'Goal Target Reverse', val: 'Calculates exact monthly deposit needed for target corpus' },
        { label: 'Step-Up Accelerator', val: 'Annual 5-10% investment increments to double final corpus' },
        { label: 'Compound Frequencies', val: 'Daily, Monthly, Quarterly, and Annual APY compound models' },
        { label: 'Inflation Parity', val: 'Adjusts nominal returns to real purchasing power (CPI-indexed)' }
      ]
    },
    col2: {
      title: 'Loan Amortization & Debt Calculus',
      items: [
        { label: 'Reducing Balance EMI', val: 'EMI = [P × r × (1 + r)ⁿ] / [(1 + r)ⁿ - 1] reducing debt formula' },
        { label: 'Principal vs Interest', val: 'Visualizes dynamic shifting ratio across repayment tenure' },
        { label: 'Prepayment Engine', val: 'Lump-sum & monthly prepayments save thousands in interest' },
        { label: 'Tenure Elimination', val: 'Early principal prepayments shave years off mortgage loans' },
        { label: 'Amortization Matrix', val: 'Year-by-year and month-by-month full ledger export' }
      ]
    },
    col3: {
      title: 'Engine Specs & Visual Stage',
      items: [
        { label: 'SVG Growth Curves', val: 'Interactive visual hockey-stick inflection area charts' },
        { label: 'Donut Allocation', val: 'Real-time split of Principal Outflow vs Accumulated Return' },
        { label: 'Multi-Currency Support', val: 'Standardized USD ($), INR (₹), EUR (€), GBP (£), JPY (¥)' },
        { label: 'Export Pipeline', val: 'Download CSV amortization schedules & 1-click clipboard summary' },
        { label: 'Zero Cloud Tracking', val: '100% private in-browser computation; financial data never leaves RAM' }
      ]
    },
    footerNotes: '✓ 100% Client-Side Computation • Institutional Actuarial Math • Zero Data Transmission'
  }
];

// Helper to render an SVG poster from spec
function generatePosterSvg(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <!-- Background Gradients -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#070a13" />
      <stop offset="50%" stop-color="#0a0f1d" />
      <stop offset="100%" stop-color="#050811" />
    </linearGradient>

    <linearGradient id="accentTitle" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${p.theme.accent1}" />
      <stop offset="100%" stop-color="${p.theme.accent2}" />
    </linearGradient>

    <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" stroke-width="0.75" stroke-opacity="0.35" />
    </pattern>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="1200" height="800" fill="url(#bgGrad)" />
  <rect width="1200" height="800" fill="url(#gridPattern)" />

  <!-- Ambient Light Orbs -->
  <circle cx="160" cy="140" r="180" fill="${p.theme.accent1}" opacity="0.05" />
  <circle cx="1060" cy="180" r="200" fill="${p.theme.accent2}" opacity="0.05" />

  <!-- Outer Cyber Border -->
  <rect x="24" y="24" width="1152" height="752" rx="18" fill="none" stroke="#1e293b" stroke-width="1.5" />

  <!-- HEADER -->
  <g transform="translate(50, 48)">
    <rect width="280" height="26" rx="13" fill="${p.theme.accent1}" fill-opacity="0.1" stroke="${p.theme.accent1}" stroke-opacity="0.3" stroke-width="1" />
    <text x="140" y="17" fill="${p.theme.accent1}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" text-anchor="middle" letter-spacing="1.5">OMNITOOL HUB • ${escapeXml(p.categoryBadge)}</text>
    <text x="0" y="66" fill="url(#accentTitle)" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" letter-spacing="-0.5">${escapeXml(p.title)}</text>
    <text x="0" y="90" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="13.5" font-weight="500">${escapeXml(p.subtitle)}</text>
  </g>

  <!-- 3-COLUMN ARCHITECTURE GRID (Y: 155 to 680) -->
  <g transform="translate(50, 155)">
    <!-- Column 1 -->
    <g transform="translate(0, 0)">
      <rect width="350" height="525" rx="12" fill="#0d121f" fill-opacity="0.9" stroke="#1e293b" stroke-width="1.2" />
      <rect width="350" height="42" rx="12" fill="#131b2e" />
      <rect y="40" width="350" height="2" fill="#1e293b" />
      <circle cx="22" cy="21" r="5" fill="${p.theme.accent1}" />
      <text x="36" y="25" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700">${escapeXml(p.col1.title)}</text>

      ${p.col1.items.map((it, idx) => `
      <g transform="translate(18, ${60 + idx * 90})">
        <rect width="314" height="76" rx="8" fill="#111827" stroke="#1f2937" stroke-width="1" />
        <text x="14" y="24" fill="${p.theme.accent1}" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="700">${escapeXml(it.label)}</text>
        <text x="14" y="44" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="10.5">${escapeXml(it.val.substring(0, 48))}</text>
        <text x="14" y="60" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="10.5">${escapeXml(it.val.substring(48, 100))}</text>
      </g>`).join('')}
    </g>

    <!-- Column 2 -->
    <g transform="translate(375, 0)">
      <rect width="350" height="525" rx="12" fill="#0d121f" fill-opacity="0.9" stroke="#1e293b" stroke-width="1.2" />
      <rect width="350" height="42" rx="12" fill="#131b2e" />
      <rect y="40" width="350" height="2" fill="#1e293b" />
      <circle cx="22" cy="21" r="5" fill="${p.theme.accent2}" />
      <text x="36" y="25" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700">${escapeXml(p.col2.title)}</text>

      ${p.col2.items.map((it, idx) => `
      <g transform="translate(18, ${60 + idx * 90})">
        <rect width="314" height="76" rx="8" fill="#111827" stroke="#1f2937" stroke-width="1" />
        <text x="14" y="24" fill="${p.theme.accent2}" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="700">${escapeXml(it.label)}</text>
        <text x="14" y="44" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="10.5">${escapeXml(it.val.substring(0, 48))}</text>
        <text x="14" y="60" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="10.5">${escapeXml(it.val.substring(48, 100))}</text>
      </g>`).join('')}
    </g>

    <!-- Column 3 -->
    <g transform="translate(750, 0)">
      <rect width="350" height="525" rx="12" fill="#0d121f" fill-opacity="0.9" stroke="#1e293b" stroke-width="1.2" />
      <rect width="350" height="42" rx="12" fill="#131b2e" />
      <rect y="40" width="350" height="2" fill="#1e293b" />
      <circle cx="22" cy="21" r="5" fill="#f59e0b" />
      <text x="36" y="25" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700">${escapeXml(p.col3.title)}</text>

      ${p.col3.items.map((it, idx) => `
      <g transform="translate(18, ${60 + idx * 90})">
        <rect width="314" height="76" rx="8" fill="#111827" stroke="#1f2937" stroke-width="1" />
        <text x="14" y="24" fill="#f59e0b" font-family="'JetBrains Mono', monospace" font-size="11.5" font-weight="700">${escapeXml(it.label)}</text>
        <text x="14" y="44" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="10.5">${escapeXml(it.val.substring(0, 48))}</text>
        <text x="14" y="60" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="10.5">${escapeXml(it.val.substring(48, 100))}</text>
      </g>`).join('')}
    </g>
  </g>

  <!-- FOOTER -->
  <g transform="translate(50, 712)">
    <rect width="1100" height="42" rx="8" fill="#0d121f" stroke="#1e293b" stroke-width="1" />
    <text x="20" y="26" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">OmniTool Hub Master Technical Reference</text>
    <text x="1080" y="26" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="11" text-anchor="end">${escapeXml(p.footerNotes)}</text>
  </g>
</svg>`;
}

// Generate all 20 posters
let generatedCount = 0;
for (const p of posters) {
  const filePath = path.join(assetsDir, p.fileName);
  const svgContent = generatePosterSvg(p);
  fs.writeFileSync(filePath, svgContent, 'utf8');
  console.log(`Generated SVG poster: ${p.fileName}`);
  generatedCount++;
}

console.log(`Successfully generated all ${generatedCount} SVG technical reference posters in social_media_assets/!`);

