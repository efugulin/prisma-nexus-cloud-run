import { makeSchema } from '@nexus/schema';
import * as path from 'path';

import * as allTypes from './modules';

export const schema = makeSchema({
  types: allTypes,
  outputs: {
    schema: path.join(__dirname, '../api.graphql'),
    typegen: path.join(
      __dirname.replace(/\/dist$/, '/src'),
      './api-typegen.ts'
    ),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(
          __dirname.replace(/\/dist$/, '/src'),
          './context/index.ts'
        ),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
  },
  prettierConfig: path.join(__dirname, '../../../.prettierrc'),
});
