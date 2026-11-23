import { escapeHtml } from './utils.js';

let appInstance = null;

const PRESETS = [
  { octal: "0644", name: "Standard Web Files (644)", desc: "Owner read/write; Group & Others read-only. Standard for HTML, CSS, JS, and image files.", badge: "Recommended", color: "var(--accent-emerald)" },
  { octal: "0755", name: "Standard Directories & Executables (755)", desc: "Owner full access; Group & Others read and execute. Standard for folders and shell scripts.", badge: "Recommended", color: "var(--accent-cyan)" },
  { octal: "0600", name: "SSH Private Key / Sensitive Files (600)", desc: "Owner read/write only; zero access for everyone else. Required by OpenSSH for id_rsa keys.", badge: "High Security", color: "var(--accent-purple)" },
  { octal: "0400", name: "Read-Only Key File (400)", desc: "Owner read-only; no write or execute. Strictest security for AWS EC2 .pem private keys.", badge: "Maximum Security", color: "var(--accent-purple)" },
  { octal: "0700", name: "Private User Folder (700)", desc: "Owner full control; hidden from group and other system users. Ideal for ~/.ssh directory.", badge: "Secure Dir", color: "var(--accent-cyan)" },
  { octal: "0777", name: "Full Public Access (777)", desc: "Read, write, and execute for EVERYONE on the server. Major security vulnerability!", badge: "Hazardous ⚠️", color: "var(--accent-rose)" }
];

