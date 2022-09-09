import { Text, Flex, Tooltip } from '@chakra-ui/react';
import { BsFillShieldFill } from 'react-icons/bs';
import { GiHealthNormal, GiRunningShoe } from 'react-icons/gi';
import { TbSword, TbSwords } from 'react-icons/tb';
import { FaShieldVirus } from 'react-icons/fa';
import { snakeCase } from '../src/utils/snakeCase';
interface IconsProps {
  type?: string;
  score?: number;
}
const Icons: React.FC<IconsProps> = ({ type, score }) => {
  if (type === 'hp') {
    return (
      <Tooltip label={`Base ${snakeCase(type)}`}>
        <Flex direction="column" alignItems="center">
          <GiHealthNormal color="red" />
          <Text fontSize="12px" mt="2px">
            {score}
          </Text>
        </Flex>
      </Tooltip>
    );
  }
  if (type === 'attack') {
    return (
      <Tooltip label={`Base ${snakeCase(type)}`}>
        <Flex direction="column" alignItems="center">
          <TbSword color="orange" />
          <Text fontSize="12px" mt="2px">
            {score}
          </Text>
        </Flex>
      </Tooltip>
    );
  }
  if (type === 'defense') {
    return (
      <Tooltip label={`Base ${snakeCase(type)}`}>
        <Flex direction="column" alignItems="center">
          <BsFillShieldFill color="gray" />
          <Text fontSize="12px" mt="2px">
            {score}
          </Text>
        </Flex>
      </Tooltip>
    );
  }
  if (type === 'special-attack') {
    return (
      <Tooltip label={`Base ${snakeCase(type)}`}>
        <Flex direction="column" alignItems="center">
          <TbSwords color="orange" />
          <Text fontSize="12px" mt="2px">
            {score}
          </Text>
        </Flex>
      </Tooltip>
    );
  }
  if (type === 'special-defense') {
    return (
      <Tooltip label={`Base ${snakeCase(type)}`}>
        <Flex direction="column" alignItems="center">
          <FaShieldVirus color="green" />
          <Text fontSize="12px" mt="2px">
            {score}
          </Text>
        </Flex>
      </Tooltip>
    );
  }
  if (type === 'speed') {
    return (
      <Tooltip label={`Base ${snakeCase(type)}`}>
        <Flex direction="column" alignItems="center">
          <GiRunningShoe color="blue" />
          <Text fontSize="12px" mt="2px">
            {score}
          </Text>
        </Flex>
      </Tooltip>
    );
  }
  return <></>;
};

export default Icons;
