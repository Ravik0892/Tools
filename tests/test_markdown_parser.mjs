import fs from 'fs';

const testInput = [
  '# Test Heading',
  '',
  '| H1 | H2 |',
  '| :--- | ---: |',
  '| Cell A | Cell B |',
  '',
  '> [!NOTE]',
  '> Alert text goes here',
  '',
  '- [x] Done item',
  '- [ ] Todo item',
  '',
  '~~strike~~ and ==highlight==',
  '',
  '```javascript',
  'const x = 42;',
  '```'
].join('\n');

global.window = {
  localStorage: {
    data: { 'omnitool_md_content': testInput },
    getItem(k) { return this.data[k] || null; },
    setItem(k, v) { this.data[k] = v; },
    removeItem(k) { delete this.data[k]; }
  },
  addEventListener: () => {}
};
global.localStorage = global.window.localStorage;

const mod = (await import('../tools/markdown-preview.js')).default;

console.log('Testing tool:', mod.id, mod.name);

// Test 1: renderUI returns non-empty string
const html = mod.renderUI();
if (!html || typeof html !== 'string' || html.length < 500) {
  console.error('renderUI failed');
  process.exit(1);
}
console.log('PASS: renderUI generated', html.length, 'characters of UI markup');

// Test 2: init with rich testInput markdown
let capturedHtml = '';
let capturedRaw = '';

const mockContainer = {
  querySelector(sel) {
    if (sel === '#md-input') {
      return {
        value: testInput,
        selectionStart: 0,
        selectionEnd: 0,
        addEventListener: () => {},
        scrollHeight: 200,
        clientHeight: 100
      };
    }
    if (sel === '#md-preview-output') {
      return {
        set innerHTML(val) { capturedHtml = val; },
        get innerHTML() { return capturedHtml; },
        querySelectorAll: () => [],
        classList: { add: () => {}, remove: () => {} },
        addEventListener: () => {},
        scrollHeight: 200,
        clientHeight: 100
      };
    }
    if (sel === '#md-raw-html-code') {
      return {
        set textContent(val) { capturedRaw = val; },
        get textContent() { return capturedRaw; }
      };
    }
    return {
      value: '',
      innerHTML: '',
      textContent: '',
      style: {},
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      addEventListener: () => {},
      querySelectorAll: () => []
    };
  },
  querySelectorAll() {
    return [];
  }
};

mod.init(mockContainer, { showToast: () => {} });

// Check outputs
console.log('\n--- VERIFYING PARSER OUTPUT ---');
const hasHeading = capturedHtml.includes('<h1 id="test-heading">');
const hasTable = capturedHtml.includes('<table><thead><tr><th style="text-align: left">H1</th><th style="text-align: right">H2</th></tr></thead>') &&
                 capturedHtml.includes('<tbody><tr><td style="text-align: left">Cell A</td><td style="text-align: right">Cell B</td></tr></tbody></table>');
const hasAlert = capturedHtml.includes('md-alert md-alert-note') && capturedHtml.includes('Alert text goes here');
const hasTask = capturedHtml.includes('task-checkbox') && capturedHtml.includes('<del>Done item</del>');
const hasStrike = capturedHtml.includes('<del>strike</del>');
const hasMark = capturedHtml.includes('<mark>highlight</mark>');
const hasCodeBlock = capturedHtml.includes('md-code-block') && capturedHtml.includes('JAVASCRIPT') && capturedHtml.includes('const x = 42;');

console.log('Heading anchor slug:', hasHeading ? 'PASS' : 'FAIL');
console.log('GFM Table with alignments:', hasTable ? 'PASS' : 'FAIL');
console.log('GitHub Alert Callout:', hasAlert ? 'PASS' : 'FAIL');
console.log('Task Checklist:', hasTask ? 'PASS' : 'FAIL');
console.log('Strikethrough:', hasStrike ? 'PASS' : 'FAIL');
console.log('Highlight mark:', hasMark ? 'PASS' : 'FAIL');
console.log('Code Block with header:', hasCodeBlock ? 'PASS' : 'FAIL');

if (!hasHeading || !hasTable || !hasAlert || !hasTask || !hasStrike || !hasMark || !hasCodeBlock) {
  console.error('\nVerification failed! Captured HTML:');
  console.error(capturedHtml);
  process.exit(1);
}

// Test 3: Test with default sample (localStorage empty)
let sampleCapturedHtml = '';
global.window.localStorage.data = {};
const mockContainerSample = {
  querySelector(sel) {
    if (sel === '#md-input') {
      return {
        value: '',
        selectionStart: 0,
        selectionEnd: 0,
        addEventListener: () => {},
        scrollHeight: 200,
        clientHeight: 100
      };
    }
    if (sel === '#md-preview-output') {
      return {
        set innerHTML(val) { sampleCapturedHtml = val; },
        get innerHTML() { return sampleCapturedHtml; },
        querySelectorAll: () => [],
        classList: { add: () => {}, remove: () => {} },
        addEventListener: () => {},
        scrollHeight: 200,
        clientHeight: 100
      };
    }
    return {
      value: '',
      innerHTML: '',
      textContent: '',
      style: {},
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      addEventListener: () => {},
      querySelectorAll: () => []
    };
  },
  querySelectorAll() { return []; }
};

