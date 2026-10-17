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
    const tabsHtml = this.subtools.map(st => `
      <button class="keyboard-tab ${st.id === this.activeSubtool ? 'active' : ''}" data-subtool="${st.id}" style="font-size: 11px; padding: 5px 12px; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap;">
        <span>${st.icon}</span>
        <span>${st.label}</span>
      </button>
    `).join("");

    return `
      <div class="suite-wrapper" id="audio-suite-wrapper">
        <!-- Suite Header Strip with Tabs -->
        <div class="suite-tab-header" style="background: rgba(13, 18, 29, 0.7); backdrop-filter: var(--glass-blur); border: 1px solid var(--border-color); border-radius: 12px; padding: 8px 14px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
            <span class="tool-badge" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); font-weight: 700; font-size: 11px; padding: 4px 8px; border-radius: 6px;">
              AUDIO STUDIO
            </span>
            <span id="audio-active-label" style="font-size: 13px; font-weight: 700; color: var(--text-main);">
              Audio Transcoder
            </span>
          </div>

          <!-- Tabs (matching screenshot layout) -->
          <div style="display: flex; gap: 6px; overflow-x: auto; max-width: 100%; padding-bottom: 2px;" id="audio-tabs-bar">
            ${tabsHtml}
          </div>
        </div>

        <!-- Active Sub-tool Container -->
        <div id="audio-subtool-host" style="min-height: 480px;">
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
        #audio-tabs-bar::-webkit-scrollbar {
          height: 3px;
        }
        #audio-tabs-bar::-webkit-scrollbar-thumb {
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
    const host = container.querySelector("#audio-subtool-host");
    const label = container.querySelector("#audio-active-label");
    const tabButtons = container.querySelectorAll("#audio-tabs-bar .keyboard-tab");

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
            <div style="width: 32px; height: 32px; border: 3px solid rgba(16,185,129,0.2); border-top-color: var(--accent-emerald); border-radius: 50%; animation: audio-spin 0.8s linear infinite;"></div>
            <span style="font-size: 13px;">Mounting ${config.label} engine...</span>
          </div>
        `;
      }

      try {
        const module = await import(`./${subtoolId}.js`);
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
    const initial = appInstance.activeSubtab || this.activeSubtool || "audio-converter";
    appInstance.activeSubtab = null;
    loadSubtool(initial);
  }
};
