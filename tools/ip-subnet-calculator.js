import { escapeHtml } from './utils.js';

export default {
  id: "ip-subnet-calculator",
  name: "IP Subnet & MAC Address Suite",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Left Panel: Suite Config -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>Configuration</h3>
            <!-- Tabs inside config panel -->
            <div style="display: flex; gap: 8px; width: 100%; max-width: 320px; margin-left: 15px;" id="ip-suite-tabs">
              <button class="keyboard-tab active" data-tab="subnet" style="font-size: 11px; padding: 4px 8px;">Subnet Calc</button>
              <button class="keyboard-tab" data-tab="mac" style="font-size: 11px; padding: 4px 8px;">MAC Suite</button>
            </div>
          </div>

          <!-- Tab 1: Subnet Calculator Controls -->
          <div id="panel-subnet-controls" class="tab-control-panel">
            <!-- IP Address Input -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label for="subnet-ip-input" style="font-size: 12px; margin-bottom: 6px; display: block; color: var(--text-muted);">IP Address</label>
              <input type="text" class="form-input" id="subnet-ip-input" value="192.168.1.1" placeholder="e.g. 192.168.1.1" style="height: 38px; font-size: 13px; font-family: monospace;">
              <div id="ip-validation-error" style="color: var(--accent-rose); font-size: 11px; margin-top: 4px; display: none;">Invalid IP address format. Please enter a valid IPv4.</div>
            </div>

            <!-- CIDR / Subnet Selector & Slider -->
            <div class="form-group" style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label for="subnet-cidr-select" style="font-size: 12px; color: var(--text-muted);">Subnet Mask / CIDR Prefix</label>
                <span id="subnet-cidr-display" style="font-size: 12px; font-weight: bold; color: var(--accent-cyan); font-family: monospace;">/24 (255.255.255.0)</span>
              </div>

              <div style="display: flex; gap: 10px; margin-bottom: 12px;">
                <select class="form-select" id="subnet-cidr-select" style="flex: 1.2; height: 38px; font-size: 13px; font-family: monospace;">
                  <!-- Dynamically generated select options -->
                </select>
              </div>

              <input type="range" class="form-range" id="subnet-cidr-slider" min="1" max="32" value="24" style="width: 100%;">
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--text-muted); margin-top: 4px; font-family: monospace;">
                <span>/1</span>
                <span>/8</span>
                <span>/16</span>
                <span>/24</span>
                <span>/32</span>
              </div>
            </div>
          </div>

          <!-- Tab 2: MAC Address Controls -->
          <div id="panel-mac-controls" class="tab-control-panel hidden">
            <!-- MAC Input -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label for="mac-input" style="font-size: 12px; margin-bottom: 6px; display: block; color: var(--text-muted);">MAC Address</label>
              <input type="text" class="form-input" id="mac-input" value="00:1A:2B:3C:4D:5E" placeholder="e.g. 00-1A-2B-3C-4D-5E, 001a.2b3c.4d5e" style="height: 38px; font-size: 13px; font-family: monospace; text-transform: uppercase;">
              <div id="mac-validation-error" style="color: var(--accent-rose); font-size: 11px; margin-top: 4px; display: none;">Invalid MAC address format. Must be 12 hex characters.</div>
            </div>

            <!-- Formatting Presets -->
            <div class="form-group" style="margin-bottom: 20px;">
              <label style="font-size: 12px; margin-bottom: 6px; display: block; color: var(--text-muted);">Quick Format Input</label>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button class="tool-btn secondary active" id="mac-fmt-btn-colon" style="font-size: 10px; padding: 4px 8px;">Colon Style</button>
                <button class="tool-btn secondary" id="mac-fmt-btn-hyphen" style="font-size: 10px; padding: 4px 8px;">Hyphen Style</button>
                <button class="tool-btn secondary" id="mac-fmt-btn-dot" style="font-size: 10px; padding: 4px 8px;">Cisco Dot</button>
                <button class="tool-btn secondary" id="mac-fmt-btn-raw" style="font-size: 10px; padding: 4px 8px;">Raw Hex</button>
              </div>
            </div>

            <!-- Quick test devices -->
            <div class="form-group">
              <label style="font-size: 11px; color: var(--text-muted);">Quick Sample Devices:</label>
              <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
                <button class="tool-btn secondary" id="mac-device-apple" style="font-size: 10px; padding: 4px 8px; border-radius: 4px;">Apple Card</button>
                <button class="tool-btn secondary" id="mac-device-cisco" style="font-size: 10px; padding: 4px 8px; border-radius: 4px;">Cisco Router</button>
                <button class="tool-btn secondary" id="mac-device-intel" style="font-size: 10px; padding: 4px 8px; border-radius: 4px;">Intel NIC</button>
                <button class="tool-btn secondary" id="mac-device-vmware" style="font-size: 10px; padding: 4px 8px; border-radius: 4px;">VMware VM</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel: Calculation Results -->
        <div class="tool-panel" style="flex: 1.3; display: flex; flex-direction: column;">
          <div class="panel-header">
            <h3>Calculated Metrics</h3>
          </div>

          <!-- Tab 1 Output: Subnet Results -->
          <div id="output-subnet-container" style="display: flex; flex-direction: column; width: 100%; height: 100%;">
            <!-- Results Grid -->
            <div class="metrics-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; flex: 1;">
              <div class="metric-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px;">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">CIDR Notation</div>
                <div id="res-cidr" style="font-size: 16px; font-weight: 700; color: #fff; margin-top: 4px; font-family: monospace;">-</div>
              </div>

              <div class="metric-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px;">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">IP Address Class / Type</div>
                <div id="res-class" style="font-size: 14px; font-weight: 700; color: var(--accent-cyan); margin-top: 4px;">-</div>
              </div>

              <div class="metric-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; grid-column: span 2;">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Network Address</div>
                <div id="res-network" style="font-size: 16px; font-weight: 700; color: #fff; margin-top: 4px; font-family: monospace;">-</div>
              </div>

              <div class="metric-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; grid-column: span 2;">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Usable Host IP Range</div>
                <div id="res-range" style="font-size: 15px; font-weight: 700; color: #10b981; margin-top: 4px; font-family: monospace;">-</div>
              </div>

              <div class="metric-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px; grid-column: span 2;">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Broadcast Address</div>
                <div id="res-broadcast" style="font-size: 16px; font-weight: 700; color: #fff; margin-top: 4px; font-family: monospace;">-</div>
              </div>

              <div class="metric-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px;">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Total Usable Hosts</div>
                <div id="res-hosts" style="font-size: 16px; font-weight: 700; color: #f59e0b; margin-top: 4px; font-family: monospace;">-</div>
              </div>

              <div class="metric-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 12px;">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Wildcard Mask</div>
                <div id="res-wildcard" style="font-size: 16px; font-weight: 700; color: #fff; margin-top: 4px; font-family: monospace;">-</div>
              </div>
            </div>

            <!-- Binary representation block -->
            <div style="background: rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 14px; font-family: monospace; font-size: 11px; line-height: 1.6; color: var(--text-muted); display: flex; flex-direction: column; gap: 8px;">
              <div style="font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 4px; color: var(--accent-cyan);">BINARY STRUCTURE MAPPING</div>
              <div style="display: flex; justify-content: space-between;"><span style="color:#fff;">IP Address:</span><span id="bin-ip">-</span></div>
              <div style="display: flex; justify-content: space-between;"><span style="color:#fff;">Netmask:</span><span id="bin-mask" style="color: #9d4edd;">-</span></div>
              <div style="display: flex; justify-content: space-between;"><span style="color:#fff;">Network:</span><span id="bin-network">-</span></div>
              <div style="display: flex; justify-content: space-between;"><span style="color:#fff;">Broadcast:</span><span id="bin-broadcast">-</span></div>
            </div>
          </div>

          <!-- Tab 2 Output: MAC Results -->
          <div id="output-mac-container" class="hidden" style="display: flex; flex-direction: column; width: 100%; height: 100%; gap: 12px;">
            <div class="metrics-grid" style="display: grid; grid-template-columns: 1fr; gap: 12px; flex: 1;">
              <!-- OUI Lookup Card -->
              <div class="metric-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 16px;">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">OUI Vendor / Hardware Manufacturer</div>
                <div id="mac-vendor" style="font-size: 18px; font-weight: 700; color: #10b981; margin-top: 6px;">-</div>
                <div id="mac-oui-prefix" style="font-size: 11px; color: var(--text-muted); margin-top: 4px; font-family: monospace;">OUI Hex Prefix: -</div>
              </div>

              <!-- Formatted Output Formats -->
              <div class="metric-card" style="background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 16px; display: flex; flex-direction: column; gap: 10px;">
                <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase;">Formatted Output Representations</div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 6px; margin-top: 4px;">
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 10px; color: var(--text-muted);">Standard Colon</span>
                    <span id="mac-res-colon" style="font-size: 14px; font-family: monospace; font-weight: 700; color: #fff;">-</span>
                  </div>
                  <button class="tool-btn secondary mac-copy-val-btn" data-target="mac-res-colon" style="padding: 4px 8px; font-size: 10px; height: auto;">Copy</button>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 6px;">
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 10px; color: var(--text-muted);">Hyphen Form</span>
                    <span id="mac-res-hyphen" style="font-size: 14px; font-family: monospace; font-weight: 700; color: #fff;">-</span>
                  </div>
                  <button class="tool-btn secondary mac-copy-val-btn" data-target="mac-res-hyphen" style="padding: 4px 8px; font-size: 10px; height: auto;">Copy</button>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 6px;">
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 10px; color: var(--text-muted);">Cisco Dot Form</span>
                    <span id="mac-res-dot" style="font-size: 14px; font-family: monospace; font-weight: 700; color: #fff;">-</span>
                  </div>
                  <button class="tool-btn secondary mac-copy-val-btn" data-target="mac-res-dot" style="padding: 4px 8px; font-size: 10px; height: auto;">Copy</button>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 10px; color: var(--text-muted);">Raw Flat Hex</span>
                    <span id="mac-res-raw" style="font-size: 14px; font-family: monospace; font-weight: 700; color: #fff;">-</span>
                  </div>
                  <button class="tool-btn secondary mac-copy-val-btn" data-target="mac-res-raw" style="padding: 4px 8px; font-size: 10px; height: auto;">Copy</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Guide & Example Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span id="ip-suite-guide-title">Quick Guide: Subnet Calculator</span>
            </div>
            <button class="tool-btn secondary" id="subnet-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps" id="ip-suite-guide-steps">
            <!-- Dynamically populated -->
          </div>
          <div class="tool-guide-example" id="ip-suite-guide-example-container">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">Standard LAN (/24)</button>
                <button class="tool-guide-example-tab-btn" data-index="1">Public Cloud VPC (/16)</button>
              </div>
            </div>
            <!-- Example 1 -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 IP Address &amp; Prefix</span>
                <div class="tool-guide-io-value">IP: <code>192.168.1.10</code> / CIDR: <code>/24</code></div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Network Range Details</span>
                <div class="tool-guide-io-value">
                  Hosts: <strong>254 usable</strong><br>
                  Subnet: <code>192.168.1.1</code> - <code>192.168.1.254</code><br>
                  Broadcast: <code>192.168.1.255</code>
                </div>
              </div>
            </div>
            <!-- Example 2 -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 IP Address &amp; Prefix</span>
                <div class="tool-guide-io-value">IP: <code>10.0.1.50</code> / CIDR: <code>/16</code></div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Network Range Details</span>
                <div class="tool-guide-io-value">
                  Hosts: <strong>65,534 usable</strong><br>
                  Subnet: <code>10.0.0.1</code> - <code>10.0.255.254</code><br>
                  Broadcast: <code>10.0.255.255</code>
                </div>
              </div>
            </div>
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
          margin-top: 15px;
          border-top: 1px solid var(--border-color);
          padding-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .tab-control-panel.hidden {
          display: none !important;
        }
      </style>
    `;
  },

  async init(container, appInstance) {
    const tabs = container.querySelectorAll("#ip-suite-tabs .keyboard-tab");
    const panelSubnet = container.querySelector("#panel-subnet-controls");
    const panelMac = container.querySelector("#panel-mac-controls");
    const outputSubnet = container.querySelector("#output-subnet-container");
    const outputMac = container.querySelector("#output-mac-container");

    const guideTitle = container.querySelector("#ip-suite-guide-title");
    const guideSteps = container.querySelector("#ip-suite-guide-steps");
    const guideExample = container.querySelector("#ip-suite-guide-example-container");
    const tryExampleBtn = container.querySelector("#subnet-guide-load-sample");

    // Subnet elements
    const ipInput = container.querySelector("#subnet-ip-input");
    const cidrSelect = container.querySelector("#subnet-cidr-select");
    const cidrSlider = container.querySelector("#subnet-cidr-slider");
    const cidrDisplay = container.querySelector("#subnet-cidr-display");
    const ipValidationError = container.querySelector("#ip-validation-error");

    const resCidr = container.querySelector("#res-cidr");
    const resClass = container.querySelector("#res-class");
    const resNetwork = container.querySelector("#res-network");
    const resRange = container.querySelector("#res-range");
    const resBroadcast = container.querySelector("#res-broadcast");
    const resHosts = container.querySelector("#res-hosts");
    const resWildcard = container.querySelector("#res-wildcard");

    const binIp = container.querySelector("#bin-ip");
    const binMask = container.querySelector("#bin-mask");
    const binNetwork = container.querySelector("#bin-network");
    const binBroadcast = container.querySelector("#bin-broadcast");

    // MAC elements
    const macInput = container.querySelector("#mac-input");
    const macValidationError = container.querySelector("#mac-validation-error");
    const macVendor = container.querySelector("#mac-vendor");
    const macOuiPrefix = container.querySelector("#mac-oui-prefix");
    const macResColon = container.querySelector("#mac-res-colon");
    const macResHyphen = container.querySelector("#mac-res-hyphen");
    const macResDot = container.querySelector("#mac-res-dot");
    const macResRaw = container.querySelector("#mac-res-raw");

    const fmtColon = container.querySelector("#mac-fmt-btn-colon");
    const fmtHyphen = container.querySelector("#mac-fmt-btn-hyphen");
    const fmtDot = container.querySelector("#mac-fmt-btn-dot");
    const fmtRaw = container.querySelector("#mac-fmt-btn-raw");

    const formatButtons = [fmtColon, fmtHyphen, fmtDot, fmtRaw];
    let selectedFmt = "colon";

    let activeTab = "subnet";

    const guides = {
      subnet: {
        title: "Quick Guide: Subnet CIDR Calculator",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Input IP</strong>: Enter a standard IPv4 address (e.g. <code>192.168.1.5</code>) inside the input panel.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Set Mask</strong>: Adjust the CIDR range slider (e.g., sliding to <code>/24</code> or <code>/16</code>) or choose mask sizes from the drop-down selector.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Review subnets</strong>: Instantly inspect usable hosts range, total host calculations, wildcard values, and visual binary AND alignments.</div>
          </div>
        `
      },
      mac: {
        title: "Quick Guide: MAC Address & OUI Suite",
        steps: `
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">1</div>
            <div class="tool-guide-step-text"><strong>Enter MAC Address</strong>: Paste or type any 48-bit MAC address in any common notation (colons, hyphens, cisco dots, or flat raw hex).</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">2</div>
            <div class="tool-guide-step-text"><strong>Select Output Style</strong>: Choose formatting presets or copy the formatted fields directly from the details block.</div>
          </div>
          <div class="tool-guide-step">
            <div class="tool-guide-step-num">3</div>
            <div class="tool-guide-step-text"><strong>Local OUI Lookup</strong>: Instantly resolve vendor identities from local OUI prefix matching databases for network device profiles.</div>
          </div>
        `
      }
    };

    const switchTab = (tabId) => {
      activeTab = tabId;
      tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));

      panelSubnet.classList.toggle("hidden", tabId !== "subnet");
      panelMac.classList.toggle("hidden", tabId !== "mac");
      outputSubnet.classList.toggle("hidden", tabId !== "subnet");
      outputMac.classList.toggle("hidden", tabId !== "mac");

      if (guideTitle && guideSteps) {
        guideTitle.innerText = guides[tabId].title;
        guideSteps.innerHTML = guides[tabId].steps;
      }

      if (tabId === "subnet") {
        guideExample.style.display = "block";
        tryExampleBtn.style.display = "block";
        calculateSubnet();
      } else {
        guideExample.style.display = "none";
        tryExampleBtn.style.display = "none";
        calculateMac();
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener("click", () => switchTab(tab.dataset.tab));
    });

    // --- Subnet Calculator Code ---
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

    // Populate CIDR dropdown selector on init
    function populateCidrSelector() {
      cidrSelect.innerHTML = "";
      for (let i = 1; i <= 32; i++) {
        const mask = cidrToNetmask(i);
        const option = document.createElement("option");
        option.value = i;
        option.innerText = `/${i} (${mask})`;
        cidrSelect.appendChild(option);
      }
    }

    // Helper: converts CIDR to netmask string
    function cidrToNetmask(prefix) {
      const maskInt = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
      return uint32ToIp(maskInt);
    }

    // IP conversion helper functions
    function ipToUint32(ipStr) {
      const parts = ipStr.split(".").map(Number);
      return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
    }

    function uint32ToIp(val) {
      return [
        (val >>> 24) & 255,
        (val >>> 16) & 255,
        (val >>> 8) & 255,
        val & 255
      ].join(".");
    }

    // Binary representation helper
    function uint32ToBinary(val) {
      const bytes = [];
      for (let i = 3; i >= 0; i--) {
        const b = (val >>> (i * 8)) & 255;
        bytes.push(b.toString(2).padStart(8, "0"));
      }
      return bytes.join(".");
    }

    // Validation
    function isValidIPv4(ip) {
      const regex = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      return regex.test(ip);
    }

    // Class checking helper
    function getIpMetadata(ipStr, ipVal) {
      const firstOctet = (ipVal >>> 24) & 255;
      let ipClass = "A";
      let ipType = "Public Address";

      // Class categories
      if (firstOctet >= 1 && firstOctet <= 126) ipClass = "Class A";
      else if (firstOctet === 127) { ipClass = "Class A"; ipType = "Loopback / Diagnostic"; }
      else if (firstOctet >= 128 && firstOctet <= 191) ipClass = "Class B";
      else if (firstOctet >= 192 && firstOctet <= 223) ipClass = "Class C";
      else if (firstOctet >= 224 && firstOctet <= 239) ipClass = "Class D (Multicast)";
      else if (firstOctet >= 240 && firstOctet <= 255) ipClass = "Class E (Experimental)";

      // Private Network classifications (RFC 1918)
      const p1 = (ipVal >>> 24) & 255;
      const p2 = (ipVal >>> 16) & 255;
      if (p1 === 10) ipType = "Private Address (RFC 1918)";
      else if (p1 === 172 && (p2 >= 16 && p2 <= 31)) ipType = "Private Address (RFC 1918)";
      else if (p1 === 192 && p2 === 168) ipType = "Private Address (RFC 1918)";
      else if (p1 === 169 && p2 === 254) ipType = "Link-Local Address (APIPA)";

      return `${ipClass} (${ipType})`;
    }

    // Main calculator trigger
    function calculateSubnet() {
      const ip = ipInput.value.trim();
      const prefix = parseInt(cidrSelect.value, 10);
      
      if (!isValidIPv4(ip)) {
        ipValidationError.style.display = "block";
        clearOutputs();
        return;
      }
      ipValidationError.style.display = "none";

      const ipVal = ipToUint32(ip);
      const maskVal = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
      const wildcardVal = ~maskVal >>> 0;
      const networkVal = (ipVal & maskVal) >>> 0;
      const broadcastVal = (networkVal | wildcardVal) >>> 0;

      // Update basic fields
      resCidr.innerText = `${ip}/${prefix}`;
      resClass.innerText = getIpMetadata(ip, ipVal);
      resNetwork.innerText = `${uint32ToIp(networkVal)}/${prefix}`;
      resBroadcast.innerText = uint32ToIp(broadcastVal);
      resWildcard.innerText = uint32ToIp(wildcardVal);

      // Usable range and hosts calculation
      if (prefix === 32) {
        resRange.innerText = uint32ToIp(networkVal);
        resHosts.innerText = "1";
      } else if (prefix === 31) {
        resRange.innerText = `${uint32ToIp(networkVal)} - ${uint32ToIp(broadcastVal)}`;
        resHosts.innerText = "2";
      } else {
        const firstUsable = networkVal + 1;
        const lastUsable = broadcastVal - 1;
        resRange.innerText = `${uint32ToIp(firstUsable)} - ${uint32ToIp(lastUsable)}`;
        resHosts.innerText = (broadcastVal - networkVal - 1).toLocaleString();
      }

      // Binary representations
      binIp.innerText = uint32ToBinary(ipVal);
      binMask.innerText = uint32ToBinary(maskVal);
      binNetwork.innerText = uint32ToBinary(networkVal);
      binBroadcast.innerText = uint32ToBinary(broadcastVal);
    }

    function clearOutputs() {
      resCidr.innerText = "-";
      resClass.innerText = "-";
      resNetwork.innerText = "-";
      resRange.innerText = "-";
      resBroadcast.innerText = "-";
      resHosts.innerText = "-";
      resWildcard.innerText = "-";
      
      binIp.innerText = "-";
      binMask.innerText = "-";
      binNetwork.innerText = "-";
      binBroadcast.innerText = "-";
    }

    // Sync cidr slider and selector dropdown
    cidrSlider.addEventListener("input", () => {
      cidrSelect.value = cidrSlider.value;
      updateDisplayLabel();
      calculateSubnet();
    });

    cidrSelect.addEventListener("change", () => {
      cidrSlider.value = cidrSelect.value;
      updateDisplayLabel();
      calculateSubnet();
    });

    ipInput.addEventListener("input", calculateSubnet);

    function updateDisplayLabel() {
      const prefix = cidrSelect.value;
      const maskStr = cidrToNetmask(parseInt(prefix, 10));
      cidrDisplay.innerText = `/${prefix} (${maskStr})`;
    }

    // Try Example presets
    container.querySelector("#subnet-guide-load-sample")?.addEventListener("click", () => {
      if (activeExampleIndex === 0) {
        ipInput.value = "192.168.1.10";
        cidrSelect.value = "24";
        cidrSlider.value = "24";
        appInstance.showToast("Loaded Standard LAN (/24) example subnet", "success");
      } else {
        ipInput.value = "10.0.1.50";
        cidrSelect.value = "16";
        cidrSlider.value = "16";
        appInstance.showToast("Loaded Public Cloud VPC (/16) example range", "success");
      }
      updateDisplayLabel();
      calculateSubnet();
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    });

    // --- MAC Address Suite Code ---
    const ouiDict = {
      "00000C": "Cisco Systems, Inc.",
      "00105A": "Intel Corporation",
      "0017F2": "Apple, Inc.",
      "001C42": "Parallels International GmbH",
      "000569": "VMware, Inc.",
      "000C29": "VMware, Inc.",
      "005056": "VMware, Inc.",
      "3C5CC4": "Apple, Inc.",
      "F01898": "Apple, Inc.",
      "B827EB": "Raspberry Pi Foundation",
      "DCA632": "Raspberry Pi Foundation",
      "00155D": "Microsoft Corporation",
      "001422": "Dell Inc.",
      "0026B9": "Dell Inc.",
      "00E04C": "Realtek Semiconductor Corp.",
      "482C6A": "Ubiquiti Networks, Inc.",
      "ACDE48": "Private/Individual Registration (RFC 7042)",
      "10DDA2": "Cisco Systems, Inc.",
      "002590": "Super Micro Computer, Inc.",
      "001E67": "Intel Corporation",
      "E4E0A6": "Huawei Technologies Co., Ltd.",
      "080027": "PCS Systemtechnik GmbH (VirtualBox)"
    };

    function calculateMac() {
      const rawVal = macInput.value;
      const clean = rawVal.replace(/[^0-9a-fA-F]/g, "");
      
      if (clean.length !== 12) {
        macValidationError.style.display = "block";
        macVendor.innerText = "-";
        macOuiPrefix.innerText = "OUI Hex Prefix: -";
        macResColon.innerText = "-";
        macResHyphen.innerText = "-";
        macResDot.innerText = "-";
        macResRaw.innerText = "-";
        return;
      }
      
      macValidationError.style.display = "none";

      const colonVal = clean.match(/.{1,2}/g).join(":").toUpperCase();
      const hyphenVal = clean.match(/.{1,2}/g).join("-").toUpperCase();
      const dotVal = clean.match(/.{1,4}/g).join(".").toLowerCase();
      const rawHexVal = clean.toUpperCase();

      macResColon.innerText = colonVal;
      macResHyphen.innerText = hyphenVal;
      macResDot.innerText = dotVal;
      macResRaw.innerText = rawHexVal;

      const ouiPrefix = clean.substring(0, 6).toUpperCase();
      const vendor = ouiDict[ouiPrefix] || "Unknown Vendor (Private/Unregistered OUI prefix)";
      
      macVendor.innerText = vendor;
      macOuiPrefix.innerText = `OUI Hex Prefix: ${ouiPrefix.match(/.{1,2}/g).join("-")}`;
    }

    const reformatInputField = (fmt) => {
      selectedFmt = fmt;
      formatButtons.forEach(btn => {
        btn?.classList.toggle("active", btn.id === `mac-fmt-btn-${fmt}`);
      });

      const rawVal = macInput.value;
      const clean = rawVal.replace(/[^0-9a-fA-F]/g, "");
      if (clean.length === 12) {
        if (fmt === "colon") {
          macInput.value = clean.match(/.{1,2}/g).join(":").toUpperCase();
        } else if (fmt === "hyphen") {
          macInput.value = clean.match(/.{1,2}/g).join("-").toUpperCase();
        } else if (fmt === "dot") {
          macInput.value = clean.match(/.{1,4}/g).join(".").toLowerCase();
        } else if (fmt === "raw") {
          macInput.value = clean.toUpperCase();
        }
      }
    };

    fmtColon?.addEventListener("click", () => reformatInputField("colon"));
    fmtHyphen?.addEventListener("click", () => reformatInputField("hyphen"));
    fmtDot?.addEventListener("click", () => reformatInputField("dot"));
    fmtRaw?.addEventListener("click", () => reformatInputField("raw"));

    container.querySelector("#mac-device-apple")?.addEventListener("click", () => {
      macInput.value = "F0:18:98:A2:B3:C4";
      calculateMac();
      reformatInputField(selectedFmt);
      appInstance.showToast("Loaded Apple Device MAC address", "success");
    });
    container.querySelector("#mac-device-cisco")?.addEventListener("click", () => {
      macInput.value = "00-00-0C-12-34-56";
      calculateMac();
      reformatInputField(selectedFmt);
      appInstance.showToast("Loaded Cisco Router MAC address", "success");
    });
    container.querySelector("#mac-device-intel")?.addEventListener("click", () => {
      macInput.value = "001A.2B3C.4D5E";
      calculateMac();
      reformatInputField(selectedFmt);
      appInstance.showToast("Loaded Intel NIC MAC address", "success");
    });
    container.querySelector("#mac-device-vmware")?.addEventListener("click", () => {
      macInput.value = "0050567F1A2B";
      calculateMac();
      reformatInputField(selectedFmt);
      appInstance.showToast("Loaded VMware MAC address", "success");
    });

    macInput.addEventListener("input", calculateMac);

    container.querySelectorAll(".mac-copy-val-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const val = container.querySelector(`#${targetId}`)?.innerText;
        if (val && val !== "-") {
          appInstance.copyText(val);
        } else {
          appInstance.showToast("Nothing to copy!", "warning");
        }
      });
    });

    // Run population and initial calculation
    populateCidrSelector();
    cidrSelect.value = "24";
    cidrSlider.value = "24";
    updateDisplayLabel();
    
    // Set initial active tab
    const initialTab = appInstance.activeSubtab || 'subnet';
    appInstance.activeSubtab = null;
    switchTab(initialTab);
  }
};
