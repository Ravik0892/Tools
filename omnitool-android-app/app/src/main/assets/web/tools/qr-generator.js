// Standalone Offline QR Code Generator Module for OmniTool Hub
// Contains a self-contained minimal QR Code matrix compiler.

// --- SELF-CONTAINED COMPACT QR CODE GENERATOR (QRCode) ---
const QRCode = (() => {
  // Minimal QR code implementation
  const PAD0 = 0xec;
  const PAD1 = 0x11;

  function QRPolynomial(num, shift) {
    if (num.length === undefined) throw new Error(num.length + "/" + shift);
    let offset = 0;
    while (offset < num.length && num[offset] === 0) {
      offset++;
    }
    this.num = new Int32Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i++) {
      this.num[i] = num[offset + i];
    }
  }
  QRPolynomial.prototype = {
    getAt(index) { return this.num[index]; },
    getLength() { return this.num.length; },
    multiply(e) {
      const num = new Int32Array(this.getLength() + e.getLength() - 1);
      for (let i = 0; i < this.getLength(); i++) {
        for (let j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.getAt(i)) + QRMath.glog(e.getAt(j)));
        }
      }
      return new QRPolynomial(num, 0);
    },
    mod(e) {
      if (this.getLength() - e.getLength() < 0) return this;
      const ratio = QRMath.glog(this.getAt(0)) - QRMath.glog(e.getAt(0));
      const num = new Int32Array(this.getLength());
      for (let i = 0; i < this.getLength(); i++) {
        num[i] = this.getAt(i);
      }
      for (let i = 0; i < e.getLength(); i++) {
        num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
      }
      return new QRPolynomial(num, 0).mod(e);
    }
  };

  const QRMath = {
    glog(n) {
      if (n < 1) return 0;
      return LOG_TABLE[n];
    },
    gexp(n) {
      while (n < 0) n += 255;
      while (n >= 255) n -= 255;
      return EXP_TABLE[n];
    }
  };

  const EXP_TABLE = new Int32Array(256);
  const LOG_TABLE = new Int32Array(256);
  for (let i = 0; i < 8; i++) EXP_TABLE[i] = 1 << i;
  for (let i = 8; i < 256; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
  }
  for (let i = 0; i < 255; i++) LOG_TABLE[EXP_TABLE[i]] = i;

  // RS Block Table
  const RS_BLOCK_TABLE = [
    // L, M, Q, H
    [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], // Version 1
    [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], // Version 2
    [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], // Version 3
    [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], // Version 4
    [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12] // Version 5
  ];

  function getRSBlocks(version, errorCorrectionLevel) {
    const ec = { L: 0, M: 1, Q: 2, H: 3 }[errorCorrectionLevel];
    const offset = (version - 1) * 4 + ec;
    const blockData = RS_BLOCK_TABLE[offset];
    const list = [];
    if (blockData.length === 3) {
      const [count, total, data] = blockData;
      for (let i = 0; i < count; i++) list.push({ totalCount: total, dataCount: data });
    } else {
      const [c1, t1, d1, c2, t2, d2] = blockData;
      for (let i = 0; i < c1; i++) list.push({ totalCount: t1, dataCount: d1 });
      for (let i = 0; i < c2; i++) list.push({ totalCount: t2, dataCount: d2 });
    }
    return list;
  }

  function createData(version, ecLevel, text) {
    const rsBlocks = getRSBlocks(version, ecLevel);
    const buffer = [];
    
    // Mode indicator: Byte mode (0100)
    buffer.push(4); // Mode byte is 4 (binary 0100)
    
    // Character count indicator (assuming byte count)
    const bytes = new TextEncoder().encode(text);
    const count = bytes.length;
    buffer.push((count >> 8) & 0xff);
    buffer.push(count & 0xff);

    // Data bits
    for (let i = 0; i < count; i++) {
      buffer.push(bytes[i]);
    }

    // Calculate total data bits cap
    let totalDataCount = 0;
    rsBlocks.forEach(b => totalDataCount += b.dataCount);

    // Padding
    const dataBytes = new Uint8Array(totalDataCount);
    // Write header
    dataBytes[0] = 0x40; // Byte mode binary start
    dataBytes[1] = count; // Byte size
    for (let i = 0; i < count; i++) {
      if (i + 2 < totalDataCount) dataBytes[i + 2] = bytes[i];
    }
    
    // Fill remaining bytes with alternating pad bytes
    let padSelect = false;
    for (let i = count + 2; i < totalDataCount; i++) {
      dataBytes[i] = padSelect ? PAD1 : PAD0;
      padSelect = !padSelect;
    }

    // RS Code block calculation
    const totalBlocks = rsBlocks.length;
    const rsPoly = getErrorCorrectionPolynomial(rsBlocks[0].totalCount - rsBlocks[0].dataCount);
    
    const blockDataList = [];
    let byteOffset = 0;
    for (let b = 0; b < totalBlocks; b++) {
      const block = rsBlocks[b];
      const data = new Int32Array(block.dataCount);
      for (let i = 0; i < block.dataCount; i++) {
        data[i] = dataBytes[byteOffset + i];
      }
      byteOffset += block.dataCount;
      
      const poly = new QRPolynomial(data, rsPoly.getLength() - 1);
      const modPoly = poly.mod(rsPoly);
      const ecLength = rsPoly.getLength() - 1;
      const ecc = new Int32Array(ecLength);
      const diff = ecLength - modPoly.getLength();
      for (let i = 0; i < modPoly.getLength(); i++) {
        ecc[diff + i] = modPoly.getAt(i);
      }
      blockDataList.push({ data, ecc });
    }

    // Interleave
    const finalData = [];
    let maxData = 0;
    let maxEcc = 0;
    blockDataList.forEach(b => {
      maxData = Math.max(maxData, b.data.length);
      maxEcc = Math.max(maxEcc, b.ecc.length);
    });

    for (let i = 0; i < maxData; i++) {
      for (let b = 0; b < totalBlocks; b++) {
        if (i < blockDataList[b].data.length) {
          finalData.push(blockDataList[b].data[i]);
        }
      }
    }
    for (let i = 0; i < maxEcc; i++) {
      for (let b = 0; b < totalBlocks; b++) {
        if (i < blockDataList[b].ecc.length) {
          finalData.push(blockDataList[b].ecc[i]);
        }
      }
    }

    return finalData;
  }

  function getErrorCorrectionPolynomial(eccLength) {
    let a = new QRPolynomial([1], 0);
    for (let i = 0; i < eccLength; i++) {
      a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  }

  return {
    generate(text, ecLevel = "H", forcedVersion = 4) {
      // Setup grid modules
      const version = forcedVersion;
      const size = version * 4 + 17;
      const modules = Array(size).fill(null).map(() => Array(size).fill(false));
      const reserved = Array(size).fill(null).map(() => Array(size).fill(false));

      // 1. Finder patterns (eyes)
      const drawFinder = (row, col) => {
        for (let r = -1; r <= 7; r++) {
          for (let c = -1; c <= 7; c++) {
            const tr = row + r;
            const tc = col + c;
            if (tr >= 0 && tr < size && tc >= 0 && tc < size) {
              reserved[tr][tc] = true;
              const isOuterBorder = (r === 0 || r === 6 || c === 0 || c === 6);
              const isInnerDot = (r >= 2 && r <= 4 && c >= 2 && c <= 4);
              if ((r >= 0 && r <= 6 && c >= 0 && c <= 6) && (isOuterBorder || isInnerDot)) {
                modules[tr][tc] = true;
              }
            }
          }
        }
      };
      drawFinder(0, 0);
      drawFinder(size - 7, 0);
      drawFinder(0, size - 7);

      // 2. Alignment patterns (version >= 2)
      const drawAlignment = (row, col) => {
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            const tr = row + r;
            const tc = col + c;
            reserved[tr][tc] = true;
            const isBorder = (Math.abs(r) === 2 || Math.abs(c) === 2);
            const isCenter = (r === 0 && c === 0);
            if (isBorder || isCenter) {
              modules[tr][tc] = true;
            }
          }
        }
      };
      if (version >= 2) {
        drawAlignment(size - 9, size - 9);
      }

      // 3. Timing patterns
      for (let i = 8; i < size - 8; i++) {
        const isBlack = (i % 2 === 0);
        modules[6][i] = isBlack;
        modules[i][6] = isBlack;
        reserved[6][i] = true;
        reserved[i][6] = true;
      }

      // 4. Dark module
      modules[4 * version + 9][8] = true;
      reserved[4 * version + 9][8] = true;

      // Compile data
      let data = [];
      try {
        data = createData(version, ecLevel, text);
      } catch (err) {
        // Fallback version bump
        return this.generate(text, ecLevel, Math.min(version + 1, 5));
      }

      // 5. Populate data with basic grid masking (mask 0)
      let byteIndex = 0;
      let bitIndex = 7;
      
      const evalMask = (r, c) => {
        // Mask pattern 0: (row + col) % 2 === 0
        return (r + c) % 2 === 0;
      };

      for (let c = size - 1; c > 0; c -= 2) {
        if (c === 6) c--; // Skip vertical timing line
        for (let r_dir = 0; r_dir < size; r_dir++) {
          const r = (c & 2) ? (size - 1 - r_dir) : r_dir; // alternate directions
          for (let colOffset = 0; colOffset < 2; colOffset++) {
            const col = c - colOffset;
            if (!reserved[r][col]) {
              let bit = false;
              if (byteIndex < data.length) {
                bit = ((data[byteIndex] >>> bitIndex) & 1) === 1;
              }
              // Apply mask
              const mask = evalMask(r, col);
              modules[r][col] = bit !== mask;
              
              bitIndex--;
              if (bitIndex < 0) {
                bitIndex = 7;
                byteIndex++;
              }
            }
          }
        }
      }

      return { size, modules };
    }
  };
})();

