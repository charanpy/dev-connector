import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  makeVar,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

export const errorVar = makeVar<string | null>(null);

const apolloClient = () => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
        errorVar(message);
      });

    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      errorVar(networkError.message);
    }
  });

  const httpLink = createHttpLink({
    uri: 'http://localhost:5000/api/graphql',
    credentials: 'include',
  });

  const client = new ApolloClient({
    ssrMode: typeof window === undefined,
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return client;
};

export default apolloClient;
