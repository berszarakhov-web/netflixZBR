import { createContext, useContext, useState } from 'react'
import { apiGetComments, apiAddComment, apiDeleteComment } from '../api'

const CommentsContext = createContext(null)

export function CommentsProvider({ children }) {
  const [cache, setCache] = useState({})

  const getComments = async (movieId) => {
    const comments = await apiGetComments(movieId)
    setCache(prev => ({ ...prev, [movieId]: comments }))
    return comments
  }

  const addComment = async (movieId, text, rating) => {
    const newComment = await apiAddComment(movieId, text, rating)
    setCache(prev => ({
      ...prev,
      [movieId]: [newComment, ...(prev[movieId] || [])],
    }))
    return newComment
  }

  const deleteComment = async (commentId, movieId) => {
    await apiDeleteComment(commentId)
    if (movieId) {
      setCache(prev => ({
        ...prev,
        [movieId]: (prev[movieId] || []).filter(c => c._id !== commentId),
      }))
    }
  }

  const getCachedComments = (movieId) => cache[movieId] || []

  return (
    <CommentsContext.Provider value={{ getComments, addComment, deleteComment, getCachedComments }}>
      {children}
    </CommentsContext.Provider>
  )
}

export const useComments = () => useContext(CommentsContext)
