import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { HttpLink } from '@apollo/client/link/http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { appTypeDefs } from '../api/appTypeDefs'; 
import { appResolvers } from '../api/appResolvers'; 
import merge from 'deepmerge';
let apolloClient:ApolloClient<NormalizedCacheObject>;
function createIsomorphLink() {
  if (typeof window === 'undefined') {
    const schema = makeExecutableSchema({
      typeDefs: appTypeDefs,
      resolvers: appResolvers,
    });
    return new SchemaLink({ schema });
  } else {
    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    });
  }
}
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(),
    cache: new InMemoryCache(),
  });
}
export function initializeApollo(initialState:any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);
    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}
export function useApollo(initialState:NormalizedCacheObject|null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}