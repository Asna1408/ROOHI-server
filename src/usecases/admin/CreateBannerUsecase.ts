import { BannerType } from "../../entities/types/admin/BannerType";
import { CreateBannerUsecaseInterface } from "../../entities/useCaseInterfaces/admin/CreateBannerUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class CreateBannerUsecase implements CreateBannerUsecaseInterface {
    constructor(private iadminrepository:IAdminRepository){}

    async createBanner(data: BannerType):Promise <BannerType > {
      try{
        return await this.iadminrepository.createBanner(data);
      
    }catch(error){
 throw new Error("Error occured when creating banner")
    }
  }

}