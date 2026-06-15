export default {
  id: "box-shadow",
  name: "CSS Box Shadow Builder",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Visual Style Controls</h3>
          </div>
          
          <!-- Presets -->
          <div class="form-group">
            <label>Load Presets</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px;">
              <button class="tool-btn secondary" id="shadow-preset-soft" style="font-size: 11px; padding: 6px 10px;">Soft Ambient</button>
              <button class="tool-btn secondary" id="shadow-preset-cyber" style="font-size: 11px; padding: 6px 10px;">Cyber Floating</button>
              <button class="tool-btn secondary" id="shadow-preset-neon" style="font-size: 11px; padding: 6px 10px;">Neon Dual Glow</button>
              <button class="tool-btn secondary" id="shadow-preset-inset" style="font-size: 11px; padding: 6px 10px;">Inner Glow</button>
            </div>
          </div>

          <!-- Shadow Layer 1 -->
          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label style="margin: 0; font-weight: 700; color: #10b981;">Shadow Layer 1</label>
              <div style="display: flex; align-items: center; gap: 6px;">
                <input type="checkbox" id="shadow-inset-1" style="cursor: pointer; width: 14px; height: 14px;">
                <label for="shadow-inset-1" style="font-size: 11px; margin: 0; cursor: pointer; color: var(--text-muted);">Inset</label>
              </div>
            </div>

            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
              <input type="color" id="shadow-color-1" value="#000000" style="border: none; width: 40px; height: 32px; cursor: pointer; background: transparent; border-radius: 4px;">
              <span style="font-size: 12px; color: var(--text-muted);">Shadow Color</span>
            </div>

            <label style="font-size: 11px; color: var(--text-muted);">Horizontal Offset</label>
            <div class="slider-group">
              <input type="range" id="shadow-h-1" class="slider-input" min="-80" max="80" value="10">
              <span class="slider-val" id="shadow-h-1-val">10px</span>
            </div>

            <label style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Vertical Offset</label>
            <div class="slider-group">
              <input type="range" id="shadow-v-1" class="slider-input" min="-80" max="80" value="10">
              <span class="slider-val" id="shadow-v-1-val">10px</span>
            </div>

            <label style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Blur Radius</label>
            <div class="slider-group">
              <input type="range" id="shadow-blur-1" class="slider-input" min="0" max="120" value="20">
              <span class="slider-val" id="shadow-blur-1-val">20px</span>
            </div>

            <label style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Spread Radius</label>
            <div class="slider-group">
              <input type="range" id="shadow-spread-1" class="slider-input" min="-30" max="50" value="0">
              <span class="slider-val" id="shadow-spread-1-val">0px</span>
            </div>

            <label style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Opacity</label>
            <div class="slider-group">
              <input type="range" id="shadow-opacity-1" class="slider-input" min="0" max="100" value="35">
              <span class="slider-val" id="shadow-opacity-1-val">35%</span>
            </div>
          </div>

          <!-- Secondary Shadow Activation Toggle -->
          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <label style="font-weight: 700; margin: 0; color: #a855f7;">Enable Shadow Layer 2</label>
              <label class="switch-container" style="position: relative; display: inline-block; width: 36px; height: 20px;">
                <input type="checkbox" id="shadow-layer-2-enable" style="opacity: 0; width: 0; height: 0;">
                <span class="slider-toggle-btn" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--border-color); transition: .3s; border-radius: 20px;"></span>
              </label>
            </div>
          </div>

          <!-- Shadow Layer 2 Panel (Collapsible) -->
          <div class="form-group" id="shadow-layer-2-panel" style="display: none; border-top: 1px dashed var(--border-color); padding-top: 12px; margin-top: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label style="margin: 0; font-weight: 700; color: #a855f7;">Shadow Layer 2</label>
              <div style="display: flex; align-items: center; gap: 6px;">
                <input type="checkbox" id="shadow-inset-2" style="cursor: pointer; width: 14px; height: 14px;">
                <label for="shadow-inset-2" style="font-size: 11px; margin: 0; cursor: pointer; color: var(--text-muted);">Inset</label>
              </div>
            </div>

            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
              <input type="color" id="shadow-color-2" value="#f43f5e" style="border: none; width: 40px; height: 32px; cursor: pointer; background: transparent; border-radius: 4px;">
              <span style="font-size: 12px; color: var(--text-muted);">Shadow Color</span>
            </div>

            <label style="font-size: 11px; color: var(--text-muted);">Horizontal Offset</label>
            <div class="slider-group">
              <input type="range" id="shadow-h-2" class="slider-input" min="-80" max="80" value="-10">
              <span class="slider-val" id="shadow-h-2-val">-10px</span>
            </div>

            <label style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Vertical Offset</label>
            <div class="slider-group">
              <input type="range" id="shadow-v-2" class="slider-input" min="-80" max="80" value="-10">
              <span class="slider-val" id="shadow-v-2-val">-10px</span>
            </div>

            <label style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Blur Radius</label>
            <div class="slider-group">
              <input type="range" id="shadow-blur-2" class="slider-input" min="0" max="120" value="15">
              <span class="slider-val" id="shadow-blur-2-val">15px</span>
            </div>

            <label style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Spread Radius</label>
            <div class="slider-group">
              <input type="range" id="shadow-spread-2" class="slider-input" min="-30" max="50" value="0">
              <span class="slider-val" id="shadow-spread-2-val">0px</span>
            </div>

            <label style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Opacity</label>
            <div class="slider-group">
              <input type="range" id="shadow-opacity-2" class="slider-input" min="0" max="100" value="25">
              <span class="slider-val" id="shadow-opacity-2-val">25%</span>
            </div>
          </div>

          <!-- Box Properties -->
          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 12px;">
            <label style="font-weight: 700;">Box Target Properties</label>
            
            <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 12px; margin-top: 8px;">
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Box Color</span>
                <input type="color" id="box-bg-color" value="#1e293b" style="border: none; width: 45px; height: 32px; cursor: pointer; background: transparent; border-radius: 4px;">
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Border Color</span>
                <input type="color" id="box-border-color" value="#00f2fe" style="border: none; width: 45px; height: 32px; cursor: pointer; background: transparent; border-radius: 4px;">
              </div>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 16px;">
                <input type="checkbox" id="box-border-enable" style="cursor: pointer; width: 14px; height: 14px;">
                <label for="box-border-enable" style="font-size: 12px; margin: 0; cursor: pointer;">Enable Border</label>
              </div>
            </div>

            <label style="font-size: 11px; color: var(--text-muted);">Border Radius</label>
            <div class="slider-group">
              <input type="range" id="box-radius" class="slider-input" min="0" max="60" value="16">
              <span class="slider-val" id="box-radius-val">16px</span>
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

          <!-- Preview Area Showcase -->
          <div id="shadow-showcase-container" class="glass-bg-mesh" style="min-height: 320px; position: relative; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 36px; transition: all 0.3s ease; user-select: none;">
            
            <!-- Instructions Overlay inside Canvas -->
            <div style="position: absolute; bottom: 8px; left: 8px; font-size: 10px; color: rgba(255,255,255,0.4); pointer-events: none; display: flex; align-items: center; gap: 4px;">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              <span>Click & drag the box to move Layer 1 shadow</span>
            </div>

            <!-- Target Box Visual Preview -->
            <div id="shadow-target-box" style="width: 140px; height: 140px; background-color: #1e293b; border-radius: 16px; cursor: move; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ffffff; text-align: center; font-weight: bold; position: relative; z-index: 10; transition: transform 0.15s ease;">
              <span style="font-size: 14px; letter-spacing: 0.5px; opacity: 0.9;">Target Box</span>
              <span id="drag-coordinates-label" style="font-size: 10px; opacity: 0.6; margin-top: 4px; font-family: monospace;">(H: 10, V: 10)</span>
            </div>
          </div>

          <!-- CSS Code Export -->
          <div class="form-group" style="margin-top: 16px;">
            <div class="panel-header" style="border: none; padding: 0; margin-bottom: 6px;">
              <label>CSS Style Output</label>
              <button class="tool-btn accent-emerald" id="shadow-copy-btn" style="font-size: 11px;"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Code</button>
            </div>
            <pre class="output-pre" id="shadow-css-output" style="max-height: 180px; font-family: monospace; font-size: 12px; overflow-x: auto; color: #34d399;"></pre>
          </div>
        </div>

        <!-- Quick Guide -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Box Shadow Pro Guide</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Visual Control</strong>: Click and drag the Target Box inside the preview screen to visually reposition the shadow offsets in real-time.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Multi-layered Shadows</strong>: Enable <strong>Shadow Layer 2</strong> to create stunning 3-dimensional floating effects or dual-color ambient cyberpunk neon glows.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Browser Copy</strong>: Click the <strong>Copy Code</strong> button to instantly save your generated styles to the clipboard.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  
  init(container, appInstance) {
    // Sliders & pickers - Layer 1
    const shadowH1 = container.querySelector("#shadow-h-1");
    const shadowV1 = container.querySelector("#shadow-v-1");
    const shadowBlur1 = container.querySelector("#shadow-blur-1");
    const shadowSpread1 = container.querySelector("#shadow-spread-1");
    const shadowColor1 = container.querySelector("#shadow-color-1");
    const shadowOpacity1 = container.querySelector("#shadow-opacity-1");
    const shadowInset1 = container.querySelector("#shadow-inset-1");

    // Labels - Layer 1
    const shadowH1Val = container.querySelector("#shadow-h-1-val");
    const shadowV1Val = container.querySelector("#shadow-v-1-val");
    const shadowBlur1Val = container.querySelector("#shadow-blur-1-val");
    const shadowSpread1Val = container.querySelector("#shadow-spread-1-val");
    const shadowOpacity1Val = container.querySelector("#shadow-opacity-1-val");

    // Layer 2 Elements
    const layer2Enable = container.querySelector("#shadow-layer-2-enable");
    const layer2Panel = container.querySelector("#shadow-layer-2-panel");
    const shadowH2 = container.querySelector("#shadow-h-2");
    const shadowV2 = container.querySelector("#shadow-v-2");
    const shadowBlur2 = container.querySelector("#shadow-blur-2");
    const shadowSpread2 = container.querySelector("#shadow-spread-2");
    const shadowColor2 = container.querySelector("#shadow-color-2");
    const shadowOpacity2 = container.querySelector("#shadow-opacity-2");
    const shadowInset2 = container.querySelector("#shadow-inset-2");

    // Labels - Layer 2
    const shadowH2Val = container.querySelector("#shadow-h-2-val");
    const shadowV2Val = container.querySelector("#shadow-v-2-val");
    const shadowBlur2Val = container.querySelector("#shadow-blur-2-val");
    const shadowSpread2Val = container.querySelector("#shadow-spread-2-val");
    const shadowOpacity2Val = container.querySelector("#shadow-opacity-2-val");

    // Target Box Controls
    const boxBgColor = container.querySelector("#box-bg-color");
    const boxBorderColor = container.querySelector("#box-border-color");
    const boxBorderEnable = container.querySelector("#box-border-enable");
    const boxRadius = container.querySelector("#box-radius");
    const boxRadiusVal = container.querySelector("#box-radius-val");

    // Showcase Elements
    const targetBox = container.querySelector("#shadow-target-box");
    const showcaseContainer = container.querySelector("#shadow-showcase-container");
    const bgSelect = container.querySelector("#preview-bg-select");
    const cssOutput = container.querySelector("#shadow-css-output");
    const dragCoordsLabel = container.querySelector("#drag-coordinates-label");

    // Custom CSS for toggle slider styling
    const styleTag = document.createElement("style");
    styleTag.id = "box-shadow-toggle-custom-css";
    styleTag.innerHTML = `
      #shadow-layer-2-enable:checked + .slider-toggle-btn {
        background-color: #a855f7 !important;
      }
      #shadow-layer-2-enable:checked + .slider-toggle-btn:before {
        transform: translateX(16px);
      }
      .slider-toggle-btn:before {
        position: absolute;
        content: "";
        height: 14px;
        width: 14px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: .3s;
        border-radius: 50%;
      }
    `;
    document.head.appendChild(styleTag);

    // Hex to RGBA conversion helper
    const hexToRgba = (hex, opacityPercent) => {
      const bigint = parseInt(hex.replace("#", ""), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      const opacity = parseInt(opacityPercent) / 100;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    // Style Calculation & Rendering
    const updateShadows = () => {
      // 1. Fetch values
      const h1 = parseInt(shadowH1.value);
      const v1 = parseInt(shadowV1.value);
      const b1 = parseInt(shadowBlur1.value);
      const s1 = parseInt(shadowSpread1.value);
      const c1 = shadowColor1.value;
      const o1 = shadowOpacity1.value;
      const isInset1 = shadowInset1.checked;

      // 2. Update Labels Layer 1
      shadowH1Val.innerText = `${h1}px`;
      shadowV1Val.innerText = `${v1}px`;
      shadowBlur1Val.innerText = `${b1}px`;
      shadowSpread1Val.innerText = `${s1}px`;
      shadowOpacity1Val.innerText = `${o1}%`;
      dragCoordsLabel.innerText = `(H: ${h1}, V: ${v1})`;

      // 3. Build Shadow Layer 1 CSS
      const color1Rgba = hexToRgba(c1, o1);
      const shadow1Part = `${isInset1 ? 'inset ' : ''}${h1}px ${v1}px ${b1}px ${s1}px ${color1Rgba}`;

      let fullShadowStyle = shadow1Part;
      let cssTextShadowLine = shadow1Part;

      // 4. If Layer 2 enabled, integrate it
      const l2Enabled = layer2Enable.checked;
      if (l2Enabled) {
        layer2Panel.style.display = "block";
        
        const h2 = parseInt(shadowH2.value);
        const v2 = parseInt(shadowV2.value);
        const b2 = parseInt(shadowBlur2.value);
        const s2 = parseInt(shadowSpread2.value);
        const c2 = shadowColor2.value;
        const o2 = shadowOpacity2.value;
        const isInset2 = shadowInset2.checked;

        shadowH2Val.innerText = `${h2}px`;
        shadowV2Val.innerText = `${v2}px`;
        shadowBlur2Val.innerText = `${b2}px`;
        shadowSpread2Val.innerText = `${s2}px`;
        shadowOpacity2Val.innerText = `${o2}%`;

        const color2Rgba = hexToRgba(c2, o2);
        const shadow2Part = `${isInset2 ? 'inset ' : ''}${h2}px ${v2}px ${b2}px ${s2}px ${color2Rgba}`;
        
        fullShadowStyle = `${shadow1Part}, ${shadow2Part}`;
        cssTextShadowLine = `\n  ${shadow1Part},\n  ${shadow2Part}`;
      } else {
        layer2Panel.style.display = "none";
      }

      // 5. Update Target Box
      const radiusVal = parseInt(boxRadius.value);
      boxRadiusVal.innerText = `${radiusVal}px`;
      
      targetBox.style.backgroundColor = boxBgColor.value;
      targetBox.style.borderRadius = `${radiusVal}px`;
      targetBox.style.boxShadow = fullShadowStyle;

      if (boxBorderEnable.checked) {
        targetBox.style.border = `2px solid ${boxBorderColor.value}`;
      } else {
        targetBox.style.border = "none";
      }

      // 6. Write CSS code representation
      const borderCSS = boxBorderEnable.checked ? `\n  border: 2px solid ${boxBorderColor.value};` : "";
      const cssString = `.preview-box {
  width: 140px;
  height: 140px;
  background-color: ${boxBgColor.value};
  border-radius: ${radiusVal}px;${borderCSS}
  box-shadow: ${cssTextShadowLine};
}`;
      cssOutput.innerText = cssString;
    };

    // Drag-to-offset implementation (Very Premium!)
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startH1 = 0;
    let startV1 = 0;

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      // Scale movements slightly for finer control
      const newH = Math.min(80, Math.max(-80, startH1 + Math.round(deltaX / 1.5)));
      const newV = Math.min(80, Math.max(-80, startV1 + Math.round(deltaY / 1.5)));

      shadowH1.value = newH;
      shadowV1.value = newV;
      
      updateShadows();
    };

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        targetBox.style.transform = "scale(1)";
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      }
    };

    targetBox.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startH1 = parseInt(shadowH1.value);
      startV1 = parseInt(shadowV1.value);
      
      targetBox.style.transform = "scale(0.98)";
      
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      
      e.preventDefault();
    });

    // Inputs collection for standard listener bindings
    const controlInputs = [
      shadowH1, shadowV1, shadowBlur1, shadowSpread1, shadowColor1, shadowOpacity1, shadowInset1,
      layer2Enable, shadowH2, shadowV2, shadowBlur2, shadowSpread2, shadowColor2, shadowOpacity2, shadowInset2,
      boxBgColor, boxBorderColor, boxBorderEnable, boxRadius
    ];
    controlInputs.forEach(input => input?.addEventListener("input", updateShadows));

    // Preset options
    container.querySelector("#shadow-preset-soft")?.addEventListener("click", () => {
      // Setup Soft Ambient
      shadowH1.value = "0";
      shadowV1.value = "15";
      shadowBlur1.value = "30";
      shadowSpread1.value = "0";
      shadowColor1.value = "#000000";
      shadowOpacity1.value = "25";
      shadowInset1.checked = false;

      layer2Enable.checked = true;
      shadowH2.value = "0";
      shadowV2.value = "4";
      shadowBlur2.value = "10";
      shadowSpread2.value = "-2";
      shadowColor2.value = "#000000";
      shadowOpacity2.value = "15";
      shadowInset2.checked = false;

      boxBgColor.value = "#ffffff";
      boxRadius.value = "16";
      boxBorderEnable.checked = false;

      updateShadows();
      appInstance.showToast("Loaded Soft Ambient Preset", "info");
    });

    container.querySelector("#shadow-preset-cyber")?.addEventListener("click", () => {
      // Setup Cyber Floating
      shadowH1.value = "12";
      shadowV1.value = "12";
      shadowBlur1.value = "0";
      shadowSpread1.value = "0";
      shadowColor1.value = "#00f2fe";
      shadowOpacity1.value = "60";
      shadowInset1.checked = false;

      layer2Enable.checked = true;
      shadowH2.value = "-12";
      shadowV2.value = "-12";
      shadowBlur2.value = "25";
      shadowSpread2.value = "0";
      shadowColor2.value = "#a855f7";
      shadowOpacity2.value = "35";
      shadowInset2.checked = false;

      boxBgColor.value = "#030712";
      boxRadius.value = "12";
      boxBorderEnable.checked = true;
      boxBorderColor.value = "#00f2fe";

      updateShadows();
      appInstance.showToast("Loaded Cyber Floating 3D Preset", "info");
    });

    container.querySelector("#shadow-preset-neon")?.addEventListener("click", () => {
      // Setup Neon Dual Glow
      shadowH1.value = "8";
      shadowV1.value = "8";
      shadowBlur1.value = "16";
      shadowSpread1.value = "0";
      shadowColor1.value = "#00f2fe";
      shadowOpacity1.value = "50";
      shadowInset1.checked = false;

      layer2Enable.checked = true;
      shadowH2.value = "-8";
      shadowV2.value = "-8";
      shadowBlur2.value = "16";
      shadowSpread2.value = "0";
      shadowColor2.value = "#f43f5e";
      shadowOpacity2.value = "45";
      shadowInset2.checked = false;

      boxBgColor.value = "#0f172a";
      boxRadius.value = "20";
      boxBorderEnable.checked = false;

      updateShadows();
      appInstance.showToast("Loaded Dual Neon Ambient Glow", "info");
    });

    container.querySelector("#shadow-preset-inset")?.addEventListener("click", () => {
      // Setup Inner Glow
      shadowH1.value = "0";
      shadowV1.value = "0";
      shadowBlur1.value = "20";
      shadowSpread1.value = "2";
      shadowColor1.value = "#00f2fe";
      shadowOpacity1.value = "60";
      shadowInset1.checked = true;

      layer2Enable.checked = false;

      boxBgColor.value = "#09090b";
      boxRadius.value = "12";
      boxBorderEnable.checked = true;
      boxBorderColor.value = "#1f2937";

      updateShadows();
      appInstance.showToast("Loaded Inner Inset Glow Preset", "info");
    });

    // Background showcase canvas toggle
    bgSelect?.addEventListener("change", (e) => {
      const bg = e.target.value;
      showcaseContainer.className = "";
      
      if (bg === "cyber-mesh") {
        showcaseContainer.className = "glass-bg-mesh";
      } else if (bg === "polka-dots") {
        showcaseContainer.className = "glass-bg-dots";
      } else if (bg === "sunset-glow") {
        showcaseContainer.className = "glass-bg-sunset";
      } else {
        showcaseContainer.className = "glass-bg-dark";
      }
    });

    // Copy to clipboard
    container.querySelector("#shadow-copy-btn")?.addEventListener("click", () => {
      appInstance.copyText(cssOutput.innerText);
    });

    // Destructor to clean up style tags on tool switch
    this._cleanup = () => {
      const el = document.getElementById("box-shadow-toggle-custom-css");
      if (el) el.remove();
    };

    // Run initial update
    updateShadows();
  },
  
  destroy() {
    if (this._cleanup) {
      this._cleanup();
    }
  }
};
