import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useAuth } from './AuthContext'

const WatchHistoryContext = createContext(null)

export function WatchHistoryProvider({ children }) {
  const { currentUser } = useAuth()
  const [history,  setHistory]  = useState([])
  const [progress, setProgress] = useState({})

  const historyKey  = currentUser ? `timeline_history_${currentUser.email}`  : null
  const progressKey = currentUser ? `timeline_progress_${currentUser.email}` : null

  // Загружаем историю и прогресс при смене пользователя
  useEffect(() => {
    if (historyKey) {
      setHistory(JSON.parse(localStorage.getItem(historyKey)  || '[]'))
      setProgress(JSON.parse(localStorage.getItem(progressKey) || '{}'))
    } else {
      setHistory([])
      setProgress({})
    }
  }, [historyKey, progressKey])

  // Сохраняем историю при изменении
  useEffect(() => {
    if (historyKey) {
      localStorage.setItem(historyKey, JSON.stringify(history))
    }
  }, [history, historyKey])

  const addToHistory = useCallback((movieId) => {
    setHistory(prev => {
      const filtered = prev.filter(id => id !== movieId)
      return [movieId, ...filtered].slice(0, 20)
    })
  }, [])

  const saveProgress = useCallback((movieId, pct) => {
    setProgress(prev => {
      const updated = { ...prev, [movieId]: { pct, updatedAt: Date.now() } }
      if (progressKey) {
        localStorage.setItem(progressKey, JSON.stringify(updated))
      }
      return updated
    })
  }, [progressKey])

  const getProgress = useCallback((movieId) => progress[movieId]?.pct || 0, [progress])

  return (
    <WatchHistoryContext.Provider value={{ history, addToHistory, saveProgress, getProgress }}>
      {children}
    </WatchHistoryContext.Provider>
  )
}

export const useWatchHistory = () => useContext(WatchHistoryContext)
