import { ExtendableContext, Next } from 'koa';
import { APIError } from 'modules/errors';

async function errorHandler(ctx: ExtendableContext, next: Next) {
  try {
    await next();
  } catch (err) {
    const isAPIError = err instanceof APIError;
    ctx.status = isAPIError ? err.statusCode : 500;
    ctx.body = {
      message: err.message,
    };
  }
}

export default errorHandler;