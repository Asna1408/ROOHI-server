import { BannerType } from "../../types/admin/BannerType";


export interface UpdateBannerUsecaseInterface{
    updateBanner(BannerId: string, data: BannerType): Promise <BannerType | null>
}