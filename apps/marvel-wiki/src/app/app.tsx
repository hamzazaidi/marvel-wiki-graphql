
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import amber from '@material-ui/core/colors/amber';
import Navbar from './components/nav-bar';
import CharacterList from './components/character-list';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CharacterDetail from './components/character-detail';
import { primaryColor } from './colors'
const Uri = '/graphql';
const client = new ApolloClient({
  uri: Uri,
  cache: new InMemoryCache()
});

const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: amber,
    },
  }
);


export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path="/" component={CharacterList} />
              <Route path="/character/:id" component={CharacterDetail} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
