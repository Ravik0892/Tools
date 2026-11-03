import fs from 'fs';
import path from 'path';

function auditHtmlFile(filename) {
  if (!fs.existsSync(filename)) return;
  const html = fs.readFileSync(filename, 'utf8');
  const hrefRegex = /href=["']([^"']+)["']/g;
  const hrefs = [];
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    hrefs.push(match[1]);
  }

  console.log(`\n========================================`);
  console.log(`AUDITING ${filename} (${hrefs.length} total links)`);
  console.log(`========================================`);
  const uniqueHrefs = [...new Set(hrefs)];

  const localPaths = uniqueHrefs.filter(h => !h.startsWith('http') && !h.startsWith('#') && !h.startsWith('data:') && !h.startsWith('mailto:'));
  for (const p of localPaths) {
    const cleanPath = p.split('?')[0].split('#')[0].replace(/^\//, '');
    const exists = cleanPath === '' ? fs.existsSync('index.html') : fs.existsSync(cleanPath);
    console.log(`${exists ? '[PASS]' : '[FAIL]'} ${p} -> ${cleanPath || 'index.html'}`);
  }
}

auditHtmlFile('index.html');
auditHtmlFile('landing.html');

