// OmniTool Hub - Protect & Unlock PDF Suite
// 100% Client-Side PDF password encryption and decryption with zero server data exposure.

import { escapeHtml } from './utils.js';

export default {
  id: "pdf-security",
  name: "Protect & Unlock PDF Suite",

  pdfDocBytes: null,
  fileName: "",
  fileSizeMb: "",
  activeTab: "protect", // 'protect' | 'unlock'
  pageCount: 0,
  isEncrypted: false,
  isProcessing: false,
  pdfJsDoc: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Encryption Controls (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 15px; display: flex; align-items: center; gap: 8px;">
                <span>🔒</span> PDF Security &amp; Passwords
              </h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Encrypt with AES passwords and permission locks, or strip passwords client-side.
              </p>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div id="security-suite-tabs-slot"></div>
              <button class="tool-btn secondary" id="sec-clear-btn" style="font-size: 11px; padding: 4px 10px; display: none;">Clear File</button>
            </div>
          </div>

          <!-- Mode Navigation Tabs -->
          <div style="display: flex; gap: 8px; margin-bottom: 14px;">
            <button type="button" class="tool-btn secondary sec-tab-btn active" data-tab="protect" style="flex: 1; font-size: 12px; padding: 8px 12px; font-weight: 700; border-color: var(--accent-cyan); color: var(--accent-cyan);">
              🔒 Protect PDF (Add Password)
            </button>
            <button type="button" class="tool-btn secondary sec-tab-btn" data-tab="unlock" style="flex: 1; font-size: 12px; padding: 8px 12px; font-weight: 700;">
              🔓 Unlock PDF (Remove Password)
            </button>
          </div>

          <!-- Document Upload Dropzone -->
          <div id="sec-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 32px 18px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 160px; margin-bottom: 14px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 40px; height: 40px; color: var(--accent-cyan); margin-bottom: 8px;">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <div style="font-size: 13.5px; font-weight: 700; color: var(--text-main); margin-bottom: 3px;">
              Drop PDF here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);" id="sec-dropzone-sub">
              Upload unprotected PDF to encrypt with strong password
            </div>
            <input type="file" id="sec-file-input" accept=".pdf,application/pdf" style="display: none;">
          </div>

          <!-- Active File Info Chip (Visible when file loaded) -->
          <div id="sec-file-card" style="display: none; background: rgba(0, 242, 254, 0.04); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 10px; padding: 10px 14px; margin-bottom: 14px; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
              <span style="font-size: 22px;">📄</span>
              <div style="overflow: hidden;">
                <div id="sec-file-name-text" style="font-size: 12.5px; font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"></div>
                <div id="sec-file-size-text" style="font-size: 11px; color: var(--text-muted);"></div>
              </div>
            </div>
            <button type="button" class="tool-btn secondary" id="sec-change-file-btn" style="font-size: 10.5px; padding: 3px 8px; flex-shrink: 0;">Change</button>
          </div>

          <!-- Tab Content 1: Protect Form -->
          <div id="sec-protect-view" class="sec-view" style="display: flex; flex-direction: column; gap: 14px;">
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 12px;">
              <span style="font-size: 11.5px; font-weight: 750; color: var(--text-main); letter-spacing: 0.5px;">ENCRYPTION CREDENTIALS</span>

              <div style="display: flex; flex-direction: column; gap: 10px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                  Set Document Password
                  <div style="position: relative; display: flex; align-items: center;">
                    <input type="password" id="sec-password-input" class="tool-input" placeholder="Enter strong password..." style="padding: 8px 36px 8px 12px; font-size: 12px; width: 100%;">
                    <button type="button" id="sec-toggle-pass" style="position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; display: flex; align-items: center;" title="Show/Hide Password">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                  </div>
                </label>

                <!-- Password Strength Meter -->
                <div style="display: flex; flex-direction: column; gap: 4px; margin-top: -4px;">
                  <div style="display: flex; justify-content: space-between; font-size: 10px;">
                    <span style="color: var(--text-muted);">Strength:</span>
                    <span id="sec-strength-label" style="font-weight: 700; color: var(--text-muted);">Empty</span>
                  </div>
                  <div style="height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden;">
                    <div id="sec-strength-bar" style="height: 100%; width: 0%; background: #9ca3af; transition: all 0.3s ease;"></div>
                  </div>
                </div>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                  Confirm Password
                  <div style="position: relative; display: flex; align-items: center;">
                    <input type="password" id="sec-confirm-input" class="tool-input" placeholder="Re-type password..." style="padding: 8px 36px 8px 12px; font-size: 12px; width: 100%;">
                    <button type="button" id="sec-toggle-conf" style="position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; display: flex; align-items: center;" title="Show/Hide Password">
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                  </div>
                </label>
                <div id="sec-match-chip" style="font-size: 10px; color: #f43f5e; display: none;">Passwords do not match</div>
              </div>

              <!-- Granular Permission Restrictions -->
              <div style="display: flex; flex-direction: column; gap: 8px; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 4px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 11px; font-weight: 750; color: var(--text-main);">Granular Permissions</span>
                  <span style="font-size: 9.5px; color: var(--text-muted);">Standard ISO 32000 Flags</span>
                </div>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="sec-restrict-print" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                  <span>Allow High-Resolution Printing</span>
                </label>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="sec-restrict-copy" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                  <span>Allow Content Copying &amp; Extraction</span>
                </label>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="sec-restrict-forms" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                  <span>Allow Form Filling &amp; Digital Signing</span>
                </label>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="sec-restrict-annotate" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                  <span>Allow Comments &amp; Annotations</span>
                </label>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--text-main); cursor: pointer;">
                  <input type="checkbox" id="sec-restrict-mod" style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                  <span>Allow Page Assembly &amp; Content Modification</span>
                </label>
              </div>
            </div>

            <button type="button" class="tool-btn primary" id="sec-protect-btn" disabled style="font-size: 13.5px; padding: 11px 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;">
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
              <span style="font-size: 11.5px; font-weight: 750; color: var(--text-main); letter-spacing: 0.5px;">DECRYPTION CREDENTIALS</span>

              <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                Enter Current PDF Password
                <div style="position: relative; display: flex; align-items: center;">
                  <input type="password" id="sec-unlock-pass-input" class="tool-input" placeholder="Enter existing password..." style="padding: 8px 36px 8px 12px; font-size: 12px; width: 100%;">
                  <button type="button" id="sec-toggle-unlock-pass" style="position: absolute; right: 8px; background: none; border: none; cursor: pointer; color: var(--text-muted); padding: 4px; display: flex; align-items: center;" title="Show/Hide Password">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </div>
              </label>

              <div style="padding: 10px 12px; background: rgba(16, 185, 129, 0.06); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
                💡 <strong style="color: #34d399;">Permanent Removal:</strong> Authenticating with your password allows the browser engine to reconstruct a clean unencrypted document, permanently removing viewer prompts and restrictions.
              </div>
            </div>

            <button type="button" class="tool-btn accent-emerald" id="sec-unlock-btn" disabled style="font-size: 13.5px; padding: 11px 18px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700;">
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
            <h3 style="margin: 0; font-size: 15px; display: flex; align-items: center; gap: 8px;">
              <span>👁️</span> Document Preview &amp; Diagnostics
            </h3>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span id="sec-status-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;">Idle</span>
            </div>
          </div>

          <!-- Dedicated Visual Preview Stage -->
          <div class="preview-area-container" style="flex: 1; min-height: 280px; display: flex; flex-direction: column; justify-content: center; position: relative; margin-bottom: 12px;">
            <div id="visual-preview-stage" style="flex: 1; border-radius: 10px; display: flex; align-items: center; justify-content: center; min-height: 260px; background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); overflow: hidden; position: relative;">
              <!-- Default Idle State Card -->
              <div id="sec-stage-idle" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 24px;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.25); display: flex; align-items: center; justify-content: center; color: var(--accent-cyan);">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <div>
                  <div style="font-size: 14px; font-weight: 750; color: var(--text-main); margin-bottom: 4px;">Client-Side Cryptographic Vault</div>
                  <div style="font-size: 11.5px; color: var(--text-muted); max-width: 320px; line-height: 1.5;">
                    Upload any PDF document on the left to inspect its encryption headers and render an instant page preview.
                  </div>
                </div>
              </div>

              <!-- Vault Padlock State (Shown for encrypted PDF awaiting password) -->
              <div id="sec-stage-vault" style="display: none; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 12px; padding: 24px;">
                <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.35); display: flex; align-items: center; justify-content: center; color: #fb7185; animation: pulse 2s infinite;">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <div>
                  <div style="font-size: 14px; font-weight: 750; color: #fb7185; margin-bottom: 4px;">Password Protected Document</div>
                  <div style="font-size: 11.5px; color: var(--text-muted); max-width: 300px; line-height: 1.5;">
                    Document streams are locked. Enter your password in the "Unlock PDF" tab to authenticate and render pages.
                  </div>
                </div>
              </div>

              <!-- Live Visual PDF Canvas Preview Container -->
              <div id="sec-stage-canvas-wrap" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center; position: relative; padding: 14px; box-sizing: border-box;">
                <canvas id="sec-preview-canvas" style="max-width: 100%; max-height: 380px; object-fit: contain; border-radius: 6px; box-shadow: 0 8px 24px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);"></canvas>
                <div id="sec-canvas-overlay-tag" style="position: absolute; bottom: 18px; left: 18px; font-size: 10px; font-weight: 700; background: rgba(7, 10, 18, 0.85); backdrop-filter: blur(8px); border: 1px solid var(--border-color); padding: 3px 8px; border-radius: 4px; color: var(--text-main);">
                  Page 1 Preview
                </div>
              </div>
            </div>
          </div>

          <!-- Document Inspection & Security Diagnostics Card -->
          <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11px; font-weight: 750; color: var(--text-main); letter-spacing: 0.5px;">DOCUMENT AUDIT &amp; TELEMETRY</span>
              <span id="sec-cipher-badge" style="font-size: 10px; color: var(--accent-cyan); font-family: var(--font-mono);">AES Standard</span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; font-size: 11px;">
              <div style="background: rgba(0,0,0,0.2); padding: 8px 10px; border-radius: 6px; border: 1px solid var(--border-color);">
                <div style="color: var(--text-muted); font-size: 10px;">Document Name</div>
                <div id="sec-meta-filename" style="font-weight: 700; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px;">No document</div>
              </div>
              <div style="background: rgba(0,0,0,0.2); padding: 8px 10px; border-radius: 6px; border: 1px solid var(--border-color);">
                <div style="color: var(--text-muted); font-size: 10px;">File Size &amp; Pages</div>
                <div id="sec-meta-size" style="font-weight: 700; color: var(--text-main); margin-top: 2px;">0 MB • 0 Pages</div>
              </div>
            </div>

            <div style="padding: 10px 12px; border-radius: 8px; background: rgba(0, 242, 254, 0.04); border: 1px solid rgba(0, 242, 254, 0.15); font-size: 11px; color: var(--text-muted); line-height: 1.45;">
              <strong style="color: var(--accent-cyan);">🛡️ Zero Server Telemetry:</strong> All cryptographic operations execute exclusively within client-side WebAssembly &amp; WebCrypto. Passwords and decrypted byte streams never leave your device.
            </div>
          </div>
        </div>

        <!-- 3. Full-Width Quick Guide Card (Standard Layout Compliance) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: PDF Security &amp; Password Cryptography</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <span class="tool-guide-step-num">1</span>
              <div class="tool-guide-step-text">
                <strong>Choose Security Mode</strong>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">Select "Protect PDF" to encrypt an open document, or "Unlock PDF" to strip passwords.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <span class="tool-guide-step-num">2</span>
              <div class="tool-guide-step-text">
                <strong>Configure Passwords &amp; Permissions</strong>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">Set a strong password and customize granular permissions for printing, copying, and form editing.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <span class="tool-guide-step-num">3</span>
              <div class="tool-guide-step-text">
                <strong>100% In-Memory Processing</strong>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">Documents are encrypted or decrypted entirely inside your browser's private WebAssembly memory.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <span class="tool-guide-step-num">4</span>
              <div class="tool-guide-step-text">
                <strong>Download Hardened Document</strong>
                <p style="margin: 2px 0 0 0; font-size: 12px; color: var(--text-muted);">Download the hardened or decrypted PDF instantly with zero server telemetry or logging.</p>
              </div>
            </div>
          </div>
          <div class="tool-guide-benefits" style="margin-top: 18px; padding-top: 14px; border-top: 1px dashed rgba(255, 255, 255, 0.08); font-size: 12.5px; line-height: 1.5; color: var(--text-muted); text-align: left;">
            <strong style="color: var(--accent-cyan); display: block; margin-bottom: 6px; font-size: 13px;">💡 How it Benefits You:</strong>
            <ul style="margin: 0; padding-left: 18px; list-style-type: disc; display: flex; flex-direction: column; gap: 6px;">
              <li><strong>Cryptographic Protection &amp; Unlock</strong>: Secure documents with AES passwords and permission locks, or remove restrictions instantly.</li>
              <li><strong>Zero-Cloud Privacy</strong>: All document rendering, parsing, and conversions occur 100% locally in your browser memory.</li>
            </ul>
            <div style="margin-top: 14px; padding-top: 10px; border-top: 1px dashed rgba(255, 255, 255, 0.05);">
              <a href="guides/pdf-security-suite.html#pdf-security" target="_blank" style="display: inline-flex; align-items: center; gap: 6px; color: var(--accent-cyan); text-decoration: none; font-size: 12.5px; font-weight: 600;">
                <span>📖 Read Detailed PDF Security &amp; Archival Guide</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
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
    this.changeFileBtn = container.querySelector('#sec-change-file-btn');
    this.fileCard = container.querySelector('#sec-file-card');
    this.fileNameText = container.querySelector('#sec-file-name-text');
    this.fileSizeText = container.querySelector('#sec-file-size-text');

    this.tabBtns = container.querySelectorAll('.sec-tab-btn');
    this.protectView = container.querySelector('#sec-protect-view');
    this.unlockView = container.querySelector('#sec-unlock-view');

    this.passwordInput = container.querySelector('#sec-password-input');
    this.confirmInput = container.querySelector('#sec-confirm-input');
    this.protectBtn = container.querySelector('#sec-protect-btn');
    this.togglePassBtn = container.querySelector('#sec-toggle-pass');
    this.toggleConfBtn = container.querySelector('#sec-toggle-conf');
    this.strengthBar = container.querySelector('#sec-strength-bar');
    this.strengthLabel = container.querySelector('#sec-strength-label');
    this.matchChip = container.querySelector('#sec-match-chip');

    this.unlockPassInput = container.querySelector('#sec-unlock-pass-input');
    this.unlockBtn = container.querySelector('#sec-unlock-btn');
    this.toggleUnlockPassBtn = container.querySelector('#sec-toggle-unlock-pass');

    this.statusBadge = container.querySelector('#sec-status-badge');
    this.cipherBadge = container.querySelector('#sec-cipher-badge');
    this.metaFilename = container.querySelector('#sec-meta-filename');
    this.metaSize = container.querySelector('#sec-meta-size');

    this.stageIdle = container.querySelector('#sec-stage-idle');
    this.stageVault = container.querySelector('#sec-stage-vault');
    this.stageCanvasWrap = container.querySelector('#sec-stage-canvas-wrap');
    this.previewCanvas = container.querySelector('#sec-preview-canvas');
    this.canvasOverlayTag = container.querySelector('#sec-canvas-overlay-tag');

    // Tab switching (Protect vs Unlock)
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
          'Upload password-protected PDF to authenticate and strip password';

        this.validateInputs();
        this.updateStageView();
      });
    });

    // Password Show/Hide toggles
    this.bindPasswordToggle(this.togglePassBtn, this.passwordInput);
    this.bindPasswordToggle(this.toggleConfBtn, this.confirmInput);
    this.bindPasswordToggle(this.toggleUnlockPassBtn, this.unlockPassInput);

    // File input handlers
    this.dropzone.addEventListener('click', () => this.fileInput.click());
    this.changeFileBtn?.addEventListener('click', () => this.fileInput.click());
    this.clearBtn?.addEventListener('click', () => this.resetDoc());

    // Drag and Drop
    this.dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dropzone.style.borderColor = 'var(--accent-cyan)';
      this.dropzone.style.background = 'rgba(0, 242, 254, 0.05)';
    });
    this.dropzone.addEventListener('dragleave', () => {
      this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)';
      this.dropzone.style.background = 'rgba(255, 255, 255, 0.02)';
    });
    this.dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)';
      this.dropzone.style.background = 'rgba(255, 255, 255, 0.02)';
      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        this.loadFile(e.dataTransfer.files[0]);
      }
    });
    this.fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        this.loadFile(e.target.files[0]);
      }
    });

    // Input validations & strength check
    this.passwordInput.addEventListener('input', () => {
      this.checkPasswordStrength(this.passwordInput.value);
      this.validateInputs();
    });
    this.confirmInput.addEventListener('input', () => this.validateInputs());
    this.unlockPassInput.addEventListener('input', () => this.validateInputs());

    // Action button clicks
    this.protectBtn.addEventListener('click', () => this.protectPdf());
    this.unlockBtn.addEventListener('click', () => this.unlockPdf());
  },

  bindPasswordToggle(button, input) {
    if (!button || !input) return;
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      button.innerHTML = isPassword ?
        `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>` :
        `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
    });
  },

  checkPasswordStrength(pwd) {
    if (!pwd) {
      this.strengthBar.style.width = '0%';
      this.strengthBar.style.background = '#9ca3af';
      this.strengthLabel.textContent = 'Empty';
      this.strengthLabel.style.color = '#9ca3af';
      return;
    }
    let score = 0;
    if (pwd.length >= 6) score += 25;
    if (pwd.length >= 10) score += 25;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 20;
    if (/[0-9]/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;

    if (score < 40) {
      this.strengthBar.style.width = '30%';
      this.strengthBar.style.background = '#f43f5e';
      this.strengthLabel.textContent = 'Weak';
      this.strengthLabel.style.color = '#f43f5e';
    } else if (score < 70) {
      this.strengthBar.style.width = '60%';
      this.strengthBar.style.background = '#f59e0b';
      this.strengthLabel.textContent = 'Medium';
      this.strengthLabel.style.color = '#f59e0b';
    } else if (score < 90) {
      this.strengthBar.style.width = '85%';
      this.strengthBar.style.background = '#10b981';
      this.strengthLabel.textContent = 'Strong';
      this.strengthLabel.style.color = '#10b981';
    } else {
      this.strengthBar.style.width = '100%';
      this.strengthBar.style.background = '#00f2fe';
      this.strengthLabel.textContent = 'Military-Grade AES';
      this.strengthLabel.style.color = '#00f2fe';
    }
  },

  async loadFile(file) {
    if (!file || file.type !== 'application/pdf') {
      this.app?.showToast?.("Please choose a valid PDF file.", "warning");
      return;
    }

    try {
      this.pdfDocBytes = await file.arrayBuffer();
      this.fileName = file.name.replace(/\.[^/.]+$/, "");
      this.fileSizeMb = (file.size / (1024 * 1024)).toFixed(2);

      // UI updates
      this.dropzone.style.display = 'none';
      this.fileCard.style.display = 'flex';
      this.fileNameText.textContent = file.name;
      this.fileSizeText.textContent = `${this.fileSizeMb} MB`;
      this.clearBtn.style.display = 'inline-block';

      this.metaFilename.textContent = file.name;
      this.statusBadge.textContent = "Analyzing...";

      await this.ensurePdfJs();

      // Check whether document is encrypted using PDF.js
      try {
        const loadingTask = window.pdfjsLib.getDocument({
          data: this.pdfDocBytes.slice(0),
          stopAtErrors: false
        });

        this.pdfJsDoc = await loadingTask.promise;
        this.pageCount = this.pdfJsDoc.numPages;
        this.isEncrypted = false;
        this.statusBadge.textContent = "Unprotected";
        this.statusBadge.style.color = "#10b981";
        this.cipherBadge.textContent = "Unencrypted (Ready to Protect)";
        this.metaSize.textContent = `${this.fileSizeMb} MB • ${this.pageCount} Pages`;

        // Render page 1 preview
        await this.renderPagePreview(1);

      } catch (err) {
        if (err.name === 'PasswordException') {
          // Encrypted document!
          this.isEncrypted = true;
          this.statusBadge.textContent = "Encrypted 🔒";
          this.statusBadge.style.color = "#f43f5e";
          this.cipherBadge.textContent = "Password Protected";
          this.metaSize.textContent = `${this.fileSizeMb} MB • Locked`;

          if (this.activeTab !== 'unlock') {
            this.app?.showToast?.("Encrypted PDF detected. Switched to 'Unlock PDF' tab.", "info");
            const unlockTabBtn = this.container.querySelector('.sec-tab-btn[data-tab="unlock"]');
            unlockTabBtn?.click();
          }
        } else {
          console.warn("PDF inspection note:", err);
          this.metaSize.textContent = `${this.fileSizeMb} MB • Ready`;
          this.statusBadge.textContent = "Loaded";
        }
      }

      this.updateStageView();
      this.validateInputs();
      this.app?.showToast?.(`Loaded "${file.name}"`, "success");

    } catch (err) {
      console.error("PDF load error:", err);
      this.app?.showToast?.("Failed to read PDF file.", "error");
    }
  },

  async renderPagePreview(pageNum = 1) {
    if (!this.pdfJsDoc) return;
    try {
      const page = await this.pdfJsDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = this.previewCanvas;
      if (!canvas) return;

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;

      this.canvasOverlayTag.textContent = `Page ${pageNum} of ${this.pageCount}`;
      this.stageCanvasWrap.style.display = 'flex';
      this.stageIdle.style.display = 'none';
      this.stageVault.style.display = 'none';
    } catch (e) {
      console.error("Page render preview error:", e);
    }
  },

  updateStageView() {
    if (!this.pdfDocBytes) {
      this.stageIdle.style.display = 'flex';
      this.stageVault.style.display = 'none';
      this.stageCanvasWrap.style.display = 'none';
      return;
    }

    if (this.isEncrypted) {
      this.stageIdle.style.display = 'none';
      this.stageVault.style.display = 'flex';
      this.stageCanvasWrap.style.display = 'none';
    } else {
      this.stageIdle.style.display = 'none';
      this.stageVault.style.display = 'none';
      this.stageCanvasWrap.style.display = 'flex';
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
      const match = pass && pass === conf;
      const validLen = pass.length >= 3;

      if (conf && pass !== conf) {
        this.matchChip.style.display = 'block';
      } else {
        this.matchChip.style.display = 'none';
      }

      this.protectBtn.disabled = !match || !validLen;
    } else {
      const pass = this.unlockPassInput.value;
      this.unlockBtn.disabled = !pass;
    }
  },

  async protectPdf() {
    if (!this.pdfDocBytes || this.isProcessing) return;

    const pass = this.passwordInput.value;
    const conf = this.confirmInput.value;

    if (pass !== conf) {
      this.app?.showToast?.("Passwords do not match.", "warning");
      return;
    }

    if (pass.length < 3) {
      this.app?.showToast?.("Password should be at least 3 characters.", "warning");
      return;
    }

    try {
      this.isProcessing = true;
      this.protectBtn.disabled = true;
      this.protectBtn.innerHTML = `
        <span style="display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: sec-spin 0.8s linear infinite;"></span>
        <span>Encrypting Document...</span>
      `;

      await this.ensurePdfLib();
      await this.ensurePdfEncryptLite();

      // Read granular permission flags from checkboxes
      const allowPrinting = this.container.querySelector('#sec-restrict-print')?.checked ?? true;
      const allowCopying = this.container.querySelector('#sec-restrict-copy')?.checked ?? true;
      const allowFillingForms = this.container.querySelector('#sec-restrict-forms')?.checked ?? true;
      const allowAnnotating = this.container.querySelector('#sec-restrict-annotate')?.checked ?? true;
      const allowModifying = this.container.querySelector('#sec-restrict-mod')?.checked ?? false;

      // Standardize document stream with PDFLib first
      const pdfDoc = await window.PDFLib.PDFDocument.load(this.pdfDocBytes.slice(0), {
        ignoreEncryption: true
      });
      const pdfBytes = await pdfDoc.save();

      // Apply client-side encryption using PDFEncryptLite
      const encryptedBytes = await window.PDFEncryptLite.encryptPDF(pdfBytes, pass, {
        ownerPassword: conf || pass,
        allowPrinting,
        allowCopying,
        allowFillingForms,
        allowAnnotating,
        allowModifying
      });

      // Download encrypted version
      const blob = new Blob([encryptedBytes], { type: 'application/pdf' });
      const filename = `${this.fileName}-protected.pdf`;
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 60000);

      this.app?.showToast?.(`Encrypted PDF downloaded: ${filename}!`, "success");
      this.statusBadge.textContent = "Hardened & Encrypted";
      this.statusBadge.style.color = "#00f2fe";

    } catch (err) {
      console.error("Encryption error:", err);
      this.app?.showToast?.(`Encryption failed: ${err.message}`, "error");
    } finally {
      this.isProcessing = false;
      this.protectBtn.disabled = false;
      this.protectBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Encrypt &amp; Download Protected PDF</span>
      `;
    }
  },

  async unlockPdf() {
    if (!this.pdfDocBytes || this.isProcessing) return;

    const password = this.unlockPassInput.value;
    if (!password) {
      this.app?.showToast?.("Please enter the document password.", "warning");
      return;
    }

    try {
      this.isProcessing = true;
      this.unlockBtn.disabled = true;
      this.unlockBtn.innerHTML = `
        <span style="display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: sec-spin 0.8s linear infinite;"></span>
        <span>Decrypting Streams...</span>
      `;

      await this.ensurePdfJs();
      await this.ensurePdfLib();

      // Authenticate password with PDF.js
      let decryptedPdf;
      try {
        const loadingTask = window.pdfjsLib.getDocument({
          data: this.pdfDocBytes.slice(0),
          password: password,
          stopAtErrors: false
        });
        decryptedPdf = await loadingTask.promise;
      } catch (authErr) {
        if (authErr.name === 'PasswordException') {
          throw new Error("Incorrect password. Please verify and try again.");
        }
        throw new Error(authErr.message || "Failed to authenticate document password.");
      }

      const pageCount = decryptedPdf.numPages;
      const newDoc = await window.PDFLib.PDFDocument.create();

      // Render decrypted pages into pristine unencrypted PDF container
      for (let i = 1; i <= pageCount; i++) {
        const page = await decryptedPdf.getPage(i);
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

      const unlockedBytes = await newDoc.save();
      const blob = new Blob([unlockedBytes], { type: 'application/pdf' });
      const filename = `${this.fileName}-unlocked.pdf`;
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 60000);

      this.app?.showToast?.(`Unlocked PDF downloaded: ${filename}!`, "success");

      // Update status & preview stage
      this.isEncrypted = false;
      this.pdfJsDoc = decryptedPdf;
      this.pageCount = pageCount;
      this.statusBadge.textContent = "Unlocked & Stripped";
      this.statusBadge.style.color = "#10b981";
      this.cipherBadge.textContent = "Unrestricted Access";
      this.metaSize.textContent = `${this.fileSizeMb} MB • ${pageCount} Pages`;
      await this.renderPagePreview(1);

    } catch (err) {
      console.error("Unlock error:", err);
      this.app?.showToast?.(err.message, "error");
    } finally {
      this.isProcessing = false;
      this.unlockBtn.disabled = false;
      this.unlockBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
        </svg>
        <span>Decrypt &amp; Download Unlocked PDF</span>
      `;
    }
  },

  resetDoc() {
    this.pdfDocBytes = null;
    this.fileName = "";
    this.fileSizeMb = "";
    this.pageCount = 0;
    this.isEncrypted = false;
    this.pdfJsDoc = null;

    this.dropzone.style.display = 'flex';
    this.fileCard.style.display = 'none';
    this.clearBtn.style.display = 'none';
    this.fileInput.value = "";

    this.passwordInput.value = "";
    this.confirmInput.value = "";
    this.unlockPassInput.value = "";
    this.matchChip.style.display = 'none';
    this.checkPasswordStrength("");

    this.metaFilename.textContent = "No document";
    this.metaSize.textContent = "0 MB • 0 Pages";
    this.statusBadge.textContent = "Idle";
    this.statusBadge.style.color = "var(--accent-cyan)";
    this.cipherBadge.textContent = "AES Standard";

    this.updateStageView();
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

  ensurePdfEncryptLite() {
    return new Promise((resolve, reject) => {
      if (window.PDFEncryptLite) return resolve(window.PDFEncryptLite);
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/@pdfsmaller/pdf-encrypt-lite/dist/pdf-encrypt-lite.umd.js";
      script.onload = () => resolve(window.PDFEncryptLite);
      script.onerror = () => reject(new Error("Failed to load PDF encryption engine"));
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
      script.onerror = () => reject(new Error("Failed to load PDF engine"));
      document.head.appendChild(script);
    });
  },

  cleanup() {
    this.pdfDocBytes = null;
    this.pdfJsDoc = null;
  }
};
