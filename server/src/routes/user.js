const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { searchAsTyped, testIndex, followUser } = require('../controllers/user')

router.route('/search').post(searchAsTyped).get(testIndex)
router.route('/follow').post(authMiddleware, followUser)

module.exports = router
