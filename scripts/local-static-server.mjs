import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = process.cwd();
const port = Number(process.argv[2] || 8000);
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json"
};

createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.writeHead(200).end();
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);

  // Dispatch /api/* to serverless functions
  if (pathname.startsWith("/api/")) {
    const endpoint = pathname.replace(/^\/api\//, "").replace(/\.js$/, "");
    const apiPath = join(root, "api", `${endpoint}.js`);
    if (existsSync(apiPath)) {
      let bodyData = "";
      req.on("data", chunk => { bodyData += chunk; });
      req.on("end", async () => {
        try {
          req.body = bodyData ? JSON.parse(bodyData) : {};
        } catch {
          req.body = bodyData;
        }

        // Response helpers for Vercel Serverless Function compatibility
        res.status = function(code) { this.statusCode = code; return this; };
        res.json = function(data) {
          this.setHeader("Content-Type", "application/json; charset=utf-8");
          this.end(JSON.stringify(data));
        };

        try {
          const mod = await import(`file://${apiPath.replace(/\\/g, "/")}?t=${Date.now()}`);
          if (typeof mod.default === "function") {
            await mod.default(req, res);
          } else {
            res.status(500).json({ error: "API handler is not a function" });
          }
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      });
      return;
    } else {
      res.writeHead(404, { "Content-Type": "application/json" }).end(JSON.stringify({ error: "API endpoint not found" }));
      return;
    }
  }

  if (pathname === "/") pathname = "/index.html";
  if (pathname === "/landing" || pathname === "/landing/" || pathname === "/welcome" || pathname === "/showcase") {
    pathname = "/landing.html";
  }

  const resolved = normalize(join(root, pathname));
  if (!resolved.startsWith(root)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  const filePath = existsSync(resolved) && statSync(resolved).isFile() ? resolved : join(root, "index.html");
  res.writeHead(200, {
    "Content-Type": types[extname(filePath).toLowerCase()] || "application/octet-stream",
    "Cache-Control": "no-store"
  });
  createReadStream(filePath).pipe(res);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}/`);
});
