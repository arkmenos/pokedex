import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: 1
}

const activePokemonSlice = createSlice({
    name: 'activepokemon',
    initialState,
    reducers: {
        setActivePokemon(state, action){
            state.value = action.payload
        }
    }
})

export const { setActivePokemon } = activePokemonSlice.actions;
export default activePokemonSlice.reducer;