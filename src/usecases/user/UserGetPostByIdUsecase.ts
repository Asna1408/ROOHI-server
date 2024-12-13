import { UserGetPostByIdUseCaseInterface } from "../../entities/useCaseInterfaces/user/UserGetPostByIdUseCaseInterface";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";

export class UserGetPostByIdUsecase implements UserGetPostByIdUseCaseInterface{
    constructor(private ipostrepository:IPostRepository){}
  

async getPostById(postId: string): Promise<any> {
  try { 
  return await this.ipostrepository.getPostById(postId);
  }catch (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("An error occurred while fetching the post. Please try again later.");
 }
}
}