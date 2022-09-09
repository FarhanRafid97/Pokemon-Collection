import { useRouter } from 'next/router';
import Layout from '../../../components/layouts/Layout';
import { useDetailPokemonQuery } from '../../../store/slice/pokemons';

interface PokemonDetailProps {}

const PokemonDetail: React.FC<PokemonDetailProps> = ({}) => {
  const router = useRouter();

  const { data } = useDetailPokemonQuery({ name: router.query.name as string });
  console.log(data);
  return (
    <Layout>
      <div>PokemonDetail</div>
    </Layout>
  );
};

export default PokemonDetail;
