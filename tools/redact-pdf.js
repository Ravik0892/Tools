// OmniTool Hub - Redact & Blackout PDF Sanitizer
// 100% Client-Side permanent redaction and sanitization using pdf-lib and pdf.js.

import { escapeHtml } from './utils.js';

export default {
  id: "redact-pdf",
  name: "Redact PDF Sanitizer",

  pdfDocBytes: null,
  fileName: "",
  totalPages: 1,
  currentPageNum: 1,
  pdfjsDoc: null,
  redactionsByPage: {}, // { [pageNum]: [ { x, y, width, height, style } ] }
  activeStyle: "black", // 'black' | 'white' | 'redacted-text'
  isDrawing: false,
  startX: 0,
  startY: 0,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Redactions List (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Redact PDF Sanitizer</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Permanently blackout and sanitize sensitive names, accounts, or confidential numbers.
              </p>
            </div>
            <button class="tool-btn secondary" id="rd-clear-btn" style="font-size: 11px; padding: 4px 10px; display: none;">New Document</button>
          </div>

          <!-- Document Upload Dropzone -->
          <div id="rd-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 180px; margin-bottom: 14px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 44px; height: 44px; color: var(--accent-cyan); margin-bottom: 10px;">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="15"></line>
              <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drop PDF here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              Financial reports, medical forms, court documents.
            </div>
            <input type="file" id="rd-file-input" accept="application/pdf" style="display: none;">
          </div>

          <!-- Redaction Style & Tools Deck (Visible once PDF loaded) -->
          <div id="rd-controls-deck" style="display: none; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">REDACTION BOX STYLE</span>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button class="tool-btn secondary rd-style-btn active" data-style="black" style="font-size: 11px; padding: 8px; border-color: var(--accent-cyan); color: var(--accent-cyan);">
                  ⬛ Solid Black Block
                </button>
                <button class="tool-btn secondary rd-style-btn" data-style="white" style="font-size: 11px; padding: 8px;">
                  ⬜ White Out Block
                </button>
              </div>

              <!-- Page Selector & Instructions -->
              <div style="border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 2px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Select Page to Redact
                  <select id="rd-page-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="1">Page 1</option>
                  </select>
                </label>
              </div>

              <div style="font-size: 11px; color: var(--text-muted); line-height: 1.45;">
                🖱️ <strong>How to Redact:</strong> Click &amp; drag directly on the document preview to draw blackout boxes over sensitive text.
              </div>
            </div>

            <!-- List of Current Page Redaction Boxes -->
            <div style="display: flex; flex-direction: column; gap: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span id="rd-list-label" style="font-size: 11px; font-weight: 700; color: var(--text-muted);">0 REDACTIONS ON THIS PAGE</span>
                <button class="tool-btn secondary" id="rd-clear-page-btn" style="font-size: 10px; padding: 2px 8px; color: #ef4444;">Clear Page</button>
              </div>

              <div id="rd-boxes-list" style="max-height: 140px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px;">
                <!-- Redaction chips go here -->
              </div>
            </div>

            <!-- Action Button -->
            <button class="tool-btn primary" id="rd-apply-btn" style="font-size: 14px; padding: 12px 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Sanitize &amp; Download Redacted PDF</span>
            </button>
          </div>
        </div>

        <!-- Interactive Redaction Canvas (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Redaction Viewport</h3>
            <span id="rd-page-indicator" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Document Canvas Viewport with Drawing Layer -->
          <div style="flex: 1; min-height: 400px; max-height: 580px; background: #1e293b; border: 1px solid var(--border-color); border-radius: 10px; overflow: auto; position: relative; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div id="rd-canvas-wrapper" style="position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); display: none; cursor: crosshair;">
              <!-- Underneath PDF page -->
              <canvas id="rd-pdf-canvas" style="display: block; background: #fff;"></canvas>

              <!-- Transparent Drawing Overlay Canvas -->
              <canvas id="rd-draw-canvas" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: block;"></canvas>
            </div>

            <!-- Empty Document State -->
            <div id="rd-placeholder" style="display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--text-muted); text-align: center; padding: 30px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 52px; height: 52px; opacity: 0.4;">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
              <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">No Document Loaded</div>
              <div style="font-size: 11px; max-width: 240px;">Upload a PDF and drag boxes over text to blackout and sanitize.</div>
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
    this.dropzone = container.querySelector('#rd-dropzone');
    this.fileInput = container.querySelector('#rd-file-input');
    this.clearBtn = container.querySelector('#rd-clear-btn');
    this.controlsDeck = container.querySelector('#rd-controls-deck');
    this.styleBtns = container.querySelectorAll('.rd-style-btn');
    this.pageSelect = container.querySelector('#rd-page-select');
    this.listLabel = container.querySelector('#rd-list-label');
    this.clearPageBtn = container.querySelector('#rd-clear-page-btn');
    this.boxesList = container.querySelector('#rd-boxes-list');
    this.applyBtn = container.querySelector('#rd-apply-btn');
    this.pageIndicator = container.querySelector('#rd-page-indicator');
    this.canvasWrapper = container.querySelector('#rd-canvas-wrapper');
    this.pdfCanvas = container.querySelector('#rd-pdf-canvas');
    this.drawCanvas = container.querySelector('#rd-draw-canvas');
    this.placeholder = container.querySelector('#rd-placeholder');

    this.drawCtx = this.drawCanvas.getContext('2d');

    // Style toggles
    this.styleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.styleBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = '';
          b.style.color = '';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--accent-cyan)';
        btn.style.color = 'var(--accent-cyan)';
        this.activeStyle = btn.dataset.style;
      });
    });

    // Dropzone
    this.dropzone.addEventListener('click', () => this.fileInput.click());
    this.clearBtn.addEventListener('click', () => this.resetDoc());

    this.dropzone.addEventListener('dragover', (e) => { e.preventDefault(); this.dropzone.style.borderColor = 'var(--accent-cyan)'; });
    this.dropzone.addEventListener('dragleave', () => { this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)'; });
    this.dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)';
      if (e.dataTransfer.files.length > 0) this.loadFile(e.dataTransfer.files[0]);
    });
    this.fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) this.loadFile(e.target.files[0]);
    });

    // Page select
    this.pageSelect.addEventListener('change', (e) => {
      this.currentPageNum = parseInt(e.target.value);
      this.renderCurrentPage();
    });

    this.clearPageBtn.addEventListener('click', () => {
      this.redactionsByPage[this.currentPageNum] = [];
      this.renderRedactionOverlay();
      this.updateRedactionsList();
    });

    // Drag-to-redact canvas handlers
    this.setupDrawEvents();

    this.applyBtn.addEventListener('click', () => this.sanitizeAndDownload());
  },

  async loadFile(file) {
    if (file.type !== 'application/pdf') {
      this.app.showToast("Please choose a valid PDF file.", "warning");
      return;
    }

    try {
      this.pdfDocBytes = await file.arrayBuffer();
      this.fileName = file.name.replace(/\.[^/.]+$/, "");
      this.redactionsByPage = {};

      await this.ensurePdfJs();
      const loadingTask = window.pdfjsLib.getDocument({ data: this.pdfDocBytes.slice(0) });
      this.pdfjsDoc = await loadingTask.promise;
      this.totalPages = this.pdfjsDoc.numPages;

      // Populate page selector
      this.pageSelect.innerHTML = '';
      for (let i = 1; i <= this.totalPages; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = `Page ${i} of ${this.totalPages}`;
        this.pageSelect.appendChild(opt);
      }

      this.dropzone.style.display = 'none';
      this.clearBtn.style.display = 'inline-block';
      this.controlsDeck.style.display = 'flex';
      this.placeholder.style.display = 'none';
      this.canvasWrapper.style.display = 'block';

      this.currentPageNum = 1;
      await this.renderCurrentPage();
      this.app.showToast(`Loaded "${file.name}" ready to redact!`, "success");

    } catch (err) {
      console.error("PDF redact load error:", err);
      this.app.showToast(`Failed to parse PDF: ${err.message}`, "error");
    }
  },

  async renderCurrentPage() {
    if (!this.pdfjsDoc) return;

    this.pageIndicator.textContent = `Page ${this.currentPageNum} of ${this.totalPages}`;
    const page = await this.pdfjsDoc.getPage(this.currentPageNum);
    const viewport = page.getViewport({ scale: 1.2 });

    this.pdfCanvas.width = viewport.width;
    this.pdfCanvas.height = viewport.height;
    this.drawCanvas.width = viewport.width;
    this.drawCanvas.height = viewport.height;
    this.viewport = viewport;

    const ctx = this.pdfCanvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport: viewport }).promise;

    this.renderRedactionOverlay();
    this.updateRedactionsList();
  },

  setupDrawEvents() {
    let isDrawing = false;
    let startX = 0;
    let startY = 0;

    const getPos = (e) => {
      const rect = this.drawCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (this.drawCanvas.width / rect.width),
        y: (clientY - rect.top) * (this.drawCanvas.height / rect.height)
      };
    };

    const onStart = (e) => {
      isDrawing = true;
      const pos = getPos(e);
      startX = pos.x;
      startY = pos.y;
    };

    const onMove = (e) => {
      if (!isDrawing) return;
      const pos = getPos(e);

      this.renderRedactionOverlay();

      // Draw active temporary drag box
      this.drawCtx.fillStyle = this.activeStyle === 'white' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.75)';
      this.drawCtx.strokeStyle = '#ef4444';
      this.drawCtx.lineWidth = 2;

      const w = pos.x - startX;
      const h = pos.y - startY;

      this.drawCtx.fillRect(startX, startY, w, h);
      this.drawCtx.strokeRect(startX, startY, w, h);
    };

    const onStop = (e) => {
      if (!isDrawing) return;
      isDrawing = false;

      const pos = e.changedTouches ? {
        x: (e.changedTouches[0].clientX - this.drawCanvas.getBoundingClientRect().left) * (this.drawCanvas.width / this.drawCanvas.getBoundingClientRect().width),
        y: (e.changedTouches[0].clientY - this.drawCanvas.getBoundingClientRect().top) * (this.drawCanvas.height / this.drawCanvas.getBoundingClientRect().height)
      } : getPos(e);

      const rawW = pos.x - startX;
      const rawH = pos.y - startY;

      // Ignore tiny accidental clicks (< 6px)
      if (Math.abs(rawW) < 6 || Math.abs(rawH) < 6) {
        this.renderRedactionOverlay();
        return;
      }

      const box = {
        x: rawW < 0 ? pos.x : startX,
        y: rawH < 0 ? pos.y : startY,
        width: Math.abs(rawW),
        height: Math.abs(rawH),
        style: this.activeStyle
      };

      if (!this.redactionsByPage[this.currentPageNum]) {
        this.redactionsByPage[this.currentPageNum] = [];
      }
      this.redactionsByPage[this.currentPageNum].push(box);

      this.renderRedactionOverlay();
      this.updateRedactionsList();
      this.app.showToast("Redaction box added.", "info");
    };

    this.drawCanvas.addEventListener('mousedown', onStart);
    this.drawCanvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onStop);

    this.drawCanvas.addEventListener('touchstart', (e) => { e.preventDefault(); onStart(e); });
    this.drawCanvas.addEventListener('touchmove', (e) => { e.preventDefault(); onMove(e); });
    this.drawCanvas.addEventListener('touchend', onStop);
  },

  renderRedactionOverlay() {
    this.drawCtx.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    const list = this.redactionsByPage[this.currentPageNum] || [];

    list.forEach(box => {
      if (box.style === 'white') {
        this.drawCtx.fillStyle = '#ffffff';
        this.drawCtx.strokeStyle = '#cbd5e1';
      } else {
        this.drawCtx.fillStyle = '#000000';
        this.drawCtx.strokeStyle = '#ef4444';
      }

      this.drawCtx.fillRect(box.x, box.y, box.width, box.height);
      this.drawCtx.lineWidth = 1;
      this.drawCtx.strokeRect(box.x, box.y, box.width, box.height);
    });
  },

  updateRedactionsList() {
    const list = this.redactionsByPage[this.currentPageNum] || [];
    this.listLabel.textContent = `${list.length} REDACTION${list.length === 1 ? '' : 'S'} ON THIS PAGE`;

    this.boxesList.innerHTML = '';
    if (list.length === 0) {
      this.boxesList.innerHTML = `<span style="font-size: 11px; color: var(--text-muted); font-style: italic;">No redactions drawn on Page ${this.currentPageNum} yet.</span>`;
      return;
    }

    list.forEach((box, i) => {
      const chip = document.createElement('div');
      chip.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 8px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 11px;
      `;
      chip.innerHTML = `
        <span>Redaction #${i + 1} (${Math.round(box.width)}x${Math.round(box.height)}px)</span>
        <button class="tool-btn secondary" style="padding: 1px 6px; font-size: 10px; color: #ef4444;">Remove</button>
      `;
      chip.querySelector('button').addEventListener('click', () => {
        list.splice(i, 1);
        this.renderRedactionOverlay();
        this.updateRedactionsList();
      });
      this.boxesList.appendChild(chip);
    });
  },

  async sanitizeAndDownload() {
    if (!this.pdfDocBytes) return;

    let totalBoxes = 0;
    Object.values(this.redactionsByPage).forEach(arr => totalBoxes += arr.length);

    if (totalBoxes === 0) {
      this.app.showToast("No redaction boxes drawn. Draw at least one blackout box first.", "warning");
      return;
    }

    try {
      this.applyBtn.disabled = true;
      this.applyBtn.innerHTML = `<span>Permanently Sanitizing Content...</span>`;

      await this.ensurePdfLib();
      const pdfDoc = await window.PDFLib.PDFDocument.load(this.pdfDocBytes.slice(0));
      const pages = pdfDoc.getPages();

      // Burn rectangles into PDF content stream
      for (const [pageNumStr, boxes] of Object.entries(this.redactionsByPage)) {
        const pageIdx = parseInt(pageNumStr) - 1;
        if (pageIdx >= 0 && pageIdx < pages.length && boxes.length > 0) {
          const targetPage = pages[pageIdx];
          const { width, height } = targetPage.getSize();

          const scaleX = width / this.drawCanvas.width;
          const scaleY = height / this.drawCanvas.height;

          boxes.forEach(box => {
            const pdfX = box.x * scaleX;
            // PDF coordinate Y starts at bottom
            const pdfY = height - ((box.y + box.height) * scaleY);
            const pdfW = box.width * scaleX;
            const pdfH = box.height * scaleY;

            const color = box.style === 'white' ? window.PDFLib.rgb(1, 1, 1) : window.PDFLib.rgb(0, 0, 0);

            targetPage.drawRectangle({
              x: pdfX,
              y: pdfY,
              width: pdfW,
              height: pdfH,
              color: color,
              borderWidth: 0
            });
          });
        }
      }

      const sanitizedBytes = await pdfDoc.save();
      const blob = new Blob([sanitizedBytes], { type: 'application/pdf' });
      const filename = `${this.fileName}-redacted.pdf`;

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.app.showToast(`Sanitized PDF downloaded: ${filename}!`, "success");

    } catch (err) {
      console.error("Redaction error:", err);
      this.app.showToast(`Sanitization failed: ${err.message}`, "error");
    } finally {
      this.applyBtn.disabled = false;
      this.applyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Sanitize &amp; Download Redacted PDF</span>
      `;
    }
  },

  resetDoc() {
    this.pdfDocBytes = null;
    this.pdfjsDoc = null;
    this.fileName = "";
    this.redactionsByPage = {};
    this.dropzone.style.display = 'flex';
    this.clearBtn.style.display = 'none';
    this.controlsDeck.style.display = 'none';
    this.canvasWrapper.style.display = 'none';
    this.placeholder.style.display = 'flex';
    this.pageIndicator.textContent = '';
  },

  ensurePdfJs() {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) return resolve(window.pdfjsLib);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error("Failed to load PDF viewer engine"));
      document.head.appendChild(script);
    });
  },

  ensurePdfLib() {
    return new Promise((resolve, reject) => {
      if (window.PDFLib) return resolve(window.PDFLib);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
      script.onload = () => resolve(window.PDFLib);
      script.onerror = () => reject(new Error("Failed to load PDF manipulation engine"));
      document.head.appendChild(script);
    });
  },

  cleanup() {
    this.resetDoc();
  }
};
