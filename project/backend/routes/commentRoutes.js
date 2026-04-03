const express = require('express')
const router  = express.Router()
const { getComments, addComment, deleteComment, toggleLike } = require('../controllers/commentController')
const { protect } = require('../middleware/authMiddleware')

router.get('/:movieId',    getComments)
router.post('/',           protect, addComment)
router.delete('/:id',      protect, deleteComment)
router.post('/:id/like',   protect, toggleLike)

module.exports = router
