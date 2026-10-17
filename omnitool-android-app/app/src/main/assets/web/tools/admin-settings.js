import { escapeHtml } from './utils.js';

export default {
  id: "admin-settings",
  name: "Settings & Ad Control Panel",
  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; border-bottom: 1px solid var(--border-color); padding-bottom: 12px;">
            <div>
              <h3 style="margin: 0; font-size: 18px; font-weight: 800; color: var(--text-main);">OmniTool Hub Control Center</h3>
              <div style="font-size: 11px; color: #10b981; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; margin-top: 4px;">
                <span style="width: 7px; height: 7px; border-radius: 50%; background: #10b981; display: inline-block;"></span>
                Engine v1.3.0 Live • Client-Side Security &amp; Offline Storage Active
              </div>
            </div>
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <button type="button" class="tool-btn secondary" id="btn-adm-lock-session" style="font-size: 11.5px; height: 34px; padding: 0 10px; color: var(--accent-rose); border-color: rgba(244, 63, 94, 0.3);" title="Lock Admin Session and return to dashboard">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span>Lock &amp; Exit</span>
              </button>
              <button type="button" class="tool-btn secondary" id="btn-adm-hard-refresh" style="font-size: 11.5px; height: 34px; padding: 0 10px;" title="Purge browser service worker cache and reload latest files">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19"/></svg>
                <span>Force Refresh / Clear Cache</span>
              </button>
              <button type="button" class="tool-btn primary" id="btn-adm-save-top" style="font-size: 12px; height: 34px; padding: 0 16px; font-weight: 700;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                <span>Save All Settings</span>
              </button>
            </div>
          </div>

          <!-- Tabs Nav bar with Modern Pill Styling -->
          <div class="settings-tabs-bar" style="display: flex; flex-wrap: wrap; gap: 8px; padding-bottom: 12px; margin-bottom: 18px; border-bottom: 1px solid var(--border-color);">
            <button class="settings-tab-btn active" data-tab="tab-payments" style="background: rgba(0, 242, 254, 0.12); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); font-weight: 700; cursor: pointer; padding: 8px 14px; font-size: 13px; border-radius: 8px; outline: none; white-space: nowrap; transition: all 0.2s;">💳 Payment &amp; Checkout</button>
            <button class="settings-tab-btn" data-tab="tab-ads" style="background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-muted); font-weight: 600; cursor: pointer; padding: 8px 14px; font-size: 13px; border-radius: 8px; outline: none; white-space: nowrap; transition: all 0.2s;">📢 Monetization &amp; Ads</button>
            <button class="settings-tab-btn" data-tab="tab-aesthetics" style="background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-muted); font-weight: 600; cursor: pointer; padding: 8px 14px; font-size: 13px; border-radius: 8px; outline: none; white-space: nowrap; transition: all 0.2s;">🎨 Theme &amp; Aesthetics</button>
            <button class="settings-tab-btn" data-tab="tab-tools-visibility" style="background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-muted); font-weight: 600; cursor: pointer; padding: 8px 14px; font-size: 13px; border-radius: 8px; outline: none; white-space: nowrap; transition: all 0.2s;">👁️ Tool Visibility</button>
            <button class="settings-tab-btn" data-tab="tab-tiers" style="background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-muted); font-weight: 600; cursor: pointer; padding: 8px 14px; font-size: 13px; border-radius: 8px; outline: none; white-space: nowrap; transition: all 0.2s;">🔒 Monetization Tiers</button>
            <button class="settings-tab-btn" data-tab="tab-backup" style="background: var(--bg-input); border: 1px solid var(--border-color); color: var(--text-muted); font-weight: 600; cursor: pointer; padding: 8px 14px; font-size: 13px; border-radius: 8px; outline: none; white-space: nowrap; transition: all 0.2s;">⚙️ Backup &amp; System</button>
          </div>


          <!-- TAB: Payment & Checkout Control -->
          <div id="tab-payments" class="settings-tab-content">
            <!-- Header with Live Test CTA -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid var(--border-color); flex-wrap: wrap; gap: 8px;">
              <div>
                <div style="font-size: 13.5px; font-weight: 800; color: var(--accent-cyan); letter-spacing: 0.5px; display: flex; align-items: center; gap: 8px;">
                  <span>💳</span> UNIFIED PAYMENT GATEWAYS &amp; CHECKOUT
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
                  Configure UPI multi-account routing, bank transfers, international cards, custom gateways, and prices.
                </div>
              </div>
              <button type="button" class="tool-btn primary" id="btn-adm-test-checkout" style="font-size: 11px; height: 32px; padding: 0 12px; display: flex; align-items: center; gap: 6px; white-space: nowrap;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                <span>Test Live Checkout</span>
              </button>
            </div>

            <!-- Card 1: Active Payment Gateways in Checkout -->
            <div class="adm-pay-card" style="margin-bottom: 16px; padding: 14px; border-radius: 10px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <span style="font-weight: 700; font-size: 12px; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.5px;">1. Enable / Disable Customer Gateways</span>
                <span style="font-size: 10.5px; color: var(--text-muted);">Unchecked options are hidden from checkout modal</span>
              </div>
              <div class="adm-gw-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(135px, 1fr)); gap: 8px;">
                <label class="adm-gw-pill">
                  <input type="checkbox" id="gw-toggle-upi" checked>
                  <span class="adm-gw-icon">⚡</span>
                  <span class="adm-gw-label">UPI &amp; QR</span>
                </label>
                <label class="adm-gw-pill">
                  <input type="checkbox" id="gw-toggle-bank">
                  <span class="adm-gw-icon">🏦</span>
                  <span class="adm-gw-label">Bank Transfer</span>
                </label>
                <label class="adm-gw-pill">
                  <input type="checkbox" id="gw-toggle-gumroad" checked>
                  <span class="adm-gw-icon">🛒</span>
                  <span class="adm-gw-label">Gumroad (Cards)</span>
                </label>
                <label class="adm-gw-pill">
                  <input type="checkbox" id="gw-toggle-paypal" checked>
                  <span class="adm-gw-icon">🅿️</span>
                  <span class="adm-gw-label">PayPal</span>
                </label>
                <label class="adm-gw-pill">
                  <input type="checkbox" id="gw-toggle-razorpay" checked>
                  <span class="adm-gw-icon">💳</span>
                  <span class="adm-gw-label">Razorpay</span>
                </label>
                <label class="adm-gw-pill">
                  <input type="checkbox" id="gw-toggle-crypto" checked>
                  <span class="adm-gw-icon">🪙</span>
                  <span class="adm-gw-label">Crypto (USDT)</span>
                </label>
                <label class="adm-gw-pill">
                  <input type="checkbox" id="gw-toggle-coffee" checked>
                  <span class="adm-gw-icon">☕</span>
                  <span class="adm-gw-label">Ko-fi / Coffee</span>
                </label>
                <label class="adm-gw-pill">
                  <input type="checkbox" id="gw-toggle-guide" checked>
                  <span class="adm-gw-icon">📖</span>
                  <span class="adm-gw-label">Payment Guide</span>
                </label>
                <label class="adm-gw-pill adm-gw-pill-custom">
                  <input type="checkbox" id="gw-toggle-custom">
                  <span class="adm-gw-icon">✨</span>
                  <span class="adm-gw-label">Custom Gateway</span>
                </label>
              </div>
            </div>

            <!-- Card 2: UPI Multi-Account Routing -->
            <div class="adm-pay-card" style="margin-bottom: 16px; padding: 14px; border-radius: 10px; background: rgba(0, 242, 254, 0.02); border: 1px solid rgba(0, 242, 254, 0.2);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 700; font-size: 12px; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.5px;">2. UPI Configuration &amp; App Routing</span>
                <span id="upi-mode-badge" style="font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; background: rgba(0, 242, 254, 0.15); color: var(--accent-cyan); border: 1px solid rgba(0, 242, 254, 0.3);">Mode: Single Universal UPI</span>
              </div>
              <p style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 12px;">Choose whether you want one universal UPI ID across all apps, or set dedicated separate UPI accounts per app (GPay, PhonePe, Paytm, BHIM, Cred).</p>

              <!-- Mode Selection Buttons -->
              <div class="adm-upi-mode-selector" style="display: flex; gap: 10px; margin-bottom: 14px; flex-wrap: wrap;">
                <label class="adm-mode-btn" style="flex: 1; min-width: 220px;">
                  <input type="radio" name="omnitool_upi_mode_radio" value="single" checked id="upi-mode-single">
                  <div class="adm-mode-box">
                    <strong>⚡ Single Universal UPI ID</strong>
                    <small>One UPI ID is used everywhere across GPay, PhonePe, Paytm, BHIM, and QR code.</small>
                  </div>
                </label>
                <label class="adm-mode-btn" style="flex: 1; min-width: 220px;">
                  <input type="radio" name="omnitool_upi_mode_radio" value="per_app" id="upi-mode-per-app">
                  <div class="adm-mode-box">
                    <strong>🎯 Separate UPI Account per App</strong>
                    <small>Route payments to different bank accounts depending on which app the user clicks.</small>
                  </div>
                </label>
              </div>

              <!-- Universal UPI Inputs -->
              <div class="form-row">
                <div class="form-group">
                  <label for="upi-gateway-id">Universal Primary UPI ID (VPA) <span style="color: var(--accent-rose);">*</span></label>
                  <input type="text" class="form-input" id="upi-gateway-id" placeholder="e.g. ravik0892@okaxis">
                  <span style="font-size: 10.5px; color: var(--text-muted); margin-top: 3px; display: block;">Used for QR Code and fallback for apps without dedicated IDs.</span>
                </div>
                <div class="form-group">
                  <label for="upi-gateway-name">Payee / Merchant Business Name <span style="color: var(--accent-rose);">*</span></label>
                  <input type="text" class="form-input" id="upi-gateway-name" placeholder="e.g. OmniTool Hub">
                  <span style="font-size: 10.5px; color: var(--text-muted); margin-top: 3px; display: block;">Displays on customer's UPI payment screen.</span>
                </div>
              </div>

              <!-- Dedicated App UPI Inputs Container -->
              <div id="upi-per-app-container" style="margin-top: 10px; padding: 12px; border-radius: 8px; background: rgba(0, 0, 0, 0.25); border: 1px dashed rgba(0, 242, 254, 0.25); display: none;">
                <div style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
                  <span>🎯 App-Specific UPI Accounts</span>
                  <span style="font-size: 10px; font-weight: 500; color: var(--text-muted);">Leave empty to use Universal UPI</span>
                </div>
                <div class="form-row" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                  <div class="form-group">
                    <label for="upi-gpay-id" style="font-size: 11.5px;">🔵 Google Pay UPI ID</label>
                    <input type="text" class="form-input" id="upi-gpay-id" placeholder="e.g. ravik-gpay@oksbi">
                  </div>
                  <div class="form-group">
                    <label for="upi-phonepe-id" style="font-size: 11.5px;">🟣 PhonePe UPI ID</label>
                    <input type="text" class="form-input" id="upi-phonepe-id" placeholder="e.g. ravik-phonepe@ybl">
                  </div>
                </div>
                <div class="form-row" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-top: 6px;">
                  <div class="form-group">
                    <label for="upi-paytm-id" style="font-size: 11.5px;">🔷 Paytm UPI ID</label>
                    <input type="text" class="form-input" id="upi-paytm-id" placeholder="e.g. ravik-paytm@paytm">
                  </div>
                  <div class="form-group">
                    <label for="upi-bhim-id" style="font-size: 11.5px;">🟢 BHIM UPI ID</label>
                    <input type="text" class="form-input" id="upi-bhim-id" placeholder="e.g. ravik-bhim@upi">
                  </div>
                  <div class="form-group">
                    <label for="upi-cred-id" style="font-size: 11.5px;">⚪ CRED UPI ID</label>
                    <input type="text" class="form-input" id="upi-cred-id" placeholder="e.g. ravik-cred@axisbank">
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 3: Direct Bank Transfer -->
            <div class="adm-pay-card" style="margin-bottom: 16px; padding: 14px; border-radius: 10px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 6px;">
                <span style="font-weight: 700; font-size: 12px; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.5px;">
                  3. Direct Bank Transfer (IMPS / NEFT / RTGS)
                </span>
                <span style="font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3);">
                  🛡️ Security Recommendation: Kept hidden on public checkout by default
                </span>
              </div>
              <p style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 12px; line-height: 1.45;">
                <strong style="color: #f59e0b;">Privacy &amp; Security Note:</strong> Showing your personal savings bank account number publicly increases exposure to targeted phishing and fraudulent dispute freezes. UPI &amp; Gateways handle retail payments much more securely. Enable "Bank Transfer" in Card 1 only if you explicitly need manual bank transfers.
              </p>
              <div class="form-row">
                <div class="form-group">
                  <label for="bank-gateway-name">Bank Name</label>
                  <input type="text" class="form-input" id="bank-gateway-name" placeholder="e.g. State Bank of India">
                </div>
                <div class="form-group">
                  <label for="bank-gateway-holder">Account Beneficiary Name</label>
                  <input type="text" class="form-input" id="bank-gateway-holder" placeholder="e.g. OmniTool Hub">
                </div>
              </div>
              <div class="form-row" style="margin-top: 6px;">
                <div class="form-group">
                  <label for="bank-gateway-acc">Account Number</label>
                  <input type="text" class="form-input" id="bank-gateway-acc" placeholder="e.g. 123456789012">
                </div>
                <div class="form-group">
                  <label for="bank-gateway-ifsc">IFSC Code</label>
                  <input type="text" class="form-input" id="bank-gateway-ifsc" placeholder="e.g. SBIN0001234">
                </div>
              </div>
            </div>

            <!-- Card 4: Cards & International Processors -->
            <div class="adm-pay-card" style="margin-bottom: 16px; padding: 14px; border-radius: 10px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color);">
              <div style="font-weight: 700; font-size: 12px; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                4. International Processors &amp; Donations
              </div>
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
              <div class="form-row" style="margin-top: 6px;">
                <div class="form-group">
                  <label for="paypal-client-id">PayPal Client ID <span style="font-size: 10px; color: #10b981; font-weight: 700;">(⚡ 100% Automated Smart Checkout)</span></label>
                  <input type="text" class="form-input" id="paypal-client-id" placeholder="e.g. A21AAK... (From developer.paypal.com - 100% Free)">
                  <span style="font-size: 10.5px; color: var(--text-muted); margin-top: 3px; display: block;">When set, official PayPal Smart Buttons render in checkout and unlock PRO in 0-seconds with zero manual work.</span>
                </div>
                <div class="form-group">
                  <label for="paypal-gateway-url">Fallback PayPal Profile Link</label>
                  <input type="text" class="form-input" id="paypal-gateway-url" placeholder="e.g. https://www.paypal.com/paypalme/yourusername">
                  <span style="font-size: 10.5px; color: var(--text-muted); margin-top: 3px; display: block;">Used if PayPal Smart Buttons are not configured.</span>
                </div>
              </div>
              <div class="form-row" style="margin-top: 6px;">
                <div class="form-group">
                  <label for="razorpay-gateway-url">Razorpay Payment Page URL</label>
                  <input type="text" class="form-input" id="razorpay-gateway-url" placeholder="e.g. https://rzp.io/l/yourlink">
                </div>
              </div>
              <div class="form-row" style="margin-top: 6px;">
                <div class="form-group">
                  <label for="coffee-url">Buy Me a Coffee URL</label>
                  <input type="text" class="form-input" id="coffee-url" placeholder="e.g. https://www.buymeacoffee.com/yourusername">
                </div>
                <div class="form-group">
                  <label for="kofi-url">Ko-fi Donation URL</label>
                  <input type="text" class="form-input" id="kofi-url" placeholder="e.g. https://ko-fi.com/yourusername">
                </div>
              </div>
            </div>

            <!-- Card 5: Cryptocurrency Wallets -->
            <div class="adm-pay-card" style="margin-bottom: 16px; padding: 14px; border-radius: 10px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color);">
              <div style="font-weight: 700; font-size: 12px; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                5. Cryptocurrency Wallets
              </div>
              <div class="form-group">
                <label for="crypto-usdt-address">USDT Deposit Address (TRC-20)</label>
                <input type="text" class="form-input" id="crypto-usdt-address" placeholder="e.g. TYDzmHwQkP2aE7wGz8hL9qR1vB4sN6mX5c">
              </div>
              <div class="form-row" style="margin-top: 6px;">
                <div class="form-group">
                  <label for="crypto-btc-address">Bitcoin Address (BTC)</label>
                  <input type="text" class="form-input" id="crypto-btc-address" placeholder="e.g. bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh">
                </div>
                <div class="form-group">
                  <label for="crypto-eth-address">Ethereum Address (ETH / ERC-20)</label>
                  <input type="text" class="form-input" id="crypto-eth-address" placeholder="e.g. 0x71C53316E28b4923eFFe35E2D8527a2754664982">
                </div>
              </div>
            </div>

            <!-- Card 6: Custom Payment System Builder -->
            <div class="adm-pay-card" style="margin-bottom: 16px; padding: 14px; border-radius: 10px; background: rgba(157, 78, 221, 0.03); border: 1px solid rgba(157, 78, 221, 0.25);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 700; font-size: 12px; color: var(--accent-purple); text-transform: uppercase; letter-spacing: 0.5px;">6. Custom Payment System Builder</span>
                <span style="font-size: 10.5px; color: var(--accent-purple); font-weight: 600;">Add Stripe, CashApp, Revolut, Zelle, or Invoicing</span>
              </div>
              <p style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 12px;">Add any custom payment method. Enable "Custom Gateway" in Card 1 above, then configure its appearance and checkout link here.</p>
              
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; align-items: center; padding: 8px 10px; border-radius: 8px; background: rgba(0,0,0,0.2); border: 1px dashed rgba(157, 78, 221, 0.3);">
                <span style="font-size: 11px; color: var(--accent-purple); font-weight: 700;">1-Click Template:</span>
                <button type="button" class="tool-btn secondary" id="preset-custom-stripe" style="font-size: 11px; padding: 3px 8px; height: 26px;">💳 Stripe</button>
                <button type="button" class="tool-btn secondary" id="preset-custom-cashapp" style="font-size: 11px; padding: 3px 8px; height: 26px;">💵 Cash App</button>
                <button type="button" class="tool-btn secondary" id="preset-custom-revolut" style="font-size: 11px; padding: 3px 8px; height: 26px;">🟣 Revolut</button>
                <button type="button" class="tool-btn secondary" id="preset-custom-zelle" style="font-size: 11px; padding: 3px 8px; height: 26px;">⚡ Zelle</button>
                <button type="button" class="tool-btn secondary" id="preset-custom-wise" style="font-size: 11px; padding: 3px 8px; height: 26px;">🌐 Wise</button>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="custom-gw-tab-label">Checkout Modal Tab Label</label>
                  <input type="text" class="form-input" id="custom-gw-tab-label" placeholder="e.g. Stripe Checkout / CashApp">
                </div>
                <div class="form-group">
                  <label for="custom-gw-icon">Tab Icon (Emoji)</label>
                  <input type="text" class="form-input" id="custom-gw-icon" placeholder="e.g. 💳, ⚡, 🌐">
                </div>
              </div>
              <div class="form-row" style="margin-top: 6px;">
                <div class="form-group">
                  <label for="custom-gw-title">Gateway Banner Title</label>
                  <input type="text" class="form-input" id="custom-gw-title" placeholder="e.g. Direct Card / Stripe Payment">
                </div>
                <div class="form-group">
                  <label for="custom-gw-badge">Badge / Subtitle</label>
                  <input type="text" class="form-input" id="custom-gw-badge" placeholder="e.g. Instant License Activation">
                </div>
              </div>
              <div class="form-row" style="margin-top: 6px;">
                <div class="form-group">
                  <label for="custom-gw-url">Payment Link / External Checkout URL</label>
                  <input type="text" class="form-input" id="custom-gw-url" placeholder="e.g. https://buy.stripe.com/your-payment-link">
                </div>
                <div class="form-group">
                  <label for="custom-gw-btn-text">Button Call-to-Action Text</label>
                  <input type="text" class="form-input" id="custom-gw-btn-text" placeholder="e.g. Pay via Stripe / Open CashApp">
                </div>
              </div>
              <div class="form-group" style="margin-top: 6px;">
                <label for="custom-gw-desc">Customer Instructions / Description</label>
                <input type="text" class="form-input" id="custom-gw-desc" placeholder="e.g. Secure 256-bit encrypted card checkout powered by Stripe.">
              </div>
              <div class="form-group" style="margin-top: 6px;">
                <label for="custom-gw-features">Key Feature Bullet Points (One per line)</label>
                <textarea class="input-textarea" id="custom-gw-features" style="min-height: 70px;" placeholder="✔ 256-Bit SSL Encrypted checkout&#10;✔ Instant automated verification&#10;✔ Supports Visa, Mastercard, Apple Pay"></textarea>
              </div>
            </div>

            <!-- Card 7: Dynamic Pricing Controls -->
            <div class="adm-pay-card" style="margin-bottom: 16px; padding: 14px; border-radius: 10px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color);">
              <div style="font-weight: 700; font-size: 12px; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                7. Dynamic Pricing &amp; Currency Controls
              </div>
              <p style="font-size: 11.5px; color: var(--text-muted); margin-bottom: 10px;">Customize displayed plan amounts and UPI payment request values without touching code.</p>
              <div class="form-row">
                <div class="form-group">
                  <label for="price-lifetime-usd">Lifetime Pass Price (USD)</label>
                  <input type="text" class="form-input" id="price-lifetime-usd" placeholder="e.g. $29.99">
                </div>
                <div class="form-group">
                  <label for="price-lifetime-inr">Lifetime Pass Price (INR)</label>
                  <input type="text" class="form-input" id="price-lifetime-inr" placeholder="e.g. ₹2,499">
                </div>
              </div>
              <div class="form-row" style="margin-top: 6px;">
                <div class="form-group">
                  <label for="price-monthly-usd">Pro Monthly Price (USD)</label>
                  <input type="text" class="form-input" id="price-monthly-usd" placeholder="e.g. $4.99">
                </div>
                <div class="form-group">
                  <label for="price-monthly-inr">Pro Monthly Price (INR)</label>
                  <input type="text" class="form-input" id="price-monthly-inr" placeholder="e.g. ₹399">
                </div>
              </div>
            </div>

            <!-- Card 8: VIP Custom License Keys -->
            <div class="adm-pay-card" style="margin-bottom: 16px; padding: 14px; border-radius: 10px; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color);">
              <div style="font-weight: 700; font-size: 12px; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                8. VIP Pre-Generated License Keys
              </div>
              <div class="form-group">
                <label for="custom-license-keys">Custom Pre-Generated License Keys (Comma-separated)</label>
                <input type="text" class="form-input" id="custom-license-keys" placeholder="e.g. VIP-2026, EARLY-BIRD-PASS, MONTHLY-DEV">
                <p style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">Optional custom license keys or promotional codes you want to distribute to specific customers. Keys starting with "MONTHLY-" activate Pro Monthly; all others activate Lifetime Pass.</p>
              </div>
            </div>
          </div>

          <!-- TAB: Monetization & Ads Content -->
          <div id="tab-ads" class="settings-tab-content" style="display: none;">
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
              <label for="ad-network-select">Active Ad Provider (Dashboard &amp; Tools)</label>
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

            <!-- Cryptographic License Key Generator -->
            <div class="form-group" style="margin-top: 24px; padding: 16px; border: 1px solid rgba(0, 242, 254, 0.35); border-radius: 8px; background: rgba(0, 242, 254, 0.05);">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <span style="font-size: 18px;">🔑</span>
                <strong style="color: var(--accent-cyan); font-size: 14px;">Cryptographic License Key Generator</strong>
              </div>
              <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5;">
                Issue mathematically verified digital license keys for clients who pay via direct UPI QR, IMPS Bank Transfer, or Crypto. These keys are digitally signed and cannot be forged.
              </p>
              <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px;">
                <select class="form-select" id="admin-gen-tier" style="flex: 1; min-width: 140px; height: 36px; font-size: 12.5px;">
                  <option value="lifetime">Lifetime PRO (OMNI-PRO-...)</option>
                  <option value="premium">Pro Monthly (OMNI-MON-...)</option>
                </select>
                <input type="text" class="form-input" id="admin-gen-cust-id" placeholder="Client Name or Order ID" style="flex: 1; min-width: 140px; height: 36px; font-size: 12.5px;">
                <button type="button" class="tool-btn primary" id="admin-gen-btn" style="height: 36px; padding: 0 16px; font-size: 12.5px;">
                  ⚡ Generate Key
                </button>
              </div>
              <div id="admin-gen-result-box" style="display: none; margin-top: 10px; background: rgba(0,0,0,0.3); padding: 12px 14px; border-radius: 6px; border: 1px solid var(--border-color);">
                <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px; font-weight: 700;">Signed License Key (Ready to Deliver)</div>
                <div style="display: flex; gap: 8px; align-items: center;">
                  <input type="text" class="form-input" id="admin-gen-output" readonly style="font-family: monospace; font-weight: 700; color: #10b981; font-size: 13.5px;">
                  <button type="button" class="tool-btn secondary" id="admin-gen-copy-btn" style="height: 36px;">Copy</button>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: Backup & System Content -->
          <div id="tab-backup" class="settings-tab-content" style="display: none;">
            <!-- Admin Security Settings -->
            <form id="admin-passcode-form" onsubmit="event.preventDefault();" class="form-group" style="margin-bottom: 18px; border-bottom: 1px solid var(--border-color); padding-bottom: 20px;">
              <input type="text" name="username" autocomplete="username" style="display: none;">
              <label for="app-admin-passcode">Admin Access Passcode</label>
              <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Update the master passcode required to access the Settings panel.</div>
              <input type="password" class="form-input" id="app-admin-passcode" placeholder="Enter new strong passcode" autocomplete="new-password">
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

        <!-- Right column: Dynamic Tab-Sensitive Live Previews -->
        <div class="tool-panel">
          <!-- 1. Live Payment & Checkout Simulator (Default for tab-payments) -->
          <div id="preview-section-payments" class="adm-preview-section">
            <div class="panel-header" style="display: flex; justify-content: space-between; align-items: center;">
              <h3>Live Checkout Simulator</h3>
              <span class="theme-badge" style="background: rgba(0, 242, 254, 0.15); color: var(--accent-cyan);" id="preview-pay-badge">Live Sync</span>
            </div>
            <div style="padding: 14px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); margin-bottom: 12px;">
              <div style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 8px; display: flex; justify-content: space-between;">
                <span>Active Customer Gateways</span>
                <span id="preview-pay-count" style="color: #10b981; font-weight: 700;">8 Active</span>
              </div>
              <div id="preview-pay-gateways-list" style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px;"></div>
              
              <!-- Live UPI & QR Interactive Card -->
              <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; text-align: center;">
                <div style="font-size: 11px; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-bottom: 8px;">Customer QR Code Preview</div>
                <div style="display: inline-block; padding: 10px; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.4);">
                  <canvas id="adm-preview-qr-canvas" width="130" height="130" style="display: block; width: 130px; height: 130px;"></canvas>
                </div>
                <div id="adm-preview-vpa-label" style="font-family: var(--font-mono); font-size: 13px; font-weight: 700; color: var(--accent-cyan); margin-top: 10px;">ravik0892@okaxis</div>
                <div id="adm-preview-mode-desc" style="font-size: 11px; color: var(--text-muted); margin-top: 3px;">⚡ Single Universal UPI active across all apps</div>
              </div>
            </div>

            <button type="button" class="tool-btn primary" id="btn-adm-test-checkout-preview" style="width: 100%; justify-content: center; height: 38px; font-size: 13px; font-weight: 700;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              <span>Test Interactive Checkout Modal</span>
            </button>
          </div>

          <!-- 2. Live Ad Simulator (Shown when tab-ads is active) -->
          <div id="preview-section-ads" class="adm-preview-section" style="display: none;">
            <div class="panel-header">
              <h3>Live Ad Simulator</h3>
              <span class="theme-badge" style="background: rgba(var(--accent-cyan-rgb), 0.15); color: var(--accent-cyan);" id="preview-network-badge">Local Sponsor</span>
            </div>
            <div class="ad-simulator-container">
              <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 8px;">Simulated ad render based on active network settings:</p>
              <div id="ad-preview-box" class="ad-preview-panel"></div>
            </div>
          </div>

          <!-- 3. Aesthetics Glow Preview (Shown when tab-aesthetics is active) -->
          <div id="preview-section-aesthetics" class="adm-preview-section" style="display: none;">
            <div class="panel-header">
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

          <!-- 4. System Overview Stats (Shown for tools-visibility, tiers, backup) -->
          <div id="preview-section-system" class="adm-preview-section" style="display: none;">
            <div class="panel-header">
              <h3>System Overview</h3>
              <span class="theme-badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981;">Online &amp; Secure</span>
            </div>
            <div style="padding: 14px; border-radius: 10px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color);">
              <div style="font-size: 13px; font-weight: 700; color: #10b981; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="15" height="15"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>100% Client-Side Engine</span>
              </div>
              <p style="font-size: 11.5px; color: var(--text-muted); line-height: 1.4; margin: 0 0 10px 0;">All configurations and payments process directly in the user browser. No external database or intermediate tracking servers required.</p>
              <div style="display: flex; flex-direction: column; gap: 6px; font-size: 11.5px; color: var(--text-muted); border-top: 1px solid var(--border-color); padding-top: 8px;">
                <div>• Service Worker: <strong style="color: var(--accent-cyan);">PWA Cache Active (v72)</strong></div>
                <div>• Storage Engine: <strong style="color: var(--text-main);">Browser LocalStorage</strong></div>
                <div>• Dynamic Routing: <strong style="color: var(--accent-purple);">Enabled</strong></div>
              </div>
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
          b.style.borderColor = "var(--border-color)";
          b.style.background = "var(--bg-input)";
          b.style.fontWeight = "600";
        });
        btn.classList.add("active");
        btn.style.color = "var(--accent-cyan)";
        btn.style.borderColor = "var(--accent-cyan)";
        btn.style.background = "rgba(0, 242, 254, 0.12)";
        btn.style.fontWeight = "700";

        const tabId = btn.getAttribute("data-tab");
        container.querySelectorAll(".settings-tab-content").forEach(c => c.style.display = "none");
        const activeTabEl = container.querySelector("#" + tabId);
        if (activeTabEl) activeTabEl.style.display = "block";

        // Switch right preview section dynamically
        container.querySelectorAll(".adm-preview-section").forEach(s => s.style.display = "none");
        if (tabId === "tab-payments") {
          const s = container.querySelector("#preview-section-payments");
          if (s) s.style.display = "block";
          if (typeof updatePaymentSimulator === "function") updatePaymentSimulator();
        } else if (tabId === "tab-ads") {
          const s = container.querySelector("#preview-section-ads");
          if (s) s.style.display = "block";
          if (typeof updateSimulatorPreview === "function") updateSimulatorPreview();
        } else if (tabId === "tab-aesthetics") {
          const s = container.querySelector("#preview-section-aesthetics");
          if (s) s.style.display = "block";
        } else {
          const s = container.querySelector("#preview-section-system");
          if (s) s.style.display = "block";
        }
        
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
    const paypalClientIdInput = container.querySelector("#paypal-client-id");
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

    // Master Gateway Toggles selectors
    const gwToggleUpi = container.querySelector("#gw-toggle-upi");
    const gwToggleBank = container.querySelector("#gw-toggle-bank");
    const gwToggleGumroad = container.querySelector("#gw-toggle-gumroad");
    const gwTogglePaypal = container.querySelector("#gw-toggle-paypal");
    const gwToggleRazorpay = container.querySelector("#gw-toggle-razorpay");
    const gwToggleCrypto = container.querySelector("#gw-toggle-crypto");
    const gwToggleCoffee = container.querySelector("#gw-toggle-coffee");
    const gwToggleGuide = container.querySelector("#gw-toggle-guide");
    const gwToggleCustom = container.querySelector("#gw-toggle-custom");

    // UPI Multi-account selectors
    const upiModeSingle = container.querySelector("#upi-mode-single");
    const upiModePerApp = container.querySelector("#upi-mode-per-app");
    const upiModeBadge = container.querySelector("#upi-mode-badge");
    const upiPerAppContainer = container.querySelector("#upi-per-app-container");
    const upiGpayId = container.querySelector("#upi-gpay-id");
    const upiPhonepeId = container.querySelector("#upi-phonepe-id");
    const upiPaytmId = container.querySelector("#upi-paytm-id");
    const upiBhimId = container.querySelector("#upi-bhim-id");
    const upiCredId = container.querySelector("#upi-cred-id");

    // Custom Gateway selectors
    const customGwTabLabel = container.querySelector("#custom-gw-tab-label");
    const customGwIcon = container.querySelector("#custom-gw-icon");
    const customGwTitle = container.querySelector("#custom-gw-title");
    const customGwBadge = container.querySelector("#custom-gw-badge");
    const customGwUrl = container.querySelector("#custom-gw-url");
    const customGwBtnText = container.querySelector("#custom-gw-btn-text");
    const customGwDesc = container.querySelector("#custom-gw-desc");
    const customGwFeatures = container.querySelector("#custom-gw-features");

    // Dynamic Pricing selectors
    const priceLifetimeUsd = container.querySelector("#price-lifetime-usd");
    const priceLifetimeInr = container.querySelector("#price-lifetime-inr");
    const priceMonthlyUsd = container.querySelector("#price-monthly-usd");
    const priceMonthlyInr = container.querySelector("#price-monthly-inr");

    const btnAdmTestCheckout = container.querySelector("#btn-adm-test-checkout");

    // UPI Mode UI helper
    const setUpiModeUI = (mode) => {
      if (mode === "per_app") {
        if (upiModePerApp) upiModePerApp.checked = true;
        if (upiPerAppContainer) upiPerAppContainer.style.display = "block";
        if (upiModeBadge) {
          upiModeBadge.innerText = "Mode: Separate App Routing";
          upiModeBadge.style.color = "var(--accent-purple)";
          upiModeBadge.style.borderColor = "rgba(157, 78, 221, 0.3)";
          upiModeBadge.style.background = "rgba(157, 78, 221, 0.15)";
        }
      } else {
        if (upiModeSingle) upiModeSingle.checked = true;
        if (upiPerAppContainer) upiPerAppContainer.style.display = "none";
        if (upiModeBadge) {
          upiModeBadge.innerText = "Mode: Single Universal UPI";
          upiModeBadge.style.color = "var(--accent-cyan)";
          upiModeBadge.style.borderColor = "rgba(0, 242, 254, 0.3)";
          upiModeBadge.style.background = "rgba(0, 242, 254, 0.15)";
        }
      }
      updatePaymentSimulator();
    };

    // Payment Simulator display helper
    const updatePaymentSimulator = () => {
      const previewPayCount = container.querySelector("#preview-pay-count");
      const previewPayGatewaysList = container.querySelector("#preview-pay-gateways-list");
      const qrCanvas = container.querySelector("#adm-preview-qr-canvas");
      const previewVpaLabel = container.querySelector("#adm-preview-vpa-label");
      const previewModeDesc = container.querySelector("#adm-preview-mode-desc");

      const activeGateways = [];
      if (gwToggleUpi?.checked) activeGateways.push({ icon: "⚡", label: "UPI & QR" });
      if (gwToggleBank?.checked) activeGateways.push({ icon: "🏦", label: "Bank Transfer" });
      if (gwToggleGumroad?.checked) activeGateways.push({ icon: "🛒", label: "Gumroad" });
      if (gwTogglePaypal?.checked) activeGateways.push({ icon: "🅿️", label: "PayPal" });
      if (gwToggleRazorpay?.checked) activeGateways.push({ icon: "💳", label: "Razorpay" });
      if (gwToggleCrypto?.checked) activeGateways.push({ icon: "🪙", label: "Crypto" });
      if (gwToggleCoffee?.checked) activeGateways.push({ icon: "☕", label: "Coffee/Ko-fi" });
      if (gwToggleGuide?.checked) activeGateways.push({ icon: "📖", label: "Guide" });
      if (gwToggleCustom?.checked) activeGateways.push({ icon: customGwIcon?.value || "✨", label: customGwTabLabel?.value || "Custom" });

      if (previewPayCount) {
        previewPayCount.innerText = `${activeGateways.length} Active`;
        previewPayCount.style.color = activeGateways.length > 0 ? "#10b981" : "var(--accent-rose)";
      }

      if (previewPayGatewaysList) {
        previewPayGatewaysList.innerHTML = activeGateways.map(gw => `
          <span style="font-size: 10.5px; font-weight: 600; padding: 3px 8px; border-radius: 6px; background: rgba(0, 242, 254, 0.08); border: 1px solid rgba(0, 242, 254, 0.2); color: var(--text-main); display: inline-flex; align-items: center; gap: 4px;">
            <span>${gw.icon}</span>
            <span>${escapeHtml(gw.label)}</span>
          </span>
        `).join("") || `<span style="font-size: 11px; color: var(--accent-rose); font-style: italic;">No payment gateways enabled</span>`;
      }

      const vpa = (upiIdInput?.value || "ravik0892@okaxis").trim();
      const name = encodeURIComponent((upiNameInput?.value || "OmniTool Hub").trim());
      const rawPrice = (priceLifetimeInr?.value || "2499").replace(/[^0-9.]/g, '');
      const amount = rawPrice || "2499";
      const upiUri = `upi://pay?pa=${vpa}&pn=${name}&am=${amount}&cu=INR&tn=OmniTool%20Lifetime%20Pass`;

      if (previewVpaLabel) {
        previewVpaLabel.innerText = vpa;
      }

      const isPerApp = upiModePerApp && upiModePerApp.checked;
      if (previewModeDesc) {
        if (isPerApp) {
          previewModeDesc.innerText = "🎯 Separate UPI routing active per app";
          previewModeDesc.style.color = "var(--accent-purple)";
        } else {
          previewModeDesc.innerText = "⚡ Single Universal UPI active across all apps";
          previewModeDesc.style.color = "var(--accent-cyan)";
        }
      }

      if (qrCanvas && typeof appInstance.drawUpiQr === 'function') {
        appInstance.drawUpiQr(upiUri, qrCanvas);
      }
    };

    // Quick Templates for Custom Payment Gateways
    const applyCustomTemplate = (preset) => {
      if (preset === 'stripe') {
        if (customGwTabLabel) customGwTabLabel.value = "Stripe";
        if (customGwIcon) customGwIcon.value = "💳";
        if (customGwTitle) customGwTitle.value = "Stripe Checkout / Debit & Credit Cards";
        if (customGwBadge) customGwBadge.value = "Instant 256-Bit SSL Checkout";
        if (customGwUrl) customGwUrl.value = "https://buy.stripe.com/your-stripe-link";
        if (customGwBtnText) customGwBtnText.value = "Pay with Card / Apple Pay";
        if (customGwDesc) customGwDesc.value = "Secure checkout processed by Stripe. Supports all international Visa, Mastercard, Amex, and Apple Pay.";
        if (customGwFeatures) customGwFeatures.value = "✔ 256-Bit SSL Encrypted checkout\n✔ Instant automated license activation\n✔ All global debit/credit cards accepted";
      } else if (preset === 'cashapp') {
        if (customGwTabLabel) customGwTabLabel.value = "Cash App";
        if (customGwIcon) customGwIcon.value = "💵";
        if (customGwTitle) customGwTitle.value = "Cash App Pay ($Cashtag)";
        if (customGwBadge) customGwBadge.value = "Direct Mobile Transfer";
        if (customGwUrl) customGwUrl.value = "https://cash.app/$YourCashtag";
        if (customGwBtnText) customGwBtnText.value = "Open Cash App";
        if (customGwDesc) customGwDesc.value = "Send payment directly via Cash App to $YourCashtag with your email in note.";
        if (customGwFeatures) customGwFeatures.value = "✔ Instant mobile fee-free transfer\n✔ Add your email in the note\n✔ License dispatched within 10 minutes";
      } else if (preset === 'revolut') {
        if (customGwTabLabel) customGwTabLabel.value = "Revolut";
        if (customGwIcon) customGwIcon.value = "🟣";
        if (customGwTitle) customGwTitle.value = "Revolut Pay / Revtag";
        if (customGwBadge) customGwBadge.value = "Multi-Currency Direct";
        if (customGwUrl) customGwUrl.value = "https://revolut.me/your-revtag";
        if (customGwBtnText) customGwBtnText.value = "Pay via Revolut.me";
        if (customGwDesc) customGwDesc.value = "Fast multi-currency transfer with zero fees via Revolut.me payment link.";
        if (customGwFeatures) customGwFeatures.value = "✔ Supports EUR, GBP, USD, INR\n✔ Real-time cross-border transfer\n✔ Instant receipt generation";
      } else if (preset === 'zelle') {
        if (customGwTabLabel) customGwTabLabel.value = "Zelle";
        if (customGwIcon) customGwIcon.value = "⚡";
        if (customGwTitle) customGwTitle.value = "Zelle Bank Transfer";
        if (customGwBadge) customGwBadge.value = "US Bank Direct";
        if (customGwUrl) customGwUrl.value = "https://www.zellepay.com";
        if (customGwBtnText) customGwBtnText.value = "Instructions for Zelle";
        if (customGwDesc) customGwDesc.value = "Send Zelle payment to: billing@yourdomain.com. Include your name in the memo.";
        if (customGwFeatures) customGwFeatures.value = "✔ Instant US direct bank-to-bank\n✔ No processing fees\n✔ Automated matching by email";
      } else if (preset === 'wise') {
        if (customGwTabLabel) customGwTabLabel.value = "Wise";
        if (customGwIcon) customGwIcon.value = "🌐";
        if (customGwTitle) customGwTitle.value = "Wise International Transfer";
        if (customGwBadge) customGwBadge.value = "Mid-Market Exchange Rate";
        if (customGwUrl) customGwUrl.value = "https://wise.com/pay/me/yourhandle";
        if (customGwBtnText) customGwBtnText.value = "Pay via Wise";
        if (customGwDesc) customGwDesc.value = "Send international payment in your local currency at the real mid-market exchange rate.";
        if (customGwFeatures) customGwFeatures.value = "✔ Lowest international conversion fees\n✔ Direct local bank debit\n✔ Multi-currency support (50+ currencies)";
      }
      if (gwToggleCustom) gwToggleCustom.checked = true;
      updatePaymentSimulator();
      appInstance.showToast(`Applied ${preset.toUpperCase()} template! Custom Gateway enabled.`, "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    };

    container.querySelector("#preset-custom-stripe")?.addEventListener("click", () => applyCustomTemplate('stripe'));
    container.querySelector("#preset-custom-cashapp")?.addEventListener("click", () => applyCustomTemplate('cashapp'));
    container.querySelector("#preset-custom-revolut")?.addEventListener("click", () => applyCustomTemplate('revolut'));
    container.querySelector("#preset-custom-zelle")?.addEventListener("click", () => applyCustomTemplate('zelle'));
    container.querySelector("#preset-custom-wise")?.addEventListener("click", () => applyCustomTemplate('wise'));

    // Top action bar buttons
    container.querySelector("#btn-adm-save-top")?.addEventListener("click", () => saveSettings());
    container.querySelector("#btn-adm-test-checkout-preview")?.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof appInstance.openCheckout === 'function') {
        appInstance.openCheckout('lifetime');
      }
    });

    container.querySelector("#btn-adm-hard-refresh")?.addEventListener("click", async () => {
      if (confirm("Purge browser PWA service worker cache and reload latest code?")) {
        try {
          if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const reg of registrations) {
              if (reg.active) {
                reg.active.postMessage({ action: 'clearCache' });
              }
              await reg.unregister();
            }
          }
          if ('caches' in window) {
            const cacheNames = await caches.keys();
            for (const name of cacheNames) {
              await caches.delete(name);
            }
          }
          appInstance.showToast("PWA Cache purged successfully! Reloading...", "success");
          setTimeout(() => {
            window.location.reload(true);
          }, 400);
        } catch (err) {
          window.location.reload(true);
        }
      }
    });

    // Payment fields reactive simulator updates
    [gwToggleUpi, gwToggleBank, gwToggleGumroad, gwTogglePaypal, gwToggleRazorpay, gwToggleCrypto, gwToggleCoffee, gwToggleGuide, gwToggleCustom].forEach(toggle => {
      toggle?.addEventListener("change", () => {
        updatePaymentSimulator();
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('click');
        }
      });
    });

    [upiIdInput, upiNameInput, priceLifetimeInr, customGwIcon, customGwTabLabel].forEach(input => {
      input?.addEventListener("input", () => {
        updatePaymentSimulator();
      });
    });

    container.querySelectorAll('input[name="omnitool_upi_mode_radio"]').forEach(radio => {
      radio.addEventListener("change", (e) => {
        setUpiModeUI(e.target.value);
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('click');
        }
      });
    });

    btnAdmTestCheckout?.addEventListener("click", (e) => {
      e.preventDefault();
      if (typeof appInstance.openCheckout === 'function') {
        appInstance.openCheckout('lifetime');
      }
    });

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

    // Cryptographic License Key Generator handler
    const genBtn = container.querySelector("#admin-gen-btn");
    const genTier = container.querySelector("#admin-gen-tier");
    const genCustId = container.querySelector("#admin-gen-cust-id");
    const genResultBox = container.querySelector("#admin-gen-result-box");
    const genOutput = container.querySelector("#admin-gen-output");
    const genCopyBtn = container.querySelector("#admin-gen-copy-btn");

    if (genBtn && genOutput) {
      genBtn.onclick = async () => {
        const tier = genTier ? genTier.value : "lifetime";
        const customerId = genCustId ? genCustId.value.trim() : "";
        const adminToken = sessionStorage.getItem("omnitool_admin_token") || "";

        try {
          const res = await fetch("/api/admin-generate-key", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + adminToken
            },
            body: JSON.stringify({ tier, customerId })
          });
          const contentType = res.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const data = await res.json();
            if (res.ok && data.success) {
              genOutput.value = data.licenseKey;
              genResultBox.style.display = "block";
              appInstance.showToast("🔑 Cryptographically signed key generated!", "success");
              return;
            }
          }
        } catch (_) {}

        // Safe Local Dev Fallback (avoids exposing master secret in client bundle)
        const isDevEnv = ["localhost", "127.0.0.1", ""].includes(window.location.hostname) || window.location.protocol === "file:";
        if (isDevEnv) {
          const tierCode = tier === "premium" ? "MON" : "PRO";
          const id = (customerId.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) || Math.random().toString(36).substring(2, 10).toUpperCase()).padEnd(8, "0");
          const devKey = `OMNI-DEV-${tierCode}-${id}`;
          genOutput.value = devKey;
          genResultBox.style.display = "block";
          appInstance.showToast("🛠️ Generated Local Dev Test Key. (Ensure START_SERVER.bat is running for production HMAC keys).", "info");
        } else {
          appInstance.showToast("Server API unreachable. Please ensure the backend serverless functions are active.", "error");
        }
      };

      if (genCopyBtn) {
        genCopyBtn.onclick = () => {
          if (genOutput.value) {
            navigator.clipboard.writeText(genOutput.value).then(() => {
              genCopyBtn.innerText = "Copied!";
              appInstance.showToast("License key copied to clipboard!", "success");
              setTimeout(() => { genCopyBtn.innerText = "Copy"; }, 2000);
            });
          }
        };
      }
    }

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
      if (paypalClientIdInput) paypalClientIdInput.value = appInstance.getConfigValue("omnitool_paypal_client_id", "");
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

      // Load Payment Gateway Toggles
      if (gwToggleUpi) gwToggleUpi.checked = appInstance.getConfigValue("omnitool_gw_upi_enabled", "true") !== "false";
      if (gwToggleBank) gwToggleBank.checked = appInstance.getConfigValue("omnitool_gw_bank_enabled", "false") === "true";
      if (gwToggleGumroad) gwToggleGumroad.checked = appInstance.getConfigValue("omnitool_gw_gumroad_enabled", "true") !== "false";
      if (gwTogglePaypal) gwTogglePaypal.checked = appInstance.getConfigValue("omnitool_gw_paypal_enabled", "true") !== "false";
      if (gwToggleRazorpay) gwToggleRazorpay.checked = appInstance.getConfigValue("omnitool_gw_razorpay_enabled", "true") !== "false";
      if (gwToggleCrypto) gwToggleCrypto.checked = appInstance.getConfigValue("omnitool_gw_crypto_enabled", "true") !== "false";
      if (gwToggleCoffee) gwToggleCoffee.checked = appInstance.getConfigValue("omnitool_gw_coffee_enabled", "true") !== "false";
      if (gwToggleGuide) gwToggleGuide.checked = appInstance.getConfigValue("omnitool_gw_guide_enabled", "true") !== "false";
      if (gwToggleCustom) gwToggleCustom.checked = appInstance.getConfigValue("omnitool_gw_custom_enabled", "false") === "true";

      // Load UPI Multi-account Mode & Dedicated IDs
      const upiMode = appInstance.getConfigValue("omnitool_upi_mode", "single");
      setUpiModeUI(upiMode);

      if (upiGpayId) upiGpayId.value = appInstance.getConfigValue("omnitool_upi_gpay_id", "");
      if (upiPhonepeId) upiPhonepeId.value = appInstance.getConfigValue("omnitool_upi_phonepe_id", "");
      if (upiPaytmId) upiPaytmId.value = appInstance.getConfigValue("omnitool_upi_paytm_id", "");
      if (upiBhimId) upiBhimId.value = appInstance.getConfigValue("omnitool_upi_bhim_id", "");
      if (upiCredId) upiCredId.value = appInstance.getConfigValue("omnitool_upi_cred_id", "");

      // Load Custom Gateway
      if (customGwTabLabel) customGwTabLabel.value = appInstance.getConfigValue("omnitool_custom_gw_tab_label", "Custom Payment");
      if (customGwIcon) customGwIcon.value = appInstance.getConfigValue("omnitool_custom_gw_icon", "💳");
      if (customGwTitle) customGwTitle.value = appInstance.getConfigValue("omnitool_custom_gw_title", "Custom Payment System");
      if (customGwBadge) customGwBadge.value = appInstance.getConfigValue("omnitool_custom_gw_badge", "Instant Activation");
      if (customGwUrl) customGwUrl.value = appInstance.getConfigValue("omnitool_custom_gw_url", "#");
      if (customGwBtnText) customGwBtnText.value = appInstance.getConfigValue("omnitool_custom_gw_btn_text", "Continue to Payment");
      if (customGwDesc) customGwDesc.value = appInstance.getConfigValue("omnitool_custom_gw_desc", "Direct secure payment method.");
      if (customGwFeatures) customGwFeatures.value = appInstance.getConfigValue("omnitool_custom_gw_features", "✔ 256-Bit SSL Encrypted checkout\n✔ Instant automated verification\n✔ Supports Visa, Mastercard, Apple Pay");

      // Load Dynamic Pricing
      if (priceLifetimeUsd) priceLifetimeUsd.value = appInstance.getConfigValue("omnitool_price_lifetime_usd", "$29.99");
      if (priceLifetimeInr) priceLifetimeInr.value = appInstance.getConfigValue("omnitool_price_lifetime_inr", "₹2,499");
      if (priceMonthlyUsd) priceMonthlyUsd.value = appInstance.getConfigValue("omnitool_price_monthly_usd", "$4.99");
      if (priceMonthlyInr) priceMonthlyInr.value = appInstance.getConfigValue("omnitool_price_monthly_inr", "₹399");

      // Load new settings
      appDensity.value = appInstance.getConfigValue("omnitool_layout_density", "comfortable");
      appStartup.value = appInstance.getConfigValue("omnitool_default_view", "dashboard");
      appClock.value = appInstance.getConfigValue("omnitool_clock_format", "24");
      appAudio.checked = appInstance.getConfigValue("omnitool_audio_feedback", "false") === "true";
      
      if (adminPasscode) {
        adminPasscode.value = "";
        adminPasscode.placeholder = "Enter new admin passcode to update";
      }

      // Load monetization settings
      monetizationGlobal.checked = localStorage.getItem("omnitool_monetization_active") === "true";
      monetizationUserTier.value = localStorage.getItem("omnitool_user_tier") || "free";

      toggleFormFields(adNetwork.value);
      updateSimulatorPreview();
      updatePaymentSimulator();
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
      if (paypalClientIdInput) localStorage.setItem("omnitool_paypal_client_id", paypalClientIdInput.value.trim());
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

      // Save Payment Gateway Toggles
      if (gwToggleUpi) localStorage.setItem("omnitool_gw_upi_enabled", gwToggleUpi.checked ? "true" : "false");
      if (gwToggleBank) localStorage.setItem("omnitool_gw_bank_enabled", gwToggleBank.checked ? "true" : "false");
      if (gwToggleGumroad) localStorage.setItem("omnitool_gw_gumroad_enabled", gwToggleGumroad.checked ? "true" : "false");
      if (gwTogglePaypal) localStorage.setItem("omnitool_gw_paypal_enabled", gwTogglePaypal.checked ? "true" : "false");
      if (gwToggleRazorpay) localStorage.setItem("omnitool_gw_razorpay_enabled", gwToggleRazorpay.checked ? "true" : "false");
      if (gwToggleCrypto) localStorage.setItem("omnitool_gw_crypto_enabled", gwToggleCrypto.checked ? "true" : "false");
      if (gwToggleCoffee) localStorage.setItem("omnitool_gw_coffee_enabled", gwToggleCoffee.checked ? "true" : "false");
      if (gwToggleGuide) localStorage.setItem("omnitool_gw_guide_enabled", gwToggleGuide.checked ? "true" : "false");
      if (gwToggleCustom) localStorage.setItem("omnitool_gw_custom_enabled", gwToggleCustom.checked ? "true" : "false");

      // Save UPI Mode & App IDs
      const activeUpiMode = upiModePerApp && upiModePerApp.checked ? "per_app" : "single";
      localStorage.setItem("omnitool_upi_mode", activeUpiMode);
      if (upiGpayId) localStorage.setItem("omnitool_upi_gpay_id", upiGpayId.value.trim());
      if (upiPhonepeId) localStorage.setItem("omnitool_upi_phonepe_id", upiPhonepeId.value.trim());
      if (upiPaytmId) localStorage.setItem("omnitool_upi_paytm_id", upiPaytmId.value.trim());
      if (upiBhimId) localStorage.setItem("omnitool_upi_bhim_id", upiBhimId.value.trim());
      if (upiCredId) localStorage.setItem("omnitool_upi_cred_id", upiCredId.value.trim());

      // Save Custom Gateway
      if (customGwTabLabel) localStorage.setItem("omnitool_custom_gw_tab_label", customGwTabLabel.value.trim());
      if (customGwIcon) localStorage.setItem("omnitool_custom_gw_icon", customGwIcon.value.trim());
      if (customGwTitle) localStorage.setItem("omnitool_custom_gw_title", customGwTitle.value.trim());
      if (customGwBadge) localStorage.setItem("omnitool_custom_gw_badge", customGwBadge.value.trim());
      if (customGwUrl) localStorage.setItem("omnitool_custom_gw_url", customGwUrl.value.trim());
      if (customGwBtnText) localStorage.setItem("omnitool_custom_gw_btn_text", customGwBtnText.value.trim());
      if (customGwDesc) localStorage.setItem("omnitool_custom_gw_desc", customGwDesc.value.trim());
      if (customGwFeatures) localStorage.setItem("omnitool_custom_gw_features", customGwFeatures.value.trim());

      // Save Dynamic Pricing
      if (priceLifetimeUsd) localStorage.setItem("omnitool_price_lifetime_usd", priceLifetimeUsd.value.trim());
      if (priceLifetimeInr) localStorage.setItem("omnitool_price_lifetime_inr", priceLifetimeInr.value.trim());
      if (priceMonthlyUsd) localStorage.setItem("omnitool_price_monthly_usd", priceMonthlyUsd.value.trim());
      if (priceMonthlyInr) localStorage.setItem("omnitool_price_monthly_inr", priceMonthlyInr.value.trim());

      // Save new configurations
      localStorage.setItem("omnitool_accent_preset", activePreset);
      localStorage.setItem("omnitool_layout_density", appDensity.value);
      localStorage.setItem("omnitool_default_view", appStartup.value);
      localStorage.setItem("omnitool_clock_format", appClock.value);
      localStorage.setItem("omnitool_audio_feedback", appAudio.checked ? "true" : "false");
      
      if (adminPasscode && adminPasscode.value.trim()) {
        localStorage.setItem("omnitool_admin_passcode", adminPasscode.value.trim());
      }

      // Save Monetization Tiers
      localStorage.setItem("omnitool_monetization_active", monetizationGlobal.checked ? "true" : "false");
      localStorage.setItem("omnitool_user_tier", monetizationUserTier.value);
      if (monetizationUserTier.value === "lifetime" || monetizationUserTier.value === "premium") {
        const payload = {
          tier: monetizationUserTier.value,
          source: "admin_simulator",
          iat: Date.now()
        };
        const encoded = btoa(JSON.stringify(payload)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
        localStorage.setItem("omnitool_license_token", `${encoded}.admin_simulated_sig`);
      }

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

      appInstance.showToast("✅ Settings & Payment Gateways saved! Changes are live across all tools.", "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('save');
      }
      updateSimulatorPreview();
      updatePaymentSimulator();

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
        "omnitool_paypal_client_id": paypalClientIdInput ? paypalClientIdInput.value.trim() : "",
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
        "omnitool_gw_upi_enabled": gwToggleUpi ? (gwToggleUpi.checked ? "true" : "false") : "true",
        "omnitool_gw_bank_enabled": gwToggleBank ? (gwToggleBank.checked ? "true" : "false") : "false",
        "omnitool_gw_gumroad_enabled": gwToggleGumroad ? (gwToggleGumroad.checked ? "true" : "false") : "true",
        "omnitool_gw_paypal_enabled": gwTogglePaypal ? (gwTogglePaypal.checked ? "true" : "false") : "true",
        "omnitool_gw_razorpay_enabled": gwToggleRazorpay ? (gwToggleRazorpay.checked ? "true" : "false") : "true",
        "omnitool_gw_crypto_enabled": gwToggleCrypto ? (gwToggleCrypto.checked ? "true" : "false") : "true",
        "omnitool_gw_coffee_enabled": gwToggleCoffee ? (gwToggleCoffee.checked ? "true" : "false") : "true",
        "omnitool_gw_guide_enabled": gwToggleGuide ? (gwToggleGuide.checked ? "true" : "false") : "true",
        "omnitool_gw_custom_enabled": gwToggleCustom ? (gwToggleCustom.checked ? "true" : "false") : "false",
        "omnitool_upi_mode": upiModePerApp && upiModePerApp.checked ? "per_app" : "single",
        "omnitool_upi_gpay_id": upiGpayId ? upiGpayId.value.trim() : "",
        "omnitool_upi_phonepe_id": upiPhonepeId ? upiPhonepeId.value.trim() : "",
        "omnitool_upi_paytm_id": upiPaytmId ? upiPaytmId.value.trim() : "",
        "omnitool_upi_bhim_id": upiBhimId ? upiBhimId.value.trim() : "",
        "omnitool_upi_cred_id": upiCredId ? upiCredId.value.trim() : "",
        "omnitool_custom_gw_tab_label": customGwTabLabel ? customGwTabLabel.value.trim() : "Custom Payment",
        "omnitool_custom_gw_icon": customGwIcon ? customGwIcon.value.trim() : "💳",
        "omnitool_custom_gw_title": customGwTitle ? customGwTitle.value.trim() : "Custom Payment System",
        "omnitool_custom_gw_badge": customGwBadge ? customGwBadge.value.trim() : "Instant Activation",
        "omnitool_custom_gw_url": customGwUrl ? customGwUrl.value.trim() : "#",
        "omnitool_custom_gw_btn_text": customGwBtnText ? customGwBtnText.value.trim() : "Continue to Payment",
        "omnitool_custom_gw_desc": customGwDesc ? customGwDesc.value.trim() : "Direct secure payment method.",
        "omnitool_custom_gw_features": customGwFeatures ? customGwFeatures.value.trim() : "",
        "omnitool_price_lifetime_usd": priceLifetimeUsd ? priceLifetimeUsd.value.trim() : "$29.99",
        "omnitool_price_lifetime_inr": priceLifetimeInr ? priceLifetimeInr.value.trim() : "₹2,499",
        "omnitool_price_monthly_usd": priceMonthlyUsd ? priceMonthlyUsd.value.trim() : "$4.99",
        "omnitool_price_monthly_inr": priceMonthlyInr ? priceMonthlyInr.value.trim() : "₹399",
        "omnitool_adsterra_smart_link": adsterraSmartLink ? adsterraSmartLink.value.trim() : "",
        "omnitool_preserve_settings_on_reset": preserveSettingsReset ? (preserveSettingsReset.checked ? "true" : "false") : "false",
        "omnitool_accent_preset": activePreset,
        "omnitool_layout_density": appDensity.value,
        "omnitool_default_view": appStartup.value,
        "omnitool_clock_format": appClock.value,
        "omnitool_audio_feedback": appAudio.checked ? "true" : "false",
        "omnitool_auth_mode": "secure_serverless",
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
    container.querySelector("#btn-adm-save-top")?.addEventListener("click", saveSettings);
    container.querySelector("#btn-adm-lock-session")?.addEventListener("click", () => {
      sessionStorage.removeItem("omnitool_admin_authenticated");
      sessionStorage.removeItem("omnitool_admin_token");
      sessionStorage.removeItem("omnitool_stealth_admin_unlocked");
      appInstance.showToast("🔒 Admin session locked. Returned to Dashboard.", "info");
      appInstance.backToDashboard();
    });
    container.querySelector("#btn-adm-hard-refresh")?.addEventListener("click", () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (let reg of registrations) reg.unregister();
        });
      }
      if ('caches' in window) {
        caches.keys().then(names => Promise.all(names.map(name => caches.delete(name)))).then(() => {
          location.reload();
        });
      } else {
        location.reload();
      }
    });
    
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
