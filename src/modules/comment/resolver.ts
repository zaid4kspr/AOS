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

import { User, Comment } from "../../entities";
import CommentService from "./service";
import { NewCommentInput } from "./input";
import { isAuth } from "../../middleware/is-auth";
import { UserMongooseModel } from "../user/model";

/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => Comment)
export default class CommentResolver {
  constructor(private readonly CommentService: CommentService) {}

  @Query((returns) => Comment)
  async getComment(@Arg("id") id: ObjectId): Promise<Comment | null> {
    const comment = await this.CommentService.getById(id);

    return comment;
  }

  @Query((returns) => [Comment])
  async getComments() {
    const comment = await this.CommentService.getList();

    return comment;
  }

  @Mutation((returns) => Comment)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("createCommentData") createCommentData: NewCommentInput,
    @Ctx() ctx: any
  ): Promise<Comment | null> {
    const comment = await this.CommentService.addComment(
      createCommentData,
      ctx.payload
    );

    return comment;
  }

  @FieldResolver()
  async user(@Root() comment: Comment): Promise<User | null> {
    let user = new User();

    return await UserMongooseModel.findById(comment.user).lean();
  }
}
