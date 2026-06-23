@echo off
title Commit + Merge Dev to Main and Push to GitHub
color 0A

echo.
echo  ╔══════════════════════════════════════════════╗
echo  ║        OmniTool Hub - Auto Merge Script      ║
echo  ║     Commit + Merge DEV → MAIN + Push         ║
echo  ╚══════════════════════════════════════════════╝
echo.

:: Go to the project root folder (one folder up from this .bat file)
cd /d "%~dp0.."

:: ── STEP 1: Ask for a commit message ─────────────────────────────────────────
echo  [1/8] Enter your commit message below:
echo  (Example: feat: added dark mode toggle)
echo.
set /p COMMIT_MSG=  ^>^> 
echo.

if "%COMMIT_MSG%"=="" (
    echo  [WARN] No message entered. Using default message.
    set COMMIT_MSG=chore: update project files
)

:: ── STEP 2: Stage all changes ────────────────────────────────────────────────
echo  [2/8] Staging all changes (git add .)...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] git add failed!
    goto :error
)
echo  Done.

:: ── STEP 3: Commit ───────────────────────────────────────────────────────────
echo.
echo  [3/8] Committing with message: "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"
if %ERRORLEVEL% NEQ 0 (
    echo  [WARN] Nothing new to commit, or commit failed. Continuing...
)

:: ── STEP 4: Push dev to remote ───────────────────────────────────────────────
echo.
echo  [4/8] Pushing dev branch to GitHub...
git push origin dev
if %ERRORLEVEL% NEQ 0 (
    echo  [WARN] Push to dev failed or nothing to push. Continuing...
)

:: ── STEP 5: Switch to main ───────────────────────────────────────────────────
echo.
echo  [5/8] Switching to main branch...
git checkout main
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Could not switch to main branch!
    goto :error
)

:: ── STEP 6: Pull latest main ─────────────────────────────────────────────────
echo.
echo  [6/8] Pulling latest main from GitHub...
git pull origin main
if %ERRORLEVEL% NEQ 0 (
    echo  [WARN] Pull failed or nothing to pull. Continuing...
)

:: ── STEP 7: Merge dev → main ─────────────────────────────────────────────────
echo.
echo  [7/8] Merging dev into main...
git merge dev --no-ff -m "merge: sync dev into main [auto-merge]"
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo  [ERROR] Merge failed! There may be conflicts to resolve manually.
    echo  Run: git status  to see conflicted files.
    goto :error
)

:: ── STEP 8: Push main to GitHub ──────────────────────────────────────────────
echo.
echo  [8/8] Pushing main to GitHub...
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo  [ERROR] Push failed! Check your internet or GitHub credentials.
    goto :error
)

:: ── Switch back to dev ───────────────────────────────────────────────────────
git checkout dev

echo.
echo  ╔══════════════════════════════════════════════╗
echo  ║  SUCCESS! Committed, merged and pushed!      ║
echo  ║  You are back on the DEV branch.             ║
echo  ╚══════════════════════════════════════════════╝
echo.
echo  GitHub: https://github.com/Ravik0892/Tools
echo.
goto :done

:error
echo.
echo  ╔══════════════════════════════════════════════╗
echo  ║   FAILED! Something went wrong (see above)  ║
echo  ╚══════════════════════════════════════════════╝
echo.
echo  [INFO] Returning you to the DEV branch to restore your files...
git checkout dev
echo.

:done
pause
