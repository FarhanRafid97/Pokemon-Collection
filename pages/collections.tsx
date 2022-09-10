import Layout from '../components/layouts/Layout';
import { Flex, Box } from '@chakra-ui/react';
import { useAppSelector } from '../store/hook';
import PokemonCard from '../components/card/PokemonCard';

interface CollectionsProps {}

const Collections: React.FC<CollectionsProps> = ({}) => {
  const { value } = useAppSelector((state) => state.collectionPokemon);

  if (value.length === 0) {
    return (
      <Layout>
        <Box>U dont Have Collection</Box>
      </Layout>
    );
  }
  return (
    <Layout>
      <Flex flexWrap="wrap" gap="15px" w="full">
        {value.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} collection={true} />
        ))}
      </Flex>
    </Layout>
  );
};

export default Collections;
