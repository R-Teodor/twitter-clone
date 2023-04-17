const User = require('../models/user')
const { BadRequest, Unauthorized } = require('../errors')

const login = async (req, res) => {
  const { email, phone, password } = req.body

  if (!email && !password) {
    throw new Unauthorized('Invalid Credentials')
  }
  const user = await User.findOne({ email }).select('-__v -updatedAt')

  if (!user) throw new BadRequest('Invalid Credentials')
  const isMatch = await user.comparePassword(password)

  if (!isMatch) {
    throw new Unauthorized('Invalid Credentials')
  }
  const token = user.signJWT()

  res.cookie('token', token, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
  })
  // const newUser = Object.keys(user).filter((key) => key !== 'password').reduce((obj,key) =>{

  // })

  if (user._doc) {
    const { password, ...responseObject } = user._doc
    return res.status(200).json({ user: responseObject })
  }

  res.status(200).json({ user })
}

const register = async (req, res) => {
  const user = req.body
  if (!user) {
    return res.json({ msg: 'Bad Request' })
  }
  const createdUser = await User.create(user)
  res.json({ user: createdUser })
}

const getUsers = async (req, res) => {
  console.log(req.userId)
  const value = await User.find({})
  if (value && value.length > 0) {
    return res.json({ msg: value })
  }

  res.json({ msg: `Found shit ...${value}...` })
}

const getUser = async (req, res) => {
  console.log(req.userId)
  const user = await User.findOne({ _id: req.userId })
  // console.log(user)
  if (!user) throw new Unauthorized('Not Authorized')

  res.json({ user })
}

module.exports = {
  login,
  register,
  getUsers,
  getUser,
}
