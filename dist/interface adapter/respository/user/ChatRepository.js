"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const ConversationModel_1 = __importDefault(require("../../../frameworks/database/models/user/ConversationModel"));
const MessageModel_1 = __importDefault(require("../../../frameworks/database/models/user/MessageModel"));
class ChatRepository {
    findExistingConversation(senderId, receiverId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ConversationModel_1.default.findOne({
                    members: { $all: [senderId, receiverId] }
                });
            }
            catch (error) {
                throw new Error("error occured for finding conversation");
            }
        });
    }
    createConversation(conversationData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newConversation = new ConversationModel_1.default(conversationData);
                return yield newConversation.save();
            }
            catch (error) {
                throw new Error("error occured for creating new conversation");
            }
        });
    }
    findConversationsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ConversationModel_1.default.find({
                    members: { $in: [userId] }
                }).populate('members').exec();
            }
            catch (error) {
                throw new Error("error occured for finding conversation");
            }
        });
    }
    createMessage(messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield MessageModel_1.default.create(messageData);
            }
            catch (error) {
                throw new Error("error occured for creating messages");
            }
        });
    }
    findMessagesByConversationId(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield MessageModel_1.default.find({ conversationId }).sort({ _id: 1 }).exec();
            }
            catch (error) {
                throw new Error("error occured for finding message from conversation");
            }
        });
    }
    updateConversationWithLatestMessage(conversationId, messageText) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ConversationModel_1.default.findByIdAndUpdate(conversationId, {
                    lastMessage: messageText,
                    $inc: { unreadCount: 1 }
                }, { new: true });
            }
            catch (error) {
                throw new Error("error occured for updating conversation");
            }
        });
    }
    // Reset unread count (mark as read)
    resetUnreadCount(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ConversationModel_1.default.findByIdAndUpdate(conversationId, { unreadCount: 0 }, { new: true });
        });
    }
}
exports.ChatRepository = ChatRepository;
