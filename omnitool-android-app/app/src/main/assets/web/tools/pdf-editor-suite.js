// OmniTool Hub - PDF Editor, Sign & Markup Studio
// Consolidates Sign, Annotate, Forms, Watermark, and Redact into an all-in-one visual editor.

export default {
  id: "pdf-editor-suite",
  name: "PDF Editor, Sign & Markup Studio",

  activeSubtool: "sign-pdf",
  currentModule: null,

  subtools: [
    { id: "sign-pdf", label: "Draw & Cursive Sign", icon: "✍️", title: "Sign PDF Document", desc: "Draw hand-written signatures, type elegant cursive names, or upload stamp seals, then position and embed them directly onto any PDF page." },
    { id: "pdf-annotate", label: "Annotate & Draw", icon: "✏️", title: "Annotate & Draw on PDF", desc: "Highlight passages, sketch freehand notes, stamp text markers, draw framing boxes, and arrows directly onto PDF pages." },
    { id: "pdf-forms", label: "AcroForm Fill & Flatten", icon: "📋", title: "PDF Form Filler & AcroForms", desc: "Inspect and fill interactive PDF AcroForm fields (text fields, checkboxes, dropdowns, radio groups) directly in-browser and flatten or export." },
    { id: "pdf-watermark", label: "Watermark & Pages", icon: "💧", title: "PDF Watermark & Page Numbers", desc: "Add customizable diagonal/horizontal text watermarks and stamp dynamic page numbers (Page X of Y) with position, font, and opacity controls." },
    { id: "redact-pdf", label: "Permanent Redaction", icon: "⬛", title: "PDF Redact & Privacy Sanitizer", desc: "Permanently scrub sensitive text, PII, and financial details from PDF pages by drawing opaque redaction boxes burned into document streams." }
  ],

  renderUI() {
    return `
      <div class="suite-wrapper" id="editor-suite-wrapper" style="width: 100%;">
        <!-- Active Sub-tool Container (Direct 2-view split layout) -->
        <div id="editor-subtool-host" style="min-height: 480px; width: 100%;">
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 350px; gap: 12px; color: var(--text-muted);">
            <div style="width: 32px; height: 32px; border: 3px solid rgba(157,78,221,0.2); border-top-color: var(--accent-purple); border-radius: 50%; animation: editor-spin 0.8s linear infinite;"></div>
            <span>Loading editor studio...</span>
          </div>
        </div>
      </div>

      <style>
        @keyframes editor-spin {
          to { transform: rotate(360deg); }
        }
        .suite-tabs-nav::-webkit-scrollbar {
          height: 3px;
        }
        .suite-tabs-nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .suite-tabs-nav .keyboard-tab {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
        }
        .suite-tabs-nav .keyboard-tab:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
        }
        .suite-tabs-nav .keyboard-tab.active {
          background: rgba(157, 78, 221, 0.15);
          border-color: #a855f7;
          color: #c084fc;
          font-weight: 700;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.15);
        }
        @media (max-width: 900px) {
          .suite-tabs-nav {
            max-width: 100% !important;
            margin-left: 0 !important;
            margin-top: 6px;
            width: 100%;
          }
        }
      </style>
    `;
  },

  injectTabs(editorHeader, appInstance, loadSubtoolFn) {
    if (!editorHeader) return;

    editorHeader.classList.add("suite-header");
    editorHeader.style.cssText = "display: flex !important; flex-direction: column !important; align-items: stretch !important; gap: 8px !important;";

    // Ensure the top row of header has the title and any right-aligned actions
    let headerTop = editorHeader.querySelector(".panel-header-top");
    if (!headerTop) {
      headerTop = document.createElement("div");
      headerTop.className = "panel-header-top";
      headerTop.style.cssText = "display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px;";
      
      const existingChildren = Array.from(editorHeader.children).filter(c => !c.classList.contains("suite-tabs-nav"));
      existingChildren.forEach(c => headerTop.appendChild(c));
      editorHeader.appendChild(headerTop);
    }

    let tabsNav = editorHeader.querySelector(".suite-tabs-nav");
    if (!tabsNav) {
      tabsNav = document.createElement("div");
      tabsNav.className = "suite-tabs-nav";
      editorHeader.appendChild(tabsNav);
    }
    tabsNav.style.cssText = "display: flex; gap: 6px !important; align-items: center !important; width: 100% !important; flex-wrap: wrap !important; margin-top: 4px !important; padding-top: 8px !important; border-top: 1px solid rgba(255, 255, 255, 0.06) !important;";

    tabsNav.innerHTML = this.subtools.map(st => `
      <button type="button" class="keyboard-tab ${st.id === this.activeSubtool ? 'active' : ''}" data-subtool="${st.id}" style="font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; flex-shrink: 0;" title="${st.title}">
        <span>${st.icon}</span>
        <span>${st.label}</span>
      </button>
    `).join("");

    tabsNav.querySelectorAll(".keyboard-tab").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.subtool;
        if (id && id !== this.activeSubtool) {
          const splitView = editorHeader.closest(".tool-content-layout.split-view");
          const panels = splitView ? splitView.querySelectorAll(".tool-panel:not(.tool-guide-card)") : null;
          const previewPanel = panels && panels.length > 1 ? panels[1] : null;
          const wasFullscreen = previewPanel && previewPanel.classList.contains("preview-fullscreen");
          const wasDrawerOpen = splitView && splitView.classList.contains("drawer-open");
          loadSubtoolFn(id, wasFullscreen, wasDrawerOpen);
        }
      });
    });
  },

  async init(container, appInstance) {
    const host = container.querySelector("#editor-subtool-host");

    const loadSubtool = async (subtoolId, retainFullscreen = false, retainDrawerOpen = false, updateRoute = true) => {
      if (this.currentModule && typeof this.currentModule.cleanup === "function") {
        try { this.currentModule.cleanup(); } catch (_) {}
      }
      this.activeSubtool = subtoolId;
      if (updateRoute && appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("pdf-editor-suite", subtoolId, { pushHistory: true });
      }
      const config = this.subtools.find(st => st.id === subtoolId) || this.subtools[0];

      const isInitialMount = !host.firstElementChild || host.querySelector(".suite-loading-spinner");
      if (isInitialMount) {
        host.innerHTML = `
          <div class="suite-loading-spinner" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 350px; gap: 12px; color: var(--text-muted);">
            <div style="width: 32px; height: 32px; border: 3px solid rgba(157,78,221,0.2); border-top-color: var(--accent-purple); border-radius: 50%; animation: editor-spin 0.8s linear infinite;"></div>
            <span style="font-size: 13px;">Mounting ${config.label} canvas engine...</span>
          </div>
        `;
      } else {
        host.classList.add("subtool-transitioning");
      }

      try {
        if (!this._subtoolModules) this._subtoolModules = {};
        let module = this._subtoolModules[subtoolId];
        if (!module) {
          module = await import(`./${subtoolId}.js`);
          this._subtoolModules[subtoolId] = module;
        }
        if (module && module.default) {
          this.currentModule = module.default;
          if (host) {
            host.innerHTML = module.default.renderUI();
            host.classList.remove("subtool-transitioning");
            host.classList.add("subtool-fade-in");
            setTimeout(() => host.classList.remove("subtool-fade-in"), 300);

            if (typeof module.default.init === "function") {
              module.default.init(host, appInstance);
            }
            if (typeof appInstance.initLayoutSizer === "function") {
              appInstance.initLayoutSizer(host);
            }
            if (typeof appInstance.injectGuideBenefits === "function") {
              appInstance.injectGuideBenefits(host, "pdf-editor-suite", subtoolId);
            }
            if (typeof appInstance.syncActiveCapabilityChip === "function") {
              appInstance.syncActiveCapabilityChip(document, subtoolId);
            }
            if (typeof appInstance.distributePanelAds === "function") {
              appInstance.distributePanelAds(host);
            }

            // Find editor panel (Panel 0, Configuration/Editor) and inject tabs
            const splitView = host.querySelector(".tool-content-layout.split-view");
            const panels = splitView ? splitView.querySelectorAll(".tool-panel:not(.tool-guide-card)") : host.querySelectorAll(".tool-panel:not(.tool-guide-card)");
            const editorPanel = panels && panels.length > 0 ? panels[0] : null;
            const previewPanel = panels && panels.length > 1 ? panels[1] : null;

            appInstance._reinjectEditorTabs = () => {
              const splitView = host.querySelector(".tool-content-layout.split-view");
              const panels = splitView ? splitView.querySelectorAll(".tool-panel:not(.tool-guide-card)") : host.querySelectorAll(".tool-panel:not(.tool-guide-card)");
              const editorPanel = panels && panels.length > 0 ? panels[0] : null;
              if (editorPanel) {
                const editorHeader = editorPanel.querySelector(".panel-header");
                if (editorHeader) {
                  this.injectTabs(editorHeader, appInstance, loadSubtool);
                  if (typeof appInstance.syncMobileSplitBar === "function") {
                    appInstance.syncMobileSplitBar(splitView || host);
                  }
                }
              }
            };
            appInstance._reinjectEditorTabs();

            // Ensure preview panel stays clean (no suite tabs on preview screen)
            if (previewPanel) {
              const strayTabs = previewPanel.querySelectorAll(".suite-tabs-nav");
              strayTabs.forEach(el => el.remove());

              // Preserve full-screen mode across tab switches
              if (retainFullscreen) {
                const fsBtn = previewPanel.querySelector(".preview-fullscreen-btn");
                if (fsBtn) {
                  fsBtn.click();
                  if (retainDrawerOpen && splitView) {
                    splitView.classList.add("drawer-open");
                  }
                }
              }
            }
          }
        }
      } catch (err) {
        console.error("Failed to load editor subtool:", err);
        if (host) {
          host.innerHTML = `
            <div style="padding: 24px; text-align: center; color: var(--accent-rose); background: rgba(244, 63, 94, 0.08); border-radius: 12px; border: 1px solid rgba(244, 63, 94, 0.2);">
              <div style="font-size: 28px; margin-bottom: 8px;">⚠️</div>
              <h4>Failed to load editor module</h4>
              <p style="font-size: 12px; margin-top: 4px; color: var(--text-muted);">${err.message}</p>
            </div>
          `;
        }
      }
    };

    if (appInstance && typeof appInstance.registerTabSwitcher === "function") {
      appInstance.registerTabSwitcher("pdf-editor-suite", (tabId) => loadSubtool(tabId, false, false, false));
    }
    if (appInstance.activeSubtab) {
      loadSubtool(appInstance.activeSubtab, false, false, false);
      if (appInstance && typeof appInstance.syncSubtab === "function") {
        appInstance.syncSubtab("pdf-editor-suite", appInstance.activeSubtab, { pushHistory: false, replaceHistory: true });
      }
      appInstance.activeSubtab = null;
    } else {
      loadSubtool(this.activeSubtool || "sign-pdf", false, false, false);
    }
  },

  cleanup() {
    if (this.currentModule && typeof this.currentModule.cleanup === "function") {
      try { this.currentModule.cleanup(); } catch (_) {}
    }
    this.currentModule = null;
  }
};
