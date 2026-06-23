@echo off
cd /d "f:\Tools website"
echo === Initializing git (if needed) ===
git init
echo.
echo === Staging all files ===
git add .
echo.
echo === Creating initial commit ===
git commit -m "Initial commit: OmniTool Hub v2 - Modular ES Module Architecture"
echo.
echo === Adding remote origin ===
git remote add origin https://github.com/Ravik0892/Tools.git
echo.
echo === Renaming branch to main ===
git branch -M main
echo.
echo === Pushing to GitHub ===
git push -u origin main
echo.
echo === Done! ===
pause
