// OmniTool Hub - PDF Form Filler & AcroForm Editor
// 100% Client-Side PDF form field inspection, population, and flattening using pdf-lib.

import { escapeHtml } from './utils.js';

export default {
  id: "pdf-forms",
  name: "PDF Form Filler",

  pdfDocBytes: null,
  fileName: "",
  formFields: [], // { name, type, value, options }
  hasAcroForm: false,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Form Fields Editor Panel (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">PDF Form Filler</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Fill interactive AcroForm fields, checkboxes, and text inputs without Adobe Acrobat.
              </p>
            </div>
            <button class="tool-btn secondary" id="pf-clear-btn" style="font-size: 11px; padding: 4px 10px; display: none;">New Form</button>
          </div>

          <!-- Upload Dropzone -->
          <div id="pf-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 180px; margin-bottom: 14px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 44px; height: 44px; color: var(--accent-cyan); margin-bottom: 10px;">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drop interactive PDF form here, or click to browse
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              Tax forms, job applications, NDAs, rental agreements.
            </div>
            <input type="file" id="pf-file-input" accept="application/pdf" style="display: none;">
          </div>

          <!-- Dynamic Form Inputs Container -->
          <div id="pf-fields-container" style="display: none; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span id="pf-field-count-label" style="font-size: 12px; font-weight: 700; color: var(--accent-cyan);">0 Form Fields Detected</span>
              <label style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-muted); cursor: pointer;">
                <input type="checkbox" id="pf-flatten-toggle" style="accent-color: var(--accent-cyan); width: 13px; height: 13px;">
                <span>Flatten Form (Make read-only)</span>
              </label>
            </div>

            <!-- Scrollable Input Fields List -->
            <div id="pf-fields-list" style="max-height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; padding-right: 4px;">
              <!-- Generated form inputs go here -->
            </div>

            <!-- Action Button -->
            <button class="tool-btn primary" id="pf-submit-btn" style="font-size: 14px; padding: 12px 20px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; margin-top: 6px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Save &amp; Download Filled PDF</span>
            </button>
          </div>
        </div>

        <!-- Form Status & Document Details (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Form Structure &amp; Status</h3>
            <span id="pf-status-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
          </div>

          <!-- Document Inspection Box -->
          <div style="flex: 1; display: flex; flex-direction: column; background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); border-radius: 10px; padding: 24px; align-items: center; justify-content: center; text-align: center; gap: 14px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(0, 242, 254, 0.1); border: 1px solid rgba(0, 242, 254, 0.3); display: flex; align-items: center; justify-content: center; color: var(--accent-cyan);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 32px; height: 32px;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
            </div>

            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div id="pf-filename-display" style="font-size: 15px; font-weight: 800; color: var(--text-main);">No Form Uploaded</div>
              <div id="pf-meta-display" style="font-size: 12px; color: var(--text-muted);">Upload a PDF with AcroForm fillable fields.</div>
            </div>

            <div style="max-width: 320px; padding: 12px 14px; border-radius: 8px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); font-size: 11px; color: var(--text-muted); line-height: 1.45; text-align: left;">
              <strong style="color: var(--text-main);">Supported Form Elements:</strong>
              <ul style="margin: 6px 0 0 16px; padding: 0;">
                <li>Text fields (Single line, multi-line)</li>
                <li>Checkboxes (Yes/No toggles)</li>
                <li>Dropdown select menus</li>
                <li>Radio button option groups</li>
              </ul>
            </div>
          </div>
        </div>
      
        <!-- Dynamic Guide Card (Unified standard footer guide) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>QUICK GUIDE: INTERACTIVE PDF FORM FILLER</span>
            </div>
          </div>
          <div class="tool-guide-steps">

            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Open Fillable PDF</strong>: Upload any PDF containing interactive AcroForm or XFA fields into the client-side document viewer.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Fill Text & Toggle Fields</strong>: Enter text, check boxes, select radio buttons, and populate dropdown menus with instant visual feedback.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Save Flattened Document</strong>: Download the completed form with flattened fields or export raw form values in JSON/FDF format.</div>
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
    this.dropzone = container.querySelector('#pf-dropzone');
    this.fileInput = container.querySelector('#pf-file-input');
    this.clearBtn = container.querySelector('#pf-clear-btn');
    this.fieldsContainer = container.querySelector('#pf-fields-container');
    this.fieldsList = container.querySelector('#pf-fields-list');
    this.fieldCountLabel = container.querySelector('#pf-field-count-label');
    this.flattenToggle = container.querySelector('#pf-flatten-toggle');
    this.submitBtn = container.querySelector('#pf-submit-btn');
    this.statusBadge = container.querySelector('#pf-status-badge');
    this.filenameDisplay = container.querySelector('#pf-filename-display');
    this.metaDisplay = container.querySelector('#pf-meta-display');

    // Events
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

    this.submitBtn.addEventListener('click', () => this.fillAndDownload());
  },

  async loadFile(file) {
    if (file.type !== 'application/pdf') {
      this.app.showToast("Please select a PDF file.", "warning");
      return;
    }

    try {
      this.pdfDocBytes = await file.arrayBuffer();
      this.fileName = file.name.replace(/\.[^/.]+$/, "");
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);

      this.filenameDisplay.textContent = file.name;
      this.metaDisplay.textContent = `${sizeMb} MB • Inspecting fields...`;

      await this.ensurePdfLib();
      const pdfDoc = await window.PDFLib.PDFDocument.load(this.pdfDocBytes.slice(0), { ignoreEncryption: true });
      const form = pdfDoc.getForm();
      const fields = form.getFields();

      this.formFields = [];

      fields.forEach(field => {
        const name = field.getName();
        let type = "text";
        let value = "";
        let options = [];

        const constructorName = field.constructor.name;
        if (constructorName.includes("PDFTextField") || field.getText) {
          type = "text";
          try { value = field.getText() || ""; } catch (e) {}
        } else if (constructorName.includes("PDFCheckBox") || field.isChecked) {
          type = "checkbox";
          try { value = field.isChecked(); } catch (e) {}
        } else if (constructorName.includes("PDFDropdown") || field.getOptions) {
          type = "dropdown";
          try {
            options = field.getOptions() || [];
            value = field.getSelected()[0] || "";
          } catch (e) {}
        } else if (constructorName.includes("PDFRadioGroup")) {
          type = "radio";
          try {
            options = field.getOptions() || [];
            value = field.getSelected() || "";
          } catch (e) {}
        }

        this.formFields.push({ name, type, value, options });
      });

      this.dropzone.style.display = 'none';
      this.clearBtn.style.display = 'inline-block';
      this.fieldsContainer.style.display = 'flex';

      this.renderFormFields();
      this.statusBadge.textContent = `${this.formFields.length} Fields`;
      this.metaDisplay.textContent = `${sizeMb} MB • Form ready to fill`;
      this.app.showToast(`Found ${this.formFields.length} fillable form fields!`, "success");

    } catch (err) {
      console.error("PDF Form reader error:", err);
      this.app.showToast(`Failed to parse form: ${err.message}`, "error");
    }
  },

  renderFormFields() {
    this.fieldsList.innerHTML = '';
    this.fieldCountLabel.textContent = `${this.formFields.length} Form Fields Detected`;

    if (this.formFields.length === 0) {
      this.fieldsList.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); background: rgba(255,255,255,0.02); border-radius: 8px;">
          <div style="font-weight: 700; color: #f59e0b; margin-bottom: 4px;">No Interactive Fields Detected</div>
          <div style="font-size: 11px;">This document appears to be a flat PDF without interactive AcroForm inputs. You can still save or flatten it.</div>
        </div>
      `;
      return;
    }

    this.formFields.forEach((f, idx) => {
      const box = document.createElement('div');
      box.style.cssText = `
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
      `;

      const cleanLabel = escapeHtml(f.name.replace(/_/g, " ").replace(/\[.*?\]/g, ""));

      if (f.type === 'checkbox') {
        box.innerHTML = `
          <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 12px; color: var(--text-main);">
            <input type="checkbox" class="pf-input" data-idx="${idx}" ${f.value ? 'checked' : ''} style="accent-color: var(--accent-cyan); width: 15px; height: 15px;">
            <span style="font-weight: 600;">${cleanLabel}</span>
          </label>
        `;
      } else if (f.type === 'dropdown') {
        let optHtml = '';
        f.options.forEach(opt => {
          const sel = opt === f.value ? 'selected' : '';
          optHtml += `<option value="${escapeHtml(opt)}" ${sel}>${escapeHtml(opt)}</option>`;
        });
        box.innerHTML = `
          <label style="font-size: 11px; font-weight: 600; color: var(--text-main);">${cleanLabel}</label>
          <select class="tool-input pf-input" data-idx="${idx}" style="padding: 6px 10px; font-size: 12px;">
            ${optHtml}
          </select>
        `;
      } else {
        box.innerHTML = `
          <label style="font-size: 11px; font-weight: 600; color: var(--text-main);">${cleanLabel}</label>
          <input type="text" class="tool-input pf-input" data-idx="${idx}" value="${escapeHtml(f.value || '')}" placeholder="Enter ${cleanLabel}..." style="padding: 6px 10px; font-size: 12px;">
        `;
      }

      this.fieldsList.appendChild(box);
    });

    // Listen to changes
    this.fieldsList.querySelectorAll('.pf-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx);
        if (e.target.type === 'checkbox') {
          this.formFields[idx].value = e.target.checked;
        } else {
          this.formFields[idx].value = e.target.value;
        }
      });
    });
  },

  async fillAndDownload() {
    if (!this.pdfDocBytes) return;

    try {
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = `<span>Saving Form Data...</span>`;

      await this.ensurePdfLib();
      const pdfDoc = await window.PDFLib.PDFDocument.load(this.pdfDocBytes.slice(0), { ignoreEncryption: true });
      const form = pdfDoc.getForm();

      // Apply values back to AcroForm
      this.formFields.forEach(f => {
        try {
          if (f.type === 'checkbox') {
            const cb = form.getCheckBox(f.name);
            if (f.value) cb.check();
            else cb.uncheck();
          } else if (f.type === 'dropdown') {
            const dd = form.getDropdown(f.name);
            if (f.value) dd.select(f.value);
          } else {
            const tf = form.getTextField(f.name);
            tf.setText(f.value || "");
          }
        } catch (err) {
          console.warn(`Could not set field ${f.name}:`, err);
        }
      });

      // Flatten if user checked
      if (this.flattenToggle.checked) {
        form.flatten();
      }

      const filledPdfBytes = await pdfDoc.save();
      const blob = new Blob([filledPdfBytes], { type: 'application/pdf' });
      const filename = `${this.fileName}-filled.pdf`;

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.app.showToast(`Saved filled form: ${filename}!`, "success");

    } catch (err) {
      console.error("Form filling error:", err);
      this.app.showToast(`Failed to fill form: ${err.message}`, "error");
    } finally {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Save &amp; Download Filled PDF</span>
      `;
    }
  },

  resetDoc() {
    this.pdfDocBytes = null;
    this.fileName = "";
    this.formFields = [];
    this.dropzone.style.display = 'flex';
    this.clearBtn.style.display = 'none';
    this.fieldsContainer.style.display = 'none';
    this.filenameDisplay.textContent = "No Form Uploaded";
    this.metaDisplay.textContent = "Upload a PDF with AcroForm fillable fields.";
    this.statusBadge.textContent = "";
  },

  ensurePdfLib() {
    return new Promise((resolve, reject) => {
      if (window.PDFLib) return resolve(window.PDFLib);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
      script.onload = () => resolve(window.PDFLib);
      script.onerror = () => reject(new Error("Failed to load PDF engine"));
      document.head.appendChild(script);
    });
  },

  cleanup() {
    this.resetDoc();
  }
};
