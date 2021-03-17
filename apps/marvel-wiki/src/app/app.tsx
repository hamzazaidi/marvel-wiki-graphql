
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
const client = new ApolloClient({
  uri: 'http://localhost:3333/graphql',
  cache: new InMemoryCache()
});
import Test from './Test'

export const App = () => {

  return (
    <ApolloProvider client={client}>  
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to marvel-wiki!</h1>
        <Test />
      </div>
    </ApolloProvider>
  );
};

export default App;
