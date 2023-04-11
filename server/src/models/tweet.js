const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      default: 'https://placehold.co/450?text=Hello+World&font=roboto',
    },
    reply: {
      type: String,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'tweetSchema',
    },
  },
  {
    timestamps: true,
  }
)

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet
