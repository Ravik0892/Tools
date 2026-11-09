import fs from 'fs';
import path from 'path';

const toolFiles = fs.readdirSync('tools').filter(f => f.endsWith('.js'));
const proxies = [];
const suites = [];
const directTools = [];
const subtools = [];

for (const file of toolFiles) {
  if (file === 'utils.js') continue;
  const content = fs.readFileSync(path.join('tools', file), 'utf8');
  if (content.includes('-legacy') || content.includes('Standalone proxy') || content.includes('navigateToTool')) {
    proxies.push(file);
  } else if (content.includes('hub-subtool-host') || content.includes('subtools: [')) {
    suites.push(file);
  } else if (content.includes('tool-content-layout split-view')) {
    directTools.push(file);
  } else {
    subtools.push(file);
  }
}

console.log(`Total tool files: ${toolFiles.length}`);
console.log(`Legacy Proxies (${proxies.length}):`, proxies);
console.log(`Suites (${suites.length}):`, suites);
console.log(`Direct Split-View Tools (${directTools.length}):`, directTools);
console.log(`Other/Subtools (${subtools.length}):`, subtools);

