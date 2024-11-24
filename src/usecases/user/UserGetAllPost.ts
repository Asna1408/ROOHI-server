import mongoose from "mongoose";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";
import { UserGetAllPostUseCaseInterface } from "../../entities/useCaseInterfaces/user/UserGetAllPostInterface";

export class UserGetAllPostUseCase implements UserGetAllPostUseCaseInterface{
  constructor(private ipostrepository:IPostRepository){}


// async GetAllPost(providerId: mongoose.Types.ObjectId):Promise<any> {
//     try {
//       if (!providerId) {
//         throw new Error("Provider ID is required");
//     }

//       return await this.ipostrepository.getServicesByProvider(providerId);
//     } catch (error) {
//       throw new Error("Error getting services for user");
//     }
//   }

async GetAllPost(providerId: mongoose.Types.ObjectId, skip: number, limit: number): Promise<{ services: any[]; total: number }> {
  if (!providerId) {
    throw new Error("Provider ID is required");
  }

  try {
    return await this.ipostrepository.getServicesByProvider(providerId, skip, limit);
  } catch (error) {
    throw new Error("Error getting services for user");
  }
}


}