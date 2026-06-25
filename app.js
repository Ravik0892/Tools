// OmniTool Hub - Core Application Engine v2 (Masterpiece Accordion Edition)

const app = {
  // Registry of all tools with subcategory designations
  tools: [
    {
      id: "pipeline-builder",
      name: "Smart Chain Pipeline Builder",
      desc: "Connect multiple operations in series (e.g. Decode Base64 ➔ Format JSON ➔ Convert to Uppercase) to process text sequentially.",
      category: "dev",
      subcategory: "dev-pipelines",
      subLabel: "Data Pipelines",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
    },
    {
      id: "formatter-suite",
      name: "Data Formatter & Converter Suite",
      desc: "Beautify and validate JSON, format messy SQL database queries, and convert data bi-directionally between JSON, YAML, and CSV.",
      category: "dev",
      subcategory: "dev-formatters",
      subLabel: "Formatters & Parsers",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6L2 12l6 6M12 2v20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
      id: "text-encoder-suite",
      name: "Text Cases & Encoder Suite",
      desc: "Convert text case representations (UPPER, lower, camel, snake, kebab) and run Base64 or URL encoding and decoding operations.",
      category: "text",
      subcategory: "text-case",
      subLabel: "Transformations",
      accent: "#9d4edd",
      accentRgb: "157, 78, 221",
      icon: `<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16M10 5l4 14" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
      id: "jwt-decoder",
      name: "JWT Decoder",
      desc: "Decode JSON Web Tokens instantly to view their header parameters, claim payload and validity.",
      category: "dev",
      subcategory: "dev-crypto",
      subLabel: "Crypto & Security",
      accent: "#f43f5e",
      accentRgb: "244, 63, 94",
      icon: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
    },
    {
      id: "crypto-suite",
      name: "Cryptography Suite",
      desc: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes, encrypt/decrypt using AES-256 GCM symmetric cipher, and generate asymmetric RSA private/public keys.",
      category: "dev",
      subcategory: "dev-crypto",
      subLabel: "Crypto & Security",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      icon: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`
    },
    {
      id: "markdown-preview",
      name: "Live Markdown Previewer",
      desc: "Write standard markdown syntax and preview output immediately as formatted HTML.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "Writers & Parsers",
      accent: "#9d4edd",
      accentRgb: "157, 78, 221",
      icon: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
    },
    {
      id: "text-diff",
      name: "Text Diff Comparison",
      desc: "Compare two strings side-by-side or line-by-line and visually highlight differences.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "Writers & Parsers",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      icon: `<svg viewBox="0 0 24 24"><line x1="6" y1="3" x2="6" y2="21"></line><line x1="18" y1="3" x2="18" y2="21"></line><line x1="6" y1="12" x2="18" y2="12"></line></svg>`
    },
    {
      id: "pdf-searcher",
      name: "Multi-PDF Searcher & OCR",
      desc: "Import multiple PDF files, search for words, sentences or data, and run client-side OCR on scanned pages.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "Writers & Parsers",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
    },
    {
      id: "pdf-utilities",
      name: "PDF Toolbox (Split & Compress)",
      desc: "Extract pages/ranges and compress scanned PDFs client-side with tailored device performance modes.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "Writers & Parsers",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M9 15h6M9 11h6M9 19h6"/></svg>`
    },
    {
      id: "regex-tester",
      name: "Visual Regex & Extractor Suite",
      desc: "Test regular expressions visually, capture match groups, and batch-extract or replace phone numbers, emails, IPs, and URLs.",
      category: "text",
      subcategory: "text-regex",
      subLabel: "Pattern Analysis",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    },
    {
      id: "css-studio",
      name: "CSS Studio Suite",
      desc: "Visually build linear & radial CSS gradients, complex box shadows with offset layers, and modern frosted glassmorphism cards.",
      category: "design",
      subcategory: "design-css",
      subLabel: "CSS Builders",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 3v18M3 9h18M14 14l3 3m0-3l-3 3"></path></svg>`
    },
    {
      id: "color-lab",
      name: "Color Lab & Contrast Suite",
      desc: "Create WCAG-compliant color palettes, check contrast accessibility ratios, and generate shades, tints, and opacities.",
      category: "design",
      subcategory: "design-color",
      subLabel: "Color Management",
      accent: "#f43f5e",
      accentRgb: "244, 63, 94",
      icon: `<svg viewBox="0 0 24 24"><path d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z" /></svg>`
    },
    {
      id: "security-suite",
      name: "Security & Passwords Suite",
      desc: "Generate highly secure random passwords with entropy strength analysis and create bulk RFC 4122 v4 UUID keys client-side.",
      category: "math",
      subcategory: "math-security",
      subLabel: "Security & Pass",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4M12 15v3" stroke-linecap="round"/></svg>`
    },
    {
      id: "datetime-suite",
      name: "Date & Time Suite",
      desc: "Convert Unix epoch timestamps to human dates, compute durations between two times, and add/subtract time fields dynamically.",
      category: "math",
      subcategory: "math-calc",
      subLabel: "Calculator",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
    },
    {
      id: "unit-converter",
      name: "Unit Converter",
      desc: "Instantly convert storage sizes, lengths, weights, and temperatures across global units.",
      category: "math",
      subcategory: "math-conversion",
      subLabel: "Conversion",
      accent: "#9d4edd",
      accentRgb: "157, 78, 221",
      icon: `<svg viewBox="0 0 24 24"><path d="M12 2v20M17 5H7M19 12H5M17 19H7" stroke-linecap="round"/></svg>`
    },
    {
      id: "graphics-studio",
      name: "Graphics Designer & Screenshot Studio",
      desc: "Capture webcam snapshots, crop screen captures, design banners, overlay text, apply vintage cyberpunk filters, and download or copy images to clipboard without AI.",
      category: "design",
      subcategory: "design-graphics",
      subLabel: "Graphics & Screen Studio",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
    },
    {
      id: "calculator",
      name: "Scientific Calculator",
      desc: "Perform advanced arithmetic, trigonometric, logarithmic, and factorial calculations with a live history log, constants library, and keyboard shortcuts.",
      category: "math",
      subcategory: "math-calc",
      subLabel: "Calculator",
      accent: "#f43f5e",
      accentRgb: "244, 63, 94",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line><line x1="12" y1="10" x2="12" y2="10.01"></line><line x1="8" y1="10" x2="8" y2="10.01"></line><line x1="16" y1="10" x2="16" y2="10.01"></line></svg>`
    },
    {
      id: "qr-generator",
      name: "Dynamic QR Code Studio",
      desc: "Generate highly customized art QR codes with linear gradients, custom dot patterns, eye styles, and center logos client-side.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Generators",
      accent: "#f43f5e",
      accentRgb: "244, 63, 94",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="9" height="9" rx="1"></rect><rect x="12" y="3" width="9" height="9" rx="1"></rect><rect x="3" y="12" width="9" height="9" rx="1"></rect><path d="M14 14h2v2h-2zm4 4h2v2h-2zm2-4h-2v2h2zm-4 4h2v-2h-2zm4-4v2h2v-2zm-4 4h-2v2h2z"></path></svg>`
    },
    {
      id: "seo-previewer",
      name: "Meta Tag & SEO Previewer",
      desc: "Design and preview page meta tags with live Google, Facebook, Twitter, and Discord mockup cards.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Generators",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="17" x2="22" y2="17"></line><line x1="12" y1="17" x2="12" y2="21"></line><line x1="8" y1="21" x2="16" y2="21"></line></svg>`
    },
    {
      id: "image-converter",
      name: "Image Optimizer & Converter",
      desc: "Optimize dimensions, adjust quality, and convert image formats (PNG, JPG, WebP) client-side in seconds.",
      category: "design",
      subcategory: "design-graphics",
      subLabel: "Graphics & Screen Studio",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>`
    },
    {
      id: "svg-animator",
      name: "SVG Animation Studio",
      desc: "Import SVG vectors, visualize paths, apply keyframe presets (self-drawing, spin, float, neon pulse), and export animated SVGs client-side.",
      category: "design",
      subcategory: "design-graphics",
      subLabel: "Graphics & Screen Studio",
      accent: "#9d4edd",
      accentRgb: "157, 78, 221",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M20.4 12A8.4 8.4 0 0 1 12 20.4c-2.3 0-4.4-.9-6-2.4l1.4-1.4a6.4 6.4 0 0 0 9.2 0l1.4 1.4zM12 3.6c2.3 0 4.4.9 6 2.4l-1.4 1.4a6.4 6.4 0 0 0-9.2 0L6 6a8.4 8.4 0 0 1 8.4-2.4z"></path></svg>`
    },
    {
      id: "url-parser",
      name: "URL Query Parser & Builder",
      desc: "Parse web addresses, extract parameters into a key-value grid, edit variables, and build clean query strings.",
      category: "text",
      subcategory: "text-case",
      subLabel: "Transformations",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"></path></svg>`
    },
    {
      id: "text-analyzer",
      name: "Text Readability & Analyzer",
      desc: "Calculate Flesch Reading Ease score, evaluate sentence counts, estimate reading time, and check keyword density.",
      category: "text",
      subcategory: "text-regex",
      subLabel: "Pattern Analysis",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`
    },
    {
      id: "mock-data-generator",
      name: "Private CSV/JSON Mock Data Generator",
      desc: "Design custom schemas, configure column types (names, emails, dates, numbers), and bulk-generate up to 50,000 rows of mock data entirely client-side.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Generators",
      accent: "#f43f5e",
      accentRgb: "244, 63, 94",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9" rx="1"></rect><rect x="14" y="3" width="7" height="5" rx="1"></rect><rect x="14" y="12" width="7" height="9" rx="1"></rect><rect x="3" y="16" width="7" height="5" rx="1"></rect><path d="M7 7h7M10 16h4" stroke-linecap="round"/></svg>`
    },
    {
      id: "admin-settings",
      name: "Settings & Ad Control Panel",
      desc: "Manage ad network codes, toggle locations, edit AdSense/AdMob IDs, and clear local caches.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Admin Center",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>`
    },
    {
      id: "code-playground",
      name: "HTML/CSS/JS Live Playground",
      desc: "Write front-end HTML, CSS, and JavaScript in real-time, see live rendering in a sandbox iframe, and catch output logs in a simulated console.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Generators",
      accent: "#9d4edd",
      accentRgb: "157, 78, 221",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="12" y1="2" x2="12" y2="22"></line></svg>`
    },
    {
      id: "ip-subnet-calculator",
      name: "IP Subnet & MAC Address Suite",
      desc: "Calculate subnet CIDR parameters, inspect host ranges, format MAC addresses, and perform local manufacturer OUI lookups.",
      category: "math",
      subcategory: "math-calc",
      subLabel: "Calculator",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="10" x2="6" y2="14"></line><line x1="18" y1="10" x2="18" y2="14"></line></svg>`
    }
  ],

  // Centralized Tool Benefits Registry for visual guide cards
  toolBenefits: {
    "pipeline-builder": [
      "<strong>Data Chaining</strong>: Run multiple converters, encoders, and case transformations sequentially on the same dataset in a single click.",
      "<strong>Local & Secure</strong>: Processes all chains 100% offline, keeping sensitive API logs and tokens secure."
    ],
    "formatter-suite": [
      "<strong>Syntax Diagnostics</strong>: Identify nesting anomalies, trailing commas, or parsing errors in JSON, YAML, and SQL instantly.",
      "<strong>Interoperable Conversions</strong>: Seamlessly migrate data between CSV, JSON structures, and configuration files."
    ],
    "text-encoder-suite": [
      "<strong>Secure Encoding</strong>: Run high-performance Base64 and URL encoding/decoding without leaking variables to external servers.",
      "<strong>Case Standardization</strong>: Quickly normalize variable formats (snake_case, camelCase, kebab-case) for clean codebase migrations."
    ],
    "jwt-decoder": [
      "<strong>Claim Verification</strong>: Read payload descriptors, issuer scopes, and security claims securely without key exposure.",
      "<strong>Expiration Stamps</strong>: Automatically parse issue (iat) and expiry (exp) times to diagnose active token problems."
    ],
    "crypto-suite": [
      "<strong>Robust Hashes</strong>: Generate MD5, SHA-256, and SHA-512 values client-side for checksums and integrity auditing.",
      "<strong>Symmetric & Asymmetric Keys</strong>: Encrypt payloads with AES-256 GCM or generate secure SPKI RSA key-pairs instantly."
    ],
    "markdown-preview": [
      "<strong>Real-Time Preview</strong>: Render formatted markdown, headers, tables, and lists side-by-side as you type.",
      "<strong>Standard HTML Export</strong>: Copy parsed HTML markup to paste into content management systems or documentation."
    ],
    "text-diff": [
      "<strong>Side-by-Side Comparison</strong>: Instantly spot missing lines, visual differences, or character changes between two blocks of text.",
      "<strong>Clean Diffing Heuristics</strong>: Optimized for comparing codebase revisions, JSON responses, or config structures."
    ],
    "pdf-searcher": [
      "<strong>Multi-File Search</strong>: Query text, figures, and numerical records across multiple large PDF documents simultaneously.",
      "<strong>OCR Engine Integration</strong>: Scan and search text in low-resolution or scanned PDFs via local multi-language OCR."
    ],
    "pdf-utilities": [
      "<strong>Split and Extract</strong>: Group page selections visually or via range syntax to assemble brand-new custom PDF documents.",
      "<strong>Canvas Resolution Compression</strong>: Decrease file size using device-performance DPI downscaling options."
    ],
    "regex-tester": [
      "<strong>Visual Matching</strong>: Highlights matches and captures named groups in real-time as you refine your regex pattern.",
      "<strong>Standard Flags</strong>: Supports global, case-insensitive, and multi-line matching parameters."
    ],
    "css-studio": [
      "<strong>Frosted Glassmorphism</strong>: Build high-performance glass cards with custom blur filters and borders.",
      "<strong>Layered Box Shadows</strong>: Layer offsets, blurs, spreads, and gradients to create realistic CSS depth effects."
    ],
    "color-lab": [
      "<strong>WCAG Contrast Auditing</strong>: Ensure color pairings meet AA/AAA web accessibility standards dynamically.",
      "<strong>Palette Harmony</strong>: Automatically generate monochromatic, triadic, and analogous palettes with shades and tints."
    ],
    "security-suite": [
      "<strong>Entropy Strength</strong>: Evaluate password complexity, length, and randomness scores to audit security strength.",
      "<strong>Bulk UUID Keys</strong>: Generate up to 1,000 standard RFC 4122 v4 keys in a single batch for DB seeds."
    ],
    "datetime-suite": [
      "<strong>Epoch Conversion</strong>: Convert Unix timestamp numbers to localized date strings and vice versa.",
      "<strong>Duration Calculator</strong>: Compute exact time distances (days, hours, minutes) between two dates."
    ],
    "unit-converter": [
      "<strong>Storage Conversions</strong>: Instantly switch between bytes, kilobytes, gigabytes, and terabytes.",
      "<strong>Physical Metric Conversion</strong>: Shift values across length, weight, and temperature systems."
    ],
    "graphics-studio": [
      "<strong>Client-Side Photo Studio</strong>: Take webcam snapshots, overlay filters, crop sizes, and copy images to clipboard.",
      "<strong>No-Cloud Security</strong>: Edit screenshots and images offline with zero storage leaks."
    ],
    "calculator": [
      "<strong>Scientific Operations</strong>: Complete complex algebraic, trig, logarithmic, and factorial formulas.",
      "<strong>2D Function Plotter</strong>: Input custom math functions f(x) and plot them on a coordinate grid."
    ],
    "qr-generator": [
      "<strong>Custom dot patterns</strong>: Design distinct QR cards with custom eye structures, colors, and gradients.",
      "<strong>Brand Integration</strong>: Upload or insert custom logo marks into the center of the QR code securely."
    ],
    "seo-previewer": [
      "<strong>Mock Preview Cards</strong>: View metadata mockups for Google, Facebook, Twitter, and Discord instantly.",
      "<strong>Meta Tag Generation</strong>: Standardise SEO titles and descriptions to export meta tags."
    ],
    "image-converter": [
      "<strong>Quality and Format Optimization</strong>: Adjust resolutions and compression to convert between WebP, PNG, and JPEG.",
      "<strong>Bulk Local Processing</strong>: Process and scale images offline without cloud bandwidth requirements."
    ],
    "svg-animator": [
      "<strong>Animation Presets</strong>: Apply self-drawing paths, spins, pulses, or float animations to vector SVGs.",
      "<strong>Clean Keyframe Output</strong>: Exports fully inline CSS-animated standard vector graphic files."
    ],
    "url-parser": [
      "<strong>URL Parameter Inspector</strong>: Breakdown complex URL query parameters into editable key-value parameters.",
      "<strong>Campaign UTM Tracking</strong>: Quickly append UTM parameters to campaign links for web traffic analysis."
    ],
    "text-analyzer": [
      "<strong>Flesch Readability Scoring</strong>: Measure word, sentence, and syllable counts to check writing readability grades.",
      "<strong>Tone & Structure Audit</strong>: Verify read times and word counts to optimize content length."
    ],
    "mock-data-generator": [
      "<strong>Procedural Dataset Mocking</strong>: Design schemas containing names, prices, numbers, and dates.",
      "<strong>Thread-Safe Bulk Export</strong>: Asynchronously generate and download up to 50,000 CSV or JSON rows."
    ],
    "admin-settings": [
      "<strong>Ad Placement Control</strong>: Toggle banner visibility, edit AdSense IDs, and adjust simulated ads.",
      "<strong>Application Cache Flush</strong>: Safely purge IndexedDB, Service Worker cache, and state variables."
    ],
    "code-playground": [
      "<strong>Zero-Setup Prototyping</strong>: Instantly write and preview HTML, CSS, and JS side-by-side without creating local project files.",
      "<strong>Simulated Debug Console</strong>: Capture all logs, warnings, and error messages in a styled console panel for real-time diagnostics."
    ],
    "ip-subnet-calculator": [
      "<strong>Network Segmentation</strong>: Instantly calculate usable IP ranges, broadcast domains, and netmasks to plan complex subnet allocations.",
      "<strong>Detailed Binary Visualization</strong>: View representations of subnets and wildcard boundaries to understand subnet division logic."
    ]
  },

  // State variables
  activeCategory: "all",      // 'all', 'fav'
  activeSubcategory: "all",   // 'all', or specific like 'dev-formatters'
  activeTool: null,
  favorites: new Set(),
  recents: [],
  globalConfig: null,

  // Command Palette states
  cpOpen: false,
  cpIndex: 0,
  cpFiltered: [],

  pendingPaste: null,

  toolRedirects: {
    "password-generator": { suiteId: "security-suite", subtab: "pass" },
    "uuid-generator": { suiteId: "security-suite", subtab: "uuid" },
    "hash-generator": { suiteId: "crypto-suite", subtab: "hash" },
    "aes-crypto": { suiteId: "crypto-suite", subtab: "aes" },
    "rsa-generator": { suiteId: "crypto-suite", subtab: "rsa" },
    "text-converter": { suiteId: "text-encoder-suite", subtab: "case" },
    "base64": { suiteId: "text-encoder-suite", subtab: "base64" },
    "url-encoder": { suiteId: "text-encoder-suite", subtab: "url" },
    "json-formatter": { suiteId: "formatter-suite", subtab: "json" },
    "sql-beautifier": { suiteId: "formatter-suite", subtab: "sql" },
    "json-yaml-csv": { suiteId: "formatter-suite", subtab: "csv" },
    "gradient-generator": { suiteId: "css-studio", subtab: "gradient" },
    "box-shadow": { suiteId: "css-studio", subtab: "shadow" },
    "glassmorphism-generator": { suiteId: "css-studio", subtab: "glass" },
    "color-palette": { suiteId: "color-lab", subtab: "palette" },
    "color-shades": { suiteId: "color-lab", subtab: "shades" },
    "epoch-converter": { suiteId: "datetime-suite", subtab: "epoch" },
    "date-calculator": { suiteId: "datetime-suite", subtab: "date" }
  },

  async loadGlobalConfig() {
    try {
      const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "127.0.0.1.nip.io" ||
        window.location.hostname === "host.docker.internal";
      const cacheBust = isLocalhost ? `?t=${Date.now()}` : '';
      const response = await fetch('ad-config.json' + cacheBust);
      if (response.ok) {
        this.globalConfig = await response.json();
        console.log("[Config] Loaded global configuration:", this.globalConfig);
      }
    } catch (e) {
      console.log("[Config] No global ad-config.json found or failed to load. Falling back to local storage.", e);
    }
  },

  getConfigValue(key, defaultValue) {
    const localVal = localStorage.getItem(key);
    if (localVal !== null) {
      return localVal;
    }
    if (this.globalConfig && this.globalConfig.hasOwnProperty(key)) {
      return this.globalConfig[key];
    }
    return defaultValue;
  },

  // Initializer
  async init() {
    // Restrict Settings & Ad Control Panel to local development server only
    const isLocalhost = window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "127.0.0.1.nip.io" ||
      window.location.hostname === "host.docker.internal";
    if (!isLocalhost) {
      this.tools = this.tools.filter(t => t.id !== "admin-settings");
    }

    await this.loadGlobalConfig();
    this.initSplash();
    this.registerServiceWorker();
    this.loadFavorites();
    this.loadRecents();
    this.renderFavoritesCount();
    this.initClock();
    this.initTheme();
    this.bindEvents();
    this.buildSidebarToolMenu();
    this.buildMegaMenu();
    this.handleRouting();

    // Pre-load utilities for pipeline builder integration and global helpers
    import('./tools/utils.js').catch(err => console.error("Failed to pre-load utils:", err));

    // Render sidebar sponsor ad
    const sidebarAd = document.querySelector(".sidebar-sponsor-container");
    if (sidebarAd) {
      sidebarAd.innerHTML = this.getAdHtml("sidebar");
    }

    // Module diagnostics check (Disabled in production to prevent startup lag)
    // this.checkAllModules();
  },

  initSplash() {
    const splash = document.getElementById("app-splash-screen");
    const logBox = document.getElementById("splash-logs");
    if (!splash) return;

    const logs = [
      "Initializing secure local sandbox...",
      "Verifying client-side decryption certificates...",
      "Mounting transformation pipelines...",
      "System status: 100% SECURE. Launching OmniTool Hub."
    ];

    const alreadyVisited = sessionStorage.getItem("omnitool_visited") === "true";
    if (alreadyVisited) {
      splash.style.transition = "opacity 0.2s ease, visibility 0.2s";
      setTimeout(() => {
        splash.classList.add("fade-out");
      }, 150);
      return;
    }

    sessionStorage.setItem("omnitool_visited", "true");

    if (logBox) {
      logBox.innerHTML = "";
      logs.forEach((logText, idx) => {
        setTimeout(() => {
          const line = document.createElement("div");
          line.className = "console-line";
          line.innerText = `> ${logText}`;
          logBox.appendChild(line);
          logBox.scrollTop = logBox.scrollHeight;
        }, idx * 250);
      });
    }

    setTimeout(() => {
      splash.classList.add("fade-out");
    }, 1400);
  },

  buildMegaMenu() {
    const listDev = document.getElementById("mega-list-dev");
    const listText = document.getElementById("mega-list-text");
    const listDesign = document.getElementById("mega-list-design");
    const listMath = document.getElementById("mega-list-math");

    if (!listDev || !listText || !listDesign || !listMath) return;

    listDev.innerHTML = "";
    listText.innerHTML = "";
    listDesign.innerHTML = "";
    listMath.innerHTML = "";

    const hiddenToolsStr = this.getConfigValue("omnitool_hidden_tools", "");
    const hiddenToolsSet = new Set(hiddenToolsStr.split(",").filter(Boolean));

    this.tools.forEach(tool => {
      if (hiddenToolsSet.has(tool.id)) return;
      const li = document.createElement("li");
      li.innerHTML = `
        <a class="sidebar-tool-link mega-item" data-tool="${tool.id}">
          ${tool.icon}
          <span>${tool.name}</span>
        </a>
      `;

      li.querySelector(".sidebar-tool-link").addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.navigateToTool(tool.id);
      });

      if (tool.category === "dev") {
        listDev.appendChild(li);
      } else if (tool.category === "text") {
        listText.appendChild(li);
      } else if (tool.category === "design") {
        listDesign.appendChild(li);
      } else if (tool.category === "math") {
        listMath.appendChild(li);
      }
    });
  },

  // Diagnostics check for all module imports
  async checkAllModules() {
    console.log("%c=== MODULE DIAGNOSTICS ===", "color: #00f2fe; font-weight: bold; font-size: 14px;");
    for (const tool of this.tools) {
      try {
        const module = await import('./tools/' + tool.id + '.js');
        if (module && module.default && typeof module.default.renderUI === 'function') {
          console.log(`%c[OK] Module "${tool.id}" loaded successfully.`, "color: #10b981;");
        } else {
          console.warn(`[WARN] Module "${tool.id}" loaded but default export or renderUI is missing.`);
        }
      } catch (err) {
        console.error(`[ERROR] Module "${tool.id}" failed to load:`, err);
      }
    }
    console.log("%c===========================", "color: #00f2fe; font-weight: bold; font-size: 14px;");
  },

  handleRouting() {
    const hash = window.location.hash || "";

    if (hash === "#admin") {
      const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "127.0.0.1.nip.io" ||
        window.location.hostname === "host.docker.internal";
      if (isLocalhost) {
        this.navigateToTool("admin-settings", false);
        return;
      }
    }

    // Legal pages required for AdSense approval
    if (hash === "#privacy") {
      this.renderLegalPage("privacy");
      return;
    }
    if (hash === "#about") {
      this.renderLegalPage("about");
      return;
    }
    if (hash === "#contact") {
      this.renderLegalPage("contact");
      return;
    }
    if (hash === "#terms") {
      this.renderLegalPage("terms");
      return;
    }

    if (hash.startsWith("#tool/")) {
      const toolId = hash.replace("#tool/", "");
      
      const redirect = this.toolRedirects[toolId];
      if (redirect) {
        this.activeSubtab = redirect.subtab;
        this.navigateToTool(redirect.suiteId, false);
        return;
      }

      const toolExists = this.tools.some(t => t.id === toolId);
      if (toolExists) {
        this.navigateToTool(toolId, false);
        return;
      }
    }

    if (hash === "#favorites") {
      this.activeCategory = "fav";
      this.activeSubcategory = "all";
      this.syncSidebarUI();
      this.backToDashboard(false);
      this.renderDashboard();
      return;
    }

    if (hash.startsWith("#category/")) {
      const filter = hash.replace("#category/", "");
      this.activeCategory = "subcategory-filter";
      this.activeSubcategory = filter;
      this.syncSidebarUI();
      this.backToDashboard(false);
      this.renderDashboard();
      return;
    }

    if (hash === "#dashboard") {
      this.activeCategory = "all";
      this.activeSubcategory = "all";
      this.syncSidebarUI();
      this.backToDashboard(false);
      this.renderDashboard();
      return;
    }

    // Default startup landing view check
    const defaultView = this.getConfigValue("omnitool_default_view", "dashboard");
    if (defaultView === "favorites") {
      this.activeCategory = "fav";
      this.activeSubcategory = "all";
    } else if (defaultView === "settings") {
      this.navigateToTool("admin-settings", false);
      return;
    } else if (defaultView.startsWith("category/")) {
      this.activeCategory = "subcategory-filter";
      this.activeSubcategory = defaultView.replace("category/", "");
    } else {
      this.activeCategory = "all";
      this.activeSubcategory = "all";
    }
    this.syncSidebarUI();
    this.backToDashboard(false);
    this.renderDashboard();
  },

  buildSidebarToolMenu() {
    // Clear any existing sub-tool lists first to support clean rebuilds
    document.querySelectorAll(".sidebar-sub-tools").forEach(el => el.remove());

    const hiddenToolsStr = this.getConfigValue("omnitool_hidden_tools", "");
    const hiddenToolsSet = new Set(hiddenToolsStr.split(",").filter(Boolean));

    document.querySelectorAll(".subnav-link").forEach(link => {
      const filter = link.getAttribute("data-filter");
      if (!filter || filter.endsWith("-all")) return;

      const parentLi = link.parentElement;
      parentLi.classList.add("subnav-item");

      const subList = document.createElement("ul");
      subList.className = "sidebar-sub-tools";

      const matchingTools = this.tools.filter(t => t.subcategory === filter && !hiddenToolsSet.has(t.id));
      matchingTools.forEach(tool => {
        const toolLi = document.createElement("li");
        toolLi.innerHTML = `<a class="sidebar-tool-link" data-tool="${tool.id}">${tool.name}</a>`;
        toolLi.querySelector(".sidebar-tool-link").addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.navigateToTool(tool.id);
        });
        subList.appendChild(toolLi);
      });

      parentLi.appendChild(subList);
    });
  },

  syncSidebarUI() {
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    document.querySelectorAll(".subnav-link").forEach(l => l.classList.remove("active"));
    document.querySelectorAll(".sidebar-tool-link").forEach(l => l.classList.remove("active"));
    document.querySelectorAll(".accordion-item").forEach(item => {
      item.classList.remove("open");
      const content = item.querySelector(".accordion-content");
      if (content) content.style.display = "none";
    });

    if (this.activeTool) {
      const toolLinks = document.querySelectorAll(`.sidebar-tool-link[data-tool="${this.activeTool}"]`);
      toolLinks.forEach(toolLink => {
        toolLink.classList.add("active");

        const subnav = toolLink.closest(".subnav-item")?.querySelector(".subnav-link");
        if (subnav) subnav.classList.add("active");

        const accordion = toolLink.closest(".accordion-item");
        if (accordion) {
          accordion.classList.add("open");
          const content = accordion.querySelector(".accordion-content");
          if (content) content.style.display = "flex";
        }
      });
    } else if (this.activeCategory === "all") {
      document.getElementById("cat-all")?.classList.add("active");
      document.getElementById("desktop-cat-all")?.classList.add("active");
    } else if (this.activeCategory === "fav") {
      document.getElementById("cat-fav")?.classList.add("active");
      document.getElementById("desktop-cat-fav")?.classList.add("active");
    } else if (this.activeCategory === "subcategory-filter") {
      const filter = this.activeSubcategory;
      const activeLinks = document.querySelectorAll(`.subnav-link[data-filter="${filter}"]`);
      activeLinks.forEach(activeLink => {
        activeLink.classList.add("active");

        const categoryKey = filter.split("-")[0];
        const accordion = document.getElementById(`accordion-${categoryKey}`);
        if (accordion) {
          accordion.classList.add("open");
          const content = accordion.querySelector(".accordion-content");
          if (content) content.style.display = "flex";
        }
      });
    }
  },

  registerServiceWorker() {
    const isLocalhost = window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "127.0.0.1.nip.io" ||
      window.location.hostname === "host.docker.internal";
    if (isLocalhost) {
      console.log("[Dev] Service Worker bypassed on localhost.");
      return;
    }
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").then(
          (reg) => {
            console.log("[PWA] Service Worker registered with scope: ", reg.scope);
            if (navigator.serviceWorker.controller) {
              reg.addEventListener("updatefound", () => {
                const installingWorker = reg.installing;
                if (installingWorker) {
                  installingWorker.addEventListener("statechange", () => {
                    if (installingWorker.state === "activated") {
                      console.log("[PWA] New service worker activated, reloading page...");
                      window.location.reload();
                    }
                  });
                }
              });
            }
          },
          (err) => console.error("[PWA] Service Worker registration failed: ", err)
        );
      });
    }
  },

  loadFavorites() {
    const saved = localStorage.getItem("omnitool_favs");
    if (saved) {
      try {
        const arr = JSON.parse(saved);
        this.favorites = new Set(arr);
      } catch (e) {
        this.favorites = new Set();
      }
    }
  },

  saveFavorites() {
    localStorage.setItem("omnitool_favs", JSON.stringify(Array.from(this.favorites)));
    this.renderFavoritesCount();
  },

  toggleFavorite(toolId, event) {
    if (event) event.stopPropagation();

    if (this.favorites.has(toolId)) {
      this.favorites.delete(toolId);
      this.showToast("Removed from favorites", "info");
    } else {
      this.favorites.add(toolId);
      this.showToast("Added to favorites!", "success");
    }
    this.saveFavorites();

    if (this.activeTool) {
      const toolBtn = document.querySelector(`.tool-bar-right [data-tool="${this.activeTool}"]`);
      if (toolBtn) {
        toolBtn.classList.toggle("is-fav", this.favorites.has(this.activeTool));
      }
    }
    this.renderDashboard();
  },

  renderFavoritesCount() {
    const elMobile = document.getElementById("fav-count");
    const elDesktop = document.getElementById("desktop-fav-count");
    [elMobile, elDesktop].forEach(el => {
      if (el) {
        if (this.favorites.size > 0) {
          el.innerText = this.favorites.size;
          el.style.display = "inline-block";
        } else {
          el.style.display = "none";
        }
      }
    });
  },

  loadRecents() {
    const saved = localStorage.getItem("omnitool_recents");
    if (saved) {
      try {
        this.recents = JSON.parse(saved);
      } catch (e) {
        this.recents = [];
      }
    }
    this.renderRecents();
  },

  addRecent(toolId) {
    this.recents = this.recents.filter(id => id !== toolId);
    this.recents.unshift(toolId);
    if (this.recents.length > 5) this.recents.pop();
    localStorage.setItem("omnitool_recents", JSON.stringify(this.recents));
    this.renderRecents();
  },

  renderRecents() {
    const containers = [
      document.getElementById("recent-tools-box"),
      document.getElementById("header-recents-list")
    ];

    containers.forEach((container, idx) => {
      if (!container) return;

      if (this.recents.length === 0) {
        container.innerHTML = `<span class="recent-link" style="font-size: 12px; color: var(--text-muted); cursor: default; padding-left: ${idx === 0 ? '8' : '0'}px;">No tools visited yet</span>`;
        return;
      }

      container.innerHTML = "";
      this.recents.forEach(id => {
        const tool = this.tools.find(t => t.id === id);
        if (tool) {
          const item = document.createElement("a");
          item.className = "recent-link";
          item.innerHTML = `${tool.icon} <span>${tool.name}</span>`;
          item.addEventListener("click", () => this.navigateToTool(id));
          container.appendChild(item);
        }
      });
    });
  },

  bindEvents() {
    // Hash routing change handler
    window.addEventListener("hashchange", () => this.handleRouting());

    // Top-Level Navigation links (Dashboard, Favorites)
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", (e) => {
        const cat = link.getAttribute("data-category");
        if (cat) {
          e.preventDefault();
          this.selectCategory(cat);
        }
      });
    });

    // Sidebar Accordion Trigger events
    document.querySelectorAll(".accordion-trigger").forEach(trigger => {
      trigger.addEventListener("click", () => {
        const parent = trigger.parentElement;
        const content = parent.querySelector(".accordion-content");
        const isOpen = parent.classList.contains("open");

        // Close all other accordions first
        document.querySelectorAll(".accordion-item").forEach(item => {
          if (item !== parent) {
            item.classList.remove("open");
            const inner = item.querySelector(".accordion-content");
            if (inner) inner.style.display = "none";
          }
        });

        // Toggle clicked accordion
        if (isOpen) {
          parent.classList.remove("open");
          if (content) content.style.display = "none";
        } else {
          parent.classList.add("open");
          if (content) content.style.display = "flex";
        }
      });
    });

    // Subnav-link clicks
    document.querySelectorAll(".subnav-link").forEach(subnav => {
      subnav.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = subnav.getAttribute("data-filter");

        // Toggle active style on subnav
        document.querySelectorAll(".subnav-link").forEach(l => l.classList.remove("active"));
        subnav.classList.add("active");

        // Remove active style from top navigation links
        document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));

        this.selectSubcategory(filter);
      });
    });

    // Theme toggler
    document.getElementById("theme-toggle")?.addEventListener("click", () => this.toggleTheme());

    // Cache clear button
    document.getElementById("cache-clear-btn")?.addEventListener("click", () => this.clearAppCache());

    // Sidebar Toggles (hamburger menu drawer)
    const openBtn = document.getElementById("sidebar-open-btn");
    const closeBtn = document.getElementById("sidebar-close-btn");
    const sidebar = document.getElementById("app-sidebar");

    // Load persisted desktop sidebar state
    const isCollapsed = localStorage.getItem("omnitool_sidebar_collapsed") === "true";
    if (isCollapsed && window.innerWidth > 768 && sidebar) {
      sidebar.classList.add("collapsed");
    }

    if (openBtn && sidebar) {
      openBtn.addEventListener("click", () => {
        sidebar.classList.add("show");
      });
    }
    if (closeBtn && sidebar) {
      closeBtn.addEventListener("click", () => {
        sidebar.classList.remove("show");
        sidebar.classList.remove("collapsed");
      });
    }

    // Quick Search Inputs
    document.getElementById("tool-search")?.addEventListener("input", (e) => {
      this.filterDashboard(e.target.value);
    });
    document.getElementById("tool-search-mobile")?.addEventListener("input", (e) => {
      this.filterDashboard(e.target.value);
    });

    // Keyboard bindings (Ctrl + K Command Palette)
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.toggleCommandPalette();
      }
      if (e.key === "Escape" && this.cpOpen) {
        this.toggleCommandPalette(false);
      }
    });

    // Command palette searching
    const cpSearch = document.getElementById("cp-search-input");
    cpSearch?.addEventListener("input", (e) => {
      this.searchCommandPalette(e.target.value);
    });

    cpSearch?.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        this.navigateCommandPalette(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        this.navigateCommandPalette(-1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        this.triggerCommandPaletteSelection();
      }
    });

    // Window level paste listener for auto-suggest detector
    window.addEventListener("paste", (e) => {
      const activeTag = document.activeElement.tagName.toLowerCase();
      if (activeTag === "textarea" || activeTag === "input") return;

      const pastedText = e.clipboardData.getData("text");
      this.detectPastedValue(pastedText);
    });

  },

  // ===================================================
  // Legal Pages — Required for Google AdSense Approval
  // ===================================================
  renderLegalPage(page) {
    const viewport = document.getElementById("active-tool-viewport");
    const dashView = document.getElementById("dashboard-view");
    if (!viewport) return;

    if (dashView) dashView.style.display = "none";
    viewport.style.display = "block";

    const pages = {
      privacy: {
        title: "Privacy Policy",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
        content: `
          <p class="legal-date"><strong>Effective Date:</strong> June 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> June 2026</p>
          <p>OmniTool Hub ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we handle your information when you use our website.</p>

          <h3>1. Information We Collect</h3>
          <p><strong>We do NOT collect any personal data.</strong> OmniTool Hub runs entirely in your browser (client-side). No data you enter into any tool is ever sent to a server. All processing happens locally on your device.</p>
          <ul>
            <li><strong>Local Storage:</strong> We use your browser's localStorage to save your preferences (theme, favorites, settings). This data stays on your device only.</li>
            <li><strong>No Cookies:</strong> We do not use tracking cookies or session cookies.</li>
            <li><strong>No Analytics:</strong> We do not use Google Analytics or any third-party analytics.</li>
          </ul>

          <h3>2. Google AdSense</h3>
          <p>We use Google AdSense to display advertisements. Google AdSense may use cookies and web beacons to serve ads based on a user's prior visits to our website and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site.</p>
          <p>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google Ads Settings</a>.</p>

          <h3>3. Third-Party Links</h3>
          <p>Our website may contain links to external websites. We have no control over the privacy practices of those sites and are not responsible for their content.</p>

          <h3>4. Children's Privacy</h3>
          <p>OmniTool Hub does not knowingly collect information from children under the age of 13.</p>

          <h3>5. Changes to This Policy</h3>
          <p>We may update this Privacy Policy periodically. Updates will be reflected on this page with a new effective date.</p>

          <h3>6. Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please use our <a href="#contact" onclick="app.renderLegalPage('contact')">Contact page</a>.</p>
        `
      },
      about: {
        title: "About OmniTool Hub",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
        content: `
          <p class="about-lead">OmniTool Hub is a free, privacy-first, all-in-one utility toolkit built for developers, designers, students, and anyone who needs fast, reliable tools without leaving their browser.</p>

          <h3>Our Mission</h3>
          <p>We believe powerful tools should be free, fast, and private. Every tool on OmniTool Hub runs 100% in your browser — your data never leaves your device, no accounts needed, no tracking, and no paid subscriptions.</p>

          <h3>What We Offer</h3>
          <div class="about-features-grid">
            <div class="about-feature-card">
              <div class="about-feature-icon">🔧</div>
              <h4>Developer Tools</h4>
              <p>JSON Formatter, Base64, JWT Decoder, Hash Generator, AES Encryption, URL Encoder, and more</p>
            </div>
            <div class="about-feature-card">
              <div class="about-feature-icon">✍️</div>
              <h4>Text &amp; Writing</h4>
              <p>Markdown Editor, Case Converter, Word Counter, Regex Tester, Diff Comparison Tool</p>
            </div>
            <div class="about-feature-card">
              <div class="about-feature-icon">🎨</div>
              <h4>Design &amp; Styling</h4>
              <p>Color Palette Picker, Gradient Builder, CSS Generators, Art QR Code Generator</p>
            </div>
            <div class="about-feature-card">
              <div class="about-feature-icon">🔢</div>
              <h4>Math &amp; Converter</h4>
              <p>Scientific Calculator, Unit Converter, Strong Password &amp; Entropy Generator</p>
            </div>
          </div>

          <h3>Privacy By Design</h3>
          <p>All tools are built with a client-side first architecture. We use no backend servers for tool processing. Your inputs stay in your browser and are never transmitted anywhere.</p>

          <h3>Open & Free</h3>
          <p>OmniTool Hub is free to use for everyone. We support the platform through non-intrusive Google AdSense advertisements.</p>
        `
      },
      contact: {
        title: "Contact Us",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
        content: `
          <p class="contact-intro">Have a question, feedback, or need support? Reach out to the appropriate department, and we will get back to you as soon as possible.</p>
          
          <div class="contact-grid">
            <div class="contact-card-premium">
              <div class="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <h4>General Support</h4>
              <p>For questions regarding tools, features, or general feedback.</p>
              <a href="mailto:contact@omnitoolhub.com" class="contact-card-email">contact@omnitoolhub.com</a>
            </div>

            <div class="contact-card-premium">
              <div class="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <h4>Bug Reports</h4>
              <p>To report technical issues, glitches, or tool functional errors.</p>
              <a href="mailto:support@omnitoolhub.com" class="contact-card-email">support@omnitoolhub.com</a>
            </div>

            <div class="contact-card-premium">
              <div class="contact-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <h4>Advertising &amp; Ads</h4>
              <p>For sponsorship and partner advertisements or integrations.</p>
              <a href="mailto:ads@omnitoolhub.com" class="contact-card-email">ads@omnitoolhub.com</a>
            </div>
          </div>

          <div class="contact-meta-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span>Typical response time: 2–3 business days</span>
          </div>
        `
      },
      terms: {
        title: "Terms of Service",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
        content: `
          <p class="legal-date"><strong>Effective Date:</strong> June 2026</p>
          <p>By using OmniTool Hub, you agree to the following terms.</p>

          <h3>1. Use of Service</h3>
          <p>OmniTool Hub provides free browser-based utility tools for personal and professional use. You may use these tools for any lawful purpose.</p>

          <h3>2. Prohibited Uses</h3>
          <ul>
            <li>You may not use OmniTool Hub for any illegal, harmful, or fraudulent activity</li>
            <li>You may not attempt to reverse engineer, copy, or redistribute the site's code without permission</li>
            <li>You may not use automated bots to excessively access the site</li>
            <li>You may not click on or artificially inflate ad impressions</li>
          </ul>

          <h3>3. Disclaimer of Warranties</h3>
          <p>OmniTool Hub is provided "as is" without any warranties. We do not guarantee that tools will be error-free or suitable for every use case. Use results at your own discretion.</p>

          <h3>4. Limitation of Liability</h3>
          <p>We are not liable for any loss of data, damage to systems, or any other harm resulting from using OmniTool Hub. Always back up important data before processing.</p>

          <h3>5. Intellectual Property</h3>
          <p>All content, design, and code of OmniTool Hub is owned by OmniTool Hub. Unauthorized reproduction is prohibited.</p>

          <h3>6. Changes to Terms</h3>
          <p>We reserve the right to update these Terms at any time. Continued use of the site means you accept the updated terms.</p>

          <h3>7. Contact</h3>
          <p>Questions about these Terms? <a href="#contact" onclick="app.renderLegalPage('contact')">Contact us</a>.</p>
        `
      }
    };

    const pg = pages[page];
    if (!pg) return;

    const titleEl = document.getElementById("header-view-title");
    if (titleEl) {
      titleEl.innerText = pg.title;
      titleEl.style.display = "block";
    }

    viewport.innerHTML = `
      <div class="legal-page-wrapper">
        <div class="legal-page-header">
          <div class="legal-icon">${pg.icon}</div>
          <div>
            <h1 class="legal-title">${pg.title}</h1>
            <p class="legal-subtitle">OmniTool Hub — Official Documentation</p>
          </div>
        </div>
        <div class="legal-content">
          ${pg.content}
        </div>
        <div class="legal-back">
          <button class="legal-back-btn" onclick="window.location.hash = 'dashboard'">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Back to Dashboard
          </button>
        </div>
      </div>
    `;
  },

  // Smart Paste value auto-detection
  detectPastedValue(text) {
    const clean = text.trim();
    if (!clean) return;

    // 1. JSON
    if ((clean.startsWith("{") && clean.endsWith("}")) || (clean.startsWith("[") && clean.endsWith("]"))) {
      try {
        JSON.parse(clean);
        this.showToast("Detected JSON payload. Open Formatter?", "info", () => {
          this.pendingPaste = {
            toolId: "formatter-suite",
            tab: "json",
            inputSelector: "#formatter-input",
            value: clean,
            btnSelector: "#json-format-btn"
          };
          this.navigateToTool("json-formatter");
        });
        return;
      } catch (e) { }
    }

    // 2. JWT
    if (/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/.test(clean)) {
      this.showToast("Detected JWT. Click to decode payload.", "info", () => {
        this.pendingPaste = {
          toolId: "jwt-decoder",
          inputSelector: "#jwt-input",
          value: clean
        };
        this.navigateToTool("jwt-decoder");
      });
      return;
    }

    // 3. HEX Color
    if (/^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/.test(clean)) {
      this.showToast("Detected HEX color. Open Contrast checker?", "info", () => {
        this.pendingPaste = {
          toolId: "color-lab",
          tab: "palette",
          inputSelector: "#contrast-bg-hex",
          value: clean
        };
        this.navigateToTool("color-palette");
      });
      return;
    }

    // 4. Epoch Timestamp
    if (/^\d{10}$|^\d{13}$/.test(clean)) {
      this.showToast("Detected Epoch Unix Timestamp. Convert to date?", "info", () => {
        this.pendingPaste = {
          toolId: "datetime-suite",
          tab: "epoch",
          inputSelector: "#epoch-input",
          value: clean,
          btnSelector: "#epoch-convert-btn"
        };
        this.navigateToTool("epoch-converter");
      });
      return;
    }

    // 5. Base64
    if (clean.length > 8 && /^[a-zA-Z0-9+/=]+$/.test(clean)) {
      try {
        const decoded = atob(clean);
        if (decoded.length > 3 && /[\x00-\x7F]/.test(decoded)) {
          this.showToast("Detected Base64 string. Decode now?", "info", () => {
            this.pendingPaste = {
              toolId: "text-encoder-suite",
              tab: "base64",
              inputSelector: "#base64-input",
              value: clean,
              btnSelector: "#base64-decode-btn"
            };
            this.navigateToTool("base64");
          });
          return;
        }
      } catch (e) { }
    }
  },

  // Command Palette UI toggle
  toggleCommandPalette(forceState) {
    const cp = document.getElementById("command-palette");
    if (!cp) return;

    this.cpOpen = forceState !== undefined ? forceState : !this.cpOpen;
    cp.style.display = this.cpOpen ? "flex" : "none";

    if (this.cpOpen) {
      const searchInput = document.getElementById("cp-search-input");
      if (searchInput) {
        searchInput.value = "";
        searchInput.focus();
      }
      this.searchCommandPalette("");
    }
  },

  searchCommandPalette(query) {
    const clean = query.toLowerCase().trim();
    const listEl = document.getElementById("cp-results-list");
    if (!listEl) return;

    listEl.innerHTML = "";

    const hiddenToolsStr = this.getConfigValue("omnitool_hidden_tools", "");
    const hiddenToolsSet = new Set(hiddenToolsStr.split(",").filter(Boolean));

    this.cpFiltered = this.tools.filter(t =>
      !hiddenToolsSet.has(t.id) &&
      (t.name.toLowerCase().includes(clean) ||
       t.desc.toLowerCase().includes(clean) ||
       t.subLabel.toLowerCase().includes(clean))
    );

    this.cpIndex = 0;

    if (this.cpFiltered.length === 0) {
      listEl.innerHTML = `<div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 13px;">No commands or tools match "${query}"</div>`;
      return;
    }

    this.cpFiltered.forEach((tool, idx) => {
      const item = document.createElement("div");
      item.className = `cp-item ${idx === 0 ? 'selected' : ''}`;
      item.innerHTML = `
        ${tool.icon}
        <div class="cp-item-info">
          <span class="cp-item-title">${tool.name}</span>
          <span class="cp-item-desc">${tool.desc}</span>
        </div>
      `;
      item.addEventListener("click", () => {
        this.navigateToTool(tool.id);
        this.toggleCommandPalette(false);
      });
      listEl.appendChild(item);
    });
  },

  navigateCommandPalette(direction) {
    const listEl = document.getElementById("cp-results-list");
    if (!listEl || this.cpFiltered.length === 0) return;

    const items = listEl.querySelectorAll(".cp-item");
    if (items[this.cpIndex]) items[this.cpIndex].classList.remove("selected");

    this.cpIndex = (this.cpIndex + direction + this.cpFiltered.length) % this.cpFiltered.length;

    if (items[this.cpIndex]) {
      items[this.cpIndex].classList.add("selected");
      items[this.cpIndex].scrollIntoView({ block: "nearest" });
    }
  },

  triggerCommandPaletteSelection() {
    if (this.cpFiltered.length > 0 && this.cpFiltered[this.cpIndex]) {
      this.navigateToTool(this.cpFiltered[this.cpIndex].id);
      this.toggleCommandPalette(false);
    }
  },

  // Theme support
  initTheme() {
    const saved = this.getConfigValue("omnitool_theme", "dark");
    document.documentElement.setAttribute("data-theme", saved);
    this.updateThemeUI(saved);
    this.applyAccentPreset();
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const target = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", target);
    localStorage.setItem("omnitool_theme", target);
    this.updateThemeUI(target);
    this.showToast(`Switched to ${target} theme`, "info");
    this.playSynthSound('click');
  },

  updateThemeUI(theme) {
    const sunIcon = document.getElementById("theme-sun-icon");
    const moonIcon = document.getElementById("theme-moon-icon");
    const modeBadge = document.getElementById("theme-mode-badge");

    if (theme === "dark") {
      if (sunIcon) sunIcon.style.display = "none";
      if (moonIcon) moonIcon.style.display = "block";
      if (modeBadge) {
        modeBadge.innerText = "Cyber Dark";
        modeBadge.style.color = "var(--accent-cyan)";
        modeBadge.style.backgroundColor = "rgba(0, 242, 254, 0.15)";
      }
    } else {
      if (sunIcon) sunIcon.style.display = "block";
      if (moonIcon) moonIcon.style.display = "none";
      if (modeBadge) {
        modeBadge.innerText = "Modern Light";
        modeBadge.style.color = "var(--accent-purple)";
        modeBadge.style.backgroundColor = "rgba(157, 78, 221, 0.15)";
      }
    }
  },

  applyAccentPreset() {
    const preset = this.getConfigValue("omnitool_accent_preset", "default");
    const presets = {
      default: { cyan: "#00f2fe", cyanRgb: "0, 242, 254", purple: "#9d4edd", purpleRgb: "157, 78, 221" },
      matrix: { cyan: "#10b981", cyanRgb: "16, 185, 129", purple: "#059669", purpleRgb: "5, 150, 105" },
      vaporwave: { cyan: "#ff007f", cyanRgb: "255, 0, 127", purple: "#00f2fe", purpleRgb: "0, 242, 254" },
      sunset: { cyan: "#f43f5e", cyanRgb: "244, 63, 94", purple: "#f59e0b", purpleRgb: "245, 158, 11" },
      amber: { cyan: "#fbbf24", cyanRgb: "251, 191, 36", purple: "#d97706", purpleRgb: "217, 119, 6" },
      electric: { cyan: "#3b82f6", cyanRgb: "59, 130, 246", purple: "#00f2fe", purpleRgb: "0, 242, 254" }
    };
    const colors = presets[preset] || presets.default;
    const root = document.documentElement;
    root.style.setProperty('--accent-cyan', colors.cyan);
    root.style.setProperty('--accent-cyan-rgb', colors.cyanRgb);
    root.style.setProperty('--accent-purple', colors.purple);
    root.style.setProperty('--accent-purple-rgb', colors.purpleRgb);
  },

  playSynthSound(type = 'click') {
    const audioEnabled = this.getConfigValue("omnitool_audio_feedback", "false") === "true";
    if (!audioEnabled) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1000, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.04);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.14); // G5
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'error') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.25);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'save') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(392, now); // G4
        osc.frequency.exponentialRampToValueAtTime(784, now + 0.15); // G5
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      }
    } catch (e) {
      console.warn("AudioContext playback failed:", e);
    }
  },

  // Clock Widget
  initClock() {
    const clockWidget = document.getElementById("header-clock");
    const clockEl = document.getElementById("clock-text");
    const updateTime = () => {
      const format = this.getConfigValue("omnitool_clock_format", "24");
      if (format === "hide") {
        if (clockWidget) clockWidget.style.display = "none";
        return;
      }
      if (clockWidget) clockWidget.style.display = "flex";

      const now = new Date();
      let hrs = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');

      if (format === "12") {
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12;
        const hrsStr = String(hrs).padStart(2, '0');
        if (clockEl) clockEl.innerText = `${hrsStr}:${ampm}`;
      } else {
        const hrsStr = String(hrs).padStart(2, '0');
        if (clockEl) clockEl.innerText = `${hrsStr}:${mins}:${secs}`;
      }
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  // Navigation Filter updates
  selectCategory(category, updateHash = true) {
    if (updateHash) {
      window.location.hash = category === "fav" ? "favorites" : "dashboard";
      return;
    }
    this.activeCategory = category;
    this.activeSubcategory = "all";

    // Close sidebar on mobile
    const sidebar = document.getElementById("app-sidebar");
    if (sidebar) sidebar.classList.remove("show");

    // Clear search bars
    const searchBar = document.getElementById("tool-search");
    const searchBarMobile = document.getElementById("tool-search-mobile");
    if (searchBar) searchBar.value = "";
    if (searchBarMobile) searchBarMobile.value = "";

    const titleEl = document.getElementById("header-view-title");
    if (titleEl) titleEl.innerText = this.getCategoryLabel(category);

    this.backToDashboard(false);
    this.renderDashboard();
  },

  selectSubcategory(filter, updateHash = true) {
    if (updateHash) {
      window.location.hash = "category/" + filter;
      return;
    }
    this.activeCategory = "subcategory-filter";
    this.activeSubcategory = filter;

    // Close mobile drawer
    const sidebar = document.getElementById("app-sidebar");
    if (sidebar) sidebar.classList.remove("show");

    // Clear search bars
    const searchBar = document.getElementById("tool-search");
    const searchBarMobile = document.getElementById("tool-search-mobile");
    if (searchBar) searchBar.value = "";
    if (searchBarMobile) searchBarMobile.value = "";

    const titleEl = document.getElementById("header-view-title");
    if (titleEl) {
      titleEl.innerText = this.getSubcategoryLabel(filter);
    }

    this.backToDashboard(false);
    this.renderDashboard();
  },

  getCategoryLabel(cat) {
    const labels = {
      all: "Dashboard",
      fav: "Favorites"
    };
    return labels[cat] || "Tools";
  },

  getSubcategoryLabel(filter) {
    // Parse filters like 'dev-formatters' or 'dev-all'
    if (filter.endsWith("-all")) {
      const cat = filter.split("-")[0];
      const categories = {
        dev: "Developer Tools",
        text: "Text & Writing Utilities",
        design: "Design & Styling",
        math: "Math & Converter Suite"
      };
      return categories[cat] || "Tools";
    }

    const subcategories = {
      "dev-pipelines": "Developer Tools / Data Pipelines",
      "dev-formatters": "Developer Tools / Formatters & Parsers",
      "dev-encoders": "Developer Tools / Encoders & Decoders",
      "dev-crypto": "Developer Tools / Crypto & Security",
      "dev-generators": "Developer Tools / Generators",
      "text-case": "Text & Writing / Transformations",
      "text-markdown": "Text & Writing / Writers & Parsers",
      "text-regex": "Text & Writing / Pattern Analysis",
      "design-color": "Design & Styling / Color Management",
      "design-css": "Design & Styling / CSS Builders",
      "design-graphics": "Design & Styling / Graphics & Screens",
      "math-conversion": "Math & Converter / Conversion",
      "math-security": "Math & Converter / Security & Pass",
      "math-calc": "Math & Converter / Calculator"
    };
    return subcategories[filter] || "Category Tools";
  },

  getAdHtml(location) {
    const isGlobalEnabled = this.getConfigValue("omnitool_ad_global", "true") !== "false";
    if (!isGlobalEnabled) return "";

    // Check if ad location is enabled
    const showDash = this.getConfigValue("omnitool_ad_show_dash", "true") !== "false";
    const showTool = this.getConfigValue("omnitool_ad_show_tool", "true") !== "false";
    const showSide = this.getConfigValue("omnitool_ad_show_side", "true") !== "false";

    if (location === "dashboard" && !showDash) return "";
    if (location === "tool" && !showTool) return "";
    if (location === "sidebar" && !showSide) return "";

    const provider = this.getConfigValue("omnitool_ad_network", "dev");

    // Developer Local Sponsors
    if (provider === "dev") {
      const ads = [
        {
          brand: "ApexScale DB",
          slogan: "Serverless SQL database with global replicas and 10ms read times. Start free.",
          btnText: "Deploy Free",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`
        },
        {
          brand: "HexaCloud Host",
          slogan: "Secure, lightning-fast PWA hosting and serverless deployments globally.",
          btnText: "Claim $5 Credit",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>`
        },
        {
          brand: "DevSec Shield",
          slogan: "Automate vulnerability scanning and dependency updates in your repositories.",
          btnText: "Start Scan",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
        }
      ];
      const ad = ads[Math.floor(Math.random() * ads.length)];
      return `
        <div class="sponsor-ad-block">
          <div class="ad-horizontal-left">
            <div class="ad-image-placeholder">
              ${ad.icon}
            </div>
            <div class="ad-info">
              <div class="ad-title-row">
                <span class="ad-brand">${ad.brand}</span>
                <span class="ad-horizontal-badge">SPONSOR</span>
              </div>
              <span class="ad-slogan">${ad.slogan}</span>
            </div>
          </div>
          <a href="#" class="ad-action-btn" onclick="event.preventDefault(); app.showToast('Thank you for supporting OmniTool Hub sponsors!', 'success');">${ad.btnText}</a>
        </div>
      `;
    }

    // Google AdSense
    if (provider === "adsense") {
      const pubId = this.getConfigValue("omnitool_adsense_pub", "ca-pub-XXXXXXXXXX");
      let slotId = "1111111111";
      if (location === "tool") {
        slotId = this.getConfigValue("omnitool_adsense_slot_tool", "2222222222");
      } else if (location === "sidebar") {
        slotId = this.getConfigValue("omnitool_adsense_slot_side", "3333333333");
      } else {
        slotId = this.getConfigValue("omnitool_adsense_slot_dash", "1111111111");
      }

      const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      if (isLocal) {
        // Render simulator on localhost
        return `
          <div class="admob-adsense-mock adsense">
            <div class="mock-badge">GOOGLE ADSENSE — LIVE ON DEPLOYED SITE</div>
            <div class="mock-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              <span>Google AdSense (Web Ads)</span>
            </div>
            <div class="mock-details">
              <span><strong>Publisher:</strong> ${pubId}</span>
              <span>•</span>
              <span><strong>Slot:</strong> ${slotId}</span>
            </div>
            <div class="mock-note">Real ads appear automatically on your live deployed website.</div>
          </div>
        `;
      } else {
        // Render real production AdSense code
        return `
          <div class="adsense-production-container" style="text-align: center; margin: 16px 0; overflow: hidden;">
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${pubId}"
                 data-ad-slot="${slotId}"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
                 (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
          </div>
        `;
      }
    }

    // AdMob — Mobile Apps Only (Cannot run on websites)
    if (provider === "admob") {
      let unitId = "ca-app-pub-XXXXXXXXXX/1111111111";
      if (location === "tool") {
        unitId = this.getConfigValue("omnitool_admob_unit_tool", "ca-app-pub-XXXXXXXXXX/2222222222");
      } else if (location === "sidebar") {
        unitId = this.getConfigValue("omnitool_admob_unit_side", "ca-app-pub-XXXXXXXXXX/3333333333");
      } else {
        unitId = this.getConfigValue("omnitool_admob_unit_dash", "ca-app-pub-XXXXXXXXXX/1111111111");
      }

      // AdMob CANNOT work on websites — it is for Android/iOS apps only.
      // Show an informative placeholder in both dev and production
      return `
        <div class="admob-adsense-mock admob" style="border-color: rgba(245, 158, 11, 0.3);">
          <div class="mock-badge" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">⚠️ ADMOB — MOBILE APPS ONLY</div>
          <div class="mock-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span style="color: #f59e0b;">AdMob cannot display on websites</span>
          </div>
          <div class="mock-details">
            <span><strong>Unit ID:</strong> ${unitId}</span>
          </div>
          <div class="mock-note" style="color: #f59e0b; border-color: rgba(245, 158, 11, 0.2);">
            💡 AdMob works only in Android/iOS apps via the AdMob SDK. For this website, switch to <strong>Google AdSense</strong> instead.
          </div>
        </div>
      `;
    }

    // Custom HTML block
    if (provider === "custom") {
      const htmlBlock = this.getConfigValue("omnitool_custom_ad_html", "");
      return `<div class="custom-ad-container">${htmlBlock}</div>`;
    }

    return "";
  },

  // Grouped cards renderer
  renderDashboard() {
    const grid = document.getElementById("tools-card-grid");
    if (!grid) return;

    this.renderCategoryTabs();

    grid.innerHTML = "";

    const hiddenToolsStr = this.getConfigValue("omnitool_hidden_tools", "");
    const hiddenToolsSet = new Set(hiddenToolsStr.split(",").filter(Boolean));

    // Read density layout config
    const density = this.getConfigValue("omnitool_layout_density", "comfortable");
    if (density === "compact") {
      grid.classList.add("compact-layout");
    } else {
      grid.classList.remove("compact-layout");
    }

    const dashboardView = document.getElementById("dashboard-view");
    const hero = document.querySelector(".dashboard-hero");

    // Clean up existing dynamic category headers and ads inside dashboard-view
    const existingHeader = document.querySelector(".category-page-header");
    if (existingHeader) existingHeader.remove();
    const existingAds = document.querySelectorAll("#dashboard-view > .sponsor-ad-block, #dashboard-view > .admob-adsense-mock, #dashboard-view > .adsense-production-container, #dashboard-view > .custom-ad-container");
    existingAds.forEach(el => el.remove());

    // Filter tools based on selections
    let activeList = [];
    if (this.activeCategory === "fav") {
      activeList = this.tools.filter(t => this.favorites.has(t.id));
    } else if (this.activeCategory === "all") {
      activeList = this.tools;
    } else if (this.activeCategory === "subcategory-filter") {
      if (this.activeSubcategory.endsWith("-all")) {
        const catPrefix = this.activeSubcategory.split("-")[0];
        activeList = this.tools.filter(t => t.category === catPrefix);
      } else {
        activeList = this.tools.filter(t => t.subcategory === this.activeSubcategory);
      }
    }

    // Filter out hidden tools
    activeList = activeList.filter(t => !hiddenToolsSet.has(t.id));

    if (this.activeCategory === "all" && this.activeSubcategory === "all") {
      if (hero) hero.style.display = "block";
    } else {
      if (hero) hero.style.display = "none";

      // Render Category Landing Header Page
      let catKey = "all";
      if (this.activeCategory === "fav") {
        catKey = "fav";
      } else if (this.activeCategory === "subcategory-filter") {
        catKey = this.activeSubcategory.split("-")[0];
      }

      const categoryConfigs = {
        dev: {
          title: "Developer Tools",
          desc: "Beautifiers, builders, decoders, and generators for modern development pipelines. Secure, offline-first client-side calculations.",
          class: "cat-grad-dev",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
        },
        text: {
          title: "Text & Writing Utilities",
          desc: "Case converters, markdown editors, pattern analyzers, and writing enhancements.",
          class: "cat-grad-text",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"></path></svg>`
        },
        design: {
          title: "Design & Styling Studio",
          desc: "Visual CSS builders, color management palettes, and graphics optimizing utilities.",
          class: "cat-grad-design",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>`
        },
        math: {
          title: "Math & Converter Suite",
          desc: "Scientific calculator, metric conversion, and secure password tools.",
          class: "cat-grad-math",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="10" y2="21"></line><line x1="14" y1="3" x2="14" y2="21"></line></svg>`
        },
        fav: {
          title: "Your Favorites",
          desc: "Quick access to your most frequently used offline utilities and tools.",
          class: "cat-grad-dev",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
        }
      };

      const config = categoryConfigs[catKey] || categoryConfigs.dev;

      let titleText = config.title;
      let subtitleText = "";
      if (this.activeCategory === "subcategory-filter" && !this.activeSubcategory.endsWith("-all")) {
        const parts = this.getSubcategoryLabel(this.activeSubcategory).split(" / ");
        if (parts.length > 1) {
          subtitleText = parts[0];
          titleText = parts[1];
        } else {
          titleText = parts[0];
        }
      }

      // Compute stats
      let catTools = [];
      if (this.activeCategory === "fav") {
        catTools = this.tools.filter(t => this.favorites.has(t.id));
      } else {
        if (this.activeSubcategory.endsWith("-all")) {
          const catPrefix = this.activeSubcategory.split("-")[0];
          catTools = this.tools.filter(t => t.category === catPrefix);
        } else {
          catTools = this.tools.filter(t => t.subcategory === this.activeSubcategory);
        }
      }
      catTools = catTools.filter(t => !hiddenToolsSet.has(t.id));

      const totalVal = catTools.length;
      const favVal = catTools.filter(t => this.favorites.has(t.id)).length;

      // Render landing page header card
      const headerCard = document.createElement("div");
      headerCard.className = `category-page-header ${config.class}`;
      headerCard.innerHTML = `
        <div class="category-header-info">
          ${subtitleText ? `<span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--text-muted); font-weight: 700; margin-bottom: 4px; display: block;">${subtitleText}</span>` : ''}
          <h1 class="category-header-title">
            ${config.icon}
            <span>${titleText}</span>
          </h1>
          <p class="category-header-desc">${config.desc}</p>
        </div>
        <div class="category-header-stats">
          <div class="category-stat-card">
            <div class="category-stat-value">${totalVal}</div>
            <div class="category-stat-label">Utilities</div>
          </div>
          <div class="category-stat-card">
            <div class="category-stat-value">${favVal}</div>
            <div class="category-stat-label">Favorites</div>
          </div>
        </div>
      `;

      if (dashboardView && grid) {
        dashboardView.insertBefore(headerCard, grid);
      }

      // Ingest horizontal sponsor ad below header
      const horizontalAdHtml = this.getAdHtml("dashboard");
      if (horizontalAdHtml) {
        const adWrapper = document.createElement("div");
        adWrapper.innerHTML = horizontalAdHtml;
        const adElement = adWrapper.firstElementChild;
        if (adElement && dashboardView && grid) {
          dashboardView.insertBefore(adElement, grid);
        }
      }
    }

    if (activeList.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48" style="margin-bottom: 12px; opacity: 0.5;">
            <circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          <h3>No tools found in this section</h3>
        </div>
      `;
      return;
    }

    // Group activeList by subcategory if rendering "all" dashboard or "<category>-all"
    const shouldGroup = (this.activeCategory === "all" || (this.activeCategory === "subcategory-filter" && this.activeSubcategory.endsWith("-all")));

    if (shouldGroup) {
      // Find all unique subcategories present in the list
      const subcats = Array.from(new Set(activeList.map(t => t.subcategory)));

      subcats.forEach(sub => {
        const subList = activeList.filter(t => t.subcategory === sub);
        if (subList.length > 0) {
          const section = document.createElement("div");
          section.className = "dashboard-sub-section";
          section.setAttribute("style", "grid-column: 1 / -1;");

          const title = document.createElement("h3");
          title.className = "dashboard-sub-title";
          title.innerText = subList[0].subLabel;
          section.appendChild(title);

          const subGrid = document.createElement("div");
          subGrid.className = "tools-grid";
          if (density === "compact") {
            subGrid.classList.add("compact-layout");
          }
          this.renderToolsList(subGrid, subList);

          section.appendChild(subGrid);
          grid.appendChild(section);
        }
      });
    } else {
      // Flat grid display for specific subcategory selection
      this.renderToolsList(grid, activeList);
    }
  },

  renderToolsList(container, list) {
    list.forEach(tool => {
      const isFav = this.favorites.has(tool.id);
      const card = document.createElement("div");
      card.className = "tool-card";
      card.setAttribute("style", `--card-accent: ${tool.accent}; --card-accent-rgb: ${tool.accentRgb};`);
      card.addEventListener("click", () => this.navigateToTool(tool.id));

      card.innerHTML = `
        <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" data-tool="${tool.id}" title="Toggle Favorite">
          <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </button>
        <div class="tool-card-header">
          <div class="tool-icon-wrapper">
            ${tool.icon}
          </div>
        </div>
        <div class="tool-card-body">
          <h3>${tool.name}</h3>
          <p>${tool.desc}</p>
        </div>
        <div class="tool-card-footer">
          <span class="tool-badge">${tool.subLabel.toUpperCase()}</span>
          <span class="launch-action">
            <span>Launch Tool</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
        </div>
      `;

      card.querySelector(".card-fav-btn").addEventListener("click", (e) => {
        this.toggleFavorite(tool.id, e);
      });

      container.appendChild(card);
    });
  },

  renderCategoryTabs() {
    const bar = document.getElementById("category-tabs-bar");
    if (!bar) return;

    const activeCat = this.activeCategory;
    const activeSub = this.activeSubcategory;

    let currentActive = "all";
    if (activeCat === "fav") {
      currentActive = "fav";
    } else if (activeCat === "subcategory-filter") {
      currentActive = activeSub.split("-")[0];
    }

    const tabs = [
      { id: "all", label: "All Tools", icon: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`, hash: "dashboard" },
      { id: "dev", label: "Developer", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`, hash: "category/dev-all" },
      { id: "text", label: "Text", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"></path></svg>`, hash: "category/text-all" },
      { id: "design", label: "Design", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path><path d="M2 12h20"></path></svg>`, hash: "category/design-all" },
      { id: "math", label: "Math", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="10" y2="21"></line><line x1="14" y1="3" x2="14" y2="21"></line></svg>`, hash: "category/math-all" },
      { id: "fav", label: "Favorites", icon: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`, hash: "favorites" }
    ];

    bar.innerHTML = tabs.map(tab => `
      <button class="category-tab-pill ${currentActive === tab.id ? 'active' : ''}" data-hash="${tab.hash}">
        ${tab.icon}
        <span>${tab.label}</span>
      </button>
    `).join("");

    bar.querySelectorAll(".category-tab-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        window.location.hash = pill.dataset.hash;
      });
    });
  },

  filterDashboard(query) {
    const cleanQuery = query.toLowerCase().trim();

    // Sync desktop and mobile search inputs
    const mainSearch = document.getElementById("tool-search");
    const mobileSearch = document.getElementById("tool-search-mobile");
    if (mainSearch && mainSearch.value !== query) mainSearch.value = query;
    if (mobileSearch && mobileSearch.value !== query) mobileSearch.value = query;

    // Switch to Dashboard category for searches to display flat grids
    if (cleanQuery && (this.activeCategory !== "all" || this.activeSubcategory !== "all")) {
      this.activeCategory = "all";
      this.activeSubcategory = "all";
      document.querySelectorAll(".subnav-link").forEach(l => l.classList.remove("active"));
      document.querySelectorAll(".accordion-item").forEach(item => {
        item.classList.remove("open");
        const c = item.querySelector(".accordion-content");
        if (c) c.style.display = "none";
      });
      document.getElementById("cat-all")?.classList.add("active");
      this.renderDashboard();
    }

    const cards = document.querySelectorAll(".tool-card");
    const sections = document.querySelectorAll(".dashboard-sub-section");
    let matchCount = 0;

    // Show/hide individual cards
    cards.forEach(card => {
      const title = card.querySelector(".tool-card-body h3").innerText.toLowerCase();
      const desc = card.querySelector(".tool-card-body p").innerText.toLowerCase();
      const tag = card.querySelector(".tool-badge").innerText.toLowerCase();

      if (title.includes(cleanQuery) || desc.includes(cleanQuery) || tag.includes(cleanQuery)) {
        card.style.display = "flex";
        matchCount++;
      } else {
        card.style.display = "none";
      }
    });

    // Show/hide subcategory section blocks if they have visible card items inside
    sections.forEach(section => {
      const visibleCards = Array.from(section.querySelectorAll(".tool-card")).filter(c => c.style.display !== "none");
      if (visibleCards.length > 0) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });

    const titleEl = document.getElementById("header-view-title");
    if (titleEl) {
      if (cleanQuery) {
        titleEl.innerText = `Search Results (${matchCount})`;
      } else {
        titleEl.innerText = "Dashboard";
      }
    }
  },

  async navigateToTool(toolId, updateHash = true) {
    if (updateHash) {
      window.location.hash = "tool/" + toolId;
      return;
    }

    // Close mobile drawer
    const sidebarEl = document.getElementById("app-sidebar");
    if (sidebarEl) sidebarEl.classList.remove("show");

    this.playSynthSound('click');

    // Trigger laser scan line animation
    const scanLine = document.getElementById("page-scan-line");
    if (scanLine) {
      scanLine.style.display = "block";
      scanLine.style.animation = "none";
      scanLine.offsetHeight; // trigger reflow
      scanLine.style.animation = "scanDown 0.75s cubic-bezier(0.2, 0.8, 0.2, 1) forwards";
      setTimeout(() => {
        scanLine.style.display = "none";
      }, 750);
    }

    this._guideArrowCleanup?.();

    const dashboard = document.getElementById("dashboard-view");
    if (dashboard) dashboard.style.display = "none";

    const viewport = document.getElementById("active-tool-viewport");
    if (!viewport) return;

    viewport.style.display = "none";
    viewport.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; padding: 80px; color: var(--text-muted); font-weight: 600;">
        <span class="clock-widget" style="border: none; background: none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" style="width: 20px; height: 20px; margin-right: 8px; animation: spin 1.5s linear infinite;">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Loading Tool Module...
        </span>
      </div>
    `;
    viewport.style.display = "flex";

    // Passcode lock gate for Admin Settings
    if (toolId === "admin-settings") {
      const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "127.0.0.1.nip.io" ||
        window.location.hostname === "host.docker.internal";
      if (!isLocalhost) {
        this.backToDashboard();
        return;
      }

      if (sessionStorage.getItem("omnitool_admin_authenticated") !== "true") {
        this.activeTool = "admin-settings";
        this.syncSidebarUI();

      const titleEl = document.getElementById("header-view-title");
      if (titleEl) {
        titleEl.innerText = "Developer Tools / Settings & Ad Control Panel";
        titleEl.style.display = "block";
      }

      const toolbarHtml = `
        <div class="tool-bar">
          <div class="tool-bar-left">
            <button class="back-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back</button>
            <div class="tool-title-info">
              <h2>Settings & Ad Control Panel</h2>
            </div>
          </div>
          <div class="tool-bar-right">
          </div>
        </div>
      `;

      const lockScreenHtml = `
        <div class="admin-lock-screen" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; width: 100%; padding: 40px 20px;">
          <div class="glass-card" style="max-width: 400px; width: 100%; padding: 32px; border-radius: 16px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); text-align: center; display: flex; flex-direction: column; gap: 20px;">
            
            <div class="lock-icon-container" style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
              <div class="lock-glow" style="width: 70px; height: 70px; border-radius: 50%; background: rgba(var(--accent-cyan-rgb), 0.1); border: 1px solid rgba(var(--accent-cyan-rgb), 0.3); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(var(--accent-cyan-rgb), 0.2); display: flex; justify-content: center; align-items: center;">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" style="width: 32px; height: 32px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
            </div>

            <div class="lock-header">
              <h2 style="font-size: 20px; font-weight: 800; color: var(--text-main); margin: 0 0 8px 0; letter-spacing: 0.5px;">Admin Authorization Required</h2>
              <p style="font-size: 13px; color: var(--text-muted); margin: 0; line-height: 1.4;">Enter the administration security passcode to customize global ads and site parameters.</p>
            </div>

            <form id="admin-auth-form" style="display: flex; flex-direction: column; gap: 16px; margin-top: 10px;">
              <div class="form-group" style="text-align: left;">
                <label for="admin-passcode-input" style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent-cyan); font-weight: 700; margin-bottom: 6px; display: block;">Security Passcode</label>
                <input type="password" id="admin-passcode-input" placeholder="••••••••" style="width: 100%; height: 42px; padding: 0 16px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-input); color: var(--text-main); font-size: 16px; outline: none; transition: all 0.2s;" required>
              </div>
              <button type="submit" class="tool-btn primary" style="width: 100%; justify-content: center; height: 42px; font-size: 14px; font-weight: 700; border-radius: 8px; cursor: pointer; transition: all 0.2s;">Unlock Control Panel</button>
            </form>
            
          </div>
        </div>
      `;

      viewport.innerHTML = toolbarHtml + lockScreenHtml;

      // Bind back button
      viewport.querySelector(".back-btn")?.addEventListener("click", () => this.backToDashboard());

      // Preload admin-settings module in the background so it is instantly compiled and ready when unlocked
      import('./tools/admin-settings.js').catch(() => {});

      const form = viewport.querySelector("#admin-auth-form");
      const input = viewport.querySelector("#admin-passcode-input");
      if (input) input.focus();

      form?.addEventListener("submit", (e) => {
        e.preventDefault();
        const enteredPasscode = input.value;
        const correctPasscode = this.getConfigValue("omnitool_admin_passcode", "admin123");

        if (enteredPasscode === correctPasscode) {
          sessionStorage.setItem("omnitool_admin_authenticated", "true");
          this.showToast("Authorization successful!", "success");
          
          // Smooth fade-out of lock screen before navigating to avoid abrupt UI snaps
          const lockScreen = viewport.querySelector(".admin-lock-screen");
          if (lockScreen) {
            lockScreen.style.transition = "opacity 0.25s ease, transform 0.25s ease";
            lockScreen.style.opacity = "0";
            lockScreen.style.transform = "translateY(10px) scale(0.98)";
            setTimeout(() => {
              this.navigateToTool(toolId, false);
            }, 250);
          } else {
            this.navigateToTool(toolId, false);
          }
        } else {
          this.showToast("Invalid passcode! Access Denied.", "error");
          input.value = "";
          input.focus();
        }
      });
      return;
    }
  }

    try {
      const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "127.0.0.1.nip.io" ||
        window.location.hostname === "host.docker.internal";
      
      // Avoid forcing cache-busting by default to enable browser JIT/compilation caching, making navigation instant.
      const useCacheBust = localStorage.getItem("omnitool_dev_cachebust") === "true";
      const cacheBust = (isLocalhost && useCacheBust) ? `?t=${Date.now()}` : '';
      const module = await import('./tools/' + toolId + '.js' + cacheBust);
      const toolInstance = module.default;

      const isFav = this.favorites.has(toolId);
      const toolbarHtml = `
        <div class="tool-bar">
          <div class="tool-bar-left">
            <button class="back-btn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back</button>
            <div class="tool-title-info">
              <h2>${toolInstance.name}</h2>
            </div>
          </div>
          <div class="tool-bar-right">
            <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" data-tool="${toolId}" title="Pin to Favorites">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </button>
          </div>
        </div>
      `;

      viewport.innerHTML = toolbarHtml + toolInstance.renderUI();

      // Inject "How it Benefits You" dynamic section inside any present guide card
      const guideCard = viewport.querySelector(".tool-guide-card");
      if (guideCard) {
        const benefits = this.toolBenefits[toolId];
        if (benefits && !guideCard.querySelector(".tool-guide-benefits")) {
          const benefitsDiv = document.createElement("div");
          benefitsDiv.className = "tool-guide-benefits";
          benefitsDiv.style.cssText = "margin-top: 18px; padding-top: 14px; border-top: 1px dashed rgba(255, 255, 255, 0.08); font-size: 12.5px; line-height: 1.5; color: var(--text-muted); text-align: left;";
          benefitsDiv.innerHTML = `
            <strong style="color: var(--accent-cyan); display: block; margin-bottom: 6px; font-size: 13px;">💡 How it Benefits You:</strong>
            <ul style="margin: 0; padding-left: 18px; list-style-type: disc; display: flex; flex-direction: column; gap: 6px;">
              ${benefits.map(b => `<li>${b}</li>`).join("")}
            </ul>
          `;
          guideCard.appendChild(benefitsDiv);
        }
      }

      // Append sponsor bar below tool contents (only if not a split-view tool)
      const hasSplitView = viewport.querySelector(".tool-content-layout.split-view");
      if (!hasSplitView) {
        const toolAdHtml = this.getAdHtml("tool");
        if (toolAdHtml) {
          const sponsorBar = document.createElement("div");
          sponsorBar.className = "tool-sponsor-bar";
          sponsorBar.innerHTML = toolAdHtml;
          viewport.appendChild(sponsorBar);
        }
      } else {
        // Distribute ads inside split-view panels so page doesn't scroll
        const panels = Array.from(viewport.querySelectorAll(".tool-content-layout.split-view > .tool-panel:not(.tool-guide-card)"));
        if (panels.length >= 2) {
          // Left Panel Ad (1 ad)
          const adHtml1 = this.getAdHtml("tool");
          if (adHtml1) {
            const adContainer = document.createElement("div");
            adContainer.className = "tool-panel-ad";
            adContainer.innerHTML = adHtml1;
            panels[0].appendChild(adContainer);
          }
          // Right Panel Ad (1 ad)
          const adHtml2 = this.getAdHtml("tool");
          if (adHtml2) {
            const adContainer2 = document.createElement("div");
            adContainer2.className = "tool-panel-ad";
            adContainer2.innerHTML = adHtml2;
            panels[1].appendChild(adContainer2);
          }
        }

        // Guide Card Ad (1 ad, bringing total to 3 ads while preserving layout space)
        const guideCard = viewport.querySelector(".tool-guide-card");
        if (guideCard) {
          const adHtml3 = this.getAdHtml("tool");
          if (adHtml3) {
            const adContainer3 = document.createElement("div");
            adContainer3.className = "tool-panel-ad";
            adContainer3.style.marginTop = "18px";
            adContainer3.style.paddingTop = "14px";
            adContainer3.style.borderTop = "1px dashed var(--border-color)";
            adContainer3.style.width = "100%";
            adContainer3.innerHTML = adHtml3;
            guideCard.appendChild(adContainer3);
          }
        }
      }

      // Bind back button
      viewport.querySelector(".back-btn")?.addEventListener("click", () => this.backToDashboard());

      // Bind favorite button
      const favBtn = viewport.querySelector(".card-fav-btn");
      if (favBtn) {
        favBtn.addEventListener("click", (e) => {
          this.toggleFavorite(toolId, e);
          favBtn.classList.toggle("is-fav", this.favorites.has(toolId));
        });
      }

      this.activeTool = toolId;
      this.addRecent(toolId);
      this.syncSidebarUI();

      const titleEl = document.getElementById("header-view-title");
      const toolMetadata = this.tools.find(t => t.id === toolId);
      if (titleEl && toolMetadata) {
        titleEl.innerText = `${toolMetadata.subLabel} / ${toolMetadata.name}`;
        titleEl.style.display = "block";
      }

      // Initialize tool module
      await toolInstance.init(viewport, this);

      // Add a floating bouncing down arrow for split-view tools to scroll to the guide
      const hasGuideCard = viewport.querySelector(".tool-guide-card");
      
      if (hasSplitView && hasGuideCard) {
        const arrow = document.createElement("button");
        arrow.className = "guide-scroll-arrow";
        arrow.setAttribute("aria-label", "Scroll to Quick Guide");
        arrow.title = "Scroll to Quick Guide";
        arrow.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        `;
        
        const mainWrapper = document.querySelector(".main-wrapper");
        if (mainWrapper) {
          mainWrapper.appendChild(arrow);
          
          const contentArea = document.getElementById("content-area");
          
          const handleScroll = () => {
            if (contentArea) {
              const scrollTop = contentArea.scrollTop;
              if (scrollTop > 80) {
                arrow.classList.add("fade-out");
              } else {
                arrow.classList.remove("fade-out");
              }
            }
          };
          
          arrow.addEventListener("click", () => {
            hasGuideCard.scrollIntoView({ behavior: "smooth" });
          });
          
          contentArea?.addEventListener("scroll", handleScroll);
          
          // Initial visibility state check
          handleScroll();
          
          this._guideArrowCleanup = () => {
            contentArea?.removeEventListener("scroll", handleScroll);
            arrow.remove();
            this._guideArrowCleanup = null;
          };
        }
      }

      // Handle pending auto-paste values
      if (this.pendingPaste) {
        const p = this.pendingPaste;
        if (p.toolId === toolId || this.toolRedirects[p.toolId]?.suiteId === toolId || (p.toolId === "formatter-suite" && toolId === "formatter-suite")) {
          const input = viewport.querySelector(p.inputSelector);
          if (input) {
            input.value = p.value;
            input.dispatchEvent(new Event("input"));
            if (p.btnSelector) {
              viewport.querySelector(p.btnSelector)?.click();
            }
          }
        }
        this.pendingPaste = null;
      }
    } catch (err) {
      console.error(`Error loading tool ID: ${toolId}`, err);
      this.showToast(`Failed to load tool module: ${err.message}`, "error", 8000);
      this.backToDashboard();
    }
  },

  backToDashboard(updateHash = true) {
    if (updateHash) {
      if (this.activeCategory === "fav") {
        window.location.hash = "favorites";
      } else if (this.activeCategory === "subcategory-filter") {
        window.location.hash = "category/" + this.activeSubcategory;
      } else {
        window.location.hash = "dashboard";
      }
      return;
    }

    this._guideArrowCleanup?.();
    this.playSynthSound('click');

    const viewport = document.getElementById("active-tool-viewport");
    if (viewport) {
      viewport.style.display = "none";
      viewport.innerHTML = "";
    }

    const dashboard = document.getElementById("dashboard-view");
    if (dashboard) dashboard.style.display = "block";

    this.activeTool = null;
    this.syncSidebarUI();

    const titleEl = document.getElementById("header-view-title");
    if (titleEl) {
      titleEl.style.display = "none";
      if (this.activeCategory === "all") {
        titleEl.innerText = "Dashboard";
      } else if (this.activeCategory === "fav") {
        titleEl.innerText = "Favorites";
      } else {
        titleEl.innerText = this.getSubcategoryLabel(this.activeSubcategory);
      }
    }

    const searchBar = document.getElementById("tool-search");
    if (searchBar && searchBar.value) {
      this.filterDashboard(searchBar.value);
    }
  },

  showToast(message, type = "success", onClick = null) {
    const container = document.getElementById("toast-container");
    if (!container) return;

    // Play feedback audio chimes
    if (type === "success") {
      this.playSynthSound("success");
    } else if (type === "error" || type === "warn") {
      this.playSynthSound("error");
    } else if (type === "info") {
      this.playSynthSound("click");
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    if (onClick) {
      toast.style.cursor = "pointer";
      toast.addEventListener("click", (e) => {
        onClick(e);
        toast.remove();
      });
    }

    let icon = "";
    if (type === "success") {
      icon = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="9 11 11 13 15 9"></polyline></svg>`;
    } else if (type === "error") {
      icon = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
    } else if (type === "info") {
      icon = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    } else if (type === "warn") {
      icon = `<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    }

    const textSpan = onClick ? `<span style="text-decoration: underline; font-weight: 700;">${message}</span>` : `<span>${message}</span>`;

    toast.innerHTML = `${icon} ${textSpan}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px) scale(0.95)";
      setTimeout(() => {
        toast.remove();
      }, 200);
    }, onClick ? 5500 : 2800);
  },

  copyText(text) {
    if (!text || text.trim() === "") {
      this.showToast("Nothing to copy!", "error");
      return;
    }

    const fallbackCopy = () => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        this.showToast("Copied to clipboard!", "success");
      } catch (err) {
        this.showToast("Failed to copy", "error");
      }
      document.body.removeChild(textarea);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => this.showToast("Copied to clipboard!", "success"),
        fallbackCopy
      ).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  },

  clearAppCache() {
    if (confirm("Are you sure you want to clear the site cache, local databases, and reset all settings? This will resolve any browser lagging or out-of-memory problems and reload the page.")) {
      this.playSynthSound('click');
      this.showToast("Clearing local storage & session state...", "info");

      // 1. Clear LocalStorage and SessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // 2. Clear all IndexedDB databases
      if (window.indexedDB && window.indexedDB.databases) {
        window.indexedDB.databases().then(dbs => {
          dbs.forEach(db => {
            try {
              window.indexedDB.deleteDatabase(db.name);
            } catch (e) {
              console.error(`Failed to delete database: ${db.name}`, e);
            }
          });
        }).catch(err => console.error("Error listing databases:", err));
      }

      // 3. Clear Service Worker Cache Storage
      if (window.caches) {
        caches.keys().then(keys => {
          keys.forEach(key => {
            caches.delete(key);
          });
        }).catch(err => console.error("Error clearing caches:", err));
      }

      // 4. Unregister Service Workers
      if (navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          registrations.forEach(r => r.unregister());
        }).catch(err => console.error("Error unregistering service workers:", err));
      }

      this.showToast("Cache cleared! Reloading application...", "success");

      // 5. Reload after a short delay so the toast/feedback can be seen/heard
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }
  }
};

// Start application
window.addEventListener("DOMContentLoaded", () => {
  app.init();
});
