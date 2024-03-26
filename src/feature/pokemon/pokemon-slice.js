import { createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const pokemonAdapter = createEntityAdapter({})

const initialState = pokemonAdapter.getInitialState()

export const pokemonSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPokemons: builder.query({
            query: () => '/pokemon',
            validateStatus: (response, result) => {
                return response.status = 200 && !result.isError
            },
            keepUnusedDataFor: 360,
            transformResponse: responseData => {
                const loadedPokemons = responseData.map(pokemon => {
                    pokemon.id
                    return pokemon;
                });
                return pokemonAdapter.setAll(initialState, loadedPokemons)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        { type: 'Pokemon', id: 'LIST'},
                        ...result.ids.map(id => ({type:'Pokemon', id}))
                    ]
                } else return [{type: 'Pokemon', id:'LIST'}]
            }
        })
    })
})

export const { useGetPokemonsQuery } = pokemonSlice

//returns the query result object
export const selectPokemonsResult = pokemonSlice.endpoints.getPokemons.select();

//creates memoized selector
const selectPokemonsData = createSelector(
    selectPokemonsResult,
    pokemonsResult => pokemonsResult.data //normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
        selectAll: selectAllPokemons,
        selectById: selectPokemonById,
        selectIds: selectPokemonIds
        //Pass in a selector that returns the users slice of state
} = pokemonAdapter.getSelectors(state => selectPokemonsData(state) ?? initialState)