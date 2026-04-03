const jwt = require('jsonwebtoken')
const User = require('../models/User')

// ── Проверка JWT ──────────────────────────────────────────────────
const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        return res.status(401).json({ message: 'Пользователь не найден' })
      }

      // Проверяем бан
      if (req.user.isBanned) {
        return res.status(403).json({
          message: `Аккаунт заблокирован. Причина: ${req.user.banReason || 'не указана'}`,
        })
      }

      next()
    } catch (error) {
      return res.status(401).json({ message: 'Токен недействителен или истёк' })
    }
  } else {
    return res.status(401).json({ message: 'Нет токена, доступ запрещён' })
  }
}

// ── Проверка роли ─────────────────────────────────────────────────
// Использование: requireRole('admin') или requireRole('admin', 'moderator')
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Не авторизован' })
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Доступ запрещён. Требуется роль: ${roles.join(' или ')}`,
      })
    }
    next()
  }
}

// ── Опциональная авторизация (не падает без токена) ───────────────
const optionalAuth = async (req, res, next) => {
  const header = req.headers.authorization
  if (header && header.startsWith('Bearer')) {
    try {
      const token = header.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
    } catch {
      req.user = null
    }
  }
  next()
}

module.exports = { protect, requireRole, optionalAuth }
