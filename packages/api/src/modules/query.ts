import { objectType } from '@nexus/schema';

import { Event } from './event';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('events', {
      type: Event,
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.event.findMany();
      },
    });
  },
});
