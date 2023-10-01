import {
  createApi,
  defaultSerializeQueryArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import { logoutUser } from '@/lib/logoutUser'
import { getToken } from '@/lib/tokenStorage'

// initialize an empty api service that we'll inject endpoints into later as needed
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_ORIGIN,
    prepareHeaders: async (headers) => {
      if (location?.href) {
        headers.set('referer', location.href)
      }

      const token = getToken()
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
    validateStatus(response) {
      if (response.status >= 200 && response.status <= 299) return true
      if (response.status === 401) {
        logoutUser()
      }
      if (response.status === 503) {
        location.href = '/maintenance'
      }
      return false
    },
  }),

  serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
    return defaultSerializeQueryArgs({
      queryArgs,
      endpointDefinition,
      endpointName: `[${getToken()}]${endpointName}`,
    })
  },
  endpoints: () => ({}),
})
