import { Client, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import fs from "fs";

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
    const command = commands[msg.content];
    if(command){
        return command.execute(msg);
    }
}


async function startBot(){
    await loadCommands();

    client.on("clientReady", ()=>{
    console.log("Bot is online!");
})

     client.on("messageCreate", (msg)=>{
    handleCommand(msg);
})

    await client.login(process.env.DISCORD_BOT_TOKEN);  
    console.log(commands); 
}

startBot();



