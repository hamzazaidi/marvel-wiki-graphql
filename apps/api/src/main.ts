import * as express from 'express';
import { readFileSync } from 'fs'
import * as path from 'path';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema } from './app/schema'
const app = express();
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));


app.use(express.static(path.join(__dirname, '..', '/marvel-wiki')));

app.get('/*', function (req, res) {
  res.send(readFileSync(path.join(__dirname, '..', '/marvel-wiki/index.html'), {
    encoding: 'utf8'
  }))
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/graphql');
});
server.on('error', console.error);
