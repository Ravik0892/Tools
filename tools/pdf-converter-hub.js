// OmniTool Hub - Universal Document & PDF Converter Hub
// Merges Word, Excel, PowerPoint, Images/Scan, HTML, and Markdown converters into a unified, elite suite.

export default {
  id: "pdf-converter-hub",
  name: "Document & PDF Converter Hub",

  activeSubtool: "word-pdf",
  currentModule: null,

  subtools: [
    { id: "word-pdf", label: "Word (.docx)", icon: "📄", title: "Word to PDF & PDF to Word", desc: "Convert Word DOCX files into clean PDFs, or extract PDF text, layout, and tables into native editable Microsoft Word files." },
    { id: "excel-pdf", label: "Excel (.xlsx)", icon: "📊", title: "Excel to PDF & PDF to Excel", desc: "Convert spreadsheets (XLSX, XLS, CSV) into presentation-ready PDF tables, or extract PDF tables into structured Excel files." },
    { id: "pptx-pdf", label: "PowerPoint", icon: "📑", title: "PowerPoint to PDF & PDF to PPTX", desc: "Convert PowerPoint presentations (.pptx) into clean PDF documents or reverse convert PDFs into native editable PowerPoint slides." },
    { id: "images-to-pdf", label: "Images to PDF", icon: "🖼️", title: "Images to PDF Converter", desc: "Compile JPG, PNG, and WebP images into a single PDF with visual reordering and page sizing." },
    { id: "scan-to-pdf", label: "Camera Scan", icon: "📷", title: "Camera Scan to PDF", desc: "Capture paper documents using your device webcam or phone camera with black/white document enhancement." },
    { id: "html-to-pdf", label: "HTML to PDF", icon: "💻", title: "HTML & CSS Webpage to PDF", desc: "Convert raw HTML/CSS code or import HTML files into high-resolution PDFs with live sandbox preview." },
    { id: "pdf-to-markdown", label: "Markdown", icon: "📝", title: "PDF to Markdown Converter", desc: "Convert PDF documents into clean GitHub Flavored Markdown (GFM) with detection of headings, tables, and code." }
  ],

  renderUI() {
    const tabsHtml = this.subtools.map(st => `
      <button class="keyboard-tab ${st.id === this.activeSubtool ? 'active' : ''}" data-subtool="${st.id}" style="font-size: 11px; padding: 5px 10px; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap;">
        <span>${st.icon}</span>
        <span>${st.label}</span>
      </button>
    `).join("");

    return `
      <div class="suite-wrapper" id="converter-hub-wrapper">
        <!-- Suite Header Strip with Tabs -->
        <div class="suite-tab-header" style="background: rgba(13, 18, 29, 0.7); backdrop-filter: var(--glass-blur); border: 1px solid var(--border-color); border-radius: 12px; padding: 8px 14px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
            <span class="tool-badge" style="background: rgba(0, 242, 254, 0.12); color: var(--accent-cyan); font-weight: 700; font-size: 11px; padding: 4px 8px; border-radius: 6px;">
              CONVERTER HUB
            </span>
            <span id="hub-active-label" style="font-size: 13px; font-weight: 700; color: var(--text-main);">
              Word (.docx) Converter
            </span>
          </div>

          <!-- Tabs (matching screenshot layout) -->
          <div style="display: flex; gap: 6px; overflow-x: auto; max-width: 100%; padding-bottom: 2px;" id="hub-tabs-bar">
            ${tabsHtml}
          </div>
        </div>

        <!-- Active Sub-tool Container -->
        <div id="hub-subtool-host" style="min-height: 480px;">
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 350px; gap: 12px; color: var(--text-muted);">
            <div style="width: 32px; height: 32px; border: 3px solid rgba(0,242,254,0.2); border-top-color: var(--accent-cyan); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
            <span>Loading converter engine...</span>
          </div>
        </div>
      </div>

      <style>
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        #hub-tabs-bar::-webkit-scrollbar {
          height: 3px;
        }
        #hub-tabs-bar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .keyboard-tab {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        .keyboard-tab:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
        }
        .keyboard-tab.active {
          background: rgba(0, 242, 254, 0.12);
          border-color: #00f2fe;
          color: #00f2fe;
          font-weight: 700;
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.15);
        }
      </style>
    `;
  },

  async init(container, appInstance) {
    const host = container.querySelector("#hub-subtool-host");
    const label = container.querySelector("#hub-active-label");
    const tabButtons = container.querySelectorAll("#hub-tabs-bar .keyboard-tab");

    const loadSubtool = async (subtoolId) => {
      this.activeSubtool = subtoolId;

      // Update Tab Styles
      tabButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.subtool === subtoolId);
      });

      const config = this.subtools.find(st => st.id === subtoolId) || this.subtools[0];
      if (label) {
        label.innerText = config.title;
      }

      // Show sleek loading state
      if (host) {
        host.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 350px; gap: 12px; color: var(--text-muted);">
            <div style="width: 32px; height: 32px; border: 3px solid rgba(0,242,254,0.2); border-top-color: var(--accent-cyan); border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
            <span style="font-size: 13px;">Mounting ${config.label} converter sandbox...</span>
          </div>
        `;
      }

      try {
        let moduleName = subtoolId;
        if (subtoolId === "scan-to-pdf") moduleName = "scan-to-pdf";
        const module = await import(`./${moduleName}.js`);
        if (module && module.default) {
          this.currentModule = module.default;
          if (host) {
            host.innerHTML = module.default.renderUI();
            if (typeof module.default.init === "function") {
              module.default.init(host, appInstance);
            }
            // Re-apply split-view resizer if present
            if (typeof appInstance.initLayoutSizer === "function") {
              appInstance.initLayoutSizer();
            }
          }
        }
      } catch (err) {
        console.error("Failed to load converter subtool:", err);
        if (host) {
          host.innerHTML = `
            <div style="padding: 24px; text-align: center; color: var(--accent-rose); background: rgba(244, 63, 94, 0.08); border-radius: 12px; border: 1px solid rgba(244, 63, 94, 0.2);">
              <div style="font-size: 28px; margin-bottom: 8px;">⚠️</div>
              <h4>Failed to load converter module</h4>
              <p style="font-size: 12px; margin-top: 4px; color: var(--text-muted);">${err.message}</p>
            </div>
          `;
        }
      }
    };

    // Tab button click listeners
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.subtool;
        if (id && id !== this.activeSubtool) {
          loadSubtool(id);
        }
      });
    });

    // Check if initial subtab was requested via URL redirect
    const initial = appInstance.activeSubtab || this.activeSubtool || "word-pdf";
    appInstance.activeSubtab = null;
    loadSubtool(initial);
  }
};
