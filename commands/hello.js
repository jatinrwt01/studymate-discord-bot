export const hello = {
    name: "!hello",
    description: "Say hello to the bot",
    execute: function helloCommand(msg){
        return msg.reply(`Hello ${msg.author}`);
    }
}