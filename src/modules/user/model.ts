import { getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

import { User } from "../../entities";
import { NewUserInput } from "./input";
import { UserLoggedIn } from "./outputs";
import { LoginInput } from "./input";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Safely get the environment variable in the process
const env = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }

  return value;
};

// This generates the mongoose model for us
export const UserMongooseModel = getModelForClass(User);

export default class UserModel {
  async getById(_id: ObjectId): Promise<User | null> {
    // Use mongoose as usual
    return UserMongooseModel.findById(_id).lean().exec();
  }

  async create(data: NewUserInput): Promise<User> {
    const user = new UserMongooseModel(data);
    let salt = bcrypt.genSaltSync(10);
    let passwordHashed = bcrypt.hashSync(data.password, salt);
    user.password = passwordHashed;
    await user.save();
    user.password = "";
    return user;
  }

  async login(loginInput: LoginInput): Promise<UserLoggedIn> {
    let user = await UserMongooseModel.findOne({ email: loginInput.email });
    if (!user) {
      throw new Error("User doesn't exist");
    }
    let isEqual = await bcrypt.compare(loginInput.password, user?.password);
    if (!isEqual) {
      throw new Error("Wrong password");
    }
    let token = jwt.sign(
      { email: user.email, _id: user._id.toString() },
      env("TOKEN_HASH")
    );

    return {email:user.email,name:user.name,_id:user._id , token};
  }
}
