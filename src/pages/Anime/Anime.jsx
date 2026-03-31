import { useState, useEffect, useMemo } from 'react'
import { fetchAnime } from '../../data/movies'
import MovieCard from '../../components/MovieCard/MovieCard'
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import GenreFilter from '../../components/GenreFilter/GenreFilter'
import { useDebounce } from '../../hooks/useDebounce'
import styles from './Anime.module.css'

const ANIME_GENRES = ['Все', 'Боевик', 'Драма', 'Фэнтези', 'Триллер', 'Аниме', 'Фантастика']

function Anime() {
  const [items, setItems]        = useState([])
  const [loading, setLoading]    = useState(true)
  const [searchQuery, setSearch] = useState('')
  const [activeGenre, setGenre]  = useState('Все')
  const [sortBy, setSort]        = useState('rating')

  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    fetchAnime().then(data => { setItems(data); setLoading(false) })
  }, [])

  const filtered = useMemo(() => {
    let result = items
    if (activeGenre !== 'Все') result = result.filter(m => m.genres.includes(activeGenre))
    if (debouncedSearch.trim()) result = result.filter(m => m.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    return [...result].sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : b.year - a.year)
  }, [items, activeGenre, debouncedSearch, sortBy])

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>⛩ Аниме</h1>
        <p className={styles.pageSubtitle}>Лучшие аниме-сериалы и фильмы</p>
      </div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.filterTitle}>Фильтры</h2>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Поиск</label>
            <SearchBar value={searchQuery} onChange={setSearch} />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Жанр</label>
            <GenreFilter genres={ANIME_GENRES} activeGenre={activeGenre} onSelect={setGenre} />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Сортировка</label>
            <div className={styles.sortBtns}>
              <button className={`${styles.sortBtn} ${sortBy === 'rating' ? styles.sortActive : ''}`} onClick={() => setSort('rating')}>По рейтингу</button>
              <button className={`${styles.sortBtn} ${sortBy === 'year'   ? styles.sortActive : ''}`} onClick={() => setSort('year')}>По году</button>
            </div>
          </div>
        </aside>

        <div>
          <div className={styles.resultsInfo}>
            {loading ? 'Загрузка...' : `Найдено: ${filtered.length} аниме`}
          </div>
          {loading ? (
            <div className={styles.grid}>{Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}</div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>⛩</div>
              <p>Ничего не найдено</p>
              <button onClick={() => { setSearch(''); setGenre('Все') }}>Сбросить фильтры</button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(item => <MovieCard key={item.id} movie={item} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Anime
