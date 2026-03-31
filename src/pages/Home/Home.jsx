import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMovies, fetchSeries, fetchAnime } from '../../data/movies'
import MovieCard from '../../components/MovieCard/MovieCard'
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton'
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'
import LuckyPick from '../../components/LuckyPick/LuckyPick'
import styles from './Home.module.css'

function Home() {
  const [movies, setMovies]   = useState([])
  const [series, setSeries]   = useState([])
  const [anime, setAnime]     = useState([])
  const [heroIndex, setHero]  = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setError(false)
    Promise.all([fetchMovies(), fetchSeries(), fetchAnime()])
      .then(([m, s, a]) => {
        setMovies(m)
        setSeries(s)
        setAnime(a)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  // Все контент для рулетки
  const allContent = [...movies, ...series, ...anime]

  // Hero — ротация по таймеру
  useEffect(() => {
    if (!movies.length) return
    const t = setInterval(() => {
      setHero(i => (i + 1) % movies.length)
    }, 6000)
    return () => clearInterval(t)
  }, [movies])

  const hero    = movies[heroIndex]
  const popular = movies.slice(0, 6)
  const newest  = [...movies].sort((a, b) => b.year - a.year).slice(0, 5)

  if (error) {
    return (
      <div className={styles.errorState}>
        <div className={styles.errorIcon}>⚠️</div>
        <h2>Не удалось загрузить контент</h2>
        <p>Проверьте подключение к серверу и обновите страницу.</p>
        <button className={styles.retryBtn} onClick={() => window.location.reload()}>
          Обновить
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* ===== HERO ===== */}
      {loading ? (
        <div className={styles.heroSkeleton} />
      ) : hero ? (
        <section className={styles.hero}>
          <div
            className={styles.heroBg}
            style={{ backgroundImage: `url(${hero.backdrop || hero.poster})` }}
          />
          <div className={styles.heroContent}>
            <div className={styles.heroTag}>Рекомендуем</div>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
            <div className={styles.heroMeta}>
              <span className={styles.rating}>★ {hero.rating}</span>
              <span className={styles.sep}>•</span>
              <span>{hero.year}</span>
              <span className={styles.sep}>•</span>
              <span>{hero.genres.join(' · ')}</span>
            </div>
            <p className={styles.heroDesc}>{hero.description}</p>
            <div className={styles.heroBtns}>
              <button
                className={styles.btnPlay}
                onClick={() => navigate(`/movie/${hero.id}`)}
              >
                ▶ Смотреть
              </button>
              <div className={styles.bookmarkWrap}>
                <BookmarkButton movieId={hero.id} />
              </div>
            </div>
          </div>

          {/* Индикаторы Hero */}
          <div className={styles.heroDots}>
            {movies.map((_, i) => (
              <button
                key={i}
                className={`${styles.heroDot} ${i === heroIndex ? styles.heroDotActive : ''}`}
                onClick={() => setHero(i)}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* ===== ПОПУЛЯРНЫЕ ФИЛЬМЫ ===== */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Популярное</h2>
          <button className={styles.seeAll} onClick={() => navigate('/catalog')}>
            Смотреть все →
          </button>
        </div>
        <div className={styles.row}>
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : popular.map(m => <MovieCard key={m.id} movie={m} />)
          }
        </div>
      </section>

      {/* ===== РУЛЕТКА ===== */}
      {!loading && allContent.length > 0 && <LuckyPick movies={allContent} />}

      {/* ===== НОВИНКИ ===== */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Новинки</h2>
          <button className={styles.seeAll} onClick={() => navigate('/catalog')}>
            Смотреть все →
          </button>
        </div>
        <div className={styles.row}>
          {loading
            ? Array(5).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : newest.map(m => <MovieCard key={m.id} movie={m} />)
          }
        </div>
      </section>

      {/* ===== СЕРИАЛЫ ===== */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>📺 Сериалы</h2>
          <button className={styles.seeAll} onClick={() => navigate('/series')}>
            Все сериалы →
          </button>
        </div>
        <div className={styles.row}>
          {loading
            ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : series.slice(0, 5).map(m => <MovieCard key={m.id} movie={m} />)
          }
        </div>
      </section>

      {/* ===== АНИМЕ ===== */}
      <section className={styles.section} style={{ paddingBottom: 64 }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>⛩ Аниме</h2>
          <button className={styles.seeAll} onClick={() => navigate('/anime')}>
            Всё аниме →
          </button>
        </div>
        <div className={styles.row}>
          {loading
            ? Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : anime.slice(0, 5).map(m => <MovieCard key={m.id} movie={m} />)
          }
        </div>
      </section>
    </div>
  )
}

export default Home
