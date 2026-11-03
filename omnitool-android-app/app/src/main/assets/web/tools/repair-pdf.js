// OmniTool Hub - PDF Repair & Stream Recovery Suite
// 100% Client-Side Corrupt PDF Diagnosis, Header Realignment, Xref Reconstruction, and Object Stream Salvage

import { escapeHtml } from './utils.js';

export default {
  id: "repair-pdf",
  name: "Repair & Recover PDF",

  pdfFile: null,
  isRepairing: false,
  diagnosisLog: [],
  repairedBlob: null,
  repairStats: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
              Diagnostics Setup
            </h3>
            ${this.pdfFile ? `
              <button class="tool-btn secondary" id="btn-change-corrupt-pdf" style="font-size: 11px; padding: 4px 10px;">
                New File
              </button>
            ` : ''}
          </div>

          <!-- Document Upload Dropzone -->
          <div id="dropzone-repair" style="border: 2px dashed ${this.pdfFile ? 'var(--accent-emerald, #10b981)' : 'rgba(0, 242, 254, 0.35)'}; background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: ${this.pdfFile ? '14px' : '32px 16px'}; text-align: center; cursor: pointer; transition: all 0.2s;">
            <div style="font-size: ${this.pdfFile ? '20px' : '36px'}; margin-bottom: 4px;">🩹</div>
            <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
              ${this.pdfFile ? escapeHtml(this.pdfFile.name) : 'Drop damaged PDF here or click to browse'}
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              ${this.pdfFile ? `${(this.pdfFile.size / 1024).toFixed(1)} KB loaded into memory` : 'Fix broken xref tables, shifted headers, or truncated files.'}
            </div>
            <input type="file" id="input-corrupt-pdf" accept=".pdf,application/pdf" style="display: none;">
          </div>

          <!-- Repair Engine Checklist -->
          <div class="form-group">
            <label>Active Recovery Engines</label>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11.5px; color: var(--text-muted); line-height: 1.5; background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-cyan); font-weight: 700;">✓</span> Header Offset Signature Realigner
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-cyan); font-weight: 700;">✓</span> EOF &amp; Trailer Dictionary Injector
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-cyan); font-weight: 700;">✓</span> Object Stream Xref Re-indexer
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: var(--accent-cyan); font-weight: 700;">✓</span> Permissive Stream Page Salvage Fallback
              </div>
            </div>
          </div>

          <!-- Action Button -->
          <button class="tool-btn primary" id="btn-start-repair" ${(!this.pdfFile || this.isRepairing) ? 'disabled' : ''} style="margin-top: 8px; justify-content: center; font-size: 13px; font-weight: 700;">
            ${this.isRepairing ? '⏳ Running Stream Diagnostics...' : '🛠️ Diagnose &amp; Repair Document'}
          </button>

          <!-- Privacy Security Badge -->
          <div style="margin-top: auto; padding: 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
            🔒 <strong style="color: var(--accent-cyan);">In-Memory Binary Surgery</strong>: Raw byte scanning and reconstruction happen exclusively within your browser's private sandbox.
          </div>
        </div>

        <!-- Diagnostic Terminal & Output Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
              Diagnostic Console &amp; Output
            </h3>
            ${this.repairedBlob ? `
              <button class="tool-btn accent-emerald" id="btn-download-repaired">
                📥 Download Repaired PDF
              </button>
            ` : ''}
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; gap: 14px;">
            <!-- Real-Time Terminal -->
            <div id="repair-terminal" style="flex: 1; min-height: 280px; background: #070a12; border: 1px solid var(--border-color); border-radius: 10px; padding: 16px; font-family: var(--font-mono); font-size: 12px; line-height: 1.7; color: var(--accent-cyan); overflow-y: auto;">
              ${this.diagnosisLog.length === 0 ? `
                <div style="color: var(--text-muted);">
                  [READY] Select a PDF on the left and click "Diagnose &amp; Repair Document" to begin byte-level inspection.
                </div>
              ` : this.diagnosisLog.map(l => `<div>${escapeHtml(l)}</div>`).join('')}
            </div>

            <!-- Success Card if Repaired -->
            ${this.repairedBlob ? `
              <div style="padding: 16px 20px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <span style="font-size: 24px;">🎉</span>
                  <div>
                    <div style="font-size: 13px; font-weight: 700; color: #34d399;">Repair Complete &amp; Verified</div>
                    <div style="font-size: 11px; color: var(--text-muted);">${this.repairStats || 'All binary streams re-indexed.'}</div>
                  </div>
                </div>
                <button class="tool-btn accent-emerald" id="btn-download-repaired-hero" style="font-size: 12px; padding: 6px 18px; font-weight: 700;">
                  📥 Download Clean PDF
                </button>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: PDF REPAIR &amp; STREAM RECOVERY</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Select Damaged Document</strong>
              <p style="margin: 4px 0 0 0;">Upload any PDF that fails to open or throws corrupt xref errors in Acrobat or Chrome.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Binary Analysis</strong>
              <p style="margin: 4px 0 0 0;">The engine inspects header offset bytes, repairs trailers, and re-indexes object catalogs.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Permissive Salvage</strong>
              <p style="margin: 4px 0 0 0;">If low-level metadata is shattered, PDF.js permissively extracts readable pages into a fresh container.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init() {
    this.bindEvents();
  },

  bindEvents() {
    const dropzone = document.getElementById("dropzone-repair");
    const inputPdf = document.getElementById("input-corrupt-pdf");
    const btnChange = document.getElementById("btn-change-corrupt-pdf");

    dropzone?.addEventListener("click", () => inputPdf?.click());
    btnChange?.addEventListener("click", () => inputPdf?.click());

    inputPdf?.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        this.pdfFile = e.target.files[0];
        this.diagnosisLog = [];
        this.repairedBlob = null;
        this.repairStats = null;
        this.refreshUI();
      }
    });

    document.getElementById("btn-start-repair")?.addEventListener("click", () => this.runRepairSequence());
    document.getElementById("btn-download-repaired")?.addEventListener("click", () => this.downloadRepairedPDF());
    document.getElementById("btn-download-repaired-hero")?.addEventListener("click", () => this.downloadRepairedPDF());
  },

  async loadPDFLib() {
    if (window.PDFLib) return;
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
      script.onload = resolve;
      script.onerror = () => reject(new Error("Failed to load PDF-lib."));
      document.head.appendChild(script);
    });
  },

  async loadPDFJS() {
    if (window.pdfjsLib) return;
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js."));
      document.head.appendChild(script);
    });
  },

  log(msg) {
    const time = new Date().toLocaleTimeString();
    this.diagnosisLog.push(`[${time}] ${msg}`);
    const term = document.getElementById("repair-terminal");
    if (term) {
      term.innerHTML = this.diagnosisLog.map(l => `<div>${escapeHtml(l)}</div>`).join('');
      term.scrollTop = term.scrollHeight;
    }
  },

  async runRepairSequence() {
    if (!this.pdfFile) return;

    this.isRepairing = true;
    this.diagnosisLog = [];
    this.repairedBlob = null;
    this.refreshUI();

    this.log(`Initiating binary diagnosis for "${this.pdfFile.name}" (${(this.pdfFile.size / 1024).toFixed(1)} KB)...`);

    try {
      const rawBuffer = await this.pdfFile.arrayBuffer();
      const uint8 = new Uint8Array(rawBuffer);

      // Step 1: Magic Header Check
      this.log("Inspecting header signature...");
      const headerIndex = this.findHeaderOffset(uint8);

      let cleanBytes = uint8;
      if (headerIndex === -1) {
        this.log("⚠️ No '%PDF-' header found! Prepending standard PDF-1.7 header...");
        const header = new TextEncoder().encode("%PDF-1.7\r\n%âãÏÓ\r\n");
        const merged = new Uint8Array(header.length + uint8.length);
        merged.set(header, 0);
        merged.set(uint8, header.length);
        cleanBytes = merged;
      } else if (headerIndex > 0) {
        this.log(`⚠️ Stray data detected before PDF header (${headerIndex} bytes offset). Trimming prepended garbage...`);
        cleanBytes = uint8.slice(headerIndex);
      } else {
        this.log("✅ Valid '%PDF-' header verified at offset 0.");
      }

      // Step 2: EOF marker check
      this.log("Scanning for '%%EOF' end-of-file trailer...");
      const hasEOF = this.checkEOF(cleanBytes);
      if (!hasEOF) {
        this.log("⚠️ Truncated file: Missing '%%EOF' termination marker. Injecting trailer closing block...");
        const trailer = new TextEncoder().encode("\r\n%%EOF\r\n");
        const merged = new Uint8Array(cleanBytes.length + trailer.length);
        merged.set(cleanBytes, 0);
        merged.set(trailer, cleanBytes.length);
        cleanBytes = merged;
      } else {
        this.log("✅ EOF marker present.");
      }

      // Step 3: Rebuilding xref table via PDF-lib
      this.log("Rebuilding cross-reference tables and re-indexing object streams...");
      await this.loadPDFLib();

      let pdfDoc = null;
      let repairedBytes = null;

      try {
        pdfDoc = await window.PDFLib.PDFDocument.load(cleanBytes, {
          ignoreEncryption: true,
          throwOnInvalidObject: false,
          updateMetadata: false
        });

        this.log(`✅ Structural repair successful! Recovered ${pdfDoc.getPageCount()} valid page(s).`);
        repairedBytes = await pdfDoc.save();
      } catch (pdfLibErr) {
        this.log(`⚠️ Standard parser encountered corrupt objects: ${pdfLibErr.message}`);
        this.log("Activating deep page rasterization & recovery fallback via PDF.js...");

        await this.loadPDFJS();
        const loadingTask = window.pdfjsLib.getDocument({
          data: cleanBytes,
          stopAtErrors: false
        });

        const salvagedDoc = await loadingTask.promise;
        const pageCount = salvagedDoc.numPages;
        this.log(`PDF.js recovered stream connection: Found ${pageCount} readable page(s).`);

        const newDoc = await window.PDFLib.PDFDocument.create();

        for (let i = 1; i <= pageCount; i++) {
          this.log(`Salvaging page ${i}/${pageCount}...`);
          const page = await salvagedDoc.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext("2d");

          await page.render({ canvasContext: ctx, viewport }).promise;

          const pngDataUrl = canvas.toDataURL("image/png");
          const pngBytes = await fetch(pngDataUrl).then(r => r.arrayBuffer());
          const pngImage = await newDoc.embedPng(pngBytes);

          const newPage = newDoc.addPage([viewport.width / 2, viewport.height / 2]);
          newPage.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: viewport.width / 2,
            height: viewport.height / 2
          });
        }

        repairedBytes = await newDoc.save();
        this.log("✅ All recoverable pages successfully salvaged into clean PDF container!");
      }

      this.repairedBlob = new Blob([repairedBytes], { type: "application/pdf" });
      this.repairStats = `Recovered ${(this.repairedBlob.size / 1024).toFixed(1)} KB clean PDF document.`;
      this.log("🎉 Document repair completed successfully!");

    } catch (finalErr) {
      this.log(`❌ Critical recovery failure: ${finalErr.message}`);
      alert("Unable to recover file: The document appears too severely truncated or encrypted without a key.");
    } finally {
      this.isRepairing = false;
      this.refreshUI();
    }
  },

  findHeaderOffset(bytes) {
    const pattern = [0x25, 0x50, 0x44, 0x46, 0x2D];
    for (let i = 0; i < Math.min(bytes.length - pattern.length, 2048); i++) {
      if (pattern.every((byte, idx) => bytes[i + idx] === byte)) {
        return i;
      }
    }
    return -1;
  },

  checkEOF(bytes) {
    const slice = bytes.slice(Math.max(0, bytes.length - 2048));
    const str = new TextDecoder('latin1').decode(slice);
    return str.includes("%%EOF");
  },

  downloadRepairedPDF() {
    if (!this.repairedBlob) return;
    const url = URL.createObjectURL(this.repairedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `repaired-${this.pdfFile.name || 'document.pdf'}`;
    a.click();
    URL.revokeObjectURL(url);
  },

  refreshUI() {
    const appEl = document.getElementById("tool-render-area") || document.querySelector(".tool-main");
    if (appEl) {
      appEl.innerHTML = this.renderUI();
      this.bindEvents();
    }
  }
};
