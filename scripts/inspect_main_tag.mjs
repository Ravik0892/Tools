import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<main') || l.includes('id="app"') || l.includes('class="layout') || l.includes('id="tool-container"')) {
    console.log(i + ': ' + l.trim());
  }
});

