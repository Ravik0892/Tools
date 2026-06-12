let gsCanvas = null;
let gsCtx = null;
let gsPreset = null;
let gsCustomDims = null;
let gsWidthInput = null;
let gsHeightInput = null;
let gsBgType = null;
let gsFileInput = null;

let gsBgImage = null;
let gsLogoImage = null;
let gsCameraStream = null;
let app = null;

// Aspect ratio presets mapping
const gsPresets = {
  youtube: { w: 1280, h: 720 },
  instagram: { w: 1080, h: 1080 },
  twitter: { w: 1500, h: 500 },
  opengraph: { w: 1200, h: 630 }
};

const gsStylePresets = [
  {
    name: "Cyberpunk Glow",
    bgType: "gradient",
    col1: "#09090b",
    col2: "#1e1b4b",
    angle: 135,
    titleVal: "CYBERPUNK HUB",
    titleSize: 52,
    titleColor: "#f43f5e",
    titleFont: "Outfit",
    titleX: 50,
    titleY: 40,
    subVal: "Future Developer Workspace",
    subSize: 22,
    subColor: "#00f2fe",
    subFont: "monospace",
    subX: 50,
    subY: 58,
    brandVal: "// neon.system",
    brandSize: 14,
    brandColor: "#00ff87",
    brandX: 50,
    brandY: 74,
    card: true,
    border: true,
    blur: 0, bright: 100, contrast: 120, gray: 0, sepia: 0, hue: 0
  },
  {
    name: "Sunset Dream",
    bgType: "gradient",
    col1: "#fb5607",
    col2: "#ff007f",
    angle: 90,
    titleVal: "Sunset Vibes",
    titleSize: 60,
    titleColor: "#ffffff",
    titleFont: "Outfit",
    titleX: 50,
    titleY: 45,
    subVal: "A Premium Design Studio",
    subSize: 24,
    subColor: "#ffbe0b",
    subFont: "Inter",
    subX: 50,
    subY: 62,
    brandVal: "designed by creative.studio",
    brandSize: 16,
    brandColor: "#ffffff",
    brandX: 50,
    brandY: 78,
    card: false,
    border: false,
    blur: 0, bright: 100, contrast: 100, gray: 0, sepia: 0, hue: 0
  },
  {
    name: "Midnight Minimal",
    bgType: "gradient",
    col1: "#020617",
    col2: "#0f172a",
    angle: 180,
    titleVal: "MINIMAL WORKSPACE",
    titleSize: 40,
    titleColor: "#ffffff",
    titleFont: "Inter",
    titleX: 50,
    titleY: 45,
    subVal: "Focus on clean simplicity.",
    subSize: 18,
    subColor: "#94a3b8",
    subFont: "Inter",
    subX: 50,
    subY: 56,
    brandVal: "minimal.dev",
    brandSize: 13,
    brandColor: "#64748b",
    brandX: 50,
    brandY: 72,
    card: true,
    border: false,
    blur: 0, bright: 100, contrast: 100, gray: 0, sepia: 0, hue: 0
  },
  {
    name: "Emerald Neon",
    bgType: "gradient",
    col1: "#064e3b",
    col2: "#022c22",
    angle: 45,
    titleVal: "EMERALD STUDIO",
    titleSize: 55,
    titleColor: "#00ff87",
    titleFont: "Outfit",
    titleX: 50,
    titleY: 43,
    subVal: "Fast. Secure. Lightweight.",
    subSize: 20,
    subColor: "#ffffff",
    subFont: "monospace",
    subX: 50,
    subY: 58,
    brandVal: "secure.gateway.node",
    brandSize: 14,
    brandColor: "#60efff",
    brandX: 50,
    brandY: 73,
    card: true,
    border: true,
    blur: 0, bright: 100, contrast: 100, gray: 0, sepia: 0, hue: 0
  },
  {
    name: "Glassy Peach",
    bgType: "gradient",
    col1: "#ff9a9e",
    col2: "#fecfef",
    angle: 135,
    titleVal: "Peach Sweet",
    titleSize: 50,
    titleColor: "#ffffff",
    titleFont: "Outfit",
    titleX: 50,
    titleY: 44,
    subVal: "A gentle pastel mood board.",
    subSize: 22,
    subColor: "#ff758c",
    subFont: "Inter",
    subX: 50,
    subY: 58,
    brandVal: "@peach.dream",
    brandSize: 15,
    brandColor: "#ffffff",
    brandX: 50,
    brandY: 74,
    card: true,
    border: false,
    blur: 0, bright: 100, contrast: 105, gray: 0, sepia: 0, hue: 0
  }
];

