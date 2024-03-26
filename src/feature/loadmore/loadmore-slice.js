import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: true
}

const loadMoreSlice = createSlice({
    name: 'loadmore',
    initialState,
    reducers: {
        setLoadMore(state, action){
            state.value = action.payload
        }
    }
})

export const { setLoadMore } = loadMoreSlice.actions;
export default loadMoreSlice.reducer;