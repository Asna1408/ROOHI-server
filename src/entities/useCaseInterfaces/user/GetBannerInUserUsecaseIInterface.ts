import { BannerType } from "../../types/admin/BannerType";

export interface GetBannerInUserUsecaseIInterface{
    fetchActiveBanners():Promise<BannerType> 
 }