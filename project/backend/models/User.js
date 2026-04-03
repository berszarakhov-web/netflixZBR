const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Имя пользователя обязательно'],
      trim: true,
      minlength: [2, 'Имя должно быть не менее 2 символов'],
      maxlength: [30, 'Имя не должно превышать 30 символов'],
    },
    email: {
      type: String,
      required: [true, 'Email обязателен'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Введите корректный email'],
    },
    password: {
      type: String,
      required: [true, 'Пароль обязателен'],
      minlength: [6, 'Пароль должен содержать не менее 6 символов'],
    },

    // ── Роль ─────────────────────────────────────────────────────
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },

    // ── Расширенный профиль ───────────────────────────────────────
    bio: {
      type: String,
      maxlength: [300, 'Биография не должна превышать 300 символов'],
      default: '',
    },
    avatar: { type: String, default: null },
    favoriteGenres: [{ type: String }],
    favMovieId: { type: Number, default: null },

    // ── Статус аккаунта ───────────────────────────────────────────
    isActive:  { type: Boolean, default: true },
    isBanned:  { type: Boolean, default: false },
    banReason: { type: String,  default: null },

    // ── Статистика ────────────────────────────────────────────────
    stats: {
      watchedCount:   { type: Number, default: 0 },
      bookmarksCount: { type: Number, default: 0 },
      commentsCount:  { type: Number, default: 0 },
      ratingsCount:   { type: Number, default: 0 },
    },

    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
