import { addReminder } from "../services/reminderService.js";

export const reminder = {
    name:"!reminder",
    description: "Tell the bot to remind any task",
    execute: async function reminderCommand(msg, args){
        let duration = args[0];
        if(!duration){
            return msg.reply("Please provide a duration (eg. 10s, 1h, 40m)");
        }
        let value=duration.slice(0,-1);
        let unit=duration.slice(-1);
        let durationInms;
        if(isNaN(value) || (value<=0)){
                return msg.reply("Please enter a valid duration");
            }
        if(unit === 'm'){
            durationInms = Number(value)*60*1000; 
        } else if(unit==='s'){
            durationInms = Number(value)*1000;
        } else if(unit === 'h'){
            durationInms = Number(value)*60*60*1000;
        } else{
            return msg.reply("Please enter a valid duration");
        }
        const task = args.slice(1).join(" ");
        if(task.trim()===""){
            return msg.reply("Please provide a task to remind you about");
        }
        const reminderTime = new Date().getTime() + durationInms;
        try{
            await addReminder(msg.author.id, task, reminderTime);
        } catch(err){
            console.log(err);
            return msg.reply("Something went wrong while adding your reminder");
        }
        return msg.reply("Reminder received");
    }
}