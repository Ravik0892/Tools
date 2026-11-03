// OmniTool Hub - Robots.txt Generator
// 100% Client-Side SEO Utility for creating standards-compliant robots.txt files

import { escapeHtml } from './utils.js';

export default {
  id: "robots-generator",
  name: "Robots.txt Generator",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration Controls (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Robots.txt Rules Builder</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Instruct search engine crawlers on which pages to index or ignore.
              </p>
            </div>
            <button class="tool-btn secondary" id="robots-reset-btn" style="font-size: 11px; padding: 4px 10px;">Reset Default</button>
          </div>

          <!-- Quick Presets -->
          <div class="form-group" style="margin-bottom: 14px;">
            <label style="font-size: 11.5px; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase;">1. Quick Presets</label>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
              <button class="tool-btn secondary robots-preset-btn" data-preset="default" style="font-size: 11px; padding: 4px 8px;">Standard Safe</button>
              <button class="tool-btn secondary robots-preset-btn" data-preset="allow-all" style="font-size: 11px; padding: 4px 8px;">Allow All</button>
              <button class="tool-btn secondary robots-preset-btn" data-preset="disallow-all" style="font-size: 11px; padding: 4px 8px;">Block All (Staging)</button>
              <button class="tool-btn secondary robots-preset-btn" data-preset="ecommerce" style="font-size: 11px; padding: 4px 8px;">E-Commerce</button>
              <button class="tool-btn secondary robots-preset-btn" data-preset="wordpress" style="font-size: 11px; padding: 4px 8px;">WordPress</button>
              <button class="tool-btn secondary robots-preset-btn" data-preset="block-ai" style="font-size: 11px; padding: 4px 8px;">Block AI Scrapers</button>
            </div>
          </div>

          <!-- User Agents & Crawl Delay -->
          <div class="form-group" style="margin-bottom: 14px;">
            <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">2. Targeted Crawler</label>
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 8px; margin-top: 4px;">
              <select id="robots-user-agent" class="form-select" style="height: 38px;">
                <option value="*" selected>All Crawlers (*)</option>
                <option value="Googlebot">Googlebot (Google Search)</option>
                <option value="Googlebot-Image">Googlebot-Image</option>
                <option value="Bingbot">Bingbot (Microsoft Bing)</option>
                <option value="Baiduspider">Baiduspider (Baidu)</option>
                <option value="YandexBot">YandexBot (Yandex)</option>
                <option value="DuckDuckBot">DuckDuckBot</option>
                <option value="Applebot">Applebot (Siri & Spotlight)</option>
                <option value="GPTBot">GPTBot (OpenAI Web Scraper)</option>
                <option value="ChatGPT-User">ChatGPT-User</option>
                <option value="ClaudeBot">ClaudeBot (Anthropic)</option>
                <option value="CCBot">Common Crawl</option>
              </select>

              <select id="robots-crawl-delay" class="form-select" style="height: 38px;">
                <option value="" selected>No Delay</option>
                <option value="1">1 sec</option>
                <option value="2">2 sec</option>
                <option value="5">5 sec</option>
                <option value="10">10 sec</option>
                <option value="30">30 sec</option>
              </select>
            </div>
          </div>

          <!-- Allow & Disallow Rules -->
          <div class="form-group" style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin: 0;">3. Directory Path Rules</label>
              <button class="tool-btn secondary" id="robots-add-rule-btn" style="font-size: 10.5px; padding: 2px 8px;">+ Add Rule</button>
            </div>
            <div id="robots-rules-container" style="display: flex; flex-direction: column; gap: 8px; max-height: 220px; overflow-y: auto; padding-right: 4px;">
              <!-- Dynamic Rules Injected Here -->
            </div>
          </div>

          <!-- Sitemaps -->
          <div class="form-group" style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <label style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin: 0;">4. XML Sitemaps</label>
              <button class="tool-btn secondary" id="robots-add-sitemap-btn" style="font-size: 10.5px; padding: 2px 8px;">+ Add Sitemap</button>
            </div>
            <div id="robots-sitemaps-container" style="display: flex; flex-direction: column; gap: 8px;">
              <!-- Dynamic Sitemaps Injected Here -->
            </div>
          </div>

          <!-- AI Scraper Protection Toggle -->
          <div class="form-group" style="background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; padding: 10px; margin-bottom: 14px;">
            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 12px; font-weight: 600; color: var(--text-main);">
              <input type="checkbox" id="robots-block-ai-checkbox" checked style="accent-color: var(--accent-cyan); width: 16px; height: 16px;">
              <span>Block Unauthorized AI Scrapers (GPTBot, CCBot, ClaudeBot)</span>
            </label>
            <p style="font-size: 11px; color: var(--text-muted); margin: 4px 0 0 24px; line-height: 1.3;">
              Appends strict disallow directives for AI scrapers training models on your content.
            </p>
          </div>
        </div>

        <!-- Output & Live Code Viewer (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">robots.txt Output</h3>
              <span id="robots-line-count-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 600;">0 lines</span>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="tool-btn secondary" id="robots-copy-btn" style="font-size: 11px; padding: 4px 10px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy</span>
              </button>
              <button class="tool-btn primary" id="robots-download-btn" style="font-size: 11px; padding: 4px 12px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Download robots.txt</span>
              </button>
            </div>
          </div>

          <!-- Code View Area -->
          <div class="form-group" style="height: calc(100% - 110px); min-height: 380px;">
            <textarea id="robots-code-output" class="input-textarea" style="width: 100%; height: 100%; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; padding: 14px; background: rgba(0,0,0,0.3); border-color: var(--border-color); color: #00f2fe; resize: none; white-space: pre;" readonly spellcheck="false" aria-label="robots.txt output"></textarea>
          </div>

          <!-- Validation Tips Card -->
          <div style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 8px; margin-top: 10px;">
            <span style="font-size: 14px;">💡</span>
            <span style="font-size: 11px; color: var(--text-muted); line-height: 1.3;">
              Place this file at the exact root of your web domain: <code>https://yourdomain.com/robots.txt</code>.
            </span>
          </div>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
    let rules = [
      { type: "Disallow", path: "/admin/" },
      { type: "Disallow", path: "/private/" },
      { type: "Disallow", path: "/api/" },
      { type: "Allow", path: "/" }
    ];

    let sitemaps = [
      "https://example.com/sitemap.xml"
    ];

    const userAgentSelect = container.querySelector("#robots-user-agent");
    const crawlDelaySelect = container.querySelector("#robots-crawl-delay");
    const blockAiCheckbox = container.querySelector("#robots-block-ai-checkbox");
    const rulesContainer = container.querySelector("#robots-rules-container");
    const sitemapsContainer = container.querySelector("#robots-sitemaps-container");
    const outputArea = container.querySelector("#robots-code-output");
    const lineCountBadge = container.querySelector("#robots-line-count-badge");
    const addRuleBtn = container.querySelector("#robots-add-rule-btn");
    const addSitemapBtn = container.querySelector("#robots-add-sitemap-btn");
    const resetBtn = container.querySelector("#robots-reset-btn");
    const copyBtn = container.querySelector("#robots-copy-btn");
    const downloadBtn = container.querySelector("#robots-download-btn");

    const renderRulesList = () => {
      rulesContainer.innerHTML = "";
      rules.forEach((rule, idx) => {
        const row = document.createElement("div");
        row.style.cssText = "display: flex; gap: 6px; align-items: center;";
        row.innerHTML = `
          <select class="form-select rule-type-select" data-index="${idx}" style="width: 100px; height: 34px; font-size: 12px; padding: 0 8px;">
            <option value="Disallow" ${rule.type === "Disallow" ? "selected" : ""}>Disallow</option>
            <option value="Allow" ${rule.type === "Allow" ? "selected" : ""}>Allow</option>
          </select>
          <input type="text" class="form-input rule-path-input" data-index="${idx}" value="${escapeHtml(rule.path)}" placeholder="/folder/" style="flex: 1; height: 34px; font-family: var(--font-mono); font-size: 12px;">
          <button type="button" class="tool-btn secondary rule-del-btn" data-index="${idx}" style="padding: 0 8px; height: 34px; color: var(--accent-rose);" title="Remove rule">✕</button>
        `;
        rulesContainer.appendChild(row);
      });

      rulesContainer.querySelectorAll(".rule-type-select").forEach(sel => {
        sel.addEventListener("change", (e) => {
          const i = parseInt(e.target.dataset.index, 10);
          rules[i].type = e.target.value;
          updateOutput();
        });
      });

      rulesContainer.querySelectorAll(".rule-path-input").forEach(inp => {
        inp.addEventListener("input", (e) => {
          const i = parseInt(e.target.dataset.index, 10);
          rules[i].path = e.target.value.trim();
          updateOutput();
        });
      });

      rulesContainer.querySelectorAll(".rule-del-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const i = parseInt(e.target.dataset.index, 10);
          rules.splice(i, 1);
          renderRulesList();
          updateOutput();
        });
      });
    };

    const renderSitemapsList = () => {
      sitemapsContainer.innerHTML = "";
      sitemaps.forEach((url, idx) => {
        const row = document.createElement("div");
        row.style.cssText = "display: flex; gap: 6px; align-items: center;";
        row.innerHTML = `
          <input type="text" class="form-input sitemap-url-input" data-index="${idx}" value="${escapeHtml(url)}" placeholder="https://yourdomain.com/sitemap.xml" style="flex: 1; height: 34px; font-family: var(--font-mono); font-size: 12px;">
          <button type="button" class="tool-btn secondary sitemap-del-btn" data-index="${idx}" style="padding: 0 8px; height: 34px; color: var(--accent-rose);" title="Remove sitemap">✕</button>
        `;
        sitemapsContainer.appendChild(row);
      });

      sitemapsContainer.querySelectorAll(".sitemap-url-input").forEach(inp => {
        inp.addEventListener("input", (e) => {
          const i = parseInt(e.target.dataset.index, 10);
          sitemaps[i] = e.target.value.trim();
          updateOutput();
        });
      });

      sitemapsContainer.querySelectorAll(".sitemap-del-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const i = parseInt(e.target.dataset.index, 10);
          sitemaps.splice(i, 1);
          renderSitemapsList();
          updateOutput();
        });
      });
    };

    const updateOutput = () => {
      const ua = userAgentSelect.value;
      const delay = crawlDelaySelect.value;
      const blockAi = blockAiCheckbox.checked;

      let code = `# ==========================================\n`;
      code += `# Robots.txt generated by OmniTool Hub\n`;
      code += `# https://omnitools-hub.vercel.app/\n`;
      code += `# Created: ${new Date().toISOString().split('T')[0]}\n`;
      code += `# ==========================================\n\n`;

      code += `User-agent: ${ua}\n`;
      if (delay) {
        code += `Crawl-delay: ${delay}\n`;
      }

      rules.forEach(r => {
        if (r.path) {
          code += `${r.type}: ${r.path}\n`;
        }
      });

      if (blockAi) {
        code += `\n# ------------------------------------------\n`;
        code += `# AI Data Scrapers Block Directives\n`;
        code += `# ------------------------------------------\n`;
        const aiBots = ["GPTBot", "ChatGPT-User", "CCBot", "ClaudeBot", "anthropic-ai", "Bytespider"];
        aiBots.forEach(bot => {
          code += `User-agent: ${bot}\nDisallow: /\n\n`;
        });
      }

      const validSitemaps = sitemaps.filter(s => s && s.trim());
      if (validSitemaps.length > 0) {
        code += `\n# Sitemaps\n`;
        validSitemaps.forEach(sm => {
          code += `Sitemap: ${sm}\n`;
        });
      }

      outputArea.value = code.trim() + "\n";
      const lineCount = outputArea.value.split("\n").length;
      lineCountBadge.innerText = `${lineCount} lines`;
    };

    // Preset handlers
    container.querySelectorAll(".robots-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const preset = btn.dataset.preset;
        if (preset === "default") {
          userAgentSelect.value = "*";
          crawlDelaySelect.value = "";
          rules = [
            { type: "Disallow", path: "/admin/" },
            { type: "Disallow", path: "/private/" },
            { type: "Disallow", path: "/api/" },
            { type: "Allow", path: "/" }
          ];
          blockAiCheckbox.checked = true;
        } else if (preset === "allow-all") {
          userAgentSelect.value = "*";
          crawlDelaySelect.value = "";
          rules = [{ type: "Disallow", path: "" }];
          blockAiCheckbox.checked = false;
        } else if (preset === "disallow-all") {
          userAgentSelect.value = "*";
          crawlDelaySelect.value = "";
          rules = [{ type: "Disallow", path: "/" }];
          blockAiCheckbox.checked = true;
        } else if (preset === "ecommerce") {
          userAgentSelect.value = "*";
          crawlDelaySelect.value = "1";
          rules = [
            { type: "Disallow", path: "/cart/" },
            { type: "Disallow", path: "/checkout/" },
            { type: "Disallow", path: "/account/" },
            { type: "Disallow", path: "/*?*sort=" },
            { type: "Disallow", path: "/*?*filter=" },
            { type: "Allow", path: "/" }
          ];
          blockAiCheckbox.checked = true;
        } else if (preset === "wordpress") {
          userAgentSelect.value = "*";
          crawlDelaySelect.value = "";
          rules = [
            { type: "Disallow", path: "/wp-admin/" },
            { type: "Allow", path: "/wp-admin/admin-ajax.php" },
            { type: "Disallow", path: "/wp-includes/" },
            { type: "Disallow", path: "/trackback/" },
            { type: "Disallow", path: "/*?replytocom=" }
          ];
          blockAiCheckbox.checked = true;
        } else if (preset === "block-ai") {
          userAgentSelect.value = "*";
          rules = [{ type: "Allow", path: "/" }];
          blockAiCheckbox.checked = true;
        }

        renderRulesList();
        updateOutput();
        appInstance.showToast(`Applied preset: ${btn.innerText}`, "info");
      });
    });

    addRuleBtn.addEventListener("click", () => {
      rules.push({ type: "Disallow", path: "" });
      renderRulesList();
      const lastInput = rulesContainer.querySelector(".rule-path-input:last-of-type");
      if (lastInput) lastInput.focus();
      updateOutput();
    });

    addSitemapBtn.addEventListener("click", () => {
      sitemaps.push("");
      renderSitemapsList();
      const lastInput = sitemapsContainer.querySelector(".sitemap-url-input:last-of-type");
      if (lastInput) lastInput.focus();
      updateOutput();
    });

    userAgentSelect.addEventListener("change", updateOutput);
    crawlDelaySelect.addEventListener("change", updateOutput);
    blockAiCheckbox.addEventListener("change", updateOutput);

    resetBtn.addEventListener("click", () => {
      userAgentSelect.value = "*";
      crawlDelaySelect.value = "";
      blockAiCheckbox.checked = true;
      rules = [
        { type: "Disallow", path: "/admin/" },
        { type: "Disallow", path: "/private/" },
        { type: "Disallow", path: "/api/" },
        { type: "Allow", path: "/" }
      ];
      sitemaps = ["https://example.com/sitemap.xml"];
      renderRulesList();
      renderSitemapsList();
      updateOutput();
      appInstance.showToast("Reset to default rules.", "info");
    });

    copyBtn.addEventListener("click", () => {
      if (!outputArea.value) return;
      navigator.clipboard.writeText(outputArea.value).then(() => {
        appInstance.showToast("robots.txt copied to clipboard!", "success");
      });
    });

    downloadBtn.addEventListener("click", () => {
      if (!outputArea.value) return;
      const blob = new Blob([outputArea.value], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "robots.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1500);
      appInstance.showToast("robots.txt downloaded successfully!", "success");
    });

    renderRulesList();
    renderSitemapsList();
    updateOutput();
  }
};
