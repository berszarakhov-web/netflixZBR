const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    movieId:  { type: Number, required: true },
    user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true },
    text:     { type: String, required: true, trim: true, maxlength: 500 },
    rating:   { type: Number, min: 1, max: 5, default: null },

    // ── Лайки ────────────────────────────────────────────────────
    likes:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likesCount: { type: Number, default: 0 },

    // ── Статус ───────────────────────────────────────────────────
    isHidden: { type: Boolean, default: false },  // скрыт модератором
  },
  { timestamps: true }
)

commentSchema.index({ movieId: 1, createdAt: -1 })

module.exports = mongoose.model('Comment', commentSchema)
