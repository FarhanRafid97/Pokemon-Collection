import { Box, Heading, Flex } from '@chakra-ui/react';
import { Pokemon_V2_Pokemonspecies } from '../../src/generated/graphql';
import EvolutionCard from '../card/EvolutionCard';
import PokemonCard from '../card/PokemonCard';

interface EvolutionCompProps {
  evolution: Pokemon_V2_Pokemonspecies[] | undefined;
  type: string | undefined;
}

const EvolutionComp: React.FC<EvolutionCompProps> = ({ evolution, type }) => {
  return (
    <Box
      w="100%"
      bg="white"
      boxShadow="md"
      minH="300px"
      border="1px solid #dbdbdb"
      borderRadius="8px"
      p="15px 10px 30px "
    >
      <Heading textAlign="center">Evolution Chain</Heading>
      <Flex columnGap="35px" mt={8} justifyContent="center">
        {evolution?.map((evo) => (
          <EvolutionCard key={evo.id} pokemon={evo} type={type} />
        ))}
      </Flex>
    </Box>
  );
};

export default EvolutionComp;
