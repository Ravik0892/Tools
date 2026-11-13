import { escapeHtml } from './utils.js';

let appInstance = null;
let currentTab = "sip";
let sipMode = "regular"; // "regular" or "target"
let currentCurrency = "$";
let tableScheduleMode = "yearly"; // "yearly" or "monthly"

// Global schedule caches for rendering and CSV export
let currentScheduleData = [];
let currentMonthlyScheduleData = [];

// Currency Presets Configuration
const CURRENCY_CONFIG = {
  "$": {
    sipPresets: [100, 250, 500, 1000, 2500],
    sipLabels: ["$100", "$250", "$500", "$1k", "$2.5k"],
    loanPresets: [25000, 100000, 250000, 500000],
    loanLabels: ["$25k (Auto)", "$100k", "$250k (Home)", "$500k (Mortgage)"],
    defaultSip: 500,
    defaultTarget: 500000,
    defaultLoan: 100000,
    sipSliderMax: 10000,
    targetSliderMax: 2000000,
    loanSliderMax: 1000000
  },
  "₹": {
    sipPresets: [1000, 2500, 5000, 10000, 25000],
    sipLabels: ["₹1k", "₹2.5k", "₹5k", "₹10k", "₹25k"],
    loanPresets: [500000, 2500000, 5000000, 10000000],
    loanLabels: ["₹5 Lakh (Car)", "₹25 Lakh", "₹50 Lakh (Home)", "₹1 Crore"],
    defaultSip: 5000,
    defaultTarget: 10000000,
    defaultLoan: 2500000,
    sipSliderMax: 100000,
    targetSliderMax: 50000000,
    loanSliderMax: 20000000
  },
  "€": {
    sipPresets: [100, 250, 500, 1000, 2500],
    sipLabels: ["€100", "€250", "€500", "€1k", "€2.5k"],
    loanPresets: [25000, 100000, 250000, 500000],
    loanLabels: ["€25k", "€100k", "€250k", "€500k"],
    defaultSip: 500,
    defaultTarget: 500000,
    defaultLoan: 100000,
    sipSliderMax: 10000,
    targetSliderMax: 2000000,
    loanSliderMax: 1000000
  },
  "£": {
    sipPresets: [100, 250, 500, 1000, 2500],
    sipLabels: ["£100", "£250", "£500", "£1k", "£2.5k"],
    loanPresets: [25000, 100000, 250000, 500000],
    loanLabels: ["£25k", "£100k", "£250k", "£500k"],
    defaultSip: 500,
    defaultTarget: 500000,
    defaultLoan: 100000,
    sipSliderMax: 10000,
    targetSliderMax: 2000000,
    loanSliderMax: 1000000
  },
  "C$": {
    sipPresets: [100, 250, 500, 1000, 2500],
    sipLabels: ["C$100", "C$250", "C$500", "C$1k", "C$2.5k"],
    loanPresets: [25000, 100000, 250000, 500000],
    loanLabels: ["C$25k", "C$100k", "C$250k", "C$500k"],
    defaultSip: 500,
    defaultTarget: 500000,
    defaultLoan: 100000,
    sipSliderMax: 10000,
    targetSliderMax: 2000000,
    loanSliderMax: 1000000
  },
  "A$": {
    sipPresets: [100, 250, 500, 1000, 2500],
    sipLabels: ["A$100", "A$250", "A$500", "A$1k", "A$2.5k"],
    loanPresets: [25000, 100000, 250000, 500000],
    loanLabels: ["A$25k", "A$100k", "A$250k", "A$500k"],
    defaultSip: 500,
    defaultTarget: 500000,
    defaultLoan: 100000,
    sipSliderMax: 10000,
    targetSliderMax: 2000000,
    loanSliderMax: 1000000
  },
  "¥": {
    sipPresets: [10000, 25000, 50000, 100000],
    sipLabels: ["¥10k", "¥25k", "¥50k", "¥100k"],
    loanPresets: [5000000, 15000000, 30000000, 50000000],
    loanLabels: ["¥5M", "¥15M", "¥30M", "¥50M"],
    defaultSip: 25000,
    defaultTarget: 25000000,
    defaultLoan: 15000000,
    sipSliderMax: 500000,
    targetSliderMax: 100000000,
    loanSliderMax: 100000000
  }
};

