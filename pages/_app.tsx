import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import nProgress from 'nprogress';
import '../styles/nProgress.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const progress = nProgress.configure({ showSpinner: false });

const theme = extendTheme({
  colors: {
    grass: '#52b788',
    fire: '#c1121f',
    water: '#83c5be',
    bug: '#3a5a40',
    normal: '#936639',
    poison: '#7251b5',
    electric: '#ffd60a',
    fairy: '#f896d8',
    ground: '#ddb892',
    fighting: '#6c6f7d',
    psychic: '#896279',
    rock: '#413620',
    flying: '#a2d2ff',
    ghost: '#ccdde2',
    ice: '#90e0ef',
    dragon: '#fb8500',
    dark: '#023047',
    steel: '#118ab2',
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // NProgress
    router.events.on('routeChangeStart', () => progress.start());
    router.events.on('routeChangeComplete', () => progress.done());
    router.events.on('routeChangeError', () => progress.done());

    return () => {
      router.events.off('routeChangeStart', () => progress.start());
      router.events.off('routeChangeComplete', () => progress.done());
      router.events.off('routeChangeError', () => progress.done());
    };
  }, [router.events]);
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
