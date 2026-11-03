// OmniTool Hub - Crop PDF Margins Studio
// 100% Client-Side PDF margin cropping, whitespace trimming, and bounding box adjuster using pdf-lib & pdf.js.

import { escapeHtml } from './utils.js';

export default {
  id: "crop-pdf",
  name: "Crop PDF Margins",

  pdfDocBytes: null,
  fileName: "",
  totalPages: 1,
  pdfjsDoc: null,
  cropTop: 0,
  cropBottom: 0,
  cropLeft: 0,
  cropRight: 0,
  unit: "mm", // 'mm' | 'pt'

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration Controls (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Crop PDF Margins</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Trim excess white margins, headers, or footers from PDF pages.
              </p>
            </div>
            <button class="tool-btn secondary" id="cp-clear-btn" style="font-size: 11px; padding: 4px 10px; display: none;">New Document</button>
          </div>

          <!-- Upload Dropzone -->
          <div id="cp-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 180px; margin-bottom: 14px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 44px; height: 44px; color: var(--accent-cyan); margin-bottom: 10px;">
              <path d="M6 2v14a2 2 0 0 0 2 2h14"></path>
              <path d="M18 22V8a2 2 0 0 0-2-2H2"></path>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drop PDF file here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              Scanned books, wide-margin papers, lecture slides.
            </div>
            <input type="file" id="cp-file-input" accept="application/pdf" style="display: none;">
          </div>

          <!-- Margin Controls Deck (Visible after file loaded) -->
          <div id="cp-controls-deck" style="display: none; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">MARGIN TRIMMING (<span id="cp-unit-display">mm</span>)</span>
                <div style="display: flex; gap: 4px;">
                  <button class="tool-btn secondary cp-unit-btn active" data-unit="mm" style="font-size: 10px; padding: 2px 8px; border-color: var(--accent-cyan); color: var(--accent-cyan);">mm</button>
                  <button class="tool-btn secondary cp-unit-btn" data-unit="pt" style="font-size: 10px; padding: 2px 8px;">pt (points)</button>
                </div>
              </div>

              <!-- 4 Margin Inputs Grid -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <label style="display: flex; flex-direction: column; gap: 2px; font-size: 11px; color: var(--text-muted);">
                  Top Margin
                  <input type="number" id="cp-top-input" class="tool-input" value="0" min="0" max="150" step="1" style="padding: 6px; font-size: 12px; font-family: monospace;">
                </label>

                <label style="display: flex; flex-direction: column; gap: 2px; font-size: 11px; color: var(--text-muted);">
                  Bottom Margin
                  <input type="number" id="cp-bottom-input" class="tool-input" value="0" min="0" max="150" step="1" style="padding: 6px; font-size: 12px; font-family: monospace;">
                </label>

                <label style="display: flex; flex-direction: column; gap: 2px; font-size: 11px; color: var(--text-muted);">
                  Left Margin
                  <input type="number" id="cp-left-input" class="tool-input" value="0" min="0" max="150" step="1" style="padding: 6px; font-size: 12px; font-family: monospace;">
                </label>

                <label style="display: flex; flex-direction: column; gap: 2px; font-size: 11px; color: var(--text-muted);">
                  Right Margin
                  <input type="number" id="cp-right-input" class="tool-input" value="0" min="0" max="150" step="1" style="padding: 6px; font-size: 12px; font-family: monospace;">
                </label>
              </div>

              <!-- Quick Presets -->
              <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px;">
                <button class="tool-btn secondary cp-preset-btn" data-top="10" data-bottom="10" data-left="10" data-right="10" style="font-size: 10px; padding: 3px 8px;">Standard Trim (10mm)</button>
                <button class="tool-btn secondary cp-preset-btn" data-top="20" data-bottom="20" data-left="15" data-right="15" style="font-size: 10px; padding: 3px 8px;">Heavy Trim (20mm)</button>
                <button class="tool-btn secondary cp-preset-btn" data-top="25" data-bottom="0" data-left="0" data-right="0" style="font-size: 10px; padding: 3px 8px;">Cut Header (25mm)</button>
                <button class="tool-btn secondary cp-preset-btn" data-top="0" data-bottom="0" data-left="0" data-right="0" style="font-size: 10px; padding: 3px 8px;">Reset (0mm)</button>
              </div>

              <!-- Scope Selection -->
              <div style="border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 4px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Apply Scope
                  <select id="cp-scope-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="all" selected>All Pages in Document</option>
                    <option value="even">Even Pages Only</option>
                    <option value="odd">Odd Pages Only</option>
                  </select>
                </label>
              </div>
            </div>

            <!-- Action Button -->
            <button class="tool-btn primary" id="cp-apply-btn" style="font-size: 14px; padding: 12px 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Crop &amp; Download PDF</span>
            </button>
          </div>
        </div>

        <!-- Live Visual Bounding Box Preview (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Crop Boundary Preview</h3>
            <span id="cp-preview-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Document Canvas Viewport with Crop Bounding Box -->
          <div style="flex: 1; min-height: 400px; max-height: 580px; background: #1e293b; border: 1px solid var(--border-color); border-radius: 10px; overflow: auto; position: relative; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div id="cp-canvas-wrapper" style="position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); display: none;">
              <canvas id="cp-preview-canvas" style="display: block; background: #fff;"></canvas>
              
              <!-- Semi-Transparent Crop Shade Overlays -->
              <div id="cp-shade-top" style="position: absolute; top: 0; left: 0; right: 0; background: rgba(239, 68, 68, 0.25); border-bottom: 2px dashed #ef4444; pointer-events: none;"></div>
              <div id="cp-shade-bottom" style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(239, 68, 68, 0.25); border-top: 2px dashed #ef4444; pointer-events: none;"></div>
              <div id="cp-shade-left" style="position: absolute; top: 0; bottom: 0; left: 0; background: rgba(239, 68, 68, 0.25); border-right: 2px dashed #ef4444; pointer-events: none;"></div>
              <div id="cp-shade-right" style="position: absolute; top: 0; bottom: 0; right: 0; background: rgba(239, 68, 68, 0.25); border-left: 2px dashed #ef4444; pointer-events: none;"></div>
            </div>

            <!-- Empty Document State -->
            <div id="cp-placeholder" style="display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--text-muted); text-align: center; padding: 30px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 52px; height: 52px; opacity: 0.4;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">No Document Loaded</div>
              <div style="font-size: 11px; max-width: 240px;">Upload a PDF to view pages and adjust crop boundaries visually.</div>
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
    this.dropzone = container.querySelector('#cp-dropzone');
    this.fileInput = container.querySelector('#cp-file-input');
    this.clearBtn = container.querySelector('#cp-clear-btn');
    this.controlsDeck = container.querySelector('#cp-controls-deck');
    this.topInput = container.querySelector('#cp-top-input');
    this.bottomInput = container.querySelector('#cp-bottom-input');
    this.leftInput = container.querySelector('#cp-left-input');
    this.rightInput = container.querySelector('#cp-right-input');
    this.scopeSelect = container.querySelector('#cp-scope-select');
    this.unitBtns = container.querySelectorAll('.cp-unit-btn');
    this.presetBtns = container.querySelectorAll('.cp-preset-btn');
    this.unitDisplay = container.querySelector('#cp-unit-display');
    this.applyBtn = container.querySelector('#cp-apply-btn');
    this.previewBadge = container.querySelector('#cp-preview-badge');
    this.canvasWrapper = container.querySelector('#cp-canvas-wrapper');
    this.previewCanvas = container.querySelector('#cp-preview-canvas');
    this.placeholder = container.querySelector('#cp-placeholder');

    this.shadeTop = container.querySelector('#cp-shade-top');
    this.shadeBottom = container.querySelector('#cp-shade-bottom');
    this.shadeLeft = container.querySelector('#cp-shade-left');
    this.shadeRight = container.querySelector('#cp-shade-right');

    // Unit toggle
    this.unitBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.unitBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = '';
          b.style.color = '';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--accent-cyan)';
        btn.style.color = 'var(--accent-cyan)';
        this.unit = btn.dataset.unit;
        this.unitDisplay.textContent = this.unit;
        this.updateCropVisuals();
      });
    });

    // Preset buttons
    this.presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const factor = this.unit === 'pt' ? 2.83465 : 1;
        this.topInput.value = Math.round(parseFloat(btn.dataset.top) * factor);
        this.bottomInput.value = Math.round(parseFloat(btn.dataset.bottom) * factor);
        this.leftInput.value = Math.round(parseFloat(btn.dataset.left) * factor);
        this.rightInput.value = Math.round(parseFloat(btn.dataset.right) * factor);
        this.updateCropVisuals();
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

    // Input changes
    [this.topInput, this.bottomInput, this.leftInput, this.rightInput].forEach(inp => {
      inp.addEventListener('input', () => this.updateCropVisuals());
    });

    this.applyBtn.addEventListener('click', () => this.applyCropAndDownload());
  },

  async loadFile(file) {
    if (file.type !== 'application/pdf') {
      this.app.showToast("Please select a PDF document.", "warning");
      return;
    }

    try {
      this.pdfDocBytes = await file.arrayBuffer();
      this.fileName = file.name.replace(/\.[^/.]+$/, "");

      await this.ensurePdfJs();
      const loadingTask = window.pdfjsLib.getDocument({ data: this.pdfDocBytes.slice(0) });
      this.pdfjsDoc = await loadingTask.promise;
      this.totalPages = this.pdfjsDoc.numPages;

      this.dropzone.style.display = 'none';
      this.clearBtn.style.display = 'inline-block';
      this.controlsDeck.style.display = 'flex';
      this.placeholder.style.display = 'none';
      this.canvasWrapper.style.display = 'block';

      this.previewBadge.textContent = `${this.totalPages} Pages`;
      this.app.showToast(`Loaded "${file.name}"`, "success");

      await this.renderPageCanvas();
      this.updateCropVisuals();

    } catch (err) {
      console.error("PDF crop load error:", err);
      this.app.showToast(`Failed to parse PDF: ${err.message}`, "error");
    }
  },

  async renderPageCanvas() {
    if (!this.pdfjsDoc) return;
    const page = await this.pdfjsDoc.getPage(1);
    const viewport = page.getViewport({ scale: 1.2 });

    this.previewCanvas.width = viewport.width;
    this.previewCanvas.height = viewport.height;
    this.canvasViewport = viewport;

    const ctx = this.previewCanvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport: viewport }).promise;
  },

  updateCropVisuals() {
    if (!this.canvasViewport) return;

    // Convert input unit to points (1 mm = 2.83465 pt)
    const factor = this.unit === 'mm' ? 2.83465 : 1;
    const topPt = (parseFloat(this.topInput.value) || 0) * factor;
    const bottomPt = (parseFloat(this.bottomInput.value) || 0) * factor;
    const leftPt = (parseFloat(this.leftInput.value) || 0) * factor;
    const rightPt = (parseFloat(this.rightInput.value) || 0) * factor;

    // Scale to canvas pixels
    const scale = this.canvasViewport.scale;
    const topPx = topPt * scale;
    const bottomPx = bottomPt * scale;
    const leftPx = leftPt * scale;
    const rightPx = rightPt * scale;

    this.shadeTop.style.height = `${topPx}px`;
    this.shadeBottom.style.height = `${bottomPx}px`;
    this.shadeLeft.style.width = `${leftPx}px`;
    this.shadeLeft.style.top = `${topPx}px`;
    this.shadeLeft.style.bottom = `${bottomPx}px`;
    this.shadeRight.style.width = `${rightPx}px`;
    this.shadeRight.style.top = `${topPx}px`;
    this.shadeRight.style.bottom = `${bottomPx}px`;
  },

  async applyCropAndDownload() {
    if (!this.pdfDocBytes) return;

    try {
      this.applyBtn.disabled = true;
      this.applyBtn.innerHTML = `<span>Cropping PDF Pages...</span>`;

      await this.ensurePdfLib();
      const pdfDoc = await window.PDFLib.PDFDocument.load(this.pdfDocBytes.slice(0));
      const pages = pdfDoc.getPages();

      const factor = this.unit === 'mm' ? 2.83465 : 1;
      const topPt = (parseFloat(this.topInput.value) || 0) * factor;
      const bottomPt = (parseFloat(this.bottomInput.value) || 0) * factor;
      const leftPt = (parseFloat(this.leftInput.value) || 0) * factor;
      const rightPt = (parseFloat(this.rightInput.value) || 0) * factor;

      const scope = this.scopeSelect.value;

      pages.forEach((page, idx) => {
        const pageNum = idx + 1;
        if (scope === 'even' && pageNum % 2 !== 0) return;
        if (scope === 'odd' && pageNum % 2 === 0) return;

        const { width, height } = page.getSize();

        const newX = leftPt;
        const newY = bottomPt;
        const newW = Math.max(10, width - leftPt - rightPt);
        const newH = Math.max(10, height - topPt - bottomPt);

        // Update MediaBox and CropBox
        page.setCropBox(newX, newY, newW, newH);
        page.setMediaBox(newX, newY, newW, newH);
      });

      const croppedBytes = await pdfDoc.save();
      const blob = new Blob([croppedBytes], { type: 'application/pdf' });
      const filename = `${this.fileName}-cropped.pdf`;

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.app.showToast(`Saved cropped PDF: ${filename}!`, "success");

    } catch (err) {
      console.error("PDF Crop error:", err);
      this.app.showToast(`Crop failed: ${err.message}`, "error");
    } finally {
      this.applyBtn.disabled = false;
      this.applyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Crop &amp; Download PDF</span>
      `;
    }
  },

  resetDoc() {
    this.pdfDocBytes = null;
    this.pdfjsDoc = null;
    this.fileName = "";
    this.dropzone.style.display = 'flex';
    this.clearBtn.style.display = 'none';
    this.controlsDeck.style.display = 'none';
    this.canvasWrapper.style.display = 'none';
    this.placeholder.style.display = 'flex';
    this.previewBadge.textContent = '';
  },

  ensurePdfJs() {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) return resolve(window.pdfjsLib);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
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
