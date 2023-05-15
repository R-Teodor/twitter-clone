const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')

const {
  createTweet,
  getTweets,
  postThread,
  getThreads,
  populateThread,
  getTweetsById,
  getFollowingThreads,
  postReplyThread,
  populateReplyThread,
  getAllUserReplies,
  favoriteThread,
  upload,
} = require('../controllers/tweets')

// router.route('/getTweets').get()
router.route('/').get(getAllUserReplies)
router.route('/createTweet').post(createTweet)
router.route('/getTweets').get(getTweets)
router
  .route('/thread')
  .post(authMiddleware, upload.single('media'), postThread)
  .get(populateThread)

router
  .route('/replythread/:tweetId')
  .post(authMiddleware, postReplyThread)
  .get(populateReplyThread)
router.route('/getThreads').get(authMiddleware, getThreads)

router.route('/following').get(authMiddleware, getFollowingThreads)
router.route('/:userId').get(getTweetsById)

router.route('/favorite').post(authMiddleware, favoriteThread)

module.exports = router
