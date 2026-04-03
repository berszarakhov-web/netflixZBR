const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, required: true },
    title: { type: String, required: true, trim: true },
    originalTitle: { type: String, default: null },   // оригинальное название
    year: { type: Number },
    genres: [{ type: String }],
    tags: [{ type: String }],                          // доп теги: "основан на реальных событиях" и тд

    // ── Рейтинги ─────────────────────────────────────────────────
    rating: { type: Number, default: 0 },
    userRating: {
      totalStars: { type: Number, default: 0 },
      voteCount:  { type: Number, default: 0 },
    },

    // ── Описание ─────────────────────────────────────────────────
    description: { type: String },
    shortDesc:   { type: String, maxlength: 150 },    // краткое описание для карточек

    // ── Медиа ────────────────────────────────────────────────────
    poster:     { type: String },
    backdrop:   { type: String },
    trailerUrl: { type: String },

    // ── Мета ─────────────────────────────────────────────────────
    duration:  { type: Number },    // минуты
    age:       { type: Number },    // возрастной рейтинг
    country:   { type: String, default: null },
    language:  { type: String, default: null },
    studio:    { type: String, default: null },
    director:  { type: String, default: null },
    cast:      [{ type: String }],  // массив актёров

    // ── Тип контента ─────────────────────────────────────────────
    type:    { type: String, enum: ['movie', 'series', 'anime'], default: 'movie' },
    seasons: { type: Number, default: null },
    status:  { type: String, enum: ['ongoing', 'ended', 'announced', null], default: null },
    nextEpisode: { type: String, default: null },

    // ── Флаги ────────────────────────────────────────────────────
    isFeatured:  { type: Boolean, default: false },  // показывать в hero
    isHidden:    { type: Boolean, default: false },  // скрыть из каталога
    viewCount:   { type: Number,  default: 0 },      // счётчик просмотров

    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
)

// Индекс для быстрого поиска по названию
movieSchema.index({ title: 'text', originalTitle: 'text' })
movieSchema.index({ genres: 1 })
movieSchema.index({ type: 1 })
movieSchema.index({ rating: -1 })

module.exports = mongoose.model('Movie', movieSchema)
