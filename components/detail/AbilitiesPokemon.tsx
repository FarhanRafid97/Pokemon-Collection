import { Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { GiIceSpellCast } from 'react-icons/gi';
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
      Pokemon Abilities
      <UnorderedList spacing={3} mt={4}>
        {abilities?.map((abillity) => (
          <ListItem key={abillity.id}>
            <Flex fontWeight="bold" fontSize="18px" alignItems="center" columnGap="10px">
              {snakeCase(abillity.pokemon_v2_ability?.name as string)}{' '}
              <Box fontSize="18px" color={type}>
                <GiIceSpellCast />
              </Box>
            </Flex>
            <Text mt="5px">Quidem, ipsam illum quis sed voluptatum quae eum fugit earum</Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default AbilitiesPokemon;
