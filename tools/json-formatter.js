import { jsonFormat, jsonMinify } from './utils.js';

export default {
  id: "json-formatter",
  name: "JSON Formatter & Validator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Input JSON</h3>
            <div class="panel-actions">
              <button class="tool-btn" id="json-load-sample">Sample</button>
              <button class="tool-btn" id="json-clear">Clear</button>
            </div>
          </div>
          <textarea class="input-textarea" id="json-input" placeholder="Paste raw or unformatted JSON here..." aria-label="Raw JSON Input"></textarea>
          <div class="form-row">
            <div class="form-group">
              <label for="json-tab-size">Tab Spacing</label>
              <select class="form-select" id="json-tab-size">
                <option value="2">2 Spaces</option>
                <option value="4" selected>4 Spaces</option>
                <option value="tab">1 Tab</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <button class="tool-btn primary" id="json-format-btn">Format JSON</button>
            <button class="tool-btn" id="json-minify-btn">Minify JSON</button>
          </div>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Formatted Output</h3>
            <div class="panel-actions">
              <button class="tool-btn accent-emerald" id="json-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy</button>
            </div>
          </div>
          <div id="json-alert-box" style="display: none;"></div>
          <pre class="output-pre" id="json-output"></pre>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="json-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Input Payload</strong>: Paste your raw, unformatted, or minified JSON string into the input panel.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Indentation Settings</strong>: Choose your preferred tab spacing (2 spaces, 4 spaces, or tab).</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Process &amp; Prettify</strong>: Click <strong>Format JSON</strong> to beautify, or <strong>Minify JSON</strong> to compress.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Format JSON</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Minify JSON</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input</span>
                <div class="tool-guide-io-value">{"name":"John","age":30}</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Output</span>
                <div class="tool-guide-io-value">{
  "name": "John",
  "age": 30
}</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input</span>
                <div class="tool-guide-io-value">{
  "name": "John",
  "age": 30
}</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Output</span>
                <div class="tool-guide-io-value">{"name":"John","age":30}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const jsonInput = container.querySelector("#json-input");
    const jsonOutput = container.querySelector("#json-output");
    const jsonTab = container.querySelector("#json-tab-size");
    const jsonAlert = container.querySelector("#json-alert-box");

    const runJsonFormat = (minify = false) => {
      const raw = jsonInput.value.trim();
      if (!raw) {
        jsonOutput.innerText = "";
        jsonAlert.style.display = "none";
        return;
      }
      try {
        let formatted;
        if (minify) {
          formatted = jsonMinify(raw);
        } else {
          // Custom tab formatting support
          const sizeVal = jsonTab?.value || "4";
          const spacing = sizeVal === "tab" ? "\t" : parseInt(sizeVal, 10);
          formatted = JSON.stringify(JSON.parse(raw), null, spacing);
        }
        jsonOutput.innerText = formatted;
        jsonAlert.className = "tool-alert success";
        jsonAlert.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="9 11 11 13 15 9"></polyline></svg> <span>Valid JSON structure</span>`;
        jsonAlert.style.display = "flex";
      } catch (e) {
        jsonOutput.innerText = "";
        jsonAlert.className = "tool-alert error";
        jsonAlert.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> <span>Error: ${e.message}</span>`;
        jsonAlert.style.display = "flex";
      }
    };

    container.querySelector("#json-format-btn")?.addEventListener("click", () => runJsonFormat(false));
    container.querySelector("#json-minify-btn")?.addEventListener("click", () => runJsonFormat(true));
    container.querySelector("#json-clear")?.addEventListener("click", () => {
      jsonInput.value = "";
      jsonOutput.innerText = "";
      jsonAlert.style.display = "none";
    });
    
    const loadSampleData = () => {
      jsonInput.value = JSON.stringify({
        appName: "OmniTool Hub",
        version: 2.0,
        active: true,
        features: ["Offline PWA", "Smart Chains", "Ctrl+K Command Palette"],
        metadata: {
          serverless: true,
          license: "MIT"
        }
      }, null, 4);
      runJsonFormat(false);
    };

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

    container.querySelector("#json-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        jsonInput.value = '{"name":"John","age":30}';
        runJsonFormat(false);
        appInstance.showToast("Loaded unformatted JSON to prettify!", "info");
      } else {
        jsonInput.value = '{\n  "name": "John",\n  "age": 30\n}';
        runJsonFormat(true);
        appInstance.showToast("Loaded formatted JSON to minify!", "info");
      }
    });

    container.querySelector("#json-load-sample")?.addEventListener("click", loadSampleData);
    container.querySelector("#json-copy-btn")?.addEventListener("click", () => appInstance.copyText(jsonOutput.innerText));
  }
};
