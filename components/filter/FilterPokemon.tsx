import { Box, Button, Flex, Select, Input } from '@chakra-ui/react';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { filterType } from '../../src/constant/pokemon';
import { PokemonBase } from '../../src/types/pokemon';
import { useFilterPokemonQuery } from '../../store/slice/pokemons';
import { FiFilter } from 'react-icons/fi';
interface FilterPokemonProps {
  setName: Dispatch<SetStateAction<string>>;
  setPokemons: Dispatch<SetStateAction<PokemonBase[]>>;
  name: string;
  setTypeId: Dispatch<SetStateAction<number | null>>;
  setOffset: Dispatch<SetStateAction<number>>;
  setGen: Dispatch<SetStateAction<number>>;
}

const FilterPokemon: React.FC<FilterPokemonProps> = ({
  setName,
  setPokemons,
  setGen,
  name,
  setOffset,
  setTypeId,
}) => {
  const [inputName, setInputName] = useState('');
  const [scrollState, setScrollState] = useState(true);
  const [filter, setFilter] = useState(false);
  const { data } = useFilterPokemonQuery();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === inputName) {
      return false;
    }
    setOffset(0);
    setPokemons([]);
    setName(inputName);
  };

  useEffect(() => {
    const scroll = window.addEventListener('scroll', () => {
      if (window.scrollY >= 105) {
        if (scrollState) setScrollState(false);
      } else {
        setScrollState(true);
      }
    });

    return () => {
      window.removeEventListener('scroll', scroll as any);
    };
  }, [scrollState]);

  return (
    <Box
      mr="auto"
      mb={8}
      w="full"
      zIndex="99"
      position={['fixed', 'fixed', 'fixed', 'relative']}
      minH="60px"
    >
      <Flex
        bg={['gray.100', 'gray.100', 'gray.100', 'white']}
        p={2}
        justifyContent={['start', 'center', 'center', 'start']}
        position={
          !scrollState
            ? ['relative', 'relative', 'relative', 'fixed']
            : ['relative', 'relative', 'relative', 'relative']
        }
        top={['-58px', '-55px', '-41px', '20px']}
        zIndex="99"
        m="auto"
        rowGap="5px"
        direction={['column', 'column', 'row', 'row']}
        columnGap="15px"
        px="7px"
      >
        <form onSubmit={onSubmit}>
          <Flex w={['full', 'full', '300px', '300px']} alignItems="center">
            <Input
              placeholder="🔍 Search Pokemon"
              size={['md', 'md', 'md', 'md']}
              mr="5px"
              borderColor="black"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Button type="submit" colorScheme="teal">
              🔍
            </Button>
            <Button
              colorScheme="teal"
              ml="5px"
              display={['flex', 'flex', 'none', 'none']}
              onClick={() => setFilter((e) => !e)}
            >
              <FiFilter />
            </Button>
          </Flex>
        </form>

        <Flex
          columnGap="5px"
          display={[filter ? 'flex' : 'none', filter ? 'flex' : 'none', 'flex', 'flex']}
        >
          <Select
            borderColor="black"
            onChange={(e) => {
              setOffset(0);
              setPokemons([]);
              setGen(Number(e.target.value));
            }}
            fontSize={['12px', '12px', '16px', '16px']}
            w={['full', 'full', '200px', '150px']}
          >
            <option value="">Gen</option>
            {data?.pokemon_v2_generation.map((gen, i) => (
              <option key={gen.id} value={gen.id}>
                {gen.name}
              </option>
            ))}
          </Select>
          <Select
            borderColor="black"
            onChange={(e) => {
              setOffset(0);
              setPokemons([]);
              setTypeId(Number(e.target.value));
            }}
            fontSize={['12px', '12px', '16px', '16px']}
            w={['full', 'full', '200px', '150px']}
          >
            <option value="">Type</option>
            {data?.pokemon_v2_pokemontype.map((type, i) => (
              <option key={type.pokemon_v2_type.id} value={type.pokemon_v2_type.id}>
                {type.pokemon_v2_type.name}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Box>
  );
};

export default FilterPokemon;
