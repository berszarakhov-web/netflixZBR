const Rating = require('../models/Rating')
const Movie  = require('../models/Movie')

// @desc   Поставить/обновить оценку
// @route  POST /api/ratings
// @access Private
const rateMovie = async (req, res) => {
  try {
    const { movieId, stars } = req.body

    if (!movieId || !stars) {
      return res.status(400).json({ message: 'movieId и stars обязательны' })
    }
    if (stars < 1 || stars > 5) {
      return res.status(400).json({ message: 'Оценка должна быть от 1 до 5' })
    }

    // Upsert: обновить или создать
    const rating = await Rating.findOneAndUpdate(
      { user: req.user._id, movieId: Number(movieId) },
      { stars },
      { upsert: true, new: true }
    )

    // Пересчитываем средний рейтинг фильма
    const stats = await Rating.aggregate([
      { $match: { movieId: Number(movieId) } },
      { $group: { _id: null, avg: { $avg: '$stars' }, count: { $sum: 1 } } },
    ])

    if (stats.length > 0) {
      await Movie.findOneAndUpdate(
        { id: Number(movieId) },
        {
          'userRating.totalStars': stats[0].avg,
          'userRating.voteCount':  stats[0].count,
        }
      )
    }

    res.json({
      rating,
      avgRating: stats[0]?.avg?.toFixed(1) || stars,
      voteCount: stats[0]?.count || 1,
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Получить мою оценку фильма
// @route  GET /api/ratings/:movieId
// @access Private
const getMyRating = async (req, res) => {
  try {
    const rating = await Rating.findOne({
      user:    req.user._id,
      movieId: Number(req.params.movieId),
    })
    res.json({ stars: rating?.stars || 0 })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Получить все мои оценки
// @route  GET /api/ratings
// @access Private
const getMyRatings = async (req, res) => {
  try {
    const ratings = await Rating.find({ user: req.user._id })
    // Возвращаем объект { movieId: stars }
    const ratingsMap = {}
    ratings.forEach(r => { ratingsMap[r.movieId] = r.stars })
    res.json(ratingsMap)
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

module.exports = { rateMovie, getMyRating, getMyRatings }
