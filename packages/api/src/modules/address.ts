import { objectType } from '@nexus/schema';

export const Address = objectType({
  name: 'Address',
  definition(t) {
    t.id('id');
    t.string('line1');
    t.string('line2', { nullable: true });
    t.string('city');
    t.string('state');
    t.string('country');
    t.string('zipCode');
  },
});
