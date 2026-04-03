const express = require('express')
const router  = express.Router()
const {
  getDashboardStats,
  getUsers, changeUserRole, banUser, unbanUser,
  getAdminMovies, toggleMovieHidden, toggleMovieFeatured,
  getAllComments, hideComment, deleteCommentAdmin,
} = require('../controllers/adminController')
const { protect, requireRole } = require('../middleware/authMiddleware')

// Все маршруты требуют авторизации
router.use(protect)

// Дашборд
router.get('/stats', requireRole('admin', 'moderator'), getDashboardStats)

// Пользователи
router.get('/users',                   requireRole('admin', 'moderator'), getUsers)
router.put('/users/:id/role',          requireRole('admin'),              changeUserRole)
router.put('/users/:id/ban',           requireRole('admin', 'moderator'), banUser)
router.put('/users/:id/unban',         requireRole('admin', 'moderator'), unbanUser)

// Фильмы
router.get('/movies',                  requireRole('admin', 'moderator'), getAdminMovies)
router.put('/movies/:id/toggle-hidden',   requireRole('admin', 'moderator'), toggleMovieHidden)
router.put('/movies/:id/toggle-featured', requireRole('admin'),              toggleMovieFeatured)

// Комментарии
router.get('/comments',                requireRole('admin', 'moderator'), getAllComments)
router.put('/comments/:id/hide',       requireRole('admin', 'moderator'), hideComment)
router.delete('/comments/:id',         requireRole('admin'),              deleteCommentAdmin)

module.exports = router
