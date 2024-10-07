import mongoose from "mongoose";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import { UserGetAllPostUseCaseInterface } from "../../entities/useCaseInterfaces/user/UserGetAllPostInterface";

export class UserGetAllPostUseCase implements UserGetAllPostUseCaseInterface{
  constructor(private ipostrepository:IPostRepository){}


async GetAllPost(providerId: mongoose.Types.ObjectId):Promise<any> {
    try {
      return await this.ipostrepository.getServicesByProvider(providerId);
    } catch (error) {
      throw new Error("Error getting services for user");
    }
  }
}