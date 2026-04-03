#!/bin/bash

# ========================
# Timeline Local Development
# ========================

echo ""
echo "==========================="
echo "🚀 Timeline Dev Environment"
echo "============================"
echo ""

# Проверяем Node
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен!"
    echo "Скачай с https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js $NODE_VERSION найден"

# Проверяем MongoDB
echo ""
echo "📊 Проверяю MongoDB..."
echo "   Backend будет использовать: mongodb://localhost:27017"
echo "   Если не запущена - запусти MongoDB Community Server"
echo ""

# Запускаем Backend в отдельном терминале (Mac/Linux)
echo "🔧 Запускаю Backend..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac
    open -a Terminal "$PWD/backend_run.sh"
else
    # Linux
    gnome-terminal -- bash -c "cd '$PWD/project/backend' && npm install && npm run dev; bash"
fi

# Подождём чтобы backend запустился
sleep 3

# Запускаем Frontend
echo "🎨 Запускаю Frontend..."
echo ""

cd "$PWD/project/frontend"

# Установляем зависимости если нужно
if [ ! -d "node_modules" ]; then
    echo "📦 Устанавливаю зависимости Frontend..."
    npm install
fi

# Запускаем dev сервер
npm run dev

echo ""
echo "==========================="
echo "Frontend запустился на:"
echo "→ http://localhost:5173"
echo ""
echo "Backend работает на:"
echo "→ http://localhost:5000"
echo ""
echo "🔑 Credentials:"
echo "   Email:    admin@timeline.com"
echo "   Password: admin123"
echo "==========================="
