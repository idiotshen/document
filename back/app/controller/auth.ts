'use strict'
import { Controller } from 'egg';

export default class AuthController extends Controller {
  public async register () {
    const { ctx, service } = this;
    const { username, password, email, name } = ctx.request.body;
    
    // 密码长度拦截
		if (!password) {
			ctx.returnBody(false, {}, "密码不能为空!")
			return;
		}else if(password.length < 6){
			ctx.returnBody(false, {}, "密码长度不能少于6位!")
			return;
		}else if(password.length > 16){
			ctx.returnBody(false, {}, "密码长度不能超过16位!")
			return;
    }
    
    const users = await service.user.getUsersByQuery({ $or: [
      {username},
      {email}
    ] });

    if (users.length > 0) {
      ctx.returnBody(false, {}, "用户名或邮箱已被注册！");
      return;
    }

    let pass = ctx.helper.createPassword(password);
    let userData = await ctx.service.user.createUser(username, pass, email, name)
    if (userData === null) {
      ctx.returnBody(false, {}, "创建失败请稍后重试");
    } else {
      let userValue = userData.toObject();

      let userDataStr = JSON.parse(JSON.stringify(userValue));
      let token = ctx.getToken(userDataStr);

      ctx.returnBody(true, { access_token: token, userInfo: userData }, "注册成功!");
    }
  }

  public async login () {

  }
}