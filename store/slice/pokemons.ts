import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import { DocumentNode } from 'graphql';
import { ClientError, gql, GraphQLClient } from 'graphql-request';
import {
  Pokemon_V2_Generation,
  Pokemon_V2_Pokemon,
} from '../../src/generated/graphql';
import { PokemonBase } from '../../src/types/pokemon';

type FetchPokemon = {
  pokemon_v2_pokemon: PokemonBase[];
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
      const graphQLClient = new GraphQLClient(
        'https://beta.pokeapi.co/graphql/v1beta'
      );
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
    myPokemons: builder.query<FetchPokemon, { limit: number; offset: number }>({
      query: ({ limit, offset = 0 }) => ({
        document: gql`
          query {
            pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}) {
              name
              id
              height
              pokemon_v2_pokemonstats {
              base_stat
                pokemon_v2_stat {
                name
                }
             }
              pokemon_v2_pokemontypes {
                pokemon_v2_type {
                  name
                 }
              }
            }
          }
        `,
        variables: { limit, offset },
      }),
    }),
    detailPokemon: builder.query<FetchPokemon, { name: string }>({
      query: ({ name }) => ({
        document: gql`
          query {
            pokemon_v2_pokemon(where: { name: { _eq: ${name} } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        stat_id
        base_stat
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

export const { useMyPokemonsQuery, useDetailPokemonQuery } = apiSlice;
