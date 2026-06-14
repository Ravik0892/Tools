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
              <div class="tool-guide-step-text"><strong>Provide Input</strong>: Enter the raw string or URL to encode, or a percent-encoded URL to decode back.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Process URL</strong>: Click <strong>Encode URL</strong> to percent-encode special characters, or <strong>Decode URL</strong> to translate back.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Copy Result</strong>: Click <strong>Copy</strong> on the output panel to save the processed URL to clipboard.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Encode</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Decode</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input</span>
                <div class="tool-guide-io-value">user=John &amp; age=30</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Encoded</span>
                <div class="tool-guide-io-value">user%3DJohn%20%26%20age%3D30</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input</span>
                <div class="tool-guide-io-value">hello%20world</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Decoded</span>
                <div class="tool-guide-io-value">hello world</div>
              </div>
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

    container.querySelector("#url-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        urlInput.value = "user=John & age=30";
        urlOutput.value = urlEncode(urlInput.value);
        appInstance.showToast("Loaded raw query parameters and encoded!", "info");
      } else {
        urlInput.value = "hello%20world";
        urlOutput.value = urlDecode(urlInput.value);
        appInstance.showToast("Loaded percent-encoded URL and decoded!", "info");
      }
    });

    container.querySelector("#url-copy-btn")?.addEventListener("click", () => {
      appInstance.copyText(urlOutput.value);
    });
  }
};
