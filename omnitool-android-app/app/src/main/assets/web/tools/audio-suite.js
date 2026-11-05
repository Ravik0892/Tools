// OmniTool Hub - Audio Studio & Extractor Suite
// Consolidates Audio Transcoder and Video Audio Extractor into a unified sound suite.

export default {
  id: "audio-suite",
  name: "Audio Studio & Extractor",

  activeSubtool: "audio-converter",
  currentModule: null,

  subtools: [
    { id: "audio-converter", label: "Audio Transcoder", icon: "🎧", title: "Universal Audio Converter & Transcoder", desc: "Convert sound files between MP3, WAV, and OGG formats with customizable bitrates (128k-320k), stereo/mono channels, and gain amplification." },
    { id: "mp4-to-mp3", label: "Video Audio Extractor", icon: "🎵", title: "Video to MP3 & Audio Extractor", desc: "Demux and extract pristine audio tracks from MP4, WebM, and MOV video files with visual waveform preview and time range trimming." }
  ],

  renderUI() {
    return `
      <div class="suite-wrapper" id="audio-suite-wrapper" style="width: 100%;">
        <!-- Active Sub-tool Container (Direct 2-view split layout) -->
        <div id="audio-subtool-host" style="min-height: 480px; width: 100%;">
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 350px; gap: 12px; color: var(--text-muted);">
            <div style="width: 32px; height: 32px; border: 3px solid rgba(16,185,129,0.2); border-top-color: var(--accent-emerald); border-radius: 50%; animation: audio-spin 0.8s linear infinite;"></div>
            <span>Loading audio studio...</span>
          </div>
        </div>
      </div>

      <style>
        @keyframes audio-spin {
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
          background: rgba(16, 185, 129, 0.15);
          border-color: #10b981;
          color: #34d399;
          font-weight: 700;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.15);
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

    let tabsNav = editorHeader.querySelector(".suite-tabs-nav");
    if (!tabsNav) {
      tabsNav = document.createElement("div");
      tabsNav.className = "suite-tabs-nav";
      tabsNav.id = "audio-tabs-bar";
      tabsNav.style.cssText = "display: flex; gap: 5px; align-items: center; overflow-x: auto; max-width: calc(100% - 150px); scrollbar-width: none; margin-left: auto; padding: 2px 0;";

      const actionBtn = editorHeader.querySelector(".tool-btn, .keyboard-tab");
      if (actionBtn && actionBtn.parentElement === editorHeader) {
        editorHeader.insertBefore(tabsNav, actionBtn);
      } else {
        editorHeader.appendChild(tabsNav);
      }
    }

    tabsNav.innerHTML = this.subtools.map(st => `
      <button type="button" class="keyboard-tab ${st.id === this.activeSubtool ? 'active' : ''}" data-subtool="${st.id}" style="font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; flex-shrink: 0;" title="${st.title}">
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
    const host = container.querySelector("#audio-subtool-host");

    const loadSubtool = async (subtoolId, retainFullscreen = false, retainDrawerOpen = false, updateRoute = true) => {
      this.activeSubtool = subtoolId;
      if (updateRoute && appInstance && typeof appInstance.syncSubtab === "function") { appInstance.syncSubtab("audio-suite", subtoolId, { pushHistory: true }); }
      const config = this.subtools.find(st => st.id === subtoolId) || this.subtools[0];

      if (host) {
        host.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 350px; gap: 12px; color: var(--text-muted);">
            <div style="width: 32px; height: 32px; border: 3px solid rgba(16,185,129,0.2); border-top-color: var(--accent-emerald); border-radius: 50%; animation: audio-spin 0.8s linear infinite;"></div>
            <span style="font-size: 13px;">Mounting ${config.label} engine...</span>
          </div>
        `;
      }

      try {
        const module = await import(`./${subtoolId}.js?t=${Date.now()}`);
        if (module && module.default) {
          this.currentModule = module.default;
          if (host) {
            host.innerHTML = module.default.renderUI();
            if (typeof module.default.init === "function") {
              module.default.init(host, appInstance);
            }
            if (typeof appInstance.initLayoutSizer === "function") {
              appInstance.initLayoutSizer();
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
        console.error("Failed to load audio subtool:", err);
        if (host) {
          host.innerHTML = `
            <div style="padding: 24px; text-align: center; color: var(--accent-rose); background: rgba(244, 63, 94, 0.08); border-radius: 12px; border: 1px solid rgba(244, 63, 94, 0.2);">
              <div style="font-size: 28px; margin-bottom: 8px;">⚠️</div>
              <h4>Failed to load audio module</h4>
              <p style="font-size: 12px; margin-top: 4px; color: var(--text-muted);">${err.message}</p>
            </div>
          `;
        }
      }
    };

    if (appInstance && typeof appInstance.registerTabSwitcher === "function") { appInstance.registerTabSwitcher("audio-suite", (tabId) => loadSubtool(tabId, false, false, false)); }
    const initial = appInstance.activeSubtab || this.activeSubtool || "audio-converter";
    appInstance.activeSubtab = null;
    loadSubtool(initial, false, false, false);
    if (appInstance && typeof appInstance.syncSubtab === "function") { appInstance.syncSubtab("audio-suite", initial, { pushHistory: false, replaceHistory: true }); }
  }
};
