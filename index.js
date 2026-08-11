import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { ping } from "./commands/ping.js";
import { hello } from "./commands/hello.js";

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


const commands = {};
commands[ping.name] = ping;
commands[hello.name] = hello;
client.on("messageCreate", (msg)=>{
    handleCommand(msg);
})

function handleCommand(msg){
    if(msg.author.bot) return;
    const command = commands[msg.content];
    console.log(command);
    if(command){
        return command.execute(msg);
    }
}




