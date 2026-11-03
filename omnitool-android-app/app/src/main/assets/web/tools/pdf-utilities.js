import { escapeHtml } from './utils.js';

function dataURLtoUint8Array(dataUrl) {
  const arr = dataUrl.split(',');
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return u8arr;
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(link.href), 1500);
}

export default {
  id: "pdf-utilities",
  name: "PDF Toolbox (Split, Merge, Convert & Compress)",
  
  // State variables for the tool
  pdfDoc: null, // Holds arrayBuffer of primary uploaded PDF
  pdfjs: null,
  pdfLib: null,
  jszip: null,
  totalPages: 0,
  pageOrder: [], // Array of page numbers [1, 2, 3, ...]
  pageRotations: {}, // { [pageNum]: degrees (0, 90, 180, 270) }
  selectedPages: new Set(), // Track selected pages (1-indexed)
  isProcessing: false,
  fileName: "",
  
  // Merge tab state
  mergeFiles: [], // Array of { id, name, size, buffer, numPages }

  renderUI() {
    return `
      <div class="tool-content-layout split-view pdf-toolbox-wrapper">
        <!-- Left Configuration Panel -->
        <div class="tool-panel">
          <div class="panel-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="tool-badge-pill">PDF Suite</span>
              <h3 style="margin: 0; font-size: 16px;">PDF Operations</h3>
            </div>
            <button class="tool-btn secondary" id="pdf-util-clear" disabled title="Reset and clear loaded PDF">Clear File</button>
          </div>
          
          <!-- Primary Document Dropzone -->
          <div class="pdf-dropzone" id="pdf-util-dropzone">
            <svg viewBox="0 0 24 24" class="dropzone-icon">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <polyline points="9 15 12 12 15 15"></polyline>
            </svg>
            <p class="dropzone-text">Drag &amp; drop a PDF here or <span>browse files</span></p>
            <span class="dropzone-subtext">Client-Side Sandbox • 100% Private &amp; Offline</span>
            <input type="file" id="pdf-util-file-input" accept=".pdf" style="display: none;">
          </div>

          <!-- Document Info Card -->
          <div id="pdf-util-info" class="pdf-info-card hidden">
            <div class="info-row">
              <span class="info-label">File:</span>
              <span class="info-value" id="info-file-name" title="">-</span>
            </div>
            <div class="info-row">
              <span class="info-label">Pages:</span>
              <span class="info-value" id="info-page-count">-</span>
            </div>
            <div class="info-row">
              <span class="info-label">Size:</span>
              <span class="info-value" id="info-file-size">-</span>
            </div>
          </div>

          <!-- Feature Tabs -->
          <div class="pdf-util-tabs" id="pdf-util-tabs-wrapper">
            <div class="util-tab-headers">
              <button class="util-tab active" data-tab="split">Split &amp; Save</button>
              <button class="util-tab" data-tab="merge">Merge PDFs</button>
              <button class="util-tab" data-tab="rotate">Organize &amp; Rotate</button>
              <button class="util-tab" data-tab="compress">Compress</button>
            </div>

            <!-- TAB 1: SPLIT & EXTRACT IN MULTIPLE FORMATS -->
            <div class="util-tab-content active" id="tab-split-content">
              <div class="form-group" style="margin-bottom: 12px;">
                <label for="pdf-split-range" style="font-size: 12px; font-weight: 600; margin-bottom: 6px; display: flex; justify-content: space-between;">
                  <span>Selected Page Range:</span>
                  <span id="pdf-selected-count-badge" style="color: var(--accent-cyan); font-weight: bold;">0 pages</span>
                </label>
                <input type="text" class="form-control" id="pdf-split-range" placeholder="e.g. 1-3, 5, 8-10" disabled>
                <p style="font-size: 11px; color: var(--text-muted); margin: 6px 0 0 0;">
                  Click thumbnails on the right to toggle pages or enter custom range numbers.
                </p>
              </div>
              
              <!-- Quick Select Buttons -->
              <div style="display: flex; gap: 6px; margin-bottom: 16px;">
                <button class="tool-btn secondary" id="pdf-select-all" style="flex: 1; font-size: 11px; padding: 6px 8px;" disabled>All Pages</button>
                <button class="tool-btn secondary" id="pdf-select-odd" style="flex: 1; font-size: 11px; padding: 6px 8px;" disabled>Odd</button>
                <button class="tool-btn secondary" id="pdf-select-even" style="flex: 1; font-size: 11px; padding: 6px 8px;" disabled>Even</button>
                <button class="tool-btn secondary" id="pdf-select-none" style="flex: 1; font-size: 11px; padding: 6px 8px;" disabled>Clear</button>
              </div>

              <!-- Output Format Selector (The Core Upgrade) -->
              <div class="form-group" style="margin-bottom: 14px; background: rgba(255,255,255,0.02); padding: 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                <label for="pdf-export-format" style="font-size: 12px; font-weight: 600; margin-bottom: 6px; display: block; color: var(--accent-cyan);">
                  💾 Save / Export Format:
                </label>
                <select class="form-select" id="pdf-export-format" style="width: 100%; margin-bottom: 10px;" disabled>
                  <optgroup label="📄 PDF Formats">
                    <option value="pdf_single" selected>Combined PDF Document (.pdf)</option>
                    <option value="pdf_zip">Individual PDF Pages (.pdf in .zip)</option>
                  </optgroup>
                  <optgroup label="🖼️ Image Formats (High Resolution)">
                    <option value="png_zip">PNG Images (.png lossless)</option>
                    <option value="jpg_zip">JPEG Images (.jpg photos)</option>
                    <option value="webp_zip">WebP Images (.webp compact)</option>
                  </optgroup>
                  <optgroup label="📝 Text &amp; Data Extraction">
                    <option value="txt">Extracted Plain Text (.txt)</option>
                    <option value="json">Extracted JSON Data &amp; Structure (.json)</option>
                  </optgroup>
                </select>

                <!-- Format-Specific Settings: Resolution & Quality -->
                <div id="pdf-image-options-group" style="display: none; flex-direction: column; gap: 8px;">
                  <div style="display: flex; gap: 8px; align-items: center;">
                    <label for="pdf-render-dpi" style="font-size: 11px; color: var(--text-muted); flex: 1;">Render Resolution:</label>
                    <select class="form-select" id="pdf-render-dpi" style="flex: 1.5; font-size: 11px; padding: 4px 8px;">
                      <option value="100">Standard (100 DPI - Fast)</option>
                      <option value="150" selected>High-Res (150 DPI - Sharp)</option>
                      <option value="300">Ultra Print (300 DPI - Crisp)</option>
                    </select>
                  </div>

                  <div id="pdf-jpg-quality-row" style="display: none; align-items: center; justify-content: space-between; gap: 8px;">
                    <label for="pdf-jpg-quality" style="font-size: 11px; color: var(--text-muted);">Image Quality:</label>
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <input type="range" id="pdf-jpg-quality" min="0.4" max="1.0" step="0.05" value="0.9" style="width: 100px;">
                      <span id="pdf-quality-val" style="font-size: 11px; font-weight: bold; width: 32px;">90%</span>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                    <input type="checkbox" id="pdf-force-zip" checked style="accent-color: var(--accent-cyan);">
                    <label for="pdf-force-zip" style="font-size: 11px; color: var(--text-muted); cursor: pointer;">
                      Bundle multi-page images into single .ZIP archive
                    </label>
                  </div>
                </div>
              </div>

              <!-- Action Button -->
              <button class="tool-btn primary" id="pdf-split-btn" style="width: 100%; height: 42px; font-size: 13px;" disabled>
                <svg viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 6px; vertical-align: middle; stroke: currentColor; fill: none; stroke-width: 2;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span id="pdf-split-btn-label">Extract &amp; Download Combined PDF</span>
              </button>
            </div>

            <!-- TAB 2: MERGE MULTIPLE PDFS (EXTRA FEATURE) -->
            <div class="util-tab-content hidden" id="tab-merge-content">
              <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
                Combine multiple PDF documents into a single consolidated file in your chosen order.
              </p>

              <!-- Merge File Adder Dropzone -->
              <div class="pdf-merge-dropzone" id="pdf-merge-dropzone">
                <svg viewBox="0 0 24 24" style="width: 28px; height: 28px; stroke: var(--accent-cyan); fill: none; stroke-width: 2; margin-bottom: 6px;">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span style="font-size: 12px; font-weight: 500;">Add PDFs to Merge Queue</span>
                <span style="font-size: 10px; color: var(--text-muted);">Click or drag &amp; drop multiple PDFs</span>
                <input type="file" id="pdf-merge-file-input" multiple accept=".pdf" style="display: none;">
              </div>

              <!-- Merge File List -->
              <div class="pdf-merge-list-container" id="pdf-merge-list-container">
                <div class="empty-merge-msg" id="empty-merge-msg" style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 12px;">
                  No documents in queue yet. Add 2 or more PDFs to combine them.
                </div>
                <div class="pdf-merge-items" id="pdf-merge-items"></div>
              </div>

              <div style="margin-top: 14px; display: flex; gap: 8px;">
                <button class="tool-btn secondary" id="pdf-merge-clear-all" style="flex: 1; font-size: 11px;" disabled>Clear Queue</button>
                <button class="tool-btn primary" id="pdf-merge-btn" style="flex: 2; font-size: 12px;" disabled>Merge &amp; Download PDF</button>
              </div>
            </div>

            <!-- TAB 3: ROTATE & REORGANIZE (EXTRA FEATURE) -->
            <div class="util-tab-content hidden" id="tab-rotate-content">
              <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
                Rotate pages orientation, delete unwanted pages, or reorganize layout.
              </p>

              <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
                <div style="display: flex; gap: 8px;">
                  <button class="tool-btn secondary" id="pdf-rotate-selected-cw" style="flex: 1; font-size: 11px;" disabled>
                    🔄 Rotate Selected 90° CW
                  </button>
                  <button class="tool-btn secondary" id="pdf-rotate-selected-180" style="flex: 1; font-size: 11px;" disabled>
                    🔄 Rotate 180°
                  </button>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="tool-btn secondary" id="pdf-rotate-all-cw" style="flex: 1; font-size: 11px;" disabled>
                    🔁 Rotate All Pages 90° CW
                  </button>
                  <button class="tool-btn secondary" id="pdf-delete-selected" style="flex: 1; font-size: 11px; color: #ff6b6b;" disabled>
                    🗑️ Delete Selected
                  </button>
                </div>
              </div>

              <button class="tool-btn primary" id="pdf-save-rotated-btn" style="width: 100%;" disabled>
                Save &amp; Download Updated PDF
              </button>
            </div>

            <!-- TAB 4: COMPRESS PDF -->
            <div class="util-tab-content hidden" id="tab-compress-content">
              <div class="form-group" style="margin-bottom: 16px;">
                <label for="pdf-compress-profile" style="font-size: 12px; font-weight: 600; margin-bottom: 6px; display: block;">
                  Device Profile / Quality Mode:
                </label>
                <select class="form-select" id="pdf-compress-profile" style="width: 100%;" disabled>
                  <option value="performance">Maximum Compression (Low DPI / High Speed - 100 DPI)</option>
                  <option value="balanced" selected>Balanced Mode (Standard Quality - 150 DPI)</option>
                  <option value="accuracy">High Fidelity Mode (Preserve Detail - 200 DPI)</option>
                </select>
                <p style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">
                  Compression renders pages through an optimized raster canvas pipeline to drastically reduce bloated vector scans and heavy embedded imagery.
                </p>
              </div>

              <button class="tool-btn primary" id="pdf-compress-btn" style="width: 100%;" disabled>Compress &amp; Download PDF</button>
            </div>
          </div>

          <!-- Progress Bar Indicator -->
          <div id="pdf-progress-card" class="pdf-progress-card hidden" style="margin-top: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px;">
              <span id="pdf-progress-text" style="color: var(--accent-cyan); font-weight: 600;">Processing...</span>
              <span id="pdf-progress-percent" style="font-weight: bold;">0%</span>
            </div>
            <div class="pdf-progress-track">
              <div class="pdf-progress-bar" id="pdf-progress-bar" style="width: 0%;"></div>
            </div>
          </div>
        </div>

        <!-- Right Preview & Thumbnail Grid Panel -->
        <div class="tool-panel" style="display: flex; flex-direction: column;">
          <div class="panel-header">
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3>Visual Page Inspector</h3>
              <span class="preview-count-pill" id="preview-count-pill" style="display: none;">0 pages</span>
            </div>
            <span class="preview-status" id="preview-status" style="font-size: 12px; color: var(--text-muted);">No document loaded.</span>
          </div>

          <div class="pdf-viewer-scroll-container" id="pdf-viewer-scroll-container">
            <div class="pdf-thumbnail-grid" id="pdf-thumbnail-grid">
              <!-- Dynamically populated page cards -->
              <div class="empty-results-msg" style="padding: 80px 20px; text-align: center;">
                <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; stroke: rgba(255,255,255,0.2); fill: none; stroke-width: 1.5; margin-bottom: 12px;">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                <p style="margin: 0; font-size: 13px; color: var(--text-muted);">Upload a PDF to view page thumbnails, inspect pages in full-screen, rotate, and select ranges.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide &amp; Instructions</span>
            </div>
            <button class="tool-btn secondary" id="pdf-guide-load-sample" style="font-size: 11px;">Try 5-Page Sample</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Import or Drag Files</strong>: Load single or multiple PDFs. Everything runs 100% in local memory with zero cloud uploads.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Select Output Format</strong>: Choose between combined PDF, individual PDFs in ZIP, PNG/JPG/WebP high-res images, or text/JSON data.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Inspect &amp; Export</strong>: Use the visual thumbnail actions to inspect full-screen or download individual pages with a single click.</div>
            </div>
          </div>
        </div>
      </div>

      <!-- High-Resolution Full-Screen Zoom Modal -->
      <div id="pdf-zoom-modal" class="pdf-modal-overlay hidden">
        <div class="pdf-modal-container">
          <div class="pdf-modal-header">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span id="pdf-modal-title" style="font-weight: 600; font-size: 14px;">Page Inspector</span>
              <span id="pdf-modal-page-indicator" style="font-size: 12px; color: var(--accent-cyan); font-weight: 500;">-</span>
            </div>
            
            <!-- Zoom & Page Controls -->
            <div class="pdf-modal-controls">
              <!-- Navigation -->
              <div class="modal-btn-group">
                <button class="modal-icon-btn" id="pdf-modal-prev" title="Previous Page (Left Arrow)">◀ Prev</button>
                <button class="modal-icon-btn" id="pdf-modal-next" title="Next Page (Right Arrow)">Next ▶</button>
              </div>

              <!-- Zoom Tools -->
              <div class="modal-btn-group">
                <button class="modal-icon-btn" id="pdf-modal-zoom-out" title="Zoom Out (-)">−</button>
                <span class="modal-zoom-badge" id="pdf-modal-zoom-badge">Fit Page</span>
                <button class="modal-icon-btn" id="pdf-modal-zoom-in" title="Zoom In (+)">+</button>
                <button class="modal-icon-btn" id="pdf-modal-fit-page" title="Fit Entire Page (0)">⛶ Fit Page</button>
                <button class="modal-icon-btn" id="pdf-modal-fit-width" title="Fit Page Width">↔ Fit Width</button>
              </div>

              <!-- Rotate -->
              <button class="tool-btn secondary" id="pdf-modal-rotate-btn" style="padding: 5px 9px; font-size: 12px;" title="Rotate 90° Clockwise">🔄 Rotate</button>

              <!-- Downloads -->
              <div class="modal-btn-group">
                <button class="modal-icon-btn" id="pdf-modal-save-png" title="Download current page as PNG">PNG</button>
                <button class="modal-icon-btn" id="pdf-modal-save-jpg" title="Download current page as JPG">JPG</button>
                <button class="modal-icon-btn" id="pdf-modal-save-pdf" title="Download current page as PDF">PDF</button>
              </div>

              <!-- Close -->
              <button class="tool-btn secondary" id="pdf-modal-close" style="padding: 4px 10px; font-weight: bold; margin-left: 4px;" title="Close Preview (Esc)">✕</button>
            </div>
          </div>
          
          <div class="pdf-modal-body" id="pdf-modal-body">
            <div id="pdf-modal-canvas-wrapper" class="pdf-modal-canvas-wrapper">
              <!-- High-res preview canvas rendered here -->
            </div>
          </div>
        </div>
      </div>

      <style>
        @media (max-width: 1200px) {
          .pdf-toolbox-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
          }
        }
        .tool-badge-pill {
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 242, 254, 0.3);
          border-radius: 12px;
          padding: 2px 8px;
          font-size: 10px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .pdf-dropzone, .pdf-merge-dropzone {
          border: 2px dashed rgba(0, 242, 254, 0.35);
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          padding: 24px 16px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          user-select: none;
        }
        .pdf-dropzone:hover, .pdf-dropzone.dragover,
        .pdf-merge-dropzone:hover, .pdf-merge-dropzone.dragover {
          border-color: var(--accent-cyan);
          background: rgba(0, 242, 254, 0.06);
          box-shadow: 0 0 16px rgba(0, 242, 254, 0.15);
        }
        .dropzone-icon {
          width: 40px;
          height: 40px;
          stroke: rgba(0, 242, 254, 0.8);
          margin-bottom: 8px;
          transition: transform 0.25s ease;
        }
        .pdf-dropzone:hover .dropzone-icon {
          transform: translateY(-3px) scale(1.05);
          stroke: var(--accent-cyan);
        }
        .dropzone-text {
          font-size: 13px;
          color: var(--text-color);
          margin: 0;
        }
        .dropzone-text span {
          color: var(--accent-cyan);
          text-decoration: underline;
          font-weight: 600;
        }
        .dropzone-subtext {
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 4px;
        }
        
        .pdf-info-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          padding: 3px 0;
        }
        .info-row:not(:last-child) {
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
        }
        .info-label {
          color: var(--text-muted);
        }
        .info-value {
          font-weight: 500;
          color: var(--accent-cyan);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          max-width: 70%;
        }

        .util-tab-headers {
          display: flex;
          gap: 6px;
          margin-bottom: 14px;
          background: rgba(0, 0, 0, 0.2);
          padding: 4px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .util-tab {
          flex: 1;
          padding: 8px 4px;
          font-size: 11px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-muted);
          transition: all 0.2s ease;
          text-align: center;
        }
        .util-tab:hover {
          color: var(--text-color);
          background: rgba(255, 255, 255, 0.04);
        }
        .util-tab.active {
          background: rgba(0, 242, 254, 0.12) !important;
          border-color: rgba(0, 242, 254, 0.35) !important;
          color: var(--accent-cyan) !important;
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.1);
        }
        .util-tab-content.hidden {
          display: none !important;
        }
        
        .pdf-viewer-scroll-container {
          flex: 1;
          overflow-y: auto;
          background: rgba(0, 0, 0, 0.25);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 16px;
          min-height: 480px;
          max-height: 640px;
        }
        .pdf-thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
          gap: 14px;
          justify-content: center;
        }
        
        .thumbnail-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        .thumbnail-card:hover {
          border-color: rgba(0, 242, 254, 0.45);
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }
        .thumbnail-card.selected {
          border-color: var(--accent-cyan);
          background: rgba(0, 242, 254, 0.09);
          box-shadow: 0 0 12px rgba(0, 242, 254, 0.2);
        }
        .thumbnail-card-actions {
          position: absolute;
          top: 6px;
          right: 6px;
          display: flex;
          gap: 4px;
          opacity: 0;
          transition: opacity 0.2s ease;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(4px);
          padding: 2px 4px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 2;
        }
        .thumbnail-card:hover .thumbnail-card-actions {
          opacity: 1;
        }
        .thumb-action-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          font-size: 11px;
          padding: 2px 4px;
          border-radius: 4px;
          line-height: 1;
          transition: all 0.15s;
        }
        .thumb-action-btn:hover {
          color: var(--accent-cyan);
          background: rgba(255, 255, 255, 0.1);
        }

        .thumbnail-canvas-wrapper {
          width: 100%;
          aspect-ratio: 0.707;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
        }
        .thumbnail-canvas-wrapper canvas {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.2s ease;
        }
        .thumbnail-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          font-size: 11px;
          font-weight: 500;
          padding-top: 2px;
        }
        .thumbnail-checkbox {
          width: 15px;
          height: 15px;
          cursor: pointer;
          accent-color: var(--accent-cyan);
        }

        /* Progress Card */
        .pdf-progress-card {
          background: rgba(0, 242, 254, 0.05);
          border: 1px solid rgba(0, 242, 254, 0.25);
          border-radius: 8px;
          padding: 10px 12px;
        }
        .pdf-progress-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 3px;
          overflow: hidden;
        }
        .pdf-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #00f2fe, #4facfe);
          border-radius: 3px;
          transition: width 0.2s ease;
        }

        /* Merge Queue */
        .pdf-merge-list-container {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          max-height: 220px;
          overflow-y: auto;
        }
        .pdf-merge-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 12px;
          font-size: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .pdf-merge-item-info {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          max-width: 65%;
        }
        .pdf-merge-item-name {
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .pdf-merge-item-meta {
          font-size: 10px;
          color: var(--text-muted);
        }
        .pdf-merge-item-actions {
          display: flex;
          gap: 4px;
        }
        .merge-mini-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          border-radius: 4px;
          padding: 2px 6px;
          font-size: 10px;
          cursor: pointer;
        }
        .merge-mini-btn:hover {
          color: var(--accent-cyan);
          border-color: rgba(0, 242, 254, 0.3);
        }

        /* Zoom Modal */
        .pdf-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(10px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }
        .pdf-modal-container {
          background: #0b1120;
          border: 1px solid rgba(0, 242, 254, 0.25);
          border-radius: 14px;
          width: 95vw;
          max-width: 1100px;
          height: 92vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.1);
          overflow: hidden;
        }
        .pdf-modal-header {
          padding: 10px 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: space-between;
          align-items: center;
          background: rgba(15, 23, 42, 0.85);
          user-select: none;
        }
        .pdf-modal-controls {
          display: flex;
          gap: 6px;
          align-items: center;
          flex-wrap: wrap;
        }
        .modal-btn-group {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          overflow: hidden;
        }
        .modal-icon-btn {
          background: transparent;
          border: none;
          color: var(--text-color);
          padding: 5px 9px;
          font-size: 11.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
        .modal-icon-btn:hover {
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
        }
        .modal-icon-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .modal-zoom-badge {
          font-size: 11px;
          font-weight: 600;
          color: var(--accent-cyan);
          padding: 0 8px;
          min-width: 58px;
          text-align: center;
          user-select: none;
        }
        .pdf-modal-body {
          flex: 1;
          overflow: auto;
          display: flex;
          justify-content: center;
          align-items: flex-start; /* CRITICAL: Never center scrollable flex container! */
          padding: 24px;
          background: radial-gradient(circle at center, rgba(30, 41, 59, 0.5) 0%, rgba(11, 17, 32, 0.95) 100%);
        }
        .pdf-modal-canvas-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          margin: auto; /* Centers when smaller than body, starts at top-left when larger! */
          position: relative;
        }
        .pdf-modal-canvas-wrapper canvas {
          display: block;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7), 0 0 1px rgba(255, 255, 255, 0.25);
          border-radius: 4px;
          background: #ffffff;
        }

        .preview-count-pill {
          font-size: 11px;
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 8px;
          border-radius: 10px;
          color: var(--text-muted);
        }
        .hidden {
          display: none !important;
        }
      </style>
    `;
  },

  async init(container, appInstance) {
    // Reset state variables
    this.pdfDoc = null;
    this.activePdf = null;
    this.totalPages = 0;
    this.pageOrder = [];
    this.pageRotations = {};
    this.selectedPages = new Set();
    this.isProcessing = false;
    this.fileName = "";
    this.mergeFiles = [];

    const fileInput = container.querySelector("#pdf-util-file-input");
    const dropzone = container.querySelector("#pdf-util-dropzone");
    const clearBtn = container.querySelector("#pdf-util-clear");
    const infoCard = container.querySelector("#pdf-util-info");
    const infoFileName = container.querySelector("#info-file-name");
    const infoPageCount = container.querySelector("#info-page-count");
    const infoFileSize = container.querySelector("#info-file-size");
    const previewCountPill = container.querySelector("#preview-count-pill");

    // Tab switching elements
    const tabs = container.querySelectorAll(".util-tab");
    const tabContents = container.querySelectorAll(".util-tab-content");

    // Split / Export elements
    const splitRangeInput = container.querySelector("#pdf-split-range");
    const selectedCountBadge = container.querySelector("#pdf-selected-count-badge");
    const allBtn = container.querySelector("#pdf-select-all");
    const oddBtn = container.querySelector("#pdf-select-odd");
    const evenBtn = container.querySelector("#pdf-select-even");
    const noneBtn = container.querySelector("#pdf-select-none");
    const exportFormatSelect = container.querySelector("#pdf-export-format");
    const imageOptionsGroup = container.querySelector("#pdf-image-options-group");
    const renderDpiSelect = container.querySelector("#pdf-render-dpi");
    const jpgQualityRow = container.querySelector("#pdf-jpg-quality-row");
    const jpgQualitySlider = container.querySelector("#pdf-jpg-quality");
    const qualityValSpan = container.querySelector("#pdf-quality-val");
    const forceZipCheckbox = container.querySelector("#pdf-force-zip");
    const splitBtn = container.querySelector("#pdf-split-btn");
    const splitBtnLabel = container.querySelector("#pdf-split-btn-label");

    // Merge elements
    const mergeDropzone = container.querySelector("#pdf-merge-dropzone");
    const mergeFileInput = container.querySelector("#pdf-merge-file-input");
    const mergeItemsContainer = container.querySelector("#pdf-merge-items");
    const emptyMergeMsg = container.querySelector("#empty-merge-msg");
    const mergeClearBtn = container.querySelector("#pdf-merge-clear-all");
    const mergeBtn = container.querySelector("#pdf-merge-btn");

    // Rotate elements
    const rotateSelectedCwBtn = container.querySelector("#pdf-rotate-selected-cw");
    const rotateSelected180Btn = container.querySelector("#pdf-rotate-selected-180");
    const rotateAllCwBtn = container.querySelector("#pdf-rotate-all-cw");
    const deleteSelectedBtn = container.querySelector("#pdf-delete-selected");
    const saveRotatedBtn = container.querySelector("#pdf-save-rotated-btn");

    // Compress elements
    const compressProfileSelect = container.querySelector("#pdf-compress-profile");
    const compressBtn = container.querySelector("#pdf-compress-btn");

    // Progress elements
    const progressCard = container.querySelector("#pdf-progress-card");
    const progressText = container.querySelector("#pdf-progress-text");
    const progressPercent = container.querySelector("#pdf-progress-percent");
    const progressBar = container.querySelector("#pdf-progress-bar");

    // Preview panel
    const thumbnailGrid = container.querySelector("#pdf-thumbnail-grid");
    const previewStatus = container.querySelector("#preview-status");

    // Zoom Modal elements
    const zoomModal = container.querySelector("#pdf-zoom-modal");
    const modalBody = container.querySelector("#pdf-modal-body");
    const modalPageIndicator = container.querySelector("#pdf-modal-page-indicator");
    const modalCanvasWrapper = container.querySelector("#pdf-modal-canvas-wrapper");
    const modalPrevBtn = container.querySelector("#pdf-modal-prev");
    const modalNextBtn = container.querySelector("#pdf-modal-next");
    const modalCloseBtn = container.querySelector("#pdf-modal-close");
    const modalSavePngBtn = container.querySelector("#pdf-modal-save-png");
    const modalSaveJpgBtn = container.querySelector("#pdf-modal-save-jpg");
    const modalSavePdfBtn = container.querySelector("#pdf-modal-save-pdf");
    const modalZoomBadge = container.querySelector("#pdf-modal-zoom-badge");
    const modalZoomInBtn = container.querySelector("#pdf-modal-zoom-in");
    const modalZoomOutBtn = container.querySelector("#pdf-modal-zoom-out");
    const modalFitPageBtn = container.querySelector("#pdf-modal-fit-page");
    const modalFitWidthBtn = container.querySelector("#pdf-modal-fit-width");
    const modalRotateBtn = container.querySelector("#pdf-modal-rotate-btn");
    let currentModalPage = 1;
    let modalZoomMode = "fit"; // 'fit', 'width', or 'custom'
    let modalCustomScale = 1.0;

    // Library loading promises
    let pdfjsLoadingPromise = null;
    let pdfLibLoadingPromise = null;
    let jszipLoadingPromise = null;

    const loadPdfJs = () => {
      if (pdfjsLoadingPromise) return pdfjsLoadingPromise;
      pdfjsLoadingPromise = new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
          resolve(window.pdfjsLib);
          return;
        }
        previewStatus.innerText = "Loading PDF.js Engine...";
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
        script.onload = () => {
          const pdfjs = window["pdfjs-dist/build/pdf"];
          pdfjs.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
          window.pdfjsLib = pdfjs;
          resolve(pdfjs);
        };
        script.onerror = () => {
          pdfjsLoadingPromise = null;
          reject(new Error("Failed to load PDF.js engine"));
        };
        document.head.appendChild(script);
      });
      return pdfjsLoadingPromise;
    };

    const loadPdfLib = () => {
      if (pdfLibLoadingPromise) return pdfLibLoadingPromise;
      pdfLibLoadingPromise = new Promise((resolve, reject) => {
        if (window.PDFLib) {
          resolve(window.PDFLib);
          return;
        }
        previewStatus.innerText = "Loading PDF-Lib Engine...";
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
        script.onload = () => resolve(window.PDFLib);
        script.onerror = () => {
          pdfLibLoadingPromise = null;
          reject(new Error("Failed to load PDF-Lib engine"));
        };
        document.head.appendChild(script);
      });
      return pdfLibLoadingPromise;
    };

    const loadJsZip = () => {
      if (jszipLoadingPromise) return jszipLoadingPromise;
      jszipLoadingPromise = new Promise((resolve, reject) => {
        if (window.JSZip) {
          resolve(window.JSZip);
          return;
        }
        previewStatus.innerText = "Loading JSZip Archiver...";
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
        script.onload = () => resolve(window.JSZip);
        script.onerror = () => {
          jszipLoadingPromise = null;
          reject(new Error("Failed to load JSZip engine"));
        };
        document.head.appendChild(script);
      });
      return jszipLoadingPromise;
    };

    const updateProgressBar = (percent, text) => {
      progressCard.classList.remove("hidden");
      const cleanPercent = Math.min(100, Math.max(0, Math.round(percent)));
      progressBar.style.width = `${cleanPercent}%`;
      progressPercent.innerText = `${cleanPercent}%`;
      if (text) {
        progressText.innerText = text;
        previewStatus.innerText = text;
      }
    };

    const setProcessing = (busy, text = "") => {
      this.isProcessing = busy;
      if (busy) {
        updateProgressBar(0, text);
        splitBtn.disabled = true;
        compressBtn.disabled = true;
        clearBtn.disabled = true;
        mergeBtn.disabled = true;
        saveRotatedBtn.disabled = true;
      } else {
        setTimeout(() => {
          progressCard.classList.add("hidden");
        }, 1200);
        splitBtn.disabled = false;
        compressBtn.disabled = false;
        clearBtn.disabled = false;
        mergeBtn.disabled = (this.mergeFiles.length < 2);
        saveRotatedBtn.disabled = false;
      }
    };

    // Format selector changes
    const updateFormatUI = () => {
      const format = exportFormatSelect.value;
      const isImg = format.includes("png") || format.includes("jpg") || format.includes("webp");
      imageOptionsGroup.style.display = isImg ? "flex" : "none";
      jpgQualityRow.style.display = format.includes("jpg") ? "flex" : "none";

      if (format === "pdf_single") {
        splitBtnLabel.innerText = "Extract & Download Combined PDF";
      } else if (format === "pdf_zip") {
        splitBtnLabel.innerText = "Save as Separate PDFs (.ZIP)";
      } else if (format === "png_zip") {
        splitBtnLabel.innerText = "Export Selected as PNG Images";
      } else if (format === "jpg_zip") {
        splitBtnLabel.innerText = "Export Selected as JPG Images";
      } else if (format === "webp_zip") {
        splitBtnLabel.innerText = "Export Selected as WebP Images";
      } else if (format === "txt") {
        splitBtnLabel.innerText = "Extract & Download Plain Text (.txt)";
      } else if (format === "json") {
        splitBtnLabel.innerText = "Extract & Download Structured JSON";
      }
    };

    exportFormatSelect.addEventListener("change", updateFormatUI);

    jpgQualitySlider.addEventListener("input", () => {
      qualityValSpan.innerText = `${Math.round(parseFloat(jpgQualitySlider.value) * 100)}%`;
    });

    // Tab Switching
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tabContents.forEach(c => c.classList.add("hidden"));

        tab.classList.add("active");
        const targetContent = container.querySelector(`#tab-${tab.dataset.tab}-content`);
        if (targetContent) targetContent.classList.remove("hidden");
      });
    });

    // File Selection & Drag-and-drop
    dropzone.addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
    dropzone.addEventListener("dragleave", () => dropzone.classList.remove("dragover"));
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
      if (e.dataTransfer.files.length > 0) {
        handleFileSelection(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        handleFileSelection(fileInput.files[0]);
      }
    });

    // Reset All UI
    clearBtn.addEventListener("click", () => {
      if (this.activePdf) {
        this.activePdf.destroy().catch(() => {});
        this.activePdf = null;
      }
      this.pdfDoc = null;
      this.totalPages = 0;
      this.pageOrder = [];
      this.pageRotations = {};
      this.selectedPages.clear();
      this.fileName = "";
      fileInput.value = "";
      
      infoCard.classList.add("hidden");
      previewCountPill.style.display = "none";
      clearBtn.disabled = true;
      
      splitRangeInput.value = "";
      splitRangeInput.disabled = true;
      selectedCountBadge.innerText = "0 pages";
      allBtn.disabled = true;
      oddBtn.disabled = true;
      evenBtn.disabled = true;
      noneBtn.disabled = true;
      exportFormatSelect.disabled = true;
      splitBtn.disabled = true;
      
      rotateSelectedCwBtn.disabled = true;
      rotateSelected180Btn.disabled = true;
      rotateAllCwBtn.disabled = true;
      deleteSelectedBtn.disabled = true;
      saveRotatedBtn.disabled = true;

      compressProfileSelect.disabled = true;
      compressBtn.disabled = true;

      thumbnailGrid.innerHTML = `
        <div class="empty-results-msg" style="padding: 80px 20px; text-align: center;">
          <p style="margin: 0; font-size: 13px; color: var(--text-muted);">Upload a PDF to view page thumbnails and select ranges.</p>
        </div>
      `;
      previewStatus.innerText = "No document loaded.";
      appInstance.showToast("Cleared document", "info");
    });

    // Primary File Handler
    const handleFileSelection = async (file) => {
      if (!file || !file.name.toLowerCase().endsWith(".pdf")) {
        appInstance.showToast("Please upload a valid PDF document.", "error");
        return;
      }

      this.fileName = file.name;
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";

      let pdf = null;
      try {
        previewStatus.innerText = "Initializing PDF engine...";
        this.pdfjs = await loadPdfJs();
        this.pdfLib = await loadPdfLib();

        previewStatus.innerText = "Reading document buffer...";
        const arrayBuffer = await file.arrayBuffer();
        this.pdfDoc = arrayBuffer;

        if (this.activePdf) {
          await this.activePdf.destroy().catch(() => {});
          this.activePdf = null;
        }

        const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(arrayBuffer.slice(0)) });
        pdf = await loadingTask.promise;
        this.activePdf = pdf;
        this.totalPages = pdf.numPages;
        this.pageOrder = Array.from({ length: pdf.numPages }, (_, i) => i + 1);
        this.pageRotations = {};
        this.pageOrder.forEach(p => this.pageRotations[p] = 0);

        // Update document info card
        infoFileName.innerText = file.name;
        infoFileName.title = file.name;
        infoPageCount.innerText = `${pdf.numPages} Page(s)`;
        infoFileSize.innerText = sizeStr;
        infoCard.classList.remove("hidden");
        previewCountPill.style.display = "inline-block";
        previewCountPill.innerText = `${pdf.numPages} pages`;

        // Enable UI Controls
        clearBtn.disabled = false;
        splitRangeInput.disabled = false;
        allBtn.disabled = false;
        oddBtn.disabled = false;
        evenBtn.disabled = false;
        noneBtn.disabled = false;
        exportFormatSelect.disabled = false;
        splitBtn.disabled = false;

        rotateSelectedCwBtn.disabled = false;
        rotateSelected180Btn.disabled = false;
        rotateAllCwBtn.disabled = false;
        deleteSelectedBtn.disabled = false;
        saveRotatedBtn.disabled = false;

        compressProfileSelect.disabled = false;
        compressBtn.disabled = false;

        // Auto select all pages by default
        this.selectedPages = new Set(this.pageOrder);
        updateRangeString();
        updateFormatUI();

        previewStatus.innerText = "Generating visual thumbnails...";
        await renderThumbnails(pdf);
      } catch (err) {
        if (pdf) {
          await pdf.destroy().catch(() => {});
          this.activePdf = null;
        }
        console.error(err);
        appInstance.showToast(`Failed to parse PDF: ${err.message}`, "error");
        previewStatus.innerText = `Error: ${err.message}`;
      }
    };

    // Render Page Thumbnails in Right Grid
    const renderThumbnails = async (pdf) => {
      thumbnailGrid.innerHTML = "";

      for (let idx = 0; idx < this.pageOrder.length; idx++) {
        if (!this.pdfDoc || appInstance.activeTool !== "pdf-utilities") break;
        const pageNum = this.pageOrder[idx];
        previewStatus.innerText = `Rendering thumbnail ${idx + 1} of ${this.pageOrder.length}...`;

        const page = await pdf.getPage(pageNum);
        const unscaledViewport = page.getViewport({ scale: 1.0, rotation: this.pageRotations[pageNum] || 0 });
        const scale = 140 / Math.max(unscaledViewport.width, unscaledViewport.height);
        const viewport = page.getViewport({ scale, rotation: this.pageRotations[pageNum] || 0 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({
          canvasContext: ctx,
          viewport: viewport
        }).promise;

        const card = document.createElement("div");
        card.className = "thumbnail-card" + (this.selectedPages.has(pageNum) ? " selected" : "");
        card.dataset.page = pageNum;

        card.innerHTML = `
          <div class="thumbnail-card-actions">
            <button class="thumb-action-btn zoom-btn" title="Inspect Page Full-Screen" data-page="${pageNum}">🔍</button>
            <button class="thumb-action-btn rotate-btn" title="Rotate 90° CW" data-page="${pageNum}">🔄</button>
            <button class="thumb-action-btn quick-export-btn" title="Quick Save this Page" data-page="${pageNum}">💾</button>
          </div>
          <div class="thumbnail-canvas-wrapper"></div>
          <div class="thumbnail-card-footer">
            <span>Page ${pageNum}</span>
            <input type="checkbox" class="thumbnail-checkbox" data-page="${pageNum}" ${this.selectedPages.has(pageNum) ? 'checked' : ''}>
          </div>
        `;

        card.querySelector(".thumbnail-canvas-wrapper").appendChild(canvas);
        thumbnailGrid.appendChild(card);

        // Click on thumbnail card selects/deselects
        const checkbox = card.querySelector(".thumbnail-checkbox");
        card.addEventListener("click", (e) => {
          if (e.target.closest(".thumb-action-btn")) return;
          if (e.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
          }
          if (checkbox.checked) {
            this.selectedPages.add(pageNum);
            card.classList.add("selected");
          } else {
            this.selectedPages.delete(pageNum);
            card.classList.remove("selected");
          }
          updateRangeString();
        });

        // Quick action: Zoom / Inspect
        card.querySelector(".zoom-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          openZoomModal(pageNum);
        });

        // Quick action: Rotate single page
        card.querySelector(".rotate-btn").addEventListener("click", async (e) => {
          e.stopPropagation();
          this.pageRotations[pageNum] = ((this.pageRotations[pageNum] || 0) + 90) % 360;
          appInstance.showToast(`Rotated Page ${pageNum} to ${this.pageRotations[pageNum]}°`, "info");
          // Re-render single thumbnail canvas
          const updatedPage = await pdf.getPage(pageNum);
          const newVp = updatedPage.getViewport({ scale, rotation: this.pageRotations[pageNum] });
          canvas.width = newVp.width;
          canvas.height = newVp.height;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await updatedPage.render({ canvasContext: ctx, viewport: newVp }).promise;
        });

        // Quick action: Single page instant download
        card.querySelector(".quick-export-btn").addEventListener("click", (e) => {
          e.stopPropagation();
          exportSinglePage(pageNum, "png");
        });
      }

      previewStatus.innerText = "Loaded successfully. Ready to split, convert, or compress.";
    };

    // Range string formatting helper
    const updateRangeString = () => {
      const sorted = Array.from(this.selectedPages).sort((a, b) => a - b);
      selectedCountBadge.innerText = `${sorted.length} page${sorted.length === 1 ? '' : 's'}`;
      if (sorted.length === 0) {
        splitRangeInput.value = "";
        return;
      }

      const parts = [];
      let start = sorted[0];
      let end = start;

      for (let j = 1; j < sorted.length; j++) {
        if (sorted[j] === end + 1) {
          end = sorted[j];
        } else {
          parts.push(start === end ? `${start}` : `${start}-${end}`);
          start = sorted[j];
          end = start;
        }
      }
      parts.push(start === end ? `${start}` : `${start}-${end}`);
      splitRangeInput.value = parts.join(", ");
    };

    // Manual Range input change
    splitRangeInput.addEventListener("input", () => {
      const val = splitRangeInput.value;
      this.selectedPages.clear();

      const parts = val.split(",").map(p => p.trim());
      parts.forEach(part => {
        if (/^\d+$/.test(part)) {
          const num = parseInt(part, 10);
          if (num >= 1 && num <= this.totalPages) this.selectedPages.add(num);
        } else if (/^\d+\s*-\s*\d+$/.test(part)) {
          const [startStr, endStr] = part.split("-");
          const start = parseInt(startStr.trim(), 10);
          const end = parseInt(endStr.trim(), 10);
          if (start >= 1 && end <= this.totalPages && start <= end) {
            for (let k = start; k <= end; k++) this.selectedPages.add(k);
          }
        }
      });

      syncSelectionClasses();
      selectedCountBadge.innerText = `${this.selectedPages.size} page${this.selectedPages.size === 1 ? '' : 's'}`;
    });

    const syncSelectionClasses = () => {
      const cards = thumbnailGrid.querySelectorAll(".thumbnail-card");
      cards.forEach(card => {
        const pageNum = parseInt(card.dataset.page, 10);
        const checkbox = card.querySelector(".thumbnail-checkbox");
        if (this.selectedPages.has(pageNum)) {
          card.classList.add("selected");
          if (checkbox) checkbox.checked = true;
        } else {
          card.classList.remove("selected");
          if (checkbox) checkbox.checked = false;
        }
      });
    };

    // Quick selection buttons
    allBtn.addEventListener("click", () => {
      this.selectedPages = new Set(this.pageOrder);
      syncSelectionClasses();
      updateRangeString();
    });

    oddBtn.addEventListener("click", () => {
      this.selectedPages = new Set(this.pageOrder.filter(p => p % 2 !== 0));
      syncSelectionClasses();
      updateRangeString();
    });

    evenBtn.addEventListener("click", () => {
      this.selectedPages = new Set(this.pageOrder.filter(p => p % 2 === 0));
      syncSelectionClasses();
      updateRangeString();
    });

    noneBtn.addEventListener("click", () => {
      this.selectedPages.clear();
      syncSelectionClasses();
      updateRangeString();
    });

    // ==========================================
    // MULTI-FORMAT SPLIT / EXPORT ENGINE
    // ==========================================
    splitBtn.addEventListener("click", async () => {
      if (!this.pdfDoc || this.selectedPages.size === 0) {
        appInstance.showToast("Please select at least 1 page to export.", "warning");
        return;
      }

      const format = exportFormatSelect.value;
      const sortedPages = Array.from(this.selectedPages).sort((a, b) => a - b);
      const baseName = this.fileName.substring(0, this.fileName.lastIndexOf(".")) || "document";

      try {
        setProcessing(true, `Starting export (${sortedPages.length} pages)...`);
        this.pdfjs = await loadPdfJs();
        this.pdfLib = await loadPdfLib();

        // 1. COMBINED PDF
        if (format === "pdf_single") {
          await exportCombinedPdf(sortedPages, baseName);
        }
        // 2. INDIVIDUAL PDFS IN ZIP
        else if (format === "pdf_zip") {
          await exportIndividualPdfsZip(sortedPages, baseName);
        }
        // 3. IMAGE FORMATS (PNG, JPG, WEBP)
        else if (format === "png_zip" || format === "jpg_zip" || format === "webp_zip") {
          await exportImages(sortedPages, baseName, format);
        }
        // 4. PLAIN TEXT EXTRACTION
        else if (format === "txt") {
          await exportText(sortedPages, baseName);
        }
        // 5. STRUCTURED JSON
        else if (format === "json") {
          await exportJson(sortedPages, baseName);
        }

        appInstance.showToast("Export completed successfully!", "success");
      } catch (err) {
        console.error("Export error:", err);
        appInstance.showToast(`Export failed: ${err.message}`, "error");
      } finally {
        setProcessing(false);
      }
    });

    // Export 1: Combined PDF
    const exportCombinedPdf = async (pages, baseName) => {
      updateProgressBar(10, "Creating PDF document...");
      let srcDoc = null;
      let isEncrypted = false;

      try {
        srcDoc = await this.pdfLib.PDFDocument.load(this.pdfDoc.slice(0));
      } catch (loadErr) {
        if (loadErr.message.toLowerCase().includes("encrypted")) {
          isEncrypted = true;
          srcDoc = await this.pdfLib.PDFDocument.load(this.pdfDoc.slice(0), { ignoreEncryption: true });
        } else {
          throw loadErr;
        }
      }

      const newDoc = await this.pdfLib.PDFDocument.create();
      let splitMethodSucceeded = false;

      if (!isEncrypted) {
        try {
          const indicesToCopy = pages.map(p => p - 1);
          const copiedPages = await newDoc.copyPages(srcDoc, indicesToCopy);
          copiedPages.forEach((page, i) => {
            const pageNum = pages[i];
            const rot = (this.pageRotations[pageNum] || 0) % 360;
            if (rot !== 0) {
              page.setRotation(this.pdfLib.degrees((page.getRotation().angle + rot) % 360));
            }
            newDoc.addPage(page);
          });
          splitMethodSucceeded = true;
        } catch (copyErr) {
          console.warn("Vector copy failed, falling back to canvas rebuild:", copyErr);
        }
      }

      if (!splitMethodSucceeded) {
        // High-res canvas rendering fallback
        const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) });
        const pdf = await loadingTask.promise;
        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          for (let i = 0; i < pages.length; i++) {
            const pNum = pages[i];
            updateProgressBar(20 + Math.round((i / pages.length) * 70), `Rendering page ${pNum} (${i + 1}/${pages.length})...`);
            const page = await pdf.getPage(pNum);
            const rot = this.pageRotations[pNum] || 0;
            const viewport = page.getViewport({ scale: 2.0, rotation: rot });

            canvas.width = viewport.width;
            canvas.height = viewport.height;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            await page.render({ canvasContext: ctx, viewport }).promise;

            const imgData = canvas.toDataURL("image/jpeg", 0.9);
            const imgBytes = dataURLtoUint8Array(imgData);
            const img = await newDoc.embedJpg(imgBytes);
            const unscaled = page.getViewport({ scale: 1.0, rotation: rot });
            const newPage = newDoc.addPage([unscaled.width, unscaled.height]);
            newPage.drawImage(img, { x: 0, y: 0, width: unscaled.width, height: unscaled.height });
          }
        } finally {
          await pdf.destroy().catch(() => {});
        }
      }

      updateProgressBar(95, "Compiling PDF bytes...");
      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      downloadBlob(blob, `${baseName}_extracted.pdf`);
    };

    // Export 2: Individual PDFs in ZIP
    const exportIndividualPdfsZip = async (pages, baseName) => {
      this.jszip = await loadJsZip();
      const zip = new this.jszip();
      const srcDoc = await this.pdfLib.PDFDocument.load(this.pdfDoc.slice(0));

      for (let i = 0; i < pages.length; i++) {
        const pNum = pages[i];
        updateProgressBar(10 + Math.round((i / pages.length) * 80), `Packaging single PDF ${pNum} (${i + 1}/${pages.length})...`);
        const singleDoc = await this.pdfLib.PDFDocument.create();
        const [copiedPage] = await singleDoc.copyPages(srcDoc, [pNum - 1]);
        const rot = this.pageRotations[pNum] || 0;
        if (rot !== 0) {
          copiedPage.setRotation(this.pdfLib.degrees((copiedPage.getRotation().angle + rot) % 360));
        }
        singleDoc.addPage(copiedPage);
        const singleBytes = await singleDoc.save();
        zip.file(`${baseName}_page_${pNum}.pdf`, singleBytes);
      }

      updateProgressBar(95, "Generating ZIP archive...");
      const zipBlob = await zip.generateAsync({ type: "blob" });
      downloadBlob(zipBlob, `${baseName}_pages_pdf.zip`);
    };

    // Export 3: Image Formats (PNG, JPG, WebP)
    const exportImages = async (pages, baseName, format) => {
      const mime = format.startsWith("png") ? "image/png" : (format.startsWith("webp") ? "image/webp" : "image/jpeg");
      const ext = format.startsWith("png") ? "png" : (format.startsWith("webp") ? "webp" : "jpg");
      const dpi = parseInt(renderDpiSelect.value, 10) || 150;
      const scale = dpi / 72; // 72 is standard unscaled PDF DPI
      const quality = parseFloat(jpgQualitySlider.value) || 0.9;
      const forceZip = forceZipCheckbox.checked;

      const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) });
      const pdf = await loadingTask.promise;

      try {
        // If 1 page selected and not forcing ZIP, download directly as single image
        if (pages.length === 1 && !forceZip) {
          const pNum = pages[0];
          updateProgressBar(50, `Rendering high-res ${ext.toUpperCase()} image...`);
          const page = await pdf.getPage(pNum);
          const rot = this.pageRotations[pNum] || 0;
          const viewport = page.getViewport({ scale, rotation: rot });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;

          canvas.toBlob((blob) => {
            downloadBlob(blob, `${baseName}_page_${pNum}.${ext}`);
          }, mime, quality);
          return;
        }

        // Multiple pages or ZIP packaging requested
        this.jszip = await loadJsZip();
        const zip = new this.jszip();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        for (let i = 0; i < pages.length; i++) {
          const pNum = pages[i];
          updateProgressBar(10 + Math.round((i / pages.length) * 80), `Rendering ${ext.toUpperCase()} page ${pNum} (${i + 1}/${pages.length})...`);
          const page = await pdf.getPage(pNum);
          const rot = this.pageRotations[pNum] || 0;
          const viewport = page.getViewport({ scale, rotation: rot });

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;

          const dataUrl = canvas.toDataURL(mime, quality);
          const u8 = dataURLtoUint8Array(dataUrl);
          zip.file(`${baseName}_page_${pNum}.${ext}`, u8);
        }

        updateProgressBar(95, "Building ZIP archive...");
        const zipBlob = await zip.generateAsync({ type: "blob" });
        downloadBlob(zipBlob, `${baseName}_pages_${ext}.zip`);
      } finally {
        await pdf.destroy().catch(() => {});
      }
    };

    // Export 4: Plain Text Extraction
    const exportText = async (pages, baseName) => {
      const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) });
      const pdf = await loadingTask.promise;
      let fullText = `--- Extracted Text from: ${this.fileName} ---\n--- Pages: ${pages.join(", ")} ---\n\n`;

      try {
        for (let i = 0; i < pages.length; i++) {
          const pNum = pages[i];
          updateProgressBar(10 + Math.round((i / pages.length) * 80), `Extracting text from page ${pNum}...`);
          const page = await pdf.getPage(pNum);
          const textContent = await page.getTextContent();
          const pageLines = textContent.items.map(item => item.str).join(" ");
          fullText += `========================================\nPAGE ${pNum}\n========================================\n\n${pageLines}\n\n`;
        }

        const blob = new Blob([fullText], { type: "text/plain;charset=utf-8" });
        downloadBlob(blob, `${baseName}_extracted_text.txt`);
      } finally {
        await pdf.destroy().catch(() => {});
      }
    };

    // Export 5: Structured JSON Extraction
    const exportJson = async (pages, baseName) => {
      const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) });
      const pdf = await loadingTask.promise;
      const resultData = {
        document: this.fileName,
        extractedAt: new Date().toISOString(),
        totalPagesInDocument: this.totalPages,
        selectedPagesCount: pages.length,
        pages: []
      };

      try {
        for (let i = 0; i < pages.length; i++) {
          const pNum = pages[i];
          updateProgressBar(10 + Math.round((i / pages.length) * 80), `Parsing data from page ${pNum}...`);
          const page = await pdf.getPage(pNum);
          const textContent = await page.getTextContent();
          const textItems = textContent.items.map(item => ({
            text: item.str,
            x: Math.round(item.transform[4] * 100) / 100,
            y: Math.round(item.transform[5] * 100) / 100,
            width: Math.round(item.width * 100) / 100,
            height: Math.round(item.height * 100) / 100
          }));
          const plainText = textContent.items.map(i => i.str).join(" ");

          resultData.pages.push({
            pageNumber: pNum,
            width: page.view[2],
            height: page.view[3],
            rotation: this.pageRotations[pNum] || 0,
            wordCount: plainText.trim() === "" ? 0 : plainText.trim().split(/\s+/).length,
            characterCount: plainText.length,
            text: plainText,
            items: textItems
          });
        }

        const blob = new Blob([JSON.stringify(resultData, null, 2)], { type: "application/json;charset=utf-8" });
        downloadBlob(blob, `${baseName}_metadata.json`);
      } finally {
        await pdf.destroy().catch(() => {});
      }
    };

    // Quick single page export from thumbnail card
    const exportSinglePage = async (pageNum, format) => {
      try {
        setProcessing(true, `Exporting Page ${pageNum} as ${format.toUpperCase()}...`);
        this.pdfjs = await loadPdfJs();
        this.pdfLib = await loadPdfLib();
        const baseName = this.fileName.substring(0, this.fileName.lastIndexOf(".")) || "page";

        if (format === "pdf") {
          let savedBytes = null;
          try {
            const srcDoc = await this.pdfLib.PDFDocument.load(this.pdfDoc.slice(0));
            const newDoc = await this.pdfLib.PDFDocument.create();
            const [copiedPage] = await newDoc.copyPages(srcDoc, [pageNum - 1]);
            const rot = this.pageRotations[pageNum] || 0;
            if (rot !== 0) {
              copiedPage.setRotation(this.pdfLib.degrees((copiedPage.getRotation().angle + rot) % 360));
            }
            newDoc.addPage(copiedPage);
            savedBytes = await newDoc.save();
          } catch (copyErr) {
            console.warn("Direct vector copy failed for single page, falling back to high-res canvas:", copyErr);
            const pdf = this.activePdf || (await this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) }).promise);
            const page = await pdf.getPage(pageNum);
            const rot = this.pageRotations[pageNum] || 0;
            const viewport = page.getViewport({ scale: 2.0, rotation: rot });

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            await page.render({ canvasContext: ctx, viewport }).promise;

            const newDoc = await this.pdfLib.PDFDocument.create();
            const imgData = canvas.toDataURL("image/jpeg", 0.95);
            const imgBytes = dataURLtoUint8Array(imgData);
            const img = await newDoc.embedJpg(imgBytes);
            const unscaled = page.getViewport({ scale: 1.0, rotation: rot });
            const newPage = newDoc.addPage([unscaled.width, unscaled.height]);
            newPage.drawImage(img, { x: 0, y: 0, width: unscaled.width, height: unscaled.height });
            savedBytes = await newDoc.save();
            if (!this.activePdf) await pdf.destroy().catch(() => {});
          }
          downloadBlob(new Blob([savedBytes], { type: "application/pdf" }), `${baseName}_page_${pageNum}.pdf`);
        } else {
          const pdf = this.activePdf || (await this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) }).promise);
          const page = await pdf.getPage(pageNum);
          const rot = this.pageRotations[pageNum] || 0;
          const viewport = page.getViewport({ scale: 2.0, rotation: rot });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;

          const mime = format === "jpg" ? "image/jpeg" : (format === "webp" ? "image/webp" : "image/png");
          canvas.toBlob((blob) => {
            downloadBlob(blob, `${baseName}_page_${pageNum}.${format}`);
          }, mime, 0.92);
          if (!this.activePdf) await pdf.destroy().catch(() => {});
        }
        appInstance.showToast(`Saved Page ${pageNum} successfully!`, "success");
      } catch (err) {
        console.error(err);
        appInstance.showToast(`Quick save failed: ${err.message}`, "error");
      } finally {
        setProcessing(false);
      }
    };

    // ==========================================
    // MERGE MULTIPLE PDFS ENGINE (EXTRA FEATURE)
    // ==========================================
    mergeDropzone.addEventListener("click", () => mergeFileInput.click());
    mergeDropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      mergeDropzone.classList.add("dragover");
    });
    mergeDropzone.addEventListener("dragleave", () => mergeDropzone.classList.remove("dragover"));
    mergeDropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      mergeDropzone.classList.remove("dragover");
      if (e.dataTransfer.files.length > 0) {
        handleMergeFiles(Array.from(e.dataTransfer.files));
      }
    });

    mergeFileInput.addEventListener("change", () => {
      if (mergeFileInput.files.length > 0) {
        handleMergeFiles(Array.from(mergeFileInput.files));
      }
    });

    const handleMergeFiles = async (files) => {
      const pdfFiles = files.filter(f => f.name.toLowerCase().endsWith(".pdf"));
      if (pdfFiles.length === 0) {
        appInstance.showToast("Please drop or select valid .PDF files.", "warning");
        return;
      }

      this.pdfLib = await loadPdfLib();
      for (const file of pdfFiles) {
        try {
          const buffer = await file.arrayBuffer();
          const doc = await this.pdfLib.PDFDocument.load(buffer.slice(0));
          this.mergeFiles.push({
            id: Date.now() + Math.random().toString(36).substr(2, 5),
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
            buffer: buffer,
            numPages: doc.getPageCount()
          });
        } catch (err) {
          appInstance.showToast(`Failed to parse ${file.name}: ${err.message}`, "error");
        }
      }

      renderMergeList();
    };

    const renderMergeList = () => {
      if (this.mergeFiles.length === 0) {
        emptyMergeMsg.style.display = "block";
        mergeItemsContainer.innerHTML = "";
        mergeClearBtn.disabled = true;
        mergeBtn.disabled = true;
        return;
      }

      emptyMergeMsg.style.display = "none";
      mergeClearBtn.disabled = false;
      mergeBtn.disabled = (this.mergeFiles.length < 2);
      mergeItemsContainer.innerHTML = "";

      this.mergeFiles.forEach((item, idx) => {
        const row = document.createElement("div");
        row.className = "pdf-merge-item";
        row.innerHTML = `
          <div class="pdf-merge-item-info">
            <span class="pdf-merge-item-name" title="${escapeHtml(item.name)}">${idx + 1}. ${escapeHtml(item.name)}</span>
            <span class="pdf-merge-item-meta">${item.numPages} pages • ${item.size}</span>
          </div>
          <div class="pdf-merge-item-actions">
            <button class="merge-mini-btn move-up-btn" data-index="${idx}" ${idx === 0 ? 'disabled' : ''} title="Move Earlier">▲</button>
            <button class="merge-mini-btn move-down-btn" data-index="${idx}" ${idx === this.mergeFiles.length - 1 ? 'disabled' : ''} title="Move Later">▼</button>
            <button class="merge-mini-btn remove-btn" data-index="${idx}" style="color: #ff6b6b;" title="Remove">✕</button>
          </div>
        `;

        row.querySelector(".move-up-btn").addEventListener("click", () => {
          if (idx > 0) {
            const temp = this.mergeFiles[idx];
            this.mergeFiles[idx] = this.mergeFiles[idx - 1];
            this.mergeFiles[idx - 1] = temp;
            renderMergeList();
          }
        });

        row.querySelector(".move-down-btn").addEventListener("click", () => {
          if (idx < this.mergeFiles.length - 1) {
            const temp = this.mergeFiles[idx];
            this.mergeFiles[idx] = this.mergeFiles[idx + 1];
            this.mergeFiles[idx + 1] = temp;
            renderMergeList();
          }
        });

        row.querySelector(".remove-btn").addEventListener("click", () => {
          this.mergeFiles.splice(idx, 1);
          renderMergeList();
        });

        mergeItemsContainer.appendChild(row);
      });
    };

    mergeClearBtn.addEventListener("click", () => {
      this.mergeFiles = [];
      renderMergeList();
      appInstance.showToast("Cleared merge queue.", "info");
    });

    // Execute Merge
    mergeBtn.addEventListener("click", async () => {
      if (this.mergeFiles.length < 2) {
        appInstance.showToast("Please add at least 2 PDF files to merge.", "warning");
        return;
      }

      try {
        setProcessing(true, `Merging ${this.mergeFiles.length} PDF files...`);
        this.pdfLib = await loadPdfLib();
        const mergedDoc = await this.pdfLib.PDFDocument.create();

        for (let i = 0; i < this.mergeFiles.length; i++) {
          const item = this.mergeFiles[i];
          updateProgressBar(15 + Math.round((i / this.mergeFiles.length) * 75), `Appending ${item.name} (${i + 1}/${this.mergeFiles.length})...`);
          const sourceDoc = await this.pdfLib.PDFDocument.load(item.buffer.slice(0));
          const pageIndices = Array.from({ length: item.numPages }, (_, k) => k);
          const copiedPages = await mergedDoc.copyPages(sourceDoc, pageIndices);
          copiedPages.forEach(p => mergedDoc.addPage(p));
        }

        updateProgressBar(95, "Compiling merged PDF...");
        const mergedBytes = await mergedDoc.save();
        downloadBlob(new Blob([mergedBytes], { type: "application/pdf" }), "merged_document.pdf");
        appInstance.showToast(`Merged ${this.mergeFiles.length} files successfully!`, "success");
      } catch (err) {
        console.error(err);
        appInstance.showToast(`Merge failed: ${err.message}`, "error");
      } finally {
        setProcessing(false);
      }
    });

    // ==========================================
    // ROTATE & REORGANIZE ENGINE (EXTRA FEATURE)
    // ==========================================
    rotateSelectedCwBtn.addEventListener("click", () => {
      if (this.selectedPages.size === 0) {
        appInstance.showToast("Select at least 1 page to rotate.", "warning");
        return;
      }
      this.selectedPages.forEach(p => {
        this.pageRotations[p] = ((this.pageRotations[p] || 0) + 90) % 360;
      });
      refreshThumbnailsRotation();
      appInstance.showToast(`Rotated ${this.selectedPages.size} pages by 90° CW`, "success");
    });

    rotateSelected180Btn.addEventListener("click", () => {
      if (this.selectedPages.size === 0) {
        appInstance.showToast("Select at least 1 page to rotate.", "warning");
        return;
      }
      this.selectedPages.forEach(p => {
        this.pageRotations[p] = ((this.pageRotations[p] || 0) + 180) % 360;
      });
      refreshThumbnailsRotation();
      appInstance.showToast(`Rotated ${this.selectedPages.size} pages by 180°`, "success");
    });

    rotateAllCwBtn.addEventListener("click", () => {
      this.pageOrder.forEach(p => {
        this.pageRotations[p] = ((this.pageRotations[p] || 0) + 90) % 360;
      });
      refreshThumbnailsRotation();
      appInstance.showToast(`Rotated all pages by 90° CW`, "success");
    });

    const refreshThumbnailsRotation = () => {
      const cards = thumbnailGrid.querySelectorAll(".thumbnail-card");
      cards.forEach(card => {
        const pageNum = parseInt(card.dataset.page, 10);
        const canvas = card.querySelector("canvas");
        if (canvas) {
          canvas.style.transform = `rotate(${this.pageRotations[pageNum] || 0}deg)`;
        }
      });
    };

    deleteSelectedBtn.addEventListener("click", () => {
      if (this.selectedPages.size === 0) {
        appInstance.showToast("Select pages to delete.", "warning");
        return;
      }
      if (this.selectedPages.size >= this.pageOrder.length) {
        appInstance.showToast("Cannot delete all pages in document.", "warning");
        return;
      }
      const count = this.selectedPages.size;
      this.pageOrder = this.pageOrder.filter(p => !this.selectedPages.has(p));
      this.selectedPages.clear();
      updateRangeString();
      previewCountPill.innerText = `${this.pageOrder.length} pages`;
      // Remove deleted cards from DOM
      const cards = thumbnailGrid.querySelectorAll(".thumbnail-card");
      cards.forEach(card => {
        const pNum = parseInt(card.dataset.page, 10);
        if (!this.pageOrder.includes(pNum)) card.remove();
      });
      appInstance.showToast(`Deleted ${count} pages from working set.`, "info");
    });

    saveRotatedBtn.addEventListener("click", async () => {
      if (!this.pdfDoc || this.pageOrder.length === 0) return;
      try {
        setProcessing(true, "Saving updated PDF layout...");
        this.pdfLib = await loadPdfLib();
        const srcDoc = await this.pdfLib.PDFDocument.load(this.pdfDoc.slice(0));
        const newDoc = await this.pdfLib.PDFDocument.create();

        const indices = this.pageOrder.map(p => p - 1);
        const copied = await newDoc.copyPages(srcDoc, indices);
        copied.forEach((page, i) => {
          const pNum = this.pageOrder[i];
          const rot = this.pageRotations[pNum] || 0;
          if (rot !== 0) {
            page.setRotation(this.pdfLib.degrees((page.getRotation().angle + rot) % 360));
          }
          newDoc.addPage(page);
        });

        const bytes = await newDoc.save();
        const baseName = this.fileName.substring(0, this.fileName.lastIndexOf(".")) || "document";
        downloadBlob(new Blob([bytes], { type: "application/pdf" }), `${baseName}_edited.pdf`);
        appInstance.showToast("Saved reorganized & rotated PDF!", "success");
      } catch (err) {
        console.error(err);
        appInstance.showToast(`Failed to save: ${err.message}`, "error");
      } finally {
        setProcessing(false);
      }
    });

    // ==========================================
    // COMPRESS PDF ENGINE
    // ==========================================
    compressBtn.addEventListener("click", async () => {
      if (!this.pdfDoc) {
        appInstance.showToast("Please load a PDF to compress.", "warning");
        return;
      }

      let pdf = null;
      try {
        setProcessing(true, "Initializing PDF compression engine...");
        this.pdfjs = await loadPdfJs();
        this.pdfLib = await loadPdfLib();

        const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) });
        pdf = await loadingTask.promise;

        const newDoc = await this.pdfLib.PDFDocument.create();
        const profile = compressProfileSelect.value;
        let targetDpi = 150;
        let quality = 0.75;

        if (profile === "performance") {
          targetDpi = 100;
          quality = 0.45;
        } else if (profile === "accuracy") {
          targetDpi = 200;
          quality = 0.88;
        }

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        for (let i = 1; i <= pdf.numPages; i++) {
          if (appInstance.activeTool !== "pdf-utilities") break;
          updateProgressBar(10 + Math.round((i / pdf.numPages) * 80), `Compressing page ${i} of ${pdf.numPages}...`);
          const page = await pdf.getPage(i);
          const unscaledViewport = page.getViewport({ scale: 1.0 });
          const scale = targetDpi / 72;
          const viewport = page.getViewport({ scale });

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;

          const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
          const jpegBytes = dataURLtoUint8Array(jpegDataUrl);
          const embeddedImage = await newDoc.embedJpg(jpegBytes);
          const { width, height } = embeddedImage.scale(72 / targetDpi);
          const pdfPage = newDoc.addPage([width, height]);
          pdfPage.drawImage(embeddedImage, { x: 0, y: 0, width, height });
        }

        updateProgressBar(95, "Finalizing compressed file...");
        const pdfBytes = await newDoc.save();
        const baseName = this.fileName.substring(0, this.fileName.lastIndexOf(".")) || "document";
        downloadBlob(new Blob([pdfBytes], { type: "application/pdf" }), `${baseName}_compressed.pdf`);
        appInstance.showToast("PDF compression complete!", "success");
      } catch (err) {
        console.error(err);
        appInstance.showToast(`Compression failed: ${err.message}`, "error");
      } finally {
        if (pdf) await pdf.destroy().catch(() => {});
        setProcessing(false);
      }
    });

    // ==========================================
    // FULL-SCREEN ZOOM / INSPECTOR MODAL
    // ==========================================
    const openZoomModal = async (pageNum) => {
      if (!this.pdfDoc) return;
      currentModalPage = pageNum;
      modalZoomMode = "fit";
      zoomModal.classList.remove("hidden");
      requestAnimationFrame(() => {
        renderModalPage(pageNum);
      });
    };

    const renderModalPage = async (pageNum) => {
      const currentIndex = this.pageOrder.indexOf(pageNum);
      const displayIndex = (currentIndex >= 0 ? currentIndex + 1 : pageNum);
      modalPageIndicator.innerText = `Page ${pageNum} (${displayIndex} of ${this.pageOrder.length})`;

      // Enable/disable navigation buttons
      modalPrevBtn.disabled = (currentIndex <= 0);
      modalNextBtn.disabled = (currentIndex >= this.pageOrder.length - 1 || currentIndex < 0);

      modalCanvasWrapper.innerHTML = `
        <div style="color: var(--text-muted); font-size: 12px; padding: 40px; text-align: center;">
          <span style="display: inline-block; animation: spin 1s linear infinite; margin-right: 8px;">⏳</span>
          Rendering Page ${pageNum}...
        </div>
      `;

      try {
        if (!this.activePdf) {
          const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) });
          this.activePdf = await loadingTask.promise;
        }

        const page = await this.activePdf.getPage(pageNum);
        const rot = (this.pageRotations[pageNum] || 0) % 360;
        const unscaledViewport = page.getViewport({ scale: 1.0, rotation: rot });

        // Calculate available space in modal body with bounding rect fallback
        const bRect = modalBody.getBoundingClientRect();
        const bodyW = (modalBody.clientWidth > 50 ? modalBody.clientWidth : (bRect.width || window.innerWidth * 0.9));
        const bodyH = (modalBody.clientHeight > 50 ? modalBody.clientHeight : (bRect.height || window.innerHeight * 0.8));
        const availW = Math.max(280, bodyW - 48);
        const availH = Math.max(280, bodyH - 48);

        let displayScale = 1.0;
        if (modalZoomMode === "fit") {
          displayScale = Math.min(availW / unscaledViewport.width, availH / unscaledViewport.height);
          modalZoomBadge.innerText = "Fit Page";
        } else if (modalZoomMode === "width") {
          displayScale = availW / unscaledViewport.width;
          modalZoomBadge.innerText = "Fit Width";
        } else {
          displayScale = modalCustomScale;
          modalZoomBadge.innerText = `${Math.round(displayScale * 100)}%`;
        }

        // Render at crisp device resolution for razor-sharp text
        const dpr = Math.max(window.devicePixelRatio || 1, 1.5);
        const renderViewport = page.getViewport({ scale: displayScale * dpr, rotation: rot });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = renderViewport.width;
        canvas.height = renderViewport.height;

        // Display dimensions
        const dispW = Math.round(unscaledViewport.width * displayScale);
        const dispH = Math.round(unscaledViewport.height * displayScale);
        canvas.style.width = `${dispW}px`;
        canvas.style.height = `${dispH}px`;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport: renderViewport }).promise;
        modalCanvasWrapper.innerHTML = "";
        modalCanvasWrapper.appendChild(canvas);

        // Reset scroll position to top
        modalBody.scrollTop = 0;
        modalBody.scrollLeft = 0;
      } catch (err) {
        modalCanvasWrapper.innerHTML = `<span style="color: #ff6b6b; padding: 20px;">Failed to render: ${escapeHtml(err.message)}</span>`;
      }
    };

    // Zoom Button Listeners
    modalFitPageBtn.addEventListener("click", () => {
      modalZoomMode = "fit";
      renderModalPage(currentModalPage);
    });

    modalFitWidthBtn.addEventListener("click", () => {
      modalZoomMode = "width";
      renderModalPage(currentModalPage);
    });

    modalZoomInBtn.addEventListener("click", () => {
      const canvas = modalCanvasWrapper.querySelector("canvas");
      const currentW = canvas ? parseFloat(canvas.style.width) : 600;
      const baseW = 600;
      if (modalZoomMode === "fit" || modalZoomMode === "width") {
        modalCustomScale = Math.min(3.5, (currentW / baseW) * 1.25);
      } else {
        modalCustomScale = Math.min(3.5, modalCustomScale * 1.25);
      }
      modalZoomMode = "custom";
      renderModalPage(currentModalPage);
    });

    modalZoomOutBtn.addEventListener("click", () => {
      const canvas = modalCanvasWrapper.querySelector("canvas");
      const currentW = canvas ? parseFloat(canvas.style.width) : 600;
      const baseW = 600;
      if (modalZoomMode === "fit" || modalZoomMode === "width") {
        modalCustomScale = Math.max(0.25, (currentW / baseW) / 1.25);
      } else {
        modalCustomScale = Math.max(0.25, modalCustomScale / 1.25);
      }
      modalZoomMode = "custom";
      renderModalPage(currentModalPage);
    });

    modalRotateBtn.addEventListener("click", async () => {
      this.pageRotations[currentModalPage] = ((this.pageRotations[currentModalPage] || 0) + 90) % 360;
      appInstance.showToast(`Rotated Page ${currentModalPage} to ${this.pageRotations[currentModalPage]}°`, "info");
      renderModalPage(currentModalPage);

      // Re-render thumbnail in background grid
      const card = thumbnailGrid.querySelector(`.thumbnail-card[data-page="${currentModalPage}"]`);
      if (card && this.activePdf) {
        try {
          const page = await this.activePdf.getPage(currentModalPage);
          const rot = this.pageRotations[currentModalPage];
          const unscaled = page.getViewport({ scale: 1.0, rotation: rot });
          const scale = 140 / Math.max(unscaled.width, unscaled.height);
          const vp = page.getViewport({ scale, rotation: rot });
          const c = card.querySelector("canvas");
          if (c) {
            c.width = vp.width;
            c.height = vp.height;
            const ctx = c.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, c.width, c.height);
            await page.render({ canvasContext: ctx, viewport: vp }).promise;
          }
        } catch (e) {}
      }
    });

    modalPrevBtn.addEventListener("click", () => {
      const idx = this.pageOrder.indexOf(currentModalPage);
      if (idx > 0) {
        currentModalPage = this.pageOrder[idx - 1];
        renderModalPage(currentModalPage);
      }
    });

    modalNextBtn.addEventListener("click", () => {
      const idx = this.pageOrder.indexOf(currentModalPage);
      if (idx >= 0 && idx < this.pageOrder.length - 1) {
        currentModalPage = this.pageOrder[idx + 1];
        renderModalPage(currentModalPage);
      }
    });

    modalCloseBtn.addEventListener("click", () => zoomModal.classList.add("hidden"));
    zoomModal.addEventListener("click", (e) => {
      if (e.target === zoomModal) zoomModal.classList.add("hidden");
    });

    document.addEventListener("keydown", (e) => {
      if (!zoomModal.classList.contains("hidden")) {
        if (e.key === "Escape") {
          zoomModal.classList.add("hidden");
        } else if (e.key === "ArrowLeft") {
          modalPrevBtn.click();
        } else if (e.key === "ArrowRight") {
          modalNextBtn.click();
        } else if (e.key === "+" || e.key === "=") {
          modalZoomInBtn.click();
        } else if (e.key === "-" || e.key === "_") {
          modalZoomOutBtn.click();
        } else if (e.key === "0") {
          modalFitPageBtn.click();
        }
      }
    });

    window.addEventListener("resize", () => {
      if (!zoomModal.classList.contains("hidden") && (modalZoomMode === "fit" || modalZoomMode === "width")) {
        renderModalPage(currentModalPage);
      }
    });

    modalSavePngBtn.addEventListener("click", () => exportSinglePage(currentModalPage, "png"));
    modalSaveJpgBtn.addEventListener("click", () => exportSinglePage(currentModalPage, "jpg"));
    modalSavePdfBtn.addEventListener("click", () => exportSinglePage(currentModalPage, "pdf"));

    // Interactive Sample Document Generator
    container.querySelector("#pdf-guide-load-sample")?.addEventListener("click", async () => {
      let pdf = null;
      try {
        previewStatus.innerText = "Initializing engines...";
        this.pdfjs = await loadPdfJs();
        this.pdfLib = await loadPdfLib();

        previewStatus.innerText = "Generating 5-page sample document...";
        const newDoc = await this.pdfLib.PDFDocument.create();
        const font = await newDoc.embedFont(this.pdfLib.StandardFonts.HelveticaBold);
        const subFont = await newDoc.embedFont(this.pdfLib.StandardFonts.Helvetica);

        const pageTitles = [
          "1. Executive Summary & Overview",
          "2. Financial Performance & Metrics",
          "3. Product Architecture & Specifications",
          "4. Market Expansion Analysis",
          "5. Appendix & Legal Declarations"
        ];

        for (let p = 0; p < 5; p++) {
          const samplePage = newDoc.addPage([595, 842]); // Standard A4 points
          samplePage.drawText("OMNITOOL HUB • SAMPLE REPORT", {
            x: 50,
            y: 800,
            size: 10,
            font: subFont,
            color: this.pdfLib.rgb(0.2, 0.6, 0.8)
          });
          samplePage.drawText(pageTitles[p], {
            x: 50,
            y: 750,
            size: 20,
            font: font,
            color: this.pdfLib.rgb(0.1, 0.1, 0.2)
          });
          samplePage.drawText(`This is a high-resolution interactive sample document rendered to demonstrate:\n- Visual Split and Extraction into PNG, JPG, WebP, Text, and PDF\n- Rotation and deletion of specific pages\n- Client-side DPI compression\n\nPage Number: ${p + 1} of 5\nDocument ID: OMNI-${Date.now().toString(36).toUpperCase()}`, {
            x: 50,
            y: 700,
            size: 13,
            font: subFont,
            lineHeight: 20,
            color: this.pdfLib.rgb(0.3, 0.3, 0.3)
          });
        }

        const pdfBytes = await newDoc.save();
        this.pdfDoc = pdfBytes.buffer;
        this.totalPages = 5;
        this.pageOrder = [1, 2, 3, 4, 5];
        this.pageRotations = {};
        this.pageOrder.forEach(p => this.pageRotations[p] = 0);
        this.fileName = "sample_5page_report.pdf";

        infoFileName.innerText = "sample_5page_report.pdf";
        infoFileName.title = "sample_5page_report.pdf";
        infoPageCount.innerText = "5 Page(s)";
        infoFileSize.innerText = `${(pdfBytes.byteLength / 1024).toFixed(1)} KB`;
        infoCard.classList.remove("hidden");
        previewCountPill.style.display = "inline-block";
        previewCountPill.innerText = "5 pages";

        clearBtn.disabled = false;
        splitRangeInput.disabled = false;
        allBtn.disabled = false;
        oddBtn.disabled = false;
        evenBtn.disabled = false;
        noneBtn.disabled = false;
        exportFormatSelect.disabled = false;
        splitBtn.disabled = false;

        rotateSelectedCwBtn.disabled = false;
        rotateSelected180Btn.disabled = false;
        rotateAllCwBtn.disabled = false;
        deleteSelectedBtn.disabled = false;
        saveRotatedBtn.disabled = false;

        compressProfileSelect.disabled = false;
        compressBtn.disabled = false;

        this.selectedPages = new Set([1, 2, 3, 4, 5]);
        updateRangeString();
        updateFormatUI();

        previewStatus.innerText = "Rendering thumbnails...";
        if (this.activePdf) {
          await this.activePdf.destroy().catch(() => {});
          this.activePdf = null;
        }
        const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) });
        pdf = await loadingTask.promise;
        this.activePdf = pdf;
        await renderThumbnails(pdf);

        appInstance.showToast("Generated 5-page sample! Ready to test Split, Convert & Merge.", "success");
      } catch (err) {
        if (pdf) {
          await pdf.destroy().catch(() => {});
          this.activePdf = null;
        }
        console.error(err);
        appInstance.showToast("Failed to generate sample: " + err.message, "error");
      }
    });

    if (appInstance.activeSubtab) {
      const targetTabBtn = container.querySelector(`.util-tab[data-tab="${appInstance.activeSubtab}"]`);
      if (targetTabBtn) {
        targetTabBtn.click();
      }
      appInstance.activeSubtab = null;
    }
  },

  destroy() {
    if (this.activePdf) {
      this.activePdf.destroy().catch(() => {});
      this.activePdf = null;
    }
  }
};
