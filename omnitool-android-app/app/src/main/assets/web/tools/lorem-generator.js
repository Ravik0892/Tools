// OmniTool Hub - Lorem Ipsum & Dummy Content Maker
// Generates customizable placeholder text, paragraphs, HTML, Markdown, and JSON client-side.

export default {
  id: "lorem-generator",
  name: "Lorem Ipsum & Dummy Content Maker",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration Controls (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Content Generator Settings</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Generate customized placeholder filler text for mockups & wireframes.
              </p>
            </div>
            <button class="tool-btn primary" id="lorem-generate-btn" style="font-size: 11.5px; padding: 4px 12px;">
              <span>🎲 Regenerate</span>
            </button>
          </div>

          <!-- Vocabulary Flavor -->
          <div class="form-group" style="margin-bottom: 12px;">
            <label style="font-size: 11.5px; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase;">1. Vocabulary Flavor</label>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 6px;">
              <button class="tool-btn secondary lorem-flavor-btn active" data-flavor="latin" style="font-size: 11px; padding: 6px 4px; justify-content: center;">Classical Latin</button>
              <button class="tool-btn secondary lorem-flavor-btn" data-flavor="tech" style="font-size: 11px; padding: 6px 4px; justify-content: center;">Cyber / Tech</button>
              <button class="tool-btn secondary lorem-flavor-btn" data-flavor="business" style="font-size: 11px; padding: 6px 4px; justify-content: center;">Corporate B2B</button>
            </div>
          </div>

          <!-- Generation Unit & Quantity -->
          <div class="form-group" style="margin-bottom: 12px;">
            <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">2. Quantity & Unit</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 6px;">
              <div>
                <select id="lorem-unit" class="form-select" style="height: 38px;">
                  <option value="paragraphs" selected>Paragraphs</option>
                  <option value="sentences">Sentences</option>
                  <option value="words">Words</option>
                  <option value="list">List Items (Bullets)</option>
                </select>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <input type="number" id="lorem-count" class="form-input" min="1" max="100" value="4" style="height: 38px; font-family: var(--font-mono); font-weight: bold; text-align: center;">
                <span id="lorem-count-label" style="font-size: 11px; color: var(--text-muted); white-space: nowrap;">items</span>
              </div>
            </div>
          </div>

          <!-- Paragraph Length Setting -->
          <div class="form-group" id="lorem-length-group" style="margin-bottom: 12px;">
            <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">3. Paragraph Scope</label>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 6px;">
              <button class="tool-btn secondary lorem-length-btn" data-len="short" style="font-size: 11px; padding: 6px 4px; justify-content: center;">Short (2-3 sent.)</button>
              <button class="tool-btn secondary lorem-length-btn active" data-len="medium" style="font-size: 11px; padding: 6px 4px; justify-content: center;">Medium (4-6 sent.)</button>
              <button class="tool-btn secondary lorem-length-btn" data-len="long" style="font-size: 11px; padding: 6px 4px; justify-content: center;">Long (7-10 sent.)</button>
            </div>
          </div>

          <!-- Output Formatting -->
          <div class="form-group" style="margin-bottom: 12px;">
            <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">4. Markup & Format</label>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 6px;">
              <button class="tool-btn secondary lorem-format-btn active" data-format="plain" style="font-size: 11px; padding: 6px 2px; justify-content: center;">Plain Text</button>
              <button class="tool-btn secondary lorem-format-btn" data-format="html" style="font-size: 11px; padding: 6px 2px; justify-content: center;">HTML Tags</button>
              <button class="tool-btn secondary lorem-format-btn" data-format="markdown" style="font-size: 11px; padding: 6px 2px; justify-content: center;">Markdown</button>
              <button class="tool-btn secondary lorem-format-btn" data-format="json" style="font-size: 11px; padding: 6px 2px; justify-content: center;">JSON Array</button>
            </div>
          </div>

          <!-- Options Checkboxes -->
          <div class="form-group" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; margin-bottom: 12px;">
            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 12px; font-weight: 500;">
              <input type="checkbox" id="lorem-start-standard" checked style="accent-color: var(--accent-cyan); width: 15px; height: 15px;">
              <span>Start with standard <em>"Lorem ipsum dolor sit amet..."</em></span>
            </label>
          </div>

          <!-- Live Content Statistics -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 14px;">
            <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px; text-align: center;">
              <div id="stat-words" style="font-size: 16px; font-weight: 800; color: var(--accent-cyan);">0</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Words</div>
            </div>
            <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px; text-align: center;">
              <div id="stat-chars" style="font-size: 16px; font-weight: 800; color: var(--accent-purple);">0</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Characters</div>
            </div>
            <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px; text-align: center;">
              <div id="stat-sentences" style="font-size: 16px; font-weight: 800; color: #10b981;">0</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Sentences</div>
            </div>
            <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px; text-align: center;">
              <div id="stat-bytes" style="font-size: 16px; font-weight: 800; color: #f59e0b;">0 B</div>
              <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">Size</div>
            </div>
          </div>
        </div>

        <!-- Output Display (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Generated Output</h3>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="tool-btn secondary" id="lorem-copy-btn" style="font-size: 11px; padding: 4px 10px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
              <button class="tool-btn primary" id="lorem-download-btn" style="font-size: 11px; padding: 4px 12px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Download</span>
              </button>
            </div>
          </div>

          <div class="form-group" style="height: calc(100% - 70px); min-height: 380px;">
            <textarea id="lorem-output-text" class="input-textarea" style="width: 100%; height: 100%; font-family: var(--font-mono); font-size: 13.5px; line-height: 1.6; padding: 14px; background: rgba(0,0,0,0.3); border-color: var(--border-color); color: var(--text-main); resize: none;" readonly spellcheck="false" aria-label="Generated dummy text"></textarea>
          </div>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
    const vocabularies = {
      latin: [
        "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do",
        "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim",
        "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip",
        "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
        "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat",
        "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum",
        "vivamus", "faucibus", "arcu", "elementum", "purus", "scelerisque", "hendrerit", "praesent", "placerat",
        "vestibulum", "fermentum", "congue", "curabitur", "tempus", "imperdiet", "sapien", "facilisis", "pellentesque",
        "habitant", "morbi", "tristique", "senectus", "netus", "malesuada", "fames", "ac", "turpis", "egestas"
      ],
      tech: [
        "blockchain", "microservices", "kubernetes", "serverless", "cloud", "docker", "pipeline", "graphql",
        "neural", "latency", "throughput", "bandwidth", "websocket", "asynchronous", "reactive", "compiler",
        "ast", "parser", "transpiler", "webpack", "vite", "typescript", "runtime", "garbage-collection",
        "distributed", "consensus", "cluster", "node", "pod", "sharding", "replica", "immutable",
        "zero-trust", "cryptographic", "payload", "endpoint", "telemetry", "observability", "metrics", "tracing",
        "containerization", "ci-cd", "event-driven", "kafka", "redis", "database", "orm", "indexing", "concurrency",
        "thread-safe", "goroutine", "wasm", "webassembly", "quantum", "machine-learning", "vector-database", "llm"
      ],
      business: [
        "synergy", "paradigm", "deliverables", "stakeholders", "bandwidth", "scalability", "monetization",
        "core-competency", "best-practices", "value-add", "ROI", "KPI", "drill-down", "touchpoint", "ecosystem",
        "actionable", "agile", "sprint", "roadmap", "leverage", "deep-dive", "disruption", "pivot", "streamline",
        "enterprise", "b2b", "omnichannel", "traction", "retention", "onboarding", "runway", "churn",
        "conversion-funnel", "benchmarking", "market-share", "quarterly", "holistic", "mission-critical", "synergistic",
        "value-proposition", "growth-hacking", "buy-in", "low-hanging-fruit", "wheelhouse", "bleeding-edge", "deliverable"
      ]
    };

    let activeFlavor = "latin";
    let activeUnit = "paragraphs";
    let activeLength = "medium";
    let activeFormat = "plain";

    const unitSelect = container.querySelector("#lorem-unit");
    const countInput = container.querySelector("#lorem-count");
    const countLabel = container.querySelector("#lorem-count-label");
    const startStandardChk = container.querySelector("#lorem-start-standard");
    const outputArea = container.querySelector("#lorem-output-text");
    const generateBtn = container.querySelector("#lorem-generate-btn");
    const copyBtn = container.querySelector("#lorem-copy-btn");
    const downloadBtn = container.querySelector("#lorem-download-btn");

    const statWords = container.querySelector("#stat-words");
    const statChars = container.querySelector("#stat-chars");
    const statSentences = container.querySelector("#stat-sentences");
    const statBytes = container.querySelector("#stat-bytes");

    // Flavor buttons
    container.querySelectorAll(".lorem-flavor-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".lorem-flavor-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFlavor = btn.dataset.flavor;
        generate();
      });
    });

    // Length buttons
    container.querySelectorAll(".lorem-length-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".lorem-length-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeLength = btn.dataset.len;
        generate();
      });
    });

    // Format buttons
    container.querySelectorAll(".lorem-format-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".lorem-format-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeFormat = btn.dataset.format;
        generate();
      });
    });

    unitSelect.addEventListener("change", (e) => {
      activeUnit = e.target.value;
      countLabel.innerText = activeUnit;
      const lengthGroup = container.querySelector("#lorem-length-group");
      if (lengthGroup) {
        lengthGroup.style.display = activeUnit === "paragraphs" ? "block" : "none";
      }
      generate();
    });

    countInput.addEventListener("input", () => {
      let val = parseInt(countInput.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 200) val = 200;
      countInput.value = val;
      generate();
    });

    startStandardChk.addEventListener("change", generate);
    generateBtn.addEventListener("click", () => {
      generate();
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    function getRandomWord(pool) {
      return pool[Math.floor(Math.random() * pool.length)];
    }

    function generateSentence(pool, minWords = 6, maxWords = 14) {
      const len = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
      const words = [];
      for (let i = 0; i < len; i++) {
        words.push(getRandomWord(pool));
      }
      // Capitalize first letter
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      // Optional comma in the middle
      if (len > 8 && Math.random() > 0.4) {
        const commaIdx = Math.floor(len / 2);
        words[commaIdx] += ",";
      }
      return words.join(" ") + ".";
    }

    function generateParagraph(pool, lengthMode = "medium") {
      let sentenceCount = 5;
      if (lengthMode === "short") sentenceCount = Math.floor(Math.random() * 2) + 2; // 2-3
      if (lengthMode === "medium") sentenceCount = Math.floor(Math.random() * 3) + 4; // 4-6
      if (lengthMode === "long") sentenceCount = Math.floor(Math.random() * 4) + 7; // 7-10

      const sentences = [];
      for (let i = 0; i < sentenceCount; i++) {
        sentences.push(generateSentence(pool));
      }
      return sentences.join(" ");
    }

    function generate() {
      const pool = vocabularies[activeFlavor] || vocabularies.latin;
      const count = Math.max(1, parseInt(countInput.value, 10) || 1);
      const startWithStandard = startStandardChk.checked && activeFlavor === "latin";

      let rawItems = [];

      if (activeUnit === "words") {
        let words = [];
        if (startWithStandard) {
          const standardPrefix = ["Lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit."];
          words = words.concat(standardPrefix.slice(0, count));
        }
        while (words.length < count) {
          words.push(getRandomWord(pool));
        }
        if (words.length > 0) {
          words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        }
        rawItems = [words.slice(0, count).join(" ")];
      } else if (activeUnit === "sentences") {
        for (let i = 0; i < count; i++) {
          if (i === 0 && startWithStandard) {
            rawItems.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
          } else {
            rawItems.push(generateSentence(pool));
          }
        }
      } else if (activeUnit === "list") {
        for (let i = 0; i < count; i++) {
          rawItems.push(generateSentence(pool, 4, 10));
        }
      } else {
        // Paragraphs
        for (let i = 0; i < count; i++) {
          if (i === 0 && startWithStandard) {
            const remainder = generateParagraph(pool, activeLength);
            rawItems.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + remainder);
          } else {
            rawItems.push(generateParagraph(pool, activeLength));
          }
        }
      }

      // Format Output
      let formattedOutput = "";

      if (activeFormat === "html") {
        if (activeUnit === "list") {
          formattedOutput = "<ul>\n" + rawItems.map(item => `  <li>${item}</li>`).join("\n") + "\n</ul>";
        } else {
          formattedOutput = rawItems.map(p => `<p>${p}</p>`).join("\n\n");
        }
      } else if (activeFormat === "markdown") {
        if (activeUnit === "list") {
          formattedOutput = rawItems.map(item => `* ${item}`).join("\n");
        } else {
          formattedOutput = rawItems.join("\n\n");
        }
      } else if (activeFormat === "json") {
        formattedOutput = JSON.stringify(rawItems, null, 2);
      } else {
        // Plain Text
        if (activeUnit === "list") {
          formattedOutput = rawItems.map((item, i) => `${i + 1}. ${item}`).join("\n");
        } else {
          formattedOutput = rawItems.join("\n\n");
        }
      }

      outputArea.value = formattedOutput;

      // Update Statistics
      const wordsArray = formattedOutput.trim().split(/\s+/).filter(Boolean);
      const totalWords = wordsArray.length;
      const totalChars = formattedOutput.length;
      const totalSentences = (formattedOutput.match(/[.!?](\s|$)/g) || []).length;
      const byteSize = new Blob([formattedOutput]).size;

      statWords.innerText = totalWords.toLocaleString();
      statChars.innerText = totalChars.toLocaleString();
      statSentences.innerText = totalSentences.toLocaleString();
      statBytes.innerText = byteSize > 1024 ? (byteSize / 1024).toFixed(1) + " KB" : byteSize + " B";
    }

    copyBtn.addEventListener("click", () => {
      if (!outputArea.value) return;
      navigator.clipboard.writeText(outputArea.value).then(() => {
        appInstance.showToast("Copied dummy content to clipboard!", "success");
      });
    });

    downloadBtn.addEventListener("click", () => {
      if (!outputArea.value) return;
      const ext = activeFormat === "html" ? "html" : activeFormat === "markdown" ? "md" : activeFormat === "json" ? "json" : "txt";
      const mime = activeFormat === "html" ? "text/html" : activeFormat === "json" ? "application/json" : "text/plain";
      
      const blob = new Blob([outputArea.value], { type: `${mime};charset=utf-8` });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `lorem-ipsum.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      appInstance.showToast(`Downloaded lorem-ipsum.${ext}!`, "success");
    });

    generate();
  }
};
