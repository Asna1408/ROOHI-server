import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        conversationId:{
            type: mongoose.Types.ObjectId,
            ref: "Conversation"
        },
        senderId:{
            type:  mongoose.Types.ObjectId,
            ref: "User"
        },
        text:{type:String},
    },
    { timestamps: true }
)
export default mongoose.model("Message", MessageSchema);