// Format currency helper
function formatCurrency(amount, currency = currentCurrency) {
  if (isNaN(amount) || amount === null || amount === undefined) return `${currency}0`;
  const isNegative = amount < 0;
  const absVal = Math.abs(amount);

  let formatted = "";
  if (currency === "₹") {
    formatted = absVal.toLocaleString("en-IN", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
  } else {
    formatted = absVal.toLocaleString("en-US", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
  }
  return `${isNegative ? "-" : ""}${currency}${formatted}`;
}

// Compact currency helper for compact charts, tooltips, and badges
function formatCompactCurrency(val, currency = currentCurrency) {
  if (isNaN(val) || val === null || val === undefined || val === 0) return `${currency}0`;
  const absVal = Math.abs(val);
  const sign = val < 0 ? "-" : "";

  if (currency === "₹") {
    if (absVal >= 10000000) {
      return `${sign}₹${(absVal / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
    }
    if (absVal >= 100000) {
      return `${sign}₹${(absVal / 100000).toFixed(2).replace(/\.00$/, "")} L`;
    }
    if (absVal >= 1000) {
      return `${sign}₹${(absVal / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    }
  } else if (currency === "¥") {
    if (absVal >= 100000000) {
      return `${sign}¥${(absVal / 100000000).toFixed(2).replace(/\.00$/, "")}億`;
    }
    if (absVal >= 10000) {
      return `${sign}¥${(absVal / 10000).toFixed(1).replace(/\.0$/, "")}万`;
    }
  } else {
    if (absVal >= 1000000) {
      return `${sign}${currency}${(absVal / 1000000).toFixed(2).replace(/\.00$/, "")}M`;
    }
    if (absVal >= 1000) {
      return `${sign}${currency}${(absVal / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    }
  }
  return formatCurrency(val, currency);
}

export default {
  id: "finance-calculator",
  name: "Loan EMI & SIP Wealth Calculator Suite",

  renderUI() {
    return `
      <style>
        .fin-bento-kpi {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 14px;
          text-align: left;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .fin-bento-kpi:hover {
          border-color: rgba(255, 255, 255, 0.16);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        }
        .fin-bento-kpi::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
          opacity: 0.6;
        }
        .fin-table-row:hover {
          background: rgba(255, 255, 255, 0.04) !important;
        }
        .fin-segmented-btn {
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-muted);
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .fin-segmented-btn:hover {
          color: var(--text-main);
          border-color: var(--border-color-hover);
        }
        .fin-segmented-btn.active {
          background: var(--accent-cyan);
          color: #050b14;
          font-weight: 700;
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.35);
        }
      </style>

      <div class="tool-content-layout split-view">
        <!-- Configuration / Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <h3 style="margin: 0; display: flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="color: var(--accent-emerald);">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>Financial Engine</span>
              </h3>
              <!-- Currency selector -->
              <div style="display: flex; align-items: center; gap: 6px;">
                <label for="fin-currency-select" style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Currency</label>
                <select id="fin-currency-select" class="form-select" style="width: auto; padding: 3px 8px; font-size: 11px; height: 28px; font-weight: 700;">
                  <option value="$" selected>USD ($)</option>
                  <option value="₹">INR (₹)</option>
                  <option value="€">EUR (€)</option>
                  <option value="£">GBP (£)</option>
                  <option value="C$">CAD (C$)</option>
                  <option value="A$">AUD (A$)</option>
                  <option value="¥">JPY (¥)</option>
                </select>
              </div>
            </div>

            <!-- Tab switcher inside controls panel -->
            <div style="display: flex; gap: 6px; width: 100%; max-width: 100%; flex-wrap: wrap;" id="fin-calc-tabs">
              <button class="keyboard-tab active" data-tab="sip" style="font-size: 11px; padding: 5px 10px;">
                <span>📈 SIP &amp; Wealth</span>
              </button>
              <button class="keyboard-tab" data-tab="compound" style="font-size: 11px; padding: 5px 10px;">
                <span>🌱 Compound Interest</span>
              </button>
              <button class="keyboard-tab" data-tab="emi" style="font-size: 11px; padding: 5px 10px;">
                <span>🏠 Loan EMI &amp; Mortgage</span>
              </button>
            </div>
          </div>

          <!-- TAB 1: SIP & Wealth Planner Controls -->
          <div id="panel-sip-controls" class="tab-control-panel">
            <!-- Mode Segmented Switcher (Regular vs Target Goal) -->
            <div style="display: flex; gap: 6px; margin-bottom: 14px; background: rgba(0,0,0,0.25); padding: 3px; border-radius: 8px; border: 1px solid var(--border-color); width: 100%;">
              <button type="button" class="fin-segmented-btn active" id="sip-mode-regular-btn" style="flex: 1; text-align: center;">
                💰 Monthly Investment
              </button>
              <button type="button" class="fin-segmented-btn" id="sip-mode-target-btn" style="flex: 1; text-align: center;">
                🎯 Target Goal Planning
              </button>
            </div>

            <!-- 1A. Regular SIP Input -->
            <div id="sip-regular-input-box" class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="sip-monthly-input">Monthly Investment Amount</label>
                <span id="sip-monthly-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-cyan);">$500</span>
              </div>
              <div class="slider-group">
                <input type="range" id="sip-monthly-slider" class="slider-input" min="10" max="10000" step="50" value="500">
                <input type="number" id="sip-monthly-input" class="form-input" min="1" max="10000000" step="10" value="500" style="width: 115px; font-family: var(--font-mono);">
              </div>
              <div id="sip-presets-container" style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
                <!-- Dynamically populated per currency -->
              </div>
            </div>

            <!-- 1B. Target Goal Input (Initially hidden) -->
            <div id="sip-target-input-box" class="form-group" style="display: none;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="sip-target-input">Desired Target Corpus Goal</label>
                <span id="sip-target-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-purple);">$500,000</span>
              </div>
              <div class="slider-group">
                <input type="range" id="sip-target-slider" class="slider-input" min="5000" max="2000000" step="5000" value="500000">
                <input type="number" id="sip-target-input" class="form-input" min="100" max="1000000000" step="1000" value="500000" style="width: 125px; font-family: var(--font-mono);">
              </div>
              <div style="font-size: 11px; color: var(--accent-cyan); margin-top: 4px; font-weight: 600;">
                Calculates the exact monthly contribution required to hit your wealth goal.
              </div>
            </div>

            <div class="form-group" style="margin-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="sip-rate-input">Expected Annual Return Rate (p.a.)</label>
                <span id="sip-rate-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-emerald);">12%</span>
              </div>
              <div class="slider-group">
                <input type="range" id="sip-rate-slider" class="slider-input" min="1" max="30" step="0.5" value="12">
                <input type="number" id="sip-rate-input" class="form-input" min="0.1" max="50" step="0.1" value="12" style="width: 115px; font-family: var(--font-mono);">
              </div>
              <div style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="sip-rate" data-val="8" style="padding: 2px 8px; font-size: 10px;">8% (Conservative Debt)</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="sip-rate" data-val="12" style="padding: 2px 8px; font-size: 10px;">12% (Index Funds)</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="sip-rate" data-val="15" style="padding: 2px 8px; font-size: 10px;">15% (Aggressive Equity)</button>
              </div>
            </div>

            <div class="form-group" style="margin-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="sip-years-input">Investment Horizon (Years)</label>
                <span id="sip-years-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-purple);">10 Years</span>
              </div>
              <div class="slider-group">
                <input type="range" id="sip-years-slider" class="slider-input" min="1" max="40" step="1" value="10">
                <input type="number" id="sip-years-input" class="form-input" min="1" max="50" step="1" value="10" style="width: 115px; font-family: var(--font-mono);">
              </div>
              <div style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="sip-years" data-val="5" style="padding: 2px 8px; font-size: 10px;">5 Yrs</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="sip-years" data-val="10" style="padding: 2px 8px; font-size: 10px;">10 Yrs</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="sip-years" data-val="15" style="padding: 2px 8px; font-size: 10px;">15 Yrs</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="sip-years" data-val="20" style="padding: 2px 8px; font-size: 10px;">20 Yrs</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="sip-years" data-val="25" style="padding: 2px 8px; font-size: 10px;">25 Yrs</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="sip-years" data-val="30" style="padding: 2px 8px; font-size: 10px;">30 Yrs</button>
              </div>
            </div>

            <!-- Advanced Wealth Boosters -->
            <div style="margin-top: 18px; padding: 12px; border: 1px dashed var(--border-color); border-radius: 8px; background: rgba(255, 255, 255, 0.015);">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                <span>Wealth Boosters &amp; Inflation Adjustments</span>
              </div>

              <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group">
                  <label for="sip-stepup-input" style="font-size: 11px;">Annual Step-Up (%/yr)</label>
                  <input type="number" id="sip-stepup-input" class="form-input" min="0" max="50" step="1" value="0" style="font-family: var(--font-mono);">
                  <span style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Increase SIP by % every year</span>
                </div>
                <div class="form-group">
                  <label for="sip-inflation-input" style="font-size: 11px;">Expected Inflation Rate (%)</label>
                  <input type="number" id="sip-inflation-input" class="form-input" min="0" max="20" step="0.5" value="0" style="font-family: var(--font-mono);">
                  <span style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Real purchasing power check</span>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: Compound Interest Controls -->
          <div id="panel-compound-controls" class="tab-control-panel" style="display: none;">
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="ci-principal-input">Initial Principal Deposit</label>
                <span id="ci-principal-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-cyan);">$5,000</span>
              </div>
              <div class="slider-group">
                <input type="range" id="ci-principal-slider" class="slider-input" min="100" max="100000" step="500" value="5000">
                <input type="number" id="ci-principal-input" class="form-input" min="0" max="10000000" step="100" value="5000" style="width: 115px; font-family: var(--font-mono);">
              </div>
            </div>

            <div class="form-group" style="margin-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="ci-addition-input">Regular Periodic Contribution</label>
                <span id="ci-addition-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-cyan);">$200</span>
              </div>
              <div class="slider-group">
                <input type="range" id="ci-addition-slider" class="slider-input" min="0" max="5000" step="50" value="200">
                <input type="number" id="ci-addition-input" class="form-input" min="0" max="500000" step="10" value="200" style="width: 115px; font-family: var(--font-mono);">
              </div>
            </div>

            <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px;">
              <div class="form-group">
                <label for="ci-contrib-freq">Contribution Frequency</label>
                <select id="ci-contrib-freq" class="form-select">
                  <option value="12" selected>Monthly (12/yr)</option>
                  <option value="1">Annually (1/yr)</option>
                  <option value="0">No Regular Addition</option>
                </select>
              </div>
              <div class="form-group">
                <label for="ci-compound-freq">Compounding Frequency</label>
                <select id="ci-compound-freq" class="form-select">
                  <option value="365">Daily (365/yr)</option>
                  <option value="12" selected>Monthly (12/yr)</option>
                  <option value="4">Quarterly (4/yr)</option>
                  <option value="2">Semi-Annually (2/yr)</option>
                  <option value="1">Annually (1/yr)</option>
                </select>
              </div>
            </div>

            <div class="form-group" style="margin-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="ci-rate-input">Annual Interest Rate (%)</label>
                <span id="ci-rate-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-emerald);">8%</span>
              </div>
              <div class="slider-group">
                <input type="range" id="ci-rate-slider" class="slider-input" min="1" max="25" step="0.25" value="8">
                <input type="number" id="ci-rate-input" class="form-input" min="0.1" max="40" step="0.1" value="8" style="width: 115px; font-family: var(--font-mono);">
              </div>
            </div>

            <div class="form-group" style="margin-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="ci-years-input">Investment Duration (Years)</label>
                <span id="ci-years-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-purple);">10 Years</span>
              </div>
              <div class="slider-group">
                <input type="range" id="ci-years-slider" class="slider-input" min="1" max="40" step="1" value="10">
                <input type="number" id="ci-years-input" class="form-input" min="1" max="50" step="1" value="10" style="width: 115px; font-family: var(--font-mono);">
              </div>
            </div>
          </div>

          <!-- TAB 3: Loan EMI & Mortgage Controls -->
          <div id="panel-emi-controls" class="tab-control-panel" style="display: none;">
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="emi-principal-input">Loan Principal Amount</label>
                <span id="emi-principal-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-cyan);">$100,000</span>
              </div>
              <div class="slider-group">
                <input type="range" id="emi-principal-slider" class="slider-input" min="1000" max="1000000" step="5000" value="100000">
                <input type="number" id="emi-principal-input" class="form-input" min="100" max="500000000" step="1000" value="100000" style="width: 125px; font-family: var(--font-mono);">
              </div>
              <div id="emi-presets-container" style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
                <!-- Dynamically populated per currency -->
              </div>
            </div>

            <div class="form-group" style="margin-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="emi-rate-input">Annual Interest Rate (p.a.)</label>
                <span id="emi-rate-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-rose);">7.5%</span>
              </div>
              <div class="slider-group">
                <input type="range" id="emi-rate-slider" class="slider-input" min="1" max="25" step="0.25" value="7.5">
                <input type="number" id="emi-rate-input" class="form-input" min="0.1" max="40" step="0.1" value="7.5" style="width: 115px; font-family: var(--font-mono);">
              </div>
            </div>

            <div class="form-group" style="margin-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label for="emi-tenure-input">Loan Tenure</label>
                <span id="emi-tenure-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-purple);">15 Years (180 mos)</span>
              </div>
              <div class="slider-group">
                <input type="range" id="emi-tenure-slider" class="slider-input" min="1" max="30" step="1" value="15">
                <input type="number" id="emi-tenure-input" class="form-input" min="1" max="40" step="1" value="15" style="width: 115px; font-family: var(--font-mono);">
              </div>
              <div style="display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap;">
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="emi-tenure" data-val="5" style="padding: 2px 8px; font-size: 10px;">5 Yrs</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="emi-tenure" data-val="10" style="padding: 2px 8px; font-size: 10px;">10 Yrs</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="emi-tenure" data-val="15" style="padding: 2px 8px; font-size: 10px;">15 Yrs</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="emi-tenure" data-val="20" style="padding: 2px 8px; font-size: 10px;">20 Yrs</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="emi-tenure" data-val="25" style="padding: 2px 8px; font-size: 10px;">25 Yrs</button>
                <button type="button" class="tool-btn secondary fin-preset-btn" data-target="emi-tenure" data-val="30" style="padding: 2px 8px; font-size: 10px;">30 Yrs</button>
              </div>
            </div>

            <!-- Prepayment Accelerator -->
            <div style="margin-top: 18px; padding: 12px; border: 1px dashed var(--border-color); border-radius: 8px; background: rgba(255, 255, 255, 0.015);">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                <span>Loan Prepayment Accelerator</span>
              </div>
              <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group">
                  <label for="emi-prepay-monthly-input" style="font-size: 11px;">Extra Monthly Principal</label>
                  <input type="number" id="emi-prepay-monthly-input" class="form-input" min="0" max="100000" step="50" value="0" style="font-family: var(--font-mono);">
                  <span style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Recurring monthly extra</span>
                </div>
                <div class="form-group">
                  <label for="emi-prepay-annual-input" style="font-size: 11px;">Extra Annual Principal</label>
                  <input type="number" id="emi-prepay-annual-input" class="form-input" min="0" max="500000" step="500" value="0" style="font-family: var(--font-mono);">
                  <span style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Annual bonus prepayment</span>
                </div>
              </div>
              <div id="emi-prepay-savings" style="font-size: 11.5px; color: var(--accent-emerald); margin-top: 8px; font-weight: 600; padding: 6px 10px; border-radius: 6px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2);">
                Tip: Add extra payments to see months and interest saved!
              </div>
            </div>
          </div>
        </div>

        <!-- Output & Visual Analytics Panel (Right) -->
        <div class="tool-panel" style="gap: 16px;">
          <div class="panel-header" style="justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="color: var(--accent-cyan);">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
              </svg>
              <span id="fin-output-title">SIP Wealth Projection</span>
            </h3>

            <!-- Visualization toggle tabs -->
            <div style="display: flex; gap: 4px;">
              <button class="tool-btn active fin-view-toggle" id="fin-view-donut-btn" style="font-size: 11px; padding: 4px 8px;">🍩 Donut</button>
              <button class="tool-btn secondary fin-view-toggle" id="fin-view-growth-btn" style="font-size: 11px; padding: 4px 8px;">📈 Growth Curve</button>
            </div>
          </div>

          <!-- Dynamic Bento-Grid KPI Metric Cards -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;" id="fin-kpi-grid">
            <div class="fin-bento-kpi">
              <div style="font-size: 10.5px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;" id="kpi-label-1">Total Invested</div>
              <div id="kpi-val-1" style="font-size: 20px; font-weight: 800; color: var(--accent-cyan); margin-top: 4px; font-family: var(--font-mono);">$60,000</div>
              <div id="kpi-sub-1" style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Principal Outflow</div>
            </div>

            <div class="fin-bento-kpi">
              <div style="font-size: 10.5px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;" id="kpi-label-2">Estimated Returns</div>
              <div id="kpi-val-2" style="font-size: 20px; font-weight: 800; color: var(--accent-emerald); margin-top: 4px; font-family: var(--font-mono);">$56,170</div>
              <div id="kpi-sub-2" style="font-size: 10px; color: var(--accent-emerald); margin-top: 2px;">+93.6% Wealth Gain</div>
            </div>

            <div class="fin-bento-kpi">
              <div style="font-size: 10.5px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;" id="kpi-label-3">Maturity Corpus</div>
              <div id="kpi-val-3" style="font-size: 20px; font-weight: 800; color: var(--accent-purple); margin-top: 4px; font-family: var(--font-mono);">$116,170</div>
              <div id="kpi-sub-3" style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Total Wealth Built</div>
            </div>

            <div class="fin-bento-kpi" id="kpi-box-4">
              <div style="font-size: 10.5px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;" id="kpi-label-4">Inflation Value</div>
              <div id="kpi-val-4" style="font-size: 20px; font-weight: 800; color: var(--accent-amber); margin-top: 4px; font-family: var(--font-mono);">$116,170</div>
              <div id="kpi-sub-4" style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Real Purchasing Power</div>
            </div>
          </div>

          <!-- Interactive Visual Chart Stage -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; min-height: 230px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
            
            <!-- Donut Visual View -->
            <div id="fin-donut-container" style="display: flex; flex-direction: column; align-items: center; width: 100%;">
              <div style="position: relative; width: 180px; height: 180px; display: flex; align-items: center; justify-content: center;">
                <svg id="fin-donut-svg" viewBox="0 0 100 100" style="width: 100%; height: 100%; transform: rotate(-90deg); filter: drop-shadow(0 4px 12px rgba(0,0,0,0.35));">
                  <!-- Base Circle -->
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.06)" stroke-width="12"></circle>
                  <!-- Slice 1: Invested / Principal -->
                  <circle id="fin-donut-slice1" cx="50" cy="50" r="40" fill="transparent" stroke="var(--accent-cyan)" stroke-width="12" stroke-dasharray="125 126" stroke-dashoffset="0" style="transition: stroke-dasharray 0.5s ease-out, stroke-dashoffset 0.5s ease-out, stroke 0.3s;"></circle>
                  <!-- Slice 2: Wealth / Interest -->
                  <circle id="fin-donut-slice2" cx="50" cy="50" r="40" fill="transparent" stroke="var(--accent-emerald)" stroke-width="12" stroke-dasharray="126 125" stroke-dashoffset="-125" style="transition: stroke-dasharray 0.5s ease-out, stroke-dashoffset 0.5s ease-out, stroke 0.3s;"></circle>
                </svg>
                <!-- Donut Center Text -->
                <div style="position: absolute; text-align: center; pointer-events: none;">
                  <div id="fin-donut-pct" style="font-size: 22px; font-weight: 800; color: var(--text-main); font-family: var(--font-mono);">52%</div>
                  <div id="fin-donut-pct-label" style="font-size: 9.5px; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px; font-weight: 600;">Invested</div>
                  <div id="fin-donut-pct-val" style="font-size: 11px; color: var(--accent-cyan); font-family: var(--font-mono); margin-top: 2px;">$60k</div>
                </div>
              </div>

              <!-- Legend -->
              <div style="display: flex; gap: 20px; margin-top: 14px; font-size: 11px; font-weight: 600; flex-wrap: wrap; justify-content: center;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span id="fin-legend-color1" style="width: 10px; height: 10px; border-radius: 50%; background: var(--accent-cyan); display: inline-block;"></span>
                  <span id="fin-legend-text1" style="color: var(--text-muted);">Invested: 52%</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span id="fin-legend-color2" style="width: 10px; height: 10px; border-radius: 50%; background: var(--accent-emerald); display: inline-block;"></span>
                  <span id="fin-legend-text2" style="color: var(--text-muted);">Returns: 48%</span>
                </div>
              </div>
            </div>

            <!-- Growth Curve Visual View (Initially Hidden) -->
            <div id="fin-growth-container" style="display: none; width: 100%; min-height: 200px; flex-direction: column; align-items: center; justify-content: center; position: relative;">
              <svg id="fin-growth-svg" viewBox="0 0 520 200" style="width: 100%; height: 100%; overflow: visible;">
                <!-- Dynamically rendered via JS -->
              </svg>
              <div style="display: flex; gap: 16px; margin-top: 10px; font-size: 10.5px; font-weight: 600;">
                <span id="fin-growth-legend1" style="color: var(--accent-cyan);">■ Principal Contributed</span>
                <span id="fin-growth-legend2" style="color: var(--accent-emerald);">■ Total Maturity Curve</span>
              </div>
            </div>

          </div>

          <!-- Schedule & Breakdown Actions Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; flex-wrap: wrap; gap: 8px;">
            <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span id="fin-table-title">Growth Schedule</span>
            </div>

            <!-- View Modes & Action Buttons -->
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <div style="display: flex; gap: 3px; background: rgba(0,0,0,0.25); padding: 2px; border-radius: 6px; border: 1px solid var(--border-color);">
                <button type="button" class="fin-segmented-btn active" id="fin-table-yearly-btn" style="padding: 2px 8px; font-size: 10.5px;">Yearly</button>
                <button type="button" class="fin-segmented-btn" id="fin-table-monthly-btn" style="padding: 2px 8px; font-size: 10.5px;">Monthly</button>
              </div>

              <button class="tool-btn secondary" id="fin-copy-summary-btn" style="padding: 4px 9px; font-size: 11px; display: inline-flex; align-items: center; gap: 5px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy Summary</span>
              </button>

              <button class="tool-btn secondary" id="fin-export-csv-btn" style="padding: 4px 9px; font-size: 11px; display: inline-flex; align-items: center; gap: 5px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <!-- Tabular Amortization / Progression Table -->
          <div style="max-height: 250px; overflow-y: auto; border: 1px solid var(--border-color); border-radius: 8px; background: rgba(0,0,0,0.15);">
            <table style="width: 100%; border-collapse: collapse; font-size: 11.5px; text-align: right; font-variant-numeric: tabular-nums;">
              <thead>
                <tr style="border-bottom: 1px solid var(--border-color); background: rgba(255,255,255,0.03); color: var(--text-muted); font-size: 10.5px; text-transform: uppercase;">
                  <th style="padding: 8px 10px; text-align: left;" id="th-col-timeline">Timeline</th>
                  <th style="padding: 8px 10px;" id="th-col-invested">Invested</th>
                  <th style="padding: 8px 10px;" id="th-col-returns">Returns</th>
                  <th style="padding: 8px 10px;" id="th-col-balance">Closing Balance</th>
                </tr>
              </thead>
              <tbody id="fin-schedule-tbody">
                <!-- Populated dynamically via JS -->
              </tbody>
            </table>
          </div>

        </div>

        <!-- 3. Tool Guide Card (Canonical Layout Standard) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: How to Use Financial &amp; Loan Calculator</span>
            </div>
            <div class="tool-guide-badge">Zero-Server 100% Private</div>
          </div>

          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Select Engine &amp; Global Currency</h4>
                <p>Choose between <strong>SIP Wealth Planner</strong>, <strong>Compound Interest</strong>, or <strong>Loan EMI</strong>. Use the currency selector at the top of the controls to switch between USD ($), INR (₹), EUR (€), GBP (£), and JPY (¥).</p>
                <div style="margin-top: 6px; font-family: var(--font-mono); font-size: 11px; color: var(--accent-cyan); background: rgba(0,0,0,0.25); padding: 4px 8px; border-radius: 4px;">SIP Formula: M = P × [ (1 + i)ⁿ - 1 ] / i × (1 + i)</div>
              </div>
            </div>

            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Adjust Real-Time Sliders &amp; Rates</h4>
                <p>Fine-tune principal investments, monthly contributions, expected annual return %, and tenure years. Every slider and numeric input provides instant sub-millisecond calculation updates with zero lag.</p>
                <div style="margin-top: 6px; font-family: var(--font-mono); font-size: 11px; color: var(--accent-emerald); background: rgba(0,0,0,0.25); padding: 4px 8px; border-radius: 4px;">Compound: A = P(1 + r/n)ⁿᵗ &nbsp;|&nbsp; APY = (1 + r/n)ⁿ - 1</div>
              </div>
            </div>

            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Accelerate Returns &amp; Slash Debt Tenure</h4>
                <p>Toggle <strong>Step-Up %</strong> in SIP mode to model annual contribution increases, or test <strong>Monthly / Lump-sum Prepayments</strong> in Loan EMI mode to visualize thousands saved in interest and years shaved off your mortgage.</p>
                <div style="margin-top: 6px; font-family: var(--font-mono); font-size: 11px; color: var(--accent-rose); background: rgba(0,0,0,0.25); padding: 4px 8px; border-radius: 4px;">Reducing Balance: EMI = [P × r × (1 + r)ⁿ] / [ (1 + r)ⁿ - 1 ]</div>
              </div>
            </div>

            <div class="tool-guide-step">
              <div class="tool-step-num">4</div>
              <div class="tool-step-content">
                <h4>Visual Allocation &amp; CSV Ledger Export</h4>
                <p>Switch between the visual <strong>Donut Chart</strong> (Principal vs Returns) and the <strong>Growth Curve Stage</strong>. Copy formatted plan summaries with one click, or export the complete year-by-year and month-by-month ledger to CSV.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, app) {
    appInstance = app || (container && container.tools ? container : (window.app || null));
    const root = container || document.querySelector("#tool-viewport");
    if (!root) return;

    // 1. Currency switcher
    const currencySelect = root.querySelector("#fin-currency-select");
    currencySelect?.addEventListener("change", (e) => {
      const oldCurrency = currentCurrency;
      currentCurrency = e.target.value;
      onCurrencyChange(root, oldCurrency, currentCurrency);
    });

    // Populate initial presets based on default currency
    updatePresetButtons(root);

    // 2. Subtab switching
    const tabsContainer = root.querySelector("#fin-calc-tabs");
    const tabBtns = tabsContainer?.querySelectorAll(".keyboard-tab") || [];

    const switchSubtab = (tabId, push = true) => {
      currentTab = tabId;
      tabBtns.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.tab === tabId);
      });

      // Show/hide control panels
      const panels = {
        sip: root.querySelector("#panel-sip-controls"),
        compound: root.querySelector("#panel-compound-controls"),
        emi: root.querySelector("#panel-emi-controls")
      };

      Object.entries(panels).forEach(([key, el]) => {
        if (el) el.style.display = key === tabId ? "block" : "none";
      });

      // Update right panel header
      const outTitle = root.querySelector("#fin-output-title");
      if (outTitle) {
        if (tabId === "sip") outTitle.textContent = "SIP Wealth Projection";
        else if (tabId === "compound") outTitle.textContent = "Compound Interest Projection";
        else if (tabId === "emi") outTitle.textContent = "Loan Amortization Breakdown";
      }

      // Sync subtab with app router
      if (push && appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("finance-calculator", tabId);
      }

      updateCalculations(root);
    };

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => switchSubtab(btn.dataset.tab));
    });

    // Register tab switcher with appInstance for browser popstate
    if (appInstance && typeof appInstance.registerTabSwitcher === "function") {
      appInstance.registerTabSwitcher("finance-calculator", (tabId) => switchSubtab(tabId, false));
    }

    // 3. SIP Mode Switcher (Regular vs Target)
    const sipRegBtn = root.querySelector("#sip-mode-regular-btn");
    const sipTgtBtn = root.querySelector("#sip-mode-target-btn");
    const sipRegBox = root.querySelector("#sip-regular-input-box");
    const sipTgtBox = root.querySelector("#sip-target-input-box");

    sipRegBtn?.addEventListener("click", () => {
      sipMode = "regular";
      sipRegBtn.classList.add("active");
      sipTgtBtn.classList.remove("active");
      if (sipRegBox) sipRegBox.style.display = "block";
      if (sipTgtBox) sipTgtBox.style.display = "none";
      updateCalculations(root);
    });

    sipTgtBtn?.addEventListener("click", () => {
      sipMode = "target";
      sipTgtBtn.classList.add("active");
      sipRegBtn.classList.remove("active");
      if (sipRegBox) sipRegBox.style.display = "none";
      if (sipTgtBox) sipTgtBox.style.display = "block";
      updateCalculations(root);
    });

    // 4. Two-way synchronization helpers for inputs and sliders
    const syncInputSlider = (sliderId, inputId, badgeId, formatter) => {
      const slider = root.querySelector(`#${sliderId}`);
      const input = root.querySelector(`#${inputId}`);
      const badge = root.querySelector(`#${badgeId}`);

      const onUpdate = (val) => {
        if (badge && formatter) badge.textContent = formatter(val);
        updateCalculations(root);
      };

      slider?.addEventListener("input", (e) => {
        const val = parseFloat(e.target.value);
        if (input) input.value = val;
        onUpdate(val);
      });

      input?.addEventListener("input", (e) => {
        let val = parseFloat(e.target.value);
        if (!isNaN(val)) {
          if (slider) slider.value = val;
          onUpdate(val);
        }
      });
    };

    // Setup two-way syncs
    syncInputSlider("sip-monthly-slider", "sip-monthly-input", "sip-monthly-badge", (v) => formatCurrency(v));
    syncInputSlider("sip-target-slider", "sip-target-input", "sip-target-badge", (v) => formatCurrency(v));
    syncInputSlider("sip-rate-slider", "sip-rate-input", "sip-rate-badge", (v) => `${v}%`);
    syncInputSlider("sip-years-slider", "sip-years-input", "sip-years-badge", (v) => `${v} Year${v > 1 ? "s" : ""}`);

    syncInputSlider("ci-principal-slider", "ci-principal-input", "ci-principal-badge", (v) => formatCurrency(v));
    syncInputSlider("ci-addition-slider", "ci-addition-input", "ci-addition-badge", (v) => formatCurrency(v));
    syncInputSlider("ci-rate-slider", "ci-rate-input", "ci-rate-badge", (v) => `${v}%`);
    syncInputSlider("ci-years-slider", "ci-years-input", "ci-years-badge", (v) => `${v} Year${v > 1 ? "s" : ""}`);

    syncInputSlider("emi-principal-slider", "emi-principal-input", "emi-principal-badge", (v) => formatCurrency(v));
    syncInputSlider("emi-rate-slider", "emi-rate-input", "emi-rate-badge", (v) => `${v}%`);
    syncInputSlider("emi-tenure-slider", "emi-tenure-input", "emi-tenure-badge", (v) => `${v} Years (${v * 12} mos)`);

    // Additional listeners
    ["sip-stepup-input", "sip-inflation-input", "ci-contrib-freq", "ci-compound-freq", "emi-prepay-monthly-input", "emi-prepay-annual-input"].forEach(id => {
      const el = root.querySelector(`#${id}`);
      el?.addEventListener("input", () => updateCalculations(root));
      el?.addEventListener("change", () => updateCalculations(root));
    });

    // Global preset button delegate
    root.addEventListener("click", (e) => {
      const btn = e.target.closest(".fin-preset-btn");
      if (!btn) return;
      const target = btn.dataset.target;
      const val = parseFloat(btn.dataset.val);
      const input = root.querySelector(`#${target}-input`);
      const slider = root.querySelector(`#${target}-slider`);
      if (input) input.value = val;
      if (slider) slider.value = val;
      input?.dispatchEvent(new Event("input"));
    });

    // 5. View toggle (Donut vs Growth Curve)
    const donutBtn = root.querySelector("#fin-view-donut-btn");
    const growthBtn = root.querySelector("#fin-view-growth-btn");
    const donutContainer = root.querySelector("#fin-donut-container");
    const growthContainer = root.querySelector("#fin-growth-container");

    donutBtn?.addEventListener("click", () => {
      donutBtn.classList.add("active");
      donutBtn.classList.remove("secondary");
      growthBtn.classList.remove("active");
      growthBtn.classList.add("secondary");
      donutContainer.style.display = "flex";
      growthContainer.style.display = "none";
    });

    growthBtn?.addEventListener("click", () => {
      growthBtn.classList.add("active");
      growthBtn.classList.remove("secondary");
      donutBtn.classList.remove("active");
      donutBtn.classList.add("secondary");
      donutContainer.style.display = "none";
      growthContainer.style.display = "flex";
      renderGrowthSvg(root);
    });

    // 6. Schedule Table Mode Switcher (Yearly vs Monthly)
    const yearlyBtn = root.querySelector("#fin-table-yearly-btn");
    const monthlyBtn = root.querySelector("#fin-table-monthly-btn");

    yearlyBtn?.addEventListener("click", () => {
      tableScheduleMode = "yearly";
      yearlyBtn.classList.add("active");
      monthlyBtn.classList.remove("active");
      renderActiveTable(root);
    });

    monthlyBtn?.addEventListener("click", () => {
      tableScheduleMode = "monthly";
      monthlyBtn.classList.add("active");
      yearlyBtn.classList.remove("active");
      renderActiveTable(root);
    });

    // 7. Copy Summary Button
    root.querySelector("#fin-copy-summary-btn")?.addEventListener("click", () => {
      copyFinancialSummary(root);
    });

    // 8. Export CSV
    root.querySelector("#fin-export-csv-btn")?.addEventListener("click", () => {
      exportScheduleCsv(root);
    });

    // Check if initial deep-linked subtab requested
    const initialTab = appInstance?.activeSubtab || "sip";
    if (appInstance) appInstance.activeSubtab = null;
    switchSubtab(initialTab, false);

    // Initial calculation run
    updateCalculations(root);
  },

  cleanup() {
    if (appInstance && appInstance._activeTabSwitchers) {
      delete appInstance._activeTabSwitchers["finance-calculator"];
    }
    appInstance = null;
    currentScheduleData = [];
    currentMonthlyScheduleData = [];
  }
};

