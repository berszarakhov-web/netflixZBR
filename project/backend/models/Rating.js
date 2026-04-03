const mongoose = require('mongoose')

// Хранит оценки пользователей в MongoDB
// Позволяет считать средний рейтинг через aggregation
const ratingSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    movieId: { type: Number, required: true },
    stars:   { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
)

// Один пользователь — одна оценка на фильм
ratingSchema.index({ user: 1, movieId: 1 }, { unique: true })

module.exports = mongoose.model('Rating', ratingSchema)
