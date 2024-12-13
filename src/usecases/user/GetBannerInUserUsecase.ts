import { BannerType } from "../../entities/types/admin/BannerType";
import { GetBannerInUserUsecaseIInterface } from "../../entities/useCaseInterfaces/user/GetBannerInUserUsecaseIInterface";
import { IUserRepository } from "../../interface adapter/respository/user/IUserRepository";



export class GetBannerInUserUsecase implements GetBannerInUserUsecaseIInterface {
   constructor(private iuserrepository: IUserRepository) { }

   async fetchActiveBanners():Promise<BannerType> {
    
  try{  
    return await this.iuserrepository.getActiveBanners();
  }catch(error){
    throw new Error("Error occured when fetching the Banners")
  }
  }
}