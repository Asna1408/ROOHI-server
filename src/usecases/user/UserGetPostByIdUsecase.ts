import { UserGetPostByIdUseCaseInterface } from "../../entities/useCaseInterfaces/user/UserGetPostByIdUseCaseInterface";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";

export class UserGetPostByIdUsecase implements UserGetPostByIdUseCaseInterface{
    constructor(private ipostrepository:IPostRepository){}
  

async getPostById(postId: string): Promise<any> {
    return await this.ipostrepository.getPostById(postId);
  }

}