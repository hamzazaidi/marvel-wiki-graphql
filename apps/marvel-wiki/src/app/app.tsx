
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, createHttpLink } from '@apollo/client';
import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
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
    console.log(operation)
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
      secondary: deepPurple,
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