// Currency change handler: dynamically updates presets, slider bounds, and badges
function onCurrencyChange(root, oldCurrency, newCurrency) {
  const cfg = CURRENCY_CONFIG[newCurrency] || CURRENCY_CONFIG["$"];

  // Update slider max attributes
  const sipSlider = root.querySelector("#sip-monthly-slider");
  if (sipSlider) sipSlider.max = cfg.sipSliderMax;

  const targetSlider = root.querySelector("#sip-target-slider");
  if (targetSlider) targetSlider.max = cfg.targetSliderMax;

  const loanSlider = root.querySelector("#emi-principal-slider");
  if (loanSlider) loanSlider.max = cfg.loanSliderMax;

  // If user had previous default values, shift to sensible new defaults
  const sipInput = root.querySelector("#sip-monthly-input");
  const oldCfg = CURRENCY_CONFIG[oldCurrency];
  if (sipInput && oldCfg && parseFloat(sipInput.value) === oldCfg.defaultSip) {
    sipInput.value = cfg.defaultSip;
    if (sipSlider) sipSlider.value = cfg.defaultSip;
  }

  const loanInput = root.querySelector("#emi-principal-input");
  if (loanInput && oldCfg && parseFloat(loanInput.value) === oldCfg.defaultLoan) {
    loanInput.value = cfg.defaultLoan;
    if (loanSlider) loanSlider.value = cfg.defaultLoan;
  }

  // Refresh preset buttons
  updatePresetButtons(root);

  // Refresh all slider badges
  updateAllBadges(root);

  // Re-run calculations
  updateCalculations(root);

  if (appInstance && typeof appInstance.showToast === "function") {
    appInstance.showToast(`Switched currency to ${newCurrency}`, "info");
  }
}

