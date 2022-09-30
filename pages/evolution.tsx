import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
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
    <>
      <NextSeo
        title="Evolution | Pokeman"
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
        <Flex direction="column" w="full" rowGap="25px">
          {pokemons?.map((species) => {
            return (
              <Flex
                w={['100%', '100%', '100%', '90%']}
                overflow="auto"
                m="auto"
                justifyContent="start"
                key={species.id}
              >
                {species.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map((evolution) => {
                  return (
                    <Flex key={evolution.id}>
                      {evolution.pokemon_v2_pokemonevolutions[0] && (
                        <Flex
                          mx={['4px', '5px', '10px', '10px']}
                          direction="column"
                          alignItems="center"
                          h="full"
                          justifyContent="center"
                        >
                          <Text textAlign="center" fontSize={['14px', '12px', '14px', '14px']}>
                            Level
                            <br />
                            {evolution.pokemon_v2_pokemonevolutions[0]?.min_level
                              ? evolution.pokemon_v2_pokemonevolutions[0]?.min_level
                              : '∞'}
                          </Text>
                          <Box fontSize={['19px', '19px', '29px', '29px']}>
                            <BsArrowRight />
                          </Box>
                        </Flex>
                      )}
                      <Flex
                        alignItems="center"
                        boxShadow="md"
                        border="1px"
                        borderColor={
                          species.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type
                            .name
                        }
                        p="10px 20px"
                        w={['130px', '130px', '240px', '270px']}
                        rowGap="15px"
                        direction={['column', 'column', 'row', 'row']}
                        justifyContent={['center', 'center', 'space-between', 'space-between']}
                      >
                        <Box>
                          <Text
                            mb={4}
                            fontSize={['10px', '10px', '14px', '14px']}
                            textAlign={['center', 'center', 'start', 'start']}
                            borderRadius="8px"
                          >
                            {snakeCase(evolution.name)}
                          </Text>
                          <Flex>
                            {species.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
                              (type, index) => (
                                <Box
                                  color="white"
                                  p="5px 10px"
                                  fontSize="12px"
                                  key={index}
                                  m={['auto', 'auto', '0', '0']}
                                  bg={type.pokemon_v2_type.name}
                                >
                                  {snakeCase(type.pokemon_v2_type.name)}
                                </Box>
                              ),
                            )}
                          </Flex>
                        </Box>
                        <Link href={`/pokemon/detail/${evolution.id}`} passHref>
                          <Box w={['50px', '60px', '60px', '80px']} cursor="pointer" my="auto">
                            <Image
                              src={`${PNG_IMAGE_URL}/${evolution.id}.png`}
                              width={80}
                              height={80}
                              alt={`image for pokemon ${snakeCase(evolution.name)} `}
                            />
                          </Box>
                        </Link>
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
    </>
  );
};
export default Evolution;
