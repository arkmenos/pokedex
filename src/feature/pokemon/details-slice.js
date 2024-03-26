import { createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import { detailsApiSlice } from "../../app/api/detailsApiSlice"

const detailsAdapter = createEntityAdapter({})

const initialState = detailsAdapter.getInitialState()

export const detailsSlice = detailsApiSlice.injectEndpoints({
    endpoints: builder => ({
        getDetails: builder.query({
            query: (id=1) => `/pokemon/${id}`,
            validateStatus: (response, result) => {
                return response.status = 200 && !result.isError
            },
            keepUnusedDataFor: 360,
            // transformResponse: responseData => {
            //     const loadedDetailss = responseData.map(details => {
            //         details.id
            //         return details;
            //     });
            //     return detailsAdapter.setAll(initialState, loadedDetailss)
            // },
            // providesTags: (result, error, arg) => {
            //     if(result?.ids){
            //         return [
            //             { type: 'Details', id: 'LIST'},
            //             ...result.ids.map(id => ({type:'Details', id}))
            //         ]
            //     } else return [{type: 'Details', id:'LIST'}]
            // }
        })
    })
})

export const { useGetDetailsQuery } = detailsSlice

//returns the query result object
// export const selectDetailssResult = detailsSlice.endpoints.getDetailss.select();

// //creates memoized selector
// const selectDetailssData = createSelector(
//     selectDetailssResult,
//     detailssResult => detailssResult.data //normalized state object with ids & entities
// )

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//         selectAll: selectAllDetailss,
//         selectById: selectDetailsById,
//         selectIds: selectDetailsIds
//         //Pass in a selector that returns the users slice of state
// } = detailsAdapter.getSelectors(state => selectDetailssData(state) ?? initialState)