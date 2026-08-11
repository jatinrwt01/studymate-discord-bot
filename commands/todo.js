export const todo = {
    name: "!todo",
    description: "Manage your study tasks",
    execute: function todoCommand(msg, args){
        const subcommand = args[0];
        const task = args.slice(1).join(" ");
        if(subcommand === "add"){
            if(task == ""){
                return msg.reply("Please provide a task");
            }
            return msg.reply(`Added task: ${task}`);
        } else if(subcommand === "list"){
            return msg.reply("Todo list coming soon");
        } else{
            return msg.reply("Unknown todo command");
        }
    }
}