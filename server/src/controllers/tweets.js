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
    .populate('author', 'name userTag')
    .exec()

  res.json({ threads })
}

const getFollowingThreads = async (req, res) => {
  const id = req.userId

  const followedUsers = await User.findById(req.userId).select('following -_id')

  const followedUsersTweets = await Thread.find({
    author: { $in: followedUsers.following },
  })
    .limit(10)
    .select('-__v -updatedAt')
    .populate('author', 'name userTag')
    .exec()

  res.json(followedUsersTweets)
}

const populateThread = async (req, res) => {
  const thread = await Thread.findOne({ author: '6424677936d980f7fbd2c21d' })
    .populate('comments')
    .exec()

  res.json({ thread })
}

module.exports = {
  createTweet,
  getTweets,
  postThread,
  getThreads,
  populateThread,
  getTweetsById,
  getFollowingThreads,
}
