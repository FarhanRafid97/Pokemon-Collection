import { Box, Flex } from '@chakra-ui/react';
import BottomBar from './BottomBar';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box padding="10px" w="100vw" pt={32} pb={20}>
        <Sidebar />
        <Flex
          w="full"
          direction="column"
          width={['100%', '100%', '100%', '75%']}
          ml="auto"
          mr={12}
          alignItems="center"
        >
          {children}
        </Flex>
      </Box>
      <BottomBar />
    </>
  );
};

export default Layout;
