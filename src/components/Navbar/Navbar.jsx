import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import SearchBar from '../SearchBar/SearchBar'
import styles from './Navbar.module.css'

function Navbar() {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Закрыть поиск при клике вне
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        TimeLine<span className={styles.dot}></span>
      </NavLink>

      <ul className={styles.links}>
        <li><NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''}>Главная</NavLink></li>
        <li><NavLink to="/catalog"  className={({ isActive }) => isActive ? styles.active : ''}>Фильмы</NavLink></li>
        <li><NavLink to="/series"   className={({ isActive }) => isActive ? styles.active : ''}>Сериалы</NavLink></li>
        <li><NavLink to="/anime"     className={({ isActive }) => isActive ? styles.active : ''}>Аниме</NavLink></li>
        <li><NavLink to="/calendar"  className={({ isActive }) => isActive ? styles.active : ''}>Календарь</NavLink></li>
      </ul>

      {/* Умный поиск */}
      <div
        ref={searchRef}
        className={`${styles.searchWrap} ${searchOpen ? styles.searchExpanded : ''}`}
      >
        {searchOpen ? (
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        ) : (
          <button
            className={styles.searchBtn}
            onClick={() => setSearchOpen(true)}
            title="Поиск"
          >
            ⌕
          </button>
        )}
        {searchOpen && (
          <button
            className={styles.searchClose}
            onClick={() => { setSearchOpen(false); setSearchQuery('') }}
          >
            ✕
          </button>
        )}
      </div>

      <div className={styles.right}>
        <ThemeToggle />
        {currentUser ? (
          <>
            <NavLink to="/profile" className={styles.btnGhost}>
              {currentUser.username}
            </NavLink>
            <button onClick={handleLogout} className={styles.btnAccent}>
              Выйти
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login"    className={styles.btnGhost}>Войти</NavLink>
            <NavLink to="/register" className={styles.btnAccent}>Регистрация</NavLink>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
