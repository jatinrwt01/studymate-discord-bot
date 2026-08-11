import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";
import { connectDB } from "./connection/connect.js";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
    ]
})

const commands = {};

async function loadCommands(){
    const files = fs.readdirSync("./commands");
for(const file of files){
     const module = await import(`./commands/${file}`);
    const commandObj = Object.values(module)[0];
    commands[commandObj.name] = commandObj;
}
}

function handleCommand(msg){
    if(msg.author.bot) return;
    const parts = msg.content.split(" ");
    const commandName = parts[0];
    const args = parts.slice(1);
    const command = commands[commandName];
        if(command){
        return command.execute(msg,args);
    }
}


async function startBot(){
    await loadCommands();
    await connectDB(process.env.MONGODB_URL);

    client.on("clientReady", ()=>{
    console.log("Bot is online!");
})

     client.on("messageCreate", (msg)=>{
    handleCommand(msg);
})

    await client.login(process.env.DISCORD_BOT_TOKEN);  
}

startBot();



