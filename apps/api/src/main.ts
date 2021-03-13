import * as express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema } from './app/schema'

const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/graphql');
});
server.on('error', console.error);
