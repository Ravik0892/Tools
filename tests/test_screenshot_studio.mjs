globalThis.window = globalThis;
globalThis.atob = (str) => Buffer.from(str, 'base64').toString('binary');

const { default: tool } = await import('../tools/screenshot-capture.js');

console.log('Tool ID:', tool.id);
console.log('Tool Name:', tool.name);
const html = tool.renderUI();

const checks = [
  'data-tool="text"',
  'data-tool="pen"',
  'data-tool="blackout"',
  'data-tool="spotlight"',
  'data-type="frosted"',
  'id="sc-quick-ocr-btn"',
  'id="sc-quick-rotate-btn"',
  'id="sc-quick-flip-btn"',
  'id="sc-quick-watermark-btn"',
  'id="sc-text-overlay"',
  'id="sc-ocr-overlay"'
];

for (const c of checks) {
  if (!html.includes(c)) throw new Error('Missing UI element: ' + c);
}
console.log('All UI elements verified successfully!');

// Test native PDF generation
const dummyCanvas = {
  width: 1200,
  height: 675,
  toDataURL: (type) => 'data:image/jpeg;base64,' + Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x60, 0x00, 0x60, 0x00, 0x00, 0xFF, 0xD9]).toString('base64')
};

const pdfBytes = tool.generateNativePdfBytes(dummyCanvas);
if (!pdfBytes || pdfBytes.length === 0) throw new Error('Failed to generate PDF bytes');
const pdfHeader = Buffer.from(pdfBytes.slice(0, 8)).toString('utf8');
if (!pdfHeader.startsWith('%PDF-1.4')) throw new Error('Invalid PDF header: ' + pdfHeader);
console.log('Native PDF generator passed! Bytes length:', pdfBytes.length);

// Verify exact PDF XREF byte offsets
const pdfStr = Buffer.from(pdfBytes).toString('latin1');
const startXrefMatch = pdfStr.match(/startxref\r?\n(\d+)/);
if (!startXrefMatch) throw new Error('Missing startxref in PDF');
const xrefOffset = parseInt(startXrefMatch[1], 10);
const xrefSlice = pdfStr.slice(xrefOffset);
if (!xrefSlice.startsWith('xref')) throw new Error('Invalid startxref pointer: ' + xrefOffset);

// Verify object offsets
const xrefLines = xrefSlice.split(/\r?\n/).slice(3, 8);
xrefLines.forEach((line, i) => {
  const objNum = i + 1;
  const off = parseInt(line.split(' ')[0], 10);
  const targetHeader = Buffer.from(pdfBytes.slice(off, off + 10)).toString('utf8');
  if (!targetHeader.startsWith(objNum + ' 0 obj')) {
    throw new Error('PDF XREF byte offset mismatch for obj ' + objNum + ' at ' + off + ': ' + targetHeader);
  }
});
console.log('Native PDF generator passed! All 5 object byte offsets point strictly to obj headers!');

// Test Crop Undo logic
tool.sourceImage = { naturalWidth: 1000, naturalHeight: 500 };
tool.annotations = [{ type: 'rect', x: 10, y: 10, w: 50, h: 50 }];
tool.nextStepNum = 4;
tool.undoStack = [];
tool.redoStack = [];

tool.pushUndoState({
  isCropAction: true,
  previousImage: tool.sourceImage,
  previousAnnotations: JSON.parse(JSON.stringify(tool.annotations)),
  nextStepNum: 4
});

const newImg = { naturalWidth: 400, naturalHeight: 300 };
tool.sourceImage = newImg;
tool.annotations = [];
tool.nextStepNum = 5;

// Call undo
tool.renderMaster = () => {};
tool.app = { showToast: () => {} };
tool.undo();

if (tool.sourceImage.naturalWidth !== 1000) {
  throw new Error('Undo crop failed to restore original image');
}
if (tool.annotations.length !== 1) {
  throw new Error('Undo crop failed to restore annotations');
}
if (tool.nextStepNum !== 4) {
  throw new Error('Undo failed to restore step counter');
}
console.log('Crop Undo/Redo & Step Counter logic verified!');
console.log('ALL TESTS PASSED!');
