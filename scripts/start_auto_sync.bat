@echo off
title OmniTool Git Auto-Sync
cd /d "f:\Tools website"
echo Starting Git Auto-Sync Daemon...
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\auto_sync.ps1
pause
