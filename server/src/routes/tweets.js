const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

const {
  createTweet,
  getTweets,
  postThread,
  getThreads,
  populateThread,
} = require('../controllers/tweets')

// router.route('/getTweets').get()
router.route('/createTweet').post(createTweet)
router.route('/getTweets').get(getTweets)
router.route('/thread').post(postThread).get(populateThread)
router.route('/getThreads').get(authMiddleware, getThreads)

module.exports = router
