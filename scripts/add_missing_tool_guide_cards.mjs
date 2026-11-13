import fs from 'fs';
import path from 'path';

const toolsDir = 'tools';
const androidToolsDir = path.join('omnitool-android-app', 'app', 'src', 'main', 'assets', 'web', 'tools');

function makeGuideCardHtml(title, badge, steps) {
  return `
        <!-- Standard Canonical Tool Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>${title}</span>
            </div>
            <div class="tool-guide-badge">${badge}</div>
          </div>

          <div class="tool-guide-steps">
            ${steps.map((s, idx) => `
            <div class="tool-guide-step">
              <div class="tool-step-num">${idx + 1}</div>
              <div class="tool-step-content">
                <h4>${s.h}</h4>
                <p>${s.p}</p>
              </div>
            </div>
            `).join('')}
          </div>
        </div>
  `;
}

const cardsData = {
  'robots-generator.js': {
    title: 'Quick Guide: How to Generate robots.txt',
    badge: 'SEO & AI Shield',
    steps: [
      { h: 'Select Crawlers & Directives', p: 'Choose user-agents like Googlebot, Bingbot, or wildcard (*) and configure crawl delay.' },
      { h: 'Add Path Restrictions', p: 'Specify directories to Disallow (like /admin/ or /private/) and public paths to Allow.' },
      { h: 'Toggle AI Scraper Shield', p: 'Block unauthorized AI crawlers including GPTBot, CCBot, and ClaudeBot with one click.' },
      { h: 'Deploy to Domain Root', p: 'Download or copy robots.txt and place it at the exact root of your web server domain.' }
    ]
  },
  'lorem-generator.js': {
    title: 'Quick Guide: How to Generate Dummy Text',
    badge: 'Dummy Content Studio',
    steps: [
      { h: 'Choose Theme & Vocabulary', p: 'Select Latin Classic, Modern Tech, Startup Pitch, or Legal & Medical jargon.' },
      { h: 'Set Quantity & Units', p: 'Configure paragraphs, sentences, words, or list items with custom length bounds.' },
      { h: 'Select Output Markup', p: 'Output as clean Plain Text, semantic HTML <p> tags, Markdown, or JSON array.' },
      { h: 'Copy or Download', p: 'One-click copy formatted placeholder text directly into design mockups or codebases.' }
    ]
  },
  'favicon-generator.js': {
    title: 'Quick Guide: How to Generate Favicons & App Icons',
    badge: 'Multi-Platform Package',
    steps: [
      { h: 'Upload Master Artwork', p: 'Drop a high-resolution PNG, SVG, or JPG logo into the canvas stage.' },
      { h: 'Customize Shape & Background', p: 'Choose square, rounded, circular, or transparent padding with custom hex colors.' },
      { h: 'Preview Multi-Platform Mockups', p: 'View real-time browser tab, iOS home screen, Android app, and Windows tile mockups.' },
      { h: 'Download ZIP & Embed HTML', p: 'Download the complete multi-resolution asset bundle and copy production <head> link tags.' }
    ]
  },
  'screen-recorder.js': {
    title: 'Quick Guide: How to Record Screen & Tab Video',
    badge: '100% In-Browser WebRTC',
    steps: [
      { h: 'Select Capture Source', p: 'Choose entire screen, application window, or specific browser tab via native WebRTC.' },
      { h: 'Configure Audio Inputs', p: 'Toggle system internal audio, external microphone narration, or silent recording.' },
      { h: 'Record with Live Controls', p: 'Pause, resume, and inspect elapsed recording time with real-time hardware encoding.' },
      { h: 'Export WebM or MP4', p: 'Download high-framerate video recordings instantly with zero server uploads.' }
    ]
  },
  'voice-recorder.js': {
    title: 'Quick Guide: How to Record & Edit Audio',
    badge: 'High-Fidelity Waveform',
    steps: [
      { h: 'Select Microphone & Sample Rate', p: 'Choose audio input source and configure 44.1kHz / 48kHz studio audio fidelity.' },
      { h: 'Record with Live Oscilloscope', p: 'Monitor real-time audio waveforms, dB level meters, and peak levels in local memory.' },
      { h: 'Trim & Inspect', p: 'Use the interactive waveform scrubber to preview recordings and inspect audio duration.' },
      { h: 'Export WAV / MP3', p: 'Download lossless audio tracks directly without audio data leaking to third-party servers.' }
    ]
  },
  'video-speed.js': {
    title: 'Quick Guide: How to Adjust Video Playback Speed',
    badge: 'Client-Side Speed Engine',
    steps: [
      { h: 'Load Video File', p: 'Drag and drop any MP4, WebM, MOV, or MKV file into the player.' },
      { h: 'Select Target Multiplier', p: 'Choose 0.25x to 4.0x speed or configure fine-grained percentage increments.' },
      { h: 'Preserve Audio Pitch', p: 'Ensure voices remain naturally modulated without chipmunk distortion via HTML5 pitch correction.' },
      { h: 'Save or Watch Live', p: 'Preview smoothly at the chosen speed or download adjusted video clips locally.' }
    ]
  },
  'video-to-gif.js': {
    title: 'Quick Guide: How to Convert Video to Animated GIF',
    badge: 'Color Quantization & Dithering',
    steps: [
      { h: 'Import Video Clip', p: 'Select an MP4, WebM, or MOV video clip from your local drive.' },
      { h: 'Trim Start & End Time', p: 'Set precise in/out timecodes to extract the exact highlight segment.' },
      { h: 'Configure FPS & Resolution', p: 'Adjust framerate (10-30 FPS) and dimension scaling to optimize GIF file size.' },
      { h: 'Generate & Download GIF', p: 'Render in local Web Workers and download the lightweight animated GIF immediately.' }
    ]
  },
  'temp-mail.js': {
    title: 'Quick Guide: How to Use Disposable Temp Mail',
    badge: 'Spam-Free Privacy',
    steps: [
      { h: 'Generate Anonymous Inbox', p: 'Create a private random temporary email address with a single click.' },
      { h: 'Use for Verifications', p: 'Paste the email address into signups, trials, or services to avoid spam on personal inboxes.' },
      { h: 'Receive Real-Time Emails', p: 'Auto-refresh incoming messages and inspect verification links and OTP codes safely.' },
      { h: 'Auto-Purge & Destroy', p: 'Discard the inbox anytime; messages and credentials are permanently purged.' }
    ]
  }
};

