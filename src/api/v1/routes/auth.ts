import { ExtendableContext } from 'koa';
import Router from 'koa-router';

function createRouter(controller: any) {
  const router = new Router();
  console.log('Controller: ', controller);

  router
    .post('/login', async (ctx: ExtendableContext) => {
      console.log('login route called');
      // @ts-ignore
      const { email, password } = ctx.request.body;
      ctx.body = `Authenticated:  ${email} and ${password}`
    })
    .post('/register', async (ctx: ExtendableContext) => {
      // @ts-ignore
      const { email, password } = ctx.request.body;
      ctx.body = `Registered:  ${email} and ${password}`
    })

  return router;
}

export default createRouter;
