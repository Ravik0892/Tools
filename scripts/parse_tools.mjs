import fs from 'fs';

const txt = fs.readFileSync('app.js', 'utf8');
const lines = txt.split('\n');
let inside = false;
const tools = [];

for (let i = 0; i < 750; i++) {
  const line = lines[i];
  if (line.includes('tools: [')) inside = true;
  if (inside && line.trim().startsWith('id:')) {
    const idMatch = line.match(/id:\s*["']([^"']+)["']/);
    if (!idMatch) continue;
    const id = idMatch[1];
    
    let name = id;
    let desc = '';
    let category = 'dev';
    let subLabel = 'Utility';
    
    for (let j = i; j < i + 10; j++) {
      if (lines[j].includes('name:')) {
        const m = lines[j].match(/name:\s*["']([^"']+)["']/);
        if (m) name = m[1];
      }
      if (lines[j].includes('desc:')) {
        const m = lines[j].match(/desc:\s*["']([^"']+)["']/);
        if (m) desc = m[1];
      }
      if (lines[j].includes('category:')) {
        const m = lines[j].match(/category:\s*["']([^"']+)["']/);
        if (m) category = m[1];
      }
      if (lines[j].includes('subLabel:')) {
        const m = lines[j].match(/subLabel:\s*["']([^"']+)["']/);
        if (m) subLabel = m[1];
      }
    }
    tools.push({ id, name, desc, category, type: subLabel });
  }
  if (inside && line.includes('categories: {')) {
    break;
  }
}

console.log('Total tools parsed from app.js:', tools.length);
fs.writeFileSync('scripts/parsed_tools.json', JSON.stringify(tools, null, 2), 'utf8');

