import { md5 } from './utils.js';

export default {
  id: "hash-generator",
  name: "Hash Generator",
  renderUI() {
    return `
      <div class="tool-content-layout">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Input Text</h3>
            <button class="tool-btn" id="hash-clear">Clear</button>
          </div>
          <textarea class="input-textarea" id="hash-input" placeholder="Type or paste text to generate cryptographic hashes instantly..." style="min-height: 100px;" aria-label="Hash Text Input"></textarea>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Generated Cryptographic Hashes</h3>
          </div>
          <div class="form-group">
            <label>MD5 Hash</label>
            <div class="form-row" style="grid-template-columns: 1fr auto;">
              <input type="text" id="hash-md5" class="form-input" readonly placeholder="MD5 Hash" style="font-family: var(--font-mono);" aria-label="MD5 Output">
              <button class="tool-btn copy-action-btn" data-target="hash-md5">Copy</button>
            </div>
          </div>
          <div class="form-group">
            <label>SHA-1 Hash</label>
            <div class="form-row" style="grid-template-columns: 1fr auto;">
              <input type="text" id="hash-sha1" class="form-input" readonly placeholder="SHA-1 Hash" style="font-family: var(--font-mono);" aria-label="SHA-1 Output">
              <button class="tool-btn copy-action-btn" data-target="hash-sha1">Copy</button>
            </div>
          </div>
          <div class="form-group">
            <label>SHA-256 Hash</label>
            <div class="form-row" style="grid-template-columns: 1fr auto;">
              <input type="text" id="hash-sha256" class="form-input" readonly placeholder="SHA-256 Hash" style="font-family: var(--font-mono);" aria-label="SHA-256 Output">
              <button class="tool-btn copy-action-btn" data-target="hash-sha256">Copy</button>
            </div>
          </div>
          <div class="form-group">
            <label>SHA-512 Hash</label>
            <div class="form-row" style="grid-template-columns: 1fr auto;">
              <input type="text" id="hash-sha512" class="form-input" readonly placeholder="SHA-512 Hash" style="font-family: var(--font-mono);" aria-label="SHA-512 Output">
              <button class="tool-btn copy-action-btn" data-target="hash-sha512">Copy</button>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide &amp; Instructions</span>
            </div>
            <button class="tool-btn secondary" id="hash-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Type Text</strong>: Enter or paste any text you want to hash into the Input Text field.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Auto Hashing</strong>: Results update instantly — MD5, SHA-1, SHA-256, and SHA-512 are all generated simultaneously.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Copy Hash</strong>: Click any <strong>Copy</strong> button next to the hash you need to save it to clipboard.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Word Hash</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Phrase Hash</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input</span>
                <div class="tool-guide-io-value">hello</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Hashes</span>
                <div class="tool-guide-io-value" style="max-height: 120px;">MD5: 5d41402abc4b2a76b9719d911017c592
SHA-1: aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
SHA-256: 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
SHA-512: 9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c16666752d583523a32646d485e2454</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input</span>
                <div class="tool-guide-io-value">OmniTool Hub</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Hashes</span>
                <div class="tool-guide-io-value" style="max-height: 120px;">MD5: 5707f15e85f400781747864f14d8721c
SHA-1: 9f91a5472856417d4cf4a54415505e60938f38d4
SHA-256: 372a9e5251a37c05b8a05c742358c9735d64f02826cf7105267b209d73d9e831
SHA-512: 5567554904b6a987d3127814b74542878939c8c116c4f9f4a568a1f81df681534436821217e99709d7e366ca3cf73a62886f4948a39c9053d2d148e663a70f3f</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const hashInput = container.querySelector("#hash-input");
    const hashMd5 = container.querySelector("#hash-md5");
    const hashSha1 = container.querySelector("#hash-sha1");
    const hashSha256 = container.querySelector("#hash-sha256");
    const hashSha512 = container.querySelector("#hash-sha512");

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
      
      const hasCryptoSubtle = window.crypto && window.crypto.subtle;
      if (hasCryptoSubtle) {
        try {
          const bufferSha1 = await crypto.subtle.digest("SHA-1", data);
          hashSha1.value = Array.from(new Uint8Array(bufferSha1)).map(b => b.toString(16).padStart(2, "0")).join("");

          const bufferSha256 = await crypto.subtle.digest("SHA-256", data);
          hashSha256.value = Array.from(new Uint8Array(bufferSha256)).map(b => b.toString(16).padStart(2, "0")).join("");

          const bufferSha512 = await crypto.subtle.digest("SHA-512", data);
          hashSha512.value = Array.from(new Uint8Array(bufferSha512)).map(b => b.toString(16).padStart(2, "0")).join("");
        } catch (e) {
          console.error(e);
          hashSha1.value = "[Hash calculation failed]";
          hashSha256.value = "[Hash calculation failed]";
          hashSha512.value = "[Hash calculation failed]";
        }
      } else {
        hashSha1.value = "[Insecure context: Web Crypto disabled]";
        hashSha256.value = "[Insecure context: Web Crypto disabled]";
        hashSha512.value = "[Insecure context: Web Crypto disabled]";
      }
    };

    hashInput?.addEventListener("input", runHasher);
    container.querySelector("#hash-clear")?.addEventListener("click", () => {
      hashInput.value = "";
      runHasher();
    });

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

    container.querySelector("#hash-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        hashInput.value = "hello";
      } else {
        hashInput.value = "OmniTool Hub";
      }
      runHasher();
      appInstance.showToast("Sample text hashed successfully!", "info");
    });

    container.querySelectorAll(".copy-action-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const targetInput = container.querySelector(`#${targetId}`);
        if (targetInput) {
          appInstance.copyText(targetInput.value);
        }
      });
    });
  }
};
