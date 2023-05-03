const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {
  searchAsTyped,
  testIndex,
  followUser,
  getUserProfile,
  getAllUserLikes,
} = require('../controllers/user')

router.route('/search').post(searchAsTyped).get(testIndex)
router.route('/follow').post(authMiddleware, followUser)
router.route('/profile').post(getUserProfile)
router.route('/likes').get(authMiddleware, getAllUserLikes)

router.route('/:userTag').get(getUserProfile)

module.exports = router
