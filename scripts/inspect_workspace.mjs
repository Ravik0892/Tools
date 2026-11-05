import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
for (let i = 0; i < 400; i++) {
  if (lines[i].includes('class="app-') || lines[i].includes('id="workspace') || lines[i].includes('main')) {
    console.log(i + ': ' + lines[i].trim());
  }
}

