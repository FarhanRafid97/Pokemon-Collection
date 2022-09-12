import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
function MyApp({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    colors: {
      grass: '#52b788',
      fire: '#bf0603',
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
      ghost: '#ccdde2',
      ice: '#90e0ef',
      dragon: '#fb8500',
      dark: '#023047',
      steel: '#118ab2',
    },
  });

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
