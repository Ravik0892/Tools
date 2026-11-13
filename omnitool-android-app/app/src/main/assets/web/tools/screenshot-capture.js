// OmniTool Hub - Screenshot & Browser Screen Capture Studio
// 100% Client-Side screen, tab, and window capture with mockup frames, annotations, and privacy redaction.

import { escapeHtml } from './utils.js';

export default {
  id: "screenshot-capture",
  name: "Screenshot & Browser Screen Capture Studio",

  // State
  app: null,
  container: null,
  masterCanvas: null,
  masterCtx: null,
  sourceImage: null, // Original raw captured or uploaded image
  activeStream: null, // Screen or Camera MediaStream
  countdownTimer: null,
  countdownSecsLeft: 0,
  pendingTextPos: null,
  tesseractLoadingPromise: null,
  pdfLibLoadingPromise: null,
  boundPasteHandler: null,
  boundKeyHandler: null,
  boundPointerMove: null,
  boundPointerUp: null,
  selectedAnnotationIndex: -1,
  isDraggingAnnotation: false,
  dragAnnotationStart: null,
  html2canvasPromise: null,
  stitchImages: [],
  sandboxVisualEdit: false,
  sandboxIsScrollable: true,

  // Mockup & Canvas Configuration
  config: {
    mockupTheme: "macos-dark", // 'macos-dark' | 'macos-light' | 'windows11' | 'cyberpunk' | 'minimal' | 'phone' | 'none'
    urlText: "https://omnitool.worldsneed.com/dashboard",
    titleText: "OmniTool Hub — Cloud-Free Developer Workspace",
    showSslLock: true,
    shadowStyle: "elevated", // 'none' | 'subtle' | 'elevated' | 'glow'
    cornerRadius: 14,
    backdropPadding: 44,
    aspectRatio: "auto", // 'auto' | '16-9' | '1-1' | '4-3' | 'twitter' | 'og' | '9-16'
    backdropType: "gradient", // 'gradient' | 'solid' | 'transparent' | 'frosted'
    backdropGradient: "hyper-cyan", // 'hyper-cyan' | 'cosmic' | 'sunset' | 'cyberpunk' | 'emerald' | 'aurora' | 'midnight' | 'mesh'
    backdropColor: "#0f172a",
    exportScale: 2 // 1x or 2x Retina
  },

  // Annotation & Drawing State
  activeTool: "select", // 'select' | 'crop' | 'pen' | 'blur' | 'blackout' | 'text' | 'step' | 'arrow' | 'rect' | 'circle' | 'highlight' | 'loupe' | 'spotlight' | 'eyedropper'
  currentColor: "#00f2fe",
  strokeWidth: 4,
  nextStepNum: 1,
  annotations: [], // Array of annotation objects
  undoStack: [],
  redoStack: [],
  isDrawing: false,
  dragStart: null,
  currentDragRect: null,
  currentPath: null,
  cropRect: null,

  // Audio synthesis helper (ticks & shutter clicks)
  playAudioBeep(freq = 880, duration = 0.08, type = "sine") {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
      setTimeout(() => { ctx.close().catch(() => {}); }, (duration * 1000) + 100);
    } catch (_) {}
  },

  playShutterSound() {
    try {
      this.playAudioBeep(1200, 0.04, "square");
      setTimeout(() => this.playAudioBeep(600, 0.09, "sine"), 45);
    } catch (_) {}
  },

  renderUI() {
    return `
      <div class="tool-content-layout split-view sc-studio-layout">
        <!-- Studio Controls & Options Sidebar (Left) -->
        <div class="tool-panel sc-controls-sidebar" style="max-height: 85vh; overflow-y: auto; display: flex; flex-direction: column; gap: 14px;">
          
          <div class="panel-header" style="padding-bottom: 8px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0; font-size: 15px; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; color: var(--accent-cyan);">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                Screenshot Studio Pro
              </h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 3px 0 0 0;">Capture, frame, annotate, redact, and OCR 100% locally.</p>
            </div>
            <div id="sc-status-pill" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; background: rgba(0, 242, 254, 0.08); color: var(--accent-cyan); border: 1px solid rgba(0, 242, 254, 0.2);">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: var(--accent-cyan);"></span>
              <span id="sc-status-text">Studio Ready</span>
            </div>
          </div>

          <!-- Studio Navigation Tabs -->
          <div style="display: flex; gap: 4px; background: rgba(255, 255, 255, 0.03); padding: 4px; border-radius: 8px; border: 1px solid var(--border-color);">
            <button class="tool-btn secondary active sc-nav-tab" data-tab="capture" style="flex: 1; font-size: 11px; padding: 6px 4px; justify-content: center;">
              📸 Capture
            </button>
            <button class="tool-btn secondary sc-nav-tab" data-tab="frame" style="flex: 1; font-size: 11px; padding: 6px 4px; justify-content: center;">
              🪟 Mockup
            </button>
            <button class="tool-btn secondary sc-nav-tab" data-tab="backdrop" style="flex: 1; font-size: 11px; padding: 6px 4px; justify-content: center;">
              🎨 Backdrop
            </button>
            <button class="tool-btn secondary sc-nav-tab" data-tab="annotate" style="flex: 1; font-size: 11px; padding: 6px 4px; justify-content: center;">
              ✏️ Markup
            </button>
          </div>

          <!-- TAB 1: CAPTURE & SOURCES -->
          <div id="sc-tab-content-capture" class="sc-tab-pane" style="display: flex; flex-direction: column; gap: 14px;">
            <!-- Primary Live Screen Grab Button -->
            <div style="background: rgba(0, 242, 254, 0.04); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--accent-cyan); letter-spacing: 0.5px;">LIVE SCREEN & TAB SNIP</span>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Countdown Delay
                  <select id="sc-delay-select" class="tool-input" style="padding: 6px 8px; font-size: 12px;">
                    <option value="0" selected>⚡ Instant (0s)</option>
                    <option value="3">⏳ 3 Seconds Delay</option>
                    <option value="5">⏳ 5 Seconds Delay</option>
                    <option value="10">⏳ 10s (For Dropdowns)</option>
                  </select>
                </label>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Resolution Target
                  <select id="sc-res-select" class="tool-input" style="padding: 6px 8px; font-size: 12px;">
                    <option value="native" selected>Native High-DPI</option>
                    <option value="4k">4K Ultra HD (3840p)</option>
                    <option value="1080">1080p FHD</option>
                  </select>
                </label>
              </div>

              <button id="sc-btn-capture-display" class="tool-btn primary" style="width: 100%; justify-content: center; padding: 11px; font-size: 13.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 17px; height: 17px;">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                Snap Window, Screen or Tab
              </button>
              <span style="font-size: 10.5px; color: var(--text-muted); text-align: center;">Click to choose any open browser tab, application window, or full desktop display.</span>
            </div>

            <!-- Alternative Sources (Clipboard, Upload, Camera) -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <button id="sc-btn-clipboard-paste" class="tool-btn secondary" style="justify-content: center; padding: 9px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px;" title="Paste screenshot from clipboard (or press Ctrl+V)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 15px; height: 15px;">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
                Paste (Ctrl+V)
              </button>

              <button id="sc-btn-upload-file" class="tool-btn secondary" style="justify-content: center; padding: 9px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 15px; height: 15px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                Upload File
              </button>
              <input type="file" id="sc-file-input" accept="image/*" style="display: none;">
            </div>

            <button id="sc-btn-webcam" class="tool-btn secondary" style="width: 100%; justify-content: center; padding: 9px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 15px; height: 15px;">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Webcam Snapshot
            </button>

            <!-- Advanced Web & Scrolling Capture Utilities -->
            <div style="background: rgba(0, 242, 254, 0.03); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); letter-spacing: 0.5px;">WEBPAGE &amp; SCROLL SNIPPERS</span>
                <span style="font-size: 10px; color: var(--text-muted);">100% Client-Side</span>
              </div>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                <button id="sc-btn-open-bookmarklet" class="tool-btn secondary" style="font-size: 11px; padding: 7px 6px; justify-content: center; gap: 5px;" title="Snip &amp; edit any live external website">
                  ⚡ Web Snapper
                </button>
                <button id="sc-btn-open-html-sandbox" class="tool-btn secondary" style="font-size: 11px; padding: 7px 6px; justify-content: center; gap: 5px;" title="Render and snip full scrollable HTML sections">
                  🌐 HTML Snip
                </button>
              </div>

              <button id="sc-btn-open-stitcher" class="tool-btn secondary" style="width: 100%; justify-content: center; padding: 8px; font-size: 11.5px; display: inline-flex; align-items: center; gap: 6px;" title="Combine multiple scrolling screenshots into one long image">
                📑 Vertical Scroll Stitcher
              </button>
            </div>

            <!-- Instant Demo Sample Templates (Try Without Permissions) -->
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-main);">TRY SAMPLE SCREENS</span>
                <span style="font-size: 10px; color: var(--text-muted);">1-Click Preview</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                <button class="tool-btn secondary sc-sample-btn" data-sample="analytics" style="font-size: 11px; padding: 6px 8px; justify-content: center;">
                  📊 SaaS Analytics
                </button>
                <button class="tool-btn secondary sc-sample-btn" data-sample="code" style="font-size: 11px; padding: 6px 8px; justify-content: center;">
                  💻 Code Editor
                </button>
                <button class="tool-btn secondary sc-sample-btn" data-sample="landing" style="font-size: 11px; padding: 6px 8px; justify-content: center;">
                  🚀 Hero Page
                </button>
                <button class="tool-btn secondary sc-sample-btn" data-sample="terminal" style="font-size: 11px; padding: 6px 8px; justify-content: center;">
                  ⚡ Terminal CLI
                </button>
              </div>
            </div>

            <!-- Privacy Guarantee Banner -->
            <div style="padding: 10px 12px; border-radius: 8px; background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px; color: #10b981; flex-shrink: 0;">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span><strong>100% Private & Safe:</strong> Screen frames never leave your local device. No telemetry or server uploads.</span>
            </div>
          </div>

          <!-- TAB 2: MOCKUP & WINDOW FRAME -->
          <div id="sc-tab-content-frame" class="sc-tab-pane" style="display: none; flex-direction: column; gap: 14px;">
            <div class="form-group">
              <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Window Frame Theme</label>
              <select id="sc-frame-theme" class="tool-input" style="padding: 7px 10px; font-size: 12px; width: 100%;">
                <option value="macos-dark" selected>🍎 macOS Dark Glass (Traffic Lights)</option>
                <option value="macos-light">🍏 macOS Light Clean</option>
                <option value="windows11">🪟 Windows 11 Mica (Acrylic)</option>
                <option value="cyberpunk">⚡ Cyberpunk Neon Terminal</option>
                <option value="minimal">✨ Minimal Borderless (Clean Shadow)</option>
                <option value="phone">📱 Mobile Smartphone Viewport</option>
                <option value="none">🚫 Raw Image (No Frame)</option>
              </select>
            </div>

            <div class="form-group">
              <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Address Bar URL</label>
              <div style="display: flex; gap: 6px;">
                <input type="text" id="sc-frame-url" class="tool-input" value="https://omnitool.worldsneed.com/dashboard" style="flex: 1; padding: 6px 10px; font-size: 12px;">
                <button id="sc-ssl-toggle" class="tool-btn secondary" style="padding: 6px 10px; font-size: 12px;" title="Toggle SSL Padlock">
                  🔒 SSL
                </button>
              </div>
            </div>

            <div class="form-group">
              <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Window Header Title</label>
              <input type="text" id="sc-frame-title" class="tool-input" value="OmniTool Hub — Cloud-Free Developer Workspace" style="padding: 6px 10px; font-size: 12px; width: 100%;">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="form-group">
                <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Corner Radius (<span id="sc-val-radius">14</span>px)</label>
                <input type="range" id="sc-radius-slider" min="0" max="32" value="14" style="width: 100%; accent-color: var(--accent-cyan);">
              </div>

              <div class="form-group">
                <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Elevation Shadow</label>
                <select id="sc-shadow-select" class="tool-input" style="padding: 6px 8px; font-size: 12px; width: 100%;">
                  <option value="elevated" selected>Elevated 3D</option>
                  <option value="subtle">Subtle Soft</option>
                  <option value="glow">Neon Cyber Glow</option>
                  <option value="none">Flat / No Shadow</option>
                </select>
              </div>
            </div>
          </div>

          <!-- TAB 3: BACKDROP & CANVAS -->
          <div id="sc-tab-content-backdrop" class="sc-tab-pane" style="display: none; flex-direction: column; gap: 14px;">
            <div class="form-group">
              <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Backdrop Style</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                <button class="tool-btn secondary active sc-bg-type-btn" data-type="gradient" style="font-size: 11px; padding: 6px; justify-content: center;">🌈 Gradient</button>
                <button class="tool-btn secondary sc-bg-type-btn" data-type="frosted" style="font-size: 11px; padding: 6px; justify-content: center;" title="Luxury blurred ambient wallpaper of your screenshot">🪟 Wallpaper Blur</button>
                <button class="tool-btn secondary sc-bg-type-btn" data-type="solid" style="font-size: 11px; padding: 6px; justify-content: center;">⬛ Solid Color</button>
                <button class="tool-btn secondary sc-bg-type-btn" data-type="transparent" style="font-size: 11px; padding: 6px; justify-content: center;">🏁 Transparent</button>
              </div>
            </div>

            <!-- Gradient Presets -->
            <div id="sc-gradient-presets-container" style="display: flex; flex-direction: column; gap: 6px;">
              <span style="font-size: 11px; color: var(--text-muted);">Gradient Theme</span>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px;">
                <button class="sc-grad-thumb active" data-grad="hyper-cyan" style="height: 34px; border-radius: 6px; border: 2px solid var(--accent-cyan); background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%); cursor: pointer;" title="Hyper Cyan"></button>
                <button class="sc-grad-thumb" data-grad="cosmic" style="height: 34px; border-radius: 6px; border: 2px solid transparent; background: linear-gradient(135deg, #7928ca 0%, #ff0080 100%); cursor: pointer;" title="Cosmic Purple"></button>
                <button class="sc-grad-thumb" data-grad="sunset" style="height: 34px; border-radius: 6px; border: 2px solid transparent; background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); cursor: pointer;" title="Sunset Glow"></button>
                <button class="sc-grad-thumb" data-grad="cyberpunk" style="height: 34px; border-radius: 6px; border: 2px solid transparent; background: linear-gradient(135deg, #090d16 0%, #1e1b4b 100%); cursor: pointer;" title="Cyberpunk Dark"></button>
                <button class="sc-grad-thumb" data-grad="emerald" style="height: 34px; border-radius: 6px; border: 2px solid transparent; background: linear-gradient(135deg, #059669 0%, #10b981 100%); cursor: pointer;" title="Emerald"></button>
                <button class="sc-grad-thumb" data-grad="aurora" style="height: 34px; border-radius: 6px; border: 2px solid transparent; background: linear-gradient(135deg, #00f2fe 0%, #10b981 100%); cursor: pointer;" title="Aurora"></button>
                <button class="sc-grad-thumb" data-grad="midnight" style="height: 34px; border-radius: 6px; border: 2px solid transparent; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); cursor: pointer;" title="Midnight"></button>
                <button class="sc-grad-thumb" data-grad="mesh" style="height: 34px; border-radius: 6px; border: 2px solid transparent; background: radial-gradient(at 0% 0%, #4facfe 0px, transparent 50%), radial-gradient(at 100% 100%, #00f2fe 0px, #090d16 100%); cursor: pointer;" title="Mesh Radial"></button>
              </div>
            </div>

            <div id="sc-solid-color-container" style="display: none;">
              <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Solid Canvas Color</label>
              <input type="color" id="sc-solid-color-input" value="#0f172a" style="width: 100%; height: 38px; border-radius: 6px; cursor: pointer; border: 1px solid var(--border-color); background: none;">
            </div>

            <div class="form-group">
              <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Outer Canvas Padding (<span id="sc-val-padding">44</span>px)</label>
              <input type="range" id="sc-padding-slider" min="0" max="140" value="44" style="width: 100%; accent-color: var(--accent-cyan);">
            </div>

            <div class="form-group">
              <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Aspect Ratio Frame</label>
              <select id="sc-aspect-ratio" class="tool-input" style="padding: 7px 10px; font-size: 12px; width: 100%;">
                <option value="auto" selected>📐 Auto (Fit to Screenshot)</option>
                <option value="16-9">📺 16:9 Landscape (YouTube / Presentations)</option>
                <option value="1-1">⏹️ 1:1 Square (Instagram / Avatars)</option>
                <option value="twitter">🐦 1200 × 675 (Twitter / X Header & Post)</option>
                <option value="og">🌐 1200 × 630 (OpenGraph / LinkedIn / Social)</option>
                <option value="4-3">📊 4:3 Presentation Classic</option>
                <option value="9-16">📱 9:16 Vertical Story</option>
              </select>
            </div>
          </div>

          <!-- TAB 4: MARKUP & ANNOTATION -->
          <div id="sc-tab-content-annotate" class="sc-tab-pane" style="display: none; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 8px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-main); letter-spacing: 0.5px;">ACTIVE MARKUP TOOL</span>
              
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
                <button class="tool-btn secondary sc-tool-btn active" data-tool="select" title="Selection & Move (V)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  👆 Select
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="crop" title="Interactive Crop & Trim (C)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  ✂️ Crop
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="pen" title="Freehand Pen / Scribble (P)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  ✏️ Freehand
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="blur" title="Pixelate & Blur Sensitive Data (R)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  ⬛ Pixelate
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="blackout" title="Solid Opaque Blackout Privacy Bar (K)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  🛡️ Blackout
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="text" title="Text Callout Label (T)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  💬 Text
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="step" title="Numbered Step Callouts 1, 2, 3... (S)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  🎯 Step Badge
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="arrow" title="Directional Target Arrow (A)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  ➡️ Arrow
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="rect" title="Bounding Box (B)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  🔲 Box
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="highlight" title="Semi-Transparent Highlighter (H)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  🖍️ Highlight
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="circle" title="Focus Circle (O)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  ⭕ Circle
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="loupe" title="2x Zoom Magnifier Loupe (L)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  🔎 2x Loupe
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="spotlight" title="Focus Spotlight Dimmer" style="font-size: 11px; padding: 6px; justify-content: center;">
                  💡 Spotlight
                </button>
              </div>
            </div>

            <!-- Color Palette & Stroke Width -->
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <span style="font-size: 11px; color: var(--text-muted);">Markup Color</span>
              <div style="display: flex; gap: 6px; align-items: center;">
                <button class="sc-color-chip active" data-color="#00f2fe" style="width: 26px; height: 26px; border-radius: 50%; background: #00f2fe; border: 2px solid #fff; cursor: pointer;"></button>
                <button class="sc-color-chip" data-color="#10b981" style="width: 26px; height: 26px; border-radius: 50%; background: #10b981; border: 2px solid transparent; cursor: pointer;"></button>
                <button class="sc-color-chip" data-color="#f59e0b" style="width: 26px; height: 26px; border-radius: 50%; background: #f59e0b; border: 2px solid transparent; cursor: pointer;"></button>
                <button class="sc-color-chip" data-color="#f43f5e" style="width: 26px; height: 26px; border-radius: 50%; background: #f43f5e; border: 2px solid transparent; cursor: pointer;"></button>
                <button class="sc-color-chip" data-color="#9d4edd" style="width: 26px; height: 26px; border-radius: 50%; background: #9d4edd; border: 2px solid transparent; cursor: pointer;"></button>
                <button class="sc-color-chip" data-color="#ffffff" style="width: 26px; height: 26px; border-radius: 50%; background: #ffffff; border: 2px solid transparent; cursor: pointer;"></button>
                <input type="color" id="sc-custom-color" value="#00f2fe" style="width: 30px; height: 30px; border-radius: 6px; border: none; background: none; cursor: pointer;" title="Custom Color">
              </div>
            </div>

            <!-- Stroke Width & Step Counter -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="form-group">
                <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Stroke: <span id="sc-val-stroke">4</span>px</label>
                <input type="range" id="sc-stroke-slider" min="1" max="16" value="4" style="width: 100%; accent-color: var(--accent-cyan);">
              </div>
              <div class="form-group">
                <label style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px; display: block;">Next Step Badge</label>
                <input type="number" id="sc-step-counter" min="1" max="99" value="1" class="tool-input" style="padding: 4px 8px; font-size: 12px; width: 100%;">
              </div>
            </div>

            <!-- Annotation History & Actions -->
            <div style="display: flex; gap: 6px;">
              <button id="sc-btn-undo" class="tool-btn secondary" style="flex: 1; font-size: 11px; padding: 7px; justify-content: center;" title="Undo (Ctrl+Z)">
                ↩ Undo
              </button>
              <button id="sc-btn-redo" class="tool-btn secondary" style="flex: 1; font-size: 11px; padding: 7px; justify-content: center;" title="Redo (Ctrl+Y)">
                ↪ Redo
              </button>
              <button id="sc-btn-clear-annotations" class="tool-btn secondary" style="flex: 1; font-size: 11px; padding: 7px; justify-content: center;" title="Clear all markup">
                🗑️ Clear
              </button>
            </div>
          </div>

          <!-- Eyedropper Color Inspector Output -->
          <div id="sc-eyedropper-badge" style="display: none; padding: 8px 12px; border-radius: 6px; background: rgba(0, 0, 0, 0.4); border: 1px solid var(--border-color); align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span id="sc-sample-color-preview" style="width: 16px; height: 16px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.3);"></span>
              <span id="sc-sample-color-text" style="font-family: monospace; font-size: 12px; font-weight: 700;">#00f2fe</span>
            </div>
            <span style="font-size: 10px; color: var(--accent-cyan);">Copied!</span>
          </div>

          <!-- Bottom Master Action Bar -->
          <div style="margin-top: auto; padding-top: 14px; border-top: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 8px;">
            <div style="display: flex; gap: 8px;">
              <button id="sc-btn-copy-clipboard" class="tool-btn primary" style="flex: 2; justify-content: center; padding: 11px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy to Clipboard (Ctrl+C)
              </button>

              <button id="sc-btn-download" class="tool-btn accent-emerald" style="flex: 1.5; justify-content: center; padding: 11px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Save Image (Ctrl+S)
              </button>
            </div>

            <!-- Format & Multiplier Settings -->
            <div style="display: flex; gap: 8px; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-muted);">
                Format:
                <select id="sc-export-format" class="tool-input" style="padding: 3px 8px; font-size: 11px;">
                  <option value="png" selected>PNG (Lossless)</option>
                  <option value="webp">WebP (Compact)</option>
                  <option value="jpeg">JPEG (Photo)</option>
                  <option value="pdf">PDF Document (Genuine)</option>
                </select>
              </div>

              <div style="display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--text-muted);">
                Resolution:
                <button id="sc-scale-1x" class="tool-btn secondary" style="padding: 2px 8px; font-size: 10px;">1x</button>
                <button id="sc-scale-2x" class="tool-btn secondary active" style="padding: 2px 8px; font-size: 10px;" title="Retina 4K Ultra Sharp">2x Ultra</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Studio Canvas & Live Viewport (Right Panel) -->
        <div class="tool-panel sc-viewport-panel" style="display: flex; flex-direction: column; overflow: hidden; position: relative; min-height: 520px;">
          
          <!-- Viewport Header Toolbar -->
          <div class="panel-header" style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px solid var(--border-color); flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 13px; font-weight: 700; color: var(--text-main);">Live Studio Canvas</span>
              <span id="sc-canvas-res-label" style="font-size: 11px; font-family: monospace; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">1920 × 1080</span>
            </div>

            <!-- Quick Tool Toggles on Top of Canvas -->
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <button id="sc-quick-ocr-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px; font-weight: 700; color: var(--accent-cyan); border-color: rgba(0,242,254,0.3);" title="Extract text via client-side OCR">📋 Extract Text (OCR)</button>
              <button id="sc-quick-crop-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Crop screenshot (C)">✂️ Crop</button>
              <button id="sc-quick-redact-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Redact passwords / sensitive data (R)">⬛ Redact</button>
              <button id="sc-quick-rotate-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Rotate 90° Clockwise">↻ Rotate</button>
              <button id="sc-quick-flip-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Flip Horizontal">⇄ Flip</button>
              <button id="sc-quick-watermark-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Add Timestamp & Watermark Stamp">🏷️ Stamp</button>
              <button id="sc-quick-sandbox-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Snip full scrollable HTML sections">🌐 HTML Snip</button>
              <button id="sc-quick-stitch-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Stitch multiple screenshots vertically">📑 Stitch</button>
              <button id="sc-quick-eyedropper-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Sample color from screenshot">💉 Eyedropper</button>
              <button id="sc-reset-canvas-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Reset view">🔄 Reset</button>
            </div>
          </div>

          <!-- Canvas Interactive Workspace Area -->
          <div id="sc-canvas-viewport" style="flex: 1; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, rgba(30, 41, 59, 0.5) 0%, rgba(9, 13, 22, 0.95) 100%); border-radius: 10px; padding: 20px; border: 1px solid var(--border-color); overflow: auto; position: relative; cursor: crosshair;">
            
            <!-- Master Canvas Container -->
            <div id="sc-canvas-wrapper" style="display: inline-block; position: relative; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6); border-radius: 8px; transition: transform 0.2s ease;">
              <canvas id="sc-master-canvas" style="display: block; max-width: 100%; max-height: 65vh; object-fit: contain; border-radius: 8px; touch-action: none;"></canvas>
            </div>

            <!-- Floating Countdown Overlay -->
            <div id="sc-countdown-overlay" style="display: none; position: absolute; inset: 0; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(8px); z-index: 50; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
              <div style="font-size: 72px; font-weight: 900; font-family: monospace; color: var(--accent-cyan); text-shadow: 0 0 30px rgba(0, 242, 254, 0.6); animation: pulse 1s infinite;" id="sc-countdown-number">3</div>
              <p style="font-size: 14px; font-weight: 600; color: #fff; margin: 0; text-align: center;">Switch to your target tab or window now!<br><span style="font-size: 12px; color: var(--text-muted);">Capturing screen in seconds...</span></p>
              <button id="sc-btn-cancel-countdown" class="tool-btn secondary" style="font-size: 12px; padding: 6px 16px;">Cancel Snip</button>
            </div>

            <!-- Webcam Viewfinder Modal Overlay -->
            <div id="sc-webcam-overlay" style="display: none; position: absolute; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(10px); z-index: 45; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 20px;">
              <div style="max-width: 520px; width: 100%; aspect-ratio: 16/9; background: #000; border-radius: 12px; overflow: hidden; border: 1px solid var(--accent-cyan); position: relative; box-shadow: 0 10px 40px rgba(0, 242, 254, 0.2);">
                <video id="sc-webcam-video" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover; transform: scaleX(-1);"></video>
                <div style="position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%); display: flex; gap: 10px;">
                  <button id="sc-btn-snap-photo" class="tool-btn primary" style="padding: 10px 24px; font-size: 13px; font-weight: 700; box-shadow: 0 4px 20px rgba(0, 242, 254, 0.4);">
                    📸 Snap Photo
                  </button>
                  <button id="sc-btn-close-webcam" class="tool-btn secondary" style="padding: 10px 16px; font-size: 13px;">
                    Close
                  </button>
                </div>
              </div>
            </div>

            <!-- Floating Text Callout Dialog Overlay -->
            <div id="sc-text-overlay" style="display: none; position: absolute; inset: 0; background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(6px); z-index: 55; align-items: center; justify-content: center; padding: 20px;">
              <div style="max-width: 440px; width: 100%; background: #0f172a; border: 1px solid var(--accent-cyan); border-radius: 12px; padding: 18px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6); display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 6px;">
                    <span>💬</span> Add Text Callout
                  </h4>
                  <button id="sc-text-btn-close" class="tool-btn secondary" style="padding: 2px 8px; font-size: 11px;">✕</button>
                </div>
                
                <input type="text" id="sc-text-input" class="tool-input" placeholder="Type annotation label (e.g., Click here, Bug #104)..." style="width: 100%; padding: 8px 12px; font-size: 13px;">
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                    Font Size
                    <select id="sc-text-size-select" class="tool-input" style="padding: 6px 8px; font-size: 12px;">
                      <option value="14">Small (14px)</option>
                      <option value="18" selected>Medium (18px)</option>
                      <option value="24">Large (24px)</option>
                      <option value="32">Huge (32px)</option>
                    </select>
                  </label>

                  <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                    Callout Style
                    <select id="sc-text-style-select" class="tool-input" style="padding: 6px 8px; font-size: 12px;">
                      <option value="badge" selected>Translucent Badge Pill</option>
                      <option value="plain">Direct Text with Halo</option>
                    </select>
                  </label>
                </div>

                <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 4px;">
                  <button id="sc-text-btn-cancel" class="tool-btn secondary" style="font-size: 12px; padding: 6px 14px;">Cancel</button>
                  <button id="sc-text-btn-submit" class="tool-btn primary" style="font-size: 12px; padding: 6px 18px; font-weight: 700;">Place Callout</button>
                </div>
              </div>
            </div>

            <!-- OCR Text Extraction Results Overlay -->
            <div id="sc-ocr-overlay" style="display: none; position: absolute; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); z-index: 55; align-items: center; justify-content: center; padding: 20px;">
              <div style="max-width: 620px; width: 100%; max-height: 80vh; background: #0b0f19; border: 1px solid var(--accent-cyan); border-radius: 12px; padding: 20px; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7); display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">📋</span>
                    <div>
                      <h4 style="margin: 0; font-size: 14px; font-weight: 700; color: #fff;">Extracted Screenshot Text (Client-Side OCR)</h4>
                      <span id="sc-ocr-meta" style="font-size: 11px; color: var(--text-muted);">100% offline text recognition with redaction privacy shield</span>
                    </div>
                  </div>
                  <button id="sc-ocr-btn-close" class="tool-btn secondary" style="padding: 2px 8px; font-size: 11px;">✕</button>
                </div>

                <textarea id="sc-ocr-result-text" class="tool-input" rows="10" style="width: 100%; font-family: 'JetBrains Mono', monospace; font-size: 12.5px; line-height: 1.5; padding: 12px; resize: vertical;" placeholder="Recognized text will appear here..."></textarea>

                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 11px; color: #10b981; display: inline-flex; align-items: center; gap: 4px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    Processed locally in browser
                  </span>
                  <div style="display: flex; gap: 8px;">
                    <button id="sc-ocr-btn-copy" class="tool-btn primary" style="font-size: 12px; padding: 7px 18px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      Copy Extracted Text
                    </button>
                    <button id="sc-ocr-btn-done" class="tool-btn secondary" style="font-size: 12px; padding: 7px 14px;">Done</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Webpage Snapper / Bookmarklet Modal Overlay -->
            <div id="sc-bookmarklet-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); z-index: 9999; align-items: center; justify-content: center; padding: 20px;">
              <div style="max-width: 600px; width: 100%; max-height: 85vh; overflow-y: auto; background: #0b0f19; border: 1px solid var(--accent-cyan); border-radius: 14px; padding: 22px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8); display: flex; flex-direction: column; gap: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 20px;">⚡</span>
                    <div>
                      <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: #fff;">OmniTool Live Web Snapper Bookmarklet</h4>
                      <span style="font-size: 11px; color: var(--text-muted);">Snip any live website, edit text, delete popups, and capture scrollable frames</span>
                    </div>
                  </div>
                  <button id="sc-bm-btn-close" class="tool-btn secondary" style="padding: 2px 8px; font-size: 11px;">✕</button>
                </div>

                <div style="background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 10px; padding: 14px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                  <span style="font-size: 11.5px; color: #94a3b8;">Drag this button directly to your browser's Bookmarks Bar:</span>
                  <a id="sc-bookmarklet-drag-link" href="#" class="tool-btn primary" style="padding: 10px 22px; font-size: 13.5px; font-weight: 700; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; cursor: grab; box-shadow: 0 4px 18px rgba(0, 242, 254, 0.35);">
                    ⚡ OmniTool Web Snapper
                  </a>
                  <span style="font-size: 10.5px; color: var(--text-muted);">(Press Ctrl+Shift+B in Chrome/Edge to show your Bookmarks Bar)</span>
                </div>

                <div style="display: flex; gap: 8px; justify-content: center;">
                  <button id="sc-bm-btn-copy" class="tool-btn secondary" style="font-size: 12px; padding: 7px 16px; font-weight: 600;">
                    📋 Copy Bookmarklet Script
                  </button>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 4px;">
                    <strong style="font-size: 11.5px; color: #fff;">🎯 Snip Scrollable Sections</strong>
                    <p style="font-size: 11px; color: #94a3b8; margin: 0; line-height: 1.4;">Hover any container, card, or scrollable table. Automatically expands and captures the full scrolling height without cutting off!</p>
                  </div>
                  <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 4px;">
                    <strong style="font-size: 11.5px; color: #fff;">✏️ In-Page Live Edit Mode</strong>
                    <p style="font-size: 11px; color: #94a3b8; margin: 0; line-height: 1.4;">Click any headline, paragraph, or number on any webpage to edit typos, change mock pricing, or test copy directly.</p>
                  </div>
                  <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 4px;">
                    <strong style="font-size: 11.5px; color: #fff;">🗑️ Click-to-Delete Elements</strong>
                    <p style="font-size: 11px; color: #94a3b8; margin: 0; line-height: 1.4;">Click cookie banners, newsletters, sticky headers, or intrusive ads to remove them cleanly before snapping.</p>
                  </div>
                  <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 4px;">
                    <strong style="font-size: 11.5px; color: #fff;">🔒 100% Client-Side & Legal</strong>
                    <p style="font-size: 11px; color: #94a3b8; margin: 0; line-height: 1.4;">Runs strictly inside your local browser tab on standard web APIs. Zero server uploads, zero rules broken.</p>
                  </div>
                </div>

                <div style="display: flex; justify-content: flex-end; margin-top: 4px;">
                  <button id="sc-bm-btn-done" class="tool-btn secondary" style="font-size: 12px; padding: 6px 18px;">Done</button>
                </div>
              </div>
            </div>

            <!-- Live HTML Component & Section Sandbox Overlay -->
            <div id="sc-html-sandbox-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88); backdrop-filter: blur(10px); z-index: 9999; align-items: center; justify-content: center; padding: 20px;">
              <div style="max-width: 900px; width: 100%; max-height: 90vh; background: #0b0f19; border: 1px solid var(--accent-cyan); border-radius: 14px; padding: 20px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8); display: flex; flex-direction: column; gap: 12px; overflow: hidden;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 20px;">🌐</span>
                    <div>
                      <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: #fff;">HTML Component & Scrollable Section Snapper</h4>
                      <span style="font-size: 11px; color: var(--text-muted);">Edit mockups visually and capture full scrollable section height without cut-offs</span>
                    </div>
                  </div>
                  <button id="sc-sandbox-btn-close" class="tool-btn secondary" style="padding: 2px 8px; font-size: 11px;">✕</button>
                </div>

                <!-- Sandbox Toolbar -->
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; background: rgba(255,255,255,0.02); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 11px; color: var(--text-muted);">Preset:</span>
                    <select id="sc-sandbox-preset-select" class="tool-input" style="padding: 4px 8px; font-size: 11.5px;">
                      <option value="pricing" selected>📊 SaaS Pricing Cards</option>
                      <option value="code">💻 Long Code Window (Scrollable)</option>
                      <option value="article">📜 Long Doc Section with Scrollbar</option>
                      <option value="hero">🚀 Modern Dark Hero Banner</option>
                      <option value="custom">✏️ Custom HTML/CSS Code</option>
                    </select>
                  </div>

                  <div style="display: flex; align-items: center; gap: 8px;">
                    <button id="sc-sandbox-toggle-edit" class="tool-btn secondary" style="font-size: 11px; padding: 5px 10px; font-weight: 600;">
                      ✏️ Visual Edit Mode: OFF
                    </button>
                    <button id="sc-sandbox-toggle-scroll" class="tool-btn secondary" style="font-size: 11px; padding: 5px 10px;">
                      📐 Height: Scrollable (320px)
                    </button>
                  </div>
                </div>

                <!-- Split Editor & Preview View -->
                <div style="display: grid; grid-template-columns: 1fr 1.3fr; gap: 12px; flex: 1; min-height: 380px; overflow: hidden;">
                  <!-- HTML/CSS Source Code -->
                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    <span style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between;">
                      <span>HTML / CSS Source</span>
                      <span style="font-size: 10px; color: #10b981;">Live Synced</span>
                    </span>
                    <textarea id="sc-sandbox-code-input" class="tool-input" style="flex: 1; font-family: 'JetBrains Mono', monospace; font-size: 11.5px; line-height: 1.4; padding: 10px; resize: none;"></textarea>
                  </div>

                  <!-- Live Interactive Render Viewport -->
                  <div style="display: flex; flex-direction: column; gap: 6px;">
                    <span style="font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between;">
                      <span>Rendered Section Preview</span>
                      <span id="sc-sandbox-scroll-hint" style="font-size: 10px; color: var(--accent-cyan);">Captures 100% of scrollable overflow</span>
                    </span>
                    <div id="sc-sandbox-viewport-container" style="flex: 1; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: #ffffff; position: relative;">
                      <iframe id="sc-sandbox-iframe" style="width: 100%; height: 100%; border: none; background: #ffffff;" sandbox="allow-same-origin allow-scripts"></iframe>
                    </div>
                  </div>
                </div>

                <!-- Footer Action Bar -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid var(--border-color);">
                  <span style="font-size: 11px; color: #10b981; display: inline-flex; align-items: center; gap: 4px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    Full scrollable height captured seamlessly
                  </span>
                  <div style="display: flex; gap: 8px;">
                    <button id="sc-sandbox-btn-cancel" class="tool-btn secondary" style="font-size: 12px; padding: 7px 16px;">Cancel</button>
                    <button id="sc-sandbox-btn-capture" class="tool-btn primary" style="font-size: 12.5px; padding: 7px 22px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                      📸 Capture Full Section &amp; Open in Studio
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Vertical Multi-Shot & Scrolling Screenshot Stitcher Overlay -->
            <div id="sc-stitcher-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88); backdrop-filter: blur(10px); z-index: 9999; align-items: center; justify-content: center; padding: 20px;">
              <div style="max-width: 680px; width: 100%; max-height: 85vh; background: #0b0f19; border: 1px solid var(--accent-cyan); border-radius: 14px; padding: 22px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8); display: flex; flex-direction: column; gap: 14px; overflow: hidden;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 20px;">📑</span>
                    <div>
                      <h4 style="margin: 0; font-size: 15px; font-weight: 700; color: #fff;">Vertical Scrolling Screenshot Stitcher</h4>
                      <span style="font-size: 11px; color: var(--text-muted);">Combine consecutive scroll captures into one continuous tall screenshot</span>
                    </div>
                  </div>
                  <button id="sc-stitch-btn-close" class="tool-btn secondary" style="padding: 2px 8px; font-size: 11px;">✕</button>
                </div>

                <!-- File Picker / Dropzone for multiple parts -->
                <div id="sc-stitch-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.3); border-radius: 10px; padding: 18px; text-align: center; cursor: pointer; background: rgba(0, 242, 254, 0.02); display: flex; flex-direction: column; align-items: center; gap: 6px;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 32px; height: 32px; color: var(--accent-cyan);">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span style="font-size: 12.5px; font-weight: 600; color: #fff;">Click to select 2 or more scrolling screenshot slices</span>
                  <span style="font-size: 11px; color: var(--text-muted);">(Select Part 1, Part 2, Part 3 from top to bottom)</span>
                  <input type="file" id="sc-stitch-file-input" accept="image/*" multiple style="display: none;">
                </div>

                <!-- Slices Preview Strip -->
                <div style="display: flex; flex-direction: column; gap: 6px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 11.5px; font-weight: 600; color: #e2e8f0;">Image Slices Sequence (<span id="sc-stitch-count">0</span> images)</span>
                    <button id="sc-stitch-btn-clear" class="tool-btn secondary" style="font-size: 10.5px; padding: 2px 8px;">Clear All</button>
                  </div>
                  <div id="sc-stitch-slices-list" style="max-height: 190px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px; padding: 6px; background: rgba(0,0,0,0.3); border-radius: 8px; border: 1px solid var(--border-color);">
                    <div id="sc-stitch-empty-msg" style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 11.5px;">No images added yet. Add at least 2 screenshots to stitch.</div>
                  </div>
                </div>

                <!-- Overlap Trimming Slider -->
                <div class="form-group" style="background: rgba(255, 255, 255, 0.02); padding: 10px 14px; border-radius: 8px; border: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 4px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <label style="font-size: 11.5px; color: #e2e8f0; font-weight: 600;">Overlap Header Trim: <span id="sc-stitch-val-overlap">0</span>px</label>
                    <span style="font-size: 10.5px; color: var(--text-muted);">Trims duplicate headers between scroll steps</span>
                  </div>
                  <input type="range" id="sc-stitch-overlap-slider" min="0" max="250" value="0" style="width: 100%; accent-color: var(--accent-cyan);">
                </div>

                <!-- Footer Buttons -->
                <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px;">
                  <button id="sc-stitch-btn-cancel" class="tool-btn secondary" style="font-size: 12px; padding: 7px 16px;">Cancel</button>
                  <button id="sc-stitch-btn-merge" class="tool-btn primary" style="font-size: 12.5px; padding: 7px 22px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                    📑 Merge &amp; Load into Studio
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty Dropzone Hint (Shown if no image loaded yet) -->
            <div id="sc-empty-hint" style="display: none; position: absolute; pointer-events: none; text-align: center; color: var(--text-muted);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 48px; height: 48px; margin-bottom: 10px; color: var(--accent-cyan); opacity: 0.8;">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <p style="font-size: 14px; font-weight: 600; margin: 0; color: var(--text-main);">Drop Screenshot Here or Press Snap</p>
              <p style="font-size: 12px; margin: 4px 0 0 0;">Supports Ctrl+V direct clipboard paste & image file drag-and-drop.</p>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Workflow Card -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 14px;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Screenshot Studio Pro Guide & Keyboard Shortcuts</span>
            </div>
            <button class="tool-btn secondary" id="sc-guide-load-demo" style="font-size: 11px;">Load Sample Mockup</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Snip Screen or Window</strong>: Click "Snap Window, Screen or Tab", select your screen, application window, or current browser tab. Set a 3s-10s countdown to capture hover tooltips.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Wrap with SaaS Mockup</strong>: Choose macOS Glass, Windows 11 Mica, Cyberpunk Terminal, or Mobile Phone. Select luxury "Wallpaper Blur" for ambient frosted backdrops.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Redact, Annotate & OCR</strong>: Use Pixelate or Blackout to mask tokens. Place text callouts, numbered step badges, freehand scribbles, or extract text with privacy-shielded OCR.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">4</div>
              <div class="tool-guide-step-text"><strong>Shortcuts & 2x Export</strong>: Press <kbd>Ctrl+C</kbd> to copy, <kbd>Ctrl+S</kbd> to save, <kbd>Ctrl+Z</kbd> to undo. Toggle 2x Ultra Retina for ultra-sharp 4K exports or genuine PDF documents.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
    this.cleanup();

    this.container = container;
    this.app = appInstance;
    this.masterCanvas = container.querySelector("#sc-master-canvas");
    this.masterCtx = this.masterCanvas?.getContext("2d");

    // Initialize Default State
    this.annotations = [];
    this.undoStack = [];
    this.redoStack = [];
    this.nextStepNum = 1;
    this.activeTool = "select";
    this.selectedAnnotationIndex = -1;
    this.isDraggingAnnotation = false;
    this.dragAnnotationStart = null;

    this.stitchImages = [];
    this.sandboxVisualEdit = false;
    this.sandboxIsScrollable = true;

    // Setup Event Listeners
    this.setupTabNavigation();
    this.setupCaptureEvents();
    this.setupMockupEvents();
    this.setupBackdropEvents();
    this.setupAnnotationEvents();
    this.setupCanvasInteractions();
    this.setupExportActions();
    this.setupTextOverlayEvents();
    this.setupOcrEvents();
    this.setupBookmarkletEvents();
    this.setupHtmlSandboxEvents();
    this.setupStitcherEvents();

    // Global Clipboard Paste Listener
    this.boundPasteHandler = this.handleGlobalPaste.bind(this);
    window.addEventListener("paste", this.boundPasteHandler);

    // Global Keyboard Shortcuts
    this.boundKeyHandler = this.handleKeyboardShortcuts.bind(this);
    window.addEventListener("keydown", this.boundKeyHandler);

    // Drag and Drop files onto container
    this.setupDragAndDrop();

    // Load initial high-fidelity sample (SaaS Analytics)
    this.loadSampleScreen("analytics");
  },

  setupTabNavigation() {
    const tabs = this.container.querySelectorAll(".sc-nav-tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const targetTab = tab.getAttribute("data-tab");
        const panes = this.container.querySelectorAll(".sc-tab-pane");
        panes.forEach(pane => { pane.style.display = "none"; });

        const activePane = this.container.querySelector(`#sc-tab-content-${targetTab}`);
        if (activePane) activePane.style.display = "flex";
      });
    });
  },

  setupCaptureEvents() {
    // 1. Live Screen / Tab Capture Button
    const captureBtn = this.container.querySelector("#sc-btn-capture-display");
    captureBtn?.addEventListener("click", () => {
      const delay = parseInt(this.container.querySelector("#sc-delay-select")?.value || "0", 10);
      this.performScreenCapture(delay);
    });

    // Countdown Cancel Button
    this.container.querySelector("#sc-btn-cancel-countdown")?.addEventListener("click", () => {
      this.cancelCountdown();
    });

    // 2. Clipboard Paste Button
    this.container.querySelector("#sc-btn-clipboard-paste")?.addEventListener("click", async () => {
      try {
        if (navigator.clipboard?.read) {
          const clipboardItems = await navigator.clipboard.read();
          for (const item of clipboardItems) {
            for (const type of item.types) {
              if (type.startsWith("image/")) {
                const blob = await item.getType(type);
                this.loadImageFromBlob(blob, "Clipboard Image");
                return;
              }
            }
          }
        }
        this.app?.showToast("No image data found in clipboard. Press Ctrl+V to paste.", "info");
      } catch (err) {
        this.app?.showToast("Press Ctrl + V anywhere to paste your screenshot.", "info");
      }
    });

    // 3. File Upload Button
    const fileInput = this.container.querySelector("#sc-file-input");
    const uploadBtn = this.container.querySelector("#sc-btn-upload-file");
    uploadBtn?.addEventListener("click", () => fileInput?.click());
    fileInput?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) {
        this.loadImageFromBlob(file, file.name);
        fileInput.value = "";
      }
    });

    // 4. Webcam Snapshot
    this.container.querySelector("#sc-btn-webcam")?.addEventListener("click", () => {
      this.openWebcamViewfinder();
    });
    this.container.querySelector("#sc-btn-close-webcam")?.addEventListener("click", () => {
      this.closeWebcamViewfinder();
    });
    this.container.querySelector("#sc-btn-snap-photo")?.addEventListener("click", () => {
      this.snapWebcamPhoto();
    });

    // 5. Sample Screen buttons
    this.container.querySelectorAll(".sc-sample-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const sampleType = btn.getAttribute("data-sample");
        this.loadSampleScreen(sampleType);
      });
    });

    this.container.querySelector("#sc-guide-load-demo")?.addEventListener("click", () => {
      this.loadSampleScreen("analytics");
    });
  },

  startCountdownStreamCapture(video, mediaStream, seconds) {
    this.countdownSecsLeft = seconds;
    const overlay = this.container.querySelector("#sc-countdown-overlay");
    const numDisplay = this.container.querySelector("#sc-countdown-number");
    if (!overlay || !numDisplay) {
      this.captureFrameFromVideo(video, mediaStream);
      return;
    }

    overlay.style.display = "flex";
    numDisplay.textContent = seconds;
    this.playAudioBeep(660, 0.08);

    clearInterval(this.countdownTimer);
    this.countdownTimer = setInterval(() => {
      this.countdownSecsLeft--;
      if (this.countdownSecsLeft > 0) {
        numDisplay.textContent = this.countdownSecsLeft;
        this.playAudioBeep(660, 0.08);
      } else {
        clearInterval(this.countdownTimer);
        this.countdownTimer = null;
        overlay.style.display = "none";
        this.playAudioBeep(1100, 0.15);
        this.captureFrameFromVideo(video, mediaStream);
      }
    }, 1000);
  },

  cancelCountdown() {
    clearInterval(this.countdownTimer);
    this.countdownTimer = null;
    const overlay = this.container.querySelector("#sc-countdown-overlay");
    if (overlay) overlay.style.display = "none";
    if (this.activeStream) {
      this.activeStream.getTracks().forEach(t => t.stop());
      this.activeStream = null;
    }
    this.updateStatusPill("Ready", "#00f2fe");
    this.app?.showToast("Capture countdown cancelled.", "info");
  },

  async performScreenCapture(delay = 0) {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      this.app?.showToast("Screen capture is not supported on this browser/device. Please use file upload or paste (Ctrl+V).", "error");
      return;
    }

    try {
      this.updateStatusPill(delay > 0 ? "Armed (Select Screen)..." : "Capturing...", "#f59e0b");
      const resTarget = this.container.querySelector("#sc-res-select")?.value || "native";

      const constraints = {
        video: {
          displaySurface: "browser",
          cursor: "always"
        },
        audio: false
      };

      if (resTarget === "4k") {
        constraints.video.width = { ideal: 3840 };
        constraints.video.height = { ideal: 2160 };
      } else if (resTarget === "1080") {
        constraints.video.width = { ideal: 1920 };
        constraints.video.height = { ideal: 1080 };
      }

      // Invoke directly within user activation click
      const mediaStream = await navigator.mediaDevices.getDisplayMedia(constraints);
      this.activeStream = mediaStream;

      const video = document.createElement("video");
      video.srcObject = mediaStream;
      video.autoplay = true;
      video.playsInline = true;

      mediaStream.getVideoTracks()[0]?.addEventListener("ended", () => {
        if (this.countdownTimer) this.cancelCountdown();
      });

      if (delay > 0) {
        this.startCountdownStreamCapture(video, mediaStream, delay);
      } else {
        this.captureFrameFromVideo(video, mediaStream);
      }
    } catch (err) {
      this.updateStatusPill("Ready", "#00f2fe");
      if (err.name === "NotAllowedError") {
        this.app?.showToast("Screen capture cancelled.", "info");
      } else {
        console.error("Screen capture error:", err);
        this.app?.showToast("Could not access screen capture: " + err.message, "error");
      }
    }
  },

  captureFrameFromVideo(video, mediaStream) {
    const doSnap = () => {
      const offCanvas = document.createElement("canvas");
      offCanvas.width = video.videoWidth || 1920;
      offCanvas.height = video.videoHeight || 1080;
      const offCtx = offCanvas.getContext("2d");
      offCtx.drawImage(video, 0, 0, offCanvas.width, offCanvas.height);

      const img = new Image();
      img.onload = () => {
        this.setSourceImage(img);
        this.playShutterSound();
        this.app?.showToast("Screenshot captured successfully!", "success");
        this.updateStatusPill("Captured", "#10b981");
      };
      img.src = offCanvas.toDataURL("image/png");

      mediaStream.getTracks().forEach(t => t.stop());
      this.activeStream = null;
    };

    if (video.readyState >= 2) {
      setTimeout(doSnap, 120);
    } else {
      video.onloadedmetadata = () => setTimeout(doSnap, 250);
    }
  },

  async openWebcamViewfinder() {
    if (!navigator.mediaDevices?.getUserMedia) {
      this.app?.showToast("Webcam is not supported or accessible on this device.", "error");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
      this.activeStream = stream;
      const videoEl = this.container.querySelector("#sc-webcam-video");
      const overlay = this.container.querySelector("#sc-webcam-overlay");
      if (videoEl && overlay) {
        videoEl.srcObject = stream;
        overlay.style.display = "flex";
      }
    } catch (err) {
      this.app?.showToast("Could not access webcam camera: " + err.message, "error");
    }
  },

  closeWebcamViewfinder() {
    const overlay = this.container.querySelector("#sc-webcam-overlay");
    if (overlay) overlay.style.display = "none";
    if (this.activeStream) {
      this.activeStream.getTracks().forEach(t => t.stop());
      this.activeStream = null;
    }
  },

  snapWebcamPhoto() {
    const videoEl = this.container.querySelector("#sc-webcam-video");
    if (!videoEl || !videoEl.videoWidth) return;

    const snapCanvas = document.createElement("canvas");
    snapCanvas.width = videoEl.videoWidth;
    snapCanvas.height = videoEl.videoHeight;
    const sCtx = snapCanvas.getContext("2d");
    
    sCtx.translate(snapCanvas.width, 0);
    sCtx.scale(-1, 1);
    sCtx.drawImage(videoEl, 0, 0);

    const img = new Image();
    img.onload = () => {
      this.setSourceImage(img);
      this.closeWebcamViewfinder();
      this.playShutterSound();
      this.app?.showToast("Webcam photo captured!", "success");
    };
    img.src = snapCanvas.toDataURL("image/png");
  },

  handleGlobalPaste(e) {
    if (!this.container || !this.container.isConnected) return;
    const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.indexOf("image") !== -1) {
        const file = item.getAsFile();
        if (file) {
          e.preventDefault();
          this.loadImageFromBlob(file, "Pasted Screenshot");
          this.app?.showToast("Pasted screenshot from clipboard!", "success");
          return;
        }
      }
    }
  },

  handleKeyboardShortcuts(e) {
    if (!this.container || !this.container.isConnected) return;

    const activeEl = document.activeElement;
    const isInput = activeEl && (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA" || activeEl.isContentEditable);
    if (isInput) return;

    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

    if (cmdOrCtrl && e.key.toLowerCase() === "z") {
      e.preventDefault();
      if (e.shiftKey) {
        this.redo();
      } else {
        this.undo();
      }
      return;
    }

    if (cmdOrCtrl && e.key.toLowerCase() === "y") {
      e.preventDefault();
      this.redo();
      return;
    }

    if (cmdOrCtrl && e.key.toLowerCase() === "c") {
      e.preventDefault();
      this.copyCanvasToClipboard();
      return;
    }

    if (cmdOrCtrl && e.key.toLowerCase() === "s") {
      e.preventDefault();
      this.downloadExportImage();
      return;
    }

    if (e.key === "Escape") {
      this.selectedAnnotationIndex = -1;
      this.switchToMarkupTool("select");
      this.renderMaster();
      return;
    }

    if (e.key === "Delete" || e.key === "Backspace") {
      if (this.selectedAnnotationIndex >= 0 && this.selectedAnnotationIndex < this.annotations.length) {
        e.preventDefault();
        this.pushUndoState();
        this.annotations.splice(this.selectedAnnotationIndex, 1);
        this.selectedAnnotationIndex = -1;
        this.renderMaster();
        this.app?.showToast("Deleted selected annotation", "info");
        return;
      }
      if (this.annotations.length > 0) {
        e.preventDefault();
        this.undo();
      }
      return;
    }

    const toolMap = {
      v: "select",
      c: "crop",
      p: "pen",
      r: "blur",
      k: "blackout",
      t: "text",
      s: "step",
      a: "arrow",
      b: "rect",
      h: "highlight",
      o: "circle",
      l: "loupe"
    };

    const key = e.key.toLowerCase();
    if (toolMap[key] && !cmdOrCtrl && !e.altKey) {
      e.preventDefault();
      this.switchToMarkupTool(toolMap[key]);
      this.app?.showToast(`Markup Tool: ${toolMap[key].toUpperCase()}`, "info");
    }
  },

  setupDragAndDrop() {
    const viewport = this.container.querySelector("#sc-canvas-viewport");
    if (!viewport) return;

    ["dragenter", "dragover"].forEach(evt => {
      viewport.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        viewport.style.borderColor = "var(--accent-cyan)";
      });
    });

    ["dragleave", "drop"].forEach(evt => {
      viewport.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        viewport.style.borderColor = "var(--border-color)";
      });
    });

    viewport.addEventListener("drop", (e) => {
      const files = e.dataTransfer?.files;
      if (files && files[0] && files[0].type.startsWith("image/")) {
        this.loadImageFromBlob(files[0], files[0].name);
        this.app?.showToast(`Loaded ${files[0].name}`, "success");
      }
    });
  },

  loadImageFromBlob(blob, label = "Image") {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        this.setSourceImage(img);
        this.updateStatusPill("Ready", "#00f2fe");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(blob);
  },

  setSourceImage(img) {
    this.sourceImage = img;
    this.annotations = [];
    this.undoStack = [];
    this.redoStack = [];
    this.nextStepNum = 1;
    this.selectedAnnotationIndex = -1;
    this.cropRect = null;
    this.renderMaster();
  },

  setupMockupEvents() {
    // Theme Select
    this.container.querySelector("#sc-frame-theme")?.addEventListener("change", (e) => {
      this.config.mockupTheme = e.target.value;
      this.renderMaster();
    });

    // URL Bar
    this.container.querySelector("#sc-frame-url")?.addEventListener("input", (e) => {
      this.config.urlText = e.target.value;
      this.renderMaster();
    });

    // Header Title
    this.container.querySelector("#sc-frame-title")?.addEventListener("input", (e) => {
      this.config.titleText = e.target.value;
      this.renderMaster();
    });

    // SSL Padlock Toggle
    const sslBtn = this.container.querySelector("#sc-ssl-toggle");
    sslBtn?.addEventListener("click", () => {
      this.config.showSslLock = !this.config.showSslLock;
      sslBtn.textContent = this.config.showSslLock ? "🔒 SSL" : "🔓 HTTP";
      sslBtn.style.color = this.config.showSslLock ? "var(--accent-cyan)" : "var(--text-muted)";
      this.renderMaster();
    });

    // Corner Radius
    const radiusSlider = this.container.querySelector("#sc-radius-slider");
    radiusSlider?.addEventListener("input", (e) => {
      this.config.cornerRadius = parseInt(e.target.value, 10);
      const valDisplay = this.container.querySelector("#sc-val-radius");
      if (valDisplay) valDisplay.textContent = this.config.cornerRadius;
      this.renderMaster();
    });

    // Shadow Style
    this.container.querySelector("#sc-shadow-select")?.addEventListener("change", (e) => {
      this.config.shadowStyle = e.target.value;
      this.renderMaster();
    });
  },

  setupBackdropEvents() {
    // Backdrop Type (Gradient / Solid / Transparent / Frosted)
    const typeBtns = this.container.querySelectorAll(".sc-bg-type-btn");
    typeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        typeBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const type = btn.getAttribute("data-type");
        this.config.backdropType = type;

        const gradBox = this.container.querySelector("#sc-gradient-presets-container");
        const solidBox = this.container.querySelector("#sc-solid-color-container");

        if (gradBox) gradBox.style.display = (type === "gradient") ? "flex" : "none";
        if (solidBox) solidBox.style.display = (type === "solid") ? "block" : "none";
        this.renderMaster();
      });
    });

    // Gradient Presets
    const gradThumbs = this.container.querySelectorAll(".sc-grad-thumb");
    gradThumbs.forEach(thumb => {
      thumb.addEventListener("click", () => {
        gradThumbs.forEach(t => t.style.borderColor = "transparent");
        thumb.style.borderColor = "var(--accent-cyan)";
        this.config.backdropGradient = thumb.getAttribute("data-grad");
        this.renderMaster();
      });
    });

    // Solid Color
    this.container.querySelector("#sc-solid-color-input")?.addEventListener("input", (e) => {
      this.config.backdropColor = e.target.value;
      this.renderMaster();
    });

    // Padding Slider
    const paddingSlider = this.container.querySelector("#sc-padding-slider");
    paddingSlider?.addEventListener("input", (e) => {
      this.config.backdropPadding = parseInt(e.target.value, 10);
      const valDisplay = this.container.querySelector("#sc-val-padding");
      if (valDisplay) valDisplay.textContent = this.config.backdropPadding;
      this.renderMaster();
    });

    // Aspect Ratio
    this.container.querySelector("#sc-aspect-ratio")?.addEventListener("change", (e) => {
      this.config.aspectRatio = e.target.value;
      this.renderMaster();
    });
  },

  setupAnnotationEvents() {
    // Markup Tool buttons
    const toolBtns = this.container.querySelectorAll(".sc-tool-btn");
    toolBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        toolBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeTool = btn.getAttribute("data-tool");
        if (this.activeTool !== "select") {
          this.selectedAnnotationIndex = -1;
          this.renderMaster();
        }
      });
    });

    // Color chips
    const colorChips = this.container.querySelectorAll(".sc-color-chip");
    colorChips.forEach(chip => {
      chip.addEventListener("click", () => {
        colorChips.forEach(c => c.style.borderColor = "transparent");
        chip.style.borderColor = "#fff";
        this.currentColor = chip.getAttribute("data-color");
        const customColor = this.container.querySelector("#sc-custom-color");
        if (customColor) customColor.value = this.currentColor;
      });
    });

    // Custom Color picker
    this.container.querySelector("#sc-custom-color")?.addEventListener("input", (e) => {
      this.currentColor = e.target.value;
      colorChips.forEach(c => {
        c.style.borderColor = (c.getAttribute("data-color").toLowerCase() === this.currentColor.toLowerCase()) ? "#fff" : "transparent";
      });
    });

    // Stroke slider
    const strokeSlider = this.container.querySelector("#sc-stroke-slider");
    strokeSlider?.addEventListener("input", (e) => {
      this.strokeWidth = parseInt(e.target.value, 10);
      const valDisplay = this.container.querySelector("#sc-val-stroke");
      if (valDisplay) valDisplay.textContent = this.strokeWidth;
    });

    // Step counter
    this.container.querySelector("#sc-step-counter")?.addEventListener("change", (e) => {
      this.nextStepNum = parseInt(e.target.value, 10) || 1;
    });

    // Undo / Redo / Clear
    this.container.querySelector("#sc-btn-undo")?.addEventListener("click", () => this.undo());
    this.container.querySelector("#sc-btn-redo")?.addEventListener("click", () => this.redo());
    this.container.querySelector("#sc-btn-clear-annotations")?.addEventListener("click", () => {
      if (this.annotations.length > 0) {
        this.pushUndoState();
        this.annotations = [];
        this.selectedAnnotationIndex = -1;
        this.cropRect = null;
        this.renderMaster();
        this.app?.showToast("Cleared markup annotations", "info");
      }
    });

    // Quick Tool bar buttons
    this.container.querySelector("#sc-quick-crop-btn")?.addEventListener("click", () => {
      this.switchToMarkupTool("crop");
    });
    this.container.querySelector("#sc-quick-redact-btn")?.addEventListener("click", () => {
      this.switchToMarkupTool("blur");
    });
    this.container.querySelector("#sc-quick-rotate-btn")?.addEventListener("click", () => {
      this.rotateImage(90);
    });
    this.container.querySelector("#sc-quick-flip-btn")?.addEventListener("click", () => {
      this.flipImageHorizontal();
    });
    this.container.querySelector("#sc-quick-watermark-btn")?.addEventListener("click", () => {
      this.addWatermarkStamp();
    });
    this.container.querySelector("#sc-quick-eyedropper-btn")?.addEventListener("click", () => {
      this.activeTool = "eyedropper";
      this.app?.showToast("Click any pixel on the screenshot to sample its exact color.", "info");
    });
    this.container.querySelector("#sc-reset-canvas-btn")?.addEventListener("click", () => {
      this.loadSampleScreen("analytics");
      this.app?.showToast("Reset canvas to clean sample", "info");
    });
  },

  switchToMarkupTool(toolName) {
    this.activeTool = toolName;
    const markupNavTab = this.container.querySelector('.sc-nav-tab[data-tab="annotate"]');
    markupNavTab?.click();
    const btn = this.container.querySelector(`.sc-tool-btn[data-tool="${toolName}"]`);
    btn?.click();
  },

  setupTextOverlayEvents() {
    const overlay = this.container.querySelector("#sc-text-overlay");
    const input = this.container.querySelector("#sc-text-input");
    const submitBtn = this.container.querySelector("#sc-text-btn-submit");
    const closeBtn = this.container.querySelector("#sc-text-btn-close");
    const cancelBtn = this.container.querySelector("#sc-text-btn-cancel");

    const closeDialog = () => {
      if (overlay) overlay.style.display = "none";
      this.pendingTextPos = null;
    };

    const submitText = () => {
      const textVal = input?.value?.trim();
      if (textVal && this.pendingTextPos) {
        const sizeVal = parseInt(this.container.querySelector("#sc-text-size-select")?.value || "18", 10);
        const styleVal = this.container.querySelector("#sc-text-style-select")?.value || "badge";
        
        this.pushUndoState();
        this.annotations.push({
          type: "text",
          x: this.pendingTextPos.x,
          y: this.pendingTextPos.y,
          text: textVal,
          fontSize: sizeVal,
          badge: styleVal === "badge",
          color: this.currentColor
        });
        this.renderMaster();
        this.playAudioBeep(880, 0.05);
        this.app?.showToast("Added text callout", "success");
      }
      closeDialog();
    };

    submitBtn?.addEventListener("click", submitText);
    input?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitText();
      } else if (e.key === "Escape") {
        closeDialog();
      }
    });

    closeBtn?.addEventListener("click", closeDialog);
    cancelBtn?.addEventListener("click", closeDialog);
  },

  openTextDialog(pos) {
    const overlay = this.container.querySelector("#sc-text-overlay");
    const input = this.container.querySelector("#sc-text-input");
    if (!overlay || !input) {
      const userText = prompt("Enter callout label for screenshot:");
      if (userText && userText.trim()) {
        this.pushUndoState();
        this.annotations.push({
          type: "text",
          x: pos.x,
          y: pos.y,
          text: userText.trim(),
          fontSize: 18,
          badge: true,
          color: this.currentColor
        });
        this.renderMaster();
      }
      return;
    }

    this.pendingTextPos = pos;
    overlay.style.display = "flex";
    input.value = "";
    setTimeout(() => input.focus(), 60);
  },

  setupOcrEvents() {
    this.container.querySelector("#sc-quick-ocr-btn")?.addEventListener("click", () => {
      this.runOcr();
    });

    const overlay = this.container.querySelector("#sc-ocr-overlay");
    const closeBtn = this.container.querySelector("#sc-ocr-btn-close");
    const doneBtn = this.container.querySelector("#sc-ocr-btn-done");
    const copyBtn = this.container.querySelector("#sc-ocr-btn-copy");
    const textarea = this.container.querySelector("#sc-ocr-result-text");

    const closeOcr = () => {
      if (overlay) overlay.style.display = "none";
    };

    closeBtn?.addEventListener("click", closeOcr);
    doneBtn?.addEventListener("click", closeOcr);

    copyBtn?.addEventListener("click", () => {
      if (textarea && textarea.value) {
        navigator.clipboard.writeText(textarea.value).then(() => {
          this.app?.showToast("Copied extracted text to clipboard!", "success");
        }).catch(() => {
          textarea.select();
          document.execCommand("copy");
          this.app?.showToast("Copied text!", "success");
        });
      }
    });
  },

  loadTesseract() {
    if (this.tesseractLoadingPromise) return this.tesseractLoadingPromise;
    this.tesseractLoadingPromise = new Promise((resolve, reject) => {
      if (window.Tesseract) {
        resolve(window.Tesseract);
        return;
      }
      this.updateStatusPill("Loading OCR...", "#f59e0b");
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5.0.5/dist/tesseract.min.js";
      script.onload = () => resolve(window.Tesseract);
      script.onerror = () => {
        this.tesseractLoadingPromise = null;
        reject(new Error("Failed to load OCR engine. Please check your internet connection."));
      };
      document.head.appendChild(script);
    });
    return this.tesseractLoadingPromise;
  },

  async runOcr() {
    if (!this.sourceImage) {
      this.app?.showToast("Please capture or upload a screenshot first.", "info");
      return;
    }

    try {
      this.updateStatusPill("Loading OCR Engine...", "#f59e0b");
      const Tesseract = await this.loadTesseract();
      this.updateStatusPill("Extracting Text...", "#f59e0b");

      const ocrCanvas = document.createElement("canvas");
      ocrCanvas.width = this.sourceImage.naturalWidth;
      ocrCanvas.height = this.sourceImage.naturalHeight;
      const oCtx = ocrCanvas.getContext("2d");
      oCtx.drawImage(this.sourceImage, 0, 0);

      // Burn active redactions onto OCR canvas to protect user privacy
      const innerBounds = this.computeInnerImageBounds();
      if (innerBounds && this.annotations.length > 0) {
        this.annotations.forEach(ann => {
          if (ann.type === "blackout" || ann.type === "blur") {
            const rx = Math.max(0, ((ann.x - innerBounds.x) / innerBounds.w) * this.sourceImage.naturalWidth);
            const ry = Math.max(0, ((ann.y - innerBounds.y) / innerBounds.h) * this.sourceImage.naturalHeight);
            const rw = (ann.w / innerBounds.w) * this.sourceImage.naturalWidth;
            const rh = (ann.h / innerBounds.h) * this.sourceImage.naturalHeight;

            oCtx.fillStyle = "#000000";
            oCtx.fillRect(rx, ry, rw, rh);
          }
        });
      }

      const result = await Tesseract.recognize(ocrCanvas, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            const pct = Math.round((m.progress || 0) * 100);
            this.updateStatusPill(`OCR: ${pct}%`, "#f59e0b");
          }
        }
      });

      const extractedText = (result?.data?.text || "").trim();
      this.updateStatusPill("Ready", "#00f2fe");

      if (!extractedText) {
        this.app?.showToast("No readable text detected in this screenshot.", "info");
        return;
      }

      const overlay = this.container.querySelector("#sc-ocr-overlay");
      const textarea = this.container.querySelector("#sc-ocr-result-text");
      const meta = this.container.querySelector("#sc-ocr-meta");
      if (overlay && textarea) {
        textarea.value = extractedText;
        if (meta) {
          const words = extractedText.split(/\s+/).filter(Boolean).length;
          meta.textContent = `${extractedText.length} characters • ${words} words • Client-Side OCR`;
        }
        overlay.style.display = "flex";
      }
      this.app?.showToast("Text extracted successfully!", "success");
    } catch (err) {
      console.error("OCR error:", err);
      this.updateStatusPill("Ready", "#00f2fe");
      this.app?.showToast("OCR Error: " + err.message, "error");
    }
  },

  pushUndoState(customEntry) {
    if (customEntry) {
      this.undoStack.push({
        ...customEntry,
        nextStepNum: customEntry.nextStepNum ?? this.nextStepNum
      });
    } else {
      this.undoStack.push({
        isCropAction: false,
        annotations: JSON.parse(JSON.stringify(this.annotations)),
        nextStepNum: this.nextStepNum
      });
    }
    this.redoStack = [];
    if (this.undoStack.length > 30) this.undoStack.shift();
  },

  undo() {
    if (this.undoStack.length > 0) {
      const state = this.undoStack.pop();
      if (state.isCropAction) {
        this.redoStack.push({
          isCropAction: true,
          previousImage: this.sourceImage,
          previousAnnotations: JSON.parse(JSON.stringify(this.annotations)),
          nextStepNum: this.nextStepNum
        });
        this.sourceImage = state.previousImage;
        this.annotations = state.previousAnnotations || [];
        if (state.nextStepNum !== undefined) {
          this.nextStepNum = state.nextStepNum;
          const counterInput = this.container?.querySelector("#sc-step-counter");
          if (counterInput) counterInput.value = this.nextStepNum;
        }
        this.selectedAnnotationIndex = -1;
        this.renderMaster();
        this.app?.showToast("Undone screenshot transform", "info");
        return;
      }

      this.redoStack.push({
        isCropAction: false,
        annotations: JSON.parse(JSON.stringify(this.annotations)),
        nextStepNum: this.nextStepNum
      });
      this.annotations = state.annotations || [];
      if (state.nextStepNum !== undefined) {
        this.nextStepNum = state.nextStepNum;
        const counterInput = this.container?.querySelector("#sc-step-counter");
        if (counterInput) counterInput.value = this.nextStepNum;
      }
      this.selectedAnnotationIndex = -1;
      this.renderMaster();
      this.app?.showToast("Undone last annotation", "info");
    }
  },

  redo() {
    if (this.redoStack.length > 0) {
      const state = this.redoStack.pop();
      if (state.isCropAction) {
        this.undoStack.push({
          isCropAction: true,
          previousImage: this.sourceImage,
          previousAnnotations: JSON.parse(JSON.stringify(this.annotations)),
          nextStepNum: this.nextStepNum
        });
        this.sourceImage = state.previousImage;
        this.annotations = state.previousAnnotations || [];
        if (state.nextStepNum !== undefined) {
          this.nextStepNum = state.nextStepNum;
          const counterInput = this.container?.querySelector("#sc-step-counter");
          if (counterInput) counterInput.value = this.nextStepNum;
        }
        this.selectedAnnotationIndex = -1;
        this.renderMaster();
        this.app?.showToast("Redone screenshot transform", "info");
        return;
      }

      this.undoStack.push({
        isCropAction: false,
        annotations: JSON.parse(JSON.stringify(this.annotations)),
        nextStepNum: this.nextStepNum
      });
      this.annotations = state.annotations || [];
      if (state.nextStepNum !== undefined) {
        this.nextStepNum = state.nextStepNum;
        const counterInput = this.container?.querySelector("#sc-step-counter");
        if (counterInput) counterInput.value = this.nextStepNum;
      }
      this.selectedAnnotationIndex = -1;
      this.renderMaster();
      this.app?.showToast("Redone annotation", "info");
    }
  },

  findAnnotationAt(x, y) {
    for (let i = this.annotations.length - 1; i >= 0; i--) {
      const ann = this.annotations[i];
      if (ann.type === "rect" || ann.type === "blur" || ann.type === "blackout" || ann.type === "highlight" || ann.type === "spotlight") {
        if (x >= ann.x && x <= ann.x + ann.w && y >= ann.y && y <= ann.y + ann.h) return i;
      } else if (ann.type === "circle") {
        const dx = (x - ann.x) / ann.rx;
        const dy = (y - ann.y) / ann.ry;
        if ((dx * dx + dy * dy) <= 1) return i;
      } else if (ann.type === "step") {
        if (Math.hypot(x - ann.x, y - ann.y) <= 18) return i;
      } else if (ann.type === "text") {
        const fSize = ann.fontSize || 18;
        if (x >= ann.x - 12 && x <= ann.x + 220 && y >= ann.y - fSize - 8 && y <= ann.y + 12) return i;
      } else if (ann.type === "loupe") {
        if (Math.hypot(x - ann.cx, y - ann.cy) <= (ann.radius || 45)) return i;
      } else if (ann.type === "arrow") {
        const dist = this.distanceToLineSegment(x, y, ann.startX, ann.startY, ann.endX, ann.endY);
        if (dist <= 14) return i;
      } else if (ann.type === "pen" && ann.points) {
        for (const pt of ann.points) {
          if (Math.hypot(x - pt.x, y - pt.y) <= 14) return i;
        }
      } else if (ann.type === "watermark") {
        if (Math.hypot(x - ann.x, y - ann.y) <= 60) return i;
      }
    }
    return -1;
  },

  distanceToLineSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return Math.hypot(px - x1, py - y1);
    let t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  },

  moveAnnotation(idx, dx, dy) {
    const ann = this.annotations[idx];
    if (!ann) return;
    if (ann.x !== undefined) ann.x += dx;
    if (ann.y !== undefined) ann.y += dy;
    if (ann.cx !== undefined) ann.cx += dx;
    if (ann.cy !== undefined) ann.cy += dy;
    if (ann.startX !== undefined) { ann.startX += dx; ann.endX += dx; }
    if (ann.startY !== undefined) { ann.startY += dy; ann.endY += dy; }
    if (ann.points) {
      ann.points.forEach(p => { p.x += dx; p.y += dy; });
    }
  },

  setupCanvasInteractions() {
    const canvas = this.masterCanvas;
    if (!canvas) return;

    const getCanvasCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches?.[0]?.clientX || 0);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches?.[0]?.clientY || 0);
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const handlePointerDown = (e) => {
      const pos = getCanvasCoords(e);

      if (this.activeTool === "select") {
        const hitIdx = this.findAnnotationAt(pos.x, pos.y);
        if (hitIdx >= 0) {
          this.selectedAnnotationIndex = hitIdx;
          this.isDraggingAnnotation = true;
          this.dragAnnotationStart = pos;
          this.renderMaster();
        } else {
          this.selectedAnnotationIndex = -1;
          this.renderMaster();
        }
        return;
      }

      if (this.activeTool === "eyedropper") {
        this.samplePixelColor(pos.x, pos.y);
        return;
      }

      if (this.activeTool === "text") {
        this.openTextDialog(pos);
        return;
      }

      if (this.activeTool === "step") {
        this.pushUndoState();
        this.annotations.push({
          type: "step",
          x: pos.x,
          y: pos.y,
          num: this.nextStepNum,
          color: this.currentColor
        });
        this.nextStepNum++;
        const counterInput = this.container.querySelector("#sc-step-counter");
        if (counterInput) counterInput.value = this.nextStepNum;
        this.playAudioBeep(880, 0.05);
        this.renderMaster();
        return;
      }

      if (this.activeTool === "pen") {
        this.isDrawing = true;
        this.currentPath = [{ x: pos.x, y: pos.y }];
        this.renderMaster(true);
        return;
      }

      this.isDrawing = true;
      this.dragStart = pos;
      this.currentDragRect = { x: pos.x, y: pos.y, w: 0, h: 0 };

      if (canvas.setPointerCapture && e.pointerId) {
        try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      }
    };

    const handlePointerMove = (e) => {
      const pos = getCanvasCoords(e);

      if (this.isDraggingAnnotation && this.selectedAnnotationIndex >= 0 && this.dragAnnotationStart) {
        const dx = pos.x - this.dragAnnotationStart.x;
        const dy = pos.y - this.dragAnnotationStart.y;
        this.moveAnnotation(this.selectedAnnotationIndex, dx, dy);
        this.dragAnnotationStart = pos;
        this.renderMaster();
        return;
      }

      if (!this.isDrawing) return;

      if (this.activeTool === "pen" && this.currentPath) {
        this.currentPath.push({ x: pos.x, y: pos.y });
        this.renderMaster(true);
        return;
      }

      if (!this.dragStart) return;

      this.currentDragRect = {
        x: Math.min(this.dragStart.x, pos.x),
        y: Math.min(this.dragStart.y, pos.y),
        w: Math.abs(pos.x - this.dragStart.x),
        h: Math.abs(pos.y - this.dragStart.y),
        endX: pos.x,
        endY: pos.y
      };
      this.renderMaster(true);
    };

    const handlePointerUp = (e) => {
      if (this.isDraggingAnnotation) {
        this.isDraggingAnnotation = false;
        this.dragAnnotationStart = null;
        this.pushUndoState();
        return;
      }

      if (!this.isDrawing) return;

      this.isDrawing = false;

      if (canvas.releasePointerCapture && e.pointerId) {
        try { canvas.releasePointerCapture(e.pointerId); } catch (_) {}
      }

      if (this.activeTool === "pen" && this.currentPath && this.currentPath.length > 1) {
        this.pushUndoState();
        this.annotations.push({
          type: "pen",
          points: this.currentPath,
          color: this.currentColor,
          width: this.strokeWidth
        });
        this.currentPath = null;
        this.renderMaster();
        return;
      }

      if (!this.dragStart || !this.currentDragRect) {
        this.renderMaster();
        return;
      }

      const rect = this.currentDragRect;

      if (rect.w > 4 || rect.h > 4) {
        this.pushUndoState();

        if (this.activeTool === "rect") {
          this.annotations.push({
            type: "rect",
            x: rect.x, y: rect.y, w: rect.w, h: rect.h,
            color: this.currentColor,
            width: this.strokeWidth
          });
        } else if (this.activeTool === "circle") {
          this.annotations.push({
            type: "circle",
            x: rect.x + rect.w / 2,
            y: rect.y + rect.h / 2,
            rx: rect.w / 2,
            ry: rect.h / 2,
            color: this.currentColor,
            width: this.strokeWidth
          });
        } else if (this.activeTool === "highlight") {
          this.annotations.push({
            type: "highlight",
            x: rect.x, y: rect.y, w: rect.w, h: rect.h,
            color: this.currentColor
          });
        } else if (this.activeTool === "blur") {
          this.annotations.push({
            type: "blur",
            x: rect.x, y: rect.y, w: rect.w, h: rect.h
          });
          this.app?.showToast("Pixelated sensitive area", "success");
        } else if (this.activeTool === "blackout") {
          this.annotations.push({
            type: "blackout",
            x: rect.x, y: rect.y, w: rect.w, h: rect.h,
            color: "#000000"
          });
          this.app?.showToast("Solid blackout privacy redaction applied", "success");
        } else if (this.activeTool === "spotlight") {
          this.annotations.push({
            type: "spotlight",
            x: rect.x, y: rect.y, w: rect.w, h: rect.h
          });
          this.app?.showToast("Focused area with spotlight dimmer", "success");
        } else if (this.activeTool === "arrow") {
          this.annotations.push({
            type: "arrow",
            startX: this.dragStart.x,
            startY: this.dragStart.y,
            endX: rect.endX ?? (this.dragStart.x + rect.w),
            endY: rect.endY ?? (this.dragStart.y + rect.h),
            color: this.currentColor,
            width: this.strokeWidth
          });
        } else if (this.activeTool === "loupe") {
          this.annotations.push({
            type: "loupe",
            cx: rect.x + rect.w / 2,
            cy: rect.y + rect.h / 2,
            radius: Math.max(rect.w, rect.h) / 2
          });
        } else if (this.activeTool === "crop") {
          this.applyImageCrop(rect);
        }
      }

      this.dragStart = null;
      this.currentDragRect = null;
      this.currentPath = null;
      this.renderMaster();
    };

    canvas.addEventListener("pointerdown", handlePointerDown);

    this.boundPointerMove = handlePointerMove;
    this.boundPointerUp = handlePointerUp;
    window.addEventListener("pointermove", this.boundPointerMove);
    window.addEventListener("pointerup", this.boundPointerUp);
  },

  applyImageCrop(cropBox) {
    if (!this.sourceImage) return;
    const imgBounds = this.computeInnerImageBounds();
    if (!imgBounds) return;

    const sx = ((cropBox.x - imgBounds.x) / imgBounds.w) * this.sourceImage.naturalWidth;
    const sy = ((cropBox.y - imgBounds.y) / imgBounds.h) * this.sourceImage.naturalHeight;
    const sw = (cropBox.w / imgBounds.w) * this.sourceImage.naturalWidth;
    const sh = (cropBox.h / imgBounds.h) * this.sourceImage.naturalHeight;

    const clampedSx = Math.max(0, Math.min(this.sourceImage.naturalWidth - 10, sx));
    const clampedSy = Math.max(0, Math.min(this.sourceImage.naturalHeight - 10, sy));
    const clampedSw = Math.max(10, Math.min(this.sourceImage.naturalWidth - clampedSx, sw));
    const clampedSh = Math.max(10, Math.min(this.sourceImage.naturalHeight - clampedSy, sh));

    if (clampedSw <= 10 || clampedSh <= 10) return;

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = Math.max(1, Math.round(clampedSw));
    cropCanvas.height = Math.max(1, Math.round(clampedSh));
    const cCtx = cropCanvas.getContext("2d");

    cCtx.drawImage(
      this.sourceImage,
      clampedSx, clampedSy, clampedSw, clampedSh,
      0, 0, cropCanvas.width, cropCanvas.height
    );

    const croppedImg = new Image();
    croppedImg.onload = () => {
      this.pushUndoState({
        isCropAction: true,
        previousImage: this.sourceImage,
        previousAnnotations: JSON.parse(JSON.stringify(this.annotations)),
        nextStepNum: this.nextStepNum
      });
      this.sourceImage = croppedImg;
      this.annotations = [];
      this.selectedAnnotationIndex = -1;
      this.renderMaster();
      this.app?.showToast("Cropped screenshot successfully! (Press Ctrl+Z to undo)", "success");
    };
    croppedImg.src = cropCanvas.toDataURL("image/png");
  },

  rotateImage(angleDegrees = 90) {
    if (!this.sourceImage) return;
    const off = document.createElement("canvas");
    if (angleDegrees === 90 || angleDegrees === 270) {
      off.width = this.sourceImage.naturalHeight;
      off.height = this.sourceImage.naturalWidth;
    } else {
      off.width = this.sourceImage.naturalWidth;
      off.height = this.sourceImage.naturalHeight;
    }
    const ctx = off.getContext("2d");
    ctx.translate(off.width / 2, off.height / 2);
    ctx.rotate((angleDegrees * Math.PI) / 180);
    ctx.drawImage(this.sourceImage, -this.sourceImage.naturalWidth / 2, -this.sourceImage.naturalHeight / 2);

    const rotatedImg = new Image();
    rotatedImg.onload = () => {
      this.pushUndoState({
        isCropAction: true,
        previousImage: this.sourceImage,
        previousAnnotations: JSON.parse(JSON.stringify(this.annotations)),
        nextStepNum: this.nextStepNum
      });
      this.sourceImage = rotatedImg;
      this.selectedAnnotationIndex = -1;
      this.renderMaster();
      this.app?.showToast(`Rotated screenshot ${angleDegrees}°`, "info");
    };
    rotatedImg.src = off.toDataURL("image/png");
  },

  flipImageHorizontal() {
    if (!this.sourceImage) return;
    const off = document.createElement("canvas");
    off.width = this.sourceImage.naturalWidth;
    off.height = this.sourceImage.naturalHeight;
    const ctx = off.getContext("2d");
    ctx.translate(off.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(this.sourceImage, 0, 0);

    const flippedImg = new Image();
    flippedImg.onload = () => {
      this.pushUndoState({
        isCropAction: true,
        previousImage: this.sourceImage,
        previousAnnotations: JSON.parse(JSON.stringify(this.annotations)),
        nextStepNum: this.nextStepNum
      });
      this.sourceImage = flippedImg;
      this.selectedAnnotationIndex = -1;
      this.renderMaster();
      this.app?.showToast("Flipped screenshot horizontally", "info");
    };
    flippedImg.src = off.toDataURL("image/png");
  },

  addWatermarkStamp() {
    if (!this.sourceImage) return;
    const dateStr = new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    const timeStr = new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    const stampText = `OmniTool Hub • ${dateStr} ${timeStr}`;

    const innerBounds = this.computeInnerImageBounds();
    const x = innerBounds ? (innerBounds.x + innerBounds.w - 18) : (this.masterCanvas.width - 24);
    const y = innerBounds ? (innerBounds.y + innerBounds.h - 14) : (this.masterCanvas.height - 24);

    this.pushUndoState();
    this.annotations.push({
      type: "watermark",
      x,
      y,
      text: stampText,
      color: "#ffffff"
    });
    this.renderMaster();
    this.app?.showToast("Added timestamp & watermark stamp", "success");
  },

  samplePixelColor(canvasX, canvasY) {
    const ctx = this.masterCtx;
    if (!ctx) return;
    const clX = Math.max(0, Math.min(ctx.canvas.width - 1, Math.round(canvasX)));
    const clY = Math.max(0, Math.min(ctx.canvas.height - 1, Math.round(canvasY)));
    const pixel = ctx.getImageData(clX, clY, 1, 1).data;
    const hex = "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
    
    try { navigator.clipboard.writeText(hex); } catch (_) {}

    const badge = this.container?.querySelector("#sc-eyedropper-badge");
    const preview = this.container?.querySelector("#sc-sample-color-preview");
    const label = this.container?.querySelector("#sc-sample-color-text");

    if (badge && preview && label) {
      badge.style.display = "flex";
      preview.style.background = hex;
      label.textContent = `${hex.toUpperCase()} (rgb ${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    }

    this.currentColor = hex;

    // Synchronize UI custom color picker input
    const colorInput = this.container?.querySelector("#sc-custom-color");
    if (colorInput) colorInput.value = hex;

    // Highlight matching chip or deselect predefined chips
    const chips = this.container?.querySelectorAll(".sc-color-chip");
    chips?.forEach(c => {
      c.style.borderColor = (c.getAttribute("data-color").toLowerCase() === hex.toLowerCase()) ? "#fff" : "transparent";
    });

    this.app?.showToast(`Sampled color: ${hex.toUpperCase()} (copied)`, "success");
    this.switchToMarkupTool("select");
  },

  computeInnerImageBounds() {
    const canvas = this.masterCanvas;
    if (!canvas || !this.sourceImage) return null;

    const padding = (this.config.mockupTheme === "none") ? 0 : this.config.backdropPadding;
    const headerHeight = (this.config.mockupTheme === "none" || this.config.mockupTheme === "minimal") ? 0 : 38;
    const bottomClearance = (this.config.mockupTheme === "phone") ? 18 : 0;

    const rawW = this.sourceImage.naturalWidth || 1200;
    const rawH = this.sourceImage.naturalHeight || 700;

    let targetW = canvas.width;
    let targetH = canvas.height;

    const maxWinW = Math.max(100, targetW - (padding * 2));
    const maxWinH = Math.max(100, targetH - (padding * 2));

    let winW = maxWinW;
    let winH = maxWinH;

    if (this.config.aspectRatio !== "auto") {
      const naturalMockupRatio = rawW / (rawH + headerHeight + bottomClearance);
      if (maxWinW / maxWinH > naturalMockupRatio) {
        winH = maxWinH;
        winW = Math.round(winH * naturalMockupRatio);
      } else {
        winW = maxWinW;
        winH = Math.round(winW / naturalMockupRatio);
      }
    }

    const winX = Math.round((targetW - winW) / 2);
    const winY = Math.round((targetH - winH) / 2);

    return {
      x: winX,
      y: winY + headerHeight,
      w: winW,
      h: winH - headerHeight - bottomClearance
    };
  },

  renderMaster(isInteracting = false) {
    const canvas = this.masterCanvas;
    const ctx = this.masterCtx;
    if (!canvas || !ctx) return;

    if (!this.sourceImage) {
      canvas.width = 1200;
      canvas.height = 700;
      this.drawEmptyBackdrop(ctx, canvas.width, canvas.height);
      return;
    }

    const rawW = this.sourceImage.naturalWidth || 1200;
    const rawH = this.sourceImage.naturalHeight || 700;

    const padding = (this.config.mockupTheme === "none") ? 0 : this.config.backdropPadding;
    const headerHeight = (this.config.mockupTheme === "none" || this.config.mockupTheme === "minimal") ? 0 : 38;
    const bottomClearance = (this.config.mockupTheme === "phone") ? 18 : 0;

    let targetW = rawW + (padding * 2);
    let targetH = rawH + headerHeight + bottomClearance + (padding * 2);

    if (this.config.aspectRatio === "16-9") {
      targetH = Math.round(targetW * (9 / 16));
    } else if (this.config.aspectRatio === "1-1") {
      targetH = targetW;
    } else if (this.config.aspectRatio === "4-3") {
      targetH = Math.round(targetW * (3 / 4));
    } else if (this.config.aspectRatio === "twitter") {
      targetW = 1200;
      targetH = 675;
    } else if (this.config.aspectRatio === "og") {
      targetW = 1200;
      targetH = 630;
    } else if (this.config.aspectRatio === "9-16") {
      targetW = Math.round(targetH * (9 / 16));
    }

    canvas.width = targetW;
    canvas.height = targetH;

    const resLabel = this.container?.querySelector("#sc-canvas-res-label");
    if (resLabel) resLabel.textContent = `${targetW} × ${targetH} px`;

    this.renderMasterToContext(ctx, targetW, targetH, isInteracting);
  },

  renderMasterToContext(ctx, targetW, targetH, isInteracting = false) {
    if (!this.sourceImage) return;

    const rawW = this.sourceImage.naturalWidth || 1200;
    const rawH = this.sourceImage.naturalHeight || 700;

    const padding = (this.config.mockupTheme === "none") ? 0 : this.config.backdropPadding;
    const headerHeight = (this.config.mockupTheme === "none" || this.config.mockupTheme === "minimal") ? 0 : 38;
    const bottomClearance = (this.config.mockupTheme === "phone") ? 18 : 0;

    // 1. Draw Canvas Backdrop
    this.drawBackdrop(ctx, targetW, targetH);

    // 2. Compute Proportional Window Mockup Dimensions
    const maxWinW = Math.max(100, targetW - (padding * 2));
    const maxWinH = Math.max(100, targetH - (padding * 2));

    let winW = maxWinW;
    let winH = maxWinH;

    if (this.config.aspectRatio !== "auto") {
      const naturalMockupRatio = rawW / (rawH + headerHeight + bottomClearance);
      if (maxWinW / maxWinH > naturalMockupRatio) {
        winH = maxWinH;
        winW = Math.round(winH * naturalMockupRatio);
      } else {
        winW = maxWinW;
        winH = Math.round(winW / naturalMockupRatio);
      }
    }

    const winX = Math.round((targetW - winW) / 2);
    const winY = Math.round((targetH - winH) / 2);

    this.drawWindowMockup(ctx, winX, winY, winW, winH, headerHeight);

    // 3. Draw Screenshot Image Content
    const innerX = winX;
    const innerY = winY + headerHeight;
    const innerW = winW;
    const innerH = winH - headerHeight - bottomClearance;

    this.drawScreenshotContent(ctx, innerX, innerY, innerW, innerH);

    // 4. Render All Markup & Annotations
    const innerBounds = { x: innerX, y: innerY, w: innerW, h: innerH };
    this.drawAnnotations(ctx, innerBounds);

    // 5. Draw Active Drag Interaction Overlay (live preview)
    if (isInteracting && (this.currentDragRect || this.currentPath)) {
      this.drawInteractiveOverlay(ctx, this.currentDragRect);
    }
  },

  getExportCanvas(scale = this.config.exportScale) {
    if (scale <= 1 || !this.masterCanvas) return this.masterCanvas;

    const targetW = this.masterCanvas.width;
    const targetH = this.masterCanvas.height;

    const offCanvas = document.createElement("canvas");
    offCanvas.width = targetW * scale;
    offCanvas.height = targetH * scale;

    const offCtx = offCanvas.getContext("2d");
    offCtx.scale(scale, scale);

    this.renderMasterToContext(offCtx, targetW, targetH, false);
    return offCanvas;
  },

  drawBackdrop(ctx, width, height) {
    if (this.config.backdropType === "transparent") {
      ctx.clearRect(0, 0, width, height);
      const size = 16;
      ctx.fillStyle = "#1e293b";
      for (let x = 0; x < width; x += size * 2) {
        for (let y = 0; y < height; y += size * 2) {
          ctx.fillRect(x, y, size, size);
          ctx.fillRect(x + size, y + size, size, size);
        }
      }
      ctx.fillStyle = "#0f172a";
      for (let x = 0; x < width; x += size * 2) {
        for (let y = 0; y < height; y += size * 2) {
          ctx.fillRect(x + size, y, size, size);
          ctx.fillRect(x, y + size, size, size);
        }
      }
      return;
    }

    if (this.config.backdropType === "solid") {
      ctx.fillStyle = this.config.backdropColor || "#0f172a";
      ctx.fillRect(0, 0, width, height);
      return;
    }

    if (this.config.backdropType === "frosted" && this.sourceImage) {
      ctx.save();
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, width, height);

      // Fast, ultra-smooth frosted ambient wallpaper
      const blurCanvas = document.createElement("canvas");
      blurCanvas.width = 160;
      blurCanvas.height = Math.round(160 * (this.sourceImage.naturalHeight / this.sourceImage.naturalWidth));
      const bCtx = blurCanvas.getContext("2d");
      bCtx.drawImage(this.sourceImage, 0, 0, blurCanvas.width, blurCanvas.height);

      ctx.filter = "blur(32px) brightness(0.65) saturate(1.4)";
      ctx.drawImage(blurCanvas, -40, -40, width + 80, height + 80);
      ctx.filter = "none";

      const vig = ctx.createRadialGradient(width / 2, height / 2, width * 0.15, width / 2, height / 2, width * 0.75);
      vig.addColorStop(0, "rgba(0, 0, 0, 0.1)");
      vig.addColorStop(1, "rgba(9, 13, 22, 0.65)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
      return;
    }

    // Modern Gradients
    let grad = ctx.createLinearGradient(0, 0, width, height);
    const gType = this.config.backdropGradient;

    if (gType === "hyper-cyan") {
      grad.addColorStop(0, "#00f2fe");
      grad.addColorStop(1, "#4facfe");
    } else if (gType === "cosmic") {
      grad.addColorStop(0, "#7928ca");
      grad.addColorStop(1, "#ff0080");
    } else if (gType === "sunset") {
      grad.addColorStop(0, "#f97316");
      grad.addColorStop(1, "#ec4899");
    } else if (gType === "cyberpunk") {
      grad.addColorStop(0, "#090d16");
      grad.addColorStop(0.5, "#1e1b4b");
      grad.addColorStop(1, "#030712");
    } else if (gType === "emerald") {
      grad.addColorStop(0, "#059669");
      grad.addColorStop(1, "#10b981");
    } else if (gType === "aurora") {
      grad.addColorStop(0, "#00f2fe");
      grad.addColorStop(1, "#10b981");
    } else if (gType === "midnight") {
      grad.addColorStop(0, "#1e293b");
      grad.addColorStop(1, "#090d16");
    } else {
      grad = ctx.createRadialGradient(width * 0.2, height * 0.2, 50, width * 0.5, height * 0.5, width * 0.8);
      grad.addColorStop(0, "#38bdf8");
      grad.addColorStop(1, "#090d16");
    }

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  },

  drawWindowMockup(ctx, x, y, w, h, headerHeight) {
    if (this.config.mockupTheme === "none") return;

    const r = this.config.cornerRadius;

    // 1. Draw Drop Shadow
    ctx.save();
    if (this.config.shadowStyle === "elevated") {
      ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
      ctx.shadowBlur = 35;
      ctx.shadowOffsetY = 18;
    } else if (this.config.shadowStyle === "subtle") {
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 8;
    } else if (this.config.shadowStyle === "glow") {
      ctx.shadowColor = "rgba(0, 242, 254, 0.4)";
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 0;
    }

    // Window Card Background
    const outerRadius = (this.config.mockupTheme === "phone") ? Math.min(38, r * 2.2) : r;
    this.roundRect(ctx, x, y, w, h, outerRadius);
    ctx.fillStyle = (this.config.mockupTheme === "macos-light") ? "#f1f5f9" : "#0f172a";
    ctx.fill();
    ctx.restore();

    // 2. Draw Window Header & Traffic Lights / Phone Bezels
    if (this.config.mockupTheme === "phone") {
      // Modern Smartphone Viewport (Dynamic Island, Status Bar, Bottom Home Bar)
      ctx.save();
      this.roundRect(ctx, x, y, w, h, outerRadius);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Top Status Bar Area & Dynamic Island
      const pillW = Math.min(106, w * 0.34);
      const pillH = 24;
      const pillX = x + (w / 2) - (pillW / 2);
      const pillY = y + 8;
      this.roundRect(ctx, pillX, pillY, pillW, pillH, 12);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Dynamic Island Lens Dot
      ctx.beginPath();
      ctx.arc(pillX + pillW - 16, pillY + (pillH / 2), 4, 0, Math.PI * 2);
      ctx.fillStyle = "#0f172a";
      ctx.fill();

      // Time
      ctx.font = "bold 11.5px Inter, system-ui, sans-serif";
      ctx.fillStyle = "#e2e8f0";
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";
      ctx.fillText("9:41", x + 24, pillY + (pillH / 2));

      // Right Icons
      const iconY = pillY + (pillH / 2);
      const rightEdge = x + w - 24;

      // Battery
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1;
      this.roundRect(ctx, rightEdge - 20, iconY - 5, 18, 10, 2.5);
      ctx.stroke();
      ctx.fillRect(rightEdge - 1, iconY - 2.5, 1.5, 5);
      ctx.fillStyle = "#10b981";
      ctx.fillRect(rightEdge - 18, iconY - 3.5, 12, 7);

      // WiFi
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(rightEdge - 30, iconY + 2, 7, -Math.PI * 0.75, -Math.PI * 0.25);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rightEdge - 30, iconY + 2, 4, -Math.PI * 0.75, -Math.PI * 0.25);
      ctx.stroke();

      // Cellular bars
      for (let b = 0; b < 4; b++) {
        const bh = 3 + (b * 2.2);
        ctx.fillStyle = "#e2e8f0";
        ctx.fillRect(rightEdge - 48 + (b * 3.5), iconY + 3 - bh, 2.2, bh);
      }

      // Bottom Home Swipe Bar
      const homeBarW = Math.min(130, w * 0.4);
      const homeBarH = 4.5;
      const homeBarX = x + (w / 2) - (homeBarW / 2);
      const homeBarY = y + h - 11;
      this.roundRect(ctx, homeBarX, homeBarY, homeBarW, homeBarH, 3);
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      ctx.fill();

      ctx.restore();
      return;
    }

    if (headerHeight > 0) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + headerHeight);
      ctx.lineTo(x, y + headerHeight);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
      ctx.clip();

      if (this.config.mockupTheme === "macos-dark") {
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(x, y, w, headerHeight);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.strokeRect(x, y, w, headerHeight);

        const dotY = y + (headerHeight / 2);
        const dots = [
          { color: "#ef4444", dx: 18 },
          { color: "#f59e0b", dx: 36 },
          { color: "#10b981", dx: 54 }
        ];
        dots.forEach(d => {
          ctx.beginPath();
          ctx.arc(x + d.dx, dotY, 5.5, 0, Math.PI * 2);
          ctx.fillStyle = d.color;
          ctx.fill();
        });

        const barW = Math.min(w * 0.55, 460);
        const barX = x + (w / 2) - (barW / 2);
        const barY = y + 7;
        const barH = headerHeight - 14;

        this.roundRect(ctx, barX, barY, barW, barH, 6);
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.stroke();

        ctx.font = "11.5px Inter, system-ui, sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const maxTextW = barW - (this.config.showSslLock ? 36 : 20);
        let displayUrl = this.config.urlText;
        if (ctx.measureText(displayUrl).width > maxTextW) {
          while (displayUrl.length > 4 && ctx.measureText(displayUrl + "...").width > maxTextW) {
            displayUrl = displayUrl.slice(0, -1);
          }
          displayUrl += "...";
        }
        const lockIcon = this.config.showSslLock ? "🔒 " : "";
        ctx.fillText(lockIcon + displayUrl, barX + (barW / 2), barY + (barH / 2));

      } else if (this.config.mockupTheme === "macos-light") {
        ctx.fillStyle = "#e2e8f0";
        ctx.fillRect(x, y, w, headerHeight);

        const dotY = y + (headerHeight / 2);
        [
          { color: "#ff5f56", dx: 18 },
          { color: "#ffbd2e", dx: 36 },
          { color: "#27c93f", dx: 54 }
        ].forEach(d => {
          ctx.beginPath();
          ctx.arc(x + d.dx, dotY, 5.5, 0, Math.PI * 2);
          ctx.fillStyle = d.color;
          ctx.fill();
        });

        const barW = Math.min(w * 0.55, 460);
        const barX = x + (w / 2) - (barW / 2);
        const barY = y + 7;
        const barH = headerHeight - 14;

        this.roundRect(ctx, barX, barY, barW, barH, 6);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
        ctx.stroke();

        ctx.font = "11.5px Inter, system-ui, sans-serif";
        ctx.fillStyle = "#475569";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const maxTextW = barW - (this.config.showSslLock ? 36 : 20);
        let displayUrl = this.config.urlText;
        if (ctx.measureText(displayUrl).width > maxTextW) {
          while (displayUrl.length > 4 && ctx.measureText(displayUrl + "...").width > maxTextW) {
            displayUrl = displayUrl.slice(0, -1);
          }
          displayUrl += "...";
        }
        const lockIcon = this.config.showSslLock ? "🔒 " : "";
        ctx.fillText(lockIcon + displayUrl, barX + (barW / 2), barY + (barH / 2));

      } else if (this.config.mockupTheme === "windows11") {
        ctx.fillStyle = "rgba(30, 41, 59, 0.85)";
        ctx.fillRect(x, y, w, headerHeight);

        ctx.font = "11px Segoe UI, system-ui, sans-serif";
        ctx.fillStyle = "#cbd5e1";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";

        const maxTitleW = Math.max(60, w - 100);
        let displayTitle = this.config.titleText;
        if (ctx.measureText(displayTitle).width > maxTitleW) {
          while (displayTitle.length > 4 && ctx.measureText(displayTitle + "...").width > maxTitleW) {
            displayTitle = displayTitle.slice(0, -1);
          }
          displayTitle += "...";
        }
        ctx.fillText(displayTitle, x + 16, y + (headerHeight / 2));

        const ctrlY = y + (headerHeight / 2);
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(x + w - 70, ctrlY);
        ctx.lineTo(x + w - 60, ctrlY);
        ctx.stroke();

        ctx.strokeRect(x + w - 46, ctrlY - 4.5, 9, 9);

        ctx.beginPath();
        ctx.moveTo(x + w - 24, ctrlY - 4.5);
        ctx.lineTo(x + w - 16, ctrlY + 4.5);
        ctx.moveTo(x + w - 16, ctrlY - 4.5);
        ctx.lineTo(x + w - 24, ctrlY + 4.5);
        ctx.stroke();

      } else if (this.config.mockupTheme === "cyberpunk") {
        ctx.fillStyle = "#090d16";
        ctx.fillRect(x, y, w, headerHeight);

        ctx.strokeStyle = "#00f2fe";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y + headerHeight);
        ctx.lineTo(x + w, y + headerHeight);
        ctx.stroke();

        ctx.font = "11.5px 'JetBrains Mono', monospace";
        ctx.fillStyle = "#00f2fe";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("root@omnitool:~# " + (this.config.urlText || "capture.sh"), x + 16, y + (headerHeight / 2));
      }

      ctx.restore();
    }
  },

  drawScreenshotContent(ctx, x, y, w, h) {
    if (!this.sourceImage) return;

    const r = (this.config.mockupTheme === "none") ? 0 : this.config.cornerRadius;
    const clipRadius = (this.config.mockupTheme === "phone") ? Math.min(28, r * 1.6) : r;

    ctx.save();
    if (clipRadius > 0) {
      this.roundRect(ctx, x, y, w, h, (this.config.mockupTheme === "minimal" || this.config.mockupTheme === "phone") ? clipRadius : [0, 0, clipRadius, clipRadius]);
      ctx.clip();
    }

    ctx.drawImage(this.sourceImage, 0, 0, this.sourceImage.naturalWidth, this.sourceImage.naturalHeight, x, y, w, h);
    ctx.restore();
  },

  drawAnnotations(ctx, innerBounds) {
    this.annotations.forEach((ann, idx) => {
      const isSelected = (idx === this.selectedAnnotationIndex);

      if (ann.type === "rect") {
        ctx.strokeStyle = ann.color || "#00f2fe";
        ctx.lineWidth = ann.width || 4;
        ctx.strokeRect(ann.x, ann.y, ann.w, ann.h);

      } else if (ann.type === "circle") {
        ctx.strokeStyle = ann.color || "#00f2fe";
        ctx.lineWidth = ann.width || 4;
        ctx.beginPath();
        ctx.ellipse(ann.x, ann.y, ann.rx, ann.ry, 0, 0, Math.PI * 2);
        ctx.stroke();

      } else if (ann.type === "highlight") {
        ctx.fillStyle = ann.color || "#f59e0b";
        ctx.globalAlpha = 0.35;
        ctx.fillRect(ann.x, ann.y, ann.w, ann.h);
        ctx.globalAlpha = 1.0;

      } else if (ann.type === "blur") {
        this.applyPixelationToCanvas(ctx, ann.x, ann.y, ann.w, ann.h, 10);

      } else if (ann.type === "blackout") {
        ctx.save();
        ctx.fillStyle = ann.color || "#000000";
        ctx.fillRect(ann.x, ann.y, ann.w, ann.h);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 1;
        ctx.strokeRect(ann.x, ann.y, ann.w, ann.h);
        ctx.restore();

      } else if (ann.type === "spotlight") {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
        ctx.fillRect(0, 0, ctx.canvas.width, ann.y);
        ctx.fillRect(0, ann.y, ann.x, ann.h);
        ctx.fillRect(ann.x + ann.w, ann.y, ctx.canvas.width - (ann.x + ann.w), ann.h);
        ctx.fillRect(0, ann.y + ann.h, ctx.canvas.width, ctx.canvas.height - (ann.y + ann.h));
        
        ctx.strokeStyle = "rgba(0, 242, 254, 0.85)";
        ctx.lineWidth = 2;
        ctx.strokeRect(ann.x, ann.y, ann.w, ann.h);
        ctx.restore();

      } else if (ann.type === "text") {
        ctx.save();
        const fSize = ann.fontSize || 18;
        ctx.font = `bold ${fSize}px Inter, system-ui, sans-serif`;
        const textW = ctx.measureText(ann.text).width;

        if (ann.badge) {
          ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
          ctx.shadowBlur = 12;
          ctx.shadowOffsetY = 4;

          this.roundRect(ctx, ann.x - 8, ann.y - fSize, textW + 16, fSize + 10, 6);
          ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
          ctx.fill();
          ctx.strokeStyle = ann.color || "#00f2fe";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = ann.color || "#00f2fe";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          ctx.fillText(ann.text, ann.x, ann.y - (fSize / 2) + 5);
        } else {
          ctx.strokeStyle = "rgba(0, 0, 0, 0.85)";
          ctx.lineWidth = 4;
          ctx.lineJoin = "round";
          ctx.strokeText(ann.text, ann.x, ann.y);
          ctx.fillStyle = ann.color || "#00f2fe";
          ctx.fillText(ann.text, ann.x, ann.y);
        }
        ctx.restore();

      } else if (ann.type === "step") {
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 3;

        ctx.beginPath();
        ctx.arc(ann.x, ann.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = ann.color || "#00f2fe";
        ctx.fill();
        ctx.restore();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = "bold 13px Inter, sans-serif";
        ctx.fillStyle = (ann.color === "#ffffff" || ann.color === "#00f2fe") ? "#0f172a" : "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ann.num.toString(), ann.x, ann.y + 0.5);

      } else if (ann.type === "arrow") {
        this.drawArrow(ctx, ann.startX, ann.startY, ann.endX, ann.endY, ann.color || "#00f2fe", ann.width || 4);

      } else if (ann.type === "pen" && ann.points && ann.points.length > 1) {
        ctx.save();
        ctx.strokeStyle = ann.color || "#00f2fe";
        ctx.lineWidth = ann.width || 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.beginPath();
        ctx.moveTo(ann.points[0].x, ann.points[0].y);
        for (let i = 1; i < ann.points.length; i++) {
          ctx.lineTo(ann.points[i].x, ann.points[i].y);
        }
        ctx.stroke();
        ctx.restore();

      } else if (ann.type === "loupe") {
        this.drawMagnifierLoupe(ctx, ann.cx, ann.cy, ann.radius || 45, innerBounds);

      } else if (ann.type === "watermark") {
        ctx.save();
        ctx.font = "600 11px Inter, system-ui, sans-serif";
        const wmW = ctx.measureText(ann.text).width;
        const boxX = ann.x - wmW - 16;
        const boxY = ann.y - 18;
        this.roundRect(ctx, boxX, boxY, wmW + 16, 22, 5);
        ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = ann.color || "#e2e8f0";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(ann.text, boxX + 8, boxY + 11);
        ctx.restore();
      }

      // Render selection outline if element is selected in Select mode
      if (isSelected && this.activeTool === "select") {
        ctx.save();
        ctx.strokeStyle = "#00f2fe";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);

        if (ann.w !== undefined && ann.h !== undefined) {
          ctx.strokeRect(ann.x - 3, ann.y - 3, ann.w + 6, ann.h + 6);
        } else if (ann.rx !== undefined && ann.ry !== undefined) {
          ctx.beginPath();
          ctx.ellipse(ann.x, ann.y, ann.rx + 4, ann.ry + 4, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else if (ann.type === "step") {
          ctx.beginPath();
          ctx.arc(ann.x, ann.y, 18, 0, Math.PI * 2);
          ctx.stroke();
        } else if (ann.type === "loupe") {
          ctx.beginPath();
          ctx.arc(ann.cx, ann.cy, (ann.radius || 45) + 4, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.restore();
      }
    });
  },

  drawInteractiveOverlay(ctx, rect) {
    ctx.save();

    if (this.activeTool === "pen" && this.currentPath && this.currentPath.length > 1) {
      ctx.strokeStyle = this.currentColor || "#00f2fe";
      ctx.lineWidth = this.strokeWidth || 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(this.currentPath[0].x, this.currentPath[0].y);
      for (let i = 1; i < this.currentPath.length; i++) {
        ctx.lineTo(this.currentPath[i].x, this.currentPath[i].y);
      }
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (!rect) {
      ctx.restore();
      return;
    }

    if (this.activeTool === "crop") {
      // Visual Crop Mask: Dim outer area with photography thirds grid
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.fillRect(0, 0, ctx.canvas.width, rect.y);
      ctx.fillRect(0, rect.y, rect.x, rect.h);
      ctx.fillRect(rect.x + rect.w, rect.y, ctx.canvas.width - (rect.x + rect.w), rect.h);
      ctx.fillRect(0, rect.y + rect.h, ctx.canvas.width, ctx.canvas.height - (rect.y + rect.h));

      ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(rect.x + rect.w / 3, rect.y);
      ctx.lineTo(rect.x + rect.w / 3, rect.y + rect.h);
      ctx.moveTo(rect.x + (rect.w * 2) / 3, rect.y);
      ctx.lineTo(rect.x + (rect.w * 2) / 3, rect.y + rect.h);
      ctx.moveTo(rect.x, rect.y + rect.h / 3);
      ctx.lineTo(rect.x + rect.w, rect.y + rect.h / 3);
      ctx.moveTo(rect.x, rect.y + (rect.h * 2) / 3);
      ctx.lineTo(rect.x + rect.w, rect.y + (rect.h * 2) / 3);
      ctx.stroke();

      ctx.setLineDash([]);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);

      const handleLen = Math.min(16, Math.min(rect.w, rect.h) / 3);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#00f2fe";
      ctx.beginPath();
      ctx.moveTo(rect.x, rect.y + handleLen); ctx.lineTo(rect.x, rect.y); ctx.lineTo(rect.x + handleLen, rect.y);
      ctx.moveTo(rect.x + rect.w - handleLen, rect.y); ctx.lineTo(rect.x + rect.w, rect.y); ctx.lineTo(rect.x + rect.w, rect.y + handleLen);
      ctx.moveTo(rect.x, rect.y + rect.h - handleLen); ctx.lineTo(rect.x, rect.y + rect.h); ctx.lineTo(rect.x + handleLen, rect.y + rect.h);
      ctx.moveTo(rect.x + rect.w - handleLen, rect.y + rect.h); ctx.lineTo(rect.x + rect.w, rect.y + rect.h); ctx.lineTo(rect.x + rect.w, rect.y + rect.h - handleLen);
      ctx.stroke();

      ctx.restore();
      return;
    }

    ctx.strokeStyle = "rgba(0, 242, 254, 0.85)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);

    if (this.activeTool === "circle") {
      ctx.beginPath();
      ctx.ellipse(rect.x + rect.w / 2, rect.y + rect.h / 2, rect.w / 2, rect.h / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else if (this.activeTool === "arrow") {
      this.drawArrow(ctx, this.dragStart.x, this.dragStart.y, rect.endX ?? (this.dragStart.x + rect.w), rect.endY ?? (this.dragStart.y + rect.h), "#00f2fe", 3);
    } else {
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
      ctx.fillStyle = (this.activeTool === "blur" || this.activeTool === "blackout") ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 242, 254, 0.1)";
      ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    }
    ctx.restore();
  },

  drawArrow(ctx, fromX, fromY, toX, toY, color, width) {
    const headLen = Math.max(12, width * 3.5);
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },

  drawMagnifierLoupe(ctx, cx, cy, radius, innerBounds) {
    const r = Math.max(25, radius);
    if (!this.sourceImage || !innerBounds) return;

    // Draw shadow circle FIRST before clipping
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.55)";
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 6;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "#0f172a";
    ctx.fill();
    ctx.restore();

    // Zoomed region clipping
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    const sx = ((cx - innerBounds.x) / innerBounds.w) * this.sourceImage.naturalWidth;
    const sy = ((cy - innerBounds.y) / innerBounds.h) * this.sourceImage.naturalHeight;
    const sRadiusX = (r / innerBounds.w) * this.sourceImage.naturalWidth * 0.5;
    const sRadiusY = (r / innerBounds.h) * this.sourceImage.naturalHeight * 0.5;

    ctx.drawImage(
      this.sourceImage,
      sx - sRadiusX, sy - sRadiusY, sRadiusX * 2, sRadiusY * 2,
      cx - r, cy - r, r * 2, r * 2
    );
    ctx.restore();

    // Glowing cyan Loupe border & reticle
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "#00f2fe";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.strokeStyle = "rgba(0, 242, 254, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx - 8, cy);
    ctx.lineTo(cx + 8, cy);
    ctx.moveTo(cx, cy - 8);
    ctx.lineTo(cx, cy + 8);
    ctx.stroke();

    ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
    ctx.beginPath();
    this.roundRect(ctx, cx + r - 24, cy + r - 14, 22, 12, 3);
    ctx.fill();
    ctx.font = "bold 9px monospace";
    ctx.fillStyle = "#00f2fe";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("2x", cx + r - 13, cy + r - 8);

    ctx.restore();
  },

  applyPixelationToCanvas(ctx, x, y, w, h, blockSize = 10) {
    if (w <= 0 || h <= 0) return;
    const rx = Math.max(0, Math.round(x));
    const ry = Math.max(0, Math.round(y));
    const rw = Math.min(ctx.canvas.width - rx, Math.round(w));
    const rh = Math.min(ctx.canvas.height - ry, Math.round(h));

    if (rw <= 0 || rh <= 0) return;

    try {
      // Offscreen downsampling & nearest-neighbor upscaling (CTM-safe and ultra-fast at 1x, 2x, 4x)
      const sampleW = Math.max(1, Math.round(rw / blockSize));
      const sampleH = Math.max(1, Math.round(rh / blockSize));

      const offCanvas = document.createElement("canvas");
      offCanvas.width = sampleW;
      offCanvas.height = sampleH;
      const offCtx = offCanvas.getContext("2d");

      offCtx.drawImage(ctx.canvas, rx, ry, rw, rh, 0, 0, sampleW, sampleH);

      ctx.save();
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offCanvas, 0, 0, sampleW, sampleH, rx, ry, rw, rh);
      ctx.restore();
    } catch (_) {}
  },

  roundRect(ctx, x, y, w, h, radius) {
    let r = radius;
    if (typeof r === "number") {
      r = [r, r, r, r];
    }
    const [tl, tr, br, bl] = r;

    ctx.beginPath();
    ctx.moveTo(x + tl, y);
    ctx.lineTo(x + w - tr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
    ctx.lineTo(x + w, y + h - br);
    ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    ctx.lineTo(x + bl, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
    ctx.lineTo(x, y + tl);
    ctx.quadraticCurveTo(x, y, x + tl, y);
    ctx.closePath();
  },

  drawEmptyBackdrop(ctx, width, height) {
    ctx.fillStyle = "#090d16";
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    ctx.font = "16px Inter, sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.textAlign = "center";
    ctx.fillText("Click 'Snap Window, Screen or Tab' or press Ctrl+V to paste a screenshot", width / 2, height / 2);
  },

  loadSampleScreen(type) {
    const sCanvas = document.createElement("canvas");
    sCanvas.width = 1280;
    sCanvas.height = 760;
    const sCtx = sCanvas.getContext("2d");

    if (type === "analytics") {
      sCtx.fillStyle = "#090d16";
      sCtx.fillRect(0, 0, 1280, 760);

      sCtx.fillStyle = "rgba(255, 255, 255, 0.04)";
      sCtx.fillRect(0, 0, 1280, 56);
      sCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      sCtx.strokeRect(0, 0, 1280, 56);

      sCtx.font = "bold 15px Outfit, Inter, sans-serif";
      sCtx.fillStyle = "#00f2fe";
      sCtx.fillText("⚡ OmniTool Analytics", 30, 34);

      const kpis = [
        { label: "Active Operations", val: "148,290", change: "+24.8%", color: "#10b981" },
        { label: "Client-Side Processing", val: "100.0%", change: "Zero Cloud", color: "#00f2fe" },
        { label: "Latency Benchmark", val: "1.2 ms", change: "Instant", color: "#9d4edd" },
        { label: "Privacy Rating", val: "A+ Verified", change: "Safe", color: "#f59e0b" }
      ];

      kpis.forEach((kpi, idx) => {
        const cx = 30 + (idx * 310);
        sCtx.fillStyle = "rgba(255, 255, 255, 0.02)";
        sCtx.fillRect(cx, 80, 290, 110);
        sCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        sCtx.strokeRect(cx, 80, 290, 110);

        sCtx.font = "12px Inter, sans-serif";
        sCtx.fillStyle = "#94a3b8";
        sCtx.fillText(kpi.label, cx + 16, 110);

        sCtx.font = "bold 26px 'JetBrains Mono', monospace";
        sCtx.fillStyle = "#f8fafc";
        sCtx.fillText(kpi.val, cx + 16, 148);

        sCtx.font = "11.5px Inter, sans-serif";
        sCtx.fillStyle = kpi.color;
        sCtx.fillText(kpi.change, cx + 16, 172);
      });

      sCtx.fillStyle = "rgba(255, 255, 255, 0.02)";
      sCtx.fillRect(30, 210, 1220, 510);
      sCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      sCtx.strokeRect(30, 210, 1220, 510);

      sCtx.font = "bold 14px Inter, sans-serif";
      sCtx.fillStyle = "#e2e8f0";
      sCtx.fillText("Throughput Execution Velocity (Requests / Sec)", 50, 245);

      sCtx.beginPath();
      const points = [
        [50, 620], [180, 540], [320, 580], [460, 420],
        [600, 470], [740, 340], [880, 390], [1020, 290], [1200, 310]
      ];
      sCtx.moveTo(points[0][0], points[0][1]);
      points.forEach(p => sCtx.lineTo(p[0], p[1]));

      const waveGrad = sCtx.createLinearGradient(0, 250, 0, 650);
      waveGrad.addColorStop(0, "rgba(0, 242, 254, 0.35)");
      waveGrad.addColorStop(1, "rgba(0, 242, 254, 0.0)");

      sCtx.lineTo(1200, 670);
      sCtx.lineTo(50, 670);
      sCtx.closePath();
      sCtx.fillStyle = waveGrad;
      sCtx.fill();

      sCtx.beginPath();
      sCtx.moveTo(points[0][0], points[0][1]);
      points.forEach(p => sCtx.lineTo(p[0], p[1]));
      sCtx.strokeStyle = "#00f2fe";
      sCtx.lineWidth = 3.5;
      sCtx.stroke();

    } else if (type === "code") {
      sCtx.fillStyle = "#0d1117";
      sCtx.fillRect(0, 0, 1280, 760);

      const codeLines = [
        "// OmniTool Hub - High-Velocity Client-Side Screenshot Engine",
        "import { captureDisplay, annotateFrame } from './screenshot-studio.js';",
        "",
        "export async function captureMasterpiece(options = {}) {",
        "  const stream = await navigator.mediaDevices.getDisplayMedia({",
        "    video: { displaySurface: 'browser' },",
        "    preferCurrentTab: true",
        "  });",
        "",
        "  const frame = await grabVideoFrame(stream);",
        "  const styled = applyWindowMockup(frame, {",
        "    theme: 'macos-dark',",
        "    url: 'https://omnitool.worldsneed.com/dashboard',",
        "    shadow: 'elevated',",
        "    padding: 44",
        "  });",
        "",
        "  return copyToClipboard(styled);",
        "}"
      ];

      codeLines.forEach((line, idx) => {
        const ly = 60 + (idx * 32);
        sCtx.font = "13px 'JetBrains Mono', monospace";
        sCtx.fillStyle = "#484f58";
        sCtx.fillText((idx + 1).toString().padStart(2, " "), 30, ly);

        sCtx.fillStyle = line.startsWith("//") ? "#8b949e" : line.includes("import") ? "#ff7b72" : line.includes("function") ? "#d2a8ff" : "#79c0ff";
        sCtx.fillText(line, 70, ly);
      });

    } else if (type === "terminal") {
      sCtx.fillStyle = "#020408";
      sCtx.fillRect(0, 0, 1280, 760);

      const logLines = [
        "[SYSTEM OK] Local WebAssembly runtime initialized.",
        "[NETWORK] Zero outgoing connections detected (100% offline).",
        "[DISPLAY] Native displaySurface attached at 3840x2160.",
        "[SECURITY] AES-GCM local keystore active.",
        "[READY] OmniTool Hub ready for capture..."
      ];

      sCtx.font = "14px 'JetBrains Mono', monospace";
      sCtx.fillStyle = "#10b981";
      logLines.forEach((l, i) => {
        sCtx.fillText(l, 40, 60 + (i * 38));
      });

    } else {
      sCtx.fillStyle = "#0b0f19";
      sCtx.fillRect(0, 0, 1280, 760);

      sCtx.font = "bold 44px Outfit, Inter, sans-serif";
      sCtx.fillStyle = "#ffffff";
      sCtx.fillText("The All-In-One Developer Workspace", 80, 200);

      sCtx.font = "20px Inter, sans-serif";
      sCtx.fillStyle = "#94a3b8";
      sCtx.fillText("50+ high-precision offline tools running 100% in your browser.", 80, 250);

      sCtx.fillStyle = "#00f2fe";
      sCtx.fillRect(80, 310, 200, 50);
      sCtx.font = "bold 15px Inter, sans-serif";
      sCtx.fillStyle = "#090d16";
      sCtx.fillText("Explore Tools ➔", 115, 342);
    }

    const img = new Image();
    img.onload = () => {
      this.setSourceImage(img);
    };
    img.src = sCanvas.toDataURL("image/png");
  },

  setupExportActions() {
    // 1. Copy to Clipboard
    const copyBtn = this.container.querySelector("#sc-btn-copy-clipboard");
    copyBtn?.addEventListener("click", async () => {
      await this.copyCanvasToClipboard();
    });

    // 2. Download Image Button
    const downloadBtn = this.container.querySelector("#sc-btn-download");
    downloadBtn?.addEventListener("click", () => {
      this.downloadExportImage();
    });

    // Scale toggles (1x vs 2x)
    const scale1x = this.container.querySelector("#sc-scale-1x");
    const scale2x = this.container.querySelector("#sc-scale-2x");

    scale1x?.addEventListener("click", () => {
      scale1x.classList.add("active");
      scale2x?.classList.remove("active");
      this.config.exportScale = 1;
      this.app?.showToast("Set resolution to 1x Standard", "info");
    });

    scale2x?.addEventListener("click", () => {
      scale2x.classList.add("active");
      scale1x?.classList.remove("active");
      this.config.exportScale = 2;
      this.app?.showToast("Set resolution multiplier to 2x (Ultra Retina 4K)", "info");
    });
  },

  async copyCanvasToClipboard() {
    const canvas = this.getExportCanvas(this.config.exportScale);
    if (!canvas) return;

    try {
      this.playShutterSound();
      if (typeof ClipboardItem !== "undefined") {
        const itemPromise = new Promise((resolve, reject) => {
          canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Canvas toBlob failed"));
          }, "image/png");
        });

        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": itemPromise })
        ]);
        this.app?.showToast(`Copied ${this.config.exportScale}x screenshot to clipboard! Ready to paste into Slack, Jira, Discord, or Docs.`, "success");
        return;
      }

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        this.app?.showToast(`Copied ${this.config.exportScale}x screenshot to clipboard!`, "success");
      }, "image/png");
    } catch (err) {
      console.warn("Clipboard API blocked, offering fallback download", err);
      this.app?.showToast("Could not copy directly. Downloading PNG instead.", "info");
      this.downloadExportImage("png");
    }
  },

  downloadExportImage(overrideFmt) {
    const format = overrideFmt || this.container.querySelector("#sc-export-format")?.value || "png";
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const filename = `omnitool-screenshot-${timestamp}`;

    if (format === "pdf") {
      this.exportPdf(filename);
      return;
    }

    const canvas = this.getExportCanvas(this.config.exportScale);
    if (!canvas) return;

    const mimeType = (format === "webp") ? "image/webp" : (format === "jpeg") ? "image/jpeg" : "image/png";
    const extension = (format === "jpeg") ? "jpg" : format;

    this.playAudioBeep(980, 0.08);

    const link = document.createElement("a");
    link.download = `${filename}.${extension}`;
    link.href = canvas.toDataURL(mimeType, 0.95);
    link.click();
    this.app?.showToast(`Downloaded ${filename}.${extension} (${this.config.exportScale}x resolution)`, "success");
  },

  loadPdfLib() {
    if (this.pdfLibLoadingPromise) return this.pdfLibLoadingPromise;
    this.pdfLibLoadingPromise = new Promise((resolve, reject) => {
      if (window.PDFLib) {
        resolve(window.PDFLib);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
      script.onload = () => resolve(window.PDFLib);
      script.onerror = () => {
        this.pdfLibLoadingPromise = null;
        reject(new Error("Failed to load PDF library"));
      };
      document.head.appendChild(script);
    });
    return this.pdfLibLoadingPromise;
  },

  generateNativePdfBytes(canvas) {
    const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.95);
    const base64Data = jpegDataUrl.split(",")[1];
    const binaryStr = atob(base64Data);
    const jpegBytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      jpegBytes[i] = binaryStr.charCodeAt(i);
    }

    const isLandscape = canvas.width >= canvas.height;
    const pageW = isLandscape ? 841.89 : 595.28;
    const pageH = isLandscape ? 595.28 : 841.89;

    const margin = 28;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    const imgAspect = canvas.width / canvas.height;
    let drawW = maxW;
    let drawH = drawW / imgAspect;
    if (drawH > maxH) {
      drawH = maxH;
      drawW = drawH * imgAspect;
    }
    const drawX = margin + (maxW - drawW) / 2;
    const drawY = margin + (maxH - drawH) / 2;

    const enc = new TextEncoder();
    // Standard PDF-1.4 header with 4 binary bytes (> 127) to indicate binary content
    const headerStr = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
    const headerBytes = enc.encode(headerStr);
    const offsets = [];
    let body = "";

    const addObj = (content) => {
      offsets.push(headerBytes.length + enc.encode(body).length);
      body += content + "\n";
    };

    addObj("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj");
    addObj("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj");
    addObj(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW.toFixed(2)} ${pageH.toFixed(2)}] /Resources << /XObject << /Im1 5 0 R >> /ProcSet [/PDF /ImageC] >> /Contents 4 0 R >>\nendobj`);

    const streamContent = `q ${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${drawX.toFixed(2)} ${drawY.toFixed(2)} cm /Im1 Do Q`;
    addObj(`4 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream\nendobj`);

    const obj5Header = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`;
    const obj5Footer = "\nendstream\nendobj\n";

    offsets.push(headerBytes.length + enc.encode(body).length);

    const bodyBytes = enc.encode(body + obj5Header);
    const part1 = new Uint8Array(headerBytes.length + bodyBytes.length);
    part1.set(headerBytes, 0);
    part1.set(bodyBytes, headerBytes.length);

    const part2 = jpegBytes;

    const footerBytes = enc.encode(obj5Footer);
    const xrefOffset = part1.length + part2.length + footerBytes.length;

    let xref = `${obj5Footer}xref\n0 6\n0000000000 65535 f \n`;
    for (let i = 0; i < 5; i++) {
      xref += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
    }
    xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
    const part3 = enc.encode(xref);

    const fullLength = part1.length + part2.length + part3.length;
    const finalBuffer = new Uint8Array(fullLength);
    finalBuffer.set(part1, 0);
    finalBuffer.set(part2, part1.length);
    finalBuffer.set(part3, part1.length + part2.length);

    return finalBuffer;
  },

  async exportPdf(filename) {
    const canvas = this.getExportCanvas(this.config.exportScale);
    if (!canvas) return;

    this.updateStatusPill("Generating PDF...", "#f59e0b");
    this.playAudioBeep(880, 0.08);

    try {
      let pdfBytes = null;
      try {
        const PDFLib = await this.loadPdfLib();
        if (PDFLib?.PDFDocument) {
          const pdfDoc = await PDFLib.PDFDocument.create();
          const isLandscape = canvas.width >= canvas.height;
          const pageW = isLandscape ? 841.89 : 595.28;
          const pageH = isLandscape ? 595.28 : 841.89;
          const page = pdfDoc.addPage([pageW, pageH]);

          const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.95);
          const embeddedImg = await pdfDoc.embedJpg(jpegDataUrl);

          const margin = 28;
          const maxW = pageW - margin * 2;
          const maxH = pageH - margin * 2;
          const imgAspect = canvas.width / canvas.height;
          let drawW = maxW;
          let drawH = drawW / imgAspect;
          if (drawH > maxH) {
            drawH = maxH;
            drawW = drawH * imgAspect;
          }
          const drawX = margin + (maxW - drawW) / 2;
          const drawY = margin + (maxH - drawH) / 2;

          page.drawImage(embeddedImg, { x: drawX, y: drawY, width: drawW, height: drawH });
          pdfBytes = await pdfDoc.save();
        }
      } catch (libErr) {
        console.warn("PDFLib load failed, using pure native PDF fallback:", libErr);
      }

      if (!pdfBytes) {
        pdfBytes = this.generateNativePdfBytes(canvas);
      }

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `${filename}.pdf`;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);

      this.updateStatusPill("Ready", "#00f2fe");
      this.app?.showToast(`Downloaded genuine ${filename}.pdf document!`, "success");
    } catch (err) {
      console.error("PDF export error:", err);
      this.app?.showToast("PDF generation failed, downloading PNG instead.", "error");
      this.downloadExportImage("png");
    }
  },

  updateStatusPill(text, color) {
    const pill = this.container?.querySelector("#sc-status-pill");
    const label = this.container?.querySelector("#sc-status-text");
    if (!pill || !label) return;

    label.textContent = text;
    pill.style.color = color;
    const dot = pill.querySelector("span:first-child");
    if (dot) dot.style.background = color;
  },

  loadHtml2Canvas() {
    if (this.html2canvasPromise) return this.html2canvasPromise;
    this.html2canvasPromise = new Promise((resolve, reject) => {
      if (window.html2canvas) {
        resolve(window.html2canvas);
        return;
      }
      this.updateStatusPill("Loading Canvas Engine...", "#f59e0b");
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
      script.onload = () => resolve(window.html2canvas);
      script.onerror = () => {
        this.html2canvasPromise = null;
        reject(new Error("Failed to load html2canvas library"));
      };
      document.head.appendChild(script);
    });
    return this.html2canvasPromise;
  },

  getBookmarkletScript() {
    return `javascript:(function(){
if(window.__omnitool_hud){window.__omnitool_hud.style.display='flex';return;}
function getH2C(cb){if(window.html2canvas)return cb(window.html2canvas);var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';s.onload=function(){cb(window.html2canvas);};s.onerror=function(){alert('Could not load html2canvas');};document.head.appendChild(s);}
var hud=document.createElement('div');hud.id='omnitool-hud';window.__omnitool_hud=hud;
hud.style.cssText='position:fixed;top:20px;right:20px;z-index:2147483647;background:#0f172a;color:#f8fafc;border:2px solid #00f2fe;border-radius:12px;padding:14px 16px;font-family:system-ui,-apple-system,sans-serif;box-shadow:0 20px 50px rgba(0,0,0,0.7);display:flex;flex-direction:column;gap:10px;font-size:12px;max-width:320px;backdrop-filter:blur(8px);';
hud.innerHTML='<div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.12);padding-bottom:8px;"><span style="font-weight:700;color:#00f2fe;">⚡ OmniTool Web Snapper</span><button id="ot-close" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:15px;">✕</button></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;"><button id="ot-edit" style="background:#1e293b;color:#fff;border:1px solid #334155;border-radius:6px;padding:7px;cursor:pointer;font-weight:600;font-size:11px;">✏️ Edit Text</button><button id="ot-del" style="background:#1e293b;color:#fff;border:1px solid #334155;border-radius:6px;padding:7px;cursor:pointer;font-weight:600;font-size:11px;">🗑️ Delete Mode</button></div><button id="ot-snip-elem" style="background:linear-gradient(135deg,#00f2fe,#4facfe);color:#090d16;border:none;border-radius:6px;padding:9px;cursor:pointer;font-weight:700;font-size:12px;">🎯 Snip Section / Scroll Frame</button><button id="ot-snip-full" style="background:#10b981;color:#fff;border:none;border-radius:6px;padding:9px;cursor:pointer;font-weight:700;font-size:12px;">📜 Snip Full Scrolling Page</button><div id="ot-msg" style="font-size:11px;color:#94a3b8;text-align:center;">Click any tool to begin</div>';
document.body.appendChild(hud);
var msg=hud.querySelector('#ot-msg');
hud.querySelector('#ot-close').onclick=function(){hud.remove();window.__omnitool_hud=null;};
var isEditing=false;
hud.querySelector('#ot-edit').onclick=function(){isEditing=!isEditing;document.designMode=isEditing?'on':'off';this.style.background=isEditing?'#00f2fe':'#1e293b';this.style.color=isEditing?'#090d16':'#fff';msg.textContent=isEditing?'Click anywhere on page to edit text directly!':'Edit mode disabled';};
var isDeleting=false;
var dOver=function(e){if(!isDeleting||hud.contains(e.target))return;e.target.style.outline='2px solid #ef4444';};
var dOut=function(e){if(!isDeleting||hud.contains(e.target))return;e.target.style.outline='';};
var dClick=function(e){if(!isDeleting||hud.contains(e.target))return;e.preventDefault();e.stopPropagation();e.target.remove();msg.textContent='Removed element! Click Delete Mode to exit.';};
hud.querySelector('#ot-del').onclick=function(){isDeleting=!isDeleting;this.style.background=isDeleting?'#ef4444':'#1e293b';msg.textContent=isDeleting?'Click any banner or element to delete it':'Delete mode disabled';if(isDeleting){document.addEventListener('mouseover',dOver,true);document.addEventListener('mouseout',dOut,true);document.addEventListener('click',dClick,true);}else{document.removeEventListener('mouseover',dOver,true);document.removeEventListener('mouseout',dOut,true);document.removeEventListener('click',dClick,true);}};
function captureAndDeliver(target,label){msg.textContent='Rendering '+label+'...';hud.style.display='none';getH2C(function(h2c){var opt={useCORS:true,allowTaint:true,scale:window.devicePixelRatio||2,logging:false};if(target.scrollHeight>target.clientHeight){opt.height=target.scrollHeight;opt.windowHeight=target.scrollHeight;}h2c(target,opt).then(function(canvas){hud.style.display='flex';canvas.toBlob(function(blob){if(!blob){msg.textContent='Capture failed';return;}var a=document.createElement('a');a.download='omnitool-section-'+Date.now()+'.png';a.href=URL.createObjectURL(blob);a.click();setTimeout(function(){URL.revokeObjectURL(a.href);},2000);if(navigator.clipboard&&window.ClipboardItem){navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){msg.textContent='✅ Saved PNG & copied! Paste (Ctrl+V) in OmniTool.';}).catch(function(){msg.textContent='✅ Saved PNG! Drop into OmniTool.';});}else{msg.textContent='✅ Saved PNG! Drop into OmniTool.';}},'image/png');}).catch(function(err){hud.style.display='flex';msg.textContent='Error: '+err.message;});});}
var isSnipping=false;
var sOver=function(e){if(!isSnipping||hud.contains(e.target))return;e.target.style.outline='3px solid #00f2fe';e.target.style.outlineOffset='2px';};
var sOut=function(e){if(!isSnipping||hud.contains(e.target))return;e.target.style.outline='';};
var sClick=function(e){if(!isSnipping||hud.contains(e.target))return;e.preventDefault();e.stopPropagation();var target=e.target;target.style.outline='';isSnipping=false;document.removeEventListener('mouseover',sOver,true);document.removeEventListener('mouseout',sOut,true);document.removeEventListener('click',sClick,true);captureAndDeliver(target,'section');};
hud.querySelector('#ot-snip-elem').onclick=function(){isSnipping=true;msg.textContent='Hover & click any section or scrollable box to capture it!';document.addEventListener('mouseover',sOver,true);document.addEventListener('mouseout',sOut,true);document.addEventListener('click',sClick,true);};
hud.querySelector('#ot-snip-full').onclick=function(){captureAndDeliver(document.documentElement,'full page');};
})();`;
  },

  setupBookmarkletEvents() {
    const openBtn = this.container?.querySelector("#sc-btn-open-bookmarklet");
    const overlay = this.container?.querySelector("#sc-bookmarklet-overlay");
    const closeBtn = this.container?.querySelector("#sc-bm-btn-close");
    const doneBtn = this.container?.querySelector("#sc-bm-btn-done");
    const copyBtn = this.container?.querySelector("#sc-bm-btn-copy");
    const dragLink = this.container?.querySelector("#sc-bookmarklet-drag-link");

    const scriptCode = this.getBookmarkletScript();
    if (dragLink) dragLink.setAttribute("href", scriptCode);

    const closeBm = () => { if (overlay) overlay.style.display = "none"; };

    openBtn?.addEventListener("click", () => {
      if (overlay) overlay.style.display = "flex";
    });

    closeBtn?.addEventListener("click", closeBm);
    doneBtn?.addEventListener("click", closeBm);
    overlay?.addEventListener("click", (e) => { if (e.target === overlay) closeBm(); });

    copyBtn?.addEventListener("click", () => {
      navigator.clipboard.writeText(scriptCode).then(() => {
        this.app?.showToast("Copied bookmarklet script to clipboard! Create a new bookmark and paste it as the URL.", "success");
      }).catch(() => {
        this.app?.showToast("Drag the button to your Bookmarks Bar directly.", "info");
      });
    });
  },

  setupHtmlSandboxEvents() {
    const openBtn = this.container?.querySelector("#sc-btn-open-html-sandbox");
    const quickBtn = this.container?.querySelector("#sc-quick-sandbox-btn");
    const overlay = this.container?.querySelector("#sc-html-sandbox-overlay");
    const closeBtn = this.container?.querySelector("#sc-sandbox-btn-close");
    const cancelBtn = this.container?.querySelector("#sc-sandbox-btn-cancel");
    const captureBtn = this.container?.querySelector("#sc-sandbox-btn-capture");
    const presetSelect = this.container?.querySelector("#sc-sandbox-preset-select");
    const toggleEditBtn = this.container?.querySelector("#sc-sandbox-toggle-edit");
    const toggleScrollBtn = this.container?.querySelector("#sc-sandbox-toggle-scroll");
    const codeInput = this.container?.querySelector("#sc-sandbox-code-input");

    const closeSandbox = () => { if (overlay) overlay.style.display = "none"; };

    const openSandbox = () => {
      if (overlay) overlay.style.display = "flex";
      if (!codeInput?.value) {
        this.loadHtmlSandboxPreset("pricing");
      } else {
        this.updateHtmlSandboxPreview();
      }
    };

    openBtn?.addEventListener("click", openSandbox);
    quickBtn?.addEventListener("click", openSandbox);
    closeBtn?.addEventListener("click", closeSandbox);
    cancelBtn?.addEventListener("click", closeSandbox);
    overlay?.addEventListener("click", (e) => { if (e.target === overlay) closeSandbox(); });

    presetSelect?.addEventListener("change", (e) => {
      this.loadHtmlSandboxPreset(e.target.value);
    });

    codeInput?.addEventListener("input", () => {
      this.updateHtmlSandboxPreview();
    });

    toggleEditBtn?.addEventListener("click", () => {
      this.sandboxVisualEdit = !this.sandboxVisualEdit;
      toggleEditBtn.textContent = this.sandboxVisualEdit ? "✏️ Visual Edit Mode: ON" : "✏️ Visual Edit Mode: OFF";
      toggleEditBtn.style.color = this.sandboxVisualEdit ? "var(--accent-cyan)" : "inherit";
      toggleEditBtn.style.borderColor = this.sandboxVisualEdit ? "var(--accent-cyan)" : "var(--border-color)";
      
      const iframe = this.container?.querySelector("#sc-sandbox-iframe");
      if (iframe?.contentDocument) {
        iframe.contentDocument.designMode = this.sandboxVisualEdit ? "on" : "off";
        if (this.sandboxVisualEdit) {
          this.app?.showToast("Click any text in the preview to edit it directly!", "info");
        }
      }
    });

    toggleScrollBtn?.addEventListener("click", () => {
      this.sandboxIsScrollable = !this.sandboxIsScrollable;
      toggleScrollBtn.textContent = this.sandboxIsScrollable ? "📐 Height: Scrollable (320px)" : "📐 Height: Expanded Full";
      const hint = this.container?.querySelector("#sc-sandbox-scroll-hint");
      if (hint) {
        hint.textContent = this.sandboxIsScrollable ? "Captures 100% of scrollable overflow" : "Viewing full unconstrained height";
      }
      this.updateHtmlSandboxPreview();
    });

    captureBtn?.addEventListener("click", () => {
      this.captureHtmlSandboxSection();
    });
  },

  loadHtmlSandboxPreset(preset) {
    const codeInput = this.container?.querySelector("#sc-sandbox-code-input");
    if (!codeInput) return;

    if (preset === "pricing") {
      codeInput.value = `<div style="font-family: system-ui, sans-serif; background: #0f172a; color: #f8fafc; padding: 28px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); max-width: 500px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
  <div style="display: inline-block; background: rgba(0,242,254,0.1); border: 1px solid #00f2fe; color: #00f2fe; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; margin-bottom: 12px;">MOST POPULAR</div>
  <h2 style="margin: 0; font-size: 24px; font-weight: 800;">Enterprise PRO Workspace</h2>
  <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 18px 0;">All 50+ client-side tools with offline WebAssembly runtime.</p>
  <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 18px;">
    <span style="font-size: 38px; font-weight: 900; color: #fff;">\$29</span>
    <span style="color: #64748b; font-size: 13px;">/ lifetime license</span>
  </div>
  <ul style="list-style: none; padding: 0; margin: 0 0 22px 0; display: flex; flex-direction: column; gap: 8px; font-size: 13px; color: #cbd5e1;">
    <li style="display: flex; gap: 8px; align-items: center;">✅ 100% Offline &amp; Private (Zero Cloud)</li>
    <li style="display: flex; gap: 8px; align-items: center;">✅ Unlimited 4K Retina Mockup Exports</li>
    <li style="display: flex; gap: 8px; align-items: center;">✅ Client-Side OCR &amp; PDF Compilers</li>
    <li style="display: flex; gap: 8px; align-items: center;">✅ Full Commercial License Rights</li>
  </ul>
  <button style="width: 100%; padding: 12px; border: none; border-radius: 8px; background: linear-gradient(135deg, #00f2fe, #4facfe); color: #090d16; font-weight: 700; font-size: 14px; cursor: pointer;">Activate PRO Lifetime</button>
</div>`;
    } else if (preset === "code") {
      codeInput.value = `<div style="font-family: 'JetBrains Mono', monospace; background: #0d1117; color: #c9d1d9; padding: 20px; border-radius: 10px; border: 1px solid #30363d; font-size: 13px; line-height: 1.6; max-width: 520px; margin: 0 auto; box-shadow: 0 15px 35px rgba(0,0,0,0.6);">
  <div style="display: flex; gap: 6px; margin-bottom: 14px;">
    <span style="width: 11px; height: 11px; border-radius: 50%; background: #ff5f56; display: inline-block;"></span>
    <span style="width: 11px; height: 11px; border-radius: 50%; background: #ffbd2e; display: inline-block;"></span>
    <span style="width: 11px; height: 11px; border-radius: 50%; background: #27c93f; display: inline-block;"></span>
  </div>
  <pre style="margin: 0; white-space: pre-wrap;"><span style="color: #ff7b72;">import</span> { OmniTool } <span style="color: #ff7b72;">from</span> <span style="color: #a5d6ff;">'@omnitool/core'</span>;

<span style="color: #8b949e;">// Initialize client-side capture pipeline</span>
<span style="color: #ff7b72;">const</span> studio = <span style="color: #d2a8ff;">new</span> OmniTool({
  theme: <span style="color: #a5d6ff;">'macos-dark'</span>,
  aspectRatio: <span style="color: #a5d6ff;">'16-9'</span>,
  retinaMultiplier: <span style="color: #79c0ff;">2</span>,
  privacyRedaction: <span style="color: #79c0ff;">true</span>
});

<span style="color: #ff7b72;">const</span> frame = <span style="color: #ff7b72;">await</span> studio.<span style="color: #d2a8ff;">captureSection</span>({
  target: <span style="color: #a5d6ff;">'#dashboard-card'</span>,
  scrollable: <span style="color: #79c0ff;">true</span>
});

console.<span style="color: #d2a8ff;">log</span>(<span style="color: #a5d6ff;">'Frame captured perfectly!'</span>, frame);</pre>
</div>`;
    } else if (preset === "article") {
      codeInput.value = `<div style="font-family: system-ui, sans-serif; background: #ffffff; color: #1e293b; padding: 24px; border-radius: 10px; border: 1px solid #e2e8f0; max-width: 500px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
  <span style="color: #0284c7; font-size: 11px; font-weight: 700; text-transform: uppercase;">Engineering Architecture</span>
  <h3 style="margin: 6px 0 12px 0; font-size: 20px; font-weight: 800; color: #0f172a;">Client-Side WebAssembly Rendering in 2026</h3>
  <p style="font-size: 13.5px; line-height: 1.6; color: #475569; margin-bottom: 12px;">Zero server round-trips deliver sub-millisecond execution while guaranteeing absolute confidentiality for proprietary source code, credentials, and business intelligence.</p>
  <h4 style="margin: 16px 0 8px 0; font-size: 15px; font-weight: 700;">Key Architectural Pillars</h4>
  <p style="font-size: 13px; line-height: 1.5; color: #475569; margin-bottom: 8px;">1. <strong>Local Sandboxes:</strong> Every operation executes inside browser isolated workers without egress requests.</p>
  <p style="font-size: 13px; line-height: 1.5; color: #475569; margin-bottom: 8px;">2. <strong>Hardware Acceleration:</strong> Direct GPU canvas drawing at native device pixel ratio.</p>
  <p style="font-size: 13px; line-height: 1.5; color: #475569;">3. <strong>Instant Redaction:</strong> Blur and blackout filters baked directly into memory buffers.</p>
</div>`;
    } else if (preset === "hero") {
      codeInput.value = `<div style="font-family: system-ui, sans-serif; background: radial-gradient(circle at center, #1e1b4b 0%, #090d16 100%); color: #fff; padding: 36px 28px; border-radius: 12px; border: 1px solid rgba(0,242,254,0.3); text-align: center; max-width: 520px; margin: 0 auto; box-shadow: 0 20px 50px rgba(0,0,0,0.7);">
  <span style="background: rgba(0,242,254,0.1); border: 1px solid #00f2fe; color: #00f2fe; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 700;">OMNITOOL HUB V2</span>
  <h1 style="font-size: 28px; font-weight: 900; margin: 14px 0 8px 0; background: linear-gradient(135deg, #fff 0%, #94a3b8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">The All-In-One Developer Suite</h1>
  <p style="font-size: 13.5px; color: #94a3b8; margin: 0 0 20px 0;">50+ high-precision offline tools running 100% in your browser.</p>
  <div style="display: flex; gap: 10px; justify-content: center;">
    <button style="padding: 10px 20px; border-radius: 8px; border: none; background: #00f2fe; color: #090d16; font-weight: 700; font-size: 13px; cursor: pointer;">Explore Tools ➔</button>
    <button style="padding: 10px 18px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); color: #fff; font-weight: 600; font-size: 13px; cursor: pointer;">Documentation</button>
  </div>
</div>`;
    }
    this.updateHtmlSandboxPreview();
  },

  updateHtmlSandboxPreview() {
    const codeInput = this.container?.querySelector("#sc-sandbox-code-input");
    const iframe = this.container?.querySelector("#sc-sandbox-iframe");
    if (!codeInput || !iframe) return;

    const heightStyle = this.sandboxIsScrollable ? "max-height: 320px; overflow-y: auto; overflow-x: hidden;" : "height: auto; overflow: visible;";

    const docContent = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 20px;
    background: #090d16;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100%;
    font-family: system-ui, -apple-system, sans-serif;
  }
  #sandbox-root {
    width: 100%;
    ${heightStyle}
    border-radius: 10px;
  }
</style>
</head>
<body>
  <div id="sandbox-root">${codeInput.value}</div>
</body>
</html>`;

    iframe.srcdoc = docContent;
    iframe.onload = () => {
      if (this.sandboxVisualEdit && iframe.contentDocument) {
        iframe.contentDocument.designMode = "on";
      }
    };
  },

  async captureHtmlSandboxSection() {
    const iframe = this.container?.querySelector("#sc-sandbox-iframe");
    if (!iframe || !iframe.contentDocument) return;

    const rootEl = iframe.contentDocument.getElementById("sandbox-root") || iframe.contentDocument.body;
    if (!rootEl) return;

    this.updateStatusPill("Capturing Section...", "#f59e0b");
    this.playAudioBeep(880, 0.08);

    try {
      const h2c = await this.loadHtml2Canvas();
      
      // Temporarily expand to full scrollable height for complete capture
      const origHeight = rootEl.style.maxHeight;
      const origOverflow = rootEl.style.overflowY;
      rootEl.style.maxHeight = "none";
      rootEl.style.overflowY = "visible";

      const canvas = await h2c(rootEl, {
        useCORS: true,
        allowTaint: true,
        scale: 2, // 2x Retina capture
        backgroundColor: null,
        logging: false
      });

      rootEl.style.maxHeight = origHeight;
      rootEl.style.overflowY = origOverflow;

      const img = new Image();
      img.onload = () => {
        this.setSourceImage(img);
        this.playShutterSound();
        this.updateStatusPill("Ready", "#00f2fe");
        const overlay = this.container?.querySelector("#sc-html-sandbox-overlay");
        if (overlay) overlay.style.display = "none";
        this.app?.showToast("Captured full scrollable section into Studio!", "success");
      };
      img.src = canvas.toDataURL("image/png");
    } catch (err) {
      console.error("HTML sandbox capture failed:", err);
      this.updateStatusPill("Ready", "#00f2fe");
      this.app?.showToast("Capture failed: " + err.message, "error");
    }
  },

  setupStitcherEvents() {
    const openBtn = this.container?.querySelector("#sc-btn-open-stitcher");
    const quickBtn = this.container?.querySelector("#sc-quick-stitch-btn");
    const overlay = this.container?.querySelector("#sc-stitcher-overlay");
    const closeBtn = this.container?.querySelector("#sc-stitch-btn-close");
    const cancelBtn = this.container?.querySelector("#sc-stitch-btn-cancel");
    const mergeBtn = this.container?.querySelector("#sc-stitch-btn-merge");
    const clearBtn = this.container?.querySelector("#sc-stitch-btn-clear");
    const fileInput = this.container?.querySelector("#sc-stitch-file-input");
    const dropzone = this.container?.querySelector("#sc-stitch-dropzone");
    const slider = this.container?.querySelector("#sc-stitch-overlap-slider");

    const closeStitch = () => { if (overlay) overlay.style.display = "none"; };

    openBtn?.addEventListener("click", () => {
      if (overlay) overlay.style.display = "flex";
    });
    quickBtn?.addEventListener("click", () => {
      if (overlay) overlay.style.display = "flex";
    });

    closeBtn?.addEventListener("click", closeStitch);
    cancelBtn?.addEventListener("click", closeStitch);
    overlay?.addEventListener("click", (e) => { if (e.target === overlay) closeStitch(); });

    dropzone?.addEventListener("click", () => fileInput?.click());
    dropzone?.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "var(--accent-cyan)";
      dropzone.style.background = "rgba(0, 242, 254, 0.08)";
    });
    dropzone?.addEventListener("dragleave", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "rgba(0, 242, 254, 0.3)";
      dropzone.style.background = "rgba(0, 242, 254, 0.02)";
    });
    dropzone?.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "rgba(0, 242, 254, 0.3)";
      dropzone.style.background = "rgba(0, 242, 254, 0.02)";
      const files = Array.from(e.dataTransfer?.files || []);
      this.loadStitchFiles(files);
    });
    fileInput?.addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []);
      this.loadStitchFiles(files);
      fileInput.value = "";
    });

    clearBtn?.addEventListener("click", () => {
      this.stitchImages = [];
      this.renderStitcherList();
    });

    slider?.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      const display = this.container?.querySelector("#sc-stitch-val-overlap");
      if (display) display.textContent = val;
    });

    mergeBtn?.addEventListener("click", () => {
      this.mergeStitcherImages();
    });
  },

  loadStitchFiles(files) {
    if (!files || files.length === 0) return;
    const imageFiles = files.filter(f => f.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      this.app?.showToast("Please select valid image files.", "info");
      return;
    }
    let loaded = 0;
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.stitchImages.push({ name: file.name, img, w: img.naturalWidth, h: img.naturalHeight });
          loaded++;
          if (loaded === files.length) {
            this.renderStitcherList();
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  renderStitcherList() {
    const list = this.container?.querySelector("#sc-stitch-slices-list");
    const countDisplay = this.container?.querySelector("#sc-stitch-count");
    if (countDisplay) countDisplay.textContent = this.stitchImages.length;
    if (!list) return;

    if (this.stitchImages.length === 0) {
      list.innerHTML = `<div id="sc-stitch-empty-msg" style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 11.5px;">No images added yet. Add at least 2 screenshots to stitch.</div>`;
      return;
    }

    list.innerHTML = "";
    this.stitchImages.forEach((item, idx) => {
      const row = document.createElement("div");
      row.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 6px; font-size: 11.5px;";
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-weight: 700; color: var(--accent-cyan); width: 16px;">#${idx + 1}</span>
          <img src="${item.img.src}" style="width: 36px; height: 26px; object-fit: cover; border-radius: 3px; border: 1px solid rgba(255,255,255,0.2);">
          <span style="color: #f8fafc; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${item.name}</span>
          <span style="color: var(--text-muted); font-size: 10px;">(${item.w}×${item.h})</span>
        </div>
        <div style="display: flex; gap: 4px;">
          <button class="tool-btn secondary sc-stitch-up" data-idx="${idx}" style="padding: 2px 6px; font-size: 10px;" ${idx === 0 ? "disabled" : ""}>▲</button>
          <button class="tool-btn secondary sc-stitch-down" data-idx="${idx}" style="padding: 2px 6px; font-size: 10px;" ${idx === this.stitchImages.length - 1 ? "disabled" : ""}>▼</button>
          <button class="tool-btn secondary sc-stitch-del" data-idx="${idx}" style="padding: 2px 6px; font-size: 10px; color: #ef4444;">✕</button>
        </div>
      `;
      list.appendChild(row);
    });

    list.querySelectorAll(".sc-stitch-up").forEach(b => {
      b.addEventListener("click", () => {
        const i = parseInt(b.getAttribute("data-idx"), 10);
        if (i > 0) {
          const tmp = this.stitchImages[i];
          this.stitchImages[i] = this.stitchImages[i - 1];
          this.stitchImages[i - 1] = tmp;
          this.renderStitcherList();
        }
      });
    });

    list.querySelectorAll(".sc-stitch-down").forEach(b => {
      b.addEventListener("click", () => {
        const i = parseInt(b.getAttribute("data-idx"), 10);
        if (i < this.stitchImages.length - 1) {
          const tmp = this.stitchImages[i];
          this.stitchImages[i] = this.stitchImages[i + 1];
          this.stitchImages[i + 1] = tmp;
          this.renderStitcherList();
        }
      });
    });

    list.querySelectorAll(".sc-stitch-del").forEach(b => {
      b.addEventListener("click", () => {
        const i = parseInt(b.getAttribute("data-idx"), 10);
        this.stitchImages.splice(i, 1);
        this.renderStitcherList();
      });
    });
  },

  mergeStitcherImages() {
    if (this.stitchImages.length < 2) {
      this.app?.showToast("Please add at least 2 screenshot slices to stitch.", "info");
      return;
    }

    const overlap = parseInt(this.container?.querySelector("#sc-stitch-overlap-slider")?.value || "0", 10);

    const targetW = Math.max(...this.stitchImages.map(item => item.w));
    let totalH = 0;
    this.stitchImages.forEach((item, idx) => {
      totalH += item.h;
      if (idx > 0) totalH -= overlap;
    });

    const mergeCanvas = document.createElement("canvas");
    mergeCanvas.width = targetW;
    mergeCanvas.height = Math.max(10, totalH);
    const mCtx = mergeCanvas.getContext("2d");

    let currentY = 0;
    this.stitchImages.forEach((item, idx) => {
      const drawX = Math.round((targetW - item.w) / 2);
      mCtx.drawImage(item.img, drawX, currentY);
      currentY += (item.h - overlap);
    });

    const mergedImg = new Image();
    mergedImg.onload = () => {
      this.setSourceImage(mergedImg);
      this.playShutterSound();
      const overlay = this.container?.querySelector("#sc-stitcher-overlay");
      if (overlay) overlay.style.display = "none";
      this.app?.showToast(`Stitched ${this.stitchImages.length} screenshots into one seamless full image!`, "success");
    };
    mergedImg.src = mergeCanvas.toDataURL("image/png");
  },

  cleanup() {
    clearInterval(this.countdownTimer);
    this.countdownTimer = null;
    if (this.boundPasteHandler) {
      window.removeEventListener("paste", this.boundPasteHandler);
      this.boundPasteHandler = null;
    }
    if (this.boundKeyHandler) {
      window.removeEventListener("keydown", this.boundKeyHandler);
      this.boundKeyHandler = null;
    }
    if (this.boundPointerMove) {
      window.removeEventListener("pointermove", this.boundPointerMove);
      this.boundPointerMove = null;
    }
    if (this.boundPointerUp) {
      window.removeEventListener("pointerup", this.boundPointerUp);
      this.boundPointerUp = null;
    }
    if (this.activeStream) {
      this.activeStream.getTracks().forEach(t => t.stop());
      this.activeStream = null;
    }
  }
};
