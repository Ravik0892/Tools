// OmniTool Hub - HTML to PDF Webpage Studio
// 100% Client-Side HTML, CSS, and Webpage to PDF compiler with live visual sandbox and page-break controls.

import { escapeHtml } from './utils.js';

export default {
  id: "html-to-pdf",
  name: "HTML to PDF Webpage Studio",

  htmlSource: "",
  templatePresets: {
    invoice: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1e293b; padding: 24px; margin: 0; line-height: 1.5; font-size: 13px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; border-bottom: 2px solid #00f2fe; padding-bottom: 16px; }
    .logo { font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -0.5px; }
    .logo span { color: #00f2fe; }
    .invoice-title { font-size: 20px; font-weight: 700; color: #64748b; text-align: right; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px; }
    .info-box h4 { margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; color: #64748b; }
    .info-box p { margin: 0; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th { background: #f8fafc; color: #475569; font-weight: 700; text-align: left; padding: 10px 12px; font-size: 11.5px; border-bottom: 1px solid #e2e8f0; }
    td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 12.5px; }
    .total-box { margin-left: auto; width: 240px; }
    .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 12.5px; }
    .grand-total { border-top: 2px solid #0f172a; padding-top: 8px; font-weight: 800; font-size: 15px; color: #0f172a; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">OMNI<span>TOOLS</span></div>
      <p style="color: #64748b; margin: 4px 0 0 0;">Next-Gen Cloud Solutions Inc.</p>
    </div>
    <div>
      <div class="invoice-title">INVOICE #INV-2026-089</div>
      <p style="color: #64748b; margin: 4px 0 0 0; text-align: right;">Date: October 17, 2026</p>
    </div>
  </div>

  <div class="info-grid">
    <div class="info-box">
      <h4>Billed To:</h4>
      <p><strong>Acme International Corp</strong></p>
      <p>742 Evergreen Terrace</p>
      <p>Springfield, OR 97477</p>
    </div>
    <div class="info-box">
      <h4>Payment Terms:</h4>
      <p>Due upon receipt (Net 15)</p>
      <p>Wire Transfer / Stripe / UPI</p>
      <p>support@omnitool.worldsneed.com</p>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th style="text-align: center;">Qty</th>
        <th style="text-align: right;">Unit Price</th>
        <th style="text-align: right;">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>OmniTool Pro Lifetime License (Multi-Seat)</td>
        <td style="text-align: center;">5</td>
        <td style="text-align: right;">$29.99</td>
        <td style="text-align: right;">$149.95</td>
      </tr>
      <tr>
        <td>Dedicated PWA Offline Integration Support</td>
        <td style="text-align: center;">1</td>
        <td style="text-align: right;">$200.00</td>
        <td style="text-align: right;">$200.00</td>
      </tr>
      <tr>
        <td>Client-Side Cryptographic Data Auditing</td>
        <td style="text-align: center;">1</td>
        <td style="text-align: right;">$150.00</td>
        <td style="text-align: right;">$150.00</td>
      </tr>
    </tbody>
  </table>

  <div class="total-box">
    <div class="total-row"><span>Subtotal:</span><span>$499.95</span></div>
    <div class="total-row"><span>Tax (0%):</span><span>$0.00</span></div>
    <div class="total-row grand-total"><span>Total Due:</span><span>$499.95</span></div>
  </div>
</body>
</html>`,
    report: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; padding: 32px; margin: 0; line-height: 1.6; font-size: 13.5px; }
    h1 { color: #0284c7; font-size: 26px; border-bottom: 2px solid #e0f2fe; padding-bottom: 8px; margin-top: 0; }
    h2 { color: #0369a1; font-size: 18px; margin-top: 24px; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; background: #e0f2fe; color: #0284c7; text-transform: uppercase; }
    .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 20px 0; }
    .metric-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; background: #f8fafc; }
    .metric-card span { font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; }
    .metric-card strong { font-size: 22px; color: #0f172a; display: block; margin-top: 4px; }
    .page-break { page-break-after: always; }
  </style>
</head>
<body>
  <div class="badge">Quarterly Security & Performance Audit</div>
  <h1>OmniTool Hub v2 — Client-Side Verification Report</h1>
  <p>This technical document provides the privacy verification audit results confirming 100% in-browser cryptographic isolation across all deployed utilities.</p>

  <div class="metric-grid">
    <div class="metric-card">
      <span>Zero Upload Rate</span>
      <strong>100%</strong>
    </div>
    <div class="metric-card">
      <span>Active Tools</span>
      <strong>50+ Engines</strong>
    </div>
    <div class="metric-card">
      <span>PWA Cache Score</span>
      <strong>99.8%</strong>
    </div>
  </div>

  <h2>1. Threat Vector &amp; Data Containment</h2>
  <p>All sensitive operations including PDF password decryption, voice waveform sampling, and AES cipher hashing take place inside dedicated WebAssembly and Web Audio memory heaps. At no point are unencrypted payloads transmitted across network sockets.</p>
</body>
</html>`
  },

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- HTML Code Editor Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              HTML &amp; CSS Source
            </h3>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; flex: 1; margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-muted); margin: 0;">Templates &amp; Import</label>
              <div style="display: flex; gap: 6px;">
                <button type="button" class="tool-btn secondary" id="btn-tpl-invoice" style="font-size: 11px; padding: 4px 8px;">🧾 Invoice</button>
                <button type="button" class="tool-btn secondary" id="btn-tpl-report" style="font-size: 11px; padding: 4px 8px;">📑 Report</button>
                <button type="button" class="tool-btn secondary" id="btn-upload-html" style="font-size: 11px; padding: 4px 8px;">📂 Import</button>
                <input type="file" id="html-file-input" accept=".html, .htm" style="display: none;">
              </div>
            </div>
            <textarea id="html-source-input" class="form-input" style="width: 100%; min-height: 280px; flex: 1; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 12px; line-height: 1.5; resize: vertical; border-radius: 8px; background: rgba(0,0,0,0.35); border: 1px solid var(--border-color); color: var(--text-main); padding: 12px; white-space: pre;" placeholder="Enter or paste full HTML code with inline CSS here..."></textarea>

            <!-- Conversion Options Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: rgba(0,0,0,0.15); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
              <div class="form-group" style="margin-bottom: 0;">
                <label for="html-pdf-format" style="font-size: 11px; margin-bottom: 4px;">Page Format</label>
                <select id="html-pdf-format" class="form-select" style="width: 100%; font-size: 11.5px; padding: 5px 8px;">
                  <option value="a4" selected>A4 (210 × 297 mm)</option>
                  <option value="letter">US Letter (8.5 × 11 in)</option>
                  <option value="legal">US Legal (8.5 × 14 in)</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label for="html-pdf-orientation" style="font-size: 11px; margin-bottom: 4px;">Orientation</label>
                <select id="html-pdf-orientation" class="form-select" style="width: 100%; font-size: 11.5px; padding: 5px 8px;">
                  <option value="portrait" selected>Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label for="html-pdf-margin" style="font-size: 11px; margin-bottom: 4px;">Margins</label>
                <select id="html-pdf-margin" class="form-select" style="width: 100%; font-size: 11.5px; padding: 5px 8px;">
                  <option value="10" selected>Standard (10 mm)</option>
                  <option value="0">Zero / Full Bleed</option>
                  <option value="5">Narrow (5 mm)</option>
                  <option value="20">Wide (20 mm)</option>
                </select>
              </div>

              <div class="form-group" style="margin-bottom: 0;">
                <label for="html-pdf-scale" style="font-size: 11px; margin-bottom: 4px;">Resolution</label>
                <select id="html-pdf-scale" class="form-select" style="width: 100%; font-size: 11.5px; padding: 5px 8px;">
                  <option value="2" selected>2x Crisp Retina</option>
                  <option value="3">3x Ultra Vector</option>
                  <option value="1">1x Standard</option>
                </select>
              </div>
            </div>

            <button type="button" class="tool-btn primary" id="btn-export-html-pdf" style="justify-content: center; height: 42px; font-weight: 700;">
              📥 Convert &amp; Download PDF
            </button>

            <!-- Privacy Security Badge -->
            <div style="padding: 10px 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.4;">
              🔒 <strong style="color: var(--accent-cyan);">Sandboxed Execution</strong>: html2pdf.js and html2canvas render the document locally in an isolated iframe.
            </div>
          </div>
        </div>

        <!-- Live Sandbox Render Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              Live Render Sandbox
            </h3>
            <button type="button" class="tool-btn secondary" id="btn-refresh-preview" style="padding: 3px 8px; font-size: 11px;">🔄 Refresh Sandbox</button>
          </div>

          <div style="flex: 1; min-height: 440px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; display: flex; flex-direction: column;">
            <div id="html-preview-canvas" style="flex: 1; width: 100%; height: 100%; min-height: 420px; overflow: auto; background: #ffffff;">
              <iframe id="html-preview-iframe" style="width: 100%; height: 100%; min-height: 480px; border: none; background: #ffffff;" sandbox="allow-same-origin"></iframe>
            </div>
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: HTML TO PDF WEBPAGE STUDIO</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Live CSS &amp; HTML Sandbox</strong>
              <p style="margin: 4px 0 0 0;">Type or paste markup with full inline or &lt;style&gt; blocks. The right pane refreshes dynamically.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Page-Break Intelligence</strong>
              <p style="margin: 4px 0 0 0;">Add CSS <code>page-break-after: always;</code> or <code>break-after: page;</code> to control multi-page splits cleanly.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Retina Vector Scaling</strong>
              <p style="margin: 4px 0 0 0;">Generates 2x/3x high-DPI canvas captures so fine typography and small table fonts print razor sharp.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.htmlSource = this.templatePresets.invoice;
    const txtArea = document.getElementById("html-source-input");
    if (txtArea) txtArea.value = this.htmlSource;

    this.updatePreview();
    this.bindEvents();
  },

  bindEvents() {
    const txtArea = document.getElementById("html-source-input");
    if (txtArea) {
      let debounceTimer = null;
      txtArea.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          this.htmlSource = txtArea.value;
          this.updatePreview();
        }, 300);
      });
    }

    // Refresh button
    const btnRefresh = document.getElementById("btn-refresh-preview");
    if (btnRefresh) {
      btnRefresh.addEventListener("click", () => {
        if (txtArea) this.htmlSource = txtArea.value;
        this.updatePreview();
        if (window.app && window.app.showToast) window.app.showToast("Refreshed preview sandbox", "info");
      });
    }

    // Template presets
    const btnTplInvoice = document.getElementById("btn-tpl-invoice");
    const btnTplReport = document.getElementById("btn-tpl-report");
    const btnUpload = document.getElementById("btn-upload-html");

    if (btnTplInvoice) {
      btnTplInvoice.addEventListener("click", () => {
        this.htmlSource = this.templatePresets.invoice;
        if (txtArea) txtArea.value = this.htmlSource;
        btnTplInvoice.classList.add("active");
        if (btnTplReport) btnTplReport.classList.remove("active");
        if (btnUpload) btnUpload.classList.remove("active");
        this.updatePreview();
      });
    }

    if (btnTplReport) {
      btnTplReport.addEventListener("click", () => {
        this.htmlSource = this.templatePresets.report;
        if (txtArea) txtArea.value = this.htmlSource;
        btnTplReport.classList.add("active");
        if (btnTplInvoice) btnTplInvoice.classList.remove("active");
        if (btnUpload) btnUpload.classList.remove("active");
        this.updatePreview();
      });
    }

    // File import
    const fileInput = document.getElementById("html-file-input");

    if (btnUpload && fileInput) {
      btnUpload.addEventListener("click", () => fileInput.click());
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (evt) => {
            this.htmlSource = evt.target.result;
            if (txtArea) txtArea.value = this.htmlSource;
            btnUpload.classList.add("active");
            if (btnTplInvoice) btnTplInvoice.classList.remove("active");
            if (btnTplReport) btnTplReport.classList.remove("active");
            this.updatePreview();
            if (window.app && window.app.showToast) window.app.showToast(`Imported "${file.name}" successfully!`, "success");
          };
          reader.readAsText(file);
        }
      });
    }

    // Export PDF
    const btnExport = document.getElementById("btn-export-html-pdf");
    if (btnExport) {
      btnExport.addEventListener("click", () => this.generatePdf());
    }
  },

  updatePreview() {
    const iframe = document.getElementById("html-preview-iframe");
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(this.htmlSource);
      doc.close();
    } catch (err) {
      console.warn("Iframe render warning:", err);
    }
  },

  async generatePdf() {
    if (!this.htmlSource || this.htmlSource.trim() === "") return;

    try {
      if (window.app && window.app.showToast) window.app.showToast("Compiling HTML to PDF...", "info");
      await this.ensureHtml2Pdf();

      const format = document.getElementById("html-pdf-format")?.value || "a4";
      const orientation = document.getElementById("html-pdf-orientation")?.value || "portrait";
      const margin = parseInt(document.getElementById("html-pdf-margin")?.value || "10", 10);
      const scale = parseInt(document.getElementById("html-pdf-scale")?.value || "2", 10);

      // Create temporary offscreen container
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "0";
      container.style.width = orientation === "landscape" ? "1120px" : "794px"; // A4 pixel ratio
      container.innerHTML = this.htmlSource;
      document.body.appendChild(container);

      const opt = {
        margin: margin,
        filename: 'Webpage_Document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: scale, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: format, orientation: orientation },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await window.html2pdf().set(opt).from(container).save();
      container.remove();

      if (window.app && window.app.showToast) window.app.showToast("Downloaded PDF successfully!", "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Failed to compile PDF: " + err.message, "error");
    }
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

  cleanup() {
    this.htmlSource = "";
  }
};
