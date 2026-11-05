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
            <div class="crypto-header-tabs" id="crypto-tabs">
              <button class="keyboard-tab active" data-tab="hash" style="font-size: 11px; padding: 4px 8px;">Hashes</button>
              <button class="keyboard-tab" data-tab="aes" style="font-size: 11px; padding: 4px 8px;">AES Cipher</button>
              <button class="keyboard-tab" data-tab="rsa" style="font-size: 11px; padding: 4px 8px;">Asymmetric Keys</button>
            </div>
          </div>

          <!-- Tab 1: Hashing Panel -->
          <div id="panel-hash-controls" class="tab-control-panel">
            <div class="form-group">
              <label for="hash-input">Plain Text Input</label>
              <textarea class="input-textarea" id="hash-input" placeholder="Type or paste text to generate cryptographic hashes instantly..." style="height: 120px; resize: vertical;" aria-label="Hash Text Input"></textarea>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <button class="tool-btn secondary" id="hash-clear-btn" style="margin-top: 10px;">Clear Input</button>
            </div>

            <!-- Chunk File Hashing Section -->
            <div style="margin-top: 20px; border-top: 1px dashed var(--border-color); padding-top: 15px;">
              <label style="font-size: 12px; font-weight: bold; color: var(--text-color);">Massive File Hashing (Web Worker)</label>
              <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;">Supports hashing massive local files (e.g. 1GB+) in chunks without freezing the page.</p>
              
              <div id="file-hash-dropzone" style="border: 2px dashed rgba(255, 255, 255, 0.15); border-radius: 8px; padding: 20px; text-align: center; cursor: pointer; transition: background 0.2s;">
                <span style="font-size: 12px; color: var(--accent-cyan);">📁 Select or Drag File Here</span>
                <input type="file" id="file-hash-input" style="display: none;">
              </div>

              <div id="file-hash-progress-container" style="display: none; margin-top: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                  <span id="file-hash-name" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 70%; color: var(--text-muted); font-family: monospace;">-</span>
                  <span id="file-hash-pct" style="font-weight: 700; color: var(--accent-cyan);">0%</span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.05); border-radius: 3px; overflow: hidden;">
                  <div id="file-hash-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #00f2fe, #9d4edd); transition: width 0.1s;"></div>
                </div>
                <button class="tool-btn secondary" id="file-hash-cancel-btn" style="padding: 2px 8px; font-size: 10px; height: auto; margin-top: 8px; border-color: rgba(239,68,68,0.2); color: var(--accent-rose);">Cancel Hashing</button>
              </div>
            </div>
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
            <form id="aes-passphrase-form" onsubmit="event.preventDefault();" class="form-group">
              <input type="text" name="username" autocomplete="username" style="display: none;">
              <label for="aes-passphrase">Secret Passphrase / Key</label>
              <div style="position: relative; display: flex; align-items: center;">
                <input type="password" id="aes-passphrase" class="form-input" placeholder="Enter key / password..." style="padding-right: 40px; font-family: monospace; width: 100%;" autocomplete="new-password">
                <button id="aes-toggle-password-btn" type="button" style="position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: var(--text-muted); display: flex; align-items: center; padding: 4px;">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" id="aes-password-eye-icon"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
              </div>
            </form>
            <div id="aes-strength-container" style="margin-top: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                  <span style="font-size: 10px; color: var(--text-muted);">Key Strength:</span>
                  <span id="aes-strength-label" style="font-size: 10px; font-weight: 700; color: #ef4444;">Empty</span>
                </div>
                <div style="height: 4px; background: var(--border-color); border-radius: 2px; overflow: hidden; display: flex;">
                  <div id="aes-strength-bar" style="width: 0%; height: 100%; background-color: #ef4444; transition: all 0.3s ease;"></div>
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

          <!-- Tab 3: RSA & ECC Controls -->
          <div id="panel-rsa-controls" class="tab-control-panel hidden">
            <div class="form-group">
              <label for="asym-key-type">Key Architecture</label>
              <select class="form-select" id="asym-key-type" style="width: 100%;">
                <option value="rsa-pss" selected>RSA-PSS (Digital Signatures)</option>
                <option value="ecdsa">ECDSA (Elliptic Curve Cryptography)</option>
              </select>
            </div>

            <!-- RSA Configuration Group -->
            <div id="asym-rsa-config-group" class="form-group">
              <label for="rsa-bit-size">RSA Key Bit Size</label>
              <select class="form-select" id="rsa-bit-size" style="width: 100%;">
                <option value="1024">1024-bit (Fast)</option>
                <option value="2048" selected>2048-bit (Recommended Standard)</option>
                <option value="4096">4096-bit (Ultra-Secure, Slow)</option>
              </select>
            </div>

            <!-- ECC Configuration Group -->
            <div id="asym-ecc-config-group" class="form-group" style="display: none;">
              <label for="ecc-curve-select">ECDSA Elliptic Curve</label>
              <select class="form-select" id="ecc-curve-select" style="width: 100%;">
                <option value="P-256" selected>P-256 (Standard Curve)</option>
                <option value="P-384">P-384 (Stronger Curve)</option>
                <option value="P-521">P-521 (Ultra Curve)</option>
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
                <span id="rsa-status-text">Generating Keys...</span>
              </div>
            </div>

            <!-- Digital Signing and Verification Panel -->
            <div id="asym-sign-panel" style="display: none; border-top: 1px dashed var(--border-color); padding-top: 15px; margin-top: 15px;">
              <label style="font-size: 12px; font-weight: bold; color: var(--accent-cyan);">Message Digital Signatures</label>
              
              <!-- Tab controls inside Sign/Verify -->
              <div style="display: flex; gap: 6px; margin-top: 6px; margin-bottom: 10px;">
                <button class="tool-btn secondary active" id="asym-sign-tab-btn" style="flex: 1; font-size: 10px; padding: 4px;">Sign Message</button>
                <button class="tool-btn secondary" id="asym-verify-tab-btn" style="flex: 1; font-size: 10px; padding: 4px;">Verify Signature</button>
              </div>

              <!-- Sign Message Option -->
              <div id="asym-sign-subpanel" class="form-group">
                <label for="asym-sign-input">Message to Sign</label>
                <textarea class="form-input" id="asym-sign-input" placeholder="Enter message payload to sign with your private key..." style="height: 60px; font-size: 11px; resize: vertical; width: 100%; box-sizing: border-box;"></textarea>
                <button class="tool-btn primary" id="asym-sign-execute-btn" style="width: 100%; justify-content: center; margin-top: 8px; height: 34px;">Create Signature</button>
              </div>

              <!-- Verify Signature Option -->
              <div id="asym-verify-subpanel" class="form-group" style="display: none;">
                <label for="asym-verify-input">Message to Verify</label>
                <textarea class="form-input" id="asym-verify-input" placeholder="Message content..." style="height: 50px; font-size: 11px; resize: vertical; width: 100%; box-sizing: border-box;"></textarea>
                <label for="asym-verify-sig-input" style="margin-top: 6px;">Signature (Base64)</label>
                <textarea class="form-input" id="asym-verify-sig-input" placeholder="Paste signature to verify..." style="height: 50px; font-size: 11px; font-family: monospace; resize: vertical; width: 100%; box-sizing: border-box;"></textarea>
                <button class="tool-btn primary" id="asym-verify-execute-btn" style="width: 100%; justify-content: center; margin-top: 8px; height: 34px;">Verify Signature</button>
                <div id="asym-verify-result" style="display: none; padding: 8px; border-radius: 6px; font-size: 12px; margin-top: 8px; text-align: center; font-weight: bold;"></div>
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

          <!-- RSA & ECC Asymmetric Output -->
          <div id="output-rsa-container" class="hidden" style="width: 100%; display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label id="asym-pub-label">Public Key (SPKI Format)</label>
                <button class="tool-btn secondary" id="rsa-download-pub-btn" style="font-size: 10px; padding: 4px 8px;" disabled>Download Public</button>
              </div>
              <textarea class="input-textarea" id="rsa-pub-output" readonly placeholder="Public key output..." style="font-family: var(--font-mono); font-size: 10px; height: 80px;" aria-label="Asymmetric Public Key Output"></textarea>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 6px;" id="asym-priv-container-box">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label id="asym-priv-label">Private Key (PKCS#8 Format)</label>
                <button class="tool-btn secondary" id="rsa-download-priv-btn" style="font-size: 10px; padding: 4px 8px;" disabled>Download Private</button>
              </div>
              <textarea class="input-textarea" id="rsa-priv-output" readonly placeholder="Private key output..." style="font-family: var(--font-mono); font-size: 10px; height: 80px;" aria-label="Asymmetric Private Key Output"></textarea>
            </div>

            <!-- Signature output -->
            <div style="display: flex; flex-direction: column; gap: 6px; border-top: 1px dashed var(--border-color); padding-top: 10px;" id="asym-sig-output-box">
              <label>Generated Digital Signature (Base64)</label>
              <textarea class="input-textarea" id="asym-sig-output" readonly placeholder="Signature will appear here after signing..." style="font-family: var(--font-mono); font-size: 10px; height: 60px;" aria-label="Signature Output"></textarea>
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
    
    // File Hashing Elements
    const fileHashInput = container.querySelector("#file-hash-input");
    const fileHashDropzone = container.querySelector("#file-hash-dropzone");
    const fileHashProgressContainer = container.querySelector("#file-hash-progress-container");
    const fileHashName = container.querySelector("#file-hash-name");
    const fileHashPct = container.querySelector("#file-hash-pct");
    const fileHashProgressBar = container.querySelector("#file-hash-progress-bar");
    const fileHashCancelBtn = container.querySelector("#file-hash-cancel-btn");

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

    // 3. Asymmetric Keys Elements
    const asymKeyType = container.querySelector("#asym-key-type");
    const asymRsaConfig = container.querySelector("#asym-rsa-config-group");
    const asymEccConfig = container.querySelector("#asym-ecc-config-group");
    const eccCurveSelect = container.querySelector("#ecc-curve-select");
    const rsaBitSize = container.querySelector("#rsa-bit-size");
    const rsaHash = container.querySelector("#rsa-hash");
    const rsaGenerateBtn = container.querySelector("#rsa-generate-btn");
    const rsaDemoBtn = container.querySelector("#rsa-demo-btn");
    const rsaStatus = container.querySelector("#rsa-status");
    const rsaStatusText = container.querySelector("#rsa-status-text");
    const rsaPubOutput = container.querySelector("#rsa-pub-output");
    const rsaPrivOutput = container.querySelector("#rsa-priv-output");
    const rsaDownloadPub = container.querySelector("#rsa-download-pub-btn");
    const rsaDownloadPriv = container.querySelector("#rsa-download-priv-btn");

    // Signing elements
    const asymSignPanel = container.querySelector("#asym-sign-panel");
    const asymSignTabBtn = container.querySelector("#asym-sign-tab-btn");
    const asymVerifyTabBtn = container.querySelector("#asym-verify-tab-btn");
    const asymSignSubpanel = container.querySelector("#asym-sign-subpanel");
    const asymVerifySubpanel = container.querySelector("#asym-verify-subpanel");
    
    const asymSignInput = container.querySelector("#asym-sign-input");
    const asymSignExecuteBtn = container.querySelector("#asym-sign-execute-btn");
    const asymVerifyInput = container.querySelector("#asym-verify-input");
    const asymVerifySigInput = container.querySelector("#asym-verify-sig-input");
    const asymVerifyExecuteBtn = container.querySelector("#asym-verify-execute-btn");
    const asymVerifyResult = container.querySelector("#asym-verify-result");
    const asymSigOutput = container.querySelector("#asym-sig-output");

    let activeTab = "hash";
    let aesMode = "encrypt";
    let aesPasswordVisible = false;
    let rsaPublicKeyPem = "";
    let rsaPrivateKeyPem = "";

    // Active Cryptokeys for direct session sign/verify
    let generatedPrivateKey = null;
    let generatedPublicKey = null;
    let generatedKeyArch = "rsa-pss"; // rsa-pss or ecdsa

    const guides = {
      hash: {
        title: "Quick Guide: Cryptographic Hashes",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Text Hashing</strong>: Enter plain text in the input box to instantly view MD5, SHA-1, SHA-256, and SHA-512 hashes.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Chunk File Hashing</strong>: Select a local file of any size (up to 1GB+). The worker reads it in 2MB slices to prevent thread freezing.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Review Result</strong>: Once done, the computed SHA-256 hash is outputted to the results panel for copying.</div>
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
        title: "Quick Guide: Asymmetric Keys & Signatures",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Configure Architecture</strong>: Choose RSA-PSS or ECDSA key types, curves (P-256/384/521) or bit sizes, and hash algorithm.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Generate pair</strong>: Generate public (SPKI) and private (PKCS#8) PEM keys directly inside the browser.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Sign & Verify</strong>: Type message payloads, click Sign to create signature, or paste them back to verify validity.</div>
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
        guideTitle.innerText = guides[tabId === "rsa" ? "rsa" : tabId].title;
        guideSteps.innerHTML = guides[tabId === "rsa" ? "rsa" : tabId].steps;
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        switchTab(tab.dataset.tab);
      });
    });

    // ==========================================
    // INLINE WEB WORKER (SHA-256 STREAM HASHING)
    // ==========================================
    const sha256WorkerCode = `
      const K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
      ];

      function rotr(n, x) { return (x >>> n) | (x << (32 - n)); }

      let h0 = 0x6a09e667, h1 = 0xbb67ae85, h2 = 0x3c6ef372, h3 = 0xa54ff53a;
      let h4 = 0x5be0cd19, h5 = 0x510e527f, h6 = 0x9b05688c, h7 = 0x1f83d9ab;

      let totalBytes = 0;
      let leftover = new Uint8Array(0);

      function processBlocks(data) {
        let combined = new Uint8Array(leftover.length + data.length);
        combined.set(leftover);
        combined.set(data, leftover.length);

        let offset = 0;
        let len = combined.length;
        const w = new Uint32Array(64);

        while (len - offset >= 64) {
          for (let i = 0; i < 16; i++) {
            const idx = offset + i * 4;
            w[i] = (combined[idx] << 24) | (combined[idx+1] << 16) | (combined[idx+2] << 8) | combined[idx+3];
          }

          for (let i = 16; i < 64; i++) {
            const s0 = rotr(7, w[i-15]) ^ rotr(18, w[i-15]) ^ (w[i-15] >>> 3);
            const s1 = rotr(17, w[i-2]) ^ rotr(19, w[i-2]) ^ (w[i-2] >>> 10);
            w[i] = (w[i-16] + s0 + w[i-7] + s1) | 0;
          }

          let a = h0, b = h1, c = h2, d = h3, e = h4, f = h5, g = h6, h = h7;

          for (let i = 0; i < 64; i++) {
            const S1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
            const ch = (e & f) ^ (~e & g);
            const temp1 = (h + S1 + ch + K[i] + w[i]) | 0;
            const S0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
            const maj = (a & b) ^ (a & c) ^ (b & c);
            const temp2 = (S0 + maj) | 0;

            h = g;
            g = f;
            f = e;
            e = (d + temp1) | 0;
            d = c;
            c = b;
            b = a;
            a = (temp1 + temp2) | 0;
          }

          h0 = (h0 + a) | 0;
          h1 = (h1 + b) | 0;
          h2 = (h2 + c) | 0;
          h3 = (h3 + d) | 0;
          h4 = (h4 + e) | 0;
          h5 = (h5 + f) | 0;
          h6 = (h6 + g) | 0;
          h7 = (h7 + h) | 0;

          offset += 64;
        }

        totalBytes += offset;
        leftover = combined.slice(offset);
      }

      function finalize() {
        let currentLength = leftover.length;
        let totalLengthBits = (totalBytes + currentLength) * 8;

        let padLength = (currentLength % 64 < 56) ? (64 - (currentLength % 64)) : (128 - (currentLength % 64));
        let pad = new Uint8Array(padLength);
        pad[0] = 0x80;

        let combined = new Uint8Array(currentLength + padLength);
        combined.set(leftover);
        combined.set(pad, currentLength);

        let view = new DataView(combined.buffer);
        let high = Math.floor(totalLengthBits / 0x100000000);
        let low = totalLengthBits % 0x100000000;
        view.setUint32(combined.length - 8, high);
        view.setUint32(combined.length - 4, low);

        leftover = combined;
        processBlocks(new Uint8Array(0));

        function hex(n) {
          return (n >>> 0).toString(16).padStart(8, "0");
        }
        return hex(h0) + hex(h1) + hex(h2) + hex(h3) + hex(h4) + hex(h5) + hex(h6) + hex(h7);
      }

      self.onmessage = function(e) {
        if (e.data.chunk) {
          processBlocks(new Uint8Array(e.data.chunk));
          self.postMessage({ status: "progress" });
        } else if (e.data.finalize) {
          const result = finalize();
          self.postMessage({ status: "done", hash: result });
        } else if (e.data.reset) {
          h0 = 0x6a09e667; h1 = 0xbb67ae85; h2 = 0x3c6ef372; h3 = 0xa54ff53a;
          h4 = 0x5be0cd19; h5 = 0x510e527f; h6 = 0x9b05688c; h7 = 0x1f83d9ab;
          totalBytes = 0;
          leftover = new Uint8Array(0);
        }
      };
    `;

    const workerBlob = new Blob([sha256WorkerCode], { type: "application/javascript" });
    const workerUrl = URL.createObjectURL(workerBlob);
    let hashWorker = null;

    // --- Hashing logic ---
    const runHasher = async () => {
      if (activeTab !== "hash") return;
      const val = hashInput.value;
      if (!val) {
        hashMd5.value = "";
        hashSha1.value = "";
        hashSha256.value = "";
        hashSha512.value = "";
        return;
      }

      hashMd5.value = md5(val);

      // Web Crypto API for SHA hashes
      const encoder = new TextEncoder();
      const buffer = encoder.encode(val);

      try {
        const sha1Buf = await window.crypto.subtle.digest("SHA-1", buffer);
        hashSha1.value = arrayBufferToHex(sha1Buf);

        const sha256Buf = await window.crypto.subtle.digest("SHA-256", buffer);
        hashSha256.value = arrayBufferToHex(sha256Buf);

        const sha512Buf = await window.crypto.subtle.digest("SHA-512", buffer);
        hashSha512.value = arrayBufferToHex(sha512Buf);
      } catch (err) {
        console.error(err);
      }
    };

    const arrayBufferToHex = (buffer) => {
      return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
    };

    hashInput.addEventListener("input", runHasher);
    container.querySelector("#hash-clear-btn").addEventListener("click", () => {
      hashInput.value = "";
      runHasher();
    });

    // File Dropzone and Hashing Handler
    fileHashDropzone.addEventListener("click", () => fileHashInput.click());
    fileHashDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      fileHashDropzone.style.background = "rgba(0, 242, 254, 0.05)";
      fileHashDropzone.style.borderColor = "var(--accent-cyan)";
    });
    fileHashDropzone.addEventListener("dragleave", () => {
      fileHashDropzone.style.background = "transparent";
      fileHashDropzone.style.borderColor = "rgba(255,255,255,0.15)";
    });
    fileHashDropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      fileHashDropzone.style.background = "transparent";
      fileHashDropzone.style.borderColor = "rgba(255,255,255,0.15)";
      if (e.dataTransfer.files.length > 0) {
        startFileHashing(e.dataTransfer.files[0]);
      }
    });

    fileHashInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        startFileHashing(e.target.files[0]);
      }
    });

    const startFileHashing = (file) => {
      if (hashWorker) {
        hashWorker.terminate();
      }

      fileHashName.innerText = file.name;
      fileHashPct.innerText = "0%";
      fileHashProgressBar.style.width = "0%";
      fileHashProgressContainer.style.display = "block";
      fileHashDropzone.style.display = "none";

      hashWorker = new Worker(workerUrl);
      hashWorker.postMessage({ reset: true });

      const CHUNK_SIZE = 2 * 1024 * 1024; // 2MB chunk slices
      let offset = 0;
      const reader = new FileReader();

      const readNextChunk = () => {
        if (offset >= file.size) {
          hashWorker.postMessage({ finalize: true });
          return;
        }
        const slice = file.slice(offset, offset + CHUNK_SIZE);
        reader.readAsArrayBuffer(slice);
      };

      reader.onload = (e) => {
        const chunkBuf = e.target.result;
        hashWorker.postMessage({ chunk: chunkBuf }, [chunkBuf]); // transfer buffer ownership
        offset += CHUNK_SIZE;
      };

      hashWorker.onmessage = (e) => {
        if (e.data.status === "progress") {
          const pct = Math.min(Math.round((offset / file.size) * 100), 100);
          fileHashPct.innerText = `${pct}%`;
          fileHashProgressBar.style.width = `${pct}%`;
          readNextChunk();
        } else if (e.data.status === "done") {
          hashSha256.value = e.data.hash;
          fileHashPct.innerText = "100% (Finished)";
          fileHashProgressBar.style.width = "100%";
          appInstance.showToast("File SHA-256 computed successfully!", "success");
          hashWorker.terminate();
          hashWorker = null;
        }
      };

      fileHashCancelBtn.onclick = () => {
        if (hashWorker) {
          hashWorker.terminate();
          hashWorker = null;
        }
        fileHashProgressContainer.style.display = "none";
        fileHashDropzone.style.display = "block";
        appInstance.showToast("File hashing cancelled", "warning");
      };

      readNextChunk();
    };

    // ==========================================
    // AES SYMMETRIC ENCRYPTION/DECRYPTION
    // ==========================================
    const deriveKey = async (passphrase, salt, iterations) => {
      const encoder = new TextEncoder();
      const baseKey = await window.crypto.subtle.importKey(
        "raw",
        encoder.encode(passphrase),
        "PBKDF2",
        false,
        ["deriveKey"]
      );
      return window.crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: iterations,
          hash: "SHA-256"
        },
        baseKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );
    };

    const textToBuffer = (text) => new TextEncoder().encode(text);
    const bufferToText = (buffer) => new TextDecoder().decode(buffer);

    const getStrength = (pass) => {
      if (!pass) return { label: "Empty", val: 0, color: "#ef4444" };
      let score = 0;
      if (pass.length >= 8) score += 20;
      if (pass.length >= 12) score += 20;
      if (/[A-Z]/.test(pass)) score += 20;
      if (/[0-9]/.test(pass)) score += 20;
      if (/[^A-Za-z0-9]/.test(pass)) score += 20;

      if (score <= 40) return { label: "Weak / Vulnerable", val: score, color: "#ef4444" };
      if (score <= 80) return { label: "Medium Security", val: score, color: "#f59e0b" };
      return { label: "Strong / Secure Key", val: score, color: "#10b981" };
    };

    aesPassphrase?.addEventListener("input", (e) => {
      const strength = getStrength(e.target.value);
      aesStrengthLabel.innerText = strength.label;
      aesStrengthLabel.style.color = strength.color;
      aesStrengthBar.style.width = `${strength.val}%`;
      aesStrengthBar.style.backgroundColor = strength.color;
    });

    aesTogglePasswordBtn?.addEventListener("click", () => {
      aesPasswordVisible = !aesPasswordVisible;
      aesPassphrase.type = aesPasswordVisible ? "text" : "password";
      aesEyeIcon.innerHTML = aesPasswordVisible 
        ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`
        : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
    });

    aesIterations?.addEventListener("input", (e) => {
      aesIterationsVal.innerText = parseInt(e.target.value, 10).toLocaleString();
    });

    const setAesMode = (mode) => {
      aesMode = mode;
      aesModeEncrypt.classList.toggle("active", mode === "encrypt");
      aesModeDecrypt.classList.toggle("active", mode === "decrypt");
      aesInputLabel.innerText = mode === "encrypt" ? "Plain Text to Encrypt" : "Encrypted Ciphertext (Base64)";
      aesOutputLabel.innerText = mode === "encrypt" ? "Encrypted Output (Base64)" : "Decrypted Plain Text Output";
      aesExecuteBtn.innerText = mode === "encrypt" ? "Encrypt Text" : "Decrypt Text";
      aesInputText.value = "";
      aesOutputText.value = "";
    };

    aesModeEncrypt?.addEventListener("click", () => setAesMode("encrypt"));
    aesModeDecrypt?.addEventListener("click", () => setAesMode("decrypt"));

    aesExecuteBtn?.addEventListener("click", async () => {
      const text = aesInputText.value.trim();
      const key = aesPassphrase.value;
      const iterations = parseInt(aesIterations.value, 10);

      if (!text || !key) {
        appInstance.showToast("Please fill in text inputs & passwords first!", "warning");
        return;
      }

      aesExecuteBtn.disabled = true;
      aesExecuteBtn.style.opacity = "0.7";

      try {
        if (aesMode === "encrypt") {
          const salt = window.crypto.getRandomValues(new Uint8Array(16));
          const iv = window.crypto.getRandomValues(new Uint8Array(12));

          const aesKey = await deriveKey(key, salt, iterations);
          const encryptedBuffer = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv, tagLength: 128 },
            aesKey,
            textToBuffer(text)
          );

          const combined = new Uint8Array(16 + 12 + encryptedBuffer.byteLength);
          combined.set(salt, 0);
          combined.set(iv, 16);
          combined.set(new Uint8Array(encryptedBuffer), 28);

          aesOutputText.value = arrayBufferToBase64(combined.buffer);
          appInstance.showToast("Encrypted Successfully!", "success");
        } else {
          const combined = new Uint8Array(
            window.atob(text).split("").map(c => c.charCodeAt(0))
          );

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

    // ==========================================
    // ASYMMETRIC KEYS (RSA-PSS & ECDSA) & SIGNATURES
    // ==========================================
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

    // Toggle RSA vs ECC configurations
    asymKeyType?.addEventListener("change", (e) => {
      const val = e.target.value;
      generatedKeyArch = val;
      asymRsaConfig.style.display = val === "rsa-pss" ? "block" : "none";
      asymEccConfig.style.display = val === "ecdsa" ? "block" : "none";
      
      // Hide sign panel until key generated
      asymSignPanel.style.display = "none";
      rsaPubOutput.value = "";
      rsaPrivOutput.value = "";
      rsaDownloadPub.disabled = true;
      rsaDownloadPriv.disabled = true;
      generatedPrivateKey = null;
      generatedPublicKey = null;
    });

    rsaGenerateBtn?.addEventListener("click", async () => {
      const hashAlg = rsaHash.value;

      if (!window.crypto || !window.crypto.subtle) {
        appInstance.showToast("Web Crypto API is not supported in this context", "error");
        return;
      }

      rsaGenerateBtn.disabled = true;
      rsaDemoBtn.disabled = true;
      rsaStatus.style.display = "block";
      rsaStatusText.innerText = generatedKeyArch === "rsa-pss" ? "Generating RSA Keys (Modulus Calculations)..." : "Generating Elliptic Curve ECDSA Keys...";
      rsaPubOutput.value = "";
      rsaPrivOutput.value = "";
      rsaDownloadPub.disabled = true;
      rsaDownloadPriv.disabled = true;
      asymSignPanel.style.display = "none";

      setTimeout(async () => {
        try {
          let keyPair = null;

          if (generatedKeyArch === "rsa-pss") {
            const bitSize = parseInt(rsaBitSize.value, 10);
            keyPair = await window.crypto.subtle.generateKey(
              {
                name: "RSASSA-PKCS1-v1_5",
                modulusLength: bitSize,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: hashAlg
              },
              true,
              ["sign", "verify"]
            );
          } else {
            const curve = eccCurveSelect.value;
            keyPair = await window.crypto.subtle.generateKey(
              {
                name: "ECDSA",
                namedCurve: curve
              },
              true,
              ["sign", "verify"]
            );
          }

          generatedPrivateKey = keyPair.privateKey;
          generatedPublicKey = keyPair.publicKey;

          const exportedPub = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
          rsaPublicKeyPem = spkiToPem(exportedPub);

          const exportedPriv = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
          rsaPrivateKeyPem = pkcs8ToPem(exportedPriv);

          rsaPubOutput.value = rsaPublicKeyPem;
          rsaPrivOutput.value = rsaPrivateKeyPem;

          rsaDownloadPub.disabled = false;
          rsaDownloadPriv.disabled = false;
          asymSignPanel.style.display = "block";

          appInstance.showToast(`${generatedKeyArch === "rsa-pss" ? "RSA" : "ECDSA"} Key Pair Generated Locally!`, "success");
        } catch (e) {
          console.error(e);
          appInstance.showToast("Asymmetric key generation failed: " + e.message, "error");
        } finally {
          rsaGenerateBtn.disabled = false;
          rsaDemoBtn.disabled = false;
          rsaStatus.style.display = "none";
        }
      }, 100);
    });

    // Load Demo Keys (Generates a quick P-256 pair immediately)
    rsaDemoBtn?.addEventListener("click", async () => {
      rsaGenerateBtn.disabled = true;
      rsaDemoBtn.disabled = true;
      rsaStatus.style.display = "block";
      rsaStatusText.innerText = "Provisioning ECC P-256 Demo Keypair...";

      try {
        asymKeyType.value = "ecdsa";
        asymKeyType.dispatchEvent(new Event("change"));

        const keyPair = await window.crypto.subtle.generateKey(
          { name: "ECDSA", namedCurve: "P-256" },
          true,
          ["sign", "verify"]
        );

        generatedPrivateKey = keyPair.privateKey;
        generatedPublicKey = keyPair.publicKey;

        const exportedPub = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
        rsaPublicKeyPem = spkiToPem(exportedPub);

        const exportedPriv = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
        rsaPrivateKeyPem = pkcs8ToPem(exportedPriv);

        rsaPubOutput.value = rsaPublicKeyPem;
        rsaPrivOutput.value = rsaPrivateKeyPem;

        rsaDownloadPub.disabled = false;
        rsaDownloadPriv.disabled = false;
        asymSignPanel.style.display = "block";

        appInstance.showToast("Demo P-256 ECDSA keys loaded!", "info");
      } catch (err) {
        console.error(err);
        appInstance.showToast("Failed to load demo keys: " + err.message, "error");
      } finally {
        rsaGenerateBtn.disabled = false;
        rsaDemoBtn.disabled = false;
        rsaStatus.style.display = "none";
      }
    });

    rsaDownloadPub?.addEventListener("click", () => {
      if (rsaPublicKeyPem) {
        triggerDownload(`${generatedKeyArch === "rsa-pss" ? "rsa" : "ecc"}_public_key.pem`, rsaPublicKeyPem);
        appInstance.showToast("Public Key downloaded!", "success");
      }
    });

    rsaDownloadPriv?.addEventListener("click", () => {
      if (rsaPrivateKeyPem) {
        triggerDownload(`${generatedKeyArch === "rsa-pss" ? "rsa" : "ecc"}_private_key.pem`, rsaPrivateKeyPem);
        appInstance.showToast("Private Key downloaded!", "success");
      }
    });

    // Signing Subpanels Toggling
    asymSignTabBtn.addEventListener("click", () => {
      asymSignTabBtn.classList.add("active");
      asymVerifyTabBtn.classList.remove("active");
      asymSignSubpanel.style.display = "block";
      asymVerifySubpanel.style.display = "none";
    });

    asymVerifyTabBtn.addEventListener("click", () => {
      asymSignTabBtn.classList.remove("active");
      asymVerifyTabBtn.classList.add("active");
      asymSignSubpanel.style.display = "none";
      asymVerifySubpanel.style.display = "block";
      asymVerifyResult.style.display = "none";
    });

    // Execute message signing
    asymSignExecuteBtn.addEventListener("click", async () => {
      const msg = asymSignInput.value;
      if (!msg) {
        appInstance.showToast("Message payload cannot be empty!", "warning");
        return;
      }
      if (!generatedPrivateKey) {
        appInstance.showToast("Private key missing! Please generate keys first.", "error");
        return;
      }

      try {
        const encoder = new TextEncoder();
        const msgBuffer = encoder.encode(msg);
        let sigBuffer = null;

        if (generatedKeyArch === "rsa-pss") {
          sigBuffer = await window.crypto.subtle.sign(
            { name: "RSASSA-PKCS1-v1_5" },
            generatedPrivateKey,
            msgBuffer
          );
        } else {
          sigBuffer = await window.crypto.subtle.sign(
            {
              name: "ECDSA",
              hash: { name: rsaHash.value }
            },
            generatedPrivateKey,
            msgBuffer
          );
        }

        const sigBase64 = arrayBufferToBase64(sigBuffer);
        asymSigOutput.value = sigBase64;
        
        // Auto-fill verification fields for easy testing
        asymVerifyInput.value = msg;
        asymVerifySigInput.value = sigBase64;

        appInstance.showToast("Digital signature generated successfully!", "success");
      } catch (err) {
        console.error(err);
        appInstance.showToast("Signing failed: " + err.message, "error");
      }
    });

    // Execute signature verification
    asymVerifyExecuteBtn.addEventListener("click", async () => {
      const msg = asymVerifyInput.value;
      const sigBase64 = asymVerifySigInput.value.trim();

      if (!msg || !sigBase64) {
        appInstance.showToast("Message and signature fields cannot be empty!", "warning");
        return;
      }
      if (!generatedPublicKey) {
        appInstance.showToast("Public key missing! Please generate keys first.", "error");
        return;
      }

      asymVerifyResult.style.display = "none";

      try {
        const encoder = new TextEncoder();
        const msgBuffer = encoder.encode(msg);
        
        // Decode base64 signature
        const sigBytes = new Uint8Array(
          window.atob(sigBase64).split("").map(c => c.charCodeAt(0))
        );
        const sigBuffer = sigBytes.buffer;

        let isValid = false;

        if (generatedKeyArch === "rsa-pss") {
          isValid = await window.crypto.subtle.verify(
            { name: "RSASSA-PKCS1-v1_5" },
            generatedPublicKey,
            sigBuffer,
            msgBuffer
          );
        } else {
          isValid = await window.crypto.subtle.verify(
            {
              name: "ECDSA",
              hash: { name: rsaHash.value }
            },
            generatedPublicKey,
            sigBuffer,
            msgBuffer
          );
        }

        asymVerifyResult.style.display = "block";
        if (isValid) {
          asymVerifyResult.innerText = "✓ Signature Valid (Cryptographically Verified)";
          asymVerifyResult.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
          asymVerifyResult.style.color = "var(--accent-emerald)";
          asymVerifyResult.style.border = "1px solid rgba(16, 185, 129, 0.3)";
          appInstance.showToast("Signature Verified Successfully!", "success");
        } else {
          asymVerifyResult.innerText = "✗ Signature Invalid (Verification Failed)";
          asymVerifyResult.style.backgroundColor = "rgba(244, 63, 94, 0.15)";
          asymVerifyResult.style.color = "var(--accent-rose)";
          asymVerifyResult.style.border = "1px solid rgba(244, 63, 94, 0.3)";
          appInstance.showToast("Signature Verification Failed!", "error");
        }
      } catch (err) {
        console.error(err);
        asymVerifyResult.style.display = "block";
        asymVerifyResult.innerText = "✗ Verification Error: " + err.message;
        asymVerifyResult.style.backgroundColor = "rgba(244, 63, 94, 0.15)";
        asymVerifyResult.style.color = "var(--accent-rose)";
        asymVerifyResult.style.border = "1px solid rgba(244, 63, 94, 0.3)";
        appInstance.showToast("Signature Verification failed: format error", "error");
      }
    });

    // ==========================================
    // UNIFIED EXPORTS & SAMPLES
    // ==========================================
    container.querySelector("#crypto-copy-btn")?.addEventListener("click", () => {
      if (activeTab === "hash") {
        const text = `MD5: ${hashMd5.value}\nSHA-1: ${hashSha1.value}\nSHA-256: ${hashSha256.value}\nSHA-512: ${hashSha512.value}`;
        appInstance.copyText(text);
      } else if (activeTab === "aes") {
        appInstance.copyText(aesOutputText.value);
      } else if (activeTab === "rsa") {
        let text = `PUBLIC KEY:\n${rsaPubOutput.value}\n\nPRIVATE KEY:\n${rsaPrivOutput.value}`;
        if (asymSigOutput.value) {
          text += `\n\nLAST SIGNATURE:\n${asymSigOutput.value}`;
        }
        appInstance.copyText(text);
      }
    });

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

    // Destructor
    this._cleanup = () => {
      if (hashWorker) {
        hashWorker.terminate();
      }
      URL.revokeObjectURL(workerUrl);
    };

    // Set initial active tab
    const initialTab = appInstance.activeSubtab || 'hash';
    appInstance.activeSubtab = null;
    switchTab(initialTab);
  },
  destroy() {
    if (this._cleanup) {
      this._cleanup();
    }
  }
};
