// useCases/conversationUseCase.ts
import { ConversationType } from '../../entities/types/user/ConversationType';
import {GetConversationByUserIdUseCaseInterface } from '../../entities/useCaseInterfaces/user/GetConversationByUserIdUseCaseInterface';
import { IChatRepository } from '../../interface adapter/respository/user/IChatRepository';

export class GetConversationByUserIdUseCase implements GetConversationByUserIdUseCaseInterface{
    constructor(private ichatrepository : IChatRepository ){}

  async getUserConversations(userId: string): Promise<ConversationType[]> {
    return await this.ichatrepository .findConversationsByUserId(userId);
  }
}
