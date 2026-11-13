import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('tools').filter(f => f.endsWith('.js'));
for (const f of files) {
  const content = fs.readFileSync(path.join('tools', f), 'utf8');
  const matches = content.match(/(\/\/\s*TODO[^\n]*|\/\/\s*FIXME[^\n]*)/gi);
  if (matches) {
    console.log(`${f}:`, matches);
  }
}

