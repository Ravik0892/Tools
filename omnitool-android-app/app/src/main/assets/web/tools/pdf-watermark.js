// OmniTool Hub - Add Watermark & Page Numbers to PDF
// 100% Client-Side PDF watermarking and page numbering using pdf-lib and pdf.js.

import { escapeHtml } from './utils.js';

export default {
  id: "pdf-watermark",
  name: "Add Watermark & Page Numbers to PDF",

  pdfDocBytes: null,
  fileName: "",
  totalPages: 1,
  activeMode: "watermark", // 'watermark' | 'pagenumbers'

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration Deck (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Watermark &amp; Page Numbers</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Stamp diagonal text watermarks, security labels, or header/footer page numbers.
              </p>
            </div>
            <button class="tool-btn secondary" id="wm-clear-btn" style="font-size: 11px; padding: 4px 10px; display: none;">New PDF</button>
          </div>

          <!-- Mode Switcher -->
          <div style="display: flex; gap: 8px; margin-bottom: 14px;">
            <button class="tool-btn secondary wm-mode-btn active" data-mode="watermark" style="flex: 1; font-size: 12px; padding: 8px; font-weight: 700; border-color: var(--accent-cyan); color: var(--accent-cyan);">
              💧 Watermark Tool
            </button>
            <button class="tool-btn secondary wm-mode-btn" data-mode="pagenumbers" style="flex: 1; font-size: 12px; padding: 8px; font-weight: 700;">
              🔢 Page Numbers
            </button>
          </div>

          <!-- Document Upload Dropzone -->
          <div id="wm-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 180px; margin-bottom: 14px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 44px; height: 44px; color: var(--accent-cyan); margin-bottom: 10px;">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M12 18v-6"></path>
              <path d="m9 15 3 3 3-3"></path>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drop PDF file here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              Contracts, manuscripts, notes, invoices. 100% private.
            </div>
            <input type="file" id="wm-file-input" accept="application/pdf" style="display: none;">
          </div>

          <!-- Settings: Watermark Mode -->
          <div id="wm-watermark-settings" class="wm-settings-card" style="display: flex; flex-direction: column; gap: 12px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">WATERMARK TEXT &amp; APPEARANCE</span>

              <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                Watermark Text
                <input type="text" id="wm-text-input" class="tool-input" value="CONFIDENTIAL" placeholder="e.g. DRAFT, CONFIDENTIAL, SAMPLE" style="padding: 8px 12px; font-size: 12px; font-weight: 700;">
              </label>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Rotation Angle
                  <select id="wm-angle-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="45" selected>Diagonal (45°)</option>
                    <option value="0">Horizontal (0°)</option>
                    <option value="90">Vertical (90°)</option>
                    <option value="-45">Reverse Diagonal (-45°)</option>
                  </select>
                </label>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Color Tone
                  <select id="wm-color-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="gray" selected>Charcoal Gray</option>
                    <option value="red">Bold Red</option>
                    <option value="blue">Navy Blue</option>
                    <option value="emerald">Emerald Green</option>
                  </select>
                </label>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  <span>Opacity: <strong id="wm-opacity-label">30%</strong></span>
                  <input type="range" id="wm-opacity-slider" min="5" max="90" step="5" value="30" style="accent-color: var(--accent-cyan); cursor: pointer;">
                </label>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  <span>Font Size: <strong id="wm-size-label">50pt</strong></span>
                  <input type="range" id="wm-size-slider" min="20" max="100" step="5" value="50" style="accent-color: var(--accent-cyan); cursor: pointer;">
                </label>
              </div>
            </div>
          </div>

          <!-- Settings: Page Numbers Mode -->
          <div id="wm-numbers-settings" class="wm-settings-card" style="display: none; flex-direction: column; gap: 12px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">PAGE NUMBERING FORMAT</span>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Number Format
                  <select id="wm-num-format-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="page-of" selected>Page {n} of {total}</option>
                    <option value="slash">{n} / {total}</option>
                    <option value="page-only">Page {n}</option>
                    <option value="hyphen">- {n} -</option>
                    <option value="num-only">{n}</option>
                  </select>
                </label>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Placement Position
                  <select id="wm-num-pos-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="bottom-center" selected>Bottom Center</option>
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                    <option value="top-right">Top Right</option>
                    <option value="top-center">Top Center</option>
                  </select>
                </label>
              </div>

              <div style="display: flex; flex-direction: column; gap: 8px; border-top: 1px solid var(--border-color); padding-top: 10px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="wm-skip-first-toggle" style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                  <span>Skip First Page (Do not number cover page)</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <button class="tool-btn primary" id="wm-process-btn" disabled style="margin-top: 14px; font-size: 14px; padding: 12px 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span id="wm-btn-label">Apply &amp; Download PDF</span>
          </button>
        </div>

        <!-- Document Preview Panel (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Live Document Preview</h3>
            <span id="wm-preview-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Document Page Preview Area -->
          <div style="flex: 1; min-height: 400px; max-height: 580px; background: #1e293b; border: 1px solid var(--border-color); border-radius: 10px; overflow: auto; position: relative; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div id="wm-canvas-wrapper" style="position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); display: none;">
              <canvas id="wm-preview-canvas" style="display: block; background: #fff;"></canvas>
            </div>

            <!-- Empty Document State -->
            <div id="wm-placeholder" style="display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--text-muted); text-align: center; padding: 30px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 52px; height: 52px; opacity: 0.4;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">No Document Loaded</div>
              <div style="font-size: 11px; max-width: 240px;">Upload a PDF to preview watermarks or page numbering in real time.</div>
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
    this.dropzone = container.querySelector('#wm-dropzone');
    this.fileInput = container.querySelector('#wm-file-input');
    this.clearBtn = container.querySelector('#wm-clear-btn');
    this.modeBtns = container.querySelectorAll('.wm-mode-btn');
    this.watermarkSettings = container.querySelector('#wm-watermark-settings');
    this.numbersSettings = container.querySelector('#wm-numbers-settings');
    this.textInput = container.querySelector('#wm-text-input');
    this.angleSelect = container.querySelector('#wm-angle-select');
    this.colorSelect = container.querySelector('#wm-color-select');
    this.opacitySlider = container.querySelector('#wm-opacity-slider');
    this.opacityLabel = container.querySelector('#wm-opacity-label');
    this.sizeSlider = container.querySelector('#wm-size-slider');
    this.sizeLabel = container.querySelector('#wm-size-label');
    this.numFormatSelect = container.querySelector('#wm-num-format-select');
    this.numPosSelect = container.querySelector('#wm-num-pos-select');
    this.skipFirstToggle = container.querySelector('#wm-skip-first-toggle');
    this.processBtn = container.querySelector('#wm-process-btn');
    this.btnLabel = container.querySelector('#wm-btn-label');
    this.previewBadge = container.querySelector('#wm-preview-badge');
    this.canvasWrapper = container.querySelector('#wm-canvas-wrapper');
    this.previewCanvas = container.querySelector('#wm-preview-canvas');
    this.placeholder = container.querySelector('#wm-placeholder');

    // Mode Switcher
    this.modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.modeBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = '';
          b.style.color = '';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--accent-cyan)';
        btn.style.color = 'var(--accent-cyan)';
        this.activeMode = btn.dataset.mode;

        this.watermarkSettings.style.display = this.activeMode === 'watermark' ? 'flex' : 'none';
        this.numbersSettings.style.display = this.activeMode === 'pagenumbers' ? 'flex' : 'none';

        this.btnLabel.textContent = this.activeMode === 'watermark' ? 'Apply Watermark & Download' : 'Apply Page Numbers & Download';
        this.renderPreview();
      });
    });

    // File Dropzone
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

    // Sliders
    this.opacitySlider.addEventListener('input', () => {
      this.opacityLabel.textContent = `${this.opacitySlider.value}%`;
      this.renderPreview();
    });
    this.sizeSlider.addEventListener('input', () => {
      this.sizeLabel.textContent = `${this.sizeSlider.value}pt`;
      this.renderPreview();
    });

    // Inputs triggering preview updates
    this.textInput.addEventListener('input', () => this.renderPreview());
    this.angleSelect.addEventListener('change', () => this.renderPreview());
    this.colorSelect.addEventListener('change', () => this.renderPreview());
    this.numFormatSelect.addEventListener('change', () => this.renderPreview());
    this.numPosSelect.addEventListener('change', () => this.renderPreview());
    this.skipFirstToggle.addEventListener('change', () => this.renderPreview());

    // Process button
    this.processBtn.addEventListener('click', () => this.applyAndDownload());
  },

  async loadFile(file) {
    if (file.type !== 'application/pdf') {
      this.app.showToast("Please upload a PDF document.", "warning");
      return;
    }

    try {
      this.pdfDocBytes = await file.arrayBuffer();
      this.fileName = file.name.replace(/\.[^/.]+$/, "");

      // Ensure PDF.js is ready
      await this.ensurePdfJs();
      const loadingTask = window.pdfjsLib.getDocument({ data: this.pdfDocBytes.slice(0) });
      this.pdfjsDoc = await loadingTask.promise;
      this.totalPages = this.pdfjsDoc.numPages;

      this.dropzone.style.display = 'none';
      this.clearBtn.style.display = 'inline-block';
      this.placeholder.style.display = 'none';
      this.canvasWrapper.style.display = 'block';
      this.processBtn.disabled = false;

      this.previewBadge.textContent = `${this.totalPages} Pages`;
      this.app.showToast(`Loaded "${file.name}"`, "success");

      await this.renderPreview();

    } catch (err) {
      console.error("PDF load error:", err);
      this.app.showToast(`Failed to open PDF: ${err.message}`, "error");
    }
  },

  async renderPreview() {
    if (!this.pdfjsDoc) return;

    try {
      const page = await this.pdfjsDoc.getPage(1);
      const viewport = page.getViewport({ scale: 1.2 });

      this.previewCanvas.width = viewport.width;
      this.previewCanvas.height = viewport.height;
      const ctx = this.previewCanvas.getContext('2d');

      // Render PDF page to canvas
      await page.render({ canvasContext: ctx, viewport: viewport }).promise;

      // Draw overlay preview
      if (this.activeMode === 'watermark') {
        const text = (this.textInput.value || "WATERMARK").trim();
        const angle = parseInt(this.angleSelect.value) * (Math.PI / 180);
        const opacity = parseInt(this.opacitySlider.value) / 100;
        const fontSize = parseInt(this.sizeSlider.value);

        const colorMap = {
          gray: 'rgba(50, 50, 50, ',
          red: 'rgba(220, 38, 38, ',
          blue: 'rgba(29, 78, 216, ',
          emerald: 'rgba(16, 185, 129, '
        };
        const colorPrefix = colorMap[this.colorSelect.value] || colorMap.gray;

        ctx.save();
        ctx.translate(viewport.width / 2, viewport.height / 2);
        ctx.rotate(-angle);
        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.fillStyle = `${colorPrefix}${opacity})`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 0, 0);
        ctx.restore();

      } else {
        // Page numbers overlay
        const skipFirst = this.skipFirstToggle.checked;
        if (skipFirst) {
          ctx.save();
          ctx.font = "italic 11px sans-serif";
          ctx.fillStyle = "rgba(100, 116, 139, 0.7)";
          ctx.fillText("(Cover Page - Numbering Skipped)", viewport.width / 2, viewport.height - 20);
          ctx.restore();
          return;
        }

        const fmt = this.numFormatSelect.value;
        const total = this.totalPages;
        let numStr = `Page 1 of ${total}`;
        if (fmt === 'slash') numStr = `1 / ${total}`;
        else if (fmt === 'page-only') numStr = `Page 1`;
        else if (fmt === 'hyphen') numStr = `- 1 -`;
        else if (fmt === 'num-only') numStr = `1`;

        ctx.save();
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "#334155";

        const pos = this.numPosSelect.value;
        if (pos === 'bottom-center') {
          ctx.textAlign = 'center';
          ctx.fillText(numStr, viewport.width / 2, viewport.height - 20);
        } else if (pos === 'bottom-right') {
          ctx.textAlign = 'right';
          ctx.fillText(numStr, viewport.width - 30, viewport.height - 20);
        } else if (pos === 'bottom-left') {
          ctx.textAlign = 'left';
          ctx.fillText(numStr, 30, viewport.height - 20);
        } else if (pos === 'top-right') {
          ctx.textAlign = 'right';
          ctx.fillText(numStr, viewport.width - 30, 30);
        } else if (pos === 'top-center') {
          ctx.textAlign = 'center';
          ctx.fillText(numStr, viewport.width / 2, 30);
        }
        ctx.restore();
      }

    } catch (e) {
      console.warn("Preview render error:", e);
    }
  },

  async applyAndDownload() {
    if (!this.pdfDocBytes) return;

    try {
      this.processBtn.disabled = true;
      this.processBtn.innerHTML = `<span>Processing Document...</span>`;

      await this.ensurePdfLib();
      const pdfDoc = await window.PDFLib.PDFDocument.load(this.pdfDocBytes.slice(0));
      const pages = pdfDoc.getPages();
      const totalPages = pages.length;

      const helveticaFont = await pdfDoc.embedFont(window.PDFLib.StandardFonts.HelveticaBold);

      if (this.activeMode === 'watermark') {
        const text = (this.textInput.value || "CONFIDENTIAL").trim();
        const angleDeg = parseInt(this.angleSelect.value);
        const opacity = parseInt(this.opacitySlider.value) / 100;
        const fontSize = parseInt(this.sizeSlider.value);

        const colorMap = {
          gray: window.PDFLib.rgb(0.2, 0.2, 0.2),
          red: window.PDFLib.rgb(0.85, 0.15, 0.15),
          blue: window.PDFLib.rgb(0.1, 0.3, 0.8),
          emerald: window.PDFLib.rgb(0.06, 0.72, 0.5)
        };
        const color = colorMap[this.colorSelect.value] || colorMap.gray;

        pages.forEach(page => {
          const { width, height } = page.getSize();
          const textWidth = helveticaFont.widthOfTextAtSize(text, fontSize);
          const textHeight = helveticaFont.heightAtSize(fontSize);

          page.drawText(text, {
            x: (width / 2) - (textWidth / 2) * Math.cos(angleDeg * (Math.PI / 180)),
            y: (height / 2) - (textHeight / 2) * Math.sin(angleDeg * (Math.PI / 180)),
            size: fontSize,
            font: helveticaFont,
            color: color,
            opacity: opacity,
            rotate: window.PDFLib.degrees(angleDeg)
          });
        });

      } else {
        // Page numbers
        const regularFont = await pdfDoc.embedFont(window.PDFLib.StandardFonts.Helvetica);
        const skipFirst = this.skipFirstToggle.checked;
        const fmt = this.numFormatSelect.value;
        const pos = this.numPosSelect.value;

        pages.forEach((page, idx) => {
          const pageNum = idx + 1;
          if (skipFirst && pageNum === 1) return;

          let numStr = `Page ${pageNum} of ${totalPages}`;
          if (fmt === 'slash') numStr = `${pageNum} / ${totalPages}`;
          else if (fmt === 'page-only') numStr = `Page ${pageNum}`;
          else if (fmt === 'hyphen') numStr = `- ${pageNum} -`;
          else if (fmt === 'num-only') numStr = `${pageNum}`;

          const { width, height } = page.getSize();
          const textWidth = regularFont.widthOfTextAtSize(numStr, 10);

          let posX = (width - textWidth) / 2;
          let posY = 20;

          if (pos === 'bottom-right') {
            posX = width - textWidth - 30;
            posY = 20;
          } else if (pos === 'bottom-left') {
            posX = 30;
            posY = 20;
          } else if (pos === 'top-right') {
            posX = width - textWidth - 30;
            posY = height - 30;
          } else if (pos === 'top-center') {
            posX = (width - textWidth) / 2;
            posY = height - 30;
          }

          page.drawText(numStr, {
            x: posX,
            y: posY,
            size: 10,
            font: regularFont,
            color: window.PDFLib.rgb(0.25, 0.25, 0.25)
          });
        });
      }

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const suffix = this.activeMode === 'watermark' ? 'watermarked' : 'numbered';
      const outputFilename = `${this.fileName}-${suffix}.pdf`;

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = outputFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.app.showToast(`Saved ${outputFilename}!`, "success");

    } catch (err) {
      console.error("PDF processing error:", err);
      this.app.showToast(`Processing failed: ${err.message}`, "error");
    } finally {
      this.processBtn.disabled = false;
      this.processBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Apply &amp; Download PDF</span>
      `;
    }
  },

  resetDoc() {
    this.pdfDocBytes = null;
    this.pdfjsDoc = null;
    this.fileName = "";
    this.dropzone.style.display = 'flex';
    this.clearBtn.style.display = 'none';
    this.canvasWrapper.style.display = 'none';
    this.placeholder.style.display = 'flex';
    this.processBtn.disabled = true;
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
    this.pdfDocBytes = null;
    this.pdfjsDoc = null;
  }
};
