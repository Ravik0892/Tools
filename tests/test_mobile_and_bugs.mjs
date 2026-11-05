import { spawn } from 'child_process';
import http from 'http';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const BASE_URL = "http://127.0.0.1:8000";

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(new Error(`Failed parsing JSON from ${url}: ${data}`)); }
      });
    }).on('error', reject);
  });
}

class CdpSession {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.callbacks = new Map();
    this.events = [];
    this.consoleLogs = [];
    this.exceptions = [];

    this.ready = new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.id && this.callbacks.has(data.id)) {
        const { resolve, reject } = this.callbacks.get(data.id);
        this.callbacks.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      } else if (data.method) {
        if (data.method === 'Runtime.consoleAPICalled') {
          this.consoleLogs.push(data.params);
        } else if (data.method === 'Runtime.exceptionThrown') {
          this.exceptions.push(data.params);
        }
      }
    };
  }

  async send(method, params = {}) {
    await this.ready;
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.text || JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  }
}

async function main() {
  console.log("=== STARTING REAL-BROWSER MOBILE & CROSS-DEVICE AUDIT ===");
  const userDataDir = "C:\\Users\\DELL\\AppData\\Local\\Temp\\chrome-test-profile-" + Date.now();
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    `--user-data-dir=${userDataDir}`,
    BASE_URL
  ]);

  let targets;
  for (let i = 0; i < 30; i++) {
    await wait(300);
    try {
      targets = await getJson(`http://127.0.0.1:${PORT}/json/list`);
      if (Array.isArray(targets) && targets.length > 0 && targets[0].webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  if (!targets || targets.length === 0) {
    console.error("Failed to connect to headless Chrome targets.");
    chrome.kill();
    process.exit(1);
  }

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const cdp = new CdpSession(pageTarget.webSocketDebuggerUrl);
  await cdp.ready;

  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await wait(2000);

  const errors = [];

  // Helper to test viewport
  async function testDevice(name, width, height, isMobile = true) {
    console.log(`\n--- Testing Device: ${name} (${width}x${height}) ---`);
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: isMobile ? 3 : 1,
      mobile: isMobile
    });
    await wait(400);

    // Check for horizontal overflow
    const overflow = await cdp.eval(`(() => {
      const docW = document.documentElement.offsetWidth;
      const scrollW = document.documentElement.scrollWidth;
      const bodyScrollW = document.body.scrollWidth;
      const maxScroll = Math.max(scrollW, bodyScrollW);
      const isOverflowing = maxScroll > window.innerWidth;
      
      let offending = [];
      document.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth + 2) {
          offending.push({ tag: el.tagName, id: el.id, className: el.className, right: rect.right, width: rect.width });
        }
      });
      return { isOverflowing, windowW: window.innerWidth, docW, maxScroll, offendingCount: offending.length, topOffenders: offending.slice(0, 5) };
    })()`);

    if (overflow.isOverflowing) {
      console.warn(`[WARN: OVERFLOW] ${name}: Page width ${overflow.maxScroll}px exceeds viewport ${overflow.windowW}px by ${overflow.maxScroll - overflow.windowW}px!`);
      if (overflow.topOffenders.length > 0) {
        console.warn(`  Offenders:`, overflow.topOffenders);
      }
      errors.push({ device: name, issue: "Horizontal overflow", details: overflow });
    } else {
      console.log(`[PASS] No horizontal scroll leak on ${name} (${overflow.windowW}px).`);
    }

    return overflow;
  }

  // Test across device sizes
  await testDevice("iPhone SE (Compact Mobile)", 375, 667, true);
  await testDevice("iPhone 14 / Pixel 7 (Standard Mobile)", 390, 844, true);
  await testDevice("iPad Mini / Tablet Portrait", 768, 1024, true);
  await testDevice("iPad Pro / Tablet Landscape", 1024, 1366, true);
  await testDevice("MacBook / Laptop Desktop", 1280, 800, false);
  await testDevice("High-Res Desktop", 1920, 1080, false);

  // Test 2: Mobile Navigation Drawer (Hamburger button)
  console.log("\n--- Testing Mobile Hamburger Drawer Interaction ---");
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 375, height: 667, deviceScaleFactor: 3, mobile: true });
  await wait(300);

  const drawerTest = await cdp.eval(`(() => {
    const hamburger = document.getElementById("sidebar-open-btn");
    const sidebar = document.getElementById("app-sidebar");
    if (!hamburger) return { error: "Hamburger button #sidebar-open-btn not found" };
    if (!sidebar) return { error: "Sidebar #app-sidebar not found" };

    const initialVisible = window.getComputedStyle(hamburger).display !== "none";
    hamburger.click();
    const hasShowClass = sidebar.classList.contains("show");
    const sidebarStyle = window.getComputedStyle(sidebar);
    
    // Check close button
    const closeBtn = document.getElementById("sidebar-close-btn");
    if (closeBtn) closeBtn.click();
    const closedAfterClick = !sidebar.classList.contains("show");

    return {
      hamburgerVisible: initialVisible,
      openedOnHamburgerClick: hasShowClass,
      sidebarPosition: sidebarStyle.position,
      sidebarTransform: sidebarStyle.transform,
      closedAfterClick
    };
  })()`);

  console.log("Mobile Drawer Test Result:", drawerTest);
  if (!drawerTest.hamburgerVisible) {
    errors.push({ issue: "Hamburger button hidden on mobile 375px" });
  }

  // Test 3: Test loading different tools on mobile
  const toolsToTest = ["calculator", "formatter-suite", "jwt-decoder", "crypto-suite", "markdown-preview", "qr-studio", "admin-settings"];
  console.log(`\n--- Testing ${toolsToTest.length} Tools UI Mounting on Mobile (375px) ---`);

  for (const toolId of toolsToTest) {
    const res = await cdp.eval(`(async () => {
      try {
        await app.navigateToTool("${toolId}", false);
        await new Promise(r => setTimeout(r, 400));
        const viewport = document.getElementById("active-tool-viewport");
        const visible = viewport && window.getComputedStyle(viewport).display !== "none";
        
        // Check for horizontal overflow inside tool
        const isOverflow = viewport.scrollWidth > window.innerWidth;
        let toolOffenders = [];
        if (isOverflow) {
          viewport.querySelectorAll('*').forEach(el => {
            const r = el.getBoundingClientRect();
            if (r.right > window.innerWidth + 1) {
              toolOffenders.push({ tag: el.tagName, id: el.id, className: el.className, right: Math.round(r.right), width: Math.round(r.width) });
            }
          });
        }
        const panels = Array.from(viewport.querySelectorAll(".tool-panel:not(.tool-guide-card)"));
        const panelVisibility = panels.map((p, i) => {
          const s = window.getComputedStyle(p);
          return { index: i, display: s.display, transform: s.transform, position: s.position, width: s.width };
        });

        return { success: true, toolId: "${toolId}", visible, isOverflow, toolOffenders, panelVisibility };
      } catch (e) {
        return { success: false, toolId: "${toolId}", error: e.message };
      }
    })()`);

    if (!res.success) {
      console.error(`[FAIL] ${toolId} failed to mount:`, res.error);
      errors.push({ tool: toolId, error: res.error });
    } else {
      console.log(`[PASS] ${toolId} mounted successfully on mobile. Overflow: ${res.isOverflow}`);
      if (res.toolOffenders && res.toolOffenders.length > 0) {
        console.warn(`  Tool Overflow Elements:`, res.toolOffenders);
      }
      if (res.panelVisibility.length > 0) {
        console.log(`  Panels:`, res.panelVisibility);
      }
    }
  }

  // Return to dashboard
  await cdp.eval(`app.backToDashboard(false)`);
  await wait(300);

  // Test 4: Modals (Command Palette & Checkout)
  console.log("\n--- Testing Modals on Mobile ---");
  const modalTest = await cdp.eval(`(() => {
    // Test Command Palette
    app.toggleCommandPalette(true);
    const cpModal = document.getElementById("command-palette");
    const cpVisible = cpModal && cpModal.style.display !== "none";
    app.toggleCommandPalette(false);

    // Test Checkout Modal
    app.openCheckout("lifetime");
    const chkModal = document.getElementById("checkout-modal");
    const chkVisible = chkModal && chkModal.style.display !== "none";
    const chkContent = chkModal.querySelector(".checkout-modal-content");
    const chkOverflow = chkContent ? (chkContent.scrollWidth > window.innerWidth) : false;
    
    let widerElements = [];
    if (chkModal) {
      chkModal.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth + 1) {
          widerElements.push({
            tag: el.tagName,
            id: el.id,
            className: typeof el.className === 'string' ? el.className : '',
            right: Math.round(rect.right),
            width: Math.round(rect.width)
          });
        }
      });
    }

    app.closeCheckout();

    return { cpVisible, chkVisible, chkOverflow, scrollW: chkContent?.scrollWidth, winW: window.innerWidth, widerElements };
  })()`);
  console.log("Modal Test Result:", JSON.stringify(modalTest, null, 2));

  // Check collected runtime exceptions and console errors
  console.log("\n--- Browser Console Errors & Exceptions Audit ---");
  const realErrors = cdp.consoleLogs.filter(log => log.type === 'error');
  if (cdp.exceptions.length > 0) {
    console.error(`[ERRORS DETECTED] ${cdp.exceptions.length} unhandled JS exceptions thrown in browser:`);
    cdp.exceptions.forEach(ex => console.error(" ", ex.exception?.description || ex.text));
    errors.push(...cdp.exceptions);
  } else {
    console.log("[PASS] 0 unhandled JavaScript exceptions in browser.");
  }

  if (realErrors.length > 0) {
    console.warn(`[CONSOLE ERRORS] ${realErrors.length} console.error calls:`);
    realErrors.forEach(err => console.warn(" ", err.args?.map(a => a.value || a.description).join(" ")));
  } else {
    console.log("[PASS] 0 console.error calls detected.");
  }

  console.log("\n==========================================");
  console.log(`AUDIT FINISHED. Total Issues Flagged: ${errors.length}`);
  console.log("==========================================");

  // Cleanup
  try {
    cdp.ws.close();
    chrome.kill();
  } catch (e) {}

  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch(err => {
  console.error("Audit runner failed:", err);
  process.exit(1);
});
