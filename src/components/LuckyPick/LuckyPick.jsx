// LuckyPick.jsx — карточная рулетка случайного выбора
// Полностью переработана: вместо прокручивающейся ленты —
// анимированные карточки с эффектом "тасования колоды"

import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LuckyPick.module.css'

const SHUFFLE_ROUNDS = 6   // кол-во "мельканий" перед финалом
const INTERVAL_MS   = 120  // мс между сменой карточек
const SLOWDOWN_STEP = 35   // нарастание задержки при торможении

function LuckyPick({ movies }) {
  const navigate   = useNavigate()
  const timerRef   = useRef(null)

  const [spinning,  setSpinning]  = useState(false)
  const [current,   setCurrent]   = useState(null)   // карточка "на столе" во время кручения
  const [chosen,    setChosen]    = useState(null)   // финальный победитель
  const [flashIdx,  setFlashIdx]  = useState(0)      // индекс текущей карточки в shuffle

  // Инициализируем первую карточку чтобы не было пустоты
  useEffect(() => {
    if (movies.length > 0 && !current && !chosen) {
      setCurrent(movies[Math.floor(Math.random() * movies.length)])
    }
  }, [movies])

  const clearAllTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const handleSpin = useCallback(() => {
    if (spinning || movies.length === 0) return
    clearAllTimers()

    // Перемешиваем пул
    const shuffled = [...movies].sort(() => Math.random() - 0.5)
    const winner = shuffled[Math.floor(Math.random() * shuffled.length)]

    setChosen(null)
    setSpinning(true)

    let step = 0
    const totalSteps = SHUFFLE_ROUNDS * shuffled.length + Math.floor(Math.random() * 5) + 3

    const tick = (delay) => {
      timerRef.current = setTimeout(() => {
        step++
        const idx = step % shuffled.length
        setCurrent(shuffled[idx])
        setFlashIdx(idx)

        if (step >= totalSteps) {
          // Финал — показываем победителя
          setCurrent(winner)
          setChosen(winner)
          setSpinning(false)
          return
        }

        // Постепенное замедление в последних 10 шагах
        const remaining = totalSteps - step
        const newDelay = remaining <= 10
          ? delay + SLOWDOWN_STEP + remaining * 8
          : delay
        tick(newDelay)
      }, delay)
    }

    tick(INTERVAL_MS)
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
                  e.target.src = `https://placehold.co/200x300/1a1a2e/e8a020?text=${encodeURIComponent(displayCard.title.slice(0,10))}`
                }}
              />
              <div className={styles.cardOverlay}>
                <span className={styles.cardTitle}>{displayCard.title}</span>
              </div>
              {/* Декоративные карточки позади */}
              <div className={styles.cardBack1} />
              <div className={styles.cardBack2} />
            </>
          )}
        </div>

        {/* Кнопка */}
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

          {/* Прогресс-точки */}
          {spinning && (
            <div className={styles.dots}>
              {[0,1,2].map(i => (
                <span key={i} className={`${styles.dot} ${styles[`dot${i}`]}`} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Результат */}
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
