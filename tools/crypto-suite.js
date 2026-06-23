import { md5 } from './utils.js';

export default {
  id: "crypto-suite",
  name: "Cryptography Suite",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Configuration</h3>
            <!-- Tabs inside config panel -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 320px; margin-left: 15px;" id="crypto-tabs">
              <button class="keyboard-tab active" data-tab="hash" style="font-size: 11px; padding: 4px 8px;">Hashes</button>
              <button class="keyboard-tab" data-tab="aes" style="font-size: 11px; padding: 4px 8px;">AES Cipher</button>
              <button class="keyboard-tab" data-tab="rsa" style="font-size: 11px; padding: 4px 8px;">RSA Keys</button>
            </div>
          </div>

          <!-- Tab 1: Hashing Panel -->
          <div id="panel-hash-controls" class="tab-control-panel">
            <div class="form-group">
              <label for="hash-input">Plain Text Input</label>
              <textarea class="input-textarea" id="hash-input" placeholder="Type or paste text to generate cryptographic hashes instantly..." style="height: 140px; resize: vertical;" aria-label="Hash Text Input"></textarea>
            </div>
            <button class="tool-btn secondary" id="hash-clear-btn" style="margin-top: 10px;">Clear Input</button>
          </div>

          <!-- Tab 2: AES Controls -->
          <div id="panel-aes-controls" class="tab-control-panel hidden">
            <div style="display: flex; gap: 8px; margin-bottom: 12px; width: 100%;">
              <button class="tool-btn secondary active" id="aes-mode-encrypt-btn" style="flex: 1; justify-content: center;">Encrypt Mode</button>
              <button class="tool-btn secondary" id="aes-mode-decrypt-btn" style="flex: 1; justify-content: center;">Decrypt Mode</button>
            </div>
            <div class="form-group">
              <label for="aes-input-text" id="aes-input-label">Plain Text to Encrypt</label>
              <textarea id="aes-input-text" class="form-textarea" placeholder="Type or paste the secret message you want to encrypt..." style="height: 120px; font-family: monospace; resize: vertical;"></textarea>
            </div>
            <div class="form-group">
              <label for="aes-passphrase">Secret Passphrase / Key</label>
              <div style="position: relative; display: flex; align-items: center;">
                <input type="password" id="aes-passphrase" class="form-input" placeholder="Enter key / password..." style="padding-right: 40px; font-family: monospace; width: 100%;">
                <button id="aes-toggle-password-btn" style="position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; padding: 4px;">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" id="aes-password-eye-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
              </div>
              <div id="aes-strength-container" style="margin-top: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-size: 10px; color: var(--text-muted);">Key Strength:</span>
                  <span id="aes-strength-label" style="font-size: 10px; font-weight: 700; color: #ef4444;">Empty</span>
                </div>
                <div style="height: 4px; background: var(--border-color); border-radius: 2px; overflow: hidden; display: flex;">
                  <div id="aes-strength-bar" style="width: 0%; height: 100%; background-color: #ef4444; transition: all 0.3s ease;"></div>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="aes-iterations">PBKDF2 Iterations</label>
              <div class="slider-group">
                <input type="range" id="aes-iterations" class="slider-input" min="10000" max="200000" step="10000" value="100000">
                <span class="slider-val" id="aes-iterations-val">100,000</span>
              </div>
            </div>
            <button class="tool-btn primary" id="aes-execute-btn" style="width: 100%; justify-content: center; height: 42px;">Encrypt Text</button>
          </div>

          <!-- Tab 3: RSA Controls -->
          <div id="panel-rsa-controls" class="tab-control-panel hidden">
            <div class="form-group">
              <label for="rsa-bit-size">Key Bit Size</label>
              <select class="form-select" id="rsa-bit-size" style="width: 100%;">
                <option value="1024">1024-bit (Fast)</option>
                <option value="2048" selected>2048-bit (Recommended Standard)</option>
                <option value="4096">4096-bit (Ultra-Secure, Slow)</option>
              </select>
            </div>
            <div class="form-group">
              <label for="rsa-hash">Hash Algorithm</label>
              <select class="form-select" id="rsa-hash" style="width: 100%;">
                <option value="SHA-256" selected>SHA-256</option>
                <option value="SHA-384">SHA-384</option>
                <option value="SHA-512">SHA-512</option>
                <option value="SHA-1">SHA-1 (Legacy / Compatibility)</option>
              </select>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px;">
              <button class="tool-btn primary" id="rsa-generate-btn" style="width: 100%; justify-content: center;">Generate Key Pair</button>
              <button class="tool-btn secondary" id="rsa-demo-btn" style="width: 100%; justify-content: center;">Load Demo Keys</button>
            </div>
            <div id="rsa-status" style="display: none; padding: 12px; border-radius: 8px; border: 1px dashed var(--accent-cyan); background: rgba(0, 242, 254, 0.05); text-align: center; margin-top: 10px;">
              <div style="font-size: 12px; color: var(--text-color); font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 8px;">
                <span class="spinner" style="width: 12px; height: 12px; border: 2px solid var(--accent-cyan); border-top-color: transparent; border-radius: 50%; display: inline-block; animation: rsa-spin 0.8s linear infinite;"></span>
                <span>Generating RSA Keys...</span>
              </div>
            </div>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Output Result</h3>
            <button class="tool-btn accent-emerald" id="crypto-copy-btn">
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Output
            </button>
          </div>

          <!-- Hashes Output (Visible only for hashes tab) -->
          <div id="output-hash-container" style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
            <div class="form-group">
              <label>MD5 Hash</label>
              <input type="text" id="hash-md5" class="form-input" readonly placeholder="MD5" style="font-family: var(--font-mono); font-size: 12px;" aria-label="MD5 Output">
            </div>
            <div class="form-group">
              <label>SHA-1 Hash</label>
              <input type="text" id="hash-sha1" class="form-input" readonly placeholder="SHA-1" style="font-family: var(--font-mono); font-size: 12px;" aria-label="SHA-1 Output">
            </div>
            <div class="form-group">
              <label>SHA-256 Hash</label>
              <input type="text" id="hash-sha256" class="form-input" readonly placeholder="SHA-256" style="font-family: var(--font-mono); font-size: 12px;" aria-label="SHA-256 Output">
            </div>
            <div class="form-group">
              <label>SHA-512 Hash</label>
              <input type="text" id="hash-sha512" class="form-input" readonly placeholder="SHA-512" style="font-family: var(--font-mono); font-size: 12px;" aria-label="SHA-512 Output">
            </div>
          </div>

          <!-- AES Output -->
          <div id="output-aes-container" class="hidden" style="width: 100%; display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label id="aes-output-label">Encrypted Output (Base64)</label>
              <button class="tool-btn secondary" id="aes-download-output-btn" style="font-size: 10px; padding: 4px 8px;">Download File</button>
            </div>
            <textarea id="aes-output-text" class="form-textarea" readonly placeholder="Result will appear here..." style="height: 180px; font-family: monospace; resize: none; background: rgba(0,0,0,0.2); width: 100%; box-sizing: border-box;"></textarea>
          </div>

          <!-- RSA Output -->
          <div id="output-rsa-container" class="hidden" style="width: 100%; display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label>Public Key (SPKI Format)</label>
                <button class="tool-btn secondary" id="rsa-download-pub-btn" style="font-size: 10px; padding: 4px 8px;" disabled>Download Public</button>
              </div>
              <textarea class="input-textarea" id="rsa-pub-output" readonly placeholder="Public key output..." style="font-family: var(--font-mono); font-size: 10px; height: 80px;" aria-label="RSA Public Key Output"></textarea>
            </div>
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label>Private Key (PKCS#8 Format)</label>
                <button class="tool-btn secondary" id="rsa-download-priv-btn" style="font-size: 10px; padding: 4px 8px;" disabled>Download Private</button>
              </div>
              <textarea class="input-textarea" id="rsa-priv-output" readonly placeholder="Private key output..." style="font-family: var(--font-mono); font-size: 10px; height: 80px;" aria-label="RSA Private Key Output"></textarea>
            </div>
          </div>
        </div>

        <!-- Dynamic Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="crypto-guide-title">Quick Guide: Cryptographic Hashes</span>
            </div>
            <button class="tool-btn secondary" id="crypto-load-sample" style="font-size: 11px;">Load Sample</button>
          </div>
          <div class="tool-guide-steps" id="crypto-guide-steps">
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
          background: rgba(16, 185, 129, 0.15);
          color: var(--accent-emerald);
          border-color: rgba(16, 185, 129, 0.3);
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.1);
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
        @keyframes rsa-spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
  },
  init(container, appInstance) {
    const tabs = container.querySelectorAll("#crypto-tabs .keyboard-tab");
    const panelHash = container.querySelector("#panel-hash-controls");
    const panelAes = container.querySelector("#panel-aes-controls");
    const panelRsa = container.querySelector("#panel-rsa-controls");
    const outputHash = container.querySelector("#output-hash-container");
    const outputAes = container.querySelector("#output-aes-container");
    const outputRsa = container.querySelector("#output-rsa-container");

    const guideTitle = container.querySelector("#crypto-guide-title");
    const guideSteps = container.querySelector("#crypto-guide-steps");

    // 1. Hash Elements
    const hashInput = container.querySelector("#hash-input");
    const hashMd5 = container.querySelector("#hash-md5");
    const hashSha1 = container.querySelector("#hash-sha1");
    const hashSha256 = container.querySelector("#hash-sha256");
    const hashSha512 = container.querySelector("#hash-sha512");

    // 2. AES Elements
    const aesModeEncrypt = container.querySelector("#aes-mode-encrypt-btn");
    const aesModeDecrypt = container.querySelector("#aes-mode-decrypt-btn");
    const aesInputLabel = container.querySelector("#aes-input-label");
    const aesOutputLabel = container.querySelector("#aes-output-label");
    const aesInputText = container.querySelector("#aes-input-text");
    const aesOutputText = container.querySelector("#aes-output-text");
    const aesPassphrase = container.querySelector("#aes-passphrase");
    const aesTogglePasswordBtn = container.querySelector("#aes-toggle-password-btn");
    const aesEyeIcon = container.querySelector("#aes-password-eye-icon");
    const aesStrengthBar = container.querySelector("#aes-strength-bar");
    const aesStrengthLabel = container.querySelector("#aes-strength-label");
    const aesIterations = container.querySelector("#aes-iterations");
    const aesIterationsVal = container.querySelector("#aes-iterations-val");
    const aesExecuteBtn = container.querySelector("#aes-execute-btn");
    const aesDownloadOutput = container.querySelector("#aes-download-output-btn");

    // 3. RSA Elements
    const rsaBitSize = container.querySelector("#rsa-bit-size");
    const rsaHash = container.querySelector("#rsa-hash");
    const rsaGenerateBtn = container.querySelector("#rsa-generate-btn");
    const rsaDemoBtn = container.querySelector("#rsa-demo-btn");
    const rsaStatus = container.querySelector("#rsa-status");
    const rsaPubOutput = container.querySelector("#rsa-pub-output");
    const rsaPrivOutput = container.querySelector("#rsa-priv-output");
    const rsaDownloadPub = container.querySelector("#rsa-download-pub-btn");
    const rsaDownloadPriv = container.querySelector("#rsa-download-priv-btn");

    let activeTab = "hash";
    let aesMode = "encrypt"; // encrypt or decrypt
    let aesPasswordVisible = false;
    let rsaPublicKeyPem = "";
    let rsaPrivateKeyPem = "";

    const guides = {
      hash: {
        title: "Quick Guide: Cryptographic Hashes",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Type Text</strong>: Enter plain text into the input field.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Realtime Generation</strong>: MD5, SHA-1, SHA-256, and SHA-512 update instantly.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Export</strong>: Click the Copy button next to any hash value to copy it.</div>
          </div>
        `
      },
      aes: {
        title: "Quick Guide: AES-256 Symmetric Encryption",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Set Mode</strong>: Toggle between Encrypt Mode (plain ➔ cipher) and Decrypt Mode.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Enter Key</strong>: Provide a secret passphrase. A random Salt and IV will automatically secure the result.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Run & Copy</strong>: Press Encrypt/Decrypt. Save the Base64 block or download it.</div>
          </div>
        `
      },
      rsa: {
        title: "Quick Guide: RSA Key Pair Generator",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Configure Size</strong>: Pick 1024, 2048 (standard), or 4096 bits size.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Generate Keys</strong>: Click Generate Key Pair. Calculation takes place locally.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Export PEMs</strong>: Save SPKI Public and PKCS#8 Private keys locally.</div>
          </div>
        `
      }
    };

    const switchTab = (tabId) => {
      activeTab = tabId;
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
      
      panelHash.classList.toggle("hidden", tabId !== "hash");
      panelAes.classList.toggle("hidden", tabId !== "aes");
      panelRsa.classList.toggle("hidden", tabId !== "rsa");
      
      outputHash.classList.toggle("hidden", tabId !== "hash");
      outputAes.classList.toggle("hidden", tabId !== "aes");
      outputRsa.classList.toggle("hidden", tabId !== "rsa");

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

    // --- Hashing logic ---
    const runHasher = async () => {
      const val = hashInput.value;
      if (!val) {
        hashMd5.value = "";
        hashSha1.value = "";
        hashSha256.value = "";
        hashSha512.value = "";
        return;
      }

      hashMd5.value = md5(val);

      const encoder = new TextEncoder();
      const data = encoder.encode(val);

      if (window.crypto && window.crypto.subtle) {
        try {
          const bufferSha1 = await crypto.subtle.digest("SHA-1", data);
          hashSha1.value = Array.from(new Uint8Array(bufferSha1)).map(b => b.toString(16).padStart(2, "0")).join("");

          const bufferSha256 = await crypto.subtle.digest("SHA-256", data);
          hashSha256.value = Array.from(new Uint8Array(bufferSha256)).map(b => b.toString(16).padStart(2, "0")).join("");

          const bufferSha512 = await crypto.subtle.digest("SHA-512", data);
          hashSha512.value = Array.from(new Uint8Array(bufferSha512)).map(b => b.toString(16).padStart(2, "0")).join("");
        } catch (e) {
          console.error(e);
          hashSha1.value = "[Failed]";
          hashSha256.value = "[Failed]";
          hashSha512.value = "[Failed]";
        }
      } else {
        hashSha1.value = "[Web Crypto Unavailable]";
        hashSha256.value = "[Web Crypto Unavailable]";
        hashSha512.value = "[Web Crypto Unavailable]";
      }
    };

    hashInput?.addEventListener("input", runHasher);
    container.querySelector("#hash-clear-btn")?.addEventListener("click", () => {
      hashInput.value = "";
      runHasher();
    });

    // --- AES logic ---
    const switchAesMode = (newMode) => {
      aesMode = newMode;
      if (aesMode === "encrypt") {
        aesModeEncrypt.classList.add("active");
        aesModeDecrypt.classList.remove("active");
        aesInputLabel.innerText = "Plain Text to Encrypt";
        aesOutputLabel.innerText = "Encrypted Output (Base64)";
        aesInputText.placeholder = "Type or paste the secret message you want to encrypt...";
        aesExecuteBtn.innerText = "Encrypt Text";
      } else {
        aesModeDecrypt.classList.add("active");
        aesModeEncrypt.classList.remove("active");
        aesInputLabel.innerText = "Encrypted Ciphertext (Base64)";
        aesOutputLabel.innerText = "Decrypted Plain Text";
        aesInputText.placeholder = "Paste the Base64 encrypted code that you want to decrypt...";
        aesExecuteBtn.innerText = "Decrypt Text";
      }
      aesOutputText.value = "";
    };

    aesModeEncrypt?.addEventListener("click", () => switchAesMode("encrypt"));
    aesModeDecrypt?.addEventListener("click", () => switchAesMode("decrypt"));

    aesIterations?.addEventListener("input", (e) => {
      aesIterationsVal.innerText = parseInt(e.target.value, 10).toLocaleString();
    });

    aesTogglePasswordBtn?.addEventListener("click", () => {
      aesPasswordVisible = !aesPasswordVisible;
      if (aesPasswordVisible) {
        aesPassphrase.type = "text";
        aesEyeIcon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
      } else {
        aesPassphrase.type = "password";
        aesEyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
      }
    });

    aesPassphrase?.addEventListener("input", (e) => {
      const password = e.target.value;
      if (!password) {
        aesStrengthBar.style.width = "0%";
        aesStrengthBar.style.backgroundColor = "#ef4444";
        aesStrengthLabel.innerText = "Empty";
        aesStrengthLabel.style.color = "#ef4444";
        return;
      }
      let score = 0;
      if (password.length >= 8) score++;
      if (password.length >= 14) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      let width = 20 + score * 16;
      let label = "Weak";
      let color = "#ef4444";

      if (score >= 4) { label = "Cyber Secure"; color = "#10b981"; }
      else if (score >= 3) { label = "Strong"; color = "#34d399"; }
      else if (score >= 2) { label = "Medium"; color = "#f59e0b"; }

      aesStrengthBar.style.width = `${width}%`;
      aesStrengthBar.style.backgroundColor = color;
      aesStrengthLabel.innerText = label;
      aesStrengthLabel.style.color = color;
    });

    const textToBuffer = (str) => new TextEncoder().encode(str);
    const bufferToText = (buf) => new TextDecoder().decode(buf);
    const bufferToBase64 = (buf) => {
      const binstr = Array.from(new Uint8Array(buf)).map(b => String.fromCharCode(b)).join("");
      return btoa(binstr);
    };
    const base64ToBuffer = (b64) => {
      const binstr = atob(b64);
      const buf = new Uint8Array(binstr.length);
      for (let i = 0; i < binstr.length; i++) buf[i] = binstr.charCodeAt(i);
      return buf;
    };

    const deriveKey = async (passphraseStr, saltBuffer, iterationsCount) => {
      const passwordBytes = textToBuffer(passphraseStr);
      const baseKey = await window.crypto.subtle.importKey(
        "raw", passwordBytes, "PBKDF2", false, ["deriveBits", "deriveKey"]
      );
      return await window.crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: saltBuffer,
          iterations: iterationsCount,
          hash: "SHA-256"
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );
    };

    aesExecuteBtn?.addEventListener("click", async () => {
      const inputVal = aesInputText.value.trim();
      const key = aesPassphrase.value;
      const iterations = parseInt(aesIterations.value, 10);

      if (!inputVal) {
        appInstance.showToast(`Please enter input text!`, "warning");
        return;
      }
      if (!key) {
        appInstance.showToast("Please enter a key passphrase!", "warning");
        return;
      }

      aesExecuteBtn.disabled = true;
      aesExecuteBtn.style.opacity = "0.7";

      try {
        if (aesMode === "encrypt") {
          const salt = window.crypto.getRandomValues(new Uint8Array(16));
          const iv = window.crypto.getRandomValues(new Uint8Array(12));
          const aesKey = await deriveKey(key, salt, iterations);
          const plainBytes = textToBuffer(inputVal);
          
          const ciphertextBuffer = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv, tagLength: 128 },
            aesKey,
            plainBytes
          );

          const ciphertextBytes = new Uint8Array(ciphertextBuffer);
          const combined = new Uint8Array(16 + 12 + ciphertextBytes.length);
          combined.set(salt, 0);
          combined.set(iv, 16);
          combined.set(ciphertextBytes, 28);

          aesOutputText.value = bufferToBase64(combined);
          appInstance.showToast("Encrypted Successfully!", "success");
        } else {
          let combined;
          try {
            combined = base64ToBuffer(inputVal);
          } catch (e) {
            throw new Error("Invalid Base64 structure.");
          }
          if (combined.length < 28) throw new Error("Ciphertext too short.");

          const salt = combined.slice(0, 16);
          const iv = combined.slice(16, 28);
          const ciphertextBytes = combined.slice(28);

          const aesKey = await deriveKey(key, salt, iterations);
          const decryptedBuffer = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv: iv, tagLength: 128 },
            aesKey,
            ciphertextBytes
          );

          aesOutputText.value = bufferToText(decryptedBuffer);
          appInstance.showToast("Decrypted Successfully!", "success");
        }
      } catch (err) {
        console.error(err);
        const errMsg = err.name === "OperationError" 
          ? "Decryption failed! Wrong password or corrupted payload."
          : err.message || "Operation failed!";
        appInstance.showToast(errMsg, "error");
        aesOutputText.value = "";
      } finally {
        aesExecuteBtn.disabled = false;
        aesExecuteBtn.style.opacity = "1";
      }
    });

    aesDownloadOutput?.addEventListener("click", () => {
      const content = aesOutputText.value;
      if (!content) {
        appInstance.showToast("Nothing to download!", "warning");
        return;
      }
      const filename = aesMode === "encrypt" ? "encrypted_message.enc" : "decrypted_message.txt";
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      appInstance.showToast(`Downloaded ${filename}`, "success");
    });

    // --- RSA logic ---
    const arrayBufferToBase64 = (buffer) => {
      let binary = "";
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
      return window.btoa(binary);
    };

    const spkiToPem = (spkiBuffer) => {
      const base64 = arrayBufferToBase64(spkiBuffer);
      const lines = base64.match(/.{1,64}/g).join("\n");
      return `-----BEGIN PUBLIC KEY-----\n${lines}\n-----END PUBLIC KEY-----`;
    };

    const pkcs8ToPem = (pkcs8Buffer) => {
      const base64 = arrayBufferToBase64(pkcs8Buffer);
      const lines = base64.match(/.{1,64}/g).join("\n");
      return `-----BEGIN PRIVATE KEY-----\n${lines}\n-----END PRIVATE KEY-----`;
    };

    const triggerDownload = (filename, text) => {
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    rsaGenerateBtn?.addEventListener("click", async () => {
      const bitSize = parseInt(rsaBitSize.value, 10);
      const hashAlg = rsaHash.value;

      if (!window.crypto || !window.crypto.subtle) {
        appInstance.showToast("Web Crypto API is not supported in this browser context", "error");
        return;
      }

      rsaGenerateBtn.disabled = true;
      rsaDemoBtn.disabled = true;
      rsaStatus.style.display = "block";
      rsaPubOutput.value = "";
      rsaPrivOutput.value = "";
      rsaDownloadPub.disabled = true;
      rsaDownloadPriv.disabled = true;

      // Small timeout to allow spinner render
      setTimeout(async () => {
        try {
          const keyPair = await window.crypto.subtle.generateKey(
            {
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: bitSize,
              publicExponent: new Uint8Array([1, 0, 1]),
              hash: hashAlg
            },
            true,
            ["sign", "verify"]
          );

          const exportedPub = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
          rsaPublicKeyPem = spkiToPem(exportedPub);

          const exportedPriv = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
          rsaPrivateKeyPem = pkcs8ToPem(exportedPriv);

          rsaPubOutput.value = rsaPublicKeyPem;
          rsaPrivOutput.value = rsaPrivateKeyPem;

          rsaDownloadPub.disabled = false;
          rsaDownloadPriv.disabled = false;
          appInstance.showToast("RSA Key Pair Generated Successfully!", "success");
        } catch (e) {
          console.error(e);
          appInstance.showToast("RSA Generation failed: " + e.message, "error");
        } finally {
          rsaGenerateBtn.disabled = false;
          rsaDemoBtn.disabled = false;
          rsaStatus.style.display = "none";
        }
      }, 100);
    });

    rsaDemoBtn?.addEventListener("click", () => {
      rsaPublicKeyPem = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzV1b899L/Wz/p5hJz1v2\nyE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L\n0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L\n/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1\nG/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d\n+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p\n5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F\n/67S+3L0k3/d+H8wIDAQAB\n-----END PUBLIC KEY-----`;
      rsaPrivateKeyPem = `-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNXVvzz0v9bP+n\nhJDnXTPIb0b9DUX/rtL7cvSTf934fx4rUza730v9bP+nhJDnXTPIb0b9DUX/rtL7\ncvSTf934fx4rUza730v9bP+nhJDnXTPIb0b9DUX/rtL7cvSTf934fx4rUza730v9\nbP+nhJDnXTPIb0b9DUX/rtL7cvSTf934fx4rUza730v9bP+nhJDnXTPIb0b9DUX/\nrtL7cvSTf934fx4rUza730v9bP+nhJDnXTPIb0b9DUX/rtL7cvSTf934fx4rUza7\n30v9bP+nhJDnXTPIb0b9DUX/rtL7cvSTf934fx4rUza730v9bP+nhJDnXTPIb0b9\nDUX/rtL7cvSTf934fzAIDAQABFwKCAQEA4Df+01L/wDf+01L/wDf+01L/wDf+01L/\nwDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/w\nDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wD\nf+01L/wDf+01L/wDf+0MCgYEA4Df+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/w\nDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wD\nf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wD\nf+01MCgYEA4Df+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/\nwDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/w\nDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01MCg\nYEA4Df+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+0\n1L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+0\n1L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01MCgYEA\n4Df+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/w\nDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/w\nDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01MCgYEA4Df+\n01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+0\n1L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+0\n1L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01M=\n-----END PRIVATE KEY-----`;

      rsaPubOutput.value = rsaPublicKeyPem;
      rsaPrivOutput.value = rsaPrivateKeyPem;
      rsaDownloadPub.disabled = false;
      rsaDownloadPriv.disabled = false;
      appInstance.showToast("Demo keys loaded successfully!", "info");
    });

    rsaDownloadPub?.addEventListener("click", () => {
      if (rsaPublicKeyPem) {
        triggerDownload("public_key.pem", rsaPublicKeyPem);
        appInstance.showToast("Public Key downloaded!", "success");
      }
    });

    rsaDownloadPriv?.addEventListener("click", () => {
      if (rsaPrivateKeyPem) {
        triggerDownload("private_key.pem", rsaPrivateKeyPem);
        appInstance.showToast("Private Key downloaded!", "success");
      }
    });

    // --- Unified copy ---
    container.querySelector("#crypto-copy-btn")?.addEventListener("click", () => {
      if (activeTab === "hash") {
        const text = `MD5: ${hashMd5.value}\nSHA-1: ${hashSha1.value}\nSHA-256: ${hashSha256.value}\nSHA-512: ${hashSha512.value}`;
        appInstance.copyText(text);
      } else if (activeTab === "aes") {
        appInstance.copyText(aesOutputText.value);
      } else if (activeTab === "rsa") {
        const text = `PUBLIC KEY:\n${rsaPubOutput.value}\n\nPRIVATE KEY:\n${rsaPrivOutput.value}`;
        appInstance.copyText(text);
      }
    });

    // --- Load Sample ---
    container.querySelector("#crypto-load-sample")?.addEventListener("click", () => {
      if (activeTab === "hash") {
        hashInput.value = "Welcome to Cryptography Suite on OmniTool Hub!";
        runHasher();
        appInstance.showToast("Loaded hashes sample!", "info");
      } else if (activeTab === "aes") {
        if (aesMode === "encrypt") {
          aesInputText.value = "Top secret message: Meet me at the server vault at midnight.";
          aesPassphrase.value = "VaultPass123!_";
          aesPassphrase.dispatchEvent(new Event("input"));
          aesExecuteBtn.click();
        } else {
          aesInputText.value = "cGFzc3dvcmQxMjM0NTZzYWx0MDAwMDAwMDAwMDAwMDAwMGl2MDAwMDAwMDAwMDAwRGVjcnlwdCBtZSBpZiB5b3UgY2FuIQ==";
          aesPassphrase.value = "VaultPass123!_";
          aesPassphrase.dispatchEvent(new Event("input"));
          appInstance.showToast("Loaded sample ciphertext. Click Decrypt.", "info");
        }
      } else if (activeTab === "rsa") {
        rsaDemoBtn.click();
      }
    });

    // Set initial active tab (supports redirect payload)
    const initialTab = appInstance.activeSubtab || 'hash';
    appInstance.activeSubtab = null;
    switchTab(initialTab);
  }
};
