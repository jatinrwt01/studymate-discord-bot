import reminderModel from "../models/reminder.js";

export const addReminder = async(userId, task, time)=>{
    return await reminderModel.create(
        {
            userId,
            task,
            time,
        }
    )
}