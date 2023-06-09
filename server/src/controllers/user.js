const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { BadRequest, Unauthorized } = require('../errors')

let querySearch = 'to'
const agg = [
  {
    $search: {
      index: 'userSearch',
      compound: {
        should: [
          {
            autocomplete: {
              path: 'name',
              query: `${querySearch}`,
              tokenOrder: 'any',
              fuzzy: {
                maxEdits: 2,
                prefixLength: 1,
                maxExpansions: 256,
              },
            },
            highlight: {
              path: 'name',
            },
          },
          {
            autocomplete: {
              path: 'userTag',
              query: `${querySearch}`,
              tokenOrder: 'any',
              fuzzy: {
                maxEdits: 2,
                prefixLength: 1,
                maxExpansions: 256,
              },
            },
            highlight: {
              path: 'userTag',
            },
          },
        ],
      },
    },
  },
  {
    $limit: 5,
  },
]
const testIndex = async (req, res) => {
  // const indexes = await User.listIndexes()
  // console.log(indexes)
  // const result = await User.find({
  //   $text: { $search: 'toader' },
  // }).exec()

  // console.log(results)
  // const result = await User.createIndexes({
  //   name: 'text',
  //   userTag: 'text',
  // })
  // console.log(result)

  // This is the regex config for the search
  // const regex = [{
  //   $search:{
  //     index:'userSearch',
  //     regex:{
  //       path:'name',
  //       query:'(.*)Toader(.*)',
  //       allowAnalyzedField: true
  //     }
  //   }
  // }]

  const result = await User.aggregate(agg).exec()

  // console.log(result)
  res.json({ result })
}

const searchAsTyped = async (req, res) => {
  const { query } = req.body
  if (!query) throw new BadRequest('Missing parameters')
  const config = getAggregateSearchConfig(query)

  const results = await User.aggregate(config).exec()

  res.status(200).json({ results })
}

function getAggregateSearchConfig(query) {
  const aggConfig = [
    {
      $search: {
        index: 'userSearch',
        autocomplete: {
          path: 'name',
          query: `${query}`,
          tokenOrder: 'any',
          fuzzy: {
            maxEdits: 2,
            prefixLength: 1,
            maxExpansions: 256,
          },
        },
        highlight: {
          path: 'name',
        },
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        userTag: 1,
      },
    },
  ]

  // ############### Trial Query
  // AutoComplete is Working for name and userTag
  // More Complete implementation is required
  // searchIndex , AutoComplete index type ,compound/should mongoDB documentation

  const agg = [
    {
      $search: {
        index: 'userSearch',
        compound: {
          should: [
            {
              autocomplete: {
                path: 'name',
                query: `${query}`,
                tokenOrder: 'any',
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 1,
                  maxExpansions: 256,
                },
              },
            },
            {
              autocomplete: {
                path: 'userTag',
                query: `${query}`,
                tokenOrder: 'any',
                fuzzy: {
                  maxEdits: 2,
                  prefixLength: 1,
                  maxExpansions: 256,
                },
              },
            },
          ],
        },
      },
    },
    {
      $limit: 5,
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        userTag: 1,
      },
    },
  ]

  return agg
}

const getUserProfile = async (req, res) => {
  const id = req.params.userTag

  // const user = await User.findById(id).select('-password -__v -updatedAt')
  // #find a method to check if the person that makes the request is logged in and search the followers array to get the follow button to show or not in the frontend
  // #### partial auth middleware for extra permissions/features
  const token = req.cookies.token

  let payload = null
  if (token) {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  }

  // #### acumulator / group/ project aggregate documentation for a specific answer to finding if the requesting user is on the followers list

  const user = await User.findOne(
    { userTag: id },
    { following: { $slice: -5 }, followers: { $slice: -5 } }
  ).select('-password -__v -updatedAt')

  if (!user) throw new BadRequest('Account does not exist.')
  // ##### Should find a way to guard from trying to access payload.userId
  let mainUser = false
  if (user._id == payload?.userId) mainUser = true

  let verifyFollowing = []
  if (payload && payload.userId) {
    verifyFollowing = await User.find({
      userTag: id,
      followers: payload.userId,
    })
  }

  let verified = true
  if (verifyFollowing.length == 0) verified = false

  if (!user) throw new BadRequest('No User with the id/userTag')

  const returnedUser = {
    ...user.toJSON(),
    followingCount: user.following.length,
    followersCount: user.followers.length,
  }

  res.status(200).json({
    ...returnedUser,
    isFollowing: verified,
    mainProfile: mainUser,
  })
}

const followUser = async (req, res) => {
  const userId = req.userId
  const { followId, actionType } = req.body

  if (!userId) throw new Unauthorized('Need to log In')
  if (!followId) throw new BadRequest('Need an id to follow')

  if (actionType == 'follow') {
    const followingUpdate = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { following: followId } },
      { new: true }
    )
    const followerUpdate = await User.findOneAndUpdate(
      { _id: followId },
      { $addToSet: { followers: userId } },
      { new: true }
    )
  }

  if (actionType == 'unfollow') {
    const followingUpdate = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { following: followId } },
      { new: true }
    )
    const followerUpdate = await User.findOneAndUpdate(
      { _id: followId },
      { $pull: { followers: userId } },
      { new: true }
    )
  }

  // res.status(200).json({ followingUpdate, followerUpdate })
  res.status(200).json({ msg: 'ok' })
}

const getAllUserLikes = async (req, res) => {
  const userId = req.userId
  // console.log(req.userId)

  const likes = await User.findById(userId)
    .populate({
      path: 'likes',
      populate: {
        path: 'author',
        model: 'User',
        select: 'name userTag avatarURL',
      },
    })
    .select('likes')
    .exec()

  res.json({ data: likes })
}

const updateProfile = async function (req, res, next) {
  let avatarFile = null
  if (req.files && req.files[`avatar`]) {
    avatarFile = req.files['avatar'][0]
  }
  let bgFile = null
  if (req.files && req.files[`bgImage`]) {
    bgFile = req.files['bgImage'][0]
  }
  const { Name, Location, Bio, Website, BirthDate } = req.body

  // console.log(avatarFile)
  // console.log(bgFile)

  const userId = req?.userId

  const user = await User.findById(userId).select('-password')

  const avatarPath = `http://localhost:4000/${avatarFile?.fieldname}/${avatarFile?.filename}`
  const bgPath = `http://localhost:4000/${bgFile?.fieldname}/${bgFile?.filename}`

  if (avatarFile) user.avatarURL = avatarPath
  if (bgFile) user.bgURL = bgPath
  user.name = Name
  user.bio = Bio
  user.location = Location
  if (Website) user.website = Website
  if (BirthDate) user.birthDate = BirthDate
  await user.save()

  res.json({
    avatarPath,
    bgPath,
  })
}

const getConnectedPeople = async (req, res) => {
  const userTag = req.params.userTag

  const user = await User.findOne({ userTag })
    .select('followers following')
    .populate('following followers', 'name userTag avatarURL bio')
    .exec()

  if (!user) throw new BadRequest('User Does not exist')

  res.status(200).json(user)
}

module.exports = {
  searchAsTyped,
  testIndex,
  followUser,
  getUserProfile,
  getAllUserLikes,
  updateProfile,
  getConnectedPeople,
}
