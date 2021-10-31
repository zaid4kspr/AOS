import { Field, ObjectType } from "type-graphql";

import { ObjectId } from "mongodb";

@ObjectType()
export class TodoOutput {
  @Field()
  readonly _id!: ObjectId;

  @Field()
  content: string;

  @Field()
  user: ObjectId;
}
