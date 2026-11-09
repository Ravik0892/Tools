// OmniTool Hub - Video to MP3 / WAV Audio Extractor
// 100% Client-Side audio demuxing and conversion using Web Audio API AudioContext & PCM encoding.

import { escapeHtml } from './utils.js';

export default {
  id: "mp4-to-mp3",
  name: "MP4 to MP3 / WAV Audio Extractor",

  videoFile: null,
  audioBuffer: null,
  audioContext: null,
  isProcessing: false,
  trimmedStart: 0,
  trimmedEnd: 0,
  audioBlob: null,
  audioUrl: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Video Upload & Extraction Controls (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Video to Audio Extractor</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Extract pristine audio tracks from MP4, WebM, or MOV files with optional range trimming.
              </p>
            </div>
            <button class="tool-btn secondary" id="m2a-reset-btn" style="font-size: 11px; padding: 4px 10px; display: none;">New Video</button>
          </div>

          <!-- Video Upload Dropzone -->
          <div id="m2a-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 40px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 220px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 48px; height: 48px; color: var(--accent-cyan); margin-bottom: 12px;">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drop MP4 or Video file here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              Supports MP4, WebM, MKV, AVI, MOV. Zero upload bandwidth used.
            </div>
            <input type="file" id="m2a-file-input" accept="video/*,audio/*" style="display: none;">
          </div>

          <!-- Progress Deck during Audio Demuxing -->
          <div id="m2a-progress-box" style="display: none; flex-direction: column; gap: 10px; padding: 24px; background: rgba(0, 0, 0, 0.3); border: 1px solid var(--border-color); border-radius: 10px; text-align: center;">
            <div style="display: flex; justify-content: center;">
              <div style="width: 32px; height: 32px; border: 3px solid rgba(0, 242, 254, 0.2); border-top-color: var(--accent-cyan); border-radius: 50%; animation: m2a-spin 0.8s linear infinite;"></div>
            </div>
            <div style="font-size: 13px; font-weight: 700; color: var(--text-main);" id="m2a-progress-title">
              Decoding Audio Track in Browser...
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              Using Web Audio API multi-channel demuxer. No cloud upload.
            </div>
          </div>

          <!-- Extraction Settings (Visible after video loaded) -->
          <div id="m2a-settings-deck" style="display: none; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main); letter-spacing: 0.5px;">AUDIO FORMAT &amp; EXPORT QUALITY</span>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Target Format
                  <select id="m2a-format-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="wav" selected>WAV (Studio 16-bit Lossless)</option>
                    <option value="webm">WebM / Opus (High Efficiency)</option>
                  </select>
                </label>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Audio Channels
                  <select id="m2a-channels-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="original" selected>Keep Original (Stereo)</option>
                    <option value="mono">Convert to Mono (1 Channel)</option>
                  </select>
                </label>
              </div>

              <!-- Time Clipping / Range Selection -->
              <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 4px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 11px; font-weight: 700; color: var(--text-main);">Trim Audio Range (Optional)</span>
                  <label style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-muted); cursor: pointer;">
                    <input type="checkbox" id="m2a-trim-toggle" style="accent-color: var(--accent-cyan); width: 13px; height: 13px;">
                    <span>Enable Trimming</span>
                  </label>
                </div>

                <div id="m2a-trim-inputs" style="display: none; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <label style="display: flex; flex-direction: column; gap: 2px; font-size: 10px; color: var(--text-muted);">
                    Start Time (Seconds)
                    <input type="number" id="m2a-trim-start" class="tool-input" value="0" min="0" step="0.5" style="padding: 6px; font-size: 12px; font-family: monospace;">
                  </label>
                  <label style="display: flex; flex-direction: column; gap: 2px; font-size: 10px; color: var(--text-muted);">
                    End Time (Seconds)
                    <input type="number" id="m2a-trim-end" class="tool-input" value="0" min="0" step="0.5" style="padding: 6px; font-size: 12px; font-family: monospace;">
                  </label>
                </div>
              </div>
            </div>

            <!-- Extract Action Button -->
            <button class="tool-btn primary" id="m2a-extract-btn" style="font-size: 14px; padding: 12px 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Extract &amp; Download Audio</span>
            </button>
          </div>
        </div>

        <!-- Waveform Preview & Audio Player (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Extracted Track &amp; Waveform</h3>
            <span id="m2a-track-info" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Audio Waveform Visualization -->
          <div style="flex: 1; min-height: 220px; max-height: 260px; background: #07090e; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center;">
            <canvas id="m2a-waveform-canvas" width="600" height="240" style="width: 100%; height: 100%; display: block;"></canvas>
            
            <div id="m2a-waveform-placeholder" style="position: absolute; display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--text-muted); pointer-events: none;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 48px; height: 48px; opacity: 0.5;">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span style="font-size: 12px;">Load a video file to view audio waveform</span>
            </div>
          </div>

          <!-- Audio Player & Instant Download Strip -->
          <div id="m2a-download-deck" style="display: none; flex-direction: column; gap: 10px; margin-top: 14px;">
            <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px;">
              <audio id="m2a-audio-preview" controls style="width: 100%; height: 40px; outline: none;"></audio>
            </div>

            <div style="display: flex; gap: 10px; align-items: center;">
              <input type="text" id="m2a-filename-input" class="tool-input" value="extracted-audio" placeholder="Audio filename" style="flex: 1; padding: 8px 12px; font-size: 12px;">
              <button class="tool-btn primary" id="m2a-save-btn" style="font-size: 12px; padding: 8px 18px;">
                Download File
              </button>
            </div>
          </div>
        </div>
      
        <!-- Dynamic Guide Card (Unified standard footer guide) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>QUICK GUIDE: VIDEO TO AUDIO EXTRACTOR (MP4 TO MP3)</span>
            </div>
          </div>
          <div class="tool-guide-steps">

            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Select Video File</strong>: Upload any MP4, WebM, MKV, or MOV video file directly in the browser via HTML5 File API.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Choose Audio Format & Bitrate</strong>: Select output format (MP3, WAV, AAC) and audio fidelity (128 kbps, 192 kbps, 320 kbps high-definition).</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Extract & Download Audio</strong>: Click Extract Audio to decode the soundtrack locally with WebAudio/FFmpeg and save your audio file.</div>
            </div>
          </div>
        </div>
      </div>

      <style>
        @keyframes m2a-spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
  },

  init(container, appInstance) {
    this.container = container;
    this.app = appInstance;

    // Elements
    this.dropzone = container.querySelector('#m2a-dropzone');
    this.fileInput = container.querySelector('#m2a-file-input');
    this.progressBox = container.querySelector('#m2a-progress-box');
    this.settingsDeck = container.querySelector('#m2a-settings-deck');
    this.resetBtn = container.querySelector('#m2a-reset-btn');
    this.formatSelect = container.querySelector('#m2a-format-select');
    this.channelsSelect = container.querySelector('#m2a-channels-select');
    this.trimToggle = container.querySelector('#m2a-trim-toggle');
    this.trimInputs = container.querySelector('#m2a-trim-inputs');
    this.trimStart = container.querySelector('#m2a-trim-start');
    this.trimEnd = container.querySelector('#m2a-trim-end');
    this.extractBtn = container.querySelector('#m2a-extract-btn');
    this.waveformCanvas = container.querySelector('#m2a-waveform-canvas');
    this.waveformPlaceholder = container.querySelector('#m2a-waveform-placeholder');
    this.trackInfo = container.querySelector('#m2a-track-info');
    this.downloadDeck = container.querySelector('#m2a-download-deck');
    this.audioPreview = container.querySelector('#m2a-audio-preview');
    this.filenameInput = container.querySelector('#m2a-filename-input');
    this.saveBtn = container.querySelector('#m2a-save-btn');

    this.canvasCtx = this.waveformCanvas.getContext('2d');

    // Drag and drop setup
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
        this.processVideoFile(e.dataTransfer.files[0]);
      }
    });

    this.fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.processVideoFile(e.target.files[0]);
      }
    });

    this.trimToggle.addEventListener('change', (e) => {
      this.trimInputs.style.display = e.target.checked ? 'grid' : 'none';
    });

    this.resetBtn.addEventListener('click', () => this.resetStudio());
    this.extractBtn.addEventListener('click', () => this.performExtraction());
    this.saveBtn.addEventListener('click', () => this.performExtraction());

    this.drawIdleCanvas();
  },

  async processVideoFile(file) {
    this.videoFile = file;
    this.dropzone.style.display = 'none';
    this.progressBox.style.display = 'flex';

    try {
      // Clean previous audio
      if (this.audioUrl) {
        URL.revokeObjectURL(this.audioUrl);
        this.audioUrl = null;
      }

      // Read video array buffer
      const arrayBuffer = await file.arrayBuffer();

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();

      // Decode audio stream
      this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

      // Successfully decoded!
      this.progressBox.style.display = 'none';
      this.settingsDeck.style.display = 'flex';
      this.resetBtn.style.display = 'inline-block';
      this.waveformPlaceholder.style.display = 'none';

      // Set default filename
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      this.filenameInput.value = `${cleanName}-audio`;

      // Set trim limits
      this.trimStart.value = "0";
      this.trimEnd.value = this.audioBuffer.duration.toFixed(2);
      this.trimEnd.max = this.audioBuffer.duration.toFixed(2);

      const mins = Math.floor(this.audioBuffer.duration / 60);
      const secs = Math.floor(this.audioBuffer.duration % 60);
      this.trackInfo.textContent = `${mins}m ${secs}s • ${this.audioBuffer.sampleRate} Hz • ${this.audioBuffer.numberOfChannels} Ch`;

      // Render waveform
      this.drawWaveform(this.audioBuffer);
      this.app.showToast("Audio track decoded successfully!", "success");

    } catch (err) {
      console.error("Audio demux error:", err);
      this.progressBox.style.display = 'none';
      this.dropzone.style.display = 'flex';
      this.app.showToast(`Could not extract audio track: ${err.message}. Ensure video has an audio stream.`, "error");
    }
  },

  drawWaveform(buffer) {
    const ctx = this.canvasCtx;
    const width = this.waveformCanvas.width;
    const height = this.waveformCanvas.height;

    ctx.fillStyle = '#07090e';
    ctx.fillRect(0, 0, width, height);

    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / width);
    const amp = height / 2;

    ctx.fillStyle = '#00f2fe';

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = data[(i * step) + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      ctx.fillRect(i, (1 + min) * amp, 1, Math.max(1, (max - min) * amp));
    }
  },

  drawIdleCanvas() {
    const ctx = this.canvasCtx;
    ctx.fillStyle = '#07090e';
    ctx.fillRect(0, 0, this.waveformCanvas.width, this.waveformCanvas.height);
  },

  async performExtraction() {
    if (!this.audioBuffer) {
      this.app.showToast("No audio loaded to extract.", "warning");
      return;
    }

    try {
      const format = this.formatSelect.value;
      const forceMono = this.channelsSelect.value === 'mono';
      const isTrimmed = this.trimToggle.checked;

      let startTime = 0;
      let endTime = this.audioBuffer.duration;

      if (isTrimmed) {
        startTime = Math.max(0, parseFloat(this.trimStart.value) || 0);
        endTime = Math.min(this.audioBuffer.duration, parseFloat(this.trimEnd.value) || this.audioBuffer.duration);
        if (endTime <= startTime) {
          this.app.showToast("End time must be greater than start time.", "warning");
          return;
        }
      }

      const sampleRate = this.audioBuffer.sampleRate;
      const numChannels = forceMono ? 1 : Math.min(2, this.audioBuffer.numberOfChannels);

      const startOffset = Math.floor(startTime * sampleRate);
      const endOffset = Math.floor(endTime * sampleRate);
      const frameCount = endOffset - startOffset;

      // Extract float channel samples
      const channelData = [];
      for (let ch = 0; ch < numChannels; ch++) {
        const fullChannel = this.audioBuffer.getChannelData(ch);
        const sliced = fullChannel.subarray(startOffset, endOffset);
        channelData.push(sliced);
      }

      // Encode into WAV
      const wavBuffer = this.encodeWAV(channelData, frameCount, sampleRate, numChannels);
      this.audioBlob = new Blob([wavBuffer], { type: 'audio/wav' });

      if (this.audioUrl) URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = URL.createObjectURL(this.audioBlob);

      this.audioPreview.src = this.audioUrl;
      this.downloadDeck.style.display = 'flex';

      // Download file immediately
      const baseName = (this.filenameInput.value || "extracted-audio").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
      const filename = `${baseName}.wav`;

      const a = document.createElement('a');
      a.href = this.audioUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.app.showToast(`Extracted & downloaded ${filename}!`, "success");

    } catch (err) {
      console.error("Extraction error:", err);
      this.app.showToast(`Failed to extract audio: ${err.message}`, "error");
    }
  },

  encodeWAV(channelData, totalSamples, sampleRate, numChannels) {
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
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true); // 16-bit

    // data sub-chunk
    this.writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    let offset = 44;
    for (let i = 0; i < totalSamples; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        let sample = channelData[ch][i] || 0;
        sample = Math.max(-1, Math.min(1, sample));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
      }
    }

    return buffer;
  },

  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  },

  resetStudio() {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }
    this.videoFile = null;
    this.audioBuffer = null;
    this.dropzone.style.display = 'flex';
    this.settingsDeck.style.display = 'none';
    this.progressBox.style.display = 'none';
    this.downloadDeck.style.display = 'none';
    this.resetBtn.style.display = 'none';
    this.waveformPlaceholder.style.display = 'flex';
    this.trackInfo.textContent = '';
    this.drawIdleCanvas();
  },

  cleanup() {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }
    if (this.audioContext) {
      try { this.audioContext.close(); } catch (e) {}
      this.audioContext = null;
    }
  }
};
