import fs from 'fs';

globalThis.window = globalThis;
globalThis.addEventListener = () => {};
globalThis.removeEventListener = () => {};
globalThis.document = {
  createElement: (tag) => ({
    tagName: tag.toUpperCase(),
    style: {},
    getContext: () => ({
      createLinearGradient: () => ({ addColorStop: () => {} }),
      fillRect: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({ width: 50 }),
      fillText: () => {},
      strokeRect: () => {},
      stroke: () => {},
      drawImage: () => {},
      quadraticCurveTo: () => {},
      bezierCurveTo: () => {},
      save: () => {},
      restore: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      clip: () => {},
      clearRect: () => {},
      getImageData: () => ({ data: new Uint8ClampedArray(400) }),
      putImageData: () => {}
    }),
    toDataURL: () => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  })
};
globalThis.Image = class {
  constructor() {
    setTimeout(() => { if (this.onload) this.onload(); }, 1);
  }
};
globalThis.atob = (str) => Buffer.from(str, 'base64').toString('binary');
globalThis.btoa = (str) => Buffer.from(str, 'binary').toString('base64');

const { default: tool } = await import('../tools/screenshot-capture.js');

const html = tool.renderUI();
const buttonRegex = /<button[^>]*id=['"](sc-[^'"]+)['"][^>]*>/g;
let m;
const buttons = [];
while ((m = buttonRegex.exec(html)) !== null) {
  buttons.push(m[1]);
}

console.log('Total buttons found in HTML:', buttons.length);

// Mock DOM elements that track event listeners
const attachedListeners = new Map();
const mockElements = new Map();

function getOrCreateMock(id) {
  if (mockElements.has(id)) return mockElements.get(id);
  const el = {
    id,
    listeners: {},
    style: {},
    classList: { add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false },
    setAttribute: () => {},
    getAttribute: () => null,
    appendChild: () => {},
    removeChild: () => {},
    addEventListener: (evt, fn) => {
      if (!el.listeners[evt]) el.listeners[evt] = [];
      el.listeners[evt].push(fn);
    },
    removeEventListener: () => {},
    getContext: () => ({
      clearRect: () => {},
      drawImage: () => {},
      createLinearGradient: () => ({ addColorStop: () => {} }),
      fillRect: () => {},
      strokeRect: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      closePath: () => {},
      arc: () => {},
      fill: () => {},
      measureText: () => ({ width: 50 }),
      fillText: () => {},
      strokeText: () => {},
      quadraticCurveTo: () => {},
      bezierCurveTo: () => {},
      save: () => {},
      restore: () => {},
      translate: () => {},
      scale: () => {},
      rotate: () => {},
      stroke: () => {},
      clip: () => {},
      getImageData: () => ({ data: new Uint8ClampedArray(400) }),
      putImageData: () => {}
    }),
    toDataURL: () => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    offsetWidth: 800,
    offsetHeight: 600
  };
  mockElements.set(id, el);
  return el;
}

const mockContainer = {
  querySelector: (sel) => {
    if (sel.startsWith('#')) {
      const id = sel.slice(1);
      return getOrCreateMock(id);
    }
    return getOrCreateMock('generic');
  },
  querySelectorAll: (sel) => {
    return [];
  }
};

tool.init(mockContainer, { showToast: () => {} });

console.log('\nChecking listeners on every button:');
const buttonsWithoutClickListener = [];
for (const btnId of buttons) {
  const el = mockElements.get(btnId);
  const hasClick = el && el.listeners['click'] && el.listeners['click'].length > 0;
  if (!hasClick) {
    buttonsWithoutClickListener.push(btnId);
  }
}

console.log('Buttons with click listeners:', buttons.length - buttonsWithoutClickListener.length);
console.log('Buttons WITHOUT click listeners:', buttonsWithoutClickListener);
