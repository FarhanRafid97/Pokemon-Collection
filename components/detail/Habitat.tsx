import { Text, Heading, Box } from '@chakra-ui/react';
import { snakeCase } from '../../src/utils/snakeCase';

interface HabitatProps {
  name: string | undefined;
}

const Habitat: React.FC<HabitatProps> = ({ name }) => {
  return (
    <Box w="full" border="1px solid #dbdbdb" boxShadow="lg" borderRadius="8px" p="20px" bg="white">
      <Heading size="lg"> Habitat</Heading>
      <Text mt={4}>{snakeCase(name as string)}</Text>
    </Box>
  );
};

export default Habitat;
