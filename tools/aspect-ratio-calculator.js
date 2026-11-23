import { escapeHtml } from './utils.js';

let appInstance = null;

// Helper: Greatest Common Divisor
function gcd(a, b) {
  a = Math.round(Math.abs(a));
  b = Math.round(Math.abs(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

const SOCIAL_PRESETS = [
  { platform: "youtube", name: "YouTube Thumbnail", w: 1280, h: 720, ratio: "16:9", badge: "Video", icon: "▶️" },
  { platform: "youtube", name: "YouTube Channel Banner", w: 2560, h: 1440, ratio: "16:9", badge: "Header", icon: "📺" },
  { platform: "youtube", name: "YouTube Shorts", w: 1080, h: 1920, ratio: "9:16", badge: "Vertical", icon: "📱" },
  { platform: "instagram", name: "Instagram Square Post", w: 1080, h: 1080, ratio: "1:1", badge: "Feed", icon: "📷" },
  { platform: "instagram", name: "Instagram Portrait Post", w: 1080, h: 1350, ratio: "4:5", badge: "Optimal", icon: "📸" },
  { platform: "instagram", name: "Instagram Story & Reel", w: 1080, h: 1920, ratio: "9:16", badge: "Story", icon: "🎬" },
  { platform: "tiktok", name: "TikTok Full Video", w: 1080, h: 1920, ratio: "9:16", badge: "Vertical", icon: "🎵" },
  { platform: "twitter", name: "Twitter/X In-Stream Photo", w: 1200, h: 675, ratio: "16:9", badge: "Timeline", icon: "🐦" },
  { platform: "twitter", name: "Twitter/X Header Banner", w: 1500, h: 500, ratio: "3:1", badge: "Profile", icon: "🖼️" },
  { platform: "linkedin", name: "LinkedIn Post Image", w: 1200, h: 627, ratio: "1.91:1", badge: "Feed", icon: "💼" },
  { platform: "general", name: "OpenGraph / Web Preview", w: 1200, h: 630, ratio: "1.91:1", badge: "SEO Meta", icon: "🌐" },
  { platform: "general", name: "Full HD Display (1080p)", w: 1920, h: 1080, ratio: "16:9", badge: "Display", icon: "🖥️" },
  { platform: "general", name: "4K UHD Display (2160p)", w: 3840, h: 2160, ratio: "16:9", badge: "Display", icon: "✨" },
  { platform: "general", name: "Cinema Widescreen", w: 2560, h: 1080, ratio: "21:9", badge: "Ultrawide", icon: "🎥" }
];

export default {
  id: "aspect-ratio-calculator",
  name: "Aspect Ratio & Social Media Studio",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <h3 style="margin: 0; display: flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="color: var(--accent-cyan);">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <span>Ratio Dimensions</span>
              </h3>
              <div style="display: flex; gap: 6px;">
                <button class="keyboard-tab active" data-tab="solver" id="ar-tab-solver" style="font-size: 11px; padding: 4px 8px;">Solver</button>
                <button class="keyboard-tab" data-tab="social" id="ar-tab-social" style="font-size: 11px; padding: 4px 8px;">Social Presets</button>
              </div>
            </div>
          </div>

          <!-- TAB 1: Ratio Solver Panel -->
          <div id="panel-solver-controls" class="tab-control-panel">
            <!-- Preset Ratio Buttons -->
            <div class="form-group">
              <label style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px;">Standard Aspect Ratios</label>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px;" id="ar-ratio-presets">
                <button type="button" class="tool-btn secondary ar-preset-btn active" data-w="16" data-h="9" style="font-size: 11px; padding: 4px 10px;">16:9 (HD)</button>
                <button type="button" class="tool-btn secondary ar-preset-btn" data-w="4" data-h="3" style="font-size: 11px; padding: 4px 10px;">4:3 (TV)</button>
                <button type="button" class="tool-btn secondary ar-preset-btn" data-w="1" data-h="1" style="font-size: 11px; padding: 4px 10px;">1:1 (Square)</button>
                <button type="button" class="tool-btn secondary ar-preset-btn" data-w="9" data-h="16" style="font-size: 11px; padding: 4px 10px;">9:16 (Reel)</button>
                <button type="button" class="tool-btn secondary ar-preset-btn" data-w="21" data-h="9" style="font-size: 11px; padding: 4px 10px;">21:9 (Ultrawide)</button>
                <button type="button" class="tool-btn secondary ar-preset-btn" data-w="4" data-h="5" style="font-size: 11px; padding: 4px 10px;">4:5 (Portrait)</button>
              </div>
            </div>

            <!-- Original / Target Inputs -->
            <div style="margin-top: 16px; padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; background: rgba(255, 255, 255, 0.015);">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent-cyan); margin-bottom: 10px;">1. Base Aspect Ratio Ratio (W1 : H1)</div>
              <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group">
                  <label for="ar-w1">Base Width (W1)</label>
                  <input type="number" id="ar-w1" class="form-input" min="1" max="100000" value="1920" style="font-family: var(--font-mono); font-weight: 700;">
                </div>
                <div class="form-group">
                  <label for="ar-h1">Base Height (H1)</label>
                  <input type="number" id="ar-h1" class="form-input" min="1" max="100000" value="1080" style="font-family: var(--font-mono); font-weight: 700;">
                </div>
              </div>
            </div>

            <div style="margin-top: 14px; padding: 14px; border: 1px solid var(--border-color); border-radius: 8px; background: rgba(255, 255, 255, 0.015);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--accent-emerald);">2. Target Dimension Calculation</span>
                <span id="ar-lock-indicator" style="font-size: 10.5px; color: var(--accent-emerald); font-weight: 600;">🔒 Proportions Linked</span>
              </div>
              <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group">
                  <label for="ar-w2">New Width (W2)</label>
                  <input type="number" id="ar-w2" class="form-input" min="1" max="100000" value="1280" style="font-family: var(--font-mono); font-weight: 700; border-color: var(--accent-cyan);">
                  <span style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Type W2 to solve H2</span>
                </div>
                <div class="form-group">
                  <label for="ar-h2">New Height (H2)</label>
                  <input type="number" id="ar-h2" class="form-input" min="1" max="100000" value="720" style="font-family: var(--font-mono); font-weight: 700; border-color: var(--accent-emerald);">
                  <span style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Type H2 to solve W2</span>
                </div>
              </div>
            </div>

            <!-- Quick Multipliers -->
            <div style="display: flex; gap: 6px; margin-top: 10px;">
              <button type="button" class="tool-btn secondary ar-scale-btn" data-scale="0.5" style="padding: 3px 8px; font-size: 10px;">0.5x</button>
              <button type="button" class="tool-btn secondary ar-scale-btn" data-scale="1" style="padding: 3px 8px; font-size: 10px;">1x Base</button>
              <button type="button" class="tool-btn secondary ar-scale-btn" data-scale="1.5" style="padding: 3px 8px; font-size: 10px;">1.5x</button>
              <button type="button" class="tool-btn secondary ar-scale-btn" data-scale="2" style="padding: 3px 8px; font-size: 10px;">2x (Retina)</button>
              <button type="button" class="tool-btn secondary ar-scale-btn" data-scale="4" style="padding: 3px 8px; font-size: 10px;">4x (Ultra HD)</button>
            </div>
          </div>

          <!-- TAB 2: Social Media Presets Panel -->
          <div id="panel-social-controls" class="tab-control-panel" style="display: none;">
            <div class="form-group">
              <label style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Filter Platform</label>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px;" id="ar-social-filter-pills">
                <button type="button" class="keyboard-tab active" data-platform="all" style="font-size: 10.5px; padding: 3px 8px;">All</button>
                <button type="button" class="keyboard-tab" data-platform="youtube" style="font-size: 10.5px; padding: 3px 8px;">YouTube</button>
                <button type="button" class="keyboard-tab" data-platform="instagram" style="font-size: 10.5px; padding: 3px 8px;">Instagram</button>
                <button type="button" class="keyboard-tab" data-platform="tiktok" style="font-size: 10.5px; padding: 3px 8px;">TikTok</button>
                <button type="button" class="keyboard-tab" data-platform="twitter" style="font-size: 10.5px; padding: 3px 8px;">Twitter/X</button>
                <button type="button" class="keyboard-tab" data-platform="general" style="font-size: 10.5px; padding: 3px 8px;">Web / Displays</button>
              </div>
            </div>

            <!-- Social Cards Grid -->
            <div id="ar-social-list" style="display: flex; flex-direction: column; gap: 8px; max-height: 380px; overflow-y: auto; margin-top: 12px; padding-right: 4px;">
              <!-- Populated via JS -->
            </div>
          </div>
        </div>

        <!-- Visual Stage & Code Generator Panel (Right) -->
        <div class="tool-panel" style="gap: 16px;">
          <div class="panel-header" style="justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="color: var(--accent-emerald);">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              <span>Visual Proportion Stage</span>
            </h3>

            <!-- Grid toggle -->
            <div style="display: flex; align-items: center; gap: 6px;">
              <label for="ar-toggle-grid" style="font-size: 11px; color: var(--text-muted); cursor: pointer; user-select: none;">Grid Overlay</label>
              <input type="checkbox" id="ar-toggle-grid" checked style="cursor: pointer;">
            </div>
          </div>

          <!-- Quick Metrics Bar -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
            <div class="glass-card" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
              <div style="font-size: 10px; text-transform: uppercase; color: var(--text-muted);">Aspect Ratio</div>
              <div id="ar-kpi-ratio" style="font-size: 18px; font-weight: 800; color: var(--accent-cyan); font-family: var(--font-mono); margin-top: 2px;">16:9</div>
            </div>
            <div class="glass-card" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
              <div style="font-size: 10px; text-transform: uppercase; color: var(--text-muted);">Decimal</div>
              <div id="ar-kpi-decimal" style="font-size: 18px; font-weight: 800; color: var(--accent-emerald); font-family: var(--font-mono); margin-top: 2px;">1.78</div>
            </div>
            <div class="glass-card" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
              <div style="font-size: 10px; text-transform: uppercase; color: var(--text-muted);">Orientation</div>
              <div id="ar-kpi-orient" style="font-size: 13px; font-weight: 700; color: var(--accent-purple); margin-top: 6px;">Landscape</div>
            </div>
            <div class="glass-card" style="padding: 10px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
              <div style="font-size: 10px; text-transform: uppercase; color: var(--text-muted);">Total Pixels</div>
              <div id="ar-kpi-pixels" style="font-size: 14px; font-weight: 700; color: var(--accent-amber); font-family: var(--font-mono); margin-top: 5px;">2.07 MP</div>
            </div>
          </div>

          <!-- Interactive Responsive Visual Box -->
          <div id="ar-stage-container" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; height: 260px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; padding: 20px;">
            <div id="ar-visual-box" style="width: 240px; height: 135px; border: 2px solid var(--accent-cyan); border-radius: 8px; background: rgba(0, 242, 254, 0.04); position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: all 0.25s ease; box-shadow: 0 8px 32px rgba(0,0,0,0.4);">
              <!-- Rule of thirds grid lines -->
              <div id="ar-grid-lines" style="position: absolute; inset: 0; pointer-events: none;">
                <div style="position: absolute; left: 33.33%; top: 0; bottom: 0; width: 1px; background: rgba(0, 242, 254, 0.15);"></div>
                <div style="position: absolute; left: 66.66%; top: 0; bottom: 0; width: 1px; background: rgba(0, 242, 254, 0.15);"></div>
                <div style="position: absolute; top: 33.33%; left: 0; right: 0; height: 1px; background: rgba(0, 242, 254, 0.15);"></div>
                <div style="position: absolute; top: 66.66%; left: 0; right: 0; height: 1px; background: rgba(0, 242, 254, 0.15);"></div>
              </div>

              <!-- Center Dimension Label -->
              <div id="ar-stage-badge" style="background: rgba(7, 9, 14, 0.85); backdrop-filter: blur(8px); border: 1px solid var(--border-color); padding: 6px 14px; border-radius: 6px; font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: var(--text-main); z-index: 2; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                1280 × 720 px
              </div>
              <div id="ar-stage-sub" style="font-size: 10px; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700; margin-top: 4px; z-index: 2; letter-spacing: 0.5px;">
                16:9 Widescreen
              </div>
            </div>
          </div>

          <!-- Generated CSS & Code Box -->
          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; letter-spacing: 0.5px;">Export Code Snippets</label>
              <button class="tool-btn secondary" id="ar-copy-css-btn" style="padding: 3px 10px; font-size: 11px; display: inline-flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy CSS</span>
              </button>
            </div>
            <textarea id="ar-output-css" class="input-textarea" readonly style="min-height: 85px; font-family: var(--font-mono); font-size: 12px; line-height: 1.5; background: rgba(0,0,0,0.3); resize: none;"></textarea>
          </div>
        </div>

        <!-- Tool Guide Card (Canonical Layout Standard) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Aspect Ratio Principles &amp; Responsive Web Standards</span>
            </div>
            <div class="tool-guide-badge">Zero-Server 100% Client-Side</div>
          </div>

          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Understanding Aspect Ratios</h4>
                <p>An aspect ratio represents the proportional relationship between an image or video's width and height. For example, <strong>16:9</strong> means for every 16 units of width, there are 9 units of height. The mathematical formula calculates: <code>(W / GCD) : (H / GCD)</code>.</p>
              </div>
            </div>

            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Modern CSS <code>aspect-ratio</code> Standard</h4>
                <p>Modern browsers natively support the CSS <code>aspect-ratio: 16 / 9;</code> property, eliminating cumulative layout shifts (CLS) by reserving canvas space before images and video embeds finish loading.</p>
              </div>
            </div>

            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Social Media Safe Zones</h4>
                <p>Social media feeds enforce strict display ratios. Instagram prioritizes <strong>4:5 portrait</strong> (taking up the most vertical mobile screen space), while YouTube Shorts and TikTok mandate <strong>9:16 vertical</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(app) {
    appInstance = app;
    const root = document.querySelector("#tool-viewport");
    if (!root) return;

    let w1 = 1920;
    let h1 = 1080;
    let w2 = 1280;
    let h2 = 720;
    let activePlatform = "all";

    const w1Input = root.querySelector("#ar-w1");
    const h1Input = root.querySelector("#ar-h1");
    const w2Input = root.querySelector("#ar-w2");
    const h2Input = root.querySelector("#ar-h2");
    const kpiRatio = root.querySelector("#ar-kpi-ratio");
    const kpiDecimal = root.querySelector("#ar-kpi-decimal");
    const kpiOrient = root.querySelector("#ar-kpi-orient");
    const kpiPixels = root.querySelector("#ar-kpi-pixels");
    const visualBox = root.querySelector("#ar-visual-box");
    const stageBadge = root.querySelector("#ar-stage-badge");
    const stageSub = root.querySelector("#ar-stage-sub");
    const outputCss = root.querySelector("#ar-output-css");
    const gridLines = root.querySelector("#ar-grid-lines");
    const toggleGrid = root.querySelector("#ar-toggle-grid");

    // Master update calculations
    const updateCalculations = () => {
      w1 = Math.max(1, parseFloat(w1Input?.value) || 1920);
      h1 = Math.max(1, parseFloat(h1Input?.value) || 1080);
      w2 = Math.max(1, parseFloat(w2Input?.value) || 1280);
      h2 = Math.max(1, parseFloat(h2Input?.value) || 720);

      const d = gcd(w1, h1);
      const ratioW = Math.round(w1 / d);
      const ratioH = Math.round(h1 / d);
      const decimalVal = (w1 / h1).toFixed(2);
      const pixelsVal = ((w2 * h2) / 1000000).toFixed(2);

      // Orientation
      let orient = "Landscape";
      if (w1 < h1) orient = "Portrait";
      else if (w1 === h1) orient = "Square";

      // Update KPI
      if (kpiRatio) kpiRatio.textContent = `${ratioW}:${ratioH}`;
      if (kpiDecimal) kpiDecimal.textContent = decimalVal;
      if (kpiOrient) {
        kpiOrient.textContent = orient;
        kpiOrient.style.color = orient === "Landscape" ? "var(--accent-purple)" : (orient === "Portrait" ? "var(--accent-emerald)" : "var(--accent-cyan)");
      }
      if (kpiPixels) kpiPixels.textContent = `${pixelsVal} MP`;

      // Visual box scaling
      const maxStageW = 280;
      const maxStageH = 210;
      let boxW = maxStageW;
      let boxH = boxW * (h1 / w1);

      if (boxH > maxStageH) {
        boxH = maxStageH;
        boxW = boxH * (w1 / h1);
      }

      if (visualBox) {
        visualBox.style.width = `${Math.round(boxW)}px`;
        visualBox.style.height = `${Math.round(boxH)}px`;
      }

      if (stageBadge) stageBadge.textContent = `${Math.round(w2)} × ${Math.round(h2)} px`;
      if (stageSub) stageSub.textContent = `${ratioW}:${ratioH} (${orient})`;

      // Generate CSS
      const paddingPercent = ((h1 / w1) * 100).toFixed(2);
      const cssString = `/* Modern CSS (Chrome, Safari, Firefox, Edge) */
.media-container {
  aspect-ratio: ${ratioW} / ${ratioH};
  width: 100%;
  max-width: ${Math.round(w2)}px;
}

/* Legacy Responsive Padding Hack (Cross-browser) */
.aspect-ratio-fallback {
  position: relative;
  width: 100%;
  padding-top: ${paddingPercent}%; /* ${h1}/${w1} */
}`;
      if (outputCss) outputCss.value = cssString;
    };

    // W1 & H1 change -> recompute H2
    w1Input?.addEventListener("input", () => {
      const w1Val = Math.max(1, parseFloat(w1Input.value) || 1920);
      const h1Val = Math.max(1, parseFloat(h1Input.value) || 1080);
      const w2Val = Math.max(1, parseFloat(w2Input.value) || 1280);
      h2 = Math.round(w2Val * (h1Val / w1Val));
      if (h2Input) h2Input.value = h2;
      updateCalculations();
    });

    h1Input?.addEventListener("input", () => {
      const w1Val = Math.max(1, parseFloat(w1Input.value) || 1920);
      const h1Val = Math.max(1, parseFloat(h1Input.value) || 1080);
      const w2Val = Math.max(1, parseFloat(w2Input.value) || 1280);
      h2 = Math.round(w2Val * (h1Val / w1Val));
      if (h2Input) h2Input.value = h2;
      updateCalculations();
    });

    // W2 change -> solve H2
    w2Input?.addEventListener("input", () => {
      const w1Val = Math.max(1, parseFloat(w1Input.value) || 1920);
      const h1Val = Math.max(1, parseFloat(h1Input.value) || 1080);
      const w2Val = Math.max(1, parseFloat(w2Input.value) || 1280);
      h2 = Math.round(w2Val * (h1Val / w1Val));
      if (h2Input) h2Input.value = h2;
      updateCalculations();
    });

    // H2 change -> solve W2
    h2Input?.addEventListener("input", () => {
      const w1Val = Math.max(1, parseFloat(w1Input.value) || 1920);
      const h1Val = Math.max(1, parseFloat(h1Input.value) || 1080);
      const h2Val = Math.max(1, parseFloat(h2Input.value) || 720);
      w2 = Math.round(h2Val * (w1Val / h1Val));
      if (w2Input) w2Input.value = w2;
      updateCalculations();
    });

    // Ratio Preset Buttons
    root.querySelectorAll(".ar-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        root.querySelectorAll(".ar-preset-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const rw = parseFloat(btn.dataset.w);
        const rh = parseFloat(btn.dataset.h);
        if (w1Input) w1Input.value = rw;
        if (h1Input) h1Input.value = rh;
        const currentW2 = parseFloat(w2Input?.value) || 1280;
        if (h2Input) h2Input.value = Math.round(currentW2 * (rh / rw));
        updateCalculations();
      });
    });

    // Scale buttons
    root.querySelectorAll(".ar-scale-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const factor = parseFloat(btn.dataset.scale);
        const baseW = parseFloat(w1Input?.value) || 1920;
        const baseH = parseFloat(h1Input?.value) || 1080;
        if (w2Input) w2Input.value = Math.round(baseW * factor);
        if (h2Input) h2Input.value = Math.round(baseH * factor);
        updateCalculations();
      });
    });

    // Grid toggle
    toggleGrid?.addEventListener("change", (e) => {
      if (gridLines) gridLines.style.display = e.target.checked ? "block" : "none";
    });

    // Copy CSS button
    root.querySelector("#ar-copy-css-btn")?.addEventListener("click", () => {
      if (outputCss) {
        navigator.clipboard.writeText(outputCss.value).then(() => {
          if (appInstance && typeof appInstance.showToast === "function") {
            appInstance.showToast("Copied CSS aspect-ratio code to clipboard!", "success");
          }
        });
      }
    });

    // Tabs switching (Solver vs Social Presets)
    const tabSolver = root.querySelector("#ar-tab-solver");
    const tabSocial = root.querySelector("#ar-tab-social");
    const panelSolver = root.querySelector("#panel-solver-controls");
    const panelSocial = root.querySelector("#panel-social-controls");

    tabSolver?.addEventListener("click", () => {
      tabSolver.classList.add("active");
      tabSocial.classList.remove("active");
      if (panelSolver) panelSolver.style.display = "block";
      if (panelSocial) panelSocial.style.display = "none";
    });

    tabSocial?.addEventListener("click", () => {
      tabSocial.classList.add("active");
      tabSolver.classList.remove("active");
      if (panelSolver) panelSolver.style.display = "none";
      if (panelSocial) panelSocial.style.display = "block";
      renderSocialList();
    });

    // Render Social Presets List
    const socialListBox = root.querySelector("#ar-social-list");
    const renderSocialList = () => {
      if (!socialListBox) return;
      const filtered = SOCIAL_PRESETS.filter(p => activePlatform === "all" || p.platform === activePlatform);

      socialListBox.innerHTML = filtered.map(item => `
        <div class="glass-card ar-social-card" style="padding: 10px 14px; border: 1px solid var(--border-color); border-radius: 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: all 0.2s ease;" data-w="${item.w}" data-h="${item.h}">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 18px;">${item.icon}</span>
            <div>
              <div style="font-size: 12px; font-weight: 700; color: var(--text-main);">${escapeHtml(item.name)}</div>
              <div style="font-size: 10.5px; color: var(--text-muted); font-family: var(--font-mono); margin-top: 1px;">
                ${item.w} × ${item.h} px <span style="color: var(--accent-cyan); font-weight: 700;">(${item.ratio})</span>
              </div>
            </div>
          </div>
          <button class="tool-btn secondary" style="font-size: 10px; padding: 3px 8px; pointer-events: none;">Apply</button>
        </div>
      `).join("");

      socialListBox.querySelectorAll(".ar-social-card").forEach(card => {
        card.addEventListener("click", () => {
          const w = parseFloat(card.dataset.w);
          const h = parseFloat(card.dataset.h);
          if (w1Input) w1Input.value = w;
          if (h1Input) h1Input.value = h;
          if (w2Input) w2Input.value = w;
          if (h2Input) h2Input.value = h;
          updateCalculations();
          if (appInstance && typeof appInstance.showToast === "function") {
            appInstance.showToast(`Applied ${w}×${h} preset!`, "success");
          }
        });
      });
    };

    // Filter platform pills
    root.querySelectorAll("#ar-social-filter-pills .keyboard-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        root.querySelectorAll("#ar-social-filter-pills .keyboard-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activePlatform = tab.dataset.platform;
        renderSocialList();
      });
    });

    // Run first calculation
    updateCalculations();
  },

  cleanup() {
    appInstance = null;
  }
};
