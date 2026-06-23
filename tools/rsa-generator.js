export default {
  id: "rsa-generator",
  name: "RSA Key Pair Generator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Configuration</h3>
          </div>
          
          <div class="form-group" style="margin-bottom: 16px;">
            <label for="rsa-bit-size">Key Bit Size</label>
            <select class="form-select" id="rsa-bit-size" style="width: 100%;">
              <option value="1024">1024-bit (Fast)</option>
              <option value="2048" selected>2048-bit (Recommended Standard)</option>
              <option value="4096">4096-bit (Ultra-Secure, Slow)</option>
            </select>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Larger sizes provide exponential security benefits but take longer to generate.</p>
          </div>

          <div class="form-group" style="margin-bottom: 24px;">
            <label for="rsa-hash">Hash Algorithm</label>
            <select class="form-select" id="rsa-hash" style="width: 100%;">
              <option value="SHA-256" selected>SHA-256</option>
              <option value="SHA-384">SHA-384</option>
              <option value="SHA-512">SHA-512</option>
              <option value="SHA-1">SHA-1 (Legacy / Compatibility)</option>
            </select>
          </div>

          <div class="form-row" style="margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px;">
            <button class="tool-btn primary" id="rsa-generate-btn" style="width: 100%; justify-content: center; gap: 8px;">
              <svg viewBox="0 0 24 24" style="width: 16px; height: 16px;" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              <span>Generate Key Pair</span>
            </button>
            <button class="tool-btn secondary" id="rsa-demo-btn" style="width: 100%; justify-content: center; gap: 8px;">
              <svg viewBox="0 0 24 24" style="width: 16px; height: 16px;" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-8-4-4m0 0L8 8m4-4v12"/></svg>
              <span>Load Demo Keys</span>
            </button>
          </div>

          <div id="rsa-status" style="display: none; padding: 12px; border-radius: 8px; border: 1px dashed var(--accent-cyan); background: rgba(0, 242, 254, 0.05); text-align: center;">
            <div style="font-size: 13px; color: var(--text-color); font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 8px;">
              <span class="spinner" style="width: 14px; height: 14px; border: 2px solid var(--accent-cyan); border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 0.8s linear infinite;"></span>
              <span>Generating RSA Keys...</span>
            </div>
            <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px; margin-bottom: 0;">Generating 4096-bit keys may take up to 10 seconds depending on device performance.</p>
          </div>
        </div>

        <div class="tool-panel" style="flex: 2; display: flex; flex-direction: column; gap: 16px;">
          <!-- Public Key Panel -->
          <div style="display: flex; flex-direction: column; flex: 1; min-height: 180px;">
            <div class="panel-header" style="margin-bottom: 8px;">
              <h3>Public Key (SPKI Format)</h3>
              <div style="display: flex; gap: 8px;">
                <button class="tool-btn accent-emerald" id="rsa-copy-pub" style="font-size: 12px; padding: 6px 12px;" disabled>Copy</button>
                <button class="tool-btn secondary" id="rsa-download-pub" style="font-size: 12px; padding: 6px 12px;" disabled>Download</button>
              </div>
            </div>
            <textarea class="input-textarea" id="rsa-pub-output" readonly placeholder="Public key will be output here..." style="font-family: var(--font-mono); font-size: 11px; flex: 1; min-height: 120px;" aria-label="RSA Public Key Output"></textarea>
          </div>

          <!-- Private Key Panel -->
          <div style="display: flex; flex-direction: column; flex: 1; min-height: 180px;">
            <div class="panel-header" style="margin-bottom: 8px;">
              <h3>Private Key (PKCS#8 Format)</h3>
              <div style="display: flex; gap: 8px;">
                <button class="tool-btn accent-emerald" id="rsa-copy-priv" style="font-size: 12px; padding: 6px 12px;" disabled>Copy</button>
                <button class="tool-btn secondary" id="rsa-download-priv" style="font-size: 12px; padding: 6px 12px;" disabled>Download</button>
              </div>
            </div>
            <textarea class="input-textarea" id="rsa-priv-output" readonly placeholder="Private key will be output here..." style="font-family: var(--font-mono); font-size: 11px; flex: 1; min-height: 120px;" aria-label="RSA Private Key Output"></textarea>
          </div>
        </div>

        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Security & Operation</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>100% Client-Side</strong>: Keys are generated locally inside your browser's Web Crypto sandbox. They are never sent over the network.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Bit Size recommendation</strong>: For production servers, use 2048-bit or 4096-bit. 1024-bit is no longer recommended for secure communications.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Download or Copy</strong>: Save the private key as a <code>.pem</code> file to disk for server deployments. Keep your private key confidential.</div>
            </div>
          </div>
        </div>
      </div>

      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
  },
  init(container, appInstance) {
    const bitSizeSelect = container.querySelector("#rsa-bit-size");
    const hashSelect = container.querySelector("#rsa-hash");
    const genBtn = container.querySelector("#rsa-generate-btn");
    const statusBox = container.querySelector("#rsa-status");

    const pubOutput = container.querySelector("#rsa-pub-output");
    const privOutput = container.querySelector("#rsa-priv-output");

    const copyPubBtn = container.querySelector("#rsa-copy-pub");
    const downloadPubBtn = container.querySelector("#rsa-download-pub");

    const copyPrivBtn = container.querySelector("#rsa-copy-priv");
    const downloadPrivBtn = container.querySelector("#rsa-download-priv");

    let currentPublicKeyPem = "";
    let currentPrivateKeyPem = "";

    const arrayBufferToBase64 = (buffer) => {
      let binary = "";
      const bytes = new Uint8Array(buffer);
      const len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
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
      const blob = new Blob([text], { type: "application/x-pem-file" });
      const elem = window.document.createElement("a");
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
      window.URL.revokeObjectURL(elem.href);
    };

    genBtn.addEventListener("click", async () => {
      const bitSize = parseInt(bitSizeSelect.value, 10);
      const hashName = hashSelect.value;

      // Update UI to loading state
      genBtn.disabled = true;
      statusBox.style.display = "block";

      // Clear previous keys
      pubOutput.value = "";
      privOutput.value = "";
      copyPubBtn.disabled = true;
      downloadPubBtn.disabled = true;
      copyPrivBtn.disabled = true;
      downloadPrivBtn.disabled = true;

      const startTime = performance.now();

      // Wrap in setTimeout to let browser paint the spinner
      setTimeout(async () => {
        try {
          // Generate RSA Key Pair using browser Web Crypto
          const keyPair = await window.crypto.subtle.generateKey(
            {
              name: "RSASSA-PKCS1-v1_5",
              modulusLength: bitSize,
              publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
              hash: { name: hashName }
            },
            true, // extractable keys
            ["sign", "verify"]
          );

          // Export keys
          const spkiBuffer = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
          const pkcs8Buffer = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

          currentPublicKeyPem = spkiToPem(spkiBuffer);
          currentPrivateKeyPem = pkcs8ToPem(pkcs8Buffer);

          pubOutput.value = currentPublicKeyPem;
          privOutput.value = currentPrivateKeyPem;

          // Enable actions
          copyPubBtn.disabled = false;
          downloadPubBtn.disabled = false;
          copyPrivBtn.disabled = false;
          downloadPrivBtn.disabled = false;

          const durationSec = ((performance.now() - startTime) / 1000).toFixed(2);
          appInstance.showToast(`RSA Key Pair generated successfully in ${durationSec}s!`, "success");
        } catch (err) {
          console.error("RSA Key Generation Failed:", err);
          appInstance.showToast(`RSA Generation Failed: ${err.message}`, "error");
        } finally {
          genBtn.disabled = false;
          statusBox.style.display = "none";
        }
      }, 50);
    });

    const demoBtn = container.querySelector("#rsa-demo-btn");
    demoBtn?.addEventListener("click", () => {
      currentPublicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzq2g78tM81m8o9aN8m7T
3G8Xf3z4yXn4q9p1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G
/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+
H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5
hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F
/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8e
K1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8wIDAQAB
-----END PUBLIC KEY-----`;

      currentPrivateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDOraDvy0zzWbyj
1o3ybtPcbfd/fPjJefir2nUb9DUX/rtL+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2
yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L
0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L
/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m
1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/
d+H8wIDAQABAoIBAQCp/7c8d9lZ7E7x4K5A6f4T7f3Y/L1V2z6x9nF/Z7zaN/fX
1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1
v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S
+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2
u99L/Wz/p5hJz1v2yE9m1G/Q1F/67S+3L0k3/d+H8eK1M2u99L/Wz/p5hJz1v2
yE9m1G/Q1F/67S+3L0k3/d+H8gYEA7wDf+01L/wDf+01L/wDf+01L/wDf+01L/w
Df+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L
/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+0
1MCgYEA4Df+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L
/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+01L/wDf+0
1L/Df+01L/Df+01L/Df+01L/Df+01L/Df+01L/Df+01L/Df+01M=
-----END PRIVATE KEY-----`;

      pubOutput.value = currentPublicKeyPem;
      privOutput.value = currentPrivateKeyPem;

      // Enable actions
      copyPubBtn.disabled = false;
      downloadPubBtn.disabled = false;
      copyPrivBtn.disabled = false;
      downloadPrivBtn.disabled = false;

      appInstance.showToast("Demo keys loaded successfully!", "success");
    });

    copyPubBtn.addEventListener("click", () => {
      if (currentPublicKeyPem) {
        appInstance.copyText(currentPublicKeyPem);
      }
    });

    copyPrivBtn.addEventListener("click", () => {
      if (currentPrivateKeyPem) {
        appInstance.copyText(currentPrivateKeyPem);
      }
    });

    downloadPubBtn.addEventListener("click", () => {
      if (currentPublicKeyPem) {
        triggerDownload("public_key.pem", currentPublicKeyPem);
        appInstance.showToast("Public Key downloaded!", "success");
      }
    });

    downloadPrivBtn.addEventListener("click", () => {
      if (currentPrivateKeyPem) {
        triggerDownload("private_key.pem", currentPrivateKeyPem);
        appInstance.showToast("Private Key downloaded!", "success");
      }
    });
  }
};
