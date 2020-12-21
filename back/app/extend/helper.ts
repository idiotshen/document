import * as crypto from 'crypto';
import { Context } from 'egg';

export default {
  helper :{
    createPassword (this: Context, password: string) {
      const hmac = crypto.createHmac("sha256", this.config.crypto.secret);
      hmac.update(password.toString());
      return hmac.digest("hex");
    }
  }
}