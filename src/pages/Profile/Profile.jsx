import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useBookmarks } from '../../context/BookmarksContext'
import { useWatchHistory } from '../../context/WatchHistoryContext'
import { useRatings } from '../../context/RatingsContext'
import { fetchAll } from '../../data/movies'
import MovieCard from '../../components/MovieCard/MovieCard'
import styles from './Profile.module.css'

const TABS = ['Закладки', 'История', 'Оценки']

function Profile() {
  const { currentUser, logout } = useAuth()
  const { bookmarks } = useBookmarks()
  const { history } = useWatchHistory()
  const { ratings } = useRatings()
  const [allMovies, setAllMovies] = useState([])
  const [activeTab, setActiveTab] = useState('Закладки')
  const [editName, setEditName] = useState(false)
  const [nameInput, setNameInput] = useState(currentUser?.username || '')
  const [savingName, setSavingName] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  useEffect(() => {
    fetchAll().then(setAllMovies)
  }, [])

  const bookmarkedMovies = allMovies.filter(m => bookmarks.includes(m.id))
  const historyMovies = history
    .map(id => allMovies.find(m => m.id === id))
    .filter(Boolean)
  const ratedMovies = allMovies
    .filter(m => ratings[m.id])
    .sort((a, b) => ratings[b.id] - ratings[a.id])

  const initials = currentUser?.username
    ?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'

  // Сохранение имени (локально, т.к. бекенд не имеет endpoint для update profile)
  const handleSaveName = () => {
    if (!nameInput.trim()) return
    setSavingName(true)
    setTimeout(() => {
      setSavingName(false)
      setEditName(false)
      setSaveMsg('Имя обновлено!')
      setTimeout(() => setSaveMsg(''), 2000)
    }, 400)
  }

  const tabContent = {
    'Закладки': bookmarkedMovies,
    'История': historyMovies,
    'Оценки': ratedMovies,
  }

  const current = tabContent[activeTab]

  return (
    <div className={styles.page}>
      <div className={styles.layout}>

        {/* ===== КАРТОЧКА ПОЛЬЗОВАТЕЛЯ ===== */}
        <aside className={styles.card}>
          <div className={styles.avatar}>{initials}</div>

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
                <button
                  className={styles.saveBtn}
                  onClick={handleSaveName}
                  disabled={savingName || !nameInput.trim()}
                >
                  {savingName ? '...' : 'Сохранить'}
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => { setEditName(false); setNameInput(currentUser?.username || '') }}
                >
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

          <button className={styles.btnLogout} onClick={logout}>
            Выйти из аккаунта
          </button>
        </aside>

        {/* ===== ОСНОВНАЯ ЧАСТЬ ===== */}
        <div className={styles.main}>
          {/* Вкладки */}
          <div className={styles.tabs}>
            {TABS.map(tab => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                <span className={styles.tabCount}>
                  {tabContent[tab].length}
                </span>
              </button>
            ))}
          </div>

          {current.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>
                {activeTab === 'Закладки' ? '🔖' : activeTab === 'История' ? '📽️' : '⭐'}
              </div>
              <p>{
                activeTab === 'Закладки' ? 'Вы ещё не добавили ни одного фильма в закладки.' :
                activeTab === 'История' ? 'Вы ещё не смотрели ни одного фильма.' :
                'Вы ещё не оценили ни одного фильма.'
              }</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {current.map(movie => (
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
    </div>
  )
}

export default Profile
