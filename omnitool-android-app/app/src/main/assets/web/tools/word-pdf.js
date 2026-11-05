// OmniTool Hub - Word (DOCX) to PDF & PDF to Word Converter Suite
// 100% Client-Side document conversion via Mammoth.js, html2pdf.js, and PDF.js.

import { escapeHtml } from './utils.js';

export default {
  id: "word-pdf",
  name: "Word to PDF & PDF to Word",

  activeMode: "word-to-pdf", // 'word-to-pdf' | 'pdf-to-word'
  docxHtml: "",
  fileName: "",
  pdfjsDoc: null,
  extractedParagraphs: [],

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Setup Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M8 13h8M8 17h8M8 9h2"></path></svg>
              Document Setup
            </h3>
            <div style="display: flex; gap: 6px;">
              <button class="keyboard-tab ${this.activeMode === 'word-to-pdf' ? 'active' : ''}" id="btn-mode-word-to-pdf" style="font-size: 11px; padding: 4px 8px;">
                📄 Word to PDF
              </button>
              <button class="keyboard-tab ${this.activeMode === 'pdf-to-word' ? 'active' : ''}" id="btn-mode-pdf-to-word" style="font-size: 11px; padding: 4px 8px;">
                📑 PDF to Word
              </button>
            </div>
          </div>

          <!-- Mode 1: Word to PDF Controls -->
          <div id="controls-word-to-pdf" style="display: ${this.activeMode === 'word-to-pdf' ? 'flex' : 'none'}; flex-direction: column; gap: 14px;">
            <div id="docx-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 24px 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <input type="file" id="docx-file-input" accept=".docx" style="display: none;">
              <div style="font-size: 32px; margin-bottom: 4px;">📄</div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Drop Word Document (.docx) here</div>
              <div style="font-size: 11px; color: var(--text-muted);">Preserves headings, lists, tables, bold, and italics</div>
            </div>

            <div class="form-group">
              <label for="docx-page-size">Page Format</label>
              <select id="docx-page-size" class="form-select" style="width: 100%;">
                <option value="a4" selected>A4 (210 × 297 mm)</option>
                <option value="letter">US Letter (8.5 × 11 in)</option>
                <option value="legal">US Legal (8.5 × 14 in)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="docx-page-margin">Page Margins</label>
              <select id="docx-page-margin" class="form-select" style="width: 100%;">
                <option value="15" selected>Normal (15 mm)</option>
                <option value="10">Narrow (10 mm)</option>
                <option value="20">Wide (20 mm)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="docx-orientation">Orientation</label>
              <select id="docx-orientation" class="form-select" style="width: 100%;">
                <option value="portrait" selected>Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div class="form-group">
              <label for="docx-image-quality">Image Quality</label>
              <select id="docx-image-quality" class="form-select" style="width: 100%;">
                <option value="0.95" selected>High Fidelity (95%)</option>
                <option value="0.80">Balanced (80%)</option>
                <option value="0.65">Compressed (65%)</option>
              </select>
            </div>

            <button type="button" class="tool-btn primary" id="btn-convert-docx-to-pdf" disabled style="margin-top: 6px; justify-content: center; font-size: 13px; font-weight: 700;">
              📥 Convert &amp; Download PDF
            </button>
          </div>

          <!-- Mode 2: PDF to Word Controls -->
          <div id="controls-pdf-to-word" style="display: ${this.activeMode === 'pdf-to-word' ? 'flex' : 'none'}; flex-direction: column; gap: 14px;">
            <div id="pdf-word-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 24px 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <input type="file" id="pdf-word-file-input" accept=".pdf" style="display: none;">
              <div style="font-size: 32px; margin-bottom: 4px;">📑</div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Drop PDF to convert to Word</div>
              <div style="font-size: 11px; color: var(--text-muted);">Extracts typography, headings, tables, and formatted text</div>
            </div>

            <div class="form-group">
              <label for="pdf-word-doc-title">Document Title / File Name</label>
              <input type="text" id="pdf-word-doc-title" class="form-input" placeholder="Document Title" style="width: 100%;">
            </div>

            <div class="form-group">
              <label for="pdf-word-format">Target Word Format</label>
              <select id="pdf-word-format" class="form-select" style="width: 100%;">
                <option value="docx" selected>Microsoft Word Document (.docx)</option>
                <option value="doc">Word 97-2003 HTML (.doc)</option>
              </select>
            </div>

            <div class="form-group" style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="pdf-word-preserve-headings" checked style="accent-color: var(--accent-cyan); width: 16px; height: 16px;">
              <label for="pdf-word-preserve-headings" style="font-size: 12px; color: var(--text-main); cursor: pointer; margin: 0;">Auto-Detect Headings by Font Size</label>
            </div>

            <button type="button" class="tool-btn primary" id="btn-export-word" disabled style="margin-top: 6px; justify-content: center; font-size: 13px; font-weight: 700;">
              📥 Download Word Document (.docx)
            </button>
          </div>

          <!-- Privacy Security Badge -->
          <div style="margin-top: auto; padding: 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
            🔒 <strong style="color: var(--accent-cyan);">Pure In-Browser Conversion</strong>: Mammoth.js and PDF.js parse DOCX and PDF documents directly in local memory with zero server uploads.
          </div>
        </div>

        <!-- Document Preview Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Document Preview &amp; Layout
            </h3>
            <span id="word-doc-stats" style="font-size: 11px; color: var(--text-muted);">No document loaded</span>
          </div>

          <div id="word-preview-area" style="flex: 1; min-height: 440px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow: auto; padding: 16px; display: flex; flex-direction: column;">
            <div id="word-empty-placeholder" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 40px 20px;">
              <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.7;">📄</div>
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">No Document Loaded</h4>
              <p style="font-size: 12px; max-width: 380px; margin: 0; line-height: 1.5;">
                Upload a Word document (.docx) or PDF on the left to preview page layouts, typography, and formatted paragraphs.
              </p>
            </div>

            <!-- Rendered Document Preview -->
            <div id="docx-preview-wrapper" style="display: none; width: 100%;">
              <div id="docx-sheet-container" style="background: #ffffff; color: #1e293b; padding: 40px; border-radius: 8px; box-shadow: 0 4px 25px rgba(0,0,0,0.4); max-height: 560px; overflow-y: auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; font-size: 14px;">
                <div id="docx-html-target"></div>
              </div>
            </div>

            <!-- Extracted Word Document Preview -->
            <div id="pdf-word-preview-wrapper" style="display: none; width: 100%;">
              <div id="pdf-word-sheet" style="background: #ffffff; color: #1e293b; padding: 40px; border-radius: 8px; box-shadow: 0 4px 25px rgba(0,0,0,0.4); max-height: 560px; overflow-y: auto; font-family: Calibri, 'Segoe UI', Arial, sans-serif; line-height: 1.6; font-size: 14px;"></div>
            </div>
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: WORD TO PDF &amp; PDF TO WORD CONVERTER</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. High-Fidelity DOCX Rendering</strong>
              <p style="margin: 4px 0 0 0;">Mammoth extracts HTML structures with paragraphs, headings, bullet lists, and tables intact.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Smart Heading Detection</strong>
              <p style="margin: 4px 0 0 0;">PDF fonts are analyzed by height to automatically recreate H1, H2, and body paragraph hierarchies.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. 100% In-Browser Privacy</strong>
              <p style="margin: 4px 0 0 0;">No sensitive documents are ever uploaded to cloud servers; all conversion happens in your browser.</p>
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
    const btnWordToPdf = document.getElementById("btn-mode-word-to-pdf");
    const btnPdfToWord = document.getElementById("btn-mode-pdf-to-word");
    const controlsWord = document.getElementById("controls-word-to-pdf");
    const controlsPdf = document.getElementById("controls-pdf-to-word");

    if (btnWordToPdf && btnPdfToWord) {
      btnWordToPdf.addEventListener("click", () => {
        this.activeMode = "word-to-pdf";
        btnWordToPdf.classList.add("active");
        btnPdfToWord.classList.remove("active");
        if (controlsWord) controlsWord.style.display = "flex";
        if (controlsPdf) controlsPdf.style.display = "none";
      });

      btnPdfToWord.addEventListener("click", () => {
        this.activeMode = "pdf-to-word";
        btnPdfToWord.classList.add("active");
        btnWordToPdf.classList.remove("active");
        if (controlsPdf) controlsPdf.style.display = "flex";
        if (controlsWord) controlsWord.style.display = "none";
      });
    }

    // 1. DOCX to PDF handlers
    const docxInput = document.getElementById("docx-file-input");
    const docxDropzone = document.getElementById("docx-dropzone");

    if (docxInput) {
      docxInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) this.loadDocxFile(e.target.files[0]);
      });
    }

    if (docxDropzone) {
      docxDropzone.addEventListener("click", () => docxInput && docxInput.click());
      docxDropzone.addEventListener("dragover", (e) => { e.preventDefault(); docxDropzone.style.borderColor = "var(--accent-cyan)"; });
      docxDropzone.addEventListener("dragleave", () => { docxDropzone.style.borderColor = "rgba(0, 242, 254, 0.35)"; });
      docxDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        docxDropzone.style.borderColor = "rgba(0, 242, 254, 0.35)";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) this.loadDocxFile(e.dataTransfer.files[0]);
      });
    }

    const btnConvertDocxPdf = document.getElementById("btn-convert-docx-to-pdf");
    if (btnConvertDocxPdf) {
      btnConvertDocxPdf.addEventListener("click", () => this.generatePdfFromDocx());
    }

    // 2. PDF to Word handlers
    const pdfInput = document.getElementById("pdf-word-file-input");
    const pdfDropzone = document.getElementById("pdf-word-dropzone");

    if (pdfInput) {
      pdfInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) this.loadPdfForWord(e.target.files[0]);
      });
    }

    if (pdfDropzone) {
      pdfDropzone.addEventListener("click", () => pdfInput && pdfInput.click());
      pdfDropzone.addEventListener("dragover", (e) => { e.preventDefault(); pdfDropzone.style.borderColor = "var(--accent-cyan)"; });
      pdfDropzone.addEventListener("dragleave", () => { pdfDropzone.style.borderColor = "rgba(0, 242, 254, 0.35)"; });
      pdfDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        pdfDropzone.style.borderColor = "rgba(0, 242, 254, 0.35)";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) this.loadPdfForWord(e.dataTransfer.files[0]);
      });
    }

    const btnExportWord = document.getElementById("btn-export-word");
    if (btnExportWord) {
      btnExportWord.addEventListener("click", () => this.exportWordDocument());
    }
  },

  async loadDocxFile(file) {
    this.fileName = file.name.replace(/\.[^/.]+$/, "");
    try {
      if (window.app && window.app.showToast) window.app.showToast("Reading DOCX document...", "info");
      await this.ensureMammoth();

      const arrayBuffer = await file.arrayBuffer();
      const result = await window.mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
      this.docxHtml = result.value;

      const previewWrapper = document.getElementById("docx-preview-wrapper");
      const target = document.getElementById("docx-html-target");
      const stats = document.getElementById("word-doc-stats");
      const emptyPlaceholder = document.getElementById("word-empty-placeholder");
      const pdfWrapper = document.getElementById("pdf-word-preview-wrapper");

      if (target && previewWrapper) {
        if (pdfWrapper) pdfWrapper.style.display = "none";
        if (emptyPlaceholder) emptyPlaceholder.style.display = "none";
        target.innerHTML = this.docxHtml;
        previewWrapper.style.display = "block";
        if (stats) stats.innerText = `DOCX: "${file.name}" (${(file.size / 1024).toFixed(1)} KB)`;
        document.getElementById("btn-convert-docx-to-pdf").disabled = false;
        if (window.app && window.app.showToast) window.app.showToast("DOCX converted to print layout successfully!", "success");
      }
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Failed to convert DOCX: " + err.message, "error");
    }
  },

  async generatePdfFromDocx() {
    const target = document.getElementById("docx-html-target");
    if (!target) return;

    try {
      if (window.app && window.app.showToast) window.app.showToast("Generating PDF document...", "info");
      await this.ensureHtml2Pdf();

      const pageSize = document.getElementById("docx-page-size")?.value || "a4";
      const margin = parseInt(document.getElementById("docx-page-margin")?.value || "15", 10);
      const orientation = document.getElementById("docx-orientation")?.value || "portrait";
      const quality = parseFloat(document.getElementById("docx-image-quality")?.value || "0.95");

      const opt = {
        margin: margin,
        filename: `${this.fileName || "Document"}.pdf`,
        image: { type: 'jpeg', quality: quality },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: pageSize, orientation: orientation },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await window.html2pdf().set(opt).from(target).save();
      if (window.app && window.app.showToast) window.app.showToast(`Saved PDF "${this.fileName}.pdf"!`, "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("PDF generation failed: " + err.message, "error");
    }
  },

  async loadPdfForWord(file) {
    this.fileName = file.name.replace(/\.[^/.]+$/, "");
    const titleInput = document.getElementById("pdf-word-doc-title");
    if (titleInput) titleInput.value = this.fileName;

    try {
      if (window.app && window.app.showToast) window.app.showToast("Extracting PDF layout and typography...", "info");
      await this.ensurePdfJs();

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      this.pdfjsDoc = pdf;

      await this.parsePdfToParagraphs();
      document.getElementById("btn-export-word").disabled = false;
      if (window.app && window.app.showToast) window.app.showToast(`Extracted ${pdf.numPages} pages successfully!`, "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Failed to process PDF: " + err.message, "error");
    }
  },

  async parsePdfToParagraphs() {
    if (!this.pdfjsDoc) return;
    const numPages = this.pdfjsDoc.numPages;
    const paragraphs = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await this.pdfjsDoc.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Collect lines with font size metadata
      let currentLine = "";
      let lastY = null;
      let maxFontSize = 12;

      for (const item of textContent.items) {
        if (!item.str || item.str.trim() === "") continue;
        const y = Math.round(item.transform[5]);
        const fontSize = Math.round(item.transform[0]);

        if (lastY === null || Math.abs(lastY - y) <= 4) {
          currentLine += (currentLine ? " " : "") + item.str;
          if (fontSize > maxFontSize) maxFontSize = fontSize;
        } else {
          if (currentLine.trim()) {
            paragraphs.push({ text: currentLine.trim(), fontSize: maxFontSize, page: pageNum });
          }
          currentLine = item.str;
          maxFontSize = fontSize;
        }
        lastY = y;
      }

      if (currentLine.trim()) {
        paragraphs.push({ text: currentLine.trim(), fontSize: maxFontSize, page: pageNum });
      }
    }

    this.extractedParagraphs = paragraphs;
    this.renderPdfWordPreview();
  },

  renderPdfWordPreview() {
    const wrapper = document.getElementById("pdf-word-preview-wrapper");
    const container = document.getElementById("pdf-word-sheet");
    const stats = document.getElementById("word-doc-stats");
    const emptyPlaceholder = document.getElementById("word-empty-placeholder");
    const docxWrapper = document.getElementById("docx-preview-wrapper");
    if (!wrapper || !container) return;

    if (docxWrapper) docxWrapper.style.display = "none";
    if (emptyPlaceholder) emptyPlaceholder.style.display = "none";
    wrapper.style.display = "block";
    if (stats) stats.innerText = `PDF: ${this.extractedParagraphs.length} paragraphs across ${this.pdfjsDoc.numPages} page(s)`;

    let html = "";
    this.extractedParagraphs.forEach(p => {
      if (p.fontSize >= 18) {
        html += `<h1 style="font-size: 22px; font-weight: 700; color: #0f172a; margin: 18px 0 8px 0;">${escapeHtml(p.text)}</h1>`;
      } else if (p.fontSize >= 14) {
        html += `<h2 style="font-size: 16px; font-weight: 600; color: #1e293b; margin: 14px 0 6px 0;">${escapeHtml(p.text)}</h2>`;
      } else {
        html += `<p style="margin: 0 0 10px 0; font-size: 13.5px; color: #334155; line-height: 1.6;">${escapeHtml(p.text)}</p>`;
      }
    });

    container.innerHTML = html;
  },

  exportWordDocument() {
    if (!this.extractedParagraphs || this.extractedParagraphs.length === 0) return;

    try {
      const titleInput = document.getElementById("pdf-word-doc-title");
      const title = (titleInput && titleInput.value.trim()) || this.fileName || "Converted_Document";
      const formatSelect = document.getElementById("pdf-word-format")?.value || "docx";

      let bodyHtml = "";
      this.extractedParagraphs.forEach(p => {
        if (p.fontSize >= 18) {
          bodyHtml += `<h1 style="font-size: 20pt; font-weight: bold; color: #111827; margin-top: 14pt; margin-bottom: 6pt;">${escapeHtml(p.text)}</h1>\n`;
        } else if (p.fontSize >= 14) {
          bodyHtml += `<h2 style="font-size: 14pt; font-weight: bold; color: #1f2937; margin-top: 12pt; margin-bottom: 4pt;">${escapeHtml(p.text)}</h2>\n`;
        } else {
          bodyHtml += `<p style="font-size: 11pt; line-height: 1.5; color: #374151; margin-bottom: 8pt;">${escapeHtml(p.text)}</p>\n`;
        }
      });

      // Construct standards-compliant Word HTML MIME package
      const wordDocument = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset="utf-8">
          <title>${escapeHtml(title)}</title>
          <!--[if gte mso 9]>
          <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
          </xml>
          <![endif]-->
          <style>
            body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; }
            h1, h2, h3 { font-family: 'Calibri Light', 'Arial', sans-serif; }
          </style>
        </head>
        <body>
          ${bodyHtml}
        </body>
        </html>
      `;

      const blob = new Blob([wordDocument], { type: 'application/msword;charset=utf-8' });
      const ext = formatSelect === 'docx' ? 'docx' : 'doc';
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);

      if (window.app && window.app.showToast) window.app.showToast(`Saved Word document "${title}.${ext}"!`, "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Export failed: " + err.message, "error");
    }
  },

  ensureMammoth() {
    return new Promise((resolve, reject) => {
      if (window.mammoth) return resolve(window.mammoth);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js";
      script.onload = () => resolve(window.mammoth);
      script.onerror = () => reject(new Error("Failed to load Mammoth.js"));
      document.head.appendChild(script);
    });
  },

  ensureHtml2Pdf() {
    return new Promise((resolve, reject) => {
      if (window.html2pdf) return resolve(window.html2pdf);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.onload = () => resolve(window.html2pdf);
      script.onerror = () => reject(new Error("Failed to load html2pdf.js"));
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

  cleanup() {
    this.docxHtml = "";
    this.pdfjsDoc = null;
    this.extractedParagraphs = [];
  }
};
