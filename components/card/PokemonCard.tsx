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
  const pokeTpye = pokemon.pokemon_v2_pokemontypes
    .map((type) => snakeCase(type.pokemon_v2_type?.name as string))
    .join(' / ');

  return (
    <Flex direction="column" position="relative">
      <Link href={`/pokemon/detail/${pokemon.id}`} passHref>
        <Flex
          cursor="pointer"
          alignItems="center"
          direction="column"
          w={340}
          h={250}
          p="25px 10px"
          _hover={{ bgBlendMode: 'saturation' }}
          color="white"
          borderRadius="10px"
          bgColor={`${pokemon?.pokemon_v2_pokemontypes[0]?.pokemon_v2_type?.name}`}
          bgImage={`/pokemon-types/${pokemon.pokemon_v2_pokemontypes[0].pokemon_v2_type?.name}.svg`}
          bgSize="revert-layer"
          bgBlendMode="soft-light"
        >
          <Flex w="full" justifyContent="space-between">
            <Flex direction="column" p="20px" justifyContent="space-between">
              <Heading size="md">{snakeCase(pokemon.name)}</Heading>
              <Box fontSize={['12px', '12px', '12px', '16px']}>
                <Text>Type:</Text>
                <Flex columnGap="10px">
                  <Text>{pokeTpye}</Text>
                </Flex>
              </Box>
            </Flex>
            <Box>
              <Image
                width={150}
                height={150}
                alt={`picture pokemon ${pokemon.name}`}
                src={`${PNG_IMAGE_URL}/${pokemon.id}.png`}
              />
            </Box>
          </Flex>
          <Flex columnGap="13px" mt="auto">
            {pokemon.pokemon_v2_pokemonstats.map((poke, i) => (
              <Icons key={poke.id} type={poke.pokemon_v2_stat?.name} score={poke.base_stat} />
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
