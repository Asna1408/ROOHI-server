import { BannerType } from "../../types/admin/BannerType";


export interface GetBannerUsecaseInterface{
    getBanners(): Promise<BannerType[]> 
}