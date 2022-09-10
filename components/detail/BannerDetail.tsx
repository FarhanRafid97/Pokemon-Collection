import { FetchPokemon } from '../../store/slice/pokemons';
import Image from 'next/image';
import { Flex, Box, Heading, Text, Button, useToast } from '@chakra-ui/react';
import { snakeCase } from '../../src/utils/snakeCase';
import { animate, motion } from 'framer-motion';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { addPokemon } from '../../store/slice/collectionsPokemon';
import { PNG_IMAGE_URL } from '../../src/constant/imageConst';

interface BannerDetailProps {
  data: FetchPokemon | undefined;
}

const variants = {
  open: {
    opacity: 1,
    x: [0, 400, 400, 600, 600, 450],

    y: [0, -600, -600, -600, -600, -100],
  },
  closed: { opacity: 1, x: 0 },
};
const variant = {
  open: { opacity: 1, scale: 0, x: -100, y: 100 },
  closed: { opacity: 1, scale: 1 },
};

const BannerDetail: React.FC<BannerDetailProps> = ({ data }) => {
  const { value } = useAppSelector((state) => state.collectionPokemon);
  const dispatch = useAppDispatch();
  const name = data?.pokemon_v2_pokemon[0].pokemon_v2_pokemontypes.map((d) =>
    snakeCase(d.pokemon_v2_type?.name as string),
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isCatch, setIsCatch] = useState(false);
  const [isPlay, setIsplay] = useState(false);
  const [condition, setCondition] = useState('');

  const toast = useToast();
  const catchPokemon = () => {
    if (isPlay) return true;
    const random = Math.floor(Math.random() * 10 + 1);
    let con = '';
    if (random === 1 || random === 3 || random == 8) {
      dispatch(addPokemon(data?.pokemon_v2_pokemon[0]));
      setCondition('success');
      con = 'success';
    } else {
      setCondition('fail');
      con = 'fail';
    }
    setIsplay(true);
    setIsOpen(true);
    setTimeout(() => {
      setIsCatch(true);
      setTimeout(() => {
        if (con === 'success') {
          toast({
            title: 'Congratulation!!',
            description: 'You Got New Pokemon',
            status: 'success',
            position: 'top',
            duration: 2000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Fail To get New Pokemon',
            description: 'Better Luck Next Time',
            status: 'error',
            position: 'top',
            duration: 2000,
            isClosable: true,
          });
        }
        setIsOpen(false);
        setIsCatch(false);
        setIsplay(false);
      }, 1600);
    }, 1800);
  };

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
            <Flex w="full" justifyContent="space-between" p="25px">
              <Box>
                <Heading>{snakeCase(data?.pokemon_v2_pokemon[0]?.name as string)}</Heading>
                <Heading>#{data?.pokemon_v2_pokemon[0].id}</Heading>
              </Box>
              <Box
                w="350px"
                h="350px"
                as={motion.div}
                animate={isCatch ? 'open' : 'closed'}
                transition="0.2s ease-out"
                variants={variant}
              >
                <Image
                  width={350}
                  height={350}
                  alt={`image for pokemon ${data?.pokemon_v2_pokemon[0].name}`}
                  src={`${PNG_IMAGE_URL}/${data?.pokemon_v2_pokemon[0].id}.png`}
                />
              </Box>
            </Flex>
            <Flex justifyContent="space-between" mt="auto" alignItems="center">
              <Button cursor="pointer" h="60px" bg="whiteAlpha.700" onClick={catchPokemon}>
                <Flex columnGap="15px" alignItems="center">
                  <Box
                    as={motion.div}
                    w="50px"
                    h="50px"
                    animate={isOpen ? 'open' : 'closed'}
                    transition="1s ease-out"
                    variants={variants}
                  >
                    <Image
                      src="/pokemon-awesome.png"
                      width="50px"
                      height="50px"
                      alt="pokemon png"
                    />
                  </Box>
                  <Text color="black">Catch!!</Text>
                </Flex>
              </Button>
              <Flex bg="whiteAlpha.600" borderRadius="12px" p="10px" color="black">
                <Flex
                  justifyContent="center"
                  direction="column"
                  alignItems="center"
                  borderRight="1px solid white"
                  p="5px 60px"
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
                  <Flex>{name?.join(' / ')}</Flex>

                  <Text fontSize="14px">Type</Text>
                </Flex>
                <Box p="5px 60px" borderRight="1px solid white">
                  <Heading textAlign="center" size="lg">
                    {data?.pokemon_v2_pokemon[0].height}
                  </Heading>
                  <Text textAlign="center" fontSize="14px">
                    Height
                  </Text>
                </Box>
                <Box p="5px 60px">
                  <Heading textAlign="center" size="lg">
                    {data?.pokemon_v2_pokemon[0].weight}
                  </Heading>
                  <Text textAlign="center" fontSize="14px">
                    Weight
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BannerDetail;