export default {
  id: "graphics-studio",
  name: "Graphics Designer & Screenshot Studio",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel" id="gs-controls-panel" style="max-height: 80vh; overflow-y: auto;">
          <div class="panel-header">
            <h3>Design Controls</h3>
          </div>
          
          <div class="tab-container" style="margin-bottom: 16px;">
            <div style="display: flex; gap: 4px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
              <button class="tool-btn secondary active" id="gs-tab-source" style="flex: 1; font-size: 11px; padding: 6px;">Background</button>
              <button class="tool-btn secondary" id="gs-tab-text" style="flex: 1; font-size: 11px; padding: 6px;">Text Overlays</button>
              <button class="tool-btn secondary" id="gs-tab-filters" style="flex: 1; font-size: 11px; padding: 6px;">Filters</button>
            </div>
          </div>

          <!-- Source Controls -->
          <div class="gs-panel-section" id="gs-sec-source">
            <div class="form-group">
              <label for="gs-canvas-preset">Canvas Dimensions</label>
              <select class="form-select" id="gs-canvas-preset">
                <option value="youtube">YouTube Thumbnail (1280 × 720)</option>
                <option value="instagram">Instagram Square (1080 × 1080)</option>
                <option value="twitter">Twitter Header (1500 × 500)</option>
                <option value="opengraph">OpenGraph Card (1200 × 630)</option>
                <option value="custom">Custom Resolution</option>
              </select>
            </div>
            
            <div class="form-row" id="gs-custom-dims" style="display: none; margin-bottom: 12px;">
              <div class="form-group">
                <label for="gs-width">Width</label>
                <input type="number" id="gs-width" class="form-input" value="1280">
              </div>
              <div class="form-group">
                <label for="gs-height">Height</label>
                <input type="number" id="gs-height" class="form-input" value="720">
              </div>
            </div>

            <div class="form-group">
              <label>Background Source Type</label>
              <div style="display: flex; gap: 8px;">
                <select class="form-select" id="gs-bg-type" style="flex: 1;">
                  <option value="gradient">Color / CSS Gradient</option>
                  <option value="upload">Upload Custom Image</option>
                  <option value="screenshot">Screen Capture (Screenshot)</option>
                  <option value="camera">Webcam Camera Snap</option>
                </select>
                <button class="tool-btn secondary" id="gs-btn-clear-bg" title="Clear loaded background image" style="display: none; white-space: nowrap; height: 38px;">Clear Image</button>
              </div>
            </div>

            <div class="gs-bg-option" id="gs-bg-opt-gradient">
              <div class="form-group">
                <label>Colors</label>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input type="color" id="gs-col-1" value="#0f172a" style="border: none; background: none; width: 34px; height: 34px; cursor: pointer;">
                  <input type="color" id="gs-col-2" value="#1e1b4b" style="border: none; background: none; width: 34px; height: 34px; cursor: pointer;">
                  <input type="range" id="gs-grad-angle" class="slider-input" min="0" max="360" value="135" style="flex: 1;">
                  <span id="gs-grad-angle-val" style="font-size: 12px; font-family: var(--font-mono); width: 32px;">135°</span>
                </div>
              </div>
            </div>

            <div class="gs-bg-option" id="gs-bg-opt-upload" style="display: none;">
              <div class="form-group">
                <label for="gs-file-input">Choose Image File</label>
                <input type="file" id="gs-file-input" class="form-input" accept="image/*">
              </div>
            </div>

            <div class="gs-bg-option" id="gs-bg-opt-screenshot" style="display: none;">
              <div class="form-group">
                <button class="tool-btn primary" id="gs-btn-screenshot" style="width: 100%;">
                  <svg viewBox="0 0 24 24" style="width:16px; height:16px; margin-right:6px; fill: none; stroke: currentColor;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> 
                  Capture Window/Screen Frame
                </button>
                <p style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Click to select any open window, desktop, or browser tab to take a screenshot and load it.</p>
              </div>
            </div>

            <div class="gs-bg-option" id="gs-bg-opt-camera" style="display: none;">
              <div class="form-group">
                <div style="display: flex; gap: 8px;">
                  <button class="tool-btn secondary" id="gs-btn-camera-toggle" style="flex: 1;">Start Camera</button>
                  <button class="tool-btn primary" id="gs-btn-camera-snap" style="flex: 1;" disabled>Take Snap</button>
                </div>
                <div id="gs-camera-preview-container" style="display: none; border-radius: 8px; overflow: hidden; margin-top: 10px; border: 1px solid var(--border-color); aspect-ratio: 16/9; background-color: #000; position: relative;">
                  <video id="gs-camera-video" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
                </div>
              </div>
            </div>
            <div class="form-group" style="margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 12px;">
              <label>Branding Style Presets</label>
              <div id="gs-presets-box" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 6px; margin-top: 6px;">
                <!-- Dynamically populated presets -->
              </div>
            </div>
          </div>

          <!-- Text Overlays -->
          <div class="gs-panel-section" id="gs-sec-text" style="display: none;">
            <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 12px; margin-bottom: 12px;">
              <div class="form-group">
                <label for="gs-txt-title">Main Title</label>
                <input type="text" id="gs-txt-title" class="form-input" value="Masterpiece Hub">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Font Size</label>
                  <input type="range" id="gs-txt-title-size" class="slider-input" min="10" max="120" value="50">
                </div>
                <div class="form-group">
                  <label>Color</label>
                  <input type="color" id="gs-txt-title-color" value="#00f2fe" style="border: none; background: none; width: 100%; height: 38px; cursor: pointer;">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Position X (%)</label>
                  <input type="range" id="gs-txt-title-x" class="slider-input" min="0" max="100" value="50">
                </div>
                <div class="form-group">
                  <label>Position Y (%)</label>
                  <input type="range" id="gs-txt-title-y" class="slider-input" min="0" max="100" value="45">
                </div>
              </div>
              <div class="form-group">
                <label for="gs-txt-title-font">Font Family</label>
                <select class="form-select" id="gs-txt-title-font">
                  <option value="Outfit">Outfit</option>
                  <option value="Inter">Inter</option>
                  <option value="monospace">Monospace</option>
                  <option value="sans-serif">System Sans</option>
                </select>
              </div>
            </div>

            <div>
              <div class="form-group">
                <label for="gs-txt-sub">Subtitle Text</label>
                <input type="text" id="gs-txt-sub" class="form-input" value="100% Client-Side Graphics Designer">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Font Size</label>
                  <input type="range" id="gs-txt-sub-size" class="slider-input" min="10" max="80" value="24">
                </div>
                <div class="form-group">
                  <label>Color</label>
                  <input type="color" id="gs-txt-sub-color" value="#ffffff" style="border: none; background: none; width: 100%; height: 38px; cursor: pointer;">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Position X (%)</label>
                  <input type="range" id="gs-txt-sub-x" class="slider-input" min="0" max="100" value="50">
                </div>
                <div class="form-group">
                  <label>Position Y (%)</label>
                  <input type="range" id="gs-txt-sub-y" class="slider-input" min="0" max="100" value="60">
                </div>
              </div>
              <div class="form-group">
                <label for="gs-txt-sub-font">Font Family</label>
                <select class="form-select" id="gs-txt-sub-font">
                  <option value="Inter">Inter</option>
                  <option value="Outfit">Outfit</option>
                  <option value="monospace">Monospace</option>
                  <option value="sans-serif">System Sans</option>
                </select>
              </div>
            </div>

            <div style="border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 12px;">
              <div class="form-group" style="flex-direction: row; align-items: center; gap: 8px;">
                <input type="checkbox" id="gs-opt-card" checked style="width: 16px; height: 16px; cursor: pointer;">
                <label for="gs-opt-card" style="margin: 0; cursor: pointer; user-select: none;">Overlay Glass Card Panel</label>
              </div>
              <div class="form-group" style="flex-direction: row; align-items: center; gap: 8px;">
                <input type="checkbox" id="gs-opt-border" checked style="width: 16px; height: 16px; cursor: pointer;">
                <label for="gs-opt-border" style="margin: 0; cursor: pointer; user-select: none;">Add Graphic Accent Border</label>
              </div>
            </div>

            <!-- Branding / Author Tag Overlay -->
            <div style="border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 12px;">
              <div class="form-group">
                <label for="gs-txt-brand">Branding / Author Tag</label>
                <input type="text" id="gs-txt-brand" class="form-input" value="@omnitool.hub">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Size</label>
                  <input type="range" id="gs-txt-brand-size" class="slider-input" min="10" max="60" value="16">
                </div>
                <div class="form-group">
                  <label>Color</label>
                  <input type="color" id="gs-txt-brand-color" value="#a3e635" style="border: none; background: none; width: 100%; height: 38px; cursor: pointer;">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Position X (%)</label>
                  <input type="range" id="gs-txt-brand-x" class="slider-input" min="0" max="100" value="50">
                </div>
                <div class="form-group">
                  <label>Position Y (%)</label>
                  <input type="range" id="gs-txt-brand-y" class="slider-input" min="0" max="100" value="72">
                </div>
              </div>
            </div>

            <!-- Custom Logo / Avatar Overlay -->
            <div style="border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: 12px;">
              <div class="form-group" style="flex-direction: row; align-items: center; gap: 8px;">
                <input type="checkbox" id="gs-opt-logo" style="width: 16px; height: 16px; cursor: pointer;">
                <label for="gs-opt-logo" style="margin: 0; cursor: pointer; user-select: none;">Overlay Profile / Logo Image</label>
              </div>
              <div id="gs-logo-controls" style="display: none; margin-top: 8px;">
                <div class="form-group">
                  <label for="gs-logo-input">Choose Logo/Avatar File</label>
                  <div style="display: flex; gap: 8px;">
                    <input type="file" id="gs-logo-input" class="form-input" accept="image/*" style="flex: 1;">
                    <button class="tool-btn secondary" id="gs-btn-clear-logo" title="Clear logo image" style="display: none; white-space: nowrap; height: 38px;">Clear Logo</button>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Logo Size (px)</label>
                    <input type="range" id="gs-logo-size" class="slider-input" min="20" max="250" value="100">
                  </div>
                  <div class="form-group" style="flex-direction: row; align-items: center; gap: 8px; justify-content: center; margin-top: 18px;">
                    <input type="checkbox" id="gs-logo-round" checked style="width: 16px; height: 16px; cursor: pointer;">
                    <label for="gs-logo-round" style="margin: 0; cursor: pointer; user-select: none;">Circular Clip</label>
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label>Logo Position X (%)</label>
                    <input type="range" id="gs-logo-x" class="slider-input" min="0" max="100" value="15">
                  </div>
                  <div class="form-group">
                    <label>Logo Position Y (%)</label>
                    <input type="range" id="gs-logo-y" class="slider-input" min="0" max="100" value="50">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div class="gs-panel-section" id="gs-sec-filters" style="display: none;">
            <div class="form-group">
              <label>Blur: <span id="gs-flt-blur-val">0px</span></label>
              <input type="range" id="gs-flt-blur" class="slider-input" min="0" max="20" value="0">
            </div>
            <div class="form-group">
              <label>Brightness: <span id="gs-flt-bright-val">100%</span></label>
              <input type="range" id="gs-flt-bright" class="slider-input" min="50" max="150" value="100">
            </div>
            <div class="form-group">
              <label>Contrast: <span id="gs-flt-contrast-val">100%</span></label>
              <input type="range" id="gs-flt-contrast" class="slider-input" min="50" max="150" value="100">
            </div>
            <div class="form-group">
              <label>Grayscale: <span id="gs-flt-gray-val">0%</span></label>
              <input type="range" id="gs-flt-gray" class="slider-input" min="0" max="100" value="0">
            </div>
            <div class="form-group">
              <label>Sepia: <span id="gs-flt-sepia-val">0%</span></label>
              <input type="range" id="gs-flt-sepia" class="slider-input" min="0" max="100" value="0">
            </div>
            <div class="form-group">
              <label>Hue Rotate: <span id="gs-flt-hue-val">0deg</span></label>
              <input type="range" id="gs-flt-hue" class="slider-input" min="0" max="360" value="0">
            </div>
          </div>
        </div>

        <!-- Preview Screen -->
        <div class="tool-panel" id="gs-preview-panel">
          <div class="panel-header">
            <h3>Studio Canvas</h3>
          </div>
          <div style="flex: 1; display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.4); border-radius: 12px; padding: 16px; border: 1px solid var(--border-color); min-height: 250px; position: relative;">
            <div id="gs-canvas-wrapper" style="width: 100%; max-width: 100%; display: flex; align-items: center; justify-content: center;">
              <canvas id="gs-canvas" style="max-width: 100%; max-height: 50vh; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); object-fit: contain; background: #000;"></canvas>
            </div>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;">
            <button class="tool-btn accent-emerald" id="gs-btn-download" style="flex: 1; min-width: 120px;">
              <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 6px; fill: none; stroke: currentColor;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download PNG
            </button>
            <button class="tool-btn accent-cyan" id="gs-btn-clipboard" style="flex: 1; min-width: 120px;">
              <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 6px; fill: none; stroke: currentColor;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy to Clipboard
            </button>
            <button class="tool-btn secondary" id="gs-btn-clear" style="flex: 1; min-width: 120px;" title="Reset Studio to Defaults">
              <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 6px; fill: none; stroke: currentColor;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              Reset Studio
            </button>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="gs-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Background Style</strong>: Configure dimensions, background gradients, webcam frames, or screen share captures.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Text & Branding</strong>: Add overlay text fields (Main Title, Subtitle, Author tag, custom Logo uploads) with customized coordinates.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Apply Filters</strong>: Apply vintage filter settings (Sepia, Hue-rotate, Blur) to backgrounds before exporting or copying PNG files.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  async init(container, appInstance) {
    app = appInstance;
    gsCanvas = container.querySelector("#gs-canvas");
    gsCtx = gsCanvas ? gsCanvas.getContext("2d") : null;
    gsPreset = container.querySelector("#gs-canvas-preset");
    gsCustomDims = container.querySelector("#gs-custom-dims");
    gsWidthInput = container.querySelector("#gs-width");
    gsHeightInput = container.querySelector("#gs-height");
    gsBgType = container.querySelector("#gs-bg-type");
    gsFileInput = container.querySelector("#gs-file-input");

    gsBgImage = null;
    gsLogoImage = null;
    gsCameraStream = null;

    // Tabs navigation
    const gsTabs = {
      "gs-tab-source": "gs-sec-source",
      "gs-tab-text": "gs-sec-text",
      "gs-tab-filters": "gs-sec-filters"
    };

    Object.keys(gsTabs).forEach(tabId => {
      const btn = container.querySelector("#" + tabId);
      btn?.addEventListener("click", () => {
        Object.keys(gsTabs).forEach(t => {
          container.querySelector("#" + t)?.classList.remove("active");
          const sec = container.querySelector("#" + gsTabs[t]);
          if (sec) sec.style.display = "none";
        });
        btn.classList.add("active");
        const activeSec = container.querySelector("#" + gsTabs[tabId]);
        if (activeSec) activeSec.style.display = "block";
      });
    });

    const updateCanvasDimensions = () => {
      if (!gsCanvas || !gsPreset) return;
      const presetVal = gsPreset.value;
      
      if (presetVal === "custom") {
        if (gsCustomDims) gsCustomDims.style.display = "flex";
        gsCanvas.width = parseInt(gsWidthInput?.value || 1280, 10);
        gsCanvas.height = parseInt(gsHeightInput?.value || 720, 10);
      } else {
        if (gsCustomDims) gsCustomDims.style.display = "none";
        const dim = gsPresets[presetVal] || { w: 1280, h: 720 };
        gsCanvas.width = dim.w;
        gsCanvas.height = dim.h;
      }
      redrawGraphicsCanvas();
    };

    gsPreset?.addEventListener("change", updateCanvasDimensions);
    gsWidthInput?.addEventListener("input", updateCanvasDimensions);
    gsHeightInput?.addEventListener("input", updateCanvasDimensions);

    // Background Source options hide/show
    const gsBgOptions = ["gradient", "upload", "screenshot", "camera"];
    gsBgType?.addEventListener("change", () => {
      const activeOpt = gsBgType.value;
      gsBgOptions.forEach(opt => {
        const el = container.querySelector(`#gs-bg-opt-${opt}`);
        if (el) el.style.display = opt === activeOpt ? "block" : "none";
      });
      
      // Stop camera if navigating away from camera source
      if (activeOpt !== "camera" && gsCameraStream) {
        stopCameraStream();
      }
      redrawGraphicsCanvas();
    });

    // Local File Upload
    gsFileInput?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            gsBgImage = img;
            redrawGraphicsCanvas();
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Logo Overlay File Upload
    container.querySelector("#gs-logo-input")?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            gsLogoImage = img;
            redrawGraphicsCanvas();
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Logo overlay toggle block show/hide
    container.querySelector("#gs-opt-logo")?.addEventListener("change", (e) => {
      const ctrl = container.querySelector("#gs-logo-controls");
      if (ctrl) ctrl.style.display = e.target.checked ? "block" : "none";
      redrawGraphicsCanvas();
    });

    // Screen Capture (Screenshot Studio)
    container.querySelector("#gs-btn-screenshot")?.addEventListener("click", async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: "browser" } });
        const video = document.createElement("video");
        video.srcObject = mediaStream;
        video.autoplay = true;
        video.onloadedmetadata = () => {
          // Create canvas frame grabber
          setTimeout(() => {
            const captureCanvas = document.createElement("canvas");
            captureCanvas.width = video.videoWidth;
            captureCanvas.height = video.videoHeight;
            const ctx = captureCanvas.getContext("2d");
            ctx.drawImage(video, 0, 0, captureCanvas.width, captureCanvas.height);
            
            const img = new Image();
            img.onload = () => {
              gsBgImage = img;
              redrawGraphicsCanvas();
              app.showToast("Captured screen frame successfully", "success");
            };
            img.src = captureCanvas.toDataURL("image/png");
            
            // Stop media stream tracks to shut down screen share prompt
            mediaStream.getTracks().forEach(track => track.stop());
          }, 500); // Small delay to let the window draw
        };
      } catch (e) {
        console.error(e);
        app.showToast("Screen capture cancelled or blocked", "error");
      }
    });

    // Webcam stream handlers
    const startCameraStream = async () => {
      try {
        gsCameraStream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
        const videoEl = container.querySelector("#gs-camera-video");
        if (videoEl) {
          videoEl.srcObject = gsCameraStream;
        }
        const previewContainer = container.querySelector("#gs-camera-preview-container");
        if (previewContainer) previewContainer.style.display = "block";
        
        const toggleBtn = container.querySelector("#gs-btn-camera-toggle");
        if (toggleBtn) {
          toggleBtn.innerText = "Stop Camera";
          toggleBtn.classList.replace("secondary", "primary");
        }
        
        const snapBtn = container.querySelector("#gs-btn-camera-snap");
        if (snapBtn) snapBtn.disabled = false;
        
        app.showToast("Webcam stream started", "info");
      } catch (e) {
        console.error(e);
        app.showToast("Failed to access webcam camera", "error");
      }
    };

    const stopCameraStream = () => {
      if (gsCameraStream) {
        gsCameraStream.getTracks().forEach(track => track.stop());
        gsCameraStream = null;
      }
      const videoEl = container.querySelector("#gs-camera-video");
      if (videoEl) videoEl.srcObject = null;
      
      const previewContainer = container.querySelector("#gs-camera-preview-container");
      if (previewContainer) previewContainer.style.display = "none";
      
      const toggleBtn = container.querySelector("#gs-btn-camera-toggle");
      if (toggleBtn) {
        toggleBtn.innerText = "Start Camera";
        toggleBtn.classList.replace("primary", "secondary");
      }
      
      const snapBtn = container.querySelector("#gs-btn-camera-snap");
      if (snapBtn) snapBtn.disabled = true;
    };

    container.querySelector("#gs-btn-camera-toggle")?.addEventListener("click", () => {
      if (gsCameraStream) {
        stopCameraStream();
      } else {
        startCameraStream();
      }
    });

    container.querySelector("#gs-btn-camera-snap")?.addEventListener("click", () => {
      const videoEl = container.querySelector("#gs-camera-video");
      if (videoEl && gsCameraStream) {
        const captureCanvas = document.createElement("canvas");
        captureCanvas.width = videoEl.videoWidth || 640;
        captureCanvas.height = videoEl.videoHeight || 480;
        const ctx = captureCanvas.getContext("2d");
        
        // Draw video frame (mirror image option for standard front cams)
        ctx.translate(captureCanvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoEl, 0, 0, captureCanvas.width, captureCanvas.height);
        
        const img = new Image();
        img.onload = () => {
          gsBgImage = img;
          redrawGraphicsCanvas();
          app.showToast("Captured camera snapshot!", "success");
        };
        img.src = captureCanvas.toDataURL("image/png");
        
        stopCameraStream();
      }
    });

    const renderGSPresets = () => {
      const box = container.querySelector("#gs-presets-box");
      if (!box) return;
      box.innerHTML = "";
      
      gsStylePresets.forEach(preset => {
        const btn = document.createElement("button");
        btn.className = "gs-preset-btn";
        btn.innerText = preset.name;
        btn.type = "button";
        
        btn.addEventListener("click", () => {
          if (gsBgType) gsBgType.value = preset.bgType;
          
          const setVal = (id, val) => {
            const el = container.querySelector("#" + id);
            if (el) el.value = val;
          };
          const setChecked = (id, val) => {
            const el = container.querySelector("#" + id);
            if (el) el.checked = val;
          };
          
          setVal("gs-col-1", preset.col1);
          setVal("gs-col-2", preset.col2);
          setVal("gs-grad-angle", preset.angle);
          
          setVal("gs-txt-title", preset.titleVal);
          setVal("gs-txt-title-size", preset.titleSize);
          setVal("gs-txt-title-color", preset.titleColor);
          setVal("gs-txt-title-font", preset.titleFont);
          setVal("gs-txt-title-x", preset.titleX);
          setVal("gs-txt-title-y", preset.titleY);
          
          setVal("gs-txt-sub", preset.subVal);
          setVal("gs-txt-sub-size", preset.subSize);
          setVal("gs-txt-sub-color", preset.subColor);
          setVal("gs-txt-sub-font", preset.subFont);
          setVal("gs-txt-sub-x", preset.subX);
          setVal("gs-txt-sub-y", preset.subY);

          setVal("gs-txt-brand", preset.brandVal);
          setVal("gs-txt-brand-size", preset.brandSize);
          setVal("gs-txt-brand-color", preset.brandColor);
          setVal("gs-txt-brand-x", preset.brandX);
          setVal("gs-txt-brand-y", preset.brandY);
          
          setChecked("gs-opt-card", preset.card);
          setChecked("gs-opt-border", preset.border);
          
          setVal("gs-flt-blur", preset.blur);
          setVal("gs-flt-bright", preset.bright);
          setVal("gs-flt-contrast", preset.contrast);
          setVal("gs-flt-gray", preset.gray);
          setVal("gs-flt-sepia", preset.sepia);
          setVal("gs-flt-hue", preset.hue);
          
          if (gsBgType) gsBgType.dispatchEvent(new Event("change"));
          redrawGraphicsCanvas();
          app.showToast(`Applied "${preset.name}" template`, "success");
        });
        box.appendChild(btn);
      });
    };

    // Canvas drawing routine
    const redrawGraphicsCanvas = () => {
      if (!gsCanvas || !gsCtx) return;
      
      const w = gsCanvas.width;
      const h = gsCanvas.height;
      
      // Toggle the display of individual clear image buttons reactively
      const clearBgBtn = container.querySelector("#gs-btn-clear-bg");
      if (clearBgBtn) {
        clearBgBtn.style.display = gsBgImage ? "block" : "none";
      }
      const clearLogoBtn = container.querySelector("#gs-btn-clear-logo");
      if (clearLogoBtn) {
        clearLogoBtn.style.display = gsLogoImage ? "block" : "none";
      }
      
      // 1. Clear Canvas
      gsCtx.clearRect(0, 0, w, h);
      
      // Save state for filtering background only
      gsCtx.save();
      
      // Defensive element readers
      const getVal = (id, fallback = "") => container.querySelector("#" + id)?.value ?? fallback;
      const getNum = (id, fallback = 0) => {
        const val = parseFloat(getVal(id));
        return isNaN(val) ? fallback : val;
      };
      const getBool = (id, fallback = false) => container.querySelector("#" + id)?.checked ?? fallback;
      const setLabel = (id, text) => {
        const el = container.querySelector("#" + id);
        if (el) el.innerText = text;
      };
      
      // Get filter settings
      const blur = getNum("gs-flt-blur", 0);
      const bright = getNum("gs-flt-bright", 100);
      const contrast = getNum("gs-flt-contrast", 100);
      const grayscale = getNum("gs-flt-gray", 0);
      const sepia = getNum("gs-flt-sepia", 0);
      const hue = getNum("gs-flt-hue", 0);
      
      // Update label text values
      setLabel("gs-flt-blur-val", `${blur}px`);
      setLabel("gs-flt-bright-val", `${bright}%`);
      setLabel("gs-flt-contrast-val", `${contrast}%`);
      setLabel("gs-flt-gray-val", `${grayscale}%`);
      setLabel("gs-flt-sepia-val", `${sepia}%`);
      setLabel("gs-flt-hue-val", `${hue}deg`);

      // Set context filter for background drawing
      gsCtx.filter = `blur(${blur}px) brightness(${bright}%) contrast(${contrast}%) grayscale(${grayscale}%) sepia(${sepia}%) hue-rotate(${hue}deg)`;

      const type = gsBgType?.value || "gradient";
      if (type === "gradient") {
        // Draw linear gradient
        const col1 = getVal("gs-col-1", "#0f172a");
        const col2 = getVal("gs-col-2", "#1e1b4b");
        const angle = getNum("gs-grad-angle", 135);
        setLabel("gs-grad-angle-val", `${angle}°`);
        
        // Calculate angle endpoints in canvas space
        const angleRad = (angle * Math.PI) / 180;
        const r = Math.sqrt(w*w + h*h) / 2;
        const cx = w / 2;
        const cy = h / 2;
        const x1 = cx - Math.cos(angleRad) * r;
        const y1 = cy - Math.sin(angleRad) * r;
        const x2 = cx + Math.cos(angleRad) * r;
        const y2 = cy + Math.sin(angleRad) * r;

        const grad = gsCtx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, col1);
        grad.addColorStop(1, col2);
        gsCtx.fillStyle = grad;
        gsCtx.fillRect(0, 0, w, h);
      } else {
        // Draw background image
        if (gsBgImage) {
          // Draw image cover (scale to fill keeping aspect ratio)
          const canvasRatio = w / h;
          const imgRatio = gsBgImage.width / gsBgImage.height;
          let sx, sy, sWidth, sHeight;
          
          if (imgRatio > canvasRatio) {
            sHeight = gsBgImage.height;
            sWidth = sHeight * canvasRatio;
            sx = (gsBgImage.width - sWidth) / 2;
            sy = 0;
          } else {
            sWidth = gsBgImage.width;
            sHeight = sWidth / canvasRatio;
            sx = 0;
            sy = (gsBgImage.height - sHeight) / 2;
          }
          gsCtx.drawImage(gsBgImage, sx, sy, sWidth, sHeight, 0, 0, w, h);
        } else {
          // Placeholder
          gsCtx.fillStyle = "#1e293b";
          gsCtx.fillRect(0, 0, w, h);
          
          gsCtx.font = "bold 24px Inter, sans-serif";
          gsCtx.fillStyle = "#64748b";
          gsCtx.textAlign = "center";
          gsCtx.fillText("Upload image / Capture frame", w / 2, h / 2);
        }
      }
      
      // Restore state (removes CSS filters for overlay cards & text)
      gsCtx.restore();

      // 2. Draw Decorative Glass Card Panel
      const showCard = getBool("gs-opt-card", false);
      if (showCard) {
        // Draw a sleek card frame in the center
        const cardW = w * 0.8;
        const cardH = h * 0.7;
        const cardX = (w - cardW) / 2;
        const cardY = (h - cardH) / 2;
        const radius = 16;
        
        gsCtx.save();
        // Card solid overlay
        gsCtx.fillStyle = "rgba(15, 23, 42, 0.45)";
        gsCtx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        gsCtx.lineWidth = 1.5;
        
        gsCtx.beginPath();
        gsCtx.roundRect ? gsCtx.roundRect(cardX, cardY, cardW, cardH, radius) : gsCtx.rect(cardX, cardY, cardW, cardH);
        gsCtx.fill();
        gsCtx.stroke();
        gsCtx.restore();
      }

      // 3. Draw Graphic Accent Border
      const showBorder = getBool("gs-opt-border", false);
      if (showBorder) {
        const pad = 12;
        const borderCol = getVal("gs-txt-title-color", "#00f2fe");
        gsCtx.save();
        gsCtx.strokeStyle = borderCol;
        gsCtx.lineWidth = 4;
        gsCtx.strokeRect(pad, pad, w - pad*2, h - pad*2);
        gsCtx.restore();
      }

      // 4. Render Logo / Avatar Overlay (Drawn below text so it stays behind if overlapping)
      const showLogo = getBool("gs-opt-logo", false);
      if (showLogo && gsLogoImage) {
        const logoSize = getNum("gs-logo-size", 100);
        const isRound = getBool("gs-logo-round", true);
        const logoPctX = getNum("gs-logo-x", 15);
        const logoPctY = getNum("gs-logo-y", 50);
        
        const lx = (logoPctX / 100) * w;
        const ly = (logoPctY / 100) * h;
        
        gsCtx.save();
        gsCtx.shadowColor = "rgba(0, 0, 0, 0.4)";
        gsCtx.shadowBlur = 8;
        gsCtx.shadowOffsetX = 2;
        gsCtx.shadowOffsetY = 2;

        if (isRound) {
          gsCtx.beginPath();
          gsCtx.arc(lx, ly, logoSize / 2, 0, Math.PI * 2);
          gsCtx.closePath();
          gsCtx.clip();
          
          gsCtx.drawImage(gsLogoImage, lx - logoSize / 2, ly - logoSize / 2, logoSize, logoSize);
          
          // Add subtle circle outline
          gsCtx.strokeStyle = "rgba(255, 255, 255, 0.3)";
          gsCtx.lineWidth = 2;
          gsCtx.stroke();
        } else {
          gsCtx.drawImage(gsLogoImage, lx - logoSize / 2, ly - logoSize / 2, logoSize, logoSize);
        }
        gsCtx.restore();
      }

      // 5. Render Main Title Overlay
      const titleVal = getVal("gs-txt-title", "Masterpiece Hub");
      const titleSize = getNum("gs-txt-title-size", 50);
      const titleColor = getVal("gs-txt-title-color", "#00f2fe");
      const titleFont = getVal("gs-txt-title-font", "Outfit");
      const titlePctX = getNum("gs-txt-title-x", 50);
      const titlePctY = getNum("gs-txt-title-y", 45);

      gsCtx.save();
      // Drop shadow
      gsCtx.shadowColor = "rgba(0, 0, 0, 0.8)";
      gsCtx.shadowBlur = 10;
      gsCtx.shadowOffsetX = 3;
      gsCtx.shadowOffsetY = 3;

      gsCtx.font = `bold ${titleSize}px ${titleFont}, sans-serif`;
      gsCtx.fillStyle = titleColor;
      gsCtx.textAlign = "center";
      gsCtx.textBaseline = "middle";
      gsCtx.fillText(titleVal, (titlePctX / 100) * w, (titlePctY / 100) * h);
      gsCtx.restore();

      // 6. Render Subtitle Overlay
      const subVal = getVal("gs-txt-sub", "");
      const subSize = getNum("gs-txt-sub-size", 24);
      const subColor = getVal("gs-txt-sub-color", "#ffffff");
      const subFont = getVal("gs-txt-sub-font", "Inter");
      const subPctX = getNum("gs-txt-sub-x", 50);
      const subPctY = getNum("gs-txt-sub-y", 60);

      gsCtx.save();
      gsCtx.shadowColor = "rgba(0, 0, 0, 0.8)";
      gsCtx.shadowBlur = 8;
      gsCtx.shadowOffsetX = 2;
      gsCtx.shadowOffsetY = 2;

      gsCtx.font = `500 ${subSize}px ${subFont}, sans-serif`;
      gsCtx.fillStyle = subColor;
      gsCtx.textAlign = "center";
      gsCtx.textBaseline = "middle";
      gsCtx.fillText(subVal, (subPctX / 100) * w, (subPctY / 100) * h);
      gsCtx.restore();

      // 7. Render Branding / Author Tag Overlay
      const brandVal = getVal("gs-txt-brand", "");
      const brandSize = getNum("gs-txt-brand-size", 16);
      const brandColor = getVal("gs-txt-brand-color", "#a3e635");
      const brandPctX = getNum("gs-txt-brand-x", 50);
      const brandPctY = getNum("gs-txt-brand-y", 72);

      if (brandVal) {
        gsCtx.save();
        gsCtx.shadowColor = "rgba(0, 0, 0, 0.6)";
        gsCtx.shadowBlur = 6;
        gsCtx.shadowOffsetX = 1;
        gsCtx.shadowOffsetY = 1;

        gsCtx.font = `bold ${brandSize}px monospace`;
        gsCtx.fillStyle = brandColor;
        gsCtx.textAlign = "center";
        gsCtx.textBaseline = "middle";
        gsCtx.fillText(brandVal, (brandPctX / 100) * w, (brandPctY / 100) * h);
        gsCtx.restore();
      }
    };

    // Bind live listeners on all inputs
    const gsInputs = [
      "gs-col-1", "gs-col-2", "gs-grad-angle",
      "gs-txt-title", "gs-txt-title-size", "gs-txt-title-color", "gs-txt-title-font", "gs-txt-title-x", "gs-txt-title-y",
      "gs-txt-sub", "gs-txt-sub-size", "gs-txt-sub-color", "gs-txt-sub-font", "gs-txt-sub-x", "gs-txt-sub-y",
      "gs-txt-brand", "gs-txt-brand-size", "gs-txt-brand-color", "gs-txt-brand-x", "gs-txt-brand-y",
      "gs-opt-card", "gs-opt-border", "gs-opt-logo", "gs-logo-size", "gs-logo-round", "gs-logo-x", "gs-logo-y",
      "gs-flt-blur", "gs-flt-bright", "gs-flt-contrast", "gs-flt-gray", "gs-flt-sepia", "gs-flt-hue"
    ];

    gsInputs.forEach(id => {
      const el = container.querySelector("#" + id);
      if (el) {
        el.addEventListener("input", redrawGraphicsCanvas);
        el.addEventListener("change", redrawGraphicsCanvas);
      }
    });

    // Download Action
    container.querySelector("#gs-btn-download")?.addEventListener("click", () => {
      if (!gsCanvas) return;
      const link = document.createElement("a");
      link.download = `graphics-${Date.now()}.png`;
      link.href = gsCanvas.toDataURL("image/png");
      link.click();
      app.showToast("Downloaded graphic PNG file", "success");
    });

    // Clipboard copy action
    container.querySelector("#gs-btn-clipboard")?.addEventListener("click", () => {
      if (!gsCanvas) return;
      try {
        gsCanvas.toBlob(async (blob) => {
          if (blob) {
            try {
              const item = new ClipboardItem({ "image/png": blob });
              await navigator.clipboard.write([item]);
              app.showToast("Copied graphic to clipboard!", "success");
            } catch (err) {
              console.error(err);
              app.showToast("Browser block: copying image not permitted", "error");
            }
          }
        }, "image/png");
      } catch (e) {
        console.error(e);
        app.showToast("Copy error: Canvas could be tainted by uploaded assets", "error");
      }
    });

    // Clear / Reset Action
    const clearGraphicsStudio = () => {
      gsBgImage = null;
      gsLogoImage = null;
      stopCameraStream();
      
      const defaults = {
        "gs-canvas-preset": "youtube",
        "gs-bg-type": "gradient",
        "gs-col-1": "#0f172a",
        "gs-col-2": "#1e1b4b",
        "gs-grad-angle": "135",
        "gs-txt-title": "Masterpiece Hub",
        "gs-txt-title-size": "50",
        "gs-txt-title-color": "#00f2fe",
        "gs-txt-title-font": "Outfit",
        "gs-txt-title-x": "50",
        "gs-txt-title-y": "45",
        "gs-txt-sub": "100% Client-Side Graphics Designer",
        "gs-txt-sub-size": "24",
        "gs-txt-sub-color": "#ffffff",
        "gs-txt-sub-font": "Inter",
        "gs-txt-sub-x": "50",
        "gs-txt-sub-y": "60",
        "gs-opt-card": true,
        "gs-opt-border": true,
        "gs-txt-brand": "@omnitool.hub",
        "gs-txt-brand-size": "16",
        "gs-txt-brand-color": "#a3e635",
        "gs-txt-brand-x": "50",
        "gs-txt-brand-y": "72",
        "gs-opt-logo": false,
        "gs-logo-size": "100",
        "gs-logo-round": true,
        "gs-logo-x": "15",
        "gs-logo-y": "50",
        "gs-flt-blur": "0",
        "gs-flt-bright": "100",
        "gs-flt-contrast": "100",
        "gs-flt-gray": "0",
        "gs-flt-sepia": "0",
        "gs-flt-hue": "0",
        "gs-file-input": "",
        "gs-logo-input": ""
      };

      Object.keys(defaults).forEach(id => {
        const el = container.querySelector("#" + id);
        if (el) {
          if (el.type === "checkbox") {
            el.checked = defaults[id];
          } else {
            el.value = defaults[id];
          }
          el.dispatchEvent(new Event("change"));
        }
      });

      const logoCtrl = container.querySelector("#gs-logo-controls");
      if (logoCtrl) logoCtrl.style.display = "none";

      const tabs = {
        "gs-tab-source": "gs-sec-source",
        "gs-tab-text": "gs-sec-text",
        "gs-tab-filters": "gs-sec-filters"
      };
      Object.keys(tabs).forEach(t => {
        const btn = container.querySelector("#" + t);
        const sec = container.querySelector("#" + tabs[t]);
        if (btn) {
          if (t === "gs-tab-source") btn.classList.add("active");
          else btn.classList.remove("active");
        }
        if (sec) {
          if (t === "gs-tab-source") sec.style.display = "block";
          else sec.style.display = "none";
        }
      });

      updateCanvasDimensions();
      redrawGraphicsCanvas();
      app.showToast("Reset Graphics Studio to defaults", "info");
    };

    container.querySelector("#gs-btn-clear")?.addEventListener("click", clearGraphicsStudio);

    // Individual Clear Background Image Action
    container.querySelector("#gs-btn-clear-bg")?.addEventListener("click", () => {
      gsBgImage = null;
      const fileInput = container.querySelector("#gs-file-input");
      if (fileInput) fileInput.value = "";
      redrawGraphicsCanvas();
      app.showToast("Cleared background image", "info");
    });

    // Individual Clear Logo Image Action
    container.querySelector("#gs-btn-clear-logo")?.addEventListener("click", () => {
      gsLogoImage = null;
      const logoInput = container.querySelector("#gs-logo-input");
      if (logoInput) logoInput.value = "";
      redrawGraphicsCanvas();
      app.showToast("Cleared logo overlay image", "info");
    });

    // Setup initial presets and draw canvas
    renderGSPresets();
    
    container.querySelector("#gs-guide-load-sample")?.addEventListener("click", () => {
      const presets = container.querySelectorAll(".gs-preset-btn");
      if (presets.length > 0) {
        presets[0].click();
      }
    });

    updateCanvasDimensions();
  }
};
