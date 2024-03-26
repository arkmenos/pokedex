import {configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import { speciesApiSlice } from "./api/speciesApiSlice"
import { detailsApiSlice } from "./api/detailsApiSlice"
import activeIndexReducer from "../feature/activeindex/activeindex-slice"
import activePokemonReducer from "../feature/activepokemon/activepokemon-slice"
import pokeCardsReducer from"../feature/pokecards/pokecards-slice"
import loadmoreReducer from "../feature/loadmore/loadmore-slice"
import searchListReducer from "../feature/searchlist/searchList-slice"

export const store = configureStore({
    reducer:{
        activeindex: activeIndexReducer,
        activepokemon: activePokemonReducer,
        pokecards: pokeCardsReducer,
        loadmore: loadmoreReducer,
        searchlist: searchListReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [speciesApiSlice.reducerPath]: speciesApiSlice.reducer,
        [detailsApiSlice.reducerPath]: detailsApiSlice.reducer,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware, 
            speciesApiSlice.middleware, detailsApiSlice.middleware),
    devTools: false
})