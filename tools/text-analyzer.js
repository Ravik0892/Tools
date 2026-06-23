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
  }
};
