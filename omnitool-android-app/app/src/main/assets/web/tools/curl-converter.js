// OmniTool Hub - cURL to Code Converter (Client-Side)
// Converts command line cURL requests to JavaScript (Fetch/Axios), Python (Requests), and Go HTTP.

export default {
  id: "curl-converter",
  name: "cURL to Code Converter",

  renderUI() {
    return `
      <div class="tool-content-layout split-view">
        <div class="tool-panel">
          <div class="panel-header">
            <h3>cURL Command Input</h3>
            <div style="display: flex; gap: 8px;">
              <button class="tool-btn secondary" id="curl-sample-btn" style="font-size: 11.5px;">Load Sample</button>
              <button class="tool-btn" id="curl-clear-btn" style="font-size: 11.5px;">Clear</button>
            </div>
          </div>
          <textarea class="input-textarea" id="curl-input" placeholder="Paste your curl command here...&#10;&#10;e.g.&#10;curl -X POST https://api.example.com/v1/users \\&#10;  -H 'Content-Type: application/json' \\&#10;  -H 'Authorization: Bearer token123' \\&#10;  -d '{\&quot;name\&quot;: \&quot;Alice\&quot;, \&quot;role\&quot;: \&quot;developer\&quot;}'" aria-label="cURL Command Input" style="min-height: 280px;"></textarea>
          
          <div class="form-group" style="margin-top: 12px;">
            <label style="font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">Parsed Summary</label>
            <div id="curl-summary-badge" class="tool-badge" style="padding: 10px 14px; text-align: left; font-family: var(--font-mono); font-size: 12px; line-height: 1.6; min-height: 48px; border-radius: 8px;">
              Paste a valid cURL command above to parse method, URL, and headers.
            </div>
          </div>
        </div>

        <div class="tool-panel" style="gap: 16px;">
          <div class="panel-header">
            <h3>Generated Code</h3>
            <div class="tool-tabs" id="curl-lang-tabs" style="margin: 0; display: flex; gap: 4px;">
              <button class="tool-tab-btn active" data-lang="fetch">Fetch (JS)</button>
              <button class="tool-tab-btn" data-lang="axios">Axios (JS)</button>
              <button class="tool-tab-btn" data-lang="python">Python</button>
              <button class="tool-tab-btn" data-lang="go">Go HTTP</button>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span id="curl-lang-badge" style="font-size: 11.5px; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">JavaScript Fetch (ES6 Async/Await)</span>
            <button class="tool-btn primary" id="curl-copy-btn" style="padding: 4px 12px; font-size: 11.5px; display: inline-flex; align-items: center; gap: 6px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              <span>Copy Code</span>
            </button>
          </div>

          <pre class="output-pre" id="curl-output-code" style="min-height: 280px; max-height: 420px; font-family: var(--font-mono); font-size: 12.5px; line-height: 1.6;"></pre>
        </div>

        <!-- Quick Guide Card -->
        <div class="tool-guide-card">
          <div class="tool-guide-header">
            <div class="tool-guide-title">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <span>Quick Guide & Instructions</span>
            </div>
            <button class="tool-btn secondary" id="curl-try-example-btn" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Copy from Browser or Postman</strong>: In Chrome DevTools Network Tab, right-click any request and choose <em>Copy &rarr; Copy as cURL</em>.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Paste into Input</strong>: OmniTool Hub instantly extracts the HTTP method, URL, headers, and request body.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Select Target Language</strong>: Instantly generate clean code for Fetch (ES6 async/await), Axios, Python Requests, or Go HTTP.</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init(container, app) {
    const inputEl = container.querySelector("#curl-input");
    const outputEl = container.querySelector("#curl-output-code");
    const summaryEl = container.querySelector("#curl-summary-badge");
    const langBadge = container.querySelector("#curl-lang-badge");
    const copyBtn = container.querySelector("#curl-copy-btn");
    const sampleBtn = container.querySelector("#curl-sample-btn");
    const tryExampleBtn = container.querySelector("#curl-try-example-btn");
    const clearBtn = container.querySelector("#curl-clear-btn");
    const langTabs = container.querySelectorAll("#curl-lang-tabs .tool-tab-btn");

    let currentLang = "fetch";

    const sampleCommand = `curl -X POST "https://api.example.com/v1/users" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sec_tok_8923a4" \\
  -H "Accept: application/json" \\
  -d '{"name": "Alex Mercer", "email": "alex@example.com", "role": "admin"}'`;

    const parseCurl = (raw) => {
      if (!raw || !raw.trim()) return null;

      // Normalize line continuations and newlines
      const cleaned = raw.replace(/\\\r?\n/g, ' ').trim();
      if (!cleaned.toLowerCase().startsWith('curl')) {
        return { error: "Input does not start with 'curl'" };
      }

      // Tokenizer that respects single and double quotes
      const tokens = [];
      let current = '';
      let inQuote = null;
      let escape = false;

      for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];
        if (escape) {
          current += char;
          escape = false;
        } else if (char === '\\') {
          escape = true;
        } else if (inQuote) {
          if (char === inQuote) {
            inQuote = null;
          } else {
            current += char;
          }
        } else if (char === "'" || char === '"') {
          inQuote = char;
        } else if (/\s/.test(char)) {
          if (current.length > 0) {
            tokens.push(current);
            current = '';
          }
        } else {
          current += char;
        }
      }
      if (current.length > 0) {
        tokens.push(current);
      }

      let method = 'GET';
      let url = '';
      const headers = {};
      let data = '';

      for (let i = 1; i < tokens.length; i++) {
        const tok = tokens[i];

        if (tok === '-X' || tok === '--request') {
          if (i + 1 < tokens.length) {
            method = tokens[++i].toUpperCase();
          }
        } else if (tok === '-H' || tok === '--header') {
          if (i + 1 < tokens.length) {
            const h = tokens[++i];
            const colonIdx = h.indexOf(':');
            if (colonIdx > 0) {
              const k = h.slice(0, colonIdx).trim();
              const v = h.slice(colonIdx + 1).trim();
              headers[k] = v;
            }
          }
        } else if (tok === '-d' || tok === '--data' || tok === '--data-raw' || tok === '--data-binary') {
          if (i + 1 < tokens.length) {
            data = tokens[++i];
            if (method === 'GET') method = 'POST';
          }
        } else if (!url && !tok.startsWith('-')) {
          url = tok.replace(/^['"]|['"]$/g, '');
        }
      }

      if (!url) {
        return { error: "No target URL could be found in the cURL command." };
      }

      return { method, url, headers, data };
    };

    const generateCode = (parsed, lang) => {
      if (!parsed) {
        return "// Paste a cURL command on the left to generate code";
      }
      if (parsed.error) {
        return `// Error: ${parsed.error}`;
      }

      const { method, url, headers, data } = parsed;

      if (lang === "fetch") {
        const fetchOptions = { method };
        if (Object.keys(headers).length > 0) {
          fetchOptions.headers = headers;
        }
        if (data) {
          try {
            JSON.parse(data);
            fetchOptions.body = `JSON.stringify(${data})`;
          } catch (_) {
            fetchOptions.body = JSON.stringify(data);
          }
        }

        let bodyStr = '';
        if (data) {
          try {
            JSON.parse(data);
            bodyStr = `\n    body: JSON.stringify(${data}),`;
          } catch (_) {
            bodyStr = `\n    body: ${JSON.stringify(data)},`;
          }
        }

        const headersStr = Object.keys(headers).length > 0 
          ? `\n    headers: ${JSON.stringify(headers, null, 6).replace(/\n/g, '\n    ')},`
          : '';

        return `// Generated Fetch API (Modern ES6 Async/Await)
async function sendRequest() {
  const response = await fetch(${JSON.stringify(url)}, {
    method: ${JSON.stringify(method)},${headersStr}${bodyStr}
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  const result = await response.json().catch(() => response.text());
  console.log("Response:", result);
  return result;
}

sendRequest();`;
      }

      if (lang === "axios") {
        let dataStr = '';
        if (data) {
          try {
            JSON.parse(data);
            dataStr = `\n    data: ${data},`;
          } catch (_) {
            dataStr = `\n    data: ${JSON.stringify(data)},`;
          }
        }

        const headersStr = Object.keys(headers).length > 0 
          ? `\n    headers: ${JSON.stringify(headers, null, 6).replace(/\n/g, '\n    ')},`
          : '';

        return `// Generated Axios Request
import axios from 'axios';

async function sendRequest() {
  try {
    const response = await axios({
      method: ${JSON.stringify(method.toLowerCase())},
      url: ${JSON.stringify(url)},${headersStr}${dataStr}
    });

    console.log("Status:", response.status);
    console.log("Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Request failed:", error.response?.data || error.message);
  }
}

sendRequest();`;
      }

      if (lang === "python") {
        let headersCode = '';
        if (Object.keys(headers).length > 0) {
          headersCode = `headers = ${JSON.stringify(headers, null, 4)}\n`;
        }

        let dataCode = '';
        let kwarg = '';
        if (data) {
          try {
            const parsedJson = JSON.parse(data);
            dataCode = `payload = ${JSON.stringify(parsedJson, null, 4)}\n`;
            kwarg = `, json=payload`;
          } catch (_) {
            dataCode = `payload = ${JSON.stringify(data)}\n`;
            kwarg = `, data=payload`;
          }
        }

        const hKwarg = Object.keys(headers).length > 0 ? `, headers=headers` : '';
        const fn = method.toLowerCase();

        return `# Generated Python Requests
import requests

url = "${url}"
${headersCode}${dataCode}
try:
    response = requests.${fn}(url${hKwarg}${kwarg}, timeout=30)
    response.raise_for_status()
    print("Response Status:", response.status_code)
    try:
        print(response.json())
    except ValueError:
        print(response.text)
except requests.exceptions.RequestException as e:
    print("Request failed:", e)
`;
      }

      if (lang === "go") {
        let bodySetup = 'nil';
        let bodyImport = '';
        if (data) {
          bodyImport = '\n\t"bytes"';
          bodySetup = `bytes.NewBuffer([]byte(${JSON.stringify(data)}))`;
        }

        let headersLines = '';
        for (const [k, v] of Object.entries(headers)) {
          headersLines += `\treq.Header.Set(${JSON.stringify(k)}, ${JSON.stringify(v)})\n`;
        }

        return `// Generated Go net/http Request
package main

import (
\t"fmt"${bodyImport}
\t"io"
\t"net/http"
)

func main() {
\turl := ${JSON.stringify(url)}
\treq, err := http.NewRequest(${JSON.stringify(method)}, url, ${bodySetup})
\tif err != nil {
\t\tpanic(err)
\t}

${headersLines}
\tclient := &http.Client{}
\tresp, err := client.Do(req)
\tif err != nil {
\t\tpanic(err)
\t}
\tdefer resp.Body.Close()

\tbody, _ := io.ReadAll(resp.Body)
\tfmt.Println("Status:", resp.Status)
\tfmt.Println("Response:", string(body))
}
`;
      }

      return "// Unknown language target";
    };

    const update = () => {
      const val = inputEl.value;
      const parsed = parseCurl(val);

      if (!parsed) {
        summaryEl.innerHTML = `Paste a valid cURL command above to parse method, URL, and headers.`;
        summaryEl.style.color = "var(--text-muted)";
        outputEl.innerText = generateCode(null, currentLang);
        return;
      }

      if (parsed.error) {
        summaryEl.innerHTML = `<span style="color: var(--accent-rose);">⚠️ ${parsed.error}</span>`;
        outputEl.innerText = `// Error: ${parsed.error}`;
        return;
      }

      const headerCount = Object.keys(parsed.headers).length;
      summaryEl.innerHTML = `
        <span style="color: var(--accent-cyan); font-weight: 700;">${parsed.method}</span> 
        <span style="color: var(--text-main); word-break: break-all;">${parsed.url}</span>
        <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
          Headers: <strong>${headerCount}</strong> • Payload: <strong>${parsed.data ? parsed.data.length + ' bytes' : 'None'}</strong>
        </div>
      `;

      outputEl.innerText = generateCode(parsed, currentLang);
    };

    inputEl.addEventListener("input", update);

    langTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        langTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentLang = tab.dataset.lang;

        const labels = {
          fetch: "JavaScript Fetch (ES6 Async/Await)",
          axios: "JavaScript Axios Client",
          python: "Python Requests Library",
          go: "Go Standard Library (net/http)"
        };
        langBadge.innerText = labels[currentLang] || currentLang;
        update();
        app.playSynthSound?.('click');
      });
    });

    copyBtn.addEventListener("click", () => {
      const code = outputEl.innerText;
      if (!code || code.startsWith("// Paste")) {
        app.showToast("Nothing to copy yet. Paste a cURL command first.", "info");
        return;
      }
      navigator.clipboard.writeText(code).then(() => {
        app.showToast("Code copied to clipboard!", "success");
        app.playSynthSound?.('copy');
      });
    });

    sampleBtn.addEventListener("click", () => {
      inputEl.value = sampleCommand;
      update();
      app.showToast("Sample cURL command loaded!", "info");
      app.playSynthSound?.('click');
    });

    tryExampleBtn.addEventListener("click", () => {
      inputEl.value = sampleCommand;
      update();
      app.showToast("Sample cURL command loaded!", "info");
      app.playSynthSound?.('click');
    });

    clearBtn.addEventListener("click", () => {
      inputEl.value = "";
      update();
      app.playSynthSound?.('click');
    });

    // Initial render
    update();
  }
};
