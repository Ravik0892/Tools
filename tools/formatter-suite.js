import { jsonFormat, jsonMinify } from './utils.js';

export default {
  id: "formatter-suite",
  name: "Data Formatter & Converter Suite",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Configuration</h3>
            <!-- Tabs inside config panel -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 320px; margin-left: 15px;" id="formatter-tabs">
              <button class="keyboard-tab active" data-tab="json" style="font-size: 11px; padding: 4px 8px;">JSON</button>
              <button class="keyboard-tab" data-tab="sql" style="font-size: 11px; padding: 4px 8px;">SQL</button>
              <button class="keyboard-tab" data-tab="csv" style="font-size: 11px; padding: 4px 8px;">CSV / JSON</button>
            </div>
          </div>

          <!-- Common Input -->
          <div class="form-group" style="margin-top: 15px;">
            <label for="formatter-input" id="formatter-input-label">Raw Input</label>
            <textarea class="input-textarea" id="formatter-input" placeholder="Paste your raw data here..." style="height: 140px; resize: vertical;" aria-label="Formatter Input"></textarea>
          </div>

          <!-- Tab 1: JSON Controls -->
          <div id="panel-json-controls" class="tab-control-panel" style="border: none; padding-top: 0; margin-top: 0;">
            <div class="form-row">
              <div class="form-group" style="width: 100%;">
                <label for="json-tab-size">Tab Spacing</label>
                <select class="form-select" id="json-tab-size" style="width: 100%;">
                  <option value="2">2 Spaces</option>
                  <option value="4" selected>4 Spaces</option>
                  <option value="tab">1 Tab</option>
                </select>
              </div>
            </div>
            <div class="form-row" style="gap: 10px; margin-top: 10px;">
              <button class="tool-btn primary" id="json-format-btn" style="flex: 1; justify-content: center;">Format JSON</button>
              <button class="tool-btn secondary" id="json-minify-btn" style="flex: 1; justify-content: center;">Minify JSON</button>
            </div>
          </div>

          <!-- Tab 2: SQL Controls -->
          <div id="panel-sql-controls" class="tab-control-panel hidden" style="border: none; padding-top: 0; margin-top: 0;">
            <button class="tool-btn primary" id="sql-format-btn" style="width: 100%; justify-content: center;">Format SQL Query</button>
          </div>

          <!-- Tab 3: CSV Controls -->
          <div id="panel-csv-controls" class="tab-control-panel hidden" style="border: none; padding-top: 0; margin-top: 0;">
            <div class="form-group">
              <label for="conv-source-format">Source Format</label>
              <select class="form-select" id="conv-source-format" style="width: 100%;">
                <option value="json">JSON Array</option>
                <option value="csv">CSV (with Header)</option>
              </select>
            </div>
            <div class="form-row" style="gap: 10px; margin-top: 10px;">
              <button class="tool-btn primary" id="conv-to-json-btn" style="flex: 1; justify-content: center;">Convert to JSON</button>
              <button class="tool-btn primary" id="conv-to-csv-btn" style="flex: 1; justify-content: center;">Convert to CSV</button>
            </div>
          </div>

          <!-- Common buttons -->
          <div style="display: flex; gap: 8px; margin-top: 15px; border-top: 1px solid var(--border-color); padding-top: 15px;">
            <button class="tool-btn secondary" id="formatter-clear-btn" style="flex: 1; justify-content: center;">Clear Input</button>
            <button class="tool-btn secondary" id="formatter-load-sample" style="flex: 1; justify-content: center;">Load Sample</button>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3 id="formatter-output-title">Formatted Output</h3>
            <button class="tool-btn accent-emerald" id="formatter-copy-btn">
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Output
            </button>
          </div>
          <div id="json-alert-box" style="display: none; margin-bottom: 12px; width: 100%;"></div>
          <textarea class="input-textarea" id="formatter-output" readonly placeholder="Result will appear here..." style="flex: 1; min-height: 250px; font-family: var(--font-mono); resize: none;" aria-label="Formatter Output"></textarea>
        </div>

        <!-- Dynamic Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="formatter-guide-title">Quick Guide: JSON Formatter & Validator</span>
            </div>
          </div>
          <div class="tool-guide-steps" id="formatter-guide-steps">
            <!-- Populated dynamically by JS -->
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
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .tab-control-panel.hidden {
          display: none !important;
        }
      </style>
    `;
  },
  init(container, appInstance) {
    const tabs = container.querySelectorAll("#formatter-tabs .keyboard-tab");
    const panelJson = container.querySelector("#panel-json-controls");
    const panelSql = container.querySelector("#panel-sql-controls");
    const panelCsv = container.querySelector("#panel-csv-controls");
    
    const input = container.querySelector("#formatter-input");
    const output = container.querySelector("#formatter-output");
    const outputTitle = container.querySelector("#formatter-output-title");
    const inputLabel = container.querySelector("#formatter-input-label");

    const guideTitle = container.querySelector("#formatter-guide-title");
    const guideSteps = container.querySelector("#formatter-guide-steps");

    // JSON Elements
    const jsonTab = container.querySelector("#json-tab-size");
    const jsonAlert = container.querySelector("#json-alert-box");

    // CSV Elements
    const srcFormat = container.querySelector("#conv-source-format");

    let activeTab = "json";

    const guides = {
      json: {
        title: "Quick Guide: JSON Formatter & Validator",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Paste JSON</strong>: Paste your raw, minified, or unformatted JSON string into the input box.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Choose Options</strong>: Set spacing (2 spaces, 4 spaces, or tab) and click <strong>Format JSON</strong> or <strong>Minify JSON</strong>.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Validation Result</strong>: An alert banner will display showing validation errors or green success checks.</div>
          </div>
        `
      },
      sql: {
        title: "Quick Guide: SQL Formatter & Beautifier",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Input Query</strong>: Paste single-line, raw, or complex database queries.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Format</strong>: Click <strong>Format SQL Query</strong> to capitalize SQL keywords and split commands into readable lines.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Save Output</strong>: Copy the beautified SQL structure back to your clipboard.</div>
          </div>
        `
      },
      csv: {
        title: "Quick Guide: JSON / CSV Converter",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Source Format</strong>: Select if you are inputting JSON or CSV.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Convert</strong>: Press <strong>Convert to JSON</strong> (expects CSV with header row) or <strong>Convert to CSV</strong> (expects JSON array).</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Copy Data</strong>: Click copy output to extract the converted payload.</div>
          </div>
        `
      }
    };

    const switchTab = (tabId, updateRoute = true) => {
      activeTab = tabId;
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));

      panelJson.classList.toggle("hidden", tabId !== "json");
      panelSql.classList.toggle("hidden", tabId !== "sql");
      panelCsv.classList.toggle("hidden", tabId !== "csv");

      // Reset JSON validation alert box when switching tabs
      jsonAlert.style.display = "none";

      if (tabId === "json") {
        outputTitle.innerText = "Formatted JSON Output";
        inputLabel.innerText = "Raw JSON Input";
        input.placeholder = "Paste raw or unformatted JSON here...";
      } else if (tabId === "sql") {
        outputTitle.innerText = "Beautified SQL Query";
        inputLabel.innerText = "Raw SQL Input";
        input.placeholder = "SELECT * FROM users JOIN orders ON users.id = orders.user_id WHERE users.active = 1;";
      } else if (tabId === "csv") {
        outputTitle.innerText = "Conversion Result";
        inputLabel.innerText = "Source Payload";
        input.placeholder = "Paste JSON array or CSV text here...";
      }

      if (guideTitle && guideSteps) {
        guideTitle.innerText = guides[tabId].title;
        guideSteps.innerHTML = guides[tabId].steps;
      }
      
      output.value = "";

      if (updateRoute && appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("formatter-suite", tabId, { pushHistory: true });
      }
    };

    // Tab switcher events
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        switchTab(tab.dataset.tab, true);
      });
    });

    // --- JSON Formatter logic ---
    const runJsonFormat = (minify = false) => {
      const raw = input.value.trim();
      if (!raw) {
        output.value = "";
        jsonAlert.style.display = "none";
        return;
      }
      try {
        let formatted;
        if (minify) {
          formatted = jsonMinify(raw);
        } else {
          const sizeVal = jsonTab?.value || "4";
          const spacing = sizeVal === "tab" ? "\t" : parseInt(sizeVal, 10);
          formatted = JSON.stringify(JSON.parse(raw), null, spacing);
        }
        output.value = formatted;
        jsonAlert.className = "tool-alert success";
        jsonAlert.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="9 11 11 13 15 9"></polyline></svg> <span>Valid JSON structure</span>`;
        jsonAlert.style.display = "flex";
        appInstance.showToast(minify ? "JSON Minified!" : "JSON Formatted!", "success");
      } catch (e) {
        output.value = "";
        jsonAlert.className = "tool-alert error";
        jsonAlert.innerHTML = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> <span>Error: ${e.message}</span>`;
        jsonAlert.style.display = "flex";
        appInstance.showToast("Invalid JSON format", "error");
      }
    };

    container.querySelector("#json-format-btn")?.addEventListener("click", () => runJsonFormat(false));
    container.querySelector("#json-minify-btn")?.addEventListener("click", () => runJsonFormat(true));

    // --- SQL Beautifier logic ---
    container.querySelector("#sql-format-btn")?.addEventListener("click", () => {
      const sql = input.value.trim();
      if (!sql) {
        appInstance.showToast("Please enter an SQL query first!", "warning");
        return;
      }
      try {
        const keywords = [
          "SELECT", "FROM", "WHERE", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
          "OUTER JOIN", "ON", "AND", "OR", "GROUP BY", "ORDER BY", "HAVING", "LIMIT",
          "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "UNION", "AS", "IN"
        ];

        let formatted = sql;

        // Capitalize matching keywords case-insensitively
        keywords.forEach(kw => {
          const regex = new RegExp("\\b" + kw + "\\b", "gi");
          formatted = formatted.replace(regex, kw);
        });

        // Insert new lines before major keywords
        const newlineKeywords = [
          "SELECT", "FROM", "WHERE", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN",
          "OUTER JOIN", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM"
        ];

        newlineKeywords.forEach(kw => {
          const regex = new RegExp("\\b" + kw + "\\b", "g");
          formatted = formatted.replace(regex, "\n" + kw);
        });

        // Clean up double newlines and spaces
        formatted = formatted.split("\n")
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join("\n");

        output.value = formatted;
        appInstance.showToast("SQL Formatted!", "success");
      } catch (e) {
        appInstance.showToast("Formatting failed: " + e.message, "error");
      }
    });

    // --- CSV Converter logic ---
    container.querySelector("#conv-to-json-btn")?.addEventListener("click", () => {
      const val = input.value.trim();
      if (!val) return;
      try {
        if (srcFormat.value === "csv") {
          const lines = val.split("\n").map(l => {
            const result = [];
            let current = "";
            let inQuotes = false;
            for (let i = 0; i < l.length; i++) {
              const char = l[i];
              if (char === '"') {
                inQuotes = !inQuotes;
              } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = "";
              } else {
                current += char;
              }
            }
            result.push(current.trim());
            return result;
          }).filter(l => l.length > 0 && l.some(cell => cell !== ""));

          if (lines.length === 0) {
            output.value = "[]";
            return;
          }

          const headers = lines[0];
          const result = lines.slice(1).map(row => {
            let obj = {};
            headers.forEach((h, i) => {
              let cellVal = row[i] || "";
              if (cellVal.startsWith('"') && cellVal.endsWith('"')) {
                cellVal = cellVal.substring(1, cellVal.length - 1);
              }
              obj[h] = cellVal;
            });
            return obj;
          });
          output.value = JSON.stringify(result, null, 2);
          appInstance.showToast("Converted CSV to JSON!", "success");
        } else {
          const parsed = JSON.parse(val);
          output.value = JSON.stringify(parsed, null, 2);
          appInstance.showToast("Formatted JSON!", "success");
        }
      } catch (e) {
        appInstance.showToast("Conversion failed: " + e.message, "error");
      }
    });

    container.querySelector("#conv-to-csv-btn")?.addEventListener("click", () => {
      const val = input.value.trim();
      if (!val) return;
      try {
        let jsonVal = null;
        if (srcFormat.value === "json") {
          jsonVal = JSON.parse(val);
        } else {
          output.value = val;
          appInstance.showToast("Input already in CSV format", "info");
          return;
        }

        if (Array.isArray(jsonVal)) {
          if (jsonVal.length === 0) {
            output.value = "";
            return;
          }
          const headers = Object.keys(jsonVal[0]);
          const csvLines = [
            headers.join(","),
            ...jsonVal.map(row => headers.map(h => {
              const cell = row[h] === undefined || row[h] === null ? "" : String(row[h]);
              return cell.includes(",") || cell.includes("\"") ? `"${cell.replace(/"/g, '""')}"` : cell;
            }).join(","))
          ];
          output.value = csvLines.join("\n");
          appInstance.showToast("Converted JSON to CSV!", "success");
        } else {
          appInstance.showToast("JSON must be an array of objects to build CSV rows", "error");
        }
      } catch (e) {
        appInstance.showToast("Conversion failed: " + e.message, "error");
      }
    });

    // --- Clear ---
    container.querySelector("#formatter-clear-btn")?.addEventListener("click", () => {
      input.value = "";
      output.value = "";
      jsonAlert.style.display = "none";
    });

    // --- Sample Loading ---
    container.querySelector("#formatter-load-sample")?.addEventListener("click", () => {
      if (activeTab === "json") {
        input.value = JSON.stringify({
          appName: "OmniTool Hub",
          version: 2.8,
          active: true,
          features: ["Offline PWA", "Smart Tool Chains", "Premium Neon Design"],
          metadata: {
            serverless: true,
            license: "MIT"
          }
        });
        runJsonFormat(false);
      } else if (activeTab === "sql") {
        input.value = "select u.id, u.name, count(o.id) as total_orders from users as u left join orders as o on u.id = o.user_id where u.status = 'active' group by u.id order by total_orders desc limit 10;";
        container.querySelector("#sql-format-btn")?.click();
      } else if (activeTab === "csv") {
        if (srcFormat.value === "csv") {
          input.value = `id,name,role,department,location\n1,Alice Smith,Software Engineer,Engineering,New York\n2,Bob Jones,UI Designer,Design,London\n3,Charlie Brown,Product Manager,Product,San Francisco\n4,Diana Prince,Security Architect,Operations,Boston`;
          container.querySelector("#conv-to-json-btn").click();
        } else {
          input.value = JSON.stringify([
            { id: 1, name: "Alice Smith", role: "Software Engineer", department: "Engineering", location: "New York" },
            { id: 2, name: "Bob Jones", role: "UI Designer", department: "Design", location: "London" },
            { id: 3, name: "Charlie Brown", role: "Product Manager", department: "Product", location: "San Francisco" }
          ], null, 2);
          container.querySelector("#conv-to-csv-btn").click();
        }
      }
    });

    // --- Copy Output ---
    container.querySelector("#formatter-copy-btn")?.addEventListener("click", () => {
      if (output.value) {
        appInstance.copyText(output.value);
      } else {
        appInstance.showToast("Nothing to copy!", "warning");
      }
    });

    // Register tab switcher with appInstance for browser back/forward (popstate)
    if (appInstance && typeof appInstance.registerTabSwitcher === "function") {
      appInstance.registerTabSwitcher("formatter-suite", (tabId) => switchTab(tabId, false));
    }

    // Set initial active tab
    const initialTab = appInstance.activeSubtab || 'json';
    appInstance.activeSubtab = null;
    switchTab(initialTab, false);
    const requestedSubtool = appInstance.activeSubtool;
    if (requestedSubtool && appInstance && typeof appInstance.syncSubtab === "function") {
      appInstance.syncSubtab("formatter-suite", requestedSubtool, { pushHistory: false, replaceHistory: true });
    }
  }
};
