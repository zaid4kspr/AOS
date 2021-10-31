import { getModelForClass } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Todo } from "../../entities";
import {
  DeleteTodoInput,
  NewTodoInput,
  ShareTodoInput,
  UpdateTodoInput,
  UpdateTodoStatusInput,
} from "./input";
import { DecodedToken } from "./../../utils/decodedToken";
import { UserMongooseModel } from "../user/model";

// This generates the mongoose model for us
export const TodoMongooseModel = getModelForClass(Todo);

export default class TodoModel {
  async getById(_id: ObjectId): Promise<Todo | null> {
    // Use mongoose as usual
    return TodoMongooseModel.findById(_id).lean().exec();
  }
  async getList(): Promise<Array<Todo> | null> {
    // Use mongoose as usual
    return TodoMongooseModel.find().lean().exec();
  }

  async create(
    data: NewTodoInput,
    decodedToken: DecodedToken
  ): Promise<Todo | null> {
    let todo = new TodoMongooseModel(data);
    todo.user = decodedToken._id;
    await todo.populate("user").execPopulate();
    return (await todo.save())._doc;
  }

  async update(data: UpdateTodoInput): Promise<Todo | null> {
    let todo = await TodoMongooseModel.findOne({ _id: data._id });
    if (todo) {
      todo.content = data.content;
      await todo.save();
    } else {
      throw new Error("Todo doesn't exist");
    }

    return todo._doc;
  }

  async updateStatus(data: UpdateTodoStatusInput): Promise<Todo | null> {
    let todo = await TodoMongooseModel.findOne({ _id: data._id });
    if (todo) {
      todo.isDone = data.isDone;
      await todo.save();
    } else {
      throw new Error("Todo doesn't exist");
    }

    return todo;
  }

  async deleteTodo(
    data: DeleteTodoInput,
    decodedToken: DecodedToken
  ): Promise<Todo | null> {
    let todo = await TodoMongooseModel.findOne({ _id: data._id });

    if (todo) {
      if (todo.user != decodedToken._id) {
        throw new Error("you aren't allowed to delete another user Todo !");
      } else {
        let deleted = await TodoMongooseModel.deleteOne({ _id: data._id });
      }
    } else {
      throw new Error("Todo doesn't exist");
    }

    return todo;
  }

  async shareTodo(data: ShareTodoInput): Promise<Todo | null> {
    let todo = await TodoMongooseModel.findOne({ _id: data.todoId });
    let user = await UserMongooseModel.findOne({ _id: data.userId });
    if (!todo) {
      throw new Error("Todo doesn't exist");
    }
    if (!user) {
      throw new Error("User doesn't exist");
    }
    todo.user = user._id;
    todo = (await todo.save())._doc;

    return todo;
  }
}
