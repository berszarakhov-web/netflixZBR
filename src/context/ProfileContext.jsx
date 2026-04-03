// ProfileContext — хранит аватар и любимый фильм пользователя
import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const { currentUser } = useAuth()
  const [avatar,       setAvatar]       = useState(null)  // base64 строка
  const [favMovieId,   setFavMovieId]   = useState(null)  // id любимого фильма

  const avatarKey   = currentUser ? `timeline_avatar_${currentUser.email}`   : null
  const favKey      = currentUser ? `timeline_fav_${currentUser.email}`       : null

  useEffect(() => {
    if (avatarKey) {
      setAvatar(localStorage.getItem(avatarKey) || null)
      setFavMovieId(localStorage.getItem(favKey) ? Number(localStorage.getItem(favKey)) : null)
    } else {
      setAvatar(null)
      setFavMovieId(null)
    }
  }, [avatarKey, favKey])

  const saveAvatar = (base64) => {
    setAvatar(base64)
    if (avatarKey) localStorage.setItem(avatarKey, base64)
  }

  const clearAvatar = () => {
    setAvatar(null)
    if (avatarKey) localStorage.removeItem(avatarKey)
  }

  const setFavoriteMovie = (movieId) => {
    setFavMovieId(movieId)
    if (favKey) localStorage.setItem(favKey, String(movieId))
  }

  const clearFavoriteMovie = () => {
    setFavMovieId(null)
    if (favKey) localStorage.removeItem(favKey)
  }

  return (
    <ProfileContext.Provider value={{
      avatar, saveAvatar, clearAvatar,
      favMovieId, setFavoriteMovie, clearFavoriteMovie,
    }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)
