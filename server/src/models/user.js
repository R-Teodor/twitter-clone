const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    userTag: {
      type: String,
      unique:true
    },
    following: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    followers: {
      type: [mongoose.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    birthDate: {
      type: Date,
    },
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (params) {
  if (!this.isModified('password')) return

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(this.password, salt)

  this.password = hash
})

userSchema.methods.signJWT = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXP_DATE,
  })
  return token
}

userSchema.methods.comparePassword = async function (candidatePass) {
  console.log(candidatePass)
  console.log(this.password)
  const isMatch = await bcrypt.compare(candidatePass, this.password)
  console.log(isMatch)

  return isMatch
}

userSchema.index({
  'name': 'text',
})

const User = mongoose.model('User', userSchema)

module.exports = User
