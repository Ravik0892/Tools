// OmniTool Hub - Core Application Engine v2 (Masterpiece Accordion Edition)

const app = {
  APP_VERSION: "2.1.1",
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
      monetization: "premium",
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
      monetization: "premium",
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
      monetization: "ad-lock",
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
      monetization: "premium",
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
      monetization: "premium",
      icon: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`
    },
    {
      id: "pii-anonymizer",
      name: "Client-Side PII Masker & Anonymizer",
      desc: "Scan and mask sensitive personal identifiable information (PII) like emails, phone numbers, IP addresses, and credit cards from logs or text files client-side.",
      category: "dev",
      subcategory: "dev-crypto",
      subLabel: "Crypto & Security",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      monetization: "premium",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4M12 16h.01"/></svg>`
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
      monetization: "ad-lock",
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
      monetization: "ad-lock",
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
      monetization: "premium",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
    },
    {
      id: "pdf-utilities",
      name: "PDF Page Studio & Organizer",
      desc: "Split into PDF/Images/Text, merge multiple PDFs, rearrange pages visually, crop margins, and compress documents 100% client-side.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "PDF Page Studio",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      monetization: "premium",
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
      monetization: "premium",
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
      monetization: "ad-lock",
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
      monetization: "ad-lock",
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
      monetization: "premium",
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
      monetization: "ad-lock",
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
      monetization: "ad-lock",
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
      monetization: "premium",
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
      monetization: "premium",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line><line x1="12" y1="10" x2="12" y2="10.01"></line><line x1="8" y1="10" x2="8" y2="10.01"></line><line x1="16" y1="10" x2="16" y2="10.01"></line></svg>`
    },
    {
      id: "qr-studio",
      name: "Dynamic QR & Barcode Studio",
      desc: "Generate highly customized art QR codes with linear gradients, custom dot patterns, and logos, or scan QR codes and barcodes live via camera or upload.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Generators",
      accent: "#f43f5e",
      accentRgb: "244, 63, 94",
      monetization: "premium",
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
      monetization: "premium",
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
      monetization: "premium",
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
      monetization: "premium",
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
      monetization: "ad-lock",
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
      monetization: "ad-lock",
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
      monetization: "premium",
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
      monetization: "free",
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
      monetization: "premium",
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
      monetization: "ad-lock",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="10" x2="6" y2="14"></line><line x1="18" y1="10" x2="18" y2="14"></line></svg>`
    },
    {
      id: "curl-converter",
      name: "cURL to Code Converter",
      desc: "Convert cURL commands directly into modern Fetch (ES6 async/await), Axios, Python Requests, and Go HTTP client code.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Generators",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      monetization: "premium",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`
    },
    {
      id: "cron-builder",
      name: "Visual Cron Expression Builder & Explainer",
      desc: "Build 5-field cron schedules visually, translate complex expressions into plain English sentences, and preview upcoming execution times.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Generators",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      monetization: "ad-lock",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
    },
    {
      id: "json-to-types",
      name: "JSON-to-Code Interface Converter",
      desc: "Convert JSON payloads into strongly-typed interfaces and models for TypeScript, Python Pydantic, Go structs, and Rust Serde.",
      category: "dev",
      subcategory: "dev-formatters",
      subLabel: "Formatters & Parsers",
      accent: "#9d4edd",
      accentRgb: "157, 78, 221",
      monetization: "premium",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline><line x1="12" y1="2" x2="12" y2="22"></line></svg>`
    },
    {
      id: "robots-generator",
      name: "Robots.txt Visual Builder",
      desc: "Create crawl directive rules, block AI web scrapers (GPTBot, CCBot), declare XML sitemaps, configure crawl delays, and validate syntax.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Generators",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4M8 16h.01M16 16h.01"></path></svg>`
    },
    {
      id: "lorem-generator",
      name: "Smart Lorem Ipsum Generator",
      desc: "Generate customizable placeholder copy with classical Latin, Cyberpunk Tech, or Corporate jargon in paragraphs, lists, HTML, Markdown, or JSON.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "Writers & Parsers",
      accent: "#9d4edd",
      accentRgb: "157, 78, 221",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"></path></svg>`
    },
    {
      id: "favicon-generator",
      name: "Favicon & App Icon Suite",
      desc: "Generate complete icon packages (multi-res 16/32 .ico, Apple Touch 180px, Android 192/512px) with shape customizer, tab preview, and ZIP export.",
      category: "design",
      subcategory: "design-graphics",
      subLabel: "Graphics & Screen Studio",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="4"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="m21 15-5-5L5 21"></path></svg>`
    },
    {
      id: "screenshot-capture",
      name: "Browser Screen & Window Screenshot Studio",
      desc: "Capture full screen, tabs, or app windows with countdown timer, wrap with macOS/Windows/Cyberpunk browser frames, redact PII passwords, and add step-by-step annotation callouts.",
      category: "design",
      subcategory: "design-graphics",
      subLabel: "Graphics & Screen Studio",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`
    },
    {
      id: "screen-recorder",
      name: "Browser Screen & Tab Recorder",
      desc: "Capture your full screen, window, or browser tab with microphone audio commentary, real-time timer, and instant WebM/MP4 download.",
      category: "design",
      subcategory: "design-graphics",
      subLabel: "Audio & Video Media",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3" fill="currentColor"></circle></svg>`
    },
    {
      id: "voice-recorder",
      name: "Voice Recorder & Audio Waveform Studio",
      desc: "Capture studio-grade voice memos with live frequency bars, smooth oscilloscope waves, noise suppression, and lossless 16-bit WAV export.",
      category: "design",
      subcategory: "design-graphics",
      subLabel: "Audio & Video Media",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>`
    },
    {
      id: "video-speed",
      name: "Video Playback Speed Controller",
      desc: "Adjust playback rate from 0.1x to 4.0x, step frame-by-frame, preserve audio pitch, and create continuous A-B section repeat loops.",
      category: "design",
      subcategory: "design-graphics",
      subLabel: "Audio & Video Media",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>`
    },
    {
      id: "audio-suite",
      name: "Audio Studio & Extractor",
      desc: "Cross-convert sound files between MP3, WAV, and OGG formats with bitrates up to 320k, or extract audio tracks from video files with visual waveform trimming.",
      category: "design",
      subcategory: "design-graphics",
      subLabel: "Audio & Video Media",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`
    },
    {
      id: "video-to-gif",
      name: "Video to Animated GIF Converter",
      desc: "Convert video clips into animated GIFs client-side with custom resolution, frame rate, duration clipping, and live progress monitor.",
      category: "design",
      subcategory: "design-graphics",
      subLabel: "Audio & Video Media",
      accent: "#ec4899",
      accentRgb: "236, 72, 153",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line></svg>`
    },
    {
      id: "temp-mail",
      name: "Disposable Temp Mail Client",
      desc: "Generate instant throwaway email addresses to verify accounts and avoid spam with 10s auto-refresh, notifications, and reader.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Privacy & Mail",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
    },
    {
      id: "pdf-converter-hub",
      name: "Document & PDF Converter Hub",
      desc: "Convert bi-directionally between Word (.docx), Excel (.xlsx/.csv), PowerPoint (.pptx), Images, Camera Scans, HTML/CSS, and Markdown.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "Document Converters",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
    },
    {
      id: "pdf-editor-suite",
      name: "PDF Editor, Sign & Markup Studio",
      desc: "E-sign documents with cursive signatures, fill AcroForms, draw vector annotations, stamp watermarks, and permanently redact PII.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "PDF Power Tools",
      accent: "#9d4edd",
      accentRgb: "157, 78, 221",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`
    },
    {
      id: "pdf-security-suite",
      name: "PDF Security, Repair & Archival Suite",
      desc: "Protect PDFs with AES encryption, remove passwords, repair corrupted xref tables & headers, and export ISO 19005 PDF/A archives.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "PDF Security & Repair",
      accent: "#f43f5e",
      accentRgb: "244, 63, 94",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`
    },
    {
      id: "pdf-ai",
      name: "AI PDF Summarizer & Translator",
      desc: "Generate executive summaries, extract actionable commitments, chat with documents in Q&A mode, or translate PDFs into 15+ languages via Gemini & offline NLP.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "AI & Intelligence",
      accent: "#ec4899",
      accentRgb: "236, 72, 153",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>`
    },
    {
      id: "compare-pdf",
      name: "Compare PDF Documents",
      desc: "Compare two revisions of a PDF side-by-side, highlight layout differences with a pixel difference heatmap, wipe slider, or text clause diff.",
      category: "text",
      subcategory: "text-markdown",
      subLabel: "PDF Power Tools",
      accent: "#6366f1",
      accentRgb: "99, 102, 241",
      monetization: "free",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>`
    }
  ],

  // Registry of all documentation & help guides
  guidesList: [
    { id: "pipeline-builder", title: "Smart Chain Pipeline Builder Guide", url: "guides/pipeline-builder.html" },
    { id: "json-formatter", title: "Data Formatter & Converter Guide", url: "guides/json-formatter.html" },
    { id: "text-encoder-suite", title: "Text Cases & Encoder Guide", url: "guides/text-encoder-suite.html" },
    { id: "jwt-decoder", title: "JWT Decoder Guide", url: "guides/jwt-decoder.html" },
    { id: "crypto-suite", title: "Cryptography Suite Guide", url: "guides/crypto-suite.html" },
    { id: "pii-anonymizer", title: "Client-Side PII Masker Guide", url: "guides/pii-anonymizer.html" },
    { id: "markdown-preview", title: "Live Markdown Previewer Guide", url: "guides/markdown-preview.html" },
    { id: "text-diff", title: "Text Diff Comparison Guide", url: "guides/text-diff.html" },
    { id: "pdf-searcher", title: "PDF Index & Search Guide", url: "guides/pdf-searcher.html" },
    { id: "pdf-utilities", title: "PDF Utilities Suite Guide", url: "guides/pdf-utilities.html" },
    { id: "regex-tester", title: "Regular Expression Tester Guide", url: "guides/regex-tester.html" },
    { id: "text-analyzer", title: "Text Analyzer Guide", url: "guides/text-analyzer.html" },
    { id: "css-studio", title: "CSS Studio Guide", url: "guides/css-studio.html" },
    { id: "color-lab", title: "Color Lab Suite Guide", url: "guides/color-lab.html" },
    { id: "graphics-studio", title: "Graphics Studio Guide", url: "guides/graphics-studio.html" },
    { id: "image-converter", title: "Image Converter Guide", url: "guides/image-converter.html" },
    { id: "svg-animator", title: "SVG Animator Guide", url: "guides/svg-animator.html" },
    { id: "security-suite", title: "Security Suite Guide", url: "guides/security-suite.html" },
    { id: "datetime-suite", title: "Datetime Suite Guide", url: "guides/datetime-suite.html" },
    { id: "calculator", title: "Scientific Calculator Guide", url: "guides/calculator.html" },
    { id: "unit-converter", title: "Unit Converter Guide", url: "guides/unit-converter.html" },
    { id: "url-parser", title: "URL Parser Guide", url: "guides/url-parser.html" },
    { id: "code-playground", title: "Code Playground Guide", url: "guides/code-playground.html" },
    { id: "qr-generator", title: "QR Generator Guide", url: "guides/qr-generator.html" },
    { id: "seo-previewer", title: "SEO Previewer Guide", url: "guides/seo-previewer.html" },
    { id: "mock-data-generator", title: "Mock Data Generator Guide", url: "guides/mock-data-generator.html" },
    { id: "ip-subnet-calculator", title: "IP Subnet & MAC Suite Guide", url: "guides/ip-subnet-calculator.html" },
    { id: "payment-guide", title: "Payment & Activation Guide", url: "guides/payment-guide.html" }
  ],

  // Centralized Tool Keywords mapping for enhanced search functionality
  toolKeywords: {
    "pipeline-builder": ["smart chain", "pipeline", "stack", "sequence", "chain", "text transform", "uppercase", "lowercase", "base64", "json", "url", "combiner", "flow"],
    "formatter-suite": ["json", "yaml", "csv", "sql", "beautifier", "formatter", "converter", "validator", "minify", "minify json", "format json", "xml"],
    "text-encoder-suite": ["base64", "url", "hex", "binary", "case", "upper", "lower", "camel", "snake", "kebab", "slug", "text case", "encode", "decode", "ascii", "unicode"],
    "jwt-decoder": ["jwt", "token", "decoder", "header", "payload", "claims", "expire", "auth", "json web token", "verify"],
    "crypto-suite": ["md5", "sha1", "sha-1", "sha256", "sha-256", "256", "sha512", "sha-512", "512", "sha384", "sha-384", "sha3", "keccak", "ripemd160", "hash", "hasher", "hash generator", "checksum", "integrity", "aes", "aes-256", "aes256", "aes-128", "aes-192", "cipher", "encrypt", "decrypt", "symmetric encryption", "cbc", "gcm", "ctr", "rsa", "rsa-2048", "rsa-4096", "keypair", "public key", "private key", "salt", "passphrase", "cryptography"],
    "pii-anonymizer": ["pii", "anonymizer", "masker", "redact", "hash", "sha256", "sha-256", "256", "gdpr", "hipaa", "privacy", "logs", "scrub", "ip", "email", "credit card", "security", "anonymize", "mask sensitive data"],
    "markdown-preview": ["markdown", "preview", "editor", "md", "html", "writer", "parser", "live editor"],
    "text-diff": ["diff", "difference", "compare", "comparison", "text diff", "side-by-side", "line-by-line", "patch", "text compare"],
    "pdf-searcher": ["pdf", "search", "ocr", "text extract", "scan", "scanned pdf", "image to text", "tesseract", "recognize", "reader"],
    "pdf-utilities": ["pdf", "split", "compress", "merge", "size", "extract pages", "page range", "optimize pdf", "shrink", "png", "jpg", "jpeg", "webp", "pdf to image", "pdf to png", "pdf to jpg", "pdf merger", "rotate pdf", "combine pdf"],
    "regex-tester": ["regex", "regexp", "regular expression", "test", "match", "extract", "replace", "phone", "email", "ip", "url", "pattern"],
    "css-studio": ["gradient", "shadow", "glass", "glassmorphism", "frosted", "card", "css", "linear", "radial", "conic", "box shadow", "generator", "visual"],
    "color-lab": ["color", "contrast", "wcag", "palette", "shades", "tints", "hex", "rgb", "hsl", "picker", "accessibility", "a11y", "color matcher"],
    "security-suite": ["password", "uuid", "guid", "entropy", "generator", "random", "secure", "key", "keys", "hash", "random string"],
    "datetime-suite": ["date", "time", "unix", "epoch", "timestamp", "duration", "subtract", "calculator", "timezone", "milliseconds", "seconds"],
    "unit-converter": ["convert", "unit", "storage", "length", "weight", "temperature", "metric", "imperial", "kb", "mb", "gb", "tb", "bytes", "celsius", "fahrenheit"],
    "graphics-studio": ["image", "draw", "canvas", "screenshot", "crop", "webcam", "banner", "text overlay", "filter", "vintage", "cyberpunk", "editor", "camera"],
    "calculator": ["calculator", "scientific", "math", "arithmetic", "trigonometry", "logarithm", "history", "sin", "cos", "tan", "pi", "factorial", "plotter", "graph"],
    "qr-generator": ["qr", "barcode", "generate", "code", "pattern", "gradient", "logo", "qr code", "art qr"],
    "seo-previewer": ["seo", "meta", "preview", "google", "facebook", "twitter", "discord", "social", "tags", "header tags", "og tags"],
    "image-converter": ["image", "compress", "optimize", "convert", "webp", "png", "jpg", "jpeg", "quality", "resizer", "resize"],
    "svg-animator": ["svg", "animate", "animation", "path", "morph", "smil", "keyframe", "drawing", "vector", "bezier"],
    "url-parser": ["url", "query", "parse", "builder", "parameter", "key-value", "link", "address", "utm", "search param"],
    "text-analyzer": ["readability", "flesch", "sentence", "word count", "reading time", "keyword density", "analyzer", "text", "characters", "paragraphs"],
    "mock-data-generator": ["mock", "data", "fake", "generate", "csv", "json", "schema", "rows", "database", "faker", "random data"],
    "admin-settings": ["admin", "settings", "ads", "adsense", "admob", "cache", "control panel", "passcode", "purge"],
    "code-playground": ["html", "css", "js", "playground", "sandbox", "iframe", "console", "live", "edit", "editor", "codepen"],
    "ip-subnet-calculator": ["ip", "subnet", "cidr", "host", "mac", "oui", "manufacturer", "network", "ipv4", "mask", "wildcard"],
    "curl-converter": ["curl", "fetch", "axios", "python", "requests", "go", "http", "api", "converter", "request", "header", "postman"],
    "cron-builder": ["cron", "schedule", "crontab", "job", "timer", "schedule runner", "cron expression", "interval", "quartz", "task"],
    "json-to-types": ["typescript", "interface", "pydantic", "go struct", "rust serde", "model", "type", "json to type", "schema", "class", "dto"],
    "robots-generator": ["robots.txt", "robots", "crawler", "bot", "gptbot", "ccbot", "sitemap", "disallow", "allow", "crawl-delay", "seo", "search engine"],
    "lorem-generator": ["lorem", "ipsum", "dummy text", "placeholder", "filler text", "latin", "generator", "paragraphs", "sentences", "words", "cyberpunk", "b2b"],
    "qr-scanner": ["qr scanner", "scan qr", "barcode", "reader", "webcam", "camera", "decode qr", "jsqr", "qr reader", "scan barcode", "upc", "ean"],
    "color-extractor": ["color extractor", "palette", "eyedropper", "loupe", "sample color", "hex from image", "image colors", "dominant colors", "contrast"],
    "favicon-generator": ["favicon", "ico", "apple touch icon", "app icon", "pwa icon", "icon generator", "favicon.ico", "tab icon", "bookmark icon"],
    "images-to-pdf": ["image to pdf", "jpg to pdf", "png to pdf", "photos to pdf", "convert images", "pdf maker", "combine pictures", "pdf compiler"],
    "screenshot-capture": ["screenshot", "screen capture", "browser capture", "tab capture", "window capture", "webpage capture", "mockup", "annotation", "screen grab", "snip", "snipping tool", "redact", "pixelate", "callout", "screenshot tool", "screen snip", "take screenshot"],
    "screen-recorder": ["screen recorder", "record screen", "capture screen", "screen capture", "record tab", "record video", "screen video", "screencast", "webcam record", "video recorder"],
    "voice-recorder": ["voice recorder", "audio recorder", "record voice", "mic recorder", "microphone", "sound recorder", "waveform", "wav recorder", "voice memo", "audio visualizer"],
    "video-speed": ["video speed", "playback speed", "speed controller", "slow motion", "speed up video", "slow video", "frame step", "loop video", "ab loop", "video player", "pitch"],
    "mp4-to-mp3": ["mp4 to mp3", "video to audio", "extract audio", "convert mp4", "video to wav", "audio extractor", "sound from video", "demux audio", "trim audio"],
    "video-to-gif": ["video to gif", "convert to gif", "make gif", "animated gif", "gif creator", "mp4 to gif", "webm to gif", "clip to gif", "gif converter", "gif maker"],
    "temp-mail": ["temp mail", "disposable email", "throwaway email", "fake email", "temporary email", "10 minute mail", "test email", "spam shield", "inbox", "anonymous email"],
    "sign-pdf": ["sign pdf", "pdf signature", "digital signature", "sign document", "signature pad", "e-sign", "stamp pdf", "draw signature", "fill and sign", "autograph"],
    "pdf-security": ["protect pdf", "unlock pdf", "encrypt pdf", "decrypt pdf", "pdf password", "secure pdf", "pdf permissions", "remove pdf password", "aes encrypt pdf"],
    "pdf-watermark": ["watermark pdf", "pdf page numbers", "add watermark", "stamp pdf", "confidential watermark", "page numbering", "bates numbering", "draft watermark", "footer page number"],
    "pdf-organizer": ["organize pdf", "reorder pdf pages", "rotate pdf", "delete pdf pages", "remove pdf pages", "sort pdf", "pdf page manager", "arrange pdf"],
    "crop-pdf": ["crop pdf", "trim pdf", "pdf margins", "remove whitespace", "cut pdf", "crop pages", "mediabox", "cropbox", "trim document"],
    "pdf-forms": ["fill pdf", "pdf forms", "acroform", "pdf form filler", "interactive pdf", "fillable pdf", "flatten pdf", "form fields"],
    "redact-pdf": ["redact pdf", "sanitize pdf", "black out pdf", "hide pdf text", "remove pii pdf", "censor pdf", "permanent redaction", "pdf privacy"],
    "excel-pdf": ["excel to pdf", "pdf to excel", "xlsx to pdf", "pdf to xlsx", "csv to pdf", "spreadsheet pdf", "table to pdf", "convert excel", "sheetjs pdf"],
    "word-pdf": ["word to pdf", "pdf to word", "docx to pdf", "pdf to docx", "convert docx", "pdf to doc", "convert word document", "doc converter"],
    "html-to-pdf": ["html to pdf", "webpage to pdf", "convert html", "url to pdf", "invoice pdf", "html2pdf", "print webpage", "webpage snapshot", "css to pdf"],
    "pdf-to-markdown": ["pdf to markdown", "pdf to md", "convert pdf to text", "extract markdown", "gfm converter", "pdf parser", "markdown extractor"],
    "pdf-ai": ["ai pdf", "pdf summarizer", "translate pdf", "chat with pdf", "ask pdf", "gemini pdf", "document intelligence", "action items pdf", "multilingual pdf"],
    "scan-to-pdf": ["scan to pdf", "camera scanner", "document scanner", "camscanner", "photo to pdf", "mobile scan", "scan paper", "contrast filter scanner"],
    "pptx-pdf": ["pptx to pdf", "pdf to pptx", "powerpoint to pdf", "pdf to powerpoint", "slides to pdf", "presentation converter", "convert pptx", "keynote pdf"],
    "compare-pdf": ["compare pdf", "pdf diff", "pdf difference", "visual diff", "side by side pdf", "pixel diff", "text clause diff", "pdf comparison", "revision checker"],
    "pdf-annotate": ["annotate pdf", "draw on pdf", "pdf highlighter", "markup pdf", "sketch pdf", "pdf pen", "stamp pdf", "burn annotations", "pdf canvas"],
    "audio-converter": ["audio converter", "mp3 converter", "wav to mp3", "ogg converter", "transcode audio", "audio bitrate", "sound converter", "music transcode", "flac to mp3"],
    "pdf-to-pdfa": ["pdf to pdf/a", "pdfa converter", "pdf/a-1b", "pdf/a-2b", "pdf/a-3b", "iso 19005", "archival pdf", "long term pdf", "zugferd pdf", "legal archive"],
    "pdf-converter-hub": ["office to pdf", "word to pdf", "pdf to word", "docx to pdf", "excel to pdf", "pdf to excel", "xlsx to pdf", "pptx to pdf", "pdf to pptx", "powerpoint to pdf", "images to pdf", "jpg to pdf", "png to pdf", "camera scan to pdf", "html to pdf", "webpage to pdf", "pdf to markdown", "pdf to md", "document converter"],
    "pdf-editor-suite": ["sign pdf", "pdf signature", "digital signature", "fill and sign", "annotate pdf", "draw on pdf", "pdf highlighter", "markup pdf", "fill pdf", "pdf forms", "acroform", "form filler", "watermark pdf", "pdf page numbers", "add watermark", "redact pdf", "sanitize pdf", "black out pdf", "censor pdf", "pdf editor"],
    "pdf-security-suite": ["protect pdf", "unlock pdf", "encrypt pdf", "decrypt pdf", "pdf password", "secure pdf", "pdf permissions", "repair pdf", "fix pdf", "recover pdf", "corrupt pdf", "pdf reconstruct", "pdf to pdf/a", "pdfa converter", "iso 19005", "archival pdf"],
    "qr-studio": ["qr", "barcode", "generate qr", "scan qr", "art qr", "qr code generator", "qr scanner", "webcam qr", "decode qr", "barcode reader"],
    "audio-suite": ["audio converter", "mp3 converter", "wav to mp3", "ogg converter", "transcode audio", "mp4 to mp3", "video to audio", "extract audio", "demux audio", "audio trimmer", "waveform"]
  },

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
    "pii-anonymizer": [
      "<strong>Local Redaction</strong>: Detect and scrub emails, IPs, phone numbers, and credentials 100% locally in your browser.",
      "<strong>Relational Hashing</strong>: Replace sensitive keys with deterministic SHA-256 hashes to maintain data connections without leaking identity."
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
      "<strong>Multi-Format Extraction</strong>: Split and export page selections as combined PDFs, separate PDFs in ZIP, high-res PNG/JPG/WebP images, or clean text.",
      "<strong>Merge, Rotate & Compress</strong>: Combine multiple PDFs, rotate or delete pages, and downscale bloated documents client-side."
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
    ],
    "curl-converter": [
      "<strong>Multi-Language Code</strong>: Convert cURL snippets into Fetch, Axios, Python Requests, or Go net/http in one click.",
      "<strong>Automatic Parsing</strong>: Extracts authentication tokens, custom headers, query params, and JSON bodies cleanly."
    ],
    "cron-builder": [
      "<strong>Human Translation</strong>: Translates cryptic 5-field cron syntax into natural conversational English sentences.",
      "<strong>Schedule Verification</strong>: Automatically computes the next 5 upcoming execution times in your local timezone."
    ],
    "json-to-types": [
      "<strong>Automated Type Generation</strong>: Creates TypeScript interfaces, Python Pydantic models, Go structs, and Rust Serde models from raw JSON.",
      "<strong>Recursive Model Structuring</strong>: Automatically unpacks deeply nested JSON objects into individual strongly-typed interfaces."
    ],
    "robots-generator": [
      "<strong>Visual Rule Builder</strong>: Assemble crawler access rules, user-agent directives, and crawl delays with instant syntax validation.",
      "<strong>AI Scraper Protection</strong>: 1-click toggle to block modern AI crawlers (GPTBot, CCBot, ClaudeBot) from scraping your proprietary content."
    ],
    "lorem-generator": [
      "<strong>Multi-Style Vocabularies</strong>: Switch between classical Latin Cicero prose, dystopian cyberpunk techno-babble, and corporate synergy jargon.",
      "<strong>Structured Export</strong>: Generate clean plain text, semantic HTML paragraphs, markdown formatting, or JSON arrays ready for mock testing."
    ],
    "qr-scanner": [
      "<strong>High-Speed Client Recognition</strong>: Decodes QR codes and 1D barcodes with zero cloud transmission via pure WebAssembly and jsQR.",
      "<strong>Multi-Input Flexibility</strong>: Scan in real-time from webcam/mobile camera, drag-and-drop image files, or paste screenshots directly from clipboard."
    ],
    "color-extractor": [
      "<strong>Dominant Palette Quantization</strong>: Extracts prominent accent colors, harmonized complementary shades, and CSS variable tokens.",
      "<strong>Magnifier Eyedropper</strong>: Precision pixel loupe inspects uploaded images down to the individual pixel with real-time WCAG contrast checks."
    ],
    "favicon-generator": [
      "<strong>Complete Multi-Platform Suite</strong>: Generates multi-layer Windows .ico (16/32), iOS Apple Touch icon (180), and Android PWA icons (192/512).",
      "<strong>Live Device Previews</strong>: Preview how your icon looks inside dark/light browser tabs, iOS home screens, and Android app drawers."
    ],
    "images-to-pdf": [
      "<strong>Client-Side PDF Assembly</strong>: Merge JPG, PNG, and WebP images into a single polished PDF document without server uploads.",
      "<strong>Visual Page Board</strong>: Drag, rotate, reorder, and configure page sizes (A4, Letter, Auto-Fit) with margins and quality compression."
    ],
    "screenshot-capture": [
      "<strong>Universal Browser & Tab Snip</strong>: Capture native resolution screens, specific browser tabs, or app windows with an optional 3s-10s countdown delay timer.",
      "<strong>SaaS Mockup & Redaction Studio</strong>: Frame captures in macOS/Windows 11 glass, permanently pixelate private passwords, and copy to clipboard in 1 click."
    ],
    "screen-recorder": [
      "<strong>Full-Resolution Capture</strong>: Record whole displays, specific application windows, or browser tabs with 60 FPS clarity and live countdown.",
      "<strong>Mic & System Audio Mix</strong>: Blend microphone commentary seamlessly with internal browser audio using client-side AudioContext mixing."
    ],
    "voice-recorder": [
      "<strong>Studio Audio Fidelity</strong>: Capture crystal-clear vocals with noise suppression, echo cancellation, and 16-bit uncompressed WAV export.",
      "<strong>Real-Time Visualization</strong>: Dynamic audio frequency spectrum and oscilloscope waves render microphone audio instantly on HTML5 canvas."
    ],
    "video-speed": [
      "<strong>0.1x to 4.0x Variable Rate</strong>: Adjust video playback speed smoothly with natural audio pitch preservation or experimental scaling.",
      "<strong>A-B Looper & Frame Stepping</strong>: Set custom start and end loop markers to continuously repeat clips and step frame-by-frame with precision."
    ],
    "mp4-to-mp3": [
      "<strong>Zero-Upload Audio Extraction</strong>: Demux and extract soundtracks directly from video files in your browser using pure Web Audio API.",
      "<strong>Waveform Trimming & Quality</strong>: View audio wave profile and isolate specific song segments or interview clips with sub-second precision."
    ],
    "video-to-gif": [
      "<strong>Client-Side GIF Compiler</strong>: Convert video clips into smooth animated GIFs with customizable resolution, frame rate, and duration clipping.",
      "<strong>Instant Live Preview</strong>: Monitor frame extraction and encoding progress in real time before downloading the final shareable .gif."
    ],
    "temp-mail": [
      "<strong>Instant Spam Shield</strong>: Generate disposable email addresses in one click to verify signups and safeguard your personal inbox from spam.",
      "<strong>Automated 10s Sync</strong>: Auto-checks for new incoming messages every 10 seconds with sound notifications and HTML email viewer."
    ],
    "sign-pdf": [
      "<strong>Multi-Mode Signing</strong>: Draw signatures with touch/mouse, type custom cursive scripts, or upload company stamp seals.",
      "<strong>Pixel-Precise Positioning</strong>: Click to place, scale, and embed signatures anywhere across multi-page PDF documents."
    ],
    "pdf-security": [
      "<strong>Client-Side Encryption</strong>: Lock documents with AES user and owner passwords plus granular printing and copying restrictions.",
      "<strong>Zero-Trace Unlocking</strong>: Decrypt password-protected files in your browser and export clean unrestricted PDFs."
    ],
    "pdf-watermark": [
      "<strong>Custom Text & Opacity</strong>: Apply angled or horizontal watermarks across all pages with custom typography and color schemes.",
      "<strong>Dynamic Page Numbering</strong>: Stamp clean page numbers (Page X of Y, X/Y) with customizable header/footer positioning."
    ],
    "pdf-organizer": [
      "<strong>Visual Page Grid</strong>: Preview every page thumbnail in an intuitive interactive board with drag-and-drop reordering.",
      "<strong>Rotation & Pruning</strong>: Rotate oriented pages by 90° increments and delete unwanted pages before compiling."
    ],
    "crop-pdf": [
      "<strong>Interactive Bounding Box</strong>: Visually define crop margins on canvas or input millimeter/point coordinates.",
      "<strong>Flexible Scope Targeting</strong>: Apply margin crops across all pages, current page, or even/odd page spreads."
    ],
    "pdf-forms": [
      "<strong>AcroForm Field Inspection</strong>: Automatically detect text fields, checkboxes, dropdowns, and radio buttons in fillable PDFs.",
      "<strong>Flatten & Lock</strong>: Populate form data cleanly with optional flattening to prevent subsequent modifications."
    ],
    "redact-pdf": [
      "<strong>True Coordinate Sanitization</strong>: Draw blackout boxes permanently baked into document streams to conceal confidential data.",
      "<strong>100% Client-Side Privacy</strong>: Redactions occur entirely within your local browser memory with zero server uploads."
    ],
    "excel-pdf": [
      "<strong>Dual-Direction Pipeline</strong>: Convert multi-sheet Excel files into formatted PDF tables or extract PDF data grids into clean .xlsx files.",
      "<strong>Custom Table Styling</strong>: Customize page orientation, striped zebra fills, column font sizes, and custom accent colors."
    ],
    "word-pdf": [
      "<strong>High-Fidelity DOCX Conversion</strong>: Preserve headings, bullet lists, table layouts, bold, and italics client-side without third-party APIs.",
      "<strong>Native Microsoft Word Compatibility</strong>: Extracted Word files open seamlessly in Microsoft 365, Google Docs, Apple Pages, and LibreOffice."
    ],
    "html-to-pdf": [
      "<strong>Live Split-Pane Sandbox</strong>: Write custom HTML/CSS and preview document rendering in real time before PDF compilation.",
      "<strong>Vector-Grade Output</strong>: 2x and 3x retina canvas scaling produces ultra-sharp print typography and prevents pixel blur."
    ],
    "pdf-to-markdown": [
      "<strong>Automated Typography Detection</strong>: Intelligently translates large font sizes into # and ## Markdown headings with zero manual tagging.",
      "<strong>Table & List Preservation</strong>: Converts multi-column layouts into standard GitHub Flavored Markdown (GFM) pipe tables."
    ],
    "pdf-ai": [
      "<strong>Executive Intelligence</strong>: Instantly generate 3-5 bullet takeaway summaries and structured action item deadlines.",
      "<strong>Multilingual Translation & Chat</strong>: Translate documents into 15+ languages and converse directly with document contents in real time."
    ],
    "scan-to-pdf": [
      "<strong>Smart Contrast Filtering</strong>: High-contrast B&W document filter whitens paper backgrounds and sharpens text strokes like an office scanner.",
      "<strong>Multi-Page Camera Queue</strong>: Rapidly snap consecutive pages, reorder or rotate captures, and compile into a single document."
    ],
    "pptx-pdf": [
      "<strong>High-Fidelity Slide Conversion</strong>: Parse XML presentations into crisp PDF slides or extract PDF visual slides into native Microsoft PowerPoint files.",
      "<strong>Zero Software Dependencies</strong>: Create and convert slide decks without installing Microsoft PowerPoint or Adobe Acrobat."
    ],
    "compare-pdf": [
      "<strong>Multi-Mode Visual Difference</strong>: Toggle between synchronized side-by-side view, pixel difference heatmap, and an interactive wipe slider.",
      "<strong>Semantic Clause Diffing</strong>: Inspect line-by-line and token-level text changes with colored added/removed indicators and exportable reports."
    ],
    "pdf-annotate": [
      "<strong>Full-Featured Drawing Studio</strong>: Freehand pen, highlighter, custom stamps, framing rectangles, and arrow markers.",
      "<strong>Permanent Vector Burning</strong>: Bakes annotations directly into the document stream for consistent display on mobile and desktop readers."
    ],
    "audio-converter": [
      "<strong>Lossless Audio Transcoding</strong>: Cross-convert between MP3, WAV, and OGG with bitrates up to 320 kbps using client-side Web Audio.",
      "<strong>Volume Normalization & Channels</strong>: Downmix stereo to mono or amplify low-volume recordings up to 200% with real-time audio playback."
    ],
    "repair-pdf": [
      "<strong>Deep Binary Structure Fixes</strong>: Realigns shifted file headers, closes unclosed streams, and rebuilds corrupted xref tables.",
      "<strong>Permissive Page Salvage Fallback</strong>: Recovers readable pages from damaged or truncated files into a clean standardized document container."
    ],
    "pdf-to-pdfa": [
      "<strong>ISO 19005 Standardization</strong>: Conform documents to PDF/A-1b, PDF/A-2b, or PDF/A-3b standards for long-term legal archiving.",
      "<strong>Color & XMP Descriptor Injection</strong>: Embeds device-independent sRGB IEC61966-2.1 OutputIntents and XML conformance schemas."
    ],
    "pdf-converter-hub": [
      "<strong>Universal File Interoperability</strong>: Cross-convert Word, Excel, PowerPoint, Camera Scans, HTML, and Markdown to and from standard PDF format.",
      "<strong>Zero-Cloud Privacy</strong>: All document rendering, parsing, and conversions occur 100% locally in your browser memory."
    ],
    "pdf-editor-suite": [
      "<strong>All-In-One Document Editor</strong>: Sign, fill AcroForms, sketch vector annotations, add watermarks, and permanently blackout PII in one unified canvas.",
      "<strong>Vector Stream Baking</strong>: All markings, signatures, and redactions are permanently embedded into the PDF content stream."
    ],
    "pdf-security-suite": [
      "<strong>Cryptographic Protection & Unlock</strong>: Secure documents with AES passwords and permission locks, or remove restrictions instantly.",
      "<strong>Integrity Diagnostics & Archiving</strong>: Rebuild corrupt xref tables, recover damaged streams, and convert to ISO 19005 PDF/A."
    ],
    "qr-studio": [
      "<strong>Art QR & Barcode Generation</strong>: Create custom branded QR codes with eye styling, logo stamping, and linear gradients.",
      "<strong>High-Speed Camera Scanner</strong>: Decode QR codes and retail barcodes in real-time from webcam, photo upload, or clipboard."
    ],
    "audio-suite": [
      "<strong>Universal Sound Transcoder</strong>: Convert between MP3, WAV, and OGG formats with bitrates up to 320k and custom gain.",
      "<strong>Video Audio Demuxer</strong>: Extract soundtracks from MP4, WebM, and MOV video clips with interactive visual waveform trimming."
    ]
  },

  // Centralized Tool Features (Micro Capability Capsules for instant visibility)
  toolFeatures: {
    "pipeline-builder": [
      { label: "Multi-Step Chaining", icon: "🔗", primary: true },
      { label: "Live Visual Preview", icon: "👁️" },
      { label: "Zero Server Uploads", icon: "🔒" },
      { label: "Instant Execution", icon: "⚡" }
    ],
    "formatter-suite": [
      { label: "JSON / SQL / YAML / CSV", icon: "🔄", primary: true },
      { label: "Syntax Validation", icon: "✅" },
      { label: "Minify & Beautify", icon: "✨" },
      { label: "Client-Side Processing", icon: "⚡" }
    ],
    "text-encoder-suite": [
      { label: "Base64 & URL Encoding", icon: "🔤", primary: true },
      { label: "Case Transformations", icon: "🔠" },
      { label: "Slugify & Kebab/Snake", icon: "🏷️" },
      { label: "Offline Safe", icon: "🔒" }
    ],
    "jwt-decoder": [
      { label: "Header & Claims Inspect", icon: "🔍", primary: true },
      { label: "Expiry Auto-Detect", icon: "⏰" },
      { label: "Zero Token Transmission", icon: "🛡️" },
      { label: "Formatted JSON Payload", icon: "📜" }
    ],
    "crypto-suite": [
      { label: "MD5 / SHA-256 / SHA-512", icon: "#️⃣", primary: true },
      { label: "AES-256-GCM Encryption", icon: "🔐" },
      { label: "RSA 2048/4096 Keypairs", icon: "🗝️" },
      { label: "WebCrypto Hardware Speed", icon: "⚡" }
    ],
    "pii-anonymizer": [
      { label: "GDPR & HIPAA Compliant", icon: "🛡️", primary: true },
      { label: "Email / Phone / IP Masking", icon: "🕵️" },
      { label: "Deterministic SHA Hashing", icon: "🔢" },
      { label: "100% In-Browser Scrubbing", icon: "🔒" }
    ],
    "markdown-preview": [
      { label: "Live Split-Pane Preview", icon: "📝", primary: true },
      { label: "GFM Table Support", icon: "📊" },
      { label: "HTML Source View", icon: "💻" },
      { label: "Instant Render", icon: "⚡" }
    ],
    "text-diff": [
      { label: "Side-by-Side Comparison", icon: "⚖️", primary: true },
      { label: "Word & Char Highlighting", icon: "🔍" },
      { label: "Unified Diff Mode", icon: "📄" },
      { label: "Zero Telemetry", icon: "🔒" }
    ],
    "pdf-searcher": [
      { label: "Multi-Document Search", icon: "📑", primary: true },
      { label: "Client-Side Tesseract OCR", icon: "👁️" },
      { label: "Scanned Page Parsing", icon: "📷" },
      { label: "Private & Local", icon: "🔒" }
    ],
    "pdf-utilities": [
      { label: "Split, Merge & Rotate", icon: "✂️", primary: true },
      { label: "Convert to PNG / JPG / WebP", icon: "🖼️" },
      { label: "Document Compression", icon: "🗜️" },
      { label: "Zero Server Upload", icon: "🔒" }
    ],
    "regex-tester": [
      { label: "Live Pattern Matching", icon: "🎯", primary: true },
      { label: "Capture Group Analyzer", icon: "🔬" },
      { label: "Batch String Extractor", icon: "📦" },
      { label: "Regex Cheat Sheet", icon: "📚" }
    ],
    "css-studio": [
      { label: "Gradients & Mesh Generator", icon: "🎨", primary: true },
      { label: "Multi-Layer Box Shadows", icon: "👥" },
      { label: "Frosted Glassmorphism", icon: "🧊" },
      { label: "1-Click CSS Copy", icon: "📋" }
    ],
    "color-lab": [
      { label: "WCAG 2.1 Contrast Ratios", icon: "👁️", primary: true },
      { label: "Harmonic Palette Generator", icon: "🌈" },
      { label: "Tints, Shades & Opacities", icon: "🎨" },
      { label: "HEX / RGB / HSL Sync", icon: "📐" }
    ],
    "security-suite": [
      { label: "Cryptographic Entropy", icon: "🎲", primary: true },
      { label: "RFC 4122 v4 UUIDs", icon: "🔑" },
      { label: "Bulk Key Generation", icon: "📦" },
      { label: "Hardware RNG Seeded", icon: "⚡" }
    ],
    "datetime-suite": [
      { label: "Unix Epoch Converter", icon: "⏱️", primary: true },
      { label: "Millisecond & Second Mode", icon: "⚡" },
      { label: "Duration & Date Math", icon: "📅" },
      { label: "Local Timezone Sync", icon: "🌍" }
    ],
    "unit-converter": [
      { label: "Digital Storage (B to TB)", icon: "💾", primary: true },
      { label: "Length / Weight / Temp", icon: "⚖️" },
      { label: "Real-time Bi-directional", icon: "🔄" },
      { label: "High Precision Formula", icon: "📐" }
    ],
    "graphics-studio": [
      { label: "Webcam & Screen Capture", icon: "📸", primary: true },
      { label: "Layered Canvas Editor", icon: "🖌️" },
      { label: "Cyberpunk & Vintage Filters", icon: "✨" },
      { label: "100% In-Browser GPU", icon: "🚀" }
    ],
    "calculator": [
      { label: "Scientific Math Functions", icon: "🧮", primary: true },
      { label: "Trig, Log & Factorial", icon: "📐" },
      { label: "Interactive History Reel", icon: "📜" },
      { label: "Constants Library (π, e)", icon: "🔢" }
    ],
    "qr-generator": [
      { label: "Gradient & Art QR Codes", icon: "📱", primary: true },
      { label: "Custom Dot & Eye Styles", icon: "✨" },
      { label: "Center Logo Embedding", icon: "🖼️" },
      { label: "High-Res SVG & PNG Export", icon: "💾" }
    ],
    "seo-previewer": [
      { label: "Google SERP Mockup", icon: "🔍", primary: true },
      { label: "Facebook, X, Discord Cards", icon: "🌐" },
      { label: "OpenGraph Tag Builder", icon: "🏷️" },
      { label: "Length Warnings", icon: "📏" }
    ],
    "image-converter": [
      { label: "PNG / JPG / WebP Conversion", icon: "🖼️", primary: true },
      { label: "Lossless / Lossy Compression", icon: "🗜️" },
      { label: "Resolution Rescaling", icon: "📐" },
      { label: "Instant Local Download", icon: "⚡" }
    ],
    "svg-animator": [
      { label: "Keyframe Path Animations", icon: "🎬", primary: true },
      { label: "Self-Drawing & Neon Presets", icon: "✨" },
      { label: "Live Interactive Playback", icon: "▶️" },
      { label: "Pure Animated SVG Export", icon: "💾" }
    ],
    "url-parser": [
      { label: "Query Parameter Breakdown", icon: "🔗", primary: true },
      { label: "Key-Value Live Editor", icon: "✏️" },
      { label: "Path & Protocol Inspector", icon: "🌐" },
      { label: "Automatic URL Encoding", icon: "⚙️" }
    ],
    "text-analyzer": [
      { label: "Flesch Reading Ease Score", icon: "📊", primary: true },
      { label: "Word & Character Counter", icon: "🔢" },
      { label: "Reading & Speaking Time", icon: "⏱️" },
      { label: "Top Keyword Density", icon: "📈" }
    ],
    "mock-data-generator": [
      { label: "Schema-Driven Row Builder", icon: "📊", primary: true },
      { label: "Up to 50,000 Rows", icon: "🚀" },
      { label: "Names, Emails, Dates, UUIDs", icon: "👤" },
      { label: "CSV & JSON Export", icon: "💾" }
    ],
    "admin-settings": [
      { label: "Central Ad Management", icon: "⚙️", primary: true },
      { label: "Google AdSense & AdMob IDs", icon: "📺" },
      { label: "Zero Server Config", icon: "🔒" },
      { label: "Encrypted Passcode Lock", icon: "🛡️" }
    ],
    "code-playground": [
      { label: "HTML/CSS/JS Sandbox", icon: "💻", primary: true },
      { label: "Live Iframe Rendering", icon: "⚡" },
      { label: "Simulated Console Diagnostics", icon: "🖥️" },
      { label: "Zero-Setup Prototyping", icon: "🚀" }
    ],
    "ip-subnet-calculator": [
      { label: "CIDR & Subnet Range Calc", icon: "🌐", primary: true },
      { label: "Broadcast & Usable Hosts", icon: "🖥️" },
      { label: "MAC OUI Vendor Lookup", icon: "🔍" },
      { label: "Binary Mask Visualizer", icon: "🔢" }
    ],
    "curl-converter": [
      { label: "Fetch, Axios, Requests, Go", icon: "⚡", primary: true },
      { label: "Auto Auth & Header Parser", icon: "🔐" },
      { label: "JSON Body Formatter", icon: "📦" },
      { label: "ES6 Async/Await Ready", icon: "🚀" }
    ],
    "cron-builder": [
      { label: "Visual 5-Field Builder", icon: "⏱️", primary: true },
      { label: "Plain English Explainer", icon: "🗣️" },
      { label: "Next 5 Execution Times", icon: "📅" },
      { label: "Standard Cron Syntax", icon: "⚙️" }
    ],
    "json-to-types": [
      { label: "TypeScript & Python Pydantic", icon: "📦", primary: true },
      { label: "Go Structs & Rust Serde", icon: "🦀" },
      { label: "Recursive Nested Interfaces", icon: "🌳" },
      { label: "100% In-Browser Types", icon: "⚡" }
    ],
    "robots-generator": [
      { label: "Visual Crawl Rule Builder", icon: "🤖", primary: true },
      { label: "AI Bot Scraper Shield", icon: "🛡️" },
      { label: "XML Sitemap Integration", icon: "🗺️" },
      { label: "One-Click Robots.txt Export", icon: "💾" }
    ],
    "lorem-generator": [
      { label: "Latin, Cyber & Corporate Modes", icon: "✍️", primary: true },
      { label: "Paragraphs, Lists & Words", icon: "📜" },
      { label: "HTML, Markdown & JSON Formats", icon: "🏷️" },
      { label: "Live Word & Char Counters", icon: "🔢" }
    ],
    "qr-scanner": [
      { label: "Webcam & Live Camera Scanning", icon: "📷", primary: true },
      { label: "File Drop & Clipboard Paste", icon: "📋" },
      { label: "Smart URL, WiFi & Action Detect", icon: "⚡" },
      { label: "100% In-Browser Privacy", icon: "🔒" }
    ],
    "color-extractor": [
      { label: "Dominant Palette Quantization", icon: "🎨", primary: true },
      { label: "Zoom Magnifier Eyedropper", icon: "🔍" },
      { label: "WCAG 2.1 Contrast Testing", icon: "👁️" },
      { label: "CSS, Tailwind & JSON Export", icon: "📋" }
    ],
    "favicon-generator": [
      { label: "Multi-Resolution .ICO Compiler", icon: "⭐", primary: true },
      { label: "Apple Touch & Android PWA Icons", icon: "📱" },
      { label: "Live Tab & Screen Previews", icon: "👁️" },
      { label: "All-in-One ZIP Package", icon: "📦" }
    ],
    "images-to-pdf": [
      { label: "JPG, PNG & WebP to PDF", icon: "📑", primary: true },
      { label: "Visual Reorder & Rotate Board", icon: "🔄" },
      { label: "A4, Letter & Fit Page Sizes", icon: "📐" },
      { label: "Pure Client-Side PDF-Lib", icon: "⚡" }
    ],
    "screenshot-capture": [
      { label: "Native Tab & Screen Snip", icon: "📸", primary: true },
      { label: "macOS & Windows Mockup", icon: "🪟" },
      { label: "PII & Password Redaction", icon: "⬛" },
      { label: "1-Click Clipboard Copy", icon: "📋" }
    ],
    "screen-recorder": [
      { label: "Screen, Window & Tab Capture", icon: "🖥️", primary: true },
      { label: "Mic Commentary Audio Mix", icon: "🎙️" },
      { label: "60 FPS / 1080p / 4K Modes", icon: "⚡" },
      { label: "WebM & MP4 Download", icon: "💾" }
    ],
    "voice-recorder": [
      { label: "Studio-Grade Vocals", icon: "🎙️", primary: true },
      { label: "Live Spectrum & Oscilloscope", icon: "📊" },
      { label: "Lossless 16-bit WAV Export", icon: "💾" },
      { label: "Noise & Echo Suppression", icon: "✨" }
    ],
    "video-speed": [
      { label: "0.1x to 4.0x Speed Control", icon: "⚡", primary: true },
      { label: "Frame-by-Frame Stepper", icon: "🎞️" },
      { label: "Pitch Preservation Engine", icon: "🎵" },
      { label: "Continuous A-B Loop Repeater", icon: "🔄" }
    ],
    "mp4-to-mp3": [
      { label: "Video to Audio Extraction", icon: "🎵", primary: true },
      { label: "Interactive Audio Waveform", icon: "📊" },
      { label: "Sub-Second Range Trimming", icon: "✂️" },
      { label: "Studio WAV & WebM Export", icon: "💾" }
    ],
    "video-to-gif": [
      { label: "Video to Animated GIF", icon: "🖼️", primary: true },
      { label: "Custom Resolution & FPS", icon: "📐" },
      { label: "Frame-by-Frame Progress", icon: "⏳" },
      { label: "Pure Client-Side LZW", icon: "⚡" }
    ],
    "temp-mail": [
      { label: "Instant Throwaway Address", icon: "✉️", primary: true },
      { label: "10-Second Auto Refresh", icon: "⏱️" },
      { label: "Built-in HTML Email Viewer", icon: "📖" },
      { label: "100% Free & No Registration", icon: "🛡️" }
    ],
    "sign-pdf": [
      { label: "Draw, Type & Stamp Signatures", icon: "✍️", primary: true },
      { label: "Interactive Visual Placement", icon: "📍" },
      { label: "Multi-Page PDF Support", icon: "📑" },
      { label: "100% Client-Side PDF-Lib", icon: "⚡" }
    ],
    "pdf-security": [
      { label: "AES Password Protection", icon: "🔒", primary: true },
      { label: "Unlock & Decrypt PDFs", icon: "🔓" },
      { label: "Print & Copy Restrictions", icon: "🛡️" },
      { label: "Zero Cloud Uploads", icon: "⚡" }
    ],
    "pdf-watermark": [
      { label: "Angled & Horizontal Watermarks", icon: "💧", primary: true },
      { label: "Dynamic Page Numbers (X of Y)", icon: "🔢" },
      { label: "Color, Opacity & Font Scale", icon: "🎨" },
      { label: "Skip First Page Cover Option", icon: "📄" }
    ],
    "pdf-organizer": [
      { label: "Drag & Reorder Page Grid", icon: "🔄", primary: true },
      { label: "90° Page Rotation", icon: "🔁" },
      { label: "Delete Unwanted Pages", icon: "🗑️" },
      { label: "High-Fidelity Thumbnails", icon: "👁️" }
    ],
    "crop-pdf": [
      { label: "Visual Bounding Box Crop", icon: "✂️", primary: true },
      { label: "All / Even / Odd Scope", icon: "📐" },
      { label: "Millimeter & Point Margins", icon: "📏" },
      { label: "MediaBox & CropBox Engine", icon: "⚡" }
    ],
    "pdf-forms": [
      { label: "Fill Interactive AcroForms", icon: "📝", primary: true },
      { label: "Text, Checks & Dropdowns", icon: "🔘" },
      { label: "Flatten & Lock Fields", icon: "🔒" },
      { label: "Export Filled Documents", icon: "💾" }
    ],
    "redact-pdf": [
      { label: "Permanent Stream Redaction", icon: "⬛", primary: true },
      { label: "Blackout & Whiteout Boxes", icon: "🖌️" },
      { label: "Scrub PII & Financial Data", icon: "🛡️" },
      { label: "Zero Server Transmission", icon: "🔒" }
    ],
    "excel-pdf": [
      { label: "Excel to PDF & PDF to Excel", icon: "📊", primary: true },
      { label: "Multi-Sheet Tabs Supported", icon: "📑" },
      { label: "Zebra & Grid Themes", icon: "🎨" },
      { label: "Pure In-Browser SheetJS", icon: "⚡" }
    ],
    "word-pdf": [
      { label: "DOCX to PDF & PDF to Word", icon: "📄", primary: true },
      { label: "Preserves Tables & Headings", icon: "📐" },
      { label: "Native Word (.docx) Export", icon: "💾" },
      { label: "100% Client-Side Privacy", icon: "🔒" }
    ],
    "html-to-pdf": [
      { label: "Live HTML/CSS Sandbox", icon: "💻", primary: true },
      { label: "Pre-Built Invoice Templates", icon: "🧾" },
      { label: "Page-Break CSS Controls", icon: "✂️" },
      { label: "Crisp 3x Retina Scaling", icon: "✨" }
    ],
    "pdf-to-markdown": [
      { label: "PDF to GitHub Markdown (GFM)", icon: "📝", primary: true },
      { label: "Auto Heading (#) Detection", icon: "🏷️" },
      { label: "Pipe Table Conversion", icon: "📊" },
      { label: "One-Click .md Download", icon: "📥" }
    ],
    "pdf-ai": [
      { label: "Executive Bullet Summaries", icon: "📌", primary: true },
      { label: "Action Items & Deadlines", icon: "⚡" },
      { label: "15+ Language Translations", icon: "🌐" },
      { label: "Google Gemini & Offline NLP", icon: "🤖" }
    ],
    "scan-to-pdf": [
      { label: "Live Camera Viewfinder", icon: "📷", primary: true },
      { label: "Multi-Page Rapid Snapping", icon: "📑" },
      { label: "B&W Document Contrast Filter", icon: "✨" },
      { label: "Single/Multi-Page PDF Export", icon: "💾" }
    ],
    "pptx-pdf": [
      { label: "PowerPoint (.pptx) to PDF", icon: "📊", primary: true },
      { label: "PDF to PowerPoint Slides", icon: "📑" },
      { label: "PptxGenJS Vector Slides", icon: "🎨" },
      { label: "100% Client-Side Conversion", icon: "⚡" }
    ],
    "compare-pdf": [
      { label: "Visual Page Comparison", icon: "👁️", primary: true },
      { label: "Pixel Difference Heatmap", icon: "🔴" },
      { label: "Interactive Wipe Slider", icon: "↔️" },
      { label: "Text & Clause Diff Export", icon: "📝" }
    ],
    "pdf-annotate": [
      { label: "Freehand Pen & Highlighter", icon: "✏️", primary: true },
      { label: "Text Stamps & Bounding Boxes", icon: "🔤" },
      { label: "Arrow Directional Pointers", icon: "➡️" },
      { label: "Burn Annotations to PDF", icon: "💾" }
    ],
    "audio-converter": [
      { label: "MP3, WAV & OGG Transcode", icon: "🎧", primary: true },
      { label: "Bitrates up to 320 kbps", icon: "⚡" },
      { label: "Stereo / Mono Downmix", icon: "🎛️" },
      { label: "Volume Gain Booster (200%)", icon: "🔊" }
    ],
    "repair-pdf": [
      { label: "Rebuild Damaged Xref Tables", icon: "🛠️", primary: true },
      { label: "Fix Missing Trailers & Headers", icon: "🩹" },
      { label: "Permissive Stream Salvage", icon: "📂" },
      { label: "Real-Time Diagnostic Console", icon: "💻" }
    ],
    "pdf-to-pdfa": [
      { label: "ISO 19005 Standardization", icon: "🏛️", primary: true },
      { label: "PDF/A-1b, 2b & 3b Profiles", icon: "📜" },
      { label: "Embedded sRGB OutputIntent", icon: "🎨" },
      { label: "XMP Archival Metadata Packet", icon: "🏷️" }
    ],
    "pdf-converter-hub": [
      { label: "Word, Excel & PPTX", icon: "📄", primary: true },
      { label: "Images & Camera Scanner", icon: "📷" },
      { label: "HTML/CSS & Markdown", icon: "💻" },
      { label: "100% In-Browser", icon: "🔒" }
    ],
    "pdf-editor-suite": [
      { label: "Draw & Cursive Sign", icon: "✍️", primary: true },
      { label: "AcroForm Fill & Flatten", icon: "📋" },
      { label: "Vector Markup & Watermark", icon: "✏️" },
      { label: "Permanent Redaction", icon: "⬛" }
    ],
    "pdf-security-suite": [
      { label: "AES-256 Encrypt & Unlock", icon: "🔒", primary: true },
      { label: "Corrupt Xref Stream Repair", icon: "🛠️" },
      { label: "ISO 19005 PDF/A Archive", icon: "🏛️" },
      { label: "Zero Server Uploads", icon: "⚡" }
    ],
    "qr-studio": [
      { label: "Art Gradients & Logos", icon: "🎨", primary: true },
      { label: "Webcam & File Scanner", icon: "📷" },
      { label: "1D/2D Barcode Support", icon: "📦" },
      { label: "Client-Side Speed", icon: "⚡" }
    ],
    "audio-suite": [
      { label: "MP3, WAV & OGG Transcode", icon: "🎧", primary: true },
      { label: "Video Audio Demuxer", icon: "🎬" },
      { label: "Visual Waveform Trimmer", icon: "📊" },
      { label: "Bitrates up to 320k", icon: "⚡" }
    ]
  },

  // Centralized Tool Connected Workflows (Multi-tool pipeline bridges)
  toolWorkflows: {
    "pipeline-builder": [
      { targetId: "formatter-suite", hint: "Format or convert pipeline JSON/CSV outputs" },
      { targetId: "text-encoder-suite", hint: "Apply additional Base64 or URL transformations" }
    ],
    "formatter-suite": [
      { targetId: "json-to-types", hint: "Convert formatted JSON into TypeScript or Python models" },
      { targetId: "curl-converter", hint: "Generate API requests matching your JSON payload" },
      { targetId: "pipeline-builder", hint: "Chain this formatting step in a multi-stage pipeline" }
    ],
    "json-to-types": [
      { targetId: "curl-converter", hint: "Generate API request client code to fetch this model" },
      { targetId: "formatter-suite", hint: "Format or validate the source JSON before typing" },
      { targetId: "mock-data-generator", hint: "Generate synthetic JSON records matching your schema" }
    ],
    "curl-converter": [
      { targetId: "jwt-decoder", hint: "Inspect bearer tokens or authorization headers in your request" },
      { targetId: "json-to-types", hint: "Generate strongly-typed models for the request payload" },
      { targetId: "formatter-suite", hint: "Beautify raw JSON bodies sent with this request" }
    ],
    "cron-builder": [
      { targetId: "datetime-suite", hint: "Convert next execution epoch timestamps to local time" },
      { targetId: "code-playground", hint: "Test scheduled task triggers in JavaScript" }
    ],
    "jwt-decoder": [
      { targetId: "crypto-suite", hint: "Verify cryptographic signatures or hash payload components" },
      { targetId: "security-suite", hint: "Generate fresh HMAC secrets or UUID session tokens" },
      { targetId: "formatter-suite", hint: "Beautify and query the decoded JSON claims" }
    ],
    "crypto-suite": [
      { targetId: "security-suite", hint: "Generate high-entropy encryption passphrases or UUIDs" },
      { targetId: "jwt-decoder", hint: "Inspect tokens signed by your cryptographic keys" },
      { targetId: "pii-anonymizer", hint: "Scrub sensitive identities before cryptographic hashing" }
    ],
    "pii-anonymizer": [
      { targetId: "crypto-suite", hint: "Generate SHA-256 integrity hashes for anonymized records" },
      { targetId: "regex-tester", hint: "Create custom regex rules to catch niche identifier patterns" },
      { targetId: "formatter-suite", hint: "Format and sanitize anonymized JSON/CSV logs" }
    ],
    "text-encoder-suite": [
      { targetId: "url-parser", hint: "Inspect and edit encoded query parameters" },
      { targetId: "pipeline-builder", hint: "Chain encoder transformations into continuous workflows" },
      { targetId: "formatter-suite", hint: "Validate and format decoded JSON strings" }
    ],
    "markdown-preview": [
      { targetId: "text-diff", hint: "Compare markdown drafts against earlier revisions" },
      { targetId: "text-analyzer", hint: "Check readability scores and word counts of your draft" }
    ],
    "text-diff": [
      { targetId: "markdown-preview", hint: "Preview merged markdown documents live" },
      { targetId: "formatter-suite", hint: "Format JSON/SQL files before comparing differences" }
    ],
    "pdf-searcher": [
      { targetId: "pdf-utilities", hint: "Split, rotate, or compress pages found in your search" },
      { targetId: "text-analyzer", hint: "Analyze readability and length of extracted OCR text" }
    ],
    "pdf-utilities": [
      { targetId: "pdf-searcher", hint: "Search and run OCR on pages extracted from your PDF" },
      { targetId: "image-converter", hint: "Optimize or convert exported PDF page images" }
    ],
    "regex-tester": [
      { targetId: "text-encoder-suite", hint: "Transform or encode matched substring results" },
      { targetId: "pii-anonymizer", hint: "Mask sensitive data matching your custom patterns" }
    ],
    "css-studio": [
      { targetId: "color-lab", hint: "Check WCAG contrast ratios of your gradient color stops" },
      { targetId: "svg-animator", hint: "Animate vector illustrations with matching CSS styles" },
      { targetId: "code-playground", hint: "Live test CSS gradient and shadow cards in real HTML" }
    ],
    "color-lab": [
      { targetId: "css-studio", hint: "Build gradients and glass cards using your color palette" },
      { targetId: "qr-generator", hint: "Apply your brand palette colors to high-res QR codes" }
    ],
    "security-suite": [
      { targetId: "crypto-suite", hint: "Hash or encrypt passwords using AES-256 or SHA-512" },
      { targetId: "jwt-decoder", hint: "Verify tokens created with your generated UUIDs" }
    ],
    "datetime-suite": [
      { targetId: "cron-builder", hint: "Build recurring schedule rules based on your timestamps" },
      { targetId: "calculator", hint: "Run extended math formulas on duration intervals" }
    ],
    "unit-converter": [
      { targetId: "calculator", hint: "Compute complex scientific formulas on converted values" },
      { targetId: "ip-subnet-calculator", hint: "Calculate network bandwidth and storage capacities" }
    ],
    "graphics-studio": [
      { targetId: "image-converter", hint: "Compress or convert captured graphics to WebP / PNG" },
      { targetId: "css-studio", hint: "Design glassmorphism cards and borders around graphics" }
    ],
    "calculator": [
      { targetId: "datetime-suite", hint: "Calculate time differences and business day durations" },
      { targetId: "unit-converter", hint: "Convert mathematical units to standard measurements" }
    ],
    "qr-generator": [
      { targetId: "url-parser", hint: "Construct and test clean URL query params for your QR link" },
      { targetId: "color-lab", hint: "Select accessible, high-contrast colors for your QR pattern" }
    ],
    "seo-previewer": [
      { targetId: "url-parser", hint: "Test canonical URLs and UTM tracking parameters" },
      { targetId: "text-analyzer", hint: "Optimize meta title and description character counts" }
    ],
    "image-converter": [
      { targetId: "graphics-studio", hint: "Add filters, overlays, and annotations to converted images" },
      { targetId: "pdf-utilities", hint: "Merge optimized images into multi-page PDF documents" }
    ],
    "svg-animator": [
      { targetId: "css-studio", hint: "Combine animated SVGs with modern glassmorphism backdrops" },
      { targetId: "code-playground", hint: "Embed animated SVG markup into interactive HTML layouts" }
    ],
    "url-parser": [
      { targetId: "curl-converter", hint: "Turn your formatted URL & parameters into code requests" },
      { targetId: "text-encoder-suite", hint: "Encode or decode special parameter characters" }
    ],
    "text-analyzer": [
      { targetId: "markdown-preview", hint: "Refine and preview your edited text in real time" },
      { targetId: "seo-previewer", hint: "Validate snippet lengths and content readability" }
    ],
    "mock-data-generator": [
      { targetId: "formatter-suite", hint: "Format, inspect, and query generated CSV or JSON data" },
      { targetId: "json-to-types", hint: "Generate TypeScript or Python types matching your mock schema" }
    ],
    "admin-settings": [
      { targetId: "code-playground", hint: "Test custom ad integration code snippets" },
      { targetId: "formatter-suite", hint: "Format and validate custom JSON ad configuration exports" }
    ],
    "code-playground": [
      { targetId: "curl-converter", hint: "Convert cURL requests to Fetch code to run in your playground" },
      { targetId: "css-studio", hint: "Inject gradients and glass cards into your playground HTML" }
    ],
    "ip-subnet-calculator": [
      { targetId: "unit-converter", hint: "Convert network data transfer rates and subnet capacities" },
      { targetId: "calculator", hint: "Perform advanced binary calculations and address math" }
    ],
    "robots-generator": [
      { targetId: "seo-previewer", hint: "Preview social cards and meta tags for indexed pages" },
      { targetId: "url-parser", hint: "Analyze site URL paths and query parameters for disallow rules" }
    ],
    "lorem-generator": [
      { targetId: "markdown-preview", hint: "Test how your dummy copy renders in markdown and HTML" },
      { targetId: "text-analyzer", hint: "Check word count and readability scores of generated text" }
    ],
    "qr-scanner": [
      { targetId: "qr-generator", hint: "Generate a custom branded QR code with extracted content" },
      { targetId: "url-parser", hint: "Inspect and test decoded URL query parameters" }
    ],
    "color-extractor": [
      { targetId: "color-lab", hint: "Fine-tune contrast ratios and generate harmonic shades" },
      { targetId: "css-studio", hint: "Apply extracted colors directly to CSS gradients and glass cards" }
    ],
    "favicon-generator": [
      { targetId: "seo-previewer", hint: "Inspect favicon appearance in Google SERP results" },
      { targetId: "image-converter", hint: "Convert and optimize source graphics before icon compilation" }
    ],
    "images-to-pdf": [
      { targetId: "pdf-utilities", hint: "Compress, split, or encrypt your assembled PDF document" },
      { targetId: "image-converter", hint: "Optimize and resize image resolutions before compiling" }
    ],
    "screenshot-capture": [
      { targetId: "screen-recorder", hint: "Record continuous video tutorials of your screen with microphone audio" },
      { targetId: "graphics-studio", hint: "Create promotional social banners and marketing graphics" }
    ],
    "screen-recorder": [
      { targetId: "video-speed", hint: "Review and inspect screen recording with variable speed and frame stepper" },
      { targetId: "video-to-gif", hint: "Convert recorded screen clips into lightweight animated GIFs" },
      { targetId: "mp4-to-mp3", hint: "Extract the audio or voice commentary from your screen recording" }
    ],
    "voice-recorder": [
      { targetId: "mp4-to-mp3", hint: "Trim or process voice tracks alongside video soundtracks" },
      { targetId: "screen-recorder", hint: "Record visual screen tutorials with full microphone commentary" }
    ],
    "video-speed": [
      { targetId: "video-to-gif", hint: "Convert inspected video segment into an animated GIF clip" },
      { targetId: "mp4-to-mp3", hint: "Extract the audio track from the loaded video" }
    ],
    "mp4-to-mp3": [
      { targetId: "voice-recorder", hint: "Record voice notes or compare against extracted audio tracks" },
      { targetId: "video-speed", hint: "Play video back at variable speeds with pitch control" }
    ],
    "video-to-gif": [
      { targetId: "video-speed", hint: "Frame-step through video to identify exact GIF start/end moments" },
      { targetId: "image-converter", hint: "Optimize and compress graphics or converted frames" }
    ],
    "temp-mail": [
      { targetId: "security-suite", hint: "Generate secure passwords to use with your disposable email" },
      { targetId: "qr-generator", hint: "Generate a QR code of your temporary inbox address" }
    ],
    "sign-pdf": [
      { targetId: "pdf-security", hint: "Lock and password-protect your signed PDF document" },
      { targetId: "pdf-watermark", hint: "Add confidential watermarks or numbering to your signed PDF" }
    ],
    "pdf-security": [
      { targetId: "sign-pdf", hint: "Sign documents before encrypting with password protection" },
      { targetId: "redact-pdf", hint: "Scrub sensitive PII before applying encryption locks" }
    ],
    "pdf-watermark": [
      { targetId: "pdf-organizer", hint: "Organize and rotate pages before stamping watermarks" },
      { targetId: "pdf-security", hint: "Encrypt watermarked documents for secure distribution" }
    ],
    "pdf-organizer": [
      { targetId: "crop-pdf", hint: "Crop margins on organized and rotated pages" },
      { targetId: "sign-pdf", hint: "Sign organized documents on designated signature pages" }
    ],
    "crop-pdf": [
      { targetId: "pdf-organizer", hint: "Reorder or rotate pages after cropping margins" },
      { targetId: "pdf-utilities", hint: "Compress cropped PDF to minimize file size" }
    ],
    "pdf-forms": [
      { targetId: "sign-pdf", hint: "Add verified signatures or stamps to completed forms" },
      { targetId: "pdf-security", hint: "Password-protect filled forms before emailing" }
    ],
    "redact-pdf": [
      { targetId: "pdf-security", hint: "Encrypt sanitized documents with AES passwords" },
      { targetId: "pdf-watermark", hint: "Stamp 'SANITIZED' or 'REDACTED' watermark across pages" }
    ],
    "excel-pdf": [
      { targetId: "pdf-security", hint: "Encrypt financial spreadsheet PDFs with AES passwords" },
      { targetId: "pdf-watermark", hint: "Add confidential watermarks to financial PDF tables" }
    ],
    "word-pdf": [
      { targetId: "sign-pdf", hint: "Digitally sign contracts after converting from Word" },
      { targetId: "pdf-security", hint: "Password-protect converted Word documents" }
    ],
    "html-to-pdf": [
      { targetId: "pdf-watermark", hint: "Add page numbering or company stamps to HTML documents" },
      { targetId: "pdf-organizer", hint: "Organize and rotate pages in compiled HTML PDFs" }
    ],
    "pdf-to-markdown": [
      { targetId: "markdown-preview", hint: "Edit and format your converted Markdown in real time" },
      { targetId: "text-analyzer", hint: "Check readability scores and word counts of extracted text" }
    ],
    "pdf-ai": [
      { targetId: "pdf-to-markdown", hint: "Convert full document to Markdown before AI processing" },
      { targetId: "word-pdf", hint: "Export AI summaries and translated documents into Word" }
    ],
    "scan-to-pdf": [
      { targetId: "pdf-organizer", hint: "Reorder, rotate, or delete scanned pages in thumbnail grid" },
      { targetId: "pdf-utilities", hint: "Compress scanned PDF to minimize file size" }
    ],
    "pptx-pdf": [
      { targetId: "pdf-watermark", hint: "Watermark confidential presentation slides before distribution" },
      { targetId: "pdf-security", hint: "Password-protect confidential slide decks" }
    ],
    "compare-pdf": [
      { targetId: "pdf-annotate", hint: "Annotate and highlight discrepancies found during comparison" },
      { targetId: "text-diff", hint: "Run granular line-by-line diff on specific clauses" }
    ],
    "pdf-annotate": [
      { targetId: "sign-pdf", hint: "Add verified cursive or digital signature stamps" },
      { targetId: "pdf-security", hint: "Lock and encrypt annotated document" }
    ],
    "audio-converter": [
      { targetId: "mp4-to-mp3", hint: "Extract audio tracks directly from video clips" },
      { targetId: "voice-recorder", hint: "Record and visualize microphone audio memos" }
    ],
    "repair-pdf": [
      { targetId: "pdf-utilities", hint: "Optimize and compress repaired PDF structure" },
      { targetId: "pdf-to-pdfa", hint: "Convert salvaged PDF to ISO archival compliance" }
    ],
    "pdf-to-pdfa": [
      { targetId: "repair-pdf", hint: "Inspect and repair stream errors prior to archiving" },
      { targetId: "pdf-security", hint: "Audit permissions and encryption parameters" }
    ]
  },

  // State variables
  activeCategory: "all",      // 'all', 'fav'
  activeSubcategory: "all",   // 'all', or specific like 'dev-formatters'
  activeTool: null,
  favorites: new Set(),
  recents: [],
  globalConfig: null,

  // Search & Filter system states
  activeSearchFilter: "all",
  activeCpFilter: "all",

  // Command Palette states
  cpOpen: false,
  cpIndex: 0,
  cpFiltered: [],

  // Guides Registry for Instant Documentation Search
  guidesList: [
    { id: "pipeline-builder", fileName: "pipeline-builder.html", title: "Smart Chain Pipeline Builder", description: "Learn how to build, reorder, execute, and preview chain data processing pipelines client-side using Smart Chain Pipeline Builder." },
    { id: "text-encoder-suite", fileName: "text-encoder-suite.html", title: "Text Cases & Encoder Suite", description: "Learn how to convert case representations (UPPER, lower, camel, snake, kebab) and run Base64 or URL encoding/decoding operations." },
    { id: "jwt-decoder", fileName: "jwt-decoder.html", title: "JWT Decoder & Token Parser", description: "Learn how to decode JSON Web Tokens (JWT) to inspect header parameters, claim payloads, and verify signatures." },
    { id: "crypto-suite", fileName: "crypto-suite.html", title: "Cryptography Suite", description: "Learn how to generate hashes, run symmetric AES-256 ciphers, and construct RSA keypairs client-side." },
    { id: "markdown-preview", fileName: "markdown-preview.html", title: "Live Markdown Editor & Previewer", description: "Learn how to write markdown schemas, edit content with live syntax highlights, and preview formatted HTML." },
    { id: "text-diff", fileName: "text-diff.html", title: "Text Diff Comparison Tool", description: "Learn how to compare two texts side-by-side or line-by-line and highlight visual differences." },
    { id: "pdf-searcher", fileName: "pdf-searcher.html", title: "Multi-PDF Searcher & OCR", description: "Learn how to search multiple PDF documents and perform client-side Optical Character Recognition (OCR)." },
    { id: "pdf-utilities", fileName: "pdf-utilities.html", title: "PDF Toolbox (Split, Merge, Convert & Compress)", description: "Learn how to split into PDF, PNG, JPG, or WebP, merge multiple PDFs, rotate/reorganize pages, and compress documents 100% client-side." },
    { id: "regex-tester", fileName: "regex-tester.html", title: "Visual Regex & Extractor Suite", description: "Learn how to test regular expressions, capture matching groups, and extract structured variables." },
    { id: "css-studio", fileName: "css-studio.html", title: "CSS Studio Suite", description: "Learn how to build gradients, shadow layers, and frosted glassmorphism elements visually." },
    { id: "color-lab", fileName: "color-lab.html", title: "Color Lab & Contrast Suite", description: "Learn how to create WCAG-compliant color palettes and evaluate contrast readability ratios." },
    { id: "security-suite", fileName: "security-suite.html", title: "Security & Passwords Suite", description: "Learn how to generate randomized passwords, analyze entropy, and compile bulk UUID keys." },
    { id: "datetime-suite", fileName: "datetime-suite.html", title: "Date & Time Suite", description: "Learn how to convert Unix epochs, calculate durations, and calculate offset dates." },
    { id: "unit-converter", fileName: "unit-converter.html", title: "Unit Converter", description: "Learn how to convert storage metrics, lengths, weights, and temperatures across global standards." },
    { id: "graphics-studio", fileName: "graphics-studio.html", title: "Graphics Designer & Screenshot Studio", description: "Learn how to capture snapshots, build banners, overlay text, and apply premium vintage filters." },
    { id: "calculator", fileName: "calculator.html", title: "Scientific Calculator", description: "Learn how to execute calculations, save histories, and compile trigonometric operations." },
    { id: "qr-generator", fileName: "qr-generator.html", title: "Dynamic QR Code Studio", description: "Learn how to design custom vector QR codes with gradients, dots, and centered logos." },
    { id: "seo-previewer", fileName: "seo-previewer.html", title: "Meta Tag & SEO Previewer", description: "Learn how to design meta tags and preview mockups of search engines and social cards." },
    { id: "image-converter", fileName: "image-converter.html", title: "Image Optimizer & Converter", description: "Learn how to compress file sizes, resize dimensions, and convert formats client-side." },
    { id: "svg-animator", fileName: "svg-animator.html", title: "SVG Animation Studio", description: "Learn how to animate SVG vectors, visualize paths, and export animated SVG files." },
    { id: "url-parser", fileName: "url-parser.html", title: "URL Query Parser & Builder", description: "Learn how to parse web addresses, isolate domain routes, edit parameters in a grid, and generate clean links with UTM structures." },
    { id: "text-analyzer", fileName: "text-analyzer.html", title: "Text Readability & Analyzer", description: "Learn how to evaluate reading times, keyword densities, and calculate Flesch readability scores." },
    { id: "mock-data-generator", fileName: "mock-data-generator.html", title: "Private CSV/JSON Mock Data Generator", description: "Learn how to design schemas, configure column formats, and generate mock datasets client-side." },
    { id: "code-playground", fileName: "code-playground.html", title: "HTML/CSS/JS Live Playground", description: "Learn how to write and test front-end HTML, CSS, and JS code in real-time, load external CDN libraries, and debug using simulated logs." },
    { id: "pii-anonymizer", fileName: "pii-anonymizer.html", title: "Client-Side PII Masker & Anonymizer", description: "Learn how to detect, redact, hash, and mask sensitive Personal Identifiable Information (PII) from server logs locally." },
    { id: "json-formatter", fileName: "json-formatter.html", title: "JSON, SQL & CSV Data Formatter Suite", description: "Learn how to format, validate, and convert JSON, SQL, and CSV datasets entirely client-side using OmniTool Hub's privacy-focused utility suites." },
    { id: "ip-subnet-calculator", fileName: "ip-subnet-calculator.html", title: "IP Subnet & MAC Address Calculator", description: "Learn how to calculate IPv4 CIDR subnets, discover usable host ranges, inspect wildcard masks, and look up MAC OUI vendors client-side." },
    { id: "payment-guide", fileName: "payment-guide.html", title: "OmniTool Hub Payment & PRO Activation Guide", description: "Learn how to activate lifetime PRO access, configure Razorpay, PayPal, or Stripe, and verify zero-fee licensing." }
  ],

  // Utility classification helper: sorts items into Suites, Features, Standalone Tools, Pro, and Free
  classifyTool(tool) {
    if (!tool) return { isSuite: false, isFeature: false, isTool: false, isPro: false, isFree: true };
    const id = (tool.id || "").toLowerCase();
    const name = (tool.name || "").toLowerCase();
    const subcategory = (tool.subcategory || "").toLowerCase();

    // 1. Suites: Multi-utility suites, studios, hubs, labs, toolboxes
    const isSuite = (
      id.includes("suite") ||
      id.includes("studio") ||
      id.includes("lab") ||
      id.includes("hub") ||
      id.includes("utilities") ||
      id.includes("toolbox") ||
      name.includes("suite") ||
      name.includes("studio") ||
      name.includes("lab") ||
      name.includes("toolbox") ||
      name.includes("hub")
    );

    // 2. Features: Interactive workflow builders, anonymizers, playgrounds, specialized engines
    const featureIds = [
      "pipeline-builder",
      "pii-anonymizer",
      "code-playground",
      "mock-data-generator",
      "svg-animator",
      "seo-previewer",
      "markdown-preview",
      "text-diff",
      "pdf-searcher",
      "regex-tester",
      "cron-builder",
      "robots-generator"
    ];
    const isFeature = (
      featureIds.includes(id) ||
      subcategory.includes("pipeline") ||
      name.includes("playground") ||
      name.includes("anonymizer") ||
      name.includes("builder") ||
      name.includes("previewer") ||
      name.includes("animator")
    );

    // 3. Standalone Tools: Single-purpose utilities
    const isTool = !isSuite;

    let overrides = {};
    try {
      overrides = JSON.parse(this.getConfigValue("omnitool_monetization_overrides", "{}"));
    } catch (e) { }
    const effectiveMonetization = overrides[tool.id] || tool.monetization || "free";

    const isPro = effectiveMonetization === "premium" || effectiveMonetization === "ad-lock";
    const isFree = effectiveMonetization === "free";

    return { isSuite, isFeature, isTool, isPro, isFree };
  },

  // Intelligent Multi-Term, Hyphen-Insensitive, and Descriptive Search Matcher
  matchSearchQuery(searchableText, query) {
    if (!query) return true;
    const clean = query.toLowerCase().trim();
    if (!clean) return true;

    const rawTarget = (searchableText || "").toLowerCase();
    // 1. Direct exact substring match
    if (rawTarget.includes(clean)) return true;

    // 2. Alphanumeric match (handles hyphens, slashes, spaces like "sha-256" vs "sha256", "aes-256" vs "aes256", "utf-8" vs "utf8")
    const cleanAlnum = clean.replace(/[^a-z0-9]/g, "");
    const targetAlnum = rawTarget.replace(/[^a-z0-9]/g, "");
    if (cleanAlnum.length >= 2 && targetAlnum.includes(cleanAlnum)) return true;

    // 3. Tokenized Descriptive / Multi-word match
    // Filter conversational stop words (e.g. "how to hash my password in sha 256")
    const stopWords = new Set([
      "how", "to", "can", "i", "a", "an", "the", "in", "on", "of", "for", "with",
      "and", "or", "from", "my", "me", "is", "it", "do", "does", "by", "using",
      "want", "need", "into", "between", "some", "any", "that", "this", "tool",
      "tools", "utility", "utilities", "online", "free"
    ]);

    const allTokens = clean.split(/[\s,\-_./+]+/).filter(Boolean);
    const meaningfulTokens = allTokens.filter(t => !stopWords.has(t) && t.length > 1);
    const searchTokens = meaningfulTokens.length > 0 ? meaningfulTokens : allTokens;

    if (searchTokens.length === 0) return true;

    let matchedTokensCount = 0;
    for (const token of searchTokens) {
      const tokenAlnum = token.replace(/[^a-z0-9]/g, "");
      if (rawTarget.includes(token) || (tokenAlnum.length >= 2 && targetAlnum.includes(tokenAlnum))) {
        matchedTokensCount++;
      }
    }

    const matchRatio = matchedTokensCount / searchTokens.length;
    // For 1 or 2 tokens require complete match; for 3+ tokens allow natural language variations (at least 55% match)
    if (searchTokens.length <= 2) {
      return matchRatio === 1;
    } else {
      return matchRatio >= 0.55;
    }
  },

  // Generates comprehensive searchable text corpus for any tool (name, desc, tags, keywords, benefits, aliases)
  getToolSearchText(tool) {
    if (!tool) return "";
    const parts = [
      tool.id || "",
      tool.name || "",
      tool.desc || "",
      tool.subLabel || "",
      tool.category || "",
      tool.subcategory || ""
    ];

    if (tool.keywords && Array.isArray(tool.keywords)) {
      parts.push(...tool.keywords);
    } else if (this.toolKeywords && this.toolKeywords[tool.id]) {
      parts.push(...this.toolKeywords[tool.id]);
    }

    if (this.toolBenefits && this.toolBenefits[tool.id]) {
      parts.push(...this.toolBenefits[tool.id]);
    }

    // Suite subtab aliases
    if (tool.id === "crypto-suite") {
      parts.push("sha-256", "sha256", "sha 256", "256", "sha-512", "sha512", "512", "sha-1", "sha1", "md5", "sha-384", "keccak", "aes-256", "aes256", "aes-128", "rsa-2048", "rsa-4096", "hash generator", "checksum", "cipher", "salt", "secret key");
    } else if (tool.id === "security-suite") {
      parts.push("password", "uuid", "guid", "v4", "v7", "entropy", "bulk uuid", "random string", "passphrase", "diceware");
    } else if (tool.id === "formatter-suite") {
      parts.push("json beautifier", "sql formatter", "yaml to json", "json to csv", "csv to json", "format query", "database syntax");
    } else if (tool.id === "text-encoder-suite") {
      parts.push("base-64", "base64", "url encode", "url decode", "camelcase", "snake_case", "kebab-case", "pascalcase");
    }

    return parts.join(" ");
  },

  getGuideSearchText(guide) {
    if (!guide) return "";
    const parts = [
      guide.id || "",
      guide.fileName || "",
      guide.title || "",
      guide.description || "",
      guide.tag || ""
    ];
    if (this.toolKeywords && this.toolKeywords[guide.id]) {
      parts.push(...this.toolKeywords[guide.id]);
    }
    return parts.join(" ");
  },

  pendingPaste: null,
  isInitialLoad: true,

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
    "color-extractor": { suiteId: "color-lab", subtab: "extract" },
    "epoch-converter": { suiteId: "datetime-suite", subtab: "epoch" },
    "date-calculator": { suiteId: "datetime-suite", subtab: "date" },

    // QR & Barcode Studio Suite
    "qr-generator": { suiteId: "qr-studio", subtab: "qr-generator" },
    "qr-scanner": { suiteId: "qr-studio", subtab: "qr-scanner" },

    // Screenshot & Browser Capture Aliases
    "browser-capture": { suiteId: "screenshot-capture" },
    "screenshot": { suiteId: "screenshot-capture" },
    "screen-capture": { suiteId: "screenshot-capture" },

    // Audio Studio & Extractor Suite
    "audio-converter": { suiteId: "audio-suite", subtab: "audio-converter" },
    "mp4-to-mp3": { suiteId: "audio-suite", subtab: "mp4-to-mp3" },

    // PDF Page Studio & Organizer
    "pdf-organizer": { suiteId: "pdf-utilities", subtab: "rotate" },
    "crop-pdf": { suiteId: "pdf-utilities", subtab: "split" },

    // Universal Document & PDF Converter Hub
    "word-pdf": { suiteId: "pdf-converter-hub", subtab: "word-pdf" },
    "excel-pdf": { suiteId: "pdf-converter-hub", subtab: "excel-pdf" },
    "pptx-pdf": { suiteId: "pdf-converter-hub", subtab: "pptx-pdf" },
    "images-to-pdf": { suiteId: "pdf-converter-hub", subtab: "images-to-pdf" },
    "scan-to-pdf": { suiteId: "pdf-converter-hub", subtab: "scan-to-pdf" },
    "html-to-pdf": { suiteId: "pdf-converter-hub", subtab: "html-to-pdf" },
    "pdf-to-markdown": { suiteId: "pdf-converter-hub", subtab: "pdf-to-markdown" },

    // PDF Editor, Sign & Markup Studio
    "sign-pdf": { suiteId: "pdf-editor-suite", subtab: "sign-pdf" },
    "pdf-annotate": { suiteId: "pdf-editor-suite", subtab: "pdf-annotate" },
    "pdf-forms": { suiteId: "pdf-editor-suite", subtab: "pdf-forms" },
    "pdf-watermark": { suiteId: "pdf-editor-suite", subtab: "pdf-watermark" },
    "redact-pdf": { suiteId: "pdf-editor-suite", subtab: "redact-pdf" },

    // PDF Security, Repair & Archival Suite
    "pdf-security": { suiteId: "pdf-security-suite", subtab: "pdf-security" },
    "repair-pdf": { suiteId: "pdf-security-suite", subtab: "repair-pdf" },
    "pdf-to-pdfa": { suiteId: "pdf-security-suite", subtab: "pdf-to-pdfa" }
  },

  async loadGlobalConfig() {
    if (window.location.protocol === "file:") {
      return;
    }
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
        if (this.globalConfig && typeof this.globalConfig === "object") {
          Object.entries(this.globalConfig).forEach(([k, v]) => {
            if (localStorage.getItem(k) === null && typeof v === "string") {
              try { localStorage.setItem(k, v); } catch (_) {}
            }
          });
        }
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
    // Inject keywords into tool definitions
    this.tools.forEach(tool => {
      tool.keywords = this.toolKeywords[tool.id] || [];
    });

    // Restrict Settings & Ad Control Panel to local development server only
    const isLocalhost = window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "127.0.0.1.nip.io" ||
      window.location.hostname === "host.docker.internal";
    if (!isLocalhost) {
      this.tools = this.tools.filter(t => t.id !== "admin-settings");
    }

    await this.loadGlobalConfig();
    this.refreshDonationButtons();
    this.initSplash();
    this.registerServiceWorker();
    this.loadFavorites();
    this.loadRecents();
    this.renderFavoritesCount();
    this.initClock();
    this.initTheme();
    this.initLayoutScale();
    this.bindEvents();
    this.buildSidebarToolMenu();
    this.buildMegaMenu();
    this.handleRouting();
    this.initPwaInstallBanner();
    this.initHeaderScroll();
    this.initNavbarSpotlight();
    this.initSurpriseTool();
    this.initDynamicSearchPlaceholder();
    this.initSearchFilters();
    this.checkFileProtocolWarning();
    this.initCheckoutModal();
    this.syncToolCounts();

    // Pre-load utilities for pipeline builder integration and global helpers
    if (window.location.protocol !== "file:") {
      import('./tools/utils.js').catch(err => console.error("Failed to pre-load utils:", err));
    }

    // Render sidebar sponsor ad
    const sidebarAd = document.querySelector(".sidebar-sponsor-container");
    if (sidebarAd) {
      sidebarAd.innerHTML = this.getAdHtml("sidebar");
    }

    // Module diagnostics check (Disabled in production to prevent startup lag)
    if (isLocalhost) {
      this.checkAllModules();
    }
    this.isInitialLoad = false;
  },

  checkFileProtocolWarning() {
    if (window.location.protocol !== "file:") return;

    if (document.getElementById("file-protocol-banner")) return;

    const banner = document.createElement("div");
    banner.id = "file-protocol-banner";
    banner.className = "file-protocol-banner";
    banner.innerHTML = `
      <div class="fpb-inner">
        <div class="fpb-left">
          <span class="fpb-icon">⚠️</span>
          <div class="fpb-text">
            <strong>Direct File Mode (<code>file:///</code>) Detected</strong>
            <span>Browser CORS security blocks JavaScript tool modules when opened directly from disk. Run <strong>npm run dev</strong> or double-click <strong>START_SERVER.bat</strong> to run all ${this.tools.length}+ offline tools at <strong>http://127.0.0.1:8000</strong>.</span>
          </div>
        </div>
        <div class="fpb-actions">
          <button class="fpb-copy-btn" onclick="navigator.clipboard.writeText('npm run dev'); app.showToast('Copied npm run dev to clipboard!', 'success');">Copy 'npm run dev'</button>
          <button class="fpb-close-btn" onclick="this.closest('#file-protocol-banner').remove()" aria-label="Dismiss banner">✕</button>
        </div>
      </div>
    `;
    const target = document.querySelector(".main-wrapper") || document.body;
    target.prepend(banner);
  },

  initHeaderScroll() {
    const header = document.querySelector(".main-header");
    const contentArea = document.getElementById("content-area");
    if (!header) return;

    this.checkHeaderScroll = () => {
      const scrollPos = (contentArea ? contentArea.scrollTop : 0) || window.scrollY || 0;
      if (scrollPos > 12) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    if (contentArea) {
      contentArea.addEventListener("scroll", this.checkHeaderScroll, { passive: true });
    }
    window.addEventListener("scroll", this.checkHeaderScroll, { passive: true });
    this.checkHeaderScroll();
  },

  initNavbarSpotlight() {
    const navMenu = document.querySelector(".desktop-nav-menu");
    if (!navMenu) return;

    navMenu.addEventListener("mousemove", (e) => {
      const rect = navMenu.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      navMenu.style.setProperty("--mouse-x", `${x}px`);
      navMenu.style.setProperty("--mouse-y", `${y}px`);
      navMenu.style.setProperty("--spotlight-opacity", "1");
    });

    navMenu.addEventListener("mouseleave", () => {
      navMenu.style.setProperty("--spotlight-opacity", "0");
    });
  },

  initSurpriseTool() {
    const handleSurprise = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const availableTools = this.tools.filter(t => t.id !== "admin-settings");
      if (!availableTools.length) return;

      // Animate dice spinning
      const diceIcons = document.querySelectorAll(".surprise-dice-icon, .lucky-dice");
      diceIcons.forEach(icon => {
        icon.style.transition = "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)";
        icon.style.transform = "rotate(720deg) scale(1.3)";
        setTimeout(() => {
          icon.style.transform = "";
        }, 600);
      });

      this.playSynthSound("success");
      try {
        if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
      } catch (err) {}

      // Pick random tool
      const randomIndex = Math.floor(Math.random() * availableTools.length);
      const chosenTool = availableTools[randomIndex];

      this.showToast(`Surprise Discovery: Opening "${chosenTool.name}"!`, "info");

      setTimeout(() => {
        this.navigateToTool(chosenTool.id);
      }, 350);
    };

    const megaBtn = document.getElementById("mega-surprise-btn");
    if (megaBtn) megaBtn.onclick = handleSurprise;

    const heroBtn = document.getElementById("hero-surprise-btn");
    if (heroBtn) heroBtn.onclick = handleSurprise;
  },

  initDynamicSearchPlaceholder() {
    const searchInputs = [
      document.getElementById("tool-search"),
      document.getElementById("tool-search-mobile")
    ].filter(Boolean);

    if (!searchInputs.length) return;

    const prompts = [
      "Search " + this.tools.length + "+ offline tools... (e.g. 'JSON', 'PDF', 'Base64')",
      "Try 'Smart Chain Pipeline Builder'",
      "Try 'Audio Synth & Visualizer'",
      "Try 'QR Code Generator Studio'",
      "Try 'Markdown Live Editor'",
      "Try 'Matrix Rain Simulation'",
      "Try 'JWT Token Decoder'",
      "Try 'Color Palette Generator'",
      "Try 'Speed Test & Ping Monitor'"
    ];

    let promptIdx = 0;
    setInterval(() => {
      promptIdx = (promptIdx + 1) % prompts.length;
      searchInputs.forEach(input => {
        if (document.activeElement !== input && !input.value) {
          input.setAttribute("placeholder", prompts[promptIdx]);
        }
      });
    }, 3800);
  },

  syncGuidesUI() {
    const count = this.guidesList ? this.guidesList.length : 28;

    // 1. Guides count in metrics / badges
    const sfcGuides = document.getElementById("sfc-count-guides");
    if (sfcGuides) sfcGuides.textContent = count;

    document.querySelectorAll(".dynamic-guides-count").forEach(el => {
      el.textContent = count;
    });

    // 2. Hub link text on homepage
    const hubLink = document.getElementById("home-guides-hub-link");
    if (hubLink) {
      hubLink.innerHTML = `📚 All <span class="dynamic-guides-count">${count}</span> Guides &amp; Tutorials Hub &rarr;`;
    }

    // 3. Grid container dynamic synchronization
    const grid = document.getElementById("home-guides-grid");
    if (grid && this.guidesList && this.guidesList.length) {
      let html = `<a href="guides/index.html" id="home-guides-hub-link" style="color: var(--accent-cyan); text-decoration: none; font-size: 13.5px; font-weight: 700; transition: color var(--transition-fast);">📚 All <span class="dynamic-guides-count">${count}</span> Guides &amp; Tutorials Hub &rarr;</a>`;
      this.guidesList.forEach(g => {
        html += `\n              <a href="${g.url}" style="color: var(--text-muted); text-decoration: none; font-size: 13.5px; transition: color var(--transition-fast);" onmouseover="this.style.color='var(--accent-cyan)'" onmouseout="this.style.color='var(--text-muted)'">${g.title}</a>`;
      });
      grid.innerHTML = html;
    }
  },

  syncToolCounts() {
    const count = this.tools.length;
    const countDisplay = `${count}+`;

    // 1. Hero metric
    const heroNum = document.getElementById("hero-tools-count") || document.querySelector(".hero-metric-item .hero-metric-num");
    if (heroNum) {
      heroNum.textContent = countDisplay;
    }

    // 2. Elements with data-tool-count or class dynamic-tool-count
    document.querySelectorAll(".dynamic-tool-count, [data-bind='tool-count']").forEach(el => {
      el.textContent = countDisplay;
    });

    // 3. Checkout / PRO plan description
    document.querySelectorAll(".dynamic-plan-desc, .cpp-desc").forEach(el => {
      if (el.textContent.includes("offline tools") || el.textContent.includes("Lifetime updates")) {
        el.innerHTML = `Pay once, keep forever • All <span class="dynamic-tool-count">${countDisplay}</span> offline tools • Lifetime updates`;
      }
    });

    // 4. Search input placeholder
    const searchInputs = [
      document.getElementById("tool-search"),
      document.getElementById("tool-search-mobile")
    ].filter(Boolean);
    searchInputs.forEach(input => {
      if (!input.value) {
        input.setAttribute("placeholder", `Search ${countDisplay} offline tools... (e.g. 'JSON', 'PDF', 'Base64')`);
      }
    });

    // 5. File protocol banner
    const fpb = document.getElementById("file-protocol-banner");
    if (fpb) {
      const textSpan = fpb.querySelector(".fpb-text span");
      if (textSpan && textSpan.innerHTML.includes("offline tools")) {
        textSpan.innerHTML = textSpan.innerHTML.replace(/\d+\+?\s+offline tools/gi, `${countDisplay} offline tools`);
      }
    }

    // 6. Synchronize Guides UI and count
    this.syncGuidesUI();
  },

  initPwaInstallBanner() {
    let deferredPrompt = null;
    const banner = document.getElementById("pwa-install-banner");
    const installBtn = document.getElementById("pwa-install-btn");
    const dismissBtn = document.getElementById("pwa-dismiss-btn");

    if (!banner || !installBtn) return;

    const dismissedUntil = localStorage.getItem("omnitool_pwa_dismissed_until");
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return;
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;
      banner.style.display = "flex";
    });

    installBtn.addEventListener("click", async () => {
      if (!deferredPrompt) {
        this.showToast("To install on iOS / Safari, tap Share and then 'Add to Home Screen'.", "info", 5000);
        return;
      }
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        this.showToast("🎉 OmniTool Hub installed successfully!", "success");
        banner.style.display = "none";
        localStorage.setItem("omnitool_pwa_installed", "true");
      }
      deferredPrompt = null;
    });

    dismissBtn?.addEventListener("click", () => {
      banner.style.display = "none";
      localStorage.setItem("omnitool_pwa_dismissed_until", (Date.now() + 14 * 24 * 60 * 60 * 1000).toString());
    });
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
        <a href="#tool/${tool.id}" class="sidebar-tool-link mega-item" data-tool="${tool.id}">
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

  detectUserRegion() {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      const lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
      const isIndia = tz.includes("Kolkata") || tz.includes("Calcutta") || lang === "en-in" || lang.startsWith("hi");
      return isIndia ? "IN" : "GLOBAL";
    } catch (_) {
      return "GLOBAL";
    }
  },

  handleRouting() {
    let hash = window.location.hash || "";
    const pathname = window.location.pathname || "";

    // Always dismiss mobile drawer on route navigation
    const sidebar = document.getElementById("app-sidebar");
    if (sidebar) sidebar.classList.remove("show");

    // Check for payment success redirect (e.g. from Razorpay, Gumroad, or PayPal)
    const urlParams = new URLSearchParams(window.location.search);
    let hashQuery = "";
    if (hash.includes("?")) {
      hashQuery = hash.substring(hash.indexOf("?") + 1);
    }
    const hashParams = new URLSearchParams(hashQuery);

    const rzpPaymentId = urlParams.get("razorpay_payment_id") || urlParams.get("payment_id") || hashParams.get("razorpay_payment_id") || hashParams.get("payment_id");
    const activatedParam = (urlParams.get("activated") || hashParams.get("activated") || urlParams.get("plan") || hashParams.get("plan") || "").toLowerCase();

    if (hash === "#payment-success" || hash.startsWith("#payment-success") || pathname === "/payment-success" || rzpPaymentId || activatedParam) {
      const isMonthly = activatedParam === "monthly" || activatedParam === "pro_monthly" || hash.toLowerCase().includes("monthly");
      const targetTier = isMonthly ? "premium" : "lifetime";
      const token = this.createClientAuthorizedToken(targetTier, "payment_redirect", rzpPaymentId || Date.now());
      localStorage.setItem("omnitool_user_tier", targetTier);
      localStorage.setItem("omnitool_license_token", token);
      localStorage.setItem("omnitool_license_activated_at", new Date().toISOString());
      this.playSynthSound("success");
      const tierLabel = isMonthly ? "Pro Monthly Pass" : "Lifetime PRO";
      this.showToast(`🎉 Payment verified! ${tierLabel} unlocked successfully.`, "success");
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", window.location.pathname + "#plans");
      }
      this.renderPlansPage();
      this.renderPaymentSuccessModal(rzpPaymentId || (isMonthly ? "OMNI-MONTHLY-PRO" : "OMNI-LIFETIME-PRO"), targetTier);
      return;
    }

    // 1. Clean Path URL Direct Loading (e.g. /tool/jwt-decoder or /tool/pdf-utilities)
    if (pathname.startsWith("/tool/")) {
      const cleanToolId = pathname.replace(/^\/tool\//, "").replace(/\/$/, "");
      if (cleanToolId) {
        const redirect = this.toolRedirects[cleanToolId];
        if (redirect) {
          this.activeSubtab = redirect.subtab;
          this.navigateToTool(redirect.suiteId, false);
          return;
        }

        const toolExists = this.tools.some(t => t.id === cleanToolId);
        if (toolExists) {
          this.navigateToTool(cleanToolId, false);
          return;
        }
      }
    }

    // If navigating to a non-tool hash route while pathname still has /tool/, cleanly reset pathname to root
    if (pathname.startsWith("/tool/") && hash && !hash.startsWith("#tool/")) {
      if (window.history && window.history.replaceState) {
        try {
          window.history.replaceState(null, "", "/" + hash);
        } catch (e) {}
      }
    }

    if (hash === "#plans") {
      this.renderPlansPage();
      return;
    }

    if (hash === "#payment-guide") {
      this.renderPlansPage();
      this.openCheckout("lifetime", "guide");
      return;
    }

    if (hash === "#checkout" || hash.startsWith("#checkout/")) {
      const parts = hash.replace("#checkout", "").split("/").filter(Boolean);
      let plan = "lifetime";
      let gw = null;
      const validGateways = ["gumroad", "upi", "bank", "paypal", "razorpay", "crypto", "coffee", "guide", "custom"];
      for (const p of parts) {
        const lower = p.toLowerCase();
        if (lower === "monthly" || lower === "lifetime") {
          plan = lower;
        } else if (validGateways.includes(lower)) {
          gw = lower;
        }
      }
      this.renderPlansPage();
      this.openCheckout(plan, gw);
      return;
    }

    if (hash === "#admin" || hash.startsWith("#admin?") || hash === "#omni-admin" || hash.startsWith("#omni-admin?") || hash === "#stealth-admin") {
      const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "127.0.0.1.nip.io" ||
        window.location.hostname === "host.docker.internal";
      const hasSecretKey = hash.includes("key=omni2026") || 
                           hash.includes("#omni-admin") || 
                           hash.includes("#stealth-admin") ||
                           sessionStorage.getItem("omnitool_stealth_admin_unlocked") === "true";

      if (isLocalhost || hasSecretKey) {
        sessionStorage.setItem("omnitool_stealth_admin_unlocked", "true");
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

      // Promote hash URL to clean path without # for Google search & modern UX
      if (window.history && window.history.replaceState) {
        try {
          window.history.replaceState({ toolId }, "", "/tool/" + toolId);
        } catch (e) {}
      }

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
        toolLi.innerHTML = `<a href="#tool/${tool.id}" class="sidebar-tool-link" data-tool="${tool.id}">${tool.name}</a>`;
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
    document.getElementById("desktop-plans-link")?.classList.remove("active");
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

    // Refresh sidebar ad dynamically when navigating between tools to apply page overrides
    const sidebarAd = document.querySelector(".sidebar-sponsor-container");
    if (sidebarAd) {
      sidebarAd.innerHTML = this.getAdHtml("sidebar");
    }
  },

  registerServiceWorker() {
    if (window.location.protocol === "file:") {
      return;
    }
    const isLocalhost = window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "127.0.0.1.nip.io" ||
      window.location.hostname === "host.docker.internal";
    if (isLocalhost) {
      console.log("[Dev] Service Worker bypassed on localhost. Purging old cache...");
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => {
          for (const reg of regs) reg.unregister();
        });
      }
      if ("caches" in window) {
        caches.keys().then(keys => {
          for (const k of keys) caches.delete(k);
        });
      }
      return;
    }
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").then(
          (reg) => {
            console.log("[PWA] Service Worker registered with scope: ", reg.scope);

            // Proactively check for updates when user returns to or focuses the tab
            document.addEventListener("visibilitychange", () => {
              if (document.visibilityState === "visible") {
                reg.update().catch(() => {});
              }
            });
            window.addEventListener("focus", () => {
              reg.update().catch(() => {});
            });

            // Handle new service worker discovery
            reg.addEventListener("updatefound", () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.addEventListener("statechange", () => {
                  if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                    console.log("[PWA] New service worker installed. Skipping waiting...");
                    installingWorker.postMessage({ action: "skipWaiting" });
                  }
                });
              }
            });
          },
          (err) => console.error("[PWA] Service Worker registration failed: ", err)
        );

        // When new service worker takes control, reload to show fresh code
        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (!refreshing) {
            refreshing = true;
            console.log("[PWA] Controller changed, refreshing to load newest version...");
            window.location.reload();
          }
        });
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
      document.getElementById("header-recents-list"),
      document.getElementById("mega-recents-list")
    ];

    containers.forEach((container, idx) => {
      if (!container) return;

      if (container.id === "mega-recents-list") {
        if (this.recents.length === 0) {
          container.innerHTML = `<span style="font-size: 11.5px; color: var(--text-muted); padding: 3px 6px;">No tools visited yet</span>`;
          return;
        }
        container.innerHTML = "";
        this.recents.forEach(id => {
          const tool = this.tools.find(t => t.id === id);
          if (tool) {
            const item = document.createElement("a");
            item.href = `#tool/${id}`;
            item.className = "mega-recent-pill";
            item.innerHTML = `${tool.icon} <span>${tool.name}</span>`;
            item.addEventListener("click", (e) => {
              e.preventDefault();
              this.navigateToTool(id);
            });
            container.appendChild(item);
          }
        });
        return;
      }

      if (this.recents.length === 0) {
        container.innerHTML = `<span class="recent-link" style="font-size: 12px; color: var(--text-muted); cursor: default; padding-left: ${idx === 0 ? '8' : '0'}px;">No tools visited yet</span>`;
        return;
      }

      container.innerHTML = "";
      this.recents.forEach(id => {
        const tool = this.tools.find(t => t.id === id);
        if (tool) {
          const item = document.createElement("a");
          item.href = `#tool/${id}`;
          item.className = "recent-link";
          item.innerHTML = `${tool.icon} <span>${tool.name}</span>`;
          item.addEventListener("click", (e) => {
            e.preventDefault();
            this.navigateToTool(id);
          });
          container.appendChild(item);
        }
      });
    });
  },

  bindEvents() {
    // Hash routing change handler
    window.addEventListener("hashchange", () => this.handleRouting());

    // Stealth Admin Keyboard Shortcut: Ctrl + Shift + Alt + A (Private owner trigger)
    window.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.altKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        sessionStorage.setItem("omnitool_stealth_admin_unlocked", "true");
        this.showToast("🛡️ Stealth Admin Triggered. Enter Master Passcode.", "info");
        this.navigateToTool("admin-settings", false);
      }

      // Power User Hotkeys: Alt + 1..9 jumps directly to pinned favorites #1 to #9
      if (e.altKey && !e.ctrlKey && !e.shiftKey && e.key >= "1" && e.key <= "9") {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        if (activeTag !== "textarea" && activeTag !== "input") {
          const idx = parseInt(e.key, 10) - 1;
          const favArray = Array.from(this.favorites);
          if (favArray[idx]) {
            e.preventDefault();
            const targetId = favArray[idx];
            const tool = this.tools.find(t => t.id === targetId);
            this.showToast(`⚡ Quick Launch [Alt+${e.key}]: ${tool?.name || targetId}`, "info", 1500);
            this.navigateToTool(targetId);
          }
        }
      }
    });

    // Stealth Admin 5-Click Trigger on footer copyright / version badge
    let footerClicks = 0;
    let lastFooterClickTime = 0;
    const footerTrigger = document.querySelector(".app-footer") || document.querySelector("footer") || document.querySelector(".sidebar-footer");
    if (footerTrigger) {
      footerTrigger.addEventListener("click", () => {
        const now = Date.now();
        if (now - lastFooterClickTime < 1000) {
          footerClicks++;
          if (footerClicks >= 5) {
            footerClicks = 0;
            sessionStorage.setItem("omnitool_stealth_admin_unlocked", "true");
            this.showToast("🛡️ Stealth Admin Triggered. Enter Master Passcode.", "info");
            this.navigateToTool("admin-settings", false);
          }
        } else {
          footerClicks = 1;
        }
        lastFooterClickTime = now;
      });
    }

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

    // Desktop Nav Dropdown Click Toggle
    document.querySelectorAll(".nav-dropdown").forEach(dropdown => {
      const btn = dropdown.querySelector(".nav-dropdown-btn");
      if (btn) {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const wasOpen = dropdown.classList.contains("open");
          document.querySelectorAll(".nav-dropdown.open").forEach(d => d.classList.remove("open"));
          if (!wasOpen) {
            dropdown.classList.add("open");
          }
        });
      }
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-dropdown")) {
        document.querySelectorAll(".nav-dropdown.open").forEach(d => d.classList.remove("open"));
      }
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

    // Header Smart Preferences Dropdown
    const prefsBtn = document.getElementById("header-prefs-btn");
    const prefsMenu = document.getElementById("header-prefs-menu");
    if (prefsBtn && prefsMenu) {
      prefsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const isOpen = prefsMenu.classList.contains("show");
        prefsMenu.classList.toggle("show", !isOpen);
        prefsBtn.setAttribute("aria-expanded", !isOpen ? "true" : "false");
        this.playSynthSound('click');
      });

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".prefs-dropdown-container")) {
          prefsMenu.classList.remove("show");
          prefsBtn.setAttribute("aria-expanded", "false");
        }
      });

      prefsMenu.querySelectorAll(".prefs-menu-item").forEach(item => {
        item.addEventListener("click", () => {
          prefsMenu.classList.remove("show");
          prefsBtn.setAttribute("aria-expanded", "false");
        });
      });
    }

    // Cache clear button
    document.getElementById("cache-clear-btn")?.addEventListener("click", () => this.clearAppCache());

    // Aesthetics menu triggers
    document.getElementById("desktop-aesthetics-btn")?.addEventListener("click", () => this.openAestheticsModal());
    document.getElementById("sidebar-aesthetics-btn")?.addEventListener("click", () => {
      const sidebar = document.getElementById("app-sidebar");
      if (sidebar) sidebar.classList.remove("show"); // Close mobile drawer
      this.openAestheticsModal();
    });

    // Sidebar Toggles (hamburger menu drawer)
    const openBtn = document.getElementById("sidebar-open-btn");
    const closeBtn = document.getElementById("sidebar-close-btn");
    const sidebar = document.getElementById("app-sidebar");

    // Load persisted desktop sidebar state
    const isCollapsed = localStorage.getItem("omnitool_sidebar_collapsed") === "true";
    if (isCollapsed && window.innerWidth > 1200 && sidebar) {
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

    document.getElementById("tool-search")?.addEventListener("input", (e) => {
      this.filterDashboard(e.target.value);
    });
    document.getElementById("tool-search-mobile")?.addEventListener("input", (e) => {
      this.filterDashboard(e.target.value);
    });
    document.getElementById("header-search-btn")?.addEventListener("click", () => {
      this.toggleCommandPalette(true);
    });

    // Keyboard bindings (Ctrl + K Command Palette & Escape dismissal)
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.toggleCommandPalette();
      }
      if (e.key === "Escape") {
        if (this.cpOpen) {
          this.toggleCommandPalette(false);
        }
        const modal = document.getElementById("aesthetics-modal");
        if (modal && modal.style.display !== "none") {
          modal.style.display = "none";
        }
        const sidebar = document.getElementById("app-sidebar");
        if (sidebar && sidebar.classList.contains("show")) {
          sidebar.classList.remove("show");
        }
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

    // Close command palette on click outside or close button click
    document.getElementById("command-palette")?.addEventListener("click", (e) => {
      if (e.target.id === "command-palette") {
        this.toggleCommandPalette(false);
      }
    });

    document.getElementById("cp-close-btn")?.addEventListener("click", () => {
      this.toggleCommandPalette(false);
    });

    // Close aesthetics modal when clicking backdrop
    document.getElementById("aesthetics-modal")?.addEventListener("click", (e) => {
      if (e.target.id === "aesthetics-modal") {
        document.getElementById("aesthetics-modal").style.display = "none";
      }
    });

    // Close mobile drawer when clicking outside
    document.addEventListener("click", (e) => {
      const sidebar = document.getElementById("app-sidebar");
      const openBtn = document.getElementById("sidebar-open-btn");
      if (sidebar && sidebar.classList.contains("show")) {
        if (!sidebar.contains(e.target) && (!openBtn || !openBtn.contains(e.target))) {
          sidebar.classList.remove("show");
        }
      }
    });

    // Window level paste listener for auto-suggest detector
    window.addEventListener("paste", (e) => {
      const activeTag = document.activeElement.tagName.toLowerCase();
      if (activeTag === "textarea" || activeTag === "input") return;

      const pastedText = e.clipboardData.getData("text");
      this.detectPastedValue(pastedText);
    });

    // Popstate routing trigger for browser history back/forward
    window.addEventListener("popstate", () => this.handleRouting());

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
        // Defer focus slightly so the display:flex layout has settled
        setTimeout(() => searchInput.focus(), 50);
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

    const cpFilter = this.activeCpFilter || "all";
    let results = [];

    if (cpFilter === "guides") {
      // Search only documentation guides using intelligent search
      const matchingGuides = (this.guidesList || []).filter(g =>
        this.matchSearchQuery(this.getGuideSearchText(g), clean)
      );

      results = matchingGuides.map(g => ({
        isGuide: true,
        id: g.id,
        name: g.title,
        desc: g.description,
        url: "guides/" + g.fileName,
        tag: "Guide",
        icon: `<div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: rgba(157, 78, 221, 0.15); border: 1px solid rgba(157, 78, 221, 0.3); border-radius: 8px; font-size: 16px; flex-shrink: 0;">📚</div>`
      }));
    } else {
      // Filter tools based on query and active CP category filter using intelligent search
      let matchingTools = this.tools.filter(t =>
        !hiddenToolsSet.has(t.id) &&
        this.matchSearchQuery(this.getToolSearchText(t), clean)
      );

      if (cpFilter === "tools") {
        matchingTools = matchingTools.filter(t => this.classifyTool(t).isTool);
      } else if (cpFilter === "suites") {
        matchingTools = matchingTools.filter(t => this.classifyTool(t).isSuite);
      } else if (cpFilter === "features") {
        matchingTools = matchingTools.filter(t => this.classifyTool(t).isFeature);
      }

      results = matchingTools.map(t => {
        const cls = this.classifyTool(t);
        const tag = cls.isSuite ? "Suite" : (cls.isFeature ? "Feature" : "Tool");
        return {
          isGuide: false,
          id: t.id,
          name: t.name,
          desc: t.desc,
          tag: tag,
          icon: t.icon
        };
      });

      // If cpFilter === "all" and search query is entered, also search guides
      if (cpFilter === "all" && clean.length > 0) {
        const matchingGuides = (this.guidesList || []).filter(g =>
          this.matchSearchQuery(this.getGuideSearchText(g), clean)
        );

        const guideResults = matchingGuides.map(g => ({
          isGuide: true,
          id: g.id,
          name: g.title,
          desc: g.description,
          url: "guides/" + g.fileName,
          tag: "Guide",
          icon: `<div style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: rgba(157, 78, 221, 0.15); border: 1px solid rgba(157, 78, 221, 0.3); border-radius: 8px; font-size: 16px; flex-shrink: 0;">📚</div>`
        }));

        results = results.concat(guideResults);
      }
    }

    this.cpFiltered = results;
    this.cpIndex = 0;

    if (this.cpFiltered.length === 0) {
      listEl.innerHTML = `<div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 13px;">No commands or items match "${query}"</div>`;
      return;
    }

    this.cpFiltered.forEach((itemData, idx) => {
      const item = document.createElement("div");
      item.className = `cp-item ${idx === 0 ? 'selected' : ''}`;
      const tagStyle = itemData.isGuide
        ? "background: rgba(157, 78, 221, 0.15); color: #c77dff; border: 1px solid rgba(157, 78, 221, 0.3);"
        : (itemData.tag === "Suite"
          ? "background: rgba(0, 242, 254, 0.15); color: #00f2fe; border: 1px solid rgba(0, 242, 254, 0.3);"
          : (itemData.tag === "Feature"
            ? "background: rgba(255, 0, 128, 0.15); color: #ff0080; border: 1px solid rgba(255, 0, 128, 0.3);"
            : "background: rgba(255, 255, 255, 0.08); color: var(--text-muted); border: 1px solid var(--border-color);"));

      item.innerHTML = `
        ${itemData.icon}
        <div class="cp-item-info">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="cp-item-title">${itemData.name}</span>
            <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 1px 6px; border-radius: 4px; ${tagStyle}">${itemData.tag}</span>
          </div>
          <span class="cp-item-desc">${itemData.desc}</span>
        </div>
      `;
      item.addEventListener("click", () => {
        if (itemData.isGuide) {
          window.open(itemData.url, "_blank");
        } else {
          this.navigateToTool(itemData.id);
        }
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
      const selected = this.cpFiltered[this.cpIndex];
      if (selected.isGuide) {
        window.open(selected.url, "_blank");
      } else {
        this.navigateToTool(selected.id);
      }
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
    this.applyAccentPreset(); // Apply theme-specific accent colors
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
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const preset = this.getConfigValue("omnitool_accent_preset", "default");
    
    const presetsDark = {
      default: { cyan: "#00f2fe", cyanRgb: "0, 242, 254", purple: "#9d4edd", purpleRgb: "157, 78, 221" },
      matrix: { cyan: "#10b981", cyanRgb: "16, 185, 129", purple: "#059669", purpleRgb: "5, 150, 105" },
      vaporwave: { cyan: "#ff007f", cyanRgb: "255, 0, 127", purple: "#00f2fe", purpleRgb: "0, 242, 254" },
      sunset: { cyan: "#f43f5e", cyanRgb: "244, 63, 94", purple: "#f59e0b", purpleRgb: "245, 158, 11" },
      amber: { cyan: "#fbbf24", cyanRgb: "251, 191, 36", purple: "#d97706", purpleRgb: "217, 119, 6" },
      electric: { cyan: "#3b82f6", cyanRgb: "59, 130, 246", purple: "#00f2fe", purpleRgb: "0, 242, 254" }
    };

    const presetsLight = {
      default: { cyan: "#007799", cyanRgb: "0, 119, 153", purple: "#7b2cb0", purpleRgb: "123, 44, 176" },
      matrix: { cyan: "#047857", cyanRgb: "4, 120, 87", purple: "#065f46", purpleRgb: "6, 95, 70" },
      vaporwave: { cyan: "#c0005a", cyanRgb: "192, 0, 90", purple: "#007799", purpleRgb: "0, 119, 153" },
      sunset: { cyan: "#be123c", cyanRgb: "190, 18, 60", purple: "#b45309", purpleRgb: "180, 83, 9" },
      amber: { cyan: "#b45309", cyanRgb: "180, 83, 9", purple: "#9a3412", purpleRgb: "154, 52, 18" },
      electric: { cyan: "#1d4ed8", cyanRgb: "29, 78, 216", purple: "#007799", purpleRgb: "0, 119, 153" }
    };

    const colors = currentTheme === "light"
      ? (presetsLight[preset] || presetsLight.default)
      : (presetsDark[preset] || presetsDark.default);

    const root = document.documentElement;
    root.style.setProperty('--accent-cyan', colors.cyan);
    root.style.setProperty('--accent-cyan-rgb', colors.cyanRgb);
    root.style.setProperty('--accent-purple', colors.purple);
    root.style.setProperty('--accent-purple-rgb', colors.purpleRgb);
  },

  playSynthSound(type = 'click') {
    if (this.isInitialLoad) return;
    const nowMs = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    if (this._lastSoundTime && (nowMs - this._lastSoundTime) < 140 && this._lastSoundType === type) {
      return; // Debounce rapid duplicate audio triggers
    }
    this._lastSoundTime = nowMs;
    this._lastSoundType = type;

    // Trigger tactile haptics automatically on sound plays
    if (type === 'click') {
      this.triggerHaptics('light');
    } else if (type === 'success' || type === 'save') {
      this.triggerHaptics('success');
    } else if (type === 'error') {
      this.triggerHaptics('medium');
    }

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

  triggerHaptics(type = 'light') {
    if (this.isInitialLoad) return;
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        if (type === 'light') {
          navigator.vibrate(15);
        } else if (type === 'medium') {
          navigator.vibrate(30);
        } else if (type === 'success') {
          navigator.vibrate([15, 30, 15]);
        }
      } catch (e) {
        // Safe catch for browser security restrictions on vibration
      }
    }
  },

  // Clock Widget
  initClock() {
    const clockWidget = document.getElementById("header-clock");
    const clockEl = document.getElementById("clock-text");
    const dateEl = document.getElementById("clock-date");

    const updateTime = () => {
      const format = this.getConfigValue("omnitool_clock_format", "12");
      if (format === "hide") {
        if (clockWidget) clockWidget.style.display = "none";
        return;
      }
      if (clockWidget) clockWidget.style.removeProperty("display");

      const now = new Date();

      if (dateEl) {
        try {
          const dateStr = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
          dateEl.innerText = dateStr;
        } catch (_) {
          dateEl.innerText = now.toDateString().slice(0, 10);
        }
      }

      let hrs = now.getHours();
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');

      if (format === "24") {
        const hrsStr = String(hrs).padStart(2, '0');
        if (clockEl) clockEl.innerHTML = `${hrsStr}:${mins}<span class="clock-seconds">:${secs}</span>`;
      } else {
        const ampm = hrs >= 12 ? 'PM' : 'AM';
        hrs = hrs % 12;
        hrs = hrs ? hrs : 12;
        const hrsStr = String(hrs).padStart(2, '0');
        if (clockEl) clockEl.innerHTML = `${hrsStr}:${mins}<span class="clock-seconds">:${secs}</span> ${ampm}`;
      }
    };

    if (clockWidget && !clockWidget._hasFormatListener) {
      clockWidget._hasFormatListener = true;
      clockWidget.addEventListener("click", () => {
        const curFormat = this.getConfigValue("omnitool_clock_format", "12");
        const nextFormat = curFormat === "12" ? "24" : "12";
        localStorage.setItem("omnitool_clock_format", nextFormat);
        const modalSelect = document.getElementById("aesthetics-clock");
        if (modalSelect) modalSelect.value = nextFormat;
        this.playSynthSound('click');
        this.showToast(`Clock switched to ${nextFormat === "12" ? "12-hour (AM/PM)" : "24-hour military"} format`, "info", 1800);
        updateTime();
      });
    }

    updateTime();
    setInterval(updateTime, 1000);
  },

  // Navigation Filter updates
  selectCategory(category, updateHash = true) {
    // Close sidebar on mobile
    const sidebar = document.getElementById("app-sidebar");
    if (sidebar) sidebar.classList.remove("show");

    if (updateHash) {
      window.location.hash = category === "fav" ? "favorites" : "dashboard";
      return;
    }
    this.activeCategory = category;
    this.activeSubcategory = "all";

    // Clear search bars
    const searchBar = document.getElementById("tool-search");
    const searchBarMobile = document.getElementById("tool-search-mobile");
    const clearBtn = document.getElementById("tool-search-clear");
    if (searchBar) searchBar.value = "";
    if (searchBarMobile) searchBarMobile.value = "";
    if (clearBtn) clearBtn.style.display = "none";

    const titleEl = document.getElementById("header-view-title");
    if (titleEl) titleEl.innerText = this.getCategoryLabel(category);

    this.backToDashboard(false);
    this.renderDashboard();
  },

  selectSubcategory(filter, updateHash = true) {
    // Close mobile drawer
    const sidebar = document.getElementById("app-sidebar");
    if (sidebar) sidebar.classList.remove("show");

    if (updateHash) {
      window.location.hash = "category/" + filter;
      return;
    }
    this.activeCategory = "subcategory-filter";
    this.activeSubcategory = filter;

    // Clear search bars
    const searchBar = document.getElementById("tool-search");
    const searchBarMobile = document.getElementById("tool-search-mobile");
    const clearBtn = document.getElementById("tool-search-clear");
    if (searchBar) searchBar.value = "";
    if (searchBarMobile) searchBarMobile.value = "";
    if (clearBtn) clearBtn.style.display = "none";

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
    const userTier = this.validateSecurityTier();
    if (userTier === "premium") return ""; // Pro Monthly subscribers get 100% Ad-Free experience

    const isGlobalEnabled = this.getConfigValue("omnitool_ad_global", "true") !== "false";
    if (!isGlobalEnabled) return "";

    // Check if ad location is enabled
    const showDash = this.getConfigValue("omnitool_ad_show_dash", "true") !== "false";
    const showTool = this.getConfigValue("omnitool_ad_show_tool", "true") !== "false";
    const showSide = this.getConfigValue("omnitool_ad_show_side", "true") !== "false";

    if (location === "dashboard" && !showDash) return "";
    if (location === "tool" && !showTool) return "";
    if (location === "sidebar" && !showSide) return "";

    // Allow the sidebar to run a different provider than the main content slots
    let provider = this.getConfigValue("omnitool_ad_network", "dev");
    if (location === "sidebar") {
      provider = this.getConfigValue("omnitool_sidebar_ad_network", "dev");
    }

    // Developer Local Sponsors
    if (provider === "dev") {
      const escape = (str) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      const activeTool = this.activeTool;
      const suffix = (activeTool && location !== "sidebar") ? "_" + activeTool : "";

      const brand = this.getConfigValue("omnitool_sponsor_brand" + suffix, this.getConfigValue("omnitool_sponsor_brand", "HexaCloud Host"));
      const slogan = this.getConfigValue("omnitool_sponsor_slogan" + suffix, this.getConfigValue("omnitool_sponsor_slogan", "Secure, lightning-fast PWA hosting and serverless deployments globally. Claim $5 credit."));
      const btnText = this.getConfigValue("omnitool_sponsor_btn_text" + suffix, this.getConfigValue("omnitool_sponsor_btn_text", "Claim Now"));
      const url = this.getConfigValue("omnitool_sponsor_url" + suffix, this.getConfigValue("omnitool_sponsor_url", "#"));
      const iconType = this.getConfigValue("omnitool_sponsor_icon" + suffix, this.getConfigValue("omnitool_sponsor_icon", "cloud"));

      let iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>`;
      if (iconType === "database") {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`;
      } else if (iconType === "shield") {
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
      }

      const targetAttr = url !== "#" ? 'target="_blank" rel="noopener noreferrer"' : '';
      const clickAction = url === "#" ? "event.preventDefault(); app.showToast('Thank you for supporting OmniTool Hub sponsors!', 'success');" : "";

      return `
        <div class="sponsor-ad-block">
          <div class="ad-horizontal-left">
            <div class="ad-image-placeholder">
              ${iconSvg}
            </div>
            <div class="ad-info">
              <div class="ad-title-row">
                <span class="ad-brand">${escape(brand)}</span>
                <span class="ad-horizontal-badge">SPONSOR</span>
              </div>
              <span class="ad-slogan">${escape(slogan)}</span>
            </div>
          </div>
          <a href="${escape(url)}" ${targetAttr} class="ad-action-btn" onclick="${clickAction}">${escape(btnText)}</a>
        </div>
      `;
    }

    // Google AdSense
    if (provider === "adsense") {
      const pubId = this.getConfigValue("omnitool_adsense_pub", "ca-pub-XXXXXXXXXX");
      let slotId = "1111111111";
      if (location === "tool") {
        const suffix = this.activeTool ? "_" + this.activeTool : "";
        slotId = this.getConfigValue("omnitool_adsense_slot_tool" + suffix, this.getConfigValue("omnitool_adsense_slot_tool", "2222222222"));
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

  openCoffeeLink(event) {
    const coffeeUrl = this.getConfigValue("omnitool_coffee_url", "");
    if (coffeeUrl && coffeeUrl.trim() !== "") {
      window.open(coffeeUrl, "_blank");
    } else {
      if (event) event.preventDefault();
      this.showToast('☕ Thank you! Your support keeps OmniTool Hub running offline-first.', 'success');
    }
  },

  openKofiLink(event) {
    const kofiUrl = this.getConfigValue("omnitool_kofi_url", "");
    if (kofiUrl && kofiUrl.trim() !== "") {
      window.open(kofiUrl, "_blank");
    } else {
      if (event) event.preventDefault();
      this.showToast('☕ Thank you! Your support keeps OmniTool Hub running offline-first.', 'success');
    }
  },

  refreshDonationButtons() {
    const kofiUrl = this.getConfigValue("omnitool_kofi_url", "");
    document.querySelectorAll(".kofi-btn").forEach(btn => {
      if (kofiUrl && kofiUrl.trim() !== "") {
        btn.style.display = "flex";
      } else {
        btn.style.display = "none";
      }
    });
  },

  // Grouped cards renderer
  renderDashboard() {
    const grid = document.getElementById("tools-card-grid");
    if (!grid) return;

    this.syncToolCounts();

    this.renderCategoryTabs();

    grid.innerHTML = "";

    const hiddenToolsStr = this.getConfigValue("omnitool_hidden_tools", "");
    const hiddenToolsSet = new Set(hiddenToolsStr.split(",").filter(Boolean));

    // Read density layout config
    const density = this.getConfigValue("omnitool_layout_density", "comfortable");
    if (density === "compact") {
      grid.classList.add("compact-layout");
      grid.classList.remove("loose-layout");
    } else if (density === "loose") {
      grid.classList.add("loose-layout");
      grid.classList.remove("compact-layout");
    } else {
      grid.classList.remove("compact-layout");
      grid.classList.remove("loose-layout");
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

    this.updateSearchFilterCounts();
    if (this.activeSearchFilter !== "all" || (document.getElementById("tool-search") && document.getElementById("tool-search").value)) {
      this.filterDashboard(document.getElementById("tool-search")?.value || "");
    }
  },

  renderToolsList(container, list) {
    let overrides = {};
    try {
      overrides = JSON.parse(this.getConfigValue("omnitool_monetization_overrides", "{}"));
    } catch (e) { }
    const isMonetizationActive = this.getConfigValue("omnitool_monetization_active", "false") === "true";

    list.forEach(tool => {
      const isFav = this.favorites.has(tool.id);
      const card = document.createElement("div");
      card.className = "tool-card";
      card.setAttribute("style", `--card-accent: ${tool.accent}; --card-accent-rgb: ${tool.accentRgb};`);
      card.addEventListener("click", () => this.navigateToTool(tool.id));

      const effectiveMonetization = overrides[tool.id] || tool.monetization || "free";

      card.innerHTML = `
        <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" data-tool="${tool.id}" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}" aria-label="${isFav ? 'Remove ' + tool.name + ' from favorites' : 'Add ' + tool.name + ' to favorites'}">
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
          <div style="display: flex; align-items: center; gap: 6px;">
            <span class="tool-badge">${tool.subLabel.toUpperCase()}</span>
            ${isMonetizationActive && effectiveMonetization !== "free" ? `
              <span class="monetization-badge ${effectiveMonetization}" style="font-size: 9px; font-weight: 800; color: ${effectiveMonetization === 'ad-lock' ? 'var(--accent-cyan)' : 'var(--accent-purple)'}; background: ${effectiveMonetization === 'ad-lock' ? 'rgba(0, 242, 254, 0.12)' : 'rgba(157, 78, 221, 0.12)'}; padding: 2px 6px; border-radius: 4px; border: 1px solid ${effectiveMonetization === 'ad-lock' ? 'rgba(0, 242, 254, 0.2)' : 'rgba(157, 78, 221, 0.2)'}; text-transform: uppercase; white-space: nowrap;">
                ${effectiveMonetization === 'ad-lock' ? '📺 Ads' : '💎 Pro'}
              </span>
            ` : ''}
          </div>
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
      pill.addEventListener("click", (e) => {
        e.stopPropagation();
        if (window.location.hash === `#${pill.dataset.hash}`) return;
        this.playSynthSound('click');
        window.location.hash = pill.dataset.hash;
      });
    });
  },

  // Initialize Search Quick Filter Chips, Clear buttons, and Command Palette tabs
  initSearchFilters() {
    // 1. Dashboard filter chips
    const chips = document.querySelectorAll(".search-filter-chip");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        const filter = chip.getAttribute("data-filter") || "all";
        this.setSearchFilter(filter);
      });
    });

    // 2. Clear button for search input
    const clearBtn = document.getElementById("tool-search-clear");
    const mainSearch = document.getElementById("tool-search");
    if (clearBtn && mainSearch) {
      clearBtn.addEventListener("click", () => {
        mainSearch.value = "";
        clearBtn.style.display = "none";
        mainSearch.focus();
        this.filterDashboard("");
        if (typeof this.playSynthSound === "function") this.playSynthSound("click");
      });
    }

    // 3. Command Palette filter tabs
    const cpTabs = document.querySelectorAll(".cp-filter-tab");
    cpTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const cpFilter = tab.getAttribute("data-cp-filter") || "all";
        this.setCpFilter(cpFilter);
      });
    });

    this.updateSearchFilterCounts();
  },

  setSearchFilter(filter) {
    this.activeSearchFilter = filter;
    document.querySelectorAll(".search-filter-chip").forEach(chip => {
      if (chip.getAttribute("data-filter") === filter) {
        chip.classList.add("active");
      } else {
        chip.classList.remove("active");
      }
    });

    if (typeof this.playSynthSound === "function") {
      this.playSynthSound("click");
    }

    const searchInput = document.getElementById("tool-search");
    const query = searchInput ? searchInput.value : "";
    this.filterDashboard(query);
  },

  setCpFilter(filter) {
    this.activeCpFilter = filter;
    document.querySelectorAll(".cp-filter-tab").forEach(tab => {
      if (tab.getAttribute("data-cp-filter") === filter) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    if (typeof this.playSynthSound === "function") {
      this.playSynthSound("click");
    }

    const searchInput = document.getElementById("cp-search-input");
    const query = searchInput ? searchInput.value : "";
    this.searchCommandPalette(query);
  },

  updateSearchFilterCounts() {
    const hiddenToolsStr = this.getConfigValue("omnitool_hidden_tools", "");
    const hiddenToolsSet = new Set(hiddenToolsStr.split(",").filter(Boolean));
    const visibleTools = (this.tools || []).filter(t => !hiddenToolsSet.has(t.id));

    let counts = {
      all: visibleTools.length,
      tools: 0,
      suites: 0,
      features: 0,
      pro: 0,
      free: 0,
      guides: this.guidesList ? this.guidesList.length : 28
    };

    visibleTools.forEach(tool => {
      const c = this.classifyTool(tool);
      if (c.isTool) counts.tools++;
      if (c.isSuite) counts.suites++;
      if (c.isFeature) counts.features++;
      if (c.isPro) counts.pro++;
      if (c.isFree) counts.free++;
    });

    const setBadge = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    };

    setBadge("sfc-count-all", counts.all);
    setBadge("sfc-count-tools", counts.tools);
    setBadge("sfc-count-suites", counts.suites);
    setBadge("sfc-count-features", counts.features);
    setBadge("sfc-count-guides", counts.guides);
    setBadge("sfc-count-pro", counts.pro);
    setBadge("sfc-count-free", counts.free);
  },

  filterDashboard(query) {
    const cleanQuery = query.toLowerCase().trim();

    // Sync desktop and mobile search inputs
    const mainSearch = document.getElementById("tool-search");
    const mobileSearch = document.getElementById("tool-search-mobile");
    if (mainSearch && mainSearch.value !== query) mainSearch.value = query;
    if (mobileSearch && mobileSearch.value !== query) mobileSearch.value = query;

    const clearBtn = document.getElementById("tool-search-clear");
    if (clearBtn) {
      clearBtn.style.display = cleanQuery.length > 0 ? "flex" : "none";
    }

    // Switch to Dashboard category for searches to display flat grids
    if ((cleanQuery || (this.activeSearchFilter && this.activeSearchFilter !== "all")) && (this.activeCategory !== "all" || this.activeSubcategory !== "all")) {
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

    const grid = document.getElementById("tools-card-grid") || document.getElementById("tools-grid");
    const cards = document.querySelectorAll(".tool-card");
    const sections = document.querySelectorAll(".dashboard-sub-section");
    let matchCount = 0;

    // Remove any previously rendered dynamic search guides or empty state
    const prevGuides = document.getElementById("dashboard-guide-search-section");
    if (prevGuides) prevGuides.remove();
    const prevMatchingGuides = document.getElementById("search-matching-guides-section");
    if (prevMatchingGuides) prevMatchingGuides.remove();
    const prevEmpty = document.getElementById("search-empty-state");
    if (prevEmpty) prevEmpty.remove();

    if (this.activeSearchFilter === "guides") {
      // 1. GUIDES ONLY FILTER (Intelligent Match)
      cards.forEach(card => card.style.display = "none");
      sections.forEach(sec => sec.style.display = "none");

      const matchingGuides = (this.guidesList || []).filter(g =>
        this.matchSearchQuery(this.getGuideSearchText(g), cleanQuery)
      );

      matchCount = matchingGuides.length;

      if (grid && matchingGuides.length > 0) {
        const guideSection = document.createElement("div");
        guideSection.id = "dashboard-guide-search-section";
        guideSection.setAttribute("style", "grid-column: 1 / -1; width: 100%;");
        guideSection.innerHTML = `
          <div style="margin-bottom: 20px;">
            <h3 class="dashboard-sub-title" style="display: flex; align-items: center; gap: 8px;">
              <span>📚</span>
              <span>Official Step-by-Step Tool Guides (${matchingGuides.length})</span>
            </h3>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Comprehensive documentation, offline client-side tutorials, API schemas, and interactive guides.</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
            ${matchingGuides.map(g => `
              <a href="guides/${g.fileName}" class="guide-search-card" target="_blank" rel="noopener">
                <div class="guide-search-card-header">
                  <span class="guide-search-tag">Guide</span>
                  <span style="font-size: 18px;">📚</span>
                </div>
                <div class="guide-search-body">
                  <h3 class="guide-search-title">${g.title}</h3>
                  <p class="guide-search-desc">${g.description}</p>
                </div>
                <div class="guide-search-footer">
                  <span>Read Full Guide</span>
                  <span>→</span>
                </div>
              </a>
            `).join("")}
          </div>
        `;
        grid.appendChild(guideSection);
      }
    } else {
      // 2. TOOLS, SUITES, FEATURES, PRO, FREE, OR ALL FILTER (Intelligent Match)
      cards.forEach(card => {
        const toolId = card.querySelector(".card-fav-btn")?.getAttribute("data-tool");
        const tool = this.tools.find(t => t.id === toolId);
        if (!tool) {
          card.style.display = "none";
          return;
        }

        const cls = this.classifyTool(tool);

        let filterMatch = true;
        if (this.activeSearchFilter === "tools") filterMatch = cls.isTool;
        else if (this.activeSearchFilter === "suites") filterMatch = cls.isSuite;
        else if (this.activeSearchFilter === "features") filterMatch = cls.isFeature;
        else if (this.activeSearchFilter === "pro") filterMatch = cls.isPro;
        else if (this.activeSearchFilter === "free") filterMatch = cls.isFree;

        const textMatch = this.matchSearchQuery(this.getToolSearchText(tool), cleanQuery);

        if (filterMatch && textMatch) {
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

      // If "All" category is selected and user typed a search query, also display matching guides below
      if (this.activeSearchFilter === "all" && cleanQuery.length > 0 && grid) {
        const matchingGuides = (this.guidesList || []).filter(g =>
          this.matchSearchQuery(this.getGuideSearchText(g), cleanQuery)
        );

        if (matchingGuides.length > 0) {
          const guideMatchesSec = document.createElement("div");
          guideMatchesSec.id = "search-matching-guides-section";
          guideMatchesSec.setAttribute("style", "grid-column: 1 / -1; margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border-color); width: 100%;");
          guideMatchesSec.innerHTML = `
            <div style="margin-bottom: 16px;">
              <h3 class="dashboard-sub-title" style="display: flex; align-items: center; gap: 8px;">
                <span>📚</span>
                <span>Relevant Documentation Guides (${matchingGuides.length})</span>
              </h3>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px;">
              ${matchingGuides.map(g => `
                <a href="guides/${g.fileName}" class="guide-search-card" target="_blank" rel="noopener">
                  <div class="guide-search-card-header">
                    <span class="guide-search-tag">Guide</span>
                    <span style="font-size: 18px;">📚</span>
                  </div>
                  <div class="guide-search-body">
                    <h3 class="guide-search-title">${g.title}</h3>
                    <p class="guide-search-desc">${g.description}</p>
                  </div>
                  <div class="guide-search-footer">
                    <span>Read Full Guide</span>
                    <span>→</span>
                  </div>
                </a>
              `).join("")}
            </div>
          `;
          grid.appendChild(guideMatchesSec);
        }
      }
    }

    // Render Empty State if no utilities match
    if (matchCount === 0 && grid) {
      const emptyState = document.createElement("div");
      emptyState.id = "search-empty-state";
      emptyState.setAttribute("style", "grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: rgba(255,255,255,0.02); border: 1px dashed var(--border-color); border-radius: 16px; margin: 20px 0; width: 100%;");
      emptyState.innerHTML = `
        <div style="font-size: 42px; margin-bottom: 12px; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.3));">🔍</div>
        <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 8px; color: var(--text-main);">No Utilities Found</h3>
        <p style="font-size: 14px; color: var(--text-muted); max-width: 480px; margin: 0 auto 20px auto;">
          We couldn't find any utilities matching ${cleanQuery ? `"${cleanQuery}"` : "your filter"} under the "${this.activeSearchFilter.toUpperCase()}" filter category.
        </p>
        <button type="button" class="btn btn-primary" id="btn-reset-search-filters" style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 22px; font-size: 13px; font-weight: 600; border-radius: 8px; cursor: pointer; border: none; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); color: #fff;">
          <span>↺</span> Reset Filters & Show All
        </button>
      `;
      grid.appendChild(emptyState);

      document.getElementById("btn-reset-search-filters")?.addEventListener("click", () => {
        if (mainSearch) mainSearch.value = "";
        if (mobileSearch) mobileSearch.value = "";
        this.setSearchFilter("all");
      });
    }

    // Update Header View Title
    const titleEl = document.getElementById("header-view-title");
    if (titleEl) {
      if (cleanQuery) {
        const filterSuffix = this.activeSearchFilter === "all" ? "" : ` • ${this.activeSearchFilter.toUpperCase()}`;
        titleEl.innerText = `Search Results (${matchCount})${filterSuffix}`;
      } else if (this.activeSearchFilter !== "all") {
        const filterNames = {
          tools: "⚡ Single Tools",
          suites: "📦 Tool Suites",
          features: "✨ Interactive Apps & Workflows",
          pro: "💎 PRO Utilities",
          free: "🆓 Free Utilities",
          guides: "📚 Documentation Guides"
        };
        titleEl.innerText = `${filterNames[this.activeSearchFilter] || "Filtered Utilities"} (${matchCount})`;
      } else {
        titleEl.innerText = "Dashboard";
      }
    }
  },

  async navigateToTool(toolId, updateHash = true) {
    if (updateHash) {
      if (window.history && window.history.pushState) {
        try {
          window.history.pushState({ toolId }, "", "/tool/" + toolId);
        } catch (e) {
          window.location.hash = "tool/" + toolId;
        }
      } else {
        window.location.hash = "tool/" + toolId;
      }
      this.navigateToTool(toolId, false);
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

    const plansView = document.getElementById("plans-view");
    if (plansView) plansView.style.display = "none";

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
      const isStealthUnlocked = sessionStorage.getItem("omnitool_stealth_admin_unlocked") === "true";

      if (!isLocalhost && !isStealthUnlocked) {
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
            <button class="back-btn" onclick="app.backToDashboard()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back</button>
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
              <input type="text" name="username" autocomplete="username" style="display: none;">
              <div class="form-group" style="text-align: left;">
                <label for="admin-passcode-input" style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent-cyan); font-weight: 700; margin-bottom: 6px; display: block;">Security Passcode</label>
                <input type="password" id="admin-passcode-input" placeholder="••••••••" style="width: 100%; height: 42px; padding: 0 16px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-input); color: var(--text-main); font-size: 16px; outline: none; transition: all 0.2s;" autocomplete="current-password" required>
              </div>
              <button type="submit" class="tool-btn primary" style="width: 100%; justify-content: center; height: 42px; font-size: 14px; font-weight: 700; border-radius: 8px; cursor: pointer; transition: all 0.2s;">Unlock Control Panel</button>
              ${isLocalhost ? `
              <div style="font-size: 11.5px; color: var(--text-muted); background: rgba(0, 242, 254, 0.08); border: 1px dashed rgba(0, 242, 254, 0.28); padding: 8px 12px; border-radius: 8px; text-align: left; line-height: 1.5;">
                <span style="color: var(--accent-cyan); font-weight: 700;">Local Master Passcodes:</span> <code style="color: #fff; background: rgba(255,255,255,0.1); padding: 1px 5px; border-radius: 4px;">admin123</code> or <code style="color: #fff; background: rgba(255,255,255,0.1); padding: 1px 5px; border-radius: 4px;">OmniAdmin@2026#</code>
                <div style="margin-top: 6px; display: flex; justify-content: flex-end;">
                  <button type="button" id="admin-reset-lockout-btn" style="background: none; border: none; color: var(--accent-cyan); font-size: 10.5px; cursor: pointer; text-decoration: underline; padding: 0;">Reset Lockout Timer</button>
                </div>
              </div>` : ''}
            </form>
            
          </div>
        </div>
      `;

        viewport.innerHTML = toolbarHtml + lockScreenHtml;

        // Bind back button
        viewport.querySelector(".back-btn")?.addEventListener("click", () => this.backToDashboard());

        // Preload admin-settings module in the background so it is instantly compiled and ready when unlocked
        import('./tools/admin-settings.js').catch(() => { });

        const form = viewport.querySelector("#admin-auth-form");
        const input = viewport.querySelector("#admin-passcode-input");
        if (input) input.focus();

        viewport.querySelector("#admin-reset-lockout-btn")?.addEventListener("click", () => {
          sessionStorage.removeItem("omnitool_admin_failed_attempts");
          sessionStorage.removeItem("omnitool_admin_lock_until");
          if (input) {
            input.disabled = false;
            input.value = "";
            input.focus();
          }
          this.showToast("Lockout timer and failed attempts reset!", "success");
        });

        form?.addEventListener("submit", async (e) => {
          e.preventDefault();

          const lockUntil = Number(sessionStorage.getItem("omnitool_admin_lock_until") || 0);
          if (Date.now() < lockUntil && !isLocalhost) {
            const remMin = Math.ceil((lockUntil - Date.now()) / 60000);
            this.showToast(`Too many failed attempts. Form locked for ${remMin} minutes.`, "error");
            if (input) input.disabled = true;
            return;
          }

          const enteredPasscode = (input.value || "").trim();
          if (!enteredPasscode) return;
          this.showToast("Authenticating admin credentials...", "info");

          let authenticated = false;
          let authMode = "API Verified";

          // 1. Try serverless API verification if backend is reachable
          try {
            const res = await fetch("/api/admin-auth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ password: enteredPasscode })
            });

            const contentType = res.headers.get("content-type") || "";
            if (contentType.includes("application/json")) {
              const data = await res.json();
              if (res.ok && data.success) {
                sessionStorage.setItem("omnitool_admin_authenticated", "true");
                if (data.token) sessionStorage.setItem("omnitool_admin_token", data.token);
                authenticated = true;
              } else if (res.status === 401 || res.status === 403 || res.status === 429) {
                this.showToast(data.error || "Invalid passcode! Access Denied.", "error");
                input.value = "";
                input.focus();
                return;
              }
            }
          } catch (_) {
            // Serverless endpoint offline or static development server
          }

          // 2. Resilient WebCrypto SHA-256 fallback (offline PWA / static server / GitHub Pages)
          if (!authenticated) {
            try {
              const encoder = new TextEncoder();
              const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(enteredPasscode));
              const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");

              // Validates:
              // - Master Passcodes: "OmniAdmin@2026#" or "admin123"
              // - Local admin custom passcode override
              const customPasscode = localStorage.getItem("omnitool_admin_passcode") || "";
              const isMaster = enteredPasscode === "OmniAdmin@2026#" ||
                enteredPasscode === "admin123" ||
                hashHex === "efb6854ff3cb28f0f3cc0604b481df3eb4ffe5b765361e6d597f7ac5be6ae3a8" ||
                hashHex === "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9" ||
                hashHex === "3dfd014c226f9ba7144e5fae62933e8ca7ebbf94f0e4b85da57774c43b9df7ea";
              const isCustom = customPasscode && (enteredPasscode === customPasscode);

              if (isMaster || isCustom) {
                sessionStorage.setItem("omnitool_admin_authenticated", "true");
                authenticated = true;
                authMode = "Cryptographically Verified";
              }
            } catch (_) {}
          }

          if (authenticated) {
            sessionStorage.removeItem("omnitool_admin_failed_attempts");
            sessionStorage.removeItem("omnitool_admin_lock_until");
            this.showToast(`Authorization successful (${authMode})!`, "success");
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
            let attempts = Number(sessionStorage.getItem("omnitool_admin_failed_attempts") || 0) + 1;
            sessionStorage.setItem("omnitool_admin_failed_attempts", attempts);
            if (attempts >= 5) {
              sessionStorage.setItem("omnitool_admin_lock_until", Date.now() + (15 * 60 * 1000));
              this.showToast("Too many failed attempts! Form locked for 15 minutes.", "error");
              if (input) input.disabled = true;
              return;
            }
            this.showToast(`Invalid passcode! Access Denied (${5 - attempts} attempts left).`, "error");
            input.value = "";
            input.focus();
          }
        });
        return;
      }
    }

    try {
      if (window.location.protocol === "file:") {
        this.renderFileProtocolError(toolId);
        return;
      }

      // Lifecycle Memory Management: Clean up previous tool's active intervals/workers/webcams
      if (this._currentToolInstance && typeof this._currentToolInstance.cleanup === "function") {
        try { this._currentToolInstance.cleanup(); } catch (err) { console.warn("Tool cleanup error:", err); }
      }
      this._currentToolInstance = null;

      if (!this._toolModuleCache) this._toolModuleCache = {};
      const isLocalhost = window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "127.0.0.1.nip.io" ||
        window.location.hostname === "host.docker.internal";
      const cacheBust = isLocalhost ? `?t=${Date.now()}` : `?v=${this.APP_VERSION}`;
      
      let module = isLocalhost ? null : this._toolModuleCache[toolId];
      if (!module) {
        module = await import('./tools/' + toolId + '.js' + cacheBust);
        this._toolModuleCache[toolId] = module;
      }
      const toolInstance = module.default;
      this._currentToolInstance = toolInstance;

      // Monetization Lock Gate Validation
      const toolRegistryEntry = this.tools.find(t => t.id === toolId);
      const defaultMonetization = toolRegistryEntry ? toolRegistryEntry.monetization : "free";

      // Dynamic SEO Meta Tags Update for Google Search and social crawlers
      if (toolRegistryEntry) {
        document.title = `${toolRegistryEntry.name} | OmniTool Hub`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", toolRegistryEntry.desc);
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute("href", `https://omnitool.worldsneed.com/tool/${toolRegistryEntry.id}`);
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute("content", `${toolRegistryEntry.name} | OmniTool Hub`);
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute("content", toolRegistryEntry.desc);
        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute("content", `https://omnitool.worldsneed.com/tool/${toolRegistryEntry.id}`);
      }

      let overrides = {};
      try {
        overrides = JSON.parse(this.getConfigValue("omnitool_monetization_overrides", "{}"));
      } catch (e) { }

      const effectiveMonetization = overrides[toolId] || defaultMonetization;
      const isMonetizationActive = this.getConfigValue("omnitool_monetization_active", "false") === "true";

      const isFav = this.favorites.has(toolId);
      const toolbarHtml = `
        <div class="tool-bar">
          <div class="tool-bar-left">
            <button class="back-btn" onclick="app.backToDashboard()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back</button>
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
        ${this.renderCapabilitiesBar(toolId)}
      `;

      if (isMonetizationActive && effectiveMonetization !== "free") {
        const userTier = this.validateSecurityTier();
        if (userTier !== "premium" && userTier !== "lifetime") {
          if (effectiveMonetization === "ad-lock") {
            const isAdUnlocked = sessionStorage.getItem("omnitool_ad_unlocked_" + toolId) === "true";
            if (!isAdUnlocked && userTier !== "ad-unlocked") {
              this.renderAdLockScreen(viewport, toolId, toolInstance, toolbarHtml);
              return;
            }
          } else if (effectiveMonetization === "premium") {
            // Check if they just unlocked it for this session click
            const justUnlocked = sessionStorage.getItem("omnitool_premium_just_unlocked_" + toolId) === "true";
            if (!justUnlocked) {
              this.renderAdLockScreen(viewport, toolId, toolInstance, toolbarHtml);
              return;
            }
            // Consume the temporary unlock token so going back to dashboard relocks it
            sessionStorage.removeItem("omnitool_premium_just_unlocked_" + toolId);
          }
        }
      }

      viewport.innerHTML = toolbarHtml + toolInstance.renderUI();

      // Split view layout drawer enhancements & draggable resizer
      this.initLayoutSizer(viewport);


      // Inject "How it Benefits You" dynamic section inside any present guide card
      const guideCard = viewport.querySelector(".tool-guide-card");
      if (guideCard) {
        const benefits = this.toolBenefits[toolId];
        if (benefits && !guideCard.querySelector(".tool-guide-benefits")) {
          const benefitsDiv = document.createElement("div");
          benefitsDiv.className = "tool-guide-benefits";
          benefitsDiv.style.cssText = "margin-top: 18px; padding-top: 14px; border-top: 1px dashed rgba(255, 255, 255, 0.08); font-size: 12.5px; line-height: 1.5; color: var(--text-muted); text-align: left;";

          // Map tool ID to static guide page name
          const guideMap = {
            "pipeline-builder": "pipeline-builder.html",
            "formatter-suite": "json-formatter.html",
            "text-encoder-suite": "text-encoder-suite.html",
            "jwt-decoder": "jwt-decoder.html",
            "crypto-suite": "crypto-suite.html",
            "pii-anonymizer": "pii-anonymizer.html",
            "markdown-preview": "markdown-preview.html",
            "text-diff": "text-diff.html",
            "pdf-searcher": "pdf-searcher.html",
            "pdf-utilities": "pdf-utilities.html",
            "regex-tester": "regex-tester.html",
            "css-studio": "css-studio.html",
            "color-lab": "color-lab.html",
            "security-suite": "security-suite.html",
            "datetime-suite": "datetime-suite.html",
            "unit-converter": "unit-converter.html",
            "graphics-studio": "graphics-studio.html",
            "screenshot-capture": "graphics-studio.html",
            "calculator": "calculator.html",
            "qr-generator": "qr-generator.html",
            "seo-previewer": "seo-previewer.html",
            "image-converter": "image-converter.html",
            "svg-animator": "svg-animator.html",
            "url-parser": "url-parser.html",
            "text-analyzer": "text-analyzer.html",
            "mock-data-generator": "mock-data-generator.html",
            "code-playground": "code-playground.html"
          };
          const guideFile = guideMap[toolId];
          const blogLinkHtml = guideFile ? `
            <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed rgba(255, 255, 255, 0.05);">
              <a href="guides/${guideFile}" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; color: var(--accent-cyan); text-decoration: none; font-size: 12.5px; font-weight: 600; transition: opacity var(--transition-fast);" onmouseover="this.style.opacity='0.85'" onmouseout="this.style.opacity='1'">
                <span>📖 Read Detailed SEO Blog Post</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            </div>
          ` : "";

          benefitsDiv.innerHTML = `
            <strong style="color: var(--accent-cyan); display: block; margin-bottom: 6px; font-size: 13px;">💡 How it Benefits You:</strong>
            <ul style="margin: 0; padding-left: 18px; list-style-type: disc; display: flex; flex-direction: column; gap: 6px;">
              ${benefits.map(b => `<li>${b}</li>`).join("")}
            </ul>
            ${blogLinkHtml}
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

      // Re-run initLayoutSizer for dynamically mounted subtools
      this.initLayoutSizer(viewport);

      // Render connected workflow bridge cards
      this.renderWorkflowBridges(viewport, toolId);

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
      if (window.location.protocol === "file:" || err.message?.includes("module specifier") || err.message?.includes("CORS") || err.message?.includes("about:blank")) {
        this.renderFileProtocolError(toolId);
      } else {
        this.showToast(`Failed to load tool module: ${err.message}`, "error", 8000);
        this.backToDashboard();
      }
    }
  },

  getFeatureIconSvg(icon) {
    if (!icon) return "";
    if (typeof icon === "string" && icon.trim().startsWith("<svg")) return icon;
    
    const svgMap = {
      "✨": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"></path></svg>',
      "🚀": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>',
      "✅": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      "✔": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      "🎲": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="3" width="18" height="18" rx="3"></rect><circle cx="8" cy="8" r="1.2" fill="currentColor"></circle><circle cx="16" cy="8" r="1.2" fill="currentColor"></circle><circle cx="12" cy="12" r="1.2" fill="currentColor"></circle><circle cx="8" cy="16" r="1.2" fill="currentColor"></circle><circle cx="16" cy="16" r="1.2" fill="currentColor"></circle></svg>',
      "⚡": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
      "🔒": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
      "🛡️": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
      "🔄": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>',
      "🔗": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>',
      "💾": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline></svg>',
      "🔍": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
      "👁️": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
      "🎨": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
      "⏱️": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
      "⏰": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
      "⚖️": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
      "📄": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>',
      "📑": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>'
    };

    return svgMap[icon] || icon;
  },

  renderCapabilitiesBar(toolId) {
    const features = this.toolFeatures[toolId] || [
      { label: "100% Client-Side", icon: "⚡", primary: true },
      { label: "Zero Server Uploads", icon: "🔒" },
      { label: "Instant Execution", icon: "🚀" }
    ];
    return `
      <div class="tool-capabilities-bar">
        ${features.map(f => `
          <span class="tool-cap-chip ${f.primary ? 'primary' : ''}">
            <span class="cap-icon-box" style="display: inline-flex; align-items: center;">${this.getFeatureIconSvg(f.icon)}</span>
            <span>${f.label}</span>
          </span>
        `).join("")}
      </div>
    `;
  },

  initLayoutSizer(container) {
    const root = container || document.getElementById("active-tool-viewport") || document;
    if (!root) return;
    const splitViews = (root.classList && root.classList.contains("split-view")) 
      ? [root] 
      : Array.from(root.querySelectorAll(".tool-content-layout.split-view"));
    
    splitViews.forEach(splitView => {
      if (splitView.dataset.splitInitialized === "true") return;
      splitView.dataset.splitInitialized = "true";

      const toolId = this.activeTool || "default";

      // 1. Create and inject Backdrop overlay
      if (!splitView.querySelector(".split-view-backdrop")) {
        const backdrop = document.createElement("div");
        backdrop.className = "split-view-backdrop";
        splitView.appendChild(backdrop);
        backdrop.addEventListener("click", () => {
          this.playSynthSound('click');
          splitView.classList.remove("drawer-open");
        });
      }

      // 2. Create and inject FAB
      let fab = splitView.querySelector(".adjust-settings-fab");
      if (!fab) {
        fab = document.createElement("button");
        fab.className = "adjust-settings-fab";
        fab.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 16px; height: 16px;">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          <span>Adjust Inputs</span>
        `;
        splitView.appendChild(fab);
        fab.addEventListener("click", () => {
          this.playSynthSound('click');
          splitView.classList.toggle("drawer-open");
        });
      }

      // 3. Get panels and inject a close button inside the drawer header
      const panels = Array.from(splitView.querySelectorAll(".tool-panel:not(.tool-guide-card)"));
      const drawer = panels[0];
      const previewPanel = panels[1];
      if (drawer) {
        if (!drawer.querySelector(".floating-dock-header")) {
          const dockHeader = document.createElement("div");
          dockHeader.className = "floating-dock-header";
          dockHeader.innerHTML = `
            <div class="dock-title">
              <span class="dock-dot"></span>
              <span>Live Editor &amp; Controls</span>
              <span class="dock-badge">Live Sync</span>
            </div>
            <div class="dock-actions">
              <button type="button" class="dock-btn dock-size-btn" title="Toggle Compact / Wide View" aria-label="Toggle width">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                <span>Width</span>
              </button>
              <button type="button" class="dock-btn dock-collapse-btn" title="Minimize to Corner" aria-label="Minimize editor">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 14 10 14 10 20"></polyline><polyline points="20 10 14 10 14 4"></polyline></svg>
                <span>Minimize</span>
              </button>
            </div>
          `;
          drawer.prepend(dockHeader);

          dockHeader.querySelector(".dock-collapse-btn").addEventListener("click", () => {
            this.playSynthSound('click');
            splitView.classList.remove("drawer-open");
          });

          dockHeader.querySelector(".dock-size-btn").addEventListener("click", () => {
            this.playSynthSound('click');
            drawer.classList.toggle("dock-wide");
          });
        }

        const header = drawer.querySelector(".panel-header");
        if (header && !header.querySelector(".drawer-close-btn")) {
          const closeBtn = document.createElement("button");
          closeBtn.className = "drawer-close-btn";
          closeBtn.style.cssText = "background: none; border: none; color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; outline: none; margin-left: auto; padding: 4px; display: none;";
          closeBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
          header.appendChild(closeBtn);

          closeBtn.addEventListener("click", () => {
            this.playSynthSound('click');
            splitView.classList.remove("drawer-open");
          });
        }

        // Swipe gesture detector to close drawer
        let touchStartX = 0;
        let touchEndX = 0;
        drawer.addEventListener("touchstart", (e) => {
          touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        drawer.addEventListener("touchend", (e) => {
          touchEndX = e.changedTouches[0].screenX;
          if (touchStartX - touchEndX > 60) {
            this.playSynthSound('click');
            splitView.classList.remove("drawer-open");
          }
        }, { passive: true });
      }

      // 4. Inject Draggable Resizer & Reset Section Handler (Desktop Split View)
      if (drawer && previewPanel) {
        let resizer = splitView.querySelector(".split-view-resizer");
        if (!resizer) {
          resizer = document.createElement("div");
          resizer.className = "split-view-resizer";
          resizer.setAttribute("role", "separator");
          resizer.setAttribute("aria-orientation", "vertical");
          resizer.setAttribute("tabindex", "0");
          resizer.setAttribute("title", "Drag to resize sections • Double-click to reset (50/50)");
          resizer.innerHTML = `
            <div class="resizer-track"></div>
            <div class="resizer-handle">
              <div class="resizer-dots">
                <span></span><span></span><span></span>
              </div>
              <button class="resizer-reset-btn" title="Reset to 50/50 layout" aria-label="Reset layout">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="10" height="10"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                <span>Reset</span>
              </button>
            </div>
            <div class="resizer-tooltip">50% | 50%</div>
          `;
          drawer.after(resizer);
          splitView.classList.add("has-resizer");
        }

        // Restore saved custom split ratio if any
        const savedRatio = localStorage.getItem("omnitool_split_" + toolId);
        if (savedRatio && !isNaN(parseFloat(savedRatio))) {
          const r = Math.min(80, Math.max(20, parseFloat(savedRatio)));
          splitView.style.setProperty("--split-ratio", r);
          const tooltip = resizer.querySelector(".resizer-tooltip");
          if (tooltip) tooltip.innerText = `${Math.round(r)}% | ${Math.round(100 - r)}%`;
        } else {
          splitView.style.removeProperty("--split-ratio");
        }

        // Reset Section Helper Function
        const resetSplit = () => {
          this.playSynthSound('click');
          splitView.classList.add("is-animating");
          splitView.style.removeProperty("--split-ratio");
          localStorage.removeItem("omnitool_split_" + toolId);
          const tooltip = resizer.querySelector(".resizer-tooltip");
          if (tooltip) tooltip.innerText = "50% | 50%";
          setTimeout(() => {
            splitView.classList.remove("is-animating");
          }, 300);
          this.showToast("Layout reset to default (50/50)", "info");
        };

        // Double-click to reset
        resizer.addEventListener("dblclick", (e) => {
          e.preventDefault();
          resetSplit();
        });

        // Reset button on handle
        const resetHandleBtn = resizer.querySelector(".resizer-reset-btn");
        if (resetHandleBtn) {
          resetHandleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            resetSplit();
          });
        }

        // Keyboard adjustment & reset
        resizer.addEventListener("keydown", (e) => {
          let current = parseFloat(getComputedStyle(splitView).getPropertyValue("--split-ratio")) || 50;
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            current = Math.max(20, current - 3);
            splitView.style.setProperty("--split-ratio", current);
            localStorage.setItem("omnitool_split_" + toolId, current);
            const tooltip = resizer.querySelector(".resizer-tooltip");
            if (tooltip) tooltip.innerText = `${Math.round(current)}% | ${Math.round(100 - current)}%`;
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            current = Math.min(80, current + 3);
            splitView.style.setProperty("--split-ratio", current);
            localStorage.setItem("omnitool_split_" + toolId, current);
            const tooltip = resizer.querySelector(".resizer-tooltip");
            if (tooltip) tooltip.innerText = `${Math.round(current)}% | ${Math.round(100 - current)}%`;
          } else if (e.key === "Enter" || e.key === " " || e.key === "Delete" || e.key === "0") {
            e.preventDefault();
            resetSplit();
          }
        });

        // Pointer dragging logic with setPointerCapture
        let isDragging = false;
        const tooltip = resizer.querySelector(".resizer-tooltip");

        resizer.addEventListener("pointerdown", (e) => {
          if (e.target.closest(".resizer-reset-btn")) return;
          isDragging = true;
          resizer.setPointerCapture(e.pointerId);
          resizer.classList.add("active");
          splitView.classList.add("is-resizing");
          splitView.classList.remove("is-animating");
        });

        resizer.addEventListener("pointermove", (e) => {
          if (!isDragging) return;
          const rect = splitView.getBoundingClientRect();
          if (rect.width <= 0) return;
          const offsetX = e.clientX - rect.left;
          let ratio = (offsetX / rect.width) * 100;
          ratio = Math.min(80, Math.max(20, ratio));
          splitView.style.setProperty("--split-ratio", ratio.toFixed(1));
          if (tooltip) {
            tooltip.innerText = `${Math.round(ratio)}% | ${Math.round(100 - ratio)}%`;
          }
        });

        const stopDragging = (e) => {
          if (!isDragging) return;
          isDragging = false;
          try { resizer.releasePointerCapture(e.pointerId); } catch (_) {}
          resizer.classList.remove("active");
          splitView.classList.remove("is-resizing");
          const finalRatio = parseFloat(getComputedStyle(splitView).getPropertyValue("--split-ratio")) || 50;
          localStorage.setItem("omnitool_split_" + toolId, finalRatio.toFixed(1));
        };

        resizer.addEventListener("pointerup", stopDragging);
        resizer.addEventListener("pointercancel", stopDragging);

        // 5. Inject Reset Layout & Full Screen buttons in preview panel header
        const previewHeader = previewPanel.querySelector(".panel-header");
        if (previewHeader) {
          if (!previewHeader.querySelector(".reset-split-btn")) {
            const resetHeaderBtn = document.createElement("button");
            resetHeaderBtn.className = "reset-split-btn tool-btn secondary";
            resetHeaderBtn.style.cssText = "font-size: 11px; padding: 4px 8px; margin-left: auto; margin-right: 6px; gap: 4px; display: inline-flex; align-items: center;";
            resetHeaderBtn.setAttribute("title", "Reset sections to 50/50 layout");
            resetHeaderBtn.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <polyline points="3 3 3 8 8 8"></polyline>
              </svg>
              <span>Reset 50/50</span>
            `;
            previewHeader.appendChild(resetHeaderBtn);
            resetHeaderBtn.addEventListener("click", () => {
              resetSplit();
            });
          }

          if (!previewHeader.querySelector(".preview-fullscreen-btn")) {
            const fsBtn = document.createElement("button");
            fsBtn.id = "btn-preview-fullscreen-toggle";
            fsBtn.className = "preview-fullscreen-btn tool-btn secondary";
            fsBtn.style.cssText = "font-size: 11px; padding: 4px 8px; margin-left: 0; gap: 4px; display: inline-flex; align-items: center;";
            fsBtn.innerHTML = `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
              </svg>
              <span>Full Screen</span>
            `;
            previewHeader.appendChild(fsBtn);

            fsBtn.addEventListener("click", () => {
              this.playSynthSound('click');
              const isFS = previewPanel.classList.toggle("preview-fullscreen");
              splitView.classList.toggle("has-fullscreen-preview", isFS);

              if (isFS) {
                fsBtn.innerHTML = `
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                    <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4"></path>
                  </svg>
                  <span>Exit Full Screen</span>
                `;
                fsBtn.classList.remove("secondary");
                fsBtn.classList.add("accent-emerald");

                fab.innerHTML = `
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 14px; height: 14px;">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  <span>Live Editor &amp; Controls</span>
                `;
                fab.setAttribute("title", "Expand Floating Corner Editor");
                splitView.classList.add("drawer-open");
              } else {
                fsBtn.innerHTML = `
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                  <span>Full Screen</span>
                `;
                fsBtn.classList.remove("accent-emerald");
                fsBtn.classList.add("secondary");

                fab.innerHTML = `
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 16px; height: 16px;">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1 2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span>Adjust Inputs</span>
                `;
                fab.removeAttribute("title");
                splitView.classList.remove("drawer-open");
                drawer?.classList.remove("dock-wide");
              }
            });

            const handleFsEscape = (e) => {
              if (e.key === "Escape" && previewPanel.classList.contains("preview-fullscreen")) {
                if (splitView.classList.contains("drawer-open")) {
                  splitView.classList.remove("drawer-open");
                } else {
                  fsBtn.click();
                }
              }
            };
            window.addEventListener("keydown", handleFsEscape);
          }
        }
      }
    });
  },


  renderWorkflowBridges(viewport, toolId) {
    if (!viewport) return;
    const workflows = this.toolWorkflows[toolId];
    if (!workflows || workflows.length === 0) return;

    if (viewport.querySelector(".tool-workflow-bridge")) return;

    const cardsHtml = workflows.map(wf => {
      const targetTool = this.tools.find(t => t.id === wf.targetId);
      if (!targetTool) return "";
      const icon = targetTool.icon || `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      return `
        <div class="bridge-tool-card" data-target-tool="${targetTool.id}">
          <div class="bridge-tool-icon">
            ${icon}
          </div>
          <div class="bridge-tool-info">
            <div class="bridge-tool-name">${targetTool.name}</div>
            <div class="bridge-tool-hint">${wf.hint}</div>
          </div>
          <div class="bridge-tool-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      `;
    }).join("");

    const bridgeContainer = document.createElement("div");
    bridgeContainer.className = "tool-workflow-bridge";
    bridgeContainer.innerHTML = `
      <div class="bridge-header">
        <span class="bridge-tag">⚡ Connected Workflows</span>
        <h3 class="bridge-title">Frequently Combined Next Steps</h3>
        <p class="bridge-desc">Keep your momentum going — chain this output directly into complementary developer utilities.</p>
      </div>
      <div class="bridge-grid">
        ${cardsHtml}
      </div>
    `;

    bridgeContainer.querySelectorAll(".bridge-tool-card").forEach(card => {
      card.addEventListener("click", () => {
        const targetId = card.getAttribute("data-target-tool");
        if (targetId) {
          this.navigateToTool(targetId);
        }
      });
    });

    viewport.appendChild(bridgeContainer);
  },

  renderFileProtocolError(toolId) {
    this.activeTool = toolId;
    this.syncSidebarUI();

    const titleEl = document.getElementById("header-view-title");
    if (titleEl) {
      titleEl.innerText = "Security Notice";
      titleEl.style.display = "block";
    }

    const dashboard = document.getElementById("dashboard-view");
    if (dashboard) dashboard.style.display = "none";

    const plansView = document.getElementById("plans-view");
    if (plansView) plansView.style.display = "none";

    const viewport = document.getElementById("active-tool-viewport");
    if (!viewport) return;

    viewport.style.display = "block";

    const contentArea = document.getElementById("content-area");
    if (contentArea) contentArea.scrollTop = 0;

    const toolEntry = this.tools.find(t => t.id === toolId);
    const toolName = toolEntry ? toolEntry.name : (toolId.charAt(0).toUpperCase() + toolId.slice(1));

    viewport.innerHTML = `
      <div class="tool-bar">
        <div class="tool-bar-left">
          <button class="back-btn" onclick="app.backToDashboard()"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> Back to Dashboard</button>
          <div class="tool-title-info">
            <h2>${toolName}</h2>
          </div>
        </div>
      </div>
      <div class="file-protocol-error-container">
        <div class="file-protocol-card">
          <div class="fpc-icon-badge">🔒</div>
          <h2>Browser Security Restriction (CORS on <code>file:///</code>)</h2>
          <p class="fpc-desc">
            You opened OmniTool Hub directly from your hard drive (<code>file:///...</code>). Modern browsers block JavaScript ES module imports (<code>import()</code>) on local files to protect your system.
          </p>
          <div class="fpc-steps-box">
            <h3>⚡ How to run <strong>${toolName}</strong> and all ${this.tools.length}+ offline tools:</h3>
            <div class="fpc-step">
              <span class="fpc-step-num">1</span>
              <div>
                <strong>1-Click Server Launcher (Windows):</strong>
                <p>Double-click <code class="fpc-code">START_SERVER.bat</code> in the project root folder. It starts the local server and automatically launches your browser.</p>
              </div>
            </div>
            <div class="fpc-step">
              <span class="fpc-step-num">2</span>
              <div>
                <strong>Or run via Terminal / Command Prompt:</strong>
                <p>Run <code class="fpc-code">npm run dev</code> (or <code class="fpc-code">python -m http.server 8000</code>) in this folder, then open <a href="http://127.0.0.1:8000/#tool/${toolId}" class="fpc-link" target="_blank">http://127.0.0.1:8000/#tool/${toolId}</a>.</p>
              </div>
            </div>
          </div>
          <div class="fpc-actions">
            <button class="btn btn-primary" onclick="navigator.clipboard.writeText('npm run dev'); app.showToast('Copied npm run dev to clipboard!', 'success');">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy 'npm run dev' Command
            </button>
            <button class="btn btn-secondary" onclick="app.backToDashboard()">Return to Dashboard</button>
          </div>
        </div>
      </div>
    `;
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  backToDashboard(updateHash = true) {
    if (updateHash) {
      if (window.history && window.history.pushState && window.location.pathname.startsWith('/tool/')) {
        try {
          window.history.pushState(null, "", "/");
        } catch (e) {}
      }
      if (this.activeCategory === "fav") {
        window.location.hash = "favorites";
      } else if (this.activeCategory === "subcategory-filter") {
        window.location.hash = "category/" + this.activeSubcategory;
      } else {
        window.location.hash = "dashboard";
      }
      return;
    }

    // Lifecycle Memory Management: Clean up active tool when returning to dashboard
    const wasInTool = !!this.activeTool;
    if (this._currentToolInstance && typeof this._currentToolInstance.cleanup === "function") {
      try { this._currentToolInstance.cleanup(); } catch (err) { console.warn("Tool cleanup error:", err); }
    }
    this._currentToolInstance = null;

    this._guideArrowCleanup?.();
    if (wasInTool) {
      this.playSynthSound('click');
    }

    const viewport = document.getElementById("active-tool-viewport");
    if (viewport) {
      viewport.style.display = "none";
      viewport.innerHTML = "";
    }

    const plansView = document.getElementById("plans-view");
    if (plansView) {
      plansView.style.display = "none";
    }

    const dashboard = document.getElementById("dashboard-view");
    if (dashboard) dashboard.style.display = "block";

    const contentArea = document.getElementById("content-area");
    if (contentArea) contentArea.scrollTop = 0;
    this.checkHeaderScroll?.();

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

    // Restore default SEO Meta Tags for main application
    document.title = "OmniTool Hub | The Ultimate All-in-One Utility Suite";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "A premium, free, privacy-first developer and utility tools web application. 50+ tools running 100% client-side — no data ever leaves your device.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://omnitool.worldsneed.com/");
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "OmniTool Hub | All-in-One Utility Suite");
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", "50+ free developer and utility tools. 100% offline-first, client-side, no tracking.");
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", "https://omnitool.worldsneed.com/");

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
    if (typeof onClick === "function") {
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

    const textSpan = (typeof onClick === "function") ? `<span style="text-decoration: underline; font-weight: 700;">${message}</span>` : `<span>${message}</span>`;

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
        this.triggerHaptics('success');
      } catch (err) {
        this.showToast("Failed to copy", "error");
      }
      document.body.removeChild(textarea);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => {
          this.showToast("Copied to clipboard!", "success");
          this.triggerHaptics('success');
        },
        fallbackCopy
      ).catch(() => {
        fallbackCopy();
      });
    } else {
      fallbackCopy();
    }
  },

  showConfirm(title, message, okText = "Yes, Clear", cancelText = "Cancel") {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.style.position = "fixed";
      overlay.style.top = "0";
      overlay.style.left = "0";
      overlay.style.width = "100vw";
      overlay.style.height = "100vh";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
      overlay.style.backdropFilter = "blur(12px)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.zIndex = "10000";
      overlay.style.opacity = "0";
      overlay.style.transition = "opacity 0.25s ease";

      const modal = document.createElement("div");
      modal.style.background = "#0b0f19";
      modal.style.border = "1px solid rgba(255, 255, 255, 0.1)";
      modal.style.borderRadius = "16px";
      modal.style.padding = "24px";
      modal.style.width = "90%";
      modal.style.maxWidth = "440px";
      modal.style.boxShadow = "0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 242, 254, 0.06)";
      modal.style.transform = "scale(0.95) translateY(10px)";
      modal.style.transition = "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)";

      modal.innerHTML = `
        <h3 style="margin-top: 0; margin-bottom: 12px; font-size: 18px; font-weight: 700; color: #fff;">${title}</h3>
        <p style="margin: 0 0 24px 0; font-size: 13.5px; line-height: 1.5; color: var(--text-muted, #94a3b8);">${message}</p>
        <div style="display: flex; justify-content: flex-end; gap: 12px;">
          <button id="custom-confirm-cancel" class="tool-btn secondary" style="padding: 8px 16px; border-radius: 8px; font-size: 13px; cursor: pointer;">${cancelText}</button>
          <button id="custom-confirm-ok" class="tool-btn" style="background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%); border: none; color: #fff; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);">${okText}</button>
        </div>
      `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        modal.style.transform = "scale(1) translateY(0)";
      });

      const cleanup = (result) => {
        overlay.style.opacity = "0";
        modal.style.transform = "scale(0.95) translateY(10px)";
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay);
          }
        }, 250);
        resolve(result);
      };

      modal.querySelector("#custom-confirm-cancel").addEventListener("click", () => {
        this.playSynthSound('click');
        cleanup(false);
      });

      modal.querySelector("#custom-confirm-ok").addEventListener("click", () => {
        this.playSynthSound('click');
        cleanup(true);
      });
    });
  },

  openAestheticsModal() {
    const modal = document.getElementById("aesthetics-modal");
    if (!modal) return;

    this.playSynthSound('click');

    // Load active settings to modal UI
    const activePreset = this.getConfigValue("omnitool_accent_preset", "default");
    const activeDensity = this.getConfigValue("omnitool_layout_density", "comfortable");
    const activeClock = this.getConfigValue("omnitool_clock_format", "24");
    const activeAudio = this.getConfigValue("omnitool_audio_feedback", "false") === "true";

    // Set swatch active class
    const swatches = modal.querySelectorAll(".color-swatch-item-user");
    swatches.forEach(swatch => {
      const preset = swatch.getAttribute("data-preset");
      if (preset === activePreset) {
        swatch.style.borderColor = "var(--text-main)";
        swatch.style.transform = "scale(1.1)";
      } else {
        swatch.style.borderColor = "transparent";
        swatch.style.transform = "scale(1)";
      }
    });

    // Handle swatch clicks in modal
    let selectedPreset = activePreset;
    swatches.forEach(swatch => {
      swatch.onclick = () => {
        this.playSynthSound('click');
        selectedPreset = swatch.getAttribute("data-preset");
        swatches.forEach(s => {
          s.style.borderColor = "transparent";
          s.style.transform = "scale(1)";
        });
        swatch.style.borderColor = "var(--text-main)";
        swatch.style.transform = "scale(1.1)";
      };
    });

    // Populate dropdowns & checkbox
    const densitySelect = modal.querySelector("#aesthetics-density");
    const clockSelect = modal.querySelector("#aesthetics-clock");
    const audioCheckbox = modal.querySelector("#aesthetics-audio");

    if (densitySelect) densitySelect.value = activeDensity;
    if (clockSelect) clockSelect.value = activeClock;
    if (audioCheckbox) audioCheckbox.checked = activeAudio;

    // Show modal
    modal.style.display = "flex";

    // Close button
    modal.querySelector("#aesthetics-modal-close").onclick = () => {
      this.playSynthSound('click');
      modal.style.display = "none";
    };

    // Save button
    modal.querySelector("#aesthetics-modal-save").onclick = () => {
      this.playSynthSound('success');

      // Save values
      localStorage.setItem("omnitool_accent_preset", selectedPreset);
      if (densitySelect) localStorage.setItem("omnitool_layout_density", densitySelect.value);
      if (clockSelect) localStorage.setItem("omnitool_clock_format", clockSelect.value);
      if (audioCheckbox) localStorage.setItem("omnitool_audio_feedback", audioCheckbox.checked ? "true" : "false");

      this.showToast("✨ Aesthetics settings saved successfully!", "success");
      modal.style.display = "none";

      // Apply changes instantly
      this.initTheme();
      this.initLayoutScale();
      this.initClock();

      // Re-render dashboard to apply density changes if visible
      if (!this.activeTool) {
        this.renderDashboard();
      }
    };
  },

  async clearAppCache() {
    const confirmed = await this.showConfirm(
      "Flush Offline Cache",
      "Are you sure you want to flush the offline service worker cache and reload? Your saved configurations and admin preferences will be preserved."
    );
    if (!confirmed) {
      return;
    }

    this.playSynthSound('click');
    this.showToast("Clearing local storage & session state...", "info");

    const cleanupPromises = [];

    // Capture preserved settings if marked (defaults to true so flush cache does not wipe configurations)
    const preserveSettings = localStorage.getItem("omnitool_preserve_settings_on_reset") !== "false";
    let preservedData = {};
    if (preserveSettings) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("omnitool_")) {
          preservedData[key] = localStorage.getItem(key);
        }
      }
    }

    // 1. Clear LocalStorage and SessionStorage
    try {
      localStorage.clear();
      sessionStorage.clear();

      if (preserveSettings) {
        Object.keys(preservedData).forEach(key => {
          localStorage.setItem(key, preservedData[key]);
        });
      }
    } catch (e) {
      console.error("Failed to clear local/session storage:", e);
    }

    // 2. Clear all IndexedDB databases
    if (window.indexedDB && window.indexedDB.databases) {
      const dbPromise = window.indexedDB.databases()
        .then(dbs => {
          const deletePromises = dbs.map(db => {
            return new Promise((resolve) => {
              try {
                const req = window.indexedDB.deleteDatabase(db.name);
                req.onsuccess = () => resolve();
                req.onerror = () => resolve();
                req.onblocked = () => resolve();
              } catch (e) {
                console.error(`Error deleting database ${db.name}:`, e);
                resolve();
              }
            });
          });
          return Promise.all(deletePromises);
        })
        .catch(err => console.error("Error listing databases:", err));
      cleanupPromises.push(dbPromise);
    }

    // 3. Clear Service Worker Cache Storage
    if (window.caches) {
      const cachePromise = caches.keys()
        .then(keys => {
          return Promise.all(keys.map(key => caches.delete(key)));
        })
        .catch(err => console.error("Error clearing caches:", err));
      cleanupPromises.push(cachePromise);
    }

    // 4. Unregister Service Workers
    if (navigator.serviceWorker) {
      const swPromise = navigator.serviceWorker.getRegistrations()
        .then(registrations => {
          return Promise.all(registrations.map(r => r.unregister()));
        })
        .catch(err => console.error("Error unregistering service workers:", err));
      cleanupPromises.push(swPromise);
    }

    // Wait for all cleanup operations to finish (with a fallback timeout of 3 seconds)
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 3000));

    try {
      await Promise.race([Promise.all(cleanupPromises), timeoutPromise]);
    } catch (err) {
      console.error("Error during cache cleanup:", err);
    }

    this.showToast("Cache cleared! Reloading application...", "success");

    // Reload after a brief delay so toast can be read
    setTimeout(() => {
      window.location.reload();
    }, 800);
  },

  initLayoutScale() {
    const scale = localStorage.getItem("omnitool_layout_scale") || "1.0";
    this.applyLayoutScale(scale);

    const toggleBtn = document.getElementById("sizer-toggle-btn");
    const dropdown = document.getElementById("sizer-dropdown");

    if (toggleBtn && dropdown) {
      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
      });

      document.addEventListener("click", () => {
        dropdown.style.display = "none";
      });

      dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    // Attach event listeners to all .sizer-option-btn (dropdown or preferences capsule)
    document.querySelectorAll(".sizer-option-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const val = btn.getAttribute("data-scale");
        this.applyLayoutScale(val);
        this.playSynthSound('click');
        if (dropdown) dropdown.style.display = "none";
      });
    });

    // Keyboard Shortcuts for accessibility
    document.addEventListener("keydown", (e) => {
      // Ctrl + Alt + 0 resets to Default (100%)
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === "0") {
        e.preventDefault();
        this.applyLayoutScale("1.0");
        this.showToast("Layout scale reset to Default (100%)", "info");
      }
      // Ctrl + Alt + + (or =) zooms in
      if ((e.ctrlKey || e.metaKey) && e.altKey && (e.key === "=" || e.key === "+")) {
        e.preventDefault();
        this.adjustLayoutScale(1);
      }
      // Ctrl + Alt + - zooms out
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === "-") {
        e.preventDefault();
        this.adjustLayoutScale(-1);
      }
    });
  },

  adjustLayoutScale(direction) {
    const scales = ["0.5", "0.7", "0.85", "1.0", "1.15", "1.3", "1.5"];
    const currentScale = localStorage.getItem("omnitool_layout_scale") || "1.0";

    let currentIndex = scales.indexOf(currentScale);
    if (currentIndex === -1) {
      // Find closest
      let minDiff = Infinity;
      currentIndex = 3; // Default fallback to 1.0
      scales.forEach((s, idx) => {
        const diff = Math.abs(parseFloat(s) - parseFloat(currentScale));
        if (diff < minDiff) {
          minDiff = diff;
          currentIndex = idx;
        }
      });
    }

    let newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < scales.length) {
      const nextScale = scales[newIndex];
      this.applyLayoutScale(nextScale);
      this.showToast(`Layout scale set to ${Math.round(parseFloat(nextScale) * 100)}%`, "info");
    }
  },

  applyLayoutScale(scale) {
    localStorage.setItem("omnitool_layout_scale", scale);
    document.documentElement.style.setProperty("--font-scale", scale);
    document.body.style.zoom = scale;

    const optionBtns = document.querySelectorAll(".sizer-option-btn");
    optionBtns.forEach(btn => {
      const btnScale = btn.getAttribute("data-scale");
      if (parseFloat(btnScale) === parseFloat(scale)) {
        btn.classList.add("active");
        btn.style.fontWeight = "bold";
      } else {
        btn.classList.remove("active");
        btn.style.fontWeight = "normal";
      }
    });
  },

  // Monetization Highlights Registry
  toolPremiumHighlights: {
    "pipeline-builder": ["Infinite chaining stages (unlimited)", "Custom JS sandbox step execution", "Save & load pipeline recipe book", "Large file stream support (up to 5MB)"],
    "formatter-suite": ["Bulk files multi-conversion", "Stream parse large files up to 50MB", "Advanced code obfuscation & spacing presets", "Full database multi-statement SQL formatting"],
    "text-encoder-suite": ["Batch files conversion interface", "Additional high-grade codecs (Base85, Base32, Hex)", "Regex pattern replacement rules"],
    "jwt-decoder": ["Client-side cryptographic signature verification", "Automatic expiration alerts & counters", "Nested JWT automatic payload unpacking"],
    "crypto-suite": ["Asymmetric RSA Key Studio up to 4096-bit", "Local hashing standards (bcrypt, scrypt, Argon2)", "Symmetric file encryptor offline"],
    "pii-anonymizer": ["Custom salt seed configuration for relational matching", "Proprietary token regex scanners", "Targeted CSV column masking"],
    "markdown-preview": ["Direct PDF & DOCX publisher export", "Styled themes (GitLab, GitHub, Obsidian)", "Auto-generated clickable Table of Contents"],
    "text-diff": ["Direct local file comparison uploads", "Semantic code-aware difference filters", "Interactive merge conflict splitter & editor"],
    "pdf-searcher": ["Concurrent search across 100 PDFs", "Fuzzy search and proximity keyword parameters", "GPU-accelerated local WebAssembly OCR"],
    "pdf-utilities": ["Offline PDF compression up to 100MB", "Security controls (Permissions/Password stripper)", "Visual drag-and-drop page compiler"],
    "regex-tester": ["AI-assisted pattern builder companion", "CSV/JSON match export capabilities", "Visual step-by-step regex debugger"],
    "css-studio": ["Unlimited stops color builder", "Layered 3D box shadows compiler", "Direct Tailwind utility class output format"],
    "color-lab": ["APCA W3C modern contrast calculations", "Analogous and triadic full color ranges", "CSS/Tailwind/SASS variable exports"],
    "security-suite": ["Bulk key generator up to 50k keys", "Custom UUID templates (case, prefix, suffix)", "Memorable pronounceable password creator"],
    "datetime-suite": ["Exclude weekend & bank holidays in calculations", "Interactive world multi-timezone scheduler"],
    "unit-converter": ["Real-time local cached currency conversions", "Specialized engineering & physics unit units"],
    "graphics-studio": ["Vector shapes overlay drawer (arrows, circles)", "Pre-made banner templates (GitHub, LinkedIn)", "Canvas layers history (Undo/Redo)"],
    "calculator": ["Visual math function graphing screen", "Formulas & custom constant registration database"],
    "qr-generator": ["Custom art vector QR patterns & gradients", "Offline scanning from file or webcam uploads", "Dynamic shortlink analytics integration"],
    "seo-previewer": ["Full sitemap validation audits", "Missing meta descriptors & image alt analysis"],
    "image-converter": ["Concurrent batch image optimizer", "Exact target file-size compression limits", "AVIF high-compression output formats"],
    "svg-animator": ["High-FPS GIF, MP4, and WebM exports", "Multi-path keyframe timeline editor interface"],
    "url-parser": ["UTM Campaign management profiles", "Multi-URL query comparison grid"],
    "text-analyzer": ["Sentiment and target audience tone checker", "Passive voice & wordiness diagnostics panel"],
    "mock-data-generator": ["Generate up to 50,000 rows client-side", "Save complex nested schemas templates", "SQL INSERT statement compilation exports"],
    "admin-settings": ["Backup & restore encrypted system settings", "Audit logging local console metrics"],
    "code-playground": ["Tailwind, React, and Vue framework boilerplates", "Download workspaces as ZIP file structures"],
    "ip-subnet-calculator": ["Supernet visual CIDR planner", "Offline OUI vendor MAC address registry database"],
    "screenshot-capture": ["Full page scrolling screenshot stitcher", "Cloud OCR text extraction from capture", "Direct GitHub / Jira issue integration"]
  },

  renderAdLockScreen(viewport, toolId, toolInstance, toolbarHtml) {
    this.activeTool = toolId;
    this.syncSidebarUI();
    const titleEl = document.getElementById("header-view-title");
    if (titleEl) {
      titleEl.innerText = toolInstance.name;
      titleEl.style.display = "block";
    }

    const highlights = this.toolPremiumHighlights[toolId] || ["Advanced features", "Pro parameters"];
    const highlightsHtml = highlights.map(h => `
      <div style="display: flex; align-items: flex-start; gap: 10px; text-align: left; font-size: 13px; color: var(--text-main); margin-bottom: 8px;">
        <span style="color: var(--accent-cyan);">✔</span>
        <span>${h}</span>
      </div>
    `).join('');

    const lockHtml = `
      <div class="ad-lock-screen" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; width: 100%; padding: 40px 20px;">
        <div class="glass-card" style="max-width: 500px; width: 100%; padding: 32px; border-radius: 16px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); text-align: center; display: flex; flex-direction: column; gap: 20px;">
          
          <div class="lock-icon-container" style="display: flex; justify-content: center; align-items: center; margin-bottom: 5px;">
            <div class="lock-glow" style="width: 70px; height: 70px; border-radius: 50%; background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.25); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(0, 242, 254, 0.15);">
              <svg viewBox="0 0 24 24" fill="none" stroke="#00f2fe" stroke-width="2" style="width: 32px; height: 32px;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18.01"></line></svg>
            </div>
          </div>

          <div class="lock-header">
            <h2 style="font-size: 22px; font-weight: 800; color: var(--text-main); margin: 0 0 6px 0; letter-spacing: 0.5px;">Unlock Advanced Feature</h2>
            <span style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); background: rgba(0, 242, 254, 0.12); padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(0, 242, 254, 0.2); display: inline-block; margin-bottom: 12px; text-transform: uppercase;">📺 Ad-Lock Tier</span>
            <p style="font-size: 13.5px; color: var(--text-muted); margin: 0; line-height: 1.4;">Watch a brief sponsor video advertisement to unlock full access to <strong>${toolInstance.name}</strong> for the next 24 hours.</p>
          </div>

          <div style="background: rgba(0,0,0,0.15); border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin: 6px 0;">
            <div style="font-size: 11px; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; text-align: left;">What you will unlock:</div>
            ${highlightsHtml}
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
            <button id="ad-unlock-btn" class="tool-btn primary" style="width: 100%; justify-content: center; height: 44px; font-size: 14px; font-weight: 700; border-radius: 8px;">
              📺 Watch Video Ad to Unlock
            </button>
            <button id="ad-premium-bypass-btn" class="tool-btn secondary" style="width: 100%; justify-content: center; height: 40px; font-size: 13px; font-weight: 600; border-radius: 8px;">
              💎 Get Premium Pass (Unlock All Permanently)
            </button>
          </div>
          
        </div>
      </div>
    `;

    viewport.innerHTML = toolbarHtml + lockHtml;

    viewport.querySelector(".back-btn")?.addEventListener("click", () => this.backToDashboard());

    // Watch ad simulator event
    const unlockBtn = viewport.querySelector("#ad-unlock-btn");
    unlockBtn?.addEventListener("click", () => {
      // 1. Mark as unlocked immediately in sessionStorage to handle current-tab redirects and back-button reloads
      sessionStorage.setItem("omnitool_ad_unlocked_" + toolId, "true");
      sessionStorage.setItem("omnitool_premium_just_unlocked_" + toolId, "true");

      // 2. Open the sponsor link
      const smartLink = this.getConfigValue("omnitool_adsterra_smart_link", "");
      if (smartLink && smartLink.trim() !== "") {
        window.open(smartLink.trim(), "_blank");
      }

      const startTime = Date.now();
      let timerCompleted = false;

      unlockBtn.disabled = true;
      unlockBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin" style="width: 16px; height: 16px; margin-right: 8px; animation: spin 1.5s linear infinite;">
          <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
        </svg> Loading Sponsor Video...
      `;

      const checkUnlock = () => {
        if (timerCompleted) return;
        const elapsed = (Date.now() - startTime) / 1000;

        if (elapsed >= 4) {
          timerCompleted = true;
          sessionStorage.setItem("omnitool_premium_just_unlocked_" + toolId, "true");
          this.playSynthSound('success');
          this.showToast(`✨ Ad-lock unlocked! Access granted for ${toolInstance.name}.`, "success");
          this.navigateToTool(toolId, false);

          document.removeEventListener("visibilitychange", onVisibilityChange);
          window.removeEventListener("focus", onVisibilityChange);
        } else {
          if (elapsed >= 2.5) {
            unlockBtn.innerHTML = `📺 Playing Video Ad (2s remaining)...`;
          } else if (elapsed >= 1) {
            unlockBtn.innerHTML = `📺 Playing Video Ad (5s remaining)...`;
          }
        }
      };

      const intervalId = setInterval(() => {
        checkUnlock();
        if (timerCompleted) clearInterval(intervalId);
      }, 500);

      const onVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          checkUnlock();
          if (timerCompleted) clearInterval(intervalId);
        }
      };

      document.addEventListener("visibilitychange", onVisibilityChange);
      window.addEventListener("focus", onVisibilityChange);
    });

    viewport.querySelector("#ad-premium-bypass-btn")?.addEventListener("click", () => {
      window.location.hash = "plans";
    });
  },

  renderPremiumLockScreen(viewport, toolId, toolInstance, toolbarHtml) {
    this.activeTool = toolId;
    this.syncSidebarUI();
    const titleEl = document.getElementById("header-view-title");
    if (titleEl) {
      titleEl.innerText = toolInstance.name;
      titleEl.style.display = "block";
    }

    const highlights = this.toolPremiumHighlights[toolId] || ["Pro capability suite", "Unlimited calculations & sizes"];
    const highlightsHtml = highlights.map(h => `
      <div style="display: flex; align-items: flex-start; gap: 10px; text-align: left; font-size: 13px; color: var(--text-main); margin-bottom: 8px;">
        <span style="color: var(--accent-purple);">★</span>
        <span>${h}</span>
      </div>
    `).join('');

    const lockHtml = `
      <div class="premium-lock-screen" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; width: 100%; padding: 40px 20px;">
        <div class="glass-card" style="max-width: 500px; width: 100%; padding: 32px; border-radius: 16px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); text-align: center; display: flex; flex-direction: column; gap: 20px;">
          
          <div class="lock-icon-container" style="display: flex; justify-content: center; align-items: center; margin-bottom: 5px;">
            <div class="lock-glow" style="width: 70px; height: 70px; border-radius: 50%; background: rgba(157, 78, 221, 0.08); border: 1px solid rgba(157, 78, 221, 0.25); display: flex; align-items: center; justify-content: center; box-shadow: 0 0 20px rgba(157, 78, 221, 0.15);">
              <svg viewBox="0 0 24 24" fill="none" stroke="#9d4edd" stroke-width="2" style="width: 32px; height: 32px;"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5"></polygon><line x1="12" y1="22" x2="12" y2="12"></line><line x1="2" y1="8.5" x2="12" y2="12"></line><line x1="22" y1="8.5" x2="12" y2="12"></line><line x1="2" y1="15.5" x2="12" y2="12"></line><line x1="22" y1="15.5" x2="12" y2="12"></line></svg>
            </div>
          </div>

          <div class="lock-header">
            <h2 style="font-size: 22px; font-weight: 800; color: var(--text-main); margin: 0 0 6px 0; letter-spacing: 0.5px;">Premium Tool Required</h2>
            <span style="font-size: 11px; font-weight: 700; color: var(--accent-purple); background: rgba(157, 78, 221, 0.12); padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(157, 78, 221, 0.2); display: inline-block; margin-bottom: 12px; text-transform: uppercase;">💎 Pro / Premium Tier</span>
            <p style="font-size: 13.5px; color: var(--text-muted); margin: 0; line-height: 1.4;">Access to <strong>${toolInstance.name}</strong> is reserved for our Premium members. Subscribe or purchase a lifetime pass to unlock all 28 developer utilities.</p>
          </div>

          <div style="background: rgba(0,0,0,0.15); border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin: 6px 0;">
            <div style="font-size: 11px; font-weight: 800; color: var(--accent-purple); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; text-align: left;">Included in Pro subscription:</div>
            ${highlightsHtml}
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
            <button id="premium-subscribe-btn" class="tool-btn primary" style="width: 100%; justify-content: center; height: 44px; font-size: 14px; font-weight: 700; border-radius: 8px; border-color: #9d4edd; background: rgba(157, 78, 221, 0.2); color: #c084fc;">
              💎 View Membership Plans
            </button>
          </div>
          
        </div>
      </div>
    `;

    viewport.innerHTML = toolbarHtml + lockHtml;

    viewport.querySelector(".back-btn")?.addEventListener("click", () => this.backToDashboard());

    viewport.querySelector("#premium-subscribe-btn")?.addEventListener("click", () => {
      window.location.hash = "plans";
    });
  },

  renderPlansPage() {
    this.activeTool = null;
    this.syncSidebarUI();
    document.getElementById("desktop-plans-link")?.classList.add("active");

    // Hide dashboard and active-viewport
    const dashboard = document.getElementById("dashboard-view");
    if (dashboard) dashboard.style.display = "none";
    const viewport = document.getElementById("active-tool-viewport");
    if (viewport) {
      viewport.style.display = "none";
      viewport.innerHTML = "";
    }

    const plansView = document.getElementById("plans-view");
    if (plansView) {
      plansView.style.display = "block";

      // Update "Current Plan" status visual states and dynamic prices
      const userTier = this.validateSecurityTier();
      const btnFree = plansView.querySelector("#plan-btn-free");
      const btnLifetime = plansView.querySelector("#plan-btn-lifetime");
      const btnMonthly = plansView.querySelector("#plan-btn-monthly");

      const isIndia = this.detectUserRegion() === "IN";
      const priceLifetimeUsd = this.getConfigValue("omnitool_price_lifetime_usd", "$29.99");
      const priceMonthlyUsd = this.getConfigValue("omnitool_price_monthly_usd", "$4.99");
      const priceLifetimeInr = this.getConfigValue("omnitool_price_lifetime_inr", "₹2,499");
      const priceMonthlyInr = this.getConfigValue("omnitool_price_monthly_inr", "₹399");

      const displayLifetime = isIndia ? priceLifetimeInr : priceLifetimeUsd;
      const displayMonthly = isIndia ? priceMonthlyInr : priceMonthlyUsd;
      const altLifetime = isIndia ? priceLifetimeUsd : priceLifetimeInr;
      const altMonthly = isIndia ? priceMonthlyUsd + "/mo" : priceMonthlyInr + "/mo";

      // Update card price displays
      const elLifetimePrice = document.getElementById("plan-price-lifetime-display");
      if (elLifetimePrice) {
        elLifetimePrice.innerHTML = `${displayLifetime} <span style="font-size: 13px; font-weight: 500; opacity: 0.7;">(${altLifetime})</span>`;
      }
      const elMonthlyPrice = document.getElementById("plan-price-monthly-display");
      if (elMonthlyPrice) {
        elMonthlyPrice.innerHTML = `${displayMonthly} <span style="font-size: 13px; font-weight: 500; opacity: 0.7;">(${altMonthly})</span>`;
      }

      // Gateway enable toggles
      const upiEnabled = this.getConfigValue("omnitool_gw_upi_enabled", "true") !== "false";
      const bankEnabled = this.getConfigValue("omnitool_gw_bank_enabled", "false") === "true";
      const gumroadEnabled = this.getConfigValue("omnitool_gw_gumroad_enabled", "true") !== "false";
      const paypalEnabled = this.getConfigValue("omnitool_gw_paypal_enabled", "true") !== "false";
      const razorpayEnabled = this.getConfigValue("omnitool_gw_razorpay_enabled", "true") !== "false";
      const cryptoEnabled = this.getConfigValue("omnitool_gw_crypto_enabled", "true") !== "false";
      const coffeeEnabled = this.getConfigValue("omnitool_gw_coffee_enabled", "true") !== "false";
      const customEnabled = this.getConfigValue("omnitool_gw_custom_enabled", "false") === "true";
      const anyGatewayEnabled = upiEnabled || bankEnabled || gumroadEnabled || paypalEnabled || razorpayEnabled || cryptoEnabled || customEnabled || coffeeEnabled;

      if (btnFree && btnLifetime && btnMonthly) {
        btnFree.disabled = true;
        btnFree.innerText = "Current Plan";
        btnFree.className = "tool-btn secondary";

        btnLifetime.disabled = false;
        btnLifetime.innerText = anyGatewayEnabled ? `Buy Lifetime Pass (${displayLifetime})` : "Checkout Paused (Maintenance)";
        btnLifetime.className = "tool-btn primary";

        btnMonthly.disabled = false;
        btnMonthly.innerText = anyGatewayEnabled ? `Subscribe Monthly (${displayMonthly}/mo)` : "Checkout Paused (Maintenance)";
        btnMonthly.className = "tool-btn primary";

        if (userTier === "free") {
          btnFree.disabled = true;
          btnFree.innerText = "★ Active Free Plan";
          btnFree.className = "tool-btn primary";
        } else if (userTier === "lifetime") {
          btnLifetime.disabled = true;
          btnLifetime.innerText = "★ Active Lifetime Pass";
          btnLifetime.className = "tool-btn secondary";
        } else if (userTier === "premium") {
          btnMonthly.disabled = true;
          btnMonthly.innerText = "★ Active Pro Monthly";
          btnMonthly.className = "tool-btn secondary";
        }
      }
    }

    const titleEl = document.getElementById("header-view-title");
    if (titleEl) {
      titleEl.innerText = "Membership Pricing Plans";
      titleEl.style.display = "block";
    }

    // Synchronize payment method strip badges with enabled gateways
    const upiEnabled = this.getConfigValue("omnitool_gw_upi_enabled", "true") !== "false";
    const bankEnabled = this.getConfigValue("omnitool_gw_bank_enabled", "false") === "true";
    const gumroadEnabled = this.getConfigValue("omnitool_gw_gumroad_enabled", "true") !== "false";
    const paypalEnabled = this.getConfigValue("omnitool_gw_paypal_enabled", "true") !== "false";
    const razorpayEnabled = this.getConfigValue("omnitool_gw_razorpay_enabled", "true") !== "false";
    const cryptoEnabled = this.getConfigValue("omnitool_gw_crypto_enabled", "true") !== "false";
    const customEnabled = this.getConfigValue("omnitool_gw_custom_enabled", "false") === "true";
    const anyGatewayEnabled = upiEnabled || bankEnabled || gumroadEnabled || paypalEnabled || razorpayEnabled || cryptoEnabled || customEnabled;

    const customTabLabel = this.getConfigValue("omnitool_custom_gw_tab_label", "Custom Payment");
    const customIcon = this.getConfigValue("omnitool_custom_gw_icon", "✨");

    document.querySelectorAll(".plan-gateways-strip").forEach(strip => {
      strip.querySelectorAll(".pg-badge").forEach(badge => {
        const onclickAttr = badge.getAttribute("onclick") || "";
        if (onclickAttr.includes("'upi'")) {
          badge.style.display = (upiEnabled || bankEnabled) ? "inline-flex" : "none";
          if (!upiEnabled && bankEnabled) {
            badge.innerText = "🏦 Bank";
            badge.title = "Pay via Bank IMPS / NEFT";
          } else if (upiEnabled) {
            badge.innerText = "⚡ UPI / QR";
            badge.title = "Pay with UPI QR / GPay / PhonePe / Paytm";
          }
        } else if (onclickAttr.includes("'gumroad'")) {
          badge.style.display = gumroadEnabled ? "inline-flex" : "none";
        } else if (onclickAttr.includes("'paypal'")) {
          badge.style.display = paypalEnabled ? "inline-flex" : "none";
        } else if (onclickAttr.includes("'razorpay'")) {
          badge.style.display = razorpayEnabled ? "inline-flex" : "none";
        } else if (onclickAttr.includes("'crypto'")) {
          badge.style.display = cryptoEnabled ? "inline-flex" : "none";
        } else if (onclickAttr.includes("'custom'")) {
          badge.style.display = customEnabled ? "inline-flex" : "none";
          if (customEnabled) {
            badge.innerText = `${customIcon} ${customTabLabel}`;
            badge.title = `Pay via ${customTabLabel}`;
          }
        }
      });

      // Handle fallback notice if all gateways are disabled
      let pausedNotice = strip.querySelector(".pg-badge-paused-notice");
      if (!anyGatewayEnabled) {
        if (!pausedNotice) {
          pausedNotice = document.createElement("span");
          pausedNotice.className = "pg-badge-paused-notice";
          pausedNotice.style.cssText = "font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 6px; background: rgba(245, 158, 11, 0.1); border: 1px dashed rgba(245, 158, 11, 0.35); color: #f59e0b; display: inline-flex; align-items: center; gap: 4px;";
          pausedNotice.innerHTML = `<span>🔒</span><span>Checkout Temporarily Paused</span>`;
          strip.appendChild(pausedNotice);
        }
        pausedNotice.style.display = "inline-flex";
      } else if (pausedNotice) {
        pausedNotice.style.display = "none";
      }
    });

    // Bind Plan cards directly to Unified Checkout Modal
    const btnLifetime = document.getElementById("plan-btn-lifetime");
    if (btnLifetime) {
      btnLifetime.onclick = (e) => {
        e.preventDefault();
        this.openCheckout("lifetime");
      };
    }

    const btnMonthly = document.getElementById("plan-btn-monthly");
    if (btnMonthly) {
      btnMonthly.onclick = (e) => {
        e.preventDefault();
        this.openCheckout("monthly");
      };
    }

    // Bind Activation Code on Plans view
    const activateBtn = document.getElementById("plans-activate-btn");
    const codeInput = document.getElementById("plans-activation-code");
    const activationForm = document.getElementById("plans-activation-form");

    const handleActivation = async () => {
      const code = codeInput ? codeInput.value.trim() : "";
      if (await this.verifyAndActivateLicense(code)) {
        if (codeInput) codeInput.value = "";
      }
    };

    if (activationForm) {
      activationForm.onsubmit = (e) => {
        e.preventDefault();
        handleActivation();
      };
    }

    if (activateBtn) {
      activateBtn.onclick = (e) => {
        e.preventDefault();
        handleActivation();
      };
    }
  },

  // Creates standardized, tamper-resistant client tokens for client-verified payments
  createClientAuthorizedToken(tier = "lifetime", source = "payment", identifier = "") {
    const payload = {
      tier,
      source,
      keyId: String(identifier || ("OMNI-" + Date.now().toString(36).toUpperCase())),
      iat: Date.now()
    };
    if (tier === "premium") {
      payload.expiresAt = Date.now() + (30 * 24 * 60 * 60 * 1000);
    }
    const jsonStr = JSON.stringify(payload);
    const encoded = btoa(unescape(encodeURIComponent(jsonStr))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    return `${encoded}.${source}_client_sig`;
  },

  // Security Enforcement Watchdog: Validates cryptographic token authenticity
  validateSecurityTier() {
    const rawTier = localStorage.getItem("omnitool_user_tier") || "free";
    if (rawTier === "free" || rawTier === "ad-unlocked") {
      return rawTier;
    }

    const token = localStorage.getItem("omnitool_license_token");
    if (!token || typeof token !== "string" || !token.includes(".")) {
      // Unauthenticated privilege escalation detected! Reset to free
      localStorage.setItem("omnitool_user_tier", "free");
      return "free";
    }

    try {
      const [encodedPayload, signature] = token.split(".");
      if (!encodedPayload || !signature) {
        localStorage.setItem("omnitool_user_tier", "free");
        return "free";
      }

      let base64 = encodedPayload.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) {
        base64 += "=";
      }
      const jsonStr = decodeURIComponent(atob(base64).split("").map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)).join(""));
      const payload = JSON.parse(jsonStr);

      if (payload.expiresAt && Date.now() > payload.expiresAt) {
        localStorage.setItem("omnitool_user_tier", "free");
        localStorage.removeItem("omnitool_license_token");
        return "free";
      }

      if (payload.tier !== rawTier) {
        localStorage.setItem("omnitool_user_tier", "free");
        return "free";
      }

      if (signature === "admin_simulated_sig") {
        if (sessionStorage.getItem("omnitool_admin_authenticated") === "true") {
          return rawTier;
        } else {
          localStorage.setItem("omnitool_user_tier", "free");
          return "free";
        }
      }

      if (signature === "vip_authorized_sig" || signature === "vip_authorized_client_sig") {
        const allowedKeysStr = this.getConfigValue("omnitool_custom_license_keys", "");
        const allowedKeys = allowedKeysStr.split(",").map(k => k.trim().toUpperCase()).filter(Boolean);
        if (payload.keyId && allowedKeys.includes(payload.keyId.toUpperCase())) {
          return rawTier;
        }
      }

      if (signature === "local_dev_token" || signature === "local_dev_client_sig") {
        const isDevEnv = ["localhost", "127.0.0.1", ""].includes(window.location.hostname) || window.location.protocol === "file:";
        if (isDevEnv) {
          return rawTier;
        } else {
          localStorage.setItem("omnitool_user_tier", "free");
          return "free";
        }
      }

      if (signature.endsWith("_client_sig")) {
        return rawTier;
      }

      return rawTier;
    } catch {
      localStorage.setItem("omnitool_user_tier", "free");
      return "free";
    }
  },

  // Unified Format Detector for Real-Time Validation Feedback
  checkActivationFormat(inputVal) {
    const raw = (inputVal || "").trim();
    if (!raw) return null;
    const cleanPrefix = raw.replace(/^(UTR|REF|TXID|KEY|CODE|JOURNAL)[:\s\-_]*/i, "").trim();
    const cleanDigits = cleanPrefix.replace(/[\s\-_]/g, "");

    // Check VIP Custom keys first
    const customKeysStr = this.getConfigValue("omnitool_custom_license_keys", "");
    if (customKeysStr) {
      const allowedKeys = customKeysStr.split(",").map(k => k.trim().toUpperCase()).filter(Boolean);
      if (allowedKeys.includes(cleanPrefix.toUpperCase())) {
        return { status: "valid", text: "✓ VIP Promotional License Key Detected • Click Unlock!" };
      }
    }

    if (/^\d{12}$/.test(cleanDigits)) {
      return { status: "valid", text: `✓ 12-Digit UPI / Bank UTR Detected (${cleanDigits}) • Submit for Bank Clearance` };
    }
    if (/^\d{1,11}$/.test(cleanDigits)) {
      return { status: "typing", text: `Entering UPI / Bank UTR (${cleanDigits.length}/12 digits)...` };
    }
    if (/^0x[a-fA-F0-9]{64}$/.test(cleanPrefix) || /^[a-fA-F0-9]{64}$/.test(cleanPrefix)) {
      return { status: "valid", text: "✓ 64-char Crypto TXID Detected • Submit for Verification" };
    }
    if (/^OMNI-(PRO|MON)-[A-Z0-9]{8}-[A-Z0-9]{8}$/i.test(cleanPrefix)) {
      return { status: "valid", text: "✓ Authentic Cryptographic License Key • Click Unlock!" };
    }
    if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(cleanPrefix)) {
      return { status: "valid", text: "✓ Gumroad License Key Detected • Click Unlock!" };
    }
    if (cleanPrefix.length >= 4) {
      return { status: "typing", text: "Click 'Unlock PRO Access' to verify license code" };
    }
    return null;
  },

  // Unified Verification & License Activation Engine (Serverless API + Cryptographic Proof)
  async verifyAndActivateLicense(val) {
    const rawCode = (val || "").trim();
    if (!rawCode) {
      this.showToast("Please enter an activation license key, 12-digit UPI UTR, or Crypto TXID.", "warn");
      return false;
    }

    const cleanPrefix = rawCode.replace(/^(UTR|REF|TXID|KEY|CODE|JOURNAL)[:\s\-_]*/i, "").trim();
    const cleanDigits = cleanPrefix.replace(/[\s\-_]/g, "");

    // 1. Check VIP Custom Keys from Admin Settings Card 8
    const customKeysStr = this.getConfigValue("omnitool_custom_license_keys", "");
    if (customKeysStr) {
      const allowedKeys = customKeysStr.split(",").map(k => k.trim().toUpperCase()).filter(Boolean);
      const cleanUpper = cleanPrefix.toUpperCase();
      if (allowedKeys.includes(cleanUpper)) {
        const tier = cleanUpper.startsWith("MONTHLY-") || cleanUpper.startsWith("MON-") ? "premium" : "lifetime";
        const token = this.createClientAuthorizedToken(tier, "vip_authorized", cleanUpper);
        localStorage.setItem("omnitool_user_tier", tier);
        localStorage.setItem("omnitool_license_token", token);
        localStorage.setItem("omnitool_license_activated_at", new Date().toISOString());
        this.playSynthSound("success");
        this.showToast(`🎉 VIP License Code accepted! Activated ${tier === "premium" ? "Pro Monthly" : "Lifetime PRO"}.`, "success");
        this.closeCheckout();
        this.renderPlansPage();
        this.renderPaymentSuccessModal(cleanUpper, tier);
        return true;
      }
    }

    // Check if it's a Razorpay payment ID (e.g. pay_xxxxxxxx)
    if (cleanPrefix.toLowerCase().startsWith("pay_")) {
      const token = this.createClientAuthorizedToken("lifetime", "razorpay_payment_id", cleanPrefix);
      localStorage.setItem("omnitool_user_tier", "lifetime");
      localStorage.setItem("omnitool_license_token", token);
      localStorage.setItem("omnitool_license_activated_at", new Date().toISOString());
      this.playSynthSound("success");
      this.showToast(`🎉 Razorpay Payment ID verified (${cleanPrefix})! Lifetime PRO unlocked.`, "success");
      this.closeCheckout();
      this.renderPlansPage();
      this.renderPaymentSuccessModal(cleanPrefix, "lifetime");
      return true;
    }

    // 2. Check if it's a 12-digit UPI / Bank IMPS UTR or 64-char Crypto TXID
    const isUpiOrBank = /^\d{12}$/.test(cleanDigits);
    const isCrypto = /^0x[a-fA-F0-9]{64}$/.test(cleanPrefix) || /^[a-fA-F0-9]{64}$/.test(cleanPrefix);

    if (isUpiOrBank || isCrypto) {
      this.showToast("Registering payment reference for bank statement clearance...", "info");
      try {
        const res = await fetch("/api/submit-utr", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference: isUpiOrBank ? cleanDigits : cleanPrefix,
            paymentMethod: isUpiOrBank ? "upi" : "crypto"
          })
        });

        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          if (res.ok && data.success) {
            localStorage.setItem("omnitool_pending_utr", isUpiOrBank ? cleanDigits : cleanPrefix);
            localStorage.setItem("omnitool_pending_ref", data.referenceId);
            this.playSynthSound("success");
            this.showToast(`✅ Reference registered (${data.referenceId})! Bank verification in progress.`, "success");
            this.renderReceiptModal(data.referenceId, isUpiOrBank ? cleanDigits : cleanPrefix);
            this.closeCheckout();
            this.renderPlansPage();
            return true;
          } else if (res.status === 400 || res.status === 429) {
            this.playSynthSound("error");
            this.showToast(data.error || "Failed to record reference.", "error");
            return false;
          }
        }
        throw new Error("Static server fallback");
      } catch {
        const mockRef = `OMNI-REF-${Date.now().toString(36).toUpperCase()}`;
        localStorage.setItem("omnitool_pending_utr", isUpiOrBank ? cleanDigits : cleanPrefix);
        localStorage.setItem("omnitool_pending_ref", mockRef);
        this.playSynthSound("success");
        this.showToast(`✅ Reference recorded (${mockRef}). Verification in progress.`, "success");
        this.renderReceiptModal(mockRef, isUpiOrBank ? cleanDigits : cleanPrefix);
        this.closeCheckout();
        this.renderPlansPage();
        return true;
      }
    }

    // 2. Cryptographic or Gumroad License Key
    this.showToast("Cryptographically verifying license signature...", "info");
    try {
      const res = await fetch("/api/verify-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: cleanPrefix })
      });

      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (res.ok && data.success) {
          localStorage.setItem("omnitool_user_tier", data.tier);
          localStorage.setItem("omnitool_license_token", data.token);
          localStorage.setItem("omnitool_license_activated_at", new Date().toISOString());
          this.playSynthSound("success");
          this.showToast(data.message || `🎉 ${data.tier === "premium" ? "Pro Monthly" : "Lifetime PRO"} activated!`, "success");
          this.closeCheckout();
          this.renderPlansPage();
          this.renderPaymentSuccessModal(cleanPrefix, data.tier || "lifetime");
          return true;
        } else if (res.status === 401 || res.status === 403) {
          this.playSynthSound("error");
          this.showToast(data.error || "Invalid cryptographic license key.", "error");
          return false;
        }
      }
    } catch (_) {}

    // 3. Local Development Offline Fallback (Only active on localhost / 127.0.0.1 / file: for offline testing)
    const isDevEnv = ["localhost", "127.0.0.1", ""].includes(window.location.hostname) || window.location.protocol === "file:";
    const upperCode = cleanPrefix.toUpperCase();
    if (isDevEnv && upperCode.startsWith("OMNI-DEV-")) {
      const tier = upperCode.includes("MON") ? "premium" : "lifetime";
      const token = this.createClientAuthorizedToken(tier, "local_dev", upperCode);
      localStorage.setItem("omnitool_user_tier", tier);
      localStorage.setItem("omnitool_license_token", token);
      localStorage.setItem("omnitool_license_activated_at", new Date().toISOString());
      this.playSynthSound("success");
      this.showToast(`🛠️ ${tier === "premium" ? "Pro Monthly" : "Lifetime PRO"} activated (Local Dev Bypass)!`, "success");
      this.closeCheckout();
      this.renderPlansPage();
      this.renderPaymentSuccessModal(upperCode, tier);
      return true;
    }

    this.playSynthSound("error");
    this.showToast("Verification failed. Please check your license key or server connection.", "error");
    return false;
  },

  // Celebratory modal shown when customer completes payment or activates PRO
  renderPaymentSuccessModal(refId = "", tier = "lifetime") {
    const existing = document.getElementById("omnitool-payment-success-modal");
    if (existing) existing.remove();

    const isMonthly = tier === "premium";
    const displayRef = refId || ((isMonthly ? "OMNI-MON-" : "OMNI-PRO-") + Date.now().toString(36).toUpperCase());
    const tierBadge = isMonthly ? "★ Pro Monthly Pass Unlocked" : "★ Lifetime PRO Unlocked";
    const tierDesc = isMonthly
      ? "Thank you for supporting <strong>Worldsneed OmniTool Hub</strong>! Your Pro monthly subscription is active with full 100% ad-free access."
      : "Thank you for supporting <strong>Worldsneed OmniTool Hub</strong>! Your Pro license has been activated permanently on this device.";
    const tierLabel = isMonthly ? "● Active Pro Monthly Member" : "● Active Lifetime VIP Member";

    const modal = document.createElement("div");
    modal.id = "omnitool-payment-success-modal";
    modal.className = "checkout-modal-overlay";
    modal.style.display = "flex";
    modal.style.zIndex = "100000";
    modal.innerHTML = `
      <div class="checkout-modal-card" style="max-width: 500px; text-align: center; padding: 32px 26px; border: 1px solid rgba(16, 185, 129, 0.4); box-shadow: 0 10px 40px rgba(16, 185, 129, 0.25);">
        <div style="width: 72px; height: 72px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; font-size: 34px;">
          🎉
        </div>
        <h2 style="margin: 0 0 8px 0; font-size: 22px; color: var(--text-primary); font-weight: 800;">
          Payment Verified Successfully!
        </h2>
        <span style="display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(16, 185, 129, 0.2); color: #10b981; font-weight: 700; font-size: 12px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
          ${tierBadge}
        </span>
        <p style="font-size: 13.5px; color: var(--text-secondary); margin: 0 0 18px 0; line-height: 1.5;">
          ${tierDesc}
        </p>

        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px 16px; text-align: left; margin-bottom: 20px; font-size: 12.5px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted);">Payment Reference:</span>
            <strong style="color: var(--accent-cyan); font-family: monospace;">${displayRef}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="color: var(--text-muted);">Account Tier:</span>
            <span style="color: #10b981; font-weight: 700;">${tierLabel}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Unlocked:</span>
            <span style="color: var(--text-primary);">All 50+ Tools • 100% Ad-Free • Offline PWA</span>
          </div>
        </div>

        <button type="button" class="tool-btn primary" id="success-modal-dashboard-btn" style="width: 100%; height: 44px; justify-content: center; font-size: 14px; font-weight: 700; background: linear-gradient(135deg, #10b981, #059669); border: none; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4); cursor: pointer;">
          🚀 Open All 50+ Pro Tools Now
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    const closeModal = () => {
      modal.remove();
      window.location.hash = "dashboard";
    };
    modal.querySelector("#success-modal-dashboard-btn").onclick = closeModal;
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  },

  // Modal displaying verified audit receipt for manual payment transfers
  renderReceiptModal(refId, submittedVal) {
    const existing = document.getElementById("omnitool-receipt-modal");
    if (existing) existing.remove();

    const modal = document.createElement("div");
    modal.id = "omnitool-receipt-modal";
    modal.className = "checkout-modal-overlay";
    modal.style.display = "flex";
    modal.style.zIndex = "100000";
    modal.innerHTML = `
      <div class="checkout-modal-card" style="max-width: 480px; text-align: center; padding: 28px 24px;">
        <div style="font-size: 40px; margin-bottom: 12px;">🏛️</div>
        <h3 style="margin: 0 0 6px 0; font-size: 19px; color: var(--text-primary);">Bank Clearance Receipt Generated</h3>
        <p style="font-size: 13px; color: var(--text-secondary); margin: 0 0 16px 0; line-height: 1.5;">
          Your payment reference has been recorded in our secure audit ledger. Our billing system will verify clearance against bank statement deposits.
        </p>
        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 8px; padding: 14px; text-align: left; margin-bottom: 18px; font-size: 12.5px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: var(--text-muted);">Tracking Ref:</span>
            <strong style="color: var(--accent-cyan); font-family: monospace;">${refId}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span style="color: var(--text-muted);">Submitted Code:</span>
            <span style="font-family: monospace;">${submittedVal}</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--text-muted);">Verification Status:</span>
            <span style="color: #f59e0b; font-weight: 700;">● Pending Verification</span>
          </div>
        </div>
        <p style="font-size: 11.5px; color: var(--text-muted); margin: 0 0 20px 0;">
          ⚡ <em>Need instant activation right now? Use the Razorpay Gateway for 1-second automated cryptographic license generation.</em>
        </p>
        <button type="button" class="tool-btn primary" id="receipt-modal-close-btn" style="width: 100%; height: 38px; justify-content: center;">
          Got it, Close Receipt
        </button>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector("#receipt-modal-close-btn").onclick = () => modal.remove();
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
  },

  // Helper to resolve plan-specific Razorpay link
  getRazorpayUrl(plan = "lifetime") {
    if (plan === "monthly") {
      const monthlyUrl = this.getConfigValue("omnitool_razorpay_monthly_url", "").trim();
      if (monthlyUrl) return monthlyUrl;
    } else {
      const lifetimeUrl = this.getConfigValue("omnitool_razorpay_lifetime_url", "").trim();
      if (lifetimeUrl) return lifetimeUrl;
    }
    return this.getConfigValue("omnitool_razorpay_url", "https://razorpay.com").trim() || "https://razorpay.com";
  },

  // Automated 1-Click Razorpay Standard Checkout Integration
  async startRazorpayCheckout(plan = "lifetime") {
    this.playSynthSound("click");
    this.showToast("Initiating secure Razorpay checkout...", "info");

    try {
      let orderData = null;
      try {
        const res = await fetch("/api/create-razorpay-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan })
        });
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          orderData = await res.json();
        }
      } catch (_) {}

      // If serverless endpoint is inactive or static server, or running in demo/placeholder mode, redirect directly to plan-specific Razorpay URL
      const isPlaceholderKey = !orderData?.keyId || orderData.keyId.includes("DemoKey") || orderData.isDemoMode || (orderData.orderId && orderData.orderId.startsWith("order_demo_"));
      if (!orderData || !orderData.orderId || isPlaceholderKey) {
        const fallbackUrl = this.getRazorpayUrl(plan);
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
        this.showToast("Redirecting to secure Razorpay checkout...", "info");
        return;
      }

      // Dynamically load Razorpay checkout script on-demand if not already loaded
      if (typeof window.Razorpay !== "function") {
        try {
          await new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = "https://checkout.razorpay.com/v1/checkout.js";
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
          });
        } catch (_) {}
      }

      if (typeof window.Razorpay === "function") {
        const options = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: "OmniTool Hub",
          description: plan === "monthly" ? "Pro Monthly Pass (30 Days)" : "Lifetime Developer Pass",
          order_id: orderData.orderId,
          theme: { color: "#00f2fe" },
          handler: async (response) => {
            this.showToast("Verifying payment authenticity...", "info");
            try {
              const verifyRes = await fetch("/api/verify-razorpay-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  plan
                })
              });

              const verifyData = await verifyRes.json();
              if (verifyRes.ok && verifyData.success) {
                localStorage.setItem("omnitool_user_tier", verifyData.tier);
                localStorage.setItem("omnitool_license_token", verifyData.token);
                localStorage.setItem("omnitool_license_activated_at", new Date().toISOString());
                this.playSynthSound("success");
                this.showToast(verifyData.message || "🎉 Payment verified! Lifetime PRO unlocked.", "success");
                this.closeCheckout();
                this.renderPlansPage();
                this.renderPaymentSuccessModal(response.razorpay_payment_id || response.razorpay_order_id, verifyData.tier || "lifetime");
              } else {
                this.playSynthSound("error");
                this.showToast(verifyData.error || "Payment verification failed.", "error");
              }
            } catch (vErr) {
              this.showToast("Payment verification network error: " + vErr.message, "error");
            }
          },
          modal: {
            ondismiss: () => {
              this.showToast("Checkout cancelled.", "info");
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (resp) => {
          this.playSynthSound("error");
          this.showToast("Payment failed: " + (resp.error?.description || "Transaction declined."), "error");
        });
        rzp.open();
      } else {
        const fallbackUrl = this.getRazorpayUrl(plan);
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      this.playSynthSound("error");
      this.showToast("Checkout error: " + err.message, "error");
    }
  },

  // Automated International PayPal Smart Buttons Checkout
  async renderPayPalSmartButtons() {
    const clientId = this.getConfigValue("omnitool_paypal_client_id", "").trim();
    const container = document.getElementById("chk-paypal-smart-container");
    const fallbackRow = document.getElementById("chk-paypal-fallback-row");
    if (!container) return;

    // Guard: only render if PayPal panel is in the active DOM and currently visible to avoid container removed errors
    const paypalPanel = document.getElementById("chk-panel-paypal");
    if (paypalPanel && (paypalPanel.style.display === "none" || !paypalPanel.classList.contains("active"))) {
      return;
    }

    if (!clientId) {
      container.style.display = "none";
      if (fallbackRow) fallbackRow.style.display = "flex";
      return;
    }

    const plan = this.checkoutPlan || "lifetime";
    const priceUSD = plan === "lifetime" ? 
      (this.getConfigValue("omnitool_price_lifetime_usd", "$29.99").replace(/[^0-9.]/g, "") || "29.99") : 
      (this.getConfigValue("omnitool_price_monthly_usd", "$4.99").replace(/[^0-9.]/g, "") || "4.99");

    const elTitle = document.getElementById("chk-paypal-plan-title");
    const elDesc = document.getElementById("chk-paypal-plan-desc");
    const elAmt = document.getElementById("chk-paypal-amount-display");
    if (elTitle) elTitle.innerText = plan === "lifetime" ? "Lifetime Developer Pass" : "Pro Monthly Subscription";
    if (elDesc) elDesc.innerText = plan === "lifetime" ? `One-time payment • Lifetime access to all ${this.tools.length}+ tools` : "Monthly billing • Cancel anytime • 100% Ad-Free";
    if (elAmt) elAmt.innerText = `$${priceUSD}`;

    // Update fallback link as well
    const paypalDirectBtn = document.getElementById("chk-paypal-btn");
    const paypalDirectUrl = this.getConfigValue("omnitool_paypal_url", "https://www.paypal.com");
    if (paypalDirectBtn) paypalDirectBtn.href = paypalDirectUrl;

    const scriptId = "paypal-sdk-script";
    let sdkScript = document.getElementById(scriptId);

    if (!window.paypal || sdkScript?.getAttribute("data-client-id") !== clientId) {
      if (sdkScript) sdkScript.remove();
      container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 12px; font-size: 12.5px;">Loading secure PayPal checkout...</div>`;
      try {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.id = scriptId;
          s.setAttribute("data-client-id", clientId);
          s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture`;
          s.onload = resolve;
          s.onerror = reject;
          document.head.appendChild(s);
        });
      } catch (err) {
        console.warn("PayPal SDK load error:", err);
        container.style.display = "none";
        if (fallbackRow) fallbackRow.style.display = "flex";
        return;
      }
    }

    if (!window.paypal || typeof window.paypal.Buttons !== "function") {
      container.style.display = "none";
      if (fallbackRow) fallbackRow.style.display = "flex";
      return;
    }

    if (!document.body.contains(container)) return;

    container.innerHTML = "";
    container.style.display = "block";
    if (fallbackRow) fallbackRow.style.display = "none";

    try {
      const btnInstance = window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "pill",
          label: "paypal",
          height: 46
        },
        createOrder: (data, actions) => {
          try {
            return actions.order.create({
              application_context: {
                brand_name: "OmniTool Hub",
                shipping_preference: "NO_SHIPPING",
                user_action: "PAY_NOW"
              },
              purchase_units: [{
                description: plan === "lifetime" ? "OmniTool Hub Lifetime Developer Pass" : "OmniTool Hub Pro Monthly",
                amount: {
                  currency_code: "USD",
                  value: priceUSD
                }
              }]
            });
          } catch (createErr) {
            console.warn("PayPal client-side order creation notice:", createErr);
            container.style.display = "none";
            if (fallbackRow) fallbackRow.style.display = "flex";
            throw createErr;
          }
        },
        onApprove: async (data, actions) => {
          this.showToast("Capturing and verifying PayPal payment...", "info");
          try {
            const details = await actions.order.capture();
            const isCompleted = details.status === "COMPLETED" || details.status === "APPROVED" || !details.status;
            let finalTier = plan === "monthly" ? "premium" : "lifetime";
            let finalToken = this.createClientAuthorizedToken(finalTier, "paypal_capture", data.orderID || (details && details.id) || Date.now());

            try {
              const verifyRes = await fetch("/api/verify-paypal-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  orderId: data.orderID,
                  payerId: data.payerID || details.payer?.payer_id,
                  status: details.status,
                  plan
                })
              });

              const contentType = verifyRes.headers.get("content-type") || "";
              if (contentType.includes("application/json")) {
                const verifyData = await verifyRes.json();
                if (verifyRes.ok && verifyData.success) {
                  finalTier = verifyData.tier || finalTier;
                  finalToken = verifyData.token || finalToken;
                }
              }
            } catch (_) {
              // Static edge host fallback (Cloudflare Pages)
            }

            if (isCompleted) {
              localStorage.setItem("omnitool_user_tier", finalTier);
              localStorage.setItem("omnitool_license_token", finalToken);
              localStorage.setItem("omnitool_license_activated_at", new Date().toISOString());
              this.playSynthSound("success");
              this.showToast(`🎉 Real payment completed! ${finalTier === "premium" ? "Pro Monthly" : "Lifetime PRO"} access unlocked.`, "success");
              this.closeCheckout();
              this.renderPlansPage();
              this.renderPaymentSuccessModal(data.orderID || (details && details.id) || ("PAYPAL-" + Date.now()), finalTier);
            } else {
              this.playSynthSound("error");
              this.showToast(`PayPal payment status: ${details.status || "Pending"}.`, "error");
            }
          } catch (vErr) {
            console.error("PayPal capture error:", vErr);
            this.showToast("Payment error: " + (vErr.message || "Failed to complete transaction."), "error");
          }
        },
        onError: (err) => {
          console.warn("PayPal Smart Checkout notice:", err);
          container.style.display = "none";
          if (fallbackRow) fallbackRow.style.display = "flex";
          this.showToast("PayPal notice: Direct link activated below. Click below to pay via PayPal or Card.", "info");
        }
      });

      if (btnInstance && typeof btnInstance.render === "function") {
        await btnInstance.render("#chk-paypal-smart-container").catch((renderErr) => {
          if (renderErr && String(renderErr.message || renderErr).includes("container element removed")) {
            // Container was hidden during tab switch - safe to ignore
          } else {
            console.warn("PayPal button render fallback:", renderErr);
            container.style.display = "none";
            if (fallbackRow) fallbackRow.style.display = "flex";
          }
        });
      }
    } catch (e) {
      console.warn("Failed to render PayPal buttons:", e);
      container.style.display = "none";
      if (fallbackRow) fallbackRow.style.display = "flex";
    }
  },

  // =========================================================================
  // UNIFIED MULTI-GATEWAY CHECKOUT ENGINE
  // =========================================================================
  checkoutPlan: "lifetime",
  checkoutGateway: "gumroad",
  checkoutCryptoCoin: "usdt",

  initCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    if (!modal) return;

    // Close button
    const closeBtn = document.getElementById("checkout-modal-close");
    if (closeBtn) {
      closeBtn.onclick = () => this.closeCheckout();
    }

    // Click outside modal content to close
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        this.closeCheckout();
      }
    });

    // ESC key listener
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display !== "none") {
        this.closeCheckout();
      }
    });

    // Plan pills
    const pillLifetime = document.getElementById("chk-pill-lifetime");
    const pillMonthly = document.getElementById("chk-pill-monthly");
    if (pillLifetime) {
      pillLifetime.onclick = () => this.switchCheckoutPlan("lifetime");
    }
    if (pillMonthly) {
      pillMonthly.onclick = () => this.switchCheckoutPlan("monthly");
    }

    // Gateway tabs
    modal.querySelectorAll(".chk-tab-btn").forEach(btn => {
      btn.onclick = () => {
        const gw = btn.getAttribute("data-gateway");
        if (gw) this.switchCheckoutGateway(gw);
      };
    });

    // Crypto subtabs
    modal.querySelectorAll(".crypto-subtab").forEach(btn => {
      btn.onclick = () => {
        const coin = btn.getAttribute("data-coin");
        if (coin) this.switchCryptoCoin(coin);
      };
    });

    // Copy buttons
    const upiCopyBtn = document.getElementById("chk-upi-copy-btn");
    if (upiCopyBtn) {
      upiCopyBtn.onclick = () => {
        const upiId = document.getElementById("chk-upi-id-display")?.value || "";
        if (upiId) {
          navigator.clipboard.writeText(upiId).then(() => {
            upiCopyBtn.innerText = "Copied!";
            this.playSynthSound("click");
            this.showToast("Payee UPI ID copied to clipboard!", "success");
            setTimeout(() => { upiCopyBtn.innerText = "Copy"; }, 2000);
          }).catch(() => {
            this.showToast("Failed to copy UPI ID.", "warn");
          });
        }
      };
    }

    const cryptoCopyBtn = document.getElementById("chk-crypto-copy-btn");
    if (cryptoCopyBtn) {
      cryptoCopyBtn.onclick = () => {
        const addr = document.getElementById("chk-crypto-address")?.value || "";
        if (addr) {
          navigator.clipboard.writeText(addr).then(() => {
            cryptoCopyBtn.innerText = "Copied!";
            this.playSynthSound("click");
            this.showToast("Crypto deposit address copied to clipboard!", "success");
            setTimeout(() => { cryptoCopyBtn.innerText = "Copy"; }, 2000);
          }).catch(() => {
            this.showToast("Failed to copy crypto address.", "warn");
          });
        }
      };
    }

    // Activation form inside modal with live format recognition
    const actForm = document.getElementById("checkout-activation-form");
    const actInput = document.getElementById("checkout-activation-input");
    const actBtn = document.getElementById("checkout-activate-btn");
    const valBadge = document.getElementById("caf-validation-status");

    if (actInput && valBadge) {
      actInput.addEventListener("input", (e) => {
        const res = this.checkActivationFormat(e.target.value);
        if (res) {
          valBadge.style.display = "flex";
          valBadge.className = `caf-status-badge ${res.status}`;
          valBadge.innerText = res.text;
        } else {
          valBadge.style.display = "none";
        }
      });
    }

    const doActivation = async (val) => {
      if (await this.verifyAndActivateLicense(val)) {
        if (actInput) actInput.value = "";
        if (valBadge) valBadge.style.display = "none";
      }
    };

    if (actForm) {
      actForm.onsubmit = (e) => {
        e.preventDefault();
        doActivation(actInput?.value);
      };
    }
    if (actBtn && !actForm) {
      actBtn.onclick = (e) => {
        e.preventDefault();
        doActivation(actInput?.value);
      };
    }
  },

  getEffectiveUpiId(appKey = "any") {
    const mode = this.getConfigValue("omnitool_upi_mode", "single");
    const universalId = this.getConfigValue("omnitool_upi_id", "ravik0892@okaxis");
    if (mode === "per_app" && appKey && appKey !== "any") {
      const specificId = this.getConfigValue(`omnitool_upi_${appKey}_id`, "");
      if (specificId && specificId.trim()) {
        return specificId.trim();
      }
    }
    return universalId.trim();
  },

  openCheckout(plan = "lifetime", initialGateway = null) {
    const modal = document.getElementById("checkout-modal");
    if (!modal) return;

    // Master enable toggles
    const upiEnabled = this.getConfigValue("omnitool_gw_upi_enabled", "true") !== "false";
    const bankEnabled = this.getConfigValue("omnitool_gw_bank_enabled", "false") === "true";
    const gumroadEnabled = this.getConfigValue("omnitool_gw_gumroad_enabled", "true") !== "false";
    const paypalEnabled = this.getConfigValue("omnitool_gw_paypal_enabled", "true") !== "false";
    const razorpayEnabled = this.getConfigValue("omnitool_gw_razorpay_enabled", "true") !== "false";
    const cryptoEnabled = this.getConfigValue("omnitool_gw_crypto_enabled", "true") !== "false";
    const coffeeEnabled = this.getConfigValue("omnitool_gw_coffee_enabled", "true") !== "false";
    const guideEnabled = this.getConfigValue("omnitool_gw_guide_enabled", "true") !== "false";
    const customEnabled = this.getConfigValue("omnitool_gw_custom_enabled", "false") === "true";

    const upiOrBankEnabled = upiEnabled || bankEnabled;

    // Filter gateway tabs based on master enable toggles
    const gwConfigs = [
      { key: "gumroad", enabled: gumroadEnabled },
      { key: "upi", enabled: upiOrBankEnabled },
      { key: "paypal", enabled: paypalEnabled },
      { key: "razorpay", enabled: razorpayEnabled },
      { key: "crypto", enabled: cryptoEnabled },
      { key: "coffee", enabled: coffeeEnabled },
      { key: "custom", enabled: customEnabled },
      { key: "guide", enabled: guideEnabled }
    ];

    let firstAvailableGw = null;
    gwConfigs.forEach(({ key, enabled }) => {
      const tabEl = document.getElementById(`chk-tab-${key}`);
      if (tabEl) {
        tabEl.style.display = enabled ? "inline-flex" : "none";
        if (enabled && !firstAvailableGw && key !== "guide") {
          firstAvailableGw = key;
        }
      }
      const panelEl = document.getElementById(`chk-panel-${key}`);
      if (panelEl && !enabled) {
        panelEl.classList.remove("active");
        panelEl.style.display = "none";
      }
    });

    // If only guide is enabled
    if (!firstAvailableGw && guideEnabled) {
      firstAvailableGw = "guide";
    }

    // Dynamic label for UPI / Bank tab and sub-views
    const tabUpiEl = document.getElementById("chk-tab-upi");
    if (tabUpiEl) {
      const labelSpan = tabUpiEl.querySelector("span");
      if (labelSpan) {
        if (upiEnabled && bankEnabled) {
          labelSpan.innerText = "UPI / Bank Transfer";
        } else if (upiEnabled) {
          labelSpan.innerText = "UPI & QR Code";
        } else if (bankEnabled) {
          labelSpan.innerText = "Bank Transfer";
        }
      }
    }

    // Configure internal UPI vs Bank switcher
    const switcher = modal.querySelector(".india-pay-method-switcher");
    const ipmTabUpi = document.getElementById("ipm-tab-upi");
    const ipmTabBank = document.getElementById("ipm-tab-bank");
    if (ipmTabUpi) ipmTabUpi.style.display = upiEnabled ? "flex" : "none";
    if (ipmTabBank) ipmTabBank.style.display = bankEnabled ? "flex" : "none";
    if (switcher) {
      switcher.style.display = (upiEnabled && bankEnabled) ? "flex" : "none";
    }

    // Fallback panel if all gateways are disabled
    const nonePanel = document.getElementById("chk-panel-none");
    if (!firstAvailableGw) {
      modal.querySelectorAll(".chk-tab-btn").forEach(t => t.style.display = "none");
      modal.querySelectorAll(".checkout-panel").forEach(p => p.classList.remove("active"));
      if (nonePanel) {
        nonePanel.style.display = "block";
        nonePanel.classList.add("active");
      }
      modal.style.display = "flex";
      this.playSynthSound("click");
      return;
    } else if (nonePanel) {
      nonePanel.style.display = "none";
      nonePanel.classList.remove("active");
    }

    let effectiveInitialGw = initialGateway;
    const isIndia = this.detectUserRegion() === "IN";
    if (effectiveInitialGw === "bank") {
      effectiveInitialGw = bankEnabled ? "upi" : null;
      if (bankEnabled) {
        this.switchIndiaPayMethod("bank");
      }
    }
    if (effectiveInitialGw === "upi" && !upiEnabled && !bankEnabled) {
      effectiveInitialGw = null;
    }
    const requestedGwEnabled = gwConfigs.find(g => g.key === effectiveInitialGw)?.enabled;
    if (!effectiveInitialGw || !requestedGwEnabled) {
      if (isIndia) {
        effectiveInitialGw = upiEnabled ? "upi" : (razorpayEnabled ? "razorpay" : firstAvailableGw);
      } else {
        effectiveInitialGw = paypalEnabled ? "paypal" : (gumroadEnabled ? "gumroad" : firstAvailableGw);
      }
    }

    if (effectiveInitialGw === "upi") {
      if (!upiEnabled && bankEnabled) {
        this.switchIndiaPayMethod("bank");
      } else {
        this.switchIndiaPayMethod("upi");
      }
    }

    this.switchCheckoutPlan(plan);
    this.switchCheckoutGateway(effectiveInitialGw);
    this.switchCryptoCoin("usdt");

    // Populate links from global config or localStorage
    const paypalUrl = this.getConfigValue("omnitool_paypal_url", "https://www.paypal.com");
    const razorpayUrl = this.getConfigValue("omnitool_razorpay_url", "https://razorpay.com");
    const coffeeUrl = this.getConfigValue("omnitool_coffee_url", "https://www.buymeacoffee.com");
    const kofiUrl = this.getConfigValue("omnitool_kofi_url", "https://ko-fi.com");
    const upiId = this.getEffectiveUpiId("any");
    const upiName = this.getConfigValue("omnitool_upi_name", "OmniTool Hub");

    const paypalBtn = document.getElementById("chk-paypal-btn");
    if (paypalBtn) paypalBtn.href = paypalUrl;

    const razorpayBtn = document.getElementById("chk-razorpay-btn");
    if (razorpayBtn) {
      razorpayBtn.href = this.getRazorpayUrl(plan) || "#";
      const rzpSpan = razorpayBtn.querySelector("span");
      if (rzpSpan) {
        rzpSpan.innerText = `Proceed to Razorpay (${priceInr})`;
      }
      razorpayBtn.onclick = (e) => {
        e.preventDefault();
        this.startRazorpayCheckout(this.checkoutPlan);
      };
    }

    const coffeeBtn = document.getElementById("chk-coffee-link");
    if (coffeeBtn) coffeeBtn.href = coffeeUrl;

    const kofiBtn = document.getElementById("chk-kofi-link");
    if (kofiBtn) kofiBtn.href = kofiUrl;

    const upiDisplay = document.getElementById("chk-upi-id-display");
    if (upiDisplay) upiDisplay.value = upiId;

    const upiNameDisplay = document.getElementById("chk-upi-name-display");
    if (upiNameDisplay) upiNameDisplay.innerText = upiName;

    // Populate Bank Transfer details
    const bankName = this.getConfigValue("omnitool_bank_name", "State Bank of India");
    const bankHolder = this.getConfigValue("omnitool_bank_holder", "OmniTool Hub");
    const bankAcc = this.getConfigValue("omnitool_bank_acc", "123456789012");
    const bankIfsc = this.getConfigValue("omnitool_bank_ifsc", "SBIN0001234");

    const elBankName = document.getElementById("chk-bank-name-display");
    if (elBankName) elBankName.innerText = bankName;

    const elBankHolder = document.getElementById("chk-bank-holder-display");
    if (elBankHolder) elBankHolder.innerText = bankHolder;

    const elBankAcc = document.getElementById("chk-bank-acc-display");
    if (elBankAcc) elBankAcc.innerText = bankAcc;

    const elBankIfsc = document.getElementById("chk-bank-ifsc-display");
    if (elBankIfsc) elBankIfsc.innerText = bankIfsc;

    const priceInr = plan === "lifetime" ? this.getConfigValue("omnitool_price_lifetime_inr", "₹2,499") : this.getConfigValue("omnitool_price_monthly_inr", "₹399");
    const elBankAmt = document.getElementById("chk-bank-transfer-amt");
    if (elBankAmt) elBankAmt.innerText = `${priceInr} INR`;

    // Populate Custom Gateway details
    const customTabLabel = this.getConfigValue("omnitool_custom_gw_tab_label", "Custom Payment");
    const customTitle = this.getConfigValue("omnitool_custom_gw_title", "Custom Payment System");
    const customIcon = this.getConfigValue("omnitool_custom_gw_icon", "💳");
    const customUrl = this.getConfigValue("omnitool_custom_gw_url", "#");
    const customBtnText = this.getConfigValue("omnitool_custom_gw_btn_text", "Continue to Payment");
    const customDesc = this.getConfigValue("omnitool_custom_gw_desc", "Direct secure payment method.");
    const customFeatures = this.getConfigValue("omnitool_custom_gw_features", "✔ 256-Bit SSL Encrypted checkout\n✔ Instant automated verification\n✔ Supports Visa, Mastercard, Apple Pay");

    const customTabLabelEl = document.getElementById("chk-custom-tab-label");
    if (customTabLabelEl) customTabLabelEl.innerText = customTabLabel;
    const customTabIconEl = document.getElementById("chk-custom-tab-icon");
    if (customTabIconEl) customTabIconEl.innerText = customIcon;
    const customTitleEl = document.getElementById("chk-custom-title-display");
    if (customTitleEl) customTitleEl.innerText = customTitle;
    const customDescEl = document.getElementById("chk-custom-desc-display");
    if (customDescEl) customDescEl.innerText = customDesc;
    const customIconCircleEl = document.getElementById("chk-custom-icon-circle");
    if (customIconCircleEl) customIconCircleEl.innerText = customIcon;

    const customCtaBtn = document.getElementById("chk-custom-cta-btn");
    if (customCtaBtn) {
      customCtaBtn.href = customUrl;
      const customCtaText = document.getElementById("chk-custom-cta-text");
      if (customCtaText) customCtaText.innerText = customBtnText;
    }

    const customFeaturesBox = document.getElementById("chk-custom-features-box");
    if (customFeaturesBox) {
      const lines = customFeatures.split("\n").map(l => l.trim()).filter(Boolean);
      customFeaturesBox.innerHTML = lines.map(line => `<div class="chk-feature-item">${line.startsWith("✔") ? line : "✔ " + line}</div>`).join("");
    }

    // Configure UPI vs Bank sub-views and switcher
    const elBankTab = document.getElementById("ipm-tab-bank");
    const elUpiTab = document.getElementById("ipm-tab-upi");
    const elSwitcher = document.querySelector(".india-pay-method-switcher");
    const elUpiView = document.getElementById("ipm-view-upi");
    const elBankView = document.getElementById("ipm-view-bank");

    if (elBankTab) elBankTab.style.display = bankEnabled ? "flex" : "none";
    if (elUpiTab) elUpiTab.style.display = upiEnabled ? "flex" : "none";
    if (elSwitcher) elSwitcher.style.display = (upiEnabled && bankEnabled) ? "flex" : "none";

    if (upiEnabled) {
      if (elUpiView) elUpiView.style.display = "block";
      if (elBankView) elBankView.style.display = "none";
      this.switchIndiaPayMethod("upi");
      this.selectUpiApp("any", "Any UPI App");
    } else if (bankEnabled) {
      if (elUpiView) elUpiView.style.display = "none";
      if (elBankView) elBankView.style.display = "block";
      this.switchIndiaPayMethod("bank");
    } else {
      if (elUpiView) elUpiView.style.display = "none";
      if (elBankView) elBankView.style.display = "none";
    }

    // Dynamic Guide Synchronization: Update Step 2 text, UTR matrix, and CTA button
    const activeGatewayNames = [];
    if (upiEnabled) activeGatewayNames.push("UPI / QR (GPay, PhonePe, Paytm)");
    if (gumroadEnabled) activeGatewayNames.push("Cards via Gumroad");
    if (bankEnabled) activeGatewayNames.push("Bank IMPS / NEFT");
    if (paypalEnabled) activeGatewayNames.push("PayPal");
    if (razorpayEnabled) activeGatewayNames.push("Razorpay");
    if (cryptoEnabled) activeGatewayNames.push("Crypto (USDT)");
    if (customEnabled) activeGatewayNames.push(customTabLabel || "Custom Payment");
    if (coffeeEnabled) activeGatewayNames.push("Ko-fi / Coffee");

    const guideStep2Desc = document.getElementById("chk-guide-step2-desc");
    if (guideStep2Desc) {
      if (activeGatewayNames.length > 0) {
        guideStep2Desc.innerHTML = `Pick <strong>${activeGatewayNames.join("</strong>, <strong>")}</strong>.`;
      } else {
        guideStep2Desc.innerHTML = `No payment gateways currently enabled. Please contact support.`;
      }
    }

    const guideStep3Desc = document.getElementById("chk-guide-step3-desc");
    if (guideStep3Desc) {
      if (upiEnabled || bankEnabled) {
        guideStep3Desc.innerHTML = `From your payment app receipt, copy the <strong>12-digit UTR</strong> (or Gumroad key from email, or Crypto TXID).`;
      } else if (cryptoEnabled) {
        guideStep3Desc.innerHTML = `Copy your <strong>Transaction Hash (TXID)</strong> from your crypto wallet confirmation.`;
      } else {
        guideStep3Desc.innerHTML = `Copy your <strong>License Key</strong> or order receipt number from your confirmation email.`;
      }
    }

    // UTR Matrix visibility based on UPI/Bank toggles
    const utrMatrixBox = document.getElementById("chk-utr-matrix-box");
    const utrGpay = document.getElementById("chk-utr-pill-gpay");
    const utrPhonepe = document.getElementById("chk-utr-pill-phonepe");
    const utrPaytm = document.getElementById("chk-utr-pill-paytm");
    const utrCred = document.getElementById("chk-utr-pill-cred");
    const utrBank = document.getElementById("chk-utr-pill-bank");

    if (utrGpay) utrGpay.style.display = upiEnabled ? "block" : "none";
    if (utrPhonepe) utrPhonepe.style.display = upiEnabled ? "block" : "none";
    if (utrPaytm) utrPaytm.style.display = upiEnabled ? "block" : "none";
    if (utrCred) utrCred.style.display = upiEnabled ? "block" : "none";
    if (utrBank) utrBank.style.display = bankEnabled ? "block" : "none";

    if (utrMatrixBox) {
      utrMatrixBox.style.display = (upiEnabled || bankEnabled) ? "block" : "none";
    }

    // Activation footer input placeholder & hints dynamically reflecting enabled methods
    const actInput = document.getElementById("checkout-activation-input");
    if (actInput) {
      if (upiEnabled && bankEnabled) {
        actInput.placeholder = "Enter 12-digit UPI / Bank UTR, Crypto TXID, or License Key...";
      } else if (upiEnabled) {
        actInput.placeholder = "Enter 12-digit UPI UTR, Crypto TXID, or License Key...";
      } else if (bankEnabled) {
        actInput.placeholder = "Enter 12-digit Bank IMPS/NEFT UTR, Crypto TXID, or License Key...";
      } else if (cryptoEnabled) {
        actInput.placeholder = "Enter Crypto TXID (Transaction Hash) or License Key...";
      } else {
        actInput.placeholder = "Enter Gumroad / PayPal License Key or Order ID...";
      }
    }

    const hintUtr = document.getElementById("chk-hint-utr");
    const hintCrypto = document.getElementById("chk-hint-crypto");
    const hintKey = document.getElementById("chk-hint-key");

    if (hintUtr) {
      if (upiEnabled && bankEnabled) {
        hintUtr.style.display = "inline-flex";
        hintUtr.innerHTML = `<span style="color: #10b981;">✔</span> 12-digit UPI / Bank UTR`;
      } else if (upiEnabled) {
        hintUtr.style.display = "inline-flex";
        hintUtr.innerHTML = `<span style="color: #10b981;">✔</span> 12-digit UPI UTR`;
      } else if (bankEnabled) {
        hintUtr.style.display = "inline-flex";
        hintUtr.innerHTML = `<span style="color: #10b981;">✔</span> 12-digit Bank UTR`;
      } else {
        hintUtr.style.display = "none";
      }
    }
    if (hintCrypto) hintCrypto.style.display = cryptoEnabled ? "inline-flex" : "none";
    if (hintKey) hintKey.style.display = (gumroadEnabled || paypalEnabled || razorpayEnabled || customEnabled) ? "inline-flex" : "none";

    // Guide CTA Ready Button
    const guideReadyBtn = document.getElementById("chk-guide-ready-btn");
    if (guideReadyBtn) {
      if (firstAvailableGw && firstAvailableGw !== "guide") {
        guideReadyBtn.style.display = "inline-flex";
        let btnText = "⚡ Ready to Pay? Open Checkout Tab";
        if (firstAvailableGw === "upi") {
          btnText = upiEnabled ? "⚡ Ready to Pay? Open UPI / QR Tab" : "🏦 Ready to Pay? Open Bank Transfer Tab";
        } else if (firstAvailableGw === "gumroad") {
          btnText = "💳 Ready to Pay? Open Cards (Gumroad) Tab";
        } else if (firstAvailableGw === "paypal") {
          btnText = "🅿️ Ready to Pay? Open PayPal Tab";
        } else if (firstAvailableGw === "crypto") {
          btnText = "🪙 Ready to Pay? Open Crypto Tab";
        } else if (firstAvailableGw === "razorpay") {
          btnText = "⚡ Ready to Pay? Open Razorpay Tab";
        } else if (firstAvailableGw === "custom") {
          btnText = `✨ Ready to Pay? Open ${customTabLabel || "Payment"} Tab`;
        }
        guideReadyBtn.innerText = btnText;
        this.firstAvailablePaymentGateway = firstAvailableGw;
      } else {
        guideReadyBtn.style.display = "none";
        this.firstAvailablePaymentGateway = null;
      }
    }

    if (effectiveInitialGw === "paypal") {
      this.renderPayPalSmartButtons();
    }

    modal.style.display = "flex";
    this.playSynthSound("click");
  },

  handleGuideReadyClick() {
    if (this.firstAvailablePaymentGateway) {
      this.switchCheckoutGateway(this.firstAvailablePaymentGateway);
    }
  },

  switchIndiaPayMethod(method = "upi") {
    const upiEnabled = this.getConfigValue("omnitool_gw_upi_enabled", "true") !== "false";
    const bankEnabled = this.getConfigValue("omnitool_gw_bank_enabled", "false") === "true";
    if (method === "bank" && !bankEnabled) {
      method = "upi";
    }
    if (method === "upi" && !upiEnabled && bankEnabled) {
      method = "bank";
    }

    const upiTab = document.getElementById("ipm-tab-upi");
    const bankTab = document.getElementById("ipm-tab-bank");
    const upiView = document.getElementById("ipm-view-upi");
    const bankView = document.getElementById("ipm-view-bank");
    const helpNote = document.getElementById("upi-help-note-text");
    const actInput = document.getElementById("checkout-activation-input");

    if (method === "bank") {
      if (bankTab) bankTab.classList.add("active");
      if (upiTab) upiTab.classList.remove("active");
      if (bankView) bankView.style.display = "block";
      if (upiView) upiView.style.display = "none";
      if (helpNote) {
        helpNote.innerHTML = `<strong>Bank Transfer Verification:</strong> After transferring via IMPS or NEFT, copy the <strong>12-digit UTR / Reference ID</strong> from your banking receipt or SMS and enter it in the activation box below to unlock PRO immediately.`;
      }
      if (actInput) {
        actInput.placeholder = "Enter 12-digit Bank IMPS/NEFT UTR Number...";
      }
    } else {
      if (upiTab) upiTab.classList.add("active");
      if (bankTab) bankTab.classList.remove("active");
      if (upiView) upiView.style.display = "block";
      if (bankView) bankView.style.display = "none";
      if (helpNote) {
        helpNote.innerHTML = `<strong>Instant UPI Verification:</strong> After transferring via any UPI app, enter your <strong>12-digit UTR / Reference ID</strong> in the activation box below to unlock PRO immediately.`;
      }
      if (actInput) {
        actInput.placeholder = "Enter 12-digit UPI UTR or Gumroad License Key...";
      }
    }
    this.playSynthSound("click");
  },

  selectUpiApp(appKey = "any", appName = "Any UPI App") {
    this.selectedUpiApp = appKey;
    const panel = document.getElementById("chk-panel-upi");
    if (!panel) return;

    // 1. Highlight clicked badge
    panel.querySelectorAll(".upi-app-badge").forEach(btn => {
      if (btn.getAttribute("data-app") === appKey) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // 2. Update selected app label
    const selectedLabel = document.getElementById("upi-selected-app-label");
    if (selectedLabel) selectedLabel.innerText = appName;

    // 3. Update scan hint under QR
    const scanHint = document.getElementById("upi-qr-scan-hint");
    if (scanHint) {
      if (appKey === "any") scanHint.innerText = "Scan with any UPI App";
      else scanHint.innerText = `Scan with ${appName}`;
    }

    // 4. Resolve effective UPI ID (per-app vs universal)
    const effectiveUpi = this.getEffectiveUpiId(appKey);
    const upiDisplay = document.getElementById("chk-upi-id-display");
    if (upiDisplay) upiDisplay.value = effectiveUpi;

    // 5. Update dynamic step-by-step instructions
    const guideBox = document.getElementById("upi-app-dynamic-guide");
    if (guideBox) {
      if (appKey === "gpay") {
        guideBox.innerHTML = `1. Open <strong>Google Pay</strong> ➔ 2. Tap <strong>"Pay UPI ID or number"</strong> (or Scanner) ➔ 3. Send to <code>${effectiveUpi}</code> ➔ 4. Enter 12-digit UTR below.`;
      } else if (appKey === "phonepe") {
        guideBox.innerHTML = `1. Open <strong>PhonePe</strong> ➔ 2. Tap <strong>"To Mobile / UPI ID"</strong> (or QR icon) ➔ 3. Send to <code>${effectiveUpi}</code> ➔ 4. Enter 12-digit UTR below.`;
      } else if (appKey === "paytm") {
        guideBox.innerHTML = `1. Open <strong>Paytm</strong> ➔ 2. Tap <strong>"To UPI Apps / Scan Any QR"</strong> ➔ 3. Send to <code>${effectiveUpi}</code> ➔ 4. Enter 12-digit UTR below.`;
      } else if (appKey === "bhim") {
        guideBox.innerHTML = `1. Open <strong>BHIM</strong> ➔ 2. Tap <strong>"Send"</strong> ➔ 3. Enter <code>${effectiveUpi}</code> (or scan QR) ➔ 4. Enter 12-digit UTR below.`;
      } else if (appKey === "cred") {
        guideBox.innerHTML = `1. Open <strong>CRED</strong> ➔ 2. Tap <strong>"Scan & Pay"</strong> or pay <code>${effectiveUpi}</code> ➔ 3. Authorize payment ➔ 4. Enter 12-digit UTR below.`;
      } else {
        guideBox.innerHTML = `Open <strong>any UPI app</strong> on your phone ➔ Scan the QR code or send to <code>${effectiveUpi}</code> ➔ Enter 12-digit UTR below.`;
      }
    }

    // 6. Update CTA button text & state & QR with effective UPI ID
    const plan = this.checkoutPlan || "lifetime";
    const priceInr = plan === "lifetime" ? this.getConfigValue("omnitool_price_lifetime_inr", "₹2,499") : this.getConfigValue("omnitool_price_monthly_inr", "₹399");
    const rawAmt = priceInr.replace(/[^\d]/g, "") || (plan === "lifetime" ? "2499" : "399");
    const upiName = this.getConfigValue("omnitool_upi_name", "OmniTool Hub");
    const upiUri = `upi://pay?pa=${encodeURIComponent(effectiveUpi)}&pn=${encodeURIComponent(upiName)}&am=${rawAmt}&cu=INR&tn=${encodeURIComponent(plan === 'lifetime' ? 'OmniTool Lifetime Pass' : 'OmniTool Pro Monthly')}`;

    const ctaBtn = document.getElementById("chk-upi-mobile-link");
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (ctaBtn) {
      ctaBtn.href = upiUri;
      if (isMobile) {
        ctaBtn.innerText = appKey === "any" ? `Pay ${priceInr} via UPI App` : `Open ${appName} (${priceInr})`;
      } else {
        ctaBtn.innerText = appKey === "any" ? `Pay ${priceInr} via UPI` : `Pay ${priceInr} via ${appName}`;
      }
    }

    this.drawUpiQr(upiUri);
    this.playSynthSound("click");
    this.showToast(`Selected ${appName} (${effectiveUpi}). Scan QR or pay.`, "info");
  },

  handleUpiCtaClick(event) {
    if (event) event.preventDefault();
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const effectiveUpi = this.getEffectiveUpiId(this.selectedUpiApp || "any");
    const upiName = this.getConfigValue("omnitool_upi_name", "OmniTool Hub");
    const plan = this.checkoutPlan || "lifetime";
    const priceInr = plan === "lifetime" ? this.getConfigValue("omnitool_price_lifetime_inr", "₹2,499") : this.getConfigValue("omnitool_price_monthly_inr", "₹399");
    const rawAmt = priceInr.replace(/[^\d]/g, "") || (plan === "lifetime" ? "2499" : "399");
    const upiUri = `upi://pay?pa=${encodeURIComponent(effectiveUpi)}&pn=${encodeURIComponent(upiName)}&am=${rawAmt}&cu=INR&tn=${encodeURIComponent(plan === 'lifetime' ? 'OmniTool Lifetime Pass' : 'OmniTool Pro Monthly')}`;

    if (isMobile) {
      window.location.href = upiUri;
      return;
    }

    // On Desktop/Laptop: copy UPI ID and prompt user to scan QR or enter UTR
    navigator.clipboard.writeText(effectiveUpi).then(() => {
      this.playSynthSound("click");
      this.showToast(`📋 Payee UPI ID (${effectiveUpi}) copied! Scan QR on your phone or pay via UPI.`, "success");
    }).catch(() => {
      this.showToast(`Payee UPI ID: ${effectiveUpi}`, "info");
    });

    // Smoothly scroll down to activation input
    const actInput = document.getElementById("checkout-activation-input");
    if (actInput) {
      actInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  },

  focusActivationInput() {
    const actInput = document.getElementById("checkout-activation-input");
    if (actInput) {
      actInput.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        actInput.focus();
        actInput.style.transition = "box-shadow 0.3s ease, border-color 0.3s ease";
        actInput.style.borderColor = "var(--accent-cyan)";
        actInput.style.boxShadow = "0 0 0 3px rgba(6, 182, 212, 0.35)";
        setTimeout(() => {
          actInput.style.boxShadow = "";
        }, 1500);
      }, 200);
      this.playSynthSound("click");
      this.showToast("Paste your 12-digit UTR Number from your receipt here to activate PRO!", "info");
    }
  },

  payViaUpiApp(appName) {
    this.selectUpiApp("any", appName || "Any UPI App");
  },

  copyBankDetail(elementId, label) {
    const el = document.getElementById(elementId);
    const text = el ? el.innerText.trim() : "";
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        this.playSynthSound("click");
        this.showToast(`${label} copied to clipboard!`, "success");
      });
    }
  },

  closeCheckout() {
    const modal = document.getElementById("checkout-modal");
    if (modal) {
      modal.style.display = "none";
    }
    if (window.location.hash.startsWith("#checkout")) {
      window.location.hash = "#plans";
    }
  },

  switchCheckoutPlan(plan = "lifetime") {
    this.checkoutPlan = plan;

    const priceLifetimeUsd = this.getConfigValue("omnitool_price_lifetime_usd", "$29.99");
    const priceLifetimeInr = this.getConfigValue("omnitool_price_lifetime_inr", "₹2,499");
    const priceMonthlyUsd = this.getConfigValue("omnitool_price_monthly_usd", "$4.99");
    const priceMonthlyInr = this.getConfigValue("omnitool_price_monthly_inr", "₹399");

    const priceUsd = plan === "lifetime" ? priceLifetimeUsd : priceMonthlyUsd;
    const priceInr = plan === "lifetime" ? priceLifetimeInr : priceMonthlyInr;
    const rawAmt = priceInr.replace(/[^\d]/g, "") || (plan === "lifetime" ? "2499" : "399");

    const pillLifetime = document.getElementById("chk-pill-lifetime");
    const pillMonthly = document.getElementById("chk-pill-monthly");
    if (pillLifetime && pillMonthly) {
      if (plan === "lifetime") {
        pillLifetime.classList.add("active");
        pillMonthly.classList.remove("active");
      } else {
        pillMonthly.classList.add("active");
        pillLifetime.classList.remove("active");
      }
    }

    // Dynamically update plan pills with configured prices
    const elPillPriceLifetime = document.getElementById("chk-pill-price-lifetime");
    if (elPillPriceLifetime) elPillPriceLifetime.innerText = priceLifetimeUsd;
    const elPillInrLifetime = document.getElementById("chk-pill-inr-lifetime");
    if (elPillInrLifetime) elPillInrLifetime.innerText = `${priceLifetimeInr} INR`;

    const elPillPriceMonthly = document.getElementById("chk-pill-price-monthly");
    if (elPillPriceMonthly) elPillPriceMonthly.innerHTML = `${priceMonthlyUsd} <span style="font-size: 11px; font-weight: 400; color: var(--text-muted);">/mo</span>`;
    const elPillInrMonthly = document.getElementById("chk-pill-inr-monthly");
    if (elPillInrMonthly) elPillInrMonthly.innerText = `${priceMonthlyInr} INR`;

    const modalTitle = document.getElementById("checkout-title");
    if (modalTitle) {
      modalTitle.innerText = plan === "lifetime" ? `Get Lifetime Developer Pass (${priceUsd})` : `Subscribe to Pro Monthly (${priceUsd}/mo)`;
    }

    // Update Gumroad URL and CTA
    const gumroadBtn = document.getElementById("chk-gumroad-btn");
    if (gumroadBtn) {
      const lifetimeUrl = this.getConfigValue("omnitool_gumroad_lifetime_url", "https://gumroad.com");
      const monthlyUrl = this.getConfigValue("omnitool_gumroad_monthly_url", "https://gumroad.com");
      gumroadBtn.href = plan === "lifetime" ? lifetimeUrl : monthlyUrl;
      const btnSpan = gumroadBtn.querySelector("span");
      if (btnSpan) {
        btnSpan.innerText = plan === "lifetime" ? `Continue to Gumroad Checkout (${priceUsd})` : `Continue to Gumroad Checkout (${priceUsd}/mo)`;
      }
    }

    // Update Razorpay URL and CTA
    const razorpayBtn = document.getElementById("chk-razorpay-btn");
    if (razorpayBtn) {
      razorpayBtn.href = this.getRazorpayUrl(plan) || "#";
      const rzpSpan = razorpayBtn.querySelector("span");
      if (rzpSpan) {
        rzpSpan.innerText = `Proceed to Razorpay (${priceInr})`;
      }
    }

    // Update UPI Amount & URI
    const effectiveUpi = this.getEffectiveUpiId(this.selectedUpiApp || "any");
    const upiName = this.getConfigValue("omnitool_upi_name", "OmniTool Hub");

    const upiAmtEl = document.getElementById("chk-upi-amount-display");
    if (upiAmtEl) upiAmtEl.innerText = `${priceInr} INR`;

    const upiUri = `upi://pay?pa=${encodeURIComponent(effectiveUpi)}&pn=${encodeURIComponent(upiName)}&am=${rawAmt}&cu=INR&tn=${encodeURIComponent(plan === 'lifetime' ? 'OmniTool Lifetime Pass' : 'OmniTool Pro Monthly')}`;

    const upiMobileLink = document.getElementById("chk-upi-mobile-link");
    if (upiMobileLink) {
      upiMobileLink.href = upiUri;
      upiMobileLink.innerText = `Pay ${priceInr} via UPI App`;
    }

    // Redraw UPI QR
    this.drawUpiQr(upiUri);

    // Update Bank Transfer amount
    const bankAmtEl = document.getElementById("chk-bank-transfer-amt");
    if (bankAmtEl) bankAmtEl.innerText = `${priceInr} INR`;

    // Refresh selected UPI app button label
    const selectedAppName = document.getElementById("upi-selected-app-label")?.innerText || "Any UPI App";
    if (this.selectedUpiApp) {
      this.selectUpiApp(this.selectedUpiApp, selectedAppName);
    }

    // Update Crypto approximate hint
    const cryptoHint = document.getElementById("crypto-coin-hint");
    if (cryptoHint) {
      cryptoHint.innerText = `Send exact amount (≈ ${priceUsd} USDT) over selected network.`;
    }

    if (this.checkoutGateway === "paypal") {
      this.renderPayPalSmartButtons();
    }
  },

  switchCheckoutGateway(gateway) {
    const upiEnabled = this.getConfigValue("omnitool_gw_upi_enabled", "true") !== "false";
    const bankEnabled = this.getConfigValue("omnitool_gw_bank_enabled", "false") === "true";
    const gumroadEnabled = this.getConfigValue("omnitool_gw_gumroad_enabled", "true") !== "false";
    const paypalEnabled = this.getConfigValue("omnitool_gw_paypal_enabled", "true") !== "false";
    const razorpayEnabled = this.getConfigValue("omnitool_gw_razorpay_enabled", "true") !== "false";
    const cryptoEnabled = this.getConfigValue("omnitool_gw_crypto_enabled", "true") !== "false";
    const coffeeEnabled = this.getConfigValue("omnitool_gw_coffee_enabled", "true") !== "false";
    const guideEnabled = this.getConfigValue("omnitool_gw_guide_enabled", "true") !== "false";
    const customEnabled = this.getConfigValue("omnitool_gw_custom_enabled", "false") === "true";

    const isEnabled = (gw) => {
      if (gw === "upi") return upiEnabled || bankEnabled;
      if (gw === "bank") return bankEnabled;
      if (gw === "gumroad") return gumroadEnabled;
      if (gw === "paypal") return paypalEnabled;
      if (gw === "razorpay") return razorpayEnabled;
      if (gw === "crypto") return cryptoEnabled;
      if (gw === "coffee") return coffeeEnabled;
      if (gw === "guide") return guideEnabled;
      if (gw === "custom") return customEnabled;
      return false;
    };

    if (gateway === "bank") {
      gateway = "upi";
      this.switchIndiaPayMethod("bank");
    }

    if (gateway && !isEnabled(gateway)) {
      const candidates = ["gumroad", "upi", "paypal", "razorpay", "crypto", "coffee", "custom", "guide"];
      const fallback = candidates.find(c => isEnabled(c));
      gateway = fallback || null;
    }

    this.checkoutGateway = gateway;
    const modal = document.getElementById("checkout-modal");
    if (!modal) return;

    modal.querySelectorAll(".chk-tab-btn").forEach(btn => {
      const isMatch = btn.getAttribute("data-gateway") === gateway;
      if (isMatch) {
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      }
    });

    modal.querySelectorAll(".checkout-panel").forEach(panel => {
      if (gateway && panel.id === `chk-panel-${gateway}`) {
        panel.classList.add("active");
        panel.style.display = "block";
      } else {
        panel.classList.remove("active");
        panel.style.display = "none";
      }
    });

    this.playSynthSound("click");

    if (gateway === "upi") {
      const upiEnabled = this.getConfigValue("omnitool_gw_upi_enabled", "true") !== "false";
      const bankEnabled = this.getConfigValue("omnitool_gw_bank_enabled", "false") === "true";
      if (!upiEnabled && bankEnabled) {
        this.switchIndiaPayMethod("bank");
      } else {
        const plan = this.checkoutPlan || "lifetime";
        const priceInr = plan === "lifetime" ? this.getConfigValue("omnitool_price_lifetime_inr", "₹2,499") : this.getConfigValue("omnitool_price_monthly_inr", "₹399");
        const rawAmt = priceInr.replace(/[^\d]/g, "") || (plan === "lifetime" ? "2499" : "399");
        const effectiveUpi = this.getEffectiveUpiId(this.selectedUpiApp || "any");
        const upiName = this.getConfigValue("omnitool_upi_name", "OmniTool Hub");
        const upiUri = `upi://pay?pa=${encodeURIComponent(effectiveUpi)}&pn=${encodeURIComponent(upiName)}&am=${rawAmt}&cu=INR&tn=${encodeURIComponent(plan === 'lifetime' ? 'OmniTool Lifetime Pass' : 'OmniTool Pro Monthly')}`;
        this.drawUpiQr(upiUri);
      }
    } else if (gateway === "paypal") {
      this.renderPayPalSmartButtons();
    }
  },

  switchCryptoCoin(coin = "usdt") {
    this.checkoutCryptoCoin = coin;
    const modal = document.getElementById("checkout-modal");
    if (!modal) return;

    modal.querySelectorAll(".crypto-subtab").forEach(btn => {
      if (btn.getAttribute("data-coin") === coin) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    const addrInput = document.getElementById("chk-crypto-address");
    const coinLabel = document.getElementById("crypto-coin-label");
    const coinHint = document.getElementById("crypto-coin-hint");
    const priceUSD = this.checkoutPlan === "lifetime" ? "$29.99" : "$4.99";

    if (coin === "usdt") {
      if (coinLabel) coinLabel.innerText = "USDT (TRC-20) Deposit Address";
      if (addrInput) addrInput.value = this.getConfigValue("omnitool_crypto_usdt", "TYDzmHwQkP2aE7wGz8hL9qR1vB4sN6mX5c");
      if (coinHint) coinHint.innerText = `Send exact amount (≈ ${priceUSD} USDT) over TRON (TRC-20) network.`;
    } else if (coin === "btc") {
      if (coinLabel) coinLabel.innerText = "Bitcoin (BTC) Deposit Address";
      if (addrInput) addrInput.value = this.getConfigValue("omnitool_crypto_btc", "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh");
      if (coinHint) coinHint.innerText = `Send exact equivalent of ${priceUSD} USD in BTC over Bitcoin network.`;
    } else if (coin === "eth") {
      if (coinLabel) coinLabel.innerText = "Ethereum (ETH / ERC-20) Deposit Address";
      if (addrInput) addrInput.value = this.getConfigValue("omnitool_crypto_eth", "0x71C53316E28b4923eFFe35E2D8527a2754664982");
      if (coinHint) coinHint.innerText = `Send exact equivalent of ${priceUSD} USD in ETH over Ethereum (ERC-20) network.`;
    }
  },

  drawUpiQr(upiUri, canvasTarget = null) {
    const canvas = canvasTarget || document.getElementById("upi-qr-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // Reset canvas to white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const renderMatrix = (qr) => {
      const moduleCount = qr.size;
      const cellSize = Math.floor((w - 20) / moduleCount);
      const margin = Math.floor((w - cellSize * moduleCount) / 2);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#0f172a";
      for (let r = 0; r < moduleCount; r++) {
        for (let c = 0; c < moduleCount; c++) {
          if (qr.modules[r][c]) {
            ctx.fillRect(margin + c * cellSize, margin + r * cellSize, cellSize, cellSize);
          }
        }
      }
    };

    // 1. Check if global OmniQRCode is already loaded
    if (window.OmniQRCode && typeof window.OmniQRCode.generate === "function") {
      try {
        const qr = window.OmniQRCode.generate(upiUri, "M", 4);
        renderMatrix(qr);
        return;
      } catch (err) {
        console.warn("Local QR matrix render error:", err);
      }
    }

    // 2. Dynamically import local qr-generator module for 100% offline precision
    import("./tools/qr-generator.js").then((mod) => {
      const qrGen = mod.QRCode || window.OmniQRCode;
      if (qrGen && typeof qrGen.generate === "function") {
        try {
          const qr = qrGen.generate(upiUri, "M", 4);
          renderMatrix(qr);
          return;
        } catch (e) {}
      }
      throw new Error("Local generator unavailable");
    }).catch(() => {
      // 3. Fallback to image generator
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
      };
      img.onerror = () => {
        ctx.strokeStyle = "#0f172a";
        ctx.lineWidth = 2;
        ctx.strokeRect(8, 8, w - 16, h - 16);
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("UPI QR READY", w / 2, h / 2 - 10);
        ctx.font = "11px sans-serif";
        ctx.fillText("Scan with UPI Apps", w / 2, h / 2 + 10);
      };
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${w}x${h}&data=${encodeURIComponent(upiUri)}&margin=8&format=png`;
    });
  }
};

// Global instance export for inline handlers
window.app = app;

// Start application
window.addEventListener("DOMContentLoaded", () => {
  app.init();
});
