export default {
  id: "unit-converter",
  name: "Unit Converter",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
              Unit Setup
            </h3>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
              <button class="keyboard-tab active unit-cat-pill" data-cat="data" style="font-size: 11px; padding: 4px 7px;">💾 Data</button>
              <button class="keyboard-tab unit-cat-pill" data-cat="length" style="font-size: 11px; padding: 4px 7px;">📏 Length</button>
              <button class="keyboard-tab unit-cat-pill" data-cat="weight" style="font-size: 11px; padding: 4px 7px;">⚖️ Weight</button>
              <button class="keyboard-tab unit-cat-pill" data-cat="temp" style="font-size: 11px; padding: 4px 7px;">🌡️ Temp</button>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; flex: 1;">
            <select id="unit-category" class="form-select" style="display: none;">
              <option value="data" selected>Data Size</option>
              <option value="length">Length</option>
              <option value="weight">Weight</option>
              <option value="temp">Temperature</option>
            </select>

            <div class="form-group" style="margin-bottom: 0;">
              <label for="unit-from-val" style="font-size: 11px; margin-bottom: 4px;">Convert From</label>
              <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 8px;">
                <input type="number" id="unit-from-val" class="form-input" value="1" placeholder="Enter value..." style="font-size: 13px;">
                <select class="form-select" id="unit-from-select" style="font-size: 12px;"></select>
              </div>
            </div>

            <!-- Swap Button -->
            <div style="display: flex; justify-content: center; margin: -4px 0;">
              <button type="button" class="tool-btn secondary" id="unit-swap-btn" style="padding: 4px 12px; font-size: 12px; border-radius: 20px;">
                ⇅ Swap Units
              </button>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label for="unit-to-select" style="font-size: 11px; margin-bottom: 4px;">Convert To</label>
              <select class="form-select" id="unit-to-select" style="font-size: 12px; width: 100%;"></select>
            </div>

            <!-- Quick Step Shortcuts -->
            <div style="display: flex; gap: 6px; align-items: center; margin-top: 4px;">
              <span style="font-size: 11px; color: var(--text-muted);">Quick Values:</span>
              <button type="button" class="keyboard-tab unit-quick-val" data-val="1" style="font-size: 10px; padding: 2px 6px;">1</button>
              <button type="button" class="keyboard-tab unit-quick-val" data-val="10" style="font-size: 10px; padding: 2px 6px;">10</button>
              <button type="button" class="keyboard-tab unit-quick-val" data-val="100" style="font-size: 10px; padding: 2px 6px;">100</button>
              <button type="button" class="keyboard-tab unit-quick-val" data-val="1024" style="font-size: 10px; padding: 2px 6px;">1024</button>
            </div>

            <!-- Privacy Badge -->
            <div style="margin-top: auto; padding: 10px 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.4;">
              ⚡ <strong style="color: var(--accent-cyan);">Instant Calculation</strong>: Zero latency floating-point conversion with IEEE-754 precision.
            </div>
          </div>
        </div>

        <!-- Transformed Result Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Converted Result
            </h3>
            <button type="button" class="tool-btn accent-emerald" id="btn-copy-unit-result" style="padding: 4px 10px; font-size: 11px;">📋 Copy Output</button>
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; gap: 14px;">
            <!-- Primary Highlight Card -->
            <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 10px; padding: 18px 20px;">
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 6px;">Calculated Equivalent</div>
              <div style="display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap;">
                <input type="text" id="unit-to-val" readonly style="font-size: 26px; font-weight: 800; color: var(--accent-cyan); background: transparent; border: none; outline: none; width: 100%; max-width: 320px; font-family: 'JetBrains Mono', monospace;" value="0">
              </div>
              <div id="unit-result-label" style="font-size: 13px; color: var(--text-secondary); margin-top: 4px; font-weight: 600;"></div>
            </div>

            <!-- All Category Equivalents Matrix -->
            <div style="flex: 1; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; overflow-y: auto;">
              <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 10px;">Full Category Breakdown</div>
              <div id="unit-matrix-table" style="display: flex; flex-direction: column; gap: 6px;"></div>
            </div>
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: MULTI-UNIT CONVERTER</h4>
            </div>
            <button class="tool-btn secondary" id="unit-guide-load-sample" style="font-size: 11px;">Load Sample</button>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Select Category</strong>
              <p style="margin: 4px 0 0 0;">Switch between Data Size, Physical Length, Mass Weight, or Temperature scales.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Interactive Conversion</strong>
              <p style="margin: 4px 0 0 0;">Type any number in the input box; target outputs and matrix breakdown update instantaneously.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Instant 1-Click Copy</strong>
              <p style="margin: 4px 0 0 0;">Copy the exact formatted result with units to your clipboard ready to paste into code or reports.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
    const unitCat = container.querySelector("#unit-category");
    const unitFromVal = container.querySelector("#unit-from-val");
    const unitToVal = container.querySelector("#unit-to-val");
    const unitFromSel = container.querySelector("#unit-from-select");
    const unitToSel = container.querySelector("#unit-to-select");
    const resultLabel = container.querySelector("#unit-result-label");
    const matrixTable = container.querySelector("#unit-matrix-table");
    const swapBtn = container.querySelector("#unit-swap-btn");
    const copyBtn = container.querySelector("#btn-copy-unit-result");

    const units = {
      data: {
        "Bytes (B)": 1,
        "Kilobytes (KB)": 1024,
        "Megabytes (MB)": 1024 * 1024,
        "Gigabytes (GB)": 1024 * 1024 * 1024,
        "Terabytes (TB)": 1024 * 1024 * 1024 * 1024
      },
      length: {
        "Meters (m)": 1,
        "Kilometers (km)": 1000,
        "Miles (mi)": 1609.34,
        "Yards (yd)": 0.9144,
        "Feet (ft)": 0.3048
      },
      weight: {
        "Kilograms (kg)": 1,
        "Grams (g)": 0.001,
        "Pounds (lbs)": 0.45359237,
        "Ounces (oz)": 0.028349523
      },
      temp: { "Celsius (°C)": "C", "Fahrenheit (°F)": "F", "Kelvin (K)": "K" }
    };

    const convertValue = (val, fromUnit, toUnit, cat) => {
      if (isNaN(val)) return 0;
      if (cat === "temp") {
        const typeFrom = units.temp[fromUnit];
        const typeTo = units.temp[toUnit];
        let tempInC = val;
        if (typeFrom === "F") tempInC = (val - 32) * 5/9;
        if (typeFrom === "K") tempInC = val - 273.15;

        let result = tempInC;
        if (typeTo === "F") result = (tempInC * 9/5) + 32;
        if (typeTo === "K") result = tempInC + 273.15;
        return Math.round(result * 100000) / 100000;
      } else {
        const factorFrom = units[cat][fromUnit];
        const factorTo = units[cat][toUnit];
        return Math.round(((val * factorFrom) / factorTo) * 100000) / 100000;
      }
    };

    const runConvert = () => {
      const cat = (unitCat && units[unitCat.value]) ? unitCat.value : "data";
      const fromUnit = unitFromSel ? unitFromSel.value : Object.keys(units[cat])[0];
      const toUnit = unitToSel ? unitToSel.value : (Object.keys(units[cat])[1] || fromUnit);
      const val = unitFromVal ? parseFloat(unitFromVal.value) : 1;

      if (isNaN(val)) {
        if (unitToVal) unitToVal.value = "0";
        if (resultLabel) resultLabel.textContent = "";
        return;
      }

      const res = convertValue(val, fromUnit, toUnit, cat);
      if (unitToVal) unitToVal.value = res;
      if (resultLabel) resultLabel.textContent = `${val} ${fromUnit} = ${res} ${toUnit}`;

      // Update full matrix table
      if (matrixTable && units[cat]) {
        const allUnits = Object.keys(units[cat]);
        matrixTable.innerHTML = allUnits.map(unitName => {
          const eqVal = convertValue(val, fromUnit, unitName, cat);
          const isSelected = unitName === toUnit;
          return `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: ${isSelected ? 'rgba(0,242,254,0.1)' : 'rgba(255,255,255,0.02)'}; border: 1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-color)'}; border-radius: 6px; font-size: 12px;">
              <span style="color: ${isSelected ? 'var(--accent-cyan)' : 'var(--text-muted)'}; font-weight: ${isSelected ? '700' : '500'};">${unitName}</span>
              <strong style="font-family: 'JetBrains Mono', monospace; color: var(--text-main);">${eqVal}</strong>
            </div>
          `;
        }).join("");
      }
    };

    const populateUnits = () => {
      const cat = (unitCat && units[unitCat.value]) ? unitCat.value : "data";
      if (unitCat) unitCat.value = cat;
      const items = Object.keys(units[cat] || {});

      unitFromSel.innerHTML = "";
      unitToSel.innerHTML = "";

      items.forEach((item, idx) => {
        const optFrom = document.createElement("option");
        optFrom.value = item; optFrom.innerText = item;
        unitFromSel.appendChild(optFrom);

        const optTo = document.createElement("option");
        optTo.value = item; optTo.innerText = item;
        if (idx === 1) optTo.selected = true;
        unitToSel.appendChild(optTo);
      });
      runConvert();
    };

    // Category pills
    container.querySelectorAll(".unit-cat-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        container.querySelectorAll(".unit-cat-pill").forEach(p => p.classList.remove("active"));
        e.currentTarget.classList.add("active");
        unitCat.value = e.currentTarget.dataset.cat;
        populateUnits();
      });
    });

    // Quick values
    container.querySelectorAll(".unit-quick-val").forEach(btn => {
      btn.addEventListener("click", (e) => {
        unitFromVal.value = e.currentTarget.dataset.val;
        runConvert();
      });
    });

    // Swap button
    if (swapBtn) {
      swapBtn.addEventListener("click", () => {
        const fromVal = unitFromSel.value;
        const toVal = unitToSel.value;
        unitFromSel.value = toVal;
        unitToSel.value = fromVal;
        runConvert();
      });
    }

    // Copy output
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const val = unitToVal.value;
        const toUnit = unitToSel.value;
        navigator.clipboard.writeText(`${val} ${toUnit}`);
        if (appInstance && appInstance.showToast) {
          appInstance.showToast(`Copied ${val} ${toUnit} to clipboard!`, "success");
        }
      });
    }

    unitFromVal?.addEventListener("input", runConvert);
    unitFromSel?.addEventListener("change", runConvert);
    unitToSel?.addEventListener("change", runConvert);

    container.querySelector("#unit-guide-load-sample")?.addEventListener("click", () => {
      unitCat.value = "data";
      container.querySelectorAll(".unit-cat-pill").forEach(p => {
        p.classList.toggle("active", p.dataset.cat === "data");
      });
      populateUnits();
      unitFromVal.value = "1";
      unitFromSel.value = "Gigabytes (GB)";
      unitToSel.value = "Megabytes (MB)";
      runConvert();
      if (appInstance && appInstance.showToast) {
        appInstance.showToast("Loaded sample: 1 GB in Megabytes!", "info");
      }
    });

    // Populate units automatically on init
    populateUnits();
  }
};
