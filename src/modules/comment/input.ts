import { Field, InputType, ID } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";
import { ObjectId } from "mongodb";


@InputType()
export class NewCommentInput {
  @Field()
  @MaxLength(300)
  @MinLength(1)
  text: string;

  @Field()
  todoId: ObjectId;

}
