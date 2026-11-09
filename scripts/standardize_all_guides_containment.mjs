import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const guidesDir = path.join(projectRoot, 'guides');
const androidGuidesDir = path.join(projectRoot, 'omnitool-android-app', 'app', 'src', 'main', 'assets', 'web', 'guides');

console.log('====================================================');
console.log(' STANDARDIZING ALL GUIDES CONTAINMENT & JUMP CONTROLS');
console.log('====================================================\n');

const standardCssBlock = `    .live-guide-tool-viewport {
      padding: 20px;
      position: relative;
      max-height: 580px;
      overflow: hidden;
      background: rgba(8, 12, 20, 0.4);
      transition: all 0.25s ease;
    }

    .live-guide-tool-viewport .tool-guide-card,
    .live-guide-tool-viewport .split-view-resizer,
    .live-guide-tool-viewport .guide-scroll-arrow,
    .live-guide-tool-viewport .tool-panel-ad,
    .live-guide-tool-viewport .adjust-settings-fab,
    .live-guide-tool-viewport .split-view-backdrop,
    .live-guide-tool-viewport .drawer-close-btn,
    .live-guide-tool-viewport .tool-panel:first-of-type::after {
      display: none !important;
    }

    /* Embedded Live Playground Contained Viewport Standard with Internal Panel Scrolling */
    .live-guide-tool-viewport .tool-content-layout.split-view {
      display: grid !important;
      grid-template-columns: 1fr 1.08fr !important;
      gap: 20px !important;
      position: static !important;
      width: 100% !important;
      height: 520px !important;
      max-height: 520px !important;
      overflow: hidden !important;
      align-items: stretch !important;
      box-sizing: border-box !important;
    }

    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel,
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:first-of-type,
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:nth-of-type(2) {
      position: static !important;
      transform: none !important;
      width: 100% !important;
      max-width: 100% !important;
      height: 100% !important;
      max-height: 520px !important;
      min-height: 0 !important;
      box-shadow: none !important;
      border-radius: 12px !important;
      overflow-y: auto !important;
      overflow-x: hidden !important;
      scrollbar-width: thin;
      padding: 18px !important;
      background: rgba(13, 17, 27, 0.75) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      box-sizing: border-box !important;
    }

    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel::-webkit-scrollbar-track {
      background: transparent;
    }
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 3px;
    }
    .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 242, 254, 0.4);
    }

    @media (max-width: 960px) {
      .live-guide-tool-viewport {
        max-height: 820px;
        overflow-y: auto;
      }
      .live-guide-tool-viewport .tool-content-layout.split-view {
        display: flex !important;
        flex-direction: column !important;
        height: auto !important;
        max-height: none !important;
        gap: 16px !important;
      }

      .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel,
      .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:first-of-type,
      .live-guide-tool-viewport .tool-content-layout.split-view > .tool-panel:nth-of-type(2) {
        height: auto !important;
        max-height: 380px !important;
        overflow-y: auto !important;
      }
    }

    .skip-to-guide-link {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      padding: 5px 12px;
      border-radius: 6px;
      border: 1px solid var(--border-color);
      background: rgba(255, 255, 255, 0.04);
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    .skip-to-guide-link:hover {
      color: var(--accent-cyan);
      border-color: rgba(0, 242, 254, 0.35);
      background: rgba(0, 242, 254, 0.08);
      transform: translateY(-1px);
    }

    .toggle-tool-collapse-btn {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-color);
      padding: 5px 12px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .toggle-tool-collapse-btn:hover {
      color: var(--text-main);
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
    }

    .toggle-tool-collapse-btn .toggle-icon {
      display: inline-block;
      transition: transform 0.2s ease;
    }

    .toggle-tool-collapse-btn.is-collapsed .toggle-icon {
      transform: rotate(-90deg);
    }

    #guide-article {
      scroll-margin-top: 85px;
    }`;

