import _ from "lodash";
import path from "path";

import { Environment } from "./common/environment";

type Config = {
  endpoints: {
    publicSite: string;
  };
  environment: Environment;
  port: number;
};

const verify = (config: object) => {
  Object.values(config).forEach((v) => {
    if (!v) throw new Error("Invalid configuration, missing some fields");
    if (_.isObject(v)) verify(v);
  });
};

const configs = new Map<Environment, Config>([
  [
    Environment.TEST,
    {
      endpoints: {
        publicSite: "localhost:3000",
      },
      environment: Environment.TEST,
      port: 4000,
    },
  ],

  [
    Environment.DEVELOPMENT,
    {
      endpoints: {
        publicSite: "localhost:3000",
      },
      environment: Environment.DEVELOPMENT,
      port: 4000,
    },
  ],

  [
    Environment.STAGING,
    {
      endpoints: {
        publicSite: "localhost:3000",
      },
      environment: Environment.STAGING,
      port: Number(process.env.PORT) || 4000,
    },
  ],

  [
    Environment.PRODUCTION,
    {
      endpoints: {
        publicSite: "localhost:3000",
      },
      environment: Environment.PRODUCTION,
      port: Number(process.env.PORT) || 4000,
    },
  ],
]);

const environment = process.env.NODE_ENV || "development";
const config = configs.get(<Environment>environment);

if (!config) {
  throw new Error(`No configuration for environment: ${environment}`);
}
verify(config);

export default <Config>config;
