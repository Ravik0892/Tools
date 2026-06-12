export default {
  id: "gradient-generator",
  name: "CSS Gradient Creator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Gradient Configurator</h3>
          </div>
          <div class="form-row" style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); margin-bottom: 12px;">
            <div class="form-group">
              <label for="grad-type">Type</label>
              <select class="form-select" id="grad-type">
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>
            <div class="form-group" id="grad-angle-group">
              <label>Angle</label>
              <div class="slider-group">
                <input type="range" id="grad-angle" class="slider-input" min="0" max="360" value="135">
                <span class="slider-val" id="grad-angle-val">135°</span>
              </div>
            </div>
            <div class="form-group" id="grad-shape-group" style="display: none;">
              <label for="grad-shape">Shape</label>
              <select class="form-select" id="grad-shape">
                <option value="circle">Circle</option>
                <option value="ellipse">Ellipse</option>
              </select>
            </div>
            <div class="form-group" id="grad-position-group" style="display: none;">
              <label for="grad-position">Position</label>
              <select class="form-select" id="grad-position">
                <option value="center">Center</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top left">Top Left</option>
                <option value="top right">Top Right</option>
                <option value="bottom left">Bottom Left</option>
                <option value="bottom right">Bottom Right</option>
              </select>
            </div>
          </div>

          <div class="form-row" style="margin-bottom: 12px;">
            <div class="form-group" style="flex-direction: row; align-items: center; gap: 8px;">
              <input type="checkbox" id="grad-repeating" style="width: 16px; height: 16px; cursor: pointer;">
              <label for="grad-repeating" style="margin: 0; cursor: pointer; user-select: none;">Repeating Gradient</label>
            </div>
          </div>

          <div class="gradient-stops-control">
            <div class="panel-header" style="padding: 0 0 8px 0; border-bottom: none; display: flex; justify-content: space-between; align-items: center;">
              <label style="margin: 0;">Color Stops</label>
              <button class="tool-btn secondary" id="grad-add-stop-btn" style="padding: 4px 8px; font-size: 11px;">+ Add Stop</button>
            </div>
            <div id="grad-stops-container" style="display: flex; flex-direction: column; gap: 8px;">
              <!-- Dynamic stops -->
            </div>
          </div>

          <div class="form-group" style="margin-top: 16px;">
            <label>Designer Presets</label>
            <div class="gradient-presets-grid" id="grad-presets-box" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(65px, 1fr)); gap: 8px; margin-top: 6px;">
              <!-- Dynamically loaded presets -->
            </div>
          </div>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Visual Preview</h3>
          </div>
          <div class="gradient-visualizer" id="gradient-preview-screen">
            <span style="font-weight: 700; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">PREVIEW</span>
          </div>
          <div class="form-group">
            <label>Generated CSS Code</label>
            <div class="panel-header" style="border: none; padding: 0; margin-top: 4px;">
              <button class="tool-btn accent-emerald" id="grad-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy CSS</button>
            </div>
            <textarea class="form-input" id="grad-css-output" readonly style="font-family: var(--font-mono); font-size: 13px; height: 70px; resize: none; margin-top: 6px;" aria-label="Gradient CSS Output"></textarea>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="grad-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Choose Options</strong>: Set type (Linear/Radial), angle bounds, or select repeating/non-repeating options.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Add & Tune Stops</strong>: Add up to 8 custom color stops. Use sliders to shift location positions.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Save Styles</strong>: Apply preset gallery templates or copy generated CSS stylesheet rules to clipboard.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const gradType = container.querySelector("#grad-type");
    const gradAngle = container.querySelector("#grad-angle");
    const gradAngleVal = container.querySelector("#grad-angle-val");
    const gradPreview = container.querySelector("#gradient-preview-screen");
    const gradOutput = container.querySelector("#grad-css-output");
    const gradStopsContainer = container.querySelector("#grad-stops-container");
    const gradPresetsBox = container.querySelector("#grad-presets-box");
    const repeatingEl = container.querySelector("#grad-repeating");
    const shapeEl = container.querySelector("#grad-shape");
    const posEl = container.querySelector("#grad-position");

    let gradientStops = [
      { color: "#00f2fe", position: 0 },
      { color: "#9d4edd", position: 100 }
    ];

    const gradientPresets = [
      { name: "Ocean Blue", type: "linear", angle: 135, repeating: false, stops: [{ color: "#00f2fe", position: 0 }, { color: "#4facfe", position: 50 }, { color: "#0000ff", position: 100 }] },
      { name: "Sunset Violet", type: "linear", angle: 135, repeating: false, stops: [{ color: "#f5576c", position: 0 }, { color: "#f093fb", position: 100 }] },
      { name: "Neon Lime", type: "linear", angle: 90, repeating: false, stops: [{ color: "#00ff87", position: 0 }, { color: "#60efff", position: 100 }] },
      { name: "Cyberpunk", type: "linear", angle: 45, repeating: false, stops: [{ color: "#f107a3", position: 0 }, { color: "#7b2ff7", position: 50 }, { color: "#07f1f1", position: 100 }] },
      { name: "Peach Dream", type: "linear", angle: 135, repeating: false, stops: [{ color: "#ff9a9e", position: 0 }, { color: "#fecfef", position: 99 }, { color: "#fecfef", position: 100 }] },
      { name: "Deep Space", type: "radial", shape: "circle", position: "center", repeating: false, stops: [{ color: "#434343", position: 0 }, { color: "#000000", position: 100 }] },
      { name: "Retro Stripe", type: "linear", angle: 90, repeating: true, stops: [{ color: "#ffbe0b", position: 0 }, { color: "#ffbe0b", position: 10 }, { color: "#fb5607", position: 10 }, { color: "#fb5607", position: 20 }] }
    ];

    const updateGradientControlVisibility = () => {
      const isLinear = gradType?.value === "linear";
      const angleGroup = container.querySelector("#grad-angle-group");
      const shapeGroup = container.querySelector("#grad-shape-group");
      const positionGroup = container.querySelector("#grad-position-group");
      
      if (angleGroup) angleGroup.style.display = isLinear ? "block" : "none";
      if (shapeGroup) shapeGroup.style.display = isLinear ? "none" : "block";
      if (positionGroup) positionGroup.style.display = isLinear ? "none" : "block";
    };

    const buildGradient = () => {
      if (!gradType) return;
      const isLinear = gradType.value === "linear";
      
      const sortedStops = gradientStops.slice().sort((a, b) => a.position - b.position);
      const stopsStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(", ");
      
      const isRepeating = repeatingEl ? repeatingEl.checked : false;
      
      let gradString = "";
      if (isLinear) {
        updateGradientControlVisibility();
        if (gradAngleVal && gradAngle) gradAngleVal.innerText = `${gradAngle.value}°`;
        
        const prefix = isRepeating ? "repeating-linear-gradient" : "linear-gradient";
        gradString = `${prefix}(${gradAngle ? gradAngle.value : 135}deg, ${stopsStr})`;
      } else {
        updateGradientControlVisibility();
        const shape = shapeEl ? shapeEl.value : "circle";
        const pos = posEl ? posEl.value : "center";
        
        const prefix = isRepeating ? "repeating-radial-gradient" : "radial-gradient";
        gradString = `${prefix}(${shape} at ${pos}, ${stopsStr})`;
      }
      
      if (gradPreview) {
        gradPreview.style.background = gradString;
      }
      if (gradOutput) {
        gradOutput.value = `background: ${gradString};`;
      }
    };

    const renderGradientStops = () => {
      if (!gradStopsContainer) return;
      gradStopsContainer.innerHTML = "";
      
      gradientStops.forEach((stop, index) => {
        const row = document.createElement("div");
        row.className = "gradient-stop-row";
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.gap = "8px";
        
        row.innerHTML = `
          <input type="color" class="stop-color-input" value="${stop.color}" title="Color Stop ${index + 1}" style="border: none; background: none; width: 34px; height: 34px; cursor: pointer;">
          <div class="slider-group" style="flex: 1;">
            <input type="range" class="stop-pos-slider slider-input" min="0" max="100" value="${stop.position}">
            <span class="slider-val stop-pos-val">${stop.position}%</span>
          </div>
          ${gradientStops.length > 2 ? `<button class="stop-remove-btn" title="Remove Stop" style="background: none; border: none; color: var(--accent-rose); cursor: pointer; font-size: 14px; padding: 4px 8px;">✕</button>` : ''}
        `;
        
        const colorInput = row.querySelector(".stop-color-input");
        colorInput.addEventListener("input", (e) => {
          gradientStops[index].color = e.target.value;
          buildGradient();
        });
        colorInput.addEventListener("change", (e) => {
          gradientStops[index].color = e.target.value;
          buildGradient();
        });
        
        const posSlider = row.querySelector(".stop-pos-slider");
        posSlider.addEventListener("input", (e) => {
          const val = parseInt(e.target.value, 10);
          gradientStops[index].position = val;
          row.querySelector(".stop-pos-val").innerText = `${val}%`;
          buildGradient();
        });
        
        const removeBtn = row.querySelector(".stop-remove-btn");
        if (removeBtn) {
          removeBtn.addEventListener("click", () => {
            gradientStops.splice(index, 1);
            renderGradientStops();
            buildGradient();
          });
        }
        
        gradStopsContainer.appendChild(row);
      });
    };

    const loadGradientPreset = (preset) => {
      if (gradType) gradType.value = preset.type;
      
      if (preset.type === "linear") {
        if (gradAngle) gradAngle.value = preset.angle;
      } else {
        if (shapeEl && preset.shape) shapeEl.value = preset.shape;
        if (posEl && preset.position) posEl.value = preset.position;
      }
      
      if (repeatingEl) repeatingEl.checked = preset.repeating || false;
      
      gradientStops = JSON.parse(JSON.stringify(preset.stops));
      
      updateGradientControlVisibility();
      renderGradientStops();
      buildGradient();
      appInstance.showToast(`Loaded "${preset.name}" preset`, "success");
    };

    const renderPresets = () => {
      if (!gradPresetsBox) return;
      gradPresetsBox.innerHTML = "";
      
      gradientPresets.forEach(preset => {
        const el = document.createElement("div");
        el.className = "grad-preset-card";
        el.title = preset.name;
        
        const sortedStops = preset.stops.slice().sort((a, b) => a.position - b.position);
        const stopsStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(", ");
        
        let gradStr = "";
        if (preset.type === "linear") {
          gradStr = `linear-gradient(${preset.angle}deg, ${stopsStr})`;
        } else {
          const shape = preset.shape || "circle";
          const pos = preset.position || "center";
          gradStr = `radial-gradient(${shape} at ${pos}, ${stopsStr})`;
        }
        
        el.style.background = gradStr;
        el.addEventListener("click", () => {
          loadGradientPreset(preset);
        });
        
        gradPresetsBox.appendChild(el);
      });
    };

    gradType?.addEventListener("change", buildGradient);
    gradAngle?.addEventListener("input", buildGradient);
    shapeEl?.addEventListener("change", buildGradient);
    posEl?.addEventListener("change", buildGradient);
    repeatingEl?.addEventListener("change", buildGradient);

    container.querySelector("#grad-add-stop-btn")?.addEventListener("click", () => {
      if (gradientStops.length >= 8) {
        appInstance.showToast("Maximum 8 color stops allowed", "warning");
        return;
      }
      
      let newPos = 50;
      if (gradientStops.length >= 2) {
        const sorted = gradientStops.slice().sort((a, b) => a.position - b.position);
        const last = sorted[sorted.length - 1].position;
        const secondLast = sorted[sorted.length - 2].position;
        newPos = Math.round((last + secondLast) / 2);
      }
      
      const colors = ["#00f2fe", "#9d4edd", "#ff9a9e", "#fecfef", "#ffbe0b", "#fb5607", "#00ff87", "#3a86c8"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      gradientStops.push({ color: randomColor, position: newPos });
      
      renderGradientStops();
      buildGradient();
      appInstance.showToast("Added new color stop", "success");
    });

    container.querySelector("#grad-copy-btn")?.addEventListener("click", () => {
      if (gradOutput) appInstance.copyText(gradOutput.value);
    });

    container.querySelector("#grad-guide-load-sample")?.addEventListener("click", () => {
      loadGradientPreset(gradientPresets[3]); // Load Cyberpunk preset
    });

    // Run initial rendering
    updateGradientControlVisibility();
    renderGradientStops();
    renderPresets();
    buildGradient();
  }
};
