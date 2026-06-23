export default {
  id: "json-yaml-csv",
  name: "JSON / YAML / CSV Suite",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Input Data</h3>
            <div class="panel-actions">
              <button class="tool-btn" id="conv-load-sample">Sample</button>
              <button class="tool-btn" id="conv-clear">Clear</button>
            </div>
          </div>
          <div class="form-group">
            <label for="conv-source-format">Source Format</label>
            <select class="form-select" id="conv-source-format">
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          <textarea class="input-textarea" id="conv-input" placeholder='Paste JSON array or CSV text here...

Example JSON:
[
  {"name": "Alice", "role": "Dev"},
  {"name": "Bob", "role": "Designer"}
]' aria-label="Input Data"></textarea>
          <div class="form-row">
            <button class="tool-btn primary" id="conv-to-json-btn">Convert to JSON</button>
            <button class="tool-btn primary" id="conv-to-csv-btn">Convert to CSV</button>
          </div>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Output Result</h3>
            <div class="panel-actions">
              <button class="tool-btn accent-emerald" id="conv-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy</button>
            </div>
          </div>
          <textarea class="input-textarea" id="conv-output" readonly placeholder="Output will appear here..." aria-label="Output Result"></textarea>
        </div>

        <!-- Quick Guide -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Source Format</strong>: Select if you are inputting JSON or CSV.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Process</strong>: Press <strong>Convert to JSON</strong> (expects a CSV with header row) or <strong>Convert to CSV</strong> (expects a JSON array).</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Privacy</strong>: All data processing is done locally in your browser using JavaScript. No network calls are made.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const input = container.querySelector("#conv-input");
    const output = container.querySelector("#conv-output");
    const srcFormat = container.querySelector("#conv-source-format");

    container.querySelector("#conv-to-json-btn")?.addEventListener("click", () => {
      const val = input.value.trim();
      if (!val) return;
      try {
        if (srcFormat.value === "csv") {
          const lines = val.split("\n").map(l => {
            // Simple comma-splitter that respects quotes
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

    container.querySelector("#conv-load-sample")?.addEventListener("click", () => {
      if (srcFormat.value === "csv") {
        input.value = `id,name,role,department,location,salary_grade,joined_date\n1,Alice Smith,Software Engineer,Engineering,New York,E9,2024-03-15\n2,Bob Jones,UI Designer,Design,London,D8,2025-01-10\n3,Charlie Brown,Product Manager,Product,San Francisco,P9,2023-06-20\n4,Diana Prince,Security Architect,Operations,Boston,O10,2022-11-05\n5,Evan Wright,Data Scientist,Analytics,Chicago,E8,2024-07-22`;
      } else {
        input.value = JSON.stringify([
          { id: 1, name: "Alice Smith", role: "Software Engineer", department: "Engineering", location: "New York", salary_grade: "E9", joined_date: "2024-03-15" },
          { id: 2, name: "Bob Jones", role: "UI Designer", department: "Design", location: "London", salary_grade: "D8", joined_date: "2025-01-10" },
          { id: 3, name: "Charlie Brown", role: "Product Manager", department: "Product", location: "San Francisco", salary_grade: "P9", joined_date: "2023-06-20" },
          { id: 4, name: "Diana Prince", role: "Security Architect", department: "Operations", location: "Boston", salary_grade: "O10", joined_date: "2022-11-05" },
          { id: 5, name: "Evan Wright", role: "Data Scientist", department: "Analytics", location: "Chicago", salary_grade: "E8", joined_date: "2024-07-22" }
        ], null, 2);
      }
      appInstance.showToast("Loaded sample dataset!", "info");
    });

    container.querySelector("#conv-clear")?.addEventListener("click", () => {
      input.value = "";
      output.value = "";
    });

    container.querySelector("#conv-copy-btn")?.addEventListener("click", () => {
      appInstance.copyText(output.value);
    });
  }
};
