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
              <div class="tool-guide-step-text"><strong>Write Markdown</strong>: Enter markdown text using hashes for headings, stars for bold/italic, or backticks for code block panels.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Review Preview</strong>: Observe live HTML rendering in the right pane as you edit inputs.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Format Support</strong>: Standard syntax like blockquotes, un-ordered list bullets, ordered step numbers, and links are fully supported.</div>
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
    container.querySelector("#md-guide-load-sample")?.addEventListener("click", () => {
      loadSample();
      appInstance.showToast("Sample markdown preview loaded!", "info");
    });

    // Load sample automatically on init
    loadSample();
  }
};
