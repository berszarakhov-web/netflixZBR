#!/usr/bin/env pwsh
# ========================
# Timeline Local Development
# ========================
# Этот скрипт запускает Backend и Frontend вместе

Write-Host ""
Write-Host "==========================="
Write-Host "🚀 Timeline Dev Environment"
Write-Host "===========================" -ForegroundColor Cyan
Write-Host ""

# Проверяем что Node установлен
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion найден" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js не установлен!" -ForegroundColor Red
    Write-Host "Скачай с https://nodejs.org/"
    exit 1
}

# Проверяем MongoDB
Write-Host ""
Write-Host "📊 Проверяю MongoDB..." -ForegroundColor Yellow
Write-Host "   Backend будет использовать: mongodb://localhost:27017"
Write-Host "   Если не запущена - запусти MongoDB Community Server"
Write-Host ""

# Запускаем Backend в отдельном PowerShell окне
Write-Host "🔧 Запускаю Backend..." -ForegroundColor Cyan
$backendProcess = Start-Process pwsh -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot/project/backend'; npm install; npm run dev" -PassThru

# Подождём чтобы backend запустился
Start-Sleep -Seconds 3

# Запускаем Frontend
Write-Host "🎨 Запускаю Frontend..." -ForegroundColor Cyan
Write-Host ""

cd "$PSScriptRoot/project/frontend"

# Установляем зависимости если нужно
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Устанавливаю зависимости Frontend..." -ForegroundColor Yellow
    npm install
}

# Запускаем dev сервер
npm run dev

Write-Host ""
Write-Host "===========================" -ForegroundColor Green
Write-Host "Frontend запустился на:"
Write-Host "→ http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend работает на:"
Write-Host "→ http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔑 Credentials:"
Write-Host "   Email:    admin@timeline.com"
Write-Host "   Password: admin123"
Write-Host "===========================" -ForegroundColor Green
