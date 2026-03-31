import { NavLink } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.logo}>TimeLine<span className={styles.dot}></span></div>
          <p>Лучшие фильмы и сериалы в одном месте.</p>
        </div>
        <div className={styles.col}>
          <h4>Навигация</h4>
          <ul>
            <li><NavLink to="/">Главная</NavLink></li>
            <li><NavLink to="/catalog">Каталог</NavLink></li>
            <li><NavLink to="/profile">Профиль</NavLink></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2025 TimeLine. Учебный проект.</p>
      </div>
    </footer>
  )
}

export default Footer
