export default {
  id: "color-shades",
  name: "Color Shades & Tint Generator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Select Base Color</h3>
          </div>
          
          <div class="form-group" style="margin-bottom: 16px;">
            <label>Choose Color</label>
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="color" id="shades-color-picker" value="#3a86c8" style="border: none; background: none; width: 48px; height: 48px; cursor: pointer; padding: 0;">
              <input type="text" id="shades-color-input" class="form-input" value="#3A86C8" style="flex: 1; font-family: var(--font-mono); text-transform: uppercase;" placeholder="#HEX / rgb() / hsl()" aria-label="Base Color Input">
            </div>
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label for="shades-format">Output Format</label>
            <select class="form-select" id="shades-format" style="width: 100%;">
              <option value="hex" selected>HEX (e.g. #3A86C8)</option>
              <option value="rgb">RGB (e.g. rgb(58, 134, 200))</option>
              <option value="hsl">HSL (e.g. hsl(208, 55%, 51%))</option>
            </select>
          </div>

          <div class="form-group">
            <label>Quick Cyber & Brand Presets</label>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
              <button class="tool-btn secondary shades-preset-btn" data-color="#00F2FE" style="border-left: 3px solid #00F2FE;">Cyan</button>
              <button class="tool-btn secondary shades-preset-btn" data-color="#FF007F" style="border-left: 3px solid #FF007F;">Pink</button>
              <button class="tool-btn secondary shades-preset-btn" data-color="#9D4EDD" style="border-left: 3px solid #9D4EDD;">Purple</button>
              <button class="tool-btn secondary shades-preset-btn" data-color="#39FF14" style="border-left: 3px solid #39FF14;">Neon Green</button>
              <button class="tool-btn secondary shades-preset-btn" data-color="#F59E0B" style="border-left: 3px solid #F59E0B;">Amber</button>
              <button class="tool-btn secondary shades-preset-btn" data-color="#F43F5E" style="border-left: 3px solid #F43F5E;">Rose</button>
            </div>
          </div>
        </div>

        <div class="tool-panel" style="flex: 2;">
          <div class="panel-header">
            <h3>Generated Swatches</h3>
            <span style="font-size: 12px; color: var(--text-muted);">Click to copy</span>
          </div>
          
          <div class="tabs-container" style="margin-bottom: 16px;">
            <div class="tabs-header" style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; overflow-x: auto;">
              <button class="tool-btn active-tab shades-tab-btn" data-tab="tints" style="flex: 1; justify-content: center; padding: 8px 12px;">Tints (Lighter)</button>
              <button class="tool-btn shades-tab-btn" data-tab="shades" style="flex: 1; justify-content: center; padding: 8px 12px;">Shades (Darker)</button>
              <button class="tool-btn shades-tab-btn" data-tab="opacities" style="flex: 1; justify-content: center; padding: 8px 12px;">Opacities (Alpha)</button>
            </div>
          </div>

          <!-- Tints Tab -->
          <div id="shades-tab-tints" class="shades-content-pane">
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;" id="tints-grid"></div>
          </div>

          <!-- Shades Tab -->
          <div id="shades-tab-shades" class="shades-content-pane" style="display: none;">
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;" id="shades-grid"></div>
          </div>

          <!-- Opacities Tab -->
          <div id="shades-tab-opacities" class="shades-content-pane" style="display: none;">
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;" id="opacities-grid"></div>
          </div>
        </div>

        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>How it works</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Choose Base</strong>: Select any color from the color picker, type a value, or click one of the neon brand presets.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Format Out</strong>: Swap output representation between HEX, RGB, or HSL formatting.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Copy Clipboard</strong>: Click any swatch card. The computed value will copy instantly with a success chime.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const picker = container.querySelector("#shades-color-picker");
    const textInput = container.querySelector("#shades-color-input");
    const formatSelect = container.querySelector("#shades-format");

    const tabBtns = container.querySelectorAll(".shades-tab-btn");
    const panes = {
      tints: container.querySelector("#shades-tab-tints"),
      shades: container.querySelector("#shades-tab-shades"),
      opacities: container.querySelector("#shades-tab-opacities")
    };

    const grids = {
      tints: container.querySelector("#tints-grid"),
      shades: container.querySelector("#shades-grid"),
      opacities: container.querySelector("#opacities-grid")
    };

    // Color conversion utilities
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
        return {
          r: parseInt(parts[0], 10),
          g: parseInt(parts[1], 10),
          b: parseInt(parts[2], 10),
          a: parseFloat(parts[3])
        };
      } else if (fill.startsWith("rgb")) {
        const parts = fill.substring(4, fill.length - 1).split(",");
        return {
          r: parseInt(parts[0], 10),
          g: parseInt(parts[1], 10),
          b: parseInt(parts[2], 10),
          a: 1
        };
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
      r /= 255;
      g /= 255;
      b /= 255;
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
      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      };
    };

    const formatColor = (r, g, b, format, alpha = 1) => {
      if (alpha < 1) {
        if (format === "hsl") {
          const hsl = rgbToHsl(r, g, b);
          return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alpha.toFixed(2)})`;
        }
        return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${alpha.toFixed(2)})`;
      }

      if (format === "hex") {
        return rgbToHex(r, g, b);
      } else if (format === "rgb") {
        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
      } else if (format === "hsl") {
        const hsl = rgbToHsl(r, g, b);
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      }
      return rgbToHex(r, g, b);
    };

    // Swatch card generation
    const renderAllSwatches = () => {
      const baseStr = textInput.value.trim();
      const rgb = colorToRgb(baseStr);
      if (!rgb) return;

      const format = formatSelect.value;

      // 1. Render Tints (lighter)
      grids.tints.innerHTML = "";
      for (let i = 0; i <= 10; i++) {
        const pct = i / 10;
        const r = rgb.r + (255 - rgb.r) * pct;
        const g = rgb.g + (255 - rgb.g) * pct;
        const b = rgb.b + (255 - rgb.b) * pct;

        const cssVal = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
        const valStr = formatColor(r, g, b, format);
        grids.tints.appendChild(createSwatchElement(cssVal, valStr, `${Math.round(pct * 100)}% Tint`));
      }

      // 2. Render Shades (darker)
      grids.shades.innerHTML = "";
      for (let i = 0; i <= 10; i++) {
        const pct = i / 10;
        const r = rgb.r * (1 - pct);
        const g = rgb.g * (1 - pct);
        const b = rgb.b * (1 - pct);

        const cssVal = `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
        const valStr = formatColor(r, g, b, format);
        grids.shades.appendChild(createSwatchElement(cssVal, valStr, `${Math.round(pct * 100)}% Shade`));
      }

      // 3. Render Opacities
      grids.opacities.innerHTML = "";
      for (let i = 0; i <= 10; i++) {
        const alpha = 1 - (i / 10);
        const valStr = formatColor(rgb.r, rgb.g, rgb.b, format, alpha);
        // Visual display needs base color + grid background for opacity visualization
        grids.opacities.appendChild(createSwatchElement(valStr, valStr, `Alpha ${alpha.toFixed(1)}`));
      }
    };

    const createSwatchElement = (cssBgColor, copyText, label) => {
      const card = document.createElement("div");
      card.className = "tool-badge";
      card.style.cssText = "cursor: pointer; padding: 0; overflow: hidden; display: flex; flex-direction: column; height: 130px; transition: transform 0.2s, box-shadow 0.2s; border: 1px solid var(--border-color); background: var(--card-bg);";

      // Checkerboard background style for opacities
      const isOpacity = label.includes("Alpha");
      const checkerboardBg = isOpacity
        ? "background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%); background-size: 10px 10px; background-position: 0 0, 0 5px, 5px -5px, -5px 0px;"
        : "";

      card.innerHTML = `
        <div style="flex: 1; min-height: 60px; ${checkerboardBg} position: relative;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${cssBgColor};"></div>
        </div>
        <div style="padding: 8px; text-align: center; display: flex; flex-direction: column; justify-content: center; gap: 2px;">
          <span style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--text-muted);">${label}</span>
          <span style="font-family: var(--font-mono); font-size: 11px; color: var(--text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 500;">${copyText}</span>
        </div>
      `;

      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-2px)";
        card.style.boxShadow = "0 4px 12px rgba(0, 242, 254, 0.15)";
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

    // Wire up base events
    picker.addEventListener("input", (e) => {
      textInput.value = e.target.value.toUpperCase();
      renderAllSwatches();
    });

    textInput.addEventListener("input", () => {
      const rgb = colorToRgb(textInput.value);
      if (rgb) {
        picker.value = rgbToHex(rgb.r, rgb.g, rgb.b).toLowerCase();
        renderAllSwatches();
      }
    });

    formatSelect.addEventListener("change", renderAllSwatches);

    // Presets
    container.querySelectorAll(".shades-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const color = btn.getAttribute("data-color");
        textInput.value = color;
        picker.value = color.toLowerCase();
        renderAllSwatches();
        appInstance.showToast(`Selected preset ${btn.innerText}!`, "success");
      });
    });

    // Tab switcher
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active-tab"));
        btn.classList.add("active-tab");

        const targetTab = btn.getAttribute("data-tab");
        Object.keys(panes).forEach(k => {
          panes[k].style.display = (k === targetTab) ? "block" : "none";
        });
      });
    });

    // Initial render
    renderAllSwatches();
  }
};
