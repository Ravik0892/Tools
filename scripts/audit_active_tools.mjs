import fs from "fs";
import path from "path";

const toolsDir = path.resolve("tools");
const allFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith(".js") && f !== "utils.js");

const legacyStubs = [];
const activeModules = [];

for (const file of allFiles) {
  const content = fs.readFileSync(path.join(toolsDir, file), "utf8");
  if (content.includes("Legacy standalone module - consolidated into a unified suite")) {
    legacyStubs.push(file);
  } else {
    activeModules.push({ file, content });
  }
}

console.log(`Total files: ${allFiles.length}`);
console.log(`Legacy stubs: ${legacyStubs.length}`);
console.log(`Active tool modules: ${activeModules.length}`);

// We will inspect CSS Studio Suite in detail:
const cssStudioCode = fs.readFileSync(path.join(toolsDir, "css-studio.js"), "utf8");

// Detailed inspection of each active module
const report = [];

for (const { file, content } of activeModules) {
  const isSuiteHost = content.includes("subtools:") || content.includes("activeSubtool");
  
  // Render function
  const hasRenderUI = /renderUI\s*\(\s*\)/.test(content);
  const hasInit = /init\s*\(\s*container\s*,\s*appInstance\s*\)/.test(content) || /init\s*\(/.test(content);
  const hasCleanup = /cleanup\s*\(/.test(content);

  // Layout structure
  const hasToolContentLayout = content.includes("tool-content-layout");
  const hasSplitView = content.includes("split-view");
  
  // Panels
  const panelMatches = content.match(/class\s*=\s*["'][^"']*\btool-panel\b[^"']*["']/g) || [];
  const panelCount = panelMatches.length;

  // Header & structure
  const hasPanelHeaders = (content.match(/class\s*=\s*["'][^"']*\bpanel-header\b[^"']*["']/g) || []).length;
  
  // Preview / Visualizer Box
  const hasPreviewAreaContainer = content.includes("preview-area-container");
  const hasVisualizerOrPreview = content.includes("preview-area") || content.includes("visualizer") || content.includes("preview-screen") || content.includes("canvas") || content.includes("showcase-container");

  // Output Box / Textarea
  const hasOutputTextarea = content.includes("code-output") || content.includes("output-area") || content.includes("output-pre") || content.includes("readonly");
  const hasCopyBtn = content.includes("copy-btn") || content.includes("Copy");

  // Quick Guide Card
  const hasGuideCard = content.includes("tool-guide-card");
  const hasGuideSteps = content.includes("tool-guide-steps");

  // Fixed heights >= 350px
  const largeHeights = [];
  const heightMatches = content.matchAll(/height:\s*([0-9]+px)/g);
  for (const m of heightMatches) {
    const px = parseInt(m[1], 10);
    if (px >= 350 && !m[0].includes("max-height") && !m[0].includes("min-height")) {
      largeHeights.push(m[1]);
    }
  }

  // Sizing & Scrolling systems
  // Does it use flex or overflow that interferes?
  const hasOverflowHidden = /overflow(-[xy])?:\s*hidden/.test(content);
  const hasCustomScrollbars = content.includes("::-webkit-scrollbar");
  
  // Fullscreen support
  const hasFullscreenSupport = content.includes("fullscreen") || content.includes("preview-fullscreen");

  report.push({
    file,
    isSuiteHost,
    hasRenderUI,
    hasInit,
    hasCleanup,
    hasToolContentLayout,
    hasSplitView,
    panelCount,
    hasPanelHeaders,
    hasPreviewAreaContainer,
    hasVisualizerOrPreview,
    hasOutputTextarea,
    hasCopyBtn,
    hasGuideCard,
    hasGuideSteps,
    largeHeights,
    hasFullscreenSupport,
    hasCustomScrollbars
  });
}

fs.writeFileSync("scripts/active_tools_audit_report.json", JSON.stringify(report, null, 2));

console.log("\n--- AUDIT SUMMARY OF 68 ACTIVE MODULES ---");

const missingSplitView = report.filter(r => !r.isSuiteHost && !r.hasSplitView);
console.log(`1. Non-suite active tools missing 'split-view': ${missingSplitView.length}`);
missingSplitView.forEach(r => console.log(`   - ${r.file} (toolContentLayout: ${r.hasToolContentLayout}, panels: ${r.panelCount})`));

const wrongPanelCount = report.filter(r => !r.isSuiteHost && r.hasSplitView && r.panelCount !== 2);
console.log(`\n2. Split-view tools without exactly 2 panels: ${wrongPanelCount.length}`);
wrongPanelCount.forEach(r => console.log(`   - ${r.file} (Panels: ${r.panelCount})`));

const missingPreviewContainer = report.filter(r => !r.isSuiteHost && !r.hasPreviewAreaContainer);
console.log(`\n3. Tools missing exact 'preview-area-container' class: ${missingPreviewContainer.length}`);

const missingGuideCard = report.filter(r => !r.isSuiteHost && !r.hasGuideCard);
console.log(`\n4. Tools missing 'tool-guide-card': ${missingGuideCard.length}`);
missingGuideCard.forEach(r => console.log(`   - ${r.file}`));

const toolsWithLargeHeights = report.filter(r => r.largeHeights.length > 0);
console.log(`\n5. Tools with hardcoded inline height >= 350px: ${toolsWithLargeHeights.length}`);
toolsWithLargeHeights.forEach(r => console.log(`   - ${r.file}: [${r.largeHeights.join(", ")}]`));

const suiteHosts = report.filter(r => r.isSuiteHost);
console.log(`\n6. Suite Hosts: ${suiteHosts.length}`);
suiteHosts.forEach(r => console.log(`   - ${r.file}`));

