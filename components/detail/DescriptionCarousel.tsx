import { Flex, Text } from '@chakra-ui/react';
interface DescriptionCarouselProps {
  text: string;
  indexCarousel: number;
}

const DescriptionCarousel: React.FC<DescriptionCarouselProps> = ({ text, indexCarousel }) => {
  return (
    <Flex
      minW="full"
      p="5px"
      alignItems="center"
      px="15px"
      transition="1s"
      transform={`translateX(calc(-${indexCarousel}00% ))`}
    >
      <Text>{text}</Text>
    </Flex>
  );
};

export default DescriptionCarousel;
