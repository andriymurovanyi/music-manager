import { ExtendableContext, Next } from 'koa';
import Utils from 'modules/utils';
import { APIError } from 'modules/errors';

async function auth(ctx: ExtendableContext, next: Next) {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    const errorMessage = 'Authorization token missed';
    throw new APIError(400, errorMessage);
  }

  const [prefix, token] = authorization!.split(' ');
  console.log('Token: ', token);

  if (!prefix) {
    const errorMessage = 'Token is incorrect';
    throw new APIError(400, errorMessage);
  }

  try {
    await Utils.verifyToken(token);
    return next();
  } catch (_) {
    console.log('Authentication error!', _);
    throw new APIError(401, 'Unauthorized');
  }
}

export default auth;
