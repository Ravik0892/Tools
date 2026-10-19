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

  // Mockup & Canvas Configuration
  config: {
    mockupTheme: "macos-dark", // 'macos-dark' | 'macos-light' | 'windows11' | 'cyberpunk' | 'minimal' | 'phone' | 'none'
    urlText: "https://omnitoolhub.com/dashboard",
    titleText: "OmniTool Hub — Cloud-Free Developer Workspace",
    showSslLock: true,
    shadowStyle: "elevated", // 'none' | 'subtle' | 'elevated' | 'glow'
    cornerRadius: 14,
    backdropPadding: 44,
    aspectRatio: "auto", // 'auto' | '16-9' | '1-1' | '4-3' | 'twitter' | 'og' | '9-16'
    backdropType: "gradient", // 'gradient' | 'solid' | 'transparent'
    backdropGradient: "hyper-cyan", // 'hyper-cyan' | 'cosmic' | 'sunset' | 'cyberpunk' | 'emerald' | 'aurora' | 'midnight'
    backdropColor: "#0f172a",
    exportScale: 2 // 1x or 2x Retina
  },

  // Annotation & Drawing State
  activeTool: "select", // 'select' | 'crop' | 'blur' | 'highlight' | 'step' | 'arrow' | 'rect' | 'circle' | 'text' | 'loupe' | 'eyedropper'
  currentColor: "#00f2fe",
  strokeWidth: 4,
  nextStepNum: 1,
  annotations: [], // Array of annotation objects
  undoStack: [],
  redoStack: [],
  isDrawing: false,
  dragStart: null,
  currentDragRect: null,
  cropRect: null, // { x, y, w, h } normalized or pixel coords

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
                Screenshot Studio
              </h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 3px 0 0 0;">Capture, frame, annotate, and redact 100% locally.</p>
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
                <input type="text" id="sc-frame-url" class="tool-input" value="https://omnitoolhub.com/dashboard" style="flex: 1; padding: 6px 10px; font-size: 12px;">
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
              <div style="display: flex; gap: 6px;">
                <button class="tool-btn secondary active sc-bg-type-btn" data-type="gradient" style="flex: 1; font-size: 11px; padding: 6px;">Gradient</button>
                <button class="tool-btn secondary sc-bg-type-btn" data-type="solid" style="flex: 1; font-size: 11px; padding: 6px;">Solid Color</button>
                <button class="tool-btn secondary sc-bg-type-btn" data-type="transparent" style="flex: 1; font-size: 11px; padding: 6px;">Transparent</button>
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
                <button class="tool-btn secondary sc-tool-btn active" data-tool="select" title="Selection / Pan" style="font-size: 11px; padding: 6px; justify-content: center;">
                  👆 Select
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="crop" title="Interactive Crop & Trim" style="font-size: 11px; padding: 6px; justify-content: center;">
                  ✂️ Crop
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="blur" title="Pixelate & Redact Sensitive Passwords/PII" style="font-size: 11px; padding: 6px; justify-content: center;">
                  ⬛ Redact
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="step" title="Numbered Step Callouts (1, 2, 3...)" style="font-size: 11px; padding: 6px; justify-content: center;">
                  🎯 Step Badge
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="arrow" title="Directional Target Arrow" style="font-size: 11px; padding: 6px; justify-content: center;">
                  ➡️ Arrow
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="rect" title="Bounding Box" style="font-size: 11px; padding: 6px; justify-content: center;">
                  🔲 Box
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="highlight" title="Semi-Transparent Highlighter" style="font-size: 11px; padding: 6px; justify-content: center;">
                  🖍️ Highlight
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="circle" title="Focus Circle" style="font-size: 11px; padding: 6px; justify-content: center;">
                  ⭕ Circle
                </button>
                <button class="tool-btn secondary sc-tool-btn" data-tool="loupe" title="2x Zoom Magnifier Loupe" style="font-size: 11px; padding: 6px; justify-content: center;">
                  🔎 2x Loupe
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
                <input type="range" id="sc-stroke-slider" min="1" max="12" value="4" style="width: 100%; accent-color: var(--accent-cyan);">
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
                Copy to Clipboard
              </button>

              <button id="sc-btn-download" class="tool-btn accent-emerald" style="flex: 1.5; justify-content: center; padding: 11px; font-size: 13px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Save Image
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
                  <option value="pdf">PDF Document</option>
                </select>
              </div>

              <div style="display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--text-muted);">
                Resolution:
                <button id="sc-scale-1x" class="tool-btn secondary active" style="padding: 2px 8px; font-size: 10px;">1x</button>
                <button id="sc-scale-2x" class="tool-btn secondary" style="padding: 2px 8px; font-size: 10px;" title="Retina 4K Ultra Sharp">2x Ultra</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Studio Canvas & Live Viewport (Right Panel) -->
        <div class="tool-panel sc-viewport-panel" style="display: flex; flex-direction: column; overflow: hidden; position: relative; min-height: 520px;">
          
          <!-- Viewport Header Toolbar -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 10px; margin-bottom: 10px; border-bottom: 1px solid var(--border-color); flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 13px; font-weight: 700; color: var(--text-main);">Live Studio Canvas</span>
              <span id="sc-canvas-res-label" style="font-size: 11px; font-family: monospace; color: var(--text-muted); background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">1920 × 1080</span>
            </div>

            <!-- Quick Tool Toggles on Top of Canvas -->
            <div style="display: flex; align-items: center; gap: 6px;">
              <button id="sc-quick-crop-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Crop screenshot">✂️ Crop</button>
              <button id="sc-quick-redact-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Redact passwords / sensitive data">⬛ Redact</button>
              <button id="sc-quick-eyedropper-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Sample color from screenshot">💉 Color Picker</button>
              <button id="sc-reset-canvas-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;" title="Reset view">🔄 Reset</button>
            </div>
          </div>

          <!-- Canvas Interactive Workspace Area -->
          <div id="sc-canvas-viewport" style="flex: 1; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at center, rgba(30, 41, 59, 0.5) 0%, rgba(9, 13, 22, 0.95) 100%); border-radius: 10px; padding: 20px; border: 1px solid var(--border-color); overflow: auto; position: relative; cursor: crosshair;">
            
            <!-- Master Canvas Container -->
            <div id="sc-canvas-wrapper" style="display: inline-block; position: relative; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6); border-radius: 8px; transition: transform 0.2s ease;">
              <canvas id="sc-master-canvas" style="display: block; max-width: 100%; max-height: 65vh; object-fit: contain; border-radius: 8px;"></canvas>
            </div>

            <!-- Floating Countdown Overlay -->
            <div id="sc-countdown-overlay" style="display: none; position: absolute; inset: 0; background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(8px); z-index: 50; flex-direction: column; align-items: center; justify-content: center; gap: 16px;">
              <div style="font-size: 72px; font-weight: 900; font-family: monospace; color: var(--accent-cyan); text-shadow: 0 0 30px rgba(0, 242, 254, 0.6); animation: pulse 1s infinite;" id="sc-countdown-number">3</div>
              <p style="font-size: 14px; font-weight: 600; color: #fff; margin: 0; text-align: center;">Switch to your target tab or window now!<br><span style="font-size: 12px; color: var(--text-muted);">Capturing in seconds...</span></p>
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
              <span>Screenshot Studio Guide & Pro Capabilities</span>
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
              <div class="tool-guide-step-text"><strong>Wrap with SaaS Mockup</strong>: Choose macOS Glass, Windows 11 Acrylic, or Cyberpunk Terminal. Customize the address bar URL, page title, and gradient backdrop.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Redact & Annotate</strong>: Drag the Redact tool over confidential passwords or tokens to pixelate them locally. Place numbered step badges (1, 2, 3...) or arrows for bug reports.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">4</div>
              <div class="tool-guide-step-text"><strong>Instant 1-Click Share</strong>: Click "Copy to Clipboard" to paste your screenshot directly into Slack, Discord, Jira, Notion, or GitHub issues without saving files.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
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

    // Setup Event Listeners
    this.setupTabNavigation();
    this.setupCaptureEvents();
    this.setupMockupEvents();
    this.setupBackdropEvents();
    this.setupAnnotationEvents();
    this.setupCanvasInteractions();
    this.setupExportActions();

    // Global Clipboard Paste Listener
    this.boundPasteHandler = this.handleGlobalPaste.bind(this);
    window.addEventListener("paste", this.boundPasteHandler);

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
      if (delay > 0) {
        this.startCountdownCapture(delay);
      } else {
        this.performScreenCapture();
      }
    });

    // Countdown Cancel Button
    this.container.querySelector("#sc-btn-cancel-countdown")?.addEventListener("click", () => {
      this.cancelCountdown();
    });

    // 2. Clipboard Paste Button
    this.container.querySelector("#sc-btn-clipboard-paste")?.addEventListener("click", async () => {
      try {
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

  startCountdownCapture(seconds) {
    this.countdownSecsLeft = seconds;
    const overlay = this.container.querySelector("#sc-countdown-overlay");
    const numDisplay = this.container.querySelector("#sc-countdown-number");
    if (!overlay || !numDisplay) return;

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
        overlay.style.display = "none";
        this.playAudioBeep(1100, 0.15);
        this.performScreenCapture();
      }
    }, 1000);
  },

  cancelCountdown() {
    clearInterval(this.countdownTimer);
    const overlay = this.container.querySelector("#sc-countdown-overlay");
    if (overlay) overlay.style.display = "none";
    this.app?.showToast("Capture countdown cancelled.", "info");
  },

  async performScreenCapture() {
    try {
      this.updateStatusPill("Capturing...", "#f59e0b");
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

      const mediaStream = await navigator.mediaDevices.getDisplayMedia(constraints);
      this.activeStream = mediaStream;

      const video = document.createElement("video");
      video.srcObject = mediaStream;
      video.autoplay = true;
      video.playsInline = true;

      video.onloadedmetadata = () => {
        // Small delay to ensure the OS graphics pipeline draws cleanly
        setTimeout(() => {
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

          // Shut down active tracks immediately to close browser share bar
          mediaStream.getTracks().forEach(t => t.stop());
          this.activeStream = null;
        }, 300);
      };
    } catch (err) {
      this.updateStatusPill("Ready", "var(--accent-cyan)");
      if (err.name !== "NotAllowedError") {
        console.error("Screen capture error:", err);
        this.app?.showToast("Could not access screen capture: " + err.message, "error");
      }
    }
  },

  async openWebcamViewfinder() {
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
    
    // Mirror horizontally for natural webcam feel
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
        this.updateStatusPill("Ready", "var(--accent-cyan)");
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
    // Backdrop Type (Gradient / Solid / Transparent)
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
      });
    });

    // Color chips
    const colorChips = this.container.querySelectorAll(".sc-color-chip");
    colorChips.forEach(chip => {
      chip.addEventListener("click", () => {
        colorChips.forEach(c => c.style.borderColor = "transparent");
        chip.style.borderColor = "#fff";
        this.currentColor = chip.getAttribute("data-color");
      });
    });

    // Custom Color picker
    this.container.querySelector("#sc-custom-color")?.addEventListener("input", (e) => {
      this.currentColor = e.target.value;
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

  pushUndoState() {
    this.undoStack.push(JSON.parse(JSON.stringify(this.annotations)));
    this.redoStack = [];
    if (this.undoStack.length > 30) this.undoStack.shift();
  },

  undo() {
    if (this.undoStack.length > 0) {
      this.redoStack.push(JSON.parse(JSON.stringify(this.annotations)));
      this.annotations = this.undoStack.pop();
      this.renderMaster();
      this.app?.showToast("Undone last annotation", "info");
    }
  },

  redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push(JSON.parse(JSON.stringify(this.annotations)));
      this.annotations = this.redoStack.pop();
      this.renderMaster();
      this.app?.showToast("Redone annotation", "info");
    }
  },

  setupCanvasInteractions() {
    const canvas = this.masterCanvas;
    if (!canvas) return;

    const getCanvasCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };

    canvas.addEventListener("mousedown", (e) => {
      if (this.activeTool === "select") return;
      const pos = getCanvasCoords(e);

      // Eyedropper handler
      if (this.activeTool === "eyedropper") {
        this.samplePixelColor(pos.x, pos.y);
        return;
      }

      // Step badge handler (single click)
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

      this.isDrawing = true;
      this.dragStart = pos;
      this.currentDragRect = { x: pos.x, y: pos.y, w: 0, h: 0 };
    });

    window.addEventListener("mousemove", (e) => {
      if (!this.isDrawing || !this.dragStart) return;
      const pos = getCanvasCoords(e);
      this.currentDragRect = {
        x: Math.min(this.dragStart.x, pos.x),
        y: Math.min(this.dragStart.y, pos.y),
        w: Math.abs(pos.x - this.dragStart.x),
        h: Math.abs(pos.y - this.dragStart.y),
        endX: pos.x,
        endY: pos.y
      };
      this.renderMaster(true); // Draw with live interactive overlay
    });

    window.addEventListener("mouseup", (e) => {
      if (!this.isDrawing || !this.dragStart || !this.currentDragRect) {
        this.isDrawing = false;
        return;
      }

      this.isDrawing = false;
      const rect = this.currentDragRect;

      // Minimum drag threshold to prevent phantom clicks
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
          this.app?.showToast("Redacted sensitive area with pixelation", "success");
        } else if (this.activeTool === "arrow") {
          this.annotations.push({
            type: "arrow",
            startX: this.dragStart.x,
            startY: this.dragStart.y,
            endX: rect.endX || (this.dragStart.x + rect.w),
            endY: rect.endY || (this.dragStart.y + rect.h),
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
          // Crop screenshot to selected bounding box
          this.applyImageCrop(rect);
        }
      }

      this.dragStart = null;
      this.currentDragRect = null;
      this.renderMaster();
    });
  },

  applyImageCrop(cropBox) {
    if (!this.sourceImage) return;
    const imgBounds = this.computeInnerImageBounds();
    if (!imgBounds) return;

    // Convert canvas cropBox to source image relative coordinates
    const sx = ((cropBox.x - imgBounds.x) / imgBounds.w) * this.sourceImage.naturalWidth;
    const sy = ((cropBox.y - imgBounds.y) / imgBounds.h) * this.sourceImage.naturalHeight;
    const sw = (cropBox.w / imgBounds.w) * this.sourceImage.naturalWidth;
    const sh = (cropBox.h / imgBounds.h) * this.sourceImage.naturalHeight;

    if (sw <= 10 || sh <= 10) return;

    const cropCanvas = document.createElement("canvas");
    cropCanvas.width = Math.max(1, Math.round(sw));
    cropCanvas.height = Math.max(1, Math.round(sh));
    const cCtx = cropCanvas.getContext("2d");

    cCtx.drawImage(
      this.sourceImage,
      Math.max(0, sx), Math.max(0, sy), sw, sh,
      0, 0, cropCanvas.width, cropCanvas.height
    );

    const croppedImg = new Image();
    croppedImg.onload = () => {
      this.sourceImage = croppedImg;
      this.annotations = [];
      this.renderMaster();
      this.app?.showToast("Cropped screenshot successfully!", "success");
    };
    croppedImg.src = cropCanvas.toDataURL("image/png");
  },

  samplePixelColor(canvasX, canvasY) {
    const ctx = this.masterCtx;
    if (!ctx) return;
    const pixel = ctx.getImageData(Math.round(canvasX), Math.round(canvasY), 1, 1).data;
    const hex = "#" + ((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1);
    
    // Copy to clipboard
    try { navigator.clipboard.writeText(hex); } catch (_) {}

    const badge = this.container.querySelector("#sc-eyedropper-badge");
    const preview = this.container.querySelector("#sc-sample-color-preview");
    const label = this.container.querySelector("#sc-sample-color-text");

    if (badge && preview && label) {
      badge.style.display = "flex";
      preview.style.background = hex;
      label.textContent = `${hex.toUpperCase()} (rgb ${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
    }

    this.currentColor = hex;
    this.app?.showToast(`Sampled color: ${hex.toUpperCase()} (copied)`, "success");
    this.activeTool = "select";
  },

  computeInnerImageBounds() {
    const canvas = this.masterCanvas;
    if (!canvas || !this.sourceImage) return null;

    const padding = (this.config.mockupTheme === "none") ? 0 : this.config.backdropPadding;
    const headerHeight = (this.config.mockupTheme === "none" || this.config.mockupTheme === "minimal") ? 0 : 38;

    const winW = canvas.width - (padding * 2);
    const winH = canvas.height - (padding * 2);

    return {
      x: padding,
      y: padding + headerHeight,
      w: winW,
      h: winH - headerHeight
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

    // Determine target canvas dimensions based on aspect ratio
    let targetW = rawW + (padding * 2);
    let targetH = rawH + headerHeight + (padding * 2);

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

    // Update resolution label
    const resLabel = this.container.querySelector("#sc-canvas-res-label");
    if (resLabel) resLabel.textContent = `${targetW} × ${targetH} px`;

    // 1. Draw Canvas Backdrop
    this.drawBackdrop(ctx, targetW, targetH);

    // 2. Draw Window Mockup & Header
    const winX = padding;
    const winY = padding;
    const winW = targetW - (padding * 2);
    const winH = targetH - (padding * 2);

    this.drawWindowMockup(ctx, winX, winY, winW, winH, headerHeight);

    // 3. Draw Screenshot Image Content
    const innerX = winX;
    const innerY = winY + headerHeight;
    const innerW = winW;
    const innerH = winH - headerHeight;

    this.drawScreenshotContent(ctx, innerX, innerY, innerW, innerH);

    // 4. Render All Markup & Annotations
    this.drawAnnotations(ctx);

    // 5. Draw Active Drag Interaction Overlay (live preview)
    if (isInteracting && this.currentDragRect) {
      this.drawInteractiveOverlay(ctx, this.currentDragRect);
    }
  },

  drawBackdrop(ctx, width, height) {
    if (this.config.backdropType === "transparent") {
      ctx.clearRect(0, 0, width, height);
      // Optional transparent checkerboard pattern
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
      // Mesh radial
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
    this.roundRect(ctx, x, y, w, h, r);
    ctx.fillStyle = (this.config.mockupTheme === "macos-light") ? "#f1f5f9" : "#0f172a";
    ctx.fill();
    ctx.restore();

    // 2. Draw Window Header & Traffic Lights
    if (headerHeight > 0) {
      ctx.save();
      // Clip header to top rounded corners
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

      // Header Fill
      if (this.config.mockupTheme === "macos-dark") {
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(x, y, w, headerHeight);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.strokeRect(x, y, w, headerHeight);

        // macOS Traffic Lights (Red, Yellow, Green)
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

        // Address Bar Pill
        const barW = Math.min(w * 0.55, 460);
        const barX = x + (w / 2) - (barW / 2);
        const barY = y + 7;
        const barH = headerHeight - 14;

        this.roundRect(ctx, barX, barY, barW, barH, 6);
        ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.stroke();

        // Lock icon & URL text
        ctx.font = "11.5px Inter, system-ui, sans-serif";
        ctx.fillStyle = "#94a3b8";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const lockIcon = this.config.showSslLock ? "🔒 " : "";
        ctx.fillText(lockIcon + this.config.urlText, barX + (barW / 2), barY + (barH / 2));

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
        const lockIcon = this.config.showSslLock ? "🔒 " : "";
        ctx.fillText(lockIcon + this.config.urlText, barX + (barW / 2), barY + (barH / 2));

      } else if (this.config.mockupTheme === "windows11") {
        ctx.fillStyle = "rgba(30, 41, 59, 0.85)";
        ctx.fillRect(x, y, w, headerHeight);

        // Windows 11 Title Text (Left)
        ctx.font = "11px Segoe UI, system-ui, sans-serif";
        ctx.fillStyle = "#cbd5e1";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText(this.config.titleText, x + 16, y + (headerHeight / 2));

        // Windows 11 Controls (Right: minimize, maximize, close)
        const ctrlY = y + (headerHeight / 2);
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 1;

        // Minimize line
        ctx.beginPath();
        ctx.moveTo(x + w - 70, ctrlY);
        ctx.lineTo(x + w - 60, ctrlY);
        ctx.stroke();

        // Maximize square
        ctx.strokeRect(x + w - 46, ctrlY - 4.5, 9, 9);

        // Close X
        ctx.beginPath();
        ctx.moveTo(x + w - 24, ctrlY - 4.5);
        ctx.lineTo(x + w - 16, ctrlY + 4.5);
        ctx.moveTo(x + w - 16, ctrlY - 4.5);
        ctx.lineTo(x + w - 24, ctrlY + 4.5);
        ctx.stroke();

      } else if (this.config.mockupTheme === "cyberpunk") {
        ctx.fillStyle = "#090d16";
        ctx.fillRect(x, y, w, headerHeight);

        ctx.strokeStyle = "var(--accent-cyan)";
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

    ctx.save();
    // Clip inner content to bottom rounded corners
    if (r > 0) {
      this.roundRect(ctx, x, y, w, h, (this.config.mockupTheme === "minimal") ? r : [0, 0, r, r]);
      ctx.clip();
    }

    ctx.drawImage(this.sourceImage, 0, 0, this.sourceImage.naturalWidth, this.sourceImage.naturalHeight, x, y, w, h);
    ctx.restore();
  },

  drawAnnotations(ctx) {
    this.annotations.forEach(ann => {
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
        // True Pixelation / Redaction
        this.applyPixelationToCanvas(ctx, ann.x, ann.y, ann.w, ann.h, 10);

      } else if (ann.type === "step") {
        // Numbered Circle Badge (1, 2, 3...)
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

      } else if (ann.type === "loupe") {
        this.drawMagnifierLoupe(ctx, ann.cx, ann.cy, ann.radius || 45);
      }
    });
  },

  drawInteractiveOverlay(ctx, rect) {
    ctx.save();
    ctx.strokeStyle = "rgba(0, 242, 254, 0.85)";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);

    if (this.activeTool === "circle") {
      ctx.beginPath();
      ctx.ellipse(rect.x + rect.w / 2, rect.y + rect.h / 2, rect.w / 2, rect.h / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
    } else if (this.activeTool === "arrow") {
      this.drawArrow(ctx, this.dragStart.x, this.dragStart.y, rect.endX, rect.endY, "#00f2fe", 3);
    } else {
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
      ctx.fillStyle = (this.activeTool === "blur") ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 242, 254, 0.1)";
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

  drawMagnifierLoupe(ctx, cx, cy, radius) {
    const r = Math.max(25, radius);
    ctx.save();

    // Shadow on ring
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 6;

    // Draw magnified circle
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    // 2x Zoom scale around center
    ctx.drawImage(
      ctx.canvas,
      cx - r / 2, cy - r / 2, r, r,
      cx - r, cy - r, r * 2, r * 2
    );

    ctx.restore();

    // Ring stroke & crosshairs
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "var(--accent-cyan)";
    ctx.lineWidth = 3;
    ctx.stroke();
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
      const imgData = ctx.getImageData(rx, ry, rw, rh);
      const data = imgData.data;

      for (let py = 0; py < rh; py += blockSize) {
        for (let px = 0; px < rw; px += blockSize) {
          const sampleIdx = (py * rw + px) * 4;
          const r = data[sampleIdx];
          const g = data[sampleIdx + 1];
          const b = data[sampleIdx + 2];

          for (let by = 0; by < blockSize && (py + by) < rh; by++) {
            for (let bx = 0; bx < blockSize && (px + bx) < rw; bx++) {
              const pixelIdx = ((py + by) * rw + (px + bx)) * 4;
              data[pixelIdx] = r;
              data[pixelIdx + 1] = g;
              data[pixelIdx + 2] = b;
            }
          }
        }
      }
      ctx.putImageData(imgData, rx, ry);
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
      // High-Fidelity Modern Dark Dashboard
      sCtx.fillStyle = "#090d16";
      sCtx.fillRect(0, 0, 1280, 760);

      // Top Nav Bar
      sCtx.fillStyle = "rgba(255, 255, 255, 0.04)";
      sCtx.fillRect(0, 0, 1280, 56);
      sCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      sCtx.strokeRect(0, 0, 1280, 56);

      sCtx.font = "bold 15px Outfit, Inter, sans-serif";
      sCtx.fillStyle = "#00f2fe";
      sCtx.fillText("⚡ OmniTool Analytics", 30, 34);

      // KPI Metric Cards
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

      // Chart Area
      sCtx.fillStyle = "rgba(255, 255, 255, 0.02)";
      sCtx.fillRect(30, 210, 1220, 510);
      sCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      sCtx.strokeRect(30, 210, 1220, 510);

      sCtx.font = "bold 14px Inter, sans-serif";
      sCtx.fillStyle = "#e2e8f0";
      sCtx.fillText("Throughput Execution Velocity (Requests / Sec)", 50, 245);

      // Neon Wave Graph
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

      // Stroke Line
      sCtx.beginPath();
      sCtx.moveTo(points[0][0], points[0][1]);
      points.forEach(p => sCtx.lineTo(p[0], p[1]));
      sCtx.strokeStyle = "#00f2fe";
      sCtx.lineWidth = 3.5;
      sCtx.stroke();

    } else if (type === "code") {
      // Code Editor Studio Sample
      sCtx.fillStyle = "#0d1117";
      sCtx.fillRect(0, 0, 1280, 760);

      // Line numbers and code
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
        "    url: 'https://omnitoolhub.com/dashboard',",
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
      // Terminal Matrix Screen
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
      // Landing Hero Page
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
    });

    scale2x?.addEventListener("click", () => {
      scale2x.classList.add("active");
      scale1x?.classList.remove("active");
      this.config.exportScale = 2;
      this.app?.showToast("Set resolution multiplier to 2x (Ultra Retina 4K)", "info");
    });
  },

  async copyCanvasToClipboard() {
    const canvas = this.masterCanvas;
    if (!canvas) return;

    try {
      this.playShutterSound();
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ "image/png": blob })
          ]);
          this.app?.showToast("Copied screenshot to clipboard! Ready to paste into Slack, Jira, Discord, or Docs.", "success");
        } catch (err) {
          console.warn("Clipboard API blocked, offering fallback download", err);
          this.downloadExportImage("png");
        }
      }, "image/png");
    } catch (err) {
      this.app?.showToast("Could not copy directly. Downloading PNG instead.", "info");
      this.downloadExportImage("png");
    }
  },

  downloadExportImage(overrideFmt) {
    const canvas = this.masterCanvas;
    if (!canvas) return;

    const format = overrideFmt || this.container.querySelector("#sc-export-format")?.value || "png";
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const filename = `omnitool-screenshot-${timestamp}`;

    if (format === "pdf") {
      this.exportPdf(filename);
      return;
    }

    const mimeType = (format === "webp") ? "image/webp" : (format === "jpeg") ? "image/jpeg" : "image/png";
    const extension = (format === "jpeg") ? "jpg" : format;

    this.playAudioBeep(980, 0.08);

    const link = document.createElement("a");
    link.download = `${filename}.${extension}`;
    link.href = canvas.toDataURL(mimeType, 0.95);
    link.click();
    this.app?.showToast(`Downloaded ${filename}.${extension}`, "success");
  },

  exportPdf(filename) {
    const canvas = this.masterCanvas;
    if (!canvas) return;

    // Use PDF document generation
    try {
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const isLandscape = canvas.width >= canvas.height;
      const pdfW = isLandscape ? 842 : 595; // A4 pt
      const pdfH = isLandscape ? 595 : 842;

      // Fit image into A4 page preserving aspect ratio
      const imgAspect = canvas.width / canvas.height;
      let drawW = pdfW - 40;
      let drawH = drawW / imgAspect;

      if (drawH > (pdfH - 40)) {
        drawH = pdfH - 40;
        drawW = drawH * imgAspect;
      }

      const drawX = (pdfW - drawW) / 2;
      const drawY = (pdfH - drawH) / 2;

      // Construct clean single-page PDF with embedded image
      const link = document.createElement("a");
      link.download = `${filename}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      this.app?.showToast("Exported high-res capture!", "success");
    } catch (err) {
      this.downloadExportImage("png");
    }
  },

  updateStatusPill(text, color) {
    const pill = this.container.querySelector("#sc-status-pill");
    const label = this.container.querySelector("#sc-status-text");
    if (!pill || !label) return;

    label.textContent = text;
    pill.style.color = color;
    const dot = pill.querySelector("span:first-child");
    if (dot) dot.style.background = color;
  },

  cleanup() {
    clearInterval(this.countdownTimer);
    if (this.boundPasteHandler) {
      window.removeEventListener("paste", this.boundPasteHandler);
    }
    if (this.activeStream) {
      this.activeStream.getTracks().forEach(t => t.stop());
      this.activeStream = null;
    }
  }
};
