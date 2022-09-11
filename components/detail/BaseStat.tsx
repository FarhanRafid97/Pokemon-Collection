import { Box, Flex, Heading } from '@chakra-ui/react';
import { Pokemon_V2_Pokemonstat } from '../../src/generated/graphql';
import { ImStatsBars } from 'react-icons/im';
import { MAX_BASE_STAT, STATS_LABELS } from '../../src/constant/pokemon';
interface BaseStatProps {
  baseStat: Pokemon_V2_Pokemonstat[] | undefined;
  type: string | undefined;
}

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
      <Flex mb={4} alignItems="center" fontSize="28px" columnGap="15px">
        <Heading size="lg">Base Stat</Heading>
        <Box color={type}>
          <ImStatsBars />
        </Box>
      </Flex>

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
