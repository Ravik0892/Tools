// OmniTool Hub - Video to Animated GIF Converter
// 100% Client-Side video frame extraction and animated GIF compiler with zero server dependencies.

import { escapeHtml } from './utils.js';

export default {
  id: "video-to-gif",
  name: "Video to Animated GIF Converter",

  videoFile: null,
  videoUrl: null,
  videoEl: null,
  isConverting: false,
  cancelRequested: false,
  gifBlob: null,
  gifUrl: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Input Video & Range Configuration (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Video to Animated GIF</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Turn clips, screencasts, and video moments into lightweight, shareable animated GIFs.
              </p>
            </div>
            <button class="tool-btn secondary" id="v2g-new-btn" style="font-size: 11px; padding: 4px 10px; display: none;">New Video</button>
          </div>

          <!-- Upload Dropzone -->
          <div id="v2g-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 40px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 220px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 48px; height: 48px; color: var(--accent-cyan); margin-bottom: 12px;">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
              <line x1="7" y1="2" x2="7" y2="22"></line>
              <line x1="17" y1="2" x2="17" y2="22"></line>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <line x1="2" y1="7" x2="7" y2="7"></line>
              <line x1="2" y1="17" x2="7" y2="17"></line>
              <line x1="17" y1="17" x2="22" y2="17"></line>
              <line x1="17" y1="7" x2="22" y2="7"></line>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drag &amp; drop video here, or browse files
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              MP4, WebM, MOV supported. Fast in-browser frame extraction.
            </div>
            <input type="file" id="v2g-file-input" accept="video/*" style="display: none;">
          </div>

          <!-- Video Settings Deck (Appears once file is loaded) -->
          <div id="v2g-controls-deck" style="display: none; flex-direction: column; gap: 14px;">
            <!-- Hidden Video for frame seeking -->
            <video id="v2g-hidden-video" playsinline muted style="display: none;"></video>

            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main); letter-spacing: 0.5px;">GIF RESOLUTION &amp; TIMING</span>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Output Width
                  <select id="v2g-width-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="320" selected>320px (Compact / Discord / Chat)</option>
                    <option value="480">480px (Standard / Social Media)</option>
                    <option value="240">240px (Ultra Lightweight)</option>
                    <option value="640">640px (High Definition)</option>
                  </select>
                </label>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Frame Rate
                  <select id="v2g-fps-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="10" selected>10 FPS (Recommended Balance)</option>
                    <option value="15">15 FPS (Smooth Motion)</option>
                    <option value="8">8 FPS (Small Size)</option>
                    <option value="5">5 FPS (Minimal Slideshow)</option>
                  </select>
                </label>
              </div>

              <!-- Time Clipping Selection -->
              <div style="display: flex; flex-direction: column; gap: 6px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px;">
                  <span style="font-weight: 700; color: var(--text-main);">Clip Time Range</span>
                  <span id="v2g-clip-duration" style="color: var(--accent-cyan); font-family: monospace;">Duration: 0.0s</span>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <label style="display: flex; flex-direction: column; gap: 2px; font-size: 10px; color: var(--text-muted);">
                    Start Time (s)
                    <input type="number" id="v2g-start-time" class="tool-input" value="0" min="0" step="0.2" style="padding: 6px; font-size: 12px; font-family: monospace;">
                  </label>
                  <label style="display: flex; flex-direction: column; gap: 2px; font-size: 10px; color: var(--text-muted);">
                    End Time (s)
                    <input type="number" id="v2g-end-time" class="tool-input" value="3" min="0.5" step="0.2" style="padding: 6px; font-size: 12px; font-family: monospace;">
                  </label>
                </div>
                <span style="font-size: 10px; color: var(--text-muted);">💡 Tip: Keep GIF duration under 6 seconds to avoid bloated file sizes.</span>
              </div>
            </div>

            <!-- Conversion Action Button -->
            <button class="tool-btn primary" id="v2g-convert-btn" style="font-size: 14px; padding: 12px 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              <span>Convert to Animated GIF</span>
            </button>
          </div>
        </div>

        <!-- GIF Preview & Export Monitor (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">GIF Preview &amp; Download</h3>
            <span id="v2g-filesize-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Animated GIF Display Viewport -->
          <div style="flex: 1; min-height: 260px; max-height: 380px; background: #07090e; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; position: relative; display: flex; align-items: center; justify-content: center;">
            <img id="v2g-preview-img" style="max-width: 100%; max-height: 100%; object-fit: contain; display: none;">
            
            <!-- Placeholder -->
            <div id="v2g-placeholder" style="display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--text-muted); text-align: center; padding: 20px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 48px; height: 48px; opacity: 0.5;">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">GIF Output Preview</div>
              <div style="font-size: 11px; max-width: 240px;">Select a video and click "Convert to Animated GIF" to compile.</div>
            </div>

            <!-- Progress Bar Overlay -->
            <div id="v2g-progress-overlay" style="display: none; position: absolute; inset: 0; background: rgba(7, 9, 14, 0.92); flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 24px;">
              <div style="width: 36px; height: 36px; border: 3px solid rgba(0, 242, 254, 0.2); border-top-color: var(--accent-cyan); border-radius: 50%; animation: v2g-spin 0.8s linear infinite;"></div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main);" id="v2g-progress-status">Capturing Frames...</div>
              
              <div style="width: 80%; max-width: 260px; height: 8px; background: rgba(255, 255, 255, 0.1); border-radius: 4px; overflow: hidden;">
                <div id="v2g-progress-bar" style="height: 100%; width: 0%; background: linear-gradient(to right, #00f2fe, #4facfe); transition: width 0.1s ease;"></div>
              </div>
              <span id="v2g-progress-pct" style="font-size: 11px; font-family: monospace; color: var(--accent-cyan);">0%</span>

              <button class="tool-btn secondary" id="v2g-cancel-btn" style="font-size: 11px; padding: 4px 12px; margin-top: 4px;">Cancel</button>
            </div>
          </div>

          <!-- Download Action Strip -->
          <div id="v2g-export-strip" style="display: none; flex-direction: column; gap: 10px; margin-top: 14px;">
            <div style="display: flex; gap: 10px; align-items: center;">
              <input type="text" id="v2g-filename-input" class="tool-input" value="animated-clip" placeholder="GIF filename" style="flex: 1; padding: 8px 12px; font-size: 12px;">
              <button class="tool-btn primary" id="v2g-download-btn" style="font-size: 12px; padding: 8px 18px; display: inline-flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download .GIF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        @keyframes v2g-spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
  },

  init(container, appInstance) {
    this.container = container;
    this.app = appInstance;

    // Elements
    this.dropzone = container.querySelector('#v2g-dropzone');
    this.fileInput = container.querySelector('#v2g-file-input');
    this.controlsDeck = container.querySelector('#v2g-controls-deck');
    this.hiddenVideo = container.querySelector('#v2g-hidden-video');
    this.newBtn = container.querySelector('#v2g-new-btn');
    this.widthSelect = container.querySelector('#v2g-width-select');
    this.fpsSelect = container.querySelector('#v2g-fps-select');
    this.startTimeInput = container.querySelector('#v2g-start-time');
    this.endTimeInput = container.querySelector('#v2g-end-time');
    this.clipDurationLabel = container.querySelector('#v2g-clip-duration');
    this.convertBtn = container.querySelector('#v2g-convert-btn');
    this.previewImg = container.querySelector('#v2g-preview-img');
    this.placeholder = container.querySelector('#v2g-placeholder');
    this.progressOverlay = container.querySelector('#v2g-progress-overlay');
    this.progressBar = container.querySelector('#v2g-progress-bar');
    this.progressStatus = container.querySelector('#v2g-progress-status');
    this.progressPct = container.querySelector('#v2g-progress-pct');
    this.cancelBtn = container.querySelector('#v2g-cancel-btn');
    this.exportStrip = container.querySelector('#v2g-export-strip');
    this.filenameInput = container.querySelector('#v2g-filename-input');
    this.downloadBtn = container.querySelector('#v2g-download-btn');
    this.filesizeBadge = container.querySelector('#v2g-filesize-badge');

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
        this.loadFile(e.dataTransfer.files[0]);
      }
    });

    this.fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.loadFile(e.target.files[0]);
      }
    });

    this.newBtn.addEventListener('click', () => this.resetStudio());

    const updateDuration = () => {
      const s = Math.max(0, parseFloat(this.startTimeInput.value) || 0);
      const e = Math.max(s, parseFloat(this.endTimeInput.value) || s);
      this.clipDurationLabel.textContent = `Duration: ${(e - s).toFixed(1)}s`;
    };
    this.startTimeInput.addEventListener('input', updateDuration);
    this.endTimeInput.addEventListener('input', updateDuration);

    this.convertBtn.addEventListener('click', () => this.startConversion());
    this.cancelBtn.addEventListener('click', () => {
      this.cancelRequested = true;
    });

    this.downloadBtn.addEventListener('click', () => this.downloadGif());
  },

  loadFile(file) {
    if (!file.type.startsWith('video/')) {
      this.app.showToast("Please select a video file.", "warning");
      return;
    }

    if (this.videoUrl) URL.revokeObjectURL(this.videoUrl);

    this.videoFile = file;
    this.videoUrl = URL.createObjectURL(file);
    this.hiddenVideo.src = this.videoUrl;

    this.hiddenVideo.onloadedmetadata = () => {
      this.dropzone.style.display = 'none';
      this.controlsDeck.style.display = 'flex';
      this.newBtn.style.display = 'inline-block';

      const dur = this.hiddenVideo.duration || 5;
      this.startTimeInput.value = "0";
      this.endTimeInput.value = Math.min(dur, 4).toFixed(1);
      this.endTimeInput.max = dur.toFixed(1);
      this.clipDurationLabel.textContent = `Duration: ${Math.min(dur, 4).toFixed(1)}s`;

      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      this.filenameInput.value = `${cleanName}-gif`;

      this.app.showToast(`Loaded video (${dur.toFixed(1)}s)`, "success");
    };
  },

  async startConversion() {
    if (this.isConverting) return;
    this.isConverting = true;
    this.cancelRequested = false;

    const start = Math.max(0, parseFloat(this.startTimeInput.value) || 0);
    const end = Math.min(this.hiddenVideo.duration, parseFloat(this.endTimeInput.value) || (start + 3));
    
    if (end <= start) {
      this.app.showToast("End time must be after start time.", "warning");
      this.isConverting = false;
      return;
    }

    const duration = end - start;
    if (duration > 15) {
      this.app.showToast("To maintain browser performance, maximum clip length is 15 seconds.", "warning");
      this.isConverting = false;
      return;
    }

    const fps = parseInt(this.fpsSelect.value) || 10;
    const targetWidth = parseInt(this.widthSelect.value) || 320;
    const aspect = this.hiddenVideo.videoHeight / this.hiddenVideo.videoWidth;
    const targetHeight = Math.round(targetWidth * aspect);

    const totalFrames = Math.floor(duration * fps);
    const frameInterval = 1 / fps;

    // Show progress overlay
    this.progressOverlay.style.display = 'flex';
    this.progressBar.style.width = '0%';
    this.progressPct.textContent = '0%';
    this.progressStatus.textContent = `Extracting ${totalFrames} video frames...`;

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const frameList = [];

    try {
      // Step 1: Extract frames sequentially by seeking video
      for (let i = 0; i < totalFrames; i++) {
        if (this.cancelRequested) throw new Error("Conversion cancelled by user.");

        const seekTime = start + (i * frameInterval);
        await this.seekVideo(this.hiddenVideo, seekTime);

        ctx.drawImage(this.hiddenVideo, 0, 0, targetWidth, targetHeight);
        const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        frameList.push(imgData);

        const pct = Math.round(((i + 1) / totalFrames) * 60);
        this.progressBar.style.width = `${pct}%`;
        this.progressPct.textContent = `${pct}%`;
        this.progressStatus.textContent = `Captured Frame ${i + 1} of ${totalFrames}...`;
      }

      // Step 2: Encode frames into GIF89a using Pure Client-Side LZW Encoder
      this.progressStatus.textContent = "Encoding GIF animation & palette...";
      const delayMs = Math.round(1000 / fps);

      const gifBytes = await this.encodeGIF(frameList, targetWidth, targetHeight, delayMs, (encPct) => {
        const totalPct = 60 + Math.round(encPct * 0.4);
        this.progressBar.style.width = `${totalPct}%`;
        this.progressPct.textContent = `${totalPct}%`;
      });

      this.gifBlob = new Blob([gifBytes], { type: 'image/gif' });
      if (this.gifUrl) URL.revokeObjectURL(this.gifUrl);
      this.gifUrl = URL.createObjectURL(this.gifBlob);

      this.previewImg.src = this.gifUrl;
      this.previewImg.style.display = 'block';
      this.placeholder.style.display = 'none';
      this.exportStrip.style.display = 'flex';

      const sizeKb = (this.gifBlob.size / 1024).toFixed(1);
      const sizeMb = (this.gifBlob.size / (1024 * 1024)).toFixed(2);
      this.filesizeBadge.textContent = this.gifBlob.size > 1024 * 1024 ? `${sizeMb} MB` : `${sizeKb} KB`;

      this.progressOverlay.style.display = 'none';
      this.app.showToast("Animated GIF created successfully!", "success");

    } catch (err) {
      console.warn("GIF Conversion aborted or failed:", err);
      this.progressOverlay.style.display = 'none';
      if (!this.cancelRequested) {
        this.app.showToast(`GIF creation failed: ${err.message}`, "error");
      } else {
        this.app.showToast("Conversion cancelled.", "info");
      }
    } finally {
      this.isConverting = false;
      this.cancelRequested = false;
    }
  },

  seekVideo(video, time) {
    return new Promise((resolve) => {
      const onSeeked = () => {
        video.removeEventListener('seeked', onSeeked);
        resolve();
      };
      video.addEventListener('seeked', onSeeked);
      video.currentTime = time;
    });
  },

  // Pure Client-Side Lightweight GIF89a Multi-Frame Encoder with Color Quantization & LZW
  async encodeGIF(frameList, width, height, delayMs, onProgress) {
    const bytes = [];
    const pushByte = (b) => bytes.push(b & 0xFF);
    const pushBytes = (arr) => arr.forEach(b => bytes.push(b & 0xFF));
    const pushShort = (s) => { pushByte(s & 0xFF); pushByte((s >> 8) & 0xFF); };

    // 1. Header & Logical Screen Descriptor
    pushBytes([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]); // "GIF89a"
    pushShort(width);
    pushShort(height);
    pushByte(0x70); // No global color table, 8 bits/pixel color resolution
    pushByte(0);    // Background color index
    pushByte(0);    // Pixel aspect ratio

    // 2. Netscape Application Extension for Infinite Loop
    pushBytes([0x21, 0xFF, 0x0B]); // Extension Introducer + App Ext + Length 11
    pushBytes([0x4E, 0x45, 0x54, 0x53, 0x43, 0x41, 0x50, 0x45, 0x32, 0x2E, 0x30]); // "NETSCAPE2.0"
    pushBytes([0x03, 0x01, 0x00, 0x00, 0x00]); // Sub-block: loop count 0 (infinite)

    const delayHundredths = Math.max(2, Math.round(delayMs / 10));

    // Process each frame
    for (let f = 0; f < frameList.length; f++) {
      if (this.cancelRequested) throw new Error("Cancelled");
      const imgData = frameList[f];

      // Quantize frame to 64-color palette
      const { palette, indexedPixels } = this.quantizeFrame(imgData, 64);

      // Graphic Control Extension
      pushBytes([0x21, 0xF9, 0x04]);
      pushByte(0x00); // Disposal method (0), no transparency
      pushShort(delayHundredths);
      pushByte(0);    // Transparent color index
      pushByte(0x00); // Block terminator

      // Image Descriptor
      pushByte(0x2C); // Image separator ','
      pushShort(0);   // Left
      pushShort(0);   // Top
      pushShort(width);
      pushShort(height);
      pushByte(0x85); // Local Color Table flag, 64 colors (2^(5+1) = 64)

      // Local Color Table (64 colors * 3 = 192 bytes)
      for (let i = 0; i < 64; i++) {
        if (i < palette.length) {
          pushByte(palette[i][0]);
          pushByte(palette[i][1]);
          pushByte(palette[i][2]);
        } else {
          pushBytes([0, 0, 0]);
        }
      }

      // LZW Compression for Image Data
      const lzwData = this.lzwEncode(indexedPixels, 6); // 6-bit minimum code size
      pushByte(6); // LZW minimum code size

      // Write data sub-blocks (max 255 bytes each)
      let offset = 0;
      while (offset < lzwData.length) {
        const chunkSize = Math.min(255, lzwData.length - offset);
        pushByte(chunkSize);
        for (let b = 0; b < chunkSize; b++) {
          pushByte(lzwData[offset + b]);
        }
        offset += chunkSize;
      }
      pushByte(0x00); // Sub-block terminator

      if (onProgress) {
        onProgress(Math.round(((f + 1) / frameList.length) * 100));
        await new Promise(r => setTimeout(r, 0)); // Allow UI tick
      }
    }

    // GIF Trailer
    pushByte(0x3B);
    return new Uint8Array(bytes);
  },

  quantizeFrame(imgData, maxColors) {
    const data = imgData.data;
    const pixelCount = data.length / 4;
    const colorMap = new Map();

    // Fast 4-bit uniform color sampling
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i] >> 4;
      const g = data[i + 1] >> 4;
      const b = data[i + 2] >> 4;
      const key = (r << 8) | (g << 4) | b;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);
    }

    // Pick top frequent colors
    const sorted = [...colorMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, maxColors);
    const palette = sorted.map(e => [
      ((e[0] >> 8) & 0xF) * 17,
      ((e[0] >> 4) & 0xF) * 17,
      (e[0] & 0xF) * 17
    ]);

    if (palette.length === 0) palette.push([0, 0, 0]);

    // Map pixels to closest color index
    const indexedPixels = new Uint8Array(pixelCount);
    for (let i = 0; i < pixelCount; i++) {
      const r = data[i * 4];
      const g = data[i * 4 + 1];
      const b = data[i * 4 + 2];

      let bestIdx = 0;
      let minDiff = 196608;

      for (let p = 0; p < palette.length; p++) {
        const dr = r - palette[p][0];
        const dg = g - palette[p][1];
        const db = b - palette[p][2];
        const dist = dr * dr + dg * dg + db * db;
        if (dist < minDiff) {
          minDiff = dist;
          bestIdx = p;
          if (dist === 0) break;
        }
      }
      indexedPixels[i] = bestIdx;
    }

    return { palette, indexedPixels };
  },

  lzwEncode(pixels, minCodeSize) {
    const clearCode = 1 << minCodeSize;
    const eoiCode = clearCode + 1;
    let nextCode = eoiCode + 1;
    let codeSize = minCodeSize + 1;

    let dictionary = new Map();
    for (let i = 0; i < clearCode; i++) {
      dictionary.set(String.fromCharCode(i), i);
    }

    const outputBits = [];
    const writeCode = (code, size) => {
      for (let b = 0; b < size; b++) {
        outputBits.push((code >> b) & 1);
      }
    };

    writeCode(clearCode, codeSize);

    let prefix = "";
    for (let i = 0; i < pixels.length; i++) {
      const char = String.fromCharCode(pixels[i]);
      const combined = prefix + char;

      if (dictionary.has(combined)) {
        prefix = combined;
      } else {
        writeCode(dictionary.get(prefix), codeSize);
        if (nextCode < 4096) {
          dictionary.set(combined, nextCode++);
          if (nextCode > (1 << codeSize) && codeSize < 12) {
            codeSize++;
          }
        } else {
          writeCode(clearCode, codeSize);
          dictionary.clear();
          for (let c = 0; c < clearCode; c++) {
            dictionary.set(String.fromCharCode(c), c);
          }
          nextCode = eoiCode + 1;
          codeSize = minCodeSize + 1;
        }
        prefix = char;
      }
    }

    if (prefix !== "") {
      writeCode(dictionary.get(prefix), codeSize);
    }
    writeCode(eoiCode, codeSize);

    // Pack bits into bytes
    const outputBytes = [];
    let currentByte = 0;
    let bitCount = 0;

    for (let b = 0; b < outputBits.length; b++) {
      currentByte |= (outputBits[b] << bitCount);
      bitCount++;
      if (bitCount === 8) {
        outputBytes.push(currentByte);
        currentByte = 0;
        bitCount = 0;
      }
    }
    if (bitCount > 0) outputBytes.push(currentByte);

    return outputBytes;
  },

  downloadGif() {
    if (!this.gifBlob) return;
    const baseName = (this.filenameInput.value || "animated-clip").trim().replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `${baseName}.gif`;

    const a = document.createElement('a');
    a.href = this.gifUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.app.showToast(`Downloaded ${filename}!`, "success");
  },

  resetStudio() {
    if (this.videoUrl) URL.revokeObjectURL(this.videoUrl);
    if (this.gifUrl) URL.revokeObjectURL(this.gifUrl);
    this.videoUrl = null;
    this.gifUrl = null;
    this.gifBlob = null;
    this.isConverting = false;

    this.dropzone.style.display = 'flex';
    this.controlsDeck.style.display = 'none';
    this.previewImg.style.display = 'none';
    this.placeholder.style.display = 'flex';
    this.exportStrip.style.display = 'none';
    this.newBtn.style.display = 'none';
    this.filesizeBadge.textContent = '';
  },

  cleanup() {
    this.resetStudio();
  }
};
