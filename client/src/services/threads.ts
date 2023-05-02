import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ReturnThread } from '../features/tweets/tweetSlice'
export const threadApi = createApi({
  reducerPath: 'threadAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/v1/tweet/' }),
  endpoints: (builder) => ({
    getThreadsById: builder.query<ReturnThread[], string>({
      query: (id) => `${id}`,
    }),
  }),
})

export const { useGetThreadsByIdQuery } = threadApi
