import { getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Comment, Todo } from "../../entities";
import { NewCommentInput } from "./input";
import { DecodedToken } from "../../utils/decodedToken";

import { TodoMongooseModel } from "../todo/model";

// This generates the mongoose model for us
export const CommentMongooseModel = getModelForClass(Comment);

export default class CommentModel {
  async getById(_id: ObjectId): Promise<Comment | null> {
    // Use mongoose as usual
    return CommentMongooseModel.findById(_id).lean().exec();
  }
  async getList(): Promise<Array<Comment> | null> {
    // Use mongoose as usual
    return CommentMongooseModel.find().lean().exec();
  }

  async create(
    data: NewCommentInput,
    decodedToken: DecodedToken
  ): Promise<Comment | null> {
    let comment = new CommentMongooseModel({
      text: data.text,
      user: decodedToken._id,
    });
    comment= (await comment.save())._doc; // we need to get the doc for the fieldResolver 
    let todo = await TodoMongooseModel.findOne({ _id: data.todoId });
    if (!todo) throw new Error("Todo doesn't exist");
    todo.comments.push(comment._id);
    await todo.save();
    return comment;
  }
}
