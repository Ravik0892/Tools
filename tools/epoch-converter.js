export default {
  id: "epoch-converter",
  name: "Epoch/Unix Timestamp Converter",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Convert Timestamp to Datetime</h3>
          </div>
          <div class="form-group">
            <label for="epoch-input">Unix Timestamp (Seconds or Milliseconds)</label>
            <input type="text" id="epoch-input" class="form-input" placeholder="e.g. 1774390000" style="font-family: var(--font-mono);">
          </div>
          <div class="form-row">
            <button class="tool-btn primary" id="epoch-convert-btn">Convert to Date</button>
            <button class="tool-btn" id="epoch-set-now-btn">Set Current Time</button>
          </div>
          <div class="form-group" style="margin-top: 10px;">
            <label>UTC Datetime</label>
            <input type="text" id="epoch-output-utc" class="form-input" readonly style="font-family: var(--font-mono);" aria-label="UTC Output">
          </div>
          <div class="form-group">
            <label>Local Datetime</label>
            <input type="text" id="epoch-output-local" class="form-input" readonly style="font-family: var(--font-mono);" aria-label="Local Output">
          </div>
        </div>
        
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Convert Datetime to Timestamp</h3>
          </div>
          <div class="form-group">
            <label for="date-input">Datetime String (or ISO 8601)</label>
            <input type="text" id="date-input" class="form-input" placeholder="e.g. 2026-06-12 15:30:00" style="font-family: var(--font-mono);">
          </div>
          <button class="tool-btn primary" id="date-convert-btn">Convert to Timestamp</button>
          <div class="form-group" style="margin-top: 10px;">
            <label>Unix Epoch (Seconds)</label>
            <div class="form-row" style="grid-template-columns: 1fr auto;">
              <input type="text" id="date-output-seconds" class="form-input" readonly style="font-family: var(--font-mono);" aria-label="Epoch Seconds Output">
              <button class="tool-btn copy-epoch-btn" data-target="date-output-seconds">Copy</button>
            </div>
          </div>
          <div class="form-group">
            <label>Unix Epoch (Milliseconds)</label>
            <div class="form-row" style="grid-template-columns: 1fr auto;">
              <input type="text" id="date-output-millis" class="form-input" readonly style="font-family: var(--font-mono);" aria-label="Epoch Milliseconds Output">
              <button class="tool-btn copy-epoch-btn" data-target="date-output-millis">Copy</button>
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
            <button class="tool-btn secondary" id="epoch-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Epoch to Date</strong>: Enter a Unix timestamp (seconds/ms) on the left panel to translate it into UTC & local dates.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Date to Epoch</strong>: Enter an ISO date string (e.g. `YYYY-MM-DD HH:MM:SS`) on the right panel to extract timestamp values.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Now Timestamp</strong>: Click **Set Current Time** to quickly retrieve and convert the current system's live timestamp.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const epInput = container.querySelector("#epoch-input");
    const epUtc = container.querySelector("#epoch-output-utc");
    const epLocal = container.querySelector("#epoch-output-local");
    const dateInput = container.querySelector("#date-input");
    const dateSecs = container.querySelector("#date-output-seconds");
    const dateMillis = container.querySelector("#date-output-millis");

    const convertTimestamp = () => {
      const val = epInput.value.trim();
      if (!val) return;
      
      let ts = parseInt(val);
      if (isNaN(ts)) {
        appInstance.showToast("Invalid numeric timestamp", "error");
        return;
      }

      // Auto-detect seconds vs milliseconds (seconds has 10 digits)
      if (val.length === 10) ts = ts * 1000;

      const date = new Date(ts);
      if (isNaN(date.getTime())) {
        appInstance.showToast("Invalid date value", "error");
        return;
      }

      epUtc.value = date.toUTCString();
      epLocal.value = date.toString();
      appInstance.showToast("Converted to date!", "success");
    };

    container.querySelector("#epoch-convert-btn")?.addEventListener("click", convertTimestamp);

    container.querySelector("#epoch-set-now-btn")?.addEventListener("click", () => {
      epInput.value = Math.floor(Date.now() / 1000);
      convertTimestamp();
    });

    container.querySelector("#date-convert-btn")?.addEventListener("click", () => {
      const val = dateInput.value.trim();
      if (!val) return;

      const parsed = Date.parse(val);
      if (isNaN(parsed)) {
        appInstance.showToast("Could not parse datetime string", "error");
        return;
      }

      dateSecs.value = Math.floor(parsed / 1000);
      dateMillis.value = parsed;
      appInstance.showToast("Converted to epoch!", "success");
    });

    container.querySelectorAll(".copy-epoch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const targetInput = container.querySelector(`#${targetId}`);
        if (targetInput) {
          appInstance.copyText(targetInput.value);
        }
      });
    });

    container.querySelector("#epoch-guide-load-sample")?.addEventListener("click", () => {
      epInput.value = "1774390000";
      dateInput.value = "2026-03-24 18:06:40";
      convertTimestamp();
      container.querySelector("#date-convert-btn")?.click();
      appInstance.showToast("Loaded standard sample timestamps!", "info");
    });

    // Set now initially
    epInput.value = Math.floor(Date.now() / 1000);
    dateInput.value = new Date().toISOString().slice(0, 19).replace('T', ' ');
    convertTimestamp();
  }
};