export default {
  id: "chmod-calculator",
  name: "Linux Chmod Permissions Calculator",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration Matrix (Left) -->
        <div class="tool-panel">
          <div class="panel-header" style="justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="color: var(--accent-emerald);">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Permissions Matrix</span>
            </h3>
            <button class="tool-btn secondary" id="chmod-reset-btn" style="font-size: 11px; padding: 3px 8px;">Reset to 755</button>
          </div>

          <!-- 3x3 Checkbox Matrix Table -->
          <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; margin-top: 4px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; text-align: center;">
              <thead>
                <tr style="background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--border-color); color: var(--text-muted); font-size: 11px; text-transform: uppercase;">
                  <th style="padding: 10px; text-align: left;">Scope</th>
                  <th style="padding: 10px; color: var(--accent-cyan);">Read (4)</th>
                  <th style="padding: 10px; color: var(--accent-emerald);">Write (2)</th>
                  <th style="padding: 10px; color: var(--accent-purple);">Execute (1)</th>
                </tr>
              </thead>
              <tbody>
                <!-- Owner / User -->
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                  <td style="padding: 10px; text-align: left; font-weight: 700; color: var(--text-main);">
                    <span>Owner / User</span>
                    <span style="display: block; font-size: 9.5px; color: var(--text-muted); font-weight: 400;">File Creator (u)</span>
                  </td>
                  <td style="padding: 10px;"><input type="checkbox" id="chmod-u-r" checked style="width: 17px; height: 17px; cursor: pointer;"></td>
                  <td style="padding: 10px;"><input type="checkbox" id="chmod-u-w" checked style="width: 17px; height: 17px; cursor: pointer;"></td>
                  <td style="padding: 10px;"><input type="checkbox" id="chmod-u-x" checked style="width: 17px; height: 17px; cursor: pointer;"></td>
                </tr>

                <!-- Group -->
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.04);">
                  <td style="padding: 10px; text-align: left; font-weight: 700; color: var(--text-main);">
                    <span>Group</span>
                    <span style="display: block; font-size: 9.5px; color: var(--text-muted); font-weight: 400;">User Group (g)</span>
                  </td>
                  <td style="padding: 10px;"><input type="checkbox" id="chmod-g-r" checked style="width: 17px; height: 17px; cursor: pointer;"></td>
                  <td style="padding: 10px;"><input type="checkbox" id="chmod-g-w" style="width: 17px; height: 17px; cursor: pointer;"></td>
                  <td style="padding: 10px;"><input type="checkbox" id="chmod-g-x" checked style="width: 17px; height: 17px; cursor: pointer;"></td>
                </tr>

                <!-- Public / Others -->
                <tr>
                  <td style="padding: 10px; text-align: left; font-weight: 700; color: var(--text-main);">
                    <span>Public / Others</span>
                    <span style="display: block; font-size: 9.5px; color: var(--text-muted); font-weight: 400;">World / Web (o)</span>
                  </td>
                  <td style="padding: 10px;"><input type="checkbox" id="chmod-o-r" checked style="width: 17px; height: 17px; cursor: pointer;"></td>
                  <td style="padding: 10px;"><input type="checkbox" id="chmod-o-w" style="width: 17px; height: 17px; cursor: pointer;"></td>
                  <td style="padding: 10px;"><input type="checkbox" id="chmod-o-x" checked style="width: 17px; height: 17px; cursor: pointer;"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Special Bits (SUID, SGID, Sticky) -->
          <div style="margin-top: 14px; padding: 12px; border: 1px dashed var(--border-color); border-radius: 8px; background: rgba(255, 255, 255, 0.015);">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <span>Special Attributes (Advanced)</span>
            </div>
            <div style="display: flex; gap: 16px; font-size: 11px;">
              <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
                <input type="checkbox" id="chmod-suid" style="cursor: pointer;">
                <span>SetUID (4000)</span>
              </label>
              <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
                <input type="checkbox" id="chmod-sgid" style="cursor: pointer;">
                <span>SetGID (2000)</span>
              </label>
              <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
                <input type="checkbox" id="chmod-sticky" style="cursor: pointer;">
                <span>Sticky Bit (1000)</span>
              </label>
            </div>
          </div>

          <!-- Common Presets Carousel / List -->
          <div class="form-group" style="margin-top: 14px;">
            <label style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Standard Server Presets</label>
            <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 6px;" id="chmod-presets-list">
              <!-- Populated via JS -->
            </div>
          </div>
        </div>

        <!-- Output & Terminal Command Panel (Right) -->
        <div class="tool-panel" style="gap: 16px;">
          <div class="panel-header" style="justify-content: space-between; align-items: center;">
            <h3 style="margin: 0; display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="color: var(--accent-cyan);">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              <span>Calculated Values</span>
            </h3>
            <span id="chmod-security-badge" class="tool-badge" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); font-weight: 700; padding: 3px 8px; font-size: 10px;">Safe Standard</span>
          </div>

          <!-- Big Octal & Symbolic Display Cards -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="glass-card" style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
              <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Octal Notation</div>
              <div id="chmod-octal-val" style="font-size: 38px; font-weight: 800; color: var(--accent-cyan); font-family: var(--font-mono); margin-top: 4px; letter-spacing: 2px;">0755</div>
              <div style="font-size: 10px; color: var(--text-muted); margin-top: 4px;">User (7) • Group (5) • Others (5)</div>
            </div>

            <div class="glass-card" style="padding: 16px; border: 1px solid var(--border-color); border-radius: 8px; text-align: center;">
              <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">Symbolic String</div>
              <div id="chmod-symbolic-val" style="font-size: 26px; font-weight: 800; color: var(--accent-emerald); font-family: var(--font-mono); margin-top: 10px;">-rwxr-xr-x</div>
              <div style="font-size: 10px; color: var(--text-muted); margin-top: 8px;">POSIX standard string</div>
            </div>
          </div>

          <!-- Terminal Command Generator -->
          <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 10px; padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.5px;">Terminal Bash Command</div>
              <button class="tool-btn secondary" id="chmod-copy-cmd-btn" style="padding: 4px 10px; font-size: 11px; display: inline-flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy Command</span>
              </button>
            </div>

            <!-- Command Terminal Box -->
            <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--border-color); border-radius: 6px; padding: 12px 14px; font-family: var(--font-mono); font-size: 13.5px; color: var(--accent-cyan); display: flex; align-items: center; gap: 8px;">
              <span style="color: var(--text-muted); user-select: none;">$</span>
              <span id="chmod-command-text" style="color: #fff; font-weight: 700;">chmod 755 filename.txt</span>
            </div>

            <!-- Custom Command Modifiers -->
            <div class="form-row" style="grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 14px;">
              <div class="form-group">
                <label for="chmod-target-name" style="font-size: 11px;">Target File or Directory</label>
                <input type="text" id="chmod-target-name" class="form-input" value="filename.txt" style="font-family: var(--font-mono); font-size: 12px;">
              </div>
              <div class="form-group" style="justify-content: flex-end;">
                <div style="display: flex; gap: 14px; font-size: 11px; margin-bottom: 6px;">
                  <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
                    <input type="checkbox" id="chmod-recursive" style="cursor: pointer;">
                    <span>Recursive (-R)</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 5px; cursor: pointer;">
                    <input type="checkbox" id="chmod-sudo" style="cursor: pointer;">
                    <span>sudo</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Assessment Card -->
          <div id="chmod-risk-box" style="padding: 12px 14px; border-radius: 8px; border: 1px solid var(--border-color); background: rgba(255,255,255,0.015); font-size: 12px; line-height: 1.5;">
            <div style="font-weight: 700; color: var(--text-main); margin-bottom: 2px;" id="chmod-risk-title">Security Assessment</div>
            <div style="color: var(--text-muted);" id="chmod-risk-desc">Standard secure configuration for web server files and directories.</div>
          </div>
        </div>

        <!-- Tool Guide Card (Canonical Layout Standard) -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Linux File Permissions &amp; Octal Math Reference</span>
            </div>
            <div class="tool-guide-badge">Zero-Server 100% Client-Side</div>
          </div>

          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Octal Number System (Base 8)</h4>
                <p>Every permission bit has a binary-weighted value: <strong>Read (r) = 4</strong>, <strong>Write (w) = 2</strong>, and <strong>Execute (x) = 1</strong>. Adding them together creates an octal digit between 0 and 7. For example: <code>Read (4) + Execute (1) = 5</code>.</p>
              </div>
            </div>

            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Three Permission Scopes</h4>
                <p>Linux organizes permissions into three sequential triads: <strong>User/Owner (u)</strong>, <strong>Group (g)</strong>, and <strong>Others/Public (o)</strong>. An octal notation of <code>755</code> translates to User=7 (rwx), Group=5 (r-x), and Others=5 (r-x).</p>
              </div>
            </div>

            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>The Golden Rule for Web Servers</h4>
                <p>Files should be <strong>644</strong> (<code>-rw-r--r--</code>) so visitors can read pages without modifying scripts. Folders should be <strong>755</strong> (<code>drwxr-xr-x</code>) so Apache/Nginx can enter directories. <strong>Never use 777 in production</strong> as it allows anyone to overwrite executable code.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(app) {
    appInstance = app;
    const root = document.querySelector("#tool-viewport");
    if (!root) return;

    const checkboxes = {
      ur: root.querySelector("#chmod-u-r"),
      uw: root.querySelector("#chmod-u-w"),
      ux: root.querySelector("#chmod-u-x"),
      gr: root.querySelector("#chmod-g-r"),
      gw: root.querySelector("#chmod-g-w"),
      gx: root.querySelector("#chmod-g-x"),
      or: root.querySelector("#chmod-o-r"),
      ow: root.querySelector("#chmod-o-w"),
      ox: root.querySelector("#chmod-o-x"),
      suid: root.querySelector("#chmod-suid"),
      sgid: root.querySelector("#chmod-sgid"),
      sticky: root.querySelector("#chmod-sticky")
    };

    const octalDisplay = root.querySelector("#chmod-octal-val");
    const symbolicDisplay = root.querySelector("#chmod-symbolic-val");
    const commandText = root.querySelector("#chmod-command-text");
    const targetInput = root.querySelector("#chmod-target-name");
    const recursiveCheck = root.querySelector("#chmod-recursive");
    const sudoCheck = root.querySelector("#chmod-sudo");
    const securityBadge = root.querySelector("#chmod-security-badge");
    const riskBox = root.querySelector("#chmod-risk-box");
    const riskTitle = root.querySelector("#chmod-risk-title");
    const riskDesc = root.querySelector("#chmod-risk-desc");

    const updateChmod = () => {
      // Calculate special bit
      let special = 0;
      if (checkboxes.suid?.checked) special += 4;
      if (checkboxes.sgid?.checked) special += 2;
      if (checkboxes.sticky?.checked) special += 1;

      // Calculate scopes
      const u = (checkboxes.ur?.checked ? 4 : 0) + (checkboxes.uw?.checked ? 2 : 0) + (checkboxes.ux?.checked ? 1 : 0);
      const g = (checkboxes.gr?.checked ? 4 : 0) + (checkboxes.gw?.checked ? 2 : 0) + (checkboxes.gx?.checked ? 1 : 0);
      const o = (checkboxes.or?.checked ? 4 : 0) + (checkboxes.ow?.checked ? 2 : 0) + (checkboxes.ox?.checked ? 1 : 0);

      const octalStr = `${special > 0 ? special : 0}${u}${g}${o}`;
      const shortOctal = `${u}${g}${o}`;

      // Build symbolic string
      let sU = (checkboxes.ur?.checked ? "r" : "-") + (checkboxes.uw?.checked ? "w" : "-");
      if (checkboxes.suid?.checked) sU += (checkboxes.ux?.checked ? "s" : "S");
      else sU += (checkboxes.ux?.checked ? "x" : "-");

      let sG = (checkboxes.gr?.checked ? "r" : "-") + (checkboxes.gw?.checked ? "w" : "-");
      if (checkboxes.sgid?.checked) sG += (checkboxes.gx?.checked ? "s" : "S");
      else sG += (checkboxes.gx?.checked ? "x" : "-");

      let sO = (checkboxes.or?.checked ? "r" : "-") + (checkboxes.ow?.checked ? "w" : "-");
      if (checkboxes.sticky?.checked) sO += (checkboxes.ox?.checked ? "t" : "T");
      else sO += (checkboxes.ox?.checked ? "x" : "-");

      const symbolicStr = `-${sU}${sG}${sO}`;

      // Update UI
      if (octalDisplay) octalDisplay.textContent = octalStr;
      if (symbolicDisplay) symbolicDisplay.textContent = symbolicStr;

      // Command text
      const target = (targetInput?.value || "filename.txt").trim();
      const rec = recursiveCheck?.checked ? "-R " : "";
      const sud = sudoCheck?.checked ? "sudo " : "";
      const cmd = `${sud}chmod ${rec}${special > 0 ? octalStr : shortOctal} ${target}`;
      if (commandText) commandText.textContent = cmd;

      // Security Assessment
      if (u === 7 && g === 7 && o === 7) {
        if (securityBadge) {
          securityBadge.textContent = "High Risk (777)";
          securityBadge.style.color = "var(--accent-rose)";
          securityBadge.style.background = "rgba(244, 63, 94, 0.15)";
        }
        if (riskBox) {
          riskBox.style.borderColor = "var(--accent-rose)";
          riskBox.style.background = "rgba(244, 63, 94, 0.05)";
        }
        if (riskTitle) riskTitle.textContent = "⚠️ Security Hazard (777)";
        if (riskDesc) riskDesc.textContent = "Everyone on the system and web can modify and execute this file. Never use 777 in production environments.";
      } else if (u === 6 && g === 0 && o === 0) {
        if (securityBadge) {
          securityBadge.textContent = "Maximum Security";
          securityBadge.style.color = "var(--accent-purple)";
          securityBadge.style.background = "rgba(157, 78, 221, 0.15)";
        }
        if (riskBox) {
          riskBox.style.borderColor = "var(--accent-purple)";
          riskBox.style.background = "rgba(157, 78, 221, 0.04)";
        }
        if (riskTitle) riskTitle.textContent = "🔒 High Security (600)";
        if (riskDesc) riskDesc.textContent = "Only the file owner can read and write. Perfect for SSH private keys, credentials, and .env files.";
      } else {
        if (securityBadge) {
          securityBadge.textContent = "Standard Linux";
          securityBadge.style.color = "var(--accent-emerald)";
          securityBadge.style.background = "rgba(16, 185, 129, 0.15)";
        }
        if (riskBox) {
          riskBox.style.borderColor = "var(--border-color)";
          riskBox.style.background = "rgba(255, 255, 255, 0.015)";
        }
        if (riskTitle) riskTitle.textContent = "Standard Server Configuration";
        if (riskDesc) riskDesc.textContent = `Permissions allow Owner to ${u === 7 ? "full control" : (u === 6 ? "read/write" : "read")}, with appropriate group & public limits.`;
      }
    };

    // Attach listeners to all inputs
    Object.values(checkboxes).forEach(cb => {
      cb?.addEventListener("change", updateChmod);
    });

    targetInput?.addEventListener("input", updateChmod);
    recursiveCheck?.addEventListener("change", updateChmod);
    sudoCheck?.addEventListener("change", updateChmod);

    // Copy command button
    root.querySelector("#chmod-copy-cmd-btn")?.addEventListener("click", () => {
      if (commandText) {
        navigator.clipboard.writeText(commandText.textContent).then(() => {
          if (appInstance && typeof appInstance.showToast === "function") {
            appInstance.showToast("Copied chmod command to clipboard!", "success");
          }
        });
      }
    });

    // Reset button
    root.querySelector("#chmod-reset-btn")?.addEventListener("click", () => {
      setPermissionsFromOctal("0755");
    });

    // Render presets list
    const presetsList = root.querySelector("#chmod-presets-list");
    if (presetsList) {
      presetsList.innerHTML = PRESETS.map(p => `
        <div class="glass-card chmod-preset-item" data-octal="${p.octal}" style="padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer; transition: all 0.15s ease; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: 11.5px; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
              <span style="font-family: var(--font-mono); color: var(--accent-cyan); font-weight: 800;">${p.octal.slice(1)}</span>
              <span>${escapeHtml(p.name)}</span>
            </div>
            <div style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">${escapeHtml(p.desc)}</div>
          </div>
          <span class="tool-badge" style="font-size: 9.5px; padding: 2px 6px; color: ${p.color};">${escapeHtml(p.badge)}</span>
        </div>
      `).join("");

      presetsList.querySelectorAll(".chmod-preset-item").forEach(item => {
        item.addEventListener("click", () => {
          setPermissionsFromOctal(item.dataset.octal);
          if (appInstance && typeof appInstance.showToast === "function") {
            appInstance.showToast(`Applied ${item.dataset.octal.slice(1)} preset!`, "success");
          }
        });
      });
    }

    function setPermissionsFromOctal(octalStr) {
      const padded = octalStr.padStart(4, "0");
      const s = parseInt(padded[0], 10);
      const u = parseInt(padded[1], 10);
      const g = parseInt(padded[2], 10);
      const o = parseInt(padded[3], 10);

      if (checkboxes.suid) checkboxes.suid.checked = Boolean(s & 4);
      if (checkboxes.sgid) checkboxes.sgid.checked = Boolean(s & 2);
      if (checkboxes.sticky) checkboxes.sticky.checked = Boolean(s & 1);

      if (checkboxes.ur) checkboxes.ur.checked = Boolean(u & 4);
      if (checkboxes.uw) checkboxes.uw.checked = Boolean(u & 2);
      if (checkboxes.ux) checkboxes.ux.checked = Boolean(u & 1);

      if (checkboxes.gr) checkboxes.gr.checked = Boolean(g & 4);
      if (checkboxes.gw) checkboxes.gw.checked = Boolean(g & 2);
      if (checkboxes.gx) checkboxes.gx.checked = Boolean(g & 1);

      if (checkboxes.or) checkboxes.or.checked = Boolean(o & 4);
      if (checkboxes.ow) checkboxes.ow.checked = Boolean(o & 2);
      if (checkboxes.ox) checkboxes.ox.checked = Boolean(o & 1);

      updateChmod();
    }

    // Initialize with 755
    setPermissionsFromOctal("0755");
  },

  cleanup() {
    appInstance = null;
  }
};
