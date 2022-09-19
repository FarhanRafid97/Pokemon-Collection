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
  // const loadMoreRef = useIntersection({
  //   rootMargin: '560px',
  //   onEnter: () => setOffset(pokemons[pokemons.length - 1].id),
  //   enabled: !isFetching,
  // });
  return (
    <Layout>
      {isFetching && pokemons.length === 0 && (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      )}
      <Flex flexWrap="wrap" ml="auto" gap="15px" justifyContent="center">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} collection={false} />
        ))}

        {pokemons.length > 0 && (
          <Button
            mt={15}
            w="200px"
            isLoading={isFetching}
            backgroundColor="black"
            color="white"
            _hover={{ bg: 'rgb(0,0,0,0.75)' }}
            onClick={() => setOffset(pokemons[pokemons.length - 1].id)}
          >
            Load More
          </Button>
        )}
      </Flex>
      {/* <div />
      <div />

      // <div ref={loadMoreRef} /> */}
    </Layout>
  );
};

export default Home;
