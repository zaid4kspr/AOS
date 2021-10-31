import { ObjectId } from "mongodb";

export interface DecodedToken {
  email: string;
  _id: ObjectId;
  iat: string;
}
