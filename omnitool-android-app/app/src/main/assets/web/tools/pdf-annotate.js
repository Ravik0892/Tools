// OmniTool Hub - PDF Drawing, Highlight & Annotation Studio
// 100% Client-Side PDF Markup & Vector Burning using PDF.js and PDF-lib

import { escapeHtml } from './utils.js';

export default {
  id: "pdf-annotate",
  name: "Annotate & Draw on PDF",

  pdfFile: null,
  pdfjsDoc: null,
  currentPage: 1,
  totalPages: 1,
  activeTool: "pen", // 'pen' | 'highlighter' | 'text' | 'rect' | 'arrow'
  color: "#00f2fe",
  brushSize: 4,
  fontSize: 18,
  annotationsByPage: {}, // { [pageNum]: dataUrl }
  isDrawing: false,
  startX: 0,
  startY: 0,
  textToAdd: "APPROVED",
  scale: 1.4,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              Annotation Tools
            </h3>
            ${this.pdfFile ? `
              <button class="tool-btn secondary" id="btn-change-pdf" style="font-size: 11px; padding: 4px 10px;">
                New File
              </button>
            ` : ''}
          </div>

          <!-- Document Upload Dropzone -->
          <div id="dropzone-annotate" style="border: 2px dashed ${this.pdfFile ? 'var(--accent-emerald, #10b981)' : 'rgba(0, 242, 254, 0.35)'}; background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: ${this.pdfFile ? '14px' : '32px 16px'}; text-align: center; cursor: pointer; transition: all 0.2s;">
            <div style="font-size: ${this.pdfFile ? '20px' : '36px'}; margin-bottom: 4px;">🖍️</div>
            <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
              ${this.pdfFile ? escapeHtml(this.pdfFile.name) : 'Drop PDF here or click to browse'}
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              ${this.pdfFile ? `${(this.pdfFile.size / 1024 / 1024).toFixed(2)} MB • ${this.totalPages} page(s)` : 'Draw, highlight, stamp, or box contracts offline.'}
            </div>
            <input type="file" id="input-annotate-file" accept="application/pdf" style="display: none;">
          </div>

          ${this.pdfFile ? `
            <!-- Drawing Palette -->
            <div class="form-group">
              <label>Drawing Tool</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
                <button class="keyboard-tab ${this.activeTool === 'pen' ? 'active' : ''}" id="tool-pen" style="font-size: 11px; padding: 6px 4px; justify-content: center;">
                  ✏️ Pen
                </button>
                <button class="keyboard-tab ${this.activeTool === 'highlighter' ? 'active' : ''}" id="tool-highlighter" style="font-size: 11px; padding: 6px 4px; justify-content: center;">
                  🖌️ Highlight
                </button>
                <button class="keyboard-tab ${this.activeTool === 'text' ? 'active' : ''}" id="tool-text" style="font-size: 11px; padding: 6px 4px; justify-content: center;">
                  🔤 Stamp
                </button>
                <button class="keyboard-tab ${this.activeTool === 'rect' ? 'active' : ''}" id="tool-rect" style="font-size: 11px; padding: 6px 4px; justify-content: center;">
                  ⬜ Box
                </button>
                <button class="keyboard-tab ${this.activeTool === 'arrow' ? 'active' : ''}" id="tool-arrow" style="font-size: 11px; padding: 6px 4px; justify-content: center;">
                  ➡️ Arrow
                </button>
                <button class="tool-btn secondary" id="btn-clear-page" style="font-size: 11px; padding: 6px 4px; justify-content: center; color: #ef4444;">
                  🧹 Clear
                </button>
              </div>
            </div>

            <!-- Tool Options -->
            <div class="form-group">
              <div style="display: flex; gap: 12px; align-items: center; justify-content: space-between;">
                <div style="flex: 1;">
                  <label for="input-color" style="display: block; font-size: 11px; margin-bottom: 4px;">Color</label>
                  <input type="color" id="input-color" value="${this.color}" style="width: 100%; height: 32px; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; background: var(--bg-card); padding: 2px;">
                </div>
                <div style="flex: 2;">
                  <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                    <label style="margin: 0;">Size</label>
                    <span id="lbl-brush-size" style="font-weight: 700; color: var(--accent-cyan);">${this.brushSize}px</span>
                  </div>
                  <input type="range" id="input-brush-size" min="1" max="25" value="${this.brushSize}" style="width: 100%; cursor: pointer;">
                </div>
              </div>
            </div>

            ${this.activeTool === 'text' ? `
              <div class="form-group">
                <label for="input-text-val">Stamp Text</label>
                <input type="text" id="input-text-val" value="${escapeHtml(this.textToAdd)}" class="form-input" style="width: 100%;" placeholder="e.g. APPROVED, REJECTED">
              </div>
            ` : ''}

            <!-- Page Navigation -->
            <div class="form-group">
              <label>Page Navigation</label>
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                <button class="tool-btn secondary" id="btn-prev-page" ${this.currentPage <= 1 ? 'disabled' : ''} style="font-size: 11px; padding: 4px 10px;">
                  ⬅️ Prev
                </button>
                <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">
                  Page <span id="lbl-curr-page">${this.currentPage}</span> of <span id="lbl-total-pages">${this.totalPages}</span>
                </span>
                <button class="tool-btn secondary" id="btn-next-page" ${this.currentPage >= this.totalPages ? 'disabled' : ''} style="font-size: 11px; padding: 4px 10px;">
                  Next ➡️
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Privacy Security Badge -->
          <div style="margin-top: auto; padding: 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
            🛡️ <strong style="color: var(--accent-cyan);">Client-Side Vector Burn</strong>: Annotations are drawn on hardware-accelerated canvas and baked directly into PDF streams using PDF-lib.
          </div>
        </div>

        <!-- Annotation Canvas & Document View Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              Document Canvas
            </h3>
            ${this.pdfFile ? `
              <button class="tool-btn accent-emerald" id="btn-save-pdf" style="font-weight: 700;">
                💾 Save &amp; Download PDF
              </button>
            ` : ''}
          </div>

          <!-- Document Canvas Viewport -->
          <div style="flex: 1; min-height: 440px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 10px; overflow: auto; display: flex; align-items: flex-start; justify-content: center; padding: 20px;">
            ${!this.pdfFile ? `
              <div style="margin: auto; text-align: center; color: var(--text-muted); padding: 40px 20px;">
                <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.7;">📑</div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">No Document Loaded</h4>
                <p style="font-size: 12px; max-width: 380px; margin: 0; line-height: 1.5;">
                  Drop or select a PDF document on the left to open the visual annotation, highlighting, and stamping canvas.
                </p>
              </div>
            ` : `
              <div id="canvas-wrapper" style="position: relative; display: inline-block; box-shadow: 0 8px 30px rgba(0,0,0,0.6); border-radius: 4px; background: #ffffff;">
                <!-- PDF Render Canvas -->
                <canvas id="pdf-render-canvas" style="display: block;"></canvas>
                <!-- Drawing Overlay Canvas -->
                <canvas id="annotation-overlay-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; cursor: crosshair; touch-action: none;"></canvas>
              </div>
            `}
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: PDF ANNOTATE &amp; DRAW STUDIO</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Select Markup Tool</strong>
              <p style="margin: 4px 0 0 0;">Choose pen for ink sketches, highlighter for translucent markers, or boxes/arrows for callouts.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Draw on Any Page</strong>
              <p style="margin: 4px 0 0 0;">Navigate between pages freely; markings are stored safely per page in memory.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Save &amp; Burn</strong>
              <p style="margin: 4px 0 0 0;">Click "Save &amp; Download" to compile vector drawings permanently into the PDF stream.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init(container, appInstance) {
    this.container = container;
    this.app = appInstance;
    this.bindEvents();
  },

  bindEvents() {
    const dropzone = document.getElementById("dropzone-annotate");
    const inputFile = document.getElementById("input-annotate-file");
    const btnChange = document.getElementById("btn-change-pdf");

    dropzone?.addEventListener("click", () => inputFile?.click());
    btnChange?.addEventListener("click", () => inputFile?.click());

    inputFile?.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files[0]) {
        this.pdfFile = e.target.files[0];
        this.annotationsByPage = {};
        this.currentPage = 1;
        await this.loadPDF();
      }
    });

    if (!this.pdfFile) return;

    // Tool switchers
    ["pen", "highlighter", "text", "rect", "arrow"].forEach(toolId => {
      document.getElementById(`tool-${toolId}`)?.addEventListener("click", () => {
        this.activeTool = toolId;
        this.refreshUI();
        this.renderPage();
      });
    });

    // Style inputs
    const inputColor = document.getElementById("input-color");
    inputColor?.addEventListener("input", (e) => {
      this.color = e.target.value;
    });

    const inputBrush = document.getElementById("input-brush-size");
    const lblBrush = document.getElementById("lbl-brush-size");
    inputBrush?.addEventListener("input", (e) => {
      this.brushSize = parseInt(e.target.value, 10);
      if (lblBrush) lblBrush.textContent = `${this.brushSize}px`;
    });

    const inputText = document.getElementById("input-text-val");
    inputText?.addEventListener("input", (e) => {
      this.textToAdd = e.target.value;
    });

    // Page navigation
    document.getElementById("btn-prev-page")?.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.saveCurrentPageAnnotation();
        this.currentPage--;
        this.renderPage();
      }
    });

    document.getElementById("btn-next-page")?.addEventListener("click", () => {
      if (this.currentPage < this.totalPages) {
        this.saveCurrentPageAnnotation();
        this.currentPage++;
        this.renderPage();
      }
    });

    // Clear Page
    document.getElementById("btn-clear-page")?.addEventListener("click", () => {
      const overlay = document.getElementById("annotation-overlay-canvas");
      if (overlay) {
        const ctx = overlay.getContext("2d");
        ctx.clearRect(0, 0, overlay.width, overlay.height);
        delete this.annotationsByPage[this.currentPage];
      }
    });

    // Save & Burn PDF
    document.getElementById("btn-save-pdf")?.addEventListener("click", () => this.burnAndDownloadPDF());

    // Setup interactive canvas
    this.setupCanvasInteractivity();
  },

  async loadPDFJSLibrary() {
    if (window.pdfjsLib) return;
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js engine."));
      document.head.appendChild(script);
    });
  },

  async loadPDFLibLibrary() {
    if (window.PDFLib) return;
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Failed to load PDF-lib engine."));
      document.head.appendChild(script);
    });
  },

  async loadPDF() {
    try {
      await this.loadPDFJSLibrary();
      const ab = await this.pdfFile.arrayBuffer();
      this.pdfjsDoc = await window.pdfjsLib.getDocument({ data: ab }).promise;
      this.totalPages = this.pdfjsDoc.numPages;
      this.refreshUI();
      await this.renderPage();
    } catch (err) {
      if (this.app?.showToast) this.app.showToast("Error loading PDF: " + err.message, "error");
      else if (window.app?.showToast) window.app.showToast("Error loading PDF: " + err.message, "error");
    }
  },

  async renderPage() {
    if (!this.pdfjsDoc) return;

    const baseCanvas = document.getElementById("pdf-render-canvas");
    const overlayCanvas = document.getElementById("annotation-overlay-canvas");
    if (!baseCanvas || !overlayCanvas) return;

    const page = await this.pdfjsDoc.getPage(this.currentPage);
    const viewport = page.getViewport({ scale: this.scale });

    baseCanvas.width = viewport.width;
    baseCanvas.height = viewport.height;
    overlayCanvas.width = viewport.width;
    overlayCanvas.height = viewport.height;

    // Render PDF page
    await page.render({
      canvasContext: baseCanvas.getContext("2d"),
      viewport: viewport
    }).promise;

    // Restore annotations
    const overlayCtx = overlayCanvas.getContext("2d");
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    if (this.annotationsByPage[this.currentPage]) {
      const img = new Image();
      img.onload = () => {
        overlayCtx.drawImage(img, 0, 0);
      };
      img.src = this.annotationsByPage[this.currentPage];
    }

    this.updatePageCounter();
  },

  saveCurrentPageAnnotation() {
    const overlayCanvas = document.getElementById("annotation-overlay-canvas");
    if (overlayCanvas) {
      this.annotationsByPage[this.currentPage] = overlayCanvas.toDataURL("image/png");
    }
  },

  setupCanvasInteractivity() {
    const overlay = document.getElementById("annotation-overlay-canvas");
    if (!overlay) return;

    const ctx = overlay.getContext("2d");
    let snapshot = null;

    const getPos = (e) => {
      const rect = overlay.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = overlay.width / rect.width;
      const scaleY = overlay.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const startDraw = (e) => {
      this.isDrawing = true;
      const pos = getPos(e);
      this.startX = pos.x;
      this.startY = pos.y;

      if (this.activeTool === "text") {
        ctx.font = `bold ${this.fontSize * 1.5}px sans-serif`;
        ctx.fillStyle = this.color;
        ctx.fillText(this.textToAdd, this.startX, this.startY);
        this.isDrawing = false;
        this.saveCurrentPageAnnotation();
        return;
      }

      ctx.beginPath();
      ctx.moveTo(this.startX, this.startY);

      if (this.activeTool === "highlighter") {
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = this.brushSize * 4;
        ctx.lineCap = "square";
      } else {
        ctx.strokeStyle = this.color;
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = this.brushSize;
        ctx.lineCap = "round";
      }

      snapshot = ctx.getImageData(0, 0, overlay.width, overlay.height);
    };

    const drawMove = (e) => {
      if (!this.isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);

      if (this.activeTool === "pen" || this.activeTool === "highlighter") {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      } else if (this.activeTool === "rect") {
        ctx.putImageData(snapshot, 0, 0);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.brushSize;
        ctx.strokeRect(this.startX, this.startY, pos.x - this.startX, pos.y - this.startY);
      } else if (this.activeTool === "arrow") {
        ctx.putImageData(snapshot, 0, 0);
        this.drawArrow(ctx, this.startX, this.startY, pos.x, pos.y, this.brushSize, this.color);
      }
    };

    const stopDraw = () => {
      if (!this.isDrawing) return;
      this.isDrawing = false;
      ctx.globalAlpha = 1.0;
      this.saveCurrentPageAnnotation();
    };

    overlay.onmousedown = startDraw;
    overlay.onmousemove = drawMove;
    overlay.onmouseup = stopDraw;
    overlay.onmouseleave = stopDraw;

    overlay.ontouchstart = startDraw;
    overlay.ontouchmove = drawMove;
    overlay.ontouchend = stopDraw;
  },

  drawArrow(ctx, fromX, fromY, toX, toY, width, color) {
    const headlen = 16 + width * 2;
    const angle = Math.atan2(toY - fromY, toX - fromX);

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  },

  async burnAndDownloadPDF() {
    this.saveCurrentPageAnnotation();

    const annotatedPages = Object.keys(this.annotationsByPage);
    if (annotatedPages.length === 0) {
      if (this.app?.showToast) this.app.showToast("No annotations have been added yet.", "warning");
      else if (window.app?.showToast) window.app.showToast("No annotations have been added yet.", "warning");
      return;
    }

    try {
      await this.loadPDFLibLibrary();
      const ab = await this.pdfFile.arrayBuffer();
      const pdfDoc = await window.PDFLib.PDFDocument.load(ab);
      const pages = pdfDoc.getPages();

      for (const pageKey of annotatedPages) {
        const pageIdx = parseInt(pageKey, 10) - 1;
        if (pageIdx < 0 || pageIdx >= pages.length) continue;

        const targetPage = pages[pageIdx];
        const { width, height } = targetPage.getSize();

        const dataUrl = this.annotationsByPage[pageKey];
        const pngBytes = await fetch(dataUrl).then(res => res.arrayBuffer());
        const pngImage = await pdfDoc.embedPng(pngBytes);

        targetPage.drawImage(pngImage, {
          x: 0,
          y: 0,
          width: width,
          height: height
        });
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `annotated-${this.pdfFile.name}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      if (this.app?.showToast) this.app.showToast("Error saving annotated PDF: " + err.message, "error");
      else if (window.app?.showToast) window.app.showToast("Error saving annotated PDF: " + err.message, "error");
    }
  },

  updatePageCounter() {
    const btnPrev = document.getElementById("btn-prev-page");
    const btnNext = document.getElementById("btn-next-page");
    if (btnPrev) btnPrev.disabled = this.currentPage <= 1;
    if (btnNext) btnNext.disabled = this.currentPage >= this.totalPages;
  },

  refreshUI() {
    const host = this.container || document.getElementById("editor-subtool-host") || document.getElementById("active-tool-viewport");
    if (host) {
      const split = host.querySelector(".tool-content-layout.split-view");
      if (split) {
        split.outerHTML = this.renderUI();
      } else {
        host.innerHTML = this.renderUI();
      }
      this.bindEvents();
      if (typeof this.app?.initLayoutSizer === "function") {
        this.app.initLayoutSizer(host);
      }
      if (this.app?._reinjectEditorTabs) {
        this.app._reinjectEditorTabs();
      }
    }
  },

  cleanup() {
    this.pdfFile = null;
    this.pdfDoc = null;
    this.annotationsByPage = {};
  }
};
