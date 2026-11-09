// OmniTool Hub - Browser Screen & Tab Recorder
// 100% Client-Side screen and audio capture using getDisplayMedia & MediaRecorder API.

import { escapeHtml } from './utils.js';

export default {
  id: "screen-recorder",
  name: "Browser Screen & Tab Recorder",

  // State
  mediaRecorder: null,
  recordedChunks: [],
  screenStream: null,
  micStream: null,
  combinedStream: null,
  audioContext: null,
  timerInterval: null,
  startTime: null,
  elapsedSeconds: 0,
  recordingState: "idle", // 'idle' | 'recording' | 'paused' | 'stopped'
  recordedBlob: null,
  recordedUrl: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Recording Configuration & Controls (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Screen & Tab Recorder</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Capture your full screen, application window, or browser tab with audio commentary.
              </p>
            </div>
            <div id="sr-status-pill" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; background: rgba(255, 255, 255, 0.05); color: var(--text-muted);">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #64748b;"></span>
              <span id="sr-status-text">Ready</span>
            </div>
          </div>

          <!-- Settings Before Recording -->
          <div id="sr-settings-section" style="display: flex; flex-direction: column; gap: 14px; margin-bottom: 18px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main); letter-spacing: 0.5px;">RECORDING OPTIONS</span>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Resolution Target
                  <select id="sr-res-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="native" selected>Original Screen Size</option>
                    <option value="1080">1080p Full HD (1920x1080)</option>
                    <option value="720">720p HD (1280x720)</option>
                    <option value="4k">4K Ultra HD (3840x2160)</option>
                  </select>
                </label>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Frame Rate (FPS)
                  <select id="sr-fps-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="60">60 FPS (Ultra Smooth)</option>
                    <option value="30" selected>30 FPS (Standard / Recommended)</option>
                    <option value="15">15 FPS (Small File Size)</option>
                  </select>
                </label>
              </div>

              <!-- Audio Toggles -->
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 4px;">
                <label style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="sr-system-audio-toggle" checked style="accent-color: var(--accent-cyan); width: 15px; height: 15px;">
                  <span>Capture System Audio / Tab Audio</span>
                </label>

                <label style="display: flex; align-items: center; gap: 10px; font-size: 12px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="sr-mic-audio-toggle" style="accent-color: var(--accent-cyan); width: 15px; height: 15px;">
                  <span>Include Microphone Commentary (Mix Voice with System)</span>
                </label>
              </div>
            </div>

            <!-- Privacy Guarantee Banner -->
            <div style="padding: 10px 14px; border-radius: 8px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 10px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 20px; height: 20px; color: var(--accent-cyan); flex-shrink: 0;">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span><strong>100% In-Browser Privacy:</strong> Your recording is processed exclusively in your browser's local memory. No video or audio is ever uploaded to any cloud server.</span>
            </div>
          </div>

          <!-- Main Actions & Live Timer -->
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <div id="sr-timer-display" style="font-size: 32px; font-weight: 800; font-family: monospace; text-align: center; color: var(--text-main); padding: 12px; background: rgba(0, 0, 0, 0.25); border-radius: 8px; border: 1px solid var(--border-color); letter-spacing: 2px;">
              00:00:00
            </div>

            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <button id="sr-start-btn" class="tool-btn primary" style="font-size: 14px; padding: 10px 24px; display: inline-flex; align-items: center; gap: 8px; min-width: 170px; justify-content: center;">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                <span>Start Recording</span>
              </button>

              <button id="sr-pause-btn" class="tool-btn secondary" style="font-size: 14px; padding: 10px 20px; display: none; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
                <span>Pause</span>
              </button>

              <button id="sr-stop-btn" class="tool-btn secondary" style="font-size: 14px; padding: 10px 20px; display: none; align-items: center; gap: 8px; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.4); color: #ef4444;">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                  <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                </svg>
                <span>Stop &amp; Save</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Live Preview & Playback Video Panel (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Video Monitor &amp; Export</h3>
            <span id="sr-filesize-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Video Monitor Container -->
          <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; position: relative; min-height: 280px; max-height: 440px;">
            <video id="sr-video-preview" autoplay muted playsinline style="width: 100%; height: 100%; object-fit: contain; display: none;"></video>
            <video id="sr-video-playback" controls playsinline style="width: 100%; height: 100%; object-fit: contain; display: none;"></video>

            <!-- Placeholder State -->
            <div id="sr-placeholder" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; padding: 30px; text-align: center; color: var(--text-muted);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 56px; height: 56px; opacity: 0.5;">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">No Active Capture</div>
              <div style="font-size: 11px; max-width: 280px;">Click "Start Recording" to pick a screen, window, or Chrome tab to capture.</div>
            </div>

            <!-- Pulsing Live Indicator Overlay -->
            <div id="sr-recording-badge" style="display: none; position: absolute; top: 12px; left: 12px; background: rgba(239, 68, 68, 0.9); color: white; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; align-items: center; gap: 6px; box-shadow: 0 2px 10px rgba(239, 68, 68, 0.5);">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: white; animation: sr-pulse 1s infinite alternate;"></span>
              <span>REC</span>
            </div>
          </div>

          <!-- Post-Recording Action Strip -->
          <div id="sr-export-section" style="display: none; flex-direction: column; gap: 10px; margin-top: 14px;">
            <div style="display: flex; gap: 10px; align-items: center;">
              <input type="text" id="sr-filename-input" class="tool-input" value="omnitool-screen-recording" placeholder="Recording filename" style="flex: 1; padding: 8px 12px; font-size: 12px;">
              
              <button id="sr-download-webm-btn" class="tool-btn primary" style="font-size: 12px; padding: 8px 18px; display: inline-flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download Video</span>
              </button>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-muted);">
              <span id="sr-format-info">Format: WebM Video (VP9/VP8, Opus Audio)</span>
              <button id="sr-new-recording-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 10px;">Record Another</button>
            </div>
          </div>
        </div>
      
        <!-- Standard Canonical Tool Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: How to Record Screen & Tab Video</span>
            </div>
            <div class="tool-guide-badge">100% In-Browser WebRTC</div>
          </div>

          <div class="tool-guide-steps">
            
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Select Capture Source</h4>
                <p>Choose entire screen, application window, or specific browser tab via native WebRTC.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Configure Audio Inputs</h4>
                <p>Toggle system internal audio, external microphone narration, or silent recording.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Record with Live Controls</h4>
                <p>Pause, resume, and inspect elapsed recording time with real-time hardware encoding.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">4</div>
              <div class="tool-step-content">
                <h4>Export WebM or MP4</h4>
                <p>Download high-framerate video recordings instantly with zero server uploads.</p>
              </div>
            </div>
            
          </div>
        </div>
  </div>

      <style>
        @keyframes sr-pulse {
          0% { opacity: 0.3; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1.15); }
        }
      </style>
    `;
  },

  init(container, appInstance) {
    this.container = container;
    this.app = appInstance;

    // Elements
    this.startBtn = container.querySelector('#sr-start-btn');
    this.pauseBtn = container.querySelector('#sr-pause-btn');
    this.stopBtn = container.querySelector('#sr-stop-btn');
    this.timerDisplay = container.querySelector('#sr-timer-display');
    this.statusPill = container.querySelector('#sr-status-pill');
    this.statusText = container.querySelector('#sr-status-text');
    this.videoPreview = container.querySelector('#sr-video-preview');
    this.videoPlayback = container.querySelector('#sr-video-playback');
    this.placeholder = container.querySelector('#sr-placeholder');
    this.recordingBadge = container.querySelector('#sr-recording-badge');
    this.exportSection = container.querySelector('#sr-export-section');
    this.filesizeBadge = container.querySelector('#sr-filesize-badge');
    this.downloadWebmBtn = container.querySelector('#sr-download-webm-btn');
    this.filenameInput = container.querySelector('#sr-filename-input');
    this.newRecordingBtn = container.querySelector('#sr-new-recording-btn');
    this.settingsSection = container.querySelector('#sr-settings-section');
    this.formatInfo = container.querySelector('#sr-format-info');

    // Options
    this.resSelect = container.querySelector('#sr-res-select');
    this.fpsSelect = container.querySelector('#sr-fps-select');
    this.systemAudioToggle = container.querySelector('#sr-system-audio-toggle');
    this.micAudioToggle = container.querySelector('#sr-mic-audio-toggle');

    // Bind Event Listeners
    this.startBtn.addEventListener('click', () => this.startCapture());
    this.pauseBtn.addEventListener('click', () => this.togglePause());
    this.stopBtn.addEventListener('click', () => this.stopCapture());
    this.downloadWebmBtn.addEventListener('click', () => this.downloadRecording());
    this.newRecordingBtn.addEventListener('click', () => this.resetStudio());

    // Check MediaDevices support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      this.app.showToast("Your browser does not support Screen Capture API. Please use a modern desktop browser (Chrome, Edge, Firefox, Safari).", "error");
      this.startBtn.disabled = true;
      this.startBtn.title = "Screen capture not supported in this browser";
    }
  },

  async startCapture() {
    try {
      this.recordedChunks = [];
      this.elapsedSeconds = 0;
      this.updateTimerDisplay();

      // Determine video constraints
      const fps = parseInt(this.fpsSelect.value) || 30;
      const resVal = this.resSelect.value;
      const videoConstraints = {
        frameRate: { ideal: fps, max: fps }
      };

      if (resVal === '1080') {
        videoConstraints.width = { ideal: 1920 };
        videoConstraints.height = { ideal: 1080 };
      } else if (resVal === '720') {
        videoConstraints.width = { ideal: 1280 };
        videoConstraints.height = { ideal: 720 };
      } else if (resVal === '4k') {
        videoConstraints.width = { ideal: 3840 };
        videoConstraints.height = { ideal: 2160 };
      }

      // Display capture options
      const displayMediaOptions = {
        video: videoConstraints,
        audio: this.systemAudioToggle.checked
      };

      // 1. Request Display Stream
      this.screenStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

      // Handle user pressing browser's native "Stop sharing" bar
      this.screenStream.getVideoTracks()[0].addEventListener('ended', () => {
        if (this.recordingState === 'recording' || this.recordingState === 'paused') {
          this.stopCapture();
        }
      });

      // 2. Request Mic Stream if checked
      const tracks = [...this.screenStream.getVideoTracks()];

      if (this.micAudioToggle.checked) {
        try {
          this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          
          // Audio mixing via AudioContext
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          this.audioContext = new AudioContextClass();
          const dest = this.audioContext.createMediaStreamDestination();

          // Add screen audio if present
          if (this.screenStream.getAudioTracks().length > 0) {
            const screenSource = this.audioContext.createMediaStreamSource(this.screenStream);
            screenSource.connect(dest);
          }

          // Add mic audio
          const micSource = this.audioContext.createMediaStreamSource(this.micStream);
          micSource.connect(dest);

          dest.stream.getAudioTracks().forEach(t => tracks.push(t));
        } catch (micErr) {
          console.warn("Could not access microphone, continuing with screen audio only:", micErr);
          this.app.showToast("Microphone access declined or unavailable. Continuing with screen only.", "warning");
          this.screenStream.getAudioTracks().forEach(t => tracks.push(t));
        }
      } else {
        this.screenStream.getAudioTracks().forEach(t => tracks.push(t));
      }

      this.combinedStream = new MediaStream(tracks);

      // 3. Connect to video live preview
      this.placeholder.style.display = 'none';
      this.videoPlayback.style.display = 'none';
      this.videoPreview.style.display = 'block';
      this.videoPreview.srcObject = this.screenStream;
      this.videoPreview.play();

      // 4. Determine supported MIME types
      let mimeType = 'video/webm; codecs=vp9,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm; codecs=vp8,opus';
      }
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }
      if (!MediaRecorder.isTypeSupported(mimeType) && MediaRecorder.isTypeSupported('video/mp4')) {
        mimeType = 'video/mp4';
      }

      this.mediaRecorder = new MediaRecorder(this.combinedStream, {
        mimeType: mimeType,
        videoBitsPerSecond: 4000000 // 4 Mbps high clarity
      });

      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          this.recordedChunks.push(e.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.processRecording();
      };

      // Start recording with 1-second timeslices
      this.mediaRecorder.start(1000);
      this.recordingState = "recording";
      this.startTime = Date.now();

      // Start timer
      this.timerInterval = setInterval(() => {
        this.elapsedSeconds++;
        this.updateTimerDisplay();
      }, 1000);

      // Update UI state
      this.updateUIState();
      this.app.showToast("Screen recording started! Use Pause or Stop when ready.", "info");

    } catch (err) {
      console.error("Screen recording setup error:", err);
      if (err.name !== 'NotAllowedError') {
        this.app.showToast(`Failed to start recording: ${err.message}`, "error");
      }
      this.resetStudio();
    }
  },

  togglePause() {
    if (!this.mediaRecorder) return;

    if (this.recordingState === "recording") {
      this.mediaRecorder.pause();
      this.recordingState = "paused";
      clearInterval(this.timerInterval);
      this.pauseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Resume</span>
      `;
      this.statusText.textContent = "Paused";
      this.statusPill.style.color = "#f59e0b";
      this.recordingBadge.style.display = "none";
      this.app.showToast("Recording paused.", "info");
    } else if (this.recordingState === "paused") {
      this.mediaRecorder.resume();
      this.recordingState = "recording";
      this.timerInterval = setInterval(() => {
        this.elapsedSeconds++;
        this.updateTimerDisplay();
      }, 1000);
      this.pauseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
        <span>Pause</span>
      `;
      this.statusText.textContent = "Recording";
      this.statusPill.style.color = "#ef4444";
      this.recordingBadge.style.display = "flex";
      this.app.showToast("Recording resumed.", "info");
    }
  },

  stopCapture() {
    if (!this.mediaRecorder) return;

    clearInterval(this.timerInterval);
    this.recordingState = "stopped";

    if (this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    // Stop and release live media tracks
    this.releaseStreams();
    this.updateUIState();
  },

  processRecording() {
    if (this.recordedChunks.length === 0) {
      this.app.showToast("No video data was captured.", "warning");
      this.resetStudio();
      return;
    }

    const mime = this.mediaRecorder ? this.mediaRecorder.mimeType : 'video/webm';
    this.recordedBlob = new Blob(this.recordedChunks, { type: mime });

    if (this.recordedUrl) {
      URL.revokeObjectURL(this.recordedUrl);
    }
    this.recordedUrl = URL.createObjectURL(this.recordedBlob);

    // Switch preview to playback element
    this.videoPreview.pause();
    this.videoPreview.style.display = 'none';
    this.videoPreview.srcObject = null;

    this.videoPlayback.src = this.recordedUrl;
    this.videoPlayback.style.display = 'block';
    this.videoPlayback.load();

    // Calculate file size
    const sizeMb = (this.recordedBlob.size / (1024 * 1024)).toFixed(2);
    this.filesizeBadge.textContent = `${sizeMb} MB • ${this.timerDisplay.textContent}`;
    this.exportSection.style.display = 'flex';
    this.recordingBadge.style.display = 'none';

    const isMp4 = mime.includes('mp4');
    this.formatInfo.textContent = `Format: ${isMp4 ? 'MP4' : 'WebM'} Video • ${sizeMb} MB`;
    this.downloadWebmBtn.querySelector('span').textContent = `Download (${isMp4 ? '.mp4' : '.webm'})`;

    this.app.showToast("Recording finished and ready for playback & download!", "success");
  },

  downloadRecording() {
    if (!this.recordedBlob || !this.recordedUrl) return;

    const baseName = (this.filenameInput.value || "omnitool-screen-recording").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
    const isMp4 = this.recordedBlob.type.includes('mp4');
    const ext = isMp4 ? 'mp4' : 'webm';
    const filename = `${baseName}.${ext}`;

    const a = document.createElement('a');
    a.href = this.recordedUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.app.showToast(`Saved ${filename} to your downloads!`, "success");
  },

  resetStudio() {
    this.releaseStreams();
    if (this.recordedUrl) {
      URL.revokeObjectURL(this.recordedUrl);
      this.recordedUrl = null;
    }
    this.recordedBlob = null;
    this.recordedChunks = [];
    this.elapsedSeconds = 0;
    this.recordingState = "idle";
    clearInterval(this.timerInterval);

    this.videoPreview.style.display = 'none';
    this.videoPlayback.style.display = 'none';
    this.videoPlayback.src = '';
    this.placeholder.style.display = 'flex';
    this.exportSection.style.display = 'none';
    this.recordingBadge.style.display = 'none';
    this.filesizeBadge.textContent = '';
    this.updateTimerDisplay();
    this.updateUIState();
  },

  releaseStreams() {
    if (this.screenStream) {
      this.screenStream.getTracks().forEach(t => t.stop());
      this.screenStream = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.combinedStream) {
      this.combinedStream.getTracks().forEach(t => t.stop());
      this.combinedStream = null;
    }
    if (this.audioContext) {
      try { this.audioContext.close(); } catch (e) {}
      this.audioContext = null;
    }
  },

  updateTimerDisplay() {
    const hrs = Math.floor(this.elapsedSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((this.elapsedSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    this.timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
  },

  updateUIState() {
    if (this.recordingState === "idle") {
      this.startBtn.style.display = "inline-flex";
      this.pauseBtn.style.display = "none";
      this.stopBtn.style.display = "none";
      this.statusText.textContent = "Ready";
      this.statusPill.style.color = "var(--text-muted)";
      this.statusPill.querySelector('span:first-child').style.background = "#64748b";
      this.settingsSection.style.opacity = "1";
      this.settingsSection.style.pointerEvents = "auto";
      this.recordingBadge.style.display = "none";
    } else if (this.recordingState === "recording") {
      this.startBtn.style.display = "none";
      this.pauseBtn.style.display = "inline-flex";
      this.stopBtn.style.display = "inline-flex";
      this.statusText.textContent = "Recording";
      this.statusPill.style.color = "#ef4444";
      this.statusPill.querySelector('span:first-child').style.background = "#ef4444";
      this.settingsSection.style.opacity = "0.4";
      this.settingsSection.style.pointerEvents = "none";
      this.recordingBadge.style.display = "flex";
    } else if (this.recordingState === "stopped") {
      this.startBtn.style.display = "none";
      this.pauseBtn.style.display = "none";
      this.stopBtn.style.display = "none";
      this.statusText.textContent = "Captured";
      this.statusPill.style.color = "var(--accent-cyan)";
      this.statusPill.querySelector('span:first-child').style.background = "var(--accent-cyan)";
      this.settingsSection.style.opacity = "1";
      this.settingsSection.style.pointerEvents = "auto";
      this.recordingBadge.style.display = "none";
    }
  },

  cleanup() {
    this.releaseStreams();
    if (this.recordedUrl) {
      URL.revokeObjectURL(this.recordedUrl);
      this.recordedUrl = null;
    }
    clearInterval(this.timerInterval);
  }
};
