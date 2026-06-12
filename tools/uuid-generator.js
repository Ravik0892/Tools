export default {
  id: "uuid-generator",
  name: "UUID v4 Generator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Generator Options</h3>
          </div>
          <div class="form-group">
            <label>Number of UUIDs</label>
            <div class="slider-group">
              <input type="range" id="uuid-count" class="slider-input" min="1" max="50" value="5">
              <span class="slider-val" id="uuid-count-val">5</span>
            </div>
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="uuid-uppercase">
              Uppercase Letters
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="uuid-hyphens" checked>
              Include Hyphens
            </label>
          </div>
          <button class="tool-btn primary" id="uuid-generate-btn">Generate UUIDs</button>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Generated UUIDs</h3>
            <button class="tool-btn accent-emerald" id="uuid-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy All</button>
          </div>
          <pre class="output-pre" id="uuid-output" style="max-height: 250px;"></pre>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="uuid-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Choose Options</strong>: Set the quantity slider (from 1 to 50 UUIDs) and select uppercase or hyphen styles.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Generate Keys</strong>: Click **Generate UUIDs** to generate cryptographically secure UUID version 4 keys client-side.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Copy All</strong>: Click the copy button in the header of the result panel to copy all generated keys.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const uuidCount = container.querySelector("#uuid-count");
    const uuidCountVal = container.querySelector("#uuid-count-val");
    const uuidUpper = container.querySelector("#uuid-uppercase");
    const uuidHyphens = container.querySelector("#uuid-hyphens");
    const uuidOutput = container.querySelector("#uuid-output");

    uuidCount?.addEventListener("input", (e) => {
      uuidCountVal.innerText = e.target.value;
    });

    const generateUUIDv4 = () => {
      const rnd = crypto.getRandomValues(new Uint8Array(16));
      rnd[6] = (rnd[6] & 0x0f) | 0x40; // v4
      rnd[8] = (rnd[8] & 0x3f) | 0x80;
      
      let u = "";
      for (let i = 0; i < 16; i++) u += rnd[i].toString(16).padStart(2, "0");
      if (uuidHyphens.checked) {
        u = `${u.slice(0,8)}-${u.slice(8,12)}-${u.slice(12,16)}-${u.slice(16,20)}-${u.slice(20)}`;
      }
      return uuidUpper.checked ? u.toUpperCase() : u.toLowerCase();
    };

    const runUuidGenerate = () => {
      const list = [];
      const count = parseInt(uuidCount.value);
      for (let i = 0; i < count; i++) list.push(generateUUIDv4());
      uuidOutput.innerText = list.join("\n");
    };

    container.querySelector("#uuid-generate-btn")?.addEventListener("click", runUuidGenerate);
    container.querySelector("#uuid-copy-btn")?.addEventListener("click", () => appInstance.copyText(uuidOutput.innerText));
    
    container.querySelector("#uuid-guide-load-sample")?.addEventListener("click", () => {
      uuidCount.value = "3";
      if (uuidCountVal) uuidCountVal.innerText = "3";
      uuidUpper.checked = true;
      runUuidGenerate();
      appInstance.showToast("Generated 3 uppercase sample UUIDs!", "info");
    });

    // Run automatically on activation
    runUuidGenerate();
  }
};
