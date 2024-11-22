import { BannerType } from "../../types/admin/BannerType";

export interface GetBannerByIdUseCaseInterface{
    getBannerById(BannerId: string): Promise<BannerType>
}