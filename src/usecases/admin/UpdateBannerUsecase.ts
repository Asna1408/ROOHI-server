import { BannerType } from "../../entities/types/admin/BannerType";
import { UpdateBannerUsecaseInterface } from "../../entities/useCaseInterfaces/admin/UpdateBannerUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class UpdateBannerUsecase implements UpdateBannerUsecaseInterface {
    constructor(private iadminrepository:IAdminRepository){}

    async updateBanner(BannerId: string, data: BannerType): Promise <BannerType | null> {
        return await this.iadminrepository.updateBanner(BannerId, data);
      }

}