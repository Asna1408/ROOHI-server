import { BannerType } from "../../types/admin/BannerType";


export interface DeleteBannerUsecaseInterface{
    deleteBanner(BannerId: string):Promise<BannerType | null>
}