import { Field, InputType, ID } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";
import { ObjectId } from "mongodb";


@InputType()
export class NewTodoInput {
  @Field()
  @MaxLength(300)
  @MinLength(1)
  content: string;

}
@InputType()
export class UpdateTodoInput {
  @Field()
  @MaxLength(300)
  @MinLength(1)
  content: string;

  @Field()
  _id: ObjectId;
}

@InputType()
export class UpdateTodoStatusInput {
  @Field()
  isDone: boolean;

  @Field()
  _id: ObjectId;
}



@InputType()
export class DeleteTodoInput {


  @Field()
  _id: ObjectId;
}


@InputType()
export class ShareTodoInput {


  @Field()
  todoId: ObjectId;

  @Field()
  userId: ObjectId;
}
