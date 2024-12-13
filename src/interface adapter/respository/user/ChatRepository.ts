// repositories/conversationRepository.ts
import { ConversationType } from '../../../entities/types/user/ConversationType';
import { MessageType } from '../../../entities/types/user/MessageType';
import ConversationModel from '../../../frameworks/database/models/user/ConversationModel';
import MessageModel from '../../../frameworks/database/models/user/MessageModel';
import { IChatRepository } from './IChatRepository';



export class ChatRepository implements IChatRepository{
  async findExistingConversation(senderId: string, receiverId: string): Promise<ConversationType | null> {
    try{
    return await ConversationModel.findOne({
      members: { $all: [senderId, receiverId] }
    });
  }catch(error){
    throw new Error("error occured for finding conversation")
  }
  }

  async createConversation(conversationData: ConversationType): Promise<ConversationType | any> {
    try{
    const newConversation = new ConversationModel(conversationData);
    return await newConversation.save();
  }catch(error){
    throw new Error("error occured for creating new conversation")
  }
  }

  async findConversationsByUserId(userId: string): Promise<ConversationType[] | any> {
    try{
    return await ConversationModel.find({
      members: { $in: [userId] }
    }).populate('members').exec();
  }catch(error){
    throw new Error("error occured for finding conversation")
  }
  }

  async createMessage(messageData: MessageType): Promise<MessageType | any > {
    try{
    return await MessageModel.create(messageData);
  }catch(error){
    throw new Error("error occured for creating messages")
  }
  }

  async findMessagesByConversationId(conversationId: string): Promise<MessageType[] | any> {
    try{
    return await MessageModel.find({ conversationId }).sort({ _id: 1 }).exec();
  }catch(error){
    throw new Error("error occured for finding message from conversation")
  }
  }


  async updateConversationWithLatestMessage(conversationId: string, messageText: string) {
    try{
    return await ConversationModel.findByIdAndUpdate(
      conversationId,
      { 
        lastMessage: messageText,
        $inc: { unreadCount: 1 }  
      },
      { new: true } 
    );
  }catch(error){
    throw new Error("error occured for updating conversation")
  }
  }

  // Reset unread count (mark as read)
  async resetUnreadCount(conversationId: string) {

    return await ConversationModel.findByIdAndUpdate(
      conversationId,
      { unreadCount: 0 },
      { new: true }
    );
  }

}
