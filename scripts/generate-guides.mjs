import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsData = [
  {
    id: "pipeline-builder",
    fileName: "pipeline-builder.html",
    title: "Smart Chain Pipeline Builder Guide | OmniTool Hub",
    description: "Learn how to build, reorder, execute, and preview chain data processing pipelines client-side using Smart Chain Pipeline Builder.",
    h1: "Smart Chain Pipeline Builder Guide",
    tag: "Data Pipelines",
    leadParagraph: "In modern software development, data transformation often requires chaining multiple discrete steps together, such as decoding a string, formatting it, and converting its text case. OmniTool Hub's Smart Chain Pipeline Builder allows you to design, reorder, execute, and preview these steps in series in a completely client-side sandbox environment.",
    tabsTitle: "Pipeline Configurations & Tabs",
    tabs: [
      {
        title: "1. Pipeline Editor",
        badge: "Editor",
        desc: "Add, remove, and reorder data processing steps (nodes) dynamically. Supported operations include Base64 encoding/decoding, URL formatting, text case transformations, hashing algorithms, and custom JavaScript execution blocks."
      },
      {
        title: "2. Live Execution & Previews",
        badge: "Live View",
        desc: "Run your configured chain of operations on custom inputs. View intermediate outputs step-by-step to debug your pipeline logic instantly."
      },
      {
        title: "3. Preset Workflows",
        badge: "Presets",
        desc: "Save your pipeline configurations to local settings for future use, or select pre-built pipelines for common tasks like REST API response parsing."
      }
    ],
    proTip: "You can write custom JavaScript node blocks inside the editor to process complex data formatting logic. All scripts run in local workers, keeping your data confidential.",
    steps: [
      "Add nodes in the **Pipeline Editor** tab to build your sequence of data transformations.",
      "Select inputs and configure node arguments (like spacing options, secret keys, or custom scripts).",
      "Click **Execute Pipeline** in the Live Execution tab to parse inputs.",
      "View intermediate step results and copy the final output from the **Output Pane**."
    ],
    ctaHref: "../index.html#tool/pipeline-builder",
    ctaLabel: "Launch Pipeline Builder"
  },
  {
    id: "text-encoder-suite",
    fileName: "text-encoder-suite.html",
    title: "Text Cases & Encoder Suite Guide | OmniTool Hub",
    description: "Learn how to convert case representations (UPPER, lower, camel, snake, kebab) and run Base64 or URL encoding/decoding operations.",
    h1: "Text Cases & Encoder Suite Guide",
    tag: "Transformations",
    leadParagraph: "Text formatting and base-encoding operations are everyday developer necessities. Whether you are standardizing API variables, decoding token values, or escaping query parameters, the Text Cases & Encoder Suite runs 100% locally to process your text strings securely.",
    tabsTitle: "Encoder Tools & Configurations",
    tabs: [
      {
        title: "1. Text Case Converter",
        badge: "Cases",
        desc: "Instantly toggle between lowercase, UPPERCASE, Title Case, Sentence case, camelCase, snake_case, and kebab-case. Includes options to strip extra whitespace."
      },
      {
        title: "2. Base64 Encoder & Decoder",
        badge: "Base64",
        desc: "Convert plaintext strings into standard Base64 representation or decode incoming Base64 streams back into cleartext."
      },
      {
        title: "3. URL Encoder & Decoder",
        badge: "URL",
        desc: "Percent-encode special characters in URLs to build valid query strings, or decode URL-encoded parameters back into human-readable text."
      }
    ],
    proTip: "Because these operations execute locally in the browser buffer, you can safely encode and decode sensitive auth tokens, passwords, and private parameters without leaking them.",
    steps: [
      "Paste your text into the **Raw Input** textarea.",
      "Navigate to the tab matching your target operation (**Case Converter**, **Base64**, or **URL**).",
      "Configure parameters (such as separator flags) and click the primary action button.",
      "Copy the result instantly from the **Output** textarea."
    ],
    ctaHref: "../index.html#tool/text-encoder-suite",
    ctaLabel: "Launch Encoder Suite"
  },
  {
    id: "jwt-decoder",
    fileName: "jwt-decoder.html",
    title: "JWT Decoder & Token Parser Guide | OmniTool Hub",
    description: "Learn how to decode JSON Web Tokens (JWT) to inspect header parameters, claim payloads, and verify signatures.",
    h1: "JWT Decoder & Token Parser Guide",
    tag: "Crypto & Security",
    leadParagraph: "JSON Web Tokens (JWT) are the standard for authorization in modern web applications. However, pasting tokens into unverified online decoders sends your claims, scopes, and user details to external servers. OmniTool Hub's JWT Decoder runs entirely client-side, giving you instant insight into token contents safely.",
    tabsTitle: "Decoder Tabs & Verification",
    tabs: [
      {
        title: "1. Payload Claims Parser",
        badge: "Claims",
        desc: "Parses and formats JWT claims, displaying issued at (iat) and expiration (exp) dates, subject (sub), issuer (iss), and custom user scopes in a clean, interactive tree view."
      },
      {
        title: "2. Header Parameters",
        badge: "Header",
        desc: "Extracts and formats metadata from the token header, such as the signing algorithm (e.g. HS256, RS256) and token type (JWT)."
      },
      {
        title: "3. Signature Verification Status",
        badge: "Signature",
        desc: "Validates the structure of the token (header, payload, and signature segments) and highlights signature integrity checks."
      }
    ],
    proTip: "All JWT parsing is performed via local JavaScript string manipulation. Your token secrets and private scopes never leave your browser sandbox.",
    steps: [
      "Paste your encoded JWT string (header.payload.signature) into the input field.",
      "The tool automatically parses the token segments in real-time.",
      "Explore formatted JSON payloads and metadata tree views in the **Claims** and **Header** tabs.",
      "Check token expiration warnings and verify signature structures."
    ],
    ctaHref: "../index.html#tool/jwt-decoder",
    ctaLabel: "Launch JWT Decoder"
  },
  {
    id: "crypto-suite",
    fileName: "crypto-suite.html",
    title: "Cryptography Suite Guide | OmniTool Hub",
    description: "Learn how to generate hashes, run symmetric AES-256 ciphers, and construct RSA keypairs client-side.",
    h1: "Cryptography & Key Generator Suite Guide",
    tag: "Crypto & Security",
    leadParagraph: "Cryptographic operations are fundamental to securing digital information. OmniTool Hub's Cryptography Suite exposes high-security standards (hashing, symmetric ciphers, asymmetric key generation) inside a client-side environment powered by the browser's native Web Crypto API.",
    tabsTitle: "Cryptographic Operations",
    tabs: [
      {
        title: "1. Hash Generator",
        badge: "Hashing",
        desc: "Compute cryptographic checksums using MD5, SHA-1, SHA-256, or SHA-512 algorithms. Perfect for file verification and data integrity checks."
      },
      {
        title: "2. AES Symmetric Encryption",
        badge: "AES-256",
        desc: "Encrypt or decrypt text fields using the industry-standard AES-256 GCM algorithm. Secure your content with custom secret passphrases."
      },
      {
        title: "3. RSA Keypair Generator",
        badge: "RSA",
        desc: "Generate public and private RSA key pairs with custom sizes (1024, 2048, or 4096-bit). Export keys in standard PEM format."
      }
    ],
    proTip: "Because the Web Crypto API compiles algorithms inside the local browser thread, key generation is extremely fast and entirely offline-capable.",
    steps: [
      "Paste your data or file content into the input pane.",
      "Select your operation tab (**Hashing**, **AES Encryption**, or **RSA Key Gen**).",
      "Configure keys, passphrases, or bit-strengths.",
      "Click the action button and copy your generated hashes, ciphertext, or PEM keypairs."
    ],
    ctaHref: "../index.html#tool/crypto-suite",
    ctaLabel: "Launch Cryptography Suite"
  },
  {
    id: "markdown-preview",
    fileName: "markdown-preview.html",
    title: "Live Markdown Editor & Previewer Guide | OmniTool Hub",
    description: "Learn how to write markdown schemas, edit content with live syntax highlights, and preview formatted HTML.",
    h1: "Live Markdown Editor & Previewer Guide",
    tag: "Writers & Parsers",
    leadParagraph: "Markdown is the standard format for documentation, readmes, and content writing. OmniTool Hub's Live Markdown Editor and Previewer offers a responsive workspace to write Markdown syntax and view rendered HTML output in real time.",
    tabsTitle: "Editor Panels & Previews",
    tabs: [
      {
        title: "1. Markdown Editor Console",
        badge: "Editor",
        desc: "A clean text editor with support for Markdown tags (headers, lists, inline code blocks, tables, bold/italic text, and image embeds)."
      },
      {
        title: "2. Live Render View",
        badge: "Live HTML",
        desc: "Displays the formatted rich-text representation of your markdown code, rendered in real time as you edit."
      },
      {
        title: "3. HTML Source Code Output",
        badge: "Raw HTML",
        desc: "Compiles the Markdown into standard, clean HTML source code ready to copy-paste into blogs or websites."
      }
    ],
    proTip: "The markdown parsing is done locally in your browser memory, keeping your documents and content drafts private.",
    steps: [
      "Begin typing your Markdown syntax inside the **Editor** pane.",
      "Check the **Live HTML** tab to view the formatted rich-text structure.",
      "Click the **Raw HTML** tab to inspect and copy the generated markup.",
      "Use the quick-action buttons to clear, copy, or download your drafts."
    ],
    ctaHref: "../index.html#tool/markdown-preview",
    ctaLabel: "Launch Markdown Editor"
  },
  {
    id: "text-diff",
    fileName: "text-diff.html",
    title: "Text Diff Comparison Tool Guide | OmniTool Hub",
    description: "Learn how to compare two texts side-by-side or line-by-line and highlight visual differences.",
    h1: "Text Diff Comparison Tool Guide",
    tag: "Writers & Parsers",
    leadParagraph: "Identifying changes between two versions of a document, source file, or code snippet can be tedious. OmniTool Hub's Text Diff Comparison tool provides a side-by-side, visual review layout to highlight additions, deletions, and modifications client-side.",
    tabsTitle: "Comparison Modes",
    tabs: [
      {
        title: "1. Side-by-Side Diff Layout",
        badge: "Split View",
        desc: "Renders both texts in parallel columns. Highlights added lines in emerald, deleted lines in rose, and modified lines in orange."
      },
      {
        title: "2. Line-by-Line Unified Layout",
        badge: "Unified",
        desc: "Merges both documents into a single vertical stream, displaying inline modifications chronologically."
      },
      {
        title: "3. Character Difference Auditor",
        badge: "Char Diff",
        desc: "Examines edited lines in detail, highlighting exact character-level additions or deletions within a specific line."
      }
    ],
    proTip: "Diff algorithms run entirely in JavaScript within your browser window, making this tool safe for comparing proprietary source code or private logs.",
    steps: [
      "Paste the original document version into the **Original Text** container.",
      "Paste the updated document version into the **Modified Text** container.",
      "Click **Compare Texts** and select your layout mode (**Split View** or **Unified**).",
      "Inspect highlighted lines and copy diff logs or export changes."
    ],
    ctaHref: "../index.html#tool/text-diff",
    ctaLabel: "Launch Text Diff Tool"
  },
  {
    id: "pdf-searcher",
    fileName: "pdf-searcher.html",
    title: "Multi-PDF Searcher & OCR Guide | OmniTool Hub",
    description: "Learn how to search multiple PDF documents and perform client-side Optical Character Recognition (OCR).",
    h1: "Multi-PDF Searcher & OCR Guide",
    tag: "Writers & Parsers",
    leadParagraph: "Auditing multiple PDF documents or extracts for specific keywords can be time-consuming. OmniTool Hub's Multi-PDF Searcher and OCR suite lets you load multiple PDFs into a secure session, search across them instantly, and run OCR on scanned pages client-side.",
    tabsTitle: "PDF Workspace & OCR Features",
    tabs: [
      {
        title: "1. PDF File Workspace Manager",
        badge: "Workspace",
        desc: "Import multiple PDF files at once. View summaries of page counts, sizes, and metadata. Files remain in local browser storage."
      },
      {
        title: "2. Unified Multi-File Searcher",
        badge: "Search",
        desc: "Search across all loaded PDFs at once. Highlights matching phrases and allows jumping directly to the corresponding page."
      },
      {
        title: "3. Client-Side OCR Engine",
        badge: "OCR",
        desc: "Extract text from scanned PDF image pages using client-side Tesseract.js directly inside your browser without server uploads."
      }
    ],
    proTip: "All OCR computations use local Web Workers. Your documents are never uploaded to any servers, preserving confidentiality.",
    steps: [
      "Drag and drop your PDF files into the **Workspace** upload zone.",
      "Enter search queries to locate matches across all documents simultaneously.",
      "For scanned pages, toggle **OCR Engine** to parse images into editable text.",
      "Export highlights, copy extracted texts, or download search logs."
    ],
    ctaHref: "../index.html#tool/pdf-searcher",
    ctaLabel: "Launch PDF Searcher"
  },
  {
    id: "pdf-utilities",
    fileName: "pdf-utilities.html",
    title: "PDF Toolbox (Split, Merge, Convert & Compress) Guide | OmniTool Hub",
    description: "Learn how to split into PDF, PNG, JPG, or WebP, merge multiple PDFs, rotate/reorganize pages, and compress documents 100% client-side.",
    h1: "PDF Toolbox (Split, Merge, Convert & Compress) Guide",
    tag: "Writers & Parsers",
    leadParagraph: "Standard PDF tools require uploading sensitive documents to third-party servers. OmniTool Hub's PDF Toolbox processes every operation entirely inside your browser memory using WebAssembly and client-side canvas rendering—ensuring 100% privacy, zero data retention, and blazing speed.",
    tabsTitle: "Toolbox Capabilities & Operations",
    tabs: [
      {
        title: "1. Multi-Format Splitter & Image Converter",
        badge: "Split & Convert",
        desc: "Extract specific pages or ranges and export as combined PDFs, separate PDFs in a ZIP archive, high-definition PNG/JPG/WebP images, or clean plain text and structured JSON data."
      },
      {
        title: "2. PDF Merger Suite",
        badge: "Merge",
        desc: "Combine multiple PDF documents into a single consolidated file with interactive drag-and-drop file reordering and live page count validation."
      },
      {
        title: "3. Page Rotation & Layout Editor",
        badge: "Rotate & Edit",
        desc: "Rotate individual or all pages clockwise or 180 degrees, reorganize document page sequence, or delete unwanted pages before export."
      },
      {
        title: "4. Client-Side PDF Compressor",
        badge: "Compress",
        desc: "Downsample bloated scans and heavy vector images with customizable DPI quality modes (High Performance, Balanced, or Max Fidelity) without external dependencies."
      }
    ],
    proTip: "Use the Visual Page Inspector thumbnail cards to inspect pages in full-screen high definition or click the quick save icon on any thumbnail card to download that individual page as PNG or PDF instantly.",
    steps: [
      "Upload your PDF document or drag multiple files into the workspace.",
      "Switch between **Split & Save**, **Merge PDFs**, **Rotate & Edit**, or **Compress** tabs.",
      "Select your output format (PDF, separate PDFs in ZIP, PNG, JPG, WebP, Text, or JSON) and resolution.",
      "Click the action button to process and download your clean, private files immediately."
    ],
    ctaHref: "../index.html#tool/pdf-utilities",
    ctaLabel: "Launch PDF Toolbox"
  },
  {
    id: "regex-tester",
    fileName: "regex-tester.html",
    title: "Visual Regex & Extractor Suite Guide | OmniTool Hub",
    description: "Learn how to test regular expressions, capture matching groups, and extract structured variables.",
    h1: "Visual Regex & Extractor Suite Guide",
    tag: "Pattern Analysis",
    leadParagraph: "Writing and debugging regular expressions (regex) can be complex. OmniTool Hub's Visual Regex & Extractor Suite helps you test patterns visually, capture match groups, and batch-extract variables (like emails, phone numbers, IPs, and URLs) client-side.",
    tabsTitle: "Regex Workspace & Tools",
    tabs: [
      {
        title: "1. Visual Regex Tester",
        badge: "Regex Test",
        desc: "Write regex patterns and view matched strings highlighted in real time. Hover over matches to inspect captures."
      },
      {
        title: "2. Batch Variable Extractor",
        badge: "Extractor",
        desc: "Scan texts using preset patterns to batch-extract emails, phone numbers, IP addresses, or URLs into structured lists."
      }
    ],
    proTip: "Use the built-in regex cheat sheet to quickly find patterns. Matching runs locally, preventing browser tabs from locking up.",
    steps: [
      "Enter your test string inside the **Input Text** window.",
      "Write your regular expression pattern and toggle flags (global, case-insensitive).",
      "Review matches highlighted in real time, and inspect captured groups.",
      "Copy extracted variables or export results."
    ],
    ctaHref: "../index.html#tool/regex-tester",
    ctaLabel: "Launch Regex Suite"
  },
  {
    id: "css-studio",
    fileName: "css-studio.html",
    title: "CSS Studio Suite Guide | OmniTool Hub",
    description: "Learn how to build gradients, shadow layers, and frosted glassmorphism elements visually.",
    h1: "CSS Studio Suite Guide",
    tag: "CSS Builders",
    leadParagraph: "Writing modern CSS layouts visually saves design time. OmniTool Hub's CSS Studio Suite provides an interactive design workspace to build linear & radial gradients, stack complex shadow layers, and create glassmorphism cards with copy-ready code output.",
    tabsTitle: "Design Studio Categories",
    tabs: [
      {
        title: "1. Gradient Builder",
        badge: "Gradients",
        desc: "Build linear and radial gradients with infinite stop points, transparency configurations, and angle adjustments. Preview designs instantly on custom shapes."
      },
      {
        title: "2. Box Shadow Layering",
        badge: "Box Shadows",
        desc: "Stack multiple shadow layers with blur, spread, offset, and color properties to design realistic depth and styling."
      },
      {
        title: "3. Glassmorphism Card Designer",
        badge: "Glassmorphism",
        desc: "Adjust background blur intensity, border widths, opacity, and base colors to build frosted glass card layouts."
      }
    ],
    proTip: "Use the live preview shapes to test your designs against light and dark backgrounds. Copy the generated CSS directly into your stylesheet.",
    steps: [
      "Navigate to your target design tab (**Gradients**, **Box Shadows**, or **Glassmorphism**).",
      "Adjust design properties using sliders, color pickers, and layer controls.",
      "Review the live output rendered on preview components.",
      "Click **Copy CSS Code** to copy the generated styles to your clipboard."
    ],
    ctaHref: "../index.html#tool/css-studio",
    ctaLabel: "Launch CSS Studio"
  },
  {
    id: "color-lab",
    fileName: "color-lab.html",
    title: "Color Lab & Contrast Suite Guide | OmniTool Hub",
    description: "Learn how to create WCAG-compliant color palettes and evaluate contrast readability ratios.",
    h1: "Color Lab & Contrast Suite Guide",
    tag: "Color Management",
    leadParagraph: "Designing accessible digital interfaces requires careful selection of colors. OmniTool Hub's Color Lab & Contrast Suite helps you build WCAG-compliant color palettes, check contrast accessibility ratios, and generate tints and shades client-side.",
    tabsTitle: "Color Lab Capabilities",
    tabs: [
      {
        title: "1. Color Palette Generator",
        badge: "Palettes",
        desc: "Input color codes to generate complementary, triadic, tetradic, and analogous color ranges. Copy palettes in HEX, RGB, or HSL formats."
      },
      {
        title: "2. WCAG Contrast Checker",
        badge: "Contrast",
        desc: "Evaluate text and background contrast ratios. Highlights AA and AAA readability scores for small and large text sizes."
      },
      {
        title: "3. Shades & Tints Generator",
        badge: "Tints/Shades",
        desc: "Generate granular increments of any color, from dark shades to light tints. Perfect for design system color scales."
      }
    ],
    proTip: "Use the built-in color-blindness simulator to preview how your palettes appear to users with different forms of color-vision deficiencies.",
    steps: [
      "Enter a base color in HEX, RGB, or HSL format.",
      "Use **Palette Builder** to generate color schemes, or **Contrast Checker** to test text readability.",
      "Review WCAG compliance indicators.",
      "Copy color codes or export your complete palette schema."
    ],
    ctaHref: "../index.html#tool/color-lab",
    ctaLabel: "Launch Color Lab"
  },
  {
    id: "security-suite",
    fileName: "security-suite.html",
    title: "Security & Passwords Suite Guide | OmniTool Hub",
    description: "Learn how to generate randomized passwords, analyze entropy, and compile bulk UUID keys.",
    h1: "Security & Passwords Suite Guide",
    tag: "Security & Pass",
    leadParagraph: "Weak credentials and predictable keys expose systems to vulnerabilities. OmniTool Hub's Security & Passwords Suite exposes high-entropy generation tools (random passwords, RFC 4122 v4 UUID keys) inside a client-side environment powered by the Web Crypto API.",
    tabsTitle: "Security Generators",
    tabs: [
      {
        title: "1. Password Generator",
        badge: "Passwords",
        desc: "Build randomized passwords with length control, character set toggles (uppercase, lowercase, numbers, symbols), and live entropy strength analysis."
      },
      {
        title: "2. UUID Generator",
        badge: "UUID v4",
        desc: "Generate bulk collections of cryptographically secure v4 UUID keys. Ideal for database seeding and unique identifiers."
      }
    ],
    proTip: "All random values are generated using the browser's Web Crypto API, ensuring cryptographically secure entropy that cannot be predicted.",
    steps: [
      "Select your generation tab (**Password Generator** or **UUID Generator**).",
      "Configure preferences (lengths, character sets, or quantity of keys).",
      "Review entropy and security strength ratings.",
      "Click the action button and copy the generated credentials or keys."
    ],
    ctaHref: "../index.html#tool/security-suite",
    ctaLabel: "Launch Security Suite"
  },
  {
    id: "datetime-suite",
    fileName: "datetime-suite.html",
    title: "Date & Time Suite Guide | OmniTool Hub",
    description: "Learn how to convert Unix epochs, calculate durations, and calculate offset dates.",
    h1: "Date & Time Suite Guide",
    tag: "Calculator",
    leadParagraph: "Parsing epochs and calculating date durations can be tricky. OmniTool Hub's Date & Time Suite helps you convert Unix timestamps to human dates, calculate durations between times, and add/subtract time fields dynamically.",
    tabsTitle: "Date & Time Utilities",
    tabs: [
      {
        title: "1. Unix Epoch Converter",
        badge: "Epoch",
        desc: "Convert raw Unix timestamp integers (seconds or milliseconds) into local and GMT/UTC date strings, or translate date strings back to epoch values."
      },
      {
        title: "2. Date Calculator",
        badge: "Calculator",
        desc: "Add or subtract days, months, and years from any calendar date, or calculate the exact duration between two dates."
      }
    ],
    proTip: "Calculations run entirely client-side using JavaScript Date and Time APIs, ensuring your time calculations are processed securely.",
    steps: [
      "Paste your timestamp or select calendar dates.",
      "Select your utility tab (**Epoch Converter** or **Date Calculator**).",
      "Configure parameters (seconds/milliseconds or date offsets).",
      "Review formatted date outputs or duration summaries."
    ],
    ctaHref: "../index.html#tool/datetime-suite",
    ctaLabel: "Launch Date-Time Suite"
  },
  {
    id: "unit-converter",
    fileName: "unit-converter.html",
    title: "Unit Converter Guide | OmniTool Hub",
    description: "Learn how to convert storage metrics, lengths, weights, and temperatures across global standards.",
    h1: "Universal Unit Converter Guide",
    tag: "Conversion",
    leadParagraph: "Converting measurements across different units requires precise conversions. OmniTool Hub's Unit Converter offers an instant, offline utility to translate weights, lengths, temperatures, data rates, and memory storage sizes.",
    tabsTitle: "Conversion Categories",
    tabs: [
      {
        title: "1. Data & Storage Conversion",
        badge: "Data",
        desc: "Convert values between bytes, kilobytes, megabytes, gigabytes, and terabytes. Supports binary (MiB) and decimal (MB) calculations."
      },
      {
        title: "2. Length & Mass Conversions",
        badge: "Measurements",
        desc: "Convert between metric and imperial systems, such as meters, feet, inches, grams, pounds, and ounces."
      },
      {
        title: "3. Temperature Conversions",
        badge: "Temperature",
        desc: "Convert temperatures between Celsius, Fahrenheit, and Kelvin."
      }
    ],
    proTip: "Conversion calculations are processed locally in your browser memory as you type, providing instant values.",
    steps: [
      "Select your conversion category from the dropdown menu.",
      "Enter a value inside the **Input Value** window.",
      "Choose the source unit and target unit options.",
      "Copy the converted value instantly."
    ],
    ctaHref: "../index.html#tool/unit-converter",
    ctaLabel: "Launch Unit Converter"
  },
  {
    id: "graphics-studio",
    fileName: "graphics-studio.html",
    title: "Graphics Designer & Screenshot Studio Guide | OmniTool Hub",
    description: "Learn how to capture snapshots, build banners, overlay text, and apply premium vintage filters.",
    h1: "Graphics Designer & Screenshot Studio Guide",
    tag: "Graphics & Screen Studio",
    leadParagraph: "Designing digital banners or adding overlays to screenshots should not require complex design software. OmniTool Hub's Graphics Designer and Screenshot Studio offers a lightweight design workspace to edit image assets, capture webcam snapshots, and apply vintage filters entirely client-side.",
    tabsTitle: "Graphics Tools & Panels",
    tabs: [
      {
        title: "1. Studio Editor Canvas",
        badge: "Editor",
        desc: "Upload local images or capture webcam streams. Add custom text overlays, shapes, canvas borders, and crop regions."
      },
      {
        title: "2. Vintage Filter Engine",
        badge: "Filters",
        desc: "Apply vintage sepia, Matrix green, neon cyberpunk, or monochrome filter overlays to your canvas designs."
      }
    ],
    proTip: "Canvas operations run locally in your browser, ensuring your private photos, webcam captures, and banners are never uploaded to any server.",
    steps: [
      "Upload an image or click **Webcam Snapshot** to capture a stream.",
      "Use design tools to add text, adjust transparency, and crop dimensions.",
      "Select and preview vintage filters on your assets.",
      "Click **Download Image** or copy it directly to your clipboard."
    ],
    ctaHref: "../index.html#tool/graphics-studio",
    ctaLabel: "Launch Graphics Studio"
  },
  {
    id: "calculator",
    fileName: "calculator.html",
    title: "Scientific Calculator Guide | OmniTool Hub",
    description: "Learn how to execute calculations, save histories, and compile trigonometric operations.",
    h1: "Scientific Calculator Guide",
    tag: "Calculator",
    leadParagraph: "Perform math calculations without loading heavy spreadsheets. OmniTool Hub's Scientific Calculator provides an arithmetic console with trigonometric functions, logarithmic operations, and calculation history log support.",
    tabsTitle: "Calculator Features",
    tabs: [
      {
        title: "1. Scientific Console",
        badge: "Console",
        desc: "Solve arithmetic, exponents, roots, factorials, sine, cosine, tangent, and logarithmic calculations with keyboard shortcut support."
      },
      {
        title: "2. Calculation History Log",
        badge: "History",
        desc: "View, reuse, or clear calculations from your active session history, making it easy to track complex multi-step problems."
      }
    ],
    proTip: "You can use your physical keyboard numpad to type calculations. All math compiles locally in your browser memory.",
    steps: [
      "Enter your math expression using the visual keys or your physical keyboard.",
      "Utilize scientific modifiers (like `sin`, `cos`, or `log`) for advanced calculations.",
      "Press **Enter** or click `=` to compile the result.",
      "Inspect or copy previous results from the **History Log**."
    ],
    ctaHref: "../index.html#tool/calculator",
    ctaLabel: "Launch Calculator"
  },
  {
    id: "qr-generator",
    fileName: "qr-generator.html",
    title: "Dynamic QR Code Studio Guide | OmniTool Hub",
    description: "Learn how to design custom vector QR codes with gradients, dots, and centered logos.",
    h1: "Dynamic QR Code Studio Guide",
    tag: "Generators",
    leadParagraph: "Standard QR generators offer basic layouts. OmniTool Hub's Dynamic QR Code Studio lets you design vector QR codes with custom dots, gradients, and logo overlays, all processed locally in your browser memory.",
    tabsTitle: "QR Design Options",
    tabs: [
      {
        title: "1. QR Art Canvas Designer",
        badge: "Art Design",
        desc: "Customize dot styles, corner shapes, eye borders, and background spacing. Build gradients or solid color themes."
      },
      {
        title: "2. Center Logo Overlay",
        badge: "Branding",
        desc: "Upload a logo image to center inside the QR code matrix. Automatically overlays the asset and adjusts scale values."
      }
    ],
    proTip: "Ensure your logo size doesn't block the QR code's readability. Test your QR code using a mobile scanner before downloading.",
    steps: [
      "Paste your text or target URL into the **QR Code Value** input field.",
      "Adjust dot shapes, colors, gradients, and corner styles.",
      "Upload your company logo to center in the matrix.",
      "Verify code readability and click **Download SVG/PNG**."
    ],
    ctaHref: "../index.html#tool/qr-generator",
    ctaLabel: "Launch QR Studio"
  },
  {
    id: "seo-previewer",
    fileName: "seo-previewer.html",
    title: "Meta Tag & SEO Previewer Guide | OmniTool Hub",
    description: "Learn how to design meta tags and preview mockups of search engines and social cards.",
    h1: "Meta Tag & SEO Previewer Guide",
    tag: "Generators",
    leadParagraph: "Optimizing search listings and social previews is key to web visibility. OmniTool Hub's Meta Tag & SEO Previewer lets you design meta tags and preview social cards for Google, Facebook, Twitter, and Discord, all in one local session.",
    tabsTitle: "SEO Preview Categories",
    tabs: [
      {
        title: "1. Meta Tag Generator",
        badge: "Meta Tags",
        desc: "Enter site names, descriptions, keywords, canonical URLs, and image links to generate standard HTML meta tags."
      },
      {
        title: "2. Social Card Mockups",
        badge: "Previews",
        desc: "Inspect live previews of how your site will appear as a Google search listing, Facebook post, Twitter tweet, or Discord embed."
      }
    ],
    proTip: "Ensure your meta descriptions stay under 160 characters to prevent clipping in search engine results.",
    steps: [
      "Enter your page details inside the **SEO Metadata** form fields.",
      "Verify card layouts across the **Google**, **Facebook**, **Twitter**, and **Discord** preview panes.",
      "Click **Generate Tags** to compile the HTML meta block.",
      "Copy the code snippet and paste it into the `<head>` of your website project."
    ],
    ctaHref: "../index.html#tool/seo-previewer",
    ctaLabel: "Launch SEO Previewer"
  },
  {
    id: "image-converter",
    fileName: "image-converter.html",
    title: "Image Optimizer & Converter Guide | OmniTool Hub",
    description: "Learn how to compress file sizes, resize dimensions, and convert formats client-side.",
    h1: "Image Optimizer & Converter Guide",
    tag: "Graphics & Screen Studio",
    leadParagraph: "Compressing images or changing formats shouldn't require third-party servers. OmniTool Hub's Image Optimizer & Converter lets you resize dimensions, adjust compression quality, and convert image formats locally in your browser.",
    tabsTitle: "Optimization Tools",
    tabs: [
      {
        title: "1. Format Converter",
        badge: "Converter",
        desc: "Convert image uploads between PNG, JPG, WebP, and GIF formats. Adjust dimensions and compile batches client-side."
      },
      {
        title: "2. Compression Tuner",
        badge: "Optimizer",
        desc: "Adjust compression quality sliders to reduce file sizes. View real-time previews and file size comparisons."
      }
    ],
    proTip: "Converting images to WebP can save up to 80% on file sizes, helping speed up website load times.",
    steps: [
      "Select and load your target image file.",
      "Choose your desired output format and adjust quality sliders.",
      "Set target dimensions if resizing.",
      "Click **Convert Image** and download the optimized output."
    ],
    ctaHref: "../index.html#tool/image-converter",
    ctaLabel: "Launch Image Optimizer"
  },
  {
    id: "svg-animator",
    fileName: "svg-animator.html",
    title: "SVG Animation Studio Guide | OmniTool Hub",
    description: "Learn how to animate SVG vectors, visualize paths, and export animated SVG files.",
    h1: "SVG Animation Studio Guide",
    tag: "Graphics & Screen Studio",
    leadParagraph: "Add movement to standard vector graphics. OmniTool Hub's SVG Animation Studio lets you import SVG codes, inspect vector paths, apply keyframe presets, and export animated SVG files locally.",
    tabsTitle: "Studio Panels & Animation",
    tabs: [
      {
        title: "1. Vector Canvas Layout",
        badge: "Canvas",
        desc: "Import raw SVG code files. Visualize paths, nodes, shapes, and group configurations on a responsive grid canvas."
      },
      {
        title: "2. Keyframe Presets",
        badge: "Keyframes",
        desc: "Apply preset animations such as self-drawing outlines, spin, float, neon pulse, and fade-in to vector components."
      }
    ],
    proTip: "You can customize path properties (like stroke width and dash offsets) inside the sidebar. Exported files contain inline CSS animations.",
    steps: [
      "Paste your SVG code or upload a vector graphic file.",
      "Select path components and apply animation keyframe presets.",
      "Adjust stroke colors, animation durations, and easing styles.",
      "Verify the output and click **Export Animated SVG**."
    ],
    ctaHref: "../index.html#tool/svg-animator",
    ctaLabel: "Launch SVG Studio"
  },
  {
    id: "url-parser",
    fileName: "url-parser.html",
    title: "URL Query Parser & Builder Guide | OmniTool Hub",
    description: "Learn how to parse web addresses, isolate domain routes, edit parameters in a grid, and generate clean links with UTM structures.",
    h1: "URL Query Parser & Builder Guide",
    tag: "Transformations",
    leadParagraph: "Inspecting complex web links with multiple tracking parameters can be messy. OmniTool Hub's URL Query Parser & Builder lets you split addresses into structured routes, manage query keys in a grid, and build clean URLs client-side.",
    tabsTitle: "Premium Capabilities",
    tabs: [
      {
        title: "1. Link Query Parser & Inspector",
        badge: "Inspector",
        desc: "Splits URLs into host protocols, domains, routes, and query parameters, displaying components in a color-coded interactive grid."
      },
      {
        title: "2. UTM Campaign Builder Form",
        badge: "Campaigns",
        desc: "Dedicated campaign builder tab allows you to fill standard campaign parameters (utm_source, utm_medium, etc.) and auto-inject them into your URL."
      },
      {
        title: "3. Smart Inline Inspectors & Decoders",
        badge: "Smart Tools",
        desc: "Automatically detects base64 strings or nested JSON query payloads and decodes or pretty-prints them inline."
      },
      {
        title: "4. Live QR Code Generator",
        badge: "QR Code",
        desc: "Draws a scan-ready QR code of your rebuilt URL onto a canvas for instant mobile device testing."
      }
    ],
    proTip: "The tool uses local URL API engines to parse components, ensuring your private query data and API keys stay inside your browser tab.",
    steps: [
      "Paste a web link or URL string into the **Target URL** input window.",
      "Review parsed components (protocol, hostname, path, hash) in the color-coded inspector cards.",
      "Add, edit, or delete parameters to modify the URL, or use the UTM Campaign Form to inject trackers.",
      "Toggle Bulk Edit mode to paste list items or edit parameters as plain text.",
      "Reorder rows using up/down controls, clean tracking parameters in one click, and copy the rebuilt URL or scan the QR Code."
    ],
    ctaHref: "../index.html#tool/url-parser",
    ctaLabel: "Launch URL Parser"
  },
  {
    id: "text-analyzer",
    fileName: "text-analyzer.html",
    title: "Text Readability & Analyzer Guide | OmniTool Hub",
    description: "Learn how to evaluate reading times, keyword densities, and calculate Flesch readability scores.",
    h1: "Text Readability & Analyzer Guide",
    tag: "Pattern Analysis",
    leadParagraph: "Analyzing text length and readability is essential for copywriting and SEO. OmniTool Hub's Text Readability & Analyzer lets you calculate Flesch Reading Ease scores, estimate reading time, and analyze keyword density client-side.",
    tabsTitle: "Audit Categories",
    tabs: [
      {
        title: "1. Readability Audit Console",
        badge: "Metrics",
        desc: "Displays word, line, and character counts, along with Flesch Reading Ease scores and estimated reading times."
      },
      {
        title: "2. Keyword Density map",
        badge: "Density Map",
        desc: "Calculates the frequency of recurring words to help optimize keyword usage and prevent keyword stuffing."
      }
    ],
    proTip: "A Flesch Reading Ease score between 60 and 70 is ideal, indicating the content is readable for standard web audiences.",
    steps: [
      "Paste your article or copy draft into the input pane.",
      "Review character counts, word counts, and readability scores in real time.",
      "Inspect word frequency tables to identify overused terms.",
      "Copy your polished, analyzed text drafts."
    ],
    ctaHref: "../index.html#tool/text-analyzer",
    ctaLabel: "Launch Text Analyzer"
  },
  {
    id: "mock-data-generator",
    fileName: "mock-data-generator.html",
    title: "Private CSV/JSON Mock Data Generator Guide | OmniTool Hub",
    description: "Learn how to design schemas, configure column formats, and generate mock datasets client-side.",
    h1: "Private CSV/JSON Mock Data Generator Guide",
    tag: "Generators",
    leadParagraph: "Creating fake datasets for system testing or software prototyping can expose schemas when using online tools. OmniTool Hub's Mock Data Generator lets you design schemas, choose column types, and generate up to 50,000 rows of mock data entirely in browser memory.",
    tabsTitle: "Schema Builder & Compiler",
    tabs: [
      {
        title: "1. Schema Designer Grid",
        badge: "Schema Design",
        desc: "Add columns, define header fields, and select data types (names, emails, dates, numbers, phone numbers, UUIDs)."
      },
      {
        title: "2. Bulk Generator Options",
        badge: "Generation",
        desc: "Configure target row counts and choose output formats (JSON array of objects or flat CSV strings)."
      }
    ],
    proTip: "Data generation runs inside local browser memory streams, allowing you to generate large datasets offline without server lag.",
    steps: [
      "Define column headers and select target data generator types in the designer grid.",
      "Set your desired row count (supports generating up to 50,000 rows).",
      "Choose output formats (**JSON** or **CSV**).",
      "Click **Generate Data** and download the generated file."
    ],
    ctaHref: "../index.html#tool/mock-data-generator",
    ctaLabel: "Launch Mock Generator"
  },
  {
    id: "code-playground",
    fileName: "code-playground.html",
    title: "HTML/CSS/JS Live Playground Guide | OmniTool Hub",
    description: "Learn how to write and test front-end HTML, CSS, and JS code in real-time, load external CDN libraries, and debug using simulated logs.",
    h1: "HTML/CSS/JS Live Playground Guide",
    tag: "Generators",
    leadParagraph: "Developing front-end UI sketches or testing interactive widgets usually requires creating local project files, setting up servers, or dealing with heavy web tools. OmniTool Hub's HTML/CSS/JS Live Playground provides a lightweight, instant developer environment running entirely in your browser sandbox, complete with responsive testing, CDN integrations, and active debugging console diagnostics.",
    tabsTitle: "Interactive Playground Features",
    tabs: [
      {
        title: "1. Code Editor Panels",
        badge: "Editors",
        desc: "Construct HTML markup structure, CSS styles, and JavaScript interactive scripts side-by-side. Supports convenient Tab indentation overrides and Ctrl + Enter hotkey compiling."
      },
      {
        title: "2. Live Visual Sandbox & Resizing",
        badge: "Live View",
        desc: "See your changes render instantly. Toggle between Desktop, Tablet (768px), and Mobile (375px) widths to test responsive layout behavior in real-time."
      },
      {
        title: "3. CDN Resources Selector",
        badge: "Libraries",
        desc: "Inject popular CSS and JS frameworks (such as Tailwind CSS, Font Awesome, Bootstrap, jQuery, Lodash, or Chart.js) directly into the compiled iframe header by selecting them from presets or entering custom URLs."
      },
      {
        title: "4. Debug Console & Standalone Export",
        badge: "Console & Export",
        desc: "Inspect standard outputs, variable dumps, warnings, and errors in the simulated console logs, with filters for easy diagnostic parsing. Export your complete project as a single self-contained HTML file in a single click."
      }
    ],
    proTip: "Because all scripts are executed locally via Object URLs in your browser context, your proprietary code structure, layout styles, and API key configurations remain completely private and secure.",
    steps: [
      "Compose your structure in the **HTML**, layout design in **CSS**, and functions in the **JavaScript** editors.",
      "Check the **Auto Run** box to enable debounced real-time compilations, or click **Run** to manually update the frame.",
      "Optionally expand the **External Libraries** drawer to choose presets like Tailwind CSS or Font Awesome.",
      "Filter simulated console outputs by level (Logs, Warns, Errs) to catch variables or syntax warnings.",
      "Click **Download** to save your compiled work as a single, portable HTML file."
    ],
    ctaHref: "../index.html#tool/code-playground",
    ctaLabel: "Launch Live Playground"
  },
  {
    id: "pii-anonymizer",
    fileName: "pii-anonymizer.html",
    title: "Client-Side PII Masker & Anonymizer Guide | OmniTool Hub",
    description: "Learn how to detect, redact, hash, and mask sensitive Personal Identifiable Information (PII) from server logs locally.",
    h1: "Client-Side PII Masker & Anonymizer Guide",
    tag: "Crypto & Security",
    leadParagraph: "Inspecting database logs, error traces, or transaction logs often risks leaking customer details like emails, IP addresses, and credit card numbers. OmniTool Hub's Client-Side PII Masker & Anonymizer processes all sensitive variables 100% locally inside your browser memory using robust regex identifiers, Luhn validation algorithms, and cryptographic SHA-256 hashes.",
    tabsTitle: "Anonymizer Configurations & Strategies",
    tabs: [
      {
        title: "1. Redaction Strategy",
        badge: "Redact",
        desc: "Replaces detected emails, phone numbers, IP addresses, credit cards, and SSNs with standardized labels (e.g., [REDACTED_EMAIL_1])."
      },
      {
        title: "2. Cryptographic Hashing",
        badge: "Hash",
        desc: "Computes native SHA-256 hashes of private values in-browser. Maintains referential relations in logs without exposing individual identities."
      },
      {
        title: "3. Asterisk Masking",
        badge: "Mask",
        desc: "Replaces inner portions of credentials with asterisks (e.g. jo**@ex****.com or ************4444) for manual security reviews."
      },
      {
        title: "4. Custom sensitive dictionary",
        badge: "Custom Words",
        desc: "Allows inputting comma-separated proprietary project codes, custom names, or secret passwords to scrub them globally from pasted text."
      }
    ],
    proTip: "Because all parsing is done on client-side regex engines and native SubtleCrypto APIs, no logs or customer records are ever sent over network sockets.",
    steps: [
      "Paste your text logs, CSV, or database records into the input box.",
      "Check the target PII checkboxes (Emails, IPs, Phones, Credit Cards, SSNs).",
      "Optionally enter custom words to censor in the custom words input box.",
      "Select your preferred masking strategy: **Redact**, **Hash**, or **Mask**.",
      "Inspect the live output and click **Copy Output** or **Download File** to save your clean logs."
    ],
    ctaHref: "../index.html#tool/pii-anonymizer",
    ctaLabel: "Launch PII Anonymizer"
  },
  {
    id: "json-formatter",
    fileName: "json-formatter.html",
    title: "JSON, SQL & CSV Data Formatter Suite Guide | OmniTool Hub",
    description: "Learn how to format, validate, and convert JSON, SQL, and CSV datasets entirely client-side using OmniTool Hub's privacy-focused utility suites.",
    h1: "JSON, SQL & CSV Data Formatter Suite Guide",
    tag: "Formatters & Parsers",
    leadParagraph: "In modern software engineering, data format conversions and payload validation are daily operations. However, pasting sensitive production payloads, proprietary database queries, or client lists into random online websites exposes your data to public servers, search indexers, and third-party trackers. OmniTool Hub's Data Formatter & Converter Suite runs 100% in your local browser memory buffer, ensuring complete confidentiality.",
    tabsTitle: "Formatter Suite Navigation & Tab Details",
    tabs: [
      {
        title: "1. JSON Formatter & Validator",
        badge: "JSON",
        desc: "Beautifies, minifies, sorts keys, and checks JSON syntax in real time. Catches errors and displays exact character and line offset locations for instant debugging."
      },
      {
        title: "2. SQL Query Beautifier",
        badge: "SQL",
        desc: "Standardizes complex SQL queries by capitalizing key keywords (SELECT, JOIN, WHERE, GROUP BY) and structuring queries for easy review."
      },
      {
        title: "3. CSV / JSON Converter",
        badge: "CSV / JSON",
        desc: "A fast local converter to map structured tabular CSV datasets into developer-friendly JSON arrays of objects and vice versa."
      }
    ],
    proTip: "Because these modules run entirely client-side using JavaScript, you can safely paste proprietary database rows, API responses, and client CSV logs even when completely disconnected from the internet.",
    steps: [
      "Paste your raw data into the **Input** textarea.",
      "Switch to your target tab (**JSON**, **SQL**, or **CSV**).",
      "Configure formatting preferences (2-space, 4-space, tabs, or minify).",
      "Click **Format** or **Convert** and copy the cleaned output instantly."
    ],
    ctaHref: "../index.html#tool/json-formatter",
    ctaLabel: "Launch Data Formatter"
  },
  {
    id: "ip-subnet-calculator",
    fileName: "ip-subnet-calculator.html",
    title: "IP Subnet & MAC Address Calculator Guide | OmniTool Hub",
    description: "Learn how to calculate IPv4 CIDR subnets, discover usable host ranges, inspect wildcard masks, and look up MAC OUI vendors client-side.",
    h1: "IP Subnet & MAC Address Calculator Guide",
    tag: "Network Utilities",
    leadParagraph: "Planning network architectures, partitioning VPC subnets, and diagnosing local hardware requires fast, accurate IP subnetting calculations. OmniTool Hub's IP Subnet & MAC Address Suite runs 100% in your browser without sending internal network topology details or private IP ranges to the cloud.",
    tabsTitle: "Subnetting Features & Operations",
    tabs: [
      {
        title: "1. CIDR Subnet Calculator",
        badge: "CIDR",
        desc: "Calculate network address, broadcast address, netmask, wildcard mask, and usable host address ranges for any IPv4 address with custom /CIDR prefix lengths."
      },
      {
        title: "2. Binary Representation & Wildcard",
        badge: "Binary View",
        desc: "Inspect binary representations of subnet divisions and wildcard masks to easily plan routing tables and firewall rules."
      },
      {
        title: "3. MAC Address Formatter & OUI Lookup",
        badge: "MAC & OUI",
        desc: "Format MAC addresses across standard notations (colon, hyphen, dot) and look up hardware vendor information using a local offline database."
      }
    ],
    proTip: "You can input private RFC 1918 addresses (like 10.0.0.0/8 or 172.16.0.0/12) without fear—computations never leave your workstation.",
    steps: [
      "Enter an IPv4 address and CIDR prefix (e.g. 192.168.1.0/24) into the calculator.",
      "Inspect the live calculation summary showing usable hosts, netmask, and broadcast boundaries.",
      "Switch to the MAC / OUI tab to format hardware addresses or search device manufacturers.",
      "Copy calculated network parameters directly to your clipboard."
    ],
    ctaHref: "../index.html#tool/ip-subnet-calculator",
    ctaLabel: "Launch Subnet Calculator"
  }
];

