@echo off
title OmniTool Git Auto-Sync
cd /d "%~dp0.."
echo Starting Git Auto-Sync Daemon...
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\auto_sync.ps1
pause
