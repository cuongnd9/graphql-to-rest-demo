import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { logger } from 'juno-js';
import { execute } from 'graphql';
import GraphQL2REST from 'graphql2rest-js';
import path from 'path';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { formatError, config } from './components';

const gqlGeneratorOutputFolder = path.resolve(__dirname, './gqlFilesFolder');
const manifestFile = path.resolve(__dirname, './manifest.json');

const app = () => {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    formatError,
  });

  server.applyMiddleware({
    app,
    cors: true,
  });

  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  GraphQL2REST.generateGqlQueryFiles(schema, gqlGeneratorOutputFolder);
  const restRouter = GraphQL2REST.init(schema, execute, { gqlGeneratorOutputFolder, manifestFile });
  app.use('/api', restRouter);

  app.listen(config.port, () => {
    logger.info(`🚀 Server ready at http://127.0.0.1:${config.port}`);
  });
};

export default app;
