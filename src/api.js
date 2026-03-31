const API_URL = 'http://localhost:5000/api'

const getToken = () => localStorage.getItem('timeline_token')

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
})

// Обёртка с обработкой сетевых ошибок
const safeFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options)
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || `Ошибка ${res.status}`)
    return data
  } catch (e) {
    if (e.name === 'TypeError') {
      // fetch не удался (сервер недоступен)
      throw new Error('Сервер недоступен. Убедитесь, что backend запущен.')
    }
    throw e
  }
}

// ── AUTH ─────────────────────────────────────────────────────
export const apiRegister = (username, email, password) =>
  safeFetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  })

export const apiLogin = (email, password) =>
  safeFetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

// ── MOVIES ───────────────────────────────────────────────────
export const apiGetMovies = () => safeFetch(`${API_URL}/movies`)

export const apiGetMovie  = (id) => safeFetch(`${API_URL}/movies/${id}`)

// ── BOOKMARKS ────────────────────────────────────────────────
export const apiGetBookmarks = () =>
  safeFetch(`${API_URL}/bookmarks`, { headers: authHeaders() })

export const apiAddBookmark = (movieId) =>
  safeFetch(`${API_URL}/bookmarks`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ movieId }),
  })

export const apiRemoveBookmark = (movieId) =>
  safeFetch(`${API_URL}/bookmarks/${movieId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })

// ── COMMENTS ─────────────────────────────────────────────────
export const apiGetComments = (movieId) =>
  safeFetch(`${API_URL}/comments/${movieId}`)

export const apiAddComment = (movieId, text, rating) =>
  safeFetch(`${API_URL}/comments`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ movieId, text, rating }),
  })

export const apiDeleteComment = (commentId) =>
  safeFetch(`${API_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
