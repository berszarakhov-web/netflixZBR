# 🚀 Backend-Only Deployment

## **Environment Variables для Render**

Добавь эти переменные в Render UI → **Environment**:

### **Render (Backend)**
```
NODE_ENV        = production
PORT            = 10000
MONGO_URI       = mongodb+srv://username:password@cluster.mongodb.net/timeline_db?retryWrites=true&w=majority
JWT_SECRET      = твой_супер_секретный_ключ_2024
```

⚠️ **MONGO_URI** и **JWT_SECRET** должны быть **Secret** (скрытые)

---

## **Как задеплоить на Render**

1. Зайди на [render.com](https://render.com)
2. Нажми **"New +"** → **"Web Service"**
3. Выбери репозиторий `netflixZBR-fullstack`
4. Заполни:
   - Name: `timeline-api`
   - Environment: `Node`
   - Region: `Singapore`
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Plan: `Free`
5. Нажми **"Create Web Service"**
6. В разделе **"Environment"** добавь переменные (см. выше)
7. Нажми **"Manual Deploy"** или **"Redeploy"**
8. Дождись логов - должна быть зеленая галочка ✅

---

## **Проверить что работает**

```bash
curl https://timeline-api.onrender.com/api/status

# Ответ:
{
  "message": "TimeLine API работает ✅",
  "version": "2.0.0",
  "environment": "production",
  "timestamp": "2026-04-03T10:00:00.000Z"
}
```

---

## **Локальная разработка**

### **1. Установить зависимости backend:**
```bash
cd project/backend
npm install
```

### **2. Создать .env файл:**
```
project/backend/.env

PORT=5000
MONGO_URI=mongodb://localhost:27017/timeline_db
JWT_SECRET=dev_secret_key_2024
NODE_ENV=development
```

### **3. Запустить backend:**
```bash
# Option 1: Development (с hot reload)
npm run dev

# Option 2: Production
npm start
```

### **4. Проверить:**
```bash
curl http://localhost:5000/api/status
```

---

## **Scripts**

```json
{
  "start": "node project/backend/server.js",
  "dev": "cd project/backend && npm run dev",
  "build": "cd project/backend && npm install",
  "seed": "cd project/backend && node seed.js",
  "seed:admin": "cd project/backend && node createAdmin.js"
}
```

- `npm start` - Запустить сервер (production)
- `npm run dev` - Запустить с hot reload (development)
- `npm run build` - Установить зависимости (для Render)
- `npm run seed` - Заполнить БД тестовыми данными
- `npm run seed:admin` - Создать admin аккаунт

---

## **Структура папок**

```
netflixZBR-fullstack/
├── package.json          ← Скрипты в root для Render
├── render.yaml           ← Конфиг для Render
├── README.md
├── project/
│   └── backend/
│       ├── package.json
│       ├── server.js
│       ├── .env          (локальный, не коммитим!)
│       ├── config/
│       ├── models/
│       ├── routes/
│       ├── controllers/
│       ├── middleware/
│       └── ...
```

---

## **API Endpoints**

```
POST   /api/users/register
POST   /api/users/login
GET    /api/users/me
PUT    /api/users/me
PUT    /api/users/me/password
GET    /api/movies
GET    /api/movies/:id
GET    /api/bookmarks
POST   /api/bookmarks
DELETE /api/bookmarks/:movieId
GET    /api/comments/:movieId
POST   /api/comments
DELETE /api/comments/:id
POST   /api/comments/:id/like
GET    /api/ratings
GET    /api/ratings/:movieId
POST   /api/ratings
GET    /api/admin/stats
GET    /api/admin/users
PUT    /api/admin/users/:id/role
PUT    /api/admin/users/:id/ban
GET    /api/admin/movies
GET    /api/admin/comments
```

---

## **⚠️ Типичные ошибки**

### ❌ ECONNREFUSED
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Решение:** MongoDB не запущена. Либо запусти локальную MongoDB, либо используй MongoDB Atlas (облачная)

### ❌ Error: ENOENT: no such file or directory
```
Error: Cannot find module 'express'
```
**Решение:** Выполни `npm install` в `project/backend/`

### ❌ No environment variables set
```
Error: JWT_SECRET is required
```
**Решение:** Добавь переменные в Render UI или в .env файл

---

Готово! 🎉
