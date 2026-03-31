import styles from './SkeletonCard.module.css'

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.poster} />
      <div className={styles.info}>
        <div className={styles.title} />
        <div className={styles.meta}>
          <div className={styles.chip} />
          <div className={styles.chip} />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCard
