# auto_sync.ps1
# Simple loop daemon that checks for local changes every 15 seconds and pushes them to GitHub.
$currentDirectory = "f:\Tools website"
Set-Location $currentDirectory

# Set console output encoding to UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   OmniTool Hub Git Auto-Backup Sync Daemon" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Monitoring folder: $currentDirectory" -ForegroundColor Green
Write-Host "Checking for local changes every 15 seconds..." -ForegroundColor Gray
Write-Host "Press Ctrl+C in this window to stop the auto-sync." -ForegroundColor White
Write-Host "------------------------------------------------" -ForegroundColor Cyan

while ($true) {
    try {
        # Check git status for modifications, deletions, or untracked files
        $status = git status --porcelain
        if ($status) {
            # Get current active branch
            $currentBranch = (git branch --show-current).Trim()
            if ([string]::IsNullOrEmpty($currentBranch)) {
                $currentBranch = "main"
            }
            
            # Format list of changed files
            $rawFiles = git status --porcelain | ForEach-Object {
                if ($_.Length -gt 3) { $_.Substring(3).Trim() }
            }
            $files = $rawFiles -join ", "
            if ($files.Length -gt 80) {
                $files = $files.Substring(0, 77) + "..."
            }
            
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            $commitMessage = "Auto-save ($currentBranch) @ $timestamp - Files: [$files]"
            
            Write-Host ""
            Write-Host "[$timestamp] ⚠️ Changes detected on branch '$currentBranch'!" -ForegroundColor Yellow
            Write-Host "Staging files..." -ForegroundColor Gray
            git add .
            
            Write-Host "Committing changes..." -ForegroundColor Gray
            $msgFile = Join-Path $currentDirectory ".git-commit-msg.txt"
            Set-Content -Path $msgFile -Value $commitMessage -Encoding utf8
            
            $commitResult = git commit -F "$msgFile" 2>&1
            Remove-Item $msgFile -ErrorAction SilentlyContinue
            
            if ($LASTEXITCODE -ne 0) {
                Write-Host "❌ Commit failed: $commitResult" -ForegroundColor Red
                continue
            }
            
            Write-Host "Pushing to remote origin/$currentBranch..." -ForegroundColor Gray
            $pushResult = git push origin "$currentBranch" 2>&1
            
            # Check push exit code
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✅ Auto-backup successfully pushed to GitHub!" -ForegroundColor Green
            } else {
                Write-Host "❌ Push failed. Will retry on next check. Error details:" -ForegroundColor Red
                Write-Host $pushResult -ForegroundColor Red
            }
        }
    } catch {
        Write-Host "Error during auto-sync cycle: $_" -ForegroundColor Red
    }
    
    # Wait 15 seconds before checking again
    Start-Sleep -Seconds 15
}