const toolMeta = {
  'pipeline-builder': { category: 'dev', categoryName: 'Developer Tools', icon: '⚡', color: '#00f2fe' },
  'text-encoder-suite': { category: 'text', categoryName: 'Text & Writing', icon: '🔤', color: '#10b981' },
  'jwt-decoder': { category: 'dev', categoryName: 'Developer Tools', icon: '🔑', color: '#00f2fe' },
  'crypto-suite': { category: 'crypto', categoryName: 'Crypto & Privacy', icon: '🛡️', color: '#f59e0b' },
  'markdown-preview': { category: 'text', categoryName: 'Text & Writing', icon: '📝', color: '#10b981' },
  'text-diff': { category: 'text', categoryName: 'Text & Writing', icon: '⚖️', color: '#10b981' },
  'pdf-searcher': { category: 'files', categoryName: 'Files & PDFs', icon: '🔍', color: '#ec4899' },
  'pdf-utilities': { category: 'files', categoryName: 'Files & PDFs', icon: '📄', color: '#ec4899' },
  'regex-tester': { category: 'dev', categoryName: 'Developer Tools', icon: '🎯', color: '#00f2fe' },
  'css-studio': { category: 'design', categoryName: 'Design & CSS', icon: '🎨', color: '#9d4edd' },
  'color-lab': { category: 'design', categoryName: 'Design & CSS', icon: '🌈', color: '#9d4edd' },
  'security-suite': { category: 'crypto', categoryName: 'Crypto & Privacy', icon: '🔐', color: '#f59e0b' },
  'datetime-suite': { category: 'math', categoryName: 'Math & Time', icon: '⏱️', color: '#3b82f6' },
  'unit-converter': { category: 'math', categoryName: 'Math & Time', icon: '📐', color: '#3b82f6' },
  'graphics-studio': { category: 'design', categoryName: 'Design & CSS', icon: '📸', color: '#9d4edd' },
  'calculator': { category: 'math', categoryName: 'Math & Time', icon: '🧮', color: '#3b82f6' },
  'qr-generator': { category: 'dev', categoryName: 'Developer Tools', icon: '📱', color: '#00f2fe' },
  'seo-previewer': { category: 'dev', categoryName: 'Developer Tools', icon: '🌐', color: '#00f2fe' },
  'image-converter': { category: 'files', categoryName: 'Files & PDFs', icon: '🖼️', color: '#ec4899' },
  'svg-animator': { category: 'design', categoryName: 'Design & CSS', icon: '✨', color: '#9d4edd' },
  'url-parser': { category: 'dev', categoryName: 'Developer Tools', icon: '🔗', color: '#00f2fe' },
  'text-analyzer': { category: 'text', categoryName: 'Text & Writing', icon: '📊', color: '#10b981' },
  'mock-data-generator': { category: 'dev', categoryName: 'Developer Tools', icon: '🎲', color: '#00f2fe' },
  'code-playground': { category: 'dev', categoryName: 'Developer Tools', icon: '💻', color: '#00f2fe' },
  'pii-anonymizer': { category: 'crypto', categoryName: 'Crypto & Privacy', icon: '🕵️', color: '#f59e0b' },
  'json-formatter': { category: 'dev', categoryName: 'Developer Tools', icon: '📋', color: '#00f2fe' },
  'ip-subnet-calculator': { category: 'math', categoryName: 'Math & Time', icon: '🌐', color: '#00f2fe' }
};

