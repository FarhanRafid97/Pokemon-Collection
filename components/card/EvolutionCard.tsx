import { Pokemon_V2_Pokemonspecies } from '../../src/generated/graphql';
import { Heading, Flex, Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { PNG_IMAGE_URL } from '../../src/constant/imageConst';
import Link from 'next/link';
import { snakeCase } from '../../src/utils/snakeCase';

type EvoPoke = Pick<
  Pokemon_V2_Pokemonspecies,
  'id' | 'name' | 'pokemon_v2_generation' | 'pokemon_v2_pokemonevolutions'
>;
interface EvolutionCardProps {
  pokemon: EvoPoke | undefined;
  type: string | undefined;
}

const EvolutionCard: React.FC<EvolutionCardProps> = ({ pokemon, type }) => {
  return (
    <Link href={`/pokemon/detail/${pokemon?.id}`} passHref>
      <Flex
        cursor="pointer"
        borderRadius="8px"
        bg={`${type}`}
        bgImage={`/pokemon-types/${type}.svg`}
        bgPosition="center"
        bgSize="contain"
        bgBlendMode="soft-light"
        _hover={{ bgBlendMode: 'saturation' }}
        bgRepeat="no-repeat"
        w="200px"
        p="15px"
        direction="column"
        alignItems="center"
        rowGap="15px"
        color="white"
      >
        <Heading size="md">{snakeCase(pokemon?.name as string)}</Heading>
        <Box mt={4}>
          <Image
            width={100}
            height={100}
            layout="responsive"
            src={`${PNG_IMAGE_URL}/${pokemon?.id}.png`}
            alt={`image for ${pokemon?.name}`}
          />
          <Text textAlign="center" textTransform="capitalize">
            {pokemon?.pokemon_v2_generation?.name}
          </Text>
          <Text textAlign="center">
            {pokemon?.pokemon_v2_pokemonevolutions.length === 0
              ? `Level 1`
              : `Level ${pokemon?.pokemon_v2_pokemonevolutions[0].min_level}`}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default EvolutionCard;
