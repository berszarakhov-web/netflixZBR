# 📱 Инструкция по развертыванию на Render

## **Шаг 1: Подготовка MongoDB Atlas**

1. Зайди на [mongodb.com/cloud](https://mongodb.com/cloud)
2. Создай аккаунт (или войди)
3. Создай новый cluster (выбери Free tier)
4. В разделе "Deployment" → "Database Access" создай нового пользователя
5. В разделе "Network Access" добавь `0.0.0.0/0` (разрешить доступ со всех IP)
6. Скопируй Connection String: 
   ```
   mongodb+srv://username:password@cluster.mongodb.net/timeline_db?retryWrites=true&w=majority
   ```

---

## **Шаг 2: Подготовка Git репозитория**

```bash
# Инициализируй git (если еще не инициализирован)
git init
git add .
git commit -m "initial commit"

# Загрузи на GitHub
git branch -M main
git remote add origin https://github.com/твой-ник/netflixZBR-fullstack.git
git push -u origin main
```

---

## **Шаг 3: Развертывание на Render**

1. Зайди на [render.com](https://render.com)
2. Подключи свой GitHub аккаунт
3. Нажми **"New +"** → **"Web Service"**
4. Выбери твой репозиторий `netflixZBR-fullstack`
5. Настрой параметры:
   - **Name**: `timeline-app`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Region**: `Singapore` (или ближайший к тебе)
   - **Plan**: `Free`

---

## **Шаг 4: Добавить Environment переменные**

В Render UI, в разделе "Environment":

| Переменная | Значение |
|-----------|---------|
| `PORT` | `10000` |
| `NODE_ENV` | `production` |
| `MONGO_URI` | `mongodb+srv://username:password@cluster.mongodb.net/timeline_db?retryWrites=true&w=majority` |
| `JWT_SECRET` | `твой_супер_секретный_ключ_12345` |
| `FRONTEND_URL` | `https://timeline-app.onrender.com` (будет известен после первого деплоя) |

⚠️ **ВАЖНО**: `MONGO_URI` и `JWT_SECRET` добавь как **Secret** (confidential)!

---

## **Шаг 5: Запустить деплой**

1. Нажми **"Create Web Service"**
2. Дождись завершения сборки (3-5 минут)
3. Проверь статус в разделе "Logs"
4. После успеха будет ссылка типа: `https://timeline-app.onrender.com`

---

## **Шаг 6: Инициализация БД (первый запуск)**

После успешного деплоя, выполни:

```bash
# Установи зависимости локально
cd project/backend
npm install

# Создай admin аккаунт на production БД
MONGO_URI="твоя_production_mongo_uri" JWT_SECRET="твой_secret" node createAdmin.js
```

Или добавь настройку в `.env` для production:
```
PORT=10000
MONGO_URI=mongodb+srv://...
JWT_SECRET=твой_secret
NODE_ENV=production
FRONTEND_URL=https://timeline-app.onrender.com
```

---

## **Возможные ошибки и решения**

### ❌ "No open ports detected on 0.0.0.0"
✅ **Решение**: Просто деплой завершается, Render сам управляет портом

### ❌ "Cannot find module 'path'"
✅ **Решение**: `path` уже встроена в Node.js, ошибка пройдет

### ❌ "Cannot connect to MongoDB"
✅ **Решение**: 
- Проверь MONGO_URI (должна быть с `mongodb+srv://`)
- Убедись, что IP `0.0.0.0/0` добавлен в MongoDB Atlas Network Access

### ❌ "CORS error при запросе с фронта"
✅ **Решение**: Переменная `FRONTEND_URL` должна совпадать с твоей Render ссылкой

---

## **Проверка**

1. Открой `https://timeline-app.onrender.com` в браузере
2. Должна загрузиться React приложение
3. Проверь консоль (F12) на ошибки
4. Попробуй зарегистрироваться

Готово! 🎉
