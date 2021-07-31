import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import Logger from 'koa-logger';

import createAPIv1 from './api/v1';

const config = require('../config/application.json');
const app = new Koa();

app.use(BodyParser());
app.use(Logger());

const APIv1 = createAPIv1();

// API v1
app
  .use(APIv1.routes())
  .use(APIv1.allowedMethods())

const port = config.port;

app.listen(port, () => {
  console.log(`App started at: ${port}`);
});
