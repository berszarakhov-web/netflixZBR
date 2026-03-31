// Calendar.jsx — Календарь релизов новых серий
// Показывает сериалы и аниме из закладок пользователя у которых есть nextEpisode

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchAll } from '../../data/movies'
import { useBookmarks } from '../../context/BookmarksContext'
import { useAuth } from '../../context/AuthContext'
import styles from './Calendar.module.css'

// Месяцы на русском
const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  // 0=вс 1=пн ... переводим в понедельник=0
  const d = new Date(year, month, 1).getDay()
  return d === 0 ? 6 : d - 1
}

export default function Calendar() {
  const navigate   = useNavigate()
  const { bookmarks }     = useBookmarks()
  const { currentUser }   = useAuth()
  const [allContent, setAll] = useState([])
  const today = new Date()
  const [viewYear,  setViewYear]  = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  useEffect(() => {
    fetchAll().then(setAll)
  }, [])

  // Только сериалы/аниме с датой выхода
  const upcoming = allContent.filter(
    item => item.nextEpisode && (item.type === 'series' || item.type === 'anime')
  )

  // Из закладок — те что в upcoming
  const bookmarkedUpcoming = upcoming.filter(item => bookmarks.includes(item.id))

  // Все остальные upcoming (не в закладках)
  const otherUpcoming = upcoming.filter(item => !bookmarks.includes(item.id))

  // Строим Map: 'YYYY-MM-DD' -> [items]
  const eventMap = {}
  upcoming.forEach(item => {
    const key = item.nextEpisode
    if (!eventMap[key]) eventMap[key] = []
    eventMap[key].push(item)
  })

  // Дни текущего месяца
  const daysInMonth  = getDaysInMonth(viewYear, viewMonth)
  const firstWeekday = getFirstDayOfMonth(viewYear, viewMonth)

  const cells = []
  // Пустые ячейки в начале
  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const daysUntil = (iso) => {
    const diff = new Date(iso) - new Date(today.toDateString())
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (days < 0) return 'Вышло'
    if (days === 0) return 'Сегодня!'
    if (days === 1) return 'Завтра'
    return `через ${days} дн.`
  }

  const typeIcon = (type) => type === 'anime' ? '⛩' : '📺'

  return (
    <div className={styles.page}>
      {/* Заголовок */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>📅 Календарь релизов</h1>
        <p className={styles.pageSubtitle}>
          Следите за выходом новых серий ваших любимых сериалов и аниме
        </p>
      </div>

      <div className={styles.layout}>
        {/* ─── Левая колонка: список ─── */}
        <div className={styles.listCol}>

          {/* Закладки */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>
              ♥ Из ваших закладок
              <span className={styles.blockCount}>{bookmarkedUpcoming.length}</span>
            </h2>

            {!currentUser ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>🔒</div>
                <p>Войдите, чтобы видеть релизы из закладок</p>
                <button className={styles.loginBtn} onClick={() => navigate('/login')}>
                  Войти
                </button>
              </div>
            ) : bookmarkedUpcoming.length === 0 ? (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>🔖</div>
                <p>Добавьте сериалы или аниме в закладки, чтобы отслеживать релизы</p>
              </div>
            ) : (
              <div className={styles.eventList}>
                {bookmarkedUpcoming
                  .sort((a, b) => new Date(a.nextEpisode) - new Date(b.nextEpisode))
                  .map(item => (
                    <div
                      key={item.id}
                      className={`${styles.eventCard} ${styles.eventCardBookmarked}`}
                      onClick={() => navigate(`/movie/${item.id}`)}
                    >
                      <img src={item.poster} alt={item.title} className={styles.eventPoster} />
                      <div className={styles.eventInfo}>
                        <div className={styles.eventTypeRow}>
                          <span className={styles.eventTypeIcon}>{typeIcon(item.type)}</span>
                          <span className={styles.eventType}>
                            {item.type === 'anime' ? 'Аниме' : 'Сериал'} · Сезон {item.seasons}
                          </span>
                        </div>
                        <div className={styles.eventTitle}>{item.title}</div>
                        <div className={styles.eventDate}>{formatDate(item.nextEpisode)}</div>
                      </div>
                      <div className={styles.eventCountdown}>
                        {daysUntil(item.nextEpisode)}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Все остальные */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>
              🌍 Все предстоящие релизы
              <span className={styles.blockCount}>{otherUpcoming.length}</span>
            </h2>
            <div className={styles.eventList}>
              {otherUpcoming
                .sort((a, b) => new Date(a.nextEpisode) - new Date(b.nextEpisode))
                .map(item => (
                  <div
                    key={item.id}
                    className={styles.eventCard}
                    onClick={() => navigate(`/movie/${item.id}`)}
                  >
                    <img src={item.poster} alt={item.title} className={styles.eventPoster} />
                    <div className={styles.eventInfo}>
                      <div className={styles.eventTypeRow}>
                        <span className={styles.eventTypeIcon}>{typeIcon(item.type)}</span>
                        <span className={styles.eventType}>
                          {item.type === 'anime' ? 'Аниме' : 'Сериал'} · Сезон {item.seasons}
                        </span>
                      </div>
                      <div className={styles.eventTitle}>{item.title}</div>
                      <div className={styles.eventDate}>{formatDate(item.nextEpisode)}</div>
                    </div>
                    <div className={styles.eventCountdown}>
                      {daysUntil(item.nextEpisode)}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* ─── Правая колонка: мини-календарь ─── */}
        <div className={styles.calCol}>
          <div className={styles.calCard}>
            {/* Навигация по месяцам */}
            <div className={styles.calHeader}>
              <button className={styles.calNavBtn} onClick={prevMonth}>‹</button>
              <span className={styles.calMonth}>{MONTHS[viewMonth]} {viewYear}</span>
              <button className={styles.calNavBtn} onClick={nextMonth}>›</button>
            </div>

            {/* Дни недели */}
            <div className={styles.calWeekdays}>
              {WEEKDAYS.map(d => (
                <div key={d} className={styles.calWeekday}>{d}</div>
              ))}
            </div>

            {/* Сетка дней */}
            <div className={styles.calGrid}>
              {cells.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} className={styles.calCell} />

                const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                const events = eventMap[iso] || []
                const isToday = (
                  today.getFullYear() === viewYear &&
                  today.getMonth() === viewMonth &&
                  today.getDate() === day
                )
                const hasBookmarked = events.some(e => bookmarks.includes(e.id))

                return (
                  <div
                    key={day}
                    className={`
                      ${styles.calCell}
                      ${isToday ? styles.calCellToday : ''}
                      ${events.length > 0 ? styles.calCellEvent : ''}
                      ${hasBookmarked ? styles.calCellBookmarked : ''}
                    `}
                    title={events.map(e => e.title).join(', ')}
                  >
                    <span className={styles.calDay}>{day}</span>
                    {events.length > 0 && (
                      <div className={styles.calDots}>
                        {events.slice(0, 3).map((e, idx) => (
                          <span
                            key={idx}
                            className={`${styles.calDot} ${bookmarks.includes(e.id) ? styles.calDotBookmarked : ''}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Легенда */}
            <div className={styles.calLegend}>
              <div className={styles.legendItem}>
                <span className={`${styles.calDot} ${styles.calDotBookmarked}`} />
                <span>Из закладок</span>
              </div>
              <div className={styles.legendItem}>
                <span className={styles.calDot} />
                <span>Другие</span>
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.calCell} ${styles.calCellToday} ${styles.legendCell}`}>1</span>
                <span>Сегодня</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
