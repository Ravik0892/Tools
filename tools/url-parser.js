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
  }
};