mod.init(mockContainerSample, { showToast: () => {} });
console.log('\n--- VERIFYING DEFAULT SAMPLE RENDERING ---');
console.log('Sample H1:', sampleCapturedHtml.includes('<h1 id="omnitool-markdown-workspace">') ? 'PASS' : 'FAIL');
console.log('Sample Alert:', sampleCapturedHtml.includes('md-alert md-alert-note') ? 'PASS' : 'FAIL');
console.log('Sample Table:', sampleCapturedHtml.includes('<table><thead><tr>') ? 'PASS' : 'FAIL');
console.log('Sample Task list:', sampleCapturedHtml.includes('task-checkbox') && sampleCapturedHtml.includes('<del>Full H1 to H6 heading hierarchy</del>') ? 'PASS' : 'FAIL');
console.log('Sample Code block:', sampleCapturedHtml.includes('md-code-block') && sampleCapturedHtml.includes('JAVASCRIPT') ? 'PASS' : 'FAIL');
console.log('Sample Image:', sampleCapturedHtml.includes('<img src="https://img.shields.io/badge/OmniTool-Active-00f2fe"') ? 'PASS' : 'FAIL');

if (!sampleCapturedHtml.includes('task-checkbox') || !sampleCapturedHtml.includes('md-alert-note')) {
  console.error('Default sample rendering failed!');
  process.exit(1);
}

// Test 4: Verify All Fixed Edge Cases (URL Underscores, Inline Code, Snake_Case, Math, XSS)
console.log('\n--- VERIFYING PARSER FIXES & ENHANCEMENTS ---');
const edgeCaseInput = [
  'Inline code: `<div>` and `foo_bar_baz` and `a * b`',
  '',
  'URL test: [Documentation](https://example.com/api_v1_auth) and ![Photo](https://example.com/img_v2_small.png)',
  '',
  'Snake case: user_profile_token is intact, but _italic text_ works.',
  '',
  'XSS neutralization: [Dangerous](javascript:alert(1))',
  '',
  '| Command | Output |',
  '| :--- | ---: |',
  '| `cat file | grep text` | Match |',
  '',
  'Math display:',
  '$$',
  'E = mc^2',
  '$$',
  '',
  'Math inline: Formula $a^2 + b^2 = c^2$'
].join('\n');

let edgeCaseHtml = '';
global.window.localStorage.data = { 'omnitool_md_content': edgeCaseInput };
const mockContainerEdge = {
  querySelector(sel) {
    if (sel === '#md-input') {
      return {
        value: edgeCaseInput,
        selectionStart: 0,
        selectionEnd: 0,
        addEventListener: () => {},
        scrollHeight: 200,
        clientHeight: 100
      };
    }
    if (sel === '#md-preview-output') {
      return {
        set innerHTML(val) { edgeCaseHtml = val; },
        get innerHTML() { return edgeCaseHtml; },
        querySelectorAll: () => [],
        classList: { add: () => {}, remove: () => {} },
        addEventListener: () => {},
        scrollHeight: 200,
        clientHeight: 100
      };
    }
    return {
      value: '',
      innerHTML: '',
      textContent: '',
      style: {},
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      addEventListener: () => {},
      querySelectorAll: () => []
    };
  },
  querySelectorAll() { return []; }
};

mod.init(mockContainerEdge, { showToast: () => {} });

// Check 1: Inline code has single escape and no <em>
const codeSingleEscaped = edgeCaseHtml.includes('<code>&lt;div&gt;</code>');
const codeNoItalic = edgeCaseHtml.includes('<code>foo_bar_baz</code>');
console.log('Inline code escaped once (<div>):', codeSingleEscaped ? 'PASS' : 'FAIL');
console.log('Inline code preserves underscores (foo_bar_baz):', codeNoItalic ? 'PASS' : 'FAIL');

// Check 2: URLs with underscores preserved in href and src
const urlUnderscorePreserved = edgeCaseHtml.includes('href="https://example.com/api_v1_auth"') &&
                               edgeCaseHtml.includes('src="https://example.com/img_v2_small.png"');
console.log('URL & Image underscores preserved (no <em> in href/src):', urlUnderscorePreserved ? 'PASS' : 'FAIL');

// Check 3: Snake case preserved without italics
const snakeCasePreserved = edgeCaseHtml.includes('user_profile_token') && !edgeCaseHtml.includes('user<em>profile</em>token');
const italicWorks = edgeCaseHtml.includes('<em>italic text</em>');
console.log('Intra-word snake_case not italicized:', snakeCasePreserved ? 'PASS' : 'FAIL');
console.log('Boundary italics still works (_italic text_):', italicWorks ? 'PASS' : 'FAIL');

// Check 4: XSS link neutralized
const xssBlocked = edgeCaseHtml.includes('href="#unsafe-link-blocked"') && !edgeCaseHtml.includes('href="javascript:');
console.log('XSS link neutralized safely:', xssBlocked ? 'PASS' : 'FAIL');

// Check 5: Table with code containing pipe
const tableWithCodePipe = edgeCaseHtml.includes('<table><thead><tr><th style="text-align: left">Command</th><th style="text-align: right">Output</th></tr></thead>') &&
                          edgeCaseHtml.includes('<code>cat file | grep text</code>');
console.log('Table with pipe inside inline code:', tableWithCodePipe ? 'PASS' : 'FAIL');

// Check 6: Math block and inline math rendered
const mathBlockRendered = edgeCaseHtml.includes('md-math-block') || edgeCaseHtml.includes('md-math-display');
const mathInlineRendered = edgeCaseHtml.includes('md-math-inline');
console.log('Math block rendered:', mathBlockRendered ? 'PASS' : 'FAIL');
console.log('Math inline rendered ($...$):', mathInlineRendered ? 'PASS' : 'FAIL');

if (!codeSingleEscaped || !codeNoItalic || !urlUnderscorePreserved || !snakeCasePreserved || !italicWorks || !xssBlocked || !tableWithCodePipe || !mathBlockRendered || !mathInlineRendered) {
  console.error('\nEdge case verification failed! Captured HTML:');
  console.error(edgeCaseHtml);
  process.exit(1);
}

console.log('\nAll Markdown Previewer parser and UI tests PASSED successfully!');
