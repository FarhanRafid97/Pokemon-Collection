import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { DocumentNode } from 'graphql';
import { ClientError, gql, GraphQLClient } from 'graphql-request';
import {
  FilterPokemon,
  PokemonBase,
  PokemonEvolution,
  PokemonEvolutionChain,
  PokemonMove,
  PokemonSpecies,
} from '../../src/types/pokemon';

export type FetchPokemon = {
  pokemon_v2_pokemon: PokemonBase[];
};
export type DetailPokemonType = {
  pokemon_v2_pokemon: PokemonMove[];
};
export type KuizPokemon = {
  pokemon_v2_pokemon: {
    id: number;
    name: string;
  }[];
};

const pokemons = (): BaseQueryFn<
  {
    document: string | DocumentNode;
    variabless?: { limit: number; offset: number };
  },
  unknown,
  Pick<ClientError, 'message'>
> => {
  return async ({ document, variabless }) => {
    try {
      const graphQLClient = new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta');
      return { data: await graphQLClient.request(document, variabless) };
    } catch (error) {
      if (error instanceof ClientError) {
        return { error: { message: 'error' } };
      }
      throw error;
    }
  };
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: pokemons(),
  tagTypes: ['Pokemons'],
  endpoints: (builder) => ({
    myPokemons: builder.query<
      FetchPokemon,
      { name: string; typeId: number | null; offset: number }
    >({
      query: ({ name, typeId = 1, offset = 0 }) => ({
        document: gql`
          query {
            pokemon_v2_pokemon(  where: {
          name: { _ilike: "%${name}%" } ${
          typeId ? `, pokemon_v2_pokemontypes: {type_id: {_eq: ${typeId}}}` : ''
        }},limit: ${18}, offset: ${offset}) {
              name
              id
              height
              pokemon_v2_pokemonstats {
              id
              base_stat
                pokemon_v2_stat {
                name
                }
             }
              pokemon_v2_pokemontypes {
                  id
                pokemon_v2_type {
                  name
                 }
              }
            }
          }
        `,
      }),
    }),
    evolutionPokemon: builder.query<PokemonEvolution, { id: number }>({
      query: ({ id }) => ({
        document: gql`
          query {
            pokemon_v2_evolutionchain(
              where: { pokemon_v2_pokemonspecies: { id: { _eq: ${id} } } }
            ) {
              id
              pokemon_v2_pokemonspecies {
                name
                id
                pokemon_v2_pokemonevolutions {
                  min_level
                  id
                }
                pokemon_v2_generation {
                   name
                 }
              }
            }
          }
        `,
      }),
    }),
    kuizPokemon: builder.query<KuizPokemon, { id: number }>({
      query: ({ id }) => ({
        document: gql`
          query {
            pokemon_v2_pokemon(limit: 4, offset: ${id}) {
              id
              name
            }
          }
        `,
      }),
    }),
    filterPokemon: builder.query<FilterPokemon, void>({
      query: () => ({
        document: gql`
          query {
            pokemon_v2_generation {
              id
              name
            }
            pokemon_v2_pokemontype(order_by: { type_id: asc }, distinct_on: type_id) {
              pokemon_v2_type {
                id
                name
              }
            }
          }
        `,
      }),
    }),
    evolutionChain: builder.query<PokemonEvolutionChain, { limit: number; offset: number }>({
      query: ({ limit, offset }) => ({
        document: gql`
          query {
            pokemon_v2_pokemonspecies(limit: ${limit}, offset: ${offset}) {
              id
              pokemon_v2_pokemons {
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
    
              pokemon_v2_evolutionchain {
                id
                pokemon_v2_pokemonspecies {
                  name
                  id
                  pokemon_v2_pokemonevolutions {
          min_level
        }
                }
              }
            }
          }
        `,
      }),
    }),
    pokemonSpecies: builder.query<PokemonSpecies, { id: number }>({
      query: ({ id }) => ({
        document: gql`
          query {
            pokemon_v2_pokemonspecies(where: {id: {_eq: ${id}}}) {
        id
    name
    pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 9}}) {
      id
      flavor_text
    }
    pokemon_v2_pokemonhabitat {
      name
    }
    pokemon_v2_pokemons {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
          }
        `,
      }),
    }),
    detailPokemon: builder.query<DetailPokemonType, { id: number }>({
      query: ({ id }) => ({
        document: gql`
          query {
            pokemon_v2_pokemon(where: { id: { _eq: ${id} } }) {
          id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          id
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
                pokemon_v2_stat {
                name
                }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
          pokemon_v2_abilityeffecttexts(where: { language_id: { _eq: 9 } }) {
            short_effect
          }
        }
      }
      pokemon_v2_pokemonmoves(distinct_on: move_id) {
        id
        pokemon_v2_move {
          name
          type_id
          power
          accuracy
          pp
          pokemon_v2_movedamageclass {
            name
          }
        }
      }
    }
          }
        `,
      }),
    }),
  }),
});

export const {
  useMyPokemonsQuery,
  useEvolutionPokemonQuery,
  usePokemonSpeciesQuery,
  useDetailPokemonQuery,
  useKuizPokemonQuery,
  useEvolutionChainQuery,
  useFilterPokemonQuery,
} = apiSlice;
