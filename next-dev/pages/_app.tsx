import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import '../styles/globals.css';
import { useApollo } from '../lib/apollo';
import Alert from '../components/Alert/Alert';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  console.log('render');

  return (
    <ApolloProvider client={client}>
      <Alert />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
export default MyApp;
