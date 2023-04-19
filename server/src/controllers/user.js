const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { BadRequest, Unauthorized } = require('../errors')

const agg = [
  {
    $search: {
      index: 'userSearch',
      autocomplete: {
        path: 'name',
        query: 'To',
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

  return aggConfig
}

const getUserProfile = async (req, res) => {
  const id = req.params.userTag

  // const user = await User.findById(id).select('-password -__v -updatedAt')
  // #find a method to check if the person that makes the request is logged in and search the followers array to get the follow button to show or not in the frontend
  // #### partial auth middleware for extra permissions/features
  const token = req.cookies.token
  let payload
  if (token) {
    payload = jwt.verify(token, process.env.JWT_SECRET)
  }

  // #### acumulator / group/ project aggregate documentation for a specific answer to finding if the requesting user is on the followers list

  const user = await User.findOne(
    { userTag: id },
    { following: { $slice: -5 }, followers: { $slice: -5 } }
  ).select('-password -__v -updatedAt')

  let verifyFollowing = []
  if (payload.userId) {
    verifyFollowing = await User.find({
      userTag: id,
      followers: payload.userId,
    })
  }

  console.log(verifyFollowing)
  let verified = true
  if (verifyFollowing.length == 0) verified = false

  if (!user) throw new BadRequest('No User with the id/userTag')

  const returnedUser = {
    ...user.toJSON(),
    followingCount: user.following.length,
    followersCount: user.followers.length,
  }

  res.status(200).json({ user: { ...returnedUser, isFollowing: verified } })
}

const followUser = async (req, res) => {
  const userId = req.userId
  const { followId } = req.body

  if (!userId) throw new Unauthorized('Need to log In')
  if (!followId) throw new BadRequest('Need an id to follow')

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

  console.log(
    'This is the updatedArray with findOneNadUpdate ',
    followingUpdate
  )

  res.status(200).json({ followingUpdate, followerUpdate })
}

module.exports = {
  searchAsTyped,
  testIndex,
  followUser,
  getUserProfile,
}
