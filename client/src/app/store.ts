import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/user/authSlice'
import tweetReducer from '../features/tweets/tweetSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tweet: tweetReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
