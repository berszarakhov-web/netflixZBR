require('dotenv').config()
const express   = require('express')
const cors      = require('cors')
const path      = require('path')
const connectDB = require('./config/db')

const userRoutes     = require('./routes/userRoutes')
const movieRoutes    = require('./routes/movieRoutes')
const bookmarkRoutes = require('./routes/bookmarkRoutes')
const commentRoutes  = require('./routes/commentRoutes')
const ratingRoutes   = require('./routes/ratingRoutes')
const adminRoutes    = require('./routes/adminRoutes')

const app = express()

// ── Подключение к MongoDB ─────────────────────────────────────────
connectDB()

// ── Middleware ────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL || ''
].filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))
app.use(express.json({ limit: '5mb' }))  // 5mb — для base64 аватаров
app.use(express.urlencoded({ extended: true }))

// ── Раздача статических файлов фронтенда ─────────────────────────
const frontendBuildPath = path.join(__dirname, '../frontend/dist')
app.use(express.static(frontendBuildPath))

// ── Логирование запросов (только в dev) ──────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.path}`)
    next()
  })
}

// ── Маршруты ─────────────────────────────────────────────────────
app.use('/api/users',     userRoutes)
app.use('/api/movies',    movieRoutes)
app.use('/api/bookmarks', bookmarkRoutes)
app.use('/api/comments',  commentRoutes)
app.use('/api/ratings',   ratingRoutes)
app.use('/api/admin',     adminRoutes)

// ── Обслуживание React SPA ───────────────────────────────────────
app.get('*', (req, res) => {
  // Если это не API маршрут, отправить index.html для React Router
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendBuildPath, 'index.html'))
  }
})

// ── Проверочный маршрут ──────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    message: 'TimeLine API работает ✅',
    version: '2.0.0',
    routes: [
      'POST   /api/users/register',
      'POST   /api/users/login',
      'GET    /api/users/me',
      'PUT    /api/users/me',
      'PUT    /api/users/me/password',
      'GET    /api/movies?type=&genre=&search=&page=&sort=',
      'GET    /api/movies/search?q=',
      'GET    /api/movies/:id',
      'GET    /api/movies/:id/related',
      'GET    /api/bookmarks',
      'POST   /api/bookmarks',
      'DELETE /api/bookmarks/:movieId',
      'GET    /api/comments/:movieId',
      'POST   /api/comments',
      'DELETE /api/comments/:id',
      'POST   /api/comments/:id/like',
      'GET    /api/ratings',
      'GET    /api/ratings/:movieId',
      'POST   /api/ratings',
      'GET    /api/admin/stats         [admin/mod]',
      'GET    /api/admin/users         [admin/mod]',
      'PUT    /api/admin/users/:id/role [admin]',
      'PUT    /api/admin/users/:id/ban  [admin/mod]',
      'GET    /api/admin/movies        [admin/mod]',
      'GET    /api/admin/comments      [admin/mod]',
    ],
  })
})

// ── 404 ──────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: 'Маршрут не найден' })
})

// ── Глобальная обработка ошибок ──────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Необработанная ошибка:', err.stack)
  res.status(500).json({ message: 'Внутренняя ошибка сервера' })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 Server running on port: ${PORT}`);
  console.log(`📊 Admin API: http://0.0.0.0:${PORT}/api/admin/stats`);
});