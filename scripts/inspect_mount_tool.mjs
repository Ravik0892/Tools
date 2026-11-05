import fs from 'fs';

const appJs = fs.readFileSync('app.js', 'utf8');
const lines = appJs.split('\n');
lines.forEach((l, i) => {
  if (l.includes('renderUI(') || l.includes('mountTool') || l.includes('loadTool(') || l.includes('openTool(')) {
    console.log(i + ': ' + l.trim());
  }
});

