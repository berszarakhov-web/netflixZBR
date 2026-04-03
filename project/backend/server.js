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

// ── Раздача статических файлов фронтенда ─────────────────────────
const frontendBuildPath = path.join(__dirname, '../frontend/dist')
app.use(express.static(frontendBuildPath))

// ── Обслуживание React SPA (catch-all для React Router) ──────────
app.get('*', (req, res) => {
  const indexPath = path.join(frontendBuildPath, 'index.html')
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Frontend dist не найден:', indexPath)
      res.status(500).json({ message: 'Frontend не собран' })
    }
  })
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