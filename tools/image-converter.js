export default {
  id: "image-converter",
  name: "Image Optimizer & Converter",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Optimize Parameters</h3>
          </div>
          
          <!-- Upload Zone -->
          <div class="form-group">
            <div id="img-dropzone" style="border: 2px dashed var(--border-color); border-radius: 8px; padding: 32px 16px; text-align: center; cursor: pointer; transition: border-color 0.2s ease; display: flex; flex-direction: column; align-items: center; gap: 8px; background: rgba(255,255,255,0.02);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40" style="color: var(--accent-amber); opacity: 0.85;">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <span style="font-size: 13px; font-weight: 700; color: var(--text-main);">Drag & Drop Image or Click to Browse</span>
              <span style="font-size: 11px; color: var(--text-muted);">Supports PNG, JPEG, WEBP, SVG</span>
              <input type="file" id="img-file-input" accept="image/*" style="display: none;">
            </div>
          </div>

          <!-- Conversion Controls -->
          <div id="img-controls-box" style="display: none; border-top: 1px solid var(--border-color); padding-top: 14px; flex-direction: column; gap: 14px;">
            <div class="form-group">
              <label for="img-format">Target Format</label>
              <select id="img-format" class="form-select">
                <option value="image/webp">WEBP (Highly Recommended)</option>
                <option value="image/jpeg">JPEG (Standard Photo)</option>
                <option value="image/png">PNG (Lossless/Transparent)</option>
              </select>
            </div>

            <div class="form-group" id="img-quality-group">
              <label>Compression Quality</label>
              <div class="slider-group">
                <input type="range" id="img-quality" class="slider-input" min="10" max="100" value="80">
                <span class="slider-val" id="img-quality-val">80%</span>
              </div>
              <p style="font-size: 11px; color: var(--text-muted); margin: 4px 0 0 0;">Lower values reduce file size but affect image sharpness.</p>
            </div>

            <div class="form-group">
              <label>Resolution Scale</label>
              <div class="slider-group">
                <input type="range" id="img-scale" class="slider-input" min="10" max="200" value="100">
                <span class="slider-val" id="img-scale-val">100% (Original)</span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
              <div class="form-group">
                <label for="img-width">Width (px)</label>
                <input type="number" id="img-width" class="form-select" min="1" placeholder="Width">
              </div>
              <div class="form-group">
                <label for="img-height">Height (px)</label>
                <input type="number" id="img-height" class="form-select" min="1" placeholder="Height">
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" id="img-lock-ratio" checked>
                Lock Aspect Ratio
              </label>
            </div>

            <button class="tool-btn primary" id="img-process-btn" style="width: 100%;">Apply Optimization</button>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Visual Stats & Comparison</h3>
          </div>
          
          <div id="img-empty-preview" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 250px; color: var(--text-muted); text-align: center; gap: 10px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48" style="opacity: 0.4;">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="16"></line>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <span>Upload an image to start optimizing</span>
          </div>

          <div id="img-preview-box" style="display: none; flex-direction: column; gap: 16px;">
            <!-- Comparison Table -->
            <div class="table-container" style="margin: 0; background: rgba(0,0,0,0.2); border-radius: 6px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 10px;">Version</th>
                    <th style="padding: 10px;">Dimensions</th>
                    <th style="padding: 10px;">File Size</th>
                    <th style="padding: 10px;">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="border-bottom: 1px solid rgba(255,255,255,0.03);">
                    <td style="padding: 10px; color: var(--text-muted);">Original</td>
                    <td style="padding: 10px;" id="stat-orig-dim">-</td>
                    <td style="padding: 10px;" id="stat-orig-size">-</td>
                    <td style="padding: 10px; font-weight: bold; color: var(--text-muted)">-</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; font-weight: 700; color: var(--accent-amber);">Optimized</td>
                    <td style="padding: 10px;" id="stat-opt-dim">-</td>
                    <td style="padding: 10px; font-weight: 700; color: var(--accent-emerald);" id="stat-opt-size">-</td>
                    <td style="padding: 10px; font-weight: 900; color: var(--accent-cyan);" id="stat-opt-ratio">-</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Previews -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 4px;">
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <span style="font-size: 11px; color: var(--text-muted); font-weight: 700;">ORIGINAL IMAGE</span>
                <div style="border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden; background: #111; height: 180px; display: flex; align-items: center; justify-content: center;">
                  <img id="preview-orig-img" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
              </div>
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <span style="font-size: 11px; color: var(--accent-amber); font-weight: 700;">OPTIMIZED / EXPORT PREVIEW</span>
                <div style="border: 1px solid var(--border-color); border-radius: 6px; overflow: hidden; background: #111; height: 180px; display: flex; align-items: center; justify-content: center;">
                  <img id="preview-opt-img" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
              </div>
            </div>

            <button class="tool-btn accent-emerald" id="img-download-btn" style="width: 100%; font-weight: 700; font-size: 14px; padding: 12px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="16" height="16" style="margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Download Optimized Image
            </button>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide &amp; Privacy Safeguards</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Offline Compression</strong>: Upload your files safely. The tool processes image canvases locally in your browser memory. **No data ever uploads to any servers.**</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Tune Target Parameters</strong>: Switch format to WebP to save up to 80% on file sizes, adjust quality sliders, and resize dimensions dynamically.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Download Results</strong>: Click **Download Optimized Image** to save the optimized file back to your device instantly.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const dropzone = container.querySelector("#img-dropzone");
    const fileInput = container.querySelector("#img-file-input");
    const controlsBox = container.querySelector("#img-controls-box");
    const emptyPreview = container.querySelector("#img-empty-preview");
    const previewBox = container.querySelector("#img-preview-box");

    const formatSelect = container.querySelector("#img-format");
    const qualitySlider = container.querySelector("#img-quality");
    const qualityVal = container.querySelector("#img-quality-val");
    const qualityGroup = container.querySelector("#img-quality-group");
    const scaleSlider = container.querySelector("#img-scale");
    const scaleVal = container.querySelector("#img-scale-val");
    const widthInput = container.querySelector("#img-width");
    const heightInput = container.querySelector("#img-height");
    const lockRatio = container.querySelector("#img-lock-ratio");

    const origImg = container.querySelector("#preview-orig-img");
    const optImg = container.querySelector("#preview-opt-img");
    const processBtn = container.querySelector("#img-process-btn");
    const downloadBtn = container.querySelector("#img-download-btn");

    const statOrigDim = container.querySelector("#stat-orig-dim");
    const statOrigSize = container.querySelector("#stat-orig-size");
    const statOptDim = container.querySelector("#stat-opt-dim");
    const statOptSize = container.querySelector("#stat-opt-size");
    const statOptRatio = container.querySelector("#stat-opt-ratio");

    let loadedImage = null;
    let fileMetadata = { name: "", size: 0, type: "" };
    let originalAspect = 1.0;

    // Helper: format bytes
    const formatBytes = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    // Show/Hide quality slider based on PNG vs WebP/JPEG
    formatSelect?.addEventListener("change", (e) => {
      if (e.target.value === "image/png") {
        qualityGroup.style.display = "none";
      } else {
        qualityGroup.style.display = "flex";
      }
    });

    // Handle range updates
    qualitySlider?.addEventListener("input", (e) => {
      qualityVal.innerText = `${e.target.value}%`;
    });

    scaleSlider?.addEventListener("input", (e) => {
      const scale = e.target.value;
      scaleVal.innerText = scale === "100" ? "100% (Original)" : `${scale}%`;
      if (loadedImage) {
        widthInput.value = Math.round(loadedImage.width * (scale / 100));
        heightInput.value = Math.round(loadedImage.height * (scale / 100));
      }
    });

    // Dimension Inputs aspect ratio locked updates
    widthInput?.addEventListener("input", (e) => {
      if (loadedImage && lockRatio.checked && widthInput.value) {
        heightInput.value = Math.round(parseInt(widthInput.value) / originalAspect);
      }
    });

    heightInput?.addEventListener("input", (e) => {
      if (loadedImage && lockRatio.checked && heightInput.value) {
        widthInput.value = Math.round(parseInt(heightInput.value) * originalAspect);
      }
    });

    // Process file uploads
    const handleFile = (file) => {
      if (!file || !file.type.startsWith("image/")) {
        appInstance.showToast("Unsupported file type!", "error");
        return;
      }

      fileMetadata.name = file.name;
      fileMetadata.size = file.size;
      fileMetadata.type = file.type;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          loadedImage = img;
          originalAspect = img.width / img.height;

          // Set sizes
          widthInput.value = img.width;
          heightInput.value = img.height;
          scaleSlider.value = "100";
          scaleVal.innerText = "100% (Original)";

          // Set source original image preview
          origImg.src = e.target.result;
          optImg.removeAttribute("src"); // Clear previous

          // Display stats
          statOrigDim.innerText = `${img.width} x ${img.height} px`;
          statOrigSize.innerText = formatBytes(file.size);

          // Reveal UI blocks
          emptyPreview.style.display = "none";
          previewBox.style.display = "flex";
          controlsBox.style.display = "flex";

          // Trigger initial render compression
          compressImage();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    };

    // Main local canvas compression execution
    const compressImage = () => {
      if (!loadedImage) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const targetWidth = parseInt(widthInput.value) || loadedImage.width;
      const targetHeight = parseInt(heightInput.value) || loadedImage.height;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Draw image onto canvas
      ctx.drawImage(loadedImage, 0, 0, targetWidth, targetHeight);

      // Determine compression quality
      const format = formatSelect.value;
      const quality = format === "image/png" ? 1.0 : parseFloat(qualitySlider.value) / 100;

      canvas.toBlob((blob) => {
        if (!blob) {
          appInstance.showToast("Compression failed", "error");
          return;
        }

        // Display results
        const optUrl = URL.createObjectURL(blob);
        optImg.src = optUrl;

        statOptDim.innerText = `${targetWidth} x ${targetHeight} px`;
        statOptSize.innerText = formatBytes(blob.size);

        // Savings percentage
        const savings = ((fileMetadata.size - blob.size) / fileMetadata.size) * 100;
        if (savings > 0) {
          statOptRatio.innerText = `-${savings.toFixed(1)}%`;
          statOptRatio.style.color = "var(--accent-emerald)";
        } else {
          statOptRatio.innerText = `+${Math.abs(savings).toFixed(1)}%`;
          statOptRatio.style.color = "var(--accent-red)";
        }

        // Bind download link
        downloadBtn.onclick = () => {
          const extension = format.split("/")[1];
          const nameParts = fileMetadata.name.split(".");
          nameParts.pop(); // Remove original extension
          const outName = `${nameParts.join(".")}_optimized.${extension}`;

          const link = document.createElement("a");
          link.href = optUrl;
          link.download = outName;
          link.click();
          appInstance.showToast("Saved optimized image!", "success");
        };
      }, format, quality);
    };

    // Event hooks
    processBtn?.addEventListener("click", compressImage);

    // Dropzone triggers
    dropzone?.addEventListener("click", () => fileInput.click());
    fileInput?.addEventListener("change", (e) => {
      if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    dropzone?.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "var(--accent-amber)";
    });

    dropzone?.addEventListener("dragleave", () => {
      dropzone.style.borderColor = "var(--border-color)";
    });

    dropzone?.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "var(--border-color)";
      if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    });
  }
};
