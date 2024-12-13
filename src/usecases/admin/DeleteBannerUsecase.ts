import { BannerType } from "../../entities/types/admin/BannerType";
import { DeleteBannerUsecaseInterface } from "../../entities/useCaseInterfaces/admin/DeleteBannerUsecaseInterface";
import { IAdminRepository } from "../../interface adapter/respository/admin/IAdminRepsitory";

export class DeleteBannerUsecase implements DeleteBannerUsecaseInterface {
    constructor(private iadminrepository:IAdminRepository){}

    async deleteBanner(BannerId: string):Promise<BannerType | null> {
      try{
        return await this.iadminrepository.deleteBanner(BannerId);
      }catch(error){
        throw new Error("Error occured when deleting banner")
           }
      }

}