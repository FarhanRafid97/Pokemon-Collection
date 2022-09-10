import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slice/pokemons';
import collectionPokemon from './slice/collectionsPokemon';

export const store = configureStore({
  reducer: {
    collectionPokemon,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
