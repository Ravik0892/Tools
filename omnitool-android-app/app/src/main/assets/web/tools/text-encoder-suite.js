import { 
  textUpper, textLower, textTitle, textCamel, textSnake, textKebab,
  base64Encode, base64Decode,
  urlEncode, urlDecode 
} from './utils.js';

export default {
  id: "text-encoder-suite",
  name: "Text & Encoder Suite",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Configuration</h3>
            <!-- Tabs inside config panel -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 320px; margin-left: 15px;" id="text-suite-tabs">
              <button class="keyboard-tab active" data-tab="case" style="font-size: 11px; padding: 4px 8px;">Case Converter</button>
              <button class="keyboard-tab" data-tab="base64" style="font-size: 11px; padding: 4px 8px;">Base64</button>
              <button class="keyboard-tab" data-tab="url" style="font-size: 11px; padding: 4px 8px;">URL Encoder</button>
            </div>
          </div>

          <!-- Tab 1: Case Converter Panel -->
          <div id="panel-case-controls" class="tab-control-panel">
            <div class="form-group">
              <label for="case-input">Input Text</label>
              <textarea class="input-textarea" id="case-input" placeholder="Type or paste your content here..." style="height: 120px; resize: vertical;" aria-label="Text Converter Input"></textarea>
            </div>
            
            <!-- Quick Stats Grid -->
            <div class="form-row" style="grid-template-columns: repeat(4, 1fr); text-align: center; gap: 8px; margin-bottom: 12px;">
              <div class="tool-badge" style="padding: 6px;">
                <div style="font-size: 9px; color: var(--text-muted);">Chars</div>
                <div style="font-size: 14px; font-weight: bold; margin-top: 2px;" id="case-stat-chars">0</div>
              </div>
              <div class="tool-badge" style="padding: 6px;">
                <div style="font-size: 9px; color: var(--text-muted);">Words</div>
                <div style="font-size: 14px; font-weight: bold; margin-top: 2px;" id="case-stat-words">0</div>
              </div>
              <div class="tool-badge" style="padding: 6px;">
                <div style="font-size: 9px; color: var(--text-muted);">Lines</div>
                <div style="font-size: 14px; font-weight: bold; margin-top: 2px;" id="case-stat-lines">0</div>
              </div>
              <div class="tool-badge" style="padding: 6px;">
                <div style="font-size: 9px; color: var(--text-muted);">Reading</div>
                <div style="font-size: 14px; font-weight: bold; margin-top: 2px;" id="case-stat-read">0m</div>
              </div>
            </div>

            <div class="form-group">
              <label>Case Transformations</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                <button class="tool-btn secondary" id="case-btn-upper" style="font-size: 10px; padding: 6px 4px; justify-content: center;">UPPERCASE</button>
                <button class="tool-btn secondary" id="case-btn-lower" style="font-size: 10px; padding: 6px 4px; justify-content: center;">lowercase</button>
                <button class="tool-btn secondary" id="case-btn-title" style="font-size: 10px; padding: 6px 4px; justify-content: center;">Title Case</button>
                <button class="tool-btn secondary" id="case-btn-camel" style="font-size: 10px; padding: 6px 4px; justify-content: center;">camelCase</button>
                <button class="tool-btn secondary" id="case-btn-snake" style="font-size: 10px; padding: 6px 4px; justify-content: center;">snake_case</button>
                <button class="tool-btn secondary" id="case-btn-kebab" style="font-size: 10px; padding: 6px 4px; justify-content: center;">kebab-case</button>
              </div>
            </div>
            <button class="tool-btn secondary" id="case-clear-btn" style="margin-top: 6px; justify-content: center;">Clear Input</button>
          </div>

          <!-- Tab 2: Base64 Panel -->
          <div id="panel-base64-controls" class="tab-control-panel hidden">
            <div class="form-group">
              <label for="base64-input">Plain Text or Base64 Input</label>
              <textarea class="input-textarea" id="base64-input" placeholder="Enter plain text to encode, or Base64 string to decode..." style="height: 160px; resize: vertical;" aria-label="Base64 Input"></textarea>
            </div>
            <div style="display: flex; gap: 10px;">
              <button class="tool-btn primary" id="base64-encode-btn" style="flex: 1; justify-content: center;">Encode Base64</button>
              <button class="tool-btn primary" id="base64-decode-btn" style="flex: 1; justify-content: center;">Decode Base64</button>
            </div>
            <button class="tool-btn secondary" id="base64-clear-btn" style="margin-top: 10px; justify-content: center;">Clear Input</button>
          </div>

          <!-- Tab 3: URL Panel -->
          <div id="panel-url-controls" class="tab-control-panel hidden">
            <div class="form-group">
              <label for="url-input">URL or Raw Text Input</label>
              <textarea class="input-textarea" id="url-input" placeholder="Enter plain text/URL parameters to encode, or encoded string to decode..." style="height: 160px; resize: vertical;" aria-label="URL Input"></textarea>
            </div>
            <div style="display: flex; gap: 10px;">
              <button class="tool-btn primary" id="url-encode-btn" style="flex: 1; justify-content: center;">Encode URL</button>
              <button class="tool-btn primary" id="url-decode-btn" style="flex: 1; justify-content: center;">Decode URL</button>
            </div>
            <button class="tool-btn secondary" id="url-clear-btn" style="margin-top: 10px; justify-content: center;">Clear Input</button>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3 id="text-output-title">Transformed Result</h3>
            <button class="tool-btn accent-emerald" id="text-copy-btn">
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Output
            </button>
          </div>
          <textarea class="input-textarea" id="text-output" readonly placeholder="Result will appear here..." style="flex: 1; min-height: 250px; font-family: var(--font-mono); resize: none;" aria-label="Text Suite Output"></textarea>
        </div>

        <!-- Dynamic Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="text-guide-title">Quick Guide: Text Case Converter</span>
            </div>
            <button class="tool-btn secondary" id="text-load-sample" style="font-size: 11px;">Load Sample</button>
          </div>
          <div class="tool-guide-steps" id="text-guide-steps">
            <!-- Populated dynamically by JS -->
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
    const tabs = container.querySelectorAll("#text-suite-tabs .keyboard-tab");
    const panelCase = container.querySelector("#panel-case-controls");
    const panelBase64 = container.querySelector("#panel-base64-controls");
    const panelUrl = container.querySelector("#panel-url-controls");
    const textOutput = container.querySelector("#text-output");
    const outputTitle = container.querySelector("#text-output-title");

    const guideTitle = container.querySelector("#text-guide-title");
    const guideSteps = container.querySelector("#text-guide-steps");

    // Case Converter elements
    const caseInput = container.querySelector("#case-input");
    const caseStatChars = container.querySelector("#case-stat-chars");
    const caseStatWords = container.querySelector("#case-stat-words");
    const caseStatLines = container.querySelector("#case-stat-lines");
    const caseStatRead = container.querySelector("#case-stat-read");

    // Base64 elements
    const base64Input = container.querySelector("#base64-input");

    // URL elements
    const urlInput = container.querySelector("#url-input");

    let activeTab = "case";

    const guides = {
      case: {
        title: "Quick Guide: Text Case Converter",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Insert Text</strong>: Paste or type your text. Live metrics (characters, words, lines) update instantly.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Transform</strong>: Click any format (UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case).</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Save Output</strong>: Click <strong>Copy Output</strong> to save the transformed result.</div>
          </div>
        `
      },
      base64: {
        title: "Quick Guide: Base64 Encoder & Decoder",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Enter Data</strong>: Type plain text to encode, or valid Base64 characters to decode.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Select Process</strong>: Click <strong>Encode Base64</strong> or <strong>Decode Base64</strong>.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Clipboard</strong>: Copy the converted output immediately.</div>
          </div>
        `
      },
      url: {
        title: "Quick Guide: URL Encoder & Decoder",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Insert URL/Text</strong>: Enter raw URL query strings to encode, or percent-encoded data to decode.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Select Action</strong>: Click <strong>Encode URL</strong> or <strong>Decode URL</strong>.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Save URL</strong>: Copy the resulting URL/parameter string to your clipboard.</div>
          </div>
        `
      }
    };

    const switchTab = (tabId) => {
      activeTab = tabId;
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));

      panelCase.classList.toggle("hidden", tabId !== "case");
      panelBase64.classList.toggle("hidden", tabId !== "base64");
      panelUrl.classList.toggle("hidden", tabId !== "url");

      if (tabId === "case") {
        outputTitle.innerText = "Transformed Case Result";
        textOutput.value = "";
      } else if (tabId === "base64") {
        outputTitle.innerText = "Base64 Output Result";
        textOutput.value = "";
      } else if (tabId === "url") {
        outputTitle.innerText = "URL Output Result";
        textOutput.value = "";
      }

      if (guideTitle && guideSteps) {
        guideTitle.innerText = guides[tabId].title;
        guideSteps.innerHTML = guides[tabId].steps;
      }
    };

    // Tab switcher events
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        switchTab(tab.dataset.tab);
      });
    });

    // --- Case Converter logic ---
    const updateStats = () => {
      const val = caseInput.value;
      if (caseStatChars) caseStatChars.innerText = val.length;
      const words = val.trim() === "" ? 0 : val.trim().split(/\s+/).length;
      if (caseStatWords) caseStatWords.innerText = words;
      const lines = val === "" ? 0 : val.split(/\r\n|\r|\n/).length;
      if (caseStatLines) caseStatLines.innerText = lines;
      if (caseStatRead) caseStatRead.innerText = `${Math.ceil(words / 200)}m`;
    };

    caseInput?.addEventListener("input", updateStats);

    container.querySelector("#case-btn-upper")?.addEventListener("click", () => {
      textOutput.value = textUpper(caseInput.value);
    });
    container.querySelector("#case-btn-lower")?.addEventListener("click", () => {
      textOutput.value = textLower(caseInput.value);
    });
    container.querySelector("#case-btn-title")?.addEventListener("click", () => {
      textOutput.value = textTitle(caseInput.value);
    });
    container.querySelector("#case-btn-camel")?.addEventListener("click", () => {
      textOutput.value = textCamel(caseInput.value);
    });
    container.querySelector("#case-btn-snake")?.addEventListener("click", () => {
      textOutput.value = textSnake(caseInput.value);
    });
    container.querySelector("#case-btn-kebab")?.addEventListener("click", () => {
      textOutput.value = textKebab(caseInput.value);
    });

    container.querySelector("#case-clear-btn")?.addEventListener("click", () => {
      caseInput.value = "";
      textOutput.value = "";
      updateStats();
    });

    // --- Base64 logic ---
    container.querySelector("#base64-encode-btn")?.addEventListener("click", () => {
      try {
        textOutput.value = base64Encode(base64Input.value);
        appInstance.showToast("Encoded to Base64!", "success");
      } catch (e) {
        appInstance.showToast("Encoding failed: " + e.message, "error");
      }
    });

    container.querySelector("#base64-decode-btn")?.addEventListener("click", () => {
      try {
        textOutput.value = base64Decode(base64Input.value);
        appInstance.showToast("Decoded from Base64!", "success");
      } catch (e) {
        appInstance.showToast("Decoding failed: Invalid Base64 format", "error");
      }
    });

    container.querySelector("#base64-clear-btn")?.addEventListener("click", () => {
      base64Input.value = "";
      textOutput.value = "";
    });

    // --- URL logic ---
    container.querySelector("#url-encode-btn")?.addEventListener("click", () => {
      textOutput.value = urlEncode(urlInput.value);
      appInstance.showToast("URL Encoded!", "success");
    });

    container.querySelector("#url-decode-btn")?.addEventListener("click", () => {
      try {
        textOutput.value = urlDecode(urlInput.value);
        appInstance.showToast("URL Decoded!", "success");
      } catch (e) {
        appInstance.showToast("Decoding failed: Invalid URL format", "error");
      }
    });

    container.querySelector("#url-clear-btn")?.addEventListener("click", () => {
      urlInput.value = "";
      textOutput.value = "";
    });

    // --- Copy and load sample ---
    container.querySelector("#text-copy-btn")?.addEventListener("click", () => {
      if (textOutput.value) {
        appInstance.copyText(textOutput.value);
      } else {
        appInstance.showToast("Nothing to copy!", "warning");
      }
    });

    container.querySelector("#text-load-sample")?.addEventListener("click", () => {
      if (activeTab === "case") {
        caseInput.value = "this is an example statement describing omnitool hub capabilities";
        updateStats();
        textOutput.value = textTitle(caseInput.value);
        appInstance.showToast("Loaded sample statement in Title Case!", "info");
      } else if (activeTab === "base64") {
        base64Input.value = "Welcome to OmniTool Hub!";
        textOutput.value = base64Encode(base64Input.value);
        appInstance.showToast("Loaded sample plaintext & encoded to Base64!", "info");
      } else if (activeTab === "url") {
        urlInput.value = "https://example.com/search?q=text and encoder suite &category=dev tools";
        textOutput.value = urlEncode(urlInput.value);
        appInstance.showToast("Loaded sample URL & encoded!", "info");
      }
    });

    // Set initial active tab
    const initialTab = appInstance.activeSubtab || 'case';
    appInstance.activeSubtab = null;
    switchTab(initialTab);
  }
};
