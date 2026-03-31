import { useState, useEffect, useMemo } from 'react'
import { fetchMovies, GENRES } from '../../data/movies'
import MovieCard from '../../components/MovieCard/MovieCard'
import SkeletonCard from '../../components/SkeletonCard/SkeletonCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import GenreFilter from '../../components/GenreFilter/GenreFilter'
import { useDebounce } from '../../hooks/useDebounce'
import styles from './Catalog.module.css'

const SORT_OPTIONS = [
  { value: 'rating', label: 'По рейтингу' },
  { value: 'year',   label: 'По году' },
  { value: 'az',     label: 'А → Я' },
]

function Catalog() {
  const [movies, setMovies]           = useState([])
  const [loading, setLoading]         = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeGenre, setActiveGenre] = useState('Все')
  const [sortBy, setSortBy]           = useState('rating')
  const [page, setPage]               = useState(1)
  const PAGE_SIZE = 8

  const debouncedSearch = useDebounce(searchQuery, 300)

  useEffect(() => {
    fetchMovies().then(data => { setMovies(data); setLoading(false) })
  }, [])

  useEffect(() => { setPage(1) }, [debouncedSearch, activeGenre, sortBy])

  const filteredMovies = useMemo(() => {
    let result = movies
    if (activeGenre !== 'Все') result = result.filter(m => m.genres.includes(activeGenre))
    if (debouncedSearch.trim()) result = result.filter(m => m.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
    return [...result].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'year')   return b.year - a.year
      return a.title.localeCompare(b.title, 'ru')
    })
  }, [movies, activeGenre, debouncedSearch, sortBy])

  const paginated = filteredMovies.slice(0, page * PAGE_SIZE)
  const hasMore   = paginated.length < filteredMovies.length

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.filterTitle}>Фильтры</h2>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Поиск</label>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Жанр</label>
            <GenreFilter genres={GENRES} activeGenre={activeGenre} onSelect={setActiveGenre} />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Сортировка</label>
            <div className={styles.sortBtns}>
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  className={`${styles.sortBtn} ${sortBy === opt.value ? styles.sortActive : ''}`}
                  onClick={() => setSortBy(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className={styles.resultsInfo}>
            {loading ? 'Загрузка...' : `Найдено: ${filteredMovies.length} фильмов`}
          </div>

          {loading ? (
            <div className={styles.grid}>{Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}</div>
          ) : filteredMovies.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🎬</div>
              <p>Ничего не найдено</p>
              <button onClick={() => { setSearchQuery(''); setActiveGenre('Все') }}>
                Сбросить фильтры
              </button>
            </div>
          ) : (
            <>
              <div className={styles.grid}>
                {paginated.map(movie => <MovieCard key={movie.id} movie={movie} />)}
              </div>
              {hasMore && (
                <div className={styles.loadMore}>
                  <button className={styles.loadMoreBtn} onClick={() => setPage(p => p + 1)}>
                    Загрузить ещё ({filteredMovies.length - paginated.length})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Catalog
