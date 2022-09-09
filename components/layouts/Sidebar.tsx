import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { TiThMenuOutline } from 'react-icons/ti';
import { MdOutlineBackpack } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CgArrowsExchange } from 'react-icons/cg';
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  return (
    <Box position="fixed" h="100vh" left="0" top="0" w="22%" bg="gray.100">
      <Flex
        direction="column"
        rowGap="15px"
        mt="100px"
        w="100%"
        h="100%"
        p="15px"
      >
        <Flex
          fontSize="18px"
          alignItems="center"
          columnGap="10px"
          _hover={{ bg: 'green.300', transition: '0.5s' }}
          cursor="pointer"
          borderRadius="7px"
          p="3px 10px"
        >
          <TiThMenuOutline /> <Text>Pokemon</Text>
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
          <MdOutlineBackpack /> <Text>Collection</Text>
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
