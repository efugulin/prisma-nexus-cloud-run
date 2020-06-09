import { getStack } from '@pulumi/pulumi';

const DEFAULT_NAMESPACE = 'efugulin';

export default (name: string) => {
  return `${DEFAULT_NAMESPACE}-${getStack()}-${name}`;
};
