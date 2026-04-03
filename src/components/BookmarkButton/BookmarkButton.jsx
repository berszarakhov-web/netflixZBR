import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookmarks } from '../../context/BookmarksContext'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../Toast/Toast'
import styles from './BookmarkButton.module.css'

function BookmarkButton({ movieId, movieTitle }) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { currentUser } = useAuth()
  const { show } = useToast()
  const navigate = useNavigate()
  const [burst, setBurst] = useState(false)

  const saved = isBookmarked(movieId)

  const handleClick = (e) => {
    e.stopPropagation()
    if (!currentUser) {
      show('Войдите, чтобы добавить в закладки', 'info')
      navigate('/login')
      return
    }
    if (!saved) {
      setBurst(true)
      setTimeout(() => setBurst(false), 700)
      show(movieTitle ? `«${movieTitle}» добавлено в закладки ♥` : 'Добавлено в закладки ♥', 'success')
    } else {
      show('Удалено из закладок', 'info')
    }
    toggleBookmark(movieId)
  }

  return (
    <button
      className={`${styles.btn} ${saved ? styles.saved : ''} ${burst ? styles.burst : ''}`}
      onClick={handleClick}
      aria-label={saved ? 'Удалить из закладок' : 'Добавить в закладки'}
      title={saved ? 'Удалить из закладок' : 'Добавить в закладки'}
    >
      {burst && (
        <>
          <span className={`${styles.particle} ${styles.p1}`}>♥</span>
          <span className={`${styles.particle} ${styles.p2}`}>♥</span>
          <span className={`${styles.particle} ${styles.p3}`}>♥</span>
          <span className={`${styles.particle} ${styles.p4}`}>♥</span>
          <span className={`${styles.particle} ${styles.p5}`}>♥</span>
          <span className={`${styles.particle} ${styles.p6}`}>♥</span>
        </>
      )}
      <span className={styles.icon}>{saved ? '♥' : '♡'}</span>
    </button>
  )
}

export default BookmarkButton
