export default {
  id: "text-analyzer",
  name: "Text Readability & Analyzer",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Input Text</h3>
            <div class="panel-actions">
              <button class="tool-btn" id="analyze-clear">Clear</button>
            </div>
          </div>
          <textarea class="input-textarea" id="analyze-input" placeholder="Type or paste your content here to analyze readability, density, and detailed statistics..." aria-label="Analyze InputText"></textarea>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Statistics & Readability</h3>
            <button class="tool-btn accent-emerald" id="analyze-copy-btn">
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Summary
            </button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="glass-card" style="padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
                <div id="stat-words" style="font-size: 20px; font-weight: 700; color: var(--accent-cyan);">0</div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted);">Words</div>
              </div>
              <div class="glass-card" style="padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
                <div id="stat-chars" style="font-size: 20px; font-weight: 700; color: var(--accent-cyan);">0</div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted);">Characters</div>
              </div>
              <div class="glass-card" style="padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
                <div id="stat-sentences" style="font-size: 20px; font-weight: 700; color: var(--accent-purple);">0</div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted);">Sentences</div>
              </div>
              <div class="glass-card" style="padding: 12px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
                <div id="stat-readtime" style="font-size: 20px; font-weight: 700; color: var(--accent-purple);">0m</div>
                <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted);">Read Time</div>
              </div>
            </div>

            <div style="padding: 16px; border: 1px solid var(--border-color); border-radius: 12px; background: rgba(255, 255, 255, 0.01); display: flex; flex-direction: column; gap: 8px;">
              <h4 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-main); margin: 0;">Flesch Reading Ease</h4>
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                <span id="flesch-score" style="font-size: 28px; font-weight: 800; color: var(--accent-emerald);">0.0</span>
                <span id="flesch-grade" style="font-size: 12px; padding: 2px 8px; border-radius: 20px; background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); font-weight: 700;">N/A</span>
              </div>
              <p id="flesch-desc" style="font-size: 12px; color: var(--text-muted); line-height: 1.4; margin: 4px 0 0 0;">Flesch score indicates how easy a text is to read. Higher scores mean simpler sentences.</p>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="analyze-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Input Copy</strong>: Paste or type the text content you wish to audit for readability, complexity, and density.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Review Counters</strong>: Instantly evaluate word count, character count, sentence count, and estimated read time.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Readability Score</strong>: Analyze the Flesch Reading Ease score to ensure the text matches your target audience grade.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Easy Reading</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Technical Draft</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input Copy</span>
                <div class="tool-guide-io-value">The cat sat on the rug. It was a very warm day. The sun was bright in the sky.</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Readability Grade</span>
                <div class="tool-guide-io-value">Flesch Score: 116.1<br>Grade: 5th Grade (Very Easy)</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input Copy</span>
                <div class="tool-guide-io-value">The utilization of multidimensional frameworks facilitates the aggregation of regulatory parameters.</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Readability Grade</span>
                <div class="tool-guide-io-value">Flesch Score: 12.0<br>Grade: Graduate (Very Confusing)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const input = container.querySelector("#analyze-input");
    const statWords = container.querySelector("#stat-words");
    const statChars = container.querySelector("#stat-chars");
    const statSentences = container.querySelector("#stat-sentences");
    const statReadtime = container.querySelector("#stat-readtime");
    const fleschScore = container.querySelector("#flesch-score");
    const fleschGrade = container.querySelector("#flesch-grade");

    const countSyllables = (word) => {
      word = word.toLowerCase();
      if (word.length <= 3) return 1;
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const syllables = word.match(/[aeiouy]{1,2}/g);
      return syllables ? syllables.length : 1;
    };

    input.addEventListener("input", () => {
      const text = input.value.trim();
      if (!text) {
        statWords.innerText = "0";
        statChars.innerText = "0";
        statSentences.innerText = "0";
        statReadtime.innerText = "0m";
        fleschScore.innerText = "0.0";
        fleschGrade.innerText = "N/A";
        return;
      }

      const wordsArray = text.match(/\b\w+\b/g) || [];
      const wordCount = wordsArray.length;
      const charCount = text.length;

      // Count sentences
      const sentencesArray = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const sentenceCount = sentencesArray.length || 1;

      // Estimate syllables
      let syllableCount = 0;
      wordsArray.forEach(word => {
        syllableCount += countSyllables(word);
      });

      // Update counters
      statWords.innerText = wordCount.toLocaleString();
      statChars.innerText = charCount.toLocaleString();
      statSentences.innerText = sentenceCount.toLocaleString();

      // Read time: ~200 WPM
      const minutes = Math.ceil(wordCount / 200);
      statReadtime.innerText = minutes + "m";

      // Flesch Reading Ease Formula:
      // Score = 206.835 - (1.015 * (total words / total sentences)) - (84.6 * (total syllables / total words))
      if (wordCount > 5) {
        const score = 206.835 - (1.015 * (wordCount / sentenceCount)) - (84.6 * (syllableCount / wordCount));
        const finalScore = Math.max(0, Math.min(100, Math.round(score * 10) / 10));
        fleschScore.innerText = finalScore.toFixed(1);

        // Grade mapping
        if (finalScore >= 90) {
          fleschGrade.innerText = "5th Grade (Very Easy)";
        } else if (finalScore >= 80) {
          fleschGrade.innerText = "6th Grade (Easy)";
        } else if (finalScore >= 70) {
          fleschGrade.innerText = "7th Grade (Fairly Easy)";
        } else if (finalScore >= 60) {
          fleschGrade.innerText = "8th-9th Grade (Standard)";
        } else if (finalScore >= 50) {
          fleschGrade.innerText = "High School (Fairly Hard)";
        } else if (finalScore >= 30) {
          fleschGrade.innerText = "College (Difficult)";
        } else {
          fleschGrade.innerText = "Graduate (Very Confusing)";
        }
      } else {
        fleschScore.innerText = "0.0";
        fleschGrade.innerText = "N/A";
      }
    });

    container.querySelector("#analyze-clear")?.addEventListener("click", () => {
      input.value = "";
      input.dispatchEvent(new Event("input"));
    });

    const copyBtn = container.querySelector("#analyze-copy-btn");
    copyBtn?.addEventListener("click", () => {
      const summaryText = `Text Analysis Summary:\nWords: ${statWords.innerText}\nCharacters: ${statChars.innerText}\nSentences: ${statSentences.innerText}\nReading Time: ${statReadtime.innerText}\nFlesch Reading Ease: ${fleschScore.innerText} (${fleschGrade.innerText})`;
      navigator.clipboard.writeText(summaryText).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
        setTimeout(() => { copyBtn.innerHTML = originalHtml; }, 2000);
        appInstance.showToast("Analysis summary copied to clipboard!", "success");
      }).catch(() => {
        appInstance.showToast("Failed to copy summary", "error");
      });
    });

    // Examples Tab Switching
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

    container.querySelector("#analyze-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        input.value = "The cat sat on the rug. It was a very warm day. The sun was bright in the sky.";
        input.dispatchEvent(new Event("input"));
        appInstance.showToast("Loaded sample easy reading text!", "info");
      } else {
        input.value = "The utilization of multidimensional frameworks facilitates the aggregation of regulatory parameters.";
        input.dispatchEvent(new Event("input"));
        appInstance.showToast("Loaded sample technical academic draft text!", "info");
      }
    });
  }
};
