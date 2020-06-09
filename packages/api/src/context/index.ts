import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express/src/ApolloServer';

import prisma from './prisma';

export type Context = {
  prisma: PrismaClient;
  express: {
    res: Response;
  };
};

export function createContext(context: ExpressContext): Context {
  return {
    prisma,
    express: context,
  };
}
