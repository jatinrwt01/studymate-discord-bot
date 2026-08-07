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
    console.log(msg.content);
})