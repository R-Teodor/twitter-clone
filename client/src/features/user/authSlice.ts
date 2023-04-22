import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AxiosError } from 'axios'

// THIS IS ALMOST THE FINAL STATE OF USER MODEL
// ############## SHOULD TRY TO IMPLEMENT AN INTERFACE OR A TYPE AND USE IT FOR THE WHOLE APPLICATION
// ############## START DEFINING THE TYPE FOR ALL PURPOSE IN THE APP

export interface User {
  _id: string
  name: string
  email: string
  phone?: number | null
  userTag: string
  following: User[] | string[]
  followingCount: number | null
  followers: User[] | string[]
  followersCount: number | null
  birthDate: string
  bio?: string
  location?: string
  website?: string
  createdAt: string
}

export interface NetworkState {
  error: string | null | undefined
  loading: string
}

export type AuthState = User & NetworkState

export interface UserCredentials {
  email: string
  phone?: string
  password: string
}

const initialState: AuthState = {
  _id: localStorage.getItem('id') || '',
  name: '',
  email: '',
  phone: null,
  userTag: '',
  following: [],
  followingCount: 0,
  followers: [],
  followersCount: null,
  birthDate: '',
  bio: '',
  location: '',
  website: '',
  createdAt: 'string',

  error: '',
  loading: 'idle',
}

export const fetchAllUsers = createAsyncThunk('auth/getAllUsers', async () => {
  try {
    const response = await fetch('http://localhost:4000/api/v1/auth/getUsers', {
      credentials: 'include',
    })
    const data: object = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
})

export const login = createAsyncThunk(
  'auth/login',
  async (user: UserCredentials, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/v1/auth/login',
        user,
        { withCredentials: true }
      )
      return data.user
    } catch (error: any) {
      // ##### Need to implement type errors for network errors or TypeErro
      console.log(error)
      let err: AxiosError = error
      if (err.response?.data) {
        return rejectWithValue(err.response?.data)
      }
      return rejectWithValue(err.message)
    }
  }
)
export const checkLoginState = createAsyncThunk(
  'auth/logged',
  async (undefined, { rejectWithValue }) => {
    // const response = await fetch('http://localhost:4000/api/v1/auth/getUser', {
    //   credentials: 'include',
    // })
    // const data = await response.json()
    // return data

    try {
      const { data } = await axios(
        'http://localhost:4000/api/v1/auth/getUser',
        { withCredentials: true }
      )
      return data.user
    } catch (error: any) {
      let err: AxiosError = error
      // ReWrite the backend error obj to make it more clear and have Types
      return rejectWithValue(err.message)
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getState: (state) => {
      console.log('This is the user Id: ', state)
      console.log('This is the username: ', state)
    },
    // setUserId: (state, action: PayloadAction<string>) => {
    //   state.user._id = action.payload
    // },
    // setUserName: (state, action: PayloadAction<string>) => {
    //   state.user.name = action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      }
    }),
      builder.addCase(login.rejected, (state, action) => {
        console.log(action.payload)

        state.error = action.error.message
      }),
      builder.addCase(checkLoginState.pending, (state, action) => {
        state.loading = 'loading'
      }),
      builder.addCase(checkLoginState.fulfilled, (state, action) => {
        console.log(action.payload)
        localStorage.setItem('id', action.payload.user?._id)
        return {
          ...state,
          ...action.payload,
          loading: 'idle',
        }
      })
    builder.addCase(checkLoginState.rejected, (state, action) => {
      state.loading = 'idle'
    })
  },
})

// export const { getState } = authSlice.actions
// setUserId, setUserName
export default authSlice.reducer
