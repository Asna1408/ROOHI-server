import { BannerType } from "../../entities/types/admin/BannerType";
import { GetBannerByIdUseCaseInterface } from "../../entities/useCaseInterfaces/admin/GetBannerByIdUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class GetBannerByIdUsecase implements GetBannerByIdUseCaseInterface{
    constructor(private iadminrepository:IAdminRepository){}
  

async getBannerById(BannerId: string): Promise<BannerType> {
    return await this.iadminrepository.getBannerById(BannerId);
  }

}