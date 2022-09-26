import type { NextPage } from 'next';
import { useMyPokemonsQuery } from '../store/slice/pokemons';
import styles from '../styles/Home.module.css';
import Layout from '../components/layouts/Layout';
import { Text, Box, Button, Spinner, Heading, Flex, Skeleton, Input } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { PokemonBase } from '../src/types/pokemon';
import PokemonCard from '../components/card/PokemonCard';
import FilterPokemon from '../components/filter/FilterPokemon';

const Home: NextPage = () => {
  const [pokemons, setPokemons] = useState<PokemonBase[]>([]);
  const [offset, setOffset] = useState(0);
  const [name, setName] = useState('');
  const [typeId, setTypeId] = useState<number | null>(null);
  const { data, isFetching } = useMyPokemonsQuery({
    name,
    typeId,
    offset,
  });

  useEffect(() => {
    if (data) {
      setPokemons((e) => [...e, ...data.pokemon_v2_pokemon]);
    }
  }, [data]);

  return (
    <Layout>
      <Text>{name}</Text>
      <FilterPokemon
        setName={setName}
        name={name}
        setPokemons={setPokemons}
        setTypeId={setTypeId}
        setOffset={setOffset}
      />
      <Flex flexWrap="wrap" w="full" gap="15px" justifyContent="center">
        {!isFetching && pokemons.length === 0 && data?.pokemon_v2_pokemon.length === 0 && (
          <Heading bg="red">No Pokemons</Heading>
        )}
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} collection={false} />
        ))}

        {isFetching &&
          [...Array(18)].map((_, index) => <Skeleton w="340px" key={index} h="210px" />)}
        {isFetching && pokemons.length === 0 && (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        )}
      </Flex>
      {pokemons.length < 0 ||
        (data && data.pokemon_v2_pokemon!.length === 18 && !isFetching && (
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
        ))}
    </Layout>
  );
};

export default Home;
