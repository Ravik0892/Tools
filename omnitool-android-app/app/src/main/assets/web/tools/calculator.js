import { escapeHtml } from './utils.js';

let formulaStr = "";
let lastResult = null;
let memoryValue = 0;
let isDegrees = true;
let isResultState = false;
let calcHistory = [];
let app = null;

const scientificConstants = [
  { name: "Speed of Light (c)", val: "299792458", desc: "m/s (Exact speed in vacuum)" },
  { name: "Planck Constant (h)", val: "6.62607015e-34", desc: "J·s (Quantum of action)" },
  { name: "Gravitational Constant (G)", val: "6.6743e-11", desc: "m³/kg/s² (Newtonian gravitation)" },
  { name: "Boltzmann Constant (kB)", val: "1.380649e-23", desc: "J/K (Temperature-energy relation)" },
  { name: "Avogadro Constant (NA)", val: "6.02214076e23", desc: "mol⁻¹ (Constituents per mole)" },
  { name: "Elementary Charge (e)", val: "1.602176634e-19", desc: "C (Charge of a proton)" },
  { name: "Electron Mass (me)", val: "9.1093837e-31", desc: "kg (Rest mass of an electron)" },
  { name: "Proton Mass (mp)", val: "1.67262192e-27", desc: "kg (Rest mass of a proton)" },
  { name: "Gas Constant (R)", val: "8.314462618", desc: "J/(mol·K) (Ideal gas constant)" },
  { name: "Faraday Constant (F)", val: "96485.3321", desc: "C/mol (Charge per mole of electrons)" }
];

