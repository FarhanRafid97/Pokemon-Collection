import { Heading, Box, Flex, Text } from '@chakra-ui/react';
import { PokemonBase } from '../../src/types/pokemon';
import Image from 'next/image';
import Icons from '../Icons';
import { snakeCase } from '../../src/utils/snakeCase';
import Link from 'next/link';
interface PokemonCardProps {
  pokemon: PokemonBase;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const PNG_IMAGE_URL =
    'https://cdn.statically.io/gh/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
  return (
    <Link href={`/pokemon/detail/${pokemon.id}`} passHref>
      <Flex
        cursor="pointer"
        alignItems="center"
        direction="column"
        w={340}
        border="1px solid white"
        minH={250}
        p="25px 10px"
        _hover={{
          border: '1px solid black',
          transition: '0.5s',
        }}
        color="white"
        borderRadius="10px"
        bgColor={`${pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type?.name}`}
        bgImage={`/pokemon-types/${pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type?.name}.svg`}
        bgSize="revert-layer"
        bgBlendMode="soft-light"
      >
        <Flex w="full" justifyContent="space-between">
          <Flex direction="column" p="20px" justifyContent="space-between">
            <Heading size="md">{snakeCase(pokemon.name)}</Heading>
            <Box>
              <Text fontSize="14px">Type:</Text>
              <Flex columnGap="10px">
                {pokemon.pokemon_v2_pokemontypes.map((type) => (
                  <Text key={type.id} fontSize="14px" textTransform="capitalize">
                    {type.pokemon_v2_type?.name}
                  </Text>
                ))}
              </Flex>
            </Box>
          </Flex>
          <Box _hover={{ scale: 1.3 }}>
            <Image
              width={150}
              height={150}
              alt={`picture pokemon ${pokemon.name}`}
              src={`${PNG_IMAGE_URL}/${pokemon.id}.png `}
            />
          </Box>
        </Flex>
        <Flex columnGap="13px" mt="auto">
          {pokemon.pokemon_v2_pokemonstats.map((poke) => (
            <Icons key={poke.id} type={poke.pokemon_v2_stat?.name} score={poke.base_stat} />
          ))}
        </Flex>
      </Flex>
    </Link>
  );
};

export default PokemonCard;
