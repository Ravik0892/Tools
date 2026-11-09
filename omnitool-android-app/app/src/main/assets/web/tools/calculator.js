import { escapeHtml } from './utils.js';

let formulaStr = "";
let lastResult = null;
let memoryValue = 0;
let isDegrees = true;
let isResultState = false;
let calcHistory = [];
let app = null;
let onKeyDownRef = null;
let resizeObserverRef = null;

// Comprehensive Universal Scientific Physical Constants
const scientificConstants = [
  { name: "Speed of Light (c)", symbol: "c", val: "299792458", unit: "m/s", desc: "Exact speed of light in vacuum" },
  { name: "Planck Constant (h)", symbol: "h", val: "6.62607015e-34", unit: "J·s", desc: "Fundamental quantum of electromagnetic action" },
  { name: "Reduced Planck (ℏ)", symbol: "ℏ", val: "1.054571817e-34", unit: "J·s", desc: "Dirac constant (h / 2π) in quantum mechanics" },
  { name: "Gravitational Constant (G)", symbol: "G", val: "6.6743e-11", unit: "m³/kg/s²", desc: "Newtonian universal gravitation constant" },
  { name: "Standard Gravity (g)", symbol: "g", val: "9.80665", unit: "m/s²", desc: "Standard gravitational acceleration on Earth" },
  { name: "Boltzmann Constant (kB)", symbol: "kB", val: "1.380649e-23", unit: "J/K", desc: "Statistical temperature-to-energy conversion" },
  { name: "Avogadro Constant (NA)", symbol: "NA", val: "6.02214076e23", unit: "mol⁻¹", desc: "Number of constituents per mole of substance" },
  { name: "Elementary Charge (e)", symbol: "e", val: "1.602176634e-19", unit: "C", desc: "Electric charge of a single proton" },
  { name: "Vacuum Permittivity (ε0)", symbol: "ε0", val: "8.8541878128e-12", unit: "F/m", desc: "Absolute electric permittivity of free space" },
  { name: "Vacuum Permeability (μ0)", symbol: "μ0", val: "1.25663706212e-6", unit: "N/A²", desc: "Magnetic permeability constant of vacuum" },
  { name: "Electron Mass (me)", symbol: "me", val: "9.1093837015e-31", unit: "kg", desc: "Rest mass of a standard electron" },
  { name: "Proton Mass (mp)", symbol: "mp", val: "1.67262192369e-27", unit: "kg", desc: "Rest mass of a standard proton" },
  { name: "Neutron Mass (mn)", symbol: "mn", val: "1.67492749804e-27", unit: "kg", desc: "Rest mass of an isolated neutron" },
  { name: "Gas Constant (R)", symbol: "R", val: "8.314462618", unit: "J/(mol·K)", desc: "Molar gas constant in ideal gas thermodynamics" },
  { name: "Faraday Constant (F)", symbol: "F", val: "96485.33212", unit: "C/mol", desc: "Total electric charge per mole of electrons" },
  { name: "Stefan-Boltzmann (σ)", symbol: "σ", val: "5.670374419e-8", unit: "W/(m²·K⁴)", desc: "Total radiation constant of a black body" },
  { name: "Rydberg Constant (R∞)", symbol: "R∞", val: "10973731.568160", unit: "m⁻¹", desc: "Limiting atomic spectroscopy transition wavenumber" }
];

