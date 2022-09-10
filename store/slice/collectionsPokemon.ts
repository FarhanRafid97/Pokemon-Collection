import { createSlice } from '@reduxjs/toolkit';
import { PokemonBase } from '../../src/types/pokemon';

interface Pokemons {
  value: PokemonBase[];
}

const initialState: Pokemons = {
  value: [],
};

const collectionsSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addPokemon: (state, action) => {
      const isDuplicate = state.value.filter((data) => data.id === action.payload.id);

      state.value = isDuplicate.length !== 0 ? state.value : [...state.value, action.payload];
    },
    deletePokemon: (state, action) => {
      const deleted = state.value.filter((fav) => fav.id !== action.payload.id);

      state.value = deleted;
    },
  },
});
export const { addPokemon, deletePokemon } = collectionsSlice.actions;

export default collectionsSlice.reducer;
