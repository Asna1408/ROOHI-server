import { ConversationType } from "../../../entities/types/user/ConversationType"
import { MessageType } from "../../../entities/types/user/MessageType"


export interface IChatRepository{
    findExistingConversation(senderId: string, receiverId: string): Promise<ConversationType | null>
    createConversation(conversationData: ConversationType): Promise<ConversationType | any>
    findConversationsByUserId(userId: string): Promise<ConversationType[] | any>
    createMessage(messageData: MessageType): Promise<MessageType | any >
    findMessagesByConversationId(conversationId: string): Promise<MessageType[] | any>
}