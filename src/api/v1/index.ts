import Router from 'koa-router';
import createAuthRouter from './routes/auth';
import { createAuthController } from '../../factory';
import { RouterOptions } from '../../interfaces/app/router-options';

const versionPrefix = '/api/v1';

function createAPIv1() {
  const appRouter = new Router();
  appRouter.prefix(versionPrefix);

  const authController = createAuthController();
  const authRouter: RouterOptions = createAuthRouter(authController);

  appRouter.use('/auth', authRouter.routes(), authRouter.allowedMethods())

  return appRouter;
}

export default createAPIv1;
