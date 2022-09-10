import { useRouter } from 'next/router';
import Layout from '../../../components/layouts/Layout';
import { useDetailPokemonQuery, useEvolutionPokemonQuery } from '../../../store/slice/pokemons';
import { Button, Flex, Box, Heading, Text, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import BannerDetail from '../../../components/detail/BannerDetail';
import EvolutionComp from '../../../components/detail/EvolutionComp';
interface PokemonDetailProps {}

const PokemonDetail: React.FC<PokemonDetailProps> = ({}) => {
  const router = useRouter();

  const { data, isFetching } = useDetailPokemonQuery({ id: Number(router.query.id) });
  const { data: dataEvo, isFetching: isEvoFeth } = useEvolutionPokemonQuery({
    id: Number(router.query.id),
  });

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
    <Layout>
      {isFetching ? <Skeleton h="500px" w="full" /> : <BannerDetail data={data} />}
      {isFetching ? (
        <Skeleton h="300px" mt={8} w="full" />
      ) : (
        <Flex direction="column" w="full" mt={8} minH="100vh">
          <EvolutionComp
            evolution={dataEvo?.pokemon_v2_evolutionchain[0].pokemon_v2_pokemonspecies}
            type={data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type?.name}
          />
        </Flex>
      )}
    </Layout>
  );
};

export default PokemonDetail;
