import { Application } from 'egg';
import auth from './router/auth';

export default (app: Application) => {
  auth(app);
};
