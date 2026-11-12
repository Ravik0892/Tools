import { escapeHtml } from './utils.js';

export default {
  id: "markdown-preview",
  name: "Live Markdown Previewer",

  renderUI() {
    return `
      <!-- Main Editor & Preview Workspace (Direct 2-view split layout) -->
      <div class="tool-content-layout split-view" id="md-workspace-layout">
        <!-- Left Panel: Markdown Input & Editor Controls -->
        <div class="tool-panel" id="md-editor-panel" style="display: flex; flex-direction: column; overflow-y: auto; min-height: 480px;">
          <div class="panel-header" style="justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; position: sticky; top: 0; z-index: 20; background: var(--bg-card); backdrop-filter: blur(8px); flex-shrink: 0;">
            <div style="display: flex; align-items: center; gap: 8px; min-width: 0;">
              <h3 style="margin: 0; font-size: 14px; white-space: nowrap;">Markdown Input</h3>
              <span id="md-autosave-badge" style="font-size: 10px; color: var(--accent-emerald); background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); padding: 1px 6px; border-radius: 10px;">Autosaved</span>
            </div>
            <!-- File Operations & Size Options inside Editor Panel -->
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; min-width: 0;">
              <div style="display: inline-flex; align-items: center; gap: 4px;">
                <label for="md-editor-height-select" style="font-size: 11px; color: var(--text-muted); cursor: pointer;" title="Adjust Editor Textbox Height">Size:</label>
                <select id="md-editor-height-select" class="form-select" style="height: 28px; font-size: 11px; padding: 2px 6px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); color: var(--text-main); border-radius: 6px;" title="Increase text box size to test container scrolling">
                  <option value="460">Default (460px)</option>
                  <option value="600">Large (600px)</option>
                  <option value="850">Extra Large (850px)</option>
                  <option value="1200">Maximum (1200px)</option>
                  <option value="fit">Fit Viewport</option>
                </select>
              </div>
              <input type="file" id="md-file-input" accept=".md,.markdown,.txt" style="display: none;">
              <button class="tool-btn secondary" id="md-open-file" title="Open Markdown or Text File" style="font-size: 11px; padding: 4px 8px; height: 28px;">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 3px;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> Open
              </button>
              <button class="tool-btn secondary" id="md-load-sample" title="Load Rich Sample Template" style="font-size: 11px; padding: 4px 8px; height: 28px;">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 3px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> Sample
              </button>
              <button class="tool-btn secondary" id="md-clear" title="Clear Editor Content" style="font-size: 11px; padding: 4px 8px; height: 28px;">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 3px;"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Clear
              </button>
            </div>
          </div>

          <!-- Extended Markdown Helper Toolbar (Tier 2) -->
          <div style="display: flex; gap: 4px; flex-wrap: wrap; padding: 6px 10px; background: rgba(255, 255, 255, 0.02); border-bottom: 1px solid var(--border-color); align-items: center; min-height: 40px; box-sizing: border-box; position: sticky; top: 41px; z-index: 15; backdrop-filter: blur(8px); flex-shrink: 0;">
            <button class="tool-btn secondary" id="md-helper-h1" title="Heading 1" style="font-size: 11px; padding: 3px 7px; font-weight: bold;">H1</button>
            <button class="tool-btn secondary" id="md-helper-h2" title="Heading 2" style="font-size: 11px; padding: 3px 7px; font-weight: bold;">H2</button>
            <button class="tool-btn secondary" id="md-helper-h3" title="Heading 3" style="font-size: 11px; padding: 3px 7px; font-weight: bold;">H3</button>
            <div style="width: 1px; height: 16px; background: var(--border-color); margin: 0 2px;"></div>
            <button class="tool-btn secondary" id="md-helper-bold" title="Bold (Ctrl+B)" style="font-size: 11px; padding: 3px 7px; font-weight: 800;">B</button>
            <button class="tool-btn secondary" id="md-helper-italic" title="Italic (Ctrl+I)" style="font-size: 11px; padding: 3px 7px; font-style: italic;">I</button>
            <button class="tool-btn secondary" id="md-helper-strike" title="Strikethrough (Ctrl+Shift+X)" style="font-size: 11px; padding: 3px 7px; text-decoration: line-through;">S</button>
            <button class="tool-btn secondary" id="md-helper-mark" title="Highlight Text (==text==)" style="font-size: 11px; padding: 3px 7px; background: rgba(245, 158, 11, 0.15); color: #fbbf24;">HL</button>
            <button class="tool-btn secondary" id="md-helper-math" title="Insert Math Equation ($...$)" style="font-size: 11px; padding: 3px 7px; color: var(--accent-cyan);">$fx$</button>
            <div style="width: 1px; height: 16px; background: var(--border-color); margin: 0 2px;"></div>
            <button class="tool-btn secondary" id="md-helper-code" title="Inline Code" style="font-size: 11px; padding: 3px 7px; font-family: var(--font-mono);">&lt;/&gt;</button>
            <button class="tool-btn secondary" id="md-helper-codeblock" title="Code Block" style="font-size: 11px; padding: 3px 7px; font-family: var(--font-mono);">&#96;&#96;&#96;</button>
            <button class="tool-btn secondary" id="md-helper-link" title="Insert Link (Ctrl+K)" style="font-size: 11px; padding: 3px 7px;">Link</button>
            <button class="tool-btn secondary" id="md-helper-img" title="Insert Image" style="font-size: 11px; padding: 3px 7px;">Image</button>
            <div style="width: 1px; height: 16px; background: var(--border-color); margin: 0 2px;"></div>
            <button class="tool-btn secondary" id="md-helper-quote" title="Blockquote" style="font-size: 11px; padding: 3px 7px;">Quote</button>
            <button class="tool-btn secondary" id="md-helper-alert" title="GitHub Note Alert" style="font-size: 11px; padding: 3px 7px; color: #60a5fa;">Alert</button>
            <button class="tool-btn secondary" id="md-helper-ul" title="Bullet List" style="font-size: 11px; padding: 3px 7px;">• List</button>
            <button class="tool-btn secondary" id="md-helper-ol" title="Numbered List" style="font-size: 11px; padding: 3px 7px;">1. List</button>
            <button class="tool-btn secondary" id="md-helper-task" title="Task List Checkbox" style="font-size: 11px; padding: 3px 7px; color: var(--accent-cyan);">[✓] Task</button>
            <div style="width: 1px; height: 16px; background: var(--border-color); margin: 0 2px;"></div>
            <button class="tool-btn secondary" id="md-helper-table" title="Insert GFM Table" style="font-size: 11px; padding: 3px 7px;">Table</button>
            <button class="tool-btn secondary" id="md-helper-hr" title="Horizontal Divider" style="font-size: 11px; padding: 3px 7px;">---</button>
          </div>

          <textarea 
            class="input-textarea" 
            id="md-input" 
            placeholder="Type Markdown here or drag & drop a .md file..." 
            aria-label="Markdown Input" 
            style="border: none; border-radius: 0; flex: 0 0 auto; width: 100%; height: 460px; min-height: 280px; overflow-y: auto; resize: vertical; font-family: var(--font-mono); font-size: 13px; line-height: 1.55; padding: 16px; box-sizing: border-box;"></textarea>

          <!-- Document Metrics Status Bar (Always pinned at bottom) -->
          <div class="md-stats-bar" style="flex-shrink: 0;">
            <div class="md-stats-group">
              <span class="md-stat-badge">Words: <strong id="md-stat-words">0</strong></span>
              <span class="md-stat-badge">Chars: <strong id="md-stat-chars">0</strong></span>
              <span class="md-stat-badge">Lines: <strong id="md-stat-lines">0</strong></span>
            </div>
            <div class="md-stats-group">
              <span class="md-stat-badge" title="Estimated reading time at ~200 words per minute">Reading: <strong id="md-stat-readtime">0 min</strong></span>
              <span class="md-stat-badge" title="Estimated speaking time at ~130 words per minute">Speaking: <strong id="md-stat-speaktime">0 min</strong></span>
            </div>
          </div>
        </div>

        <!-- Right Panel: Live Visual Preview / Raw HTML / Table of Contents -->
        <div class="tool-panel" id="md-preview-panel" style="display: flex; flex-direction: column; overflow-y: auto; min-height: 480px;">
          <!-- Tier 1: Panel Header (Clean View Mode Switcher + app.js automatically appends Reset 50/50 & Full Screen) -->
          <div class="panel-header" style="justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; position: sticky; top: 0; z-index: 20; background: var(--bg-card); backdrop-filter: blur(8px); flex-shrink: 0;">
            <div class="md-view-tabs" id="md-output-tabs" style="display: inline-flex; align-items: center;">
              <button class="md-view-tab active" data-tab="preview" id="md-tab-btn-preview">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg> Live Preview
              </button>
              <button class="md-view-tab" data-tab="raw" id="md-tab-btn-raw">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> Raw HTML
              </button>
              <button class="md-view-tab" data-tab="toc" id="md-tab-btn-toc">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg> Outline
              </button>
            </div>
            <!-- app.js auto-injects .preview-header-actions here with Reset 50/50 and Full Screen -->
          </div>

          <!-- Tier 2: Dedicated Secondary Preview Ribbon (Theme, Sync & Actions) -->
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; padding: 6px 10px; background: rgba(255, 255, 255, 0.02); border-bottom: 1px solid var(--border-color); min-height: 40px; box-sizing: border-box; position: sticky; top: 41px; z-index: 15; backdrop-filter: blur(8px); flex-shrink: 0;">
            <!-- Left Group: Theme & Sync -->
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="display: inline-flex; align-items: center; gap: 4px;">
                <label for="md-theme-select" style="font-size: 11px; color: var(--text-muted);">Theme:</label>
                <select id="md-theme-select" class="form-select" style="height: 26px; font-size: 11px; padding: 1px 6px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); color: var(--text-main); border-radius: 6px;">
                  <option value="default">Default Dark</option>
                  <option value="theme-github">GitHub Dark</option>
                  <option value="theme-obsidian">Obsidian</option>
                  <option value="theme-light">Light Paper</option>
                </select>
              </div>
              <button class="tool-btn secondary active" id="md-toggle-sync" title="Toggle Synchronized Scrolling" style="font-size: 10.5px; padding: 3px 8px; height: 26px;">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 3px;"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 4v12m0 0l4-4m-4 4l-4-4"/></svg> <span id="md-sync-label">Sync: ON</span>
              </button>
            </div>

            <!-- Right Group: Copy & Export Actions -->
            <div style="display: flex; align-items: center; gap: 4px;">
              <button class="tool-btn secondary" id="md-copy-btn" title="Copy Raw HTML markup" style="font-size: 11px; padding: 3px 7px; height: 26px;">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> HTML
              </button>
              <button class="tool-btn secondary" id="md-copy-rich-btn" title="Copy rich formatted text for Docs or Word" style="font-size: 11px; padding: 3px 7px; height: 26px;">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg> Rich
              </button>
              <div style="width: 1px; height: 16px; background: var(--border-color); margin: 0 1px;"></div>
              <button class="tool-btn secondary" id="md-download-md" title="Download Markdown file (.md)" style="font-size: 11px; padding: 3px 6px; height: 26px;">.md</button>
              <button class="tool-btn secondary" id="md-download-html" title="Download Standalone HTML file (.html)" style="font-size: 11px; padding: 3px 6px; height: 26px;">.html</button>
              <button class="tool-btn secondary" id="md-print-btn" title="Print document or save to PDF" style="font-size: 11px; padding: 3px 6px; height: 26px;">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              </button>
            </div>
          </div>

          <!-- View 1: Formatted Live Preview -->
          <div class="markdown-preview" id="md-preview-output" style="border: none; border-radius: 0; flex: 0 0 auto; width: 100%; min-height: 460px; overflow-y: auto; box-sizing: border-box; padding: 18px 22px;"></div>

          <!-- View 2: Raw HTML Output -->
          <div class="markdown-preview" id="md-raw-html-output" style="display: none; border: none; border-radius: 0; flex: 0 0 auto; width: 100%; min-height: 460px; overflow-y: auto; box-sizing: border-box; padding: 18px 22px;">
            <pre style="margin: 0; padding: 0; background: transparent;"><code class="md-raw-html" id="md-raw-html-code"></code></pre>
          </div>

          <!-- View 3: Table of Contents Outline -->
          <div class="markdown-preview" id="md-toc-output" style="display: none; border: none; border-radius: 0; flex: 0 0 auto; width: 100%; min-height: 460px; overflow-y: auto; box-sizing: border-box; padding: 18px 22px;">
            <div class="md-toc-container" id="md-toc-container">
              <div class="md-toc-title">📑 Document Outline</div>
              <ul class="md-toc-list" id="md-toc-list">
                <li style="color: var(--text-muted); font-size: 13px;">No headings detected yet. Use #, ##, or ### to generate an outline.</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Supported Syntax</span>
            </div>
            <button class="tool-btn secondary" id="md-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Write or Drop Files</strong>: Drag &amp; drop any <code>.md</code> file into the editor, or use quick formatting buttons and shortcuts (<kbd>Ctrl+B</kbd>, <kbd>Ctrl+I</kbd>, <kbd>Ctrl+K</kbd>).</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>GFM Markdown Support</strong>: Renders GitHub tables, interactive task checklists, code blocks with copy buttons, math formulas, and GitHub alert callouts (<code>&gt; [!NOTE]</code>, <code>&gt; [!TIP]</code>).</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Publish &amp; Export</strong>: Copy clean HTML, copy formatted rich-text to paste directly into Google Docs or Word, or export as standalone <code>.md</code> or <code>.html</code> files.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">GFM Table &amp; Alerts</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Tasks &amp; Highlights</button>
              </div>
            </div>
            <!-- Example 1: Tables and Alerts -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Markdown Input</span>
                <div class="tool-guide-io-value">| Tool | Type | Status |
| :--- | :---: | ---: |
| Markdown | Client | Active |

> [!NOTE]
> 100% private in browser memory.</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Rendered Preview</span>
                <div class="tool-guide-io-value markdown-preview" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; min-height: auto; max-height: none;"><table><thead><tr><th>Tool</th><th>Type</th><th>Status</th></tr></thead><tbody><tr><td>Markdown</td><td>Client</td><td>Active</td></tr></tbody></table>
<div class="md-alert md-alert-note"><div class="md-alert-title"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg> Note</div><div class="md-alert-body">100% private in browser memory.</div></div></div>
              </div>
            </div>
            <!-- Example 2: Checklists and Highlights -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Markdown Input</span>
                <div class="tool-guide-io-value">- [x] Completed task
- [ ] Upcoming ==highlighted== item
~~Deprecated method~~</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Rendered Preview</span>
                <div class="tool-guide-io-value markdown-preview" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; min-height: auto; max-height: none;"><ul><li class="task-list-item"><input type="checkbox" class="task-checkbox" checked disabled> <span><del>Completed task</del></span></li>
<li class="task-list-item"><input type="checkbox" class="task-checkbox" disabled> <span>Upcoming <mark>highlighted</mark> item</span></li></ul>
<p><del>Deprecated method</del></p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
    const mdInput = container.querySelector("#md-input");
    const mdPreviewOutput = container.querySelector("#md-preview-output");
    const mdRawHtmlOutput = container.querySelector("#md-raw-html-output");
    const mdRawHtmlCode = container.querySelector("#md-raw-html-code");
    const mdTocOutput = container.querySelector("#md-toc-output");
    const mdTocList = container.querySelector("#md-toc-list");

    // Stats elements
    const statWords = container.querySelector("#md-stat-words");
    const statChars = container.querySelector("#md-stat-chars");
    const statLines = container.querySelector("#md-stat-lines");
    const statReadTime = container.querySelector("#md-stat-readtime");
    const statSpeakTime = container.querySelector("#md-stat-speaktime");

    let currentGeneratedHtml = "";
    let activeTab = "preview"; // "preview" | "raw" | "toc"
    let syncScrollEnabled = true;

    // KaTeX CDN dynamic loader for scientific math rendering
    let katexLoaded = false;
    let katexLoading = false;
    const katexCallbacks = [];

    function ensureKaTeXLoaded(callback) {
      if (typeof window === "undefined") return;
      if (window.katex) {
        katexLoaded = true;
        if (callback) callback();
        return;
      }
      if (callback) katexCallbacks.push(callback);
      if (katexLoading) return;
      katexLoading = true;

      try {
        if (!document.querySelector("#katex-cdn-css")) {
          const link = document.createElement("link");
          link.id = "katex-cdn-css";
          link.rel = "stylesheet";
          link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
          document.head.appendChild(link);
        }

        if (!document.querySelector("#katex-cdn-script")) {
          const script = document.createElement("script");
          script.id = "katex-cdn-script";
          script.src = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js";
          script.async = true;
          script.onload = () => {
            katexLoaded = true;
            katexLoading = false;
            while (katexCallbacks.length > 0) {
              const cb = katexCallbacks.shift();
              try { cb(); } catch (e) {}
            }
          };
          script.onerror = () => {
            katexLoading = false;
            katexCallbacks.length = 0;
          };
          document.head.appendChild(script);
        }
      } catch (e) {
        katexLoading = false;
        katexCallbacks.length = 0;
      }
    }

    // URL Sanitizer to prevent XSS (blocks javascript:, vbscript:, data: schemes)
    // and preserves query parameters without entity double-escaping
    function sanitizeUrl(url) {
      if (!url) return "#";
      const trimmed = url.trim().replace(/&amp;/g, '&');
      if (/^(https?:\/\/|mailto:|tel:|#|\/|\.\/|\.\.\/)/i.test(trimmed)) {
        return escapeHtml(trimmed);
      }
      return "#unsafe-link-blocked";
    }

    // Math renderer helper (KaTeX with fallback)
    function renderMathFormula(math, displayMode) {
      if (typeof window !== "undefined" && window.katex && typeof window.katex.renderToString === "function") {
        try {
          return window.katex.renderToString(math, { displayMode: Boolean(displayMode), throwOnError: false });
        } catch (e) {}
      }
      if (displayMode) {
        return '<div class="md-math-block" data-math="' + escapeHtml(math) + '"><pre class="md-math-display"><code>$$' + escapeHtml(math) + '$$</code></pre></div>';
      }
      return '<span class="md-math-inline" data-math="' + escapeHtml(math) + '"><code>$' + escapeHtml(math) + '$</code></span>';
    }

    // Comprehensive GFM Markdown Parser Engine
    function parseMarkdown(raw) {
      if (!raw || !raw.trim()) {
        return {
          html: '<span style="color: var(--text-muted); font-style: italic;">Markdown preview will render here...</span>',
          rawHtml: '',
          toc: []
        };
      }

      const toc = [];
      const slugCounts = {};

      function makeSlug(text) {
        let slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        if (!slug) slug = 'section';
        if (slugCounts[slug]) {
          slugCounts[slug]++;
          slug = slug + '-' + slugCounts[slug];
        } else {
          slugCounts[slug] = 1;
        }
        return slug;
      }

      // Step 1: Protect fenced code blocks with tokens
      const codeBlocks = [];
      let text = raw.replace(/(?:^|\n)```([a-zA-Z0-9_+#.-]*)[^\n]*\r?\n([\s\S]*?)\r?\n```[ \t]*(?=\n|$)/g, (match, lang, code) => {
        const id = codeBlocks.length;
        codeBlocks.push({
          lang: (lang || '').trim(),
          code: escapeHtml(code.trimEnd())
        });
        return '\n\n@@CODEBLOCK_' + id + '@@\n\n';
      });

      // Step 2: Protect Display Math blocks ($$...$$)
      const mathBlocks = [];
      text = text.replace(/(?:^|\n)\$\$([\s\S]*?)\$\$(?=\n|$)/g, (match, math) => {
        const id = mathBlocks.length;
        mathBlocks.push(math.trim());
        return '\n\n@@MATHBLOCK_' + id + '@@\n\n';
      });

      // Step 3: Protect Inline Code (`...`) and Inline Math ($...$)
      const inlineTokens = [];
      function saveInlineToken(type, content) {
        const id = inlineTokens.length;
        inlineTokens.push({ type, content });
        return '@@INLINETOKEN_' + id + '@@';
      }

      // Inline code extracted and escaped once here
      text = text.replace(/`([^`\r\n]+)`/g, (match, code) => {
        return saveInlineToken('code', escapeHtml(code));
      });

      // Inline math ($...$) - strictly avoids matching currency like $5 and $10
      text = text.replace(/(?<![\w\$])\$(?!\s)([^\$\r\n]+?)(?<!\s)\$(?![0-9\w])/g, (match, math) => {
        if (/^\d+(\.\d+)?(\s+(and|or|to)\s+)?$/i.test(math.trim())) return match;
        return saveInlineToken('math', math.trim());
      });

      // Step 4: Basic HTML escaping on prose text
      text = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

      // Inline formatting helper
      function formatInline(str) {
        if (!str) return '';

        // Stash links and images so internal URLs are NEVER touched by bold/italic
        const linkTokens = [];
        function saveLinkToken(html) {
          const id = linkTokens.length;
          linkTokens.push(html);
          return '@@LINKTOKEN_' + id + '@@';
        }

        // Images: ![alt](url "title")
        str = str.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (m, alt, url, title) => {
          const safeUrl = sanitizeUrl(url);
          const titleAttr = title ? ' title="' + escapeHtml(title) + '"' : '';
          return saveLinkToken('<img src="' + safeUrl + '" alt="' + escapeHtml(alt) + '"' + titleAttr + ' loading="lazy" />');
        });

        // Links: [text](url "title")
        str = str.replace(/\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g, (m, label, url, title) => {
          const safeUrl = sanitizeUrl(url);
          const titleAttr = title ? ' title="' + escapeHtml(title) + '"' : '';
          const isInternal = safeUrl.startsWith("#");
          const targetAttr = isInternal ? '' : ' target="_blank" rel="noopener noreferrer"';
          return saveLinkToken('<a href="' + safeUrl + '"' + targetAttr + titleAttr + '>' + label + '</a>');
        });

        // Bold + Italic: ***text***
        str = str.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');

        // Bold: **text** or __text__
        str = str.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        str = str.replace(/(?<=\s|^|[([{"'<])__([^_]+)__(?=\s|$|[)\]}"'>.,!?:;])/g, '<strong>$1</strong>');

        // Italic: *text* or _text_ (with boundary checks to prevent snake_case words from italicizing)
        str = str.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        str = str.replace(/(?<=\s|^|[([{"'<])_([^\s_].*?[^\s_]?)_(?=\s|$|[)\]}"'>.,!?:;])/g, '<em>$1</em>');

        // Strikethrough: ~~text~~
        str = str.replace(/~~([^~]+)~~/g, '<del>$1</del>');

        // Highlight: ==text==
        str = str.replace(/==([^=]+)==/g, '<mark>$1</mark>');

        // Subscript: ~text~
        str = str.replace(/(?<!~)~([^~ \t\r\n]+)~(?!~)/g, '<sub>$1</sub>');

        // Superscript: ^text^
        str = str.replace(/\^([^\^ \t\r\n]+)\^/g, '<sup>$1</sup>');

        // Safe HTML tags
        str = str.replace(/&lt;kbd&gt;([\s\S]*?)&lt;\/kbd&gt;/gi, '<kbd>$1</kbd>');
        str = str.replace(/&lt;br\s*\/?&gt;/gi, '<br>');
        str = str.replace(/&lt;mark&gt;([\s\S]*?)&lt;\/mark&gt;/gi, '<mark>$1</mark>');
        str = str.replace(/&lt;sub&gt;([\s\S]*?)&lt;\/sub&gt;/gi, '<sub>$1</sub>');
        str = str.replace(/&lt;sup&gt;([\s\S]*?)&lt;\/sup&gt;/gi, '<sup>$1</sup>');

        // Restore link tokens
        str = str.replace(/@@LINKTOKEN_(\d+)@@/g, (m, id) => linkTokens[parseInt(id, 10)] || '');

        // Restore inline tokens (Code & Math)
        str = str.replace(/@@INLINETOKEN_(\d+)@@/g, (m, id) => {
          const tok = inlineTokens[parseInt(id, 10)];
          if (!tok) return '';
          if (tok.type === 'code') {
            return '<code>' + tok.content + '</code>';
          }
          if (tok.type === 'math') {
            return renderMathFormula(tok.content, false);
          }
          return '';
        });

        return str;
      }

      // Step 5: Parse Tables with cell protection
      function renderTableBlock(lines) {
        if (lines.length < 2) return null;
        const headerLine = lines[0].trim();
        const sepLine = lines[1].trim();

        if (!headerLine.includes('|') || !sepLine.includes('|')) return null;
        if (!/^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(sepLine)) return null;

        const parseCells = (row) => {
          let clean = row.trim();
          if (clean.startsWith('|')) clean = clean.slice(1);
          if (clean.endsWith('|')) clean = clean.slice(0, -1);
          return clean.split(/(?<!\\)\|/).map(c => c.trim().replace(/\\\|/g, '|'));
        };

        const headers = parseCells(headerLine);
        const seps = parseCells(sepLine);
        const alignments = seps.map(s => {
          const left = s.startsWith(':');
          const right = s.endsWith(':');
          if (left && right) return 'center';
          if (right) return 'right';
          if (left) return 'left';
          return 'left';
        });

        let out = '<table><thead><tr>';
        headers.forEach((h, i) => {
          const align = alignments[i] ? ' style="text-align: ' + alignments[i] + '"' : '';
          out += '<th' + align + '>' + formatInline(h) + '</th>';
        });
        out += '</tr></thead><tbody>';

        for (let i = 2; i < lines.length; i++) {
          const row = lines[i].trim();
          if (!row || !row.includes('|')) continue;
          const cells = parseCells(row);
          out += '<tr>';
          headers.forEach((_, idx) => {
            const cellVal = cells[idx] !== undefined ? cells[idx] : '';
            const align = alignments[idx] ? ' style="text-align: ' + alignments[idx] + '"' : '';
            out += '<td' + align + '>' + formatInline(cellVal) + '</td>';
          });
          out += '</tr>';
        }
        out += '</tbody></table>';
        return out;
      }

      // Step 6: Parse List Blocks with Indented Hierarchy and Interactive Task Tracking
      let totalTasks = 0;
      function renderListBlock(lines) {
        let out = '';
        const isOrdered = /^\s*\d+\.\s+/.test(lines[0]);
        const isTask = lines.some(l => /^\s*[\-\*\+]\s+\[([ xX])\]\s+/.test(l));

        if (isTask) {
          out += '<ul style="list-style: none; padding-left: 0;">';
          lines.forEach(line => {
            const m = line.match(/^(\s*)[\-\*\+]\s+\[([ xX])\]\s+(.*)$/);
            if (m) {
              const indent = m[1].length;
              const isChecked = m[2].toLowerCase() === 'x';
              const taskText = formatInline(m[3]);
              const taskId = totalTasks++;
              const padStyle = indent > 0 ? ' style="margin-left: ' + (indent * 12) + 'px;"' : '';
              out += '<li class="task-list-item"' + padStyle + '>' +
                '<input type="checkbox" class="task-checkbox" data-task-index="' + taskId + '" ' + (isChecked ? 'checked' : '') + ' /> ' +
                '<span>' + (isChecked ? '<del>' + taskText + '</del>' : taskText) + '</span>' +
              '</li>';
            } else {
              out += '<li>' + formatInline(line) + '</li>';
            }
          });
          out += '</ul>';
          return out;
        }

        const tag = isOrdered ? 'ol' : 'ul';
        out += '<' + tag + '>';
        let prevIndent = 0;

        lines.forEach(line => {
          const m = isOrdered ? line.match(/^(\s*)\d+\.\s+(.*)$/) : line.match(/^(\s*)[\-\*\+]\s+(.*)$/);
          if (m) {
            const indent = m[1].length;
            const content = formatInline(m[2]);
            if (indent > prevIndent) {
              out += '<' + tag + '><li>' + content + '</li>';
            } else if (indent < prevIndent) {
              out += '</' + tag + '><li>' + content + '</li>';
            } else {
              out += '<li>' + content + '</li>';
            }
            prevIndent = indent;
          }
        });

        while (prevIndent > 0) {
          out += '</' + tag + '>';
          prevIndent -= 2;
        }

        out += '</' + tag + '>';
        return out;
      }

      // Step 7: Normalize block boundaries and parse blocks
      text = text.replace(/([^\n])\r?\n(#{1,6}\s+[^\n]+)/g, '$1\n\n$2');
      text = text.replace(/(#{1,6}\s+[^\n]+)\r?\n([^\n])/g, '$1\n\n$2');
      text = text.replace(/([^\n])\r?\n(&gt;\s*\[!(?:NOTE|TIP|WARNING|IMPORTANT|CAUTION)\])/gi, '$1\n\n$2');
      text = text.replace(/([^\n])\r?\n(---|___|\*\*\*)\r?\n/g, '$1\n\n$2\n\n');

      const blocks = text.split(/\r?\n\r?\n+/);
      const renderedBlocks = [];

      for (let block of blocks) {
        block = block.trim();
        if (!block) continue;

        // Fenced code block placeholder check
        if (block.startsWith('@@CODEBLOCK_') && block.endsWith('@@')) {
          renderedBlocks.push(block);
          continue;
        }

        // Display math placeholder check
        if (block.startsWith('@@MATHBLOCK_') && block.endsWith('@@')) {
          renderedBlocks.push(block);
          continue;
        }

        // Horizontal Rule
        if (/^(---|___|\*\*\*)$/.test(block)) {
          renderedBlocks.push('<hr />');
          continue;
        }

        // Heading with anchor permalink
        const headingMatch = block.match(/^(#{1,6})\s+(.*)$/);
        if (headingMatch) {
          const level = headingMatch[1].length;
          const headingText = headingMatch[2].trim();
          const cleanText = headingText.replace(/[*_~`#]/g, '');
          const slug = makeSlug(cleanText);
          toc.push({ level, title: cleanText, id: slug });
          renderedBlocks.push(
            '<h' + level + ' id="' + slug + '">' +
              '<a href="#' + slug + '" class="md-heading-anchor" aria-hidden="true">#</a>' +
              formatInline(headingText) +
            '</h' + level + '>'
          );
          continue;
        }

        const lines = block.split(/\r?\n/);

        // Check for Table
        if (lines.length >= 2 && lines[0].includes('|') && lines[1].includes('|') && /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(lines[1].trim())) {
          const tableHtml = renderTableBlock(lines);
          if (tableHtml) {
            renderedBlocks.push(tableHtml);
            continue;
          }
        }

        // GitHub Alert / Callout block: > [!NOTE], > [!TIP], > [!WARNING], > [!IMPORTANT], > [!CAUTION]
        const firstLine = lines[0].trim();
        const alertMatch = firstLine.match(/^&gt;\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);
        if (alertMatch) {
          const type = alertMatch[1].toUpperCase();
          const bodyLines = [];
          for (let i = 1; i < lines.length; i++) {
            bodyLines.push(lines[i].replace(/^&gt;\s?/, ''));
          }
          const bodyHtml = bodyLines.map(l => formatInline(l)).join('<br>');
          const alertClass = 'md-alert md-alert-' + type.toLowerCase();
          const title = type.charAt(0) + type.slice(1).toLowerCase();
          renderedBlocks.push(
            '<div class="' + alertClass + '">' +
              '<div class="md-alert-title">' +
                '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' +
                ' ' + title +
              '</div>' +
              '<div class="md-alert-body">' + (bodyHtml || '') + '</div>' +
            '</div>'
          );
          continue;
        }

        // Standard Blockquote (> quote)
        if (lines.every(l => l.trim().startsWith('&gt;'))) {
          const quoteContent = lines.map(l => formatInline(l.trim().replace(/^&gt;\s?/, ''))).join('<br>');
          renderedBlocks.push('<blockquote>' + quoteContent + '</blockquote>');
          continue;
        }

        // Task List or Regular List
        if (lines.some(l => /^\s*[\-\*\+]\s+/.test(l) || /^\s*\d+\.\s+/.test(l))) {
          renderedBlocks.push(renderListBlock(lines));
          continue;
        }

        // Regular Paragraph with internal line breaks
        const paraContent = lines.map(l => formatInline(l)).join('<br>');
        renderedBlocks.push('<p>' + paraContent + '</p>');
      }

      let finalHtml = renderedBlocks.join('\n');

      // Step 8: Restore Math Blocks
      finalHtml = finalHtml.replace(/@@MATHBLOCK_(\d+)@@/g, (match, idStr) => {
        const item = mathBlocks[parseInt(idStr, 10)];
        if (!item) return '';
        return renderMathFormula(item, true);
      });

      // Step 9: Restore code block tokens
      finalHtml = finalHtml.replace(/@@CODEBLOCK_(\d+)@@/g, (match, idStr) => {
        const item = codeBlocks[parseInt(idStr, 10)];
        if (!item) return '';
        const langDisplay = item.lang ? item.lang.toUpperCase() : 'TEXT';
        return (
          '<div class="md-code-block" data-code="' + encodeURIComponent(item.code) + '">' +
            '<div class="md-code-header">' +
              '<span class="md-code-lang">' + escapeHtml(langDisplay) + '</span>' +
              '<button class="md-copy-code-btn" type="button" title="Copy code">' +
                '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>' +
                ' <span>Copy</span>' +
              '</button>' +
            '</div>' +
            '<pre><code class="language-' + escapeHtml(item.lang || 'none') + '">' + item.code + '</code></pre>' +
          '</div>'
        );
      });

      // Automatically trigger KaTeX CDN script if mathematical equations are detected
      if (mathBlocks.length > 0 || inlineTokens.some(t => t.type === 'math')) {
        if (!katexLoaded) {
          ensureKaTeXLoaded(() => {
            renderMarkdown();
          });
        }
      }

      return {
        html: finalHtml,
        rawHtml: finalHtml,
        toc
      };
    }

    // Toggle Task checkbox directly in the editor textarea, safely ignoring code blocks
    function toggleTaskInEditor(targetTaskIndex, isChecked) {
      const text = mdInput.value;
      const lines = text.split('\n');
      let inCodeBlock = false;
      let currentTaskIdx = 0;
      let modified = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (/^\s*```/.test(line)) {
          inCodeBlock = !inCodeBlock;
          continue;
        }
        if (!inCodeBlock) {
          const m = line.match(/^(\s*[\-\*\+]\s+\[)([ xX])(\]\s+.*)$/);
          if (m) {
            if (currentTaskIdx === targetTaskIndex) {
              lines[i] = m[1] + (isChecked ? 'x' : ' ') + m[3];
              modified = true;
              break;
            }
            currentTaskIdx++;
          }
        }
      }

      if (modified) {
        const start = mdInput.selectionStart;
        const end = mdInput.selectionEnd;
        mdInput.value = lines.join('\n');
        mdInput.selectionStart = start;
        mdInput.selectionEnd = end;
        renderMarkdown();
      }
    }

    // Update Document Statistics
    function updateStats(text) {
      if (!statWords) return;
      const trimmed = (text || '').trim();
      const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
      const chars = text.length;
      const lines = text ? text.split(/\r?\n/).length : 0;
      const readMin = Math.ceil(words / 200);
      const speakMin = Math.ceil(words / 130);

      statWords.textContent = words.toLocaleString();
      statChars.textContent = chars.toLocaleString();
      statLines.textContent = lines.toLocaleString();
      statReadTime.textContent = words > 0 ? '~' + readMin + ' min' : '0 min';
      statSpeakTime.textContent = words > 0 ? '~' + speakMin + ' min' : '0 min';
    }

    // Render Table of Contents
    function renderToc(toc) {
      if (!mdTocList) return;
      if (!toc || toc.length === 0) {
        mdTocList.innerHTML = '<li style="color: var(--text-muted); font-size: 13px;">No headings detected yet. Add # or ## headings to generate an outline.</li>';
        return;
      }

      mdTocList.innerHTML = toc.map(item => (
        '<li class="md-toc-item level-' + item.level + '">' +
          '<a href="#' + item.id + '" class="md-toc-link" data-slug="' + item.id + '">' +
            item.title +
          '</a>' +
        '</li>'
      )).join('');

      // Wire smooth scroll on clicking ToC link
      mdTocList.querySelectorAll(".md-toc-link").forEach(link => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = link.getAttribute("data-slug");
          const targetEl = mdPreviewOutput.querySelector('#' + targetId);
          if (targetEl) {
            switchTab("preview");
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    }

    // Render Live Markdown and sync all views
    function renderMarkdown() {
      const raw = mdInput.value;
      updateStats(raw);

      // Autosave into localStorage
      try {
        localStorage.setItem("omnitool_md_content", raw);
      } catch (e) {}

      const parsed = parseMarkdown(raw);
      currentGeneratedHtml = parsed.html;

      mdPreviewOutput.innerHTML = parsed.html;
      if (mdRawHtmlCode) {
        mdRawHtmlCode.textContent = parsed.rawHtml;
      }
      renderToc(parsed.toc);

      // Re-bind Copy Code Block buttons
      mdPreviewOutput.querySelectorAll(".md-copy-code-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const block = btn.closest(".md-code-block");
          if (!block) return;
          const encoded = block.getAttribute("data-code") || "";
          const codeText = decodeURIComponent(encoded);
          navigator.clipboard.writeText(codeText).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
            setTimeout(() => { btn.innerHTML = originalText; }, 2000);
            appInstance.showToast("Code block copied to clipboard!", "success");
          }).catch(() => {
            appInstance.showToast("Failed to copy code", "error");
          });
        });
      });

      // Re-bind interactive task list checkboxes
      mdPreviewOutput.querySelectorAll(".task-checkbox").forEach(cb => {
        cb.addEventListener("change", () => {
          const taskIdx = parseInt(cb.getAttribute("data-task-index"), 10);
          toggleTaskInEditor(taskIdx, cb.checked);
        });
      });
    }

    // Switch between Preview, Raw HTML, and Table of Contents tabs
    function switchTab(tabKey) {
      activeTab = tabKey;
      const tabBtns = container.querySelectorAll("#md-output-tabs .md-view-tab");
      tabBtns.forEach(btn => {
        if (btn.getAttribute("data-tab") === tabKey) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });

      if (tabKey === "preview") {
        mdPreviewOutput.style.display = "block";
        mdRawHtmlOutput.style.display = "none";
        mdTocOutput.style.display = "none";
      } else if (tabKey === "raw") {
        mdPreviewOutput.style.display = "none";
        mdRawHtmlOutput.style.display = "block";
        mdTocOutput.style.display = "none";
      } else if (tabKey === "toc") {
        mdPreviewOutput.style.display = "none";
        mdRawHtmlOutput.style.display = "none";
        mdTocOutput.style.display = "block";
      }
    }

    // Attach Tab Button Listeners
    container.querySelectorAll("#md-output-tabs .md-view-tab").forEach(btn => {
      btn.addEventListener("click", () => {
        const tabKey = btn.getAttribute("data-tab");
        switchTab(tabKey);
      });
    });

    // Synchronized Dual Scrolling
    let isScrollingInput = false;
    let isScrollingOutput = false;

    mdInput?.addEventListener("scroll", () => {
      if (!syncScrollEnabled || isScrollingOutput) return;
      isScrollingInput = true;
      const maxInput = mdInput.scrollHeight - mdInput.clientHeight;
      if (maxInput > 0) {
        const ratio = mdInput.scrollTop / maxInput;
        const maxOutput = mdPreviewOutput.scrollHeight - mdPreviewOutput.clientHeight;
        mdPreviewOutput.scrollTop = ratio * maxOutput;
      }
      setTimeout(() => { isScrollingInput = false; }, 50);
    });

    mdPreviewOutput?.addEventListener("scroll", () => {
      if (!syncScrollEnabled || isScrollingInput) return;
      isScrollingOutput = true;
      const maxOutput = mdPreviewOutput.scrollHeight - mdPreviewOutput.clientHeight;
      if (maxOutput > 0) {
        const ratio = mdPreviewOutput.scrollTop / maxOutput;
        const maxInput = mdInput.scrollHeight - mdInput.clientHeight;
        mdInput.scrollTop = ratio * maxInput;
      }
      setTimeout(() => { isScrollingOutput = false; }, 50);
    });

    // Synchronized Scroll Toggle
    const toggleSyncBtn = container.querySelector("#md-toggle-sync");
    const syncLabel = container.querySelector("#md-sync-label");
    toggleSyncBtn?.addEventListener("click", () => {
      syncScrollEnabled = !syncScrollEnabled;
      if (syncScrollEnabled) {
        toggleSyncBtn.classList.add("active");
        if (syncLabel) syncLabel.textContent = "Sync: ON";
        appInstance.showToast("Synchronized scrolling enabled", "info");
      } else {
        toggleSyncBtn.classList.remove("active");
        if (syncLabel) syncLabel.textContent = "Sync: OFF";
        appInstance.showToast("Synchronized scrolling paused", "info");
      }
    });

    // Container-level Dual Scrolling Sync (When panel content exceeds viewport)
    const editorPanel = container.querySelector("#md-editor-panel");
    const previewPanel = container.querySelector("#md-preview-panel");
    let isScrollingEditorPanel = false;
    let isScrollingPreviewPanel = false;

    editorPanel?.addEventListener("scroll", () => {
      if (!syncScrollEnabled || isScrollingPreviewPanel || !previewPanel) return;
      isScrollingEditorPanel = true;
      const maxLeft = editorPanel.scrollHeight - editorPanel.clientHeight;
      if (maxLeft > 0) {
        const ratio = editorPanel.scrollTop / maxLeft;
        const maxRight = previewPanel.scrollHeight - previewPanel.clientHeight;
        previewPanel.scrollTop = ratio * maxRight;
      }
      setTimeout(() => { isScrollingEditorPanel = false; }, 50);
    });

    previewPanel?.addEventListener("scroll", () => {
      if (!syncScrollEnabled || isScrollingEditorPanel || !editorPanel) return;
      isScrollingPreviewPanel = true;
      const maxRight = previewPanel.scrollHeight - previewPanel.clientHeight;
      if (maxRight > 0) {
        const ratio = previewPanel.scrollTop / maxRight;
        const maxLeft = editorPanel.scrollHeight - editorPanel.clientHeight;
        editorPanel.scrollTop = ratio * maxLeft;
      }
      setTimeout(() => { isScrollingPreviewPanel = false; }, 50);
    });

    // Editor Text Box Height / Size Selector
    const heightSelect = container.querySelector("#md-editor-height-select");
    const applyEditorHeight = (val) => {
      if (!mdInput) return;
      if (val === "fit") {
        mdInput.style.flex = "1 1 auto";
        mdInput.style.height = "auto";
        if (mdPreviewOutput) mdPreviewOutput.style.minHeight = "280px";
        if (mdRawHtmlOutput) mdRawHtmlOutput.style.minHeight = "280px";
        if (mdTocOutput) mdTocOutput.style.minHeight = "280px";
      } else {
        const numVal = parseInt(val, 10) || 460;
        mdInput.style.flex = "0 0 auto";
        mdInput.style.height = numVal + "px";
        if (mdPreviewOutput) mdPreviewOutput.style.minHeight = numVal + "px";
        if (mdRawHtmlOutput) mdRawHtmlOutput.style.minHeight = numVal + "px";
        if (mdTocOutput) mdTocOutput.style.minHeight = numVal + "px";
      }
      try {
        localStorage.setItem("omnitool_md_height", val);
      } catch (e) {}
    };

    if (heightSelect) {
      const savedHeight = localStorage.getItem("omnitool_md_height");
      if (savedHeight) {
        heightSelect.value = savedHeight;
        applyEditorHeight(savedHeight);
      }
      heightSelect.addEventListener("change", (e) => {
        applyEditorHeight(e.target.value);
        appInstance.showToast(`Editor height set to ${e.target.options[e.target.selectedIndex].text}`, "info");
      });
    }

    // Dynamic resize observer: sync preview min-height when user drags native vertical resize handle on mdInput
    if (window.ResizeObserver && mdInput) {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const newHeight = entry.contentRect.height;
          if (newHeight > 200 && mdPreviewOutput) {
            mdPreviewOutput.style.minHeight = (newHeight + 32) + "px";
            if (mdRawHtmlOutput) mdRawHtmlOutput.style.minHeight = (newHeight + 32) + "px";
            if (mdTocOutput) mdTocOutput.style.minHeight = (newHeight + 32) + "px";
          }
        }
      });
      ro.observe(mdInput);
      this._resizeObserver = ro;
    }

    // Helper: Insert text/wrapper at cursor
    function insertMarkdownHelper(prefix, suffix = "") {
      const start = mdInput.selectionStart;
      const end = mdInput.selectionEnd;
      const text = mdInput.value;
      const selected = text.substring(start, end);
      const replacement = prefix + selected + suffix;

      mdInput.value = text.substring(0, start) + replacement + text.substring(end);
      mdInput.focus();

      mdInput.selectionStart = start + prefix.length;
      mdInput.selectionEnd = start + prefix.length + selected.length;

      renderMarkdown();
    }

    // Keyboard Shortcuts & Soft Tab Indentation
    mdInput?.addEventListener("keydown", (e) => {
      // Soft Tab: Single-cursor or multi-line block indent/unindent (2 spaces)
      if (e.key === "Tab") {
        e.preventDefault();
        const start = mdInput.selectionStart;
        const end = mdInput.selectionEnd;
        const val = mdInput.value;

        if (start === end) {
          // Single cursor position
          if (e.shiftKey) {
            if (start >= 2 && val.substring(start - 2, start) === "  ") {
              mdInput.value = val.substring(0, start - 2) + val.substring(end);
              mdInput.selectionStart = mdInput.selectionEnd = start - 2;
            } else if (start >= 1 && val.substring(start - 1, start) === " ") {
              mdInput.value = val.substring(0, start - 1) + val.substring(end);
              mdInput.selectionStart = mdInput.selectionEnd = start - 1;
            }
          } else {
            mdInput.value = val.substring(0, start) + "  " + val.substring(end);
            mdInput.selectionStart = mdInput.selectionEnd = start + 2;
          }
        } else {
          // Multi-line selection block indent / unindent
          const lineStart = val.lastIndexOf("\n", start - 1) + 1;
          const lineEndIdx = val.indexOf("\n", end);
          const lineEnd = lineEndIdx === -1 ? val.length : lineEndIdx;
          const selectedBlock = val.substring(lineStart, lineEnd);
          const blockLines = selectedBlock.split("\n");

          let modifiedLines;
          if (e.shiftKey) {
            modifiedLines = blockLines.map(line => {
              if (line.startsWith("  ")) return line.substring(2);
              if (line.startsWith(" ")) return line.substring(1);
              return line;
            });
          } else {
            modifiedLines = blockLines.map(line => "  " + line);
          }

          const newBlock = modifiedLines.join("\n");
          mdInput.value = val.substring(0, lineStart) + newBlock + val.substring(lineEnd);
          mdInput.selectionStart = lineStart;
          mdInput.selectionEnd = lineStart + newBlock.length;
        }
        renderMarkdown();
        return;
      }

      // Ctrl / Cmd shortcuts
      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (key === "b") {
          e.preventDefault();
          insertMarkdownHelper("**", "**");
        } else if (key === "i") {
          e.preventDefault();
          insertMarkdownHelper("*", "*");
        } else if (key === "k") {
          e.preventDefault();
          insertMarkdownHelper("[", "](https://)");
        } else if (key === "s") {
          e.preventDefault();
          downloadMarkdownFile();
        } else if (key === "x" && e.shiftKey) {
          e.preventDefault();
          insertMarkdownHelper("~~", "~~");
        }
      }
    });

    // Toolbar Action Listeners
    container.querySelector("#md-helper-h1")?.addEventListener("click", () => insertMarkdownHelper("# ", ""));
    container.querySelector("#md-helper-h2")?.addEventListener("click", () => insertMarkdownHelper("## ", ""));
    container.querySelector("#md-helper-h3")?.addEventListener("click", () => insertMarkdownHelper("### ", ""));
    container.querySelector("#md-helper-bold")?.addEventListener("click", () => insertMarkdownHelper("**", "**"));
    container.querySelector("#md-helper-italic")?.addEventListener("click", () => insertMarkdownHelper("*", "*"));
    container.querySelector("#md-helper-strike")?.addEventListener("click", () => insertMarkdownHelper("~~", "~~"));
    container.querySelector("#md-helper-mark")?.addEventListener("click", () => insertMarkdownHelper("==", "=="));
    container.querySelector("#md-helper-math")?.addEventListener("click", () => insertMarkdownHelper("$", "$"));
    container.querySelector("#md-helper-code")?.addEventListener("click", () => insertMarkdownHelper("`", "`"));
    container.querySelector("#md-helper-codeblock")?.addEventListener("click", () => insertMarkdownHelper("```javascript\n", "\n```"));
    container.querySelector("#md-helper-link")?.addEventListener("click", () => insertMarkdownHelper("[", "](https://)"));
    container.querySelector("#md-helper-img")?.addEventListener("click", () => insertMarkdownHelper("![Image Alt Text](", ")"));
    container.querySelector("#md-helper-quote")?.addEventListener("click", () => insertMarkdownHelper("> ", ""));
    container.querySelector("#md-helper-alert")?.addEventListener("click", () => insertMarkdownHelper("> [!NOTE]\n> "));
    container.querySelector("#md-helper-ul")?.addEventListener("click", () => insertMarkdownHelper("- ", ""));
    container.querySelector("#md-helper-ol")?.addEventListener("click", () => insertMarkdownHelper("1. ", ""));
    container.querySelector("#md-helper-task")?.addEventListener("click", () => insertMarkdownHelper("- [ ] ", ""));
    container.querySelector("#md-helper-hr")?.addEventListener("click", () => insertMarkdownHelper("\n---\n", ""));
    container.querySelector("#md-helper-table")?.addEventListener("click", () => {
      const tableTpl = "\n| Column 1 | Column 2 | Column 3 |\n| :--- | :---: | ---: |\n| Value A | Value B | Value C |\n| Value D | Value E | Value F |\n";
      insertMarkdownHelper(tableTpl, "");
    });

    // Drag and Drop File Support
    mdInput?.addEventListener("dragover", (e) => {
      e.preventDefault();
      mdInput.classList.add("drag-over");
    });

    mdInput?.addEventListener("dragleave", () => {
      mdInput.classList.remove("drag-over");
    });

    mdInput?.addEventListener("drop", (e) => {
      e.preventDefault();
      mdInput.classList.remove("drag-over");
      if (e.dataTransfer && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
          mdInput.value = evt.target.result;
          renderMarkdown();
          appInstance.showToast('Loaded ' + file.name + ' successfully!', "success");
        };
        reader.readAsText(file);
      }
    });

    // File Input Picker with clean reset to allow re-opening same file
    const fileInput = container.querySelector("#md-file-input");
    container.querySelector("#md-open-file")?.addEventListener("click", () => {
      if (fileInput) fileInput.value = "";
      fileInput?.click();
    });
    fileInput?.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          mdInput.value = evt.target.result;
          renderMarkdown();
          appInstance.showToast('Opened ' + file.name + '!', "success");
        };
        reader.readAsText(file);
      }
    });

    // Theme Switcher with localStorage persistence
    const themeSelect = container.querySelector("#md-theme-select");
    function applyTheme(val) {
      mdPreviewOutput.classList.remove("theme-github", "theme-obsidian", "theme-light");
      if (val && val !== "default") {
        mdPreviewOutput.classList.add(val);
      }
      if (themeSelect) themeSelect.value = val || "default";
      try { localStorage.setItem("omnitool_md_theme", val || "default"); } catch (e) {}
    }

    themeSelect?.addEventListener("change", () => {
      applyTheme(themeSelect.value);
    });

    // Copy Raw HTML Markup with fallback
    const copyBtn = container.querySelector("#md-copy-btn");
    copyBtn?.addEventListener("click", () => {
      const htmlToCopy = currentGeneratedHtml || "";
      if (!htmlToCopy.trim()) {
        appInstance.showToast("Nothing to copy yet.", "warning");
        return;
      }
      navigator.clipboard.writeText(htmlToCopy).then(() => {
        const originalHtml = copyBtn.innerHTML;
        copyBtn.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
        setTimeout(() => { copyBtn.innerHTML = originalHtml; }, 2000);
        appInstance.showToast("HTML source markup copied to clipboard!", "success");
      }).catch(() => {
        appInstance.showToast("Failed to copy markup to clipboard", "error");
      });
    });

    // Copy Rich Formatted Text (Paste directly into Docs / Word / Notion) with robust catch fallback
    const copyRichBtn = container.querySelector("#md-copy-rich-btn");
    copyRichBtn?.addEventListener("click", () => {
      const htmlContent = mdPreviewOutput.innerHTML;
      if (!htmlContent.trim()) {
        appInstance.showToast("No content to copy.", "warning");
        return;
      }

      const copyPlainFallback = () => {
        navigator.clipboard.writeText(htmlContent).then(() => {
          appInstance.showToast("HTML copied to clipboard!", "success");
        }).catch(() => {
          appInstance.showToast("Clipboard access denied", "error");
        });
      };

      if (navigator.clipboard && window.ClipboardItem) {
        try {
          const blobHtml = new Blob([htmlContent], { type: "text/html" });
          const blobText = new Blob([mdPreviewOutput.innerText || ""], { type: "text/plain" });
          const item = new ClipboardItem({
            "text/html": blobHtml,
            "text/plain": blobText
          });
          navigator.clipboard.write([item]).then(() => {
            const originalHtml = copyRichBtn.innerHTML;
            copyRichBtn.innerHTML = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
            setTimeout(() => { copyRichBtn.innerHTML = originalHtml; }, 2000);
            appInstance.showToast("Rich text copied! Paste directly into Google Docs or Word.", "success");
          }).catch(() => {
            copyPlainFallback();
          });
          return;
        } catch (err) {
          copyPlainFallback();
          return;
        }
      }

      copyPlainFallback();
    });

    // Document title and clean slug extractor for downloads
    function getDocumentTitleAndSlug() {
      const text = mdInput.value || "";
      const match = text.match(/^#\s+(.+)$/m);
      if (match && match[1]) {
        const cleanTitle = match[1].replace(/[*_~`#]/g, '').trim();
        const slug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return {
          title: cleanTitle,
          slug: slug || ('document_' + Date.now())
        };
      }
      return {
        title: "Markdown Document",
        slug: 'document_' + Date.now()
      };
    }

    // Download .md File with smart filename
    function downloadMarkdownFile() {
      const content = mdInput.value || "";
      const { slug } = getDocumentTitleAndSlug();
      const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = slug + '.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      appInstance.showToast('Downloaded ' + a.download, "success");
    }
    container.querySelector("#md-download-md")?.addEventListener("click", downloadMarkdownFile);

    // Download Standalone .html File with smart title & filename
    function downloadHtmlFile() {
      const htmlBody = currentGeneratedHtml || "";
      const { title, slug } = getDocumentTitleAndSlug();
      const fullDoc = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>' + escapeHtml(title) + '</title>\n' +
'  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">\n' +
'  <style>\n' +
'    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #24292f; background: #ffffff; max-width: 860px; margin: 40px auto; padding: 0 20px; }\n' +
'    h1, h2, h3, h4 { color: #0969da; margin-top: 24px; margin-bottom: 12px; }\n' +
'    h1 { border-bottom: 1px solid #d0d7de; padding-bottom: 8px; font-size: 2em; }\n' +
'    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }\n' +
'    th, td { border: 1px solid #d0d7de; padding: 8px 12px; text-align: left; }\n' +
'    th { background: #f6f8fa; font-weight: 600; }\n' +
'    tr:nth-child(even) td { background: #f6f8fa; }\n' +
'    pre { background: #f6f8fa; padding: 14px; border-radius: 6px; overflow-x: auto; }\n' +
'    code { font-family: ui-monospace, SFMono-Regular, monospace; background: #f6f8fa; padding: 2px 6px; border-radius: 4px; font-size: 13px; }\n' +
'    blockquote { border-left: 4px solid #0969da; padding-left: 14px; color: #57606a; margin: 16px 0; }\n' +
'    del { color: #57606a; }\n' +
'    mark { background: #fff8c5; padding: 2px 4px; border-radius: 3px; }\n' +
'    img { max-width: 100%; border-radius: 6px; }\n' +
'    .task-list-item { list-style: none; display: flex; align-items: center; gap: 8px; margin-left: -14px; }\n' +
'    .md-alert { border-left: 4px solid #3b82f6; padding: 12px; margin: 16px 0; background: #eff6ff; border-radius: 0 6px 6px 0; }\n' +
'    .md-math-block { margin: 16px 0; padding: 12px; background: #f6f8fa; border: 1px solid #d0d7de; border-radius: 6px; text-align: center; }\n' +
'    .md-math-inline { background: #edf2ff; padding: 1px 6px; border-radius: 4px; color: #0969da; }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
  htmlBody + '\n' +
'</body>\n' +
'</html>';

      const blob = new Blob([fullDoc], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = slug + '.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      appInstance.showToast('Downloaded ' + a.download, "success");
    }
    container.querySelector("#md-download-html")?.addEventListener("click", downloadHtmlFile);

    // Fullscreen Preview keydown listener (Esc hotkey)
    const rightPanel = container.querySelectorAll(".tool-panel")[1];
    const onKeydown = (e) => {
      if (e.key === "Escape" && rightPanel?.classList.contains("preview-fullscreen")) {
        e.preventDefault();
        const appFsBtn = rightPanel.querySelector(".preview-fullscreen-btn");
        if (appFsBtn) {
          appFsBtn.click();
        } else {
          rightPanel.classList.remove("preview-fullscreen");
        }
      }
    };
    window.addEventListener("keydown", onKeydown);
    this._onKeydown = onKeydown;

    // Intercept in-preview internal anchor clicks to smoothly scroll without altering window.location.hash
    // (which prevents SPA router collisions that kick users back to dashboard)
    mdPreviewOutput.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const targetId = href.substring(1);
        if (!targetId) return;
        try {
          const targetEl = mdPreviewOutput.querySelector("#" + CSS.escape(targetId));
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } catch (err) {}
      }
    });

    // Print / PDF
    container.querySelector("#md-print-btn")?.addEventListener("click", () => {
      window.print();
    });

    // Clear Document
    container.querySelector("#md-clear")?.addEventListener("click", () => {
      mdInput.value = "";
      renderMarkdown();
      try { localStorage.removeItem("omnitool_md_content"); } catch (e) {}
      appInstance.showToast("Editor cleared", "info");
    });

    // Rich Sample Template
    const sampleLines = [
      "# OmniTool Markdown Workspace",
      "",
      "Welcome to the **Live Markdown Previewer**! You can write, preview, and export clean documents 100% locally.",
      "",
      "> [!NOTE]",
      "> All processing and rendering happens entirely inside your browser memory. No data is sent to external servers.",
      "",
      "---",
      "",
      "## ⚡ High Performance Features",
      "",
      "| Feature | Support | Capability |",
      "| :--- | :---: | ---: |",
      "| GFM Tables | Supported | Cell alignments & auto-formatting |",
      "| Code Syntax | Supported | Code blocks with copy buttons |",
      "| GitHub Alerts | Supported | Note, Tip, Warning, Caution |",
      "| Rich Export | Supported | Paste directly into Google Docs & Word |",
      "",
      "### 📋 Interactive Release Checklist",
      "",
      "- [x] Full H1 to H6 heading hierarchy",
      "- [x] Dual-mode synchronized scrolling",
      "- [x] Soft Tab (2-space indent) support",
      "- [x] KaTeX & LaTeX mathematical equation rendering",
      "- [x] Interactive task checklists in live preview",
      "",
      "### 🧮 Mathematical Equations",
      "",
      "You can write inline math like $E = mc^2$ and block equations:",
      "",
      "$$",
      "\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}",
      "$$",
      "",
      "### 🚀 Code Sample",
      "",
      "```javascript",
      "// Client-side markdown processor",
      "function compileMarkdown(input) {",
      "  const words = input.trim().split(/\\s+/).length;",
      "  console.log('Compiling words offline...');",
      "  return true;",
      "}",
      "```",
      "",
      "Here is a [link to OmniTool Hub](https://omnitool.worldsneed.com) and an embedded badge:",
      "![Active Status](https://img.shields.io/badge/OmniTool-Active-00f2fe)",
      "",
      "> *Tip: Press **Ctrl+B** for bold, **Ctrl+I** for italic, and **Ctrl+K** for links.*"
    ];
    const sampleText = sampleLines.join("\n");

    const loadSample = () => {
      mdInput.value = sampleText;
      renderMarkdown();
    };

    container.querySelector("#md-load-sample")?.addEventListener("click", loadSample);

    // Example Tabs in Quick Guide Card
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

    container.querySelector("#md-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        mdInput.value = "| Tool | Type | Status |\n| :--- | :---: | ---: |\n| Markdown | Client | Active |\n\n> [!NOTE]\n> 100% private in browser memory.";
        renderMarkdown();
        appInstance.showToast("Loaded table & alert sample!", "info");
      } else {
        mdInput.value = "- [x] Completed task\n- [ ] Upcoming ==highlighted== item\n~~Deprecated method~~";
        renderMarkdown();
        appInstance.showToast("Loaded task checklist sample!", "info");
      }
    });

    // Real-time input listener
    mdInput?.addEventListener("input", renderMarkdown);

    // Restore saved draft or load initial sample
    try {
      const saved = localStorage.getItem("omnitool_md_content");
      if (saved && saved.trim()) {
        mdInput.value = saved;
      } else {
        mdInput.value = sampleText;
      }
    } catch (e) {
      mdInput.value = sampleText;
    }

    // Restore saved theme preference
    try {
      const savedTheme = localStorage.getItem("omnitool_md_theme");
      if (savedTheme) applyTheme(savedTheme);
    } catch (e) {}

    renderMarkdown();
  },

  cleanup() {
    if (this._onKeydown) {
      window.removeEventListener("keydown", this._onKeydown);
      this._onKeydown = null;
    }
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }
};
