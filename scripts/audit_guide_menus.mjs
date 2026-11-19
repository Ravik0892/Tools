import fs from 'fs';
import path from 'path';

function findCapsules(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      findCapsules(full);
    } else if (f.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const m = content.match(/<div class="lang-switch-capsule">([\s\S]*?)<\/div>/);
      if (m) {
        const langs = Array.from(m[1].matchAll(/>([A-Z]{2})<\/a>/g)).map(x => x[1]);
        const rel = path.relative('.', full).replace(/\\/g, '/');
        console.log(`${rel}: ${langs.join(', ')}`);
      }
    }
  }
}

findCapsules('guides');
