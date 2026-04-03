// LuckyPick.jsx — карточная рулетка случайного выбора (FIXED)
// Исправлен баг бесконечного кручения: winner фиксируется ДО запуска tick(),
// timerRef хранит ID через closure, cleanup при unmount

import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LuckyPick.module.css'

const BASE_INTERVAL  = 80    // начальная скорость (мс)
const TOTAL_FRAMES   = 28    // сколько кадров до победителя
const SLOWDOWN_START = 10    // с какого кадра с конца начинать замедление

function LuckyPick({ movies }) {
  const navigate  = useNavigate()
  const timerRef  = useRef(null)
  const mountedRef = useRef(true)

  const [spinning, setSpinning] = useState(false)
  const [current,  setCurrent]  = useState(null)
  const [chosen,   setChosen]   = useState(null)

  // Начальная карточка
  useEffect(() => {
    if (movies.length > 0) {
      setCurrent(movies[Math.floor(Math.random() * movies.length)])
    }
  }, [movies])

  // Cleanup при unmount
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleSpin = useCallback(() => {
    if (spinning || movies.length === 0) return
    if (timerRef.current) clearTimeout(timerRef.current)

    // Фиксируем победителя ДО начала анимации
    const pool   = [...movies].sort(() => Math.random() - 0.5)
    const winner = pool[Math.floor(Math.random() * pool.length)]

    setChosen(null)
    setSpinning(true)

    let frame = 0

    const tick = () => {
      if (!mountedRef.current) return

      frame++

      // Показываем случайную карточку из пула
      const idx = frame % pool.length
      setCurrent(pool[idx])

      if (frame >= TOTAL_FRAMES) {
        // Финал — всегда показываем победителя
        setCurrent(winner)
        setChosen(winner)
        setSpinning(false)
        return
      }

      // Замедление в конце
      const remaining = TOTAL_FRAMES - frame
      let delay = BASE_INTERVAL
      if (remaining <= SLOWDOWN_START) {
        delay = BASE_INTERVAL + (SLOWDOWN_START - remaining + 1) * 60
      }

      timerRef.current = setTimeout(tick, delay)
    }

    timerRef.current = setTimeout(tick, BASE_INTERVAL)
  }, [movies, spinning])

  if (!movies.length) return null

  const displayCard = current || movies[0]

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.dice}>🎲</div>
        <div>
          <h2 className={styles.title}>Что посмотреть вечером?</h2>
          <p className={styles.sub}>Нажми — и мы выберем за тебя</p>
        </div>
      </div>

      <div className={styles.arena}>
        {/* Карточка-рулетка */}
        <div className={`${styles.cardStage} ${spinning ? styles.cardSpinning : ''} ${chosen && !spinning ? styles.cardWon : ''}`}>
          {displayCard && (
            <>
              <img
                src={displayCard.poster}
                alt={displayCard.title}
                className={styles.cardPoster}
                draggable={false}
                onError={(e) => {
                  e.target.src = `https://placehold.co/160x230/1a1a2e/e8a020?text=${encodeURIComponent(displayCard.title.slice(0, 10))}`
                }}
              />
              <div className={styles.cardOverlay}>
                <span className={styles.cardTitle}>{displayCard.title}</span>
              </div>
              <div className={styles.cardBack1} />
              <div className={styles.cardBack2} />
            </>
          )}
        </div>

        {/* Кнопка и статус */}
        <div className={styles.controls}>
          <button
            className={`${styles.btn} ${spinning ? styles.btnSpinning : ''}`}
            onClick={handleSpin}
            disabled={spinning}
          >
            {spinning ? (
              <><span className={styles.spinDot} />Выбираем...</>
            ) : chosen ? (
              '🔄 Ещё раз'
            ) : (
              '🎰 Мне повезёт!'
            )}
          </button>

          {spinning && (
            <div className={styles.dots}>
              {[0, 1, 2].map(i => (
                <span key={i} className={`${styles.dot} ${styles[`dot${i}`]}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Результат — показывается только когда НЕ крутится */}
      {chosen && !spinning && (
        <div className={styles.result} key={chosen.id}>
          <img
            src={chosen.poster}
            alt={chosen.title}
            className={styles.resultPoster}
            onError={(e) => { e.target.style.opacity = '0.3' }}
          />
          <div className={styles.resultInfo}>
            <div className={styles.resultTag}>✨ Ваш выбор на сегодня</div>
            <div className={styles.resultTitle}>{chosen.title}</div>
            <div className={styles.resultMeta}>
              <span>★ {chosen.rating}</span>
              <span>{chosen.year}</span>
              <span>{chosen.genres[0]}</span>
              {chosen.type === 'anime'  && <span>🎌 Аниме</span>}
              {chosen.type === 'series' && <span>📺 Сериал</span>}
            </div>
            <div className={styles.resultActions}>
              <button className={styles.btnWatch} onClick={() => navigate(`/movie/${chosen.id}`)}>
                ▶ Смотреть
              </button>
              <button className={styles.btnAgain} onClick={handleSpin}>
                🔄 Другой вариант
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default LuckyPick
