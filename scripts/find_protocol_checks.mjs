import fs from 'fs';

const appJs = fs.readFileSync('app.js', 'utf8');
const lines = appJs.split('\n');
lines.forEach((l, i) => {
  if (l.includes('renderFileProtocolError')) {
    console.log(i + ': ' + l.trim());
  }
});

