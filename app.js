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
      id: "json-formatter",
      name: "JSON Formatter & Validator",
      desc: "Beautify, validate, minify, and parse raw JSON strings instantly with error highlighting.",
      category: "dev",
      subcategory: "dev-formatters",
      subLabel: "Formatters & Parsers",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6L2 12l6 6M12 2v20" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
      id: "base64",
      name: "Base64 Encoder & Decoder",
      desc: "Encode plain text to Base64 format or decode Base64 back into human-readable text.",
      category: "dev",
      subcategory: "dev-encoders",
      subLabel: "Encoders & Decoders",
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
      id: "hash-generator",
      name: "Hash Generator",
      desc: "Generate MD5, SHA-1, SHA-256, and SHA-512 cryptographic checksums instantly.",
      category: "dev",
      subcategory: "dev-crypto",
      subLabel: "Crypto & Security",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      icon: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`
    },
    {
      id: "aes-crypto",
      name: "AES Symmetric Encryptor & Decryptor",
      desc: "Securely encrypt plain text or decrypt ciphertext locally in your browser using high-strength AES-GCM 256-bit keys derived via PBKDF2.",
      category: "dev",
      subcategory: "dev-crypto",
      subLabel: "Crypto & Security",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4M12 15v3"></path></svg>`
    },
    {
      id: "url-encoder",
      name: "URL Encoder & Decoder",
      desc: "Encode strings to safe URL characters or decode encoded web addresses back.",
      category: "dev",
      subcategory: "dev-encoders",
      subLabel: "Encoders & Decoders",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      icon: `<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke-linecap="round"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke-linecap="round"/></svg>`
    },
    {
      id: "uuid-generator",
      name: "UUID v4 Generator",
      desc: "Bulk generate RFC 4122 compliant universally unique identifiers (UUIDs) client-side.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Generators",
      accent: "#f43f5e",
      accentRgb: "244, 63, 94",
      icon: `<svg viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    },
    {
      id: "text-converter",
      name: "Text Case Converter & Counter",
      desc: "Convert text cases (UPPER, lower, camel, snake, kebab) and count words, lines, characters.",
      category: "text",
      subcategory: "text-case",
      subLabel: "Transformations",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24"><path d="M4 7V4h16v3M9 20h6M12 4v16" stroke-linecap="round" stroke-linejoin="round"/></svg>`
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
      id: "regex-tester",
      name: "Visual Regex Tester",
      desc: "Test regular expressions with flags, highlight matches, and view structured match groups.",
      category: "text",
      subcategory: "text-regex",
      subLabel: "Pattern Analysis",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    },
    {
      id: "gradient-generator",
      name: "CSS Gradient Creator",
      desc: "Visually build linear/radial CSS gradients, adjust angles, positions, and export CSS code.",
      category: "design",
      subcategory: "design-css",
      subLabel: "CSS Builders",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      icon: `<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-10 10c0 5.523 4.477 10 10 10a10 10 0 0 0 10-10c0-1.742-.447-3.38-1.231-4.814l-4.542 4.542a4 4 0 0 1-5.656-5.656l4.542-4.542A9.957 9.957 0 0 0 12 2z" /></svg>`
    },
    {
      id: "color-palette",
      name: "Color Palette & Contrast Checker",
      desc: "Generate harmonious palettes and verify background/foreground text accessibility (WCAG).",
      category: "design",
      subcategory: "design-color",
      subLabel: "Color Management",
      accent: "#f43f5e",
      accentRgb: "244, 63, 94",
      icon: `<svg viewBox="0 0 24 24"><path d="M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22ZM12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6Z" /></svg>`
    },
    {
      id: "password-generator",
      name: "Secure Password Generator",
      desc: "Create strong passwords with custom lengths, character constraints, and entropy meters.",
      category: "math",
      subcategory: "math-security",
      subLabel: "Security & Pass",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4M12 15v3" stroke-linecap="round"/></svg>`
    },
    {
      id: "epoch-converter",
      name: "Epoch Timestamp Converter",
      desc: "Translate Unix epoch timestamps (seconds & milliseconds) to human dates and vice versa.",
      category: "math",
      subcategory: "math-conversion",
      subLabel: "Conversion",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
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
      id: "glassmorphism-generator",
      name: "Frosted Glassmorphism CSS Generator",
      desc: "Visually build cyber-styled CSS backdrop blurs, border glows, shadow layers, and copy ready-to-use CSS.",
      category: "design",
      subcategory: "design-css",
      subLabel: "CSS Builders",
      accent: "#00f2fe",
      accentRgb: "0, 242, 254",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 3v18M3 9h18M14 14l3 3m0-3l-3 3"></path></svg>`
    },
    {
      id: "box-shadow",
      name: "CSS Box Shadow Builder",
      desc: "Visually construct simple and complex box shadows with offsets, blur, spread, color, opacity, and inset controls.",
      category: "design",
      subcategory: "design-css",
      subLabel: "CSS Builders",
      accent: "#10b981",
      accentRgb: "16, 185, 129",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="12" height="12" rx="1.5"></rect><path d="M16 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-2" stroke-dasharray="2 2"></path></svg>`
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
      id: "admin-settings",
      name: "Settings & Ad Control Panel",
      desc: "Manage ad network codes, toggle locations, edit AdSense/AdMob IDs, and clear local caches.",
      category: "dev",
      subcategory: "dev-generators",
      subLabel: "Admin Center",
      accent: "#f59e0b",
      accentRgb: "245, 158, 11",
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>`
    }
  ],

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

    // Run async module loading diagnostics
    this.checkAllModules();
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
    
    this.tools.forEach(tool => {
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
      this.navigateToTool("admin-settings", false);
      return;
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
    document.querySelectorAll(".subnav-link").forEach(link => {
      const filter = link.getAttribute("data-filter");
      if (!filter || filter.endsWith("-all")) return;

      const parentLi = link.parentElement;
      parentLi.classList.add("subnav-item");

      const subList = document.createElement("ul");
      subList.className = "sidebar-sub-tools";

      const matchingTools = this.tools.filter(t => t.subcategory === filter);
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
          <h2>Privacy Policy</h2>
          <p><strong>Effective Date:</strong> June 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> June 2026</p>
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
          <h2>About OmniTool Hub</h2>
          <p>OmniTool Hub is a free, privacy-first, all-in-one utility toolkit built for developers, designers, students, and anyone who needs fast, reliable tools without leaving their browser.</p>

          <h3>Our Mission</h3>
          <p>We believe powerful tools should be free, fast, and private. Every tool on OmniTool Hub runs 100% in your browser — your data never leaves your device, no accounts needed, no tracking, no subscriptions.</p>

          <h3>What We Offer</h3>
          <ul>
            <li>🔧 <strong>Developer Tools:</strong> JSON Formatter, Base64, JWT Decoder, Hash Generator, AES Encryption, URL Encoder, and more</li>
            <li>✍️ <strong>Text & Writing:</strong> Markdown Editor, Case Converter, Word Counter, Regex Tester, Diff Checker</li>
            <li>🎨 <strong>Design & Styling:</strong> Color Picker, Gradient Builder, CSS Generators, QR Code Generator</li>
            <li>🔢 <strong>Math & Converters:</strong> Scientific Calculator, Unit Converter, Password Generator</li>
          </ul>

          <h3>Privacy By Design</h3>
          <p>All tools are built with a "client-side first" architecture. We use no backend servers for tool processing. Your inputs stay in your browser and are never transmitted anywhere.</p>

          <h3>Open & Free</h3>
          <p>OmniTool Hub is free to use for everyone. We support the platform through non-intrusive Google AdSense advertisements.</p>
        `
      },
      contact: {
        title: "Contact Us",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
        content: `
          <h2>Contact Us</h2>
          <p>We'd love to hear from you! Whether you have a question, bug report, feature suggestion, or just want to say hello — reach out to us.</p>

          <h3>General Inquiries</h3>
          <p>For general questions about OmniTool Hub:</p>
          <div class="legal-contact-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            <span>contact@omnitoolhub.com</span>
          </div>

          <h3>Bug Reports & Feature Requests</h3>
          <p>Found a bug or want a new tool added? We review all feedback:</p>
          <div class="legal-contact-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span>support@omnitoolhub.com</span>
          </div>

          <h3>Response Time</h3>
          <p>We typically respond within <strong>2–3 business days</strong>. For urgent issues, please mention "URGENT" in your email subject.</p>

          <h3>Advertising Inquiries</h3>
          <p>For advertising partnerships or sponsorship opportunities:</p>
          <div class="legal-contact-card">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            <span>ads@omnitoolhub.com</span>
          </div>
        `
      },
      terms: {
        title: "Terms of Service",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
        content: `
          <h2>Terms of Service</h2>
          <p><strong>Effective Date:</strong> June 2026</p>
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
          this.navigateToTool("json-formatter");
          const input = document.getElementById("json-input");
          if (input) {
            input.value = clean;
            document.getElementById("json-format-btn")?.click();
          }
        });
        return;
      } catch (e) {}
    }

    // 2. JWT
    if (/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/.test(clean)) {
      this.showToast("Detected JWT. Click to decode payload.", "info", () => {
        this.navigateToTool("jwt-decoder");
        const input = document.getElementById("jwt-input");
        if (input) {
          input.value = clean;
          input.dispatchEvent(new Event("input"));
        }
      });
      return;
    }

    // 3. HEX Color
    if (/^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$/.test(clean)) {
      this.showToast("Detected HEX color. Open Contrast checker?", "info", () => {
        this.navigateToTool("color-palette");
        const input = document.getElementById("contrast-bg-hex");
        if (input) {
          input.value = clean;
          input.dispatchEvent(new Event("input"));
        }
      });
      return;
    }

    // 4. Epoch Timestamp
    if (/^\d{10}$|^\d{13}$/.test(clean)) {
      this.showToast("Detected Epoch Unix Timestamp. Convert to date?", "info", () => {
        this.navigateToTool("epoch-converter");
        const input = document.getElementById("epoch-input");
        if (input) {
          input.value = clean;
          document.getElementById("epoch-convert-btn")?.click();
        }
      });
      return;
    }

    // 5. Base64
    if (clean.length > 8 && /^[a-zA-Z0-9+/=]+$/.test(clean)) {
      try {
        const decoded = atob(clean);
        if (decoded.length > 3 && /[\x00-\x7F]/.test(decoded)) {
          this.showToast("Detected Base64 string. Decode now?", "info", () => {
            this.navigateToTool("base64");
            const input = document.getElementById("base64-input");
            if (input) {
              input.value = clean;
              document.getElementById("base64-decode-btn")?.click();
            }
          });
          return;
        }
      } catch (e) {}
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
    this.cpFiltered = this.tools.filter(t => 
      t.name.toLowerCase().includes(clean) || 
      t.desc.toLowerCase().includes(clean) ||
      t.subLabel.toLowerCase().includes(clean)
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

    grid.innerHTML = "";

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
    const existingAd = document.querySelector("#dashboard-view > .sponsor-ad-block");
    if (existingAd) existingAd.remove();

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
        <div class="tool-card-header">
          <div class="tool-icon-wrapper">
            ${tool.icon}
          </div>
          <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" data-tool="${tool.id}" title="Toggle Favorite">
            <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </button>
        </div>
        <div class="tool-card-body">
          <h3>${tool.name}</h3>
          <p>${tool.desc}</p>
        </div>
        <div class="tool-card-footer">
          <span class="tool-badge">${tool.subLabel.toUpperCase()}</span>
          <span style="font-weight: 500;">Launch &rarr;</span>
        </div>
      `;

      card.querySelector(".card-fav-btn").addEventListener("click", (e) => {
        this.toggleFavorite(tool.id, e);
      });

      container.appendChild(card);
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
    if (toolId === "admin-settings" && sessionStorage.getItem("omnitool_admin_authenticated") !== "true") {
      this.activeTool = "admin-settings";
      this.syncSidebarUI();
      
      const titleEl = document.getElementById("header-view-title");
      if (titleEl) {
        titleEl.innerText = "Developer Tools / Settings & Ad Control Panel";
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
          this.navigateToTool(toolId, false);
        } else {
          this.showToast("Invalid passcode! Access Denied.", "error");
          input.value = "";
          input.focus();
        }
      });
      return;
    }

    try {
      const isLocalhost = window.location.hostname === "localhost" || 
                          window.location.hostname === "127.0.0.1" || 
                          window.location.hostname === "127.0.0.1.nip.io" ||
                          window.location.hostname === "host.docker.internal";
      const cacheBust = isLocalhost ? `?t=${Date.now()}` : '';
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

      // Append sponsor bar below tool contents
      const toolAdHtml = this.getAdHtml("tool");
      if (toolAdHtml) {
        const sponsorBar = document.createElement("div");
        sponsorBar.className = "tool-sponsor-bar";
        sponsorBar.innerHTML = toolAdHtml;
        viewport.appendChild(sponsorBar);
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
      }
      
      // Initialize tool module
      await toolInstance.init(viewport, this);
    } catch (err) {
      console.error(`Error loading tool ID: ${toolId}`, err);
      this.showToast("Failed to load tool module!", "error");
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
  }
};

// Start application
window.addEventListener("DOMContentLoaded", () => {
  app.init();
});