// Update preset buttons dynamically per currency
function updatePresetButtons(root) {
  const cfg = CURRENCY_CONFIG[currentCurrency] || CURRENCY_CONFIG["$"];

  const sipPresetBox = root.querySelector("#sip-presets-container");
  if (sipPresetBox) {
    sipPresetBox.innerHTML = cfg.sipPresets.map((val, idx) => `
      <button type="button" class="tool-btn secondary fin-preset-btn" data-target="sip-monthly" data-val="${val}" style="padding: 2px 8px; font-size: 10px;">${cfg.sipLabels[idx]}</button>
    `).join("");
  }

  const emiPresetBox = root.querySelector("#emi-presets-container");
  if (emiPresetBox) {
    emiPresetBox.innerHTML = cfg.loanPresets.map((val, idx) => `
      <button type="button" class="tool-btn secondary fin-preset-btn" data-target="emi-principal" data-val="${val}" style="padding: 2px 8px; font-size: 10px;">${cfg.loanLabels[idx]}</button>
    `).join("");
  }
}

// Refresh all badges with current currency symbol
function updateAllBadges(root) {
  const sipVal = parseFloat(root.querySelector("#sip-monthly-input")?.value);
  const sipBadge = root.querySelector("#sip-monthly-badge");
  if (sipBadge && !isNaN(sipVal)) sipBadge.textContent = formatCurrency(sipVal);

  const tgtVal = parseFloat(root.querySelector("#sip-target-input")?.value);
  const tgtBadge = root.querySelector("#sip-target-badge");
  if (tgtBadge && !isNaN(tgtVal)) tgtBadge.textContent = formatCurrency(tgtVal);

  const ciPrinVal = parseFloat(root.querySelector("#ci-principal-input")?.value);
  const ciPrinBadge = root.querySelector("#ci-principal-badge");
  if (ciPrinBadge && !isNaN(ciPrinVal)) ciPrinBadge.textContent = formatCurrency(ciPrinVal);

  const ciAddVal = parseFloat(root.querySelector("#ci-addition-input")?.value);
  const ciAddBadge = root.querySelector("#ci-addition-badge");
  if (ciAddBadge && !isNaN(ciAddVal)) ciAddBadge.textContent = formatCurrency(ciAddVal);

  const emiPrinVal = parseFloat(root.querySelector("#emi-principal-input")?.value);
  const emiPrinBadge = root.querySelector("#emi-principal-badge");
  if (emiPrinBadge && !isNaN(emiPrinVal)) emiPrinBadge.textContent = formatCurrency(emiPrinVal);
}

