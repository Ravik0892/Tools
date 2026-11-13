import { writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { verifySignedToken, isProductionRuntime } from "./_security.js";

/**
 * Local Dev Admin Handler: POST /api/deploy-live
 * Saves global configuration to ad-config.json, commits, and pushes to live repository.
 * Strictly requires valid Administrator Bearer token and uses shell-free execFileSync.
 */
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
    return;
  }

  try {
    // Enforce administrator token verification
    const authHeader = req.headers?.authorization || "";
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      res.status(401).json({ success: false, error: "Missing admin authorization token." });
      return;
    }

    const verification = verifySignedToken(token);
    if (!verification.valid || verification.payload?.role !== "admin") {
      res.status(403).json({ success: false, error: "Unauthorized. Valid administrator session required." });
      return;
    }

    if (isProductionRuntime()) {
      res.status(501).json({
        success: false,
        error: "Remote git deployments are disabled in serverless production environments."
      });
      return;
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const configData = body.config;
    const rawCommitMsg = String(body.commitMessage || "chore(config): update live site settings via Admin Panel");
    const safeCommitMsg = rawCommitMsg.replace(/[\r\n\x00-\x1f\x7f]/g, " ").trim().slice(0, 200) || "chore(config): update settings";
    const pushToLive = body.pushToLive !== false;
    const deployHookUrl = typeof body.deployHookUrl === "string" ? body.deployHookUrl.trim() : "";

    if (!configData || typeof configData !== "object" || Array.isArray(configData)) {
      res.status(400).json({ success: false, error: "Configuration object required in 'config' property." });
      return;
    }

    const projectRoot = process.cwd();
    const configPath = resolve(projectRoot, "ad-config.json");
    const jsonString = JSON.stringify(configData, null, 2);

    // 1. Write ad-config.json to project root
    writeFileSync(configPath, jsonString, "utf8");

    // 2. Synchronize to Android assets copy if folder exists
    const androidConfigPath = resolve(projectRoot, "omnitool-android-app", "app", "src", "main", "assets", "web", "ad-config.json");
    if (existsSync(resolve(projectRoot, "omnitool-android-app", "app", "src", "main", "assets", "web"))) {
      try {
        writeFileSync(androidConfigPath, jsonString, "utf8");
      } catch (err) {
        console.warn("[Deploy] Notice: Could not sync android config:", err.message);
      }
    }

    let gitOutput = "";
    let gitPushed = false;

    const runGit = (args) => execFileSync("git", args, { cwd: projectRoot, stdio: "pipe" }).toString();

    // 3. Git Commit and Push using argument arrays (zero shell interpolation)
    if (pushToLive) {
      try {
        runGit(["add", "ad-config.json"]);
        if (existsSync(androidConfigPath)) {
          runGit(["add", "omnitool-android-app/app/src/main/assets/web/ad-config.json"]);
        }

        try {
          gitOutput += runGit(["commit", "-m", safeCommitMsg]) + "\n";
        } catch (_) {
          gitOutput += "No changes detected or already committed.\n";
        }

        let currentBranch = "main";
        try {
          const detected = runGit(["rev-parse", "--abbrev-ref", "HEAD"]).trim();
          if (/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(detected)) {
            currentBranch = detected;
          }
        } catch (_) {}

        gitOutput += runGit(["push", "origin", currentBranch]) + "\n";
        gitPushed = true;

        if (currentBranch !== "main") {
          try {
            let hasStash = false;
            try {
              const statusCheck = runGit(["status", "--porcelain"]).trim();
              if (statusCheck) {
                runGit(["stash", "push", "-u", "-m", "omnitool-deploy-temp-stash"]);
                hasStash = true;
              }
            } catch (_) {}

            runGit(["checkout", "main"]);
            runGit(["checkout", currentBranch, "--", "ad-config.json"]);
            if (existsSync(androidConfigPath)) {
              try {
                runGit(["checkout", currentBranch, "--", "omnitool-android-app/app/src/main/assets/web/ad-config.json"]);
              } catch (_) {}
            }

            try {
              runGit(["commit", "-m", safeCommitMsg]);
            } catch (_) {}

            gitOutput += runGit(["push", "origin", "main"]) + "\n";
            gitOutput += "Production live site (main branch) updated with ad-config.json ONLY (website code untouched)!\n";

            runGit(["checkout", currentBranch]);

            if (hasStash) {
              try {
                runGit(["stash", "pop"]);
              } catch (_) {}
            }
          } catch (mainErr) {
            gitOutput += `Notice: Main branch config sync notice: ${mainErr.message}\n`;
            try { runGit(["checkout", currentBranch]); } catch (_) {}
          }
        }
      } catch (gitErr) {
        console.warn("[Deploy] Git sync notice:", gitErr.message);
        gitOutput += `Git sync: ${gitErr.message}\n`;
      }
    }

    // 4. Ping validated Vercel Deploy Hook only (prevents SSRF)
    let hookTriggered = false;
    if (deployHookUrl && /^https:\/\/api\.vercel\.com\/v\d+\/integrations\/deploy\/[A-Za-z0-9/_-]+$/.test(deployHookUrl)) {
      try {
        await fetch(deployHookUrl, { method: "POST" });
        hookTriggered = true;
      } catch (hErr) {
        console.warn("[Deploy] Deploy hook ping error:", hErr.message);
      }
    }

    res.status(200).json({
      success: true,
      message: gitPushed
        ? "🚀 Settings saved to ad-config.json and published to Live Website!"
        : "✅ Settings saved locally to ad-config.json.",
      savedFile: "ad-config.json",
      gitPushed,
      hookTriggered,
      gitOutput: gitOutput.trim(),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("[Deploy] Error:", err);
    res.status(500).json({ success: false, error: err.message || "Failed to deploy configuration." });
  }
}
