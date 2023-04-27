const mongoose = require('mongoose')

const threadSchema = new mongoose.Schema(
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
    mediaUrl: {
      type: String,
      default: 'https://placehold.co/450?text=Hello+World&font=roboto',
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      ref: 'Thread',
    },
    parentThread: {
      type: mongoose.Types.ObjectId,
      ref: 'Thread',
    },
    retweets: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
