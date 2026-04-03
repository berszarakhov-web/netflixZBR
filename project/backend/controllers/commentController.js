const Comment = require('../models/Comment')
const User    = require('../models/User')

// @desc   Получить комментарии к фильму
// @route  GET /api/comments/:movieId
// @access Public
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      movieId:  Number(req.params.movieId),
      isHidden: false,
    }).sort({ createdAt: -1 })

    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Добавить комментарий
// @route  POST /api/comments
// @access Private
const addComment = async (req, res) => {
  try {
    const { movieId, text, rating } = req.body
    if (!movieId || !text) {
      return res.status(400).json({ message: 'movieId и text обязательны' })
    }
    if (text.length > 500) {
      return res.status(400).json({ message: 'Комментарий не должен превышать 500 символов' })
    }

    const comment = await Comment.create({
      movieId,
      user:     req.user._id,
      username: req.user.username,
      text,
      rating: rating || null,
    })

    // Обновляем счётчик комментариев пользователя
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.commentsCount': 1 },
    })

    res.status(201).json(comment)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Удалить свой комментарий
// @route  DELETE /api/comments/:id
// @access Private
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' })

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Можно удалять только свои комментарии' })
    }

    await comment.deleteOne()

    await User.findByIdAndUpdate(req.user._id, {
      $inc: { 'stats.commentsCount': -1 },
    })

    res.json({ message: 'Комментарий удалён' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Лайкнуть / снять лайк с комментария
// @route  POST /api/comments/:id/like
// @access Private
const toggleLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (!comment) return res.status(404).json({ message: 'Комментарий не найден' })

    const userId   = req.user._id.toString()
    const hasLiked = comment.likes.map(id => id.toString()).includes(userId)

    if (hasLiked) {
      comment.likes      = comment.likes.filter(id => id.toString() !== userId)
      comment.likesCount = Math.max(0, comment.likesCount - 1)
    } else {
      comment.likes.push(req.user._id)
      comment.likesCount += 1
    }

    await comment.save()

    res.json({
      liked:      !hasLiked,
      likesCount: comment.likesCount,
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

module.exports = { getComments, addComment, deleteComment, toggleLike }
