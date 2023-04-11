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
    imgUrl: {
      type: String,
      default: 'https://placehold.co/450?text=Hello+World&font=roboto',
    },
    comments: {
      type: [mongoose.Types.ObjectId],
      ref: 'Tweet',
    },
  },
  {
    timestamps: true,
  }
)

const Thread = mongoose.model('Thread', threadSchema)

module.exports = Thread
