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

export const completeTodo = async (userId, todoId)=>{
     const updatedTodo = await todoModel.findOneAndUpdate({userId, _id : todoId}, {completed:true}, {new: true});
     return updatedTodo;
}

export const deleteTodo = async(userId, todoId)=>{
    const deletedTodo = await todoModel.findOneAndDelete({userId, _id:todoId});
    return deletedTodo;
}
