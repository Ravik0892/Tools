export default {
  id: "date-calculator",
  name: "Date & Duration Calculator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration/Control Panel -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Date Tools</h3>
          </div>
          
          <div class="tabs-container" style="margin-bottom: 16px;">
            <div class="tabs-header" style="display: flex; gap: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
              <button class="tool-btn active-tab date-tab-btn" data-tab="diff" style="flex: 1; justify-content: center;">Duration</button>
              <button class="tool-btn date-tab-btn" data-tab="math" style="flex: 1; justify-content: center;">Add/Subtract</button>
            </div>
          </div>

          <!-- Tab 1: Difference Pane inputs -->
          <div id="date-pane-diff" class="date-content-pane">
            <div class="form-group" style="margin-bottom: 12px;">
              <label for="date-diff-start">Start Date</label>
              <input type="date" id="date-diff-start" class="form-input" style="width: 100%;">
            </div>
            
            <div class="form-group" style="margin-bottom: 16px;">
              <label for="date-diff-end">End Date</label>
              <input type="date" id="date-diff-end" class="form-input" style="width: 100%;">
            </div>

            <div class="form-group" style="margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="date-diff-include-end" style="cursor: pointer; width: 16px; height: 16px;">
              <label for="date-diff-include-end" style="cursor: pointer; margin: 0; user-select: none;">Include end date (adds 1 day)</label>
            </div>

            <div class="form-row">
              <button class="tool-btn primary" id="date-diff-calc" style="width: 100%; justify-content: center;">Calculate Duration</button>
            </div>
          </div>

          <!-- Tab 2: Add/Subtract Pane inputs -->
          <div id="date-pane-math" class="date-content-pane" style="display: none;">
            <div class="form-group" style="margin-bottom: 12px;">
              <label for="date-math-start">Base Date</label>
              <input type="date" id="date-math-start" class="form-input" style="width: 100%;">
            </div>

            <div class="form-group" style="margin-bottom: 12px;">
              <label for="date-math-op">Operation</label>
              <select class="form-select" id="date-math-op" style="width: 100%;">
                <option value="add" selected>Add Time (+)</option>
                <option value="sub">Subtract Time (-)</option>
              </select>
            </div>

            <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
              <div class="form-group">
                <label for="date-math-years">Years</label>
                <input type="number" id="date-math-years" class="form-input" min="0" value="0">
              </div>
              <div class="form-group">
                <label for="date-math-months">Months</label>
                <input type="number" id="date-math-months" class="form-input" min="0" value="0">
              </div>
            </div>

            <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
              <div class="form-group">
                <label for="date-math-weeks">Weeks</label>
                <input type="number" id="date-math-weeks" class="form-input" min="0" value="0">
              </div>
              <div class="form-group">
                <label for="date-math-days">Days</label>
                <input type="number" id="date-math-days" class="form-input" min="0" value="0">
              </div>
            </div>

            <div class="form-row">
              <button class="tool-btn primary" id="date-math-calc" style="width: 100%; justify-content: center;">Calculate Date</button>
            </div>
          </div>
        </div>

        <!-- Result Panel -->
        <div class="tool-panel" style="flex: 2;">
          <div class="panel-header">
            <h3>Result</h3>
            <button class="tool-btn secondary" id="date-result-copy" style="font-size: 11px; padding: 4px 8px;" disabled>Copy Result</button>
          </div>

          <div id="date-result-placeholder" style="padding: 32px 16px; text-align: center; color: var(--text-muted); border: 1px dashed var(--border-color); border-radius: 8px;">
            Input parameters and click Calculate to view results.
          </div>

          <div id="date-result-box" style="display: none; flex-direction: column; gap: 16px;">
            <!-- Duration Results -->
            <div id="result-diff-group" style="display: none; flex-direction: column; gap: 12px;">
              <div class="gradient-visualizer" style="padding: 16px; border-radius: 8px; text-align: center;">
                <div style="font-size: 13px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Total Duration</div>
                <div style="font-size: 32px; font-weight: 800; color: var(--accent-cyan); margin-top: 8px;" id="res-diff-total-days">0 Days</div>
                <div style="font-size: 14px; color: var(--text-color); margin-top: 4px; font-weight: 500;" id="res-diff-breakdown">0 years, 0 months, 0 days</div>
              </div>

              <div class="form-group">
                <label>Alternative Units</label>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 8px; margin-top: 8px;">
                  <div class="tool-badge" style="padding: 8px 12px; display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 10px; color: var(--text-muted);">Weeks</span>
                    <span style="font-size: 14px; font-weight: 700; color: var(--text-color); margin-top: 2px;" id="res-diff-weeks">0</span>
                  </div>
                  <div class="tool-badge" style="padding: 8px 12px; display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 10px; color: var(--text-muted);">Hours</span>
                    <span style="font-size: 14px; font-weight: 700; color: var(--text-color); margin-top: 2px;" id="res-diff-hours">0</span>
                  </div>
                  <div class="tool-badge" style="padding: 8px 12px; display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 10px; color: var(--text-muted);">Minutes</span>
                    <span style="font-size: 14px; font-weight: 700; color: var(--text-color); margin-top: 2px;" id="res-diff-minutes">0</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Math Results -->
            <div id="result-math-group" style="display: none; flex-direction: column; gap: 12px;">
              <div class="gradient-visualizer" style="padding: 24px 16px; border-radius: 8px; text-align: center;">
                <div style="font-size: 13px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Computed Date</div>
                <div style="font-size: 22px; font-weight: 800; color: var(--accent-cyan); margin-top: 12px;" id="res-math-date">Monday, January 1, 2026</div>
                <div style="font-size: 13px; color: var(--text-color); margin-top: 6px; font-weight: 500;" id="res-math-relative">Today</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Guide -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Date Math Guidelines</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Duration Mode</strong>: Computes precise interval metrics. Enable the checkbox if you want to include both the start and end dates in the count.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Addition Mode</strong>: Offset days/weeks/months/years from a specific day. Useful for deadline calculations.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Local Processing</strong>: Dates are processed locally using standard browser calendars, conforming to local timezone boundaries.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const tabBtns = container.querySelectorAll(".date-tab-btn");
    const panes = {
      diff: container.querySelector("#date-pane-diff"),
      math: container.querySelector("#date-pane-math")
    };

    // Diff inputs
    const diffStart = container.querySelector("#date-diff-start");
    const diffEnd = container.querySelector("#date-diff-end");
    const diffInclude = container.querySelector("#date-diff-include-end");
    const diffBtn = container.querySelector("#date-diff-calc");

    // Math inputs
    const mathStart = container.querySelector("#date-math-start");
    const mathOp = container.querySelector("#date-math-op");
    const mathYears = container.querySelector("#date-math-years");
    const mathMonths = container.querySelector("#date-math-months");
    const mathWeeks = container.querySelector("#date-math-weeks");
    const mathDays = container.querySelector("#date-math-days");
    const mathBtn = container.querySelector("#date-math-calc");

    // Outputs
    const placeholder = container.querySelector("#date-result-placeholder");
    const resultBox = container.querySelector("#date-result-box");
    const copyBtn = container.querySelector("#date-result-copy");

    const groupDiff = container.querySelector("#result-diff-group");
    const resDiffTotalDays = container.querySelector("#res-diff-total-days");
    const resDiffBreakdown = container.querySelector("#res-diff-breakdown");
    const resDiffWeeks = container.querySelector("#res-diff-weeks");
    const resDiffHours = container.querySelector("#res-diff-hours");
    const resDiffMinutes = container.querySelector("#res-diff-minutes");

    const groupMath = container.querySelector("#result-math-group");
    const resMathDate = container.querySelector("#res-math-date");
    const resMathRelative = container.querySelector("#res-math-relative");

    let lastCalculatedText = "";

    // Set today as default for date inputs
    const todayStr = new Date().toISOString().split("T")[0];
    if (diffStart) diffStart.value = todayStr;
    if (diffEnd) diffEnd.value = todayStr;
    if (mathStart) mathStart.value = todayStr;

    // Tabs logic
    let activeMode = "diff";
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active-tab"));
        btn.classList.add("active-tab");

        const targetTab = btn.getAttribute("data-tab");
        activeMode = targetTab;

        Object.keys(panes).forEach(k => {
          panes[k].style.display = (k === targetTab) ? "block" : "none";
        });

        // Clear result on tab switch
        placeholder.style.display = "block";
        resultBox.style.display = "none";
        copyBtn.disabled = true;
      });
    });

    // Helper: format relative days count
    const getRelativeDaysText = (daysDiff) => {
      if (daysDiff === 0) return "Today";
      const abs = Math.abs(daysDiff);
      if (daysDiff > 0) {
        return `In ${abs} day${abs !== 1 ? 's' : ''}`;
      } else {
        return `${abs} day${abs !== 1 ? 's' : ''} ago`;
      }
    };

    // Calculate duration logic
    const calculateDuration = () => {
      if (!diffStart.value || !diffEnd.value) {
        appInstance.showToast("Please enter both start and end dates", "warning");
        return;
      }

      // Read dates locally (timezone independent calculation)
      const d1 = new Date(diffStart.value);
      const d2 = new Date(diffEnd.value);

      let adjustedD2 = new Date(d2);
      if (diffInclude.checked) {
        adjustedD2.setDate(adjustedD2.getDate() + 1);
      }

      // Convert differences in millisecond offsets
      const diffMs = adjustedD2.getTime() - d1.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      // Display outputs
      placeholder.style.display = "none";
      resultBox.style.display = "flex";
      groupDiff.style.display = "flex";
      groupMath.style.display = "none";
      copyBtn.disabled = false;

      resDiffTotalDays.innerText = `${Math.abs(diffDays)} Day${Math.abs(diffDays) !== 1 ? 's' : ''}`;

      // Calculate breakdown (years, months, days)
      const start = new Date(d1);
      const end = new Date(adjustedD2);
      const isReverse = end < start;

      const early = isReverse ? end : start;
      const late = isReverse ? start : end;

      let yDiff = late.getFullYear() - early.getFullYear();
      let mDiff = late.getMonth() - early.getMonth();
      let dayDiff = late.getDate() - early.getDate();

      if (dayDiff < 0) {
        mDiff--;
        // Number of days in previous month relative to late date
        const prevMonth = new Date(late.getFullYear(), late.getMonth(), 0);
        dayDiff += prevMonth.getDate();
      }

      if (mDiff < 0) {
        yDiff--;
        mDiff += 12;
      }

      const yLabel = yDiff === 1 ? "year" : "years";
      const mLabel = mDiff === 1 ? "month" : "months";
      const dLabel = dayDiff === 1 ? "day" : "days";
      const breakdownText = `${isReverse ? '-' : ''}${yDiff} ${yLabel}, ${mDiff} ${mLabel}, ${dayDiff} ${dLabel}`;
      resDiffBreakdown.innerText = breakdownText;

      // Alternative units
      const absDays = Math.abs(diffDays);
      const wVal = (absDays / 7).toFixed(1);
      const hVal = Math.round(absDays * 24).toLocaleString();
      const minVal = Math.round(absDays * 24 * 60).toLocaleString();

      resDiffWeeks.innerText = wVal;
      resDiffHours.innerText = hVal;
      resDiffMinutes.innerText = minVal;

      lastCalculatedText = `Duration: ${resDiffTotalDays.innerText} (${breakdownText})\nStart: ${diffStart.value}\nEnd: ${diffEnd.value}`;
      appInstance.showToast("Duration calculated!", "success");
    };

    // Calculate date math logic
    const calculateDateMath = () => {
      if (!mathStart.value) {
        appInstance.showToast("Please enter a base date", "warning");
        return;
      }

      const d = new Date(mathStart.value);
      const factor = mathOp.value === "sub" ? -1 : 1;

      const y = parseInt(mathYears.value, 10) || 0;
      const m = parseInt(mathMonths.value, 10) || 0;
      const w = parseInt(mathWeeks.value, 10) || 0;
      const days = parseInt(mathDays.value, 10) || 0;

      d.setFullYear(d.getFullYear() + (y * factor));
      d.setMonth(d.getMonth() + (m * factor));
      d.setDate(d.getDate() + ((days + w * 7) * factor));

      // Display outputs
      placeholder.style.display = "none";
      resultBox.style.display = "flex";
      groupDiff.style.display = "none";
      groupMath.style.display = "flex";
      copyBtn.disabled = false;

      const formatted = d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      resMathDate.innerText = formatted;

      // Relative to today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tempD = new Date(d);
      tempD.setHours(0, 0, 0, 0);

      const relDays = Math.round((tempD.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      resMathRelative.innerText = getRelativeDaysText(relDays);

      lastCalculatedText = `Computed Date: ${formatted} (${resMathRelative.innerText})`;
      appInstance.showToast("Date calculated!", "success");
    };

    diffBtn.addEventListener("click", calculateDuration);
    mathBtn.addEventListener("click", calculateDateMath);

    copyBtn.addEventListener("click", () => {
      if (lastCalculatedText) {
        appInstance.copyText(lastCalculatedText);
      }
    });
  }
};
