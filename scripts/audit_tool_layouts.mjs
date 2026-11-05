import fs from "fs";
import path from "path";

const appJs = fs.readFileSync("app.js", "utf8");

// Extract tools array from app.js
const toolsArrayMatch = appJs.match(/tools:\s*\[([\s\S]*?)\n\s*\]/);
const activeToolIds = [];
if (toolsArrayMatch) {
  const matches = toolsArrayMatch[1].matchAll(/id:\s*["']([^"']+)["']/g);
  for (const m of matches) {
    activeToolIds.push(m[1]);
  }
}

console.log(`Found ${activeToolIds.length} active tools registered in app.js.`);

// Also extract toolRedirects
const redirectsMatch = appJs.match(/toolRedirects:\s*\{([\s\S]*?)\n\s*\}/);
const redirects = {};
if (redirectsMatch) {
  const rMatches = redirectsMatch[1].matchAll(/["']([^"']+)["']:\s*\{/g);
  for (const rm of rMatches) {
    redirects[rm[1]] = true;
  }
}
console.log(`Found ${Object.keys(redirects).length} redirects in app.js.`);

const toolsDir = path.resolve("tools");

const analysis = [];

for (const toolId of activeToolIds) {
  const filePath = path.join(toolsDir, `${toolId}.js`);
  if (!fs.existsSync(filePath)) {
    analysis.push({
      toolId,
      status: "FILE_MISSING",
      error: `File ${filePath} does not exist!`
    });
    continue;
  }

  const code = fs.readFileSync(filePath, "utf8");

  // 1. Render Function structure
  const hasRenderUI = /renderUI\s*\(/.test(code);
  const hasInit = /init\s*\(/.test(code);
  const returnsHtmlString = /return\s*`[\s\S]*?`\s*;/.test(code);

  // 2. Layout & Two-Panel structure
  const hasToolContentLayout = code.includes("tool-content-layout");
  const hasSplitView = code.includes("split-view");
  
  // Find all classes matching tool-panel
  const panelRegex = /class\s*=\s*["']([^"']*\btool-panel\b[^"']*)["']/g;
  const panels = [];
  let pMatch;
  while ((pMatch = panelRegex.exec(code)) !== null) {
    panels.push(pMatch[1]);
  }

  // Check guide card
  const hasGuideCard = code.includes("tool-guide-card");
  
  // 3. Preview Box & Output
  const hasPreviewContainer = code.includes("preview-area-container") || code.includes("visualizer") || code.includes("preview");
  const hasCodeOutput = code.includes("readonly") && (code.includes("textarea") || code.includes("output"));

  // 4. Box Sizing & Fixed Heights
  const fixedHeights = [];
  const heightMatches = code.matchAll(/height:\s*([0-9]+px)/g);
  for (const hm of heightMatches) {
    const px = parseInt(hm[1], 10);
    if (px >= 350) {
      fixedHeights.push(hm[1]);
    }
  }

  // 5. Scrolling & Overflow
  const overflowStyles = [];
  const overflowMatches = code.matchAll(/overflow(-[xy])?:\s*([a-zA-Z]+)/g);
  for (const om of overflowMatches) {
    overflowStyles.push(`${om[0]}`);
  }

  // 6. Sub-tabs / multi-tool suites
  const hasSuiteTabs = code.includes("-tabs") || code.includes("keyboard-tab") || code.includes("tab-control-panel");

  analysis.push({
    toolId,
    filePath: `tools/${toolId}.js`,
    hasRenderUI,
    hasInit,
    returnsHtmlString,
    hasToolContentLayout,
    hasSplitView,
    panelCount: panels.length,
    panels,
    hasGuideCard,
    hasPreviewContainer,
    hasCodeOutput,
    hasSuiteTabs,
    fixedHeights,
    overflowStyles
  });
}

// Detailed comparison with CSS Studio Suite
const cssStudio = analysis.find(a => a.toolId === "css-studio");
console.log("\n=== CSS Studio Suite Baseline Reference ===");
console.log(JSON.stringify(cssStudio, null, 2));

console.log("\n=== ACTIVE TOOLS DEVIATING FROM CSS STUDIO BASELINE ===");

const nonSplitActive = analysis.filter(a => !a.hasSplitView);
console.log(`\n1. Active Tools Missing 'split-view' (${nonSplitActive.length}):`);
nonSplitActive.forEach(a => console.log(`   - ${a.toolId} (Panels: ${a.panelCount}, toolContentLayout: ${a.hasToolContentLayout})`));

const panelCountMismatch = analysis.filter(a => a.hasSplitView && a.panelCount !== 2);
console.log(`\n2. Split-view Tools with Panel Count != 2 (${panelCountMismatch.length}):`);
panelCountMismatch.forEach(a => console.log(`   - ${a.toolId}: Panels found: ${a.panelCount} (${a.panels.join(", ")})`));

const missingGuide = analysis.filter(a => !a.hasGuideCard);
console.log(`\n3. Active Tools Missing 'tool-guide-card' (${missingGuide.length}):`);
missingGuide.forEach(a => console.log(`   - ${a.toolId}`));

const missingPreviewBox = analysis.filter(a => !a.hasPreviewContainer);
console.log(`\n4. Active Tools Missing Dedicated Preview Box (${missingPreviewBox.length}):`);
missingPreviewBox.forEach(a => console.log(`   - ${a.toolId}`));

const withLargeFixedHeights = analysis.filter(a => a.fixedHeights.length > 0);
console.log(`\n5. Tools with Hardcoded Large Fixed Heights (>= 350px) (${withLargeFixedHeights.length}):`);
withLargeFixedHeights.forEach(a => console.log(`   - ${a.toolId}: [${a.fixedHeights.join(", ")}]`));

fs.writeFileSync("scripts/detailed_tool_comparison.json", JSON.stringify(analysis, null, 2));
