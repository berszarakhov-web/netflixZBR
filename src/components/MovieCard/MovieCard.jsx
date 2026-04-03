// MovieCard.jsx — карточка фильма с прогресс-баром просмотра

import { useNavigate } from 'react-router-dom'
import BookmarkButton from '../BookmarkButton/BookmarkButton'
import { useWatchHistory } from '../../context/WatchHistoryContext'
import styles from './MovieCard.module.css'

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const { getProgress } = useWatchHistory()
  const progress = getProgress(movie.id)

  return (
    <div className={styles.card} onClick={() => navigate(`/movie/${movie.id}`)}>
      <div className={styles.posterWrap}>
        <img
          src={movie.poster}
          alt={movie.title}
          className={styles.poster}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = `https://placehold.co/200x300/1a1a2e/e8a020?text=${encodeURIComponent(movie.title)}`
          }}
        />

        {/* Прогресс-бар просмотра */}
        {progress > 0 && (
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        )}

        <div className={styles.overlay}>
          <div className={styles.playBtn}>▶</div>
          {progress > 0 && (
            <div className={styles.progressBadge}>{Math.round(progress)}%</div>
          )}
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <BookmarkButton movieId={movie.id} movieTitle={movie.title} />
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.title}>{movie.title}</div>
        <div className={styles.meta}>
          <span className={styles.year}>{movie.year}</span>
          <span className={styles.rating}>★ {movie.rating}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