export default {
  id: "calculator",
  name: "Scientific Calculator",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Left Panel: Math Engine & Inputs -->
        <div class="tool-panel" style="gap: 12px; background: var(--bg-card); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);">
          <div class="panel-header" style="flex-direction: column; align-items: flex-start; gap: 12px; width: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <h3 style="color: var(--accent-cyan); display: flex; align-items: center; gap: 8px; margin: 0;">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; stroke: var(--accent-cyan); fill: none; stroke-width: 2;"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="16" y1="14" x2="16" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="16" y1="18" x2="16" y2="18.01"></line><line x1="12" y1="18" x2="12" y2="18.01"></line><line x1="8" y1="18" x2="8" y2="18.01"></line></svg>
                Math Engine &amp; Inputs
              </h3>
              <div style="display: flex; gap: 6px; align-items: center;">
                <span id="calc-memory-badge" class="theme-badge" style="font-size: 10px; display: none; color: var(--accent-purple); background-color: rgba(157, 78, 221, 0.15);" title="Memory Stored">M</span>
                <span id="calc-angle-mode-badge" class="theme-badge" style="font-size: 10px; cursor: pointer; user-select: none;" title="Click to Toggle DEG/RAD">DEG</span>
              </div>
            </div>

            <!-- Segmented Input Mode Tabs -->
            <div class="keyboard-tabs" style="display: flex; gap: 6px; width: 100%; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
              <button class="tool-btn secondary active keyboard-tab" id="calc-in-tab-pad" style="flex: 1; font-size: 11px; padding: 7px 10px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><circle cx="8" cy="14" r="1"/><circle cx="12" cy="14" r="1"/><circle cx="16" cy="14" r="1"/><circle cx="8" cy="18" r="1"/><circle cx="12" cy="18" r="1"/><circle cx="16" cy="18" r="1"/></svg>
                Keypad &amp; Formula
              </button>
              <button class="tool-btn secondary keyboard-tab" id="calc-in-tab-constants" style="flex: 1; font-size: 11px; padding: 7px 10px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                Constants Palette
              </button>
              <button class="tool-btn secondary keyboard-tab" id="calc-in-tab-grapher" style="flex: 1; font-size: 11px; padding: 7px 10px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                2D Plotter Controls
              </button>
            </div>
          </div>

          <!-- Active Expression Bar (Always visible on left panel) -->
          <div style="display: flex; flex-direction: column; gap: 6px; margin-bottom: 2px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label for="calc-formula-input" style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Active Expression / Formula</label>
              <span style="font-size: 10px; color: var(--text-muted);">Keyboard &amp; Numpad Supported</span>
            </div>
            <div style="display: flex; gap: 6px; align-items: center;">
              <input type="text" id="calc-formula-input" class="form-input" placeholder="Type formula or click buttons below..." aria-label="Active mathematical expression" style="flex: 1; font-family: var(--font-mono); font-size: 14px; font-weight: 600; padding: 10px 12px; letter-spacing: 0.5px; background: var(--bg-input);">
              <button class="tool-btn secondary" id="calc-input-backspace" title="Backspace (⌫)" aria-label="Backspace" style="padding: 10px 12px; font-size: 12px;">⌫</button>
              <button class="tool-btn secondary" id="calc-input-clear" title="Clear Expression (C)" aria-label="Clear expression" style="padding: 10px 12px; font-size: 12px; color: var(--accent-rose);">C</button>
            </div>
          </div>

          <!-- Section 1: Keypad & Scientific Pad -->
          <div id="calc-in-sec-pad" style="display: flex; flex-direction: column; gap: 8px;">
            <!-- Memory Keys Row -->
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;">
              <button class="calc-btn mem-key" data-op="mc" title="Memory Clear" aria-label="Memory Clear">MC</button>
              <button class="calc-btn mem-key" data-op="mr" title="Memory Recall" aria-label="Memory Recall">MR</button>
              <button class="calc-btn mem-key" data-op="mplus" title="Memory Add (M+)" aria-label="Memory Add">M+</button>
              <button class="calc-btn mem-key" data-op="mminus" title="Memory Subtract (M-)" aria-label="Memory Subtract">M-</button>
              <button class="calc-btn mem-key" data-op="ms" title="Memory Store" aria-label="Memory Store">MS</button>
            </div>

            <!-- Scientific / Standard Toggle row -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 6px; margin-bottom: 2px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.5px;">SCIENTIFIC FUNCTIONS (5×5 MATRIX)</span>
              <label class="checkbox-label" style="font-size: 11px; color: var(--text-muted); margin: 0; cursor: pointer;">
                <input type="checkbox" id="calc-scientific-toggle" checked style="width: 14px; height: 14px; cursor: pointer; accent-color: var(--accent-cyan);"> Expand Pad
              </label>
            </div>

            <!-- Scientific Keypad Grid: Balanced 5x5 Matrix -->
            <div id="calc-scientific-pad" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; transition: all var(--transition-normal);">
              <button class="calc-btn fn-key" data-op="sin" aria-label="Sine">sin</button>
              <button class="calc-btn fn-key" data-op="cos" aria-label="Cosine">cos</button>
              <button class="calc-btn fn-key" data-op="tan" aria-label="Tangent">tan</button>
              <button class="calc-btn fn-key" data-op="asin" aria-label="Arcsine">asin</button>
              <button class="calc-btn fn-key" data-op="acos" aria-label="Arccosine">acos</button>

              <button class="calc-btn fn-key" data-op="atan" aria-label="Arctangent">atan</button>
              <button class="calc-btn fn-key" data-op="sinh" aria-label="Hyperbolic Sine">sinh</button>
              <button class="calc-btn fn-key" data-op="cosh" aria-label="Hyperbolic Cosine">cosh</button>
              <button class="calc-btn fn-key" data-op="tanh" aria-label="Hyperbolic Tangent">tanh</button>
              <button class="calc-btn fn-key" data-op="ln" aria-label="Natural Logarithm">ln</button>

              <button class="calc-btn fn-key" data-op="log" aria-label="Common Logarithm (base 10)">log</button>
              <button class="calc-btn fn-key" data-op="pow" title="Power (x^y)" aria-label="Power x raised to y">x<sup>y</sup></button>
              <button class="calc-btn fn-key" data-op="sq" title="Square (x²)" aria-label="Square">x²</button>
              <button class="calc-btn fn-key" data-op="cube" title="Cube (x³)" aria-label="Cube">x³</button>
              <button class="calc-btn fn-key" data-op="sqrt" title="Square Root (√)" aria-label="Square Root">√</button>

              <button class="calc-btn fn-key" data-op="cbrt" title="Cube Root (³√)" aria-label="Cube Root">³√</button>
              <button class="calc-btn fn-key" data-op="abs" title="Absolute Value (|x|)" aria-label="Absolute Value">|x|</button>
              <button class="calc-btn fn-key" data-op="exp" title="Exponential (e^x)" aria-label="Exponential e to the x">e<sup>x</sup></button>
              <button class="calc-btn fn-key" data-op="factorial" title="Factorial (n!)" aria-label="Factorial">n!</button>
              <button class="calc-btn fn-key" data-op="recip" title="Reciprocal (1/x)" aria-label="Reciprocal">1/x</button>

              <button class="calc-btn fn-key" data-val="PI" title="Pi (π)" aria-label="Pi Constant">π</button>
              <button class="calc-btn fn-key" data-val="E" title="Euler's Constant (e)" aria-label="Euler Constant">e</button>
              <button class="calc-btn fn-key" data-val="(" aria-label="Open Parenthesis">(</button>
              <button class="calc-btn fn-key" data-val=")" aria-label="Close Parenthesis">)</button>
              <button class="calc-btn fn-key" data-op="mod" title="Modulo (remainder)" aria-label="Modulo">mod</button>
            </div>

            <!-- Standard Numeric Keypad Grid: 4x4 Grid -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 4px;">
              <button class="calc-btn action-key" data-op="clear" aria-label="Clear" style="color: var(--accent-rose);">C</button>
              <button class="calc-btn action-key" data-op="allclear" aria-label="All Clear" style="color: var(--accent-rose);">AC</button>
              <button class="calc-btn action-key" data-op="backspace" aria-label="Backspace">⌫</button>
              <button class="calc-btn op-key" data-op="divide" aria-label="Divide">÷</button>

              <button class="calc-btn num-key" data-val="7">7</button>
              <button class="calc-btn num-key" data-val="8">8</button>
              <button class="calc-btn num-key" data-val="9">9</button>
              <button class="calc-btn op-key" data-op="multiply" aria-label="Multiply">×</button>

              <button class="calc-btn num-key" data-val="4">4</button>
              <button class="calc-btn num-key" data-val="5">5</button>
              <button class="calc-btn num-key" data-val="6">6</button>
              <button class="calc-btn op-key" data-op="subtract" aria-label="Subtract">-</button>

              <button class="calc-btn num-key" data-val="1">1</button>
              <button class="calc-btn num-key" data-val="2">2</button>
              <button class="calc-btn num-key" data-val="3">3</button>
              <button class="calc-btn op-key" data-op="add" aria-label="Add">+</button>

              <button class="calc-btn action-key" data-op="negate" title="Toggle Positive / Negative" aria-label="Toggle Sign">+/-</button>
              <button class="calc-btn num-key" data-val="0">0</button>
              <button class="calc-btn num-key" data-val=".">.</button>
              <button class="calc-btn op-key equal-key" data-op="equals" aria-label="Equals" style="background: linear-gradient(135deg, var(--accent-cyan), var(--accent-purple)); color: var(--text-inverse); font-weight: 800;">=</button>
            </div>
          </div>

          <!-- Section 2: Constants Palette (Inputs on Left Panel) -->
          <div id="calc-in-sec-constants" style="display: none; flex-direction: column; gap: 10px; flex: 1;">
            <div style="display: flex; gap: 8px; align-items: center;">
              <input type="text" id="calc-constants-search" class="form-input" placeholder="Search physical constants (e.g. speed of light, planck, gravity)..." style="font-size: 12px; padding: 8px 12px; flex: 1;">
            </div>
            <div id="calc-constants-grid" style="display: flex; flex-direction: column; gap: 8px; overflow-y: auto; max-height: 480px; padding-right: 4px;">
              <!-- Injected via JavaScript -->
            </div>
          </div>

          <!-- Section 3: 2D Plotter Controls (Inputs on Left Panel) -->
          <div id="calc-in-sec-grapher" style="display: none; flex-direction: column; gap: 12px; flex: 1;">
            <div class="form-group" style="margin-bottom: 2px;">
              <label for="calc-graph-func" style="font-size: 12px; font-weight: 700; color: var(--text-main);">Function f(x) =</label>
              <input type="text" id="calc-graph-func" class="form-input" value="sin(x)" style="font-family: var(--font-mono); font-size: 14px; margin-top: 4px;" placeholder="e.g. sin(x) * cos(x) or x^2 - 4 or |x| - 2">
            </div>

            <div>
              <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Quick Mathematical Presets</label>
              <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-top: 6px;">
                <button class="gs-preset-btn calc-graph-preset-btn" data-fn="sin(x)" style="padding: 4px 8px; font-size: 11px;">sin(x)</button>
                <button class="gs-preset-btn calc-graph-preset-btn" data-fn="cos(x)" style="padding: 4px 8px; font-size: 11px;">cos(x)</button>
                <button class="gs-preset-btn calc-graph-preset-btn" data-fn="tan(x)" style="padding: 4px 8px; font-size: 11px;">tan(x)</button>
                <button class="gs-preset-btn calc-graph-preset-btn" data-fn="x^2 - 4" style="padding: 4px 8px; font-size: 11px;">x² - 4</button>
                <button class="gs-preset-btn calc-graph-preset-btn" data-fn="x^3 - 3*x" style="padding: 4px 8px; font-size: 11px;">x³ - 3x</button>
                <button class="gs-preset-btn calc-graph-preset-btn" data-fn="1 / (x^2 + 1)" style="padding: 4px 8px; font-size: 11px;">1/(x²+1)</button>
                <button class="gs-preset-btn calc-graph-preset-btn" data-fn="sin(x) * cos(x)" style="padding: 4px 8px; font-size: 11px;">sin·cos</button>
                <button class="gs-preset-btn calc-graph-preset-btn" data-fn="abs(x) - 2" style="padding: 4px 8px; font-size: 11px;">|x| - 2</button>
              </div>
            </div>

            <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 8px;">
              <div class="form-group" style="margin: 0;">
                <label for="calc-graph-xmin" style="font-size: 11px; font-weight: 700; color: var(--text-muted);">Min X</label>
                <input type="number" id="calc-graph-xmin" class="form-input" value="-10" style="padding: 8px; font-size: 12px; font-family: var(--font-mono);">
              </div>
              <div class="form-group" style="margin: 0;">
                <label for="calc-graph-xmax" style="font-size: 11px; font-weight: 700; color: var(--text-muted);">Max X</label>
                <input type="number" id="calc-graph-xmax" class="form-input" value="10" style="padding: 8px; font-size: 12px; font-family: var(--font-mono);">
              </div>
            </div>

            <button class="tool-btn primary" id="calc-graph-draw-btn" style="padding: 10px; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Plot &amp; Update Graph Canvas
            </button>
          </div>
        </div>

        <!-- Right Panel: Visual Preview & Outputs -->
        <div class="tool-panel" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; gap: 12px;">
          <div class="panel-header" style="flex-direction: column; align-items: flex-start; gap: 12px; width: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <h3 style="margin: 0; display: flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; stroke: var(--accent-cyan); fill: none; stroke-width: 2;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                Calculation &amp; Visual Output
              </h3>
              <div class="panel-actions" style="display: flex; gap: 6px; align-items: center;">
                <button class="tool-btn secondary" id="calc-preview-fullscreen-btn" title="Toggle Fullscreen Output Mode" aria-label="Toggle Fullscreen" style="padding: 4px 8px; font-size: 11px;">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                </button>
              </div>
            </div>

            <!-- Segmented Output Tabs -->
            <div class="keyboard-tabs" style="display: flex; gap: 6px; width: 100%; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
              <button class="tool-btn secondary active keyboard-tab" id="calc-out-tab-monitor" style="flex: 1; font-size: 11px; padding: 7px 10px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                Result Monitor
              </button>
              <button class="tool-btn secondary keyboard-tab" id="calc-out-tab-graph" style="flex: 1; font-size: 11px; padding: 7px 10px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                2D Graph Canvas
              </button>
              <button class="tool-btn secondary keyboard-tab" id="calc-out-tab-history" style="flex: 1; font-size: 11px; padding: 7px 10px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                History Log (<span id="calc-history-count">0</span>)
              </button>
            </div>
          </div>

          <!-- Output View 1: Result Monitor -->
          <div id="calc-out-sec-monitor" style="display: flex; flex-direction: column; gap: 12px; flex: 1;">
            <!-- High-End Digital Screen Display -->
            <div class="calc-screen-display">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">EVALUATION MONITOR</span>
                <span id="calc-monitor-status" style="font-size: 10px; font-weight: 600; color: var(--accent-emerald);">● Ready</span>
              </div>
              <div id="calc-formula-display" class="calc-formula-display-text"></div>
              <div id="calc-result-display" class="calc-result-display-text">0</div>

              <!-- Screen Actions Toolbar -->
              <div style="display: flex; gap: 6px; justify-content: flex-end; margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.06);">
                <button class="tool-btn secondary" id="calc-copy-result-btn" style="padding: 4px 10px; font-size: 11px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Copy Result
                </button>
                <button class="tool-btn secondary" id="calc-reuse-result-btn" style="padding: 4px 10px; font-size: 11px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 4px;"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                  Reuse in Formula
                </button>
                <button class="tool-btn secondary" id="calc-clear-screen-btn" style="padding: 4px 10px; font-size: 11px; color: var(--accent-rose);">
                  Clear
                </button>
              </div>
            </div>

            <!-- Programmer Radix Conversions Bar -->
            <div id="calc-base-conversion-bar" style="display: none; flex-direction: column; gap: 6px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">RADIX / BASE CONVERSIONS (CLICK TO COPY FULL VALUE)</span>
              <div class="calc-radix-grid">
                <div class="calc-radix-box" data-base="hex" title="Click to copy HEX">
                  <span class="calc-radix-label">HEXADECIMAL</span>
                  <span id="calc-base-hex" class="calc-radix-val" style="color: var(--accent-cyan);">0x0</span>
                </div>
                <div class="calc-radix-box" data-base="dec" title="Click to copy DEC">
                  <span class="calc-radix-label">DECIMAL</span>
                  <span id="calc-base-dec" class="calc-radix-val" style="color: var(--accent-purple);">0</span>
                </div>
                <div class="calc-radix-box" data-base="oct" title="Click to copy OCT">
                  <span class="calc-radix-label">OCTAL</span>
                  <span id="calc-base-oct" class="calc-radix-val" style="color: var(--accent-orange);">0o0</span>
                </div>
                <div class="calc-radix-box" data-base="bin" title="Click to copy BIN">
                  <span class="calc-radix-label">BINARY</span>
                  <span id="calc-base-bin" class="calc-radix-val" style="color: var(--accent-emerald);">0b0</span>
                </div>
              </div>
            </div>

            <!-- Number Properties Card -->
            <div id="calc-analytics-card" style="display: flex; flex-direction: column; gap: 6px; background: rgba(0,0,0,0.15); border: 1px solid var(--border-color); border-radius: 12px; padding: 12px 14px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">NUMBER PROPERTIES &amp; SPECS</span>
              <div style="grid-template-columns: repeat(3, 1fr); display: grid; gap: 8px; margin-top: 4px;">
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <span style="font-size: 10px; color: var(--text-muted);">Classification</span>
                  <span id="calc-prop-type" style="font-size: 12px; font-weight: 700; color: var(--text-main);">Zero (Integer)</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <span style="font-size: 10px; color: var(--text-muted);">Scientific Notation</span>
                  <span id="calc-prop-sci" style="font-family: var(--font-mono); font-size: 11px; font-weight: 600; color: var(--accent-cyan);">0e+0</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <span style="font-size: 10px; color: var(--text-muted);">Angle Convention</span>
                  <span id="calc-prop-angle" style="font-size: 12px; font-weight: 700; color: var(--accent-purple);">Degrees (DEG)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Output View 2: 2D Graph Canvas -->
          <div id="calc-out-sec-graph" style="display: none; flex-direction: column; gap: 8px; flex: 1;">
            <div class="calc-graph-viewport">
              <!-- Graph Top Toolbar -->
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: rgba(0,0,0,0.4); border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 11px; flex-wrap: wrap; gap: 6px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 700;" id="calc-graph-title-label">f(x) = sin(x)</span>
                  <span id="calc-graph-hover-coords" style="font-family: var(--font-mono); font-size: 10px; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">Hover graph to inspect</span>
                </div>
                <div style="display: flex; gap: 4px; align-items: center;">
                  <button class="tool-btn secondary" id="calc-graph-zoom-in" style="padding: 3px 8px; font-size: 11px;" title="Zoom In">+</button>
                  <button class="tool-btn secondary" id="calc-graph-zoom-out" style="padding: 3px 8px; font-size: 11px;" title="Zoom Out">-</button>
                  <button class="tool-btn secondary" id="calc-graph-reset-range" style="padding: 3px 8px; font-size: 11px;" title="Reset X Range [-10, 10]">Reset Range</button>
                  <button class="tool-btn secondary" id="calc-graph-export-png" style="padding: 3px 8px; font-size: 11px;" title="Export High-Res PNG">PNG</button>
                </div>
              </div>
              <!-- Graph Canvas Area -->
              <div id="calc-graph-container" style="flex: 1; position: relative; width: 100%; min-height: 320px; display: flex;">
                <canvas id="calc-graph-canvas" style="width: 100%; height: 100%; display: block; cursor: crosshair;"></canvas>
              </div>
            </div>
          </div>

          <!-- Output View 3: Calculation History Log -->
          <div id="calc-out-sec-history" style="display: none; flex-direction: column; gap: 10px; flex: 1; overflow: hidden;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 4px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Recent Calculation Archive</span>
              <button class="tool-btn secondary" id="calc-clear-history-btn" style="padding: 4px 8px; font-size: 10px; color: var(--accent-rose);">Clear All</button>
            </div>
            <div id="calc-history-list" style="display: flex; flex-direction: column; gap: 6px; overflow-y: auto; flex: 1; padding-right: 4px; min-height: 200px;">
              <!-- Injected via JavaScript -->
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide &amp; Instructions</span>
            </div>
            <button class="tool-btn secondary" id="calc-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Arithmetic &amp; Scientific Calculations</strong>: Type formulas using the Left expression bar, numpad, or keyboard (e.g. <code>sin(30) + cos(60)</code> then press <code>=</code>). Trailing open parentheses and pipe absolute values <code>|x|</code> auto-balance automatically.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Constants Palette</strong>: Switch to <strong>Constants Palette</strong> on the Left to insert 17 universal physical constants (Speed of Light, Planck, Gravitation, etc.) directly into your expression with smart multiplication injection.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>2D Function Plotter &amp; Fullscreen</strong>: Select <strong>2D Plotter Controls</strong> on the Left to plot mathematical functions f(x). Hover over the interactive canvas to track the glowing reticle crosshair, and toggle <strong>Fullscreen Mode</strong> for an expanded graphing studio.</div>
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

    // Element references
    const formulaInput = container.querySelector("#calc-formula-input");
    const formulaDisplay = container.querySelector("#calc-formula-display");
    const resultDisplay = container.querySelector("#calc-result-display");
    const monitorStatus = container.querySelector("#calc-monitor-status");
    const memoryBadge = container.querySelector("#calc-memory-badge");
    const angleBadge = container.querySelector("#calc-angle-mode-badge");

    const baseConversionBar = container.querySelector("#calc-base-conversion-bar");
    const baseHex = container.querySelector("#calc-base-hex");
    const baseDec = container.querySelector("#calc-base-dec");
    const baseOct = container.querySelector("#calc-base-oct");
    const baseBin = container.querySelector("#calc-base-bin");

    const propType = container.querySelector("#calc-prop-type");
    const propSci = container.querySelector("#calc-prop-sci");
    const propAngle = container.querySelector("#calc-prop-angle");

    const historyCount = container.querySelector("#calc-history-count");

    // Left Input Mode Tabs & Sections
    const inTabPad = container.querySelector("#calc-in-tab-pad");
    const inTabConstants = container.querySelector("#calc-in-tab-constants");
    const inTabGrapher = container.querySelector("#calc-in-tab-grapher");

    const inSecPad = container.querySelector("#calc-in-sec-pad");
    const inSecConstants = container.querySelector("#calc-in-sec-constants");
    const inSecGrapher = container.querySelector("#calc-in-sec-grapher");

    // Right Output Tabs & Sections
    const outTabMonitor = container.querySelector("#calc-out-tab-monitor");
    const outTabGraph = container.querySelector("#calc-out-tab-graph");
    const outTabHistory = container.querySelector("#calc-out-tab-history");

    const outSecMonitor = container.querySelector("#calc-out-sec-monitor");
    const outSecGraph = container.querySelector("#calc-out-sec-graph");
    const outSecHistory = container.querySelector("#calc-out-sec-history");

    const rightPanel = container.querySelectorAll(".tool-panel")[1];
    const fullscreenBtn = container.querySelector("#calc-preview-fullscreen-btn");

    // Grapher Active Coordinate State for Interactive Hover Crosshair
    let graphState = {
      xMin: -10,
      xMax: 10,
      yMin: -5,
      yMax: 5,
      ySpan: 10,
      width: 480,
      height: 320,
      funcStr: "sin(x)"
    };
    let hoverCrosshair = null;

    const loadCalcHistory = () => {
      const saved = localStorage.getItem("omnitool_calc_history");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          calcHistory = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          calcHistory = [];
        }
      } else {
        calcHistory = [];
      }
      if (historyCount) historyCount.innerText = calcHistory.length;
    };

    const saveCalcHistory = () => {
      localStorage.setItem("omnitool_calc_history", JSON.stringify(calcHistory));
      if (historyCount) historyCount.innerText = calcHistory.length;
    };

    const updateMemoryUI = () => {
      if (memoryBadge) {
        memoryBadge.style.display = memoryValue !== 0 ? "inline-block" : "none";
      }
    };

    const updateResultFontSize = (text) => {
      if (!resultDisplay) return;
      const len = (text || "").length;
      if (len > 24) {
        resultDisplay.style.fontSize = "18px";
      } else if (len > 18) {
        resultDisplay.style.fontSize = "22px";
      } else if (len > 13) {
        resultDisplay.style.fontSize = "28px";
      } else {
        resultDisplay.style.fontSize = "36px";
      }
    };

    const renderHistory = () => {
      const listEl = container.querySelector("#calc-history-list");
      if (!listEl) return;
      if (historyCount) historyCount.innerText = calcHistory.length;

      if (calcHistory.length === 0) {
        listEl.innerHTML = `<span style="font-size: 12px; color: var(--text-muted); text-align: center; margin-top: 40px; font-style: italic;">No calculations performed yet</span>`;
        return;
      }

      listEl.innerHTML = "";
      calcHistory.forEach((item) => {
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

        card.querySelectorAll(".hist-action-btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const act = btn.getAttribute("data-action");
            const val = btn.getAttribute("data-val");
            if (act === "load-formula") {
              formulaStr = val;
              isResultState = false;
              updateDisplay();
              updateLivePreview();
              app.showToast("Loaded formula to input expression", "info");
            } else if (act === "load-result") {
              if (isResultState) {
                formulaStr = val;
                isResultState = false;
              } else {
                const trimmed = formulaStr.trim();
                const needsMul = trimmed && /[\d\)\wπe]$/.test(trimmed);
                formulaStr += (needsMul ? " × " : "") + val;
              }
              updateDisplay();
              updateLivePreview();
              app.showToast("Inserted result into expression", "info");
            } else if (act === "copy") {
              app.copyText(val);
            }
          });
        });
        listEl.appendChild(card);
      });
    };

    const renderConstants = (filterText = "") => {
      const gridEl = container.querySelector("#calc-constants-grid");
      if (!gridEl) return;

      const query = filterText.trim().toLowerCase();
      const filtered = query
        ? scientificConstants.filter((c) => c.name.toLowerCase().includes(query) || c.desc.toLowerCase().includes(query) || c.symbol.toLowerCase().includes(query))
        : scientificConstants;

      gridEl.innerHTML = "";
      if (filtered.length === 0) {
        gridEl.innerHTML = `<span style="font-size: 12px; color: var(--text-muted); text-align: center; margin-top: 30px; font-style: italic;">No constants matched "${escapeHtml(query)}"</span>`;
        return;
      }

      filtered.forEach((c) => {
        const card = document.createElement("div");
        card.className = "calc-constant-card";
        card.innerHTML = `
          <div class="calc-constant-header">
            <span class="calc-constant-name">${escapeHtml(c.name)} <span style="color: var(--accent-purple); font-family: var(--font-mono); font-size: 11px;">[${escapeHtml(c.symbol)}]</span></span>
            <span class="calc-constant-val">${escapeHtml(c.val)} <span style="font-size: 10px; color: var(--text-muted);">${escapeHtml(c.unit)}</span></span>
          </div>
          <div class="calc-constant-desc">${escapeHtml(c.desc)}</div>
        `;
        card.addEventListener("click", () => {
          if (inSecGrapher && inSecGrapher.style.display !== "none") {
            const graphInput = container.querySelector("#calc-graph-func");
            if (graphInput) {
              const val = graphInput.value;
              const needsMul = val && /[\d\)\wπe]$/.test(val.trim());
              graphInput.value += (needsMul ? " * " : "") + c.val;
              drawGraph();
            }
          } else {
            if (isResultState) {
              formulaStr = c.val;
              isResultState = false;
            } else {
              const trimmed = formulaStr.trim();
              const needsMul = trimmed && /[\d\)\wπe]$/.test(trimmed);
              formulaStr += (needsMul ? " × " : "") + c.val;
            }
            updateDisplay();
            updateLivePreview();
          }
          if (app && typeof app.playSynthSound === "function") app.playSynthSound("click");
          app.showToast(`Inserted ${c.symbol} (${c.name.split(" ")[0]})`, "info");
        });
        gridEl.appendChild(card);
      });
    };

    const updateDisplay = () => {
      if (formulaInput) {
        formulaInput.value = formulaStr || "";
      }
      if (formulaDisplay) {
        formulaDisplay.innerText = formulaStr || "";
      }
    };

    // Auto-balance trailing unclosed parentheses
    function autoCloseParentheses(str) {
      let openCount = 0;
      for (const c of str) {
        if (c === '(') openCount++;
        else if (c === ')') openCount--;
      }
      if (openCount > 0) {
        return str + ')'.repeat(openCount);
      }
      return str;
    }

    // Tokenizer supporting all scientific, hyperbolic, rounding, and mathematical pipe |x| functions
    function tokenize(str) {
      const tokens = [];
      let i = 0;
      const functions = [
        "asin", "acos", "atan", "sinh", "cosh", "tanh", "sin", "cos", "tan",
        "log10", "log2", "log", "ln", "sqrt", "cbrt", "abs", "exp", "ceil", "floor", "round"
      ];

      while (i < str.length) {
        const char = str[i];
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

        // Mathematical absolute value pipe: |x| -> abs(x)
        if (char === "|") {
          const prev = tokens.length > 0 ? tokens[tokens.length - 1] : null;
          const isClosing = prev && (
            prev.type === "NUMBER" ||
            prev.type === "CONSTANT" ||
            prev.type === "VARIABLE" ||
            prev.type === "RPAREN" ||
            prev.type === "FACTORIAL" ||
            prev.type === "SQUARE" ||
            prev.type === "CUBE"
          );
          if (isClosing) {
            tokens.push({ type: "RPAREN" });
          } else {
            tokens.push({ type: "FUNCTION", value: "abs" });
            tokens.push({ type: "LPAREN" });
          }
          i++;
          continue;
        }

        if (str.slice(i, i + 3).toLowerCase() === "mod") {
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
          if (str.slice(i).toLowerCase().startsWith(fn)) {
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

    // Mathematical Parser Engine with exact operator precedence & right-associative exponentiation
    function parseAndEvaluate(str, degreesMode = true, variables = null) {
      const closedStr = autoCloseParentheses(str.trim());
      const rawTokens = tokenize(closedStr);
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
        let node = parseUnary();
        while (peek() && (peek().type === "MULTIPLY" || peek().type === "DIVIDE" || peek().type === "MOD")) {
          const token = consume();
          const right = parseUnary();
          if (token.type === "MULTIPLY") {
            node = node * right;
          } else if (token.type === "DIVIDE") {
            if (right === 0) throw new Error("Division by zero");
            node = node / right;
          } else {
            if (right === 0) throw new Error("Modulo by zero");
            node = node % right;
          }
        }
        return node;
      }

      // Unary +/- handles negation with algebraic precedence (-3^2 = -(3^2) = -9)
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
        return parsePower();
      }

      // Exponentiation: right-associative (2^3^2 = 2^(3^2) = 512)
      function parsePower() {
        let node = parsePostfix();
        if (peek() && peek().type === "POWER") {
          consume();
          const right = parseUnary();
          node = Math.pow(node, right);
        }
        return node;
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
          if (variables && variables.hasOwnProperty(t.value)) {
            return variables[t.value];
          }
          throw new Error(`Undefined variable '${t.value}' (switch to 2D Plotter for functions of x)`);
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
          return evaluateFunction(t.value, arg, degreesMode);
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

    function evaluateFunction(fn, arg, degreesMode) {
      let angle = arg;
      if (degreesMode && ["sin", "cos", "tan"].includes(fn)) {
        angle = (arg * Math.PI) / 180;
      }
      let val;
      switch (fn) {
        case "sin":
          if (degreesMode) {
            const modDeg = ((arg % 360) + 360) % 360;
            if (modDeg === 0 || modDeg === 180) return 0;
            if (modDeg === 90) return 1;
            if (modDeg === 270) return -1;
            if (Math.abs(modDeg - 30) < 1e-9 || Math.abs(modDeg - 150) < 1e-9) return 0.5;
            if (Math.abs(modDeg - 210) < 1e-9 || Math.abs(modDeg - 330) < 1e-9) return -0.5;
          }
          val = Math.sin(angle);
          break;
        case "cos":
          if (degreesMode) {
            const modDeg = ((arg % 360) + 360) % 360;
            if (modDeg === 90 || modDeg === 270) return 0;
            if (modDeg === 0) return 1;
            if (modDeg === 180) return -1;
            if (Math.abs(modDeg - 60) < 1e-9 || Math.abs(modDeg - 300) < 1e-9) return 0.5;
            if (Math.abs(modDeg - 120) < 1e-9 || Math.abs(modDeg - 240) < 1e-9) return -0.5;
          }
          val = Math.cos(angle);
          break;
        case "tan":
          if (degreesMode) {
            const modDeg = ((arg % 360) + 360) % 360;
            if (modDeg === 90 || modDeg === 270) throw new Error("Tangent is undefined (asymptote)");
            if (modDeg === 0 || modDeg === 180) return 0;
            if (Math.abs(modDeg - 45) < 1e-9 || Math.abs(modDeg - 225) < 1e-9) return 1;
            if (Math.abs(modDeg - 135) < 1e-9 || Math.abs(modDeg - 315) < 1e-9) return -1;
          }
          val = Math.tan(angle);
          if (Math.abs(val) > 1e14) throw new Error("Tangent is undefined (asymptote)");
          break;
        case "asin":
          if (arg < -1 || arg > 1) throw new Error("Domain Error: asin requires input between -1 and 1");
          val = Math.asin(arg);
          if (degreesMode) val = (val * 180) / Math.PI;
          break;
        case "acos":
          if (arg < -1 || arg > 1) throw new Error("Domain Error: acos requires input between -1 and 1");
          val = Math.acos(arg);
          if (degreesMode) val = (val * 180) / Math.PI;
          break;
        case "atan":
          val = Math.atan(arg);
          if (degreesMode) val = (val * 180) / Math.PI;
          break;
        case "sinh":
          val = Math.sinh(arg);
          break;
        case "cosh":
          val = Math.cosh(arg);
          break;
        case "tanh":
          val = Math.tanh(arg);
          break;
        case "ln":
          if (arg <= 0) throw new Error("Domain Error: ln requires positive number");
          val = Math.log(arg);
          break;
        case "log":
        case "log10":
          if (arg <= 0) throw new Error("Domain Error: log requires positive number");
          val = Math.log10(arg);
          break;
        case "log2":
          if (arg <= 0) throw new Error("Domain Error: log2 requires positive number");
          val = Math.log2(arg);
          break;
        case "exp":
          val = Math.exp(arg);
          break;
        case "abs":
          val = Math.abs(arg);
          break;
        case "ceil":
          val = Math.ceil(arg);
          break;
        case "floor":
          val = Math.floor(arg);
          break;
        case "round":
          val = Math.round(arg);
          break;
        case "sqrt":
          if (arg < 0) throw new Error("Domain Error: Square root of negative number");
          val = Math.sqrt(arg);
          break;
        case "cbrt":
          val = Math.cbrt(arg);
          break;
        default:
          throw new Error(`Unknown function: ${fn}`);
      }
      if (Math.abs(val) < 1e-15) val = 0;
      if (isNaN(val)) throw new Error("Invalid calculation result (NaN)");
      return val;
    }

    function formatCalcResult(val) {
      if (typeof val !== "number") return val;
      if (!isFinite(val)) return "Error";
      if (Math.abs(val) < 1e-15) return "0";

      // Scientific notation for huge or micro non-zero values
      if (Math.abs(val) >= 1e14 || (Math.abs(val) < 1e-6 && val !== 0)) {
        const exp = val.toExponential(8);
        return exp.replace(/\.?0+e/, 'e').replace(/(\.\d+?)0+e/, (m, p1) => p1 + 'e');
      }

      const str = Number(val.toPrecision(14)).toString();
      return str;
    }

    function toggleNegate(str) {
      if (!str || str.endsWith(" + ") || str.endsWith(" - ") || str.endsWith(" × ") || str.endsWith(" ÷ ") || str.endsWith(" mod ") || str.endsWith("(")) {
        return str + "-";
      }
      if (str === "-") return "";
      if (str.endsWith(" -")) return str.slice(0, -2);
      if (str.endsWith("-") && (str.length === 1 || /\s[+×÷-]-$/.test(str))) {
        return str.slice(0, -1);
      }
      const negParenMatch = str.match(/\(-(\d+(\.\d*)?|\.\d+)\)$/);
      if (negParenMatch) {
        return str.substring(0, negParenMatch.index) + negParenMatch[1];
      }
      const soloNegMatch = str.match(/^-(\d+(\.\d*)?|\.\d+)$/);
      if (soloNegMatch) {
        return soloNegMatch[1];
      }
      const posMatch = str.match(/\b(\d+(\.\d*)?|\.\d+)$/);
      if (posMatch) {
        return str.substring(0, posMatch.index) + `(-${posMatch[1]})`;
      }
      return str + "-";
    }

    const updatePropertiesAndConversions = (val) => {
      if (typeof val === "number" && isFinite(val)) {
        const isInt = Number.isInteger(val);
        if (propType) {
          if (val === 0) propType.innerText = "Zero (Integer)";
          else if (isInt) propType.innerText = `${val > 0 ? "Positive" : "Negative"} ${val % 2 === 0 ? "Even" : "Odd"} Integer`;
          else propType.innerText = `${val > 0 ? "Positive" : "Negative"} Real Decimal`;
        }
        if (propSci) {
          propSci.innerText = val.toExponential(4);
        }
        if (propAngle) {
          propAngle.innerText = isDegrees ? "Degrees (DEG)" : "Radians (RAD)";
        }

        if (baseConversionBar && isInt && val >= -2e15 && val <= 2e15) {
          baseConversionBar.style.display = "flex";
          let unsignedVal = val;
          if (val < 0) {
            unsignedVal = val >>> 0;
          }

          const hexStr = "0x" + unsignedVal.toString(16).toUpperCase();
          const decStr = val.toString(10);
          const octStr = "0o" + unsignedVal.toString(8);
          const fullBinStr = "0b" + unsignedVal.toString(2);

          if (baseHex) {
            baseHex.innerText = hexStr;
            const hexBox = baseHex.closest(".calc-radix-box");
            if (hexBox) hexBox.setAttribute("data-full-val", hexStr);
          }
          if (baseDec) {
            baseDec.innerText = decStr;
            const decBox = baseDec.closest(".calc-radix-box");
            if (decBox) decBox.setAttribute("data-full-val", decStr);
          }
          if (baseOct) {
            baseOct.innerText = octStr;
            const octBox = baseOct.closest(".calc-radix-box");
            if (octBox) octBox.setAttribute("data-full-val", octStr);
          }
          if (baseBin) {
            const rawBin = unsignedVal.toString(2);
            if (rawBin.length > 18) {
              baseBin.innerText = "..." + rawBin.slice(-16);
            } else {
              baseBin.innerText = "0b" + rawBin;
            }
            const binBox = baseBin.closest(".calc-radix-box");
            if (binBox) {
              binBox.setAttribute("data-full-val", fullBinStr);
              binBox.title = fullBinStr + " (Click to copy full binary)";
            }
          }
        } else if (baseConversionBar) {
          baseConversionBar.style.display = "none";
        }
      } else {
        if (propType) propType.innerText = "—";
        if (propSci) propSci.innerText = "—";
        if (baseConversionBar) baseConversionBar.style.display = "none";
      }
    };

    // Live background computation preview
    const updateLivePreview = () => {
      const trimmed = formulaStr.trim();
      if (!trimmed || isResultState) return;

      try {
        const val = parseAndEvaluate(trimmed, isDegrees);
        if (typeof val === "number" && isFinite(val) && !isNaN(val)) {
          const formatted = formatCalcResult(val);
          if (resultDisplay) {
            resultDisplay.innerText = formatted;
            resultDisplay.style.color = "var(--text-muted)";
            updateResultFontSize(formatted);
          }
          if (monitorStatus) {
            monitorStatus.innerText = "● Live Preview";
            monitorStatus.style.color = "var(--accent-purple)";
          }
          updatePropertiesAndConversions(val);
        }
      } catch (e) {
        // Silently wait for completed expression
      }
    };

    const handleCalcInput = (type, key) => {
      if (app && typeof app.playSynthSound === "function") app.playSynthSound("click");

      if (isResultState) {
        if (type === "num" || key === "PI" || key === "E" || key === "(" ||
            ["sin", "cos", "tan", "asin", "acos", "atan", "sinh", "cosh", "tanh", "ln", "log", "sqrt", "cbrt", "abs", "exp", "round", "√", "³√"].includes(key)) {
          formulaStr = "";
          isResultState = false;
        } else if ((type === "op" && key !== "equals") || key === "mod" || key === "pow") {
          const operatorMap = {
            add: " + ",
            subtract: " - ",
            multiply: " × ",
            divide: " ÷ ",
            mod: " mod ",
            pow: "^"
          };
          formulaStr = (lastResult !== null ? formatCalcResult(lastResult) : "0") + (operatorMap[key] || " ");
          isResultState = false;
          updateDisplay();
          updateLivePreview();
          return;
        } else if (key === "sq" || key === "cube" || key === "factorial" || key === "recip") {
          const prevVal = lastResult !== null ? lastResult : (parseFloat(resultDisplay ? resultDisplay.innerText : "0") || 0);
          const formattedPrev = formatCalcResult(prevVal);
          const wrapped = (prevVal < 0 || !/^-?\d+(\.\d+)?$/.test(formattedPrev)) ? `(${formattedPrev})` : formattedPrev;

          if (key === "sq") {
            formulaStr = `${wrapped}²`;
          } else if (key === "cube") {
            formulaStr = `${wrapped}³`;
          } else if (key === "factorial") {
            formulaStr = `${wrapped}!`;
          } else if (key === "recip") {
            formulaStr = `1÷(${formattedPrev})`;
          }
          isResultState = false;
          updateDisplay();
          evaluateExpression();
          return;
        } else if (key === "negate") {
          if (lastResult !== null) {
            lastResult = -lastResult;
            formulaStr = formatCalcResult(lastResult);
            if (resultDisplay) {
              resultDisplay.innerText = formulaStr;
              resultDisplay.style.color = "var(--accent-cyan)";
              updateResultFontSize(formulaStr);
            }
            updatePropertiesAndConversions(lastResult);
            updateDisplay();
            return;
          }
        }
      }

      if (type === "num") {
        if (key === ".") {
          const lastNumMatch = formulaStr.match(/(?:\d+(\.\d*)?|\.\d*)$/);
          if (lastNumMatch && lastNumMatch[0].includes(".")) {
            return;
          }
          if (!formulaStr || /[\s(+×÷\-^%]$/.test(formulaStr)) {
            formulaStr += "0.";
            updateDisplay();
            updateLivePreview();
            return;
          }
        }
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

        if (formulaStr === "" && key === "subtract") {
          formulaStr = "-";
        } else if (formulaStr !== "") {
          const trailingOpMatch = formulaStr.match(/\s(mod|[+×÷-])\s$/);
          if (trailingOpMatch) {
            formulaStr = formulaStr.slice(0, -trailingOpMatch[0].length) + operatorMap[key];
          } else if (formulaStr.endsWith("-") && formulaStr.length === 1) {
            if (key !== "subtract") formulaStr = "";
          } else if (formulaStr.endsWith("^")) {
            formulaStr = formulaStr.slice(0, -1) + operatorMap[key];
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
          const trailingOpMatch = formulaStr.match(/\s(mod|[+×÷-])\s$/);
          if (trailingOpMatch) {
            formulaStr = formulaStr.slice(0, -trailingOpMatch[0].length) + "^";
          } else if (!formulaStr.endsWith("^")) {
            formulaStr += "^";
          }
        } else if (key === "sq") {
          formulaStr += "²";
        } else if (key === "cube") {
          formulaStr += "³";
        } else if (key === "factorial") {
          formulaStr += "!";
        } else if (key === "recip") {
          if (isResultState && lastResult !== null) {
            formulaStr = "1÷(" + formatCalcResult(lastResult) + ")";
            isResultState = false;
            updateDisplay();
            evaluateExpression();
            return;
          } else if (formulaStr) {
            const trimmed = formulaStr.trim();
            if (/[\d\)πe\w]$/.test(trimmed)) {
              const parenMatch = trimmed.match(/\((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*\)$/);
              const numMatch = trimmed.match(/(?:(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?|[πe\w])$/);
              if (parenMatch && parenMatch.index !== undefined) {
                formulaStr = trimmed.slice(0, parenMatch.index) + "1÷" + parenMatch[0];
              } else if (numMatch && numMatch.index !== undefined) {
                formulaStr = trimmed.slice(0, numMatch.index) + "1÷(" + numMatch[0] + ")";
              } else {
                formulaStr = "1÷(" + trimmed + ")";
              }
            } else {
              formulaStr += "1÷(";
            }
          } else {
            formulaStr = "1÷(";
          }
        } else if (key === "mod") {
          const trailingOpMatch = formulaStr.match(/\s(mod|[+×÷-])\s$/);
          if (trailingOpMatch) {
            formulaStr = formulaStr.slice(0, -trailingOpMatch[0].length) + " mod ";
          } else if (!formulaStr.endsWith(" mod ")) {
            formulaStr += " mod ";
          }
        } else if (["sin", "cos", "tan", "asin", "acos", "atan", "sinh", "cosh", "tanh", "ln", "log", "sqrt", "cbrt", "abs", "exp", "round"].includes(key)) {
          formulaStr += key + "(";
        } else if (key === "√") {
          formulaStr += "sqrt(";
        } else if (key === "³√") {
          formulaStr += "cbrt(";
        }
      } else if (type === "action") {
        if (key === "clear") {
          formulaStr = "";
          if (resultDisplay) {
            resultDisplay.innerText = "0";
            resultDisplay.style.color = "var(--accent-cyan)";
            updateResultFontSize("0");
          }
          if (monitorStatus) {
            monitorStatus.innerText = "● Cleared";
            monitorStatus.style.color = "var(--text-muted)";
          }
          updatePropertiesAndConversions(null);
        } else if (key === "allclear") {
          formulaStr = "";
          lastResult = null;
          memoryValue = 0;
          updateMemoryUI();
          updatePropertiesAndConversions(null);
          if (resultDisplay) {
            resultDisplay.innerText = "0";
            resultDisplay.style.color = "var(--accent-cyan)";
            updateResultFontSize("0");
          }
          if (monitorStatus) {
            monitorStatus.innerText = "● Ready";
            monitorStatus.style.color = "var(--accent-emerald)";
          }
          app.showToast("Cleared displays and memory", "info");
        } else if (key === "backspace") {
          if (formulaStr.endsWith(" + ") || formulaStr.endsWith(" - ") || formulaStr.endsWith(" × ") || formulaStr.endsWith(" ÷ ")) {
            formulaStr = formulaStr.slice(0, -3);
          } else if (formulaStr.endsWith(" mod ")) {
            formulaStr = formulaStr.slice(0, -5);
          } else if (formulaStr.endsWith("1÷(")) {
            formulaStr = formulaStr.slice(0, -3);
          } else if (formulaStr.endsWith("round(") || formulaStr.endsWith("floor(") || formulaStr.endsWith("log10(")) {
            formulaStr = formulaStr.slice(0, -6);
          } else if (formulaStr.endsWith("asin(") || formulaStr.endsWith("acos(") || formulaStr.endsWith("atan(") || formulaStr.endsWith("sinh(") || formulaStr.endsWith("cosh(") || formulaStr.endsWith("tanh(") || formulaStr.endsWith("sqrt(") || formulaStr.endsWith("cbrt(") || formulaStr.endsWith("ceil(") || formulaStr.endsWith("log2(")) {
            formulaStr = formulaStr.slice(0, -5);
          } else if (formulaStr.endsWith("sin(") || formulaStr.endsWith("cos(") || formulaStr.endsWith("tan(") || formulaStr.endsWith("log(") || formulaStr.endsWith("abs(") || formulaStr.endsWith("exp(")) {
            formulaStr = formulaStr.slice(0, -4);
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
        if (formulaStr && !isResultState) {
          evaluateExpression();
        }
        const currentVal = lastResult !== null ? lastResult : (parseFloat(resultDisplay ? resultDisplay.innerText : "0") || 0);

        if (key === "mc") {
          memoryValue = 0;
          app.showToast("Memory Cleared", "info");
        } else if (key === "mr") {
          if (isResultState) {
            formulaStr = formatCalcResult(memoryValue);
            isResultState = false;
          } else {
            const trimmed = formulaStr.trim();
            const needsMul = trimmed && /[\d\)\wπe]$/.test(trimmed);
            formulaStr += (needsMul ? " × " : "") + formatCalcResult(memoryValue);
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
      updateLivePreview();
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
          updateResultFontSize(formatted);
        }
        if (monitorStatus) {
          monitorStatus.innerText = "● Computed";
          monitorStatus.style.color = "var(--accent-emerald)";
        }

        updatePropertiesAndConversions(val);

        calcHistory.unshift({ formula: formulaStr, result: formatted });
        if (calcHistory.length > 25) calcHistory.pop();
        saveCalcHistory();
        renderHistory();

        if (outTabMonitor && !outTabMonitor.classList.contains("active")) {
          outTabMonitor.click();
        }
      } catch (err) {
        console.error(err);
        if (resultDisplay) {
          resultDisplay.innerText = err.message || "Error";
          resultDisplay.style.color = "var(--accent-rose)";
          updateResultFontSize(err.message || "Error");
        }
        if (monitorStatus) {
          monitorStatus.innerText = "● Syntax Error";
          monitorStatus.style.color = "var(--accent-rose)";
        }
        updatePropertiesAndConversions(null);
      }
    };

    const getNiceGridStep = (span) => {
      const rawStep = span / 6;
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
      const containerEl = container.querySelector("#calc-graph-container");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const funcStr = container.querySelector("#calc-graph-func")?.value.trim() || "sin(x)";
      const titleLabel = container.querySelector("#calc-graph-title-label");
      if (titleLabel) titleLabel.innerText = `f(x) = ${funcStr}`;

      const xMinInput = parseFloat(container.querySelector("#calc-graph-xmin")?.value);
      const xMaxInput = parseFloat(container.querySelector("#calc-graph-xmax")?.value);

      const xMin = isNaN(xMinInput) ? -10 : xMinInput;
      const xMax = isNaN(xMaxInput) ? 10 : xMaxInput;

      if (xMin >= xMax) {
        app.showToast("Min X must be less than Max X", "error");
        return;
      }

      const rect = containerEl ? containerEl.getBoundingClientRect() : { width: 480, height: 320 };
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(300, Math.floor(rect.width));
      const height = Math.max(260, Math.floor(rect.height || 320));

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      ctx.save();
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, width, height);

      // Deep dark graphing canvas backdrop
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, width, height);

      // Robust sampling with percentile outlier clamping for clean asymptotes
      const xSpan = xMax - xMin;
      const samples = 240;
      const yVals = [];
      for (let i = 0; i <= samples; i++) {
        const x = xMin + (xSpan * i) / samples;
        try {
          const yVal = parseAndEvaluate(funcStr, false, { x: x });
          if (isFinite(yVal) && !isNaN(yVal)) {
            yVals.push(yVal);
          }
        } catch (e) {}
      }

      let yMin = -5;
      let yMax = 5;
      if (yVals.length > 0) {
        const sorted = [...yVals].sort((a, b) => a - b);
        const p05 = sorted[Math.floor(sorted.length * 0.05)];
        const p95 = sorted[Math.floor(sorted.length * 0.95)];
        let minVal = sorted[0];
        let maxVal = sorted[sorted.length - 1];

        const robustSpan = p95 - p05;
        if (robustSpan > 0.001) {
          if (maxVal - minVal > robustSpan * 4) {
            minVal = Math.max(minVal, p05 - robustSpan * 0.5);
            maxVal = Math.min(maxVal, p95 + robustSpan * 0.5);
          }
        }

        const ySpanRaw = maxVal - minVal;
        if (ySpanRaw > 0.001) {
          yMin = minVal - ySpanRaw * 0.12;
          yMax = maxVal + ySpanRaw * 0.12;
        } else {
          yMin = minVal - 2;
          yMax = maxVal + 2;
        }
      }
      const ySpan = yMax - yMin;

      // Update state for hover crosshair tracker
      graphState = {
        xMin,
        xMax,
        yMin,
        yMax,
        ySpan: ySpan || 1,
        width,
        height,
        funcStr
      };

      // Draw Grid Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;

      const gridStepX = getNiceGridStep(xSpan);
      const startXGrid = Math.floor(xMin / gridStepX) * gridStepX;

      ctx.font = "9px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.35)";

      ctx.beginPath();
      for (let x = startXGrid; x <= xMax; x += gridStepX) {
        const cx = ((x - xMin) / xSpan) * width;
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, height);
        ctx.fillText(Number(x.toPrecision(4)).toString(), cx + 3, height - 6);
      }

      const gridStepY = getNiceGridStep(ySpan);
      const startYGrid = Math.floor(yMin / gridStepY) * gridStepY;
      for (let y = startYGrid; y <= yMax; y += gridStepY) {
        const cy = height - ((y - yMin) / ySpan) * height;
        ctx.moveTo(0, cy);
        ctx.lineTo(width, cy);
        if (cy > 14 && cy < height - 14) {
          ctx.fillText(Number(y.toPrecision(4)).toString(), 6, cy - 3);
        }
      }
      ctx.stroke();

      // Draw Axes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
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

      // Draw Function Curve with pixel-level density and asymptote discontinuity protection
      ctx.strokeStyle = "#00f2fe";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "rgba(0, 242, 254, 0.5)";
      ctx.shadowBlur = 8;
      ctx.beginPath();

      let started = false;
      let lastY = null;
      let lastPy = null;
      const curvePoints = Math.min(800, Math.max(300, width));

      for (let i = 0; i <= curvePoints; i++) {
        const px = (i / curvePoints) * width;
        const x = xMin + (xSpan * i) / curvePoints;
        try {
          const y = parseAndEvaluate(funcStr, false, { x: x });
          if (isFinite(y) && !isNaN(y)) {
            const py = height - ((y - yMin) / ySpan) * height;

            const isAsymptote = lastY !== null &&
              ((lastY > 0 && y < 0) || (lastY < 0 && y > 0)) &&
              Math.abs(py - lastPy) > height * 0.45;

            if (isAsymptote) {
              started = false;
            }

            if (py >= -30 && py <= height + 30) {
              if (!started) {
                ctx.moveTo(px, py);
                started = true;
              } else {
                ctx.lineTo(px, py);
              }
            } else {
              started = false;
            }
            lastY = y;
            lastPy = py;
          } else {
            started = false;
            lastY = null;
            lastPy = null;
          }
        } catch (e) {
          started = false;
          lastY = null;
          lastPy = null;
        }
      }
      ctx.stroke();

      // Draw Interactive Crosshair precisely on the mathematical curve if hovering
      if (hoverCrosshair && isFinite(hoverCrosshair.py)) {
        ctx.save();
        ctx.strokeStyle = "rgba(0, 242, 254, 0.4)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);

        // Vertical guide line
        ctx.beginPath();
        ctx.moveTo(hoverCrosshair.px, 0);
        ctx.lineTo(hoverCrosshair.px, height);
        ctx.stroke();

        // Horizontal guide line
        ctx.beginPath();
        ctx.moveTo(0, hoverCrosshair.py);
        ctx.lineTo(width, hoverCrosshair.py);
        ctx.stroke();

        // Glowing reticle dot on the curve
        ctx.fillStyle = "#00f2fe";
        ctx.shadowColor = "#00f2fe";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(hoverCrosshair.px, hoverCrosshair.py, 5, 0, Math.PI * 2);
        ctx.fill();

        // Coordinate pill on canvas
        ctx.shadowBlur = 0;
        ctx.font = "bold 10px monospace";
        const coordText = `(${hoverCrosshair.x.toFixed(2)}, ${hoverCrosshair.y.toFixed(2)})`;
        const textX = Math.min(hoverCrosshair.px + 8, width - 95);
        const textY = Math.max(hoverCrosshair.py - 8, 16);
        ctx.fillStyle = "rgba(7, 10, 19, 0.85)";
        ctx.fillRect(textX - 3, textY - 10, ctx.measureText(coordText).width + 6, 14);
        ctx.fillStyle = "#00f2fe";
        ctx.fillText(coordText, textX, textY);

        ctx.restore();
      }

      ctx.restore();
    };

    const initCalculatorListeners = () => {
      // Direct Formula Input Field Listener
      if (formulaInput) {
        formulaInput.addEventListener("input", () => {
          formulaStr = formulaInput.value;
          isResultState = false;
          if (formulaDisplay) formulaDisplay.innerText = formulaStr;
          updateLivePreview();
        });

        formulaInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            evaluateExpression();
          }
        });
      }

      container.querySelector("#calc-input-backspace")?.addEventListener("click", () => {
        handleCalcInput("action", "backspace");
      });

      container.querySelector("#calc-input-clear")?.addEventListener("click", () => {
        handleCalcInput("action", "clear");
      });

      // Keypad Event Listeners
      container.querySelectorAll(".num-key").forEach((btn) => {
        btn.addEventListener("click", () => {
          handleCalcInput("num", btn.getAttribute("data-val"));
        });
      });

      container.querySelectorAll(".op-key").forEach((btn) => {
        btn.addEventListener("click", () => {
          handleCalcInput("op", btn.getAttribute("data-op"));
        });
      });

      container.querySelectorAll(".fn-key").forEach((btn) => {
        btn.addEventListener("click", () => {
          const op = btn.getAttribute("data-op");
          const val = btn.getAttribute("data-val");
          handleCalcInput("fn", op || val);
        });
      });

      container.querySelectorAll(".action-key").forEach((btn) => {
        btn.addEventListener("click", () => {
          handleCalcInput("action", btn.getAttribute("data-op"));
        });
      });

      container.querySelectorAll(".mem-key").forEach((btn) => {
        btn.addEventListener("click", () => {
          handleCalcInput("mem", btn.getAttribute("data-op"));
        });
      });

      // Scientific Toggle
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

      // DEG / RAD Toggle
      if (angleBadge) {
        angleBadge.addEventListener("click", () => {
          isDegrees = !isDegrees;
          angleBadge.innerText = isDegrees ? "DEG" : "RAD";
          angleBadge.title = isDegrees ? "Angular mode: Degrees. Click to toggle" : "Angular mode: Radians. Click to toggle";
          if (propAngle) propAngle.innerText = isDegrees ? "Degrees (DEG)" : "Radians (RAD)";
          if (app && typeof app.playSynthSound === "function") app.playSynthSound("click");
          app.showToast(`Switched angular mode to ${isDegrees ? "Degrees" : "Radians"}`, "info");
          updateLivePreview();
        });
      }

      // Left Input Mode Tab Switching
      const switchLeftTab = (tabName) => {
        [inTabPad, inTabConstants, inTabGrapher].forEach((b) => b?.classList.remove("active"));
        if (inSecPad) inSecPad.style.display = "none";
        if (inSecConstants) inSecConstants.style.display = "none";
        if (inSecGrapher) inSecGrapher.style.display = "none";

        if (tabName === "constants") {
          inTabConstants?.classList.add("active");
          if (inSecConstants) inSecConstants.style.display = "flex";
        } else if (tabName === "grapher") {
          inTabGrapher?.classList.add("active");
          if (inSecGrapher) inSecGrapher.style.display = "flex";
          switchRightTab("graph");
        } else {
          inTabPad?.classList.add("active");
          if (inSecPad) inSecPad.style.display = "flex";
        }

        if (app && typeof app.playSynthSound === "function") app.playSynthSound("click");
        if (app && typeof app.syncSubtab === "function") app.syncSubtab("calculator", tabName);
      };

      inTabPad?.addEventListener("click", () => switchLeftTab("pad"));
      inTabConstants?.addEventListener("click", () => switchLeftTab("constants"));
      inTabGrapher?.addEventListener("click", () => switchLeftTab("grapher"));

      // Right Output Tab Switching
      const switchRightTab = (tabName) => {
        [outTabMonitor, outTabGraph, outTabHistory].forEach((b) => b?.classList.remove("active"));
        if (outSecMonitor) outSecMonitor.style.display = "none";
        if (outSecGraph) outSecGraph.style.display = "none";
        if (outSecHistory) outSecHistory.style.display = "none";

        if (tabName === "graph") {
          outTabGraph?.classList.add("active");
          if (outSecGraph) outSecGraph.style.display = "flex";
          setTimeout(drawGraph, 20);
        } else if (tabName === "history") {
          outTabHistory?.classList.add("active");
          if (outSecHistory) outSecHistory.style.display = "flex";
          renderHistory();
        } else {
          outTabMonitor?.classList.add("active");
          if (outSecMonitor) outSecMonitor.style.display = "flex";
        }

        if (app && typeof app.playSynthSound === "function") app.playSynthSound("click");
      };

      outTabMonitor?.addEventListener("click", () => switchRightTab("monitor"));
      outTabGraph?.addEventListener("click", () => switchRightTab("graph"));
      outTabHistory?.addEventListener("click", () => switchRightTab("history"));

      // Toggle Fullscreen Preview Mode
      const toggleFullscreen = () => {
        if (!rightPanel) return;
        const isFull = rightPanel.classList.toggle("preview-fullscreen");
        if (fullscreenBtn) {
          fullscreenBtn.classList.toggle("active", isFull);
          fullscreenBtn.title = isFull ? "Exit Fullscreen (Esc)" : "Toggle Fullscreen Output Mode";
          fullscreenBtn.innerHTML = isFull
            ? `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 14h6v6m10-10h-6V4m0 6 7-7M9 15l-7 7"/></svg>`
            : `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>`;
        }
        setTimeout(drawGraph, 50);
        if (app && typeof app.playSynthSound === "function") app.playSynthSound("click");
      };

      fullscreenBtn?.addEventListener("click", toggleFullscreen);

      // Register Tab Switcher for URL route synchronization
      if (app && typeof app.registerTabSwitcher === "function") {
        app.registerTabSwitcher("calculator", (subtab) => {
          if (subtab === "constants" || subtab === "grapher" || subtab === "pad") {
            switchLeftTab(subtab);
          }
        });
      }

      // Constants search input
      const constantsSearch = container.querySelector("#calc-constants-search");
      if (constantsSearch) {
        constantsSearch.addEventListener("input", (e) => {
          renderConstants(e.target.value);
        });
      }

      // Grapher preset buttons
      container.querySelectorAll(".calc-graph-preset-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const fn = btn.getAttribute("data-fn");
          const funcInput = container.querySelector("#calc-graph-func");
          if (funcInput) funcInput.value = fn;
          if (app && typeof app.playSynthSound === "function") app.playSynthSound("click");
          drawGraph();
          switchRightTab("graph");
        });
      });

      // Grapher Controls
      container.querySelector("#calc-graph-draw-btn")?.addEventListener("click", () => {
        switchRightTab("graph");
        drawGraph();
        app.showToast("Graph canvas updated", "info");
      });

      ["calc-graph-func", "calc-graph-xmin", "calc-graph-xmax"].forEach((id) => {
        container.querySelector("#" + id)?.addEventListener("change", drawGraph);
      });

      // Graph canvas hover coordinate tracker & interactive curve crosshair
      const graphCanvas = container.querySelector("#calc-graph-canvas");
      const hoverCoordsEl = container.querySelector("#calc-graph-hover-coords");
      if (graphCanvas && hoverCoordsEl) {
        graphCanvas.addEventListener("mousemove", (e) => {
          const rect = graphCanvas.getBoundingClientRect();
          const xPos = e.clientX - rect.left;
          const curX = graphState.xMin + (xPos / rect.width) * (graphState.xMax - graphState.xMin);
          const funcStr = container.querySelector("#calc-graph-func")?.value.trim() || "sin(x)";

          try {
            const curY = parseAndEvaluate(funcStr, false, { x: curX });
            if (isFinite(curY) && !isNaN(curY)) {
              const py = graphState.height - ((curY - graphState.yMin) / (graphState.ySpan || 1)) * graphState.height;
              hoverCrosshair = { x: curX, y: curY, px: xPos, py: Math.max(0, Math.min(graphState.height, py)) };
              hoverCoordsEl.innerText = `x: ${curX.toFixed(3)}, y: ${curY.toFixed(3)}`;
              drawGraph();
            } else {
              hoverCoordsEl.innerText = `x: ${curX.toFixed(3)}, y: undefined`;
              if (hoverCrosshair) {
                hoverCrosshair = null;
                drawGraph();
              }
            }
          } catch (err) {
            hoverCoordsEl.innerText = `x: ${curX.toFixed(3)}`;
            if (hoverCrosshair) {
              hoverCrosshair = null;
              drawGraph();
            }
          }
        });

        graphCanvas.addEventListener("mouseleave", () => {
          hoverCoordsEl.innerText = "Hover graph to inspect";
          hoverCrosshair = null;
          drawGraph();
        });
      }

      // Graph Zoom Controls
      container.querySelector("#calc-graph-zoom-in")?.addEventListener("click", () => {
        const xMinEl = container.querySelector("#calc-graph-xmin");
        const xMaxEl = container.querySelector("#calc-graph-xmax");
        if (xMinEl && xMaxEl) {
          const curMin = parseFloat(xMinEl.value);
          const curMax = parseFloat(xMaxEl.value);
          xMinEl.value = (curMin * 0.7).toFixed(1);
          xMaxEl.value = (curMax * 0.7).toFixed(1);
          drawGraph();
        }
      });

      container.querySelector("#calc-graph-zoom-out")?.addEventListener("click", () => {
        const xMinEl = container.querySelector("#calc-graph-xmin");
        const xMaxEl = container.querySelector("#calc-graph-xmax");
        if (xMinEl && xMaxEl) {
          const curMin = parseFloat(xMinEl.value);
          const curMax = parseFloat(xMaxEl.value);
          xMinEl.value = (curMin * 1.4).toFixed(1);
          xMaxEl.value = (curMax * 1.4).toFixed(1);
          drawGraph();
        }
      });

      container.querySelector("#calc-graph-reset-range")?.addEventListener("click", () => {
        const xMinEl = container.querySelector("#calc-graph-xmin");
        const xMaxEl = container.querySelector("#calc-graph-xmax");
        if (xMinEl && xMaxEl) {
          xMinEl.value = "-10";
          xMaxEl.value = "10";
          drawGraph();
          app.showToast("Reset range to [-10, 10]", "info");
        }
      });

      // Export Graph PNG
      container.querySelector("#calc-graph-export-png")?.addEventListener("click", () => {
        if (!graphCanvas) return;
        const link = document.createElement("a");
        link.download = `graph-${Date.now()}.png`;
        link.href = graphCanvas.toDataURL("image/png");
        link.click();
        app.showToast("Downloaded 2D graph PNG", "success");
      });

      // Screen Output Actions
      container.querySelector("#calc-copy-result-btn")?.addEventListener("click", () => {
        const text = resultDisplay ? resultDisplay.innerText : "0";
        app.copyText(text);
      });

      container.querySelector("#calc-reuse-result-btn")?.addEventListener("click", () => {
        const text = resultDisplay ? resultDisplay.innerText : "0";
        if (text && text !== "Error") {
          formulaStr = text;
          isResultState = false;
          updateDisplay();
          updateLivePreview();
          app.showToast("Reused calculated result in formula", "info");
        }
      });

      container.querySelector("#calc-clear-screen-btn")?.addEventListener("click", () => {
        handleCalcInput("action", "clear");
      });

      // Radix Copy Boxes
      container.querySelectorAll(".calc-radix-box").forEach((box) => {
        box.addEventListener("click", () => {
          const fullVal = box.getAttribute("data-full-val");
          const valEl = box.querySelector(".calc-radix-val");
          const toCopy = fullVal || (valEl ? valEl.innerText : "");
          if (toCopy) {
            app.copyText(toCopy);
          }
        });
      });

      // Clear History Button
      container.querySelector("#calc-clear-history-btn")?.addEventListener("click", () => {
        calcHistory = [];
        saveCalcHistory();
        renderHistory();
        app.showToast("Cleared calculation history", "info");
      });

      // Example tabs in Guide card
      let activeExampleIndex = 0;
      const tabBtns = container.querySelectorAll(".tool-guide-example-tab-btn");
      const rows = container.querySelectorAll(".tool-guide-io-row");

      tabBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          tabBtns.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          activeExampleIndex = parseInt(btn.getAttribute("data-index"), 10);
          rows.forEach((row, idx) => {
            row.style.display = idx === activeExampleIndex ? "flex" : "none";
          });
        });
      });

      // Quick Guide "Try Example"
      container.querySelector("#calc-guide-load-sample")?.addEventListener("click", () => {
        if (activeExampleIndex === 0) {
          isDegrees = true;
          if (angleBadge) angleBadge.innerText = "DEG";
          formulaStr = "sin(30) + cos(60)";
          isResultState = false;
          updateDisplay();
          evaluateExpression();
          app.showToast("Loaded: sin(30) + cos(60) = 1 (DEG)", "info");
        } else {
          formulaStr = "2^3 + 5*2 - 4";
          isResultState = false;
          updateDisplay();
          evaluateExpression();
          app.showToast("Loaded: 2^3 + 5*2 - 4 = 14", "info");
        }
      });

      // Responsive ResizeObserver for crisp graph re-rendering on window or panel size changes
      const graphContainer = container.querySelector("#calc-graph-container");
      if (typeof ResizeObserver !== "undefined" && graphContainer) {
        if (resizeObserverRef) resizeObserverRef.disconnect();
        resizeObserverRef = new ResizeObserver(() => {
          if (outSecGraph && outSecGraph.style.display !== "none") {
            drawGraph();
          }
        });
        resizeObserverRef.observe(graphContainer);
      }
    };

    // Global keyboard listener
    const onKeyDown = (e) => {
      if (app.activeTool !== "calculator") return;
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      if (activeTag === "textarea" || (activeTag === "input" && document.activeElement.id !== "calc-formula-input")) return;

      const key = e.key;

      // Handle Escape for fullscreen preview exit
      if (key === "Escape") {
        if (rightPanel && rightPanel.classList.contains("preview-fullscreen")) {
          e.preventDefault();
          fullscreenBtn?.click();
          return;
        }
        e.preventDefault();
        handleCalcInput("action", "clear");
        return;
      }

      if (activeTag === "input" && document.activeElement.id === "calc-formula-input") {
        if (key === "Enter") {
          e.preventDefault();
          evaluateExpression();
        }
        return;
      }

      if (["/", "*", "+", "-", "%", "^", "Enter", "!"].includes(key)) {
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
      } else if (key === "!") {
        handleCalcInput("fn", "factorial");
      } else if (key === "(") {
        handleCalcInput("fn", "(");
      } else if (key === ")") {
        handleCalcInput("fn", ")");
      } else if (key === "|") {
        handleCalcInput("fn", "abs");
      } else if (key === "Enter" || key === "=") {
        handleCalcInput("op", "equals");
      } else if (key === "Backspace") {
        handleCalcInput("action", "backspace");
      } else if (key === "Delete") {
        handleCalcInput("action", "clear");
      } else if (key.toLowerCase() === "p") {
        handleCalcInput("fn", "PI");
      } else if (key.toLowerCase() === "e") {
        handleCalcInput("fn", "E");
      }
    };

    if (onKeyDownRef) {
      window.removeEventListener("keydown", onKeyDownRef);
    }
    onKeyDownRef = onKeyDown;
    window.addEventListener("keydown", onKeyDownRef);

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
      updateResultFontSize("0");
      updatePropertiesAndConversions(0);
    };

    initCalculatorListeners();
    initCalculator();
  },
  cleanup() {
    if (onKeyDownRef) {
      window.removeEventListener("keydown", onKeyDownRef);
      onKeyDownRef = null;
    }
    if (resizeObserverRef) {
      resizeObserverRef.disconnect();
      resizeObserverRef = null;
    }
  }
};
