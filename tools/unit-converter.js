export default {
  id: "unit-converter",
  name: "Unit Converter",
  renderUI() {
    return `
      <div class="tool-content-layout">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Conversions</h3>
          </div>
          <div class="form-row">
            <div class="form-group" style="grid-column: span 2;">
              <label for="unit-category">Select Unit Category</label>
              <select class="form-select" id="unit-category">
                <option value="data" selected>Data Size (B, KB, MB, GB, TB)</option>
                <option value="length">Length (Meters, Kilometers, Miles, Feet)</option>
                <option value="weight">Weight (Kilograms, Grams, Pounds, Ounces)</option>
                <option value="temp">Temperature (Celsius, Fahrenheit, Kelvin)</option>
              </select>
            </div>
          </div>

          <div class="form-row" style="margin-top: 10px;">
            <div class="form-group">
              <label for="unit-from-val">Convert From</label>
              <input type="number" id="unit-from-val" class="form-input" value="1" placeholder="Value..." aria-label="Convert Value From">
              <select class="form-select" id="unit-from-select" style="margin-top: 8px;">
                <!-- Filled dynamically -->
              </select>
            </div>
            <div class="form-group">
              <label for="unit-to-val">Convert To</label>
              <input type="number" id="unit-to-val" class="form-input" readonly placeholder="Result..." aria-label="Convert Value To">
              <select class="form-select" id="unit-to-select" style="margin-top: 8px;">
                <!-- Filled dynamically -->
              </select>
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
            <button class="tool-btn secondary" id="unit-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Choose Category</strong>: Select the unit category (Data Size, Length, Weight, Temperature).</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Select Units</strong>: Pick "Convert From" and "Convert To" unit labels from the dropdown menus.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Insert Values</strong>: Type a value inside the "Convert From" numeric input to view converted values instantly.</div>
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

    const runConvert = () => {
      const cat = unitCat.value;
      const fromUnit = unitFromSel.value;
      const toUnit = unitToSel.value;
      const val = parseFloat(unitFromVal.value);

      if (isNaN(val)) {
        unitToVal.value = "";
        return;
      }

      if (cat === "temp") {
        const typeFrom = units.temp[fromUnit];
        const typeTo = units.temp[toUnit];
        
        let tempInC = val;
        if (typeFrom === "F") tempInC = (val - 32) * 5/9;
        if (typeFrom === "K") tempInC = val - 273.15;

        let result = tempInC;
        if (typeTo === "F") result = (tempInC * 9/5) + 32;
        if (typeTo === "K") result = tempInC + 273.15;

        unitToVal.value = Math.round(result * 100000) / 100000;
      } else {
        const factorFrom = units[cat][fromUnit];
        const factorTo = units[cat][toUnit];
        unitToVal.value = Math.round(((val * factorFrom) / factorTo) * 100000) / 100000;
      }
    };

    const populateUnits = () => {
      const cat = unitCat.value;
      const items = Object.keys(units[cat]);

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

    unitCat?.addEventListener("change", populateUnits);
    unitFromVal?.addEventListener("input", runConvert);
    unitFromSel?.addEventListener("change", runConvert);
    unitToSel?.addEventListener("change", runConvert);

    container.querySelector("#unit-guide-load-sample")?.addEventListener("click", () => {
      unitCat.value = "length";
      populateUnits();
      unitFromVal.value = "100";
      unitFromSel.value = "Kilometers (km)";
      unitToSel.value = "Miles (mi)";
      runConvert();
      appInstance.showToast("Loaded length conversion sample!", "info");
    });

    // Populate units automatically on init
    populateUnits();
  }
};
