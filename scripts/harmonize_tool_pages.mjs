import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log(' HARMONIZING TOOL PAGES: CANONICAL UI & FULLSCREEN');
console.log('====================================================\n');

const toolsDir = 'tools';
const androidToolsDir = path.join('omnitool-android-app', 'app', 'src', 'main', 'assets', 'web', 'tools');

// 1. Fix text-diff.js: Remove hardcoded duplicate reset & fullscreen buttons
const textDiffPath = path.join(toolsDir, 'text-diff.js');
let textDiffCode = fs.readFileSync(textDiffPath, 'utf8');

// Target the buttons in panel-header
const oldDiffHeaderTarget = `              <button class="reset-split-btn tool-btn secondary" id="diff-reset-split-btn" style="font-size: 11px; padding: 4px 8px; gap: 4px; display: inline-flex; align-items: center;" title="Reset sections to 50/50 layout">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <polyline points="3 3 3 8 8 8"></polyline>
                </svg>
                <span>Reset 50/50</span>
              </button>
              <button class="preview-fullscreen-btn tool-btn secondary" id="diff-fullscreen-btn" style="font-size: 11px; padding: 4px 8px; gap: 4px; display: inline-flex; align-items: center;" title="Toggle Full Screen view">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
                <span>Full Screen</span>
              </button>`;

if (textDiffCode.includes(oldDiffHeaderTarget)) {
  textDiffCode = textDiffCode.replace(oldDiffHeaderTarget, '');
  console.log('[PASS] Removed hardcoded Fullscreen & Reset buttons from text-diff.js renderUI (delegated to app.js dynamic injection)');
}

// Also remove manual listeners for diff-reset-split-btn and diff-fullscreen-btn
const oldDiffListenersTarget = `    const resetSplitBtn = container.querySelector("#diff-reset-split-btn");
    const fsBtn = container.querySelector("#diff-fullscreen-btn");
    const splitLayout = container.querySelector(".tool-content-layout.split-view");
    const rightPanel = container.querySelectorAll(".tool-panel")[1];

    resetSplitBtn?.addEventListener("click", () => {
      appInstance.playSynthSound?.('click');
      if (splitLayout) {
        splitLayout.classList.add("is-animating");
        splitLayout.style.removeProperty("--split-ratio");
        localStorage.removeItem("omnitool_split_text-diff");
        setTimeout(() => splitLayout.classList.remove("is-animating"), 300);
      }
      appInstance.showToast("Layout reset to default (50/50)", "info");
    });

    fsBtn?.addEventListener("click", () => {
      appInstance.playSynthSound?.('click');
      if (rightPanel && splitLayout) {
        const isFS = rightPanel.classList.toggle("preview-fullscreen");
        splitLayout.classList.toggle("has-fullscreen-preview", isFS);
        if (isFS) {
          fsBtn.innerHTML = \`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <path d="M4 14h6v6m10-6h-6v6M4 10h6V4m10 6h-6V4"></path>
            </svg>
            <span>Exit Full Screen</span>
          \`;
          fsBtn.classList.remove("secondary");
          fsBtn.classList.add("accent-emerald");
        } else {
          fsBtn.innerHTML = \`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
            <span>Full Screen</span>
          \`;
          fsBtn.classList.remove("accent-emerald");
          fsBtn.classList.add("secondary");
        }
      }
    });`;

if (textDiffCode.includes(oldDiffListenersTarget)) {
  textDiffCode = textDiffCode.replace(oldDiffListenersTarget, '// Fullscreen & Reset layout handled dynamically by app.js initLayoutSizer');
  console.log('[PASS] Removed redundant listeners from text-diff.js init()');
}

fs.writeFileSync(textDiffPath, textDiffCode, 'utf8');

// 2. Harmonize unit-converter.js guide card classes
const unitPath = path.join(toolsDir, 'unit-converter.js');
let unitCode = fs.readFileSync(unitPath, 'utf8');

const oldUnitGuide = `<div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: MULTI-UNIT CONVERTER</h4>
            </div>
            <button class="tool-btn secondary" id="unit-guide-load-sample" style="font-size: 11px;">Load Sample</button>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Select Category</strong>
              <p style="margin: 4px 0 0 0;">Switch between Data Size, Physical Length, Mass Weight, or Temperature scales.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Interactive Conversion</strong>
              <p style="margin: 4px 0 0 0;">Type any number in the input box; target outputs and matrix breakdown update instantaneously.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Instant 1-Click Copy</strong>
              <p style="margin: 4px 0 0 0;">Copy the exact formatted result with units to your clipboard ready to paste into code or reports.</p>
            </div>
          </div>
        </div>`;

const newUnitGuide = `<div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: Universal Measurement &amp; Unit Converter</span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <button class="tool-btn secondary" id="unit-guide-load-sample" style="font-size: 11px;">Load Sample</button>
              <div class="tool-guide-badge">Precision Math</div>
            </div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Select Measurement Category</h4>
                <p>Switch between Data Size, Physical Length, Mass Weight, or Temperature scales.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Interactive Live Conversion</h4>
                <p>Type any number in the input box; target outputs and matrix breakdown update instantaneously.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Instant One-Click Copy</h4>
                <p>Copy the exact formatted result with units to your clipboard ready to paste into code or reports.</p>
              </div>
            </div>
          </div>
        </div>`;

