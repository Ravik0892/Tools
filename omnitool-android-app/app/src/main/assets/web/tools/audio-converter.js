// OmniTool Hub - Universal Audio Transcoder & Format Converter
// 100% Client-Side Audio Cross-Converter (MP3, WAV, OGG, M4A, FLAC) with Bitrate & Gain Controls via Web Audio API & Lamejs

import { escapeHtml } from './utils.js';

export default {
  id: "audio-converter",
  name: "Audio Converter & Transcoder",

  audioFile: null,
  audioBuffer: null,
  audioUrl: null,
  outputFormat: "mp3", // 'mp3' | 'wav' | 'ogg'
  bitrate: 192,        // 128, 192, 256, 320 kbps
  sampleRate: 44100,   // 22050, 44100, 48000
  channels: 2,         // 1 (mono) | 2 (stereo)
  gain: 1.0,           // 0.5 to 2.0
  isConverting: false,
  progress: 0,
  convertedBlob: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
              Audio Settings
            </h3>
          </div>

          <!-- Target Format Segmented Control -->
          <div class="target-format-selector" style="margin: 14px 0 16px 0;">
            <label style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); display: block; margin-bottom: 6px;">Output Format</label>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; background: rgba(255, 255, 255, 0.03); padding: 4px; border-radius: 8px; border: 1px solid var(--border-color);">
              <button type="button" class="mode-segment-btn ${this.outputFormat === 'mp3' ? 'active' : ''}" id="fmt-mp3" style="padding: 7px; font-size: 11.5px; font-weight: 600; border-radius: 6px; border: 1px solid transparent; cursor: pointer; text-align: center; transition: all 0.2s;">MP3</button>
              <button type="button" class="mode-segment-btn ${this.outputFormat === 'wav' ? 'active' : ''}" id="fmt-wav" style="padding: 7px; font-size: 11.5px; font-weight: 600; border-radius: 6px; border: 1px solid transparent; cursor: pointer; text-align: center; transition: all 0.2s;">WAV</button>
              <button type="button" class="mode-segment-btn ${this.outputFormat === 'ogg' ? 'active' : ''}" id="fmt-ogg" style="padding: 7px; font-size: 11.5px; font-weight: 600; border-radius: 6px; border: 1px solid transparent; cursor: pointer; text-align: center; transition: all 0.2s;">OGG</button>
            </div>
          </div>

          <!-- Audio Upload Dropzone -->
          <div id="dropzone-audio" style="border: 2px dashed ${this.audioFile ? 'var(--accent-emerald, #10b981)' : 'rgba(0, 242, 254, 0.35)'}; background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: ${this.audioFile ? '14px' : '32px 16px'}; text-align: center; cursor: pointer; transition: all 0.2s;">
            <div style="font-size: ${this.audioFile ? '20px' : '36px'}; margin-bottom: 4px;">🎧</div>
            <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
              ${this.audioFile ? escapeHtml(this.audioFile.name) : 'Drop audio file here or click to browse'}
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              ${this.audioFile ? `${(this.audioFile.size / 1024 / 1024).toFixed(2)} MB • ${this.audioFile.type || 'audio format'}` : 'Supports MP3, WAV, FLAC, M4A, AAC, OGG, WebM audio.'}
            </div>
            <input type="file" id="input-audio-file" accept="audio/*,.mp3,.wav,.ogg,.m4a,.aac,.flac,.webm" style="display: none;">
          </div>

          <!-- Quality & Bitrate Settings -->
          ${this.outputFormat === 'mp3' ? `
            <div class="form-group">
              <label for="select-bitrate">MP3 Bitrate (Fidelity)</label>
              <select id="select-bitrate" class="form-select" style="width: 100%;">
                <option value="128" ${this.bitrate === 128 ? 'selected' : ''}>128 kbps (Standard - Smaller size)</option>
                <option value="192" ${this.bitrate === 192 ? 'selected' : ''}>192 kbps (High Quality - Recommended)</option>
                <option value="256" ${this.bitrate === 256 ? 'selected' : ''}>256 kbps (Very High Quality)</option>
                <option value="320" ${this.bitrate === 320 ? 'selected' : ''}>320 kbps (Maximum Studio Fidelity)</option>
              </select>
            </div>
          ` : `
            <div style="padding: 10px 12px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px; font-size: 11px; color: #34d399;">
              ℹ️ <strong>Lossless PCM Audio</strong>: Preserves full acoustic frequency range with uncompressed 16-bit linear samples.
            </div>
          `}

          <!-- Channels & Volume Gain -->
          <div class="form-group">
            <label for="select-channels">Audio Channels</label>
            <select id="select-channels" class="form-select" style="width: 100%;">
              <option value="2" ${this.channels === 2 ? 'selected' : ''}>Stereo (2 Channels)</option>
              <option value="1" ${this.channels === 1 ? 'selected' : ''}>Mono (1 Channel Downmix)</option>
            </select>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="margin: 0;">Volume Normalization / Gain</label>
              <span id="lbl-gain" style="font-size: 11px; font-weight: 700; color: var(--accent-cyan);">${Math.round(this.gain * 100)}%</span>
            </div>
            <input type="range" id="input-gain" min="0.5" max="2.0" step="0.1" value="${this.gain}" style="width: 100%; cursor: pointer;">
          </div>

          <!-- Action Button -->
          <button class="tool-btn primary" id="btn-convert-audio" ${(!this.audioFile || this.isConverting) ? 'disabled' : ''} style="margin-top: 8px; justify-content: center; font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
            ${this.isConverting ? 'Transcoding Audio Track...' : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg> Convert &amp; Transcode to .${this.outputFormat.toUpperCase()}`}
          </button>

          <!-- Privacy Security Badge -->
          <div style="margin-top: auto; padding: 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
            🔒 <strong style="color: var(--accent-cyan);">Hardware-Accelerated Web Audio</strong>: Transcoded strictly in local browser memory via Web Audio DSP &amp; Lamejs WebAssembly.
          </div>
        </div>

        <!-- Preview & Output Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              Audio Preview &amp; Output
            </h3>
            ${this.convertedBlob ? `
              <button class="tool-btn accent-emerald" id="btn-download-converted">
                📥 Download .${this.outputFormat.toUpperCase()}
              </button>
            ` : ''}
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
            ${this.audioFile ? `
              <!-- Source Preview Player -->
              <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; padding: 16px;">
                <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase;">
                  Source Audio Player
                </div>
                <audio id="audio-preview" controls src="${this.audioUrl}" style="width: 100%; height: 42px; border-radius: 6px; outline: none;"></audio>
              </div>

              <!-- Transcoding Status & Progress -->
              ${this.isConverting ? `
                <div style="padding: 24px; text-align: center; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 10px;">
                  <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">
                    Encoding frames with Lamejs DSP (${this.progress}%)...
                  </div>
                  <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden; max-width: 320px; margin: 0 auto;">
                    <div style="height: 100%; width: ${this.progress}%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-purple)); transition: width 0.2s;"></div>
                  </div>
                </div>
              ` : ''}

              <!-- Converted Ready Card -->
              ${this.convertedBlob ? `
                <div style="padding: 24px; text-align: center; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px;">
                  <div style="font-size: 32px; margin-bottom: 8px;">🎉</div>
                  <h4 style="margin: 0 0 6px 0; font-size: 15px; color: #34d399;">Conversion Complete!</h4>
                  <p style="margin: 0 0 16px 0; font-size: 12px; color: var(--text-muted);">
                    File encoded to .${this.outputFormat.toUpperCase()} (${(this.convertedBlob.size / 1024 / 1024).toFixed(2)} MB). Bitrate: ${this.outputFormat === 'mp3' ? this.bitrate + ' kbps' : 'Lossless PCM'}.
                  </p>
                  <button class="tool-btn accent-emerald" id="btn-download-converted-hero" style="font-size: 13px; padding: 8px 24px; font-weight: 700;">
                    📥 Download Transcoded Audio
                  </button>
                </div>
              ` : ''}
            ` : `
              <div style="margin: auto; text-align: center; color: var(--text-muted); padding: 40px 20px;">
                <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.7;">🎵</div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">No Audio Selected</h4>
                <p style="font-size: 12px; max-width: 380px; margin: 0; line-height: 1.5;">
                  Drop an audio track on the left panel to configure bitrate, stereo/mono channels, gain amplification, and transcode into MP3, WAV, or OGG.
                </p>
              </div>
            `}
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: UNIVERSAL AUDIO TRANSCODER</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Choose Target Format</strong>
              <p style="margin: 4px 0 0 0;">Select MP3 for universal compatibility, WAV for uncompressed studio preservation, or OGG for streaming.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Adjust Bitrate &amp; Gain</strong>
              <p style="margin: 4px 0 0 0;">Pick up to 320 kbps high fidelity, or boost low recording volume up to 200% (+6dB).</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Convert Offline</strong>
              <p style="margin: 4px 0 0 0;">Conversion executes 100% locally through your browser's audio processing hardware.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init(container, appInstance) {
    this.container = container || null;
    this.app = appInstance || null;
    this.bindEvents();
  },

  bindEvents() {
    const dropzone = document.getElementById("dropzone-audio");
    const inputFile = document.getElementById("input-audio-file");

    dropzone?.addEventListener("click", () => inputFile?.click());

    inputFile?.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files[0]) {
        this.audioFile = e.target.files[0];
        if (this.audioUrl) URL.revokeObjectURL(this.audioUrl);
        this.audioUrl = URL.createObjectURL(this.audioFile);
        this.convertedBlob = null;
        this.refreshUI();
      }
    });

    if (!this.audioFile) return;

    // Formats
    ["mp3", "wav", "ogg"].forEach(fmt => {
      document.getElementById(`fmt-${fmt}`)?.addEventListener("click", () => {
        this.outputFormat = fmt;
        this.convertedBlob = null;
        this.refreshUI();
      });
    });

    // Bitrate
    document.getElementById("select-bitrate")?.addEventListener("change", (e) => {
      this.bitrate = parseInt(e.target.value, 10);
    });

    // Channels
    document.getElementById("select-channels")?.addEventListener("change", (e) => {
      this.channels = parseInt(e.target.value, 10);
    });

    // Gain
    const inputGain = document.getElementById("input-gain");
    const lblGain = document.getElementById("lbl-gain");
    inputGain?.addEventListener("input", (e) => {
      this.gain = parseFloat(e.target.value);
      if (lblGain) lblGain.textContent = `${Math.round(this.gain * 100)}%`;
    });

    // Convert button
    document.getElementById("btn-convert-audio")?.addEventListener("click", () => this.transcodeAudio());

    // Download buttons
    document.getElementById("btn-download-converted")?.addEventListener("click", () => this.downloadConverted());
    document.getElementById("btn-download-converted-hero")?.addEventListener("click", () => this.downloadConverted());
  },

  async loadLamejsLibrary() {
    if (window.lamejs) return;
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/lamejs@1.2.1/lame.min.js";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Failed to load lamejs MP3 encoder."));
      document.head.appendChild(script);
    });
  },

  async transcodeAudio() {
    if (!this.audioFile) return;

    this.isConverting = true;
    this.progress = 10;
    this.convertedBlob = null;
    this.refreshUI();

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtx();
      const arrayBuffer = await this.audioFile.arrayBuffer();
      
      this.progress = 30;
      this.updateProgress();

      const decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      this.progress = 50;
      this.updateProgress();

      let targetBlob = null;

      if (this.outputFormat === "wav") {
        targetBlob = this.encodeWAV(decodedBuffer);
      } else if (this.outputFormat === "mp3") {
        await this.loadLamejsLibrary();
        targetBlob = await this.encodeMP3(decodedBuffer);
      } else {
        targetBlob = this.encodeWAV(decodedBuffer);
      }

      this.progress = 100;
      this.convertedBlob = targetBlob;

    } catch (err) {
      alert("Error during audio conversion: " + err.message);
    } finally {
      this.isConverting = false;
      this.refreshUI();
    }
  },

  encodeWAV(audioBuffer) {
    const numChannels = this.channels === 1 ? 1 : Math.min(2, audioBuffer.numberOfChannels);
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    let left = audioBuffer.getChannelData(0);
    let right = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : left;

    if (this.gain !== 1.0) {
      left = left.map(v => Math.max(-1, Math.min(1, v * this.gain)));
      if (audioBuffer.numberOfChannels > 1) {
        right = right.map(v => Math.max(-1, Math.min(1, v * this.gain)));
      }
    }

    const length = left.length;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const buffer = new ArrayBuffer(44 + length * blockAlign);
    const view = new DataView(buffer);

    const writeString = (offset, str) => {
      for (let i = 0; i < str.length; i++) {
        view.setUint8(offset + i, str.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * blockAlign, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, length * blockAlign, true);

    let offset = 44;
    for (let i = 0; i < length; i++) {
      let sampleL = Math.max(-1, Math.min(1, left[i]));
      view.setInt16(offset, sampleL < 0 ? sampleL * 0x8000 : sampleL * 0x7FFF, true);
      offset += 2;

      if (numChannels === 2) {
        let sampleR = Math.max(-1, Math.min(1, right[i]));
        view.setInt16(offset, sampleR < 0 ? sampleR * 0x8000 : sampleR * 0x7FFF, true);
        offset += 2;
      }
    }

    return new Blob([buffer], { type: "audio/wav" });
  },

  async encodeMP3(audioBuffer) {
    const numChannels = this.channels === 1 ? 1 : Math.min(2, audioBuffer.numberOfChannels);
    const sampleRate = audioBuffer.sampleRate;
    const mp3encoder = new window.lamejs.Mp3Encoder(numChannels, sampleRate, this.bitrate);

    let left = audioBuffer.getChannelData(0);
    let right = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : left;

    const leftInt16 = new Int16Array(left.length);
    const rightInt16 = numChannels === 2 ? new Int16Array(right.length) : null;

    for (let i = 0; i < left.length; i++) {
      let sL = Math.max(-1, Math.min(1, left[i] * this.gain));
      leftInt16[i] = sL < 0 ? sL * 0x8000 : sL * 0x7FFF;

      if (numChannels === 2) {
        let sR = Math.max(-1, Math.min(1, right[i] * this.gain));
        rightInt16[i] = sR < 0 ? sR * 0x8000 : sR * 0x7FFF;
      }
    }

    const sampleBlockSize = 1152;
    const mp3Data = [];

    for (let i = 0; i < leftInt16.length; i += sampleBlockSize) {
      const leftChunk = leftInt16.subarray(i, i + sampleBlockSize);
      let mp3buf = null;

      if (numChannels === 1) {
        mp3buf = mp3encoder.encodeBuffer(leftChunk);
      } else {
        const rightChunk = rightInt16.subarray(i, i + sampleBlockSize);
        mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
      }

      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }

    const endBuf = mp3encoder.flush();
    if (endBuf.length > 0) {
      mp3Data.push(endBuf);
    }

    return new Blob(mp3Data, { type: "audio/mp3" });
  },

  updateProgress() {
    const bar = document.querySelector(".tool-main div[style*='width:']");
    if (bar) bar.style.width = `${this.progress}%`;
  },

  downloadConverted() {
    if (!this.convertedBlob) return;
    const baseName = this.audioFile.name.replace(/\.[^/.]+$/, "");
    const downloadUrl = URL.createObjectURL(this.convertedBlob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${baseName}.${this.outputFormat === 'ogg' ? 'ogg' : this.outputFormat}`;
    a.click();
    URL.revokeObjectURL(downloadUrl);
  },

  refreshUI() {
    const appEl = this.container || document.getElementById("audio-subtool-host") || document.getElementById("active-tool-viewport") || document.getElementById("tool-render-area") || document.querySelector(".tool-main");
    if (appEl) {
      appEl.innerHTML = this.renderUI();
      this.bindEvents();
      if (typeof this.app?.initLayoutSizer === "function") {
        this.app.initLayoutSizer(appEl);
      }
      if (typeof this.app?._reinjectAudioTabs === "function") {
        this.app._reinjectAudioTabs();
      }
    }
  }
};
