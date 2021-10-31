import { ObjectType, Field } from "type-graphql";
import { prop } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

@ObjectType()
export class User {
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
  name!: string;

  @prop({ unique: true })
  @Field()
  email!: string;

  @prop()
  @Field()
  password!: string;

  _doc: any;

}
