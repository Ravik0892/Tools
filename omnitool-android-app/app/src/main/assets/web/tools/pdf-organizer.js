// OmniTool Hub - Visual PDF Page Organizer & Remover
// 100% Client-Side drag-and-drop page tile organizer, rotator, and page remover using pdf.js & pdf-lib.

import { escapeHtml } from './utils.js';

export default {
  id: "pdf-organizer",
  name: "Visual PDF Page Organizer & Remover",

  pdfDocBytes: null,
  fileName: "",
  pagesList: [], // { pageNum, originalIndex, rotation, isDeleted, canvasDataUrl }
  pdfjsDoc: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Bulk Operations Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Organizer &amp; Actions
            </h3>
            <button class="tool-btn secondary" id="org-clear-btn" style="font-size: 11px; padding: 3px 8px; display: none;">New Document</button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; flex: 1;">
            <!-- Dropzone -->
            <div id="org-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 24px 16px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <input type="file" id="org-file-input" accept="application/pdf" style="display: none;">
              <div style="font-size: 32px; margin-bottom: 4px;">📑</div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Drop PDF to Organize</div>
              <div style="font-size: 11px; color: var(--text-muted);">Visual reordering, page rotation &amp; removal</div>
            </div>

            <!-- Bulk Actions Section -->
            <div id="org-bulk-toolbar" style="display: none; flex-direction: column; gap: 8px; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Batch Operations</span>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
                <button class="tool-btn secondary org-bulk-btn" id="org-rotate-all-btn" style="font-size: 11px; padding: 6px; justify-content: center;">↻ Rotate All 90°</button>
                <button class="tool-btn secondary org-bulk-btn" id="org-reverse-btn" style="font-size: 11px; padding: 6px; justify-content: center;">⇄ Reverse Order</button>
                <button class="tool-btn secondary org-bulk-btn" id="org-del-even-btn" style="font-size: 11px; padding: 6px; justify-content: center;">Delete Even</button>
                <button class="tool-btn secondary org-bulk-btn" id="org-del-odd-btn" style="font-size: 11px; padding: 6px; justify-content: center;">Delete Odd</button>
              </div>
              <button class="tool-btn secondary org-bulk-btn" id="org-restore-all-btn" style="font-size: 11px; padding: 6px; justify-content: center; width: 100%;">↩ Restore All Deleted</button>
            </div>

            <!-- Save & Download -->
            <button class="tool-btn primary" id="org-save-btn" disabled style="margin-top: auto; justify-content: center; height: 42px; font-weight: 700; font-size: 13px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; margin-right: 6px;">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Save &amp; Download PDF
            </button>

            <!-- Privacy Security Badge -->
            <div style="padding: 10px 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.4;">
              🔒 <strong style="color: var(--accent-cyan);">In-Memory Rearrangement</strong>: Pages are extracted, rotated, and recompiled using pdf-lib inside local browser memory.
            </div>
          </div>
        </div>

        <!-- Visual Page Grid Board Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              Page Arrangement Grid
            </h3>
            <span id="org-count-badge" class="tool-badge" style="background: rgba(0,242,254,0.12); color: var(--accent-cyan); font-weight: 700; font-size: 11px;">0 Pages Loaded</span>
          </div>

          <div style="flex: 1; min-height: 440px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow-y: auto; padding: 14px;">
            <!-- Loading Progress Spinner -->
            <div id="org-loading-box" style="display: none; flex-direction: column; align-items: center; justify-content: center; height: 380px; gap: 12px; text-align: center;">
              <div style="width: 36px; height: 36px; border: 3px solid rgba(0, 242, 254, 0.2); border-top-color: var(--accent-cyan); border-radius: 50%; animation: org-spin 0.8s linear infinite;"></div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main);" id="org-loading-text">Rendering Thumbnails...</div>
            </div>

            <!-- Empty Placeholder -->
            <div id="org-empty-placeholder" style="height: 100%; min-height: 380px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 40px 20px;">
              <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.7;">📑</div>
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">No PDF Pages Loaded</h4>
              <p style="font-size: 12px; max-width: 360px; margin: 0; line-height: 1.5;">
                Upload a PDF on the left to visually inspect, reorder pages, rotate sideways sheets, or delete unwanted pages.
              </p>
            </div>

            <!-- Visual Page Grid Cards Board -->
            <div id="org-grid" style="display: none; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; padding: 4px;"></div>
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: VISUAL PDF PAGE ORGANIZER &amp; REMOVER</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Reorder &amp; Shift Pages</strong>
              <p style="margin: 4px 0 0 0;">Use the arrow buttons on each thumbnail card to shift pages left or right instantly.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Rotate &amp; Delete</strong>
              <p style="margin: 4px 0 0 0;">Rotate individual 90° upside-down pages, or delete unneeded pages with full restore support.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Instant PDF Generation</strong>
              <p style="margin: 4px 0 0 0;">pdf-lib copies internal page streams directly into a clean, optimized output PDF without re-encoding quality loss.</p>
            </div>
          </div>
        </div>
      </div>

      <style>
        @keyframes org-spin {
          to { transform: rotate(360deg); }
        }
      </style>
    `;
  },

  init(container, appInstance) {
    this.container = container;
    this.app = appInstance;

    // Elements
    this.dropzone = container.querySelector('#org-dropzone');
    this.fileInput = container.querySelector('#org-file-input');
    this.clearBtn = container.querySelector('#org-clear-btn');
    this.saveBtn = container.querySelector('#org-save-btn');
    this.countBadge = container.querySelector('#org-count-badge');
    this.bulkToolbar = container.querySelector('#org-bulk-toolbar');
    this.loadingBox = container.querySelector('#org-loading-box');
    this.loadingText = container.querySelector('#org-loading-text');
    this.grid = container.querySelector('#org-grid');
    this.emptyPlaceholder = container.querySelector('#org-empty-placeholder');

    // Bulk buttons
    this.rotateAllBtn = container.querySelector('#org-rotate-all-btn');
    this.reverseBtn = container.querySelector('#org-reverse-btn');
    this.delEvenBtn = container.querySelector('#org-del-even-btn');
    this.delOddBtn = container.querySelector('#org-del-odd-btn');
    this.restoreAllBtn = container.querySelector('#org-restore-all-btn');

    // Dropzone handlers
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

    // Bulk operations
    this.rotateAllBtn.addEventListener('click', () => this.rotateAllPages());
    this.reverseBtn.addEventListener('click', () => this.reverseOrder());
    this.delEvenBtn.addEventListener('click', () => this.deleteEvenPages());
    this.delOddBtn.addEventListener('click', () => this.deleteOddPages());
    this.restoreAllBtn.addEventListener('click', () => this.restoreAllPages());

    // Save
    this.saveBtn.addEventListener('click', () => this.saveOrganizedPdf());
  },

  async loadFile(file) {
    if (file.type !== 'application/pdf') {
      this.app.showToast("Please upload a PDF document.", "warning");
      return;
    }

    try {
      this.pdfDocBytes = await file.arrayBuffer();
      this.fileName = file.name.replace(/\.[^/.]+$/, "");

      this.dropzone.style.display = 'none';
      if (this.emptyPlaceholder) this.emptyPlaceholder.style.display = 'none';
      this.loadingBox.style.display = 'flex';
      this.pagesList = [];

      await this.ensurePdfJs();
      const loadingTask = window.pdfjsLib.getDocument({ data: this.pdfDocBytes.slice(0) });
      this.pdfjsDoc = await loadingTask.promise;
      const total = this.pdfjsDoc.numPages;

      // Render each page into thumbnail canvas
      for (let i = 1; i <= total; i++) {
        this.loadingText.textContent = `Rendering Thumbnail ${i} of ${total}...`;
        const page = await this.pdfjsDoc.getPage(i);
        const viewport = page.getViewport({ scale: 0.35 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport: viewport }).promise;

        this.pagesList.push({
          originalIndex: i - 1, // 0-indexed
          pageNum: i,
          rotation: 0,
          isDeleted: false,
          thumbUrl: canvas.toDataURL('image/jpeg', 0.8)
        });
      }

      this.loadingBox.style.display = 'none';
      this.clearBtn.style.display = 'inline-block';
      this.bulkToolbar.style.display = 'flex';
      this.grid.style.display = 'grid';
      this.saveBtn.disabled = false;

      this.renderGrid();
      this.app.showToast(`Loaded ${total} pages ready to organize!`, "success");

    } catch (err) {
      console.error("PDF Organizer load error:", err);
      this.app.showToast(`Failed to parse PDF: ${err.message}`, "error");
      this.resetDoc();
    }
  },

  renderGrid() {
    this.grid.innerHTML = '';
    const activeCount = this.pagesList.filter(p => !p.isDeleted).length;
    this.countBadge.textContent = `${activeCount} Active / ${this.pagesList.length} Total Pages`;

    this.pagesList.forEach((pageItem, index) => {
      const card = document.createElement('div');
      card.className = 'org-page-card';
      card.dataset.index = index;
      card.style.cssText = `
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid ${pageItem.isDeleted ? 'rgba(239, 68, 68, 0.4)' : 'var(--border-color)'};
        border-radius: 8px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        opacity: ${pageItem.isDeleted ? '0.45' : '1'};
        position: relative;
        transition: all 0.2s ease;
      `;

      card.innerHTML = `
        <!-- Card Header with Page Number and Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
          <span style="font-weight: 700; color: ${pageItem.isDeleted ? '#ef4444' : 'var(--accent-cyan)'};">
            ${pageItem.isDeleted ? '<s>Pg ' + (index + 1) + '</s>' : 'Page ' + (index + 1)}
          </span>
          <span style="font-size: 10px; color: var(--text-muted);">(#${pageItem.pageNum})</span>
        </div>

        <!-- Thumbnail Image with Rotation Transform -->
        <div style="height: 140px; background: #000; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; position: relative;">
          <img src="${pageItem.thumbUrl}" style="max-width: 100%; max-height: 100%; object-fit: contain; transform: rotate(${pageItem.rotation}deg); transition: transform 0.2s ease;">
          ${pageItem.isDeleted ? '<div style="position: absolute; inset: 0; background: rgba(239,68,68,0.25); display: flex; align-items: center; justify-content: center; color: #ef4444; font-weight: 800; font-size: 14px;">DELETED</div>' : ''}
        </div>

        <!-- Action Buttons (Move Left, Rotate, Delete, Move Right) -->
        <div style="display: flex; justify-content: space-between; gap: 4px; margin-top: 2px;">
          <button class="tool-btn secondary org-card-btn" data-action="left" ${index === 0 ? 'disabled' : ''} style="padding: 2px 6px; font-size: 10px;" title="Move Left">◀</button>
          <button class="tool-btn secondary org-card-btn" data-action="rotate" style="padding: 2px 6px; font-size: 10px;" title="Rotate 90°">↻</button>
          <button class="tool-btn secondary org-card-btn" data-action="delete" style="padding: 2px 6px; font-size: 10px; color: ${pageItem.isDeleted ? '#10b981' : '#ef4444'};" title="${pageItem.isDeleted ? 'Restore Page' : 'Delete Page'}">
            ${pageItem.isDeleted ? '↩' : '🗑'}
          </button>
          <button class="tool-btn secondary org-card-btn" data-action="right" ${index === this.pagesList.length - 1 ? 'disabled' : ''} style="padding: 2px 6px; font-size: 10px;" title="Move Right">▶</button>
        </div>
      `;

      // Event handlers on card buttons
      card.querySelectorAll('.org-card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const action = btn.dataset.action;
          this.handleCardAction(index, action);
        });
      });

      this.grid.appendChild(card);
    });
  },

  handleCardAction(index, action) {
    if (action === 'left' && index > 0) {
      const temp = this.pagesList[index];
      this.pagesList[index] = this.pagesList[index - 1];
      this.pagesList[index - 1] = temp;
      this.renderGrid();
    } else if (action === 'right' && index < this.pagesList.length - 1) {
      const temp = this.pagesList[index];
      this.pagesList[index] = this.pagesList[index + 1];
      this.pagesList[index + 1] = temp;
      this.renderGrid();
    } else if (action === 'rotate') {
      this.pagesList[index].rotation = (this.pagesList[index].rotation + 90) % 360;
      this.renderGrid();
    } else if (action === 'delete') {
      this.pagesList[index].isDeleted = !this.pagesList[index].isDeleted;
      this.renderGrid();
    }
  },

  rotateAllPages() {
    this.pagesList.forEach(p => {
      p.rotation = (p.rotation + 90) % 360;
    });
    this.renderGrid();
    this.app.showToast("Rotated all pages 90°", "info");
  },

  reverseOrder() {
    this.pagesList.reverse();
    this.renderGrid();
    this.app.showToast("Reversed page order", "info");
  },

  deleteEvenPages() {
    this.pagesList.forEach((p, idx) => {
      if ((idx + 1) % 2 === 0) p.isDeleted = true;
    });
    this.renderGrid();
    this.app.showToast("Marked even pages as deleted", "info");
  },

  deleteOddPages() {
    this.pagesList.forEach((p, idx) => {
      if ((idx + 1) % 2 !== 0) p.isDeleted = true;
    });
    this.renderGrid();
    this.app.showToast("Marked odd pages as deleted", "info");
  },

  restoreAllPages() {
    this.pagesList.forEach(p => p.isDeleted = false);
    this.renderGrid();
    this.app.showToast("Restored all pages", "info");
  },

  async saveOrganizedPdf() {
    const activePages = this.pagesList.filter(p => !p.isDeleted);
    if (activePages.length === 0) {
      this.app.showToast("All pages are deleted. Keep at least 1 page.", "warning");
      return;
    }

    try {
      this.saveBtn.disabled = true;
      this.saveBtn.innerHTML = `<span>Compiling Document...</span>`;

      await this.ensurePdfLib();
      const srcDoc = await window.PDFLib.PDFDocument.load(this.pdfDocBytes.slice(0));
      const newDoc = await window.PDFLib.PDFDocument.create();

      // Extract target original indices
      const originalIndices = activePages.map(p => p.originalIndex);
      const copiedPages = await newDoc.copyPages(srcDoc, originalIndices);

      // Apply rotations and add to newDoc
      copiedPages.forEach((page, i) => {
        const rot = activePages[i].rotation;
        if (rot !== 0) {
          const currentRot = page.getRotation().angle;
          page.setRotation(window.PDFLib.degrees((currentRot + rot) % 360));
        }
        newDoc.addPage(page);
      });

      const organizedBytes = await newDoc.save();
      const blob = new Blob([organizedBytes], { type: 'application/pdf' });
      const filename = `${this.fileName}-organized.pdf`;

      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      this.app.showToast(`Saved organized PDF: ${filename}!`, "success");

    } catch (err) {
      console.error("Organize save error:", err);
      this.app.showToast(`Failed to save: ${err.message}`, "error");
    } finally {
      this.saveBtn.disabled = false;
      this.saveBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>Save &amp; Download PDF</span>
      `;
    }
  },

  resetDoc() {
    this.pdfDocBytes = null;
    this.pdfjsDoc = null;
    this.pagesList = [];
    this.fileName = "";
    this.dropzone.style.display = 'flex';
    if (this.emptyPlaceholder) this.emptyPlaceholder.style.display = 'flex';
    this.clearBtn.style.display = 'none';
    this.bulkToolbar.style.display = 'none';
    this.grid.style.display = 'none';
    this.saveBtn.disabled = true;
    this.countBadge.textContent = "0 Pages Loaded";
  },

  ensurePdfJs() {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) return resolve(window.pdfjsLib);
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error("Failed to load PDF viewer engine"));
      document.head.appendChild(script);
    });
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
    this.resetDoc();
  }
};
