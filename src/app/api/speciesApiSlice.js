import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const speciesApiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2/'}),
    tagTypes:['Species'],
    reducerPath:'species',
    endpoints: builder => ({})
})