
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
});
import Test from './Test'

export const App = () => {

  return (
    <ApolloProvider client={client}>  
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to marvel-wiki!</h1>
      </div>
    </ApolloProvider>
  );
};

export default App;
