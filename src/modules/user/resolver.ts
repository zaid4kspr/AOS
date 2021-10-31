import { Resolver, Arg, Query, Mutation,  UseMiddleware} from "type-graphql";
import { Service } from "typedi";
import { ObjectId } from "mongodb";
import { isAuth } from "../../middleware/is-auth";

import { User } from "../../entities";
import UserService from "./service";
import { NewUserInput, LoginInput } from "./input";
import { UserLoggedIn } from "./outputs";


/*
  IMPORTANT: Your business logic must be in the service!
*/

@Service() // Dependencies injection
@Resolver((of) => User)
export default class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  async getUser(@Arg("id") id: ObjectId) {
    const user = await this.userService.getById(id);
    return user;
  }

  @Query((returns) => UserLoggedIn)
  @UseMiddleware(isAuth)
  async login(@Arg("login") loginInput: LoginInput) {

    const user = await this.userService.logIn(loginInput);

    return user;
  }

  @Mutation((returns) => User)
  async register(
    @Arg("createUserData") createUserData: NewUserInput
  ): Promise<User> {
    const user = await this.userService.addUser(createUserData);
    return user;
  }
}
