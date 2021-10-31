import { ObjectType, Field } from "type-graphql";


import { ObjectId } from "mongodb";

@ObjectType()
export class UserLoggedIn {
  @Field()
  readonly _id!: ObjectId;


  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  token: string;


 
}