// Master calculation update
function updateCalculations(root) {
  if (!root) return;

  if (currentTab === "sip") {
    calculateSip(root);
  } else if (currentTab === "compound") {
    calculateCompound(root);
  } else if (currentTab === "emi") {
    calculateEmi(root);
  }

  renderGrowthSvg(root);
  renderActiveTable(root);
}

// 1. SIP Calculator Implementation
function calculateSip(root) {
  const annualRate = Math.max(0.1, parseFloat(root.querySelector("#sip-rate-input")?.value) || 12);
  const years = Math.max(1, parseInt(root.querySelector("#sip-years-input")?.value, 10) || 10);
  const stepUpPct = Math.max(0, parseFloat(root.querySelector("#sip-stepup-input")?.value) || 0);
  const inflationPct = Math.max(0, parseFloat(root.querySelector("#sip-inflation-input")?.value) || 0);

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  let baseMonthlyDeposit = 500;

  if (sipMode === "target") {
    // Target Goal Mode: compute required starting monthly deposit
    const targetCorpus = Math.max(100, parseFloat(root.querySelector("#sip-target-input")?.value) || 500000);

    // Compute unit corpus with step-up
    let unitCorpus = 0;
    for (let m = 1; m <= totalMonths; m++) {
      const stepFactor = Math.pow(1 + stepUpPct / 100, Math.floor((m - 1) / 12));
      unitCorpus = (unitCorpus + stepFactor) * (1 + monthlyRate);
    }
    baseMonthlyDeposit = targetCorpus / Math.max(0.0001, unitCorpus);
  } else {
    baseMonthlyDeposit = Math.max(1, parseFloat(root.querySelector("#sip-monthly-input")?.value) || 500);
  }

  let totalInvested = 0;
  let runningBalance = 0;
  let yearlySchedule = [];
  let monthlySchedule = [];

  let currentYearInvested = 0;
  let currentYearStartBal = 0;

  for (let m = 1; m <= totalMonths; m++) {
    const yearIdx = Math.floor((m - 1) / 12);
    const currentMonthlyDeposit = baseMonthlyDeposit * Math.pow(1 + stepUpPct / 100, yearIdx);

    totalInvested += currentMonthlyDeposit;
    currentYearInvested += currentMonthlyDeposit;
    runningBalance = (runningBalance + currentMonthlyDeposit) * (1 + monthlyRate);

    // Record monthly schedule
    monthlySchedule.push({
      timeline: `Month ${m}`,
      invested: totalInvested,
      returns: runningBalance - totalInvested,
      balance: runningBalance,
      yearInvested: currentMonthlyDeposit,
      yearInterest: runningBalance - totalInvested
    });

    // Record yearly schedule
    if (m % 12 === 0 || m === totalMonths) {
      const currentYearNum = Math.ceil(m / 12);
      const interestEarnedThisYear = runningBalance - currentYearStartBal - currentYearInvested;
      yearlySchedule.push({
        timeline: `Year ${currentYearNum}`,
        invested: totalInvested,
        returns: runningBalance - totalInvested,
        balance: runningBalance,
        yearInvested: currentYearInvested,
        yearInterest: interestEarnedThisYear
      });
      currentYearStartBal = runningBalance;
      currentYearInvested = 0;
    }
  }

  const finalReturns = runningBalance - totalInvested;
  const returnGainPct = totalInvested > 0 ? ((finalReturns / totalInvested) * 100).toFixed(1) : "0";
  const realValue = runningBalance / Math.pow(1 + inflationPct / 100, years);

  currentScheduleData = yearlySchedule;
  currentMonthlyScheduleData = monthlySchedule;

  // Update KPI Cards
  if (sipMode === "target") {
    root.querySelector("#kpi-label-1").textContent = "Required Monthly SIP";
    root.querySelector("#kpi-val-1").textContent = formatCurrency(baseMonthlyDeposit);
    root.querySelector("#kpi-sub-1").textContent = stepUpPct > 0 ? `+${stepUpPct}% Step-Up/Yr` : "Fixed Monthly Outflow";

    root.querySelector("#kpi-label-2").textContent = "Total Wealth Gains";
    root.querySelector("#kpi-val-2").textContent = formatCurrency(finalReturns);
    root.querySelector("#kpi-val-2").style.color = "var(--accent-emerald)";
    root.querySelector("#kpi-sub-2").textContent = `+${returnGainPct}% Capital Growth`;

    root.querySelector("#kpi-label-3").textContent = "Target Wealth Corpus";
    root.querySelector("#kpi-val-3").textContent = formatCurrency(runningBalance);
    root.querySelector("#kpi-sub-3").textContent = `Goal reached in ${years} Yrs`;

    root.querySelector("#kpi-label-4").textContent = "Total Capital Invested";
    root.querySelector("#kpi-val-4").textContent = formatCurrency(totalInvested);
    root.querySelector("#kpi-sub-4").textContent = `Your Outflow (${((totalInvested / runningBalance) * 100).toFixed(0)}% of Corpus)`;
  } else {
    root.querySelector("#kpi-label-1").textContent = "Total Invested";
    root.querySelector("#kpi-val-1").textContent = formatCurrency(totalInvested);
    root.querySelector("#kpi-sub-1").textContent = `Principal (${years} Yrs)`;

    root.querySelector("#kpi-label-2").textContent = "Estimated Wealth Gains";
    root.querySelector("#kpi-val-2").textContent = formatCurrency(finalReturns);
    root.querySelector("#kpi-val-2").style.color = "var(--accent-emerald)";
    root.querySelector("#kpi-sub-2").textContent = `+${returnGainPct}% Capital Growth`;

    root.querySelector("#kpi-label-3").textContent = "Total Maturity Corpus";
    root.querySelector("#kpi-val-3").textContent = formatCurrency(runningBalance);
    root.querySelector("#kpi-sub-3").textContent = "Final Portfolio Value";

    if (inflationPct > 0) {
      root.querySelector("#kpi-label-4").textContent = "Inflation-Adjusted Value";
      root.querySelector("#kpi-val-4").textContent = formatCurrency(realValue);
      root.querySelector("#kpi-sub-4").textContent = `@ ${inflationPct}% Annual Inflation`;
    } else {
      root.querySelector("#kpi-label-4").textContent = "Wealth Multiplier";
      root.querySelector("#kpi-val-4").textContent = `${(runningBalance / Math.max(1, totalInvested)).toFixed(2)}x`;
      root.querySelector("#kpi-sub-4").textContent = "Total Wealth Multiple";
    }
  }

  // Update Donut Chart
  updateDonutChart(root, totalInvested, Math.max(0, finalReturns), "Invested", "Returns", "var(--accent-cyan)", "var(--accent-emerald)");
}

