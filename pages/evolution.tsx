import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { useIntersection } from 'react-power-ups';
import Layout from '../components/layouts/Layout';
import { PNG_IMAGE_URL } from '../src/constant/pokemon';
import { StateInput } from '../src/types/pokemon';
import { snakeCase } from '../src/utils/snakeCase';
import { useEvolutionChainQuery } from '../store/slice/pokemons';
import Link from 'next/link';
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
      <Flex direction="column" w="full" rowGap="25px">
        {pokemons?.map((species) => {
          return (
            <Flex
              w={['100%', '90%', '90%', '90%']}
              overflow="auto"
              m="auto"
              justifyContent="start"
              key={species.id}
              p={4}
              borderBottom="1px"
              borderColor={
                species.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name
              }
            >
              {species.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map((evolution) => {
                return (
                  <Flex key={evolution.id}>
                    {evolution.pokemon_v2_pokemonevolutions[0] && (
                      <Flex
                        mx={['15px', '15px', '45px', '45px']}
                        direction="column"
                        px={4}
                        alignItems="center"
                        h="full"
                        justifyContent="center"
                      >
                        <Text textAlign="center" fontSize={['14px', '10px', '14px', '14px']}>
                          Level
                          <br />
                          {evolution.pokemon_v2_pokemonevolutions[0]?.min_level
                            ? evolution.pokemon_v2_pokemonevolutions[0]?.min_level
                            : '∞'}{' '}
                        </Text>
                        <Box fontSize={['19px', '19px', '39px', '39px']}>
                          <BsArrowRight />
                        </Box>
                      </Flex>
                    )}
                    <Flex direction="column" alignItems="center">
                      <Link href={`/pokemon/detail/${evolution.id}`} passHref>
                        <Box flex="1" w={[54, 62, 130, 130]} cursor="pointer">
                          <Image
                            src={`${PNG_IMAGE_URL}/${evolution.id}.png`}
                            width={130}
                            height={130}
                            alt={`image for pokemon ${snakeCase(evolution.name)} `}
                          />
                        </Box>
                      </Link>
                      <Text
                        color="white"
                        bg={
                          species.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
                            .name
                        }
                        p="3px 12px"
                        fontSize={['10px', '10px', '10px', '10px']}
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
