const [, , port = "9223", targetUrl = ""] = process.argv;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(path) {
  const response = await fetch(`http://127.0.0.1:${port}${path}`);
  if (!response.ok) {
    throw new Error(`DevTools ${path} returned ${response.status}`);
  }
  return response.json();
}

async function waitForPage() {
  for (let i = 0; i < 40; i += 1) {
    try {
      const pages = await getJson("/json/list");
      const page = pages.find((entry) => entry.type === "page");
      if (page?.webSocketDebuggerUrl) return page;
    } catch {
      // Chrome may still be starting.
    }
    await sleep(250);
  }
  throw new Error("Timed out waiting for Chrome DevTools page");
}

function createCdpClient(url) {
  const socket = new WebSocket(url);
  let nextId = 1;
  const pending = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) {
      reject(new Error(message.error.message));
    } else {
      resolve(message.result);
    }
  });

  return new Promise((resolve, reject) => {
    socket.addEventListener("open", () => {
      resolve({
        send(method, params = {}) {
          const id = nextId;
          nextId += 1;
          socket.send(JSON.stringify({ id, method, params }));
          return new Promise((innerResolve, innerReject) => {
            const timer = setTimeout(() => {
              pending.delete(id);
              innerReject(new Error(`Timed out waiting for ${method}`));
            }, 5000);
            pending.set(id, {
              resolve: (value) => {
                clearTimeout(timer);
                innerResolve(value);
              },
              reject: (error) => {
                clearTimeout(timer);
                innerReject(error);
              }
            });
          });
        },
        close() {
          socket.close();
        }
      });
    });
    socket.addEventListener("error", reject);
  });
}

const page = await waitForPage();
const cdp = await createCdpClient(page.webSocketDebuggerUrl);

await cdp.send("Runtime.enable");
await cdp.send("Page.enable");
await cdp.send("Page.addScriptToEvaluateOnNewDocument", {
  source: `
    window.__omniHashTrace = [location.href];
    window.__omniConsole = [];
    for (const level of ["error", "warn", "log"]) {
      const original = console[level].bind(console);
      console[level] = (...args) => {
        window.__omniConsole.push({ level, args: args.map((arg) => {
          if (arg instanceof Error) return arg.stack || arg.message;
          if (typeof arg === "object") {
            try { return JSON.stringify(arg); } catch { return String(arg); }
          }
          return String(arg);
        }) });
        original(...args);
      };
    }
    window.addEventListener("error", (event) => {
      window.__omniConsole.push({ level: "error", args: [event.message, event.error?.stack || ""] });
    });
    window.addEventListener("unhandledrejection", (event) => {
      window.__omniConsole.push({ level: "error", args: ["unhandledrejection", event.reason?.stack || String(event.reason)] });
    });
    window.addEventListener("hashchange", () => {
      window.__omniHashTrace.push(location.href);
    });
  `
});
if (targetUrl) {
  await cdp.send("Page.navigate", { url: targetUrl });
  await cdp.send("Page.loadEventFired").catch(() => {});
}
await cdp.send("Runtime.evaluate", {
  expression: "new Promise(resolve => setTimeout(resolve, 2500))",
  awaitPromise: true
});

await cdp.send("Runtime.evaluate", {
  awaitPromise: true,
  expression: `(() => {
    const input = document.querySelector("#seo-file-input");
    if (!input) return false;
    const bytes = new Uint8Array([137,80,78,71,13,10,26,10]);
    const file = new File([bytes], "seo-test.png", { type: "image/png" });
    const transfer = new DataTransfer();
    transfer.items.add(file);
    input.files = transfer.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return new Promise(resolve => setTimeout(() => resolve(true), 500));
  })()`
}).catch(() => {});

const result = await cdp.send("Runtime.evaluate", {
  awaitPromise: true,
  returnByValue: true,
  expression: `(() => {
    const active = document.querySelector("#active-tool-viewport");
    const svgPreview = document.querySelector("#svg-preview-container");
    const svgTarget = document.querySelector(".svg-animated-preview-target");
    const svgPath = document.querySelector(".svg-animated-preview-target path");
    const seoUpload = document.querySelector("#seo-upload-preview");
    const seoButton = document.querySelector("#seo-file-btn");
    const fbImg = document.querySelector("#fb-img-mock");
    const fbMock = document.querySelector("#mock-facebook");
    const fileStatus = document.querySelector("#seo-file-status");
    return {
      url: location.href,
      hashTrace: window.__omniHashTrace || [],
      console: (window.__omniConsole || []).filter((entry) => entry.level !== "log").concat((window.__omniConsole || []).slice(0, 8)),
      hash: location.hash,
      title: document.querySelector("#header-view-title")?.textContent || "",
      activeDisplay: active ? getComputedStyle(active).display : null,
      activeText: active?.textContent?.slice(0, 240) || "",
      svgPreviewExists: Boolean(svgPreview),
      svgTargetExists: Boolean(svgTarget),
      svgAnimationStyle: svgTarget ? getComputedStyle(svgTarget).animationName : "",
      svgPathAnimationStyle: svgPath ? getComputedStyle(svgPath).animationName : "",
      svgPreviewHtml: svgPreview?.innerHTML?.slice(0, 240) || "",
      seoUploadExists: Boolean(seoUpload),
      seoButtonExists: Boolean(seoButton),
      seoUploadDisplay: seoUpload ? getComputedStyle(seoUpload).display : null,
      seoFileStatus: fileStatus?.textContent || "",
      seoFbDisplay: fbMock ? getComputedStyle(fbMock).display : null,
      seoFbImgSrc: fbImg?.getAttribute("src") || ""
    };
  })()`
});

console.log(JSON.stringify(result.result.value, null, 2));
cdp.close();
setTimeout(() => process.exit(0), 100);
