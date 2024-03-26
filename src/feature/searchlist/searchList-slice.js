import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: []
}

const searchListSlice = createSlice({
    name: 'searchlist',
    initialState,
    reducers: {
        setSearchList(state, action){
            state.value = action.payload
        },
        appendSearchList(state, action){
            state.value = [...state.value, ...action.payload]
        },
        clearSearchList(state){
            state.value = []
        }
        
    }
})

export const { appendSearchList, clearSearchList, setSearchList } = searchListSlice.actions;
export default searchListSlice.reducer;