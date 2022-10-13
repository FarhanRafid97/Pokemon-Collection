import { Box, Button, Flex, Skeleton } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import AbilitiesPokemon from '../../../components/detail/AbilitiesPokemon';
import BannerDetail from '../../../components/detail/BannerDetail';
import BaseStat from '../../../components/detail/BaseStat';
import DescriptionCarousel from '../../../components/detail/DescriptionCarousel';
import EvolutionComp from '../../../components/detail/EvolutionComp';
import Habitat from '../../../components/detail/Habitat';
import TableMove from '../../../components/detail/TableMove';
import Layout from '../../../components/layouts/Layout';
import { snakeCase } from '../../../src/utils/snakeCase';
import {
  useDetailPokemonQuery,
  useEvolutionPokemonQuery,
  usePokemonSpeciesQuery,
} from '../../../store/slice/pokemons';
interface PokemonDetailProps {}

const PokemonDetail: React.FC<PokemonDetailProps> = ({}) => {
  const router = useRouter();
  const [indexCarousel, setIndexCarousel] = useState(0);

  const { data, isFetching } = useDetailPokemonQuery({ id: Number(router.query.id) });

  const { data: dataEvo, isFetching: isEvoFeth } = useEvolutionPokemonQuery({
    id: Number(router.query.id),
  });

  const { data: pokeSpecies, isFetching: isFetchPokeSpecies } = usePokemonSpeciesQuery({
    id: Number(router.query.id),
  });

  const species = pokeSpecies?.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonspeciesflavortexts;
  const pokemonType = data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type?.name;

  if (data?.pokemon_v2_pokemon?.length === 0 && !isFetching) {
    return (
      <Layout>
        <Box>404 Not Found</Box>
        <Link href="/" passHref>
          <Button>Back</Button>
        </Link>
      </Layout>
    );
  }

  return (
    <>
      <NextSeo
        title={`${snakeCase(data?.pokemon_v2_pokemon[0].name as string) ?? 'Pokemon'} | Pokeman`}
        description={`Detail pokemon ${data?.pokemon_v2_pokemon[0].name} base status,move,habitat,description`}
        canonical="https://www.canonical.ie/"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/pokemon-awesome.png',
          },
        ]}
      />
      <Layout>
        {isFetching ? <Skeleton h="500px" w="full" /> : <BannerDetail data={data} />}
        {isEvoFeth ? (
          <Skeleton h="300px" w="full" />
        ) : (
          <Flex direction="column" mt={8} w="full">
            <EvolutionComp
              evolution={dataEvo?.pokemon_v2_evolutionchain[0].pokemon_v2_pokemonspecies}
              type={pokemonType}
            />
          </Flex>
        )}

        <Flex
          mt={8}
          gap="20px"
          w="full"
          direction={['column', 'column', 'row']}
          minH="100vh"
          alignItems="start"
        >
          <Flex direction="column" rowGap="20px" w={['100%', '100%', '50%']}>
            {isEvoFeth ? (
              <Skeleton h="150px" w="full" />
            ) : (
              <Flex
                w="full"
                overflow="hidden"
                border="1px solid #dbdbdb"
                borderRadius="8px"
                p="10px"
                columnGap="5px"
                alignItems="center"
                boxShadow="md"
              >
                <Box
                  color={indexCarousel <= 0 ? 'gray.300' : 'black'}
                  fontSize="18px"
                  cursor="pointer"
                  onClick={() => {
                    if (indexCarousel <= 0) {
                      return;
                    }
                    setIndexCarousel((e) => e - 1);
                  }}
                >
                  <AiOutlineArrowLeft />
                </Box>
                <Flex overflow="hidden" borderRadius="8px">
                  {species?.map((text, i) => (
                    <DescriptionCarousel
                      key={text.id}
                      isAnimation={i === indexCarousel}
                      text={text.flavor_text}
                      indexCarousel={indexCarousel}
                    />
                  ))}
                </Flex>
                <Box
                  cursor="pointer"
                  color={species && species.length - 1 === indexCarousel ? 'gray.300' : 'black'}
                  fontSize="18px"
                  onClick={() => {
                    if (species && species.length - 1 === indexCarousel) {
                      return;
                    }
                    setIndexCarousel((e) => e + 1);
                  }}
                >
                  <AiOutlineArrowRight />
                </Box>
              </Flex>
            )}
            {isFetchPokeSpecies ? (
              <Skeleton w="full" h="150px" />
            ) : (
              <Habitat
                name={pokeSpecies?.pokemon_v2_pokemonspecies[0].pokemon_v2_pokemonhabitat?.name}
                type={pokemonType}
              />
            )}
            {isFetching ? (
              <Skeleton w="full" h="26rem" />
            ) : (
              <TableMove
                move={data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonmoves}
                type={pokemonType}
              />
            )}
          </Flex>

          <Flex direction="column" w={['100%', '100%', '50%']} rowGap="25px" justifyContent="start">
            {isFetching ? (
              <Skeleton w="full" h="200px" />
            ) : (
              <BaseStat
                baseStat={data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats}
                type={pokemonType}
              />
            )}
            {isFetching ? (
              <Skeleton w="full" h="200px" />
            ) : (
              <AbilitiesPokemon
                abilities={data?.pokemon_v2_pokemon[0]?.pokemon_v2_pokemonabilities}
                type={pokemonType}
              />
            )}
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};

export default PokemonDetail;
