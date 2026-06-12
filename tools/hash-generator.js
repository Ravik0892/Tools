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
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="hash-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Type Text</strong>: Enter or paste the text content you want to encrypt into the Input Text field.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Auto Hashing</strong>: The tool processes input instantly to produce MD5, SHA-1, SHA-256, and SHA-512 digests.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Copy to Clipboard</strong>: Click the copy action buttons next to each output field to extract individual hash keys.</div>
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
      try {
        const bufferSha1 = await crypto.subtle.digest("SHA-1", data);
        hashSha1.value = Array.from(new Uint8Array(bufferSha1)).map(b => b.toString(16).padStart(2, "0")).join("");

        const bufferSha256 = await crypto.subtle.digest("SHA-256", data);
        hashSha256.value = Array.from(new Uint8Array(bufferSha256)).map(b => b.toString(16).padStart(2, "0")).join("");

        const bufferSha512 = await crypto.subtle.digest("SHA-512", data);
        hashSha512.value = Array.from(new Uint8Array(bufferSha512)).map(b => b.toString(16).padStart(2, "0")).join("");
      } catch (e) {
        console.error(e);
      }
    };

    hashInput?.addEventListener("input", runHasher);
    container.querySelector("#hash-clear")?.addEventListener("click", () => {
      hashInput.value = "";
      runHasher();
    });

    container.querySelector("#hash-guide-load-sample")?.addEventListener("click", () => {
      hashInput.value = "Secure cryptographic check value";
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
