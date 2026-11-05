import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('id="tool-') || l.includes('class="tool-view') || l.includes('id="dashboard"') || l.includes('class="dashboard')) {
    console.log(i + ': ' + l.trim());
  }
});

