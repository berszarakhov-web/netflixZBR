import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchMovieById, fetchAll } from '../../data/movies'
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton'
import StarRating from '../../components/StarRating/StarRating'
import Comments from '../../components/Comments/Comments'
import MovieCard from '../../components/MovieCard/MovieCard'
import { useWatchHistory } from '../../context/WatchHistoryContext'
import styles from './Movie.module.css'

function Movie() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie]       = useState(null)
  const [related, setRelated]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [loadError, setLoadError] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)
  const [trailerProgress, setTrailerProgress] = useState(0)
  const { addToHistory, saveProgress, getProgress } = useWatchHistory()
  const progressInterval = useRef(null)

  useEffect(() => {
    setLoading(true)
    setLoadError(false)
    setShowTrailer(false)
    clearInterval(progressInterval.current)

    Promise.all([fetchMovieById(id), fetchAll()])
      .then(([data, all]) => {
        if (!data) {
          setLoadError(true)
          setLoading(false)
          return
        }
        setMovie(data)
        addToHistory(data.id)
        const rel = all
          .filter(m => m.id !== data.id && m.genres.some(g => data.genres.includes(g)))
          .slice(0, 6)
        setRelated(rel)
        setLoading(false)
      })
      .catch(() => {
        setLoadError(true)
        setLoading(false)
      })

    return () => clearInterval(progressInterval.current)
  }, [id])

  const handleTrailerOpen = () => {
    setShowTrailer(true)
    const existing = getProgress(Number(id))
    setTrailerProgress(existing || 0)

    let pct = existing || 0
    progressInterval.current = setInterval(() => {
      pct = Math.min(pct + 0.4, 100)
      setTrailerProgress(pct)
      saveProgress(Number(id), pct)
      if (pct >= 100) clearInterval(progressInterval.current)
    }, 500)
  }

  const handleTrailerClose = () => {
    clearInterval(progressInterval.current)
    setShowTrailer(false)
  }

  if (loading) return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <p>Загружаем...</p>
    </div>
  )

  if (loadError || !movie) return (
    <div className={styles.loading}>
      <div style={{ fontSize: 48 }}>🎬</div>
      <p style={{ color: 'var(--muted)', marginTop: 12 }}>Фильм не найден</p>
      <button
        style={{ marginTop: 16, padding: '10px 24px', background: 'var(--accent)', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}
        onClick={() => navigate(-1)}
      >
        ← Назад
      </button>
    </div>
  )

  const progress = getProgress(movie.id)
  const typeLabel = movie.type === 'series' ? 'Сериал' : movie.type === 'anime' ? 'Аниме' : 'Фильм'

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div
          className={styles.backdrop}
          style={{ backgroundImage: `url(${movie.backdrop || movie.poster})` }}
        />
        <div className={styles.heroInner}>
          <div className={styles.poster}>
            <img
              src={movie.poster}
              alt={movie.title}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = `https://placehold.co/300x450/1a1a2e/e8a020?text=${encodeURIComponent(movie.title)}`
              }}
            />
            {progress > 0 && (
              <div className={styles.posterProgress}>
                <div className={styles.posterProgressFill} style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>

          <div className={styles.details}>
            <div className={styles.genres}>
              <span className={styles.typeTag}>{typeLabel}</span>
              {movie.genres.map(g => (
                <span key={g} className={styles.genre}>{g}</span>
              ))}
            </div>

            <h1 className={styles.title}>{movie.title}</h1>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statLabel}>Рейтинг</div>
                <div className={`${styles.statValue} ${styles.accent}`}>★ {movie.rating}</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statLabel}>Год</div>
                <div className={styles.statValue}>{movie.year}</div>
              </div>
              {movie.seasons ? (
                <div className={styles.stat}>
                  <div className={styles.statLabel}>Сезонов</div>
                  <div className={styles.statValue}>{movie.seasons}</div>
                </div>
              ) : (
                <div className={styles.stat}>
                  <div className={styles.statLabel}>Продолж.</div>
                  <div className={styles.statValue}>{movie.duration} мин</div>
                </div>
              )}
              <div className={styles.stat}>
                <div className={styles.statLabel}>Возраст</div>
                <div className={styles.statValue}>{movie.age}+</div>
              </div>
            </div>

            <p className={styles.desc}>{movie.description}</p>

            <div className={styles.actions}>
              <button className={styles.btnPlay} onClick={handleTrailerOpen}>▶ Смотреть</button>
              <div className={styles.bookmarkWrap}>
                <BookmarkButton movieId={movie.id} movieTitle={movie.title} />
              </div>
              <button className={styles.btnBack} onClick={() => navigate(-1)}>← Назад</button>
            </div>

            <div className={styles.starWrap}>
              <StarRating movieId={movie.id} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== ТРЕЙЛЕР ===== */}
      <section className={styles.playerWrap}>
        {showTrailer && movie.trailerUrl ? (
          <div className={styles.trailerBox}>
            <div className={styles.trailerHeader}>
              <span>Трейлер — {movie.title}</span>
              <button className={styles.closeTrailer} onClick={handleTrailerClose}>✕ Закрыть</button>
            </div>
            <iframe
              className={styles.iframe}
              src={`${movie.trailerUrl}?autoplay=1&rel=0`}
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Трейлер"
            />
            <div className={styles.trailerProgressBar}>
              <div className={styles.trailerProgressFill} style={{ width: `${trailerProgress}%` }} />
            </div>
          </div>
        ) : (
          <div className={styles.player} onClick={handleTrailerOpen}>
            <div className={styles.playerInner}>
              <div className={styles.playCircle}>▶</div>
              <p>Нажмите для просмотра трейлера</p>
              {progress > 0 && (
                <div className={styles.resumeHint}>Продолжить с {Math.round(progress)}%</div>
              )}
            </div>
          </div>
        )}
      </section>

      <div className={styles.content}>
        {/* ===== ПОХОЖИЕ ===== */}
        {related.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Похожее</h2>
            <div className={styles.relatedGrid}>
              {related.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          </section>
        )}

        {/* ===== КОММЕНТАРИИ ===== */}
        <Comments movieId={movie.id} />
      </div>
    </div>
  )
}

export default Movie
