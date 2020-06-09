export enum Environment {
  TEST = 'test',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

export const isDeployed = (env: Environment) => {
  return env !== Environment.DEVELOPMENT && env !== Environment.TEST;
};
