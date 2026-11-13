// OmniTool Hub - Voice Recorder & Audio Waveform Studio
// 100% Client-Side audio recording, live voice tester & soundcheck, Audacity raw-mic mode, modular CPU performance control, 3D wireframe studio, multi-format audio inspector, trimmer, DSP audio enhancer, and speech transcription.

import { escapeHtml } from './utils.js';

export default {
  id: "voice-recorder",
  name: "Voice Recorder & Audio Waveform Studio",

  // Audio & Visualization state
  audioContext: null,
  analyser: null,
  sourceNode: null,
  gainNode: null,
  muteSinkNode: null,
  micStream: null,
  mediaRecorder: null,
  recordedChunks: [],
  animationFrameId: null,
  audioChunksBuffer: [],
  recordedBlob: null,
  recordedUrl: null,
  isDestroyed: false,

  // Live Voice Tester & Soundcheck state
  isVoiceTesting: false,
  testStream: null,
  testSourceNode: null,
  testGainNode: null,
  testAnalyser: null,
  isLoopbackTesting: false,
  silentSampleCount: 0,

  // Player audio analysis for live playback visualization
  playerSourceNode: null,
  playerAnalyser: null,
  playerSourceConnected: false,
  isPlayingAudio: false,

  // AudioBuffer instances for studio editing & inspection
  currentAudioBuffer: null,
  originalAudioBuffer: null,
  waveformPeaks: null,

  // Reusable typed arrays for visualization (ZERO Garbage Collection churn)
  freqData: null,
  timeDomainData: null,
  lastMeterUpdateTime: 0,

  // Playhead & trimming
  trimStart: 0,
  trimEnd: 0,
  previewInterval: null,
  isScrubbing: false,

  // Speech to text (Disabled by default for zero CPU & zero mic interference)
  recognition: null,
  transcriptSegments: [],

  timerInterval: null,
  elapsedSeconds: 0,
  recordingState: "idle", // 'idle' | 'recording' | 'paused' | 'stopped'
  visMode: "3d-wireframe", // '3d-wireframe' | 'crt-oscilloscope' | 'bars' | 'neon' | 'radial' | 'ribbon' | 'eco' | 'off'
  canvasViewMode: "visualizer", // 'visualizer' | 'timeline'
  activeStudioTab: "mic", // 'mic' | 'file'
  animStartTime: 0,
  audioMode: "raw", // 'raw' (Audacity Direct - no gate) | 'filtered' (WebRTC noise gate)

  // Pre-cached visualizer structures
  gridCols: 22,
  gridRows: 14,
  gridPtsX: null,
  gridPtsY: null,
  neonPalette: null,
  barGradient: null,
  lastCanvasHeight: 0,
  resizeObserver: null,
  cachedAudioDevices: [],
  connectBanner: null,
  connectTitle: null,
  connectSubtitle: null,
  heroConnectBtn: null,
  autoFindMicBtn: null,
  quickPillsContainer: null,
  _lastPct: -1,
  _lastDb: "",
  _lastClip: false,
  _lastDiagMsg: "",
  _lastDiagIcon: "",
  _lastDiagTime: 0,
  _cachedBgGrad: null,
  _cachedHorizonGrad: null,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Left Panel: Recording Studio, Audio Upload & Controls -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Voice &amp; Audio Studio</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Capture studio voice memos, test microphones, inspect waveforms, and transcribe in real time.
              </p>
            </div>
            <div id="vr-status-pill" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; background: rgba(255, 255, 255, 0.05); color: var(--text-muted);">
              <span style="width: 8px; height: 8px; border-radius: 50%; background: #10b981;"></span>
              <span id="vr-status-text">Studio Standby</span>
            </div>
          </div>

          <!-- Quick Studio Presets Selector -->
          <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 10px; margin-bottom: 12px; display: flex; flex-direction: column; gap: 6px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-main); letter-spacing: 0.5px;">⚡ QUICK STUDIO PRESETS</span>
              <span style="font-size: 10px; color: var(--accent-cyan);">1-Click Auto Config</span>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 6px;">
              <button class="vr-preset-btn tool-btn secondary active" data-preset="raw-mic" style="font-size: 10px; padding: 6px 4px; display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center; border-color: var(--accent-cyan); background: rgba(0, 242, 254, 0.1);">
                <span style="font-size: 14px;">🎙️</span>
                <strong style="color: var(--text-main); font-size: 11px;">Audacity Raw</strong>
                <span style="font-size: 9px; color: var(--accent-cyan);">Zero Filter Gate</span>
              </button>
              <button class="vr-preset-btn tool-btn secondary" data-preset="podcast" style="font-size: 10px; padding: 6px 4px; display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center;">
                <span style="font-size: 14px;">🎧</span>
                <strong style="color: var(--text-main); font-size: 11px;">Podcast</strong>
                <span style="font-size: 9px; color: var(--text-muted);">Warmth Boost</span>
              </button>
              <button class="vr-preset-btn tool-btn secondary" data-preset="acoustic" style="font-size: 10px; padding: 6px 4px; display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center;">
                <span style="font-size: 14px;">🎵</span>
                <strong style="color: var(--text-main); font-size: 11px;">Acoustic</strong>
                <span style="font-size: 9px; color: var(--text-muted);">Stereo Raw</span>
              </button>
              <button class="vr-preset-btn tool-btn secondary" data-preset="eco" style="font-size: 10px; padding: 6px 4px; display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center;">
                <span style="font-size: 14px;">⚡</span>
                <strong style="color: var(--text-main); font-size: 11px;">Low CPU Eco</strong>
                <span style="font-size: 9px; color: var(--text-muted);">&lt;1% CPU Mode</span>
              </button>
              <button class="vr-preset-btn tool-btn secondary" data-preset="memo" style="font-size: 10px; padding: 6px 4px; display: flex; flex-direction: column; align-items: center; gap: 2px; text-align: center;">
                <span style="font-size: 14px;">📝</span>
                <strong style="color: var(--text-main); font-size: 11px;">Voice Memo</strong>
                <span style="font-size: 9px; color: var(--text-muted);">Clean Mono</span>
              </button>
            </div>
          </div>

          <!-- Studio Source Mode Switcher (Mic vs File Upload) -->
          <div style="display: flex; gap: 6px; margin-bottom: 12px; background: rgba(0, 0, 0, 0.25); padding: 4px; border-radius: 8px; border: 1px solid var(--border-color);">
            <button id="vr-tab-mic" class="tool-tab-btn active" style="flex: 1; padding: 6px 12px; font-size: 12px; border-radius: 6px; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              </svg>
              <span>Live Microphone</span>
            </button>
            <button id="vr-tab-file" class="tool-tab-btn" style="flex: 1; padding: 6px 12px; font-size: 12px; border-radius: 6px; border: none; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>Upload Audio Track</span>
            </button>
          </div>

          <!-- DECK A: Live Microphone Recording Controls -->
          <div id="vr-mic-deck" style="display: flex; flex-direction: column; gap: 12px;">
            
            <!-- ONE-CLICK MICROPHONE CONNECT & LIVE MONITOR BANNER -->
            <div id="vr-connect-banner" style="background: linear-gradient(135deg, rgba(0, 242, 254, 0.12), rgba(16, 185, 129, 0.12)); border: 1px solid var(--accent-cyan); border-radius: 10px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span id="vr-connect-icon" style="font-size: 24px;">🎙️</span>
                <div>
                  <div id="vr-connect-title" style="font-size: 13px; font-weight: 700; color: #fff;">Microphone Standby / Not Listening</div>
                  <div id="vr-connect-subtitle" style="font-size: 11px; color: var(--text-muted);">Click to allow browser microphone access and activate live soundcheck.</div>
                </div>
              </div>
              <button id="vr-hero-connect-btn" class="tool-btn primary" style="padding: 7px 16px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
                <span>⚡ Connect &amp; Listen Live</span>
              </button>
            </div>
            
            <!-- SYSTEM WORKLOAD & PERFORMANCE CONTROL STRIP (User Enable / Disable Toggles) -->
            <div id="vr-perf-deck" style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-size: 13px;">⚙️</span>
                  <strong style="font-size: 11px; color: #10b981; letter-spacing: 0.5px;">SYSTEM WORKLOAD &amp; HEAVY PROCESS CONTROLS</strong>
                </div>
                <span id="vr-cpu-badge" style="font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 12px; background: rgba(16, 185, 129, 0.15); color: #10b981;">🟢 Ultralight (&lt;1% CPU)</span>
              </div>

              <!-- 1. Live Speech-to-Text Heavy Service Enable/Disable Switch -->
              <div style="background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 700; color: var(--text-main); cursor: pointer;">
                    <input type="checkbox" id="vr-stt-toggle" style="accent-color: var(--accent-cyan); width: 15px; height: 15px;">
                    <span>Live AI Speech Transcription</span>
                  </label>
                  <div style="font-size: 10px; color: var(--text-muted); margin-left: 23px;">
                    Runs Web Speech engine. <strong>Keep OFF</strong> if your system is slow or mic is cutting out.
                  </div>
                </div>
                <span id="vr-stt-status-pill" style="font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 10px; background: rgba(255, 255, 255, 0.05); color: var(--text-muted);">OFF (Zero CPU)</span>
              </div>

              <!-- 2. Audio Processing Mode: Raw Direct (Audacity) vs WebRTC Software Gate -->
              <div style="background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
                <div>
                  <div style="font-size: 11px; font-weight: 700; color: var(--text-main);">
                    Microphone Audio Processing Mode
                  </div>
                  <div id="vr-audio-mode-desc" style="font-size: 10px; color: var(--accent-cyan);">
                    ⚡ Audacity Raw Mode: Captures 100% direct audio with ZERO noise gating or suppression.
                  </div>
                </div>
                <div style="display: flex; gap: 4px;">
                  <button id="vr-mode-raw-btn" class="tool-btn secondary" style="font-size: 10px; padding: 4px 8px; height: 24px; border-color: var(--accent-cyan); background: rgba(0, 242, 254, 0.15); color: var(--accent-cyan); font-weight: 700;">Audacity Raw</button>
                  <button id="vr-mode-filter-btn" class="tool-btn secondary" style="font-size: 10px; padding: 4px 8px; height: 24px;">WebRTC Filtered</button>
                </div>
              </div>

              <!-- 3. Visualizer GPU / Animation Load Controller -->
              <div style="background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); border-radius: 8px; padding: 8px 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
                <div>
                  <div style="font-size: 11px; font-weight: 700; color: var(--text-main);">
                    Visualizer Animation Engine
                  </div>
                  <div style="font-size: 10px; color: var(--text-muted);">
                    Select rendering detail to save GPU/CPU battery.
                  </div>
                </div>
                <select id="vr-vis-mode-select" class="tool-input" style="padding: 4px 8px; font-size: 11px; width: 170px;">
                  <option value="3d-wireframe" selected>🌐 3D Cyber Wireframe (Full FX)</option>
                  <option value="crt-oscilloscope">⚡ Phosphor CRT Wave</option>
                  <option value="bars">📊 Spectrum Bars</option>
                  <option value="neon">🌈 Neon Spectrum</option>
                  <option value="radial">🌀 Radial Radar</option>
                  <option value="ribbon">🌊 Fluid Sine Ribbon</option>
                  <option value="eco">⚡ Eco Mode (Lightweight 2D)</option>
                  <option value="off">🛑 Visualizer OFF (0% CPU Load)</option>
                </select>
              </div>
            </div>

            <!-- Hardware Input & Device Config -->
            <div id="vr-settings" style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-main); letter-spacing: 0.5px;">HARDWARE &amp; GAIN</span>
                <button id="vr-refresh-devices-btn" class="tool-btn secondary" style="font-size: 10px; padding: 2px 8px; height: 22px;">Scan Devices</button>
              </div>

              <!-- Input Device Dropdown -->
              <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span>Microphone Device</span>
                  <button id="vr-autofind-mic-btn" type="button" class="tool-btn secondary" style="font-size: 9px; padding: 2px 7px; height: 20px; border-color: var(--accent-cyan); color: var(--accent-cyan); font-weight: 700;" title="Tests each microphone to see which one detects your voice">
                    🔍 Auto-Find Active Mic
                  </button>
                </div>
                <select id="vr-device-select" class="tool-input" style="padding: 6px 10px; font-size: 12px;">
                  <option value="">Default System Microphone</option>
                </select>
              </label>

              <!-- Quick Device Switch Pills (e.g. realme Buds vs Realtek laptop mic) -->
              <div id="vr-quick-device-pills" style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: -2px;"></div>

              <!-- Live Mic Gain Slider -->
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
                  <span>Mic Gain Boost</span>
                  <span id="vr-gain-val" style="color: var(--accent-cyan); font-weight: 700;">115% (Boosted)</span>
                </div>
                <input type="range" id="vr-mic-gain" min="0" max="300" value="115" style="accent-color: var(--accent-cyan); width: 100%; cursor: pointer;">
              </div>

              <!-- Live Pass-through Monitor & Individual Filter Toggles -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 2px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--text-main); cursor: pointer;" title="Use headphones to avoid audio feedback loops">
                  <input type="checkbox" id="vr-monitor-toggle" style="accent-color: var(--accent-cyan); width: 13px; height: 13px;">
                  <span>🎧 Live Headphone Monitor</span>
                </label>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--text-muted); cursor: pointer;">
                  <input type="checkbox" id="vr-noise-suppression" style="accent-color: var(--accent-cyan); width: 13px; height: 13px;">
                  <span>Noise Suppression</span>
                </label>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--text-muted); cursor: pointer;">
                  <input type="checkbox" id="vr-echo-cancel" style="accent-color: var(--accent-cyan); width: 13px; height: 13px;">
                  <span>Echo Cancellation</span>
                </label>

                <label style="display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--text-muted); cursor: pointer;">
                  <input type="checkbox" id="vr-auto-gain" style="accent-color: var(--accent-cyan); width: 13px; height: 13px;">
                  <span>Auto Gain Control</span>
                </label>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(180px, 100%), 1fr)); gap: 8px; margin-top: 2px;">
                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted); min-width: 0;">
                  Audio Channels
                  <select id="vr-channel-select" class="tool-input" style="padding: 6px 10px; font-size: 12px; width: 100%; min-width: 0; box-sizing: border-box;">
                    <option value="mono" selected>Mono (Speech &amp; Vocals)</option>
                    <option value="stereo">Stereo (2 Channels)</option>
                  </select>
                </label>

                <label style="display: flex; flex-direction: column; gap: 4px; font-size: 11px; color: var(--text-muted); min-width: 0;">
                  Transcription Language
                  <select id="vr-stt-lang" class="tool-input" style="padding: 6px 10px; font-size: 12px; width: 100%; min-width: 0; box-sizing: border-box;">
                    <option value="en-US" selected>English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Spanish</option>
                    <option value="fr-FR">French</option>
                    <option value="de-DE">German</option>
                    <option value="it-IT">Italian</option>
                    <option value="pt-BR">Portuguese</option>
                    <option value="hi-IN">Hindi</option>
                    <option value="ja-JP">Japanese</option>
                    <option value="zh-CN">Chinese</option>
                  </select>
                </label>
              </div>
            </div>

            <!-- LIVE VOICE TESTER & SOUNDCHECK SUITE -->
            <div id="vr-tester-deck" style="background: rgba(0, 242, 254, 0.04); border: 1px solid rgba(0, 242, 254, 0.28); border-radius: 10px; padding: 10px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span style="font-size: 13px;">🎙️</span>
                  <strong style="font-size: 11px; color: var(--accent-cyan); letter-spacing: 0.5px;">LIVE VOICE TESTER &amp; SOUNDCHECK</strong>
                </div>
                <span id="vr-test-state-badge" style="font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 12px; background: rgba(255, 255, 255, 0.05); color: var(--text-muted);">Standby</span>
              </div>

              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button id="vr-test-mic-btn" class="tool-btn secondary" style="flex: 1; min-width: 135px; font-size: 11px; padding: 7px 10px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; border-color: var(--accent-cyan); color: var(--accent-cyan); font-weight: 700;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  </svg>
                  <span id="vr-test-mic-label">Start Live Voice Test</span>
                </button>

                <button id="vr-loopback-btn" class="tool-btn secondary" style="flex: 1; min-width: 135px; font-size: 11px; padding: 7px 10px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                  </svg>
                  <span id="vr-loopback-label">3s Loopback Soundcheck</span>
                </button>
              </div>

              <!-- Live Voice Diagnostic Status Readout -->
              <div id="vr-test-status-box" style="font-size: 11px; line-height: 1.4; color: var(--text-muted); background: rgba(0, 0, 0, 0.35); border-radius: 6px; padding: 6px 8px; border: 1px solid rgba(255, 255, 255, 0.05); display: flex; align-items: center; gap: 6px;">
                <span id="vr-test-icon">⚪</span>
                <span id="vr-test-msg">Click "Start Live Voice Test" to test mic input &amp; verify sound pickup.</span>
              </div>

              <div id="vr-audacity-hint" style="font-size: 10px; color: var(--text-muted); line-height: 1.35; opacity: 0.9;">
                💡 <strong>Audacity Comparison Tip:</strong> Ensure the device chosen in <em>"Microphone Device"</em> matches your Audacity recording device. If Audacity is holding an Exclusive WASAPI lock, switch Audacity's Audio Host to MME or DirectSound.
              </div>
            </div>

            <!-- Volume Peak Level Indicator with Audacity-style dB Readout & Clipping Warning -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
                <span>Input Mic Level</span>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span id="vr-db-text" style="font-family: monospace; color: var(--accent-cyan); font-weight: 700;">-∞ dB</span>
                  <span id="vr-clip-badge" style="display: none; color: #ef4444; font-weight: 700;">[CLIP]</span>
                  <span id="vr-level-text" style="font-weight: 700; color: var(--text-main);">0%</span>
                </div>
              </div>
              <div style="height: 8px; background: rgba(255, 255, 255, 0.06); border-radius: 4px; overflow: hidden; position: relative;">
                <div id="vr-level-bar" style="height: 100%; width: 0%; background: linear-gradient(to right, #10b981 65%, #f59e0b 85%, #ef4444 100%);"></div>
              </div>
            </div>

            <!-- Timer & Action Buttons -->
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div id="vr-timer-display" style="font-size: 36px; font-weight: 800; font-family: monospace; text-align: center; color: var(--text-main); padding: 10px; background: rgba(0, 0, 0, 0.25); border-radius: 8px; border: 1px solid var(--border-color); letter-spacing: 2px;">
                00:00:00
              </div>

              <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                <button id="vr-record-btn" class="tool-btn primary" style="font-size: 14px; padding: 10px 24px; display: inline-flex; align-items: center; gap: 8px; min-width: 170px; justify-content: center;">
                  <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  <span>Record Audio</span>
                </button>

                <button id="vr-pause-btn" class="tool-btn secondary" style="font-size: 14px; padding: 10px 20px; display: none; align-items: center; gap: 8px;">
                  <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <span>Resume</span>
                </button>

                <button id="vr-stop-btn" class="tool-btn secondary" style="font-size: 14px; padding: 10px 20px; display: none; align-items: center; gap: 8px; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.4); color: #ef4444;">
                  <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
                    <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                  </svg>
                  <span>Stop &amp; Process</span>
                </button>
              </div>
            </div>
          </div>

          <!-- DECK B: Upload Existing Audio File (Initially hidden) -->
          <div id="vr-upload-deck" style="display: none; flex-direction: column; gap: 12px;">
            <div id="vr-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 36px 20px; text-align: center; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 220px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width: 48px; height: 48px; color: var(--accent-cyan); margin-bottom: 12px;">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
              <div style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
                Drop Audio File Here or Click to Browse
              </div>
              <div style="font-size: 11px; color: var(--text-muted); max-width: 320px;">
                Supports MP3, WAV, OGG, M4A, FLAC, AAC. 100% client-side memory decoding, zero server upload.
              </div>
              <input type="file" id="vr-file-input" accept="audio/*,video/*" style="display: none;">
            </div>
          </div>
        </div>

        <!-- Right Panel: Oscilloscope, Live Transcription & Audio Editing Deck -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Waveform Studio Display</h3>
              <span style="font-size: 11px; color: var(--text-muted);">Real-time analysis &amp; timeline</span>
            </div>
            <div style="display: flex; gap: 8px; align-items: center;">
              <button id="vr-toggle-view-btn" class="tool-btn secondary" style="font-size: 10px; padding: 3px 8px; height: 24px; display: none;" title="Toggle between animated visualizer and timeline editor">
                <span>📊 Show Timeline</span>
              </button>
              <span id="vr-duration-badge" style="font-size: 11px; color: var(--accent-cyan); font-weight: 700;"></span>
            </div>
          </div>

          <!-- Waveform Canvas Display (Live 3D wireframe / visualizer) -->
          <div id="vr-canvas-container" style="position: relative; background: #04060a; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; height: 230px; display: flex; align-items: center; justify-content: center; cursor: pointer; touch-action: none; user-select: none; -webkit-user-select: none;" title="Click or drag to seek playhead">
            <canvas id="vr-vis-canvas" width="650" height="230" style="width: 100%; height: 100%; display: block;"></canvas>
            
            <!-- Live Status HUD Pill Overlay -->
            <div id="vr-vis-hud" style="position: absolute; top: 10px; left: 12px; display: flex; align-items: center; gap: 6px; padding: 3px 8px; background: rgba(0, 0, 0, 0.6); border: 1px solid rgba(0, 242, 254, 0.3); border-radius: 4px; font-size: 10px; font-family: monospace; color: var(--accent-cyan); pointer-events: none; z-index: 5;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--accent-cyan); animation: pulse 1.5s infinite;"></span>
              <span id="vr-hud-text">LIVE 3D WIREFRAME • STANDBY</span>
            </div>
          </div>

          <!-- Live Real-Time Transcription Box (Initially hidden until user turns it ON!) -->
          <div id="vr-stt-container" style="display: none; flex-direction: column; gap: 6px; margin-top: 10px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="width: 7px; height: 7px; border-radius: 50%; background: #10b981; animation: pulse 1.5s infinite;"></span>
                <span style="font-size: 11px; font-weight: 700; color: var(--text-main);">LIVE SPEECH TRANSCRIPTION (ENABLED)</span>
              </div>
              <div style="display: flex; gap: 6px;">
                <button id="vr-copy-stt-btn" class="tool-btn secondary" style="font-size: 10px; padding: 2px 8px; height: 22px;">Copy Text</button>
                <button id="vr-download-txt-btn" class="tool-btn secondary" style="font-size: 10px; padding: 2px 8px; height: 22px;">.txt</button>
                <button id="vr-download-srt-btn" class="tool-btn secondary" style="font-size: 10px; padding: 2px 8px; height: 22px;">.srt</button>
              </div>
            </div>
            <textarea id="vr-stt-output" class="tool-input" rows="2" placeholder="Live speech transcription appears here..." style="width: 100%; font-size: 11px; resize: vertical; line-height: 1.4; padding: 6px 8px; background: rgba(0, 0, 0, 0.3); border-radius: 6px;"></textarea>
          </div>

          <!-- Audio Playback, Editing & DSP Deck (Visible after capture or file load) -->
          <div id="vr-playback-section" style="display: none; flex-direction: column; gap: 10px; margin-top: 10px;">
            <!-- Player & Speed Bar -->
            <div id="vr-player-box" style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 8px;">
              <audio id="vr-audio-player" controls style="width: 100%; height: 38px; outline: none;"></audio>
              
              <!-- Playback Rate Selector -->
              <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-muted);">
                <span>Playback Speed:</span>
                <div style="display: flex; gap: 4px;">
                  <button class="vr-speed-pill tool-btn secondary" data-speed="0.75" style="font-size: 10px; padding: 2px 8px; height: 22px;">0.75x</button>
                  <button class="vr-speed-pill tool-btn secondary" data-speed="1.0" style="font-size: 10px; padding: 2px 8px; height: 22px; background: rgba(0, 242, 254, 0.2); color: var(--accent-cyan);">1.0x</button>
                  <button class="vr-speed-pill tool-btn secondary" data-speed="1.25" style="font-size: 10px; padding: 2px 8px; height: 22px;">1.25x</button>
                  <button class="vr-speed-pill tool-btn secondary" data-speed="1.5" style="font-size: 10px; padding: 2px 8px; height: 22px;">1.5x</button>
                  <button class="vr-speed-pill tool-btn secondary" data-speed="2.0" style="font-size: 10px; padding: 2px 8px; height: 22px;">2.0x</button>
                </div>
              </div>
            </div>

            <!-- Waveform Range Trimming Suite -->
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-main);">✂️ AUDIO RANGE TRIMMER</span>
                <span id="vr-trim-range-label" style="font-size: 11px; color: var(--accent-cyan); font-family: monospace;">Full Duration</span>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 8px;">
                <div style="display: flex; gap: 6px; align-items: center;">
                  <label style="font-size: 11px; color: var(--text-muted); min-width: 48px;">Start [A]:</label>
                  <input type="number" id="vr-trim-start" class="tool-input" min="0" step="0.1" value="0.0" style="flex: 1; padding: 4px 6px; font-size: 11px; font-family: monospace;">
                  <button id="vr-set-a-btn" class="tool-btn secondary" style="font-size: 10px; padding: 3px 8px;" title="Set start marker at current playhead">Set [A]</button>
                </div>

                <div style="display: flex; gap: 6px; align-items: center;">
                  <label style="font-size: 11px; color: var(--text-muted); min-width: 48px;">End [B]:</label>
                  <input type="number" id="vr-trim-end" class="tool-input" min="0" step="0.1" value="0.0" style="flex: 1; padding: 4px 6px; font-size: 11px; font-family: monospace;">
                  <button id="vr-set-b-btn" class="tool-btn secondary" style="font-size: 10px; padding: 3px 8px;" title="Set end marker at current playhead">Set [B]</button>
                </div>
              </div>

              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button id="vr-preview-trim-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 10px; display: inline-flex; align-items: center; gap: 4px;">
                  <svg viewBox="0 0 24 24" fill="currentColor" style="width: 12px; height: 12px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  <span>Preview Selection</span>
                </button>
                <button id="vr-apply-trim-btn" class="tool-btn primary" style="font-size: 11px; padding: 4px 12px;">Apply Trim to Selection</button>
                <button id="vr-reset-trim-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 8px;">Reset to Original</button>
              </div>
            </div>

            <!-- DSP Audio Enhancers & Vocal EQ Presets -->
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px; display: flex; flex-direction: column; gap: 8px;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-main);">🎛️ STUDIO AUDIO ENHANCEMENTS &amp; DSP</span>
              
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button id="vr-normalize-btn" class="tool-btn secondary" style="font-size: 11px; padding: 5px 10px; display: inline-flex; align-items: center; gap: 4px;" title="Boosts overall loudness to optimal level without digital distortion">
                  <span>⚡ Normalize Peak (-0.2 dB)</span>
                </button>

                <button id="vr-fade-in-btn" class="tool-btn secondary" style="font-size: 11px; padding: 5px 10px;" title="1.5 second smooth start fade">
                  <span>Fade In (1.5s)</span>
                </button>

                <button id="vr-fade-out-btn" class="tool-btn secondary" style="font-size: 11px; padding: 5px 10px;" title="1.5 second smooth ending fade">
                  <span>Fade Out (1.5s)</span>
                </button>
              </div>

              <!-- Filter EQ Presets -->
              <div style="display: flex; gap: 8px; align-items: center; margin-top: 2px;">
                <select id="vr-eq-preset-select" class="tool-input" style="flex: 1; padding: 5px 8px; font-size: 11px;">
                  <option value="warmth" selected>Podcast Warmth (Bass &amp; Presence)</option>
                  <option value="rumble-cut">Rumble Cut (High-pass 80Hz)</option>
                  <option value="telephone">Telephone / Walkie-Talkie Filter</option>
                  <option value="bass-boost">Deep Bass Vocal Boost (+8dB)</option>
                </select>
                <button id="vr-apply-eq-btn" class="tool-btn secondary" style="font-size: 11px; padding: 5px 12px;">Apply Filter</button>
              </div>
            </div>

            <!-- Export Buttons Strip -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <input type="text" id="vr-filename-input" class="tool-input" value="omnitool-voice-memo" placeholder="File name" style="flex: 1; min-width: 140px; padding: 8px 12px; font-size: 12px;">
              
              <button id="vr-download-wav-btn" class="tool-btn primary" style="font-size: 12px; padding: 8px 16px; display: inline-flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download WAV (Lossless)</span>
              </button>

              <button id="vr-download-webm-btn" class="tool-btn secondary" style="font-size: 12px; padding: 8px 12px;">
                <span>Download Audio</span>
              </button>

              <button id="vr-download-png-btn" class="tool-btn secondary" style="font-size: 12px; padding: 8px 12px;" title="Export high-resolution waveform image">
                <span>Waveform PNG</span>
              </button>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-muted);">
              <span id="vr-specs-info">Standard 44.1kHz • 16-Bit PCM</span>
              <button id="vr-new-recording-btn" class="tool-btn secondary" style="font-size: 11px; padding: 4px 10px;">Record / Load Another</button>
            </div>
          </div>
        </div>
      
        <!-- Standard Canonical Tool Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: How to Record & Edit Audio</span>
            </div>
            <div class="tool-guide-badge">High-Fidelity Waveform</div>
          </div>

          <div class="tool-guide-steps">
            
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Select Microphone & Sample Rate</h4>
                <p>Choose audio input source and configure 44.1kHz / 48kHz studio audio fidelity.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Record with Live Oscilloscope</h4>
                <p>Monitor real-time audio waveforms, dB level meters, and peak levels in local memory.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Trim & Inspect</h4>
                <p>Use the interactive waveform scrubber to preview recordings and inspect audio duration.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">4</div>
              <div class="tool-step-content">
                <h4>Export WAV / MP3</h4>
                <p>Download lossless audio tracks directly without audio data leaking to third-party servers.</p>
              </div>
            </div>
            
          </div>
        </div>
  </div>
    `;
  },

  init(container, appInstance) {
    this.container = container;
    this.app = appInstance;
    this.animStartTime = performance.now();
    this.isDestroyed = false;

    // Ensure all stale audio nodes from previous sessions are wiped clean
    this.sourceNode = null;
    this.gainNode = null;
    this.analyser = null;
    this.scriptProcessor = null;
    this.muteSinkNode = null;
    this.playerSourceNode = null;
    this.playerAnalyser = null;
    this.playerSourceConnected = false;
    this.testSourceNode = null;
    this.testGainNode = null;
    this.testAnalyser = null;
    this.isVoiceTesting = false;
    this.isLoopbackTesting = false;
    this.isPlayingAudio = false;
    this.isScrubbing = false;
    this.audioChunksBuffer = [];
    this.recordedChunks = [];

    // Allocate reusable typed arrays once to eliminate GC pauses
    this.freqData = new Uint8Array(256);
    this.timeDomainData = new Uint8Array(256);
    this.initVisualizerCache();

    // Mode tabs & Presets
    this.tabMic = container.querySelector('#vr-tab-mic');
    this.tabFile = container.querySelector('#vr-tab-file');
    this.micDeck = container.querySelector('#vr-mic-deck');
    this.uploadDeck = container.querySelector('#vr-upload-deck');
    this.dropzone = container.querySelector('#vr-dropzone');
    this.fileInput = container.querySelector('#vr-file-input');
    this.presetBtns = container.querySelectorAll('.vr-preset-btn');

    // Controls & Settings
    this.deviceSelect = container.querySelector('#vr-device-select');
    this.refreshDevicesBtn = container.querySelector('#vr-refresh-devices-btn');
    this.micGain = container.querySelector('#vr-mic-gain');
    this.gainVal = container.querySelector('#vr-gain-val');
    this.monitorToggle = container.querySelector('#vr-monitor-toggle');
    this.noiseSuppression = container.querySelector('#vr-noise-suppression');
    this.echoCancel = container.querySelector('#vr-echo-cancel');
    this.autoGain = container.querySelector('#vr-auto-gain');
    this.channelSelect = container.querySelector('#vr-channel-select');
    this.visModeSelect = container.querySelector('#vr-vis-mode-select');

    // HEAVY PROCESS & PERFORMANCE CONTROLS
    this.cpuBadge = container.querySelector('#vr-cpu-badge');
    this.modeRawBtn = container.querySelector('#vr-mode-raw-btn');
    this.modeFilterBtn = container.querySelector('#vr-mode-filter-btn');
    this.audioModeDesc = container.querySelector('#vr-audio-mode-desc');
    this.sttToggle = container.querySelector('#vr-stt-toggle');
    this.sttStatusPill = container.querySelector('#vr-stt-status-pill');

    // LIVE VOICE TESTER & SOUNDCHECK CONTROLS
    this.connectBanner = container.querySelector('#vr-connect-banner');
    this.connectTitle = container.querySelector('#vr-connect-title');
    this.connectSubtitle = container.querySelector('#vr-connect-subtitle');
    this.heroConnectBtn = container.querySelector('#vr-hero-connect-btn');
    this.autoFindMicBtn = container.querySelector('#vr-autofind-mic-btn');
    this.quickPillsContainer = container.querySelector('#vr-quick-device-pills');
    this.testMicBtn = container.querySelector('#vr-test-mic-btn');
    this.testMicLabel = container.querySelector('#vr-test-mic-label');
    this.loopbackBtn = container.querySelector('#vr-loopback-btn');
    this.loopbackLabel = container.querySelector('#vr-loopback-label');
    this.testStateBadge = container.querySelector('#vr-test-state-badge');
    this.testStatusBox = container.querySelector('#vr-test-status-box');
    this.testIcon = container.querySelector('#vr-test-icon');
    this.testMsg = container.querySelector('#vr-test-msg');
    this.dbText = container.querySelector('#vr-db-text');

    // Action buttons & display
    this.recordBtn = container.querySelector('#vr-record-btn');
    this.pauseBtn = container.querySelector('#vr-pause-btn');
    this.stopBtn = container.querySelector('#vr-stop-btn');
    this.timerDisplay = container.querySelector('#vr-timer-display');
    this.statusPill = container.querySelector('#vr-status-pill');
    this.statusText = container.querySelector('#vr-status-text');
    this.visCanvas = container.querySelector('#vr-vis-canvas');
    this.canvasContainer = container.querySelector('#vr-canvas-container');
    this.visHud = container.querySelector('#vr-vis-hud');
    this.hudText = container.querySelector('#vr-hud-text');
    this.toggleViewBtn = container.querySelector('#vr-toggle-view-btn');
    this.levelBar = container.querySelector('#vr-level-bar');
    this.levelText = container.querySelector('#vr-level-text');
    this.clipBadge = container.querySelector('#vr-clip-badge');

    // Speech-to-text
    this.sttLangSelect = container.querySelector('#vr-stt-lang');
    this.sttContainer = container.querySelector('#vr-stt-container');
    this.sttOutput = container.querySelector('#vr-stt-output');
    this.copySttBtn = container.querySelector('#vr-copy-stt-btn');
    this.downloadTxtBtn = container.querySelector('#vr-download-txt-btn');
    this.downloadSrtBtn = container.querySelector('#vr-download-srt-btn');

    // Playback & Studio Trimmer Deck
    this.playbackSection = container.querySelector('#vr-playback-section');
    this.audioPlayer = container.querySelector('#vr-audio-player');
    this.speedPills = container.querySelectorAll('.vr-speed-pill');
    this.trimStartInput = container.querySelector('#vr-trim-start');
    this.trimEndInput = container.querySelector('#vr-trim-end');
    this.trimRangeLabel = container.querySelector('#vr-trim-range-label');
    this.setABtn = container.querySelector('#vr-set-a-btn');
    this.setBBtn = container.querySelector('#vr-set-b-btn');
    this.previewTrimBtn = container.querySelector('#vr-preview-trim-btn');
    this.applyTrimBtn = container.querySelector('#vr-apply-trim-btn');
    this.resetTrimBtn = container.querySelector('#vr-reset-trim-btn');

    // DSP Effects
    this.normalizeBtn = container.querySelector('#vr-normalize-btn');
    this.fadeInBtn = container.querySelector('#vr-fade-in-btn');
    this.fadeOutBtn = container.querySelector('#vr-fade-out-btn');
    this.eqPresetSelect = container.querySelector('#vr-eq-preset-select');
    this.applyEqBtn = container.querySelector('#vr-apply-eq-btn');

    // Export Buttons
    this.downloadWavBtn = container.querySelector('#vr-download-wav-btn');
    this.downloadWebmBtn = container.querySelector('#vr-download-webm-btn');
    this.downloadPngBtn = container.querySelector('#vr-download-png-btn');
    this.filenameInput = container.querySelector('#vr-filename-input');
    this.newRecordingBtn = container.querySelector('#vr-new-recording-btn');
    this.durationBadge = container.querySelector('#vr-duration-badge');
    this.specsInfo = container.querySelector('#vr-specs-info');
    this.settings = container.querySelector('#vr-settings');

    // Canvas 2D context
    this.canvasCtx = this.visCanvas.getContext('2d');

    // Setup High-DPI canvas syncing
    this.setupCanvasDPI();

    // Default to Audacity Raw Mic Mode
    this.setAudioMode("raw");

    // Attach Event Listeners
    this.attachEventListeners();

    // Start live visualizer animation engine immediately!
    this.startContinuousVisualizerLoop();

    // Listen for hardware audio device changes (hotplugging USB mics, connecting Bluetooth earbuds)
    this._onDeviceChange = () => {
      this.loadAudioInputDevices(false);
    };
    if (navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
      navigator.mediaDevices.addEventListener('devicechange', this._onDeviceChange);
    }

    // Initial device scan and permission auto-start check
    this.loadAudioInputDevices().then(() => {
      this.checkMicPermissionAndAutoStart();
    });
  },

  initVisualizerCache() {
    // Pre-calculate Neon Palette (56 colors) once
    const bars = 56;
    this.neonPalette = [];
    for (let i = 0; i < bars; i++) {
      const hue = Math.floor((i / bars) * 280 + 120);
      this.neonPalette.push(`hsl(${hue}, 100%, 55%)`);
    }

    // Pre-allocate 3D Wireframe coordinate arrays
    const totalPts = this.gridRows * (this.gridCols + 1);
    this.gridPtsX = new Float32Array(totalPts);
    this.gridPtsY = new Float32Array(totalPts);

    // Pre-calculate Ribbon Wave parameters to eliminate per-frame object allocation
    this.ribbonWaves = [
      { color: 'rgba(0, 242, 254, 0.7)', speed: 0.003, freq: 0.02, amp: 28 },
      { color: 'rgba(168, 85, 247, 0.6)', speed: 0.004, freq: 0.015, amp: 35 },
      { color: 'rgba(16, 185, 129, 0.5)', speed: 0.002, freq: 0.025, amp: 22 }
    ];
  },

  setupCanvasDPI() {
    if (!this.visCanvas) return;
    const sync = () => {
      if (!this.visCanvas) return;
      const rect = this.visCanvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor((rect.width || 650) * dpr);
      const h = Math.floor((rect.height || 230) * dpr);
      if (w > 0 && h > 0 && (this.visCanvas.width !== w || this.visCanvas.height !== h)) {
        this.visCanvas.width = w;
        this.visCanvas.height = h;
        this.barGradient = null;
        this._cachedBgGrad = null;
        this._cachedHorizonGrad = null;
      }
    };

    if (window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => sync());
      this.resizeObserver.observe(this.visCanvas);
    }
    sync();
  },

  getAudioContext() {
    if (!this.audioContext || this.audioContext.state === 'closed') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();
      this.playerSourceConnected = false;
    }
    return this.audioContext;
  },

  setAudioMode(mode) {
    this.audioMode = mode;
    if (mode === "raw") {
      this.noiseSuppression.checked = false;
      this.echoCancel.checked = false;
      this.autoGain.checked = false;
      this.modeRawBtn.style.borderColor = "var(--accent-cyan)";
      this.modeRawBtn.style.background = "rgba(0, 242, 254, 0.15)";
      this.modeRawBtn.style.color = "var(--accent-cyan)";
      this.modeFilterBtn.style.borderColor = "var(--border-color)";
      this.modeFilterBtn.style.background = "transparent";
      this.modeFilterBtn.style.color = "var(--text-main)";
      this.audioModeDesc.innerHTML = `⚡ <strong>Audacity Raw Mode</strong>: 100% direct audio with ZERO noise gating or suppression.`;
      this.audioModeDesc.style.color = "var(--accent-cyan)";
    } else {
      this.noiseSuppression.checked = true;
      this.echoCancel.checked = true;
      this.autoGain.checked = true;
      this.modeFilterBtn.style.borderColor = "#10b981";
      this.modeFilterBtn.style.background = "rgba(16, 185, 129, 0.15)";
      this.modeFilterBtn.style.color = "#10b981";
      this.modeRawBtn.style.borderColor = "var(--border-color)";
      this.modeRawBtn.style.background = "transparent";
      this.modeRawBtn.style.color = "var(--text-main)";
      this.audioModeDesc.innerHTML = `🛡️ <strong>WebRTC Filtered Mode</strong>: Software noise suppression and echo cancellation active.`;
      this.audioModeDesc.style.color = "#10b981";
    }

    this.updateLiveTrackConstraints();
    this.updateCpuFootprintBadge();
  },

  updateCpuFootprintBadge() {
    if (!this.cpuBadge) return;
    const isSttOn = this.sttToggle && this.sttToggle.checked;
    const is3DOn = this.visMode === '3d-wireframe' || this.visMode === 'ribbon';
    const isOff = this.visMode === 'off';

    if (isOff && !isSttOn) {
      this.cpuBadge.textContent = "🟢 Pure Zero-Load (<0.2% CPU)";
      this.cpuBadge.style.color = "#10b981";
      this.cpuBadge.style.background = "rgba(16, 185, 129, 0.15)";
    } else if (!isSttOn && (this.visMode === 'eco' || this.audioMode === 'raw')) {
      this.cpuBadge.textContent = "🟢 Ultralight (<1% CPU)";
      this.cpuBadge.style.color = "#10b981";
      this.cpuBadge.style.background = "rgba(16, 185, 129, 0.15)";
    } else if (isSttOn && is3DOn) {
      this.cpuBadge.textContent = "🟡 Moderate CPU (~4-6%)";
      this.cpuBadge.style.color = "#f59e0b";
      this.cpuBadge.style.background = "rgba(245, 158, 11, 0.15)";
    } else {
      this.cpuBadge.textContent = "🟢 Light CPU (<2%)";
      this.cpuBadge.style.color = "#10b981";
      this.cpuBadge.style.background = "rgba(16, 185, 129, 0.15)";
    }
  },

  attachEventListeners() {
    // Mode switcher buttons
    this.modeRawBtn.addEventListener('click', () => {
      this.setAudioMode("raw");
      this.app.showToast("Audacity Raw Mode active: Zero filters or software noise gating.", "success");
    });

    this.modeFilterBtn.addEventListener('click', () => {
      this.setAudioMode("filtered");
      this.app.showToast("WebRTC Filtered Mode active: Noise suppression & echo cancellation.", "info");
    });

    // Live Transcription Toggle (User Controlled!)
    this.sttToggle.addEventListener('change', (e) => {
      const isEnabled = e.target.checked;
      if (this.sttContainer) {
        this.sttContainer.style.display = isEnabled ? 'flex' : 'none';
      }
      if (this.sttStatusPill) {
        this.sttStatusPill.textContent = isEnabled ? "ENABLED" : "OFF (Zero CPU)";
        this.sttStatusPill.style.color = isEnabled ? "var(--accent-cyan)" : "var(--text-muted)";
      }
      if (!isEnabled && this.recognition) {
        this.stopSpeechRecognition();
      } else if (isEnabled && this.recordingState === 'recording') {
        this.startSpeechRecognition();
      }
      this.updateCpuFootprintBadge();
      this.app.showToast(isEnabled ? "Live Speech Transcription turned ON." : "Live Speech Transcription turned OFF (Zero CPU & no mic interference).", "info");
    });

    // Presets
    this.presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.applyStudioPreset(btn.dataset.preset);
      });
    });

    // Mode tabs
    this.tabMic.addEventListener('click', () => this.switchStudioTab('mic'));
    this.tabFile.addEventListener('click', () => this.switchStudioTab('file'));

    // Audio dropzone
    this.dropzone.addEventListener('click', () => this.fileInput.click());
    this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
    this.dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      this.dropzone.style.borderColor = 'var(--accent-cyan)';
      this.dropzone.style.background = 'rgba(0, 242, 254, 0.05)';
    });
    this.dropzone.addEventListener('dragleave', () => {
      this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)';
      this.dropzone.style.background = 'rgba(255, 255, 255, 0.02)';
    });
    this.dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      this.dropzone.style.borderColor = 'rgba(0, 242, 254, 0.35)';
      this.dropzone.style.background = 'rgba(255, 255, 255, 0.02)';
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        this.loadFile(e.dataTransfer.files[0]);
      }
    });

    // Hardware & Gain
    this.refreshDevicesBtn.addEventListener('click', () => this.loadAudioInputDevices(true));
    if (this.autoFindMicBtn) {
      this.autoFindMicBtn.addEventListener('click', () => this.autoDetectActiveMicrophone());
    }
    if (this.heroConnectBtn) {
      this.heroConnectBtn.addEventListener('click', () => this.toggleVoiceTest());
    }
    
    // Dynamic mic device change
    this.deviceSelect.addEventListener('change', async () => {
      const selectedName = this.deviceSelect.options[this.deviceSelect.selectedIndex]?.text || "Microphone";
      this.app.showToast(`Active Microphone: ${selectedName}`, "info");
      this.updateQuickDevicePills();

      if (this.isVoiceTesting) {
        await this.restartVoiceTest();
      }
    });

    this.micGain.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      this.gainVal.textContent = `${val}% ${val > 100 ? '(Boosted)' : val === 100 ? '(Normal)' : '(Cut)'}`;
      if (this.gainNode) {
        this.gainNode.gain.value = val / 100;
      }
      if (this.testGainNode) {
        this.testGainNode.gain.value = val / 100;
      }
    });

    this.monitorToggle.addEventListener('change', (e) => {
      const targetGain = this.isVoiceTesting ? this.testGainNode : this.gainNode;
      const ctx = this.audioContext;
      if (!targetGain || !ctx) return;
      if (e.target.checked) {
        try {
          targetGain.connect(ctx.destination);
          this.app.showToast("Headphone monitoring active. Use headphones to prevent feedback!", "info");
        } catch (err) {}
      } else {
        try {
          targetGain.disconnect(ctx.destination);
        } catch (err) {}
      }
    });

    this.noiseSuppression.addEventListener('change', () => this.updateLiveTrackConstraints());
    this.echoCancel.addEventListener('change', () => this.updateLiveTrackConstraints());
    this.autoGain.addEventListener('change', () => this.updateLiveTrackConstraints());

    // LIVE VOICE TESTER & SOUNDCHECK BUTTONS
    this.testMicBtn.addEventListener('click', () => this.toggleVoiceTest());
    this.loopbackBtn.addEventListener('click', () => this.runLoopbackSoundcheck());

    // Visualizer selection
    this.visModeSelect.addEventListener('change', (e) => {
      this.visMode = e.target.value;
      this.updateHudLabel();
      this.updateCpuFootprintBadge();
    });

    // Toggle view button (Visualizer vs Timeline)
    this.toggleViewBtn.addEventListener('click', () => {
      if (this.canvasViewMode === 'visualizer') {
        this.canvasViewMode = 'timeline';
        this.toggleViewBtn.querySelector('span').textContent = "🌐 Show Visualizer";
        this.hudText.textContent = "TIMELINE MODE • SEEK & TRIM";
      } else {
        this.canvasViewMode = 'visualizer';
        this.toggleViewBtn.querySelector('span').textContent = "📊 Show Timeline";
        this.updateHudLabel();
      }
    });

    // Recording Controls
    this.recordBtn.addEventListener('click', () => this.startRecording());
    this.pauseBtn.addEventListener('click', () => this.togglePause());
    this.stopBtn.addEventListener('click', () => this.stopRecording());

    // Audio Player Listeners for live audio reactivity during playback
    this.attachAudioPlayerEvents();

    // Playback Speed Pills
    this.speedPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const speed = parseFloat(pill.dataset.speed);
        if (this.audioPlayer) this.audioPlayer.playbackRate = speed;
        this.speedPills.forEach(p => {
          p.style.background = 'transparent';
          p.style.color = 'var(--text-main)';
        });
        pill.style.background = 'rgba(0, 242, 254, 0.2)';
        pill.style.color = 'var(--accent-cyan)';
      });
    });

    // Trimming Suite
    this.setABtn.addEventListener('click', () => {
      if (!this.audioPlayer) return;
      const t = parseFloat(this.audioPlayer.currentTime.toFixed(2));
      this.trimStartInput.value = t;
      this.updateTrimRangeLabel();
      if (this.canvasViewMode === 'timeline') this.drawCompletedWaveform(this.audioPlayer.currentTime);
    });

    this.setBBtn.addEventListener('click', () => {
      if (!this.audioPlayer) return;
      const t = parseFloat(this.audioPlayer.currentTime.toFixed(2));
      this.trimEndInput.value = t;
      this.updateTrimRangeLabel();
      if (this.canvasViewMode === 'timeline') this.drawCompletedWaveform(this.audioPlayer.currentTime);
    });

    const onTrimInputChange = () => {
      this.updateTrimRangeLabel();
      if (this.canvasViewMode === 'timeline') this.drawCompletedWaveform(this.audioPlayer ? this.audioPlayer.currentTime : 0);
    };

    this.trimStartInput.addEventListener('input', onTrimInputChange);
    this.trimStartInput.addEventListener('change', onTrimInputChange);
    this.trimEndInput.addEventListener('input', onTrimInputChange);
    this.trimEndInput.addEventListener('change', onTrimInputChange);

    this.previewTrimBtn.addEventListener('click', () => this.previewTrimmedSelection());
    this.applyTrimBtn.addEventListener('click', () => this.applyTrim());
    this.resetTrimBtn.addEventListener('click', () => this.resetTrim());

    // DSP Enhancers
    this.normalizeBtn.addEventListener('click', () => this.normalizePeakVolume());
    this.fadeInBtn.addEventListener('click', () => this.applyFade(true));
    this.fadeOutBtn.addEventListener('click', () => this.applyFade(false));
    this.applyEqBtn.addEventListener('click', () => this.applyEQFilter(this.eqPresetSelect.value));

    // Export Handlers
    this.downloadWavBtn.addEventListener('click', () => this.exportWav());
    this.downloadWebmBtn.addEventListener('click', () => this.exportWebm());
    this.downloadPngBtn.addEventListener('click', () => this.exportWaveformPNG());
    this.newRecordingBtn.addEventListener('click', () => this.resetStudio());

    // Speech-to-text exports
    this.copySttBtn.addEventListener('click', () => {
      if (!this.sttOutput.value) return;
      navigator.clipboard.writeText(this.sttOutput.value).then(() => {
        this.app.showToast("Transcription copied to clipboard!", "success");
      });
    });

    this.downloadTxtBtn.addEventListener('click', () => {
      if (!this.sttOutput.value.trim()) {
        this.app.showToast("No transcription available to download.", "warning");
        return;
      }
      this.triggerDownload(new Blob([this.sttOutput.value], { type: 'text/plain;charset=utf-8' }), `${this.getFilename()}.txt`);
    });

    this.downloadSrtBtn.addEventListener('click', () => this.exportSRT());

    // Pointer Events for 60/120 FPS buttery smooth scrubbing on desktop, mobile & tablet (Touch, Mouse, Pen)
    const seekFromEvent = (e) => {
      if (!this.currentAudioBuffer || !this.audioPlayer) return;
      const rect = this.visCanvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const targetTime = pct * this.currentAudioBuffer.duration;
      this.audioPlayer.currentTime = targetTime;
      if (this.canvasViewMode === 'timeline') {
        this.drawCompletedWaveform(targetTime);
      }
    };

    this.visCanvas.addEventListener('pointerdown', (e) => {
      if (!this.currentAudioBuffer) return;
      this.isScrubbing = true;
      try { this.visCanvas.setPointerCapture(e.pointerId); } catch (err) {}
      seekFromEvent(e);
    });

    this.visCanvas.addEventListener('pointermove', (e) => {
      if (this.isScrubbing) {
        seekFromEvent(e);
      }
    });

    const stopScrubbing = (e) => {
      if (this.isScrubbing) {
        this.isScrubbing = false;
        try { this.visCanvas.releasePointerCapture(e.pointerId); } catch (err) {}
      }
    };

    this.visCanvas.addEventListener('pointerup', stopScrubbing);
    this.visCanvas.addEventListener('pointercancel', stopScrubbing);
  },

  updateLiveTrackConstraints() {
    const stream = this.isVoiceTesting ? this.testStream : this.micStream;
    if (!stream) return;
    const track = stream.getAudioTracks()[0];
    if (track && track.applyConstraints) {
      track.applyConstraints({
        noiseSuppression: this.noiseSuppression.checked,
        echoCancellation: this.echoCancel.checked,
        autoGainControl: this.autoGain.checked
      }).catch(() => {});
    }
  },

  // ==========================================
  // LIVE VOICE TESTER & SOUNDCHECK ENGINE
  // ==========================================

  async toggleVoiceTest() {
    if (this.isVoiceTesting) {
      this.stopVoiceTest();
    } else {
      await this.startVoiceTest();
    }
  },

  async startVoiceTest() {
    if (this.recordingState === 'recording') {
      this.app.showToast("Cannot test mic while a recording session is active.", "warning");
      return;
    }

    try {
      this.silentSampleCount = 0;
      this.testStateBadge.textContent = "Connecting...";
      this.testStateBadge.style.color = "var(--accent-cyan)";
      this.testMsg.textContent = "Requesting microphone stream from browser...";
      this.testIcon.textContent = "⏳";

      const deviceId = this.deviceSelect.value;
      const channelCount = this.channelSelect.value === 'stereo' ? 2 : 1;
      
      const audioConstraints = {
        channelCount: channelCount,
        echoCancellation: this.echoCancel.checked,
        noiseSuppression: this.noiseSuppression.checked,
        autoGainControl: this.autoGain.checked
      };
      if (deviceId) {
        audioConstraints.deviceId = { exact: deviceId };
      }

      try {
        this.testStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
      } catch (err) {
        if (deviceId) {
          audioConstraints.deviceId = { ideal: deviceId };
          this.testStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
        } else {
          throw err;
        }
      }

      await this.loadAudioInputDevices(false);

      const track = this.testStream.getAudioTracks()[0];
      if (track && track.muted) {
        this.app.showToast("Warning: Microphone is muted in Windows sound settings!", "warning");
      }

      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      this.testAnalyser = ctx.createAnalyser();
      this.testAnalyser.fftSize = 512;
      this.testAnalyser.smoothingTimeConstant = 0.8;

      this.testSourceNode = ctx.createMediaStreamSource(this.testStream);
      this.testGainNode = ctx.createGain();
      this.testGainNode.gain.value = parseInt(this.micGain.value, 10) / 100;

      // Safe silent sink connected to destination so Chrome audio graph continuously pulls samples
      if (!this.muteSinkNode) {
        this.muteSinkNode = ctx.createGain();
        this.muteSinkNode.gain.value = 0;
        this.muteSinkNode.connect(ctx.destination);
      }

      this.testSourceNode.connect(this.testGainNode);
      this.testGainNode.connect(this.testAnalyser);
      this.testAnalyser.connect(this.muteSinkNode);
      this.testGainNode.connect(this.muteSinkNode);

      if (this.monitorToggle.checked) {
        try { this.testGainNode.connect(ctx.destination); } catch(e) {}
      }

      this.isVoiceTesting = true;
      this.testMicLabel.textContent = "Stop Voice Test";
      this.testMicBtn.style.background = "rgba(0, 242, 254, 0.15)";
      this.testMicBtn.style.borderColor = "var(--accent-cyan)";
      this.testStateBadge.textContent = "TESTING LIVE";
      this.testStateBadge.style.color = "#10b981";
      this.testStateBadge.style.background = "rgba(16, 185, 129, 0.15)";
      
      const trackLabel = track ? track.label : "Microphone";
      this.testMsg.textContent = `Microphone is live (${trackLabel})! Speak into your mic — watch the meter and waveform react.`;
      this.testIcon.textContent = "🟢";

      if (this.connectBanner) {
        this.connectBanner.style.background = "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(0, 242, 254, 0.12))";
        this.connectBanner.style.borderColor = "#10b981";
        if (this.connectTitle) {
          this.connectTitle.textContent = `🟢 Connected & Listening: ${trackLabel}`;
          this.connectTitle.style.color = "#10b981";
        }
        if (this.connectSubtitle) {
          this.connectSubtitle.textContent = "Live microphone audio stream is active. Speak into your mic to test levels.";
        }
        if (this.heroConnectBtn) {
          this.heroConnectBtn.innerHTML = "<span>🛑 Stop Test</span>";
          this.heroConnectBtn.className = "tool-btn secondary";
        }
      }

      this.updateHudLabel();
      this.updateQuickDevicePills();
      this.app.showToast("Voice Test Started! Say 'Testing 1, 2, 3' to test your mic.", "info");

      console.log("%c[Voice Studio] 🎙️ Microphone connected & listening live:", "color: #10b981; font-weight: bold;", {
        device: trackLabel,
        channelCount,
        sampleRate: ctx.sampleRate,
        audioMode: this.audioMode
      });

    } catch (err) {
      console.error("[Voice Studio] Voice test microphone access error:", err);
      this.stopVoiceTest();
      this.testStateBadge.textContent = "ERROR";
      this.testStateBadge.style.color = "#ef4444";
      this.testIcon.textContent = "🔴";
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        this.testMsg.textContent = "Microphone permission blocked! Click the lock/tune icon in browser address bar to allow mic access.";
        this.app.showToast("Microphone permission blocked by browser.", "error");
        if (this.connectBanner && this.connectTitle) {
          this.connectBanner.style.borderColor = "#ef4444";
          this.connectBanner.style.background = "rgba(239, 68, 68, 0.1)";
          this.connectTitle.textContent = "⚠️ Microphone Blocked in Browser";
          this.connectTitle.style.color = "#ef4444";
          if (this.connectSubtitle) {
            this.connectSubtitle.textContent = "Click the tune/lock icon in address bar to Allow microphone access, then refresh.";
          }
        }
      } else {
        this.testMsg.textContent = `Mic error: ${err.message}. If Audacity has an exclusive WASAPI lock, switch Audacity to MME/DirectSound.`;
        this.app.showToast(`Microphone error: ${err.message}`, "error");
      }
    }
  },

  async restartVoiceTest() {
    this.stopVoiceTest();
    await this.startVoiceTest();
  },

  stopVoiceTest() {
    this.isVoiceTesting = false;
    this.silentSampleCount = 0;
    if (this.testStream) {
      this.testStream.getTracks().forEach(t => t.stop());
      this.testStream = null;
    }
    if (this.testSourceNode) {
      try { this.testSourceNode.disconnect(); } catch (e) {}
      this.testSourceNode = null;
    }
    if (this.testGainNode) {
      try { this.testGainNode.disconnect(); } catch (e) {}
      this.testGainNode = null;
    }
    this.testAnalyser = null;

    if (this.testMicLabel) this.testMicLabel.textContent = "Start Live Voice Test";
    if (this.testMicBtn) {
      this.testMicBtn.style.background = "transparent";
      this.testMicBtn.style.borderColor = "var(--accent-cyan)";
    }
    if (this.testStateBadge) {
      this.testStateBadge.textContent = "Standby";
      this.testStateBadge.style.color = "var(--text-muted)";
      this.testStateBadge.style.background = "rgba(255, 255, 255, 0.05)";
    }
    if (this.testMsg) {
      this.testMsg.textContent = "Voice test stopped. Click 'Start Live Voice Test' or 'Connect' to check mic again.";
    }
    if (this.testIcon) this.testIcon.textContent = "⚪";

    if (this.connectBanner) {
      this.connectBanner.style.background = "linear-gradient(135deg, rgba(0, 242, 254, 0.08), rgba(16, 185, 129, 0.08))";
      this.connectBanner.style.borderColor = "var(--accent-cyan)";
      if (this.connectTitle) {
        this.connectTitle.textContent = "Microphone Standby / Not Listening";
        this.connectTitle.style.color = "var(--text-main)";
      }
      if (this.connectSubtitle) {
        this.connectSubtitle.textContent = "Click to allow browser microphone access and activate live soundcheck.";
      }
      if (this.heroConnectBtn) {
        this.heroConnectBtn.innerHTML = "<span>⚡ Connect &amp; Listen Live</span>";
        this.heroConnectBtn.className = "tool-btn primary";
      }
    }

    if (this.levelBar) this.levelBar.style.width = '0%';
    if (this.levelText) this.levelText.textContent = '0%';
    if (this.dbText) this.dbText.textContent = '-∞ dB';
    if (this.clipBadge) this.clipBadge.style.display = 'none';

    this.updateHudLabel();
    console.log("[Voice Studio] Voice test stopped.");
  },

  updateVoiceTestDiagnostics(peakRatio) {
    if (!this.testMsg || !this.isVoiceTesting) return;

    const now = performance.now();
    if (now - this._lastDiagTime < 100) return;
    this._lastDiagTime = now;

    let newIcon = "🟡";
    let newMsg = "";

    if (peakRatio >= 0.95) {
      newIcon = "🔴";
      newMsg = "Audio is clipping! Lower 'Mic Gain Boost' or move back slightly to prevent distortion.";
    } else if (peakRatio >= 0.15) {
      this.silentSampleCount = 0;
      newIcon = "🟢";
      newMsg = "Voice detected! Your microphone is working and hearing you cleanly.";
    } else if (peakRatio >= 0.04) {
      this.silentSampleCount = 0;
      newIcon = "🟢";
      newMsg = "Sound signal detected. Audio is active.";
    } else {
      this.silentSampleCount++;
      // If quiet for ~3 seconds (30 checks at 100ms)
      if (this.silentSampleCount > 30) {
        newIcon = "🟡";
        const activeName = this.deviceSelect.options[this.deviceSelect.selectedIndex]?.text || "Microphone";
        const otherDevices = (this.cachedAudioDevices || []).filter(d => d.deviceId && d.deviceId !== this.deviceSelect.value);
        let deviceHint = '';
        if (otherDevices.length > 0) {
          const names = otherDevices.map(d => d.label).filter(Boolean);
          if (names.length > 0) {
            deviceHint = ` (Also detected: ${names.join(', ')})`;
          }
        }
        newMsg = `⚠️ Low / no sound detected on <strong>${activeName}</strong>. If speaking into another mic, click <strong>"🔍 Auto-Find Active Mic"</strong> or switch device below!${deviceHint}`;
      } else {
        newIcon = "🟡";
        newMsg = "Listening... Say 'Testing 1, 2, 3' into your mic.";
      }
    }

    if (newIcon !== this._lastDiagIcon) {
      this._lastDiagIcon = newIcon;
      if (this.testIcon) this.testIcon.textContent = newIcon;
    }
    if (newMsg !== this._lastDiagMsg) {
      this._lastDiagMsg = newMsg;
      if (this.testMsg) {
        if (newMsg.includes('<strong>')) {
          this.testMsg.innerHTML = newMsg;
        } else {
          this.testMsg.textContent = newMsg;
        }
      }
    }
  },

  async checkMicPermissionAndAutoStart() {
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const perm = await navigator.permissions.query({ name: 'microphone' });
        console.log("[Voice Studio] Browser microphone permission state:", perm.state);

        const applyState = (state) => {
          if (state === 'granted') {
            this.loadAudioInputDevices(false);
            if (this.connectBanner && this.connectTitle && !this.isVoiceTesting) {
              this.connectBanner.style.borderColor = "#10b981";
              this.connectBanner.style.background = "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(0, 242, 254, 0.12))";
              this.connectTitle.textContent = "🟢 Microphone Ready (Permission Granted)";
              this.connectTitle.style.color = "#10b981";
              if (this.connectSubtitle) {
                this.connectSubtitle.textContent = "Microphone is authorized. Click below to start live soundcheck or record.";
              }
              if (this.heroConnectBtn) {
                this.heroConnectBtn.innerHTML = "<span>⚡ Start Live Soundcheck</span>";
                this.heroConnectBtn.className = "tool-btn primary";
              }
            }
          } else if (state === 'denied') {
            if (this.connectBanner && this.connectTitle) {
              this.connectBanner.style.borderColor = "#ef4444";
              this.connectBanner.style.background = "rgba(239, 68, 68, 0.1)";
              this.connectTitle.textContent = "⚠️ Microphone Blocked in Browser";
              this.connectTitle.style.color = "#ef4444";
              if (this.connectSubtitle) {
                this.connectSubtitle.textContent = "Click the tune/lock icon in address bar to Allow microphone access, then refresh.";
              }
              if (this.heroConnectBtn) this.heroConnectBtn.style.display = 'none';
            }
          }
        };

        applyState(perm.state);
        perm.onchange = () => applyState(perm.state);
      }
    } catch (e) {
      console.warn("[Voice Studio] Permissions API notice:", e.message);
    }
  },

  updateQuickDevicePills() {
    const pillsContainer = this.container ? this.container.querySelector('#vr-quick-device-pills') : null;
    if (!pillsContainer || !this.cachedAudioDevices || this.cachedAudioDevices.length <= 1) {
      if (pillsContainer) pillsContainer.innerHTML = '';
      return;
    }

    pillsContainer.innerHTML = '';
    const currentVal = this.deviceSelect.value;

    this.cachedAudioDevices.forEach((dev) => {
      const isSelected = dev.deviceId === currentVal || (!currentVal && dev.deviceId === '');
      const isBluetooth = /buds|bluetooth|wireless|hands-free|headset|bth/i.test(dev.label);
      const isLaptop = /realtek|internal|array|built-in/i.test(dev.label);
      const icon = isBluetooth ? '🎧' : isLaptop ? '💻' : '🎙️';
      
      let shortLabel = dev.label || 'Microphone';
      if (shortLabel.length > 25) {
        shortLabel = shortLabel.replace(/\([^\)]+\)/g, '').trim();
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tool-btn secondary ${isSelected ? 'active' : ''}`;
      btn.style.fontSize = '10px';
      btn.style.padding = '3px 8px';
      btn.style.height = '24px';
      btn.style.display = 'inline-flex';
      btn.style.alignItems = 'center';
      btn.style.gap = '4px';
      if (isSelected) {
        btn.style.borderColor = 'var(--accent-cyan)';
        btn.style.background = 'rgba(0, 242, 254, 0.15)';
        btn.style.color = 'var(--accent-cyan)';
        btn.style.fontWeight = '700';
      }
      btn.innerHTML = `<span>${icon}</span> <span>${shortLabel}</span>${isSelected ? ' ✓' : ''}`;
      
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        this.deviceSelect.value = dev.deviceId;
        this.updateQuickDevicePills();
        this.app.showToast(`Switched to: ${dev.label}`, "info");
        if (this.isVoiceTesting) {
          await this.restartVoiceTest();
        }
      });

      pillsContainer.appendChild(btn);
    });
  },

  async autoDetectActiveMicrophone() {
    if (this.recordingState === 'recording') {
      this.app.showToast("Cannot auto-detect while recording.", "warning");
      return;
    }

    try {
      this.app.showToast("Scanning all microphones... Please say 'Testing, testing' now!", "info");
      this.testStateBadge.textContent = "Scanning Mics...";
      this.testMsg.textContent = "Testing each microphone input to find which one hears your voice... Speak now!";
      this.testIcon.textContent = "🔍";

      // 1. Ensure permission
      const initialStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      initialStream.getTracks().forEach(t => t.stop());

      // 2. Enumerate devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(d => d.kind === 'audioinput' && d.deviceId && d.deviceId !== 'communications');

      if (audioInputs.length === 0) {
        this.app.showToast("No microphone devices found on this system.", "error");
        return;
      }

      console.log("[Voice Studio] Auto-detecting loudest microphone among:", audioInputs.map(d => d.label || d.deviceId));

      let loudestDevice = null;
      let highestPeak = -1;

      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') await ctx.resume();

      for (const dev of audioInputs) {
        try {
          const testStream = await navigator.mediaDevices.getUserMedia({
            audio: {
              deviceId: { exact: dev.deviceId },
              echoCancellation: false,
              noiseSuppression: false,
              autoGainControl: false
            }
          });

          const analyser = ctx.createAnalyser();
          analyser.fftSize = 256;
          const src = ctx.createMediaStreamSource(testStream);
          src.connect(analyser);

          const timeData = new Uint8Array(128);

          // Sample audio for 400ms
          let maxSample = 0;
          const start = performance.now();
          while (performance.now() - start < 400) {
            analyser.getByteTimeDomainData(timeData);
            for (let i = 0; i < timeData.length; i++) {
              const devVal = Math.abs(timeData[i] - 128);
              if (devVal > maxSample) maxSample = devVal;
            }
            await new Promise(r => setTimeout(r, 40));
          }

          src.disconnect();
          testStream.getTracks().forEach(t => t.stop());

          console.log(`[Voice Studio] Mic "${dev.label}": Peak level = ${maxSample}/128`);

          if (maxSample > highestPeak) {
            highestPeak = maxSample;
            loudestDevice = dev;
          }
        } catch (e) {
          console.warn(`[Voice Studio] Could not test device ${dev.label}:`, e.message);
        }
      }

      if (loudestDevice && highestPeak >= 4) {
        this.deviceSelect.value = loudestDevice.deviceId;
        this.updateQuickDevicePills();
        this.app.showToast(`🎯 Found active mic: "${loudestDevice.label}"! Switched automatically.`, "success");
        console.log(`[Voice Studio] Locked onto active mic: ${loudestDevice.label} (Peak: ${highestPeak}/128)`);
        await this.restartVoiceTest();
      } else {
        this.app.showToast("No active voice detected during scan. Please speak into your mic and try again.", "info");
        if (this.testMsg) this.testMsg.textContent = "No loud voice detected across microphones. Ensure mic is not muted in system settings.";
        if (this.testIcon) this.testIcon.textContent = "🟡";
      }
    } catch (err) {
      console.error("[Voice Studio] Auto-detect error:", err);
      this.app.showToast(`Auto-detect failed: ${err.message}`, "error");
    }
  },

  async runLoopbackSoundcheck() {
    if (this.recordingState === 'recording' || this.isLoopbackTesting) {
      return;
    }

    if (this.isVoiceTesting) {
      this.stopVoiceTest();
    }

    this.isLoopbackTesting = true;
    this.loopbackBtn.disabled = true;
    this.loopbackLabel.textContent = "Recording: 3s...";
    this.testStateBadge.textContent = "RECORDING (3s)";
    this.testStateBadge.style.color = "#ef4444";
    this.testIcon.textContent = "🔴";
    this.testMsg.textContent = "Say 'Testing 1, 2, 3' into your mic now! Capturing 3 seconds...";

    try {
      const deviceId = this.deviceSelect.value;
      const constraints = { 
        audio: {
          deviceId: deviceId ? { ideal: deviceId } : undefined,
          echoCancellation: this.echoCancel.checked,
          noiseSuppression: this.noiseSuppression.checked,
          autoGainControl: this.autoGain.checked
        }
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') await ctx.resume();
      this.testAnalyser = ctx.createAnalyser();
      this.testAnalyser.fftSize = 512;
      const srcNode = ctx.createMediaStreamSource(stream);
      srcNode.connect(this.testAnalyser);

      let mimeType = '';
      const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
      for (const t of types) {
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) {
          mimeType = t;
          break;
        }
      }

      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      recorder.start();

      let secondsLeft = 3;
      const countInterval = setInterval(() => {
        secondsLeft--;
        if (secondsLeft > 0) {
          this.loopbackLabel.textContent = `Recording: ${secondsLeft}s...`;
          this.testMsg.textContent = `Say something into your mic! ${secondsLeft}s left...`;
        } else {
          clearInterval(countInterval);
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(countInterval);
        if (recorder.state !== 'inactive') recorder.stop();
        stream.getTracks().forEach(t => t.stop());
        try { srcNode.disconnect(); } catch(e) {}
        this.testAnalyser = null;

        recorder.onstop = async () => {
          const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
          this.loopbackLabel.textContent = "🔊 Playing Back...";
          this.testStateBadge.textContent = "PLAYING BACK";
          this.testStateBadge.style.color = "var(--accent-cyan)";
          this.testIcon.textContent = "🔊";
          this.testMsg.textContent = "Playing your voice back through your speakers! You should hear your voice right now.";
          this.app.showToast("Playing back your 3s voice soundcheck...", "info");

          const onSoundcheckEnd = () => {
            this.isLoopbackTesting = false;
            this.loopbackBtn.disabled = false;
            this.loopbackLabel.textContent = "3s Loopback Soundcheck";
            this.testStateBadge.textContent = "READY";
            this.testStateBadge.style.color = "#10b981";
            this.testIcon.textContent = "✅";
            this.testMsg.textContent = "Soundcheck complete! If you heard yourself, your microphone is working perfectly!";
            this.app.showToast("Microphone verified! Your voice is hearing and recording properly.", "success");
          };

          try {
            // High-reliability Web Audio playback (bypasses mobile autoplay blocks since ctx is already active)
            const arrayBuf = await blob.arrayBuffer();
            const decodedBuffer = await ctx.decodeAudioData(arrayBuf);
            const source = ctx.createBufferSource();
            source.buffer = decodedBuffer;
            source.connect(ctx.destination);
            source.onended = onSoundcheckEnd;
            source.start(0);
          } catch (decodeErr) {
            // Graceful fallback to HTMLMediaElement Audio playback
            console.warn("[Voice Studio] Web Audio decode fallback:", decodeErr);
            const testUrl = URL.createObjectURL(blob);
            const testAudio = new Audio(testUrl);

            testAudio.play().catch(e => {
              console.warn("Playback error:", e);
              this.testMsg.textContent = "Playback blocked by browser audio policy. Click below to test again.";
            });

            testAudio.onended = () => {
              URL.revokeObjectURL(testUrl);
              onSoundcheckEnd();
            };
          }
        };
      }, 3200);

    } catch (err) {
      console.error("Loopback test error:", err);
      this.isLoopbackTesting = false;
      this.loopbackBtn.disabled = false;
      this.loopbackLabel.textContent = "3s Loopback Soundcheck";
      this.testStateBadge.textContent = "ERROR";
      this.testStateBadge.style.color = "#ef4444";
      this.testIcon.textContent = "🔴";
      this.testMsg.textContent = `Mic soundcheck failed: ${err.message}.`;
      this.app.showToast(`Soundcheck error: ${err.message}`, "error");
    }
  },

  attachAudioPlayerEvents() {
    if (!this.audioPlayer) return;

    this.audioPlayer.addEventListener('play', async () => {
      this.isPlayingAudio = true;
      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') {
        try { await ctx.resume(); } catch (e) {}
      }
      this.setupAudioPlayerVisualizer();
      this.updateHudLabel();
    });

    this.audioPlayer.addEventListener('pause', () => {
      this.isPlayingAudio = false;
      this.updateHudLabel();
    });

    this.audioPlayer.addEventListener('ended', () => {
      this.isPlayingAudio = false;
      this.updateHudLabel();
    });

    this.audioPlayer.addEventListener('timeupdate', () => {
      if (this.canvasViewMode === 'timeline' && this.currentAudioBuffer) {
        this.drawCompletedWaveform(this.audioPlayer.currentTime);
      }
    });
  },

  rebindAudioPlayer() {
    try {
      const oldPlayer = this.audioPlayer;
      const newPlayer = oldPlayer.cloneNode(true);
      oldPlayer.parentNode.replaceChild(newPlayer, oldPlayer);
      this.audioPlayer = newPlayer;
      this.playerSourceConnected = false;
      this.attachAudioPlayerEvents();

      const ctx = this.getAudioContext();
      this.playerSourceNode = ctx.createMediaElementSource(this.audioPlayer);
      this.playerSourceNode.connect(this.playerAnalyser);
      this.playerAnalyser.connect(ctx.destination);
      this.playerSourceConnected = true;
    } catch (e) {
      console.warn("Audio player rebind completed:", e.message);
    }
  },

  applyStudioPreset(presetKey) {
    if (this.container) {
      this.container.querySelectorAll('.vr-preset-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.borderColor = 'var(--border-color)';
        btn.style.background = 'transparent';
      });
      const activeBtn = this.container.querySelector(`.vr-preset-btn[data-preset="${presetKey}"]`);
      if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.style.borderColor = 'var(--accent-cyan)';
        activeBtn.style.background = 'rgba(0, 242, 254, 0.1)';
      }
    }

    if (presetKey === 'raw-mic') {
      this.setAudioMode("raw");
      this.channelSelect.value = 'mono';
      this.micGain.value = '115';
      this.gainVal.textContent = '115% (Boosted)';
      this.visModeSelect.value = '3d-wireframe';
      this.visMode = '3d-wireframe';
      this.app.showToast("Preset Applied: 🎙️ Audacity Raw (Zero Gating, Direct Mic)", "success");
    } else if (presetKey === 'podcast') {
      this.setAudioMode("filtered");
      this.channelSelect.value = 'mono';
      this.micGain.value = '115';
      this.gainVal.textContent = '115% (Boosted)';
      this.visModeSelect.value = '3d-wireframe';
      this.visMode = '3d-wireframe';
      this.eqPresetSelect.value = 'warmth';
      this.app.showToast("Preset Applied: 🎧 Podcast (Warmth EQ, Filters On)", "success");
    } else if (presetKey === 'acoustic') {
      this.setAudioMode("raw");
      this.channelSelect.value = 'stereo';
      this.micGain.value = '100';
      this.gainVal.textContent = '100% (Normal)';
      this.visModeSelect.value = 'neon';
      this.visMode = 'neon';
      this.app.showToast("Preset Applied: 🎵 Acoustic (Stereo Raw, Neon Spectrum)", "success");
    } else if (presetKey === 'eco') {
      this.setAudioMode("raw");
      this.channelSelect.value = 'mono';
      this.micGain.value = '100';
      this.gainVal.textContent = '100% (Normal)';
      this.visModeSelect.value = 'eco';
      this.visMode = 'eco';
      if (this.sttToggle.checked) {
        this.sttToggle.checked = false;
        this.sttContainer.style.display = 'none';
        this.sttStatusPill.textContent = "OFF (Zero CPU)";
      }
      this.app.showToast("Preset Applied: ⚡ Low CPU Eco Mode (<1% CPU, 0% Lag)", "success");
    } else if (presetKey === 'memo') {
      this.setAudioMode("raw");
      this.channelSelect.value = 'mono';
      this.micGain.value = '100';
      this.gainVal.textContent = '100% (Normal)';
      this.visModeSelect.value = '3d-wireframe';
      this.visMode = '3d-wireframe';
      this.app.showToast("Preset Applied: 📝 Quick Memo (Clean Mono)", "success");
    }

    if (this.gainNode) {
      this.gainNode.gain.value = parseInt(this.micGain.value, 10) / 100;
    }
    if (this.testGainNode) {
      this.testGainNode.gain.value = parseInt(this.micGain.value, 10) / 100;
    }

    this.updateHudLabel();
    this.updateCpuFootprintBadge();
  },

  updateHudLabel() {
    if (!this.hudText) return;
    const modeName = this.visModeSelect ? this.visModeSelect.options[this.visModeSelect.selectedIndex].text : "3D Wireframe";
    if (this.recordingState === 'recording') {
      this.hudText.textContent = `REC LIVE • ${modeName.toUpperCase()}`;
    } else if (this.isVoiceTesting) {
      this.hudText.textContent = `VOICE TEST ACTIVE • ${modeName.toUpperCase()}`;
    } else if (this.isPlayingAudio) {
      this.hudText.textContent = `PLAYING • ${modeName.toUpperCase()}`;
    } else {
      this.hudText.textContent = `STANDBY • ${modeName.toUpperCase()}`;
    }
  },

  switchStudioTab(tab) {
    this.activeStudioTab = tab;
    if (tab === 'mic') {
      this.tabMic.classList.add('active');
      this.tabFile.classList.remove('active');
      this.micDeck.style.display = 'flex';
      this.uploadDeck.style.display = 'none';
    } else {
      if (this.isVoiceTesting) {
        this.stopVoiceTest();
      }
      this.tabFile.classList.add('active');
      this.tabMic.classList.remove('active');
      this.uploadDeck.style.display = 'flex';
      this.micDeck.style.display = 'none';
    }
  },

  async loadAudioInputDevices(triggerPermission = false) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    try {
      if (triggerPermission) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(t => t.stop());
      }
      const rawDevices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = rawDevices.filter(d => d.kind === 'audioinput');
      
      const hasNamedDevices = audioInputs.some(d => d.label && d.deviceId !== 'default' && d.deviceId !== 'communications');
      const filtered = hasNamedDevices 
        ? audioInputs.filter(d => d.deviceId !== 'communications')
        : audioInputs;

      this.cachedAudioDevices = filtered;

      const currentVal = this.deviceSelect.value;
      this.deviceSelect.innerHTML = `<option value="">Default System Microphone</option>`;
      
      filtered.forEach((dev, idx) => {
        if (dev.deviceId === 'default') return;
        const label = dev.label || `Microphone ${idx + 1} (${dev.deviceId.slice(0, 8)}...)`;
        const opt = document.createElement('option');
        opt.value = dev.deviceId;
        opt.textContent = label;
        if (dev.deviceId === currentVal) opt.selected = true;
        this.deviceSelect.appendChild(opt);
      });

      this.updateQuickDevicePills();

      if (triggerPermission) {
        this.app.showToast(`Found ${filtered.length} microphone device(s).`, "success");
      }
    } catch (err) {
      console.warn("[Voice Studio] Audio input device scanning notice:", err);
    }
  },

  setupAudioPlayerVisualizer() {
    if (this.playerSourceConnected || !this.audioPlayer) return;
    try {
      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      if (!this.playerAnalyser) {
        this.playerAnalyser = ctx.createAnalyser();
        this.playerAnalyser.fftSize = 512;
        this.playerAnalyser.smoothingTimeConstant = 0.8;
      }

      try {
        this.playerSourceNode = ctx.createMediaElementSource(this.audioPlayer);
        this.playerSourceNode.connect(this.playerAnalyser);
        this.playerAnalyser.connect(ctx.destination);
        this.playerSourceConnected = true;
      } catch (err) {
        this.rebindAudioPlayer();
      }
    } catch (e) {
      console.warn("MediaElementSource hook notice:", e);
    }
  },

  async startRecording() {
    // If voice test is active, stop it cleanly first
    if (this.isVoiceTesting) {
      this.stopVoiceTest();
    }

    try {
      this.recordedChunks = [];
      this.audioChunksBuffer = [];
      this.elapsedSeconds = 0;
      this.updateTimerDisplay();

      const channelCount = this.channelSelect.value === 'stereo' ? 2 : 1;
      const deviceId = this.deviceSelect.value;

      const audioConstraints = {
        channelCount: channelCount,
        echoCancellation: this.echoCancel.checked,
        noiseSuppression: this.noiseSuppression.checked,
        autoGainControl: this.autoGain.checked
      };
      if (deviceId) {
        audioConstraints.deviceId = { exact: deviceId };
      }

      // 1. Get User Media Stream
      try {
        this.micStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
      } catch (err) {
        if (deviceId) {
          audioConstraints.deviceId = { ideal: deviceId };
          this.micStream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
        } else {
          throw err;
        }
      }
      this.loadAudioInputDevices(false);

      // 2. Set up Web Audio API Context & Gain Node
      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.8;

      this.sourceNode = ctx.createMediaStreamSource(this.micStream);
      this.gainNode = ctx.createGain();
      this.gainNode.gain.value = parseInt(this.micGain.value, 10) / 100;

      // Safe silent sink to keep ScriptProcessor running without speaker audio howling
      if (!this.muteSinkNode) {
        this.muteSinkNode = ctx.createGain();
        this.muteSinkNode.gain.value = 0;
        this.muteSinkNode.connect(ctx.destination);
      }

      this.sourceNode.connect(this.gainNode);
      this.gainNode.connect(this.analyser);
      this.analyser.connect(this.muteSinkNode);

      // Pass-through live monitor if checked
      if (this.monitorToggle.checked) {
        try { this.gainNode.connect(ctx.destination); } catch(e) {}
      }

      // Lossless raw PCM collector via ScriptProcessor
      const bufferSize = 4096;
      this.scriptProcessor = ctx.createScriptProcessor(bufferSize, channelCount, channelCount);
      this.scriptProcessor.onaudioprocess = (e) => {
        if (this.recordingState !== 'recording') return;
        const left = e.inputBuffer.getChannelData(0);
        const leftCopy = new Float32Array(left);
        let rightCopy = null;
        if (channelCount === 2) {
          const right = e.inputBuffer.getChannelData(1);
          rightCopy = new Float32Array(right);
        }
        this.audioChunksBuffer.push({ left: leftCopy, right: rightCopy });
      };
      this.gainNode.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.muteSinkNode);

      console.log("%c[Voice Studio] 🔴 Recording started:", "color: #ef4444; font-weight: bold;", {
        device: this.micStream.getAudioTracks()[0]?.label || "Default",
        sampleRate: ctx.sampleRate,
        channelCount,
        audioMode: this.audioMode
      });

      // 3. MediaRecorder with broad browser compatibility
      let mimeType = '';
      const types = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/ogg',
        'audio/mp4',
        'audio/aac'
      ];
      for (const t of types) {
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) {
          mimeType = t;
          break;
        }
      }

      const mrOptions = mimeType ? { mimeType } : undefined;
      this.mediaRecorder = mrOptions ? new MediaRecorder(this.micStream, mrOptions) : new MediaRecorder(this.micStream);
      this.mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) this.recordedChunks.push(e.data);
      };

      this.mediaRecorder.start(500);
      this.recordingState = "recording";
      this.canvasViewMode = "visualizer";

      // 4. Speech-to-Text ONLY if user explicitly enabled it
      if (this.sttToggle.checked) {
        this.startSpeechRecognition();
      }

      // 5. Timer
      this.timerInterval = setInterval(() => {
        this.elapsedSeconds++;
        this.updateTimerDisplay();
      }, 1000);

      this.updateUIState();
      this.updateHudLabel();
      this.app.showToast("Microphone live! Recording...", "info");

    } catch (err) {
      console.error("Microphone access error:", err);
      this.app.showToast(`Unable to access microphone: ${err.message}`, "error");
      this.resetStudio();
    }
  },

  startSpeechRecognition() {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      this.app.showToast("Speech recognition is supported in Chrome, Edge, Safari & Opera. Audio recording is active!", "warning");
      return;
    }
    try {
      this.recognition = new SpeechRecognitionClass();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = this.sttLangSelect ? this.sttLangSelect.value : 'en-US';

      if (!this.transcriptSegments) {
        this.transcriptSegments = [];
      }
      let baseTranscript = (this.sttOutput && this.sttOutput.value) ? this.sttOutput.value.replace(/\[[^\]]*\]/g, '').trim() : '';
      if (baseTranscript.length > 0 && !baseTranscript.endsWith(' ')) {
        baseTranscript += ' ';
      }
      let sessionTranscript = '';
      let segmentStart = this.elapsedSeconds || 0;

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            sessionTranscript += transcript + ' ';
            const now = this.elapsedSeconds || 1;
            this.transcriptSegments.push({
              start: segmentStart,
              end: now,
              text: transcript.trim()
            });
            segmentStart = now;
          } else {
            interimTranscript += transcript;
          }
        }
        if (this.sttOutput) {
          this.sttOutput.value = baseTranscript + sessionTranscript + (interimTranscript ? `[${interimTranscript}]` : '');
          this.sttOutput.scrollTop = this.sttOutput.scrollHeight;
        }
      };

      this.recognition.onerror = (e) => {
        if (e.error !== 'no-speech' && e.error !== 'aborted') {
          console.warn("[Voice Studio] Speech recognition notice:", e.error);
        }
      };

      this.recognition.onend = () => {
        if (this.recordingState === 'recording' && this.sttToggle && this.sttToggle.checked) {
          try {
            this.recognition.start();
          } catch (e) {}
        }
      };

      this.recognition.start();
      if (this.sttContainer) this.sttContainer.style.display = 'flex';
    } catch (err) {
      console.warn("Speech recognition initialization error:", err);
    }
  },

  stopSpeechRecognition() {
    if (this.recognition) {
      this.recognition.onend = null;
      try { this.recognition.stop(); } catch(e) {}
      this.recognition = null;
    }
  },

  togglePause() {
    if (!this.mediaRecorder) return;

    if (this.recordingState === "recording") {
      this.mediaRecorder.pause();
      if (this.audioContext) this.audioContext.suspend();
      if (this.recognition) {
        try { this.recognition.stop(); } catch(e) {}
      }
      this.recordingState = "paused";
      clearInterval(this.timerInterval);
      this.pauseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Resume</span>
      `;
      this.statusText.textContent = "Paused";
      this.statusPill.style.color = "#f59e0b";
      this.app.showToast("Recording paused.", "info");
    } else if (this.recordingState === "paused") {
      this.mediaRecorder.resume();
      if (this.audioContext) this.audioContext.resume();
      if (this.sttToggle.checked) {
        this.startSpeechRecognition();
      }
      this.recordingState = "recording";
      this.timerInterval = setInterval(() => {
        this.elapsedSeconds++;
        this.updateTimerDisplay();
      }, 1000);
      this.pauseBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px;">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
        <span>Pause</span>
      `;
      this.statusText.textContent = "Recording";
      this.statusPill.style.color = "#ef4444";
      this.app.showToast("Recording resumed.", "info");
    }
    this.updateHudLabel();
  },

  stopRecording() {
    clearInterval(this.timerInterval);
    this.stopSpeechRecognition();
    this.recordingState = "stopped";

    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    if (this.scriptProcessor) {
      try { this.scriptProcessor.disconnect(); } catch (e) {}
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
    }

    this.levelBar.style.width = '0%';
    this.levelText.textContent = '0%';
    if (this.dbText) this.dbText.textContent = '-∞ dB';
    if (this.clipBadge) this.clipBadge.style.display = 'none';

    setTimeout(() => {
      this.processCapturedAudio();
    }, 300);

    this.updateUIState();
    this.updateHudLabel();
  },

  async processCapturedAudio() {
    const ctx = this.getAudioContext();
    const sampleRate = ctx ? ctx.sampleRate : 44100;
    const numChannels = this.channelSelect.value === 'stereo' ? 2 : 1;

    // Primary: Reconstruct from lossless PCM scriptProcessor chunks
    if (this.audioChunksBuffer.length > 0) {
      let totalSamples = 0;
      for (const chunk of this.audioChunksBuffer) {
        totalSamples += chunk.left.length;
      }

      const audioBuffer = ctx.createBuffer(numChannels, totalSamples, sampleRate);
      const leftData = audioBuffer.getChannelData(0);
      const rightData = numChannels === 2 ? audioBuffer.getChannelData(1) : null;

      let offset = 0;
      for (const chunk of this.audioChunksBuffer) {
        leftData.set(chunk.left, offset);
        if (rightData && chunk.right) {
          rightData.set(chunk.right, offset);
        }
        offset += chunk.left.length;
      }

      this.currentAudioBuffer = audioBuffer;
      this.originalAudioBuffer = audioBuffer;

      const mime = (this.mediaRecorder && this.mediaRecorder.mimeType) || 'audio/webm';
      this.recordedBlob = new Blob(this.recordedChunks, { type: mime });
      this.audioChunksBuffer = []; // Free raw sample arrays immediately to eliminate memory retention

      this.loadAudioBufferIntoStudio(audioBuffer, "Recorded Audio Memo");
      this.app.showToast("Voice memo recorded & processed successfully!", "success");
      return;
    }

    // Fallback: Decode from MediaRecorder blob
    if (this.recordedChunks.length > 0) {
      try {
        const mime = (this.mediaRecorder && this.mediaRecorder.mimeType) || 'audio/webm';
        const blob = new Blob(this.recordedChunks, { type: mime });
        this.recordedBlob = blob;
        const arrayBuf = await blob.arrayBuffer();
        const decoded = await ctx.decodeAudioData(arrayBuf);
        this.currentAudioBuffer = decoded;
        this.originalAudioBuffer = decoded;
        this.loadAudioBufferIntoStudio(decoded, "Recorded Audio Memo");
        this.app.showToast("Voice memo recovered & processed successfully!", "success");
        return;
      } catch (e) {
        console.error("Audio fallback decode error:", e);
      }
    }

    this.app.showToast("No audio samples captured.", "warning");
  },

  handleFileSelect(e) {
    if (e.target.files && e.target.files.length > 0) {
      this.loadFile(e.target.files[0]);
    }
  },

  async loadFile(file) {
    if (!file || (!file.type.startsWith('audio/') && !file.type.startsWith('video/'))) {
      this.app.showToast("Please select a valid audio or video file.", "warning");
      return;
    }

    try {
      this.app.showToast(`Decoding "${file.name}" in browser...`, "info");
      const arrayBuffer = await file.arrayBuffer();

      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') await ctx.resume();

      const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
      this.currentAudioBuffer = decodedBuffer;
      this.originalAudioBuffer = decodedBuffer;
      this.recordedBlob = null;

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      this.filenameInput.value = baseName;

      this.loadAudioBufferIntoStudio(decodedBuffer, file.name);
      this.app.showToast(`Audio track loaded: ${file.name}`, "success");
    } catch (err) {
      console.error("Audio decode error:", err);
      this.app.showToast(`Failed to decode audio track: ${err.message}`, "error");
    }
  },

  computeWaveformPeaks(buffer, numBars = 120) {
    if (!buffer) return null;
    const channelData = buffer.getChannelData(0);
    const step = Math.floor(channelData.length / numBars);
    const peaks = new Float32Array(numBars);

    for (let i = 0; i < numBars; i++) {
      let maxVal = 0.05;
      const offset = i * step;
      const subStep = Math.max(1, Math.floor(step / 32));
      for (let j = 0; j < step; j += subStep) {
        const val = Math.abs(channelData[offset + j] || 0);
        if (val > maxVal) maxVal = val;
      }
      peaks[i] = maxVal;
    }

    this.waveformPeaks = peaks;
    return peaks;
  },

  loadAudioBufferIntoStudio(buffer, title = "Audio Track") {
    this.computeWaveformPeaks(buffer);
    this.updatePlaybackFromBuffer();

    // Setup trimmer default range
    this.trimStart = 0;
    this.trimEnd = parseFloat(buffer.duration.toFixed(2));
    this.trimStartInput.value = "0.0";
    this.trimEndInput.value = this.trimEnd.toString();
    this.trimEndInput.max = this.trimEnd.toString();
    this.updateTrimRangeLabel();

    this.playbackSection.style.display = 'flex';
    this.toggleViewBtn.style.display = 'inline-flex';

    const durFormatted = this.formatDuration(buffer.duration);
    this.durationBadge.textContent = `${durFormatted} • ${(buffer.duration).toFixed(1)}s`;
    this.specsInfo.textContent = `${buffer.sampleRate} Hz • 16-Bit PCM • ${buffer.numberOfChannels === 2 ? 'Stereo' : 'Mono'}`;

    this.updateHudLabel();
  },

  updatePlaybackFromBuffer() {
    if (!this.currentAudioBuffer) return;
    const wavBuffer = this.encodeWAVFromAudioBuffer(this.currentAudioBuffer);
    const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });

    if (this.recordedUrl) URL.revokeObjectURL(this.recordedUrl);
    this.recordedUrl = URL.createObjectURL(wavBlob);

    this.audioPlayer.src = this.recordedUrl;
    this.audioPlayer.load();
  },

  updateTrimRangeLabel() {
    const s = Math.max(0, parseFloat(this.trimStartInput.value) || 0);
    const total = this.currentAudioBuffer ? this.currentAudioBuffer.duration : 0;
    const e = Math.min(total, parseFloat(this.trimEndInput.value) || total);
    this.trimStart = s;
    this.trimEnd = e;
    const len = Math.max(0, e - s).toFixed(1);
    this.trimRangeLabel.textContent = `${s.toFixed(1)}s → ${e.toFixed(1)}s (${len}s selection)`;
  },

  previewTrimmedSelection() {
    if (!this.audioPlayer || !this.currentAudioBuffer) return;
    this.updateTrimRangeLabel();
    this.audioPlayer.currentTime = this.trimStart;
    this.audioPlayer.play().catch(() => {});

    if (this.previewInterval) clearInterval(this.previewInterval);
    this.previewInterval = setInterval(() => {
      if (this.audioPlayer.currentTime >= this.trimEnd || this.audioPlayer.paused) {
        this.audioPlayer.pause();
        clearInterval(this.previewInterval);
        this.previewInterval = null;
      }
    }, 50);
  },

  applyTrim() {
    if (!this.currentAudioBuffer) return;
    this.updateTrimRangeLabel();

    const startSec = this.trimStart;
    const endSec = this.trimEnd;
    const duration = this.currentAudioBuffer.duration;

    if (startSec >= endSec || endSec > duration) {
      this.app.showToast("Invalid trim boundaries. Please verify start and end times.", "warning");
      return;
    }

    const sampleRate = this.currentAudioBuffer.sampleRate;
    const numChannels = this.currentAudioBuffer.numberOfChannels;
    const startSample = Math.floor(startSec * sampleRate);
    const endSample = Math.floor(endSec * sampleRate);
    const newLength = Math.max(1, endSample - startSample);

    const ctx = this.getAudioContext();
    const trimmedBuffer = ctx.createBuffer(numChannels, newLength, sampleRate);
    for (let c = 0; c < numChannels; c++) {
      const src = this.currentAudioBuffer.getChannelData(c);
      const dst = trimmedBuffer.getChannelData(c);
      dst.set(src.subarray(startSample, endSample));
    }

    this.currentAudioBuffer = trimmedBuffer;
    this.recordedBlob = null;
    this.loadAudioBufferIntoStudio(trimmedBuffer, "Trimmed Audio");
    this.app.showToast(`Audio trimmed to ${trimmedBuffer.duration.toFixed(1)}s!`, "success");
  },

  resetTrim() {
    if (!this.originalAudioBuffer) return;
    this.currentAudioBuffer = this.originalAudioBuffer;
    this.recordedBlob = null;
    this.loadAudioBufferIntoStudio(this.originalAudioBuffer, "Original Audio");
    this.app.showToast("Reverted to original unedited recording.", "info");
  },

  normalizePeakVolume() {
    if (!this.currentAudioBuffer) return;
    const numChannels = this.currentAudioBuffer.numberOfChannels;
    let maxPeak = 0;

    for (let c = 0; c < numChannels; c++) {
      const data = this.currentAudioBuffer.getChannelData(c);
      for (let i = 0; i < data.length; i++) {
        const abs = Math.abs(data[i]);
        if (abs > maxPeak) maxPeak = abs;
      }
    }

    if (maxPeak === 0) {
      this.app.showToast("Audio is silent; cannot normalize.", "warning");
      return;
    }

    const target = 0.98; // -0.2 dB
    const multiplier = target / maxPeak;

    const ctx = this.getAudioContext();
    const normalizedBuffer = ctx.createBuffer(
      numChannels,
      this.currentAudioBuffer.length,
      this.currentAudioBuffer.sampleRate
    );

    for (let c = 0; c < numChannels; c++) {
      const src = this.currentAudioBuffer.getChannelData(c);
      const dst = normalizedBuffer.getChannelData(c);
      for (let i = 0; i < src.length; i++) {
        dst[i] = src[i] * multiplier;
      }
    }

    this.currentAudioBuffer = normalizedBuffer;
    this.recordedBlob = null;
    this.computeWaveformPeaks(normalizedBuffer);
    this.updatePlaybackFromBuffer();
    this.app.showToast(`Volume normalized to -0.2 dB peak (multiplier ${multiplier.toFixed(2)}x)!`, "success");
  },

  applyFade(isFadeIn = true) {
    if (!this.currentAudioBuffer) return;
    const buffer = this.currentAudioBuffer;
    const sampleRate = buffer.sampleRate;
    const fadeDuration = Math.min(1.5, buffer.duration / 3);
    const fadeSamples = Math.floor(fadeDuration * sampleRate);
    const numChannels = buffer.numberOfChannels;

    const ctx = this.getAudioContext();
    const fadedBuffer = ctx.createBuffer(numChannels, buffer.length, sampleRate);

    for (let c = 0; c < numChannels; c++) {
      const src = buffer.getChannelData(c);
      const dst = fadedBuffer.getChannelData(c);
      dst.set(src);

      if (isFadeIn) {
        for (let i = 0; i < fadeSamples; i++) {
          dst[i] = src[i] * (i / fadeSamples);
        }
      } else {
        const start = buffer.length - fadeSamples;
        for (let i = 0; i < fadeSamples; i++) {
          dst[start + i] = src[start + i] * (1 - i / fadeSamples);
        }
      }
    }

    this.currentAudioBuffer = fadedBuffer;
    this.recordedBlob = null;
    this.computeWaveformPeaks(fadedBuffer);
    this.updatePlaybackFromBuffer();
    this.app.showToast(`Applied 1.5s ${isFadeIn ? 'Fade In' : 'Fade Out'}!`, "success");
  },

  async applyEQFilter(preset) {
    if (!this.currentAudioBuffer) return;
    const buffer = this.currentAudioBuffer;

    try {
      const OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      const offlineCtx = new OfflineContext(buffer.numberOfChannels, buffer.length, buffer.sampleRate);

      const source = offlineCtx.createBufferSource();
      source.buffer = buffer;

      let lastNode = source;

      if (preset === 'warmth') {
        const hp = offlineCtx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 80;

        const ls = offlineCtx.createBiquadFilter();
        ls.type = 'lowshelf';
        ls.frequency.value = 150;
        ls.gain.value = 3.0;

        const hs = offlineCtx.createBiquadFilter();
        hs.type = 'highshelf';
        hs.frequency.value = 3500;
        hs.gain.value = 2.0;

        lastNode.connect(hp);
        hp.connect(ls);
        ls.connect(hs);
        lastNode = hs;
      } else if (preset === 'rumble-cut') {
        const hp = offlineCtx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 100;
        lastNode.connect(hp);
        lastNode = hp;
      } else if (preset === 'telephone') {
        const bp = offlineCtx.createBiquadFilter();
        bp.type = 'bandpass';
        bp.frequency.value = 1400;
        bp.Q.value = 1.2;
        lastNode.connect(bp);
        lastNode = bp;
      } else if (preset === 'bass-boost') {
        const ls = offlineCtx.createBiquadFilter();
        ls.type = 'lowshelf';
        ls.frequency.value = 160;
        ls.gain.value = 8.0;
        lastNode.connect(ls);
        lastNode = ls;
      }

      lastNode.connect(offlineCtx.destination);
      source.start(0);

      const renderedBuffer = await offlineCtx.startRendering();
      this.currentAudioBuffer = renderedBuffer;
      this.recordedBlob = null;
      this.computeWaveformPeaks(renderedBuffer);
      this.updatePlaybackFromBuffer();
      this.app.showToast(`Applied "${preset}" studio filter!`, "success");
    } catch (err) {
      console.error("EQ filter error:", err);
      this.app.showToast(`Filter application error: ${err.message}`, "error");
    }
  },

  // ==========================================
  // CONTINUOUS LIVE VISUALIZER ENGINE
  // ==========================================

  startContinuousVisualizerLoop() {
    if (typeof requestAnimationFrame === 'undefined') return;
    const loop = () => {
      if (this.isDestroyed) return;
      this.renderVisualizerFrame();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  },

  renderVisualizerFrame() {
    if (!this.visCanvas) return;

    // Timeline mode rendering
    if (this.canvasViewMode === 'timeline' && this.currentAudioBuffer) {
      this.drawCompletedWaveform(this.audioPlayer ? this.audioPlayer.currentTime : 0);
      return;
    }

    const time = performance.now() - this.animStartTime;
    let isIdle = true;
    let activeAnalyser = null;

    if (this.recordingState === 'recording' && this.analyser) {
      activeAnalyser = this.analyser;
      isIdle = false;
    } else if ((this.isVoiceTesting || this.isLoopbackTesting) && this.testAnalyser) {
      activeAnalyser = this.testAnalyser;
      isIdle = false;
    } else if (this.isPlayingAudio && this.playerAnalyser) {
      activeAnalyser = this.playerAnalyser;
      isIdle = false;
    }

    if (activeAnalyser) {
      activeAnalyser.getByteFrequencyData(this.freqData);
      activeAnalyser.getByteTimeDomainData(this.timeDomainData);

      // Fast Audacity-style peak sample detection in time domain (silence = 128)
      let maxPeak = 0;
      for (let i = 0; i < this.timeDomainData.length; i++) {
        const dev = Math.abs(this.timeDomainData[i] - 128);
        if (dev > maxPeak) maxPeak = dev;
      }
      const peakRatio = maxPeak / 128; // 0.0 to 1.0

      // RMS calculation for smooth energy body
      let rmsSum = 0;
      for (let i = 0; i < this.timeDomainData.length; i += 4) {
        const norm = (this.timeDomainData[i] - 128) / 128;
        rmsSum += norm * norm;
      }
      const rms = Math.sqrt(rmsSum / (this.timeDomainData.length / 4));

      // Visual punch formula combining peak and RMS
      const responsiveLevel = Math.min(1.0, peakRatio * 0.72 + rms * 0.48);

      this.updateMeter(responsiveLevel, peakRatio);

      if (this.isVoiceTesting) {
        this.updateVoiceTestDiagnostics(peakRatio);
      }
    } else {
      isIdle = true;
      if (this.levelBar) this.levelBar.style.width = '0%';
      if (this.levelText) this.levelText.textContent = '0%';
      if (this.dbText) this.dbText.textContent = '-∞ dB';
    }

    // 0% CPU Visualizer OFF Mode
    if (this.visMode === 'off') {
      this.drawVisualizerOff();
      return;
    }

    // Lightweight Eco Mode
    if (this.visMode === 'eco') {
      this.drawEcoVisualizer(this.freqData, isIdle, time);
      return;
    }

    // Render selected visualizer mode
    if (this.visMode === '3d-wireframe') {
      this.draw3DWireframe(this.freqData, isIdle, time);
    } else if (this.visMode === 'crt-oscilloscope') {
      this.drawCRTOscilloscope(this.timeDomainData, isIdle, time);
    } else if (this.visMode === 'neon') {
      this.drawNeonBars(this.freqData, isIdle, time);
    } else if (this.visMode === 'radial') {
      this.drawRadialRadar(this.freqData, isIdle, time);
    } else if (this.visMode === 'ribbon') {
      this.drawWaveRibbon(this.timeDomainData, isIdle, time);
    } else {
      this.drawSpectrumBars(this.freqData, isIdle, time);
    }
  },

  // Zero-GPU Mode: Draw clean low-overhead background without animation loops
  drawVisualizerOff() {
    const width = this.visCanvas.width;
    const height = this.visCanvas.height;
    const ctx = this.canvasCtx;

    ctx.fillStyle = '#05070c';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, width - 40, height - 40);

    ctx.fillStyle = 'rgba(0, 242, 254, 0.7)';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ VISUALIZER OFF • 0% CPU ENGINE ACTIVE', width / 2, height / 2 - 8);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '10px sans-serif';
    ctx.fillText('Pure audio pipeline running with zero graphics overhead for maximum responsiveness.', width / 2, height / 2 + 14);
    ctx.textAlign = 'left';
  },

  // Lightweight Eco 2D Spectrum
  drawEcoVisualizer(dataArray, isIdle, time) {
    const width = this.visCanvas.width;
    const height = this.visCanvas.height;
    const ctx = this.canvasCtx;

    ctx.fillStyle = '#060810';
    ctx.fillRect(0, 0, width, height);

    const bars = 24;
    const barWidth = width / bars;
    ctx.fillStyle = '#10b981';

    for (let i = 0; i < bars; i++) {
      let barHeight = 4;
      if (isIdle) {
        barHeight = Math.max(4, Math.sin(time * 0.003 + i * 0.3) * 16 + 18);
      } else if (dataArray) {
        const idx = Math.floor((i / bars) * (dataArray.length * 0.6));
        barHeight = Math.max(4, ((dataArray[idx] || 0) / 255) * (height * 0.8));
      }
      ctx.fillRect(i * barWidth + 2, height - barHeight, barWidth - 4, barHeight);
    }
  },

  // 1. 3D Cyber Wireframe Perspective Grid
  draw3DWireframe(dataArray, isIdle, time) {
    const width = this.visCanvas.width;
    const height = this.visCanvas.height;
    const ctx = this.canvasCtx;

    // Background gradient (pre-cached)
    if (!this._cachedBgGrad) {
      this._cachedBgGrad = ctx.createLinearGradient(0, 0, 0, height);
      this._cachedBgGrad.addColorStop(0, '#04060a');
      this._cachedBgGrad.addColorStop(0.38, '#090f20');
      this._cachedBgGrad.addColorStop(1, '#020306');
    }
    ctx.fillStyle = this._cachedBgGrad;
    ctx.fillRect(0, 0, width, height);

    const horizonY = height * 0.38;

    // Glowing horizon glow line (pre-cached)
    if (!this._cachedHorizonGrad) {
      this._cachedHorizonGrad = ctx.createLinearGradient(0, horizonY - 12, 0, horizonY + 12);
      this._cachedHorizonGrad.addColorStop(0, 'rgba(0, 242, 254, 0)');
      this._cachedHorizonGrad.addColorStop(0.5, 'rgba(0, 242, 254, 0.45)');
      this._cachedHorizonGrad.addColorStop(1, 'rgba(0, 242, 254, 0)');
    }
    ctx.fillStyle = this._cachedHorizonGrad;
    ctx.fillRect(0, horizonY - 12, width, 24);

    const rows = this.gridRows;
    const cols = this.gridCols;
    const stride = cols + 1;

    for (let r = 0; r < rows; r++) {
      const zProgress = r / (rows - 1);
      const depthFactor = 0.14 + zProgress * 0.86;
      const yBase = horizonY + (height - horizonY) * Math.pow(zProgress, 1.35);
      const rowOffset = r * stride;

      for (let c = 0; c <= cols; c++) {
        const xNorm = (c / cols - 0.5) * 2;
        const xProj = (width / 2) + (xNorm * (width * 0.75)) * depthFactor;

        let amp = 0;
        if (isIdle) {
          amp = Math.sin(time * 0.0035 + zProgress * 4.5 + xNorm * 3) * 14 * zProgress;
        } else if (dataArray) {
          const freqIndex = Math.floor(Math.abs(xNorm) * (dataArray.length * 0.45));
          const freqVal = dataArray[freqIndex] || 0;
          amp = (freqVal / 255) * 75 * zProgress;
        }

        const idx = rowOffset + c;
        this.gridPtsX[idx] = xProj;
        this.gridPtsY[idx] = yBase - amp;
      }
    }

    // Transversal horizontal lines - Batched in 2 depth passes
    const halfRows = Math.floor(rows / 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.35)';
    ctx.beginPath();
    for (let r = 0; r < halfRows; r++) {
      const rowOffset = r * stride;
      for (let c = 0; c <= cols; c++) {
        const idx = rowOffset + c;
        if (c === 0) ctx.moveTo(this.gridPtsX[idx], this.gridPtsY[idx]);
        else ctx.lineTo(this.gridPtsX[idx], this.gridPtsY[idx]);
      }
    }
    ctx.stroke();

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.75)';
    ctx.beginPath();
    for (let r = halfRows; r < rows; r++) {
      const rowOffset = r * stride;
      for (let c = 0; c <= cols; c++) {
        const idx = rowOffset + c;
        if (c === 0) ctx.moveTo(this.gridPtsX[idx], this.gridPtsY[idx]);
        else ctx.lineTo(this.gridPtsX[idx], this.gridPtsY[idx]);
      }
    }
    ctx.stroke();

    // Longitudinal vertical perspective lines - 1 single batched stroke
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
    ctx.beginPath();
    for (let c = 0; c <= cols; c++) {
      for (let r = 0; r < rows; r++) {
        const idx = r * stride + c;
        if (r === 0) ctx.moveTo(this.gridPtsX[idx], this.gridPtsY[idx]);
        else ctx.lineTo(this.gridPtsX[idx], this.gridPtsY[idx]);
      }
    }
    ctx.stroke();

    // Ambient floating synthwave audio stars
    ctx.fillStyle = 'rgba(0, 242, 254, 0.65)';
    for (let i = 0; i < 18; i++) {
      const px = (Math.sin(i * 137 + time * 0.0006) * 0.5 + 0.5) * width;
      const py = (Math.cos(i * 311 + time * 0.0008) * 0.5 + 0.5) * (horizonY - 14);
      const sz = (i % 3) + 1;
      ctx.fillRect(px, py, sz, sz);
    }
  },

  // 2. Phosphor Green CRT Oscilloscope (Time-Domain Waveform)
  drawCRTOscilloscope(timeData, isIdle, time) {
    const width = this.visCanvas.width;
    const height = this.visCanvas.height;
    const ctx = this.canvasCtx;

    // Dark CRT background
    ctx.fillStyle = '#030a05';
    ctx.fillRect(0, 0, width, height);

    // CRT grid lines (batched single path)
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.moveTo(x, 0); ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += 30) {
      ctx.moveTo(0, y); ctx.lineTo(width, y);
    }
    ctx.stroke();

    // Center crosshair
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
    ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0); ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Oscilloscope beam
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#10b981';
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 8;

    const points = 180;
    const slice = width / points;

    for (let i = 0; i < points; i++) {
      let y = height / 2;
      if (isIdle) {
        y += Math.sin(time * 0.005 + i * 0.08) * 18;
      } else if (timeData) {
        const idx = Math.floor((i / points) * timeData.length);
        const val = ((timeData[idx] || 128) - 128) / 128;
        y += val * (height * 0.42);
      }

      if (i === 0) ctx.moveTo(0, y);
      else ctx.lineTo(i * slice, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  },

  // 3. Frequency Spectrum Bars (Cached gradient)
  drawSpectrumBars(dataArray, isIdle, time) {
    const width = this.visCanvas.width;
    const height = this.visCanvas.height;
    const ctx = this.canvasCtx;

    ctx.fillStyle = '#07090e';
    ctx.fillRect(0, 0, width, height);

    const bars = 64;
    const barWidth = width / bars;

    if (!this.barGradient || this.lastCanvasHeight !== height) {
      this.barGradient = ctx.createLinearGradient(0, 0, 0, height);
      this.barGradient.addColorStop(0, '#00f2fe');
      this.barGradient.addColorStop(0.5, '#4facfe');
      this.barGradient.addColorStop(1, '#0072ff');
      this.lastCanvasHeight = height;
    }

    ctx.fillStyle = this.barGradient;

    for (let i = 0; i < bars; i++) {
      let barHeight = 4;
      if (isIdle) {
        barHeight = Math.max(4, Math.sin(time * 0.004 + i * 0.15) * (height * 0.25) + (height * 0.15));
      } else if (dataArray) {
        const idx = Math.floor((i / bars) * (dataArray.length * 0.7));
        barHeight = Math.max(4, ((dataArray[idx] || 0) / 255) * height * 0.85);
      }

      ctx.fillRect(i * barWidth, height - barHeight, Math.max(2, barWidth - 2), barHeight);
    }
  },

  // 4. Neon Rainbow Spectrum (Precomputed color palette)
  drawNeonBars(dataArray, isIdle, time) {
    const width = this.visCanvas.width;
    const height = this.visCanvas.height;
    const ctx = this.canvasCtx;

    ctx.fillStyle = '#05070c';
    ctx.fillRect(0, 0, width, height);

    const bars = 56;
    const barWidth = width / bars;

    for (let i = 0; i < bars; i++) {
      let barHeight = 6;
      if (isIdle) {
        barHeight = Math.max(6, Math.sin(time * 0.005 + i * 0.2) * (height * 0.3) + (height * 0.2));
      } else if (dataArray) {
        const idx = Math.floor((i / bars) * (dataArray.length * 0.7));
        barHeight = Math.max(6, ((dataArray[idx] || 0) / 255) * height * 0.88);
      }

      ctx.fillStyle = this.neonPalette[i];
      ctx.fillRect(i * barWidth, height - barHeight, Math.max(2, barWidth - 2), barHeight);
    }
  },

  // 5. Radial Radar Sonar
  drawRadialRadar(dataArray, isIdle, time) {
    const width = this.visCanvas.width;
    const height = this.visCanvas.height;
    const ctx = this.canvasCtx;

    ctx.fillStyle = '#060810';
    ctx.fillRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(cx, cy) * 0.45;
    const points = 72;

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#00f2fe';
    ctx.beginPath();

    for (let i = 0; i < points; i++) {
      let val = 0.1;
      if (isIdle) {
        val = 0.1 + (Math.sin(time * 0.004 + i * 0.25) * 0.5 + 0.5) * 0.35;
      } else if (dataArray) {
        const idx = Math.floor((i / points) * (dataArray.length * 0.7));
        val = (dataArray[idx] || 0) / 255;
      }

      const barLen = val * 52;
      const rad = (i / points) * Math.PI * 2;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);

      const x1 = cx + cos * radius;
      const y1 = cy + sin * radius;
      const x2 = cx + cos * (radius + barLen);
      const y2 = cy + sin * (radius + barLen);

      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
    }
    ctx.stroke();

    // Center pulse core
    ctx.fillStyle = 'rgba(0, 242, 254, 0.2)';
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.7, 0, Math.PI * 2);
    ctx.fill();
  },

  // 6. Fluid Sine Wave Ribbon (Time-Domain Waveform)
  drawWaveRibbon(timeData, isIdle, time) {
    const width = this.visCanvas.width;
    const height = this.visCanvas.height;
    const ctx = this.canvasCtx;

    ctx.fillStyle = '#04060d';
    ctx.fillRect(0, 0, width, height);

    const waves = this.ribbonWaves || [
      { color: 'rgba(0, 242, 254, 0.7)', speed: 0.003, freq: 0.02, amp: 28 },
      { color: 'rgba(168, 85, 247, 0.6)', speed: 0.004, freq: 0.015, amp: 35 },
      { color: 'rgba(16, 185, 129, 0.5)', speed: 0.002, freq: 0.025, amp: 22 }
    ];

    waves.forEach(w => {
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = w.color;

      for (let x = 0; x <= width; x += 6) {
        let y = height / 2;
        if (isIdle) {
          y += Math.sin(time * w.speed + x * w.freq) * w.amp;
        } else if (timeData) {
          const idx = Math.floor((x / width) * timeData.length);
          const val = ((timeData[idx] || 128) - 128) / 128;
          y += Math.sin(time * w.speed + x * w.freq) * (w.amp * 0.3) + val * height * 0.45;
        }

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
  },

  // Instantaneous 60/120 FPS timeline renderer using pre-computed peaks cache
  drawCompletedWaveform(currentTime = 0) {
    const ctx = this.canvasCtx;
    const width = this.visCanvas.width;
    const height = this.visCanvas.height;

    ctx.fillStyle = '#07090e';
    ctx.fillRect(0, 0, width, height);

    if (!this.currentAudioBuffer) return;

    const duration = this.currentAudioBuffer.duration;
    const numBars = this.waveformPeaks ? this.waveformPeaks.length : 120;
    const barWidth = width / numBars;

    // Highlight trimmed selection range
    const isFullSelection = (this.trimStart <= 0.05 && (duration - this.trimEnd) <= 0.05);
    if (!isFullSelection && (this.trimStart > 0 || this.trimEnd < duration)) {
      const selStartX = (this.trimStart / duration) * width;
      const selEndX = (this.trimEnd / duration) * width;
      ctx.fillStyle = 'rgba(0, 242, 254, 0.12)';
      ctx.fillRect(selStartX, 0, Math.max(2, selEndX - selStartX), height);

      ctx.strokeStyle = 'rgba(0, 242, 254, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(selStartX, 0); ctx.lineTo(selStartX, height);
      ctx.moveTo(selEndX, 0); ctx.lineTo(selEndX, height);
      ctx.stroke();
    }

    // Baseline center
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Fast draw cached bars
    for (let i = 0; i < numBars; i++) {
      const peakVal = this.waveformPeaks ? this.waveformPeaks[i] : 0.1;
      const barHeight = Math.max(4, peakVal * (height - 24));
      const y = (height - barHeight) / 2;
      const barX = i * barWidth;

      const barSec = (i / numBars) * duration;
      const isInsideTrim = barSec >= this.trimStart && barSec <= this.trimEnd;

      ctx.fillStyle = isInsideTrim ? '#00f2fe' : 'rgba(255, 255, 255, 0.25)';
      ctx.fillRect(barX, y, Math.max(1, barWidth - 2), barHeight);
    }

    // Draw playback position playhead
    if (duration > 0 && currentTime >= 0) {
      const playheadX = (currentTime / duration) * width;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(playheadX, 0);
      ctx.lineTo(playheadX, height);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(playheadX - 5, 0);
      ctx.lineTo(playheadX + 5, 0);
      ctx.lineTo(playheadX, 8);
      ctx.fill();
    }
  },

  updateMeter(val, rawPeak = 0) {
    const now = performance.now();
    if (now - this.lastMeterUpdateTime < 50) return;
    this.lastMeterUpdateTime = now;

    const pct = Math.min(100, Math.round(val * 100));
    if (pct !== this._lastPct) {
      this._lastPct = pct;
      if (this.levelBar) this.levelBar.style.width = `${pct}%`;
      if (this.levelText) this.levelText.textContent = `${pct}%`;
    }

    // Audacity-style Decibel computation (-60dB to 0dB)
    if (this.dbText) {
      let dbStr = '-∞ dB';
      let dbColor = 'var(--text-muted)';
      if (rawPeak > 0.005) {
        const db = Math.max(-60, Math.round(20 * Math.log10(rawPeak)));
        dbStr = `${db} dB`;
        dbColor = db > -3 ? '#ef4444' : db > -14 ? '#10b981' : 'var(--accent-cyan)';
      }
      if (dbStr !== this._lastDb) {
        this._lastDb = dbStr;
        this.dbText.textContent = dbStr;
        this.dbText.style.color = dbColor;
      }
    }

    const isClip = rawPeak >= 0.95;
    if (isClip !== this._lastClip) {
      this._lastClip = isClip;
      if (this.clipBadge) {
        this.clipBadge.style.display = isClip ? 'inline' : 'none';
      }
    }
  },

  exportWav() {
    if (!this.currentAudioBuffer) {
      this.app.showToast("No audio buffer available to convert to WAV.", "warning");
      return;
    }

    const wavBuffer = this.encodeWAVFromAudioBuffer(this.currentAudioBuffer);
    const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });
    const filename = `${this.getFilename()}.wav`;

    this.triggerDownload(wavBlob, filename);
    this.app.showToast(`Downloaded studio 16-bit WAV: ${filename}`, "success");
  },

  exportWebm() {
    if (this.recordedBlob) {
      const ext = this.recordedBlob.type.includes('mp4') ? 'mp4' : 
                  this.recordedBlob.type.includes('ogg') ? 'ogg' : 'webm';
      const filename = `${this.getFilename()}.${ext}`;
      this.triggerDownload(this.recordedBlob, filename);
      this.app.showToast(`Downloaded ${ext.toUpperCase()}: ${filename}`, "success");
    } else {
      this.exportWav();
    }
  },

  exportWaveformPNG() {
    if (!this.currentAudioBuffer) {
      this.app.showToast("No audio loaded to export waveform image.", "warning");
      return;
    }

    const buffer = this.currentAudioBuffer;
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    const bg = ctx.createLinearGradient(0, 0, 1200, 400);
    bg.addColorStop(0, '#0a0d16');
    bg.addColorStop(1, '#05070a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1200, 400);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 100; x < 1200; x += 100) {
      ctx.beginPath(); ctx.moveTo(x, 40); ctx.lineTo(x, 360); ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
    ctx.beginPath(); ctx.moveTo(40, 200); ctx.lineTo(1160, 200); ctx.stroke();

    const numBars = 160;
    const barAreaWidth = 1120;
    const barWidth = barAreaWidth / numBars;
    const startX = 40;
    const channelData = buffer.getChannelData(0);
    const step = Math.floor(channelData.length / numBars);

    for (let i = 0; i < numBars; i++) {
      let max = 0;
      const offset = i * step;
      for (let j = 0; j < step; j += 8) {
        const val = Math.abs(channelData[offset + j] || 0);
        if (val > max) max = val;
      }

      const barHeight = Math.max(4, max * 280);
      const x = startX + i * barWidth;
      const y = 200 - barHeight / 2;

      const barGrad = ctx.createLinearGradient(0, y, 0, y + barHeight);
      barGrad.addColorStop(0, '#00f2fe');
      barGrad.addColorStop(0.5, '#4facfe');
      barGrad.addColorStop(1, '#10b981');

      ctx.fillStyle = barGrad;
      ctx.fillRect(x, y, Math.max(2, barWidth - 2), barHeight);
    }

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(this.getFilename(), 40, 45);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '13px monospace';
    const durFormatted = this.formatDuration(buffer.duration);
    ctx.fillText(`${durFormatted}  |  ${buffer.sampleRate} Hz  |  ${buffer.numberOfChannels === 2 ? 'Stereo' : 'Mono'}  |  OmniTool Hub Waveform Studio`, 40, 380);

    canvas.toBlob((blob) => {
      this.triggerDownload(blob, `${this.getFilename()}_waveform.png`);
      this.app.showToast("Waveform PNG card exported!", "success");
    }, 'image/png');
  },

  exportSRT() {
    if (!this.transcriptSegments || this.transcriptSegments.length === 0) {
      if (this.sttOutput && this.sttOutput.value.trim()) {
        const text = this.sttOutput.value.trim();
        const duration = this.currentAudioBuffer ? this.currentAudioBuffer.duration : (this.elapsedSeconds || 5);
        const srtContent = `1\n00:00:00,000 --> ${this.formatSrtTime(duration)}\n${text}\n`;
        this.triggerDownload(new Blob([srtContent], { type: 'text/plain;charset=utf-8' }), `${this.getFilename()}.srt`);
        return;
      }
      this.app.showToast("No transcription available to export.", "warning");
      return;
    }

    let srt = "";
    this.transcriptSegments.forEach((seg, idx) => {
      const start = this.formatSrtTime(seg.start);
      const end = this.formatSrtTime(seg.end);
      srt += `${idx + 1}\n${start} --> ${end}\n${seg.text}\n\n`;
    });

    this.triggerDownload(new Blob([srt], { type: 'text/plain;charset=utf-8' }), `${this.getFilename()}.srt`);
    this.app.showToast("Subtitles (.srt) downloaded!", "success");
  },

  formatSrtTime(totalSec) {
    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const secs = Math.floor(totalSec % 60).toString().padStart(2, '0');
    const millis = Math.round((totalSec % 1) * 1000).toString().padStart(3, '0');
    return `${hrs}:${mins}:${secs},${millis}`;
  },

  encodeWAVFromAudioBuffer(audioBuffer) {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const totalSamples = audioBuffer.length;
    const bytesPerSample = 2;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = totalSamples * blockAlign;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    this.writeString(view, 8, 'WAVE');

    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);

    this.writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    const pcm16 = new Int16Array(buffer, 44, totalSamples * numChannels);

    if (numChannels === 1) {
      const chan0 = audioBuffer.getChannelData(0);
      for (let i = 0; i < totalSamples; i++) {
        const s = Math.max(-1, Math.min(1, chan0[i]));
        pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
      }
    } else {
      const chan0 = audioBuffer.getChannelData(0);
      const chan1 = audioBuffer.getChannelData(1);
      let idx = 0;
      for (let i = 0; i < totalSamples; i++) {
        const s0 = Math.max(-1, Math.min(1, chan0[i]));
        pcm16[idx++] = s0 < 0 ? s0 * 0x8000 : s0 * 0x7FFF;
        const s1 = Math.max(-1, Math.min(1, chan1[i]));
        pcm16[idx++] = s1 < 0 ? s1 * 0x8000 : s1 * 0x7FFF;
      }
    }

    return buffer;
  },

  writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  },

  getFilename() {
    const raw = (this.filenameInput && this.filenameInput.value ? this.filenameInput.value : "").trim();
    return (raw.replace(/[^a-zA-Z0-9_-]/g, "_") || "omnitool-audio-studio");
  },

  formatDuration(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  },

  triggerDownload(blob, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    }, 100);
  },

  resetStudio() {
    if (this.isVoiceTesting) {
      this.stopVoiceTest();
    }
    if (this.recordedUrl) {
      URL.revokeObjectURL(this.recordedUrl);
      this.recordedUrl = null;
    }
    this.recordedBlob = null;
    this.currentAudioBuffer = null;
    this.originalAudioBuffer = null;
    this.waveformPeaks = null;
    this.recordedChunks = [];
    this.audioChunksBuffer = [];
    this.transcriptSegments = [];
    if (this.sttOutput) this.sttOutput.value = '';
    this.elapsedSeconds = 0;
    this.recordingState = "idle";
    this.isPlayingAudio = false;
    this.canvasViewMode = "visualizer";
    clearInterval(this.timerInterval);
    this.stopSpeechRecognition();

    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.sourceNode) {
      try { this.sourceNode.disconnect(); } catch (e) {}
      this.sourceNode = null;
    }
    if (this.gainNode) {
      try { this.gainNode.disconnect(); } catch (e) {}
      this.gainNode = null;
    }
    if (this.analyser) {
      try { this.analyser.disconnect(); } catch (e) {}
      this.analyser = null;
    }
    if (this.scriptProcessor) {
      try { this.scriptProcessor.disconnect(); } catch (e) {}
      this.scriptProcessor = null;
    }

    this.playbackSection.style.display = 'none';
    this.toggleViewBtn.style.display = 'none';
    this.durationBadge.textContent = '';
    this.updateTimerDisplay();
    this.updateUIState();
    this.updateHudLabel();
  },

  updateTimerDisplay() {
    const hrs = Math.floor(this.elapsedSeconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((this.elapsedSeconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    this.timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
  },

  updateUIState() {
    if (this.recordingState === "idle") {
      this.recordBtn.style.display = "inline-flex";
      this.pauseBtn.style.display = "none";
      this.stopBtn.style.display = "none";
      this.statusText.textContent = "Studio Standby";
      this.statusPill.style.color = "var(--text-muted)";
      this.statusPill.querySelector('span:first-child').style.background = "#10b981";
      this.settings.style.opacity = "1";
      this.settings.style.pointerEvents = "auto";
    } else if (this.recordingState === "recording") {
      this.recordBtn.style.display = "none";
      this.pauseBtn.style.display = "inline-flex";
      this.stopBtn.style.display = "inline-flex";
      this.statusText.textContent = "Recording";
      this.statusPill.style.color = "#ef4444";
      this.statusPill.querySelector('span:first-child').style.background = "#ef4444";
      this.settings.style.opacity = "0.4";
      this.settings.style.pointerEvents = "none";
    } else if (this.recordingState === "stopped") {
      this.recordBtn.style.display = "none";
      this.pauseBtn.style.display = "none";
      this.stopBtn.style.display = "none";
      this.statusText.textContent = "Captured";
      this.statusPill.style.color = "var(--accent-cyan)";
      this.statusPill.querySelector('span:first-child').style.background = "var(--accent-cyan)";
      this.settings.style.opacity = "1";
      this.settings.style.pointerEvents = "auto";
    }
  },

  cleanup() {
    this.isDestroyed = true;
    this.stopVoiceTest();
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.sourceNode) {
      try { this.sourceNode.disconnect(); } catch (e) {}
      this.sourceNode = null;
    }
    if (this.gainNode) {
      try { this.gainNode.disconnect(); } catch (e) {}
      this.gainNode = null;
    }
    if (this.analyser) {
      try { this.analyser.disconnect(); } catch (e) {}
      this.analyser = null;
    }
    if (this.scriptProcessor) {
      try { this.scriptProcessor.disconnect(); } catch (e) {}
      this.scriptProcessor = null;
    }
    if (this.muteSinkNode) {
      try { this.muteSinkNode.disconnect(); } catch (e) {}
      this.muteSinkNode = null;
    }
    if (this.playerSourceNode) {
      try { this.playerSourceNode.disconnect(); } catch (e) {}
      this.playerSourceNode = null;
    }
    if (this.playerAnalyser) {
      try { this.playerAnalyser.disconnect(); } catch (e) {}
      this.playerAnalyser = null;
    }
    this.playerSourceConnected = false;
    if (this.audioContext) {
      try { this.audioContext.close(); } catch (e) {}
      this.audioContext = null;
    }
    if (this.recordedUrl) {
      URL.revokeObjectURL(this.recordedUrl);
      this.recordedUrl = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (navigator.mediaDevices && navigator.mediaDevices.removeEventListener && this._onDeviceChange) {
      navigator.mediaDevices.removeEventListener('devicechange', this._onDeviceChange);
      this._onDeviceChange = null;
    }
    clearInterval(this.timerInterval);
    if (this.previewInterval) clearInterval(this.previewInterval);
    if (typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(this.animationFrameId);
    this.stopSpeechRecognition();
  }
};
