const express = require('express')
require('express-async-errors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
// DB
const connectDB = require('./db/connectDB')

// Errors

const ErrorHandler = require('./middleware/errorHandler')
const NotFoundMiddleware = require('./middleware/notFound')

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

// Routers
const AuthRouter = require('./routes/auth')
const TweetRouter = require('./routes/tweets')
const UserRouter = require('./routes/user')

app.get('/', (req, res) => {
  res.json({ msg: 'Main Route' })
})

app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/tweet', TweetRouter)
app.use('/api/v1/user', UserRouter)

app.use(NotFoundMiddleware)
app.use(ErrorHandler)

const PORT = 4000

const initialize = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => {
      console.log(`Server is runing on port ${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

initialize()
