const express = require('express')
const router  = express.Router()
const {
  getMovies, getMovieById, getRelatedMovies, searchMovies,
  createMovie, updateMovie, deleteMovie,
} = require('../controllers/movieController')
const { protect, requireRole } = require('../middleware/authMiddleware')

router.get('/search',   searchMovies)
router.get('/',         getMovies)
router.get('/:id',      getMovieById)
router.get('/:id/related', getRelatedMovies)

router.post('/',        protect, requireRole('admin'), createMovie)
router.put('/:id',      protect, requireRole('admin'), updateMovie)
router.delete('/:id',   protect, requireRole('admin'), deleteMovie)

module.exports = router
