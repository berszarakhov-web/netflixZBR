// SearchBar.jsx — строка поиска с живыми подсказками (фото контента)

import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import { fetchAll } from '../../data/movies'
import styles from './SearchBar.module.css'

function SearchBar({ value, onChange }) {
  const [suggestions, setSuggestions] = useState([])
  const [allContent, setAllContent]   = useState([])
  const [open, setOpen]               = useState(false)
  const [focused, setFocused]         = useState(false)
  const wrapRef                       = useRef(null)
  const navigate                      = useNavigate()
  const debouncedValue                = useDebounce(value, 250)

  useEffect(() => {
    fetchAll().then(setAllContent)
  }, [])

  useEffect(() => {
    if (debouncedValue.trim().length < 1) {
      setSuggestions([])
      setOpen(false)
      return
    }
    const q = debouncedValue.toLowerCase()
    const found = allContent
      .filter(m => m.title.toLowerCase().includes(q))
      .slice(0, 6)
    setSuggestions(found)
    setOpen(found.length > 0)
  }, [debouncedValue, allContent])

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSelect = (item) => {
    setOpen(false)
    onChange('')
    navigate(`/movie/${item.id}`)
  }

  const highlight = (text) => {
    if (!value) return text
    const idx = text.toLowerCase().indexOf(value.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark>{text.slice(idx, idx + value.length)}</mark>
        {text.slice(idx + value.length)}
      </>
    )
  }

  const typeLabel = (type) => {
    if (type === 'series') return '📺'
    if (type === 'anime')  return '⛩'
    return '🎬'
  }

  return (
    <div
      className={`${styles.wrap} ${focused ? styles.focused : ''}`}
      ref={wrapRef}
    >
      <span className={styles.icon}>⌕</span>
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск фильмов, сериалов, аниме..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => { setFocused(true); if (suggestions.length) setOpen(true) }}
        onBlur={() => setFocused(false)}
        autoComplete="off"
      />
      {value && (
        <button className={styles.clear} onClick={() => { onChange(''); setOpen(false) }}>✕</button>
      )}

      {open && (
        <div className={styles.dropdown}>
          {suggestions.map(item => (
            <div
              key={item.id}
              className={styles.suggestion}
              onMouseDown={() => handleSelect(item)}
            >
              <img src={item.poster} alt={item.title} className={styles.suggPoster} />
              <div className={styles.suggInfo}>
                <div className={styles.suggTitle}>
                  <span className={styles.typeIcon}>{typeLabel(item.type)}</span>
                  {highlight(item.title)}
                </div>
                <div className={styles.suggMeta}>
                  <span>★ {item.rating}</span>
                  <span>{item.year}</span>
                  <span>{item.genres[0]}</span>
                </div>
              </div>
              <div className={styles.suggArrow}>→</div>
            </div>
          ))}
          <div className={styles.hint}>Нажмите для перехода на страницу</div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
