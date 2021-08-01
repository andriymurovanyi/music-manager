import Koa from 'koa';
import BodyParser from 'koa-body';
import Logger from 'koa-logger';
import Cors from '@koa/cors';
import dotenv from 'dotenv';

import createAPIv1 from './api/v1';
import { connectToDB } from './models';

dotenv.config();
const app = new Koa();

const mongoUri = process.env.MONGO_URI as string;
connectToDB(mongoUri);

app.use(Cors());
app.use(BodyParser());
app.use(Logger());

const APIv1 = createAPIv1();

// API v1
app
  .use(APIv1.routes())
  .use(APIv1.allowedMethods())

const defaultPort = 3000;
const port = process.env.PORT || defaultPort;

app.listen(port, () => {
  console.log(`App started at: ${port}`);
});