// 2. Compound Interest Calculator Implementation
function calculateCompound(root) {
  const principal = Math.max(0, parseFloat(root.querySelector("#ci-principal-input")?.value) || 5000);
  const regularAddition = Math.max(0, parseFloat(root.querySelector("#ci-addition-input")?.value) || 200);
  const contribFreq = parseInt(root.querySelector("#ci-contrib-freq")?.value, 10) || 12;
  const compoundFreq = parseInt(root.querySelector("#ci-compound-freq")?.value, 10) || 12;
  const annualRate = Math.max(0.01, parseFloat(root.querySelector("#ci-rate-input")?.value) || 8);
  const years = Math.max(1, parseInt(root.querySelector("#ci-years-input")?.value, 10) || 10);

  let totalPrincipal = principal;
  let runningBalance = principal;
  let yearlySchedule = [];
  let monthlySchedule = [];

  const totalMonths = years * 12;
  let currentYearInvested = 0;
  let currentYearStartBal = runningBalance;

  // Rate factor per compounding
  for (let m = 1; m <= totalMonths; m++) {
    // Periodic contribution
    let deposit = 0;
    if (contribFreq === 12) {
      deposit = regularAddition;
    } else if (contribFreq === 1 && m % 12 === 0) {
      deposit = regularAddition;
    }

    totalPrincipal += deposit;
    currentYearInvested += deposit;
    runningBalance += deposit;

    // Compounding simulation
    if (compoundFreq === 365) {
      // Daily compounding (365/12 days per month)
      runningBalance *= Math.pow(1 + (annualRate / 100 / 365), 365 / 12);
    } else if (compoundFreq === 12) {
      // Monthly compounding
      runningBalance *= (1 + (annualRate / 100 / 12));
    } else if (compoundFreq === 4 && m % 3 === 0) {
      // Quarterly compounding
      runningBalance *= (1 + (annualRate / 100 / 4));
    } else if (compoundFreq === 2 && m % 6 === 0) {
      // Semi-annually
      runningBalance *= (1 + (annualRate / 100 / 2));
    } else if (compoundFreq === 1 && m % 12 === 0) {
      // Annually
      runningBalance *= (1 + (annualRate / 100));
    }

    monthlySchedule.push({
      timeline: `Month ${m}`,
      invested: totalPrincipal,
      returns: runningBalance - totalPrincipal,
      balance: runningBalance,
      yearInvested: deposit,
      yearInterest: runningBalance - totalPrincipal
    });

    if (m % 12 === 0 || m === totalMonths) {
      const yearNum = Math.ceil(m / 12);
      yearlySchedule.push({
        timeline: `Year ${yearNum}`,
        invested: totalPrincipal,
        returns: runningBalance - totalPrincipal,
        balance: runningBalance,
        yearInvested: currentYearInvested,
        yearInterest: runningBalance - currentYearStartBal - currentYearInvested
      });
      currentYearStartBal = runningBalance;
      currentYearInvested = 0;
    }
  }

  const totalInterest = runningBalance - totalPrincipal;
  const apy = (Math.pow(1 + (annualRate / 100 / compoundFreq), compoundFreq) - 1) * 100;
  const multiplier = runningBalance / Math.max(1, totalPrincipal);

  currentScheduleData = yearlySchedule;
  currentMonthlyScheduleData = monthlySchedule;

  // Update KPI Cards
  root.querySelector("#kpi-label-1").textContent = "Total Principal";
  root.querySelector("#kpi-val-1").textContent = formatCurrency(totalPrincipal);
  root.querySelector("#kpi-sub-1").textContent = "Deposit + Additions";

  root.querySelector("#kpi-label-2").textContent = "Total Interest Earned";
  root.querySelector("#kpi-val-2").textContent = formatCurrency(totalInterest);
  root.querySelector("#kpi-val-2").style.color = "var(--accent-emerald)";
  root.querySelector("#kpi-sub-2").textContent = `Effective APY: ${apy.toFixed(2)}%`;

  root.querySelector("#kpi-label-3").textContent = "Future Portfolio Value";
  root.querySelector("#kpi-val-3").textContent = formatCurrency(runningBalance);
  root.querySelector("#kpi-sub-3").textContent = `After ${years} Years`;

  root.querySelector("#kpi-label-4").textContent = "Wealth Multiplier";
  root.querySelector("#kpi-val-4").textContent = `${multiplier.toFixed(2)}x`;
  root.querySelector("#kpi-sub-4").textContent = "Portfolio Expansion";

  // Update Donut
  updateDonutChart(root, totalPrincipal, Math.max(0, totalInterest), "Principal", "Interest", "var(--accent-cyan)", "var(--accent-emerald)");
}

// 3. Loan EMI & Mortgage Implementation
function calculateEmi(root) {
  const principal = Math.max(100, parseFloat(root.querySelector("#emi-principal-input")?.value) || 100000);
  const annualRate = Math.max(0.1, parseFloat(root.querySelector("#emi-rate-input")?.value) || 7.5);
  const tenureYears = Math.max(1, parseInt(root.querySelector("#emi-tenure-input")?.value, 10) || 15);
  const prepayMonthly = Math.max(0, parseFloat(root.querySelector("#emi-prepay-monthly-input")?.value) || 0);
  const prepayAnnual = Math.max(0, parseFloat(root.querySelector("#emi-prepay-annual-input")?.value) || 0);

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  // Standard Reducing Balance EMI formula: [P * r * (1+r)^n] / [(1+r)^n - 1]
  const emiFactor = Math.pow(1 + monthlyRate, totalMonths);
  const standardEmi = (principal * monthlyRate * emiFactor) / (emiFactor - 1);

  // Month-by-month loan simulation
  let balance = principal;
  let totalInterestPaid = 0;
  let totalPrincipalPaid = 0;
  let yearlySchedule = [];
  let monthlySchedule = [];
  let monthsCount = 0;

  let currentYearPrincipal = 0;
  let currentYearInterest = 0;

  while (balance > 0.01 && monthsCount < 600) {
    monthsCount++;
    const interestForMonth = balance * monthlyRate;
    let payment = standardEmi + prepayMonthly;
    if (monthsCount % 12 === 0) payment += prepayAnnual;

    let principalForMonth = payment - interestForMonth;

    if (principalForMonth > balance) {
      principalForMonth = balance;
      payment = principalForMonth + interestForMonth;
      balance = 0;
    } else {
      balance -= principalForMonth;
    }

    totalInterestPaid += interestForMonth;
    totalPrincipalPaid += principalForMonth;
    currentYearPrincipal += principalForMonth;
    currentYearInterest += interestForMonth;

    monthlySchedule.push({
      timeline: `Month ${monthsCount}`,
      invested: totalPrincipalPaid,
      returns: totalInterestPaid,
      balance: Math.max(0, balance),
      yearInvested: principalForMonth,
      yearInterest: interestForMonth
    });

    if (monthsCount % 12 === 0 || balance <= 0.01) {
      const yearNum = Math.ceil(monthsCount / 12);
      yearlySchedule.push({
        timeline: `Year ${yearNum} (Mo ${monthsCount})`,
        invested: totalPrincipalPaid,
        returns: totalInterestPaid,
        balance: Math.max(0, balance),
        yearInvested: currentYearPrincipal,
        yearInterest: currentYearInterest
      });
      currentYearPrincipal = 0;
      currentYearInterest = 0;
    }
  }

  const totalCost = principal + totalInterestPaid;
  currentScheduleData = yearlySchedule;
  currentMonthlyScheduleData = monthlySchedule;

  // Prepayment savings comparison
  const prepaySavingsBadge = root.querySelector("#emi-prepay-savings");
  if (prepaySavingsBadge) {
    const hasPrepay = prepayMonthly > 0 || prepayAnnual > 0;
    if (hasPrepay) {
      const normalInterest = (standardEmi * totalMonths) - principal;
      const interestSaved = Math.max(0, normalInterest - totalInterestPaid);
      const monthsSaved = Math.max(0, totalMonths - monthsCount);
      const yearsSaved = Math.floor(monthsSaved / 12);
      const remMonthsSaved = monthsSaved % 12;

      let timeSavedStr = "";
      if (yearsSaved > 0 && remMonthsSaved > 0) {
        timeSavedStr = `${yearsSaved} Yr${yearsSaved > 1 ? "s" : ""}, ${remMonthsSaved} Mo${remMonthsSaved > 1 ? "s" : ""}`;
      } else if (yearsSaved > 0) {
        timeSavedStr = `${yearsSaved} Year${yearsSaved > 1 ? "s" : ""}`;
      } else {
        timeSavedStr = `${monthsSaved} Month${monthsSaved > 1 ? "s" : ""}`;
      }

      prepaySavingsBadge.innerHTML = `🚀 <strong>Accelerated:</strong> Saves <strong>${formatCurrency(interestSaved)}</strong> in interest &amp; debt-free <strong>${timeSavedStr}</strong> early!`;
      prepaySavingsBadge.style.color = "var(--accent-emerald)";
      prepaySavingsBadge.style.borderColor = "rgba(16, 185, 129, 0.4)";
    } else {
      prepaySavingsBadge.innerHTML = `💡 Tip: Add ${formatCurrency(50)} extra monthly or ${formatCurrency(1000)} yearly bonus to slash years off your mortgage.`;
      prepaySavingsBadge.style.color = "var(--text-muted)";
      prepaySavingsBadge.style.borderColor = "rgba(255, 255, 255, 0.08)";
    }
  }

  // Update KPI Cards
  root.querySelector("#kpi-label-1").textContent = "Monthly EMI Payment";
  root.querySelector("#kpi-val-1").textContent = formatCurrency(standardEmi);
  root.querySelector("#kpi-sub-1").textContent = `Base Payment (${tenureYears} Yrs)`;

  root.querySelector("#kpi-label-2").textContent = "Total Interest Payable";
  root.querySelector("#kpi-val-2").textContent = formatCurrency(totalInterestPaid);
  root.querySelector("#kpi-val-2").style.color = "var(--accent-rose)";
  root.querySelector("#kpi-sub-2").textContent = `${((totalInterestPaid / principal) * 100).toFixed(1)}% of Principal`;

  root.querySelector("#kpi-label-3").textContent = "Total Loan Cost";
  root.querySelector("#kpi-val-3").textContent = formatCurrency(totalCost);
  root.querySelector("#kpi-sub-3").textContent = "Principal + Total Interest";

  root.querySelector("#kpi-label-4").textContent = "Payoff Timeline";
  root.querySelector("#kpi-val-4").textContent = `${monthsCount} Months`;
  root.querySelector("#kpi-sub-4").textContent = `${(monthsCount / 12).toFixed(1)} Years Total`;

  // Update Donut
  updateDonutChart(root, principal, totalInterestPaid, "Principal", "Interest", "var(--accent-cyan)", "var(--accent-rose)");
}

