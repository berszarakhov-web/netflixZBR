import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const RatingsContext = createContext(null)

export function RatingsProvider({ children }) {
  const { currentUser } = useAuth()
  const [ratings, setRatings] = useState({})

  const storageKey = currentUser ? `timeline_ratings_${currentUser.email}` : null

  useEffect(() => {
    if (storageKey) {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}')
      setRatings(saved)
    } else {
      setRatings({})
    }
  }, [storageKey])

  const rateMovie = (movieId, stars) => {
    const updated = { ...ratings, [movieId]: stars }
    setRatings(updated)
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(updated))
    }
  }

  const getRating = (movieId) => ratings[movieId] || 0

  return (
    <RatingsContext.Provider value={{ ratings, rateMovie, getRating }}>
      {children}
    </RatingsContext.Provider>
  )
}

export const useRatings = () => useContext(RatingsContext)
