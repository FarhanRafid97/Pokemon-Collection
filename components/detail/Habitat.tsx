import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { GiHabitatDome } from 'react-icons/gi';
import { snakeCase } from '../../src/utils/snakeCase';
interface HabitatProps {
  name: string | undefined;
  type: string | undefined;
}

const Habitat: React.FC<HabitatProps> = ({ name, type }) => {
  return (
    <Box w="full" border="1px solid #dbdbdb" boxShadow="lg" borderRadius="8px" p="20px">
      <Flex alignItems="center" columnGap="15px">
        <Heading size="lg"> Habitat</Heading>
        <Box color={type} fontSize="24px">
          <GiHabitatDome />
        </Box>
      </Flex>
      <Text mt={4}>{snakeCase(name as string) ?? 'Unknown'}</Text>
    </Box>
  );
};

export default Habitat;
