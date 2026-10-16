// OmniTool Hub - JSON-to-Code Interface Converter (Client-Side)
// Converts raw JSON payloads into strongly-typed models for TypeScript, Python, Go, and Rust.

export default {
  id: "json-to-types",
  name: "JSON-to-Code Interface Converter",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>JSON Input</h3>
            <div style="display: flex; gap: 8px;">
              <button class="tool-btn secondary" id="jtt-sample-btn" style="font-size: 11.5px;">Load Sample</button>
              <button class="tool-btn" id="jtt-clear-btn" style="font-size: 11.5px;">Clear</button>
            </div>
          </div>
          <textarea class="input-textarea" id="jtt-input" placeholder="Paste your raw JSON payload here..." aria-label="JSON Payload Input" style="min-height: 320px; font-family: var(--font-mono); font-size: 12.5px;"></textarea>

          <div style="display: flex; gap: 12px; margin-top: 14px; align-items: center;">
            <div style="flex: 1;">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px;">Root Model Name</label>
              <input type="text" id="jtt-root-name" class="form-input input-text" value="RootResponse" placeholder="e.g. UserResponse" style="height: 38px; font-family: var(--font-mono); font-size: 13px; width: 100%;" />
            </div>
            <div id="jtt-status-badge" style="font-size: 11.5px; font-family: var(--font-mono); padding: 8px 12px; border-radius: 6px; background: rgba(0, 242, 254, 0.08); color: var(--accent-cyan); align-self: flex-end; height: 38px; display: flex; align-items: center;">
              ● Valid JSON
            </div>
          </div>
        </div>

        <div class="tool-panel" style="gap: 16px;">
          <div class="panel-header" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px;">
            <h3>Typed Models</h3>
            <div class="tool-tabs" id="jtt-lang-tabs" style="margin: 0;">
              <button class="tool-tab-btn active" data-lang="ts">TypeScript</button>
              <button class="tool-tab-btn" data-lang="python">Python Pydantic</button>
              <button class="tool-tab-btn" data-lang="go">Go Structs</button>
              <button class="tool-tab-btn" data-lang="rust">Rust Serde</button>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <span id="jtt-lang-label" style="font-size: 11.5px; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">TypeScript Interface Definitions</span>
            <button class="tool-btn primary" id="jtt-copy-btn" style="padding: 5px 14px; font-size: 11.5px; display: inline-flex; align-items: center; gap: 6px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy Code</span>
            </button>
          </div>

          <pre class="output-pre" id="jtt-output-code" style="min-height: 320px; max-height: 460px; font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6;"></pre>
        </div>

        <!-- Quick Guide Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="jtt-try-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Paste JSON Payload</strong>: Enter any valid JSON object or array from an API response or database document.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Recursive Sub-Types</strong>: Nested JSON objects are automatically parsed into individual sub-interfaces and models.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Switch Language</strong>: Instantly export to TypeScript interfaces, Python Pydantic models, Go structs with json tags, or Rust Serde structs.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, app) {
    const inputEl = container.querySelector("#jtt-input");
    const outputEl = container.querySelector("#jtt-output-code");
    const rootNameEl = container.querySelector("#jtt-root-name");
    const statusEl = container.querySelector("#jtt-status-badge");
    const langLabel = container.querySelector("#jtt-lang-label");
    const copyBtn = container.querySelector("#jtt-copy-btn");
    const sampleBtn = container.querySelector("#jtt-sample-btn");
    const trySampleBtn = container.querySelector("#jtt-try-sample");
    const clearBtn = container.querySelector("#jtt-clear-btn");
    const langTabs = container.querySelectorAll("#jtt-lang-tabs .tool-tab-btn");

    let currentLang = "ts";

    const sampleJson = JSON.stringify({
      id: "usr_98124",
      username: "sarah_connor",
      email: "sarah@cyberdyne.org",
      is_active: true,
      role: "admin",
      credits: 450.75,
      profile: {
        first_name: "Sarah",
        last_name: "Connor",
        age: 34,
        tags: ["security", "devops", "cloud"]
      },
      settings: {
        two_factor_auth: true,
        notification_email: true,
        theme: "dark"
      }
    }, null, 2);

    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    const toPascalCase = (s) => s.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()).replace(/^\w/, c => c.toUpperCase());

    const generateTypeScript = (rootName, data) => {
      const interfaces = [];

      const walk = (name, obj) => {
        if (typeof obj !== 'object' || obj === null) return 'any';
        if (Array.isArray(obj)) {
          if (obj.length === 0) return 'any[]';
          const elemType = walk(name + 'Item', obj[0]);
          return `${elemType}[]`;
        }

        const lines = [`export interface ${name} {`];
        for (const [key, value] of Object.entries(obj)) {
          let typeStr = 'any';
          if (value === null || value === undefined) {
            typeStr = 'any';
          } else if (typeof value === 'string') {
            typeStr = 'string';
          } else if (typeof value === 'number') {
            typeStr = 'number';
          } else if (typeof value === 'boolean') {
            typeStr = 'boolean';
          } else if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
              const subName = toPascalCase(key) + 'Item';
              walk(subName, value[0]);
              typeStr = `${subName}[]`;
            } else if (value.length > 0) {
              typeStr = `${typeof value[0]}[]`;
            } else {
              typeStr = 'any[]';
            }
          } else if (typeof value === 'object') {
            const subName = toPascalCase(key);
            walk(subName, value);
            typeStr = subName;
          }
          lines.push(`  ${key}: ${typeStr};`);
        }
        lines.push(`}`);
        interfaces.push(lines.join('\n'));
        return name;
      };

      walk(rootName, data);
      return interfaces.reverse().join('\n\n');
    };

    const generatePython = (rootName, data) => {
      const models = [];

      const walk = (name, obj) => {
        if (typeof obj !== 'object' || obj === null) return 'Any';
        if (Array.isArray(obj)) {
          if (obj.length === 0) return 'List[Any]';
          const elemType = walk(name + 'Item', obj[0]);
          return `List[${elemType}]`;
        }

        const lines = [`class ${name}(BaseModel):`];
        const entries = Object.entries(obj);
        if (entries.length === 0) {
          lines.push(`    pass`);
        } else {
          for (const [key, value] of entries) {
            let pyType = 'Any';
            if (value === null || value === undefined) {
              pyType = 'Optional[Any] = None';
            } else if (typeof value === 'string') {
              pyType = 'str';
            } else if (typeof value === 'number') {
              pyType = Number.isInteger(value) ? 'int' : 'float';
            } else if (typeof value === 'boolean') {
              pyType = 'bool';
            } else if (Array.isArray(value)) {
              if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
                const subName = toPascalCase(key) + 'Item';
                walk(subName, value[0]);
                pyType = `List[${subName}]`;
              } else if (value.length > 0) {
                const inner = typeof value[0] === 'number' ? (Number.isInteger(value[0]) ? 'int' : 'float') : typeof value[0];
                pyType = `List[${inner}]`;
              } else {
                pyType = 'List[Any]';
              }
            } else if (typeof value === 'object') {
              const subName = toPascalCase(key);
              walk(subName, value);
              pyType = subName;
            }
            lines.push(`    ${key}: ${pyType}`);
          }
        }
        models.push(lines.join('\n'));
        return name;
      };

      walk(rootName, data);
      return `# Generated Python Models using Pydantic v2\nfrom typing import List, Optional, Any\nfrom pydantic import BaseModel\n\n` + models.reverse().join('\n\n');
    };

    const generateGo = (rootName, data) => {
      const structs = [];

      const walk = (name, obj) => {
        if (typeof obj !== 'object' || obj === null) return 'interface{}';
        if (Array.isArray(obj)) {
          if (obj.length === 0) return '[]interface{}';
          const elemType = walk(name + 'Item', obj[0]);
          return `[]${elemType}`;
        }

        const lines = [`type ${name} struct {`];
        for (const [key, value] of Object.entries(obj)) {
          const fieldName = toPascalCase(key);
          let goType = 'interface{}';
          if (typeof value === 'string') {
            goType = 'string';
          } else if (typeof value === 'number') {
            goType = Number.isInteger(value) ? 'int64' : 'float64';
          } else if (typeof value === 'boolean') {
            goType = 'bool';
          } else if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
              const subName = toPascalCase(key) + 'Item';
              walk(subName, value[0]);
              goType = `[]${subName}`;
            } else if (value.length > 0) {
              const inner = typeof value[0] === 'number' ? (Number.isInteger(value[0]) ? 'int64' : 'float64') : (typeof value[0] === 'string' ? 'string' : 'bool');
              goType = `[]${inner}`;
            } else {
              goType = '[]interface{}';
            }
          } else if (typeof value === 'object' && value !== null) {
            const subName = toPascalCase(key);
            walk(subName, value);
            goType = subName;
          }
          lines.push(`\t${fieldName} ${goType} \`json:"${key}"\``);
        }
        lines.push(`}`);
        structs.push(lines.join('\n'));
        return name;
      };

      walk(rootName, data);
      return `package models\n\n` + structs.reverse().join('\n\n');
    };

    const generateRust = (rootName, data) => {
      const structs = [];

      const walk = (name, obj) => {
        if (typeof obj !== 'object' || obj === null) return 'serde_json::Value';
        if (Array.isArray(obj)) {
          if (obj.length === 0) return 'Vec<serde_json::Value>';
          const elemType = walk(name + 'Item', obj[0]);
          return `Vec<${elemType}>`;
        }

        const lines = [
          `#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]`,
          `#[serde(rename_all = "camelCase")]`,
          `pub struct ${name} {`
        ];

        for (const [key, value] of Object.entries(obj)) {
          let fieldName = key.replace(/([A-Z])/g, '_$1').toLowerCase();
          if (fieldName === "type" || fieldName === "match" || fieldName === "ref") {
            fieldName = `r#${fieldName}`;
          }

          let rustType = 'serde_json::Value';
          if (typeof value === 'string') {
            rustType = 'String';
          } else if (typeof value === 'number') {
            rustType = Number.isInteger(value) ? 'i64' : 'f64';
          } else if (typeof value === 'boolean') {
            rustType = 'bool';
          } else if (Array.isArray(value)) {
            if (value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
              const subName = toPascalCase(key) + 'Item';
              walk(subName, value[0]);
              rustType = `Vec<${subName}>`;
            } else if (value.length > 0) {
              const inner = typeof value[0] === 'number' ? (Number.isInteger(value[0]) ? 'i64' : 'f64') : (typeof value[0] === 'string' ? 'String' : 'bool');
              rustType = `Vec<${inner}>`;
            } else {
              rustType = 'Vec<serde_json::Value>';
            }
          } else if (typeof value === 'object' && value !== null) {
            const subName = toPascalCase(key);
            walk(subName, value);
            rustType = subName;
          }

          lines.push(`    #[serde(rename = "${key}")]`);
          lines.push(`    pub ${fieldName}: ${rustType},`);
        }

        lines.push(`}`);
        structs.push(lines.join('\n'));
        return name;
      };

      walk(rootName, data);
      return `use serde::{Deserialize, Serialize};\n\n` + structs.reverse().join('\n\n');
    };

    const update = () => {
      const raw = inputEl.value.trim();
      const rootName = (rootNameEl.value || "RootResponse").trim().replace(/[^a-zA-Z0-9_]/g, '');

      if (!raw) {
        statusEl.innerHTML = `<span>Awaiting JSON...</span>`;
        statusEl.style.color = "var(--text-muted)";
        outputEl.innerText = `// Paste your JSON input on the left to generate strongly-typed models`;
        return;
      }

      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        statusEl.innerHTML = `<span style="color: var(--accent-rose);">⚠️ Invalid JSON</span>`;
        outputEl.innerText = `// Syntax Error: ${err.message}`;
        return;
      }

      statusEl.innerHTML = `<span style="color: var(--accent-emerald);">● Valid JSON (${typeof parsed === 'object' && parsed !== null ? (Array.isArray(parsed) ? 'Array' : 'Object') : typeof parsed})</span>`;

      try {
        let code = '';
        if (currentLang === 'ts') code = generateTypeScript(rootName, parsed);
        else if (currentLang === 'python') code = generatePython(rootName, parsed);
        else if (currentLang === 'go') code = generateGo(rootName, parsed);
        else if (currentLang === 'rust') code = generateRust(rootName, parsed);
        outputEl.innerText = code;
      } catch (genErr) {
        outputEl.innerText = `// Generation error: ${genErr.message}`;
      }
    };

    inputEl.addEventListener("input", update);
    rootNameEl.addEventListener("input", update);

    langTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        langTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentLang = tab.dataset.lang;

        const labels = {
          ts: "TypeScript Interface Definitions",
          python: "Python Pydantic Models",
          go: "Go Structs with JSON Tags",
          rust: "Rust Serde Structs"
        };
        langLabel.innerText = labels[currentLang] || currentLang;
        update();
        app.playSynthSound?.('click');
      });
    });

    copyBtn.addEventListener("click", () => {
      const code = outputEl.innerText;
      if (!code || code.startsWith("// Paste")) {
        app.showToast("Nothing to copy yet. Paste JSON first.", "info");
        return;
      }
      navigator.clipboard.writeText(code).then(() => {
        app.showToast("Generated model code copied!", "success");
        app.playSynthSound?.('copy');
      });
    });

    sampleBtn.addEventListener("click", () => {
      inputEl.value = sampleJson;
      update();
      app.showToast("Loaded sample JSON payload", "info");
      app.playSynthSound?.('click');
    });

    trySampleBtn.addEventListener("click", () => {
      inputEl.value = sampleJson;
      update();
      app.showToast("Loaded sample JSON payload", "info");
      app.playSynthSound?.('click');
    });

    clearBtn.addEventListener("click", () => {
      inputEl.value = "";
      update();
      app.playSynthSound?.('click');
    });

    // Initial load
    inputEl.value = sampleJson;
    update();
  }
};
