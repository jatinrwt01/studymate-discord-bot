import mongoose from 'mongoose';
export async function connectDB(url){
    try{
    await mongoose.connect(url);
    console.log("MongoDB connected successfully");
    }catch(err){
        console.log(err);
    }
}