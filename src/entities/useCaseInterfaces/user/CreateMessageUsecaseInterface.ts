import { MessageType } from "../../types/user/MessageType";

export interface CreateMessageUsecaseInterface{
    sendMessage(messageData: MessageType): Promise<MessageType>
}