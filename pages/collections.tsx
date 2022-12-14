import Layout from '../components/layouts/Layout';
import { NextSeo } from 'next-seo';
import { Button, Flex, Box } from '@chakra-ui/react';
import { useAppSelector } from '../store/hook';
import PokemonCard from '../components/card/PokemonCard';
import Link from 'next/link';

interface CollectionsProps {}

const Collections: React.FC<CollectionsProps> = ({}) => {
  const { value } = useAppSelector((state) => state.collectionPokemon);

  if (value.length === 0) {
    return (
      <>
        <NextSeo
          title="Collection | Pokeman"
          description="All list evolution of pokemon from level 1 to level 36 "
          canonical="https://www.canonical.ie/"
          additionalLinkTags={[
            {
              rel: 'icon',
              href: '/pokemon-awesome.png',
            },
          ]}
        />
        <Layout>
          <Flex direction="column">
            <Box>Get Your First Pokemon</Box>
            <Link href="/" passHref>
              <Button
                backgroundColor="black"
                color="white"
                _hover={{ bg: 'rgb(0,0,0,0.75)' }}
                mt={4}
              >
                Search Pokemon
              </Button>
            </Link>
          </Flex>
        </Layout>
      </>
    );
  }
  return (
    <Layout>
      <Flex flexWrap="wrap" gap="15px" w="full" justifyContent={['center', 'center', 'start']}>
        {value.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} collection={true} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Collections;