function getRelatedTools(currentTool, allTools) {
  const meta = toolMeta[currentTool.id] || { category: 'dev' };
  const sameCat = allTools.filter(t => t.id !== currentTool.id && (toolMeta[t.id]?.category === meta.category));
  if (sameCat.length >= 3) {
    return sameCat.slice(0, 3);
  }
  const others = allTools.filter(t => t.id !== currentTool.id && !sameCat.includes(t));
  return [...sameCat, ...others].slice(0, 3);
}

const template = (tool, allTools) => {
  const meta = toolMeta[tool.id] || { category: 'dev', categoryName: 'Developer Tools', icon: '🛠️', color: '#00f2fe' };
  const related = getRelatedTools(tool, allTools);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tool.title}</title>
  <meta name="description" content="${tool.description}">
  <meta name="keywords" content="${tool.tag}, ${tool.h1}, OmniTool Hub, developer tools, client-side, offline, privacy">
  <link rel="canonical" href="https://omnitool-hub.vercel.app/guides/${tool.fileName}">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${tool.title}">
  <meta property="og:description" content="${tool.description}">
  <meta property="og:url" content="https://omnitool-hub.vercel.app/guides/${tool.fileName}">
  <meta property="og:site_name" content="OmniTool Hub">
  <meta property="og:image" content="https://omnitool-hub.vercel.app/social_media_assets/opengraph_landscape_1200x630.svg">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${tool.title}">
  <meta name="twitter:description" content="${tool.description}">
  <meta name="twitter:image" content="https://omnitool-hub.vercel.app/social_media_assets/twitter_header_1500x500.svg">

  <!-- Typography & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../style.css?v=1.2.2">

  <!-- JSON-LD Structured Data for Rich Search Snippets -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "OmniTool Hub",
            "item": "https://omnitool-hub.vercel.app/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Guides Hub",
            "item": "https://omnitool-hub.vercel.app/guides/index.html"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "${tool.h1}",
            "item": "https://omnitool-hub.vercel.app/guides/${tool.fileName}"
          }
        ]
      },
      {
        "@type": "TechArticle",
        "headline": "${tool.h1}",
        "description": "${tool.description}",
        "author": {
          "@type": "Organization",
          "name": "OmniTool Hub"
        },
        "publisher": {
          "@type": "Organization",
          "name": "OmniTool Hub",
          "logo": {
            "@type": "ImageObject",
            "url": "https://omnitool-hub.vercel.app/social_media_assets/profile_avatar_icon_1080x1080.svg"
          }
        },
        "datePublished": "2026-06-27",
        "dateModified": "2026-10-13",
        "mainEntityOfPage": "https://omnitool-hub.vercel.app/guides/${tool.fileName}"
      },
      {
        "@type": "HowTo",
        "name": "How to Use ${tool.h1.replace(/ Guide$/i, '')}",
        "description": "${tool.description}",
        "step": [
          ${tool.steps.map((step, idx) => `{
            "@type": "HowToStep",
            "position": ${idx + 1},
            "name": "Step ${idx + 1}",
            "text": "${step.replace(/"/g, '\\"').replace(/\*\*/g, '')}"
          }`).join(',\n          ')}
        ]
      }
    ]
  }
  </script>

  <style>
    :root {
      --bg-app: #07090e;
      --bg-card: rgba(18, 24, 38, 0.65);
      --border-color: rgba(255, 255, 255, 0.08);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-cyan: #00f2fe;
      --accent-purple: #9d4edd;
      --accent-emerald: #10b981;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-app);
      background-image: 
        radial-gradient(circle at 15% 15%, rgba(0, 242, 254, 0.06) 0%, transparent 40%),
        radial-gradient(circle at 85% 85%, rgba(157, 78, 221, 0.06) 0%, transparent 40%);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.65;
      padding: 0 0 60px 0;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    /* Top Navigation Bar */
    .top-nav {
      width: 100%;
      background: rgba(7, 9, 14, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 14px 24px;
    }

    .top-nav-inner {
      max-width: 1240px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      width: 100%;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text-main);
      font-weight: 800;
      font-size: 16px;
      flex-shrink: 0;
    }

    .nav-brand svg {
      width: 22px;
      height: 22px;
      color: var(--accent-cyan);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .nav-link-btn {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      transition: all 0.2s ease;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .nav-link-btn:hover {
      color: var(--accent-cyan);
      border-color: rgba(0, 242, 254, 0.3);
      background: rgba(0, 242, 254, 0.04);
    }

    .nav-launch-btn {
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      text-decoration: none;
      font-size: 13px;
      font-weight: 800;
      padding: 7px 16px;
      border-radius: 6px;
      transition: all 0.2s ease;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .nav-launch-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0, 242, 254, 0.4);
    }

    /* Breadcrumbs */
    .breadcrumbs-wrap {
      width: 100%;
      max-width: 1240px;
      margin: 20px auto 0 auto;
      padding: 0 20px;
      box-sizing: border-box;
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      font-size: 13px;
      color: var(--text-muted);
    }

    .breadcrumbs a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s;
    }

    .breadcrumbs a:hover {
      color: var(--accent-cyan);
    }

    .breadcrumbs span.current {
      color: var(--text-main);
      font-weight: 600;
    }

    /* Container */
    .container {
      max-width: 1240px;
      margin: 20px auto 0 auto;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    header {
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 24px;
      margin-bottom: 32px;
      text-align: center;
    }

    .category-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 242, 254, 0.08);
      border: 1px solid rgba(0, 242, 254, 0.25);
      color: var(--accent-cyan);
      font-size: 12px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 14px;
    }

    h1 {
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 14px;
      letter-spacing: -0.5px;
      line-height: 1.25;
    }

    .meta {
      font-size: 13px;
      color: var(--text-muted);
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .meta-tag {
      background: rgba(255, 255, 255, 0.04);
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid var(--border-color);
    }

    article h2 {
      font-size: 22px;
      font-weight: 700;
      margin-top: 36px;
      margin-bottom: 16px;
      color: var(--text-main);
      border-left: 3px solid var(--accent-cyan);
      padding-left: 12px;
    }

    article p {
      margin-bottom: 18px;
      color: var(--text-muted);
      font-size: 15.5px;
      line-height: 1.7;
    }

    article ul, article ol {
      margin-bottom: 18px;
      padding-left: 24px;
      color: var(--text-muted);
      font-size: 15px;
    }

    article li {
      margin-bottom: 8px;
    }

    .info-box {
      background: rgba(0, 242, 254, 0.04);
      border: 1px solid rgba(0, 242, 254, 0.2);
      border-radius: 10px;
      padding: 18px;
      margin: 28px 0;
    }

    .info-box strong {
      color: var(--accent-cyan);
      display: block;
      margin-bottom: 6px;
      font-size: 14.5px;
    }

    .tab-section {
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
    }

    .tab-title {
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .tab-badge {
      font-size: 11px;
      background: var(--accent-purple);
      color: #fff;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      font-weight: 700;
    }

    .cta-container {
      text-align: center;
      margin-top: 40px;
      padding: 32px 24px;
      background: rgba(0, 0, 0, 0.35);
      border-radius: 12px;
      border: 1px solid var(--border-color);
    }

    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      font-weight: 800;
      font-size: 16px;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      box-shadow: 0 4px 18px rgba(0, 242, 254, 0.35);
      transition: all 0.2s ease;
    }

    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(0, 242, 254, 0.55);
      color: #000;
    }

    .all-guides-cta {
      display: inline-block;
      margin-top: 18px;
      color: var(--accent-cyan);
      text-decoration: none;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
    }

    .all-guides-cta:hover {
      text-decoration: underline;
    }

    /* Related Guides Section */
    .related-section {
      margin-top: 50px;
      padding-top: 36px;
      border-top: 1px solid var(--border-color);
    }

    .related-heading {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .related-heading a {
      font-size: 13px;
      color: var(--accent-cyan);
      text-decoration: none;
      font-weight: 600;
    }

    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }

    .related-card {
      background: rgba(0, 0, 0, 0.25);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 18px;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
    }

    .related-card:hover {
      transform: translateY(-2px);
      border-color: rgba(0, 242, 254, 0.4);
      background: rgba(0, 242, 254, 0.03);
    }

    .related-badge {
      font-size: 11px;
      font-weight: 700;
      color: var(--accent-cyan);
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .related-title {
      font-size: 14.5px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 8px;
      line-height: 1.35;
    }

    .related-read {
      font-size: 12.5px;
      color: var(--text-muted);
      margin-top: auto;
      font-weight: 600;
    }

    .related-card:hover .related-read {
      color: var(--accent-cyan);
    }

    footer.guide-footer {
      max-width: 860px;
      margin: 40px auto 0 auto;
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
      padding: 0 20px;
    }

    footer.guide-footer a {
      color: var(--text-muted);
      text-decoration: none;
      margin: 0 8px;
      transition: color 0.2s;
    }

    footer.guide-footer a:hover {
      color: var(--accent-cyan);
    }

    /* Live Interactive Tool Card */
    .live-tool-embed-card {
      background: rgba(10, 14, 23, 0.75);
      border: 1px solid rgba(0, 242, 254, 0.25);
      border-radius: 14px;
      overflow: hidden;
      margin-bottom: 36px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 242, 254, 0.08);
    }

    .live-tool-embed-header {
      background: rgba(18, 24, 38, 0.85);
      border-bottom: 1px solid var(--border-color);
      padding: 12px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }

    .live-status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: var(--text-main);
    }

    .pulse-dot {
      width: 9px;
      height: 9px;
      background: var(--accent-emerald);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--accent-emerald);
      animation: pulseGlow 2s infinite ease-in-out;
    }

    @keyframes pulseGlow {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.3); opacity: 0.7; }
    }

    .live-fullscreen-link {
      font-size: 12.5px;
      font-weight: 700;
      color: var(--accent-cyan);
      text-decoration: none;
      padding: 5px 12px;
      border-radius: 6px;
      border: 1px solid rgba(0, 242, 254, 0.3);
      background: rgba(0, 242, 254, 0.06);
      transition: all 0.2s ease;
    }

    .live-fullscreen-link:hover {
      background: rgba(0, 242, 254, 0.15);
      border-color: var(--accent-cyan);
      transform: translateY(-1px);
    }

    .live-guide-tool-viewport {
      padding: 24px 20px;
      min-height: 260px;
    }

    /* Embedded Live Playground Full-Fidelity Responsive Overrides */
    .live-guide-tool-viewport .tool-content-layout.split-view {
      display: flex !important;
      flex-direction: column !important;
      gap: 20px !important;
      position: static !important;
      width: 100% !important;
    }

    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel,
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:first-of-type,
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:nth-of-type(2) {
      position: static !important;
      transform: none !important;
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      min-height: unset !important;
      box-shadow: none !important;
      border-radius: 12px !important;
      overflow: visible !important;
      padding: 20px !important;
    }

    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:first-of-type::after {
      display: none !important;
    }

    .live-guide-tool-viewport .adjust-settings-fab,
    .live-guide-tool-viewport .split-view-backdrop,
    .live-guide-tool-viewport .drawer-close-btn {
      display: none !important;
    }

    @media (min-width: 960px) {
      .live-guide-tool-viewport .tool-content-layout.split-view {
        display: grid !important;
        grid-template-columns: 1fr 1.05fr !important;
        gap: 20px !important;
        align-items: start !important;
      }
    }

    .guide-tool-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      color: var(--text-muted);
      gap: 12px;
      font-size: 13.5px;
    }

    .guide-tool-spinner {
      width: 30px;
      height: 30px;
      border: 3px solid rgba(0, 242, 254, 0.15);
      border-top-color: var(--accent-cyan);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Guide Toast Notification */
    .guide-toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: rgba(18, 24, 38, 0.95);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 10px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      opacity: 0;
      pointer-events: none;
      transform: translateY(10px);
      transition: all 0.25s ease;
      z-index: 9999;
    }

    .guide-toast.show {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    .guide-toast.success { border-color: var(--accent-emerald); color: #34d399; }
    .guide-toast.error { border-color: var(--accent-rose); color: #f87171; }
    .guide-toast.info { border-color: var(--accent-cyan); color: #38bdf8; }

    @media (max-width: 640px) {
      .container {
        padding: 24px 18px;
        border-radius: 12px;
      }
      h1 {
        font-size: 26px;
      }
      .nav-actions {
        display: none;
      }
    }
  </style>
</head>
<body>

  <!-- Top Sticky Navigation -->
  <nav class="top-nav">
    <div class="top-nav-inner">
      <a href="../index.html" class="nav-brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21L14.907 18M21 3L13.882 10.118M3 21L10.118 13.882M10.118 10.118L13.882 13.882M10.118 10.118L3 3M13.882 10.118L21 21" />
        </svg>
        <span>OmniTool Hub</span>
      </a>
      <div class="nav-actions">
        <a href="index.html" class="nav-link-btn">📚 All 26 Guides</a>
        <a href="../index.html#dashboard" class="nav-link-btn">🏠 Suite Dashboard</a>
        <a href="${tool.ctaHref}" class="nav-launch-btn">🚀 ${tool.ctaLabel}</a>
      </div>
    </div>
  </nav>

  <!-- Breadcrumbs -->
  <div class="breadcrumbs-wrap">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="../index.html">🏠 Home</a>
      <span>/</span>
      <a href="index.html">Guides Hub</a>
      <span>/</span>
      <span class="current">${tool.h1.replace(/ Guide$/i, '')}</span>
    </nav>
  </div>

  <main class="container">
    <header>
      <div class="category-pill">${meta.icon} ${meta.categoryName}</div>
      <h1>${tool.h1}</h1>
      <div class="meta">
        <span class="meta-tag">📅 Updated Oct 2026</span>
        <span class="meta-tag">🔒 100% Offline-Safe</span>
        <span class="meta-tag">🛠️ ${tool.tag}</span>
      </div>
    </header>

    <!-- LIVE INTERACTIVE EMBEDDED TOOL WORKSPACE -->
    <section class="live-tool-embed-card">
      <div class="live-tool-embed-header">
        <div class="live-status-indicator">
          <span class="pulse-dot"></span>
          <span><strong>Live In-Browser Tool</strong> — 100% Private, Zero Server Uploads</span>
        </div>
        <div class="live-tool-quick-links">
          <a href="${tool.ctaHref}" class="live-fullscreen-link">🚀 Open Fullscreen in Main Suite</a>
        </div>
      </div>
      <div id="live-guide-tool-viewport" class="live-guide-tool-viewport">
        <div class="guide-tool-loading">
          <div class="guide-tool-spinner"></div>
          <span>Loading ${tool.h1.replace(/ Guide$/i, '')}...</span>
        </div>
      </div>
    </section>

    <article>
      <p>
        ${tool.leadParagraph}
      </p>

      <h2>${tool.tabsTitle}</h2>
      <p>
        Here is a detailed breakdown of the capabilities, algorithms, and configurations available within this tool suite:
      </p>

      ${tool.tabs.map(tab => `
      <div class="tab-section">
        <div class="tab-title">
          <span>${tab.title}</span>
          <span class="tab-badge">${tab.badge}</span>
        </div>
        <p>
          ${tab.desc}
        </p>
      </div>
      `).join('')}

      <div class="info-box">
        <strong>💡 Pro-Tip on Security & Utility:</strong>
        ${tool.proTip}
      </div>

      <h2>Step-by-Step Usage Guide</h2>
      <ol>
        ${tool.steps.map(step => `<li>${step}</li>`).join('')}
      </ol>
    </article>

    <!-- Call to Action Banner -->
    <div class="cta-container">
      <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">Try this tool right now in your browser</h3>
      <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 20px;">Zero server uploads. 100% private, instant execution.</p>
      <a href="${tool.ctaHref}" class="cta-btn">🚀 ${tool.ctaLabel}</a>
      <br>
      <a href="index.html" class="all-guides-cta">📚 Browse All 26+ Tool Guides &rarr;</a>
    </div>

    <!-- Related Guides & Internal Links -->
    <section class="related-section">
      <div class="related-heading">
        <span>Explore Related Guides</span>
        <a href="index.html">View All 26 Guides &rarr;</a>
      </div>
      <div class="related-grid">
        ${related.map(rel => {
          const relMeta = toolMeta[rel.id] || { icon: '🛠️', categoryName: 'Tools' };
          return `
          <a href="${rel.fileName}" class="related-card">
            <div>
              <div class="related-badge">${relMeta.icon} ${relMeta.categoryName}</div>
              <div class="related-title">${rel.h1.replace(/ Guide$/i, '')}</div>
            </div>
            <div class="related-read">Read Guide &rarr;</div>
          </a>
          `;
        }).join('')}
      </div>
    </section>
  </main>

  <footer class="guide-footer">
    <p>&copy; 2026 OmniTool Hub. All operations run 100% locally in your browser.</p>
    <p style="margin-top: 8px;">
      <a href="../index.html">Home</a> &bull;
      <a href="index.html">Guides Hub</a> &bull;
      <a href="../index.html#privacy">Privacy Policy</a> &bull;
      <a href="../index.html#terms">Terms of Service</a> &bull;
      <a href="https://github.com/Ravik0892/Tools" target="_blank" rel="noopener">GitHub</a>
    </p>
  </footer>

  <!-- Client-side adapter & dynamic tool mounter -->
  <script type="module">
    const guideApp = {
      activeSubtab: ${tool.id === 'json-formatter' ? '"json"' : 'null'},
      showToast(msg, type = 'info') {
        let t = document.getElementById('guide-toast');
        if (!t) {
          t = document.createElement('div');
          t.id = 'guide-toast';
          t.className = 'guide-toast';
          document.body.appendChild(t);
        }
        t.innerText = msg;
        t.className = 'guide-toast show ' + type;
        setTimeout(() => { if (t) t.className = 'guide-toast'; }, 3200);
      },
      async copyText(text) {
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          this.showToast('Copied to clipboard!', 'success');
        } catch {
          this.showToast('Failed to copy', 'error');
        }
      },
      playSynthSound() {},
      getConfigValue(k, d) { return localStorage.getItem(k) || d; },
      navigateToTool(id) { window.location.href = '../index.html#tool/' + id; }
    };

    const targetModule = '${tool.id === 'json-formatter' ? 'formatter-suite.js' : tool.id + '.js'}';
    try {
      const module = await import('../tools/' + targetModule);
      const toolInstance = module.default;
      const viewport = document.getElementById('live-guide-tool-viewport');
      if (toolInstance && typeof toolInstance.renderUI === 'function' && viewport) {
        viewport.innerHTML = toolInstance.renderUI();
        if (typeof toolInstance.init === 'function') {
          await toolInstance.init(viewport, guideApp);
        }
      }
    } catch (err) {
      console.warn('[OmniTool Guide] Live tool initialization notice:', err);
      const viewport = document.getElementById('live-guide-tool-viewport');
      if (viewport) {
        viewport.innerHTML = \`
          <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 14px;">
            <p style="margin-bottom: 12px;">This tool is ready to use in the full application workspace.</p>
            <a href="${tool.ctaHref}" class="cta-btn" style="display: inline-block;">🚀 Launch Tool in Main Suite</a>
          </div>
        \`;
      }
    }
  </script>

</body>
</html>
`;
};

// Generates the Master Guides & Documentation Hub (guides/index.html)
const generateGuidesHub = (allTools) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OmniTool Hub Guides & Documentation Hub | 26+ Free Developer Utilities</title>
  <meta name="description" content="Explore free, step-by-step guides and tutorials for over 26 privacy-first developer, security, PDF, and design utilities. Learn how to process data safely client-side.">
  <meta name="keywords" content="developer tools guides, online tools tutorials, pdf tools guide, json formatter tutorial, jwt decoder guide, offline web tools, client side utilities">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://omnitool-hub.vercel.app/guides/">

  <!-- Open Graph / Social Sharing -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="OmniTool Hub Guides & Documentation Hub | 26+ In-Browser Tools">
  <meta property="og:description" content="Master 26+ offline-first developer, cryptography, PDF, and utility tools with comprehensive guides and tutorials.">
  <meta property="og:url" content="https://omnitool-hub.vercel.app/guides/">
  <meta property="og:site_name" content="OmniTool Hub">
  <meta property="og:image" content="https://omnitool-hub.vercel.app/social_media_assets/opengraph_landscape_1200x630.svg">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="OmniTool Hub Guides & Documentation Hub">
  <meta name="twitter:description" content="Comprehensive guides and tutorials for 26+ in-browser utility tools. Zero server uploads.">
  <meta name="twitter:image" content="https://omnitool-hub.vercel.app/social_media_assets/twitter_header_1500x500.svg">

  <!-- Typography & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <!-- JSON-LD Structured Data for Google Rich Snippets -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": "OmniTool Hub Guides & Documentation Hub",
        "description": "Complete collection of user guides, tutorials, and security breakdowns for 26+ client-side utility tools.",
        "url": "https://omnitool-hub.vercel.app/guides/",
        "isPartOf": {
          "@type": "WebSite",
          "name": "OmniTool Hub",
          "url": "https://omnitool-hub.vercel.app/"
        }
      },
      {
        "@type": "ItemList",
        "name": "OmniTool Hub Tool Guides",
        "numberOfItems": ${allTools.length},
        "itemListElement": [
          ${allTools.map((t, idx) => `{
            "@type": "ListItem",
            "position": ${idx + 1},
            "name": "${t.h1}",
            "url": "https://omnitool-hub.vercel.app/guides/${t.fileName}"
          }`).join(',\n          ')}
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What makes OmniTool Hub different from other online tools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every tool in OmniTool Hub runs 100% inside your browser memory using modern WebAssembly, Web Crypto, and Canvas APIs. Unlike standard tool sites, your files, tokens, and data are NEVER uploaded to an external server."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use OmniTool Hub guides and utilities offline?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! OmniTool Hub is built as a Progressive Web App (PWA) with full service worker caching. You can install it on your device and use every utility without an active internet connection."
            }
          },
          {
            "@type": "Question",
            "name": "Are there limits on file sizes or daily usage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No artificial limits. Because computation is done locally on your machine, you can process files as large as your device's RAM allows with zero usage throttling."
            }
          }
        ]
      }
    ]
  }
  </script>

  <style>
    :root {
      --bg-app: #07090e;
      --bg-card: rgba(18, 24, 38, 0.65);
      --border-color: rgba(255, 255, 255, 0.08);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-cyan: #00f2fe;
      --accent-purple: #9d4edd;
      --accent-emerald: #10b981;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-app);
      background-image: 
        radial-gradient(circle at 10% 20%, rgba(0, 242, 254, 0.07) 0%, transparent 45%),
        radial-gradient(circle at 90% 80%, rgba(157, 78, 221, 0.07) 0%, transparent 45%);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.6;
      padding: 0 0 60px 0;
      min-height: 100vh;
    }

    /* Top Sticky Navigation */
    .top-nav {
      background: rgba(7, 9, 14, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 14px 24px;
    }

    .top-nav-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: var(--text-main);
      font-weight: 800;
      font-size: 17px;
    }

    .nav-brand svg {
      width: 24px;
      height: 24px;
      color: var(--accent-cyan);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .nav-link-btn {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 600;
      padding: 7px 14px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      transition: all 0.2s ease;
    }

    .nav-link-btn:hover {
      color: var(--accent-cyan);
      border-color: rgba(0, 242, 254, 0.3);
      background: rgba(0, 242, 254, 0.04);
    }

    .nav-launch-btn {
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      text-decoration: none;
      font-size: 13.5px;
      font-weight: 800;
      padding: 7px 18px;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .nav-launch-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(0, 242, 254, 0.4);
    }

    /* Main Container */
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    /* Hero Section */
    .hero-section {
      text-align: center;
      max-width: 820px;
      margin: 0 auto 40px auto;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(0, 242, 254, 0.08);
      border: 1px solid rgba(0, 242, 254, 0.25);
      color: var(--accent-cyan);
      font-size: 12.5px;
      font-weight: 700;
      padding: 5px 14px;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 16px;
    }

    .hero-title {
      font-size: 40px;
      font-weight: 800;
      line-height: 1.2;
      background: linear-gradient(135deg, #fff 30%, var(--accent-cyan) 70%, var(--accent-purple) 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 16px;
      letter-spacing: -0.8px;
    }

    .hero-subtitle {
      font-size: 16.5px;
      color: var(--text-muted);
      line-height: 1.6;
      margin-bottom: 32px;
    }

    /* Live Search & Filter Bar */
    .search-filter-box {
      max-width: 680px;
      margin: 0 auto 28px auto;
      position: relative;
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 18px;
      width: 20px;
      height: 20px;
      color: var(--text-muted);
      pointer-events: none;
    }

    .hub-search-input {
      width: 100%;
      background: rgba(18, 24, 38, 0.8);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      padding: 14px 48px 14px 48px;
      font-size: 15px;
      color: var(--text-main);
      font-family: inherit;
      outline: none;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      transition: all 0.2s ease;
    }

    .hub-search-input:focus {
      border-color: var(--accent-cyan);
      box-shadow: 0 0 0 3px rgba(0, 242, 254, 0.2), 0 8px 24px rgba(0, 0, 0, 0.4);
    }

    .clear-btn {
      position: absolute;
      right: 14px;
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 18px;
      cursor: pointer;
      display: none;
      padding: 4px;
    }

    .clear-btn:hover {
      color: var(--text-main);
    }

    /* Category Filter Pills */
    .category-pills {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 40px;
    }

    .filter-btn {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      font-size: 13.5px;
      font-weight: 600;
      padding: 7px 16px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .filter-btn:hover {
      color: var(--text-main);
      border-color: rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.07);
    }

    .filter-btn.active {
      background: linear-gradient(135deg, rgba(0, 242, 254, 0.15), rgba(157, 78, 221, 0.15));
      border-color: var(--accent-cyan);
      color: var(--accent-cyan);
      font-weight: 700;
    }

    /* Cards Grid */
    .guides-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 24px;
    }

    .guide-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 14px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }

    .guide-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .guide-card:hover {
      transform: translateY(-4px);
      border-color: rgba(0, 242, 254, 0.35);
      box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 242, 254, 0.1);
    }

    .guide-card:hover::before {
      opacity: 1;
    }

    .card-top {
      margin-bottom: 16px;
    }

    .card-meta-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .card-category {
      font-size: 11.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--accent-cyan);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .card-badge {
      font-size: 11px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      padding: 2px 8px;
      border-radius: 4px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 8px;
      line-height: 1.35;
    }

    .card-title a {
      color: inherit;
      text-decoration: none;
      transition: color 0.2s;
    }

    .card-title a:hover {
      color: var(--accent-cyan);
    }

    .card-desc {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.55;
      margin-bottom: 16px;
    }

    .card-features {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 18px;
    }

    .card-feature-pill {
      font-size: 11px;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--border-color);
      color: var(--text-muted);
      padding: 3px 8px;
      border-radius: 4px;
    }

    .card-footer-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      padding-top: 16px;
      border-top: 1px solid var(--border-color);
    }

    .read-guide-btn {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: rgba(0, 242, 254, 0.08);
      border: 1px solid rgba(0, 242, 254, 0.25);
      color: var(--accent-cyan);
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      padding: 8px 14px;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .read-guide-btn:hover {
      background: rgba(0, 242, 254, 0.16);
      border-color: var(--accent-cyan);
    }

    .launch-tool-icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      text-decoration: none;
      font-size: 12.5px;
      font-weight: 600;
      padding: 8px 12px;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .launch-tool-icon-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }

    /* No Results Message */
    .no-results-msg {
      grid-column: 1 / -1;
      text-align: center;
      padding: 60px 20px;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 12px;
      display: none;
    }

    /* Value Pillars Section */
    .pillars-section {
      margin-top: 70px;
      padding: 40px 24px;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--border-color);
      border-radius: 16px;
    }

    .pillars-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }

    .pillar-card {
      padding: 16px;
    }

    .pillar-icon {
      font-size: 28px;
      margin-bottom: 12px;
    }

    .pillar-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 8px;
    }

    .pillar-desc {
      font-size: 13.5px;
      color: var(--text-muted);
      line-height: 1.55;
    }

    /* FAQ Section */
    .faq-section {
      margin-top: 60px;
      max-width: 860px;
      margin-left: auto;
      margin-right: auto;
    }

    .faq-heading {
      font-size: 26px;
      font-weight: 800;
      text-align: center;
      margin-bottom: 24px;
      color: var(--text-main);
    }

    .faq-item {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 10px;
      padding: 20px 24px;
      margin-bottom: 14px;
    }

    .faq-question {
      font-size: 16px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 8px;
    }

    .faq-answer {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.6;
    }

    /* Footer */
    footer.hub-footer {
      max-width: 1200px;
      margin: 60px auto 0 auto;
      padding-top: 30px;
      border-top: 1px solid var(--border-color);
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
    }

    footer.hub-footer a {
      color: var(--text-muted);
      text-decoration: none;
      margin: 0 10px;
      transition: color 0.2s;
    }

    footer.hub-footer a:hover {
      color: var(--accent-cyan);
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 30px;
      }
      .guides-grid {
        grid-template-columns: 1fr;
      }
      .nav-actions {
        display: none;
      }
    }
  </style>
