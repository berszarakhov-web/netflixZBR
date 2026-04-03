# 🚀 Render Deployment Guide

## **Вариант 1: Backend Only (текущий)**

### **Структура:**
```
root/
├── package.json         (backend-only scripts)
├── render.yaml          (backend-only config)
├── project/
│   ├── backend/        
│   └── frontend/       (игнорируется при деплое)
```

### **Как работает:**
1. ✅ Render читает `package.json` в root
2. ✅ `npm run build` = `cd project/backend && npm install`
3. ✅ `npm start` = `node project/backend/server.js`
4. ✅ Backend запускается на порту из `PORT` переменной

### **Чтобы задеплоить на Render:**

1. **Создай Render Web Service:**
   - Выбери GitHub репозиторий
   - Branch: `main`
   - Build Command: пусто или используй default
   - Start Command: пусто или используй default
   - Render автоматически прочитает `render.yaml`

2. **Добавь Environment Variables в Render UI:**
   ```
   MONGO_URI = mongodb+srv://...
   JWT_SECRET = твой_супер_секретный_ключ
   NODE_ENV = production
   PORT = 10000
   ```

3. **Deploy!**
   - Нажми "Deploy"
   - Дождись завершения (3-5 мин)

### **Проверка:**
```bash
curl https://timeline-api.onrender.com/api/status
```

---

## **Вариант 2: Раздельные Render Services (рекомендуется для production)**

Если ты хочешь деплоить frontend и backend отдельно:

### **Backend Service:**
1. Используй текущий конфиг (`package.json` + `render.yaml`)
2. Будет на: `https://timeline-api.onrender.com`

### **Frontend Service (отдельно):**
1. Создай новый Render Web Service (Static Site)
2. Или используй Vercel/Netlify

---

## **Вариант 3: Full Stack (frontend + backend вместе)**

Если хочешь вернуться к полному деплою (frontend + backend):

### **Отмени изменения:**
```bash
git log --oneline  # найди коммит перед моими последними изменениями
git revert <commit_hash>  # или просто отредактируй package.json вручную
```

### **Или обновить package.json:**
```json
{
  "scripts": {
    "build": "cd project/frontend && npm install && npm run build && cd ../.. && cd project/backend && npm install",
    "start": "node project/backend/server.js"
  }
}
```

---

## **Смены в текущем коммите:**

✅ **package.json** - упрощен для backend-only  
✅ **render.yaml** - настроен только для backend  
✅ **server.js** - убрана раздача static файлов  

---

## **Быстрый чек-лист:**

- [ ] Коммит и push всех изменений
- [ ] Добавлены MONGO_URI и JWT_SECRET в Render
- [ ] NODE_ENV = production
- [ ] PORT = 10000 (или любой другой)
- [ ] Build Command: `npm run build` (или empty)
- [ ] Start Command: `npm start` (или empty)

Готово! 🎉
