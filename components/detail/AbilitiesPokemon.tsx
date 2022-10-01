import { Heading, Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { GiIceSpellCast, GiSpellBook } from 'react-icons/gi';
import { Pokemon_V2_Pokemonability } from '../../src/generated/graphql';
import { snakeCase } from '../../src/utils/snakeCase';
interface AbilitiesPokemonProps {
  abilities: Pokemon_V2_Pokemonability[] | undefined;
  type: string | undefined;
}

const AbilitiesPokemon: React.FC<AbilitiesPokemonProps> = ({ abilities, type }) => {
  return (
    <Box
      border="1px solid #dbdbdb"
      position="relative"
      p="20px"
      boxShadow="md"
      borderRadius="8px"
      w="full"
    >
      <Flex mb={4} alignItems="center" fontSize="28px" columnGap="15px">
        <Heading size="lg">Pokemon Abilities</Heading>
        <Box color={type}>
          <GiSpellBook />
        </Box>
      </Flex>
      <UnorderedList spacing={3} mt={4}>
        {abilities?.map((abillity) => (
          <ListItem key={abillity.pokemon_v2_ability?.name}>
            <Flex fontWeight="bold" fontSize="18px" alignItems="center" columnGap="10px">
              {snakeCase(abillity.pokemon_v2_ability?.name as string)}{' '}
              <Box fontSize="18px" color={type}>
                <GiIceSpellCast />
              </Box>
            </Flex>
            <Text mt="5px">
              {abillity?.pokemon_v2_ability?.pokemon_v2_abilityeffecttexts[0].short_effect}
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default AbilitiesPokemon;
