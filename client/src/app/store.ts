import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/user/authSlice'
import tweetReducer from '../features/tweets/tweetSlice'
import layerReducer from '../features/layers/layerSlice'

import { setupListeners } from '@reduxjs/toolkit/query'
import { threadApi } from '../services/threads'
import { userApi } from '../services/user'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [threadApi.reducerPath]: threadApi.reducer,
    auth: authReducer,
    tweet: tweetReducer,
    layer: layerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(threadApi.middleware, userApi.middleware),
})

// setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
