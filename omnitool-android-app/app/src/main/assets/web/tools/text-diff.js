import { diffLines } from './utils.js';

export default {
  id: "text-diff",
  name: "Text Diff Comparison",
  activeDiffMode: "line",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Left Panel: Configuration & Inputs -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Configuration</h3>
            <!-- Mode Switcher Tabs matching screenshot keyboard-tab style -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 250px; margin-left: 15px;" id="diff-tabs">
              <button class="keyboard-tab active" data-mode="line" id="diff-tab-line" style="font-size: 11px; padding: 4px 8px;">Line Diff</button>
              <button class="keyboard-tab" data-mode="word" id="diff-tab-word" style="font-size: 11px; padding: 4px 8px;">Word Diff</button>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 12px;">
            <!-- Input 1: Original Text -->
            <div class="form-group" style="margin-bottom: 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <label for="diff-original" style="font-weight: 700; font-size: 11.5px; color: var(--text-main);">Original Text (Base Version)</label>
                <span id="diff-orig-count" style="font-size: 10px; color: var(--text-muted);">0 lines</span>
              </div>
              <textarea class="input-textarea" id="diff-original" placeholder="Paste base or original string here..." style="height: 92px; font-family: var(--font-mono); resize: vertical;" aria-label="Original Text Input"></textarea>
            </div>

            <!-- Input 2: Modified Text -->
            <div class="form-group" style="margin-bottom: 0;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <label for="diff-modified" style="font-weight: 700; font-size: 11.5px; color: var(--text-main);">Modified Text (New Version)</label>
                <span id="diff-mod-count" style="font-size: 10px; color: var(--text-muted);">0 lines</span>
              </div>
              <textarea class="input-textarea" id="diff-modified" placeholder="Paste modified version of text here..." style="height: 92px; font-family: var(--font-mono); resize: vertical;" aria-label="Modified Text Input"></textarea>
            </div>

            <!-- Quick Stats Grid matching standard screenshot aesthetic -->
            <div class="form-row" style="grid-template-columns: repeat(4, 1fr); text-align: center; gap: 8px; margin-top: 2px; margin-bottom: 2px;">
              <div class="tool-badge" style="padding: 6px;">
                <div style="font-size: 9px; color: var(--text-muted); text-transform: uppercase;">Diff Lines</div>
                <div style="font-size: 14px; font-weight: bold; margin-top: 2px;" id="stat-diff-lines">0</div>
              </div>
              <div class="tool-badge" style="padding: 6px;">
                <div style="font-size: 9px; color: #10b981; text-transform: uppercase;">Added (+)</div>
                <div style="font-size: 14px; font-weight: bold; color: #10b981; margin-top: 2px;" id="stat-diff-added">0</div>
              </div>
              <div class="tool-badge" style="padding: 6px;">
                <div style="font-size: 9px; color: #f43f5e; text-transform: uppercase;">Removed (-)</div>
                <div style="font-size: 14px; font-weight: bold; color: #f43f5e; margin-top: 2px;" id="stat-diff-removed">0</div>
              </div>
              <div class="tool-badge" style="padding: 6px;">
                <div style="font-size: 9px; color: var(--accent-cyan); text-transform: uppercase;">Unchanged</div>
                <div style="font-size: 14px; font-weight: bold; color: var(--accent-cyan); margin-top: 2px;" id="stat-diff-same">0</div>
              </div>
            </div>

            <!-- Action buttons -->
            <div style="display: flex; gap: 8px;">
              <button class="tool-btn primary" id="diff-compare-btn" style="flex: 2; justify-content: center; font-weight: 700;">Compare Text</button>
              <button class="tool-btn secondary" id="diff-swap-btn" style="flex: 1; justify-content: center;" title="Swap Original and Modified text">Swap</button>
              <button class="tool-btn secondary" id="diff-clear-btn" style="flex: 1; justify-content: center;">Clear</button>
            </div>
          </div>
        </div>

        <!-- Right Panel: Visual Comparison Result -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 id="diff-output-title">Visual Comparison Result</h3>
            <div style="display: flex; align-items: center; gap: 6px; margin-left: auto;">
              <button class="tool-btn accent-emerald" id="diff-copy-btn">
                <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Output
              </button>
              <button class="reset-split-btn tool-btn secondary" id="diff-reset-split-btn" style="font-size: 11px; padding: 4px 8px; gap: 4px; display: inline-flex; align-items: center;" title="Reset sections to 50/50 layout">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <polyline points="3 3 3 8 8 8"></polyline>
                </svg>
                <span>Reset 50/50</span>
              </button>
              <button class="preview-fullscreen-btn tool-btn secondary" id="diff-fullscreen-btn" style="font-size: 11px; padding: 4px 8px; gap: 4px; display: inline-flex; align-items: center;" title="Toggle Full Screen view">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
                <span>Full Screen</span>
              </button>
            </div>
          </div>
          <div class="markdown-preview diff-result-container" id="diff-output-result" style="flex: 1; min-height: 380px; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; background-color: var(--bg-input); border-radius: 8px; border: 1px solid var(--border-color); overflow-y: auto; padding: 14px;" aria-label="Diff Comparison Output">
            <span style="color: var(--text-muted);">Differences will show here...</span>
          </div>
        </div>

        <!-- Dynamic Guide Card (Unified standard footer guide) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="diff-guide-title">QUICK GUIDE: TEXT DIFF COMPARISON</span>
            </div>
            <button class="tool-btn secondary" id="diff-load-sample" style="font-size: 11px;">Load Sample</button>
          </div>
          <div class="tool-guide-steps" id="diff-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Paste Source Texts</strong>: Input your original string on the top and the revised text below it.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Select Mode</strong>: Switch between <strong>Line Diff</strong> or <strong>Word Diff</strong> for granular token comparison.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Inspect Color Coding</strong>: Added lines/words appear in <strong style="color: #10b981;">green (+)</strong> and deleted text in <strong style="color: #f43f5e;">red (-)</strong>.</div>
            </div>
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
      </style>
    `;
  },

  init(container, appInstance) {
    const diffOrig = container.querySelector("#diff-original");
    const diffMod = container.querySelector("#diff-modified");
    const diffResult = container.querySelector("#diff-output-result");
    const copyBtn = container.querySelector("#diff-copy-btn");
    const tabLine = container.querySelector("#diff-tab-line");
    const tabWord = container.querySelector("#diff-tab-word");
    const statLines = container.querySelector("#stat-diff-lines");
    const statAdded = container.querySelector("#stat-diff-added");
    const statRemoved = container.querySelector("#stat-diff-removed");
    const statSame = container.querySelector("#stat-diff-same");
    const origCount = container.querySelector("#diff-orig-count");
    const modCount = container.querySelector("#diff-mod-count");

    let currentMode = "line";

    const updateCounts = () => {
      const oLines = diffOrig.value ? diffOrig.value.split("\n").length : 0;
      const mLines = diffMod.value ? diffMod.value.split("\n").length : 0;
      if (origCount) origCount.textContent = `${oLines} line${oLines === 1 ? '' : 's'}`;
      if (modCount) modCount.textContent = `${mLines} line${mLines === 1 ? '' : 's'}`;
    };

    diffOrig.addEventListener("input", updateCounts);
    diffMod.addEventListener("input", updateCounts);

    const computeWordDiff = (str1, str2) => {
      const words1 = str1.split(/(\s+)/);
      const words2 = str2.split(/(\s+)/);
      let out = "";
      let added = 0;
      let removed = 0;
      let same = 0;

      const maxLen = Math.max(words1.length, words2.length);
      for (let i = 0; i < maxLen; i++) {
        const w1 = words1[i];
        const w2 = words2[i];

        if (w1 === w2) {
          if (w1 !== undefined) {
            out += `<span>${escapeHtml(w1)}</span>`;
            if (w1.trim()) same++;
          }
        } else {
          if (w1 !== undefined && w1.trim()) {
            out += `<mark style="background: rgba(244, 63, 94, 0.2); color: #fb7185; padding: 2px 4px; border-radius: 3px; text-decoration: line-through;">${escapeHtml(w1)}</mark>`;
            removed++;
          }
          if (w2 !== undefined && w2.trim()) {
            out += `<mark style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 2px 4px; border-radius: 3px;">${escapeHtml(w2)}</mark>`;
            added++;
          }
        }
      }

      return {
        html: `<div style="white-space: pre-wrap; font-family: var(--font-mono); font-size: 13px; line-height: 1.8;">${out}</div>`,
        added,
        removed,
        same,
        total: added + removed + same
      };
    };

    const escapeHtml = (text) => {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    };

    const runDiffCompare = () => {
      const oText = diffOrig.value;
      const mText = diffMod.value;
      updateCounts();

      if (!oText && !mText) {
        diffResult.innerHTML = `<span style="color: var(--text-muted);">Differences will show here...</span>`;
        if (statLines) statLines.textContent = "0";
        if (statAdded) statAdded.textContent = "0";
        if (statRemoved) statRemoved.textContent = "0";
        if (statSame) statSame.textContent = "0";
        return;
      }

      if (currentMode === "word") {
        const wordDiff = computeWordDiff(oText, mText);
        diffResult.innerHTML = wordDiff.html;
        if (statLines) statLines.textContent = String(wordDiff.total);
        if (statAdded) statAdded.textContent = String(wordDiff.added);
        if (statRemoved) statRemoved.textContent = String(wordDiff.removed);
        if (statSame) statSame.textContent = String(wordDiff.same);
        return;
      }

      // Line mode
      const rawHtml = diffLines(oText, mText);
      if (!rawHtml || oText === mText) {
        diffResult.innerHTML = `<div style="text-align: center; color: #10b981; font-weight: 600; padding: 40px; display: flex; align-items: center; justify-content: center; gap: 8px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="20 6 9 17 4 12"></polyline></svg> Texts are 100% identical. No differences found.</div>`;
        const lineCount = oText ? oText.split("\n").length : 0;
        if (statLines) statLines.textContent = String(lineCount);
        if (statAdded) statAdded.textContent = "0";
        if (statRemoved) statRemoved.textContent = "0";
        if (statSame) statSame.textContent = String(lineCount);
        return;
      }

      diffResult.innerHTML = rawHtml;

      // Calculate stats from output lines
      const addedCount = diffResult.querySelectorAll("ins, .diff-added, [data-type='added']").length;
      const removedCount = diffResult.querySelectorAll("del, .diff-removed, [data-type='removed']").length;
      const totalCount = diffResult.querySelectorAll("div, tr, li, p").length || (addedCount + removedCount);
      const sameCount = Math.max(0, totalCount - (addedCount + removedCount));

      if (statLines) statLines.textContent = String(totalCount || (oText.split("\n").length));
      if (statAdded) statAdded.textContent = String(addedCount);
      if (statRemoved) statRemoved.textContent = String(removedCount);
      if (statSame) statSame.textContent = String(sameCount);
    };

    tabLine?.addEventListener("click", () => {
      tabLine.classList.add("active");
      tabWord.classList.remove("active");
      currentMode = "line";
      runDiffCompare();
    });

    tabWord?.addEventListener("click", () => {
      tabWord.classList.add("active");
      tabLine.classList.remove("active");
      currentMode = "word";
      runDiffCompare();
    });

    container.querySelector("#diff-compare-btn")?.addEventListener("click", runDiffCompare);

    container.querySelector("#diff-clear-btn")?.addEventListener("click", () => {
      diffOrig.value = "";
      diffMod.value = "";
      updateCounts();
      diffResult.innerHTML = `<span style="color: var(--text-muted);">Differences will show here...</span>`;
      if (statLines) statLines.textContent = "0";
      if (statAdded) statAdded.textContent = "0";
      if (statRemoved) statRemoved.textContent = "0";
      if (statSame) statSame.textContent = "0";
      appInstance.showToast("Inputs cleared", "info");
    });

    container.querySelector("#diff-swap-btn")?.addEventListener("click", () => {
      const temp = diffOrig.value;
      diffOrig.value = diffMod.value;
      diffMod.value = temp;
      runDiffCompare();
      appInstance.showToast("Original and Modified text swapped", "info");
    });

    copyBtn?.addEventListener("click", () => {
      const textToCopy = diffResult.innerText || diffResult.textContent || "";
      if (!textToCopy.trim() || textToCopy.includes("Differences will show here")) {
        appInstance.showToast("Nothing to copy yet. Compare texts first.", "warning");
        return;
      }
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
        setTimeout(() => { copyBtn.innerHTML = originalHtml; }, 2000);
        appInstance.showToast("Diff output copied to clipboard!", "success");
      }).catch(() => {
        appInstance.showToast("Failed to copy diff to clipboard", "error");
      });
    });

    const resetSplitBtn = container.querySelector("#diff-reset-split-btn");
    const fsBtn = container.querySelector("#diff-fullscreen-btn");
    const splitLayout = container.querySelector(".tool-content-layout.split-view");
    const rightPanel = container.querySelectorAll(".tool-panel")[1];

    resetSplitBtn?.addEventListener("click", () => {
      appInstance.playSynthSound?.('click');
      if (splitLayout) {
        splitLayout.classList.add("is-animating");
        splitLayout.style.removeProperty("--split-ratio");
        localStorage.removeItem("omnitool_split_text-diff");
        setTimeout(() => splitLayout.classList.remove("is-animating"), 300);
      }
      appInstance.showToast("Layout reset to default (50/50)", "info");
    });

    fsBtn?.addEventListener("click", () => {
      appInstance.playSynthSound?.('click');
      if (rightPanel && splitLayout) {
        const isFS = rightPanel.classList.toggle("preview-fullscreen");
        splitLayout.classList.toggle("has-fullscreen-preview", isFS);
        if (isFS) {
          fsBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4"></path>
            </svg>
            <span>Exit Full Screen</span>
          `;
          fsBtn.classList.remove("secondary");
          fsBtn.classList.add("accent-emerald");
        } else {
          fsBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
            <span>Full Screen</span>
          `;
          fsBtn.classList.add("secondary");
          fsBtn.classList.remove("accent-emerald");
        }
      }
    });

    const loadSampleData = () => {
      diffOrig.value = "OmniTool Hub v1.0\nClient-side utility hub\nFull privacy guaranteed\nFast browser runtime";
      diffMod.value = "OmniTool Hub v2.0 (Masterpiece Edition)\nClient-side utility hub\n100% serverless and offline\nFull privacy guaranteed\nHardware accelerated WebCrypto";
      updateCounts();
      runDiffCompare();
      appInstance.showToast("Loaded sample diff comparison!", "info");
    };

    container.querySelector("#diff-load-sample")?.addEventListener("click", loadSampleData);

    // Initial load with sample data for instant satisfaction
    loadSampleData();
  }
};
