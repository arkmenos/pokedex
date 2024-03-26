import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'https://pokedex-app.onrender.com'}),
    tagTypes:['Pokemon'],
    reducerPath:'pokemon',
    endpoints: builder => ({})
})