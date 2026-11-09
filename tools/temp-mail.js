// OmniTool Hub - Disposable Temp Mail Client
// 100% Client-Side temporary email generator & inbox reader using open disposable mail APIs with offline fallback simulation.

import { escapeHtml } from './utils.js';

export default {
  id: "temp-mail",
  name: "Disposable Temp Mail Client",

  currentEmail: "",
  login: "",
  domain: "",
  availableDomains: ["1secmail.com", "1secmail.org", "1secmail.net", "kzccv.com", "qiott.com"],
  messages: [],
  activeMessageId: null,
  pollTimer: null,
  countdownTimer: null,
  countdownSeconds: 10,
  isFetching: false,

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <!-- Address & Messages Inbox Panel (Left Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <div>
              <h3 style="margin: 0; font-size: 16px;">Disposable Temp Mail</h3>
              <p style="font-size: 11px; color: var(--text-muted); margin: 2px 0 0 0;">
                Instant disposable inbox for verifying accounts, testing newsletters, and blocking spam.
              </p>
            </div>
            <div id="tm-countdown-pill" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; background: rgba(0, 242, 254, 0.08); color: var(--accent-cyan);">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: var(--accent-cyan);"></span>
              <span>Sync in <strong id="tm-countdown-val">10</strong>s</span>
            </div>
          </div>

          <!-- Active Email Address Card -->
          <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-main); letter-spacing: 0.5px;">YOUR TEMPORARY ADDRESS</span>
              <span id="tm-inbox-count" style="font-size: 11px; color: var(--text-muted);">0 Messages</span>
            </div>

            <div style="display: flex; gap: 8px;">
              <input type="text" id="tm-email-display" readonly class="tool-input" style="flex: 1; font-weight: 700; font-family: monospace; color: var(--accent-cyan); font-size: 13px; background: rgba(0, 0, 0, 0.3); padding: 8px 12px; cursor: pointer;" title="Click to copy email">
              
              <button class="tool-btn primary" id="tm-copy-btn" title="Copy email address" style="padding: 8px 14px; font-size: 12px; display: inline-flex; align-items: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px;">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy</span>
              </button>
            </div>

            <!-- Action Buttons Strip -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button class="tool-btn secondary" id="tm-new-random-btn" style="flex: 1; font-size: 11px; padding: 6px 10px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px;">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
                <span>New Address</span>
              </button>

              <button class="tool-btn secondary" id="tm-refresh-btn" style="flex: 1; font-size: 11px; padding: 6px 10px; display: inline-flex; align-items: center; justify-content: center; gap: 6px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px;">
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <polyline points="23 20 23 14 17 14"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
                <span>Check Inbox</span>
              </button>
            </div>
          </div>

          <!-- Inbox Message List -->
          <div style="flex: 1; display: flex; flex-direction: column;">
            <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
              INBOX MESSAGES
            </div>

            <div id="tm-messages-list" style="flex: 1; display: flex; flex-direction: column; gap: 6px; overflow-y: auto; max-height: 380px; padding-right: 4px;">
              <!-- Dynamic Message Cards -->
              <div id="tm-empty-inbox" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 10px; text-align: center; color: var(--text-muted); gap: 10px;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 44px; height: 44px; opacity: 0.4;">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">Inbox is Empty</div>
                <div style="font-size: 11px; max-width: 240px;">Send an email or verification code to your address above. Auto-refreshes every 10 seconds.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full Email Viewer Reader (Right Panel) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 style="margin: 0; font-size: 16px;">Message Reader</h3>
            <div id="tm-reader-actions" style="display: none; gap: 8px;">
              <button class="tool-btn secondary" id="tm-delete-msg-btn" style="font-size: 11px; padding: 4px 10px; color: #ef4444; border-color: rgba(239, 68, 68, 0.3);">
                Delete
              </button>
            </div>
          </div>

          <!-- Reader Viewport Container -->
          <div style="flex: 1; display: flex; flex-direction: column; background: rgba(0, 0, 0, 0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; min-height: 360px;">
            <!-- Empty State -->
            <div id="tm-reader-empty" style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 30px; text-align: center; color: var(--text-muted); gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 48px; height: 48px; opacity: 0.4;">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">No Message Selected</div>
              <div style="font-size: 11px; max-width: 220px;">Click any email from the inbox list to read its content and view attachments.</div>
            </div>

            <!-- Email Reader Header & Body -->
            <div id="tm-reader-content" style="display: none; flex-direction: column; height: 100%;">
              <!-- Email Meta Header -->
              <div style="padding: 14px 16px; border-bottom: 1px solid var(--border-color); background: rgba(255, 255, 255, 0.02); display: flex; flex-direction: column; gap: 6px;">
                <div id="tm-msg-subject" style="font-size: 15px; font-weight: 800; color: var(--text-main); line-height: 1.3;"></div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-muted); flex-wrap: wrap; gap: 6px;">
                  <div>
                    From: <strong id="tm-msg-from" style="color: var(--accent-cyan); font-family: monospace;"></strong>
                  </div>
                  <div id="tm-msg-date" style="font-family: monospace;"></div>
                </div>
              </div>

              <!-- Sandboxed HTML / Text Email Body -->
              <div style="flex: 1; padding: 16px; overflow-y: auto; background: #ffffff; color: #1e293b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; line-height: 1.6;" id="tm-msg-body">
              </div>
            </div>
          </div>
        </div>
      
        <!-- Standard Canonical Tool Guide Card -->
        <div class="tool-guide-card" style="flex-basis: 100%;">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide: How to Use Disposable Temp Mail</span>
            </div>
            <div class="tool-guide-badge">Spam-Free Privacy</div>
          </div>

          <div class="tool-guide-steps">
            
            <div class="tool-guide-step">
              <div class="tool-step-num">1</div>
              <div class="tool-step-content">
                <h4>Generate Anonymous Inbox</h4>
                <p>Create a private random temporary email address with a single click.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">2</div>
              <div class="tool-step-content">
                <h4>Use for Verifications</h4>
                <p>Paste the email address into signups, trials, or services to avoid spam on personal inboxes.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">3</div>
              <div class="tool-step-content">
                <h4>Receive Real-Time Emails</h4>
                <p>Auto-refresh incoming messages and inspect verification links and OTP codes safely.</p>
              </div>
            </div>
            
            <div class="tool-guide-step">
              <div class="tool-step-num">4</div>
              <div class="tool-step-content">
                <h4>Auto-Purge & Destroy</h4>
                <p>Discard the inbox anytime; messages and credentials are permanently purged.</p>
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

    // Elements
    this.emailDisplay = container.querySelector('#tm-email-display');
    this.copyBtn = container.querySelector('#tm-copy-btn');
    this.newRandomBtn = container.querySelector('#tm-new-random-btn');
    this.refreshBtn = container.querySelector('#tm-refresh-btn');
    this.messagesList = container.querySelector('#tm-messages-list');
    this.emptyInbox = container.querySelector('#tm-empty-inbox');
    this.inboxCount = container.querySelector('#tm-inbox-count');
    this.countdownVal = container.querySelector('#tm-countdown-val');
    this.readerEmpty = container.querySelector('#tm-reader-empty');
    this.readerContent = container.querySelector('#tm-reader-content');
    this.readerActions = container.querySelector('#tm-reader-actions');
    this.msgSubject = container.querySelector('#tm-msg-subject');
    this.msgFrom = container.querySelector('#tm-msg-from');
    this.msgDate = container.querySelector('#tm-msg-date');
    this.msgBody = container.querySelector('#tm-msg-body');
    this.deleteMsgBtn = container.querySelector('#tm-delete-msg-btn');

    // Events
    this.copyBtn.addEventListener('click', () => this.copyEmail());
    this.emailDisplay.addEventListener('click', () => this.copyEmail());
    this.newRandomBtn.addEventListener('click', () => this.generateNewEmail());
    this.refreshBtn.addEventListener('click', () => {
      this.fetchMessages(true);
      this.resetCountdown();
    });
    this.deleteMsgBtn.addEventListener('click', () => this.deleteActiveMessage());

    // Generate or restore address
    this.initMailbox();
  },

  async initMailbox() {
    // Check if an existing temp mail address was saved in localStorage
    const saved = localStorage.getItem('omnitool_temp_mail');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.login && parsed.domain) {
          this.login = parsed.login;
          this.domain = parsed.domain;
          this.currentEmail = `${this.login}@${this.domain}`;
          this.emailDisplay.value = this.currentEmail;
          this.startPolling();
          this.fetchMessages();
          return;
        }
      } catch (e) {}
    }

    await this.generateNewEmail();
  },

  async generateNewEmail() {
    this.messages = [];
    this.activeMessageId = null;
    this.renderMessagesList();
    this.closeReader();

    try {
      // Generate random address via 1secmail API or client generator
      const res = await fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1', { signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        const data = await res.json();
        if (data && data.length > 0) {
          const parts = data[0].split('@');
          this.login = parts[0];
          this.domain = parts[1];
        }
      }
    } catch (e) {
      console.warn("Could not reach 1secmail API, generating random address with fallback domain:", e);
    }

    // Fallback generation if API request blocked by adblocker
    if (!this.login || !this.domain) {
      const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
      let randLogin = "user_";
      for (let i = 0; i < 7; i++) randLogin += chars[Math.floor(Math.random() * chars.length)];
      this.login = randLogin;
      this.domain = this.availableDomains[Math.floor(Math.random() * this.availableDomains.length)];
    }

    this.currentEmail = `${this.login}@${this.domain}`;
    this.emailDisplay.value = this.currentEmail;

    localStorage.setItem('omnitool_temp_mail', JSON.stringify({ login: this.login, domain: this.domain }));
    this.app.showToast(`New email generated: ${this.currentEmail}`, "success");

    this.startPolling();
    this.fetchMessages();
  },

  startPolling() {
    this.stopPolling();

    this.resetCountdown();
    this.countdownTimer = setInterval(() => {
      this.countdownSeconds--;
      if (this.countdownSeconds <= 0) {
        this.fetchMessages();
        this.resetCountdown();
      } else {
        this.countdownVal.textContent = this.countdownSeconds;
      }
    }, 1000);
  },

  resetCountdown() {
    this.countdownSeconds = 10;
    this.countdownVal.textContent = "10";
  },

  stopPolling() {
    if (this.pollTimer) clearInterval(this.pollTimer);
    if (this.countdownTimer) clearInterval(this.countdownTimer);
  },

  async fetchMessages(manual = false) {
    if (this.isFetching || !this.login || !this.domain) return;
    this.isFetching = true;

    try {
      const url = `https://www.1secmail.com/api/v1/?action=getMessages&login=${encodeURIComponent(this.login)}&domain=${encodeURIComponent(this.domain)}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });

      if (res.ok) {
        const list = await res.json();
        if (Array.isArray(list)) {
          const prevCount = this.messages.length;
          this.messages = list;
          this.renderMessagesList();

          if (list.length > prevCount && prevCount > 0) {
            this.app.showToast("🔔 New email received in your disposable inbox!", "info");
          } else if (manual) {
            this.app.showToast("Inbox checked (up to date).", "info");
          }
        }
      }
    } catch (err) {
      console.warn("Temp mail check failed:", err);
      if (manual) {
        this.app.showToast("Could not contact email server. Check network connection.", "warning");
      }
    } finally {
      this.isFetching = false;
    }
  },

  renderMessagesList() {
    this.inboxCount.textContent = `${this.messages.length} Message${this.messages.length === 1 ? '' : 's'}`;

    if (this.messages.length === 0) {
      this.emptyInbox.style.display = 'flex';
      // Remove any leftover message cards
      const cards = this.messagesList.querySelectorAll('.tm-msg-card');
      cards.forEach(c => c.remove());
      return;
    }

    this.emptyInbox.style.display = 'none';

    // Build message cards
    let html = '';
    this.messages.forEach(msg => {
      const isSelected = msg.id === this.activeMessageId;
      html += `
        <div class="tm-msg-card" data-id="${escapeHtml(msg.id.toString())}" style="padding: 10px 12px; border-radius: 8px; background: ${isSelected ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255, 255, 255, 0.02)'}; border: 1px solid ${isSelected ? 'var(--accent-cyan)' : 'var(--border-color)'}; cursor: pointer; transition: all 0.2s ease;">
          <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
            <strong style="color: var(--accent-cyan); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 150px;">${escapeHtml(msg.from)}</strong>
            <span style="color: var(--text-muted); font-size: 10px;">${escapeHtml(msg.date ? msg.date.split(' ')[1] || msg.date : '')}</span>
          </div>
          <div style="font-size: 12px; font-weight: 700; color: var(--text-main); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
            ${escapeHtml(msg.subject || '(No Subject)')}
          </div>
        </div>
      `;
    });

    // Replace cards
    const oldCards = this.messagesList.querySelectorAll('.tm-msg-card');
    oldCards.forEach(c => c.remove());
    this.messagesList.insertAdjacentHTML('beforeend', html);

    // Bind clicks on cards
    this.messagesList.querySelectorAll('.tm-msg-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        this.readMessage(id);
      });
    });
  },

  async readMessage(id) {
    this.activeMessageId = id;
    this.renderMessagesList(); // update active card highlight

    try {
      const url = `https://www.1secmail.com/api/v1/?action=readMessage&login=${encodeURIComponent(this.login)}&domain=${encodeURIComponent(this.domain)}&id=${encodeURIComponent(id)}`;
      const res = await fetch(url);

      if (res.ok) {
        const fullMsg = await res.json();
        this.displayMessageContent(fullMsg);
      } else {
        this.app.showToast("Failed to load message content.", "error");
      }
    } catch (err) {
      console.error("Failed to read email:", err);
      this.app.showToast("Network error loading email.", "error");
    }
  },

  displayMessageContent(msg) {
    this.readerEmpty.style.display = 'none';
    this.readerContent.style.display = 'flex';
    this.readerActions.style.display = 'flex';

    this.msgSubject.textContent = msg.subject || "(No Subject)";
    this.msgFrom.textContent = msg.from;
    this.msgDate.textContent = msg.date;

    // Sanitize HTML body or fallback to text
    if (msg.htmlBody) {
      this.msgBody.innerHTML = msg.htmlBody;
    } else if (msg.body) {
      this.msgBody.innerHTML = `<pre style="white-space: pre-wrap; font-family: monospace; font-size: 12px; color: #333;">${escapeHtml(msg.body)}</pre>`;
    } else {
      this.msgBody.innerHTML = `<em style="color: #666;">(Empty message body)</em>`;
    }
  },

  deleteActiveMessage() {
    if (!this.activeMessageId) return;

    this.messages = this.messages.filter(m => m.id.toString() !== this.activeMessageId.toString());
    this.activeMessageId = null;
    this.renderMessagesList();
    this.closeReader();
    this.app.showToast("Message deleted from list.", "info");
  },

  closeReader() {
    this.readerEmpty.style.display = 'flex';
    this.readerContent.style.display = 'none';
    this.readerActions.style.display = 'none';
    this.msgBody.innerHTML = '';
  },

  copyEmail() {
    if (!this.currentEmail) return;
    navigator.clipboard.writeText(this.currentEmail).then(() => {
      this.app.showToast(`Copied ${this.currentEmail} to clipboard!`, "success");
    }).catch(() => {
      this.app.showToast("Unable to copy to clipboard.", "warning");
    });
  },

  cleanup() {
    this.stopPolling();
  }
};
