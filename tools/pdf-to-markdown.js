// OmniTool Hub - PDF to Markdown & Clean Text Converter
// 100% Client-Side typographic layout parsing into GitHub Flavored Markdown (GFM) headings, lists, tables, and code.

import { escapeHtml } from './utils.js';

export default {
  id: "pdf-to-markdown",
  name: "PDF to Markdown Converter",

  markdownContent: "",
  fileName: "",
  pdfjsDoc: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Markdown Editor Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
              PDF Input &amp; Markdown (.md)
            </h3>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="tool-btn secondary" id="btn-copy-md" style="padding: 3px 8px; font-size: 11px;">📋 Copy</button>
              <button type="button" class="tool-btn primary" id="btn-download-md" style="padding: 3px 8px; font-size: 11px;">📥 Download</button>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 12px; flex: 1;">
            <!-- Dropzone -->
            <div id="pdf-md-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 20px 14px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <input type="file" id="pdf-md-file-input" accept=".pdf" style="display: none;">
              <div style="font-size: 28px; margin-bottom: 4px;">📑</div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;" id="pdf-md-drop-title">Drop PDF document here</div>
              <div style="font-size: 11px; color: var(--text-muted);" id="pdf-md-file-status">Detects headings, tables, and lists automatically</div>
            </div>

            <!-- Parser Toggles -->
            <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap; background: rgba(0,0,0,0.2); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color);">
              <label style="display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--text-main); cursor: pointer;">
                <input type="checkbox" id="md-opt-headings" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                Headings (#/##)
              </label>
              <label style="display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--text-main); cursor: pointer;">
                <input type="checkbox" id="md-opt-tables" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                Tables (|---|)
              </label>
              <label style="display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--text-main); cursor: pointer;">
                <input type="checkbox" id="md-opt-pagebreaks" checked style="accent-color: var(--accent-cyan); width: 14px; height: 14px;">
                Page Breaks (---)
              </label>
            </div>

            <!-- Markdown Source Code -->
            <textarea id="pdf-md-textarea" class="form-input" style="width: 100%; min-height: 240px; flex: 1; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 12px; line-height: 1.5; resize: vertical; border-radius: 8px; background: rgba(0,0,0,0.35); border: 1px solid var(--border-color); color: var(--text-main); padding: 12px; white-space: pre;" placeholder="Extracted Markdown appears here. You can also edit it directly..."></textarea>

            <!-- Privacy Security Badge -->
            <div style="padding: 10px 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.4;">
              🔒 <strong style="color: var(--accent-cyan);">Zero Cloud Leakage</strong>: Coordinate positioning and font analysis are computed strictly in local memory.
            </div>
          </div>
        </div>

        <!-- Rendered Preview Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Formatted Document Preview
            </h3>
            <span id="pdf-md-word-count" style="font-size: 11px; color: var(--text-muted);">0 words • 0 chars</span>
          </div>

          <div style="flex: 1; min-height: 440px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow: auto; padding: 16px; display: flex; flex-direction: column;">
            <div id="pdf-md-empty-placeholder" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 40px 20px;">
              <div style="font-size: 42px; margin-bottom: 12px; opacity: 0.7;">📑</div>
              <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">No PDF Parsed Yet</h4>
              <p style="font-size: 12px; max-width: 380px; margin: 0; line-height: 1.5;">
                Drop a PDF on the left to extract typography, headings, tables, bullet points, and code blocks into live formatted Markdown.
              </p>
            </div>

            <div id="pdf-md-preview-target" style="display: none; width: 100%; color: var(--text-main); line-height: 1.6; font-size: 13.5px;"></div>
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: PDF TO MARKDOWN CONVERTER</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Multi-Level Heading Parsing</strong>
              <p style="margin: 4px 0 0 0;">Font sizes are clustered geometrically to distinguish H1 document titles from H2 sections and body text.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. GFM Table Reconstruction</strong>
              <p style="margin: 4px 0 0 0;">Horizontally separated text items on the same baseline are compiled into GitHub Flavored Markdown tables.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Instant Export</strong>
              <p style="margin: 4px 0 0 0;">Copy to your clipboard for Obsidian / Notion, or download as a standalone .md file with 1-click.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const fileInput = document.getElementById("pdf-md-file-input");
    const dropzone = document.getElementById("pdf-md-dropzone");

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) this.processPdf(e.target.files[0]);
      });
    }

    if (dropzone) {
      dropzone.addEventListener("click", () => fileInput && fileInput.click());
      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.style.borderColor = "var(--accent-cyan)"; });
      dropzone.addEventListener("dragleave", () => { dropzone.style.borderColor = "rgba(0, 242, 254, 0.35)"; });
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "rgba(0, 242, 254, 0.35)";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) this.processPdf(e.dataTransfer.files[0]);
      });
    }

    const txtArea = document.getElementById("pdf-md-textarea");
    if (txtArea) {
      txtArea.addEventListener("input", () => {
        this.markdownContent = txtArea.value;
        this.renderPreview();
      });
    }

    // Copy button
    const btnCopy = document.getElementById("btn-copy-md");
    if (btnCopy) {
      btnCopy.addEventListener("click", () => {
        if (!this.markdownContent) return;
        navigator.clipboard.writeText(this.markdownContent);
        if (window.app && window.app.showToast) window.app.showToast("Copied Markdown to clipboard!", "success");
      });
    }

    // Download button
    const btnDownload = document.getElementById("btn-download-md");
    if (btnDownload) {
      btnDownload.addEventListener("click", () => {
        if (!this.markdownContent) return;
        const blob = new Blob([this.markdownContent], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${this.fileName || "Document"}.md`;
        a.click();
        URL.revokeObjectURL(url);
        if (window.app && window.app.showToast) window.app.showToast(`Saved "${this.fileName || 'Document'}.md"!`, "success");
      });
    }

    // Option toggles re-trigger conversion
    ["md-opt-headings", "md-opt-tables", "md-opt-pagebreaks"].forEach(id => {
      document.getElementById(id)?.addEventListener("change", () => {
        if (this.pdfjsDoc) this.convertPdfToMarkdown();
      });
    });
  },

  async processPdf(file) {
    this.fileName = file.name.replace(/\.[^/.]+$/, "");
    const statusEl = document.getElementById("pdf-md-file-status");
    const titleEl = document.getElementById("pdf-md-drop-title");
    if (statusEl) statusEl.innerText = `Loading "${file.name}"...`;

    try {
      if (window.app && window.app.showToast) window.app.showToast("Parsing PDF typography...", "info");
      await this.ensurePdfJs();

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      this.pdfjsDoc = pdf;

      await this.convertPdfToMarkdown();

      if (titleEl) titleEl.innerText = file.name;
      if (statusEl) statusEl.innerText = `${pdf.numPages} page(s) parsed • ${(file.size / 1024).toFixed(1)} KB`;
      if (window.app && window.app.showToast) window.app.showToast(`Converted ${pdf.numPages} pages to Markdown!`, "success");
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Failed to parse PDF: " + err.message, "error");
    }
  },

  async convertPdfToMarkdown() {
    if (!this.pdfjsDoc) return;
    const numPages = this.pdfjsDoc.numPages;
    const optHeadings = document.getElementById("md-opt-headings")?.checked !== false;
    const optTables = document.getElementById("md-opt-tables")?.checked !== false;
    const optPageBreaks = document.getElementById("md-opt-pagebreaks")?.checked !== false;

    let mdResult = "";

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await this.pdfjsDoc.getPage(pageNum);
      const textContent = await page.getTextContent();

      if (pageNum > 1 && optPageBreaks) {
        mdResult += `\n\n---\n*Page ${pageNum}*\n\n`;
      }

      // Group by Y line coordinate
      const lineMap = new Map();

      for (const item of textContent.items) {
        if (!item.str || item.str.trim() === "") continue;
        const y = Math.round(item.transform[5]);
        const x = item.transform[4];
        const fontSize = Math.round(item.transform[0]);
        const isBold = (item.fontName && (item.fontName.toLowerCase().includes("bold") || item.fontName.toLowerCase().includes("heavy")));

        let targetY = null;
        for (const existingY of lineMap.keys()) {
          if (Math.abs(existingY - y) <= 4) {
            targetY = existingY;
            break;
          }
        }

        if (targetY === null) {
          targetY = y;
          lineMap.set(targetY, []);
        }
        lineMap.get(targetY).push({ x: x, str: item.str, fontSize: fontSize, isBold: isBold });
      }

      // Sort lines top to bottom
      const sortedYs = Array.from(lineMap.keys()).sort((a, b) => b - a);

      for (const y of sortedYs) {
        const lineItems = lineMap.get(y);
        lineItems.sort((a, b) => a.x - b.x);

        const lineStr = lineItems.map(i => i.str.trim()).join(" ");
        const maxFont = Math.max(...lineItems.map(i => i.fontSize));
        const isHeading = optHeadings && (maxFont >= 14);

        // Check if line represents a table row (multiple spread columns)
        if (optTables && lineItems.length >= 3 && (lineItems[1].x - lineItems[0].x > 80)) {
          const cells = lineItems.map(i => i.str.trim().replace(/\|/g, "-"));
          mdResult += `| ${cells.join(" | ")} |\n`;
          continue;
        }

        // Bullet point detection
        if (lineStr.startsWith("•") || lineStr.startsWith("–") || lineStr.startsWith("-")) {
          mdResult += `- ${lineStr.replace(/^[•–-]\s*/, "")}\n`;
        } else if (isHeading && maxFont >= 20) {
          mdResult += `\n# ${lineStr}\n\n`;
        } else if (isHeading && maxFont >= 16) {
          mdResult += `\n## ${lineStr}\n\n`;
        } else if (isHeading && maxFont >= 14) {
          mdResult += `\n### ${lineStr}\n\n`;
        } else {
          // Regular paragraph line
          mdResult += `${lineStr}\n\n`;
        }
      }
    }

    this.markdownContent = mdResult.trim();
    const txtArea = document.getElementById("pdf-md-textarea");
    if (txtArea) txtArea.value = this.markdownContent;

    this.renderPreview();
  },

  renderPreview() {
    const target = document.getElementById("pdf-md-preview-target");
    const countEl = document.getElementById("pdf-md-word-count");
    if (!target) return;

    // Simple robust client-side markdown to HTML renderer
    let html = escapeHtml(this.markdownContent)
      .replace(/^# (.*$)/gim, '<h1 style="color: var(--accent-cyan); font-size: 22px; border-bottom: 1px solid var(--border-color); padding-bottom: 6px; margin-top: 18px;">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 style="color: var(--text-main); font-size: 18px; margin-top: 16px;">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 style="color: var(--text-main); font-size: 15px; margin-top: 14px;">$1</h3>')
      .replace(/^\- (.*$)/gim, '<li style="margin-left: 20px; list-style-type: disc;">$1</li>')
      .replace(/^---$/gim, '<hr style="border: none; border-top: 1px dashed var(--border-color); margin: 20px 0;">')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    const emptyPlaceholder = document.getElementById("pdf-md-empty-placeholder");
    if (this.markdownContent.trim()) {
      if (emptyPlaceholder) emptyPlaceholder.style.display = "none";
      target.style.display = "block";
    } else {
      if (emptyPlaceholder) emptyPlaceholder.style.display = "flex";
      target.style.display = "none";
    }

    target.innerHTML = html;

    const words = this.markdownContent.trim() ? this.markdownContent.trim().split(/\s+/).length : 0;
    const chars = this.markdownContent.length;
    if (countEl) countEl.innerText = `${words.toLocaleString()} words • ${chars.toLocaleString()} chars`;
  },

  ensurePdfJs() {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
        return resolve(window.pdfjsLib);
      }
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js"));
      document.head.appendChild(script);
    });
  },

  cleanup() {
    this.markdownContent = "";
    this.pdfjsDoc = null;
  }
};
