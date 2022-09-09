import type { NextPage } from 'next';
import { useMyPokemonsQuery } from '../store/slice/pokemons';
import styles from '../styles/Home.module.css';
import Layout from '../components/layouts/Layout';
import { Box, Button, Spinner, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { PokemonBase } from '../src/types/pokemon';
import PokemonCard from '../components/card/PokemonCard';

const Home: NextPage = () => {
  const [pokemons, setPokemons] = useState<PokemonBase[]>([]);
  const [offset, setOffset] = useState(0);
  const { data, isFetching } = useMyPokemonsQuery({
    limit: 18,
    offset: offset,
  });

  useEffect(() => {
    if (data) {
      setPokemons((e) => [...e, ...data.pokemon_v2_pokemon]);
    }
  }, [data]);
  return (
    <Layout>
      <Flex direction="column" width="75%" ml="auto" alignItems="center">
        {isFetching && pokemons.length === 0 && (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        )}
        <Flex flexWrap="wrap" ml="auto" gap="15px">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}

          {pokemons.length > 0 && (
            <Button
              mt={15}
              w="100%"
              isLoading={isFetching}
              colorScheme="teal"
              onClick={() => setOffset(pokemons[pokemons.length - 1].id)}
            >
              LoadMore
            </Button>
          )}
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Home;
