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
            <div style="display: flex; gap: 8px;">
              <button class="tool-btn secondary" id="btn-play-run" style="border-color: rgba(0, 242, 254, 0.4); color: var(--accent-cyan);">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:13px; height:13px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Run Code
              </button>
              <button class="tool-btn secondary" id="btn-play-clear" style="font-size: 11px;">Clear All</button>
            </div>
          </div>

          <!-- Stacked Code Editor Boxes -->
          <div class="editors-deck" style="display: flex; flex-direction: column; gap: 12px; flex: 1; min-height: 480px;">
            <!-- HTML Editor -->
            <div class="editor-box" style="flex: 1; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.15);">
              <div class="editor-header" style="background: rgba(157, 78, 221, 0.1); border-bottom: 1px solid rgba(157, 78, 221, 0.2); padding: 6px 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: bold; color: #9d4edd; letter-spacing: 1px;">HTML (Body Structure)</span>
              </div>
              <textarea id="play-html" class="editor-textarea" style="flex: 1; width: 100%; border: none; background: transparent; color: #a9b2c3; font-family: monospace; font-size: 12.5px; padding: 10px; resize: none; outline: none; line-height: 1.5;" placeholder="Enter body HTML markup here..."></textarea>
            </div>

            <!-- CSS Editor -->
            <div class="editor-box" style="flex: 1; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.15);">
              <div class="editor-header" style="background: rgba(16, 185, 129, 0.1); border-bottom: 1px solid rgba(16, 185, 129, 0.2); padding: 6px 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: bold; color: #10b981; letter-spacing: 1px;">CSS (Document Styling)</span>
              </div>
              <textarea id="play-css" class="editor-textarea" style="flex: 1; width: 100%; border: none; background: transparent; color: #a9b2c3; font-family: monospace; font-size: 12.5px; padding: 10px; resize: none; outline: none; line-height: 1.5;" placeholder="Enter document CSS styles here..."></textarea>
            </div>

            <!-- JavaScript Editor -->
            <div class="editor-box" style="flex: 1; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; overflow: hidden; background: rgba(0,0,0,0.15);">
              <div class="editor-header" style="background: rgba(245, 158, 11, 0.1); border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding: 6px 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: bold; color: #f59e0b; letter-spacing: 1px;">JavaScript (Interactive Logic)</span>
              </div>
              <textarea id="play-js" class="editor-textarea" style="flex: 1; width: 100%; border: none; background: transparent; color: #a9b2c3; font-family: monospace; font-size: 12.5px; padding: 10px; resize: none; outline: none; line-height: 1.5;" placeholder="Enter standard JavaScript executable logic..."></textarea>
            </div>
          </div>
        </div>

        <!-- Right Panel: Output & Console -->
        <div class="tool-panel" style="display: flex; flex-direction: column; gap: 12px; flex: 1.2;">
          <div class="panel-header">
            <h3>Visual Sandbox Preview</h3>
          </div>

          <!-- Preview Sandbox Frame Container -->
          <div style="flex: 1.2; border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; overflow: hidden; background: #fff; min-height: 250px; position: relative;">
            <iframe id="play-sandbox" style="width: 100%; height: 100%; border: none; background: #fff;" sandbox="allow-scripts"></iframe>
          </div>

          <!-- Sandbox System Console Output -->
          <div style="flex: 0.8; display: flex; flex-direction: column; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; overflow: hidden; background: #0c0d12; min-height: 160px; max-height: 250px;">
            <div style="background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.06); padding: 6px 12px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11.5px; font-weight: 600; color: var(--text-muted); font-family: monospace;">Simulated Debug Console</span>
              <button class="tool-btn secondary" id="play-console-clear" style="font-size: 10px; height: 20px; padding: 0 8px; line-height: 1; border-color: rgba(255,255,255,0.08);">Clear</button>
            </div>
            <div id="play-console-logs" style="flex: 1; overflow-y: auto; padding: 10px; font-family: monospace; font-size: 11.5px; display: flex; flex-direction: column; gap: 4px; line-height: 1.4; user-select: text;">
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
              <div class="tool-guide-step-text"><strong>Author Code</strong>: Write standard structure tags inside HTML, add stylistic layouts in CSS, and construct event handlers in JavaScript.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Launch Render</strong>: Click **"Run Code"** (or use the shortcut <code>Ctrl + Enter</code> inside editors) to compile and load the sandbox frame.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Debug Terminal</strong>: Inspect output parameters, variable dumps, and compiler errors in the dark console window at the bottom.</div>
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
    const consoleClearBtn = container.querySelector("#play-console-clear");
    const consoleLogsContainer = container.querySelector("#play-console-logs");
    
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
    }

    // Clear Console
    consoleClearBtn.addEventListener("click", () => {
      consoleLogsContainer.innerHTML = '<div style="color: #636f88; font-style: italic;">Console log messages will print here during script runs.</div>';
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
          <style>
            ${cssCode}
          </style>
          ${consoleInterceptor}
        </head>
        <body>
          ${htmlCode}
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

      const blob = new Blob([sourceCode], { type: "text/html" });
      sandboxFrame.src = URL.createObjectURL(blob);
    }

    // Run Code Button handler
    runBtn.addEventListener("click", () => {
      compileSandbox();
      appInstance.showToast("Rebuilt sandbox preview", "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    });

    // Support Ctrl+Enter keyboard shortcuts inside textareas to compile
    const handleKeyboardShortcut = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        compileSandbox();
        appInstance.showToast("Rebuilt sandbox preview (Keyboard Shortcut)", "success");
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
    compileSandbox();
  }
};
