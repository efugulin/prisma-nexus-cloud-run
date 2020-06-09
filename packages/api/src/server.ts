/* eslint-disable no-console */
import { app } from './app';
import config from './config';

app.listen({ port: config.port }, () => console.log(`🚀 Server started`));
