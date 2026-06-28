import { escapeHtml } from './utils.js';

export default {
  id: "code-playground",
  name: "HTML/CSS/JS Live Playground",
  
  // Cache of code templates
  defaultTemplates: {
    glowButton: {
      html: `<!-- Cyber Glow Button -->\n<div class="container">\n  <button class="cyber-btn">INJECT SYSTEM OVERRIDE</button>\n  <div id="counter-log">Access Logs: 0 inputs</div>\n</div>`,
      css: `body {\n  background: #0d0e12;\n  color: #a9b2c3;\n  font-family: 'Outfit', sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 90vh;\n  margin: 0;\n}\n\n.container {\n  text-align: center;\n}\n\n.cyber-btn {\n  background: transparent;\n  color: #00f2fe;\n  border: 2px solid #00f2fe;\n  padding: 16px 32px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 0 15px rgba(0, 242, 254, 0.3);\n  position: relative;\n  overflow: hidden;\n}\n\n.cyber-btn:hover {\n  background: #00f2fe;\n  color: #0d0e12;\n  box-shadow: 0 0 30px #00f2fe;\n  text-shadow: none;\n}\n\n#counter-log {\n  margin-top: 20px;\n  font-family: monospace;\n  font-size: 14px;\n  color: #9d4edd;\n}`,
      js: `// Interactive button logic\nlet clicks = 0;\nconst btn = document.querySelector('.cyber-btn');\nconst logger = document.querySelector('#counter-log');\n\nbtn.addEventListener('click', () => {\n  clicks++;\n  logger.innerText = \`Access Logs: \${clicks} override request(s) sent\`;\n  console.log(\`[System Override] Command trigger sent! Total count: \${clicks}\`);\n  \n  if (clicks >= 5) {\n    console.warn("[ALERT] High frequency overrides detected. Restricting throttle!");\n  }\n});`
    },
    digitalClock: {
      html: `<!-- Glassmorphism Clock Widget -->\n<div class="clock-wrapper">\n  <div class="glass-clock">\n    <div class="clock-label">NEON ENGINE CLOCK</div>\n    <div id="clock-time">00:00:00</div>\n    <div id="clock-date">SYSTEM DATED</div>\n  </div>\n</div>`,
      css: `body {\n  background: radial-gradient(circle, #1a1b26 0%, #0d0e12 100%);\n  color: #fff;\n  font-family: 'Outfit', sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 90vh;\n  margin: 0;\n}\n\n.clock-wrapper {\n  padding: 2px;\n  background: linear-gradient(135deg, #00f2fe, #9d4edd);\n  border-radius: 20px;\n  box-shadow: 0 10px 40px rgba(0,0,0,0.5);\n}\n\n.glass-clock {\n  background: rgba(13, 14, 18, 0.85);\n  backdrop-filter: blur(12px);\n  border-radius: 18px;\n  padding: 30px 40px;\n  text-align: center;\n}\n\n.clock-label {\n  font-size: 11px;\n  letter-spacing: 3px;\n  color: #00f2fe;\n  margin-bottom: 12px;\n  font-weight: 700;\n}\n\n#clock-time {\n  font-size: 44px;\n  font-family: monospace;\n  font-weight: bold;\n  color: #9d4edd;\n  text-shadow: 0 0 15px rgba(157, 78, 221, 0.6);\n  letter-spacing: 2px;\n}\n\n#clock-date {\n  margin-top: 12px;\n  font-size: 13px;\n  color: #565f89;\n  font-weight: 500;\n}`,
      js: `// Run clock update routine\nconsole.log("[Daemon] Launching background clock thread...");\n\nfunction updateClock() {\n  const now = new Date();\n  const timeStr = now.toTimeString().split(' ')[0];\n  const dateStr = now.toDateString().toUpperCase();\n  \n  const timeEl = document.querySelector('#clock-time');\n  const dateEl = document.querySelector('#clock-date');\n  \n  if (timeEl) timeEl.innerText = timeStr;\n  if (dateEl) dateEl.innerText = dateStr;\n}\n\n// Run initially and then on interval\nupdateClock();\nsetInterval(updateClock, 1000);\n\nconsole.log("[Daemon] Clock initialized successfully.");`
    }
  },

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Left Panel: Code Editors -->
        <div class="tool-panel" style="display: flex; flex-direction: column; gap: 12px;">
          <div class="panel-header">
            <h3>Code Editors</h3>
            <div style="display: flex; align-items: center; gap: 8px;">
              <!-- Auto Run Toggle -->
              <label style="display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--text-muted); cursor: pointer; user-select: none; margin-right: 6px;">
                <input type="checkbox" id="chk-play-autorun" checked style="accent-color: var(--accent-cyan); width: 13px; height: 13px;">
                Auto Run
              </label>
              <button class="tool-btn secondary" id="btn-play-run" style="border-color: rgba(0, 242, 254, 0.4); color: var(--accent-cyan); padding: 4px 8px; font-size: 11.5px; height: 26px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:11px; height:11px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Run
              </button>
              <button class="tool-btn secondary" id="btn-play-clear" style="font-size: 11px; padding: 4px 8px; height: 26px;">Clear</button>
            </div>
          </div>

          <!-- Stacked Code Editor Boxes -->
          <div class="editors-deck" style="display: flex; flex-direction: column; gap: 12px; flex: 1; min-height: 480px;">
            <!-- HTML Editor -->
            <div class="editor-box" style="flex: 1; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.15);">
              <div class="editor-header" style="background: rgba(157, 78, 221, 0.1); border-bottom: 1px solid rgba(157, 78, 221, 0.2); padding: 6px 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: bold; color: #9d4edd; letter-spacing: 1px;">HTML (Body Structure)</span>
              </div>
              <textarea id="play-html" class="editor-textarea" style="flex: 1; width: 100%; border: none; background: transparent; color: #a9b2c3; font-family: var(--font-mono); font-size: 12px; padding: 10px; resize: none; outline: none; line-height: 1.5;" placeholder="Enter body HTML markup here..."></textarea>
            </div>

            <!-- CSS Editor -->
            <div class="editor-box" style="flex: 1; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.15);">
              <div class="editor-header" style="background: rgba(16, 185, 129, 0.1); border-bottom: 1px solid rgba(16, 185, 129, 0.2); padding: 6px 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: bold; color: #10b981; letter-spacing: 1px;">CSS (Document Styling)</span>
              </div>
              <textarea id="play-css" class="editor-textarea" style="flex: 1; width: 100%; border: none; background: transparent; color: #a9b2c3; font-family: var(--font-mono); font-size: 12px; padding: 10px; resize: none; outline: none; line-height: 1.5;" placeholder="Enter document CSS styles here..."></textarea>
            </div>

            <!-- JavaScript Editor -->
            <div class="editor-box" style="flex: 1; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.15);">
              <div class="editor-header" style="background: rgba(245, 158, 11, 0.1); border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding: 6px 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: bold; color: #f59e0b; letter-spacing: 1px;">JavaScript (Interactive Logic)</span>
              </div>
              <textarea id="play-js" class="editor-textarea" style="flex: 1; width: 100%; border: none; background: transparent; color: #a9b2c3; font-family: var(--font-mono); font-size: 12px; padding: 10px; resize: none; outline: none; line-height: 1.5;" placeholder="Enter standard JavaScript executable logic..."></textarea>
            </div>

            <!-- External Resources CDN Box -->
            <div class="editor-box" style="display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; background: rgba(0,0,0,0.15); padding: 12px; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; user-select: none;" id="play-libs-header">
                <span style="font-size: 11px; font-weight: bold; color: var(--accent-cyan); letter-spacing: 1px; text-transform: uppercase; display: flex; align-items: center; gap: 6px;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  External Libraries (CDNs)
                </span>
                <span id="play-libs-count" style="font-size: 10px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); padding: 1px 6px; border-radius: 10px; color: var(--text-muted);">0 loaded</span>
              </div>
              <div id="play-libs-body" style="display: flex; flex-direction: column; gap: 8px; border-top: 1px solid rgba(255,255,255,0.04); padding-top: 8px;">
                <div style="display: flex; gap: 8px;">
                  <select id="play-lib-select" style="flex: 1; background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-main); border-radius: 4px; padding: 4px 8px; font-size: 12px; outline: none;">
                    <option value="">-- Choose Popular Library --</option>
                    <option value="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">Tailwind CSS (v2.2)</option>
                    <option value="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">Font Awesome Icons (v6.4)</option>
                    <option value="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">Bootstrap CSS (v5.3)</option>
                    <option value="https://code.jquery.com/jquery-3.7.0.min.js">jQuery (v3.7)</option>
                    <option value="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js">Lodash JS</option>
                    <option value="https://cdn.jsdelivr.net/npm/chart.js">Chart.js</option>
                    <option value="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">Animate.css</option>
                  </select>
                  <button class="tool-btn secondary" id="btn-play-add-preset" style="font-size: 11px; padding: 4px 10px; height: 28px;">Add</button>
                </div>
                <div style="display: flex; gap: 8px;">
                  <input type="text" id="play-lib-custom" placeholder="Paste custom CDN .css or .js URL..." style="flex: 1; background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-main); border-radius: 4px; padding: 4px 8px; font-size: 12px; outline: none;">
                  <button class="tool-btn secondary" id="btn-play-add-custom" style="font-size: 11px; padding: 4px 10px; height: 28px;">Add URL</button>
                </div>
                <div id="play-libs-list" style="display: flex; flex-direction: column; gap: 4px; max-height: 100px; overflow-y: auto; padding: 4px 0;">
                  <!-- Active libraries list with delete buttons -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel: Output & Console -->
        <div class="tool-panel" style="display: flex; flex-direction: column; gap: 12px; flex: 1.2;">
          <div class="panel-header" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px;">
            <h3>Visual Sandbox Preview</h3>
            <div style="display: flex; align-items: center; gap: 8px;">
              <!-- Device Selectors -->
              <div class="device-selectors" style="display: flex; background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; padding: 2px;">
                <button class="device-btn" data-size="100%" title="Desktop (100%)" style="background: var(--accent-cyan); border: none; color: #000; cursor: pointer; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 3px;">💻 Full</button>
                <button class="device-btn" data-size="768px" title="Tablet (768px)" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 3px;">📟 Tablet</button>
                <button class="device-btn" data-size="375px" title="Mobile (375px)" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 3px;">📱 Mobile</button>
              </div>
              
              <!-- Download Button -->
              <button class="tool-btn secondary" id="btn-play-download" style="font-size: 11px; height: 26px; padding: 0 8px; display: inline-flex; align-items: center; gap: 4px;" title="Download as Single HTML File">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download
              </button>
            </div>
          </div>

          <!-- Preview Sandbox Frame Container -->
          <div id="play-sandbox-container" style="flex: 1.2; border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; overflow: hidden; background: #fff; min-height: 250px; position: relative; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); margin: 0 auto; width: 100%;">
            <iframe id="play-sandbox" style="width: 100%; height: 100%; border: none; background: #fff;" sandbox="allow-scripts"></iframe>
          </div>

          <!-- Sandbox System Console Output -->
          <div style="flex: 0.8; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden; background: #0c0d12; min-height: 160px; max-height: 250px;">
            <div style="background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 6px 12px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px;">
              <span style="font-size: 11.5px; font-weight: 600; color: var(--text-muted); font-family: monospace;">Simulated Debug Console</span>
              
              <div style="display: flex; gap: 6px; align-items: center;">
                <!-- Console Filters -->
                <div class="console-filters" style="display: flex; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 4px; padding: 1px;">
                  <button class="console-filter-btn active" data-filter="all" style="background: rgba(255,255,255,0.08); border: none; color: var(--text-main); cursor: pointer; padding: 2px 6px; border-radius: 3px; font-size: 9.5px; font-family: monospace; font-weight: 600;">All</button>
                  <button class="console-filter-btn" data-filter="log" style="background: transparent; border: none; color: #10b981; cursor: pointer; padding: 2px 6px; border-radius: 3px; font-size: 9.5px; font-family: monospace; font-weight: 600;">Logs (<span id="count-logs">0</span>)</button>
                  <button class="console-filter-btn" data-filter="warn" style="background: transparent; border: none; color: #f59e0b; cursor: pointer; padding: 2px 6px; border-radius: 3px; font-size: 9.5px; font-family: monospace; font-weight: 600;">Warns (<span id="count-warns">0</span>)</button>
                  <button class="console-filter-btn" data-filter="error" style="background: transparent; border: none; color: var(--accent-rose); cursor: pointer; padding: 2px 6px; border-radius: 3px; font-size: 9.5px; font-family: monospace; font-weight: 600;">Errs (<span id="count-errs">0</span>)</button>
                </div>
                <button class="tool-btn secondary" id="play-console-clear" style="font-size: 10px; height: 20px; padding: 0 8px; line-height: 1; border-color: rgba(255,255,255,0.08);">Clear</button>
              </div>
            </div>
            <div id="play-console-logs" style="flex: 1; overflow-y: auto; padding: 10px; font-family: var(--font-mono); font-size: 11px; display: flex; flex-direction: column; gap: 4px; line-height: 1.4; user-select: text;">
              <div style="color: #636f88; font-style: italic;">Console log messages will print here during script runs.</div>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="play-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Author Code</strong>: Write HTML elements in the structure editor, stylize layouts in the CSS editor, and program interactive operations in JavaScript.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Live Hot-Reload</strong>: By default, **"Auto Run"** is enabled to compile code instantly as you type. Or click **"Run"** to manually refresh the sandbox.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Device & CDN Integrations</strong>: Use the device toolbar to test Mobile/Tablet views, add CSS frameworks (like Tailwind CSS) via CDNs, and filter console logs.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Cyber Glow Button</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Digital Clock Widget</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Presets Inputs</span>
                <div class="tool-guide-io-value">
                  HTML: Custom styled button.<br>
                  CSS: Glowing neon outline styling.<br>
                  JS: Count logic + warning logger.
                </div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Render Behavior</span>
                <div class="tool-guide-io-value">
                  Button hovers with smooth glow, counts clicks, and alerts high frequency triggers in the log terminal.
                </div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Presets Inputs</span>
                <div class="tool-guide-io-value">
                  HTML: Centered glass widget.<br>
                  CSS: Frosted blur styling.<br>
                  JS: <code>setInterval</code> loop with dates.
                </div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Render Behavior</span>
                <div class="tool-guide-io-value">
                  Widget renders a glowing digital clock synchronized to local system time in seconds.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init(container, appInstance) {
    const htmlInput = container.querySelector("#play-html");
    const cssInput = container.querySelector("#play-css");
    const jsInput = container.querySelector("#play-js");
    const runBtn = container.querySelector("#btn-play-run");
    const clearBtn = container.querySelector("#btn-play-clear");
    const sandboxFrame = container.querySelector("#play-sandbox");
    const sandboxContainer = container.querySelector("#play-sandbox-container");
    const consoleClearBtn = container.querySelector("#play-console-clear");
    const consoleLogsContainer = container.querySelector("#play-console-logs");
    const chkAutorun = container.querySelector("#chk-play-autorun");
    
    // CDN Library Elements
    const libsHeader = container.querySelector("#play-libs-header");
    const libsBody = container.querySelector("#play-libs-body");
    const libSelect = container.querySelector("#play-lib-select");
    const customLibInput = container.querySelector("#play-lib-custom");
    const addPresetBtn = container.querySelector("#btn-play-add-preset");
    const addCustomBtn = container.querySelector("#btn-play-add-custom");
    const libsListContainer = container.querySelector("#play-libs-list");
    const downloadBtn = container.querySelector("#btn-play-download");
    
    let activeLibs = [];
    let logCounts = { log: 0, warn: 0, error: 0 };
    let currentSandboxUrl = null;
    let autorunTimeout = null;

    // Expand/Collapse Library Manager
    libsHeader.addEventListener("click", () => {
      const isCollapsed = libsBody.style.display === "none";
      libsBody.style.display = isCollapsed ? "flex" : "none";
    });

    // Render Active Libraries Badges
    const renderActiveLibs = () => {
      const countEl = container.querySelector("#play-libs-count");
      countEl.innerText = `${activeLibs.length} loaded`;
      
      if (activeLibs.length === 0) {
        libsListContainer.innerHTML = `<div style="color: #636f88; font-style: italic; font-size: 11px; padding: 4px 0;">No external libraries loaded.</div>`;
        return;
      }
      
      libsListContainer.innerHTML = activeLibs.map((url, index) => {
        let displayName = url;
        try {
          const u = new URL(url);
          const pathname = u.pathname;
          const parts = pathname.split('/');
          displayName = parts[parts.length - 1] || url;
          if (displayName.length > 28) displayName = '...' + displayName.slice(-25);
        } catch(e) {}
        
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; font-size: 11px;">
            <span style="color: #a9b2c3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 80%;" title="${url}">${displayName}</span>
            <button class="play-lib-remove-btn" data-index="${index}" style="background: transparent; border: none; color: var(--accent-rose); cursor: pointer; font-weight: bold; font-size: 12px; padding: 0 4px;">✕</button>
          </div>
        `;
      }).join('');
      
      // Bind remove handlers
      libsListContainer.querySelectorAll(".play-lib-remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"), 10);
          activeLibs.splice(idx, 1);
          renderActiveLibs();
          compileSandbox();
          appInstance.showToast("Removed external resource", "info");
        });
      });
    };

    // Add CDN Resource Helpers
    const addLibrary = (url) => {
      if (!url || !url.trim().startsWith("http")) {
        appInstance.showToast("Please provide a valid CDN URL starting with http/https", "error");
        return;
      }
      const trimmed = url.trim();
      if (activeLibs.includes(trimmed)) {
        appInstance.showToast("Library is already loaded!", "warn");
        return;
      }
      activeLibs.push(trimmed);
      renderActiveLibs();
      compileSandbox();
      appInstance.showToast("Added external library resource", "success");
    };

    addPresetBtn.addEventListener("click", () => {
      const selected = libSelect.value;
      if (selected) {
        addLibrary(selected);
        libSelect.value = "";
      } else {
        appInstance.showToast("Please select a popular library from the list", "warn");
      }
    });

    addCustomBtn.addEventListener("click", () => {
      const url = customLibInput.value;
      if (url) {
        addLibrary(url);
        customLibInput.value = "";
      } else {
        appInstance.showToast("Please paste a valid URL", "warn");
      }
    });

    // Device size selections
    const deviceBtns = container.querySelectorAll(".device-btn");
    deviceBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        deviceBtns.forEach(b => {
          b.style.background = "transparent";
          b.style.color = "var(--text-muted)";
        });
        btn.style.background = "var(--accent-cyan)";
        btn.style.color = "#000";
        
        const size = btn.getAttribute("data-size");
        sandboxContainer.style.width = size;
        
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('click');
        }
      });
    });

    // Console Filters Selection
    const filterBtns = container.querySelectorAll(".console-filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
          b.style.background = "transparent";
          b.style.color = b.getAttribute("data-filter") === "log" ? "#10b981" : 
                          b.getAttribute("data-filter") === "warn" ? "#f59e0b" : 
                          b.getAttribute("data-filter") === "error" ? "var(--accent-rose)" : "var(--text-muted)";
          b.classList.remove("active");
        });
        btn.style.background = "rgba(255, 255, 255, 0.08)";
        btn.style.color = "var(--text-main)";
        btn.classList.add("active");
        
        const filterVal = btn.getAttribute("data-filter");
        const logElements = consoleLogsContainer.querySelectorAll(".console-item");
        logElements.forEach(el => {
          if (filterVal === "all") {
            el.style.display = "block";
          } else {
            el.style.display = el.classList.contains(`type-${filterVal}`) ? "block" : "none";
          }
        });

        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('click');
        }
      });
    });

    // Update Console counts on UI
    const updateConsoleCounts = () => {
      const logsSpan = container.querySelector("#count-logs");
      const warnsSpan = container.querySelector("#count-warns");
      const errsSpan = container.querySelector("#count-errs");
      
      if (logsSpan) logsSpan.innerText = logCounts.log;
      if (warnsSpan) warnsSpan.innerText = logCounts.warn;
      if (errsSpan) errsSpan.innerText = logCounts.error;
    };
    
    // Tab switching for guide examples
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

    // Helper: Add logs to simulated console
    function appendConsoleLog(type, content) {
      if (consoleLogsContainer.querySelector("div[style*='italic']")) {
        consoleLogsContainer.innerHTML = "";
      }
      
      const logDiv = document.createElement("div");
      logDiv.style.padding = "2px 0";
      logDiv.style.borderBottom = "1px solid rgba(255,255,255,0.02)";
      logDiv.classList.add("console-item");
      logDiv.classList.add(`type-${type}`);
      
      const stampSpan = document.createElement("span");
      stampSpan.style.color = "#565f89";
      stampSpan.style.marginRight = "6px";
      stampSpan.innerText = `[${new Date().toTimeString().split(' ')[0]}]`;
      logDiv.appendChild(stampSpan);

      const typeSpan = document.createElement("span");
      typeSpan.style.fontWeight = "bold";
      typeSpan.style.marginRight = "8px";

      if (type === "error") {
        typeSpan.style.color = "var(--accent-rose)";
        typeSpan.innerText = "✖ [ERR]";
        logDiv.style.background = "rgba(244, 63, 94, 0.05)";
      } else if (type === "warn") {
        typeSpan.style.color = "#f59e0b";
        typeSpan.innerText = "⚠ [WRN]";
        logDiv.style.background = "rgba(245, 158, 11, 0.05)";
      } else {
        typeSpan.style.color = "#10b981";
        typeSpan.innerText = "ℹ [LOG]";
      }
      
      logDiv.appendChild(typeSpan);

      const contentSpan = document.createElement("span");
      contentSpan.style.color = type === "error" ? "#ff7878" : type === "warn" ? "#ffe27d" : "#e0e6f1";
      contentSpan.innerText = content;
      logDiv.appendChild(contentSpan);

      consoleLogsContainer.appendChild(logDiv);
      consoleLogsContainer.scrollTop = consoleLogsContainer.scrollHeight;
      
      // Update Log Counts
      if (logCounts[type] !== undefined) {
        logCounts[type]++;
        updateConsoleCounts();
      }

      // Respect current filter
      const activeFilter = container.querySelector(".console-filter-btn.active")?.getAttribute("data-filter") || "all";
      if (activeFilter !== "all" && activeFilter !== type) {
        logDiv.style.display = "none";
      }
    }

    // Clear Console
    consoleClearBtn.addEventListener("click", () => {
      consoleLogsContainer.innerHTML = '<div style="color: #636f88; font-style: italic;">Console log messages will print here during script runs.</div>';
      logCounts = { log: 0, warn: 0, error: 0 };
      updateConsoleCounts();
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    // Clear All Code Editors
    clearBtn.addEventListener("click", () => {
      htmlInput.value = "";
      cssInput.value = "";
      jsInput.value = "";
      compileSandbox();
      appInstance.showToast("Cleared playground workspace", "info");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    // Rebuild and load sandbox iframe
    function compileSandbox() {
      const htmlCode = htmlInput.value;
      const cssCode = cssInput.value;
      const jsCode = jsInput.value;

      // Extract stylesheets and scripts from loaded CDNs
      let styleTags = "";
      let scriptTags = "";
      
      activeLibs.forEach(url => {
        if (url.endsWith(".css") || url.includes("css") || url.includes("font-awesome") || url.includes("google-fonts")) {
          styleTags += `  <link rel="stylesheet" href="${url}">\n`;
        } else {
          scriptTags += `  <script src="${url}"></script>\n`;
        }
      });

      // Script to intercept console logs and send them to the parent window
      const consoleInterceptor = `
        <script>
          (function() {
            const origLog = console.log;
            const origWarn = console.warn;
            const origError = console.error;
            
            function sendMsg(type, args) {
              const strArgs = Array.from(args).map(arg => {
                if (arg === null) return 'null';
                if (arg === undefined) return 'undefined';
                if (typeof arg === 'object') {
                  try { return JSON.stringify(arg); } catch(e) { return String(arg); }
                }
                return String(arg);
              });
              window.parent.postMessage({ 
                type: 'PLAYGROUND_CONSOLE', 
                logType: type, 
                content: strArgs.join(' ') 
              }, '*');
            }
            
            console.log = function() {
              sendMsg('log', arguments);
              origLog.apply(console, arguments);
            };
            console.warn = function() {
              sendMsg('warn', arguments);
              origWarn.apply(console, arguments);
            };
            console.error = function() {
              sendMsg('error', arguments);
              origError.apply(console, arguments);
            };
            
            window.onerror = function(message, source, lineno, colno, error) {
              window.parent.postMessage({ 
                type: 'PLAYGROUND_CONSOLE', 
                logType: 'error', 
                content: message + ' (line ' + lineno + ')' 
              }, '*');
              return false;
            };
          })();
        </script>
      `;

      const sourceCode = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          ${styleTags}
          <style>
            ${cssCode}
          </style>
          ${consoleInterceptor}
        </head>
        <body>
          ${htmlCode}
          ${scriptTags}
          <script>
            try {
              ${jsCode}
            } catch (err) {
              console.error(err.message);
            }
          </script>
        </body>
        </html>
      `;

      if (currentSandboxUrl) {
        URL.revokeObjectURL(currentSandboxUrl);
      }
      const blob = new Blob([sourceCode], { type: "text/html" });
      currentSandboxUrl = URL.createObjectURL(blob);
      sandboxFrame.src = currentSandboxUrl;
    }

    // Debounced Auto-run trigger
    const triggerAutorun = () => {
      const isAutorun = chkAutorun.checked;
      if (!isAutorun) return;

      clearTimeout(autorunTimeout);
      autorunTimeout = setTimeout(() => {
        compileSandbox();
      }, 600);
    };

    htmlInput.addEventListener("input", triggerAutorun);
    cssInput.addEventListener("input", triggerAutorun);
    jsInput.addEventListener("input", triggerAutorun);

    // Run Code Button handler
    runBtn.addEventListener("click", () => {
      compileSandbox();
      appInstance.showToast("Rebuilt sandbox preview", "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    });

    // Download standalone HTML file
    downloadBtn.addEventListener("click", () => {
      const htmlCode = htmlInput.value;
      const cssCode = cssInput.value;
      const jsCode = jsInput.value;
      
      let styleTags = "";
      let scriptTags = "";
      activeLibs.forEach(url => {
        if (url.endsWith(".css") || url.includes("css") || url.includes("font-awesome") || url.includes("google-fonts")) {
          styleTags += `  <link rel="stylesheet" href="${url}">\n`;
        } else {
          scriptTags += `  <script src="${url}"></script>\n`;
        }
      });
      
      const fileContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OmniTool Hub Playground Export</title>
${styleTags}  <style>
${cssCode.split('\n').map(line => '    ' + line).join('\n')}
  </style>
</head>
<body>
${htmlCode.split('\n').map(line => '  ' + line).join('\n')}

${scriptTags}  <script>
${jsCode.split('\n').map(line => '    ' + line).join('\n')}
  </script>
</body>
</html>`;

      const blob = new Blob([fileContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "playground-export.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      appInstance.showToast("Downloaded standalone HTML file", "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    });

    // Support Tab Key Indentation
    const enableTabIndentation = (textarea) => {
      textarea.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const value = textarea.value;
          textarea.value = value.substring(0, start) + "  " + value.substring(end);
          textarea.selectionStart = textarea.selectionEnd = start + 2;
          textarea.dispatchEvent(new Event("input"));
        }
      });
    };

    enableTabIndentation(htmlInput);
    enableTabIndentation(cssInput);
    enableTabIndentation(jsInput);

    // Support Ctrl+Enter keyboard shortcuts inside textareas to compile manually
    const handleKeyboardShortcut = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        compileSandbox();
        appInstance.showToast("Rebuilt sandbox preview (Shortcut)", "success");
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('success');
        }
      }
    };

    htmlInput.addEventListener("keydown", handleKeyboardShortcut);
    cssInput.addEventListener("keydown", handleKeyboardShortcut);
    jsInput.addEventListener("keydown", handleKeyboardShortcut);

    // Listen for log messages from inside the sandboxed iframe
    const messageListener = (e) => {
      if (e.data && e.data.type === "PLAYGROUND_CONSOLE") {
        appendConsoleLog(e.data.logType, e.data.content);
      }
    };
    window.addEventListener("message", messageListener);

    // Track listener on container for cleanup if required
    container.addEventListener("DOMNodeRemovedFromDocument", () => {
      window.removeEventListener("message", messageListener);
      if (currentSandboxUrl) {
        URL.revokeObjectURL(currentSandboxUrl);
      }
    });

    // Try Example presets
    container.querySelector("#play-guide-load-sample")?.addEventListener("click", () => {
      let preset;
      if (activeExampleIndex === 0) {
        preset = this.defaultTemplates.glowButton;
        appInstance.showToast("Loaded Cyber Glow Button example", "success");
      } else {
        preset = this.defaultTemplates.digitalClock;
        appInstance.showToast("Loaded Digital Clock Widget example", "success");
      }

      htmlInput.value = preset.html;
      cssInput.value = preset.css;
      jsInput.value = preset.js;
      compileSandbox();
    });

    // Initialize with default template
    htmlInput.value = this.defaultTemplates.glowButton.html;
    cssInput.value = this.defaultTemplates.glowButton.css;
    jsInput.value = this.defaultTemplates.glowButton.js;
    
    renderActiveLibs();
    compileSandbox();
  }
};
