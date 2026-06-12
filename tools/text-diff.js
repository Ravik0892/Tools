import { diffLines } from './utils.js';

export default {
  id: "text-diff",
  name: "Text Diff Comparison",
  renderUI() {
    return `
      <div class="tool-content-layout">
        <div class="tool-panel">
          <div class="form-row">
            <div class="form-group">
              <label for="diff-original">Original Text</label>
              <textarea class="input-textarea" id="diff-original" placeholder="Paste base or original string here..." style="min-height: 120px;"></textarea>
            </div>
            <div class="form-group">
              <label for="diff-modified">Modified Text</label>
              <textarea class="input-textarea" id="diff-modified" placeholder="Paste modified version of text here..." style="min-height: 120px;"></textarea>
            </div>
          </div>
          <div class="form-row">
            <button class="tool-btn primary" id="diff-compare-btn">Compare Text</button>
            <button class="tool-btn" id="diff-clear">Clear</button>
          </div>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Visual Comparison Result</h3>
          </div>
          <div class="markdown-preview" id="diff-output-result" style="font-family: var(--font-mono); font-size: 13px; line-height: 1.6; min-height: 150px; background-color: var(--bg-input);">
            <span style="color: var(--text-muted);">Differences will show here...</span>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="diff-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Input Texts</strong>: Insert base original text on the left, and the updated version on the right.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Compare Versions</strong>: Click **Compare Text** to calculate structural line diff changes.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Analyze Differences</strong>: Added lines will highlight in green, while deleted lines highlight in red.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const diffOrig = container.querySelector("#diff-original");
    const diffMod = container.querySelector("#diff-modified");
    const diffResult = container.querySelector("#diff-output-result");

    const runDiffCompare = () => {
      const oText = diffOrig.value;
      const mText = diffMod.value;
      if (!oText && !mText) {
        diffResult.innerHTML = `<span style="color: var(--text-muted);">Differences will show here...</span>`;
        return;
      }
      const html = diffLines(oText, mText);
      diffResult.innerHTML = html || `<div>Lines are identical</div>`;
    };

    container.querySelector("#diff-compare-btn")?.addEventListener("click", runDiffCompare);
    container.querySelector("#diff-clear")?.addEventListener("click", () => {
      diffOrig.value = "";
      diffMod.value = "";
      diffResult.innerHTML = `<span style="color: var(--text-muted);">Differences will show here...</span>`;
    });

    const loadSample = () => {
      diffOrig.value = "OmniTool Hub v1\nClient-side utility hub\nFull privacy guaranteed";
      diffMod.value = "OmniTool Hub v2 (Masterpiece Edition)\nClient-side utility hub\n100% serverless and offline\nFull privacy guaranteed";
      runDiffCompare();
    };

    container.querySelector("#diff-guide-load-sample")?.addEventListener("click", () => {
      loadSample();
      appInstance.showToast("Sample text comparison loaded!", "info");
    });

    // Populate a sample diff comparison on initial load
    loadSample();
  }
};