export default {
  id: "calculator",
  name: "Scientific Calculator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Left Panel: Calculator Interface -->
        <div class="tool-panel" style="gap: 12px; background: var(--bg-card); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
          <div class="panel-header" style="border: none; padding-bottom: 0;">
            <h3 style="color: var(--accent-cyan);"><svg viewBox="0 0 24 24" style="width: 18px; height: 18px; stroke: var(--accent-cyan); fill: none; stroke-width: 2; margin-right: 6px;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line></svg> Computron Pad</h3>
            <div style="display: flex; gap: 6px; align-items: center;">
              <span id="calc-memory-badge" class="theme-badge" style="font-size: 10px; display: none; color: var(--accent-purple); background-color: rgba(157, 78, 221, 0.15);" title="Memory Stored">M</span>
              <span id="calc-angle-mode-badge" class="theme-badge" style="font-size: 10px; cursor: pointer; user-select: none;" title="Click to Toggle DEG/RAD">DEG</span>
            </div>
          </div>
          
          <!-- Display Screen -->
          <div style="background-color: var(--bg-input); border: 1px solid var(--border-color); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; min-height: 100px; font-family: var(--font-mono); word-break: break-all; position: relative; box-shadow: inset 0 2px 8px rgba(0,0,0,0.15);">
            <div id="calc-formula-display" style="font-size: 13px; color: var(--text-muted); min-height: 18px; line-height: 1.4; text-align: right; width: 100%;"></div>
            <div id="calc-result-display" style="font-size: 32px; font-weight: 700; color: var(--accent-cyan); text-align: right; width: 100%; margin-top: 8px;">0</div>
          </div>

          <!-- Programmer Base Conversions Bar -->
          <div id="calc-base-conversion-bar" style="display: none; grid-template-columns: repeat(4, 1fr); gap: 4px; padding: 8px 12px; background-color: var(--bg-input); border: 1px dashed var(--border-color); border-radius: 8px; font-family: var(--font-mono); font-size: 9px; color: var(--text-muted); margin-top: 4px; margin-bottom: 4px;">
            <div>HEX: <span id="calc-base-hex" style="color: var(--accent-cyan); font-weight: 700;">0x0</span></div>
            <div>DEC: <span id="calc-base-dec" style="color: var(--accent-purple); font-weight: 700;">0</span></div>
            <div>OCT: <span id="calc-base-oct" style="color: var(--accent-orange); font-weight: 700;">0</span></div>
            <div>BIN: <span id="calc-base-bin" style="color: var(--accent-emerald); font-weight: 700;">0b0</span></div>
          </div>

          <!-- Calculator Keys Layout Grid -->
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <!-- Mode & Memory Keys Row -->
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
              <button class="calc-btn mem-key" data-op="mc">MC</button>
              <button class="calc-btn mem-key" data-op="mr">MR</button>
              <button class="calc-btn mem-key" data-op="mplus">M+</button>
              <button class="calc-btn mem-key" data-op="mminus">M-</button>
              <button class="calc-btn mem-key" data-op="ms">MS</button>
            </div>
            
            <!-- Scientific / Standard Toggle row -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 8px; margin-bottom: 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px;">SCIENTIFIC FUNCTIONS</span>
              <label class="checkbox-label" style="font-size: 11px; color: var(--text-muted); margin: 0; cursor: pointer;">
                <input type="checkbox" id="calc-scientific-toggle" checked style="width: 14px; height: 14px; cursor: pointer; accent-color: var(--accent-cyan);"> Expand Pad
              </label>
            </div>

            <!-- Scientific Keypad Container -->
            <div id="calc-scientific-pad" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; transition: all var(--transition-normal);">
              <button class="calc-btn fn-key" data-op="sin">sin</button>
              <button class="calc-btn fn-key" data-op="cos">cos</button>
              <button class="calc-btn fn-key" data-op="tan">tan</button>
              <button class="calc-btn fn-key" data-op="asin">asin</button>
              <button class="calc-btn fn-key" data-op="acos">acos</button>
              <button class="calc-btn fn-key" data-op="atan">atan</button>
              <button class="calc-btn fn-key" data-op="ln">ln</button>
              <button class="calc-btn fn-key" data-op="log">log</button>
              <button class="calc-btn fn-key" data-op="pow">x<sup>y</sup></button>
              <button class="calc-btn fn-key" data-op="sq">x²</button>
              <button class="calc-btn fn-key" data-op="cube">x³</button>
              <button class="calc-btn fn-key" data-op="sqrt">√</button>
              <button class="calc-btn fn-key" data-op="cbrt">³√</button>
              <button class="calc-btn fn-key" data-op="factorial">n!</button>
              <button class="calc-btn fn-key" data-op="recip">1/x</button>
              <button class="calc-btn fn-key" data-val="PI">π</button>
              <button class="calc-btn fn-key" data-val="E">e</button>
              <button class="calc-btn fn-key" data-val="(">(</button>
              <button class="calc-btn fn-key" data-val=")">)</button>
              <button class="calc-btn fn-key" data-op="mod">mod</button>
            </div>

            <!-- Standard Keypad -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 4px;">
              <button class="calc-btn action-key" data-op="clear" style="color: var(--accent-rose);">C</button>
              <button class="calc-btn action-key" data-op="allclear" style="color: var(--accent-rose);">AC</button>
              <button class="calc-btn action-key" data-op="backspace">⌫</button>
              <button class="calc-btn op-key" data-op="divide">÷</button>

              <button class="calc-btn num-key" data-val="7">7</button>
              <button class="calc-btn num-key" data-val="8">8</button>
              <button class="calc-btn num-key" data-val="9">9</button>
              <button class="calc-btn op-key" data-op="multiply">×</button>

              <button class="calc-btn num-key" data-val="4">4</button>
              <button class="calc-btn num-key" data-val="5">5</button>
              <button class="calc-btn num-key" data-val="6">6</button>
              <button class="calc-btn op-key" data-op="subtract">-</button>

                  <button class="calc-btn num-key" data-val="1">1</button>
                  <button class="calc-btn num-key" data-val="2">2</button>
                  <button class="calc-btn num-key" data-val="3">3</button>
                  <button class="calc-btn op-key" data-op="add">+</button>

                  <button class="calc-btn action-key" data-op="negate">+/-</button>
                  <button class="calc-btn num-key" data-val="0">0</button>
                  <button class="calc-btn num-key" data-val=".">.</button>
                  <button class="calc-btn op-key equal-key" data-op="equals" style="background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); color: var(--text-inverse); font-weight: 800;">=</button>
            </div>
          </div>
        </div>

        <!-- Right Panel: History Log & Mathematical Constants -->
        <div class="tool-panel" style="background: rgba(18, 24, 38, 0.7); border: 1px solid var(--border-color); border-radius: 16px;">
          <div class="tab-container" style="margin-bottom: 8px;">
            <div style="display: flex; gap: 4px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
              <button class="tool-btn secondary active" id="calc-tab-history" style="flex: 1; font-size: 11px; padding: 6px;">History Log</button>
              <button class="tool-btn secondary" id="calc-tab-constants" style="flex: 1; font-size: 11px; padding: 6px;">Constants</button>
              <button class="tool-btn secondary" id="calc-tab-grapher" style="flex: 1; font-size: 11px; padding: 6px;">2D Grapher</button>
            </div>
          </div>

          <!-- History View Section -->
          <div id="calc-sec-history" style="display: flex; flex-direction: column; gap: 10px; flex: 1; overflow: hidden;">
            <div class="panel-header" style="border: none; padding: 0;">
              <h4 style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Recent Calculations</h4>
              <button class="tool-btn secondary" id="calc-clear-history-btn" style="padding: 4px 8px; font-size: 10px;">Clear List</button>
            </div>
            <div id="calc-history-list" style="display: flex; flex-direction: column; gap: 6px; overflow-y: auto; flex: 1; padding-right: 4px; min-height: 200px;">
              <span style="font-size: 12px; color: var(--text-muted); text-align: center; margin-top: 40px; font-style: italic;">No calculations performed yet</span>
            </div>
          </div>

          <!-- Constants View Section -->
          <div id="calc-sec-constants" style="display: none; flex-direction: column; gap: 10px; flex: 1; overflow: hidden;">
            <div class="panel-header" style="border: none; padding: 0;">
              <h4 style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Constants Gallery</h4>
              <span style="font-size: 10px; color: var(--text-muted);">Click to insert value</span>
            </div>
            <div id="calc-constants-grid" style="display: flex; flex-direction: column; gap: 8px; overflow-y: auto; flex: 1; padding-right: 4px; min-height: 200px;">
              <!-- Dynamically loaded constants -->
            </div>
          </div>

          <!-- Grapher View Section -->
          <div id="calc-sec-grapher" style="display: none; flex-direction: column; gap: 10px; flex: 1; overflow: hidden;">
            <div class="panel-header" style="border: none; padding: 0;">
              <h4 style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">2D Function Plotter</h4>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; flex: 1; overflow-y: auto; padding-right: 4px;">
              <div class="form-group" style="margin-bottom: 4px;">
                <label for="calc-graph-func">Function f(x) =</label>
                <input type="text" id="calc-graph-func" class="form-input" value="sin(x)" style="font-family: var(--font-mono); font-size: 13px; margin-top: 4px;" placeholder="e.g. sin(x) * cos(x)">
              </div>
              <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 4px;">
                <div class="form-group" style="margin: 0;">
                  <label for="calc-graph-xmin">Min X</label>
                  <input type="number" id="calc-graph-xmin" class="form-input" value="-10" style="padding: 6px; font-size: 11px;">
                </div>
                <div class="form-group" style="margin: 0;">
                  <label for="calc-graph-xmax">Max X</label>
                  <input type="number" id="calc-graph-xmax" class="form-input" value="10" style="padding: 6px; font-size: 11px;">
                </div>
              </div>
              <button class="tool-btn primary" id="calc-graph-draw-btn" style="padding: 8px; font-size: 11px;">Plot Function</button>
              <div style="flex: 1; display: flex; align-items: center; justify-content: center; background-color: #05070c; border: 1px solid var(--border-color); border-radius: 8px; padding: 6px; min-height: 180px; position: relative; margin-top: 4px;">
                <canvas id="calc-graph-canvas" width="240" height="180" style="max-width: 100%; border-radius: 4px; background-color: #000000; display: block;"></canvas>
              </div>
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
            <button class="tool-btn secondary" id="calc-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Arithmetic Calculations</strong>: Type formulas using buttons or your keyboard (e.g. <code>2 + 3 * 4</code> then press <code>=</code>).</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Scientific Operations</strong>: Toggle DEG/RAD mode, expand scientific functions pad, or click <strong>Constants</strong> to insert physical constant values.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>2D Grapher Plotting</strong>: Click <strong>2D Grapher</strong> tab, enter an algebraic function f(x) (e.g. <code>sin(x) * x</code>), and click <strong>Plot Function</strong>.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Trig Formula</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Exponent Arithmetic</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input Formula</span>
                <div class="tool-guide-io-value">sin(30) + cos(60) (DEG Mode)</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Output Result</span>
                <div class="tool-guide-io-value">1</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input Formula</span>
                <div class="tool-guide-io-value">2^3 + 5*2 - 4</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Output Result</span>
                <div class="tool-guide-io-value">14</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    app = appInstance;
    formulaStr = "";
    lastResult = null;
    isResultState = false;

    // Load elements scoped to container
    const formulaDisplay = container.querySelector("#calc-formula-display");
    const resultDisplay = container.querySelector("#calc-result-display");
    const memoryBadge = container.querySelector("#calc-memory-badge");
    const angleBadge = container.querySelector("#calc-angle-mode-badge");
    const baseConversionBar = container.querySelector("#calc-base-conversion-bar");
    const baseHex = container.querySelector("#calc-base-hex");
    const baseDec = container.querySelector("#calc-base-dec");
    const baseOct = container.querySelector("#calc-base-oct");
    const baseBin = container.querySelector("#calc-base-bin");

    const loadCalcHistory = () => {
      const saved = localStorage.getItem("omnitool_calc_history");
      if (saved) {
        try {
          calcHistory = JSON.parse(saved);
        } catch (e) {
          calcHistory = [];
        }
      } else {
        calcHistory = [];
      }
    };

    const saveCalcHistory = () => {
      localStorage.setItem("omnitool_calc_history", JSON.stringify(calcHistory));
    };

    const updateMemoryUI = () => {
      if (memoryBadge) {
        memoryBadge.style.display = memoryValue !== 0 ? "inline-block" : "none";
      }
    };

    const renderHistory = () => {
      const listEl = container.querySelector("#calc-history-list");
      if (!listEl) return;

      if (calcHistory.length === 0) {
        listEl.innerHTML = `<span style="font-size: 12px; color: var(--text-muted); text-align: center; margin-top: 40px; font-style: italic;">No calculations performed yet</span>`;
        return;
      }

      listEl.innerHTML = "";
      calcHistory.forEach((item, idx) => {
        const card = document.createElement("div");
        card.className = "calc-history-item";
        card.innerHTML = `
          <div class="calc-history-formula">${escapeHtml(item.formula)}</div>
          <div class="calc-history-result">${escapeHtml(item.result)}</div>
          <div class="calc-history-actions">
            <button class="gs-preset-btn hist-action-btn" data-action="load-formula" data-val="${escapeHtml(item.formula)}" style="padding: 2px 6px; font-size: 10px;">Load Formula</button>
            <button class="gs-preset-btn hist-action-btn" data-action="load-result" data-val="${escapeHtml(item.result)}" style="padding: 2px 6px; font-size: 10px;">Load Result</button>
            <button class="gs-preset-btn hist-action-btn" data-action="copy" data-val="${escapeHtml(item.result)}" style="padding: 2px 6px; font-size: 10px;">Copy</button>
          </div>
        `;

        card.querySelectorAll(".hist-action-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const act = btn.getAttribute("data-action");
            const val = btn.getAttribute("data-val");
            if (act === "load-formula") {
              formulaStr = val;
              isResultState = false;
              updateDisplay();
              app.showToast("Loaded formula to input", "info");
            } else if (act === "load-result") {
              if (isResultState) {
                formulaStr = val;
                isResultState = false;
              } else {
                formulaStr += val;
              }
              updateDisplay();
              app.showToast("Inserted result value", "info");
            } else if (act === "copy") {
              app.copyText(val);
            }
          });
        });
        listEl.appendChild(card);
      });
    };

    const renderConstants = () => {
      const gridEl = container.querySelector("#calc-constants-grid");
      if (!gridEl) return;

      gridEl.innerHTML = "";
      scientificConstants.forEach(c => {
        const card = document.createElement("div");
        card.className = "calc-constant-card";
        card.innerHTML = `
          <div class="calc-constant-header">
            <span class="calc-constant-name">${escapeHtml(c.name)}</span>
            <span class="calc-constant-val">${escapeHtml(c.val)}</span>
          </div>
          <div class="calc-constant-desc">${escapeHtml(c.desc)}</div>
        `;
        card.addEventListener("click", () => {
          if (isResultState) {
            formulaStr = c.val;
            isResultState = false;
          } else {
            formulaStr += c.val;
          }
          updateDisplay();
          app.showToast(`Inserted ${c.name.split(" ")[0]} value`, "info");
        });
        gridEl.appendChild(card);
      });
    };

    const updateDisplay = () => {
      if (formulaDisplay) {
        formulaDisplay.innerText = formulaStr || "";
      }
    };

    // Math Parser Helpers
    function tokenize(str) {
      const tokens = [];
      let i = 0;
      const functions = ["asin", "acos", "atan", "sin", "cos", "tan", "ln", "log", "sqrt", "cbrt"];

      while (i < str.length) {
        let char = str[i];
        if (/\s/.test(char)) {
          i++;
          continue;
        }

        const numRegex = /^(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?/;
        const numMatch = str.slice(i).match(numRegex);
        if (numMatch) {
          tokens.push({ type: "NUMBER", value: parseFloat(numMatch[0]) });
          i += numMatch[0].length;
          continue;
        }

        if (char === "+") {
          tokens.push({ type: "PLUS" });
          i++;
          continue;
        }
        if (char === "-") {
          tokens.push({ type: "MINUS" });
          i++;
          continue;
        }
        if (char === "*" || char === "×") {
          tokens.push({ type: "MULTIPLY" });
          i++;
          continue;
        }
        if (char === "/" || char === "÷") {
          tokens.push({ type: "DIVIDE" });
          i++;
          continue;
        }
        if (char === "^") {
          tokens.push({ type: "POWER" });
          i++;
          continue;
        }
        if (char === "%") {
          tokens.push({ type: "MOD" });
          i++;
          continue;
        }
        if (char === "(") {
          tokens.push({ type: "LPAREN" });
          i++;
          continue;
        }
        if (char === ")") {
          tokens.push({ type: "RPAREN" });
          i++;
          continue;
        }

        if (str.slice(i, i + 3) === "mod") {
          tokens.push({ type: "MOD" });
          i += 3;
          continue;
        }

        if (char === "π") {
          tokens.push({ type: "CONSTANT", value: Math.PI });
          i++;
          continue;
        }

        let foundFn = false;
        for (const fn of functions) {
          if (str.slice(i).startsWith(fn)) {
            tokens.push({ type: "FUNCTION", value: fn });
            i += fn.length;
            foundFn = true;
            break;
          }
        }
        if (foundFn) continue;

        if (str.slice(i, i + 2).toUpperCase() === "PI") {
          tokens.push({ type: "CONSTANT", value: Math.PI });
          i += 2;
          continue;
        }
        if (char === "e" || char === "E") {
          tokens.push({ type: "CONSTANT", value: Math.E });
          i++;
          continue;
        }
        if (char === "x" || char === "X") {
          tokens.push({ type: "VARIABLE", value: "x" });
          i++;
          continue;
        }

        if (char === "!") {
          tokens.push({ type: "FACTORIAL" });
          i++;
          continue;
        }
        if (char === "²") {
          tokens.push({ type: "SQUARE" });
          i++;
          continue;
        }
        if (char === "³") {
          tokens.push({ type: "CUBE" });
          i++;
          continue;
        }

        if (str.slice(i, i + 2) === "³√") {
          tokens.push({ type: "FUNCTION", value: "cbrt" });
          i += 2;
          continue;
        }
        if (char === "√") {
          tokens.push({ type: "FUNCTION", value: "sqrt" });
          i++;
          continue;
        }

        throw new Error(`Invalid character: '${char}'`);
      }
      return tokens;
    }

    function insertImplicitMultiplications(tokens) {
      const result = [];
      for (let i = 0; i < tokens.length; i++) {
        const curr = tokens[i];
        result.push(curr);
        if (i < tokens.length - 1) {
          const next = tokens[i + 1];
          const currIsOperand = curr.type === "NUMBER" || curr.type === "CONSTANT" || curr.type === "RPAREN" || curr.type === "FACTORIAL" || curr.type === "SQUARE" || curr.type === "CUBE" || curr.type === "VARIABLE";
          const nextIsOperand = next.type === "NUMBER" || next.type === "CONSTANT" || next.type === "LPAREN" || next.type === "FUNCTION" || next.type === "VARIABLE";
          if (currIsOperand && nextIsOperand) {
            result.push({ type: "MULTIPLY" });
          }
        }
      }
      return result;
    }

    function parseAndEvaluate(str, isDegrees, variables) {
      const rawTokens = tokenize(str);
      const tokens = insertImplicitMultiplications(rawTokens);
      let index = 0;

      function peek() {
        return tokens[index];
      }

      function consume(expectedType) {
        const t = peek();
        if (!t) {
          throw new Error("Unexpected end of expression");
        }
        if (expectedType && t.type !== expectedType) {
          throw new Error(`Expected token ${expectedType} but found ${t.type}`);
        }
        index++;
        return t;
      }

      function parseExpression() {
        let node = parseTerm();
        while (peek() && (peek().type === "PLUS" || peek().type === "MINUS")) {
          const token = consume();
          const right = parseTerm();
          if (token.type === "PLUS") {
            node = node + right;
          } else {
            node = node - right;
          }
        }
        return node;
      }

      function parseTerm() {
        let node = parsePower();
        while (peek() && (peek().type === "MULTIPLY" || peek().type === "DIVIDE" || peek().type === "MOD")) {
          const token = consume();
          const right = parsePower();
          if (token.type === "MULTIPLY") {
            node = node * right;
          } else if (token.type === "DIVIDE") {
            if (right === 0) throw new Error("Division by zero");
            node = node / right;
          } else {
            node = node % right;
          }
        }
        return node;
      }

      function parsePower() {
        let node = parseUnary();
        while (peek() && peek().type === "POWER") {
          consume();
          const right = parseUnary();
          node = Math.pow(node, right);
        }
        return node;
      }

      function parseUnary() {
        const t = peek();
        if (t && t.type === "PLUS") {
          consume();
          return parseUnary();
        }
        if (t && t.type === "MINUS") {
          consume();
          return -parseUnary();
        }
        return parsePostfix();
      }

      function parsePostfix() {
        let node = parsePrimary();
        while (peek() && (peek().type === "FACTORIAL" || peek().type === "SQUARE" || peek().type === "CUBE")) {
          const token = consume();
          if (token.type === "FACTORIAL") {
            node = factorial(node);
          } else if (token.type === "SQUARE") {
            node = node * node;
          } else if (token.type === "CUBE") {
            node = node * node * node;
          }
        }
        return node;
      }

      function parsePrimary() {
        const t = peek();
        if (!t) {
          throw new Error("Unexpected end of expression");
        }

        if (t.type === "NUMBER") {
          consume();
          return t.value;
        }
        if (t.type === "CONSTANT") {
          consume();
          return t.value;
        }
        if (t.type === "VARIABLE") {
          consume();
          return variables && variables.hasOwnProperty(t.value) ? variables[t.value] : 0;
        }
        if (t.type === "LPAREN") {
          consume();
          const val = parseExpression();
          consume("RPAREN");
          return val;
        }
        if (t.type === "FUNCTION") {
          consume();
          let arg;
          const next = peek();
          if (next && next.type === "LPAREN") {
            consume("LPAREN");
            arg = parseExpression();
            consume("RPAREN");
          } else {
            arg = parseUnary();
          }
          return evaluateFunction(t.value, arg, isDegrees);
        }
        throw new Error(`Unexpected token: ${t.type}`);
      }

      const result = parseExpression();
      if (index < tokens.length) {
        throw new Error("Extra characters at end of expression");
      }
      return result;
    }

    function factorial(n) {
      if (n < 0) throw new Error("Factorial of negative number");
      if (!Number.isInteger(n)) throw new Error("Factorial of non-integer");
      if (n > 170) throw new Error("Overflow (n > 170)");
      let res = 1;
      for (let i = 2; i <= n; i++) res *= i;
      return res;
    }

    function evaluateFunction(fn, arg, isDegrees) {
      let angle = arg;
      if (isDegrees && ["sin", "cos", "tan"].includes(fn)) {
        angle = (arg * Math.PI) / 180;
      }
      let val;
      switch (fn) {
        case "sin":
          val = Math.sin(angle);
          break;
        case "cos":
          val = Math.cos(angle);
          break;
        case "tan":
          val = Math.tan(angle);
          if (Math.abs(val) > 1e14) throw new Error("Tangent is undefined");
          break;
        case "asin":
          val = Math.asin(arg);
          if (isDegrees) val = (val * 180) / Math.PI;
          break;
        case "acos":
          val = Math.acos(arg);
          if (isDegrees) val = (val * 180) / Math.PI;
          break;
        case "atan":
          val = Math.atan(arg);
          if (isDegrees) val = (val * 180) / Math.PI;
          break;
        case "ln":
          if (arg <= 0) throw new Error("Logarithm argument must be positive");
          val = Math.log(arg);
          break;
        case "log":
          if (arg <= 0) throw new Error("Logarithm argument must be positive");
          val = Math.log10(arg);
          break;
        case "sqrt":
          if (arg < 0) throw new Error("Square root of negative number");
          val = Math.sqrt(arg);
          break;
        case "cbrt":
          val = Math.cbrt(arg);
          break;
        default:
          throw new Error(`Unknown function: ${fn}`);
      }
      if (isNaN(val)) throw new Error("Invalid result (NaN)");
      return val;
    }

    function formatCalcResult(val) {
      if (typeof val !== "number") return val;
      if (!isFinite(val)) return "Error";
      let str = Number(val.toPrecision(14)).toString();
      if (Math.abs(val) > 1e14 || (Math.abs(val) < 1e-12 && val !== 0)) {
        return val.toExponential(8);
      }
      if (str.includes(".")) {
        return parseFloat(str).toString();
      }
      return str;
    }

    function toggleNegate(str) {
      const negMatch = str.match(/\(-\b(\d+(\.\d*)?|\.\d+)\)$/);
      if (negMatch) {
        return str.substring(0, negMatch.index) + negMatch[1];
      }
      const posMatch = str.match(/\b(\d+(\.\d*)?|\.\d+)$/);
      if (posMatch) {
        return str.substring(0, posMatch.index) + `(-${posMatch[1]})`;
      }
      if (str.endsWith("(-")) {
        return str.slice(0, -2);
      }
      return str + "(-";
    }

    const handleCalcInput = (type, key) => {
      if (isResultState) {
        if (type === "num" || key === "PI" || key === "E" || key === "(" || key === ")" || key === "sin" || key === "cos" || key === "tan" || key === "asin" || key === "acos" || key === "atan" || key === "ln" || key === "log" || key === "sqrt" || key === "cbrt" || key === "recip") {
          formulaStr = "";
          isResultState = false;
        } else if (type === "op" && key !== "equals") {
          const operatorMap = {
            add: " + ",
            subtract: " - ",
            multiply: " × ",
            divide: " ÷ ",
            mod: " mod "
          };
          formulaStr = (lastResult !== null ? formatCalcResult(lastResult) : "0") + (operatorMap[key] || " ");
          isResultState = false;
          updateDisplay();
          return;
        }
      }

      if (type === "num") {
        formulaStr += key;
      } else if (type === "op") {
        if (key === "equals") {
          evaluateExpression();
          return;
        }

        const operatorMap = {
          add: " + ",
          subtract: " - ",
          multiply: " × ",
          divide: " ÷ ",
          mod: " mod "
        };

        const trimmed = formulaStr.trim();
        const lastChar = trimmed.slice(-1);

        if (formulaStr === "" && key === "subtract") {
          formulaStr = "-";
        } else if (formulaStr !== "") {
          if (["+", "-", "×", "÷"].includes(lastChar)) {
            const match = formulaStr.match(/\s[+×÷-]\s$/);
            if (match) {
              formulaStr = formulaStr.slice(0, -3) + operatorMap[key];
            } else if (formulaStr.endsWith("-") && formulaStr.length === 1) {
              if (key !== "subtract") formulaStr = "";
            }
          } else {
            formulaStr += operatorMap[key] || "";
          }
        }
      } else if (type === "fn") {
        if (key === "PI") {
          formulaStr += "π";
        } else if (key === "E") {
          formulaStr += "e";
        } else if (key === "(") {
          formulaStr += "(";
        } else if (key === ")") {
          formulaStr += ")";
        } else if (key === "pow") {
          formulaStr += "^";
        } else if (key === "sq") {
          formulaStr += "²";
        } else if (key === "cube") {
          formulaStr += "³";
        } else if (key === "factorial") {
          formulaStr += "!";
        } else if (key === "recip") {
          formulaStr += "1÷(";
        } else if (key === "mod") {
          formulaStr += " mod ";
        } else if (["sin", "cos", "tan", "asin", "acos", "atan", "ln", "log", "sqrt", "cbrt"].includes(key)) {
          formulaStr += key + "(";
        } else if (key === "√") {
          formulaStr += "√(";
        } else if (key === "³√") {
          formulaStr += "³√(";
        }
      } else if (type === "action") {
        if (key === "clear") {
          formulaStr = "";
          if (resultDisplay) resultDisplay.innerText = "0";
          updateProgrammerConversions(null);
        } else if (key === "allclear") {
          formulaStr = "";
          lastResult = null;
          memoryValue = 0;
          updateMemoryUI();
          updateProgrammerConversions(null);
          if (resultDisplay) resultDisplay.innerText = "0";
          app.showToast("Cleared displays and memory", "info");
        } else if (key === "backspace") {
          if (formulaStr.endsWith(" + ") || formulaStr.endsWith(" - ") || formulaStr.endsWith(" × ") || formulaStr.endsWith(" ÷ ")) {
            formulaStr = formulaStr.slice(0, -3);
          } else if (formulaStr.endsWith(" mod ")) {
            formulaStr = formulaStr.slice(0, -5);
          } else if (formulaStr.endsWith("sin(") || formulaStr.endsWith("cos(") || formulaStr.endsWith("tan(") || formulaStr.endsWith("log(") || formulaStr.endsWith("cbrt(")) {
            formulaStr = formulaStr.slice(0, -4);
          } else if (formulaStr.endsWith("asin(") || formulaStr.endsWith("acos(") || formulaStr.endsWith("atan(") || formulaStr.endsWith("sqrt(")) {
            formulaStr = formulaStr.slice(0, -5);
          } else if (formulaStr.endsWith("ln(") || formulaStr.endsWith("³√(")) {
            formulaStr = formulaStr.slice(0, -3);
          } else if (formulaStr.endsWith("√(")) {
            formulaStr = formulaStr.slice(0, -2);
          } else {
            formulaStr = formulaStr.slice(0, -1);
          }
        } else if (key === "negate") {
          formulaStr = toggleNegate(formulaStr);
        }
      } else if (type === "mem") {
        const currentVal = parseFloat(resultDisplay ? resultDisplay.innerText : "0") || 0;

        if (key === "mc") {
          memoryValue = 0;
          app.showToast("Memory Cleared", "info");
        } else if (key === "mr") {
          if (isResultState) {
            formulaStr = formatCalcResult(memoryValue);
            isResultState = false;
          } else {
            formulaStr += formatCalcResult(memoryValue);
          }
          app.showToast(`Recalled: ${formatCalcResult(memoryValue)}`, "success");
        } else if (key === "mplus") {
          memoryValue += currentVal;
          app.showToast(`Added to Memory (Total: ${formatCalcResult(memoryValue)})`, "success");
        } else if (key === "mminus") {
          memoryValue -= currentVal;
          app.showToast(`Subtracted from Memory (Total: ${formatCalcResult(memoryValue)})`, "success");
        } else if (key === "ms") {
          memoryValue = currentVal;
          app.showToast(`Stored in Memory: ${formatCalcResult(memoryValue)}`, "success");
        }
        updateMemoryUI();
      }

      updateDisplay();
    };

    const evaluateExpression = () => {
      const trimmed = formulaStr.trim();
      if (!trimmed) return;

      try {
        const val = parseAndEvaluate(trimmed, isDegrees);
        lastResult = val;
        isResultState = true;

        const formatted = formatCalcResult(val);
        if (resultDisplay) {
          resultDisplay.innerText = formatted;
          resultDisplay.style.color = "var(--accent-cyan)";
        }

        updateProgrammerConversions(val);

        calcHistory.unshift({ formula: formulaStr, result: formatted });
        if (calcHistory.length > 20) calcHistory.pop();
        saveCalcHistory();
        renderHistory();

      } catch (err) {
        console.error(err);
        if (resultDisplay) {
          resultDisplay.innerText = err.message || "Error";
          resultDisplay.style.color = "var(--accent-rose)";
        }
        updateProgrammerConversions(null);
      }
    };

    const updateProgrammerConversions = (val) => {
      if (!baseConversionBar) return;

      if (typeof val === "number" && Number.isInteger(val) && val >= -2e15 && val <= 2e15) {
        baseConversionBar.style.display = "grid";
        let unsignedVal = val;
        if (val < 0) {
          unsignedVal = val >>> 0;
        }

        if (baseHex) baseHex.innerText = "0x" + unsignedVal.toString(16).toUpperCase();
        if (baseDec) baseDec.innerText = val.toString(10);
        if (baseOct) baseOct.innerText = "0o" + unsignedVal.toString(8);
        if (baseBin) {
          const binStr = unsignedVal.toString(2);
          if (binStr.length > 18) {
            baseBin.innerText = "..." + binStr.slice(-16);
            baseBin.title = "0b" + binStr;
          } else {
            baseBin.innerText = "0b" + binStr;
            baseBin.removeAttribute("title");
          }
        }
      } else {
        baseConversionBar.style.display = "none";
      }
    };

    const getNiceGridStep = (span) => {
      const rawStep = span / 5;
      const exponent = Math.floor(Math.log10(rawStep));
      const fraction = rawStep / Math.pow(10, exponent);
      let niceFraction;
      if (fraction < 1.5) niceFraction = 1;
      else if (fraction < 3) niceFraction = 2;
      else if (fraction < 7) niceFraction = 5;
      else niceFraction = 10;
      return niceFraction * Math.pow(10, exponent);
    };

    const drawGraph = () => {
      const canvas = container.querySelector("#calc-graph-canvas");
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const funcStr = container.querySelector("#calc-graph-func")?.value || "sin(x)";
      const xMinInput = parseFloat(container.querySelector("#calc-graph-xmin")?.value);
      const xMaxInput = parseFloat(container.querySelector("#calc-graph-xmax")?.value);

      const xMin = isNaN(xMinInput) ? -10 : xMinInput;
      const xMax = isNaN(xMaxInput) ? 10 : xMaxInput;

      if (xMin >= xMax) {
        app.showToast("Min X must be less than Max X", "error");
        return;
      }

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Grid Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      const xSpan = xMax - xMin;
      const gridStepX = getNiceGridStep(xSpan);

      const samples = 100;
      const yVals = [];
      for (let i = 0; i <= samples; i++) {
        const x = xMin + (xSpan * i) / samples;
        try {
          const y = parseAndEvaluate(x, false, { x: x });
          // Note: parseAndEvaluate takes the expression string, let's fix it
          const yVal = parseAndEvaluate(funcStr, false, { x: x });
          if (isFinite(yVal) && !isNaN(yVal)) {
            yVals.push(yVal);
          }
        } catch (e) { }
      }

      let yMin = -5;
      let yMax = 5;
      if (yVals.length > 0) {
        const minVal = Math.min(...yVals);
        const maxVal = Math.max(...yVals);
        const ySpanRaw = maxVal - minVal;
        if (ySpanRaw > 0.001) {
          yMin = minVal - ySpanRaw * 0.1;
          yMax = maxVal + ySpanRaw * 0.1;
        }
      }
      const ySpan = yMax - yMin;

      ctx.beginPath();
      const startXGrid = Math.floor(xMin / gridStepX) * gridStepX;
      for (let x = startXGrid; x <= xMax; x += gridStepX) {
        const cx = ((x - xMin) / xSpan) * width;
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, height);
      }
      const gridStepY = getNiceGridStep(ySpan);
      const startYGrid = Math.floor(yMin / gridStepY) * gridStepY;
      for (let y = startYGrid; y <= yMax; y += gridStepY) {
        const cy = height - ((y - yMin) / ySpan) * height;
        ctx.moveTo(0, cy);
        ctx.lineTo(width, cy);
      }
      ctx.stroke();

      // Axes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      if (xMin <= 0 && xMax >= 0) {
        const originX = (-xMin / xSpan) * width;
        ctx.moveTo(originX, 0);
        ctx.lineTo(originX, height);
      }
      if (yMin <= 0 && yMax >= 0) {
        const originY = height - (-yMin / ySpan) * height;
        ctx.moveTo(0, originY);
        ctx.lineTo(width, originY);
      }
      ctx.stroke();

      // Curve drawing
      ctx.strokeStyle = "#00f2fe";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "rgba(0, 242, 254, 0.4)";
      ctx.shadowBlur = 6;
      ctx.beginPath();

      let started = false;
      const curvePoints = 200;
      for (let i = 0; i <= curvePoints; i++) {
        const px = (i / curvePoints) * width;
        const x = xMin + (xSpan * i) / curvePoints;
        try {
          const y = parseAndEvaluate(funcStr, false, { x: x });
          if (isFinite(y) && !isNaN(y)) {
            const py = height - ((y - yMin) / ySpan) * height;
            if (py >= 0 && py <= height) {
              if (!started) {
                ctx.moveTo(px, py);
                started = true;
              } else {
                ctx.lineTo(px, py);
              }
            } else {
              started = false;
            }
          } else {
            started = false;
          }
        } catch (e) {
          started = false;
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const initCalculatorListeners = () => {
      container.querySelectorAll(".num-key").forEach(btn => {
        btn.addEventListener("click", () => {
          handleCalcInput("num", btn.getAttribute("data-val"));
        });
      });

      container.querySelectorAll(".op-key").forEach(btn => {
        btn.addEventListener("click", () => {
          handleCalcInput("op", btn.getAttribute("data-op"));
        });
      });

      container.querySelectorAll(".fn-key").forEach(btn => {
        btn.addEventListener("click", () => {
          const op = btn.getAttribute("data-op");
          const val = btn.getAttribute("data-val");
          handleCalcInput("fn", op || val);
        });
      });

      container.querySelectorAll(".action-key").forEach(btn => {
        btn.addEventListener("click", () => {
          handleCalcInput("action", btn.getAttribute("data-op"));
        });
      });

      container.querySelectorAll(".mem-key").forEach(btn => {
        btn.addEventListener("click", () => {
          handleCalcInput("mem", btn.getAttribute("data-op"));
        });
      });

      const scientificToggle = container.querySelector("#calc-scientific-toggle");
      const scientificPad = container.querySelector("#calc-scientific-pad");
      const updateScientificPadVisibility = () => {
        if (scientificPad && scientificToggle) {
          scientificPad.style.display = scientificToggle.checked ? "grid" : "none";
        }
      };
      if (scientificToggle) {
        scientificToggle.addEventListener("change", updateScientificPadVisibility);
        updateScientificPadVisibility();
      }

      if (angleBadge) {
        angleBadge.addEventListener("click", () => {
          isDegrees = !isDegrees;
          angleBadge.innerText = isDegrees ? "DEG" : "RAD";
          angleBadge.title = isDegrees ? "Angular mode: Degrees. Click to toggle" : "Angular mode: Radians. Click to toggle";
          app.showToast(`Switched angle mode to ${isDegrees ? "Degrees" : "Radians"}`, "info");
        });
      }

      const tabHistory = container.querySelector("#calc-tab-history");
      const tabConstants = container.querySelector("#calc-tab-constants");
      const tabGrapher = container.querySelector("#calc-tab-grapher");
      const secHistory = container.querySelector("#calc-sec-history");
      const secConstants = container.querySelector("#calc-sec-constants");
      const secGrapher = container.querySelector("#calc-sec-grapher");

      if (tabHistory && tabConstants && tabGrapher && secHistory && secConstants && secGrapher) {
        tabHistory.addEventListener("click", () => {
          tabHistory.classList.add("active");
          tabConstants.classList.remove("active");
          tabGrapher.classList.remove("active");
          secHistory.style.display = "flex";
          secConstants.style.display = "none";
          secGrapher.style.display = "none";
        });

        tabConstants.addEventListener("click", () => {
          tabConstants.classList.add("active");
          tabHistory.classList.remove("active");
          tabGrapher.classList.remove("active");
          secConstants.style.display = "flex";
          secHistory.style.display = "none";
          secGrapher.style.display = "none";
        });

        tabGrapher.addEventListener("click", () => {
          tabGrapher.classList.add("active");
          tabHistory.classList.remove("active");
          tabConstants.classList.remove("active");
          secGrapher.style.display = "flex";
          secHistory.style.display = "none";
          secConstants.style.display = "none";
          drawGraph();
        });
      }

      // Grapher Controls
      container.querySelector("#calc-graph-draw-btn")?.addEventListener("click", drawGraph);

      // Live graphing updates on inputs
      const graphInputs = ["calc-graph-func", "calc-graph-xmin", "calc-graph-xmax"];
      graphInputs.forEach(id => {
        container.querySelector("#" + id)?.addEventListener("change", drawGraph);
        container.querySelector("#" + id)?.addEventListener("input", drawGraph);
      });

      container.querySelector("#calc-clear-history-btn")?.addEventListener("click", () => {
        calcHistory = [];
        saveCalcHistory();
        renderHistory();
        app.showToast("Cleared calculation history", "info");
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

      // Quick Guide "Try Example" — loads and evaluates a sample scientific expression
      container.querySelector("#calc-guide-load-sample")?.addEventListener("click", () => {
        if (activeExampleIndex === 0) {
          isDegrees = true;
          if (angleBadge) angleBadge.innerText = "DEG";
          formulaStr = "sin(30) + cos(60)";
          isResultState = false;
          updateDisplay();
          evaluateExpression();
          app.showToast("Loaded: sin(30) + cos(60) → press =", "info");
        } else {
          formulaStr = "2^3 + 5*2 - 4";
          isResultState = false;
          updateDisplay();
          evaluateExpression();
          app.showToast("Loaded: 2^3 + 5*2 - 4 → press =", "info");
        }
      });
    };

    // Keyboard shortcut listener
    const onKeyDown = (e) => {
      if (app.activeTool !== "calculator") return;
      const activeTag = document.activeElement.tagName.toLowerCase();
      if (activeTag === "textarea" || activeTag === "input") return;

      const key = e.key;
      if (["/", "*", "+", "-", "%", "^", "Enter", "Backspace", "Escape"].includes(key)) {
        e.preventDefault();
      }

      if (key >= "0" && key <= "9") {
        handleCalcInput("num", key);
      } else if (key === ".") {
        handleCalcInput("num", ".");
      } else if (key === "+") {
        handleCalcInput("op", "add");
      } else if (key === "-") {
        handleCalcInput("op", "subtract");
      } else if (key === "*") {
        handleCalcInput("op", "multiply");
      } else if (key === "/") {
        handleCalcInput("op", "divide");
      } else if (key === "%") {
        handleCalcInput("op", "mod");
      } else if (key === "^") {
        handleCalcInput("fn", "pow");
      } else if (key === "(") {
        handleCalcInput("fn", "(");
      } else if (key === ")") {
        handleCalcInput("fn", ")");
      } else if (key === "Enter" || key === "=") {
        handleCalcInput("op", "equals");
      } else if (key === "Backspace") {
        handleCalcInput("action", "backspace");
      } else if (key === "Escape") {
        handleCalcInput("action", "clear");
      } else if (key.toLowerCase() === "p") {
        handleCalcInput("fn", "PI");
      } else if (key.toLowerCase() === "e") {
        handleCalcInput("fn", "E");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    // Store references or unbind listeners if needed when re-navigating
    // For keydown, we keep it but it checks activeTool.

    const initCalculator = () => {
      loadCalcHistory();
      renderHistory();
      renderConstants();
      updateMemoryUI();
      updateDisplay();
      drawGraph();

      if (resultDisplay && (resultDisplay.innerText === "" || resultDisplay.innerText === "Error")) {
        resultDisplay.innerText = "0";
        resultDisplay.style.color = "var(--accent-cyan)";
      }
    };

    initCalculatorListeners();
    initCalculator();
  }
};
