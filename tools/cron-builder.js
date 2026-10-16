// OmniTool Hub - Visual Cron Expression Builder & Explainer
// Generates, parses, explains, and schedules cron expressions 100% client-side.

export default {
  id: "cron-builder",
  name: "Visual Cron Expression Builder & Explainer",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Visual Cron Expression Builder</h3>
            <button class="tool-btn secondary" id="cron-reset-btn" style="font-size: 11.5px;">Reset Default</button>
          </div>

          <!-- Cron Expression Input Bar -->
          <div class="form-group">
            <label style="font-size: 12px; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase;">Standard 5-Field Cron String</label>
            <div style="display: flex; gap: 8px;">
              <input type="text" id="cron-string-input" class="input-text" value="*/15 * * * *" style="font-family: var(--font-mono); font-size: 18px; font-weight: 700; letter-spacing: 2px; text-align: center; color: var(--accent-cyan); height: 46px;" aria-label="Cron Expression">
              <button class="tool-btn primary" id="cron-copy-str-btn" style="white-space: nowrap; height: 46px; padding: 0 16px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>

          <!-- Presets Section -->
          <div class="form-group" style="margin-top: 14px;">
            <label style="font-size: 11.5px; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">Common Presets</label>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
              <button class="tool-btn secondary cron-preset-btn" data-cron="* * * * *" style="font-size: 11px; padding: 4px 10px;">Every Minute</button>
              <button class="tool-btn secondary cron-preset-btn" data-cron="*/5 * * * *" style="font-size: 11px; padding: 4px 10px;">Every 5 Mins</button>
              <button class="tool-btn secondary cron-preset-btn" data-cron="*/15 * * * *" style="font-size: 11px; padding: 4px 10px;">Every 15 Mins</button>
              <button class="tool-btn secondary cron-preset-btn" data-cron="0 * * * *" style="font-size: 11px; padding: 4px 10px;">Every Hour</button>
              <button class="tool-btn secondary cron-preset-btn" data-cron="0 0 * * *" style="font-size: 11px; padding: 4px 10px;">Midnight Daily</button>
              <button class="tool-btn secondary cron-preset-btn" data-cron="0 9 * * 1-5" style="font-size: 11px; padding: 4px 10px;">Weekdays at 9AM</button>
              <button class="tool-btn secondary cron-preset-btn" data-cron="0 0 1 * *" style="font-size: 11px; padding: 4px 10px;">1st of Month</button>
            </div>
          </div>

          <!-- Visual Segment Pickers -->
          <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 14px;">
            <!-- Minutes -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">1. Minute (0 - 59)</span>
                <span id="cron-badge-min" style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-cyan); font-weight: 700;">*/15</span>
              </div>
              <select id="cron-sel-min" class="input-select" style="width: 100%; height: 36px; font-size: 12.5px;">
                <option value="*">Every minute (*)</option>
                <option value="*/2">Every 2 minutes (*/2)</option>
                <option value="*/5">Every 5 minutes (*/5)</option>
                <option value="*/10">Every 10 minutes (*/10)</option>
                <option value="*/15" selected>Every 15 minutes (*/15)</option>
                <option value="*/30">Every 30 minutes (*/30)</option>
                <option value="0">At minute 0 (on the hour)</option>
                <option value="30">At minute 30 (half-past)</option>
              </select>
            </div>

            <!-- Hours -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">2. Hour (0 - 23)</span>
                <span id="cron-badge-hour" style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-cyan); font-weight: 700;">*</span>
              </div>
              <select id="cron-sel-hour" class="input-select" style="width: 100%; height: 36px; font-size: 12.5px;">
                <option value="*" selected>Every hour (*)</option>
                <option value="*/2">Every 2 hours (*/2)</option>
                <option value="*/4">Every 4 hours (*/4)</option>
                <option value="*/6">Every 6 hours (*/6)</option>
                <option value="*/12">Every 12 hours (*/12)</option>
                <option value="0">At midnight (00:00)</option>
                <option value="9">At 9:00 AM (09:00)</option>
                <option value="12">At 12:00 PM (Noon)</option>
                <option value="18">At 6:00 PM (18:00)</option>
                <option value="9-17">Business hours (9 AM - 5 PM)</option>
              </select>
            </div>

            <!-- Day of Month -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">3. Day of Month (1 - 31)</span>
                <span id="cron-badge-dom" style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-cyan); font-weight: 700;">*</span>
              </div>
              <select id="cron-sel-dom" class="input-select" style="width: 100%; height: 36px; font-size: 12.5px;">
                <option value="*" selected>Every day (*)</option>
                <option value="1">1st day of month (1)</option>
                <option value="15">15th day of month (15)</option>
                <option value="1,15">1st and 15th of month (1,15)</option>
                <option value="*/2">Every 2 days (*/2)</option>
              </select>
            </div>

            <!-- Month -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">4. Month (1 - 12)</span>
                <span id="cron-badge-month" style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-cyan); font-weight: 700;">*</span>
              </div>
              <select id="cron-sel-month" class="input-select" style="width: 100%; height: 36px; font-size: 12.5px;">
                <option value="*" selected>Every month (*)</option>
                <option value="*/3">Every quarter / 3 months (*/3)</option>
                <option value="*/6">Every half year (*/6)</option>
                <option value="1">January only (1)</option>
                <option value="6">June only (6)</option>
                <option value="12">December only (12)</option>
              </select>
            </div>

            <!-- Day of Week -->
            <div style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">5. Day of Week (0 - 6 or Sun - Sat)</span>
                <span id="cron-badge-dow" style="font-family: var(--font-mono); font-size: 12px; color: var(--accent-cyan); font-weight: 700;">*</span>
              </div>
              <select id="cron-sel-dow" class="input-select" style="width: 100%; height: 36px; font-size: 12.5px;">
                <option value="*" selected>Every day of week (*)</option>
                <option value="1-5">Monday through Friday (1-5)</option>
                <option value="0,6">Weekends only (Saturday & Sunday)</option>
                <option value="1">Monday only (1)</option>
                <option value="5">Friday only (5)</option>
                <option value="0">Sunday only (0)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="tool-panel" style="gap: 18px;">
          <div class="panel-header">
            <h3>Human Explanation &amp; Next Run Schedule</h3>
          </div>

          <!-- Human Readable Meaning Card -->
          <div class="glass-card" style="padding: 20px; border-radius: 12px; background: rgba(0, 242, 254, 0.04); border: 1px solid rgba(0, 242, 254, 0.2);">
            <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px; color: var(--accent-cyan); margin-bottom: 6px;">
              Natural English Translation
            </div>
            <div id="cron-explanation" style="font-size: 18px; font-weight: 700; color: var(--text-main); line-height: 1.4;">
              “At every 15th minute, every hour, on every day.”
            </div>
          </div>

          <!-- Next 5 Runs Schedule -->
          <div>
            <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
              <span>Upcoming 5 Execution Timestamps</span>
              <span style="font-size: 11px; color: var(--accent-emerald);">● Local Timezone</span>
            </div>
            <div id="cron-next-runs" style="display: flex; flex-direction: column; gap: 8px;">
              <!-- Dynamic runs will be populated here -->
            </div>
          </div>

          <!-- Cron Structure Syntax Reference -->
          <div style="margin-top: 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 14px;">
            <div style="font-size: 12px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">
              Format Specification
            </div>
            <pre style="margin: 0; font-family: var(--font-mono); font-size: 11.5px; color: var(--text-muted); line-height: 1.6;">
