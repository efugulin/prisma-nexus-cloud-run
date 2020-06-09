/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

// Note: this script will download secrets grom GCP secret manager.
// This is needed until the node client provides a sync API.
// See: https://github.com/googleapis/nodejs-secret-manager/issues/118

const fs = require('fs');
const path = require('path');
const util = require('util');
const { GoogleAuth } = require('google-auth-library');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const auth = new GoogleAuth();
const client = new SecretManagerServiceClient();

const SECRETS = {
  DATABASE_URL: (_) => `database-url`,
};

const ENVIRONMENTS = {
  production: 'prod',
};

const getSecretValue = async (name) => {
  const projectId = await auth.getProjectId();
  const secretVersionName = `projects/${projectId}/secrets/${name}/versions/latest`;

  const [secret] = await client.accessSecretVersion({
    name: secretVersionName,
  });

  const payload = secret.payload.data.toString('utf8');
  return payload;
};

async function main() {
  const env = ENVIRONMENTS[process.env.NODE_ENV];

  if (!env) {
    throw new Error('Unsupported environment');
  }

  const lines = [];
  for (const [localName, gcpName] of Object.entries(SECRETS)) {
    const secretName = gcpName(env);
    const secretValue = await getSecretValue(secretName);
    lines.push(`${localName}=${secretValue}`);
  }

  const content = lines.join('\n');
  const envPath = path.join(__dirname, '..', 'configs', 'production.env');

  await mkdir(path.dirname(envPath), { recursive: true });
  await writeFile(envPath, content);
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
