import { objectType, enumType } from '@nexus/schema';

export const AgeLimit = enumType({
  name: 'AgeLimit',
  members: ['ALL', 'ABOVE_21', 'ABOVE_18'],
});

export const Event = objectType({
  name: 'Event',
  definition(t) {
    t.id('id');
    t.string('name');
    t.string('description');
    t.string('venue');
    t.field('ageLimit', { type: AgeLimit });
  },
});
