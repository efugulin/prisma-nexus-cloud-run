/* eslint-disable @typescript-eslint/no-unused-vars */
import * as pulumi from '@pulumi/pulumi';
import * as gcp from '@pulumi/gcp';

import { Database } from './database';

const database = new Database(
  {
    diskSize: 10,
    ha: true,
    tier: 'db-f1-micro',
  },
  { protect: true }
);
