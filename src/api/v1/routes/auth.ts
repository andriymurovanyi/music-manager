import Router from 'koa-router';
import IAuthController from '../../../interfaces/controllers/auth.controller';
import auth from '../middleware/check-auth';

function createRouter(controller: IAuthController) {
  const router = new Router();
  console.log('Controller: ', controller);

  router
    .post('/login', controller.login)
    .post('/register', controller.register)
    .get('/users', auth, (ctx: any) => {
      ctx.body = 'Kek message returned';
    })

  return router;
}

export default createRouter;
