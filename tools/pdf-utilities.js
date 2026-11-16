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
  setTimeout(() => URL.revokeObjectURL(link.href), 60000); // Keep alive for 60s so browser never aborts
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
  mergeFiles: [], // Array of { id, name, size, buffer, numPages, isEncrypted, coverDataUrl }
  mergePages: [], // Array of { id, fileId, fileName, fileIndex, pageNum, rotation, isExcluded, color }
  mergeViewMode: "doc", // "doc" (document cards) or "pages" (individual page cards)

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
              <!-- Banner if primary doc is loaded -->
              <div id="pdf-merge-loaded-doc-banner" style="display: none; padding: 10px 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 8px; margin-bottom: 12px; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 8px; overflow: hidden; max-width: 65%;">
                  <span style="font-size: 14px;">📄</span>
                  <div style="overflow: hidden;">
                    <div style="font-size: 11px; font-weight: 600; color: var(--text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" id="merge-loaded-doc-name">document.pdf</div>
                    <div style="font-size: 10px; color: var(--text-muted);" id="merge-loaded-doc-pages">0 pages</div>
                  </div>
                </div>
                <button class="tool-btn secondary" id="merge-add-loaded-doc-btn" style="font-size: 10px; padding: 4px 8px; color: var(--accent-cyan); border-color: rgba(0,242,254,0.3); font-weight: 600;">
                  + Add to Merge Queue
                </button>
              </div>

              <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; padding: 8px 10px;">
                💡 <strong>Arrange Files &amp; Pages</strong>: Drag &amp; drop to arrange documents, or switch to <strong>Page-by-Page Order</strong> in the right panel to rearrange, rotate, or exclude individual sheets before merging!
              </div>

              <!-- Merge File Adder Dropzone -->
              <div class="pdf-merge-dropzone" id="pdf-merge-dropzone">
                <svg viewBox="0 0 24 24" style="width: 28px; height: 28px; stroke: var(--accent-cyan); fill: none; stroke-width: 2; margin-bottom: 6px;">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span style="font-size: 13px; font-weight: 600;">Add PDFs to Merge Queue</span>
                <span style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">Click or drag &amp; drop multiple PDFs here</span>
                <span style="font-size: 10px; color: var(--accent-cyan); margin-top: 3px;">Supports standard, encrypted, scanned &amp; certificate PDFs</span>
                <input type="file" id="pdf-merge-file-input" multiple accept=".pdf" style="display: none;">
              </div>

              <!-- Adding Files Loading Indicator -->
              <div id="pdf-merge-loading-indicator" style="display: none; padding: 10px 12px; background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 8px; margin-bottom: 12px; align-items: center; gap: 8px;">
                <span class="mini-spinner"></span>
                <span id="pdf-merge-loading-text" style="font-size: 11px; color: var(--accent-cyan); font-weight: 500;">Reading and parsing documents...</span>
              </div>

              <!-- Merge Queue Toolbar / Stats -->
              <div id="pdf-merge-header-bar" style="display: none; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span id="pdf-merge-stats" style="font-size: 11px; color: var(--accent-cyan); font-weight: 600;">0 Files • 0 Pages</span>
                <div style="display: flex; gap: 6px;">
                  <button class="tool-btn secondary" id="pdf-merge-sort-az" style="font-size: 10px; padding: 2px 7px;" title="Sort files alphabetically A-Z">🔤 A-Z</button>
                  <button class="tool-btn secondary" id="pdf-merge-reverse" style="font-size: 10px; padding: 2px 7px;" title="Invert current file order">⇄ Invert</button>
                </div>
              </div>

              <!-- Merge File List -->
              <div class="pdf-merge-list-container" id="pdf-merge-list-container">
                <div class="empty-merge-msg" id="empty-merge-msg" style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 12px;">
                  No documents in queue yet. Add 2 or more PDFs to combine them.
                </div>
                <div class="pdf-merge-items" id="pdf-merge-items"></div>
              </div>

              <!-- Dedicated In-View Live Merge Progress Box (Shows exact count and percentage!) -->
              <div id="pdf-merge-progress-box" style="display: none; margin-top: 14px; padding: 12px 14px; background: rgba(0, 242, 254, 0.06); border: 1px solid rgba(0, 242, 254, 0.3); border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="mini-spinner"></span>
                    <span id="pdf-merge-live-title" style="font-size: 12px; font-weight: 600; color: var(--accent-cyan);">Merging PDFs...</span>
                  </div>
                  <span id="pdf-merge-live-percent" style="font-size: 13px; font-weight: 700; font-family: monospace; color: var(--accent-cyan);">0%</span>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;" id="pdf-merge-live-subtext">Preparing pages...</div>
                <div class="pdf-progress-track" style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                  <div id="pdf-merge-live-bar" style="height: 100%; width: 0%; background: linear-gradient(90deg, #00f2fe, #4facfe, #a855f7); border-radius: 3px; transition: width 0.15s ease;"></div>
                </div>
              </div>

              <!-- Merge Success & Direct Re-Download Card -->
              <div id="pdf-merge-success-card" style="display: none; margin-top: 14px; padding: 12px 14px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 6px; color: #10b981; font-weight: 600; font-size: 13px; margin-bottom: 4px;">
                  <span>✓</span> <span id="pdf-merge-success-title">Merged Successfully!</span>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 10px;">Download started automatically. If your browser blocked it, click below:</div>
                <button class="tool-btn primary" id="pdf-merge-download-again-btn" style="width: 100%; justify-content: center; background: linear-gradient(135deg, #10b981, #059669); border: none; font-size: 12px;">
                  ⬇️ Download Merged PDF (<span id="pdf-merge-success-size">-</span>)
                </button>
              </div>

              <!-- Merge Actions -->
              <div style="margin-top: 14px; display: flex; gap: 8px;">
                <button class="tool-btn secondary" id="pdf-merge-clear-all" style="flex: 1; font-size: 11px;" disabled>Clear Queue</button>
                <button class="tool-btn primary" id="pdf-merge-btn" style="flex: 2; font-size: 12px;" disabled>
                  <span id="pdf-merge-btn-content">Merge &amp; Download PDF</span>
                </button>
              </div>

              <!-- Post-Merge Action Card: Open in Page Organizer -->
              <div id="pdf-merge-post-action" style="display: none; margin-top: 12px; padding: 10px 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 8px; text-align: center;">
                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px; line-height: 1.4;">
                  ✨ <strong>Merged Successfully!</strong> Want to arrange, rotate, or delete individual pages in the compiled PDF?
                </div>
                <button class="tool-btn secondary" id="pdf-merge-open-organizer-btn" style="width: 100%; font-size: 12px; color: var(--accent-cyan); border-color: rgba(0,242,254,0.4); justify-content: center; font-weight: 600;">
                  📑 Open in Page Organizer &amp; Rotate
                </button>
              </div>
            </div>

            <!-- TAB 3: ROTATE & REORGANIZE (EXTRA FEATURE) -->
            <div class="util-tab-content hidden" id="tab-rotate-content">
              <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; padding: 8px 10px;">
                💡 <strong>Arrange &amp; Organize</strong>: Drag &amp; drop page cards on the right or use <strong>◀</strong> / <strong>▶</strong> buttons to reorder pages. Rotate or delete unwanted sheets, then save below.
              </div>

              <!-- Page Sequence & Order Controls -->
              <div style="margin-bottom: 12px;">
                <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                  <button class="tool-btn secondary" id="pdf-reverse-order-btn" style="flex: 1; font-size: 11px;" disabled title="Reverse current page sequence">
                    ⇄ Reverse Order
                  </button>
                  <button class="tool-btn secondary" id="pdf-reset-order-btn" style="flex: 1; font-size: 11px;" disabled title="Reset to original sequential page order">
                    ↺ Reset Order
                  </button>
                </div>
                <div id="pdf-order-status-box" style="font-size: 11px; padding: 6px 10px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted); font-size: 11px;">Page Sequence: <strong id="pdf-current-order-badge" style="color: var(--accent-cyan); font-family: monospace;">-</strong></span>
                  <span id="pdf-order-dirty-tag" style="display: none; font-size: 10px; background: rgba(0,242,254,0.15); color: var(--accent-cyan); padding: 1px 6px; border-radius: 10px; font-weight: 600;">Custom Order</span>
                </div>
              </div>

              <!-- Orientation & Deletion Controls -->
              <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
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
          <div class="panel-header" style="flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 id="pdf-preview-title">Visual Page Inspector</h3>
              <span class="preview-count-pill" id="preview-count-pill" style="display: none;">0 pages</span>
            </div>
            <span class="preview-status" id="preview-status" style="font-size: 12px; color: var(--text-muted);">No document loaded.</span>
          </div>

          <!-- Merge Mode Switcher Bar (Visible when on Merge Tab) -->
          <div id="pdf-merge-view-mode-bar" style="display: none; padding: 8px 10px; background: rgba(0, 0, 0, 0.35); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px; margin-bottom: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <div style="display: flex; gap: 6px; align-items: center;">
              <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">Arrange By:</span>
              <div class="modal-btn-group">
                <button class="modal-icon-btn active-mode" id="btn-merge-mode-doc" style="font-size: 11px; padding: 4px 10px;" title="Arrange entire document order">
                  📑 Document Order (<span id="mode-doc-count">0</span>)
                </button>
                <button class="modal-icon-btn" id="btn-merge-mode-pages" style="font-size: 11px; padding: 4px 10px;" title="Arrange individual pages from all added PDFs">
                  📄 Page-by-Page Order (<span id="mode-page-count">0</span>)
                </button>
              </div>
            </div>

            <!-- Page-by-Page Quick Tools -->
            <div id="pdf-merge-page-tools" style="display: none; gap: 6px; align-items: center; flex-wrap: wrap;">
              <button class="tool-btn secondary" id="merge-page-rotate-all" style="font-size: 10px; padding: 3px 8px;" title="Rotate all active pages 90° CW">🔄 Rotate All</button>
              <button class="tool-btn secondary" id="merge-page-invert" style="font-size: 10px; padding: 3px 8px;" title="Invert current page sequence">⇄ Invert</button>
              <button class="tool-btn secondary" id="merge-page-reset" style="font-size: 10px; padding: 3px 8px;" title="Reset pages to original document order">↺ Reset</button>
              <button class="tool-btn secondary" id="merge-page-restore-all" style="display: none; font-size: 10px; padding: 3px 8px; color: #10b981; border-color: rgba(16,185,129,0.3);" title="Restore excluded pages">
                ➕ Restore Excluded (<span id="excluded-count-badge">0</span>)
              </button>
            </div>
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
              <div class="tool-guide-step-text"><strong>Arrange, Rotate &amp; Delete</strong>: Drag and drop page cards or use ◀ / ▶ buttons to reorder pages. Rotate orientations or delete sheets as needed.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Inspect &amp; Export</strong>: Save your newly arranged PDF, or extract selected page ranges to PDF, ZIP, PNG, JPG, or WebP.</div>
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

              <!-- Fullscreen Expand Button -->
              <button class="modal-icon-btn" id="pdf-modal-fullscreen" style="background: rgba(0, 242, 254, 0.1); border: 1px solid rgba(0, 242, 254, 0.3); border-radius: 6px; padding: 5px 10px; font-size: 11.5px; color: var(--accent-cyan); display: inline-flex; align-items: center; gap: 5px;" title="Toggle Fullscreen (F)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
                <span id="pdf-modal-fs-label">Fullscreen</span>
              </button>

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
          min-height: 420px;
        }
        .tool-panel.preview-fullscreen .pdf-viewer-scroll-container {
          max-height: none !important;
          height: calc(100vh - 120px) !important;
          min-height: calc(100vh - 120px) !important;
          flex: 1 1 auto !important;
        }
        .pdf-thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(135px, 1fr));
          gap: 14px;
          justify-content: center;
        }
        .tool-panel.preview-fullscreen .pdf-thumbnail-grid {
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)) !important;
          gap: 20px !important;
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
          gap: 6px;
        }
        .card-reorder-nav {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          padding: 1px 3px;
        }
        .thumb-reorder-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 10px;
          padding: 2px 4px;
          border-radius: 3px;
          cursor: pointer;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }
        .thumb-reorder-btn:hover:not(:disabled) {
          color: var(--accent-cyan);
          background: rgba(0, 242, 254, 0.15);
        }
        .thumb-reorder-btn:disabled {
          opacity: 0.25;
          cursor: not-allowed;
        }
        .thumb-page-badge {
          font-size: 10px;
          color: var(--text-main);
          padding: 0 3px;
          white-space: nowrap;
          user-select: none;
          font-family: var(--font-mono, monospace);
        }
        .thumb-page-badge .pos-num {
          color: var(--accent-cyan);
          font-weight: 700;
        }
        .thumbnail-card[draggable="true"] {
          cursor: grab;
        }
        .thumbnail-card[draggable="true"]:active {
          cursor: grabbing;
        }
        .thumbnail-card.is-dragging {
          opacity: 0.45;
          transform: scale(0.96);
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 16px rgba(0, 242, 254, 0.4);
        }
        .thumbnail-card.drag-target-left {
          border-left: 3px solid var(--accent-cyan) !important;
          box-shadow: -4px 0 12px rgba(0, 242, 254, 0.4);
        }
        .thumbnail-card.drag-target-right {
          border-right: 3px solid var(--accent-cyan) !important;
          box-shadow: 4px 0 12px rgba(0, 242, 254, 0.4);
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
          transition: background 0.15s ease, border-color 0.15s ease;
          user-select: none;
        }
        .pdf-merge-item[draggable="true"] {
          cursor: grab;
        }
        .pdf-merge-item[draggable="true"]:active {
          cursor: grabbing;
        }
        .pdf-merge-item:hover {
          background: rgba(255, 255, 255, 0.02);
        }
        .pdf-merge-item.is-dragging {
          opacity: 0.35;
          background: rgba(0, 242, 254, 0.08);
          border-color: var(--accent-cyan) !important;
        }
        .pdf-merge-item.drag-target-top {
          border-top: 2px solid var(--accent-cyan) !important;
        }
        .pdf-merge-item.drag-target-bottom {
          border-bottom: 2px solid var(--accent-cyan) !important;
        }
        .merge-drag-handle {
          color: var(--text-muted);
          font-size: 13px;
          margin-right: 8px;
          cursor: grab;
          opacity: 0.5;
          transition: opacity 0.15s ease, color 0.15s ease;
        }
        .pdf-merge-item:hover .merge-drag-handle {
          opacity: 1;
          color: var(--accent-cyan);
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

        /* Merge Visual Arranger Cards */
        .merge-preview-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
          cursor: grab;
          transition: all 0.2s ease;
          user-select: none;
        }
        .merge-preview-card:hover {
          border-color: rgba(0, 242, 254, 0.5);
          background: rgba(0, 242, 254, 0.04);
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
        }
        .merge-preview-card[draggable="true"]:active {
          cursor: grabbing;
        }
        .merge-preview-card.is-dragging {
          opacity: 0.35;
          transform: scale(0.96);
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 16px rgba(0, 242, 254, 0.4);
        }
        .merge-doc-order-tag {
          align-self: flex-start;
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 242, 254, 0.3);
          padding: 2px 7px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 700;
          font-family: var(--font-mono, monospace);
        }
        .merge-cover-wrapper {
          width: 100%;
          aspect-ratio: 0.707;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 6px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          position: relative;
        }
        .merge-cover-wrapper img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.2s ease;
        }
        .merge-cover-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 10px;
        }
        .mini-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 242, 254, 0.2);
          border-top-color: var(--accent-cyan);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        .merge-card-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
          width: 100%;
          padding: 2px 0;
        }
        .merge-card-filename {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .merge-card-pages {
          font-size: 10px;
          color: var(--text-muted);
        }

        .active-mode {
          background: rgba(0, 242, 254, 0.18) !important;
          color: var(--accent-cyan) !important;
          font-weight: 600 !important;
        }
        .merge-page-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          position: relative;
          cursor: grab;
          transition: all 0.2s ease;
          user-select: none;
        }
        .merge-page-card:hover {
          border-color: rgba(0, 242, 254, 0.45);
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
        }
        .merge-page-card.is-dragging {
          opacity: 0.35;
          transform: scale(0.96);
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 16px rgba(0, 242, 254, 0.4);
        }
        .merge-page-card.is-excluded {
          opacity: 0.35;
          filter: grayscale(85%);
          border-style: dashed !important;
        }
        .merge-page-card.is-active-merging {
          border-color: var(--accent-cyan) !important;
          box-shadow: 0 0 18px rgba(0, 242, 254, 0.6) !important;
          animation: pulseMerge 0.9s ease-in-out infinite alternate;
        }
        @keyframes pulseMerge {
          from { transform: scale(1); box-shadow: 0 0 8px rgba(0, 242, 254, 0.4); }
          to { transform: scale(1.03); box-shadow: 0 0 22px rgba(0, 242, 254, 0.9); }
        }
        .merge-page-doc-tag {
          font-size: 9.5px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
          display: block;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
          font-family: var(--font-mono, monospace);
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
          z-index: 1000005 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          transition: padding 0.2s ease;
        }
        .pdf-modal-overlay.is-fullscreen {
          padding: 0 !important;
          background: #060913 !important;
        }
        .pdf-modal-container {
          background: #0b1120;
          border: 1px solid rgba(0, 242, 254, 0.25);
          border-radius: 14px;
          width: 96vw;
          max-width: 1440px;
          height: 94vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 242, 254, 0.1);
          overflow: hidden;
          transition: all 0.2s ease;
        }
        .pdf-modal-container.is-fullscreen {
          width: 100vw !important;
          max-width: 100vw !important;
          height: 100vh !important;
          max-height: 100vh !important;
          border-radius: 0 !important;
          border: none !important;
          box-shadow: none !important;
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
    this.mergePages = [];
    this.mergeViewMode = "doc";

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
    const mergeLoadedDocBanner = container.querySelector("#pdf-merge-loaded-doc-banner");
    const mergeLoadedDocName = container.querySelector("#merge-loaded-doc-name");
    const mergeLoadedDocPages = container.querySelector("#merge-loaded-doc-pages");
    const mergeAddLoadedDocBtn = container.querySelector("#merge-add-loaded-doc-btn");

    const mergeDropzone = container.querySelector("#pdf-merge-dropzone");
    const mergeFileInput = container.querySelector("#pdf-merge-file-input");
    const mergeLoadingIndicator = container.querySelector("#pdf-merge-loading-indicator");
    const mergeLoadingText = container.querySelector("#pdf-merge-loading-text");
    const mergeItemsContainer = container.querySelector("#pdf-merge-items");
    const emptyMergeMsg = container.querySelector("#empty-merge-msg");
    const mergeClearBtn = container.querySelector("#pdf-merge-clear-all");
    const mergeBtn = container.querySelector("#pdf-merge-btn");
    const pdfMergeBtnContent = container.querySelector("#pdf-merge-btn-content");
    const mergeHeaderBar = container.querySelector("#pdf-merge-header-bar");
    const mergeStats = container.querySelector("#pdf-merge-stats");
    const mergeSortAzBtn = container.querySelector("#pdf-merge-sort-az");
    const mergeReverseBtn = container.querySelector("#pdf-merge-reverse");
    const mergePostAction = container.querySelector("#pdf-merge-post-action");
    const mergeOpenOrganizerBtn = container.querySelector("#pdf-merge-open-organizer-btn");

    // Merge dedicated progress box & success card
    const pdfMergeProgressBox = container.querySelector("#pdf-merge-progress-box");
    const pdfMergeLiveTitle = container.querySelector("#pdf-merge-live-title");
    const pdfMergeLivePercent = container.querySelector("#pdf-merge-live-percent");
    const pdfMergeLiveSubtext = container.querySelector("#pdf-merge-live-subtext");
    const pdfMergeLiveBar = container.querySelector("#pdf-merge-live-bar");
    const pdfMergeSuccessCard = container.querySelector("#pdf-merge-success-card");
    const pdfMergeSuccessTitle = container.querySelector("#pdf-merge-success-title");
    const pdfMergeSuccessSize = container.querySelector("#pdf-merge-success-size");
    const pdfMergeDownloadAgainBtn = container.querySelector("#pdf-merge-download-again-btn");

    // Merge view mode & page-by-page tools (in right panel)
    const mergeViewModeBar = container.querySelector("#pdf-merge-view-mode-bar");
    const btnModeDoc = container.querySelector("#btn-merge-mode-doc");
    const btnModePages = container.querySelector("#btn-merge-mode-pages");
    const modeDocCount = container.querySelector("#mode-doc-count");
    const modePageCount = container.querySelector("#mode-page-count");
    const pdfMergePageTools = container.querySelector("#pdf-merge-page-tools");
    const mergePageRotateAll = container.querySelector("#merge-page-rotate-all");
    const mergePageInvert = container.querySelector("#merge-page-invert");
    const mergePageReset = container.querySelector("#merge-page-reset");
    const mergePageRestoreAll = container.querySelector("#merge-page-restore-all");
    const excludedCountBadge = container.querySelector("#excluded-count-badge");

    // Rotate & Arrange elements
    const reverseOrderBtn = container.querySelector("#pdf-reverse-order-btn");
    const resetOrderBtn = container.querySelector("#pdf-reset-order-btn");
    const currentOrderBadge = container.querySelector("#pdf-current-order-badge");
    const orderDirtyTag = container.querySelector("#pdf-order-dirty-tag");
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
    const previewTitle = container.querySelector("#pdf-preview-title");
    const modalTitle = container.querySelector("#pdf-modal-title");
    this.currentTab = "split";

    let renderMergePreviewGrid = () => {};
    let restoreSingleDocPreview = () => {};

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
    const modalContainer = zoomModal.querySelector(".pdf-modal-container");
    const modalFsBtn = container.querySelector("#pdf-modal-fullscreen");
    const modalFsLabel = container.querySelector("#pdf-modal-fs-label");
    let currentModalPage = 1;
    let modalZoomMode = "fit"; // 'fit', 'width', or 'custom'
    let modalCustomScale = 1.0;
    let modalCurrentScale = 1.0;

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
        const hasDoc = Boolean(this.pdfDoc);
        splitBtn.disabled = !hasDoc;
        compressBtn.disabled = !hasDoc;
        clearBtn.disabled = !hasDoc;
        saveRotatedBtn.disabled = !hasDoc;
        const activeMergePages = this.mergePages.filter(p => !p.isExcluded).length;
        mergeBtn.disabled = (this.mergeFiles.length < 2 && activeMergePages < 2) || activeMergePages === 0;
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

    // Tab Switching with History and Router Sync
    const switchTab = (tabId, updateRoute = true) => {
      this.currentTab = tabId;
      tabs.forEach(t => t.classList.remove("active"));
      tabContents.forEach(c => c.classList.add("hidden"));
      const targetTab = container.querySelector(`.util-tab[data-tab="${tabId}"]`);
      if (targetTab) targetTab.classList.add("active");
      const targetContent = container.querySelector(`#tab-${tabId}-content`);
      if (targetContent) targetContent.classList.remove("hidden");
      if (updateRoute && appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("pdf-utilities", tabId, { pushHistory: true });
      }

      if (tabId === "merge") {
        dropzone.style.display = "none";
        infoCard.style.display = "none";
        if (mergeViewModeBar) mergeViewModeBar.style.display = (this.mergeFiles.length > 0 ? "flex" : "none");
        const alreadyInQueue = this.pdfDoc && this.mergeFiles.some(f => f.name === this.fileName && f.buffer.byteLength === this.pdfDoc.byteLength);
        if (this.pdfDoc && mergeLoadedDocBanner && !alreadyInQueue) {
          mergeLoadedDocBanner.style.display = "flex";
          if (mergeLoadedDocName) mergeLoadedDocName.innerText = this.fileName;
          if (mergeLoadedDocPages) mergeLoadedDocPages.innerText = `${this.totalPages} pages`;
        } else if (mergeLoadedDocBanner) {
          mergeLoadedDocBanner.style.display = "none";
        }
        renderMergePreviewGrid(true);
      } else {
        dropzone.style.display = "flex";
        if (this.pdfDoc) infoCard.style.display = "block";
        if (mergeViewModeBar) mergeViewModeBar.style.display = "none";
        restoreSingleDocPreview();
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab, true));
    });

    if (appInstance && typeof appInstance.registerTabSwitcher === "function") {
      appInstance.registerTabSwitcher("pdf-utilities", (tabId) => switchTab(tabId, false));
    }

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
        if (this.currentTab === "merge" || e.dataTransfer.files.length > 1) {
          switchTab("merge", true);
          handleMergeFiles(Array.from(e.dataTransfer.files));
        } else {
          handleFileSelection(e.dataTransfer.files[0]);
        }
      }
    });

    fileInput.addEventListener("change", () => {
      if (fileInput.files.length > 0) {
        if (this.currentTab === "merge" || fileInput.files.length > 1) {
          switchTab("merge", true);
          handleMergeFiles(Array.from(fileInput.files));
        } else {
          handleFileSelection(fileInput.files[0]);
        }
      }
    });

    // Also support dropping files anywhere into the viewer container when on Merge tab
    const viewerScroll = container.querySelector("#pdf-viewer-scroll-container");
    if (viewerScroll) {
      viewerScroll.addEventListener("dragover", (e) => {
        if (this.currentTab === "merge" && e.dataTransfer && e.dataTransfer.types && Array.from(e.dataTransfer.types).includes("Files")) {
          e.preventDefault();
          viewerScroll.style.outline = "2px dashed var(--accent-cyan)";
        }
      });
      viewerScroll.addEventListener("dragleave", () => {
        viewerScroll.style.outline = "";
      });
      viewerScroll.addEventListener("drop", (e) => {
        if (this.currentTab === "merge") {
          viewerScroll.style.outline = "";
          if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            e.preventDefault();
            handleMergeFiles(Array.from(e.dataTransfer.files));
          }
        }
      });
    }

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
      if (mergeLoadedDocBanner) mergeLoadedDocBanner.style.display = "none";
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
      reverseOrderBtn.disabled = true;
      resetOrderBtn.disabled = true;
      updateOrderStatusUI();

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
        reverseOrderBtn.disabled = (this.pageOrder.length < 2);
        resetOrderBtn.disabled = (this.pageOrder.length < 2);
        updateOrderStatusUI();

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

    // Reorder & Page Arrangement Engine
    let draggedIndex = null;

    const updateCardsIndexLabels = () => {
      const cards = thumbnailGrid.querySelectorAll(".thumbnail-card");
      cards.forEach((card, idx) => {
        card.dataset.index = idx;
        const posNum = card.querySelector(".pos-num");
        if (posNum) posNum.innerText = idx + 1;
        const prevBtn = card.querySelector(".move-prev-btn");
        if (prevBtn) prevBtn.disabled = (idx === 0);
        const nextBtn = card.querySelector(".move-next-btn");
        if (nextBtn) nextBtn.disabled = (idx === cards.length - 1);
      });
    };

    const updateOrderStatusUI = () => {
      if (!currentOrderBadge) return;
      if (this.pageOrder.length === 0) {
        currentOrderBadge.innerText = "-";
        if (orderDirtyTag) orderDirtyTag.style.display = "none";
        return;
      }
      const isSequential = this.pageOrder.every((p, idx) => p === idx + 1);
      if (isSequential) {
        currentOrderBadge.innerText = `1 to ${this.pageOrder.length} (Sequential)`;
        if (orderDirtyTag) orderDirtyTag.style.display = "none";
      } else {
        const displayOrder = this.pageOrder.length <= 8 
          ? this.pageOrder.join(", ") 
          : `${this.pageOrder.slice(0, 4).join(", ")} ... ${this.pageOrder.slice(-3).join(", ")}`;
        currentOrderBadge.innerText = displayOrder;
        if (orderDirtyTag) orderDirtyTag.style.display = "inline-block";
      }
    };

    const reorderPages = (fromIdx, toIdx) => {
      if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= this.pageOrder.length || toIdx >= this.pageOrder.length) return;
      const [moved] = this.pageOrder.splice(fromIdx, 1);
      this.pageOrder.splice(toIdx, 0, moved);

      // Re-order DOM elements in thumbnailGrid to mirror this.pageOrder without re-rendering canvases
      const cardsMap = new Map();
      thumbnailGrid.querySelectorAll(".thumbnail-card").forEach(card => {
        cardsMap.set(parseInt(card.dataset.page, 10), card);
      });
      this.pageOrder.forEach(pNum => {
        const card = cardsMap.get(pNum);
        if (card) thumbnailGrid.appendChild(card);
      });

      updateCardsIndexLabels();
      updateOrderStatusUI();
    };

    // Render Page Thumbnails in Right Grid
    const renderThumbnails = async (pdf) => {
      if (this.currentTab === "merge") return;
      thumbnailGrid.innerHTML = "";

      for (let idx = 0; idx < this.pageOrder.length; idx++) {
        if (!this.pdfDoc || appInstance.activeTool !== "pdf-utilities" || this.currentTab === "merge") break;
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
        card.dataset.index = idx;
        card.draggable = true;

        card.innerHTML = `
          <div class="thumbnail-card-actions">
            <button class="thumb-action-btn zoom-btn" title="Inspect Page Full-Screen" data-page="${pageNum}">🔍</button>
            <button class="thumb-action-btn rotate-btn" title="Rotate 90° CW" data-page="${pageNum}">🔄</button>
            <button class="thumb-action-btn quick-export-btn" title="Quick Save this Page" data-page="${pageNum}">💾</button>
          </div>
          <div class="thumbnail-canvas-wrapper"></div>
          <div class="thumbnail-card-footer">
            <div class="card-reorder-nav">
              <button class="thumb-reorder-btn move-prev-btn" title="Move page earlier (Left)" ${idx === 0 ? 'disabled' : ''}>◀</button>
              <span class="thumb-page-badge" title="Position ${idx + 1} (Source Page #${pageNum})">Pg <strong class="pos-num">${idx + 1}</strong></span>
              <button class="thumb-reorder-btn move-next-btn" title="Move page later (Right)" ${idx === this.pageOrder.length - 1 ? 'disabled' : ''}>▶</button>
            </div>
            <input type="checkbox" class="thumbnail-checkbox" data-page="${pageNum}" ${this.selectedPages.has(pageNum) ? 'checked' : ''} title="Select page">
          </div>
        `;

        card.querySelector(".thumbnail-canvas-wrapper").appendChild(canvas);
        thumbnailGrid.appendChild(card);

        // Click on thumbnail card selects/deselects
        const checkbox = card.querySelector(".thumbnail-checkbox");
        card.addEventListener("click", (e) => {
          if (e.target.closest(".thumb-action-btn") || e.target.closest(".thumb-reorder-btn")) return;
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

        // Reorder buttons (Move Left / Move Right)
        const prevBtn = card.querySelector(".move-prev-btn");
        const nextBtn = card.querySelector(".move-next-btn");

        prevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const currentIdx = parseInt(card.dataset.index, 10);
          if (currentIdx > 0) {
            reorderPages(currentIdx, currentIdx - 1);
            appInstance.showToast(`Moved Page to position ${currentIdx}`, "info");
          }
        });

        nextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const currentIdx = parseInt(card.dataset.index, 10);
          if (currentIdx < this.pageOrder.length - 1) {
            reorderPages(currentIdx, currentIdx + 1);
            appInstance.showToast(`Moved Page to position ${currentIdx + 2}`, "info");
          }
        });

        // Drag & Drop event handlers on card
        card.addEventListener("dragstart", (e) => {
          draggedIndex = parseInt(card.dataset.index, 10);
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", String(draggedIndex));
          card.classList.add("is-dragging");
        });

        card.addEventListener("dragend", () => {
          card.classList.remove("is-dragging");
          thumbnailGrid.querySelectorAll(".thumbnail-card").forEach(c => {
            c.classList.remove("drag-target-left", "drag-target-right");
          });
          draggedIndex = null;
        });

        card.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          if (draggedIndex === null) return;
          const targetIdx = parseInt(card.dataset.index, 10);
          if (targetIdx === draggedIndex) return;

          const rect = card.getBoundingClientRect();
          const isRight = (e.clientX - rect.left) > (rect.width / 2);
          card.classList.toggle("drag-target-left", !isRight);
          card.classList.toggle("drag-target-right", isRight);
        });

        card.addEventListener("dragleave", () => {
          card.classList.remove("drag-target-left", "drag-target-right");
        });

        card.addEventListener("drop", (e) => {
          e.preventDefault();
          card.classList.remove("drag-target-left", "drag-target-right");
          if (draggedIndex === null) return;
          let targetIdx = parseInt(card.dataset.index, 10);
          if (targetIdx === draggedIndex) return;

          const rect = card.getBoundingClientRect();
          const isRight = (e.clientX - rect.left) > (rect.width / 2);
          if (isRight && targetIdx < draggedIndex) {
            targetIdx++;
          } else if (!isRight && targetIdx > draggedIndex) {
            targetIdx--;
          }
          targetIdx = Math.max(0, Math.min(this.pageOrder.length - 1, targetIdx));

          const pageNumMoved = this.pageOrder[draggedIndex];
          reorderPages(draggedIndex, targetIdx);
          appInstance.showToast(`Placed Page ${pageNumMoved} at position ${targetIdx + 1}`, "info");
        });
      }

      updateCardsIndexLabels();
      updateOrderStatusUI();
      previewStatus.innerText = "Loaded successfully. Ready to split, convert, arrange, or compress.";
    };

    restoreSingleDocPreview = () => {
      if (previewTitle) {
        previewTitle.innerHTML = `Visual Page Inspector ${this.totalPages > 0 ? `<span class="preview-count-pill">${this.totalPages} pages</span>` : ''}`;
      }
      if (this.pdfDoc && this.activePdf) {
        const hasMergeCards = thumbnailGrid.querySelector(".merge-preview-card");
        const hasThumbCards = thumbnailGrid.querySelector(".thumbnail-card:not(.merge-preview-card)");
        if (hasMergeCards || !hasThumbCards) {
          renderThumbnails(this.activePdf);
        } else {
          previewStatus.innerText = "Loaded successfully. Ready to split, convert, arrange, or compress.";
        }
      } else {
        thumbnailGrid.innerHTML = `
          <div class="empty-results-msg" style="padding: 80px 20px; text-align: center;">
            <p style="margin: 0; font-size: 13px; color: var(--text-muted);">Upload a PDF to view page thumbnails and select ranges.</p>
          </div>
        `;
        previewStatus.innerText = "No document loaded.";
      }
    };

    // Range string formatting helper
    const updateRangeString = () => {
      const validPages = Array.from(this.selectedPages).filter(p => this.pageOrder.includes(p));
      const sorted = validPages.sort((a, b) => a - b);
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
          if (this.pageOrder.includes(num)) this.selectedPages.add(num);
        } else if (/^\d+\s*-\s*\d+$/.test(part)) {
          const [startStr, endStr] = part.split("-");
          const start = parseInt(startStr.trim(), 10);
          const end = parseInt(endStr.trim(), 10);
          if (start <= end) {
            for (let k = start; k <= end; k++) {
              if (this.pageOrder.includes(k)) this.selectedPages.add(k);
            }
          }
        }
      });

      syncSelectionClasses();
      const activeCount = Array.from(this.selectedPages).filter(p => this.pageOrder.includes(p)).length;
      selectedCountBadge.innerText = `${activeCount} page${activeCount === 1 ? '' : 's'}`;
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
      const sortedPages = this.pageOrder.filter(p => this.selectedPages.has(p));
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

      try {
        srcDoc = await this.pdfLib.PDFDocument.load(this.pdfDoc.slice(0), { ignoreEncryption: true });
      } catch (loadErr) {
        console.warn("PDF-Lib load failed, falling back to canvas rebuild:", loadErr);
      }

      const newDoc = await this.pdfLib.PDFDocument.create();
      let splitMethodSucceeded = false;

      if (srcDoc) {
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

      let srcDoc = null;
      let canVectorCopy = false;
      try {
        srcDoc = await this.pdfLib.PDFDocument.load(this.pdfDoc.slice(0), { ignoreEncryption: true });
        canVectorCopy = true;
      } catch (e) {
        canVectorCopy = false;
      }

      let pdfjsInstance = null;

      for (let i = 0; i < pages.length; i++) {
        const pNum = pages[i];
        updateProgressBar(10 + Math.round((i / pages.length) * 80), `Packaging single PDF ${pNum} (${i + 1}/${pages.length})...`);
        const singleDoc = await this.pdfLib.PDFDocument.create();
        let pageAppended = false;

        if (canVectorCopy && srcDoc) {
          try {
            const [copiedPage] = await singleDoc.copyPages(srcDoc, [pNum - 1]);
            const rot = (this.pageRotations[pNum] || 0) % 360;
            if (rot !== 0) {
              copiedPage.setRotation(this.pdfLib.degrees((copiedPage.getRotation().angle + rot) % 360));
            }
            singleDoc.addPage(copiedPage);
            pageAppended = true;
          } catch (copyErr) {
            canVectorCopy = false;
          }
        }

        if (!pageAppended) {
          if (!pdfjsInstance) {
            this.pdfjs = await loadPdfJs();
            pdfjsInstance = await this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) }).promise;
          }
          const page = await pdfjsInstance.getPage(pNum);
          const rot = (this.pageRotations[pNum] || 0) % 360;
          const unscaled = page.getViewport({ scale: 1.0, rotation: rot });
          const viewport = page.getViewport({ scale: 2.0, rotation: rot });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;

          const imgData = canvas.toDataURL("image/jpeg", 0.94);
          const imgBytes = dataURLtoUint8Array(imgData);
          const img = await singleDoc.embedJpg(imgBytes);
          const newPage = singleDoc.addPage([unscaled.width, unscaled.height]);
          newPage.drawImage(img, { x: 0, y: 0, width: unscaled.width, height: unscaled.height });
        }

        const singleBytes = await singleDoc.save();
        zip.file(`${baseName}_page_${pNum}.pdf`, singleBytes);
      }

      if (pdfjsInstance) await pdfjsInstance.destroy().catch(() => {});

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

          const blob = await new Promise(resolve => canvas.toBlob(resolve, mime, quality));
          downloadBlob(blob, `${baseName}_page_${pNum}.${ext}`);
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
          let pageLines = "";
          let lastY = null;
          for (const item of textContent.items) {
            const str = item.str || "";
            if (item.hasEOL) {
              pageLines += str + "\n";
            } else if (lastY !== null && item.transform && Math.abs(item.transform[5] - lastY) > 5) {
              pageLines += "\n" + str;
            } else {
              pageLines += (pageLines.endsWith(" ") || pageLines.endsWith("\n") || pageLines === "" ? "" : " ") + str;
            }
            if (item.transform) lastY = item.transform[5];
          }
          fullText += `========================================\nPAGE ${pNum}\n========================================\n\n${pageLines.trim()}\n\n`;
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
            text: item.str || "",
            x: item.transform ? Math.round(item.transform[4] * 100) / 100 : 0,
            y: item.transform ? Math.round(item.transform[5] * 100) / 100 : 0,
            width: item.width ? Math.round(item.width * 100) / 100 : 0,
            height: item.height ? Math.round(item.height * 100) / 100 : 0
          }));
          const plainText = textContent.items.map(i => i.str || "").join(" ");
          const vp = page.getViewport({ scale: 1.0 });

          resultData.pages.push({
            pageNumber: pNum,
            width: Math.round(vp.width),
            height: Math.round(vp.height),
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
            const srcDoc = await this.pdfLib.PDFDocument.load(this.pdfDoc.slice(0), { ignoreEncryption: true });
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
          const blob = await new Promise(resolve => canvas.toBlob(resolve, mime, 0.92));
          downloadBlob(blob, `${baseName}_page_${pageNum}.${format}`);
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
    // MERGE MULTIPLE PDFS & PAGE ARRANGER ENGINE
    // ==========================================
    const fileColorPalette = [
      "#00f2fe", // Cyan
      "#a855f7", // Purple
      "#3b82f6", // Blue
      "#10b981", // Emerald
      "#f59e0b", // Amber
      "#ec4899", // Pink
      "#06b6d4", // Teal
      "#8b5cf6"  // Violet
    ];

    if (mergeAddLoadedDocBtn) {
      mergeAddLoadedDocBtn.addEventListener("click", () => {
        if (!this.pdfDoc || !this.fileName) return;
        this.mergeFiles.push({
          id: "doc_" + Date.now() + Math.random().toString(36).substr(2, 5),
          name: this.fileName,
          size: `${(this.pdfDoc.byteLength / (1024 * 1024)).toFixed(2)} MB`,
          buffer: this.pdfDoc.slice(0),
          numPages: this.totalPages || 1,
          isEncrypted: false
        });
        rebuildMergePages(true);
        renderMergeList(false);
        if (this.currentTab === "merge") {
          renderMergePreviewGrid(false);
        }
        if (mergeLoadedDocBanner) mergeLoadedDocBanner.style.display = "none";
        appInstance.showToast(`Added "${this.fileName}" to merge queue!`, "success");
      });
    }

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

      if (mergeLoadingIndicator) {
        mergeLoadingIndicator.style.display = "flex";
        if (mergeLoadingText) mergeLoadingText.innerText = `Adding ${pdfFiles.length} file${pdfFiles.length === 1 ? '' : 's'}...`;
      }

      this.pdfLib = await loadPdfLib();
      for (let fIdx = 0; fIdx < pdfFiles.length; fIdx++) {
        const file = pdfFiles[fIdx];
        if (mergeLoadingText) {
          mergeLoadingText.innerText = `Reading "${file.name}" (${fIdx + 1}/${pdfFiles.length})...`;
        }
        try {
          const buffer = await file.arrayBuffer();
          let numPages = 0;
          let isEncrypted = false;

          // 1. Try loading with pdf-lib ignoring standard/owner password restrictions
          try {
            const doc = await this.pdfLib.PDFDocument.load(buffer.slice(0), { ignoreEncryption: true });
            numPages = doc.getPageCount();
          } catch (pdfLibErr) {
            isEncrypted = true;
            // 2. If pdf-lib rejects, fallback to PDF.js
            try {
              this.pdfjs = await loadPdfJs();
              const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(buffer.slice(0)) });
              const pdfDoc = await loadingTask.promise;
              numPages = pdfDoc.numPages;
              if (pdfDoc.destroy) await pdfDoc.destroy().catch(() => {});
            } catch (pdfjsErr) {
              console.warn(`PDF.js fallback inspection failed for ${file.name}:`, pdfjsErr);
            }
          }

          if (numPages === 0) {
            this.pdfjs = await loadPdfJs();
            const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(buffer.slice(0)) });
            const pdfDoc = await loadingTask.promise;
            numPages = pdfDoc.numPages;
            if (pdfDoc.destroy) await pdfDoc.destroy().catch(() => {});
          }

          this.mergeFiles.push({
            id: "doc_" + Date.now() + Math.random().toString(36).substr(2, 5),
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
            buffer: buffer,
            numPages: numPages || 1,
            isEncrypted: isEncrypted
          });
        } catch (err) {
          console.error(`Failed to parse ${file.name}:`, err);
          appInstance.showToast(`Could not read ${file.name}: ${err.message}`, "error");
        }
      }

      if (mergeLoadingIndicator) {
        mergeLoadingIndicator.style.display = "none";
      }

      rebuildMergePages(true);
      renderMergeList(false);
      if (this.currentTab === "merge") {
        renderMergePreviewGrid(false);
      }
      if (mergeFileInput) mergeFileInput.value = "";
      appInstance.showToast(`Added ${pdfFiles.length} file(s) to merge queue.`, "success");
    };

    const rebuildMergePages = (preserveCustom = true) => {
      if (!preserveCustom || this.mergePages.length === 0) {
        this.mergePages = [];
        this.mergeFiles.forEach((file, fIdx) => {
          const color = fileColorPalette[fIdx % fileColorPalette.length];
          for (let p = 1; p <= file.numPages; p++) {
            this.mergePages.push({
              id: `${file.id}_p${p}`,
              fileId: file.id,
              fileName: file.name,
              fileIndex: fIdx,
              pageNum: p,
              rotation: 0,
              isExcluded: false,
              color: color
            });
          }
        });
      } else {
        const existingMap = new Map();
        this.mergePages.forEach(p => existingMap.set(p.id, p));

        const activeFileIds = new Set(this.mergeFiles.map(f => f.id));
        let updatedPages = this.mergePages.filter(p => activeFileIds.has(p.fileId));

        this.mergeFiles.forEach((file, fIdx) => {
          const color = fileColorPalette[fIdx % fileColorPalette.length];
          for (let p = 1; p <= file.numPages; p++) {
            const pageId = `${file.id}_p${p}`;
            const existing = existingMap.get(pageId);
            if (existing) {
              existing.fileIndex = fIdx;
              existing.fileName = file.name;
              existing.color = color;
            } else {
              updatedPages.push({
                id: pageId,
                fileId: file.id,
                fileName: file.name,
                fileIndex: fIdx,
                pageNum: p,
                rotation: 0,
                isExcluded: false,
                color: color
              });
            }
          }
        });

        this.mergePages = updatedPages;
      }
      updateMergeStats();
    };

    const updateMergeStats = () => {
      const totalFiles = this.mergeFiles.length;
      const totalPages = this.mergePages.length;
      const activePages = this.mergePages.filter(p => !p.isExcluded).length;
      const excludedPages = totalPages - activePages;

      if (mergeStats) {
        mergeStats.innerText = `${totalFiles} File${totalFiles === 1 ? '' : 's'} • ${totalPages} Pages Total (${activePages} active)`;
      }
      if (modeDocCount) modeDocCount.innerText = totalFiles;
      if (modePageCount) modePageCount.innerText = activePages;
      if (excludedCountBadge) excludedCountBadge.innerText = excludedPages;
      if (mergePageRestoreAll) {
        mergePageRestoreAll.style.display = excludedPages > 0 ? "inline-flex" : "none";
      }
      mergeClearBtn.disabled = (totalFiles === 0);
      mergeBtn.disabled = (totalFiles < 2 && activePages < 2) || activePages === 0;
      if (pdfMergeBtnContent && !this.isProcessing) {
        pdfMergeBtnContent.innerHTML = "Merge &amp; Download PDF";
      }

      if (mergeViewModeBar) {
        mergeViewModeBar.style.display = (totalFiles > 0 && this.currentTab === "merge") ? "flex" : "none";
      }
    };

    const reorderMergePages = (fromIdx, toIdx) => {
      if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0 || fromIdx >= this.mergePages.length || toIdx >= this.mergePages.length) return;
      const [moved] = this.mergePages.splice(fromIdx, 1);
      this.mergePages.splice(toIdx, 0, moved);

      // Re-order DOM elements in thumbnailGrid without re-rendering canvases
      const cardsMap = new Map();
      thumbnailGrid.querySelectorAll(".merge-page-card").forEach(card => {
        cardsMap.set(card.dataset.id, card);
      });
      this.mergePages.forEach((pItem, idx) => {
        const card = cardsMap.get(pItem.id);
        if (card) {
          thumbnailGrid.appendChild(card);
          card.dataset.index = idx;
          const posNum = card.querySelector(".pos-num");
          if (posNum) posNum.innerText = pItem.isExcluded ? 'Excluded' : `Pos #${idx + 1}`;
          const prevBtn = card.querySelector(".merge-page-prev");
          if (prevBtn) prevBtn.disabled = (idx === 0);
          const nextBtn = card.querySelector(".merge-page-next");
          if (nextBtn) nextBtn.disabled = (idx === this.mergePages.length - 1);
        }
      });
      updateMergeStats();
    };

    const renderDocCover = async (item, card) => {
      if (item.coverDataUrl) return;
      try {
        this.pdfjs = await loadPdfJs();
        const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(item.buffer.slice(0)) });
        const pdf = await loadingTask.promise;
        const page = await pdf.getPage(1);
        const unscaled = page.getViewport({ scale: 1.0 });
        const scale = 200 / Math.max(unscaled.width, unscaled.height);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;

        item.coverDataUrl = canvas.toDataURL("image/jpeg", 0.88);
        if (pdf.destroy) await pdf.destroy().catch(() => {});

        const wrapper = card.querySelector(".merge-cover-wrapper");
        if (wrapper) {
          wrapper.innerHTML = `<img src="${item.coverDataUrl}" class="merge-cover-img" alt="${escapeHtml(item.name)} cover" />`;
        }
      } catch (err) {
        console.warn(`Cover generation failed for ${item.name}:`, err);
        const wrapper = card.querySelector(".merge-cover-wrapper");
        if (wrapper) {
          wrapper.innerHTML = `
            <div class="merge-cover-placeholder" style="color: #fbbf24;">
              <span style="font-size: 22px;">📄</span>
              <span style="font-size: 9.5px; text-align: center; padding: 0 4px;">PDF Document (${item.numPages}p)</span>
            </div>
          `;
        }
      }
    };

    const renderMergePageThumbnail = async (file, pageItem, card, getPdfJsDoc) => {
      try {
        const pdf = await getPdfJsDoc(file);
        const page = await pdf.getPage(pageItem.pageNum);
        const rot = (pageItem.rotation || 0) % 360;
        const unscaled = page.getViewport({ scale: 1.0, rotation: rot });
        const scale = 140 / Math.max(unscaled.width, unscaled.height);
        const viewport = page.getViewport({ scale, rotation: rot });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport }).promise;

        const wrapper = card.querySelector(".thumbnail-canvas-wrapper");
        if (wrapper) {
          wrapper.innerHTML = "";
          wrapper.appendChild(canvas);
        }
      } catch (err) {
        console.warn(`Thumbnail failed for ${pageItem.fileName} p${pageItem.pageNum}:`, err);
        const wrapper = card.querySelector(".thumbnail-canvas-wrapper");
        if (wrapper) {
          wrapper.innerHTML = `<span style="font-size: 10px; color: var(--text-muted); padding: 6px;">Pg ${pageItem.pageNum}</span>`;
        }
      }
    };

    let modalContext = { type: "single", pageNum: 1, file: null, pageItem: null };
    let renderModalView = async () => {};

    const openMergeDocModal = (item) => {
      modalContext = { type: "merge-doc", file: item, pageNum: 1, pageItem: null };
      zoomModal.classList.remove("hidden");
      renderModalView();
    };

    const openMergePageModal = (file, pageItem) => {
      modalContext = { type: "merge-page", file, pageItem, pageNum: pageItem.pageNum };
      zoomModal.classList.remove("hidden");
      renderModalView();
    };

    let mergeDraggedIdx = null;
    let mergePreviewDraggedIdx = null;

    renderMergePreviewGrid = (forceRefresh = false) => {
      if (this.currentTab !== "merge") return;

      if (this.mergeFiles.length === 0) {
        if (mergeViewModeBar) mergeViewModeBar.style.display = "none";
        thumbnailGrid.innerHTML = `
          <div class="empty-results-msg" style="padding: 80px 20px; text-align: center; width: 100%;">
            <div style="font-size: 36px; margin-bottom: 12px; opacity: 0.75;">📑</div>
            <p style="margin: 0 0 6px 0; font-size: 14px; font-weight: 600; color: var(--text-color);">No PDFs in Merge Queue</p>
            <p style="margin: 0; font-size: 12px; color: var(--text-muted); max-width: 360px; margin: 0 auto; line-height: 1.5;">Add 2 or more PDF files in the left panel to preview covers, arrange entire documents, or organize page-by-page.</p>
          </div>
        `;
        previewStatus.innerText = "Add PDFs to arrange files or individual pages.";
        if (previewTitle) previewTitle.innerHTML = "Merge Sequence &amp; Page Arranger";
        return;
      }

      if (mergeViewModeBar) mergeViewModeBar.style.display = "flex";

      // 1. DOCUMENT VIEW (Whole File Order)
      if (this.mergeViewMode === "doc") {
        if (btnModeDoc) btnModeDoc.classList.add("active-mode");
        if (btnModePages) btnModePages.classList.remove("active-mode");
        if (pdfMergePageTools) pdfMergePageTools.style.display = "none";

        if (previewTitle) {
          previewTitle.innerHTML = `Document Sequence Preview <span class="preview-count-pill" style="display:inline-block">${this.mergeFiles.length} file${this.mergeFiles.length === 1 ? '' : 's'}</span>`;
        }
        previewStatus.innerText = `${this.mergeFiles.length} document${this.mergeFiles.length === 1 ? '' : 's'} queued. Drag cards or switch to Page-by-Page Order to arrange sheets.`;
        thumbnailGrid.innerHTML = "";

        this.mergeFiles.forEach((item, idx) => {
          const card = document.createElement("div");
          card.className = "thumbnail-card merge-preview-card";
          card.dataset.id = item.id;
          card.dataset.index = idx;
          card.draggable = true;

          card.innerHTML = `
            <div class="merge-doc-order-tag" title="Document #${idx + 1} in merge sequence">Doc #${idx + 1}</div>
            <div class="thumbnail-card-actions">
              <button class="thumb-action-btn merge-zoom-btn" title="Inspect Document Cover" data-index="${idx}">🔍</button>
              <button class="thumb-action-btn merge-card-remove-btn" title="Remove Document from Merge" data-index="${idx}" style="color: #ff6b6b;">✕</button>
            </div>
            <div class="merge-cover-wrapper" data-index="${idx}">
              ${item.coverDataUrl 
                ? `<img src="${item.coverDataUrl}" class="merge-cover-img" alt="${escapeHtml(item.name)} cover" />` 
                : `<div class="merge-cover-placeholder"><span class="mini-spinner"></span><span style="font-size: 10px; margin-top: 4px;">Loading cover...</span></div>`
              }
            </div>
            <div class="merge-card-meta">
              <div class="merge-card-filename" title="${escapeHtml(item.name)}">${idx + 1}. ${escapeHtml(item.name)}</div>
              <div class="merge-card-pages">
                <span>${item.numPages} page${item.numPages === 1 ? '' : 's'} • ${item.size}</span>
                ${item.isEncrypted ? '<span style="color: #fbbf24; font-weight: 600; margin-left: 4px;">Secured</span>' : ''}
              </div>
            </div>
            <div class="thumbnail-card-footer" style="padding: 6px 8px; justify-content: space-between; border-top: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.25);">
              <div class="card-reorder-nav" style="width: 100%; justify-content: space-between;">
                <button class="thumb-reorder-btn merge-move-prev-btn" title="Move document earlier in merge order" ${idx === 0 ? 'disabled' : ''} style="font-size: 11px; padding: 3px 8px;">◀ Earlier</button>
                <button class="tool-btn secondary merge-expand-pages-btn" title="View and arrange pages of this document" style="font-size: 10px; padding: 2px 6px;">📄 Pages</button>
                <button class="thumb-reorder-btn merge-move-next-btn" title="Move document later in merge order" ${idx === this.mergeFiles.length - 1 ? 'disabled' : ''} style="font-size: 11px; padding: 3px 8px;">Later ▶</button>
              </div>
            </div>
          `;

          thumbnailGrid.appendChild(card);

          if (!item.coverDataUrl) {
            renderDocCover(item, card);
          }

          card.querySelector(".merge-zoom-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            openMergeDocModal(item);
          });

          card.querySelector(".merge-card-remove-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            this.mergeFiles.splice(idx, 1);
            rebuildMergePages(true);
            renderMergeList(false);
            renderMergePreviewGrid(false);
            appInstance.showToast(`Removed "${item.name}" from merge queue`, "info");
          });

          card.querySelector(".merge-expand-pages-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            this.mergeViewMode = "pages";
            renderMergePreviewGrid(false);
          });

          card.querySelector(".merge-move-prev-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            if (idx > 0) {
              const temp = this.mergeFiles[idx];
              this.mergeFiles[idx] = this.mergeFiles[idx - 1];
              this.mergeFiles[idx - 1] = temp;
              rebuildMergePages(false);
              renderMergeList(false);
              renderMergePreviewGrid(false);
              appInstance.showToast(`Moved "${temp.name}" to position ${idx}`, "info");
            }
          });

          card.querySelector(".merge-move-next-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            if (idx < this.mergeFiles.length - 1) {
              const temp = this.mergeFiles[idx];
              this.mergeFiles[idx] = this.mergeFiles[idx + 1];
              this.mergeFiles[idx + 1] = temp;
              rebuildMergePages(false);
              renderMergeList(false);
              renderMergePreviewGrid(false);
              appInstance.showToast(`Moved "${temp.name}" to position ${idx + 2}`, "info");
            }
          });

          card.addEventListener("dragstart", (e) => {
            mergePreviewDraggedIdx = idx;
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", String(idx));
            card.classList.add("is-dragging");
          });

          card.addEventListener("dragend", () => {
            card.classList.remove("is-dragging");
            thumbnailGrid.querySelectorAll(".merge-preview-card").forEach(c => {
              c.classList.remove("drag-target-left", "drag-target-right");
            });
            mergePreviewDraggedIdx = null;
          });

          card.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            if (mergePreviewDraggedIdx === null || mergePreviewDraggedIdx === idx) return;

            const rect = card.getBoundingClientRect();
            const isRight = (e.clientX - rect.left) > (rect.width / 2);
            card.classList.toggle("drag-target-left", !isRight);
            card.classList.toggle("drag-target-right", isRight);
          });

          card.addEventListener("dragleave", () => {
            card.classList.remove("drag-target-left", "drag-target-right");
          });

          card.addEventListener("drop", (e) => {
            e.preventDefault();
            card.classList.remove("drag-target-left", "drag-target-right");
            if (mergePreviewDraggedIdx === null || mergePreviewDraggedIdx === idx) return;

            const rect = card.getBoundingClientRect();
            const isRight = (e.clientX - rect.left) > (rect.width / 2);
            let targetIndex = idx;
            if (isRight && targetIndex < mergePreviewDraggedIdx) {
              targetIndex++;
            } else if (!isRight && targetIndex > mergePreviewDraggedIdx) {
              targetIndex--;
            }
            targetIndex = Math.max(0, Math.min(this.mergeFiles.length - 1, targetIndex));

            const [movedItem] = this.mergeFiles.splice(mergePreviewDraggedIdx, 1);
            this.mergeFiles.splice(targetIndex, 0, movedItem);
            rebuildMergePages(false);
            renderMergeList(false);
            renderMergePreviewGrid(false);
            appInstance.showToast(`Arranged "${movedItem.name}" to position ${targetIndex + 1}`, "info");
          });
        });
        return;
      }

      // 2. PAGE-BY-PAGE VIEW (Granular Page Sequence & Arrangement)
      if (this.mergeViewMode === "pages") {
        if (btnModeDoc) btnModeDoc.classList.remove("active-mode");
        if (btnModePages) btnModePages.classList.add("active-mode");
        if (pdfMergePageTools) pdfMergePageTools.style.display = "flex";

        const activeCount = this.mergePages.filter(p => !p.isExcluded).length;
        if (previewTitle) {
          previewTitle.innerHTML = `Page-by-Page Arranger <span class="preview-count-pill" style="display:inline-block">${activeCount} active / ${this.mergePages.length} total pages</span>`;
        }
        previewStatus.innerText = `Arranging ${activeCount} pages across ${this.mergeFiles.length} files. Drag cards to reorder, rotate 🔄, or exclude 🗑️ sheets.`;
        thumbnailGrid.innerHTML = "";

        const pdfJsDocs = new Map();
        const getPdfJsDoc = async (file) => {
          if (pdfJsDocs.has(file.id)) return pdfJsDocs.get(file.id);
          this.pdfjs = await loadPdfJs();
          const task = this.pdfjs.getDocument({ data: new Uint8Array(file.buffer.slice(0)) });
          const doc = await task.promise;
          pdfJsDocs.set(file.id, doc);
          return doc;
        };

        this.mergePages.forEach((pageItem, idx) => {
          const card = document.createElement("div");
          card.className = "thumbnail-card merge-page-card" + (pageItem.isExcluded ? " is-excluded" : "");
          card.dataset.id = pageItem.id;
          card.dataset.index = idx;
          card.draggable = true;

          const shortDocName = pageItem.fileName.length > 18 
            ? pageItem.fileName.substring(0, 16) + "…" 
            : pageItem.fileName;

          card.innerHTML = `
            <div class="merge-page-doc-tag" style="background: ${pageItem.color}20; border-color: ${pageItem.color}55; color: ${pageItem.color};" title="${escapeHtml(pageItem.fileName)} • Page ${pageItem.pageNum}">
              Doc ${pageItem.fileIndex + 1}: ${escapeHtml(shortDocName)} • Pg ${pageItem.pageNum}
            </div>
            <div class="thumbnail-card-actions">
              <button class="thumb-action-btn page-zoom-btn" title="Inspect Page Full-Screen">🔍</button>
              <button class="thumb-action-btn page-rotate-btn" title="Rotate 90° CW">🔄</button>
              <button class="thumb-action-btn page-exclude-btn" title="${pageItem.isExcluded ? 'Restore Page into Merge' : 'Exclude Page from Merge'}" style="color: ${pageItem.isExcluded ? '#10b981' : '#ff6b6b'};">
                ${pageItem.isExcluded ? '➕' : '🗑️'}
              </button>
            </div>
            <div class="thumbnail-canvas-wrapper">
              <div class="merge-cover-placeholder"><span class="mini-spinner"></span><span style="font-size: 9.5px; margin-top: 4px;">Pg ${pageItem.pageNum}</span></div>
            </div>
            <div class="thumbnail-card-footer" style="padding: 4px 6px; width: 100%; justify-content: space-between;">
              <div class="card-reorder-nav" style="width: 100%; justify-content: space-between;">
                <button class="thumb-reorder-btn merge-page-prev" title="Move page earlier" ${idx === 0 ? 'disabled' : ''}>◀</button>
                <span class="thumb-page-badge"><strong class="pos-num" style="color: var(--accent-cyan);">${pageItem.isExcluded ? 'Excluded' : `Pos #${idx + 1}`}</strong></span>
                <button class="thumb-reorder-btn merge-page-next" title="Move page later" ${idx === this.mergePages.length - 1 ? 'disabled' : ''}>▶</button>
              </div>
            </div>
          `;

          thumbnailGrid.appendChild(card);

          const file = this.mergeFiles.find(f => f.id === pageItem.fileId);
          if (file) {
            renderMergePageThumbnail(file, pageItem, card, getPdfJsDoc);
          }

          // Zoom
          card.querySelector(".page-zoom-btn").addEventListener("click", (e) => {
            e.stopPropagation();
            if (file) openMergePageModal(file, pageItem);
          });

          // Rotate
          card.querySelector(".page-rotate-btn").addEventListener("click", async (e) => {
            e.stopPropagation();
            pageItem.rotation = ((pageItem.rotation || 0) + 90) % 360;
            appInstance.showToast(`Rotated Page ${pageItem.pageNum} to ${pageItem.rotation}°`, "info");
            if (file) {
              const canvas = card.querySelector("canvas");
              if (canvas) {
                canvas.style.transform = `rotate(${pageItem.rotation}deg)`;
              } else {
                renderMergePageThumbnail(file, pageItem, card, getPdfJsDoc);
              }
            }
          });

          // Exclude / Restore
          const excludeBtn = card.querySelector(".page-exclude-btn");
          excludeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            pageItem.isExcluded = !pageItem.isExcluded;
            card.classList.toggle("is-excluded", pageItem.isExcluded);
            excludeBtn.innerHTML = pageItem.isExcluded ? '➕' : '🗑️';
            excludeBtn.style.color = pageItem.isExcluded ? '#10b981' : '#ff6b6b';
            excludeBtn.title = pageItem.isExcluded ? 'Restore Page into Merge' : 'Exclude Page from Merge';
            const posNum = card.querySelector(".pos-num");
            if (posNum) {
              posNum.innerText = pageItem.isExcluded ? 'Excluded' : `Pos #${idx + 1}`;
            }
            updateMergeStats();
            appInstance.showToast(pageItem.isExcluded ? `Excluded Page ${pageItem.pageNum} from merge.` : `Restored Page ${pageItem.pageNum} to merge.`, "info");
          });

          // Move Earlier
          card.querySelector(".merge-page-prev").addEventListener("click", (e) => {
            e.stopPropagation();
            const currentIdx = parseInt(card.dataset.index, 10);
            if (currentIdx > 0) {
              reorderMergePages(currentIdx, currentIdx - 1);
              appInstance.showToast(`Moved Page to position ${currentIdx}`, "info");
            }
          });

          // Move Later
          card.querySelector(".merge-page-next").addEventListener("click", (e) => {
            e.stopPropagation();
            const currentIdx = parseInt(card.dataset.index, 10);
            if (currentIdx < this.mergePages.length - 1) {
              reorderMergePages(currentIdx, currentIdx + 1);
              appInstance.showToast(`Moved Page to position ${currentIdx + 2}`, "info");
            }
          });

          // Drag and drop for page cards
          card.addEventListener("dragstart", (e) => {
            mergeDraggedIdx = parseInt(card.dataset.index, 10);
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", String(mergeDraggedIdx));
            card.classList.add("is-dragging");
          });

          card.addEventListener("dragend", () => {
            card.classList.remove("is-dragging");
            thumbnailGrid.querySelectorAll(".merge-page-card").forEach(c => {
              c.classList.remove("drag-target-left", "drag-target-right");
            });
            mergeDraggedIdx = null;
          });

          card.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            if (mergeDraggedIdx === null) return;
            const targetIdx = parseInt(card.dataset.index, 10);
            if (targetIdx === mergeDraggedIdx) return;

            const rect = card.getBoundingClientRect();
            const isRight = (e.clientX - rect.left) > (rect.width / 2);
            card.classList.toggle("drag-target-left", !isRight);
            card.classList.toggle("drag-target-right", isRight);
          });

          card.addEventListener("dragleave", () => {
            card.classList.remove("drag-target-left", "drag-target-right");
          });

          card.addEventListener("drop", (e) => {
            e.preventDefault();
            card.classList.remove("drag-target-left", "drag-target-right");
            if (mergeDraggedIdx === null) return;
            let targetIdx = parseInt(card.dataset.index, 10);
            if (targetIdx === mergeDraggedIdx) return;

            const rect = card.getBoundingClientRect();
            const isRight = (e.clientX - rect.left) > (rect.width / 2);
            if (isRight && targetIdx < mergeDraggedIdx) {
              targetIdx++;
            } else if (!isRight && targetIdx > mergeDraggedIdx) {
              targetIdx--;
            }
            targetIdx = Math.max(0, Math.min(this.mergePages.length - 1, targetIdx));

            reorderMergePages(mergeDraggedIdx, targetIdx);
            appInstance.showToast(`Placed Page at position ${targetIdx + 1}`, "info");
          });
        });
      }
    };

    const renderMergeList = (syncPreview = true) => {
      if (this.mergeFiles.length === 0) {
        emptyMergeMsg.style.display = "block";
        mergeItemsContainer.innerHTML = "";
        mergeClearBtn.disabled = true;
        mergeBtn.disabled = true;
        if (mergeHeaderBar) mergeHeaderBar.style.display = "none";
        if (mergePostAction) mergePostAction.style.display = "none";
        if (syncPreview && this.currentTab === "merge") {
          renderMergePreviewGrid(false);
        }
        updateMergeStats();
        return;
      }

      emptyMergeMsg.style.display = "none";
      mergeClearBtn.disabled = false;
      if (mergeHeaderBar) mergeHeaderBar.style.display = "flex";

      updateMergeStats();
      mergeItemsContainer.innerHTML = "";

      this.mergeFiles.forEach((item, idx) => {
        const row = document.createElement("div");
        row.className = "pdf-merge-item";
        row.draggable = true;
        row.dataset.index = idx;
        const color = fileColorPalette[idx % fileColorPalette.length];

        row.innerHTML = `
          <div style="display: flex; align-items: center; overflow: hidden; max-width: 68%;">
            <span class="merge-drag-handle" title="Drag to arrange file sequence">⋮⋮</span>
            <span style="width: 8px; height: 8px; border-radius: 50%; background: ${color}; margin-right: 8px; flex-shrink: 0;" title="Document color tag"></span>
            <div class="pdf-merge-item-info">
              <span class="pdf-merge-item-name" title="${escapeHtml(item.name)}">${idx + 1}. ${escapeHtml(item.name)}</span>
              <span class="pdf-merge-item-meta">${item.numPages} page${item.numPages === 1 ? '' : 's'} • ${item.size}${item.isEncrypted ? ' • <span style="color: #fbbf24; font-weight: 600;">Secured</span>' : ''}</span>
            </div>
          </div>
          <div class="pdf-merge-item-actions">
            <button class="merge-mini-btn move-up-btn" data-index="${idx}" ${idx === 0 ? 'disabled' : ''} title="Move Earlier (Up)">▲</button>
            <button class="merge-mini-btn move-down-btn" data-index="${idx}" ${idx === this.mergeFiles.length - 1 ? 'disabled' : ''} title="Move Later (Down)">▼</button>
            <button class="merge-mini-btn remove-btn" data-index="${idx}" style="color: #ff6b6b;" title="Remove">✕</button>
          </div>
        `;

        row.querySelector(".move-up-btn").addEventListener("click", () => {
          if (idx > 0) {
            const temp = this.mergeFiles[idx];
            this.mergeFiles[idx] = this.mergeFiles[idx - 1];
            this.mergeFiles[idx - 1] = temp;
            rebuildMergePages(false);
            renderMergeList(false);
            renderMergePreviewGrid(false);
          }
        });

        row.querySelector(".move-down-btn").addEventListener("click", () => {
          if (idx < this.mergeFiles.length - 1) {
            const temp = this.mergeFiles[idx];
            this.mergeFiles[idx] = this.mergeFiles[idx + 1];
            this.mergeFiles[idx + 1] = temp;
            rebuildMergePages(false);
            renderMergeList(false);
            renderMergePreviewGrid(false);
          }
        });

        row.querySelector(".remove-btn").addEventListener("click", () => {
          this.mergeFiles.splice(idx, 1);
          rebuildMergePages(true);
          renderMergeList(false);
          renderMergePreviewGrid(false);
        });

        row.addEventListener("dragstart", (e) => {
          mergeDraggedIdx = idx;
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", String(idx));
          row.classList.add("is-dragging");
        });

        row.addEventListener("dragend", () => {
          row.classList.remove("is-dragging");
          mergeItemsContainer.querySelectorAll(".pdf-merge-item").forEach(r => {
            r.classList.remove("drag-target-top", "drag-target-bottom");
          });
          mergeDraggedIdx = null;
        });

        row.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          if (mergeDraggedIdx === null || mergeDraggedIdx === idx) return;
          const rect = row.getBoundingClientRect();
          const isBottom = (e.clientY - rect.top) > (rect.height / 2);
          row.classList.toggle("drag-target-top", !isBottom);
          row.classList.toggle("drag-target-bottom", isBottom);
        });

        row.addEventListener("dragleave", () => {
          row.classList.remove("drag-target-top", "drag-target-bottom");
        });

        row.addEventListener("drop", (e) => {
          e.preventDefault();
          row.classList.remove("drag-target-top", "drag-target-bottom");
          if (mergeDraggedIdx === null || mergeDraggedIdx === idx) return;

          const rect = row.getBoundingClientRect();
          const isBottom = (e.clientY - rect.top) > (rect.height / 2);
          let targetIndex = idx;
          if (isBottom && targetIndex < mergeDraggedIdx) {
            targetIndex++;
          } else if (!isBottom && targetIndex > mergeDraggedIdx) {
            targetIndex--;
          }
          targetIndex = Math.max(0, Math.min(this.mergeFiles.length - 1, targetIndex));

          const [movedItem] = this.mergeFiles.splice(mergeDraggedIdx, 1);
          this.mergeFiles.splice(targetIndex, 0, movedItem);
          rebuildMergePages(false);
          renderMergeList(false);
          renderMergePreviewGrid(false);
          appInstance.showToast(`Arranged "${movedItem.name}" to position ${targetIndex + 1}`, "info");
        });

        mergeItemsContainer.appendChild(row);
      });

      if (syncPreview && this.currentTab === "merge") {
        renderMergePreviewGrid(false);
      }
    };

    if (btnModeDoc) {
      btnModeDoc.addEventListener("click", () => {
        this.mergeViewMode = "doc";
        renderMergePreviewGrid(false);
      });
    }

    if (btnModePages) {
      btnModePages.addEventListener("click", () => {
        this.mergeViewMode = "pages";
        renderMergePreviewGrid(false);
      });
    }

    if (mergePageRotateAll) {
      mergePageRotateAll.addEventListener("click", () => {
        this.mergePages.forEach(p => {
          if (!p.isExcluded) {
            p.rotation = ((p.rotation || 0) + 90) % 360;
          }
        });
        thumbnailGrid.querySelectorAll(".merge-page-card:not(.is-excluded)").forEach(card => {
          const pageId = card.dataset.id;
          const pItem = this.mergePages.find(p => p.id === pageId);
          const canvas = card.querySelector("canvas");
          if (canvas && pItem) {
            canvas.style.transform = `rotate(${pItem.rotation}deg)`;
          }
        });
        appInstance.showToast("Rotated all active pages by 90° CW", "info");
      });
    }

    if (mergePageInvert) {
      mergePageInvert.addEventListener("click", () => {
        this.mergePages.reverse();
        renderMergePreviewGrid(false);
        appInstance.showToast("Inverted merge page order", "info");
      });
    }

    if (mergePageReset) {
      mergePageReset.addEventListener("click", () => {
        rebuildMergePages(false);
        renderMergePreviewGrid(false);
        appInstance.showToast("Reset pages to original sequential document order", "info");
      });
    }

    if (mergePageRestoreAll) {
      mergePageRestoreAll.addEventListener("click", () => {
        this.mergePages.forEach(p => p.isExcluded = false);
        renderMergePreviewGrid(false);
        updateMergeStats();
        appInstance.showToast("Restored all excluded pages", "info");
      });
    }

    if (mergeSortAzBtn) {
      mergeSortAzBtn.addEventListener("click", () => {
        if (this.mergeFiles.length < 2) return;
        this.mergeFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));
        rebuildMergePages(false);
        renderMergeList(false);
        if (this.currentTab === "merge") renderMergePreviewGrid(false);
        appInstance.showToast("Sorted files alphabetically (A-Z)", "info");
      });
    }

    if (mergeReverseBtn) {
      mergeReverseBtn.addEventListener("click", () => {
        if (this.mergeFiles.length < 2) return;
        this.mergeFiles.reverse();
        rebuildMergePages(false);
        renderMergeList(false);
        if (this.currentTab === "merge") renderMergePreviewGrid(false);
        appInstance.showToast("Inverted file sequence", "info");
      });
    }

    mergeClearBtn.addEventListener("click", () => {
      this.mergeFiles = [];
      this.mergePages = [];
      renderMergeList(false);
      if (this.currentTab === "merge") renderMergePreviewGrid(false);
      if (pdfMergeSuccessCard) pdfMergeSuccessCard.style.display = "none";
      if (pdfMergeProgressBox) pdfMergeProgressBox.style.display = "none";
      appInstance.showToast("Cleared merge queue.", "info");
    });

    // Execute Merge with Robust Encryption & Certificate Fallback
    mergeBtn.addEventListener("click", async () => {
      const activePages = this.mergePages.filter(p => !p.isExcluded);
      if (this.mergeFiles.length < 2 && activePages.length < 2) {
        appInstance.showToast("Please add at least 2 PDF files to merge.", "warning");
        return;
      }
      if (activePages.length === 0) {
        appInstance.showToast("No active pages in merge queue. Please restore at least 1 page.", "warning");
        return;
      }

      setProcessing(true, `Merging ${activePages.length} pages from ${this.mergeFiles.length} files...`);
      if (pdfMergeProgressBox) pdfMergeProgressBox.style.display = "block";
      if (pdfMergeSuccessCard) pdfMergeSuccessCard.style.display = "none";
      if (mergePostAction) mergePostAction.style.display = "none";

      const updateMergeProgress = (pct, title, subtext) => {
        const cleanPct = Math.min(100, Math.max(0, Math.round(pct)));
        if (pdfMergeLiveTitle) pdfMergeLiveTitle.innerText = title;
        if (pdfMergeLivePercent) pdfMergeLivePercent.innerText = `${cleanPct}%`;
        if (pdfMergeLiveSubtext) pdfMergeLiveSubtext.innerText = subtext;
        if (pdfMergeLiveBar) pdfMergeLiveBar.style.width = `${cleanPct}%`;
        if (pdfMergeBtnContent) {
          pdfMergeBtnContent.innerHTML = `<span class="mini-spinner" style="vertical-align:middle; margin-right:6px;"></span> Merging... (${cleanPct}%)`;
        }
        if (previewStatus) previewStatus.innerText = `${title} • ${subtext}`;
      };

      const highlightActiveCard = (pageId) => {
        thumbnailGrid.querySelectorAll(".is-active-merging").forEach(c => c.classList.remove("is-active-merging"));
        const card = thumbnailGrid.querySelector(`[data-id="${pageId}"]`);
        if (card) {
          card.classList.add("is-active-merging");
          card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        }
      };

      let lastMergedBytes = null;
      let stage1Success = false;

      // STAGE 1: Lossless Fast Vector Merge (Preserves bookmarks, vector text, sharpness)
      try {
        updateMergeProgress(5, "Initializing PDF-Lib Engine...", "Loading vector assembler...");
        this.pdfLib = await loadPdfLib();
        const mergedDoc = await this.pdfLib.PDFDocument.create();

        // Load all source PDF buffers into PDF-Lib documents
        const srcDocsMap = new Map();
        for (let f = 0; f < this.mergeFiles.length; f++) {
          const file = this.mergeFiles[f];
          updateMergeProgress(5 + Math.round((f / this.mergeFiles.length) * 15), `Reading "${file.name}"...`, `Preparing buffer (${f + 1}/${this.mergeFiles.length})`);
          try {
            const srcDoc = await this.pdfLib.PDFDocument.load(file.buffer.slice(0), { ignoreEncryption: true });
            srcDocsMap.set(file.id, srcDoc);
          } catch (e) {
            console.warn(`PDF-Lib vector load failed for ${file.name}:`, e);
          }
        }

        if (srcDocsMap.size < this.mergeFiles.length) {
          throw new Error("One or more files require compatible canvas rendering (encrypted/protected).");
        }

        // Copy each page in activePages order
        for (let i = 0; i < activePages.length; i++) {
          const item = activePages[i];
          const pct = 20 + Math.round((i / activePages.length) * 65);
          updateMergeProgress(pct, `Appending Page ${i + 1} of ${activePages.length}...`, `${item.fileName} (Page ${item.pageNum})`);
          highlightActiveCard(item.id);

          const srcDoc = srcDocsMap.get(item.fileId);
          if (!srcDoc) throw new Error(`Missing source document for ${item.fileName}`);

          const [copiedPage] = await mergedDoc.copyPages(srcDoc, [item.pageNum - 1]);
          const rot = (item.rotation || 0) % 360;
          if (rot !== 0) {
            copiedPage.setRotation(this.pdfLib.degrees((copiedPage.getRotation().angle + rot) % 360));
          }
          mergedDoc.addPage(copiedPage);
        }

        updateMergeProgress(88, "Compiling Vector PDF...", "Serializing document pages and streams...");
        const mergedBytes = await mergedDoc.save();
        lastMergedBytes = mergedBytes;
        stage1Success = true;
      } catch (stage1Err) {
        console.warn("Vector copy failed or threw during save, falling back to universal canvas rendering:", stage1Err);
      }

      // STAGE 2: Universal High-Res Canvas Fallback (Works on 100% of PDFs: certified, encrypted, scanned)
      if (!stage1Success) {
        try {
          updateMergeProgress(20, "Rebuilding via High-Res Engine...", "Preserving secured/complex PDF pages...");
          this.pdfjs = await loadPdfJs();
          this.pdfLib = await loadPdfLib();
          const fallbackDoc = await this.pdfLib.PDFDocument.create();

          const pdfJsDocs = new Map();
          for (let i = 0; i < activePages.length; i++) {
            const item = activePages[i];
            const pct = 20 + Math.round((i / activePages.length) * 70);
            updateMergeProgress(pct, `Rendering Page ${i + 1} of ${activePages.length}...`, `${item.fileName} (Page ${item.pageNum})`);
            highlightActiveCard(item.id);

            const file = this.mergeFiles.find(f => f.id === item.fileId);
            if (!file) continue;

            let pdfDoc = pdfJsDocs.get(file.id);
            if (!pdfDoc) {
              const task = this.pdfjs.getDocument({ data: new Uint8Array(file.buffer.slice(0)) });
              pdfDoc = await task.promise;
              pdfJsDocs.set(file.id, pdfDoc);
            }

            const page = await pdfDoc.getPage(item.pageNum);
            const rot = (item.rotation || 0) % 360;
            const unscaled = page.getViewport({ scale: 1.0, rotation: rot });
            const viewport = page.getViewport({ scale: 2.0, rotation: rot });

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            await page.render({ canvasContext: ctx, viewport }).promise;

            const imgData = canvas.toDataURL("image/jpeg", 0.94);
            const imgBytes = dataURLtoUint8Array(imgData);
            const img = await fallbackDoc.embedJpg(imgBytes);
            const newPage = fallbackDoc.addPage([unscaled.width, unscaled.height]);
            newPage.drawImage(img, { x: 0, y: 0, width: unscaled.width, height: unscaled.height });
          }

          for (const doc of pdfJsDocs.values()) {
            if (doc.destroy) await doc.destroy().catch(() => {});
          }

          updateMergeProgress(92, "Compiling Final PDF...", "Generating clean output file...");
          lastMergedBytes = await fallbackDoc.save();
        } catch (stage2Err) {
          console.error("Universal merge fallback failed:", stage2Err);
          appInstance.showToast(`Merge failed: ${stage2Err.message}`, "error");
          setProcessing(false);
          return;
        }
      }

      // Finalize and Download
      updateMergeProgress(100, "Merge Complete!", `Successfully merged ${activePages.length} pages into 1 PDF!`);
      thumbnailGrid.querySelectorAll(".is-active-merging").forEach(c => c.classList.remove("is-active-merging"));

      const blob = new Blob([lastMergedBytes], { type: "application/pdf" });
      const sizeStr = `${(lastMergedBytes.byteLength / (1024 * 1024)).toFixed(2)} MB`;
      downloadBlob(blob, "merged_document.pdf");

      if (pdfMergeProgressBox) pdfMergeProgressBox.style.display = "none";
      if (pdfMergeSuccessCard) {
        pdfMergeSuccessCard.style.display = "block";
        if (pdfMergeSuccessTitle) pdfMergeSuccessTitle.innerText = `Merged ${this.mergeFiles.length} Files (${activePages.length} Pages) Successfully!`;
        if (pdfMergeSuccessSize) pdfMergeSuccessSize.innerText = sizeStr;
      }

      if (pdfMergeDownloadAgainBtn) {
        pdfMergeDownloadAgainBtn.onclick = () => {
          downloadBlob(blob, "merged_document.pdf");
        };
      }

      if (pdfMergeBtnContent) {
        pdfMergeBtnContent.innerHTML = "✓ Merged Successfully!";
      }

      if (mergePostAction && mergeOpenOrganizerBtn) {
        mergePostAction.style.display = "block";
        mergeOpenOrganizerBtn.onclick = async () => {
          if (!lastMergedBytes) return;
          const syntheticFile = new File([lastMergedBytes], "merged_document.pdf", { type: "application/pdf" });
          await handleFileSelection(syntheticFile);
          switchTab("rotate", true);
          appInstance.showToast("Loaded merged PDF into Page Organizer!", "success");
        };
      }

      appInstance.showToast(`Merged ${this.mergeFiles.length} files (${activePages.length} pages) successfully!`, "success");
      setProcessing(false);
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

    // Page Arrange Operations (Reverse & Reset Order)
    reverseOrderBtn.addEventListener("click", () => {
      if (this.pageOrder.length < 2) return;
      this.pageOrder.reverse();
      const cardsMap = new Map();
      thumbnailGrid.querySelectorAll(".thumbnail-card").forEach(card => {
        cardsMap.set(parseInt(card.dataset.page, 10), card);
      });
      this.pageOrder.forEach(pNum => {
        const card = cardsMap.get(pNum);
        if (card) thumbnailGrid.appendChild(card);
      });
      updateCardsIndexLabels();
      updateOrderStatusUI();
      appInstance.showToast("Reversed document page sequence", "info");
    });

    resetOrderBtn.addEventListener("click", () => {
      if (this.pageOrder.length < 2) return;
      this.pageOrder.sort((a, b) => a - b);
      const cardsMap = new Map();
      thumbnailGrid.querySelectorAll(".thumbnail-card").forEach(card => {
        cardsMap.set(parseInt(card.dataset.page, 10), card);
      });
      this.pageOrder.forEach(pNum => {
        const card = cardsMap.get(pNum);
        if (card) thumbnailGrid.appendChild(card);
      });
      updateCardsIndexLabels();
      updateOrderStatusUI();
      appInstance.showToast("Reset pages to original sequential order", "info");
    });

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
      if (previewCountPill) previewCountPill.innerText = `${this.pageOrder.length} pages`;
      if (infoPageCount) infoPageCount.innerText = `${this.pageOrder.length} Page(s)`;
      if (previewTitle) {
        previewTitle.innerHTML = `Visual Page Inspector <span class="preview-count-pill" style="display:inline-block">${this.pageOrder.length} pages</span>`;
      }
      // Remove deleted cards from DOM
      const cards = thumbnailGrid.querySelectorAll(".thumbnail-card");
      cards.forEach(card => {
        const pNum = parseInt(card.dataset.page, 10);
        if (!this.pageOrder.includes(pNum)) card.remove();
      });
      updateCardsIndexLabels();
      updateOrderStatusUI();
      reverseOrderBtn.disabled = (this.pageOrder.length < 2);
      resetOrderBtn.disabled = (this.pageOrder.length < 2);
      appInstance.showToast(`Deleted ${count} pages from working set.`, "info");
    });

    saveRotatedBtn.addEventListener("click", async () => {
      if (!this.pdfDoc || this.pageOrder.length === 0) return;
      try {
        setProcessing(true, "Saving updated PDF layout...");
        this.pdfLib = await loadPdfLib();
        const newDoc = await this.pdfLib.PDFDocument.create();

        let copied = false;
        // 1. Try vector copy with ignoreEncryption
        try {
          const srcDoc = await this.pdfLib.PDFDocument.load(this.pdfDoc.slice(0), { ignoreEncryption: true });
          const indices = this.pageOrder.map(p => p - 1);
          const copiedPages = await newDoc.copyPages(srcDoc, indices);
          copiedPages.forEach((page, i) => {
            const pNum = this.pageOrder[i];
            const rot = (this.pageRotations[pNum] || 0) % 360;
            if (rot !== 0) {
              page.setRotation(this.pdfLib.degrees((page.getRotation().angle + rot) % 360));
            }
            newDoc.addPage(page);
          });
          copied = true;
        } catch (copyErr) {
          console.warn("Vector copy failed in organize & rotate, falling back to high-res canvas rendering:", copyErr);
        }

        // 2. High-res canvas rendering fallback for encrypted streams / certificates
        if (!copied) {
          this.pdfjs = await loadPdfJs();
          const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) });
          const pdf = await loadingTask.promise;
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          for (let i = 0; i < this.pageOrder.length; i++) {
            const pNum = this.pageOrder[i];
            updateProgressBar(20 + Math.round((i / this.pageOrder.length) * 70), `Rendering page ${pNum} (${i + 1}/${this.pageOrder.length})...`);
            const page = await pdf.getPage(pNum);
            const rot = (this.pageRotations[pNum] || 0) % 360;
            const unscaled = page.getViewport({ scale: 1.0, rotation: rot });
            const viewport = page.getViewport({ scale: 2.0, rotation: rot });

            canvas.width = viewport.width;
            canvas.height = viewport.height;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            await page.render({ canvasContext: ctx, viewport }).promise;

            const imgData = canvas.toDataURL("image/jpeg", 0.94);
            const imgBytes = dataURLtoUint8Array(imgData);
            const img = await newDoc.embedJpg(imgBytes);
            const newPage = newDoc.addPage([unscaled.width, unscaled.height]);
            newPage.drawImage(img, { x: 0, y: 0, width: unscaled.width, height: unscaled.height });
          }
          if (pdf.destroy) await pdf.destroy().catch(() => {});
        }

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

        const pagesToProcess = this.pageOrder.length > 0 ? this.pageOrder : Array.from({ length: pdf.numPages }, (_, i) => i + 1);

        for (let idx = 0; idx < pagesToProcess.length; idx++) {
          if (appInstance.activeTool !== "pdf-utilities") break;
          const pageNum = pagesToProcess[idx];
          updateProgressBar(10 + Math.round((idx / pagesToProcess.length) * 80), `Compressing page ${pageNum} (${idx + 1}/${pagesToProcess.length})...`);
          const page = await pdf.getPage(pageNum);
          const rot = (this.pageRotations[pageNum] || 0) % 360;
          const scale = targetDpi / 72;
          const viewport = page.getViewport({ scale, rotation: rot });

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
    // ==========================================
    // FULL-SCREEN ZOOM / INSPECTOR MODAL
    // ==========================================
    const openZoomModal = (pageNum) => {
      if (!this.pdfDoc) return;
      modalContext = { type: "single", pageNum, file: null, pageItem: null };
      currentModalPage = pageNum;
      modalZoomMode = "fit";
      zoomModal.classList.remove("hidden");
      requestAnimationFrame(() => {
        renderModalView();
      });
    };

    renderModalView = async () => {
      modalCanvasWrapper.innerHTML = `
        <div style="color: var(--text-muted); font-size: 12px; padding: 40px; text-align: center;">
          <span class="mini-spinner" style="margin-right: 8px;"></span>
          Rendering inspector...
        </div>
      `;

      try {
        let pdf = null;
        let page = null;
        let rot = 0;
        let title = "Page Inspector & HD Exporter";
        let indicator = "";

        if (modalContext.type === "single") {
          const pageNum = modalContext.pageNum;
          currentModalPage = pageNum;
          title = "Page Inspector & HD Exporter";
          const currentIndex = this.pageOrder.indexOf(pageNum);
          const displayIndex = (currentIndex >= 0 ? currentIndex + 1 : pageNum);
          indicator = `Page ${pageNum} (${displayIndex} of ${this.pageOrder.length})`;

          modalPrevBtn.disabled = (currentIndex <= 0);
          modalNextBtn.disabled = (currentIndex >= this.pageOrder.length - 1 || currentIndex < 0);
          modalRotateBtn.disabled = false;
          modalSavePdfBtn.disabled = false;
          modalSavePngBtn.disabled = false;
          modalSaveJpgBtn.disabled = false;

          if (!this.activePdf) {
            this.pdfjs = await loadPdfJs();
            const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) });
            this.activePdf = await loadingTask.promise;
          }
          pdf = this.activePdf;
          page = await pdf.getPage(pageNum);
          rot = (this.pageRotations[pageNum] || 0) % 360;

        } else if (modalContext.type === "merge-doc") {
          const file = modalContext.file;
          title = "Document Cover Inspector";
          indicator = `${file.name} (Cover • 1 of ${file.numPages})`;
          const fIdx = this.mergeFiles.indexOf(file);

          modalPrevBtn.disabled = (fIdx <= 0);
          modalNextBtn.disabled = (fIdx >= this.mergeFiles.length - 1 || fIdx < 0);
          modalRotateBtn.disabled = true;
          modalSavePdfBtn.disabled = true;
          modalSavePngBtn.disabled = false;
          modalSaveJpgBtn.disabled = false;

          this.pdfjs = await loadPdfJs();
          const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(file.buffer.slice(0)) });
          pdf = await loadingTask.promise;
          page = await pdf.getPage(1);
          rot = 0;

        } else if (modalContext.type === "merge-page") {
          const file = modalContext.file;
          const pageItem = modalContext.pageItem;
          title = "Merge Page Inspector";
          const activePages = this.mergePages.filter(p => !p.isExcluded);
          const pIdx = activePages.findIndex(p => p.id === pageItem.id);
          const posIdx = this.mergePages.indexOf(pageItem);
          indicator = `${file.name} (Page ${pageItem.pageNum} of ${file.numPages}) • Pos #${posIdx + 1}`;

          modalPrevBtn.disabled = (pIdx <= 0);
          modalNextBtn.disabled = (pIdx >= activePages.length - 1 || pIdx < 0);
          modalRotateBtn.disabled = false;
          modalSavePdfBtn.disabled = false;
          modalSavePngBtn.disabled = false;
          modalSaveJpgBtn.disabled = false;

          this.pdfjs = await loadPdfJs();
          const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(file.buffer.slice(0)) });
          pdf = await loadingTask.promise;
          page = await pdf.getPage(pageItem.pageNum);
          rot = (pageItem.rotation || 0) % 360;
        }

        if (modalTitle) modalTitle.innerText = title;
        modalPageIndicator.innerText = indicator;

        const unscaledViewport = page.getViewport({ scale: 1.0, rotation: rot });
        const bRect = modalBody.getBoundingClientRect();
        const bodyW = (modalBody.clientWidth > 50 ? modalBody.clientWidth : (bRect.width || window.innerWidth * 0.9));
        const bodyH = (modalBody.clientHeight > 50 ? modalBody.clientHeight : (bRect.height || window.innerHeight * 0.8));
        const availW = Math.max(280, bodyW - 48);
        const availH = Math.max(280, bodyH - 48);

        let displayScale = 1.0;
        if (modalZoomMode === "fit") {
          displayScale = Math.min(availW / unscaledViewport.width, availH / unscaledViewport.height);
          modalZoomBadge.innerText = "Fit Page";
          if (modalFitPageBtn) { modalFitPageBtn.style.background = "rgba(0, 242, 254, 0.2)"; modalFitPageBtn.style.color = "var(--accent-cyan)"; }
          if (modalFitWidthBtn) { modalFitWidthBtn.style.background = "transparent"; modalFitWidthBtn.style.color = "var(--text-color)"; }
        } else if (modalZoomMode === "width") {
          displayScale = availW / unscaledViewport.width;
          modalZoomBadge.innerText = "Fit Width";
          if (modalFitWidthBtn) { modalFitWidthBtn.style.background = "rgba(0, 242, 254, 0.2)"; modalFitWidthBtn.style.color = "var(--accent-cyan)"; }
          if (modalFitPageBtn) { modalFitPageBtn.style.background = "transparent"; modalFitPageBtn.style.color = "var(--text-color)"; }
        } else {
          displayScale = modalCustomScale;
          modalZoomBadge.innerText = `${Math.round(displayScale * 100)}%`;
          if (modalFitPageBtn) { modalFitPageBtn.style.background = "transparent"; modalFitPageBtn.style.color = "var(--text-color)"; }
          if (modalFitWidthBtn) { modalFitWidthBtn.style.background = "transparent"; modalFitWidthBtn.style.color = "var(--text-color)"; }
        }
        modalCurrentScale = displayScale;

        const dpr = Math.max(window.devicePixelRatio || 1, 1.5);
        const renderViewport = page.getViewport({ scale: displayScale * dpr, rotation: rot });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = renderViewport.width;
        canvas.height = renderViewport.height;
        canvas.style.width = `${Math.round(unscaledViewport.width * displayScale)}px`;
        canvas.style.height = `${Math.round(unscaledViewport.height * displayScale)}px`;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: ctx, viewport: renderViewport }).promise;

        modalCanvasWrapper.innerHTML = "";
        modalCanvasWrapper.appendChild(canvas);

        modalBody.scrollTop = 0;
        modalBody.scrollLeft = 0;

        if (modalContext.type !== "single" && pdf && pdf.destroy) {
          await pdf.destroy().catch(() => {});
        }
      } catch (err) {
        modalCanvasWrapper.innerHTML = `<span style="color: #ff6b6b; padding: 20px;">Failed to render: ${escapeHtml(err.message)}</span>`;
      }
    };

    const exportModalCurrent = async (format) => {
      if (modalContext.type === "single") {
        exportSinglePage(modalContext.pageNum, format);
      } else if (modalContext.type === "merge-page") {
        const file = modalContext.file;
        const pageItem = modalContext.pageItem;
        try {
          setProcessing(true, `Exporting Page ${pageItem.pageNum} as ${format.toUpperCase()}...`);
          this.pdfjs = await loadPdfJs();
          this.pdfLib = await loadPdfLib();
          const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || "page";

          if (format === "pdf") {
            const srcDoc = await this.pdfLib.PDFDocument.load(file.buffer.slice(0), { ignoreEncryption: true });
            const newDoc = await this.pdfLib.PDFDocument.create();
            const [copiedPage] = await newDoc.copyPages(srcDoc, [pageItem.pageNum - 1]);
            const rot = (pageItem.rotation || 0) % 360;
            if (rot !== 0) {
              copiedPage.setRotation(this.pdfLib.degrees((copiedPage.getRotation().angle + rot) % 360));
            }
            newDoc.addPage(copiedPage);
            const savedBytes = await newDoc.save();
            downloadBlob(new Blob([savedBytes], { type: "application/pdf" }), `${baseName}_p${pageItem.pageNum}.pdf`);
          } else {
            const pdf = await (await this.pdfjs.getDocument({ data: new Uint8Array(file.buffer.slice(0)) })).promise;
            const page = await pdf.getPage(pageItem.pageNum);
            const rot = (pageItem.rotation || 0) % 360;
            const viewport = page.getViewport({ scale: 2.0, rotation: rot });

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            await page.render({ canvasContext: ctx, viewport }).promise;

            const mime = format === "jpg" ? "image/jpeg" : (format === "webp" ? "image/webp" : "image/png");
            const blob = await new Promise(resolve => canvas.toBlob(resolve, mime, 0.92));
            downloadBlob(blob, `${baseName}_p${pageItem.pageNum}.${format}`);
            if (pdf.destroy) await pdf.destroy().catch(() => {});
          }
          appInstance.showToast(`Saved Page ${pageItem.pageNum} successfully!`, "success");
        } catch (err) {
          console.error(err);
          appInstance.showToast(`Export failed: ${err.message}`, "error");
        } finally {
          setProcessing(false);
        }
      } else if (modalContext.type === "merge-doc") {
        const file = modalContext.file;
        try {
          setProcessing(true, `Exporting Cover as ${format.toUpperCase()}...`);
          this.pdfjs = await loadPdfJs();
          const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || "document";
          const pdf = await (await this.pdfjs.getDocument({ data: new Uint8Array(file.buffer.slice(0)) })).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 2.0 });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          await page.render({ canvasContext: ctx, viewport }).promise;

          const mime = format === "jpg" ? "image/jpeg" : "image/png";
          const blob = await new Promise(resolve => canvas.toBlob(resolve, mime, 0.92));
          downloadBlob(blob, `${baseName}_cover.${format}`);
          if (pdf.destroy) await pdf.destroy().catch(() => {});
          appInstance.showToast("Exported cover image!", "success");
        } catch (err) {
          appInstance.showToast(`Export failed: ${err.message}`, "error");
        } finally {
          setProcessing(false);
        }
      }
    };

    // Zoom & Fullscreen Button Listeners
    modalFitPageBtn.addEventListener("click", () => {
      modalZoomMode = "fit";
      renderModalView();
    });

    modalFitWidthBtn.addEventListener("click", () => {
      modalZoomMode = "width";
      renderModalView();
    });

    modalZoomInBtn.addEventListener("click", () => {
      modalCustomScale = Math.min(4.0, (modalCurrentScale || 1.0) * 1.25);
      modalZoomMode = "custom";
      renderModalView();
    });

    modalZoomOutBtn.addEventListener("click", () => {
      modalCustomScale = Math.max(0.25, (modalCurrentScale || 1.0) / 1.25);
      modalZoomMode = "custom";
      renderModalView();
    });

    const toggleModalFullscreen = () => {
      const isFS = zoomModal.classList.toggle("is-fullscreen");
      modalContainer.classList.toggle("is-fullscreen", isFS);
      if (modalFsLabel) {
        modalFsLabel.innerText = isFS ? "Exit Fullscreen" : "Fullscreen";
      }
      if (modalFsBtn) {
        modalFsBtn.title = isFS ? "Exit Fullscreen (F or Esc)" : "Toggle Fullscreen (F)";
        modalFsBtn.style.borderColor = isFS ? "#10b981" : "rgba(0, 242, 254, 0.3)";
        modalFsBtn.style.color = isFS ? "#10b981" : "var(--accent-cyan)";
        modalFsBtn.innerHTML = isFS ? `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
            <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4"></path>
          </svg>
          <span id="pdf-modal-fs-label">Exit Fullscreen</span>
        ` : `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
          </svg>
          <span id="pdf-modal-fs-label">Fullscreen</span>
        `;
      }
      if (isFS) {
        if (zoomModal.requestFullscreen && !document.fullscreenElement) {
          zoomModal.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.exitFullscreen && document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
      requestAnimationFrame(() => {
        renderModalView();
      });
    };

    if (modalFsBtn) {
      modalFsBtn.addEventListener("click", toggleModalFullscreen);
    }

    modalRotateBtn.addEventListener("click", async () => {
      if (modalContext.type === "single") {
        this.pageRotations[modalContext.pageNum] = ((this.pageRotations[modalContext.pageNum] || 0) + 90) % 360;
        appInstance.showToast(`Rotated Page ${modalContext.pageNum} to ${this.pageRotations[modalContext.pageNum]}°`, "info");
        renderModalView();

        const card = thumbnailGrid.querySelector(`.thumbnail-card[data-page="${modalContext.pageNum}"]`);
        if (card && this.activePdf) {
          try {
            const page = await this.activePdf.getPage(modalContext.pageNum);
            const rot = this.pageRotations[modalContext.pageNum];
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
      } else if (modalContext.type === "merge-page") {
        const pageItem = modalContext.pageItem;
        pageItem.rotation = ((pageItem.rotation || 0) + 90) % 360;
        appInstance.showToast(`Rotated Page ${pageItem.pageNum} to ${pageItem.rotation}°`, "info");
        renderModalView();

        const card = thumbnailGrid.querySelector(`.merge-page-card[data-id="${pageItem.id}"]`);
        if (card && modalContext.file) {
          const canvas = card.querySelector("canvas");
          if (canvas) {
            canvas.style.transform = `rotate(${pageItem.rotation}deg)`;
          }
        }
      }
    });

    modalPrevBtn.addEventListener("click", () => {
      if (modalContext.type === "single") {
        const idx = this.pageOrder.indexOf(modalContext.pageNum);
        if (idx > 0) {
          modalContext.pageNum = this.pageOrder[idx - 1];
          renderModalView();
        }
      } else if (modalContext.type === "merge-doc") {
        const fIdx = this.mergeFiles.indexOf(modalContext.file);
        if (fIdx > 0) {
          modalContext.file = this.mergeFiles[fIdx - 1];
          renderModalView();
        }
      } else if (modalContext.type === "merge-page") {
        const activePages = this.mergePages.filter(p => !p.isExcluded);
        const pIdx = activePages.findIndex(p => p.id === modalContext.pageItem.id);
        if (pIdx > 0) {
          const prev = activePages[pIdx - 1];
          modalContext.file = this.mergeFiles.find(f => f.id === prev.fileId);
          modalContext.pageItem = prev;
          modalContext.pageNum = prev.pageNum;
          renderModalView();
        }
      }
    });

    modalNextBtn.addEventListener("click", () => {
      if (modalContext.type === "single") {
        const idx = this.pageOrder.indexOf(modalContext.pageNum);
        if (idx >= 0 && idx < this.pageOrder.length - 1) {
          modalContext.pageNum = this.pageOrder[idx + 1];
          renderModalView();
        }
      } else if (modalContext.type === "merge-doc") {
        const fIdx = this.mergeFiles.indexOf(modalContext.file);
        if (fIdx >= 0 && fIdx < this.mergeFiles.length - 1) {
          modalContext.file = this.mergeFiles[fIdx + 1];
          renderModalView();
        }
      } else if (modalContext.type === "merge-page") {
        const activePages = this.mergePages.filter(p => !p.isExcluded);
        const pIdx = activePages.findIndex(p => p.id === modalContext.pageItem.id);
        if (pIdx >= 0 && pIdx < activePages.length - 1) {
          const next = activePages[pIdx + 1];
          modalContext.file = this.mergeFiles.find(f => f.id === next.fileId);
          modalContext.pageItem = next;
          modalContext.pageNum = next.pageNum;
          renderModalView();
        }
      }
    });

    const closeModal = () => {
      if (zoomModal.classList.contains("is-fullscreen")) {
        zoomModal.classList.remove("is-fullscreen");
        modalContainer.classList.remove("is-fullscreen");
        if (modalFsBtn) {
          modalFsBtn.style.borderColor = "rgba(0, 242, 254, 0.3)";
          modalFsBtn.style.color = "var(--accent-cyan)";
          modalFsBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
            <span id="pdf-modal-fs-label">Fullscreen</span>
          `;
        }
        if (document.exitFullscreen && document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      }
      zoomModal.classList.add("hidden");
      modalCanvasWrapper.innerHTML = "";
    };

    modalCloseBtn.addEventListener("click", closeModal);
    zoomModal.addEventListener("click", (e) => {
      if (e.target === zoomModal) {
        closeModal();
      }
    });

    if (this._onKeyDown) {
      document.removeEventListener("keydown", this._onKeyDown);
    }
    this._onKeyDown = (e) => {
      if (!zoomModal.classList.contains("hidden")) {
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "f" || e.key === "F") {
          if (!e.ctrlKey && !e.metaKey && !e.altKey && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
            e.preventDefault();
            toggleModalFullscreen();
          }
        } else if (e.key === "ArrowLeft") {
          if (!modalPrevBtn.disabled) modalPrevBtn.click();
        } else if (e.key === "ArrowRight") {
          if (!modalNextBtn.disabled) modalNextBtn.click();
        } else if (e.key === "+" || e.key === "=") {
          modalZoomInBtn.click();
        } else if (e.key === "-" || e.key === "_") {
          modalZoomOutBtn.click();
        } else if (e.key === "0") {
          modalFitPageBtn.click();
        }
      }
    };
    document.addEventListener("keydown", this._onKeyDown);

    if (this._onResize) {
      window.removeEventListener("resize", this._onResize);
    }
    this._onResize = () => {
      if (!zoomModal.classList.contains("hidden") && (modalZoomMode === "fit" || modalZoomMode === "width")) {
        renderModalView();
      }
    };
    window.addEventListener("resize", this._onResize);

    if (this._onFullscreenChange) {
      document.removeEventListener("fullscreenchange", this._onFullscreenChange);
    }
    this._onFullscreenChange = () => {
      if (!document.fullscreenElement && zoomModal.classList.contains("is-fullscreen")) {
        zoomModal.classList.remove("is-fullscreen");
        modalContainer.classList.remove("is-fullscreen");
        if (modalFsBtn) {
          modalFsBtn.style.borderColor = "rgba(0, 242, 254, 0.3)";
          modalFsBtn.style.color = "var(--accent-cyan)";
          modalFsBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
            <span id="pdf-modal-fs-label">Fullscreen</span>
          `;
        }
        renderModalView();
      }
    };
    document.addEventListener("fullscreenchange", this._onFullscreenChange);

    modalSavePngBtn.addEventListener("click", () => exportModalCurrent("png"));
    modalSaveJpgBtn.addEventListener("click", () => exportModalCurrent("jpg"));
    modalSavePdfBtn.addEventListener("click", () => exportModalCurrent("pdf"));

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
        this.pdfDoc = pdfBytes.slice().buffer;
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
        reverseOrderBtn.disabled = (this.pageOrder.length < 2);
        resetOrderBtn.disabled = (this.pageOrder.length < 2);
        updateOrderStatusUI();

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
      switchTab(appInstance.activeSubtab, false);
      if (appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("pdf-utilities", appInstance.activeSubtab, { pushHistory: false, replaceHistory: true });
      }
      appInstance.activeSubtab = null;
    }
  },

  cleanup() {
    this.destroy();
  },

  destroy() {
    if (this._onKeyDown) {
      document.removeEventListener("keydown", this._onKeyDown);
      this._onKeyDown = null;
    }
    if (this._onResize) {
      window.removeEventListener("resize", this._onResize);
      this._onResize = null;
    }
    if (this._onFullscreenChange) {
      document.removeEventListener("fullscreenchange", this._onFullscreenChange);
      this._onFullscreenChange = null;
    }
    if (this.activePdf) {
      this.activePdf.destroy().catch(() => {});
      this.activePdf = null;
    }
  }
};
