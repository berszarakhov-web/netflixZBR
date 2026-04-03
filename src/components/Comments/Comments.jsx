import { useState, useEffect } from 'react'
import { useComments } from '../../context/CommentsContext'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../Toast/Toast'
import styles from './Comments.module.css'

function Comments({ movieId }) {
  const { getComments, addComment, deleteComment, getCachedComments } = useComments()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const { show } = useToast()
  const [text, setText]         = useState('')
  const [loading, setLoading]   = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const comments = getCachedComments(movieId)

  useEffect(() => {
    setFetchError(false)
    getComments(movieId).catch(() => setFetchError(true))
  }, [movieId])

  const handleSubmit = async () => {
    if (!currentUser) { show('Войдите, чтобы оставить комментарий', 'info'); navigate('/login'); return }
    if (!text.trim()) return
    setLoading(true)
    try {
      await addComment(movieId, text.trim(), null)
      setText('')
      show('Комментарий добавлен ✓', 'success')
    } catch (e) {
      show(e.message || 'Ошибка отправки', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (commentId) => {
    setDeletingId(commentId)
    try {
      await deleteComment(commentId, movieId)
      show('Комментарий удалён', 'info')
    } catch (e) {
      show('Не удалось удалить', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  const initials = (name) =>
    name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>
        Комментарии
        <span className={styles.count}>{comments.length}</span>
      </h3>

      <div className={styles.form}>
        <textarea
          className={styles.textarea}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={currentUser ? 'Напишите отзыв...' : 'Войдите, чтобы оставить отзыв'}
          rows={3}
          maxLength={500}
          disabled={!currentUser || loading}
        />
        <div className={styles.formFooter}>
          <span className={styles.charCount}>{text.length}/500</span>
          <button
            className={styles.submit}
            onClick={handleSubmit}
            disabled={!text.trim() || loading || !currentUser}
          >
            {loading ? 'Отправка...' : 'Отправить'}
          </button>
        </div>
      </div>

      {fetchError && (
        <div className={styles.fetchError}>
          Не удалось загрузить комментарии. Проверьте подключение к серверу.
        </div>
      )}

      {!fetchError && comments.length === 0 ? (
        <div className={styles.empty}>Будьте первым, кто оставит отзыв!</div>
      ) : (
        <div className={styles.list}>
          {comments.map(c => (
            <div key={c._id} className={styles.comment}>
              <div className={styles.avatar}>{initials(c.username)}</div>
              <div className={styles.commentBody}>
                <div className={styles.commentHeader}>
                  <span className={styles.author}>{c.username}</span>
                  <span className={styles.date}>
                    {new Date(c.createdAt).toLocaleDateString('ru', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                  {currentUser && currentUser._id === c.user && (
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(c._id)}
                      disabled={deletingId === c._id}
                      title="Удалить"
                    >
                      {deletingId === c._id ? '...' : '✕'}
                    </button>
                  )}
                </div>
                <p className={styles.text}>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Comments
