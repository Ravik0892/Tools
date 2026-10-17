import fs from 'fs';
import path from 'path';

const toolsDir = path.resolve('tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.js') && f !== 'utils.js');

console.log(`Auditing ${files.length} tools for potential initialization bugs...`);
let issues = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(toolsDir, file), 'utf8');

  // Check if tool has renderUI and init
  if (!content.includes('renderUI')) {
    console.warn(`[WARN] ${file}: missing renderUI`);
    issues++;
  }

  // Check for common bugs like unmatched brackets or unescaped templates
  const openBraces = (content.match(/{/g) || []).length;
  const closeBraces = (content.match(/}/g) || []).length;
  if (openBraces !== closeBraces) {
    console.error(`[BRACE MISMATCH] in ${file}: ${openBraces} '{' vs ${closeBraces} '}'`);
    issues++;
  }
}

console.log(`Audit completed. ${issues === 0 ? 'All tools clean!' : `${issues} issue(s) detected.`}`);
