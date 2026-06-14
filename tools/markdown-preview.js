export default {
  id: "markdown-preview",
  name: "Live Markdown Previewer",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Markdown Input</h3>
            <div class="panel-actions">
              <button class="tool-btn" id="md-load-sample">Sample</button>
              <button class="tool-btn" id="md-clear">Clear</button>
            </div>
          </div>
          <textarea class="input-textarea" id="md-input" placeholder="Type Markdown here (e.g. # Title, **bold**, *italic*...)" aria-label="Markdown Input"></textarea>
        </div>
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Live Visual Preview</h3>
          </div>
          <div class="markdown-preview" id="md-preview-output"></div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="md-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Write Markdown</strong>: Enter markdown using <code>#</code> for headings, <code>**bold**</code>, <code>*italic*</code>, or <code>&#96;code&#96;</code> blocks.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Live Preview</strong>: The right panel renders your HTML preview instantly as you type — no button click needed.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Supported Syntax</strong>: Headings, lists, blockquotes, links, inline code, bold/italic, and code fences are all supported.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Heading &amp; Bold</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Bullets &amp; Code</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Markdown Input</span>
                <div class="tool-guide-io-value"># Hello
**Bold text** and *italic*</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Rendered Preview</span>
                <div class="tool-guide-io-value"><h1>Hello</h1>
<p><strong>Bold text</strong> and <em>italic</em></p></div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Markdown Input</span>
                <div class="tool-guide-io-value">- Item One
- Item Two with &#96;code&#96;</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Rendered Preview</span>
                <div class="tool-guide-io-value"><ul><li>Item One</li>
<li>Item Two with <code>code</code></li></ul></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  init(container, appInstance) {
    const mdInput = container.querySelector("#md-input");
    const mdOutput = container.querySelector("#md-preview-output");

    const renderMarkdown = () => {
      const raw = mdInput.value;
      if (!raw.trim()) {
        mdOutput.innerHTML = `<span style="color: var(--text-muted);">Markdown preview will render here...</span>`;
        return;
      }

      let html = raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
      html = html.replace(/^## (.*$)/gim, '##$1'); // Temporary match bypass
      html = html.replace(/^##(.*$)/gim, '<h2>$1</h2>');
      html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
      html = html.replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>');
      html = html.replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>');
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
      html = html.replace(/^\s*\-\s+(.*$)/gim, '<ul><li>$1</li></ul>').replace(/<\/ul>\s*<ul>/g, '');
      html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<ol><li>$1</li></ol>').replace(/<\/ol>\s*<ol>/g, '');
      html = html.split(/\n{2,}/).map(p => {
        if (p.trim().startsWith('<h') || p.trim().startsWith('<blockquote') || p.trim().startsWith('<pre') || p.trim().startsWith('<ul') || p.trim().startsWith('<ol')) {
          return p;
        }
        return `<p>${p.replace(/\n/g, "<br>")}</p>`;
      }).join("");

      mdOutput.innerHTML = html;
    };

    mdInput?.addEventListener("input", renderMarkdown);
    container.querySelector("#md-clear")?.addEventListener("click", () => {
      mdInput.value = "";
      renderMarkdown();
    });
    
    const loadSample = () => {
      mdInput.value = `# Masterpiece OmniTool v2\n\n- Smart **PWA Caching** for fully offline usage\n- Real-time **Smart Chain** transformations\n- Unified **Ctrl + K** command palette search!`;
      renderMarkdown();
    };

    container.querySelector("#md-load-sample")?.addEventListener("click", loadSample);
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
        mdInput.value = "# Hello\n\n**Bold text** and *italic*";
        renderMarkdown();
        appInstance.showToast("Loaded heading and bold text sample!", "info");
      } else {
        mdInput.value = "- Item One\n- Item Two with \x60code\x60";
        renderMarkdown();
        appInstance.showToast("Loaded bullet points and code sample!", "info");
      }
    });

    // Load sample automatically on init
    loadSample();
  }
};
