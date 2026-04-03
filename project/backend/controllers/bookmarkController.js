const Bookmark = require('../models/Bookmark')

// @desc   Получить закладки текущего пользователя
// @route  GET /api/bookmarks
// @access Private
const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id })
    const movieIds = bookmarks.map(b => b.movieId)
    res.json(movieIds)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Добавить закладку
// @route  POST /api/bookmarks
// @access Private
const addBookmark = async (req, res) => {
  try {
    const { movieId } = req.body
    if (!movieId) return res.status(400).json({ message: 'movieId обязателен' })

    const exists = await Bookmark.findOne({ user: req.user._id, movieId })
    if (exists) return res.status(400).json({ message: 'Уже в закладках' })

    const bookmark = await Bookmark.create({ user: req.user._id, movieId })
    res.status(201).json(bookmark)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Удалить закладку
// @route  DELETE /api/bookmarks/:movieId
// @access Private
const removeBookmark = async (req, res) => {
  try {
    const result = await Bookmark.findOneAndDelete({
      user: req.user._id,
      movieId: Number(req.params.movieId),
    })
    if (!result) return res.status(404).json({ message: 'Закладка не найдена' })
    res.json({ message: 'Закладка удалена' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

module.exports = { getBookmarks, addBookmark, removeBookmark }