// Donut Chart Renderer (Mathematically exact two-slice circle without overlap)
function updateDonutChart(root, slice1Val, slice2Val, label1, label2, color1, color2) {
  const total = slice1Val + slice2Val;
  const pct1 = total > 0 ? Math.round((slice1Val / total) * 100) : 50;
  const pct2 = 100 - pct1;

  const C = 251.327; // 2 * Math.PI * 40
  const len1 = (pct1 / 100) * C;
  const len2 = C - len1;

  const s1 = root.querySelector("#fin-donut-slice1");
  const s2 = root.querySelector("#fin-donut-slice2");

  if (s1 && s2) {
    s1.style.stroke = color1;
    s1.setAttribute("stroke-dasharray", `${len1.toFixed(2)} ${(C - len1).toFixed(2)}`);
    s1.setAttribute("stroke-dashoffset", "0");

    s2.style.stroke = color2;
    s2.setAttribute("stroke-dasharray", `${len2.toFixed(2)} ${(C - len2).toFixed(2)}`);
    s2.setAttribute("stroke-dashoffset", `-${len1.toFixed(2)}`);
  }

  const pctElem = root.querySelector("#fin-donut-pct");
  const pctLabel = root.querySelector("#fin-donut-pct-label");
  const pctVal = root.querySelector("#fin-donut-pct-val");

  if (pctElem) pctElem.textContent = `${pct1}%`;
  if (pctLabel) pctLabel.textContent = label1;
  if (pctVal) pctVal.textContent = formatCompactCurrency(slice1Val);

  const legColor1 = root.querySelector("#fin-legend-color1");
  const legColor2 = root.querySelector("#fin-legend-color2");
  const legText1 = root.querySelector("#fin-legend-text1");
  const legText2 = root.querySelector("#fin-legend-text2");

  if (legColor1) legColor1.style.background = color1;
  if (legColor2) legColor2.style.background = color2;
  if (legText1) legText1.innerHTML = `<span style="color: var(--text-main); font-weight: 700;">${label1}:</span> ${pct1}% (${formatCompactCurrency(slice1Val)})`;
  if (legText2) legText2.innerHTML = `<span style="color: var(--text-main); font-weight: 700;">${label2}:</span> ${pct2}% (${formatCompactCurrency(slice2Val)})`;
}

// Growth Curve SVG Renderer (With dynamic tab labels, smooth curves, and hover tooltips)
function renderGrowthSvg(root) {
  const svg = root?.querySelector("#fin-growth-svg");
  if (!svg || !currentScheduleData || currentScheduleData.length === 0) return;

  const width = 520;
  const height = 200;
  const pad = { top: 25, right: 25, bottom: 35, left: 65 };

  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const isEmi = currentTab === "emi";
  const color2 = isEmi ? "var(--accent-rose)" : "var(--accent-emerald)";

  // Update Legend Labels dynamically
  const leg1 = root.querySelector("#fin-growth-legend1");
  const leg2 = root.querySelector("#fin-growth-legend2");
  if (leg1) leg1.textContent = isEmi ? "■ Principal Repaid" : "■ Principal Contributed";
  if (leg2) {
    leg2.textContent = isEmi ? "■ Remaining Loan Balance" : "■ Total Maturity Curve";
    leg2.style.color = color2;
  }

  // Calculate scales
  const maxVal = Math.max(10, ...currentScheduleData.map(d => Math.max(d.balance || 0, d.invested || 0)));
  const count = currentScheduleData.length;

  let pointsBalance = [];
  let pointsInvested = [];

  currentScheduleData.forEach((d, idx) => {
    const x = pad.left + (idx / Math.max(1, count - 1)) * plotW;
    const yBal = pad.top + plotH - ((d.balance / maxVal) * plotH);
    const yInv = pad.top + plotH - ((d.invested / maxVal) * plotH);

    pointsBalance.push(`${x.toFixed(1)},${yBal.toFixed(1)}`);
    pointsInvested.push(`${x.toFixed(1)},${yInv.toFixed(1)}`);
  });

  const pathBalD = `M ${pointsBalance.join(" L ")}`;
  const pathInvD = `M ${pointsInvested.join(" L ")}`;
  const areaBalD = `M ${pad.left},${pad.top + plotH} L ${pointsBalance.join(" L ")} L ${pad.left + plotW},${pad.top + plotH} Z`;

  // X-axis label milestones (start, 33%, 66%, end)
  const xLabels = [
    { x: pad.left, label: currentScheduleData[0]?.timeline.split(" ")[1] || "1" },
    { x: pad.left + plotW * 0.33, label: currentScheduleData[Math.floor(count * 0.33)]?.timeline.split(" ")[1] || "" },
    { x: pad.left + plotW * 0.66, label: currentScheduleData[Math.floor(count * 0.66)]?.timeline.split(" ")[1] || "" },
    { x: pad.left + plotW, label: currentScheduleData[count - 1]?.timeline.split(" ")[1] || `${count}` }
  ];

  svg.innerHTML = `
    <defs>
      <linearGradient id="finGradBal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${isEmi ? "var(--accent-rose)" : "var(--accent-emerald)"}" stop-opacity="0.32"></stop>
        <stop offset="100%" stop-color="${isEmi ? "var(--accent-rose)" : "var(--accent-emerald)"}" stop-opacity="0.0"></stop>
      </linearGradient>
    </defs>

    <!-- Grid Horizontal Lines -->
    <line x1="${pad.left}" y1="${pad.top}" x2="${width - pad.right}" y2="${pad.top}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3 3"></line>
    <line x1="${pad.left}" y1="${pad.top + plotH * 0.5}" x2="${width - pad.right}" y2="${pad.top + plotH * 0.5}" stroke="rgba(255,255,255,0.06)" stroke-dasharray="3 3"></line>
    <line x1="${pad.left}" y1="${pad.top + plotH}" x2="${width - pad.right}" y2="${pad.top + plotH}" stroke="rgba(255,255,255,0.12)"></line>

    <!-- Y-axis Formatted Labels -->
    <text x="${pad.left - 8}" y="${pad.top + 4}" fill="var(--text-muted)" font-size="9" text-anchor="end" font-family="var(--font-mono)">${formatCompactCurrency(maxVal)}</text>
    <text x="${pad.left - 8}" y="${pad.top + plotH * 0.5 + 3}" fill="var(--text-muted)" font-size="9" text-anchor="end" font-family="var(--font-mono)">${formatCompactCurrency(maxVal / 2)}</text>
    <text x="${pad.left - 8}" y="${pad.top + plotH}" fill="var(--text-muted)" font-size="9" text-anchor="end" font-family="var(--font-mono)">0</text>

    <!-- X-axis Labels -->
    ${xLabels.map(xl => `
      <text x="${xl.x}" y="${pad.top + plotH + 18}" fill="var(--text-muted)" font-size="9" text-anchor="middle" font-family="var(--font-mono)">Yr ${xl.label}</text>
    `).join("")}

    <!-- Area Fill Under Curve -->
    <path d="${areaBalD}" fill="url(#finGradBal)"></path>

    <!-- Principal Curve (Dashed Cyan) -->
    <path d="${pathInvD}" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-dasharray="4 3"></path>

    <!-- Value / Debt Curve (Solid Line) -->
    <path d="${pathBalD}" fill="none" stroke="${color2}" stroke-width="2.5" stroke-linecap="round"></path>

    <!-- Interactive Crosshair & Tooltip Overlay Elements -->
    <line id="fin-hover-line" x1="0" y1="${pad.top}" x2="0" y2="${pad.top + plotH}" stroke="rgba(255,255,255,0.35)" stroke-dasharray="3 3" style="display: none; pointer-events: none;"></line>
    <circle id="fin-hover-dot-inv" r="4" fill="var(--accent-cyan)" stroke="#fff" stroke-width="1.5" style="display: none; pointer-events: none;"></circle>
    <circle id="fin-hover-dot-bal" r="4" fill="${color2}" stroke="#fff" stroke-width="1.5" style="display: none; pointer-events: none;"></circle>

    <!-- Invisible Touch / Mouse Tracking Rect -->
    <rect id="fin-chart-hitbox" x="${pad.left}" y="${pad.top}" width="${plotW}" height="${plotH}" fill="transparent" style="cursor: crosshair;"></rect>
  `;

  // Attach hover crosshair interactions
  const hitbox = svg.querySelector("#fin-chart-hitbox");
  const hoverLine = svg.querySelector("#fin-hover-line");
  const hoverDotInv = svg.querySelector("#fin-hover-dot-inv");
  const hoverDotBal = svg.querySelector("#fin-hover-dot-bal");

  const onPointerMove = (e) => {
    const rect = svg.getBoundingClientRect();
    const mouseX = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const svgX = (mouseX / rect.width) * width;

    if (svgX < pad.left || svgX > pad.left + plotW) {
      onPointerLeave();
      return;
    }

    const pct = (svgX - pad.left) / plotW;
    const idx = Math.max(0, Math.min(count - 1, Math.round(pct * (count - 1))));
    const d = currentScheduleData[idx];
    if (!d) return;

    const x = pad.left + (idx / Math.max(1, count - 1)) * plotW;
    const yBal = pad.top + plotH - ((d.balance / maxVal) * plotH);
    const yInv = pad.top + plotH - ((d.invested / maxVal) * plotH);

    if (hoverLine) {
      hoverLine.setAttribute("x1", x);
      hoverLine.setAttribute("x2", x);
      hoverLine.style.display = "block";
    }

    if (hoverDotInv) {
      hoverDotInv.setAttribute("cx", x);
      hoverDotInv.setAttribute("cy", yInv);
      hoverDotInv.style.display = "block";
    }

    if (hoverDotBal) {
      hoverDotBal.setAttribute("cx", x);
      hoverDotBal.setAttribute("cy", yBal);
      hoverDotBal.style.display = "block";
    }
  };

  const onPointerLeave = () => {
    if (hoverLine) hoverLine.style.display = "none";
    if (hoverDotInv) hoverDotInv.style.display = "none";
    if (hoverDotBal) hoverDotBal.style.display = "none";
  };

  hitbox?.addEventListener("mousemove", onPointerMove);
  hitbox?.addEventListener("mouseleave", onPointerLeave);
  hitbox?.addEventListener("touchmove", onPointerMove, { passive: true });
  hitbox?.addEventListener("touchend", onPointerLeave);
}

