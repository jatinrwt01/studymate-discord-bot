import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        task:{
            type:String,
            required:true,
        },
        time:{
            type:Date,
            required:true,
        },
        fired:{
            type:Boolean,
            default:false,
        }
    }, {timestamps:true}
)

const reminderModel = mongoose.model("Reminder", reminderSchema);
export default reminderModel;