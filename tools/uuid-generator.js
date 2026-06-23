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
              <div class="tool-guide-step-text"><strong>Choose Options</strong>: Set the quantity slider (1–50) and toggle uppercase or hyphens style.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Generate Keys</strong>: Click <strong>Generate UUIDs</strong> to create cryptographically secure RFC 4122 UUID v4 keys.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Copy All</strong>: Click <strong>Copy All</strong> to copy every generated UUID to your clipboard at once.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Hyphenated</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Raw Alphanumeric</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Settings</span>
                <div class="tool-guide-io-value">Count: 3, Hyphens: ON, Uppercase: OFF</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Output</span>
                <div class="tool-guide-io-value">a3f8d1c2-7b4e-4f9a-8c2d-1e6a0b3f5d9c
b7e2a095-3d1f-4c8b-9e7a-2f4d0c1b6e8a
c9d1b384-5e2a-4f7c-8b9d-3a0c2d4e1f6b</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Settings</span>
                <div class="tool-guide-io-value">Count: 3, Hyphens: OFF, Uppercase: ON</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Output</span>
                <div class="tool-guide-io-value">A3F8D1C27B4E4F9A8C2D1E6A0B3F5D9C
B7E2A0953D1F4C8B9E7A2F4D0C1B6E8A
C9D1B3845E2A4F7C8B9D3A0C2D4E1F6B</div>
              </div>
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
        u = `${u.slice(0, 8)}-${u.slice(8, 12)}-${u.slice(12, 16)}-${u.slice(16, 20)}-${u.slice(20)}`;
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

    let activeExampleIndex = 0;
    const tabBtns = container.querySelectorAll(".tool-guide-example-tab-btn");
    const rows = container.querySelectorAll(".tool-guide-io-row");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeExampleIndex = parseInt(btn.getAttribute("data-index"), 10);
        rows.forEach((row, idx) => {
          row.style.display = (idx === activeExampleIndex) ? "flex" : "none";
        });
      });
    });

    container.querySelector("#uuid-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        uuidCount.value = "3";
        if (uuidCountVal) uuidCountVal.innerText = "3";
        uuidUpper.checked = false;
        uuidHyphens.checked = true;
        runUuidGenerate();
        appInstance.showToast("Generated 3 hyphenated lowercase sample UUIDs!", "info");
      } else {
        uuidCount.value = "3";
        if (uuidCountVal) uuidCountVal.innerText = "3";
        uuidUpper.checked = true;
        uuidHyphens.checked = false;
        runUuidGenerate();
        appInstance.showToast("Generated 3 raw uppercase sample UUIDs!", "info");
      }
    });

    // Run automatically on activation
    runUuidGenerate();
  }
};
