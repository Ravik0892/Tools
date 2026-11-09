// OmniTool Hub - Excel to PDF & PDF to Excel Converter Suite
// 100% Client-Side spreadsheet parsing and PDF table compilation via SheetJS, jsPDF, and AutoTable.

import { escapeHtml } from './utils.js';

export default {
  id: "excel-pdf",
  name: "Excel to PDF & PDF to Excel",

  activeMode: "excel-to-pdf", // 'excel-to-pdf' | 'pdf-to-excel'
  workbook: null,
  sheetNames: [],
  activeSheet: "",
  sheetData: [], // Array of row arrays
  pdfjsDoc: null,
  extractedTableRows: [],
  fileName: "",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M8 13h8M8 17h8M8 9h2"></path></svg>
              Spreadsheet Setup
            </h3>
          </div>

          <!-- Conversion Direction Segmented Control -->
          <div class="conversion-mode-bar" style="margin: 14px 0 16px 0;">
            <label style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); display: block; margin-bottom: 6px;">Conversion Direction</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: rgba(255, 255, 255, 0.03); padding: 4px; border-radius: 8px; border: 1px solid var(--border-color);">
              <button type="button" class="mode-segment-btn ${this.activeMode === 'excel-to-pdf' ? 'active' : ''}" id="btn-mode-excel-to-pdf" style="padding: 7px 12px; font-size: 12px; font-weight: 600; border-radius: 6px; border: 1px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;">
                <span>📊 Excel to PDF</span>
              </button>
              <button type="button" class="mode-segment-btn ${this.activeMode === 'pdf-to-excel' ? 'active' : ''}" id="btn-mode-pdf-to-excel" style="padding: 7px 12px; font-size: 12px; font-weight: 600; border-radius: 6px; border: 1px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px; transition: all 0.2s;">
                <span>📑 PDF to Excel</span>
              </button>
            </div>
          </div>

          <!-- Mode 1: Excel to PDF Controls -->
          <div id="controls-excel-to-pdf" style="display: ${this.activeMode === 'excel-to-pdf' ? 'flex' : 'none'}; flex-direction: column; gap: 14px;">
            <!-- Dropzone -->
            <div id="excel-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 24px 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <input type="file" id="excel-file-input" accept=".xlsx, .xls, .csv, .ods" style="display: none;">
              <div style="font-size: 32px; margin-bottom: 4px;">📊</div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Drop Excel or CSV here</div>
              <div style="font-size: 11px; color: var(--text-muted);">Supports .xlsx, .xls, .csv, and .ods files</div>
            </div>

            <!-- Sheets selector -->
            <div id="excel-sheets-bar" style="display: none; align-items: center; gap: 8px; flex-wrap: wrap; padding: 8px 10px; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px solid var(--border-color);">
              <span style="font-size: 10px; text-transform: uppercase; font-weight: 700; color: var(--text-muted);">Sheets:</span>
              <div id="excel-sheet-pills" style="display: flex; gap: 6px; flex-wrap: wrap;"></div>
            </div>

            <div class="form-group">
              <label>Page Orientation</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button type="button" class="tool-btn secondary opt-orientation active" data-val="landscape" style="justify-content: center; font-size: 11px; padding: 6px;">Landscape (Wide)</button>
                <button type="button" class="tool-btn secondary opt-orientation" data-val="portrait" style="justify-content: center; font-size: 11px; padding: 6px;">Portrait (Tall)</button>
              </div>
            </div>

            <div class="form-group">
              <label for="excel-page-size">Page Size</label>
              <select id="excel-page-size" class="form-select" style="width: 100%;">
                <option value="a4" selected>A4 (Standard 210 x 297 mm)</option>
                <option value="letter">US Letter (8.5 x 11 in)</option>
                <option value="legal">US Legal (8.5 x 14 in)</option>
                <option value="a3">A3 (Large Ledger)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="excel-table-theme">Table Theme Style</label>
              <select id="excel-table-theme" class="form-select" style="width: 100%;">
                <option value="striped" selected>Striped Zebra Rows</option>
                <option value="grid">Grid (Clean Cell Borders)</option>
                <option value="plain">Minimalist Clean (No Fills)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="excel-header-color">Header Theme Color</label>
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="color" id="excel-header-color" value="#00f2fe" style="width: 36px; height: 32px; padding: 0; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; background: none;">
                <span style="font-size: 12px; color: var(--text-muted);">Accent Header Fill</span>
              </div>
            </div>

            <div class="form-group">
              <label for="excel-font-size">Font Size</label>
              <select id="excel-font-size" class="form-select" style="width: 100%;">
                <option value="7">Compact (7 pt - Best for wide tables)</option>
                <option value="8" selected>Standard (8 pt)</option>
                <option value="10">Comfortable (10 pt)</option>
                <option value="12">Large (12 pt)</option>
              </select>
            </div>

            <div class="form-group" style="display: flex; align-items: center; gap: 8px;">
              <input type="checkbox" id="excel-include-numbers" checked style="accent-color: var(--accent-cyan); width: 16px; height: 16px;">
              <label for="excel-include-numbers" style="font-size: 12px; color: var(--text-main); cursor: pointer; margin: 0;">Add Page Numbers in Footer</label>
            </div>

            <button type="button" class="tool-btn primary" id="btn-convert-to-pdf" disabled style="margin-top: 8px; justify-content: center; font-size: 13px; font-weight: 700;">
              📥 Generate &amp; Download PDF
            </button>
          </div>

          <!-- Mode 2: PDF to Excel Controls -->
          <div id="controls-pdf-to-excel" style="display: ${this.activeMode === 'pdf-to-excel' ? 'flex' : 'none'}; flex-direction: column; gap: 14px;">
            <!-- Dropzone -->
            <div id="pdf-table-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 24px 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <input type="file" id="pdf-table-file-input" accept=".pdf" style="display: none;">
              <div style="font-size: 32px; margin-bottom: 4px;">📑</div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Drop PDF with tabular data here</div>
              <div style="font-size: 11px; color: var(--text-muted);">Extracts table columns &amp; cells into structured spreadsheets</div>
            </div>

            <div class="form-group">
              <label for="pdf-scope-select">Page Parsing Scope</label>
              <select id="pdf-scope-select" class="form-select" style="width: 100%;">
                <option value="all" selected>All Document Pages</option>
                <option value="first">First Page Only</option>
                <option value="custom">Specific Pages (e.g. 1-3)</option>
              </select>
            </div>

            <div class="form-group" id="pdf-custom-page-group" style="display: none;">
              <label for="pdf-custom-range">Page Range</label>
              <input type="text" id="pdf-custom-range" class="form-input" placeholder="e.g. 1, 2, 4-6" style="width: 100%;">
            </div>

            <div class="form-group">
              <label>Target Output Format</label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button type="button" class="tool-btn secondary opt-out-fmt active" data-fmt="xlsx" style="justify-content: center; font-size: 11px; padding: 6px;">Excel (.xlsx)</button>
                <button type="button" class="tool-btn secondary opt-out-fmt" data-fmt="csv" style="justify-content: center; font-size: 11px; padding: 6px;">Comma CSV</button>
              </div>
            </div>

            <button type="button" class="tool-btn primary" id="btn-export-excel" disabled style="margin-top: 8px; justify-content: center; font-size: 13px; font-weight: 700;">
              📥 Download Spreadsheet (.xlsx)
            </button>
          </div>

          <!-- Privacy Security Badge -->
          <div style="margin-top: auto; padding: 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
            🔒 <strong style="color: var(--accent-cyan);">Positional In-Memory Extraction</strong>: SheetJS and PDF.js analyze spatial coordinate geometry locally without cloud uploads.
          </div>
        </div>

        <!-- Table Preview Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"></path></svg>
              Table Preview &amp; Output
            </h3>
            <span id="excel-table-stats" style="font-size: 11px; color: var(--text-muted);">No spreadsheet loaded</span>
          </div>

          <!-- Table Container -->
          <div id="table-preview-area" style="flex: 1; min-height: 440px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow: auto; padding: 14px;">
            <div id="excel-empty-placeholder" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 40px 20px;">
              <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.7;">📊</div>
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">No Spreadsheet Data</h4>
              <p style="font-size: 12px; max-width: 380px; margin: 0; line-height: 1.5;">
                Upload an Excel workbook or PDF table on the left to preview extracted rows, columns, and sheet structures.
              </p>
            </div>

            <!-- Table containers -->
            <div id="excel-table-container" style="display: none;"></div>
            <div id="pdf-table-container" style="display: none;"></div>
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: EXCEL TO PDF &amp; PDF TO EXCEL CONVERTER</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Multi-Sheet Support</strong>
              <p style="margin: 4px 0 0 0;">Easily switch between workbook tabs before compiling into customized landscape tables.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Spatial Grid Detection</strong>
              <p style="margin: 4px 0 0 0;">Our PDF parser clusters text items by coordinate heights to reassemble clean rows and columns.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Zero Server Uploads</strong>
              <p style="margin: 4px 0 0 0;">All calculations and exports are processed 100% inside your local browser memory.</p>
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
    const btnExcelToPdf = document.getElementById("btn-mode-excel-to-pdf");
    const btnPdfToExcel = document.getElementById("btn-mode-pdf-to-excel");
    const panelExcel = document.getElementById("panel-excel-to-pdf");
    const panelPdf = document.getElementById("panel-pdf-to-excel");

    if (btnExcelToPdf && btnPdfToExcel) {
      btnExcelToPdf.addEventListener("click", () => {
        this.activeMode = "excel-to-pdf";
        btnExcelToPdf.className = "tool-btn primary";
        btnPdfToExcel.className = "tool-btn secondary";
        panelExcel.style.display = "block";
        panelPdf.style.display = "none";
      });

      btnPdfToExcel.addEventListener("click", () => {
        this.activeMode = "pdf-to-excel";
        btnPdfToExcel.className = "tool-btn primary";
        btnExcelToPdf.className = "tool-btn secondary";
        panelPdf.style.display = "block";
        panelExcel.style.display = "none";
      });
    }

    // 1. Excel to PDF file handling
    const excelInput = document.getElementById("excel-file-input");
    const excelDropzone = document.getElementById("excel-dropzone");

    if (excelInput) {
      excelInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) this.loadExcelFile(e.target.files[0]);
      });
    }

    if (excelDropzone) {
      excelDropzone.addEventListener("dragover", (e) => { e.preventDefault(); excelDropzone.style.borderColor = "var(--accent-cyan)"; });
      excelDropzone.addEventListener("dragleave", () => { excelDropzone.style.borderColor = "var(--border-color)"; });
      excelDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        excelDropzone.style.borderColor = "var(--border-color)";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) this.loadExcelFile(e.dataTransfer.files[0]);
      });
    }

    // Orientation toggle
    document.querySelectorAll(".opt-orientation").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".opt-orientation").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
      });
    });

    // Convert to PDF button
    const btnConvertPdf = document.getElementById("btn-convert-to-pdf");
    if (btnConvertPdf) {
      btnConvertPdf.addEventListener("click", () => this.generatePdfFromExcel());
    }

    // 2. PDF to Excel file handling
    const pdfInput = document.getElementById("pdf-table-file-input");
    const pdfDropzone = document.getElementById("pdf-table-dropzone");

    if (pdfInput) {
      pdfInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) this.loadPdfFile(e.target.files[0]);
      });
    }

    if (pdfDropzone) {
      pdfDropzone.addEventListener("dragover", (e) => { e.preventDefault(); pdfDropzone.style.borderColor = "var(--accent-cyan)"; });
      pdfDropzone.addEventListener("dragleave", () => { pdfDropzone.style.borderColor = "var(--border-color)"; });
      pdfDropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        pdfDropzone.style.borderColor = "var(--border-color)";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) this.loadPdfFile(e.dataTransfer.files[0]);
      });
    }

    // Format toggle
    document.querySelectorAll(".opt-out-fmt").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".opt-out-fmt").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        const fmt = e.currentTarget.dataset.fmt;
        const btnExp = document.getElementById("btn-export-excel");
        if (btnExp) btnExp.innerText = fmt === "xlsx" ? "📥 Download Spreadsheet (.xlsx)" : "📥 Download Delimited (.csv)";
      });
    });

    // Scope select
    const scopeSelect = document.getElementById("pdf-scope-select");
    const customGroup = document.getElementById("pdf-custom-page-group");
    if (scopeSelect && customGroup) {
      scopeSelect.addEventListener("change", () => {
        customGroup.style.display = scopeSelect.value === "custom" ? "block" : "none";
      });
    }

    // Export Excel button
    const btnExportExcel = document.getElementById("btn-export-excel");
    if (btnExportExcel) {
      btnExportExcel.addEventListener("click", () => this.exportExtractedSpreadsheet());
    }
  },

  async loadExcelFile(file) {
    this.fileName = file.name.replace(/\.[^/.]+$/, "");
    try {
      if (window.app && window.app.showToast) window.app.showToast("Loading spreadsheet...", "info");
      await this.ensureSheetJS();

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const wb = window.XLSX.read(data, { type: "array" });
        this.workbook = wb;
        this.sheetNames = wb.SheetNames;
        if (this.sheetNames.length > 0) {
          this.switchSheet(this.sheetNames[0]);
          this.renderSheetPills();
          document.getElementById("excel-sheets-bar").style.display = "flex";
          document.getElementById("btn-convert-to-pdf").disabled = false;
          if (window.app && window.app.showToast) window.app.showToast(`Loaded ${this.sheetNames.length} sheet(s) successfully!`, "success");
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Failed to parse spreadsheet: " + err.message, "error");
    }
  },

  renderSheetPills() {
    const container = document.getElementById("excel-sheet-pills");
    if (!container) return;
    container.innerHTML = this.sheetNames.map(name => `
      <button type="button" class="tool-btn ${name === this.activeSheet ? 'primary' : 'secondary'}" style="padding: 4px 10px; font-size: 11.5px; border-radius: 6px;" data-sheet="${escapeHtml(name)}">
        ${escapeHtml(name)}
      </button>
    `).join("");

    container.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const sName = e.currentTarget.getAttribute("data-sheet");
        this.switchSheet(sName);
        this.renderSheetPills();
      });
    });
  },

  switchSheet(sheetName) {
    this.activeSheet = sheetName;
    const worksheet = this.workbook.Sheets[sheetName];
    // Convert to 2D array
    const rawJson = window.XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: "" });
    this.sheetData = rawJson;
    this.renderExcelPreview();
  },

  renderExcelPreview() {
    const wrapper = document.getElementById("excel-preview-wrapper");
    const container = document.getElementById("excel-table-container");
    const statsEl = document.getElementById("excel-table-stats");
    if (!wrapper || !container) return;

    if (!this.sheetData || this.sheetData.length === 0) {
      container.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">Sheet is empty</div>`;
      return;
    }

    wrapper.style.display = "block";
    const totalRows = this.sheetData.length;
    const maxCols = Math.max(...this.sheetData.map(r => r.length));
    if (statsEl) statsEl.innerText = `Sheet: "${this.activeSheet}" (${totalRows.toLocaleString()} rows × ${maxCols} columns)`;

    const previewRows = this.sheetData.slice(0, 20);
    let html = `<table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: left;">`;

    previewRows.forEach((row, rIdx) => {
      const isHeader = rIdx === 0;
      const tag = isHeader ? "th" : "td";
      const bg = isHeader ? "background: rgba(0, 242, 254, 0.1); font-weight: 700; color: var(--accent-cyan);" : (rIdx % 2 === 0 ? "background: rgba(255,255,255,0.02);" : "");
      html += `<tr>`;
      for (let c = 0; c < maxCols; c++) {
        const val = row[c] !== undefined ? row[c] : "";
        html += `<${tag} style="padding: 6px 10px; border: 1px solid rgba(255,255,255,0.07); ${bg} white-space: nowrap; max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(String(val))}</${tag}>`;
      }
      html += `</tr>`;
    });
    html += `</table>`;
    container.innerHTML = html;
  },

  async generatePdfFromExcel() {
    if (!this.sheetData || this.sheetData.length === 0) return;

    try {
      if (window.app && window.app.showToast) window.app.showToast("Building PDF document...", "info");
      await this.ensureJsPdf();

      const { jsPDF } = window.jspdf;
      const orientationBtn = document.querySelector(".opt-orientation.active");
      const orientation = orientationBtn ? orientationBtn.dataset.val : "landscape";
      const pageSize = document.getElementById("excel-page-size")?.value || "a4";
      const theme = document.getElementById("excel-table-theme")?.value || "striped";
      const fontSize = parseInt(document.getElementById("excel-font-size")?.value || "8", 10);
      const headerColor = document.getElementById("excel-header-color")?.value || "#00f2fe";
      const includePageNum = document.getElementById("excel-include-numbers")?.checked;

      const doc = new jsPDF({
        orientation: orientation,
        unit: "pt",
        format: pageSize
      });

      // Prepare headers & data
      const headers = this.sheetData[0] ? this.sheetData[0].map(h => String(h || "")) : [];
      const body = this.sheetData.slice(1).map(row => {
        const r = [];
        for (let i = 0; i < headers.length; i++) {
          r.push(row[i] !== undefined ? String(row[i]) : "");
        }
        return r;
      });

      // Parse RGB from hex
      const r = parseInt(headerColor.slice(1, 3), 16) || 0;
      const g = parseInt(headerColor.slice(3, 5), 16) || 242;
      const b = parseInt(headerColor.slice(5, 7), 16) || 254;

      doc.autoTable({
        head: [headers],
        body: body,
        theme: theme,
        styles: {
          fontSize: fontSize,
          cellPadding: 4,
          overflow: "linebreak"
        },
        headStyles: {
          fillColor: [r, g, b],
          textColor: [10, 15, 25],
          fontStyle: "bold"
        },
        alternateRowStyles: theme === "striped" ? { fillColor: [245, 247, 250] } : {},
        margin: { top: 40, bottom: 40, left: 30, right: 30 },
        didDrawPage: (data) => {
          if (includePageNum) {
            const pageStr = "Page " + doc.internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.setTextColor(150);
            const pageSize = doc.internal.pageSize;
            const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
            doc.text(pageStr, data.settings.margin.left, pageHeight - 15);
          }
        }
      });

      const outName = `${this.fileName || "Spreadsheet"}_${this.activeSheet}.pdf`;
      doc.save(outName);
      if (window.app && window.app.showToast) window.app.showToast(`Saved PDF "${outName}"!`, "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("PDF generation failed: " + err.message, "error");
    }
  },

  async loadPdfFile(file) {
    this.fileName = file.name.replace(/\.[^/.]+$/, "");
    try {
      if (window.app && window.app.showToast) window.app.showToast("Parsing PDF tabular streams...", "info");
      await this.ensurePdfJs();
      await this.ensureSheetJS();

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = window.pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      this.pdfjsDoc = pdf;

      await this.extractPdfTableData();
      document.getElementById("btn-export-excel").disabled = false;
      if (window.app && window.app.showToast) window.app.showToast(`Analyzed ${pdf.numPages} pages successfully!`, "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Failed to parse PDF: " + err.message, "error");
    }
  },

  async extractPdfTableData() {
    if (!this.pdfjsDoc) return;
    const numPages = this.pdfjsDoc.numPages;
    const scope = document.getElementById("pdf-scope-select")?.value || "all";
    const customRange = document.getElementById("pdf-custom-range")?.value || "";

    let pagesToProcess = [];
    if (scope === "first") {
      pagesToProcess = [1];
    } else if (scope === "custom" && customRange) {
      pagesToProcess = this.parsePageRanges(customRange, numPages);
    } else {
      for (let i = 1; i <= numPages; i++) pagesToProcess.push(i);
    }

    const allRows = [];

    for (const pageNum of pagesToProcess) {
      const page = await this.pdfjsDoc.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Group items by vertical Y coordinate with 4pt tolerance
      const lineMap = new Map();

      for (const item of textContent.items) {
        if (!item.str || item.str.trim() === "") continue;
        const y = Math.round(item.transform[5]);
        const x = item.transform[4];

        // Find existing close line
        let targetY = null;
        for (const existingY of lineMap.keys()) {
          if (Math.abs(existingY - y) <= 4) {
            targetY = existingY;
            break;
          }
        }

        if (targetY === null) {
          targetY = y;
          lineMap.set(targetY, []);
        }
        lineMap.get(targetY).push({ x: x, str: item.str });
      }

      // Sort lines top to bottom (Y descending in PDF)
      const sortedYs = Array.from(lineMap.keys()).sort((a, b) => b - a);

      for (const y of sortedYs) {
        const lineItems = lineMap.get(y);
        // Sort line items left to right
        lineItems.sort((a, b) => a.x - b.x);
        const rowCells = lineItems.map(item => item.str.trim());
        if (rowCells.length > 0) {
          allRows.push(rowCells);
        }
      }
    }

    this.extractedTableRows = allRows;
    this.renderPdfExtractedPreview();
  },

  renderPdfExtractedPreview() {
    const wrapper = document.getElementById("pdf-table-preview-wrapper");
    const container = document.getElementById("pdf-table-container");
    const statsEl = document.getElementById("pdf-table-stats");
    if (!wrapper || !container) return;

    if (!this.extractedTableRows || this.extractedTableRows.length === 0) {
      container.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">No structured lines detected</div>`;
      return;
    }

    wrapper.style.display = "block";
    const totalRows = this.extractedTableRows.length;
    const maxCols = Math.max(...this.extractedTableRows.map(r => r.length));
    if (statsEl) statsEl.innerText = `Detected ${totalRows.toLocaleString()} rows × ~${maxCols} columns`;

    const preview = this.extractedTableRows.slice(0, 25);
    let html = `<table style="width: 100%; border-collapse: collapse; font-size: 11px; text-align: left;">`;

    preview.forEach((row, idx) => {
      const isHeader = idx === 0;
      const bg = isHeader ? "background: rgba(0, 242, 254, 0.1); font-weight: 700; color: var(--accent-cyan);" : (idx % 2 === 0 ? "background: rgba(255,255,255,0.02);" : "");
      html += `<tr>`;
      for (let c = 0; c < maxCols; c++) {
        const val = row[c] !== undefined ? row[c] : "";
        html += `<td style="padding: 6px 10px; border: 1px solid rgba(255,255,255,0.07); ${bg} white-space: nowrap; max-width: 180px; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(String(val))}</td>`;
      }
      html += `</tr>`;
    });
    html += `</table>`;
    container.innerHTML = html;
  },

  exportExtractedSpreadsheet() {
    if (!this.extractedTableRows || this.extractedTableRows.length === 0) return;
    try {
      const activeFmtBtn = document.querySelector(".opt-out-fmt.active");
      const fmt = activeFmtBtn ? activeFmtBtn.dataset.fmt : "xlsx";
      const baseName = this.fileName ? `${this.fileName}_extracted` : "PDF_Extracted_Data";

      if (fmt === "csv") {
        const csvContent = this.extractedTableRows.map(row => {
          return row.map(cell => {
            const escaped = String(cell).replace(/"/g, '""');
            return `"${escaped}"`;
          }).join(",");
        }).join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${baseName}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const ws = window.XLSX.utils.aoa_to_sheet(this.extractedTableRows);
        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, "ExtractedData");
        window.XLSX.writeFile(wb, `${baseName}.xlsx`);
      }

      if (window.app && window.app.showToast) window.app.showToast(`Exported spreadsheet successfully!`, "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Export failed: " + err.message, "error");
    }
  },

  parsePageRanges(rangeStr, maxPages) {
    const pages = new Set();
    const parts = rangeStr.split(",");
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [start, end] = trimmed.split("-").map(n => parseInt(n.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          for (let p = Math.max(1, start); p <= Math.min(maxPages, end); p++) pages.add(p);
        }
      } else {
        const p = parseInt(trimmed, 10);
        if (!isNaN(p) && p >= 1 && p <= maxPages) pages.add(p);
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  },

  ensureSheetJS() {
    return new Promise((resolve, reject) => {
      if (window.XLSX) return resolve(window.XLSX);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
      script.onload = () => resolve(window.XLSX);
      script.onerror = () => reject(new Error("Failed to load SheetJS"));
      document.head.appendChild(script);
    });
  },

  ensureJsPdf() {
    return new Promise((resolve, reject) => {
      if (window.jspdf && window.jspdf.jsPDF) {
        if (window.jspdf.jsPDF.API && window.jspdf.jsPDF.API.autoTable) return resolve();
      }
      const s1 = document.createElement('script');
      s1.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s1.onload = () => {
        const s2 = document.createElement('script');
        s2.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js";
        s2.onload = () => resolve();
        s2.onerror = () => reject(new Error("Failed to load AutoTable"));
        document.head.appendChild(s2);
      };
      s1.onerror = () => reject(new Error("Failed to load jsPDF"));
      document.head.appendChild(s1);
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
    this.workbook = null;
    this.sheetData = [];
    this.extractedTableRows = [];
    this.pdfjsDoc = null;
  }
};
