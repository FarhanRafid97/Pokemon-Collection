import { Box, Flex, Text } from '@chakra-ui/react';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <Box w="full" p="15px" bg="red.200" position="fixed" zIndex="99">
      <Flex w="85%" margin="auto" justifyContent="space-between">
        <Box>Logo</Box>
        <Flex columnGap="15px">
          <Text>Text</Text>
          <Text>Text</Text>
          <Text>Text</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