if (unitCode.includes(oldUnitGuide)) {
  unitCode = unitCode.replace(oldUnitGuide, newUnitGuide);
  fs.writeFileSync(unitPath, unitCode, 'utf8');
  console.log('[PASS] Harmonized guide card in unit-converter.js to canonical .tool-guide-* classes');
}

// 3. Harmonize pdf-ai.js guide card classes
const pdfAiPath = path.join(toolsDir, 'pdf-ai.js');
let pdfAiCode = fs.readFileSync(pdfAiPath, 'utf8');

const oldPdfAiGuide = `<div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: AI PDF SUMMARIZER &amp; TRANSLATOR</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Dual-Core AI Architecture</strong>
              <p style="margin: 4px 0 0 0;">Works 100% offline via local statistical NLP heuristics, or seamlessly upgrades to Google Gemini Flash when an API key is provided.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Context-Aware Q&amp;A Chat</strong>
              <p style="margin: 4px 0 0 0;">Chat with multi-page agreements and technical papers to pull precise dates, monetary figures, and clause citations.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Zero Server Persistence</strong>
              <p style="margin: 4px 0 0 0;">Your API keys and document texts are stored strictly in client localStorage and memory.</p>
            </div>
          </div>
        </div>`;

const newPdfAiGuide = `<div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: AI PDF Summarizer &amp; Translator</span>
            </div>
            <div class="tool-guide-badge">Dual-Core AI</div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Dual-Core AI Architecture</h4>
                <p>Works 100% offline via local statistical NLP heuristics, or seamlessly upgrades to Google Gemini Flash when an API key is provided.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Context-Aware Q&amp;A Chat</h4>
                <p>Chat with multi-page agreements and technical papers to pull precise dates, monetary figures, and clause citations.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Zero Server Persistence</h4>
                <p>Your API keys and document texts are stored strictly in client localStorage and memory with zero cloud tracking.</p>
              </div>
            </div>
          </div>
        </div>`;

if (pdfAiCode.includes(oldPdfAiGuide)) {
  pdfAiCode = pdfAiCode.replace(oldPdfAiGuide, newPdfAiGuide);
  fs.writeFileSync(pdfAiPath, pdfAiCode, 'utf8');
  console.log('[PASS] Harmonized guide card in pdf-ai.js to canonical .tool-guide-* classes');
}

// 4. Harmonize compare-pdf.js guide card classes
const comparePdfPath = path.join(toolsDir, 'compare-pdf.js');
let comparePdfCode = fs.readFileSync(comparePdfPath, 'utf8');

const oldCompareGuide = `<div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: PDF COMPARE & DIFFERENCE INSPECTOR</h4>
            </div>
            <div style="font-size: 11px; color: var(--accent-cyan); font-weight: 600;">100% Client-Side</div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Upload Documents</strong>
              <p style="margin: 4px 0 0 0;">Upload original Revision A and modified Revision B PDF files to compare.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Choose Inspection Mode</strong>
              <p style="margin: 4px 0 0 0;">Toggle between Visual Side-by-Side, Pixel Diff Heatmap, or Text/Clause Diff.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Export Audit Report</strong>
              <p style="margin: 4px 0 0 0;">Save text difference logs or take high-res snapshots of changed sections for audit reports.</p>
            </div>
          </div>
        </div>`;

const newCompareGuide = `<div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: PDF Compare &amp; Difference Inspector</span>
            </div>
            <div class="tool-guide-badge">Diff Engine</div>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Upload Document Pair</h4>
                <p>Upload original Revision A and modified Revision B PDF files to compare in browser memory.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Choose Inspection Mode</h4>
                <p>Toggle between Visual Side-by-Side, Pixel Diff Heatmap, or Text/Clause Diff matrices.</p>
              </div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Export Audit Report</h4>
                <p>Save text difference logs or take high-res snapshots of changed sections for audit reports.</p>
              </div>
            </div>
          </div>
        </div>`;

if (comparePdfCode.includes(oldCompareGuide)) {
  comparePdfCode = comparePdfCode.replace(oldCompareGuide, newCompareGuide);
  fs.writeFileSync(comparePdfPath, comparePdfCode, 'utf8');
  console.log('[PASS] Harmonized guide card in compare-pdf.js to canonical .tool-guide-* classes');
}

// 5. Sync updated files to Android mirror
const synced = ['text-diff.js', 'unit-converter.js', 'pdf-ai.js', 'compare-pdf.js'];
for (const s of synced) {
  const src = path.join(toolsDir, s);
  const dst = path.join(androidToolsDir, s);
  if (fs.existsSync(androidToolsDir)) {
    fs.copyFileSync(src, dst);
    console.log(`[PASS] Synced ${s} to Android mirror`);
  }
}

console.log('\nAll tools successfully harmonized!');

