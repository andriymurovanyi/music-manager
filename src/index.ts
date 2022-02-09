require('app-module-path').addPath(__dirname);

import Koa from 'koa';
import BodyParser from 'koa-body';
import Logger from 'koa-logger';
import Cors from '@koa/cors';
import dotenv from 'dotenv';

import createAPIv1 from 'api/v1';
import connectToDB from 'models';
import errorHandler from 'api/v1/middleware/error-handler';
import createLogger from 'modules/logger';
import createRequestLogger from 'api/v1/middleware/request-logger';

dotenv.config();

function createApp() {
  const app = new Koa();
  const logger = createLogger();
  const requestLogger = createRequestLogger(logger);
  const mongoUri = process.env.MONGO_URI as string;

  connectToDB(mongoUri);

  app.use(errorHandler);
  app.use(requestLogger);
  app.use(Cors());
  app.use(BodyParser());
  app.use(Logger());

  const APIv1 = createAPIv1();

// API v1
  app
    .use(APIv1.routes())
    .use(APIv1.allowedMethods());

  const defaultPort = 3000;
  const port = process.env.PORT || defaultPort;

  app.listen(port, () => {
    logger.info(`App started at: ${port}`);
  });
}

createApp();

