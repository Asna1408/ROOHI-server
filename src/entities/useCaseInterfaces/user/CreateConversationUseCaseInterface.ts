import { ConversationType } from "../../types/user/ConversationType";

export interface CreateConversationUseCaseInterface{
    createOrRetrieveConversation(senderId: string, receiverId: string): Promise<ConversationType | any>
}