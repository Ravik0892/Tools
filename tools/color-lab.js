import { escapeHtml } from './utils.js';

export default {
  id: "color-lab",
  name: "Color Lab & Contrast Suite",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Inputs (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Configuration</h3>
            <!-- Tabs inside config panel -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 440px; margin-left: 15px;" id="color-lab-tabs">
              <button class="keyboard-tab active" data-tab="palette" style="font-size: 11px; padding: 4px 8px;">Palette Generator</button>
              <button class="keyboard-tab" data-tab="shades" style="font-size: 11px; padding: 4px 8px;">Shades & Tints</button>
              <button class="keyboard-tab" data-tab="extract" style="font-size: 11px; padding: 4px 8px;">Extract from Image</button>
            </div>
          </div>

          <!-- Tab 1: Palette Generator Controls -->
          <div id="panel-palette-controls" class="tab-control-panel">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label style="margin: 0;">Harmonious Swatches</label>
              <div style="display: flex; gap: 6px;">
                <button class="tool-btn secondary" id="palette-add-btn" style="font-size: 11px; padding: 4px 8px;">+ Add Color</button>
                <button class="tool-btn primary" id="palette-generate-btn" style="font-size: 11px; padding: 4px 8px;">Generate</button>
              </div>
            </div>
            
            <div class="form-group" style="margin-bottom: 8px;">
              <label>Number of Colors</label>
              <div class="slider-group">
                <input type="range" id="palette-count" class="slider-input" min="2" max="10" value="5">
                <span class="slider-val" id="palette-count-val">5</span>
              </div>
            </div>
            <div class="form-group" style="margin-bottom: 12px;">
              <label for="palette-type">Generation Harmony</label>
              <select class="form-select" id="palette-type" style="width: 100%;">
                <option value="analogous" selected>Analogous (Harmonious)</option>
                <option value="monochromatic">Monochromatic (Gradated)</option>
                <option value="complementary">Complementary (High Contrast)</option>
                <option value="split">Split-Complementary</option>
                <option value="triadic">Triadic (Vibrant Balance)</option>
                <option value="tetradic">Tetradic (Double Complementary)</option>
                <option value="mixed">Mixed Theories (All Combined)</option>
                <option value="random">Random (Diverse & Vibrant)</option>
                <option value="pastel">Soft Pastels (Modern & Clean)</option>
                <option value="cyber">Cyberpunk Neon (Accent UI)</option>
              </select>
            </div>
            <div class="form-group" style="margin-bottom: 12px; flex-direction: row; align-items: center; gap: 8px; display: flex;">
              <input type="checkbox" id="palette-use-shape-chk" style="width: 14px; height: 14px; cursor: pointer; margin: 0;">
              <label for="palette-use-shape-chk" style="margin: 0; cursor: pointer; user-select: none; font-size: 11px; color: var(--text-muted);">Use CSS Studio Clip-Path Shape</label>
            </div>
            <div class="form-row" style="margin-bottom: 12px;">
              <button class="tool-btn secondary" id="palette-save-btn" style="width: 100%; justify-content: center; gap: 8px;">
                <span>⭐ Save Palette</span>
              </button>
            </div>
            <p style="font-size: 11px; color: var(--text-muted); margin: 0 0 8px 0;">Click color square to pick, hex to copy, or set as Text/Bg for the WCAG test.</p>
            <div class="palette-swatches" id="palette-swatches-box">
              <!-- Dynamic Swatches -->
            </div>
            <div class="form-group" style="margin-top: 15px; border-top: 1px solid var(--border-color); padding-top: 12px;">
              <label>Saved Palettes</label>
              <div class="palette-presets-grid" id="palette-presets-box" style="margin-top: 6px;">
                <!-- Saved custom palettes -->
              </div>
            </div>
          </div>

          <!-- Tab 2: Shades Base Controls -->
          <div id="panel-shades-controls" class="tab-control-panel hidden">
            <div class="form-group" style="margin-bottom: 12px;">
              <label>Base Color</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="color" id="shades-color-picker" value="#3a86c8" style="border: none; background: none; width: 44px; height: 44px; cursor: pointer; padding: 0;">
                <input type="text" id="shades-color-input" class="form-input" value="#3A86C8" style="flex: 1; font-family: var(--font-mono); text-transform: uppercase;" placeholder="#HEX / rgb() / hsl()" aria-label="Base Color Input">
              </div>
            </div>

            <div class="form-group" style="margin-bottom: 12px;">
              <label for="shades-format">Output Format</label>
              <select class="form-select" id="shades-format" style="width: 100%;">
                <option value="hex" selected>HEX (e.g. #3A86C8)</option>
                <option value="rgb">RGB (e.g. rgb(58, 134, 200))</option>
                <option value="hsl">HSL (e.g. hsl(208, 55%, 51%))</option>
              </select>
            </div>

            <div class="form-group">
              <label>Quick Neon & Brand Presets</label>
              <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
                <button class="tool-btn secondary shades-preset-btn" data-color="#00F2FE" style="border-left: 3px solid #00F2FE; font-size: 11px; padding: 4px 8px;">Cyan</button>
                <button class="tool-btn secondary shades-preset-btn" data-color="#FF007F" style="border-left: 3px solid #FF007F; font-size: 11px; padding: 4px 8px;">Pink</button>
                <button class="tool-btn secondary shades-preset-btn" data-color="#9D4EDD" style="border-left: 3px solid #9D4EDD; font-size: 11px; padding: 4px 8px;">Purple</button>
                <button class="tool-btn secondary shades-preset-btn" data-color="#39FF14" style="border-left: 3px solid #39FF14; font-size: 11px; padding: 4px 8px;">Green</button>
                <button class="tool-btn secondary shades-preset-btn" data-color="#F59E0B" style="border-left: 3px solid #F59E0B; font-size: 11px; padding: 4px 8px;">Amber</button>
                <button class="tool-btn secondary shades-preset-btn" data-color="#F43F5E" style="border-left: 3px solid #F43F5E; font-size: 11px; padding: 4px 8px;">Rose</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Previews & Results (Right Panel) -->
        <div class="tool-panel" style="flex: 1.5;">
          <!-- 1. WCAG Contrast Checker Panel (Visible under Palette) -->
          <div id="output-palette-panel" style="display: flex; flex-direction: column; gap: 15px; height: 100%;">
            <div class="panel-header" style="padding: 0 0 8px 0; border-bottom: 1px solid var(--border-color);">
              <h3>WCAG Contrast Ratio Checker</h3>
            </div>
            
            <div class="form-row" style="gap: 12px;">
              <div class="form-group" style="flex: 1;">
                <label for="contrast-fg">Text Color</label>
                <div style="display: flex; gap: 6px;">
                  <input type="color" id="contrast-fg" value="#ffffff" style="border: none; background: none; width: 34px; height: 34px; cursor: pointer; padding: 0;">
                  <input type="text" id="contrast-fg-hex" class="form-input" value="#FFFFFF" style="flex: 1; font-family: var(--font-mono); text-transform: uppercase;" aria-label="Foreground Hex Code">
                </div>
              </div>
              <div class="form-group" style="flex: 1;">
                <label for="contrast-bg">Background Color</label>
                <div style="display: flex; gap: 6px;">
                  <input type="color" id="contrast-bg" value="#9d4edd" style="border: none; background: none; width: 34px; height: 34px; cursor: pointer; padding: 0;">
                  <input type="text" id="contrast-bg-hex" class="form-input" value="#9D4EDD" style="flex: 1; font-family: var(--font-mono); text-transform: uppercase;" aria-label="Background Hex Code">
                </div>
              </div>
            </div>

            <div class="gradient-visualizer" id="contrast-preview-screen" style="height: 90px; display: flex; flex-direction: column; gap: 4px; justify-content: center; align-items: center; border-radius: 8px; border: 1px solid var(--border-color);">
              <span id="contrast-preview-text" style="font-size: 14px; font-weight: 500;">Sample Text (Standard Size)</span>
              <span id="contrast-preview-text-large" style="font-size: 18px; font-weight: 700;">Large Text Preview</span>
            </div>

            <div class="form-row" style="grid-template-columns: repeat(3, 1fr); gap: 8px;">
              <div class="tool-badge" style="padding: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div style="font-size: 9px; color: var(--text-muted);">Contrast Ratio</div>
                <div style="font-size: 18px; font-weight: 800; color: var(--accent-cyan); margin-top: 2px;" id="contrast-ratio-value">4.5:1</div>
              </div>
              <div class="tool-badge" style="padding: 6px; display: flex; flex-direction: column; gap: 4px;">
                <div style="font-size: 9px; color: var(--text-muted); text-align: center; text-transform: uppercase;">Normal Text</div>
                <div style="display: flex; justify-content: space-around;">
                  <span class="contrast-badge pass" id="wcag-normal-aa" style="padding: 2px 6px; font-size: 9px;">AA</span>
                  <span class="contrast-badge pass" id="wcag-normal-aaa" style="padding: 2px 6px; font-size: 9px;">AAA</span>
                </div>
              </div>
              <div class="tool-badge" style="padding: 6px; display: flex; flex-direction: column; gap: 4px;">
                <div style="font-size: 9px; color: var(--text-muted); text-align: center; text-transform: uppercase;">Large Text</div>
                <div style="display: flex; justify-content: space-around;">
                  <span class="contrast-badge pass" id="wcag-large-aa" style="padding: 2px 6px; font-size: 9px;">AA</span>
                  <span class="contrast-badge pass" id="wcag-large-aaa" style="padding: 2px 6px; font-size: 9px;">AAA</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Shades Swatches Matrix (Visible under Shades) -->
          <div id="output-shades-panel" class="hidden" style="display: flex; flex-direction: column; gap: 12px; height: 100%;">
            <div class="panel-header" style="padding: 0 0 8px 0; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
              <h3>Generated Swatches</h3>
              <span style="font-size: 11px; color: var(--text-muted);">Click card to copy</span>
            </div>

            <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px;">
              <button class="shades-tab-btn active" data-tab="tints" style="flex: 1; text-align: center; font-size: 11px; padding: 6px 4px; border: none; background: transparent; cursor: pointer; color: var(--text-muted); border-bottom: 2px solid transparent;">Tints (Lighter)</button>
              <button class="shades-tab-btn" data-tab="shades" style="flex: 1; text-align: center; font-size: 11px; padding: 6px 4px; border: none; background: transparent; cursor: pointer; color: var(--text-muted); border-bottom: 2px solid transparent;">Shades (Darker)</button>
              <button class="shades-tab-btn" data-tab="opacities" style="flex: 1; text-align: center; font-size: 11px; padding: 6px 4px; border: none; background: transparent; cursor: pointer; color: var(--text-muted); border-bottom: 2px solid transparent;">Opacities (Alpha)</button>
            </div>

            <div style="flex: 1; overflow-y: auto; max-height: 280px; padding-right: 4px;">
              <!-- Tints Grid -->
              <div id="shades-tab-tints" class="shades-content-pane">
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(95px, 1fr)); gap: 8px;" id="tints-grid"></div>
              </div>
              <!-- Shades Grid -->
              <div id="shades-tab-shades" class="shades-content-pane hidden">
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(95px, 1fr)); gap: 8px;" id="shades-grid"></div>
              </div>
              <!-- Opacities Grid -->
              <div id="shades-tab-opacities" class="shades-content-pane hidden">
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(95px, 1fr)); gap: 8px;" id="opacities-grid"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 3: Extract from Image Container -->
        <div id="panel-extract-container" class="tab-control-panel hidden" style="grid-column: 1 / -1; border: none; padding-top: 0; margin-top: 0;"></div>

        <!-- Quick Guide (Bottom) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="color-guide-title">Quick Guide: Color Palette & Contrast Checker</span>
            </div>
            <button class="tool-btn secondary" id="color-load-sample" style="font-size: 11px;">Load Sample</button>
          </div>
          <div class="tool-guide-steps" id="color-guide-steps">
            <!-- Populated dynamically by JS -->
          </div>
        </div>
      </div>

      <style>
        .keyboard-tab {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
          text-align: center;
        }
        .keyboard-tab:hover, .keyboard-tab.active {
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
          border-color: rgba(0, 242, 254, 0.3);
          box-shadow: 0 0 8px rgba(0, 242, 254, 0.1);
        }
        .tab-control-panel {
          margin-top: 12px;
          border-top: 1px solid var(--border-color);
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tab-control-panel.hidden {
          display: none !important;
        }
        .shades-tab-btn.active {
          color: var(--accent-cyan) !important;
          border-bottom-color: var(--accent-cyan) !important;
          font-weight: 700;
        }
        .shades-content-pane.hidden {
          display: none !important;
        }
        /* Custom Swatch styling */
        .swatch-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px 8px;
          gap: 8px;
          justify-content: center;
          text-align: center;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
        }
        .swatch-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        .swatch-color-box {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          position: relative;
          cursor: pointer;
          transition: transform 0.15s;
        }
        .swatch-color-box:hover {
          transform: scale(1.05);
        }
        .swatch-native-picker {
          position: absolute;
          opacity: 0;
          top: 0; left: 0; width: 100%; height: 100%;
          cursor: pointer;
        }
      </style>
    `;
  },
  init(container, appInstance) {
    appInstance.colorLabState = appInstance.colorLabState || {
      currentColors: [],
      useSharedClipPath: false
    };
    const tabs = container.querySelectorAll("#color-lab-tabs .keyboard-tab");
    const panelPalette = container.querySelector("#panel-palette-controls");
    const panelShades = container.querySelector("#panel-shades-controls");
    const outputPalette = container.querySelector("#output-palette-panel");
    const outputShades = container.querySelector("#output-shades-panel");

    const guideTitle = container.querySelector("#color-guide-title");
    const guideSteps = container.querySelector("#color-guide-steps");

    const initialTab = appInstance.activeSubtab || 'palette';
    appInstance.activeSubtab = null;
    let activeTab = initialTab;

    const guides = {
      palette: {
        title: "Quick Guide: Color Palette & Contrast Checker",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Generate Palette</strong>: Select swatches quantity and click <strong>Generate</strong>, or add manually.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Contrast Testing</strong>: Assign colors to text (Fg) and background (Bg) variables to run accessibility tests.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Verify Results</strong>: Passing normal AA/AAA standards will light up green PASS badges.</div>
          </div>
        `
      },
      shades: {
        title: "Quick Guide: Color Shades & Tint Generator",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Choose Base</strong>: Select a color picker input, enter HEX/RGB values, or apply neon quick presets.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Select Output</strong>: Swap output format between HEX, RGB, or HSL formatting.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Copy Swatches</strong>: Click tints, shades, or opacity blocks to copy values instantly.</div>
          </div>
        `
      },
      extract: {
        title: "Quick Guide: Image Color Palette Extractor & Eyedropper",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Upload Image</strong>: Drop photo/graphic, browse, or paste with Ctrl+V.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Eyedropper</strong>: Hover crosshairs over any pixel to inspect color and zoom loupe.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Export Scheme</strong>: Copy HEX codes, CSS variables, or Tailwind color blocks.</div>
          </div>
        `
      }
    };

    const panelExtract = container.querySelector("#panel-extract-container");
    let extractMounted = false;

    const switchTab = async (tabId) => {
      activeTab = tabId;
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));

      const isExtract = (tabId === "extract");
      panelPalette.classList.toggle("hidden", tabId !== "palette");
      panelShades.classList.toggle("hidden", tabId !== "shades");
      outputPalette.classList.toggle("hidden", tabId !== "palette");
      outputShades.classList.toggle("hidden", tabId !== "shades");

      if (panelExtract) {
        panelExtract.classList.toggle("hidden", !isExtract);
        if (isExtract && !extractMounted) {
          extractMounted = true;
          panelExtract.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 280px; gap: 10px; color: var(--text-muted);">
              <div style="width: 28px; height: 28px; border: 3px solid rgba(0,242,254,0.2); border-top-color: var(--accent-cyan); border-radius: 50%; animation: cl-spin 0.8s linear infinite;"></div>
              <span>Mounting color extraction engine...</span>
            </div>
            <style>@keyframes cl-spin { to { transform: rotate(360deg); } }</style>
          `;
          try {
            const mod = await import('./color-extractor.js');
            if (mod && mod.default) {
              panelExtract.innerHTML = mod.default.renderUI();
              if (typeof mod.default.init === "function") {
                mod.default.init(panelExtract, appInstance);
              }
            }
          } catch (e) {
            console.error("Failed to mount color-extractor:", e);
          }
        }
      }

      // Hide left/right config panels when in extract mode so extractor takes full layout
      const leftCol = panelPalette.closest(".tool-panel");
      const rightCol = outputPalette.closest(".tool-panel");
      if (leftCol) leftCol.style.display = isExtract ? "none" : "";
      if (rightCol) rightCol.style.display = isExtract ? "none" : "";

      if (guideTitle && guideSteps && guides[tabId]) {
        guideTitle.innerText = guides[tabId].title;
        guideSteps.innerHTML = guides[tabId].steps;
      }

      if (tabId === "palette") {
        if (typeof verifyAccessibility === "function") verifyAccessibility(false);
      } else if (tabId === "shades") {
        if (typeof renderAllSwatches === "function") renderAllSwatches();
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab));
    });

    switchTab(initialTab);

    // ==========================================
    // PALETTE GENERATOR & CONTRAST
    // ==========================================
    const paletteSwatches = container.querySelector("#palette-swatches-box");
    const cFg = container.querySelector("#contrast-fg");
    const cFgHex = container.querySelector("#contrast-fg-hex");
    const cBg = container.querySelector("#contrast-bg");
    const cBgHex = container.querySelector("#contrast-bg-hex");
    const cPreview = container.querySelector("#contrast-preview-screen");
    const cPreviewTxt = container.querySelector("#contrast-preview-text");
    const cPreviewTxtLg = container.querySelector("#contrast-preview-text-large");
    const cRatio = container.querySelector("#contrast-ratio-value");

    const normalAA = container.querySelector("#wcag-normal-aa");
    const normalAAA = container.querySelector("#wcag-normal-aaa");
    const largeAA = container.querySelector("#wcag-large-aa");
    const largeAAA = container.querySelector("#wcag-large-aaa");

    const paletteTypeSelect = container.querySelector("#palette-type");
    const paletteCountInput = container.querySelector("#palette-count");
    const paletteCountVal = container.querySelector("#palette-count-val");

    let currentColors = appInstance.colorLabState.currentColors.length > 0
      ? appInstance.colorLabState.currentColors
      : [];

    const getPaletteCount = () => {
      return paletteCountInput ? parseInt(paletteCountInput.value, 10) : 5;
    };

    const getLuminance = (hex) => {
      const c = hex.replace("#", "");
      if (c.length !== 6) return 0;
      const r = parseInt(c.substr(0, 2), 16) / 255;
      const g = parseInt(c.substr(2, 2), 16) / 255;
      const b = parseInt(c.substr(4, 2), 16) / 255;

      const a = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    };

    const verifyAccessibility = (skipHexSync = false) => {
      if (!cFg || !cBg) return;
      const fg = cFg.value;
      const bg = cBg.value;

      if (!skipHexSync) {
        if (cFgHex) cFgHex.value = fg.toUpperCase();
        if (cBgHex) cBgHex.value = bg.toUpperCase();
      }

      if (cPreview) cPreview.style.backgroundColor = bg;
      if (cPreviewTxt) cPreviewTxt.style.color = fg;
      if (cPreviewTxtLg) cPreviewTxtLg.style.color = fg;

      const l1 = getLuminance(fg);
      const l2 = getLuminance(bg);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      const ratioRounded = Math.round(ratio * 100) / 100;
      if (cRatio) cRatio.innerText = `${ratioRounded}:1`;

      const setStatusBadge = (el, passed) => {
        if (!el) return;
        el.className = passed ? "contrast-badge pass" : "contrast-badge fail";
        el.innerText = passed ? "PASS" : "FAIL";
      };

      setStatusBadge(normalAA, ratioRounded >= 4.5);
      setStatusBadge(normalAAA, ratioRounded >= 7.0);
      setStatusBadge(largeAA, ratioRounded >= 3.0);
      setStatusBadge(largeAAA, ratioRounded >= 4.5);
    };

    const setAsContrastColor = (hex, target) => {
      if (target === "fg") {
        if (cFg) cFg.value = hex.toLowerCase();
        if (cFgHex) cFgHex.value = hex.toUpperCase();
      } else {
        if (cBg) cBg.value = hex.toLowerCase();
        if (cBgHex) cBgHex.value = hex.toUpperCase();
      }
      verifyAccessibility(false);
      appInstance.showToast(`Set ${hex} as ${target === "fg" ? "Text" : "Bg"} Color`, "success");
    };

    const hslToHex = (hsl) => {
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.fillStyle = hsl;
      return ctx.fillStyle;
    };

    const renderPalette = () => {
      if (!paletteSwatches) return;
      // Sync global state
      appInstance.colorLabState.currentColors = currentColors;
      paletteSwatches.innerHTML = "";

      currentColors.forEach((colorObj, index) => {
        const card = document.createElement("div");
        card.className = "swatch-card";

        const isLocked = colorObj.locked;
        const hex = colorObj.hex;

        const shapeStyle = (appInstance.cssStudioState && appInstance.cssStudioState.sharedClipPath && appInstance.colorLabState.useSharedClipPath)
          ? `clip-path: ${appInstance.cssStudioState.sharedClipPath}; -webkit-clip-path: ${appInstance.cssStudioState.sharedClipPath}; border-radius: 0;`
          : '';

        card.innerHTML = `
          <div class="swatch-color-box" style="background-color: ${hex}; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; ${shapeStyle}">
            <input type="color" class="swatch-native-picker" value="${hex.toLowerCase()}">
          </div>
          <div style="font-family: var(--font-mono); font-size: 12px; font-weight: bold; cursor: pointer; margin: 4px 0; text-align: center;" class="swatch-label-text">${hex}</div>
          
          <div style="display: flex; gap: 4px; align-items: center; justify-content: center; width: 100%;">
            <button class="lock-btn tool-btn secondary" style="padding: 4px 6px; font-size: 10px;">${isLocked ? '🔒' : '🔓'}</button>
            <button class="set-fg-btn tool-btn secondary" style="padding: 4px 6px; font-size: 10px;">Txt</button>
            <button class="set-bg-btn tool-btn secondary" style="padding: 4px 6px; font-size: 10px;">Bg</button>
            <button class="send-shades-btn tool-btn secondary" style="padding: 4px 6px; font-size: 10px;" title="Send to Shades & Tints">↗</button>
            ${currentColors.length > 2 ? `<button class="remove-btn tool-btn secondary" style="padding: 4px 6px; font-size: 10px; color: var(--accent-rose);">✕</button>` : ''}
          </div>
        `;

        const picker = card.querySelector(".swatch-native-picker");
        picker.addEventListener("change", (e) => {
          const newHex = e.target.value.toUpperCase();
          currentColors[index].hex = newHex;
          renderPalette();
          if (index === 0) setAsContrastColor(newHex, "fg");
          else if (index === 1) setAsContrastColor(newHex, "bg");
        });
        picker.addEventListener("input", (e) => {
          const newHex = e.target.value.toUpperCase();
          currentColors[index].hex = newHex;
          card.querySelector(".swatch-color-box").style.backgroundColor = e.target.value;
          card.querySelector(".swatch-label-text").innerText = newHex;
          if (index === 0) {
            if (cFg) cFg.value = e.target.value.toLowerCase();
            if (cFgHex) cFgHex.value = newHex;
            verifyAccessibility(false);
          } else if (index === 1) {
            if (cBg) cBg.value = e.target.value.toLowerCase();
            if (cBgHex) cBgHex.value = newHex;
            verifyAccessibility(false);
          }
        });

        card.querySelector(".lock-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          colorObj.locked = !colorObj.locked;
          renderPalette();
        });

        card.querySelector(".swatch-label-text").addEventListener("click", () => {
          appInstance.copyText(hex);
        });

        card.querySelector(".set-fg-btn").addEventListener("click", () => setAsContrastColor(hex, "fg"));
        card.querySelector(".set-bg-btn").addEventListener("click", () => setAsContrastColor(hex, "bg"));
        
        card.querySelector(".send-shades-btn").addEventListener("click", () => {
          appInstance.copyText(hex);
          const shadesInput = container.querySelector("#shades-color-input");
          const shadesPicker = container.querySelector("#shades-color-picker");
          if (shadesInput && shadesPicker) {
            shadesInput.value = hex;
            shadesPicker.value = hex.toLowerCase();
          }
          appInstance.showToast(`Sent ${hex} to Shades base color! Click here to view.`, "info", () => {
            switchTab("shades");
          });
        });

        const removeBtn = card.querySelector(".remove-btn");
        if (removeBtn) {
          removeBtn.addEventListener("click", () => {
            currentColors.splice(index, 1);
            if (paletteCountInput) {
              paletteCountInput.value = currentColors.length;
              if (paletteCountVal) paletteCountVal.innerText = currentColors.length;
            }
            renderPalette();
          });
        }

        paletteSwatches.appendChild(card);
      });
    };

    const generateNewPalette = () => {
      const count = getPaletteCount();
      const harmonyType = paletteTypeSelect ? paletteTypeSelect.value : "analogous";
      const seedHue = Math.floor(Math.random() * 360);
      const nextColors = [];

      const isDarkBg = Math.random() < 0.5;
      let textL = 50;
      let bgL = 50;
      let ratio = 1;
      let attempts = 0;
      
      const targetContrast = Math.random() < 0.5 ? 4.5 : 7.0;

      while (ratio < targetContrast && attempts < 30) {
        if (isDarkBg) {
          bgL = 5 + Math.floor(Math.random() * 21);    // 5% to 25%
          textL = 70 + Math.floor(Math.random() * 26);  // 70% to 95%
        } else {
          bgL = 75 + Math.floor(Math.random() * 21);   // 75% to 95%
          textL = 5 + Math.floor(Math.random() * 21);    // 5% to 25%
        }
        
        const fgTestHex = hslToHex(`hsl(${seedHue}, 75%, ${textL}%)`);
        const bgTestHex = hslToHex(`hsl(${seedHue}, 75%, ${bgL}%)`);
        const l1 = getLuminance(fgTestHex);
        const l2 = getLuminance(bgTestHex);
        ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        attempts++;
      }

      for (let i = 0; i < count; i++) {
        if (currentColors[i] && currentColors[i].locked) {
          nextColors.push(currentColors[i]);
        } else {
          let hex = "#3A86C8";
          const s = 65 + (i * 7) % 25; // vary saturation slightly to keep colors distinct
          
          if (harmonyType === "analogous") {
            const h = (seedHue + i * 20 + 360) % 360;
            const l = i === 0 ? textL : (i === 1 ? bgL : 35 + (i * 8) % 35);
            hex = hslToHex(`hsl(${h}, ${s}%, ${l}%)`).toUpperCase();
          } else if (harmonyType === "monochromatic") {
            const l = i === 0 ? textL : (i === 1 ? bgL : 25 + (i * 12) % 60);
            hex = hslToHex(`hsl(${seedHue}, ${s}%, ${l}%)`).toUpperCase();
          } else if (harmonyType === "complementary") {
            const isComp = i % 2 !== 0;
            const h = ((isComp ? seedHue + 180 : seedHue) + Math.floor(i / 2) * 15 + 360) % 360;
            const l = i === 0 ? textL : (i === 1 ? bgL : 35 + (i * 9) % 35);
            hex = hslToHex(`hsl(${h}, ${s}%, ${l}%)`).toUpperCase();
          } else if (harmonyType === "split") {
            let h = seedHue;
            if (i % 3 === 1) h = (seedHue + 150) % 360;
            else if (i % 3 === 2) h = (seedHue + 210) % 360;
            h = (h + Math.floor(i / 3) * 15) % 360;
            const l = i === 0 ? textL : (i === 1 ? bgL : 35 + (i * 9) % 35);
            hex = hslToHex(`hsl(${h}, ${s}%, ${l}%)`).toUpperCase();
          } else if (harmonyType === "triadic") {
            const h = (seedHue + (i % 3) * 120 + Math.floor(i / 3) * 15) % 360;
            const l = i === 0 ? textL : (i === 1 ? bgL : 35 + (i * 9) % 35);
            hex = hslToHex(`hsl(${h}, ${s}%, ${l}%)`).toUpperCase();
          } else if (harmonyType === "tetradic") {
            const angles = [0, 90, 180, 270];
            const h = (seedHue + angles[i % 4] + Math.floor(i / 4) * 15) % 360;
            const l = i === 0 ? textL : (i === 1 ? bgL : 35 + (i * 9) % 35);
            hex = hslToHex(`hsl(${h}, ${s}%, ${l}%)`).toUpperCase();
          } else if (harmonyType === "mixed") {
            const angles = [0, 180, 120, 30, 150, 240, 210, 330];
            const h = (seedHue + angles[i % angles.length]) % 360;
            const l = i === 0 ? textL : (i === 1 ? bgL : 35 + (i * 9) % 35);
            hex = hslToHex(`hsl(${h}, ${s}%, ${l}%)`).toUpperCase();
          } else if (harmonyType === "random") {
            const h = (seedHue + (i * (360 / count)) + 360) % 360;
            const l = i === 0 ? textL : (i === 1 ? bgL : 35 + (i * 9) % 35);
            hex = hslToHex(`hsl(${h}, ${s}%, ${l}%)`).toUpperCase();
          } else if (harmonyType === "pastel") {
            const h = (seedHue + i * 35) % 360;
            const pastelS = 30 + (i * 5) % 15;
            const l = i === 0 ? textL : (i === 1 ? bgL : 80 + (i % 3) * 6);
            hex = hslToHex(`hsl(${h}, ${pastelS}%, ${l}%)`).toUpperCase();
          } else if (harmonyType === "cyber") {
            const cyberSets = [
              ["#00F2FE", "#12131C", "#9D4EDD", "#FF007F", "#FFFFFF"],
              ["#FF007F", "#0B0C10", "#7928CA", "#00FF87", "#F0F0F0"],
              ["#39FF14", "#111827", "#00FF87", "#00E5FF", "#FFFFFF"]
            ];
            const set = cyberSets[seedHue % cyberSets.length];
            hex = set[i % set.length].toUpperCase();
          }
          nextColors.push({ hex, locked: false });
        }
      }

      currentColors = nextColors;
      renderPalette();

      if (currentColors.length >= 2) {
        const fgHex = currentColors[0].hex;
        const bgHex = currentColors[1].hex;
        if (cFg) cFg.value = fgHex.toLowerCase();
        if (cFgHex) cFgHex.value = fgHex.toUpperCase();
        if (cBg) cBg.value = bgHex.toLowerCase();
        if (cBgHex) cBgHex.value = bgHex.toUpperCase();
        verifyAccessibility(false);
      }
    };

    const adjustPaletteSize = (targetSize) => {
      if (currentColors.length === targetSize) return;

      if (currentColors.length > targetSize) {
        let diff = currentColors.length - targetSize;
        for (let i = currentColors.length - 1; i >= 0 && diff > 0; i--) {
          if (!currentColors[i].locked) {
            currentColors.splice(i, 1);
            diff--;
          }
        }
        while (diff > 0 && currentColors.length > 0) {
          currentColors.pop();
          diff--;
        }
      } else {
        const countToAdd = targetSize - currentColors.length;
        for (let i = 0; i < countToAdd; i++) {
          const h = Math.floor(Math.random() * 360);
          const hex = hslToHex(`hsl(${h}, 70%, 50%)`).toUpperCase();
          currentColors.push({ hex, locked: false });
        }
      }
      renderPalette();
    };

    cFg?.addEventListener("input", () => verifyAccessibility(false));
    cBg?.addEventListener("input", () => verifyAccessibility(false));

    const parseHexColor = (value) => {
      let hex = value.trim();
      if (!hex.startsWith("#")) hex = "#" + hex;
      if (/^#[0-9A-F]{6}$/i.test(hex)) return hex;
      if (/^#[0-9A-F]{3}$/i.test(hex)) {
        return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
      }
      return null;
    };

    const syncHex = (inputEl, pickerEl) => {
      const parsed = parseHexColor(inputEl.value);
      if (parsed) {
        pickerEl.value = parsed.toLowerCase();
        verifyAccessibility(true);
      }
    };

    cFgHex?.addEventListener("input", () => syncHex(cFgHex, cFg));
    cBgHex?.addEventListener("input", () => syncHex(cBgHex, cBg));

    container.querySelector("#palette-generate-btn")?.addEventListener("click", generateNewPalette);
    
    const shapeChk = container.querySelector("#palette-use-shape-chk");
    if (shapeChk) {
      shapeChk.checked = appInstance.colorLabState.useSharedClipPath;
      shapeChk.addEventListener("change", (e) => {
        appInstance.colorLabState.useSharedClipPath = e.target.checked;
        if (e.target.checked && (!appInstance.cssStudioState || !appInstance.cssStudioState.sharedClipPath)) {
          appInstance.showToast("No custom shape found. Go to CSS Studio > Clip-Path to make one!", "info");
        }
        renderPalette();
      });
    }

    container.querySelector("#palette-add-btn")?.addEventListener("click", () => {
      if (currentColors.length >= 10) {
        appInstance.showToast("Maximum 10 colors allowed in palette", "warning");
        return;
      }
      const seedHue = Math.floor(Math.random() * 360);
      const newHex = hslToHex(`hsl(${seedHue}, 80%, 55%)`).toUpperCase();
      currentColors.push({ hex: newHex, locked: false });
      if (paletteCountInput) {
        paletteCountInput.value = currentColors.length;
        if (paletteCountVal) paletteCountVal.innerText = currentColors.length;
      }
      renderPalette();
      appInstance.showToast("Added new color swatch", "success");
    });

    paletteCountInput?.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      if (paletteCountVal) paletteCountVal.innerText = val;
      adjustPaletteSize(val);
    });

    // Custom Palettes Presets
    let customPalettes = [];
    try {
      const stored = localStorage.getItem("omnitool_custom_palettes");
      if (stored) customPalettes = JSON.parse(stored);
    } catch (err) {
      console.error(err);
    }

    const renderSavedPalettes = () => {
      const presetsBox = container.querySelector("#palette-presets-box");
      if (!presetsBox) return;
      presetsBox.innerHTML = "";

      if (customPalettes.length === 0) {
        presetsBox.innerHTML = `<p style="font-size: 11px; color: var(--text-muted); font-style: italic; margin: 0; padding: 4px;">No saved palettes yet.</p>`;
        return;
      }

      customPalettes.forEach((palette, index) => {
        const el = document.createElement("div");
        el.style.cssText = "display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); padding:4px 8px; border-radius:6px; margin-bottom:6px; cursor:pointer;";
        el.addEventListener("click", () => loadSavedPalette(palette));

        const nameSpan = document.createElement("span");
        nameSpan.innerText = palette.name;
        nameSpan.style.cssText = "font-size:11px; font-weight:bold; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:80px;";

        const colorsDiv = document.createElement("div");
        colorsDiv.style.cssText = "display:flex; gap:2px;";
        palette.colors.forEach(hex => {
          const dot = document.createElement("div");
          dot.style.cssText = `width:10px; height:10px; border-radius:50%; background:${hex};`;
          colorsDiv.appendChild(dot);
        });

        const delBtn = document.createElement("button");
        delBtn.innerHTML = "✕";
        delBtn.style.cssText = "background:transparent; border:none; color:var(--accent-rose); cursor:pointer; font-size:10px; padding:2px 4px;";
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          customPalettes.splice(index, 1);
          localStorage.setItem("omnitool_custom_palettes", JSON.stringify(customPalettes));
          renderSavedPalettes();
          appInstance.showToast("Deleted custom palette", "success");
        });

        el.appendChild(nameSpan);
        el.appendChild(colorsDiv);
        el.appendChild(delBtn);
        presetsBox.appendChild(el);
      });
    };

    const loadSavedPalette = (palette) => {
      currentColors = palette.colors.map(hex => ({ hex, locked: false }));
      if (paletteCountInput) {
        paletteCountInput.value = currentColors.length;
        if (paletteCountVal) paletteCountVal.innerText = currentColors.length;
      }
      renderPalette();
      if (currentColors.length >= 2) {
        setAsContrastColor(currentColors[0].hex, "fg");
        setAsContrastColor(currentColors[1].hex, "bg");
      }
      appInstance.showToast(`Loaded palette: ${palette.name}`, "info");
    };

    container.querySelector("#palette-save-btn")?.addEventListener("click", () => {
      if (currentColors.length === 0) return;
      const name = prompt("Name your palette:", `Palette ${customPalettes.length + 1}`);
      if (!name) return;
      const colors = currentColors.map(c => c.hex);
      customPalettes.push({ name: name.trim(), colors });
      localStorage.setItem("omnitool_custom_palettes", JSON.stringify(customPalettes));
      renderSavedPalettes();
      appInstance.showToast("Palette saved!", "success");
    });

    // ==========================================
    // COLOR SHADES CODE
    // ==========================================
    const shadesPicker = container.querySelector("#shades-color-picker");
    const shadesInput = container.querySelector("#shades-color-input");
    const formatSelect = container.querySelector("#shades-format");

    const shadesTabBtns = container.querySelectorAll(".shades-tab-btn");
    const shadesPanes = {
      tints: container.querySelector("#shades-tab-tints"),
      shades: container.querySelector("#shades-tab-shades"),
      opacities: container.querySelector("#shades-tab-opacities")
    };
    const shadesGrids = {
      tints: container.querySelector("#tints-grid"),
      shades: container.querySelector("#shades-grid"),
      opacities: container.querySelector("#opacities-grid")
    };

    const colorToRgb = (str) => {
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.fillStyle = str;
      const fill = ctx.fillStyle;
      if (!fill) return null;

      if (fill.startsWith("#")) {
        const r = parseInt(fill.substring(1, 3), 16);
        const g = parseInt(fill.substring(3, 5), 16);
        const b = parseInt(fill.substring(5, 7), 16);
        return { r, g, b, a: 1 };
      } else if (fill.startsWith("rgba")) {
        const parts = fill.substring(5, fill.length - 1).split(",");
        return { r: parseInt(parts[0], 10), g: parseInt(parts[1], 10), b: parseInt(parts[2], 10), a: parseFloat(parts[3]) };
      } else if (fill.startsWith("rgb")) {
        const parts = fill.substring(4, fill.length - 1).split(",");
        return { r: parseInt(parts[0], 10), g: parseInt(parts[1], 10), b: parseInt(parts[2], 10), a: 1 };
      }
      return null;
    };

    const rgbToHex = (r, g, b) => {
      const toHex = (x) => {
        const h = Math.max(0, Math.min(255, Math.round(x))).toString(16);
        return h.length === 1 ? "0" + h : h;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
    };

    const rgbToHsl = (r, g, b) => {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    const formatColor = (r, g, b, format, alpha = 1) => {
      if (alpha < 1) {
        if (format === "hsl") {
          const hsl = rgbToHsl(r, g, b);
          return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha.toFixed(2)})`;
        }
        return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha.toFixed(2)})`;
      }
      if (format === "hex") return rgbToHex(r, g, b);
      if (format === "rgb") return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
      if (format === "hsl") {
        const hsl = rgbToHsl(r, g, b);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      }
      return rgbToHex(r, g, b);
    };

    const renderAllSwatches = () => {
      if (activeTab !== "shades") return;
      const baseStr = shadesInput.value.trim();
      const rgb = colorToRgb(baseStr);
      if (!rgb) return;

      const format = formatSelect.value;

      // 1. Tints
      shadesGrids.tints.innerHTML = "";
      for (let i = 0; i <= 10; i++) {
        const pct = i / 10;
        const r = rgb.r + (255 - rgb.r) * pct;
        const g = rgb.g + (255 - rgb.g) * pct;
        const b = rgb.b + (255 - rgb.b) * pct;
        const cssVal = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
        const valStr = formatColor(r, g, b, format);
        shadesGrids.tints.appendChild(createSwatchElement(cssVal, valStr, `${Math.round(pct * 100)}% Tint`));
      }

      // 2. Shades
      shadesGrids.shades.innerHTML = "";
      for (let i = 0; i <= 10; i++) {
        const pct = i / 10;
        const r = rgb.r * (1 - pct);
        const g = rgb.g * (1 - pct);
        const b = rgb.b * (1 - pct);
        const cssVal = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
        const valStr = formatColor(r, g, b, format);
        shadesGrids.shades.appendChild(createSwatchElement(cssVal, valStr, `${Math.round(pct * 100)}% Shade`));
      }

      // 3. Opacities
      shadesGrids.opacities.innerHTML = "";
      for (let i = 0; i <= 10; i++) {
        const alpha = 1 - (i / 10);
        const valStr = formatColor(rgb.r, rgb.g, rgb.b, format, alpha);
        shadesGrids.opacities.appendChild(createSwatchElement(valStr, valStr, `Alpha ${alpha.toFixed(1)}`));
      }
    };

    const createSwatchElement = (cssBgColor, copyText, label) => {
      const card = document.createElement("div");
      card.className = "tool-badge";
      card.style.cssText = "cursor: pointer; padding: 0; overflow: hidden; display: flex; flex-direction: column; height: 110px; transition: transform 0.2s, box-shadow 0.2s; border: 1px solid var(--border-color); background: var(--card-bg);";

      const isOpacity = label.includes("Alpha");
      const checkerboardBg = isOpacity
        ? "background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%); background-size: 8px 8px; background-position: 0 0, 0 4px, 4px -4px, -4px 0px;"
        : "";

      card.innerHTML = `
        <div style="flex: 1; min-height: 50px; ${checkerboardBg} position: relative;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${cssBgColor};"></div>
        </div>
        <div style="padding: 6px; text-align: center; display: flex; flex-direction: column; justify-content: center; gap: 2px;">
          <span style="font-size: 8px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">${label}</span>
          <span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: bold;">${copyText}</span>
        </div>
      `;

      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-2px)";
        card.style.boxShadow = "0 4px 10px rgba(0, 242, 254, 0.15)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
      });
      card.addEventListener("click", () => {
        appInstance.copyText(copyText);
      });

      return card;
    };

    shadesPicker?.addEventListener("input", (e) => {
      shadesInput.value = e.target.value.toUpperCase();
      renderAllSwatches();
    });

    shadesInput?.addEventListener("input", () => {
      const rgb = colorToRgb(shadesInput.value);
      if (rgb) {
        shadesPicker.value = rgbToHex(rgb.r, rgb.g, rgb.b).toLowerCase();
        renderAllSwatches();
      }
    });

    formatSelect?.addEventListener("change", renderAllSwatches);

    container.querySelectorAll(".shades-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const color = btn.getAttribute("data-color");
        shadesInput.value = color;
        shadesPicker.value = color.toLowerCase();
        renderAllSwatches();
        appInstance.showToast(`Selected preset ${btn.innerText}!`, "success");
      });
    });

    shadesTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        shadesTabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const targetTab = btn.getAttribute("data-tab");
        Object.keys(shadesPanes).forEach(k => {
          shadesPanes[k].classList.toggle("hidden", k !== targetTab);
        });
      });
    });

    // ==========================================
    // SAMPLES & INITIAL SETUP
    // ==========================================
    container.querySelector("#color-load-sample")?.addEventListener("click", () => {
      if (activeTab === "palette") {
        if (cFg) cFg.value = "#ffffff";
        if (cFgHex) cFgHex.value = "#FFFFFF";
        if (cBg) cBg.value = "#9d4edd";
        if (cBgHex) cBgHex.value = "#9D4EDD";
        verifyAccessibility(false);
        appInstance.showToast("Loaded sample AA contrast check!", "info");
      } else {
        shadesInput.value = "#FF007F";
        shadesPicker.value = "#ff007f";
        renderAllSwatches();
        appInstance.showToast("Loaded Vaporwave Pink Base!", "info");
      }
    });

    // Initial Triggers
    if (currentColors.length === 0) {
      generateNewPalette();
    } else {
      renderPalette();
      if (paletteCountInput) {
        paletteCountInput.value = currentColors.length;
        if (paletteCountVal) paletteCountVal.innerText = currentColors.length;
      }
    }
    renderSavedPalettes();
    verifyAccessibility(false);
    renderAllSwatches();
  }
};
