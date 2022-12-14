import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PNG_IMAGE_URL } from '../../src/constant/pokemon';
import { PokemonDetailType } from '../../src/types/pokemon';
import { snakeCase } from '../../src/utils/snakeCase';
import CatchPokemon from './CatchPokemon';

type FetchPokemon = {
  pokemon_v2_pokemon: PokemonDetailType[];
};
interface BannerDetailProps {
  data: FetchPokemon | undefined;
}

const BannerDetail: React.FC<BannerDetailProps> = ({ data }) => {
  const dataDispatch = {
    id: data?.pokemon_v2_pokemon[0].id,
    name: data?.pokemon_v2_pokemon[0].name,
    pokemon_v2_pokemons: [
      {
        pokemon_v2_pokemonstats: data?.pokemon_v2_pokemon[0].pokemon_v2_pokemonstats,
        pokemon_v2_pokemontypes: data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes,
      },
    ],
  };

  const name = data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map((d) =>
    snakeCase(d.pokemon_v2_type?.name as string),
  );

  const paddingBox = ['5px 20px', '5px 20px', '5px 60px'];

  return (
    <Flex w="full">
      <Flex
        borderRadius="8px"
        minH="600px"
        w="full"
        p="25px"
        bg={`${data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type?.name}`}
        bgImage={`/pokemon-types/${data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes[0].pokemon_v2_type?.name}.svg`}
        bgSize="auto"
        bgPosition="center"
        bgBlendMode="soft-light"
        bgRepeat="no-repeat"
        color="white"
      >
        <Flex justifyContent="space-between" w="full">
          <Flex direction="column" w="full" h="full" pb="35px">
            <Flex
              w="full"
              direction={['column', 'column', 'row', 'row']}
              justifyContent="space-between"
              alignItems={['center', 'center', 'start', 'start']}
              p="25px"
            >
              <Box mr="auto">
                <Heading>{snakeCase(data?.pokemon_v2_pokemon[0]?.name as string)}</Heading>
                <Heading>#{data?.pokemon_v2_pokemon[0].id}</Heading>
              </Box>
              <Box
                w={['200px', '250px', '350px', '350px']}
                h={['200px', '250px', '350px', '350px']}
                as={motion.div}
                whileInView={{
                  y: [0, -20, 0],

                  transition: {
                    duration: 1.8,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'reverse',
                  },
                }}
              >
                <Image
                  width={350}
                  height={350}
                  alt={`image for pokemon ${data?.pokemon_v2_pokemon[0].name}`}
                  src={`${PNG_IMAGE_URL}/${data?.pokemon_v2_pokemon[0].id}.png`}
                />
              </Box>
            </Flex>
            <Flex
              justifyContent="space-between"
              mt="auto"
              alignItems="center"
              rowGap={25}
              direction={['column-reverse', 'column-reverse', 'row']}
            >
              <CatchPokemon
                dataDispatch={dataDispatch}
                imageUrl={`${PNG_IMAGE_URL}/${data?.pokemon_v2_pokemon[0].id}.png`}
              />
              <Flex bg="whiteAlpha.600" borderRadius="12px" p="10px" color="black">
                <Flex
                  justifyContent="center"
                  direction="column"
                  alignItems="center"
                  borderRight="1px solid white"
                  p={['5px 20px', '5px 20px', '5px 40px']}
                  fontSize={['12px', '12px', '14px', '16px']}
                  w="full"
                >
                  <Flex columnGap="10px" mb="4px">
                    {data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map((type) => (
                      <Box
                        key={type.pokemon_v2_type?.id}
                        w="10px"
                        h="10px"
                        borderRadius="50%"
                        bg={`${type.pokemon_v2_type?.name}`}
                      />
                    ))}
                  </Flex>

                  <Text w="full">{name?.join(' / ')}</Text>

                  <Text>Type</Text>
                </Flex>
                <Flex
                  direction="column"
                  justifyContent="center"
                  p={paddingBox}
                  borderRight="1px solid white"
                >
                  <Heading textAlign="center" size={['xs', 'sm', 'md', 'lg']}>
                    {data?.pokemon_v2_pokemon[0].height}
                  </Heading>
                  <Text textAlign="center" fontSize={['12px', '12px', '14px', '16px']}>
                    Height
                  </Text>
                </Flex>
                <Flex direction="column" justifyContent="center" p={paddingBox}>
                  <Heading textAlign="center" size={['xs', 'sm', 'md', 'lg']}>
                    {data?.pokemon_v2_pokemon[0].weight}
                  </Heading>
                  <Text textAlign="center" fontSize={['12px', '12px', '14px', '16px']}>
                    Weight
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BannerDetail;
