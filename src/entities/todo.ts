import { ObjectType, Field } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";
 import { Comment } from "./comment";
@ObjectType()
export class Todo {
  @Field()
  readonly _id!: ObjectId;

  @prop({ default: Date.now() })
  @Field(() => Date)
  createdAt!: Date;

  @prop({ default: Date.now() })
  @Field(() => Date)
  updatedAt!: Date;

  @prop()
  @Field()
  content!: string;

  @prop({ default: false })
  @Field()
  isDone!: boolean;


  @Field(type => User)
  @prop({ ref: User })
  user: Ref<User>;


  @Field(type => [Comment])
  @prop({  ref: () => Comment})
  comments:Ref<Comment>[];

  _doc: any;

}
