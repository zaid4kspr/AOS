import { ObjectType, Field } from "type-graphql";
import { prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { User } from "./user";
@ObjectType()
export class Comment {
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
  text!: string;


  @Field(type => User)
  @prop({ ref: User })
  user: Ref<User>;

 
  _doc: any;


}
