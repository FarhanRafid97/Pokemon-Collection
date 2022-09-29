import { Box, Button, Flex, Select, Input } from '@chakra-ui/react';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { filterType } from '../../src/constant/pokemon';
import { PokemonBase } from '../../src/types/pokemon';
import { useFilterPokemonQuery } from '../../store/slice/pokemons';
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
    <Box mr="auto" position="relative" minH="60px">
      <Flex
        bg={['red', 'red', 'red', 'white']}
        justifyContent={['start', 'start', 'center', 'start']}
        position={!scrollState ? 'fixed' : 'relative'}
        top={!scrollState ? ['20px', '20px', '120px', '20px'] : ''}
        zIndex="99"
        m="auto"
        columnGap="15px"
        px="7px"
      >
        <form onSubmit={onSubmit}>
          <Flex w="300px">
            <Input
              size="md"
              mr="5px"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <Button type="submit" colorScheme="telegram">
              Search
            </Button>
          </Flex>
        </form>

        <Select
          onChange={(e) => {
            setOffset(0);
            setPokemons([]);
            setGen(Number(e.target.value));
          }}
          w="150px"
        >
          <option value="">Gen</option>
          {data?.pokemon_v2_generation.map((gen, i) => (
            <option key={gen.id} value={gen.id}>
              {gen.name}
            </option>
          ))}
        </Select>
        <Select
          onChange={(e) => {
            setOffset(0);
            setPokemons([]);
            setTypeId(Number(e.target.value));
          }}
          w="150px"
        >
          <option value="">Type</option>
          {data?.pokemon_v2_pokemontype.map((type, i) => (
            <option key={type.pokemon_v2_type.id} value={type.pokemon_v2_type.id}>
              {type.pokemon_v2_type.name}
            </option>
          ))}
        </Select>
      </Flex>
    </Box>
  );
};

export default FilterPokemon;
