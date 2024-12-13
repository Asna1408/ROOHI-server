import { BannerType } from "../../entities/types/admin/BannerType";
import { GetBannerUsecaseInterface } from "../../entities/useCaseInterfaces/admin/GetBannerUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetBannerUsecase implements GetBannerUsecaseInterface {
    constructor(private iadminrepository:IAdminRepository){}

    async getBanners(skip: number, limit: number): Promise<{ banners: BannerType[]; total: number }> {
      try{
      const [banners, total] = await this.iadminrepository.getBanners(skip, limit);
      return { banners, total };
      }catch(error){
        throw new Error("error occured when fetching all banners")
      }
    }
    

}