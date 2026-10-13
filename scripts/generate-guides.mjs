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
  }
];

const template = (tool) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${tool.title}</title>
  <meta name="description" content="${tool.description}">
  
  <!-- Typography & Icons -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --bg-app: #07090e;
      --bg-card: rgba(18, 24, 38, 0.6);
      --border-color: rgba(255, 255, 255, 0.06);
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      --accent-cyan: #00f2fe;
      --accent-purple: #9d4edd;
      --accent-emerald: #10b981;
      --font-sans: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-app);
      color: var(--text-main);
      font-family: var(--font-sans);
      line-height: 1.6;
      padding: 40px 20px;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 40px;
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }

    header {
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 24px;
      margin-bottom: 32px;
      text-align: center;
    }

    h1 {
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 12px;
      letter-spacing: -0.5px;
    }

    .meta {
      font-size: 13px;
      color: var(--text-muted);
      display: flex;
      justify-content: center;
      gap: 16px;
    }

    .meta-tag {
      background: rgba(255, 255, 255, 0.04);
      padding: 4px 10px;
      border-radius: 20px;
      border: 1px solid var(--border-color);
    }

    article h2 {
      font-size: 22px;
      font-weight: 700;
      margin-top: 32px;
      margin-bottom: 16px;
      color: var(--text-main);
      border-left: 3px solid var(--accent-cyan);
      padding-left: 12px;
    }

    article p {
      margin-bottom: 18px;
      color: var(--text-muted);
      font-size: 15px;
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
      border-radius: 8px;
      padding: 16px;
      margin: 24px 0;
    }

    .info-box strong {
      color: var(--accent-cyan);
      display: block;
      margin-bottom: 6px;
    }

    .tab-section {
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid var(--border-color);
      border-radius: 8px;
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
    }

    .cta-container {
      text-align: center;
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid var(--border-color);
    }

    .cta-btn {
      display: inline-block;
      background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple));
      color: #000;
      font-weight: 800;
      font-size: 16px;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 8px;
      box-shadow: 0 4px 15px rgba(0, 242, 254, 0.3);
      transition: all 0.2s ease;
    }

    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 242, 254, 0.5);
      color: #fff;
    }

    .back-home {
      display: inline-block;
      margin-top: 24px;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 13px;
      transition: color 0.2s;
    }

    .back-home:hover {
      color: var(--accent-cyan);
    }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <h1>${tool.h1}</h1>
      <div class="meta">
        <span class="meta-tag">📅 June 2026</span>
        <span class="meta-tag">🔒 100% Offline-Safe</span>
        <span class="meta-tag">🛠️ ${tool.tag}</span>
      </div>
    </header>

    <article>
      <p>
        ${tool.leadParagraph}
      </p>

      <h2>${tool.tabsTitle}</h2>
      <p>
        Here is a detailed breakdown of the features and configurations available within this tool suite:
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

      <h2>How to Use the Tool</h2>
      <ol>
        ${tool.steps.map(step => `<li>${step}</li>`).join('')}
      </ol>
    </article>

    <div class="cta-container">
      <a href="${tool.ctaHref}" class="cta-btn">🚀 ${tool.ctaLabel}</a>
      <br>
      <a href="../index.html" class="back-home">← Back to Dashboard</a>
    </div>
  </div>

</body>
</html>
`;

// Paths to write
const projectRoot = path.join(__dirname, '..');
const guidesDirRoot = path.join(projectRoot, 'guides');
const androidGuidesDir = path.join(projectRoot, 'omnitool-android-app', 'app', 'src', 'main', 'assets', 'web', 'guides');

// Create directories if they don't exist
fs.mkdirSync(guidesDirRoot, { recursive: true });
fs.mkdirSync(androidGuidesDir, { recursive: true });

let count = 0;
for (const tool of toolsData) {
  const content = template(tool);
  
  // Write to root guides
  fs.writeFileSync(path.join(guidesDirRoot, tool.fileName), content, 'utf8');
  
  // Write to Android mirror guides
  fs.writeFileSync(path.join(androidGuidesDir, tool.fileName), content, 'utf8');
  
  console.log(`Generated guide for: ${tool.id} -> ${tool.fileName}`);
  count++;
}

console.log(`Successfully generated ${count} static HTML blog posts / guides.`);
