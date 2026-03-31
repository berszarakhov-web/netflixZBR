import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.sub}>Возможно, она была удалена или адрес введён неверно.</p>
      <button className={styles.btn} onClick={() => navigate('/')}>
        На главную
      </button>
    </div>
  )
}

export default NotFound
