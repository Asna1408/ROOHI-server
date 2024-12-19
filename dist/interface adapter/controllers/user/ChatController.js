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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
class ChatController {
    constructor(icreateconversationusecase, igetconversationByUserIdusecase, icreatemessageusecase, igetmessageByIdusecase) {
        this.icreateconversationusecase = icreateconversationusecase;
        this.igetconversationByUserIdusecase = igetconversationByUserIdusecase;
        this.icreatemessageusecase = icreatemessageusecase;
        this.igetmessageByIdusecase = igetmessageByIdusecase;
    }
    createConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderId, receiverId } = req.body;
            try {
                const conversation = yield this.icreateconversationusecase.createOrRetrieveConversation(senderId, receiverId);
                return res.status(conversation ? 200 : 201).json(conversation);
            }
            catch (error) {
                return res.status(500).json({ error: "Failed to create conversation", details: error.message });
            }
        });
    }
    getUserConversations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const conversations = yield this.igetconversationByUserIdusecase.getUserConversations(userId);
                return res.status(200).json(conversations);
            }
            catch (error) {
                return res.status(500).json({ error: "Failed to fetch conversations", details: error.message });
            }
        });
    }
    sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.icreatemessageusecase.sendMessage(req.body);
                return res.status(200).json(message);
            }
            catch (error) {
                return res.status(500).json({ error: "Failed to send message", details: error.message });
            }
        });
    }
    getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { conversationId } = req.params;
            try {
                const messages = yield this.igetmessageByIdusecase.getMessagesByConversationId(conversationId);
                return res.status(200).json(messages);
            }
            catch (error) {
                return res.status(500).json({ error: "Failed to fetch messages", details: error.message });
            }
        });
    }
}
exports.ChatController = ChatController;
