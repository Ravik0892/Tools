import fs from 'fs';

const appJs = fs.readFileSync('app.js', 'utf8');

// Find tools array
const startIdx = appJs.indexOf('tools: [');
if (startIdx === -1) {
  console.error("Could not find tools: [ in app.js");
  process.exit(1);
}

// Extract objects inside tools: [ ... ]
const lines = appJs.slice(startIdx).split('\n');
const tools = [];
let currentTool = null;

for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('categories: {')) break;
  if (trimmed.startsWith('{') && !currentTool) {
    currentTool = {};
  }
  if (currentTool) {
    const idM = trimmed.match(/^id:\s*["']([^"']+)["']/);
    if (idM) currentTool.id = idM[1];

    const nameM = trimmed.match(/^name:\s*["']([^"']+)["']/);
    if (nameM) currentTool.name = nameM[1];

    const descM = trimmed.match(/^desc:\s*["']([^"']+)["']/);
    if (descM) currentTool.desc = descM[1];

    const catM = trimmed.match(/^category:\s*["']([^"']+)["']/);
    if (catM) currentTool.category = catM[1];

    const subM = trimmed.match(/^subLabel:\s*["']([^"']+)["']/);
    if (subM) currentTool.type = subM[1];

    if (trimmed.startsWith('},') || trimmed === '}') {
      if (currentTool.id && currentTool.name) {
        if (!currentTool.type) currentTool.type = "Utility";
        if (!currentTool.category) currentTool.category = "dev";
        if (!currentTool.desc) currentTool.desc = "Client-side offline utility.";
        tools.push(currentTool);
      }
      currentTool = null;
    }
  }
}

console.log(`Extracted ${tools.length} tools from app.js`);

// Build Kotlin code
const kotlinTools = tools.map(t => {
  const safeDesc = t.desc.replace(/"/g, '\\"');
  const safeName = t.name.replace(/"/g, '\\"');
  return `        Tool("${t.id}", "${safeName}", "${safeDesc}", "${t.category}", "${t.type}")`;
});

// Add native tools
kotlinTools.push(
  `        Tool("native-logcat", "Logcat Viewer", "Capture and filter live Android system logs directly on device.", "dev", "Diagnostics")`,
  `        Tool("native-device-info", "Device Diagnostics", "View live RAM stats, battery health metrics, and hardware specifications.", "dev", "Diagnostics")`
);

const ktContent = `package com.omnitool.hub.model

data class Tool(
    val id: String,
    val name: String,
    val desc: String,
    val category: String,
    val type: String
)

object ToolRepository {
    val tools = listOf(
${kotlinTools.join(',\n')}
    )
}
`;

fs.writeFileSync('omnitool-android-app/app/src/main/java/com/omnitool/hub/model/Tool.kt', ktContent, 'utf8');
console.log('Successfully generated Tool.kt with ' + (tools.length + 2) + ' tools!');