// Table Renderer (Supports both Yearly and Monthly breakdown)
function renderActiveTable(root) {
  const tbody = root.querySelector("#fin-schedule-tbody");
  const thTimeline = root.querySelector("#th-col-timeline");
  const thInvested = root.querySelector("#th-col-invested");
  const thReturns = root.querySelector("#th-col-returns");
  const thBalance = root.querySelector("#th-col-balance");

  const isEmi = currentTab === "emi";

  if (thTimeline) thTimeline.textContent = tableScheduleMode === "monthly" ? "Month" : "Timeline";
  if (thInvested) thInvested.textContent = isEmi ? "Principal Repaid" : "Total Invested";
  if (thReturns) thReturns.textContent = isEmi ? "Interest Paid" : "Returns Earned";
  if (thBalance) thBalance.textContent = isEmi ? "Outstanding Debt" : "Closing Corpus";

  const data = tableScheduleMode === "monthly" ? currentMonthlyScheduleData : currentScheduleData;
  if (!tbody || !data || data.length === 0) return;

  tbody.innerHTML = data.map(row => `
    <tr class="fin-table-row" style="border-bottom: 1px solid rgba(255,255,255,0.04); transition: background 0.15s;">
      <td style="padding: 7px 10px; text-align: left; font-weight: 600; color: var(--text-main);">${escapeHtml(row.timeline)}</td>
      <td style="padding: 7px 10px; color: var(--accent-cyan);">${formatCurrency(row.invested)}</td>
      <td style="padding: 7px 10px; color: ${isEmi ? "var(--accent-rose)" : "var(--accent-emerald)"}; font-weight: 600;">${formatCurrency(row.returns)}</td>
      <td style="padding: 7px 10px; font-weight: 700; color: var(--text-main);">${formatCurrency(row.balance)}</td>
    </tr>
  `).join("");
}

// Copy 1-Click Plan Summary to Clipboard
function copyFinancialSummary(root) {
  let summary = "";
  const cur = currentCurrency;

  if (currentTab === "sip") {
    const rate = root.querySelector("#sip-rate-input")?.value;
    const years = root.querySelector("#sip-years-input")?.value;
    const totalInv = root.querySelector("#kpi-val-1")?.textContent;
    const wealthGain = root.querySelector("#kpi-val-2")?.textContent;
    const corpus = root.querySelector("#kpi-val-3")?.textContent;
    const monthlyAmt = sipMode === "target" ? totalInv : formatCurrency(root.querySelector("#sip-monthly-input")?.value, cur);

    summary = `📈 SIP Wealth Projection (OmniTool Hub)
─────────────────────────────
• Investment Type: ${sipMode === "target" ? "Target Goal SIP" : "Regular Monthly SIP"}
• Monthly Amount: ${monthlyAmt}
• Expected Return: ${rate}% p.a.
• Duration: ${years} Years
• Total Invested: ${totalInv}
• Estimated Wealth Gains: ${wealthGain}
• Final Maturity Corpus: ${corpus}
─────────────────────────────
Calculated 100% Client-Side with OmniTool Hub`;
  } else if (currentTab === "compound") {
    const prin = formatCurrency(root.querySelector("#ci-principal-input")?.value, cur);
    const add = formatCurrency(root.querySelector("#ci-addition-input")?.value, cur);
    const rate = root.querySelector("#ci-rate-input")?.value;
    const years = root.querySelector("#ci-years-input")?.value;
    const totalPrin = root.querySelector("#kpi-val-1")?.textContent;
    const interest = root.querySelector("#kpi-val-2")?.textContent;
    const portfolio = root.querySelector("#kpi-val-3")?.textContent;

    summary = `🌱 Compound Interest Projection (OmniTool Hub)
─────────────────────────────
• Initial Deposit: ${prin}
• Periodic Addition: ${add}
• Annual Rate: ${rate}% p.a.
• Duration: ${years} Years
• Total Principal: ${totalPrin}
• Total Interest Earned: ${interest}
• Future Portfolio Value: ${portfolio}
─────────────────────────────
Calculated 100% Client-Side with OmniTool Hub`;
  } else if (currentTab === "emi") {
    const prin = formatCurrency(root.querySelector("#emi-principal-input")?.value, cur);
    const rate = root.querySelector("#emi-rate-input")?.value;
    const years = root.querySelector("#emi-tenure-input")?.value;
    const emi = root.querySelector("#kpi-val-1")?.textContent;
    const interest = root.querySelector("#kpi-val-2")?.textContent;
    const totalCost = root.querySelector("#kpi-val-3")?.textContent;
    const timeline = root.querySelector("#kpi-val-4")?.textContent;

    summary = `🏠 Loan EMI & Mortgage Summary (OmniTool Hub)
─────────────────────────────
• Loan Principal: ${prin}
• Interest Rate: ${rate}% p.a.
• Loan Tenure: ${years} Years
• Monthly EMI Payment: ${emi}
• Total Interest Payable: ${interest}
• Total Loan Payment: ${totalCost}
• Payoff Timeline: ${timeline}
─────────────────────────────
Calculated 100% Client-Side with OmniTool Hub`;
  }

  navigator.clipboard.writeText(summary).then(() => {
    if (appInstance && typeof appInstance.showToast === "function") {
      appInstance.showToast("Copied financial plan summary to clipboard!", "success");
    }
  }).catch(() => {
    if (appInstance && typeof appInstance.showToast === "function") {
      appInstance.showToast("Failed to copy summary", "error");
    }
  });
}

// CSV Exporter (Exports the currently active schedule - Yearly or Monthly)
function exportScheduleCsv(root) {
  const isMonthly = tableScheduleMode === "monthly";
  const data = isMonthly ? currentMonthlyScheduleData : currentScheduleData;
  if (!data || data.length === 0) return;

  const isEmi = currentTab === "emi";
  const col2Title = isEmi ? "Principal Repaid" : "Total Invested";
  const col3Title = isEmi ? "Interest Paid" : "Returns Earned";
  const col4Title = isEmi ? "Outstanding Debt" : "Closing Corpus";

  let csvContent = `Timeline,${col2Title},${col3Title},${col4Title}\n`;

  data.forEach(row => {
    csvContent += `"${row.timeline}",${Math.round(row.invested)},${Math.round(row.returns)},${Math.round(row.balance)}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `OmniTool_${currentTab}_${tableScheduleMode}_schedule.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  if (appInstance && typeof appInstance.showToast === "function") {
    appInstance.showToast(`Exported ${tableScheduleMode.toUpperCase()} ${currentTab.toUpperCase()} schedule to CSV!`, "success");
  }
}
