// OmniTool Hub - QR & Barcode Studio Suite
// Consolidates Dynamic Branded Art QR Generator and Live Camera/Barcode Scanner into a unified suite.

export default {
  id: "qr-studio",
  name: "QR & Barcode Studio",

  activeSubtool: "qr-generator",
  currentModule: null,

  subtools: [
    { id: "qr-generator", label: "Generate QR", icon: "📱", title: "Dynamic Art QR Code Studio", desc: "Generate highly customized art QR codes with linear gradients, custom dot patterns, eye styles, and center logos client-side." },
    { id: "qr-scanner", label: "Scan & Decode", icon: "📷", title: "QR Code & Barcode Scanner", desc: "Scan QR codes and barcodes live from camera, file upload, or clipboard paste with 100% private client-side recognition and action parsing." }
  ],

  renderUI() {
    return `
      <div class="suite-wrapper" id="qr-studio-wrapper" style="width: 100%;">
        <!-- Active Sub-tool Container (Direct 2-view split layout) -->
        <div id="qr-subtool-host" style="min-height: 480px; width: 100%;">
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 350px; gap: 12px; color: var(--text-muted);">
            <div style="width: 32px; height: 32px; border: 3px solid rgba(0,242,254,0.2); border-top-color: var(--accent-cyan); border-radius: 50%; animation: qr-spin 0.8s linear infinite;"></div>
            <span>Loading QR engine...</span>
          </div>
        </div>
      </div>

      <style>
        @keyframes qr-spin {
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
          background: rgba(0, 242, 254, 0.12);
          border-color: #00f2fe;
          color: #00f2fe;
          font-weight: 700;
          box-shadow: 0 0 10px rgba(0, 242, 254, 0.15);
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
    const host = container.querySelector("#qr-subtool-host");

    const loadSubtool = async (subtoolId, retainFullscreen = false, retainDrawerOpen = false, updateRoute = true) => {
      this.activeSubtool = subtoolId;
      if (updateRoute && appInstance && typeof appInstance.syncSubtab === "function") { appInstance.syncSubtab("qr-studio", subtoolId, { pushHistory: true }); }
      const config = this.subtools.find(st => st.id === subtoolId) || this.subtools[0];

      const isInitialMount = !host.firstElementChild || host.querySelector(".suite-loading-spinner");
      if (isInitialMount) {
        host.innerHTML = `
          <div class="suite-loading-spinner" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 350px; gap: 12px; color: var(--text-muted);">
            <div style="width: 32px; height: 32px; border: 3px solid rgba(0,242,254,0.2); border-top-color: var(--accent-cyan); border-radius: 50%; animation: qr-spin 0.8s linear infinite;"></div>
            <span style="font-size: 13px;">Mounting ${config.label} studio workspace...</span>
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
              appInstance.injectGuideBenefits(host, "qr-studio", subtoolId);
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

            if (editorPanel) {
              const editorHeader = editorPanel.querySelector(".panel-header");
              if (editorHeader) {
                this.injectTabs(editorHeader, appInstance, loadSubtool);
                if (typeof appInstance.syncMobileSplitBar === "function") {
                  appInstance.syncMobileSplitBar(splitView || host);
                }
              }
            }

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
        console.error("Failed to load QR subtool:", err);
        if (host) {
          host.innerHTML = `
            <div style="padding: 24px; text-align: center; color: var(--accent-rose); background: rgba(244, 63, 94, 0.08); border-radius: 12px; border: 1px solid rgba(244, 63, 94, 0.2);">
              <div style="font-size: 28px; margin-bottom: 8px;">⚠️</div>
              <h4>Failed to load QR module</h4>
              <p style="font-size: 12px; margin-top: 4px; color: var(--text-muted);">${err.message}</p>
            </div>
          `;
        }
      }
    };

    if (appInstance && typeof appInstance.registerTabSwitcher === "function") { appInstance.registerTabSwitcher("qr-studio", (tabId) => loadSubtool(tabId, false, false, false)); }
    const initial = appInstance.activeSubtab || this.activeSubtool || "qr-generator";
    appInstance.activeSubtab = null;
    loadSubtool(initial, false, false, false);
    if (appInstance && typeof appInstance.syncSubtab === "function") { appInstance.syncSubtab("qr-studio", initial, { pushHistory: false, replaceHistory: true }); }
  }
};
