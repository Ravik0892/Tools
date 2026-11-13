import fs from 'fs';
import path from 'path';

const guideCardData = {
  'crop-pdf.js': {
    title: 'QUICK GUIDE: CROP & TRIM PDF MARGINS',
    steps: [
      { num: '1', title: 'Upload PDF Document', text: 'Select or drag-and-drop any standard PDF document to inspect page dimensions and visual boundary boxes.' },
      { num: '2', title: 'Adjust Crop Boundaries', text: 'Drag visual boundary handles or type exact margin offsets (top, right, bottom, left) in points or millimeters.' },
      { num: '3', title: 'Export Trimmed PDF', text: 'Preview the cropped layout in real-time and download your neatly trimmed document with zero server upload.' }
    ]
  },
  'images-to-pdf.js': {
    title: 'QUICK GUIDE: IMAGES TO PDF CONVERTER',
    steps: [
      { num: '1', title: 'Upload Image Files', text: 'Drag and drop PNG, JPG, WebP, or SVG graphics into the upload dropzone to prepare individual pages.' },
      { num: '2', title: 'Reorder & Configure Page Layout', text: 'Drag images to rearrange sequence, select portrait or landscape orientation, and customize margin spacing.' },
      { num: '3', title: 'Generate & Save PDF', text: 'Click Compile PDF to combine all images into a single polished document and download instantly.' }
    ]
  },
  'mp4-to-mp3.js': {
    title: 'QUICK GUIDE: VIDEO TO AUDIO EXTRACTOR (MP4 TO MP3)',
    steps: [
      { num: '1', title: 'Select Video File', text: 'Upload any MP4, WebM, MKV, or MOV video file directly in the browser via HTML5 File API.' },
      { num: '2', title: 'Choose Audio Format & Bitrate', text: 'Select output format (MP3, WAV, AAC) and audio fidelity (128 kbps, 192 kbps, 320 kbps high-definition).' },
      { num: '3', title: 'Extract & Download Audio', text: 'Click Extract Audio to decode the soundtrack locally with WebAudio/FFmpeg and save your audio file.' }
    ]
  },
  'pdf-forms.js': {
    title: 'QUICK GUIDE: INTERACTIVE PDF FORM FILLER',
    steps: [
      { num: '1', title: 'Open Fillable PDF', text: 'Upload any PDF containing interactive AcroForm or XFA fields into the client-side document viewer.' },
      { num: '2', title: 'Fill Text & Toggle Fields', text: 'Enter text, check boxes, select radio buttons, and populate dropdown menus with instant visual feedback.' },
      { num: '3', title: 'Save Flattened Document', text: 'Download the completed form with flattened fields or export raw form values in JSON/FDF format.' }
    ]
  },
  'pdf-watermark.js': {
    title: 'QUICK GUIDE: PDF WATERMARK APPLIER',
    steps: [
      { num: '1', title: 'Load Target Document', text: 'Select or drag your PDF into the editor to inspect page layouts and current stamps.' },
      { num: '2', title: 'Customize Stamp Settings', text: 'Type custom watermark text or choose an image, adjust opacity, rotation angle, font size, and color.' },
      { num: '3', title: 'Apply & Export PDF', text: 'Click Apply Watermark to stamp all or selected pages and download your branded document securely.' }
    ]
  },
  'qr-scanner.js': {
    title: 'QUICK GUIDE: QR CODE & BARCODE SCANNER',
    steps: [
      { num: '1', title: 'Choose Input Source', text: 'Enable live camera stream for instant point-and-scan detection or upload any QR code image file.' },
      { num: '2', title: 'Auto-Detect & Decode', text: 'Hardware-accelerated BarcodeDetector and jsQR parse 1D/2D symbologies with millisecond latency.' },
      { num: '3', title: 'Copy or Open Decoded Content', text: 'View raw string payloads, formatted URLs, Wi-Fi keys, or vCards, and copy output with one click.' }
    ]
  },
  'redact-pdf.js': {
    title: 'QUICK GUIDE: PERMANENT PDF SANITIZATION & REDACTION',
    steps: [
      { num: '1', title: 'Load Confidential Document', text: 'Upload your PDF to review pages within the sandboxed client-side redaction canvas.' },
      { num: '2', title: 'Draw Blackout Areas & Mask PII', text: 'Select rectangular regions to redact or search keywords (names, SSNs, credit cards) for bulk blackouts.' },
      { num: '3', title: 'Burn & Export Sanitized PDF', text: 'Click Apply Redactions to physically erase text streams and rasterize masked pixels permanently.' }
    ]
  },
  'sign-pdf.js': {
    title: 'QUICK GUIDE: DIGITAL PDF SIGNATURES',
    steps: [
      { num: '1', title: 'Upload Agreement or Contract', text: 'Drop your PDF into the secure signature studio with full zero-knowledge local execution.' },
      { num: '2', title: 'Draw, Type, or Upload Signature', text: 'Create your signature using smooth canvas ink, custom calligraphic fonts, or pre-saved signature PNG.' },
      { num: '3', title: 'Place & Finalize Document', text: 'Position and resize your signature stamp on any page, then click Sign & Download to export.' }
    ]
  }
};

function generateGuideCardHtml(data) {
  const stepsHtml = data.steps.map(s => `
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">${s.num}</div>
              <div class="tool-guide-step-text"><strong>${s.title}</strong>: ${s.text}</div>
            </div>`).join('');

  return `
        <!-- Dynamic Guide Card (Unified standard footer guide) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>${data.title}</span>
            </div>
          </div>
          <div class="tool-guide-steps">
${stepsHtml}
          </div>
        </div>`;
}

for (const [filename, data] of Object.entries(guideCardData)) {
  const filePath = path.join('tools', filename);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('tool-guide-card')) {
    console.log(`${filename} already has tool-guide-card, skipping.`);
    continue;
  }

  const cardHtml = generateGuideCardHtml(data);

  // Check if there is `<style>` before the end of renderUI
  const initPos = content.indexOf('init(');
  const renderSub = content.slice(0, initPos);

  if (renderSub.includes('<style>')) {
    // Insert before the </div> that precedes <style>
    const stylePos = renderSub.lastIndexOf('<style>');
    const divPos = renderSub.lastIndexOf('</div>', stylePos);
    content = content.slice(0, divPos) + cardHtml + '\n      ' + content.slice(divPos);
  } else {
    // Insert before the last </div> before ``;\n  },``
    const lastBacktickPos = renderSub.lastIndexOf('`');
    const divPos = renderSub.lastIndexOf('</div>', lastBacktickPos);
    content = content.slice(0, divPos) + cardHtml + '\n      ' + content.slice(divPos);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully added tool-guide-card to ${filename}`);
}
