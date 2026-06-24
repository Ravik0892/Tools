export default {
  id: "url-parser",
  name: "URL Query Parser & Builder",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel" style="grid-column: 1 / -1;">
          <div class="panel-header">
            <h3>Input URL</h3>
          </div>
          <div class="form-group">
            <input type="text" class="form-input" id="url-parser-input" placeholder="https://example.com/search?q=query&category=dev&sort=date" aria-label="Input URL">
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Query Parameters</h3>
            <div class="panel-actions">
              <button class="tool-btn" id="url-param-add">+ Add Parameter</button>
            </div>
          </div>
          <div id="url-params-container" style="display: flex; flex-direction: column; gap: 10px;">
            <span style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 12px 0;">No parameters parsed</span>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Rebuilt URL Output</h3>
            <div class="panel-actions">
              <button class="tool-btn accent-emerald" id="url-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy</button>
            </div>
          </div>
          <textarea class="input-textarea" id="url-output" readonly placeholder="Parsed output URL will appear here..." style="min-height: 120px;" aria-label="Output URL"></textarea>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="url-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Paste Web Address</strong>: Type or paste a URL containing query parameters (e.g., <code>?q=query&amp;page=2</code>) in the input.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Edit &amp; Reorder Key-Values</strong>: Modify values directly, delete query properties, or click <strong>+ Add Parameter</strong> to extend it.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Rebuild &amp; Copy</strong>: Instantly view the updated, fully encoded rebuilt URL and copy it to the clipboard.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">API Endpoint</button>
                <button class="tool-guide-example-tab-btn" data-index="1">UTM Builder</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input URL</span>
                <div class="tool-guide-io-value">https://api.github.com/repos/git/commits?per_page=10&amp;page=2</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Parsed Parameters</span>
                <div class="tool-guide-io-value">per_page: "10"<br>page: "2"</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input URL</span>
                <div class="tool-guide-io-value">https://myshop.com/sales?utm_source=newsletter&amp;utm_medium=email</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Parsed Parameters</span>
                <div class="tool-guide-io-value">utm_source: "newsletter"<br>utm_medium: "email"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const input = container.querySelector("#url-parser-input");
    const paramsContainer = container.querySelector("#url-params-container");
    const output = container.querySelector("#url-output");

    let baseUrl = "";
    let params = [];

    const rebuildUrl = () => {
      try {
        if (!baseUrl) {
          output.value = "";
          return;
        }
        const queryParams = new URLSearchParams();
        params.forEach(p => {
          if (p.key) {
            queryParams.append(p.key, p.value);
          }
        });
        const qs = queryParams.toString();
        output.value = baseUrl + (qs ? "?" + qs : "");
      } catch (e) {
        output.value = "";
      }
    };

    const renderParams = () => {
      paramsContainer.innerHTML = "";
      if (params.length === 0) {
        paramsContainer.innerHTML = `<span style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 12px 0;">No parameters parsed</span>`;
        return;
      }

      params.forEach((param, idx) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.gap = "10px";
        row.style.alignItems = "center";
        row.innerHTML = `
          <input type="text" class="form-input url-key-input" placeholder="Key" value="${param.key}" style="flex: 1; height: 36px; padding: 0 10px;" aria-label="Key">
          <input type="text" class="form-input url-val-input" placeholder="Value" value="${param.value}" style="flex: 2; height: 36px; padding: 0 10px;" aria-label="Value">
          <button class="tool-btn url-remove-btn" style="color: var(--accent-rose); border-color: rgba(244, 63, 94, 0.2); height: 36px; width: 36px; padding: 0; display: flex; align-items: center; justify-content: center;" title="Remove Parameter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
        `;

        row.querySelector(".url-key-input").addEventListener("input", (e) => {
          params[idx].key = e.target.value;
          rebuildUrl();
        });

        row.querySelector(".url-val-input").addEventListener("input", (e) => {
          params[idx].value = e.target.value;
          rebuildUrl();
        });

        row.querySelector(".url-remove-btn").addEventListener("click", () => {
          params.splice(idx, 1);
          renderParams();
          rebuildUrl();
        });

        paramsContainer.appendChild(row);
      });
    };

    input.addEventListener("input", () => {
      const val = input.value.trim();
      if (!val) {
        baseUrl = "";
        params = [];
        renderParams();
        output.value = "";
        return;
      }
      try {
        const urlObj = new URL(val);
        baseUrl = urlObj.origin + urlObj.pathname;
        params = [];
        urlObj.searchParams.forEach((value, key) => {
          params.push({ key, value });
        });
        renderParams();
        rebuildUrl();
      } catch (e) {
        // Fallback for partial URL or query strings
        const qIndex = val.indexOf("?");
        if (qIndex !== -1) {
          baseUrl = val.substring(0, qIndex);
          const qParams = new URLSearchParams(val.substring(qIndex));
          params = [];
          qParams.forEach((value, key) => {
            params.push({ key, value });
          });
          renderParams();
          rebuildUrl();
        } else {
          baseUrl = val;
          params = [];
          renderParams();
          output.value = val;
        }
      }
    });

    container.querySelector("#url-param-add")?.addEventListener("click", () => {
      params.push({ key: "", value: "" });
      renderParams();
      rebuildUrl();
    });

    container.querySelector("#url-copy-btn")?.addEventListener("click", () => {
      appInstance.copyText(output.value);
    });

    // Examples Tab Switching
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

    container.querySelector("#url-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        input.value = "https://api.github.com/repos/git/commits?per_page=10&page=2";
        input.dispatchEvent(new Event("input"));
        appInstance.showToast("Loaded sample API endpoint URL!", "info");
      } else {
        input.value = "https://myshop.com/sales?utm_source=newsletter&utm_medium=email";
        input.dispatchEvent(new Event("input"));
        appInstance.showToast("Loaded sample UTM marketing URL!", "info");
      }
    });
  }
};
