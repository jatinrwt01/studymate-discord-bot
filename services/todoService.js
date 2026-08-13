import todoModel from "../models/todo.js";

export const addTodo = async (userId, task)=>{
    return await todoModel.create(
        {
            userId,
            task,
        }
    )
}

export const getTodos = async (userId)=>{
    const userTodos = await todoModel.find({userId});
    return userTodos;
}
