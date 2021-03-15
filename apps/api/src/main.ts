import * as express from 'express';
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
    res.sendFile(path.join(__dirname, '..', '/marvel-wiki/index.html'));
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/graphql');
});
server.on('error', console.error);
