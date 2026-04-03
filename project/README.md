# TimeLine — Веб-приложение для просмотра фильмов

Полноценное клиент-серверное веб-приложение с React фронтендом и Node.js/Express/MongoDB бекендом.

---

## 🚀 Быстрый запуск

### Требования
- Node.js (v18+)
- MongoDB (должна быть запущена локально на `mongodb://localhost:27017`)

---

### 1. Запустить Backend

```bash
cd backend
npm install
node seed.js       # заполнить базу данных фильмами (один раз)
npm run dev        # запустить сервер на http://localhost:5000
```

### 2. Запустить Frontend

```bash
cd frontend
npm install
npm run dev        # запустить на http://localhost:5173
```

Открыть в браузере: **http://localhost:5173**

---

## 🗂 Структура проекта

```
project/
├── backend/
│   ├── config/
│   │   └── db.js                 # подключение к MongoDB
│   ├── models/
│   │   ├── User.js               # модель пользователя
│   │   ├── Movie.js              # модель фильма
│   │   ├── Bookmark.js           # модель закладки
│   │   └── Comment.js            # модель комментария
│   ├── controllers/
│   │   ├── authController.js     # регистрация, вход
│   │   ├── movieController.js    # CRUD фильмов
│   │   ├── bookmarkController.js # управление закладками
│   │   └── commentController.js  # управление комментариями
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── movieRoutes.js
│   │   ├── bookmarkRoutes.js
│   │   └── commentRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js     # проверка JWT токена
│   ├── seed.js                   # скрипт заполнения БД
│   ├── server.js                 # точка входа
│   ├── .env                      # переменные окружения
│   └── package.json
└── frontend/
    └── src/
        ├── api.js                # все запросы к backend
        ├── context/
        │   ├── AuthContext.jsx   # авторизация через API
        │   ├── BookmarksContext.jsx
        │   └── CommentsContext.jsx
        └── ...
```

---

## 📡 API маршруты

### Пользователи
| Метод | Маршрут | Описание | Защита |
|-------|---------|----------|--------|
| POST | `/api/users/register` | Регистрация | — |
| POST | `/api/users/login` | Вход | — |
| GET | `/api/users/me` | Текущий пользователь | ✅ JWT |

### Фильмы
| Метод | Маршрут | Описание | Защита |
|-------|---------|----------|--------|
| GET | `/api/movies` | Все фильмы | — |
| GET | `/api/movies/:id` | Фильм по id | — |
| POST | `/api/movies` | Создать фильм | ✅ JWT |
| PUT | `/api/movies/:id` | Обновить фильм | ✅ JWT |
| DELETE | `/api/movies/:id` | Удалить фильм | ✅ JWT |

### Закладки
| Метод | Маршрут | Описание | Защита |
|-------|---------|----------|--------|
| GET | `/api/bookmarks` | Мои закладки | ✅ JWT |
| POST | `/api/bookmarks` | Добавить закладку | ✅ JWT |
| DELETE | `/api/bookmarks/:movieId` | Удалить закладку | ✅ JWT |

### Комментарии
| Метод | Маршрут | Описание | Защита |
|-------|---------|----------|--------|
| GET | `/api/comments/:movieId` | Комментарии к фильму | — |
| POST | `/api/comments` | Добавить комментарий | ✅ JWT |
| DELETE | `/api/comments/:id` | Удалить комментарий | ✅ JWT |

---

## 🔐 Технологии

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, dotenv, cors, nodemon

**Frontend:** React, React Router, Vite, CSS Modules
