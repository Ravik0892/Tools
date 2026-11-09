// OmniTool Hub - PDF Digital Signature Studio
// 100% Client-Side signature drawing, cursive webfont generation, image stamp upload, and PDF placement via pdf-lib.

import { escapeHtml } from './utils.js';

export default {
  id: "sign-pdf",
  name: "Sign PDF Digital Studio",

  pdfDocBytes: null,
  pdfLibDoc: null,
  pdfjsDoc: null,
  currentPageNum: 1,
  totalPages: 1,
  signatureDataUrl: null,
  signMode: "draw", // 'draw' | 'type' | 'upload'
  stampScale: 1.0,
  stampX: 100, // pt from left
  stampY: 100, // pt from bottom
  isDrawing: false,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Signature Designer & Controls (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">PDF Signature Studio</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Draw, type, or upload your signature and stamp it onto any PDF page.
              </p>
            </div>
            <button class="tool-btn secondary" id="sp-change-pdf-btn" style="font-size: 11px; padding: 4px 10px; display: none;">New Document</button>
          </div>

          <!-- Document Upload Dropzone (When no PDF loaded) -->
          <div id="sp-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px; margin-bottom: 14px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 44px; height: 44px; color: var(--accent-cyan); margin-bottom: 10px;">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M12 18v-6"></path>
              <path d="m9 15 3 3 3-3"></path>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drop PDF document here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              Contracts, agreements, letters, forms. 100% private in local memory.
            </div>
            <input type="file" id="sp-file-input" accept="application/pdf" style="display: none;">
          </div>

          <!-- Signature Creator Tabs (Draw / Type / Upload) -->
          <div id="sp-signer-deck" style="display: flex; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">CREATE SIGNATURE</span>
                <div style="display: flex; gap: 4px;">
                  <button class="tool-btn secondary sp-mode-btn active" data-mode="draw" style="font-size: 11px; padding: 4px 10px;">Draw</button>
                  <button class="tool-btn secondary sp-mode-btn" data-mode="type" style="font-size: 11px; padding: 4px 10px;">Type</button>
                  <button class="tool-btn secondary sp-mode-btn" data-mode="upload" style="font-size: 11px; padding: 4px 10px;">Upload Stamp</button>
                </div>
              </div>

              <!-- Mode 1: Draw Pad -->
              <div id="sp-draw-mode" class="sp-mode-view" style="display: flex; flex-direction: column; gap: 8px;">
                <div style="background: #ffffff; border-radius: 8px; border: 1px solid #cbd5e1; height: 130px; position: relative; overflow: hidden; touch-action: none;">
                  <canvas id="sp-pad-canvas" width="450" height="130" style="width: 100%; height: 100%; cursor: crosshair; display: block;"></canvas>
                  <div id="sp-pad-placeholder" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 12px; pointer-events: none; font-style: italic;">
                    Sign with mouse or touch here...
                  </div>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; gap: 6px; align-items: center;">
                    <span style="font-size: 11px; color: var(--text-muted);">Ink:</span>
                    <button class="sp-ink-btn" data-color="#0f172a" style="width: 18px; height: 18px; border-radius: 50%; background: #0f172a; border: 2px solid #00f2fe; cursor: pointer;"></button>
                    <button class="sp-ink-btn" data-color="#1d4ed8" style="width: 18px; height: 18px; border-radius: 50%; background: #1d4ed8; border: 2px solid transparent; cursor: pointer;"></button>
                    <button class="sp-ink-btn" data-color="#b91c1c" style="width: 18px; height: 18px; border-radius: 50%; background: #b91c1c; border: 2px solid transparent; cursor: pointer;"></button>
                  </div>
                  <button class="tool-btn secondary" id="sp-clear-pad" style="font-size: 11px; padding: 2px 8px;">Clear Ink</button>
                </div>
              </div>

              <!-- Mode 2: Type Signature -->
              <div id="sp-type-mode" class="sp-mode-view" style="display: none; flex-direction: column; gap: 10px;">
                <input type="text" id="sp-type-input" class="tool-input" placeholder="Type your full name..." style="padding: 8px 12px; font-size: 13px;">
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                  <div class="sp-cursive-card active" data-font="cursive-1" style="background: #fff; color: #0f172a; padding: 12px; border-radius: 6px; border: 2px solid var(--accent-cyan); font-family: 'Brush Script MT', 'Segoe Script', cursive; font-size: 20px; text-align: center; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    Signature 1
                  </div>
                  <div class="sp-cursive-card" data-font="cursive-2" style="background: #fff; color: #0f172a; padding: 12px; border-radius: 6px; border: 2px solid transparent; font-family: 'Lucida Handwriting', cursive; font-size: 18px; text-align: center; cursor: pointer; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                    Signature 2
                  </div>
                </div>
              </div>

              <!-- Mode 3: Upload Image Stamp -->
              <div id="sp-upload-mode" class="sp-mode-view" style="display: none; flex-direction: column; gap: 8px;">
                <div id="sp-stamp-dropzone" style="border: 1px dashed rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 16px; text-align: center; cursor: pointer; background: rgba(0, 0, 0, 0.2);">
                  <span style="font-size: 12px; color: var(--text-muted);">Click to upload PNG signature or company seal stamp</span>
                  <input type="file" id="sp-stamp-input" accept="image/png,image/jpeg" style="display: none;">
                </div>
              </div>
            </div>

            <!-- Page Selection & Stamp Size -->
            <div id="sp-placement-config" style="display: none; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; flex-direction: column; gap: 10px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">PLACEMENT OPTIONS</span>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <label style="display: flex; flex-direction: column; gap: 2px; font-size: 11px; color: var(--text-muted);">
                  Target Page
                  <select id="sp-page-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="1">Page 1</option>
                  </select>
                </label>

                <label style="display: flex; flex-direction: column; gap: 2px; font-size: 11px; color: var(--text-muted);">
                  Stamp Scale
                  <select id="sp-scale-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                    <option value="0.75">Compact (75%)</option>
                    <option value="1.0" selected>Normal (100%)</option>
                    <option value="1.25">Large (125%)</option>
                    <option value="1.5">Extra Large (150%)</option>
                  </select>
                </label>
              </div>

              <div style="font-size: 11px; color: var(--text-muted);">
                💡 <strong>How to position:</strong> Click anywhere on the document preview on the right to position your signature stamp!
              </div>
            </div>

            <!-- Save Signed PDF Button -->
            <button class="tool-btn primary" id="sp-apply-btn" disabled style="font-size: 14px; padding: 12px 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Sign &amp; Download PDF</span>
            </button>
          </div>
        </div>

        <!-- Document Preview & Interactive Stamp Board (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Interactive Page Preview</h3>
            <span id="sp-page-indicator" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Document Canvas Viewport with Stamp Placement Overlay -->
          <div id="sp-preview-viewport" style="flex: 1; min-height: 400px; max-height: 580px; background: #1e293b; border: 1px solid var(--border-color); border-radius: 10px; overflow: auto; position: relative; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <!-- Rendered PDF Page Canvas -->
            <div id="sp-page-canvas-wrapper" style="position: relative; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); display: none; cursor: crosshair;">
              <canvas id="sp-pdf-canvas" style="display: block; background: #fff;"></canvas>
              
              <!-- Draggable / Click-Positioned Stamp Preview Element -->
              <div id="sp-stamp-marker" style="display: none; position: absolute; border: 2px dashed #00f2fe; background: rgba(0, 242, 254, 0.15); border-radius: 4px; pointer-events: none; transition: transform 0.1s ease;">
                <img id="sp-stamp-preview-img" style="width: 100%; height: 100%; object-fit: contain;">
              </div>
            </div>

            <!-- Empty Document State -->
            <div id="sp-placeholder" style="display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--text-muted); text-align: center; padding: 30px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 52px; height: 52px; opacity: 0.4;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">No Document Loaded</div>
              <div style="font-size: 11px; max-width: 240px;">Upload a PDF to preview pages and stamp your signature.</div>
            </div>
          </div>
        </div>
      
        <!-- Dynamic Guide Card (Unified standard footer guide) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>QUICK GUIDE: DIGITAL PDF SIGNATURES</span>
            </div>
          </div>
          <div class="tool-guide-steps">

            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Upload Agreement or Contract</strong>: Drop your PDF into the secure signature studio with full zero-knowledge local execution.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Draw, Type, or Upload Signature</strong>: Create your signature using smooth canvas ink, custom calligraphic fonts, or pre-saved signature PNG.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Place & Finalize Document</strong>: Position and resize your signature stamp on any page, then click Sign & Download to export.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init(container, appInstance) {
    this.container = container;
    this.app = appInstance;

    // Elements
    this.dropzone = container.querySelector('#sp-dropzone');
    this.fileInput = container.querySelector('#sp-file-input');
    this.changePdfBtn = container.querySelector('#sp-change-pdf-btn');
    this.padCanvas = container.querySelector('#sp-pad-canvas');
    this.padPlaceholder = container.querySelector('#sp-pad-placeholder');
    this.clearPadBtn = container.querySelector('#sp-clear-pad');
    this.modeBtns = container.querySelectorAll('.sp-mode-btn');
    this.drawMode = container.querySelector('#sp-draw-mode');
    this.typeMode = container.querySelector('#sp-type-mode');
    this.uploadMode = container.querySelector('#sp-upload-mode');
    this.typeInput = container.querySelector('#sp-type-input');
    this.cursiveCards = container.querySelectorAll('.sp-cursive-card');
    this.stampDropzone = container.querySelector('#sp-stamp-dropzone');
    this.stampInput = container.querySelector('#sp-stamp-input');
    this.placementConfig = container.querySelector('#sp-placement-config');
    this.pageSelect = container.querySelector('#sp-page-select');
    this.scaleSelect = container.querySelector('#sp-scale-select');
    this.applyBtn = container.querySelector('#sp-apply-btn');
    this.pageIndicator = container.querySelector('#sp-page-indicator');
    this.previewViewport = container.querySelector('#sp-preview-viewport');
    this.pageCanvasWrapper = container.querySelector('#sp-page-canvas-wrapper');
    this.pdfCanvas = container.querySelector('#sp-pdf-canvas');
    this.stampMarker = container.querySelector('#sp-stamp-marker');
    this.stampPreviewImg = container.querySelector('#sp-stamp-preview-img');
    this.placeholder = container.querySelector('#sp-placeholder');

    this.inkColor = '#0f172a';
    this.padCtx = this.padCanvas.getContext('2d');
    this.padCtx.lineWidth = 2.5;
    this.padCtx.lineCap = 'round';
    this.padCtx.lineJoin = 'round';

    // File events
    this.dropzone.addEventListener('click', () => this.fileInput.click());
    this.changePdfBtn.addEventListener('click', () => this.fileInput.click());
    this.dropzone.addEventListener('dragover', (e) => { e.preventDefault(); this.dropzone.style.borderColor = 'var(--accent-cyan)'; });
    this.dropzone.addEventListener('dragleave', () => { this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)'; });
    this.dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)';
      if (e.dataTransfer.files.length > 0) this.loadPdfFile(e.dataTransfer.files[0]);
    });
    this.fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) this.loadPdfFile(e.target.files[0]);
    });

    // Signature Modes
    this.modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.modeBtns.forEach(b => { b.classList.remove('active'); b.style.color = ''; b.style.borderColor = ''; });
        btn.classList.add('active');
        btn.style.color = 'var(--accent-cyan)';
        btn.style.borderColor = 'var(--accent-cyan)';
        this.signMode = btn.dataset.mode;

        this.drawMode.style.display = this.signMode === 'draw' ? 'flex' : 'none';
        this.typeMode.style.display = this.signMode === 'type' ? 'flex' : 'none';
        this.uploadMode.style.display = this.signMode === 'upload' ? 'flex' : 'none';

        this.updateSignatureData();
      });
    });

    // Draw pad setup
    this.setupDrawPad();

    // Type signature setup
    this.typeInput.addEventListener('input', () => this.generateTypedSignature());
    this.cursiveCards.forEach(card => {
      card.addEventListener('click', () => {
        this.cursiveCards.forEach(c => { c.classList.remove('active'); c.style.borderColor = 'transparent'; });
        card.classList.add('active');
        card.style.borderColor = 'var(--accent-cyan)';
        this.selectedCursiveFont = card.dataset.font;
        this.generateTypedSignature();
      });
    });

    // Stamp upload setup
    this.stampDropzone.addEventListener('click', () => this.stampInput.click());
    this.stampInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.signatureDataUrl = reader.result;
          this.updateStampPreview();
        };
        reader.readAsDataURL(file);
      }
    });

    // Placement positioning by clicking on document canvas
    this.pageCanvasWrapper.addEventListener('click', (e) => this.onPageCanvasClick(e));

    this.pageSelect.addEventListener('change', (e) => {
      this.currentPageNum = parseInt(e.target.value);
      this.renderPdfPage(this.currentPageNum);
    });

    this.scaleSelect.addEventListener('change', (e) => {
      this.stampScale = parseFloat(e.target.value);
      this.updateStampMarkerDimensions();
    });

    this.applyBtn.addEventListener('click', () => this.embedSignatureAndDownload());

    // Ink color buttons
    container.querySelectorAll('.sp-ink-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.sp-ink-btn').forEach(b => b.style.borderColor = 'transparent');
        btn.style.borderColor = '#00f2fe';
        this.inkColor = btn.dataset.color;
      });
    });
  },

  setupDrawPad() {
    let drawing = false;
    let hasDrawn = false;

    const start = (x, y) => {
      drawing = true;
      this.padPlaceholder.style.display = 'none';
      this.padCtx.beginPath();
      this.padCtx.strokeStyle = this.inkColor;
      this.padCtx.moveTo(x, y);
    };

    const move = (x, y) => {
      if (!drawing) return;
      hasDrawn = true;
      this.padCtx.lineTo(x, y);
      this.padCtx.stroke();
    };

    const stop = () => {
      if (drawing) {
        drawing = false;
        if (hasDrawn) {
          this.signatureDataUrl = this.padCanvas.toDataURL('image/png');
          this.updateStampPreview();
        }
      }
    };

    this.padCanvas.addEventListener('mousedown', (e) => {
      const rect = this.padCanvas.getBoundingClientRect();
      start(e.clientX - rect.left, e.clientY - rect.top);
    });
    this.padCanvas.addEventListener('mousemove', (e) => {
      const rect = this.padCanvas.getBoundingClientRect();
      move(e.clientX - rect.left, e.clientY - rect.top);
    });
    window.addEventListener('mouseup', stop);

    // Touch support for tablets / mobile
    this.padCanvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const rect = this.padCanvas.getBoundingClientRect();
      const touch = e.touches[0];
      start(touch.clientX - rect.left, touch.clientY - rect.top);
    });
    this.padCanvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.padCanvas.getBoundingClientRect();
      const touch = e.touches[0];
      move(touch.clientX - rect.left, touch.clientY - rect.top);
    });
    this.padCanvas.addEventListener('touchend', stop);

    this.clearPadBtn.addEventListener('click', () => {
      this.padCtx.clearRect(0, 0, this.padCanvas.width, this.padCanvas.height);
      this.padPlaceholder.style.display = 'flex';
      this.signatureDataUrl = null;
      hasDrawn = false;
      this.stampMarker.style.display = 'none';
      this.checkReadyToSign();
    });
  },

  generateTypedSignature() {
    const text = (this.typeInput.value || "").trim();
    if (!text) {
      this.signatureDataUrl = null;
      this.stampMarker.style.display = 'none';
      this.checkReadyToSign();
      return;
    }

    // Render cursive text onto hidden canvas
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');

    const fontStyle = this.selectedCursiveFont === 'cursive-2' ? "38px 'Lucida Handwriting', cursive" : "44px 'Brush Script MT', 'Segoe Script', cursive";
    ctx.font = fontStyle;
    ctx.fillStyle = this.inkColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 200, 60);

    this.signatureDataUrl = canvas.toDataURL('image/png');
    this.updateStampPreview();
  },

  updateStampPreview() {
    if (!this.signatureDataUrl) {
      this.stampMarker.style.display = 'none';
      this.checkReadyToSign();
      return;
    }

    this.stampPreviewImg.src = this.signatureDataUrl;
    this.updateStampMarkerDimensions();
    if (this.pdfDocBytes) {
      this.stampMarker.style.display = 'block';
    }
    this.checkReadyToSign();
  },

  updateStampMarkerDimensions() {
    const baseW = 160 * this.stampScale;
    const baseH = 50 * this.stampScale;
    this.stampMarker.style.width = `${baseW}px`;
    this.stampMarker.style.height = `${baseH}px`;
  },

  onPageCanvasClick(e) {
    if (!this.signatureDataUrl) {
      this.app.showToast("Please create a signature first using the panel on the left.", "info");
      return;
    }

    const rect = this.pdfCanvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const stampW = 160 * this.stampScale;
    const stampH = 50 * this.stampScale;

    // Center stamp on click
    const left = Math.max(0, Math.min(rect.width - stampW, clickX - (stampW / 2)));
    const top = Math.max(0, Math.min(rect.height - stampH, clickY - (stampH / 2)));

    this.stampMarker.style.left = `${left}px`;
    this.stampMarker.style.top = `${top}px`;
    this.stampMarker.style.display = 'block';

    // Store relative coordinates for pdf-lib placement
    this.stampRelativeX = left / rect.width;
    this.stampRelativeY = (rect.height - top - stampH) / rect.height; // PDF coordinates start bottom-left

    this.checkReadyToSign();
  },

  async loadPdfFile(file) {
    if (file.type !== 'application/pdf') {
      this.app.showToast("Please select a PDF document.", "warning");
      return;
    }

    try {
      this.pdfDocBytes = await file.arrayBuffer();
      this.fileName = file.name.replace(/\.[^/.]+$/, "");

      // Load PDF.js for crisp page rendering
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
      this.changePdfBtn.style.display = 'inline-block';
      this.placementConfig.style.display = 'flex';
      this.placeholder.style.display = 'none';
      this.pageCanvasWrapper.style.display = 'block';

      this.currentPageNum = 1;
      await this.renderPdfPage(1);

      this.app.showToast(`Loaded "${file.name}" (${this.totalPages} pages)`, "success");
      this.checkReadyToSign();

    } catch (err) {
      console.error("PDF load error:", err);
      this.app.showToast(`Failed to open PDF: ${err.message}`, "error");
    }
  },

  async renderPdfPage(pageNum) {
    if (!this.pdfjsDoc) return;

    this.pageIndicator.textContent = `Page ${pageNum} of ${this.totalPages}`;
    const page = await this.pdfjsDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.2 });

    this.pdfCanvas.width = viewport.width;
    this.pdfCanvas.height = viewport.height;
    const ctx = this.pdfCanvas.getContext('2d');

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    await page.render(renderContext).promise;

    // Reposition marker if set
    if (this.stampRelativeX !== undefined && this.stampMarker.style.display !== 'none') {
      const stampW = 160 * this.stampScale;
      const stampH = 50 * this.stampScale;
      this.stampMarker.style.left = `${this.stampRelativeX * viewport.width}px`;
      this.stampMarker.style.top = `${viewport.height - (this.stampRelativeY * viewport.height) - stampH}px`;
    }
  },

  checkReadyToSign() {
    const isReady = this.pdfDocBytes && this.signatureDataUrl;
    this.applyBtn.disabled = !isReady;
  },

  async embedSignatureAndDownload() {
    if (!this.pdfDocBytes || !this.signatureDataUrl) return;

    try {
      this.applyBtn.disabled = true;
      this.applyBtn.innerHTML = `<span>Stamping Signature...</span>`;

      // Load PDF-Lib
      await this.ensurePdfLib();
      const pdfDoc = await window.PDFLib.PDFDocument.load(this.pdfDocBytes.slice(0));
      const pages = pdfDoc.getPages();
      const targetPage = pages[this.currentPageNum - 1];
      const { width, height } = targetPage.getSize();

      // Embed signature image
      const sigImageBytes = await fetch(this.signatureDataUrl).then(r => r.arrayBuffer());
      const sigImage = await pdfDoc.embedPng(sigImageBytes);

      const stampWidth = (160 * this.stampScale) * (width / this.pdfCanvas.width);
      const stampHeight = (50 * this.stampScale) * (height / this.pdfCanvas.height);

      const posX = (this.stampRelativeX !== undefined ? this.stampRelativeX : 0.1) * width;
      const posY = (this.stampRelativeY !== undefined ? this.stampRelativeY : 0.1) * height;

      targetPage.drawImage(sigImage, {
        x: posX,
        y: posY,
        width: stampWidth,
        height: stampHeight
      });

      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const signedFilename = `${this.fileName || "document"}-signed.pdf`;

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = signedFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.app.showToast(`Signed document downloaded: ${signedFilename}!`, "success");

    } catch (err) {
      console.error("Signature embedding error:", err);
      this.app.showToast(`Failed to stamp signature: ${err.message}`, "error");
    } finally {
      this.applyBtn.disabled = false;
      this.applyBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Sign &amp; Download PDF</span>
      `;
    }
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
    this.pdfDocBytes = null;
    this.pdfjsDoc = null;
    this.signatureDataUrl = null;
  }
};
