import { Service } from "typedi";
import { ObjectId } from "mongodb";

import CommentModel from "./model";
import { Comment } from "../../entities";
import { NewCommentInput } from "./input";
import { DecodedToken } from "../../utils/decodedToken";

@Service() // Dependencies injection
export default class CommentService {
  constructor(private readonly commentModel:CommentModel  ) {}

  public async getById(_id: ObjectId): Promise<Comment | null> {
    return this.commentModel.getById(_id);
  } 
  
  public async getList(): Promise<Array< Comment> | null> {
    return this.commentModel.getList();
  }

  public async addComment(data: NewCommentInput,decodedToken:DecodedToken): Promise<Comment | null>  {
    const newTodo = await this.commentModel.create(data,decodedToken);

    return newTodo;
  }

}
