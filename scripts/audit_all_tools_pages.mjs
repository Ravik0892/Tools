import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log(' COMPREHENSIVE TOOLS AUDIT: CHECKING ALL TOOL PAGES');
console.log('====================================================\n');

const appJs = fs.readFileSync('app.js', 'utf8');

// 1. Extract tools registered in app.tools
const toolsMatch = appJs.match(/tools:\s*\[([\s\S]*?)\n\s*\]/);
const activeTools = [];
if (toolsMatch) {
  const matches = toolsMatch[1].matchAll(/{\s*id:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["']/g);
  for (const m of matches) {
    activeTools.push({ id: m[1], name: m[2] });
  }
}

console.log(`Found ${activeTools.length} active primary tools registered in app.js.\n`);

// 2. Extract subtoolsRegistry
const subtoolsMatch = appJs.match(/subtoolsRegistry:\s*\{([\s\S]*?)\n\s*\},/);
const subtools = [];
if (subtoolsMatch) {
  const matches = subtoolsMatch[1].matchAll(/["']([^"']+)["']:\s*\{\s*suiteId:\s*["']([^"']+)["']/g);
  for (const m of matches) {
    subtools.push({ id: m[1], suiteId: m[2] });
  }
}
console.log(`Found ${subtools.length} subtools registered in subtoolsRegistry.\n`);

const allToolFiles = fs.readdirSync('tools').filter(f => f.endsWith('.js') && f !== 'utils.js');
console.log(`Found ${allToolFiles.length} total JavaScript files in tools/ directory.\n`);

// Forensic checks for each active tool
const audit = [];

for (const tool of activeTools) {
  const filePath = path.join('tools', `${tool.id}.js`);
  if (!fs.existsSync(filePath)) {
    audit.push({ id: tool.id, name: tool.name, missingFile: true });
    continue;
  }

  const code = fs.readFileSync(filePath, 'utf8');

  // Architecture checks
  const hasRenderUI = /renderUI\s*\(/.test(code);
  const hasInit = /init\s*\(/.test(code);
  const hasCleanup = /cleanup\s*\(/.test(code);

  // Layout checks
  const hasContentLayout = code.includes('tool-content-layout');
  const hasSplitView = code.includes('split-view');

  // Count tool-panel occurrences (excluding tool-guide-card)
  const panelMatches = [...code.matchAll(/class\s*=\s*["']([^"']*\btool-panel\b[^"']*)["']/g)]
    .map(m => m[1])
    .filter(cls => !cls.includes('tool-guide-card'));
  const panelCount = panelMatches.length;

  // Headers in panels
  const panelHeaderCount = (code.match(/class\s*=\s*["'][^"']*\bpanel-header\b[^"']*["']/g) || []).length;

  // Guide card check
  const hasGuideCard = code.includes('tool-guide-card');
  const hasGuideHeader = code.includes('tool-guide-header');
  const hasGuideSteps = code.includes('tool-guide-steps');

  // Dedicated visual preview stage
  const hasPreviewContainer = code.includes('preview-area-container') ||
    code.includes('visualizer') ||
    code.includes('canvas') ||
    code.includes('preview-stage') ||
    code.includes('preview-box') ||
    code.includes('preview-container') ||
    code.includes('player') ||
    code.includes('waveform');

  // Fullscreen preview button
  const hasFullscreenBtn = code.includes('preview-fullscreen-btn') ||
    code.includes('fullscreen-btn') ||
    code.includes('Toggle Fullscreen');

  // Output area
  const hasCodeOutput = (code.includes('textarea') && code.includes('readonly')) ||
    code.includes('output') ||
    code.includes('code-output') ||
    code.includes('copy-btn');

  // Large fixed heights (>= 350px)
  const fixedHeights = [...code.matchAll(/height:\s*([0-9]+px)/g)]
    .map(m => m[1])
    .filter(h => parseInt(h, 10) >= 350);

  // Overflow inline rules
  const hasInlineOverflow = /overflow(-[xy])?:\s*([a-zA-Z]+)/.test(code);

  // Mode tabs / subtabs
  const hasTabs = code.includes('keyboard-tab') ||
    code.includes('tab-control-panel') ||
    code.includes('-tabs') ||
    code.includes('nav-tab');

  // Ad placement
  const hasPanelAd = code.includes('tool-panel-ad') || code.includes('tool-sponsor-bar');

  audit.push({
    id: tool.id,
    name: tool.name,
    hasRenderUI,
    hasInit,
    hasCleanup,
    hasContentLayout,
    hasSplitView,
    panelCount,
    panelHeaderCount,
    hasGuideCard,
    hasGuideHeader,
    hasGuideSteps,
    hasPreviewContainer,
    hasFullscreenBtn,
    hasCodeOutput,
    fixedHeights,
    hasTabs
  });
}

// Summary Statistics
console.log('--- AUDIT CHECK SUMMARY ACROSS 48 ACTIVE TOOLS ---');
const total = audit.length;

function stat(name, count) {
  const pct = ((count / total) * 100).toFixed(1);
  const mark = count === total ? '✅ [ALL SAME]' : '⚠️ [DIVERGENCE]';
  console.log(`${mark} ${name.padEnd(32)}: ${count}/${total} (${pct}%)`);
}

stat('Export renderUI() & init()', audit.filter(a => a.hasRenderUI && a.hasInit).length);
stat('Uses .tool-content-layout', audit.filter(a => a.hasContentLayout).length);
stat('Uses .split-view', audit.filter(a => a.hasSplitView).length);
stat('Has Exactly 2 .tool-panel divs', audit.filter(a => a.panelCount === 2).length);
stat('Has .panel-header in panels', audit.filter(a => a.panelHeaderCount >= 2).length);
stat('Has .tool-guide-card', audit.filter(a => a.hasGuideCard).length);
stat('Has .tool-guide-header & steps', audit.filter(a => a.hasGuideHeader && a.hasGuideSteps).length);
stat('Has Dedicated Preview Box/Stage', audit.filter(a => a.hasPreviewContainer).length);
stat('Has Fullscreen Preview Button', audit.filter(a => a.hasFullscreenBtn).length);
stat('Has Code / Readonly Output Box', audit.filter(a => a.hasCodeOutput).length);
stat('Multi-Mode Subtabs Present', audit.filter(a => a.hasTabs).length);
stat('No Hardcoded Large Height (>=350px)', audit.filter(a => a.fixedHeights.length === 0).length);

fs.writeFileSync('scripts/tools_audit_detailed.json', JSON.stringify(audit, null, 2));
console.log('\nDetailed tools audit saved to scripts/tools_audit_detailed.json');

