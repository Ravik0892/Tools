// OmniTool Hub - Images (JPG/PNG/WebP) to PDF Converter
// 100% Client-Side multi-image to PDF compiler with visual page ordering, orientation, and margin controls.

import { escapeHtml } from './utils.js';

export default {
  id: "images-to-pdf",
  name: "JPG / PNG to PDF Converter",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- PDF Settings & Build Action (Left Panel / Editor) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">PDF Document Settings</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Configure page sizing, margins, and compression options.
              </p>
            </div>
            <button class="tool-btn primary" id="i2p-compile-btn" style="font-size: 11px; padding: 4px 16px; font-weight: 700;" disabled>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Compile PDF</span>
            </button>
          </div>

          <!-- Settings Form -->
          <div style="display: flex; flex-direction: column; gap: 14px;">
            <!-- Document Filename -->
            <div class="form-group">
              <label for="i2p-filename" style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">1. Output Filename</label>
              <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">
                <input type="text" id="i2p-filename" class="form-input" value="converted-documents" style="flex: 1; height: 36px; font-size: 12.5px;">
                <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-muted);">.pdf</span>
              </div>
            </div>

            <!-- Page Size -->
            <div class="form-group">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">2. Page Dimensions</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 6px;">
                <button class="tool-btn secondary i2p-size-btn active" data-size="a4" style="font-size: 11px; padding: 6px 2px; justify-content: center;">A4 (Standard)</button>
                <button class="tool-btn secondary i2p-size-btn" data-size="letter" style="font-size: 11px; padding: 6px 2px; justify-content: center;">US Letter</button>
                <button class="tool-btn secondary i2p-size-btn" data-size="fit" style="font-size: 11px; padding: 6px 2px; justify-content: center;">Fit to Image</button>
              </div>
            </div>

            <!-- Page Orientation -->
            <div class="form-group" id="i2p-orientation-group">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">3. Orientation</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 6px;">
                <button class="tool-btn secondary i2p-orient-btn active" data-orient="portrait" style="font-size: 11px; padding: 6px 2px; justify-content: center;">Portrait</button>
                <button class="tool-btn secondary i2p-orient-btn" data-orient="landscape" style="font-size: 11px; padding: 6px 2px; justify-content: center;">Landscape</button>
                <button class="tool-btn secondary i2p-orient-btn" data-orient="auto" style="font-size: 11px; padding: 6px 2px; justify-content: center;">Auto (Per Page)</button>
              </div>
            </div>

            <!-- Margins -->
            <div class="form-group" id="i2p-margins-group">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">4. Page Margins</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 6px;">
                <button class="tool-btn secondary i2p-margin-btn" data-margin="none" style="font-size: 11px; padding: 6px 2px; justify-content: center;">None (0 mm)</button>
                <button class="tool-btn secondary i2p-margin-btn active" data-margin="small" style="font-size: 11px; padding: 6px 2px; justify-content: center;">Small (10 mm)</button>
                <button class="tool-btn secondary i2p-margin-btn" data-margin="normal" style="font-size: 11px; padding: 6px 2px; justify-content: center;">Normal (20 mm)</button>
              </div>
            </div>

            <!-- Image Fit / Placement -->
            <div class="form-group">
              <label for="i2p-fit-select" style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">5. Image Layout</label>
              <select id="i2p-fit-select" class="form-select" style="width: 100%; height: 36px; margin-top: 4px; font-size: 12px;">
                <option value="contain" selected>Maintain Aspect Ratio (Best Fit)</option>
                <option value="cover">Fill Margins (Crop edges if needed)</option>
              </select>
            </div>

            <!-- Quality & Compression Slider -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin: 0;">6. Image Quality</label>
                <span id="i2p-quality-val" style="font-size: 11px; font-weight: bold; color: var(--accent-cyan);">90%</span>
              </div>
              <input type="range" id="i2p-quality-slider" min="50" max="100" value="90" style="width: 100%; margin-top: 8px; accent-color: var(--accent-cyan);">
            </div>

            <!-- Progress Card (Hidden by default) -->
            <div id="i2p-progress-box" style="display: none; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 8px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 11.5px; font-weight: 600;">
                <span id="i2p-progress-status" style="color: var(--accent-cyan);">Compiling pages...</span>
                <span id="i2p-progress-percent" style="color: var(--text-main);">0%</span>
              </div>
              <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                <div id="i2p-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #00f2fe, #9d4edd); transition: width 0.15s ease;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Configuration & Image Board (Right Panel / Preview & Results) -->
        <div class="tool-panel" style="flex: 1.4;">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Document Page Layout &amp; Preview</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Visual thumbnail sequence. Drag or use arrows to reorder pages.
              </p>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="tool-btn secondary" id="i2p-clear-btn" style="font-size: 11px; padding: 4px 10px; display: none;">Clear All</button>
              <button class="tool-btn secondary" id="i2p-add-more-btn" style="font-size: 11px; padding: 4px 10px; display: none;">+ Add Images</button>
            </div>
          </div>

          <!-- Upload Dropzone -->
          <div id="i2p-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 44px; height: 44px; color: var(--accent-cyan); margin-bottom: 12px;">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="12" y1="18" x2="12" y2="12"></line>
              <polyline points="9 15 12 12 15 15"></polyline>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drag &amp; drop multiple images here, or browse files
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              JPG, PNG, WebP, GIF, and BMP supported. Reorder pages after uploading.
            </div>
            <input type="file" id="i2p-file-input" multiple accept="image/*" style="display: none;">
          </div>

          <!-- Page Thumbnails Board (Visible after images added) -->
          <div id="i2p-board-wrapper" style="display: none; flex-direction: column; gap: 12px; margin-top: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span id="i2p-page-count-badge" style="font-size: 12px; font-weight: 700; color: var(--accent-cyan);">0 Pages Loaded</span>
              <span style="font-size: 11px; color: var(--text-muted);">Use arrows to arrange page sequence</span>
            </div>

            <div id="i2p-thumbnails-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; max-height: 380px; overflow-y: auto; padding: 4px;">
              <!-- Dynamic Thumbnail Cards injected here -->
            </div>
          </div>
        </div>
      
        <!-- Dynamic Guide Card (Unified standard footer guide) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>QUICK GUIDE: IMAGES TO PDF CONVERTER</span>
            </div>
          </div>
          <div class="tool-guide-steps">

            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Upload Image Files</strong>: Drag and drop PNG, JPG, WebP, or SVG graphics into the upload dropzone to prepare individual pages.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Reorder & Configure Page Layout</strong>: Drag images to rearrange sequence, select portrait or landscape orientation, and customize margin spacing.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Generate & Save PDF</strong>: Click Compile PDF to combine all images into a single polished document and download instantly.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init(container, appInstance) {
    let imagesList = []; // Array of { id, file, url, img, rotation }
    let pageSize = "a4";
    let orientation = "portrait";
    let marginSize = "small";
    let pdfLibLoadingPromise = null;

    const dropzone = container.querySelector("#i2p-dropzone");
    const fileInput = container.querySelector("#i2p-file-input");
    const boardWrapper = container.querySelector("#i2p-board-wrapper");
    const thumbnailsGrid = container.querySelector("#i2p-thumbnails-grid");
    const pageCountBadge = container.querySelector("#i2p-page-count-badge");
    const clearBtn = container.querySelector("#i2p-clear-btn");
    const addMoreBtn = container.querySelector("#i2p-add-more-btn");
    const compileBtn = container.querySelector("#i2p-compile-btn");
    const filenameInput = container.querySelector("#i2p-filename");

    const orientationGroup = container.querySelector("#i2p-orientation-group");
    const marginsGroup = container.querySelector("#i2p-margins-group");
    const fitSelect = container.querySelector("#i2p-fit-select");
    const qualitySlider = container.querySelector("#i2p-quality-slider");
    const qualityVal = container.querySelector("#i2p-quality-val");

    const progressBox = container.querySelector("#i2p-progress-box");
    const progressStatus = container.querySelector("#i2p-progress-status");
    const progressPercent = container.querySelector("#i2p-progress-percent");
    const progressBar = container.querySelector("#i2p-progress-bar");

    const loadPdfLib = () => {
      if (pdfLibLoadingPromise) return pdfLibLoadingPromise;
      pdfLibLoadingPromise = new Promise((resolve, reject) => {
        if (window.PDFLib) {
          resolve(window.PDFLib);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
        script.onload = () => resolve(window.PDFLib);
        script.onerror = () => {
          pdfLibLoadingPromise = null;
          reject(new Error("Failed to load PDF engine"));
        };
        document.head.appendChild(script);
      });
      return pdfLibLoadingPromise;
    };

    dropzone.addEventListener("click", () => fileInput.click());
    addMoreBtn.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files.length > 0) {
        addImages(Array.from(e.target.files));
        fileInput.value = "";
      }
    });

    dropzone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "var(--accent-cyan)";
      dropzone.style.background = "rgba(0, 242, 254, 0.08)";
    });
    dropzone.addEventListener("dragleave", () => {
      dropzone.style.borderColor = "rgba(0, 242, 254, 0.35)";
      dropzone.style.background = "rgba(255, 255, 255, 0.02)";
    });
    dropzone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "rgba(0, 242, 254, 0.35)";
      dropzone.style.background = "rgba(255, 255, 255, 0.02)";
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        addImages(Array.from(e.dataTransfer.files));
      }
    });

    clearBtn.addEventListener("click", () => {
      imagesList.forEach(item => URL.revokeObjectURL(item.url));
      imagesList = [];
      dropzone.style.display = "flex";
      boardWrapper.style.display = "none";
      clearBtn.style.display = "none";
      addMoreBtn.style.display = "none";
      compileBtn.disabled = true;
      thumbnailsGrid.innerHTML = "";
    });

    function addImages(files) {
      const validFiles = files.filter(f => f.type.startsWith("image/"));
      if (validFiles.length === 0) return;

      let loadedCount = 0;
      validFiles.forEach(file => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          imagesList.push({
            id: Math.random().toString(36).substring(2, 9),
            file,
            url,
            img,
            rotation: 0
          });
          loadedCount++;
          if (loadedCount === validFiles.length) {
            renderThumbnails();
          }
        };
        img.src = url;
      });
    }

    function renderThumbnails() {
      if (imagesList.length > 0) {
        dropzone.style.display = "none";
        boardWrapper.style.display = "flex";
        clearBtn.style.display = "inline-flex";
        addMoreBtn.style.display = "inline-flex";
        compileBtn.disabled = false;
      } else {
        dropzone.style.display = "flex";
        boardWrapper.style.display = "none";
        clearBtn.style.display = "none";
        addMoreBtn.style.display = "none";
        compileBtn.disabled = true;
      }

      pageCountBadge.innerText = `${imagesList.length} ${imagesList.length === 1 ? 'Page' : 'Pages'} Loaded`;
      thumbnailsGrid.innerHTML = "";

      imagesList.forEach((item, index) => {
        const card = document.createElement("div");
        card.style.cssText = "background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px; display: flex; flex-direction: column; gap: 6px; position: relative;";

        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
            <span style="font-weight: 700; color: var(--accent-cyan);">P.${index + 1}</span>
            <div style="display: flex; gap: 4px;">
              <button class="tool-btn secondary thumb-rotate-btn" data-index="${index}" style="padding: 1px 5px; font-size: 10px;" title="Rotate 90°">🔄</button>
              <button class="tool-btn secondary thumb-del-btn" data-index="${index}" style="padding: 1px 5px; font-size: 10px; color: var(--accent-rose);" title="Remove">✕</button>
            </div>
          </div>
          <div style="width: 100%; aspect-ratio: 0.707; background: #000; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center;">
            <img src="${item.url}" style="max-width: 100%; max-height: 100%; object-fit: contain; transform: rotate(${item.rotation}deg); transition: transform 0.2s ease;">
          </div>
          <div style="display: flex; justify-content: space-between; gap: 4px; margin-top: 2px;">
            <button class="tool-btn secondary thumb-move-left" data-index="${index}" style="flex: 1; padding: 2px; font-size: 10px;" ${index === 0 ? 'disabled' : ''} title="Move Left">◀</button>
            <button class="tool-btn secondary thumb-move-right" data-index="${index}" style="flex: 1; padding: 2px; font-size: 10px;" ${index === imagesList.length - 1 ? 'disabled' : ''} title="Move Right">▶</button>
          </div>
        `;

        // Card button listeners
        card.querySelector(".thumb-rotate-btn").addEventListener("click", () => {
          item.rotation = (item.rotation + 90) % 360;
          renderThumbnails();
        });

        card.querySelector(".thumb-del-btn").addEventListener("click", () => {
          URL.revokeObjectURL(item.url);
          imagesList.splice(index, 1);
          renderThumbnails();
        });

        card.querySelector(".thumb-move-left").addEventListener("click", () => {
          if (index > 0) {
            const temp = imagesList[index];
            imagesList[index] = imagesList[index - 1];
            imagesList[index - 1] = temp;
            renderThumbnails();
          }
        });

        card.querySelector(".thumb-move-right").addEventListener("click", () => {
          if (index < imagesList.length - 1) {
            const temp = imagesList[index];
            imagesList[index] = imagesList[index + 1];
            imagesList[index + 1] = temp;
            renderThumbnails();
          }
        });

        thumbnailsGrid.appendChild(card);
      });
    }

    // Page Size buttons
    container.querySelectorAll(".i2p-size-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".i2p-size-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        pageSize = btn.dataset.size;
        if (pageSize === "fit") {
          orientationGroup.style.display = "none";
          marginsGroup.style.display = "none";
        } else {
          orientationGroup.style.display = "block";
          marginsGroup.style.display = "block";
        }
      });
    });

    // Orientation buttons
    container.querySelectorAll(".i2p-orient-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".i2p-orient-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        orientation = btn.dataset.orient;
      });
    });

    // Margins buttons
    container.querySelectorAll(".i2p-margin-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".i2p-margin-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        marginSize = btn.dataset.margin;
      });
    });

    // Quality slider
    qualitySlider.addEventListener("input", () => {
      qualityVal.innerText = `${qualitySlider.value}%`;
    });

    // Compile & Download PDF
    compileBtn.addEventListener("click", async () => {
      if (imagesList.length === 0) return;

      try {
        compileBtn.disabled = true;
        progressBox.style.display = "block";
        progressStatus.innerText = "Loading PDF-Lib Engine...";
        progressPercent.innerText = "5%";
        progressBar.style.width = "5%";

        const { PDFDocument } = await loadPdfLib();
        const pdfDoc = await PDFDocument.create();

        const quality = parseInt(qualitySlider.value, 10) / 100;
        const fitMode = fitSelect.value;

        // Dimensions in points (1 pt = 1/72 in)
        const dimensions = {
          a4: { w: 595.28, h: 841.89 },
          letter: { w: 612.00, h: 792.00 }
        };

        const marginPts = {
          none: 0,
          small: 28.35, // ~10mm
          normal: 56.70 // ~20mm
        }[marginSize];

        for (let i = 0; i < imagesList.length; i++) {
          const item = imagesList[i];
          const pct = Math.round(((i + 1) / imagesList.length) * 85) + 10;
          progressStatus.innerText = `Processing page ${i + 1} of ${imagesList.length}...`;
          progressPercent.innerText = `${pct}%`;
          progressBar.style.width = `${pct}%`;

          // Rasterize image to canvas respecting rotation and quality
          const canvas = document.createElement("canvas");
          const rad = (item.rotation * Math.PI) / 180;
          const isQuarterRot = item.rotation === 90 || item.rotation === 270;

          const rotatedW = isQuarterRot ? item.img.height : item.img.width;
          const rotatedH = isQuarterRot ? item.img.width : item.img.height;

          canvas.width = rotatedW;
          canvas.height = rotatedH;
          const ctx = canvas.getContext("2d");

          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate(rad);
          ctx.drawImage(item.img, -item.img.width / 2, -item.img.height / 2);

          // Export as JPEG byte stream
          const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
          const base64Data = jpegDataUrl.split(",")[1];
          const imgBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
          const embeddedImage = await pdfDoc.embedJpg(imgBytes);

          // Page creation
          let pageW, pageH;

          if (pageSize === "fit") {
            pageW = rotatedW;
            pageH = rotatedH;
            const page = pdfDoc.addPage([pageW, pageH]);
            page.drawImage(embeddedImage, {
              x: 0,
              y: 0,
              width: pageW,
              height: pageH
            });
          } else {
            const baseDim = dimensions[pageSize] || dimensions.a4;
            let targetIsLandscape = orientation === "landscape";
            if (orientation === "auto") {
              targetIsLandscape = rotatedW > rotatedH;
            }

            pageW = targetIsLandscape ? baseDim.h : baseDim.w;
            pageH = targetIsLandscape ? baseDim.w : baseDim.h;

            const page = pdfDoc.addPage([pageW, pageH]);

            const availW = Math.max(10, pageW - (marginPts * 2));
            const availH = Math.max(10, pageH - (marginPts * 2));

            const imgAspect = rotatedW / rotatedH;
            const availAspect = availW / availH;

            let drawW, drawH;

            if (fitMode === "cover") {
              if (imgAspect > availAspect) {
                drawH = availH;
                drawW = availH * imgAspect;
              } else {
                drawW = availW;
                drawH = availW / imgAspect;
              }
            } else {
              // contain
              if (imgAspect > availAspect) {
                drawW = availW;
                drawH = availW / imgAspect;
              } else {
                drawH = availH;
                drawW = availH * imgAspect;
              }
            }

            const posX = marginPts + (availW - drawW) / 2;
            const posY = marginPts + (availH - drawH) / 2;

            page.drawImage(embeddedImage, {
              x: posX,
              y: posY,
              width: drawW,
              height: drawH
            });
          }
        }

        progressStatus.innerText = "Finalizing PDF document...";
        progressPercent.innerText = "98%";
        progressBar.style.width = "98%";

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const filename = (filenameInput.value.trim() || "converted-documents") + ".pdf";

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 1500);

        progressStatus.innerText = "Complete!";
        progressPercent.innerText = "100%";
        progressBar.style.width = "100%";
        setTimeout(() => { progressBox.style.display = "none"; }, 1500);

        appInstance.showToast(`PDF compiled & downloaded: ${filename}!`, "success");
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('save');
        }
      } catch (err) {
        appInstance.showToast("Compilation error: " + err.message, "error");
        progressBox.style.display = "none";
      } finally {
        compileBtn.disabled = false;
      }
    });
  },

  cleanup() {
    // Revoke any pending object URLs to prevent memory leaks
    if (this._imagesList) {
      this._imagesList.forEach(item => {
        try { URL.revokeObjectURL(item.url); } catch (_) {}
      });
    }
  }
};
