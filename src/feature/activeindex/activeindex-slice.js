import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: 0
}

const activeIndexSlice = createSlice({
    name: 'activeindex',
    initialState,
    reducers: {
        setActiveIndex(state, action){
            state.value = action.payload
        }
    }
})

export const { setActiveIndex } = activeIndexSlice.actions;
export default activeIndexSlice.reducer;