import { writeFileSync, existsSync, copyFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve, join } from "node:path";

/**
 * Serverless & Local Handler: POST /api/deploy-live
 * Saves global configuration to ad-config.json, commits, and pushes to live repository (GitHub / Vercel).
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
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const configData = body.config;
    const commitMsg = body.commitMessage || "chore(config): update live site settings via Admin Panel";
    const pushToLive = body.pushToLive !== false;
    const deployHookUrl = body.deployHookUrl || "";

    if (!configData || typeof configData !== "object") {
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

    // 3. Git Commit and Push to trigger live Vercel deployment
    if (pushToLive) {
      try {
        // Stage config files
        execSync(`git add "ad-config.json"`, { cwd: projectRoot, stdio: "pipe" });
        if (existsSync(androidConfigPath)) {
          execSync(`git add "omnitool-android-app/app/src/main/assets/web/ad-config.json"`, { cwd: projectRoot, stdio: "pipe" });
        }

        // Commit changes
        try {
          const commitOut = execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd: projectRoot, stdio: "pipe" }).toString();
          gitOutput += commitOut + "\n";
        } catch (commitErr) {
          // If no changes staged, continue
          gitOutput += "No changes detected or already committed.\n";
        }

        // Detect current branch
        let currentBranch = "main";
        try {
          currentBranch = execSync("git rev-parse --abbrev-ref HEAD", { cwd: projectRoot, stdio: "pipe" }).toString().trim();
        } catch (_) {}

        // Push current branch to origin
        const pushOut = execSync(`git push origin ${currentBranch}`, { cwd: projectRoot, stdio: "pipe" }).toString();
        gitOutput += pushOut + "\n";
        gitPushed = true;

        // If on dev (or any non-main branch), safely update ONLY ad-config.json on main WITHOUT merging other website code
        if (currentBranch !== "main") {
          try {
            // Check if there are uncommitted working files and stash them safely
            let hasStash = false;
            try {
              const statusCheck = execSync("git status --porcelain", { cwd: projectRoot, stdio: "pipe" }).toString().trim();
              if (statusCheck) {
                execSync("git stash push -u -m 'omnitool-deploy-temp-stash'", { cwd: projectRoot, stdio: "pipe" });
                hasStash = true;
              }
            } catch (_) {}

            // Switch to main branch
            execSync("git checkout main", { cwd: projectRoot, stdio: "pipe" });

            // Extract ONLY ad-config.json from the active working branch into main
            execSync(`git checkout ${currentBranch} -- "ad-config.json"`, { cwd: projectRoot, stdio: "pipe" });
            if (existsSync(androidConfigPath)) {
              try {
                execSync(`git checkout ${currentBranch} -- "omnitool-android-app/app/src/main/assets/web/ad-config.json"`, { cwd: projectRoot, stdio: "pipe" });
              } catch (_) {}
            }

            // Commit ONLY ad-config.json on main
            try {
              execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd: projectRoot, stdio: "pipe" });
            } catch (_) {
              // No changes to commit on main
            }

            // Push main branch so Vercel live production deploys the updated ad-config.json
            const mainPush = execSync("git push origin main", { cwd: projectRoot, stdio: "pipe" }).toString();
            gitOutput += mainPush + "\n";
            gitOutput += "Production live site (main branch) updated with ad-config.json ONLY (website code untouched)!\n";

            // Return to working branch
            execSync(`git checkout ${currentBranch}`, { cwd: projectRoot, stdio: "pipe" });

            // Restore any stashed working files
            if (hasStash) {
              try {
                execSync("git stash pop", { cwd: projectRoot, stdio: "pipe" });
              } catch (_) {}
            }
          } catch (mainErr) {
            gitOutput += `Notice: Main branch config sync notice: ${mainErr.message}\n`;
            try { execSync(`git checkout ${currentBranch}`, { cwd: projectRoot, stdio: "pipe" }); } catch (_) {}
          }
        }
      } catch (gitErr) {
        console.warn("[Deploy] Git sync notice:", gitErr.message);
        gitOutput += `Git sync: ${gitErr.message}\n`;
      }
    }

    // 4. Ping Vercel Deploy Hook if provided
    let hookTriggered = false;
    if (deployHookUrl && deployHookUrl.startsWith("http")) {
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
