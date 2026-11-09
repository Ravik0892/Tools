// OmniTool Hub - Video Playback Speed & Frame Stepper Controller
// 100% Client-Side video controller with 0.1x - 4x speed, pitch preservation, frame-by-frame stepping, and A-B loop repeat.

import { escapeHtml } from './utils.js';

export default {
  id: "video-speed",
  name: "Video Playback Speed Controller",

  videoFile: null,
  videoUrl: null,
  loopA: null,
  loopB: null,
  loopEnabled: false,
  keyHandler: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Speed Tuning & A-B Looper (Left Panel: Controls & Editor) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Speed &amp; Loop Controls</h3>
            <button class="tool-btn secondary" id="vs-change-file-btn" style="font-size: 11px; padding: 4px 10px; display: none;">Change Video</button>
          </div>

          <!-- Speed Slider & Presets -->
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">PLAYBACK SPEED RATE</span>
                <span id="vs-rate-label" style="font-size: 14px; font-weight: 800; color: var(--accent-cyan); font-family: monospace;">1.0x</span>
              </div>

              <input type="range" id="vs-rate-slider" min="0.1" max="4.0" step="0.05" value="1.0" style="width: 100%; accent-color: var(--accent-cyan); cursor: pointer;">
              
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); font-family: monospace;">
                <span>0.1x (Slow-Mo)</span>
                <span>1.0x (Normal)</span>
                <span>2.0x</span>
                <span>4.0x (Hyper)</span>
              </div>

              <!-- Quick Presets -->
              <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
                <button class="tool-btn secondary vs-preset-btn" data-speed="0.25" style="font-size: 11px; padding: 4px 8px;">0.25x</button>
                <button class="tool-btn secondary vs-preset-btn" data-speed="0.5" style="font-size: 11px; padding: 4px 8px;">0.5x</button>
                <button class="tool-btn secondary vs-preset-btn" data-speed="0.75" style="font-size: 11px; padding: 4px 8px;">0.75x</button>
                <button class="tool-btn secondary vs-preset-btn" data-speed="1.0" style="font-size: 11px; padding: 4px 8px; border-color: var(--accent-cyan); color: var(--accent-cyan);">1.0x</button>
                <button class="tool-btn secondary vs-preset-btn" data-speed="1.25" style="font-size: 11px; padding: 4px 8px;">1.25x</button>
                <button class="tool-btn secondary vs-preset-btn" data-speed="1.5" style="font-size: 11px; padding: 4px 8px;">1.5x</button>
                <button class="tool-btn secondary vs-preset-btn" data-speed="1.75" style="font-size: 11px; padding: 4px 8px;">1.75x</button>
                <button class="tool-btn secondary vs-preset-btn" data-speed="2.0" style="font-size: 11px; padding: 4px 8px;">2.0x</button>
                <button class="tool-btn secondary vs-preset-btn" data-speed="3.0" style="font-size: 11px; padding: 4px 8px;">3.0x</button>
              </div>

              <!-- Pitch Preservation Toggle -->
              <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-main); margin-top: 6px; cursor: pointer;">
                <input type="checkbox" id="vs-pitch-toggle" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                <span>Preserve Audio Pitch (Prevents squeaky chipmunk voices when speeding up)</span>
              </label>
            </div>

            <!-- A-B Continuous Loop Repeater -->
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">A-B SECTION REPEATER</span>
                <span style="font-size: 11px; color: var(--text-muted);">Loop specific video segment</span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <button class="tool-btn secondary" id="vs-set-point-a" style="font-size: 11px; padding: 6px;">Set Point [A]</button>
                  <span id="vs-point-a-val" style="font-size: 11px; font-family: monospace; color: var(--text-muted); text-align: center;">Not Set</span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 4px;">
                  <button class="tool-btn secondary" id="vs-set-point-b" style="font-size: 11px; padding: 6px;">Set Point [B]</button>
                  <span id="vs-point-b-val" style="font-size: 11px; font-family: monospace; color: var(--text-muted); text-align: center;">Not Set</span>
                </div>
              </div>

              <div style="display: flex; gap: 8px; margin-top: 4px;">
                <button class="tool-btn primary" id="vs-toggle-loop-btn" disabled style="flex: 1; font-size: 12px; padding: 6px 12px;">Start A-B Loop</button>
                <button class="tool-btn secondary" id="vs-clear-loop-btn" style="font-size: 11px; padding: 6px 10px;">Clear Points</button>
              </div>
            </div>

            <!-- Keyboard Shortcuts Cheatsheet -->
            <div style="background: rgba(0, 0, 0, 0.2); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px 14px; font-size: 11px; color: var(--text-muted); display: flex; flex-direction: column; gap: 6px;">
              <span style="font-weight: 700; color: var(--text-main);">KEYBOARD SHORTCUTS:</span>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                <span><kbd style="background: #222; padding: 1px 4px; border-radius: 3px;">Space</kbd> Play / Pause</span>
                <span><kbd style="background: #222; padding: 1px 4px; border-radius: 3px;">←</kbd> <kbd style="background: #222; padding: 1px 4px; border-radius: 3px;">→</kbd> Seek 5 Seconds</span>
                <span><kbd style="background: #222; padding: 1px 4px; border-radius: 3px;">,</kbd> <kbd style="background: #222; padding: 1px 4px; border-radius: 3px;">.</kbd> Frame Step Back / Fwd</span>
                <span><kbd style="background: #222; padding: 1px 4px; border-radius: 3px;">[</kbd> <kbd style="background: #222; padding: 1px 4px; border-radius: 3px;">]</kbd> Set Loop A / B</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Video Player & Viewport (Right Panel: Result & Playback) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Video Player &amp; Viewport</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Precision playback with high frame rate inspection.
              </p>
            </div>
            <span id="vs-video-info-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Upload Dropzone (When no video loaded) -->
          <div id="vs-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 40px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 240px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 48px; height: 48px; color: var(--accent-cyan); margin-bottom: 12px;">
              <polygon points="23 7 16 12 23 17 23 7"></polygon>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drag &amp; drop a video file here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              Supports MP4, WebM, OGG, MKV, MOV. Handled 100% in local memory.
            </div>
            <input type="file" id="vs-file-input" accept="video/*" style="display: none;">
          </div>

          <!-- Video Element & Scrubbing Deck -->
          <div id="vs-player-container" style="display: none; flex-direction: column; gap: 10px;">
            <div style="width: 100%; max-height: 420px; background: #000; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color); position: relative;">
              <video id="vs-video" playsinline style="width: 100%; height: 100%; max-height: 420px; object-fit: contain;"></video>
              
              <!-- Speed Overlay Badge -->
              <div id="vs-current-speed-badge" style="position: absolute; top: 12px; right: 12px; background: rgba(0, 0, 0, 0.75); border: 1px solid rgba(0, 242, 254, 0.4); color: var(--accent-cyan); font-weight: 800; font-size: 12px; padding: 4px 10px; border-radius: 6px; pointer-events: none;">
                1.00x
              </div>

              <!-- A-B Loop Active Indicator -->
              <div id="vs-loop-badge" style="display: none; position: absolute; top: 12px; left: 12px; background: rgba(245, 158, 11, 0.85); color: #000; font-weight: 800; font-size: 11px; padding: 4px 10px; border-radius: 6px; pointer-events: none;">
                LOOP A ⇄ B
              </div>
            </div>

            <!-- Custom Timeline Scrubber & Timestamps -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px; font-family: monospace; color: var(--text-muted);">
                <span id="vs-current-time">00:00:00.00</span>
                <span id="vs-total-time">00:00:00.00</span>
              </div>
              <input type="range" id="vs-timeline" min="0" max="100" value="0" step="0.01" style="width: 100%; accent-color: var(--accent-cyan); cursor: pointer;">
            </div>

            <!-- Frame Stepper & Playback Controls Strip -->
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; padding: 8px 12px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px;">
              <div style="display: flex; gap: 6px;">
                <button class="tool-btn secondary" id="vs-step-back-5s" title="Back 5s (Left Arrow)" style="font-size: 11px; padding: 4px 8px;">-5s</button>
                <button class="tool-btn secondary" id="vs-step-back-frame" title="Step Back 1 Frame (,)" style="font-size: 11px; padding: 4px 8px;">◀ 1 Frame</button>
              </div>

              <div style="display: flex; gap: 8px; align-items: center;">
                <button class="tool-btn primary" id="vs-play-btn" style="font-size: 12px; padding: 6px 18px; min-width: 80px; text-align: center;">Play</button>
              </div>

              <div style="display: flex; gap: 6px;">
                <button class="tool-btn secondary" id="vs-step-fwd-frame" title="Step Forward 1 Frame (.)" style="font-size: 11px; padding: 4px 8px;">1 Frame ▶</button>
                <button class="tool-btn secondary" id="vs-step-fwd-5s" title="Forward 5s (Right Arrow)" style="font-size: 11px; padding: 4px 8px;">+5s</button>
              </div>
            </div>
          </div>
        </div>
      
        <!-- Standard Canonical Tool Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: How to Adjust Video Playback Speed</span>
            </div>
            <div class="tool-guide-badge">Client-Side Speed Engine</div>
          </div>

          <div class="tool-guide-steps">
            
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Load Video File</h4>
                <p>Drag and drop any MP4, WebM, MOV, or MKV file into the player.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Select Target Multiplier</h4>
                <p>Choose 0.25x to 4.0x speed or configure fine-grained percentage increments.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Preserve Audio Pitch</h4>
                <p>Ensure voices remain naturally modulated without chipmunk distortion via HTML5 pitch correction.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">4</div>
              <div class="tool-step-content">
                <h4>Save or Watch Live</h4>
                <p>Preview smoothly at the chosen speed or download adjusted video clips locally.</p>
              </div>
            </div>
            
          </div>
        </div>
  </div>
    `;
  },

  init(container, appInstance) {
    this.container = container;
    this.app = appInstance;

    // Elements
    this.dropzone = container.querySelector('#vs-dropzone');
    this.fileInput = container.querySelector('#vs-file-input');
    this.playerContainer = container.querySelector('#vs-player-container');
    this.video = container.querySelector('#vs-video');
    this.changeFileBtn = container.querySelector('#vs-change-file-btn');
    this.playBtn = container.querySelector('#vs-play-btn');
    this.timeline = container.querySelector('#vs-timeline');
    this.currentTimeLabel = container.querySelector('#vs-current-time');
    this.totalTimeLabel = container.querySelector('#vs-total-time');
    this.speedBadge = container.querySelector('#vs-current-speed-badge');
    this.loopBadge = container.querySelector('#vs-loop-badge');
    this.videoInfoBadge = container.querySelector('#vs-video-info-badge');

    // Controls
    this.rateSlider = container.querySelector('#vs-rate-slider');
    this.rateLabel = container.querySelector('#vs-rate-label');
    this.pitchToggle = container.querySelector('#vs-pitch-toggle');
    this.stepBack5s = container.querySelector('#vs-step-back-5s');
    this.stepFwd5s = container.querySelector('#vs-step-fwd-5s');
    this.stepBackFrame = container.querySelector('#vs-step-back-frame');
    this.stepFwdFrame = container.querySelector('#vs-step-fwd-frame');

    // A-B Looper
    this.setPointABtn = container.querySelector('#vs-set-point-a');
    this.setPointBBtn = container.querySelector('#vs-set-point-b');
    this.pointAVal = container.querySelector('#vs-point-a-val');
    this.pointBVal = container.querySelector('#vs-point-b-val');
    this.toggleLoopBtn = container.querySelector('#vs-toggle-loop-btn');
    this.clearLoopBtn = container.querySelector('#vs-clear-loop-btn');
    this.presetBtns = container.querySelectorAll('.vs-preset-btn');

    // Setup Drag and Drop
    this.dropzone.addEventListener('click', () => this.fileInput.click());
    this.dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dropzone.style.borderColor = 'var(--accent-cyan)';
    });
    this.dropzone.addEventListener('dragleave', () => {
      this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)';
    });
    this.dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)';
      if (e.dataTransfer.files.length > 0) {
        this.loadFile(e.dataTransfer.files[0]);
      }
    });

    this.fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.loadFile(e.target.files[0]);
      }
    });

    this.changeFileBtn.addEventListener('click', () => {
      this.fileInput.click();
    });

    // Playback events
    this.playBtn.addEventListener('click', () => this.togglePlay());
    this.video.addEventListener('play', () => this.playBtn.textContent = 'Pause');
    this.video.addEventListener('pause', () => this.playBtn.textContent = 'Play');
    this.video.addEventListener('timeupdate', () => this.onTimeUpdate());
    this.video.addEventListener('loadedmetadata', () => this.onMetadataLoaded());

    this.timeline.addEventListener('input', (e) => {
      if (!this.video.duration) return;
      const targetTime = (parseFloat(e.target.value) / 100) * this.video.duration;
      this.video.currentTime = targetTime;
    });

    // Speed controls
    this.rateSlider.addEventListener('input', (e) => {
      this.setSpeed(parseFloat(e.target.value));
    });

    this.presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const spd = parseFloat(btn.dataset.speed);
        this.setSpeed(spd);
      });
    });

    this.pitchToggle.addEventListener('change', (e) => {
      this.video.preservesPitch = e.target.checked;
      this.app.showToast(e.target.checked ? "Pitch preserved (normal pitch)" : "Pitch natural (pitch scales with speed)", "info");
    });

    // Frame steppers (assumes ~25-30fps frame = 0.04s)
    this.stepBackFrame.addEventListener('click', () => this.stepFrame(-0.04));
    this.stepFwdFrame.addEventListener('click', () => this.stepFrame(0.04));
    this.stepBack5s.addEventListener('click', () => this.stepFrame(-5));
    this.stepFwd5s.addEventListener('click', () => this.stepFrame(5));

    // A-B loop events
    this.setPointABtn.addEventListener('click', () => this.setPointA());
    this.setPointBBtn.addEventListener('click', () => this.setPointB());
    this.toggleLoopBtn.addEventListener('click', () => this.toggleLoop());
    this.clearLoopBtn.addEventListener('click', () => this.clearLoop());

    // Keyboard Shortcuts
    this.setupKeyboardShortcuts();
  },

  loadFile(file) {
    if (!file.type.startsWith('video/')) {
      this.app.showToast("Please upload a valid video file.", "warning");
      return;
    }

    if (this.videoUrl) {
      URL.revokeObjectURL(this.videoUrl);
    }

    this.videoFile = file;
    this.videoUrl = URL.createObjectURL(file);
    this.video.src = this.videoUrl;
    this.video.load();

    this.dropzone.style.display = 'none';
    this.playerContainer.style.display = 'flex';
    this.changeFileBtn.style.display = 'inline-block';

    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    this.videoInfoBadge.textContent = `${file.name} (${sizeMb} MB)`;
    this.app.showToast(`Loaded "${file.name}"`, "success");
  },

  onMetadataLoaded() {
    this.totalTimeLabel.textContent = this.formatTime(this.video.duration);
    this.video.preservesPitch = this.pitchToggle.checked;
    this.setSpeed(parseFloat(this.rateSlider.value));
    this.clearLoop();
  },

  onTimeUpdate() {
    if (!this.video.duration) return;

    this.currentTimeLabel.textContent = this.formatTime(this.video.currentTime);
    const pct = (this.video.currentTime / this.video.duration) * 100;
    this.timeline.value = pct;

    // Check A-B Loop boundaries
    if (this.loopEnabled && this.loopA !== null && this.loopB !== null) {
      if (this.video.currentTime >= this.loopB || this.video.currentTime < this.loopA) {
        this.video.currentTime = this.loopA;
      }
    }
  },

  togglePlay() {
    if (this.video.paused || this.video.ended) {
      this.video.play();
    } else {
      this.video.pause();
    }
  },

  setSpeed(speed) {
    if (!this.video) return;
    this.video.playbackRate = speed;
    this.rateSlider.value = speed;
    this.rateLabel.textContent = `${speed.toFixed(2)}x`;
    this.speedBadge.textContent = `${speed.toFixed(2)}x`;

    // Highlight active preset button
    this.presetBtns.forEach(btn => {
      if (Math.abs(parseFloat(btn.dataset.speed) - speed) < 0.01) {
        btn.style.borderColor = 'var(--accent-cyan)';
        btn.style.color = 'var(--accent-cyan)';
      } else {
        btn.style.borderColor = '';
        btn.style.color = '';
      }
    });
  },

  stepFrame(deltaSeconds) {
    if (!this.video) return;
    this.video.pause();
    const target = Math.max(0, Math.min(this.video.duration || 0, this.video.currentTime + deltaSeconds));
    this.video.currentTime = target;
  },

  setPointA() {
    if (!this.video) return;
    this.loopA = this.video.currentTime;
    this.pointAVal.textContent = this.formatTime(this.loopA);
    this.pointAVal.style.color = 'var(--accent-cyan)';
    this.checkLoopReady();
    this.app.showToast(`Loop Start [A] set at ${this.formatTime(this.loopA)}`, "info");
  },

  setPointB() {
    if (!this.video) return;
    this.loopB = this.video.currentTime;
    this.pointBVal.textContent = this.formatTime(this.loopB);
    this.pointBVal.style.color = 'var(--accent-cyan)';
    this.checkLoopReady();
    this.app.showToast(`Loop End [B] set at ${this.formatTime(this.loopB)}`, "info");
  },

  checkLoopReady() {
    if (this.loopA !== null && this.loopB !== null && this.loopB > this.loopA) {
      this.toggleLoopBtn.disabled = false;
      this.toggleLoopBtn.textContent = this.loopEnabled ? "Stop A-B Loop" : "Start A-B Loop";
    } else {
      this.toggleLoopBtn.disabled = true;
    }
  },

  toggleLoop() {
    if (this.loopA === null || this.loopB === null || this.loopB <= this.loopA) {
      this.app.showToast("Please ensure Point B is greater than Point A.", "warning");
      return;
    }

    this.loopEnabled = !this.loopEnabled;
    if (this.loopEnabled) {
      this.video.currentTime = this.loopA;
      this.video.play();
      this.loopBadge.style.display = 'block';
      this.toggleLoopBtn.textContent = 'Stop A-B Loop';
      this.toggleLoopBtn.style.background = '#f59e0b';
      this.app.showToast("Continuous A-B Loop active!", "success");
    } else {
      this.loopBadge.style.display = 'none';
      this.toggleLoopBtn.textContent = 'Start A-B Loop';
      this.toggleLoopBtn.style.background = '';
      this.app.showToast("A-B Loop disabled.", "info");
    }
  },

  clearLoop() {
    this.loopA = null;
    this.loopB = null;
    this.loopEnabled = false;
    this.pointAVal.textContent = "Not Set";
    this.pointAVal.style.color = "var(--text-muted)";
    this.pointBVal.textContent = "Not Set";
    this.pointBVal.style.color = "var(--text-muted)";
    this.loopBadge.style.display = 'none';
    this.toggleLoopBtn.disabled = true;
    this.toggleLoopBtn.textContent = 'Start A-B Loop';
    this.toggleLoopBtn.style.background = '';
  },

  formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00:00.00";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  },

  setupKeyboardShortcuts() {
    this.keyHandler = (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' || e.key === 'k') {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.stepFrame(-5);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.stepFrame(5);
      } else if (e.key === ',' || e.key === '<') {
        e.preventDefault();
        this.stepFrame(-0.04);
      } else if (e.key === '.' || e.key === '>') {
        e.preventDefault();
        this.stepFrame(0.04);
      } else if (e.key === '[') {
        e.preventDefault();
        this.setPointA();
      } else if (e.key === ']') {
        e.preventDefault();
        this.setPointB();
      }
    };

    window.addEventListener('keydown', this.keyHandler);
  },

  cleanup() {
    if (this.videoUrl) {
      URL.revokeObjectURL(this.videoUrl);
      this.videoUrl = null;
    }
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
    }
  }
};
