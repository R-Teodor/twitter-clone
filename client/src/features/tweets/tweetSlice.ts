import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../../app/store'
import axios from 'axios'

export interface TweetState {
  tweets: ReturnThread[]
  personalTweets: Thread[]
}

export interface Thread {
  author: string
  content: string
  mediaUrl: string
  comments?: any[]
  _id: string
  createdAt: string
  updatedAt?: string
  parentThread?: string
}
export interface ReturnThread extends Omit<Thread, 'author'> {
  author: {
    _id?: String
    name: String
    userTag: String
  }
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
  {
    thread: Thread
  },
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
    const data = await response.json()
    console.log('This is the returned data from Create Tweet EndPoint', data)
    return data
  } catch (error) {
    return thunkAPI.rejectWithValue('error')
  }
})

export const getTweets = createAsyncThunk<
  ReturnThread[],
  String,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('tweet/getAll', async (id, thunkAPI) => {
  const { data } = await axios.get(`http://localhost:4000/api/v1/tweet/${id}`)

  return data.threads
})

export const getTweetsTest = createAsyncThunk<
  ReturnThread[],
  String,
  {
    dispatch: AppDispatch
    state: RootState
  }
>('tweet/getAll', async (id, thunkAPI) => {
  const { data } = await axios.get(`http://localhost:4000/api/v1/tweet/${id}`)

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

        state.personalTweets.push(action.payload.thread)
      })
      .addCase(getTweets.fulfilled, (state, action) => {
        state.tweets = action.payload
      })
  },
})

export default tweetSlice.reducer
