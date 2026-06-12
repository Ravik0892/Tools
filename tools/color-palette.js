import { escapeHtml } from './utils.js';

export default {
  id: "color-palette",
  name: "Color Palette & Contrast Checker",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Interactive Palette Generator</h3>
            <div style="display: flex; gap: 8px;">
              <button class="tool-btn secondary" id="palette-add-btn">+ Add Color</button>
              <button class="tool-btn primary" id="palette-generate-btn">Generate Palette</button>
            </div>
          </div>
          <div class="form-group" style="margin-bottom: 8px;">
            <label>Number of Colors</label>
            <div class="slider-group">
              <input type="range" id="palette-count" class="slider-input" min="2" max="10" value="5">
              <span class="slider-val" id="palette-count-val">5</span>
            </div>
          </div>
          <p style="font-size: 13px; color: var(--text-muted);">Click hex to copy, or set as Text Color / Background Color for the WCAG contrast test below.</p>
          <div class="palette-swatches" id="palette-swatches-box">
            <!-- Javascript builds swatches here -->
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>WCAG Contrast Ratio Checker</h3>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="contrast-fg">Text Color</label>
              <div style="display: flex; gap: 8px;">
                <input type="color" id="contrast-fg" value="#ffffff" style="border: none; background: none; width: 42px; height: 42px; cursor: pointer;">
                <input type="text" id="contrast-fg-hex" class="form-input" value="#FFFFFF" style="flex: 1; font-family: var(--font-mono); text-transform: uppercase;" aria-label="Foreground Hex Code">
              </div>
            </div>
            <div class="form-group">
              <label for="contrast-bg">Background Color</label>
              <div style="display: flex; gap: 8px;">
                <input type="color" id="contrast-bg" value="#9d4edd" style="border: none; background: none; width: 42px; height: 42px; cursor: pointer;">
                <input type="text" id="contrast-bg-hex" class="form-input" value="#9D4EDD" style="flex: 1; font-family: var(--font-mono); text-transform: uppercase;" aria-label="Background Hex Code">
              </div>
            </div>
          </div>

          <div class="gradient-visualizer" id="contrast-preview-screen" style="height: 100px; display: flex; flex-direction: column; gap: 4px;">
            <span id="contrast-preview-text" style="font-size: 16px; font-weight: 500;">Sample Text (Standard Size)</span>
            <span id="contrast-preview-text-large" style="font-size: 20px; font-weight: 700;">Large Text Preview</span>
          </div>

          <div class="form-row" style="grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));">
            <div class="tool-badge" style="padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <div style="font-size: 11px; color: var(--text-muted);">Contrast Ratio</div>
              <div style="font-size: 20px; font-weight: 800; color: var(--accent-cyan); margin-top: 4px;" id="contrast-ratio-value">4.5:1</div>
            </div>
            <div class="tool-badge" style="padding: 10px; display: flex; flex-direction: column; gap: 6px;">
              <div style="font-size: 10px; color: var(--text-muted); text-align: center; text-transform: uppercase;">Normal Text</div>
              <div style="display: flex; justify-content: space-around;">
                <span class="contrast-badge pass" id="wcag-normal-aa">AA</span>
                <span class="contrast-badge pass" id="wcag-normal-aaa">AAA</span>
              </div>
            </div>
            <div class="tool-badge" style="padding: 10px; display: flex; flex-direction: column; gap: 6px;">
              <div style="font-size: 10px; color: var(--text-muted); text-align: center; text-transform: uppercase;">Large Text</div>
              <div style="display: flex; justify-content: space-around;">
                <span class="contrast-badge pass" id="wcag-large-aa">AA</span>
                <span class="contrast-badge pass" id="wcag-large-aaa">AAA</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="palette-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Generate Palette</strong>: Select the swatch quantity and click **Generate Palette**, or click **+ Add Color** to create manual swatches.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Lock & Edit</strong>: Lock swatches with the padlock icon to keep them constant, or click swatches to open the native color picker.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Contrast Checker</strong>: Assign colors to Foreground/Background elements to verify passing WCAG AA/AAA accessibility standards.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
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

    let currentColors = [];

    const hslToHex = (hsl) => {
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.fillStyle = hsl;
      return ctx.fillStyle;
    };

    const getPaletteCount = () => {
      const el = container.querySelector("#palette-count");
      return el ? parseInt(el.value, 10) : 5;
    };

    const getLuminance = (hex) => {
      const c = hex.replace("#", "");
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
      appInstance.showToast(`Set ${hex} as ${target === "fg" ? "Text" : "Background"} Color`, "success");
    };

    const renderPalette = () => {
      if (!paletteSwatches) return;
      paletteSwatches.innerHTML = "";

      currentColors.forEach((colorObj, index) => {
        const card = document.createElement("div");
        card.className = "swatch-card";
        card.setAttribute("data-index", index);

        const isLocked = colorObj.locked;
        const hex = colorObj.hex;

        card.innerHTML = `
          <div class="swatch-color" style="background-color: ${hex};">
            <input type="color" class="swatch-color-picker" value="${hex.toLowerCase()}" title="Click color to customize this swatch">
            <div class="swatch-overlay-btns">
              <button class="swatch-icon-btn lock-btn ${isLocked ? 'locked' : ''}" title="${isLocked ? 'Unlock Color' : 'Lock Color'}">
                ${isLocked ? '🔒' : '🔓'}
              </button>
              <button class="swatch-icon-btn remove-btn" title="Remove Color">✕</button>
            </div>
          </div>
          <div class="swatch-label" title="Click to copy hex code">${hex}</div>
          <div class="swatch-actions">
            <button class="swatch-action-btn set-fg-btn">Text</button>
            <button class="swatch-action-btn set-bg-btn">Bg</button>
          </div>
        `;

        const picker = card.querySelector(".swatch-color-picker");
        picker.addEventListener("change", (e) => {
          const newHex = e.target.value.toUpperCase();
          currentColors[index].hex = newHex;
          renderPalette();
          // Bug Fix: If this is the active Fg or Bg swatch, update the Contrast Checker live
          if (index === 0) setAsContrastColor(newHex, "fg");
          else if (index === 1) setAsContrastColor(newHex, "bg");
        });
        picker.addEventListener("input", (e) => {
          const newHex = e.target.value.toUpperCase();
          currentColors[index].hex = newHex;
          card.querySelector(".swatch-color").style.backgroundColor = e.target.value;
          card.querySelector(".swatch-label").innerText = newHex;
          // Live contrast updates while dragging swatch picker
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

        const lockBtn = card.querySelector(".lock-btn");
        lockBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          colorObj.locked = !colorObj.locked;
          renderPalette();
        });

        const removeBtn = card.querySelector(".remove-btn");
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          removeColorAt(index);
        });

        const label = card.querySelector(".swatch-label");
        label.addEventListener("click", (e) => {
          e.stopPropagation();
          appInstance.copyText(hex);
        });

        const setFgBtn = card.querySelector(".set-fg-btn");
        setFgBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          setAsContrastColor(hex, "fg");
        });

        const setBgBtn = card.querySelector(".set-bg-btn");
        setBgBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          setAsContrastColor(hex, "bg");
        });

        paletteSwatches.appendChild(card);
      });
    };

    const removeColorAt = (index) => {
      currentColors.splice(index, 1);
      const slider = container.querySelector("#palette-count");
      if (slider) {
        slider.value = currentColors.length;
        const sliderVal = container.querySelector("#palette-count-val");
        if (sliderVal) sliderVal.innerText = currentColors.length;
      }
      renderPalette();
    };

    const generateNewPalette = () => {
      const count = getPaletteCount();
      const seedHue = Math.floor(Math.random() * 360);
      const step = 360 / Math.max(1, count);
      const nextColors = [];

      for (let i = 0; i < count; i++) {
        if (currentColors[i] && currentColors[i].locked) {
          nextColors.push(currentColors[i]);
        } else {
          const hue = Math.floor((seedHue + i * step) % 360);
          const sat = 75 + (i % 2) * 10;
          const light = 45 + (i % 3) * 8;
          const hex = hslToHex(`hsl(${hue}, ${sat}%, ${light}%)`).toUpperCase();
          nextColors.push({ hex, locked: false });
        }
      }

      currentColors = nextColors;
      renderPalette();

      // Automatically load the first color as Text Color and the second color as Background Color
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
          const seedHue = Math.floor(Math.random() * 360);
          const hex = hslToHex(`hsl(${seedHue}, 80%, 55%)`).toUpperCase();
          currentColors.push({ hex, locked: false });
        }
      }

      renderPalette();
    };

    cFg?.addEventListener("input", () => verifyAccessibility(false));
    cBg?.addEventListener("input", () => verifyAccessibility(false));
    cFg?.addEventListener("change", () => verifyAccessibility(false));
    cBg?.addEventListener("change", () => verifyAccessibility(false));

    const parseHexColor = (value) => {
      let hex = value.trim();
      if (!hex.startsWith("#")) {
        hex = "#" + hex;
      }

      if (/^#[0-9A-F]{6}$/i.test(hex)) {
        return hex;
      }

      if (/^#[0-9A-F]{3}$/i.test(hex)) {
        const r = hex[1];
        const g = hex[2];
        const b = hex[3];
        return `#${r}${r}${g}${g}${b}${b}`;
      }

      return null;
    };

    const syncFromHexText = (inputEl, pickerEl) => {
      const parsed = parseHexColor(inputEl.value);
      if (parsed) {
        pickerEl.value = parsed.toLowerCase();
        verifyAccessibility(true);
      }
    };

    cFgHex?.addEventListener("input", () => syncFromHexText(cFgHex, cFg));
    cBgHex?.addEventListener("input", () => syncFromHexText(cBgHex, cBg));

    const finalizeHexInput = (inputEl, pickerEl) => {
      const parsed = parseHexColor(inputEl.value);
      if (parsed) {
        pickerEl.value = parsed.toLowerCase();
      }
      verifyAccessibility(false);
    };

    cFgHex?.addEventListener("change", () => finalizeHexInput(cFgHex, cFg));
    cBgHex?.addEventListener("change", () => finalizeHexInput(cBgHex, cBg));

    container.querySelector("#palette-generate-btn")?.addEventListener("click", generateNewPalette);

    container.querySelector("#palette-add-btn")?.addEventListener("click", () => {
      if (currentColors.length >= 10) {
        appInstance.showToast("Maximum 10 colors allowed in palette", "warning");
        return;
      }
      const seedHue = Math.floor(Math.random() * 360);
      const newHex = hslToHex(`hsl(${seedHue}, 80%, 55%)`).toUpperCase();
      currentColors.push({ hex: newHex, locked: false });

      const slider = container.querySelector("#palette-count");
      if (slider) {
        slider.value = currentColors.length;
        const sliderVal = container.querySelector("#palette-count-val");
        if (sliderVal) sliderVal.innerText = currentColors.length;
      }

      renderPalette();
      appInstance.showToast("Added new color swatch", "success");
    });

    const paletteSlider = container.querySelector("#palette-count");
    paletteSlider?.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      const sliderVal = container.querySelector("#palette-count-val");
      if (sliderVal) sliderVal.innerText = val;
      adjustPaletteSize(val);
    });

    container.querySelector("#palette-guide-load-sample")?.addEventListener("click", () => {
      generateNewPalette();
      appInstance.showToast("Generated new random contrast test palette!", "info");
    });

    // Run first generation automatically on load
    generateNewPalette();
  }
};
