// SVG Animation Studio & Path Visualizer for OmniTool Hub

export default {
  id: "svg-animator",
  name: "SVG Animation Studio",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <h3 style="margin: 0;">Configuration</h3>
            <!-- Tabs inside config panel -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 100%; flex-wrap: wrap;" id="svg-suite-tabs">
              <button class="keyboard-tab active" data-tab="animator" style="font-size: 11px; padding: 4px 8px;">Preset Animator</button>
              <button class="keyboard-tab" data-tab="morph" style="font-size: 11px; padding: 4px 8px;">Path Morph Studio</button>
            </div>
          </div>
          
          <!-- TAB 1: Preset Animator Controls -->
          <div id="panel-animator-controls" class="tab-control-panel">
            <div class="form-group">
              <label for="svg-raw-input">Raw SVG Code</label>
              <textarea id="svg-raw-input" class="input-textarea" style="min-height: 120px; font-family: monospace; font-size: 11px;" placeholder="Paste your raw XML <svg> code here..."></textarea>
            </div>

            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
              <button class="tool-btn secondary" id="svg-sample-1" style="font-size: 11px; padding: 6px 10px;">Load Cyber Logo</button>
              <button class="tool-btn secondary" id="svg-sample-2" style="font-size: 11px; padding: 6px 10px;">Load Heart Icon</button>
            </div>

            <div style="display: flex; gap: 8px; margin-bottom: 12px;">
              <button class="tool-btn secondary" id="svg-import-shape-btn" style="font-size: 11px; padding: 6px 10px; flex: 1;" title="Import shape from shared registry">Import Shared Shape</button>
              <button class="tool-btn secondary" id="svg-export-shape-btn" style="font-size: 11px; padding: 6px 10px; flex: 1;" title="Export current path coordinates to shared registry">Export Path to Shared</button>
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

          <!-- TAB 2: Path Morph Studio Controls -->
          <div id="panel-morph-controls" class="tab-control-panel hidden">
            <div class="form-group">
              <label for="morph-preset">Select Morph Preset</label>
              <select id="morph-preset" class="form-select" style="width: 100%;">
                <option value="pentagon-star" selected>Pentagon to Star (10 Vertices)</option>
                <option value="square-circle">Square to Circle (8 Vertices)</option>
                <option value="triangle-rhombus">Triangle to Rhombus (4 Vertices)</option>
                <option value="custom-4">Custom Shape (4 Vertices)</option>
                <option value="custom-8">Custom Shape (8 Vertices)</option>
              </select>
            </div>

            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <label>Edit Target Frame</label>
              <div style="display: flex; gap: 8px; width: 100%; margin-bottom: 6px;">
                <button class="tool-btn secondary active" id="morph-frame-start-btn" style="flex: 1; justify-content: center;">Start Frame</button>
                <button class="tool-btn secondary" id="morph-frame-end-btn" style="flex: 1; justify-content: center;">End Frame</button>
              </div>
              <div style="display: flex; gap: 8px; width: 100%;">
                <button class="tool-btn secondary" id="morph-import-shape-btn" style="flex: 1; justify-content: center; font-size: 10px; padding: 4px 0;" title="Import shape from shared registry">Import Shape</button>
                <button class="tool-btn secondary" id="morph-export-shape-btn" style="flex: 1; justify-content: center; font-size: 10px; padding: 4px 0;" title="Export active frame to shared registry">Export Frame</button>
              </div>
            </div>

            <div class="form-group">
              <label>Morph Animation Duration</label>
              <div class="slider-group">
                <input type="range" id="morph-duration" class="slider-input" min="5" max="60" value="20">
                <span class="slider-val" id="morph-duration-val">2.0s</span>
              </div>
            </div>

            <div style="display: flex; gap: 8px; margin-top: 10px; width: 100%;">
              <button class="tool-btn primary" id="morph-play-btn" style="flex: 1.3; justify-content: center; height: 38px;">▶ Play Animation</button>
              <button class="tool-btn secondary" id="morph-reset-btn" style="flex: 0.8; justify-content: center; height: 38px;">Reset Points</button>
            </div>

            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 10px;">
              <label>Active Coordinates (x, y)</label>
              <div id="morph-coords-list" style="display: flex; flex-direction: column; gap: 6px; max-height: 160px; overflow-y: auto; padding-right: 4px; margin-top: 6px;">
                <!-- Coords entries list -->
              </div>
            </div>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Animated Preview</h3>
            <div style="display: flex; gap: 6px;">
              <select id="svg-preview-bg-select" class="form-select" style="padding: 4px 8px; font-size: 11px; width: auto; height: auto;">
                <option value="plain-dark">Dark Minimal</option>
                <option value="cyber-mesh">Cyber Mesh</option>
                <option value="polka-dots">Polka Dots</option>
                <option value="sunset-glow">Sunset Glow</option>
                <option value="plain-light">Light Minimal</option>
              </select>
            </div>
          </div>
          
          <!-- 1. Interactive Preview Screen (Preset Animator) -->
          <div id="svg-showcase-container" class="glass-bg-dark" style="display: flex; align-items: center; justify-content: center; padding: 24px; border-radius: 8px; min-height: 250px; position: relative; overflow: hidden; transition: all 0.3s ease;">
            <style id="svg-preview-inline-css"></style>
            <div id="svg-preview-container" style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; min-height: 220px; transition: transform 0.2s ease;">
              <!-- Target animated SVG renders here -->
            </div>
          </div>

          <!-- 2. Interactive Preview Screen (Morph Path Studio) -->
          <div id="morph-showcase-container" class="hidden" style="flex: 1; position: relative; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 24px; min-height: 250px; background-color: #0b0f19; user-select: none;">
            <div id="morph-workarea" style="position: relative; width: 200px; height: 200px; border: 1px dashed rgba(255,255,255,0.15); background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0); background-size: 20px 20px; overflow: visible;">
              <svg id="morph-svg-element" viewBox="0 0 100 100" style="width: 100%; height: 100%; overflow: visible;">
                <path id="morph-target-path" fill="none" stroke="#00f2fe" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <!-- Drag points go here -->
              <div id="morph-handles-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible;"></div>
            </div>
          </div>

          <div class="form-group" style="margin-top: 16px;">
            <div class="panel-header" style="border: none; padding: 0; margin-bottom: 6px;">
              <label id="svg-output-label">Export Animated SVG File Code</label>
              <button class="tool-btn accent-emerald" id="svg-copy-btn" style="font-size: 11px;"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Code</button>
            </div>
            <pre class="output-pre" id="svg-output-code" style="max-height: 180px; font-family: monospace; font-size: 11px; overflow-x: auto; white-space: pre; text-align: left;"></pre>
          </div>

          <button class="tool-btn primary" id="svg-download-btn" style="width: 100%; font-weight: 700; margin-top: 8px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14" style="margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Download Animated SVG File
          </button>
        </div>

        <!-- Quick Guide & Instruction Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="svg-guide-title">Quick Guide &amp; SVG Path Drawing</span>
            </div>
          </div>
          <div class="tool-guide-steps" id="svg-guide-steps">
            <!-- Dynamically populated -->
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
          margin-top: 15px;
          border-top: 1px solid var(--border-color);
          padding-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .tab-control-panel.hidden {
          display: none !important;
        }
        .morph-handle {
          position: absolute;
          width: 14px;
          height: 14px;
          background: #00f2fe;
          border: 2px solid #ffffff;
          border-radius: 50%;
          cursor: move;
          transform: translate(-7px, -7px);
          box-shadow: 0 0 8px rgba(0, 242, 254, 0.8);
          pointer-events: auto;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .morph-handle:hover, .morph-handle.dragging {
          background: #ff007f;
          border-color: #ffffff;
          box-shadow: 0 0 12px rgba(255, 0, 127, 1);
          transform: translate(-7px, -7px) scale(1.2);
        }
        .morph-coord-row {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 6px;
          padding: 4px 8px;
        }
        .morph-coord-idx {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          width: 18px;
        }
        .morph-coord-val {
          font-family: var(--font-mono);
          font-size: 12px;
          width: 50px;
          background: transparent;
          border: none;
          color: #fff;
          text-align: center;
        }
        .morph-coord-val:focus {
          outline: none;
          border-bottom: 1px solid var(--accent-cyan);
        }
      </style>
    `;
  },
  init(container, appInstance) {
    appInstance.sharedShape = appInstance.sharedShape || null;
    const tabs = container.querySelectorAll("#svg-suite-tabs .keyboard-tab");
    const panelAnimator = container.querySelector("#panel-animator-controls");
    const panelMorph = container.querySelector("#panel-morph-controls");
    
    const showcaseAnimator = container.querySelector("#svg-showcase-container");
    const showcaseMorph = container.querySelector("#morph-showcase-container");

    const guideTitle = container.querySelector("#svg-guide-title");
    const guideSteps = container.querySelector("#svg-guide-steps");
    const outputTitleLabel = container.querySelector("#svg-output-label");
    const outputCode = container.querySelector("#svg-output-code");
    const copyBtn = container.querySelector("#svg-copy-btn");
    const downloadBtn = container.querySelector("#svg-download-btn");

    let activeTab = "animator";

    const guides = {
      animator: {
        title: "Quick Guide & SVG Path Drawing",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Load/Paste SVG</strong>: Paste code or click presets. The visualizer parses shapes and tags.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Self-Drawing Mechanism</strong>: Selecting 'Self-Drawing Path' automatically measures vectors using <code>path.getTotalLength()</code>, injecting customized stroke limits keyframes.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Export &amp; Run</strong>: Export bundles containing embedded CSS classes and download vector files.</div>
          </div>
        `
      },
      morph: {
        title: "Quick Guide: SVG Path Morph Studio",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Select Preset Morph</strong>: Choose a shape transition (e.g. Pentagon to Star) to load matching point counts.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Edit Keyframes</strong>: Toggle between <strong>Start Frame</strong> and <strong>End Frame</strong> and drag handles on the grid to shape each vector node.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Animate &amp; Export</strong>: Click <strong>Play Animation</strong> to preview the SMIL vector morph, copy the SVG, or download the animated vector file.</div>
          </div>
        `
      }
    };

    const switchTab = (tabId, updateRoute = true) => {
      activeTab = tabId;
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));

      panelAnimator.classList.toggle("hidden", tabId !== "animator");
      panelMorph.classList.toggle("hidden", tabId !== "morph");
      showcaseAnimator.classList.toggle("hidden", tabId !== "animator");
      showcaseMorph.classList.toggle("hidden", tabId !== "morph");

      if (guideTitle && guideSteps) {
        guideTitle.innerText = guides[tabId].title;
        guideSteps.innerHTML = guides[tabId].steps;
      }

      if (tabId === "animator") {
        outputTitleLabel.innerText = "Export Animated SVG File Code";
        updateAnimation();
      } else {
        outputTitleLabel.innerText = "Export Morph SVG File Code";
        if (isPlaying) {
          playMorphAnimation();
        } else {
          renderMorphUI();
        }
      }
    
      if (updateRoute && appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("svg-animator", tabId, { pushHistory: true })
    };;
      }

    tabs.forEach(tab => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab, true));
    });

    if (appInstance && typeof appInstance.registerTabSwitcher === "function") {
      appInstance.registerTabSwitcher("svg-animator", (tabId) => switchTab(tabId, false));
    }

    // ==========================================
    // PRESET ANIMATOR CODE
    // ==========================================
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
      if (activeTab !== "animator") return;
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

      const adoptedSvg = document.importNode(svgNode, true);
      const preset = presetSelect.value;
      const duration = durationSlider.value / 10;
      const easing = easingSelect.value;
      const hasGlow = glowCheck.checked;
      const glowCol = glowColor.value;

      const overrideColor = colorOverrideCheck?.checked || false;
      const baseCol = baseColorInput?.value || "#00f2fe";
      const overrideStroke = strokeOverrideCheck?.checked || false;
      const strokeW = parseFloat(strokeWidthSlider?.value || "2.5");

      adoptedSvg.classList.add(previewClass);
      adoptedSvg.setAttribute("role", "img");
      adoptedSvg.setAttribute("aria-label", "Animated SVG preview");
      const existingSvgStyle = adoptedSvg.getAttribute("style");
      adoptedSvg.setAttribute("style", `${existingSvgStyle ? `${existingSvgStyle}; ` : ""}color: ${glowCol};`);

      let keyframes = "";
      let inlineStyle = "";
      const filterStyle = hasGlow ? `filter: drop-shadow(0 0 8px ${glowCol}) drop-shadow(0 0 3px ${glowCol});` : "";

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
        previewContainer.innerHTML = "";
        previewContainer.appendChild(adoptedSvg);

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

      inlineStyle += overrideCss;
      inlineCss.textContent = inlineStyle;
      
      if (preset !== "stroke-draw") {
        previewContainer.innerHTML = "";
        previewContainer.appendChild(adoptedSvg);
      }

      const cleanInlineStyle = inlineStyle.replace(/\s+/g, ' ').trim();
      const animatedSvgCode = adoptedSvg.outerHTML.replace(">", `><style>${cleanInlineStyle}</style>`);
      outputCode.innerText = animatedSvgCode;

      downloadBtn.onclick = () => {
        const blob = new Blob([animatedSvgCode], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "cyber_animated.svg";
        link.click();
        appInstance.showToast("Downloaded animated SVG!", "success");
      };
    };

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

    const inputs = [rawInput, presetSelect, durationSlider, easingSelect, glowCheck, glowColor, colorOverrideCheck, baseColorInput, strokeOverrideCheck, strokeWidthSlider];
    inputs.forEach(el => el?.addEventListener("change", updateAnimation));
    rawInput?.addEventListener("input", updateAnimation);

    // ==========================================
    // PATH MORPH STUDIO CODE
    // ==========================================
    const cpPreset = container.querySelector("#morph-preset");
    const cpStartFrameBtn = container.querySelector("#morph-frame-start-btn");
    const cpEndFrameBtn = container.querySelector("#morph-frame-end-btn");
    const cpDurationSlider = container.querySelector("#morph-duration");
    const cpDurationVal = container.querySelector("#morph-duration-val");
    const cpPlayBtn = container.querySelector("#morph-play-btn");
    const cpResetBtn = container.querySelector("#morph-reset-btn");
    const cpCoordsList = container.querySelector("#morph-coords-list");
    
    const cpWorkarea = container.querySelector("#morph-workarea");
    const cpTargetPath = container.querySelector("#morph-target-path");
    const cpHandlesContainer = container.querySelector("#morph-handles-container");

    let verticesCount = 10;
    let activeFrame = "start";
    let isPlaying = false;
    let startPoints = [];
    let endPoints = [];

    const morphPresets = {
      "pentagon-star": {
        pointsCount: 10,
        start: [{x:50, y:15}, {x:60, y:38}, {x:83, y:39}, {x:64, y:58}, {x:71, y:78}, {x:50, y:67}, {x:29, y:78}, {x:36, y:58}, {x:17, y:39}, {x:40, y:38}],
        end: [{x:50, y:5}, {x:61, y:35}, {x:95, y:35}, {x:68, y:57}, {x:78, y:90}, {x:50, y:70}, {x:22, y:90}, {x:32, y:57}, {x:5, y:35}, {x:39, y:35}]
      },
      "square-circle": {
        pointsCount: 8,
        start: [{x:20, y:20}, {x:50, y:20}, {x:80, y:20}, {x:80, y:50}, {x:80, y:80}, {x:50, y:80}, {x:20, y:80}, {x:20, y:50}],
        end: [{x:50, y:15}, {x:75, y:25}, {x:85, y:50}, {x:75, y:75}, {x:50, y:85}, {x:25, y:75}, {x:15, y:50}, {x:25, y:25}]
      },
      "triangle-rhombus": {
        pointsCount: 4,
        start: [{x:50, y:20}, {x:80, y:80}, {x:50, y:80}, {x:20, y:80}],
        end: [{x:50, y:10}, {x:85, y:50}, {x:50, y:90}, {x:15, y:50}]
      },
      "custom-4": {
        pointsCount: 4,
        start: [{x:25, y:25}, {x:75, y:25}, {x:75, y:75}, {x:25, y:75}],
        end: [{x:50, y:20}, {x:80, y:50}, {x:50, y:80}, {x:20, y:50}]
      },
      "custom-8": {
        pointsCount: 8,
        start: [{x:30, y:20}, {x:50, y:10}, {x:70, y:20}, {x:80, y:55}, {x:70, y:80}, {x:50, y:90}, {x:30, y:80}, {x:20, y:55}],
        end: [{x:20, y:30}, {x:50, y:20}, {x:80, y:30}, {x:90, y:55}, {x:80, y:70}, {x:50, y:80}, {x:20, y:70}, {x:10, y:55}]
      }
    };

    const makePathD = (points) => {
      if (points.length === 0) return "";
      return "M " + points.map(pt => `${pt.x} ${pt.y}`).join(" L ") + " Z";
    };

    const extractPointsFromPathD = (dString) => {
      const pairs = [];
      const regex = /([0-9.]+)\s*,?\s*([0-9.]+)/g;
      let match;
      while ((match = regex.exec(dString)) !== null) {
        pairs.push({
          x: Math.round(parseFloat(match[1])),
          y: Math.round(parseFloat(match[2]))
        });
      }
      return pairs;
    };

    const loadMorphPreset = (name) => {
      const preset = morphPresets[name] || morphPresets["pentagon-star"];
      verticesCount = preset.pointsCount;
      startPoints = preset.start.map(pt => ({ ...pt }));
      endPoints = preset.end.map(pt => ({ ...pt }));
      renderMorphUI();
    };

    const renderMorphUI = () => {
      if (activeTab !== "morph") return;
      
      const currentPoints = activeFrame === "start" ? startPoints : endPoints;
      
      // Render coordinate input entries
      cpCoordsList.innerHTML = "";
      cpHandlesContainer.innerHTML = "";

      currentPoints.forEach((pt, index) => {
        // Coordinate Inputs Row
        const row = document.createElement("div");
        row.className = "morph-coord-row";
        row.innerHTML = `
          <span class="morph-coord-idx">P${index + 1}</span>
          <span style="font-size: 11px; color: var(--text-muted);">X:</span>
          <input type="number" class="morph-coord-val x-val" data-index="${index}" min="0" max="100" value="${pt.x}">
          <span style="font-size: 11px; color: var(--text-muted); margin-left: 4px;">Y:</span>
          <input type="number" class="morph-coord-val y-val" data-index="${index}" min="0" max="100" value="${pt.y}">
        `;

        const xIn = row.querySelector(".x-val");
        const yIn = row.querySelector(".y-val");

        xIn.addEventListener("input", (e) => {
          const val = Math.min(Math.max(parseInt(e.target.value, 10) || 0, 0), 100);
          currentPoints[index].x = val;
          const handle = cpHandlesContainer.querySelector(`.morph-handle[data-index="${index}"]`);
          if (handle) handle.style.left = `${val}%`;
          updateMorphPaths();
        });

        yIn.addEventListener("input", (e) => {
          const val = Math.min(Math.max(parseInt(e.target.value, 10) || 0, 0), 100);
          currentPoints[index].y = val;
          const handle = cpHandlesContainer.querySelector(`.morph-handle[data-index="${index}"]`);
          if (handle) handle.style.top = `${val}%`;
          updateMorphPaths();
        });

        cpCoordsList.appendChild(row);

        // Handle dots (rendered only when animation is paused)
        if (!isPlaying) {
          const handle = document.createElement("div");
          handle.className = "morph-handle";
          handle.style.left = `${pt.x}%`;
          handle.style.top = `${pt.y}%`;
          handle.setAttribute("data-index", index);
          handle.innerHTML = `<span style="font-size: 8px; font-weight: bold; color: #fff; pointer-events: none; user-select: none;">${index + 1}</span>`;

          let isDragging = false;

          const onDragStart = (e) => {
            isDragging = true;
            handle.classList.add("dragging");
            e.preventDefault();
          };

          const onDragMove = (e) => {
            if (!isDragging) return;
            const rect = cpWorkarea.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;

            let posX = ((clientX - rect.left) / rect.width) * 100;
            let posY = ((clientY - rect.top) / rect.height) * 100;

            posX = Math.min(Math.max(Math.round(posX), 0), 100);
            posY = Math.min(Math.max(Math.round(posY), 0), 100);

            currentPoints[index].x = posX;
            currentPoints[index].y = posY;

            handle.style.left = `${posX}%`;
            handle.style.top = `${posY}%`;

            xIn.value = posX;
            yIn.value = posY;

            updateMorphPaths();
          };

          const onDragEnd = () => {
            if (isDragging) {
              isDragging = false;
              handle.classList.remove("dragging");
            }
          };

          handle.addEventListener("mousedown", onDragStart);
          document.addEventListener("mousemove", onDragMove);
          document.addEventListener("mouseup", onDragEnd);

          handle.addEventListener("touchstart", onDragStart);
          document.addEventListener("touchmove", onDragMove, { passive: false });
          document.addEventListener("touchend", onDragEnd);

          cpHandlesContainer.appendChild(handle);
        }
      });

      updateMorphPaths();
    };

    const updateMorphPaths = () => {
      const startD = makePathD(startPoints);
      const endD = makePathD(endPoints);

      if (!isPlaying) {
        // Draw the path of the active keyframe statically
        cpTargetPath.setAttribute("d", activeFrame === "start" ? startD : endD);
      }

      // Generate output code
      const duration = cpDurationSlider.value / 10;
      
      const smilSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
  <path fill="none" stroke="#00f2fe" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" d="${startD}">
    <animate 
      attributeName="d" 
      dur="${duration}s" 
      repeatCount="indefinite" 
      values="${startD}; ${endD}; ${startD}" 
      keyTimes="0; 0.5; 1"
      calcMode="spline" 
      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1" />
  </path>
</svg>`;

      const cssCode = `@keyframes morph-animation {
  0% { d: path('${startD}'); }
  50% { d: path('${endD}'); }
  100% { d: path('${startD}'); }
}
.morphing-vector {
  animation: morph-animation ${duration}s ease-in-out infinite;
}`;

      if (activeTab === "morph") {
        outputCode.innerText = `${smilSvg}\n\n/* Alternative CSS Transition Keyframes */\n${cssCode}`;
        
        downloadBtn.onclick = () => {
          const blob = new Blob([smilSvg], { type: "image/svg+xml" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "morph_animated.svg";
          link.click();
          appInstance.showToast("Downloaded morph animation SVG!", "success");
        };
      }
    };

    const playMorphAnimation = () => {
      isPlaying = true;
      cpPlayBtn.innerText = "⏸ Pause Animation";
      cpPlayBtn.classList.replace("primary", "accent-rose");

      const startD = makePathD(startPoints);
      const endD = makePathD(endPoints);
      const duration = cpDurationSlider.value / 10;

      // Clear edit handles during animation
      cpHandlesContainer.innerHTML = "";

      // Injects dynamic SMIL animation values
      cpTargetPath.setAttribute("d", startD);
      cpTargetPath.innerHTML = `
        <animate 
          attributeName="d" 
          dur="${duration}s" 
          repeatCount="indefinite" 
          values="${startD}; ${endD}; ${startD}" 
          keyTimes="0; 0.5; 1" />
      `;
    };

    const stopMorphAnimation = () => {
      isPlaying = false;
      cpPlayBtn.innerText = "▶ Play Animation";
      cpPlayBtn.classList.replace("accent-rose", "primary");

      cpTargetPath.innerHTML = ""; // Remove animate tag
      renderMorphUI();
    };

    cpPlayBtn.addEventListener("click", () => {
      if (isPlaying) {
        stopMorphAnimation();
      } else {
        playMorphAnimation();
      }
    });

    cpResetBtn.addEventListener("click", () => {
      stopMorphAnimation();
      loadMorphPreset(cpPreset.value);
      appInstance.showToast("Reset path nodes positions", "info");
    });

    cpPreset.addEventListener("change", (e) => {
      stopMorphAnimation();
      loadMorphPreset(e.target.value);
    });

    cpStartFrameBtn.addEventListener("click", () => {
      activeFrame = "start";
      cpStartFrameBtn.classList.add("active");
      cpEndFrameBtn.classList.remove("active");
      stopMorphAnimation();
    });

    cpEndFrameBtn.addEventListener("click", () => {
      activeFrame = "end";
      cpStartFrameBtn.classList.remove("active");
      cpEndFrameBtn.classList.add("active");
      stopMorphAnimation();
    });

    cpDurationSlider.addEventListener("input", (e) => {
      cpDurationVal.innerText = `${(e.target.value / 10).toFixed(1)}s`;
      if (isPlaying) {
        playMorphAnimation();
      } else {
        updateMorphPaths();
      }
    });

    // Shared Morph Shape Listeners
    container.querySelector("#morph-import-shape-btn")?.addEventListener("click", () => {
      const shared = appInstance.sharedShape;
      if (shared && shared.points && shared.points.length >= 3) {
        const count = shared.points.length;
        verticesCount = count;
        if (activeFrame === "start") {
          startPoints = shared.points.map(pt => ({ ...pt }));
        } else {
          endPoints = shared.points.map(pt => ({ ...pt }));
        }
        stopMorphAnimation();
        renderMorphUI();
        appInstance.showToast(`Imported ${count}-point shape from ${shared.source} to ${activeFrame === "start" ? "Start" : "End"} Frame!`, "success");
      } else {
        appInstance.showToast("No shared shape registry data found. Create a shape elsewhere first!", "warning");
      }
    });

    container.querySelector("#morph-export-shape-btn")?.addEventListener("click", () => {
      const currentPoints = activeFrame === "start" ? startPoints : endPoints;
      if (currentPoints && currentPoints.length >= 3) {
        appInstance.sharedShape = {
          source: `morph-${activeFrame}`,
          points: currentPoints.map(pt => ({ ...pt }))
        };
        appInstance.showToast(`Exported ${activeFrame === "start" ? "Start" : "End"} Frame shape to registry!`, "success");
      } else {
        appInstance.showToast("No points found to export!", "warning");
      }
    });

    // Preset Animator Shared Shape Listeners
    container.querySelector("#svg-import-shape-btn")?.addEventListener("click", () => {
      const shared = appInstance.sharedShape;
      if (shared && shared.points && shared.points.length >= 3) {
        const d = makePathD(shared.points);
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" stroke="#00f2fe" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" width="120" height="120">
  <path d="${d}" />
</svg>`;
        rawInput.value = svg;
        presetSelect.value = "stroke-draw";
        updateAnimation();
        appInstance.showToast(`Imported shape from ${shared.source} as SVG path!`, "success");
      } else {
        appInstance.showToast("No shared shape registry data found. Create a shape elsewhere first!", "warning");
      }
    });

    container.querySelector("#svg-export-shape-btn")?.addEventListener("click", () => {
      const rawText = rawInput.value.trim();
      if (!rawText) {
        appInstance.showToast("No SVG code found to parse!", "warning");
        return;
      }
      const svgNode = parseSvg(rawText);
      if (!svgNode) {
        appInstance.showToast("Invalid SVG code!", "warning");
        return;
      }
      const path = svgNode.querySelector("path");
      if (!path) {
        appInstance.showToast("No <path> element found in the SVG to export!", "warning");
        return;
      }
      const d = path.getAttribute("d");
      if (!d) {
        appInstance.showToast("The <path> element does not have a 'd' attribute!", "warning");
        return;
      }
      const points = extractPointsFromPathD(d);
      if (points.length >= 3) {
        appInstance.sharedShape = {
          source: "animator-path",
          points: points
        };
        appInstance.showToast(`Exported parsed path of ${points.length} points to registry!`, "success");
      } else {
        appInstance.showToast("Could not extract at least 3 points from the path 'd' attribute!", "warning");
      }
    });

    // Load initial presets
    loadMorphPreset("pentagon-star");

    // ==========================================
    // SHARED PREVIEW BG CONTROLLER & EXPORTS
    // ==========================================
    const bgSelect = container.querySelector("#svg-preview-bg-select");
    const showcaseContainer = container.querySelector("#svg-showcase-container");

    if (!document.getElementById("svg-preview-bg-light-css")) {
      const lightStyle = document.createElement("style");
      lightStyle.id = "svg-preview-bg-light-css";
      lightStyle.innerHTML = `
        .glass-bg-light {
          background-color: #f8fafc !important;
          background-image: linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px) !important;
          background-size: 15px 15px !important;
        }
      `;
      document.head.appendChild(lightStyle);
    }

    bgSelect?.addEventListener("change", (e) => {
      const bg = e.target.value;
      const bgClasses = ["glass-bg-dark", "glass-bg-mesh", "glass-bg-dots", "glass-bg-sunset", "glass-bg-light"];

      const applyBg = (c) => {
        c.classList.remove(...bgClasses);
        if (bg === "cyber-mesh") c.classList.add("glass-bg-mesh");
        else if (bg === "polka-dots") c.classList.add("glass-bg-dots");
        else if (bg === "sunset-glow") c.classList.add("glass-bg-sunset");
        else if (bg === "plain-light") c.classList.add("glass-bg-light");
        else c.classList.add("glass-bg-dark");
      };

      applyBg(showcaseContainer);
      applyBg(showcaseMorph);
    });

    copyBtn?.addEventListener("click", () => {
      appInstance.copyText(outputCode.innerText);
      appInstance.showToast("Copied code to clipboard!", "success");
    });

    this._cleanup = () => {
      const el = document.getElementById("svg-preview-bg-light-css");
      if (el) el.remove();
    };

    // Load initial sample
    rawInput.value = sampleCyberLogo;
    
    // Set initial active tab
    if (appInstance.activeSubtab) {
      switchTab(appInstance.activeSubtab, false);
      if (appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("svg-animator", appInstance.activeSubtab, { pushHistory: false, replaceHistory: true });
      }
      appInstance.activeSubtab = null;
    } else {
      switchTab("animator", false);
    }
  },

  destroy() {
    if (this._cleanup) {
      this._cleanup();
    }
  }
};
