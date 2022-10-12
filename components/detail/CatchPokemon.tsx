import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
  Box,
  Text,
  chakra,
  shouldForwardProp,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { motion, isValidMotionProp } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Pokemon_V2_Pokemonstat, Pokemon_V2_Pokemontype } from '../../src/generated/graphql';
import { addPokemon } from '../../store/slice/collectionsPokemon';
import { useAppSelector, useAppDispatch } from '../../store/hook';

interface CatchPokemonProps {
  imageUrl: string;
  dataDispatch: {
    id: number | undefined;
    name: string | undefined;
    pokemon_v2_pokemons: {
      pokemon_v2_pokemonstats: Pokemon_V2_Pokemonstat[] | undefined;
      pokemon_v2_pokemontypes: Pokemon_V2_Pokemontype[] | undefined;
    }[];
  };
}

const variant = {
  catch: {
    opacity: 1,
    scale: [1, 2, 2, 1, 1],
    y: [-60, -200, -60],
    x: 250,
    borderRadius: ['20%', '20%', '50%', '50%', '20%'],
  },
  closed: { opacity: 1, x: 0 },
};
const animatePokemon = {
  catch: {
    scale: 0,
    opacity: [1, 1, 0],
    x: 50,
    y: [0, -60, 10],

    borderRadius: ['20%', '20%', '50%', '50%', '20%'],
  },
  closed: { opacity: 1, x: 0 },
};

const CatchPokemon: React.FC<CatchPokemonProps> = ({ imageUrl, dataDispatch }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const btnRef: any = useRef();
  const pokeCollections = useAppSelector((state) => state.collectionPokemon);

  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
  });

  const [isPlay, setIsplay] = useState(false);
  const [isCatch, setIsCatch] = useState(false);
  const [isSucced, setIsSucced] = useState(false);

  const toast = useToast();

  const catchPokemon = () => {
    onOpen();

    const isCatched = pokeCollections.value.filter((poke) => poke.id === dataDispatch.id);
    if (isCatched.length === 1) {
      setIsSucced(true);
      return 0;
    }
    if (isPlay) {
      return true;
    }
    const random = Math.floor(Math.random() * 10 + 1);
    let con = false;

    if (random === 1 || random === 3 || random == 8) {
      dispatch(addPokemon(dataDispatch));

      con = true;
    } else {
      con = false;
    }
    setIsplay(true);
    setIsCatch(true);
    setTimeout(() => {
      setTimeout(() => {
        con
          ? toast({
              title: 'Congratulation!!',
              description: 'You Got New Pokemon',
              status: 'success',
              position: 'top',
              duration: 2000,
              isClosable: true,
            })
          : toast({
              title: 'Fail To get New Pokemon',
              description: 'Better Luck Next Time',
              status: 'error',
              position: 'top',
              duration: 2000,
              isClosable: true,
            });

        setIsCatch(false);
        setIsplay(false);
        con ? setIsSucced(true) : setIsSucced(false);
      }, 1600);
    }, 1800);
  };

  return (
    <>
      <Button cursor="pointer" h="60px" bg="whiteAlpha.700" onClick={catchPokemon}>
        <Flex columnGap="15px" alignItems="center">
          <Box
            w="50px"
            h="50px"
            transition="1s ease-out"
            // variants={variants}
          >
            <Image src="/pokemon-awesome.png" width="50px" height="50px" alt="pokemon png" />
          </Box>
          <Text color="black">Catch!!</Text>
        </Flex>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{!isSucced ? 'Catch This Pokemon!!' : 'Your Pokemon'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody position="relative">
            <ChakraBox
              width="50px"
              bottom="0"
              position="absolute"
              zIndex="99"
              initial={{ x: 250, y: -60 }}
              animate={isCatch ? 'catch' : 'stoped'}
              variants={variant}
            >
              <Image src="/pokemon-awesome.png" width="50px" height="50px" alt="pokemon png" />
            </ChakraBox>
            <ChakraBox
              animate={isCatch ? 'catch' : 'stoped'}
              // @ts-ignore no problem in operation, although type error appears.
              transition={{
                delay: 1,
                duration: 1,
                ease: 'easeInOut',
              }}
              variants={animatePokemon}
            >
              <Flex justifyContent="center" alignItems="center" w="full" h="300px">
                <Image src={imageUrl} width={150} height={150} alt="catch pokemon " />
              </Flex>
            </ChakraBox>
          </ModalBody>

          <ModalFooter>
            {!isSucced ? (
              <Button w="full" colorScheme="blue" mr={3} onClick={catchPokemon}>
                Try Again
              </Button>
            ) : (
              <Button w="full" colorScheme="red" variant="solid" onClick={onClose}>
                Close
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CatchPokemon;
