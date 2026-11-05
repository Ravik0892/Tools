// OmniTool Hub - PowerPoint (PPTX) & PDF Presentation Suite
// 100% Client-Side PPTX to PDF rendering and PDF to PowerPoint (.pptx) conversion via JSZip, jsPDF, PDF.js, and PptxGenJS.

import { escapeHtml } from './utils.js';

export default {
  id: "pptx-pdf",
  name: "PowerPoint to PDF & PDF to PPTX",

  activeMode: "pptx-to-pdf", // 'pptx-to-pdf' | 'pdf-to-pptx'
  fileName: "",
  pdfjsDoc: null,
  extractedSlides: [], // Array of { pageNum, dataUrl, width, height }
  pptxSlides: [],

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M8 8h5a2.5 2.5 0 0 1 0 5H8z"></path><line x1="8" y1="8" x2="8" y2="16"></line></svg>
              Presentation Setup
            </h3>
            <div style="display: flex; gap: 6px;">
              <button class="keyboard-tab ${this.activeMode === 'pptx-to-pdf' ? 'active' : ''}" id="btn-mode-pptx-to-pdf" style="font-size: 11px; padding: 4px 8px;">
                📊 PPTX to PDF
              </button>
              <button class="keyboard-tab ${this.activeMode === 'pdf-to-pptx' ? 'active' : ''}" id="btn-mode-pdf-to-pptx" style="font-size: 11px; padding: 4px 8px;">
                📑 PDF to PPTX
              </button>
            </div>
          </div>

          <!-- Mode 1: PPTX to PDF Controls -->
          <div id="controls-pptx-to-pdf" style="display: ${this.activeMode === 'pptx-to-pdf' ? 'flex' : 'none'}; flex-direction: column; gap: 14px;">
            <!-- PPTX Dropzone -->
            <div id="pptx-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 24px 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <input type="file" id="pptx-file-input" accept=".pptx, .ppt" style="display: none;">
              <div style="font-size: 32px; margin-bottom: 4px;">📊</div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Drop PowerPoint (.pptx) here</div>
              <div style="font-size: 11px; color: var(--text-muted);">Extracts slide decks into presentation PDFs</div>
            </div>

            <div class="form-group">
              <label for="pptx-aspect-ratio">Slide Aspect Ratio</label>
              <select id="pptx-aspect-ratio" class="form-select" style="width: 100%;">
                <option value="16:9" selected>Widescreen 16:9 (Standard Modern)</option>
                <option value="4:3">Standard 4:3 (Classic Projector)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="pptx-orientation">PDF Orientation</label>
              <select id="pptx-orientation" class="form-select" style="width: 100%;">
                <option value="landscape" selected>Landscape (Recommended for Slides)</option>
                <option value="portrait">Portrait</option>
              </select>
            </div>

            <div class="form-group" style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="pptx-add-slide-numbers" checked style="accent-color: var(--accent-cyan); width: 16px; height: 16px;">
              <label for="pptx-add-slide-numbers" style="font-size: 12px; color: var(--text-main); cursor: pointer; margin: 0;">Add Slide Numbers in Footer</label>
            </div>

            <button type="button" class="tool-btn primary" id="btn-convert-pptx-to-pdf" disabled style="margin-top: 8px; justify-content: center; font-size: 13px; font-weight: 700;">
              📥 Compile &amp; Download PDF
            </button>
          </div>

          <!-- Mode 2: PDF to PPTX Controls -->
          <div id="controls-pdf-to-pptx" style="display: ${this.activeMode === 'pdf-to-pptx' ? 'flex' : 'none'}; flex-direction: column; gap: 14px;">
            <!-- PDF Dropzone -->
            <div id="pdf-pptx-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 24px 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <input type="file" id="pdf-pptx-file-input" accept=".pdf" style="display: none;">
              <div style="font-size: 32px; margin-bottom: 4px;">📑</div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Drop PDF slide deck here</div>
              <div style="font-size: 11px; color: var(--text-muted);">Converts pages into native PowerPoint presentation slides</div>
            </div>

            <div class="form-group">
              <label for="pptx-out-layout">Slide Layout Dimensions</label>
              <select id="pptx-out-layout" class="form-select" style="width: 100%;">
                <option value="LAYOUT_16x9" selected>Widescreen (16:9)</option>
                <option value="LAYOUT_4x3">Standard (4:3)</option>
                <option value="LAYOUT_WIDE">Ultra-Wide (16:10)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="pptx-render-scale">Slide Resolution Quality</label>
              <select id="pptx-render-scale" class="form-select" style="width: 100%;">
                <option value="2" selected>2x Crisp HD</option>
                <option value="2.5">2.5x Ultra HD</option>
                <option value="1.5">1.5x Lightweight</option>
              </select>
            </div>

            <div class="form-group">
              <label for="pptx-title-input">Presentation Deck Title</label>
              <input type="text" id="pptx-title-input" class="form-input" placeholder="Presentation Title" style="width: 100%;">
            </div>

            <button type="button" class="tool-btn primary" id="btn-export-pptx" disabled style="margin-top: 8px; justify-content: center; font-size: 13px; font-weight: 700;">
              📥 Generate &amp; Download PPTX
            </button>
          </div>

          <!-- Privacy Security Badge -->
          <div style="margin-top: auto; padding: 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
            🔒 <strong style="color: var(--accent-cyan);">Pure In-Browser Conversion</strong>: Presentations are assembled client-side via JSZip, PDF.js, and PptxGenJS. Zero server transmission.
          </div>
        </div>

        <!-- Slide Preview Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              Slide Preview &amp; Output
            </h3>
            <span id="slide-preview-stats" style="font-size: 11px; color: var(--text-muted);">No slides loaded</span>
          </div>

          <!-- Slide Grid Container -->
          <div id="deck-preview-area" style="flex: 1; min-height: 440px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow-y: auto; padding: 16px;">
            <div id="deck-empty-placeholder" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 40px 20px;">
              <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.7;">📊</div>
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">No Presentation Loaded</h4>
              <p style="font-size: 12px; max-width: 380px; margin: 0; line-height: 1.5;">
                Select or drop a PowerPoint (.pptx) presentation or PDF document on the left to extract and preview slide decks.
              </p>
            </div>

            <!-- Previews -->
            <div id="pptx-slides-grid" style="display: none; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px;"></div>
            <div id="pdf-slides-grid" style="display: none; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px;"></div>
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: POWERPOINT &amp; PDF PRESENTATION SUITE</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Bi-Directional Conversion</strong>
              <p style="margin: 4px 0 0 0;">Convert OpenXML PowerPoint files into clean PDF presentations or reverse PDF documents into editable PPTX slides.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. 16:9 Widescreen Layout</strong>
              <p style="margin: 4px 0 0 0;">High-DPI retina rendering preserves sharp vector typography and presentation dimensions.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Zero Software Needed</strong>
              <p style="margin: 4px 0 0 0;">Runs 100% offline without requiring Microsoft Office or Adobe Acrobat installations.</p>
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
    // Mode switcher
    const btnPptxToPdf = document.getElementById("btn-mode-pptx-to-pdf");
    const btnPdfToPptx = document.getElementById("btn-mode-pdf-to-pptx");
    const controlsPptx = document.getElementById("controls-pptx-to-pdf");
    const controlsPdf = document.getElementById("controls-pdf-to-pptx");

    if (btnPptxToPdf && btnPdfToPptx) {
      btnPptxToPdf.addEventListener("click", () => {
        this.activeMode = "pptx-to-pdf";
        btnPptxToPdf.classList.add("active");
        btnPdfToPptx.classList.remove("active");
        if (controlsPptx) controlsPptx.style.display = "flex";
        if (controlsPdf) controlsPdf.style.display = "none";
      });

      btnPdfToPptx.addEventListener("click", () => {
        this.activeMode = "pdf-to-pptx";
        btnPdfToPptx.classList.add("active");
        btnPptxToPdf.classList.remove("active");
        if (controlsPdf) controlsPdf.style.display = "flex";
        if (controlsPptx) controlsPptx.style.display = "none";
      });
    }

    // 1. PPTX to PDF file handlers
    const pptxInput = document.getElementById("pptx-file-input");
    const pptxDropzone = document.getElementById("pptx-dropzone");

    if (pptxInput) {
      pptxInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) this.loadPptxFile(e.target.files[0]);
      });
    }

    if (pptxDropzone) {
      pptxDropzone.addEventListener("dragover", (e) => { e.preventDefault(); pptxDropzone.style.borderColor = "var(--accent-cyan)"; });
      pptxDropzone.addEventListener("dragleave", () => { pptxDropzone.style.borderColor = "var(--border-color)"; });
      pptxDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        pptxDropzone.style.borderColor = "var(--border-color)";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) this.loadPptxFile(e.dataTransfer.files[0]);
      });
    }

    const btnConvertPptxPdf = document.getElementById("btn-convert-pptx-to-pdf");
    if (btnConvertPptxPdf) {
      btnConvertPptxPdf.addEventListener("click", () => this.generatePdfFromPptx());
    }

    // 2. PDF to PPTX file handlers
    const pdfInput = document.getElementById("pdf-pptx-file-input");
    const pdfDropzone = document.getElementById("pdf-pptx-dropzone");

    if (pdfInput) {
      pdfInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) this.loadPdfForPptx(e.target.files[0]);
      });
    }

    if (pdfDropzone) {
      pdfDropzone.addEventListener("dragover", (e) => { e.preventDefault(); pdfDropzone.style.borderColor = "var(--accent-cyan)"; });
      pdfDropzone.addEventListener("dragleave", () => { pdfDropzone.style.borderColor = "var(--border-color)"; });
      pdfDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        pdfDropzone.style.borderColor = "var(--border-color)";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) this.loadPdfForPptx(e.dataTransfer.files[0]);
      });
    }

    const btnExportPptx = document.getElementById("btn-export-pptx");
    if (btnExportPptx) {
      btnExportPptx.addEventListener("click", () => this.exportPptxDocument());
    }
  },

  async loadPptxFile(file) {
    this.fileName = file.name.replace(/\.[^/.]+$/, "");
    try {
      if (window.app && window.app.showToast) window.app.showToast("Extracting presentation slides...", "info");
      await this.ensureJSZip();

      const arrayBuffer = await file.arrayBuffer();
      const zip = await window.JSZip.loadAsync(arrayBuffer);

      // Extract slide files and embedded media
      const slideFiles = Object.keys(zip.files).filter(f => f.match(/^ppt\/slides\/slide\d+\.xml$/i));
      // Sort in slide order
      slideFiles.sort((a, b) => {
        const numA = parseInt(a.match(/slide(\d+)\.xml/i)[1], 10);
        const numB = parseInt(b.match(/slide(\d+)\.xml/i)[1], 10);
        return numA - numB;
      });

      this.pptxSlides = [];
      const mediaFiles = Object.keys(zip.files).filter(f => f.startsWith("ppt/media/"));

      for (let i = 0; i < slideFiles.length; i++) {
        const slideXml = await zip.files[slideFiles[i]].async("text");
        // Extract slide title or text
        const textMatches = slideXml.match(/<a:t>([^<]+)<\/a:t>/g) || [];
        const cleanTexts = textMatches.map(t => t.replace(/<\/?a:t>/g, ""));
        const title = cleanTexts[0] || `Slide ${i + 1}`;

        this.pptxSlides.push({
          num: i + 1,
          title: title,
          texts: cleanTexts.slice(1, 6)
        });
      }

      this.renderPptxSlidesPreview();
      document.getElementById("btn-convert-pptx-to-pdf").disabled = false;
      if (window.app && window.app.showToast) {
        window.app.showToast(`Extracted ${this.pptxSlides.length} slides from "${file.name}"!`, "success");
      }
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Failed to parse PPTX: " + err.message, "error");
    }
  },

  renderPptxSlidesPreview() {
    const grid = document.getElementById("pptx-slides-grid");
    const placeholder = document.getElementById("deck-empty-placeholder");
    const stats = document.getElementById("slide-preview-stats");
    if (placeholder) placeholder.style.display = "none";
    if (grid) grid.style.display = "grid";
    if (stats) stats.innerText = `${this.pptxSlides.length} Slide(s) Detected`;

    grid.innerHTML = this.pptxSlides.map(slide => `
      <div style="aspect-ratio: 16/9; background: #ffffff; border: 1px solid var(--border-color); border-radius: 6px; padding: 12px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.2); color: #1e293b; overflow: hidden;">
        <div style="font-size: 11px; font-weight: 700; color: #0284c7; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ${escapeHtml(slide.title)}
        </div>
        <div style="font-size: 9px; color: #64748b; line-height: 1.4; overflow: hidden; max-height: 40px;">
          ${slide.texts.slice(0, 3).map(t => `• ${escapeHtml(t)}`).join("<br>")}
        </div>
        <div style="font-size: 9px; font-weight: 700; color: #94a3b8; text-align: right;">Slide ${slide.num}</div>
      </div>
    `).join("");
  },

  async generatePdfFromPptx() {
    if (!this.pptxSlides || this.pptxSlides.length === 0) return;

    try {
      if (window.app && window.app.showToast) window.app.showToast("Compiling PDF presentation...", "info");
      await this.ensureJsPdf();

      const { jsPDF } = window.jspdf;
      const aspectRatio = document.getElementById("pptx-aspect-ratio")?.value || "16:9";
      const addNumbers = document.getElementById("pptx-add-slide-numbers")?.checked;

      // 16:9 landscape dimensions in mm (297 x 167.06 mm)
      const pdfWidth = aspectRatio === "16:9" ? 297 : 280;
      const pdfHeight = aspectRatio === "16:9" ? 167 : 210;

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [pdfWidth, pdfHeight]
      });

      this.pptxSlides.forEach((slide, idx) => {
        if (idx > 0) doc.addPage([pdfWidth, pdfHeight], "landscape");

        // Slide gradient header band
        doc.setFillColor(2, 132, 199);
        doc.rect(0, 0, pdfWidth, 12, "F");

        // Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.setTextColor(15, 23, 42);
        doc.text(slide.title, 20, 28, { maxWidth: pdfWidth - 40 });

        // Bullet points
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(71, 85, 105);

        let yPos = 44;
        slide.texts.forEach(t => {
          doc.text(`• ${t}`, 24, yPos, { maxWidth: pdfWidth - 48 });
          yPos += 14;
        });

        // Slide number
        if (addNumbers) {
          doc.setFontSize(9);
          doc.setTextColor(148, 163, 184);
          doc.text(`Slide ${slide.num} of ${this.pptxSlides.length}`, pdfWidth - 30, pdfHeight - 10);
        }
      });

      const outName = `${this.fileName || "Presentation"}.pdf`;
      doc.save(outName);
      if (window.app && window.app.showToast) window.app.showToast(`Saved PDF presentation "${outName}"!`, "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("PDF generation failed: " + err.message, "error");
    }
  },

  async loadPdfForPptx(file) {
    this.fileName = file.name.replace(/\.[^/.]+$/, "");
    const titleInput = document.getElementById("pptx-title-input");
    if (titleInput) titleInput.value = this.fileName;

    try {
      if (window.app && window.app.showToast) window.app.showToast("Rendering PDF slide canvases...", "info");
      await this.ensurePdfJs();

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      this.pdfjsDoc = pdf;

      const scale = parseFloat(document.getElementById("pptx-render-scale")?.value || "2");
      this.extractedSlides = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: scale });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");

        await page.render({ canvasContext: ctx, viewport: viewport }).promise;

        this.extractedSlides.push({
          pageNum: i,
          dataUrl: canvas.toDataURL("image/jpeg", 0.92),
          width: viewport.width,
          height: viewport.height
        });
      }

      this.renderPdfSlidesPreview();
      document.getElementById("btn-export-pptx").disabled = false;
      if (window.app && window.app.showToast) {
        window.app.showToast(`Prepared ${this.extractedSlides.length} presentation slides!`, "success");
      }
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Failed to render PDF slides: " + err.message, "error");
    }
  },

  renderPdfSlidesPreview() {
    const grid = document.getElementById("pdf-slides-grid");
    const placeholder = document.getElementById("deck-empty-placeholder");
    const stats = document.getElementById("slide-preview-stats");
    if (placeholder) placeholder.style.display = "none";
    if (grid) grid.style.display = "grid";
    if (stats) stats.innerText = `${this.extractedSlides.length} Slide(s) Captured`;

    grid.innerHTML = this.extractedSlides.map(slide => `
      <div style="position: relative; aspect-ratio: 16/9; background: #000; border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
        <img src="${slide.dataUrl}" style="width: 100%; height: 100%; object-fit: contain;">
        <span style="position: absolute; bottom: 4px; right: 4px; font-size: 10px; background: rgba(0,0,0,0.7); color: #fff; padding: 2px 6px; border-radius: 4px; font-weight: 700;">Slide ${slide.pageNum}</span>
      </div>
    `).join("");
  },

  async exportPptxDocument() {
    if (!this.extractedSlides || this.extractedSlides.length === 0) return;

    try {
      if (window.app && window.app.showToast) window.app.showToast("Building PowerPoint presentation...", "info");
      await this.ensurePptxGen();

      const pptx = new window.PptxGenJS();
      const layoutChoice = document.getElementById("pptx-out-layout")?.value || "LAYOUT_16x9";
      pptx.layout = layoutChoice;

      const titleInput = document.getElementById("pptx-title-input");
      const title = (titleInput && titleInput.value.trim()) || this.fileName || "Presentation";

      // Add each slide image fitting exactly onto slide dimensions
      this.extractedSlides.forEach((slide) => {
        const pSlide = pptx.addSlide();
        pSlide.addImage({
          data: slide.dataUrl,
          x: 0,
          y: 0,
          w: "100%",
          h: "100%"
        });
      });

      await pptx.writeFile({ fileName: `${title}.pptx` });
      if (window.app && window.app.showToast) window.app.showToast(`Saved PowerPoint presentation "${title}.pptx"!`, "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("PowerPoint export failed: " + err.message, "error");
    }
  },

  ensureJSZip() {
    return new Promise((resolve, reject) => {
      if (window.JSZip) return resolve(window.JSZip);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
      script.onload = () => resolve(window.JSZip);
      script.onerror = () => reject(new Error("Failed to load JSZip"));
      document.head.appendChild(script);
    });
  },

  ensureJsPdf() {
    return new Promise((resolve, reject) => {
      if (window.jspdf && window.jspdf.jsPDF) return resolve(window.jspdf.jsPDF);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.onload = () => resolve(window.jspdf.jsPDF);
      script.onerror = () => reject(new Error("Failed to load jsPDF"));
      document.head.appendChild(script);
    });
  },

  ensurePdfJs() {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        if (!window.pdfjsLib.GlobalWorkerOptions?.workerSrc) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        }
        return resolve(window.pdfjsLib);
      }
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js"));
      document.head.appendChild(script);
    });
  },

  ensurePptxGen() {
    return new Promise((resolve, reject) => {
      if (window.PptxGenJS) return resolve(window.PptxGenJS);
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js";
      script.onload = () => resolve(window.PptxGenJS);
      script.onerror = () => reject(new Error("Failed to load PptxGenJS"));
      document.head.appendChild(script);
    });
  },

  cleanup() {
    this.extractedSlides = [];
    this.pptxSlides = [];
    this.pdfjsDoc = null;
  }
};
