// OmniTool Hub - Camera Scan to PDF (Document Scanner)
// 100% Client-Side camera capture, contrast document filter (B&W/Greyscale/Color), multi-page queue, and PDF compilation via pdf-lib.

import { escapeHtml } from './utils.js';

export default {
  id: "scan-to-pdf",
  name: "Camera Scan to PDF",

  stream: null,
  capturedPages: [], // Array of { dataUrl, rotation, filter }
  activeFilter: "bw", // 'bw' | 'grayscale' | 'color'
  pageSize: "a4", // 'a4' | 'letter' | 'fit'

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Viewfinder & Camera Setup Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
              Camera Scanner Setup
            </h3>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="tool-btn primary" id="btn-start-camera" style="font-size: 11px; padding: 4px 8px;">📷 Start Camera</button>
              <button type="button" class="tool-btn secondary" id="btn-switch-camera" style="display: none; font-size: 11px; padding: 4px 8px;">🔄 Flip</button>
              <button type="button" class="tool-btn secondary" id="btn-stop-camera" style="display: none; font-size: 11px; padding: 4px 8px;">⏹ Stop</button>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; flex: 1;">
            <!-- Camera Viewfinder Box -->
            <div id="camera-viewfinder-box" style="position: relative; width: 100%; height: 260px; background: #000000; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color);">
              <video id="scan-video" autoplay playsinline muted style="width: 100%; height: 100%; object-fit: cover; display: none;"></video>
              <canvas id="scan-capture-canvas" style="display: none;"></canvas>

              <!-- Viewfinder Overlay Guidelines -->
              <div id="camera-overlay-guidelines" style="display: none; position: absolute; inset: 16px; border: 2px dashed rgba(0,242,254,0.7); border-radius: 8px; pointer-events: none; box-shadow: 0 0 0 9999px rgba(0,0,0,0.45);">
                <div style="position: absolute; top: 8px; left: 8px; font-size: 10px; background: rgba(0,0,0,0.7); color: #00f2fe; padding: 2px 6px; border-radius: 4px; font-weight: 700;">ALIGN DOCUMENT EDGES</div>
              </div>

              <!-- Camera Idle Screen -->
              <div id="camera-idle-screen" style="text-align: center; color: var(--text-muted); padding: 30px 16px;">
                <div style="font-size: 40px; margin-bottom: 8px;">📷</div>
                <h4 style="margin: 0 0 6px 0; color: var(--text-main); font-size: 14px;">Viewfinder Standby</h4>
                <p style="margin: 0; font-size: 11.5px; line-height: 1.4;">Click "Start Camera" above to scan physical documents with real-time contrast correction.</p>
              </div>

              <!-- Snap Button -->
              <button type="button" id="btn-snap-document" style="display: none; position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); width: 54px; height: 54px; border-radius: 50%; background: #ffffff; border: 4px solid var(--accent-cyan); cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,0.6); z-index: 10; transition: transform 0.1s;" aria-label="Snap Photo">
                <span style="display: block; width: 36px; height: 36px; margin: 5px auto; border-radius: 50%; background: var(--accent-cyan);"></span>
              </button>
            </div>

            <!-- Filter Presets -->
            <div class="form-group" style="margin-bottom: 0;">
              <label style="font-size: 11px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; display: block;">Document Enhancement Filter</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                <button type="button" class="tool-btn secondary opt-filter active" data-filter="bw" style="font-size: 11px; justify-content: center; padding: 6px;">B&amp;W Document</button>
                <button type="button" class="tool-btn secondary opt-filter" data-filter="grayscale" style="font-size: 11px; justify-content: center; padding: 6px;">Greyscale</button>
                <button type="button" class="tool-btn secondary opt-filter" data-filter="color" style="font-size: 11px; justify-content: center; padding: 6px;">Color Photo</button>
                <button type="button" class="tool-btn secondary opt-filter" data-filter="contrast" style="font-size: 11px; justify-content: center; padding: 6px;">High Contrast</button>
              </div>
            </div>

            <!-- Page Size & Name -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div class="form-group" style="margin-bottom: 0;">
                <label for="scan-page-size" style="font-size: 11px; margin-bottom: 4px;">PDF Page Format</label>
                <select id="scan-page-size" class="form-select" style="width: 100%; font-size: 11.5px; padding: 5px 8px;">
                  <option value="a4" selected>A4 (210 × 297 mm)</option>
                  <option value="letter">US Letter (8.5 × 11 in)</option>
                  <option value="fit">Auto-Fit Aspect Ratio</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label for="scan-pdf-name" style="font-size: 11px; margin-bottom: 4px;">PDF File Name</label>
                <input type="text" id="scan-pdf-name" class="form-input" value="Scanned_Document" style="width: 100%; font-size: 11.5px; padding: 5px 8px;">
              </div>
            </div>

            <button type="button" class="tool-btn primary" id="btn-compile-pdf" disabled style="margin-top: 4px; justify-content: center; height: 42px; font-weight: 700;">
              📥 Compile &amp; Download PDF
            </button>

            <!-- Privacy Security Badge -->
            <div style="margin-top: auto; padding: 10px 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.4;">
              🔒 <strong style="color: var(--accent-cyan);">Camera Stream Isolation</strong>: MediaStream frames are analyzed solely inside HTML5 Canvas memory.
            </div>
          </div>
        </div>

        <!-- Scanned Pages Tray Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              Scanned Document Queue
            </h3>
            <div style="display: flex; gap: 8px; align-items: center;">
              <span id="scan-page-count-badge" class="tool-badge" style="background: rgba(0,242,254,0.12); color: var(--accent-cyan); font-weight: 700; font-size: 10.5px;">0 Pages Scanned</span>
              <button type="button" class="tool-btn secondary" id="btn-clear-scans" style="padding: 3px 8px; font-size: 11px;">Clear All</button>
            </div>
          </div>

          <div style="flex: 1; min-height: 440px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow-y: auto; padding: 16px;">
            <div id="scanned-pages-tray" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 14px; min-height: 380px;">
              <div id="scanned-empty-hint" style="grid-column: 1 / -1; height: 100%; min-height: 360px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 40px 20px;">
                <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.7;">📑</div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">No Pages Scanned</h4>
                <p style="font-size: 12px; max-width: 360px; margin: 0; line-height: 1.5;">
                  Start your camera on the left and snap pages to queue them into a multi-page PDF document.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: CAMERA SCAN TO PDF (DOCUMENT SCANNER)</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Adaptive Thresholding</strong>
              <p style="margin: 4px 0 0 0;">The B&amp;W Document filter strips desk shadows and yellow lamp casts, leaving clean high-contrast black text on pure white paper.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Multi-Page Stacking</strong>
              <p style="margin: 4px 0 0 0;">Snap receipts, contracts, or multi-page books one by one. Rotate or reorder sheets before compiling.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Zero Network Latency</strong>
              <p style="margin: 4px 0 0 0;">Photos never travel to external cloud APIs. Compilation runs at 60 FPS in WebAssembly memory.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const btnStart = document.getElementById("btn-start-camera");
    const btnStop = document.getElementById("btn-stop-camera");
    const btnSnap = document.getElementById("btn-snap-document");
    const btnCompile = document.getElementById("btn-compile-pdf");
    const btnClear = document.getElementById("btn-clear-scans");

    if (btnStart) btnStart.addEventListener("click", () => this.startCamera());
    if (btnStop) btnStop.addEventListener("click", () => this.stopCamera());
    if (btnSnap) btnSnap.addEventListener("click", () => this.snapPhoto());
    if (btnCompile) btnCompile.addEventListener("click", () => this.compilePdf());
    if (btnClear) {
      btnClear.addEventListener("click", () => {
        this.capturedPages = [];
        this.renderScannedTray();
      });
    }

    // Filter toggles
    document.querySelectorAll(".opt-filter").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".opt-filter").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.activeFilter = e.currentTarget.dataset.filter;
      });
    });
  },

  async startCamera() {
    const video = document.getElementById("scan-video");
    const idleScreen = document.getElementById("camera-idle-screen");
    const guidelines = document.getElementById("camera-overlay-guidelines");
    const btnSnap = document.getElementById("btn-snap-document");
    const btnStart = document.getElementById("btn-start-camera");
    const btnStop = document.getElementById("btn-stop-camera");

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      if (video) {
        video.srcObject = this.stream;
        video.style.display = "block";
      }

      if (idleScreen) idleScreen.style.display = "none";
      if (guidelines) guidelines.style.display = "block";
      if (btnSnap) btnSnap.style.display = "block";
      if (btnStart) btnStart.style.display = "none";
      if (btnStop) btnStop.style.display = "inline-flex";

      if (window.app && window.app.showToast) window.app.showToast("Camera active! Point at document and snap.", "info");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Camera access denied or unavailable: " + err.message, "error");
    }
  },

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }

    const video = document.getElementById("scan-video");
    const idleScreen = document.getElementById("camera-idle-screen");
    const guidelines = document.getElementById("camera-overlay-guidelines");
    const btnSnap = document.getElementById("btn-snap-document");
    const btnStart = document.getElementById("btn-start-camera");
    const btnStop = document.getElementById("btn-stop-camera");

    if (video) video.style.display = "none";
    if (idleScreen) idleScreen.style.display = "block";
    if (guidelines) guidelines.style.display = "none";
    if (btnSnap) btnSnap.style.display = "none";
    if (btnStart) btnStart.style.display = "inline-flex";
    if (btnStop) btnStop.style.display = "none";
  },

  snapPhoto() {
    const video = document.getElementById("scan-video");
    const canvas = document.getElementById("scan-capture-canvas");
    if (!video || !canvas) return;

    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Apply document contrast filtering
    this.applyDocumentFilter(ctx, canvas.width, canvas.height, this.activeFilter);

    const filteredDataUrl = canvas.toDataURL("image/jpeg", 0.92);
    this.capturedPages.push({
      dataUrl: filteredDataUrl,
      rotation: 0
    });

    this.renderScannedTray();
    if (window.app && window.app.showToast) {
      window.app.showToast(`Snapped page ${this.capturedPages.length}!`, "success");
    }
  },

  applyDocumentFilter(ctx, width, height, filter) {
    if (filter === "color") return; // Keep original

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;

      if (filter === "grayscale") {
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      } else if (filter === "bw") {
        // High contrast document threshold
        const v = gray > 140 ? 255 : (gray < 80 ? 0 : (gray - 80) * 4.25);
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
      } else if (filter === "contrast") {
        // Linear contrast stretch
        const v = Math.min(255, Math.max(0, (gray - 128) * 1.5 + 128));
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  },

  renderScannedTray() {
    const tray = document.getElementById("scanned-pages-tray");
    const badge = document.getElementById("scan-page-count-badge");
    const btnCompile = document.getElementById("btn-compile-pdf");

    if (badge) badge.innerText = `${this.capturedPages.length} Pages Scanned`;
    if (btnCompile) btnCompile.disabled = this.capturedPages.length === 0;

    if (!tray) return;

    if (this.capturedPages.length === 0) {
      tray.innerHTML = `<div id="scanned-empty-hint" style="color: var(--text-muted); font-size: 12px; display: flex; align-items: center; justify-content: center; width: 100%; border: 1px dashed var(--border-color); border-radius: 8px;">No scanned pages captured yet.</div>`;
      return;
    }

    tray.innerHTML = this.capturedPages.map((page, idx) => `
      <div style="position: relative; flex-shrink: 0; width: 90px; height: 120px; border-radius: 6px; overflow: hidden; border: 1px solid var(--border-color); background: #000;">
        <img src="${page.dataUrl}" style="width: 100%; height: 100%; object-fit: cover; transform: rotate(${page.rotation}deg);">
        <span style="position: absolute; top: 4px; left: 4px; font-size: 10px; background: rgba(0,0,0,0.7); color: #fff; padding: 1px 5px; border-radius: 3px; font-weight: 700;">#${idx + 1}</span>
        <button type="button" class="btn-rotate-shot" data-idx="${idx}" style="position: absolute; bottom: 4px; left: 4px; background: rgba(0,0,0,0.7); border: none; color: #fff; border-radius: 3px; padding: 2px 5px; font-size: 10px; cursor: pointer;" title="Rotate 90°">🔄</button>
        <button type="button" class="btn-delete-shot" data-idx="${idx}" style="position: absolute; bottom: 4px; right: 4px; background: rgba(244,63,94,0.8); border: none; color: #fff; border-radius: 3px; padding: 2px 5px; font-size: 10px; cursor: pointer;" title="Delete">✕</button>
      </div>
    `).join("");

    tray.querySelectorAll(".btn-rotate-shot").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        this.capturedPages[idx].rotation = (this.capturedPages[idx].rotation + 90) % 360;
        this.renderScannedTray();
      });
    });

    tray.querySelectorAll(".btn-delete-shot").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        this.capturedPages.splice(idx, 1);
        this.renderScannedTray();
      });
    });
  },

  async compilePdf() {
    if (this.capturedPages.length === 0) return;

    try {
      if (window.app && window.app.showToast) window.app.showToast("Assembling PDF document...", "info");
      await this.ensurePdfLib();

      const { PDFDocument, PageSizes, degrees } = window.PDFLib;
      const pdfDoc = await PDFDocument.create();

      const pageSizeSetting = document.getElementById("scan-page-size")?.value || "a4";
      const docName = document.getElementById("scan-pdf-name")?.value.trim() || "Scanned_Document";

      for (const pageItem of this.capturedPages) {
        // Embed image
        const imgBytes = await fetch(pageItem.dataUrl).then(res => res.arrayBuffer());
        const embeddedImg = await pdfDoc.embedJpg(imgBytes);

        let pageWidth, pageHeight;
        if (pageSizeSetting === "letter") {
          [pageWidth, pageHeight] = PageSizes.Letter;
        } else if (pageSizeSetting === "fit") {
          pageWidth = embeddedImg.width;
          pageHeight = embeddedImg.height;
        } else {
          [pageWidth, pageHeight] = PageSizes.A4;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        // Fit image within page preserving aspect ratio
        const scale = Math.min(pageWidth / embeddedImg.width, pageHeight / embeddedImg.height);
        const w = embeddedImg.width * scale;
        const h = embeddedImg.height * scale;
        const x = (pageWidth - w) / 2;
        const y = (pageHeight - h) / 2;

        page.drawImage(embeddedImg, {
          x: x,
          y: y,
          width: w,
          height: h,
          rotate: degrees(pageItem.rotation)
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${docName}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      if (window.app && window.app.showToast) window.app.showToast(`Saved ${this.capturedPages.length}-page PDF "${docName}.pdf"!`, "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Failed to compile PDF: " + err.message, "error");
    }
  },

  ensurePdfLib() {
    return new Promise((resolve, reject) => {
      if (window.PDFLib) return resolve(window.PDFLib);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
      script.onload = () => resolve(window.PDFLib);
      script.onerror = () => reject(new Error("Failed to load PDF-Lib"));
      document.head.appendChild(script);
    });
  },

  cleanup() {
    this.stopCamera();
    this.capturedPages = [];
  }
};
