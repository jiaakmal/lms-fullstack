import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../auth/authSlice'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_SERVER_URL, credentials:"include"}),
    endpoints: (builder) => ({
        refreshToken: builder.query({
            query:(data) => ({
                url: "refresh",
                method:"GET",
                credentials:"include" as const

            }),
        }),
        loadUser: builder.query({
            query:(data) => ({
                url: "me",
                method:"GET",
                credentials:"include" as const

            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                          try {
                            const result = await queryFulfilled;
                            console.log(" on query started,,,,,,::" , result)
                            dispatch(
                              userLoggedIn({
                                accessToken: result.data.accessToken,
                                user: result.data.user,
                              })
                            );
                          } catch (error: any) {
                            console.log(error);
                          }
                        },
        }),
        
    })
})  

export const { useRefreshTokenQuery , useLoadUserQuery} = apiSlice