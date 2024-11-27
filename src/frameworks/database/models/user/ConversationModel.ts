import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
    { 
        members: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
        lastMessage: {
            type: String,
            default: ''
        },
        unreadCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

// Add a validator to ensure only two members are in the array
ConversationSchema.path('members').validate(function (members) {
    return members.length === 2;
}, 'A conversation can only have two members.');

export default mongoose.model('Conversation', ConversationSchema);
