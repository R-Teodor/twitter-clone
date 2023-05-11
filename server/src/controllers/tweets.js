const Tweet = require('../models/tweet')
const Thread = require('../models/thread')
const User = require('../models/user')
const Unauthorized = require('../errors/unauthorized')
const { BadRequest } = require('../errors')

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
  const thread = req.body
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
  if (!id) throw new BadRequest('Aiii')

  const threads = await Thread.find({ author: id })
    .select('-__v')
    .populate('author', 'name userTag avatarURL')
    .exec()

  res.json(threads)
}

const getFollowingThreads = async (req, res) => {
  const followedUsers = await User.findById(req.userId).select('following -_id')

  const followedUsersTweets = await Thread.find({
    author: { $in: followedUsers.following },
  })
    .limit(10)
    .select('-__v -updatedAt')
    .populate('author', 'name userTag avatarURL')
    .exec()

  res.json(followedUsersTweets)
}

const postReplyThread = async (req, res) => {
  const tweetId = req.params.tweetId
  const foundTweet = await Thread.findById(tweetId)
  const thread = { ...req.body, parentThread: tweetId }
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
}
