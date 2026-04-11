@echo off
echo ========================================
echo    AI Travel Planner - Starting Servers
echo ========================================
echo.

:: Kill any existing node processes
taskkill /F /IM node.exe >nul 2>&1
timeout /t 1 /nobreak >nul

:: Start backend
echo [1/2] Starting Backend Server (port 5000)...
start "AI Travel - Backend" cmd /k "cd /d "%~dp0backend" && node server.js"
timeout /t 2 /nobreak >nul

:: Start frontend
echo [2/2] Starting Frontend Server (port 5173)...
start "AI Travel - Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ========================================
echo  Both servers are starting!
echo  Open: http://localhost:5173
echo ========================================
timeout /t 3 /nobreak >nul
start http://localhost:5173
