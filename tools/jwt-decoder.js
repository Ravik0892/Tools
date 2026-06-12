import { decodeJwt } from './utils.js';

export default {
  id: "jwt-decoder",
  name: "JWT Decoder",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Token Input</h3>
            <button class="tool-btn" id="jwt-clear">Clear</button>
          </div>
          <textarea class="input-textarea" id="jwt-input" placeholder="Paste encoded JSON Web Token (Header.Payload.Signature) here..." aria-label="Encoded JWT Input"></textarea>
          <div id="jwt-alert-box" style="display: none;"></div>
        </div>
        <div class="tool-panel" style="gap: 16px;">
          <div class="panel-header">
            <h3>Decoded Payload</h3>
          </div>
          <div class="form-group">
            <label>Header (Algorithms & Token Type)</label>
            <pre class="output-pre" id="jwt-output-header" style="min-height: 85px; max-height: 120px;"></pre>
          </div>
          <div class="form-group">
            <label>Payload (Claims/Data)</label>
            <pre class="output-pre" id="jwt-output-payload" style="min-height: 120px; max-height: 220px;"></pre>
          </div>
          <div class="form-group">
            <label>Token Validity Details</label>
            <div class="tool-badge" style="padding: 10px; font-family: var(--font-mono); text-align: left; font-size: 12px; line-height: 1.6;" id="jwt-validity-info">
              No token loaded.
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
            <button class="tool-btn secondary" id="jwt-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Paste JWT Token</strong>: Enter the full JWT string (Base64Url encoded Header, Payload, and Signature components separated by dots).</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Inspect Header/Claims</strong>: Review the parsed header (algorithms) and payload metadata structure in real-time.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Verify Expiration</strong>: Double-check issued at, expired status, and validity metadata of the token signature properties.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const jwtInput = container.querySelector("#jwt-input");
    const jwtHeader = container.querySelector("#jwt-output-header");
    const jwtPayload = container.querySelector("#jwt-output-payload");
    const jwtInfo = container.querySelector("#jwt-validity-info");
    const jwtAlert = container.querySelector("#jwt-alert-box");

    const runJwtDecoder = () => {
      const token = jwtInput.value.trim();
      jwtAlert.style.display = "none";
      if (!token) {
        jwtHeader.innerText = "";
        jwtPayload.innerText = "";
        jwtInfo.innerText = "No token loaded.";
        return;
      }

      try {
        const decoded = decodeJwt(token);
        jwtHeader.innerText = JSON.stringify(decoded.header, null, 4);
        jwtPayload.innerText = JSON.stringify(decoded.payload, null, 4);

        // Check Expiration
        let infoString = "";
        if (decoded.payload.exp) {
          const expDate = new Date(decoded.payload.exp * 1000);
          const expired = expDate.getTime() < Date.now();
          infoString += `• Expires at: ${expDate.toLocaleString()} (${expired ? 'EXPIRED' : 'ACTIVE'})\n`;
        } else {
          infoString += `• Expires at: Claim (exp) not found in payload.\n`;
        }

        if (decoded.payload.iat) {
          infoString += `• Issued at: ${new Date(decoded.payload.iat * 1000).toLocaleString()}\n`;
        }
        if (decoded.payload.iss) infoString += `• Issuer (iss): ${decoded.payload.iss}\n`;
        if (decoded.payload.sub) infoString += `• Subject (sub): ${decoded.payload.sub}\n`;

        jwtInfo.innerText = infoString;
        jwtAlert.className = "tool-alert success";
        jwtAlert.innerHTML = `<span>Decoded successfully</span>`;
        jwtAlert.style.display = "flex";
      } catch (e) {
        jwtHeader.innerText = "";
        jwtPayload.innerText = "";
        jwtInfo.innerText = "Error decoding token.";
        jwtAlert.className = "tool-alert error";
        jwtAlert.innerHTML = `<span>Invalid JWT structure: ${e.message}</span>`;
        jwtAlert.style.display = "flex";
      }
    };

    jwtInput?.addEventListener("input", runJwtDecoder);
    container.querySelector("#jwt-clear")?.addEventListener("click", () => {
      jwtInput.value = "";
      runJwtDecoder();
    });

    const loadSample = () => {
      jwtInput.value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoyNTI0NjA4MDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
      runJwtDecoder();
      appInstance.showToast("Sample JWT token loaded!", "info");
    };

    container.querySelector("#jwt-guide-load-sample")?.addEventListener("click", loadSample);

    // Populate a sample JWT token for testing on initial load
    loadSample();
  }
};
