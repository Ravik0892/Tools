export default {
  id: "security-suite",
  name: "Security & Passwords Suite",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Configuration</h3>
            <!-- Tabs inside config panel -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 320px; margin-left: 15px;" id="security-tabs">
              <button class="keyboard-tab active" data-tab="pass" style="font-size: 11px; padding: 4px 8px;">Passwords</button>
              <button class="keyboard-tab" data-tab="uuid" style="font-size: 11px; padding: 4px 8px;">UUIDs</button>
            </div>
          </div>

          <!-- Tab 1: Password Controls -->
          <div id="panel-pass-controls" class="tab-control-panel">
            <div class="form-group">
              <label for="pass-length">Password Length</label>
              <div class="slider-group">
                <input type="range" id="pass-length" class="slider-input" min="6" max="64" value="16">
                <span class="slider-val" id="pass-length-val">16</span>
              </div>
            </div>
            <div class="form-group">
              <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <input type="checkbox" id="pass-upper" checked>
                <span>Uppercase Letters (A-Z)</span>
              </label>
              <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <input type="checkbox" id="pass-lower" checked>
                <span>Lowercase Letters (a-z)</span>
              </label>
              <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <input type="checkbox" id="pass-nums" checked>
                <span>Numbers (0-9)</span>
              </label>
              <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="pass-symbols" checked>
                <span>Special Characters (!@#$%^&*)</span>
              </label>
            </div>
            <button class="tool-btn primary" id="pass-generate-btn" style="margin-top: 10px;">Generate Password</button>
          </div>

          <!-- Tab 2: UUID Controls -->
          <div id="panel-uuid-controls" class="tab-control-panel hidden">
            <div class="form-group">
              <label for="uuid-count">Number of UUIDs</label>
              <div class="slider-group">
                <input type="range" id="uuid-count" class="slider-input" min="1" max="50" value="5">
                <span class="slider-val" id="uuid-count-val">5</span>
              </div>
            </div>
            <div class="form-group">
              <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <input type="checkbox" id="uuid-uppercase">
                <span>Uppercase Letters</span>
              </label>
              <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="uuid-hyphens" checked>
                <span>Include Hyphens</span>
              </label>
            </div>
            <button class="tool-btn primary" id="uuid-generate-btn" style="margin-top: 10px;">Generate UUIDs</button>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Generated Output</h3>
            <button class="tool-btn accent-emerald" id="security-copy-btn">
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Output
            </button>
          </div>

          <!-- Output Content Area -->
          <div style="flex: 1; display: flex; flex-direction: column; gap: 15px; justify-content: center; min-height: 250px;">
            <!-- Output box for passwords -->
            <div id="output-pass-container" style="display: flex; flex-direction: column; gap: 15px; width: 100%;">
              <input type="text" id="pass-output" class="form-input" readonly placeholder="Click Generate..." style="font-family: var(--font-mono); font-size: 16px; font-weight: bold; letter-spacing: 0.5px; height: 50px; text-align: center; width: 100%; box-sizing: border-box;" aria-label="Generated Password Output">
              
              <div class="form-group">
                <label>Password Strength Indicator</label>
                <div style="height: 6px; width: 100%; background-color: var(--bg-input); border-radius: 3px; overflow: hidden; margin-top: 4px;">
                  <div id="pass-strength-bar" style="height: 100%; width: 0%; transition: width 0.3s, background-color 0.3s;"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-top: 4px;">
                  <span id="pass-strength-label" style="font-weight: 700; color: var(--text-muted);">Strength: None</span>
                  <span id="pass-entropy-label" style="font-family: var(--font-mono); color: var(--text-muted);">0 bits</span>
                </div>
              </div>
            </div>

            <!-- Output box for UUIDs -->
            <div id="output-uuid-container" class="hidden" style="width: 100%; height: 100%; display: flex; flex-direction: column;">
              <pre class="output-pre" id="uuid-output" style="max-height: 230px; overflow-y: auto; font-family: var(--font-mono); font-size: 13px; text-align: left; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-input); flex: 1; min-height: 180px; margin: 0;"></pre>
            </div>
          </div>
        </div>

        <!-- Dynamic Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="security-guide-title">Quick Guide: Secure Password Generator</span>
            </div>
            <button class="tool-btn secondary" id="security-load-sample" style="font-size: 11px;">Load Sample</button>
          </div>
          <div class="tool-guide-steps" id="security-guide-steps">
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
    const tabs = container.querySelectorAll("#security-tabs .keyboard-tab");
    const panelPass = container.querySelector("#panel-pass-controls");
    const panelUuid = container.querySelector("#panel-uuid-controls");
    const outputPass = container.querySelector("#output-pass-container");
    const outputUuid = container.querySelector("#output-uuid-container");

    const guideTitle = container.querySelector("#security-guide-title");
    const guideSteps = container.querySelector("#security-guide-steps");

    // 1. Password elements
    const passLength = container.querySelector("#pass-length");
    const passLengthVal = container.querySelector("#pass-length-val");
    const passUpper = container.querySelector("#pass-upper");
    const passLower = container.querySelector("#pass-lower");
    const passNums = container.querySelector("#pass-nums");
    const passSymbols = container.querySelector("#pass-symbols");
    const passOutput = container.querySelector("#pass-output");
    const passBar = container.querySelector("#pass-strength-bar");
    const passStrengthLabel = container.querySelector("#pass-strength-label");
    const passEntropyLabel = container.querySelector("#pass-entropy-label");

    // 2. UUID elements
    const uuidCount = container.querySelector("#uuid-count");
    const uuidCountVal = container.querySelector("#uuid-count-val");
    const uuidUpper = container.querySelector("#uuid-uppercase");
    const uuidHyphens = container.querySelector("#uuid-hyphens");
    const uuidOutput = container.querySelector("#uuid-output");

    let activeTab = "pass";

    const guides = {
      pass: {
        title: "Quick Guide: Secure Password Generator",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Choose Options</strong>: Set length bounds (6 to 64 chars) and choose character options.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Generate Password</strong>: Click <strong>Generate Password</strong> to execute secure client-side generation using cryptographically secure random values.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Verify Strength</strong>: Check the strength bar and entropy bit counts before copying the password.</div>
          </div>
        `
      },
      uuid: {
        title: "Quick Guide: UUID v4 Generator",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Choose Options</strong>: Set the quantity slider (1–50) and toggle uppercase or hyphens style.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Generate Keys</strong>: Click <strong>Generate UUIDs</strong> to create secure RFC 4122 UUID v4 keys.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Copy All</strong>: Click <strong>Copy Output</strong> to copy every generated UUID to your clipboard at once.</div>
          </div>
        `
      }
    };

    const switchTab = (tabId, updateRoute = true) => {
      activeTab = tabId;
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
      
      panelPass.classList.toggle("hidden", tabId !== "pass");
      panelUuid.classList.toggle("hidden", tabId !== "uuid");
      outputPass.classList.toggle("hidden", tabId !== "pass");
      outputUuid.classList.toggle("hidden", tabId !== "uuid");

      if (guideTitle && guideSteps) {
        guideTitle.innerText = guides[tabId].title;
        guideSteps.innerHTML = guides[tabId].steps;
      }

      if (updateRoute && appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("security-suite", tabId, { pushHistory: true });
      }
    };

    // Tab switcher events
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        switchTab(tab.dataset.tab, true);
      });
    });

    // --- Password logic ---
    passLength?.addEventListener("input", (e) => {
      passLengthVal.innerText = e.target.value;
    });

    const generatePassword = () => {
      const len = parseInt(passLength.value, 10);
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const numbers = "0123456789";
      const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

      let charSet = "";
      if (passUpper.checked) charSet += uppercase;
      if (passLower.checked) charSet += lowercase;
      if (passNums.checked) charSet += numbers;
      if (passSymbols.checked) charSet += symbols;

      if (!charSet) {
        passOutput.value = "";
        passBar.style.width = "0%";
        passBar.style.backgroundColor = "transparent";
        passStrengthLabel.innerText = "Strength: None";
        passEntropyLabel.innerText = "0 bits";
        return;
      }

      const randomBuffer = new Uint32Array(len);
      crypto.getRandomValues(randomBuffer);

      let password = "";
      for (let i = 0; i < len; i++) {
        password += charSet.charAt(randomBuffer[i] % charSet.length);
      }
      passOutput.value = password;

      const entropy = Math.round(len * (Math.log(charSet.length) / Math.log(2)));
      passEntropyLabel.innerText = `${entropy} bits`;

      let percent = 0, label = "None", color = "transparent";
      if (entropy < 40) { percent = 25; label = "Weak"; color = "var(--accent-rose)"; }
      else if (entropy < 60) { percent = 50; label = "Medium"; color = "var(--accent-orange)"; }
      else if (entropy < 80) { percent = 75; label = "Strong"; color = "var(--accent-cyan)"; }
      else { percent = 100; label = "Very Strong"; color = "var(--accent-emerald)"; }

      passBar.style.width = `${percent}%`;
      passBar.style.backgroundColor = color;
      passStrengthLabel.innerText = `Strength: ${label}`;
      passStrengthLabel.style.color = color;
    };

    container.querySelector("#pass-generate-btn")?.addEventListener("click", generatePassword);

    // --- UUID logic ---
    uuidCount?.addEventListener("input", (e) => {
      uuidCountVal.innerText = e.target.value;
    });

    const generateUUIDv4 = () => {
      const rnd = crypto.getRandomValues(new Uint8Array(16));
      rnd[6] = (rnd[6] & 0x0f) | 0x40; // Version 4
      rnd[8] = (rnd[8] & 0x3f) | 0x80;
      
      let u = "";
      for (let i = 0; i < 16; i++) u += rnd[i].toString(16).padStart(2, "0");
      if (uuidHyphens.checked) {
        u = `${u.slice(0, 8)}-${u.slice(8, 12)}-${u.slice(12, 16)}-${u.slice(16, 20)}-${u.slice(20)}`;
      }
      return uuidUpper.checked ? u.toUpperCase() : u.toLowerCase();
    };

    const runUuidGenerate = () => {
      const list = [];
      const count = parseInt(uuidCount.value, 10);
      for (let i = 0; i < count; i++) list.push(generateUUIDv4());
      uuidOutput.innerText = list.join("\n");
    };

    container.querySelector("#uuid-generate-btn")?.addEventListener("click", runUuidGenerate);

    // --- Unified Copy ---
    container.querySelector("#security-copy-btn")?.addEventListener("click", () => {
      if (activeTab === "pass") {
        appInstance.copyText(passOutput.value);
      } else {
        appInstance.copyText(uuidOutput.innerText);
      }
    });

    // --- Load Sample ---
    container.querySelector("#security-load-sample")?.addEventListener("click", () => {
      if (activeTab === "pass") {
        passLength.value = "20";
        passLengthVal.innerText = "20";
        passUpper.checked = true;
        passLower.checked = true;
        passNums.checked = true;
        passSymbols.checked = true;
        generatePassword();
        appInstance.showToast("Generated secure 20-char sample password!", "info");
      } else {
        uuidCount.value = "10";
        uuidCountVal.innerText = "10";
        uuidHyphens.checked = true;
        uuidUpper.checked = false;
        runUuidGenerate();
        appInstance.showToast("Generated 10 sample UUIDs!", "info");
      }
    });

    // Register tab switcher with appInstance for browser back/forward (popstate)
    if (appInstance && typeof appInstance.registerTabSwitcher === "function") {
      appInstance.registerTabSwitcher("security-suite", (tabId) => switchTab(tabId, false));
    }

    // Set initial active tab (supports redirect payload)
    const initialTab = appInstance.activeSubtab || 'pass';
    appInstance.activeSubtab = null;
    switchTab(initialTab, false);
    const requestedSubtool = appInstance.activeSubtool;
    if (requestedSubtool && appInstance && typeof appInstance.syncSubtab === "function") {
      appInstance.syncSubtab("security-suite", requestedSubtool, { pushHistory: false, replaceHistory: true });
    }

    // Initial triggers
    generatePassword();
    runUuidGenerate();
  }
};
