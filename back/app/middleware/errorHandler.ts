import { Context } from 'egg';

export default function errorHandleMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (err) {
      ctx.app.emit('error', err, ctx);

      const status = err.status || 500;

      const error = status === 500 && ctx.app.config.env === 'prod' ? '网络错误' : err.message;

      ctx.body = {
        msg: error,
        status: false,
        body: {},
        code: status
      }
    }
  }
}