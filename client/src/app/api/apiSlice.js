import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/User/userSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  console.log('args', args)
  console.log('api', api)
  console.log('extraOptions', extraOptions)
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    // needs to send refresh token

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

    if (refreshResult?.data) {
      // received access token

      api.dispatch(setCredentials({ ...refreshResult.data }))

      // retry the original Query
      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.message = 'Your login has expired'
      }
      return refreshResult
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'], // change as per requirement
  endpoints: (builder) => ({}),
})
