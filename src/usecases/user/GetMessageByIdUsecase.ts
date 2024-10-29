import { MessageType } from "../../entities/types/user/MessageType";
import { GetMessageByIdUseCaseInterface } from "../../entities/useCaseInterfaces/user/GetMessageByIdUseCaseInterface";
import { IChatRepository } from "../../interface adapter/respository/user/IChatRepository";

export class GetMessageByIdUseCase implements GetMessageByIdUseCaseInterface {
    constructor(private ichatRepository : IChatRepository){}
  
    async getMessagesByConversationId(conversationId: string): Promise<MessageType[]> {
      return await this.ichatRepository .findMessagesByConversationId(conversationId);
    }
  }