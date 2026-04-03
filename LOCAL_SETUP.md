# 🏃 Как запустить локально

## **⚡ Самый быстрый способ (2 клика)**

### **На Windows:**
1. Двойной клик на **`run.bat`** 
2. Всё запустится автоматически! ✅

### **На Windows (PowerShell):**
```powershell
# Запусти в PowerShell:
./run.ps1

# Если выкинет ошибку про политику выполнения:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
./run.ps1
```

### **На Mac/Linux:**
```bash
# Запусти в терминале:
bash run.sh
```

---

## **📖 Если запустить вручную**

### **Терминал 1 - Backend:**
```bash
cd project/backend
npm install      # Первый раз только
npm run dev      # Запустить сервер
```

**Результат:**
```
🚀 TimeLine API running on port: 5000
📝 Environment: development
```

Сервер работает на: **http://localhost:5000**

### **Терминал 2 - Frontend:**
```bash
cd project/frontend
npm install      # Первый раз только
npm run dev      # Запустить приложение
```

**Результат:**
```
VITE v7.3.1 ready in 456 ms

➜  Local:   http://localhost:5173/
```

Открой в браузере: **http://localhost:5173**

---

## **🔧 Перед первым запуском**

### **1. Установить Node.js**
- Скачай с [nodejs.org](https://nodejs.org/)
- Версия: 18+ (LTS рекомендуется)
- Проверь: `node --version`

### **2. Установить MongoDB локально (опционально)**

#### **Option A: MongoDB Community Server (локально)**
- Скачай с [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Запусти MongoDB
- Используй: `mongodb://localhost:27017`

#### **Option B: MongoDB Atlas (облачно) - проще!**
- Зайди на [mongodb.com/cloud](https://mongodb.com/cloud)
- Создай Free cluster
- Получи Connection String
- Обнови в `project/backend/.env`:
  ```
  MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/timeline_db
  ```

### **3. Проверить Git**
```bash
git --version
```

---

## **🎯 Что произойдёт**

**При первом запуске:**
```
✅ Backend запустится и установит зависимости (1-2 мин)
✅ Frontend запустится и установит зависимости (1-2 мин)
✅ Откроется браузер на http://localhost:5173
✅ Всё готово к разработке!
```

**После этого:**
```
Backend:  http://localhost:5000 (API)
Frontend: http://localhost:5173 (Браузер)
MongoDB:  localhost:27017 (БД)
```

---

## **🔐 Учётные данные**

**Первый запуск:**
- Email: `admin@timeline.com`
- Password: `admin123`

**Можешь:**
1. Зарегистрировать нового пользователя (Register)
2. Войти через админа
3. Смотреть фильмы, добавлять в закладки, писать комментарии

---

## **📁 Структура папок**

```
netflixZBR-fullstack/
├── run.bat              ⭐ Запуск на Windows
├── run.ps1              ⭐ Запуск на Windows (PowerShell)
├── run.sh               ⭐ Запуск на Mac/Linux
├── package.json         (Root для Render)
├── project/
│   ├── backend/
│   │   ├── .env         (DB credentials)
│   │   ├── package.json
│   │   ├── server.js
│   │   └── ...
│   └── frontend/
│       ├── .env.local   (Local API URL)
│       ├── package.json
│       ├── vite.config.js
│       └── src/
│           ├── api.js   (API calls)
│           └── ...
```

---

## **⚙️ Как работает локально**

### **Frontend запрашивает Backend:**
```javascript
// frontend/src/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
// → http://localhost:5000/api/...
```

### **Vite автоматически проксирует запросы:**
```javascript
// frontend/vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:5000',  // ← посылает сюда
  }
}
```

### **Backend отвечает:**
```javascript
// backend/server.js
app.listen(5000, 'localhost')
// Слушает на http://localhost:5000
```

---

## **🆘 Если что-то не работает**

### ❌ "Cannot find module 'express'"
```bash
cd project/backend
npm install
```

### ❌ "Port 5000 already in use"
```bash
# Windows:
netstat -ano | findstr :5000

# Mac/Linux:
lsof -i :5000

# Убей процесс и пересоздай
```

### ❌ "MongoDB connection error"
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Запусти MongoDB Community Server
- ИЛИ используй MongoDB Atlas и обнови MONGO_URI в .env

### ❌ "CORS Error"
Обычно это решается если всё запущено на localhost

---

## **💡 Полезные команды**

```bash
# Установить зависимости
npm install

# Запустить с горячей перезагрузкой
npm run dev

# Собрать для production
npm run build

# Запустить preview production версии
npm run preview

# Очистить node_modules
rm -rf node_modules package-lock.json
npm install
```

---

## **🚀 Готово!**

Всё просто:
1. `run.bat` (или `run.ps1` / `run.sh`)
2. Ждёшь 3 минуты
3. Открывается браузер
4. Разрабатываешь! ✨

**Вопросы?** Посмотри логи в терминале - там всё написано.

Enjoy! 🎉
