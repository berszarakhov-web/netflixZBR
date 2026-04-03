import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useBookmarks } from '../../context/BookmarksContext'
import { useWatchHistory } from '../../context/WatchHistoryContext'
import { useRatings } from '../../context/RatingsContext'
import { useProfile } from '../../context/ProfileContext'
import { useToast } from '../../components/Toast/Toast'
import { fetchAll } from '../../data/movies'
import MovieCard from '../../components/MovieCard/MovieCard'
import styles from './Profile.module.css'

const TABS = ['Закладки', 'История', 'Оценки']

function Profile() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const { bookmarks } = useBookmarks()
  const { history } = useWatchHistory()
  const { ratings } = useRatings()
  const { avatar, saveAvatar, clearAvatar, favMovieId, setFavoriteMovie, clearFavoriteMovie } = useProfile()
  const { show } = useToast()
  const avatarInputRef = useRef(null)

  const [allMovies, setAllMovies]   = useState([])
  const [activeTab, setActiveTab]   = useState('Закладки')
  const [editName, setEditName]     = useState(false)
  const [nameInput, setNameInput]   = useState(currentUser?.username || '')
  const [saveMsg, setSaveMsg]       = useState('')
  const [showFavPicker, setShowFavPicker] = useState(false)

  useEffect(() => {
    fetchAll().then(setAllMovies)
  }, [])

  const bookmarkedMovies = allMovies.filter(m => bookmarks.includes(m.id))
  const historyMovies    = history.map(id => allMovies.find(m => m.id === id)).filter(Boolean)
  const ratedMovies      = allMovies.filter(m => ratings[m.id]).sort((a, b) => ratings[b.id] - ratings[a.id])

  // Любимый фильм для фона
  const favMovie = favMovieId ? allMovies.find(m => m.id === favMovieId) : null

  const initials = (nameInput || currentUser?.username || '?')
    .split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  // Загрузка аватара
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      show('Файл слишком большой. Максимум 2 МБ', 'error')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      saveAvatar(ev.target.result)
      show('Аватар обновлён ✓', 'success')
    }
    reader.readAsDataURL(file)
  }

  const handleSaveName = () => {
    if (!nameInput.trim()) return
    setEditName(false)
    setSaveMsg('Имя обновлено!')
    show('Имя обновлено ✓', 'success')
    setTimeout(() => setSaveMsg(''), 2000)
  }

  const tabContent = {
    'Закладки': bookmarkedMovies,
    'История':  historyMovies,
    'Оценки':   ratedMovies,
  }
  const currentTabData = tabContent[activeTab]

  // Топ жанр пользователя
  const topGenre = (() => {
    const genreCount = {}
    historyMovies.forEach(m => m.genres.forEach(g => { genreCount[g] = (genreCount[g] || 0) + 1 }))
    const sorted = Object.entries(genreCount).sort((a, b) => b[1] - a[1])
    return sorted[0]?.[0] || null
  })()

  return (
    <div className={styles.page}>

      {/* ===== HERO-БАННЕР (фон — любимый фильм) ===== */}
      <div
        className={styles.heroBanner}
        style={favMovie ? { backgroundImage: `url(${favMovie.backdrop || favMovie.poster})` } : {}}
      >
        <div className={styles.heroBannerOverlay} />
        {favMovie && (
          <div className={styles.heroBannerLabel}>
            <span>❤️ Любимый фильм: </span>
            <strong>{favMovie.title}</strong>
            <button className={styles.changeFavBtn} onClick={() => setShowFavPicker(true)}>
              Изменить
            </button>
          </div>
        )}
        {!favMovie && (
          <button className={styles.setFavBtn} onClick={() => setShowFavPicker(true)}>
            + Выбрать любимый фильм для фона
          </button>
        )}
      </div>

      <div className={styles.layout}>

        {/* ===== КАРТОЧКА ПОЛЬЗОВАТЕЛЯ ===== */}
        <aside className={styles.card}>

          {/* Аватар с загрузкой */}
          <div className={styles.avatarWrap} onClick={() => avatarInputRef.current?.click()} title="Нажмите, чтобы изменить аватар">
            {avatar ? (
              <img src={avatar} alt="Аватар" className={styles.avatarImg} />
            ) : (
              <div className={styles.avatar}>{initials}</div>
            )}
            <div className={styles.avatarOverlay}>📷</div>
          </div>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={handleAvatarChange}
          />
          {avatar && (
            <button className={styles.removeAvatarBtn} onClick={() => { clearAvatar(); show('Аватар удалён', 'info') }}>
              Удалить фото
            </button>
          )}

          {/* Имя */}
          {editName ? (
            <div className={styles.editWrap}>
              <input
                className={styles.nameInput}
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                autoFocus
                maxLength={30}
              />
              <div className={styles.editBtns}>
                <button className={styles.saveBtn} onClick={handleSaveName} disabled={!nameInput.trim()}>
                  Сохранить
                </button>
                <button className={styles.cancelBtn} onClick={() => { setEditName(false); setNameInput(currentUser?.username || '') }}>
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.nameRow}>
              <div className={styles.name}>{nameInput || currentUser?.username}</div>
              <button className={styles.editBtn} onClick={() => setEditName(true)} title="Редактировать">✎</button>
            </div>
          )}
          {saveMsg && <div className={styles.saveMsg}>{saveMsg}</div>}
          <div className={styles.email}>{currentUser?.email}</div>

          {/* Статистика */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statNum}>{bookmarks.length}</div>
              <div className={styles.statLbl}>Закладки</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>{history.length}</div>
              <div className={styles.statLbl}>История</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statNum}>{Object.keys(ratings).length}</div>
              <div className={styles.statLbl}>Оценки</div>
            </div>
          </div>

          {/* Топ жанр */}
          {topGenre && (
            <div className={styles.topGenre}>
              <span className={styles.topGenreLabel}>Любимый жанр</span>
              <span className={styles.topGenreValue}>{topGenre}</span>
            </div>
          )}

          {/* Средняя оценка */}
          {Object.keys(ratings).length > 0 && (
            <div className={styles.avgRating}>
              <span className={styles.topGenreLabel}>Средняя оценка</span>
              <span className={styles.topGenreValue}>
                ★ {(Object.values(ratings).reduce((a, b) => a + b, 0) / Object.values(ratings).length).toFixed(1)}
              </span>
            </div>
          )}

          <button className={styles.btnLogout} onClick={() => { logout(); navigate('/') }}>
            Выйти из аккаунта
          </button>
        </aside>

        {/* ===== ОСНОВНАЯ ЧАСТЬ ===== */}
        <div className={styles.main}>
          <div className={styles.tabs}>
            {TABS.map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                <span className={styles.tabCount}>{tabContent[tab].length}</span>
              </button>
            ))}
          </div>

          {currentTabData.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                {activeTab === 'Закладки' ? '🔖' : activeTab === 'История' ? '📽️' : '⭐'}
              </div>
              <p>{
                activeTab === 'Закладки' ? 'Вы ещё не добавили ни одного фильма в закладки.' :
                activeTab === 'История'  ? 'Вы ещё не смотрели ни одного фильма.' :
                'Вы ещё не оценили ни одного фильма.'
              }</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {currentTabData.map(movie => (
                <div key={movie.id} className={styles.cardWrap}>
                  <MovieCard movie={movie} />
                  {activeTab === 'Оценки' && (
                    <div className={styles.ratingBadge}>
                      {'★'.repeat(ratings[movie.id])}{'☆'.repeat(5 - ratings[movie.id])}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== МОДАЛ ВЫБОРА ЛЮБИМОГО ФИЛЬМА ===== */}
      {showFavPicker && (
        <div className={styles.modalOverlay} onClick={() => setShowFavPicker(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Выбрать любимый фильм</h3>
              <button className={styles.modalClose} onClick={() => setShowFavPicker(false)}>✕</button>
            </div>
            <p className={styles.modalSub}>Постер этого фильма станет фоном вашего профиля</p>
            {favMovieId && (
              <button className={styles.clearFavBtn} onClick={() => { clearFavoriteMovie(); setShowFavPicker(false); show('Фон профиля сброшен', 'info') }}>
                Убрать фон
              </button>
            )}
            <div className={styles.favGrid}>
              {allMovies.map(m => (
                <div
                  key={m.id}
                  className={`${styles.favItem} ${favMovieId === m.id ? styles.favItemActive : ''}`}
                  onClick={() => {
                    setFavoriteMovie(m.id)
                    setShowFavPicker(false)
                    show(`«${m.title}» теперь фон профиля ✓`, 'success')
                  }}
                >
                  <img src={m.poster} alt={m.title} onError={(e) => { e.target.style.opacity = '0.3' }} />
                  {favMovieId === m.id && <div className={styles.favCheck}>✓</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
