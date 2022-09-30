import { Flex, Button, Spinner, Heading, Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import Layout from '../components/layouts/Layout';
import { PNG_IMAGE_URL } from '../src/constant/pokemon';
import { snakeCase } from '../src/utils/snakeCase';
import { useKuizPokemonQuery } from '../store/slice/pokemons';
interface KuizPokemonProps {}

const KuizPokemon: React.FC<KuizPokemonProps> = ({}) => {
  const [num, setNum] = useState<null | number>(0);
  const [indexPok, setIndexPoke] = useState<null | number>(null);
  const [answer, setAnswer] = useState('');
  const [isAnswer, setIsAnswer] = useState(false);
  const [isDone, setIsdone] = useState(false);
  const [score, setScore] = useState(0);
  const { data, isFetching } = useKuizPokemonQuery({ id: num as number });

  useEffect(() => {
    setNum(Math.floor(Math.random() * 500 + 1));
    setIndexPoke(Math.floor(Math.random() * 4));
  }, []);

  const submitAnswer = (poke: { id: number; name: string }) => {
    if (isAnswer) {
      return;
    }
    setIsAnswer(true);
    setTimeout(() => {
      setAnswer(poke.name);
      setIsdone(true);
      if (poke.name === data?.pokemon_v2_pokemon[indexPok as number]?.name) {
        setScore((e) => e + 100);
      }
      setTimeout(() => {
        setIsdone(false);
        setAnswer('');
        setTimeout(() => {
          setNum(Math.floor(Math.random() * 500 + 1));
          setIndexPoke(Math.floor(Math.random() * 4));
          setIsAnswer(false);
        }, 1000);
      }, 3000);
    }, 1000);
  };

  const setColor = (poke: { id: number; name: string }) => {
    if (answer === '') {
      return 'gray';
    }
    if (isDone && poke.name === data?.pokemon_v2_pokemon[indexPok as number]?.name) {
      return 'green';
    }
    return 'red';
  };
  return (
    <>
      <NextSeo
        title="Kuiz | Pokeman"
        description="Mini game pokemon quiz, you can select 1 correct answer from 4 answer and get 100 point if its correct"
        canonical="https://www.canonical.ie/"
        additionalLinkTags={[
          {
            rel: 'icon',
            href: '/pokemon-awesome.png',
          },
        ]}
      />
      <Layout>
        <Box mr="auto" mb={4} backgroundColor="telegram.400" p="5px 20px" borderRadius="9px">
          <Text
            fontWeight="bold"
            color={
              answer === data?.pokemon_v2_pokemon[indexPok as number]?.name ? 'green.500' : 'white'
            }
            transition="0.5s"
          >
            Score : {score}
          </Text>
        </Box>
        <Heading>Whos Pokemon Is This</Heading>
        {isFetching ? (
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        ) : (
          <Box
            bgImage={`${PNG_IMAGE_URL}/${data?.pokemon_v2_pokemon[indexPok as number]?.id}.png`}
            w={['250px', '300px', '400px', '400px']}
            bgSize="contain"
            bgRepeat="no-repeat"
            h={['250px', '300px', '400px', '400px']}
            filter={answer !== '' ? 'brightness(100%)' : 'brightness(0%)'}
          />
        )}

        {!isFetching && (
          <Flex w="full" flexWrap="wrap" gap="20px" justifyContent="center">
            {data?.pokemon_v2_pokemon.map((poke) => (
              <Button
                onClick={() => submitAnswer(poke)}
                colorScheme={setColor(poke)}
                w="45%"
                py="25px"
                transition="0.5s"
                key={poke.id}
              >
                {snakeCase(poke.name as string)}
              </Button>
            ))}
          </Flex>
        )}
      </Layout>
    </>
  );
};

export default KuizPokemon;
