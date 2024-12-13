import { MessageType } from "../../entities/types/user/MessageType";
import { GetMessageByIdUseCaseInterface } from "../../entities/useCaseInterfaces/user/GetMessageByIdUseCaseInterface";
import { IChatRepository } from "../../interface adapter/respository/user/IChatRepository";

export class GetMessageByIdUseCase implements GetMessageByIdUseCaseInterface {
    constructor(private ichatRepository : IChatRepository){}
  
    async getMessagesByConversationId(conversationId: string): Promise<MessageType[]> {
      try{
      return await this.ichatRepository.findMessagesByConversationId(conversationId);
      }catch(error){
        throw new Error("Error occured when fetching the messages")
      }
    }
  }