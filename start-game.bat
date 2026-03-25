@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

set LOCKFILE=%TEMP%\bosphorus-ferry-tabs.txt

:: Read current tab count (0 if no lock file)
set TAB_COUNT=0
if exist "!LOCKFILE!" set /p TAB_COUNT=<"!LOCKFILE!"

:: Check if dev server is already running on port 5173
netstat -ano 2>nul | findstr ":5173.*LISTENING" >nul 2>&1
if !errorlevel! equ 0 (
    if !TAB_COUNT! GEQ 3 (
        echo Bosphorus Ferry is already running ^(3 tabs max^).
        echo Visit http://localhost:5173 in your browser.
        pause
        exit /b
    )
    set /a TAB_COUNT+=1
    echo !TAB_COUNT!>"!LOCKFILE!"
    start "" http://localhost:5173
    exit /b
)

:: Fresh start - reset tab counter
echo 1>"!LOCKFILE!"

echo ===================================
echo   Bosphorus Ferry
echo   Starting dev server...
echo ===================================
echo.

:: Open browser after short delay (give server time to start)
start /b cmd /c "timeout /t 3 /nobreak >nul && start "" http://localhost:5173"

:: Run dev server (blocking - keeps this window open)
call npm run dev

:: Clean up lock file when server stops
del "!LOCKFILE!" 2>nul
