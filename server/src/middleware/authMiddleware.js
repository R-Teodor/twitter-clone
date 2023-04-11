const jwt = require('jsonwebtoken')
const Unauthorized = require('../errors/unauthorized')

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    throw new Unauthorized('No Credentials')
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    //   console.log(token)
    req.userId = payload.userId

    next()
  } catch (error) {
    throw new Unauthorized('Invalid Credentials')
  }
}

module.exports = authMiddleware
