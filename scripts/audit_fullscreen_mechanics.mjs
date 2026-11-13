import fs from 'fs';
import path from 'path';

// Let's inspect all files in tools/
const toolsDir = path.resolve('tools');
const toolFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith('.js'));

console.log(`Auditing ${toolFiles.length} files in tools/...`);

const results = [];

for (const file of toolFiles) {
  const filePath = path.join(toolsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Check hardcoded buttons
  const hasHardcodedFs = content.includes('preview-fullscreen-btn');
  const hasHardcodedReset = content.includes('reset-split-btn');

  // Check split-view layout
  const hasSplitView = content.includes('tool-content-layout') && content.includes('split-view');
  
  // Count tool-panel
  const panelMatches = content.match(/class=["'][^"']*tool-panel[^"']*["']/g) || [];
  const guideCardMatches = content.match(/class=["'][^"']*tool-guide-card[^"']*["']/g) || [];
  const nonGuidePanels = panelMatches.filter(p => !p.includes('tool-guide-card'));

  // Check panel-header
  const hasPanelHeader = content.includes('panel-header');
  const hasHeaderFallbacks = content.includes('viewport-header') || content.includes('studio-toolbar') || content.includes('viewer-toolbar');

  // Check if it's a dynamic hub/suite
  const isHub = content.includes('hub-subtool-host') || content.includes('active-hub-subtool');

  results.push({
    file,
    hasHardcodedFs,
    hasHardcodedReset,
    hasSplitView,
    nonGuidePanelsCount: nonGuidePanels.length,
    hasGuideCard: guideCardMatches.length > 0,
    hasPanelHeader,
    hasHeaderFallbacks,
    isHub
  });
}

// Print any anomalies
console.log('\n--- HARDCODED BUTTONS (RISK OF DUPLICATION) ---');
const hardcoded = results.filter(r => r.hasHardcodedFs || r.hasHardcodedReset);
if (hardcoded.length === 0) {
  console.log('None! Zero hardcoded fullscreen or reset buttons found in tools/*.js.');
} else {
  hardcoded.forEach(r => console.log(`  ${r.file}: FS=${r.hasHardcodedFs}, Reset=${r.hasHardcodedReset}`));
}

console.log('\n--- SPLIT VIEW & PANEL ANALYSIS ---');
const nonSplit = results.filter(r => !r.hasSplitView && !r.isHub);
if (nonSplit.length === 0) {
  console.log('All non-hub tools have tool-content-layout split-view!');
} else {
  nonSplit.forEach(r => console.log(`  Non-split tool: ${r.file}`));
}

console.log('\n--- PANEL HEADER ANALYSIS (Needed for Fullscreen injection) ---');
const missingHeader = results.filter(r => !r.isHub && !r.hasPanelHeader && !r.hasHeaderFallbacks);
if (missingHeader.length === 0) {
  console.log('All tools have panel-header or valid header fallbacks!');
} else {
  missingHeader.forEach(r => console.log(`  Missing panel-header: ${r.file}`));
}

console.log('\n--- HUB/SUITE TOOLS ---');
const hubs = results.filter(r => r.isHub);
hubs.forEach(r => console.log(`  Hub tool: ${r.file}`));

fs.writeFileSync('scripts/fullscreen_audit_results.json', JSON.stringify(results, null, 2));
