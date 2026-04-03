const User    = require('../models/User')
const Movie   = require('../models/Movie')
const Comment = require('../models/Comment')
const Rating  = require('../models/Rating')
const Bookmark = require('../models/Bookmark')

// ── ДАШБОРД: общая статистика ─────────────────────────────────────
// @route  GET /api/admin/stats
// @access Admin
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalMovies,
      totalComments,
      totalRatings,
      totalBookmarks,
      bannedUsers,
      newUsersToday,
    ] = await Promise.all([
      User.countDocuments(),
      Movie.countDocuments({ isHidden: false }),
      Comment.countDocuments({ isHidden: false }),
      Rating.countDocuments(),
      Bookmark.countDocuments(),
      User.countDocuments({ isBanned: true }),
      User.countDocuments({
        createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      }),
    ])

    // Топ фильмов по просмотрам
    const topMovies = await Movie.find({ isHidden: false })
      .sort({ viewCount: -1 })
      .limit(5)
      .select('id title viewCount rating type poster')

    // Распределение контента по типу
    const contentByType = await Movie.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ])

    // Последние зарегистрированные пользователи
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('username email role createdAt lastLogin')

    res.json({
      counts: {
        totalUsers,
        totalMovies,
        totalComments,
        totalRatings,
        totalBookmarks,
        bannedUsers,
        newUsersToday,
      },
      topMovies,
      contentByType,
      recentUsers,
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// ── ПОЛЬЗОВАТЕЛИ ─────────────────────────────────────────────────

// @route  GET /api/admin/users
// @access Admin
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', role = '', banned = '' } = req.query

    const filter = {}
    if (search) {
      filter.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email:    { $regex: search, $options: 'i' } },
      ]
    }
    if (role)   filter.role     = role
    if (banned) filter.isBanned = banned === 'true'

    const total = await User.countDocuments(filter)
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))

    res.json({
      users,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @route  PUT /api/admin/users/:id/role
// @access Admin
const changeUserRole = async (req, res) => {
  try {
    const { role } = req.body
    if (!['user', 'moderator', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Недопустимая роль' })
    }

    // Нельзя понизить себя
    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'Нельзя изменить собственную роль' })
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password')

    if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

    res.json({ message: `Роль пользователя изменена на ${role}`, user })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @route  PUT /api/admin/users/:id/ban
// @access Admin, Moderator
const banUser = async (req, res) => {
  try {
    const { reason } = req.body

    if (req.params.id === req.user._id.toString()) {
      return res.status(400).json({ message: 'Нельзя заблокировать самого себя' })
    }

    const target = await User.findById(req.params.id)
    if (!target) return res.status(404).json({ message: 'Пользователь не найден' })

    // Модератор не может банить других модераторов и админов
    if (req.user.role === 'moderator' && ['admin', 'moderator'].includes(target.role)) {
      return res.status(403).json({ message: 'Недостаточно прав' })
    }

    target.isBanned  = true
    target.banReason = reason || 'Нарушение правил'
    await target.save()

    res.json({ message: `Пользователь ${target.username} заблокирован`, user: target })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @route  PUT /api/admin/users/:id/unban
// @access Admin, Moderator
const unbanUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBanned: false, banReason: null },
      { new: true }
    ).select('-password')

    if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

    res.json({ message: `Пользователь ${user.username} разблокирован`, user })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// ── КОНТЕНТ: фильмы ───────────────────────────────────────────────

// @route  GET /api/admin/movies
// @access Admin, Moderator
const getAdminMovies = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', type = '' } = req.query

    const filter = {}
    if (search) filter.title = { $regex: search, $options: 'i' }
    if (type)   filter.type  = type

    const total  = await Movie.countDocuments(filter)
    const movies = await Movie.find(filter)
      .sort({ id: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('id title type year rating isFeatured isHidden viewCount')

    res.json({
      movies,
      total,
      page:  Number(page),
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @route  PUT /api/admin/movies/:id/toggle-hidden
// @access Admin, Moderator
const toggleMovieHidden = async (req, res) => {
  try {
    const movie = await Movie.findOne({ id: Number(req.params.id) })
    if (!movie) return res.status(404).json({ message: 'Фильм не найден' })

    movie.isHidden = !movie.isHidden
    await movie.save()

    res.json({
      message: movie.isHidden ? 'Фильм скрыт из каталога' : 'Фильм снова виден',
      movie,
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @route  PUT /api/admin/movies/:id/toggle-featured
// @access Admin
const toggleMovieFeatured = async (req, res) => {
  try {
    const movie = await Movie.findOne({ id: Number(req.params.id) })
    if (!movie) return res.status(404).json({ message: 'Фильм не найден' })

    movie.isFeatured = !movie.isFeatured
    await movie.save()

    res.json({
      message: movie.isFeatured ? 'Фильм добавлен в рекомендации' : 'Фильм убран из рекомендаций',
      movie,
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// ── КОММЕНТАРИИ ───────────────────────────────────────────────────

// @route  GET /api/admin/comments
// @access Admin, Moderator
const getAllComments = async (req, res) => {
  try {
    const { page = 1, limit = 20, hidden = '' } = req.query

    const filter = {}
    if (hidden) filter.isHidden = hidden === 'true'

    const total    = await Comment.countDocuments(filter)
    const comments = await Comment.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate('user', 'username email')

    res.json({
      comments,
      total,
      page:  Number(page),
      pages: Math.ceil(total / limit),
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @route  PUT /api/admin/comments/:id/hide
// @access Admin, Moderator
const hideComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { isHidden: true },
      { new: true }
    )
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' })

    res.json({ message: 'Комментарий скрыт', comment })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @route  DELETE /api/admin/comments/:id
// @access Admin
const deleteCommentAdmin = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' })

    res.json({ message: 'Комментарий удалён' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

module.exports = {
  getDashboardStats,
  getUsers, changeUserRole, banUser, unbanUser,
  getAdminMovies, toggleMovieHidden, toggleMovieFeatured,
  getAllComments, hideComment, deleteCommentAdmin,
}
