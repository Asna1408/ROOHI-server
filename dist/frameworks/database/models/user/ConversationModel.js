"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ConversationSchema = new mongoose_1.default.Schema({
    members: [
        {
            type: mongoose_1.default.Types.ObjectId,
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
}, { timestamps: true });
// Add a validator to ensure only two members are in the array
ConversationSchema.path('members').validate(function (members) {
    return members.length === 2;
}, 'A conversation can only have two members.');
exports.default = mongoose_1.default.model('Conversation', ConversationSchema);
