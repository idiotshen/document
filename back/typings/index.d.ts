import 'egg';
import { Request, Application}  from 'egg';
import { Mongoose } from 'mongoose';

declare module 'egg' {
  export interface Request {
    user?: Object
  }

  export interface Application {
     mongoose: Mongoose
  }
}