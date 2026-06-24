export default {
  id: "pipeline-builder",
  name: "Smart Chain Pipeline Builder",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Configure Processing Chain</h3>
            <button class="tool-btn primary" id="pipe-add-node-btn">+ Add Step</button>
          </div>
          <p style="font-size: 13px; color: var(--text-muted);">Configure steps sequentially. Data will flow from top node to bottom node, executing each function on the results of the previous.</p>
          
          <div id="pipeline-nodes-list" style="display: flex; flex-direction: column; gap: 16px; margin-top: 10px;">
            <!-- Stack nodes will populate here -->
          </div>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Pipeline Data Flow</h3>
          </div>
          <div class="form-group">
            <label for="pipe-input">Initial Input Text</label>
            <textarea class="input-textarea" id="pipe-input" placeholder="Type initial input string to feed into the pipeline..." aria-label="Pipeline Initial Input"></textarea>
          </div>
          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 14px;">
            <div class="panel-header" style="border: none; padding: 0;">
              <label>Final Processed Output</label>
              <button class="tool-btn accent-emerald" id="pipe-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Output</button>
            </div>
            <textarea class="input-textarea" id="pipe-output" readonly placeholder="Calculations will process here..." style="min-height: 200px;" aria-label="Pipeline Result Output"></textarea>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide &amp; Instructions</span>
            </div>
            <button class="tool-btn secondary" id="pipeline-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Add Pipeline Steps</strong>: Click <strong>+ Add Step</strong> to insert a new processing node. Each node has a dropdown to pick an operation like Base64 Encode or JSON Format.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Enter Input Data</strong>: Type or paste your initial raw text into the <strong>Initial Input Text</strong> field. The pipeline processes it top-to-bottom through every step.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>See Live Results</strong>: Output updates automatically after each change. Click <strong>Copy Output</strong> to copy the final result to your clipboard.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">2-Step Decode</button>
                <button class="tool-guide-example-tab-btn" data-index="1">4-Step Pipeline</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="pipeline-example-flow example-val-0">
              <!-- Initial Input -->
              <div class="pipeline-flow-step">
                <div class="pipeline-flow-header">
                  <span class="pipeline-flow-badge input">📥 Input</span>
                </div>
                <pre class="pipeline-flow-value">eyJuYW1lIjoiT21uaVRvb2wgSHViIiwidmVyc2lvbiI6Mn0=</pre>
              </div>
              
              <div class="pipeline-flow-arrow-down">
                <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>

              <!-- Step 1 -->
              <div class="pipeline-flow-step">
                <div class="pipeline-flow-header">
                  <span class="pipeline-flow-badge step">Step 1</span>
                  <span class="pipeline-flow-op">Base64 Decode</span>
                </div>
                <pre class="pipeline-flow-value">{"name":"OmniTool Hub","version":2}</pre>
              </div>

              <div class="pipeline-flow-arrow-down">
                <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>

              <!-- Step 2 (Final) -->
              <div class="pipeline-flow-step">
                <div class="pipeline-flow-header">
                  <span class="pipeline-flow-badge output">Step 2 (Final)</span>
                  <span class="pipeline-flow-op">UPPERCASE</span>
                </div>
                <pre class="pipeline-flow-value">{"NAME":"OMNITOOL HUB","VERSION":2}</pre>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="pipeline-example-flow example-val-1" style="display: none;">
              <!-- Initial Input -->
              <div class="pipeline-flow-step">
                <div class="pipeline-flow-header">
                  <span class="pipeline-flow-badge input">📥 Input</span>
                </div>
                <pre class="pipeline-flow-value">%7B%22name%22%3A%22john%22%2C%22age%22%3A30%7D</pre>
              </div>
              
              <div class="pipeline-flow-arrow-down">
                <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>

              <!-- Step 1 -->
              <div class="pipeline-flow-step">
                <div class="pipeline-flow-header">
                  <span class="pipeline-flow-badge step">Step 1</span>
                  <span class="pipeline-flow-op">URL Decode</span>
                </div>
                <pre class="pipeline-flow-value">{"name":"john","age":30}</pre>
              </div>

              <div class="pipeline-flow-arrow-down">
                <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>

              <!-- Step 2 -->
              <div class="pipeline-flow-step">
                <div class="pipeline-flow-header">
                  <span class="pipeline-flow-badge step">Step 2</span>
                  <span class="pipeline-flow-op">JSON Format</span>
                </div>
                <pre class="pipeline-flow-value">{
  "name": "john",
  "age": 30
}</pre>
              </div>

              <div class="pipeline-flow-arrow-down">
                <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>

              <!-- Step 3 -->
              <div class="pipeline-flow-step">
                <div class="pipeline-flow-header">
                  <span class="pipeline-flow-badge step">Step 3</span>
                  <span class="pipeline-flow-op">UPPERCASE</span>
                </div>
                <pre class="pipeline-flow-value">{
  "NAME": "JOHN",
  "AGE": 30
}</pre>
              </div>

              <div class="pipeline-flow-arrow-down">
                <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
              </div>

              <!-- Step 4 (Final) -->
              <div class="pipeline-flow-step">
                <div class="pipeline-flow-header">
                  <span class="pipeline-flow-badge output">Step 4 (Final)</span>
                  <span class="pipeline-flow-op">Base64 Encode</span>
                </div>
                <pre class="pipeline-flow-value">ewogICJOQU1FIjogIkpPSE4iLAogICJBR0UiOiAzMAp9</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const pipeInput = container.querySelector("#pipe-input");
    const pipeOutput = container.querySelector("#pipe-output");
    const pipeNodeList = container.querySelector("#pipeline-nodes-list");

    const pipeOptions = [
      { value: "base64Encode", label: "Base64 Encode" },
      { value: "base64Decode", label: "Base64 Decode" },
      { value: "jsonFormat", label: "JSON Format" },
      { value: "jsonMinify", label: "JSON Minify" },
      { value: "urlEncode", label: "URL Encode" },
      { value: "urlDecode", label: "URL Decode" },
      { value: "textUpper", label: "Convert to UPPERCASE" },
      { value: "textLower", label: "Convert to lowercase" },
      { value: "textTitle", label: "Convert to Title Case" },
      { value: "textCamel", label: "Convert to camelCase" },
      { value: "textSnake", label: "Convert to snake_case" },
      { value: "textKebab", label: "Convert to kebab-case" },
      { value: "hashMd5", label: "MD5 Hashing" }
    ];

    let currentPipeline = ["base64Encode", "textUpper"];

    const runPipelineEngine = () => {
      let currentData = pipeInput.value;
      if (!currentData) {
        pipeOutput.value = "";
        return;
      }

      let limit = 0;
      try {
        for (const op of currentPipeline) {
          limit++;
          if (limit > 30) break; // Safety check
          
          if (window.engines && window.engines[op]) {
            currentData = window.engines[op](currentData);
          }
        }
        pipeOutput.value = currentData;
      } catch (e) {
        pipeOutput.value = `[Pipeline Error at step ${limit}]: ${e.message}`;
      }
    };

    const buildPipelineUI = () => {
      if (!pipeNodeList) return;
      pipeNodeList.innerHTML = "";
      
      currentPipeline.forEach((op, index) => {
        if (index > 0) {
          const arrow = document.createElement("div");
          arrow.className = "node-arrow";
          arrow.innerHTML = `
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          `;
          pipeNodeList.appendChild(arrow);
        }

        const block = document.createElement("div");
        block.className = "pipeline-node";
        
        let selectOptions = "";
        pipeOptions.forEach(opt => {
          selectOptions += `<option value="${opt.value}" ${opt.value === op ? 'selected' : ''}>${opt.label}</option>`;
        });

        block.innerHTML = `
          <div class="node-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="node-index">${index + 1}</span>
              <span style="font-size: 13px; font-weight: 700; color: var(--text-main);">Process Action</span>
            </div>
            <button class="node-remove" title="Remove step">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <select class="form-select node-op-select">
            ${selectOptions}
          </select>
        `;

        block.querySelector(".node-op-select").addEventListener("change", (e) => {
          currentPipeline[index] = e.target.value;
          runPipelineEngine();
        });

        block.querySelector(".node-remove").addEventListener("click", () => {
          currentPipeline.splice(index, 1);
          buildPipelineUI();
          runPipelineEngine();
        });

        pipeNodeList.appendChild(block);
      });
    };

    container.querySelector("#pipe-add-node-btn")?.addEventListener("click", () => {
      currentPipeline.push("textUpper");
      buildPipelineUI();
      runPipelineEngine();
    });

    pipeInput?.addEventListener("input", runPipelineEngine);
    container.querySelector("#pipe-copy-btn")?.addEventListener("click", () => appInstance.copyText(pipeOutput.value));

    let activeExampleIndex = 0;
    const tabBtns = container.querySelectorAll(".tool-guide-example-tab-btn");
    const rows = container.querySelectorAll(".pipeline-example-flow");

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

    container.querySelector("#pipeline-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        currentPipeline = ["base64Decode", "textUpper"];
        pipeInput.value = "eyJuYW1lIjoiT21uaVRvb2wgSHViIiwidmVyc2lvbiI6Mn0=";
        appInstance.showToast("Loaded example: Base64 Decode → UPPERCASE", "info");
      } else {
        currentPipeline = ["urlDecode", "jsonFormat", "textUpper", "base64Encode"];
        pipeInput.value = "%7B%22name%22%3A%22john%22%2C%22age%22%3A30%7D";
        appInstance.showToast("Loaded example: URL Decode → JSON Format → UPPERCASE → Base64 Encode", "info");
      }
      buildPipelineUI();
      runPipelineEngine();
    });

    // Load sample text and run initially
    pipeInput.value = "Hello World! Dynamic pipelines are fast.";
    buildPipelineUI();
    runPipelineEngine();
  }
};