</head>
<body>

  <!-- Top Sticky Navigation -->
  <nav class="top-nav">
    <div class="top-nav-inner">
      <a href="../index.html" class="nav-brand">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 21L14.907 18M21 3L13.882 10.118M3 21L10.118 13.882M10.118 10.118L13.882 13.882M10.118 10.118L3 3M13.882 10.118L21 21" />
        </svg>
        <span>OmniTool Hub</span>
      </a>
      <div class="nav-actions">
        <a href="../index.html#dashboard" class="nav-link-btn">🏠 Suite Dashboard</a>
        <a href="../index.html#plans" class="nav-link-btn">💎 Plans</a>
        <a href="https://github.com/Ravik0892/Tools" target="_blank" rel="noopener" class="nav-link-btn">⭐ GitHub</a>
        <a href="../index.html" class="nav-launch-btn">🚀 Open Suite</a>
      </div>
    </div>
  </nav>

  <main class="container">
    <!-- Hero Header -->
    <header class="hero-section">
      <div class="hero-badge">📚 Comprehensive Documentation &amp; Knowledge Base</div>
      <h1 class="hero-title">OmniTool Hub Guides &amp; Tutorials</h1>
      <p class="hero-subtitle">
        Deep dive into usage instructions, privacy architecture, and power-user configurations for all 26+ utility tools. All operations run 100% inside your browser memory with zero tracking.
      </p>

      <!-- Live Search Bar -->
      <div class="search-filter-box">
        <div class="search-input-wrapper">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="hub-search" class="hub-search-input" placeholder="Search guides by tool name, tag, or keyword... (e.g. PDF, JWT, JSON, Base64)" aria-label="Search guides">
          <button id="clear-search-btn" class="clear-btn" aria-label="Clear search">&times;</button>
        </div>
      </div>

      <!-- Category Filter Pills -->
      <div class="category-pills">
        <button class="filter-btn active" data-filter="all">All Guides (${allTools.length})</button>
        <button class="filter-btn" data-filter="dev">⚡ Developer Tools</button>
        <button class="filter-btn" data-filter="text">🔤 Text &amp; Writing</button>
        <button class="filter-btn" data-filter="crypto">🔐 Crypto &amp; Security</button>
        <button class="filter-btn" data-filter="files">📄 PDFs &amp; Files</button>
        <button class="filter-btn" data-filter="design">🎨 Design &amp; CSS</button>
        <button class="filter-btn" data-filter="math">🧮 Math &amp; Converters</button>
      </div>
    </header>

    <!-- Guides Card Grid -->
    <section class="guides-grid" id="guides-grid">
      ${allTools.map(tool => {
        const meta = toolMeta[tool.id] || { category: 'dev', categoryName: 'Developer Tools', icon: '🛠️' };
        return `
      <article class="guide-card" 
        data-category="${meta.category}" 
        data-title="${tool.h1.toLowerCase()}" 
        data-tag="${tool.tag.toLowerCase()}" 
        data-desc="${tool.description.toLowerCase()}">
        <div class="card-top">
          <div class="card-meta-bar">
            <div class="card-category">
              <span>${meta.icon}</span>
              <span>${meta.categoryName}</span>
            </div>
            <span class="card-badge">${tool.tag}</span>
          </div>
          <h2 class="card-title">
            <a href="${tool.fileName}">${tool.h1.replace(/ Guide$/i, '')}</a>
          </h2>
          <p class="card-desc">${tool.description}</p>
          <div class="card-features">
            ${tool.tabs.map(tab => `<span class="card-feature-pill">${tab.badge}</span>`).join('')}
          </div>
        </div>
        <div class="card-footer-actions">
          <a href="${tool.fileName}" class="read-guide-btn">
            <span>📖 Read Guide</span>
          </a>
          <a href="${tool.ctaHref}" class="launch-tool-icon-btn" title="Launch ${tool.h1.replace(/ Guide$/i, '')}">
            <span>🚀 Run Tool</span>
          </a>
        </div>
      </article>
        `;
      }).join('')}

      <div class="no-results-msg" id="no-results">
        <h3 style="font-size: 18px; margin-bottom: 8px;">No matching guides found</h3>
        <p style="color: var(--text-muted); font-size: 14px;">Try searching with different keywords like "PDF", "Token", "Hash", or "Color".</p>
      </div>
    </section>

    <!-- Value Pillars Section -->
    <section class="pillars-section">
      <div class="pillars-grid">
        <div class="pillar-card">
          <div class="pillar-icon">🔒</div>
          <h3 class="pillar-title">100% Client-Side Privacy</h3>
          <p class="pillar-desc">
            All algorithms execute inside your local device thread. PDFs, authentication secrets, and sensitive documents never touch an external server socket.
          </p>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">⚡</div>
          <h3 class="pillar-title">Instant Zero-Latency Execution</h3>
          <p class="pillar-desc">
            Powered by WebAssembly and native Web Crypto APIs. No cold starts, network roundtrips, or upload bandwidth limits.
          </p>
        </div>
        <div class="pillar-card">
          <div class="pillar-icon">📶</div>
          <h3 class="pillar-title">Offline PWA Architecture</h3>
          <p class="pillar-desc">
            Service Worker caching allows you to install OmniTool Hub as a desktop or mobile application that operates seamlessly without internet.
          </p>
        </div>
      </div>
    </section>

    <!-- SEO FAQ Section -->
    <section class="faq-section">
      <h2 class="faq-heading">Frequently Asked Questions</h2>
      
      <div class="faq-item">
        <h3 class="faq-question">What makes OmniTool Hub different from other online tools?</h3>
        <p class="faq-answer">
          Every tool in OmniTool Hub runs 100% inside your browser memory using modern WebAssembly, Web Crypto, and Canvas APIs. Unlike standard tool sites, your files, tokens, and data are NEVER uploaded to an external server.
        </p>
      </div>

      <div class="faq-item">
        <h3 class="faq-question">Can I use OmniTool Hub guides and utilities offline?</h3>
        <p class="faq-answer">
          Yes! OmniTool Hub is built as a Progressive Web App (PWA) with full service worker caching. You can install it on your device and use every utility without an active internet connection.
        </p>
      </div>

      <div class="faq-item">
        <h3 class="faq-question">Are there limits on file sizes or daily usage?</h3>
        <p class="faq-answer">
          No artificial limits. Because computation is done locally on your machine, you can process files as large as your device's RAM allows with zero usage throttling.
        </p>
      </div>

      <div class="faq-item">
        <h3 class="faq-question">How can I host or deploy OmniTool Hub myself?</h3>
        <p class="faq-answer">
          Because OmniTool Hub is a 100% static client-side web application, it can be hosted on any web server including Hostinger shared hosting (LiteSpeed/Apache), Vercel, Netlify, or GitHub Pages with zero backend setup.
        </p>
      </div>
    </section>
  </main>

  <!-- Hub Footer -->
  <footer class="hub-footer">
    <p>&copy; 2026 OmniTool Hub. The Ultimate Offline-First Client-Side Utility Suite.</p>
    <p style="margin-top: 10px;">
      <a href="../index.html">Main Suite</a> &bull;
      <a href="../index.html#plans">Membership Plans</a> &bull;
      <a href="../index.html#privacy">Privacy Policy</a> &bull;
      <a href="../index.html#terms">Terms of Service</a> &bull;
      <a href="https://github.com/Ravik0892/Tools" target="_blank" rel="noopener">GitHub Repository</a>
    </p>
  </footer>

  <!-- Instant Search & Category Filter Script -->
  <script>
    (function () {
      const searchInput = document.getElementById('hub-search');
      const clearBtn = document.getElementById('clear-search-btn');
      const cards = document.querySelectorAll('.guide-card');
      const filterBtns = document.querySelectorAll('.filter-btn');
      const noResults = document.getElementById('no-results');
      let currentCategory = 'all';

      function filterGuides() {
        const q = (searchInput.value || '').toLowerCase().trim();
        let matchCount = 0;

        clearBtn.style.display = q.length > 0 ? 'block' : 'none';

        cards.forEach(card => {
          const cat = card.getAttribute('data-category') || '';
          const title = card.getAttribute('data-title') || '';
          const tag = card.getAttribute('data-tag') || '';
          const desc = card.getAttribute('data-desc') || '';

          const matchesCat = (currentCategory === 'all' || cat === currentCategory);
          const matchesQuery = (!q || title.includes(q) || tag.includes(q) || desc.includes(q));

          if (matchesCat && matchesQuery) {
            card.style.display = 'flex';
            matchCount++;
          } else {
            card.style.display = 'none';
          }
        });

        noResults.style.display = matchCount === 0 ? 'block' : 'none';
      }

      searchInput.addEventListener('input', filterGuides);

      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterGuides();
        searchInput.focus();
      });

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          currentCategory = btn.getAttribute('data-filter') || 'all';
          filterGuides();
        });
      });

      // Keyboard shortcut (/) to focus search
      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
      });
    })();
  </script>
