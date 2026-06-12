import { base64Encode, base64Decode } from './utils.js';

export default {
  id: "base64",
  name: "Base64 Encoder & Decoder",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Input Text / Base64</h3>
            <div class="panel-actions">
              <button class="tool-btn" id="base64-clear">Clear</button>
            </div>
          </div>
          <textarea class="input-textarea" id="base64-input" placeholder="Enter plain text or Base64 code..." aria-label="Base64 Input"></textarea>
          <div class="form-row">
            <button class="tool-btn primary" id="base64-encode-btn">Encode to Base64</button>
            <button class="tool-btn primary" id="base64-decode-btn">Decode from Base64</button>
          </div>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Output Result</h3>
            <div class="panel-actions">
              <button class="tool-btn accent-emerald" id="base64-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy</button>
            </div>
          </div>
          <textarea class="input-textarea" id="base64-output" readonly placeholder="Output will appear here..." aria-label="Base64 Output"></textarea>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="base64-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Input Value</strong>: Enter raw plain text to encode, or base64 encoded text payload to decode.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Select Action</strong>: Click **Encode to Base64** to produce output string, or **Decode from Base64** to retrieve original payload.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Save Output</strong>: Click the **Copy** action button to instantly copy the output result to your system clipboard.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const b64Input = container.querySelector("#base64-input");
    const b64Output = container.querySelector("#base64-output");

    container.querySelector("#base64-encode-btn")?.addEventListener("click", () => {
      try {
        b64Output.value = base64Encode(b64Input.value);
        appInstance.showToast("Encoded successfully!", "success");
      } catch (e) {
        appInstance.showToast("Encoding failed: " + e.message, "error");
      }
    });

    container.querySelector("#base64-decode-btn")?.addEventListener("click", () => {
      try {
        b64Output.value = base64Decode(b64Input.value);
        appInstance.showToast("Decoded successfully!", "success");
      } catch (e) {
        appInstance.showToast("Decoding failed: Invalid Base64 format", "error");
      }
    });

    container.querySelector("#base64-clear")?.addEventListener("click", () => {
      b64Input.value = "";
      b64Output.value = "";
    });

    container.querySelector("#base64-guide-load-sample")?.addEventListener("click", () => {
      b64Input.value = "Welcome to OmniTool Hub!";
      b64Output.value = base64Encode(b64Input.value);
      appInstance.showToast("Sample text loaded and encoded!", "info");
    });

    container.querySelector("#base64-copy-btn")?.addEventListener("click", () => {
      appInstance.copyText(b64Output.value);
    });
  }
};
