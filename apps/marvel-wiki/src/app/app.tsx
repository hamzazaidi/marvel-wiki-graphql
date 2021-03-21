
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import amber from '@material-ui/core/colors/amber';
import Navbar from './components/nav-bar';
import CharacterList from './components/character-list';
const Uri = 'http://localhost:3333/graphql';
const client = new ApolloClient({
  uri: Uri,
  cache: new InMemoryCache()
});

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#ff0519',
      },
      secondary: amber,
    },
  }
);


export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>  
        <Navbar />
        <div className="content">
          <CharacterList />
        </div>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
