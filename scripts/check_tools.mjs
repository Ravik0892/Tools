import fs from 'fs';

const appJs = fs.readFileSync('app.js', 'utf8');

// Match tools array
const matchTools = appJs.match(/tools:\s*\[([\s\S]*?)\n\s*\]\s*,/);
const toolIds = matchTools ? [...matchTools[1].matchAll(/id:\s*["']([^"']+)["']/g)].map(m => m[1]) : [];

// Match toolRedirects object
const matchRedirects = appJs.match(/toolRedirects:\s*\{([\s\S]*?)\n\s*\},/);
const redirects = {};
if (matchRedirects) {
  const lines = matchRedirects[1].split('\n');
  for (const line of lines) {
    const m = line.match(/["']([^"']+)["']\s*:\s*\{([^}]+)\}/);
    if (m) {
      redirects[m[1]] = m[2].replace(/\s+/g, ' ').trim();
    }
  }
}

console.log('--- REGISTERED TOOLS (' + toolIds.length + ') ---');
console.log(toolIds);

console.log('\n--- REDIRECT ALIASES (' + Object.keys(redirects).length + ') ---');
console.log(redirects);

// Read tools directory
const filesInTools = fs.readdirSync('tools');
console.log('\n--- FILES IN /tools/ (' + filesInTools.length + ') ---');
console.log(filesInTools);

