@echo off
title OmniTool Hub - Local Development Server
cd /d "%~dp0"

echo ==========================================================
echo           OmniTool Hub - Local Server Launcher
echo ==========================================================
echo.
echo Checking runtime environment...

:: Check if Node.js is available
where node >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Node.js detected! Starting local static server on port 8000...
    echo.
    echo Server URL: http://127.0.0.1:8000
    echo.
    echo Opening browser...
    timeout /t 1 /nobreak >nul
    start http://127.0.0.1:8000
    echo Press Ctrl+C in this window anytime to stop the server.
    echo ----------------------------------------------------------
    node scripts\local-static-server.mjs 8000
    goto :end
)

:: Check if Python is available
where python >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Python detected! Starting HTTP server on port 8000...
    echo.
    echo Server URL: http://127.0.0.1:8000
    echo.
    echo Opening browser...
    timeout /t 1 /nobreak >nul
    start http://127.0.0.1:8000
    echo Press Ctrl+C in this window anytime to stop the server.
    echo ----------------------------------------------------------
    python scripts\local-server.py 8000
    goto :end
)

:: Neither found
echo [ERROR] Neither Node.js nor Python was found on your system PATH!
echo.
echo To run OmniTool Hub locally without CORS restrictions:
echo 1. Install Node.js from https://nodejs.org/ (LTS recommended)
echo 2. OR Install Python from https://www.python.org/
echo.
echo After installing, double-click START_SERVER.bat again.
echo.
pause

:end
