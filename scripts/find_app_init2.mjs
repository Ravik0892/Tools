import fs from 'fs';

const appJs = fs.readFileSync('app.js', 'utf8');
const lines = appJs.split('\n');
lines.forEach((l, i) => {
  if (l.includes('init:') || l.includes('init() {') || l.includes('window.addEventListener("DOMContentLoaded"')) {
    console.log(i + ': ' + l.trim());
  }
});

