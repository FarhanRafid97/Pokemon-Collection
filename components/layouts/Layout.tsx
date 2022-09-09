import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box padding="15px" w="full" pt={28}>
        <Sidebar />
        {children}
      </Box>
    </>
  );
};

export default Layout;
