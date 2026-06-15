// SVG Animation Studio & Path Visualizer for OmniTool Hub

export default {
  id: "svg-animator",
  name: "SVG Animation Studio",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>SVG & Animation Input</h3>
          </div>
          
          <div class="form-group">
            <label for="svg-raw-input">Raw SVG Code</label>
            <textarea id="svg-raw-input" class="input-textarea" style="min-height: 120px; font-family: monospace; font-size: 11px;" placeholder="Paste your raw XML <svg> code here..."></textarea>
          </div>

          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <button class="tool-btn secondary" id="svg-sample-1" style="font-size: 11px; padding: 6px 10px;">Load Cyber Logo</button>
            <button class="tool-btn secondary" id="svg-sample-2" style="font-size: 11px; padding: 6px 10px;">Load Heart Icon</button>
          </div>

          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 14px;">
            <label for="svg-preset">Animation Preset</label>
            <select id="svg-preset" class="form-select">
              <option value="stroke-draw">Self-Drawing Path</option>
              <option value="spin">Rotational Spin (360°)</option>
              <option value="float">Cyber Float (Hovering)</option>
              <option value="pulse">Neon Heartbeat Pulse</option>
              <option value="neon-flicker">Neon Flicker (Cyberpunk)</option>
              <option value="float-rotate">Float &amp; Rotate Combo</option>
              <option value="pulse-spin">Pulse &amp; Spin Combo</option>
            </select>
          </div>

          <div class="form-group">
            <label>Animation Duration</label>
            <div class="slider-group">
              <input type="range" id="svg-duration" class="slider-input" min="5" max="100" value="20">
              <span class="slider-val" id="svg-duration-val">2.0s</span>
            </div>
          </div>

          <div class="form-group">
            <label for="svg-easing">Transition Easing</label>
            <select id="svg-easing" class="form-select">
              <option value="linear">Linear</option>
              <option value="ease" selected>Ease (Smooth Start/End)</option>
              <option value="ease-in-out">Ease-In-Out</option>
              <option value="cubic-bezier(0.4, 0, 0.2, 1)">Material Cubic Easing</option>
            </select>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="svg-neon-glow" checked>
              Apply Neon Glow Filter
            </label>
          </div>

          <div class="form-group" id="svg-glow-color-box">
            <label for="svg-glow-color">Neon Glow Color</label>
            <div style="display: flex; gap: 12px; align-items: center;">
              <input type="color" id="svg-glow-color" value="#00f2fe" style="border: none; width: 45px; height: 35px; cursor: pointer; background: transparent;">
              <span style="font-size: 12px; color: var(--text-muted);">Choose glow color</span>
            </div>
          </div>

          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 10px;">
            <label class="checkbox-label">
              <input type="checkbox" id="svg-color-override">
              Override Base Vector Color
            </label>
          </div>

          <div class="form-group" id="svg-base-color-box" style="display: none;">
            <label for="svg-base-color">Primary Vector Color</label>
            <div style="display: flex; gap: 12px; align-items: center;">
              <input type="color" id="svg-base-color" value="#00f2fe" style="border: none; width: 45px; height: 35px; cursor: pointer; background: transparent;">
              <span style="font-size: 12px; color: var(--text-muted);">Choose vector color</span>
            </div>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="svg-stroke-override">
              Override Vector Stroke Width
            </label>
          </div>

          <div class="form-group" id="svg-stroke-width-box" style="display: none;">
            <label>Stroke Width</label>
            <div class="slider-group">
              <input type="range" id="svg-stroke-width" class="slider-input" min="1" max="10" step="0.5" value="2.5">
              <span class="slider-val" id="svg-stroke-width-val">2.5px</span>
            </div>
          </div>

          <div class="form-group">
            <label>Scale Factor</label>
            <div class="slider-group">
              <input type="range" id="svg-scale" class="slider-input" min="50" max="150" value="100">
              <span class="slider-val" id="svg-scale-val">100%</span>
            </div>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Animated Preview</h3>
          </div>
          
          <!-- Interactive Preview Screen -->
          <div style="display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(0,0,0,0.3); border-radius: 8px; min-height: 250px; position: relative; overflow: hidden;">
            <style id="svg-preview-inline-css"></style>
            <div id="svg-preview-container" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; min-height: 220px; transition: transform 0.2s ease;">
              <!-- Target animated SVG renders here -->
            </div>
          </div>

          <div class="form-group" style="margin-top: 16px;">
            <div class="panel-header" style="border: none; padding: 0; margin-bottom: 6px;">
              <label>Export Animated SVG File Code</label>
              <button class="tool-btn accent-emerald" id="svg-copy-btn" style="font-size: 11px;"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Code</button>
            </div>
            <pre class="output-pre" id="svg-output-code" style="max-height: 180px; font-family: monospace; font-size: 11px; overflow-x: auto; white-space: pre; text-align: left;"></pre>
          </div>

          <button class="tool-btn primary" id="svg-download-btn" style="width: 100%; font-weight: 700; margin-top: 8px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14" style="margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Download Animated SVG File
          </button>
        </div>

        <!-- Quick Guide & Instruction Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide &amp; SVG Path Drawing</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Load/Paste SVG</strong>: Paste code or click presets. The visualizer parses shapes and tags.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Self-Drawing Mechanism</strong>: Selecting 'Self-Drawing Path' automatically measures vectors using <code>path.getTotalLength()</code>, injecting customized stroke limits keyframes. Note: Your SVG paths must have a <code>stroke</code> property for this to animate.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Export &amp; Run</strong>: Export bundles containing embedded CSS classes and download vector files.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const rawInput = container.querySelector("#svg-raw-input");
    const presetSelect = container.querySelector("#svg-preset");
    const durationSlider = container.querySelector("#svg-duration");
    const durationVal = container.querySelector("#svg-duration-val");
    const easingSelect = container.querySelector("#svg-easing");
    const glowCheck = container.querySelector("#svg-neon-glow");
    const glowColor = container.querySelector("#svg-glow-color");
    const glowColorBox = container.querySelector("#svg-glow-color-box");

    const colorOverrideCheck = container.querySelector("#svg-color-override");
    const baseColorInput = container.querySelector("#svg-base-color");
    const baseColorBox = container.querySelector("#svg-base-color-box");

    const strokeOverrideCheck = container.querySelector("#svg-stroke-override");
    const strokeWidthSlider = container.querySelector("#svg-stroke-width");
    const strokeWidthVal = container.querySelector("#svg-stroke-width-val");
    const strokeWidthBox = container.querySelector("#svg-stroke-width-box");

    const scaleSlider = container.querySelector("#svg-scale");
    const scaleVal = container.querySelector("#svg-scale-val");

    const previewContainer = container.querySelector("#svg-preview-container");
    const inlineCss = container.querySelector("#svg-preview-inline-css");
    const outputCode = container.querySelector("#svg-output-code");
    const copyBtn = container.querySelector("#svg-copy-btn");
    const downloadBtn = container.querySelector("#svg-download-btn");

    const sample1Btn = container.querySelector("#svg-sample-1");
    const sample2Btn = container.querySelector("#svg-sample-2");
    const previewClass = "svg-animated-preview-target";

    // Sample SVGs
    const sampleCyberLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#00f2fe" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" width="120" height="120">
  <!-- Outer brackets -->
  <path d="M 25,10 H 10 V 25" />
  <path d="M 75,10 H 90 V 25" />
  <path d="M 25,90 H 10 V 75" />
  <path d="M 75,90 H 90 V 75" />
  
  <!-- Cyber Hexagon core -->
  <path d="M 50,22 L 80,40 L 80,60 L 50,78 L 20,60 L 20,40 Z" />
  <path d="M 50,32 L 68,42 L 68,58 L 50,68 L 32,58 L 32,42 Z" />
</svg>`;

    const sampleHeart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="#f43f5e" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" width="100" height="100">
  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
</svg>`;

    // Toggle glow display
    glowCheck?.addEventListener("change", (e) => {
      glowColorBox.style.display = e.target.checked ? "flex" : "none";
      updateAnimation();
    });

    // Toggle color override
    colorOverrideCheck?.addEventListener("change", (e) => {
      baseColorBox.style.display = e.target.checked ? "flex" : "none";
      updateAnimation();
    });

    // Toggle stroke override
    strokeOverrideCheck?.addEventListener("change", (e) => {
      strokeWidthBox.style.display = e.target.checked ? "flex" : "none";
      updateAnimation();
    });

    strokeWidthSlider?.addEventListener("input", (e) => {
      strokeWidthVal.innerText = `${parseFloat(e.target.value).toFixed(1)}px`;
      updateAnimation();
    });

    durationSlider?.addEventListener("input", (e) => {
      durationVal.innerText = `${(e.target.value / 10).toFixed(1)}s`;
      updateAnimation();
    });

    scaleSlider?.addEventListener("input", (e) => {
      scaleVal.innerText = `${e.target.value}%`;
      previewContainer.style.transform = `scale(${e.target.value / 100})`;
    });

    // Helper: Find first svg tag in code
    const parseSvg = (rawText) => {
      try {
        let cleanText = rawText.trim();
        if (cleanText.includes("<svg") && !cleanText.includes("xmlns=")) {
          cleanText = cleanText.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        const parser = new DOMParser();
        const doc = parser.parseFromString(cleanText, "image/svg+xml");
        const parserError = doc.querySelector("parsererror");
        if (parserError) return null;
        return doc.querySelector("svg");
      } catch (e) {
        return null;
      }
    };

    const updateAnimation = () => {
      const rawText = rawInput.value.trim();
      if (!rawText) {
        inlineCss.textContent = "";
        previewContainer.innerHTML = `<span style="color: var(--text-muted); font-size: 13px;">Enter SVG code to preview...</span>`;
        outputCode.innerText = "";
        return;
      }

      const svgNode = parseSvg(rawText);
      if (!svgNode) {
        inlineCss.textContent = "";
        previewContainer.innerHTML = `<span style="color: var(--accent-rose); font-size: 13px;">Error: Invalid SVG XML markup</span>`;
        outputCode.innerText = "";
        return;
      }

      // Adopt the parsed SVG node to the current document context for robust CSS styling/interactions
      const adoptedSvg = document.importNode(svgNode, true);

      // Read values
      const preset = presetSelect.value;
      const duration = durationSlider.value / 10; // in seconds
      const easing = easingSelect.value;
      const hasGlow = glowCheck.checked;
      const glowCol = glowColor.value;

      const overrideColor = colorOverrideCheck?.checked || false;
      const baseCol = baseColorInput?.value || "#00f2fe";
      const overrideStroke = strokeOverrideCheck?.checked || false;
      const strokeW = parseFloat(strokeWidthSlider?.value || "2.5");

      // Reset styles and inject custom class
      adoptedSvg.classList.add(previewClass);
      adoptedSvg.setAttribute("role", "img");
      adoptedSvg.setAttribute("aria-label", "Animated SVG preview");
      const existingSvgStyle = adoptedSvg.getAttribute("style");
      adoptedSvg.setAttribute("style", `${existingSvgStyle ? `${existingSvgStyle}; ` : ""}color: ${glowCol};`);

      // Generate keyframe CSS declarations
      let keyframes = "";
      let inlineStyle = "";
      
      const filterStyle = hasGlow ? `filter: drop-shadow(0 0 8px ${glowCol}) drop-shadow(0 0 3px ${glowCol});` : "";

      // Build SVG color and stroke width override CSS rules
      let overrideCss = "";
      if (overrideColor) {
        overrideCss += `
          .${previewClass} path, .${previewClass} circle, .${previewClass} rect, .${previewClass} ellipse, .${previewClass} line, .${previewClass} polyline, .${previewClass} polygon {
            stroke: ${baseCol} !important;
          }
        `;
      }
      if (overrideStroke) {
        overrideCss += `
          .${previewClass} path, .${previewClass} circle, .${previewClass} rect, .${previewClass} ellipse, .${previewClass} line, .${previewClass} polyline, .${previewClass} polygon {
            stroke-width: ${strokeW}px !important;
          }
        `;
      }

      if (preset === "stroke-draw") {
        // Measure paths lengths client-side dynamically
        previewContainer.innerHTML = "";
        previewContainer.appendChild(adoptedSvg);

        // Find all paths/shapes in the DOM preview
        const paths = adoptedSvg.querySelectorAll("path, circle, rect, ellipse, line, polyline, polygon");
        let pathStyles = "";
        
        paths.forEach((path, index) => {
          let length = 0;
          try {
            if (typeof path.getTotalLength === 'function') {
              length = path.getTotalLength();
            } else {
              length = 300;
            }
          } catch (e) {
            length = 300;
          }
          
          // Check if path inherits stroke, if not fallback to currentColor
          let hasStroke = false;
          let currentEl = path;
          while (currentEl && currentEl !== adoptedSvg.parentNode) {
            if (currentEl.getAttribute("stroke")) {
              hasStroke = true;
              break;
            }
            currentEl = currentEl.parentElement;
          }
          if (!hasStroke) {
            path.setAttribute("stroke", "currentColor");
            if (!path.getAttribute("stroke-width")) {
              path.setAttribute("stroke-width", "1.5");
            }
          }

          const className = `draw-path-${index}`;
          path.classList.add(className);
          
          pathStyles += `
.${previewClass} .${className} {
  stroke-dasharray: ${length.toFixed(1)};
  stroke-dashoffset: ${length.toFixed(1)};
  animation: draw-anim-${index} ${duration}s ${easing} infinite alternate;
}
@keyframes draw-anim-${index} {
  from {
    stroke-dashoffset: ${length.toFixed(1)};
  }
  to {
    stroke-dashoffset: 0;
  }
}`;
        });

        keyframes = pathStyles;
        inlineStyle = `.${previewClass} {
          max-width: 100%;
          max-height: 220px;
          min-width: 120px;
          min-height: 120px;
          overflow: visible;
          ${filterStyle}
        }
        ${keyframes}`;
      } else if (preset === "spin") {
        keyframes = `@keyframes spin-anim {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }`;
        inlineStyle = `.${previewClass} {
          max-width: 100%;
          max-height: 220px;
          min-width: 120px;
          min-height: 120px;
          transform-origin: center;
          transform-box: fill-box;
          animation: spin-anim ${duration}s ${easing} infinite;
          ${filterStyle}
        }
        ${keyframes}`;
      } else if (preset === "float") {
        keyframes = `@keyframes float-anim {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
          100% { transform: translateY(0px); }
        }`;
        inlineStyle = `.${previewClass} {
          max-width: 100%;
          max-height: 220px;
          min-width: 120px;
          min-height: 120px;
          overflow: visible;
          animation: float-anim ${duration}s ${easing} infinite;
          ${filterStyle}
        }
        ${keyframes}`;
      } else if (preset === "pulse") {
        keyframes = `@keyframes pulse-anim {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
          100% { transform: scale(1); opacity: 1; }
        }`;
        inlineStyle = `.${previewClass} {
          max-width: 100%;
          max-height: 220px;
          min-width: 120px;
          min-height: 120px;
          transform-origin: center;
          transform-box: fill-box;
          animation: pulse-anim ${duration}s ${easing} infinite;
          ${filterStyle}
        }
        ${keyframes}`;
      } else if (preset === "neon-flicker") {
        keyframes = `@keyframes flicker-anim {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 8px ${glowCol}) drop-shadow(0 0 3px ${glowCol});
          }
          20%, 24%, 55% {
            opacity: 0.35;
            filter: none;
          }
        }`;
        inlineStyle = `.${previewClass} {
          max-width: 100%;
          max-height: 220px;
          min-width: 120px;
          min-height: 120px;
          overflow: visible;
          animation: flicker-anim ${duration}s linear infinite;
        }
        ${keyframes}`;
      } else if (preset === "float-rotate") {
        keyframes = `@keyframes float-rotate-anim {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
          100% { transform: translateY(0px) rotate(360deg); }
        }`;
        inlineStyle = `.${previewClass} {
          max-width: 100%;
          max-height: 220px;
          min-width: 120px;
          min-height: 120px;
          transform-origin: center;
          transform-box: fill-box;
          animation: float-rotate-anim ${duration}s ${easing} infinite;
          ${filterStyle}
        }
        ${keyframes}`;
      } else if (preset === "pulse-spin") {
        keyframes = `@keyframes pulse-spin-anim {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.08) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }`;
        inlineStyle = `.${previewClass} {
          max-width: 100%;
          max-height: 220px;
          min-width: 120px;
          min-height: 120px;
          transform-origin: center;
          transform-box: fill-box;
          animation: pulse-spin-anim ${duration}s ${easing} infinite;
          ${filterStyle}
        }
        ${keyframes}`;
      }

      // Inject the base/stroke overrides
      inlineStyle += overrideCss;

      // Apply stylesheet
      inlineCss.textContent = inlineStyle;
      
      if (preset !== "stroke-draw") {
        previewContainer.innerHTML = "";
        previewContainer.appendChild(adoptedSvg);
      }

      // Generate animated SVG output
      const cleanInlineStyle = inlineStyle.replace(/\s+/g, ' ').trim();
      const animatedSvgCode = adoptedSvg.outerHTML.replace(">", `><style>${cleanInlineStyle}</style>`);
      outputCode.innerText = animatedSvgCode;

      // Download handler
      downloadBtn.onclick = () => {
        const blob = new Blob([animatedSvgCode], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "cyber_animated.svg";
        link.click();
        appInstance.showToast("Downloaded animated SVG!", "success");
      };
    };

    // Load sample listeners
    sample1Btn?.addEventListener("click", () => {
      rawInput.value = sampleCyberLogo;
      presetSelect.value = "stroke-draw";
      glowCheck.checked = true;
      glowColor.value = "#00f2fe";
      glowColorBox.style.display = "flex";
      colorOverrideCheck.checked = false;
      baseColorBox.style.display = "none";
      strokeOverrideCheck.checked = false;
      strokeWidthBox.style.display = "none";
      updateAnimation();
      appInstance.showToast("Loaded Cyber Logo template!", "info");
    });

    sample2Btn?.addEventListener("click", () => {
      rawInput.value = sampleHeart;
      presetSelect.value = "pulse";
      glowCheck.checked = true;
      glowColor.value = "#f43f5e";
      glowColorBox.style.display = "flex";
      colorOverrideCheck.checked = false;
      baseColorBox.style.display = "none";
      strokeOverrideCheck.checked = false;
      strokeWidthBox.style.display = "none";
      updateAnimation();
      appInstance.showToast("Loaded Pulse Heart template!", "info");
    });

    // Inputs bindings
    const inputs = [rawInput, presetSelect, durationSlider, easingSelect, glowCheck, glowColor, colorOverrideCheck, baseColorInput, strokeOverrideCheck, strokeWidthSlider];
    inputs.forEach(el => el?.addEventListener("change", updateAnimation));
    rawInput?.addEventListener("input", updateAnimation);

    // Copy handler
    copyBtn?.addEventListener("click", () => {
      appInstance.copyText(outputCode.innerText);
    });

    // Load initial sample
    rawInput.value = sampleCyberLogo;
    updateAnimation();
  }
};
