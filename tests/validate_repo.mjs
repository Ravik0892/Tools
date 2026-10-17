import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    if (file === 'node_modules' || file === '.git' || file === 'omnitool-android-app' || file === 'Not usable files') return;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      results.push(full);
    }
  });
  return results;
}

const files = walk('.');
console.log(`Checking syntax of ${files.length} JS/MJS files...`);
let errCount = 0;
for (const f of files) {
  try {
    execSync(`node --check "${f}"`, { stdio: 'pipe' });
  } catch (e) {
    console.error(`[SYNTAX ERROR] in ${f}:\n`, e.stderr?.toString() || e.message);
    errCount++;
  }
}

console.log(`Finished syntax validation. Total files: ${files.length}, Errors: ${errCount}`);
