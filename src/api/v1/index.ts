import Koa from 'koa';
import Router from 'koa-router';
import CreateAuthRouter from './routes/auth';

import { RouterOptions } from '../../interfaces/app/router-options';

const versionPrefix = '/v1';

function createAPIv1() {
  const appRouter = new Router();
  appRouter.prefix(versionPrefix);

  const authRouter: RouterOptions = CreateAuthRouter('AuthRouter');

  appRouter.use('/auth', authRouter.routes(), authRouter.allowedMethods())

  return appRouter;
}

export default createAPIv1;
