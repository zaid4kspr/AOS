import {
  Resolver,
  Arg,
  Query,
  Mutation,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { ObjectId } from "mongodb";

import { Comment, Todo, User } from "../../entities";
import TodoService from "./service";
import {
  DeleteTodoInput,
  NewTodoInput,
  ShareTodoInput,
  UpdateTodoInput,
  UpdateTodoStatusInput,
} from "./input";
import { isAuth } from "../../middleware/is-auth";
import { UserMongooseModel } from "../user/model";
import { CommentMongooseModel } from "../comment/model";

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Todo)
export default class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query((returns) => Todo)
  async getTodo(@Arg("id") id: ObjectId) {
    const todo = await this.todoService.getById(id);

    return todo;
  }

  @Query((returns) => [Todo])
  async getTodos() {
    const todo = await this.todoService.getList();

    return todo;
  }

  @Mutation((returns) => Todo)
  @UseMiddleware(isAuth)
  async createTodo(
    @Arg("createTodoData") createTodoData: NewTodoInput,
    @Ctx() ctx: any
  ): Promise<Todo | null> {
    const todo = await this.todoService.addTodo(createTodoData, ctx.payload);
    console.log("supposedtobe first");

    return todo;
  }

  @Mutation((returns) => Todo)
  @UseMiddleware(isAuth)
  async updateTodo(
    @Arg("updateTodoInput") updateTodoInput: UpdateTodoInput
  ): Promise<Todo | null> {
    const todo = await this.todoService.updateTodo(updateTodoInput);
    return todo;
  }

  @Mutation((returns) => Todo)
  @UseMiddleware(isAuth)
  async updateTodoStatus(
    @Arg("updateTodoStatusInput") updateTodoStatusInput: UpdateTodoStatusInput
  ): Promise<Todo | null> {
    const todo = await this.todoService.updateTodStatus(updateTodoStatusInput);
    return todo;
  }

  @Mutation((returns) => Todo)
  @UseMiddleware(isAuth)
  async deleteTodo(
    @Arg("deleteTodoInput") deleteTodoInput: DeleteTodoInput,
    @Ctx() ctx: any
  ): Promise<any> {
    const todo = await this.todoService.deleteTodo(
      deleteTodoInput,
      ctx.payload
    );
    return todo;
  }

  @Mutation((returns) => Todo)
  @UseMiddleware(isAuth)
  async shareTodo(@Arg("shareTodoInput") shareTodoInput: ShareTodoInput) {
    const todo = await this.todoService.shareTodo(shareTodoInput);

    return todo;
  }

  @FieldResolver()
  async user(@Root() todo: Todo): Promise<User | null> {
    let user = await UserMongooseModel.findById(todo.user).lean();
    user ? (user.password = "") : "";
    return user;
  }

  @FieldResolver()
  async comments(@Root() todo: Todo): Promise<Array <Comment> | null> {

    let comments = await CommentMongooseModel.find({_id:{$in:todo.comments}}).lean();
    return comments;
  }
}
