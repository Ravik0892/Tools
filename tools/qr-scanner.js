// OmniTool Hub - Online QR Code Scanner
// 100% Client-Side QR & Barcode Scanner supporting Drag & Drop, Clipboard Paste, and Live Camera Streams.

import { escapeHtml } from './utils.js';

export default {
  id: "qr-scanner",
  name: "QR Code Scanner Online",

  videoStream: null,
  animFrameId: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Input Scanner Panel (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">QR Code Scanner</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Decode QR codes from images, screenshots, or live camera feeds with 100% privacy.
              </p>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="tool-btn secondary qrs-mode-btn active" data-mode="image" style="font-size: 11px; padding: 4px 10px;">Upload / Paste</button>
              <button class="tool-btn secondary qrs-mode-btn" data-mode="camera" style="font-size: 11px; padding: 4px 10px;">Live Camera</button>
            </div>
          </div>

          <!-- Mode 1: Image Dropzone & Paste -->
          <div id="qrs-view-image" class="qrs-view-panel">
            <div id="qrs-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 240px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 48px; height: 48px; color: var(--accent-cyan); margin-bottom: 12px;">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
                Drag &amp; drop QR image here, browse file, or press <kbd style="background: rgba(255,255,255,0.1); border: 1px solid var(--border-color); border-radius: 4px; padding: 1px 6px; font-size: 11px; font-family: var(--font-mono);">Ctrl + V</kbd>
              </div>
              <div style="font-size: 11px; color: var(--text-muted);">
                Supports PNG, JPG, WebP, SVG, and GIF screenshots.
              </div>
              <input type="file" id="qrs-file-input" accept="image/*" style="display: none;">
            </div>

            <!-- Image Preview Canvas Box (Hidden until image selected) -->
            <div id="qrs-preview-box" style="display: none; margin-top: 14px; text-align: center;">
              <div style="position: relative; display: inline-block; max-width: 100%; border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.4);">
                <canvas id="qrs-image-canvas" style="max-width: 100%; max-height: 260px; display: block;"></canvas>
                <div id="qrs-highlight-box" style="display: none; position: absolute; border: 3px solid #10b981; background: rgba(16, 185, 129, 0.2); pointer-events: none; border-radius: 4px;"></div>
              </div>
              <div style="margin-top: 8px; display: flex; justify-content: center; gap: 8px;">
                <button class="tool-btn secondary" id="qrs-clear-image-btn" style="font-size: 11px; padding: 4px 10px;">Scan Another Image</button>
              </div>
            </div>
          </div>

          <!-- Mode 2: Live Camera Viewfinder -->
          <div id="qrs-view-camera" class="qrs-view-panel" style="display: none;">
            <div style="position: relative; width: 100%; height: 280px; background: #000; border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color); display: flex; align-items: center; justify-content: center;">
              <video id="qrs-video" autoplay playsinline muted style="width: 100%; height: 100%; object-fit: cover;"></video>
              <canvas id="qrs-video-canvas" style="display: none;"></canvas>

              <!-- Viewfinder Overlay Reticle -->
              <div id="qrs-reticle" style="position: absolute; width: 200px; height: 200px; border: 2px solid rgba(0, 242, 254, 0.7); border-radius: 16px; box-shadow: 0 0 0 4000px rgba(0,0,0,0.5); pointer-events: none; overflow: hidden;">
                <!-- Animated Laser Scanner Line -->
                <div style="position: absolute; width: 100%; height: 2px; background: linear-gradient(90deg, transparent, #00f2fe, #ff007f, transparent); animation: qrs-scan 2s infinite ease-in-out;"></div>
              </div>

              <!-- Camera Permissions / Idle Overlay -->
              <div id="qrs-camera-placeholder" style="position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(10, 15, 30, 0.95); z-index: 10; padding: 20px; text-align: center;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 44px; height: 44px; color: var(--accent-cyan); margin-bottom: 12px;">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
                <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">Camera Access Required</div>
                <p style="font-size: 11px; color: var(--text-muted); max-width: 280px; margin-bottom: 14px;">
                  Allow camera permission to scan QR codes in real-time. Video processing stays strictly on your device.
                </p>
                <button class="tool-btn primary" id="qrs-start-camera-btn" style="font-size: 12px; padding: 6px 16px;">
                  <span>Enable Camera Stream</span>
                </button>
              </div>
            </div>

            <!-- Camera Controls Bar -->
            <div id="qrs-camera-controls" style="display: none; justify-content: space-between; align-items: center; margin-top: 10px;">
              <select id="qrs-camera-select" class="form-select" style="max-width: 200px; height: 32px; font-size: 11px;"></select>
              <button class="tool-btn secondary" id="qrs-stop-camera-btn" style="font-size: 11px; padding: 4px 10px; color: var(--accent-rose);">Stop Camera</button>
            </div>
          </div>
        </div>

        <!-- Decoded Results Panel (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Decoded Content</h3>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="tool-btn secondary" id="qrs-copy-result-btn" style="font-size: 11px; padding: 4px 10px;" disabled>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
              <button class="tool-btn primary" id="qrs-open-url-btn" style="font-size: 11px; padding: 4px 12px; display: none;">
                <span>Open URL ↗</span>
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div id="qrs-empty-result" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 260px; text-align: center; border: 1px dashed var(--border-color); border-radius: 8px; background: rgba(0,0,0,0.15); padding: 20px;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 40px; height: 40px; color: var(--text-muted); margin-bottom: 10px;">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div style="font-size: 13px; font-weight: 600; color: var(--text-muted);">No QR code detected yet</div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Upload an image or start camera stream to scan.</div>
          </div>

          <!-- Success State Card -->
          <div id="qrs-success-card" style="display: none;">
            <!-- Badge & Type Row -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid var(--border-color);">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span id="qrs-type-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 2px 10px; font-size: 11px; font-weight: 700; text-transform: uppercase;">
                  TEXT
                </span>
                <span id="qrs-format-badge" style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono);">QR Code</span>
              </div>
              <span id="qrs-time-badge" style="font-size: 11px; color: var(--text-muted);">Decoded in 12ms</span>
            </div>

            <!-- Structured WiFi Details Card (shown only if wifi) -->
            <div id="qrs-wifi-details" style="display: none; margin-bottom: 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; padding: 12px;">
              <div style="font-size: 12px; font-weight: 700; color: var(--accent-cyan); margin-bottom: 8px;">📶 WiFi Network Credentials</div>
              <div style="display: grid; grid-template-columns: 100px 1fr; gap: 6px; font-size: 12px;">
                <span style="color: var(--text-muted);">Network (SSID):</span>
                <strong id="qrs-wifi-ssid" style="color: var(--text-main);">-</strong>
                <span style="color: var(--text-muted);">Security:</span>
                <span id="qrs-wifi-auth" style="font-family: var(--font-mono);">-</span>
                <span style="color: var(--text-muted);">Password:</span>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <strong id="qrs-wifi-pass" style="color: #10b981; font-family: var(--font-mono);">-</strong>
                  <button class="tool-btn secondary" id="qrs-copy-wifi-pass" style="font-size: 10px; padding: 1px 6px; height: 22px;">Copy Password</button>
                </div>
              </div>
            </div>

            <!-- Full Raw Decoded Payload Textarea -->
            <div class="form-group" style="margin-bottom: 12px;">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Raw Payload Content</label>
              <textarea id="qrs-result-text" class="input-textarea" style="width: 100%; height: 160px; font-family: var(--font-mono); font-size: 13px; line-height: 1.5; padding: 12px; background: rgba(0,0,0,0.3); border-color: var(--border-color); color: var(--text-main); resize: vertical;" readonly spellcheck="false"></textarea>
            </div>
          </div>
        </div>
      
        <!-- Dynamic Guide Card (Unified standard footer guide) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>QUICK GUIDE: QR CODE & BARCODE SCANNER</span>
            </div>
          </div>
          <div class="tool-guide-steps">

            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Choose Input Source</strong>: Enable live camera stream for instant point-and-scan detection or upload any QR code image file.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Auto-Detect & Decode</strong>: Hardware-accelerated BarcodeDetector and jsQR parse 1D/2D symbologies with millisecond latency.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Copy or Open Decoded Content</strong>: View raw string payloads, formatted URLs, Wi-Fi keys, or vCards, and copy output with one click.</div>
            </div>
          </div>
        </div>
      </div>

      <style>
        @keyframes qrs-scan {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0.8; }
        }
      </style>
    `;
  },

  async init(container, appInstance) {
    let jsQRLib = null;
    let currentMode = "image";

    const dropzone = container.querySelector("#qrs-dropzone");
    const fileInput = container.querySelector("#qrs-file-input");
    const previewBox = container.querySelector("#qrs-preview-box");
    const imageCanvas = container.querySelector("#qrs-image-canvas");
    const highlightBox = container.querySelector("#qrs-highlight-box");
    const clearImageBtn = container.querySelector("#qrs-clear-image-btn");

    const viewImage = container.querySelector("#qrs-view-image");
    const viewCamera = container.querySelector("#qrs-view-camera");
    const video = container.querySelector("#qrs-video");
    const videoCanvas = container.querySelector("#qrs-video-canvas");
    const cameraPlaceholder = container.querySelector("#qrs-camera-placeholder");
    const cameraControls = container.querySelector("#qrs-camera-controls");
    const cameraSelect = container.querySelector("#qrs-camera-select");
    const startCameraBtn = container.querySelector("#qrs-start-camera-btn");
    const stopCameraBtn = container.querySelector("#qrs-stop-camera-btn");

    const emptyResult = container.querySelector("#qrs-empty-result");
    const successCard = container.querySelector("#qrs-success-card");
    const resultText = container.querySelector("#qrs-result-text");
    const typeBadge = container.querySelector("#qrs-type-badge");
    const timeBadge = container.querySelector("#qrs-time-badge");
    const copyResultBtn = container.querySelector("#qrs-copy-result-btn");
    const openUrlBtn = container.querySelector("#qrs-open-url-btn");

    const wifiDetails = container.querySelector("#qrs-wifi-details");
    const wifiSsid = container.querySelector("#qrs-wifi-ssid");
    const wifiAuth = container.querySelector("#qrs-wifi-auth");
    const wifiPass = container.querySelector("#qrs-wifi-pass");
    const copyWifiPassBtn = container.querySelector("#qrs-copy-wifi-pass");

    // Load jsQR dynamically on demand
    const loadJsQR = () => {
      return new Promise((resolve, reject) => {
        if (window.jsQR) {
          jsQRLib = window.jsQR;
          resolve(window.jsQR);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/jsqr/1.4.0/jsQR.min.js";
        script.onload = () => {
          jsQRLib = window.jsQR;
          resolve(window.jsQR);
        };
        script.onerror = () => reject(new Error("Failed to load QR decoding engine"));
        document.head.appendChild(script);
      });
    };

    // Mode tab toggle
    container.querySelectorAll(".qrs-mode-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".qrs-mode-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentMode = btn.dataset.mode;

        if (currentMode === "image") {
          viewImage.style.display = "block";
          viewCamera.style.display = "none";
          stopCamera();
        } else {
          viewImage.style.display = "none";
          viewCamera.style.display = "block";
        }
      });
    });

    // File Drop & Click handlers
    dropzone.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      if (e.target.files && e.target.files[0]) {
        handleImageFile(e.target.files[0]);
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
        handleImageFile(e.dataTransfer.files[0]);
      }
    });

    // Clipboard Paste Listener
    const pasteListener = (e) => {
      if (currentMode !== "image") return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          if (file) {
            handleImageFile(file);
            appInstance.showToast("Pasted image from clipboard!", "info");
            break;
          }
        }
      }
    };
    window.addEventListener("paste", pasteListener);
    this._pasteListener = pasteListener;

    clearImageBtn.addEventListener("click", () => {
      previewBox.style.display = "none";
      dropzone.style.display = "flex";
      emptyResult.style.display = "flex";
      successCard.style.display = "none";
      copyResultBtn.disabled = true;
      openUrlBtn.style.display = "none";
      fileInput.value = "";
    });

    async function handleImageFile(file) {
      dropzone.style.display = "none";
      previewBox.style.display = "block";
      highlightBox.style.display = "none";

      const reader = new FileReader();
      reader.onload = async (event) => {
        const img = new Image();
        img.onload = async () => {
          imageCanvas.width = img.width;
          imageCanvas.height = img.height;
          const ctx = imageCanvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          try {
            await loadJsQR();
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            const startTime = performance.now();
            const code = jsQRLib(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "dontInvert"
            }) || jsQRLib(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: "attemptBoth"
            });
            const elapsed = Math.round(performance.now() - startTime);

            if (code && code.data) {
              displaySuccessResult(code.data, elapsed);

              // Draw bounding box if location available
              if (code.location) {
                const loc = code.location;
                const minX = Math.min(loc.topLeftCorner.x, loc.bottomLeftCorner.x);
                const minY = Math.min(loc.topLeftCorner.y, loc.topRightCorner.y);
                const maxX = Math.max(loc.topRightCorner.x, loc.bottomRightCorner.x);
                const maxY = Math.max(loc.bottomLeftCorner.y, loc.bottomRightCorner.y);

                const scaleX = imageCanvas.clientWidth / img.width;
                const scaleY = imageCanvas.clientHeight / img.height;

                highlightBox.style.left = `${minX * scaleX}px`;
                highlightBox.style.top = `${minY * scaleY}px`;
                highlightBox.style.width = `${(maxX - minX) * scaleX}px`;
                highlightBox.style.height = `${(maxY - minY) * scaleY}px`;
                highlightBox.style.display = "block";
              }
            } else {
              displayNoQRFound();
            }
          } catch (err) {
            appInstance.showToast("QR decode error: " + err.message, "error");
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }

    function displaySuccessResult(payload, elapsedMs = 15) {
      emptyResult.style.display = "none";
      successCard.style.display = "block";
      resultText.value = payload;
      timeBadge.innerText = `Decoded in ${elapsedMs}ms`;
      copyResultBtn.disabled = false;

      // Identify Content Type
      wifiDetails.style.display = "none";
      openUrlBtn.style.display = "none";

      const trimmed = payload.trim();

      if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
        typeBadge.innerText = "WEBSITE URL";
        typeBadge.style.color = "var(--accent-cyan)";
        typeBadge.style.background = "rgba(0, 242, 254, 0.15)";
        typeBadge.style.borderColor = "rgba(0, 242, 254, 0.3)";
        openUrlBtn.style.display = "inline-flex";
        openUrlBtn.onclick = () => window.open(trimmed, "_blank", "noopener,noreferrer");
      } else if (trimmed.startsWith("WIFI:")) {
        typeBadge.innerText = "WIFI NETWORK";
        typeBadge.style.color = "#10b981";
        typeBadge.style.background = "rgba(16, 185, 129, 0.15)";
        typeBadge.style.borderColor = "rgba(16, 185, 129, 0.3)";

        // Parse WIFI:T:WPA;S:MySSID;P:MyPassword;;
        const ssidMatch = trimmed.match(/S:([^;]+);/i);
        const authMatch = trimmed.match(/T:([^;]+);/i);
        const passMatch = trimmed.match(/P:([^;]+);/i);

        wifiSsid.innerText = ssidMatch ? ssidMatch[1] : "(Hidden)";
        wifiAuth.innerText = authMatch ? authMatch[1] : "WPA/WPA2";
        const password = passMatch ? passMatch[1] : "";
        wifiPass.innerText = password || "(None / Open)";

        wifiDetails.style.display = "block";

        copyWifiPassBtn.onclick = () => {
          if (password) {
            navigator.clipboard.writeText(password).then(() => {
              appInstance.showToast("WiFi password copied!", "success");
            });
          }
        };
      } else if (trimmed.startsWith("mailto:") || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        typeBadge.innerText = "EMAIL ADDRESS";
        typeBadge.style.color = "var(--accent-purple)";
        typeBadge.style.background = "rgba(157, 78, 221, 0.15)";
        typeBadge.style.borderColor = "rgba(157, 78, 221, 0.3)";
      } else if (trimmed.startsWith("tel:") || /^\+?[0-9\s-]{7,16}$/.test(trimmed)) {
        typeBadge.innerText = "PHONE NUMBER";
        typeBadge.style.color = "#f59e0b";
        typeBadge.style.background = "rgba(245, 158, 11, 0.15)";
        typeBadge.style.borderColor = "rgba(245, 158, 11, 0.3)";
      } else {
        typeBadge.innerText = "PLAIN TEXT";
        typeBadge.style.color = "#10b981";
        typeBadge.style.background = "rgba(16, 185, 129, 0.15)";
        typeBadge.style.borderColor = "rgba(16, 185, 129, 0.3)";
      }

      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    }

    function displayNoQRFound() {
      emptyResult.style.display = "flex";
      emptyResult.innerHTML = `
        <span style="font-size: 28px; margin-bottom: 8px;">🔍</span>
        <div style="font-size: 13px; font-weight: 700; color: var(--accent-rose);">No clear QR code detected</div>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px; max-width: 260px;">
          Try cropping closer to the QR pattern or increasing image brightness & contrast.
        </div>
      `;
      successCard.style.display = "none";
      copyResultBtn.disabled = true;
      openUrlBtn.style.display = "none";
    }

    // Camera Handlers
    startCameraBtn.addEventListener("click", async () => {
      try {
        await loadJsQR();
        await startCamera();
      } catch (err) {
        appInstance.showToast("Camera access error: " + err.message, "error");
      }
    });

    stopCameraBtn.addEventListener("click", () => {
      stopCamera();
    });

    async function startCamera(deviceId = null) {
      stopCamera();

      const constraints = {
        video: deviceId ? { deviceId: { exact: deviceId } } : { facingMode: "environment" },
        audio: false
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.videoStream = stream;
        video.srcObject = stream;
        cameraPlaceholder.style.display = "none";
        cameraControls.style.display = "flex";

        // Enumerate video devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(d => d.kind === "videoinput");
        cameraSelect.innerHTML = "";
        videoDevices.forEach((dev, idx) => {
          const opt = document.createElement("option");
          opt.value = dev.deviceId;
          opt.text = dev.label || `Camera ${idx + 1}`;
          if (deviceId && dev.deviceId === deviceId) opt.selected = true;
          cameraSelect.appendChild(opt);
        });

        cameraSelect.onchange = () => {
          startCamera(cameraSelect.value);
        };

        video.onloadedmetadata = () => {
          video.play();
          scanCameraFrame();
        };
      } catch (err) {
        throw new Error("Unable to access camera. Please verify camera permissions in your browser.");
      }
    }

    function scanCameraFrame() {
      if (!this.videoStream) return;

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        videoCanvas.width = video.videoWidth;
        videoCanvas.height = video.videoHeight;
        const ctx = videoCanvas.getContext("2d");
        ctx.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);

        const imageData = ctx.getImageData(0, 0, videoCanvas.width, videoCanvas.height);
        const code = jsQRLib(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert"
        });

        if (code && code.data) {
          displaySuccessResult(code.data);
          appInstance.showToast("QR Code recognized!", "success");
          // Pause camera after successful scan
          stopCamera();
          return;
        }
      }

      this.animFrameId = requestAnimationFrame(scanCameraFrame.bind(this));
    }

    function stopCamera() {
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
      if (this.videoStream) {
        this.videoStream.getTracks().forEach(t => t.stop());
        this.videoStream = null;
      }
      if (video) video.srcObject = null;
      cameraPlaceholder.style.display = "flex";
      cameraControls.style.display = "none";
    }

    this.stopCamera = stopCamera.bind(this);

    copyResultBtn.addEventListener("click", () => {
      if (!resultText.value) return;
      navigator.clipboard.writeText(resultText.value).then(() => {
        appInstance.showToast("QR Content copied to clipboard!", "success");
      });
    });
  },

  cleanup() {
    if (this._pasteListener) {
      window.removeEventListener("paste", this._pasteListener);
    }
    if (typeof this.stopCamera === "function") {
      this.stopCamera();
    }
  }
};
