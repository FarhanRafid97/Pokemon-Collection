import { Text, Flex, Heading, Box } from '@chakra-ui/react';
import { Pokemon_V2_Ability, Pokemon_V2_Pokemonstat } from '../../src/generated/graphql';

interface BaseStatProps {
  baseStat: Pokemon_V2_Pokemonstat[] | undefined;
  type: string | undefined;
}

const MAX_BASE_STAT = 255;
export const STATS_LABELS = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];
const BaseStat: React.FC<BaseStatProps> = ({ baseStat, type }) => {
  return (
    <Box
      w="full"
      minH="200px"
      boxShadow="md"
      p="20px"
      borderRadius="8px"
      border="1px solid #dbdbdb"
    >
      <Heading mb={4} size="lg">
        Base Stat
      </Heading>

      <Flex columnGap="55px">
        <Box w="full">
          {baseStat?.map((stat, i) => {
            return (
              <Flex key={STATS_LABELS[i]} alignItems="center">
                <Box w="40">{STATS_LABELS[i]}</Box>
                <Box w="14">{stat.base_stat}</Box>
                <Flex w="100%" bg="gray.300" h="2" borderRadius="15px">
                  <Box
                    w={`${(stat.base_stat / MAX_BASE_STAT) * 100}%`}
                    borderRadius="15px"
                    bg={`${type}`}
                  ></Box>
                </Flex>
              </Flex>
            );
          })}
        </Box>
      </Flex>
    </Box>
  );
};

export default BaseStat;
