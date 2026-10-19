// OmniTool Hub - Voice Recorder & Live Waveform Studio
// 100% Client-Side audio recording with real-time spectrum/oscilloscope visualization and WAV/WebM export.

import { escapeHtml } from './utils.js';

export default {
  id: "voice-recorder",
  name: "Voice Recorder & Audio Waveform Studio",

  // Audio & Visualization state
  audioContext: null,
  analyser: null,
  sourceNode: null,
  micStream: null,
  mediaRecorder: null,
  recordedChunks: [],
  animationFrameId: null,
  audioChunksBuffer: [],
  recordedBlob: null,
  recordedUrl: null,

  timerInterval: null,
  elapsedSeconds: 0,
  recordingState: "idle", // 'idle' | 'recording' | 'paused' | 'stopped'
  visMode: "bars", // 'bars' | 'wave'

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Recording Studio & Controls (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Voice &amp; Audio Recorder</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Capture studio-grade voice memos, interviews, or podcasts with real-time waveform analysis.
              </p>
            </div>
            <div id="vr-status-pill" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; background: rgba(255, 255, 255, 0.05); color: var(--text-muted);">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #64748b;"></span>
              <span id="vr-status-text">Ready</span>
            </div>
          </div>

          <!-- Studio Configuration Options -->
          <div id="vr-settings" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main); letter-spacing: 0.5px;">AUDIO ENHANCEMENT</span>
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="vr-noise-suppression" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                  <span>Noise Suppression</span>
                </label>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="vr-echo-cancel" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                  <span>Echo Cancellation</span>
                </label>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 4px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Channels &amp; Quality
                  <select id="vr-channel-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="mono" selected>Mono (Best for Vocals &amp; Speech)</option>
                    <option value="stereo">Stereo (2 Channels)</option>
                  </select>
                </label>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Visualizer Mode
                  <select id="vr-vis-mode-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="bars" selected>Frequency Spectrum Bars</option>
                    <option value="wave">Smooth Oscilloscope Wave</option>
                  </select>
                </label>
              </div>
            </div>

            <!-- Volume Peak Level Indicator -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
                <span>Input Mic Level</span>
                <span id="vr-level-text">0%</span>
              </div>
              <div style="height: 8px; background: rgba(255, 255, 255, 0.06); border-radius: 4px; overflow: hidden; position: relative;">
                <div id="vr-level-bar" style="height: 100%; width: 0%; background: linear-gradient(to right, #10b981 60%, #f59e0b 85%, #ef4444 100%); transition: width 0.05s ease;"></div>
              </div>
            </div>
          </div>

          <!-- Timer & Main Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <div id="vr-timer-display" style="font-size: 36px; font-weight: 800; font-family: monospace; text-align: center; color: var(--text-main); padding: 12px; background: rgba(0, 0, 0, 0.25); border-radius: 8px; border: 1px solid var(--border-color); letter-spacing: 2px;">
              00:00:00
            </div>

            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <button id="vr-record-btn" class="tool-btn primary" style="font-size: 14px; padding: 10px 24px; display: inline-flex; align-items: center; gap: 8px; min-width: 170px; justify-content: center;">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                <span>Record Audio</span>
              </button>

              <button id="vr-pause-btn" class="tool-btn secondary" style="font-size: 14px; padding: 10px 20px; display: none; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
                <span>Pause</span>
              </button>

              <button id="vr-stop-btn" class="tool-btn secondary" style="font-size: 14px; padding: 10px 20px; display: none; align-items: center; gap: 8px; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.4); color: #ef4444;">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                  <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                </svg>
                <span>Stop &amp; Process</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Real-Time Waveform & Playback Hub (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Oscilloscope &amp; Audio Player</h3>
            <span id="vr-duration-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Waveform Canvas Display -->
          <div style="flex: 1; min-height: 220px; max-height: 280px; background: #07090e; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center;">
            <canvas id="vr-vis-canvas" width="600" height="240" style="width: 100%; height: 100%; display: block;"></canvas>
            
            <div id="vr-vis-placeholder" style="position: absolute; display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--text-muted); pointer-events: none;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 48px; height: 48px; opacity: 0.5;">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
              <span style="font-size: 12px;">Microphone idle. Click "Record Audio" to begin.</span>
            </div>
          </div>

          <!-- Audio Playback Deck (Shows after recording stops) -->
          <div id="vr-playback-section" style="display: none; flex-direction: column; gap: 12px; margin-top: 14px;">
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;">
              <audio id="vr-audio-player" controls style="width: 100%; height: 42px; outline: none;"></audio>
            </div>

            <!-- Export Buttons Strip -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <input type="text" id="vr-filename-input" class="tool-input" value="omnitool-voice-memo" placeholder="File name" style="flex: 1; min-width: 140px; padding: 8px 12px; font-size: 12px;">
              
              <button id="vr-download-wav-btn" class="tool-btn primary" style="font-size: 12px; padding: 8px 16px; display: inline-flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download WAV (Lossless)</span>
              </button>

              <button id="vr-download-webm-btn" class="tool-btn secondary" style="font-size: 12px; padding: 8px 14px;">
                <span>Download WebM/Opus</span>
              </button>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-muted);">
              <span id="vr-specs-info">Standard 44.1kHz • 16-Bit PCM</span>
              <button id="vr-new-recording-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 10px;">Record Another Memo</button>
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
    this.recordBtn = container.querySelector('#vr-record-btn');
    this.pauseBtn = container.querySelector('#vr-pause-btn');
    this.stopBtn = container.querySelector('#vr-stop-btn');
    this.timerDisplay = container.querySelector('#vr-timer-display');
    this.statusPill = container.querySelector('#vr-status-pill');
    this.statusText = container.querySelector('#vr-status-text');
    this.visCanvas = container.querySelector('#vr-vis-canvas');
    this.visPlaceholder = container.querySelector('#vr-vis-placeholder');
    this.levelBar = container.querySelector('#vr-level-bar');
    this.levelText = container.querySelector('#vr-level-text');
    this.playbackSection = container.querySelector('#vr-playback-section');
    this.audioPlayer = container.querySelector('#vr-audio-player');
    this.downloadWavBtn = container.querySelector('#vr-download-wav-btn');
    this.downloadWebmBtn = container.querySelector('#vr-download-webm-btn');
    this.filenameInput = container.querySelector('#vr-filename-input');
    this.newRecordingBtn = container.querySelector('#vr-new-recording-btn');
    this.durationBadge = container.querySelector('#vr-duration-badge');
    this.specsInfo = container.querySelector('#vr-specs-info');
    this.settings = container.querySelector('#vr-settings');

    // Controls
    this.noiseSuppression = container.querySelector('#vr-noise-suppression');
    this.echoCancel = container.querySelector('#vr-echo-cancel');
    this.channelSelect = container.querySelector('#vr-channel-select');
    this.visModeSelect = container.querySelector('#vr-vis-mode-select');

    // Canvas context
    this.canvasCtx = this.visCanvas.getContext('2d');

    // Events
    this.recordBtn.addEventListener('click', () => this.startRecording());
    this.pauseBtn.addEventListener('click', () => this.togglePause());
    this.stopBtn.addEventListener('click', () => this.stopRecording());
    this.downloadWavBtn.addEventListener('click', () => this.exportWav());
    this.downloadWebmBtn.addEventListener('click', () => this.exportWebm());
    this.newRecordingBtn.addEventListener('click', () => this.resetStudio());
    this.visModeSelect.addEventListener('change', (e) => {
      this.visMode = e.target.value;
    });

    // Initial canvas clear
    this.drawIdleCanvas();
  },

  async startRecording() {
    try {
      this.recordedChunks = [];
      this.audioChunksBuffer = [];
      this.elapsedSeconds = 0;
      this.updateTimerDisplay();

      const channelCount = this.channelSelect.value === 'stereo' ? 2 : 1;
      const constraints = {
        audio: {
          channelCount: channelCount,
          echoCancellation: this.echoCancel.checked,
          noiseSuppression: this.noiseSuppression.checked,
          autoGainControl: true
        }
      };

      // 1. Get User Media Stream
      this.micStream = await navigator.mediaDevices.getUserMedia(constraints);

      // 2. Set up Web Audio API Analyser
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      this.sourceNode = this.audioContext.createMediaStreamSource(this.micStream);
      this.sourceNode.connect(this.analyser);

      // Raw PCM collector via ScriptProcessor or AudioWorklet for lossless WAV
      const bufferSize = 4096;
      this.scriptProcessor = this.audioContext.createScriptProcessor(bufferSize, channelCount, channelCount);
      this.scriptProcessor.onaudioprocess = (e) => {
        if (this.recordingState !== 'recording') return;
        const left = e.inputBuffer.getChannelData(0);
        const leftCopy = new Float32Array(left);
        let rightCopy = null;
        if (channelCount === 2) {
          const right = e.inputBuffer.getChannelData(1);
          rightCopy = new Float32Array(right);
        }
        this.audioChunksBuffer.push({ left: leftCopy, right: rightCopy });
      };
      this.sourceNode.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioContext.destination);

      // 3. MediaRecorder for WebM stream
      let mimeType = 'audio/webm; codecs=opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'audio/webm';
      if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'audio/ogg';

      this.mediaRecorder = new MediaRecorder(this.micStream, { mimeType: mimeType });
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) this.recordedChunks.push(e.data);
      };

      this.mediaRecorder.start(500);
      this.recordingState = "recording";

      // 4. Start visualizer animation loop
      this.visPlaceholder.style.display = 'none';
      this.renderVisualizer();

      // 5. Start timer
      this.timerInterval = setInterval(() => {
        this.elapsedSeconds++;
        this.updateTimerDisplay();
      }, 1000);

      this.updateUIState();
      this.app.showToast("Microphone live! Recording audio...", "info");

    } catch (err) {
      console.error("Microphone access error:", err);
      this.app.showToast(`Unable to access microphone: ${err.message}`, "error");
      this.resetStudio();
    }
  },

  togglePause() {
    if (!this.mediaRecorder) return;

    if (this.recordingState === "recording") {
      this.mediaRecorder.pause();
      if (this.audioContext) this.audioContext.suspend();
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
      this.app.showToast("Recording paused.", "info");
    } else if (this.recordingState === "paused") {
      this.mediaRecorder.resume();
      if (this.audioContext) this.audioContext.resume();
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
      this.app.showToast("Recording resumed.", "info");
    }
  },

  stopRecording() {
    clearInterval(this.timerInterval);
    cancelAnimationFrame(this.animationFrameId);
    this.recordingState = "stopped";

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
    }

    // Stop mic stream
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
    }

    // Reset volume meter
    this.levelBar.style.width = '0%';
    this.levelText.textContent = '0%';

    // Process Recorded Audio into playable URL
    setTimeout(() => {
      this.processAudio();
    }, 300);

    this.updateUIState();
  },

  processAudio() {
    const mime = (this.mediaRecorder && this.mediaRecorder.mimeType) || 'audio/webm';
    this.recordedBlob = new Blob(this.recordedChunks, { type: mime });

    if (this.recordedUrl) URL.revokeObjectURL(this.recordedUrl);
    this.recordedUrl = URL.createObjectURL(this.recordedBlob);

    this.audioPlayer.src = this.recordedUrl;
    this.audioPlayer.load();

    this.playbackSection.style.display = 'flex';
    this.durationBadge.textContent = `${this.timerDisplay.textContent} • ${(this.recordedBlob.size / 1024).toFixed(1)} KB`;
    this.specsInfo.textContent = `Sample Rate: ${(this.audioContext ? this.audioContext.sampleRate : 44100)} Hz • ${this.channelSelect.value.toUpperCase()}`;

    // Draw completed waveform snapshot on canvas
    this.drawCompletedWaveform();
    this.app.showToast("Voice memo recorded successfully!", "success");
  },

  renderVisualizer() {
    if (this.recordingState !== 'recording' && this.recordingState !== 'paused') return;

    const width = this.visCanvas.width;
    const height = this.visCanvas.height;
    const ctx = this.canvasCtx;

    if (this.visMode === 'bars') {
      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#07090e';
      ctx.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;
      let sum = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height * 0.85;
        sum += dataArray[i];

        const gradient = ctx.createLinearGradient(0, height - barHeight, 0, height);
        gradient.addColorStop(0, '#00f2fe');
        gradient.addColorStop(0.5, '#4facfe');
        gradient.addColorStop(1, '#0072ff');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
        x += barWidth;
      }

      // Update volume meter level
      const avg = sum / bufferLength;
      const pct = Math.min(100, Math.round((avg / 128) * 100));
      this.levelBar.style.width = `${pct}%`;
      this.levelText.textContent = `${pct}%`;

    } else {
      // Oscilloscope wave
      const bufferLength = this.analyser.fftSize;
      const dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#07090e';
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#00f2fe';
      ctx.beginPath();

      const sliceWidth = width * 1.0 / bufferLength;
      let x = 0;
      let peak = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * height / 2;
        const diff = Math.abs(dataArray[i] - 128);
        if (diff > peak) peak = diff;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();

      const pct = Math.min(100, Math.round((peak / 128) * 100));
      this.levelBar.style.width = `${pct}%`;
      this.levelText.textContent = `${pct}%`;
    }

    this.animationFrameId = requestAnimationFrame(() => this.renderVisualizer());
  },

  drawIdleCanvas() {
    const ctx = this.canvasCtx;
    ctx.fillStyle = '#07090e';
    ctx.fillRect(0, 0, this.visCanvas.width, this.visCanvas.height);
  },

  drawCompletedWaveform() {
    const ctx = this.canvasCtx;
    const width = this.visCanvas.width;
    const height = this.visCanvas.height;

    ctx.fillStyle = '#07090e';
    ctx.fillRect(0, 0, width, height);

    if (this.audioChunksBuffer.length === 0) return;

    // Draw stylized summary waveform
    const step = Math.ceil(this.audioChunksBuffer.length / 80);
    const barWidth = width / 80;

    ctx.fillStyle = '#4facfe';
    for (let i = 0; i < 80; i++) {
      const idx = i * step;
      let maxVal = 0.1;
      if (idx < this.audioChunksBuffer.length) {
        const chunk = this.audioChunksBuffer[idx].left;
        for (let j = 0; j < chunk.length; j += 16) {
          const val = Math.abs(chunk[j]);
          if (val > maxVal) maxVal = val;
        }
      }
      const barHeight = Math.max(4, maxVal * (height - 20));
      const y = (height - barHeight) / 2;
      ctx.fillRect(i * barWidth, y, barWidth - 2, barHeight);
    }
  },

  exportWav() {
    if (this.audioChunksBuffer.length === 0) {
      this.app.showToast("No audio buffer available to convert to WAV.", "warning");
      return;
    }

    const sampleRate = this.audioContext ? this.audioContext.sampleRate : 44100;
    const numChannels = this.channelSelect.value === 'stereo' ? 2 : 1;

    // Flatten buffers
    let totalSamples = 0;
    for (const chunk of this.audioChunksBuffer) {
      totalSamples += chunk.left.length;
    }

    const wavBuffer = this.encodeWAV(this.audioChunksBuffer, totalSamples, sampleRate, numChannels);
    const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });

    const baseName = (this.filenameInput.value || "omnitool-voice-memo").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `${baseName}.wav`;

    const a = document.createElement('a');
    a.href = URL.createObjectURL(wavBlob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.app.showToast(`Downloaded pristine WAV: ${filename}`, "success");
  },

  encodeWAV(chunks, totalSamples, sampleRate, numChannels) {
    const bytesPerSample = 2; // 16-bit
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = totalSamples * blockAlign;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    // RIFF chunk descriptor
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    this.writeString(view, 8, 'WAVE');

    // fmt sub-chunk
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // SubChunk1Size (16 for PCM)
    view.setUint16(20, 1, true); // AudioFormat 1 = PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true); // BitsPerSample

    // data sub-chunk
    this.writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    // Write PCM 16-bit samples
    let offset = 44;
    for (const chunk of chunks) {
      const left = chunk.left;
      const right = chunk.right;
      for (let i = 0; i < left.length; i++) {
        // Clamp and write left channel
        let s = Math.max(-1, Math.min(1, left[i]));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        offset += 2;

        if (numChannels === 2 && right) {
          s = Math.max(-1, Math.min(1, right[i]));
          view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
          offset += 2;
        }
      }
    }

    return buffer;
  },

  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  },

  exportWebm() {
    if (!this.recordedBlob) return;
    const baseName = (this.filenameInput.value || "omnitool-voice-memo").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `${baseName}.webm`;

    const a = document.createElement('a');
    a.href = this.recordedUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.app.showToast(`Downloaded WebM: ${filename}`, "success");
  },

  resetStudio() {
    if (this.recordedUrl) {
      URL.revokeObjectURL(this.recordedUrl);
      this.recordedUrl = null;
    }
    this.recordedBlob = null;
    this.recordedChunks = [];
    this.audioChunksBuffer = [];
    this.elapsedSeconds = 0;
    this.recordingState = "idle";
    clearInterval(this.timerInterval);
    cancelAnimationFrame(this.animationFrameId);

    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.audioContext) {
      try { this.audioContext.close(); } catch (e) {}
      this.audioContext = null;
    }

    this.playbackSection.style.display = 'none';
    this.visPlaceholder.style.display = 'flex';
    this.durationBadge.textContent = '';
    this.updateTimerDisplay();
    this.drawIdleCanvas();
    this.updateUIState();
  },

  updateTimerDisplay() {
    const hrs = Math.floor(this.elapsedSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((this.elapsedSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    this.timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
  },

  updateUIState() {
    if (this.recordingState === "idle") {
      this.recordBtn.style.display = "inline-flex";
      this.pauseBtn.style.display = "none";
      this.stopBtn.style.display = "none";
      this.statusText.textContent = "Ready";
      this.statusPill.style.color = "var(--text-muted)";
      this.statusPill.querySelector('span:first-child').style.background = "#64748b";
      this.settings.style.opacity = "1";
      this.settings.style.pointerEvents = "auto";
    } else if (this.recordingState === "recording") {
      this.recordBtn.style.display = "none";
      this.pauseBtn.style.display = "inline-flex";
      this.stopBtn.style.display = "inline-flex";
      this.statusText.textContent = "Recording";
      this.statusPill.style.color = "#ef4444";
      this.statusPill.querySelector('span:first-child').style.background = "#ef4444";
      this.settings.style.opacity = "0.4";
      this.settings.style.pointerEvents = "none";
    } else if (this.recordingState === "stopped") {
      this.recordBtn.style.display = "none";
      this.pauseBtn.style.display = "none";
      this.stopBtn.style.display = "none";
      this.statusText.textContent = "Captured";
      this.statusPill.style.color = "var(--accent-cyan)";
      this.statusPill.querySelector('span:first-child').style.background = "var(--accent-cyan)";
      this.settings.style.opacity = "1";
      this.settings.style.pointerEvents = "auto";
    }
  },

  cleanup() {
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.audioContext) {
      try { this.audioContext.close(); } catch (e) {}
      this.audioContext = null;
    }
    if (this.recordedUrl) {
      URL.revokeObjectURL(this.recordedUrl);
      this.recordedUrl = null;
    }
    clearInterval(this.timerInterval);
    cancelAnimationFrame(this.animationFrameId);
  }
};
