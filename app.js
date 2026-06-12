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
    }
  ],

  // State variables
  activeCategory: "all",      // 'all', 'fav'
  activeSubcategory: "all",   // 'all', or specific like 'dev-formatters'
  activeTool: null,
  favorites: new Set(),
  recents: [],
  
  // Command Palette states
  cpOpen: false,
  cpIndex: 0,
  cpFiltered: [],

  // Initializer
  init() {
    this.registerServiceWorker();
    this.loadFavorites();
    this.loadRecents();
    this.renderFavoritesCount();
    this.initClock();
    this.initTheme();
    this.bindEvents();
    this.renderDashboard();
    
    // Pre-load utilities for pipeline builder integration and global helpers
    import('./tools/utils.js').catch(err => console.error("Failed to pre-load utils:", err));
  },

  registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("sw.js").then(
          (reg) => console.log("[PWA] Service Worker registered with scope: ", reg.scope),
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
    const el = document.getElementById("fav-count");
    if (el) {
      if (this.favorites.size > 0) {
        el.innerText = this.favorites.size;
        el.style.display = "inline-block";
      } else {
        el.style.display = "none";
      }
    }
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
    const container = document.getElementById("recent-tools-box");
    if (!container) return;
    
    if (this.recents.length === 0) {
      container.innerHTML = `<span class="recent-link" style="font-size: 12px; color: var(--text-muted); cursor: default; padding-left: 8px;">No tools visited yet</span>`;
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
  },

  bindEvents() {
    // Top-Level Navigation links (Dashboard, Favorites)
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const cat = link.getAttribute("data-category");
        this.selectCategory(cat);
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

    // Sidebar Toggles
    const openBtn = document.getElementById("sidebar-open-btn");
    const closeBtn = document.getElementById("sidebar-close-btn");
    const sidebar = document.getElementById("app-sidebar");
    
    if (openBtn && sidebar) openBtn.addEventListener("click", () => sidebar.classList.add("show"));
    if (closeBtn && sidebar) closeBtn.addEventListener("click", () => sidebar.classList.remove("show"));

    // Quick Search Input
    document.getElementById("tool-search")?.addEventListener("input", (e) => {
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
    const saved = localStorage.getItem("omnitool_theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    this.updateThemeUI(saved);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const target = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", target);
    localStorage.setItem("omnitool_theme", target);
    this.updateThemeUI(target);
    this.showToast(`Switched to ${target} theme`, "info");
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

  // Clock Widget
  initClock() {
    const clockEl = document.getElementById("clock-text");
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      if (clockEl) clockEl.innerText = `${hrs}:${mins}:${secs}`;
    };
    updateTime();
    setInterval(updateTime, 1000);
  },

  // Navigation Filter updates
  selectCategory(category) {
    this.activeCategory = category;
    this.activeSubcategory = "all";

    // Close all collapsible accordion panels and deselect active subnav links
    document.querySelectorAll(".accordion-item").forEach(item => {
      item.classList.remove("open");
      const content = item.querySelector(".accordion-content");
      if (content) content.style.display = "none";
    });
    document.querySelectorAll(".subnav-link").forEach(l => l.classList.remove("active"));

    // Close sidebar on mobile
    const sidebar = document.getElementById("app-sidebar");
    if (sidebar) sidebar.classList.remove("show");

    // Clear search bar
    const searchBar = document.getElementById("tool-search");
    if (searchBar) searchBar.value = "";

    // Toggle active stylesheet class for main nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      if (link.getAttribute("data-category") === category) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    const titleEl = document.getElementById("header-view-title");
    if (titleEl) titleEl.innerText = this.getCategoryLabel(category);

    this.backToDashboard();
    this.renderDashboard();
  },

  selectSubcategory(filter) {
    this.activeCategory = "subcategory-filter";
    this.activeSubcategory = filter;

    // Close mobile drawer
    const sidebar = document.getElementById("app-sidebar");
    if (sidebar) sidebar.classList.remove("show");

    // Clear search
    const searchBar = document.getElementById("tool-search");
    if (searchBar) searchBar.value = "";

    const titleEl = document.getElementById("header-view-title");
    if (titleEl) {
      titleEl.innerText = this.getSubcategoryLabel(filter);
    }

    this.backToDashboard();
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

  // Grouped cards renderer
  renderDashboard() {
    const grid = document.getElementById("tools-card-grid");
    if (!grid) return;

    grid.innerHTML = "";

    // Handle Favorites flat display
    if (this.activeCategory === "fav") {
      const favTools = this.tools.filter(t => this.favorites.has(t.id));
      this.renderToolsList(grid, favTools);
      return;
    }

    // Filter tools based on selections
    let activeList = [];
    if (this.activeCategory === "all") {
      activeList = this.tools;
    } else if (this.activeCategory === "subcategory-filter") {
      if (this.activeSubcategory.endsWith("-all")) {
        const catPrefix = this.activeSubcategory.split("-")[0];
        activeList = this.tools.filter(t => t.category === catPrefix);
      } else {
        activeList = this.tools.filter(t => t.subcategory === this.activeSubcategory);
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
    const shouldGroup = (this.activeCategory === "all" || this.activeSubcategory.endsWith("-all"));
    
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

  async navigateToTool(toolId) {
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

    try {
      const module = await import('./tools/' + toolId + '.js');
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

  backToDashboard() {
    const viewport = document.getElementById("active-tool-viewport");
    if (viewport) {
      viewport.style.display = "none";
      viewport.innerHTML = "";
    }

    const dashboard = document.getElementById("dashboard-view");
    if (dashboard) dashboard.style.display = "block";

    this.activeTool = null;

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

    navigator.clipboard.writeText(text).then(
      () => this.showToast("Copied to clipboard!", "success"),
      () => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          this.showToast("Copied to clipboard!", "success");
        } catch (err) {
          this.showToast("Failed to copy", "error");
        }
        document.body.removeChild(textarea);
      }
    );
  }
};

// Start application
window.addEventListener("DOMContentLoaded", () => {
  app.init();
});
