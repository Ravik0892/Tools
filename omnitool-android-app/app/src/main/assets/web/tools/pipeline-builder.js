import {
  md5,
  jsonFormat,
  jsonMinify,
  base64Encode,
  base64Decode,
  urlEncode,
  urlDecode,
  textUpper,
  textLower,
  textTitle,
  textCamel,
  textSnake,
  textKebab
} from './utils.js';

const importedEngines = {
  hashMd5: md5,
  jsonFormat,
  jsonMinify,
  base64Encode,
  base64Decode,
  urlEncode,
  urlDecode,
  textUpper,
  textLower,
  textTitle,
  textCamel,
  textSnake,
  textKebab
};

// Custom engines and transformers
async function hashSha256(str) {
  const msgUint8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashSha512(str) {
  const msgUint8 = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function regexReplace(str, pattern, replacement, flags = "g") {
  if (!pattern) return str;
  try {
    const re = new RegExp(pattern, flags);
    return str.replace(re, replacement);
  } catch (e) {
    throw new Error(`Invalid regex: ${e.message}`);
  }
}

function textTrim(str) {
  return str.trim();
}

function stripHtml(str) {
  const doc = new DOMParser().parseFromString(str, 'text/html');
  return doc.body.textContent || "";
}

function sortLines(str, direction = "asc") {
  const lines = str.split(/\r?\n/);
  lines.sort((a, b) => a.localeCompare(b));
  if (direction === "desc") {
    lines.reverse();
  }
  return lines.join('\n');
}

function removeDuplicates(str) {
  const lines = str.split(/\r?\n/);
  return [...new Set(lines)].join('\n');
}

function removeEmptyLines(str) {
  return str.split(/\r?\n/).filter(line => line.trim() !== "").join('\n');
}

function prefixSuffix(str, prefix = "", suffix = "") {
  return str.split(/\r?\n/).map(line => prefix + line + suffix).join('\n');
}

function obfuscateRot13(str) {
  return str.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
}

function executeCustomJs(str, code) {
  try {
    let fn;
    if (code.trim().startsWith('(') || code.trim().startsWith('function')) {
      fn = new Function(`return (${code})`)();
    } else {
      fn = new Function('input', code);
    }
    const result = fn(str);
    return typeof result === 'string' ? result : String(result);
  } catch (e) {
    throw new Error(`Custom JS Error: ${e.message}`);
  }
}

const escapeHtmlForVal = (str) => {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

const getConfigHtml = (node) => {
  const op = node.op;
  if (op === "regexReplace") {
    return `
      <div style="display: flex; gap: 8px;">
        <div style="flex: 1;">
          <label style="font-size: 11px; color: var(--text-muted);">Regex Pattern</label>
          <input type="text" class="form-select node-regex-pattern" style="height: 32px; font-family: monospace; font-size: 12px; padding: 0 8px;" placeholder="e.g. \\d+" value="${escapeHtmlForVal(node.regexPattern || '')}">
        </div>
        <div style="flex: 1;">
          <label style="font-size: 11px; color: var(--text-muted);">Replacement</label>
          <input type="text" class="form-select node-regex-replacement" style="height: 32px; font-family: monospace; font-size: 12px; padding: 0 8px;" placeholder="e.g. XXX" value="${escapeHtmlForVal(node.regexReplacement || '')}">
        </div>
        <div style="width: 70px;">
          <label style="font-size: 11px; color: var(--text-muted);">Flags</label>
          <input type="text" class="form-select node-regex-flags" style="height: 32px; font-family: monospace; font-size: 12px; padding: 0 8px;" placeholder="g" value="${escapeHtmlForVal(node.regexFlags || 'g')}">
        </div>
      </div>
    `;
  }
  if (op === "prefixSuffix") {
    return `
      <div style="display: flex; gap: 8px;">
        <div style="flex: 1;">
          <label style="font-size: 11px; color: var(--text-muted);">Prefix</label>
          <input type="text" class="form-select node-prefix-text" style="height: 32px; font-size: 12px; padding: 0 8px;" placeholder="Prefix text..." value="${escapeHtmlForVal(node.prefixText || '')}">
        </div>
        <div style="flex: 1;">
          <label style="font-size: 11px; color: var(--text-muted);">Suffix</label>
          <input type="text" class="form-select node-suffix-text" style="height: 32px; font-size: 12px; padding: 0 8px;" placeholder="Suffix text..." value="${escapeHtmlForVal(node.suffixText || '')}">
        </div>
      </div>
    `;
  }
  if (op === "sortLines") {
    return `
      <div>
        <label style="font-size: 11px; color: var(--text-muted);">Sort Direction</label>
        <select class="form-select node-sort-direction" style="height: 32px; font-size: 12px; padding: 0 8px;">
          <option value="asc" ${node.sortDirection === 'asc' ? 'selected' : ''}>Ascending (A-Z)</option>
          <option value="desc" ${node.sortDirection === 'desc' ? 'selected' : ''}>Descending (Z-A)</option>
        </select>
      </div>
    `;
  }
  if (op === "customJs") {
    return `
      <div>
        <label style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span>Custom JS Arrow Function</span>
          <span style="color: var(--accent-cyan); font-family: monospace; font-size: 10px;">(input) => { ... }</span>
        </label>
        <textarea class="input-textarea node-custom-js" style="font-family: monospace; font-size: 12px; min-height: 80px; padding: 8px;" placeholder="(input) => {\n  return input.toUpperCase();\n}">${escapeHtmlForVal(node.customJsCode || '(input) => {\n  return input;\n}')}</textarea>
      </div>
    `;
  }
  return '';
};

export default {
  id: "pipeline-builder",
  name: "Smart Chain Pipeline Builder",
  renderUI() {
    return `
      <style>
        .node-controls button.icon-only {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 13px;
          padding: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          width: 24px;
          height: 24px;
          transition: all 0.2s;
        }
        .node-controls button.icon-only:hover:not(:disabled) {
          color: var(--text-main);
          background-color: rgba(255, 255, 255, 0.08);
        }
        .node-controls button.icon-only:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }
      </style>
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

          <!-- Presets Manager -->
          <div style="border-top: 1px solid var(--border-color); margin-top: 24px; padding-top: 20px;">
            <div class="panel-header" style="border: none; padding: 0; margin-bottom: 12px;">
              <h3>Saved Presets</h3>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; gap: 8px;">
                <select class="form-select" id="pipeline-preset-select" style="flex: 1; height: 36px; padding: 0 12px; border-radius: 8px;">
                  <option value="">-- Load Saved Preset --</option>
                </select>
                <button class="tool-btn secondary" id="pipeline-preset-delete" title="Delete preset" style="padding: 0 12px; height: 36px;">🗑️</button>
              </div>
              <div style="display: flex; gap: 8px;">
                <input type="text" class="form-select" id="pipeline-preset-name" placeholder="New Preset Name..." style="flex: 1; height: 36px; padding: 0 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-input); color: var(--text-main);">
                <button class="tool-btn primary" id="pipeline-preset-save" style="font-size: 12px; height: 36px; padding: 0 16px;">Save Current</button>
              </div>
              <div style="display: flex; gap: 8px; margin-top: 4px;">
                <button class="tool-btn secondary" id="pipeline-preset-export" style="font-size: 11px; flex: 1; justify-content: center; height: 32px;">📤 Export Config</button>
                <button class="tool-btn secondary" id="pipeline-preset-import" style="font-size: 11px; flex: 1; justify-content: center; height: 32px;">📥 Import Config</button>
              </div>
              <div style="font-size: 11px; color: var(--accent-cyan); opacity: 0.85; margin-top: 8px; line-height: 1.4; border-top: 1px dashed rgba(255,255,255,0.06); padding-top: 8px; text-align: left;">
                ⚠️ <strong>Data Retention Note</strong>: Presets are saved locally in your browser storage. Clearing browser cache will erase them. Use <strong>Export Config</strong> to download backups for important workflows.
              </div>
            </div>
          </div>
        </div>
        
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Pipeline Data Flow</h3>
          </div>
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label for="pipe-input" style="margin: 0;">Initial Input Text</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="file" id="pipe-file-input" style="display: none;">
                <button class="tool-btn secondary" id="pipe-upload-btn" style="padding: 4px 8px; font-size: 11px; height: 28px;">📂 Load File</button>
              </div>
            </div>
            <textarea class="input-textarea" id="pipe-input" placeholder="Type initial input string to feed into the pipeline..." aria-label="Pipeline Initial Input"></textarea>
          </div>
          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 14px;">
            <div class="panel-header" style="border: none; padding: 0; display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label style="margin: 0;">Final Processed Output</label>
              <div style="display: flex; gap: 8px;">
                <button class="tool-btn accent-emerald" id="pipe-copy-btn" style="padding: 4px 8px; font-size: 11px; height: 28px;"><svg viewBox="0 0 24 24" width="12" height="12" style="margin-right: 3px; fill: none; stroke: currentColor; stroke-width: 2;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Output</button>
                <button class="tool-btn primary" id="pipe-download-btn" style="padding: 4px 8px; font-size: 11px; height: 28px;">💾 Download</button>
              </div>
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
              <div class="tool-guide-step-text"><strong>Add Pipeline Steps</strong>: Click <strong>+ Add Step</strong> to insert a new processing node. Select an action like Base64, Regex, or Custom JS.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Configure & Reorder</strong>: Customize properties, reorder with arrows, or ignore errors per step. Use <strong>Show Intermediate Output</strong> to preview steps.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Save & Export Presets</strong>: Save setups locally or export/import them. Load text files or download the final result instantly.</div>
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
    const presetSelect = container.querySelector("#pipeline-preset-select");
    const presetNameInput = container.querySelector("#pipeline-preset-name");

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
      { value: "hashMd5", label: "MD5 Hashing" },
      { value: "hashSha256", label: "SHA-256 Hashing" },
      { value: "hashSha512", label: "SHA-512 Hashing" },
      { value: "regexReplace", label: "Regex Replace" },
      { value: "textTrim", label: "Trim Whitespace" },
      { value: "stripHtml", label: "Strip HTML Tags" },
      { value: "sortLines", label: "Sort Lines" },
      { value: "removeDuplicates", label: "Remove Duplicate Lines" },
      { value: "removeEmptyLines", label: "Remove Empty Lines" },
      { value: "prefixSuffix", label: "Add Prefix / Suffix (Per Line)" },
      { value: "obfuscateRot13", label: "ROT13 Obfuscation" },
      { value: "customJs", label: "Custom JS Function" }
    ];

    let currentPipeline = [
      {
        op: "base64Encode",
        ignoreError: false,
        regexPattern: "",
        regexReplacement: "",
        regexFlags: "g",
        prefixText: "",
        suffixText: "",
        sortDirection: "asc",
        customJsCode: "(input) => {\n  return input;\n}",
        showPreview: false,
        stepOutput: ""
      },
      {
        op: "textUpper",
        ignoreError: false,
        regexPattern: "",
        regexReplacement: "",
        regexFlags: "g",
        prefixText: "",
        suffixText: "",
        sortDirection: "asc",
        customJsCode: "(input) => {\n  return input;\n}",
        showPreview: false,
        stepOutput: ""
      }
    ];

    const executeNode = async (node, input) => {
      const op = node.op;
      if (op === "hashSha256") {
        return await hashSha256(input);
      }
      if (op === "hashSha512") {
        return await hashSha512(input);
      }
      if (op === "regexReplace") {
        return regexReplace(input, node.regexPattern, node.regexReplacement, node.regexFlags);
      }
      if (op === "textTrim") {
        return textTrim(input);
      }
      if (op === "stripHtml") {
        return stripHtml(input);
      }
      if (op === "sortLines") {
        return sortLines(input, node.sortDirection || "asc");
      }
      if (op === "removeDuplicates") {
        return removeDuplicates(input);
      }
      if (op === "removeEmptyLines") {
        return removeEmptyLines(input);
      }
      if (op === "prefixSuffix") {
        return prefixSuffix(input, node.prefixText, node.suffixText);
      }
      if (op === "obfuscateRot13") {
        return obfuscateRot13(input);
      }
      if (op === "customJs") {
        return executeCustomJs(input, node.customJsCode);
      }
      
      // Fallback
      if (importedEngines[op]) {
        return importedEngines[op](input);
      }
      if (window.engines && window.engines[op]) {
        return window.engines[op](input);
      }
      throw new Error(`Unknown operation: ${op}`);
    };

    const runPipelineEngine = async () => {
      let currentData = pipeInput.value;
      if (!currentData) {
        pipeOutput.value = "";
        currentPipeline.forEach(node => {
          node.stepOutput = "";
        });
        updateIntermediatePreviews();
        return;
      }

      let limit = 0;
      let errored = false;
      
      for (const node of currentPipeline) {
        limit++;
        if (limit > 50) break;
        
        if (errored) {
          node.stepOutput = "[Skipped due to upstream error]";
          continue;
        }

        try {
          currentData = await executeNode(node, currentData);
          node.stepOutput = currentData;
          node.error = null;
        } catch (e) {
          node.error = e.message;
          node.stepOutput = `[Error]: ${e.message}`;
          if (!node.ignoreError) {
            errored = true;
            pipeOutput.value = `[Pipeline Error at step ${limit}]: ${e.message}`;
          }
        }
      }
      
      if (!errored) {
        pipeOutput.value = currentData;
      }
      
      updateIntermediatePreviews();
    };

    const updateIntermediatePreviews = () => {
      currentPipeline.forEach((node, index) => {
        const nodeEl = pipeNodeList.querySelector(`.pipeline-node[data-index="${index}"]`);
        if (nodeEl) {
          const previewTextarea = nodeEl.querySelector(".node-preview-content textarea");
          if (previewTextarea) {
            previewTextarea.value = node.stepOutput || "";
          }
        }
      });
    };

    const buildPipelineUI = () => {
      if (!pipeNodeList) return;
      pipeNodeList.innerHTML = "";
      
      currentPipeline.forEach((node, index) => {
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
        block.setAttribute("data-index", index);
        
        let selectOptions = "";
        pipeOptions.forEach(opt => {
          selectOptions += `<option value="${opt.value}" ${opt.value === node.op ? 'selected' : ''}>${opt.label}</option>`;
        });

        block.innerHTML = `
          <div class="node-header" style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="node-index">${index + 1}</span>
              <span style="font-size: 13px; font-weight: 700; color: var(--text-main);">Process Action</span>
            </div>
            <div class="node-controls" style="display: flex; align-items: center; gap: 8px;">
              <button class="node-move-up icon-only" title="Move Up" ${index === 0 ? 'disabled' : ''}>▲</button>
              <button class="node-move-down icon-only" title="Move Down" ${index === currentPipeline.length - 1 ? 'disabled' : ''}>▼</button>
              <label style="display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--text-muted); cursor: pointer; margin: 0; user-select: none;">
                <input type="checkbox" class="node-ignore-error" ${node.ignoreError ? 'checked' : ''}> Ignore Errors
              </label>
              <button class="node-remove" title="Remove step">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
          <select class="form-select node-op-select">
            ${selectOptions}
          </select>
          <div class="node-config-block">
            ${getConfigHtml(node)}
          </div>
          <div class="node-preview-block" style="margin-top: 10px; border-top: 1px dashed rgba(255, 255, 255, 0.08); padding-top: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <button class="tool-btn secondary node-preview-toggle" style="font-size: 11px; padding: 4px 8px; height: 26px;">
                ${node.showPreview ? 'Hide Intermediate Output' : 'Show Intermediate Output'}
              </button>
            </div>
            <div class="node-preview-content" style="display: ${node.showPreview ? 'block' : 'none'}; margin-top: 6px;">
              <textarea class="input-textarea" readonly style="font-family: monospace; font-size: 11px; min-height: 60px; background: rgba(0,0,0,0.2); padding: 6px;" placeholder="Step output will show here...">${node.stepOutput || ""}</textarea>
            </div>
          </div>
        `;

        // Event listeners for select changes
        block.querySelector(".node-op-select").addEventListener("change", (e) => {
          node.op = e.target.value;
          // Re-render config block and run
          block.querySelector(".node-config-block").innerHTML = getConfigHtml(node);
          bindConfigInputs();
          runPipelineEngine();
        });

        // Event listeners for controls
        block.querySelector(".node-remove").addEventListener("click", () => {
          currentPipeline.splice(index, 1);
          buildPipelineUI();
          runPipelineEngine();
        });

        block.querySelector(".node-move-up").addEventListener("click", () => {
          if (index > 0) {
            const temp = currentPipeline[index];
            currentPipeline[index] = currentPipeline[index - 1];
            currentPipeline[index - 1] = temp;
            buildPipelineUI();
            runPipelineEngine();
          }
        });

        block.querySelector(".node-move-down").addEventListener("click", () => {
          if (index < currentPipeline.length - 1) {
            const temp = currentPipeline[index];
            currentPipeline[index] = currentPipeline[index + 1];
            currentPipeline[index + 1] = temp;
            buildPipelineUI();
            runPipelineEngine();
          }
        });

        block.querySelector(".node-ignore-error").addEventListener("change", (e) => {
          node.ignoreError = e.target.checked;
          runPipelineEngine();
        });

        block.querySelector(".node-preview-toggle").addEventListener("click", (e) => {
          node.showPreview = !node.showPreview;
          const content = block.querySelector(".node-preview-content");
          if (content) {
            content.style.display = node.showPreview ? "block" : "none";
          }
          e.target.innerText = node.showPreview ? 'Hide Intermediate Output' : 'Show Intermediate Output';
        });

        const bindConfigInputs = () => {
          const regexPatternInput = block.querySelector(".node-regex-pattern");
          if (regexPatternInput) {
            regexPatternInput.addEventListener("input", (e) => {
              node.regexPattern = e.target.value;
              runPipelineEngine();
            });
          }
          const regexReplacementInput = block.querySelector(".node-regex-replacement");
          if (regexReplacementInput) {
            regexReplacementInput.addEventListener("input", (e) => {
              node.regexReplacement = e.target.value;
              runPipelineEngine();
            });
          }
          const regexFlagsInput = block.querySelector(".node-regex-flags");
          if (regexFlagsInput) {
            regexFlagsInput.addEventListener("input", (e) => {
              node.regexFlags = e.target.value;
              runPipelineEngine();
            });
          }
          const prefixInput = block.querySelector(".node-prefix-text");
          if (prefixInput) {
            prefixInput.addEventListener("input", (e) => {
              node.prefixText = e.target.value;
              runPipelineEngine();
            });
          }
          const suffixInput = block.querySelector(".node-suffix-text");
          if (suffixInput) {
            suffixInput.addEventListener("input", (e) => {
              node.suffixText = e.target.value;
              runPipelineEngine();
            });
          }
          const sortDirSelect = block.querySelector(".node-sort-direction");
          if (sortDirSelect) {
            sortDirSelect.addEventListener("change", (e) => {
              node.sortDirection = e.target.value;
              runPipelineEngine();
            });
          }
          const customJsInput = block.querySelector(".node-custom-js");
          if (customJsInput) {
            customJsInput.addEventListener("input", (e) => {
              node.customJsCode = e.target.value;
              runPipelineEngine();
            });
          }
        };

        bindConfigInputs();
        pipeNodeList.appendChild(block);
      });
    };

    container.querySelector("#pipe-add-node-btn")?.addEventListener("click", () => {
      currentPipeline.push({
        op: "textUpper",
        ignoreError: false,
        regexPattern: "",
        regexReplacement: "",
        regexFlags: "g",
        prefixText: "",
        suffixText: "",
        sortDirection: "asc",
        customJsCode: "(input) => {\n  return input;\n}",
        showPreview: false,
        stepOutput: ""
      });
      buildPipelineUI();
      runPipelineEngine();
    });

    pipeInput?.addEventListener("input", runPipelineEngine);
    container.querySelector("#pipe-copy-btn")?.addEventListener("click", () => appInstance.copyText(pipeOutput.value));

    // File Upload/Download
    const fileInput = container.querySelector("#pipe-file-input");
    const uploadBtn = container.querySelector("#pipe-upload-btn");
    
    uploadBtn?.addEventListener("click", () => fileInput?.click());
    
    fileInput?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (pipeInput) {
          pipeInput.value = event.target.result;
          runPipelineEngine();
          appInstance.showToast(`Loaded file: ${file.name}`, "success");
        }
      };
      reader.onerror = () => {
        appInstance.showToast("Failed to read file", "error");
      };
      reader.readAsText(file);
    });

    container.querySelector("#pipe-download-btn")?.addEventListener("click", () => {
      const outputText = pipeOutput.value;
      if (!outputText || outputText.startsWith("[Pipeline Error")) {
        appInstance.showToast("No valid output to download", "warning");
        return;
      }
      
      const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "pipeline_output.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      appInstance.showToast("Downloaded pipeline output", "success");
    });

    // Presets Manager Actions
    const loadPresetOptions = () => {
      if (!presetSelect) return;
      presetSelect.innerHTML = '<option value="">-- Load Saved Preset --</option>';
      
      try {
        const presets = JSON.parse(localStorage.getItem("omnitool_pipeline_presets") || "{}");
        Object.keys(presets).forEach(name => {
          const opt = document.createElement("option");
          opt.value = name;
          opt.textContent = name;
          presetSelect.appendChild(opt);
        });
      } catch (e) {
        console.error("Failed to load presets", e);
      }
    };

    container.querySelector("#pipeline-preset-save")?.addEventListener("click", () => {
      const name = presetNameInput.value.trim();
      if (!name) {
        appInstance.showToast("Please enter a preset name", "warning");
        return;
      }

      try {
        const presets = JSON.parse(localStorage.getItem("omnitool_pipeline_presets") || "{}");
        presets[name] = currentPipeline.map(node => ({
          op: node.op,
          ignoreError: !!node.ignoreError,
          regexPattern: node.regexPattern || "",
          regexReplacement: node.regexReplacement || "",
          regexFlags: node.regexFlags || "g",
          prefixText: node.prefixText || "",
          suffixText: node.suffixText || "",
          sortDirection: node.sortDirection || "asc",
          customJsCode: node.customJsCode || "(input) => {\n  return input;\n}",
          showPreview: !!node.showPreview
        }));
        
        localStorage.setItem("omnitool_pipeline_presets", JSON.stringify(presets));
        presetNameInput.value = "";
        loadPresetOptions();
        appInstance.showToast(`Preset "${name}" saved successfully!`, "success");
      } catch (e) {
        appInstance.showToast(`Failed to save preset: ${e.message}`, "error");
      }
    });

    presetSelect?.addEventListener("change", (e) => {
      const name = e.target.value;
      if (!name) return;

      try {
        const presets = JSON.parse(localStorage.getItem("omnitool_pipeline_presets") || "{}");
        const loaded = presets[name];
        if (loaded && Array.isArray(loaded)) {
          currentPipeline = loaded.map(node => ({
            op: node.op,
            ignoreError: !!node.ignoreError,
            regexPattern: node.regexPattern || "",
            regexReplacement: node.regexReplacement || "",
            regexFlags: node.regexFlags || "g",
            prefixText: node.prefixText || "",
            suffixText: node.suffixText || "",
            sortDirection: node.sortDirection || "asc",
            customJsCode: node.customJsCode || "(input) => {\n  return input;\n}",
            showPreview: !!node.showPreview,
            stepOutput: ""
          }));
          buildPipelineUI();
          runPipelineEngine();
          appInstance.showToast(`Preset "${name}" loaded`, "info");
        }
      } catch (e) {
        appInstance.showToast("Failed to load preset", "error");
      }
    });

    container.querySelector("#pipeline-preset-delete")?.addEventListener("click", () => {
      const name = presetSelect.value;
      if (!name) {
        appInstance.showToast("Select a preset to delete", "warning");
        return;
      }

      if (!confirm(`Are you sure you want to delete the preset "${name}"?`)) return;

      try {
        const presets = JSON.parse(localStorage.getItem("omnitool_pipeline_presets") || "{}");
        delete presets[name];
        localStorage.setItem("omnitool_pipeline_presets", JSON.stringify(presets));
        loadPresetOptions();
        appInstance.showToast(`Deleted preset "${name}"`, "success");
      } catch (e) {
        appInstance.showToast("Failed to delete preset", "error");
      }
    });

    container.querySelector("#pipeline-preset-export")?.addEventListener("click", () => {
      const configStr = JSON.stringify(currentPipeline.map(node => ({
        op: node.op,
        ignoreError: !!node.ignoreError,
        regexPattern: node.regexPattern || "",
        regexReplacement: node.regexReplacement || "",
        regexFlags: node.regexFlags || "g",
        prefixText: node.prefixText || "",
        suffixText: node.suffixText || "",
        sortDirection: node.sortDirection || "asc",
        customJsCode: node.customJsCode || "(input) => {\n  return input;\n}",
        showPreview: !!node.showPreview
      })), null, 2);
      
      appInstance.copyText(configStr);
      appInstance.showToast("Pipeline configuration copied to clipboard!", "success");
    });

    container.querySelector("#pipeline-preset-import")?.addEventListener("click", () => {
      const jsonStr = prompt("Paste pipeline JSON configuration here:");
      if (!jsonStr) return;

      try {
        const parsed = JSON.parse(jsonStr);
        if (Array.isArray(parsed)) {
          currentPipeline = parsed.map(node => ({
            op: node.op,
            ignoreError: !!node.ignoreError,
            regexPattern: node.regexPattern || "",
            regexReplacement: node.regexReplacement || "",
            regexFlags: node.regexFlags || "g",
            prefixText: node.prefixText || "",
            suffixText: node.suffixText || "",
            sortDirection: node.sortDirection || "asc",
            customJsCode: node.customJsCode || "(input) => {\n  return input;\n}",
            showPreview: !!node.showPreview,
            stepOutput: ""
          }));
          buildPipelineUI();
          runPipelineEngine();
          appInstance.showToast("Pipeline configuration imported!", "success");
        } else {
          throw new Error("Configuration must be a JSON array");
        }
      } catch (e) {
        appInstance.showToast(`Import failed: ${e.message}`, "error");
      }
    });

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
        currentPipeline = [
          {
            op: "base64Decode",
            ignoreError: false,
            regexPattern: "",
            regexReplacement: "",
            regexFlags: "g",
            prefixText: "",
            suffixText: "",
            sortDirection: "asc",
            customJsCode: "(input) => {\n  return input;\n}",
            showPreview: false,
            stepOutput: ""
          },
          {
            op: "textUpper",
            ignoreError: false,
            regexPattern: "",
            regexReplacement: "",
            regexFlags: "g",
            prefixText: "",
            suffixText: "",
            sortDirection: "asc",
            customJsCode: "(input) => {\n  return input;\n}",
            showPreview: false,
            stepOutput: ""
          }
        ];
        pipeInput.value = "eyJuYW1lIjoiT21uaVRvb2wgSHViIiwidmVyc2lvbiI6Mn0=";
        appInstance.showToast("Loaded example: Base64 Decode → UPPERCASE", "info");
      } else {
        currentPipeline = [
          {
            op: "urlDecode",
            ignoreError: false,
            regexPattern: "",
            regexReplacement: "",
            regexFlags: "g",
            prefixText: "",
            suffixText: "",
            sortDirection: "asc",
            customJsCode: "(input) => {\n  return input;\n}",
            showPreview: false,
            stepOutput: ""
          },
          {
            op: "jsonFormat",
            ignoreError: false,
            regexPattern: "",
            regexReplacement: "",
            regexFlags: "g",
            prefixText: "",
            suffixText: "",
            sortDirection: "asc",
            customJsCode: "(input) => {\n  return input;\n}",
            showPreview: false,
            stepOutput: ""
          },
          {
            op: "textUpper",
            ignoreError: false,
            regexPattern: "",
            regexReplacement: "",
            regexFlags: "g",
            prefixText: "",
            suffixText: "",
            sortDirection: "asc",
            customJsCode: "(input) => {\n  return input;\n}",
            showPreview: false,
            stepOutput: ""
          },
          {
            op: "base64Encode",
            ignoreError: false,
            regexPattern: "",
            regexReplacement: "",
            regexFlags: "g",
            prefixText: "",
            suffixText: "",
            sortDirection: "asc",
            customJsCode: "(input) => {\n  return input;\n}",
            showPreview: false,
            stepOutput: ""
          }
        ];
        pipeInput.value = "%7B%22name%22%3A%22john%22%2C%22age%22%3A30%7D";
        appInstance.showToast("Loaded example: URL Decode → JSON Format → UPPERCASE → Base64 Encode", "info");
      }
      buildPipelineUI();
      runPipelineEngine();
    });

    // Initial setup
    pipeInput.value = "Hello World! Dynamic pipelines are fast.";
    loadPresetOptions();
    buildPipelineUI();
    runPipelineEngine();
  }
};
