import { BannerType } from "../../entities/types/admin/BannerType";
import { CreateBannerUsecaseInterface } from "../../entities/useCaseInterfaces/admin/CreateBannerUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class CreateBannerUsecase implements CreateBannerUsecaseInterface {
    constructor(private iadminrepository:IAdminRepository){}

    async createBanner(data: BannerType):Promise <BannerType > {
        return await this.iadminrepository.createBanner(data);
      }

}