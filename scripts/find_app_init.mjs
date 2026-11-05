import fs from 'fs';

const appJs = fs.readFileSync('app.js', 'utf8');
const lines = appJs.split('\n');
lines.forEach((l, i) => {
  if (l.trim().startsWith('init(') || l.trim().startsWith('init()')) {
    console.log(i + ': ' + l.trim());
  }
});

