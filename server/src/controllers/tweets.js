const Tweet = require('../models/tweet')
const Thread = require('../models/thread')
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

const getThreads = async (req, res) => {
  if (!req.userId) throw new Unauthorized('Not Authorized')
  const threads = await Thread.find({ author: req.userId })

  res.json({ threads })
}

const getTweetsById = async (req, res) => {
  const id = req.params.userId
  if (!id) throw new BadRequest('Aiii')

  const threads = await Thread.find({ author: id })
  console.log(threads)

  res.json({ threads })
}

const populateThread = async (req, res) => {
  const thread = await Thread.findOne({ author: '6424677936d980f7fbd2c21d' })
    .populate('comments')
    .exec()

  res.json({ thread })
}

const postThread = async (req, res) => {
  const thread = req.body
  const createdThread = await Thread.create(thread)

  res.json({ thread: createdThread })
}

module.exports = {
  createTweet,
  getTweets,
  postThread,
  getThreads,
  populateThread,
  getTweetsById,
}