</body>
</html>
`;
};

// Paths to write
const projectRoot = path.join(__dirname, '..');
const guidesDirRoot = path.join(projectRoot, 'guides');
const androidGuidesDir = path.join(projectRoot, 'omnitool-android-app', 'app', 'src', 'main', 'assets', 'web', 'guides');

// Create directories if they don't exist
fs.mkdirSync(guidesDirRoot, { recursive: true });
fs.mkdirSync(androidGuidesDir, { recursive: true });

let count = 0;
for (const tool of toolsData) {
  const content = template(tool, toolsData);
  
  // Write to root guides
  fs.writeFileSync(path.join(guidesDirRoot, tool.fileName), content, 'utf8');
  
  // Write to Android mirror guides
  fs.writeFileSync(path.join(androidGuidesDir, tool.fileName), content, 'utf8');
  
  console.log(`Generated guide for: ${tool.id} -> ${tool.fileName}`);
  count++;
}

// Generate Master Guides & Documentation Hub
const hubContent = generateGuidesHub(toolsData);
fs.writeFileSync(path.join(guidesDirRoot, 'index.html'), hubContent, 'utf8');
fs.writeFileSync(path.join(androidGuidesDir, 'index.html'), hubContent, 'utf8');
console.log('Generated master Guides Hub: guides/index.html');

console.log(`Successfully generated ${count} static HTML blog posts / guides and master index.`);

