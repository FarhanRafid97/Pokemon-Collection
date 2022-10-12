import { Flex, useColorModeValue, Box } from '@chakra-ui/react';
import { TiThMenuOutline } from 'react-icons/ti';
import { MdOutlineBackpack, MdOutlineQuestionAnswer } from 'react-icons/md';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { CgArrowsExchange } from 'react-icons/cg';
import { useRouter } from 'next/router';
import Link from 'next/link';
interface BottomBarProps {}

const BottomBar: React.FC<BottomBarProps> = ({}) => {
  const borderColor = useColorModeValue('#dbdbdb', 'black');
  const bgColor = useColorModeValue('white', 'gray.700');

  const router = useRouter();
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
            bg={router.pathname === '/' ? 'gray.300' : undefined}
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
            bg={router.pathname.includes('collections') ? 'gray.300' : undefined}
            padding={['7px 15px', '7px 15px', '7px 45px']}
            cursor="pointer"
            _hover={{ bg: 'gray.200', transition: '0.4s' }}
          >
            <MdOutlineBackpack />
          </Box>
        </Link>
        <Link href="/kuiz-pokemon" passHref>
          <Box
            fontSize="24px"
            bg={router.pathname.includes('kuiz-pokemon') ? 'gray.300' : undefined}
            borderRadius="7px"
            padding={['7px 15px', '7px 15px', '7px 45px']}
            cursor="pointer"
            _hover={{ bg: 'gray.200', transition: '0.4s' }}
          >
            <MdOutlineQuestionAnswer />
          </Box>
        </Link>
        <Link href="/evolution" passHref>
          <Box
            fontSize="24px"
            borderRadius="7px"
            bg={router.pathname.includes('evolution') ? 'gray.300' : undefined}
            padding={['7px 15px', '7px 15px', '7px 45px']}
            cursor="pointer"
            _hover={{ bg: 'gray.200', transition: '0.4s' }}
          >
            <CgArrowsExchange />
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
      </Flex>
    </Box>
  );
};

export default BottomBar;
