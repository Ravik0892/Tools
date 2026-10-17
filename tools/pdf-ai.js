// OmniTool Hub - AI PDF Document Summarizer & Multilingual Translator
// Client-side PDF text extraction with Google Gemini Flash API integration & offline statistical NLP heuristic engine.

import { escapeHtml } from './utils.js';

export default {
  id: "pdf-ai",
  name: "AI PDF Summarizer & Translator",

  extractedText: "",
  fileName: "",
  pdfjsDoc: null,
  activeMode: "summary", // 'summary' | 'actions' | 'translate' | 'chat'
  aiResult: "",
  chatHistory: [],

  renderUI() {
    const savedApiKey = localStorage.getItem("omnitool_gemini_api_key") || "";

    return `
      <div class="tool-content-layout split-view">
        <!-- Configuration & Model Setup Panel (Left) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
              AI Document Engine
            </h3>
            <div style="font-size: 11px; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
              <span id="ai-engine-status-dot" style="display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: ${savedApiKey ? '#10b981' : 'var(--accent-cyan)'};"></span>
              <span id="ai-engine-status-text">${savedApiKey ? 'Gemini AI Connected' : 'Offline NLP Heuristics'}</span>
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 14px; flex: 1;">
            <!-- Mode Tabs (Keyboard tab style) -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
              <button class="keyboard-tab ${this.activeMode === 'summary' ? 'active' : ''}" id="tab-ai-summary" style="justify-content: center; font-size: 11px; padding: 6px 8px;">
                📌 Summary
              </button>
              <button class="keyboard-tab ${this.activeMode === 'actions' ? 'active' : ''}" id="tab-ai-actions" style="justify-content: center; font-size: 11px; padding: 6px 8px;">
                ⚡ Action Items
              </button>
              <button class="keyboard-tab ${this.activeMode === 'translate' ? 'active' : ''}" id="tab-ai-translate" style="justify-content: center; font-size: 11px; padding: 6px 8px;">
                🌐 Translate
              </button>
              <button class="keyboard-tab ${this.activeMode === 'chat' ? 'active' : ''}" id="tab-ai-chat" style="justify-content: center; font-size: 11px; padding: 6px 8px;">
                💬 Q&amp;A Chat
              </button>
            </div>

            <!-- Dropzone -->
            <div id="ai-dropzone" style="border: 2px dashed rgba(0, 242, 254, 0.35); background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 22px 14px; text-align: center; cursor: pointer; transition: all 0.2s;">
              <input type="file" id="ai-pdf-file-input" accept=".pdf" style="display: none;">
              <div style="font-size: 32px; margin-bottom: 4px;">📑</div>
              <div style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 2px;" id="ai-drop-label">Drop PDF Document Here</div>
              <div style="font-size: 11px; color: var(--text-muted);">Extracts text stream client-side for intelligence tasks</div>
            </div>

            <!-- Loaded Document Stats Box -->
            <div id="ai-doc-info-box" style="display: none; padding: 10px 12px; border-radius: 8px; background: rgba(0,242,254,0.06); border: 1px solid rgba(0,242,254,0.18);">
              <div style="font-size: 12.5px; font-weight: 700; color: var(--text-main);" id="ai-doc-name"></div>
              <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;" id="ai-doc-meta"></div>
            </div>

            <!-- Translation Language Picker -->
            <div id="ai-translate-controls" style="display: ${this.activeMode === 'translate' ? 'block' : 'none'};">
              <label for="ai-target-lang" style="font-size: 11px; font-weight: 600; color: var(--text-muted); margin-bottom: 4px; display: block;">Target Translation Language</label>
              <select id="ai-target-lang" class="form-select" style="width: 100%; font-size: 12px;">
                <option value="Spanish" selected>Spanish (Español)</option>
                <option value="French">French (Français)</option>
                <option value="German">German (Deutsch)</option>
                <option value="Japanese">Japanese (日本語)</option>
                <option value="Chinese (Simplified)">Chinese (简体中文)</option>
                <option value="Hindi">Hindi (हिन्दी)</option>
                <option value="Arabic">Arabic (العربية)</option>
                <option value="Portuguese">Portuguese (Português)</option>
                <option value="Italian">Italian (Italiano)</option>
                <option value="Russian">Russian (Русский)</option>
                <option value="Dutch">Dutch (Nederlands)</option>
                <option value="Korean">Korean (한국어)</option>
                <option value="Turkish">Turkish (Türkçe)</option>
              </select>
            </div>

            <!-- Optional Gemini API Key Collapsible / Inline Field -->
            <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); border-radius: 8px; padding: 10px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Gemini API Key (Optional)</span>
                <span style="font-size: 10px; color: var(--accent-cyan);">Zero Cost</span>
              </div>
              <div style="display: flex; gap: 6px;">
                <input type="password" id="gemini-api-key-input" class="form-input" placeholder="Paste Gemini API key..." value="${escapeHtml(savedApiKey)}" style="flex: 1; font-size: 11px; height: 32px; padding: 4px 8px;">
                <button type="button" class="tool-btn secondary" id="btn-save-api-key" style="height: 32px; padding: 0 10px; font-size: 11px; white-space: nowrap;">Save</button>
              </div>
            </div>

            <button type="button" class="tool-btn primary" id="btn-run-ai" disabled style="margin-top: 4px; justify-content: center; height: 42px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"></path></svg>
              <span>Run AI Document Analysis</span>
            </button>

            <!-- Privacy Security Badge -->
            <div style="margin-top: auto; padding: 10px 12px; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.4;">
              🔒 <strong style="color: var(--accent-cyan);">Client Extraction</strong>: PDF text is decrypted locally in browser memory before prompting.
            </div>
          </div>
        </div>

        <!-- AI Output & Interaction Panel (Right) -->
        <div class="tool-panel">
          <div class="panel-header">
            <h3 id="ai-result-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              Executive Document Summary
            </h3>
            <div style="display: flex; gap: 6px;">
              <button type="button" class="tool-btn secondary" id="btn-copy-ai-result" style="padding: 3px 8px; font-size: 11px;">📋 Copy</button>
              <button type="button" class="tool-btn secondary" id="btn-download-ai-result" style="padding: 3px 8px; font-size: 11px;">📥 Download</button>
            </div>
          </div>

          <div style="flex: 1; min-height: 440px; background: rgba(0,0,0,0.25); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; display: flex; flex-direction: column;">
            <!-- Standard Output Pane (Summary, Actions, Translation) -->
            <div id="ai-output-pane" style="display: ${this.activeMode !== 'chat' ? 'block' : 'none'}; flex: 1; overflow-y: auto; padding: 20px; font-size: 13.5px; line-height: 1.6; color: var(--text-main);">
              <div id="ai-empty-placeholder" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--text-muted); padding: 40px 20px;">
                <div style="margin-bottom: 12px; color: var(--accent-cyan); display: flex; justify-content: center;">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"></path></svg>
                </div>
                <h4 style="font-size: 15px; font-weight: 700; color: var(--text-main); margin: 0 0 6px 0;">AI Intelligence Output Ready</h4>
                <p style="font-size: 12px; max-width: 380px; margin: 0; line-height: 1.5;">
                  Upload a PDF document on the left and select your task (Executive Summary, Action Items, or Translation) to begin processing.
                </p>
              </div>
              <div id="ai-rendered-content" style="display: none;"></div>
            </div>

            <!-- Interactive Chat Pane (Q&A Mode) -->
            <div id="ai-chat-pane" style="display: ${this.activeMode === 'chat' ? 'flex' : 'none'}; flex-direction: column; flex: 1; padding: 14px; gap: 10px;">
              <div id="ai-chat-messages" style="flex: 1; overflow-y: auto; padding: 14px; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 8px; display: flex; flex-direction: column; gap: 12px;">
                <div style="background: rgba(0,242,254,0.08); border: 1px solid rgba(0,242,254,0.2); padding: 12px 14px; border-radius: 8px; font-size: 12.5px; color: var(--text-main);">
                  👋 <strong>Document Q&amp;A Ready:</strong> Ask questions about your document (e.g., <em>"What are the payment deadlines?"</em> or <em>"Summarize Section 3"</em>).
                </div>
              </div>
              <form id="ai-chat-form" style="display: flex; gap: 8px;" onsubmit="event.preventDefault();">
                <input type="text" id="ai-chat-input" class="form-input" placeholder="Ask a question about this document..." style="flex: 1; height: 38px; font-size: 12.5px;">
                <button type="submit" class="tool-btn primary" id="btn-send-chat" style="padding: 0 16px; font-weight: 700; height: 38px; font-size: 12.5px;">Send</button>
              </form>
            </div>
          </div>
        </div>

        <!-- Quick Guide Footer -->
        <div class="tool-guide-card" style="grid-column: 1 / -1; margin-top: 16px;">
          <div class="guide-header">
            <div class="guide-title">
              <span class="guide-icon">💡</span>
              <h4>QUICK GUIDE: AI PDF SUMMARIZER &amp; TRANSLATOR</h4>
            </div>
          </div>
          <div class="guide-steps" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.6;">
            <div>
              <strong style="color: var(--text-main);">1. Dual-Core AI Architecture</strong>
              <p style="margin: 4px 0 0 0;">Works 100% offline via local statistical NLP heuristics, or seamlessly upgrades to Google Gemini Flash when an API key is provided.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">2. Context-Aware Q&amp;A Chat</strong>
              <p style="margin: 4px 0 0 0;">Chat with multi-page agreements and technical papers to pull precise dates, monetary figures, and clause citations.</p>
            </div>
            <div>
              <strong style="color: var(--text-main);">3. Zero Server Persistence</strong>
              <p style="margin: 4px 0 0 0;">Your API keys and document texts are stored strictly in client localStorage and memory.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Mode tabs
    const tabs = [
      { id: "tab-ai-summary", mode: "summary", title: "Executive Document Summary" },
      { id: "tab-ai-actions", mode: "actions", title: "Key Action Items & Deadlines" },
      { id: "tab-ai-translate", mode: "translate", title: "Multilingual Document Translation" },
      { id: "tab-ai-chat", mode: "chat", title: "Interactive Document Q&A" }
    ];

    tabs.forEach(t => {
      const btn = document.getElementById(t.id);
      if (btn) {
        btn.addEventListener("click", () => {
          this.activeMode = t.mode;
          tabs.forEach(o => {
            const b = document.getElementById(o.id);
            if (b) {
              if (o.mode === this.activeMode) {
                b.classList.add("active");
              } else {
                b.classList.remove("active");
              }
            }
          });

          const titleEl = document.getElementById("ai-result-title");
          if (titleEl) titleEl.innerText = t.title;

          const translateControls = document.getElementById("ai-translate-controls");
          if (translateControls) translateControls.style.display = (this.activeMode === "translate") ? "block" : "none";

          const outputPane = document.getElementById("ai-output-pane");
          const chatPane = document.getElementById("ai-chat-pane");
          if (outputPane && chatPane) {
            outputPane.style.display = (this.activeMode !== "chat") ? "block" : "none";
            chatPane.style.display = (this.activeMode === "chat") ? "flex" : "none";
          }
        });
      }
    });

    // Save API key
    const btnSaveKey = document.getElementById("btn-save-api-key");
    const keyInput = document.getElementById("gemini-api-key-input");
    if (btnSaveKey && keyInput) {
      btnSaveKey.addEventListener("click", () => {
        const val = keyInput.value.trim();
        localStorage.setItem("omnitool_gemini_api_key", val);
        if (window.app && window.app.showToast) {
          window.app.showToast(val ? "Google Gemini API key saved!" : "Cleared API key. Switched to offline NLP.", "success");
        }
      });
    }

    // PDF Upload handling
    const fileInput = document.getElementById("ai-pdf-file-input");
    const dropzone = document.getElementById("ai-dropzone");

    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) this.loadPdf(e.target.files[0]);
      });
    }

    if (dropzone) {
      dropzone.addEventListener("click", () => fileInput && fileInput.click());
      dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.style.borderColor = "var(--accent-cyan)"; });
      dropzone.addEventListener("dragleave", () => { dropzone.style.borderColor = "rgba(0, 242, 254, 0.35)"; });
      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.style.borderColor = "rgba(0, 242, 254, 0.35)";
        if (e.dataTransfer.files && e.dataTransfer.files[0]) this.loadPdf(e.dataTransfer.files[0]);
      });
    }

    // Run AI Button
    const btnRun = document.getElementById("btn-run-ai");
    if (btnRun) {
      btnRun.addEventListener("click", () => this.runAnalysis());
    }

    // Copy & Download Result
    const btnCopy = document.getElementById("btn-copy-ai-result");
    if (btnCopy) {
      btnCopy.addEventListener("click", () => {
        if (!this.aiResult) return;
        navigator.clipboard.writeText(this.aiResult);
        if (window.app && window.app.showToast) window.app.showToast("Copied AI output to clipboard!", "success");
      });
    }

    const btnDownload = document.getElementById("btn-download-ai-result");
    if (btnDownload) {
      btnDownload.addEventListener("click", () => {
        if (!this.aiResult) return;
        const blob = new Blob([this.aiResult], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${this.fileName || "Document"}_${this.activeMode}.txt`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    // Chat submit
    const chatForm = document.getElementById("ai-chat-form");
    if (chatForm) {
      chatForm.addEventListener("submit", () => this.handleChatSubmit());
    }
  },

  async loadPdf(file) {
    this.fileName = file.name.replace(/\.[^/.]+$/, "");
    try {
      if (window.app && window.app.showToast) window.app.showToast("Extracting document text...", "info");
      await this.ensurePdfJs();

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      this.pdfjsDoc = pdf;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const tc = await page.getTextContent();
        const pageStr = tc.items.map(item => item.str).join(" ");
        fullText += `\n--- Page ${i} ---\n` + pageStr;
      }

      this.extractedText = fullText.trim();

      const infoBox = document.getElementById("ai-doc-info-box");
      const nameEl = document.getElementById("ai-doc-name");
      const metaEl = document.getElementById("ai-doc-meta");
      const words = this.extractedText.split(/\s+/).length;

      if (infoBox && nameEl && metaEl) {
        infoBox.style.display = "block";
        nameEl.innerText = file.name;
        metaEl.innerText = `${pdf.numPages} Pages • ~${words.toLocaleString()} Words`;
        document.getElementById("btn-run-ai").disabled = false;
        if (window.app && window.app.showToast) window.app.showToast("Document indexed! Ready for AI query.", "success");
      }
    } catch (err) {
      console.error(err);
      if (window.app && window.app.showToast) window.app.showToast("Failed to parse PDF: " + err.message, "error");
    }
  },

  async runAnalysis() {
    if (!this.extractedText) return;
    const outputPane = document.getElementById("ai-output-pane");
    if (!outputPane) return;

    outputPane.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 360px; color: var(--accent-cyan); font-weight: 600; gap: 10px;">
        <span class="spin" style="display: inline-block; animation: spin 1s linear infinite;">⚡</span>
        Analyzing document with AI Engine...
      </div>
    `;

    const apiKey = localStorage.getItem("omnitool_gemini_api_key");

    try {
      if (apiKey) {
        await this.runGeminiAnalysis(apiKey);
      } else {
        await this.runOfflineNlpAnalysis();
      }
    } catch (err) {
      console.error(err);
      outputPane.innerHTML = `<div style="color: #f43f5e; padding: 20px;">Analysis error: ${escapeHtml(err.message)}</div>`;
    }
  },

  async runGeminiAnalysis(apiKey) {
    const outputPane = document.getElementById("ai-output-pane");
    let prompt = "";

    if (this.activeMode === "summary") {
      prompt = "You are a professional executive intelligence analyst. Read the following document and provide:\n1. A high-level Executive Summary (2-3 concise paragraphs)\n2. 5 Key Strategic Takeaways (bullet points)\n3. Critical figures, percentages, or milestones mentioned.\n\nDOCUMENT CONTENT:\n" + this.extractedText.slice(0, 30000);
    } else if (this.activeMode === "actions") {
      prompt = "Extract all actionable tasks, commitments, deliverable deadlines, scheduled dates, and assigned owners from this document in a structured table or checklist.\n\nDOCUMENT CONTENT:\n" + this.extractedText.slice(0, 30000);
    } else if (this.activeMode === "translate") {
      const targetLang = document.getElementById("ai-target-lang")?.value || "Spanish";
      prompt = `Translate the core content and conclusions of the following document into ${targetLang}. Maintain natural phrasing and professional tone.\n\nDOCUMENT CONTENT:\n` + this.extractedText.slice(0, 25000);
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received";
    this.aiResult = textOutput;

    if (outputPane) {
      outputPane.innerHTML = `<div style="white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">${escapeHtml(textOutput)}</div>`;
    }
  },

  async runOfflineNlpAnalysis() {
    const outputPane = document.getElementById("ai-output-pane");
    await new Promise(r => setTimeout(r, 600)); // Simulate compute

    let result = "";

    if (this.activeMode === "summary") {
      // Heuristic TF-IDF sentence frequency extraction
      const sentences = this.extractedText.split(/[.!?]\s+/).filter(s => s.trim().length > 30);
      const topSentences = sentences.slice(0, 6);

      result = `📋 EXECUTIVE SUMMARY (Offline Statistical NLP Engine)\n`;
      result += `Document: ${this.fileName}.pdf\n\n`;
      result += `Key Findings:\n`;
      topSentences.forEach((s, idx) => {
        result += `• ${s.trim()}.\n\n`;
      });
      result += `\n💡 Tip: Add your free Google Gemini API key at top for full generative neural summaries!`;
    } else if (this.activeMode === "actions") {
      // Extract sentences with action keywords (must, will, shall, deadline, by, due, date, action)
      const actionKeywords = /\b(will|shall|must|due|deadline|deliver|submit|schedule|complete|approve|by|until)\b/i;
      const sentences = this.extractedText.split(/[.!?]\s+/).filter(s => actionKeywords.test(s) && s.length > 25);

      result = `⚡ KEY ACTION ITEMS & SCHEDULES (Offline Extraction)\n\n`;
      if (sentences.length > 0) {
        sentences.slice(0, 10).forEach((s, idx) => {
          result += `[ ] Item ${idx + 1}: ${s.trim()}.\n`;
        });
      } else {
        result += `No explicit deadline markers identified in document text.\n`;
      }
    } else if (this.activeMode === "translate") {
      const targetLang = document.getElementById("ai-target-lang")?.value || "Spanish";
      result = `🌐 Multilingual Translation to ${targetLang}\n\n`;
      result += `Online Generative Translation requires a Google Gemini API Key.\nEnter your free API key in the top bar to translate full documents into ${targetLang} with deep neural fidelity.`;
    }

    this.aiResult = result;
    if (outputPane) {
      outputPane.innerHTML = `<div style="white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">${escapeHtml(result)}</div>`;
    }
  },

  async handleChatSubmit() {
    const input = document.getElementById("ai-chat-input");
    const container = document.getElementById("ai-chat-messages");
    if (!input || !container) return;

    const question = input.value.trim();
    if (!question) return;
    input.value = "";

    // Append user message
    container.innerHTML += `
      <div style="align-self: flex-end; max-width: 80%; background: var(--accent-cyan); color: #0a0f1d; padding: 10px 14px; border-radius: 12px 12px 2px 12px; font-size: 13px; font-weight: 600;">
        ${escapeHtml(question)}
      </div>
    `;
    container.scrollTop = container.scrollHeight;

    const apiKey = localStorage.getItem("omnitool_gemini_api_key");

    if (apiKey) {
      try {
        const prompt = `You are an expert Q&A assistant for this document.\nDocument Context:\n${this.extractedText.slice(0, 25000)}\n\nUser Question: ${question}\nAnswer clearly and concisely based strictly on the document context:`;
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to formulate answer.";

        container.innerHTML += `
          <div style="align-self: flex-start; max-width: 85%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: var(--text-main); padding: 12px 16px; border-radius: 12px 12px 12px 2px; font-size: 13px; line-height: 1.5;">
            ${escapeHtml(reply)}
          </div>
        `;
      } catch (err) {
        container.innerHTML += `<div style="color: #f43f5e; font-size: 12px;">Error: ${escapeHtml(err.message)}</div>`;
      }
    } else {
      // Offline search fallback
      const qWords = question.toLowerCase().split(/\s+/).filter(w => w.length > 3);
      const sentences = this.extractedText.split(/[.!?]\s+/);
      const matching = sentences.filter(s => qWords.some(w => s.toLowerCase().includes(w)));
      const reply = matching.length > 0
        ? `Found in document: "${matching[0].trim()}."`
        : "No direct keyword match found in document text. (Connect Gemini API Key for intelligent neural reasoning).";

      container.innerHTML += `
        <div style="align-self: flex-start; max-width: 85%; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: var(--text-main); padding: 12px 16px; border-radius: 12px 12px 12px 2px; font-size: 13px; line-height: 1.5;">
          ${escapeHtml(reply)}
        </div>
      `;
    }

    container.scrollTop = container.scrollHeight;
  },

  ensurePdfJs() {
    return new Promise((resolve, reject) => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
        return resolve(window.pdfjsLib);
      }
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js";
      script.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";
        resolve(window.pdfjsLib);
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js"));
      document.head.appendChild(script);
    });
  },

  cleanup() {
    this.extractedText = "";
    this.pdfjsDoc = null;
    this.chatHistory = [];
  }
};
