import fs from 'fs';
import path from 'path';

// Full Browser Environment Mock
const mockCtx2D = {
  fillRect: () => {},
  strokeRect: () => {},
  clearRect: () => {},
  fillText: () => {},
  strokeText: () => {},
  measureText: () => ({ width: 50 }),
  getImageData: () => ({ data: new Uint8ClampedArray(100), width: 10, height: 10 }),
  putImageData: () => {},
  createImageData: () => ({ data: new Uint8ClampedArray(100) }),
  createLinearGradient: () => ({ addColorStop: () => {} }),
  createRadialGradient: () => ({ addColorStop: () => {} }),
  drawImage: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  stroke: () => {},
  fill: () => {},
  arc: () => {},
  closePath: () => {},
  save: () => {},
  restore: () => {},
  scale: () => {},
  rotate: () => {},
  translate: () => {}
};

const createMockElement = (tag = 'div') => {
  const el = {
    tagName: tag.toUpperCase(),
    innerText: '',
    innerHTML: '',
    textContent: '',
    value: '',
    dataset: {},
    checked: false,
    disabled: false,
    style: {},
    classList: {
      toggle: () => {},
      add: () => {},
      remove: () => {},
      contains: () => false
    },
    remove: () => {},
    appendChild: (c) => c,
    removeChild: (c) => c,
    setAttribute: () => {},
    getAttribute: () => '',
    addEventListener: () => {},
    removeEventListener: () => {},
    querySelector: (sel) => createMockElement(sel.startsWith('canvas') ? 'canvas' : 'div'),
    querySelectorAll: () => [createMockElement(), createMockElement()],
    getContext: (type) => (type === '2d' ? mockCtx2D : null),
    toDataURL: () => 'data:image/png;base64,mock',
    getBoundingClientRect: () => ({ width: 100, height: 100, top: 0, left: 0, bottom: 100, right: 100 }),
    focus: () => {},
    blur: () => {},
    click: () => {},
    closest: () => createMockElement()
  };
  return el;
};

globalThis.window = globalThis;
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.setInterval = () => 1;
globalThis.setTimeout = () => 1;

globalThis.Image = class {
  constructor() {
    this.onload = null;
    this.src = '';
    this.width = 100;
    this.height = 100;
  }
};

globalThis.document = {
  createElement: (tag) => createMockElement(tag),
  getElementById: (id) => createMockElement(),
  querySelector: (sel) => createMockElement(),
  querySelectorAll: () => [createMockElement(), createMockElement()],
  addEventListener: () => {},
  removeEventListener: () => {},
  body: createMockElement('body')
};

globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
};

globalThis.AudioContext = class {
  createMediaElementSource() { return { connect: () => {} }; }
  createAnalyser() { return { connect: () => {}, getByteTimeDomainData: () => {} }; }
  decodeAudioData() { return Promise.resolve({}); }
  close() {}
};

// Read all 46 tools from app.js
const appJs = fs.readFileSync('app.js', 'utf8');
const toolIds = [];
const toolRegex = /\{\s*id:\s*["']([a-z0-9-]+)["']/g;
const toolsMatch = appJs.match(/tools:\s*\[([\s\S]*?)\n\s*\],/);
let m;
while ((m = toolRegex.exec(toolsMatch[1])) !== null) {
  toolIds.push(m[1]);
}

const mockApp = {
  syncSubtab: () => {},
  registerTabSwitcher: () => {},
  activeSubtab: null,
  showToast: () => {},
  playSynthSound: () => {},
  getConfigValue: () => '',
  tools: toolIds.map(id => ({ id, name: id, desc: '' }))
};

console.log(`\nTesting init() lifecycle across all ${toolIds.length} tools:`);
let failed = 0;
let passed = 0;

for (const id of toolIds) {
  try {
    const mod = await import(`../tools/${id}.js?test=${Date.now()}`);
    const tool = mod.default;
    if (tool && typeof tool.init === 'function') {
      const container = createMockElement('div');
      await tool.init(container, mockApp);
      console.log(`  ✓ [INIT SUCCESS] tools/${id}.js`);
      passed++;
    } else {
      console.log(`  - [NO INIT] tools/${id}.js`);
      passed++;
    }
  } catch (err) {
    console.error(`  ❌ [INIT ERROR] tools/${id}.js:`, err.message);
    failed++;
  }
}

console.log(`\n=================================================================`);
console.log(`🏁 LIFECYCLE SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log(`=================================================================\n`);
process.exit(failed > 0 ? 1 : 0);
