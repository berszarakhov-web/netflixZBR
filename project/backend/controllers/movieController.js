const Movie = require('../models/Movie')

// @desc   Получить все фильмы (с фильтрами и пагинацией)
// @route  GET /api/movies?type=movie&genre=Боевик&search=матрица&page=1&limit=20&sort=rating
// @access Public
const getMovies = async (req, res) => {
  try {
    const {
      type, genre, search,
      page = 1, limit = 100,
      sort = 'id', order = 'asc',
    } = req.query

    const filter = { isHidden: false }

    if (type)  filter.type = type
    if (genre) filter.genres = genre

    if (search) {
      filter.$or = [
        { title:         { $regex: search, $options: 'i' } },
        { originalTitle: { $regex: search, $options: 'i' } },
        { description:   { $regex: search, $options: 'i' } },
      ]
    }

    const sortOrder  = order === 'desc' ? -1 : 1
    const sortConfig = { [sort]: sortOrder }

    const total  = await Movie.countDocuments(filter)
    const movies = await Movie.find(filter)
      .sort(sortConfig)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))

    res.json({ movies, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Получить фильм по id + увеличить счётчик просмотров
// @route  GET /api/movies/:id
// @access Public
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { id: Number(req.params.id), isHidden: false },
      { $inc: { viewCount: 1 } },
      { new: true }
    )
    if (!movie) return res.status(404).json({ message: 'Фильм не найден' })
    res.json(movie)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Получить похожие фильмы
// @route  GET /api/movies/:id/related
// @access Public
const getRelatedMovies = async (req, res) => {
  try {
    const movie = await Movie.findOne({ id: Number(req.params.id) })
    if (!movie) return res.status(404).json({ message: 'Фильм не найден' })

    const related = await Movie.find({
      id:      { $ne: movie.id },
      genres:  { $in: movie.genres },
      type:    movie.type,
      isHidden: false,
    })
      .sort({ rating: -1 })
      .limit(8)
      .select('id title poster rating year genres type')

    res.json(related)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Поиск по тексту
// @route  GET /api/movies/search?q=матрица
// @access Public
const searchMovies = async (req, res) => {
  try {
    const { q } = req.query
    if (!q || q.length < 2) return res.json([])

    const movies = await Movie.find({
      isHidden: false,
      $or: [
        { title:       { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    })
      .limit(10)
      .select('id title poster rating year type genres')

    res.json(movies)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Создать фильм
// @route  POST /api/movies
// @access Admin
const createMovie = async (req, res) => {
  try {
    // Автоинкремент id
    const last = await Movie.findOne().sort({ id: -1 }).select('id')
    const newId = (last?.id || 0) + 1

    const movie = await Movie.create({
      ...req.body,
      id: req.body.id || newId,
      addedBy: req.user._id,
    })
    res.status(201).json(movie)
  } catch (error) {
    res.status(400).json({ message: 'Ошибка создания', error: error.message })
  }
}

// @desc   Обновить фильм
// @route  PUT /api/movies/:id
// @access Admin
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    )
    if (!movie) return res.status(404).json({ message: 'Фильм не найден' })
    res.json(movie)
  } catch (error) {
    res.status(400).json({ message: 'Ошибка обновления', error: error.message })
  }
}

// @desc   Удалить фильм
// @route  DELETE /api/movies/:id
// @access Admin
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({ id: Number(req.params.id) })
    if (!movie) return res.status(404).json({ message: 'Фильм не найден' })
    res.json({ message: 'Фильм удалён' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

module.exports = {
  getMovies, getMovieById, getRelatedMovies, searchMovies,
  createMovie, updateMovie, deleteMovie,
}
