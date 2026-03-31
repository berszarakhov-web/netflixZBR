// ============================================================
// GenreFilter.jsx — фильтр по жанрам
//
// Props:
//   genres        — массив доступных жанров (строки)
//   activeGenre   — текущий выбранный жанр
//   onSelect      — callback при выборе жанра
//
// Подъём состояния (lifting state up):
//   Состояние activeGenre хранится в родительском компоненте (Catalog).
//   GenreFilter только отображает и вызывает onSelect.
//   Это демонстрирует требование ТЗ по lifting state up.
// ============================================================

import styles from './GenreFilter.module.css'

function GenreFilter({ genres, activeGenre, onSelect }) {
  return (
    <div className={styles.wrap}>
      {genres.map((genre) => (
        <button
          key={genre}
          className={`${styles.chip} ${activeGenre === genre ? styles.active : ''}`}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter
