import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { apiGetBookmarks, apiAddBookmark, apiRemoveBookmark } from '../api'

const BookmarksContext = createContext(null)

export function BookmarksProvider({ children }) {
  const { currentUser } = useAuth()
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    if (currentUser) {
      apiGetBookmarks()
        .then(ids => setBookmarks(ids))
        .catch(() => setBookmarks([]))
    } else {
      setBookmarks([])
    }
  }, [currentUser])

  const addBookmark = async (movieId) => {
    try {
      await apiAddBookmark(movieId)
      setBookmarks(prev => [...prev, movieId])
    } catch (e) {
      console.error('Ошибка добавления закладки:', e.message)
    }
  }

  const removeBookmark = async (movieId) => {
    try {
      await apiRemoveBookmark(movieId)
      setBookmarks(prev => prev.filter(id => id !== movieId))
    } catch (e) {
      console.error('Ошибка удаления закладки:', e.message)
    }
  }

  const isBookmarked = (movieId) => bookmarks.includes(movieId)

  const toggleBookmark = (movieId) => {
    isBookmarked(movieId) ? removeBookmark(movieId) : addBookmark(movieId)
  }

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}

export const useBookmarks = () => useContext(BookmarksContext)
