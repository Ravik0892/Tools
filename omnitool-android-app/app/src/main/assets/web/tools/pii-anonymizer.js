export default {
  id: "pii-anonymizer",
  name: "Client-Side PII Masker & Anonymizer",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Input Logs / Text Data</h3>
            <button class="tool-btn" id="pii-clear">Clear Input</button>
          </div>
          
          <!-- File drag and drop zone -->
          <div class="file-dropzone" id="pii-dropzone" style="border: 2px dashed var(--border-color); border-radius: 8px; padding: 14px; text-align: center; margin-bottom: 12px; background: rgba(255,255,255,0.02); cursor: pointer; transition: all 0.2s ease;">
            <span style="font-size: 13px; color: var(--text-muted);">📁 Drag & Drop log files (.log, .txt, .json, .csv) or <strong style="color: var(--accent-cyan);">Click to browse</strong></span>
            <input type="file" id="pii-file-input" accept=".txt,.log,.json,.csv" style="display: none;">
          </div>
          
          <textarea class="input-textarea" id="pii-input" placeholder="Paste logs, database records, CSV dumps, or any text containing sensitive PII here..." aria-label="PII Input Text" style="height: calc(100% - 100px); min-height: 250px;"></textarea>
          
          <div class="form-group" style="margin-top: 14px;">
            <label>Scan Strategy</label>
            <div style="display: flex; gap: 16px; margin-top: 6px;">
              <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;">
                <input type="radio" name="pii-strategy" value="redact" checked> Redact (Replace with [REDACTED])
              </label>
              <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;">
                <input type="radio" name="pii-strategy" value="hash"> Hash (SHA-256)
              </label>
              <label style="display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer;">
                <input type="radio" name="pii-strategy" value="mask"> Mask (Asterisks)
              </label>
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label>PII Scanners</label>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 8px;">
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; cursor: pointer;">
                <input type="checkbox" id="pii-scan-email" checked> Email Addresses
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; cursor: pointer;">
                <input type="checkbox" id="pii-scan-ip" checked> IP Addresses (v4/v6)
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; cursor: pointer;">
                <input type="checkbox" id="pii-scan-phone" checked> Phone Numbers
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; cursor: pointer;">
                <input type="checkbox" id="pii-scan-card" checked> Credit Card Numbers
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; cursor: pointer;">
                <input type="checkbox" id="pii-scan-ssn" checked> SSNs (Social Security)
              </label>
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; cursor: pointer;">
                <input type="checkbox" id="pii-scan-tokens" checked> Security Keys & Tokens
              </label>
            </div>
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="pii-custom-words">Custom Sensitive Words (comma-separated)</label>
            <input type="text" id="pii-custom-words" class="form-input" placeholder="e.g. SecretProject, API_KEY_X, John Smith" style="width: 100%; height: 38px; margin-top: 6px; padding: 0 12px; font-size: 13px;">
          </div>

          <div class="form-group" style="margin-top: 14px;">
            <label for="pii-json-keys">JSON Keys to Scrub (comma-separated)</label>
            <input type="text" id="pii-json-keys" class="form-input" placeholder="e.g. password, secret, token, key" style="width: 100%; height: 38px; margin-top: 6px; padding: 0 12px; font-size: 13px;">
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Masked / Anonymized Output</h3>
            <div style="display: flex; gap: 6px;">
              <button class="tool-btn accent-emerald" id="pii-copy">Copy Output</button>
              <button class="tool-btn secondary" id="pii-download">Download File</button>
            </div>
          </div>
          <textarea class="input-textarea" id="pii-output" placeholder="Cleaned text output will render here in real-time..." aria-label="PII Output Text" readonly style="height: calc(100% - 180px); min-height: 200px;"></textarea>
          
          <div class="form-group" style="margin-top: 14px; display: flex; flex-direction: column;">
            <label>Audit & Discovery Log</label>
            <div id="pii-audit-log" style="margin-top: 6px; padding: 12px; font-family: var(--font-mono); font-size: 11.5px; line-height: 1.6; border: 1px solid var(--border-color); border-radius: 8px; max-height: 140px; overflow-y: auto; text-align: left; background: rgba(0, 0, 0, 0.2);">
              No sensitive PII discovered yet.
            </div>
            <button class="tool-btn secondary" id="pii-export-audit" style="margin-top: 10px; font-size: 12px; width: 100%;">📋 Export Audit Report (JSON)</button>
          </div>
        </div>

        <!-- Quick Guide & Instruction Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="pii-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Select PII Filters</strong>: Toggle detection scanners for emails, IP addresses, phones, cards, and security tokens.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Target Specific Keys</strong>: Filter specific keys in JSON data streams to sanitize values automatically.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Export Audits</strong>: Copy outputs or download compliance JSON logs for audit reporting.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Token &amp; SSH Key Redaction</button>
                <button class="tool-guide-example-tab-btn" data-index="1">JSON Key Purge</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input Logs</span>
                <div class="tool-guide-io-value">GitHub key = ghp_vN41pWpYt73cZ0dE9m8o1K2s3t4b5z6x7c8v</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Redacted output</span>
                <div class="tool-guide-io-value">GitHub key = [REDACTED_GITHUB_TOKEN_1]</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input Logs</span>
                <div class="tool-guide-io-value">{"user": "Alice", "password": "mypassword123"}</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Masked output</span>
                <div class="tool-guide-io-value">{"user": "Alice", "password": "[REDACTED_JSON_VALUE_1]"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const piiInput = container.querySelector("#pii-input");
    const piiOutput = container.querySelector("#pii-output");
    const piiAuditLog = container.querySelector("#pii-audit-log");
    const customWordsInput = container.querySelector("#pii-custom-words");
    const jsonKeysInput = container.querySelector("#pii-json-keys");

    const scanEmailCheck = container.querySelector("#pii-scan-email");
    const scanIpCheck = container.querySelector("#pii-scan-ip");
    const scanPhoneCheck = container.querySelector("#pii-scan-phone");
    const scanCardCheck = container.querySelector("#pii-scan-card");
    const scanSsnCheck = container.querySelector("#pii-scan-ssn");
    const scanTokensCheck = container.querySelector("#pii-scan-tokens");

    const copyBtn = container.querySelector("#pii-copy");
    const downloadBtn = container.querySelector("#pii-download");
    const clearBtn = container.querySelector("#pii-clear");
    const exportAuditBtn = container.querySelector("#pii-export-audit");

    const dropzone = container.querySelector("#pii-dropzone");
    const fileInput = container.querySelector("#pii-file-input");

    let currentAudit = [];

    // Drag-and-drop actions
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "var(--accent-cyan)";
      dropzone.style.background = "rgba(0, 242, 254, 0.05)";
    });
    dropzone.addEventListener("dragleave", () => {
      dropzone.style.borderColor = "var(--border-color)";
      dropzone.style.background = "rgba(255,255,255,0.02)";
    });
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "var(--border-color)";
      dropzone.style.background = "rgba(255,255,255,0.02)";
      if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
      }
    });

    const handleFile = (file) => {
      const reader = new FileReader();
      reader.onload = (evt) => {
        piiInput.value = evt.target.result;
        processAnonymization();
        appInstance.showToast(`Loaded ${file.name} successfully!`, "info");
      };
      reader.readAsText(file);
    };

    // Native SHA-256 helper
    const sha256 = async (message) => {
      const msgBuffer = new TextEncoder().encode(message);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    const luhnCheck = (numStr) => {
      let sum = 0;
      let shouldDouble = false;
      for (let i = numStr.length - 1; i >= 0; i--) {
        let digit = parseInt(numStr.charAt(i), 10);
        if (shouldDouble) {
          if ((digit *= 2) > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
      }
      return sum % 10 === 0;
    };

    const maskValue = (val, type) => {
      if (type === 'Email') {
        const parts = val.split('@');
        const name = parts[0];
        const domain = parts[1];
        if (name.length <= 2) {
          return name.charAt(0) + '*' + '@' + domain;
        }
        return name.slice(0, 2) + '*'.repeat(name.length - 2) + '@' + domain;
      } else if (type === 'IP Address') {
        if (val.includes('.')) {
          const parts = val.split('.');
          return parts[0] + '.' + parts[1] + '.x.x';
        }
        return val.slice(0, 4) + ':xxxx:xxxx';
      } else if (type === 'Credit Card') {
        const clean = val.replace(/[ -]/g, '');
        return '*'.repeat(clean.length - 4) + clean.slice(-4);
      } else if (type === 'SSN') {
        return '***-**-' + val.slice(-4);
      } else {
        const clean = val.replace(/[^0-9]/g, '');
        if (clean.length > 4) {
          return val.slice(0, 3) + '*'.repeat(val.length - 6) + val.slice(-3);
        }
        return '*'.repeat(val.length);
      }
    };

    const processAnonymization = async () => {
      const text = piiInput.value;
      if (!text.trim()) {
        piiOutput.value = "";
        piiAuditLog.innerHTML = "No sensitive PII discovered yet.";
        currentAudit = [];
        return;
      }

      const strategy = container.querySelector('input[name="pii-strategy"]:checked').value;
      
      const config = {
        email: scanEmailCheck.checked,
        ip: scanIpCheck.checked,
        phone: scanPhoneCheck.checked,
        creditCard: scanCardCheck.checked,
        ssn: scanSsnCheck.checked,
        tokens: scanTokensCheck.checked
      };

      const customWordsStr = customWordsInput.value;
      const jsonKeysStr = jsonKeysInput.value;
      const matches = [];

      if (config.email) {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        let match;
        while ((match = emailRegex.exec(text)) !== null) {
          matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'Email' });
        }
      }

      if (config.ip) {
        const ipRegex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g;
        let match;
        while ((match = ipRegex.exec(text)) !== null) {
          matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'IP Address' });
        }
        const ipv6Regex = /\b(?:[A-Fa-f0-9]{1,4}:){3,7}[A-Fa-f0-9]{1,4}\b/g;
        while ((match = ipv6Regex.exec(text)) !== null) {
          if (!matches.some(m => m.start === match.index)) {
            matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'IP Address' });
          }
        }
      }

      if (config.phone) {
        const phoneRegex = /\+?\b\d{1,4}[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}\b/g;
        let match;
        while ((match = phoneRegex.exec(text)) !== null) {
          if (match[0].replace(/[-.\s\(\)\+]/g, '').length >= 7) {
            matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'Phone Number' });
          }
        }
      }

      if (config.creditCard) {
        const ccRegex = /\b(?:\d[ -]*?){13,19}\b/g;
        let match;
        while ((match = ccRegex.exec(text)) !== null) {
          const clean = match[0].replace(/[ -\s]/g, '');
          if (luhnCheck(clean)) {
            matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'Credit Card' });
          }
        }
      }

      if (config.ssn) {
        const ssnRegex = /\b\d{3}-\d{2}-\d{4}\b/g;
        let match;
        while ((match = ssnRegex.exec(text)) !== null) {
          matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'SSN' });
        }
      }

      if (config.tokens) {
        // AWS
        const awsRegex = /(?:A3T[A-Z0-9]|AKIA|AGPA|AIDA|AROA|ASCA|ASIA)[A-Z0-9]{16}/g;
        let match;
        while ((match = awsRegex.exec(text)) !== null) {
          matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'AWS Key' });
        }
        // GitHub
        const ghRegex = /\b(gh[pous]_[a-zA-Z0-9]{36,255})\b/g;
        while ((match = ghRegex.exec(text)) !== null) {
          matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'GitHub Token' });
        }
        // Private Key
        const pkeyRegex = /-----BEGIN [A-Z ]+ PRIVATE KEY-----[a-zA-Z0-9/+= \r\n]+?-----END [A-Z ]+ PRIVATE KEY-----/gi;
        while ((match = pkeyRegex.exec(text)) !== null) {
          matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'Private Key' });
        }
        // Auth Header value
        const authRegex = /\b(?:Bearer|Basic) [a-zA-Z0-9._~\+\/=-]{15,}\b/g;
        while ((match = authRegex.exec(text)) !== null) {
          matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'Auth Header' });
        }
      }

      if (customWordsStr) {
        const words = customWordsStr.split(',').map(w => w.trim()).filter(w => w.length > 0);
        words.forEach(w => {
          const escaped = w.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const regex = new RegExp('\\b' + escaped + '\\b', 'gi');
          let match;
          while ((match = regex.exec(text)) !== null) {
            matches.push({ start: match.index, end: match.index + match[0].length, value: match[0], type: 'Custom Word' });
          }
        });
      }

      if (jsonKeysStr) {
        const keys = jsonKeysStr.split(',').map(k => k.trim()).filter(k => k.length > 0);
        keys.forEach(k => {
          const escaped = k.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const jsonKeyRegex = new RegExp('"' + escaped + '"\\s*:\\s*(?:"([^"]*)"|([0-9.-]+)|(true|false|null))', 'gi');
          let match;
          while ((match = jsonKeyRegex.exec(text)) !== null) {
            const fullMatch = match[0];
            const colonIdx = fullMatch.indexOf(':');
            const valueStartRelative = colonIdx + 1 + fullMatch.substring(colonIdx + 1).search(/\S/);
            
            let valStr = fullMatch.substring(valueStartRelative);
            let cleanVal = valStr;
            if (valStr.startsWith('"') && valStr.endsWith('"')) {
              cleanVal = valStr.substring(1, valStr.length - 1);
            }
            
            matches.push({
              start: match.index + valueStartRelative,
              end: match.index + fullMatch.length,
              value: cleanVal,
              type: 'JSON Value'
            });
          }
        });
      }

      // De-duplicate & Sort descending by start index to prevent shifting index issues during replacements
      matches.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
      const cleanMatches = [];
      let lastEnd = -1;
      for (const m of matches) {
        if (m.start >= lastEnd) {
          cleanMatches.push(m);
          lastEnd = m.end;
        }
      }

      cleanMatches.sort((a, b) => b.start - a.start);

      const typeCounters = {};
      const valueReplacements = {};
      const audit = [];
      const outputChars = text.split('');

      for (const m of cleanMatches) {
        const val = m.value;
        const type = m.type;

        if (!typeCounters[type]) {
          typeCounters[type] = 0;
        }

        let replacement = '';
        if (valueReplacements[val]) {
          replacement = valueReplacements[val];
        } else {
          typeCounters[type]++;
          const idx = typeCounters[type];

          if (strategy === 'redact') {
            replacement = `[REDACTED_${type.toUpperCase().replace(/ /g, '_')}_${idx}]`;
          } else if (strategy === 'hash') {
            const hash = await sha256(val);
            replacement = `[HASHED_${hash.slice(0, 8).toUpperCase()}]`;
          } else if (strategy === 'mask') {
            replacement = maskValue(val, type);
          }
          valueReplacements[val] = replacement;
        }

        outputChars.splice(m.start, m.end - m.start, replacement);
        audit.push({ type, original: val, replacement });
      }

      piiOutput.value = outputChars.join('');
      currentAudit = audit;

      if (audit.length === 0) {
        piiAuditLog.innerHTML = `<span style="color: var(--accent-emerald);">✔ Scan Complete: No PII discovered.</span>`;
      } else {
        const reversedAudit = audit.reverse();
        piiAuditLog.innerHTML = reversedAudit.map(item => {
          return `<div style="margin-bottom: 4px;">• <strong style="color: var(--accent-cyan);">${item.type}</strong>: <span style="opacity: 0.7;">"${item.original}"</span> ➔ <strong style="color: var(--accent-emerald);">${item.replacement}</strong></div>`;
        }).join("");
      }
    };

    // Listeners for triggers
    piiInput.addEventListener("input", processAnonymization);
    customWordsInput.addEventListener("input", processAnonymization);
    jsonKeysInput.addEventListener("input", processAnonymization);

    container.querySelectorAll('input[name="pii-strategy"]').forEach(radio => {
      radio.addEventListener("change", processAnonymization);
    });

    [scanEmailCheck, scanIpCheck, scanPhoneCheck, scanCardCheck, scanSsnCheck, scanTokensCheck].forEach(chk => {
      chk.addEventListener("change", processAnonymization);
    });

    clearBtn?.addEventListener("click", () => {
      piiInput.value = "";
      customWordsInput.value = "";
      jsonKeysInput.value = "";
      processAnonymization();
    });

    copyBtn?.addEventListener("click", () => {
      if (piiOutput.value) {
        appInstance.copyText(piiOutput.value);
        appInstance.showToast("Copied anonymized logs to clipboard!", "success");
      } else {
        appInstance.showToast("Nothing to copy!", "warning");
      }
    });

    downloadBtn?.addEventListener("click", () => {
      if (piiOutput.value) {
        const blob = new Blob([piiOutput.value], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "anonymized_logs.txt";
        link.click();
        appInstance.showToast("Downloaded clean logs file!", "success");
      } else {
        appInstance.showToast("No data to download!", "warning");
      }
    });

    exportAuditBtn?.addEventListener("click", () => {
      if (currentAudit && currentAudit.length > 0) {
        const report = {
          timestamp: new Date().toISOString(),
          totalPurged: currentAudit.length,
          details: currentAudit.map(item => ({
            type: item.type,
            original: item.original,
            replacement: item.replacement
          }))
        };
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `pii_compliance_report_${Date.now()}.json`;
        link.click();
        appInstance.showToast("Downloaded compliance audit report!", "success");
      } else {
        appInstance.showToast("No PII detected to generate a report.", "warning");
      }
    });

    // Sample Example tab bindings
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

    container.querySelector("#pii-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        piiInput.value = `[2026-07-01 10:14:02] INFO auth_service: User login attempt by alice.smith@company-corp.com
[2026-07-01 10:14:03] INFO auth_service: Connection received from client IPv4: 172.16.254.1
[2026-07-01 10:14:05] WARN auth_service: GitHub key = ghp_vN41pWpYt73cZ0dE9m8o1K2s3t4b5z6x7c8v`;
        container.querySelector('input[name="pii-strategy"][value="redact"]').checked = true;
        customWordsInput.value = "auth_service";
        jsonKeysInput.value = "";
        processAnonymization();
        appInstance.showToast("Loaded sample log text with Email, IP, and Token!", "info");
      } else {
        piiInput.value = `{
  "username": "super_admin",
  "secret_token": "bearer_Token_ABC123XYZ456",
  "auth_details": {
    "password_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "pin": 9988
  }
}`;
        container.querySelector('input[name="pii-strategy"][value="redact"]').checked = true;
        customWordsInput.value = "";
        jsonKeysInput.value = "secret_token, password_hash, pin";
        processAnonymization();
        appInstance.showToast("Loaded sample JSON payload with sensitive keys!", "info");
      }
    });

    // Load initial example automatically
    piiInput.value = `[2026-07-01 12:00:00] INFO main: Initializing server session.
[2026-07-01 12:00:02] DEBUG tracker: Client request from IP 192.168.1.1 using user key: admin.secret@company.org
[2026-07-01 12:00:05] ERROR core: DB write blocked. User details: SSN 123-45-6789, credit card 4111-2222-3333-4444.`;
    processAnonymization();
  }
};
