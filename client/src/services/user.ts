import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:4000/api/v1/user` }),
  endpoints: (builder) => ({
    getProfileByUserTag: builder.query<any, string>({
      query: (userTag) => `/${userTag}`,
    }),
  }),
})

export const { useGetProfileByUserTagQuery } = userApi
