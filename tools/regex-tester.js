import { escapeHtml } from './utils.js';

export default {
  id: "regex-tester",
  name: "Visual Regex Tester",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Expression Settings</h3>
          </div>
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
            <textarea class="input-textarea" id="regex-text" placeholder="Type text to match regex against..." aria-label="Regex Test String"></textarea>
          </div>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Match Results</h3>
            <span class="theme-badge" id="regex-match-count">0 matches</span>
          </div>
          <div class="tool-alert info" id="regex-info-alert" style="display: none;"></div>
          <div class="form-group">
            <label>Highlighted Matches</label>
            <div id="regex-highlighted-output" class="markdown-preview" style="min-height: 120px; font-family: var(--font-mono); background-color: var(--bg-input);"></div>
          </div>
          <div class="form-group">
            <label>Match List</label>
            <div class="regex-matches-container" id="regex-match-list">
              <div style="font-size: 13px; color: var(--text-muted); text-align: center;">Matches will be listed here.</div>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="regex-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Input Pattern</strong>: Type your regex pattern (e.g. <code>\d+</code> for digits) and any flags (g, i, m).</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Provide Test String</strong>: Paste the text you want to test the pattern against in the Test String box.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Visual Highlights</strong>: Matches are highlighted in cyan. The match list shows each match value and its index position.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Email Pattern</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Digits Pattern</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Pattern + Text</span>
                <div class="tool-guide-io-value">Pattern: \w+@\w+\.\w+
Text: contact help@site.com now</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Matches Found</span>
                <div class="tool-guide-io-value">Match 1: help@site.com (idx 8)
Total: 1 match</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Pattern + Text</span>
                <div class="tool-guide-io-value">Pattern: \d+
Text: year is 2026 and code 404</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Matches Found</span>
                <div class="tool-guide-io-value">Match 1: 2026 (idx 8)
Match 2: 404 (idx 22)
Total: 2 matches</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const regPattern = container.querySelector("#regex-pattern");
    const regFlags = container.querySelector("#regex-flags");
    const regText = container.querySelector("#regex-text");
    const regCount = container.querySelector("#regex-match-count");
    const regHigh = container.querySelector("#regex-highlighted-output");
    const regList = container.querySelector("#regex-match-list");
    const regAlert = container.querySelector("#regex-info-alert");

    const testRegex = () => {
      const pattern = regPattern.value;
      const flags = regFlags.value;
      const text = regText.value;
      regAlert.style.display = "none";
      
      if (!pattern || !text) {
        regCount.innerText = "0 matches";
        regHigh.innerHTML = escapeHtml(text);
        regList.innerHTML = `<div style="font-size: 13px; color: var(--text-muted); text-align: center;">Matches will be listed here.</div>`;
        return;
      }

      try {
        const regex = new RegExp(pattern, flags);
        const matches = [...text.matchAll(regex)];
        regCount.innerText = `${matches.length} match${matches.length !== 1 ? 'es' : ''}`;

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
            `<mark style="background-color: rgba(0, 242, 254, 0.3); color: inherit; padding: 2px 4px; border-radius: 4px; font-weight: bold; border-bottom: 2px solid var(--accent-cyan);">${escapeHtml(mText)}</mark>`;
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
        regCount.innerText = "Error";
        regAlert.className = "tool-alert error";
        regAlert.innerHTML = `<span>Regex syntax error: ${e.message}</span>`;
        regAlert.style.display = "flex";
      }
    };

    regPattern?.addEventListener("input", testRegex);
    regFlags?.addEventListener("input", testRegex);
    regText?.addEventListener("input", testRegex);

    const loadSample = () => {
      regPattern.value = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
      regFlags.value = "g";
      regText.value = "Hello, please reach out to admin@omnitool.hub or support@example.com for further inquiries.";
      testRegex();
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

    container.querySelector("#regex-guide-load-sample")?.addEventListener("click", () => {
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
    });

    // Template click handlers
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

    // Load sample regex on init
    loadSample();
  }
};
