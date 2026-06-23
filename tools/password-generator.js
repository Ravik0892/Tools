export default {
  id: "password-generator",
  name: "Secure Password Generator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Options</h3>
          </div>
          <div class="form-group">
            <label>Password Length</label>
            <div class="slider-group">
              <input type="range" id="pass-length" class="slider-input" min="6" max="64" value="16">
              <span class="slider-val" id="pass-length-val">16</span>
            </div>
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="pass-upper" checked>
              Uppercase Letters (A-Z)
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="pass-lower" checked>
              Lowercase Letters (a-z)
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="pass-nums" checked>
              Numbers (0-9)
            </label>
            <label class="checkbox-label">
              <input type="checkbox" id="pass-symbols" checked>
              Special Characters (!@#$%^&*)
            </label>
          </div>
          <button class="tool-btn primary" id="pass-generate-btn">Generate Secure Password</button>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Generated Password</h3>
            <button class="tool-btn accent-emerald" id="pass-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy</button>
          </div>
          <input type="text" id="pass-output" class="form-input" readonly placeholder="Click Generate..." style="font-family: var(--font-mono); font-size: 16px; font-weight: bold; letter-spacing: 0.5px; height: 50px; text-align: center;" aria-label="Generated Password Output">
          
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

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="pass-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Choose Options</strong>: Set length bounds (6 to 64 chars) and choose character options.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Generate Password</strong>: Click <strong>Generate Secure Password</strong> to execute secure client-side generation using cryptographically secure random values.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Verify Entropy</strong>: Check the visual strength bar and entropy bit counts before copying the resulting password.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">High Security</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Alphanumeric Only</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input Options</span>
                <div class="tool-guide-io-value">Length: 20, all option checkboxes: ON</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Password Output</span>
                <div class="tool-guide-io-value">Tq#8mX!vK2@nLs$9Yw7&amp; (Strong, ~131 bits)</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input Options</span>
                <div class="tool-guide-io-value">Length: 12, Symbols: OFF, others: ON</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Password Output</span>
                <div class="tool-guide-io-value">8aF3nK9Pq2wL (Medium, ~71 bits)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
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

    passLength?.addEventListener("input", (e) => {
      passLengthVal.innerText = e.target.value;
    });

    const generatePassword = () => {
      const len = parseInt(passLength.value);
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
    container.querySelector("#pass-copy-btn")?.addEventListener("click", () => appInstance.copyText(passOutput.value));

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

    container.querySelector("#pass-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        passLength.value = "20";
        if (passLengthVal) passLengthVal.innerText = "20";
        passUpper.checked = true;
        passLower.checked = true;
        passNums.checked = true;
        passSymbols.checked = true;
        generatePassword();
        appInstance.showToast("Generated high security 20-char sample password!", "info");
      } else {
        passLength.value = "12";
        if (passLengthVal) passLengthVal.innerText = "12";
        passUpper.checked = true;
        passLower.checked = true;
        passNums.checked = true;
        passSymbols.checked = false;
        generatePassword();
        appInstance.showToast("Generated alphanumeric 12-char sample password!", "info");
      }
    });

    // Generate automatically on init
    generatePassword();
  }
};
