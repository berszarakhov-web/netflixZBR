const express = require('express')
const router  = express.Router()
const { rateMovie, getMyRating, getMyRatings } = require('../controllers/ratingController')
const { protect } = require('../middleware/authMiddleware')

router.get('/',          protect, getMyRatings)
router.get('/:movieId',  protect, getMyRating)
router.post('/',         protect, rateMovie)

module.exports = router
