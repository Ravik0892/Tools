@echo off
title OmniTool Hub - Push Active Branch to GitHub
cd /d "%~dp0.."

echo ==========================================================
echo        OmniTool Hub - Direct Remote Push
echo ==========================================================
echo.

:: Detect active git branch
for /f "tokens=*" %%i in ('git branch --show-current 2^>nul') do set CURRENT_BRANCH=%%i
if "%CURRENT_BRANCH%"=="" set CURRENT_BRANCH=main

echo Active branch detected: %CURRENT_BRANCH%
echo Pushing local commits to origin/%CURRENT_BRANCH%...
echo.

git push origin %CURRENT_BRANCH%
if %ERRORLEVEL% equ 0 (
    echo.
    echo [SUCCESS] Successfully pushed commits to GitHub (%CURRENT_BRANCH%)!
) else (
    echo.
    echo [ERROR] Push failed. Check your internet connection or GitHub credentials.
)

echo.
pause
