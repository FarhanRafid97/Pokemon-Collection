import { Button, Text, Heading, Flex, Box, Spinner } from '@chakra-ui/react';
import Layout from '../components/layouts/Layout';
import { useEvolutionChainQuery } from '../store/slice/pokemons';
import Image from 'next/image';
import { PNG_IMAGE_URL } from '../src/constant/pokemon';
import { BsArrowRight } from 'react-icons/bs';
import { snakeCase } from '../src/utils/snakeCase';
import { PokemonEvolutionChain, StateInput } from '../src/types/pokemon';
import { useEffect, useState } from 'react';
import { useIntersection } from 'react-power-ups';
interface EvolutionProps {}

const Evolution: React.FC<EvolutionProps> = ({}) => {
  const [pokemons, setPokemons] = useState<StateInput[]>([]);
  const [offset, setOffset] = useState(0);
  const { data, isFetching } = useEvolutionChainQuery({ limit: 10, offset: offset });

  useEffect(() => {
    if (data) {
      setPokemons((e) => [...e, ...data.pokemon_v2_pokemonspecies]);
    }
  }, [data]);

  const loadMoreRef = useIntersection({
    rootMargin: '560px',
    onEnter: () => {
      if (data) {
        setOffset(data?.pokemon_v2_pokemonspecies[data?.pokemon_v2_pokemonspecies.length - 1].id);
      }
    },
    enabled: !isFetching,
  });

  return (
    <Layout>
      <Flex direction="column" w="full" rowGap="15px">
        {pokemons?.map((species) => {
          return (
            <Flex
              w="80%"
              overflow="auto"
              m="auto"
              justifyContent="start"
              key={species.id}
              pb={4}
              borderBottom="1px"
            >
              {species.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map((evolution) => {
                return (
                  <Flex key={evolution.id}>
                    {evolution.pokemon_v2_pokemonevolutions[0] && (
                      <Flex
                        mx="45px"
                        direction="column"
                        px={4}
                        alignItems="center"
                        h="full"
                        justifyContent="center"
                      >
                        <Text textAlign="center" fontSize="14px">
                          Level
                          <br />
                          {evolution.pokemon_v2_pokemonevolutions[0]?.min_level
                            ? evolution.pokemon_v2_pokemonevolutions[0]?.min_level
                            : '∞'}{' '}
                        </Text>
                        <Box fontSize="39px">
                          <BsArrowRight />
                        </Box>
                      </Flex>
                    )}
                    <Flex direction="column" alignItems="center" bg="white">
                      <Box flex="1" _hover={{ scale: 1.2 }}>
                        <Image
                          src={`${PNG_IMAGE_URL}/${evolution.id}.png`}
                          width={150}
                          height={140}
                          alt={`image for pokemon ${snakeCase(evolution.name)} `}
                        />
                      </Box>
                      <Text
                        color="white"
                        bg={
                          species.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
                            .name
                        }
                        p="3px 15px"
                        borderRadius="8px"
                      >
                        {snakeCase(evolution.name)}
                      </Text>
                    </Flex>
                  </Flex>
                );
              })}
            </Flex>
          );
        })}
        {isFetching ? (
          <Spinner
            m="auto"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <>
            {' '}
            <div />
            <div />
            <div ref={loadMoreRef} />
          </>
        )}
      </Flex>
    </Layout>
  );
};
export default Evolution;
