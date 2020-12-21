import { Context } from 'egg';

export default {
  returnBody (this: Context, status = true, body = {}, msg = 'success', code = 200) {
    this.status = code;
    this.body = {
      status: status,
      body: body,
      msg,
      code: code
    }
  },

  async getToken(this: Context, data:any) {
    return await this.app.jwt.sign(data, this.app.config.jwt.secret, { expiresIn: 30*24*60*60 + 's' });
  },

  async checkToken(this: Context, token) {
    return await this.app.jwt.verify(token, this.app.config.jwt.secret);
  }
}