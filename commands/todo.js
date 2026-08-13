import { addTodo, completeTodo, getTodos } from "../services/todoService.js";
export const todo = {
    name: "!todo",
    description: "Manage your study tasks",
    execute: async function todoCommand(msg, args){
        const subcommand = args[0];
        const task = args.slice(1).join(" ");
        if(subcommand === "add"){
            if(task.trim() == ""){
                return msg.reply("Please provide a task");
            }
            try{
                await addTodo(msg.author.id, task);
            } catch(err){
                console.log(err);
                return msg.reply("Something went wrong while adding your task");
            }
            return msg.reply(`Added task: ${task}`);
        } else if(subcommand === "list"){
            try{
            const userTodos = await getTodos(msg.author.id);
            if(userTodos.length === 0){
                return msg.reply("You have no todos");
            }
            const formattedTodos = userTodos.map((todo, index)=>{
                const status = todo.completed ? "✅" : "⬜";
                return `${index+1}. ${status} ${todo.task}`
            }).join("\n")
            return msg.reply(`Here is your todo list: \n ${formattedTodos}`);
        }catch(err){
            console.log(err);
            return msg.reply("Error getting your todos");
        }
        } else if(subcommand === "done"){
            if(task.trim() === ""){
                return msg.reply("Please provide a task number");
            }
            const taskNumber = Number(task);
            if(!taskNumber || isNaN(taskNumber) || taskNumber <= 0 || !Number.isInteger(taskNumber)){
                return msg.reply("Please provide a valid task number");
            }
            const zeroBasedTaskNumber = taskNumber-1;
            try{
            const userTodos = await getTodos(msg.author.id);
            if(zeroBasedTaskNumber >= userTodos.length){
                return msg.reply("Please provide a valid task number");
            }
            const targetTodo = userTodos[zeroBasedTaskNumber]; 
            const updatedTodo = await completeTodo(msg.author.id, targetTodo._id);
            if(updatedTodo){
            return msg.reply(`✅ Completed: ${targetTodo.task}`);
            } else{
                return msg.reply("Couldn't mark your todo as done");
            }
            }catch(err){
                console.log(err);
                return msg.reply("Couldn't mark your todo as done");
            }
        } else{
            return msg.reply("Unknown todo command");
        }
    }
}