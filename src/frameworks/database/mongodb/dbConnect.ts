import mongoose from "mongoose";



export const connectDb = async()=>{
    try {
        const mongoUri = "mongodb+srv://asnatm01:asna123@cluster0.qe52r.mongodb.net/roohi";
        if(mongoUri){
            await  mongoose.connect(mongoUri);
            console.log("mongoDb connected");
        } else {
            console.log("No uri available")
        }
    } catch (error) {
        console.log(error)
    }
}