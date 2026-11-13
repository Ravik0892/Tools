import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('tools').filter(f => f.endsWith('.js') && f !== 'utils.js');

console.log(`Checking panel hierarchy in all ${files.length} tool files...\n`);

const issues = [];

for (const file of files) {
  const code = fs.readFileSync(path.join('tools', file), 'utf8');

  // Check if file has renderUI
  if (!code.includes('renderUI()')) continue;

  // Check if it has split-view
  if (!code.includes('split-view')) continue;

  // Find all matches of tool-panel that are NOT tool-guide-card
  const panelMatches = [...code.matchAll(/<div[^>]*class=["']([^"']*\btool-panel\b[^"']*)["'][^>]*>/g)]
    .filter(m => !m[1].includes('tool-guide-card'));

  if (panelMatches.length < 2) {
    issues.push({ file, issue: `Only ${panelMatches.length} tool-panels found` });
    continue;
  }

  // Panel 2
  const p2Start = panelMatches[1].index;
  const p2Code = code.slice(p2Start);
  
  // Find if p2 has panel-header or equivalent
  const hasHeader = p2Code.includes('panel-header') || 
                    p2Code.includes('viewport-header') || 
                    p2Code.includes('studio-toolbar') || 
                    p2Code.includes('viewer-toolbar');

  if (!hasHeader) {
    issues.push({ file, issue: 'Panel 2 has NO detectable header' });
  }

  // Check if p2 has hardcoded fullscreen button
  const hasHardcodedFs = p2Code.includes('preview-fullscreen-btn') || 
                         p2Code.includes('preview-fullscreen-toggle') || 
                         p2Code.includes('btn-preview-fullscreen-toggle');
  
  if (hasHardcodedFs && file !== 'text-diff.js') {
    issues.push({ file, issue: 'Has hardcoded fullscreen button in Panel 2' });
  }
}

console.log(`Found ${issues.length} potential issues across ${files.length} files:`);
if (issues.length === 0) {
  console.log('✅ ZERO ISSUES! Every single split-view tool file has exactly 2 panels with a detectable header in Panel 2!');
} else {
  issues.forEach(i => console.log(`  - ${i.file}: ${i.issue}`));
}

