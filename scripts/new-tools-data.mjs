// Metadata and documentation definitions for 20 new powerhouse tool suites

export const newToolMeta = {
  'pdf-converter-hub': { category: 'files', categoryName: 'Files & PDFs', icon: '🔄', color: '#ec4899' },
  'pdf-editor-suite': { category: 'files', categoryName: 'Files & PDFs', icon: '✏️', color: '#ec4899' },
  'pdf-security-suite': { category: 'files', categoryName: 'Files & PDFs', icon: '🔒', color: '#ec4899' },
  'pdf-ai': { category: 'files', categoryName: 'Files & PDFs', icon: '🤖', color: '#ec4899' },
  'compare-pdf': { category: 'files', categoryName: 'Files & PDFs', icon: '📑', color: '#ec4899' },
  'lorem-generator': { category: 'text', categoryName: 'Text & Writing', icon: '📜', color: '#10b981' },
  'formatter-suite': { category: 'dev', categoryName: 'Developer Tools', icon: '✨', color: '#00f2fe' },
  'qr-studio': { category: 'dev', categoryName: 'Developer Tools', icon: '📷', color: '#00f2fe' },
  'curl-converter': { category: 'dev', categoryName: 'Developer Tools', icon: '📡', color: '#00f2fe' },
  'cron-builder': { category: 'dev', categoryName: 'Developer Tools', icon: '⏰', color: '#00f2fe' },
  'json-to-types': { category: 'dev', categoryName: 'Developer Tools', icon: '🏷️', color: '#00f2fe' },
  'robots-generator': { category: 'dev', categoryName: 'Developer Tools', icon: '🤖', color: '#00f2fe' },
  'temp-mail': { category: 'crypto', categoryName: 'Crypto & Privacy', icon: '📬', color: '#f59e0b' },
  'screenshot-capture': { category: 'design', categoryName: 'Design & CSS', icon: '🖥️', color: '#9d4edd' },
  'screen-recorder': { category: 'design', categoryName: 'Design & CSS', icon: '🎥', color: '#9d4edd' },
  'voice-recorder': { category: 'design', categoryName: 'Design & CSS', icon: '🎙️', color: '#9d4edd' },
  'audio-suite': { category: 'design', categoryName: 'Design & CSS', icon: '🎵', color: '#9d4edd' },
  'video-speed': { category: 'design', categoryName: 'Design & CSS', icon: '⏩', color: '#9d4edd' },
  'video-to-gif': { category: 'design', categoryName: 'Design & CSS', icon: '🎞️', color: '#9d4edd' },
  'favicon-generator': { category: 'design', categoryName: 'Design & CSS', icon: '⭐', color: '#9d4edd' },
  'fancy-font-generator': { category: 'text', categoryName: 'Text & Writing', icon: '✨', color: '#9d4edd' },
  'finance-calculator': { category: 'math', categoryName: 'Math & Time', icon: '💰', color: '#10b981' }
};

