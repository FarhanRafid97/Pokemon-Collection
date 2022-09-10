import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { TiThMenuOutline } from 'react-icons/ti';
import { MdOutlineBackpack } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CgArrowsExchange } from 'react-icons/cg';
import { useState } from 'react';
import { useRouter } from 'next/router';
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const bgColor = useColorModeValue('gray.100', 'gray.600');
  const router = useRouter();

  const [active, setActive] = useState('');
  return (
    <Box
      position="fixed"
      h="100vh"
      left="0"
      top="0"
      w="22%"
      bg={bgColor}
      display={['none', 'none', 'none', 'block']}
    >
      <Flex direction="column" rowGap="15px" mt="100px" w="100%" h="100%" p="15px">
        <Link href="/" passHref>
          <Flex
            onClick={() => setActive('pokemon')}
            fontSize="18px"
            alignItems="center"
            columnGap="10px"
            bg={router.pathname === '/' ? 'green.300' : undefined}
            _hover={{ bg: 'green.300', transition: '0.5s' }}
            cursor="pointer"
            borderRadius="7px"
            p="3px 10px"
          >
            <TiThMenuOutline /> <Text>Pokemon</Text>
          </Flex>
        </Link>
        <Link href="/collections" passHref>
          <Flex
            onClick={() => setActive('collection')}
            fontSize="18px"
            bg={router.pathname.includes('collections') ? 'green.300' : undefined}
            alignItems="center"
            columnGap="10px"
            _hover={{ bg: 'green.300', transition: '0.5s' }}
            cursor="pointer"
            borderRadius="7px"
            p="3px 10px"
          >
            <MdOutlineBackpack /> <Text>Collection</Text>
          </Flex>
        </Link>
        <Flex
          onClick={() => setActive('evolution')}
          fontSize="18px"
          alignItems="center"
          columnGap="10px"
          _hover={{ bg: 'green.300', transition: '0.5s' }}
          cursor="pointer"
          borderRadius="7px"
          p="3px 10px"
        >
          <CgArrowsExchange /> <Text>Evolution</Text>
        </Flex>
        <Flex
          fontSize="18px"
          alignItems="center"
          columnGap="10px"
          _hover={{ bg: 'green.300', transition: '0.5s' }}
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
