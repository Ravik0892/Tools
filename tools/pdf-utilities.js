import { escapeHtml } from './utils.js';

export default {
  id: "pdf-utilities",
  name: "PDF Toolbox (Split & Compress)",
  
  // State variables for the tool
  pdfDoc: null, // Holds the raw array buffer of the uploaded PDF
  pdfjs: null,
  pdfLib: null,
  totalPages: 0,
  selectedPages: new Set(), // Track selected pages (1-indexed)
  isProcessing: false,
  fileName: "",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Import PDF Document</h3>
            <button class="tool-btn secondary" id="pdf-util-clear" disabled>Clear File</button>
          </div>
          
          <!-- Dropzone -->
          <div class="pdf-dropzone" id="pdf-util-dropzone">
            <svg viewBox="0 0 24 24" class="dropzone-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 12 15 15"></polyline></svg>
            <p class="dropzone-text">Drag & drop a PDF here or <span>browse files</span></p>
            <input type="file" id="pdf-util-file-input" accept=".pdf" style="display: none;">
          </div>

          <!-- Document Info -->
          <div id="pdf-util-info" class="pdf-info-card hidden" style="margin-bottom: 20px;">
            <div class="info-row">
              <span class="info-label">File:</span>
              <span class="info-value" id="info-file-name">-</span>
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

          <!-- Configuration Panel -->
          <div class="pdf-util-tabs" id="pdf-util-tabs-wrapper">
            <div class="util-tab-headers" style="display: flex; gap: 8px; margin-bottom: 16px;">
              <button class="util-tab active" data-tab="split" style="flex: 1; padding: 10px; font-size: 13px; font-weight: bold; border-radius: 8px; cursor: pointer; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); color: var(--text-muted); transition: all 0.3s;">Split PDF</button>
              <button class="util-tab" data-tab="compress" style="flex: 1; padding: 10px; font-size: 13px; font-weight: bold; border-radius: 8px; cursor: pointer; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03); color: var(--text-muted); transition: all 0.3s;">Compress PDF</button>
            </div>

            <!-- Tab Content: Split -->
            <div class="util-tab-content active" id="tab-split-content">
              <div class="form-group">
                <label for="pdf-split-range" style="font-size: 12px; margin-bottom: 6px; display: block;">Page Range / Numbers:</label>
                <input type="text" class="form-control" id="pdf-split-range" placeholder="e.g. 1-3, 5, 8-10" style="margin-bottom: 12px;" disabled>
                <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 16px;">You can select pages visually on the right or type ranges manually.</p>
              </div>
              
              <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                <button class="tool-btn secondary" id="pdf-select-odd" style="flex: 1; font-size: 11px;" disabled>Odd Pages</button>
                <button class="tool-btn secondary" id="pdf-select-even" style="flex: 1; font-size: 11px;" disabled>Even Pages</button>
                <button class="tool-btn secondary" id="pdf-select-all" style="flex: 1; font-size: 11px;" disabled>Select All</button>
              </div>

              <button class="tool-btn primary" id="pdf-split-btn" style="width: 100%;" disabled>Extract & Download PDF</button>
            </div>

            <!-- Tab Content: Compress -->
            <div class="util-tab-content hidden" id="tab-compress-content">
              <div class="form-group" style="margin-bottom: 16px;">
                <label for="pdf-compress-profile" style="font-size: 12px; margin-bottom: 6px; display: block;">Device Profile / Quality Mode:</label>
                <select class="form-select" id="pdf-compress-profile" style="width: 100%;" disabled>
                  <option value="performance">High Performance (Fast / Low Quality - 100 DPI)</option>
                  <option value="balanced" selected>Balanced Mode (Standard Quality - 150 DPI)</option>
                  <option value="accuracy">Max Quality (Uncompromised Detail - 200 DPI)</option>
                </select>
                <p style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">
                  Compression renders each page as a compressed JPEG. Performance mode is optimized for fast rebuilding on low-end devices. Max Quality preserves high resolutions.
                </p>
              </div>

              <button class="tool-btn primary" id="pdf-compress-btn" style="width: 100%;" disabled>Compress & Download PDF</button>
            </div>
          </div>
        </div>

        <!-- Right Preview Panel -->
        <div class="tool-panel" style="flex: 1.5; display: flex; flex-direction: column;">
          <div class="panel-header">
            <h3>Visual Page Previewer</h3>
            <span class="preview-status" id="preview-status" style="font-size: 12px; color: var(--text-muted);">No document loaded.</span>
          </div>

          <div class="pdf-viewer-scroll-container" id="pdf-viewer-scroll-container">
            <div class="pdf-thumbnail-grid" id="pdf-thumbnail-grid">
              <!-- Dynamically populated page cards -->
              <div class="empty-results-msg" style="padding: 60px 0;">Upload a PDF to view page thumbnails and select ranges visually.</div>
            </div>
          </div>
        </div>
      </div>

      <style>
        .pdf-dropzone {
          border: 2px dashed rgba(0, 242, 254, 0.3);
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 30px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          user-select: none;
        }
        .pdf-dropzone:hover, .pdf-dropzone.dragover {
          border-color: var(--accent-cyan);
          background: rgba(0, 242, 254, 0.05);
          box-shadow: 0 0 15px rgba(0, 242, 254, 0.1);
        }
        .dropzone-icon {
          width: 44px;
          height: 44px;
          stroke: rgba(0, 242, 254, 0.7);
          margin-bottom: 12px;
          transition: transform 0.3s ease;
        }
        .pdf-dropzone:hover .dropzone-icon {
          transform: translateY(-3px);
          stroke: var(--accent-cyan);
        }
        .dropzone-text {
          font-size: 14px;
          color: var(--text-color);
          margin: 0;
        }
        .dropzone-text span {
          color: var(--accent-cyan);
          text-decoration: underline;
          font-weight: bold;
        }
        
        .pdf-info-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 12px 16px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          padding: 4px 0;
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

        .util-tab.active {
          background: rgba(0, 242, 254, 0.12) !important;
          border-color: rgba(0, 242, 254, 0.3) !important;
          color: var(--accent-cyan) !important;
        }
        .util-tab-content.hidden {
          display: none !important;
        }
        
        .pdf-viewer-scroll-container {
          flex: 1;
          overflow-y: auto;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 16px;
          max-height: 550px;
        }
        .pdf-thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 16px;
          justify-content: center;
        }
        
        .thumbnail-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
        }
        .thumbnail-card:hover {
          border-color: rgba(0, 242, 254, 0.4);
          background: rgba(255, 255, 255, 0.05);
        }
        .thumbnail-card.selected {
          border-color: var(--accent-cyan);
          background: rgba(0, 242, 254, 0.08);
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.15);
        }
        .thumbnail-canvas-wrapper {
          width: 100%;
          aspect-ratio: 0.707;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .thumbnail-canvas-wrapper canvas {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .thumbnail-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          font-size: 12px;
          font-weight: 500;
        }
        .thumbnail-checkbox {
          width: 16px;
          height: 16px;
          cursor: pointer;
          accent-color: var(--accent-cyan);
        }
        .hidden {
          display: none !important;
        }
      </style>
    `;
  },

  async init(container, appInstance) {
    const fileInput = container.querySelector("#pdf-util-file-input");
    const dropzone = container.querySelector("#pdf-util-dropzone");
    const clearBtn = container.querySelector("#pdf-util-clear");
    const infoCard = container.querySelector("#pdf-util-info");
    const infoFileName = container.querySelector("#info-file-name");
    const infoPageCount = container.querySelector("#info-page-count");
    const infoFileSize = container.querySelector("#info-file-size");
    
    // Tab switching elements
    const tabs = container.querySelectorAll(".util-tab");
    const tabContents = container.querySelectorAll(".util-tab-content");

    // Operations elements
    const splitRangeInput = container.querySelector("#pdf-split-range");
    const oddBtn = container.querySelector("#pdf-select-odd");
    const evenBtn = container.querySelector("#pdf-select-even");
    const allBtn = container.querySelector("#pdf-select-all");
    const splitBtn = container.querySelector("#pdf-split-btn");
    
    const compressProfileSelect = container.querySelector("#pdf-compress-profile");
    const compressBtn = container.querySelector("#pdf-compress-btn");

    const thumbnailGrid = container.querySelector("#pdf-thumbnail-grid");
    const previewStatus = container.querySelector("#preview-status");

    // Dynamic libraries loading state
    let pdfjsLoadingPromise = null;
    let pdfLibLoadingPromise = null;

    // Load libraries
    function loadPdfJs() {
      if (pdfjsLoadingPromise) return pdfjsLoadingPromise;
      pdfjsLoadingPromise = new Promise((resolve, reject) => {
        if (window.pdfjsLib) {
          resolve(window.pdfjsLib);
          return;
        }
        previewStatus.innerText = "Loading PDF Engine (PDF.js)...";
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
    }

    function loadPdfLib() {
      if (pdfLibLoadingPromise) return pdfLibLoadingPromise;
      pdfLibLoadingPromise = new Promise((resolve, reject) => {
        if (window.PDFLib) {
          resolve(window.PDFLib);
          return;
        }
        previewStatus.innerText = "Loading PDF-Lib (PDF Rebuilding Engine)...";
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
        script.onload = () => {
          resolve(window.PDFLib);
        };
        script.onerror = () => {
          pdfLibLoadingPromise = null;
          reject(new Error("Failed to load PDF-Lib rebuilding engine"));
        };
        document.head.appendChild(script);
      });
      return pdfLibLoadingPromise;
    }

    // Trigger file Dialog
    dropzone.addEventListener("click", () => fileInput.click());

    // Drag-and-drop triggers
    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    });
    dropzone.addEventListener("dragleave", () => {
      dropzone.classList.remove("dragover");
    });
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

    // Reset UI to empty state
    clearBtn.addEventListener("click", () => {
      this.pdfDoc = null;
      this.totalPages = 0;
      this.selectedPages.clear();
      this.fileName = "";
      fileInput.value = "";
      
      infoCard.classList.add("hidden");
      clearBtn.disabled = true;
      
      splitRangeInput.value = "";
      splitRangeInput.disabled = true;
      oddBtn.disabled = true;
      evenBtn.disabled = true;
      allBtn.disabled = true;
      splitBtn.disabled = true;
      
      compressProfileSelect.disabled = true;
      compressBtn.disabled = true;

      thumbnailGrid.innerHTML = '<div class="empty-results-msg" style="padding: 60px 0;">Upload a PDF to view page thumbnails and select ranges visually.</div>';
      previewStatus.innerText = "No document loaded.";
      appInstance.showToast("Cleared document", "info");
    });

    // Tab switching
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tabContents.forEach(c => c.classList.add("hidden"));

        tab.classList.add("active");
        container.querySelector(`#tab-${tab.dataset.tab}-content`).classList.remove("hidden");
      });
    });

    // File handler
    const handleFileSelection = async (file) => {
      if (!file || !file.name.toLowerCase().endsWith(".pdf")) {
        appInstance.showToast("Please upload a valid PDF file.", "error");
        return;
      }

      this.fileName = file.name;
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";

      try {
        previewStatus.innerText = "Initializing engines...";
        this.pdfjs = await loadPdfJs();
        this.pdfLib = await loadPdfLib();

        previewStatus.innerText = "Reading file...";
        const arrayBuffer = await file.arrayBuffer();
        this.pdfDoc = arrayBuffer;

        const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(arrayBuffer.slice(0)) });
        const pdf = await loadingTask.promise;
        this.totalPages = pdf.numPages;

        // Update document info UI
        infoFileName.innerText = file.name;
        infoPageCount.innerText = `${pdf.numPages} Page(s)`;
        infoFileSize.innerText = sizeStr;
        infoCard.classList.remove("hidden");

        // Enable inputs
        clearBtn.disabled = false;
        splitRangeInput.disabled = false;
        oddBtn.disabled = false;
        evenBtn.disabled = false;
        allBtn.disabled = false;
        splitBtn.disabled = false;
        compressProfileSelect.disabled = false;
        compressBtn.disabled = false;

        this.selectedPages.clear();
        splitRangeInput.value = "";
        previewStatus.innerText = "Generating thumbnails...";

        await generateThumbnails(pdf);
      } catch (err) {
        console.error(err);
        appInstance.showToast(`Failed to parse PDF: ${err.message}`, "error");
        previewStatus.innerText = `Error: ${err.message}`;
      }
    };

    // Render Page Thumbnails in Grid
    const generateThumbnails = async (pdf) => {
      thumbnailGrid.innerHTML = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        previewStatus.innerText = `Generating thumbnail for page ${i} of ${pdf.numPages}...`;
        const page = await pdf.getPage(i);

        // Render at very low scale for thumbnails (low memory)
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const scale = 120 / unscaledViewport.width; // 120px wide thumbnail
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: ctx,
          viewport: viewport
        }).promise;

        const card = document.createElement("div");
        card.className = "thumbnail-card";
        card.dataset.page = i;

        card.innerHTML = `
          <div class="thumbnail-canvas-wrapper"></div>
          <div class="thumbnail-card-footer">
            <span>Page ${i}</span>
            <input type="checkbox" class="thumbnail-checkbox" data-page="${i}">
          </div>
        `;

        card.querySelector(".thumbnail-canvas-wrapper").appendChild(canvas);
        thumbnailGrid.appendChild(card);

        // Click handlers for visual page selection
        const checkbox = card.querySelector(".thumbnail-checkbox");
        
        const toggleSelection = (e) => {
          // If direct click on card (not checkbox) prevent duplicate triggers
          if (e.target !== checkbox) {
            checkbox.checked = !checkbox.checked;
          }
          
          if (checkbox.checked) {
            this.selectedPages.add(i);
            card.classList.add("selected");
          } else {
            this.selectedPages.delete(i);
            card.classList.remove("selected");
          }
          updateRangeString();
        };

        card.addEventListener("click", toggleSelection);
      }

      previewStatus.innerText = `Loaded successfully. Ready to split or compress.`;
    };

    // Update range input text from selected Set
    const updateRangeString = () => {
      const sorted = Array.from(this.selectedPages).sort((a, b) => a - b);
      if (sorted.length === 0) {
        splitRangeInput.value = "";
        return;
      }

      // Group consecutive numbers into ranges (e.g. 1,2,3,5 -> 1-3, 5)
      const parts = [];
      let start = sorted[0];
      let end = start;

      for (let j = 1; j < sorted.length; j++) {
        if (sorted[j] === end + 1) {
          end = sorted[j];
        } else {
          if (start === end) {
            parts.push(`${start}`);
          } else {
            parts.push(`${start}-${end}`);
          }
          start = sorted[j];
          end = start;
        }
      }

      if (start === end) {
        parts.push(`${start}`);
      } else {
        parts.push(`${start}-${end}`);
      }

      splitRangeInput.value = parts.join(", ");
    };

    // Update selection state from range input change
    splitRangeInput.addEventListener("input", () => {
      const val = splitRangeInput.value;
      this.selectedPages.clear();
      
      const parts = val.split(",").map(p => p.trim());
      parts.forEach(part => {
        if (/^\d+$/.test(part)) {
          const num = parseInt(part, 10);
          if (num >= 1 && num <= this.totalPages) {
            this.selectedPages.add(num);
          }
        } else if (/^\d+-\d+$/.test(part)) {
          const [startStr, endStr] = part.split("-");
          const start = parseInt(startStr, 10);
          const end = parseInt(endStr, 10);
          if (start >= 1 && end <= this.totalPages && start <= end) {
            for (let k = start; k <= end; k++) {
              this.selectedPages.add(k);
            }
          }
        }
      });

      // Update UI classes
      const cards = thumbnailGrid.querySelectorAll(".thumbnail-card");
      cards.forEach(card => {
        const pageNum = parseInt(card.dataset.page, 10);
        const checkbox = card.querySelector(".thumbnail-checkbox");
        if (this.selectedPages.has(pageNum)) {
          card.classList.add("selected");
          checkbox.checked = true;
        } else {
          card.classList.remove("selected");
          checkbox.checked = false;
        }
      });
    });

    // Preset selection buttons
    oddBtn.addEventListener("click", () => {
      this.selectedPages.clear();
      const cards = thumbnailGrid.querySelectorAll(".thumbnail-card");
      cards.forEach(card => {
        const pageNum = parseInt(card.dataset.page, 10);
        const checkbox = card.querySelector(".thumbnail-checkbox");
        if (pageNum % 2 !== 0) {
          this.selectedPages.add(pageNum);
          card.classList.add("selected");
          checkbox.checked = true;
        } else {
          card.classList.remove("selected");
          checkbox.checked = false;
        }
      });
      updateRangeString();
    });

    evenBtn.addEventListener("click", () => {
      this.selectedPages.clear();
      const cards = thumbnailGrid.querySelectorAll(".thumbnail-card");
      cards.forEach(card => {
        const pageNum = parseInt(card.dataset.page, 10);
        const checkbox = card.querySelector(".thumbnail-checkbox");
        if (pageNum % 2 === 0) {
          this.selectedPages.add(pageNum);
          card.classList.add("selected");
          checkbox.checked = true;
        } else {
          card.classList.remove("selected");
          checkbox.checked = false;
        }
      });
      updateRangeString();
    });

    allBtn.addEventListener("click", () => {
      this.selectedPages.clear();
      const cards = thumbnailGrid.querySelectorAll(".thumbnail-card");
      cards.forEach(card => {
        const pageNum = parseInt(card.dataset.page, 10);
        const checkbox = card.querySelector(".thumbnail-checkbox");
        this.selectedPages.add(pageNum);
        card.classList.add("selected");
        checkbox.checked = true;
      });
      updateRangeString();
    });

    // Split Action using pdf-lib
    splitBtn.addEventListener("click", async () => {
      if (!this.pdfDoc || this.selectedPages.size === 0) {
        appInstance.showToast("Please load a PDF and select pages to extract.", "warning");
        return;
      }

      try {
        setProcessing(true, "Extracting pages...");
        
        const srcDoc = await this.pdfLib.PDFDocument.load(this.pdfDoc.slice(0));
        const newDoc = await this.pdfLib.PDFDocument.create();
        
        // pdf-lib copyPages takes 0-indexed indices
        const indicesToCopy = Array.from(this.selectedPages).sort((a,b)=>a-b).map(p => p - 1);
        const copiedPages = await newDoc.copyPages(srcDoc, indicesToCopy);
        
        copiedPages.forEach(page => newDoc.addPage(page));
        
        const pdfBytes = await newDoc.save();
        
        // Trigger download
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const baseName = this.fileName.substring(0, this.fileName.lastIndexOf(".")) || this.fileName;
        link.download = `${baseName}_extracted.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        appInstance.showToast("PDF split completed successfully!", "success");
        previewStatus.innerText = "Extraction complete.";
      } catch (err) {
        console.error(err);
        appInstance.showToast(`Extraction failed: ${err.message}`, "error");
        previewStatus.innerText = `Error: ${err.message}`;
      } finally {
        setProcessing(false);
      }
    });

    // Compress Action (JPEG rendering + pdf-lib compilation)
    compressBtn.addEventListener("click", async () => {
      if (!this.pdfDoc) {
        appInstance.showToast("Please load a PDF to compress.", "warning");
        return;
      }

      try {
        setProcessing(true, "Compressing PDF...");
        
        const loadingTask = this.pdfjs.getDocument({ data: new Uint8Array(this.pdfDoc.slice(0)) });
        const pdf = await loadingTask.promise;
        const newDoc = await this.pdfLib.PDFDocument.create();

        const profile = compressProfileSelect.value;
        let targetDpi = 150;
        let quality = 0.7; // 70% quality balanced

        if (profile === "performance") {
          targetDpi = 100;
          quality = 0.4;
        } else if (profile === "accuracy") {
          targetDpi = 200;
          quality = 0.9;
        }

        for (let i = 1; i <= pdf.numPages; i++) {
          previewStatus.innerText = `Compressing page ${i} of ${pdf.numPages} (${Math.round(((i-1)/pdf.numPages)*100)}%)...`;
          const page = await pdf.getPage(i);

          // Calculate scale based on target DPI (assuming unscaled is 72 DPI)
          const unscaledViewport = page.getViewport({ scale: 1.0 });
          const scale = targetDpi / 72;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          // Draw white background (JPEGs do not support transparency)
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          await page.render({
            canvasContext: ctx,
            viewport: viewport
          }).promise;

          // Compress to JPEG
          const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
          const jpegBytes = await fetch(jpegDataUrl).then(res => res.arrayBuffer());

          // Embed JPEG in new PDF
          const embeddedImage = await newDoc.embedJpg(jpegBytes);
          const { width, height } = embeddedImage.scale(72 / targetDpi); // Scale back to correct PDF units (72 points/inch)
          const pdfPage = newDoc.addPage([width, height]);
          pdfPage.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width: width,
            height: height
          });
        }

        previewStatus.innerText = "Rebuilding compressed PDF file structure...";
        const pdfBytes = await newDoc.save();
        
        // Trigger download
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        const baseName = this.fileName.substring(0, this.fileName.lastIndexOf(".")) || this.fileName;
        link.download = `${baseName}_compressed.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        appInstance.showToast("PDF compression completed successfully!", "success");
        previewStatus.innerText = "Compression complete.";
      } catch (err) {
        console.error(err);
        appInstance.showToast(`Compression failed: ${err.message}`, "error");
        previewStatus.innerText = `Error: ${err.message}`;
      } finally {
        setProcessing(false);
      }
    });

    const setProcessing = (busy, text = "") => {
      this.isProcessing = busy;
      if (busy) {
        previewStatus.innerText = text;
        splitBtn.disabled = true;
        compressBtn.disabled = true;
        clearBtn.disabled = true;
      } else {
        splitBtn.disabled = false;
        compressBtn.disabled = false;
        clearBtn.disabled = false;
      }
    };
  }
};
