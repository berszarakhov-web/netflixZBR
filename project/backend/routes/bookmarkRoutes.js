const express = require('express')
const router = express.Router()
const { getBookmarks, addBookmark, removeBookmark } = require('../controllers/bookmarkController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getBookmarks)
router.post('/', protect, addBookmark)
router.delete('/:movieId', protect, removeBookmark)

module.exports = router
