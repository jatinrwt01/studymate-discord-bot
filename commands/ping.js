export const ping = {
    name: "!ping",
    description: "Check whether the bot is alive",
    execute: function pingCommand(msg){
        return msg.reply("Pong");
    }
}