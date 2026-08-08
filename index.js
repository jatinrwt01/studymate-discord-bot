import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { pingCommand } from "./commands/ping.js";
import { helloCommand } from "./commands/hello.js";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
})

client.login(process.env.DISCORD_BOT_TOKEN);

client.on("clientReady", ()=>{
    console.log("Bot is online!");
})

client.on("messageCreate", (msg)=>{
    handleCommand(msg);
})

const commands = {
    "!ping": pingCommand,
    "!hello": helloCommand,
}

function handleCommand(msg){
    if(msg.author.bot) return;
    const command = commands[msg.content];
    if(command){
    return command(msg);
    }
}




