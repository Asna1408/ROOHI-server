// useCases/messageUseCase.ts
import { MessageType } from '../../entities/types/user/MessageType';
import { CreateMessageUsecaseInterface } from '../../entities/useCaseInterfaces/user/CreateMessageUsecaseInterface';
import { IChatRepository } from '../../interface adapter/respository/user/IChatRepository';

export class CreateMessageUsecase implements CreateMessageUsecaseInterface{
  constructor(private ichatRepository : IChatRepository){}

  async sendMessage(messageData: MessageType): Promise<MessageType> {
    return await this.ichatRepository .createMessage(messageData);
  }
}
