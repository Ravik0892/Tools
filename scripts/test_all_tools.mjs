import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const toolsDir = path.join(projectRoot, 'tools');

// Mock browser globals for node testing
global.window = global;
global.document = {
  createElement: () => ({ setAttribute: () => {}, appendChild: () => {} }),
  head: { appendChild: () => {} },
  body: { appendChild: () => {} }
};
global.localStorage = { getItem: () => null, setItem: () => {} };
global.sessionStorage = { getItem: () => null, setItem: () => {} };

const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.js'));
console.log(`Testing ${files.length} tool files...`);

let passed = 0;
let failed = 0;

for (const file of files) {
  try {
    const modulePath = path.join(toolsDir, file);
    // Dynamic import to test ESM parsing
    const mod = await import('file://' + modulePath.replace(/\\/g, '/'));
    if (mod.default && typeof mod.default.renderUI === 'function') {
      passed++;
    } else if (file === 'utils.js') {
      passed++;
    } else {
      console.warn(`[WARN] ${file} imported but missing default.renderUI`);
      passed++;
    }
  } catch (err) {
    console.error(`[FAIL] ${file}: ${err.message}`);
    failed++;
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed out of ${files.length} files.`);
