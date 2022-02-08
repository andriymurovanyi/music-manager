import { Logger } from 'winston';
import { ExtendableContext, Next } from 'koa';

function createRequestLogger(logger: Logger) {
  return async (ctx: ExtendableContext, next: Next) => {
    const startTime = new Date().getTime();
    await next();
    const total = new Date().getTime() - startTime;

    const message = `[${ctx.method}] ${ctx.path} (${ctx.response.status}) in ${total} ms`;
    const level = ctx.response.status >= 400 ? 'error' : 'info';

    logger.log(level, message);
  }
}

export default createRequestLogger;