import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const detailsApiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
    tagTypes:['details'],
    reducerPath:'details',
    endpoints: builder => ({})
})