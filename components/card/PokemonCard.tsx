import { Heading, Box, Flex, Text, Button } from '@chakra-ui/react';
import { PokemonBase } from '../../src/types/pokemon';
import Image from 'next/image';
import Icons from '../Icons';
import { snakeCase } from '../../src/utils/snakeCase';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '../../store/hook';
import { deletePokemon } from '../../store/slice/collectionsPokemon';
import { PNG_IMAGE_URL } from '../../src/constant/pokemon';
interface PokemonCardProps {
  pokemon: PokemonBase;
  collection?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, collection }) => {
  const dispatch = useAppDispatch();

  const pokeType = pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes
    .map((type) => type.pokemon_v2_type.name)
    .join(' / ');

  return (
    <Flex direction="column" position="relative">
      <Link href={`/pokemon/detail/${pokemon.id}`} passHref>
        <Flex
          cursor="pointer"
          alignItems="center"
          direction="column"
          w={340}
          h={210}
          p="25px 10px"
          _hover={{ bgBlendMode: 'saturation' }}
          color="white"
          borderRadius="4px"
          bgColor={`${pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name}`}
          bgImage={`/pokemon-types/${pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes[0].pokemon_v2_type.name}.svg`}
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="130px"
          bgBlendMode="soft-light"
        >
          <Flex w="full" justifyContent="space-between">
            <Flex direction="column" p="10px" rowGap="5px" justifyContent="center">
              <Heading size="md">{snakeCase(pokemon.name)}</Heading>
              <Heading size="md">#{pokemon.id}</Heading>
              <Box fontSize={['12px', '12px', '12px', '16px']}>
                <Text>Type:</Text>
                <Flex columnGap="10px">
                  <Text>{pokeType}</Text>
                </Flex>
              </Box>
            </Flex>
            <Box>
              <Image
                width={120}
                height={120}
                alt={`picture pokemon ${pokemon.name}`}
                src={`${PNG_IMAGE_URL}/${pokemon.id}.png`}
              />
            </Box>
          </Flex>
          <Flex columnGap="13px" mt="auto">
            {pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemonstats.map((poke, i) => (
              <Icons
                key={poke.pokemon_v2_stat.name}
                type={poke.pokemon_v2_stat?.name}
                score={poke.base_stat}
              />
            ))}
          </Flex>
        </Flex>
      </Link>
      {collection && (
        <Button
          position="absolute"
          right="-10px"
          p="0"
          h="40px"
          w="20px"
          borderRadius="50%"
          top="-13px"
          onClick={() => dispatch(deletePokemon(pokemon))}
          colorScheme="red"
        >
          <AiOutlineClose color="white" />
        </Button>
      )}
    </Flex>
  );
};

export default PokemonCard;
