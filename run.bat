@echo off
REM ========================
REM Timeline Local Development
REM ========================
REM Этот скрипт запускает Backend и Frontend вместе

cd /d "%~dp0"

echo.
echo ===========================
echo 🚀 Timeline Dev Environment
echo ===========================
echo.

REM Проверяем что Node установлен
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js не установлен!
    echo Скачай с https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js найден

REM Проверяем что MongoDB запущена
echo.
echo 📊 Проверяю MongoDB...
echo    Backend будет использовать: mongodb://localhost:27017
echo    Если не запущена - запусти MongoDB Community Server
echo.

REM Запускаем Backend в отдельном окне
echo 🔧 Запускаю Backend...
start cmd /k "cd project\backend && npm install && npm run dev"

REM Подождём чтобы backend запустился
timeout /t 3 /nobreak

REM Запускаем Frontend
echo.
echo 🎨 Запускаю Frontend...
cd project\frontend
npm install
npm run dev

echo.
echo ===========================
echo Frontend запустился на:
echo → http://localhost:5173
echo.
echo Backend работает на:
echo → http://localhost:5000
echo.
echo 🔑 Credentials:
echo    Email:    admin@timeline.com
echo    Password: admin123
echo ===========================
pause
