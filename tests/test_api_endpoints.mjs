import fs from 'fs';
import path from 'path';

const apiDir = path.resolve('api');
const files = fs.readdirSync(apiDir).filter(f => f.endsWith('.js'));

console.log(`Checking ${files.length} API handlers...`);
let passed = 0;
let failed = 0;

for (const file of files) {
  try {
    const full = path.join(apiDir, file);
    const mod = await import(`file://${full.replace(/\\/g, '/')}`);
    if (file === '_security.js') {
      console.log(`[PASS] ${file} (security module loaded)`);
      passed++;
    } else if (typeof mod.default === 'function') {
      console.log(`[PASS] ${file} (default handler exported)`);
      passed++;
    } else {
      console.warn(`[WARN] ${file} missing default function export`);
    }
  } catch (err) {
    console.error(`[FAIL] ${file}:`, err.message);
    failed++;
  }
}

console.log(`\nAPI Test Results: ${passed} passed, ${failed} failed.`);