const collapseScript = `
  <!-- Live Tool Viewport Collapse / Expand Handler -->
  <script>
    (function initLiveToolCollapse() {
      const toggleBtn = document.getElementById('toggle-tool-collapse-btn');
      const viewport = document.getElementById('live-guide-tool-viewport');
      if (!toggleBtn || !viewport) return;
      toggleBtn.addEventListener('click', () => {
        const isCollapsed = viewport.style.display === 'none';
        viewport.style.display = isCollapsed ? 'block' : 'none';
        toggleBtn.classList.toggle('is-collapsed', !isCollapsed);
        toggleBtn.setAttribute('aria-expanded', isCollapsed ? 'true' : 'false');
        const label = toggleBtn.querySelector('.toggle-text');
        if (label) label.textContent = isCollapsed ? 'Collapse Tool' : 'Expand Tool';
      });
    })();
  </script>`;

const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.html') && f !== 'index.html');
let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(guidesDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Only operate on guides that have the embedded tool viewport
  if (!html.includes('live-guide-tool-viewport')) {
    continue;
  }

  let modified = false;

  // 1. Ensure CSS has standard contained styles
  // Check if unconstrained overflow: visible !important exists in .live-guide-tool-viewport
  if (html.includes('overflow: visible !important;') || !html.includes('max-height: 580px')) {
    const patternA = /\.live-guide-tool-viewport\s*\{[\s\S]*?@media\s*\(min-width:\s*960px\)\s*\{[\s\S]*?\}\s*\}/;
    const patternB = /\.live-guide-tool-viewport\s*\{\s*min-height:\s*480px;\s*background:\s*#0b0f19;\s*display:\s*flex;\s*flex-direction:\s*column;\s*\}/;

    if (patternA.test(html)) {
      html = html.replace(patternA, standardCssBlock);
      modified = true;
    } else if (patternB.test(html)) {
      html = html.replace(patternB, standardCssBlock);
      modified = true;
    } else {
      const fallbackPattern = /\.live-guide-tool-viewport\s*\{[\s\S]*?\}/;
      if (fallbackPattern.test(html)) {
        html = html.replace(fallbackPattern, standardCssBlock);
        modified = true;
      }
    }
  }

  // Ensure .skip-to-guide-link CSS exists
  if (!html.includes('.skip-to-guide-link {')) {
    html = html.replace('</style>', `\n${standardCssBlock}\n  </style>`);
    modified = true;
  }

  // 2. Add Skip and Collapse buttons to .live-tool-quick-links
  if (!html.includes('class="skip-to-guide-link"')) {
    const quickLinksRegex = /(<div class="live-tool-quick-links">\s*)(<a [^>]*class="[^"]*live-fullscreen-link[^"]*"[^>]*>)/;
    if (quickLinksRegex.test(html)) {
      html = html.replace(
        quickLinksRegex,
        `$1<a href="#guide-article" class="skip-to-guide-link" title="Jump straight to comprehensive written guide">📖 Skip to Guide &darr;</a>\n            <button type="button" class="toggle-tool-collapse-btn" id="toggle-tool-collapse-btn" title="Toggle Live Tool Viewport" aria-expanded="true">\n              <span class="toggle-icon">▾</span> <span class="toggle-text">Collapse Tool</span>\n            </button>\n            $2`
      );
      modified = true;
    }
  }

  // 3. Update <article> to <article id="guide-article">
  if (html.includes('<article>') && !html.includes('<article id="guide-article">')) {
    html = html.replace('<article>', '<article id="guide-article">');
    modified = true;
  }

  // 4. Add collapse toggle handler script before </body>
  if (!html.includes('initLiveToolCollapse')) {
    html = html.replace('</body>', `${collapseScript}\n</body>`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    
    // Also write to Android assets mirror
    const androidPath = path.join(androidGuidesDir, file);
    if (fs.existsSync(androidGuidesDir)) {
      fs.writeFileSync(androidPath, html, 'utf8');
    }
    
    updatedCount++;
    console.log(`[UPDATED] ${file}`);
  }
}

console.log(`\nSuccessfully standardized ${updatedCount} guide files with contained viewports, skip-links, and collapse toggles.`);
