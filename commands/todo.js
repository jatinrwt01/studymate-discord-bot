export const todo = {
    name: "!todo",
    description: "Manage your study tasks",
    execute: function todoCommand(msg, args){
        return msg.reply("Todo command");
    }
}