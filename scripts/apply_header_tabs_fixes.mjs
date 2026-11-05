import fs from 'fs';

const filePath = 'style.css';
let css = fs.readFileSync(filePath, 'utf8');

const isCrlf = css.includes('\r\n');
const nl = isCrlf ? '\r\n' : '\n';

// 1. Update tool-capabilities-bar
const targetCap = [
  '.tool-capabilities-bar {',
  '  display: flex;',
  '  align-items: center;',
  '  gap: 8px;',
  '  overflow-x: auto;',
  '  padding: 2px 0 14px 0;',
  '  margin-bottom: 4px;',
  '  scrollbar-width: none;',
  '  -webkit-overflow-scrolling: touch;',
  '}'
].join(nl);

const replaceCap = [
  '.crypto-header-tabs {',
  '  display: flex;',
  '  gap: 8px;',
  '  width: 100%;',
  '  max-width: 320px;',
  '  margin-left: 15px;',
  '}',
  '',
  '.tool-capabilities-bar {',
  '  display: flex;',
  '  align-items: center;',
  '  gap: 8px;',
  '  overflow-x: auto;',
  '  padding: 2px 0 14px 0;',
  '  margin-bottom: 4px;',
  '  scrollbar-width: none;',
  '  -webkit-overflow-scrolling: touch;',
  '  max-width: 100%;',
  '  min-width: 0;',
  '  box-sizing: border-box;',
  '}'
].join(nl);

if (css.includes(targetCap)) {
  css = css.replace(targetCap, replaceCap);
  console.log("Successfully updated tool-capabilities-bar and added crypto-header-tabs.");
} else {
  console.warn("Target capabilities bar not found with exact match; searching with regex...");
  css = css.replace(
    /\.tool-capabilities-bar\s*\{[^}]+\}/,
    replaceCap
  );
  console.log("Replaced capabilities bar using regex fallback.");
}

// 2. Add responsive rules to end of file
const additions = [
  '',
  '/* Responsive Panel Header & Sub-Tabs */',
  '@media (max-width: 768px) {',
  '  .panel-header {',
  '    flex-wrap: wrap !important;',
  '    gap: 10px !important;',
  '  }',
  '  .panel-header h3 {',
  '    min-width: 0 !important;',
  '  }',
  '  .crypto-header-tabs {',
  '    margin-left: 0 !important;',
  '    max-width: 100% !important;',
  '    width: 100% !important;',
  '    overflow-x: auto !important;',
  '    -webkit-overflow-scrolling: touch !important;',
  '    scrollbar-width: none !important;',
  '  }',
  '  .crypto-header-tabs::-webkit-scrollbar {',
  '    display: none !important;',
  '  }',
  '  .tool-container {',
  '    min-width: 0 !important;',
  '    max-width: 100% !important;',
  '    overflow-x: hidden !important;',
  '  }',
  '}',
  ''
].join(nl);

if (!css.includes('/* Responsive Panel Header & Sub-Tabs */')) {
  css += additions;
  console.log("Appended responsive panel header rules.");
}

fs.writeFileSync(filePath, css, 'utf8');
console.log("Saved updated style.css.");

