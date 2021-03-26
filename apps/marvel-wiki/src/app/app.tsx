
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, concat, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import amber from '@material-ui/core/colors/amber';
import Navbar from './components/nav-bar';
import CharacterList from './components/character-list';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CharacterDetail from './components/character-detail';
import { primaryColor } from './colors'

const uri = 'http://localhost:3333/graphql';
const httpLink = createHttpLink({
  uri,
})
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext()
    const metaData = context.response.headers.get('meta-data')
    localStorage.setItem('meta-data', metaData)
    return response
  })
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    afterwareLink.concat(httpLink),
  ]),
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
