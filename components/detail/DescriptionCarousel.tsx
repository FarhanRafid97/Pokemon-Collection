import { Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
interface DescriptionCarouselProps {
  text: string;
  indexCarousel: number;
  isAnimation: boolean;
}
const descAnimation = {
  desc: {
    opacity: 1,
  },
  closed: { opacity: 0 },
};

const DescriptionCarousel: React.FC<DescriptionCarouselProps> = ({
  text,
  isAnimation,
  indexCarousel,
}) => {
  return (
    <Flex
      minW="full"
      p="5px"
      alignItems="center"
      px="15px"
      transform={`translateX(calc(-${indexCarousel}00% ))`}
    >
      <Text
        as={motion.p}
        animate={isAnimation ? 'desc' : 'closed'}
        variants={descAnimation}
        // @ts-ignore no problem in operation, although type error appears.
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        {text}
      </Text>
    </Flex>
  );
};

export default DescriptionCarousel;
