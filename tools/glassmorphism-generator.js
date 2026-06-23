export default {
  id: "glassmorphism-generator",
  name: "Frosted Glassmorphism CSS Generator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Visual Style Controls</h3>
          </div>
          
          <!-- Presets -->
          <div class="form-group">
            <label>Load Cyber Presets</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
              <button class="tool-btn secondary" id="glass-preset-ios" style="font-size: 11px; padding: 6px 10px;">iOS Light</button>
              <button class="tool-btn secondary" id="glass-preset-cyber" style="font-size: 11px; padding: 6px 10px;">Neon Cyberpunk</button>
              <button class="tool-btn secondary" id="glass-preset-dark" style="font-size: 11px; padding: 6px 10px;">Midnight Matrix</button>
              <button class="tool-btn secondary" id="glass-preset-neon" style="font-size: 11px; padding: 6px 10px;">Acid Vaporwave</button>
            </div>
          </div>

          <!-- Glass Fill controls -->
          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 12px;">
            <label>Glass Color & Opacity</label>
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
              <input type="color" id="glass-color" value="#0f172a" style="border: none; width: 40px; height: 32px; cursor: pointer; background: transparent; border-radius: 4px;">
              <span style="font-size: 12px; color: var(--text-muted);">Choose backdrop tint</span>
            </div>
            
            <label style="font-size: 12px; margin-top: 8px;">Backdrop Opacity</label>
            <div class="slider-group">
              <input type="range" id="glass-opacity" class="slider-input" min="0" max="100" value="35">
              <span class="slider-val" id="glass-opacity-val">35%</span>
            </div>
          </div>

          <!-- Blur & Saturation -->
          <div class="form-group">
            <label>Refraction Filters</label>
            <label style="font-size: 12px;">Backdrop Blur</label>
            <div class="slider-group">
              <input type="range" id="glass-blur" class="slider-input" min="0" max="30" value="12">
              <span class="slider-val" id="glass-blur-val">12px</span>
            </div>
            
            <label style="font-size: 12px; margin-top: 8px;">Backdrop Saturation</label>
            <div class="slider-group">
              <input type="range" id="glass-saturation" class="slider-input" min="50" max="250" value="120">
              <span class="slider-val" id="glass-saturation-val">120%</span>
            </div>
          </div>

          <!-- Borders -->
          <div class="form-group">
            <label>Borders & Radius</label>
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
              <input type="color" id="glass-border-color" value="#ffffff" style="border: none; width: 40px; height: 32px; cursor: pointer; background: transparent; border-radius: 4px;">
              <span style="font-size: 12px; color: var(--text-muted);">Border Color</span>
            </div>

            <label style="font-size: 12px;">Border Opacity</label>
            <div class="slider-group">
              <input type="range" id="glass-border-opacity" class="slider-input" min="0" max="100" value="20">
              <span class="slider-val" id="glass-border-opacity-val">20%</span>
            </div>

            <label style="font-size: 12px; margin-top: 8px;">Border Width</label>
            <div class="slider-group">
              <input type="range" id="glass-border-width" class="slider-input" min="0" max="8" value="1">
              <span class="slider-val" id="glass-border-width-val">1px</span>
            </div>

            <label style="font-size: 12px; margin-top: 8px;">Corner Radius</label>
            <div class="slider-group">
              <input type="range" id="glass-radius" class="slider-input" min="0" max="40" value="16">
              <span class="slider-val" id="glass-radius-val">16px</span>
            </div>
          </div>

          <!-- Neon Glow Shadow -->
          <div class="form-group">
            <label>Cyber Neon Glow (Box Shadow)</label>
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
              <input type="color" id="glass-glow-color" value="#00f2fe" style="border: none; width: 40px; height: 32px; cursor: pointer; background: transparent; border-radius: 4px;">
              <span style="font-size: 12px; color: var(--text-muted);">Glow/Shadow Color</span>
            </div>

            <label style="font-size: 12px;">Glow Size (Blur)</label>
            <div class="slider-group">
              <input type="range" id="glass-glow-size" class="slider-input" min="0" max="60" value="15">
              <span class="slider-val" id="glass-glow-size-val">15px</span>
            </div>

            <label style="font-size: 12px; margin-top: 8px;">Glow Intensity (Opacity)</label>
            <div class="slider-group">
              <input type="range" id="glass-glow-opacity" class="slider-input" min="0" max="100" value="30">
              <span class="slider-val" id="glass-glow-opacity-val">30%</span>
            </div>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Interactive Preview</h3>
            <div style="display: flex; gap: 6px;">
              <select id="preview-bg-select" class="form-select" style="padding: 4px 8px; font-size: 11px; width: auto; height: auto;">
                <option value="cyber-mesh">Cyber Mesh</option>
                <option value="polka-dots">Polka Dots</option>
                <option value="sunset-glow">Sunset Glow</option>
                <option value="plain-dark">Dark Minimal</option>
              </select>
            </div>
          </div>

          <!-- Dynamic Backdrop Showcase Area -->
          <div id="glass-showcase-container" class="glass-bg-mesh" style="min-height: 280px; position: relative; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 24px; transition: all 0.3s ease;">
            
            <!-- Neon background design elements visible through the glass -->
            <div class="glass-bg-deco-blob blob1" style="position: absolute; width: 100px; height: 100px; border-radius: 50%; background: radial-gradient(circle, #f43f5e 20%, transparent 80%); filter: blur(10px); top: 20%; left: 20%; pointer-events: none;"></div>
            <div class="glass-bg-deco-blob blob2" style="position: absolute; width: 140px; height: 140px; border-radius: 50%; background: radial-gradient(circle, #9d4edd 20%, transparent 80%); filter: blur(15px); bottom: 15%; right: 15%; pointer-events: none;"></div>
            <div class="glass-bg-deco-blob blob3" style="position: absolute; width: 80px; height: 80px; border-radius: 50%; background: radial-gradient(circle, #00f2fe 20%, transparent 80%); filter: blur(5px); top: 50%; right: 40%; pointer-events: none;"></div>
            
            <!-- The Glassmorphic Element -->
            <div id="glass-preview-element" style="width: 80%; max-width: 320px; padding: 24px; text-align: center; color: #ffffff; transition: none; position: relative; z-index: 2;">
              <h4 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 800; letter-spacing: 0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.4);">OMNITOOL HUB</h4>
              <p style="margin: 0 0 16px 0; font-size: 12px; opacity: 0.85; line-height: 1.5;">Real-time glassmorphism and ambient border-glow preview. Adjust controls on the left to see instant updates.</p>
              <button class="tool-btn primary" style="font-size: 11px; pointer-events: none; width: 100%;">Sample Interactive Trigger</button>
            </div>
          </div>

          <!-- Code Export -->
          <div class="form-group" style="margin-top: 16px;">
            <div class="panel-header" style="border: none; padding: 0; margin-bottom: 6px;">
              <label>Generated CSS</label>
              <button class="tool-btn accent-emerald" id="glass-copy-btn" style="font-size: 11px;"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy CSS</button>
            </div>
            <pre class="output-pre" id="glass-css-output" style="max-height: 180px; font-family: monospace; font-size: 12px; overflow-x: auto;"></pre>
          </div>
        </div>

        <!-- Quick Guide & Instruction Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Choose presets or customize</strong>: Select one of our pre-built cyber styles, or manually tune colors, blur, opacity, borders, and neon box-shadows.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Change Background</strong>: Use the dropdown to switch between Mesh gradients, Polka dots, or plain backgrounds to verify transparency.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Copy Code</strong>: Click <strong>Copy CSS</strong> to grab ready-to-use markup for your style templates.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const glassColor = container.querySelector("#glass-color");
    const glassOpacity = container.querySelector("#glass-opacity");
    const glassOpacityVal = container.querySelector("#glass-opacity-val");
    const glassBlur = container.querySelector("#glass-blur");
    const glassBlurVal = container.querySelector("#glass-blur-val");
    const glassSat = container.querySelector("#glass-saturation");
    const glassSatVal = container.querySelector("#glass-saturation-val");
    const glassBorderColor = container.querySelector("#glass-border-color");
    const glassBorderOpacity = container.querySelector("#glass-border-opacity");
    const glassBorderOpacityVal = container.querySelector("#glass-border-opacity-val");
    const glassBorderWidth = container.querySelector("#glass-border-width");
    const glassBorderWidthVal = container.querySelector("#glass-border-width-val");
    const glassRadius = container.querySelector("#glass-radius");
    const glassRadiusVal = container.querySelector("#glass-radius-val");
    const glassGlowColor = container.querySelector("#glass-glow-color");
    const glassGlowSize = container.querySelector("#glass-glow-size");
    const glassGlowSizeVal = container.querySelector("#glass-glow-size-val");
    const glassGlowOpacity = container.querySelector("#glass-glow-opacity");
    const glassGlowOpacityVal = container.querySelector("#glass-glow-opacity-val");

    const showcase = container.querySelector("#glass-showcase-container");
    const bgSelect = container.querySelector("#preview-bg-select");
    const previewEl = container.querySelector("#glass-preview-element");
    const cssOutput = container.querySelector("#glass-css-output");

    // Hex to RGB converter helper
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.replace("#", ""), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    };

    // Update function
    const updateGlassStyles = () => {
      // Inputs
      const colorHex = glassColor.value;
      const opacity = parseInt(glassOpacity.value) / 100;
      const blur = parseInt(glassBlur.value);
      const saturation = parseInt(glassSat.value);
      const bColorHex = glassBorderColor.value;
      const bOpacity = parseInt(glassBorderOpacity.value) / 100;
      const bWidth = parseInt(glassBorderWidth.value);
      const radius = parseInt(glassRadius.value);
      const gColorHex = glassGlowColor.value;
      const gSize = parseInt(glassGlowSize.value);
      const gOpacity = parseInt(glassGlowOpacity.value) / 100;

      // Update Labels
      glassOpacityVal.innerText = `${glassOpacity.value}%`;
      glassBlurVal.innerText = `${blur}px`;
      glassSatVal.innerText = `${saturation}%`;
      glassBorderOpacityVal.innerText = `${glassBorderOpacity.value}%`;
      glassBorderWidthVal.innerText = `${bWidth}px`;
      glassRadiusVal.innerText = `${radius}px`;
      glassGlowSizeVal.innerText = `${gSize}px`;
      glassGlowOpacityVal.innerText = `${glassGlowOpacity.value}%`;

      // Apply values
      const rgbColor = hexToRgb(colorHex);
      const borderRgb = hexToRgb(bColorHex);
      const glowRgb = hexToRgb(gColorHex);

      const glassBg = `rgba(${rgbColor}, ${opacity})`;
      const borderStyle = `${bWidth}px solid rgba(${borderRgb}, ${bOpacity})`;
      const backdropFilter = `blur(${blur}px) saturate(${saturation}%)`;
      const boxShadow = `0 ${gSize / 2}px ${gSize}px rgba(${glowRgb}, ${gOpacity})`;

      // Set preview element inline styles
      previewEl.style.backgroundColor = glassBg;
      previewEl.style.border = borderStyle;
      previewEl.style.backdropFilter = backdropFilter;
      previewEl.style.webkitBackdropFilter = backdropFilter; // Webkit compatibility
      previewEl.style.borderRadius = `${radius}px`;
      previewEl.style.boxShadow = boxShadow;

      // Format CSS output
      const cssString = `.glass-card {
  background: ${glassBg};
  backdrop-filter: ${backdropFilter};
  -webkit-backdrop-filter: ${backdropFilter};
  border: ${borderStyle};
  border-radius: ${radius}px;
  box-shadow: ${boxShadow};
}`;
      cssOutput.innerText = cssString;
    };

    // Sliders event bindings
    const inputs = [
      glassColor, glassOpacity, glassBlur, glassSat,
      glassBorderColor, glassBorderOpacity, glassBorderWidth, glassRadius,
      glassGlowColor, glassGlowSize, glassGlowOpacity
    ];
    inputs.forEach(input => input?.addEventListener("input", updateGlassStyles));

    // Preset loaders
    container.querySelector("#glass-preset-ios")?.addEventListener("click", () => {
      glassColor.value = "#ffffff";
      glassOpacity.value = "25";
      glassBlur.value = "20";
      glassSat.value = "150";
      glassBorderColor.value = "#ffffff";
      glassBorderOpacity.value = "40";
      glassBorderWidth.value = "1";
      glassRadius.value = "20";
      glassGlowColor.value = "#000000";
      glassGlowSize.value = "15";
      glassGlowOpacity.value = "8";
      updateGlassStyles();
      appInstance.showToast("Loaded iOS Light Glass preset", "info");
    });

    container.querySelector("#glass-preset-cyber")?.addEventListener("click", () => {
      glassColor.value = "#030712";
      glassOpacity.value = "50";
      glassBlur.value = "10";
      glassSat.value = "130";
      glassBorderColor.value = "#00f2fe";
      glassBorderOpacity.value = "80";
      glassBorderWidth.value = "2";
      glassRadius.value = "12";
      glassGlowColor.value = "#00f2fe";
      glassGlowSize.value = "30";
      glassGlowOpacity.value = "45";
      updateGlassStyles();
      appInstance.showToast("Loaded Cyberpunk Cyan preset", "info");
    });

    container.querySelector("#glass-preset-dark")?.addEventListener("click", () => {
      glassColor.value = "#09090b";
      glassOpacity.value = "75";
      glassBlur.value = "15";
      glassSat.value = "100";
      glassBorderColor.value = "#27272a";
      glassBorderOpacity.value = "60";
      glassBorderWidth.value = "1";
      glassRadius.value = "16";
      glassGlowColor.value = "#000000";
      glassGlowSize.value = "40";
      glassGlowOpacity.value = "50";
      updateGlassStyles();
      appInstance.showToast("Loaded Midnight Matrix preset", "info");
    });

    container.querySelector("#glass-preset-neon")?.addEventListener("click", () => {
      glassColor.value = "#1e1b4b";
      glassOpacity.value = "40";
      glassBlur.value = "14";
      glassSat.value = "180";
      glassBorderColor.value = "#f43f5e";
      glassBorderOpacity.value = "90";
      glassBorderWidth.value = "2";
      glassRadius.value = "24";
      glassGlowColor.value = "#f43f5e";
      glassGlowSize.value = "45";
      glassGlowOpacity.value = "55";
      updateGlassStyles();
      appInstance.showToast("Loaded Acid Vaporwave preset", "info");
    });

    // Background showcase toggle
    bgSelect?.addEventListener("change", (e) => {
      const bg = e.target.value;
      // Clear previous classes
      showcase.className = "";

      // Remove or show deco blobs
      const blobs = showcase.querySelectorAll(".glass-bg-deco-blob");

      if (bg === "cyber-mesh") {
        showcase.className = "glass-bg-mesh";
        blobs.forEach(b => b.style.display = "block");
      } else if (bg === "polka-dots") {
        showcase.className = "glass-bg-dots";
        blobs.forEach(b => b.style.display = "block");
      } else if (bg === "sunset-glow") {
        showcase.className = "glass-bg-sunset";
        blobs.forEach(b => b.style.display = "none");
      } else {
        showcase.className = "glass-bg-dark";
        blobs.forEach(b => b.style.display = "none");
      }
    });

    // Copy CSS clipboard handler
    container.querySelector("#glass-copy-btn")?.addEventListener("click", () => {
      appInstance.copyText(cssOutput.innerText);
    });

    // Run initial style update
    updateGlassStyles();
  }
};
