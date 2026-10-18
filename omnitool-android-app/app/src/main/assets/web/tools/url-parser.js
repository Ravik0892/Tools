// Standalone URL Query Parser & Builder Module for OmniTool Hub
// Enhanced with premium inspector visualization, inline type detectors, bulk edit, UTM panels, and canvas QR code generator.

// --- SELF-CONTAINED COMPACT QR CODE GENERATOR (QRCode) ---
const QRCode = (() => {
  const PAD0 = 0xec;
  const PAD1 = 0x11;

  function QRPolynomial(num, shift) {
    let offset = 0;
    while (offset < num.length && num[offset] === 0) offset++;
    this.num = new Int32Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i++) this.num[i] = num[offset + i];
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
      for (let i = 0; i < this.getLength(); i++) num[i] = this.getAt(i);
      for (let i = 0; i < e.getLength(); i++) num[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
      return new QRPolynomial(num, 0).mod(e);
    }
  };

  const QRMath = {
    glog(n) { return n < 1 ? 0 : LOG_TABLE[n]; },
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

  const RS_BLOCK_TABLE = [
    [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], // V1
    [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], // V2
    [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], // V3
    [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], // V4
    [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], // V5
    [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], // V6
    [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], // V7
    [2, 121, 97], [4, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], // V8
    [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 44, 16, 4, 45, 17], [4, 44, 12, 4, 45, 13], // V9
    [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16] // V10
  ];

  const ALIGNMENT_PATTERN_TABLE = [
    [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34],
    [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]
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
    const bytes = new TextEncoder().encode(text);
    const count = bytes.length;

    let totalDataCount = 0;
    rsBlocks.forEach(b => totalDataCount += b.dataCount);

    const dataBytes = new Uint8Array(totalDataCount);
    dataBytes[0] = 0x40; // Byte mode binary start
    dataBytes[1] = count; // Byte size
    for (let i = 0; i < count; i++) {
      if (i + 2 < totalDataCount) dataBytes[i + 2] = bytes[i];
    }
    
    let padSelect = false;
    for (let i = count + 2; i < totalDataCount; i++) {
      dataBytes[i] = padSelect ? PAD1 : PAD0;
      padSelect = !padSelect;
    }

    const totalBlocks = rsBlocks.length;
    const rsPoly = getErrorCorrectionPolynomial(rsBlocks[0].totalCount - rsBlocks[0].dataCount);
    
    const blockDataList = [];
    let byteOffset = 0;
    for (let b = 0; b < totalBlocks; b++) {
      const block = rsBlocks[b];
      const data = new Int32Array(block.dataCount);
      for (let i = 0; i < block.dataCount; i++) data[i] = dataBytes[byteOffset + i];
      byteOffset += block.dataCount;
      
      const poly = new QRPolynomial(data, rsPoly.getLength() - 1);
      const modPoly = poly.mod(rsPoly);
      const ecLength = rsPoly.getLength() - 1;
      const ecc = new Int32Array(ecLength);
      const diff = ecLength - modPoly.getLength();
      for (let i = 0; i < modPoly.getLength(); i++) ecc[diff + i] = modPoly.getAt(i);
      blockDataList.push({ data, ecc });
    }

    const finalData = [];
    let maxData = 0, maxEcc = 0;
    blockDataList.forEach(b => {
      maxData = Math.max(maxData, b.data.length);
      maxEcc = Math.max(maxEcc, b.ecc.length);
    });

    for (let i = 0; i < maxData; i++) {
      for (let b = 0; b < totalBlocks; b++) {
        if (i < blockDataList[b].data.length) finalData.push(blockDataList[b].data[i]);
      }
    }
    for (let i = 0; i < maxEcc; i++) {
      for (let b = 0; b < totalBlocks; b++) {
        if (i < blockDataList[b].ecc.length) finalData.push(blockDataList[b].ecc[i]);
      }
    }
    return finalData;
  }

  function getErrorCorrectionPolynomial(eccLength) {
    let a = new QRPolynomial([1], 0);
    for (let i = 0; i < eccLength; i++) a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
    return a;
  }

  return {
    generate(text, ecLevel = "L") {
      const bytes = new TextEncoder().encode(text);
      const count = bytes.length;
      
      let version = 1;
      for (let v = 1; v <= 10; v++) {
        const rsBlocks = getRSBlocks(v, ecLevel);
        let totalDataCount = 0;
        rsBlocks.forEach(b => totalDataCount += b.dataCount);
        if (totalDataCount >= count + 2) {
          version = v;
          break;
        }
        if (v === 10) version = 10;
      }
      
      const size = version * 4 + 17;
      const modules = Array(size).fill(null).map(() => Array(size).fill(false));
      const reserved = Array(size).fill(null).map(() => Array(size).fill(false));

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

      const alignPattern = ALIGNMENT_PATTERN_TABLE[version - 1];
      const drawAlignment = (row, col) => {
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            const tr = row + r;
            const tc = col + c;
            reserved[tr][tc] = true;
            const isBorder = (Math.abs(r) === 2 || Math.abs(c) === 2);
            const isCenter = (r === 0 && c === 0);
            if (isBorder || isCenter) modules[tr][tc] = true;
          }
        }
      };

      for (let i = 0; i < alignPattern.length; i++) {
        for (let j = 0; j < alignPattern.length; j++) {
          const r = alignPattern[i];
          const c = alignPattern[j];
          if ((r === 6 && c === 6) || (r === 6 && c === size - 7) || (r === size - 7 && c === 6)) continue;
          drawAlignment(r, c);
        }
      }

      for (let i = 8; i < size - 8; i++) {
        const isBlack = (i % 2 === 0);
        modules[6][i] = isBlack;
        modules[i][6] = isBlack;
        reserved[6][i] = true;
        reserved[i][6] = true;
      }

      modules[4 * version + 9][8] = true;
      reserved[4 * version + 9][8] = true;

      let data = [];
      try {
        data = createData(version, ecLevel, text);
      } catch (err) {
        return this.generate(text, ecLevel);
      }

      let byteIndex = 0;
      let bitIndex = 7;
      
      const evalMask = (r, c) => (r + c) % 2 === 0;

      for (let c = size - 1; c > 0; c -= 2) {
        if (c === 6) c--;
        for (let r_dir = 0; r_dir < size; r_dir++) {
          const r = (c & 2) ? (size - 1 - r_dir) : r_dir;
          for (let colOffset = 0; colOffset < 2; colOffset++) {
            const col = c - colOffset;
            if (!reserved[r][col]) {
              let bit = false;
              if (byteIndex < data.length) bit = ((data[byteIndex] >>> bitIndex) & 1) === 1;
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

export default {
  id: "url-parser",
  name: "URL Query Parser & Builder",
  renderUI() {
    return `
      <!-- Embedded Styles for Premium Widgets -->
      <style>
        .url-inspector-container {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 12px;
          margin-top: 12px;
        }
        .url-badges-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .url-badge-pill {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 4px 10px;
          font-size: 11px;
          font-family: var(--font-mono);
          gap: 6px;
          transition: all var(--transition-fast);
        }
        .url-badge-pill:hover {
          border-color: var(--border-color-hover);
          background: rgba(255, 255, 255, 0.05);
        }
        .url-badge-label {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .url-badge-value {
          font-weight: 500;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .url-badge-action {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          border-radius: 4px;
        }
        .url-badge-action:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.08);
        }
        .transform-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
        }
        .row-reorder-btn {
          background: none;
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          cursor: pointer;
          height: 36px;
          width: 28px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all var(--transition-fast);
        }
        .row-reorder-btn:hover:not(:disabled) {
          color: var(--text-main);
          border-color: var(--border-color-hover);
          background: rgba(255, 255, 255, 0.05);
        }
        .row-reorder-btn:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .smart-badge {
          font-size: 9px;
          font-weight: 700;
          padding: 1px 4px;
          border-radius: 4px;
          cursor: pointer;
          user-select: none;
          transition: all var(--transition-fast);
        }
        .smart-badge.json-type {
          background: rgba(157, 78, 221, 0.15);
          color: var(--accent-purple);
          border: 1px solid rgba(157, 78, 221, 0.3);
        }
        .smart-badge.json-type:hover {
          background: rgba(157, 78, 221, 0.3);
        }
        .smart-badge.b64-type {
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
          border: 1px solid rgba(0, 242, 254, 0.3);
        }
        .smart-badge.b64-type:hover {
          background: rgba(0, 242, 254, 0.3);
        }
        .smart-badge.utm-type {
          background: rgba(245, 158, 11, 0.15);
          color: var(--accent-orange);
          border: 1px solid rgba(245, 158, 11, 0.3);
        }
        .inline-inspector {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          padding: 10px;
          margin-top: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          width: 100%;
          box-sizing: border-box;
        }
        .inline-inspector-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          font-size: 11px;
          color: var(--text-muted);
        }
        .inline-inspector-body {
          overflow-x: auto;
          white-space: pre-wrap;
          word-break: break-all;
          max-height: 150px;
          color: var(--text-main);
          background: rgba(0, 0, 0, 0.3);
          padding: 6px;
          border-radius: 4px;
        }
      </style>

      <div class="tool-content-layout split-view">
        <!-- Left Column: Input URL & Params (Editor) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>URL &amp; Parameter Editor</h3>
          </div>
          <div class="form-group" style="margin-bottom: 12px;">
            <label for="url-parser-input">Input Web Address / URL</label>
            <input type="text" class="form-input" id="url-parser-input" placeholder="https://example.com/search?q=query&category=dev&sort=date" aria-label="Input URL">
          </div>

          <div class="panel-header" style="justify-content: space-between; flex-wrap: wrap; gap: 8px; border-top: 1px solid var(--border-color); padding-top: 12px;">
            <div style="display: flex; gap: 12px; align-items: center;">
              <h3 id="query-section-title" style="margin: 0; font-size: 13px;">Query Parameters</h3>
              <div class="tool-tabs" style="display: flex; gap: 4px; padding: 2px; background: rgba(0,0,0,0.2); border-radius: 6px; border: 1px solid var(--border-color);">
                <button class="tool-tab-btn active" id="url-tab-grid" style="padding: 4px 10px; font-size: 11px; border: none; background: transparent; color: var(--text-muted); cursor: pointer; border-radius: 4px;">Table Grid</button>
                <button class="tool-tab-btn" id="url-tab-bulk" style="padding: 4px 10px; font-size: 11px; border: none; background: transparent; color: var(--text-muted); cursor: pointer; border-radius: 4px;">Bulk Edit</button>
              </div>
            </div>
            <div class="panel-actions">
              <button class="tool-btn" id="url-param-add">+ Add Parameter</button>
            </div>
          </div>

          <!-- Operations Toolbar -->
          <div class="transformations-toolbar" style="display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;">
            <button class="tool-btn secondary transform-btn" id="url-strip-tracking" title="Remove tracking parameters like utm_*, fbclid, etc.">🧹 Strip Tracking</button>
            <button class="tool-btn secondary transform-btn" id="url-strip-empty" title="Remove empty key or value parameters">🗑️ Clean Empty</button>
            <button class="tool-btn secondary transform-btn" id="url-clear-all-params" title="Remove all query parameters">❌ Clear Params</button>
            <button class="tool-btn secondary transform-btn" id="url-toggle-decode" title="Toggle between URL-encoded output and raw output" style="border-color: rgba(var(--accent-cyan-rgb), 0.25);">🔏 Encoded Rebuild</button>
          </div>

          <!-- Parameters table container -->
          <div id="url-params-container" style="display: flex; flex-direction: column; gap: 10px;">
            <span style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 12px 0;">No parameters parsed</span>
          </div>

          <!-- Bulk parameters editor container -->
          <div id="url-bulk-container" style="display: none; flex-direction: column; gap: 10px;">
            <textarea class="input-textarea" id="url-bulk-input" placeholder="key1: value1&#10;key2: value2&#10;key3=value3" style="font-family: var(--font-mono); font-size: 13px; min-height: 200px; resize: vertical;" aria-label="Bulk Parameters Editor"></textarea>
            <span style="font-size: 11px; color: var(--text-muted);">Enter one parameter per line in <code>key: value</code> or <code>key=value</code> format.</span>
          </div>
        </div>

        <!-- Right Column: Rebuild, UTM Form, and QR Code (Result) -->
        <div class="tool-panel">
          <div class="panel-header" style="justify-content: flex-start; padding-bottom: 8px; border-bottom: 1px solid var(--border-color); margin-bottom: 15px;">
            <div class="tool-tabs" style="display: flex; gap: 4px; padding: 2px; background: rgba(0,0,0,0.2); border-radius: 6px; border: 1px solid var(--border-color); width: 100%;">
              <button class="tool-tab-btn active" id="right-tab-output" style="flex: 1; text-align: center; padding: 6px; font-size: 11px; border: none; background: transparent; color: var(--text-muted); cursor: pointer; border-radius: 4px;">Rebuilt URL</button>
              <button class="tool-tab-btn" id="right-tab-utm" style="flex: 1; text-align: center; padding: 6px; font-size: 11px; border: none; background: transparent; color: var(--text-muted); cursor: pointer; border-radius: 4px;">UTM Builder</button>
              <button class="tool-tab-btn" id="right-tab-json" style="flex: 1; text-align: center; padding: 6px; font-size: 11px; border: none; background: transparent; color: var(--text-muted); cursor: pointer; border-radius: 4px;">JSON Payload</button>
            </div>
          </div>

          <!-- Tab Content: Output & QR -->
          <div id="right-content-output" class="tab-content" style="display: flex; flex-direction: column; gap: 15px;">
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Output String</span>
                <button class="tool-btn accent-emerald" id="url-copy-btn" style="padding: 4px 10px; font-size: 11px; height: 28px;"><svg viewBox="0 0 24 24" style="width: 12px; height: 12px; margin-right: 4px;" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy URL</button>
              </div>
              <textarea class="input-textarea" id="url-output" readonly placeholder="Parsed output URL will appear here..." style="min-height: 80px; font-family: var(--font-mono); font-size: 13px;" aria-label="Output URL"></textarea>
            </div>

            <!-- Dynamic URL Component Inspector -->
            <div id="url-inspector-card" class="url-inspector-container" style="display: none; margin-top: 4px;">
              <div style="font-size: 12px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">URL Inspector</div>
              <div id="url-inspector-badges" class="url-badges-grid"></div>
            </div>
            
            <!-- QR Code Generator -->
            <div style="border-top: 1px solid var(--border-color); padding-top: 15px; display: flex; flex-direction: column; align-items: center; gap: 10px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; align-self: flex-start;">Shareable QR Code</span>
              <div id="qrcode-container" style="background: white; padding: 12px; border-radius: 12px; width: 144px; height: 144px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 20px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);">
                <canvas id="url-qrcode-canvas" width="120" height="120"></canvas>
              </div>
              <span style="font-size: 11px; color: var(--text-muted); text-align: center;">Scan to instantly test this address on a mobile device</span>
            </div>
          </div>

          <!-- Tab Content: UTM Builder Form -->
          <div id="right-content-utm" class="tab-content" style="display: none; flex-direction: column; gap: 12px;">
            <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">UTM Parameter Form</span>
            <div class="form-group" style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 5px;">
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-main); font-weight: 500;">Campaign Source (<code>utm_source</code>) *</span>
                <input type="text" class="form-input utm-input" id="utm-source" placeholder="google, newsletter, twitter" style="height: 32px; font-size: 12px;" aria-label="UTM Source">
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-main); font-weight: 500;">Campaign Medium (<code>utm_medium</code>) *</span>
                <input type="text" class="form-input utm-input" id="utm-medium" placeholder="cpc, email, social" style="height: 32px; font-size: 12px;" aria-label="UTM Medium">
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-main); font-weight: 500;">Campaign Name (<code>utm_campaign</code>) *</span>
                <input type="text" class="form-input utm-input" id="utm-campaign" placeholder="summer_sale, launch_2026" style="height: 32px; font-size: 12px;" aria-label="UTM Campaign">
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-main); font-weight: 500;">Campaign Term (<code>utm_term</code>)</span>
                <input type="text" class="form-input utm-input" id="utm-term" placeholder="running+shoes, dev+tools" style="height: 32px; font-size: 12px;" aria-label="UTM Term">
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <span style="font-size: 11px; color: var(--text-main); font-weight: 500;">Campaign Content (<code>utm_content</code>)</span>
                <input type="text" class="form-input utm-input" id="utm-content" placeholder="banner_ad, text_link" style="height: 32px; font-size: 12px;" aria-label="UTM Content">
              </div>
            </div>
            <button class="tool-btn secondary" id="utm-clear-btn" style="font-size: 11px; padding: 6px; width: 100%;">Clear Campaign UTMs</button>
          </div>

          <!-- Tab Content: JSON -->
          <div id="right-content-json" class="tab-content" style="display: none; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Parameters JSON Object</span>
              <button class="tool-btn secondary" id="json-copy-btn" style="padding: 4px 10px; font-size: 11px; height: 28px;">Copy JSON</button>
            </div>
            <textarea class="input-textarea" id="url-json-output" placeholder="{}" style="height: 180px; font-family: var(--font-mono); font-size: 13px;" aria-label="JSON Output"></textarea>
            <button class="tool-btn accent-purple" id="json-apply-btn" style="font-size: 12px; padding: 8px; width: 100%;">Apply JSON to Parameters</button>
          </div>
        </div>

        <!-- Quick Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="url-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Paste Web Address</strong>: Type or paste a URL containing query parameters (e.g., <code>?q=query&amp;page=2</code>) in the input.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Edit &amp; Reorder Key-Values</strong>: Modify values directly, delete query properties, or click <strong>+ Add Parameter</strong> to extend it. Use reorder buttons to move parameters up or down.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Rebuild &amp; Copy</strong>: Instantly view the updated, fully encoded rebuilt URL and copy it to the clipboard. Use the QR Code for mobile tests.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">API Endpoint</button>
                <button class="tool-guide-example-tab-btn" data-index="1">UTM Builder</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input URL</span>
                <div class="tool-guide-io-value">https://api.github.com/repos/git/commits?per_page=10&amp;page=2</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Parsed Parameters</span>
                <div class="tool-guide-io-value">per_page: "10"<br>page: "2"</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Input URL</span>
                <div class="tool-guide-io-value">https://myshop.com/sales?utm_source=newsletter&amp;utm_medium=email</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Parsed Parameters</span>
                <div class="tool-guide-io-value">utm_source: "newsletter"<br>utm_medium: "email"</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
    const input = container.querySelector("#url-parser-input");
    const paramsContainer = container.querySelector("#url-params-container");
    const output = container.querySelector("#url-output");
    
    // Inspector elements
    const inspectorCard = container.querySelector("#url-inspector-card");
    const inspectorBadges = container.querySelector("#url-inspector-badges");

    // Operations toolbar
    const toggleDecodeBtn = container.querySelector("#url-toggle-decode");
    const stripTrackingBtn = container.querySelector("#url-strip-tracking");
    const stripEmptyBtn = container.querySelector("#url-strip-empty");
    const clearAllParamsBtn = container.querySelector("#url-clear-all-params");

    // Left Tabs (Grid vs Bulk)
    const tabGridBtn = container.querySelector("#url-tab-grid");
    const tabBulkBtn = container.querySelector("#url-tab-bulk");
    const bulkContainer = container.querySelector("#url-bulk-container");
    const bulkInput = container.querySelector("#url-bulk-input");
    let activeLeftTab = "grid"; // grid | bulk

    // Right Tabs (Output vs UTM vs JSON)
    const rightTabs = {
      output: container.querySelector("#right-tab-output"),
      utm: container.querySelector("#right-tab-utm"),
      json: container.querySelector("#right-tab-json")
    };
    const rightContents = {
      output: container.querySelector("#right-content-output"),
      utm: container.querySelector("#right-content-utm"),
      json: container.querySelector("#right-content-json")
    };
    let activeRightTab = "output";

    // QR Canvas
    const qrCanvas = container.querySelector("#url-qrcode-canvas");

    // UTM Form Inputs
    const utmInputs = {
      source: container.querySelector("#utm-source"),
      medium: container.querySelector("#utm-medium"),
      campaign: container.querySelector("#utm-campaign"),
      term: container.querySelector("#utm-term"),
      content: container.querySelector("#utm-content")
    };
    const utmClearBtn = container.querySelector("#utm-clear-btn");

    // JSON Editor Output
    const jsonOutput = container.querySelector("#url-json-output");
    const jsonApplyBtn = container.querySelector("#json-apply-btn");
    const jsonCopyBtn = container.querySelector("#json-copy-btn");

    // Main States
    let baseUrl = "";
    let params = [];
    let encodeOutput = true; // By default we build a standard encoded URL

    // Helper functions for smart inspection
    const isBase64 = (str) => {
      if (!str || str.length % 4 !== 0) return false;
      const b64Regex = /^[A-Za-z0-9+/]+={0,2}$/;
      if (!b64Regex.test(str)) return false;
      try {
        const decoded = atob(str);
        return decoded.length > 2 && /^[\x00-\x7F]*$/.test(decoded); // text characters only
      } catch (err) {
        return false;
      }
    };

    const isJSON = (str) => {
      if (!str || str.length < 2) return false;
      if ((str.startsWith("{") && str.endsWith("}")) || (str.startsWith("[") && str.endsWith("]"))) {
        try {
          JSON.parse(str);
          return true;
        } catch (err) {
          return false;
        }
      }
      return false;
    };

    // Rebuild URL Output
    const rebuildUrl = () => {
      try {
        if (!baseUrl) {
          output.value = "";
          drawQR("");
          jsonOutput.value = "{}";
          return;
        }

        const queryParams = new URLSearchParams();
        params.forEach(p => {
          if (p.key) {
            queryParams.append(p.key, p.value);
          }
        });

        const qs = queryParams.toString();
        const fullUrl = baseUrl + (qs ? "?" + qs : "");
        
        output.value = encodeOutput ? fullUrl : decodeURIComponent(fullUrl);
        drawQR(fullUrl);

        // Update JSON representation
        const jsonPayload = {};
        params.forEach(p => {
          if (p.key) {
            if (jsonPayload[p.key]) {
              if (Array.isArray(jsonPayload[p.key])) {
                jsonPayload[p.key].push(p.value);
              } else {
                jsonPayload[p.key] = [jsonPayload[p.key], p.value];
              }
            } else {
              jsonPayload[p.key] = p.value;
            }
          }
        });
        jsonOutput.value = JSON.stringify(jsonPayload, null, 2);

        // Update UTM form fields from current parameters if matching
        updateUtmFormFromParams();
      } catch (e) {
        output.value = "";
        drawQR("");
      }
    };

    // Render components inspector
    const renderUrlInspector = (urlStr) => {
      inspectorBadges.innerHTML = "";
      if (!urlStr) {
        inspectorCard.style.display = "none";
        return;
      }

      let parsed = null;
      try {
        parsed = new URL(urlStr);
      } catch (e) {
        // Fallback check if it's a domain/path without protocol
        if (urlStr.includes('.') && !urlStr.startsWith('http://') && !urlStr.startsWith('https://')) {
          try {
            parsed = new URL("https://" + urlStr);
          } catch (err) {}
        }
      }

      if (!parsed) {
        // Fallback for query string only
        if (urlStr.startsWith('?') || urlStr.includes('?')) {
          const qIndex = urlStr.indexOf('?');
          const hostPart = qIndex !== -1 ? urlStr.substring(0, qIndex) : urlStr;
          
          inspectorCard.style.display = "block";
          addInspectorBadge("Base URL", hostPart, "var(--accent-purple)");
          addInspectorBadge("Query Length", (urlStr.length - hostPart.length) + " chars", "var(--accent-cyan)");
          return;
        }
        inspectorCard.style.display = "none";
        return;
      }

      inspectorCard.style.display = "block";

      if (parsed.protocol) {
        addInspectorBadge("Protocol", parsed.protocol, "var(--accent-emerald)", () => {
          appInstance.copyText(parsed.protocol);
        }, () => {
          // Clear protocol (set to http by default or strip)
          const cleanInput = input.value.replace(/^[a-z]+:\/\//i, "");
          input.value = cleanInput;
          input.dispatchEvent(new Event("input"));
        });
      }

      if (parsed.hostname) {
        addInspectorBadge("Domain/Host", parsed.hostname, "var(--accent-cyan)", () => {
          appInstance.copyText(parsed.hostname);
        });
      }

      if (parsed.port) {
        addInspectorBadge("Port", parsed.port, "var(--accent-purple)", () => {
          appInstance.copyText(parsed.port);
        }, () => {
          const cleanUrl = input.value.replace(":" + parsed.port, "");
          input.value = cleanUrl;
          input.dispatchEvent(new Event("input"));
        });
      }

      if (parsed.pathname && parsed.pathname !== "/") {
        addInspectorBadge("Path", parsed.pathname, "var(--accent-orange)", () => {
          appInstance.copyText(parsed.pathname);
        }, () => {
          const cleanUrl = input.value.replace(parsed.pathname, "/");
          input.value = cleanUrl;
          input.dispatchEvent(new Event("input"));
        });
      }

      if (parsed.hash) {
        addInspectorBadge("Hash/Anchor", parsed.hash, "var(--accent-rose)", () => {
          appInstance.copyText(parsed.hash);
        }, () => {
          const cleanUrl = input.value.split("#")[0];
          input.value = cleanUrl;
          input.dispatchEvent(new Event("input"));
        });
      }
    };

    const addInspectorBadge = (label, val, color, onCopy, onClear) => {
      const badge = document.createElement("div");
      badge.className = "url-badge-pill";
      badge.style.borderColor = `rgba(${parseInt(color.slice(1,3),16) || 120}, ${parseInt(color.slice(3,5),16) || 120}, ${parseInt(color.slice(5,7),16) || 120}, 0.2)`;
      
      badge.innerHTML = `
        <span class="url-badge-label">${label}:</span>
        <span class="url-badge-value" style="color: ${color};" title="${val}">${val}</span>
        ${onCopy ? `<button class="url-badge-action badge-copy" title="Copy ${label}"><svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2.5" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button>` : ''}
        ${onClear ? `<button class="url-badge-action badge-clear" title="Clear ${label}" style="color: var(--accent-rose);"><svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>` : ''}
      `;

      if (onCopy) {
        badge.querySelector(".badge-copy").addEventListener("click", (e) => {
          e.stopPropagation();
          onCopy();
        });
      }
      if (onClear) {
        badge.querySelector(".badge-clear").addEventListener("click", (e) => {
          e.stopPropagation();
          onClear();
        });
      }

      inspectorBadges.appendChild(badge);
    };

    // Render Query parameters grid
    const renderParams = () => {
      // If we are in bulk mode, do not render grid, update bulk textarea instead
      if (activeLeftTab === "bulk") {
        updateBulkTextarea();
        return;
      }

      paramsContainer.innerHTML = "";
      if (params.length === 0) {
        paramsContainer.innerHTML = `<span style="font-size: 13px; color: var(--text-muted); text-align: center; padding: 12px 0;">No parameters parsed</span>`;
        return;
      }

      params.forEach((param, idx) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.flexDirection = "column";
        row.style.gap = "4px";
        row.style.borderBottom = "1px solid rgba(255,255,255,0.03)";
        row.style.paddingBottom = "8px";

        // Build controls row
        const controlsRow = document.createElement("div");
        controlsRow.style.display = "flex";
        controlsRow.style.gap = "6px";
        controlsRow.style.alignItems = "center";

        // Type detector badges
        let badgesHtml = "";
        const lowerKey = param.key.toLowerCase();
        const isUtm = lowerKey.startsWith("utm_");
        const valIsJson = isJSON(param.value);
        const valIsB64 = isBase64(param.value);

        if (isUtm) badgesHtml += `<span class="smart-badge utm-type" title="UTM Campaign tracker">UTM</span>`;
        if (valIsJson) badgesHtml += `<span class="smart-badge json-type" title="Valid JSON - Click to inspect">JSON</span>`;
        if (valIsB64) badgesHtml += `<span class="smart-badge b64-type" title="Base64 encoded - Click to inspect">B64</span>`;

        controlsRow.innerHTML = `
          <!-- Reorder keys -->
          <button class="row-reorder-btn reorder-up" title="Move Parameter Up" ${idx === 0 ? 'disabled' : ''}><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"></polyline></svg></button>
          <button class="row-reorder-btn reorder-down" title="Move Parameter Down" ${idx === params.length - 1 ? 'disabled' : ''}><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg></button>
          
          <!-- Key and Value inputs -->
          <div style="flex: 1.5; position: relative; display: flex; align-items: center;">
            <input type="text" class="form-input url-key-input" placeholder="Key" value="${param.key}" style="width: 100%; height: 36px; padding: 0 10px; font-family: var(--font-mono); font-size: 13px;" aria-label="Key">
          </div>
          <div style="flex: 3; display: flex; align-items: center; gap: 6px;">
            <div style="flex: 1; position: relative; display: flex; align-items: center; min-width: 0;">
              <input type="text" class="form-input url-val-input" placeholder="Value" value="${param.value}" style="width: 100%; height: 36px; padding: 0 8px; font-family: var(--font-mono); font-size: 13px; min-width: 0;" aria-label="Value">
              <div style="position: absolute; right: 8px; display: flex; gap: 4px; z-index: 2;">
                ${badgesHtml}
              </div>
            </div>
            <!-- Remove Parameter -->
            <button class="tool-btn url-remove-btn" style="color: var(--accent-rose); border-color: rgba(244, 63, 94, 0.2); height: 36px; width: 36px; padding: 0; display: flex; align-items: center; justify-content: center; flex-shrink: 0;" title="Remove Parameter"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width: 14px; height: 14px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></button>
          </div>
        `;

        // Event listener for reordering parameters
        controlsRow.querySelector(".reorder-up").addEventListener("click", () => {
          if (idx > 0) {
            const temp = params[idx];
            params[idx] = params[idx - 1];
            params[idx - 1] = temp;
            renderParams();
            rebuildUrl();
          }
        });

        controlsRow.querySelector(".reorder-down").addEventListener("click", () => {
          if (idx < params.length - 1) {
            const temp = params[idx];
            params[idx] = params[idx + 1];
            params[idx + 1] = temp;
            renderParams();
            rebuildUrl();
          }
        });

        controlsRow.querySelector(".url-key-input").addEventListener("input", (e) => {
          params[idx].key = e.target.value;
          rebuildUrl();
        });

        controlsRow.querySelector(".url-val-input").addEventListener("input", (e) => {
          params[idx].value = e.target.value;
          rebuildUrl();
          // Update row badge status dynamically without re-rendering everything
          updateRowTypeBadges(row, e.target.value, param.key, idx);
        });

        controlsRow.querySelector(".url-remove-btn").addEventListener("click", () => {
          params.splice(idx, 1);
          renderParams();
          rebuildUrl();
        });

        row.appendChild(controlsRow);

        // Add inline inspectors container
        const inlineInspectorDiv = document.createElement("div");
        inlineInspectorDiv.className = "inline-inspector";
        inlineInspectorDiv.style.display = "none";
        row.appendChild(inlineInspectorDiv);

        // Hook up badge inspectors if active
        const bindBadgeToggler = (selector, type) => {
          const badgeEl = controlsRow.querySelector(selector);
          if (badgeEl) {
            badgeEl.addEventListener("click", () => {
              toggleInlineInspector(inlineInspectorDiv, param.value, type, idx);
            });
          }
        };

        bindBadgeToggler(".json-type", "json");
        bindBadgeToggler(".b64-type", "b64");

        paramsContainer.appendChild(row);
      });
    };

    // Live update type badges during keystroke
    const updateRowTypeBadges = (rowEl, val, key, idx) => {
      const badgesContainer = rowEl.querySelector(".url-val-input").nextElementSibling;
      badgesContainer.innerHTML = "";
      
      const isUtm = key.toLowerCase().startsWith("utm_");
      const valIsJson = isJSON(val);
      const valIsB64 = isBase64(val);
      
      let badgesHtml = "";
      if (isUtm) badgesHtml += `<span class="smart-badge utm-type" title="UTM Campaign tracker">UTM</span>`;
      if (valIsJson) badgesHtml += `<span class="smart-badge json-type" title="Valid JSON - Click to inspect">JSON</span>`;
      if (valIsB64) badgesHtml += `<span class="smart-badge b64-type" title="Base64 encoded - Click to inspect">B64</span>`;
      badgesContainer.innerHTML = badgesHtml;

      // Re-bind click event triggers
      const inlineDiv = rowEl.querySelector(".inline-inspector");
      const jsonBadge = badgesContainer.querySelector(".json-type");
      if (jsonBadge) {
        jsonBadge.addEventListener("click", () => toggleInlineInspector(inlineDiv, val, "json", idx));
      }
      const b64Badge = badgesContainer.querySelector(".b64-type");
      if (b64Badge) {
        b64Badge.addEventListener("click", () => toggleInlineInspector(inlineDiv, val, "b64", idx));
      }

      // Hide active inspector if value doesn't match anymore
      if (inlineDiv.style.display !== "none") {
        if ((inlineDiv.dataset.inspectorType === "json" && !valIsJson) || (inlineDiv.dataset.inspectorType === "b64" && !valIsB64)) {
          inlineDiv.style.display = "none";
        }
      }
    };

    // Inline inspector toggle rendering
    const toggleInlineInspector = (element, val, type, idx) => {
      if (element.style.display === "block" && element.dataset.inspectorType === type) {
        element.style.display = "none";
        return;
      }

      element.style.display = "block";
      element.dataset.inspectorType = type;
      element.innerHTML = "";

      if (type === "json") {
        try {
          const parsed = JSON.parse(val);
          const pretty = JSON.stringify(parsed, null, 2);
          element.innerHTML = `
            <div class="inline-inspector-header">
              <span>Parsed JSON Inspector</span>
              <button class="tool-btn secondary" style="padding: 2px 6px; font-size: 10px; height: auto;" id="btn-copy-ijson-${idx}">Copy</button>
            </div>
            <pre class="inline-inspector-body">${pretty}</pre>
          `;
          element.querySelector(`#btn-copy-ijson-${idx}`).addEventListener("click", (e) => {
            e.stopPropagation();
            appInstance.copyText(pretty);
          });
        } catch (e) {
          element.style.display = "none";
        }
      } else if (type === "b64") {
        try {
          const decoded = atob(val.trim());
          element.innerHTML = `
            <div class="inline-inspector-header">
              <span>Base64 Decoded Value</span>
              <div style="display: flex; gap: 4px;">
                <button class="tool-btn secondary" style="padding: 2px 6px; font-size: 10px; height: auto;" id="btn-replace-b64-${idx}">Replace inline</button>
                <button class="tool-btn secondary" style="padding: 2px 6px; font-size: 10px; height: auto;" id="btn-copy-b64-${idx}">Copy</button>
              </div>
            </div>
            <div class="inline-inspector-body">${decoded}</div>
          `;
          element.querySelector(`#btn-copy-b64-${idx}`).addEventListener("click", (e) => {
            e.stopPropagation();
            appInstance.copyText(decoded);
          });
          element.querySelector(`#btn-replace-b64-${idx}`).addEventListener("click", (e) => {
            e.stopPropagation();
            params[idx].value = decoded;
            renderParams();
            rebuildUrl();
          });
        } catch (e) {
          element.style.display = "none";
        }
      }
    };

    // Bulk textarea utilities
    const updateBulkTextarea = () => {
      const lines = params.map(p => p.key ? `${p.key}: ${p.value}` : "").filter(Boolean);
      bulkInput.value = lines.join("\n");
    };

    const parseBulkTextarea = () => {
      const raw = bulkInput.value;
      const lines = raw.split("\n");
      params = [];
      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        
        let delimiter = ":";
        let dIdx = trimmed.indexOf(":");
        const eIdx = trimmed.indexOf("=");
        
        // Find which delimiter occurs first
        if (dIdx === -1 || (eIdx !== -1 && eIdx < dIdx)) {
          dIdx = eIdx;
          delimiter = "=";
        }

        if (dIdx !== -1) {
          const key = trimmed.substring(0, dIdx).trim();
          const value = trimmed.substring(dIdx + 1).trim();
          params.push({ key, value });
        } else {
          // If no key-value separator, treat entire line as key with empty value
          params.push({ key: trimmed, value: "" });
        }
      });
      rebuildUrl();
    };

    // Tab toggling triggers
    tabGridBtn.addEventListener("click", () => {
      if (activeLeftTab === "grid") return;
      activeLeftTab = "grid";
      tabGridBtn.classList.add("active");
      tabBulkBtn.classList.remove("active");
      paramsContainer.style.display = "flex";
      bulkContainer.style.display = "none";
      renderParams();
    });

    tabBulkBtn.addEventListener("click", () => {
      if (activeLeftTab === "bulk") return;
      activeLeftTab = "bulk";
      tabBulkBtn.classList.add("active");
      tabGridBtn.classList.remove("active");
      paramsContainer.style.display = "none";
      bulkContainer.style.display = "flex";
      updateBulkTextarea();
    });

    bulkInput.addEventListener("input", parseBulkTextarea);

    // Rebuild tabs selector (Output vs UTM vs JSON)
    const switchRightTab = (tabName) => {
      activeRightTab = tabName;
      Object.keys(rightTabs).forEach(k => {
        if (k === tabName) {
          rightTabs[k].classList.add("active");
          rightContents[k].style.display = (k === "utm") ? "flex" : "block";
        } else {
          rightTabs[k].classList.remove("active");
          rightContents[k].style.display = "none";
        }
      });

      if (tabName === "json") {
        rebuildUrl(); // Refreshes the JSON text area content
      }
    };

    rightTabs.output.addEventListener("click", () => switchRightTab("output"));
    rightTabs.utm.addEventListener("click", () => switchRightTab("utm"));
    rightTabs.json.addEventListener("click", () => switchRightTab("json"));

    // Operations toolbar functions
    toggleDecodeBtn.addEventListener("click", () => {
      encodeOutput = !encodeOutput;
      if (encodeOutput) {
        toggleDecodeBtn.style.borderColor = "rgba(var(--accent-cyan-rgb), 0.25)";
        toggleDecodeBtn.style.color = "var(--text-main)";
        appInstance.showToast("URL Output will now be fully encoded.", "info");
      } else {
        toggleDecodeBtn.style.borderColor = "var(--accent-rose)";
        toggleDecodeBtn.style.color = "var(--accent-rose)";
        appInstance.showToast("URL Output will now be fully decoded.", "info");
      }
      rebuildUrl();
    });

    stripTrackingBtn.addEventListener("click", () => {
      const trackingKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid", "ref", "clickid"];
      const beforeCount = params.length;
      params = params.filter(p => !trackingKeys.includes(p.key.toLowerCase()));
      const afterCount = params.length;
      
      renderParams();
      rebuildUrl();
      appInstance.showToast(`Removed ${beforeCount - afterCount} tracking parameters!`, "success");
    });

    stripEmptyBtn.addEventListener("click", () => {
      const beforeCount = params.length;
      params = params.filter(p => p.key.trim() !== "" && p.value.trim() !== "");
      const afterCount = params.length;
      
      renderParams();
      rebuildUrl();
      appInstance.showToast(`Cleaned ${beforeCount - afterCount} empty parameter rows!`, "success");
    });

    clearAllParamsBtn.addEventListener("click", () => {
      params = [];
      renderParams();
      rebuildUrl();
      appInstance.showToast("Cleared all parameters!", "info");
    });

    // UTM Form utilities
    const updateParamsFromUtmForm = () => {
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
      
      // Remove existing UTMs
      params = params.filter(p => !utmKeys.includes(p.key.toLowerCase()));

      // Read form inputs and append them
      Object.keys(utmInputs).forEach(k => {
        const val = utmInputs[k].value.trim();
        if (val) {
          params.push({ key: "utm_" + k, value: val });
        }
      });

      renderParams();
      rebuildUrl();
    };

    const updateUtmFormFromParams = () => {
      const utmMap = {
        "utm_source": utmInputs.source,
        "utm_medium": utmInputs.medium,
        "utm_campaign": utmInputs.campaign,
        "utm_term": utmInputs.term,
        "utm_content": utmInputs.content
      };

      // Clear all fields first to prevent residual text
      Object.keys(utmMap).forEach(key => {
        utmMap[key].value = "";
      });

      params.forEach(p => {
        const lower = p.key.toLowerCase();
        if (utmMap[lower]) {
          utmMap[lower].value = p.value;
        }
      });
    };

    // Bind UTM Form Keypress Events
    Object.keys(utmInputs).forEach(key => {
      utmInputs[key].addEventListener("input", updateParamsFromUtmForm);
    });

    utmClearBtn.addEventListener("click", () => {
      Object.keys(utmInputs).forEach(key => {
        utmInputs[key].value = "";
      });
      updateParamsFromUtmForm();
      appInstance.showToast("Cleared UTM Campaign parameters!", "info");
    });

    // JSON payload editor
    jsonApplyBtn.addEventListener("click", () => {
      try {
        const parsed = JSON.parse(jsonOutput.value);
        params = [];
        
        Object.keys(parsed).forEach(key => {
          const val = parsed[key];
          if (Array.isArray(val)) {
            val.forEach(item => {
              params.push({ key, value: String(item) });
            });
          } else {
            params.push({ key, value: String(val) });
          }
        });

        renderParams();
        rebuildUrl();
        appInstance.showToast("Applied JSON fields to parameters!", "success");
      } catch (err) {
        appInstance.showToast("Invalid JSON syntax. Please check the brackets and quotes.", "error");
      }
    });

    jsonCopyBtn.addEventListener("click", () => {
      appInstance.copyText(jsonOutput.value);
    });

    // QR Canvas renderer
    const drawQR = (text) => {
      if (!qrCanvas) return;
      const ctx = qrCanvas.getContext("2d");
      
      // Clear canvas
      ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
      
      if (!text) {
        // Draw centered QR Code placeholder icon/text
        ctx.fillStyle = "#f3f4f6";
        ctx.fillRect(0, 0, qrCanvas.width, qrCanvas.height);
        ctx.fillStyle = "#9ca3af";
        ctx.font = "11px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Waiting for URL...", qrCanvas.width / 2, qrCanvas.height / 2);
        return;
      }

      try {
        const qr = QRCode.generate(text, "L");
        const size = qr.size;
        const modules = qr.modules;
        
        const padding = 6;
        const width = qrCanvas.width - (padding * 2);
        const cellSize = width / size;
        
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, qrCanvas.width, qrCanvas.height);
        
        ctx.fillStyle = "#0f172a"; // Sleek deep slate dark color for codes
        for (let r = 0; r < size; r++) {
          for (let c = 0; c < size; c++) {
            if (modules[r][c]) {
              ctx.fillRect(
                padding + (c * cellSize), 
                padding + (r * cellSize), 
                cellSize + 0.3, // Add slight overlap to remove visual grid-lines
                cellSize + 0.3
              );
            }
          }
        }
      } catch (err) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, qrCanvas.width, qrCanvas.height);
        ctx.fillStyle = "#ef4444";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("URL Too Long for QR", qrCanvas.width / 2, qrCanvas.height / 2);
      }
    };

    // Primary Text URL input parser trigger
    input.addEventListener("input", () => {
      const val = input.value.trim();
      renderUrlInspector(val);

      if (!val) {
        baseUrl = "";
        params = [];
        renderParams();
        output.value = "";
        drawQR("");
        jsonOutput.value = "{}";
        return;
      }

      try {
        const urlObj = new URL(val);
        baseUrl = urlObj.origin + urlObj.pathname;
        params = [];
        urlObj.searchParams.forEach((value, key) => {
          params.push({ key, value });
        });
        renderParams();
        rebuildUrl();
      } catch (e) {
        // Fallback for partial URL or raw query strings
        const qIndex = val.indexOf("?");
        if (qIndex !== -1) {
          baseUrl = val.substring(0, qIndex);
          const qParams = new URLSearchParams(val.substring(qIndex));
          params = [];
          qParams.forEach((value, key) => {
            params.push({ key, value });
          });
          renderParams();
          rebuildUrl();
        } else {
          baseUrl = val;
          params = [];
          renderParams();
          output.value = val;
          drawQR(val);
        }
      }
    });

    // Add row parameter button click
    container.querySelector("#url-param-add")?.addEventListener("click", () => {
      params.push({ key: "", value: "" });
      renderParams();
      rebuildUrl();
    });

    container.querySelector("#url-copy-btn")?.addEventListener("click", () => {
      appInstance.copyText(output.value);
    });

    // Examples Tab Switching
    let activeExampleIndex = 0;
    const tabBtns = container.querySelectorAll(".tool-guide-example-tab-btn");
    const rows = container.querySelectorAll(".tool-guide-io-row");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeExampleIndex = parseInt(btn.getAttribute("data-index"), 10);
        rows.forEach((row, idx) => {
          row.style.display = (idx === activeExampleIndex) ? "flex" : "none";
        });
      });
    });

    container.querySelector("#url-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        input.value = "https://api.github.com/repos/git/commits?per_page=10&page=2";
        input.dispatchEvent(new Event("input"));
        appInstance.showToast("Loaded sample API endpoint URL!", "info");
      } else {
        input.value = "https://myshop.com/sales?utm_source=newsletter&utm_medium=email&utm_campaign=summer_promo";
        input.dispatchEvent(new Event("input"));
        appInstance.showToast("Loaded sample UTM marketing URL!", "info");
      }
    });
  }
};
