import { escapeHtml } from './utils.js';

export default {
  id: "code-playground",
  name: "HTML/CSS/JS Live Playground",
  
  // Cache of code templates: Curated beginner starter lessons + advanced interactive widgets
  defaultTemplates: {
    helloWorld: {
      name: "Hello World & Welcome Card",
      category: "beginner",
      html: `<!-- 🔰 Beginner Starter: Welcome Card -->\n<div class="card">\n  <div class="badge">Day 1: Web Dev</div>\n  <h1 id="main-title">Hello, World! 🚀</h1>\n  <p class="subtitle">Welcome to your live HTML, CSS & JavaScript sandbox.</p>\n  \n  <div class="features-list">\n    <div class="item">✨ <strong>HTML</strong> gives your page its structure</div>\n    <div class="item">🎨 <strong>CSS</strong> adds beautiful colors & layout</div>\n    <div class="item">⚡ <strong>JavaScript</strong> adds action & interactivity</div>\n  </div>\n  \n  <button id="greet-btn" class="primary-btn">Click Me to Say Hi!</button>\n  <p id="greet-output" class="output-text"></p>\n</div>`,
      css: `/* 🎨 Clean, beginner-friendly styling */\nbody {\n  margin: 0;\n  padding: 24px;\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: system-ui, -apple-system, sans-serif;\n  background: #0f172a;\n  color: #f8fafc;\n}\n\n.card {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 28px;\n  max-width: 420px;\n  width: 100%;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);\n  text-align: center;\n}\n\n.badge {\n  display: inline-block;\n  padding: 4px 12px;\n  background: rgba(168, 85, 247, 0.15);\n  color: #c084fc;\n  border: 1px solid rgba(168, 85, 247, 0.3);\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n  margin-bottom: 12px;\n}\n\nh1 {\n  margin: 0 0 8px 0;\n  font-size: 26px;\n  color: #ffffff;\n}\n\n.subtitle {\n  color: #94a3b8;\n  font-size: 14px;\n  margin-bottom: 20px;\n}\n\n.features-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  text-align: left;\n  margin-bottom: 24px;\n}\n\n.item {\n  background: rgba(255, 255, 255, 0.04);\n  padding: 8px 12px;\n  border-radius: 8px;\n  font-size: 13px;\n  color: #cbd5e1;\n}\n\n.primary-btn {\n  background: linear-gradient(135deg, #06b6d4, #3b82f6);\n  color: white;\n  border: none;\n  padding: 12px 24px;\n  font-size: 14px;\n  font-weight: 600;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: transform 0.15s, opacity 0.15s;\n  width: 100%;\n}\n\n.primary-btn:hover {\n  opacity: 0.92;\n  transform: translateY(-2px);\n}\n\n.primary-btn:active {\n  transform: translateY(0);\n}\n\n.output-text {\n  margin-top: 16px;\n  font-size: 14px;\n  font-weight: 500;\n  color: #34d399;\n  min-height: 20px;\n}`,
      js: `// ⚡ Select elements from the HTML\nconst greetBtn = document.querySelector('#greet-btn');\nconst greetOutput = document.querySelector('#greet-output');\n\nlet clickCount = 0;\n\n// Listen for clicks on the button\ngreetBtn.addEventListener('click', () => {\n  clickCount++;\n  \n  // Update the page text dynamically\n  greetOutput.innerText = \`👋 Awesome job! You've clicked \${clickCount} time(s).\`;\n  \n  // Print messages to the simulated debug console below\n  console.log(\`[Beginner Demo] Button clicked! Count is now: \${clickCount}\`);\n});\n\nconsole.log("Welcome to your code playground! Try editing the HTML, CSS, or JS!");`
    },

    counterApp: {
      name: "Interactive Click Counter",
      category: "beginner",
      html: `<!-- 🔰 Beginner Starter: Click Counter -->\n<div class="counter-box">\n  <div class="tag">JavaScript State Demo</div>\n  <h2>Live Counter</h2>\n  <div id="counter-value" class="value">0</div>\n  \n  <div class="btn-group">\n    <button id="btn-dec" class="count-btn danger">- 1</button>\n    <button id="btn-reset" class="count-btn muted">Reset</button>\n    <button id="btn-inc" class="count-btn success">+ 1</button>\n  </div>\n  \n  <p id="counter-status" class="status-msg">Counter is currently at zero.</p>\n</div>`,
      css: `body {\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #111827;\n  font-family: system-ui, sans-serif;\n  color: #f3f4f6;\n}\n\n.counter-box {\n  background: #1f2937;\n  border: 1px solid #374151;\n  border-radius: 16px;\n  padding: 32px 24px;\n  text-align: center;\n  width: 320px;\n  box-shadow: 0 12px 30px rgba(0,0,0,0.5);\n}\n\n.tag {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  color: #f59e0b;\n  letter-spacing: 1px;\n  margin-bottom: 8px;\n}\n\nh2 {\n  margin: 0 0 16px 0;\n  font-size: 22px;\n}\n\n.value {\n  font-size: 54px;\n  font-weight: 800;\n  font-family: monospace;\n  color: #38bdf8;\n  margin: 16px 0;\n  transition: transform 0.15s ease;\n}\n\n.btn-group {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n}\n\n.count-btn {\n  border: none;\n  border-radius: 8px;\n  padding: 10px 18px;\n  font-size: 15px;\n  font-weight: 700;\n  cursor: pointer;\n  transition: all 0.15s;\n}\n\n.count-btn.success { background: #10b981; color: #fff; }\n.count-btn.danger { background: #ef4444; color: #fff; }\n.count-btn.muted { background: #4b5563; color: #e5e7eb; }\n\n.count-btn:hover { opacity: 0.9; transform: scale(1.05); }\n.count-btn:active { transform: scale(0.96); }\n\n.status-msg {\n  font-size: 12px;\n  color: #9ca3af;\n  margin-top: 18px;\n}`,
      js: `// ⚡ State Variable\nlet count = 0;\n\nconst valueEl = document.querySelector('#counter-value');\nconst statusEl = document.querySelector('#counter-status');\nconst btnInc = document.querySelector('#btn-inc');\nconst btnDec = document.querySelector('#btn-dec');\nconst btnReset = document.querySelector('#btn-reset');\n\nfunction updateDisplay() {\n  valueEl.innerText = count;\n  \n  if (count > 0) {\n    valueEl.style.color = '#34d399';\n    statusEl.innerText = \`Positive value: +\${count}\`;\n  } else if (count < 0) {\n    valueEl.style.color = '#f87171';\n    statusEl.innerText = \`Negative value: \${count}\`;\n  } else {\n    valueEl.style.color = '#38bdf8';\n    statusEl.innerText = 'Counter is currently at zero.';\n  }\n  \n  console.log(\`[Counter] Updated value to: \${count}\`);\n}\n\nbtnInc.addEventListener('click', () => { count++; updateDisplay(); });\nbtnDec.addEventListener('click', () => { count--; updateDisplay(); });\nbtnReset.addEventListener('click', () => { count = 0; updateDisplay(); });`
    },

    todoApp: {
      name: "Mini To-Do List",
      category: "beginner",
      html: `<!-- 🔰 Beginner Starter: Mini To-Do List -->\n<div class="todo-card">\n  <h2>Daily Tasks 📝</h2>\n  <div class="todo-input-row">\n    <input type="text" id="todo-input" placeholder="Type a task and press enter..." />\n    <button id="todo-add-btn">Add</button>\n  </div>\n  <ul id="todo-list" class="todo-list">\n    <!-- Tasks rendered by JS -->\n  </ul>\n  <div class="todo-footer">\n    <span id="todo-count">0 tasks left</span>\n    <button id="todo-clear-completed" class="link-btn">Clear Done</button>\n  </div>\n</div>`,
      css: `body {\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #090d16;\n  font-family: system-ui, sans-serif;\n  color: #e2e8f0;\n}\n\n.todo-card {\n  background: #131b2e;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 14px;\n  padding: 24px;\n  width: 360px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);\n}\n\nh2 { margin: 0 0 16px 0; font-size: 20px; }\n\n.todo-input-row { display: flex; gap: 8px; margin-bottom: 16px; }\n\n#todo-input {\n  flex: 1;\n  background: #1e293b;\n  border: 1px solid #334155;\n  border-radius: 6px;\n  padding: 8px 12px;\n  color: #f8fafc;\n  outline: none;\n}\n\n#todo-add-btn {\n  background: #6366f1;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 6px;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.todo-list {\n  list-style: none;\n  padding: 0;\n  margin: 0 0 16px 0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  max-height: 220px;\n  overflow-y: auto;\n}\n\n.todo-item {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background: rgba(255, 255, 255, 0.03);\n  padding: 8px 12px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.05);\n}\n\n.todo-item.done span {\n  text-decoration: line-through;\n  color: #64748b;\n}\n\n.delete-btn {\n  background: transparent;\n  border: none;\n  color: #ef4444;\n  cursor: pointer;\n  font-size: 14px;\n}\n\n.todo-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 12px;\n  color: #94a3b8;\n  border-top: 1px solid #334155;\n  padding-top: 12px;\n}\n\n.link-btn {\n  background: none;\n  border: none;\n  color: #818cf8;\n  cursor: pointer;\n  font-size: 12px;\n}`,
      js: `// ⚡ Mini To-Do List Dynamic State\nlet todos = [\n  { id: 1, text: "Learn HTML tags & structure", done: true },\n  { id: 2, text: "Style layouts with modern CSS", done: true },\n  { id: 3, text: "Create interactive JS projects", done: false }\n];\n\nconst input = document.querySelector('#todo-input');\nconst addBtn = document.querySelector('#todo-add-btn');\nconst listEl = document.querySelector('#todo-list');\nconst countEl = document.querySelector('#todo-count');\nconst clearDoneBtn = document.querySelector('#todo-clear-completed');\n\nfunction renderTodos() {\n  listEl.innerHTML = '';\n  todos.forEach(todo => {\n    const li = document.createElement('li');\n    li.className = \`todo-item \${todo.done ? 'done' : ''}\`;\n    \n    li.innerHTML = \`\n      <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">\n        <input type="checkbox" \${todo.done ? 'checked' : ''} data-id="\${todo.id}">\n        <span>\${todo.text}</span>\n      </label>\n      <button class="delete-btn" data-id="\${todo.id}">✕</button>\n    \`;\n    listEl.appendChild(li);\n  });\n  \n  const pending = todos.filter(t => !t.done).length;\n  countEl.innerText = \`\${pending} task(s) left\`;\n}\n\nfunction addTodo() {\n  const text = input.value.trim();\n  if (!text) return;\n  todos.push({ id: Date.now(), text, done: false });\n  input.value = '';\n  renderTodos();\n  console.log(\`[Todo] Added new task: "\${text}"\`);\n}\n\naddBtn.addEventListener('click', addTodo);\ninput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTodo(); });\n\nlistEl.addEventListener('click', (e) => {\n  const id = Number(e.target.dataset.id);\n  if (!id) return;\n  \n  if (e.target.tagName === 'INPUT') {\n    const item = todos.find(t => t.id === id);\n    if (item) {\n      item.done = e.target.checked;\n      renderTodos();\n      console.log(\`[Todo] Toggled task #\${id}: \${item.done ? 'Done' : 'Pending'}\`);\n    }\n  } else if (e.target.classList.contains('delete-btn')) {\n    todos = todos.filter(t => t.id !== id);\n    renderTodos();\n    console.log(\`[Todo] Removed task #\${id}\`);\n  }\n});\n\nclearDoneBtn.addEventListener('click', () => {\n  todos = todos.filter(t => !t.done);\n  renderTodos();\n  console.log("[Todo] Cleared all completed tasks.");\n});\n\nrenderTodos();`
    },

    themeToggle: {
      name: "Light & Dark Theme Switcher",
      category: "beginner",
      html: `<!-- 🔰 Beginner Starter: Theme Switcher Card -->\n<div class="theme-wrapper" id="theme-box">\n  <div class="avatar-badge">🎨 Theme Lab</div>\n  <h2 id="theme-heading">Light & Dark Mode</h2>\n  <p id="theme-desc">Click the toggle button below to switch themes using CSS classes and JavaScript!</p>\n  \n  <button id="theme-toggle-btn" class="toggle-btn">\n    <span id="theme-icon">☀️</span> <span id="theme-btn-text">Switch to Light Mode</span>\n  </button>\n</div>`,
      css: `body {\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: system-ui, sans-serif;\n  background: #0b0f19;\n  transition: background 0.3s ease;\n}\n\n.theme-wrapper {\n  background: #111827;\n  color: #f3f4f6;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 32px;\n  max-width: 360px;\n  text-align: center;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.5);\n  transition: all 0.3s ease;\n}\n\n.theme-wrapper.light-mode {\n  background: #ffffff;\n  color: #1f2937;\n  border-color: #e5e7eb;\n  box-shadow: 0 10px 30px rgba(0,0,0,0.08);\n}\n\n.avatar-badge {\n  font-size: 13px;\n  font-weight: 700;\n  color: #38bdf8;\n  margin-bottom: 8px;\n}\n\n.toggle-btn {\n  background: #2563eb;\n  color: white;\n  border: none;\n  padding: 12px 20px;\n  font-size: 14px;\n  font-weight: 600;\n  border-radius: 8px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  transition: transform 0.15s, background 0.2s;\n}\n\n.toggle-btn:hover {\n  transform: translateY(-2px);\n  background: #1d4ed8;\n}\n\n.theme-wrapper.light-mode .toggle-btn {\n  background: #0f172a;\n}`,
      js: `// ⚡ Theme Switcher Logic\nconst toggleBtn = document.querySelector('#theme-toggle-btn');\nconst themeBox = document.querySelector('#theme-box');\nconst themeIcon = document.querySelector('#theme-icon');\nconst btnText = document.querySelector('#theme-btn-text');\n\nlet isLight = false;\n\ntoggleBtn.addEventListener('click', () => {\n  isLight = !isLight;\n  \n  if (isLight) {\n    themeBox.classList.add('light-mode');\n    themeIcon.innerText = '🌙';\n    btnText.innerText = 'Switch to Dark Mode';\n    console.log("[Theme] Switched to Light Mode!");\n  } else {\n    themeBox.classList.remove('light-mode');\n    themeIcon.innerText = '☀️';\n    btnText.innerText = 'Switch to Light Mode';\n    console.log("[Theme] Switched to Dark Mode!");\n  }\n});`
    },

    glowButton: {
      name: "Cyber Glow Button (Neon FX)",
      category: "advanced",
      html: `<!-- Cyber Glow Button -->\n<div class="container">\n  <button class="cyber-btn">INJECT SYSTEM OVERRIDE</button>\n  <div id="counter-log">Access Logs: 0 inputs</div>\n</div>`,
      css: `html, body {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  background: #0d0e12;\n  color: #a9b2c3;\n  font-family: 'Outfit', sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.container {\n  text-align: center;\n}\n\n.cyber-btn {\n  background: transparent;\n  color: #00f2fe;\n  border: 2px solid #00f2fe;\n  padding: 16px 32px;\n  font-weight: 700;\n  letter-spacing: 2px;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  box-shadow: 0 0 15px rgba(0, 242, 254, 0.3);\n  position: relative;\n  overflow: hidden;\n}\n\n.cyber-btn:hover {\n  background: #00f2fe;\n  color: #0d0e12;\n  box-shadow: 0 0 30px #00f2fe;\n  text-shadow: none;\n}\n\n#counter-log {\n  margin-top: 20px;\n  font-family: monospace;\n  font-size: 14px;\n  color: #9d4edd;\n}`,
      js: `// Interactive button logic\nlet clicks = 0;\nconst btn = document.querySelector('.cyber-btn');\nconst logger = document.querySelector('#counter-log');\n\nbtn.addEventListener('click', () => {\n  clicks++;\n  logger.innerText = \`Access Logs: \${clicks} override request(s) sent\`;\n  console.log(\`[System Override] Command trigger sent! Total count: \${clicks}\`);\n  \n  if (clicks >= 5) {\n    console.warn("[ALERT] High frequency overrides detected. Restricting throttle!");\n  }\n});`
    },

    digitalClock: {
      name: "Neon Engine Digital Clock",
      category: "advanced",
      html: `<!-- Glassmorphism Clock Widget -->\n<div class="clock-wrapper">\n  <div class="glass-clock">\n    <div class="clock-label">NEON ENGINE CLOCK</div>\n    <div id="clock-time">00:00:00</div>\n    <div id="clock-date">SYSTEM DATED</div>\n  </div>\n</div>`,
      css: `html, body {\n  height: 100%;\n  margin: 0;\n}\n\nbody {\n  background: radial-gradient(circle, #1a1b26 0%, #0d0e12 100%);\n  color: #fff;\n  font-family: 'Outfit', sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.clock-wrapper {\n  padding: 2px;\n  background: linear-gradient(135deg, #00f2fe, #9d4edd);\n  border-radius: 20px;\n  box-shadow: 0 10px 40px rgba(0,0,0,0.5);\n}\n\n.glass-clock {\n  background: rgba(13, 14, 18, 0.85);\n  backdrop-filter: blur(12px);\n  border-radius: 18px;\n  padding: 30px 40px;\n  text-align: center;\n}\n\n.clock-label {\n  font-size: 11px;\n  letter-spacing: 3px;\n  color: #00f2fe;\n  margin-bottom: 12px;\n  font-weight: 700;\n}\n\n#clock-time {\n  font-size: 44px;\n  font-family: monospace;\n  font-weight: bold;\n  color: #9d4edd;\n  text-shadow: 0 0 15px rgba(157, 78, 221, 0.6);\n  letter-spacing: 2px;\n}\n\n#clock-date {\n  margin-top: 12px;\n  font-size: 13px;\n  color: #565f89;\n  font-weight: 500;\n}`,
      js: `// Run clock update routine\nconsole.log("[Daemon] Launching background clock thread...");\n\nfunction updateClock() {\n  const now = new Date();\n  const timeStr = now.toTimeString().split(' ')[0];\n  const dateStr = now.toDateString().toUpperCase();\n  \n  const timeEl = document.querySelector('#clock-time');\n  const dateEl = document.querySelector('#clock-date');\n  \n  if (timeEl) timeEl.innerText = timeStr;\n  if (dateEl) dateEl.innerText = dateStr;\n}\n\n// Run initially and then on interval\nupdateClock();\nsetInterval(updateClock, 1000);\n\nconsole.log("[Daemon] Clock initialized successfully.");`
    },

    blank: {
      name: "Blank Starter Canvas",
      category: "blank",
      html: `<!-- Write your HTML structure here -->\n<div class="welcome">\n  <h1>My Web Project</h1>\n  <p>Start creating!</p>\n</div>`,
      css: `/* Write your CSS styling here */\nbody {\n  margin: 0;\n  padding: 20px;\n  font-family: system-ui, sans-serif;\n  background: #0f172a;\n  color: #f8fafc;\n}`,
      js: `// Write your JavaScript logic here\nconsole.log("Playground ready!");`
    }
  },

  renderUI() {
    return `
      <style>
        .editor-view-btn {
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
          white-space: nowrap;
        }
        .editor-view-btn:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.05);
        }
        .editor-view-btn.active[data-view="all"] {
          background: rgba(0, 242, 254, 0.15) !important;
          border-color: rgba(0, 242, 254, 0.45) !important;
          color: var(--accent-cyan) !important;
          box-shadow: 0 0 12px rgba(0, 242, 254, 0.22);
        }
        .editor-view-btn.active[data-view="html"] {
          background: rgba(168, 85, 247, 0.15) !important;
          border-color: rgba(168, 85, 247, 0.45) !important;
          color: #c084fc !important;
          box-shadow: 0 0 12px rgba(168, 85, 247, 0.22);
        }
        .editor-view-btn.active[data-view="css"] {
          background: rgba(16, 185, 129, 0.15) !important;
          border-color: rgba(16, 185, 129, 0.45) !important;
          color: #34d399 !important;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.22);
        }
        .editor-view-btn.active[data-view="js"] {
          background: rgba(245, 158, 11, 0.15) !important;
          border-color: rgba(245, 158, 11, 0.45) !important;
          color: #fbbf24 !important;
          box-shadow: 0 0 12px rgba(245, 158, 11, 0.22);
        }
        .lang-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .dot-html { background: #c084fc; box-shadow: 0 0 6px rgba(192, 132, 252, 0.6); }
        .dot-css { background: #34d399; box-shadow: 0 0 6px rgba(52, 211, 153, 0.6); }
        .dot-js { background: #fbbf24; box-shadow: 0 0 6px rgba(251, 191, 36, 0.6); }

        .autorun-toggle-label {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: var(--text-muted);
          cursor: pointer;
          user-select: none;
          padding: 3px 6px;
          border-radius: 5px;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .autorun-toggle-label:hover {
          color: var(--text-main);
          background: rgba(255, 255, 255, 0.04);
        }
        .autorun-toggle-label input {
          accent-color: var(--accent-cyan);
          width: 12px;
          height: 12px;
          cursor: pointer;
        }

        .play-chip-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #cbd5e1;
          padding: 3px 8px;
          border-radius: 5px;
          font-size: 11px;
          font-family: var(--font-mono);
          cursor: pointer;
          transition: all 0.15s ease;
          user-select: none;
          white-space: nowrap;
        }
        .play-chip-btn:hover {
          background: rgba(0, 242, 254, 0.12);
          color: var(--accent-cyan);
          border-color: rgba(0, 242, 254, 0.35);
          transform: translateY(-1px);
        }
        .play-chip-btn:active {
          transform: translateY(0);
        }

        .editor-action-btn {
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-muted);
          cursor: pointer;
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 10.5px;
          transition: all 0.15s;
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }
        .editor-action-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-main);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .editor-textarea {
          outline: none;
          tab-size: 2;
          -moz-tab-size: 2;
          transition: background-color 0.2s ease;
        }
        .editor-textarea:focus {
          background: rgba(0, 0, 0, 0.3) !important;
        }

        /* Custom subtle scrollbars for code deck */
        .editor-textarea::-webkit-scrollbar,
        #play-snippets-strip::-webkit-scrollbar,
        #play-libs-list::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .editor-textarea::-webkit-scrollbar-thumb,
        #play-snippets-strip::-webkit-scrollbar-thumb,
        #play-libs-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 3px;
        }
        .editor-textarea::-webkit-scrollbar-thumb:hover,
        #play-snippets-strip::-webkit-scrollbar-thumb:hover,
        #play-libs-list::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.22);
        }

        /* Strict Layout Isolation: Prevent Ad Collisions in Split-View */
        .tool-panel-ad {
          margin-top: 24px !important;
          padding-top: 16px !important;
          border-top: 1px dashed var(--border-color) !important;
          width: 100% !important;
          flex-shrink: 0 !important;
          clear: both !important;
          position: relative !important;
          z-index: 5 !important;
        }

        .tool-content-layout.split-view > .tool-panel {
          overflow-y: auto !important;
          scrollbar-width: thin !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
        }

        .editors-deck {
          display: flex !important;
          flex-direction: column !important;
          gap: 10px !important;
          width: 100% !important;
          flex-shrink: 0 !important;
        }

        /* Harmonize preview header split buttons */
        #play-preview-panel .panel-header .reset-split-btn,
        #play-preview-panel .panel-header .preview-fullscreen-btn {
          height: 26px !important;
          padding: 0 8px !important;
          font-size: 10.5px !important;
          line-height: 1 !important;
        }

        /* Context Ribbon: 100% collision-free responsive flex layout */
        .playground-ribbon {
          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          gap: 8px !important;
          background: rgba(255, 255, 255, 0.02) !important;
          border: 1px solid var(--border-color) !important;
          border-radius: 8px !important;
          padding: 6px 10px !important;
          flex-wrap: wrap !important;
          min-height: 38px !important;
          box-sizing: border-box !important;
          width: 100% !important;
        }

        .playground-ribbon-left {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          flex: 1 1 200px !important;
          min-width: 0 !important;
          max-width: 100% !important;
        }

        .playground-ribbon-right {
          display: flex !important;
          align-items: center !important;
          gap: 6px !important;
          flex-shrink: 0 !important;
          margin-left: auto !important;
        }
      </style>

      <div class="tool-content-layout split-view">
        <!-- Left Panel: Code Editors & Learning Controls -->
        <div class="tool-panel">
          
          <!-- Master Header Row 1: View Modes & Main Execution Controls -->
          <div class="panel-header" style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
            <!-- View Switcher Segmented Control -->
            <div class="editor-view-tabs" style="display: inline-flex; background: rgba(0,0,0,0.35); border: 1px solid var(--border-color); border-radius: 8px; padding: 2px; gap: 2px;">
              <button class="editor-view-btn active" data-view="all" title="View all 3 editors stacked in split layout">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
                <span>All (Split)</span>
              </button>
              <button class="editor-view-btn" data-view="html" title="Focus exclusively on HTML structure">
                <span class="lang-dot dot-html"></span>
                <span>HTML</span>
              </button>
              <button class="editor-view-btn" data-view="css" title="Focus exclusively on CSS styling">
                <span class="lang-dot dot-css"></span>
                <span>CSS</span>
              </button>
              <button class="editor-view-btn" data-view="js" title="Focus exclusively on JavaScript logic">
                <span class="lang-dot dot-js"></span>
                <span>JS</span>
              </button>
            </div>

            <!-- Primary Toolbar Buttons -->
            <div style="display: flex; align-items: center; gap: 5px; flex-wrap: wrap;">
              <label class="autorun-toggle-label" title="Automatically recompile sandbox as you type">
                <input type="checkbox" id="chk-play-autorun" checked>
                <span>Auto Run</span>
              </label>
              <button class="tool-btn" id="btn-play-run" title="Run & recompile code (Ctrl + Enter)" style="background: rgba(0, 242, 254, 0.12); border: 1px solid rgba(0, 242, 254, 0.45); color: var(--accent-cyan); font-weight: 700; padding: 4px 10px; font-size: 11.5px; height: 28px; display: inline-flex; align-items: center; gap: 4px;">
                <svg viewBox="0 0 24 24" fill="currentColor" style="width:10px; height:10px;"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                <span>Run</span>
              </button>
              <button class="tool-btn secondary" id="btn-play-format-all" title="Auto-indent and format HTML, CSS, and JS" style="font-size: 11px; padding: 4px 8px; height: 28px; display: inline-flex; align-items: center; gap: 3px;">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                <span>Format</span>
              </button>
              <button class="tool-btn secondary" id="btn-play-clear" title="Clear all editor contents" style="font-size: 11px; padding: 4px 8px; height: 28px;">
                Clear
              </button>
            </div>
          </div>

          <!-- Compact Project & Learning Context Ribbon -->
          <div class="playground-ribbon">
            <!-- Starter Template Dropdown -->
            <div class="playground-ribbon-left">
              <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; flex-shrink: 0;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                Starter:
              </span>
              <select id="play-template-select" class="form-select" style="flex: 1 1 0; min-width: 0; max-width: 100%; height: 26px; padding: 2px 8px; font-size: 11px; border-radius: 5px; background: rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.1); text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                <optgroup label="🔰 Beginner Starter Projects">
                  <option value="helloWorld" selected>1. Hello World Card</option>
                  <option value="counterApp">2. Click Counter</option>
                  <option value="todoApp">3. Mini To-Do List</option>
                  <option value="themeToggle">4. Theme Switcher</option>
                </optgroup>
                <optgroup label="🚀 Intermediate & Advanced Widgets">
                  <option value="glowButton">5. Cyber Glow Button</option>
                  <option value="digitalClock">6. Neon Digital Clock</option>
                </optgroup>
                <optgroup label="📄 Clean Slate">
                  <option value="blank">7. Blank Canvas</option>
                </optgroup>
              </select>
              <button class="tool-btn secondary" id="btn-play-reset-template" title="Reset current template to original starter code" style="font-size: 10.5px; height: 26px; padding: 0 7px; display: inline-flex; align-items: center; gap: 3px; white-space: nowrap; flex-shrink: 0;">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><polyline points="3 3 3 8 8 8"></polyline></svg>
                <span>Reset</span>
              </button>
            </div>

            <!-- Action Drawers Toggles: Libraries (CDNs) & Quick Tags -->
            <div class="playground-ribbon-right">
              <button class="tool-btn secondary" id="btn-play-toggle-libs" title="Manage External Libraries (Tailwind CSS, Font Awesome, Bootstrap, etc.)" style="font-size: 11px; height: 26px; padding: 0 8px; display: inline-flex; align-items: center; gap: 4px; color: var(--accent-cyan); border-color: rgba(0,242,254,0.3); background: rgba(0,242,254,0.05); white-space: nowrap; flex-shrink: 0;">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                <span>Libraries (<span id="play-libs-count-badge">0</span>)</span>
                <span id="play-libs-arrow" style="font-size: 8px; transition: transform 0.2s;">▾</span>
              </button>
              <button class="tool-btn secondary" id="btn-play-toggle-snippets" title="Show or hide quick tag insertion chips" style="font-size: 11px; height: 26px; padding: 0 8px; display: inline-flex; align-items: center; gap: 4px; color: #a9b2c3; white-space: nowrap; flex-shrink: 0;">
                <span>💡 Quick Tags</span>
                <span id="play-snippets-arrow" style="font-size: 8px; transition: transform 0.2s;">▾</span>
              </button>
            </div>
          </div>

          <!-- Drawer 1: External Libraries (CDNs) Manager (Collapsible, placed safely at top) -->
          <div id="play-libs-drawer" style="display: none; flex-direction: column; gap: 8px; background: rgba(0,0,0,0.3); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: 8px; padding: 12px; margin-bottom: 2px;">
            <div style="display: flex; justify-content: space-between; align-items: center;" id="play-libs-header">
              <span style="font-size: 11px; font-weight: 700; color: var(--accent-cyan); letter-spacing: 0.5px; text-transform: uppercase; display: flex; align-items: center; gap: 6px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                External Libraries (CDNs)
              </span>
              <span id="play-libs-count" style="font-size: 10px; background: rgba(0, 242, 254, 0.12); border: 1px solid rgba(0, 242, 254, 0.3); padding: 1px 7px; border-radius: 10px; color: var(--accent-cyan); font-weight: 600;">0 loaded</span>
            </div>
            
            <div id="play-libs-body" style="display: flex; flex-direction: column; gap: 8px; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 8px;">
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <select id="play-lib-select" class="form-select" style="flex: 1; min-width: 180px; height: 30px; padding: 2px 10px; font-size: 11.5px;">
                  <option value="">-- Choose Popular Library Preset --</option>
                  <option value="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">Tailwind CSS (v2.2)</option>
                  <option value="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">Font Awesome Icons (v6.4)</option>
                  <option value="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">Bootstrap CSS (v5.3)</option>
                  <option value="https://unpkg.com/lucide@latest">Lucide Icons (v0.344)</option>
                  <option value="https://code.jquery.com/jquery-3.7.0.min.js">jQuery (v3.7)</option>
                  <option value="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js">GSAP Animation Library</option>
                  <option value="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js">Canvas Confetti</option>
                  <option value="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js">Lodash JS</option>
                  <option value="https://cdn.jsdelivr.net/npm/chart.js">Chart.js</option>
                  <option value="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js">Vue 3 (Global)</option>
                  <option value="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">Animate.css</option>
                </select>
                <button class="tool-btn secondary" id="btn-play-add-preset" style="font-size: 11px; padding: 4px 12px; height: 30px; white-space: nowrap;">+ Add Preset</button>
              </div>

              <div style="display: flex; gap: 8px;">
                <input type="text" id="play-lib-custom" class="form-input input-text" placeholder="Or paste custom CDN .css or .js URL..." style="flex: 1; height: 30px; padding: 2px 10px; font-size: 11.5px;">
                <button class="tool-btn secondary" id="btn-play-add-custom" style="font-size: 11px; padding: 4px 12px; height: 30px; white-space: nowrap;">+ Add URL</button>
              </div>

              <div id="play-libs-list" style="display: flex; flex-direction: column; gap: 4px; max-height: 120px; overflow-y: auto; padding: 4px 0;">
                <!-- Active libraries list with delete buttons -->
              </div>
            </div>
          </div>

          <!-- Drawer 2: Collapsible Quick Snippets Strip -->
          <div id="play-snippets-strip" style="display: none; align-items: center; gap: 6px; background: rgba(0,0,0,0.25); border: 1px solid rgba(0, 242, 254, 0.15); border-radius: 8px; padding: 6px 10px; overflow-x: auto;">
            <span id="play-snippets-label" style="font-size: 10px; color: var(--accent-cyan); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap;">Insert:</span>
            <div id="play-snippets-chips" style="display: flex; gap: 5px; align-items: center; flex-wrap: nowrap;">
              <!-- Populated dynamically based on active view mode -->
            </div>
          </div>

          <!-- Code Editors Deck (Contains purely code editors, zero overflow pollution) -->
          <div class="editors-deck" id="play-editors-deck">
            <!-- HTML Editor Box -->
            <div class="editor-box" id="editor-box-html" data-lang="html" style="display: flex; flex-direction: column; border: 1px solid rgba(168,85,247,0.25); border-radius: 8px; overflow: hidden; background: #080b12; transition: all 0.25s ease;">
              <div class="editor-header" style="background: rgba(157, 78, 221, 0.12); border-bottom: 1px solid rgba(157, 78, 221, 0.25); padding: 5px 10px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="lang-dot dot-html"></span>
                  <span style="font-size: 11px; font-weight: 700; color: #c084fc; letter-spacing: 0.5px;">HTML (Body Structure)</span>
                  <span class="editor-stats-badge" id="play-html-stats" style="font-size: 10px; color: var(--text-muted); background: rgba(255,255,255,0.06); padding: 1px 6px; border-radius: 4px; font-family: var(--font-mono); font-variant-numeric: tabular-nums;">0 lines</span>
                </div>
                <div style="display: flex; align-items: center; gap: 3px;">
                  <button class="editor-action-btn" id="btn-copy-html" title="Copy HTML code">📋 Copy</button>
                  <button class="editor-action-btn" id="btn-format-html" title="Format HTML">✨ Format</button>
                  <button class="editor-action-btn" id="btn-clear-html" title="Clear HTML">🧹 Clear</button>
                </div>
              </div>
              <textarea id="play-html" class="editor-textarea" spellcheck="false" style="flex: 1; width: 100%; box-sizing: border-box; border: none; background: transparent; color: var(--text-main); font-family: var(--font-mono); font-size: 12.5px; padding: 10px 12px; resize: none; line-height: 1.55;" placeholder="Enter body HTML markup here..."></textarea>
            </div>

            <!-- CSS Editor Box -->
            <div class="editor-box" id="editor-box-css" data-lang="css" style="display: flex; flex-direction: column; border: 1px solid rgba(16,185,129,0.25); border-radius: 8px; overflow: hidden; background: #080b12; transition: all 0.25s ease;">
              <div class="editor-header" style="background: rgba(16, 185, 129, 0.12); border-bottom: 1px solid rgba(16, 185, 129, 0.25); padding: 5px 10px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="lang-dot dot-css"></span>
                  <span style="font-size: 11px; font-weight: 700; color: #34d399; letter-spacing: 0.5px;">CSS (Document Styling)</span>
                  <span class="editor-stats-badge" id="play-css-stats" style="font-size: 10px; color: var(--text-muted); background: rgba(255,255,255,0.06); padding: 1px 6px; border-radius: 4px; font-family: var(--font-mono); font-variant-numeric: tabular-nums;">0 lines</span>
                </div>
                <div style="display: flex; align-items: center; gap: 3px;">
                  <button class="editor-action-btn" id="btn-copy-css" title="Copy CSS code">📋 Copy</button>
                  <button class="editor-action-btn" id="btn-format-css" title="Format CSS">✨ Format</button>
                  <button class="editor-action-btn" id="btn-clear-css" title="Clear CSS">🧹 Clear</button>
                </div>
              </div>
              <textarea id="play-css" class="editor-textarea" spellcheck="false" style="flex: 1; width: 100%; box-sizing: border-box; border: none; background: transparent; color: var(--text-main); font-family: var(--font-mono); font-size: 12.5px; padding: 10px 12px; resize: none; line-height: 1.55;" placeholder="Enter document CSS styles here..."></textarea>
            </div>

            <!-- JavaScript Editor Box -->
            <div class="editor-box" id="editor-box-js" data-lang="js" style="display: flex; flex-direction: column; border: 1px solid rgba(245,158,11,0.25); border-radius: 8px; overflow: hidden; background: #080b12; transition: all 0.25s ease;">
              <div class="editor-header" style="background: rgba(245, 158, 11, 0.12); border-bottom: 1px solid rgba(245, 158, 11, 0.25); padding: 5px 10px; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span class="lang-dot dot-js"></span>
                  <span style="font-size: 11px; font-weight: 700; color: #fbbf24; letter-spacing: 0.5px;">JavaScript (Interactive Logic)</span>
                  <span class="editor-stats-badge" id="play-js-stats" style="font-size: 10px; color: var(--text-muted); background: rgba(255,255,255,0.06); padding: 1px 6px; border-radius: 4px; font-family: var(--font-mono); font-variant-numeric: tabular-nums;">0 lines</span>
                </div>
                <div style="display: flex; align-items: center; gap: 3px;">
                  <button class="editor-action-btn" id="btn-copy-js" title="Copy JS code">📋 Copy</button>
                  <button class="editor-action-btn" id="btn-format-js" title="Format JS">✨ Format</button>
                  <button class="editor-action-btn" id="btn-clear-js" title="Clear JS">🧹 Clear</button>
                </div>
              </div>
              <textarea id="play-js" class="editor-textarea" spellcheck="false" style="flex: 1; width: 100%; box-sizing: border-box; border: none; background: transparent; color: var(--text-main); font-family: var(--font-mono); font-size: 12.5px; padding: 10px 12px; resize: none; line-height: 1.55;" placeholder="Enter standard JavaScript executable logic..."></textarea>
            </div>
          </div>
        </div>

        <!-- Right Panel: Visual Sandbox Preview & Debug Console -->
        <div class="tool-panel" id="play-preview-panel">
          
          <!-- Sandbox Header Row -->
          <div class="panel-header" style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <h3 style="margin: 0; white-space: nowrap;">Visual Preview</h3>
              <span style="display: inline-flex; align-items: center; gap: 5px; font-size: 10px; color: #34d399; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); padding: 1px 7px; border-radius: 10px; font-weight: 600;">
                <span style="width: 5px; height: 5px; border-radius: 50%; background: #10b981; box-shadow: 0 0 6px #10b981;"></span>
                Live
              </span>
            </div>

            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <!-- Device Selectors -->
              <div class="device-selectors" style="display: inline-flex; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 7px; padding: 2px; gap: 2px;">
                <button class="device-btn" data-size="100%" title="Desktop View (100%)" style="background: var(--accent-cyan); border: none; color: #000; cursor: pointer; padding: 3px 8px; border-radius: 5px; font-size: 10.5px; font-weight: 700; transition: all 0.2s; display: inline-flex; align-items: center; gap: 3px;">💻 Full</button>
                <button class="device-btn" data-size="768px" title="Tablet View (768px)" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 3px 8px; border-radius: 5px; font-size: 10.5px; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 3px;">📟 768px</button>
                <button class="device-btn" data-size="375px" title="Mobile View (375px)" style="background: transparent; border: none; color: var(--text-muted); cursor: pointer; padding: 3px 8px; border-radius: 5px; font-size: 10.5px; font-weight: 600; transition: all 0.2s; display: inline-flex; align-items: center; gap: 3px;">📱 375px</button>
              </div>

              <!-- Open in New Tab Button -->
              <button class="tool-btn secondary" id="btn-play-open-window" style="font-size: 11px; height: 26px; padding: 0 8px; display: inline-flex; align-items: center; gap: 4px;" title="Open live preview in an isolated full browser tab">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>New Tab</span>
              </button>
              
              <!-- Download Button -->
              <button class="tool-btn secondary" id="btn-play-download" style="font-size: 11px; height: 26px; padding: 0 8px; display: inline-flex; align-items: center; gap: 4px;" title="Download as Single HTML File">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Export</span>
              </button>
            </div>
          </div>

          <!-- Preview Sandbox Frame Container -->
          <div id="play-sandbox-container" style="border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; background: #0c0e15; height: 340px; min-height: 280px; position: relative; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); margin: 0 auto; width: 100%; flex-shrink: 0;">
            <iframe id="play-sandbox" style="width: 100%; height: 100%; border: none; background: transparent; display: block;" sandbox="allow-scripts"></iframe>
          </div>

          <!-- Simulated Console Output Area -->
          <div id="play-console-box" style="display: flex; flex-direction: column; border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; background: #07090e; height: 180px; min-height: 140px; flex-shrink: 0;">
            <div style="background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--border-color); padding: 6px 12px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); font-family: var(--font-mono); letter-spacing: 0.5px;">SIMULATED DEBUG CONSOLE</span>
                <span id="play-console-status-hint" style="display: none; font-size: 10px; color: var(--accent-rose); background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.2); padding: 1px 6px; border-radius: 4px;">Syntax error detected</span>
              </div>
              
              <div style="display: flex; gap: 6px; align-items: center;">
                <!-- Console Filters -->
                <div class="console-filters" style="display: flex; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: 6px; padding: 2px; gap: 2px;">
                  <button class="console-filter-btn active" data-filter="all" style="background: rgba(255,255,255,0.08); border: none; color: var(--text-main); cursor: pointer; padding: 2px 7px; border-radius: 4px; font-size: 10px; font-family: var(--font-mono); font-weight: 700;">All</button>
                  <button class="console-filter-btn" data-filter="log" style="background: transparent; border: none; color: #10b981; cursor: pointer; padding: 2px 7px; border-radius: 4px; font-size: 10px; font-family: var(--font-mono); font-weight: 700;">Logs (<span id="count-logs">0</span>)</button>
                  <button class="console-filter-btn" data-filter="warn" style="background: transparent; border: none; color: #f59e0b; cursor: pointer; padding: 2px 7px; border-radius: 4px; font-size: 10px; font-family: var(--font-mono); font-weight: 700;">Warns (<span id="count-warns">0</span>)</button>
                  <button class="console-filter-btn" data-filter="error" style="background: transparent; border: none; color: var(--accent-rose); cursor: pointer; padding: 2px 7px; border-radius: 4px; font-size: 10px; font-family: var(--font-mono); font-weight: 700;">Errs (<span id="count-errs">0</span>)</button>
                </div>
                <button class="tool-btn secondary" id="play-console-clear" style="font-size: 10px; height: 22px; padding: 0 7px; line-height: 1; border-color: var(--border-color);">Clear</button>
              </div>
            </div>
            <div id="play-console-logs" style="flex: 1; overflow-y: auto; padding: 8px 12px; font-family: var(--font-mono); font-size: 11px; display: flex; flex-direction: column; gap: 4px; line-height: 1.45; user-select: text;">
              <div style="color: var(--text-muted); font-style: italic;">Console log messages will print here during script runs.</div>
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
            <button class="tool-btn secondary" id="play-guide-load-sample" style="font-size: 11px;">Try Example</button>
          </div>
          <div class="tool-guide-steps">
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">1</div>
              <div class="tool-guide-step-text"><strong>Choose View & Template</strong>: Work in <strong>"All (Split)"</strong> stacked view to see everything, or switch to <strong>"HTML"</strong>, <strong>"CSS"</strong>, or <strong>"JS"</strong> tabs to focus on learning one language at a time. Pick from beginner lessons or advanced widgets.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">2</div>
              <div class="tool-guide-step-text"><strong>Beginner Helpers & Hot-Reload</strong>: Click <strong>"💡 Quick Tags"</strong> to instantly insert starter code, click <strong>"✨ Format"</strong> to auto-indent, and watch live hot-reloads compile automatically as you type.</div>
            </div>
            <div class="tool-guide-step">
              <div class="tool-guide-step-num">3</div>
              <div class="tool-guide-step-text"><strong>Debug & Responsive Preview</strong>: Test Full Desktop, Tablet, or Mobile viewports, open in a full browser tab with <strong>"New Tab"</strong>, inspect simulated console logs, and download standalone <code>.html</code> files.</div>
            </div>
          </div>
          <div class="tool-guide-example">
            <div class="tool-guide-example-header">
              <span class="tool-guide-example-title">📋 Examples & Lessons</span>
              <div class="tool-guide-example-tabs">
                <button class="tool-guide-example-tab-btn active" data-index="0">1. Welcome Card (Beginner)</button>
                <button class="tool-guide-example-tab-btn" data-index="1">2. Click Counter (Beginner)</button>
                <button class="tool-guide-example-tab-btn" data-index="2">3. Cyber Glow Button</button>
                <button class="tool-guide-example-tab-btn" data-index="3">4. Digital Clock Widget</button>
              </div>
            </div>
            <!-- Example 0: Hello World -->
            <div class="tool-guide-io-row example-val-0">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Lesson Content</span>
                <div class="tool-guide-io-value">
                  HTML: Clean card structure with headings & buttons.<br>
                  CSS: Modern gradient colors and hover lifts.<br>
                  JS: Click event listener that counts clicks.
                </div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Render Behavior</span>
                <div class="tool-guide-io-value">
                  Interactive welcome card with responsive greeting button and live state counter.
                </div>
              </div>
            </div>
            <!-- Example 1: Counter -->
            <div class="tool-guide-io-row example-val-1" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Lesson Content</span>
                <div class="tool-guide-io-value">
                  HTML: Counter display with 3 action buttons.<br>
                  CSS: Tactile button presses and status color coding.<br>
                  JS: State variable math (+1, -1, reset) & DOM text updates.
                </div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Render Behavior</span>
                <div class="tool-guide-io-value">
                  Smooth reactive counter that shifts color between green (positive) and red (negative).
                </div>
              </div>
            </div>
            <!-- Example 2: Cyber Glow -->
            <div class="tool-guide-io-row example-val-2" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Lesson Content</span>
                <div class="tool-guide-io-value">
                  HTML: Centered cyber button layout.<br>
                  CSS: Glowing neon outline & dark cyberpunk backdrop.<br>
                  JS: Interactive count log and throttle warnings.
                </div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Render Behavior</span>
                <div class="tool-guide-io-value">
                  Button hovers with smooth cyan glow, logs triggers, and warns in the debug terminal.
                </div>
              </div>
            </div>
            <!-- Example 3: Clock -->
            <div class="tool-guide-io-row example-val-3" style="display: none;">
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label input-label">📥 Lesson Content</span>
                <div class="tool-guide-io-value">
                  HTML: Glassmorphism clock frame.<br>
                  CSS: Frosted blur and gradient border styling.<br>
                  JS: <code>setInterval</code> loop synchronized to system clock.
                </div>
              </div>
              <div class="tool-guide-io-arrow">→</div>
              <div class="tool-guide-io-block">
                <span class="tool-guide-io-label output-label">📤 Render Behavior</span>
                <div class="tool-guide-io-value">
                  Widget displays live, ticking digital clock in hours, minutes, and seconds.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async init(container, appInstance) {
    const htmlInput = container.querySelector("#play-html");
    const cssInput = container.querySelector("#play-css");
    const jsInput = container.querySelector("#play-js");
    const runBtn = container.querySelector("#btn-play-run");
    const clearBtn = container.querySelector("#btn-play-clear");
    const formatAllBtn = container.querySelector("#btn-play-format-all");
    const templateSelect = container.querySelector("#play-template-select");
    const resetTemplateBtn = container.querySelector("#btn-play-reset-template");
    
    // Drawers & Toggles
    const toggleSnippetsBtn = container.querySelector("#btn-play-toggle-snippets");
    const snippetsStrip = container.querySelector("#play-snippets-strip");
    const snippetsChips = container.querySelector("#play-snippets-chips");
    const snippetsLabel = container.querySelector("#play-snippets-label");
    const snippetsArrow = container.querySelector("#play-snippets-arrow");

    const toggleLibsBtn = container.querySelector("#btn-play-toggle-libs");
    const libsDrawer = container.querySelector("#play-libs-drawer");
    const libsArrow = container.querySelector("#play-libs-arrow");
    const libsCountBadge = container.querySelector("#play-libs-count-badge");
    const libsHeader = container.querySelector("#play-libs-header");
    const libsBody = container.querySelector("#play-libs-body");
    const libSelect = container.querySelector("#play-lib-select");
    const customLibInput = container.querySelector("#play-lib-custom");
    const addPresetBtn = container.querySelector("#btn-play-add-preset");
    const addCustomBtn = container.querySelector("#btn-play-add-custom");
    const libsListContainer = container.querySelector("#play-libs-list");
    const libsCountEl = container.querySelector("#play-libs-count");

    // Output & Sandbox
    const sandboxFrame = container.querySelector("#play-sandbox");
    const sandboxContainer = container.querySelector("#play-sandbox-container");
    const openWindowBtn = container.querySelector("#btn-play-open-window");
    const downloadBtn = container.querySelector("#btn-play-download");
    const consoleClearBtn = container.querySelector("#play-console-clear");
    const consoleLogsContainer = container.querySelector("#play-console-logs");
    const consoleStatusHint = container.querySelector("#play-console-status-hint");
    const chkAutorun = container.querySelector("#chk-play-autorun");
    
    // Editor boxes
    const boxHtml = container.querySelector("#editor-box-html");
    const boxCss = container.querySelector("#editor-box-css");
    const boxJs = container.querySelector("#editor-box-js");
    const viewTabs = container.querySelectorAll(".editor-view-btn");
    
    // Per-editor action buttons
    const btnCopyHtml = container.querySelector("#btn-copy-html");
    const btnFormatHtml = container.querySelector("#btn-format-html");
    const btnClearHtml = container.querySelector("#btn-clear-html");
    const btnCopyCss = container.querySelector("#btn-copy-css");
    const btnFormatCss = container.querySelector("#btn-format-css");
    const btnClearCss = container.querySelector("#btn-clear-css");
    const btnCopyJs = container.querySelector("#btn-copy-js");
    const btnFormatJs = container.querySelector("#btn-format-js");
    const btnClearJs = container.querySelector("#btn-clear-js");
    
    // Editor stats
    const statsHtml = container.querySelector("#play-html-stats");
    const statsCss = container.querySelector("#play-css-stats");
    const statsJs = container.querySelector("#play-js-stats");

    let activeLibs = [];
    let logCounts = { log: 0, warn: 0, error: 0 };
    let currentSandboxUrl = null;
    let autorunTimeout = null;
    let currentViewMode = "all"; // 'all' | 'html' | 'css' | 'js'
    let lastFocusedTextarea = htmlInput;
    let lastClearedBackup = null;

    // Track active textarea focus for snippet insertions
    [htmlInput, cssInput, jsInput].forEach(tx => {
      tx.addEventListener("focus", () => { lastFocusedTextarea = tx; });
    });

    // Code Formatters (Pure JS, zero external dependencies)
    function formatHtmlCode(html) {
      if (!html) return '';
      let formatted = '';
      let indent = 0;
      const tab = '  ';
      const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
      const tokens = html.replace(/>\s*</g, '><').match(/<!--[\s\S]*?-->|<[^>]+>|[^<]+/g) || [];
      
      tokens.forEach(token => {
        token = token.trim();
        if (!token) return;
        
        if (token.startsWith('<!--')) {
          formatted += tab.repeat(indent) + token + '\n';
          return;
        }
        
        if (token.startsWith('</')) {
          indent = Math.max(0, indent - 1);
          formatted += tab.repeat(indent) + token + '\n';
          return;
        }
        
        if (token.startsWith('<')) {
          const match = token.match(/<([a-zA-Z0-9\-]+)/);
          const tagName = match ? match[1].toLowerCase() : '';
          const isSelfClosing = token.endsWith('/>') || voidTags.has(tagName);
          
          formatted += tab.repeat(indent) + token + '\n';
          if (!isSelfClosing) {
            indent++;
          }
          return;
        }
        
        formatted += tab.repeat(indent) + token + '\n';
      });
      
      return formatted.trim();
    }

    function formatCssCode(css) {
      if (!css) return '';
      let formatted = '';
      let indent = 0;
      const tab = '  ';
      const cleaned = css
        .replace(/\/\*[\s\S]*?\*\//g, m => '\n' + m + '\n')
        .replace(/\s+/g, ' ')
        .replace(/\s*{\s*/g, ' {\n')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/\s*;\s*/g, ';\n');
      
      const lines = cleaned.split('\n');
      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;
        if (trimmed.includes('}')) indent = Math.max(0, indent - 1);
        formatted += tab.repeat(indent) + trimmed + '\n';
        if (trimmed.includes('{')) indent++;
      });
      
      return formatted.trim();
    }

    function formatJsCode(js) {
      if (!js) return '';
      let formatted = '';
      let indent = 0;
      const tab = '  ';
      const lines = js.split('\n');
      
      lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) {
          formatted += '\n';
          return;
        }
        
        const leadingClose = (trimmed.match(/^[}\]\)]+/) || [''])[0].length;
        const tempIndent = Math.max(0, indent - leadingClose);
        
        formatted += tab.repeat(tempIndent) + trimmed + '\n';
        
        const openMatches = (trimmed.match(/[{\[\(]/g) || []).length;
        const closeMatches = (trimmed.match(/[}\]\)]/g) || []).length;
        indent = Math.max(0, indent + openMatches - closeMatches);
      });
      
      return formatted.trim();
    }

    // Helper: Insert text at cursor position in a textarea
    function insertAtCursor(textarea, text) {
      const start = textarea.selectionStart ?? textarea.value.length;
      const end = textarea.selectionEnd ?? textarea.value.length;
      const val = textarea.value;
      textarea.value = val.substring(0, start) + text + val.substring(end);
      const newPos = start + text.length;
      textarea.selectionStart = textarea.selectionEnd = newPos;
      textarea.focus();
      textarea.dispatchEvent(new Event('input'));
    }

    // Update Line and Character counts for editors
    function updateEditorStats() {
      const updateStats = (el, badgeEl) => {
        if (!el || !badgeEl) return;
        const text = el.value || '';
        const lines = text ? text.split('\n').length : 0;
        const chars = text.length;
        badgeEl.innerText = `${lines} ${lines === 1 ? 'line' : 'lines'}`;
        badgeEl.title = `${lines} lines • ${chars} characters`;
      };
      updateStats(htmlInput, statsHtml);
      updateStats(cssInput, statsCss);
      updateStats(jsInput, statsJs);
    }

    // Snippets Definition
    const snippetSets = {
      html: [
        { label: "<h1>", code: "<h1>Main Heading</h1>\n" },
        { label: "<p>", code: "<p>Paragraph text goes here.</p>\n" },
        { label: "<button>", code: "<button class=\"btn\">Click Me</button>\n" },
        { label: "<input>", code: "<input type=\"text\" placeholder=\"Type here...\" />\n" },
        { label: "<card>", code: "<div class=\"card\">\n  <h2>Card Title</h2>\n  <p>Card description text.</p>\n</div>\n" },
        { label: "<img>", code: "<img src=\"https://picsum.photos/300/200\" alt=\"Photo\" />\n" },
        { label: "<ul><li>", code: "<ul>\n  <li>First item</li>\n  <li>Second item</li>\n</ul>\n" }
      ],
      css: [
        { label: "Flex Center", code: "display: flex;\njustify-content: center;\nalign-items: center;\n" },
        { label: "Grid 2-Col", code: "display: grid;\ngrid-template-columns: 1fr 1fr;\ngap: 16px;\n" },
        { label: "Card Shadow", code: "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);\nborder-radius: 12px;\n" },
        { label: "Neon Glow", code: "box-shadow: 0 0 20px #00f2fe;\nborder: 1px solid #00f2fe;\n" },
        { label: "Glass Effect", code: "background: rgba(255, 255, 255, 0.08);\nbackdrop-filter: blur(12px);\nborder: 1px solid rgba(255, 255, 255, 0.15);\n" },
        { label: "Hover Lift", code: "transition: transform 0.2s ease, opacity 0.2s;\n" }
      ],
      js: [
        { label: "querySelector", code: "const element = document.querySelector('#my-element');\n" },
        { label: "addEventListener", code: "button.addEventListener('click', () => {\n  console.log('Button clicked!');\n});\n" },
        { label: "console.log", code: "console.log(\"Debug message:\", value);\n" },
        { label: "classList.toggle", code: "element.classList.toggle('active');\n" },
        { label: "setInterval", code: "setInterval(() => {\n  // Code runs repeatedly\n}, 1000);\n" },
        { label: "fetch() API", code: "fetch('https://api.github.com')\n  .then(res => res.json())\n  .then(data => console.log(data));\n" }
      ]
    };

    // Render Quick Snippet Chips based on view mode
    function renderSnippetChips(mode) {
      if (!snippetsChips) return;
      snippetsChips.innerHTML = '';
      
      let items = [];
      if (mode === 'html') {
        items = snippetSets.html;
        if (snippetsLabel) snippetsLabel.innerText = "Insert HTML:";
      } else if (mode === 'css') {
        items = snippetSets.css;
        if (snippetsLabel) snippetsLabel.innerText = "Insert CSS:";
      } else if (mode === 'js') {
        items = snippetSets.js;
        if (snippetsLabel) snippetsLabel.innerText = "Insert JS:";
      } else {
        items = [
          { label: "<h1>", code: "<h1>Hello World</h1>\n", target: 'html' },
          { label: "<button>", code: "<button class=\"btn\">Click Me</button>\n", target: 'html' },
          { label: "<card>", code: "<div class=\"card\">\n  <h2>Title</h2>\n</div>\n", target: 'html' },
          { label: "Flex Center", code: "display: flex;\njustify-content: center;\nalign-items: center;\n", target: 'css' },
          { label: "Neon Glow", code: "box-shadow: 0 0 15px #00f2fe;\n", target: 'css' },
          { label: "addEventListener", code: "btn.addEventListener('click', () => {\n  console.log('Clicked!');\n});\n", target: 'js' },
          { label: "console.log", code: "console.log('Test output');\n", target: 'js' }
        ];
        if (snippetsLabel) snippetsLabel.innerText = "Quick Tags:";
      }

      items.forEach(snippet => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "play-chip-btn";
        chip.innerText = snippet.label;
        chip.title = `Click to insert ${snippet.label}`;
        chip.addEventListener("click", () => {
          let targetTx = lastFocusedTextarea;
          if (snippet.target === 'html') targetTx = htmlInput;
          else if (snippet.target === 'css') targetTx = cssInput;
          else if (snippet.target === 'js') targetTx = jsInput;
          else {
            if (mode === 'html') targetTx = htmlInput;
            else if (mode === 'css') targetTx = cssInput;
            else if (mode === 'js') targetTx = jsInput;
          }
          insertAtCursor(targetTx, snippet.code);
          
          // Micro-interaction highlight
          chip.style.borderColor = "var(--accent-emerald)";
          chip.style.color = "var(--accent-emerald)";
          setTimeout(() => {
            chip.style.borderColor = "";
            chip.style.color = "";
          }, 350);

          appInstance.showToast(`Inserted ${snippet.label}`, "info");
          if (typeof appInstance.playSynthSound === 'function') {
            appInstance.playSynthSound('click');
          }
        });
        snippetsChips.appendChild(chip);
      });
    }

    // View Switching: All (Split), HTML, CSS, JS
    function setViewMode(mode) {
      currentViewMode = mode;
      
      viewTabs.forEach(tab => {
        const isMatch = tab.getAttribute("data-view") === mode;
        tab.classList.toggle("active", isMatch);
      });

      if (mode === "all") {
        boxHtml.style.display = "flex";
        boxHtml.style.height = "180px";
        htmlInput.style.height = "auto";

        boxCss.style.display = "flex";
        boxCss.style.height = "180px";
        cssInput.style.height = "auto";

        boxJs.style.display = "flex";
        boxJs.style.height = "180px";
        jsInput.style.height = "auto";
      } else if (mode === "html") {
        boxHtml.style.display = "flex";
        boxHtml.style.height = "540px";
        htmlInput.style.height = "auto";
        boxCss.style.display = "none";
        boxJs.style.display = "none";
        lastFocusedTextarea = htmlInput;
      } else if (mode === "css") {
        boxCss.style.display = "flex";
        boxCss.style.height = "540px";
        cssInput.style.height = "auto";
        boxHtml.style.display = "none";
        boxJs.style.display = "none";
        lastFocusedTextarea = cssInput;
      } else if (mode === "js") {
        boxJs.style.display = "flex";
        boxJs.style.height = "540px";
        jsInput.style.height = "auto";
        boxHtml.style.display = "none";
        boxCss.style.display = "none";
        lastFocusedTextarea = jsInput;
      }

      renderSnippetChips(mode);
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    }

    viewTabs.forEach(btn => {
      btn.addEventListener("click", () => {
        const view = btn.getAttribute("data-view");
        setViewMode(view);
      });
    });

    // Toggle Snippets Drawer visibility
    toggleSnippetsBtn?.addEventListener("click", () => {
      const isHidden = snippetsStrip.style.display === "none";
      snippetsStrip.style.display = isHidden ? "flex" : "none";
      toggleSnippetsBtn.style.color = isHidden ? "var(--accent-cyan)" : "var(--text-muted)";
      toggleSnippetsBtn.style.borderColor = isHidden ? "rgba(0, 242, 254, 0.4)" : "";
      if (snippetsArrow) {
        snippetsArrow.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
      }
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    // Toggle External Libraries Drawer visibility
    toggleLibsBtn?.addEventListener("click", () => {
      const isHidden = libsDrawer.style.display === "none";
      libsDrawer.style.display = isHidden ? "flex" : "none";
      toggleLibsBtn.style.color = isHidden ? "var(--accent-cyan)" : "var(--text-muted)";
      toggleLibsBtn.style.borderColor = isHidden ? "rgba(0, 242, 254, 0.5)" : "";
      if (libsArrow) {
        libsArrow.style.transform = isHidden ? "rotate(180deg)" : "rotate(0deg)";
      }
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    // Per-Editor Actions Handlers with Visual Confirmation
    const copyToClipboard = async (text, label, btnEl) => {
      if (!text) {
        appInstance.showToast(`${label} is currently empty`, "warn");
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
        if (btnEl) {
          const originalText = btnEl.innerText;
          btnEl.innerText = "✓ Copied!";
          btnEl.style.color = "#34d399";
          setTimeout(() => {
            btnEl.innerText = originalText;
            btnEl.style.color = "";
          }, 1200);
        }
        appInstance.showToast(`Copied ${label} to clipboard`, "success");
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('success');
        }
      } catch (err) {
        appInstance.showToast("Failed to copy to clipboard", "error");
      }
    };

    btnCopyHtml?.addEventListener("click", () => copyToClipboard(htmlInput.value, "HTML code", btnCopyHtml));
    btnCopyCss?.addEventListener("click", () => copyToClipboard(cssInput.value, "CSS code", btnCopyCss));
    btnCopyJs?.addEventListener("click", () => copyToClipboard(jsInput.value, "JavaScript code", btnCopyJs));

    btnFormatHtml?.addEventListener("click", () => {
      htmlInput.value = formatHtmlCode(htmlInput.value);
      updateEditorStats();
      triggerAutorun();
      appInstance.showToast("Formatted HTML markup", "success");
    });

    btnFormatCss?.addEventListener("click", () => {
      cssInput.value = formatCssCode(cssInput.value);
      updateEditorStats();
      triggerAutorun();
      appInstance.showToast("Formatted CSS stylesheet", "success");
    });

    btnFormatJs?.addEventListener("click", () => {
      jsInput.value = formatJsCode(jsInput.value);
      updateEditorStats();
      triggerAutorun();
      appInstance.showToast("Formatted JavaScript code", "success");
    });

    btnClearHtml?.addEventListener("click", () => {
      htmlInput.value = "";
      updateEditorStats();
      compileSandbox();
      appInstance.showToast("Cleared HTML editor", "info");
    });

    btnClearCss?.addEventListener("click", () => {
      cssInput.value = "";
      updateEditorStats();
      compileSandbox();
      appInstance.showToast("Cleared CSS editor", "info");
    });

    btnClearJs?.addEventListener("click", () => {
      jsInput.value = "";
      updateEditorStats();
      compileSandbox();
      appInstance.showToast("Cleared JavaScript editor", "info");
    });

    // Global "Format All" Button
    formatAllBtn?.addEventListener("click", () => {
      htmlInput.value = formatHtmlCode(htmlInput.value);
      cssInput.value = formatCssCode(cssInput.value);
      jsInput.value = formatJsCode(jsInput.value);
      updateEditorStats();
      compileSandbox();
      appInstance.showToast("✨ Beautified HTML, CSS & JavaScript", "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    });

    // Template Selector & Reset Handlers
    const loadTemplate = (key, notify = true) => {
      const template = this.defaultTemplates[key] || this.defaultTemplates.helloWorld;
      if (templateSelect && this.defaultTemplates[key]) {
        templateSelect.value = key;
      }
      htmlInput.value = template.html;
      cssInput.value = template.css;
      jsInput.value = template.js;
      updateEditorStats();
      compileSandbox();
      if (notify) {
        appInstance.showToast(`Loaded ${template.name}`, "success");
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('success');
        }
      }
    };

    templateSelect?.addEventListener("change", () => {
      loadTemplate(templateSelect.value);
    });

    resetTemplateBtn?.addEventListener("click", () => {
      loadTemplate(templateSelect.value || "helloWorld");
      appInstance.showToast("Reset code to template defaults", "info");
    });

    // Render Active Libraries Badges
    const renderActiveLibs = () => {
      const count = activeLibs.length;
      if (libsCountEl) libsCountEl.innerText = `${count} loaded`;
      if (libsCountBadge) libsCountBadge.innerText = String(count);
      
      if (!libsListContainer) return;

      if (count === 0) {
        libsListContainer.innerHTML = `<div style="color: #636f88; font-style: italic; font-size: 11px; padding: 4px 0;">No external libraries loaded.</div>`;
        return;
      }
      
      libsListContainer.innerHTML = activeLibs.map((url, index) => {
        let displayName = url;
        try {
          const u = new URL(url);
          const pathname = u.pathname;
          const parts = pathname.split('/');
          displayName = parts[parts.length - 1] || url;
          if (displayName.length > 32) displayName = '...' + displayName.slice(-28);
        } catch(e) {}
        
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); padding: 4px 8px; border-radius: 4px; font-size: 11px;">
            <span style="color: #a9b2c3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 80%;" title="${escapeHtml(url)}">${escapeHtml(displayName)}</span>
            <button class="play-lib-remove-btn" data-index="${index}" style="background: transparent; border: none; color: var(--accent-rose); cursor: pointer; font-weight: bold; font-size: 12px; padding: 0 4px;">✕</button>
          </div>
        `;
      }).join('');
      
      libsListContainer.querySelectorAll(".play-lib-remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-index"), 10);
          activeLibs.splice(idx, 1);
          renderActiveLibs();
          compileSandbox();
          appInstance.showToast("Removed external resource", "info");
        });
      });
    };

    const addLibrary = (url) => {
      if (!url || !url.trim().startsWith("http")) {
        appInstance.showToast("Please provide a valid CDN URL starting with http/https", "error");
        return;
      }
      const trimmed = url.trim();
      if (activeLibs.includes(trimmed)) {
        appInstance.showToast("Library is already loaded!", "warn");
        return;
      }
      activeLibs.push(trimmed);
      renderActiveLibs();
      compileSandbox();
      appInstance.showToast("Added external library resource", "success");
    };

    addPresetBtn?.addEventListener("click", () => {
      const selected = libSelect.value;
      if (selected) {
        addLibrary(selected);
        libSelect.value = "";
      } else {
        appInstance.showToast("Please select a popular library from the list", "warn");
      }
    });

    libSelect?.addEventListener("change", () => {
      const selected = libSelect.value;
      if (selected) {
        addLibrary(selected);
        libSelect.value = "";
      }
    });

    addCustomBtn?.addEventListener("click", () => {
      const url = customLibInput.value;
      if (url) {
        addLibrary(url);
        customLibInput.value = "";
      } else {
        appInstance.showToast("Please paste a valid URL", "warn");
      }
    });

    // Device size selections
    const deviceBtns = container.querySelectorAll(".device-btn");
    deviceBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        deviceBtns.forEach(b => {
          b.style.background = "transparent";
          b.style.color = "var(--text-muted)";
        });
        btn.style.background = "var(--accent-cyan)";
        btn.style.color = "#000";
        
        const size = btn.getAttribute("data-size");
        if (sandboxContainer) sandboxContainer.style.width = size;
        
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('click');
        }
      });
    });

    // Console Filters Selection
    const filterBtns = container.querySelectorAll(".console-filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
          b.style.background = "transparent";
          b.style.color = b.getAttribute("data-filter") === "log" ? "#10b981" : 
                          b.getAttribute("data-filter") === "warn" ? "#f59e0b" : 
                          b.getAttribute("data-filter") === "error" ? "var(--accent-rose)" : "var(--text-muted)";
          b.classList.remove("active");
        });
        btn.style.background = "rgba(255, 255, 255, 0.08)";
        btn.style.color = "var(--text-main)";
        btn.classList.add("active");
        
        const filterVal = btn.getAttribute("data-filter");
        const logElements = consoleLogsContainer.querySelectorAll(".console-item");
        logElements.forEach(el => {
          if (filterVal === "all") {
            el.style.display = "block";
          } else {
            el.style.display = el.classList.contains(`type-${filterVal}`) ? "block" : "none";
          }
        });

        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('click');
        }
      });
    });

    const updateConsoleCounts = () => {
      const logsSpan = container.querySelector("#count-logs");
      const warnsSpan = container.querySelector("#count-warns");
      const errsSpan = container.querySelector("#count-errs");
      
      if (logsSpan) logsSpan.innerText = logCounts.log;
      if (warnsSpan) warnsSpan.innerText = logCounts.warn;
      if (errsSpan) errsSpan.innerText = logCounts.error;

      if (consoleStatusHint) {
        if (logCounts.error > 0) {
          consoleStatusHint.style.display = "inline-block";
          consoleStatusHint.innerText = `${logCounts.error} error${logCounts.error > 1 ? 's' : ''} detected`;
        } else {
          consoleStatusHint.style.display = "none";
        }
      }
    };

    // Tab switching for guide examples
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

    // Helper: Add logs to simulated console with rich formatting
    function appendConsoleLog(type, content) {
      if (consoleLogsContainer.querySelector("div[style*='italic']")) {
        consoleLogsContainer.innerHTML = "";
      }
      
      const logDiv = document.createElement("div");
      logDiv.style.padding = "3px 0";
      logDiv.style.borderBottom = "1px solid rgba(255,255,255,0.02)";
      logDiv.classList.add("console-item");
      logDiv.classList.add(`type-${type}`);
      
      const stampSpan = document.createElement("span");
      stampSpan.style.color = "#565f89";
      stampSpan.style.marginRight = "6px";
      stampSpan.innerText = `[${new Date().toTimeString().split(' ')[0]}]`;
      logDiv.appendChild(stampSpan);

      const typeSpan = document.createElement("span");
      typeSpan.style.fontWeight = "bold";
      typeSpan.style.marginRight = "8px";

      if (type === "error") {
        typeSpan.style.color = "var(--accent-rose)";
        typeSpan.innerText = "✖ [ERR]";
        logDiv.style.background = "rgba(244, 63, 94, 0.05)";
      } else if (type === "warn") {
        typeSpan.style.color = "#f59e0b";
        typeSpan.innerText = "⚠ [WRN]";
        logDiv.style.background = "rgba(245, 158, 11, 0.05)";
      } else {
        typeSpan.style.color = "#10b981";
        typeSpan.innerText = "ℹ [LOG]";
      }
      
      logDiv.appendChild(typeSpan);

      const contentSpan = document.createElement("span");
      contentSpan.style.color = type === "error" ? "#ff7878" : type === "warn" ? "#ffe27d" : "#e0e6f1";
      contentSpan.innerText = content;
      logDiv.appendChild(contentSpan);

      consoleLogsContainer.appendChild(logDiv);
      consoleLogsContainer.scrollTop = consoleLogsContainer.scrollHeight;
      
      if (logCounts[type] !== undefined) {
        logCounts[type]++;
        updateConsoleCounts();
      }

      const activeFilter = container.querySelector(".console-filter-btn.active")?.getAttribute("data-filter") || "all";
      if (activeFilter !== "all" && activeFilter !== type) {
        logDiv.style.display = "none";
      }
    }

    // Clear Console
    consoleClearBtn?.addEventListener("click", () => {
      consoleLogsContainer.innerHTML = '<div style="color: #636f88; font-style: italic;">Console log messages will print here during script runs.</div>';
      logCounts = { log: 0, warn: 0, error: 0 };
      updateConsoleCounts();
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    // Clear All Code Editors with Safety Backup & Interactive Undo
    let undoClearTimer = null;
    clearBtn?.addEventListener("click", () => {
      if (clearBtn.getAttribute("data-undo-active") === "true" && lastClearedBackup) {
        // Restore backup
        htmlInput.value = lastClearedBackup.html || "";
        cssInput.value = lastClearedBackup.css || "";
        jsInput.value = lastClearedBackup.js || "";
        lastClearedBackup = null;
        clearTimeout(undoClearTimer);
        clearBtn.removeAttribute("data-undo-active");
        clearBtn.innerText = "Clear";
        clearBtn.style.color = "";
        clearBtn.style.borderColor = "";
        updateEditorStats();
        compileSandbox();
        appInstance.showToast("Restored workspace code!", "success");
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('success');
        }
        return;
      }

      // If editors are already empty, nothing to clear
      if (!htmlInput.value && !cssInput.value && !jsInput.value) {
        appInstance.showToast("Editors are already empty", "info");
        return;
      }

      lastClearedBackup = {
        html: htmlInput.value,
        css: cssInput.value,
        js: jsInput.value
      };
      htmlInput.value = "";
      cssInput.value = "";
      jsInput.value = "";
      updateEditorStats();
      compileSandbox();

      // Turn button into interactive Undo
      clearBtn.setAttribute("data-undo-active", "true");
      clearBtn.innerText = "↩ Undo";
      clearBtn.style.color = "#34d399";
      clearBtn.style.borderColor = "rgba(52, 211, 153, 0.4)";

      clearTimeout(undoClearTimer);
      undoClearTimer = setTimeout(() => {
        clearBtn.removeAttribute("data-undo-active");
        clearBtn.innerText = "Clear";
        clearBtn.style.color = "";
        clearBtn.style.borderColor = "";
      }, 7000);

      appInstance.showToast("Cleared workspace — click 'Undo' to restore", "info");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('click');
      }
    });

    // Full HTML Document Generator (used for iframe, download, and pop-out)
    function generateFullDocument() {
      const htmlCode = htmlInput.value;
      const cssCode = cssInput.value;
      const jsCode = jsInput.value;

      let styleTags = "";
      let scriptTags = "";
      activeLibs.forEach(url => {
        if (url.endsWith(".css") || url.includes("css") || url.includes("font-awesome") || url.includes("google-fonts")) {
          styleTags += `  <link rel="stylesheet" href="${url}">\n`;
        } else {
          scriptTags += `  <script src="${url}"></script>\n`;
        }
      });

      const consoleInterceptor = `
        <script>
          (function() {
            const origLog = console.log;
            const origWarn = console.warn;
            const origError = console.error;
            
            function sendMsg(type, args) {
              const strArgs = Array.from(args).map(arg => {
                if (arg === null) return 'null';
                if (arg === undefined) return 'undefined';
                if (typeof arg === 'object') {
                  if (arg instanceof HTMLElement) {
                    return arg.outerHTML ? arg.outerHTML.slice(0, 100) : '<' + arg.tagName.toLowerCase() + '>';
                  }
                  try { return JSON.stringify(arg); } catch(e) { return String(arg); }
                }
                return String(arg);
              });
              if (window.parent && window.parent !== window) {
                window.parent.postMessage({ 
                  type: 'PLAYGROUND_CONSOLE', 
                  logType: type, 
                  content: strArgs.join(' ') 
                }, '*');
              }
            }
            
            console.log = function() {
              sendMsg('log', arguments);
              origLog.apply(console, arguments);
            };
            console.warn = function() {
              sendMsg('warn', arguments);
              origWarn.apply(console, arguments);
            };
            console.error = function() {
              sendMsg('error', arguments);
              origError.apply(console, arguments);
            };
            
            window.onerror = function(message, source, lineno, colno, error) {
              if (window.parent && window.parent !== window) {
                window.parent.postMessage({ 
                  type: 'PLAYGROUND_CONSOLE', 
                  logType: 'error', 
                  content: message + (lineno ? ' (line ' + lineno + ')' : '') 
                }, '*');
              }
              return false;
            };
          })();
        </script>
      `;

      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OmniTool Live Sandbox</title>
${styleTags}  <style>
    html, body {
      margin: 0;
      padding: 0;
      min-height: 100%;
      background-color: #0d0e12;
      color: #a9b2c3;
    }
${cssCode.split('\n').map(l => '    ' + l).join('\n')}
  </style>
  ${consoleInterceptor}
</head>
<body>
${htmlCode}
${scriptTags}  <script>
    try {
${jsCode.split('\n').map(l => '      ' + l).join('\n')}
    } catch (err) {
      console.error(err.message);
    }
  </script>
</body>
</html>`;
    }

    // Rebuild and load sandbox iframe
    function compileSandbox() {
      const sourceCode = generateFullDocument();
      if (currentSandboxUrl) {
        URL.revokeObjectURL(currentSandboxUrl);
      }
      const blob = new Blob([sourceCode], { type: "text/html" });
      currentSandboxUrl = URL.createObjectURL(blob);
      if (sandboxFrame) {
        sandboxFrame.src = currentSandboxUrl;
      }
    }

    // Debounced Auto-run trigger
    const triggerAutorun = () => {
      updateEditorStats();
      const isAutorun = chkAutorun.checked;
      if (!isAutorun) return;

      clearTimeout(autorunTimeout);
      autorunTimeout = setTimeout(() => {
        compileSandbox();
      }, 550);
    };

    htmlInput.addEventListener("input", triggerAutorun);
    cssInput.addEventListener("input", triggerAutorun);
    jsInput.addEventListener("input", triggerAutorun);

    // Run Code Button handler
    runBtn?.addEventListener("click", () => {
      updateEditorStats();
      compileSandbox();
      appInstance.showToast("Rebuilt sandbox preview", "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    });

    // Pop-out in New Window / Tab
    openWindowBtn?.addEventListener("click", () => {
      const fullDoc = generateFullDocument();
      const newWin = window.open("", "_blank");
      if (newWin) {
        newWin.document.open();
        newWin.document.write(fullDoc);
        newWin.document.close();
        appInstance.showToast("Opened sandbox preview in new tab", "info");
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('click');
        }
      } else {
        appInstance.showToast("Pop-up window blocked. Please permit pop-ups for this site.", "warn");
      }
    });

    // Download standalone HTML file
    downloadBtn?.addEventListener("click", () => {
      const fileContent = generateFullDocument();
      const blob = new Blob([fileContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "omnitool-playground.html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      appInstance.showToast("Downloaded standalone HTML file", "success");
      if (typeof appInstance.playSynthSound === 'function') {
        appInstance.playSynthSound('success');
      }
    });

    // Smart Indentation Ergonomics (Tab, Shift+Tab, and Auto-Indent on Enter)
    const enableSmartKeyboardErgonomics = (textarea) => {
      textarea.addEventListener("keydown", (e) => {
        // Tab Indentation
        if (e.key === "Tab") {
          e.preventDefault();
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const value = textarea.value;

          if (e.shiftKey) {
            const lineStart = value.lastIndexOf('\n', start - 1) + 1;
            if (value.substring(lineStart, lineStart + 2) === "  ") {
              textarea.value = value.substring(0, lineStart) + value.substring(lineStart + 2);
              textarea.selectionStart = Math.max(lineStart, start - 2);
              textarea.selectionEnd = Math.max(lineStart, end - 2);
              textarea.dispatchEvent(new Event("input"));
            }
          } else {
            textarea.value = value.substring(0, start) + "  " + value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 2;
            textarea.dispatchEvent(new Event("input"));
          }
          return;
        }

        // Auto-Indent Preservation on Enter
        if (e.key === "Enter") {
          const start = textarea.selectionStart;
          const value = textarea.value;
          const lineStart = value.lastIndexOf('\n', start - 1) + 1;
          const currentLine = value.substring(lineStart, start);
          const indentMatch = currentLine.match(/^\s+/);
          const indent = indentMatch ? indentMatch[0] : '';
          
          if (indent || currentLine.trim().endsWith('{')) {
            e.preventDefault();
            const extraIndent = currentLine.trim().endsWith('{') ? '  ' : '';
            const insertion = '\n' + indent + extraIndent;
            textarea.value = value.substring(0, start) + insertion + value.substring(textarea.selectionEnd);
            textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
            textarea.dispatchEvent(new Event("input"));
          }
        }
      });
    };

    enableSmartKeyboardErgonomics(htmlInput);
    enableSmartKeyboardErgonomics(cssInput);
    enableSmartKeyboardErgonomics(jsInput);

    // Support Ctrl+Enter keyboard shortcuts inside textareas to compile manually
    const handleKeyboardShortcut = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault();
        compileSandbox();
        appInstance.showToast("Rebuilt sandbox preview (Shortcut)", "success");
        if (typeof appInstance.playSynthSound === 'function') {
          appInstance.playSynthSound('success');
        }
      }
    };

    htmlInput.addEventListener("keydown", handleKeyboardShortcut);
    cssInput.addEventListener("keydown", handleKeyboardShortcut);
    jsInput.addEventListener("keydown", handleKeyboardShortcut);

    // Listen for log messages from inside the sandboxed iframe
    const messageListener = (e) => {
      if (e.data && e.data.type === "PLAYGROUND_CONSOLE") {
        appendConsoleLog(e.data.logType, e.data.content);
      }
    };
    window.addEventListener("message", messageListener);

    // Cleanup on DOM removal
    container.addEventListener("DOMNodeRemovedFromDocument", () => {
      window.removeEventListener("message", messageListener);
      if (currentSandboxUrl) {
        URL.revokeObjectURL(currentSandboxUrl);
      }
    });

    // Try Example presets in bottom guide card
    container.querySelector("#play-guide-load-sample")?.addEventListener("click", () => {
      const templateKeys = ["helloWorld", "counterApp", "glowButton", "digitalClock"];
      const chosenKey = templateKeys[activeExampleIndex] || "helloWorld";
      loadTemplate(chosenKey);
      if (templateSelect) templateSelect.value = chosenKey;
    });

    // Initialize with Hello World beginner starter template & set default view mode
    loadTemplate("helloWorld", false);
    setViewMode("all");
    renderActiveLibs();
    compileSandbox();
  }
};
