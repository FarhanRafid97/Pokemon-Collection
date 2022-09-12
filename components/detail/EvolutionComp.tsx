import { Box, Flex, Heading } from '@chakra-ui/react';
import { Pokemon_V2_Pokemonspecies } from '../../src/generated/graphql';
import EvolutionCard from '../card/EvolutionCard';

interface EvolutionCompProps {
  evolution: Pokemon_V2_Pokemonspecies[] | undefined;
  type: string | undefined;
}

const EvolutionComp: React.FC<EvolutionCompProps> = ({ evolution, type }) => {
  return (
    <Box
      w="100%"
      boxShadow="md"
      minH="300px"
      border="1px solid #dbdbdb"
      borderRadius="8px"
      p="15px 10px 30px "
    >
      <Heading textAlign="center">Evolution Chain</Heading>
      <Flex gap={['15px', '15px', '15px', '35px']} mt={8} flexWrap="wrap" justifyContent="center">
        {evolution?.map((evo) => (
          <EvolutionCard key={evo.id} pokemon={evo} type={type} />
        ))}
      </Flex>
    </Box>
  );
};

export default EvolutionComp;
