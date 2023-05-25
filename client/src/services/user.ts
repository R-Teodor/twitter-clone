import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User, UserProfile } from '../features/user/authSlice'

export type FollowMutation = {
  followId: string
  actionType: 'follow' | 'unfollow'
}

export const userApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/api/v1/user`,
    credentials: 'include',
  }),
  tagTypes: ['User'],

  endpoints: (builder) => ({
    getProfileByUserTag: builder.query<UserProfile, string>({
      query: (userTag) => `/${userTag}`,
      providesTags: ['User'],
    }),
    handleFollowProfile: builder.mutation<any, FollowMutation>({
      query(data) {
        // const {followId,actionType} = data
        return {
          url: '/follow',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useGetProfileByUserTagQuery, useHandleFollowProfileMutation } =
  userApi
