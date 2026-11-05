import fs from 'fs';

let content = fs.readFileSync('tools/screenshot-capture.js', 'utf8');

// Normalize line endings for replacement
const isCRLF = content.includes('\r\n');
let normalized = content.replace(/\r\n/g, '\n');

// 1. Patch init to call the three setup functions and initialize stitchImages
const oldInit = `    // Setup Event Listeners
    this.setupTabNavigation();
    this.setupCaptureEvents();
    this.setupMockupEvents();
    this.setupBackdropEvents();
    this.setupAnnotationEvents();
    this.setupCanvasInteractions();
    this.setupExportActions();
    this.setupTextOverlayEvents();
    this.setupOcrEvents();`;

const newInit = `    this.stitchImages = [];
    this.sandboxVisualEdit = false;
    this.sandboxIsScrollable = true;

    // Setup Event Listeners
    this.setupTabNavigation();
    this.setupCaptureEvents();
    this.setupMockupEvents();
    this.setupBackdropEvents();
    this.setupAnnotationEvents();
    this.setupCanvasInteractions();
    this.setupExportActions();
    this.setupTextOverlayEvents();
    this.setupOcrEvents();
    this.setupBookmarkletEvents();
    this.setupHtmlSandboxEvents();
    this.setupStitcherEvents();`;

if (!normalized.includes(oldInit)) {
  console.error("Could not find oldInit target in tools/screenshot-capture.js");
  process.exit(1);
}
normalized = normalized.replace(oldInit, newInit);

// 2. Make overlays position: fixed; inset: 0; z-index: 9999; for full-screen prominent modal display
normalized = normalized.replace(
  'id="sc-bookmarklet-overlay" style="display: none; position: absolute; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); z-index: 60;',
  'id="sc-bookmarklet-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); z-index: 9999;'
);

normalized = normalized.replace(
  'id="sc-html-sandbox-overlay" style="display: none; position: absolute; inset: 0; background: rgba(0, 0, 0, 0.88); backdrop-filter: blur(10px); z-index: 60;',
  'id="sc-html-sandbox-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88); backdrop-filter: blur(10px); z-index: 9999;'
);

normalized = normalized.replace(
  'id="sc-stitcher-overlay" style="display: none; position: absolute; inset: 0; background: rgba(0, 0, 0, 0.88); backdrop-filter: blur(10px); z-index: 60;',
  'id="sc-stitcher-overlay" style="display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.88); backdrop-filter: blur(10px); z-index: 9999;'
);

// 3. Add backdrop click-to-close on bookmarklet, sandbox, and stitcher overlays
normalized = normalized.replace(
  '    closeBtn?.addEventListener("click", closeBm);\n    doneBtn?.addEventListener("click", closeBm);',
  '    closeBtn?.addEventListener("click", closeBm);\n    doneBtn?.addEventListener("click", closeBm);\n    overlay?.addEventListener("click", (e) => { if (e.target === overlay) closeBm(); });'
);

normalized = normalized.replace(
  '    closeBtn?.addEventListener("click", closeSandbox);\n    cancelBtn?.addEventListener("click", closeSandbox);',
  '    closeBtn?.addEventListener("click", closeSandbox);\n    cancelBtn?.addEventListener("click", closeSandbox);\n    overlay?.addEventListener("click", (e) => { if (e.target === overlay) closeSandbox(); });'
);

normalized = normalized.replace(
  '    closeBtn?.addEventListener("click", closeStitch);\n    cancelBtn?.addEventListener("click", closeStitch);',
  '    closeBtn?.addEventListener("click", closeStitch);\n    cancelBtn?.addEventListener("click", closeStitch);\n    overlay?.addEventListener("click", (e) => { if (e.target === overlay) closeStitch(); });'
);

// 4. In openSandbox, re-render if code exists
normalized = normalized.replace(
  `    const openSandbox = () => {
      if (overlay) overlay.style.display = "flex";
      if (!codeInput?.value) {
        this.loadHtmlSandboxPreset("pricing");
      }
    };`,
  `    const openSandbox = () => {
      if (overlay) overlay.style.display = "flex";
      if (!codeInput?.value) {
        this.loadHtmlSandboxPreset("pricing");
      } else {
        this.updateHtmlSandboxPreview();
      }
    };`
);

// 5. In setupStitcherEvents, add drag and drop to dropzone
normalized = normalized.replace(
  `    dropzone?.addEventListener("click", () => fileInput?.click());
    fileInput?.addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []);
      this.loadStitchFiles(files);
      fileInput.value = "";
    });`,
  `    dropzone?.addEventListener("click", () => fileInput?.click());
    dropzone?.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "var(--accent-cyan)";
      dropzone.style.background = "rgba(0, 242, 254, 0.08)";
    });
    dropzone?.addEventListener("dragleave", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "rgba(0, 242, 254, 0.3)";
      dropzone.style.background = "rgba(0, 242, 254, 0.02)";
    });
    dropzone?.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.style.borderColor = "rgba(0, 242, 254, 0.3)";
      dropzone.style.background = "rgba(0, 242, 254, 0.02)";
      const files = Array.from(e.dataTransfer?.files || []);
      this.loadStitchFiles(files);
    });
    fileInput?.addEventListener("change", (e) => {
      const files = Array.from(e.target.files || []);
      this.loadStitchFiles(files);
      fileInput.value = "";
    });`
);

// 6. Filter image files in loadStitchFiles
normalized = normalized.replace(
  `  loadStitchFiles(files) {
    if (!files || files.length === 0) return;
    let loaded = 0;
    files.forEach(file => {
      if (!file.type.startsWith("image/")) return;`,
  `  loadStitchFiles(files) {
    if (!files || files.length === 0) return;
    const imageFiles = files.filter(f => f.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      this.app?.showToast("Please select valid image files.", "info");
      return;
    }
    let loaded = 0;
    imageFiles.forEach(file => {`
);

// Restore CRLF if needed
const finalContent = isCRLF ? normalized.replace(/\n/g, '\r\n') : normalized;
fs.writeFileSync('tools/screenshot-capture.js', finalContent, 'utf8');
fs.writeFileSync('omnitool-android-app/app/src/main/assets/web/tools/screenshot-capture.js', finalContent, 'utf8');

console.log('Successfully patched tools/screenshot-capture.js and synced Android asset!');

