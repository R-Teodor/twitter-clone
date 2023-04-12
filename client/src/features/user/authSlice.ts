import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// THIS IS ALMOST THE FINAL STATE OF USER MODEL
// ############## SHOULD TRY TO IMPLEMENT AN INTERFACE OR A TYPE AND USE IT FOR THE WHOLE APPLICATION
// ############## START DEFINING THE TYPE FOR ALL PURPOSE IN THE APP

export type User = {
  _id: string
  name: string
  email: string
  phone: number
  userTag: string
  following: User[] | string[]
  followingCount: number
  followers: User[] | string[]
  followersCount: number
  birthDate: string
  bio?: string
  location?: string
  website?: string
  createdAt: string
}

export type Returned = {
  user: object
}
export interface AuthState {
  userId: string
  name: string
  email: string
  phone: number
  following: number
  followers: number
  createdAt: string
  users: object | undefined
}
export interface UserFormState {
  email: string
  phone?: string
  password: string
}

const initialState: AuthState = {
  userId: localStorage.getItem('id') || '',
  name: '',
  email: '',
  phone: 0,
  following: 0,
  followers: 0,
  createdAt: 'string',
  users: {},
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
  async (user: UserFormState, { dispatch, rejectWithValue }) => {
    const response = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    const data: Returned = await response.json()
    return data
  }
)
export const checkLoginState = createAsyncThunk('auth/logged', async () => {
  const response = await fetch('http://localhost:4000/api/v1/auth/getUser', {
    credentials: 'include',
  })
  const data = await response.json()
  return data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getState: (state) => {
      console.log('This is the user Id: ', state.userId)
      console.log('This is the username: ', state.name)
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      console.log(action.payload)
      state.users = action.payload
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        console.log(action.payload)
        state.users = action.payload.user
      }),
      builder.addCase(checkLoginState.fulfilled, (state, action) => {
        console.log(action.payload)
        localStorage.setItem('id', action.payload.user?._id)
        state.users = action.payload.user
      })
  },
})

export const { getState, setUserId, setUserName } = authSlice.actions
export default authSlice.reducer
