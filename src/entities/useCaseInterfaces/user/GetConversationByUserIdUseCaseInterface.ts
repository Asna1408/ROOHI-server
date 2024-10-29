import { ConversationType } from "../../types/user/ConversationType";

export interface GetConversationByUserIdUseCaseInterface{
    getUserConversations(userId: string): Promise<ConversationType[]>
}