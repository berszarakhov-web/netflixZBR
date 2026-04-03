import { useState } from 'react'
import { useRatings } from '../../context/RatingsContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../Toast/Toast'
import styles from './StarRating.module.css'

function StarRating({ movieId }) {
  const { getRating, rateMovie } = useRatings()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { show } = useToast()
  const [hover, setHover] = useState(0)

  const current = getRating(movieId)

  const handleRate = (stars) => {
    if (!currentUser) {
      show('Войдите, чтобы оценить фильм', 'info')
      navigate('/login')
      return
    }
    rateMovie(movieId, stars)
    const labels = ['', 'Плохо', 'Так себе', 'Нормально', 'Хорошо', 'Отлично!']
    show(`Оценка: ${'★'.repeat(stars)} — ${labels[stars]}`, 'success')
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Моя оценка:</span>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            className={`${styles.star} ${star <= (hover || current) ? styles.active : ''}`}
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            aria-label={`Оценить на ${star}`}
          >
            ★
          </button>
        ))}
      </div>
      {current > 0 && (
        <span className={styles.value}>{current}/5</span>
      )}
    </div>
  )
}

export default StarRating
