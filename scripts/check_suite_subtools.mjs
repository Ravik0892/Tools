import fs from 'fs';

const appJs = fs.readFileSync('app.js', 'utf8');
const suiteMatch = appJs.match(/id:\s*['"]pdf-editor-suite['"][\s\S]*?subtools:\s*\[([\s\S]*?)\]/);
if (suiteMatch) {
  console.log('pdf-editor-suite subtools in app.js:');
  console.log(suiteMatch[1]);
} else {
  console.log('Could not match pdf-editor-suite in app.js directly, searching occurrences:');
  const lines = appJs.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('pdf-editor-suite')) {
      console.log((i+1) + ': ' + l.trim());
    }
  });
}

