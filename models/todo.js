import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        task:{
            type:String,
            required:true,
        },
        completed:{
            type:Boolean,
            default:false,
        }
    }, {timestamps:true}
)

const todoModel = mongoose.model("Todo", todoSchema);
export default todoModel;