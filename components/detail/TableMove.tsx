import {
  Table,
  Flex,
  Thead,
  Tooltip,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { BsArrowsMove } from 'react-icons/bs';
import { TYPE } from '../../src/constant/pokemon';
import { Pokemon_V2_Pokemonmove } from '../../src/generated/graphql';
import { snakeCase } from '../../src/utils/snakeCase';

interface TableMoveProps {
  move: Pick<Pokemon_V2_Pokemonmove, 'id' | 'pokemon_v2_move'>[] | undefined;
  type: string | undefined;
}

const TableMove: React.FC<TableMoveProps> = ({ move, type }) => {
  const tableHead = useColorModeValue('gray.100', 'gray.800');
  if (!move) {
    return <Box>Undefined</Box>;
  }

  return (
    <Box
      border="1px solid #dbdbdb"
      position="relative"
      p="20px"
      boxShadow="md"
      borderRadius="8px"
      w="full"
    >
      <Flex mb={4} alignItems="center" columnGap="15px" fontSize="24px">
        <Heading size="lg">Move</Heading>
        <Box color={type}>
          <BsArrowsMove />
        </Box>
      </Flex>
      <TableContainer maxH="26rem" overflowY="scroll">
        <Table size="sm">
          <Thead position="sticky" bg={tableHead} top="0">
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Class</Th>
              <Th>Pwr</Th>
              <Th>Acc</Th>
              <Th>PP</Th>
            </Tr>
          </Thead>
          <Tbody>
            {move.map((move) => {
              const typeConst = TYPE[move.pokemon_v2_move?.type_id as keyof typeof TYPE];
              return (
                <Tr key={move.id}>
                  <Td>{snakeCase(move.pokemon_v2_move?.name as string)}</Td>
                  <Td display="flex" alignItems="center" columnGap="5px">
                    <Box w="10px" h="10px" bg={`${typeConst}`} />
                    {snakeCase(typeConst as string)}
                  </Td>
                  <Td>
                    <Tooltip
                      label={`${snakeCase(
                        move?.pokemon_v2_move!.pokemon_v2_movedamageclass!.name,
                      )}`}
                    >
                      {{
                        physical: '🪓',
                        status: '🛡️',
                        special: '⚔️',
                      }[move?.pokemon_v2_move!.pokemon_v2_movedamageclass!.name] || '–'}
                    </Tooltip>
                  </Td>
                  <Td color={typeConst}>
                    {move.pokemon_v2_move?.power ? move.pokemon_v2_move?.power : '-'}
                  </Td>
                  <Td color={typeConst}>
                    {move.pokemon_v2_move?.accuracy ? move.pokemon_v2_move?.accuracy : '-'}
                  </Td>
                  <Td color={typeConst}>
                    {move.pokemon_v2_move?.pp ? move.pokemon_v2_move?.pp : '-'}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableMove;
