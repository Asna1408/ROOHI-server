import { MessageType } from "../../types/user/MessageType";

export interface GetMessageByIdUseCaseInterface{
    getMessagesByConversationId(conversationId: string): Promise<MessageType[]>
}