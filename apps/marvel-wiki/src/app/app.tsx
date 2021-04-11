
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, createHttpLink } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Navbar from './components/nav-bar';
import CharacterList from './routes/character-list';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Character from './routes/character';
import { primaryColor, secondaryColor } from './colors'
import SplashScreen from './components/splash-screen';

const uri = '/graphql';
const httpLink = createHttpLink({
  uri,
})
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const metaData = context.response.headers.get('meta-data')
    const metaDataComics = context.response.headers.get('meta-data-comics')
    const metaDataEvents = context.response.headers.get('meta-data-events')
    if(metaDataComics) { localStorage.setItem('meta-data-comics', metaDataComics) }
    if(metaDataEvents) { localStorage.setItem('meta-data-events', metaDataEvents) }
    if(localStorage.getItem('topbarSearch') !== 'true' && metaData) {
      localStorage.setItem('meta-data', metaData)
    }
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
      secondary: {
        main: secondaryColor
      },
    },
    typography: {
      fontFamily: 'Roboto Condensed'
    },
  }
);

const useStyles = makeStyles((theme) => ({
  content: {
    marginTop: 64   
  }  
}));

export const App = () => {
  const classes = useStyles();
  const [ loader, setLoader ] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoader(false) , 7000);
  })
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        { loader && <SplashScreen /> }
        { 
          !loader && <Router>
            <Navbar />
            <div className={ classes.content }>
              <Switch>
                <Route exact path="/" component={CharacterList} />
                <Route path="/character/:id" component={Character} />
              </Switch>
            </div>
          </Router>
        }
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
