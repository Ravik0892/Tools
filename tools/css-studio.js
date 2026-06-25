export default {
  id: "css-studio",
  name: "CSS Studio Suite",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration / Controls Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Configuration</h3>
            <!-- Tabs inside config panel -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 320px; margin-left: 15px;" id="css-studio-tabs">
              <button class="keyboard-tab active" data-tab="gradient" style="font-size: 11px; padding: 4px 8px;">Gradients</button>
              <button class="keyboard-tab" data-tab="shadow" style="font-size: 11px; padding: 4px 8px;">Box Shadows</button>
              <button class="keyboard-tab" data-tab="glass" style="font-size: 11px; padding: 4px 8px;">Glassmorphism</button>
              <button class="keyboard-tab" data-tab="clippath" style="font-size: 11px; padding: 4px 8px;">Clip Path</button>
            </div>
          </div>

          <!-- Tab 1: Gradient Controls -->
          <div id="panel-gradient-controls" class="tab-control-panel">
            <div class="form-row" style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px;">
              <div class="form-group">
                <label for="grad-type">Type</label>
                <select class="form-select" id="grad-type">
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                  <option value="conic">Conic</option>
                </select>
              </div>
              <div class="form-group" id="grad-angle-group">
                <label>Angle</label>
                <div class="slider-group">
                  <input type="range" id="grad-angle" class="slider-input" min="0" max="360" value="135">
                  <span class="slider-val" id="grad-angle-val">135°</span>
                </div>
              </div>
              <div class="form-group" id="grad-shape-group" style="display: none;">
                <label for="grad-shape">Shape</label>
                <select class="form-select" id="grad-shape">
                  <option value="circle">Circle</option>
                  <option value="ellipse">Ellipse</option>
                </select>
              </div>
              <div class="form-group" id="grad-position-group" style="display: none;">
                <label for="grad-position">Position</label>
                <select class="form-select" id="grad-position">
                  <option value="center">Center</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="top left">Top Left</option>
                  <option value="top right">Top Right</option>
                  <option value="bottom left">Bottom Left</option>
                  <option value="bottom right">Bottom Right</option>
                </select>
              </div>
            </div>

            <div class="form-row" style="margin-top: 6px;">
              <div class="form-group" style="flex-direction: row; align-items: center; gap: 8px;">
                <input type="checkbox" id="grad-repeating" style="width: 16px; height: 16px; cursor: pointer;">
                <label for="grad-repeating" style="margin: 0; cursor: pointer; user-select: none;">Repeating Gradient</label>
              </div>
            </div>

            <div class="form-row" style="grid-template-columns: 2fr 1fr 1fr; align-items: flex-end; gap: 8px; margin-top: 6px;">
              <div class="form-group">
                <label for="grad-harmony">Harmony Preset</label>
                <select class="form-select" id="grad-harmony">
                  <option value="none" selected>-- Select Harmony --</option>
                  <option value="analogous">Analogous</option>
                  <option value="monochromatic">Monochromatic</option>
                  <option value="complementary">Complementary</option>
                  <option value="triadic">Triadic</option>
                  <option value="pastel">Soft Pastels</option>
                  <option value="cyber">Cyberpunk</option>
                </select>
              </div>
              <div class="form-group">
                <label for="grad-harmony-stops">Stops</label>
                <select class="form-select" id="grad-harmony-stops">
                  <option value="2">2 Stops</option>
                  <option value="3" selected>3 Stops</option>
                  <option value="4">4 Stops</option>
                  <option value="5">5 Stops</option>
                </select>
              </div>
              <div style="display: flex; gap: 4px;">
                <button class="tool-btn primary" id="grad-harmony-gen-btn" style="flex: 1; height: 38px; padding: 0;" title="Generate Harmony Gradient">Gen</button>
                <button class="tool-btn secondary" id="grad-randomize-btn" style="height: 38px; padding: 0 10px;" title="Randomize Angles and Colors">🎲</button>
              </div>
            </div>

            <div class="gradient-stops-control" style="margin-top: 12px;">
              <div class="panel-header" style="padding: 0 0 8px 0; border-bottom: none; display: flex; justify-content: space-between; align-items: center;">
                <label style="margin: 0;">Color Stops</label>
                <div style="display: flex; gap: 4px;">
                  <button class="tool-btn secondary" id="grad-import-palette-btn" style="padding: 4px 8px; font-size: 11px;" title="Import from Color Lab Palette">Import Palette</button>
                  <button class="tool-btn secondary" id="grad-add-stop-btn" style="padding: 4px 8px; font-size: 11px;">+ Add Stop</button>
                </div>
              </div>
              <div id="grad-stops-container" style="display: flex; flex-direction: column; gap: 8px;">
                <!-- Dynamic stops -->
              </div>
            </div>

            <div class="form-group" style="margin-top: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <label style="margin: 0;">Presets</label>
                <button class="tool-btn secondary" id="grad-save-preset-btn" style="font-size: 10px; padding: 2px 6px;">⭐ Save Preset</button>
              </div>
              <div class="gradient-presets-grid" id="grad-presets-box" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(65px, 1fr)); gap: 8px; margin-top: 4px;">
                <!-- Dynamically loaded presets -->
              </div>
            </div>
          </div>

          <!-- Tab 2: Box Shadow Controls -->
          <div id="panel-shadow-controls" class="tab-control-panel hidden">
            <!-- Presets -->
            <div class="form-group">
              <label>Load Presets</label>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                <button class="tool-btn secondary" id="shadow-preset-soft" style="font-size: 10px; padding: 4px 8px;">Soft Ambient</button>
                <button class="tool-btn secondary" id="shadow-preset-cyber" style="font-size: 10px; padding: 4px 8px;">Cyber Floating</button>
                <button class="tool-btn secondary" id="shadow-preset-neon" style="font-size: 10px; padding: 4px 8px;">Neon Glow</button>
                <button class="tool-btn secondary" id="shadow-preset-inset" style="font-size: 10px; padding: 4px 8px;">Inner Glow</button>
              </div>
            </div>

            <!-- Shadow Layer 1 -->
            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="margin: 0; font-weight: 700; color: var(--accent-emerald);">Shadow Layer 1</label>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="checkbox" id="shadow-inset-1" style="cursor: pointer; width: 14px; height: 14px;">
                  <label for="shadow-inset-1" style="font-size: 10px; margin: 0; cursor: pointer; color: var(--text-muted);">Inset</label>
                </div>
              </div>

              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                <input type="color" id="shadow-color-1" value="#00f2fe" style="border: none; width: 34px; height: 30px; cursor: pointer; background: transparent; border-radius: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Shadow Color</span>
              </div>

              <label style="font-size: 10px; color: var(--text-muted);">Horizontal Offset</label>
              <div class="slider-group">
                <input type="range" id="shadow-h-1" class="slider-input" min="-80" max="80" value="10">
                <span class="slider-val" id="shadow-h-1-val">10px</span>
              </div>

              <label style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Vertical Offset</label>
              <div class="slider-group">
                <input type="range" id="shadow-v-1" class="slider-input" min="-80" max="80" value="10">
                <span class="slider-val" id="shadow-v-1-val">10px</span>
              </div>

              <label style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Blur Radius</label>
              <div class="slider-group">
                <input type="range" id="shadow-blur-1" class="slider-input" min="0" max="120" value="20">
                <span class="slider-val" id="shadow-blur-1-val">20px</span>
              </div>

              <label style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Spread Radius</label>
              <div class="slider-group">
                <input type="range" id="shadow-spread-1" class="slider-input" min="-30" max="50" value="0">
                <span class="slider-val" id="shadow-spread-1-val">0px</span>
              </div>

              <label style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Opacity</label>
              <div class="slider-group">
                <input type="range" id="shadow-opacity-1" class="slider-input" min="0" max="100" value="60">
                <span class="slider-val" id="shadow-opacity-1-val">60%</span>
              </div>
            </div>

            <!-- Secondary Shadow Activation Toggle -->
            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <label style="font-weight: 700; margin: 0; color: #a855f7; font-size: 12px;">Enable Shadow Layer 2</label>
                <label class="switch-container" style="position: relative; display: inline-block; width: 36px; height: 20px;">
                  <input type="checkbox" id="shadow-layer-2-enable" style="opacity: 0; width: 0; height: 0;">
                  <span class="slider-toggle-btn" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--border-color); transition: .3s; border-radius: 20px;"></span>
                </label>
              </div>
            </div>

            <!-- Shadow Layer 2 Panel -->
            <div class="form-group" id="shadow-layer-2-panel" style="display: none; border-top: 1px dashed var(--border-color); padding-top: 8px; margin-top: 4px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="margin: 0; font-weight: 700; color: #a855f7;">Shadow Layer 2</label>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <input type="checkbox" id="shadow-inset-2" style="cursor: pointer; width: 14px; height: 14px;">
                  <label for="shadow-inset-2" style="font-size: 10px; margin: 0; cursor: pointer; color: var(--text-muted);">Inset</label>
                </div>
              </div>

              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px;">
                <input type="color" id="shadow-color-2" value="#f43f5e" style="border: none; width: 34px; height: 30px; cursor: pointer; background: transparent; border-radius: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Shadow Color</span>
              </div>

              <label style="font-size: 10px; color: var(--text-muted);">Horizontal Offset</label>
              <div class="slider-group">
                <input type="range" id="shadow-h-2" class="slider-input" min="-80" max="80" value="-10">
                <span class="slider-val" id="shadow-h-2-val">-10px</span>
              </div>

              <label style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Vertical Offset</label>
              <div class="slider-group">
                <input type="range" id="shadow-v-2" class="slider-input" min="-80" max="80" value="-10">
                <span class="slider-val" id="shadow-v-2-val">-10px</span>
              </div>

              <label style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Blur Radius</label>
              <div class="slider-group">
                <input type="range" id="shadow-blur-2" class="slider-input" min="0" max="120" value="15">
                <span class="slider-val" id="shadow-blur-2-val">15px</span>
              </div>

              <label style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Spread Radius</label>
              <div class="slider-group">
                <input type="range" id="shadow-spread-2" class="slider-input" min="-30" max="50" value="0">
                <span class="slider-val" id="shadow-spread-2-val">0px</span>
              </div>

              <label style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">Opacity</label>
              <div class="slider-group">
                <input type="range" id="shadow-opacity-2" class="slider-input" min="0" max="100" value="25">
                <span class="slider-val" id="shadow-opacity-2-val">25%</span>
              </div>
            </div>

            <!-- Box Properties -->
            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px; margin-top: 8px;">
              <label style="font-weight: 700; font-size: 12px;">Box Target Properties</label>
              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 8px; margin-top: 4px;">
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <span style="font-size: 10px; color: var(--text-muted);">Box Color</span>
                  <input type="color" id="box-bg-color" value="#1e293b" style="border: none; width: 40px; height: 30px; cursor: pointer; background: transparent; border-radius: 4px;">
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <span style="font-size: 10px; color: var(--text-muted);">Border Color</span>
                  <input type="color" id="box-border-color" value="#00f2fe" style="border: none; width: 40px; height: 30px; cursor: pointer; background: transparent; border-radius: 4px;">
                </div>
                <div style="display: flex; align-items: center; gap: 4px; margin-top: 14px;">
                  <input type="checkbox" id="box-border-enable" style="cursor: pointer; width: 14px; height: 14px;">
                  <label for="box-border-enable" style="font-size: 11px; margin: 0; cursor: pointer;">Enable Border</label>
                </div>
              </div>

              <label style="font-size: 10px; color: var(--text-muted);">Border Radius</label>
              <div class="slider-group">
                <input type="range" id="box-radius" class="slider-input" min="0" max="60" value="16">
                <span class="slider-val" id="box-radius-val">16px</span>
              </div>
            </div>
          </div>

          <!-- Tab 3: Glassmorphism Controls -->
          <div id="panel-glass-controls" class="tab-control-panel hidden">
            <!-- Presets -->
            <div class="form-group">
              <label>Load Cyber Presets</label>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                <button class="tool-btn secondary" id="glass-preset-ios" style="font-size: 10px; padding: 4px 8px;">iOS Light</button>
                <button class="tool-btn secondary" id="glass-preset-cyber" style="font-size: 10px; padding: 4px 8px;">Neon Cyber</button>
                <button class="tool-btn secondary" id="glass-preset-dark" style="font-size: 10px; padding: 4px 8px;">Midnight</button>
                <button class="tool-btn secondary" id="glass-preset-neon" style="font-size: 10px; padding: 4px 8px;">Vaporwave</button>
              </div>
            </div>

            <!-- Glass Fill -->
            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <label>Glass Color & Opacity</label>
              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 6px;">
                <input type="color" id="glass-color" value="#0f172a" style="border: none; width: 34px; height: 30px; cursor: pointer; background: transparent; border-radius: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Choose backdrop tint</span>
              </div>
              <label style="font-size: 10px; margin-top: 4px;">Backdrop Opacity</label>
              <div class="slider-group">
                <input type="range" id="glass-opacity" class="slider-input" min="0" max="100" value="35">
                <span class="slider-val" id="glass-opacity-val">35%</span>
              </div>
            </div>

            <!-- Refraction Filters -->
            <div class="form-group">
              <label>Refraction Filters</label>
              <label style="font-size: 10px;">Backdrop Blur</label>
              <div class="slider-group">
                <input type="range" id="glass-blur" class="slider-input" min="0" max="30" value="12">
                <span class="slider-val" id="glass-blur-val">12px</span>
              </div>
              <label style="font-size: 10px; margin-top: 4px;">Backdrop Saturation</label>
              <div class="slider-group">
                <input type="range" id="glass-saturation" class="slider-input" min="50" max="250" value="120">
                <span class="slider-val" id="glass-saturation-val">120%</span>
              </div>
            </div>

            <!-- Borders -->
            <div class="form-group">
              <label>Borders & Corner Radius</label>
              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 6px;">
                <input type="color" id="glass-border-color" value="#ffffff" style="border: none; width: 34px; height: 30px; cursor: pointer; background: transparent; border-radius: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Border Color</span>
              </div>
              <label style="font-size: 10px;">Border Opacity</label>
              <div class="slider-group">
                <input type="range" id="glass-border-opacity" class="slider-input" min="0" max="100" value="20">
                <span class="slider-val" id="glass-border-opacity-val">20%</span>
              </div>
              <label style="font-size: 10px; margin-top: 4px;">Border Width</label>
              <div class="slider-group">
                <input type="range" id="glass-border-width" class="slider-input" min="0" max="8" value="1">
                <span class="slider-val" id="glass-border-width-val">1px</span>
              </div>
              <label style="font-size: 10px; margin-top: 4px;">Corner Radius</label>
              <div class="slider-group">
                <input type="range" id="glass-radius" class="slider-input" min="0" max="40" value="16">
                <span class="slider-val" id="glass-radius-val">16px</span>
              </div>
            </div>

            <!-- Neon Glow Box Shadow -->
            <div class="form-group">
              <label>Cyber Neon Glow (Backdrop Shadow)</label>
              <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 6px;">
                <input type="color" id="glass-glow-color" value="#00f2fe" style="border: none; width: 34px; height: 30px; cursor: pointer; background: transparent; border-radius: 4px;">
                <span style="font-size: 11px; color: var(--text-muted);">Glow/Shadow Color</span>
              </div>
              <label style="font-size: 10px;">Glow Size (Blur)</label>
              <div class="slider-group">
                <input type="range" id="glass-glow-size" class="slider-input" min="0" max="60" value="15">
                <span class="slider-val" id="glass-glow-size-val">15px</span>
              </div>
              <label style="font-size: 10px; margin-top: 4px;">Glow Intensity (Opacity)</label>
              <div class="slider-group">
                <input type="range" id="glass-glow-opacity" class="slider-input" min="0" max="100" value="30">
                <span class="slider-val" id="glass-glow-opacity-val">30%</span>
              </div>
            </div>
          </div>

          <!-- Tab 4: Clip Path Controls -->
          <div id="panel-clippath-controls" class="tab-control-panel hidden">
            <div class="form-group">
              <label for="clippath-preset">Select Shape Preset</label>
              <select class="form-select" id="clippath-preset" style="width: 100%;">
                <option value="" disabled selected hidden>-- Choose Preset Shape / Design --</option>
                <option value="triangle">Triangle</option>
                <option value="rhombus">Rhombus</option>
                <option value="pentagon">Pentagon</option>
                <option value="hexagon">Hexagon</option>
                <option value="octagon">Octagon</option>
                <option value="star">Star</option>
                <option value="chevron">Chevron</option>
                <option value="cross">Cross</option>
                <option value="message-bubble">Message Bubble</option>
                <option value="parallelogram">Parallelogram</option>
                <option value="trapezoid">Trapezoid</option>
                <option value="left-arrow">Left Arrow</option>
                <option value="right-arrow">Right Arrow</option>
                <option value="heart">Heart</option>
                <option value="star-badge">[Design] Star Badge</option>
                <option value="photo-frame">[Design] Photo Frame</option>
                <option value="donut-ring">[Design] Donut Ring</option>
                <option value="shield-cutout">[Design] Shield Cutout</option>
                <option value="gear-cog">[Design] Gear Cog</option>
                <option value="gothic-window">[Design] Gothic Window</option>
              </select>
            </div>
            
            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <label>Workarea Background</label>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                <button class="tool-btn secondary active" id="clip-bg-grid" style="font-size: 10px; padding: 4px 8px;">Grid</button>
                <button class="tool-btn secondary" id="clip-bg-gradient" style="font-size: 10px; padding: 4px 8px;">Sunset Gradient</button>
                <button class="tool-btn secondary" id="clip-bg-palette" style="font-size: 10px; padding: 4px 8px;" title="Use background gradient from Color Lab Palette">Palette Colors</button>
                <button class="tool-btn secondary" id="clip-bg-image" style="font-size: 10px; padding: 4px 8px;">Sample Image</button>
              </div>
            </div>

            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <label>Canvas Zoom</label>
              <div class="slider-group">
                <input type="range" id="clip-zoom-slider" class="slider-input" min="100" max="600" step="50" value="100">
                <span class="slider-val" id="clip-zoom-val">100%</span>
              </div>
            </div>

            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <label style="margin: 0;">Shapes</label>
                <button class="tool-btn secondary" id="clip-add-shape-btn" style="font-size: 10px; padding: 2px 6px;">+ Add Shape</button>
              </div>
              <div id="clippath-shapes-list" style="display: flex; flex-direction: column; gap: 6px; max-height: 110px; overflow-y: auto; padding-right: 4px;">
                <!-- Dynamic shape layers -->
              </div>
            </div>

            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <label>Transform Shape</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 4px;">
                <button class="tool-btn secondary" id="clip-rotate-btn" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Rotate 90 degrees clockwise">Rotate 90°</button>
                <button class="tool-btn secondary" id="clip-center-btn" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Center the shape inside canvas">Center</button>
                <button class="tool-btn secondary" id="clip-reset-btn" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Reset shape to preset defaults">Reset Shape</button>
                <button class="tool-btn secondary" id="clip-fliph-btn" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Flip horizontally">Flip Horiz</button>
                <button class="tool-btn secondary" id="clip-flipv-btn" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Flip vertically">Flip Vert</button>
                <div style="height: 1px;"></div>
                <button class="tool-btn secondary" id="clip-scaleup-btn" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Scale shape up">Scale Up</button>
                <button class="tool-btn secondary" id="clip-scaledown-btn" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Scale shape down">Scale Down</button>
              </div>
            </div>

            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <label>Translate / Shift Shape</label>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 4px;">
                <button class="tool-btn secondary" id="clip-move-left" style="font-size: 10px; padding: 4px 2px; height: auto;" title="Move shape left">← Left</button>
                <button class="tool-btn secondary" id="clip-move-up" style="font-size: 10px; padding: 4px 2px; height: auto;" title="Move shape up">↑ Up</button>
                <button class="tool-btn secondary" id="clip-move-down" style="font-size: 10px; padding: 4px 2px; height: auto;" title="Move shape down">↓ Down</button>
                <button class="tool-btn secondary" id="clip-move-right" style="font-size: 10px; padding: 4px 2px; height: auto;" title="Move shape right">→ Right</button>
              </div>
            </div>

            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <label>Align & Distribute</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 4px;">
                <button class="tool-btn secondary" id="clip-align-left" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Align active shape to left edge">Align Left</button>
                <button class="tool-btn secondary" id="clip-align-center" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Center active shape horizontally">Center H</button>
                <button class="tool-btn secondary" id="clip-align-right" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Align active shape to right edge">Align Right</button>
                <button class="tool-btn secondary" id="clip-align-top" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Align active shape to top edge">Align Top</button>
                <button class="tool-btn secondary" id="clip-align-vcenter" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Center active shape vertically">Center V</button>
                <button class="tool-btn secondary" id="clip-align-bottom" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Align active shape to bottom edge">Align Bottom</button>
                <button class="tool-btn secondary" id="clip-align-stackh" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Stack visible shapes horizontally">Stack Horiz</button>
                <button class="tool-btn secondary" id="clip-align-stackv" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Stack visible shapes vertically">Stack Vert</button>
                <button class="tool-btn secondary" id="clip-align-allcenter" style="font-size: 9px; padding: 4px 2px; height: auto;" title="Align all shapes' centers">Align Centers</button>
              </div>
            </div>

            <div class="form-group" style="border-top: 1px solid var(--border-color); padding-top: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label style="margin: 0;">Coordinates (x, y)</label>
                <div style="display: flex; gap: 4px;">
                  <button class="tool-btn secondary" id="clip-import-shape-btn" style="font-size: 10px; padding: 2px 6px;" title="Import from shared shape registry">Import Shape</button>
                  <button class="tool-btn secondary" id="clip-add-point-btn" style="font-size: 10px; padding: 2px 6px;">+ Point</button>
                </div>
              </div>
              <div id="clippath-points-list" style="display: flex; flex-direction: column; gap: 6px; max-height: 120px; overflow-y: auto; padding-right: 4px;">
                <!-- Dynamic coordinate rows -->
              </div>
            </div>
          </div>
        </div>

        <!-- Visual Preview & CSS Export Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Visual Preview</h3>
            <div style="display: flex; gap: 6px; align-items: center;">
              <!-- Background switcher inside preview header (only for shadow and glass tabs) -->
              <div id="preview-bg-selector-group" style="display: none;">
                <select id="preview-bg-select" class="form-select" style="padding: 4px 8px; font-size: 11px; width: auto; height: auto;">
                  <option value="cyber-mesh">Cyber Mesh</option>
                  <option value="polka-dots">Polka Dots</option>
                  <option value="sunset-glow">Sunset Glow</option>
                  <option value="plain-dark">Dark Minimal</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Preview Area Container -->
          <div style="flex: 1; min-height: 280px; display: flex; flex-direction: column; justify-content: center; position: relative;">
            
            <!-- 1. Gradient Preview Screen -->
            <div class="gradient-visualizer" id="gradient-preview-screen" style="flex: 1; border-radius: 8px; display: flex; align-items: center; justify-content: center; min-height: 250px;">
              <span style="font-weight: 700; color: #fff; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">PREVIEW</span>
            </div>

            <!-- 2. Box Shadow Showcase Container (Shared Background) -->
            <div id="shadow-showcase-container" class="glass-bg-mesh hidden" style="flex: 1; position: relative; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 36px; min-height: 250px; transition: all 0.3s ease; user-select: none;">
              <!-- Coordinates label -->
              <div style="position: absolute; bottom: 8px; left: 8px; font-size: 10px; color: rgba(255,255,255,0.4); pointer-events: none; display: flex; align-items: center; gap: 4px;">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                <span>Drag box to move Layer 1 shadow</span>
              </div>
              <div id="shadow-target-box" style="width: 130px; height: 130px; background-color: #1e293b; border-radius: 16px; cursor: move; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #ffffff; text-align: center; font-weight: bold; position: relative; z-index: 10; transition: transform 0.15s ease;">
                <span style="font-size: 12px; letter-spacing: 0.5px; opacity: 0.9;">Target Box</span>
                <span id="drag-coordinates-label" style="font-size: 9px; opacity: 0.6; margin-top: 4px; font-family: monospace;">(H: 10, V: 10)</span>
              </div>
            </div>

            <!-- 3. Glassmorphism Showcase Container (Shared Background) -->
            <div id="glass-showcase-container" class="glass-bg-mesh hidden" style="flex: 1; position: relative; border-radius: 8px; overflow: hidden; display: flex; align-items: center; justify-content: center; padding: 24px; min-height: 250px; transition: all 0.3s ease;">
              <!-- Refraction Blobs -->
              <div class="glass-bg-deco-blob blob1" style="position: absolute; width: 80px; height: 80px; border-radius: 50%; background: radial-gradient(circle, #f43f5e 20%, transparent 80%); filter: blur(10px); top: 20%; left: 20%; pointer-events: none;"></div>
              <div class="glass-bg-deco-blob blob2" style="position: absolute; width: 110px; height: 110px; border-radius: 50%; background: radial-gradient(circle, #9d4edd 20%, transparent 80%); filter: blur(12px); bottom: 15%; right: 15%; pointer-events: none;"></div>
              <div class="glass-bg-deco-blob blob3" style="position: absolute; width: 60px; height: 60px; border-radius: 50%; background: radial-gradient(circle, #00f2fe 20%, transparent 80%); filter: blur(5px); top: 50%; right: 40%; pointer-events: none;"></div>
              
              <!-- Glass Card preview -->
              <div id="glass-preview-element" style="width: 80%; padding: 20px; text-align: center; color: #ffffff; position: relative; z-index: 2;">
                <h4 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 800; letter-spacing: 0.5px; text-shadow: 0 2px 4px rgba(0,0,0,0.4);">OMNITOOL HUB</h4>
                <p style="margin: 0 0 12px 0; font-size: 11px; opacity: 0.85; line-height: 1.4;">Real-time glassmorphism card preview.</p>
                <button class="tool-btn primary" style="font-size: 10px; pointer-events: none; width: 100%; justify-content: center;">Preview Trigger</button>
              </div>
            </div>

            <!-- 4. Clip Path Showcase Container -->
            <div id="clippath-showcase-container" class="hidden" style="flex: 1; position: relative; border-radius: 8px; overflow: auto; padding: 24px; min-height: 250px; transition: all 0.3s ease; background-color: #0b0f19; user-select: none;">
              <!-- Centering container -->
              <div style="min-width: 100%; min-height: 100%; display: flex; align-items: center; justify-content: center; padding: 40px; box-sizing: border-box;">
                <!-- Workarea container -->
                <div id="clippath-workarea" style="position: relative; width: 200px; height: 200px; border: 1px dashed rgba(255,255,255,0.15); background-image: radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0); background-size: 20px 20px; overflow: visible; flex-shrink: 0;">
                  <!-- The element that actually gets clipped -->
                  <div id="clippath-target-element" style="width: 100%; height: 100%; background: linear-gradient(135deg, #00f2fe 0%, #9d4edd 100%); transition: clip-path 0.1s ease;"></div>
                  <!-- SVG Outline Overlay -->
                  <svg id="clippath-svg-overlay" viewBox="0 0 100 100" preserveAspectRatio="none" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; z-index: 50;"></svg>
                  <!-- Handles container -->
                  <div id="clippath-handles-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible;"></div>
                </div>
              </div>
            </div>
            <!-- Dynamic SVG Defs for Live Preview -->
            <div id="clippath-svg-defs-container" style="position: absolute; width: 0; height: 0; overflow: hidden; pointer-events: none;"></div>
          </div>

          <!-- Code Box -->
          <div class="form-group" style="margin-top: 12px;">
            <div class="panel-header" style="border: none; padding: 0; margin-bottom: 4px;">
              <label>Generated CSS Code</label>
              <button class="tool-btn accent-emerald" id="css-studio-copy-btn">
                <svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy CSS
              </button>
            </div>
            <textarea class="form-input" id="css-studio-code-output" readonly style="font-family: var(--font-mono); font-size: 12px; height: 75px; resize: none; width: 100%; box-sizing: border-box;" aria-label="Generated CSS Output"></textarea>
          </div>
        </div>

        <!-- Quick Guide & Info Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="studio-guide-title">Quick Guide: CSS Gradient Creator</span>
            </div>
          </div>
          <div class="tool-guide-steps" id="studio-guide-steps">
            <!-- Populated dynamically by JS -->
          </div>
        </div>
      </div>

      <style>
        .keyboard-tab {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-muted);
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
          text-align: center;
        }
        .keyboard-tab:hover, .keyboard-tab.active {
          background: rgba(0, 242, 254, 0.15);
          color: var(--accent-cyan);
          border-color: rgba(0, 242, 254, 0.3);
          box-shadow: 0 0 8px rgba(0, 242, 254, 0.1);
        }
        .tab-control-panel {
          margin-top: 12px;
          border-top: 1px solid var(--border-color);
          padding-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .tab-control-panel.hidden {
          display: none !important;
        }
        #shadow-layer-2-enable:checked + .slider-toggle-btn {
          background-color: #a855f7 !important;
        }
        #shadow-layer-2-enable:checked + .slider-toggle-btn:before {
          transform: translateX(16px);
        }
        .slider-toggle-btn:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: .3s;
          border-radius: 50%;
        }
        .clippath-handle {
          position: absolute;
          width: 14px;
          height: 14px;
          background: #00f2fe;
          border: 2px solid #ffffff;
          border-radius: 50%;
          cursor: move;
          transform: translate(-7px, -7px);
          box-shadow: 0 0 8px rgba(0, 242, 254, 0.8);
          pointer-events: auto;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .clippath-handle:hover, .clippath-handle.dragging {
          background: #ff007f;
          border-color: #ffffff;
          box-shadow: 0 0 12px rgba(255, 0, 127, 1);
          transform: translate(-7px, -7px) scale(1.2);
        }
        .clippath-point-row {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 6px;
          padding: 4px 8px;
        }
        .clippath-point-idx {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          width: 18px;
        }
        .clippath-point-val {
          font-family: var(--font-mono);
          font-size: 12px;
          width: 50px;
          background: transparent;
          border: none;
          color: #fff;
          text-align: center;
        }
        .clippath-point-val:focus {
          outline: none;
          border-bottom: 1px solid var(--accent-cyan);
        }
        .clippath-shape-row:hover {
          background: rgba(0, 242, 254, 0.15) !important;
          border-color: rgba(0, 242, 254, 0.4) !important;
        }
        .shape-name-input:focus {
          border-bottom: 1px solid var(--accent-cyan) !important;
        }
      </style>
    `;
  },

  init(container, appInstance) {
    appInstance.cssStudioState = appInstance.cssStudioState || {
      sharedClipPath: ""
    };
    let clipPathIdCounter = 0;
    const tabs = container.querySelectorAll("#css-studio-tabs .keyboard-tab");
    const panelGrad = container.querySelector("#panel-gradient-controls");
    const panelShadow = container.querySelector("#panel-shadow-controls");
    const panelGlass = container.querySelector("#panel-glass-controls");
    const panelClipPath = container.querySelector("#panel-clippath-controls");

    const visualGrad = container.querySelector("#gradient-preview-screen");
    const visualShadow = container.querySelector("#shadow-showcase-container");
    const visualGlass = container.querySelector("#glass-showcase-container");
    const visualClipPath = container.querySelector("#clippath-showcase-container");

    const bgSelectorGroup = container.querySelector("#preview-bg-selector-group");
    const bgSelect = container.querySelector("#preview-bg-select");
    const codeOutput = container.querySelector("#css-studio-code-output");

    const guideTitle = container.querySelector("#studio-guide-title");
    const guideSteps = container.querySelector("#studio-guide-steps");

    let activeTab = "gradient";

    const guides = {
      gradient: {
        title: "Quick Guide: CSS Gradient Creator",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Choose Options</strong>: Set type (Linear/Radial/Conic), angle bounds, or select repeating/non-repeating options.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Add & Tune Stops</strong>: Add up to 8 custom color stops. Use sliders to shift location positions.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Save & Export</strong>: Apply preset gallery templates, save custom creations, or copy generated CSS code.</div>
          </div>
        `
      },
      shadow: {
        title: "Quick Guide: CSS Box Shadow Builder",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Visual Control</strong>: Click and drag the Target Box inside the preview screen to visually reposition the shadow offsets in real-time.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Multi-layered Shadows</strong>: Enable <strong>Shadow Layer 2</strong> to create stunning 3D ambient cyberpunk neon glows.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Browser Copy</strong>: Click the <strong>Copy CSS</strong> button to instantly save your generated styles.</div>
          </div>
        `
      },
      glass: {
        title: "Quick Guide: Frosted Glassmorphism Generator",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Customize Glass</strong>: Adjust the background tint, opacity, frosted backdrop blur, and border colors.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Cyber Glow</strong>: Tune the ambient box shadow parameters to emit a premium cyberpunk neon glow.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Extract CSS</strong>: Copy the computed background-filter styles directly to your layout.</div>
          </div>
        `
      },
      clippath: {
        title: "Quick Guide: CSS Clip-Path Polygon Maker",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Choose Preset Shape</strong>: Select a starting shape like Triangle, Pentagon, or Star from the dropdown menu.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Drag Handles</strong>: Grab and move any of the glowing vertices on the grid to shape your custom polygon.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Add/Delete Points</strong>: Click "+ Point" to insert a new handle, or use the "x" next to coordinates in the panel to prune points. Copy CSS when done.</div>
          </div>
        `
      }
    };

    // Helper functions for parsing colors
    const hexToRgba = (hex, opacityPercent) => {
      const bigint = parseInt(hex.replace("#", ""), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      const opacity = parseInt(opacityPercent, 10) / 100;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    };

    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.replace("#", ""), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return `${r}, ${g}, ${b}`;
    };

    const hslToHex = (hsl) => {
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.fillStyle = hsl;
      return ctx.fillStyle;
    };

    // --- Tab Switcher ---
    const switchTab = (tabId) => {
      activeTab = tabId;
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));

      panelGrad.classList.toggle("hidden", tabId !== "gradient");
      panelShadow.classList.toggle("hidden", tabId !== "shadow");
      panelGlass.classList.toggle("hidden", tabId !== "glass");
      panelClipPath.classList.toggle("hidden", tabId !== "clippath");

      visualGrad.classList.toggle("hidden", tabId !== "gradient");
      visualShadow.classList.toggle("hidden", tabId !== "shadow");
      visualGlass.classList.toggle("hidden", tabId !== "glass");
      visualClipPath.classList.toggle("hidden", tabId !== "clippath");

      bgSelectorGroup.style.display = (tabId === "shadow" || tabId === "glass") ? "block" : "none";

      if (guideTitle && guideSteps) {
        guideTitle.innerText = guides[tabId].title;
        guideSteps.innerHTML = guides[tabId].steps;
      }

      if (tabId === "gradient") {
        buildGradient();
      } else if (tabId === "shadow") {
        updateShadows();
      } else if (tabId === "glass") {
        updateGlassStyles();
      } else if (tabId === "clippath") {
        updateClipPath();
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab));
    });

    // ==========================================
    // GRADIENT CODE
    // ==========================================
    const gradType = container.querySelector("#grad-type");
    const gradAngle = container.querySelector("#grad-angle");
    const gradAngleVal = container.querySelector("#grad-angle-val");
    const gradStopsContainer = container.querySelector("#grad-stops-container");
    const gradPresetsBox = container.querySelector("#grad-presets-box");
    const repeatingEl = container.querySelector("#grad-repeating");
    const shapeEl = container.querySelector("#grad-shape");
    const posEl = container.querySelector("#grad-position");

    let gradientStops = [
      { color: "#00f2fe", position: 0 },
      { color: "#9d4edd", position: 100 }
    ];

    const gradientPresets = [
      { name: "Ocean Blue", type: "linear", angle: 135, repeating: false, stops: [{ color: "#00f2fe", position: 0 }, { color: "#4facfe", position: 50 }, { color: "#0000ff", position: 100 }] },
      { name: "Sunset Violet", type: "linear", angle: 135, repeating: false, stops: [{ color: "#f5576c", position: 0 }, { color: "#f093fb", position: 100 }] },
      { name: "Neon Lime", type: "linear", angle: 90, repeating: false, stops: [{ color: "#00ff87", position: 0 }, { color: "#60efff", position: 100 }] },
      { name: "Cyberpunk", type: "linear", angle: 45, repeating: false, stops: [{ color: "#f107a3", position: 0 }, { color: "#7b2ff7", position: 50 }, { color: "#07f1f1", position: 100 }] },
      { name: "Peach Dream", type: "linear", angle: 135, repeating: false, stops: [{ color: "#ff9a9e", position: 0 }, { color: "#fecfef", position: 99 }, { color: "#fecfef", position: 100 }] },
      { name: "Deep Space", type: "radial", shape: "circle", position: "center", repeating: false, stops: [{ color: "#434343", position: 0 }, { color: "#000000", position: 100 }] },
      { name: "Retro Stripe", type: "linear", angle: 90, repeating: true, stops: [{ color: "#ffbe0b", position: 0 }, { color: "#ffbe0b", position: 10 }, { color: "#fb5607", position: 10 }, { color: "#fb5607", position: 20 }] },
      { name: "Aurora Borealis", type: "linear", angle: 135, repeating: false, stops: [{ color: "#0575e6", position: 0 }, { color: "#00f260", position: 100 }] },
      { name: "Flaming Orange", type: "linear", angle: 45, repeating: false, stops: [{ color: "#f857a6", position: 0 }, { color: "#ff5858", position: 100 }] },
      { name: "Midnight Lavender", type: "linear", angle: 135, repeating: false, stops: [{ color: "#2f0743", position: 0 }, { color: "#41295a", position: 100 }] },
      { name: "Cotton Candy", type: "linear", angle: 135, repeating: false, stops: [{ color: "#ff9a9e", position: 0 }, { color: "#fecfef", position: 50 }, { color: "#a1c4fd", position: 100 }] },
      { name: "Golden Hour", type: "linear", angle: 45, repeating: false, stops: [{ color: "#ff8c00", position: 0 }, { color: "#ff007f", position: 50 }, { color: "#7928ca", position: 100 }] },
      { name: "Emerald Lustre", type: "linear", angle: 135, repeating: false, stops: [{ color: "#11998e", position: 0 }, { color: "#38ef7d", position: 100 }] },
      { name: "Royal Velvet", type: "linear", angle: 45, repeating: false, stops: [{ color: "#8a2387", position: 0 }, { color: "#e94057", position: 50 }, { color: "#f27121", position: 100 }] },
      { name: "Electric Ice", type: "linear", angle: 90, repeating: false, stops: [{ color: "#00c6ff", position: 0 }, { color: "#0072ff", position: 100 }] }
    ];

    let customPresets = [];
    try {
      const stored = localStorage.getItem("omnitool_custom_gradients");
      if (stored) customPresets = JSON.parse(stored);
    } catch (err) {
      console.error(err);
    }

    const generateHarmoniousGradient = () => {
      const harmonySelect = container.querySelector("#grad-harmony");
      const stopsSelect = container.querySelector("#grad-harmony-stops");
      if (!harmonySelect || !stopsSelect) return;

      const harmony = harmonySelect.value;
      if (harmony === "none") return;

      const stopCount = parseInt(stopsSelect.value, 10);
      const seedHue = Math.floor(Math.random() * 360);
      const newStops = [];

      if (harmony === "analogous") {
        const step = 15 + Math.floor(Math.random() * 11);
        const direction = Math.random() < 0.5 ? -1 : 1;
        for (let i = 0; i < stopCount; i++) {
          const h = (seedHue + i * step * direction + 360) % 360;
          const s = 70 + (i % 2) * 10;
          const l = 45 + (i % 3) * 8;
          const color = hslToHex(`hsl(${h}, ${s}%, ${l}%)`);
          const position = Math.round((i / (stopCount - 1)) * 100);
          newStops.push({ color, position });
        }
      } else if (harmony === "monochromatic") {
        const baseSat = 65 + Math.floor(Math.random() * 16);
        for (let i = 0; i < stopCount; i++) {
          const h = seedHue;
          const s = baseSat;
          const l = 20 + Math.round((i / (stopCount - 1)) * 60);
          const color = hslToHex(`hsl(${h}, ${s}%, ${l}%)`);
          const position = Math.round((i / (stopCount - 1)) * 100);
          newStops.push({ color, position });
        }
      } else if (harmony === "complementary") {
        const compHue = (seedHue + 180) % 360;
        for (let i = 0; i < stopCount; i++) {
          const isComp = i % 2 === 1;
          const h = isComp ? compHue : seedHue;
          const s = 70 + (i % 2) * 10;
          const l = 42 + Math.floor(Math.random() * 15);
          const color = hslToHex(`hsl(${h}, ${s}%, ${l}%)`);
          const position = Math.round((i / (stopCount - 1)) * 100);
          newStops.push({ color, position });
        }
      } else if (harmony === "triadic") {
        for (let i = 0; i < stopCount; i++) {
          const h = (seedHue + (i % 3) * 120) % 360;
          const s = 70 + (i % 2) * 10;
          const l = 45 + (i % 3) * 8;
          const color = hslToHex(`hsl(${h}, ${s}%, ${l}%)`);
          const position = Math.round((i / (stopCount - 1)) * 100);
          newStops.push({ color, position });
        }
      } else if (harmony === "pastel") {
        const step = 20 + Math.floor(Math.random() * 16);
        for (let i = 0; i < stopCount; i++) {
          const h = (seedHue + i * step) % 360;
          const s = 35 + Math.floor(Math.random() * 15);
          const l = 80 + Math.floor(Math.random() * 10);
          const color = hslToHex(`hsl(${h}, ${s}%, ${l}%)`);
          const position = Math.round((i / (stopCount - 1)) * 100);
          newStops.push({ color, position });
        }
      } else if (harmony === "cyber") {
        const cyberColors = [
          ["#00F2FE", "#9D4EDD", "#FF007F", "#00FF87", "#FFFFFF"],
          ["#FF007F", "#7928CA", "#00E5FF", "#FFE600", "#E2E8F0"],
          ["#39FF14", "#00FF87", "#00E5FF", "#FF007F", "#FFFFFF"]
        ];
        const selectedSet = cyberColors[seedHue % cyberColors.length];
        for (let i = 0; i < stopCount; i++) {
          const color = selectedSet[i % selectedSet.length];
          const position = Math.round((i / (stopCount - 1)) * 100);
          newStops.push({ color, position });
        }
      }

      gradientStops = newStops;
      renderGradientStops();
      buildGradient();
      appInstance.showToast(`Generated ${harmony} gradient`, "success");
    };

    const randomizeGradient = () => {
      const harmonySelect = container.querySelector("#grad-harmony");
      if (!harmonySelect) return;
      const options = ["analogous", "monochromatic", "complementary", "triadic", "pastel", "cyber"];
      harmonySelect.value = options[Math.floor(Math.random() * options.length)];
      generateHarmoniousGradient();

      if (gradType) {
        const types = ["linear", "radial", "conic"];
        gradType.value = types[Math.floor(Math.random() * types.length)];
      }
      if (gradAngle) gradAngle.value = Math.floor(Math.random() * 361);
      if (repeatingEl) repeatingEl.checked = Math.random() < 0.15;

      updateGradientControlVisibility();
      buildGradient();
    };

    const updateGradientControlVisibility = () => {
      const type = gradType?.value || "linear";
      const angleGroup = container.querySelector("#grad-angle-group");
      const shapeGroup = container.querySelector("#grad-shape-group");
      const positionGroup = container.querySelector("#grad-position-group");

      if (angleGroup) {
        angleGroup.style.display = (type === "linear" || type === "conic") ? "block" : "none";
        const label = angleGroup.querySelector("label");
        if (label) label.innerText = type === "conic" ? "Start Angle" : "Angle";
      }
      if (shapeGroup) shapeGroup.style.display = type === "radial" ? "block" : "none";
      if (positionGroup) positionGroup.style.display = (type === "radial" || type === "conic") ? "block" : "none";
    };

    const buildGradient = () => {
      if (activeTab !== "gradient" || !gradType) return;
      const type = gradType.value;
      const sortedStops = gradientStops.slice().sort((a, b) => a.position - b.position);
      const stopsStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(", ");
      const isRepeating = repeatingEl?.checked || false;

      let gradString = "";
      if (type === "linear") {
        updateGradientControlVisibility();
        if (gradAngleVal && gradAngle) gradAngleVal.innerText = `${gradAngle.value}°`;
        gradString = `linear-gradient(${gradAngle ? gradAngle.value : 135}deg, ${stopsStr})`;
      } else if (type === "radial") {
        updateGradientControlVisibility();
        const shape = shapeEl?.value || "circle";
        const pos = posEl?.value || "center";
        gradString = `radial-gradient(${shape} at ${pos}, ${stopsStr})`;
      } else if (type === "conic") {
        updateGradientControlVisibility();
        if (gradAngleVal && gradAngle) gradAngleVal.innerText = `${gradAngle.value}°`;
        const pos = posEl?.value || "center";
        gradString = `conic-gradient(from ${gradAngle ? gradAngle.value : 0}deg at ${pos}, ${stopsStr})`;
      }

      if (isRepeating) {
        gradString = "repeating-" + gradString;
      }

      visualGrad.style.background = gradString;
      codeOutput.value = `background: ${gradString};`;
    };

    const renderGradientStops = () => {
      if (!gradStopsContainer) return;
      gradStopsContainer.innerHTML = "";

      gradientStops.forEach((stop, index) => {
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.gap = "8px";

        row.innerHTML = `
          <input type="color" class="stop-color-input" value="${stop.color}" style="border: none; background: none; width: 30px; height: 30px; cursor: pointer;">
          <div class="slider-group" style="flex: 1;">
            <input type="range" class="stop-pos-slider slider-input" min="0" max="100" value="${stop.position}">
            <span class="slider-val stop-pos-val">${stop.position}%</span>
          </div>
          ${gradientStops.length > 2 ? `<button class="stop-remove-btn" style="background: none; border: none; color: var(--accent-rose); cursor: pointer; font-size: 14px; padding: 4px 6px;">✕</button>` : ''}
        `;

        row.querySelector(".stop-color-input").addEventListener("input", (e) => {
          gradientStops[index].color = e.target.value;
          buildGradient();
        });

        const posSlider = row.querySelector(".stop-pos-slider");
        posSlider.addEventListener("input", (e) => {
          const val = parseInt(e.target.value, 10);
          gradientStops[index].position = val;
          row.querySelector(".stop-pos-val").innerText = `${val}%`;
          buildGradient();
        });

        const removeBtn = row.querySelector(".stop-remove-btn");
        if (removeBtn) {
          removeBtn.addEventListener("click", () => {
            gradientStops.splice(index, 1);
            renderGradientStops();
            buildGradient();
          });
        }
        gradStopsContainer.appendChild(row);
      });
    };

    const loadGradientPreset = (preset) => {
      if (gradType) gradType.value = preset.type;
      if (preset.type === "linear" && gradAngle) gradAngle.value = preset.angle;
      if (preset.type === "conic") {
        if (gradAngle) gradAngle.value = preset.angle || 0;
        if (posEl) posEl.value = preset.position || "center";
      }
      if (preset.type === "radial") {
        if (shapeEl) shapeEl.value = preset.shape || "circle";
        if (posEl) posEl.value = preset.position || "center";
      }
      if (repeatingEl) repeatingEl.checked = preset.repeating || false;
      gradientStops = JSON.parse(JSON.stringify(preset.stops));

      updateGradientControlVisibility();
      renderGradientStops();
      buildGradient();
      appInstance.showToast(`Loaded "${preset.name}" preset`, "success");
    };

    const renderPresets = () => {
      if (!gradPresetsBox) return;
      gradPresetsBox.innerHTML = "";
      const allPresets = [...gradientPresets, ...customPresets];

      allPresets.forEach((preset, index) => {
        const el = document.createElement("div");
        el.className = "grad-preset-card";
        el.title = preset.name;
        el.style.width = "100%";
        el.style.height = "32px";
        el.style.borderRadius = "6px";
        el.style.cursor = "pointer";
        el.style.border = "1px solid rgba(255,255,255,0.1)";
        el.style.position = "relative";

        const sorted = preset.stops.slice().sort((a, b) => a.position - b.position);
        const stopsStr = sorted.map(s => `${s.color} ${s.position}%`).join(", ");
        let styleStr = "";
        if (preset.type === "linear") {
          styleStr = `linear-gradient(${preset.angle}deg, ${stopsStr})`;
        } else if (preset.type === "conic") {
          styleStr = `conic-gradient(from ${preset.angle || 0}deg at ${preset.position || "center"}, ${stopsStr})`;
        } else {
          styleStr = `radial-gradient(${preset.shape || "circle"} at ${preset.position || "center"}, ${stopsStr})`;
        }

        if (preset.repeating) styleStr = "repeating-" + styleStr;
        el.style.background = styleStr;

        el.addEventListener("click", () => loadGradientPreset(preset));

        const isCustom = index >= gradientPresets.length;
        if (isCustom) {
          const del = document.createElement("button");
          del.innerText = "✕";
          del.style.cssText = "position:absolute; top:-3px; right:-3px; width:12px; height:12px; border-radius:50%; background:var(--accent-rose); color:#fff; border:none; font-size:7px; display:flex; align-items:center; justify-content:center; cursor:pointer; opacity:0; transition:opacity 0.2s;";
          el.addEventListener("mouseenter", () => del.style.opacity = "1");
          el.addEventListener("mouseleave", () => del.style.opacity = "0");
          del.addEventListener("click", (e) => {
            e.stopPropagation();
            customPresets.splice(index - gradientPresets.length, 1);
            localStorage.setItem("omnitool_custom_gradients", JSON.stringify(customPresets));
            renderPresets();
            appInstance.showToast("Deleted custom preset", "success");
          });
          el.appendChild(del);
        }

        gradPresetsBox.appendChild(el);
      });
    };

    // Render initial gradient stops and presets on load
    renderGradientStops();
    renderPresets();

    // Events
    gradType?.addEventListener("change", () => { updateGradientControlVisibility(); buildGradient(); });
    gradAngle?.addEventListener("input", buildGradient);
    shapeEl?.addEventListener("change", buildGradient);
    posEl?.addEventListener("change", buildGradient);
    repeatingEl?.addEventListener("change", buildGradient);
    container.querySelector("#grad-harmony")?.addEventListener("change", generateHarmoniousGradient);
    container.querySelector("#grad-harmony-gen-btn")?.addEventListener("click", generateHarmoniousGradient);
    container.querySelector("#grad-randomize-btn")?.addEventListener("click", randomizeGradient);

    container.querySelector("#grad-add-stop-btn")?.addEventListener("click", () => {
      if (gradientStops.length >= 8) {
        appInstance.showToast("Maximum 8 color stops allowed", "warning");
        return;
      }
      let newPos = 50;
      if (gradientStops.length >= 2) {
        const sorted = gradientStops.slice().sort((a, b) => a.position - b.position);
        newPos = Math.round((sorted[sorted.length - 1].position + sorted[sorted.length - 2].position) / 2);
      }
      gradientStops.push({ color: "#ffffff", position: newPos });
      renderGradientStops();
      buildGradient();
    });

    container.querySelector("#grad-import-palette-btn")?.addEventListener("click", () => {
      const colors = (appInstance.colorLabState && appInstance.colorLabState.currentColors)
        ? appInstance.colorLabState.currentColors.map(c => c.hex)
        : [];
      if (colors.length > 0) {
        gradientStops = colors.map((c, idx) => ({
          color: c,
          position: Math.round((idx / (colors.length - 1 || 1)) * 100)
        }));
        renderGradientStops();
        buildGradient();
        appInstance.showToast("Imported colors from Color Lab!", "success");
      } else {
        appInstance.showToast("No active Color Lab palette found. Go to Color Lab first!", "warning");
      }
    });

    container.querySelector("#grad-save-preset-btn")?.addEventListener("click", () => {
      const name = prompt("Name your preset:", `Preset ${customPresets.length + 1}`);
      if (!name) return;
      const custom = {
        name: name.trim(),
        type: gradType.value,
        angle: gradAngle ? parseInt(gradAngle.value, 10) : 135,
        shape: shapeEl ? shapeEl.value : "circle",
        position: posEl ? posEl.value : "center",
        repeating: repeatingEl?.checked || false,
        stops: JSON.parse(JSON.stringify(gradientStops))
      };
      customPresets.push(custom);
      localStorage.setItem("omnitool_custom_gradients", JSON.stringify(customPresets));
      renderPresets();
      appInstance.showToast("Preset saved!", "success");
    });

    // ==========================================
    // BOX SHADOW CODE
    // ==========================================
    const shadowH1 = container.querySelector("#shadow-h-1");
    const shadowV1 = container.querySelector("#shadow-v-1");
    const shadowBlur1 = container.querySelector("#shadow-blur-1");
    const shadowSpread1 = container.querySelector("#shadow-spread-1");
    const shadowColor1 = container.querySelector("#shadow-color-1");
    const shadowOpacity1 = container.querySelector("#shadow-opacity-1");
    const shadowInset1 = container.querySelector("#shadow-inset-1");

    const shadowH1Val = container.querySelector("#shadow-h-1-val");
    const shadowV1Val = container.querySelector("#shadow-v-1-val");
    const shadowBlur1Val = container.querySelector("#shadow-blur-1-val");
    const shadowSpread1Val = container.querySelector("#shadow-spread-1-val");
    const shadowOpacity1Val = container.querySelector("#shadow-opacity-1-val");

    const layer2Enable = container.querySelector("#shadow-layer-2-enable");
    const layer2Panel = container.querySelector("#shadow-layer-2-panel");
    const shadowH2 = container.querySelector("#shadow-h-2");
    const shadowV2 = container.querySelector("#shadow-v-2");
    const shadowBlur2 = container.querySelector("#shadow-blur-2");
    const shadowSpread2 = container.querySelector("#shadow-spread-2");
    const shadowColor2 = container.querySelector("#shadow-color-2");
    const shadowOpacity2 = container.querySelector("#shadow-opacity-2");
    const shadowInset2 = container.querySelector("#shadow-inset-2");

    const shadowH2Val = container.querySelector("#shadow-h-2-val");
    const shadowV2Val = container.querySelector("#shadow-v-2-val");
    const shadowBlur2Val = container.querySelector("#shadow-blur-2-val");
    const shadowSpread2Val = container.querySelector("#shadow-spread-2-val");
    const shadowOpacity2Val = container.querySelector("#shadow-opacity-2-val");

    const boxBgColor = container.querySelector("#box-bg-color");
    const boxBorderColor = container.querySelector("#box-border-color");
    const boxBorderEnable = container.querySelector("#box-border-enable");
    const boxRadius = container.querySelector("#box-radius");
    const boxRadiusVal = container.querySelector("#box-radius-val");

    const targetBox = container.querySelector("#shadow-target-box");
    const dragCoordsLabel = container.querySelector("#drag-coordinates-label");

    const updateShadows = () => {
      if (activeTab !== "shadow") return;
      const h1 = parseInt(shadowH1.value, 10);
      const v1 = parseInt(shadowV1.value, 10);
      const b1 = parseInt(shadowBlur1.value, 10);
      const s1 = parseInt(shadowSpread1.value, 10);
      const c1 = shadowColor1.value;
      const o1 = shadowOpacity1.value;
      const inset1 = shadowInset1.checked;

      shadowH1Val.innerText = `${h1}px`;
      shadowV1Val.innerText = `${v1}px`;
      shadowBlur1Val.innerText = `${b1}px`;
      shadowSpread1Val.innerText = `${s1}px`;
      shadowOpacity1Val.innerText = `${o1}%`;
      dragCoordsLabel.innerText = `(H: ${h1}, V: ${v1})`;

      const rgb1 = hexToRgba(c1, o1);
      const part1 = `${inset1 ? 'inset ' : ''}${h1}px ${v1}px ${b1}px ${s1}px ${rgb1}`;

      let fullShadow = part1;
      let cssLine = part1;

      if (layer2Enable.checked) {
        layer2Panel.style.display = "block";
        const h2 = parseInt(shadowH2.value, 10);
        const v2 = parseInt(shadowV2.value, 10);
        const b2 = parseInt(shadowBlur2.value, 10);
        const s2 = parseInt(shadowSpread2.value, 10);
        const c2 = shadowColor2.value;
        const o2 = shadowOpacity2.value;
        const inset2 = shadowInset2.checked;

        shadowH2Val.innerText = `${h2}px`;
        shadowV2Val.innerText = `${v2}px`;
        shadowBlur2Val.innerText = `${b2}px`;
        shadowSpread2Val.innerText = `${s2}px`;
        shadowOpacity2Val.innerText = `${o2}%`;

        const rgb2 = hexToRgba(c2, o2);
        const part2 = `${inset2 ? 'inset ' : ''}${h2}px ${v2}px ${b2}px ${s2}px ${rgb2}`;
        fullShadow = `${part1}, ${part2}`;
        cssLine = `\n  ${part1},\n  ${part2}`;
      } else {
        layer2Panel.style.display = "none";
      }

      const rad = parseInt(boxRadius.value, 10);
      boxRadiusVal.innerText = `${rad}px`;

      targetBox.style.backgroundColor = boxBgColor.value;
      targetBox.style.borderRadius = `${rad}px`;
      targetBox.style.boxShadow = fullShadow;

      if (boxBorderEnable.checked) {
        targetBox.style.border = `2px solid ${boxBorderColor.value}`;
      } else {
        targetBox.style.border = "none";
      }

      const borderCSS = boxBorderEnable.checked ? `\n  border: 2px solid ${boxBorderColor.value};` : "";
      codeOutput.value = `.preview-box {
  width: 130px;
  height: 130px;
  background-color: ${boxBgColor.value};
  border-radius: ${rad}px;${borderCSS}
  box-shadow: ${cssLine};
}`;
    };

    // Drag behavior for shadow layer 1
    let isDragging = false;
    let dragStartX = 0, dragStartY = 0, startH1 = 0, startV1 = 0;

    const onDragMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartX;
      const dy = e.clientY - dragStartY;
      shadowH1.value = Math.min(80, Math.max(-80, startH1 + Math.round(dx / 1.5)));
      shadowV1.value = Math.min(80, Math.max(-80, startV1 + Math.round(dy / 1.5)));
      updateShadows();
    };

    const onDragEnd = () => {
      if (isDragging) {
        isDragging = false;
        targetBox.style.transform = "scale(1)";
        window.removeEventListener("mousemove", onDragMove);
        window.removeEventListener("mouseup", onDragEnd);
      }
    };

    targetBox.addEventListener("mousedown", (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      startH1 = parseInt(shadowH1.value, 10);
      startV1 = parseInt(shadowV1.value, 10);
      targetBox.style.transform = "scale(0.98)";
      window.addEventListener("mousemove", onDragMove);
      window.addEventListener("mouseup", onDragEnd);
      e.preventDefault();
    });

    const shadowControlsList = [
      shadowH1, shadowV1, shadowBlur1, shadowSpread1, shadowColor1, shadowOpacity1, shadowInset1,
      layer2Enable, shadowH2, shadowV2, shadowBlur2, shadowSpread2, shadowColor2, shadowOpacity2, shadowInset2,
      boxBgColor, boxBorderColor, boxBorderEnable, boxRadius
    ];
    shadowControlsList.forEach(c => c?.addEventListener("input", updateShadows));

    // Shadow Preset listeners
    container.querySelector("#shadow-preset-soft")?.addEventListener("click", () => {
      shadowH1.value = "0"; shadowV1.value = "15"; shadowBlur1.value = "30"; shadowSpread1.value = "0";
      shadowColor1.value = "#000000"; shadowOpacity1.value = "25"; shadowInset1.checked = false;
      layer2Enable.checked = true;
      shadowH2.value = "0"; shadowV2.value = "4"; shadowBlur2.value = "10"; shadowSpread2.value = "-2";
      shadowColor2.value = "#000000"; shadowOpacity2.value = "15"; shadowInset2.checked = false;
      boxBgColor.value = "#ffffff"; boxRadius.value = "16"; boxBorderEnable.checked = false;
      updateShadows();
      appInstance.showToast("Soft Ambient Preset loaded", "info");
    });
    container.querySelector("#shadow-preset-cyber")?.addEventListener("click", () => {
      shadowH1.value = "12"; shadowV1.value = "12"; shadowBlur1.value = "0"; shadowSpread1.value = "0";
      shadowColor1.value = "#00f2fe"; shadowOpacity1.value = "60"; shadowInset1.checked = false;
      layer2Enable.checked = true;
      shadowH2.value = "-12"; shadowV2.value = "-12"; shadowBlur2.value = "25"; shadowSpread2.value = "0";
      shadowColor2.value = "#a855f7"; shadowOpacity2.value = "35"; shadowInset2.checked = false;
      boxBgColor.value = "#030712"; boxRadius.value = "12"; boxBorderEnable.checked = true; boxBorderColor.value = "#00f2fe";
      updateShadows();
      appInstance.showToast("Cyber Floating Preset loaded", "info");
    });
    container.querySelector("#shadow-preset-neon")?.addEventListener("click", () => {
      shadowH1.value = "8"; shadowV1.value = "8"; shadowBlur1.value = "16"; shadowSpread1.value = "0";
      shadowColor1.value = "#00f2fe"; shadowOpacity1.value = "50"; shadowInset1.checked = false;
      layer2Enable.checked = true;
      shadowH2.value = "-8"; shadowV2.value = "-8"; shadowBlur2.value = "16"; shadowSpread2.value = "0";
      shadowColor2.value = "#f43f5e"; shadowOpacity2.value = "45"; shadowInset2.checked = false;
      boxBgColor.value = "#0f172a"; boxRadius.value = "20"; boxBorderEnable.checked = false;
      updateShadows();
      appInstance.showToast("Neon Glow Preset loaded", "info");
    });
    container.querySelector("#shadow-preset-inset")?.addEventListener("click", () => {
      shadowH1.value = "0"; shadowV1.value = "0"; shadowBlur1.value = "20"; shadowSpread1.value = "2";
      shadowColor1.value = "#00f2fe"; shadowOpacity1.value = "60"; shadowInset1.checked = true;
      layer2Enable.checked = false;
      boxBgColor.value = "#09090b"; boxRadius.value = "12"; boxBorderEnable.checked = true; boxBorderColor.value = "#1f2937";
      updateShadows();
      appInstance.showToast("Inner Glow Preset loaded", "info");
    });

    // ==========================================
    // GLASSMORPHISM CODE
    // ==========================================
    const glassColor = container.querySelector("#glass-color");
    const glassOpacity = container.querySelector("#glass-opacity");
    const glassOpacityVal = container.querySelector("#glass-opacity-val");
    const glassBlur = container.querySelector("#glass-blur");
    const glassBlurVal = container.querySelector("#glass-blur-val");
    const glassSat = container.querySelector("#glass-saturation");
    const glassSatVal = container.querySelector("#glass-saturation-val");
    const glassBorderColor = container.querySelector("#glass-border-color");
    const glassBorderOpacity = container.querySelector("#glass-border-opacity");
    const glassBorderOpacityVal = container.querySelector("#glass-border-opacity-val");
    const glassBorderWidth = container.querySelector("#glass-border-width");
    const glassBorderWidthVal = container.querySelector("#glass-border-width-val");
    const glassRadius = container.querySelector("#glass-radius");
    const glassRadiusVal = container.querySelector("#glass-radius-val");
    const glassGlowColor = container.querySelector("#glass-glow-color");
    const glassGlowSize = container.querySelector("#glass-glow-size");
    const glassGlowSizeVal = container.querySelector("#glass-glow-size-val");
    const glassGlowOpacity = container.querySelector("#glass-glow-opacity");
    const glassGlowOpacityVal = container.querySelector("#glass-glow-opacity-val");

    const previewEl = container.querySelector("#glass-preview-element");

    const updateGlassStyles = () => {
      if (activeTab !== "glass") return;
      const c = glassColor.value;
      const o = parseInt(glassOpacity.value, 10) / 100;
      const b = parseInt(glassBlur.value, 10);
      const sat = parseInt(glassSat.value, 10);
      const bc = glassBorderColor.value;
      const bo = parseInt(glassBorderOpacity.value, 10) / 100;
      const bw = parseInt(glassBorderWidth.value, 10);
      const r = parseInt(glassRadius.value, 10);
      const gc = glassGlowColor.value;
      const gs = parseInt(glassGlowSize.value, 10);
      const go = parseInt(glassGlowOpacity.value, 10) / 100;

      glassOpacityVal.innerText = `${glassOpacity.value}%`;
      glassBlurVal.innerText = `${b}px`;
      glassSatVal.innerText = `${sat}%`;
      glassBorderOpacityVal.innerText = `${glassBorderOpacity.value}%`;
      glassBorderWidthVal.innerText = `${bw}px`;
      glassRadiusVal.innerText = `${r}px`;
      glassGlowSizeVal.innerText = `${gs}px`;
      glassGlowOpacityVal.innerText = `${glassGlowOpacity.value}%`;

      const bg = `rgba(${hexToRgb(c)}, ${o})`;
      const border = `${bw}px solid rgba(${hexToRgb(bc)}, ${bo})`;
      const backdrop = `blur(${b}px) saturate(${sat}%)`;
      const shadow = `0 ${gs / 2}px ${gs}px rgba(${hexToRgb(gc)}, ${go})`;

      previewEl.style.backgroundColor = bg;
      previewEl.style.border = border;
      previewEl.style.backdropFilter = backdrop;
      previewEl.style.webkitBackdropFilter = backdrop;
      previewEl.style.borderRadius = `${r}px`;
      previewEl.style.boxShadow = shadow;

      codeOutput.value = `.glass-card {
  background: ${bg};
  backdrop-filter: ${backdrop};
  -webkit-backdrop-filter: ${backdrop};
  border: ${border};
  border-radius: ${r}px;
  box-shadow: ${shadow};
}`;
    };

    const glassInputs = [
      glassColor, glassOpacity, glassBlur, glassSat,
      glassBorderColor, glassBorderOpacity, glassBorderWidth, glassRadius,
      glassGlowColor, glassGlowSize, glassGlowOpacity
    ];
    glassInputs.forEach(gi => gi?.addEventListener("input", updateGlassStyles));

    // Glass Presets
    container.querySelector("#glass-preset-ios")?.addEventListener("click", () => {
      glassColor.value = "#ffffff"; glassOpacity.value = "25"; glassBlur.value = "20"; glassSat.value = "150";
      glassBorderColor.value = "#ffffff"; glassBorderOpacity.value = "40"; glassBorderWidth.value = "1";
      glassRadius.value = "20"; glassGlowColor.value = "#000000"; glassGlowSize.value = "15"; glassGlowOpacity.value = "8";
      updateGlassStyles();
      appInstance.showToast("iOS Light Preset loaded", "info");
    });
    container.querySelector("#glass-preset-cyber")?.addEventListener("click", () => {
      glassColor.value = "#030712"; glassOpacity.value = "50"; glassBlur.value = "10"; glassSat.value = "130";
      glassBorderColor.value = "#00f2fe"; glassBorderOpacity.value = "80"; glassBorderWidth.value = "2";
      glassRadius.value = "12"; glassGlowColor.value = "#00f2fe"; glassGlowSize.value = "30"; glassGlowOpacity.value = "45";
      updateGlassStyles();
      appInstance.showToast("Cyber Glow Preset loaded", "info");
    });
    container.querySelector("#glass-preset-dark")?.addEventListener("click", () => {
      glassColor.value = "#09090b"; glassOpacity.value = "75"; glassBlur.value = "15"; glassSat.value = "100";
      glassBorderColor.value = "#27272a"; glassBorderOpacity.value = "60"; glassBorderWidth.value = "1";
      glassRadius.value = "16"; glassGlowColor.value = "#000000"; glassGlowSize.value = "40"; glassGlowOpacity.value = "50";
      updateGlassStyles();
      appInstance.showToast("Midnight Preset loaded", "info");
    });
    container.querySelector("#glass-preset-neon")?.addEventListener("click", () => {
      glassColor.value = "#1e1b4b"; glassOpacity.value = "40"; glassBlur.value = "14"; glassSat.value = "180";
      glassBorderColor.value = "#f43f5e"; glassBorderOpacity.value = "90"; glassBorderWidth.value = "2";
      glassRadius.value = "24"; glassGlowColor.value = "#f43f5e"; glassGlowSize.value = "45"; glassGlowOpacity.value = "55";
      updateGlassStyles();
      appInstance.showToast("Acid Vaporwave Preset loaded", "info");
    });

    // ==========================================
    // SHARED PREVIEW BG CONTROLLER
    // ==========================================
    bgSelect?.addEventListener("change", (e) => {
      const val = e.target.value;
      const targetContainer = activeTab === "shadow" ? visualShadow : visualGlass;
      targetContainer.className = "";

      const blobs = targetContainer.querySelectorAll(".glass-bg-deco-blob");

      if (val === "cyber-mesh") {
        targetContainer.className = "glass-bg-mesh";
        blobs.forEach(b => b.style.display = "block");
      } else if (val === "polka-dots") {
        targetContainer.className = "glass-bg-dots";
        blobs.forEach(b => b.style.display = "block");
      } else if (val === "sunset-glow") {
        targetContainer.className = "glass-bg-sunset";
        blobs.forEach(b => b.style.display = "none");
      } else {
        targetContainer.className = "glass-bg-dark";
        blobs.forEach(b => b.style.display = "none");
      }
    });

    // --- Unified copy ---
    container.querySelector("#css-studio-copy-btn")?.addEventListener("click", () => {
      if (codeOutput.value) {
        appInstance.copyText(codeOutput.value);
      } else {
        appInstance.showToast("Nothing to copy!", "warning");
      }
    });

    // ==========================================
    // CLIP PATH CODE
    // ==========================================
    const cpPreset = container.querySelector("#clippath-preset");
    const cpPointsList = container.querySelector("#clippath-points-list");
    const cpWorkarea = container.querySelector("#clippath-workarea");
    const cpTarget = container.querySelector("#clippath-target-element");
    const cpHandlesContainer = container.querySelector("#clippath-handles-container");
    const cpAddPointBtn = container.querySelector("#clip-add-point-btn");
    
    // Background toggles
    const clipBgGrid = container.querySelector("#clip-bg-grid");
    const clipBgGrad = container.querySelector("#clip-bg-gradient");
    const clipBgImage = container.querySelector("#clip-bg-image");

    let clipShapes = [
      { id: Date.now(), name: "Shape 1", points: [], visible: true, inverted: false }
    ];
    let activeShapeIndex = 0;
    let clipPoints = [];
    let clipZoom = 100;

    const cpPresets = {
      triangle: [{ x: 50, y: 0 }, { x: 0, y: 100 }, { x: 100, y: 100 }],
      rhombus: [{ x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }, { x: 0, y: 50 }],
      pentagon: [{ x: 50, y: 0 }, { x: 100, y: 38 }, { x: 82, y: 100 }, { x: 18, y: 100 }, { x: 0, y: 38 }],
      hexagon: [{ x: 50, y: 0 }, { x: 100, y: 25 }, { x: 100, y: 75 }, { x: 50, y: 100 }, { x: 0, y: 75 }, { x: 0, y: 25 }],
      octagon: [{ x: 30, y: 0 }, { x: 70, y: 0 }, { x: 100, y: 30 }, { x: 100, y: 70 }, { x: 70, y: 100 }, { x: 30, y: 100 }, { x: 0, y: 70 }, { x: 0, y: 30 }],
      star: [{ x: 50, y: 0 }, { x: 61, y: 35 }, { x: 98, y: 35 }, { x: 68, y: 57 }, { x: 79, y: 91 }, { x: 50, y: 70 }, { x: 21, y: 91 }, { x: 32, y: 57 }, { x: 2, y: 35 }, { x: 39, y: 35 }],
      chevron: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 75, y: 50 }, { x: 100, y: 100 }, { x: 0, y: 100 }, { x: 25, y: 50 }],
      cross: [{ x: 35, y: 0 }, { x: 65, y: 0 }, { x: 65, y: 35 }, { x: 100, y: 35 }, { x: 100, y: 65 }, { x: 65, y: 65 }, { x: 65, y: 100 }, { x: 35, y: 100 }, { x: 35, y: 65 }, { x: 0, y: 65 }, { x: 0, y: 35 }, { x: 35, y: 35 }],
      "message-bubble": [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 75 }, { x: 75, y: 75 }, { x: 75, y: 100 }, { x: 50, y: 75 }, { x: 0, y: 75 }],
      parallelogram: [{ x: 25, y: 0 }, { x: 100, y: 0 }, { x: 75, y: 100 }, { x: 0, y: 100 }],
      trapezoid: [{ x: 20, y: 0 }, { x: 80, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }],
      "left-arrow": [{ x: 40, y: 0 }, { x: 40, y: 20 }, { x: 100, y: 20 }, { x: 100, y: 80 }, { x: 40, y: 80 }, { x: 40, y: 100 }, { x: 0, y: 50 }],
      "right-arrow": [{ x: 0, y: 20 }, { x: 60, y: 20 }, { x: 60, y: 0 }, { x: 100, y: 50 }, { x: 60, y: 100 }, { x: 60, y: 80 }, { x: 0, y: 80 }],
      heart: [{ x: 50, y: 15 }, { x: 64, y: 0 }, { x: 85, y: 0 }, { x: 100, y: 20 }, { x: 100, y: 50 }, { x: 50, y: 95 }, { x: 0, y: 50 }, { x: 0, y: 20 }, { x: 15, y: 0 }, { x: 36, y: 0 }],
      "star-badge": [
        { name: "Outer Circle", points: [{ x: 50, y: 0 }, { x: 85, y: 15 }, { x: 100, y: 50 }, { x: 85, y: 85 }, { x: 50, y: 100 }, { x: 15, y: 85 }, { x: 0, y: 50 }, { x: 15, y: 15 }], visible: true, inverted: false },
        { name: "Inner Star", points: [{ x: 50, y: 20 }, { x: 58, y: 45 }, { x: 80, y: 45 }, { x: 62, y: 60 }, { x: 70, y: 80 }, { x: 50, y: 68 }, { x: 30, y: 80 }, { x: 38, y: 60 }, { x: 20, y: 45 }, { x: 42, y: 45 }], visible: true, inverted: true }
      ],
      "photo-frame": [
        { name: "Outer Border", points: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }, { x: 0, y: 100 }], visible: true, inverted: false },
        { name: "Inner Frame", points: [{ x: 15, y: 15 }, { x: 85, y: 15 }, { x: 85, y: 85 }, { x: 15, y: 85 }], visible: true, inverted: true }
      ],
      "donut-ring": [
        { name: "Outer Circle", points: [{ x: 50, y: 5 }, { x: 82, y: 18 }, { x: 95, y: 50 }, { x: 82, y: 82 }, { x: 50, y: 95 }, { x: 18, y: 82 }, { x: 5, y: 50 }, { x: 18, y: 18 }], visible: true, inverted: false },
        { name: "Inner Cutout", points: [{ x: 50, y: 30 }, { x: 64, y: 36 }, { x: 70, y: 50 }, { x: 64, y: 64 }, { x: 50, y: 70 }, { x: 36, y: 64 }, { x: 30, y: 50 }, { x: 36, y: 36 }], visible: true, inverted: true }
      ],
      "shield-cutout": [
        { name: "Outer Shield", points: [{ x: 10, y: 10 }, { x: 90, y: 10 }, { x: 90, y: 55 }, { x: 50, y: 95 }, { x: 10, y: 55 }], visible: true, inverted: false },
        { name: "Center Star", points: [{ x: 50, y: 25 }, { x: 55, y: 40 }, { x: 70, y: 40 }, { x: 58, y: 48 }, { x: 62, y: 63 }, { x: 50, y: 54 }, { x: 38, y: 63 }, { x: 42, y: 48 }, { x: 30, y: 40 }, { x: 45, y: 40 }], visible: true, inverted: true }
      ],
      "gear-cog": [
        { name: "Outer Gear", points: [{ x: 38, y: 15 }, { x: 62, y: 15 }, { x: 65, y: 30 }, { x: 80, y: 23 }, { x: 88, y: 38 }, { x: 73, y: 50 }, { x: 88, y: 62 }, { x: 80, y: 77 }, { x: 65, y: 70 }, { x: 62, y: 85 }, { x: 38, y: 85 }, { x: 35, y: 70 }, { x: 20, y: 77 }, { x: 12, y: 62 }, { x: 27, y: 50 }, { x: 12, y: 38 }, { x: 20, y: 23 }, { x: 35, y: 30 }], visible: true, inverted: false },
        { name: "Center Hole", points: [{ x: 50, y: 35 }, { x: 61, y: 39 }, { x: 65, y: 50 }, { x: 61, y: 61 }, { x: 50, y: 65 }, { x: 39, y: 61 }, { x: 35, y: 50 }, { x: 39, y: 39 }], visible: true, inverted: true }
      ],
      "gothic-window": [
        { name: "Window Frame", points: [{ x: 15, y: 90 }, { x: 85, y: 90 }, { x: 85, y: 45 }, { x: 80, y: 32 }, { x: 68, y: 18 }, { x: 50, y: 10 }, { x: 32, y: 18 }, { x: 20, y: 32 }, { x: 15, y: 45 }], visible: true, inverted: false },
        { name: "Main Arch Cutout", points: [{ x: 25, y: 85 }, { x: 75, y: 85 }, { x: 75, y: 55 }, { x: 71, y: 45 }, { x: 62, y: 39 }, { x: 50, y: 36 }, { x: 38, y: 39 }, { x: 29, y: 45 }, { x: 25, y: 55 }], visible: true, inverted: true },
        { name: "Rose Window Hole", points: [{ x: 50, y: 17 }, { x: 54, y: 18 }, { x: 55, y: 22 }, { x: 54, y: 26 }, { x: 50, y: 27 }, { x: 46, y: 26 }, { x: 45, y: 22 }, { x: 46, y: 18 }], visible: true, inverted: true }
      ]
    };

    const loadClipPreset = (presetName) => {
      if (!presetName) return;
      const preset = cpPresets[presetName] || cpPresets.triangle;
      const compoundPresets = ["star-badge", "photo-frame", "donut-ring", "shield-cutout", "gear-cog", "gothic-window"];
      
      if (compoundPresets.includes(presetName)) {
        clipShapes = preset.map((s, idx) => ({
          id: Date.now() + idx,
          name: s.name || `Shape ${idx + 1}`,
          points: s.points.map(pt => ({ ...pt })),
          visible: s.visible !== undefined ? s.visible : true,
          inverted: s.inverted || false,
          type: s.type || "polygon"
        }));
        activeShapeIndex = 0;
        clipPoints = clipShapes[activeShapeIndex].points;
      } else {
        if (clipShapes[activeShapeIndex]) {
          clipShapes[activeShapeIndex].points = preset.map(pt => ({ ...pt }));
          clipShapes[activeShapeIndex].type = presetName;
          clipPoints = clipShapes[activeShapeIndex].points;
        } else {
          clipShapes = [
            { id: Date.now(), name: "Shape 1", points: preset.map(pt => ({ ...pt })), visible: true, inverted: false, type: presetName }
          ];
          activeShapeIndex = 0;
          clipPoints = clipShapes[activeShapeIndex].points;
        }
      }
      
      renderClipPathUI();
      
      // Reset select dropdown value to placeholder
      const cpPreset = container.querySelector("#clippath-preset");
      if (cpPreset) {
        cpPreset.value = "";
      }
    };

    const updateClipPath = () => {
      if (activeTab !== "clippath") return;
      const visibleShapes = clipShapes.filter(s => s.visible && s.points.length >= 3);
      
      if (visibleShapes.length === 0) {
        cpTarget.style.clipPath = "none";
        cpTarget.style.webkitClipPath = "none";
        codeOutput.value = "clip-path: none;";
        appInstance.cssStudioState.sharedClipPath = "none";
        appInstance.sharedShape = { source: "clippath", points: [] };
        return;
      }

      // Check if there is only 1 shape visible and it is NOT inverted
      if (visibleShapes.length === 1 && !visibleShapes[0].inverted) {
        const singleShape = visibleShapes[0];
        const polyStr = singleShape.points.map(pt => `${pt.x}% ${pt.y}%`).join(", ");
        const clipPathVal = `polygon(${polyStr})`;
        
        cpTarget.style.clipPath = clipPathVal;
        cpTarget.style.webkitClipPath = clipPathVal;
        codeOutput.value = `clip-path: ${clipPathVal};`;
        
        appInstance.cssStudioState.sharedClipPath = clipPathVal;
        appInstance.sharedShape = {
          source: "clippath",
          points: singleShape.points.map(pt => ({ ...pt }))
        };

        const defsContainer = container.querySelector("#clippath-svg-defs-container");
        if (defsContainer) defsContainer.innerHTML = "";
      } else {
        clipPathIdCounter++;
        const uniqueId = `omnitool-multi-clip-${clipPathIdCounter}`;
        const clipPathVal = `url(#${uniqueId})`;
        
        cpTarget.style.clipPath = "none";
        cpTarget.style.webkitClipPath = "none";
        cpTarget.offsetHeight; // Force reflow
        
        cpTarget.style.clipPath = clipPathVal;
        cpTarget.style.webkitClipPath = clipPathVal;

        const hasNonInverted = visibleShapes.some(s => !s.inverted);
        const pathData = visibleShapes.map((shape) => {
          const pointsStr = shape.points.map((pt, i) => {
            const prefix = i === 0 ? "M" : "L";
            return `${prefix} ${pt.x/100} ${pt.y/100}`;
          }).join(" ");
          return `${pointsStr} Z`;
        }).join(" ");

        let fullPathData = pathData;
        if (!hasNonInverted) {
          fullPathData = `M 0 0 L 1 0 L 1 1 L 0 1 Z ${pathData}`;
        }

        const svgMarkup = `<svg width="0" height="0" style="position: absolute;">
  <defs>
    <clipPath id="${uniqueId}" clipPathUnits="objectBoundingBox">
      <path d="${fullPathData}" clip-rule="evenodd" />
    </clipPath>
  </defs>
</svg>`;

        codeOutput.value = `/* CSS */\n.clipped-element {\n  clip-path: ${clipPathVal};\n}\n\n/* HTML Markup */\n${svgMarkup}`;

        const defsContainer = container.querySelector("#clippath-svg-defs-container");
        if (defsContainer) {
          defsContainer.innerHTML = svgMarkup;
        }

        const activeShape = clipShapes[activeShapeIndex] || visibleShapes[0];
        if (activeShape && activeShape.points.length > 0) {
          appInstance.cssStudioState.sharedClipPath = `polygon(${activeShape.points.map(pt => `${pt.x}% ${pt.y}%`).join(", ")})`;
          appInstance.sharedShape = {
            source: "clippath",
            points: activeShape.points.map(pt => ({ ...pt }))
          };
        }
      }
    };

    const renderShapesList = () => {
      const shapesList = container.querySelector("#clippath-shapes-list");
      if (!shapesList) return;
      shapesList.innerHTML = "";
      
      clipShapes.forEach((shape, index) => {
        const isActive = index === activeShapeIndex;
        const row = document.createElement("div");
        row.className = "clippath-shape-row";
        row.style.cssText = `display:flex; align-items:center; gap:6px; background:${isActive ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255,255,255,0.02)'}; border:1px solid ${isActive ? 'rgba(0, 242, 254, 0.3)' : 'rgba(255,255,255,0.05)'}; border-radius:6px; padding:4px 8px; cursor:pointer;`;
        
        row.innerHTML = `
          <span style="font-family:var(--font-mono); font-size:10px; color:${isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'};">#${index + 1}</span>
          <input type="text" class="shape-name-input" value="${shape.name}" style="background:transparent; border:none; color:#fff; font-size:11px; width:70px; font-weight:${isActive ? 'bold' : 'normal'}; outline:none;">
          <div style="margin-left:auto; display:flex; gap:6px; align-items:center;">
            <select class="shape-mode-select" title="Operation Mode (Add or Subtract shape)" style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); color:#fff; font-size:10px; padding:2px 4px; border-radius:4px; outline:none; cursor:pointer;">
              <option value="add" ${!shape.inverted ? 'selected' : ''}>Add</option>
              <option value="subtract" ${shape.inverted ? 'selected' : ''}>Subtract</option>
            </select>
            <button class="shape-vis-btn" title="Toggle Visibility" style="background:none; border:none; color:${shape.visible ? '#00f2fe' : 'rgba(255,255,255,0.25)'}; cursor:pointer; font-size:11px; padding:2px 4px; outline:none;">${shape.visible ? '👁️' : '🕶️'}</button>
            ${clipShapes.length > 1 ? `<button class="shape-del-btn" title="Delete Shape" style="background:none; border:none; color:var(--accent-rose); cursor:pointer; font-size:11px; padding:2px 4px; outline:none;">✕</button>` : ''}
          </div>
        `;
        
        row.addEventListener("click", (e) => {
          if (e.target.tagName.toLowerCase() === "input" || e.target.tagName.toLowerCase() === "select" || e.target.closest("button")) return;
          activeShapeIndex = index;
          clipPoints = clipShapes[activeShapeIndex].points;
          renderClipPathUI();
        });

        const nameInput = row.querySelector(".shape-name-input");
        nameInput.addEventListener("change", (e) => {
          shape.name = e.target.value.trim() || `Shape ${index + 1}`;
        });

        const modeSelect = row.querySelector(".shape-mode-select");
        modeSelect.addEventListener("change", (e) => {
          shape.inverted = e.target.value === "subtract";
          renderClipPathUI();
        });

        const visBtn = row.querySelector(".shape-vis-btn");
        visBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          shape.visible = !shape.visible;
          renderClipPathUI();
        });

        const delBtn = row.querySelector(".shape-del-btn");
        if (delBtn) {
          delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            clipShapes.splice(index, 1);
            if (activeShapeIndex >= clipShapes.length) {
              activeShapeIndex = clipShapes.length - 1;
            }
            clipPoints = clipShapes[activeShapeIndex].points;
            renderClipPathUI();
          });
        }

        shapesList.appendChild(row);
      });
    };

    const renderClipPathUI = () => {
      if (!cpHandlesContainer || !cpPointsList) return;
      
      cpHandlesContainer.innerHTML = "";
      cpPointsList.innerHTML = "";

      renderShapesList();

      const svgOverlay = container.querySelector("#clippath-svg-overlay");
      if (svgOverlay) {
        svgOverlay.innerHTML = clipShapes.map((shape, idx) => {
          if (!shape.visible || shape.points.length < 3) return "";
          const isActive = idx === activeShapeIndex;
          
          let strokeColor = "rgba(255, 255, 255, 0.25)";
          let dashArray = "3, 3";
          let fillColor = "rgba(255, 255, 255, 0.02)";
          
          if (shape.inverted) {
            strokeColor = isActive ? "#f43f5e" : "rgba(244, 63, 94, 0.4)";
            dashArray = "4, 2";
            fillColor = isActive ? "rgba(244, 63, 94, 0.08)" : "rgba(244, 63, 94, 0.03)";
          } else if (isActive) {
            strokeColor = "#00f2fe";
            dashArray = "none";
            fillColor = "rgba(0, 242, 254, 0.05)";
          }
          
          const pointsStr = shape.points.map(pt => `${pt.x},${pt.y}`).join(" ");
          return `<polygon points="${pointsStr}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="1.5" stroke-dasharray="${dashArray}" vector-effect="non-scaling-stroke" />`;
        }).join("\n");
      }

      const activeShape = clipShapes[activeShapeIndex];
      if (!activeShape || !activeShape.visible) {
        updateClipPath();
        return;
      }

      clipPoints.forEach((pt, index) => {
        const handle = document.createElement("div");
        handle.className = "clippath-handle";
        handle.style.left = `${pt.x}%`;
        handle.style.top = `${pt.y}%`;
        handle.setAttribute("data-index", index);
        handle.innerHTML = `<span style="font-size: 8px; font-weight: bold; color: #fff; pointer-events: none; user-select: none;">${index + 1}</span>`;
        
        let isDragging = false;

        const onDragStart = (e) => {
          isDragging = true;
          handle.classList.add("dragging");
          e.preventDefault();
        };

        const onDragMove = (e) => {
          if (!isDragging) return;
          const rect = cpWorkarea.getBoundingClientRect();
          const clientX = e.touches ? e.touches[0].clientX : e.clientX;
          const clientY = e.touches ? e.touches[0].clientY : e.clientY;

          let posX = ((clientX - rect.left) / rect.width) * 100;
          let posY = ((clientY - rect.top) / rect.height) * 100;

          posX = Math.min(Math.max(Math.round(posX), 0), 100);
          posY = Math.min(Math.max(Math.round(posY), 0), 100);

          clipPoints[index].x = posX;
          clipPoints[index].y = posY;

          handle.style.left = `${posX}%`;
          handle.style.top = `${posY}%`;

          const xInput = cpPointsList.querySelector(`.x-input[data-index="${index}"]`);
          const yInput = cpPointsList.querySelector(`.y-input[data-index="${index}"]`);
          if (xInput) xInput.value = posX;
          if (yInput) yInput.value = posY;

          updateClipPath();
        };

        const onDragEnd = () => {
          if (isDragging) {
            isDragging = false;
            handle.classList.remove("dragging");
          }
        };

        handle.addEventListener("mousedown", onDragStart);
        document.addEventListener("mousemove", onDragMove);
        document.addEventListener("mouseup", onDragEnd);

        handle.addEventListener("touchstart", onDragStart);
        document.addEventListener("touchmove", onDragMove, { passive: false });
        document.addEventListener("touchend", onDragEnd);

        cpHandlesContainer.appendChild(handle);

        const row = document.createElement("div");
        row.className = "clippath-point-row";
        row.innerHTML = `
          <span class="clippath-point-idx">P${index + 1}</span>
          <span style="font-size: 11px; color: var(--text-muted);">X:</span>
          <input type="number" class="clippath-point-val x-input" data-index="${index}" min="0" max="100" value="${pt.x}">
          <span style="font-size: 11px; color: var(--text-muted); margin-left: 4px;">Y:</span>
          <input type="number" class="clippath-point-val y-input" data-index="${index}" min="0" max="100" value="${pt.y}">
          <button class="tool-btn secondary cp-del-pt-btn" data-index="${index}" style="padding: 2px 6px; font-size: 10px; height: auto; margin-left: auto; border-color: rgba(239, 68, 68, 0.2); color: var(--accent-rose);">×</button>
        `;

        const xIn = row.querySelector(".x-input");
        const yIn = row.querySelector(".y-input");
        xIn.addEventListener("input", (e) => {
          const val = Math.min(Math.max(parseInt(e.target.value, 10) || 0, 0), 100);
          clipPoints[index].x = val;
          handle.style.left = `${val}%`;
          updateClipPath();
        });
        yIn.addEventListener("input", (e) => {
          const val = Math.min(Math.max(parseInt(e.target.value, 10) || 0, 0), 100);
          clipPoints[index].y = val;
          handle.style.top = `${val}%`;
          updateClipPath();
        });

        row.querySelector(".cp-del-pt-btn").addEventListener("click", () => {
          if (clipPoints.length <= 3) {
            appInstance.showToast("Polygons require at least 3 points!", "warning");
            return;
          }
          clipPoints.splice(index, 1);
          renderClipPathUI();
        });

        cpPointsList.appendChild(row);
      });

      updateClipPath();
    };

    cpPreset?.addEventListener("change", (e) => {
      loadClipPreset(e.target.value);
    });

    container.querySelector("#clip-import-shape-btn")?.addEventListener("click", () => {
      const shared = appInstance.sharedShape;
      if (shared && shared.points && shared.points.length >= 3) {
        clipPoints = shared.points.map(pt => ({ ...pt }));
        if (clipShapes[activeShapeIndex]) {
          clipShapes[activeShapeIndex].points = clipPoints;
        }
        renderClipPathUI();
        appInstance.showToast(`Imported shape from ${shared.source}!`, "success");
      } else {
        appInstance.showToast("No shared shape registry data found. Create a shape elsewhere first!", "warning");
      }
    });

    cpAddPointBtn?.addEventListener("click", () => {
      if (clipPoints.length >= 24) {
        appInstance.showToast("Maximum of 24 points reached!", "warning");
        return;
      }
      const last = clipPoints[clipPoints.length - 1] || { x: 50, y: 50 };
      const first = clipPoints[0] || { x: 50, y: 50 };
      const nextPt = {
        x: Math.round((last.x + first.x) / 2),
        y: Math.round((last.y + first.y) / 2)
      };
      clipPoints.push(nextPt);
      renderClipPathUI();
    });

    container.querySelector("#clip-add-shape-btn")?.addEventListener("click", () => {
      if (clipShapes.length >= 6) {
        appInstance.showToast("Maximum of 6 separate shapes allowed", "warning");
        return;
      }
      const newIndex = clipShapes.length;
      const newShape = {
        id: Date.now(),
        name: `Shape ${newIndex + 1}`,
        points: [{ x: 50, y: 15 }, { x: 15, y: 85 }, { x: 85, y: 85 }],
        visible: true,
        inverted: false
      };
      clipShapes.push(newShape);
      activeShapeIndex = newIndex;
      clipPoints = clipShapes[activeShapeIndex].points;
      renderClipPathUI();
      appInstance.showToast(`Added ${newShape.name}`, "success");
    });

    container.querySelector("#clip-rotate-btn")?.addEventListener("click", () => {
      clipPoints.forEach(pt => {
        const newX = 50 - (pt.y - 50);
        const newY = 50 + (pt.x - 50);
        pt.x = Math.min(Math.max(Math.round(newX), 0), 100);
        pt.y = Math.min(Math.max(Math.round(newY), 0), 100);
      });
      renderClipPathUI();
    });

    container.querySelector("#clip-center-btn")?.addEventListener("click", () => {
      if (clipPoints.length === 0) return;
      const b = getShapeBounds(clipPoints);
      const offsetX = 50 - b.midX;
      const offsetY = 50 - b.midY;
      clipPoints.forEach(pt => {
        pt.x = Math.min(Math.max(pt.x + offsetX, 0), 100);
        pt.y = Math.min(Math.max(pt.y + offsetY, 0), 100);
      });
      renderClipPathUI();
    });

    container.querySelector("#clip-reset-btn")?.addEventListener("click", () => {
      const activeShape = clipShapes[activeShapeIndex];
      if (activeShape) {
        const type = activeShape.type || "triangle";
        const preset = cpPresets[type] || cpPresets.triangle;
        if (Array.isArray(preset) && preset[0] && preset[0].points) {
          loadClipPreset(type);
        } else {
          activeShape.points = preset.map(pt => ({ ...pt }));
          clipPoints = activeShape.points;
          renderClipPathUI();
          appInstance.showToast(`Reset shape to ${type} coordinates`, "info");
        }
      }
    });

    container.querySelector("#clip-fliph-btn")?.addEventListener("click", () => {
      clipPoints.forEach(pt => {
        pt.x = 100 - pt.x;
      });
      renderClipPathUI();
    });

    container.querySelector("#clip-flipv-btn")?.addEventListener("click", () => {
      clipPoints.forEach(pt => {
        pt.y = 100 - pt.y;
      });
      renderClipPathUI();
    });

    container.querySelector("#clip-scaleup-btn")?.addEventListener("click", () => {
      clipPoints.forEach(pt => {
        const newX = 50 + (pt.x - 50) * 1.1;
        const newY = 50 + (pt.y - 50) * 1.1;
        pt.x = Math.min(Math.max(Math.round(newX), 0), 100);
        pt.y = Math.min(Math.max(Math.round(newY), 0), 100);
      });
      renderClipPathUI();
    });

    container.querySelector("#clip-scaledown-btn")?.addEventListener("click", () => {
      clipPoints.forEach(pt => {
        const newX = 50 + (pt.x - 50) * 0.9;
        const newY = 50 + (pt.y - 50) * 0.9;
        pt.x = Math.min(Math.max(Math.round(newX), 0), 100);
        pt.y = Math.min(Math.max(Math.round(newY), 0), 100);
      });
      renderClipPathUI();
    });

    container.querySelector("#clip-move-left")?.addEventListener("click", () => {
      clipPoints.forEach(pt => {
        pt.x = Math.max(0, pt.x - 5);
      });
      renderClipPathUI();
    });

    container.querySelector("#clip-move-right")?.addEventListener("click", () => {
      clipPoints.forEach(pt => {
        pt.x = Math.min(100, pt.x + 5);
      });
      renderClipPathUI();
    });

    container.querySelector("#clip-move-up")?.addEventListener("click", () => {
      clipPoints.forEach(pt => {
        pt.y = Math.max(0, pt.y - 5);
      });
      renderClipPathUI();
    });

    container.querySelector("#clip-move-down")?.addEventListener("click", () => {
      clipPoints.forEach(pt => {
        pt.y = Math.min(100, pt.y + 5);
      });
      renderClipPathUI();
    });

    // Alignment operations
    const getShapeBounds = (points) => {
      if (points.length === 0) return { minX: 50, maxX: 50, minY: 50, maxY: 50, width: 0, height: 0, midX: 50, midY: 50 };
      let minX = 100, maxX = 0, minY = 100, maxY = 0;
      points.forEach(pt => {
        if (pt.x < minX) minX = pt.x;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.y > maxY) maxY = pt.y;
      });
      return {
        minX, maxX, minY, maxY,
        width: maxX - minX,
        height: maxY - minY,
        midX: (minX + maxX) / 2,
        midY: (minY + maxY) / 2
      };
    };

    container.querySelector("#clip-align-left")?.addEventListener("click", () => {
      if (clipPoints.length === 0) return;
      const b = getShapeBounds(clipPoints);
      clipPoints.forEach(pt => pt.x -= b.minX);
      renderClipPathUI();
      appInstance.showToast("Aligned active shape left", "success");
    });

    container.querySelector("#clip-align-center")?.addEventListener("click", () => {
      if (clipPoints.length === 0) return;
      const b = getShapeBounds(clipPoints);
      const offset = 50 - b.midX;
      clipPoints.forEach(pt => pt.x = Math.min(Math.max(Math.round(pt.x + offset), 0), 100));
      renderClipPathUI();
      appInstance.showToast("Centered active shape horizontally", "success");
    });

    container.querySelector("#clip-align-right")?.addEventListener("click", () => {
      if (clipPoints.length === 0) return;
      const b = getShapeBounds(clipPoints);
      const offset = 100 - b.maxX;
      clipPoints.forEach(pt => pt.x += offset);
      renderClipPathUI();
      appInstance.showToast("Aligned active shape right", "success");
    });

    container.querySelector("#clip-align-top")?.addEventListener("click", () => {
      if (clipPoints.length === 0) return;
      const b = getShapeBounds(clipPoints);
      clipPoints.forEach(pt => pt.y -= b.minY);
      renderClipPathUI();
      appInstance.showToast("Aligned active shape top", "success");
    });

    container.querySelector("#clip-align-vcenter")?.addEventListener("click", () => {
      if (clipPoints.length === 0) return;
      const b = getShapeBounds(clipPoints);
      const offset = 50 - b.midY;
      clipPoints.forEach(pt => pt.y = Math.min(Math.max(Math.round(pt.y + offset), 0), 100));
      renderClipPathUI();
      appInstance.showToast("Centered active shape vertically", "success");
    });

    container.querySelector("#clip-align-bottom")?.addEventListener("click", () => {
      if (clipPoints.length === 0) return;
      const b = getShapeBounds(clipPoints);
      const offset = 100 - b.maxY;
      clipPoints.forEach(pt => pt.y += offset);
      renderClipPathUI();
      appInstance.showToast("Aligned active shape bottom", "success");
    });

    container.querySelector("#clip-align-stackh")?.addEventListener("click", () => {
      const visible = clipShapes.filter(s => s.visible && s.points.length > 0);
      if (visible.length < 2) {
        appInstance.showToast("Need at least 2 visible shapes to stack!", "warning");
        return;
      }
      const sorted = visible.map(s => ({ shape: s, bounds: getShapeBounds(s.points) }))
                            .sort((a, b) => a.bounds.midX - b.bounds.midX);
      const N = sorted.length;
      sorted.forEach((item, idx) => {
        const L = idx * (100 / N);
        const R = (idx + 1) * (100 / N);
        const C = (L + R) / 2;
        const b = item.bounds;
        const maxW = 100 / N;
        
        let scaleX = 1;
        if (b.width > maxW) {
          scaleX = maxW / (b.width || 1);
        }
        
        item.shape.points.forEach(pt => {
          const px = b.midX + (pt.x - b.midX) * scaleX;
          const offset = C - b.midX;
          pt.x = Math.min(Math.max(Math.round(px + offset), 0), 100);
        });
      });
      renderClipPathUI();
      appInstance.showToast("Stacked shapes horizontally", "success");
    });

    container.querySelector("#clip-align-stackv")?.addEventListener("click", () => {
      const visible = clipShapes.filter(s => s.visible && s.points.length > 0);
      if (visible.length < 2) {
        appInstance.showToast("Need at least 2 visible shapes to stack!", "warning");
        return;
      }
      const sorted = visible.map(s => ({ shape: s, bounds: getShapeBounds(s.points) }))
                            .sort((a, b) => a.bounds.midY - b.bounds.midY);
      const N = sorted.length;
      sorted.forEach((item, idx) => {
        const T = idx * (100 / N);
        const B = (idx + 1) * (100 / N);
        const C = (T + B) / 2;
        const b = item.bounds;
        const maxH = 100 / N;
        
        let scaleY = 1;
        if (b.height > maxH) {
          scaleY = maxH / (b.height || 1);
        }
        
        item.shape.points.forEach(pt => {
          const py = b.midY + (pt.y - b.midY) * scaleY;
          const offset = C - b.midY;
          pt.y = Math.min(Math.max(Math.round(py + offset), 0), 100);
        });
      });
      renderClipPathUI();
      appInstance.showToast("Stacked shapes vertically", "success");
    });

    container.querySelector("#clip-align-allcenter")?.addEventListener("click", () => {
      const visible = clipShapes.filter(s => s.visible && s.points.length > 0);
      if (visible.length === 0) return;
      visible.forEach(shape => {
        const b = getShapeBounds(shape.points);
        const offsetX = 50 - b.midX;
        const offsetY = 50 - b.midY;
        shape.points.forEach(pt => {
          pt.x = Math.min(Math.max(Math.round(pt.x + offsetX), 0), 100);
          pt.y = Math.min(Math.max(Math.round(pt.y + offsetY), 0), 100);
        });
      });
      renderClipPathUI();
      appInstance.showToast("Aligned all shapes' centers", "success");
    });

    // Zoom slider event listener
    const zoomSlider = container.querySelector("#clip-zoom-slider");
    const zoomVal = container.querySelector("#clip-zoom-val");
    zoomSlider?.addEventListener("input", (e) => {
      clipZoom = parseInt(e.target.value, 10);
      if (zoomVal) zoomVal.innerText = `${clipZoom}%`;
      const size = 200 * (clipZoom / 100);
      if (cpWorkarea) {
        cpWorkarea.style.width = `${size}px`;
        cpWorkarea.style.height = `${size}px`;
        cpWorkarea.style.backgroundSize = `${20 * (clipZoom / 100)}px ${20 * (clipZoom / 100)}px`;
      }
    });

    // Background toggles
    const clipBgPalette = container.querySelector("#clip-bg-palette");

    // Workarea background controls
    clipBgGrid?.addEventListener("click", () => {
      clipBgGrid.classList.add("active");
      clipBgGrad.classList.remove("active");
      clipBgPalette?.classList.remove("active");
      clipBgImage.classList.remove("active");
      cpWorkarea.style.background = "";
      cpWorkarea.style.backgroundImage = "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0)";
      cpWorkarea.style.backgroundSize = "20px 20px";
      cpTarget.style.background = "linear-gradient(135deg, #00f2fe 0%, #9d4edd 100%)";
    });

    clipBgGrad?.addEventListener("click", () => {
      clipBgGrid.classList.remove("active");
      clipBgGrad.classList.add("active");
      clipBgPalette?.classList.remove("active");
      clipBgImage.classList.remove("active");
      cpWorkarea.style.background = "";
      cpWorkarea.style.backgroundImage = "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0)";
      cpWorkarea.style.backgroundSize = "20px 20px";
      cpTarget.style.background = "linear-gradient(45deg, #ff007f 0%, #ff8c00 100%)";
    });

    clipBgPalette?.addEventListener("click", () => {
      clipBgGrid.classList.remove("active");
      clipBgGrad.classList.remove("active");
      clipBgPalette.classList.add("active");
      clipBgImage.classList.remove("active");
      cpWorkarea.style.background = "";
      cpWorkarea.style.backgroundImage = "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0)";
      cpWorkarea.style.backgroundSize = "20px 20px";
      
      const colors = (appInstance.colorLabState && appInstance.colorLabState.currentColors)
        ? appInstance.colorLabState.currentColors.map(c => c.hex)
        : [];
      if (colors.length > 0) {
        let gradVal;
        if (colors.length === 1) {
          gradVal = colors[0];
        } else {
          gradVal = `linear-gradient(135deg, ${colors.join(", ")})`;
        }
        cpTarget.style.background = gradVal;
        appInstance.showToast("Applied Color Lab palette colors!", "success");
      } else {
        cpTarget.style.background = "linear-gradient(135deg, #00f2fe 0%, #9d4edd 100%)";
        appInstance.showToast("No active Color Lab palette found. Generated default instead.", "info");
      }
    });

    clipBgImage?.addEventListener("click", () => {
      clipBgGrid.classList.remove("active");
      clipBgGrad.classList.remove("active");
      clipBgPalette?.classList.remove("active");
      clipBgImage.classList.add("active");
      cpWorkarea.style.background = "";
      cpWorkarea.style.backgroundImage = "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 0)";
      cpWorkarea.style.backgroundSize = "20px 20px";
      cpTarget.style.background = "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80') center/cover no-repeat";
    });

    // Load initial shape
    loadClipPreset("triangle");

    // Set initial active tab
    const initialTab = appInstance.activeSubtab || 'gradient';
    appInstance.activeSubtab = null;
    switchTab(initialTab);
  }
};
