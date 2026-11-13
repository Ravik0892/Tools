export default {
  id: "datetime-suite",
  name: "Date, Time & Epoch Suite",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <h3 style="margin: 0;">Configuration</h3>
            <!-- Tabs inside config panel -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 100%; flex-wrap: wrap;" id="datetime-tabs">
              <button class="keyboard-tab active" data-tab="epoch" style="font-size: 11px; padding: 4px 8px;">Epoch Converter</button>
              <button class="keyboard-tab" data-tab="date" style="font-size: 11px; padding: 4px 8px;">Date Calculator</button>
            </div>
          </div>

          <!-- Tab 1: Epoch Converter Panel -->
          <div id="panel-epoch-controls" class="tab-control-panel">
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div class="form-group" style="margin-top: 5px;">
                <label for="epoch-input">Unix Timestamp to Date (Seconds or Milliseconds)</label>
                <div style="display: flex; gap: 6px;">
                  <input type="text" id="epoch-input" class="form-input" placeholder="e.g. 1774390000" style="font-family: var(--font-mono); flex: 1;">
                  <button class="tool-btn secondary" id="epoch-set-now-btn" style="font-size: 11px;">Now</button>
                </div>
              </div>
              <button class="tool-btn primary" id="epoch-convert-btn" style="justify-content: center;">Convert to Date</button>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px; border-top: 1px solid var(--border-color); padding-top: 15px;">
              <div class="form-group">
                <label for="date-input">Datetime String to Timestamp (ISO 8601)</label>
                <input type="text" id="date-input" class="form-input" placeholder="e.g. 2026-06-12 15:30:00" style="font-family: var(--font-mono);">
              </div>
              <button class="tool-btn primary" id="date-convert-btn" style="justify-content: center;">Convert to Timestamp</button>
            </div>
          </div>

          <!-- Tab 2: Date Calculator Panel -->
          <div id="panel-date-controls" class="tab-control-panel hidden">
            <div style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
              <button class="date-subtab-btn active" data-subtab="diff">Duration</button>
              <button class="date-subtab-btn" data-subtab="math">Add/Subtract</button>
            </div>

            <!-- Subtab 1: Duration -->
            <div id="date-subpane-diff" class="date-subpane">
              <div class="form-group" style="margin-top: 10px; margin-bottom: 10px;">
                <label for="date-diff-start">Start Date</label>
                <input type="date" id="date-diff-start" class="form-input" style="width: 100%; box-sizing: border-box; min-width: 0;">
              </div>
              <div class="form-group" style="margin-bottom: 10px;">
                <label for="date-diff-end">End Date</label>
                <input type="date" id="date-diff-end" class="form-input" style="width: 100%; box-sizing: border-box; min-width: 0;">
              </div>
              <div class="form-group" style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <input type="checkbox" id="date-diff-include-end" style="cursor: pointer; width: 16px; height: 16px; margin: 0; flex-shrink: 0;">
                <label for="date-diff-include-end" style="cursor: pointer; margin: 0; user-select: none; font-size: 12px;">Include end date (+1 day)</label>
              </div>
              <button class="tool-btn primary" id="date-diff-calc" style="width: 100%; justify-content: center;">Calculate Duration</button>
            </div>

            <!-- Subtab 2: Add/Subtract -->
            <div id="date-subpane-math" class="date-subpane hidden">
              <div class="form-group" style="margin-top: 10px; margin-bottom: 10px;">
                <label for="date-math-start">Base Date</label>
                <input type="date" id="date-math-start" class="form-input" style="width: 100%; box-sizing: border-box; min-width: 0;">
              </div>
              <div class="form-group" style="margin-bottom: 10px;">
                <label for="date-math-op">Operation</label>
                <select class="form-select" id="date-math-op" style="width: 100%; box-sizing: border-box; min-width: 0;">
                  <option value="add" selected>Add Time (+)</option>
                  <option value="sub">Subtract Time (-)</option>
                </select>
              </div>
              <div class="date-math-grid">
                <div class="form-group date-math-col">
                  <label for="date-math-years">Years</label>
                  <input type="number" id="date-math-years" class="form-input date-number-input" min="0" value="0">
                </div>
                <div class="form-group date-math-col">
                  <label for="date-math-months">Months</label>
                  <input type="number" id="date-math-months" class="form-input date-number-input" min="0" value="0">
                </div>
                <div class="form-group date-math-col">
                  <label for="date-math-weeks">Weeks</label>
                  <input type="number" id="date-math-weeks" class="form-input date-number-input" min="0" value="0">
                </div>
                <div class="form-group date-math-col">
                  <label for="date-math-days">Days</label>
                  <input type="number" id="date-math-days" class="form-input date-number-input" min="0" value="0">
                </div>
              </div>
              <button class="tool-btn primary" id="date-math-calc" style="width: 100%; justify-content: center;">Calculate Date</button>
            </div>
          </div>
        </div>

        <!-- Output Result Panel (Right) -->
        <div class="tool-panel" style="flex: 1.2;">
          <div class="panel-header">
            <h3>Calculated Result</h3>
            <button class="tool-btn accent-emerald" id="datetime-copy-btn">
              <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy Result
            </button>
          </div>

          <!-- Epoch Results (Visible for Epoch) -->
          <div id="output-epoch-group" style="display: flex; flex-direction: column; gap: 12px; width: 100%;">
            <div class="form-group">
              <label>UTC Datetime</label>
              <input type="text" id="epoch-output-utc" class="form-input" readonly style="font-family: var(--font-mono); font-size: 12px;" aria-label="UTC Output">
            </div>
            <div class="form-group">
              <label>Local Datetime</label>
              <input type="text" id="epoch-output-local" class="form-input" readonly style="font-family: var(--font-mono); font-size: 12px;" aria-label="Local Output">
            </div>
            <div class="form-group">
              <label>Unix Epoch (Seconds)</label>
              <input type="text" id="date-output-seconds" class="form-input" readonly style="font-family: var(--font-mono); font-size: 12px;" aria-label="Epoch Seconds Output">
            </div>
            <div class="form-group">
              <label>Unix Epoch (Milliseconds)</label>
              <input type="text" id="date-output-millis" class="form-input" readonly style="font-family: var(--font-mono); font-size: 12px;" aria-label="Epoch Milliseconds Output">
            </div>
          </div>

          <!-- Date Calculator Results (Visible for Date Calc) -->
          <div id="output-date-group" class="hidden" style="display: flex; flex-direction: column; gap: 15px; width: 100%;">
            <div id="date-result-placeholder" style="padding: 24px; text-align: center; color: var(--text-muted); border: 1px dashed var(--border-color); border-radius: 8px;">
              Input values and click Calculate to display result.
            </div>

            <div id="date-result-box" style="display: none; flex-direction: column; gap: 12px;">
              <!-- Duration Outputs -->
              <div id="result-diff-group" style="display: none; flex-direction: column; gap: 10px;">
                <div class="gradient-visualizer" style="padding: 12px; border-radius: 8px; text-align: center;">
                  <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: bold;">Total Duration</div>
                  <div style="font-size: 26px; font-weight: 800; color: var(--accent-cyan); margin-top: 4px;" id="res-diff-total-days">0 Days</div>
                  <div style="font-size: 12px; color: var(--text-color); margin-top: 2px;" id="res-diff-breakdown">0 years, 0 months, 0 days</div>
                </div>

                <div class="form-group">
                  <label>Alternative Units</label>
                  <div style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; margin-top: 6px; width: 100%; box-sizing: border-box;">
                    <div class="tool-badge" style="padding: 6px; display: flex; flex-direction: column; align-items: center; min-width: 0;">
                      <span style="font-size: 9px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Weeks</span>
                      <span style="font-size: 12px; font-weight: 700;" id="res-diff-weeks">0</span>
                    </div>
                    <div class="tool-badge" style="padding: 6px; display: flex; flex-direction: column; align-items: center; min-width: 0;">
                      <span style="font-size: 9px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Hours</span>
                      <span style="font-size: 12px; font-weight: 700;" id="res-diff-hours">0</span>
                    </div>
                    <div class="tool-badge" style="padding: 6px; display: flex; flex-direction: column; align-items: center; min-width: 0;">
                      <span style="font-size: 9px; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Minutes</span>
                      <span style="font-size: 12px; font-weight: 700;" id="res-diff-minutes">0</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Math Outputs -->
              <div id="result-math-group" style="display: none; flex-direction: column; gap: 10px; width: 100%; box-sizing: border-box;">
                <div class="gradient-visualizer" style="padding: 16px 12px; border-radius: 8px; text-align: center; width: 100%; box-sizing: border-box;">
                  <div style="font-size: 10px; color: var(--text-muted); text-transform: uppercase; font-weight: bold;">Computed Date</div>
                  <div style="font-size: 18px; font-weight: 800; color: var(--accent-cyan); margin-top: 6px; word-break: break-word; overflow-wrap: break-word;" id="res-math-date">Monday, January 1, 2026</div>
                  <div style="font-size: 11px; color: var(--text-color); margin-top: 4px;" id="res-math-relative">Today</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Guide (Bottom) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="datetime-guide-title">Quick Guide: Unix Timestamp & Epoch Converter</span>
            </div>
            <button class="tool-btn secondary" id="datetime-load-sample" style="font-size: 11px;">Load Sample</button>
          </div>
          <div class="tool-guide-steps" id="datetime-guide-steps">
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
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
          border-color: rgba(0, 242, 254, 0.3);
          box-shadow: 0 0 8px rgba(0, 242, 254, 0.1);
        }
        .tab-control-panel {
          margin-top: 12px;
          border-top: 1px solid var(--border-color);
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tab-control-panel.hidden {
          display: none !important;
        }
        .date-math-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin-bottom: 14px;
          width: 100%;
          box-sizing: border-box;
        }
        .date-math-col {
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
          gap: 4px;
        }
        .date-math-col label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .date-number-input {
          min-width: 0;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          padding: 8px 4px;
          font-size: 14px;
        }
        .date-subtab-btn {
          flex: 1;
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          padding: 8px 6px;
          border: none;
          background: transparent;
          cursor: pointer;
          color: var(--text-muted);
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
          border-radius: 4px 4px 0 0;
        }
        .date-subtab-btn:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.03);
        }
        .date-subtab-btn.active {
          color: var(--accent-cyan) !important;
          border-bottom-color: var(--accent-cyan) !important;
          font-weight: 700;
          background: rgba(0, 242, 254, 0.06);
        }
        .date-subpane.hidden {
          display: none !important;
        }
        @media (max-width: 540px) {
          .date-math-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px 8px;
          }
        }
      </style>
    `;
  },
  init(container, appInstance) {
    const tabs = container.querySelectorAll("#datetime-tabs .keyboard-tab");
    const panelEpoch = container.querySelector("#panel-epoch-controls");
    const panelDate = container.querySelector("#panel-date-controls");
    const outputEpochGroup = container.querySelector("#output-epoch-group");
    const outputDateGroup = container.querySelector("#output-date-group");

    const guideTitle = container.querySelector("#datetime-guide-title");
    const guideSteps = container.querySelector("#datetime-guide-steps");

    const initialTab = appInstance.activeSubtab || 'epoch';
    appInstance.activeSubtab = null;
    let activeTab = initialTab;

    const guides = {
      epoch: {
        title: "Quick Guide: Unix Timestamp & Epoch Converter",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Epoch to Date</strong>: Enter a Unix timestamp (seconds or milliseconds) and press <strong>Convert to Date</strong>.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Date to Epoch</strong>: Enter an ISO date string and click <strong>Convert to Timestamp</strong> to extract seconds/ms values.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Save Values</strong>: Use the Copy button next to the results to extract the date or timestamp.</div>
          </div>
        `
      },
      date: {
        title: "Quick Guide: Date & Duration Calculator",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Duration Mode</strong>: Enter start and end dates. Toggle end-date inclusion (+1 day) and calculate precise offsets.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Add/Subtract Mode</strong>: Select base date, operation (add/subtract), specify year/month/week/day parameters.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Relative Result</strong>: The computed date is rendered along with a relative indicator showing how many days/weeks offset.</div>
          </div>
        `
      }
    };

    const switchTab = (tabId, updateRoute = true) => {
      activeTab = tabId;
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
      if (typeof appInstance?.syncActiveCapabilityChip === "function") {
        appInstance.syncActiveCapabilityChip(container, tabId);
      }
      if (typeof appInstance?.injectGuideBenefits === "function") {
        appInstance.injectGuideBenefits(container, "datetime-suite", tabId);
      }

      panelEpoch.classList.toggle("hidden", tabId !== "epoch");
      panelDate.classList.toggle("hidden", tabId !== "date");
      outputEpochGroup.classList.toggle("hidden", tabId !== "epoch");
      outputDateGroup.classList.toggle("hidden", tabId !== "date");

      if (guideTitle && guideSteps) {
        guideTitle.innerText = guides[tabId].title;
        guideSteps.innerHTML = guides[tabId].steps;
      }

      if (updateRoute && appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("datetime-suite", tabId, { pushHistory: true });
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab, true));
    });

    if (appInstance && typeof appInstance.registerTabSwitcher === "function") {
      appInstance.registerTabSwitcher("datetime-suite", (tabId) => switchTab(tabId, false));
    }

    switchTab(initialTab, false);
    const requestedSubtool = appInstance.activeSubtool;
    if (requestedSubtool && appInstance && typeof appInstance.syncSubtab === "function") {
      appInstance.syncSubtab("datetime-suite", requestedSubtool, { pushHistory: false, replaceHistory: true });
    }

    // ==========================================
    // EPOCH CONVERTER CODE
    // ==========================================
    const epInput = container.querySelector("#epoch-input");
    const epUtc = container.querySelector("#epoch-output-utc");
    const epLocal = container.querySelector("#epoch-output-local");
    const dateInput = container.querySelector("#date-input");
    const dateSecs = container.querySelector("#date-output-seconds");
    const dateMillis = container.querySelector("#date-output-millis");

    let lastEpochResultText = "";

    const convertTimestamp = () => {
      if (!epInput) return;
      const val = String(epInput.value ?? "").trim();
      if (!val) return;
      let ts = parseInt(val, 10);
      if (isNaN(ts)) {
        appInstance.showToast("Invalid numeric timestamp", "error");
        return;
      }
      if (val.length === 10) ts = ts * 1000; // auto-seconds detection

      const date = new Date(ts);
      if (isNaN(date.getTime())) {
        appInstance.showToast("Invalid date value", "error");
        return;
      }

      epUtc.value = date.toUTCString();
      epLocal.value = date.toString();
      
      // Sync date fields on right side too
      dateSecs.value = Math.floor(ts / 1000);
      dateMillis.value = ts;
      
      lastEpochResultText = `UTC: ${epUtc.value}\nLocal: ${epLocal.value}\nTimestamp: ${dateSecs.value}`;
      appInstance.showToast("Converted to Date!", "success");
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

      // Sync epoch inputs on left side too
      epInput.value = dateSecs.value;
      const d = new Date(parsed);
      epUtc.value = d.toUTCString();
      epLocal.value = d.toString();

      lastEpochResultText = `Timestamp (Seconds): ${dateSecs.value}\nTimestamp (Millis): ${dateMillis.value}`;
      appInstance.showToast("Converted to Unix Epoch!", "success");
    });

    // ==========================================
    // DATE CALCULATOR CODE
    // ==========================================
    const dateSubtabBtns = container.querySelectorAll(".date-subtab-btn");
    const dateSubpanes = {
      diff: container.querySelector("#date-subpane-diff"),
      math: container.querySelector("#date-subpane-math")
    };

    const diffStart = container.querySelector("#date-diff-start");
    const diffEnd = container.querySelector("#date-diff-end");
    const diffInclude = container.querySelector("#date-diff-include-end");

    const mathStart = container.querySelector("#date-math-start");
    const mathOp = container.querySelector("#date-math-op");
    const mathYears = container.querySelector("#date-math-years");
    const mathMonths = container.querySelector("#date-math-months");
    const mathWeeks = container.querySelector("#date-math-weeks");
    const mathDays = container.querySelector("#date-math-days");

    const placeholder = container.querySelector("#date-result-placeholder");
    const resultBox = container.querySelector("#date-result-box");
    const groupDiff = container.querySelector("#result-diff-group");
    const resDiffTotalDays = container.querySelector("#res-diff-total-days");
    const resDiffBreakdown = container.querySelector("#res-diff-breakdown");
    const resDiffWeeks = container.querySelector("#res-diff-weeks");
    const resDiffHours = container.querySelector("#res-diff-hours");
    const resDiffMinutes = container.querySelector("#res-diff-minutes");

    const groupMath = container.querySelector("#result-math-group");
    const resMathDate = container.querySelector("#res-math-date");
    const resMathRelative = container.querySelector("#res-math-relative");

    let lastCalcResultText = "";

    // Set defaults
    const todayStr = new Date().toISOString().split("T")[0];
    if (diffStart) diffStart.value = todayStr;
    if (diffEnd) diffEnd.value = todayStr;
    if (mathStart) mathStart.value = todayStr;

    // Subtab switching
    let activeSubpane = "diff";
    dateSubtabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        dateSubtabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        activeSubpane = btn.getAttribute("data-subtab");
        Object.keys(dateSubpanes).forEach(k => {
          dateSubpanes[k].classList.toggle("hidden", k !== activeSubpane);
        });

        placeholder.style.display = "block";
        resultBox.style.display = "none";
      });
    });

    const getRelativeDaysText = (daysDiff) => {
      if (daysDiff === 0) return "Today";
      const abs = Math.abs(daysDiff);
      return daysDiff > 0 ? `In ${abs} day${abs !== 1 ? 's' : ''}` : `${abs} day${abs !== 1 ? 's' : ''} ago`;
    };

    container.querySelector("#date-diff-calc")?.addEventListener("click", () => {
      if (!diffStart.value || !diffEnd.value) {
        appInstance.showToast("Please select start & end dates", "warning");
        return;
      }
      const d1 = new Date(diffStart.value);
      const d2 = new Date(diffEnd.value);
      let adjustedD2 = new Date(d2);
      if (diffInclude.checked) {
        adjustedD2.setDate(adjustedD2.getDate() + 1);
      }

      const diffMs = adjustedD2.getTime() - d1.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

      placeholder.style.display = "none";
      resultBox.style.display = "flex";
      groupDiff.style.display = "flex";
      groupMath.style.display = "none";

      const absDays = Math.abs(diffDays);
      resDiffTotalDays.innerText = `${absDays} Day${absDays !== 1 ? 's' : ''}`;

      // Breakdown calculation
      const early = diffMs < 0 ? adjustedD2 : d1;
      const late = diffMs < 0 ? d1 : adjustedD2;

      let y = late.getFullYear() - early.getFullYear();
      let m = late.getMonth() - early.getMonth();
      let dy = late.getDate() - early.getDate();

      if (dy < 0) {
        m--;
        const prevMonth = new Date(late.getFullYear(), late.getMonth(), 0);
        dy += prevMonth.getDate();
      }
      if (m < 0) {
        y--;
        m += 12;
      }

      const breakdown = `${diffMs < 0 ? '-' : ''}${y} year${y !== 1 ? 's' : ''}, ${m} month${m !== 1 ? 's' : ''}, ${dy} day${dy !== 1 ? 's' : ''}`;
      resDiffBreakdown.innerText = breakdown;

      resDiffWeeks.innerText = (absDays / 7).toFixed(1);
      resDiffHours.innerText = (absDays * 24).toLocaleString();
      resDiffMinutes.innerText = (absDays * 24 * 60).toLocaleString();

      lastCalcResultText = `Duration: ${absDays} days (${breakdown})\nStart: ${diffStart.value}\nEnd: ${diffEnd.value}`;
      appInstance.showToast("Duration Calculated!", "success");
    });

    container.querySelector("#date-math-calc")?.addEventListener("click", () => {
      if (!mathStart.value) {
        appInstance.showToast("Please enter a base date", "warning");
        return;
      }
      const d = new Date(mathStart.value);
      const factor = mathOp.value === "sub" ? -1 : 1;

      const y = parseInt(mathYears.value, 10) || 0;
      const m = parseInt(mathMonths.value, 10) || 0;
      const w = parseInt(mathWeeks.value, 10) || 0;
      const dy = parseInt(mathDays.value, 10) || 0;

      d.setFullYear(d.getFullYear() + (y * factor));
      d.setMonth(d.getMonth() + (m * factor));
      d.setDate(d.getDate() + ((dy + w * 7) * factor));

      placeholder.style.display = "none";
      resultBox.style.display = "flex";
      groupDiff.style.display = "none";
      groupMath.style.display = "flex";

      const formatted = d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      resMathDate.innerText = formatted;

      const today = new Date();
      today.setHours(0,0,0,0);
      const temp = new Date(d);
      temp.setHours(0,0,0,0);
      const diffDays = Math.round((temp.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      resMathRelative.innerText = getRelativeDaysText(diffDays);

      lastCalcResultText = `Calculated Date: ${formatted} (${resMathRelative.innerText})`;
      appInstance.showToast("Date Offset Computed!", "success");
    });

    // ==========================================
    // SHARED COPY & LOAD SAMPLE
    // ==========================================
    container.querySelector("#datetime-copy-btn")?.addEventListener("click", () => {
      const textToCopy = activeTab === "epoch" ? lastEpochResultText : lastCalcResultText;
      if (textToCopy) {
        appInstance.copyText(textToCopy);
      } else {
        appInstance.showToast("No calculation results to copy!", "warning");
      }
    });

    container.querySelector("#datetime-load-sample")?.addEventListener("click", () => {
      if (activeTab === "epoch") {
        epInput.value = "1700000000";
        dateInput.value = "2023-11-14 22:13:20";
        convertTimestamp();
        container.querySelector("#date-convert-btn")?.click();
        appInstance.showToast("Loaded sample Epoch data!", "info");
      } else {
        if (activeSubpane === "diff") {
          diffStart.value = "2024-01-01";
          diffEnd.value = "2026-06-23";
          diffInclude.checked = true;
          container.querySelector("#date-diff-calc")?.click();
          appInstance.showToast("Loaded sample date interval!", "info");
        } else {
          mathStart.value = "2026-06-23";
          mathOp.value = "add";
          mathYears.value = "1";
          mathMonths.value = "6";
          mathWeeks.value = "0";
          mathDays.value = "10";
          container.querySelector("#date-math-calc")?.click();
          appInstance.showToast("Loaded sample date offset parameters!", "info");
        }
      }
    });

    // Run initial rendering
    epInput.value = Math.floor(Date.now() / 1000);
    dateInput.value = new Date().toISOString().slice(0, 19).replace('T', ' ');
    convertTimestamp();
  }
};
