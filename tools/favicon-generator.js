// OmniTool Hub - Favicon & Web App Icon Generator Suite
// 100% Client-Side generation of multi-size PNG suites, ICO files, and manifest snippets.

import { escapeHtml } from './utils.js';

export default {
  id: "favicon-generator",
  name: "Favicon & App Icon Generator",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Image Customizer (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Icon Master Customizer</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Generate complete favicon suites (ICO, PNGs, Apple Touch, Android Chrome).
              </p>
            </div>
            <button class="tool-btn secondary" id="fav-reset-btn" style="font-size: 11px; padding: 4px 10px; display: none;">Change Image</button>
          </div>

          <!-- Dropzone -->
          <div id="fav-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 200px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 44px; height: 44px; color: var(--accent-cyan); margin-bottom: 12px;">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drop master image/logo here, or browse file
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              Recommended: Square PNG, SVG, or high-res JPG (512x512 or higher).
            </div>
            <input type="file" id="fav-file-input" accept="image/*" style="display: none;">
          </div>

          <!-- Customizer Controls (Hidden until file uploaded) -->
          <div id="fav-customizer-controls" style="display: none; flex-direction: column; gap: 14px; margin-top: 10px;">
            <!-- Shape & Corner Radius -->
            <div class="form-group">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">1. Icon Shape</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 6px;">
                <button class="tool-btn secondary fav-shape-btn active" data-shape="square" style="font-size: 11px; padding: 6px 4px; justify-content: center;">Square</button>
                <button class="tool-btn secondary fav-shape-btn" data-shape="rounded" style="font-size: 11px; padding: 6px 4px; justify-content: center;">Rounded (Squircle)</button>
                <button class="tool-btn secondary fav-shape-btn" data-shape="circle" style="font-size: 11px; padding: 6px 4px; justify-content: center;">Circular</button>
              </div>
            </div>

            <!-- Background Color -->
            <div class="form-group">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">2. Background Fill</label>
              <div style="display: flex; gap: 8px; align-items: center; margin-top: 6px;">
                <select id="fav-bg-preset" class="form-select" style="flex: 1; height: 36px; font-size: 12px;">
                  <option value="transparent" selected>Transparent (PNG Alpha)</option>
                  <option value="#ffffff">White (#FFFFFF)</option>
                  <option value="#0f172a">Dark Slate (#0F172A)</option>
                  <option value="#000000">Pure Black (#000000)</option>
                  <option value="custom">Custom Color...</option>
                </select>
                <input type="color" id="fav-bg-color-picker" value="#00f2fe" style="width: 38px; height: 36px; border: none; background: none; cursor: pointer; padding: 0; display: none;">
              </div>
            </div>

            <!-- Padding Inset -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin: 0;">3. Inner Padding (Inset)</label>
                <span id="fav-padding-val" style="font-size: 11px; font-weight: bold; color: var(--accent-cyan);">0%</span>
              </div>
              <input type="range" id="fav-padding-slider" min="0" max="35" value="0" style="width: 100%; margin-top: 8px; accent-color: var(--accent-cyan);">
            </div>

            <!-- Realistic Mockup Previews -->
            <div class="form-group" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px;">
              <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 8px;">Live Device Previews</div>
              
              <!-- Browser Tab Mockup -->
              <div style="background: #181d28; border-radius: 6px; padding: 6px 12px; display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(255,255,255,0.1); max-width: 200px; margin-bottom: 8px;">
                <canvas id="fav-preview-tab-16" width="16" height="16" style="width: 16px; height: 16px;"></canvas>
                <span style="font-size: 11px; color: #cbd5e1; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">My Awesome App</span>
              </div>

              <!-- iOS / Android Home Screen App Icon Mockup -->
              <div style="display: flex; gap: 12px; align-items: center; margin-top: 4px;">
                <div style="text-align: center;">
                  <div style="width: 52px; height: 52px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 4px 10px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; background: #000;">
                    <canvas id="fav-preview-home-52" width="52" height="52" style="width: 52px; height: 52px;"></canvas>
                  </div>
                  <span style="font-size: 10px; color: var(--text-muted); margin-top: 4px; display: block;">App Icon</span>
                </div>

                <div style="text-align: center;">
                  <div style="width: 32px; height: 32px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; background: #000;">
                    <canvas id="fav-preview-32" width="32" height="32" style="width: 32px; height: 32px;"></canvas>
                  </div>
                  <span style="font-size: 10px; color: var(--text-muted); margin-top: 4px; display: block;">32x32</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Generated Favicon Suite & Downloads (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Production Asset Suite</h3>
            </div>
            <button class="tool-btn primary" id="fav-download-zip-btn" style="font-size: 11px; padding: 4px 14px;" disabled>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download ZIP Package</span>
            </button>
          </div>

          <!-- Empty State -->
          <div id="fav-empty-state" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 260px; text-align: center; border: 1px dashed var(--border-color); border-radius: 8px; background: rgba(0,0,0,0.15); padding: 20px;">
            <div style="margin-bottom: 8px; color: var(--accent-cyan); display: flex; justify-content: center;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="28" height="28"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"></path></svg>
            </div>
            <div style="font-size: 13px; font-weight: 600; color: var(--text-muted);">No assets compiled yet</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Upload your logo on the left to compile the full favicon suite.</div>
          </div>

          <!-- Output Files List -->
          <div id="fav-files-list" style="display: none; flex-direction: column; gap: 8px; max-height: 240px; overflow-y: auto; padding-right: 4px; margin-bottom: 16px;">
            <!-- Rendered icon rows with direct download buttons -->
          </div>

          <!-- Ready HTML Header Tags -->
          <div id="fav-html-code-panel" style="display: none; border-top: 1px solid var(--border-color); padding-top: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase;">HTML &lt;head&gt; Code</label>
              <button class="tool-btn secondary" id="fav-copy-html-btn" style="font-size: 10px; padding: 2px 8px;">Copy Tags</button>
            </div>
            <textarea id="fav-html-output" class="input-textarea" style="width: 100%; height: 110px; font-family: var(--font-mono); font-size: 11px; padding: 10px; background: rgba(0,0,0,0.3); border-color: var(--border-color); color: var(--text-main); resize: none; white-space: pre;" readonly></textarea>
          </div>
        </div>
      
        <!-- Standard Canonical Tool Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: How to Generate Favicons & App Icons</span>
            </div>
            <div class="tool-guide-badge">Multi-Platform Package</div>
          </div>

          <div class="tool-guide-steps">
            
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Upload Master Artwork</h4>
                <p>Drop a high-resolution PNG, SVG, or JPG logo into the canvas stage.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Customize Shape & Background</h4>
                <p>Choose square, rounded, circular, or transparent padding with custom hex colors.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Preview Multi-Platform Mockups</h4>
                <p>View real-time browser tab, iOS home screen, Android app, and Windows tile mockups.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">4</div>
              <div class="tool-step-content">
                <h4>Download ZIP & Embed HTML</h4>
                <p>Download the complete multi-resolution asset bundle and copy production <head> link tags.</p>
              </div>
            </div>
            
          </div>
        </div>
  </div>
    `;
  },

  async init(container, appInstance) {
    let sourceImage = null;
    let iconShape = "square";
    let bgMode = "transparent";
    let paddingPercent = 0;
    let jszipLoadingPromise = null;

    const dropzone = container.querySelector("#fav-dropzone");
    const fileInput = container.querySelector("#fav-file-input");
    const controls = container.querySelector("#fav-customizer-controls");
    const resetBtn = container.querySelector("#fav-reset-btn");
    const emptyState = container.querySelector("#fav-empty-state");
    const filesList = container.querySelector("#fav-files-list");
    const htmlCodePanel = container.querySelector("#fav-html-code-panel");
    const htmlOutput = container.querySelector("#fav-html-output");
    const copyHtmlBtn = container.querySelector("#fav-copy-html-btn");
    const downloadZipBtn = container.querySelector("#fav-download-zip-btn");

    const bgPresetSelect = container.querySelector("#fav-bg-preset");
    const bgColorPicker = container.querySelector("#fav-bg-color-picker");
    const paddingSlider = container.querySelector("#fav-padding-slider");
    const paddingVal = container.querySelector("#fav-padding-val");

    const tab16Canvas = container.querySelector("#fav-preview-tab-16");
    const home52Canvas = container.querySelector("#fav-preview-home-52");
    const prev32Canvas = container.querySelector("#fav-preview-32");

    const loadJSZip = () => {
      if (jszipLoadingPromise) return jszipLoadingPromise;
      jszipLoadingPromise = new Promise((resolve, reject) => {
        if (window.JSZip) {
          resolve(window.JSZip);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
        script.onload = () => resolve(window.JSZip);
        script.onerror = () => {
          jszipLoadingPromise = null;
          reject(new Error("Failed to load JSZip"));
        };
        document.head.appendChild(script);
      });
      return jszipLoadingPromise;
    };

    dropzone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleUpload(e.target.files[0]);
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
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleUpload(e.dataTransfer.files[0]);
      }
    });

    resetBtn.addEventListener("click", () => {
      sourceImage = null;
      dropzone.style.display = "flex";
      controls.style.display = "none";
      resetBtn.style.display = "none";
      emptyState.style.display = "flex";
      filesList.style.display = "none";
      htmlCodePanel.style.display = "none";
      downloadZipBtn.disabled = true;
      fileInput.value = "";
    });

    function handleUpload(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          sourceImage = img;
          dropzone.style.display = "none";
          controls.style.display = "flex";
          resetBtn.style.display = "inline-flex";
          generateSuite();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    // Shape toggles
    container.querySelectorAll(".fav-shape-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".fav-shape-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        iconShape = btn.dataset.shape;
        if (sourceImage) generateSuite();
      });
    });

    // Background color
    bgPresetSelect.addEventListener("change", (e) => {
      if (e.target.value === "custom") {
        bgColorPicker.style.display = "inline-block";
        bgMode = bgColorPicker.value;
      } else {
        bgColorPicker.style.display = "none";
        bgMode = e.target.value;
      }
      if (sourceImage) generateSuite();
    });

    bgColorPicker.addEventListener("input", (e) => {
      bgMode = e.target.value;
      if (sourceImage) generateSuite();
    });

    // Padding slider
    paddingSlider.addEventListener("input", (e) => {
      paddingPercent = parseInt(e.target.value, 10);
      paddingVal.innerText = `${paddingPercent}%`;
      if (sourceImage) generateSuite();
    });

    // Rendering Canvas Helper for a specific size
    function renderIconCanvas(size) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, size, size);

      // Handle clipping for shapes
      if (iconShape === "circle") {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
      } else if (iconShape === "rounded") {
        const radius = size * 0.22;
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(size - radius, 0);
        ctx.quadraticCurveTo(size, 0, size, radius);
        ctx.lineTo(size, size - radius);
        ctx.quadraticCurveTo(size, size, size - radius, size);
        ctx.lineTo(radius, size);
        ctx.quadraticCurveTo(0, size, 0, size - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.closePath();
        ctx.clip();
      }

      // Draw background fill if not transparent
      if (bgMode !== "transparent") {
        ctx.fillStyle = bgMode;
        ctx.fillRect(0, 0, size, size);
      }

      // Draw image with padding
      if (sourceImage) {
        const padPx = (size * (paddingPercent / 100));
        const drawSize = size - (padPx * 2);

        // Aspect ratio handling: fit inside square
        const imgAspect = sourceImage.width / sourceImage.height;
        let w = drawSize;
        let h = drawSize;

        if (imgAspect > 1) {
          h = drawSize / imgAspect;
        } else {
          w = drawSize * imgAspect;
        }

        const x = padPx + (drawSize - w) / 2;
        const y = padPx + (drawSize - h) / 2;

        ctx.drawImage(sourceImage, x, y, w, h);
      }

      return canvas;
    }

    // Binary ICO Creator from PNG canvas data
    function createIcoBlob(pngBlob16, pngBlob32) {
      return Promise.all([pngBlob16.arrayBuffer(), pngBlob32.arrayBuffer()]).then(([buf16, buf32]) => {
        // Construct standard Windows ICO binary format
        const numImages = 2;
        const headerSize = 6;
        const dirEntrySize = 16;
        const dataOffset16 = headerSize + (dirEntrySize * numImages);
        const dataOffset32 = dataOffset16 + buf16.byteLength;
        const totalSize = dataOffset32 + buf32.byteLength;

        const buffer = new ArrayBuffer(totalSize);
        const view = new DataView(buffer);

        // 1. ICONDIR Header
        view.setUint16(0, 0, true); // Reserved
        view.setUint16(2, 1, true); // Type: 1 = ICO
        view.setUint16(4, numImages, true); // Count

        // 2. ICONDIRENTRY #1 (16x16)
        view.setUint8(6, 16); // Width
        view.setUint8(7, 16); // Height
        view.setUint8(8, 0); // Palette count
        view.setUint8(9, 0); // Reserved
        view.setUint16(10, 1, true); // Color planes
        view.setUint16(12, 32, true); // Bits per pixel
        view.setUint32(14, buf16.byteLength, true); // Size
        view.setUint32(18, dataOffset16, true); // Offset

        // 3. ICONDIRENTRY #2 (32x32)
        view.setUint8(22, 32); // Width
        view.setUint8(23, 32); // Height
        view.setUint8(24, 0);
        view.setUint8(25, 0);
        view.setUint16(26, 1, true);
        view.setUint16(28, 32, true);
        view.setUint32(30, buf32.byteLength, true);
        view.setUint32(34, dataOffset32, true);

        // 4. Copy PNG Data
        new Uint8Array(buffer, dataOffset16, buf16.byteLength).set(new Uint8Array(buf16));
        new Uint8Array(buffer, dataOffset32, buf32.byteLength).set(new Uint8Array(buf32));

        return new Blob([buffer], { type: "image/x-icon" });
      });
    }

    async function generateSuite() {
      emptyState.style.display = "none";
      filesList.style.display = "flex";
      htmlCodePanel.style.display = "block";
      downloadZipBtn.disabled = false;

      // Update previews
      const c16 = renderIconCanvas(16);
      tab16Canvas.getContext("2d").clearRect(0, 0, 16, 16);
      tab16Canvas.getContext("2d").drawImage(c16, 0, 0);

      const c52 = renderIconCanvas(52);
      home52Canvas.getContext("2d").clearRect(0, 0, 52, 52);
      home52Canvas.getContext("2d").drawImage(c52, 0, 0);

      const c32 = renderIconCanvas(32);
      prev32Canvas.getContext("2d").clearRect(0, 0, 32, 32);
      prev32Canvas.getContext("2d").drawImage(c32, 0, 0);

      // Render suite items
      filesList.innerHTML = "";

      const assets = [
        { name: "favicon.ico", desc: "Multi-size 16x16 & 32x32 legacy ICO icon", size: 32, isIco: true },
        { name: "favicon-16x16.png", desc: "Classic browser tab display", size: 16 },
        { name: "favicon-32x32.png", desc: "Retina browser tab display", size: 32 },
        { name: "apple-touch-icon.png", desc: "iOS Home Screen & Safari bookmarks (180x180)", size: 180 },
        { name: "android-chrome-192x192.png", desc: "Android PWA medium launcher icon", size: 192 },
        { name: "android-chrome-512x512.png", desc: "Android PWA splash & HD launcher icon", size: 512 }
      ];

      assets.forEach(asset => {
        const row = document.createElement("div");
        row.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-radius: 8px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color);";

        row.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 28px; height: 28px; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
              <canvas class="row-preview-canvas" width="28" height="28" style="width: 28px; height: 28px;"></canvas>
            </div>
            <div>
              <div style="font-family: var(--font-mono); font-weight: 700; font-size: 12.5px; color: var(--text-main);">${asset.name}</div>
              <div style="font-size: 10.5px; color: var(--text-muted);">${asset.desc}</div>
            </div>
          </div>
          <button class="tool-btn secondary download-single-btn" data-filename="${asset.name}" style="font-size: 11px; padding: 3px 10px;">Download</button>
        `;

        const rowCanvas = row.querySelector(".row-preview-canvas");
        const rendered = renderIconCanvas(28);
        rowCanvas.getContext("2d").drawImage(rendered, 0, 0);

        row.querySelector(".download-single-btn").addEventListener("click", async () => {
          if (asset.isIco) {
            const blob16 = await new Promise(r => renderIconCanvas(16).toBlob(r, "image/png"));
            const blob32 = await new Promise(r => renderIconCanvas(32).toBlob(r, "image/png"));
            const icoBlob = await createIcoBlob(blob16, blob32);
            triggerDownload(icoBlob, "favicon.ico");
          } else {
            const canvas = renderIconCanvas(asset.size);
            canvas.toBlob(blob => {
              triggerDownload(blob, asset.name);
            }, "image/png");
          }
        });

        filesList.appendChild(row);
      });

      // Update HTML Code
      htmlOutput.value = `<!-- Standard Favicons -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">

<!-- Apple Touch Icon (iOS) -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Android / PWA Icons -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="${bgMode === 'transparent' ? '#00f2fe' : bgMode}">`;
    }

    function triggerDownload(blob, filename) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      appInstance.showToast(`Downloaded ${filename}!`, "success");
    }

    copyHtmlBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(htmlOutput.value).then(() => {
        appInstance.showToast("Favicon HTML tags copied!", "success");
      });
    });

    // Download ZIP Bundle
    downloadZipBtn.addEventListener("click", async () => {
      try {
        downloadZipBtn.disabled = true;
        downloadZipBtn.innerText = "Creating ZIP...";
        const JSZip = await loadJSZip();
        const zip = new JSZip();

        // 1. Generate ICO
        const blob16 = await new Promise(r => renderIconCanvas(16).toBlob(r, "image/png"));
        const blob32 = await new Promise(r => renderIconCanvas(32).toBlob(r, "image/png"));
        const icoBlob = await createIcoBlob(blob16, blob32);
        zip.file("favicon.ico", icoBlob);

        // 2. Generate PNGs
        const sizes = [
          { name: "favicon-16x16.png", size: 16 },
          { name: "favicon-32x32.png", size: 32 },
          { name: "apple-touch-icon.png", size: 180 },
          { name: "android-chrome-192x192.png", size: 192 },
          { name: "android-chrome-512x512.png", size: 512 }
        ];

        for (const item of sizes) {
          const blob = await new Promise(r => renderIconCanvas(item.size).toBlob(r, "image/png"));
          zip.file(item.name, blob);
        }

        // 3. Add HTML tags & manifest
        zip.file("html-head-tags.html", htmlOutput.value);
        zip.file("manifest.json", JSON.stringify({
          name: "My App",
          short_name: "App",
          icons: [
            { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
            { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
          ],
          theme_color: bgMode === 'transparent' ? '#00f2fe' : bgMode,
          background_color: "#0f172a",
          display: "standalone"
        }, null, 2));

        const zipBlob = await zip.generateAsync({ type: "blob" });
        triggerDownload(zipBlob, "favicon-suite.zip");
        appInstance.showToast("Favicon ZIP bundle downloaded!", "success");
      } catch (err) {
        appInstance.showToast("ZIP generation error: " + err.message, "error");
      } finally {
        downloadZipBtn.disabled = false;
        downloadZipBtn.innerText = "Download ZIP Package";
      }
    });
  }
};
