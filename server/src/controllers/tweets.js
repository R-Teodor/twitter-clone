const Tweet = require('../models/tweet')
const Thread = require('../models/thread')
const User = require('../models/user')
const Unauthorized = require('../errors/unauthorized')
const { BadRequest } = require('../errors')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/media'
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const fileName = `${req?.userId}-` + file.originalname
    cb(null, fileName)
  },
})
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file)
    cb(null, true)
  },
})

const createTweet = async (req, res) => {
  const { author, content, replied } = req.body
  const tweet = { author, content }
  const createdTweet = await Tweet.create(tweet)

  var thread = await Thread.findOne({ _id: replied })

  thread.comments.push(createdTweet._id)
  thread.save()

  res.json({
    tweet: createdTweet,
    thread,
  })
}

const getTweets = async (req, res) => {
  const tweet = await Tweet.find({})

  res.json({ msg: tweet })
}

// ###############

const postThread = async (req, res) => {
  let mediaUrl = ''
  if (req.file) {
    mediaUrl = `http://localhost:4000/media/${req.file.filename}`
  }
  const thread = {
    ...req.body,
    author: req.userId,
    mediaUrl: mediaUrl,
  }

  const createdThread = await Thread.create(thread)

  res.json({ thread: createdThread })
}

const getThreads = async (req, res) => {
  if (!req.userId) throw new Unauthorized('Not Authorized')
  const threads = await Thread.find({ author: req.userId })

  res.json({ threads })
}

const getTweetsById = async (req, res) => {
  const id = req.params.userId
  if (!id) throw new BadRequest('No Id')

  const threads = await Thread.find({ author: id })
    .select('-__v')
    .populate('author', 'name userTag avatarURL')
    .limit(20)
    .sort({ createdAt: -1 })
    .exec()

  res.json(threads)
}

const getFollowingThreads = async (req, res) => {
  const followedUsers = await User.findById(req.userId).select('following -_id')

  const followedUsersTweets = await Thread.find({
    author: { $in: followedUsers.following },
  })
    // .limit(10)
    .select('-__v -updatedAt')
    .populate('author', 'name userTag avatarURL')
    .sort({ createdAt: -1 })
    .exec()

  res.json(followedUsersTweets)
}

const postReplyThread = async (req, res) => {
  const tweetId = req.params.tweetId
  const foundTweet = await Thread.findById(tweetId)
  const thread = { ...req.body, parentThread: tweetId, author: req.userId }
  let finalTweetResponse

  if (foundTweet) {
    const replyTweet = await Thread.create(thread)
    foundTweet.comments.push(replyTweet._id)
    finalTweetResponse = await foundTweet.save()
  }

  res.json({ thread, finalTweetResponse })
}

const populateReplyThread = async (req, res) => {
  const tweetId = req.params.tweetId
  const comments = await Thread.findById(tweetId)
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
        select: 'name userTag avatarURL',
      },
    })
    .populate('parentThread')
    .exec()
  // console.log(comments)
  res.json(comments)
}

const getAllUserReplies = async (req, res) => {
  const { userId } = req.query

  const replies = await Thread.find({
    author: userId,
    parentThread: { $ne: null },
  })
    .populate({
      path: 'author',
    })
    .exec()

  res.json(replies)
}

const populateThread = async (req, res) => {
  const thread = await Thread.findOne({ author: '6424677936d980f7fbd2c21d' })
    .populate('comments')
    .exec()

  res.json({ thread })
}

// ############## Handle user likes and user media

const favoriteThread = async (req, res) => {
  const { tweetId } = req.body
  const userId = req.userId

  const foundUser = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        likes: tweetId,
      },
    },
    { new: true }
  )

  // const foundUser2 = await User.findByIdAndUpdate(
  //   userId,
  //   {
  //     $cond: {
  //       if: {
  //         $in: [tweetId, '$likes'],
  //         then: { $pull: { likes: tweetId } },
  //         else: {
  //           $addToSet: {
  //             likes: tweetId,
  //           },
  //         },
  //       },
  //     },
  //   },
  //   { new: true }
  // )

  if (!foundUser) return res.json({ data: 'Something Went Wrong' })

  const setLikesOnThread = await Thread.findByIdAndUpdate(
    tweetId,
    {
      $addToSet: {
        likes: userId,
      },
    },
    { new: true }
  )
  if (!setLikesOnThread) return res.json({ data: 'Something Went Wrong' })

  // console.log(foundUser2)
  res.json({ tweetId, userId })
}

module.exports = {
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
}
