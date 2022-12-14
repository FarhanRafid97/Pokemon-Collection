import { Button, Flex, Heading, Skeleton, Spinner } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import PokemonCard from '../components/card/PokemonCard';
import FilterPokemon from '../components/filter/FilterPokemon';
import Layout from '../components/layouts/Layout';
import { PokemonBase } from '../src/types/pokemon';
import { useMyPokemonsQuery } from '../store/slice/pokemons';

const Home: NextPage = () => {
  const [pokemons, setPokemons] = useState<PokemonBase[]>([]);
  const [offset, setOffset] = useState(0);
  const [gen, setGen] = useState(0);
  const [name, setName] = useState('');
  const [typeId, setTypeId] = useState<number | null>(null);
  const { data, isFetching } = useMyPokemonsQuery({
    name,
    typeId,
    offset,
    generationId: gen,
  });

  useEffect(() => {
    let ignore = false;
    if (data) {
      if (!ignore) {
        setPokemons((e) => [...e, ...data.pokemon_v2_pokemonspecies]);
      }
    }
    return () => {
      ignore = true;
    };
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [gen, name, typeId]);

  return (
    <>
      <NextSeo
        title="Home | Pokeman"
        description="The original Pokémon is a role-playing game based around building a small team of monsters to battle other monsters in a quest to become the best."
        canonical="https://www.canonical.ie/"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/pokemon-awesome.png',
          },
        ]}
      />
      <Layout>
        <FilterPokemon
          setName={setName}
          name={name}
          setGen={setGen}
          setPokemons={setPokemons}
          setTypeId={setTypeId}
          setOffset={setOffset}
        />
        <Flex mt={[12, 12, 12, 0]} flexWrap="wrap" w="full" gap="15px" justifyContent="center">
          {!isFetching &&
            pokemons.length === 0 &&
            (data?.pokemon_v2_pokemonspecies?.length as number) === 0 && (
              <Heading size="lg" mt={4}>{`Poekemon With Name "${name}"  Not Found`}</Heading>
            )}
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} collection={false} />
          ))}

          {isFetching &&
            [...Array(18)].map((_, index) => <Skeleton w="340px" key={index} h="210px" />)}
          {isFetching && pokemons.length === 0 && (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}
        </Flex>
        {pokemons.length <= 0 ||
          (data && !isFetching && (data?.pokemon_v2_pokemonspecies?.length as number) === 18 && (
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
    </>
  );
};

export default Home;
