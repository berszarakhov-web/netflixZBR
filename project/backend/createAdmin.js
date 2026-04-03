// Скрипт для создания первого admin-аккаунта
// Запуск: node createAdmin.js
require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt   = require('bcrypt')
const User     = require('./models/User')

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB подключена')

    const email    = process.env.ADMIN_EMAIL    || 'admin@timeline.com'
    const password = process.env.ADMIN_PASSWORD || 'admin123'
    const username = 'Admin'

    const existing = await User.findOne({ email })
    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin'
        await existing.save()
        console.log(`✅ Пользователь ${email} повышен до admin`)
      } else {
        console.log(`ℹ️  Admin уже существует: ${email}`)
      }
      process.exit(0)
    }

    const salt     = await bcrypt.genSalt(10)
    const hashed   = await bcrypt.hash(password, salt)

    await User.create({
      username,
      email,
      password: hashed,
      role: 'admin',
    })

    console.log(`\n✅ Admin создан!`)
    console.log(`   Email:    ${email}`)
    console.log(`   Password: ${password}`)
    console.log(`   Войдите через POST /api/users/login\n`)

    process.exit(0)
  } catch (error) {
    console.error('Ошибка:', error.message)
    process.exit(1)
  }
}

createAdmin()
