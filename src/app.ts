import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { logger } from 'juno-js';
import { useSofa, OpenAPI } from 'sofa-api';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { formatError, config } from './components';

const swaggerDocument = YAML.load('./swagger.yml');

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

  const openApi = OpenAPI({
    schema,
    info: {
      title: 'graphql-express-kit API',
      version: '3.0.0',
    },
  });
  app.use(
    '/api',
    useSofa({
      schema,
      method: {
        'Mutation.updateCategory': 'PUT',
        'Mutation.deleteCategory': 'DELETE',
      },
      onRoute(info) {
        openApi.addRoute(info, {
          basePath: '/api',
        });
      },
    })
  );
  openApi.save('./swagger.yml');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(config.port, () => {
    logger.info(`🚀 Server ready at http://127.0.0.1:${config.port}`);
  });
};

export default app;
