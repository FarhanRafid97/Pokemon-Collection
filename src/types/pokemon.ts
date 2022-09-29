import {
  Maybe,
  Pokemon_V2_Ability,
  Pokemon_V2_Evolutionchain,
  Pokemon_V2_Move,
  Pokemon_V2_Pokemon,
  Pokemon_V2_Pokemonevolution,
  Pokemon_V2_Pokemonspecies,
  Pokemon_V2_Pokemonspeciesflavortext,
  Pokemon_V2_Pokemonstat,
} from '../generated/graphql';

export type PokemonCardType = {
  pokemon_v2_pokemonspecies: [
    Pick<Pokemon_V2_Pokemonspecies, 'id' | 'name'> & {
      pokemon_v2_pokemons: {
        pokemon_v2_pokemonstats: [
          { base_stat: number; id: number; pokemon_v2_stat: { name: string } },
        ];

        pokemon_v2_pokemontypes: {
          pokemon_v2_type: {
            id: NumberConstructor;
            name: string;
          };
        }[];
      }[];
    },
  ];
};

export type PokemonDetailType = Pick<
  Pokemon_V2_Pokemon,
  'id' | 'name' | 'height' | 'weight' | 'pokemon_v2_pokemontypes' | 'pokemon_v2_pokemonstats'
>;
export type PokemonBase = {
  id: number;
  name: string;
  pokemon_v2_pokemons: {
    pokemon_v2_pokemonstats: [{ base_stat: number; id: number; pokemon_v2_stat: { name: string } }];

    pokemon_v2_pokemontypes: {
      pokemon_v2_type: {
        id: NumberConstructor;
        name: string;
      };
    }[];
  }[];
};
export type PokemonMove = Pick<
  Pokemon_V2_Pokemon,
  | 'id'
  | 'name'
  | 'height'
  | 'weight'
  | 'pokemon_v2_pokemontypes'
  | 'pokemon_v2_pokemonstats'
  | 'pokemon_v2_pokemonmoves'
  | 'pokemon_v2_pokemonabilities'
>;

export type PokemonStats = Pick<Pokemon_V2_Pokemonstat, 'stat_id' | 'base_stat'>[];

export type PokemonAbilities =
  | {
      pokemon_v2_ability: Pick<Pokemon_V2_Ability, 'name' | 'pokemon_v2_abilityeffecttexts'>;
    }[]
  | undefined;

export type PokemonEvolution = {
  pokemon_v2_evolutionchain: Pick<Pokemon_V2_Evolutionchain, 'id' | 'pokemon_v2_pokemonspecies'>[];
};

export type PokemonEvolutionChain = {
  pokemon_v2_pokemonspecies: [
    Pick<Pokemon_V2_Pokemonspecies, 'id'> & {
      pokemon_v2_pokemons: [{ pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: string } }] }];

      pokemon_v2_evolutionchain: {
        id: number;
        pokemon_v2_pokemonspecies: [
          Pick<Pokemon_V2_Pokemonspecies, 'name' | 'id'> & {
            pokemon_v2_pokemonevolutions: Pick<Pokemon_V2_Pokemonevolution, 'min_level'>[];
            pokemon_v2_generation: { name: string };
          },
        ];
      };
    },
  ];
};

export type StateInput = {
  id: number;
  pokemon_v2_pokemons: [{ pokemon_v2_pokemontypes: [{ pokemon_v2_type: { name: string } }] }];
  pokemon_v2_evolutionchain: {
    id: number;
    pokemon_v2_pokemonspecies: [
      Pick<Pokemon_V2_Pokemonspecies, 'name' | 'id'> & {
        pokemon_v2_pokemonevolutions: Pick<Pokemon_V2_Pokemonevolution, 'min_level'>[];
        pokemon_v2_generation: { name: string };
      },
    ];
  };
};

export type FilterPokemon = {
  pokemon_v2_generation: {
    id: number;
    name: string;
  }[];
  pokemon_v2_pokemontype: {
    pokemon_v2_type: { id: number; name: string };
  }[];
};
export type PokemonMoves = {
  pokemon_v2_move: Pick<
    Pokemon_V2_Move,
    'name' | 'type_id' | 'power' | 'accuracy' | 'pp' | 'pokemon_v2_movedamageclass'
  >;
}[];
export type PokemonSpecies = {
  pokemon_v2_pokemonspecies: [
    Pick<Pokemon_V2_Pokemonspecies, 'id' | 'name'> & {
      pokemon_v2_pokemonspeciesflavortexts: { id: number; flavor_text: string }[];
      pokemon_v2_pokemonhabitat: Maybe<{ name: string }>;
      pokemon_v2_pokemons: Pick<Pokemon_V2_Pokemon, 'id' | 'name' | 'pokemon_v2_pokemontypes'>[];
    },
  ];
};

export type MyPokemon = {
  id: number;
  name: string;
  types: string[];
};

// export type PokemonEvolution = {
//   evolvesFromSpeciesId: number | null;
//   id: number;
//   name: string;
//   generationId: number;
//   generation: string;
//   types: string[];
//   trigger?: string;
//   minLevel?: Maybe<number>;
//   item?: string;
// }[];
