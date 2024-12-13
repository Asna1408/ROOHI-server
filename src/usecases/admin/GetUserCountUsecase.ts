import { UserType } from "../../entities/types/user/UserType";
import { GetUserCountUsecaseInterface } from "../../entities/useCaseInterfaces/admin/GetUserCountUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetUserCountUsecase implements GetUserCountUsecaseInterface{
     constructor(private iadminrepository:IAdminRepository){}

async getUserCount() :Promise<UserType>{
  try{
    return await this.iadminrepository.getUserCount();
  }catch(error){
    throw new Error("Error occured when getting user count")
  }
  };

}