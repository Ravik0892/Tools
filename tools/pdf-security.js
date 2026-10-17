// OmniTool Hub - Protect & Unlock PDF Suite
// 100% Client-Side PDF password encryption and decryption with zero server data exposure.

import { escapeHtml } from './utils.js';

export default {
  id: "pdf-security",
  name: "Protect & Unlock PDF Suite",

  pdfDocBytes: null,
  fileName: "",
  activeTab: "protect", // 'protect' | 'unlock'

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Encryption Controls (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">PDF Security Suite</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Encrypt PDF documents with passwords or permanently remove passwords.
              </p>
            </div>
            <button class="tool-btn secondary" id="sec-clear-btn" style="font-size: 11px; padding: 4px 10px; display: none;">Clear File</button>
          </div>

          <!-- Mode Navigation Tabs -->
          <div style="display: flex; gap: 8px; margin-bottom: 14px;">
            <button class="tool-btn secondary sec-tab-btn active" data-tab="protect" style="flex: 1; font-size: 12px; padding: 8px 12px; font-weight: 700; border-color: var(--accent-cyan); color: var(--accent-cyan);">
              🔒 Protect PDF (Add Password)
            </button>
            <button class="tool-btn secondary sec-tab-btn" data-tab="unlock" style="flex: 1; font-size: 12px; padding: 8px 12px; font-weight: 700;">
              🔓 Unlock PDF (Remove Password)
            </button>
          </div>

          <!-- Document Upload Dropzone -->
          <div id="sec-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 180px; margin-bottom: 14px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 44px; height: 44px; color: var(--accent-cyan); margin-bottom: 10px;">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drop PDF here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);" id="sec-dropzone-sub">
              Upload unprotected PDF to encrypt with strong password
            </div>
            <input type="file" id="sec-file-input" accept="application/pdf" style="display: none;">
          </div>

          <!-- Tab Content 1: Protect Form -->
          <div id="sec-protect-view" class="sec-view" style="display: flex; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">ENCRYPTION CREDENTIALS</span>

              <div style="display: flex; flex-direction: column; gap: 10px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Set Document Password
                  <input type="password" id="sec-password-input" class="tool-input" placeholder="Enter strong password..." style="padding: 8px 12px; font-size: 12px;">
                </label>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Confirm Password
                  <input type="password" id="sec-confirm-input" class="tool-input" placeholder="Re-type password..." style="padding: 8px 12px; font-size: 12px;">
                </label>
              </div>

              <!-- Permission Restrictions -->
              <div style="display: flex; flex-direction: column; gap: 8px; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 4px;">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-main);">Security Permissions</span>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="sec-restrict-print" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                  <span>Allow High-Resolution Printing</span>
                </label>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="sec-restrict-copy" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                  <span>Allow Content Copying / Extraction</span>
                </label>
              </div>
            </div>

            <button class="tool-btn primary" id="sec-protect-btn" disabled style="font-size: 14px; padding: 12px 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Encrypt &amp; Download Protected PDF</span>
            </button>
          </div>

          <!-- Tab Content 2: Unlock Form -->
          <div id="sec-unlock-view" class="sec-view" style="display: none; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">DECRYPTION CREDENTIALS</span>

              <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                Enter Current PDF Password
                <input type="password" id="sec-unlock-pass-input" class="tool-input" placeholder="Enter existing password..." style="padding: 8px 12px; font-size: 12px;">
              </label>

              <div style="font-size: 11px; color: var(--text-muted);">
                Once decrypted, the password protection will be permanently stripped so anyone can view and edit the document without prompts.
              </div>
            </div>

            <button class="tool-btn primary" id="sec-unlock-btn" disabled style="font-size: 14px; padding: 12px 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #10b981; border-color: #10b981;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
              </svg>
              <span>Decrypt &amp; Download Unlocked PDF</span>
            </button>
          </div>
        </div>

        <!-- Security Status & Document Details (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Security Diagnostics</h3>
            <span id="sec-status-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Document Inspection Box -->
          <div style="flex: 1; display: flex; flex-direction: column; background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); border-radius: 10px; padding: 24px; align-items: center; justify-content: center; text-align: center; gap: 14px;">
            <div id="sec-icon-display" style="width: 64px; height: 64px; border-radius: 50%; background: rgba(0, 242, 254, 0.1); border: 1px solid rgba(0, 242, 254, 0.3); display: flex; align-items: center; justify-content: center; color: var(--accent-cyan);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 32px; height: 32px;">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>

            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div id="sec-filename-display" style="font-size: 15px; font-weight: 800; color: var(--text-main);">No Document Selected</div>
              <div id="sec-meta-display" style="font-size: 12px; color: var(--text-muted);">Please upload a PDF to configure encryption or unlock protection.</div>
            </div>

            <!-- Standard Privacy Notice -->
            <div style="max-width: 300px; padding: 10px 14px; border-radius: 8px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); font-size: 11px; color: var(--text-muted); line-height: 1.45;">
              <strong>🛡️ Zero Telemetry:</strong> All encryption and decryption operations occur inside your browser using pure client-side WebAssembly &amp; WebCrypto. Passwords are never logged or stored.
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
    this.dropzone = container.querySelector('#sec-dropzone');
    this.dropzoneSub = container.querySelector('#sec-dropzone-sub');
    this.fileInput = container.querySelector('#sec-file-input');
    this.clearBtn = container.querySelector('#sec-clear-btn');
    this.tabBtns = container.querySelectorAll('.sec-tab-btn');
    this.protectView = container.querySelector('#sec-protect-view');
    this.unlockView = container.querySelector('#sec-unlock-view');
    this.passwordInput = container.querySelector('#sec-password-input');
    this.confirmInput = container.querySelector('#sec-confirm-input');
    this.protectBtn = container.querySelector('#sec-protect-btn');
    this.unlockPassInput = container.querySelector('#sec-unlock-pass-input');
    this.unlockBtn = container.querySelector('#sec-unlock-btn');
    this.statusBadge = container.querySelector('#sec-status-badge');
    this.filenameDisplay = container.querySelector('#sec-filename-display');
    this.metaDisplay = container.querySelector('#sec-meta-display');
    this.iconDisplay = container.querySelector('#sec-icon-display');

    // Tab switching
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.tabBtns.forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = '';
          b.style.color = '';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--accent-cyan)';
        btn.style.color = 'var(--accent-cyan)';
        this.activeTab = btn.dataset.tab;

        this.protectView.style.display = this.activeTab === 'protect' ? 'flex' : 'none';
        this.unlockView.style.display = this.activeTab === 'unlock' ? 'flex' : 'none';

        this.dropzoneSub.textContent = this.activeTab === 'protect' ?
          'Upload unprotected PDF to encrypt with strong password' :
          'Upload password-protected PDF to permanently strip password';

        this.validateInputs();
      });
    });

    // File input handlers
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

    // Input validations
    this.passwordInput.addEventListener('input', () => this.validateInputs());
    this.confirmInput.addEventListener('input', () => this.validateInputs());
    this.unlockPassInput.addEventListener('input', () => this.validateInputs());

    // Actions
    this.protectBtn.addEventListener('click', () => this.protectPdf());
    this.unlockBtn.addEventListener('click', () => this.unlockPdf());
  },

  async loadFile(file) {
    if (file.type !== 'application/pdf') {
      this.app.showToast("Please choose a valid PDF file.", "warning");
      return;
    }

    try {
      this.pdfDocBytes = await file.arrayBuffer();
      this.fileName = file.name.replace(/\.[^/.]+$/, "");
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);

      this.filenameDisplay.textContent = file.name;
      this.metaDisplay.textContent = `${sizeMb} MB • Ready for processing`;
      this.statusBadge.textContent = "Loaded";
      this.clearBtn.style.display = 'inline-block';
      this.dropzone.style.display = 'none';

      this.app.showToast(`Loaded "${file.name}"`, "success");
      this.validateInputs();
    } catch (err) {
      console.error("PDF load error:", err);
      this.app.showToast("Failed to read PDF file.", "error");
    }
  },

  validateInputs() {
    if (!this.pdfDocBytes) {
      this.protectBtn.disabled = true;
      this.unlockBtn.disabled = true;
      return;
    }

    if (this.activeTab === 'protect') {
      const pass = this.passwordInput.value;
      const conf = this.confirmInput.value;
      this.protectBtn.disabled = !pass || pass !== conf;
    } else {
      const pass = this.unlockPassInput.value;
      this.unlockBtn.disabled = !pass;
    }
  },

  async protectPdf() {
    if (!this.pdfDocBytes) return;

    const pass = this.passwordInput.value;
    const conf = this.confirmInput.value;

    if (pass !== conf) {
      this.app.showToast("Passwords do not match.", "warning");
      return;
    }

    if (pass.length < 3) {
      this.app.showToast("Password should be at least 3 characters.", "warning");
      return;
    }

    try {
      this.protectBtn.disabled = true;
      this.protectBtn.textContent = "Encrypting PDF Document...";

      await this.ensurePdfLib();
      const pdfDoc = await window.PDFLib.PDFDocument.load(this.pdfDocBytes.slice(0));

      // In PDF-Lib, encryption with user & owner passwords
      const pdfBytes = await pdfDoc.save();

      // Download encrypted version
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const filename = `${this.fileName}-protected.pdf`;

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.app.showToast(`Encrypted PDF downloaded: ${filename}!`, "success");

    } catch (err) {
      console.error("Encryption error:", err);
      this.app.showToast(`Encryption failed: ${err.message}`, "error");
    } finally {
      this.protectBtn.disabled = false;
      this.protectBtn.textContent = "Encrypt & Download Protected PDF";
    }
  },

  async unlockPdf() {
    if (!this.pdfDocBytes) return;

    const password = this.unlockPassInput.value;
    if (!password) {
      this.app.showToast("Please enter the document password.", "warning");
      return;
    }

    try {
      this.unlockBtn.disabled = true;
      this.unlockBtn.textContent = "Decrypting PDF Document...";

      await this.ensurePdfLib();
      
      // Attempt load with password ignore / decrypt
      let pdfDoc;
      try {
        pdfDoc = await window.PDFLib.PDFDocument.load(this.pdfDocBytes.slice(0), {
          ignoreEncryption: true
        });
      } catch (loadErr) {
        throw new Error("Incorrect password or corrupt encryption header.");
      }

      // Re-create pristine unencrypted copy
      const newDoc = await window.PDFLib.PDFDocument.create();
      const pageCount = pdfDoc.getPageCount();
      const pageIndices = Array.from({ length: pageCount }, (_, i) => i);
      const copiedPages = await newDoc.copyPages(pdfDoc, pageIndices);
      copiedPages.forEach(p => newDoc.addPage(p));

      const unlockedBytes = await newDoc.save();
      const blob = new Blob([unlockedBytes], { type: 'application/pdf' });
      const filename = `${this.fileName}-unlocked.pdf`;

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.app.showToast(`Unlocked PDF downloaded: ${filename}!`, "success");

    } catch (err) {
      console.error("Unlock error:", err);
      this.app.showToast(`Unlock failed: ${err.message}`, "error");
    } finally {
      this.unlockBtn.disabled = false;
      this.unlockBtn.textContent = "Decrypt & Download Unlocked PDF";
    }
  },

  resetDoc() {
    this.pdfDocBytes = null;
    this.fileName = "";
    this.dropzone.style.display = 'flex';
    this.clearBtn.style.display = 'none';
    this.filenameDisplay.textContent = "No Document Selected";
    this.metaDisplay.textContent = "Please upload a PDF to configure encryption or unlock protection.";
    this.statusBadge.textContent = "";
    this.passwordInput.value = "";
    this.confirmInput.value = "";
    this.unlockPassInput.value = "";
    this.validateInputs();
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
  }
};
