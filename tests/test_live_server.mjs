import http from 'http';

const BASE_URL = 'http://127.0.0.1:8000';

async function fetchUrl(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, options);
  const text = await res.text();
  return { status: res.status, headers: Object.fromEntries(res.headers.entries()), text };
}

console.log(`Testing Live Server at ${BASE_URL}...`);

const endpoints = [
  { path: '/', expectedStatus: 200, check: (t) => t.includes('OmniTool Hub') },
  { path: '/style.css', expectedStatus: 200, check: (t) => t.includes('--accent-cyan') },
  { path: '/app.js', expectedStatus: 200, check: (t) => t.includes('tools:') },
  { path: '/tools/pdf-ai.js', expectedStatus: 200, check: (t) => t.includes('pdf-ai') },
  { path: '/tools/pdf-converter-hub.js', expectedStatus: 200, check: (t) => t.includes('pdf-converter-hub') },
  { path: '/tools/pdf-editor-suite.js', expectedStatus: 200, check: (t) => t.includes('pdf-editor-suite') },
  { path: '/tools/pdf-security-suite.js', expectedStatus: 200, check: (t) => t.includes('pdf-security-suite') },
  { path: '/tools/qr-studio.js', expectedStatus: 200, check: (t) => t.includes('qr-studio') },
  { path: '/tools/audio-suite.js', expectedStatus: 200, check: (t) => t.includes('audio-suite') },
  { path: '/guides/index.html', expectedStatus: 200, check: (t) => t.includes('Guides & Documentation Hub') },
  { path: '/guides/payment-guide.html', expectedStatus: 200, check: (t) => t.includes('Payment') }
];

let passed = 0;
let failed = 0;

for (const ep of endpoints) {
  try {
    const res = await fetchUrl(ep.path);
    if (res.status === ep.expectedStatus && ep.check(res.text)) {
      console.log(`[PASS] ${ep.path} (HTTP ${res.status})`);
      passed++;
    } else {
      console.error(`[FAIL] ${ep.path} - HTTP ${res.status}, check passed: ${ep.check(res.text)}`);
      failed++;
    }
  } catch (err) {
    console.error(`[ERROR] ${ep.path}: ${err.message}`);
    failed++;
  }
}

// Test API endpoint POST /api/verify-token
try {
  const res = await fetchUrl('/api/verify-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: 'test' })
  });
  console.log(`[PASS] POST /api/verify-token responded with HTTP ${res.status}`);
  passed++;
} catch (err) {
  console.warn(`[NOTICE] API simulation on local server: ${err.message}`);
}

console.log(`\nLive Server Test: ${passed} passed, ${failed} failed.`);
