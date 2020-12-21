import { Service } from "egg";
import { IUser } from "../model/user";
import { FilterQuery, Model } from 'mongoose';

export default class UserService extends Service {
  /**
   * 
   * @param username 
   * @param password 
   * @param email 
   * @param name 
   * @returns {Promise<IUser>}
   */
  async createUser(username: string, password: string, email:string, name:string) {
    const { ctx } = this;
    let userModel: Model<IUser> = ctx.model.user;

    await userModel.create({
      username,
      password,
      email,
      name
    })

    return userModel.findOne({ username: username })
  }
  
  /**
   * 
   * @param query 
   */
  async getUsersByQuery(query: FilterQuery<IUser>) {
    const { ctx } = this;
    let userModel: Model<IUser> = ctx.model.user; 
    return userModel.find(query).exec();
  }
}