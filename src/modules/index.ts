import TodoResolver from "./todo/resolver";
import UserResolver from "./user/resolver";
 import ComentResolver from "./comment/resolver";

// Important: Add all your module's resolver in this
export const resolvers: [Function, ...Function[]] = [
  TodoResolver,
  UserResolver,
  ComentResolver
  // ...
];
