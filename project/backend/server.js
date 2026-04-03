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
const fs = require('fs')

// Проверка наличия dist папки при старте
const distExists = fs.existsSync(frontendBuildPath)
if (distExists) {
  console.log(`✅ Frontend dist найден: ${frontendBuildPath}`)
  app.use(express.static(frontendBuildPath))
} else {
  console.warn(`⚠️  Frontend dist не найден: ${frontendBuildPath}`)
}

// ── Обслуживание React SPA (catch-all для React Router) ──────────
app.get('*', (req, res) => {
  if (!distExists) {
    return res.status(503).json({
      message: 'Frontend не собран. Выполните: npm run build',
      path: frontendBuildPath
    })
  }

  const indexPath = path.join(frontendBuildPath, 'index.html')
  
  // Проверяем, существует ли файл перед отправкой
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ index.html не найден в ${indexPath}`)
    return res.status(503).json({
      message: 'Frontend не собран корректно. Отсутствует index.html',
      expected: indexPath
    })
  }

  res.sendFile(indexPath)
})

// ── Глобальная обработка ошибок ──────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('❌ Необработанная ошибка:', {
    message: err.message,
    stack: err.stack,
    code: err.code
  })
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production' 
      ? 'Внутренняя ошибка сервера'
      : err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`🚀 Server running on port: ${PORT}`)
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`📂 Frontend build path: ${frontendBuildPath}`)
  console.log(`✅ Frontend dist exists: ${distExists}`)
  console.log(`${'='.repeat(60)}\n`)
});