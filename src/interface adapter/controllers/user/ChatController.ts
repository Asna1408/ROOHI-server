import { CreateConversationUseCaseInterface } from "../../../entities/useCaseInterfaces/user/CreateConversationUseCaseInterface";
import { CreateMessageUsecaseInterface } from "../../../entities/useCaseInterfaces/user/CreateMessageUsecaseInterface";
import { GetConversationByUserIdUseCaseInterface } from "../../../entities/useCaseInterfaces/user/GetConversationByUserIdUseCaseInterface";
import { GetMessageByIdUseCaseInterface } from "../../../entities/useCaseInterfaces/user/GetMessageByIdUseCaseInterface";
import { Req, Res } from "../../../frameworks/Types/servertype";

export class ChatController {
    constructor(private icreateconversationusecase: CreateConversationUseCaseInterface,
        private igetconversationByUserIdusecase: GetConversationByUserIdUseCaseInterface,
        private icreatemessageusecase : CreateMessageUsecaseInterface,
        private igetmessageByIdusecase: GetMessageByIdUseCaseInterface
    ){}

    async createConversation(req: Req, res: Res) {
        const { senderId, receiverId } = req.body;
    
        try {
          const conversation = await this.icreateconversationusecase.createOrRetrieveConversation(senderId, receiverId);
          return res.status(conversation ? 200 : 201).json(conversation);
        } catch (error: any) {
          return res.status(500).json({ error: "Failed to create conversation", details: error.message });
        }
      }


      async getUserConversations(req: Req, res: Res) {
        const { userId } = req.params;
    
        try {
          const conversations = await this.igetconversationByUserIdusecase.getUserConversations(userId);
          return res.status(200).json(conversations);
        } catch (error: any) {
          return res.status(500).json({ error: "Failed to fetch conversations", details: error.message });
        }
      }

      async sendMessage(req: Req, res: Res) {
        try {
          const message = await this.icreatemessageusecase.sendMessage(req.body);
          return res.status(200).json(message);
        } catch (error: any) {
          return res.status(500).json({ error: "Failed to send message", details: error.message });
        }
      }


      async getMessages(req: Req, res: Res) {
        const { conversationId } = req.params;
    
        try {
          const messages = await this.igetmessageByIdusecase.getMessagesByConversationId(conversationId);
          return res.status(200).json(messages);
        } catch (error: any) {
          return res.status(500).json({ error: "Failed to fetch messages", details: error.message });
        }
      }
}