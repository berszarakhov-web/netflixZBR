# 🚀 Развертывание на Render (Backend) + Vercel (Frontend)

## **📋 Этап 0: Подготовка (MongoDB Atlas)**

### **1. Создать облачную БД MongoDB Atlas:**

1. Зайди на [mongodb.com/cloud](https://mongodb.com/cloud)
2. Нажми **"Sign Up"** или **"Log In"**
3. Выбери **"Create a Deployment"**
4. Выбери **"M0 (Free tier)"** - бесплатный тариф
5. Регион: **Singapore** (ближе к России)
6. Нажми **"Create Deployment"**

### **2. Создать пользователя для доступа:**

1. В левом меню: **Network Access**
2. Нажми **"Add IP Address"**
3. Выбери **"Allow Access from Anywhere"** → `0.0.0.0/0`
4. Подтверди

### **3. Получить Connection String:**

1. Вернись на главную, выбери кластер
2. Нажми кнопку **"Connect"**
3. Выбери **"Drivers"**
4. Скопируй строку подключения:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/timeline_db?retryWrites=true&w=majority
   ```
   Замени `username` и `password` на свои от MongoDB Atlas!

---

## **🔧 ЧАСТЬ 1: Backend на Render**

### **Шаг 1: Обновить .env файл в project/backend/.env**

```bash
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/timeline_db?retryWrites=true&w=majority
JWT_SECRET=твой_супер_секретный_ключ_2024_v2_этозамена
NODE_ENV=production
ADMIN_EMAIL=admin@timeline.com
ADMIN_PASSWORD=admin123
```

**⚠️ ВАЖНО:** Не коммитим `.env` файл! Переменные добавим через Render UI.

### **Шаг 2: Убедиться что package.json в root настроен**

Открой [package.json](package.json):

```json
{
  "name": "timeline-backend",
  "scripts": {
    "start": "node project/backend/server.js",
    "build": "cd project/backend && npm install"
  }
}
```

✅ Должны быть эти скрипты!

### **Шаг 3: Закоммитить и запушить в GitHub**

```powershell
cd c:\Users\ZBR55\Downloads\netflixZBR-fullstack
git add .
git commit -m "chore: prepare for backend deployment"
git push
```

### **Шаг 4: Создать Render Web Service**

1. Зайди на [render.com](https://render.com)
2. Подключи свой GitHub аккаунт (если еще не подключил)
3. Нажми **"New +"** → **"Web Service"**
4. Выбери репозиторий `netflixZBR-fullstack`
5. Настрой параметры:

```
Name:                 timeline-api
Environment:          Node
Region:               Singapore
Branch:               main
Build Command:        npm run build
Start Command:        npm start
Plan:                 Free
```

6. **Нажми "Create Web Service"** (не деплой еще!)

### **Шаг 5: Добавить Environment Variables в Render**

После создания сервиса, в левом меню выбери **"Environment"**:

Добавь эти переменные:

| Ключ | Значение | Тип |
|------|---------|-----|
| `NODE_ENV` | `production` | Regular |
| `PORT` | `10000` | Regular |
| `MONGO_URI` | `mongodb+srv://username:password@...` | Secret ⚠️ |
| `JWT_SECRET` | `твой_супер_секретный_ключ_2024` | Secret ⚠️ |

⚠️ **Secret** = скрытое значение (не видно в логах)

### **Шаг 6: Запустить Render Deплой**

1. Нажми кнопку **"Manual Deploy"** или **"Redeploy"**
2. Дождись завершения (2-3 минуты)
3. Проверь логи, должны быть зеленые галочки ✅

### **Шаг 7: Проверить что backend работает**

```bash
# Получи URL твоего Render сервиса (например):
# https://timeline-api.onrender.com

# Проверь статус:
curl https://timeline-api.onrender.com/api/status

# Ответ должен быть:
{
  "message": "TimeLine API работает ✅",
  "version": "2.0.0",
  "environment": "production",
  "timestamp": "2026-04-03T10:00:00.000Z"
}
```

✅ **Backend готов!** Запомни URL: `https://timeline-api.onrender.com`

---

## **⚛️ ЧАСТЬ 2: Frontend на Vercel**

### **Шаг 1: Обновить API URL в фронтенде**

Открой [project/frontend/src/api.js](project/frontend/src/api.js):

```javascript
// Старое значение:
const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000') + '/api'

// Новое значение (для production):
const API_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api`
  : 'http://localhost:5000/api'
```

Или еще проще:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
```

### **Шаг 2: Создать .env.production файл в project/frontend**

Создай новый файл `project/frontend/.env.production`:

```
VITE_API_URL=https://timeline-api.onrender.com
```

⚠️ **Важно:** В Vite переменные должны начинаться с `VITE_`!

### **Шаг 3: Обновить api.js для Vite**

Если ты используешь Vite (а не Create React App), обнови [project/frontend/src/api.js](project/frontend/src/api.js):

```javascript
// Для Vite:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// НЕ используй process.env в Vite!
```

**Или если используешь это в браузере:**

```javascript
const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://timeline-api.onrender.com'
```

### **Шаг 4: Обновить vite.config.js**

Открой [project/frontend/vite.config.js](project/frontend/vite.config.js):

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

✅ Это нужно только для локальной разработки!

### **Шаг 5: Создать vercel.json в root (опционально)**

Создай файл `vercel.json` в корне проекта:

```json
{
  "buildCommand": "cd project/frontend && npm install && npm run build",
  "outputDirectory": "project/frontend/dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "@vite_api_url"
  }
}
```

### **Шаг 6: Закоммитить и запушить**

```powershell
cd c:\Users\ZBR55\Downloads\netflixZBR-fullstack
git add .
git commit -m "chore: prepare frontend for Vercel deployment"
git push
```

### **Шаг 7: Создать Vercel Project**

1. Зайди на [vercel.com](https://vercel.com)
2. Нажми **"New Project"**
3. Выбери свой GitHub репозиторий `netflixZBR-fullstack`
4. Vercel должен автоматически выбрать Vite

### **Шаг 8: Настроить Vercel Settings**

В разделе **"Project Settings"**:

**Root Directory:**
```
project/frontend
```

**Build Command:**
```
npm run build
```

**Output Directory:**
```
dist
```

### **Шаг 9: Добавить Environment Variables в Vercel**

В разделе **"Settings"** → **"Environment Variables"**:

Добавь:

| Ключ | Значение | Environments |
|------|---------|--------------|
| `VITE_API_URL` | `https://timeline-api.onrender.com` | Production, Preview, Development |

### **Шаг 10: Запустить Vercel Deploy**

1. Нажми **"Deploy"**
2. Дождись завершения (1-2 минуты)
3. Получи URL твоего сайта (например): `https://timeline-app.vercel.app`

### **Шаг 11: Проверить что frontend работает**

1. Открой `https://timeline-app.vercel.app` в браузере
2. Проверь консоль браузера (F12)
3. Должна загрузиться React приложение

---

## **✅ Финальная проверка**

### **Тест логина:**

1. Открой `https://timeline-app.vercel.app`
2. Нажми на "Login" (или Register)
3. Используй credentials:
   ```
   Email:    admin@timeline.com
   Password: admin123
   ```

4. Если работает → ВСЁ ГОТОВО! 🎉

### **Если не работает:**

**Проверь:**
- [ ] Backend на Render запущен (статус зеленый)
- [ ] Frontend на Vercel собран и развернут
- [ ] MONGO_URI правильно добавлена в Render
- [ ] JWT_SECRET добавлена в Render
- [ ] VITE_API_URL указывает на правильный URL backend
- [ ] Консоль браузера (F12) показывает ошибки CORS или 404

---

## **🔗 URLs после развертывания**

| Сервис | URL | Управление |
|--------|-----|-----------|
| Backend API | `https://timeline-api.onrender.com` | render.com |
| Frontend App | `https://timeline-app.vercel.app` | vercel.com |
| MongoDB | `mongodb+srv://...` | mongodb.com |

---

## **📝 Шпаргалка переменных окружения**

### **Render (Backend):**
```
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/timeline_db?retryWrites=true&w=majority
JWT_SECRET=твой_супер_секретный_ключ_2024
```

### **Vercel (Frontend):**
```
VITE_API_URL=https://timeline-api.onrender.com
```

### **Локальная разработка (project/backend/.env):**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/timeline_db
JWT_SECRET=dev_key_12345
NODE_ENV=development
```

### **Локальная разработка (project/frontend/.env.local):**
```
VITE_API_URL=http://localhost:5000
```

---

## **🎬 Запуск локально**

```powershell
# Terminal 1 - Backend
cd project/backend
npm install
npm run dev

# Terminal 2 - Frontend
cd project/frontend
npm install
npm run dev

# Открой http://localhost:5173
```

---

## **🆘 Типичные ошибки и решения**

### ❌ CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Решение:**
- Убедись что backend на Render имеет правильный FRONTEND_URL
- Или добавь Vercel URL в CORS
  
Отредактируй [project/backend/server.js](project/backend/server.js):

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://timeline-app.vercel.app',  // Добавь Vercel URL
  process.env.FRONTEND_URL || ''
].filter(Boolean)
```

### ❌ 404 API Not Found
```
GET /api/users/login 404 Not Found
```

**Решение:**
- Проверь что VITE_API_URL правильно установлена в Vercel
- Проверь что backend запущен на Render
- Проверь что URL backend правильный (без слеша в конце)

### ❌ "Cannot find module 'express'"
```
Error: Cannot find module 'express'
```

**Решение:**
- Убедись что `npm run build` вызывает `npm install` в backend
- Check package.json скрипты

---

## **📚 Структура файлов**

```
netflixZBR-fullstack/
├── package.json                    (root - для backend)
├── render.yaml                     (конфиг для Render)
├── vercel.json                     (конфиг для Vercel)
├── DEPLOYMENT_GUIDE.md             (эта инструкция)
├── project/
│   ├── backend/
│   │   ├── package.json
│   │   ├── server.js
│   │   ├── .env                    (локальный - НЕ коммитим!)
│   │   └── ...
│   └── frontend/
│       ├── package.json
│       ├── vite.config.js
│       ├── .env.production         (для production)
│       ├── .env.local              (для локальной разработки)
│       ├── src/
│       │   ├── api.js
│       │   └── ...
│       └── dist/                   (НЕ коммитим!)
```

---

Готово! Следуй шагам в порядке и всё должно работать! 🚀
