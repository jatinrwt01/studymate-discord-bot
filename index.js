import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";

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

function pingCommand(msg){
    return msg.reply("Pong");
}

function helloCommand(msg){
    return msg.reply(`Hello ${msg.author}`);
}
