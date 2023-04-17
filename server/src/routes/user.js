const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {
  searchAsTyped,
  testIndex,
  followUser,
  getUserProfile,
} = require('../controllers/user')

router.route('/search').post(searchAsTyped).get(testIndex)
router.route('/follow').post(authMiddleware, followUser)
router.route('/profile').post(getUserProfile)
router.route('/:id').get(getUserProfile)

module.exports = router
