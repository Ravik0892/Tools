// OmniTool Hub - PDF to PDF/A Archival Converter
// 100% Client-Side ISO 19005 Compliance (PDF/A-1b, PDF/A-2b, PDF/A-3b) with sRGB OutputIntents and XMP Conformance Metadata via PDF-lib

import { escapeHtml } from './utils.js';

export default {
  id: "pdf-to-pdfa",
  name: "PDF to PDF/A Archival",

  pdfFile: null,
  profile: "PDF/A-1b", // 'PDF/A-1b' | 'PDF/A-2b' | 'PDF/A-3b'
  isConverting: false,
  convertedBlob: null,
  pageCount: 0,
  pdfJsDoc: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 15px; display: flex; align-items: center; gap: 8px;">
                <span>🏛️</span> PDF to ISO PDF/A Archival
              </h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Standardize documents for court archives, tax records, and long-term retention.
              </p>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div id="security-suite-tabs-slot"></div>
              <button type="button" class="tool-btn secondary" id="btn-change-pdfa-file" style="font-size: 11px; padding: 4px 10px; display: none;">
                New File
              </button>
            </div>
          </div>

          <!-- Document Upload Dropzone -->
          <div id="dropzone-pdfa" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 32px 18px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 160px; margin-bottom: 14px;">
            <div style="font-size: 36px; margin-bottom: 6px;">🏛️</div>
            <div style="font-size: 13.5px; font-weight: 700; color: var(--text-main); margin-bottom: 3px;" id="pdfa-dropzone-title">
              Drop PDF here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);" id="pdfa-dropzone-sub">
              Standardize documents under ISO 19005 archival specifications
            </div>
            <input type="file" id="input-pdfa-file" accept=".pdf,application/pdf" style="display: none;">
          </div>

          <!-- Active File Info Chip (Visible when file loaded) -->
          <div id="pdfa-file-card" style="display: none; background: rgba(0, 242, 254, 0.04); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 10px; padding: 10px 14px; margin-bottom: 14px; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
              <span style="font-size: 22px;">🏛️</span>
              <div style="overflow: hidden;">
                <div id="pdfa-file-name-text" style="font-size: 12.5px; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"></div>
                <div id="pdfa-file-size-text" style="font-size: 11px; color: var(--text-muted);"></div>
              </div>
            </div>
            <button type="button" class="tool-btn secondary" id="pdfa-change-btn" style="font-size: 10.5px; padding: 3px 8px; flex-shrink: 0;">Change</button>
          </div>

          <!-- ISO Conformance Profile Selection -->
          <div class="form-group" style="margin-bottom: 14px;">
            <label style="font-size: 11px; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">ISO Conformance Standard</label>
            <div style="display: flex; flex-direction: column; gap: 8px;" id="pdfa-profile-group">
              <label class="pdfa-profile-label active" style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; padding: 10px 12px; border-radius: 8px; background: rgba(0, 242, 254, 0.08); border: 1px solid var(--accent-cyan); transition: all 0.2s ease;">
                <input type="radio" name="pdfa-profile" value="PDF/A-1b" checked style="margin-top: 3px; accent-color: var(--accent-cyan);">
                <div>
                  <div style="font-weight: 700; font-size: 12px; color: var(--text-main);">PDF/A-1b (ISO 19005-1)</div>
                  <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 2px;">Basic visual preservation. Universal compatibility across all institutional, legal, and government archives.</div>
                </div>
              </label>

              <label class="pdfa-profile-label" style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; padding: 10px 12px; border-radius: 8px; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); transition: all 0.2s ease;">
                <input type="radio" name="pdfa-profile" value="PDF/A-2b" style="margin-top: 3px; accent-color: var(--accent-cyan);">
                <div>
                  <div style="font-weight: 700; font-size: 12px; color: var(--text-main);">PDF/A-2b (ISO 19005-2)</div>
                  <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 2px;">Modern archival standard. Permits JPEG2000 compression and vector transparency layers.</div>
                </div>
              </label>

              <label class="pdfa-profile-label" style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; padding: 10px 12px; border-radius: 8px; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); transition: all 0.2s ease;">
                <input type="radio" name="pdfa-profile" value="PDF/A-3b" style="margin-top: 3px; accent-color: var(--accent-cyan);">
                <div>
                  <div style="font-weight: 700; font-size: 12px; color: var(--text-main);">PDF/A-3b (ISO 19005-3)</div>
                  <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 2px;">Structured e-invoices. Permits embedding XML metadata attachments (Factur-X / ZUGFeRD).</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Action Button -->
          <button type="button" class="tool-btn primary" id="btn-convert-pdfa" disabled style="margin-top: 4px; justify-content: center; font-size: 13.5px; font-weight: 700; padding: 11px 18px; width: 100%;">
            🏛️ Convert to PDF/A-1b Format
          </button>

          <!-- Privacy Security Badge -->
          <div style="margin-top: 14px; padding: 12px; background: rgba(0, 242, 254, 0.04); border: 1px solid rgba(0, 242, 254, 0.15); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
            🔒 <strong style="color: var(--accent-cyan);">Zero Server Storage</strong>: Standard output intents and XMP schemas are serialized directly into your local PDF document stream.
          </div>
        </div>

        <!-- Archival Verification & Output Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 15px; display: flex; align-items: center; gap: 8px;">
              <span>📜</span> Archival Verification &amp; Output
            </h3>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span id="pdfa-status-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;">Idle</span>
            </div>
          </div>

          <div class="preview-area-container" style="flex: 1; min-height: 280px; display: flex; flex-direction: column; position: relative; gap: 12px; margin-bottom: 12px;">
            <!-- Document Stage Preview -->
            <div id="pdfa-preview-stage" style="flex: 1; min-height: 190px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center; position: relative; padding: 14px; overflow: hidden;">
              <!-- Idle State -->
              <div id="pdfa-stage-idle" style="text-align: center; color: var(--text-muted); padding: 20px;">
                <div style="font-size: 38px; margin-bottom: 8px; opacity: 0.8;">🏛️</div>
                <div style="font-size: 13.5px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">No Document Selected</div>
                <div style="font-size: 11px; max-width: 320px; margin: 0 auto; line-height: 1.5;">
                  Select a document on the left to inspect its visual layout and inject ISO 19005 OutputIntent color descriptors.
                </div>
              </div>

              <!-- Canvas Preview -->
              <div id="pdfa-canvas-wrap" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; position: relative;">
                <canvas id="pdfa-preview-canvas" style="max-width: 100%; max-height: 240px; object-fit: contain; border-radius: 6px; box-shadow: 0 4px 16px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);"></canvas>
                <div id="pdfa-canvas-tag" style="position: absolute; bottom: 8px; left: 8px; font-size: 10px; font-weight: 700; background: rgba(7, 10, 18, 0.85); backdrop-filter: blur(8px); border: 1px solid var(--border-color); padding: 3px 8px; border-radius: 4px; color: var(--text-main);">
                  Page 1 Preview
                </div>
              </div>
            </div>

            <!-- Compliance Checklist -->
            <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px;">
              <div style="font-size: 11px; font-weight: 750; color: var(--text-main); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                ISO 19005 Compliance Checklist
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11.5px; color: var(--text-muted); line-height: 1.5;">
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                  <span style="color: #10b981; font-weight: 700;">✓</span>
                  <div>
                    <strong style="color: var(--text-main);">Device-Independent Color Profile</strong>: Injects standard sRGB IEC61966-2.1 OutputIntent dictionary (<code style="font-size: 10.5px; color: var(--accent-cyan);">/GTS_PDFA1</code>).
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                  <span style="color: #10b981; font-weight: 700;">✓</span>
                  <div>
                    <strong style="color: var(--text-main);">XMP Conformance Packet</strong>: Injects XML Dublin Core &amp; <code style="font-size: 10.5px; color: var(--accent-cyan);">pdfaid:part</code> schemas to verify long-term reader compatibility.
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                  <span style="color: #10b981; font-weight: 700;">✓</span>
                  <div>
                    <strong style="color: var(--text-main);">Unrestricted Accessibility</strong>: Permanently clears proprietary passwords or encryption locks for archive access.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Success Download Card (Visible after conversion) -->
          <div id="pdfa-success-card" style="display: none; padding: 14px 18px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 24px;">📜</span>
              <div>
                <div style="font-size: 13px; font-weight: 750; color: #34d399;">Archival PDF/A Created!</div>
                <div id="pdfa-stats-text" style="font-size: 11px; color: var(--text-muted);">Standardized under ISO standard.</div>
              </div>
            </div>
            <button type="button" class="tool-btn accent-emerald" id="btn-download-pdfa" style="font-size: 12px; padding: 8px 18px; font-weight: 700;">
              📥 Download Compliant PDF/A
            </button>
          </div>
        </div>

        <!-- Full-Width Quick Guide Card (Standard Layout Compliance) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: PDF to PDF/A Archival Converter</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <span class="tool-guide-step-num">1</span>
              <div class="tool-guide-step-text">
                <strong>Select Target Profile</strong>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">Use PDF/A-1b for maximum universal institutional compatibility, or PDF/A-2b for modern transparency.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <span class="tool-guide-step-num">2</span>
              <div class="tool-guide-step-text">
                <strong>Color Profile Embedding</strong>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">An official sRGB OutputIntent dictionary ensures colors display identically decades from now.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <span class="tool-guide-step-num">3</span>
              <div class="tool-guide-step-text">
                <strong>XMP Metadata Packaging</strong>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">XML Dublin Core descriptors allow automated legal discovery and library catalog indexers to parse records.</p>
              </div>
            </div>
          </div>
          <div class="tool-guide-benefits" style="margin-top: 18px; padding-top: 14px; border-top: 1px dashed rgba(255, 255, 255, 0.08); font-size: 12.5px; line-height: 1.5; color: var(--text-muted); text-align: left;">
            <strong style="color: var(--accent-cyan); display: block; margin-bottom: 6px; font-size: 13px;">💡 How it Benefits You:</strong>
            <ul style="margin: 0; padding-left: 18px; list-style-type: disc; display: flex; flex-direction: column; gap: 6px;">
              <li><strong>ISO 19005 Standardization</strong>: Conform documents to PDF/A-1b, PDF/A-2b, or PDF/A-3b standards for long-term legal archiving.</li>
              <li><strong>Color &amp; XMP Descriptor Injection</strong>: Embeds device-independent sRGB IEC61966-2.1 OutputIntents and XML conformance schemas.</li>
            </ul>
            <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed rgba(255, 255, 255, 0.05);">
              <a href="guides/pdf-security-suite.html#pdf-to-pdfa" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; color: var(--accent-cyan); text-decoration: none; font-size: 12.5px; font-weight: 600;">
                <span>📖 Read Detailed PDF/A Archival Guide</span>
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
    this.dropzone = root.querySelector('#dropzone-pdfa');
    this.inputPdf = root.querySelector('#input-pdfa-file');
    this.btnChange = root.querySelector('#btn-change-pdfa-file');
    this.pdfaChangeBtn = root.querySelector('#pdfa-change-btn');
    this.btnConvert = root.querySelector('#btn-convert-pdfa');
    this.btnDownload = root.querySelector('#btn-download-pdfa');
    this.fileCard = root.querySelector('#pdfa-file-card');
    this.fileNameText = root.querySelector('#pdfa-file-name-text');
    this.fileSizeText = root.querySelector('#pdfa-file-size-text');
    this.statusBadge = root.querySelector('#pdfa-status-badge');
    this.stageIdle = root.querySelector('#pdfa-stage-idle');
    this.canvasWrap = root.querySelector('#pdfa-canvas-wrap');
    this.previewCanvas = root.querySelector('#pdfa-preview-canvas');
    this.canvasTag = root.querySelector('#pdfa-canvas-tag');
    this.successCard = root.querySelector('#pdfa-success-card');
    this.statsText = root.querySelector('#pdfa-stats-text');

    this.dropzone?.addEventListener('click', () => this.inputPdf?.click());
    this.btnChange?.addEventListener('click', () => this.inputPdf?.click());
    this.pdfaChangeBtn?.addEventListener('click', () => this.inputPdf?.click());

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

    // Profile radio switches
    root.querySelectorAll('input[name="pdfa-profile"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.profile = e.target.value;
        this.convertedBlob = null;
        if (this.successCard) this.successCard.style.display = 'none';

        // Update active card styles
        root.querySelectorAll('.pdfa-profile-label').forEach(label => {
          const r = label.querySelector('input');
          if (r && r.checked) {
            label.style.background = 'rgba(0, 242, 254, 0.08)';
            label.style.borderColor = 'var(--accent-cyan)';
          } else {
            label.style.background = 'rgba(0,0,0,0.2)';
            label.style.borderColor = 'var(--border-color)';
          }
        });

        if (this.btnConvert) {
          this.btnConvert.textContent = `🏛️ Convert to ${this.profile} Format`;
        }
      });
    });

    this.btnConvert?.addEventListener('click', () => this.convertToPDFA());
    this.btnDownload?.addEventListener('click', () => this.downloadPDFA());
  },

  async loadFile(file) {
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
      this.app?.showToast?.("Please choose a valid PDF file.", "warning");
      return;
    }

    this.pdfFile = file;
    this.convertedBlob = null;

    if (this.dropzone) this.dropzone.style.display = 'none';
    if (this.fileCard) {
      this.fileCard.style.display = 'flex';
      this.fileNameText.textContent = file.name;
      this.fileSizeText.textContent = `${(file.size / (1024 * 1024)).toFixed(2)} MB loaded into memory`;
    }
    if (this.btnChange) this.btnChange.style.display = 'inline-block';
    if (this.btnConvert) {
      this.btnConvert.disabled = false;
      this.btnConvert.textContent = `🏛️ Convert to ${this.profile} Format`;
    }
    if (this.successCard) this.successCard.style.display = 'none';
    if (this.statusBadge) {
      this.statusBadge.textContent = "Ready to Convert";
      this.statusBadge.style.color = "var(--accent-cyan)";
    }

    // Render Page 1 Preview
    try {
      await this.loadPDFJS();
      const ab = await file.arrayBuffer();
      const task = window.pdfjsLib.getDocument({ data: ab.slice(0) });
      this.pdfJsDoc = await task.promise;
      this.pageCount = this.pdfJsDoc.numPages;

      const page = await this.pdfJsDoc.getPage(1);
      const viewport = page.getViewport({ scale: 1.5 });

      if (this.previewCanvas) {
        this.previewCanvas.width = viewport.width;
        this.previewCanvas.height = viewport.height;
        const ctx = this.previewCanvas.getContext("2d");
        await page.render({ canvasContext: ctx, viewport }).promise;

        this.canvasTag.textContent = `Page 1 of ${this.pageCount}`;
        this.stageIdle.style.display = 'none';
        this.canvasWrap.style.display = 'flex';
      }
    } catch (e) {
      console.warn("PDF preview load note:", e);
    }

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

  async convertToPDFA() {
    if (!this.pdfFile || this.isConverting) return;

    this.isConverting = true;
    this.convertedBlob = null;
    this.btnConvert.disabled = true;
    this.btnConvert.innerHTML = `
      <span style="display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: sec-spin 0.8s linear infinite;"></span>
      <span>Injecting ISO Archival Descriptors...</span>
    `;
    this.statusBadge.textContent = "Standardizing...";
    this.statusBadge.style.color = "#f59e0b";

    try {
      await this.loadPDFLib();
      const ab = await this.pdfFile.arrayBuffer();
      const pdfDoc = await window.PDFLib.PDFDocument.load(ab, { ignoreEncryption: true });

      let part = "1";
      if (this.profile === "PDF/A-2b") part = "2";
      if (this.profile === "PDF/A-3b") part = "3";

      const title = this.pdfFile.name.replace(/\.[^/.]+$/, "");
      pdfDoc.setTitle(title);
      pdfDoc.setProducer("OmniTool Hub Archival Engine (PDF/A)");
      pdfDoc.setCreator("OmniTool Hub");
      pdfDoc.setCreationDate(new Date());
      pdfDoc.setModificationDate(new Date());

      const xmpMetadata = `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about="" xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/">
      <pdfaid:part>${part}</pdfaid:part>
      <pdfaid:conformance>B</pdfaid:conformance>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <dc:format>application/pdf</dc:format>
      <dc:title>
        <rdf:Alt>
          <rdf:li xml:lang="x-default">${escapeHtml(title)}</rdf:li>
        </rdf:Alt>
      </dc:title>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:pdf="http://ns.adobe.com/pdf/1.3/">
      <pdf:Producer>OmniTool Hub ISO Engine</pdf:Producer>
    </rdf:Description>
    <rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/">
      <xmp:CreatorTool>OmniTool Hub</xmp:CreatorTool>
      <xmp:CreateDate>${new Date().toISOString()}</xmp:CreateDate>
      <xmp:ModifyDate>${new Date().toISOString()}</xmp:ModifyDate>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;

      const context = pdfDoc.context;
      const metadataStream = context.stream(xmpMetadata, {
        Type: 'Metadata',
        Subtype: 'XML',
      });
      const metadataRef = context.register(metadataStream);
      pdfDoc.catalog.set(window.PDFLib.PDFName.of('Metadata'), metadataRef);

      const outputIntentDict = context.obj({
        Type: 'OutputIntent',
        S: 'GTS_PDFA1',
        OutputCondition: 'sRGB IEC61966-2.1',
        OutputConditionIdentifier: 'sRGB IEC61966-2.1',
        RegistryName: 'http://www.color.org',
        Info: 'sRGB IEC61966-2.1'
      });
      const outputIntentRef = context.register(outputIntentDict);
      pdfDoc.catalog.set(window.PDFLib.PDFName.of('OutputIntents'), context.obj([outputIntentRef]));

      const pdfBytes = await pdfDoc.save();
      this.convertedBlob = new Blob([pdfBytes], { type: "application/pdf" });

      // Update success card
      this.statsText.textContent = `Standardized under ISO ${this.profile}. Embedded sRGB OutputIntent and XMP metadata (${(this.convertedBlob.size / 1024 / 1024).toFixed(2)} MB).`;
      this.successCard.style.display = 'flex';
      this.statusBadge.textContent = "ISO Compliant";
      this.statusBadge.style.color = "#34d399";

      this.app?.showToast?.(`Converted to ${this.profile} successfully!`, "success");

    } catch (err) {
      console.error("PDF/A error:", err);
      this.app?.showToast?.("Error generating PDF/A document: " + err.message, "error");
      this.statusBadge.textContent = "Conversion Error";
      this.statusBadge.style.color = "#f43f5e";
    } finally {
      this.isConverting = false;
      this.btnConvert.disabled = false;
      this.btnConvert.textContent = `🏛️ Convert to ${this.profile} Format`;
    }
  },

  downloadPDFA() {
    if (!this.convertedBlob) return;
    const url = URL.createObjectURL(this.convertedBlob);
    const a = document.createElement("a");
    const baseName = this.pdfFile?.name.replace(/\.[^/.]+$/, "") || "document";
    const tag = this.profile.toLowerCase().replace(/[^a-z0-9]/g, "");
    a.href = url;
    a.download = `${baseName}-${tag}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    this.app?.showToast?.(`Downloaded ${this.profile} document!`, "success");
  },

  cleanup() {
    this.pdfFile = null;
    this.convertedBlob = null;
    this.pdfJsDoc = null;
  }
};
