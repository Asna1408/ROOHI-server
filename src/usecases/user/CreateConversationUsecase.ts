// useCases/conversationUseCase.ts
import { ConversationType } from '../../entities/types/user/ConversationType';
import { CreateConversationUseCaseInterface } from '../../entities/useCaseInterfaces/user/CreateConversationUseCaseInterface';
import { IChatRepository } from '../../interface adapter/respository/user/IChatRepository';


export class CreateConversationUseCase implements CreateConversationUseCaseInterface {
constructor(private ichatrepository : IChatRepository ){}

  async createOrRetrieveConversation(senderId: string, receiverId: string): Promise<ConversationType | any> {
   
    try{
    let conversation = await this.ichatrepository .findExistingConversation(senderId, receiverId);

    if (!conversation) {
      conversation = await this.ichatrepository .createConversation({ members: [senderId, receiverId] });
    }

    return conversation;

  }catch(error){
    throw new Error("error occured when creating or retrieving conversation")
  }
  }
}
