import { Box, Flex, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = ({}) => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.600');
  const IconDarkMode = useColorModeValue(<BsFillMoonStarsFill />, <BsFillSunFill />);
  return (
    <Box w="full" p="15px" bg={bgColor} borderBottom="1px solid gray" position="fixed" zIndex="99">
      <Flex w="90%" margin="auto" alignItems="center" justifyContent="space-between">
        <Box>
          <Image width={100} height={60} alt="logo for navbar" src="/logo.png" />
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
