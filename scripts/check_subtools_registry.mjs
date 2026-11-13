import fs from 'fs';

const appJs = fs.readFileSync('app.js', 'utf8');
const lines = appJs.split('\n');

lines.forEach((l, i) => {
  if (l.includes('subtoolsRegistry') || l.includes('syncSubtab')) {
    console.log((i+1) + ': ' + l.trim());
  }
});

