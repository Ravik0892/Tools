import { escapeHtml } from './utils.js';

export default {
  id: "regex-tester",
  name: "Visual Regex & Extractor Suite",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <h3 style="margin: 0;">Configuration</h3>
            <!-- Tabs inside config panel -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 100%; flex-wrap: wrap;" id="regex-suite-tabs">
              <button class="keyboard-tab active" data-tab="tester" style="font-size: 11px; padding: 4px 8px;">Regex Tester</button>
              <button class="keyboard-tab" data-tab="extractor" style="font-size: 11px; padding: 4px 8px;">Extractor &amp; Replacer</button>
            </div>
          </div>

          <!-- TAB 1: Regex Tester Controls -->
          <div id="panel-tester-controls" class="tab-control-panel">
            <div class="form-row">
              <div class="form-group" style="grid-column: span 2;">
                <label for="regex-pattern">Pattern</label>
                <input type="text" id="regex-pattern" class="form-input" placeholder="[a-zA-Z0-9]+" style="font-family: var(--font-mono);" aria-label="Regex Pattern Input">
              </div>
              <div class="form-group">
                <label for="regex-flags">Flags</label>
                <input type="text" id="regex-flags" class="form-input" placeholder="g" value="g" style="font-family: var(--font-mono);" aria-label="Regex Flags Input">
              </div>
            </div>
            <div class="form-group" style="margin-top: -6px; margin-bottom: 12px;">
              <label style="font-size: 11px; color: var(--text-muted);">Quick Templates:</label>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                <button class="tool-btn secondary" id="regex-tpl-email" style="font-size: 10px; padding: 4px 8px; border-radius: 4px;">Email</button>
                <button class="tool-btn secondary" id="regex-tpl-url" style="font-size: 10px; padding: 4px 8px; border-radius: 4px;">URL</button>
                <button class="tool-btn secondary" id="regex-tpl-phone" style="font-size: 10px; padding: 4px 8px; border-radius: 4px;">Phone</button>
                <button class="tool-btn secondary" id="regex-tpl-date" style="font-size: 10px; padding: 4px 8px; border-radius: 4px;">Date (YYYY-MM-DD)</button>
                <button class="tool-btn secondary" id="regex-tpl-ipv4" style="font-size: 10px; padding: 4px 8px; border-radius: 4px;">IPv4</button>
              </div>
            </div>
            <div class="form-group">
              <label for="regex-text">Test String</label>
              <textarea class="input-textarea" id="regex-text" placeholder="Type text to match regex against..." style="height: 120px; resize: vertical;" aria-label="Regex Test String"></textarea>
            </div>
          </div>

          <!-- TAB 2: Extractor & Replacer Controls -->
          <div id="panel-extractor-controls" class="tab-control-panel hidden">
            <div class="form-group">
              <label for="ext-source-text">Source Text</label>
              <textarea class="input-textarea" id="ext-source-text" placeholder="Paste your raw text or documents here to scan for patterns..." style="height: 120px; resize: vertical;" aria-label="Extractor Source Text"></textarea>
            </div>
            <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 8px;">
              <div class="form-group">
                <label for="ext-pattern-select">Scan Template</label>
                <select class="form-select" id="ext-pattern-select" style="width: 100%;">
                  <option value="email" selected>Email Addresses</option>
                  <option value="url">Web URLs (http/https)</option>
                  <option value="ip">IPv4 Addresses</option>
                  <option value="phone">Phone Numbers</option>
                  <option value="date">Dates (YYYY-MM-DD)</option>
                  <option value="custom">Custom Regex Pattern</option>
                </select>
              </div>
              <div class="form-group" id="ext-custom-regex-group" style="display: none;">
                <label for="ext-custom-regex">Custom Pattern</label>
                <input type="text" id="ext-custom-regex" class="form-input" placeholder="e.g. \\d+" style="font-family: var(--font-mono);">
              </div>
            </div>
            <div class="form-group">
              <label for="ext-replace-input">Replacement Text (Optional)</label>
              <input type="text" id="ext-replace-input" class="form-input" placeholder="Text to replace matches with...">
            </div>
            <div style="display: flex; gap: 8px; margin-top: 6px;">
              <button class="tool-btn primary" id="ext-btn-extract" style="flex: 1; justify-content: center; height: 38px;">Extract Matches</button>
              <button class="tool-btn primary" id="ext-btn-replace" style="flex: 1; justify-content: center; height: 38px;">Replace Text</button>
            </div>
            <button class="tool-btn secondary" id="ext-clear-btn" style="margin-top: 6px; justify-content: center; width: 100%;">Clear Input</button>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3 id="regex-output-title">Match Results</h3>
            <span class="theme-badge" id="regex-match-count">0 matches</span>
            <button class="tool-btn accent-emerald hidden" id="regex-copy-btn" style="font-size: 11px;">
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Output
            </button>
          </div>
          <div class="tool-alert info" id="regex-info-alert" style="display: none; width: 100%;"></div>
          
          <!-- Output Mode 1: Tester Output -->
          <div id="output-tester-container" style="display: flex; flex-direction: column; gap: 12px; width: 100%; height: 100%;">
            <div class="form-group">
              <label>Highlighted Matches</label>
              <div id="regex-highlighted-output" class="markdown-preview" style="min-height: 120px; font-family: var(--font-mono); background-color: var(--bg-input); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); overflow-y: auto;"></div>
            </div>
            <div class="form-group">
              <label>Match List</label>
              <div class="regex-matches-container" id="regex-match-list">
                <div style="font-size: 13px; color: var(--text-muted); text-align: center;">Matches will be listed here.</div>
              </div>
            </div>
          </div>

          <!-- Output Mode 2: Extractor Output -->
          <div id="output-extractor-container" class="hidden" style="display: flex; flex-direction: column; gap: 12px; width: 100%; height: 100%; flex: 1;">
            <div class="form-group" style="display: flex; flex-direction: column; flex: 1; min-height: 250px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label id="ext-output-label">Extracted Items List</label>
                <button class="tool-btn secondary" id="ext-download-btn" style="font-size: 10px; padding: 4px 8px;">Download Output</button>
              </div>
              <textarea class="input-textarea" id="ext-output-text" readonly placeholder="Results will appear here..." style="flex: 1; font-family: var(--font-mono); resize: none; min-height: 200px;"></textarea>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="regex-guide-title">Quick Guide: Visual Regex Tester</span>
            </div>
            <button class="tool-btn secondary" id="regex-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps" id="regex-guide-steps">
            <!-- Populated dynamically -->
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
          background: rgba(16, 185, 129, 0.15);
          color: var(--accent-emerald);
          border-color: rgba(16, 185, 129, 0.3);
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.1);
        }
        .tab-control-panel {
          margin-top: 15px;
          border-top: 1px solid var(--border-color);
          padding-top: 15px;
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
    const tabs = container.querySelectorAll("#regex-suite-tabs .keyboard-tab");
    const panelTester = container.querySelector("#panel-tester-controls");
    const panelExtractor = container.querySelector("#panel-extractor-controls");
    const outputTester = container.querySelector("#output-tester-container");
    const outputExtractor = container.querySelector("#output-extractor-container");
    const outputTitle = container.querySelector("#regex-output-title");
    const copyBtn = container.querySelector("#regex-copy-btn");
    const matchCountBadge = container.querySelector("#regex-match-count");

    // Tester controls
    const regPattern = container.querySelector("#regex-pattern");
    const regFlags = container.querySelector("#regex-flags");
    const regText = container.querySelector("#regex-text");
    const regHigh = container.querySelector("#regex-highlighted-output");
    const regList = container.querySelector("#regex-match-list");
    const regAlert = container.querySelector("#regex-info-alert");

    // Extractor controls
    const extSource = container.querySelector("#ext-source-text");
    const extPatternSelect = container.querySelector("#ext-pattern-select");
    const extCustomGroup = container.querySelector("#ext-custom-regex-group");
    const extCustomRegex = container.querySelector("#ext-custom-regex");
    const extReplaceInput = container.querySelector("#ext-replace-input");
    const extOutput = container.querySelector("#ext-output-text");
    const extOutputLabel = container.querySelector("#ext-output-label");
    const extDownloadBtn = container.querySelector("#ext-download-btn");

    // Guide card elements
    const guideTitle = container.querySelector("#regex-guide-title");
    const guideSteps = container.querySelector("#regex-guide-steps");

    let activeTab = "tester";

    const guides = {
      tester: {
        title: "Quick Guide: Visual Regex Tester",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Input Pattern</strong>: Type your regex pattern (e.g. <code>\\d+</code> for digits) and flags (g, i, m).</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Provide Test String</strong>: Paste text to test matching logic in real time.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Inspect Highlights</strong>: Matches are highlighted in cyan. The match list displays positions.</div>
          </div>
        `
      },
      extractor: {
        title: "Quick Guide: Text Extractor & Replacer",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Input text</strong>: Paste raw unstructured document text into the source text block.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Configure scan</strong>: Select a preset (emails, URLs, IPs) or enter a custom pattern. Optionally define replacement text.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Extract/Replace</strong>: Click extract to generate lists or replace to overwrite matches and download/copy results.</div>
          </div>
        `
      }
    };

    const presetRegexes = {
      email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
      ip: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
      phone: /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,
      date: /\d{4}-\d{2}-\d{2}/g
    };

    const switchTab = (tabId, updateRoute = true) => {
      activeTab = tabId;
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));

      panelTester.classList.toggle("hidden", tabId !== "tester");
      panelExtractor.classList.toggle("hidden", tabId !== "extractor");
      outputTester.classList.toggle("hidden", tabId !== "tester");
      outputExtractor.classList.toggle("hidden", tabId !== "extractor");
      copyBtn.classList.toggle("hidden", tabId !== "extractor");

      if (tabId === "tester") {
        outputTitle.innerText = "Match Results";
        guideTitle.innerText = guides.tester.title;
        guideSteps.innerHTML = guides.tester.steps;
        testRegex();
      } else {
        outputTitle.innerText = "Extracted / Replaced Results";
        guideTitle.innerText = guides.extractor.title;
        guideSteps.innerHTML = guides.extractor.steps;
        matchCountBadge.innerText = "0 items";
        extOutput.value = "";
      }
    
      if (updateRoute && appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("regex-tester", tabId, { pushHistory: true })
    };;
      }

    tabs.forEach(tab => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab, true));
    });

    if (appInstance && typeof appInstance.registerTabSwitcher === "function") {
      appInstance.registerTabSwitcher("regex-tester", (tabId) => switchTab(tabId, false));
    }

    // --- Tester Logic ---
    const testRegex = () => {
      if (activeTab !== "tester") return;
      const pattern = regPattern.value;
      const flags = regFlags.value;
      const text = regText.value;
      regAlert.style.display = "none";
      
      if (!pattern || !text) {
        matchCountBadge.innerText = "0 matches";
        regHigh.innerHTML = escapeHtml(text);
        regList.innerHTML = `<div style="font-size: 13px; color: var(--text-muted); text-align: center;">Matches will be listed here.</div>`;
        return;
      }

      try {
        const regex = new RegExp(pattern, flags);
        const matches = [...text.matchAll(regex)];
        matchCountBadge.innerText = `${matches.length} match${matches.length !== 1 ? 'es' : ''}`;

        if (matches.length === 0) {
          regHigh.innerText = text;
          regList.innerHTML = `<div style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 10px;">No matches found</div>`;
          return;
        }

        let highlighted = "";
        let lastIndex = 0;
        let limit = 0;
        for (const m of matches) {
          limit++;
          if (limit > 500) break;
          const mIndex = m.index;
          const mText = m[0];
          highlighted += text.slice(lastIndex, mIndex).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + 
            `<mark style="background-color: rgba(16, 185, 129, 0.3); color: inherit; padding: 2px 4px; border-radius: 4px; font-weight: bold; border-bottom: 2px solid var(--accent-emerald);">${escapeHtml(mText)}</mark>`;
          lastIndex = mIndex + mText.length;
        }
        highlighted += text.slice(lastIndex).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        regHigh.innerHTML = highlighted;

        regList.innerHTML = "";
        matches.slice(0, 15).forEach((m) => {
          const item = document.createElement("div");
          item.className = "regex-match-pill";
          item.innerHTML = `<span>Match: "<strong>${escapeHtml(m[0])}</strong>"</span> <span class="match-index">Index: ${m.index}</span>`;
          regList.appendChild(item);
        });
      } catch (e) {
        matchCountBadge.innerText = "Error";
        regAlert.className = "tool-alert error";
        regAlert.innerHTML = `<span>Regex syntax error: ${e.message}</span>`;
        regAlert.style.display = "flex";
      }
    };

    regPattern?.addEventListener("input", testRegex);
    regFlags?.addEventListener("input", testRegex);
    regText?.addEventListener("input", testRegex);

    // --- Extractor & Replacer Logic ---
    extPatternSelect?.addEventListener("change", (e) => {
      const isCustom = e.target.value === "custom";
      extCustomGroup.style.display = isCustom ? "block" : "none";
    });

    const getExtractorRegex = () => {
      const selected = extPatternSelect.value;
      if (selected !== "custom") {
        return presetRegexes[selected];
      }
      const pat = extCustomRegex.value.trim();
      if (!pat) return null;
      try {
        return new RegExp(pat, "g");
      } catch (e) {
        appInstance.showToast("Custom regex syntax error: " + e.message, "error");
        return null;
      }
    };

    const runExtraction = () => {
      const text = extSource.value;
      if (!text) {
        appInstance.showToast("Please enter source text to extract from!", "warning");
        return;
      }
      const regex = getExtractorRegex();
      if (!regex) return;

      const matches = text.match(regex);
      if (!matches || matches.length === 0) {
        extOutput.value = "No items matched the pattern.";
        matchCountBadge.innerText = "0 items";
        appInstance.showToast("No matches found.", "info");
        return;
      }

      // Unique sorted list of extracted values
      const uniqueMatches = Array.from(new Set(matches)).sort();
      extOutput.value = uniqueMatches.join("\n");
      extOutputLabel.innerText = "Extracted Items List";
      matchCountBadge.innerText = `${uniqueMatches.length} item${uniqueMatches.length !== 1 ? 's' : ''}`;
      appInstance.showToast(`Extracted ${uniqueMatches.length} unique items!`, "success");
    };

    const runReplacement = () => {
      const text = extSource.value;
      if (!text) {
        appInstance.showToast("Please enter source text to replace matches in!", "warning");
        return;
      }
      const regex = getExtractorRegex();
      if (!regex) return;

      const replValue = extReplaceInput.value;
      const replacedText = text.replace(regex, replValue);
      const matches = text.match(regex);
      const matchCount = matches ? matches.length : 0;

      extOutput.value = replacedText;
      extOutputLabel.innerText = "Replaced Text Output";
      matchCountBadge.innerText = `${matchCount} replacement${matchCount !== 1 ? 's' : ''}`;
      appInstance.copyText(replacedText);
      appInstance.showToast(`Replaced ${matchCount} items and copied to clipboard!`, "success");
    };

    container.querySelector("#ext-btn-extract")?.addEventListener("click", runExtraction);
    container.querySelector("#ext-btn-replace")?.addEventListener("click", runReplacement);
    
    container.querySelector("#ext-clear-btn")?.addEventListener("click", () => {
      extSource.value = "";
      extOutput.value = "";
      matchCountBadge.innerText = "0 items";
    });

    extDownloadBtn?.addEventListener("click", () => {
      const content = extOutput.value;
      if (!content || content.startsWith("No items") || content.startsWith("Results will")) {
        appInstance.showToast("Nothing to download!", "warning");
        return;
      }
      const isReplacement = extOutputLabel.innerText.includes("Replaced");
      const filename = isReplacement ? "replaced_text.txt" : "extracted_items.txt";
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      appInstance.showToast(`Downloaded ${filename}!`, "success");
    });

    copyBtn?.addEventListener("click", () => {
      if (extOutput.value) {
        appInstance.copyText(extOutput.value);
      } else {
        appInstance.showToast("Nothing to copy!", "warning");
      }
    });

    // --- Guide and Templates ---
    // Template click handlers (Tester Mode)
    container.querySelector("#regex-tpl-email")?.addEventListener("click", () => {
      regPattern.value = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
      regFlags.value = "g";
      regText.value = "Send queries to hello@site.com or support@company.org. Contact info@domain.co.uk.";
      testRegex();
      appInstance.showToast("Loaded Email regex template", "info");
    });

    container.querySelector("#regex-tpl-url")?.addEventListener("click", () => {
      regPattern.value = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)";
      regFlags.value = "g";
      regText.value = "Visit our website at https://google.com or check out http://example.org/path/to/resource?id=123.";
      testRegex();
      appInstance.showToast("Loaded URL regex template", "info");
    });

    container.querySelector("#regex-tpl-phone")?.addEventListener("click", () => {
      regPattern.value = "\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}";
      regFlags.value = "g";
      regText.value = "Call us at +1-555-0199 or office number 020 7946 0958. Fax: 555-0123.";
      testRegex();
      appInstance.showToast("Loaded Phone regex template", "info");
    });

    container.querySelector("#regex-tpl-date")?.addEventListener("click", () => {
      regPattern.value = "\\d{4}-\\d{2}-\\d{2}";
      regFlags.value = "g";
      regText.value = "The project was initiated on 2026-05-12 and completed on 2026-06-15.";
      testRegex();
      appInstance.showToast("Loaded Date regex template", "info");
    });

    container.querySelector("#regex-tpl-ipv4")?.addEventListener("click", () => {
      regPattern.value = "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b";
      regFlags.value = "g";
      regText.value = "Router IP is 192.168.1.1, DNS is 8.8.8.8, and local broadcast is 10.0.0.255.";
      testRegex();
      appInstance.showToast("Loaded IPv4 regex template", "info");
    });

    // Guide Examples Click Switching
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

    container.querySelector("#regex-guide-load-sample")?.addEventListener("click", () => {
      if (activeTab === "tester") {
        if (activeExampleIndex === 0) {
          regPattern.value = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
          regFlags.value = "g";
          regText.value = "Hello, please reach out to admin@omnitool.hub or support@example.com for further inquiries.";
          testRegex();
          appInstance.showToast("Loaded sample email regex matching!", "info");
        } else {
          regPattern.value = "\\d+";
          regFlags.value = "g";
          regText.value = "We have 102 apples, 55 oranges, and 200 bananas.";
          testRegex();
          appInstance.showToast("Loaded sample digit/number regex matching!", "info");
        }
      } else {
        extSource.value = "Server logs: client IP 10.0.5.22 connected successfully at 2026-06-20 from terminal contact admin@host.net. Secondary backup IP 192.168.55.101 active.";
        extPatternSelect.value = "ip";
        extPatternSelect.dispatchEvent(new Event("change"));
        runExtraction();
        appInstance.showToast("Loaded extractor sample log & scanned IPs!", "info");
      }
    });

    // Initialize state
    if (appInstance.activeSubtab) {
      switchTab(appInstance.activeSubtab, false);
      if (appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("regex-tester", appInstance.activeSubtab, { pushHistory: false, replaceHistory: true });
      }
      appInstance.activeSubtab = null;
    } else {
      switchTab("tester", false);
    }
  }
};
