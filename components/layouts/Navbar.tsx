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
      bg={bgColor}
      borderBottom={`1px solid ${borderColor}`}
      boxShadow="md"
      position="fixed"
      zIndex="99"
    >
      <Flex w="90%" margin="auto" alignItems="center" justifyContent="space-between">
        <Box width="170">
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