┌───────────── Minute (0 - 59)
│ ┌─────────── Hour (0 - 23)
│ │ ┌───────── Day of Month (1 - 31)
│ │ │ ┌─────── Month (1 - 12)
│ │ │ │ ┌───── Day of Week (0 - 6, 0=Sunday)
│ │ │ │ │
* * * * *
            </pre>
          </div>
        </div>

        <!-- Guide Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Type or Click</strong>: Either type a custom 5-field cron expression in the input box, or choose from common presets and visual dropdowns.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Read Clear English</strong>: The translation box converts complex wildcards and step values into clear human sentences.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Verify Schedule</strong>: Inspect the upcoming 5 exact dates and times to verify that your scheduled job will fire when intended.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, app) {
    const inputEl = container.querySelector("#cron-string-input");
    const explanationEl = container.querySelector("#cron-explanation");
    const nextRunsEl = container.querySelector("#cron-next-runs");
    const copyBtn = container.querySelector("#cron-copy-str-btn");
    const resetBtn = container.querySelector("#cron-reset-btn");
    const presetBtns = container.querySelectorAll(".cron-preset-btn");

    const selMin = container.querySelector("#cron-sel-min");
    const selHour = container.querySelector("#cron-sel-hour");
    const selDom = container.querySelector("#cron-sel-dom");
    const selMonth = container.querySelector("#cron-sel-month");
    const selDow = container.querySelector("#cron-sel-dow");

    const badgeMin = container.querySelector("#cron-badge-min");
    const badgeHour = container.querySelector("#cron-badge-hour");
    const badgeDom = container.querySelector("#cron-badge-dom");
    const badgeMonth = container.querySelector("#cron-badge-month");
    const badgeDow = container.querySelector("#cron-badge-dow");

    const explainPart = (part, type) => {
      if (part === "*") return `every ${type}`;
      if (part.startsWith("*/")) return `every ${part.slice(2)} ${type}s`;
      if (part.includes("-")) {
        const [start, end] = part.split("-");
        return `from ${type} ${start} through ${end}`;
      }
      if (part.includes(",")) return `${type}s ${part}`;
      return `at ${type} ${part}`;
    };

    const explainCron = (m, h, dom, mon, dow) => {
      let desc = "";

      // Minute description
      if (m === "*") {
        desc += "Every minute";
      } else if (m.startsWith("*/")) {
        desc += `Every ${m.slice(2)} minutes`;
      } else {
        desc += `At minute ${m}`;
      }

      // Hour description
      if (h === "*") {
        desc += ", every hour";
      } else if (h.startsWith("*/")) {
        desc += `, every ${h.slice(2)} hours`;
      } else if (h === "0") {
        desc += `, at midnight (00:00)`;
      } else if (h.includes("-")) {
        desc += `, between hours ${h}`;
      } else {
        desc += `, at hour ${h}:00`;
      }

      // Day of month & Month
      if (dom !== "*") {
        desc += `, on day ${dom} of the month`;
      }
      if (mon !== "*") {
        const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        desc += `, in month ${monthNames[parseInt(mon)] || mon}`;
      }

      // Day of week
      if (dow === "1-5") {
        desc += `, Monday through Friday`;
      } else if (dow === "0,6" || dow === "6,0") {
        desc += `, on weekends`;
      } else if (dow !== "*") {
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        desc += `, on ${dayNames[parseInt(dow)] || 'day ' + dow}`;
      }

      return `“${desc}.”`;
    };

    const matchCronPart = (val, pattern, max) => {
      if (pattern === "*") return true;
      if (pattern.startsWith("*/")) {
        const step = parseInt(pattern.slice(2), 10);
        return step > 0 && val % step === 0;
      }
      if (pattern.includes(",")) {
        return pattern.split(",").some(p => matchCronPart(val, p.trim(), max));
      }
      if (pattern.includes("-")) {
        const [start, end] = pattern.split("-").map(n => parseInt(n, 10));
        return val >= start && val <= end;
      }
      return parseInt(pattern, 10) === val;
    };

    const computeNextRuns = (m, h, dom, mon, dow, count = 5) => {
      const runs = [];
      const current = new Date();
      // Start checking from the next minute
      current.setSeconds(0, 0);
      current.setMinutes(current.getMinutes() + 1);

      let iterations = 0;
      const maxIterations = 50000; // Safeguard

      while (runs.length < count && iterations < maxIterations) {
        iterations++;
        const curMin = current.getMinutes();
        const curHour = current.getHours();
        const curDom = current.getDate();
        const curMon = current.getMonth() + 1; // 1-12
        const curDow = current.getDay(); // 0-6

        const mMatch = matchCronPart(curMin, m, 59);
        const hMatch = matchCronPart(curHour, h, 23);
        const domMatch = matchCronPart(curDom, dom, 31);
        const monMatch = matchCronPart(curMon, mon, 12);
        const dowMatch = matchCronPart(curDow, dow, 6);

        if (mMatch && hMatch && domMatch && monMatch && dowMatch) {
          runs.push(new Date(current));
        }

        current.setMinutes(current.getMinutes() + 1);
      }

      return runs;
    };

    const updateFromInput = () => {
      const raw = inputEl.value.trim();
      const parts = raw.split(/\s+/);

      if (parts.length !== 5) {
        explanationEl.innerText = "⚠️ Invalid cron expression. Please provide 5 space-separated parts: [min] [hour] [day] [month] [weekday]";
        explanationEl.style.color = "var(--accent-rose)";
        nextRunsEl.innerHTML = `<span style="font-size: 12px; color: var(--text-muted);">Awaiting valid 5-part cron syntax...</span>`;
        return;
      }

      explanationEl.style.color = "var(--text-main)";
      const [m, h, dom, mon, dow] = parts;

      badgeMin.innerText = m;
      badgeHour.innerText = h;
      badgeDom.innerText = dom;
      badgeMonth.innerText = mon;
      badgeDow.innerText = dow;

      // Sync select dropdowns if matching option exists
      if (selMin.querySelector(`option[value="${m}"]`)) selMin.value = m;
      if (selHour.querySelector(`option[value="${h}"]`)) selHour.value = h;
      if (selDom.querySelector(`option[value="${dom}"]`)) selDom.value = dom;
      if (selMonth.querySelector(`option[value="${mon}"]`)) selMonth.value = mon;
      if (selDow.querySelector(`option[value="${dow}"]`)) selDow.value = dow;

      explanationEl.innerText = explainCron(m, h, dom, mon, dow);

      try {
        const nextDates = computeNextRuns(m, h, dom, mon, dow, 5);
        if (nextDates.length === 0) {
          nextRunsEl.innerHTML = `<span style="font-size: 12px; color: var(--accent-rose);">No matching future execution times found in the near future.</span>`;
        } else {
          nextRunsEl.innerHTML = nextDates.map((d, i) => {
            const timeStr = d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', hour12: true });
            const dateStr = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
            return `
              <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 6px; font-family: var(--font-mono); font-size: 12px;">
                <span style="color: var(--accent-cyan); font-weight: 700;">#${i + 1} Run</span>
                <span style="color: var(--text-main); font-weight: 600;">${dateStr}</span>
                <span style="color: var(--accent-emerald); font-weight: 700;">${timeStr}</span>
              </div>
            `;
          }).join("");
        }
      } catch (err) {
        nextRunsEl.innerHTML = `<span style="font-size: 12px; color: var(--accent-rose);">Error computing run times: ${err.message}</span>`;
      }
    };

    const updateFromSelects = () => {
      const parts = [selMin.value, selHour.value, selDom.value, selMonth.value, selDow.value];
      inputEl.value = parts.join(" ");
      updateFromInput();
    };

    inputEl.addEventListener("input", updateFromInput);

    [selMin, selHour, selDom, selMonth, selDow].forEach(sel => {
      sel.addEventListener("change", () => {
        updateFromSelects();
        app.playSynthSound?.('click');
      });
    });

    presetBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        inputEl.value = btn.dataset.cron;
        updateFromInput();
        app.showToast(`Applied preset: ${btn.dataset.cron}`, "info");
        app.playSynthSound?.('click');
      });
    });

    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(inputEl.value.trim()).then(() => {
        app.showToast("Cron expression copied!", "success");
        app.playSynthSound?.('copy');
      });
    });

    resetBtn.addEventListener("click", () => {
      inputEl.value = "*/15 * * * *";
      updateFromInput();
      app.showToast("Reset to default schedule", "info");
      app.playSynthSound?.('click');
    });

    // Initial render
    updateFromInput();
  }
};
