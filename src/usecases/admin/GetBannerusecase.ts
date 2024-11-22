import { BannerType } from "../../entities/types/admin/BannerType";
import { GetBannerUsecaseInterface } from "../../entities/useCaseInterfaces/admin/GetBannerUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetBannerUsecase implements GetBannerUsecaseInterface {
    constructor(private iadminrepository:IAdminRepository){}

    async getBanners(): Promise<BannerType[]>  {
        return await this.iadminrepository.getBanners();
      }

}