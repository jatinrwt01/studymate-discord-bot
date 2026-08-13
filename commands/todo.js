import { addTodo, getTodos } from "../services/todoService.js";
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
        } else{
            return msg.reply("Unknown todo command");
        }
    }
}