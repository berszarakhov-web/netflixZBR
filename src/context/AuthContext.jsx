import { createContext, useContext, useState, useEffect } from 'react'
import { apiRegister, apiLogin } from '../api'

// ============================================================
// AuthContext — управление авторизацией через backend API
//
// Что хранит:
//   currentUser — объект { _id, username, email } или null
//
// Что умеет:
//   register(username, email, password) — регистрирует через POST /api/users/register
//   login(email, password)             — авторизует через POST /api/users/login
//   logout()                           — очищает сессию и токен
//
// Как хранится сессия:
//   JWT токен сохраняется в localStorage под ключом 'timeline_token'
//   Данные пользователя — под ключом 'timeline_session'
// ============================================================

const AuthContext = createContext(null)

const SESSION_KEY = 'timeline_session'
const TOKEN_KEY   = 'timeline_token'

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)

  // Восстанавливаем сессию при старте
  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY)
    if (saved) {
      setCurrentUser(JSON.parse(saved))
    }
  }, [])

  // --- РЕГИСТРАЦИЯ ---
  const register = async (username, email, password) => {
    const data = await apiRegister(username, email, password)
    localStorage.setItem(TOKEN_KEY, data.token)
    const session = { _id: data._id, username: data.username, email: data.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setCurrentUser(session)
  }

  // --- ВХОД ---
  const login = async (email, password) => {
    const data = await apiLogin(email, password)
    localStorage.setItem(TOKEN_KEY, data.token)
    const session = { _id: data._id, username: data.username, email: data.email }
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setCurrentUser(session)
  }

  // --- ВЫХОД ---
  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    localStorage.removeItem(TOKEN_KEY)
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Хук для удобного доступа к контексту в любом компоненте:
// const { currentUser, login, logout } = useAuth()
export const useAuth = () => useContext(AuthContext)