if (typeof window !== "undefined") {
  window.OmniQRCode = QRCode;
}

export { QRCode };

// --- EXPORT TOOL INTERFACE ---
export default {
  id: "qr-generator",
  name: "Dynamic QR Code Art Studio",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>QR Customizer</h3>
          </div>
          
          <div class="form-group">
            <label for="qr-text-input">QR Text or URL</label>
            <input type="text" id="qr-text-input" class="search-bar" style="width: 100%; border: 1px solid var(--border-color); font-size: 13px;" value="https://github.com" placeholder="Type text or paste URL to encode...">
          </div>

          <!-- Styling sliders -->
          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 14px;">
            <label for="qr-dot-style">Dot Patterns</label>
            <select id="qr-dot-style" class="form-select">
              <option value="square">Standard Cyber Squares</option>
              <option value="circle">Liquid Dots</option>
              <option value="rounded">Rounded Blocks</option>
              <option value="star">Cyber Stars</option>
            </select>
          </div>

          <div class="form-group">
            <label for="qr-eye-style">Eye/Finder Style</label>
            <select id="qr-eye-style" class="form-select">
              <option value="square">Square Frame</option>
              <option value="circle">Circular Eye</option>
              <option value="rounded">Rounded Cyber Bracket</option>
            </select>
          </div>

          <!-- Color settings -->
          <div class="form-group">
            <label>Color Mode</label>
            <div style="display: flex; gap: 8px; margin-bottom: 8px;">
              <label class="checkbox-label" style="margin: 0;">
                <input type="radio" name="qr-color-mode" value="solid" checked> Solid
              </label>
              <label class="checkbox-label" style="margin: 0;">
                <input type="radio" name="qr-color-mode" value="gradient"> Linear Gradient
              </label>
            </div>
            
            <div style="display: flex; gap: 10px;">
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Foreground Color</span>
                <input type="color" id="qr-color-fg" value="#f43f5e" style="border: none; width: 45px; height: 35px; cursor: pointer; background: transparent;">
              </div>
              
              <div id="qr-gradient-color-box" style="display: none; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Gradient Color 2</span>
                <input type="color" id="qr-color-fg2" value="#9d4edd" style="border: none; width: 45px; height: 35px; cursor: pointer; background: transparent;">
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Background Color</span>
                <input type="color" id="qr-color-bg" value="#09090b" style="border: none; width: 45px; height: 35px; cursor: pointer; background: transparent;">
              </div>
            </div>
          </div>

          <!-- Logo Upload -->
          <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 14px;">
            <label>Overlay Center Logo (Optional)</label>
            <div style="display: flex; gap: 10px; align-items: center; margin-top: 6px;">
              <input type="file" id="qr-logo-input" accept="image/*" style="display: none;">
              <button class="tool-btn secondary" id="qr-logo-upload-btn" style="font-size: 12px; padding: 6px 12px;">+ Upload Logo</button>
              <button class="tool-btn secondary" id="qr-logo-remove-btn" style="font-size: 12px; padding: 6px 12px; display: none; background: rgba(244,63,94,0.15); color: var(--accent-red); border-color: rgba(244,63,94,0.3);">Remove</button>
            </div>
            
            <div id="qr-logo-scale-box" style="display: none; margin-top: 10px;">
              <label style="font-size: 11px; color: var(--text-muted);">Logo Size Scale</label>
              <div class="slider-group">
                <input type="range" id="qr-logo-scale" class="slider-input" min="10" max="25" value="18">
                <span class="slider-val" id="qr-logo-scale-val">18%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="tool-panel">
          <div class="panel-header">
            <h3>Artistic Preview</h3>
          </div>
          
          <div style="display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(0,0,0,0.3); border-radius: 8px; min-height: 250px;">
            <div style="border: 2px solid var(--border-color); padding: 16px; border-radius: 12px; background: #09090b; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 30px rgba(0,0,0,0.5);">
              <canvas id="qr-canvas" width="300" height="300" style="max-width: 100%; height: auto; border-radius: 4px; display: block;"></canvas>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 18px;">
            <button class="tool-btn accent-emerald" id="qr-download-png">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14" style="margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Download PNG
            </button>
            <button class="tool-btn secondary" id="qr-download-svg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14" style="margin-right: 6px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg> Export SVG
            </button>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide &amp; Features</span>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Format Options</strong>: Add text or paste URLs. Select dot shapes (Standard, Liquid, Stars) to stylize patterns.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Apply Gradients &amp; Logos</strong>: Toggle gradient mode to paint the QR code matrix with linear transitions, and upload logo overlays securely.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>High Error Correction</strong>: The generator runs high error correction (EC Level: H) automatically, letting scanners decode the QR correctly even when obstructed by your uploaded center logo.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const textInput = container.querySelector("#qr-text-input");
    const dotStyle = container.querySelector("#qr-dot-style");
    const eyeStyle = container.querySelector("#qr-eye-style");
    
    const colorFg = container.querySelector("#qr-color-fg");
    const colorFg2 = container.querySelector("#qr-color-fg2");
    const colorBg = container.querySelector("#qr-color-bg");
    const gradientBox = container.querySelector("#qr-gradient-color-box");
    
    const logoInput = container.querySelector("#qr-logo-input");
    const logoUploadBtn = container.querySelector("#qr-logo-upload-btn");
    const logoRemoveBtn = container.querySelector("#qr-logo-remove-btn");
    const logoScaleBox = container.querySelector("#qr-logo-scale-box");
    const logoScaleSlider = container.querySelector("#qr-logo-scale");
    const logoScaleVal = container.querySelector("#qr-logo-scale-val");

    const canvas = container.querySelector("#qr-canvas");
    const ctx = canvas.getContext("2d");

    let uploadedLogo = null;

    // Handle Color Mode Radios
    const modeRadios = container.querySelectorAll("input[name='qr-color-mode']");
    modeRadios.forEach(radio => {
      radio.addEventListener("change", (e) => {
        if (e.target.value === "gradient") {
          gradientBox.style.display = "flex";
        } else {
          gradientBox.style.display = "none";
        }
        drawQRCode();
      });
    });

    // Slider for Logo Scale
    logoScaleSlider?.addEventListener("input", (e) => {
      logoScaleVal.innerText = `${e.target.value}%`;
      drawQRCode();
    });

    // Logo Upload Logic
    logoUploadBtn?.addEventListener("click", () => logoInput.click());
    logoInput?.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            uploadedLogo = img;
            logoRemoveBtn.style.display = "inline-block";
            logoScaleBox.style.display = "block";
            drawQRCode();
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    logoRemoveBtn?.addEventListener("click", () => {
      uploadedLogo = null;
      logoInput.value = "";
      logoRemoveBtn.style.display = "none";
      logoScaleBox.style.display = "none";
      drawQRCode();
    });

    // Draw main logic
    const drawQRCode = () => {
      const text = textInput.value || "https://github.com";
      const dots = dotStyle.value;
      const eye = eyeStyle.value;
      const isGrad = container.querySelector("input[name='qr-color-mode']:checked").value === "gradient";
      const fg1 = colorFg.value;
      const fg2 = colorFg2.value;
      const bg = colorBg.value;

      // Compile QR code matrix (forced version 4 to ensure enough space for logo overlays)
      const qrData = QRCode.generate(text, "H", 4);
      const mSize = qrData.size;
      const modules = qrData.modules;

      // Draw configs
      const size = 300;
      canvas.width = size;
      canvas.height = size;
      
      // Fill BG
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, size, size);

      const cell = size / mSize;

      // Helper function to check if cell is in a finder pattern
      const isEyeArea = (r, c) => {
        if (r < 7 && c < 7) return true; // Top-Left
        if (r < 7 && c >= mSize - 7) return true; // Top-Right
        if (r >= mSize - 7 && c < 7) return true; // Bottom-Left
        return false;
      };

      // Set foreground paint style
      if (isGrad) {
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, fg1);
        gradient.addColorStop(1, fg2);
        ctx.fillStyle = gradient;
      } else {
        ctx.fillStyle = fg1;
      }

      // Draw Modules
      for (let r = 0; r < mSize; r++) {
        for (let c = 0; c < mSize; c++) {
          if (modules[r][c]) {
            // Check eye areas vs dots
            if (isEyeArea(r, c)) {
              // Custom eye drawings will overlay this, skip drawing regular dots on eye pixels
              continue;
            }

            const x = c * cell;
            const y = r * cell;

            ctx.beginPath();
            if (dots === "circle") {
              ctx.arc(x + cell / 2, y + cell / 2, cell / 2.3, 0, Math.PI * 2);
              ctx.fill();
            } else if (dots === "rounded") {
              const rad = cell / 2.5;
              ctx.roundRect(x + 0.5, y + 0.5, cell - 1, cell - 1, rad);
              ctx.fill();
            } else if (dots === "star") {
              ctx.moveTo(x + cell / 2, y);
              ctx.lineTo(x + cell * 0.7, y + cell * 0.3);
              ctx.lineTo(x + cell, y + cell / 2);
              ctx.lineTo(x + cell * 0.7, y + cell * 0.7);
              ctx.lineTo(x + cell / 2, y + cell);
              ctx.lineTo(x + cell * 0.3, y + cell * 0.7);
              ctx.lineTo(x, y + cell / 2);
              ctx.lineTo(x + cell * 0.3, y + cell * 0.3);
              ctx.closePath();
              ctx.fill();
            } else {
              // Standard square
              ctx.fillRect(x, y, cell, cell);
            }
          }
        }
      }

      // Draw custom eye (finder) shapes
      const drawEye = (x, y) => {
        ctx.beginPath();
        if (eye === "circle") {
          // Outer ring
          ctx.beginPath();
          ctx.arc(x + cell * 3.5, y + cell * 3.5, cell * 3.2, 0, Math.PI * 2);
          ctx.lineWidth = cell;
          ctx.strokeStyle = fg1;
          ctx.stroke();
          
          // Inner dot
          ctx.beginPath();
          ctx.arc(x + cell * 3.5, y + cell * 3.5, cell * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = fg1;
          ctx.fill();
        } else if (eye === "rounded") {
          // Outer bracket
          ctx.beginPath();
          ctx.roundRect(x + cell * 0.5, y + cell * 0.5, cell * 6, cell * 6, cell * 2);
          ctx.lineWidth = cell;
          ctx.strokeStyle = fg1;
          ctx.stroke();
          
          // Inner dot
          ctx.beginPath();
          ctx.roundRect(x + cell * 2, y + cell * 2, cell * 3, cell * 3, cell);
          ctx.fillStyle = fg1;
          ctx.fill();
        } else {
          // Standard Square
          // Outer ring
          ctx.strokeStyle = fg1;
          ctx.lineWidth = cell;
          ctx.strokeRect(x + cell * 0.5, y + cell * 0.5, cell * 6, cell * 6);
          // Inner dot
          ctx.fillStyle = fg1;
          ctx.fillRect(x + cell * 2, y + cell * 2, cell * 3, cell * 3);
        }
      };

      drawEye(0, 0); // Top-Left
      drawEye((mSize - 7) * cell, 0); // Top-Right
      drawEye(0, (mSize - 7) * cell); // Bottom-Left

      // Draw logo overlay
      if (uploadedLogo) {
        const logoScale = parseInt(logoScaleSlider.value) / 100;
        const logoSize = size * logoScale;
        const logoX = (size - logoSize) / 2;
        const logoY = (size - logoSize) / 2;

        // Draw background container behind logo
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.roundRect(logoX - 4, logoY - 4, logoSize + 8, logoSize + 8, 8);
        ctx.fill();

        // Draw image
        ctx.drawImage(uploadedLogo, logoX, logoY, logoSize, logoSize);
      }
    };

    // Event hooks
    textInput?.addEventListener("input", drawQRCode);
    dotStyle?.addEventListener("change", drawQRCode);
    eyeStyle?.addEventListener("change", drawQRCode);
    colorFg?.addEventListener("input", drawQRCode);
    colorFg2?.addEventListener("input", drawQRCode);
    colorBg?.addEventListener("input", drawQRCode);

    // PNG Download
    container.querySelector("#qr-download-png")?.addEventListener("click", () => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "cyber_qr_code.png";
      link.click();
      appInstance.showToast("Saved QR Code as PNG!", "success");
    });

    // SVG Export (Simulated vector drawing download)
    container.querySelector("#qr-download-svg")?.addEventListener("click", () => {
      const text = textInput.value || "https://github.com";
      const isGrad = container.querySelector("input[name='qr-color-mode']:checked").value === "gradient";
      const fg1 = colorFg.value;
      const fg2 = colorFg2.value;
      const bg = colorBg.value;

      const qrData = QRCode.generate(text, "H", 4);
      const mSize = qrData.size;
      const modules = qrData.modules;

      let paths = "";
      const isEyeArea = (r, c) => {
        if (r < 7 && c < 7) return true;
        if (r < 7 && c >= mSize - 7) return true;
        if (r >= mSize - 7 && c < 7) return true;
        return false;
      };

      for (let r = 0; r < mSize; r++) {
        for (let c = 0; c < mSize; c++) {
          if (modules[r][c] && !isEyeArea(r, c)) {
            paths += `<rect x="${c}" y="${r}" width="1" height="1" />`;
          }
        }
      }

      // Eye definitions in vector
      const eyeStyleVal = eyeStyle.value;
      const getEyeSvg = (x, y) => {
        if (eyeStyleVal === "circle") {
          return `
            <circle cx="${x + 3.5}" cy="${y + 3.5}" r="3" fill="none" stroke="url(#fgGrad)" stroke-width="1" />
            <circle cx="${x + 3.5}" cy="${y + 3.5}" r="1.5" fill="url(#fgGrad)" />
          `;
        } else if (eyeStyleVal === "rounded") {
          return `
            <rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" rx="2" fill="none" stroke="url(#fgGrad)" stroke-width="1" />
            <rect x="${x + 2}" y="${y + 2}" width="3" height="3" rx="1" fill="url(#fgGrad)" />
          `;
        } else {
          return `
            <rect x="${x + 0.5}" y="${y + 0.5}" width="6" height="6" fill="none" stroke="url(#fgGrad)" stroke-width="1" />
            <rect x="${x + 2}" y="${y + 2}" width="3" height="3" fill="url(#fgGrad)" />
          `;
        }
      };

      const eyeTL = getEyeSvg(0, 0);
      const eyeTR = getEyeSvg(mSize - 7, 0);
      const eyeBL = getEyeSvg(0, mSize - 7);

      const fillDef = isGrad 
        ? `<linearGradient id="fgGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${fg1}"/><stop offset="100%" stop-color="${fg2}"/></linearGradient>`
        : `<linearGradient id="fgGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="${fg1}"/><stop offset="100%" stop-color="${fg1}"/></linearGradient>`;

      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${mSize} ${mSize}" width="500" height="500">
        <defs>
          ${fillDef}
        </defs>
        <rect width="100%" height="100%" fill="${bg}" />
        <g fill="url(#fgGrad)">
          ${paths}
        </g>
        ${eyeTL}
        ${eyeTR}
        ${eyeBL}
      </svg>`;

      const blob = new Blob([svgContent], { type: "image/svg+xml" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "cyber_qr_code.svg";
      link.click();
      appInstance.showToast("Exported vector QR Code as SVG!", "success");
    });

    // Run first draw
    drawQRCode();
  }
};
