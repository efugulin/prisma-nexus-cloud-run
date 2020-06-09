/* eslint-disable import/prefer-default-export */
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { schema } from './schema';
import { createContext } from './context';
import config from './config';
import { isDeployed } from './common/environment';

export const app = express();

const apollo = new ApolloServer({
  schema,
  context: createContext,
  subscriptions: false,
});

// CORS
if (isDeployed(config.environment)) {
  app.use(
    cors({
      origin: [config.endpoints.publicSite],
      credentials: true,
    })
  );
} else {
  app.use(cors({ origin: true, credentials: true }));
}

// GraphQL
apollo.applyMiddleware({ app, cors: false });
