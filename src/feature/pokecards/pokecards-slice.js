import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: []
}

const pokecardsSlice = createSlice({
    name: 'pokecards',
    initialState,
    reducers: {
        setPokeCards(state, action){
            state.value = action.payload
        },
        appendPokeCards(state, action){
            state.value = [...state.value, ...action.payload]
        }
    }
})

export const { appendPokeCards, setPokeCards } = pokecardsSlice.actions;
export default pokecardsSlice.reducer;