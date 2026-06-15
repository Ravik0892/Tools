export default {
  id: "aes-crypto",
  name: "AES Symmetric Encryptor & Decryptor",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Text Input & Operation</h3>
            <div style="display: flex; gap: 8px;">
              <button class="tool-btn secondary active" id="crypto-tab-encrypt" style="padding: 4px 10px; font-size: 11px;">Encrypt Mode</button>
              <button class="tool-btn secondary" id="crypto-tab-decrypt" style="padding: 4px 10px; font-size: 11px;">Decrypt Mode</button>
            </div>
          </div>
          
          <!-- Input Text Area -->
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label id="crypto-input-label">Plain Text to Encrypt</label>
              <div style="display: flex; gap: 6px;">
                <button class="tool-btn secondary" id="crypto-clear-input-btn" style="font-size: 10px; padding: 4px 8px;">Clear</button>
                <button class="tool-btn secondary" id="crypto-paste-input-btn" style="font-size: 10px; padding: 4px 8px;">Paste</button>
              </div>
            </div>
            <textarea id="crypto-input-text" class="form-textarea" placeholder="Type or paste the secret message you want to encrypt..." style="height: 240px; font-family: monospace; resize: vertical;"></textarea>
          </div>

          <!-- Quick Guide Information -->
          <div class="form-group" style="margin-top: 12px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-muted);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="color: #f59e0b;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span><strong>100% Secure Client-Side encryption:</strong> No data is ever sent to a server. All operations happen inside your browser memory.</span>
            </div>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Key Settings & Actions</h3>
          </div>

          <!-- Password Passphrase Area -->
          <div class="form-group">
            <label>Secret Passphrase / Key</label>
            <div style="position: relative; display: flex; align-items: center; margin-top: 6px;">
              <input type="password" id="crypto-passphrase" class="form-input" placeholder="Enter key / password..." style="padding-right: 40px; font-family: monospace;">
              <button id="crypto-toggle-password-btn" style="position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; padding: 4px;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" id="password-eye-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
            
            <!-- Passphrase Strength Meter -->
            <div id="password-strength-container" style="margin-top: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Key Strength:</span>
                <span id="password-strength-label" style="font-size: 11px; font-weight: 700; color: #ef4444;">Empty</span>
              </div>
              <div style="height: 4px; background: var(--border-color); border-radius: 2px; overflow: hidden; display: flex;">
                <div id="password-strength-bar" style="width: 0%; height: 100%; background-color: #ef4444; transition: all 0.3s ease;"></div>
              </div>
            </div>
          </div>

          <!-- PBKDF2 Iteration Counts -->
          <div class="form-group">
            <label>PBKDF2 Iterations (Key Derivation)</label>
            <div class="slider-group" style="margin-top: 6px;">
              <input type="range" id="crypto-iterations" class="slider-input" min="10000" max="200000" step="10000" value="100000">
              <span class="slider-val" id="crypto-iterations-val">100,000</span>
            </div>
            <span style="font-size: 10px; color: var(--text-muted); display: block; margin-top: 4px;">Higher iterations slow down brute-force attacks significantly.</span>
          </div>

          <!-- Action Button Trigger -->
          <div style="margin-top: 16px;">
            <button class="tool-btn primary" id="crypto-execute-btn" style="width: 100%; justify-content: center; height: 42px; font-size: 14px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border: none; box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span id="crypto-execute-btn-label">Encrypt Text</span>
            </button>
          </div>

          <!-- Output Box Area -->
          <div class="form-group" style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label id="crypto-output-label">Encrypted Output (Base64)</label>
              <div style="display: flex; gap: 6px;">
                <button class="tool-btn secondary" id="crypto-copy-output-btn" style="font-size: 10px; padding: 4px 8px;">Copy</button>
                <button class="tool-btn secondary" id="crypto-download-output-btn" style="font-size: 10px; padding: 4px 8px;">Download</button>
              </div>
            </div>
            <textarea id="crypto-output-text" class="form-textarea" readonly placeholder="Output string will appear here..." style="height: 140px; font-family: monospace; resize: none; background: rgba(0,0,0,0.2);"></textarea>
          </div>
        </div>

        <!-- Dynamic Instructions Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>AES Cryptography Guide</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Choose Mode</strong>: Use **Encrypt Mode** to turn plain text into safe Base64 code, or **Decrypt Mode** to unlock Base64 back to text.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Enter Key</strong>: Provide a secret passphrase. The strength meter displays the keys complexity. Remember this key—decryption is impossible without it.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Output Safe Storage</strong>: Copy the Base64 output or download it as a secure file. It contains the encrypted ciphertext, a random Salt, and a random IV.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
    let mode = "encrypt"; // "encrypt" or "decrypt"
    let passwordVisible = false;

    // DOM Elements
    const tabEncrypt = container.querySelector("#crypto-tab-encrypt");
    const tabDecrypt = container.querySelector("#crypto-tab-decrypt");
    const labelInput = container.querySelector("#crypto-input-label");
    const labelOutput = container.querySelector("#crypto-output-label");
    const inputText = container.querySelector("#crypto-input-text");
    const outputText = container.querySelector("#crypto-output-text");
    const passphrase = container.querySelector("#crypto-passphrase");
    const togglePasswordBtn = container.querySelector("#crypto-toggle-password-btn");
    const eyeIcon = container.querySelector("#password-eye-icon");
    const strengthBar = container.querySelector("#password-strength-bar");
    const strengthLabel = container.querySelector("#password-strength-label");
    const iterationsSlider = container.querySelector("#crypto-iterations");
    const iterationsVal = container.querySelector("#crypto-iterations-val");
    const executeBtn = container.querySelector("#crypto-execute-btn");
    const executeBtnLabel = container.querySelector("#crypto-execute-btn-label");
    
    const clearInputBtn = container.querySelector("#crypto-clear-input-btn");
    const pasteInputBtn = container.querySelector("#crypto-paste-input-btn");
    const copyOutputBtn = container.querySelector("#crypto-copy-output-btn");
    const downloadOutputBtn = container.querySelector("#crypto-download-output-btn");

    // Toggle Modes (Encrypt / Decrypt)
    const switchMode = (newMode) => {
      mode = newMode;
      if (mode === "encrypt") {
        tabEncrypt.classList.add("active");
        tabDecrypt.classList.remove("active");
        labelInput.innerText = "Plain Text to Encrypt";
        labelOutput.innerText = "Encrypted Output (Base64)";
        inputText.placeholder = "Type or paste the secret message you want to encrypt...";
        executeBtnLabel.innerText = "Encrypt Text";
        executeBtn.style.background = "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
        executeBtn.style.boxShadow = "0 0 15px rgba(245, 158, 11, 0.3)";
      } else {
        tabDecrypt.classList.add("active");
        tabEncrypt.classList.remove("active");
        labelInput.innerText = "Encrypted Ciphertext (Base64)";
        labelOutput.innerText = "Decrypted Plain Text";
        inputText.placeholder = "Paste the Base64 encrypted code that you want to decrypt...";
        executeBtnLabel.innerText = "Decrypt Text";
        executeBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
        executeBtn.style.boxShadow = "0 0 15px rgba(16, 185, 129, 0.3)";
      }
      outputText.value = "";
    };

    tabEncrypt.addEventListener("click", () => switchMode("encrypt"));
    tabDecrypt.addEventListener("click", () => switchMode("decrypt"));

    // Iterations count display
    iterationsSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value);
      iterationsVal.innerText = val.toLocaleString();
    });

    // Passphrase Visibility Toggle
    togglePasswordBtn.addEventListener("click", () => {
      passwordVisible = !passwordVisible;
      if (passwordVisible) {
        passphrase.type = "text";
        eyeIcon.innerHTML = `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
      } else {
        passphrase.type = "password";
        eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
      }
    });

    // Password Strength Evaluator
    passphrase.addEventListener("input", (e) => {
      const password = e.target.value;
      if (!password) {
        strengthBar.style.width = "0%";
        strengthBar.style.backgroundColor = "#ef4444";
        strengthLabel.innerText = "Empty";
        strengthLabel.style.color = "#ef4444";
        return;
      }

      let score = 0;
      if (password.length >= 8) score++;
      if (password.length >= 14) score++;
      if (/[A-Z]/.test(password)) score++;
      if (/[0-9]/.test(password)) score++;
      if (/[^A-Za-z0-9]/.test(password)) score++;

      // Convert score (max 5) to percentage and labels
      let width = 20 + score * 16; // 20% to 100%
      let label = "Weak";
      let color = "#ef4444"; // Red

      if (score >= 4) {
        label = "Cyber Secure";
        color = "#10b981"; // Neon Green
      } else if (score >= 3) {
        label = "Strong";
        color = "#34d399"; // Greenish
      } else if (score >= 2) {
        label = "Medium";
        color = "#f59e0b"; // Orange/Yellow
      }

      strengthBar.style.width = `${width}%`;
      strengthBar.style.backgroundColor = color;
      strengthLabel.innerText = label;
      strengthLabel.style.color = color;
    });

    // Clipboard & Inputs
    clearInputBtn.addEventListener("click", () => {
      inputText.value = "";
      outputText.value = "";
    });

    pasteInputBtn.addEventListener("click", async () => {
      try {
        const text = await navigator.clipboard.readText();
        inputText.value = text;
      } catch (err) {
        appInstance.showToast("Clipboard access denied!", "error");
      }
    });

    copyOutputBtn.addEventListener("click", () => {
      if (!outputText.value) {
        appInstance.showToast("Nothing to copy!", "warning");
        return;
      }
      appInstance.copyText(outputText.value);
    });

    // File Download Handler
    downloadOutputBtn.addEventListener("click", () => {
      const content = outputText.value;
      if (!content) {
        appInstance.showToast("Nothing to download!", "warning");
        return;
      }
      const filename = mode === "encrypt" ? "encrypted_message.enc" : "decrypted_message.txt";
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

    // --- Web Crypto Core Functions ---

    // Convert string to array buffer
    const textToBuffer = (str) => new TextEncoder().encode(str);
    // Convert array buffer to string
    const bufferToText = (buf) => new TextDecoder().decode(buf);

    // Convert Buffer to Base64
    const bufferToBase64 = (buf) => {
      const binstr = Array.from(new Uint8Array(buf))
        .map(b => String.fromCharCode(b))
        .join("");
      return btoa(binstr);
    };

    // Convert Base64 to Buffer
    const base64ToBuffer = (b64) => {
      const binstr = atob(b64);
      const buf = new Uint8Array(binstr.length);
      for (let i = 0; i < binstr.length; i++) {
        buf[i] = binstr.charCodeAt(i);
      }
      return buf;
    };

    // Derive symmetric key using PBKDF2
    const deriveKey = async (passphraseStr, saltBuffer, iterationsCount) => {
      const passwordBytes = textToBuffer(passphraseStr);
      const baseKey = await window.crypto.subtle.importKey(
        "raw",
        passwordBytes,
        "PBKDF2",
        false,
        ["deriveBits", "deriveKey"]
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

    // Core execution handler
    executeBtn.addEventListener("click", async () => {
      const input = inputText.value.trim();
      const key = passphrase.value;
      const iterations = parseInt(iterationsSlider.value);

      if (!input) {
        appInstance.showToast(`Please enter some ${mode === 'encrypt' ? 'plain text' : 'ciphertext'}!`, "warning");
        return;
      }
      if (!key) {
        appInstance.showToast("Please enter a secret key / passphrase!", "warning");
        return;
      }

      executeBtn.disabled = true;
      executeBtn.style.opacity = "0.7";

      try {
        if (mode === "encrypt") {
          // 1. Generate random Salt (16 bytes) and IV (12 bytes)
          const salt = window.crypto.getRandomValues(new Uint8Array(16));
          const iv = window.crypto.getRandomValues(new Uint8Array(12));

          // 2. Derive key
          const aesKey = await deriveKey(key, salt, iterations);

          // 3. Encrypt data
          const plainBytes = textToBuffer(input);
          const ciphertextBuffer = await window.crypto.subtle.encrypt(
            {
              name: "AES-GCM",
              iv: iv,
              tagLength: 128
            },
            aesKey,
            plainBytes
          );

          const ciphertextBytes = new Uint8Array(ciphertextBuffer);

          // 4. Bundle: Salt (16) + IV (12) + Ciphertext (var)
          const combined = new Uint8Array(16 + 12 + ciphertextBytes.length);
          combined.set(salt, 0);
          combined.set(iv, 16);
          combined.set(ciphertextBytes, 28);

          // 5. Convert to Base64 output
          const finalBase64 = bufferToBase64(combined);
          outputText.value = finalBase64;
          appInstance.showToast("Text Encrypted Successfully!", "success");
        } else {
          // Decryption
          // 1. Convert Base64 payload to bytes
          let combined;
          try {
            combined = base64ToBuffer(input);
          } catch (e) {
            throw new Error("Invalid Base64 format! Make sure this is a valid ciphertext payload.");
          }

          if (combined.length < 28) {
            throw new Error("Ciphertext too short. Invalid encryption payload structure.");
          }

          // 2. Extract Salt, IV, and Ciphertext
          const salt = combined.slice(0, 16);
          const iv = combined.slice(16, 28);
          const ciphertextBytes = combined.slice(28);

          // 3. Derive key
          const aesKey = await deriveKey(key, salt, iterations);

          // 4. Decrypt
          const decryptedBuffer = await window.crypto.subtle.decrypt(
            {
              name: "AES-GCM",
              iv: iv,
              tagLength: 128
            },
            aesKey,
            ciphertextBytes
          );

          const plainText = bufferToText(decryptedBuffer);
          outputText.value = plainText;
          appInstance.showToast("Ciphertext Decrypted Successfully!", "success");
        }
      } catch (err) {
        console.error("Cryptographic operation failed:", err);
        const errMsg = err.name === "OperationError" 
          ? "Decryption failed! Wrong password or corrupted payload."
          : err.message || "Decryption failed!";
        appInstance.showToast(errMsg, "error");
        outputText.value = "";
      } finally {
        executeBtn.disabled = false;
        executeBtn.style.opacity = "1";
      }
    });
  }
};
