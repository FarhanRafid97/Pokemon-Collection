import { Flex, useColorModeValue, Box } from '@chakra-ui/react';
import { TiThMenuOutline } from 'react-icons/ti';
import { MdOutlineBackpack } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CgArrowsExchange } from 'react-icons/cg';
import Link from 'next/link';
interface BottomBarProps {}

const BottomBar: React.FC<BottomBarProps> = ({}) => {
  const borderColor = useColorModeValue('#dbdbdb', 'black');
  const bgColor = useColorModeValue('white', 'gray.700');

  return (
    <Box
      w="full"
      bg={bgColor}
      borderTop={`1px solid ${borderColor}`}
      boxShadow="md"
      position="fixed"
      bottom="0"
      pb={4}
      display={['block', 'block', 'block', 'none']}
    >
      <Flex
        w={['100%', '100%', '80%']}
        p="7px"
        mx="auto"
        alignItems="center"
        h="full"
        justifyContent="space-between"
      >
        <Link href="/" passHref>
          <Box
            fontSize="24px"
            borderRadius="7px"
            padding={['7px 15px', '7px 15px', '7px 45px']}
            cursor="pointer"
            _hover={{ bg: 'gray.200', transition: '0.4s' }}
          >
            <TiThMenuOutline />
          </Box>
        </Link>
        <Link href="/collections" passHref>
          <Box
            fontSize="24px"
            borderRadius="7px"
            padding={['7px 15px', '7px 15px', '7px 45px']}
            cursor="pointer"
            _hover={{ bg: 'gray.200', transition: '0.4s' }}
          >
            <MdOutlineBackpack />
          </Box>
        </Link>
        <Box
          fontSize="24px"
          borderRadius="7px"
          padding={['7px 15px', '7px 15px', '7px 45px']}
          cursor="pointer"
          _hover={{ bg: 'gray.200', transition: '0.4s' }}
        >
          <AiOutlineInfoCircle />
        </Box>
        <Box
          fontSize="24px"
          borderRadius="7px"
          padding={['7px 15px', '7px 15px', '7px 45px']}
          cursor="pointer"
          _hover={{ bg: 'gray.200', transition: '0.4s' }}
        >
          <CgArrowsExchange />
        </Box>
      </Flex>
    </Box>
  );
};

export default BottomBar;