export const newToolsData = [
  {
    id: "pdf-converter-hub",
    fileName: "pdf-converter-hub.html",
    title: "Universal Document & PDF Converter Hub Guide | OmniTool Hub",
    description: "Convert Word DOCX, Excel XLSX, PowerPoint PPTX, Images, HTML, and Markdown to high-fidelity PDF client-side with zero data transmission.",
    h1: "Document & PDF Converter Hub Guide",
    tag: "Document Conversion",
    leadParagraph: "OmniTool Hub's Document & PDF Converter Hub is a unified powerhouse for transforming common office documents, spreadsheets, slides, photos, and web content into ISO-compliant PDF files. Operating 100% in-browser via WebAssembly and HTML5 Canvas, your proprietary financial models, confidential legal contracts, and personal documents never touch a third-party server.",
    diagram: {
      src: "../social_media_assets/pdf_converter_pipeline_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Document and PDF converter pipeline poster detailing ingestion engines, in-memory PDF assembly, and format standards",
      caption: "Document & PDF Conversion Architecture: Universal client-side compilation pipeline for Office formats, raster scans, HTML, and Markdown."
    },
    tabsTitle: "Supported Document Conversion Engines",
    tabs: [
      {
        title: "1. Word (.docx) to PDF",
        badge: "Word Engine",
        desc: "Parses OpenXML Word document hierarchies, tables, inline images, and typography directly into formatted PDF streams without needing Microsoft Office."
      },
      {
        title: "2. Excel (.xlsx / .csv) to PDF",
        badge: "Spreadsheets",
        desc: "Transforms workbook sheets, formula cell values, numerical data grids, and CSV matrices into clean paginated PDF landscape or portrait reports."
      },
      {
        title: "3. PowerPoint (.pptx) to PDF",
        badge: "Slide Decks",
        desc: "Renders slide text boxes, vector shapes, layout geometries, and visual presentations into slide-by-slide PDF documentation."
      },
      {
        title: "4. Images & Camera Scan to PDF",
        badge: "Image Gallery",
        desc: "Batch compiles JPG, PNG, and WebP captures into multi-page PDFs with auto-orientation, margin adjustments, and DPI preservation."
      },
      {
        title: "5. HTML / Markdown to PDF",
        badge: "Markup Engine",
        desc: "Converts structured Markdown or custom styled HTML/CSS code directly into clean printable PDF documents with syntax highlighting."
      }
    ],
    proTip: "When converting high-resolution photo scans into PDF, select 'Compress Streams' to activate FlateDecode compression, reducing final file size by up to 70% while maintaining crisp 300 DPI text.",
    steps: [
      "Select your target conversion engine tab (e.g., Word, Excel, Images, or Markdown).",
      "Drag and drop your source files into the drop zone or paste raw markup content.",
      "Adjust page orientation (Portrait vs. Landscape), margin spacing, and paper size (A4 vs. US Letter).",
      "Click **Compile to PDF** to execute in-memory rasterization and binary assembly.",
      "Preview the generated document and click **Download PDF** to save instantly."
    ],
    ctaHref: "../index.html#tool/pdf-converter-hub",
    ctaLabel: "Launch PDF Converter Hub"
  },
  {
    id: "pdf-editor-suite",
    fileName: "pdf-editor-suite.html",
    title: "PDF Editor, Sign & Vector Markup Studio Guide | OmniTool Hub",
    description: "Draw cursive e-signatures, fill interactive AcroForms, annotate with vector shapes, stamp watermarks, and permanently redact sensitive PII client-side.",
    h1: "PDF Editor, Sign & Markup Studio Guide",
    tag: "PDF Editor & Sign",
    leadParagraph: "OmniTool Hub's PDF Editor Studio provides professional desktop-grade markup, form filling, and digital signing capabilities directly inside your web browser. Built on non-destructive vector canvas layers with permanent destructive redaction, it lets you sign leases, fill tax forms, annotate design proofs, and redact confidential data without expensive Adobe Acrobat subscriptions.",
    diagram: {
      src: "../social_media_assets/pdf_editor_markup_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "PDF editor markup poster detailing annotation layers, e-signature engines, AcroForm filling, and legal redaction standards",
      caption: "PDF Editor & E-Signature Architecture: Freehand vector annotations, AcroForm controls, and destructive PII redaction."
    },
    tabsTitle: "Integrated Editor & Annotation Tools",
    tabs: [
      {
        title: "1. E-Sign & Handwriting Studio",
        badge: "Signatures",
        desc: "Generate fluid cursive signatures from typed text, draw by hand with mouse/stylus smoothing, or upload transparent PNG stamp signatures."
      },
      {
        title: "2. Vector Markup & Callouts",
        badge: "Annotation",
        desc: "Add rectangular highlight boxes, arrows, freehand ink, strikethroughs, sticky note pins, and custom text callouts with adjustable opacity."
      },
      {
        title: "3. Interactive AcroForm Filler",
        badge: "Forms",
        desc: "Detects standard PDF AcroForm fields automatically. Fill text inputs, toggle checkboxes, select radio options, and permanently flatten forms."
      },
      {
        title: "4. Watermark & Page Numbers",
        badge: "Stamping",
        desc: "Stamp customized diagonal confidentiality watermarks (e.g. 'CONFIDENTIAL', 'DRAFT') and dynamic 'Page X of Y' headers and footers."
      },
      {
        title: "5. Destructive PII Redaction",
        badge: "Redact",
        desc: "Permanently strips underlying vector text and raster pixels beneath redaction boxes, preventing data leakage from highlight-and-copy attempts."
      }
    ],
    proTip: "Unlike basic PDF viewers that merely paint black boxes over text, OmniTool Hub executes true destructive vector redaction, eradicating underlying font glyphs and stream bytes so confidential info can never be recovered.",
    steps: [
      "Open your target PDF file in the editor canvas.",
      "Select an editing mode from the top toolbar (Draw, Sign, Text, Redact, or Form Fill).",
      "Click or drag on the document page to position annotations, signatures, or redaction blocks.",
      "Customize properties such as line thickness, font size, stroke color, and opacity in the inspector panel.",
      "Click **Export Edited PDF** to bake changes and download your completed file."
    ],
    ctaHref: "../index.html#tool/pdf-editor-suite",
    ctaLabel: "Launch PDF Editor Studio"
  },
  {
    id: "pdf-security-suite",
    fileName: "pdf-security-suite.html",
    title: "PDF Security, Repair & ISO Archival Suite Guide | OmniTool Hub",
    description: "Apply military-grade AES-256 encryption, set granular permissions, repair corrupted xref tables, and convert documents to ISO 19005 PDF/A format.",
    h1: "PDF Security, Repair & Archival Suite Guide",
    tag: "PDF Security & Archival",
    leadParagraph: "OmniTool Hub's PDF Security Suite provides enterprise-class cryptographic protection, automated structural repair, and long-term archival standardization. Whether securing sensitive financial audits with military-grade AES-256 passwords, repairing unreadable PDFs with damaged cross-reference streams, or meeting ISO 19005 legal archival mandates, all cryptographic operations execute locally in memory.",
    diagram: {
      src: "../social_media_assets/pdf_security_repair_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "PDF security and repair poster detailing standard encryption handlers, xref table rebuilding, and PDF/A ISO standards",
      caption: "PDF Cryptography & Archival Architecture: AES-256 password protection, byte-level xref reconstruction, and PDF/A validation."
    },
    tabsTitle: "Core Security & Maintenance Engines",
    tabs: [
      {
        title: "1. AES-256 Password Protection",
        badge: "Encryption",
        desc: "Encrypts documents with Standard Security Handler Revision 6 (AES-256) or Revision 4 (AES-128). Configure separate User and Owner master passwords."
      },
      {
        title: "2. Granular Permissions Locking",
        badge: "Permissions",
        desc: "Control document rights: restrict high-resolution printing, disallow content copying, disable page modifications, and prevent form extraction."
      },
      {
        title: "3. Corrupt PDF Xref Repair",
        badge: "Data Recovery",
        desc: "Scans damaged, truncated, or unreadable PDF files byte-by-byte to reconstruct missing cross-reference tables and recover stranded page trees."
      },
      {
        title: "4. ISO 19005 PDF/A Archival",
        badge: "ISO Archival",
        desc: "Converts documents to PDF/A-1b and PDF/A-2b standards, embedding mandatory device color profiles and fonts while purging non-compliant active scripts."
      }
    ],
    proTip: "When distributing confidential contracts, set an Owner Password with printing and copying disabled, and a separate User Password required to open the document. This prevents unauthorized text extraction even in third-party PDF viewers.",
    steps: [
      "Select **PDF Security & Passwords**, **Corrupt PDF Repair**, or **PDF/A Archival** tab.",
      "Upload your PDF document into the client-side sandbox.",
      "Configure your encryption passwords and permission checkboxes, or choose PDF/A conformance level.",
      "Click **Process Document** to execute cryptographic hashing or xref table reconstruction.",
      "Download your hardened, recovered, or archival-ready PDF instantly."
    ],
    ctaHref: "../index.html#tool/pdf-security-suite",
    ctaLabel: "Launch PDF Security Suite"
  },
  {
    id: "pdf-ai",
    fileName: "pdf-ai.html",
    title: "Client-Side AI PDF Summarizer & Translator Guide | OmniTool Hub",
    description: "Extract executive briefs, generate key takeaways, identify action items, and translate dense PDF documents into 15+ languages client-side.",
    h1: "AI PDF Summarizer & Translator Guide",
    tag: "AI Document Intelligence",
    leadParagraph: "OmniTool Hub's AI PDF Summarizer & Translator revolutionizes document review by delivering high-density executive briefings, key entity extraction, and multilingual translation directly in your browser. Engineered with client-side NLP and Web Worker text parsing, it processes multi-hundred-page research papers, financial reports, and contracts with total privacy and zero cloud transmission.",
    diagram: {
      src: "../social_media_assets/pdf_ai_summarizer_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "AI PDF summarizer poster detailing client-side text extraction, NLP summarization algorithms, and multilingual translation pipeline",
      caption: "AI PDF Intelligence Architecture: In-browser text chunking, extractive summarization, and side-by-side multilingual translation."
    },
    tabsTitle: "Document Intelligence Capabilities",
    tabs: [
      {
        title: "1. Executive Brief & Takeaways",
        badge: "Summary",
        desc: "Condenses complex multi-page documents into 3-5 punchy executive bullet points, summarizing thesis, findings, and overall conclusions."
      },
      {
        title: "2. Action Items & Deliverables",
        badge: "Actionables",
        desc: "Automatically extracts contractual obligations, project milestones, task assignments, and calendar deadlines buried in document prose."
      },
      {
        title: "3. 15+ Language Neural Translation",
        badge: "Translation",
        desc: "Translates PDF text sections into Spanish, French, German, Japanese, Chinese, Hindi, Arabic, and more with side-by-side alignment."
      },
      {
        title: "4. Semantic Document Q&A",
        badge: "Query",
        desc: "Ask targeted questions about specific clauses, numerical figures, or regulatory citations and receive instant referenced answers."
      }
    ],
    proTip: "Use the 'Action Items' filter on lengthy commercial agreements or supplier contracts to isolate deliverables, warranties, and cancellation notice windows in seconds without skimming entire agreements.",
    steps: [
      "Drop your PDF document into the AI Summarizer drop zone.",
      "Select your analysis goal: **Executive Brief**, **Full Summary**, **Action Items**, or **Translate**.",
      "Choose your target language if running translation.",
      "Click **Analyze Document** to process text tokens in real time.",
      "Review the synthesized breakdown, copy markdown notes, or export a formatted summary report."
    ],
    ctaHref: "../index.html#tool/pdf-ai",
    ctaLabel: "Launch AI PDF Summarizer"
  },
  {
    id: "compare-pdf",
    fileName: "compare-pdf.html",
    title: "Visual & Textual PDF Document Diff Tool Guide | OmniTool Hub",
    description: "Compare two PDF versions side-by-side with interactive pixel diff heatmaps, swipe-wipe inspection sliders, and inline text additions/deletions.",
    h1: "PDF Document Comparison & Diff Guide",
    tag: "Document Diffing",
    leadParagraph: "When revising contracts, engineering schematics, or legal filings, catching subtle edits across document revisions is critical. OmniTool Hub's PDF Document Compare tool combines side-by-side synchronized canvas scrolling, sub-pixel graphic diff heatmaps, and Myers text stream comparison to ensure no unauthorized clause, altered dimension, or deleted paragraph slips past unnoticed.",
    diagram: {
      src: "../social_media_assets/compare_pdf_diff_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "PDF diff comparison poster detailing side-by-side synchronized viewports, pixel difference heatmaps, and Myers text diff algorithms",
      caption: "PDF Diffing Architecture: Synchronized canvas viewports, sub-pixel RGB discrepancy heatmaps, and interactive swipe-wipe sliders."
    },
    tabsTitle: "Comparison & Inspection Modes",
    tabs: [
      {
        title: "1. Synchronized Side-by-Side",
        badge: "Dual View",
        desc: "Scrolls and zooms both document versions simultaneously. Page pairing controls allow matching offset chapters or inserted pages."
      },
      {
        title: "2. Pixel Diff Heatmap",
        badge: "Visual Diff",
        desc: "Runs pixel-by-pixel RGB comparison across canvas renders. Deleted elements glow red, added elements glow green, and unchanged regions remain muted."
      },
      {
        title: "3. Interactive Swipe-Wipe Slider",
        badge: "Overlay Slider",
        desc: "Overlays both documents and provides an interactive divider handle to wipe back and forth, spotting minor layout shifts instantly."
      },
      {
        title: "4. Textual Myers Diff",
        badge: "Text Diff",
        desc: "Extracts underlying text streams and runs word-by-word diffing, displaying clean green insertions and red strikethrough deletions."
      }
    ],
    proTip: "Use the 'Pixel Diff Heatmap' mode when reviewing architectural CAD drawings or vector design proofs. It instantly highlights shifted vector paths, font kerning modifications, and altered dimensions that text-only diff engines miss.",
    steps: [
      "Upload Document A (Original / Baseline) and Document B (Modified / Revision).",
      "Navigate to the page you wish to inspect using the page selector.",
      "Switch between **Side-by-Side**, **Heatmap Diff**, **Swipe Slider**, and **Text Diff** views.",
      "Adjust diff sensitivity threshold to filter out minor printer anti-aliasing artifacts.",
      "Export a comprehensive visual audit report summarizing all detected discrepancies."
    ],
    ctaHref: "../index.html#tool/compare-pdf",
    ctaLabel: "Launch Compare PDF Tool"
  },
  {
    id: "lorem-generator",
    fileName: "lorem-generator.html",
    title: "Smart Lorem Ipsum & Typographic Dummy Text Generator | OmniTool Hub",
    description: "Generate classic Latin Cicero text, Cyberpunk lore, and B2B corporate placeholder copy formatted as HTML, Markdown, or JSON arrays.",
    h1: "Smart Lorem Ipsum & Typography Guide",
    tag: "Typography & Dummy Text",
    leadParagraph: "OmniTool Hub's Smart Lorem Ipsum Generator elevates placeholder text generation beyond generic pseudo-Latin. Designed for UI/UX designers, copywriters, and frontend engineers, it delivers classic Cicero prose, futuristic Cyberpunk lore, enterprise B2B buzzwords, and hipster artisan filler formatted cleanly with proper HTML tags, Markdown headers, or JSON data strings.",
    diagram: {
      src: "../social_media_assets/lorem_typography_design_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Lorem ipsum typography poster detailing modular type scales, theme wordbanks, and HTML markdown JSON serialization",
      caption: "Typography & Placeholder Architecture: Mathematical modular scale benchmarks, thematic wordbanks, and formatted syntax export."
    },
    tabsTitle: "Thematic Wordbanks & Syntax Engines",
    tabs: [
      {
        title: "1. Classic Latin (Cicero)",
        badge: "Standard",
        desc: "Authentic Latin sentences derived from 'De Finibus Bonorum et Malorum' written by Cicero in 45 BC, ideal for traditional editorial layouts."
      },
      {
        title: "2. Cyberpunk & Tech Lore",
        badge: "Futuristic",
        desc: "Packed with neural interfaces, cyberdecks, neon-drenched megacities, and hacker slang for cutting-edge Web3 and sci-fi mockups."
      },
      {
        title: "3. Enterprise B2B Corporate",
        badge: "Business",
        desc: "Full of agile synergies, KPI paradigms, cross-functional roadmaps, and stakeholder alignment for enterprise SaaS product mockups."
      },
      {
        title: "4. HTML & Markdown Formatting",
        badge: "Export Formats",
        desc: "Wrap outputs automatically in `<p>`, `<li>`, `<h3>`, blockquotes, or markdown syntax for instant pasting into source code."
      }
    ],
    proTip: "Select the 'JSON Array' format option to generate an array of dummy paragraph strings ready to paste directly into your React, Vue, or mock API database seed files without manual string escaping.",
    steps: [
      "Select your desired vocabulary theme (Latin, Cyberpunk, Corporate, or Artisan).",
      "Specify quantity: choose between paragraphs, sentences, words, or lists.",
      "Select your output wrapper: Plain Text, HTML Tags, Markdown, or JSON Array.",
      "Toggle 'Start with Lorem ipsum dolor sit amet...' if standard conformity is required.",
      "Click **Generate Text** and use 1-click copy to paste into your design or codebase."
    ],
    ctaHref: "../index.html#tool/lorem-generator",
    ctaLabel: "Launch Lorem Generator"
  },
  {
    id: "formatter-suite",
    fileName: "formatter-suite.html",
    title: "Universal Code & Data Formatter Suite Guide | OmniTool Hub",
    description: "Format, validate, beautify, and cross-convert JSON, SQL queries, CSV spreadsheets, and YAML documents client-side with syntax tree validation.",
    h1: "Data Formatter & Converter Suite Guide",
    tag: "Data Formatting",
    leadParagraph: "OmniTool Hub's Data Formatter & Converter Suite combines multi-language code beautification, syntax validation, and bidirectional data serialization into a single responsive workstation. Supporting formatted JSON, multi-dialect SQL queries, YAML specifications, and CSV tables, it helps developers inspect API payloads and clean messy database queries in seconds.",
    diagram: {
      src: "../social_media_assets/formatter_data_transform_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Data formatter AST pipeline poster detailing JSON RFC compliance, SQL dialect formatting, and YAML CSV bidirectional transforms",
      caption: "Data Formatting & AST Architecture: Strict JSON RFC-8259 validation, dialect-aware SQL formatting, and bidirectional CSV/YAML transformations."
    },
    tabsTitle: "Integrated Formatter Engines",
    tabs: [
      {
        title: "1. JSON Beautifier & Minifier",
        badge: "JSON",
        desc: "RFC 8259 compliant parsing with configurable 2-space, 4-space, or tab indentation, key sorting, and 1-click whitespace minification."
      },
      {
        title: "2. SQL Dialect Beautifier",
        badge: "SQL",
        desc: "Formats complex SQL queries across PostgreSQL, MySQL, and SQLite. Capitalizes keywords, indents JOINs, and aligns subqueries."
      },
      {
        title: "3. CSV to JSON & YAML Converter",
        badge: "CSV / YAML",
        desc: "Bidirectional transformer: convert spreadsheet CSV rows into structured JSON objects or human-friendly YAML configuration files."
      },
      {
        title: "4. AST Syntax Tree Inspector",
        badge: "Tree View",
        desc: "Interactive tree explorer lets you expand and collapse nested object hierarchies, inspect array lengths, and copy specific key paths."
      }
    ],
    proTip: "Use 'Sort Keys Alphabetically' before running a text diff on two API responses. This normalizes dictionary key orders, ensuring diff tools highlight actual data modifications rather than arbitrary JSON serialization ordering.",
    steps: [
      "Choose the target sub-tool tab: **JSON Formatter**, **SQL Beautifier**, or **CSV/YAML Converter**.",
      "Paste your raw data string or upload a source file.",
      "Select formatting rules (indentation spacing, uppercase SQL keywords, or delimiter type).",
      "Click **Format / Beautify** to execute syntax parsing in real time.",
      "Review formatted code in the syntax-highlighted editor and copy or download the file."
    ],
    ctaHref: "../index.html#tool/formatter-suite",
    ctaLabel: "Launch Formatter Suite"
  },
  {
    id: "qr-studio",
    fileName: "qr-studio.html",
    title: "Dynamic QR & Barcode Studio Guide | OmniTool Hub",
    description: "Generate artistic gradient QR codes, create Code-128 and UPC barcodes, and scan codes live using your device camera or uploaded image files.",
    h1: "Dynamic QR & Barcode Studio Guide",
    tag: "QR & Barcode Studio",
    leadParagraph: "OmniTool Hub's Dynamic QR & Barcode Studio provides an all-in-one suite for creating high-density 2D QR codes, industrial linear barcodes, and decoding existing codes via live camera feeds. Supporting Reed-Solomon error correction, artistic color gradients, logo embedding, and instant camera scanning via the native BarcodeDetector API, it streamlines physical-to-digital workflows.",
    diagram: {
      src: "../social_media_assets/qr_barcode_symbologies_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "QR and barcode symbologies poster detailing QR finder patterns, Reed-Solomon error correction levels, and WebRTC camera scanner",
      caption: "2D Symbology & Scanner Architecture: Reed-Solomon error correction matrices, linear barcode symbologies, and live camera decoding."
    },
    tabsTitle: "Generator & Scanner Capabilities",
    tabs: [
      {
        title: "1. Dynamic Gradient QR Generator",
        badge: "QR Generator",
        desc: "Generate QR codes for URLs, WiFi credentials, vCards, SMS, and crypto addresses with custom gradient styling and center logo stamps."
      },
      {
        title: "2. Linear Barcode Studio",
        badge: "Barcodes",
        desc: "Create standard commercial and industrial barcodes including Code 128, Code 39, EAN-13, and UPC-A with automated checksum calculation."
      },
      {
        title: "3. Live WebRTC Camera Scanner",
        badge: "Live Scan",
        desc: "Scans physical QR codes and product barcodes in real time using your smartphone or laptop webcam with zero software install required."
      },
      {
        title: "4. Image File Barcode Decoder",
        badge: "File Decode",
        desc: "Drag and drop saved screenshots or scanned photos to instantly decode embedded QR links and barcode numeric values."
      }
    ],
    proTip: "If you plan to embed a custom brand logo in the center of your QR code, always set the Error Correction Level to 'High (Level H)'. This reserves 30% data recovery capacity so scanners read the code effortlessly despite the obstructed center modules.",
    steps: [
      "Select **QR Generator**, **Barcode Generator**, or **Scanner** tab.",
      "Enter your payload (URL, Wi-Fi password, plain text, or barcode digits).",
      "Customize colors, gradients, dot styles, corner eye frames, and logo stamps.",
      "Preview the rendered code and test it with your phone's camera on screen.",
      "Export as infinite-resolution SVG for print packaging or crisp 300 DPI PNG."
    ],
    ctaHref: "../index.html#tool/qr-studio",
    ctaLabel: "Launch QR & Barcode Studio"
  },
  {
    id: "curl-converter",
    fileName: "curl-converter.html",
    title: "cURL to Multi-Language Code Converter Guide | OmniTool Hub",
    description: "Convert raw cURL shell commands into idiomatic JavaScript Fetch, Python Requests, Node.js Axios, Go net/http, and Rust reqwest code client-side.",
    h1: "cURL to Multi-Language Code Converter Guide",
    tag: "API Integration",
    leadParagraph: "Debugging API integrations often starts by copying a cURL command from Postman, Swagger, or Chrome DevTools. OmniTool Hub's cURL to Code Converter instantly translates messy shell cURL commands into clean, idiomatic code for modern programming languages without making network calls or exposing sensitive Authorization Bearer tokens to third parties.",
    diagram: {
      src: "../social_media_assets/curl_api_converter_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "cURL API converter poster detailing flag decomposition, multi-language target syntaxes, and secret token safety shields",
      caption: "cURL API Conversion Architecture: Complete flag decomposition into Fetch, Requests, Axios, Go, and Rust network clients."
    },
    tabsTitle: "Supported Target Languages & Frameworks",
    tabs: [
      {
        title: "1. JavaScript & Browser Fetch",
        badge: "JavaScript",
        desc: "Modern ES6+ async/await fetch request syntax with proper headers, body serialization, and error handling."
      },
      {
        title: "2. Python (Requests & httpx)",
        badge: "Python",
        desc: "Clean Python code using the popular `requests` library with dictionaries for headers, query params, and JSON payloads."
      },
      {
        title: "3. Node.js (Axios)",
        badge: "Node.js",
        desc: "Configured Axios request options object with proper timeout configurations and response interceptor patterns."
      },
      {
        title: "4. Go (net/http)",
        badge: "Golang",
        desc: "Idiomatic Go client setup with `http.NewRequestWithContext`, buffer body streams, and defer `resp.Body.Close()`."
      },
      {
        title: "5. Rust (reqwest)",
        badge: "Rust",
        desc: "Asynchronous Tokio/Reqwest client code with typed JSON deserialization structures."
      }
    ],
    proTip: "In Chrome DevTools Network tab, right-click any network request and select 'Copy > Copy as cURL'. Paste it directly into this tool to immediately obtain production-ready backend code for your project.",
    steps: [
      "Paste your cURL command into the input code editor.",
      "Select your target programming language (JavaScript, Python, Go, Rust, or Node.js).",
      "Toggle code formatting options (async/await wrappers, environment variable placeholders).",
      "Inspect the generated snippet in the output code view.",
      "Click **Copy Code** to paste directly into your IDE."
    ],
    ctaHref: "../index.html#tool/curl-converter",
    ctaLabel: "Launch cURL Converter"
  },
  {
    id: "cron-builder",
    fileName: "cron-builder.html",
    title: "Visual Cron Expression Builder & Explainer Guide | OmniTool Hub",
    description: "Design 5-field cron schedules visually, decode complex cron syntax into plain English, and view exact upcoming execution dates.",
    h1: "Visual Cron Expression Builder Guide",
    tag: "Task Scheduling",
    leadParagraph: "Cron expressions are the standard syntax for scheduling automated cron jobs, server backups, and batch pipelines across Linux, AWS CloudWatch, and Kubernetes. OmniTool Hub's Visual Cron Expression Builder eliminates cron syntax guesswork with an interactive 5-field designer, natural language translations, and deterministic upcoming execution timestamps.",
    diagram: {
      src: "../social_media_assets/cron_scheduling_matrix_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Cron scheduling matrix poster detailing 5-field syntax, wildcard operators, and natural language translations",
      caption: "Cron Scheduling Architecture: The 5-field time matrix, wildcard and step operators, and next-run calculations."
    },
    tabsTitle: "Builder & Verification Capabilities",
    tabs: [
      {
        title: "1. Interactive 5-Field Builder",
        badge: "Visual Builder",
        desc: "Easily configure Minutes (0-59), Hours (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6) with interactive sliders and checkmarks."
      },
      {
        title: "2. Plain English Translation",
        badge: "Explainer",
        desc: "Translates cryptic strings like `*/15 9-17 * * 1-5` into human-readable English: 'Every 15 minutes, between 09:00 AM and 05:59 PM, Monday through Friday'."
      },
      {
        title: "3. Upcoming Run Time Calculator",
        badge: "Next Runs",
        desc: "Calculates the exact calendar dates and wall-clock times for the next 5 upcoming executions in your local time zone."
      },
      {
        title: "4. Standard Scheduling Presets",
        badge: "Presets",
        desc: "1-click shortcuts for common schedules: every hour, daily midnight backup, weekly audit, end of month, or business days only."
      }
    ],
    proTip: "Keep in mind that Day of Week 0 and 7 both represent Sunday in standard POSIX cron implementations. Use our visual day picker to prevent off-by-one scheduling errors on production servers.",
    steps: [
      "Select interval parameters using the visual tabs (Minutes, Hours, Days, Months).",
      "Watch the cron string update dynamically in the primary formula bar.",
      "Verify the plain-English explanation below the expression.",
      "Check the **Upcoming Runs** list to confirm the schedule triggers at intended dates and times.",
      "Copy the validated cron string or crontab command line directly to your clipboard."
    ],
    ctaHref: "../index.html#tool/cron-builder",
    ctaLabel: "Launch Cron Builder"
  },
  {
    id: "json-to-types",
    fileName: "json-to-types.html",
    title: "JSON to TypeScript, Python & Go Interface Converter Guide | OmniTool Hub",
    description: "Automatically infer JSON types and compile schemas into TypeScript interfaces, Python Pydantic models, Go structs, and Rust Serde types.",
    h1: "JSON-to-Code Type Interface Converter Guide",
    tag: "Type Compilation",
    leadParagraph: "Manually writing static type interfaces for complex, deeply nested JSON payloads from third-party APIs is tedious and error-prone. OmniTool Hub's JSON-to-Code Interface Converter recursively inspects any sample JSON payload, infers primitive types and optional keys, and synthesizes type-safe interface definitions for TypeScript, Python Pydantic, Go, and Rust.",
    diagram: {
      src: "../social_media_assets/json_types_schema_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "JSON types schema poster detailing recursive type deduction, target syntaxes for TypeScript, Python, Go, and Rust",
      caption: "Type Inference & Interface Compiler: Automatic structural deduction from dynamic JSON into strict static typings."
    },
    tabsTitle: "Supported Target Type Systems",
    tabs: [
      {
        title: "1. TypeScript Interfaces & Types",
        badge: "TypeScript",
        desc: "Generates clean `export interface` blocks with optional property `?` markers, union arrays, and nested sub-interfaces."
      },
      {
        title: "2. Python Pydantic Models",
        badge: "Python Pydantic",
        desc: "Creates modern Pydantic v2 `BaseModel` classes with `Optional[T]` typing and field type hints for FastAPI backends."
      },
      {
        title: "3. Go Structs with Tags",
        badge: "Golang",
        desc: "Produces idiomatic PascalCase Go structs annotated with `` `json:\"field_name\"` `` tags for standard `encoding/json` parsing."
      },
      {
        title: "4. Rust (Serde) Structs",
        badge: "Rust Serde",
        desc: "Generates strict Rust structs decorated with `#[derive(Serialize, Deserialize)]` and snake_case serde renames."
      }
    ],
    proTip: "If your API returns lists with occasional null values or mixed numbers and strings, our type engine automatically synthesizes union types like `string | number | null` so your code never throws unexpected runtime type errors.",
    steps: [
      "Paste your sample JSON payload into the input editor.",
      "Select your target language: **TypeScript**, **Python Pydantic**, **Go**, or **Rust**.",
      "Configure naming preferences (root interface name, PascalCase vs camelCase).",
      "Inspect the generated type definitions in the output panel.",
      "Click **Copy Code** to paste directly into your frontend or backend codebase."
    ],
    ctaHref: "../index.html#tool/json-to-types",
    ctaLabel: "Launch JSON-to-Types"
  },
  {
    id: "robots-generator",
    fileName: "robots-generator.html",
    title: "Robots.txt Visual Builder & AI Bot Shield Guide | OmniTool Hub",
    description: "Design valid robots.txt files, block aggressive AI scrapers (GPTBot, ClaudeBot, CCBot), configure crawl delays, and validate crawler paths.",
    h1: "Robots.txt Visual Builder & AI Shield Guide",
    tag: "SEO & Crawler Directives",
    leadParagraph: "A well-configured `robots.txt` file is essential for directing search engine crawlers, protecting private site directories, and shielding your copyrighted content from automated AI scraping. OmniTool Hub's Robots.txt Builder provides a visual interface to manage user-agent directives, set crawl delays, declare XML sitemaps, and block generative AI scrapers with 1-click presets.",
    diagram: {
      src: "../social_media_assets/robots_crawler_shield_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Robots crawler shield poster detailing directive syntax, AI scraping bot defense rules, and SEO security best practices",
      caption: "Search Engine & AI Shield Architecture: RFC 9309 crawler directives, sitemap indexing, and AI training crawler defense."
    },
    tabsTitle: "Crawler Management Features",
    tabs: [
      {
        title: "1. Visual Directive Designer",
        badge: "Rule Builder",
        desc: "Define `User-agent:`, `Disallow:`, and `Allow:` rules without syntax errors. Set root paths, admin subdirectories, and media file filters."
      },
      {
        title: "2. Generative AI Bot Shield",
        badge: "AI Shield",
        desc: "1-click toggle to block known LLM training web crawlers: OpenAI GPTBot, Anthropic ClaudeBot, Common Crawl CCBot, and PerplexityBot."
      },
      {
        title: "3. XML Sitemap Declarations",
        badge: "Sitemap",
        desc: "Link multiple absolute XML sitemap locations to ensure Googlebot and Bingbot discover all newly published site URLs."
      },
      {
        title: "4. Live Crawler URL Tester",
        badge: "URL Tester",
        desc: "Test specific URL paths against your active rules to verify whether search engine crawlers are allowed or blocked."
      }
    ],
    proTip: "Remember that `robots.txt` is publicly readable by anyone who visits `yourdomain.com/robots.txt`. Never list confidential backend paths or secret admin URLs in Disallow directives—use real server authentication headers instead.",
    steps: [
      "Select your target crawler (e.g., `*` for all bots, or specific bots like Googlebot).",
      "Add path directives: click **Add Disallow** to protect directories like `/admin/` or `/tmp/`.",
      "Enable the **AI Scraper Shield** preset to automatically block AI training bots.",
      "Enter your absolute sitemap URL (e.g. `https://yoursite.com/sitemap.xml`).",
      "Click **Download robots.txt** and upload the file to your website's root public directory."
    ],
    ctaHref: "../index.html#tool/robots-generator",
    ctaLabel: "Launch Robots.txt Builder"
  },
  {
    id: "temp-mail",
    fileName: "temp-mail.html",
    title: "Disposable Temp Mail Client Guide | OmniTool Hub",
    description: "Generate instant disposable email inboxes, bypass spam, receive OTP confirmation codes, and inspect sanitized HTML messages client-side.",
    h1: "Disposable Temp Mail Client Guide",
    tag: "Privacy & Anti-Spam",
    leadParagraph: "Signing up for web services, downloading whitepapers, or testing onboarding flows often requires an email address, inviting marketing spam and data broker tracking. OmniTool Hub's Disposable Temp Mail client generates ephemeral, zero-persistence email addresses in real time with automated 10-second inbox polling and client-side HTML sanitization.",
    diagram: {
      src: "../social_media_assets/temp_mail_privacy_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Temp mail privacy poster detailing ephemeral mailboxes, 10s auto sync polling, and client-side DOMPurify sanitization",
      caption: "Ephemeral Email Architecture: Zero-persistence mailboxes, tracking pixel neutralization, and automated OTP extraction."
    },
    tabsTitle: "Inbox & Security Capabilities",
    tabs: [
      {
        title: "1. Instant Ephemeral Mailbox",
        badge: "Instant Inbox",
        desc: "Generate randomized email addresses on high-reputation domains with 1 click. Zero passwords or personal credentials required."
      },
      {
        title: "2. Real-Time Auto-Sync Polling",
        badge: "Live Sync",
        desc: "Background sync checks for incoming mail every 10 seconds. Alerts you with audio chimes and badge counts on new email delivery."
      },
      {
        title: "3. Automated OTP Code Callout",
        badge: "OTP Detection",
        desc: "Identifies 4-to-8 digit verification codes in incoming emails and displays them in a prominent 1-click copy badge."
      },
      {
        title: "4. HTML Sanitizer & Spy Pixel Shield",
        badge: "Privacy Shield",
        desc: "DOMPurify strips malicious scripts, iframes, and 1x1 marketing tracking pixels to protect your IP address and device privacy."
      }
    ],
    proTip: "Never use temporary email services for critical banking, cryptocurrency, or primary social accounts. Because disposable inboxes expire when your browser session closes, password resets cannot be performed later.",
    steps: [
      "Open the Temp Mail tool to automatically generate a fresh, active disposable address.",
      "Click **Copy Address** to paste the temporary email into your signup form.",
      "Wait for the incoming verification message to appear in the inbox list.",
      "Click the message to read sanitized contents and copy your verification link or OTP code.",
      "Click **Delete / Trash** when finished to purge the inbox immediately."
    ],
    ctaHref: "../index.html#tool/temp-mail",
    ctaLabel: "Launch Temp Mail Client"
  },
  {
    id: "screenshot-capture",
    fileName: "screenshot-capture.html",
    title: "Browser Screenshot & Window Mockup Studio Guide | OmniTool Hub",
    description: "Capture application screens or browser tabs, apply macOS and Windows 11 window frames, add vector annotations, and redact private data.",
    h1: "Screen Capture & Window Mockup Studio Guide",
    tag: "Screenshot Studio",
    leadParagraph: "Creating polished screenshots for documentation, marketing pitch decks, Product Hunt launches, and bug reports usually requires multiple graphic design tools. OmniTool Hub's Screenshot Studio combines direct browser screen capture, photorealistic OS window frames (macOS, Windows 11, Chrome), vector arrows, numbered step badges, and destructive redaction into one client-side canvas.",
    diagram: {
      src: "../social_media_assets/screenshot_studio_capture_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Screenshot studio poster detailing screen capture API, photorealistic OS window frames, and canvas redaction callouts",
      caption: "Screenshot Capture & Framing Architecture: Native DisplayMedia capture, photorealistic OS window frames, and vector markup."
    },
    tabsTitle: "Studio & Markup Capabilities",
    tabs: [
      {
        title: "1. Screen & Window Capture API",
        badge: "Capture",
        desc: "Acquire any desktop monitor, active application window, or browser tab directly via `getDisplayMedia()`, or paste images from clipboard."
      },
      {
        title: "2. Photorealistic Window Frames",
        badge: "Mockup Frames",
        desc: "Wrap screenshots in macOS style with colorful traffic lights, Windows 11 Fluent frames, or clean browser headers with custom URLs."
      },
      {
        title: "3. Backdrop Gradients & Shadows",
        badge: "Styling",
        desc: "Set adjustable canvas padding, rounded corners, multi-layer soft ambient box shadows, and vibrant mesh gradient backgrounds."
      },
      {
        title: "4. Annotation & Redaction Studio",
        badge: "Annotations",
        desc: "Draw sleek callout arrows, numbered step circles, text labels, and destructive pixelated redaction boxes over sensitive keys."
      }
    ],
    proTip: "Use the 'Numbered Step Badges' feature when creating software onboarding guides. Clicking on the canvas automatically stamps sequential numbered circles (1, 2, 3...) that guide users through multi-step workflows seamlessly.",
    steps: [
      "Click **Capture Screen / Tab** to take a live snip, or paste an existing screenshot using `Ctrl+V`.",
      "Select your preferred window frame: **macOS Monterey**, **Windows 11**, or **Browser Chrome**.",
      "Choose a background gradient and adjust shadow blur and canvas padding.",
      "Add callouts, arrows, or redaction boxes to highlight features or obscure confidential data.",
      "Click **Export Image** to download high-resolution 2x retina PNG images ready for publication."
    ],
    ctaHref: "../index.html#tool/screenshot-capture",
    ctaLabel: "Launch Screenshot Studio"
  },
  {
    id: "screen-recorder",
    fileName: "screen-recorder.html",
    title: "Browser Screen & Tab Recorder Guide | OmniTool Hub",
    description: "Record entire desktop screens, specific windows, or browser tabs with microphone audio mixing, webcam PiP overlays, and WebM/MP4 export.",
    h1: "Browser Screen & Tab Recorder Guide",
    tag: "Screen Recording",
    leadParagraph: "Recording product walkthroughs, software bug demonstrations, or tutorial presentations shouldn't require installing bulky third-party software that watermarks your videos. OmniTool Hub's Browser Screen & Tab Recorder leverages hardware-accelerated MediaRecorder APIs and Web Audio mixing to capture high-definition desktop video and microphone audio directly in your browser with zero limits.",
    diagram: {
      src: "../social_media_assets/screen_recorder_webrtc_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Screen recorder poster detailing MediaStream track capture, audio context mixing, and MediaRecorder container packaging",
      caption: "Screen Recording & Muxing Architecture: Native display capture, dual-channel audio mixing, and hardware video encoding."
    },
    tabsTitle: "Recording & Audio Capabilities",
    tabs: [
      {
        title: "1. Multi-Source Display Capture",
        badge: "Display Capture",
        desc: "Record your entire desktop monitor, a specific application window, or an individual browser tab with full 1080p / 4K fidelity."
      },
      {
        title: "2. Dual-Source Audio Mixer",
        badge: "Audio Mixing",
        desc: "Mix system audio (tab sounds, video playback) with your microphone narration into a balanced, crystal-clear stereo audio track."
      },
      {
        title: "3. Webcam Picture-in-Picture (PiP)",
        badge: "Camera Overlay",
        desc: "Overlay your front-facing webcam stream in the corner of your screen recording for personalized presentations and video tutorials."
      },
      {
        title: "4. WebM & MP4 Container Export",
        badge: "Video Export",
        desc: "Encode videos using high-efficiency VP9/H.264 video and Opus audio codecs, with zero watermarks and instant local playback."
      }
    ],
    proTip: "When recording presentations with slides or software demos, choose 'Current Tab' capture with 'Share Tab Audio' enabled. This captures internal video or sound effects without recording ambient background room noise.",
    steps: [
      "Configure your recording inputs: select Screen Source, Microphone, and optional Webcam.",
      "Click **Start Recording** and grant permission for the display and microphone streams.",
      "Perform your presentation or walkthrough while monitoring the recording timer.",
      "Click **Stop Recording** to conclude the session and compile the media chunks.",
      "Review the recording in the integrated playback player and click **Download Video**."
    ],
    ctaHref: "../index.html#tool/screen-recorder",
    ctaLabel: "Launch Screen Recorder"
  },
  {
    id: "voice-recorder",
    fileName: "voice-recorder.html",
    title: "Voice Recorder & Audio Waveform Studio Guide | OmniTool Hub",
    description: "Record studio-grade voice audio, analyze live FFT spectrum waveforms, and export uncompressed 16-bit PCM WAV audio files client-side.",
    h1: "Voice Recorder & Waveform Studio Guide",
    tag: "Audio Recording",
    leadParagraph: "OmniTool Hub's Voice Recorder & Audio Waveform Studio delivers professional studio-grade voice recording directly within your browser. Powered by the Web Audio API, real-time 60 FPS Fast Fourier Transform (FFT) spectrum visualizers, and a pure client-side 16-bit linear PCM WAV compiler, it captures pristine acoustic fidelity for podcasts, voiceovers, and interviews.",
    diagram: {
      src: "../social_media_assets/voice_audio_waveform_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Voice audio waveform poster detailing Web Audio ingestion, FFT spectrum visualizers, and 16-bit PCM WAV compilation",
      caption: "Voice Recording & Audio Analysis: Real-time FFT frequency spectrum analysis and lossless 16-bit linear PCM WAV export."
    },
    tabsTitle: "Acoustic Engineering Features",
    tabs: [
      {
        title: "1. Studio-Grade PCM WAV Compiler",
        badge: "Lossless Audio",
        desc: "Encodes raw microphone samples directly into uncompressed 16-bit PCM WAV files, eliminating lossy compression artifacts."
      },
      {
        title: "2. 60 FPS Real-Time FFT Spectrum",
        badge: "Visualizer",
        desc: "Fast Fourier Transform breaks down audio frequencies in real time, displaying energetic frequency bars and oscilloscope waveforms."
      },
      {
        title: "3. Hardware Acoustic Preamp",
        badge: "Gain Control",
        desc: "Fine-tune microphone gain levels, monitor real-time peak decibel meters (dBFS), and prevent audio clipping distortion."
      },
      {
        title: "4. Scrubbable Audio Waveform Player",
        badge: "Playback",
        desc: "Review recorded takes immediately on an interactive visual waveform timeline with millisecond-precise seek controls."
      }
    ],
    proTip: "Keep your peak recording level between -12 dBFS and -6 dBFS on the meter. This leaves ample dynamic headroom for expressive vocal passages while ensuring an exceptional signal-to-noise ratio without digital clipping.",
    steps: [
      "Click **Enable Microphone** and allow browser microphone permissions.",
      "Adjust the input gain slider and observe the live oscilloscope preview.",
      "Click **Record** to start audio capture; observe the real-time waveform bars.",
      "Click **Pause** or **Stop** when finished speaking.",
      "Scrub the timeline to review your take, then click **Download Lossless WAV**."
    ],
    ctaHref: "../index.html#tool/voice-recorder",
    ctaLabel: "Launch Voice Recorder"
  },
  {
    id: "audio-suite",
    fileName: "audio-suite.html",
    title: "Audio Studio, Transcoder & Waveform Trimmer Guide | OmniTool Hub",
    description: "Transcode audio between MP3, WAV, and OGG formats, visually trim audio waveforms, and extract audio soundtracks from video files client-side.",
    h1: "Audio Studio & Transcoding Suite Guide",
    tag: "Audio Suite",
    leadParagraph: "OmniTool Hub's Audio Studio is a comprehensive sound workstation for converting codecs, trimming audio clips, and extracting soundtracks from video files. Operating entirely in browser memory via Web Audio decoders and WebAssembly codecs, it handles high-bitrate music tracks and lengthy podcasts without sending audio bytes over the internet.",
    diagram: {
      src: "../social_media_assets/audio_transcoding_pipeline_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Audio transcoding pipeline poster detailing MP3 WAV OGG transcoding, waveform trimming, and video audio demuxing",
      caption: "Audio Processing & Demuxing Architecture: Multi-codec transcoding, non-destructive waveform slicing, and video soundtrack extraction."
    },
    tabsTitle: "Audio Processing Engines",
    tabs: [
      {
        title: "1. Universal Audio Transcoder",
        badge: "Transcoder",
        desc: "Convert audio files between MP3 (128k - 320k CBR), lossless WAV, and OGG Vorbis with custom sample rate resampling (44.1kHz vs 48kHz)."
      },
      {
        title: "2. Interactive Waveform Trimmer",
        badge: "Waveform Slicer",
        desc: "Visualize complete track envelopes with draggable A-B cue markers, millisecond accuracy, and optional fade-in/fade-out volume ramps."
      },
      {
        title: "3. Video Soundtrack Demuxer",
        badge: "Video to Audio",
        desc: "Extract pristine audio soundtracks from MP4, WebM, and MOV video recordings without quality loss or re-encoding artifacts."
      },
      {
        title: "4. Audio Channel Downmixer",
        badge: "Channels",
        desc: "Merge wide stereo channels into focused mono tracks for podcast distribution, or duplicate single-mic voice to dual-channel stereo."
      }
    ],
    proTip: "When extracting music or voiceovers from recorded webinars or video tutorials, use the 'Video to MP3' engine. It strips heavy video pixel streams in seconds, saving up to 90% disk space while keeping speech crystal clear.",
    steps: [
      "Select your desired mode: **Audio Transcoder**, **Waveform Trimmer**, or **Video Audio Extractor**.",
      "Upload your audio or video file into the workstation canvas.",
      "Choose output parameters: target codec (MP3, WAV, OGG), bitrate (320 kbps), and sample rate.",
      "If trimming, drag start and end time markers and apply fade effects.",
      "Click **Process & Convert** to compile and download your processed audio file."
    ],
    ctaHref: "../index.html#tool/audio-suite",
    ctaLabel: "Launch Audio Studio"
  },
  {
    id: "video-speed",
    fileName: "video-speed.html",
    title: "Video Playback Speed & Pitch Controller Guide | OmniTool Hub",
    description: "Control video playback rates from 0.1x to 4.0x with pitch correction, single-frame stepping, and seamless A-B repeating loops.",
    h1: "Video Speed Controller & Analyzer Guide",
    tag: "Video Speed & Analysis",
    leadParagraph: "Analyzing athletic techniques, transcribing recorded interviews, or skimming long lecture recordings requires precise playback speed control. OmniTool Hub's Video Playback Speed Controller gives you granular speed adjustments from 0.1x to 4.0x with pitch correction, single-frame stepping, and A-B loop practice modes for any local video file.",
    diagram: {
      src: "../social_media_assets/video_speed_playback_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Video speed playback poster detailing playback velocity engine, WSOLA pitch preservation, and A-B looping mode",
      caption: "Video Velocity & Frame Stepping Architecture: Hardware-accelerated playback rates, pitch preservation, and A-B looping."
    },
    tabsTitle: "Playback Control Capabilities",
    tabs: [
      {
        title: "1. Granular Speed Controls (0.1x - 4.0x)",
        badge: "Velocity",
        desc: "Adjust video speed in precise 0.05x increments or use quick 0.5x, 1.0x, 1.5x, 2.0x, and 3.0x presets with keyboard shortcuts."
      },
      {
        title: "2. Natural Pitch Preservation",
        badge: "Pitch Lock",
        desc: "Employs browser audio time-stretching so voices remain natural and intelligible at high speeds without comical chipmunk pitch shifting."
      },
      {
        title: "3. Single-Frame Stepper",
        badge: "Frame Step",
        desc: "Step forward or backward exactly one video frame (1/30th or 1/60th second) to analyze motion, sports, or animation frame-by-frame."
      },
      {
        title: "4. A-B Repeat Loop Mode",
        badge: "A-B Looping",
        desc: "Set point A and point B to loop a specific sequence continuously, perfect for dance practice, music learning, or sports coaching."
      }
    ],
    proTip: "Use keyboard shortcuts `[` to decrease speed by 0.1x, `]` to increase speed, and `\\` to reset to normal 1.0x speed. Press `,` and `.` when paused to step backward and forward by a single video frame.",
    steps: [
      "Drag and drop any local video file (MP4, WebM, MOV) into the player canvas.",
      "Select your target playback rate using the slider or quick preset buttons.",
      "Ensure **Preserve Pitch** is toggled on to keep narration natural.",
      "To inspect a movement, pause and use the **Frame Step** buttons to advance frame-by-frame.",
      "Set Mark A and Mark B to loop a specific segment continuously."
    ],
    ctaHref: "../index.html#tool/video-speed",
    ctaLabel: "Launch Video Speed Controller"
  },
  {
    id: "video-to-gif",
    fileName: "video-to-gif.html",
    title: "Video to Animated GIF Converter Guide | OmniTool Hub",
    description: "Convert MP4, WebM, and MOV video clips into animated GIFs with NeuQuant 256-color palette quantization and LZW compression client-side.",
    h1: "Video to Animated GIF Converter Guide",
    tag: "GIF Conversion",
    leadParagraph: "Animated GIFs remain the universal format for software demonstrations, GitHub README documentation, social media memes, and email marketing. OmniTool Hub's Video to Animated GIF Converter converts MP4, WebM, and MOV videos into optimized GIFs using NeuQuant color quantization, Floyd-Steinberg dithering, and LZW byte compression directly in your browser.",
    diagram: {
      src: "../social_media_assets/video_gif_encoder_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Video GIF encoder poster detailing frame decimation, NeuQuant 256-color palette quantization, and LZW compression",
      caption: "Video-to-GIF Conversion Architecture: Canvas frame extraction, adaptive 256-color quantization, and lossless LZW encoding."
    },
    tabsTitle: "Conversion & Optimization Features",
    tabs: [
      {
        title: "1. Precision Time Trimming",
        badge: "Trimming",
        desc: "Select exact start and end timestamps to capture only the relevant snippet, avoiding bloated multi-megabyte GIF files."
      },
      {
        title: "2. FPS & Dimension Scaling",
        badge: "Resolution",
        desc: "Downscale heavy 1080p videos to web-optimized 480p or 320p resolutions and select 10, 15, or 24 FPS for smooth motion."
      },
      {
        title: "3. NeuQuant 256-Color Quantization",
        badge: "Color Engine",
        desc: "Neural network-based color quantization extracts the optimal 256-color palette tailored to your video's specific scene."
      },
      {
        title: "4. Floyd-Steinberg Error Diffusion",
        badge: "Dithering",
        desc: "Smooths color transitions and eliminates banding artifacts across gradients, skies, and shadows."
      }
    ],
    proTip: "To keep GIF file sizes under 5MB for GitHub and Discord, trim the video to under 6 seconds, set resolution to 480px width, and choose 15 FPS. This delivers buttery-smooth playback with minimal file weight.",
    steps: [
      "Upload your video file (MP4, WebM, MOV) into the conversion studio.",
      "Use the range sliders to trim the video down to your desired snippet.",
      "Choose output resolution (e.g. 480px, 320px) and frame rate (10, 15, or 24 FPS).",
      "Click **Generate Animated GIF** and watch the in-browser rendering progress bar.",
      "Preview the animated loop and click **Download GIF** to save."
    ],
    ctaHref: "../index.html#tool/video-to-gif",
    ctaLabel: "Launch Video-to-GIF Converter"
  },
  {
    id: "favicon-generator",
    fileName: "favicon-generator.html",
    title: "Multi-Resolution Favicon & PWA App Icon Suite Guide | OmniTool Hub",
    description: "Generate multi-size .ICO bundles (16x16, 32x32, 48x48), Apple Touch icons, Android PWA manifest icons, and ready-to-paste HTML code.",
    h1: "Favicon & PWA App Icon Suite Guide",
    tag: "App Branding",
    leadParagraph: "Modern web applications require favicons across a dozen different screen sizes, operating systems, and bookmark managers. OmniTool Hub's Favicon & App Icon Suite converts any logo image or SVG into an authentic multi-directory `.ico` binary, Apple Touch 180x180 icons, Android PWA manifest assets, and complete `<head>` HTML code in one click.",
    diagram: {
      src: "../social_media_assets/favicon_app_icon_matrix_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Favicon app icon poster detailing multi-resolution ICO binary structures, Apple Touch icons, and PWA manifest assets",
      caption: "Favicon & App Icon Standards: Binary multi-directory ICO bundles, iOS Apple Touch icons, and PWA manifest specifications."
    },
    tabsTitle: "Supported Icon Standards & Bundles",
    tabs: [
      {
        title: "1. Canonical Multi-Size .ICO Bundle",
        badge: "Standard .ICO",
        desc: "Packages 16x16, 32x32, and 48x48 pixel bitmaps into a single binary `.ico` file recognized by all desktop web browsers."
      },
      {
        title: "2. Apple Touch Icon (180x180 px)",
        badge: "Apple iOS",
        desc: "High-resolution square PNG formatted specifically for iOS Home Screen bookmarking without gloss effects."
      },
      {
        title: "3. Android Chrome PWA Manifest Icons",
        badge: "Android PWA",
        desc: "Generates 192x192 px and 512x512 px PNG icons with safe zone margins suitable for maskable Android app icons."
      },
      {
        title: "4. HTML Code & manifest.json Generator",
        badge: "HTML & JSON",
        desc: "Auto-generates ready-to-paste `<link rel=\"icon\">` tags and a complete `manifest.json` file ready for your web root."
      }
    ],
    proTip: "Always upload a square image of at least 512x512 pixels (or an SVG vector file). The bilinear downsampling engine ensures crisp lines and high contrast even when shrunk down to the tiny 16x16 pixel browser tab size.",
    steps: [
      "Upload your brand logo (PNG, JPG, SVG, or WebP).",
      "Adjust optional background padding, corner rounding, or transparent canvas fill.",
      "Preview how the icon renders in simulated browser tabs and mobile home screens.",
      "Click **Download Complete Favicon ZIP Package** to get all icon sizes and `favicon.ico`.",
      "Copy the generated HTML `<link>` code block into your website's `<head>` section."
    ],
    ctaHref: "../index.html#tool/favicon-generator",
    ctaLabel: "Launch Favicon Generator"
  },
  {
    id: "fancy-font-generator",
    fileName: "fancy-font-generator.html",
    title: "Fancy Font & Aesthetic Text Studio Guide | Instagram, Discord & TikTok | OmniTool Hub",
    description: "Convert text into 60+ stylish Unicode fonts, Gothic Fraktur, cursive calligraphy, small caps, and glitch text for Instagram bios, TikTok captions, and Discord names with 100% client-side privacy.",
    h1: "Fancy Font & Bio Text Generator Guide",
    tag: "Unicode Typography",
    leadParagraph: "The Fancy Font & Bio Text Generator transforms ordinary text into eye-catching Unicode typography, cursive calligraphy, Victorian Fraktur, aesthetic symbols, and formatted social media bios. Because all transformations happen client-side using universal Unicode character points, your generated text can be copied with one click and pasted anywhere on the web with zero font downloads required.",
    diagram: {
      src: "../social_media_assets/typography_unicode_font_matrix_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Unicode typography and aesthetic font reference poster detailing glyph planes, cross-platform compatibility, and bio studio symbol sets",
      caption: "Unicode Typography & Aesthetic Font Architecture: Mathematical alphanumeric planes, gothic blackletter, enclosed badges, and social media bio matrix."
    },
    tabsTitle: "Popular Typography Styles & Bio Tools",
    tabs: [
      {
        title: "1. Gothic & Medieval Fraktur",
        badge: "𝕲𝖔𝖙𝖍𝖎𝖈",
        desc: "Originating from 12th-century European manuscripts, Gothic and Fraktur fonts are famous for dramatic blackletter strokes. Perfect for gaming clan tags, Discord server channels, and edgy aesthetic profiles."
      },
      {
        title: "2. Cursive & Elegant Calligraphy",
        badge: "𝓒𝓾𝓻𝓼𝓲𝓿𝓮",
        desc: "Flowing handwritten cursive characters that give Instagram bios, love letters, and inspirational quotes an elegant, luxurious touch that stands out from default platform fonts."
      },
      {
        title: "3. Small Capital Letters (Small Caps)",
        badge: "ꜱᴍᴀʟʟ ᴄᴀᴘꜱ",
        desc: "Small caps reduce the height of uppercase characters while maintaining uniform readability. A favorite for modern aesthetic accounts, Twitter/X handles, and clean minimal captions."
      },
      {
        title: "4. Circled Bubbles & Square Badges",
        badge: "Ⓑⓤⓑⓑⓛⓔ",
        desc: "Encloses each letter inside a rounded circle or square badge. Ideal for numbered lists, step-by-step instructions, and prominent comment replies that grab attention."
      },
      {
        title: "5. Tiny Superscript & Subscript",
        badge: "ᵗⁱⁿʸ ˢᶜʳⁱᵖᵗ",
        desc: "Miniature high-index and low-index characters allow you to write compact bio captions, aesthetic footnotes, and brand subheadings that occupy minimal visual space."
      },
      {
        title: "6. Bio Studio & Aesthetic Symbols Palette",
        badge: "Symbols",
        desc: "Includes pre-made social media bio templates, headers, dividers, stars, sparkle glyphs, arrows, and cute Japanese kaomoji emoticons ready for 1-click clipboard copying."
      }
    ],
    proTip: "Because these fonts are native Unicode character points rather than downloadable font files (.ttf/.woff), they render identically across iOS, Android, Windows, macOS, and Linux without installation.",
    steps: [
      "Type or paste your text into the **Input Text** area on the left panel.",
      "Filter styles by category (All, Popular, Cursive, Gothic, Symbols) or search for a specific look.",
      "Click any font card to instantly copy the transformed text to your clipboard.",
      "Click the **Star** icon on any card to pin your favorite styles to the top for quick access.",
      "Switch to the **Bio Studio** tab to insert aesthetic dividers, sparkles, and curated bio templates."
    ],
    ctaHref: "../index.html#tool/fancy-font-generator",
    ctaLabel: "Launch Font Studio"
  },
  {
    id: "finance-calculator",
    fileName: "finance-calculator.html",
    title: "Financial Growth & Loan Calculator Guide | SIP, EMI & Compound Interest | OmniTool Hub",
    description: "Master wealth compounding with OmniTool Hub's client-side Financial Calculator Suite. Calculate SIP returns, compound interest, and loan EMI mortgage amortization schedules with live visual charts.",
    h1: "Financial Growth & Loan Calculator Suite Guide",
    tag: "Financial Math",
    leadParagraph: "The Financial Growth & Loan Calculator Suite brings institutional-grade wealth planning and loan amortization modeling directly into your browser. Unlike traditional financial websites that harvest your salary, loan amounts, and personal portfolio data on remote databases, every single formula, amortization table, and SVG growth curve executes 100% locally on your computer with zero data transmission.",
    diagram: {
      src: "../social_media_assets/financial_wealth_growth_matrix_poster_1200x800.svg",
      width: 1200,
      height: 800,
      alt: "Financial wealth growth and loan amortization poster detailing SIP compounding curves, EMI formulas, and prepayment schedules",
      caption: "Financial Growth & Loan Architecture: Exponential compounding calculus, reducing balance amortization, step-up accelerators, and inflation parity."
    },
    tabsTitle: "The Three Powerhouse Financial Engines",
    tabs: [
      {
        title: "1. Systematic Investment Plan (SIP)",
        badge: "Wealth Builder",
        desc: "Calculates future wealth accumulation from recurring monthly investments into mutual funds or index funds, utilizing rupee/dollar-cost averaging to eliminate emotional market timing."
      },
      {
        title: "2. Compound Interest & APY Engine",
        badge: "Compound Growth",
        desc: "Computes compound growth on lump-sum deposits with optional regular additions. Supports Daily, Monthly, Quarterly, and Annual compounding frequencies to evaluate true APY."
      },
      {
        title: "3. Loan EMI & Mortgage Amortization",
        badge: "Debt Elimination",
        desc: "Calculates exact monthly installments under reducing balance loan models. Features prepayment accelerators and generates complete year-by-year and month-by-month repayment schedules."
      },
      {
        title: "4. Step-Up Accelerator & Inflation Checker",
        badge: "Real Returns",
        desc: "Model annual investment increases (e.g. 10% annual salary raises) and calculate the real inflation-adjusted purchasing power of your final retirement corpus."
      }
    ],
    proTip: "In long-term SIPs (15+ years), enabling a modest 10% annual Step-Up often more than doubles your final maturity corpus due to late-stage exponential compounding.",
    steps: [
      "Select your calculation engine: **SIP Planner**, **Compound Interest**, or **Loan EMI**.",
      "Enter your financial inputs (principal or monthly deposit, expected annual return rate, and tenure).",
      "Toggle optional accelerators like **Step-Up %** or **Prepayment amounts** to see immediate savings.",
      "Inspect the live interactive **Donut Chart** and **Growth Curve** stage to visualize principal vs return.",
      "Review the detailed amortization schedule and click **Copy Summary** or **Export to CSV**."
    ],
    ctaHref: "../index.html#tool/finance-calculator",
    ctaLabel: "Launch Financial Engine"
  }
];

