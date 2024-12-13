import mongoose from "mongoose";
import { ServiceType } from "../../entities/types/user/ServicesType";
import { UserGetSingleServiceUseCaseInterface } from "../../entities/useCaseInterfaces/user/UserGetSingleServiceUseCaseInterface";
import { IPostRepository } from "../../interface adapter/respository/user/IPostRepository";




export class UserGetSingleServiceUseCase implements UserGetSingleServiceUseCaseInterface{
    constructor(private ipostrepository:IPostRepository){}
  
async getsingleservice(serviceId:  mongoose.Types.ObjectId): Promise<ServiceType | null |any> {
    
    try {
    if (!serviceId) {
        throw new Error("Service ID is required");
    }

    const service = await this.ipostrepository.getsingleservice(serviceId);
    return service;
} catch (error) {
    console.error("Error fetching service:", error);
    throw new Error("An error occurred while fetching the service"); 
  }
}
}