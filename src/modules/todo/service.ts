import { Service } from "typedi";
import { ObjectId } from "mongodb";

import TodoModel from "./model";
import { Todo } from "../../entities";
import { DeleteTodoInput, NewTodoInput,ShareTodoInput,UpdateTodoInput, UpdateTodoStatusInput } from "./input";
import { DecodedToken } from "./../../utils/decodedToken";

@Service() // Dependencies injection
export default class TodoService {
  constructor(private readonly todoModel: TodoModel) {}

  public async getById(_id: ObjectId): Promise<Todo | null> {
    return this.todoModel.getById(_id);
  } 
  
  public async getList(): Promise<Array< Todo> | null> {
    return this.todoModel.getList();
  }

  public async addTodo(data: NewTodoInput,decodedToken:DecodedToken): Promise<Todo | null>  {
    const newTodo = await this.todoModel.create(data,decodedToken);

    return newTodo;
  }

  public async updateTodo(data: UpdateTodoInput): Promise<Todo | null> {
    let updatedTodo = await this.todoModel.update(data);
    return updatedTodo;
  } 


   public async updateTodStatus(data: UpdateTodoStatusInput):  Promise<Todo | null> {
    let updatedTodo = await this.todoModel.updateStatus(data);
    return updatedTodo;
  }

  public async deleteTodo(data: DeleteTodoInput,decodedToken:DecodedToken): Promise<Todo | null> {
    let deletedTodo = await this.todoModel.deleteTodo(data,decodedToken);
    return deletedTodo;
  }

  public async shareTodo(data: ShareTodoInput):  Promise<Todo | null>  {
    let sharedTodo = await this.todoModel.shareTodo(data);
    console.log(sharedTodo);
    
    return sharedTodo;
  }


}
