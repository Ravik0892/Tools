import fs from 'fs';

const js = fs.readFileSync('app.js', 'utf8');

// Find tools array
const match = js.match(/const tools = \[([\s\S]+?)\n\];/);
if (match) {
  const ids = [];
  const idRegex = /id:\s*['"]([a-zA-Z0-9_-]+)['"]/g;
  let m;
  while ((m = idRegex.exec(match[1])) !== null) {
    ids.push(m[1]);
  }
  console.log(`Registered tools count in app.js: ${ids.length}`);
  console.log('Tools:', ids);

  // Check which tool files exist
  const missingFiles = [];
  for (const id of ids) {
    if (!fs.existsSync(`tools/${id}.js`)) {
      missingFiles.push(id);
    }
  }
  console.log('Tools without tools/{id}.js:', missingFiles);
}

// Check route handling in app.js
console.log('\n--- Checking routes in app.js ---');
const routeHandlers = [];
const lines = js.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('window.location.hash') || line.includes('handleRoute') || line.includes('loadTool')) {
    if (idx < 500 || line.includes('function') || line.includes('switch') || line.includes('case')) {
      routeHandlers.push(`${idx + 1}: ${line.trim()}`);
    }
  }
});
console.log(routeHandlers.slice(0, 30).join('\n'));
