const express = require('express')
const router = express.Router()
const {
  login,
  register,
  getUsers,
  getUser,
} = require('../controllers/auth')
const authMiddleware = require('../middleware/authMiddleware')

router.route('/login').post(login).get(login)
router.route('/register').post(register).get(register)
router.route('/getUsers').get(authMiddleware, getUsers)
router.route('/getUser').get(authMiddleware, getUser)

module.exports = router
