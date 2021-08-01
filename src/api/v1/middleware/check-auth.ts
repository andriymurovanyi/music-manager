import { ExtendableContext, Next } from 'koa';
import { verifyToken } from '../../../utils';

async function auth(ctx: ExtendableContext, next: Next) {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    const errorMessage = 'Authorization token missed';
    ctx.throw(403, errorMessage);
  }

  const [, token] = authorization!.split(' ');
  verifyToken(token)
    .then(next)
    .catch(() => {
      ctx.throw(401, 'Token is invalid');
    });
}

export default auth;
