const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const User    = require('../models/User')

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })

// @desc   Регистрация
// @route  POST /api/users/register
// @access Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Заполните все поля' })
    }

    const userExists = await User.findOne({ email: email.toLowerCase() })
    if (userExists) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      lastLogin: new Date(),
    })

    res.status(201).json({
      _id:      user._id,
      username: user.username,
      email:    user.email,
      role:     user.role,
      avatar:   user.avatar,
      token:    generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Вход
// @route  POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Заполните все поля' })
    }

    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return res.status(401).json({ message: 'Неверный email или пароль' })
    }

    if (user.isBanned) {
      return res.status(403).json({
        message: `Аккаунт заблокирован. Причина: ${user.banReason || 'не указана'}`,
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Неверный email или пароль' })
    }

    // Обновляем дату последнего входа
    user.lastLogin = new Date()
    await user.save()

    res.json({
      _id:      user._id,
      username: user.username,
      email:    user.email,
      role:     user.role,
      avatar:   user.avatar,
      bio:      user.bio,
      stats:    user.stats,
      token:    generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Получить профиль
// @route  GET /api/users/me
// @access Private
const getMe = async (req, res) => {
  res.json({
    _id:            req.user._id,
    username:       req.user.username,
    email:          req.user.email,
    role:           req.user.role,
    bio:            req.user.bio,
    avatar:         req.user.avatar,
    favoriteGenres: req.user.favoriteGenres,
    favMovieId:     req.user.favMovieId,
    stats:          req.user.stats,
    lastLogin:      req.user.lastLogin,
    createdAt:      req.user.createdAt,
  })
}

// @desc   Обновить профиль
// @route  PUT /api/users/me
// @access Private
const updateProfile = async (req, res) => {
  try {
    const { username, bio, avatar, favoriteGenres, favMovieId } = req.body

    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

    if (username) user.username       = username.trim().slice(0, 30)
    if (bio !== undefined) user.bio   = bio.slice(0, 300)
    if (avatar !== undefined) user.avatar = avatar
    if (favoriteGenres) user.favoriteGenres = favoriteGenres
    if (favMovieId !== undefined) user.favMovieId = favMovieId

    await user.save()

    res.json({
      _id:            user._id,
      username:       user.username,
      email:          user.email,
      role:           user.role,
      bio:            user.bio,
      avatar:         user.avatar,
      favoriteGenres: user.favoriteGenres,
      favMovieId:     user.favMovieId,
    })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

// @desc   Изменить пароль
// @route  PUT /api/users/me/password
// @access Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Укажите текущий и новый пароль' })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Новый пароль должен содержать не менее 6 символов' })
    }

    const user = await User.findById(req.user._id)
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Текущий пароль неверен' })
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(newPassword, salt)
    await user.save()

    res.json({ message: 'Пароль успешно изменён' })
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message })
  }
}

module.exports = { registerUser, loginUser, getMe, updateProfile, changePassword }
