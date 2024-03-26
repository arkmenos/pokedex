import { createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import { speciesApiSlice } from "../../app/api/speciesApiSlice"

const speciesAdapter = createEntityAdapter({})

const initialState = speciesAdapter.getInitialState()

export const speciesSlice = speciesApiSlice.injectEndpoints({
    endpoints: builder => ({
        getSpeciess: builder.query({
            query: (id=1) => `/pokemon-species/${id}`,
            validateStatus: (response, result) => {
                return response.status = 200 && !result.isError
            },
            keepUnusedDataFor: 360,
            // transformResponse: responseData => {
            //     const loadedSpeciess = responseData.map(species => {
            //         species.id
            //         return species;
            //     });
            //     return speciesAdapter.setAll(initialState, loadedSpeciess)
            // },
            // providesTags: (result, error, arg) => {
            //     if(result?.ids){
            //         return [
            //             { type: 'Species', id: 'LIST'},
            //             ...result.ids.map(id => ({type:'Species', id}))
            //         ]
            //     } else return [{type: 'Species', id:'LIST'}]
            // }
        })
    })
})

export const { useGetSpeciessQuery } = speciesSlice

//returns the query result object
// export const selectSpeciessResult = speciesSlice.endpoints.getSpeciess.select();

// //creates memoized selector
// const selectSpeciessData = createSelector(
//     selectSpeciessResult,
//     speciessResult => speciessResult.data //normalized state object with ids & entities
// )

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//         selectAll: selectAllSpeciess,
//         selectById: selectSpeciesById,
//         selectIds: selectSpeciesIds
//         //Pass in a selector that returns the users slice of state
// } = speciesAdapter.getSelectors(state => selectSpeciessData(state) ?? initialState)