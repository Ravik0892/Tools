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
              <div class="tool-guide-step-text"><strong>Input Pattern</strong>: Type the regular expression pattern (e.g. `[0-9]+` to match digits) and flags (g, i, m).</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Provide Test String</strong>: Paste or type the text you wish to match inside the Test String box.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Visual Highlights</strong>: Watch matches highlighted in blue instantly and inspect list indexes in the result panel.</div>
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

    container.querySelector("#regex-guide-load-sample")?.addEventListener("click", () => {
      loadSample();
      appInstance.showToast("Sample email regex loaded!", "info");
    });

    // Load sample regex on init
    loadSample();
  }
};
