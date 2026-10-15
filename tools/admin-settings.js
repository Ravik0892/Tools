import { escapeHtml } from './utils.js';

export default {
  id: "admin-settings",
  name: "Settings & Ad Control Panel",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>OmniTool Hub Settings</h3>
          </div>

          <!-- Tabs Nav bar -->
          <div class="settings-tabs-bar" style="display: flex; flex-wrap: wrap; gap: 6px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 16px;">
            <button class="settings-tab-btn active" data-tab="tab-ads" style="background: none; border: none; border-bottom: 2px solid var(--accent-cyan); color: var(--accent-cyan); font-weight: 700; cursor: pointer; padding: 6px 12px; font-size: 13px; outline: none; white-space: nowrap;">Monetization &amp; Ads</button>
            <button class="settings-tab-btn" data-tab="tab-aesthetics" style="background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer; padding: 6px 12px; font-size: 13px; outline: none; white-space: nowrap;">Theme &amp; Aesthetics</button>
            <button class="settings-tab-btn" data-tab="tab-tools-visibility" style="background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer; padding: 6px 12px; font-size: 13px; outline: none; white-space: nowrap;">Tool Visibility</button>
            <button class="settings-tab-btn" data-tab="tab-tiers" style="background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer; padding: 6px 12px; font-size: 13px; outline: none; white-space: nowrap;">Monetization Tiers</button>
            <button class="settings-tab-btn" data-tab="tab-backup" style="background: none; border: none; border-bottom: 2px solid transparent; color: var(--text-muted); font-weight: 600; cursor: pointer; padding: 6px 12px; font-size: 13px; outline: none; white-space: nowrap;">Backup &amp; System</button>
          </div>

          <!-- TAB 1: Monetization & Ads Content -->
          <div id="tab-ads" class="settings-tab-content">
            <!-- Ad Global Toggle -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="checkbox-label">
                <input type="checkbox" id="ad-global-status" checked>
                <span>Enable Advertisements &amp; Monetization</span>
              </label>
              <p style="font-size: 12px; color: var(--text-muted); margin-left: 26px;">Toggle all ad slots globally on or off with a single click.</p>
            </div>

            <!-- Ad Network Selector -->
            <div class="form-group" id="ad-network-group" style="margin-bottom: 16px;">
              <label for="ad-network-select">Active Ad Provider (Dashboard & Tools)</label>
              <select class="form-select" id="ad-network-select">
                <option value="dev">Developer Sponsor Ads (Default Local)</option>
                <option value="adsense">Google AdSense</option>
                <option value="admob">AdMob Mobile Banner</option>
                <option value="custom">Custom Ad Script / HTML Code</option>
              </select>
            </div>

            <!-- Sidebar Ad Network Selector -->
            <div class="form-group" id="sidebar-ad-network-group" style="margin-bottom: 16px;">
              <label for="sidebar-ad-network-select">Sidebar Ad Provider</label>
              <select class="form-select" id="sidebar-ad-network-select">
                <option value="inherit">Inherit Active Ad Provider (Default)</option>
                <option value="dev">Developer Sponsor Ads</option>
                <option value="adsense">Google AdSense</option>
                <option value="admob">AdMob Mobile Banner</option>
                <option value="custom">Custom Ad Script / HTML Code</option>
              </select>
            </div>

            <!-- Dynamic Network Inputs -->
            <div class="network-inputs-container">
              <!-- Developer Sponsor Inputs -->
              <div id="inputs-dev" class="ad-network-fields" style="display: none;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-weight: 700; font-size: 12px; color: var(--text-muted); text-transform: uppercase;">Sponsor Details</span>
                  <span id="sponsor-edit-status" style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); background: rgba(0, 242, 254, 0.1); padding: 2px 8px; border-radius: 4px; border: 1px solid rgba(0, 242, 254, 0.2);">Global Defaults</span>
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="sponsor-brand">Sponsor Brand Name</label>
                    <input type="text" class="form-input" id="sponsor-brand" placeholder="e.g. HexaCloud Host">
                  </div>
                  <div class="form-group">
                    <label for="sponsor-icon-select">Sponsor Icon Style</label>
                    <select class="form-select" id="sponsor-icon-select">
                      <option value="cloud">Cloud Server</option>
                      <option value="database">Database Server</option>
                      <option value="shield">Security Shield</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label for="sponsor-slogan">Sponsor Slogan / Description</label>
                  <input type="text" class="form-input" id="sponsor-slogan" placeholder="e.g. Secure, lightning-fast hosting...">
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="sponsor-url">Sponsor Affiliate Link</label>
                    <input type="text" class="form-input" id="sponsor-url" placeholder="e.g. https://your-affiliate-link.com">
                  </div>
                  <div class="form-group">
                    <label for="sponsor-btn-text">Button Text</label>
                    <input type="text" class="form-input" id="sponsor-btn-text" placeholder="e.g. Claim Now">
                  </div>
                </div>
                
                <!-- Page Overrides Section -->
                <div style="margin-top: 14px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 14px;">
                  <div style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 8px;">Page-Specific Custom Overrides</div>
                  <div class="form-row" style="align-items: flex-end; gap: 8px; margin-bottom: 6px; grid-template-columns: 2fr 1fr 1fr;">
                    <div class="form-group" style="margin-bottom: 0;">
                      <select class="form-select" id="override-tool-select" style="height: 38px; font-size: 12px;">
                        <option value="global">-- Global Default --</option>
                      </select>
                    </div>
                    <button class="tool-btn secondary" id="btn-load-override" style="height: 38px; padding: 0 10px; font-size: 11px; justify-content: center;">Edit Page</button>
                    <button class="tool-btn" id="btn-delete-override" style="height: 38px; padding: 0 8px; font-size: 11px; border-color: rgba(var(--accent-rose-rgb), 0.3); color: var(--accent-rose); background: rgba(var(--accent-rose-rgb), 0.02); justify-content: center;">Reset Page</button>
                  </div>
                  <p style="font-size: 11px; color: var(--text-muted);">Select a tool, click "Edit Page" to customize its sponsor ad. Click "Reset Page" to restore global default sponsor.</p>
                </div>
              </div>
              <!-- AdSense Inputs -->
              <div id="inputs-adsense" class="ad-network-fields" style="display: none;">
                <div class="form-group">
                  <label for="adsense-pub-id">Publisher ID (data-ad-client)</label>
                  <input type="text" class="form-input" id="adsense-pub-id" placeholder="e.g. ca-pub-XXXXXXXXXXXXXXXX">
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="adsense-slot-dash">Dashboard Ad Slot ID</label>
                    <input type="text" class="form-input" id="adsense-slot-dash" placeholder="e.g. XXXXXXXXXX">
                  </div>
                  <div class="form-group">
                    <label for="adsense-slot-tool">Tool Footer Ad Slot ID</label>
                    <input type="text" class="form-input" id="adsense-slot-tool" placeholder="e.g. XXXXXXXXXX">
                  </div>
                </div>
                <div class="form-group">
                  <label for="adsense-slot-side">Sidebar Ad Slot ID</label>
                  <input type="text" class="form-input" id="adsense-slot-side" placeholder="e.g. XXXXXXXXXX">
                </div>
              </div>

              <!-- AdMob Inputs -->
              <div id="inputs-admob" class="ad-network-fields" style="display: none;">
                <div class="form-group">
                  <label for="admob-app-id">AdMob App ID</label>
                  <input type="text" class="form-input" id="admob-app-id" placeholder="e.g. ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX">
                </div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="admob-unit-dash">Dashboard Banner Unit ID</label>
                    <input type="text" class="form-input" id="admob-unit-dash" placeholder="e.g. ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX">
                  </div>
                  <div class="form-group">
                    <label for="admob-unit-tool">Tool Footer Banner Unit ID</label>
                    <input type="text" class="form-input" id="admob-unit-tool" placeholder="e.g. ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX">
                  </div>
                </div>
                <div class="form-group">
                  <label for="admob-unit-side">Sidebar Drawer Banner Unit ID</label>
                  <input type="text" class="form-input" id="admob-unit-side" placeholder="e.g. ca-app-pub-XXXXXXXXXXXXXXXX/XXXXXXXXXX">
                </div>
              </div>

              <!-- Custom HTML Code -->
              <div id="inputs-custom" class="ad-network-fields" style="display: none;">
                <div class="form-group">
                  <label for="custom-ad-html-code">Custom HTML/JS Script Block</label>
                  <textarea class="input-textarea" id="custom-ad-html-code" placeholder="Paste custom ad networks script tags, raw HTML tags, or image banners markup here..." style="min-height: 100px;"></textarea>
                  <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Paste raw tags (e.g., from Media.net, Ezoic, or custom links) to embed them.</p>
                </div>
              </div>
            </div>

            <!-- Placement Toggles -->
            <div class="form-group" style="margin-top: 16px;">
              <label style="font-weight: 700; font-size: 13px; color: var(--text-muted); margin-bottom: 4px;">Active Display Locations</label>
              <div class="form-row" style="grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px;">
                <label class="checkbox-label" style="background: var(--bg-input); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                  <input type="checkbox" id="ad-show-dash" checked>
                  <span>Dashboard</span>
                </label>
                <label class="checkbox-label" style="background: var(--bg-input); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                  <input type="checkbox" id="ad-show-tool" checked>
                  <span>Tool Footer</span>
                </label>
                <label class="checkbox-label" style="background: var(--bg-input); padding: 8px 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                  <input type="checkbox" id="ad-show-side" checked>
                  <span>Sidebar</span>
                </label>
              </div>
            </div>

            <!-- Donation Settings -->
            <div class="form-group" style="margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 16px;">
              <div class="form-row">
                <div class="form-group">
                  <label for="coffee-url">Buy Me a Coffee URL</label>
                  <input type="text" class="form-input" id="coffee-url" placeholder="e.g. https://www.buymeacoffee.com/yourusername">
                </div>
                <div class="form-group">
                  <label for="kofi-url">Ko-fi Donation URL</label>
                  <input type="text" class="form-input" id="kofi-url" placeholder="e.g. https://ko-fi.com/yourusername">
                </div>
              </div>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Enter your personal donation page links. Empty buttons will be automatically hidden from the sidebar.</p>
            </div>

            <!-- Payment Gateways & Unified Checkout Settings -->
            <div class="form-group" style="margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 16px;">
              <div style="font-size: 13px; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                Payment Gateways &amp; Unified Checkout
              </div>
              <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">Configure checkout links and payee details for Gumroad, UPI (GPay/PhonePe/Paytm/Kotak 811), PayPal, Razorpay, and Crypto wallets.</p>

              <!-- Gumroad Links -->
              <div class="form-row">
                <div class="form-group">
                  <label for="gumroad-lifetime-url">Gumroad Lifetime Pass URL</label>
                  <input type="text" class="form-input" id="gumroad-lifetime-url" placeholder="e.g. https://gumroad.com/l/your-lifetime-slug">
                </div>
                <div class="form-group">
                  <label for="gumroad-monthly-url">Gumroad Pro Monthly URL</label>
                  <input type="text" class="form-input" id="gumroad-monthly-url" placeholder="e.g. https://gumroad.com/l/your-monthly-slug">
                </div>
              </div>

              <!-- PayPal & Razorpay Links -->
              <div class="form-row">
                <div class="form-group">
                  <label for="paypal-gateway-url">PayPal Payment Link / Profile</label>
                  <input type="text" class="form-input" id="paypal-gateway-url" placeholder="e.g. https://paypal.me/yourusername">
                </div>
                <div class="form-group">
                  <label for="razorpay-gateway-url">Razorpay Payment Page URL</label>
                  <input type="text" class="form-input" id="razorpay-gateway-url" placeholder="e.g. https://rzp.io/l/yourlink">
                </div>
              </div>

              <!-- UPI ID & Payee Name -->
              <div class="form-row">
                <div class="form-group">
                  <label for="upi-gateway-id">UPI ID (VPA)</label>
                  <input type="text" class="form-input" id="upi-gateway-id" placeholder="e.g. ravik0892@okaxis">
                </div>
                <div class="form-group">
                  <label for="upi-gateway-name">Payee Name / Merchant Name</label>
                  <input type="text" class="form-input" id="upi-gateway-name" placeholder="e.g. OmniTool Hub">
                </div>
              </div>

              <!-- Direct Bank Transfer Details (IMPS / NEFT) -->
              <div style="margin-top: 10px; padding: 12px; border-radius: 8px; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1);">
                <div style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 8px;">Direct Bank Transfer (IMPS / NEFT / RTGS)</div>
                <div class="form-row">
                  <div class="form-group">
                    <label for="bank-gateway-name">Bank Name</label>
                    <input type="text" class="form-input" id="bank-gateway-name" placeholder="e.g. State Bank of India / Punjab National Bank">
                  </div>
                  <div class="form-group">
                    <label for="bank-gateway-holder">Account Beneficiary Name</label>
                    <input type="text" class="form-input" id="bank-gateway-holder" placeholder="e.g. Ravi Kumar / OmniTool Hub">
                  </div>
                </div>
                <div class="form-row" style="margin-top: 6px;">
                  <div class="form-group">
                    <label for="bank-gateway-acc">Account Number</label>
                    <input type="text" class="form-input" id="bank-gateway-acc" placeholder="e.g. 12345678901234">
                  </div>
                  <div class="form-group">
                    <label for="bank-gateway-ifsc">IFSC Code</label>
                    <input type="text" class="form-input" id="bank-gateway-ifsc" placeholder="e.g. SBIN0001234 / PUNB0123400">
                  </div>
                </div>
              </div>

              <!-- Crypto Wallets -->
              <div class="form-group" style="margin-top: 6px;">
                <label for="crypto-usdt-address">USDT Deposit Address (TRC-20)</label>
                <input type="text" class="form-input" id="crypto-usdt-address" placeholder="e.g. TYDzmHwQkP2aE7wGz8hL9qR1vB4sN6mX5c">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="crypto-btc-address">Bitcoin Address (BTC)</label>
                  <input type="text" class="form-input" id="crypto-btc-address" placeholder="e.g. bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh">
                </div>
                <div class="form-group">
                  <label for="crypto-eth-address">Ethereum Address (ETH / ERC-20)</label>
                  <input type="text" class="form-input" id="crypto-eth-address" placeholder="e.g. 0x71C53316E28b4923eFFe35E2D8527a2754664982">
                </div>
              </div>

              <!-- Custom Pre-Generated License Keys -->
              <div class="form-group" style="margin-top: 10px;">
                <label for="custom-license-keys">Custom Pre-Generated License Keys (Comma-separated)</label>
                <input type="text" class="form-input" id="custom-license-keys" placeholder="e.g. VIP-2026, EARLY-BIRD-PASS, MONTHLY-DEV">
                <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Optional custom license keys or promotional codes you want to distribute to specific customers. Keys starting with "MONTHLY-" activate Pro Monthly; all others activate Lifetime Pass.</p>
              </div>
            </div>

            <!-- Adsterra Smart Link Settings -->
            <div class="form-group" style="margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 16px;">
              <label for="adsterra-smart-link">Adsterra Smart Link URL</label>
              <input type="text" class="form-input" id="adsterra-smart-link" placeholder="e.g. https://www.example.com/smartlink">
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Enter your Adsterra Smart Link URL. When users click "Watch Video Ad to Unlock" on locked tools, it will open this link in a new tab, then grant them access.</p>
            </div>

            <!-- Cache Settings -->
            <div class="form-group" style="margin-top: 16px; border-top: 1px solid var(--border-color); padding-top: 16px;">
              <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13.5px; font-weight: 600; color: var(--text-main);">
                <input type="checkbox" id="preserve-settings-reset" style="width: 16px; height: 16px; accent-color: var(--accent-cyan);">
                <span>Preserve Configurations on Cache Reset</span>
              </label>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">If checked, clearing the app cache via the top-right button will preserve your custom configurations (donation links, Adsterra links, theme settings, and passcodes).</p>
            </div>

            <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
              <button class="tool-btn secondary" id="ad-settings-reset" style="font-size: 12px; padding: 6px 12px; height: auto;">Reset Ads to Default</button>
            </div>
          </div>

          <!-- TAB 2: Theme & Aesthetics Content -->
          <div id="tab-aesthetics" class="settings-tab-content" style="display: none;">
            <!-- Brand Accent Preset Selection -->
            <div class="form-group" style="margin-bottom: 18px;">
              <label>Cyber Accent Palette Theme</label>
              <div class="color-swatch-list" style="display: flex; gap: 12px; flex-wrap: wrap; margin-top: 6px;">
                <div class="color-swatch-item" data-preset="default" title="Cyber Cyan &amp; Violet" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; transition: all var(--transition-fast); box-shadow: var(--shadow-sm);">
                  <div class="color-swatch-preview" style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #00f2fe, #9d4edd);"></div>
                </div>
                <div class="color-swatch-item" data-preset="matrix" title="Matrix Emerald Green" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; transition: all var(--transition-fast); box-shadow: var(--shadow-sm);">
                  <div class="color-swatch-preview" style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #10b981, #059669);"></div>
                </div>
                <div class="color-swatch-item" data-preset="vaporwave" title="Vaporwave Magenta &amp; Cyan" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; transition: all var(--transition-fast); box-shadow: var(--shadow-sm);">
                  <div class="color-swatch-preview" style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #ff007f, #00f2fe);"></div>
                </div>
                <div class="color-swatch-item" data-preset="sunset" title="Sunset Rose &amp; Amber" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; transition: all var(--transition-fast); box-shadow: var(--shadow-sm);">
                  <div class="color-swatch-preview" style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #f43f5e, #f59e0b);"></div>
                </div>
                <div class="color-swatch-item" data-preset="amber" title="Cyber Amber Gold" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; transition: all var(--transition-fast); box-shadow: var(--shadow-sm);">
                  <div class="color-swatch-preview" style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #fbbf24, #d97706);"></div>
                </div>
                <div class="color-swatch-item" data-preset="electric" title="Electric Ice Blue" style="width: 36px; height: 36px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; position: relative; transition: all var(--transition-fast); box-shadow: var(--shadow-sm);">
                  <div class="color-swatch-preview" style="width: 100%; height: 100%; border-radius: 50%; background: linear-gradient(135deg, #3b82f6, #00f2fe);"></div>
                </div>
              </div>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Click an accent swatch to apply color variations instantly to the app layout.</p>
            </div>

            <!-- Grid density options -->
            <div class="form-group" style="margin-bottom: 18px;">
              <label for="app-density-select">Dashboard Tile Density</label>
              <select class="form-select" id="app-density-select">
                <option value="comfortable">Comfortable Grid (Default Layout)</option>
                <option value="compact">Ultra Compact Tiles (Hide Descriptions)</option>
              </select>
            </div>

            <!-- Default view options -->
            <div class="form-group" style="margin-bottom: 18px;">
              <label for="app-startup-select">Default Startup Landing View</label>
              <select class="form-select" id="app-startup-select">
                <option value="dashboard">Main Dashboard (Grid Catalog)</option>
                <option value="favorites">Favorites Section</option>
                <option value="category/dev-all">Developer Tools Category</option>
                <option value="category/text-all">Text &amp; Writing Category</option>
                <option value="category/design-all">Design &amp; Styling Category</option>
                <option value="category/math-all">Math &amp; Conversions Category</option>
                <option value="settings">Settings Page</option>
              </select>
            </div>

            <!-- Clock display options -->
            <div class="form-group" style="margin-bottom: 18px;">
              <label for="app-clock-select">Header System Clock Format</label>
              <select class="form-select" id="app-clock-select">
                <option value="24">24-Hour Digital Clock (HH:MM:SS)</option>
                <option value="12">12-Hour Clock (AM/PM)</option>
                <option value="hide">Hide Clock Widget</option>
              </select>
            </div>

            <!-- Mechanical synth feedback sound -->
            <div class="form-group" style="margin-bottom: 12px;">
              <label class="checkbox-label">
                <input type="checkbox" id="app-audio-feedback">
                <span>Retro Mechanical Audio Clicks</span>
              </label>
              <p style="font-size: 11px; color: var(--text-muted); margin-left: 26px;">Plays tiny Web Audio synthesizer click sounds during app events &amp; saves.</p>
            </div>
          </div>

          <!-- TAB 4: Tool Visibility -->
          <div id="tab-tools-visibility" class="settings-tab-content" style="display: none;">
            <div class="form-group" style="margin-bottom: 16px;">
              <label style="color: var(--accent-cyan);">Manage Active Utilities</label>
              <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Toggle checkboxes to show or hide specific tools on the dashboard and sidebar menus. Hidden tools are still accessible via direct link if needed.</div>
              <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                <button class="tool-btn secondary text-xs" id="btn-visibility-select-all" style="padding: 4px 10px; font-size: 11px; height: auto;">Show All</button>
                <button class="tool-btn secondary text-xs" id="btn-visibility-select-none" style="padding: 4px 10px; font-size: 11px; height: auto;">Hide All</button>
              </div>
              <div id="tools-visibility-list" style="display: flex; flex-direction: column; gap: 6px; max-height: 250px; overflow-y: auto; padding-right: 4px; border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; background: rgba(0,0,0,0.15);">
                <!-- Dynamically populated tool list with checkboxes -->
              </div>
            </div>
          </div>

          <!-- TAB: Monetization Tiers -->
          <div id="tab-tiers" class="settings-tab-content" style="display: none;">
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13.5px; font-weight: 600;">
                <input type="checkbox" id="monetization-global-status">
                <span style="color: var(--accent-cyan);">Enable Monetization Restrictions Mode</span>
              </label>
              <p style="font-size: 12px; color: var(--text-muted); margin-left: 26px;">When enabled, tools will be locked based on their tiers. Users must unlock them via simulated ads or premium purchases.</p>
            </div>

            <!-- Simulate User Tier -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label for="monetization-user-tier" style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px;">Simulate User Membership Level</label>
              <select class="form-select" id="monetization-user-tier" style="width: 100%; height: 38px; padding: 0 12px; font-size: 13px;">
                <option value="free">Standard Free User (Show Locks / Show Ads)</option>
                <option value="ad-unlocked">Ad-Unlocked User (Ad-lock tools open / Show Ads)</option>
                <option value="lifetime">Lifetime Pass Holder (All open / Show Ads)</option>
                <option value="premium">Premium Subscriber (All open / 100% Ad-Free)</option>
              </select>
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Set the active simulated tier to test lock and unlock screens instantly.</p>
            </div>

            <!-- Tool-specific Tiers Override List -->
            <div class="form-group" style="margin-bottom: 16px;">
              <label style="color: var(--accent-purple); font-weight: 700; display: block; margin-bottom: 6px;">Individual Tool Tier Overrides</label>
              <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Override the monetization level of individual tools. Changes are stored locally.</div>
              <div id="tools-tiers-list" style="display: flex; flex-direction: column; gap: 8px; max-height: 250px; overflow-y: auto; padding-right: 4px; border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; background: rgba(0,0,0,0.15);">
                <!-- Dynamically populated list of tools with tier dropdowns -->
              </div>
            </div>
          </div>

          <!-- TAB 3: Backup & System Content -->
          <div id="tab-backup" class="settings-tab-content" style="display: none;">
            <!-- Admin Security Settings -->
            <form id="admin-passcode-form" onsubmit="event.preventDefault();" class="form-group" style="margin-bottom: 18px; border-bottom: 1px solid var(--border-color); padding-bottom: 20px;">
              <input type="text" name="username" autocomplete="username" style="display: none;">
              <label for="app-admin-passcode">Admin Access Passcode</label>
              <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Change the security passcode required to access the Settings panel (default: admin123).</div>
              <input type="password" class="form-input" id="app-admin-passcode" placeholder="e.g. admin123" autocomplete="new-password">
            </form>

            <div class="form-group" style="margin-bottom: 18px;">
              <label>Export Global Configurations</label>
              <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Generate and download an ad-config.json file to place in the website's root directory for site-wide global settings.</div>
              <button class="tool-btn" id="app-backup-export" style="width: 100%; justify-content: center; height: 38px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Export Global Config (ad-config.json)
              </button>
            </div>

            <div class="form-group" style="margin-bottom: 24px; border-bottom: 1px solid var(--border-color); padding-bottom: 20px;">
              <label>Restore Configurations</label>
              <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Upload a previously saved configurations JSON file to restore app preferences. This will reload the site.</div>
              <button class="tool-btn" id="app-backup-import-trigger" style="width: 100%; justify-content: center; height: 38px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
                Import &amp; Apply Restore File
              </button>
              <input type="file" id="app-backup-file-input" accept=".json" style="display: none;">
            </div>

            <div class="form-group">
              <label style="color: var(--accent-rose);">Application Maintenance Options</label>
              <div class="form-row" style="margin-top: 8px;">
                <button class="tool-btn" id="app-clear-recents">Clear Recents List</button>
                <button class="tool-btn" id="app-clear-favs">Reset Favorites</button>
              </div>
               <button class="tool-btn" id="app-hard-reset" style="width: 100%; margin-top: 10px; color: var(--accent-rose); border-color: rgba(var(--accent-rose-rgb), 0.2); background: rgba(var(--accent-rose-rgb), 0.03); justify-content: center; height: 38px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                Factory Reset App Cache
              </button>
              <div style="font-size: 11px; color: var(--accent-rose); opacity: 0.85; margin-top: 6px; line-height: 1.4; text-align: left;">
                ⚠️ <strong>Warning</strong>: This will permanently wipe all local configurations, favorites, and presets. Please export your settings above first to avoid data loss.
              </div>
            </div>
          </div>

          <div style="margin-top: 24px; border-top: 1px solid var(--border-color); padding-top: 16px;">
            <button class="tool-btn primary" id="ad-settings-save" style="width: 100%; justify-content: center; height: 42px; font-size: 14px;">Save All Customizations</button>
            <div style="font-size: 11px; color: var(--accent-cyan); opacity: 0.85; margin-top: 8px; line-height: 1.4; text-align: left;">
              ⚠️ <strong>Note</strong>: Settings are stored offline in your browser cache. Clearing your browser history or data will delete them. Use the <strong>Backup & System</strong> tab to download backups.
            </div>
          </div>
        </div>

        <!-- Right column: Live Previews -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Live Ad Simulator</h3>
            <span class="theme-badge" style="background: rgba(var(--accent-cyan-rgb), 0.15); color: var(--accent-cyan);" id="preview-network-badge">Local Sponsor</span>
          </div>

          <div class="ad-simulator-container">
            <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Simulated ad render based on active network settings:</p>
            <div id="ad-preview-box" class="ad-preview-panel">
              <!-- Rendered dynamically -->
            </div>
          </div>

          <div class="panel-header" style="margin-top: 12px; border-top: 1px solid var(--border-color); padding-top: 16px;">
            <h3>Aesthetics Glow Preview</h3>
          </div>
          <div class="theme-preview-card" style="padding: 16px; border: 1px solid var(--border-color); border-radius: 12px; background: var(--bg-card); display: flex; flex-direction: column; gap: 8px;">
            <div style="font-size: 10px; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 1px;">Brand Color Theme Demo</div>
            <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin: 0;">OmniTool Custom Glow</h4>
            <p style="font-size: 12px; color: var(--text-muted); margin: 0;">This box reflects how the cyber accents appear globally on panels, buttons and links.</p>
            <div style="display: flex; gap: 8px; margin-top: 6px;">
              <span style="font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 4px; background: rgba(var(--accent-cyan-rgb), 0.12); color: var(--accent-cyan); border: 1px solid rgba(var(--accent-cyan-rgb), 0.2);">Cyan Accent</span>
              <span style="font-size: 10px; font-weight: 600; padding: 4px 10px; border-radius: 4px; background: rgba(var(--accent-purple-rgb), 0.12); color: var(--accent-purple); border: 1px solid rgba(var(--accent-purple-rgb), 0.2);">Purple Accent</span>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="settings-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Configure Ads</strong>: Toggle active ad containers, switch networks (AdSense/AdMob), and customize identifiers to preview layouts in the simulator.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Customize Aesthetics</strong>: Choose color presets (Cyber Cyan, Matrix Green, Vaporwave), choose grid densities, and adjust system widgets.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Manage Data</strong>: Export settings configurations as backup files, reset favorites or recent items lists, or purge PWA files.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Color Presets</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Grid Customization</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Selected Theme</span>
                <div class="tool-guide-io-value">Vaporwave Preset (Magenta &amp; Cyan Gradient)</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 System Visuals</span>
                <div class="tool-guide-io-value">UI components, buttons, and card borders glow with high-contrast cyberpunk gradients.</div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Tile Density</span>
                <div class="tool-guide-io-value">Set to "Compact Mode" (Hides descriptions)</div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Dashboard Layout</span>
                <div class="tool-guide-io-value">Compact dashboard grid displaying title cards only, fitting more utilities on one screen.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, appInstance) {
    // Tabs clicking logic
    const tabs = container.querySelectorAll(".settings-tab-btn");
    tabs.forEach(btn => {
      btn.addEventListener("click", () => {
        tabs.forEach(b => {
          b.classList.remove("active");
          b.style.color = "var(--text-muted)";
          b.style.borderBottomColor = "transparent";
          b.style.fontWeight = "600";
        });
        btn.classList.add("active");
        btn.style.color = "var(--accent-cyan)";
        btn.style.borderBottomColor = "var(--accent-cyan)";
        btn.style.fontWeight = "700";

        const tabId = btn.getAttribute("data-tab");
        container.querySelectorAll(".settings-tab-content").forEach(c => c.style.display = "none");
        container.querySelector("#" + tabId).style.display = "block";
        
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('click');
        }
      });
    });

    // Swatches clicking logic
    let activePreset = localStorage.getItem("omnitool_accent_preset") || "default";
    const swatches = container.querySelectorAll(".color-swatch-item");
    
    // Highlight saved swatch
    const highlightSwatch = (activeVal) => {
      swatches.forEach(swatch => {
        const p = swatch.getAttribute("data-preset");
        if (p === activeVal) {
          swatch.classList.add("active");
          swatch.style.borderColor = "#fff";
          swatch.style.transform = "scale(1.1)";
        } else {
          swatch.classList.remove("active");
          swatch.style.borderColor = "transparent";
          swatch.style.transform = "none";
        }
      });
    };

    highlightSwatch(activePreset);

    swatches.forEach(swatch => {
      swatch.addEventListener("click", () => {
        const p = swatch.getAttribute("data-preset");
        activePreset = p;
        highlightSwatch(activePreset);

        // Apply immediately to let user preview color changes
        localStorage.setItem("omnitool_accent_preset", p);
        if (typeof appInstance.applyAccentPreset === 'function') {
          appInstance.applyAccentPreset();
        }
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('click');
        }
      });
    });

    // Selects and inputs selectors
    const adGlobal = container.querySelector("#ad-global-status");
    const adNetwork = container.querySelector("#ad-network-select");
    const sidebarAdNetwork = container.querySelector("#sidebar-ad-network-select");
    const showDash = container.querySelector("#ad-show-dash");
    const showTool = container.querySelector("#ad-show-tool");
    const showSide = container.querySelector("#ad-show-side");

    const adsensePub = container.querySelector("#adsense-pub-id");
    const adsenseDash = container.querySelector("#adsense-slot-dash");
    const adsenseTool = container.querySelector("#adsense-slot-tool");
    const adsenseSide = container.querySelector("#adsense-slot-side");

    const admobApp = container.querySelector("#admob-app-id");
    const admobDash = container.querySelector("#admob-unit-dash");
    const admobTool = container.querySelector("#admob-unit-tool");
    const admobSide = container.querySelector("#admob-unit-side");

    const customCode = container.querySelector("#custom-ad-html-code");
    const previewBox = container.querySelector("#ad-preview-box");
    const previewBadge = container.querySelector("#preview-network-badge");

    // Developer Sponsor selectors
    const sponsorBrand = container.querySelector("#sponsor-brand");
    const sponsorIcon = container.querySelector("#sponsor-icon-select");
    const sponsorSlogan = container.querySelector("#sponsor-slogan");
    const sponsorUrl = container.querySelector("#sponsor-url");
    const sponsorBtnText = container.querySelector("#sponsor-btn-text");
    const coffeeUrl = container.querySelector("#coffee-url");
    const kofiUrl = container.querySelector("#kofi-url");
    const gumroadLifetime = container.querySelector("#gumroad-lifetime-url");
    const gumroadMonthly = container.querySelector("#gumroad-monthly-url");
    const paypalUrlInput = container.querySelector("#paypal-gateway-url");
    const razorpayUrlInput = container.querySelector("#razorpay-gateway-url");
    const upiIdInput = container.querySelector("#upi-gateway-id");
    const upiNameInput = container.querySelector("#upi-gateway-name");
    const bankNameInput = container.querySelector("#bank-gateway-name");
    const bankHolderInput = container.querySelector("#bank-gateway-holder");
    const bankAccInput = container.querySelector("#bank-gateway-acc");
    const bankIfscInput = container.querySelector("#bank-gateway-ifsc");
    const cryptoUsdtInput = container.querySelector("#crypto-usdt-address");
    const cryptoBtcInput = container.querySelector("#crypto-btc-address");
    const cryptoEthInput = container.querySelector("#crypto-eth-address");
    const customLicenseKeys = container.querySelector("#custom-license-keys");
    const adsterraSmartLink = container.querySelector("#adsterra-smart-link");
    const preserveSettingsReset = container.querySelector("#preserve-settings-reset");
    const overrideToolSelect = container.querySelector("#override-tool-select");
    const sponsorEditStatus = container.querySelector("#sponsor-edit-status");
    const btnLoadOverride = container.querySelector("#btn-load-override");
    const btnDeleteOverride = container.querySelector("#btn-delete-override");

    // New configurations selectors
    const appDensity = container.querySelector("#app-density-select");
    const appStartup = container.querySelector("#app-startup-select");
    const appClock = container.querySelector("#app-clock-select");
    const appAudio = container.querySelector("#app-audio-feedback");
    const adminPasscode = container.querySelector("#app-admin-passcode");

    // Monetization selectors
    const monetizationGlobal = container.querySelector("#monetization-global-status");
    const monetizationUserTier = container.querySelector("#monetization-user-tier");

    // Tool visibility helper
    const populateToolsVisibility = () => {
      const visibilityList = container.querySelector("#tools-visibility-list");
      if (!visibilityList) return;

      visibilityList.innerHTML = "";

      const hiddenToolsStr = appInstance.getConfigValue("omnitool_hidden_tools", "");
      const hiddenToolsSet = new Set(hiddenToolsStr.split(",").filter(Boolean));

      appInstance.tools.forEach(tool => {
        const itemDiv = document.createElement("div");
        itemDiv.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 6px 8px; border-radius: 6px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04);";
        
        const isHidden = hiddenToolsSet.has(tool.id);
        const isAdmin = tool.id === "admin-settings";
        
        itemDiv.innerHTML = `
          <label style="display: flex; align-items: center; gap: 8px; cursor: ${isAdmin ? 'not-allowed' : 'pointer'}; flex: 1; font-size: 13px; font-weight: 500;">
            <input type="checkbox" class="tool-visibility-checkbox" data-tool-id="${tool.id}" ${!isHidden ? 'checked' : ''} ${isAdmin ? 'disabled' : ''} style="cursor: ${isAdmin ? 'not-allowed' : 'pointer'};">
            <span>${tool.name}</span>
          </label>
          <span style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-family: var(--font-mono);">${tool.subLabel}</span>
        `;
        visibilityList.appendChild(itemDiv);
      });
    };

    // Tool monetization tiers helper
    const populateToolsTiers = () => {
      const tiersList = container.querySelector("#tools-tiers-list");
      if (!tiersList) return;

      tiersList.innerHTML = "";

      let overrides = {};
      try {
        overrides = JSON.parse(localStorage.getItem("omnitool_monetization_overrides") || "{}");
      } catch (e) {}

      appInstance.tools.forEach(tool => {
        const itemDiv = document.createElement("div");
        itemDiv.style.cssText = "display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; border-radius: 6px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04); gap: 10px;";
        
        const currentOverride = overrides[tool.id] || "default";
        const builtInLevel = tool.monetization || "free";

        itemDiv.innerHTML = `
          <div style="flex: 1; text-align: left;">
            <div style="font-size: 13.5px; font-weight: 600; color: var(--text-main);">${tool.name}</div>
            <div style="font-size: 11px; color: var(--text-muted);">Built-in: <strong style="color: ${builtInLevel === 'free' ? 'var(--accent-emerald)' : builtInLevel === 'ad-lock' ? 'var(--accent-cyan)' : 'var(--accent-purple)'}; text-transform: uppercase;">${builtInLevel}</strong></div>
          </div>
          <select class="form-select tool-tier-override-select" data-tool-id="${tool.id}" style="width: 130px; height: 32px; font-size: 12px; padding: 0 8px; margin: 0; background: var(--bg-input); border-color: var(--border-color); color: var(--text-main);">
            <option value="default" ${currentOverride === 'default' ? 'selected' : ''}>Default</option>
            <option value="free" ${currentOverride === 'free' ? 'selected' : ''}>Free</option>
            <option value="ad-lock" ${currentOverride === 'ad-lock' ? 'selected' : ''}>Ad-Lock</option>
            <option value="premium" ${currentOverride === 'premium' ? 'selected' : ''}>Premium</option>
          </select>
        `;
        tiersList.appendChild(itemDiv);
      });
    };

    container.querySelector("#btn-visibility-select-all")?.addEventListener("click", (e) => {
      e.preventDefault();
      container.querySelectorAll(".tool-visibility-checkbox").forEach(cb => {
        cb.checked = true;
      });
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    container.querySelector("#btn-visibility-select-none")?.addEventListener("click", (e) => {
      e.preventDefault();
      container.querySelectorAll(".tool-visibility-checkbox").forEach(cb => {
        if (cb.getAttribute("data-tool-id") !== "admin-settings") {
          cb.checked = false;
        }
      });
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    // Populate overrides dropdown
    if (overrideToolSelect) {
      overrideToolSelect.innerHTML = '<option value="global">-- Global Default --</option>';
      appInstance.tools.forEach(tool => {
        if (tool.id !== "admin-settings") {
          const opt = document.createElement("option");
          opt.value = tool.id;
          opt.innerText = tool.name;
          overrideToolSelect.appendChild(opt);
        }
      });
    }

    let currentEditMode = "global";

    // Edit Page Override button action
    btnLoadOverride?.addEventListener("click", (e) => {
      e.preventDefault();
      const toolId = overrideToolSelect.value;
      
      if (toolId === "global") {
        currentEditMode = "global";
        sponsorEditStatus.innerText = "Global Defaults";
        sponsorEditStatus.style.color = "var(--accent-cyan)";
        sponsorEditStatus.style.borderColor = "rgba(0, 242, 254, 0.2)";
        sponsorEditStatus.style.background = "rgba(0, 242, 254, 0.1)";
        
        // Load global settings
        sponsorBrand.value = appInstance.getConfigValue("omnitool_sponsor_brand", "HexaCloud Host");
        sponsorIcon.value = appInstance.getConfigValue("omnitool_sponsor_icon", "cloud");
        sponsorSlogan.value = appInstance.getConfigValue("omnitool_sponsor_slogan", "Secure, lightning-fast PWA hosting and serverless deployments globally. Claim $5 credit.");
        sponsorUrl.value = appInstance.getConfigValue("omnitool_sponsor_url", "#");
        sponsorBtnText.value = appInstance.getConfigValue("omnitool_sponsor_btn_text", "Claim Now");
      } else {
        currentEditMode = toolId;
        const toolName = overrideToolSelect.options[overrideToolSelect.selectedIndex].text;
        sponsorEditStatus.innerText = `Override: ${toolName}`;
        sponsorEditStatus.style.color = "var(--accent-purple)";
        sponsorEditStatus.style.borderColor = "rgba(157, 78, 221, 0.2)";
        sponsorEditStatus.style.background = "rgba(157, 78, 221, 0.1)";
        
        // Load specific override or fall back to empty inputs to show they are unset
        sponsorBrand.value = localStorage.getItem("omnitool_sponsor_brand_" + toolId) || "";
        sponsorIcon.value = localStorage.getItem("omnitool_sponsor_icon_" + toolId) || "cloud";
        sponsorSlogan.value = localStorage.getItem("omnitool_sponsor_slogan_" + toolId) || "";
        sponsorUrl.value = localStorage.getItem("omnitool_sponsor_url_" + toolId) || "";
        sponsorBtnText.value = localStorage.getItem("omnitool_sponsor_btn_text_" + toolId) || "";
      }
      
      updateSimulatorPreview();
      appInstance.showToast(`Switched editor to: ${sponsorEditStatus.innerText}`, "info");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    // Delete Override button action
    btnDeleteOverride?.addEventListener("click", (e) => {
      e.preventDefault();
      const toolId = overrideToolSelect.value;
      if (toolId === "global") {
        appInstance.showToast("Cannot delete global defaults. Just edit them instead.", "error");
        return;
      }
      
      if (confirm(`Reset overrides for this page? It will restore the global defaults.`)) {
        localStorage.removeItem("omnitool_sponsor_brand_" + toolId);
        localStorage.removeItem("omnitool_sponsor_icon_" + toolId);
        localStorage.removeItem("omnitool_sponsor_slogan_" + toolId);
        localStorage.removeItem("omnitool_sponsor_url_" + toolId);
        localStorage.removeItem("omnitool_sponsor_btn_text_" + toolId);
        
        // Remove from list of overrides
        let overridesStr = localStorage.getItem("omnitool_sponsor_overrides") || "";
        let overrides = overridesStr.split(",").filter(Boolean);
        overrides = overrides.filter(id => id !== toolId);
        localStorage.setItem("omnitool_sponsor_overrides", overrides.join(","));

        // Reset inputs
        overrideToolSelect.value = "global";
        currentEditMode = "global";
        sponsorEditStatus.innerText = "Global Defaults";
        sponsorEditStatus.style.color = "var(--accent-cyan)";
        sponsorEditStatus.style.borderColor = "rgba(0, 242, 254, 0.2)";
        sponsorEditStatus.style.background = "rgba(0, 242, 254, 0.1)";
        
        sponsorBrand.value = appInstance.getConfigValue("omnitool_sponsor_brand", "HexaCloud Host");
        sponsorIcon.value = appInstance.getConfigValue("omnitool_sponsor_icon", "cloud");
        sponsorSlogan.value = appInstance.getConfigValue("omnitool_sponsor_slogan", "Secure, lightning-fast PWA hosting and serverless deployments globally. Claim $5 credit.");
        sponsorUrl.value = appInstance.getConfigValue("omnitool_sponsor_url", "#");
        sponsorBtnText.value = appInstance.getConfigValue("omnitool_sponsor_btn_text", "Claim Now");
        
        updateSimulatorPreview();
        appInstance.showToast("Page overrides deleted! Global default sponsor restored.", "success");
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('success');
        }
      }
    });

    // Load configs from storage
    const loadSettings = () => {
      adGlobal.checked = appInstance.getConfigValue("omnitool_ad_global", "true") !== "false";
      adNetwork.value = appInstance.getConfigValue("omnitool_ad_network", "dev");
      sidebarAdNetwork.value = appInstance.getConfigValue("omnitool_sidebar_ad_network", "inherit");
      showDash.checked = appInstance.getConfigValue("omnitool_ad_show_dash", "true") !== "false";
      showTool.checked = appInstance.getConfigValue("omnitool_ad_show_tool", "true") !== "false";
      showSide.checked = appInstance.getConfigValue("omnitool_ad_show_side", "true") !== "false";

      adsensePub.value = appInstance.getConfigValue("omnitool_adsense_pub", "ca-pub-XXXXXXXXXX");
      adsenseDash.value = appInstance.getConfigValue("omnitool_adsense_slot_dash", "1111111111");
      adsenseTool.value = appInstance.getConfigValue("omnitool_adsense_slot_tool", "2222222222");
      adsenseSide.value = appInstance.getConfigValue("omnitool_adsense_slot_side", "3333333333");

      admobApp.value = appInstance.getConfigValue("omnitool_admob_app", "ca-app-pub-XXXXXXXXXX~XXXXXXXXXX");
      admobDash.value = appInstance.getConfigValue("omnitool_admob_unit_dash", "ca-app-pub-XXXXXXXXXX/1111111111");
      admobTool.value = appInstance.getConfigValue("omnitool_admob_unit_tool", "ca-app-pub-XXXXXXXXXX/2222222222");
      admobSide.value = appInstance.getConfigValue("omnitool_admob_unit_side", "ca-app-pub-XXXXXXXXXX/3333333333");

      customCode.value = appInstance.getConfigValue("omnitool_custom_ad_html", `<!-- Custom Banner Mock -->\n<div class="custom-mock-banner" style="background: linear-gradient(135deg, #1e1b4b, #311042); border: 2px dashed #a21caf; padding: 20px; border-radius: 8px; text-align: center; color: #f472b6;">\n  <h3>Custom Premium Ad Space</h3>\n  <p>Your custom script or banner displays here.</p>\n</div>`);
      
      // Load developer sponsor config
      sponsorBrand.value = appInstance.getConfigValue("omnitool_sponsor_brand", "HexaCloud Host");
      sponsorIcon.value = appInstance.getConfigValue("omnitool_sponsor_icon", "cloud");
      sponsorSlogan.value = appInstance.getConfigValue("omnitool_sponsor_slogan", "Secure, lightning-fast PWA hosting and serverless deployments globally. Claim $5 credit.");
      sponsorUrl.value = appInstance.getConfigValue("omnitool_sponsor_url", "#");
      sponsorBtnText.value = appInstance.getConfigValue("omnitool_sponsor_btn_text", "Claim Now");
      coffeeUrl.value = appInstance.getConfigValue("omnitool_coffee_url", "");
      kofiUrl.value = appInstance.getConfigValue("omnitool_kofi_url", "");
      if (gumroadLifetime) gumroadLifetime.value = appInstance.getConfigValue("omnitool_gumroad_lifetime_url", "https://gumroad.com");
      if (gumroadMonthly) gumroadMonthly.value = appInstance.getConfigValue("omnitool_gumroad_monthly_url", "https://gumroad.com");
      if (paypalUrlInput) paypalUrlInput.value = appInstance.getConfigValue("omnitool_paypal_url", "https://www.paypal.com");
      if (razorpayUrlInput) razorpayUrlInput.value = appInstance.getConfigValue("omnitool_razorpay_url", "https://razorpay.com");
      if (upiIdInput) upiIdInput.value = appInstance.getConfigValue("omnitool_upi_id", "ravik0892@okaxis");
      if (upiNameInput) upiNameInput.value = appInstance.getConfigValue("omnitool_upi_name", "OmniTool Hub");
      if (bankNameInput) bankNameInput.value = appInstance.getConfigValue("omnitool_bank_name", "State Bank of India");
      if (bankHolderInput) bankHolderInput.value = appInstance.getConfigValue("omnitool_bank_holder", "OmniTool Hub");
      if (bankAccInput) bankAccInput.value = appInstance.getConfigValue("omnitool_bank_acc", "123456789012");
      if (bankIfscInput) bankIfscInput.value = appInstance.getConfigValue("omnitool_bank_ifsc", "SBIN0001234");
      if (cryptoUsdtInput) cryptoUsdtInput.value = appInstance.getConfigValue("omnitool_crypto_usdt", "TYDzmHwQkP2aE7wGz8hL9qR1vB4sN6mX5c");
      if (cryptoBtcInput) cryptoBtcInput.value = appInstance.getConfigValue("omnitool_crypto_btc", "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh");
      if (cryptoEthInput) cryptoEthInput.value = appInstance.getConfigValue("omnitool_crypto_eth", "0x71C53316E28b4923eFFe35E2D8527a2754664982");
      if (customLicenseKeys) customLicenseKeys.value = appInstance.getConfigValue("omnitool_custom_license_keys", "");
      if (adsterraSmartLink) {
        adsterraSmartLink.value = appInstance.getConfigValue("omnitool_adsterra_smart_link", "");
      }
      if (preserveSettingsReset) {
        preserveSettingsReset.checked = localStorage.getItem("omnitool_preserve_settings_on_reset") === "true";
      }

      // Load new settings
      appDensity.value = appInstance.getConfigValue("omnitool_layout_density", "comfortable");
      appStartup.value = appInstance.getConfigValue("omnitool_default_view", "dashboard");
      appClock.value = appInstance.getConfigValue("omnitool_clock_format", "24");
      appAudio.checked = appInstance.getConfigValue("omnitool_audio_feedback", "false") === "true";
      
      if (adminPasscode) {
        adminPasscode.value = appInstance.getConfigValue("omnitool_admin_passcode", "admin123");
      }

      // Load monetization settings
      monetizationGlobal.checked = localStorage.getItem("omnitool_monetization_active") === "true";
      monetizationUserTier.value = localStorage.getItem("omnitool_user_tier") || "free";

      toggleFormFields(adNetwork.value);
      updateSimulatorPreview();
      populateToolsVisibility();
      populateToolsTiers();
    };

    // Toggle fields depending on provider
    const toggleFormFields = (provider) => {
      container.querySelectorAll(".ad-network-fields").forEach(el => el.style.display = "none");
      const side = sidebarAdNetwork.value;
      const effectiveSide = side === "inherit" ? provider : side;

      if (provider === "dev" || effectiveSide === "dev") {
        container.querySelector("#inputs-dev").style.display = "block";
      }
      if (provider === "adsense" || effectiveSide === "adsense") {
        container.querySelector("#inputs-adsense").style.display = "block";
      }
      if (provider === "admob" || effectiveSide === "admob") {
        container.querySelector("#inputs-admob").style.display = "block";
      }
      if (provider === "custom" || effectiveSide === "custom") {
        container.querySelector("#inputs-custom").style.display = "block";
      }
    };

    // Update Simulator display
    const updateSimulatorPreview = () => {
      if (!adGlobal.checked) {
        previewBadge.innerText = "Disabled";
        previewBadge.style.color = "var(--accent-rose)";
        previewBadge.style.background = "rgba(244, 63, 94, 0.15)";
        previewBox.innerHTML = `
          <div class="ad-mock-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24">
              <circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
            </svg>
            <span>All Advertisements are Disabled globally.</span>
          </div>
        `;
        return;
      }

      const provider = adNetwork.value;
      if (provider === "dev") {
        const brandVal = sponsorBrand.value || "HexaCloud Hosting";
        const sloganVal = sponsorSlogan.value || "Deploy lightweight web pipelines locally with absolute security.";
        const btnVal = sponsorBtnText.value || "Deploy Now";
        const iconType = sponsorIcon.value || "cloud";
        
        let iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>`;
        if (iconType === "database") {
          iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`;
        } else if (iconType === "shield") {
          iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
        }

        previewBadge.innerText = "Local Sponsor";
        previewBadge.style.color = "var(--accent-cyan)";
        previewBadge.style.background = "rgba(0, 242, 254, 0.15)";
        previewBox.innerHTML = `
          <div class="sponsor-ad-block" style="margin: 0; border-color: rgba(0, 242, 254, 0.25); width: 100%;">
            <div class="ad-horizontal-left">
              <div class="ad-image-placeholder" style="color: var(--accent-cyan); border-color: var(--accent-cyan); background: rgba(var(--accent-cyan-rgb), 0.12);">
                ${iconSvg}
              </div>
              <div class="ad-info">
                <div class="ad-title-row">
                  <span class="ad-brand">${escapeHtml(brandVal)}</span>
                  <span class="ad-horizontal-badge">SPONSOR</span>
                </div>
                <span class="ad-slogan">${escapeHtml(sloganVal)}</span>
              </div>
            </div>
            <span class="ad-action-btn" style="background: rgba(0, 242, 254, 0.1); color: var(--accent-cyan); border-color: rgba(0, 242, 254, 0.2);">${escapeHtml(btnVal)}</span>
          </div>
        `;
      } else if (provider === "adsense") {
        previewBadge.innerText = "Google AdSense";
        previewBadge.style.color = "var(--accent-purple)";
        previewBadge.style.background = "rgba(157, 78, 221, 0.15)";
        previewBox.innerHTML = `
          <div class="admob-adsense-mock adsense">
            <div class="mock-badge">GOOGLE ADSENSE BANNER</div>
            <div class="mock-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              <span>AdSense Mock Display</span>
            </div>
            <div class="mock-details">
              <span><strong>Client ID:</strong> ${adsensePub.value}</span>
              <span>•</span>
              <span><strong>Dashboard Slot ID:</strong> ${adsenseDash.value}</span>
            </div>
          </div>
        `;
      } else if (provider === "admob") {
        previewBadge.innerText = "AdMob Banner";
        previewBadge.style.color = "var(--accent-emerald)";
        previewBadge.style.background = "rgba(16, 185, 129, 0.15)";
        previewBox.innerHTML = `
          <div class="admob-adsense-mock admob">
            <div class="mock-badge">ADMOB SMART BANNER</div>
            <div class="mock-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>AdMob Banner Simulation</span>
            </div>
            <div class="mock-details">
              <span><strong>App ID:</strong> ${admobApp.value.substring(0, 15)}...</span>
              <span>•</span>
              <span><strong>Unit ID:</strong> ${admobDash.value.substring(admobDash.value.lastIndexOf('/') + 1)}</span>
            </div>
          </div>
        `;
      } else if (provider === "custom") {
        previewBadge.innerText = "Custom HTML Block";
        previewBadge.style.color = "var(--accent-orange)";
        previewBadge.style.background = "rgba(245, 158, 11, 0.15)";
        previewBox.innerHTML = `
          <div style="width: 100%; border: 1px dashed rgba(245, 158, 11, 0.3); border-radius: 8px; overflow: hidden; padding: 12px; background: rgba(0,0,0,0.2);">
            <div style="font-size: 10px; font-family: var(--font-mono); color: var(--accent-orange); margin-bottom: 8px; border-bottom: 1px solid rgba(245, 158, 11, 0.2); padding-bottom: 4px;">RAW HTML PREVIEW</div>
            ${customCode.value.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '<div style="font-size: 11px; color: var(--text-muted); font-style: italic;">[Custom script execution sandboxed for preview]</div>')}
          </div>
        `;
      }
    };

    // Save configurations
    const saveSettings = () => {
      localStorage.setItem("omnitool_ad_global", adGlobal.checked ? "true" : "false");
      localStorage.setItem("omnitool_ad_network", adNetwork.value);
      localStorage.setItem("omnitool_sidebar_ad_network", sidebarAdNetwork.value);
      localStorage.setItem("omnitool_ad_show_dash", showDash.checked ? "true" : "false");
      localStorage.setItem("omnitool_ad_show_tool", showTool.checked ? "true" : "false");
      localStorage.setItem("omnitool_ad_show_side", showSide.checked ? "true" : "false");

      localStorage.setItem("omnitool_adsense_pub", adsensePub.value.trim());
      localStorage.setItem("omnitool_adsense_slot_dash", adsenseDash.value.trim());
      localStorage.setItem("omnitool_adsense_slot_tool", adsenseTool.value.trim());
      localStorage.setItem("omnitool_adsense_slot_side", adsenseSide.value.trim());

      localStorage.setItem("omnitool_admob_app", admobApp.value.trim());
      localStorage.setItem("omnitool_admob_unit_dash", admobDash.value.trim());
      localStorage.setItem("omnitool_admob_unit_tool", admobTool.value.trim());
      localStorage.setItem("omnitool_admob_unit_side", admobSide.value.trim());

      localStorage.setItem("omnitool_custom_ad_html", customCode.value);

      // Save developer sponsor config
      if (currentEditMode === "global") {
        localStorage.setItem("omnitool_sponsor_brand", sponsorBrand.value.trim());
        localStorage.setItem("omnitool_sponsor_icon", sponsorIcon.value);
        localStorage.setItem("omnitool_sponsor_slogan", sponsorSlogan.value.trim());
        localStorage.setItem("omnitool_sponsor_url", sponsorUrl.value.trim());
        localStorage.setItem("omnitool_sponsor_btn_text", sponsorBtnText.value.trim());
      } else {
        localStorage.setItem("omnitool_sponsor_brand_" + currentEditMode, sponsorBrand.value.trim());
        localStorage.setItem("omnitool_sponsor_icon_" + currentEditMode, sponsorIcon.value);
        localStorage.setItem("omnitool_sponsor_slogan_" + currentEditMode, sponsorSlogan.value.trim());
        localStorage.setItem("omnitool_sponsor_url_" + currentEditMode, sponsorUrl.value.trim());
        localStorage.setItem("omnitool_sponsor_btn_text_" + currentEditMode, sponsorBtnText.value.trim());
        
        let overridesStr = localStorage.getItem("omnitool_sponsor_overrides") || "";
        let overrides = overridesStr.split(",").filter(Boolean);
        if (!overrides.includes(currentEditMode)) {
          overrides.push(currentEditMode);
          localStorage.setItem("omnitool_sponsor_overrides", overrides.join(","));
        }
      }
      localStorage.setItem("omnitool_coffee_url", coffeeUrl.value.trim());
      localStorage.setItem("omnitool_kofi_url", kofiUrl.value.trim());
      if (gumroadLifetime) localStorage.setItem("omnitool_gumroad_lifetime_url", gumroadLifetime.value.trim());
      if (gumroadMonthly) localStorage.setItem("omnitool_gumroad_monthly_url", gumroadMonthly.value.trim());
      if (paypalUrlInput) localStorage.setItem("omnitool_paypal_url", paypalUrlInput.value.trim());
      if (razorpayUrlInput) localStorage.setItem("omnitool_razorpay_url", razorpayUrlInput.value.trim());
      if (upiIdInput) localStorage.setItem("omnitool_upi_id", upiIdInput.value.trim());
      if (upiNameInput) localStorage.setItem("omnitool_upi_name", upiNameInput.value.trim());
      if (bankNameInput) localStorage.setItem("omnitool_bank_name", bankNameInput.value.trim());
      if (bankHolderInput) localStorage.setItem("omnitool_bank_holder", bankHolderInput.value.trim());
      if (bankAccInput) localStorage.setItem("omnitool_bank_acc", bankAccInput.value.trim());
      if (bankIfscInput) localStorage.setItem("omnitool_bank_ifsc", bankIfscInput.value.trim());
      if (cryptoUsdtInput) localStorage.setItem("omnitool_crypto_usdt", cryptoUsdtInput.value.trim());
      if (cryptoBtcInput) localStorage.setItem("omnitool_crypto_btc", cryptoBtcInput.value.trim());
      if (cryptoEthInput) localStorage.setItem("omnitool_crypto_eth", cryptoEthInput.value.trim());
      if (customLicenseKeys) localStorage.setItem("omnitool_custom_license_keys", customLicenseKeys.value.trim());
      if (adsterraSmartLink) {
        localStorage.setItem("omnitool_adsterra_smart_link", adsterraSmartLink.value.trim());
      }
      if (preserveSettingsReset) {
        localStorage.setItem("omnitool_preserve_settings_on_reset", preserveSettingsReset.checked ? "true" : "false");
      }

      // Save new configurations
      localStorage.setItem("omnitool_accent_preset", activePreset);
      localStorage.setItem("omnitool_layout_density", appDensity.value);
      localStorage.setItem("omnitool_default_view", appStartup.value);
      localStorage.setItem("omnitool_clock_format", appClock.value);
      localStorage.setItem("omnitool_audio_feedback", appAudio.checked ? "true" : "false");
      
      if (adminPasscode) {
        localStorage.setItem("omnitool_admin_passcode", adminPasscode.value.trim());
      }

      // Save Monetization Tiers
      localStorage.setItem("omnitool_monetization_active", monetizationGlobal.checked ? "true" : "false");
      localStorage.setItem("omnitool_user_tier", monetizationUserTier.value);

      const overrides = {};
      container.querySelectorAll(".tool-tier-override-select").forEach(select => {
        const toolId = select.getAttribute("data-tool-id");
        const val = select.value;
        if (val !== "default") {
          overrides[toolId] = val;
        }
      });
      localStorage.setItem("omnitool_monetization_overrides", JSON.stringify(overrides));

      // Save hidden tools configuration
      const hiddenTools = [];
      container.querySelectorAll(".tool-visibility-checkbox").forEach(cb => {
        if (!cb.checked) {
          hiddenTools.push(cb.getAttribute("data-tool-id"));
        }
      });
      localStorage.setItem("omnitool_hidden_tools", hiddenTools.join(","));

      // Apply configurations instantly
      if (typeof appInstance.applyAccentPreset === 'function') {
        appInstance.applyAccentPreset();
      }
      if (typeof appInstance.buildSidebarToolMenu === 'function') {
        appInstance.buildSidebarToolMenu();
      }
      if (typeof appInstance.buildMegaMenu === 'function') {
        appInstance.buildMegaMenu();
      }
      if (typeof appInstance.refreshDonationButtons === 'function') {
        appInstance.refreshDonationButtons();
      }

      appInstance.showToast("✅ Settings saved! Changes are live instantly. Use \"Export Config\" to download ad-config.json for deployment.", "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('save');
      }
      updateSimulatorPreview();

      // Trigger active layouts update
      if (typeof appInstance.renderDashboard === 'function') {
        appInstance.renderDashboard();
      }
      
      // Update sidebar ad
      const sidebarAd = document.querySelector(".sidebar-sponsor-container");
      if (sidebarAd && typeof appInstance.getAdHtml === 'function') {
        sidebarAd.innerHTML = appInstance.getAdHtml("sidebar");
      }
    };

    // Export global configurations to ad-config.json
    const triggerAdConfigDownload = () => {
      const hiddenTools = [];
      container.querySelectorAll(".tool-visibility-checkbox").forEach(cb => {
        if (!cb.checked) {
          hiddenTools.push(cb.getAttribute("data-tool-id"));
        }
      });

      const data = {
        "omnitool_hidden_tools": hiddenTools.join(","),
        "omnitool_ad_global": adGlobal.checked ? "true" : "false",
        "omnitool_ad_network": adNetwork.value,
        "omnitool_sidebar_ad_network": sidebarAdNetwork.value,
        "omnitool_ad_show_dash": showDash.checked ? "true" : "false",
        "omnitool_ad_show_tool": showTool.checked ? "true" : "false",
        "omnitool_ad_show_side": showSide.checked ? "true" : "false",
        "omnitool_adsense_pub": adsensePub.value.trim(),
        "omnitool_adsense_slot_dash": adsenseDash.value.trim(),
        "omnitool_adsense_slot_tool": adsenseTool.value.trim(),
        "omnitool_adsense_slot_side": adsenseSide.value.trim(),
        "omnitool_admob_app": admobApp.value.trim(),
        "omnitool_admob_unit_dash": admobDash.value.trim(),
        "omnitool_admob_unit_tool": admobTool.value.trim(),
        "omnitool_admob_unit_side": admobSide.value.trim(),
        "omnitool_custom_ad_html": customCode.value,
        "omnitool_sponsor_brand": localStorage.getItem("omnitool_sponsor_brand") || "HexaCloud Host",
        "omnitool_sponsor_icon": localStorage.getItem("omnitool_sponsor_icon") || "cloud",
        "omnitool_sponsor_slogan": localStorage.getItem("omnitool_sponsor_slogan") || "Secure, lightning-fast PWA hosting and serverless deployments globally. Claim $5 credit.",
        "omnitool_sponsor_url": localStorage.getItem("omnitool_sponsor_url") || "#",
        "omnitool_sponsor_btn_text": localStorage.getItem("omnitool_sponsor_btn_text") || "Claim Now",
        "omnitool_coffee_url": coffeeUrl.value.trim(),
        "omnitool_kofi_url": kofiUrl.value.trim(),
        "omnitool_gumroad_lifetime_url": gumroadLifetime ? gumroadLifetime.value.trim() : "https://gumroad.com",
        "omnitool_gumroad_monthly_url": gumroadMonthly ? gumroadMonthly.value.trim() : "https://gumroad.com",
        "omnitool_paypal_url": paypalUrlInput ? paypalUrlInput.value.trim() : "https://www.paypal.com",
        "omnitool_razorpay_url": razorpayUrlInput ? razorpayUrlInput.value.trim() : "https://razorpay.com",
        "omnitool_upi_id": upiIdInput ? upiIdInput.value.trim() : "ravik0892@okaxis",
        "omnitool_upi_name": upiNameInput ? upiNameInput.value.trim() : "OmniTool Hub",
        "omnitool_bank_name": bankNameInput ? bankNameInput.value.trim() : "State Bank of India",
        "omnitool_bank_holder": bankHolderInput ? bankHolderInput.value.trim() : "OmniTool Hub",
        "omnitool_bank_acc": bankAccInput ? bankAccInput.value.trim() : "123456789012",
        "omnitool_bank_ifsc": bankIfscInput ? bankIfscInput.value.trim() : "SBIN0001234",
        "omnitool_crypto_usdt": cryptoUsdtInput ? cryptoUsdtInput.value.trim() : "TYDzmHwQkP2aE7wGz8hL9qR1vB4sN6mX5c",
        "omnitool_crypto_btc": cryptoBtcInput ? cryptoBtcInput.value.trim() : "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        "omnitool_crypto_eth": cryptoEthInput ? cryptoEthInput.value.trim() : "0x71C53316E28b4923eFFe35E2D8527a2754664982",
        "omnitool_adsterra_smart_link": adsterraSmartLink ? adsterraSmartLink.value.trim() : "",
        "omnitool_preserve_settings_on_reset": preserveSettingsReset ? (preserveSettingsReset.checked ? "true" : "false") : "false",
        "omnitool_accent_preset": activePreset,
        "omnitool_layout_density": appDensity.value,
        "omnitool_default_view": appStartup.value,
        "omnitool_clock_format": appClock.value,
        "omnitool_audio_feedback": appAudio.checked ? "true" : "false",
        "omnitool_admin_passcode": adminPasscode ? adminPasscode.value.trim() : "admin123",
        "omnitool_monetization_active": monetizationGlobal.checked ? "true" : "false",
        "omnitool_user_tier": monetizationUserTier.value,
        "omnitool_monetization_overrides": localStorage.getItem("omnitool_monetization_overrides") || "{}"
      };

      const overridesStr = localStorage.getItem("omnitool_sponsor_overrides") || "";
      data["omnitool_sponsor_overrides"] = overridesStr;
      overridesStr.split(",").filter(Boolean).forEach(toolId => {
        data["omnitool_sponsor_brand_" + toolId] = localStorage.getItem("omnitool_sponsor_brand_" + toolId) || "";
        data["omnitool_sponsor_icon_" + toolId] = localStorage.getItem("omnitool_sponsor_icon_" + toolId) || "cloud";
        data["omnitool_sponsor_slogan_" + toolId] = localStorage.getItem("omnitool_sponsor_slogan_" + toolId) || "";
        data["omnitool_sponsor_url_" + toolId] = localStorage.getItem("omnitool_sponsor_url_" + toolId) || "";
        data["omnitool_sponsor_btn_text_" + toolId] = localStorage.getItem("omnitool_sponsor_btn_text_" + toolId) || "";
      });

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ad-config.json";
      a.click();
      URL.revokeObjectURL(url);
      appInstance.showToast("ad-config.json downloaded! Place this file in your website root folder to apply configurations globally.", "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    };

    // Import Trigger
    const fileInput = container.querySelector("#app-backup-file-input");
    container.querySelector("#app-backup-import-trigger")?.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const data = JSON.parse(evt.target.result);
          let count = 0;
          for (const [key, value] of Object.entries(data)) {
            if (key.startsWith("omnitool_")) {
              localStorage.setItem(key, value);
              count++;
            }
          }
          appInstance.showToast(`Restored ${count} configurations. Reloading...`, "success");
          if (typeof appInstance.playSynthSound === 'function') {
            appInstance.playSynthSound('success');
          }
          setTimeout(() => location.reload(), 1200);
        } catch (err) {
          appInstance.showToast("Failed to parse backup JSON file.", "error");
          if (typeof appInstance.playSynthSound === 'function') {
            appInstance.playSynthSound('error');
          }
        }
      };
      reader.readAsText(file);
    });

    // Listeners bindings
    adNetwork.addEventListener("change", (e) => {
      toggleFormFields(e.target.value);
      updateSimulatorPreview();
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    sidebarAdNetwork.addEventListener("change", (e) => {
      toggleFormFields(adNetwork.value);
      updateSimulatorPreview();
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    adGlobal.addEventListener("change", () => {
      updateSimulatorPreview();
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });
    
    [adsensePub, adsenseDash, adsenseTool, adsenseSide, admobApp, admobDash, admobTool, admobSide, customCode, sponsorBrand, sponsorSlogan, sponsorUrl, sponsorBtnText, coffeeUrl].forEach(inp => {
      inp.addEventListener("input", updateSimulatorPreview);
    });

    sponsorIcon.addEventListener("change", () => {
      updateSimulatorPreview();
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    [appDensity, appStartup, appClock].forEach(sel => {
      sel.addEventListener("change", () => {
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('click');
        }
      });
    });

    appAudio.addEventListener("change", () => {
      localStorage.setItem("omnitool_audio_feedback", appAudio.checked ? "true" : "false");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    });

    container.querySelector("#ad-settings-save")?.addEventListener("click", saveSettings);
    container.querySelector("#app-backup-export")?.addEventListener("click", triggerAdConfigDownload);
    
    container.querySelector("#ad-settings-reset")?.addEventListener("click", () => {
      if (confirm("Reset Settings and ad placements to defaults?")) {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("omnitool_ad_") || key.startsWith("omnitool_adsense_") || key.startsWith("omnitool_admob_") || key.startsWith("omnitool_custom_")) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
        loadSettings();
        appInstance.showToast("Ad parameters reset to default.", "info");
      }
    });

    // Maintenance Handlers
    container.querySelector("#app-clear-recents")?.addEventListener("click", () => {
      localStorage.removeItem("omnitool_recents");
      appInstance.recents = [];
      appInstance.renderRecents();
      appInstance.showToast("Recent tools list cleared.", "info");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    });

    container.querySelector("#app-clear-favs")?.addEventListener("click", () => {
      localStorage.removeItem("omnitool_favs");
      appInstance.favorites = new Set();
      appInstance.renderFavoritesCount();
      appInstance.renderDashboard();
      appInstance.showToast("Favorites catalog reset.", "info");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    });

    container.querySelector("#app-hard-reset")?.addEventListener("click", () => {
      if (confirm("⚠️ WARNING: This will factory reset all stored tools metrics, custom parameters, theme overrides, and ad configurations. Proceed?")) {
        localStorage.clear();
        sessionStorage.clear();
        appInstance.showToast("Factory reset complete! Reloading...", "error");
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('error');
        }
        setTimeout(() => {
          location.reload();
        }, 1200);
      }
    });

    // Examples Tab Switching
    let activeExampleIndex = 0;
    const tabBtns = container.querySelectorAll(".tool-guide-example-tab-btn");
    const rows = container.querySelectorAll(".tool-guide-io-row");

    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeExampleIndex = parseInt(btn.getAttribute("data-index"), 10);
        rows.forEach((row, idx) => {
          row.style.display = (idx === activeExampleIndex) ? "flex" : "none";
        });
      });
    });

    container.querySelector("#settings-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        const swatch = container.querySelector(".color-swatch-item[data-preset='vaporwave']");
        if (swatch) {
          swatch.click();
          appInstance.showToast("Selected Vaporwave theme! Click 'Save All Customizations' to apply.", "success");
        }
      } else {
        const densitySelect = container.querySelector("#app-density-select");
        if (densitySelect) {
          densitySelect.value = "compact";
          densitySelect.dispatchEvent(new Event("change"));
          appInstance.showToast("Set Dashboard Density to Compact! Click 'Save All Customizations' to apply.", "success");
        }
      }
    });

    // Startup load
    loadSettings();
  }
};
