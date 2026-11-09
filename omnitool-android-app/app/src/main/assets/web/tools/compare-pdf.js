// OmniTool Hub - PDF Compare & Difference Inspector
// 100% Client-Side Visual Diff & Text Diff comparison between two PDF revisions using PDF.js & Canvas Pixel Differencing

import { escapeHtml } from './utils.js';

export default {
  id: "compare-pdf",
  name: "Compare PDF Documents",

  activeTab: "visual", // 'visual' | 'text'
  fileA: null,
  fileB: null,
  docA: null,
  docB: null,
  currentPage: 1,
  totalPages: 1,
  visualMode: "side-by-side", // 'side-by-side' | 'pixel-diff' | 'wipe-slider'
  sliderPos: 50,
  textDiffData: null,
  isAnalyzing: false,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg>
              Configuration
            </h3>
            <div style="display: flex; gap: 8px;">
              <button class="keyboard-tab ${this.activeTab === 'visual' ? 'active' : ''}" id="btn-tab-visual" style="font-size: 11px; padding: 4px 10px;">
                👁️ Visual Diff
              </button>
              <button class="keyboard-tab ${this.activeTab === 'text' ? 'active' : ''}" id="btn-tab-text" style="font-size: 11px; padding: 4px 10px;">
                📝 Text Diff
              </button>
            </div>
          </div>

          <!-- Document Upload Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 8px;">
            <!-- Document A (Original) -->
            <div id="dropzone-doc-a" style="border: 2px dashed ${this.fileA ? 'var(--accent-emerald, #10b981)' : 'var(--border-color)'}; background: var(--bg-card); border-radius: 10px; padding: 18px 12px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <div style="font-size: 22px; margin-bottom: 4px;">📄</div>
              <div style="font-size: 12px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Revision A (Original)</div>
              <div style="font-size: 10px; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                ${this.fileA ? escapeHtml(this.fileA.name) : 'Click or drop baseline PDF'}
              </div>
              <input type="file" id="input-pdf-a" accept="application/pdf" style="display: none;">
            </div>

            <!-- Document B (Modified) -->
            <div id="dropzone-doc-b" style="border: 2px dashed ${this.fileB ? 'var(--accent-cyan, #00f2fe)' : 'var(--border-color)'}; background: var(--bg-card); border-radius: 10px; padding: 18px 12px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <div style="font-size: 22px; margin-bottom: 4px;">📑</div>
              <div style="font-size: 12px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;">Revision B (Modified)</div>
              <div style="font-size: 10px; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                ${this.fileB ? escapeHtml(this.fileB.name) : 'Click or drop revised PDF'}
              </div>
              <input type="file" id="input-pdf-b" accept="application/pdf" style="display: none;">
            </div>
          </div>

          <!-- Page Navigation & Controls -->
          <div class="form-group">
            <label>Page Navigation</label>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color);">
              <button class="tool-btn secondary" id="btn-prev-page" ${this.currentPage <= 1 ? 'disabled' : ''} style="font-size: 11px; padding: 4px 10px;">
                ⬅️ Prev
              </button>
              <span style="font-size: 12px; font-weight: 700; color: var(--text-main);">
                Page <span id="lbl-curr-page">${this.currentPage}</span> of <span id="lbl-total-pages">${this.totalPages}</span>
              </span>
              <button class="tool-btn secondary" id="btn-next-page" ${this.currentPage >= this.totalPages ? 'disabled' : ''} style="font-size: 11px; padding: 4px 10px;">
                Next ➡️
              </button>
            </div>
          </div>

          ${this.activeTab === 'visual' ? `
            <!-- Visual Inspection Mode -->
            <div class="form-group">
              <label for="select-visual-mode">Visual Inspection Mode</label>
              <select id="select-visual-mode" class="form-select" style="width: 100%;">
                <option value="side-by-side" ${this.visualMode === 'side-by-side' ? 'selected' : ''}>Side-by-Side Dual View</option>
                <option value="pixel-diff" ${this.visualMode === 'pixel-diff' ? 'selected' : ''}>Highlight Differences (Pixel Heatmap)</option>
                <option value="wipe-slider" ${this.visualMode === 'wipe-slider' ? 'selected' : ''}>Interactive Wipe Slider</option>
              </select>
            </div>

            ${this.visualMode === 'wipe-slider' ? `
              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label style="margin: 0;">Wipe Split Position</label>
                  <span id="lbl-wipe-pos" style="font-size: 11px; font-weight: 700; color: var(--accent-cyan);">${this.sliderPos}%</span>
                </div>
                <input type="range" id="input-wipe-slider" min="0" max="100" value="${this.sliderPos}" style="width: 100%; cursor: pointer;">
              </div>
            ` : ''}
          ` : `
            <!-- Text Inspection Controls -->
            <div class="form-group">
              <label>Diff Summary & Export</label>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <button class="tool-btn secondary" id="btn-reanalyze-text" style="justify-content: center; font-size: 12px;">
                  🔄 Recompute Text Differences
                </button>
                <button class="tool-btn primary" id="btn-export-text-diff" style="justify-content: center; font-size: 12px;">
                  📥 Export Difference Report (.txt)
                </button>
              </div>
            </div>
          `}

          <!-- Privacy Security Badge -->
          <div style="margin-top: auto; padding: 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.5;">
            🔒 <strong style="color: var(--accent-cyan);">100% In-Memory Comparison</strong>: Documents are rendered and parsed strictly inside your local browser memory. Zero files or text are transmitted over the network.
          </div>
        </div>

        <!-- Result / Preview Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 id="compare-panel-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              ${this.activeTab === 'visual' ? 'Visual Comparison Canvas' : 'Text & Clause Diff Inspector'}
            </h3>
            ${this.activeTab === 'text' ? `
              <button class="tool-btn accent-emerald" id="btn-copy-diff">
                <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Copy Diff
              </button>
            ` : ''}
          </div>

          <!-- Output Workspace -->
          <div id="compare-workspace" style="flex: 1; min-height: 440px; display: flex; flex-direction: column; overflow: hidden;">
            ${(!this.docA || !this.docB) ? `
              <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 20px; color: var(--text-muted);">
                <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.7;">⚖️</div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">Upload Both PDF Revisions</h4>
                <p style="font-size: 12px; max-width: 420px; margin: 0; line-height: 1.5;">
                  Select Revision A (baseline) and Revision B (modified) in the configuration panel to unlock side-by-side inspection, pixel difference heatmaps, and clause diffing.
                </p>
              </div>
            ` : (this.activeTab === 'visual' ? this.renderVisualWorkspace() : this.renderTextWorkspace())}
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: PDF Compare &amp; Difference Inspector</span>
            </div>
            <div class="tool-guide-badge">Diff Engine</div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Upload Document Pair</h4>
                <p>Upload original Revision A and modified Revision B PDF files to compare in browser memory.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Choose Inspection Mode</h4>
                <p>Toggle between Visual Side-by-Side, Pixel Diff Heatmap, or Text/Clause Diff matrices.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Export Audit Report</h4>
                <p>Save text difference logs or take high-res snapshots of changed sections for audit reports.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderVisualWorkspace() {
    if (this.visualMode === "side-by-side") {
      return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; height: 100%; overflow: hidden;">
          <div style="display: flex; flex-direction: column; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden;">
            <div style="padding: 8px 12px; background: rgba(16, 185, 129, 0.12); color: #10b981; font-weight: 700; font-size: 11px; border-bottom: 1px solid rgba(16, 185, 129, 0.2);">
              Revision A (Original) - Page ${this.currentPage}
            </div>
            <div style="flex: 1; overflow: auto; padding: 12px; display: flex; justify-content: center; align-items: flex-start;">
              <canvas id="canvas-doc-a" style="max-width: 100%; height: auto; box-shadow: 0 4px 16px rgba(0,0,0,0.4); border-radius: 4px;"></canvas>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden;">
            <div style="padding: 8px 12px; background: rgba(0, 242, 254, 0.12); color: var(--accent-cyan); font-weight: 700; font-size: 11px; border-bottom: 1px solid rgba(0, 242, 254, 0.2);">
              Revision B (Modified) - Page ${this.currentPage}
            </div>
            <div style="flex: 1; overflow: auto; padding: 12px; display: flex; justify-content: center; align-items: flex-start;">
              <canvas id="canvas-doc-b" style="max-width: 100%; height: auto; box-shadow: 0 4px 16px rgba(0,0,0,0.4); border-radius: 4px;"></canvas>
            </div>
          </div>
        </div>
      `;
    }

    if (this.visualMode === "pixel-diff") {
      return `
        <div style="display: flex; flex-direction: column; height: 100%; background: #0b0f19; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden;">
          <div style="padding: 8px 14px; background: rgba(239, 68, 68, 0.15); color: #ef4444; font-weight: 700; font-size: 11px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(239, 68, 68, 0.25);">
            <span>Difference Heatmap (Page ${this.currentPage})</span>
            <span style="font-size: 10px; font-weight: 600;">🔴 Red highlights modified pixels & shifted elements</span>
          </div>
          <div style="flex: 1; overflow: auto; padding: 16px; display: flex; justify-content: center; align-items: flex-start;">
            <canvas id="canvas-diff" style="max-width: 100%; height: auto; box-shadow: 0 4px 20px rgba(0,0,0,0.6); border-radius: 4px;"></canvas>
          </div>
        </div>
      `;
    }

    // Wipe slider
    return `
      <div style="display: flex; flex-direction: column; height: 100%; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden;">
        <div style="padding: 8px 14px; background: rgba(0, 242, 254, 0.1); color: var(--accent-cyan); font-weight: 700; font-size: 11px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color);">
          <span>Wipe Overlay (Page ${this.currentPage})</span>
          <span style="font-size: 10px; color: var(--text-muted);">Adjust wipe slider in configuration panel</span>
        </div>
        <div style="flex: 1; overflow: auto; padding: 16px; display: flex; justify-content: center; align-items: flex-start;">
          <div style="position: relative; display: inline-block;">
            <canvas id="canvas-wipe-base" style="max-width: 100%; height: auto; box-shadow: 0 4px 16px rgba(0,0,0,0.4); border-radius: 4px;"></canvas>
            <div id="wipe-overlay-wrap" style="position: absolute; top: 0; left: 0; height: 100%; width: ${this.sliderPos}%; overflow: hidden; border-right: 3px solid var(--accent-cyan); box-shadow: 2px 0 10px rgba(0, 242, 254, 0.4);">
              <canvas id="canvas-wipe-overlay" style="height: auto;"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  renderTextWorkspace() {
    return `
      <div style="display: flex; flex-direction: column; height: 100%; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 16px; overflow: hidden;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 11px;">
          <span style="font-weight: 700; color: var(--text-main);">Page ${this.currentPage} Content Stream</span>
          <div style="display: flex; gap: 12px;">
            <span style="display: flex; align-items: center; gap: 4px; color: #10b981;">
              <span style="display: inline-block; width: 8px; height: 8px; background: #10b981; border-radius: 2px;"></span> Added
            </span>
            <span style="display: flex; align-items: center; gap: 4px; color: #ef4444;">
              <span style="display: inline-block; width: 8px; height: 8px; background: #ef4444; border-radius: 2px;"></span> Removed
            </span>
          </div>
        </div>

        <div id="text-diff-container" style="flex: 1; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; font-family: var(--font-mono); font-size: 12px; line-height: 1.7; white-space: pre-wrap; word-break: break-word; overflow-y: auto;">
          ${this.isAnalyzing ? '<div style="text-align: center; padding: 40px; color: var(--text-muted);">Analyzing text streams...</div>' : 'Select documents to run text diff.'}
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
    // Mode / Tab switcher
    document.getElementById("btn-tab-visual")?.addEventListener("click", () => {
      this.activeTab = "visual";
      this.refreshUI();
    });

    document.getElementById("btn-tab-text")?.addEventListener("click", () => {
      this.activeTab = "text";
      this.refreshUI();
      this.compareText();
    });

    // Dropzones & File inputs
    const dropA = document.getElementById("dropzone-doc-a");
    const dropB = document.getElementById("dropzone-doc-b");
    const inputA = document.getElementById("input-pdf-a");
    const inputB = document.getElementById("input-pdf-b");

    dropA?.addEventListener("click", () => inputA?.click());
    dropB?.addEventListener("click", () => inputB?.click());

    inputA?.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files[0]) {
        this.fileA = e.target.files[0];
        await this.loadDocumentA();
      }
    });

    inputB?.addEventListener("change", async (e) => {
      if (e.target.files && e.target.files[0]) {
        this.fileB = e.target.files[0];
        await this.loadDocumentB();
      }
    });

    // Pagination
    document.getElementById("btn-prev-page")?.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.onPageChange();
      }
    });

    document.getElementById("btn-next-page")?.addEventListener("click", () => {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.onPageChange();
      }
    });

    // Visual Mode
    document.getElementById("select-visual-mode")?.addEventListener("change", (e) => {
      this.visualMode = e.target.value;
      this.refreshWorkspace();
    });

    // Wipe slider
    const wipeSlider = document.getElementById("input-wipe-slider");
    wipeSlider?.addEventListener("input", (e) => {
      this.sliderPos = e.target.value;
      const lbl = document.getElementById("lbl-wipe-pos");
      if (lbl) lbl.textContent = `${this.sliderPos}%`;
      const wrap = document.getElementById("wipe-overlay-wrap");
      if (wrap) wrap.style.width = `${this.sliderPos}%`;
    });

    // Text Actions
    document.getElementById("btn-reanalyze-text")?.addEventListener("click", () => this.compareText());
    document.getElementById("btn-export-text-diff")?.addEventListener("click", () => this.exportTextReport());
    document.getElementById("btn-copy-diff")?.addEventListener("click", () => this.copyDiffToClipboard());
  },

  async loadPDFJSLibrary() {
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
      script.onerror = () => reject(new Error("Failed to load PDF.js engine."));
      document.head.appendChild(script);
    });
  },

  async loadDocumentA() {
    try {
      await this.loadPDFJSLibrary();
      const arrayBuffer = await this.fileA.arrayBuffer();
      this.docA = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      this.updateTotalPages();
      this.refreshUI();
      this.renderCurrentComparison();
    } catch (err) {
      if (this.app?.showToast) this.app.showToast("Error loading Document A: " + err.message, "error");
      else if (window.app?.showToast) window.app.showToast("Error loading Document A: " + err.message, "error");
    }
  },

  async loadDocumentB() {
    try {
      await this.loadPDFJSLibrary();
      const arrayBuffer = await this.fileB.arrayBuffer();
      this.docB = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      this.updateTotalPages();
      this.refreshUI();
      this.renderCurrentComparison();
    } catch (err) {
      if (this.app?.showToast) this.app.showToast("Error loading Document B: " + err.message, "error");
      else if (window.app?.showToast) window.app.showToast("Error loading Document B: " + err.message, "error");
    }
  },

  updateTotalPages() {
    if (this.docA && this.docB) {
      this.totalPages = Math.max(this.docA.numPages, this.docB.numPages);
      if (this.currentPage > this.totalPages) this.currentPage = 1;
    } else if (this.docA) {
      this.totalPages = this.docA.numPages;
    } else if (this.docB) {
      this.totalPages = this.docB.numPages;
    }
  },

  onPageChange() {
    const lblCurrent = document.getElementById("lbl-curr-page");
    if (lblCurrent) lblCurrent.textContent = this.currentPage;

    const btnPrev = document.getElementById("btn-prev-page");
    const btnNext = document.getElementById("btn-next-page");
    if (btnPrev) btnPrev.disabled = this.currentPage <= 1;
    if (btnNext) btnNext.disabled = this.currentPage >= this.totalPages;

    this.renderCurrentComparison();
  },

  async renderCurrentComparison() {
    if (!this.docA || !this.docB) return;

    if (this.activeTab === "visual") {
      await this.renderVisualPages();
    } else {
      await this.compareText();
    }
  },

  async renderVisualPages() {
    const scale = 1.3;

    if (this.visualMode === "side-by-side") {
      const canvasA = document.getElementById("canvas-doc-a");
      const canvasB = document.getElementById("canvas-doc-b");

      if (canvasA && this.currentPage <= this.docA.numPages) {
        const pageA = await this.docA.getPage(this.currentPage);
        const viewportA = pageA.getViewport({ scale });
        canvasA.width = viewportA.width;
        canvasA.height = viewportA.height;
        await pageA.render({ canvasContext: canvasA.getContext("2d"), viewport: viewportA }).promise;
      }

      if (canvasB && this.currentPage <= this.docB.numPages) {
        const pageB = await this.docB.getPage(this.currentPage);
        const viewportB = pageB.getViewport({ scale });
        canvasB.width = viewportB.width;
        canvasB.height = viewportB.height;
        await pageB.render({ canvasContext: canvasB.getContext("2d"), viewport: viewportB }).promise;
      }
    } else if (this.visualMode === "pixel-diff") {
      const diffCanvas = document.getElementById("canvas-diff");
      if (!diffCanvas) return;

      const offA = document.createElement("canvas");
      const offB = document.createElement("canvas");

      let width = 600, height = 800;

      if (this.currentPage <= this.docA.numPages) {
        const pageA = await this.docA.getPage(this.currentPage);
        const vpA = pageA.getViewport({ scale });
        offA.width = vpA.width;
        offA.height = vpA.height;
        width = vpA.width;
        height = vpA.height;
        await pageA.render({ canvasContext: offA.getContext("2d"), viewport: vpA }).promise;
      }

      if (this.currentPage <= this.docB.numPages) {
        const pageB = await this.docB.getPage(this.currentPage);
        const vpB = pageB.getViewport({ scale });
        offB.width = vpB.width;
        offB.height = vpB.height;
        width = Math.max(width, vpB.width);
        height = Math.max(height, vpB.height);
        await pageB.render({ canvasContext: offB.getContext("2d"), viewport: vpB }).promise;
      }

      diffCanvas.width = width;
      diffCanvas.height = height;
      const diffCtx = diffCanvas.getContext("2d");

      const imgDataA = offA.width ? offA.getContext("2d").getImageData(0, 0, width, height) : null;
      const imgDataB = offB.width ? offB.getContext("2d").getImageData(0, 0, width, height) : null;
      const diffData = diffCtx.createImageData(width, height);

      for (let i = 0; i < diffData.data.length; i += 4) {
        const r1 = imgDataA ? imgDataA.data[i] : 255;
        const g1 = imgDataA ? imgDataA.data[i + 1] : 255;
        const b1 = imgDataA ? imgDataA.data[i + 2] : 255;

        const r2 = imgDataB ? imgDataB.data[i] : 255;
        const g2 = imgDataB ? imgDataB.data[i + 1] : 255;
        const b2 = imgDataB ? imgDataB.data[i + 2] : 255;

        const delta = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);

        if (delta > 35) {
          // Alteration detected - bright red / magenta highlight
          diffData.data[i] = 239;
          diffData.data[i + 1] = 68;
          diffData.data[i + 2] = 68;
          diffData.data[i + 3] = 255;
        } else {
          // Dark background backdrop
          diffData.data[i] = 15;
          diffData.data[i + 1] = 23;
          diffData.data[i + 2] = 42;
          diffData.data[i + 3] = 255;
        }
      }

      diffCtx.putImageData(diffData, 0, 0);
    } else if (this.visualMode === "wipe-slider") {
      const baseCanvas = document.getElementById("canvas-wipe-base");
      const overlayCanvas = document.getElementById("canvas-wipe-overlay");
      if (!baseCanvas || !overlayCanvas) return;

      if (this.currentPage <= this.docA.numPages) {
        const pageA = await this.docA.getPage(this.currentPage);
        const vpA = pageA.getViewport({ scale });
        baseCanvas.width = vpA.width;
        baseCanvas.height = vpA.height;
        await pageA.render({ canvasContext: baseCanvas.getContext("2d"), viewport: vpA }).promise;
      }

      if (this.currentPage <= this.docB.numPages) {
        const pageB = await this.docB.getPage(this.currentPage);
        const vpB = pageB.getViewport({ scale });
        overlayCanvas.width = vpB.width;
        overlayCanvas.height = vpB.height;
        await pageB.render({ canvasContext: overlayCanvas.getContext("2d"), viewport: vpB }).promise;
      }
    }
  },

  async compareText() {
    const container = document.getElementById("text-diff-container");
    if (!container || !this.docA || !this.docB) return;

    this.isAnalyzing = true;
    container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-muted);">Extracting text content and computing differences...</div>';

    try {
      let textA = "";
      let textB = "";

      if (this.currentPage <= this.docA.numPages) {
        const pageA = await this.docA.getPage(this.currentPage);
        const contentA = await pageA.getTextContent();
        textA = contentA.items.map(item => item.str).join(" ");
      }

      if (this.currentPage <= this.docB.numPages) {
        const pageB = await this.docB.getPage(this.currentPage);
        const contentB = await pageB.getTextContent();
        textB = contentB.items.map(item => item.str).join(" ");
      }

      const diffResult = this.computeWordDiff(textA, textB);
      this.textDiffData = diffResult;

      let html = "";
      if (diffResult.length === 0) {
        html = '<div style="text-align: center; color: #10b981; font-weight: 600; padding: 30px; display: flex; align-items: center; justify-content: center; gap: 8px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16"><polyline points="20 6 9 17 4 12"></polyline></svg> No text differences found on this page. Content is identical.</div>';
      } else {
        html = diffResult.map(chunk => {
          if (chunk.type === "added") {
            return `<mark style="background: rgba(16, 185, 129, 0.2); color: #34d399; padding: 2px 5px; border-radius: 4px; border-bottom: 2px solid #10b981;">+ ${escapeHtml(chunk.text)}</mark> `;
          } else if (chunk.type === "removed") {
            return `<mark style="background: rgba(239, 68, 68, 0.2); color: #f87171; padding: 2px 5px; border-radius: 4px; text-decoration: line-through; border-bottom: 2px solid #ef4444;">- ${escapeHtml(chunk.text)}</mark> `;
          }
          return `<span style="color: var(--text-main);">${escapeHtml(chunk.text)}</span> `;
        }).join("");
      }

      container.innerHTML = html;
    } catch (err) {
      container.innerHTML = `<div style="color: #ef4444; padding: 20px;">Error extracting text diff: ${escapeHtml(err.message)}</div>`;
    } finally {
      this.isAnalyzing = false;
    }
  },

  computeWordDiff(textA, textB) {
    const wordsA = textA.split(/\s+/).filter(Boolean);
    const wordsB = textB.split(/\s+/).filter(Boolean);

    const diff = [];
    let i = 0, j = 0;

    while (i < wordsA.length || j < wordsB.length) {
      if (i < wordsA.length && j < wordsB.length && wordsA[i] === wordsB[j]) {
        diff.push({ type: "same", text: wordsA[i] });
        i++;
        j++;
      } else if (j < wordsB.length && (!wordsA.includes(wordsB[j]) || wordsB.indexOf(wordsA[i]) === -1)) {
        diff.push({ type: "added", text: wordsB[j] });
        j++;
      } else if (i < wordsA.length) {
        diff.push({ type: "removed", text: wordsA[i] });
        i++;
      } else if (j < wordsB.length) {
        diff.push({ type: "added", text: wordsB[j] });
        j++;
      }
    }

    return diff;
  },

  exportTextReport() {
    if (!this.textDiffData || this.textDiffData.length === 0) {
      if (this.app?.showToast) this.app.showToast("No difference data available to export for this page.", "warning");
      else if (window.app?.showToast) window.app.showToast("No difference data available to export for this page.", "warning");
      return;
    }

    let report = `PDF DIFFERENCE INSPECTION REPORT\r\n`;
    report += `================================\r\n`;
    report += `Baseline (A): ${this.fileA ? this.fileA.name : 'Document A'}\r\n`;
    report += `Modified (B): ${this.fileB ? this.fileB.name : 'Document B'}\r\n`;
    report += `Page: ${this.currentPage} of ${this.totalPages}\r\n`;
    report += `Generated: ${new Date().toLocaleString()}\r\n\r\n`;
    report += `DIFF STREAM:\r\n--------------------------------\r\n`;

    this.textDiffData.forEach(item => {
      if (item.type === "added") {
        report += `[+] ${item.text}\r\n`;
      } else if (item.type === "removed") {
        report += `[-] ${item.text}\r\n`;
      }
    });

    const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diff-report-page-${this.currentPage}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  },

  copyDiffToClipboard() {
    if (!this.textDiffData) return;
    const text = this.textDiffData
      .filter(d => d.type !== "same")
      .map(d => `${d.type === 'added' ? '+' : '-'} ${d.text}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    if (this.app?.showToast) this.app.showToast("Copied differences to clipboard!", "success");
    else if (window.app?.showToast) window.app.showToast("Copied differences to clipboard!", "success");
  },

  refreshWorkspace() {
    const ws = document.getElementById("compare-workspace");
    if (!ws) return;
    ws.innerHTML = this.activeTab === 'visual' ? this.renderVisualWorkspace() : this.renderTextWorkspace();

    if (this.visualMode === "wipe-slider") {
      const wrap = document.getElementById("wipe-overlay-wrap");
      if (wrap) wrap.style.width = `${this.sliderPos}%`;
    }

    this.renderCurrentComparison();
  },

  refreshUI() {
    const host = this.container || document.getElementById("active-tool-viewport");
    if (host) {
      const split = host.querySelector(".tool-content-layout.split-view");
      if (split) {
        split.outerHTML = this.renderUI();
      } else {
        host.innerHTML = this.renderUI();
      }
      this.bindEvents();
      this.renderCurrentComparison();
    }
  },

  cleanup() {
    if (this.docA) {
      try { this.docA.destroy(); } catch (_) {}
      this.docA = null;
    }
    if (this.docB) {
      try { this.docB.destroy(); } catch (_) {}
      this.docB = null;
    }
    this.fileA = null;
    this.fileB = null;
    this.textDiffData = null;
  }
};
