import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { TiThMenuOutline } from 'react-icons/ti';
import { MdOutlineBackpack, MdOutlineQuestionAnswer } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CgArrowsExchange } from 'react-icons/cg';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../store/hook';
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const router = useRouter();
  const { value } = useAppSelector((state) => state.collectionPokemon);
  const borderColor = useColorModeValue('#dbdbdb', 'black');

  return (
    <Box
      position="fixed"
      h="100vh"
      left="0"
      top="0"
      w="20%"
      bg={bgColor}
      borderRight={`1px solid ${borderColor}`}
      display={['none', 'none', 'none', 'block']}
    >
      <Flex direction="column" rowGap="15px" mt="100px" ml="auto" w="90%" h="100%" p="15px" pt={12}>
        <Link href="/" passHref>
          <Flex
            fontSize="18px"
            alignItems="center"
            columnGap="10px"
            bg={router.pathname === '/' ? 'gray.300' : undefined}
            _hover={{ bg: 'gray.300', transition: '0.5s' }}
            cursor="pointer"
            borderRadius="7px"
            p="3px 10px"
          >
            <TiThMenuOutline /> <Text>Pokemon</Text>
          </Flex>
        </Link>
        <Link href="/collections" passHref>
          <Flex
            fontSize="18px"
            bg={router.pathname.includes('collections') ? 'gray.300' : undefined}
            _hover={{ bg: 'gray.300', transition: '0.5s' }}
            cursor="pointer"
            borderRadius="7px"
            justifyContent="space-between"
            p="3px 10px"
          >
            <Flex alignItems="center" columnGap="10px">
              <MdOutlineBackpack /> <Text>Collection</Text>
            </Flex>
            <Box bg="red.500" borderRadius="8px" fontSize="12px" p="5px 9px" color="white">
              {value.length}
            </Box>
          </Flex>
        </Link>
        <Link href="/kuiz-pokemon" passHref>
          <Flex
            fontSize="18px"
            bg={router.pathname.includes('kuiz-pokemon') ? 'gray.300' : undefined}
            _hover={{ bg: 'gray.300', transition: '0.5s' }}
            cursor="pointer"
            borderRadius="7px"
            justifyContent="space-between"
            p="3px 10px"
          >
            <Flex alignItems="center" columnGap="10px">
              <MdOutlineQuestionAnswer /> <Text>Kuiz Pokemon</Text>
            </Flex>
          </Flex>
        </Link>
        <Link href="/evolution" passHref>
          <Flex
            fontSize="18px"
            alignItems="center"
            columnGap="10px"
            _hover={{ bg: 'gray.300', transition: '0.5s' }}
            cursor="pointer"
            borderRadius="7px"
            p="3px 10px"
          >
            <CgArrowsExchange /> <Text>Evolution</Text>
          </Flex>
        </Link>
        <Flex
          fontSize="18px"
          alignItems="center"
          columnGap="10px"
          _hover={{ bg: 'gray.300', transition: '0.5s' }}
          cursor="pointer"
          borderRadius="7px"
          p="3px 10px"
        >
          <AiOutlineInfoCircle /> <Text>About</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
