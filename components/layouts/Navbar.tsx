import { Box, Flex, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = ({}) => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.700');
  const IconDarkMode = useColorModeValue(<BsFillMoonStarsFill />, <BsFillSunFill />);
  const borderColor = useColorModeValue('#dbdbdb', 'black');
  return (
    <Box
      w="full"
      p="15px"
      px="20px"
      bg={bgColor}
      borderBottom={`0.5px solid #dbdbdb`}
      position="fixed"
      zIndex="99"
    >
      <Flex w="93%" margin="auto" alignItems="center" justifyContent="space-between">
        <Box w={['90px', '110px', '150px', '150px']}>
          <Image width={150} height={50} alt="logo for navbar" src="/logo-nav.svg.png" />
        </Box>
        <Flex columnGap="15px">
          <Box onClick={toggleColorMode} cursor="pointer">
            {IconDarkMode}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
