// repositories/conversationRepository.ts
import { ConversationType } from '../../../entities/types/user/ConversationType';
import { MessageType } from '../../../entities/types/user/MessageType';
import ConversationModel from '../../../frameworks/database/models/user/ConversationModel';
import MessageModel from '../../../frameworks/database/models/user/MessageModel';
import { IChatRepository } from './IChatRepository';



export class ChatRepository implements IChatRepository{
  async findExistingConversation(senderId: string, receiverId: string): Promise<ConversationType | null> {
    return await ConversationModel.findOne({
      members: { $all: [senderId, receiverId] }
    });
  }

  async createConversation(conversationData: ConversationType): Promise<ConversationType | any> {
    const newConversation = new ConversationModel(conversationData);
    return await newConversation.save();
  }

  async findConversationsByUserId(userId: string): Promise<ConversationType[] | any> {
    return await ConversationModel.find({
      members: { $in: [userId] }
    }).populate('members').exec();
  }

  async createMessage(messageData: MessageType): Promise<MessageType | any > {
    return await MessageModel.create(messageData);
  }

  async findMessagesByConversationId(conversationId: string): Promise<MessageType[] | any> {
    return await MessageModel.find({ conversationId }).sort({ _id: 1 }).exec();
  }

}
