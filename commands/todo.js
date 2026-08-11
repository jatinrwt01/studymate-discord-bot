import { addTodo } from "../services/todoService.js";
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
            return msg.reply("Todo list coming soon");
        } else{
            return msg.reply("Unknown todo command");
        }
    }
}