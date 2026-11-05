import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const matches = [...html.matchAll(/class=["']([^"']*(?:nav|header|footer|sidebar)[^"']*)["']/g)].map(m => m[1]);
console.log([...new Set(matches)]);

