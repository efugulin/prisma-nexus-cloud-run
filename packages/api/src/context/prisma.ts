import { PrismaClient } from '@prisma/client';

import config from '~/config';
import { Environment } from '~/common/environment';

let options = {};
if (config.environment === Environment.DEVELOPMENT) {
  options = { ...options, log: ['query'] };
}

const prisma = new PrismaClient(options);

export default prisma;
