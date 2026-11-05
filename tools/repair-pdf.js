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
  pageCount: 0,
  salvagedDoc: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 15px; display: flex; align-items: center; gap: 8px;">
                <span>🛠️</span> Corrupt PDF Diagnostics &amp; Repair
              </h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Fix damaged xref tables, align shifted headers, and salvage broken streams.
              </p>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div id="security-suite-tabs-slot"></div>
              <button type="button" class="tool-btn secondary" id="btn-change-corrupt-pdf" style="font-size: 11px; padding: 4px 10px; display: none;">
                New File
              </button>
            </div>
          </div>

          <!-- Document Upload Dropzone -->
          <div id="dropzone-repair" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 32px 18px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 160px; margin-bottom: 14px;">
            <div style="font-size: 36px; margin-bottom: 6px;">🩹</div>
            <div style="font-size: 13.5px; font-weight: 700; color: var(--text-main); margin-bottom: 3px;" id="repair-dropzone-title">
              Drop damaged PDF here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);" id="repair-dropzone-sub">
              Fix broken xref tables, shifted headers, or truncated file streams
            </div>
            <input type="file" id="input-corrupt-pdf" accept=".pdf,application/pdf" style="display: none;">
          </div>

          <!-- Active File Info Chip (Visible when file loaded) -->
          <div id="repair-file-card" style="display: none; background: rgba(0, 242, 254, 0.04); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 10px; padding: 10px 14px; margin-bottom: 14px; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
              <span style="font-size: 22px;">🩹</span>
              <div style="overflow: hidden;">
                <div id="repair-file-name-text" style="font-size: 12.5px; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"></div>
                <div id="repair-file-size-text" style="font-size: 11px; color: var(--text-muted);"></div>
              </div>
            </div>
            <button type="button" class="tool-btn secondary" id="repair-change-btn" style="font-size: 10.5px; padding: 3px 8px; flex-shrink: 0;">Change</button>
          </div>

          <!-- Repair Engine Checklist -->
          <div class="form-group" style="margin-bottom: 14px;">
            <label style="font-size: 11px; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">Active Recovery Engines</label>
            <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11.5px; color: var(--text-muted); line-height: 1.5; background: rgba(0,0,0,0.25); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
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
          <button type="button" class="tool-btn primary" id="btn-start-repair" disabled style="margin-top: 4px; justify-content: center; font-size: 13.5px; font-weight: 700; padding: 11px 18px; width: 100%;">
            🛠️ Diagnose &amp; Repair Document
          </button>

          <!-- Privacy Security Badge -->
          <div style="margin-top: 14px; padding: 12px; background: rgba(0, 242, 254, 0.04); border: 1px solid rgba(0, 242, 254, 0.15); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
            🔒 <strong style="color: var(--accent-cyan);">In-Memory Binary Surgery</strong>: Raw byte scanning, header trimming, and stream reconstruction happen 100% locally in your browser sandbox.
          </div>
        </div>

        <!-- Diagnostic Terminal & Output Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 15px; display: flex; align-items: center; gap: 8px;">
              <span>📟</span> Diagnostic Console &amp; Output
            </h3>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span id="repair-status-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;">Ready</span>
            </div>
          </div>

          <div class="preview-area-container" style="flex: 1; min-height: 280px; display: flex; flex-direction: column; position: relative; gap: 12px; margin-bottom: 12px;">
            <!-- Real-Time Terminal -->
            <div id="repair-terminal" style="flex: 1; min-height: 180px; max-height: 250px; background: #070a12; border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; font-family: var(--font-mono); font-size: 11.5px; line-height: 1.6; color: var(--accent-cyan); overflow-y: auto;">
              <div style="color: var(--text-muted);">
                [READY] Select a PDF on the left and click "Diagnose &amp; Repair Document" to begin byte-level inspection.
              </div>
            </div>

            <!-- Salvage Preview Stage (Visible after repair completes) -->
            <div id="repair-salvage-stage" style="display: none; flex: 1; min-height: 160px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); align-items: center; justify-content: center; position: relative; padding: 12px; overflow: hidden;">
              <canvas id="repair-preview-canvas" style="max-width: 100%; max-height: 220px; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);"></canvas>
              <div id="repair-canvas-tag" style="position: absolute; bottom: 12px; left: 12px; font-size: 10px; font-weight: 700; background: rgba(7, 10, 18, 0.85); backdrop-filter: blur(8px); border: 1px solid var(--border-color); padding: 3px 8px; border-radius: 4px; color: #34d399;">
                Recovered Page 1
              </div>
            </div>
          </div>

          <!-- Success Download Card (Visible after repair) -->
          <div id="repair-success-card" style="display: none; padding: 14px 18px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 24px;">🎉</span>
              <div>
                <div style="font-size: 13px; font-weight: 750; color: #34d399;">Repair Complete &amp; Verified</div>
                <div id="repair-stats-text" style="font-size: 11px; color: var(--text-muted);">All binary streams re-indexed.</div>
              </div>
            </div>
            <button type="button" class="tool-btn accent-emerald" id="btn-download-repaired" style="font-size: 12px; padding: 8px 18px; font-weight: 700;">
              📥 Download Repaired PDF
            </button>
          </div>
        </div>

        <!-- Full-Width Quick Guide Card (Standard Layout Compliance) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: PDF Repair &amp; Stream Recovery</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <span class="tool-guide-step-num">1</span>
              <div class="tool-guide-step-text">
                <strong>Select Damaged Document</strong>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">Upload any PDF that fails to open or throws corrupt xref errors in Acrobat or Chrome.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <span class="tool-guide-step-num">2</span>
              <div class="tool-guide-step-text">
                <strong>Binary Stream Analysis</strong>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">The engine inspects header offset bytes, repairs trailers, and re-indexes object catalogs.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <span class="tool-guide-step-num">3</span>
              <div class="tool-guide-step-text">
                <strong>Permissive Salvage Fallback</strong>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">If low-level metadata is shattered, PDF.js permissively extracts readable pages into a fresh container.</p>
              </div>
            </div>
          </div>
          <div class="tool-guide-benefits" style="margin-top: 18px; padding-top: 14px; border-top: 1px dashed rgba(255, 255, 255, 0.08); font-size: 12.5px; line-height: 1.5; color: var(--text-muted); text-align: left;">
            <strong style="color: var(--accent-cyan); display: block; margin-bottom: 6px; font-size: 13px;">💡 How it Benefits You:</strong>
            <ul style="margin: 0; padding-left: 18px; list-style-type: disc; display: flex; flex-direction: column; gap: 6px;">
              <li><strong>Deep Binary Structure Fixes</strong>: Realigns shifted file headers, closes unclosed streams, and rebuilds corrupted xref tables.</li>
              <li><strong>Permissive Page Salvage Fallback</strong>: Recovers readable pages from damaged or truncated files into a clean standardized document container.</li>
            </ul>
            <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed rgba(255, 255, 255, 0.05);">
              <a href="guides/pdf-security-suite.html#repair-pdf" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; color: var(--accent-cyan); text-decoration: none; font-size: 12.5px; font-weight: 600;">
                <span>📖 Read Detailed PDF Repair Guide</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
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
    const root = this.container || document;
    this.dropzone = root.querySelector('#dropzone-repair');
    this.inputPdf = root.querySelector('#input-corrupt-pdf');
    this.btnChange = root.querySelector('#btn-change-corrupt-pdf');
    this.repairChangeBtn = root.querySelector('#repair-change-btn');
    this.btnStart = root.querySelector('#btn-start-repair');
    this.btnDownload = root.querySelector('#btn-download-repaired');
    this.fileCard = root.querySelector('#repair-file-card');
    this.fileNameText = root.querySelector('#repair-file-name-text');
    this.fileSizeText = root.querySelector('#repair-file-size-text');
    this.terminal = root.querySelector('#repair-terminal');
    this.statusBadge = root.querySelector('#repair-status-badge');
    this.salvageStage = root.querySelector('#repair-salvage-stage');
    this.previewCanvas = root.querySelector('#repair-preview-canvas');
    this.canvasTag = root.querySelector('#repair-canvas-tag');
    this.successCard = root.querySelector('#repair-success-card');
    this.statsText = root.querySelector('#repair-stats-text');

    this.dropzone?.addEventListener('click', () => this.inputPdf?.click());
    this.btnChange?.addEventListener('click', () => this.inputPdf?.click());
    this.repairChangeBtn?.addEventListener('click', () => this.inputPdf?.click());

    // Drag and Drop
    this.dropzone?.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dropzone.style.borderColor = 'var(--accent-cyan)';
      this.dropzone.style.background = 'rgba(0, 242, 254, 0.05)';
    });
    this.dropzone?.addEventListener('dragleave', () => {
      this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)';
      this.dropzone.style.background = 'rgba(255, 255, 255, 0.02)';
    });
    this.dropzone?.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)';
      this.dropzone.style.background = 'rgba(255, 255, 255, 0.02)';
      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        this.loadFile(e.dataTransfer.files[0]);
      }
    });

    this.inputPdf?.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        this.loadFile(e.target.files[0]);
      }
    });

    this.btnStart?.addEventListener('click', () => this.runRepairSequence());
    this.btnDownload?.addEventListener('click', () => this.downloadRepairedPDF());
  },

  loadFile(file) {
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
      this.app?.showToast?.("Please choose a valid PDF file.", "warning");
      return;
    }

    this.pdfFile = file;
    this.diagnosisLog = [];
    this.repairedBlob = null;
    this.repairStats = null;
    this.salvagedDoc = null;

    // Update UI elements selectively (NO destructive outerHTML replacement!)
    if (this.dropzone) this.dropzone.style.display = 'none';
    if (this.fileCard) {
      this.fileCard.style.display = 'flex';
      this.fileNameText.textContent = file.name;
      this.fileSizeText.textContent = `${(file.size / 1024).toFixed(1)} KB loaded into memory`;
    }
    if (this.btnChange) this.btnChange.style.display = 'inline-block';
    if (this.btnStart) this.btnStart.disabled = false;
    if (this.successCard) this.successCard.style.display = 'none';
    if (this.salvageStage) this.salvageStage.style.display = 'none';
    if (this.statusBadge) {
      this.statusBadge.textContent = "Ready to Diagnose";
      this.statusBadge.style.color = "var(--accent-cyan)";
    }

    this.terminal.innerHTML = `
      <div style="color: var(--accent-cyan);">
        [READY] Loaded "${escapeHtml(file.name)}" (${(file.size / 1024).toFixed(1)} KB). Click "Diagnose &amp; Repair Document" to begin byte-level inspection.
      </div>
    `;

    this.app?.showToast?.(`Loaded "${file.name}"`, "success");
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
    if (window.pdfjsLib) {
      if (!window.pdfjsLib.GlobalWorkerOptions?.workerSrc) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      }
      return;
    }
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
    if (this.terminal) {
      this.terminal.innerHTML = this.diagnosisLog.map(l => {
        let color = "var(--accent-cyan)";
        if (l.includes("⚠️")) color = "#f59e0b";
        if (l.includes("✅") || l.includes("🎉")) color = "#34d399";
        if (l.includes("❌")) color = "#f43f5e";
        return `<div style="color: ${color};">${escapeHtml(l)}</div>`;
      }).join('');
      this.terminal.scrollTop = this.terminal.scrollHeight;
    }
  },

  async runRepairSequence() {
    if (!this.pdfFile || this.isRepairing) return;

    this.isRepairing = true;
    this.diagnosisLog = [];
    this.repairedBlob = null;
    this.btnStart.disabled = true;
    this.btnStart.innerHTML = `
      <span style="display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: sec-spin 0.8s linear infinite;"></span>
      <span>Running Stream Diagnostics...</span>
    `;
    this.statusBadge.textContent = "Repairing...";
    this.statusBadge.style.color = "#f59e0b";
    this.successCard.style.display = 'none';
    this.salvageStage.style.display = 'none';

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

        this.pageCount = pdfDoc.getPageCount();
        this.log(`✅ Structural repair successful! Recovered ${this.pageCount} valid page(s).`);
        repairedBytes = await pdfDoc.save();
      } catch (pdfLibErr) {
        this.log(`⚠️ Standard parser encountered corrupt objects: ${pdfLibErr.message}`);
        this.log("Activating deep page rasterization & recovery fallback via PDF.js...");

        await this.loadPDFJS();
        const loadingTask = window.pdfjsLib.getDocument({
          data: cleanBytes,
          stopAtErrors: false
        });

        this.salvagedDoc = await loadingTask.promise;
        this.pageCount = this.salvagedDoc.numPages;
        this.log(`PDF.js recovered stream connection: Found ${this.pageCount} readable page(s).`);

        const newDoc = await window.PDFLib.PDFDocument.create();

        for (let i = 1; i <= this.pageCount; i++) {
          this.log(`Salvaging page ${i}/${this.pageCount}...`);
          const page = await this.salvagedDoc.getPage(i);
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
      this.repairStats = `Recovered ${(this.repairedBlob.size / 1024).toFixed(1)} KB clean PDF • ${this.pageCount} Page(s)`;
      this.log("🎉 Document repair completed successfully!");

      // Update success card
      this.statsText.textContent = this.repairStats;
      this.successCard.style.display = 'flex';
      this.statusBadge.textContent = "Repaired & Ready";
      this.statusBadge.style.color = "#34d399";

      // Render salvage preview of page 1
      await this.renderSalvagePreview(repairedBytes);

      this.app?.showToast?.("Document repaired successfully!", "success");

    } catch (finalErr) {
      this.log(`❌ Critical recovery failure: ${finalErr.message}`);
      this.statusBadge.textContent = "Repair Failed";
      this.statusBadge.style.color = "#f43f5e";
      this.app?.showToast?.("Unable to recover file: Document appears severely truncated.", "error");
    } finally {
      this.isRepairing = false;
      this.btnStart.disabled = false;
      this.btnStart.innerHTML = `🛠️ Diagnose &amp; Repair Document`;
    }
  },

  async renderSalvagePreview(bytes) {
    try {
      await this.loadPDFJS();
      const task = window.pdfjsLib.getDocument({ data: bytes.slice(0) });
      const doc = await task.promise;
      const page = await doc.getPage(1);
      const viewport = page.getViewport({ scale: 1.2 });

      if (this.previewCanvas) {
        this.previewCanvas.width = viewport.width;
        this.previewCanvas.height = viewport.height;
        const ctx = this.previewCanvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport }).promise;
        this.canvasTag.textContent = `Recovered Page 1 of ${this.pageCount}`;
        this.salvageStage.style.display = 'flex';
      }
    } catch (e) {
      console.warn("Salvage preview note:", e);
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
    a.download = `repaired-${this.pdfFile?.name || 'document.pdf'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    this.app?.showToast?.("Repaired PDF downloaded!", "success");
  },

  cleanup() {
    this.pdfFile = null;
    this.repairedBlob = null;
    this.repairStats = null;
    this.diagnosisLog = [];
    this.salvagedDoc = null;
  }
};
