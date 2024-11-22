import { BannerType } from "../../entities/types/admin/BannerType";
import { GetBannerInUserUsecaseIInterface } from "../../entities/useCaseInterfaces/user/GetBannerInUserUsecaseIInterface";
import { IUserRepository } from "../../interface adapter/respository/user/IUserRepository";



export class GetBannerInUserUsecase implements GetBannerInUserUsecaseIInterface {
   constructor(private iuserrepository: IUserRepository) { }

   async fetchActiveBanners():Promise<BannerType> {
    return await this.iuserrepository.getActiveBanners();
  }
}