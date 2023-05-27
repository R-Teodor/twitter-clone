const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const {
  searchAsTyped,
  testIndex,
  followUser,
  getUserProfile,
  getAllUserLikes,
  updateProfile,
  getConnectedPeople,
} = require('../controllers/user')
const { upload } = require('../server')

const cbUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'bgImage', maxCount: 1 },
])

router.route('/search').post(searchAsTyped).get(testIndex)
router.route('/follow').post(authMiddleware, followUser)
router.route('/profile').post(getUserProfile)
router.route('/edit').post(authMiddleware, cbUpload, updateProfile)
router.route('/likes').get(authMiddleware, getAllUserLikes)
router.route('/connected/:userTag').get(getConnectedPeople)

router.route('/:userTag').get(getUserProfile)

module.exports = router
