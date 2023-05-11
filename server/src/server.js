const express = require('express')
require('express-async-errors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const app = express()

// ##### Image Handling package + options
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/' + file.fieldname
    req.imgPath = dir
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const fileName = file.fieldname + `-${req?.userId}-` + file.originalname

    cb(null, fileName)
  },
})
const upload = multer({ storage: storage })
module.exports = { upload }
// #####

// DB
const connectDB = require('./db/connectDB')

// Errors

const ErrorHandler = require('./middleware/errorHandler')
const NotFoundMiddleware = require('./middleware/notFound')

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
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

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  console.log(req.file)
  console.log(req.imgPath)
  const path =
    `http://localhost:4000/${req.file.fieldname}/` + req.file.filename

  res.json({ path: path })
})
app.post(
  '/photos',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'bgImage', maxCount: 1 },
  ]),
  function (req, res, next) {
    console.log(req.files['avatar'][0].fieldname)
    console.log(req.files['bgImage'])

    const avatarPath =
      `http://localhost:4000/${req.files['avatar'][0].fieldname}/` +
      req.files['avatar'][0].filename

    const bgPath =
      `http://localhost:4000/${req.files['bgImage'][0].fieldname}/` +
      req.files['bgImage'][0].filename

    console.log({ hey: 'We did it' })
    // res.json({
    //   avatarPath:
    // })
    res.json({
      avatarPath,
      bgPath,
    })
  }
)

app.use(express.static(path.join(__dirname, '../uploads')))
console.log(path.join(__dirname, '../uploads'))

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
