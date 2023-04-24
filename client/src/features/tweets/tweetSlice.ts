import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../app/store'
import { AuthState } from '../user/authSlice'
import axios from 'axios'

export interface ThreadObject {
  author: string
  content: string
  imgUrl: File
  comments?: ThreadObject[]
}

export interface TweetState {
  tweets: ThreadObject[]
  personalTweets: Thread[]
}

interface Thread {
  author: string
  content: string
  mediaUrl: string
  comments?: any[]
  _id: string
  createdAt: string
  updatedAt?: string
  parentThread?: string
}

type Returned = {
  threads: Thread
}

type Tweet = {
  author?: string
  content: string
}

// "author": "6424677936d980f7fbd2c21d",
//         "content": "My first Thread! ThreadHAAA",
//         "imgUrl": "https://placehold.co/450?text=Hello+World&font=roboto",
//         "comments": [],
//         "_id": "642c0cee1705b35338076a79",
//         "createdAt": "2023-04-04T11:41:34.267Z",
//         "updatedAt": "2023-04-04T11:41:34.267Z",
//         "__v": 0

const initialState: TweetState = {
  tweets: [],
  personalTweets: [],
}

export const createTweetThread = createAsyncThunk<
  Returned,
  Tweet,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('tweet/create', async (tweet, thunkAPI) => {
  try {
    const userId = thunkAPI.getState().auth._id
    if (!userId) thunkAPI.rejectWithValue('no id')
    const completedTweet: Tweet = { ...tweet, author: userId }

    const response = await fetch('http://localhost:4000/api/v1/tweet/thread', {
      method: 'POST',
      body: JSON.stringify(completedTweet),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    const data: Returned = await response.json()
    console.log('This is the returned data from Create Tweet EndPoint', data)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue('error')
  }
})

export const getTweets = createAsyncThunk<
  ThreadObject[],
  String,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('tweet/getAll', async (id, thunkAPI) => {
  const { data } = await axios.get(`http://localhost:4000/api/v1/tweet/${id}`)
  console.log(data)

  return data.threads
})

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTweetThread.fulfilled, (state, action) => {
        console.log(action.payload)

        // state.personalTweets.push(action.payload.threads)
      })
      .addCase(getTweets.fulfilled, (state, action) => {
        console.log(action.payload)
        state.tweets = action.payload
      })
  },
})

export default tweetSlice.reducer
