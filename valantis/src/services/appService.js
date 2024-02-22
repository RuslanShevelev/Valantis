import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { getTimeStamp } from '../utils/helpers'

// eslint-disable-next-line no-undef
// const md5 = require('md5');
// const timeStamp = getTimeStamp(Date.now())

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'https://api.valantis.store:40000/',
//     prepareHeaders: (headers) => {
//       if (timeStamp) {
//         console.log(`Valantis_${timeStamp}`);
//         console.log(md5(`Valantis_${timeStamp}`));
//         headers.set('X-Auth', md5(`Valantis_${timeStamp}`))
//       }
//       return headers
//     },
//   })
//   const baseQueryWithAuth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions)
//     if (result?.error) {
//         console.log(result.error);
    //   const authData = api.getState().auth
    //   const refreshResult = await baseQuery(
    //     {
    //       url: '/user/token/refresh/',
    //       method: 'POST',
    //       body: JSON.stringify({
    //         refresh: authData.refresh,
    //       }),
    //       headers: {
    //         'content-type': 'application/json',
    //       },
    //     },
    //     api,
    //     extraOptions
    //   )
    //   if (refreshResult.data) {
    //     api.dispatch(
    //       setTokens({
    //         access: refreshResult.data.access,
    //         // refresh: authData.refresh,
    //       })
    //     )
    //     result = await baseQuery(args, api, extraOptions)
    //   } else {
    //     api.dispatch(setAuth(null))
    //   }
//     }
//     return result
//   }
  

export const goodsApi = createApi({
  reducerPath: 'goodsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.valantis.store:40000',
    prepareHeaders: (headers) => {
        headers.set('X-Auth', '15fd1b722761a45265adeb7ae99335fe')
      return headers
    },
  }),

  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (params) =>
        `/search/users?${params}`,
    }),
    postIds: build.mutation({
        query: () => ({
            url: '/',  
        method: 'POST',
        body: {
            "action": "get_ids",
            "params": {"offset": 10, "limit": 5}
              }
        }),
      }),
    getUserInfo: build.query({
      query: (url) => `/users/${url}`,
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserInfoQuery,
  usePostIdsMutation
} = goodsApi