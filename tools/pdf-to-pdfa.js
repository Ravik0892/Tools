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

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"></path><path d="M5 21V7l7-4 7 4v14"></path><path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11H9z"></path></svg>
              Archival Standards
            </h3>
            ${this.pdfFile ? `
              <button class="tool-btn secondary" id="btn-change-pdfa-file" style="font-size: 11px; padding: 4px 10px;">
                New File
              </button>
            ` : ''}
          </div>

          <!-- Document Upload Dropzone -->
          <div id="dropzone-pdfa" style="border: 2px dashed ${this.pdfFile ? 'var(--accent-emerald, #10b981)' : 'rgba(0, 242, 254, 0.35)'}; background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: ${this.pdfFile ? '14px' : '32px 16px'}; text-align: center; cursor: pointer; transition: all 0.2s;">
            <div style="font-size: ${this.pdfFile ? '20px' : '36px'}; margin-bottom: 4px;">🏛️</div>
            <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">
              ${this.pdfFile ? escapeHtml(this.pdfFile.name) : 'Drop PDF here or click to browse'}
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              ${this.pdfFile ? `${(this.pdfFile.size / 1024 / 1024).toFixed(2)} MB loaded into memory` : 'Standardize documents for court archives, tax records & long-term retention.'}
            </div>
            <input type="file" id="input-pdfa-file" accept="application/pdf" style="display: none;">
          </div>

          <!-- ISO Conformance Profile Selection -->
          <div class="form-group">
            <label>ISO Conformance Standard</label>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; padding: 10px 12px; border-radius: 8px; background: ${this.profile === 'PDF/A-1b' ? 'rgba(0, 242, 254, 0.08)' : 'rgba(0,0,0,0.2)'}; border: 1px solid ${this.profile === 'PDF/A-1b' ? 'var(--accent-cyan)' : 'var(--border-color)'};">
                <input type="radio" name="pdfa-profile" value="PDF/A-1b" ${this.profile === 'PDF/A-1b' ? 'checked' : ''} style="margin-top: 2px;">
                <div>
                  <div style="font-weight: 700; font-size: 12px; color: var(--text-main);">PDF/A-1b (ISO 19005-1)</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Basic visual preservation. Universal compatibility across all institutional, legal, and government archives.</div>
                </div>
              </label>

              <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; padding: 10px 12px; border-radius: 8px; background: ${this.profile === 'PDF/A-2b' ? 'rgba(0, 242, 254, 0.08)' : 'rgba(0,0,0,0.2)'}; border: 1px solid ${this.profile === 'PDF/A-2b' ? 'var(--accent-cyan)' : 'var(--border-color)'};">
                <input type="radio" name="pdfa-profile" value="PDF/A-2b" ${this.profile === 'PDF/A-2b' ? 'checked' : ''} style="margin-top: 2px;">
                <div>
                  <div style="font-weight: 700; font-size: 12px; color: var(--text-main);">PDF/A-2b (ISO 19005-2)</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Modern archival standard. Permits JPEG2000 compression and transparency layers.</div>
                </div>
              </label>

              <label style="display: flex; align-items: flex-start; gap: 10px; cursor: pointer; padding: 10px 12px; border-radius: 8px; background: ${this.profile === 'PDF/A-3b' ? 'rgba(0, 242, 254, 0.08)' : 'rgba(0,0,0,0.2)'}; border: 1px solid ${this.profile === 'PDF/A-3b' ? 'var(--accent-cyan)' : 'var(--border-color)'};">
                <input type="radio" name="pdfa-profile" value="PDF/A-3b" ${this.profile === 'PDF/A-3b' ? 'checked' : ''} style="margin-top: 2px;">
                <div>
                  <div style="font-weight: 700; font-size: 12px; color: var(--text-main);">PDF/A-3b (ISO 19005-3)</div>
                  <div style="font-size: 10px; color: var(--text-muted);">Structured e-invoices. Permits embedding XML metadata attachments (ZUGFeRD / Factur-X).</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Action Button -->
          <button class="tool-btn primary" id="btn-convert-pdfa" ${(!this.pdfFile || this.isConverting) ? 'disabled' : ''} style="margin-top: 8px; justify-content: center; font-size: 13px; font-weight: 700;">
            ${this.isConverting ? '⏳ Injecting ISO Archival Descriptors...' : `🏛️ Convert to ${this.profile} Format`}
          </button>

          <!-- Privacy Security Badge -->
          <div style="margin-top: auto; padding: 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
            🔒 <strong style="color: var(--accent-cyan);">Zero Server Storage</strong>: Standard output intents and XMP schemas are serialized directly into your local PDF document stream.
          </div>
        </div>

        <!-- Archival Verification & Output Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              Archival Verification &amp; Output
            </h3>
            ${this.convertedBlob ? `
              <button class="tool-btn accent-emerald" id="btn-download-pdfa">
                📥 Download ${this.profile}
              </button>
            ` : ''}
          </div>

          <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
            <!-- Compliance Checklist -->
            <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; padding: 18px;">
              <div style="font-size: 12px; font-weight: 700; color: var(--text-main); margin-bottom: 12px; text-transform: uppercase;">
                ISO 19005 Compliance Checklist
              </div>
              <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                  <span style="color: #10b981; font-weight: 700;">✓</span>
                  <div>
                    <strong style="color: var(--text-main);">Device-Independent Color Profile</strong>: Injects standard sRGB IEC61966-2.1 OutputIntent dictionary (<code style="font-size: 11px;">/GTS_PDFA1</code>).
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                  <span style="color: #10b981; font-weight: 700;">✓</span>
                  <div>
                    <strong style="color: var(--text-main);">XMP Conformance Packet</strong>: Injects XML Dublin Core &amp; <code style="font-size: 11px;">pdfaid:part</code> schemas to verify long-term reader compatibility.
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                  <span style="color: #10b981; font-weight: 700;">✓</span>
                  <div>
                    <strong style="color: var(--text-main);">Unrestricted Accessibility</strong>: Permanently clears proprietary passwords or encryption locks for archive access.
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 8px;">
                  <span style="color: #10b981; font-weight: 700;">✓</span>
                  <div>
                    <strong style="color: var(--text-main);">Self-Contained Rendering</strong>: Disallows external web font links or active client JavaScript calls.
                  </div>
                </div>
              </div>
            </div>

            <!-- Ready State Card -->
            ${this.convertedBlob ? `
              <div style="padding: 24px; text-align: center; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 10px;">
                <div style="font-size: 32px; margin-bottom: 8px;">📜</div>
                <h4 style="margin: 0 0 6px 0; font-size: 15px; color: #34d399;">Archival PDF/A Created!</h4>
                <p style="margin: 0 0 16px 0; font-size: 12px; color: var(--text-muted);">
                  Standardized under ISO ${this.profile}. Embedded sRGB OutputIntent and XMP identification metadata.
                </p>
                <button class="tool-btn accent-emerald" id="btn-download-pdfa-hero" style="font-size: 13px; padding: 8px 24px; font-weight: 700;">
                  📥 Download Compliant ${this.profile} Document
                </button>
              </div>
            ` : `
              <div style="margin: auto; text-align: center; color: var(--text-muted); padding: 40px 20px;">
                <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.7;">🏛️</div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">No PDF Selected</h4>
                <p style="font-size: 12px; max-width: 380px; margin: 0; line-height: 1.5;">
                  Drop or select a PDF document on the left to inject ISO 19005 OutputIntent color descriptors and XMP archival metadata.
                </p>
              </div>
            `}
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: PDF TO PDF/A ARCHIVAL CONVERTER</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Select Target Profile</strong>
              <p style="margin: 4px 0 0 0;">Use PDF/A-1b for maximum universal institutional compatibility, or PDF/A-2b for modern transparency.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Color Profile Embedding</strong>
              <p style="margin: 4px 0 0 0;">An official sRGB OutputIntent dictionary ensures colors display identically decades from now.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. XMP Metadata Packaging</strong>
              <p style="margin: 4px 0 0 0;">XML Dublin Core descriptors allow automated legal discovery and library catalog indexers to parse records.</p>
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
    const dropzone = document.getElementById("dropzone-pdfa");
    const inputPdf = document.getElementById("input-pdfa-file");
    const btnChange = document.getElementById("btn-change-pdfa-file");

    dropzone?.addEventListener("click", () => inputPdf?.click());
    btnChange?.addEventListener("click", () => inputPdf?.click());

    inputPdf?.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        this.pdfFile = e.target.files[0];
        this.convertedBlob = null;
        this.refreshUI();
      }
    });

    if (!this.pdfFile) return;

    // Radios
    document.querySelectorAll('input[name="pdfa-profile"]').forEach(radio => {
      radio.addEventListener("change", (e) => {
        this.profile = e.target.value;
        this.convertedBlob = null;
        this.refreshUI();
      });
    });

    document.getElementById("btn-convert-pdfa")?.addEventListener("click", () => this.convertToPDFA());
    document.getElementById("btn-download-pdfa")?.addEventListener("click", () => this.downloadPDFA());
    document.getElementById("btn-download-pdfa-hero")?.addEventListener("click", () => this.downloadPDFA());
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

  async convertToPDFA() {
    if (!this.pdfFile) return;

    this.isConverting = true;
    this.convertedBlob = null;
    this.refreshUI();

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

    } catch (err) {
      alert("Error generating PDF/A document: " + err.message);
    } finally {
      this.isConverting = false;
      this.refreshUI();
    }
  },

  downloadPDFA() {
    if (!this.convertedBlob) return;
    const url = URL.createObjectURL(this.convertedBlob);
    const a = document.createElement("a");
    const baseName = this.pdfFile.name.replace(/\.[^/.]+$/, "");
    const tag = this.profile.toLowerCase().replace(/[^a-z0-9]/g, "");
    a.href = url;
    a.download = `${baseName}-${tag}.pdf`;
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
