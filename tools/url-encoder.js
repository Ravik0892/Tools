import { urlEncode, urlDecode } from './utils.js';

export default {
  id: "url-encoder",
  name: "URL Encoder & Decoder",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Input Text / URL</h3>
            <button class="tool-btn" id="url-clear">Clear</button>
          </div>
          <textarea class="input-textarea" id="url-input" placeholder="Paste URL or raw string here..." aria-label="URL Input"></textarea>
          <div class="form-row">
            <button class="tool-btn primary" id="url-encode-btn">Encode URL</button>
            <button class="tool-btn primary" id="url-decode-btn">Decode URL</button>
          </div>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Output Result</h3>
            <button class="tool-btn accent-emerald" id="url-copy-btn"><svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy</button>
          </div>
          <textarea class="input-textarea" id="url-output" readonly placeholder="Output will appear here..." aria-label="URL Output"></textarea>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="url-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Provide Input</strong>: Enter the raw string or URL parameters to encode, or an encoded URL structure to decode.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Process URL</strong>: Click **Encode URL** to convert characters to percent-encoded format, or **Decode URL** to translate them back.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Copy Result</strong>: Extract the processed output string using the copy button on the result panel.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const urlInput = container.querySelector("#url-input");
    const urlOutput = container.querySelector("#url-output");

    container.querySelector("#url-encode-btn")?.addEventListener("click", () => {
      urlOutput.value = urlEncode(urlInput.value);
      appInstance.showToast("URL Encoded!", "success");
    });

    container.querySelector("#url-decode-btn")?.addEventListener("click", () => {
      try {
        urlOutput.value = urlDecode(urlInput.value);
        appInstance.showToast("URL Decoded!", "success");
      } catch (e) {
        appInstance.showToast("Failed to decode: Invalid URL format", "error");
      }
    });

    container.querySelector("#url-clear")?.addEventListener("click", () => {
      urlInput.value = "";
      urlOutput.value = "";
    });

    container.querySelector("#url-guide-load-sample")?.addEventListener("click", () => {
      urlInput.value = "https://omnitool.hub/search?query=developer tools&status=active";
      urlOutput.value = urlEncode(urlInput.value);
      appInstance.showToast("Sample URL loaded and encoded!", "info");
    });

    container.querySelector("#url-copy-btn")?.addEventListener("click", () => {
      appInstance.copyText(urlOutput.value);
    });
  }
};