for (const [file, data] of Object.entries(cardsData)) {
  const filePath = path.join(toolsDir, file);
  let code = fs.readFileSync(filePath, 'utf8');

  if (code.includes('tool-guide-card')) {
    console.log(`[SKIP] ${file} already contains tool-guide-card`);
    continue;
  }

  const cardHtml = makeGuideCardHtml(data.title, data.badge, data.steps);

  // In renderUI(), find the closing </div> of split-view before `
  const renderIdx = code.indexOf('renderUI()');
  const returnIdx = code.indexOf('return `', renderIdx);
  const endTick = code.indexOf('`;', returnIdx);

  if (endTick !== -1) {
    // Find the last </div> before endTick
    const beforeEnd = code.slice(0, endTick);
    const lastDiv = beforeEnd.lastIndexOf('</div>');
    if (lastDiv !== -1) {
      // Insert cardHtml right before the closing </div> of the layout
      code = beforeEnd.slice(0, lastDiv) + cardHtml + beforeEnd.slice(lastDiv) + code.slice(endTick);
      fs.writeFileSync(filePath, code, 'utf8');
      console.log(`[PASS] Injected tool-guide-card into ${file}`);

      // Sync to Android mirror
      const androidPath = path.join(androidToolsDir, file);
      if (fs.existsSync(androidToolsDir)) {
        fs.writeFileSync(androidPath, code, 'utf8');
      }
    }
  }
}

console.log('\nAll 8 tools successfully enhanced with standard .tool-guide-card!');

