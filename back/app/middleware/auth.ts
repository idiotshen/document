import { Context } from 'egg';

export default function errorHandleMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    let token = '';

    if (ctx.headers.authorization && ctx.headers.authorization.split(' ')[0]) {
      token = ctx.headers.authorization.split(' ')[1];
    } else if (ctx.query.accesstoken) {
      token = ctx.query.accesstoken;
    } else if (ctx.request.body.accesstoken) {
      token = ctx.request.body.accesstoken;
    }

    let user;
    try {
      user = await ctx.checkToken(token);
    } catch (e) {
      ctx.returnBody(false, {}, 'Token 无效，请重新登陆', 401);
      return;
    }

    if (!user) {
      ctx.returnBody(false, {}, 'Token 无效，请重新登陆', 401);
      return;
    }

    ctx.request.user = user;
    await next()
  }
}