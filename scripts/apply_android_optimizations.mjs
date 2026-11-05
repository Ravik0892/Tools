import fs from 'fs';

let appJs = fs.readFileSync('app.js', 'utf8');
const isCrlf = appJs.includes('\r\n');
const nl = isCrlf ? '\r\n' : '\n';

// 1. getToolsBasePath
const old1 = 'return (window.location.protocol === "file:" || !window.location.origin) ? "./tools/" : "/tools/";';
const rep1 = [
  'if (window.location.hostname === "appassets.androidplatform.net") {',
  '      return "https://appassets.androidplatform.net/assets/web/tools/";',
  '    }',
  '    return (window.location.protocol === "file:" || !window.location.origin) ? "./tools/" : "/tools/";'
].join(nl);

if (appJs.includes(old1)) {
  appJs = appJs.replace(old1, rep1);
  console.log('Updated getToolsBasePath in app.js');
} else {
  console.log('old1 not found');
}

// 2. init()
const old2 = 'async init() {' + nl + '    // Inject keywords into tool definitions';
const rep2 = [
  'async init() {',
  '    // Check if running in Android Native App or Embedded WebView',
  '    const isEmbeddedApp = window.location.search.includes("embed=1") ||',
  '                          window.location.hash.includes("embed=1") ||',
  '                          navigator.userAgent.includes("OmniToolAndroid") ||',
  '                          window.location.hostname === "appassets.androidplatform.net" ||',
  '                          window.location.href.includes("android_asset");',
  '    if (isEmbeddedApp) {',
  '      document.body.classList.add("app-embedded");',
  '    }',
  '',
  '    // Inject keywords into tool definitions'
].join(nl);

if (appJs.includes(old2)) {
  appJs = appJs.replace(old2, rep2);
  console.log('Updated init() in app.js');
} else {
  console.log('old2 not found');
}

// 3. file protocol check
const old3 = 'if (window.location.protocol === "file:") {' + nl + '        this.renderFileProtocolError(toolId);' + nl + '        return;' + nl + '      }';
const rep3 = [
  'const isAndroidApp = window.location.href.includes("android_asset") ||',
  '                           window.location.hostname === "appassets.androidplatform.net" ||',
  '                           navigator.userAgent.includes("OmniToolAndroid") ||',
  '                           window.isAndroidApp === true;',
  '      if (window.location.protocol === "file:" && !isAndroidApp) {',
  '        this.renderFileProtocolError(toolId);',
  '        return;',
  '      }'
].join(nl);

if (appJs.includes(old3)) {
  appJs = appJs.replace(old3, rep3);
  console.log('Updated file protocol check in app.js');
} else {
  console.log('old3 not found');
}

fs.writeFileSync('app.js', appJs, 'utf8');
