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

  // Check syntax and structure via node --check
  try {
    const { execSync } = await import('child_process');
    execSync(`node --check "${path.join(toolsDir, file)}"`, { stdio: 'pipe' });
  } catch (err) {
    console.error(`[SYNTAX ERROR] in ${file}:`, err.message);
    issues++;
  }
}

console.log(`Audit completed. ${issues === 0 ? 'All tools clean!' : `${issues} issue(s) detected.`}`);
