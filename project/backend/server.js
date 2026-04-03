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
const fs = require('fs')

// Попробовать разные пути где может быть dist
const possiblePaths = [
  path.join(__dirname, '../frontend/dist'),           // Обычный путь
  path.join(__dirname, '../../project/frontend/dist'), // Если __dirname неправильный
  path.join(process.cwd(), 'project/frontend/dist'),  // Из текущего рабочего каталога
]

let frontendBuildPath = null
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    frontendBuildPath = p
    console.log(`✅ Frontend dist найден по пути: ${p}`)
    break
  }
}

const distExists = frontendBuildPath && fs.existsSync(frontendBuildPath)

if (distExists) {
  app.use(express.static(frontendBuildPath))
  console.log(`✅ Static files middleware активирован для: ${frontendBuildPath}`)
} else {
  console.warn(`⚠️  Frontend dist не найден. Проверенные пути:`)
  possiblePaths.forEach(p => console.warn(`   - ${p}`))
  console.warn(`   CWD: ${process.cwd()}`)
  console.warn(`   __dirname: ${__dirname}`)
}

// ── Обслуживание React SPA (catch-all для React Router) ──────────
app.get('*', (req, res) => {
  if (!frontendBuildPath || !distExists) {
    return res.status(503).json({
      message: 'Frontend не собран. Выполните: npm run build',
      info: {
        cwd: process.cwd(),
        __dirname,
        checked_paths: possiblePaths
      }
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
  console.log(`� Working directory (cwd): ${process.cwd()}`)
  console.log(`📁 Server directory (__dirname): ${__dirname}`)
  console.log(`📂 Frontend dist: ${frontendBuildPath || 'NOT FOUND'}`)
  console.log(`✅ Static files ready: ${distExists ? 'YES' : 'NO'}`)
  console.log(`${'='.repeat(60)}\n`)
});