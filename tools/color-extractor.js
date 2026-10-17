// OmniTool Hub - Color Palette Extractor from Image
// 100% Client-Side Color Quantization & Eyedropper Suite

import { escapeHtml } from './utils.js';

export default {
  id: "color-extractor",
  name: "Color Palette Extractor",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Image & Eyedropper Workspace (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Source Image &amp; Eyedropper</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Extract dominant color schemes or sample exact pixel colors from photos.
              </p>
            </div>
            <button class="tool-btn secondary" id="ce-clear-btn" style="font-size: 11px; padding: 4px 10px; display: none;">Clear Image</button>
          </div>

          <!-- Dropzone -->
          <div id="ce-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 220px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 44px; height: 44px; color: var(--accent-cyan); margin-bottom: 12px;">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              <path d="M2 12h20"></path>
            </svg>
            <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              Drop photo / graphic here, browse, or press <kbd style="background: rgba(255,255,255,0.1); border: 1px solid var(--border-color); border-radius: 4px; padding: 1px 6px; font-size: 11px; font-family: var(--font-mono);">Ctrl + V</kbd>
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              PNG, JPG, WebP, SVG, and GIF supported.
            </div>
            <input type="file" id="ce-file-input" accept="image/*" style="display: none;">
          </div>

          <!-- Image Canvas & Live Eyedropper Magnifier -->
          <div id="ce-canvas-wrapper" style="display: none; position: relative; margin-top: 10px; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; background: #000; text-align: center;">
            <canvas id="ce-image-canvas" style="max-width: 100%; max-height: 320px; display: block; margin: 0 auto; cursor: crosshair;"></canvas>
            
            <!-- Floating Eyedropper Tooltip -->
            <div id="ce-eyedropper-badge" style="display: none; position: absolute; pointer-events: none; background: rgba(10, 15, 30, 0.9); border: 2px solid #00f2fe; border-radius: 20px; padding: 3px 10px; font-size: 11px; font-family: var(--font-mono); font-weight: bold; color: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.5); transform: translate(-50%, -140%); z-index: 20; white-space: nowrap;">
              <span id="ce-eyedropper-color-dot" style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; margin-right: 5px; vertical-align: middle;"></span>
              <span id="ce-eyedropper-hex">#000000</span>
            </div>
          </div>

          <!-- Controls under Canvas -->
          <div id="ce-controls-bar" style="display: none; margin-top: 14px; gap: 12px; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Palette Swatches Count</label>
              <div style="display: flex; align-items: center; gap: 8px;">
                <input type="range" id="ce-color-count" min="3" max="10" value="6" style="width: 120px; accent-color: var(--accent-cyan);">
                <span id="ce-color-count-label" style="font-size: 12px; font-weight: bold; color: var(--accent-cyan); width: 24px;">6</span>
              </div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">
              💡 <em>Click anywhere on the image above with the crosshair cursor to add specific sampled colors.</em>
            </div>
          </div>
        </div>

        <!-- Extracted Palette Swatches & Export (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Extracted Color Palette</h3>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="tool-btn secondary" id="ce-export-image-btn" style="font-size: 11px; padding: 4px 10px;" disabled>
                <span>Export PNG</span>
              </button>
              <button class="tool-btn primary" id="ce-open-colorlab-btn" style="font-size: 11px; padding: 4px 12px;" disabled>
                <span>Open in Color Lab ↗</span>
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div id="ce-empty-state" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 260px; text-align: center; border: 1px dashed var(--border-color); border-radius: 8px; background: rgba(0,0,0,0.15); padding: 20px;">
            <div style="font-size: 28px; margin-bottom: 8px;">🎨</div>
            <div style="font-size: 13px; font-weight: 600; color: var(--text-muted);">No palette extracted yet</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Upload an image on the left to generate harmonious swatches.</div>
          </div>

          <!-- Dynamic Swatch Cards Grid -->
          <div id="ce-swatches-grid" style="display: none; flex-direction: column; gap: 8px; max-height: 280px; overflow-y: auto; padding-right: 4px; margin-bottom: 16px;">
            <!-- Swatch rows dynamically injected -->
          </div>

          <!-- Export Formats Panel -->
          <div id="ce-export-panel" style="display: none; border-top: 1px solid var(--border-color); padding-top: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Export Code Snippet</label>
              <div style="display: flex; gap: 4px;">
                <button class="tool-btn secondary ce-snippet-tab active" data-type="css" style="font-size: 10px; padding: 2px 8px;">CSS</button>
                <button class="tool-btn secondary ce-snippet-tab" data-type="tailwind" style="font-size: 10px; padding: 2px 8px;">Tailwind</button>
                <button class="tool-btn secondary ce-snippet-tab" data-type="json" style="font-size: 10px; padding: 2px 8px;">JSON</button>
              </div>
            </div>
            <div style="position: relative;">
              <textarea id="ce-snippet-output" class="input-textarea" style="width: 100%; height: 90px; font-family: var(--font-mono); font-size: 11.5px; padding: 8px; background: rgba(0,0,0,0.25); border-color: var(--border-color); color: var(--accent-cyan); resize: none;" readonly></textarea>
              <button class="tool-btn secondary" id="ce-copy-snippet-btn" style="position: absolute; top: 6px; right: 6px; font-size: 10px; padding: 2px 8px;">Copy</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
    let currentImage = null;
    let extractedColors = [];
    let customColors = [];
    let activeSnippetType = "css";

    const dropzone = container.querySelector("#ce-dropzone");
    const fileInput = container.querySelector("#ce-file-input");
    const canvasWrapper = container.querySelector("#ce-canvas-wrapper");
    const imageCanvas = container.querySelector("#ce-image-canvas");
    const controlsBar = container.querySelector("#ce-controls-bar");
    const clearBtn = container.querySelector("#ce-clear-btn");
    const colorCountSlider = container.querySelector("#ce-color-count");
    const colorCountLabel = container.querySelector("#ce-color-count-label");

    const eyedropperBadge = container.querySelector("#ce-eyedropper-badge");
    const eyedropperColorDot = container.querySelector("#ce-eyedropper-color-dot");
    const eyedropperHex = container.querySelector("#ce-eyedropper-hex");

    const emptyState = container.querySelector("#ce-empty-state");
    const swatchesGrid = container.querySelector("#ce-swatches-grid");
    const exportPanel = container.querySelector("#ce-export-panel");
    const snippetOutput = container.querySelector("#ce-snippet-output");
    const copySnippetBtn = container.querySelector("#ce-copy-snippet-btn");
    const exportImageBtn = container.querySelector("#ce-export-image-btn");
    const openColorLabBtn = container.querySelector("#ce-open-colorlab-btn");

    dropzone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        loadImage(e.target.files[0]);
      }
    });

    // Drag-and-drop
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
        loadImage(e.dataTransfer.files[0]);
      }
    });

    // Paste listener
    const pasteListener = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          if (file) {
            loadImage(file);
            appInstance.showToast("Pasted image for color extraction!", "info");
            break;
          }
        }
      }
    };
    window.addEventListener("paste", pasteListener);
    this._pasteListener = pasteListener;

    clearBtn.addEventListener("click", () => {
      currentImage = null;
      extractedColors = [];
      customColors = [];
      dropzone.style.display = "flex";
      canvasWrapper.style.display = "none";
      controlsBar.style.display = "none";
      clearBtn.style.display = "none";
      emptyState.style.display = "flex";
      swatchesGrid.style.display = "none";
      exportPanel.style.display = "none";
      exportImageBtn.disabled = true;
      openColorLabBtn.disabled = true;
      fileInput.value = "";
    });

    colorCountSlider.addEventListener("input", () => {
      colorCountLabel.innerText = colorCountSlider.value;
      if (currentImage) {
        processExtraction();
      }
    });

    function loadImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          currentImage = img;
          dropzone.style.display = "none";
          canvasWrapper.style.display = "block";
          controlsBar.style.display = "flex";
          clearBtn.style.display = "inline-flex";

          imageCanvas.width = img.width;
          imageCanvas.height = img.height;
          const ctx = imageCanvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          processExtraction();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    // Color Quantization Algorithm (Median Cut / Frequency clustering)
    function processExtraction() {
      if (!currentImage) return;

      const targetCount = parseInt(colorCountSlider.value, 10);
      const ctx = imageCanvas.getContext("2d");

      // Downsample to 120x120 for instant calculation
      const thumbCanvas = document.createElement("canvas");
      const thumbSize = 100;
      thumbCanvas.width = thumbSize;
      thumbCanvas.height = thumbSize;
      const thumbCtx = thumbCanvas.getContext("2d");
      thumbCtx.drawImage(currentImage, 0, 0, thumbSize, thumbSize);

      const imgData = thumbCtx.getImageData(0, 0, thumbSize, thumbSize).data;
      const pixelCount = thumbSize * thumbSize;

      // Group into color bins with reduced bit depth
      const colorMap = {};
      for (let i = 0; i < pixelCount; i += 2) { // step by 2 for speed
        const offset = i * 4;
        const a = imgData[offset + 3];
        if (a < 128) continue; // skip transparent

        // Round RGB to nearest multiples of 16 to group similar tones
        const r = Math.round(imgData[offset] / 16) * 16;
        const g = Math.round(imgData[offset + 1] / 16) * 16;
        const b = Math.round(imgData[offset + 2] / 16) * 16;

        const key = `${r},${g},${b}`;
        colorMap[key] = (colorMap[key] || 0) + 1;
      }

      // Sort by frequency
      const sortedTones = Object.keys(colorMap).sort((a, b) => colorMap[b] - colorMap[a]);

      // Select diverse colors with color-distance threshold
      const selected = [];
      const colorDistance = (c1, c2) => {
        return Math.sqrt(
          Math.pow(c1[0] - c2[0], 2) +
          Math.pow(c1[1] - c2[1], 2) +
          Math.pow(c1[2] - c2[2], 2)
        );
      };

      for (const toneStr of sortedTones) {
        const rgb = toneStr.split(",").map(Number);
        const tooClose = selected.some(s => colorDistance(s, rgb) < 45);
        if (!tooClose) {
          selected.push(rgb);
          if (selected.length >= targetCount) break;
        }
      }

      // Convert to HEX & HSL
      extractedColors = selected.map(rgb => {
        const r = Math.min(255, Math.max(0, rgb[0]));
        const g = Math.min(255, Math.max(0, rgb[1]));
        const b = Math.min(255, Math.max(0, rgb[2]));

        const hex = "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("").toUpperCase();
        const hsl = rgbToHsl(r, g, b);
        const contrast = getContrastRatio(r, g, b);

        return { hex, rgb: `rgb(${r}, ${g}, ${b})`, hsl, contrast };
      });

      renderSwatches();
    }

    function rgbToHsl(r, g, b) {
      r /= 255; g /= 255; b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    }

    function getContrastRatio(r, g, b) {
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return lum > 0.5 ? "Dark Text" : "Light Text";
    }

    function renderSwatches() {
      emptyState.style.display = "none";
      swatchesGrid.style.display = "flex";
      exportPanel.style.display = "block";
      exportImageBtn.disabled = false;
      openColorLabBtn.disabled = false;

      swatchesGrid.innerHTML = "";

      const allPalette = [...customColors, ...extractedColors];

      allPalette.forEach((item, idx) => {
        const card = document.createElement("div");
        card.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 6px 10px; border-radius: 8px; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); gap: 10px;";

        card.innerHTML = `
          <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
            <div style="width: 36px; height: 36px; border-radius: 6px; background: ${item.hex}; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 2px 6px rgba(0,0,0,0.3); shrink-0;"></div>
            <div>
              <div style="font-family: var(--font-mono); font-weight: 700; font-size: 13px; color: var(--text-main);">${item.hex}</div>
              <div style="font-size: 10.5px; color: var(--text-muted); font-family: var(--font-mono);">${item.rgb}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.06); color: var(--text-muted);">${item.contrast}</span>
            <button class="tool-btn secondary copy-swatch-btn" data-hex="${item.hex}" style="font-size: 10.5px; padding: 3px 8px; height: 26px;">Copy</button>
          </div>
        `;
        swatchesGrid.appendChild(card);
      });

      swatchesGrid.querySelectorAll(".copy-swatch-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          navigator.clipboard.writeText(btn.dataset.hex).then(() => {
            appInstance.showToast(`Copied ${btn.dataset.hex} to clipboard!`, "success");
          });
        });
      });

      updateSnippetCode();
    }

    // Eyedropper hover on canvas
    imageCanvas.addEventListener("mousemove", (e) => {
      if (!currentImage) return;
      const rect = imageCanvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) * (imageCanvas.width / rect.width));
      const y = Math.floor((e.clientY - rect.top) * (imageCanvas.height / rect.height));

      const ctx = imageCanvas.getContext("2d");
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = "#" + [pixel[0], pixel[1], pixel[2]].map(val => val.toString(16).padStart(2, "0")).join("").toUpperCase();

      eyedropperBadge.style.left = `${e.clientX - rect.left}px`;
      eyedropperBadge.style.top = `${e.clientY - rect.top}px`;
      eyedropperColorDot.style.background = hex;
      eyedropperHex.innerText = hex;
      eyedropperBadge.style.display = "block";
    });

    imageCanvas.addEventListener("mouseleave", () => {
      eyedropperBadge.style.display = "none";
    });

    // Click to sample color with Eyedropper
    imageCanvas.addEventListener("click", (e) => {
      if (!currentImage) return;
      const rect = imageCanvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) * (imageCanvas.width / rect.width));
      const y = Math.floor((e.clientY - rect.top) * (imageCanvas.height / rect.height));

      const ctx = imageCanvas.getContext("2d");
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const r = pixel[0], g = pixel[1], b = pixel[2];
      const hex = "#" + [r, g, b].map(val => val.toString(16).padStart(2, "0")).join("").toUpperCase();

      customColors.unshift({
        hex,
        rgb: `rgb(${r}, ${g}, ${b})`,
        hsl: rgbToHsl(r, g, b),
        contrast: getContrastRatio(r, g, b)
      });

      renderSwatches();
      appInstance.showToast(`Sampled ${hex} and added to palette!`, "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    // Snippet updates
    container.querySelectorAll(".ce-snippet-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        container.querySelectorAll(".ce-snippet-tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        activeSnippetType = tab.dataset.type;
        updateSnippetCode();
      });
    });

    function updateSnippetCode() {
      const all = [...customColors, ...extractedColors];
      if (all.length === 0) return;

      if (activeSnippetType === "css") {
        snippetOutput.value = ":root {\n" + all.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join("\n") + "\n}";
      } else if (activeSnippetType === "tailwind") {
        const obj = {};
        all.forEach((c, i) => { obj[`brand-${i + 1}`] = c.hex; });
        snippetOutput.value = "colors: " + JSON.stringify(obj, null, 2);
      } else if (activeSnippetType === "json") {
        snippetOutput.value = JSON.stringify(all.map(c => c.hex), null, 2);
      }
    }

    copySnippetBtn.addEventListener("click", () => {
      if (!snippetOutput.value) return;
      navigator.clipboard.writeText(snippetOutput.value).then(() => {
        appInstance.showToast("Copied palette code snippet!", "success");
      });
    });

    // Export Palette as PNG Strip
    exportImageBtn.addEventListener("click", () => {
      const all = [...customColors, ...extractedColors];
      if (all.length === 0) return;

      const exportCanvas = document.createElement("canvas");
      const blockWidth = 140;
      const height = 180;
      exportCanvas.width = blockWidth * all.length;
      exportCanvas.height = height;
      const ctx = exportCanvas.getContext("2d");

      all.forEach((item, i) => {
        ctx.fillStyle = item.hex;
        ctx.fillRect(i * blockWidth, 0, blockWidth, height - 50);

        ctx.fillStyle = "#0c1017";
        ctx.fillRect(i * blockWidth, height - 50, blockWidth, 50);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 14px monospace";
        ctx.textAlign = "center";
        ctx.fillText(item.hex, i * blockWidth + blockWidth / 2, height - 20);
      });

      const a = document.createElement("a");
      a.href = exportCanvas.toDataURL("image/png");
      a.download = "color-palette.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      appInstance.showToast("Downloaded color-palette.png!", "success");
    });

    // Open directly in existing Color Lab tool!
    openColorLabBtn.addEventListener("click", () => {
      const all = [...customColors, ...extractedColors];
      if (all.length === 0) return;
      try {
        localStorage.setItem("omnitool_external_palette", JSON.stringify(all.map(c => c.hex)));
        appInstance.navigateToTool("color-lab");
        appInstance.showToast("Imported extracted palette into Color Lab!", "success");
      } catch (e) {
        appInstance.navigateToTool("color-lab");
      }
    });
  },

  cleanup() {
    if (this._pasteListener) {
      window.removeEventListener("paste", this._pasteListener);
    }
  }
};
