import fs from 'fs';

let appJs = fs.readFileSync('app.js', 'utf8');
const isCrlf = appJs.includes('\r\n');
const nl = isCrlf ? '\r\n' : '\n';

// Regex replace for isAndroidApp
const regex1 = /const isAndroidApp = [^;]+;/;
const rep1 = [
  'const isAndroidApp = Boolean(',
  '        (typeof window !== "undefined" && window.location?.href && window.location.href.includes("android_asset")) ||',
  '        (typeof window !== "undefined" && window.location?.hostname === "appassets.androidplatform.net") ||',
  '        (typeof navigator !== "undefined" && navigator?.userAgent && navigator.userAgent.includes("OmniToolAndroid")) ||',
  '        (typeof window !== "undefined" && window.isAndroidApp === true)',
  '      );'
].join(nl);

if (regex1.test(appJs)) {
  appJs = appJs.replace(regex1, rep1);
  console.log('Successfully replaced isAndroidApp');
} else {
  console.error('regex1 did not match');
}

// Regex replace for isEmbeddedApp
const regex2 = /const isEmbeddedApp = [^;]+;/;
const rep2 = [
  'const isEmbeddedApp = Boolean(',
  '        (typeof window !== "undefined" && window.location?.search && window.location.search.includes("embed=1")) ||',
  '        (typeof window !== "undefined" && window.location?.hash && window.location.hash.includes("embed=1")) ||',
  '        (typeof navigator !== "undefined" && navigator?.userAgent && navigator.userAgent.includes("OmniToolAndroid")) ||',
  '        (typeof window !== "undefined" && window.location?.hostname === "appassets.androidplatform.net") ||',
  '        (typeof window !== "undefined" && window.location?.href && window.location.href.includes("android_asset"))',
  '      );'
].join(nl);

if (regex2.test(appJs)) {
  appJs = appJs.replace(regex2, rep2);
  console.log('Successfully replaced isEmbeddedApp');
} else {
  console.error('regex2 did not match');
}

fs.writeFileSync('app.js', appJs, 'utf8');
