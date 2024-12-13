
import { UserGetAllPostInShopUseCaseInterface } from "../../entities/useCaseInterfaces/user/UserGetAllPostInShopUseCaseInterface";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";


export class UserGetAllPostInShopUseCase implements UserGetAllPostInShopUseCaseInterface{
  constructor(private ipostrepository:IPostRepository){}


  async fetchAllServices():Promise<any> {

    try{
    return await this.ipostrepository.getAllServices();
  }catch(error){
    throw new Error("an error occured when fetching the all post")
  }
}
}