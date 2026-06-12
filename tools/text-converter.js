import { textUpper, textLower, textTitle, textCamel, textSnake, textKebab } from './utils.js';

export default {
  id: "text-converter",
  name: "Text Case Converter & Word Counter",
  renderUI() {
    return `
      <div class="tool-content-layout">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Input Text</h3>
            <div class="panel-actions">
              <button class="tool-btn" id="text-clear">Clear</button>
            </div>
          </div>
          <textarea class="input-textarea" id="text-input" placeholder="Type or paste your content here..." aria-label="Text Converter Input"></textarea>
          
          <!-- Quick Stats Grid -->
          <div class="form-row" style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); text-align: center;">
            <div class="tool-badge" style="padding: 10px;">
              <div style="font-size: 11px; color: var(--text-muted);">Characters</div>
              <div style="font-size: 18px; font-weight: bold; margin-top: 4px;" id="text-stat-chars">0</div>
            </div>
            <div class="tool-badge" style="padding: 10px;">
              <div style="font-size: 11px; color: var(--text-muted);">Words</div>
              <div style="font-size: 18px; font-weight: bold; margin-top: 4px;" id="text-stat-words">0</div>
            </div>
            <div class="tool-badge" style="padding: 10px;">
              <div style="font-size: 11px; color: var(--text-muted);">Lines</div>
              <div style="font-size: 18px; font-weight: bold; margin-top: 4px;" id="text-stat-lines">0</div>
            </div>
            <div class="tool-badge" style="padding: 10px;">
              <div style="font-size: 11px; color: var(--text-muted);">Reading Time</div>
              <div style="font-size: 16px; font-weight: bold; margin-top: 6px;" id="text-stat-read">0m</div>
            </div>
          </div>

          <!-- Action Operations -->
          <div class="form-group">
            <label>Case Transformations</label>
            <div class="form-row" style="grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px;">
              <button class="tool-btn" id="text-btn-upper">UPPERCASE</button>
              <button class="tool-btn" id="text-btn-lower">lowercase</button>
              <button class="tool-btn" id="text-btn-title">Title Case</button>
              <button class="tool-btn" id="text-btn-camel">camelCase</button>
              <button class="tool-btn" id="text-btn-snake">snake_case</button>
              <button class="tool-btn" id="text-btn-kebab">kebab-case</button>
            </div>
          </div>

          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 14px;">
            <div class="panel-header" style="border: none; padding: 0;">
              <label>Transformed Result</label>
              <button class="tool-btn accent-emerald" id="text-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy</button>
            </div>
            <textarea class="input-textarea" id="text-output" readonly placeholder="Result will appear here..." style="min-height: 120px;" aria-label="Text Converter Output"></textarea>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="text-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Insert Content</strong>: Paste or type your string inside the main Input Text box.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Review Metrics</strong>: Watch characters, word counts, and estimated reading time statistics update.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Select Case Style</strong>: Click on any case style transformation button (e.g. Title Case, snake_case) to retrieve converted text.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const txtInput = container.querySelector("#text-input");
    const txtOutput = container.querySelector("#text-output");
    const charStat = container.querySelector("#text-stat-chars");
    const wordStat = container.querySelector("#text-stat-words");
    const lineStat = container.querySelector("#text-stat-lines");
    const readStat = container.querySelector("#text-stat-read");

    const updateTextStats = () => {
      const val = txtInput.value;
      if (charStat) charStat.innerText = val.length;
      const words = val.trim() === "" ? 0 : val.trim().split(/\s+/).length;
      if (wordStat) wordStat.innerText = words;
      const lines = val === "" ? 0 : val.split(/\r\n|\r|\n/).length;
      if (lineStat) lineStat.innerText = lines;
      if (readStat) readStat.innerText = `${Math.ceil(words / 200)}m`;
    };

    txtInput?.addEventListener("input", updateTextStats);
    container.querySelector("#text-clear")?.addEventListener("click", () => {
      txtInput.value = "";
      txtOutput.value = "";
      updateTextStats();
    });
    
    container.querySelector("#text-guide-load-sample")?.addEventListener("click", () => {
      txtInput.value = "this is an example statement describing omnitool hub capabilities";
      updateTextStats();
      txtOutput.value = textTitle(txtInput.value);
      appInstance.showToast("Sample text loaded and converted to Title Case!", "info");
    });

    container.querySelector("#text-copy-btn")?.addEventListener("click", () => appInstance.copyText(txtOutput.value));

    container.querySelector("#text-btn-upper")?.addEventListener("click", () => {
      txtOutput.value = textUpper(txtInput.value);
    });
    container.querySelector("#text-btn-lower")?.addEventListener("click", () => {
      txtOutput.value = textLower(txtInput.value);
    });
    container.querySelector("#text-btn-title")?.addEventListener("click", () => {
      txtOutput.value = textTitle(txtInput.value);
    });
    container.querySelector("#text-btn-camel")?.addEventListener("click", () => {
      txtOutput.value = textCamel(txtInput.value);
    });
    container.querySelector("#text-btn-snake")?.addEventListener("click", () => {
      txtOutput.value = textSnake(txtInput.value);
    });
    container.querySelector("#text-btn-kebab")?.addEventListener("click", () => {
      txtOutput.value = textKebab(txtInput.value);
    });
  }
};
