# 🚀 БЫСТРЫЙ СТАРТ: Render + Vercel

## **⚡ За 15 минут**

### **1️⃣ MongoDB Atlas (5 мин)**
```
1. Зайди: mongodb.com/cloud
2. Создай Free cluster (Singapore регион)
3. Network Access → Allow 0.0.0.0/0
4. Connect → Copy Connection String
5. Замени username:password на свои
```

**Connection String пример:**
```
mongodb+srv://myuser:mypassword@cluster.mongodb.net/timeline_db?retryWrites=true&w=majority
```

---

### **2️⃣ Render Backend (5 мин)**

#### **Шаг 1: Перейди на render.com**
- Войди в аккаунт
- Нажми "New +" → "Web Service"
- Выбери репозиторий

#### **Шаг 2: Настрой сервис**
```
Name:              timeline-api
Environment:       Node
Region:            Singapore
Build Command:     npm run build
Start Command:     npm start
Plan:              Free
```

#### **Шаг 3: Добавь переменные в "Environment"**
```
NODE_ENV         = production
PORT             = 10000
MONGO_URI        = <твоя из MongoDB Atlas> [Secret]
JWT_SECRET       = <любой текст типа dev_secret_key> [Secret]
```

#### **Шаг 4: Deploy!**
- Нажми "Create Web Service"
- Жди логов
- Когда зеленая галочка → copy URL (например: `https://timeline-api.onrender.com`)

---

### **3️⃣ Vercel Frontend (5 мин)**

#### **Шаг 1: Перейди на vercel.com**
- Войди в аккаунт
- Нажми "Add New" → "Project"
- Выбери репозиторий

#### **Шаг 2: Выбри Framework**
- Framework Preset: **Vite**
- Root Directory: **project/frontend**

#### **Шаг 3: Добавь переменную в "Environment Variables"**
```
VITE_API_URL = https://timeline-api.onrender.com
```

#### **Шаг 4: Deploy!**
- Нажми "Deploy"
- Жди
- Когда закончится → получишь URL (например: `https://timeline-app.vercel.app`)

---

## **✅ Проверка**

```bash
# 1. Проверить Backend
curl https://timeline-api.onrender.com/api/status

# 2. Открыть Frontend и зарегистрироваться
https://timeline-app.vercel.app

# 3. Используй credentials:
Email:    admin@timeline.com
Password: admin123
```

---

## **📝 Переменные окружения (шпаргалка)**

### **Render (Backend)**
| Ключ | Значение |
|------|---------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGO_URI` | Connection String из MongoDB Atlas [Secret] |
| `JWT_SECRET` | Любая строка, например `my_secret_key_2024` [Secret] |

### **Vercel (Frontend)**
| Ключ | Значение |
|------|---------|
| `VITE_API_URL` | `https://timeline-api.onrender.com` |

### **Локально (project/backend/.env)**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/timeline_db
JWT_SECRET=dev_key
NODE_ENV=development
```

### **Локально (project/frontend/.env.local)**
```
VITE_API_URL=http://localhost:5000
```

---

## **🔗 Итоговые ссылки**

После развертывания у тебя будут:

| Что | URL |
|-----|-----|
| Frontend | https://timeline-app.vercel.app |
| Backend | https://timeline-api.onrender.com |
| MongoDB | mongodb+srv://... |

---

## **⚠️ Если не работает**

### **CORS Error**
✅ Проверь что VITE_API_URL = правильный URL backend  
✅ Проверь что backend CORS разрешает vercel.app домены

### **API 404**
✅ Проверь что backend запущен (статус зеленый в Render)  
✅ Проверь что VITE_API_URL установлена в Vercel

### **MongoDB connection error**
✅ Проверь что MONGO_URI правильная  
✅ Проверь что IP 0.0.0.0/0 добавлен в MongoDB Network Access  
✅ Проверь username:password в Connection String

---

## **📚 Полное руководство**

Для более подробной информации см. [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
