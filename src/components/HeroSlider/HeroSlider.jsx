// ============================================================
// HeroSlider.jsx — Слайдер для главной страницы
//
// Особенности:
//   - Управление через стрелки влево/вправо
//   - На первом слайде левая стрелка скрыта
//   - Плавная смена фонового изображения всей секции (transition)
//   - Анимация контента при смене слайда
// ============================================================

import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import styles from './HeroSlider.module.css'

function HeroSlider({ items = [] }) {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const navigate = useNavigate()

  const goTo = useCallback((index) => {
    if (animating || index === current) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 300)
  }, [animating, current])

  const prev = () => goTo(current - 1)
  const next = () => goTo(current + 1)

  if (!items.length) return null

  const slide = items[current]

  return (
    <section className={styles.hero}>
      {/* Фоновые слои для каждого слайда — плавный переход через opacity */}
      {items.map((item, i) => (
        <div
          key={item.id}
          className={`${styles.bg} ${i === current ? styles.bgActive : ''}`}
          style={{ backgroundImage: `url(${item.backdrop || item.poster})` }}
        />
      ))}

      {/* Градиент поверх фона */}
      <div className={styles.bgOverlay} />

      {/* Контент слайда */}
      <div className={`${styles.content} ${animating ? styles.contentOut : styles.contentIn}`}>
        <div className={styles.tag}>
          {slide.type === 'series' ? '📺 Сериал' : slide.type === 'anime' ? '⛩ Аниме' : '🎬 Фильм'}
        </div>

        <h1 className={styles.title}>{slide.title}</h1>

        <div className={styles.meta}>
          <span className={styles.rating}>★ {slide.rating}</span>
          <span className={styles.sep}>•</span>
          <span>{slide.year}</span>
          <span className={styles.sep}>•</span>
          <span>{slide.genres.join(' · ')}</span>
          {slide.seasons && (
            <>
              <span className={styles.sep}>•</span>
              <span>{slide.seasons} сез.</span>
            </>
          )}
        </div>

        <p className={styles.desc}>{slide.description}</p>

        <div className={styles.btns}>
          <button className={styles.btnPlay} onClick={() => navigate(`/movie/${slide.id}`)}>
            ▶ Смотреть
          </button>
          <div className={styles.bookmarkWrap}>
            <BookmarkButton movieId={slide.id} />
          </div>
        </div>
      </div>

      {/* Стрелки */}
      {current > 0 && (
        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Предыдущий">
          ‹
        </button>
      )}
      {current < items.length - 1 && (
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Следующий">
          ›
        </button>
      )}

      {/* Точки-индикаторы */}
      <div className={styles.dots}>
        {items.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider
