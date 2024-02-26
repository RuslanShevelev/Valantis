import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTimeStamp } from '../utils/helpers'

// eslint-disable-next-line no-undef
const md5 = require('md5');
const timeStamp = getTimeStamp(Date.now())

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.valantis.store:40000/',
    prepareHeaders: (headers) => {
      if (timeStamp) {
        headers.set('X-Auth', md5(`Valantis_${timeStamp}`))
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    getAllIds: build.query({
      query: (body) =>({
    method: 'POST',
    body: body,
    }),
    }),
    getAllItems: build.mutation({
      query: (ids) =>({
    method: 'POST',
    body: {
        "action": "get_items",
        "params": {"ids": ids}
          }
    }),
    }),
  }),
})

export const {
  useGetAllIdsQuery,
  useGetAllItemsMutation,
} = goodsApi