import reminderModel from "../models/reminder.js";
const startReminderScheduler = async (client)=>{
    setInterval(async () => {
    try{
        const reminders = await reminderModel.find(
            {
                fired:false,
                time:{ $lte: new Date()}
            }
        );
        for(const rem of reminders){
            const user = await client.users.fetch(rem.userId);
            await user.send(`⏰ Reminder: ${rem.task}`);
            rem.fired=true;
            await rem.save();
        }
    } catch(err){
        console.log("Error checking reminders",err);
    }
}, 5000);
}

export default startReminderScheduler;