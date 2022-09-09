import { useRouter } from 'next/router';
import Layout from '../../../components/layouts/Layout';
import { useDetailPokemonQuery } from '../../../store/slice/pokemons';
import { Button, Flex, Box, Heading, Text, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import BannerDetail from '../../../components/detail/BannerDetail';
interface PokemonDetailProps {}

const PokemonDetail: React.FC<PokemonDetailProps> = ({}) => {
  const router = useRouter();

  const { data, isFetching } = useDetailPokemonQuery({ id: Number(router.query.id) });

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
    <Layout>{isFetching ? <Skeleton h="600px" w="full" /> : <BannerDetail data={data} />}</Layout>
  );
};

export default PokemonDetail;
